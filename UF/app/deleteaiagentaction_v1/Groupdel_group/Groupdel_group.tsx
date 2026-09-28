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
import Textagent_action_id  from "./Textagent_action_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textaction_name  from "./Textaction_name";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Texttarget_system  from "./Texttarget_system";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Texttool_or_api  from "./Texttool_or_api";
import Textlifecycle_status_code_text  from "./Textlifecycle_status_code_text";
import Textis_active  from "./Textis_active";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
      "agent_action_id",
      "asset_code_text",
      "action_name",
      "asset_type_code_text",
      "target_system",
      "risk_tier_code_text",
      "tool_or_api",
      "lifecycle_status_code_text",
      "is_active",
      "text",
      "del_divider_2",
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
  const {del_group87d56, setdel_group87d56}= useContext(TotalContext) as TotalContextProps;
  const {del_group87d56Props, setdel_group87d56Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtb320e, setdelete_heading_txtb320e}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1e8bce, setdel_divider_1e8bce}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text4d46c, setasset_name_text4d46c}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_idc996d, setagent_action_idc996d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text5a75b, setasset_code_text5a75b}= useContext(TotalContext) as TotalContextProps;
  const {action_name4a670, setaction_name4a670}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd42be, setasset_type_code_textd42be}= useContext(TotalContext) as TotalContextProps;
  const {target_systemec4ff, settarget_systemec4ff}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text38bd3, setrisk_tier_code_text38bd3}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_api8bd7c, settool_or_api8bd7c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text05717, setlifecycle_status_code_text05717}= useContext(TotalContext) as TotalContextProps;
  const {is_active7f904, setis_active7f904}= useContext(TotalContext) as TotalContextProps;
  const {text7f98b, settext7f98b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_217aff, setdel_divider_217aff}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn5cca7, setdel_cancel_btn5cca7}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn87d21, setdel_okl_btn87d21}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteaiagentaction_v1, setdeleteaiagentaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteAIAgentAction:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b24fd80538717535e7f0c195dc987d56");
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
    setdel_group87d56Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtb320e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtb320e?.isDisabled==null)
      {
        setdelete_heading_txtb320e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1e8bce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1e8bce?.isDisabled==null)
      {
        setdel_divider_1e8bce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text4d46c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text4d46c?.isDisabled==null)
      {
        setasset_name_text4d46c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_action_id")){
        setagent_action_idc996d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_action_idc996d?.isDisabled==null)
      {
        setagent_action_idc996d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text5a75b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text5a75b?.isDisabled==null)
      {
        setasset_code_text5a75b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_name")){
        setaction_name4a670((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_name4a670?.isDisabled==null)
      {
        setaction_name4a670((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_textd42be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_textd42be?.isDisabled==null)
      {
        setasset_type_code_textd42be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_system")){
        settarget_systemec4ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_systemec4ff?.isDisabled==null)
      {
        settarget_systemec4ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_text38bd3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_text38bd3?.isDisabled==null)
      {
        setrisk_tier_code_text38bd3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_or_api")){
        settool_or_api8bd7c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_or_api8bd7c?.isDisabled==null)
      {
        settool_or_api8bd7c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_text05717((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_text05717?.isDisabled==null)
      {
        setlifecycle_status_code_text05717((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active7f904((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active7f904?.isDisabled==null)
      {
        setis_active7f904((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext7f98b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text7f98b?.isDisabled==null)
      {
        settext7f98b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_217aff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_217aff?.isDisabled==null)
      {
        setdel_divider_217aff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn5cca7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn5cca7?.isDisabled==null)
      {
        setdel_cancel_btn5cca7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn87d21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn87d21?.isDisabled==null)
      {
        setdel_okl_btn87d21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group87d56,
        codeStates['setdel_group'] = setdel_group87d56,
        codeStates['del_group87d56'] = del_group87d56Props,
        codeStates['setdel_group87d56'] = setdel_group87d56Props,
        codeStates['delete_heading_txt'] = delete_heading_txtb320e,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtb320e,
        codeStates['del_divider_1'] = del_divider_1e8bce,
        codeStates['setdel_divider_1'] = setdel_divider_1e8bce,
        codeStates['asset_name_text'] = asset_name_text4d46c,
        codeStates['setasset_name_text'] = setasset_name_text4d46c,
        codeStates['agent_action_id'] = agent_action_idc996d,
        codeStates['setagent_action_id'] = setagent_action_idc996d,
        codeStates['asset_code_text'] = asset_code_text5a75b,
        codeStates['setasset_code_text'] = setasset_code_text5a75b,
        codeStates['action_name'] = action_name4a670,
        codeStates['setaction_name'] = setaction_name4a670,
        codeStates['asset_type_code_text'] = asset_type_code_textd42be,
        codeStates['setasset_type_code_text'] = setasset_type_code_textd42be,
        codeStates['target_system'] = target_systemec4ff,
        codeStates['settarget_system'] = settarget_systemec4ff,
        codeStates['risk_tier_code_text'] = risk_tier_code_text38bd3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text38bd3,
        codeStates['tool_or_api'] = tool_or_api8bd7c,
        codeStates['settool_or_api'] = settool_or_api8bd7c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_text05717,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_text05717,
        codeStates['is_active'] = is_active7f904,
        codeStates['setis_active'] = setis_active7f904,
        codeStates['text'] = text7f98b,
        codeStates['settext'] = settext7f98b,
        codeStates['del_divider_2'] = del_divider_217aff,
        codeStates['setdel_divider_2'] = setdel_divider_217aff,
        codeStates['del_cancel_btn'] = del_cancel_btn5cca7,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn5cca7,
        codeStates['del_okl_btn'] = del_okl_btn87d21,
        codeStates['setdel_okl_btn'] = setdel_okl_btn87d21,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b24fd80538717535e7f0c195dc987d56");
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
        codeStates['del_group'] = del_group87d56,
        codeStates['setdel_group'] = setdel_group87d56,
        codeStates['del_group87d56'] = del_group87d56Props,
        codeStates['setdel_group87d56'] = setdel_group87d56Props,
        codeStates['delete_heading_txt'] = delete_heading_txtb320e,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtb320e,
        codeStates['del_divider_1'] = del_divider_1e8bce,
        codeStates['setdel_divider_1'] = setdel_divider_1e8bce,
        codeStates['asset_name_text'] = asset_name_text4d46c,
        codeStates['setasset_name_text'] = setasset_name_text4d46c,
        codeStates['agent_action_id'] = agent_action_idc996d,
        codeStates['setagent_action_id'] = setagent_action_idc996d,
        codeStates['asset_code_text'] = asset_code_text5a75b,
        codeStates['setasset_code_text'] = setasset_code_text5a75b,
        codeStates['action_name'] = action_name4a670,
        codeStates['setaction_name'] = setaction_name4a670,
        codeStates['asset_type_code_text'] = asset_type_code_textd42be,
        codeStates['setasset_type_code_text'] = setasset_type_code_textd42be,
        codeStates['target_system'] = target_systemec4ff,
        codeStates['settarget_system'] = settarget_systemec4ff,
        codeStates['risk_tier_code_text'] = risk_tier_code_text38bd3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text38bd3,
        codeStates['tool_or_api'] = tool_or_api8bd7c,
        codeStates['settool_or_api'] = settool_or_api8bd7c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_text05717,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_text05717,
        codeStates['is_active'] = is_active7f904,
        codeStates['setis_active'] = setis_active7f904,
        codeStates['text'] = text7f98b,
        codeStates['settext'] = settext7f98b,
        codeStates['del_divider_2'] = del_divider_217aff,
        codeStates['setdel_divider_2'] = setdel_divider_217aff,
        codeStates['del_cancel_btn'] = del_cancel_btn5cca7,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn5cca7,
        codeStates['del_okl_btn'] = del_okl_btn87d21,
        codeStates['setdel_okl_btn'] = setdel_okl_btn87d21,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group87d56Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group87d56Ref.current?.setSearchParams();
    del_group87d56Ref.current?.handleSearch({});
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
        !Array.isArray(del_group87d56) &&
        Object.keys(del_group87d56)?.length > 0
      ) {
        setdel_group87d56({})
      }
    } else prevRefreshRef.current = true
  }, [del_group87d56Props?.refresh])


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
        gridRow: '1 / 63',
      
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
          setdeleteaiagentaction_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* b320e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* e8bce */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 4d46c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_action_id") ?<Textagent_action_id   /* c996d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 5a75b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("action_name") ?<Textaction_name   /* 4a670 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* d42be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("target_system") ?<Texttarget_system   /* ec4ff */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* 38bd3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tool_or_api") ?<Texttool_or_api   /* 8bd7c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* 05717 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 7f904 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 7f98b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 17aff */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
