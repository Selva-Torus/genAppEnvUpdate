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
import Tabletbl_view_all_success  from './Tabletbl_view_all_success';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_view_all_success = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [
      "col_com_code",
      "col_emi_id",
      "col_reg_no",
      "col_prcs_name",
      "col_sts",
      "col_created_date",
      "btn_succ_req_res"
    ],
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
    "allowedControls": [
      "col_com_code",
      "col_emi_id",
      "col_reg_no",
      "col_prcs_name",
      "col_sts",
      "col_created_date",
      "btn_succ_req_res"
    ],
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
    "allowedControls": [
      "col_com_code",
      "col_emi_id",
      "col_reg_no",
      "col_prcs_name",
      "col_sts",
      "col_created_date",
      "btn_succ_req_res"
    ],
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
  const {tabgroup_dashboard0d387Props, settabgroup_dashboard0d387Props}= useContext(TotalContext) as TotalContextProps;
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
  const {col_com_code3b35a, setcol_com_code3b35a}= useContext(TotalContext) as TotalContextProps;
  const {col_emi_id8bf26, setcol_emi_id8bf26}= useContext(TotalContext) as TotalContextProps;
  const {col_reg_noe3d8f, setcol_reg_noe3d8f}= useContext(TotalContext) as TotalContextProps;
  const {col_prcs_named06a3, setcol_prcs_named06a3}= useContext(TotalContext) as TotalContextProps;
  const {col_sts2b329, setcol_sts2b329}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date2f60b, setcol_created_date2f60b}= useContext(TotalContext) as TotalContextProps;
  const {btn_succ_req_resc54e9, setbtn_succ_req_resc54e9}= useContext(TotalContext) as TotalContextProps;
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
    'GroupTblViewAllSuccess',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c9e5067937d6d144ccc77015265bc924");
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
    settbl_view_all_successbc924Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_com_code")){
        setcol_com_code3b35a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_com_code3b35a?.isDisabled==null)
      {
        setcol_com_code3b35a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emi_id")){
        setcol_emi_id8bf26((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emi_id8bf26?.isDisabled==null)
      {
        setcol_emi_id8bf26((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_reg_no")){
        setcol_reg_noe3d8f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_reg_noe3d8f?.isDisabled==null)
      {
        setcol_reg_noe3d8f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_prcs_name")){
        setcol_prcs_named06a3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_prcs_named06a3?.isDisabled==null)
      {
        setcol_prcs_named06a3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sts")){
        setcol_sts2b329((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sts2b329?.isDisabled==null)
      {
        setcol_sts2b329((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_created_date")){
        setcol_created_date2f60b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_created_date2f60b?.isDisabled==null)
      {
        setcol_created_date2f60b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_succ_req_res")){
        setbtn_succ_req_resc54e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_succ_req_resc54e9?.isDisabled==null)
      {
        setbtn_succ_req_resc54e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c9e5067937d6d144ccc77015265bc924");
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
        codeStates['tabgroup_dashboard0d387'] = tabgroup_dashboard0d387Props,
        codeStates['settabgroup_dashboard0d387'] = settabgroup_dashboard0d387Props,
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
        codeStates['col_com_code'] = col_com_code3b35a,
        codeStates['setcol_com_code'] = setcol_com_code3b35a,
        codeStates['col_emi_id'] = col_emi_id8bf26,
        codeStates['setcol_emi_id'] = setcol_emi_id8bf26,
        codeStates['col_reg_no'] = col_reg_noe3d8f,
        codeStates['setcol_reg_no'] = setcol_reg_noe3d8f,
        codeStates['col_prcs_name'] = col_prcs_named06a3,
        codeStates['setcol_prcs_name'] = setcol_prcs_named06a3,
        codeStates['col_sts'] = col_sts2b329,
        codeStates['setcol_sts'] = setcol_sts2b329,
        codeStates['col_created_date'] = col_created_date2f60b,
        codeStates['setcol_created_date'] = setcol_created_date2f60b,
        codeStates['btn_succ_req_res'] = btn_succ_req_resc54e9,
        codeStates['setbtn_succ_req_res'] = setbtn_succ_req_resc54e9,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_view_all_successbc924Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_view_all_successbc924Ref.current?.setSearchParams();
    tbl_view_all_successbc924Ref.current?.handleSearch({});
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
        !Array.isArray(tbl_view_all_successbc924) &&
        Object.keys(tbl_view_all_successbc924)?.length > 0
      ) {
        settbl_view_all_successbc924({})
        settbl_view_all_successbc924Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_view_all_successbc924Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
        <div
          className='flex-shrink-0 overflow-x-auto pl-1'>
          <div className='flex justify-end w-max min-w-full gap-1'>
        <div className='flex flex-row shrink-0'>
          <Button
            view='action'
            pin={"circle-circle"}
            onClick={() => setOpen(true)}
            icon="FaSearch"
            iconDisplay={tbl_view_all_successbc924Ref?.current?.isHaveSearch?  "Icon only" : "Start with Icon"}
            className="p-2"
            >
            Search
          </Button>
          {tbl_view_all_successbc924Ref?.current?.isHaveSearch&&(
            <Button 
              pin={"circle-circle"}
              onClick={() => handleClearSearch()}
              view='action'
              icon="FaTimes"
              iconDisplay="Icon only"
              className="p-2"
              />
            )}
        </div>
      </div>
      </div>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 64',
      
        //rowGap: '0px',
        overflow: 'visible',
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
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_view_all_success"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_view_all_success headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_view_all_successbc924Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_view_all_success
