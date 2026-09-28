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
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "cert_expiry_date",
      "discovery_source_code",
      "lifecycle_status_code",
      "ai_asset_data_class_bt",
      "model_detail_bt",
      "agent_controls_bt",
      "versions_bt",
      "dependencies_bt"
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
  const {overall_ai_asset_registry24714, setoverall_ai_asset_registry24714}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry24714Props, setoverall_ai_asset_registry24714Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8, setai_registry_group15bd8}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8Props, setai_registry_group15bd8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565, setai_registry_text_groupc3565}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565Props, setai_registry_text_groupc3565Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3, setai_registry_tablec54a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props, setai_registry_tablec54a3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id9e2a6, setai_asset_id9e2a6}= useContext(TotalContext) as TotalContextProps;
  const {asset_named5e53, setasset_named5e53}= useContext(TotalContext) as TotalContextProps;
  const {asset_code9a242, setasset_code9a242}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code743b5, setasset_type_code743b5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_coded1d3a, setrisk_tier_coded1d3a}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name28b82, setbusiness_unit_name28b82}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_name6f253, setbusiness_owner_name6f253}= useContext(TotalContext) as TotalContextProps;
  const {cert_expiry_date63ebc, setcert_expiry_date63ebc}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code5e1a8, setdiscovery_source_code5e1a8}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code06a86, setlifecycle_status_code06a86}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_data_class_bt1c904, setai_asset_data_class_bt1c904}= useContext(TotalContext) as TotalContextProps;
  const {model_detail_btd72a3, setmodel_detail_btd72a3}= useContext(TotalContext) as TotalContextProps;
  const {agent_controls_bt114cc, setagent_controls_bt114cc}= useContext(TotalContext) as TotalContextProps;
  const {versions_bt48f20, setversions_bt48f20}= useContext(TotalContext) as TotalContextProps;
  const {dependencies_bt70ebd, setdependencies_bt70ebd}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {airegistry_v1, setairegistry_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistry:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c073f1886ebd444da9d52548eddc54a3");
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
    setai_registry_tablec54a3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id9e2a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id9e2a6?.isDisabled==null)
      {
        setai_asset_id9e2a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_named5e53((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_named5e53?.isDisabled==null)
      {
        setasset_named5e53((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code9a242((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code9a242?.isDisabled==null)
      {
        setasset_code9a242((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code743b5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code743b5?.isDisabled==null)
      {
        setasset_type_code743b5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_coded1d3a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_coded1d3a?.isDisabled==null)
      {
        setrisk_tier_coded1d3a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name28b82((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name28b82?.isDisabled==null)
      {
        setbusiness_unit_name28b82((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_name6f253((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_name6f253?.isDisabled==null)
      {
        setbusiness_owner_name6f253((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_expiry_date")){
        setcert_expiry_date63ebc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_expiry_date63ebc?.isDisabled==null)
      {
        setcert_expiry_date63ebc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("discovery_source_code")){
        setdiscovery_source_code5e1a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_source_code5e1a8?.isDisabled==null)
      {
        setdiscovery_source_code5e1a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_code06a86((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code06a86?.isDisabled==null)
      {
        setlifecycle_status_code06a86((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_data_class_bt")){
        setai_asset_data_class_bt1c904((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_data_class_bt1c904?.isDisabled==null)
      {
        setai_asset_data_class_bt1c904((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_detail_bt")){
        setmodel_detail_btd72a3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_detail_btd72a3?.isDisabled==null)
      {
        setmodel_detail_btd72a3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_controls_bt")){
        setagent_controls_bt114cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_controls_bt114cc?.isDisabled==null)
      {
        setagent_controls_bt114cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("versions_bt")){
        setversions_bt48f20((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(versions_bt48f20?.isDisabled==null)
      {
        setversions_bt48f20((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependencies_bt")){
        setdependencies_bt70ebd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependencies_bt70ebd?.isDisabled==null)
      {
        setdependencies_bt70ebd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c073f1886ebd444da9d52548eddc54a3");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry24714,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry24714,
        codeStates['overall_ai_asset_registry24714'] = overall_ai_asset_registry24714Props,
        codeStates['setoverall_ai_asset_registry24714'] = setoverall_ai_asset_registry24714Props,
        codeStates['ai_registry_group'] = ai_registry_group15bd8,
        codeStates['setai_registry_group'] = setai_registry_group15bd8,
        codeStates['ai_registry_group15bd8'] = ai_registry_group15bd8Props,
        codeStates['setai_registry_group15bd8'] = setai_registry_group15bd8Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupc3565,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupc3565,
        codeStates['ai_registry_text_groupc3565'] = ai_registry_text_groupc3565Props,
        codeStates['setai_registry_text_groupc3565'] = setai_registry_text_groupc3565Props,
        codeStates['ai_registry_table'] = ai_registry_tablec54a3,
        codeStates['setai_registry_table'] = setai_registry_tablec54a3,
        codeStates['ai_registry_tablec54a3'] = ai_registry_tablec54a3Props,
        codeStates['setai_registry_tablec54a3'] = setai_registry_tablec54a3Props,
        codeStates['ai_asset_id'] = ai_asset_id9e2a6,
        codeStates['setai_asset_id'] = setai_asset_id9e2a6,
        codeStates['asset_name'] = asset_named5e53,
        codeStates['setasset_name'] = setasset_named5e53,
        codeStates['asset_code'] = asset_code9a242,
        codeStates['setasset_code'] = setasset_code9a242,
        codeStates['asset_type_code'] = asset_type_code743b5,
        codeStates['setasset_type_code'] = setasset_type_code743b5,
        codeStates['risk_tier_code'] = risk_tier_coded1d3a,
        codeStates['setrisk_tier_code'] = setrisk_tier_coded1d3a,
        codeStates['business_unit_name'] = business_unit_name28b82,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name28b82,
        codeStates['business_owner_name'] = business_owner_name6f253,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_name6f253,
        codeStates['cert_expiry_date'] = cert_expiry_date63ebc,
        codeStates['setcert_expiry_date'] = setcert_expiry_date63ebc,
        codeStates['discovery_source_code'] = discovery_source_code5e1a8,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code5e1a8,
        codeStates['lifecycle_status_code'] = lifecycle_status_code06a86,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code06a86,
        codeStates['ai_asset_data_class_bt'] = ai_asset_data_class_bt1c904,
        codeStates['setai_asset_data_class_bt'] = setai_asset_data_class_bt1c904,
        codeStates['model_detail_bt'] = model_detail_btd72a3,
        codeStates['setmodel_detail_bt'] = setmodel_detail_btd72a3,
        codeStates['agent_controls_bt'] = agent_controls_bt114cc,
        codeStates['setagent_controls_bt'] = setagent_controls_bt114cc,
        codeStates['versions_bt'] = versions_bt48f20,
        codeStates['setversions_bt'] = setversions_bt48f20,
        codeStates['dependencies_bt'] = dependencies_bt70ebd,
        codeStates['setdependencies_bt'] = setdependencies_bt70ebd,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_tablec54a3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_tablec54a3Ref.current?.setSearchParams();
    ai_registry_tablec54a3Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_tablec54a3) &&
        Object.keys(ai_registry_tablec54a3)?.length > 0
      ) {
        setai_registry_tablec54a3({})
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_tablec54a3Props?.refresh])


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
        gridRow: '14 / 146',
      
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
          setairegistry_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_registry_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_registry_tablec54a3Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_registry_table
