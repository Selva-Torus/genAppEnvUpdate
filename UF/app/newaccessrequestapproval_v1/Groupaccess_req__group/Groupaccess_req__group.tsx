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
import ComboBoxemp_combobox  from "./ComboBoxemp_combobox";
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
      "emp_combobox",
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
      "approve_group",
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
  const {new_access_group89009, setnew_access_group89009}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group89009Props, setnew_access_group89009Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698, setaccess_req__groupf6698}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupf6698Props, setaccess_req__groupf6698Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_req_details1ea82, setacc_req_details1ea82}= useContext(TotalContext) as TotalContextProps;
  const {emp_comboboxf5734, setemp_comboboxf5734}= useContext(TotalContext) as TotalContextProps;
  const {request_type7ec60, setrequest_type7ec60}= useContext(TotalContext) as TotalContextProps;
  const {system_name5463b, setsystem_name5463b}= useContext(TotalContext) as TotalContextProps;
  const {access_role058b8, setaccess_role058b8}= useContext(TotalContext) as TotalContextProps;
  const {access_leveld04f4, setaccess_leveld04f4}= useContext(TotalContext) as TotalContextProps;
  const {request_prioritybdba9, setrequest_prioritybdba9}= useContext(TotalContext) as TotalContextProps;
  const {risk_level94408, setrisk_level94408}= useContext(TotalContext) as TotalContextProps;
  const {request_number46476, setrequest_number46476}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fc, setbusiness_just__group5c7fc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group5c7fcProps, setbusiness_just__group5c7fcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09d, setvalid_groupec09d}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec09dProps, setvalid_groupec09dProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185e, setapp_inf_group4185e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group4185eProps, setapp_inf_group4185eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509, setapprove_group6b509}= useContext(TotalContext) as TotalContextProps;
  const {approve_group6b509Props, setapprove_group6b509Props}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52, setprovision_groupf5a52}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupf5a52Props, setprovision_groupf5a52Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1, setprov_group33ef1}= useContext(TotalContext) as TotalContextProps;
  const {prov_group33ef1Props, setprov_group33ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6ae, setrevocation_group9c6ae}= useContext(TotalContext) as TotalContextProps;
  const {revocation_group9c6aeProps, setrevocation_group9c6aeProps}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cb, setrev_group4b1cb}= useContext(TotalContext) as TotalContextProps;
  const {rev_group4b1cbProps, setrev_group4b1cbProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9, setaudit_group270d9}= useContext(TotalContext) as TotalContextProps;
  const {audit_group270d9Props, setaudit_group270d9Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364, setdynamicactions51364}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions51364Props, setdynamicactions51364Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newaccessrequestapproval_v1, setnewaccessrequestapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newAccessRequestApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "243f73b730937821efe0461c690f6698");
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
    setaccess_req__groupf6698Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("acc_req_details")){
        setacc_req_details1ea82((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(acc_req_details1ea82?.isDisabled==null)
      {
        setacc_req_details1ea82((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("emp_combobox")){
        setemp_comboboxf5734((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emp_comboboxf5734?.isDisabled==null)
      {
        setemp_comboboxf5734((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_type")){
        setrequest_type7ec60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_type7ec60?.isDisabled==null)
      {
        setrequest_type7ec60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name")){
        setsystem_name5463b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_name5463b?.isDisabled==null)
      {
        setsystem_name5463b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role")){
        setaccess_role058b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_role058b8?.isDisabled==null)
      {
        setaccess_role058b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_level")){
        setaccess_leveld04f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_leveld04f4?.isDisabled==null)
      {
        setaccess_leveld04f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_priority")){
        setrequest_prioritybdba9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_prioritybdba9?.isDisabled==null)
      {
        setrequest_prioritybdba9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_level")){
        setrisk_level94408((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(risk_level94408?.isDisabled==null)
      {
        setrisk_level94408((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_number46476((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_number46476?.isDisabled==null)
      {
        setrequest_number46476((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group89009,
        codeStates['setnew_access_group'] = setnew_access_group89009,
        codeStates['new_access_group89009'] = new_access_group89009Props,
        codeStates['setnew_access_group89009'] = setnew_access_group89009Props,
        codeStates['access_req__group'] = access_req__groupf6698,
        codeStates['setaccess_req__group'] = setaccess_req__groupf6698,
        codeStates['access_req__groupf6698'] = access_req__groupf6698Props,
        codeStates['setaccess_req__groupf6698'] = setaccess_req__groupf6698Props,
        codeStates['acc_req_details'] = acc_req_details1ea82,
        codeStates['setacc_req_details'] = setacc_req_details1ea82,
        codeStates['emp_combobox'] = emp_comboboxf5734,
        codeStates['setemp_combobox'] = setemp_comboboxf5734,
        codeStates['request_type'] = request_type7ec60,
        codeStates['setrequest_type'] = setrequest_type7ec60,
        codeStates['system_name'] = system_name5463b,
        codeStates['setsystem_name'] = setsystem_name5463b,
        codeStates['access_role'] = access_role058b8,
        codeStates['setaccess_role'] = setaccess_role058b8,
        codeStates['access_level'] = access_leveld04f4,
        codeStates['setaccess_level'] = setaccess_leveld04f4,
        codeStates['request_priority'] = request_prioritybdba9,
        codeStates['setrequest_priority'] = setrequest_prioritybdba9,
        codeStates['risk_level'] = risk_level94408,
        codeStates['setrisk_level'] = setrisk_level94408,
        codeStates['request_number'] = request_number46476,
        codeStates['setrequest_number'] = setrequest_number46476,
        codeStates['business_just__group'] = business_just__group5c7fc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group5c7fc,
        codeStates['business_just__group5c7fc'] = business_just__group5c7fcProps,
        codeStates['setbusiness_just__group5c7fc'] = setbusiness_just__group5c7fcProps,
        codeStates['valid_group'] = valid_groupec09d,
        codeStates['setvalid_group'] = setvalid_groupec09d,
        codeStates['valid_groupec09d'] = valid_groupec09dProps,
        codeStates['setvalid_groupec09d'] = setvalid_groupec09dProps,
        codeStates['app_inf_group'] = app_inf_group4185e,
        codeStates['setapp_inf_group'] = setapp_inf_group4185e,
        codeStates['app_inf_group4185e'] = app_inf_group4185eProps,
        codeStates['setapp_inf_group4185e'] = setapp_inf_group4185eProps,
        codeStates['approve_group'] = approve_group6b509,
        codeStates['setapprove_group'] = setapprove_group6b509,
        codeStates['approve_group6b509'] = approve_group6b509Props,
        codeStates['setapprove_group6b509'] = setapprove_group6b509Props,
        codeStates['provision_group'] = provision_groupf5a52,
        codeStates['setprovision_group'] = setprovision_groupf5a52,
        codeStates['provision_groupf5a52'] = provision_groupf5a52Props,
        codeStates['setprovision_groupf5a52'] = setprovision_groupf5a52Props,
        codeStates['prov_group'] = prov_group33ef1,
        codeStates['setprov_group'] = setprov_group33ef1,
        codeStates['prov_group33ef1'] = prov_group33ef1Props,
        codeStates['setprov_group33ef1'] = setprov_group33ef1Props,
        codeStates['revocation_group'] = revocation_group9c6ae,
        codeStates['setrevocation_group'] = setrevocation_group9c6ae,
        codeStates['revocation_group9c6ae'] = revocation_group9c6aeProps,
        codeStates['setrevocation_group9c6ae'] = setrevocation_group9c6aeProps,
        codeStates['rev_group'] = rev_group4b1cb,
        codeStates['setrev_group'] = setrev_group4b1cb,
        codeStates['rev_group4b1cb'] = rev_group4b1cbProps,
        codeStates['setrev_group4b1cb'] = setrev_group4b1cbProps,
        codeStates['audit_group'] = audit_group270d9,
        codeStates['setaudit_group'] = setaudit_group270d9,
        codeStates['audit_group270d9'] = audit_group270d9Props,
        codeStates['setaudit_group270d9'] = setaudit_group270d9Props,
        codeStates['dynamicactions'] = dynamicactions51364,
        codeStates['setdynamicactions'] = setdynamicactions51364,
        codeStates['dynamicactions51364'] = dynamicactions51364Props,
        codeStates['setdynamicactions51364'] = setdynamicactions51364Props,

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
        codeStates['new_access_group'] = new_access_group89009,
        codeStates['setnew_access_group'] = setnew_access_group89009,
        codeStates['new_access_group89009'] = new_access_group89009Props,
        codeStates['setnew_access_group89009'] = setnew_access_group89009Props,
        codeStates['access_req__group'] = access_req__groupf6698,
        codeStates['setaccess_req__group'] = setaccess_req__groupf6698,
        codeStates['access_req__groupf6698'] = access_req__groupf6698Props,
        codeStates['setaccess_req__groupf6698'] = setaccess_req__groupf6698Props,
        codeStates['acc_req_details'] = acc_req_details1ea82,
        codeStates['setacc_req_details'] = setacc_req_details1ea82,
        codeStates['emp_combobox'] = emp_comboboxf5734,
        codeStates['setemp_combobox'] = setemp_comboboxf5734,
        codeStates['request_type'] = request_type7ec60,
        codeStates['setrequest_type'] = setrequest_type7ec60,
        codeStates['system_name'] = system_name5463b,
        codeStates['setsystem_name'] = setsystem_name5463b,
        codeStates['access_role'] = access_role058b8,
        codeStates['setaccess_role'] = setaccess_role058b8,
        codeStates['access_level'] = access_leveld04f4,
        codeStates['setaccess_level'] = setaccess_leveld04f4,
        codeStates['request_priority'] = request_prioritybdba9,
        codeStates['setrequest_priority'] = setrequest_prioritybdba9,
        codeStates['risk_level'] = risk_level94408,
        codeStates['setrisk_level'] = setrisk_level94408,
        codeStates['request_number'] = request_number46476,
        codeStates['setrequest_number'] = setrequest_number46476,
        codeStates['business_just__group'] = business_just__group5c7fc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group5c7fc,
        codeStates['business_just__group5c7fc'] = business_just__group5c7fcProps,
        codeStates['setbusiness_just__group5c7fc'] = setbusiness_just__group5c7fcProps,
        codeStates['valid_group'] = valid_groupec09d,
        codeStates['setvalid_group'] = setvalid_groupec09d,
        codeStates['valid_groupec09d'] = valid_groupec09dProps,
        codeStates['setvalid_groupec09d'] = setvalid_groupec09dProps,
        codeStates['app_inf_group'] = app_inf_group4185e,
        codeStates['setapp_inf_group'] = setapp_inf_group4185e,
        codeStates['app_inf_group4185e'] = app_inf_group4185eProps,
        codeStates['setapp_inf_group4185e'] = setapp_inf_group4185eProps,
        codeStates['approve_group'] = approve_group6b509,
        codeStates['setapprove_group'] = setapprove_group6b509,
        codeStates['approve_group6b509'] = approve_group6b509Props,
        codeStates['setapprove_group6b509'] = setapprove_group6b509Props,
        codeStates['provision_group'] = provision_groupf5a52,
        codeStates['setprovision_group'] = setprovision_groupf5a52,
        codeStates['provision_groupf5a52'] = provision_groupf5a52Props,
        codeStates['setprovision_groupf5a52'] = setprovision_groupf5a52Props,
        codeStates['prov_group'] = prov_group33ef1,
        codeStates['setprov_group'] = setprov_group33ef1,
        codeStates['prov_group33ef1'] = prov_group33ef1Props,
        codeStates['setprov_group33ef1'] = setprov_group33ef1Props,
        codeStates['revocation_group'] = revocation_group9c6ae,
        codeStates['setrevocation_group'] = setrevocation_group9c6ae,
        codeStates['revocation_group9c6ae'] = revocation_group9c6aeProps,
        codeStates['setrevocation_group9c6ae'] = setrevocation_group9c6aeProps,
        codeStates['rev_group'] = rev_group4b1cb,
        codeStates['setrev_group'] = setrev_group4b1cb,
        codeStates['rev_group4b1cb'] = rev_group4b1cbProps,
        codeStates['setrev_group4b1cb'] = setrev_group4b1cbProps,
        codeStates['audit_group'] = audit_group270d9,
        codeStates['setaudit_group'] = setaudit_group270d9,
        codeStates['audit_group270d9'] = audit_group270d9Props,
        codeStates['setaudit_group270d9'] = setaudit_group270d9Props,
        codeStates['dynamicactions'] = dynamicactions51364,
        codeStates['setdynamicactions'] = setdynamicactions51364,
        codeStates['dynamicactions51364'] = dynamicactions51364Props,
        codeStates['setdynamicactions51364'] = setdynamicactions51364Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__groupf6698Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__groupf6698Ref.current?.setSearchParams();
    access_req__groupf6698Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__groupf6698) && Object.keys(access_req__groupf6698)?.length>0)
      {
        setaccess_req__groupf6698({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__groupf6698Props?.refresh,token])


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
          setnewaccessrequestapproval_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("acc_req_details") ?<Textacc_req_details   /* 1ea82 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("emp_combobox") ?<ComboBoxemp_combobox /* f5734 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("request_type") ?<Dropdownrequest_type   /* 7ec60 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("system_name") ?<TextInputsystem_name   /* 5463b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("access_role") ?<TextInputaccess_role   /* 058b8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("access_level") ?<Dropdownaccess_level   /* d04f4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("request_priority") ?<Dropdownrequest_priority   /* bdba9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("risk_level") ?<Dropdownrisk_level   /* 94408 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("request_number") ?<TextInputrequest_number   /* 46476 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
