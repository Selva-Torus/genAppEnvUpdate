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
import Tableaccess_req_table  from './Tableaccess_req_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaccess_req_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_hrmdashboard_v1Props, setdfd_hrmdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accessrequest_v1Props, setdfd_accessrequest_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "employee_status"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "hrm_dashboard_group",
      "total_employees_group",
      "pending_access_req_group",
      "leave_requests_group",
      "onboarding_group",
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_ecp_hrm_totalemployees_v1",
      "employee_table_group",
      "emp_group",
      "total_employee_table",
      "ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1",
      "access_req_group",
      "acc_group",
      "access_req_table"
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
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {header_groupf778a, setheader_groupf778a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf778aProps, setheader_groupf778aProps}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cbProps, sethrm_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9, settotal_employees_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9Props, settotal_employees_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4Props, setpending_access_req_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5, setleave_requests_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5Props, setleave_requests_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580d, setonboarding_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580dProps, setonboarding_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6f, settable_groupe0a6f}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6fProps, settable_groupe0a6fProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010, setsubscreen1c010}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010Props, setsubscreen1c010Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008, setemployee_table_group55008}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008Props, setemployee_table_group55008Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40b, setemp_group5e40b}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40bProps, setemp_group5e40bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9dProps, settotal_employee_tablee4e9dProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258, setaccess_req_groupb1258}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258Props, setaccess_req_groupb1258Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167, setacc_group3b167}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167Props, setacc_group3b167Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aac, setaccess_req_tablec5aac}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aacProps, setaccess_req_tablec5aacProps}= useContext(TotalContext) as TotalContextProps;
  const {request_number43cc8, setrequest_number43cc8}= useContext(TotalContext) as TotalContextProps;
  const {full_name75729, setfull_name75729}= useContext(TotalContext) as TotalContextProps;
  const {system_name710c8, setsystem_name710c8}= useContext(TotalContext) as TotalContextProps;
  const {request_type6c8d5, setrequest_type6c8d5}= useContext(TotalContext) as TotalContextProps;
  const {access_rolefa4e4, setaccess_rolefa4e4}= useContext(TotalContext) as TotalContextProps;
  const {request_priorityc0eca, setrequest_priorityc0eca}= useContext(TotalContext) as TotalContextProps;
  const {risk_level0280a, setrisk_level0280a}= useContext(TotalContext) as TotalContextProps;
  const {employee_status3065d, setemployee_status3065d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {hrmdashboard_v1, sethrmdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1',
    [user],
    'GroupAccessReqTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b39e357350854d94874b9bb65bdc5aac");
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
    setaccess_req_tablec5aacProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_number43cc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_number43cc8?.isDisabled==null)
      {
        setrequest_number43cc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name75729((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name75729?.isDisabled==null)
      {
        setfull_name75729((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name")){
        setsystem_name710c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_name710c8?.isDisabled==null)
      {
        setsystem_name710c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_type")){
        setrequest_type6c8d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_type6c8d5?.isDisabled==null)
      {
        setrequest_type6c8d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role")){
        setaccess_rolefa4e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_rolefa4e4?.isDisabled==null)
      {
        setaccess_rolefa4e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_priority")){
        setrequest_priorityc0eca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_priorityc0eca?.isDisabled==null)
      {
        setrequest_priorityc0eca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_level")){
        setrisk_level0280a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(risk_level0280a?.isDisabled==null)
      {
        setrisk_level0280a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_status")){
        setemployee_status3065d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_status3065d?.isDisabled==null)
      {
        setemployee_status3065d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupf778a,
        codeStates['setheader_group'] = setheader_groupf778a,
        codeStates['header_groupf778a'] = header_groupf778aProps,
        codeStates['setheader_groupf778a'] = setheader_groupf778aProps,
        codeStates['hrm_dashboard_group'] = hrm_dashboard_group4d6cb,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_group4d6cb,
        codeStates['hrm_dashboard_group4d6cb'] = hrm_dashboard_group4d6cbProps,
        codeStates['sethrm_dashboard_group4d6cb'] = sethrm_dashboard_group4d6cbProps,
        codeStates['total_employees_group'] = total_employees_group69aa9,
        codeStates['settotal_employees_group'] = settotal_employees_group69aa9,
        codeStates['total_employees_group69aa9'] = total_employees_group69aa9Props,
        codeStates['settotal_employees_group69aa9'] = settotal_employees_group69aa9Props,
        codeStates['pending_access_req_group'] = pending_access_req_groupb5bd4,
        codeStates['setpending_access_req_group'] = setpending_access_req_groupb5bd4,
        codeStates['pending_access_req_groupb5bd4'] = pending_access_req_groupb5bd4Props,
        codeStates['setpending_access_req_groupb5bd4'] = setpending_access_req_groupb5bd4Props,
        codeStates['leave_requests_group'] = leave_requests_group4beb5,
        codeStates['setleave_requests_group'] = setleave_requests_group4beb5,
        codeStates['leave_requests_group4beb5'] = leave_requests_group4beb5Props,
        codeStates['setleave_requests_group4beb5'] = setleave_requests_group4beb5Props,
        codeStates['onboarding_group'] = onboarding_group2580d,
        codeStates['setonboarding_group'] = setonboarding_group2580d,
        codeStates['onboarding_group2580d'] = onboarding_group2580dProps,
        codeStates['setonboarding_group2580d'] = setonboarding_group2580dProps,
        codeStates['table_group'] = table_groupe0a6f,
        codeStates['settable_group'] = settable_groupe0a6f,
        codeStates['table_groupe0a6f'] = table_groupe0a6fProps,
        codeStates['settable_groupe0a6f'] = settable_groupe0a6fProps,
        codeStates['subscreen'] = subscreen1c010,
        codeStates['setsubscreen'] = setsubscreen1c010,
        codeStates['subscreen1c010'] = subscreen1c010Props,
        codeStates['setsubscreen1c010'] = setsubscreen1c010Props,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['employee_table_group'] = employee_table_group55008,
        codeStates['setemployee_table_group'] = setemployee_table_group55008,
        codeStates['employee_table_group55008'] = employee_table_group55008Props,
        codeStates['setemployee_table_group55008'] = setemployee_table_group55008Props,
        codeStates['emp_group'] = emp_group5e40b,
        codeStates['setemp_group'] = setemp_group5e40b,
        codeStates['emp_group5e40b'] = emp_group5e40bProps,
        codeStates['setemp_group5e40b'] = setemp_group5e40bProps,
        codeStates['total_employee_table'] = total_employee_tablee4e9d,
        codeStates['settotal_employee_table'] = settotal_employee_tablee4e9d,
        codeStates['total_employee_tablee4e9d'] = total_employee_tablee4e9dProps,
        codeStates['settotal_employee_tablee4e9d'] = settotal_employee_tablee4e9dProps,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['access_req_group'] = access_req_groupb1258,
        codeStates['setaccess_req_group'] = setaccess_req_groupb1258,
        codeStates['access_req_groupb1258'] = access_req_groupb1258Props,
        codeStates['setaccess_req_groupb1258'] = setaccess_req_groupb1258Props,
        codeStates['acc_group'] = acc_group3b167,
        codeStates['setacc_group'] = setacc_group3b167,
        codeStates['acc_group3b167'] = acc_group3b167Props,
        codeStates['setacc_group3b167'] = setacc_group3b167Props,
        codeStates['access_req_table'] = access_req_tablec5aac,
        codeStates['setaccess_req_table'] = setaccess_req_tablec5aac,
        codeStates['access_req_tablec5aac'] = access_req_tablec5aacProps,
        codeStates['setaccess_req_tablec5aac'] = setaccess_req_tablec5aacProps,
        codeStates['request_number'] = request_number43cc8,
        codeStates['setrequest_number'] = setrequest_number43cc8,
        codeStates['full_name'] = full_name75729,
        codeStates['setfull_name'] = setfull_name75729,
        codeStates['system_name'] = system_name710c8,
        codeStates['setsystem_name'] = setsystem_name710c8,
        codeStates['request_type'] = request_type6c8d5,
        codeStates['setrequest_type'] = setrequest_type6c8d5,
        codeStates['access_role'] = access_rolefa4e4,
        codeStates['setaccess_role'] = setaccess_rolefa4e4,
        codeStates['request_priority'] = request_priorityc0eca,
        codeStates['setrequest_priority'] = setrequest_priorityc0eca,
        codeStates['risk_level'] = risk_level0280a,
        codeStates['setrisk_level'] = setrisk_level0280a,
        codeStates['employee_status'] = employee_status3065d,
        codeStates['setemployee_status'] = setemployee_status3065d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req_tablec5aacRef = useRef<any>(null);
  const handleClearSearch = () => {
    access_req_tablec5aacRef.current?.setSearchParams();
    access_req_tablec5aacRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req_tablec5aac) && Object.keys(access_req_tablec5aac)?.length>0)
      {
        setaccess_req_tablec5aac({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req_tablec5aacProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 106',
      
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
          sethrmdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"access_req_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableaccess_req_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={access_req_tablec5aacRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupaccess_req_table
