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
import Textdelete_heading_txt  from "./Textdelete_heading_txt";
import Dividerdel_divider_1  from "./Dividerdel_divider_1";
import Textasset_name_text  from "./Textasset_name_text";
import Textpolicy_code  from "./Textpolicy_code";
import Textasset_code_text  from "./Textasset_code_text";
import Textpolicy_name  from "./Textpolicy_name";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textpolicy_type  from "./Textpolicy_type";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Textapplies_to_tiers  from "./Textapplies_to_tiers";
import Textlifecycle_status_code_text  from "./Textlifecycle_status_code_text";
import Texttest_status  from "./Texttest_status";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textpolicy_rule_id  from "./Textpolicy_rule_id";
import Buttondel_cancel_btn  from "./Buttondel_cancel_btn";
import Buttondel_okl_btn  from "./Buttondel_okl_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdel_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "policy_code",
      "asset_code_text",
      "policy_name",
      "asset_type_code_text",
      "policy_type",
      "risk_tier_code_text",
      "applies_to_tiers",
      "lifecycle_status_code_text",
      "test_status",
      "text",
      "del_divider_2",
      "policy_rule_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
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
  const {del_group56243, setdel_group56243}= useContext(TotalContext) as TotalContextProps;
  const {del_group56243Props, setdel_group56243Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txte8a82, setdelete_heading_txte8a82}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1bd3d8, setdel_divider_1bd3d8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text60051, setasset_name_text60051}= useContext(TotalContext) as TotalContextProps;
  const {policy_code3279a, setpolicy_code3279a}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta659e, setasset_code_texta659e}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3072c, setpolicy_name3072c}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text620ea, setasset_type_code_text620ea}= useContext(TotalContext) as TotalContextProps;
  const {policy_type7ebd5, setpolicy_type7ebd5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text79046, setrisk_tier_code_text79046}= useContext(TotalContext) as TotalContextProps;
  const {applies_to_tiers7f62c, setapplies_to_tiers7f62c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc74b9, setlifecycle_status_code_textc74b9}= useContext(TotalContext) as TotalContextProps;
  const {test_status61eae, settest_status61eae}= useContext(TotalContext) as TotalContextProps;
  const {text48ed4, settext48ed4}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_24cf58, setdel_divider_24cf58}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_id35702, setpolicy_rule_id35702}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn42f6a, setdel_cancel_btn42f6a}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn6aa11, setdel_okl_btn6aa11}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletepolicyrule_v1, setdeletepolicyrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deletePolicyRule:AFVK:v1',
    [user],
    'GroupDelGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a8ff6ba79c83b3e6b0c730a8b0956243");
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
    setdel_group56243Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txte8a82((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txte8a82?.isDisabled==null)
      {
        setdelete_heading_txte8a82((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1bd3d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1bd3d8?.isDisabled==null)
      {
        setdel_divider_1bd3d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text60051((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text60051?.isDisabled==null)
      {
        setasset_name_text60051((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_code")){
        setpolicy_code3279a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_code3279a?.isDisabled==null)
      {
        setpolicy_code3279a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_texta659e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_texta659e?.isDisabled==null)
      {
        setasset_code_texta659e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_name3072c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_name3072c?.isDisabled==null)
      {
        setpolicy_name3072c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text620ea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text620ea?.isDisabled==null)
      {
        setasset_type_code_text620ea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_type")){
        setpolicy_type7ebd5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_type7ebd5?.isDisabled==null)
      {
        setpolicy_type7ebd5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_text79046((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_text79046?.isDisabled==null)
      {
        setrisk_tier_code_text79046((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_to_tiers")){
        setapplies_to_tiers7f62c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_to_tiers7f62c?.isDisabled==null)
      {
        setapplies_to_tiers7f62c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_textc74b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_textc74b9?.isDisabled==null)
      {
        setlifecycle_status_code_textc74b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("test_status")){
        settest_status61eae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(test_status61eae?.isDisabled==null)
      {
        settest_status61eae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext48ed4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text48ed4?.isDisabled==null)
      {
        settext48ed4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_24cf58((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_24cf58?.isDisabled==null)
      {
        setdel_divider_24cf58((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_rule_id")){
        setpolicy_rule_id35702((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_rule_id35702?.isDisabled==null)
      {
        setpolicy_rule_id35702((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn42f6a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn42f6a?.isDisabled==null)
      {
        setdel_cancel_btn42f6a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn6aa11((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn6aa11?.isDisabled==null)
      {
        setdel_okl_btn6aa11((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group56243,
        codeStates['setdel_group'] = setdel_group56243,
        codeStates['del_group56243'] = del_group56243Props,
        codeStates['setdel_group56243'] = setdel_group56243Props,
        codeStates['delete_heading_txt'] = delete_heading_txte8a82,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txte8a82,
        codeStates['del_divider_1'] = del_divider_1bd3d8,
        codeStates['setdel_divider_1'] = setdel_divider_1bd3d8,
        codeStates['asset_name_text'] = asset_name_text60051,
        codeStates['setasset_name_text'] = setasset_name_text60051,
        codeStates['policy_code'] = policy_code3279a,
        codeStates['setpolicy_code'] = setpolicy_code3279a,
        codeStates['asset_code_text'] = asset_code_texta659e,
        codeStates['setasset_code_text'] = setasset_code_texta659e,
        codeStates['policy_name'] = policy_name3072c,
        codeStates['setpolicy_name'] = setpolicy_name3072c,
        codeStates['asset_type_code_text'] = asset_type_code_text620ea,
        codeStates['setasset_type_code_text'] = setasset_type_code_text620ea,
        codeStates['policy_type'] = policy_type7ebd5,
        codeStates['setpolicy_type'] = setpolicy_type7ebd5,
        codeStates['risk_tier_code_text'] = risk_tier_code_text79046,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text79046,
        codeStates['applies_to_tiers'] = applies_to_tiers7f62c,
        codeStates['setapplies_to_tiers'] = setapplies_to_tiers7f62c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc74b9,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc74b9,
        codeStates['test_status'] = test_status61eae,
        codeStates['settest_status'] = settest_status61eae,
        codeStates['text'] = text48ed4,
        codeStates['settext'] = settext48ed4,
        codeStates['del_divider_2'] = del_divider_24cf58,
        codeStates['setdel_divider_2'] = setdel_divider_24cf58,
        codeStates['policy_rule_id'] = policy_rule_id35702,
        codeStates['setpolicy_rule_id'] = setpolicy_rule_id35702,
        codeStates['del_cancel_btn'] = del_cancel_btn42f6a,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn42f6a,
        codeStates['del_okl_btn'] = del_okl_btn6aa11,
        codeStates['setdel_okl_btn'] = setdel_okl_btn6aa11,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a8ff6ba79c83b3e6b0c730a8b0956243");
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
        codeStates['del_group'] = del_group56243,
        codeStates['setdel_group'] = setdel_group56243,
        codeStates['del_group56243'] = del_group56243Props,
        codeStates['setdel_group56243'] = setdel_group56243Props,
        codeStates['delete_heading_txt'] = delete_heading_txte8a82,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txte8a82,
        codeStates['del_divider_1'] = del_divider_1bd3d8,
        codeStates['setdel_divider_1'] = setdel_divider_1bd3d8,
        codeStates['asset_name_text'] = asset_name_text60051,
        codeStates['setasset_name_text'] = setasset_name_text60051,
        codeStates['policy_code'] = policy_code3279a,
        codeStates['setpolicy_code'] = setpolicy_code3279a,
        codeStates['asset_code_text'] = asset_code_texta659e,
        codeStates['setasset_code_text'] = setasset_code_texta659e,
        codeStates['policy_name'] = policy_name3072c,
        codeStates['setpolicy_name'] = setpolicy_name3072c,
        codeStates['asset_type_code_text'] = asset_type_code_text620ea,
        codeStates['setasset_type_code_text'] = setasset_type_code_text620ea,
        codeStates['policy_type'] = policy_type7ebd5,
        codeStates['setpolicy_type'] = setpolicy_type7ebd5,
        codeStates['risk_tier_code_text'] = risk_tier_code_text79046,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text79046,
        codeStates['applies_to_tiers'] = applies_to_tiers7f62c,
        codeStates['setapplies_to_tiers'] = setapplies_to_tiers7f62c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc74b9,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc74b9,
        codeStates['test_status'] = test_status61eae,
        codeStates['settest_status'] = settest_status61eae,
        codeStates['text'] = text48ed4,
        codeStates['settext'] = settext48ed4,
        codeStates['del_divider_2'] = del_divider_24cf58,
        codeStates['setdel_divider_2'] = setdel_divider_24cf58,
        codeStates['policy_rule_id'] = policy_rule_id35702,
        codeStates['setpolicy_rule_id'] = setpolicy_rule_id35702,
        codeStates['del_cancel_btn'] = del_cancel_btn42f6a,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn42f6a,
        codeStates['del_okl_btn'] = del_okl_btn6aa11,
        codeStates['setdel_okl_btn'] = setdel_okl_btn6aa11,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group56243Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group56243Ref.current?.setSearchParams();
    del_group56243Ref.current?.handleSearch({});
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
        !Array.isArray(del_group56243) &&
        Object.keys(del_group56243)?.length > 0
      ) {
        setdel_group56243({})
        setdel_group56243Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [del_group56243Props?.refresh])


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
        gridRow: '1 / 61',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdeletepolicyrule_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* e8a82 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* bd3d8 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 60051 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_code") ?<Textpolicy_code   /* 3279a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* a659e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_name") ?<Textpolicy_name   /* 3072c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 620ea */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_type") ?<Textpolicy_type   /* 7ebd5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* 79046 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("applies_to_tiers") ?<Textapplies_to_tiers   /* 7f62c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* c74b9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("test_status") ?<Texttest_status   /* 61eae */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 48ed4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 4cf58 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_rule_id") ?<Textpolicy_rule_id   /* 35702 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
