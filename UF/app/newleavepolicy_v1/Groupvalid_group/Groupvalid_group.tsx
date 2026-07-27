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
import Textleave_entity  from "./Textleave_entity";
import TextInputdays_per_year  from "./TextInputdays_per_year";
import TextInputcarry_forward_days  from "./TextInputcarry_forward_days";
import TextInputcarry_forward_expiry  from "./TextInputcarry_forward_expiry";
import Dropdownaccrual_frequency  from "./Dropdownaccrual_frequency";
import TextInputmax_consecutive_days  from "./TextInputmax_consecutive_days";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvalid_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavetypecombo_v1Props, setdfd_leavetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_accrualfrequencycombo_v1Props, setdfd_accrualfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gendercombo_v1Props, setdfd_gendercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statecombo_v1Props, setdfd_statecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_entity",
      "days_per_year",
      "carry_forward_days",
      "carry_forward_expiry",
      "accrual_frequency",
      "max_consecutive_days"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "app_inf_group",
      "approve_group",
      "valid_group",
      "business_just__group",
      "provision_group",
      "leave_rule_group",
      "dynamicactions"
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
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196e, setapp_inf_group2196e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196eProps, setapp_inf_group2196eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_entityb9f6e, setleave_entityb9f6e}= useContext(TotalContext) as TotalContextProps;
  const {days_per_year2cf6f, setdays_per_year2cf6f}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_days3f3d5, setcarry_forward_days3f3d5}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_expiry448cb, setcarry_forward_expiry448cb}= useContext(TotalContext) as TotalContextProps;
  const {accrual_frequency3f1b6, setaccrual_frequency3f1b6}= useContext(TotalContext) as TotalContextProps;
  const {max_consecutive_days3d6d6, setmax_consecutive_days3d6d6}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40, setdynamicactionsd8c40}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40Props, setdynamicactionsd8c40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newleavepolicy_v1, setnewleavepolicy_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1',
    [user],
    'GroupValidGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7e3c285562b42eca97c3f153fae5c57c");
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
    setvalid_group5c57cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_entity")){
        setleave_entityb9f6e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_entityb9f6e?.isDisabled==null)
      {
        setleave_entityb9f6e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("days_per_year")){
        setdays_per_year2cf6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(days_per_year2cf6f?.isDisabled==null)
      {
        setdays_per_year2cf6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("carry_forward_days")){
        setcarry_forward_days3f3d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(carry_forward_days3f3d5?.isDisabled==null)
      {
        setcarry_forward_days3f3d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("carry_forward_expiry")){
        setcarry_forward_expiry448cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(carry_forward_expiry448cb?.isDisabled==null)
      {
        setcarry_forward_expiry448cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("accrual_frequency")){
        setaccrual_frequency3f1b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(accrual_frequency3f1b6?.isDisabled==null)
      {
        setaccrual_frequency3f1b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_consecutive_days")){
        setmax_consecutive_days3d6d6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(max_consecutive_days3d6d6?.isDisabled==null)
      {
        setmax_consecutive_days3d6d6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group86c35,
        codeStates['setnew_access_group'] = setnew_access_group86c35,
        codeStates['new_access_group86c35'] = new_access_group86c35Props,
        codeStates['setnew_access_group86c35'] = setnew_access_group86c35Props,
        codeStates['access_req__group'] = access_req__groupae6e3,
        codeStates['setaccess_req__group'] = setaccess_req__groupae6e3,
        codeStates['access_req__groupae6e3'] = access_req__groupae6e3Props,
        codeStates['setaccess_req__groupae6e3'] = setaccess_req__groupae6e3Props,
        codeStates['app_inf_group'] = app_inf_group2196e,
        codeStates['setapp_inf_group'] = setapp_inf_group2196e,
        codeStates['app_inf_group2196e'] = app_inf_group2196eProps,
        codeStates['setapp_inf_group2196e'] = setapp_inf_group2196eProps,
        codeStates['approve_group'] = approve_group0167c,
        codeStates['setapprove_group'] = setapprove_group0167c,
        codeStates['approve_group0167c'] = approve_group0167cProps,
        codeStates['setapprove_group0167c'] = setapprove_group0167cProps,
        codeStates['valid_group'] = valid_group5c57c,
        codeStates['setvalid_group'] = setvalid_group5c57c,
        codeStates['valid_group5c57c'] = valid_group5c57cProps,
        codeStates['setvalid_group5c57c'] = setvalid_group5c57cProps,
        codeStates['leave_entity'] = leave_entityb9f6e,
        codeStates['setleave_entity'] = setleave_entityb9f6e,
        codeStates['days_per_year'] = days_per_year2cf6f,
        codeStates['setdays_per_year'] = setdays_per_year2cf6f,
        codeStates['carry_forward_days'] = carry_forward_days3f3d5,
        codeStates['setcarry_forward_days'] = setcarry_forward_days3f3d5,
        codeStates['carry_forward_expiry'] = carry_forward_expiry448cb,
        codeStates['setcarry_forward_expiry'] = setcarry_forward_expiry448cb,
        codeStates['accrual_frequency'] = accrual_frequency3f1b6,
        codeStates['setaccrual_frequency'] = setaccrual_frequency3f1b6,
        codeStates['max_consecutive_days'] = max_consecutive_days3d6d6,
        codeStates['setmax_consecutive_days'] = setmax_consecutive_days3d6d6,
        codeStates['business_just__group'] = business_just__groupd6ebd,
        codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd,
        codeStates['business_just__groupd6ebd'] = business_just__groupd6ebdProps,
        codeStates['setbusiness_just__groupd6ebd'] = setbusiness_just__groupd6ebdProps,
        codeStates['provision_group'] = provision_groupc3fca,
        codeStates['setprovision_group'] = setprovision_groupc3fca,
        codeStates['provision_groupc3fca'] = provision_groupc3fcaProps,
        codeStates['setprovision_groupc3fca'] = setprovision_groupc3fcaProps,
        codeStates['leave_rule_group'] = leave_rule_groupf75c0,
        codeStates['setleave_rule_group'] = setleave_rule_groupf75c0,
        codeStates['leave_rule_groupf75c0'] = leave_rule_groupf75c0Props,
        codeStates['setleave_rule_groupf75c0'] = setleave_rule_groupf75c0Props,
        codeStates['dynamicactions'] = dynamicactionsd8c40,
        codeStates['setdynamicactions'] = setdynamicactionsd8c40,
        codeStates['dynamicactionsd8c40'] = dynamicactionsd8c40Props,
        codeStates['setdynamicactionsd8c40'] = setdynamicactionsd8c40Props,

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
        codeStates['new_access_group'] = new_access_group86c35,
        codeStates['setnew_access_group'] = setnew_access_group86c35,
        codeStates['new_access_group86c35'] = new_access_group86c35Props,
        codeStates['setnew_access_group86c35'] = setnew_access_group86c35Props,
        codeStates['access_req__group'] = access_req__groupae6e3,
        codeStates['setaccess_req__group'] = setaccess_req__groupae6e3,
        codeStates['access_req__groupae6e3'] = access_req__groupae6e3Props,
        codeStates['setaccess_req__groupae6e3'] = setaccess_req__groupae6e3Props,
        codeStates['app_inf_group'] = app_inf_group2196e,
        codeStates['setapp_inf_group'] = setapp_inf_group2196e,
        codeStates['app_inf_group2196e'] = app_inf_group2196eProps,
        codeStates['setapp_inf_group2196e'] = setapp_inf_group2196eProps,
        codeStates['approve_group'] = approve_group0167c,
        codeStates['setapprove_group'] = setapprove_group0167c,
        codeStates['approve_group0167c'] = approve_group0167cProps,
        codeStates['setapprove_group0167c'] = setapprove_group0167cProps,
        codeStates['valid_group'] = valid_group5c57c,
        codeStates['setvalid_group'] = setvalid_group5c57c,
        codeStates['valid_group5c57c'] = valid_group5c57cProps,
        codeStates['setvalid_group5c57c'] = setvalid_group5c57cProps,
        codeStates['leave_entity'] = leave_entityb9f6e,
        codeStates['setleave_entity'] = setleave_entityb9f6e,
        codeStates['days_per_year'] = days_per_year2cf6f,
        codeStates['setdays_per_year'] = setdays_per_year2cf6f,
        codeStates['carry_forward_days'] = carry_forward_days3f3d5,
        codeStates['setcarry_forward_days'] = setcarry_forward_days3f3d5,
        codeStates['carry_forward_expiry'] = carry_forward_expiry448cb,
        codeStates['setcarry_forward_expiry'] = setcarry_forward_expiry448cb,
        codeStates['accrual_frequency'] = accrual_frequency3f1b6,
        codeStates['setaccrual_frequency'] = setaccrual_frequency3f1b6,
        codeStates['max_consecutive_days'] = max_consecutive_days3d6d6,
        codeStates['setmax_consecutive_days'] = setmax_consecutive_days3d6d6,
        codeStates['business_just__group'] = business_just__groupd6ebd,
        codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd,
        codeStates['business_just__groupd6ebd'] = business_just__groupd6ebdProps,
        codeStates['setbusiness_just__groupd6ebd'] = setbusiness_just__groupd6ebdProps,
        codeStates['provision_group'] = provision_groupc3fca,
        codeStates['setprovision_group'] = setprovision_groupc3fca,
        codeStates['provision_groupc3fca'] = provision_groupc3fcaProps,
        codeStates['setprovision_groupc3fca'] = setprovision_groupc3fcaProps,
        codeStates['leave_rule_group'] = leave_rule_groupf75c0,
        codeStates['setleave_rule_group'] = setleave_rule_groupf75c0,
        codeStates['leave_rule_groupf75c0'] = leave_rule_groupf75c0Props,
        codeStates['setleave_rule_groupf75c0'] = setleave_rule_groupf75c0Props,
        codeStates['dynamicactions'] = dynamicactionsd8c40,
        codeStates['setdynamicactions'] = setdynamicactionsd8c40,
        codeStates['dynamicactionsd8c40'] = dynamicactionsd8c40Props,
        codeStates['setdynamicactionsd8c40'] = setdynamicactionsd8c40Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const valid_group5c57cRef = useRef<any>(null);
  const handleClearSearch = () => {
    valid_group5c57cRef.current?.setSearchParams();
    valid_group5c57cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(valid_group5c57c) && Object.keys(valid_group5c57c)?.length>0)
      {
        setvalid_group5c57c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [valid_group5c57cProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '41 / 82',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f5f7fb',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewleavepolicy_v1((pre:any)=>({...pre,_selectedGroup_:"valid_group"}))
        }}
    >
          {allowedControls.includes("leave_entity") ?<Textleave_entity   /* b9f6e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("days_per_year") ?<TextInputdays_per_year   /* 2cf6f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("carry_forward_days") ?<TextInputcarry_forward_days   /* 3f3d5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("carry_forward_expiry") ?<TextInputcarry_forward_expiry   /* 448cb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("accrual_frequency") ?<Dropdownaccrual_frequency   /* 3f1b6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("max_consecutive_days") ?<TextInputmax_consecutive_days   /* 3d6d6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvalid_group
