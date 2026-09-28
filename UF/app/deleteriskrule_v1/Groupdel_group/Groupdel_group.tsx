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
import Textrisk_rule_id  from "./Textrisk_rule_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textrisk_rule_code  from "./Textrisk_rule_code";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textresult_tier_code  from "./Textresult_tier_code";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Texteffective_from  from "./Texteffective_from";
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
      "risk_rule_id",
      "asset_code_text",
      "risk_rule_code",
      "asset_type_code_text",
      "result_tier_code",
      "risk_tier_code_text",
      "effective_from",
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
  const {del_group9ef8a, setdel_group9ef8a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9ef8aProps, setdel_group9ef8aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtdb5d3, setdelete_heading_txtdb5d3}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_156db0, setdel_divider_156db0}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text54f6e, setasset_name_text54f6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id410ac, setrisk_rule_id410ac}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text06814, setasset_code_text06814}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_codee559b, setrisk_rule_codee559b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text95c11, setasset_type_code_text95c11}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_code8dc1a, setresult_tier_code8dc1a}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textcc1ba, setrisk_tier_code_textcc1ba}= useContext(TotalContext) as TotalContextProps;
  const {effective_from26db3, seteffective_from26db3}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textacd8e, setlifecycle_status_code_textacd8e}= useContext(TotalContext) as TotalContextProps;
  const {is_active03bb0, setis_active03bb0}= useContext(TotalContext) as TotalContextProps;
  const {texted768, settexted768}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28b40e, setdel_divider_28b40e}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn18f5b, setdel_cancel_btn18f5b}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2baeb, setdel_okl_btn2baeb}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteriskrule_v1, setdeleteriskrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteRiskRule:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d283a8b55c7049e8842ffc1c3b89ef8a");
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
    setdel_group9ef8aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtdb5d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtdb5d3?.isDisabled==null)
      {
        setdelete_heading_txtdb5d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_156db0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_156db0?.isDisabled==null)
      {
        setdel_divider_156db0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text54f6e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text54f6e?.isDisabled==null)
      {
        setasset_name_text54f6e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_id")){
        setrisk_rule_id410ac((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_id410ac?.isDisabled==null)
      {
        setrisk_rule_id410ac((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text06814((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text06814?.isDisabled==null)
      {
        setasset_code_text06814((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_code")){
        setrisk_rule_codee559b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_codee559b?.isDisabled==null)
      {
        setrisk_rule_codee559b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text95c11((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text95c11?.isDisabled==null)
      {
        setasset_type_code_text95c11((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("result_tier_code")){
        setresult_tier_code8dc1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(result_tier_code8dc1a?.isDisabled==null)
      {
        setresult_tier_code8dc1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_textcc1ba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_textcc1ba?.isDisabled==null)
      {
        setrisk_tier_code_textcc1ba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_from")){
        seteffective_from26db3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_from26db3?.isDisabled==null)
      {
        seteffective_from26db3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_textacd8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_textacd8e?.isDisabled==null)
      {
        setlifecycle_status_code_textacd8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active03bb0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active03bb0?.isDisabled==null)
      {
        setis_active03bb0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settexted768((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(texted768?.isDisabled==null)
      {
        settexted768((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_28b40e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_28b40e?.isDisabled==null)
      {
        setdel_divider_28b40e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn18f5b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn18f5b?.isDisabled==null)
      {
        setdel_cancel_btn18f5b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn2baeb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn2baeb?.isDisabled==null)
      {
        setdel_okl_btn2baeb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group9ef8a,
        codeStates['setdel_group'] = setdel_group9ef8a,
        codeStates['del_group9ef8a'] = del_group9ef8aProps,
        codeStates['setdel_group9ef8a'] = setdel_group9ef8aProps,
        codeStates['delete_heading_txt'] = delete_heading_txtdb5d3,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtdb5d3,
        codeStates['del_divider_1'] = del_divider_156db0,
        codeStates['setdel_divider_1'] = setdel_divider_156db0,
        codeStates['asset_name_text'] = asset_name_text54f6e,
        codeStates['setasset_name_text'] = setasset_name_text54f6e,
        codeStates['risk_rule_id'] = risk_rule_id410ac,
        codeStates['setrisk_rule_id'] = setrisk_rule_id410ac,
        codeStates['asset_code_text'] = asset_code_text06814,
        codeStates['setasset_code_text'] = setasset_code_text06814,
        codeStates['risk_rule_code'] = risk_rule_codee559b,
        codeStates['setrisk_rule_code'] = setrisk_rule_codee559b,
        codeStates['asset_type_code_text'] = asset_type_code_text95c11,
        codeStates['setasset_type_code_text'] = setasset_type_code_text95c11,
        codeStates['result_tier_code'] = result_tier_code8dc1a,
        codeStates['setresult_tier_code'] = setresult_tier_code8dc1a,
        codeStates['risk_tier_code_text'] = risk_tier_code_textcc1ba,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textcc1ba,
        codeStates['effective_from'] = effective_from26db3,
        codeStates['seteffective_from'] = seteffective_from26db3,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textacd8e,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textacd8e,
        codeStates['is_active'] = is_active03bb0,
        codeStates['setis_active'] = setis_active03bb0,
        codeStates['text'] = texted768,
        codeStates['settext'] = settexted768,
        codeStates['del_divider_2'] = del_divider_28b40e,
        codeStates['setdel_divider_2'] = setdel_divider_28b40e,
        codeStates['del_cancel_btn'] = del_cancel_btn18f5b,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn18f5b,
        codeStates['del_okl_btn'] = del_okl_btn2baeb,
        codeStates['setdel_okl_btn'] = setdel_okl_btn2baeb,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d283a8b55c7049e8842ffc1c3b89ef8a");
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
        codeStates['del_group'] = del_group9ef8a,
        codeStates['setdel_group'] = setdel_group9ef8a,
        codeStates['del_group9ef8a'] = del_group9ef8aProps,
        codeStates['setdel_group9ef8a'] = setdel_group9ef8aProps,
        codeStates['delete_heading_txt'] = delete_heading_txtdb5d3,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtdb5d3,
        codeStates['del_divider_1'] = del_divider_156db0,
        codeStates['setdel_divider_1'] = setdel_divider_156db0,
        codeStates['asset_name_text'] = asset_name_text54f6e,
        codeStates['setasset_name_text'] = setasset_name_text54f6e,
        codeStates['risk_rule_id'] = risk_rule_id410ac,
        codeStates['setrisk_rule_id'] = setrisk_rule_id410ac,
        codeStates['asset_code_text'] = asset_code_text06814,
        codeStates['setasset_code_text'] = setasset_code_text06814,
        codeStates['risk_rule_code'] = risk_rule_codee559b,
        codeStates['setrisk_rule_code'] = setrisk_rule_codee559b,
        codeStates['asset_type_code_text'] = asset_type_code_text95c11,
        codeStates['setasset_type_code_text'] = setasset_type_code_text95c11,
        codeStates['result_tier_code'] = result_tier_code8dc1a,
        codeStates['setresult_tier_code'] = setresult_tier_code8dc1a,
        codeStates['risk_tier_code_text'] = risk_tier_code_textcc1ba,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textcc1ba,
        codeStates['effective_from'] = effective_from26db3,
        codeStates['seteffective_from'] = seteffective_from26db3,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textacd8e,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textacd8e,
        codeStates['is_active'] = is_active03bb0,
        codeStates['setis_active'] = setis_active03bb0,
        codeStates['text'] = texted768,
        codeStates['settext'] = settexted768,
        codeStates['del_divider_2'] = del_divider_28b40e,
        codeStates['setdel_divider_2'] = setdel_divider_28b40e,
        codeStates['del_cancel_btn'] = del_cancel_btn18f5b,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn18f5b,
        codeStates['del_okl_btn'] = del_okl_btn2baeb,
        codeStates['setdel_okl_btn'] = setdel_okl_btn2baeb,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group9ef8aRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_group9ef8aRef.current?.setSearchParams();
    del_group9ef8aRef.current?.handleSearch({});
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
        !Array.isArray(del_group9ef8a) &&
        Object.keys(del_group9ef8a)?.length > 0
      ) {
        setdel_group9ef8a({})
      }
    } else prevRefreshRef.current = true
  }, [del_group9ef8aProps?.refresh])


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
        gridRow: '1 / 62',
      
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
          setdeleteriskrule_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* db5d3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 56db0 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 54f6e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_rule_id") ?<Textrisk_rule_id   /* 410ac */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 06814 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_rule_code") ?<Textrisk_rule_code   /* e559b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 95c11 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("result_tier_code") ?<Textresult_tier_code   /* 8dc1a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* cc1ba */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("effective_from") ?<Texteffective_from   /* 26db3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* acd8e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 03bb0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* ed768 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 8b40e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
