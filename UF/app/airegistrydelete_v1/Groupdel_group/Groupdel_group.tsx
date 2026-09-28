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
import Textasset_name  from "./Textasset_name";
import Textasset_code_text  from "./Textasset_code_text";
import Textasset_code  from "./Textasset_code";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textasset_type_code  from "./Textasset_type_code";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Textrisk_tier_code  from "./Textrisk_tier_code";
import Textlifecycle_status_code_text  from "./Textlifecycle_status_code_text";
import Textlifecycle_status_code  from "./Textlifecycle_status_code";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textai_asset_id  from "./Textai_asset_id";
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
      "delete_heading_txt",
      "del_divider_1",
      "asset_name_text",
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
      "asset_name",
      "asset_code_text",
      "asset_code",
      "asset_type_code_text",
      "asset_type_code",
      "risk_tier_code_text",
      "risk_tier_code",
      "lifecycle_status_code_text",
      "lifecycle_status_code",
      "text",
      "del_divider_2",
      "ai_asset_id",
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
  const {del_groupd73cb, setdel_groupd73cb}= useContext(TotalContext) as TotalContextProps;
  const {del_groupd73cbProps, setdel_groupd73cbProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt74c2d, setdelete_heading_txt74c2d}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1258b4, setdel_divider_1258b4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7fd5e, setasset_name_text7fd5e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64b8e, setasset_name64b8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text333ee, setasset_code_text333ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeabd34, setasset_codeabd34}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textfadb9, setasset_type_code_textfadb9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code2fd2c, setasset_type_code2fd2c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text398fb, setrisk_tier_code_text398fb}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codea1cf5, setrisk_tier_codea1cf5}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_texte5517, setlifecycle_status_code_texte5517}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code21964, setlifecycle_status_code21964}= useContext(TotalContext) as TotalContextProps;
  const {textb25bd, settextb25bd}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_25d9ec, setdel_divider_25d9ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id005d2, setai_asset_id005d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn0ef33, setdel_cancel_btn0ef33}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn0f4f4, setdel_okl_btn0f4f4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {airegistrydelete_v1, setairegistrydelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fbaa50574926f1d2b95ae9549a6d73cb");
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
    setdel_groupd73cbProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt74c2d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt74c2d?.isDisabled==null)
      {
        setdelete_heading_txt74c2d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1258b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1258b4?.isDisabled==null)
      {
        setdel_divider_1258b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text7fd5e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text7fd5e?.isDisabled==null)
      {
        setasset_name_text7fd5e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name64b8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name64b8e?.isDisabled==null)
      {
        setasset_name64b8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text333ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text333ee?.isDisabled==null)
      {
        setasset_code_text333ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_codeabd34((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_codeabd34?.isDisabled==null)
      {
        setasset_codeabd34((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_textfadb9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_textfadb9?.isDisabled==null)
      {
        setasset_type_code_textfadb9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code2fd2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code2fd2c?.isDisabled==null)
      {
        setasset_type_code2fd2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_text398fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_text398fb?.isDisabled==null)
      {
        setrisk_tier_code_text398fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_codea1cf5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_codea1cf5?.isDisabled==null)
      {
        setrisk_tier_codea1cf5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_texte5517((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_texte5517?.isDisabled==null)
      {
        setlifecycle_status_code_texte5517((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_code21964((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code21964?.isDisabled==null)
      {
        setlifecycle_status_code21964((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextb25bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textb25bd?.isDisabled==null)
      {
        settextb25bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_25d9ec((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_25d9ec?.isDisabled==null)
      {
        setdel_divider_25d9ec((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id005d2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id005d2?.isDisabled==null)
      {
        setai_asset_id005d2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn0ef33((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn0ef33?.isDisabled==null)
      {
        setdel_cancel_btn0ef33((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn0f4f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn0f4f4?.isDisabled==null)
      {
        setdel_okl_btn0f4f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_groupd73cb,
        codeStates['setdel_group'] = setdel_groupd73cb,
        codeStates['del_groupd73cb'] = del_groupd73cbProps,
        codeStates['setdel_groupd73cb'] = setdel_groupd73cbProps,
        codeStates['delete_heading_txt'] = delete_heading_txt74c2d,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt74c2d,
        codeStates['del_divider_1'] = del_divider_1258b4,
        codeStates['setdel_divider_1'] = setdel_divider_1258b4,
        codeStates['asset_name_text'] = asset_name_text7fd5e,
        codeStates['setasset_name_text'] = setasset_name_text7fd5e,
        codeStates['asset_name'] = asset_name64b8e,
        codeStates['setasset_name'] = setasset_name64b8e,
        codeStates['asset_code_text'] = asset_code_text333ee,
        codeStates['setasset_code_text'] = setasset_code_text333ee,
        codeStates['asset_code'] = asset_codeabd34,
        codeStates['setasset_code'] = setasset_codeabd34,
        codeStates['asset_type_code_text'] = asset_type_code_textfadb9,
        codeStates['setasset_type_code_text'] = setasset_type_code_textfadb9,
        codeStates['asset_type_code'] = asset_type_code2fd2c,
        codeStates['setasset_type_code'] = setasset_type_code2fd2c,
        codeStates['risk_tier_code_text'] = risk_tier_code_text398fb,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text398fb,
        codeStates['risk_tier_code'] = risk_tier_codea1cf5,
        codeStates['setrisk_tier_code'] = setrisk_tier_codea1cf5,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_texte5517,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_texte5517,
        codeStates['lifecycle_status_code'] = lifecycle_status_code21964,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code21964,
        codeStates['text'] = textb25bd,
        codeStates['settext'] = settextb25bd,
        codeStates['del_divider_2'] = del_divider_25d9ec,
        codeStates['setdel_divider_2'] = setdel_divider_25d9ec,
        codeStates['ai_asset_id'] = ai_asset_id005d2,
        codeStates['setai_asset_id'] = setai_asset_id005d2,
        codeStates['del_cancel_btn'] = del_cancel_btn0ef33,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn0ef33,
        codeStates['del_okl_btn'] = del_okl_btn0f4f4,
        codeStates['setdel_okl_btn'] = setdel_okl_btn0f4f4,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fbaa50574926f1d2b95ae9549a6d73cb");
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
        codeStates['del_group'] = del_groupd73cb,
        codeStates['setdel_group'] = setdel_groupd73cb,
        codeStates['del_groupd73cb'] = del_groupd73cbProps,
        codeStates['setdel_groupd73cb'] = setdel_groupd73cbProps,
        codeStates['delete_heading_txt'] = delete_heading_txt74c2d,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt74c2d,
        codeStates['del_divider_1'] = del_divider_1258b4,
        codeStates['setdel_divider_1'] = setdel_divider_1258b4,
        codeStates['asset_name_text'] = asset_name_text7fd5e,
        codeStates['setasset_name_text'] = setasset_name_text7fd5e,
        codeStates['asset_name'] = asset_name64b8e,
        codeStates['setasset_name'] = setasset_name64b8e,
        codeStates['asset_code_text'] = asset_code_text333ee,
        codeStates['setasset_code_text'] = setasset_code_text333ee,
        codeStates['asset_code'] = asset_codeabd34,
        codeStates['setasset_code'] = setasset_codeabd34,
        codeStates['asset_type_code_text'] = asset_type_code_textfadb9,
        codeStates['setasset_type_code_text'] = setasset_type_code_textfadb9,
        codeStates['asset_type_code'] = asset_type_code2fd2c,
        codeStates['setasset_type_code'] = setasset_type_code2fd2c,
        codeStates['risk_tier_code_text'] = risk_tier_code_text398fb,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text398fb,
        codeStates['risk_tier_code'] = risk_tier_codea1cf5,
        codeStates['setrisk_tier_code'] = setrisk_tier_codea1cf5,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_texte5517,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_texte5517,
        codeStates['lifecycle_status_code'] = lifecycle_status_code21964,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code21964,
        codeStates['text'] = textb25bd,
        codeStates['settext'] = settextb25bd,
        codeStates['del_divider_2'] = del_divider_25d9ec,
        codeStates['setdel_divider_2'] = setdel_divider_25d9ec,
        codeStates['ai_asset_id'] = ai_asset_id005d2,
        codeStates['setai_asset_id'] = setai_asset_id005d2,
        codeStates['del_cancel_btn'] = del_cancel_btn0ef33,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn0ef33,
        codeStates['del_okl_btn'] = del_okl_btn0f4f4,
        codeStates['setdel_okl_btn'] = setdel_okl_btn0f4f4,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_groupd73cbRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_groupd73cbRef.current?.setSearchParams();
    del_groupd73cbRef.current?.handleSearch({});
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
        !Array.isArray(del_groupd73cb) &&
        Object.keys(del_groupd73cb)?.length > 0
      ) {
        setdel_groupd73cb({})
      }
    } else prevRefreshRef.current = true
  }, [del_groupd73cbProps?.refresh])


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
          setairegistrydelete_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 74c2d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 258b4 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 7fd5e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 64b8e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 333ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code") ?<Textasset_code   /* abd34 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* fadb9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code") ?<Textasset_type_code   /* 2fd2c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* 398fb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code") ?<Textrisk_tier_code   /* a1cf5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* e5517 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code") ?<Textlifecycle_status_code   /* 21964 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* b25bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 5d9ec */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* 005d2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
