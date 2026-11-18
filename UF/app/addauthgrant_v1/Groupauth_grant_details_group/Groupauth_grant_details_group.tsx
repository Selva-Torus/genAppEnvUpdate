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
import Textauth_grant_details_text  from "./Textauth_grant_details_text";
import Dropdownasset_name  from "./Dropdownasset_name";
import TextInputgrant_code  from "./TextInputgrant_code";
import Dropdowndelegator_user_id  from "./Dropdowndelegator_user_id";
import Dropdownaction_type  from "./Dropdownaction_type";
import TextArearesource_scope  from "./TextArearesource_scope";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupauth_grant_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "auth_grant_details_text",
      "asset_name",
      "grant_code",
      "delegator_user_id",
      "action_type",
      "resource_scope"
    ],
    "allowedGroups": [
      "canvas",
      "overall_auth_grant_grp",
      "revocat_info_group",
      "auth_grant_details_group",
      "finacial_transaction__group",
      "condition_validity_group",
      "certification_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_textc2e1d, setauth_grant_details_textc2e1d}= useContext(TotalContext) as TotalContextProps;
  const {asset_name50a66, setasset_name50a66}= useContext(TotalContext) as TotalContextProps;
  const {grant_code15931, setgrant_code15931}= useContext(TotalContext) as TotalContextProps;
  const {delegator_user_id7e51a, setdelegator_user_id7e51a}= useContext(TotalContext) as TotalContextProps;
  const {action_type313d6, setaction_type313d6}= useContext(TotalContext) as TotalContextProps;
  const {resource_scope139d4, setresource_scope139d4}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addauthgrant_v1, setaddauthgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAuthGrant:AFVK:v1',
    [user],
    'GroupAuthGrantDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7ab9188e5f3a6b4b600fa714fc4d026c");
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
    setauth_grant_details_groupd026cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("auth_grant_details_text")){
        setauth_grant_details_textc2e1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(auth_grant_details_textc2e1d?.isDisabled==null)
      {
        setauth_grant_details_textc2e1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name50a66((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name50a66?.isDisabled==null)
      {
        setasset_name50a66((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grant_code")){
        setgrant_code15931((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grant_code15931?.isDisabled==null)
      {
        setgrant_code15931((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delegator_user_id")){
        setdelegator_user_id7e51a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delegator_user_id7e51a?.isDisabled==null)
      {
        setdelegator_user_id7e51a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_type")){
        setaction_type313d6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_type313d6?.isDisabled==null)
      {
        setaction_type313d6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("resource_scope")){
        setresource_scope139d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(resource_scope139d4?.isDisabled==null)
      {
        setresource_scope139d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
        codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
        codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
        codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
        codeStates['revocat_info_group'] = revocat_info_group2037f,
        codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
        codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
        codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
        codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
        codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
        codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
        codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
        codeStates['auth_grant_details_text'] = auth_grant_details_textc2e1d,
        codeStates['setauth_grant_details_text'] = setauth_grant_details_textc2e1d,
        codeStates['asset_name'] = asset_name50a66,
        codeStates['setasset_name'] = setasset_name50a66,
        codeStates['grant_code'] = grant_code15931,
        codeStates['setgrant_code'] = setgrant_code15931,
        codeStates['delegator_user_id'] = delegator_user_id7e51a,
        codeStates['setdelegator_user_id'] = setdelegator_user_id7e51a,
        codeStates['action_type'] = action_type313d6,
        codeStates['setaction_type'] = setaction_type313d6,
        codeStates['resource_scope'] = resource_scope139d4,
        codeStates['setresource_scope'] = setresource_scope139d4,
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['condition_validity_group'] = condition_validity_group3e45f,
        codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
        codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
        codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
        codeStates['certification_group'] = certification_group91bfd,
        codeStates['setcertification_group'] = setcertification_group91bfd,
        codeStates['certification_group91bfd'] = certification_group91bfdProps,
        codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
        codeStates['dynamicactions'] = dynamicactions401a9,
        codeStates['setdynamicactions'] = setdynamicactions401a9,
        codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
        codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7ab9188e5f3a6b4b600fa714fc4d026c");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
        codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
        codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
        codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
        codeStates['revocat_info_group'] = revocat_info_group2037f,
        codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
        codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
        codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
        codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
        codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
        codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
        codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
        codeStates['auth_grant_details_text'] = auth_grant_details_textc2e1d,
        codeStates['setauth_grant_details_text'] = setauth_grant_details_textc2e1d,
        codeStates['asset_name'] = asset_name50a66,
        codeStates['setasset_name'] = setasset_name50a66,
        codeStates['grant_code'] = grant_code15931,
        codeStates['setgrant_code'] = setgrant_code15931,
        codeStates['delegator_user_id'] = delegator_user_id7e51a,
        codeStates['setdelegator_user_id'] = setdelegator_user_id7e51a,
        codeStates['action_type'] = action_type313d6,
        codeStates['setaction_type'] = setaction_type313d6,
        codeStates['resource_scope'] = resource_scope139d4,
        codeStates['setresource_scope'] = setresource_scope139d4,
        codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
        codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
        codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
        codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
        codeStates['condition_validity_group'] = condition_validity_group3e45f,
        codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
        codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
        codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
        codeStates['certification_group'] = certification_group91bfd,
        codeStates['setcertification_group'] = setcertification_group91bfd,
        codeStates['certification_group91bfd'] = certification_group91bfdProps,
        codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
        codeStates['dynamicactions'] = dynamicactions401a9,
        codeStates['setdynamicactions'] = setdynamicactions401a9,
        codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
        codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const auth_grant_details_groupd026cRef = useRef<any>(null);
  const handleClearSearch = () => {
    auth_grant_details_groupd026cRef.current?.setSearchParams();
    auth_grant_details_groupd026cRef.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(auth_grant_details_groupd026c) &&
        Object.keys(auth_grant_details_groupd026c)?.length > 0
      ) {
        setauth_grant_details_groupd026c({})
        setauth_grant_details_groupd026cProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [auth_grant_details_groupd026cProps?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '8 / 59',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddauthgrant_v1((pre:any)=>({...pre,_selectedGroup_:"auth_grant_details_group"}))
        }}
    >
          {allowedControls.includes("auth_grant_details_text") ?<Textauth_grant_details_text   /* c2e1d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<Dropdownasset_name   /* 50a66 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("grant_code") ?<TextInputgrant_code   /* 15931 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("delegator_user_id") ?<Dropdowndelegator_user_id   /* 7e51a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("action_type") ?<Dropdownaction_type   /* 313d6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("resource_scope") ?<TextArearesource_scope   /* 139d4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupauth_grant_details_group
