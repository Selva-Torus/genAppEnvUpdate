'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import Grouptabgroup_dashboard  from "../Grouptabgroup_dashboard/Grouptabgroup_dashboard";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_enquiry = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_dashboardviewallsuccess_v1Props, setdfd_dashboardviewallsuccess_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_dashboardviewallfailure_v1Props, setdfd_dashboardviewallfailure_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "IT Team": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_dashboard",
      "tab_header_view_all_fail",
      "grp_retun_ref",
      "tbl_vw_all_fail",
      "tab_headerview_all_success",
      "grp_reqforref",
      "tbl_view_all_success"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_dashboard",
      "tab_header_view_all_fail",
      "grp_retun_ref",
      "tbl_vw_all_fail",
      "tab_headerview_all_success",
      "grp_reqforref",
      "tbl_view_all_success"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "grp_wps",
      "grp_eob",
      "grp_enquiry",
      "tabgroup_dashboard",
      "tab_header_view_all_fail",
      "grp_retun_ref",
      "tbl_vw_all_fail",
      "tab_headerview_all_success",
      "grp_reqforref",
      "tbl_view_all_success"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {grp_wpsc6e49, setgrp_wpsc6e49}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsc6e49Props, setgrp_wpsc6e49Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob07ed4, setgrp_eob07ed4}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob07ed4Props, setgrp_eob07ed4Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiry759a6, setgrp_enquiry759a6}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiry759a6Props, setgrp_enquiry759a6Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_dashboard0d387, settabgroup_dashboard0d387}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_failcb8d9, settab_header_view_all_failcb8d9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_failcb8d9Props, settab_header_view_all_failcb8d9Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8f, setgrp_retun_ref84e8f}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8fProps, setgrp_retun_ref84e8fProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05, settbl_vw_all_failf2e05}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05Props, settbl_vw_all_failf2e05Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_successdba67, settab_headerview_all_successdba67}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_successdba67Props, settab_headerview_all_successdba67Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3, setgrp_reqforref8b4e3}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3Props, setgrp_reqforref8b4e3Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924, settbl_view_all_successbc924}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924Props, settbl_view_all_successbc924Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1',
    [user],
    'GroupGrpEnquiry',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "480a50dd3a4dd0c2de1c13b0dfe759a6");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setgrp_enquiry759a6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tabgroup_dashboard")){
        settabgroup_dashboard0d387((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tabgroup_dashboard0d387?.isDisabled==null)
      {
        settabgroup_dashboard0d387((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_wps'] = grp_wpsc6e49,
        codeStates['setgrp_wps'] = setgrp_wpsc6e49,
        codeStates['grp_wpsc6e49'] = grp_wpsc6e49Props,
        codeStates['setgrp_wpsc6e49'] = setgrp_wpsc6e49Props,
        codeStates['grp_eob'] = grp_eob07ed4,
        codeStates['setgrp_eob'] = setgrp_eob07ed4,
        codeStates['grp_eob07ed4'] = grp_eob07ed4Props,
        codeStates['setgrp_eob07ed4'] = setgrp_eob07ed4Props,
        codeStates['grp_enquiry'] = grp_enquiry759a6,
        codeStates['setgrp_enquiry'] = setgrp_enquiry759a6,
        codeStates['grp_enquiry759a6'] = grp_enquiry759a6Props,
        codeStates['setgrp_enquiry759a6'] = setgrp_enquiry759a6Props,
        codeStates['tabgroup_dashboard'] = tabgroup_dashboard0d387,
        codeStates['settabgroup_dashboard'] = settabgroup_dashboard0d387,
        codeStates['tab_header_view_all_fail'] = tab_header_view_all_failcb8d9,
        codeStates['settab_header_view_all_fail'] = settab_header_view_all_failcb8d9,
        codeStates['tab_header_view_all_failcb8d9'] = tab_header_view_all_failcb8d9Props,
        codeStates['settab_header_view_all_failcb8d9'] = settab_header_view_all_failcb8d9Props,
        codeStates['grp_retun_ref'] = grp_retun_ref84e8f,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref84e8f,
        codeStates['grp_retun_ref84e8f'] = grp_retun_ref84e8fProps,
        codeStates['setgrp_retun_ref84e8f'] = setgrp_retun_ref84e8fProps,
        codeStates['tbl_vw_all_fail'] = tbl_vw_all_failf2e05,
        codeStates['settbl_vw_all_fail'] = settbl_vw_all_failf2e05,
        codeStates['tbl_vw_all_failf2e05'] = tbl_vw_all_failf2e05Props,
        codeStates['settbl_vw_all_failf2e05'] = settbl_vw_all_failf2e05Props,
        codeStates['tab_headerview_all_success'] = tab_headerview_all_successdba67,
        codeStates['settab_headerview_all_success'] = settab_headerview_all_successdba67,
        codeStates['tab_headerview_all_successdba67'] = tab_headerview_all_successdba67Props,
        codeStates['settab_headerview_all_successdba67'] = settab_headerview_all_successdba67Props,
        codeStates['grp_reqforref'] = grp_reqforref8b4e3,
        codeStates['setgrp_reqforref'] = setgrp_reqforref8b4e3,
        codeStates['grp_reqforref8b4e3'] = grp_reqforref8b4e3Props,
        codeStates['setgrp_reqforref8b4e3'] = setgrp_reqforref8b4e3Props,
        codeStates['tbl_view_all_success'] = tbl_view_all_successbc924,
        codeStates['settbl_view_all_success'] = settbl_view_all_successbc924,
        codeStates['tbl_view_all_successbc924'] = tbl_view_all_successbc924Props,
        codeStates['settbl_view_all_successbc924'] = settbl_view_all_successbc924Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "480a50dd3a4dd0c2de1c13b0dfe759a6");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['grp_wps'] = grp_wpsc6e49,
        codeStates['setgrp_wps'] = setgrp_wpsc6e49,
        codeStates['grp_wpsc6e49'] = grp_wpsc6e49Props,
        codeStates['setgrp_wpsc6e49'] = setgrp_wpsc6e49Props,
        codeStates['grp_eob'] = grp_eob07ed4,
        codeStates['setgrp_eob'] = setgrp_eob07ed4,
        codeStates['grp_eob07ed4'] = grp_eob07ed4Props,
        codeStates['setgrp_eob07ed4'] = setgrp_eob07ed4Props,
        codeStates['grp_enquiry'] = grp_enquiry759a6,
        codeStates['setgrp_enquiry'] = setgrp_enquiry759a6,
        codeStates['grp_enquiry759a6'] = grp_enquiry759a6Props,
        codeStates['setgrp_enquiry759a6'] = setgrp_enquiry759a6Props,
        codeStates['tabgroup_dashboard'] = tabgroup_dashboard0d387,
        codeStates['settabgroup_dashboard'] = settabgroup_dashboard0d387,
        codeStates['tab_header_view_all_fail'] = tab_header_view_all_failcb8d9,
        codeStates['settab_header_view_all_fail'] = settab_header_view_all_failcb8d9,
        codeStates['tab_header_view_all_failcb8d9'] = tab_header_view_all_failcb8d9Props,
        codeStates['settab_header_view_all_failcb8d9'] = settab_header_view_all_failcb8d9Props,
        codeStates['grp_retun_ref'] = grp_retun_ref84e8f,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref84e8f,
        codeStates['grp_retun_ref84e8f'] = grp_retun_ref84e8fProps,
        codeStates['setgrp_retun_ref84e8f'] = setgrp_retun_ref84e8fProps,
        codeStates['tbl_vw_all_fail'] = tbl_vw_all_failf2e05,
        codeStates['settbl_vw_all_fail'] = settbl_vw_all_failf2e05,
        codeStates['tbl_vw_all_failf2e05'] = tbl_vw_all_failf2e05Props,
        codeStates['settbl_vw_all_failf2e05'] = settbl_vw_all_failf2e05Props,
        codeStates['tab_headerview_all_success'] = tab_headerview_all_successdba67,
        codeStates['settab_headerview_all_success'] = settab_headerview_all_successdba67,
        codeStates['tab_headerview_all_successdba67'] = tab_headerview_all_successdba67Props,
        codeStates['settab_headerview_all_successdba67'] = settab_headerview_all_successdba67Props,
        codeStates['grp_reqforref'] = grp_reqforref8b4e3,
        codeStates['setgrp_reqforref'] = setgrp_reqforref8b4e3,
        codeStates['grp_reqforref8b4e3'] = grp_reqforref8b4e3Props,
        codeStates['setgrp_reqforref8b4e3'] = setgrp_reqforref8b4e3Props,
        codeStates['tbl_view_all_success'] = tbl_view_all_successbc924,
        codeStates['settbl_view_all_success'] = settbl_view_all_successbc924,
        codeStates['tbl_view_all_successbc924'] = tbl_view_all_successbc924Props,
        codeStates['settbl_view_all_successbc924'] = settbl_view_all_successbc924Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_enquiry759a6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_enquiry759a6Ref.current?.setSearchParams();
    grp_enquiry759a6Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(grp_enquiry759a6) &&
        Object.keys(grp_enquiry759a6)?.length > 0
      ) {
        setgrp_enquiry759a6({})
        setgrp_enquiry759a6Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_enquiry759a6Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 143',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"grp_enquiry"}))
        }}
    >
        {allowedComponent.includes("tabgroup_dashboard")  &&<Grouptabgroup_dashboard  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
    </div>
 )
}

export default Groupgrp_enquiry
