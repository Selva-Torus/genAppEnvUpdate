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
import Textbusiness_justify  from "./Textbusiness_justify";
import TextAreabusiness_justification  from "./TextAreabusiness_justification";
import TextAreaadditional_details  from "./TextAreaadditional_details";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupbusiness_just__group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
      "business_justify",
      "business_justification",
      "additional_details"
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
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps;
  const {business_justify5b6e3, setbusiness_justify5b6e3}= useContext(TotalContext) as TotalContextProps;
  const {business_justification8767b, setbusiness_justification8767b}= useContext(TotalContext) as TotalContextProps;
  const {additional_detailsde33b, setadditional_detailsde33b}= useContext(TotalContext) as TotalContextProps;
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
    'GroupBusinessJust_group',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ecabc61cf26647320bd87bae79075edc");
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
    setbusiness_just__group75edcProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("business_justify")){
        setbusiness_justify5b6e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(business_justify5b6e3?.isDisabled==null)
      {
        setbusiness_justify5b6e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_justification")){
        setbusiness_justification8767b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(business_justification8767b?.isDisabled==null)
      {
        setbusiness_justification8767b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("additional_details")){
        setadditional_detailsde33b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(additional_detailsde33b?.isDisabled==null)
      {
        setadditional_detailsde33b((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['business_justify'] = business_justify5b6e3,
        codeStates['setbusiness_justify'] = setbusiness_justify5b6e3,
        codeStates['business_justification'] = business_justification8767b,
        codeStates['setbusiness_justification'] = setbusiness_justification8767b,
        codeStates['additional_details'] = additional_detailsde33b,
        codeStates['setadditional_details'] = setadditional_detailsde33b,
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
        codeStates['business_just__group'] = business_just__group75edc,
        codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
        codeStates['business_just__group75edc'] = business_just__group75edcProps,
        codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
        codeStates['business_justify'] = business_justify5b6e3,
        codeStates['setbusiness_justify'] = setbusiness_justify5b6e3,
        codeStates['business_justification'] = business_justification8767b,
        codeStates['setbusiness_justification'] = setbusiness_justification8767b,
        codeStates['additional_details'] = additional_detailsde33b,
        codeStates['setadditional_details'] = setadditional_detailsde33b,
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


  const business_just__group75edcRef = useRef<any>(null);
  const handleClearSearch = () => {
    business_just__group75edcRef.current?.setSearchParams();
    business_just__group75edcRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(business_just__group75edc) && Object.keys(business_just__group75edc)?.length>0)
      {
        setbusiness_just__group75edc({})
      }
    }else 
      prevRefreshRef.current= true
  }, [business_just__group75edcProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '37 / 71',
      
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
          setnewaccessrequest_v1((pre:any)=>({...pre,_selectedGroup_:"business_just__group"}))
        }}
    >
          {allowedControls.includes("business_justify") ?<Textbusiness_justify   /* 5b6e3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("business_justification") ?<TextAreabusiness_justification   /* 8767b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("additional_details") ?<TextAreaadditional_details   /* de33b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupbusiness_just__group
