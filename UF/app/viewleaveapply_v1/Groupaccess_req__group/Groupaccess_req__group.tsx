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
  const {dfd_applyleave_v1Props, setdfd_applyleave_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_detailsf2bd7, setleave_req_detailsf2bd7}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_numberb0948, setleave_request_numberb0948}= useContext(TotalContext) as TotalContextProps;
  const {full_namedebbe, setfull_namedebbe}= useContext(TotalContext) as TotalContextProps;
  const {policy_name67103, setpolicy_name67103}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_categorya15ad, setleave_reason_categorya15ad}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox63f2e, setemergency_leave_checkbox63f2e}= useContext(TotalContext) as TotalContextProps;
  const {start_date8bb1a, setstart_date8bb1a}= useContext(TotalContext) as TotalContextProps;
  const {end_datea8b1a, setend_datea8b1a}= useContext(TotalContext) as TotalContextProps;
  const {days_requested4683c, setdays_requested4683c}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch96651, sethalf_day_switch96651}= useContext(TotalContext) as TotalContextProps;
  const {haf_day_session61b96, sethaf_day_session61b96}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewleaveapply_v1, setviewleaveapply_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1adc3ad97f24278a74ffd028cc8578e5");
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
    setaccess_req__group578e5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_req_details")){
        setleave_req_detailsf2bd7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_detailsf2bd7?.isDisabled==null)
      {
        setleave_req_detailsf2bd7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_request_number")){
        setleave_request_numberb0948((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_request_numberb0948?.isDisabled==null)
      {
        setleave_request_numberb0948((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_namedebbe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_namedebbe?.isDisabled==null)
      {
        setfull_namedebbe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_name67103((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_name67103?.isDisabled==null)
      {
        setpolicy_name67103((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_reason_category")){
        setleave_reason_categorya15ad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_reason_categorya15ad?.isDisabled==null)
      {
        setleave_reason_categorya15ad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("emergency_leave_checkbox")){
        setemergency_leave_checkbox63f2e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emergency_leave_checkbox63f2e?.isDisabled==null)
      {
        setemergency_leave_checkbox63f2e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("start_date")){
        setstart_date8bb1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(start_date8bb1a?.isDisabled==null)
      {
        setstart_date8bb1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("end_date")){
        setend_datea8b1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(end_datea8b1a?.isDisabled==null)
      {
        setend_datea8b1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("days_requested")){
        setdays_requested4683c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(days_requested4683c?.isDisabled==null)
      {
        setdays_requested4683c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("half_day_switch")){
        sethalf_day_switch96651((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(half_day_switch96651?.isDisabled==null)
      {
        sethalf_day_switch96651((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("haf_day_session")){
        sethaf_day_session61b96((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(haf_day_session61b96?.isDisabled==null)
      {
        sethaf_day_session61b96((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['leave_req_details'] = leave_req_detailsf2bd7,
        codeStates['setleave_req_details'] = setleave_req_detailsf2bd7,
        codeStates['leave_request_number'] = leave_request_numberb0948,
        codeStates['setleave_request_number'] = setleave_request_numberb0948,
        codeStates['full_name'] = full_namedebbe,
        codeStates['setfull_name'] = setfull_namedebbe,
        codeStates['policy_name'] = policy_name67103,
        codeStates['setpolicy_name'] = setpolicy_name67103,
        codeStates['leave_reason_category'] = leave_reason_categorya15ad,
        codeStates['setleave_reason_category'] = setleave_reason_categorya15ad,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox63f2e,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox63f2e,
        codeStates['start_date'] = start_date8bb1a,
        codeStates['setstart_date'] = setstart_date8bb1a,
        codeStates['end_date'] = end_datea8b1a,
        codeStates['setend_date'] = setend_datea8b1a,
        codeStates['days_requested'] = days_requested4683c,
        codeStates['setdays_requested'] = setdays_requested4683c,
        codeStates['half_day_switch'] = half_day_switch96651,
        codeStates['sethalf_day_switch'] = sethalf_day_switch96651,
        codeStates['haf_day_session'] = haf_day_session61b96,
        codeStates['sethaf_day_session'] = sethaf_day_session61b96,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,

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
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['leave_req_details'] = leave_req_detailsf2bd7,
        codeStates['setleave_req_details'] = setleave_req_detailsf2bd7,
        codeStates['leave_request_number'] = leave_request_numberb0948,
        codeStates['setleave_request_number'] = setleave_request_numberb0948,
        codeStates['full_name'] = full_namedebbe,
        codeStates['setfull_name'] = setfull_namedebbe,
        codeStates['policy_name'] = policy_name67103,
        codeStates['setpolicy_name'] = setpolicy_name67103,
        codeStates['leave_reason_category'] = leave_reason_categorya15ad,
        codeStates['setleave_reason_category'] = setleave_reason_categorya15ad,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox63f2e,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox63f2e,
        codeStates['start_date'] = start_date8bb1a,
        codeStates['setstart_date'] = setstart_date8bb1a,
        codeStates['end_date'] = end_datea8b1a,
        codeStates['setend_date'] = setend_datea8b1a,
        codeStates['days_requested'] = days_requested4683c,
        codeStates['setdays_requested'] = setdays_requested4683c,
        codeStates['half_day_switch'] = half_day_switch96651,
        codeStates['sethalf_day_switch'] = sethalf_day_switch96651,
        codeStates['haf_day_session'] = haf_day_session61b96,
        codeStates['sethaf_day_session'] = sethaf_day_session61b96,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__group578e5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__group578e5Ref.current?.setSearchParams();
    access_req__group578e5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__group578e5) && Object.keys(access_req__group578e5)?.length>0)
      {
        setaccess_req__group578e5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__group578e5Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 36',
      
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
          setviewleaveapply_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("leave_req_details") ?<Textleave_req_details   /* f2bd7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("leave_request_number") ?<TextInputleave_request_number   /* b0948 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("full_name") ?<ComboBoxfull_name /* debbe */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("policy_name") ?<Dropdownpolicy_name   /* 67103 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("leave_reason_category") ?<Dropdownleave_reason_category   /* a15ad */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("emergency_leave_checkbox") ?<Checkboxemergency_leave_checkbox   /* 63f2e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("start_date") ?<DatePickerstart_date   /* 8bb1a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("end_date") ?<DatePickerend_date   /* a8b1a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("days_requested") ?<TextInputdays_requested   /* 4683c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("half_day_switch")?<Switchhalf_day_switch  /* 96651 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("haf_day_session")?<RadioGrouphaf_day_session   /* 61b96 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
