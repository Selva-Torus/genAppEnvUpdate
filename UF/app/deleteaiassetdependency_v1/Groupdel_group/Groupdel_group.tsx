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
import Textdependency_id  from "./Textdependency_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textdependency_type_code  from "./Textdependency_type_code";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textdependency_name  from "./Textdependency_name";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Textdirection  from "./Textdirection";
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
      "dependency_id",
      "asset_code_text",
      "dependency_type_code",
      "asset_type_code_text",
      "dependency_name",
      "risk_tier_code_text",
      "direction",
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
  const {del_group75aad, setdel_group75aad}= useContext(TotalContext) as TotalContextProps;
  const {del_group75aadProps, setdel_group75aadProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtea30c, setdelete_heading_txtea30c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_145e91, setdel_divider_145e91}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7e015, setasset_name_text7e015}= useContext(TotalContext) as TotalContextProps;
  const {dependency_id4cc36, setdependency_id4cc36}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text08d4f, setasset_code_text08d4f}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code9420e, setdependency_type_code9420e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd9470, setasset_type_code_textd9470}= useContext(TotalContext) as TotalContextProps;
  const {dependency_name3b43e, setdependency_name3b43e}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text5d15a, setrisk_tier_code_text5d15a}= useContext(TotalContext) as TotalContextProps;
  const {direction3a025, setdirection3a025}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text04375, setlifecycle_status_code_text04375}= useContext(TotalContext) as TotalContextProps;
  const {is_activeecfb5, setis_activeecfb5}= useContext(TotalContext) as TotalContextProps;
  const {texte1857, settexte1857}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_22accf, setdel_divider_22accf}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn1a923, setdel_cancel_btn1a923}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn48b24, setdel_okl_btn48b24}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteaiassetdependency_v1, setdeleteaiassetdependency_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteAiAssetDependency:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7d8f6599078ed1494fe7ba69b5275aad");
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
    setdel_group75aadProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtea30c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtea30c?.isDisabled==null)
      {
        setdelete_heading_txtea30c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_145e91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_145e91?.isDisabled==null)
      {
        setdel_divider_145e91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text7e015((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text7e015?.isDisabled==null)
      {
        setasset_name_text7e015((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependency_id")){
        setdependency_id4cc36((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_id4cc36?.isDisabled==null)
      {
        setdependency_id4cc36((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text08d4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text08d4f?.isDisabled==null)
      {
        setasset_code_text08d4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependency_type_code")){
        setdependency_type_code9420e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_type_code9420e?.isDisabled==null)
      {
        setdependency_type_code9420e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_textd9470((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_textd9470?.isDisabled==null)
      {
        setasset_type_code_textd9470((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependency_name")){
        setdependency_name3b43e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_name3b43e?.isDisabled==null)
      {
        setdependency_name3b43e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_text5d15a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_text5d15a?.isDisabled==null)
      {
        setrisk_tier_code_text5d15a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("direction")){
        setdirection3a025((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(direction3a025?.isDisabled==null)
      {
        setdirection3a025((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_text04375((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_text04375?.isDisabled==null)
      {
        setlifecycle_status_code_text04375((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activeecfb5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activeecfb5?.isDisabled==null)
      {
        setis_activeecfb5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settexte1857((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(texte1857?.isDisabled==null)
      {
        settexte1857((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_22accf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_22accf?.isDisabled==null)
      {
        setdel_divider_22accf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn1a923((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn1a923?.isDisabled==null)
      {
        setdel_cancel_btn1a923((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn48b24((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn48b24?.isDisabled==null)
      {
        setdel_okl_btn48b24((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group75aad,
        codeStates['setdel_group'] = setdel_group75aad,
        codeStates['del_group75aad'] = del_group75aadProps,
        codeStates['setdel_group75aad'] = setdel_group75aadProps,
        codeStates['delete_heading_txt'] = delete_heading_txtea30c,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtea30c,
        codeStates['del_divider_1'] = del_divider_145e91,
        codeStates['setdel_divider_1'] = setdel_divider_145e91,
        codeStates['asset_name_text'] = asset_name_text7e015,
        codeStates['setasset_name_text'] = setasset_name_text7e015,
        codeStates['dependency_id'] = dependency_id4cc36,
        codeStates['setdependency_id'] = setdependency_id4cc36,
        codeStates['asset_code_text'] = asset_code_text08d4f,
        codeStates['setasset_code_text'] = setasset_code_text08d4f,
        codeStates['dependency_type_code'] = dependency_type_code9420e,
        codeStates['setdependency_type_code'] = setdependency_type_code9420e,
        codeStates['asset_type_code_text'] = asset_type_code_textd9470,
        codeStates['setasset_type_code_text'] = setasset_type_code_textd9470,
        codeStates['dependency_name'] = dependency_name3b43e,
        codeStates['setdependency_name'] = setdependency_name3b43e,
        codeStates['risk_tier_code_text'] = risk_tier_code_text5d15a,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text5d15a,
        codeStates['direction'] = direction3a025,
        codeStates['setdirection'] = setdirection3a025,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_text04375,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_text04375,
        codeStates['is_active'] = is_activeecfb5,
        codeStates['setis_active'] = setis_activeecfb5,
        codeStates['text'] = texte1857,
        codeStates['settext'] = settexte1857,
        codeStates['del_divider_2'] = del_divider_22accf,
        codeStates['setdel_divider_2'] = setdel_divider_22accf,
        codeStates['del_cancel_btn'] = del_cancel_btn1a923,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn1a923,
        codeStates['del_okl_btn'] = del_okl_btn48b24,
        codeStates['setdel_okl_btn'] = setdel_okl_btn48b24,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7d8f6599078ed1494fe7ba69b5275aad");
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
        codeStates['del_group'] = del_group75aad,
        codeStates['setdel_group'] = setdel_group75aad,
        codeStates['del_group75aad'] = del_group75aadProps,
        codeStates['setdel_group75aad'] = setdel_group75aadProps,
        codeStates['delete_heading_txt'] = delete_heading_txtea30c,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtea30c,
        codeStates['del_divider_1'] = del_divider_145e91,
        codeStates['setdel_divider_1'] = setdel_divider_145e91,
        codeStates['asset_name_text'] = asset_name_text7e015,
        codeStates['setasset_name_text'] = setasset_name_text7e015,
        codeStates['dependency_id'] = dependency_id4cc36,
        codeStates['setdependency_id'] = setdependency_id4cc36,
        codeStates['asset_code_text'] = asset_code_text08d4f,
        codeStates['setasset_code_text'] = setasset_code_text08d4f,
        codeStates['dependency_type_code'] = dependency_type_code9420e,
        codeStates['setdependency_type_code'] = setdependency_type_code9420e,
        codeStates['asset_type_code_text'] = asset_type_code_textd9470,
        codeStates['setasset_type_code_text'] = setasset_type_code_textd9470,
        codeStates['dependency_name'] = dependency_name3b43e,
        codeStates['setdependency_name'] = setdependency_name3b43e,
        codeStates['risk_tier_code_text'] = risk_tier_code_text5d15a,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text5d15a,
        codeStates['direction'] = direction3a025,
        codeStates['setdirection'] = setdirection3a025,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_text04375,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_text04375,
        codeStates['is_active'] = is_activeecfb5,
        codeStates['setis_active'] = setis_activeecfb5,
        codeStates['text'] = texte1857,
        codeStates['settext'] = settexte1857,
        codeStates['del_divider_2'] = del_divider_22accf,
        codeStates['setdel_divider_2'] = setdel_divider_22accf,
        codeStates['del_cancel_btn'] = del_cancel_btn1a923,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn1a923,
        codeStates['del_okl_btn'] = del_okl_btn48b24,
        codeStates['setdel_okl_btn'] = setdel_okl_btn48b24,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group75aadRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_group75aadRef.current?.setSearchParams();
    del_group75aadRef.current?.handleSearch({});
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
        !Array.isArray(del_group75aad) &&
        Object.keys(del_group75aad)?.length > 0
      ) {
        setdel_group75aad({})
      }
    } else prevRefreshRef.current = true
  }, [del_group75aadProps?.refresh])


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
          setdeleteaiassetdependency_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* ea30c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 45e91 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 7e015 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("dependency_id") ?<Textdependency_id   /* 4cc36 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 08d4f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("dependency_type_code") ?<Textdependency_type_code   /* 9420e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* d9470 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("dependency_name") ?<Textdependency_name   /* 3b43e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* 5d15a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("direction") ?<Textdirection   /* 3a025 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* 04375 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* ecfb5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* e1857 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 2accf */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
