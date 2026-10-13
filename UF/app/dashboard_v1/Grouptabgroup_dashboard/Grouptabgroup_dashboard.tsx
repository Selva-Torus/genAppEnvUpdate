'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Grouptab_header_view_all_fail  from "../Grouptab_header_view_all_fail/Grouptab_header_view_all_fail";
import Grouptab_headerview_all_success  from "../Grouptab_headerview_all_success/Grouptab_headerview_all_success";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptabgroup_dashboard = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { setValidate, setValidateRefetch } = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
    const decodedTokenObj:any = decodeToken(token);

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
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
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
  const {grp_retun_ref84e8f, setgrp_retun_ref84e8f}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8fProps, setgrp_retun_ref84e8fProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05, settbl_vw_all_failf2e05}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05Props, settbl_vw_all_failf2e05Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_successdba67, settab_headerview_all_successdba67}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3, setgrp_reqforref8b4e3}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3Props, setgrp_reqforref8b4e3Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924, settbl_view_all_successbc924}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924Props, settbl_view_all_successbc924Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // Active tab id
  const activeTabId = tabgroup_dashboard0d387?.tabgroup_dashboard || "tab_header_view_all_fail";
  const prevActiveTabRef = useRef(activeTabId);
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "c241b501374e128517024ad46740d387"
      );
  code = orchestrationData?.data?.code;
  setAllCode(orchestrationData?.data?.code||"");
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  for(let i=0;i<tabOptions?.length;i++){
    if(allowedGroups?.find((group)=>(group==tabOptions[i]?.id)))
    {
      if(!tabgroup_dashboard0d387?.tabgroup_dashboard || tabgroup_dashboard0d387?.tabgroup_dashboard === ""){
      settabgroup_dashboard0d387((pre:any)=>({...pre,tabgroup_dashboard:tabOptions[i]?.id}));
      break;
      }
    }
  }   
  /////////////
        settab_header_view_all_failcb8d9({...tab_header_view_all_failcb8d9,isDisabled:orchestrationData?.data?.readableControls.includes("tab_header_view_all_fail")});
        settab_headerview_all_successdba67({...tab_headerview_all_successdba67,isDisabled:orchestrationData?.data?.readableControls.includes("tab_headerview_all_success")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "tab_header_view_all_fail",
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


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        settabgroup_dashboard0d387((pre:any)=>({...pre,tabgroup_dashboard:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, dashboard_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
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
    settabgroup_dashboard0d387((pre:any)=>({...pre,tabgroup_dashboard:id}));

  }
  // Second layer: clear validation on tab change (also catches tab changes made from code)
  useEffect(() => {
    if (prevActiveTabRef.current === activeTabId) return; // first render → skip
    prevActiveTabRef.current = activeTabId;
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, dashboard_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
  }, [activeTabId]);
  const tabgroup_dashboard0d387Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tabgroup_dashboard0d387Ref.current?.setSearchParams();
    tabgroup_dashboard0d387Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tabgroup_dashboard0d387) && Object.keys(tabgroup_dashboard0d387)?.length>0)
      {
        settabgroup_dashboard0d387({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tabgroup_dashboard0d387Props?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "tab_header_view_all_fail",
      "title": "View all Failures",
      "content": <Grouptab_header_view_all_fail
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
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "tab_headerview_all_success",
      "title": "View all Success",
      "content": <Grouptab_headerview_all_success
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
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
  ]
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '3 / 141',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md`}
    >
    <Tabs
      headerClassName=""
      items={tabOptions}
      security={allowedComponent}
      direction='horizontal'
      onChange={handleOnChange}
      defaultActiveId={tabgroup_dashboard0d387?.tabgroup_dashboard || "tab_header_view_all_fail"}
      activeTab={tabgroup_dashboard0d387?.tabgroup_dashboard || "tab_header_view_all_fail"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouptabgroup_dashboard
