'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Grouptab_header_view_all_emp  from "../Grouptab_header_view_all_emp/Grouptab_header_view_all_emp";
import Grouptab_headerview_all_tran  from "../Grouptab_headerview_all_tran/Grouptab_headerview_all_tran";
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
  const {grp_wpsfa727, setgrp_wpsfa727}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsfa727Props, setgrp_wpsfa727Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfac, setgrp_eob8dfac}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfacProps, setgrp_eob8dfacProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2a, setgrp_enquiryd2b2a}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511db, settabgroup_return_refund511db}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45, settab_header_view_all_emp58f45}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2, setgrp_retun_ref230e2}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2Props, setgrp_retun_ref230e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773, settab_headerview_all_tranaa773}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82e, setgrp_reqforref4f82e}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82eProps, setgrp_reqforref4f82eProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49d, settbl_view_all_tran1b49d}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // Active tab id
  const activeTabId = tabgroup_return_refund511db?.tabgroup_return_refund || "tab_header_view_all_emp";
  const prevActiveTabRef = useRef(activeTabId);
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "a65c9a17078fe360a37e1543183511db"
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
      if(!tabgroup_return_refund511db?.tabgroup_return_refund || tabgroup_return_refund511db?.tabgroup_return_refund === ""){
      settabgroup_return_refund511db((pre:any)=>({...pre,tabgroup_return_refund:tabOptions[i]?.id}));
      break;
      }
    }
  }   
  /////////////
        settab_header_view_all_emp58f45({...tab_header_view_all_emp58f45,isDisabled:orchestrationData?.data?.readableControls.includes("tab_header_view_all_emp")});
        settab_headerview_all_tranaa773({...tab_headerview_all_tranaa773,isDisabled:orchestrationData?.data?.readableControls.includes("tab_headerview_all_tran")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "tab_header_view_all_emp",
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


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        settabgroup_return_refund511db((pre:any)=>({...pre,tabgroup_return_refund:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, enquiry_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
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
    settabgroup_return_refund511db((pre:any)=>({...pre,tabgroup_return_refund:id}));

  }
  // Second layer: clear validation on tab change (also catches tab changes made from code)
  useEffect(() => {
    if (prevActiveTabRef.current === activeTabId) return; // first render → skip
    prevActiveTabRef.current = activeTabId;
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, enquiry_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
  }, [activeTabId]);
  const tabgroup_return_refund511dbRef = useRef<any>(null);
  const handleClearSearch = () => {
    tabgroup_return_refund511dbRef.current?.setSearchParams();
    tabgroup_return_refund511dbRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tabgroup_return_refund511db) && Object.keys(tabgroup_return_refund511db)?.length>0)
      {
        settabgroup_return_refund511db({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tabgroup_return_refund511dbProps?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "tab_header_view_all_emp",
      "title": "View all Employers",
      "content": <Grouptab_header_view_all_emp
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
      "id": "tab_headerview_all_tran",
      "title": "View all transactions",
      "content": <Grouptab_headerview_all_tran
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
      defaultActiveId={tabgroup_return_refund511db?.tabgroup_return_refund || "tab_header_view_all_emp"}
      activeTab={tabgroup_return_refund511db?.tabgroup_return_refund || "tab_header_view_all_emp"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouptabgroup_return_refund
