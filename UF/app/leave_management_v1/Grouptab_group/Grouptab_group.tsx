'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import Groupleave_request_table  from "../Groupleave_request_table/Groupleave_request_table";
import Groupapproval_pending  from "../Groupapproval_pending/Groupapproval_pending";
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
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptab_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
    const decodedTokenObj:any = decodeToken(token);

  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_leaverequesttab_v1Props, setdfd_leaverequesttab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leaveapprovalpendingtab_v1Props, setdfd_leaveapprovalpendingtab_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
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
  const {overall_group3fa8c, setoverall_group3fa8c}= useContext(TotalContext) as TotalContextProps;
  const {overall_group3fa8cProps, setoverall_group3fa8cProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908Props, settab_groupfe908Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233, setleave_request_table25233}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cdProps, setemp_table_group0a9cdProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32bProps, setleave_req_tablesbb32bProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "4839b74a902a41849be53cbf009fe908"
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
      settab_groupfe908((pre:any)=>({...pre,tab_group:tabOptions[i]?.id}));
      break;
    }
  }   
  /////////////
        setleave_request_table25233({...leave_request_table25233,isDisabled:orchestrationData?.data?.readableControls.includes("leave_request_table")});
        setapproval_pendinge1c0b({...approval_pendinge1c0b,isDisabled:orchestrationData?.data?.readableControls.includes("approval_pending")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "leave_request_table",
        codeStates['overall_group'] = overall_group3fa8c,
        codeStates['setoverall_group'] = setoverall_group3fa8c,
        codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
        codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
        codeStates['tab_group'] = tab_groupfe908,
        codeStates['settab_group'] = settab_groupfe908,
        codeStates['tab_groupfe908'] = tab_groupfe908Props,
        codeStates['settab_groupfe908'] = settab_groupfe908Props,
        codeStates['leave_request_table'] = leave_request_table25233,
        codeStates['setleave_request_table'] = setleave_request_table25233,
        codeStates['emp_table_group'] = emp_table_group0a9cd,
        codeStates['setemp_table_group'] = setemp_table_group0a9cd,
        codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
        codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
        codeStates['leave_req_tables'] = leave_req_tablesbb32b,
        codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
        codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
        codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
        codeStates['approval_pending'] = approval_pendinge1c0b,
        codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
        codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
        codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
        codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
        codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
        codeStates['approval_pending_table'] = approval_pending_tablee294f,
        codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
        codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
        codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        settab_groupfe908((pre:any)=>({...pre,tab_group:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['overall_group'] = overall_group3fa8c,
        codeStates['setoverall_group'] = setoverall_group3fa8c,
        codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
        codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
        codeStates['tab_group'] = tab_groupfe908,
        codeStates['settab_group'] = settab_groupfe908,
        codeStates['tab_groupfe908'] = tab_groupfe908Props,
        codeStates['settab_groupfe908'] = settab_groupfe908Props,
        codeStates['leave_request_table'] = leave_request_table25233,
        codeStates['setleave_request_table'] = setleave_request_table25233,
        codeStates['emp_table_group'] = emp_table_group0a9cd,
        codeStates['setemp_table_group'] = setemp_table_group0a9cd,
        codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
        codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
        codeStates['leave_req_tables'] = leave_req_tablesbb32b,
        codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
        codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
        codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
        codeStates['approval_pending'] = approval_pendinge1c0b,
        codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
        codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
        codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
        codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
        codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
        codeStates['approval_pending_table'] = approval_pending_tablee294f,
        codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
        codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
        codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,
      codeExecution(code,codeStates);
    }
    settab_groupfe908((pre:any)=>({...pre,tab_group:id}));

  }
  const tab_groupfe908Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tab_groupfe908Ref.current?.setSearchParams();
    tab_groupfe908Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tab_groupfe908) && Object.keys(tab_groupfe908)?.length>0)
      {
        settab_groupfe908({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tab_groupfe908Props?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "leave_request_table",
      "title": "Leave Request",
      "content": <Groupleave_request_table
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
      "id": "approval_pending",
      "title": "Approval Pending",
      "content": <Groupapproval_pending
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
        gridRow: '9 / 143',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'#f4f5fa',
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
      defaultActiveId={tab_groupfe908?.tab_group || "leave_request_table"}
      activeTab={tab_groupfe908?.tab_group || "leave_request_table"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Grouptab_group
