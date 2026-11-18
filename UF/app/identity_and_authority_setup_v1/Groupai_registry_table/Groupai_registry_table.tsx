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
import Tableai_registry_table  from './Tableai_registry_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_identityauth_v1Props, setdfd_identityauth_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "trs_created_date",
      "trs_tenant_id",
      "discovery_source_code",
      "lifecycle_status_code",
      "tool_grant_bt",
      "authority_grant_bt",
      "service_identity_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
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
  const {overall_ai_asset_registry29963, setoverall_ai_asset_registry29963}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry29963Props, setoverall_ai_asset_registry29963Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9c, setai_registry_groupc1c9c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9cProps, setai_registry_groupc1c9cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfd, setai_registry_text_groupf3cfd}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfdProps, setai_registry_text_groupf3cfdProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51, setai_registry_table5bf51}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51Props, setai_registry_table5bf51Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_ide345c, setai_asset_ide345c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code86cfd, setasset_code86cfd}= useContext(TotalContext) as TotalContextProps;
  const {asset_name9a125, setasset_name9a125}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code12cde, setasset_type_code12cde}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code82583, setrisk_tier_code82583}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name26cdd, setbusiness_unit_name26cdd}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namec4d4e, setbusiness_owner_namec4d4e}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_name789b8, settechnical_owner_name789b8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date12b03, settrs_created_date12b03}= useContext(TotalContext) as TotalContextProps;
  const {trs_tenant_id08378, settrs_tenant_id08378}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code9b028, setdiscovery_source_code9b028}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code6f1d0, setlifecycle_status_code6f1d0}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_btdc8de, settool_grant_btdc8de}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_bt175e0, setauthority_grant_bt175e0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_btab5f0, setservice_identity_btab5f0}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {identitysetup_v1, setidentitysetup_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identitySetup:AFVK:v1',
    [user],
    'GroupAiRegistryTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e886420737d63d98cf19dad635c5bf51");
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
    setai_registry_table5bf51Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_ide345c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_ide345c?.isDisabled==null)
      {
        setai_asset_ide345c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code86cfd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code86cfd?.isDisabled==null)
      {
        setasset_code86cfd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name9a125((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name9a125?.isDisabled==null)
      {
        setasset_name9a125((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code12cde((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code12cde?.isDisabled==null)
      {
        setasset_type_code12cde((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code82583((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code82583?.isDisabled==null)
      {
        setrisk_tier_code82583((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name26cdd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name26cdd?.isDisabled==null)
      {
        setbusiness_unit_name26cdd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_namec4d4e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_namec4d4e?.isDisabled==null)
      {
        setbusiness_owner_namec4d4e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("technical_owner_name")){
        settechnical_owner_name789b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(technical_owner_name789b8?.isDisabled==null)
      {
        settechnical_owner_name789b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date12b03((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_date12b03?.isDisabled==null)
      {
        settrs_created_date12b03((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_tenant_id")){
        settrs_tenant_id08378((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_tenant_id08378?.isDisabled==null)
      {
        settrs_tenant_id08378((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("discovery_source_code")){
        setdiscovery_source_code9b028((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_source_code9b028?.isDisabled==null)
      {
        setdiscovery_source_code9b028((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_code6f1d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code6f1d0?.isDisabled==null)
      {
        setlifecycle_status_code6f1d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant_bt")){
        settool_grant_btdc8de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_grant_btdc8de?.isDisabled==null)
      {
        settool_grant_btdc8de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("authority_grant_bt")){
        setauthority_grant_bt175e0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_grant_bt175e0?.isDisabled==null)
      {
        setauthority_grant_bt175e0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_identity_bt")){
        setservice_identity_btab5f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(service_identity_btab5f0?.isDisabled==null)
      {
        setservice_identity_btab5f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e886420737d63d98cf19dad635c5bf51");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry29963,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry29963,
        codeStates['overall_ai_asset_registry29963'] = overall_ai_asset_registry29963Props,
        codeStates['setoverall_ai_asset_registry29963'] = setoverall_ai_asset_registry29963Props,
        codeStates['ai_registry_group'] = ai_registry_groupc1c9c,
        codeStates['setai_registry_group'] = setai_registry_groupc1c9c,
        codeStates['ai_registry_groupc1c9c'] = ai_registry_groupc1c9cProps,
        codeStates['setai_registry_groupc1c9c'] = setai_registry_groupc1c9cProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupf3cfd,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupf3cfd,
        codeStates['ai_registry_text_groupf3cfd'] = ai_registry_text_groupf3cfdProps,
        codeStates['setai_registry_text_groupf3cfd'] = setai_registry_text_groupf3cfdProps,
        codeStates['ai_registry_table'] = ai_registry_table5bf51,
        codeStates['setai_registry_table'] = setai_registry_table5bf51,
        codeStates['ai_registry_table5bf51'] = ai_registry_table5bf51Props,
        codeStates['setai_registry_table5bf51'] = setai_registry_table5bf51Props,
        codeStates['ai_asset_id'] = ai_asset_ide345c,
        codeStates['setai_asset_id'] = setai_asset_ide345c,
        codeStates['asset_code'] = asset_code86cfd,
        codeStates['setasset_code'] = setasset_code86cfd,
        codeStates['asset_name'] = asset_name9a125,
        codeStates['setasset_name'] = setasset_name9a125,
        codeStates['asset_type_code'] = asset_type_code12cde,
        codeStates['setasset_type_code'] = setasset_type_code12cde,
        codeStates['risk_tier_code'] = risk_tier_code82583,
        codeStates['setrisk_tier_code'] = setrisk_tier_code82583,
        codeStates['business_unit_name'] = business_unit_name26cdd,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name26cdd,
        codeStates['business_owner_name'] = business_owner_namec4d4e,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_namec4d4e,
        codeStates['technical_owner_name'] = technical_owner_name789b8,
        codeStates['settechnical_owner_name'] = settechnical_owner_name789b8,
        codeStates['trs_created_date'] = trs_created_date12b03,
        codeStates['settrs_created_date'] = settrs_created_date12b03,
        codeStates['trs_tenant_id'] = trs_tenant_id08378,
        codeStates['settrs_tenant_id'] = settrs_tenant_id08378,
        codeStates['discovery_source_code'] = discovery_source_code9b028,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code9b028,
        codeStates['lifecycle_status_code'] = lifecycle_status_code6f1d0,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code6f1d0,
        codeStates['tool_grant_bt'] = tool_grant_btdc8de,
        codeStates['settool_grant_bt'] = settool_grant_btdc8de,
        codeStates['authority_grant_bt'] = authority_grant_bt175e0,
        codeStates['setauthority_grant_bt'] = setauthority_grant_bt175e0,
        codeStates['service_identity_bt'] = service_identity_btab5f0,
        codeStates['setservice_identity_bt'] = setservice_identity_btab5f0,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_table5bf51Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_table5bf51Ref.current?.setSearchParams();
    ai_registry_table5bf51Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_table5bf51) &&
        Object.keys(ai_registry_table5bf51)?.length > 0
      ) {
        setai_registry_table5bf51({})
        setai_registry_table5bf51Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_table5bf51Props?.refresh])


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
        gridColumn: '1 / 25',
        gridRow: '9 / 141',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'#ffffff',
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
          setidentitysetup_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_registry_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_registry_table5bf51Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_registry_table
