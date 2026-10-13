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
import Groupgrp_enquiry  from "../Groupgrp_enquiry/Groupgrp_enquiry";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_eob = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquiryviewallemployers_v1Props, setdfd_enquiryviewallemployers_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
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
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
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
      "tabgroup_return_refund",
      "tab_header_view_all_emp",
      "grp_retun_ref",
      "tbl_vw_all_empr",
      "tab_headerview_all_tran",
      "grp_reqforref",
      "tbl_view_all_tran"
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
  const {grp_wpsfa727, setgrp_wpsfa727}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsfa727Props, setgrp_wpsfa727Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfac, setgrp_eob8dfac}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfacProps, setgrp_eob8dfacProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2a, setgrp_enquiryd2b2a}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511db, settabgroup_return_refund511db}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45, settab_header_view_all_emp58f45}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45Props, settab_header_view_all_emp58f45Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2, setgrp_retun_ref230e2}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2Props, setgrp_retun_ref230e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773, settab_headerview_all_tranaa773}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773Props, settab_headerview_all_tranaa773Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82e, setgrp_reqforref4f82e}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82eProps, setgrp_reqforref4f82eProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49d, settbl_view_all_tran1b49d}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiry_v1, setenquiry_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1',
    [user],
    'GroupGrpEob',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e6a929832a9e9d32e98a0e9a3408dfac");
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
    setgrp_eob8dfacProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grp_enquiry")){
        setgrp_enquiryd2b2a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grp_enquiryd2b2a?.isDisabled==null)
      {
        setgrp_enquiryd2b2a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_wps'] = grp_wpsfa727,
        codeStates['setgrp_wps'] = setgrp_wpsfa727,
        codeStates['grp_wpsfa727'] = grp_wpsfa727Props,
        codeStates['setgrp_wpsfa727'] = setgrp_wpsfa727Props,
        codeStates['grp_eob'] = grp_eob8dfac,
        codeStates['setgrp_eob'] = setgrp_eob8dfac,
        codeStates['grp_eob8dfac'] = grp_eob8dfacProps,
        codeStates['setgrp_eob8dfac'] = setgrp_eob8dfacProps,
        codeStates['grp_enquiry'] = grp_enquiryd2b2a,
        codeStates['setgrp_enquiry'] = setgrp_enquiryd2b2a,
        codeStates['grp_enquiryd2b2a'] = grp_enquiryd2b2aProps,
        codeStates['setgrp_enquiryd2b2a'] = setgrp_enquiryd2b2aProps,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund511db,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund511db,
        codeStates['tabgroup_return_refund511db'] = tabgroup_return_refund511dbProps,
        codeStates['settabgroup_return_refund511db'] = settabgroup_return_refund511dbProps,
        codeStates['tab_header_view_all_emp'] = tab_header_view_all_emp58f45,
        codeStates['settab_header_view_all_emp'] = settab_header_view_all_emp58f45,
        codeStates['tab_header_view_all_emp58f45'] = tab_header_view_all_emp58f45Props,
        codeStates['settab_header_view_all_emp58f45'] = settab_header_view_all_emp58f45Props,
        codeStates['grp_retun_ref'] = grp_retun_ref230e2,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref230e2,
        codeStates['grp_retun_ref230e2'] = grp_retun_ref230e2Props,
        codeStates['setgrp_retun_ref230e2'] = setgrp_retun_ref230e2Props,
        codeStates['tbl_vw_all_empr'] = tbl_vw_all_empr8a2a9,
        codeStates['settbl_vw_all_empr'] = settbl_vw_all_empr8a2a9,
        codeStates['tbl_vw_all_empr8a2a9'] = tbl_vw_all_empr8a2a9Props,
        codeStates['settbl_vw_all_empr8a2a9'] = settbl_vw_all_empr8a2a9Props,
        codeStates['tab_headerview_all_tran'] = tab_headerview_all_tranaa773,
        codeStates['settab_headerview_all_tran'] = settab_headerview_all_tranaa773,
        codeStates['tab_headerview_all_tranaa773'] = tab_headerview_all_tranaa773Props,
        codeStates['settab_headerview_all_tranaa773'] = settab_headerview_all_tranaa773Props,
        codeStates['grp_reqforref'] = grp_reqforref4f82e,
        codeStates['setgrp_reqforref'] = setgrp_reqforref4f82e,
        codeStates['grp_reqforref4f82e'] = grp_reqforref4f82eProps,
        codeStates['setgrp_reqforref4f82e'] = setgrp_reqforref4f82eProps,
        codeStates['tbl_view_all_tran'] = tbl_view_all_tran1b49d,
        codeStates['settbl_view_all_tran'] = settbl_view_all_tran1b49d,
        codeStates['tbl_view_all_tran1b49d'] = tbl_view_all_tran1b49dProps,
        codeStates['settbl_view_all_tran1b49d'] = settbl_view_all_tran1b49dProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e6a929832a9e9d32e98a0e9a3408dfac");
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
        codeStates['grp_wps'] = grp_wpsfa727,
        codeStates['setgrp_wps'] = setgrp_wpsfa727,
        codeStates['grp_wpsfa727'] = grp_wpsfa727Props,
        codeStates['setgrp_wpsfa727'] = setgrp_wpsfa727Props,
        codeStates['grp_eob'] = grp_eob8dfac,
        codeStates['setgrp_eob'] = setgrp_eob8dfac,
        codeStates['grp_eob8dfac'] = grp_eob8dfacProps,
        codeStates['setgrp_eob8dfac'] = setgrp_eob8dfacProps,
        codeStates['grp_enquiry'] = grp_enquiryd2b2a,
        codeStates['setgrp_enquiry'] = setgrp_enquiryd2b2a,
        codeStates['grp_enquiryd2b2a'] = grp_enquiryd2b2aProps,
        codeStates['setgrp_enquiryd2b2a'] = setgrp_enquiryd2b2aProps,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund511db,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund511db,
        codeStates['tabgroup_return_refund511db'] = tabgroup_return_refund511dbProps,
        codeStates['settabgroup_return_refund511db'] = settabgroup_return_refund511dbProps,
        codeStates['tab_header_view_all_emp'] = tab_header_view_all_emp58f45,
        codeStates['settab_header_view_all_emp'] = settab_header_view_all_emp58f45,
        codeStates['tab_header_view_all_emp58f45'] = tab_header_view_all_emp58f45Props,
        codeStates['settab_header_view_all_emp58f45'] = settab_header_view_all_emp58f45Props,
        codeStates['grp_retun_ref'] = grp_retun_ref230e2,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref230e2,
        codeStates['grp_retun_ref230e2'] = grp_retun_ref230e2Props,
        codeStates['setgrp_retun_ref230e2'] = setgrp_retun_ref230e2Props,
        codeStates['tbl_vw_all_empr'] = tbl_vw_all_empr8a2a9,
        codeStates['settbl_vw_all_empr'] = settbl_vw_all_empr8a2a9,
        codeStates['tbl_vw_all_empr8a2a9'] = tbl_vw_all_empr8a2a9Props,
        codeStates['settbl_vw_all_empr8a2a9'] = settbl_vw_all_empr8a2a9Props,
        codeStates['tab_headerview_all_tran'] = tab_headerview_all_tranaa773,
        codeStates['settab_headerview_all_tran'] = settab_headerview_all_tranaa773,
        codeStates['tab_headerview_all_tranaa773'] = tab_headerview_all_tranaa773Props,
        codeStates['settab_headerview_all_tranaa773'] = settab_headerview_all_tranaa773Props,
        codeStates['grp_reqforref'] = grp_reqforref4f82e,
        codeStates['setgrp_reqforref'] = setgrp_reqforref4f82e,
        codeStates['grp_reqforref4f82e'] = grp_reqforref4f82eProps,
        codeStates['setgrp_reqforref4f82e'] = setgrp_reqforref4f82eProps,
        codeStates['tbl_view_all_tran'] = tbl_view_all_tran1b49d,
        codeStates['settbl_view_all_tran'] = settbl_view_all_tran1b49d,
        codeStates['tbl_view_all_tran1b49d'] = tbl_view_all_tran1b49dProps,
        codeStates['settbl_view_all_tran1b49d'] = settbl_view_all_tran1b49dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_eob8dfacRef = useRef<any>(null);
  const handleClearSearch = () => {
    grp_eob8dfacRef.current?.setSearchParams();
    grp_eob8dfacRef.current?.handleSearch({});
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
        !Array.isArray(grp_eob8dfac) &&
        Object.keys(grp_eob8dfac)?.length > 0
      ) {
        setgrp_eob8dfac({})
        setgrp_eob8dfacProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_eob8dfacProps?.refresh])


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
        gridRow: '1 / 146',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setenquiry_v1((pre:any)=>({...pre,_selectedGroup_:"grp_eob"}))
        }}
    >
        {allowedComponent.includes("grp_enquiry")  &&<Groupgrp_enquiry  
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

export default Groupgrp_eob
