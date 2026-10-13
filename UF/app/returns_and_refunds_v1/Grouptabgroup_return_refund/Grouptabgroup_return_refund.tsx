'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Grouptab_header_return_frm_agent  from "../Grouptab_header_return_frm_agent/Grouptab_header_return_frm_agent";
import Grouptab_header_req_for_refund  from "../Grouptab_header_req_for_refund/Grouptab_header_req_for_refund";
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


const Grouptabgroup_return_refund = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
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
  const {dfd_returnfromagentfilelist_v1Props, setdfd_returnfromagentfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestforrefundfilelist_v1Props, setdfd_requestforrefundfilelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
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
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
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
      "grp_return_refund",
      "tabgroup_return_refund",
      "tab_header_return_frm_agent",
      "grp_retun_ref",
      "tbl_return_fie_list",
      "tab_header_req_for_refund",
      "grp_rr_retun_ref",
      "tbl_rr_req_for_refund"
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
  const {grp_wpsb96c6, setgrp_wpsb96c6}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsb96c6Props, setgrp_wpsb96c6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127, setgrp_eobed127}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127Props, setgrp_eobed127Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03, setgrp_return_refundc4a03}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03Props, setgrp_return_refundc4a03Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7Props, settabgroup_return_refund4e9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327, settab_header_return_frm_agent2d327}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6, setgrp_retun_ref3e6e6}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6Props, setgrp_retun_ref3e6e6Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636, settbl_return_fie_list8f636}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636Props, settbl_return_fie_list8f636Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2, settab_header_req_for_refundeadd2}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362dProps, setgrp_rr_retun_ref5362dProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9aProps, settbl_rr_req_for_refunde2c9aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // Active tab id
  const activeTabId = tabgroup_return_refund4e9b7?.tabgroup_return_refund || "tab_header_return_frm_agent";
  const prevActiveTabRef = useRef(activeTabId);
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "465435080cb32a75143174e64fd4e9b7"
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
      if(!tabgroup_return_refund4e9b7?.tabgroup_return_refund || tabgroup_return_refund4e9b7?.tabgroup_return_refund === ""){
      settabgroup_return_refund4e9b7((pre:any)=>({...pre,tabgroup_return_refund:tabOptions[i]?.id}));
      break;
      }
    }
  }   
  /////////////
        settab_header_return_frm_agent2d327({...tab_header_return_frm_agent2d327,isDisabled:orchestrationData?.data?.readableControls.includes("tab_header_return_frm_agent")});
        settab_header_req_for_refundeadd2({...tab_header_req_for_refundeadd2,isDisabled:orchestrationData?.data?.readableControls.includes("tab_header_req_for_refund")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "tab_header_return_frm_agent",
        codeStates['grp_wps'] = grp_wpsb96c6,
        codeStates['setgrp_wps'] = setgrp_wpsb96c6,
        codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
        codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
        codeStates['grp_eob'] = grp_eobed127,
        codeStates['setgrp_eob'] = setgrp_eobed127,
        codeStates['grp_eobed127'] = grp_eobed127Props,
        codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
        codeStates['grp_return_refund'] = grp_return_refundc4a03,
        codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
        codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
        codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
        codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
        codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
        codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
        codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
        codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
        codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
        codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
        codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
        codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
        codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
        codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
        codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
        codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
        codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
        codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
        codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
        codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
        codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
        codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
        codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
        codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        settabgroup_return_refund4e9b7((pre:any)=>({...pre,tabgroup_return_refund:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, returnsRefund_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['grp_wps'] = grp_wpsb96c6,
        codeStates['setgrp_wps'] = setgrp_wpsb96c6,
        codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
        codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
        codeStates['grp_eob'] = grp_eobed127,
        codeStates['setgrp_eob'] = setgrp_eobed127,
        codeStates['grp_eobed127'] = grp_eobed127Props,
        codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
        codeStates['grp_return_refund'] = grp_return_refundc4a03,
        codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
        codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
        codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
        codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
        codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
        codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
        codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
        codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
        codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
        codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
        codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
        codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
        codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
        codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
        codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
        codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
        codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
        codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
        codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
        codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
        codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
        codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
        codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
        codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,
      codeExecution(code,codeStates);
    }
    settabgroup_return_refund4e9b7((pre:any)=>({...pre,tabgroup_return_refund:id}));

  }
  // Second layer: clear validation on tab change (also catches tab changes made from code)
  useEffect(() => {
    if (prevActiveTabRef.current === activeTabId) return; // first render → skip
    prevActiveTabRef.current = activeTabId;
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, returnsRefund_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
  }, [activeTabId]);
  const tabgroup_return_refund4e9b7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tabgroup_return_refund4e9b7Ref.current?.setSearchParams();
    tabgroup_return_refund4e9b7Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tabgroup_return_refund4e9b7) && Object.keys(tabgroup_return_refund4e9b7)?.length>0)
      {
        settabgroup_return_refund4e9b7({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tabgroup_return_refund4e9b7Props?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "tab_header_return_frm_agent",
      "title": "Return from agent",
      "content": <Grouptab_header_return_frm_agent
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
      "id": "tab_header_req_for_refund",
      "title": "Request for Refund",
      "content": <Grouptab_header_req_for_refund
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
        gridRow: '4 / 138',
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
      defaultActiveId={tabgroup_return_refund4e9b7?.tabgroup_return_refund || "tab_header_return_frm_agent"}
      activeTab={tabgroup_return_refund4e9b7?.tabgroup_return_refund || "tab_header_return_frm_agent"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouptabgroup_return_refund
