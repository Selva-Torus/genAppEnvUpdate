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
import Textacc_req_details  from "./Textacc_req_details";
import Dropdownfull_name  from "./Dropdownfull_name";
import Dropdownrequest_type  from "./Dropdownrequest_type";
import TextInputsystem_name  from "./TextInputsystem_name";
import TextInputaccess_role  from "./TextInputaccess_role";
import Dropdownaccess_level  from "./Dropdownaccess_level";
import Dropdownrequest_priority  from "./Dropdownrequest_priority";
import Dropdownrisk_level  from "./Dropdownrisk_level";
import TextInputrequest_number  from "./TextInputrequest_number";
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
  const {dfd_accesslevelcombo_v1Props, setdfd_accesslevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requestprioritycombo_v1Props, setdfd_requestprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_requesttypecombo_v1Props, setdfd_requesttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_provisioningstatuscombo_v1Props, setdfd_provisioningstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "acc_req_details",
      "full_name",
      "request_type",
      "system_name",
      "access_role",
      "access_level",
      "request_priority",
      "risk_level",
      "request_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "business_just__group",
      "valid_group",
      "app_inf_group",
      "provision_group",
      "prov_group",
      "revocation_group",
      "rev_group",
      "audit_group",
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
  const {new_access_group1e8f3, setnew_access_group1e8f3}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group1e8f3Props, setnew_access_group1e8f3Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221, setaccess_req__group3a221}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221Props, setaccess_req__group3a221Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_req_details64e3c, setacc_req_details64e3c}= useContext(TotalContext) as TotalContextProps;
  const {full_nameb4280, setfull_nameb4280}= useContext(TotalContext) as TotalContextProps;
  const {request_typeade40, setrequest_typeade40}= useContext(TotalContext) as TotalContextProps;
  const {system_name55638, setsystem_name55638}= useContext(TotalContext) as TotalContextProps;
  const {access_role53ace, setaccess_role53ace}= useContext(TotalContext) as TotalContextProps;
  const {access_level5eb9a, setaccess_level5eb9a}= useContext(TotalContext) as TotalContextProps;
  const {request_priority55c8e, setrequest_priority55c8e}= useContext(TotalContext) as TotalContextProps;
  const {risk_levelcb9f7, setrisk_levelcb9f7}= useContext(TotalContext) as TotalContextProps;
  const {request_number6fd42, setrequest_number6fd42}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21c, setvalid_groupec21c}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21cProps, setvalid_groupec21cProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43d, setapp_inf_groupea43d}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43dProps, setapp_inf_groupea43dProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newaccessrequest_v1, setnewaccessrequest_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequest:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "728f2a80659a170f2ab5070e9423a221");
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
    setaccess_req__group3a221Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("acc_req_details")){
        setacc_req_details64e3c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(acc_req_details64e3c?.isDisabled==null)
      {
        setacc_req_details64e3c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_nameb4280((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_nameb4280?.isDisabled==null)
      {
        setfull_nameb4280((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_type")){
        setrequest_typeade40((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_typeade40?.isDisabled==null)
      {
        setrequest_typeade40((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name")){
        setsystem_name55638((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_name55638?.isDisabled==null)
      {
        setsystem_name55638((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role")){
        setaccess_role53ace((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_role53ace?.isDisabled==null)
      {
        setaccess_role53ace((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_level")){
        setaccess_level5eb9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_level5eb9a?.isDisabled==null)
      {
        setaccess_level5eb9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_priority")){
        setrequest_priority55c8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_priority55c8e?.isDisabled==null)
      {
        setrequest_priority55c8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_level")){
        setrisk_levelcb9f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(risk_levelcb9f7?.isDisabled==null)
      {
        setrisk_levelcb9f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_number6fd42((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_number6fd42?.isDisabled==null)
      {
        setrequest_number6fd42((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group1e8f3,
        codeStates['setnew_access_group'] = setnew_access_group1e8f3,
        codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
        codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
        codeStates['access_req__group'] = access_req__group3a221,
        codeStates['setaccess_req__group'] = setaccess_req__group3a221,
        codeStates['access_req__group3a221'] = access_req__group3a221Props,
        codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
        codeStates['acc_req_details'] = acc_req_details64e3c,
        codeStates['setacc_req_details'] = setacc_req_details64e3c,
        codeStates['full_name'] = full_nameb4280,
        codeStates['setfull_name'] = setfull_nameb4280,
        codeStates['request_type'] = request_typeade40,
        codeStates['setrequest_type'] = setrequest_typeade40,
        codeStates['system_name'] = system_name55638,
        codeStates['setsystem_name'] = setsystem_name55638,
        codeStates['access_role'] = access_role53ace,
        codeStates['setaccess_role'] = setaccess_role53ace,
        codeStates['access_level'] = access_level5eb9a,
        codeStates['setaccess_level'] = setaccess_level5eb9a,
        codeStates['request_priority'] = request_priority55c8e,
        codeStates['setrequest_priority'] = setrequest_priority55c8e,
        codeStates['risk_level'] = risk_levelcb9f7,
        codeStates['setrisk_level'] = setrisk_levelcb9f7,
        codeStates['request_number'] = request_number6fd42,
        codeStates['setrequest_number'] = setrequest_number6fd42,
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['valid_group'] = valid_groupec21c,
        codeStates['setvalid_group'] = setvalid_groupec21c,
        codeStates['valid_groupec21c'] = valid_groupec21cProps,
        codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
        codeStates['app_inf_group'] = app_inf_groupea43d,
        codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
        codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
        codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
        codeStates['provision_group'] = provision_group4e2a2,
        codeStates['setprovision_group'] = setprovision_group4e2a2,
        codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
        codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
        codeStates['prov_group'] = prov_group3b4eb,
        codeStates['setprov_group'] = setprov_group3b4eb,
        codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
        codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
        codeStates['revocation_group'] = revocation_groupc3044,
        codeStates['setrevocation_group'] = setrevocation_groupc3044,
        codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
        codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
        codeStates['rev_group'] = rev_groupa6a87,
        codeStates['setrev_group'] = setrev_groupa6a87,
        codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
        codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
        codeStates['audit_group'] = audit_groupc16c3,
        codeStates['setaudit_group'] = setaudit_groupc16c3,
        codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
        codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
        codeStates['dynamicactions'] = dynamicactions820e8,
        codeStates['setdynamicactions'] = setdynamicactions820e8,
        codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
        codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,

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
        codeStates['new_access_group'] = new_access_group1e8f3,
        codeStates['setnew_access_group'] = setnew_access_group1e8f3,
        codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
        codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
        codeStates['access_req__group'] = access_req__group3a221,
        codeStates['setaccess_req__group'] = setaccess_req__group3a221,
        codeStates['access_req__group3a221'] = access_req__group3a221Props,
        codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
        codeStates['acc_req_details'] = acc_req_details64e3c,
        codeStates['setacc_req_details'] = setacc_req_details64e3c,
        codeStates['full_name'] = full_nameb4280,
        codeStates['setfull_name'] = setfull_nameb4280,
        codeStates['request_type'] = request_typeade40,
        codeStates['setrequest_type'] = setrequest_typeade40,
        codeStates['system_name'] = system_name55638,
        codeStates['setsystem_name'] = setsystem_name55638,
        codeStates['access_role'] = access_role53ace,
        codeStates['setaccess_role'] = setaccess_role53ace,
        codeStates['access_level'] = access_level5eb9a,
        codeStates['setaccess_level'] = setaccess_level5eb9a,
        codeStates['request_priority'] = request_priority55c8e,
        codeStates['setrequest_priority'] = setrequest_priority55c8e,
        codeStates['risk_level'] = risk_levelcb9f7,
        codeStates['setrisk_level'] = setrisk_levelcb9f7,
        codeStates['request_number'] = request_number6fd42,
        codeStates['setrequest_number'] = setrequest_number6fd42,
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['valid_group'] = valid_groupec21c,
        codeStates['setvalid_group'] = setvalid_groupec21c,
        codeStates['valid_groupec21c'] = valid_groupec21cProps,
        codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
        codeStates['app_inf_group'] = app_inf_groupea43d,
        codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
        codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
        codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
        codeStates['provision_group'] = provision_group4e2a2,
        codeStates['setprovision_group'] = setprovision_group4e2a2,
        codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
        codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
        codeStates['prov_group'] = prov_group3b4eb,
        codeStates['setprov_group'] = setprov_group3b4eb,
        codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
        codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
        codeStates['revocation_group'] = revocation_groupc3044,
        codeStates['setrevocation_group'] = setrevocation_groupc3044,
        codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
        codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
        codeStates['rev_group'] = rev_groupa6a87,
        codeStates['setrev_group'] = setrev_groupa6a87,
        codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
        codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
        codeStates['audit_group'] = audit_groupc16c3,
        codeStates['setaudit_group'] = setaudit_groupc16c3,
        codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
        codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
        codeStates['dynamicactions'] = dynamicactions820e8,
        codeStates['setdynamicactions'] = setdynamicactions820e8,
        codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
        codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__group3a221Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__group3a221Ref.current?.setSearchParams();
    access_req__group3a221Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__group3a221) && Object.keys(access_req__group3a221)?.length>0)
      {
        setaccess_req__group3a221({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__group3a221Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 35',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewaccessrequest_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("acc_req_details") ?<Textacc_req_details   /* 64e3c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("full_name") ?<Dropdownfull_name   /* b4280 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("request_type") ?<Dropdownrequest_type   /* ade40 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("system_name") ?<TextInputsystem_name   /* 55638 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("access_role") ?<TextInputaccess_role   /* 53ace */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("access_level") ?<Dropdownaccess_level   /* 5eb9a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("request_priority") ?<Dropdownrequest_priority   /* 55c8e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("risk_level") ?<Dropdownrisk_level   /* cb9f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("request_number") ?<TextInputrequest_number   /* 6fd42 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
