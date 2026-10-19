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
import Groupdesc_group  from "../Groupdesc_group/Groupdesc_group";
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
import Textasset_text  from "./Textasset_text";
import Textasset_code_text  from "./Textasset_code_text";
import Textasset_code  from "./Textasset_code";
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textrisk_tier_text  from "./Textrisk_tier_text";
import Textrisk_tier_code  from "./Textrisk_tier_code";
import Textbus_unit_text  from "./Textbus_unit_text";
import Textbusiness_unit_name  from "./Textbusiness_unit_name";
import Textowner_name_text  from "./Textowner_name_text";
import Textbusiness_owner_name  from "./Textbusiness_owner_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_tierassessment_v1Props, setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "bus_unit_text",
      "business_unit_name",
      "owner_name_text",
      "business_owner_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
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
  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_text65667, setasset_text65667}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text1cbe3, setasset_code_text1cbe3}= useContext(TotalContext) as TotalContextProps;
  const {asset_code2ce4b, setasset_code2ce4b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textd22c2, setasset_name_textd22c2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name32f12, setasset_name32f12}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_texte12db, setrisk_tier_texte12db}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code611f1, setrisk_tier_code611f1}= useContext(TotalContext) as TotalContextProps;
  const {bus_unit_text980f9, setbus_unit_text980f9}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_namec3c51, setbusiness_unit_namec3c51}= useContext(TotalContext) as TotalContextProps;
  const {owner_name_textbda95, setowner_name_textbda95}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namef2a73, setbusiness_owner_namef2a73}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {ruleevaluation_v1, setruleevaluation_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f081c5a9d2484707809a245ebcd675e8");
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
    setgroup675e8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_text")){
        setasset_text65667((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_text65667?.isDisabled==null)
      {
        setasset_text65667((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("desc_group")){
        setdesc_groupda73a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(desc_groupda73a?.isDisabled==null)
      {
        setdesc_groupda73a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text1cbe3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text1cbe3?.isDisabled==null)
      {
        setasset_code_text1cbe3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code2ce4b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code2ce4b?.isDisabled==null)
      {
        setasset_code2ce4b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textd22c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_textd22c2?.isDisabled==null)
      {
        setasset_name_textd22c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name32f12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name32f12?.isDisabled==null)
      {
        setasset_name32f12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_text")){
        setrisk_tier_texte12db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_texte12db?.isDisabled==null)
      {
        setrisk_tier_texte12db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code611f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code611f1?.isDisabled==null)
      {
        setrisk_tier_code611f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bus_unit_text")){
        setbus_unit_text980f9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(bus_unit_text980f9?.isDisabled==null)
      {
        setbus_unit_text980f9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_namec3c51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_namec3c51?.isDisabled==null)
      {
        setbusiness_unit_namec3c51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("owner_name_text")){
        setowner_name_textbda95((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(owner_name_textbda95?.isDisabled==null)
      {
        setowner_name_textbda95((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_namef2a73((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_namef2a73?.isDisabled==null)
      {
        setbusiness_owner_namef2a73((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
        codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
        codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
        codeStates['ai_registry_group'] = ai_registry_groupb6b42,
        codeStates['setai_registry_group'] = setai_registry_groupb6b42,
        codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
        codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
        codeStates['group'] = group675e8,
        codeStates['setgroup'] = setgroup675e8,
        codeStates['group675e8'] = group675e8Props,
        codeStates['setgroup675e8'] = setgroup675e8Props,
        codeStates['asset_text'] = asset_text65667,
        codeStates['setasset_text'] = setasset_text65667,
        codeStates['desc_group'] = desc_groupda73a,
        codeStates['setdesc_group'] = setdesc_groupda73a,
        codeStates['desc_groupda73a'] = desc_groupda73aProps,
        codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
        codeStates['asset_code_text'] = asset_code_text1cbe3,
        codeStates['setasset_code_text'] = setasset_code_text1cbe3,
        codeStates['asset_code'] = asset_code2ce4b,
        codeStates['setasset_code'] = setasset_code2ce4b,
        codeStates['asset_name_text'] = asset_name_textd22c2,
        codeStates['setasset_name_text'] = setasset_name_textd22c2,
        codeStates['asset_name'] = asset_name32f12,
        codeStates['setasset_name'] = setasset_name32f12,
        codeStates['risk_tier_text'] = risk_tier_texte12db,
        codeStates['setrisk_tier_text'] = setrisk_tier_texte12db,
        codeStates['risk_tier_code'] = risk_tier_code611f1,
        codeStates['setrisk_tier_code'] = setrisk_tier_code611f1,
        codeStates['bus_unit_text'] = bus_unit_text980f9,
        codeStates['setbus_unit_text'] = setbus_unit_text980f9,
        codeStates['business_unit_name'] = business_unit_namec3c51,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_namec3c51,
        codeStates['owner_name_text'] = owner_name_textbda95,
        codeStates['setowner_name_text'] = setowner_name_textbda95,
        codeStates['business_owner_name'] = business_owner_namef2a73,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_namef2a73,
        codeStates['rule_group'] = rule_group83db0,
        codeStates['setrule_group'] = setrule_group83db0,
        codeStates['rule_group83db0'] = rule_group83db0Props,
        codeStates['setrule_group83db0'] = setrule_group83db0Props,
        codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
        codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
        codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
        codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f081c5a9d2484707809a245ebcd675e8");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
        codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
        codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
        codeStates['ai_registry_group'] = ai_registry_groupb6b42,
        codeStates['setai_registry_group'] = setai_registry_groupb6b42,
        codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
        codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
        codeStates['group'] = group675e8,
        codeStates['setgroup'] = setgroup675e8,
        codeStates['group675e8'] = group675e8Props,
        codeStates['setgroup675e8'] = setgroup675e8Props,
        codeStates['asset_text'] = asset_text65667,
        codeStates['setasset_text'] = setasset_text65667,
        codeStates['desc_group'] = desc_groupda73a,
        codeStates['setdesc_group'] = setdesc_groupda73a,
        codeStates['desc_groupda73a'] = desc_groupda73aProps,
        codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
        codeStates['asset_code_text'] = asset_code_text1cbe3,
        codeStates['setasset_code_text'] = setasset_code_text1cbe3,
        codeStates['asset_code'] = asset_code2ce4b,
        codeStates['setasset_code'] = setasset_code2ce4b,
        codeStates['asset_name_text'] = asset_name_textd22c2,
        codeStates['setasset_name_text'] = setasset_name_textd22c2,
        codeStates['asset_name'] = asset_name32f12,
        codeStates['setasset_name'] = setasset_name32f12,
        codeStates['risk_tier_text'] = risk_tier_texte12db,
        codeStates['setrisk_tier_text'] = setrisk_tier_texte12db,
        codeStates['risk_tier_code'] = risk_tier_code611f1,
        codeStates['setrisk_tier_code'] = setrisk_tier_code611f1,
        codeStates['bus_unit_text'] = bus_unit_text980f9,
        codeStates['setbus_unit_text'] = setbus_unit_text980f9,
        codeStates['business_unit_name'] = business_unit_namec3c51,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_namec3c51,
        codeStates['owner_name_text'] = owner_name_textbda95,
        codeStates['setowner_name_text'] = setowner_name_textbda95,
        codeStates['business_owner_name'] = business_owner_namef2a73,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_namef2a73,
        codeStates['rule_group'] = rule_group83db0,
        codeStates['setrule_group'] = setrule_group83db0,
        codeStates['rule_group83db0'] = rule_group83db0Props,
        codeStates['setrule_group83db0'] = setrule_group83db0Props,
        codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
        codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
        codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
        codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group675e8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group675e8Ref.current?.setSearchParams();
    group675e8Ref.current?.handleSearch({});
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
        !Array.isArray(group675e8) &&
        Object.keys(group675e8)?.length > 0
      ) {
        setgroup675e8({})
        setgroup675e8Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group675e8Props?.refresh])


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
        gridRow: '1 / 54',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-4 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setruleevaluation_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("desc_group")  &&<Groupdesc_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("asset_text") ?<Textasset_text   /* 65667 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 1cbe3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code") ?<Textasset_code   /* 2ce4b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* d22c2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 32f12 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_text") ?<Textrisk_tier_text   /* e12db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code") ?<Textrisk_tier_code   /* 611f1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("bus_unit_text") ?<Textbus_unit_text   /* 980f9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("business_unit_name") ?<Textbusiness_unit_name   /* c3c51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("owner_name_text") ?<Textowner_name_text   /* bda95 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("business_owner_name") ?<Textbusiness_owner_name   /* f2a73 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
