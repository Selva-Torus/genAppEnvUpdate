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
import Textleave_req_details  from "./Textleave_req_details";
import TextInputleave_request_number  from "./TextInputleave_request_number";
import ComboBoxfull_name  from "./ComboBoxfull_name";
import Dropdownpolicy_name  from "./Dropdownpolicy_name";
import Dropdownleave_reason_category  from "./Dropdownleave_reason_category";
import Checkboxemergency_leave_checkbox  from "./Checkboxemergency_leave_checkbox";
import DatePickerstart_date  from "./DatePickerstart_date";
import DatePickerend_date  from "./DatePickerend_date";
import TextInputdays_requested  from "./TextInputdays_requested";
import Switchhalf_day_switch  from "./Switchhalf_day_switch";
import RadioGrouphaf_day_session  from "./RadioGrouphaf_day_session";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaccess_req__group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policynamecombo_v1Props, setdfd_policynamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavereasoncategorycombo_v1Props, setdfd_leavereasoncategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_req_details",
      "leave_request_number",
      "full_name",
      "policy_name",
      "leave_reason_category",
      "emergency_leave_checkbox",
      "start_date",
      "end_date",
      "days_requested",
      "half_day_switch",
      "haf_day_session"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
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
  const {new_access_group9bde0, setnew_access_group9bde0}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group9bde0Props, setnew_access_group9bde0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7, setdynamicactionse55b7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7Props, setdynamicactionse55b7Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855, setaccess_req__group23855}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855Props, setaccess_req__group23855Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_details94d2a, setleave_req_details94d2a}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number9e857, setleave_request_number9e857}= useContext(TotalContext) as TotalContextProps;
  const {full_namef5482, setfull_namef5482}= useContext(TotalContext) as TotalContextProps;
  const {policy_nameca7f5, setpolicy_nameca7f5}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_category26b76, setleave_reason_category26b76}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkboxaac78, setemergency_leave_checkboxaac78}= useContext(TotalContext) as TotalContextProps;
  const {start_date22dc6, setstart_date22dc6}= useContext(TotalContext) as TotalContextProps;
  const {end_dateb0819, setend_dateb0819}= useContext(TotalContext) as TotalContextProps;
  const {days_requested84d0e, setdays_requested84d0e}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switchb71e0, sethalf_day_switchb71e0}= useContext(TotalContext) as TotalContextProps;
  const {haf_day_session36e8a, sethaf_day_session36e8a}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476, setemp_avail_group21476}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476Props, setemp_avail_group21476Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19a, setleave_balance_group2b19a}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19aProps, setleave_balance_group2b19aProps}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335, setapp_det_groupe1335}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335Props, setapp_det_groupe1335Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00a, setapprove_group1e00a}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00aProps, setapprove_group1e00aProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703, setaudit_groupa0703}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703Props, setaudit_groupa0703Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {applyleave_v1, setapplyleave_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1',
    [user],
    'GroupAccessReq_group',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8b4e755807abc210c828a73248623855");
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
    setaccess_req__group23855Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_req_details")){
        setleave_req_details94d2a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_details94d2a?.isDisabled==null)
      {
        setleave_req_details94d2a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_request_number")){
        setleave_request_number9e857((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_request_number9e857?.isDisabled==null)
      {
        setleave_request_number9e857((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_namef5482((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_namef5482?.isDisabled==null)
      {
        setfull_namef5482((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_nameca7f5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_nameca7f5?.isDisabled==null)
      {
        setpolicy_nameca7f5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_reason_category")){
        setleave_reason_category26b76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_reason_category26b76?.isDisabled==null)
      {
        setleave_reason_category26b76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("emergency_leave_checkbox")){
        setemergency_leave_checkboxaac78((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emergency_leave_checkboxaac78?.isDisabled==null)
      {
        setemergency_leave_checkboxaac78((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("start_date")){
        setstart_date22dc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(start_date22dc6?.isDisabled==null)
      {
        setstart_date22dc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("end_date")){
        setend_dateb0819((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(end_dateb0819?.isDisabled==null)
      {
        setend_dateb0819((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("days_requested")){
        setdays_requested84d0e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(days_requested84d0e?.isDisabled==null)
      {
        setdays_requested84d0e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("half_day_switch")){
        sethalf_day_switchb71e0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(half_day_switchb71e0?.isDisabled==null)
      {
        sethalf_day_switchb71e0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("haf_day_session")){
        sethaf_day_session36e8a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(haf_day_session36e8a?.isDisabled==null)
      {
        sethaf_day_session36e8a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['leave_req_details'] = leave_req_details94d2a,
        codeStates['setleave_req_details'] = setleave_req_details94d2a,
        codeStates['leave_request_number'] = leave_request_number9e857,
        codeStates['setleave_request_number'] = setleave_request_number9e857,
        codeStates['full_name'] = full_namef5482,
        codeStates['setfull_name'] = setfull_namef5482,
        codeStates['policy_name'] = policy_nameca7f5,
        codeStates['setpolicy_name'] = setpolicy_nameca7f5,
        codeStates['leave_reason_category'] = leave_reason_category26b76,
        codeStates['setleave_reason_category'] = setleave_reason_category26b76,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkboxaac78,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkboxaac78,
        codeStates['start_date'] = start_date22dc6,
        codeStates['setstart_date'] = setstart_date22dc6,
        codeStates['end_date'] = end_dateb0819,
        codeStates['setend_date'] = setend_dateb0819,
        codeStates['days_requested'] = days_requested84d0e,
        codeStates['setdays_requested'] = setdays_requested84d0e,
        codeStates['half_day_switch'] = half_day_switchb71e0,
        codeStates['sethalf_day_switch'] = sethalf_day_switchb71e0,
        codeStates['haf_day_session'] = haf_day_session36e8a,
        codeStates['sethaf_day_session'] = sethaf_day_session36e8a,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,

    codeExecution(code,codeStates);
    } 
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
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['leave_req_details'] = leave_req_details94d2a,
        codeStates['setleave_req_details'] = setleave_req_details94d2a,
        codeStates['leave_request_number'] = leave_request_number9e857,
        codeStates['setleave_request_number'] = setleave_request_number9e857,
        codeStates['full_name'] = full_namef5482,
        codeStates['setfull_name'] = setfull_namef5482,
        codeStates['policy_name'] = policy_nameca7f5,
        codeStates['setpolicy_name'] = setpolicy_nameca7f5,
        codeStates['leave_reason_category'] = leave_reason_category26b76,
        codeStates['setleave_reason_category'] = setleave_reason_category26b76,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkboxaac78,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkboxaac78,
        codeStates['start_date'] = start_date22dc6,
        codeStates['setstart_date'] = setstart_date22dc6,
        codeStates['end_date'] = end_dateb0819,
        codeStates['setend_date'] = setend_dateb0819,
        codeStates['days_requested'] = days_requested84d0e,
        codeStates['setdays_requested'] = setdays_requested84d0e,
        codeStates['half_day_switch'] = half_day_switchb71e0,
        codeStates['sethalf_day_switch'] = sethalf_day_switchb71e0,
        codeStates['haf_day_session'] = haf_day_session36e8a,
        codeStates['sethaf_day_session'] = sethaf_day_session36e8a,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__group23855Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__group23855Ref.current?.setSearchParams();
    access_req__group23855Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__group23855) && Object.keys(access_req__group23855)?.length>0)
      {
        setaccess_req__group23855({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__group23855Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '11 / 46',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setapplyleave_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("leave_req_details") ?<Textleave_req_details   /* 94d2a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("leave_request_number") ?<TextInputleave_request_number   /* 9e857 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("full_name") ?<ComboBoxfull_name /* f5482 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("policy_name") ?<Dropdownpolicy_name   /* ca7f5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("leave_reason_category") ?<Dropdownleave_reason_category   /* 26b76 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("emergency_leave_checkbox") ?<Checkboxemergency_leave_checkbox   /* aac78 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("start_date") ?<DatePickerstart_date   /* 22dc6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("end_date") ?<DatePickerend_date   /* b0819 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("days_requested") ?<TextInputdays_requested   /* 84d0e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("half_day_switch")?<Switchhalf_day_switch  /* b71e0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("haf_day_session")?<RadioGrouphaf_day_session   /* 36e8a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
