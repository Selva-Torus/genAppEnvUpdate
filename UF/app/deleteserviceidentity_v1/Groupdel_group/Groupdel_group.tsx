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
import Textidentity_id  from "./Textidentity_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textasset_name  from "./Textasset_name";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textprincipal_id  from "./Textprincipal_id";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Textprincipal_type  from "./Textprincipal_type";
import Textlifecycle_status_code_text  from "./Textlifecycle_status_code_text";
import Textidentity_provider  from "./Textidentity_provider";
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
      "identity_id",
      "asset_code_text",
      "asset_name",
      "asset_type_code_text",
      "principal_id",
      "risk_tier_code_text",
      "principal_type",
      "lifecycle_status_code_text",
      "identity_provider",
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
  const {del_group7f870, setdel_group7f870}= useContext(TotalContext) as TotalContextProps;
  const {del_group7f870Props, setdel_group7f870Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtf9471, setdelete_heading_txtf9471}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1321ef, setdel_divider_1321ef}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text5cf8a, setasset_name_text5cf8a}= useContext(TotalContext) as TotalContextProps;
  const {identity_ide840b, setidentity_ide840b}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text9ff1b, setasset_code_text9ff1b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name6163e, setasset_name6163e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text57627, setasset_type_code_text57627}= useContext(TotalContext) as TotalContextProps;
  const {principal_id3e7f4, setprincipal_id3e7f4}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text4fcd1, setrisk_tier_code_text4fcd1}= useContext(TotalContext) as TotalContextProps;
  const {principal_typefe01d, setprincipal_typefe01d}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc44b6, setlifecycle_status_code_textc44b6}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1bb9d, setidentity_provider1bb9d}= useContext(TotalContext) as TotalContextProps;
  const {text9d6d5, settext9d6d5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_23064f, setdel_divider_23064f}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn69608, setdel_cancel_btn69608}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn070a5, setdel_okl_btn070a5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteserviceidentity_v1, setdeleteserviceidentity_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteServiceIdentity:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9c258863f668954d9aa4e3170c07f870");
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
    setdel_group7f870Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtf9471((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtf9471?.isDisabled==null)
      {
        setdelete_heading_txtf9471((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1321ef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1321ef?.isDisabled==null)
      {
        setdel_divider_1321ef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text5cf8a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text5cf8a?.isDisabled==null)
      {
        setasset_name_text5cf8a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_id")){
        setidentity_ide840b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_ide840b?.isDisabled==null)
      {
        setidentity_ide840b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_text9ff1b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_text9ff1b?.isDisabled==null)
      {
        setasset_code_text9ff1b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name6163e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name6163e?.isDisabled==null)
      {
        setasset_name6163e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text57627((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text57627?.isDisabled==null)
      {
        setasset_type_code_text57627((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_id")){
        setprincipal_id3e7f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_id3e7f4?.isDisabled==null)
      {
        setprincipal_id3e7f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_text4fcd1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_text4fcd1?.isDisabled==null)
      {
        setrisk_tier_code_text4fcd1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_type")){
        setprincipal_typefe01d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_typefe01d?.isDisabled==null)
      {
        setprincipal_typefe01d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_textc44b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_textc44b6?.isDisabled==null)
      {
        setlifecycle_status_code_textc44b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_provider1bb9d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_provider1bb9d?.isDisabled==null)
      {
        setidentity_provider1bb9d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext9d6d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text9d6d5?.isDisabled==null)
      {
        settext9d6d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_23064f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_23064f?.isDisabled==null)
      {
        setdel_divider_23064f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn69608((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn69608?.isDisabled==null)
      {
        setdel_cancel_btn69608((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn070a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn070a5?.isDisabled==null)
      {
        setdel_okl_btn070a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group7f870,
        codeStates['setdel_group'] = setdel_group7f870,
        codeStates['del_group7f870'] = del_group7f870Props,
        codeStates['setdel_group7f870'] = setdel_group7f870Props,
        codeStates['delete_heading_txt'] = delete_heading_txtf9471,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtf9471,
        codeStates['del_divider_1'] = del_divider_1321ef,
        codeStates['setdel_divider_1'] = setdel_divider_1321ef,
        codeStates['asset_name_text'] = asset_name_text5cf8a,
        codeStates['setasset_name_text'] = setasset_name_text5cf8a,
        codeStates['identity_id'] = identity_ide840b,
        codeStates['setidentity_id'] = setidentity_ide840b,
        codeStates['asset_code_text'] = asset_code_text9ff1b,
        codeStates['setasset_code_text'] = setasset_code_text9ff1b,
        codeStates['asset_name'] = asset_name6163e,
        codeStates['setasset_name'] = setasset_name6163e,
        codeStates['asset_type_code_text'] = asset_type_code_text57627,
        codeStates['setasset_type_code_text'] = setasset_type_code_text57627,
        codeStates['principal_id'] = principal_id3e7f4,
        codeStates['setprincipal_id'] = setprincipal_id3e7f4,
        codeStates['risk_tier_code_text'] = risk_tier_code_text4fcd1,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text4fcd1,
        codeStates['principal_type'] = principal_typefe01d,
        codeStates['setprincipal_type'] = setprincipal_typefe01d,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc44b6,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc44b6,
        codeStates['identity_provider'] = identity_provider1bb9d,
        codeStates['setidentity_provider'] = setidentity_provider1bb9d,
        codeStates['text'] = text9d6d5,
        codeStates['settext'] = settext9d6d5,
        codeStates['del_divider_2'] = del_divider_23064f,
        codeStates['setdel_divider_2'] = setdel_divider_23064f,
        codeStates['del_cancel_btn'] = del_cancel_btn69608,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn69608,
        codeStates['del_okl_btn'] = del_okl_btn070a5,
        codeStates['setdel_okl_btn'] = setdel_okl_btn070a5,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9c258863f668954d9aa4e3170c07f870");
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
        codeStates['del_group'] = del_group7f870,
        codeStates['setdel_group'] = setdel_group7f870,
        codeStates['del_group7f870'] = del_group7f870Props,
        codeStates['setdel_group7f870'] = setdel_group7f870Props,
        codeStates['delete_heading_txt'] = delete_heading_txtf9471,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtf9471,
        codeStates['del_divider_1'] = del_divider_1321ef,
        codeStates['setdel_divider_1'] = setdel_divider_1321ef,
        codeStates['asset_name_text'] = asset_name_text5cf8a,
        codeStates['setasset_name_text'] = setasset_name_text5cf8a,
        codeStates['identity_id'] = identity_ide840b,
        codeStates['setidentity_id'] = setidentity_ide840b,
        codeStates['asset_code_text'] = asset_code_text9ff1b,
        codeStates['setasset_code_text'] = setasset_code_text9ff1b,
        codeStates['asset_name'] = asset_name6163e,
        codeStates['setasset_name'] = setasset_name6163e,
        codeStates['asset_type_code_text'] = asset_type_code_text57627,
        codeStates['setasset_type_code_text'] = setasset_type_code_text57627,
        codeStates['principal_id'] = principal_id3e7f4,
        codeStates['setprincipal_id'] = setprincipal_id3e7f4,
        codeStates['risk_tier_code_text'] = risk_tier_code_text4fcd1,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_text4fcd1,
        codeStates['principal_type'] = principal_typefe01d,
        codeStates['setprincipal_type'] = setprincipal_typefe01d,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textc44b6,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textc44b6,
        codeStates['identity_provider'] = identity_provider1bb9d,
        codeStates['setidentity_provider'] = setidentity_provider1bb9d,
        codeStates['text'] = text9d6d5,
        codeStates['settext'] = settext9d6d5,
        codeStates['del_divider_2'] = del_divider_23064f,
        codeStates['setdel_divider_2'] = setdel_divider_23064f,
        codeStates['del_cancel_btn'] = del_cancel_btn69608,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn69608,
        codeStates['del_okl_btn'] = del_okl_btn070a5,
        codeStates['setdel_okl_btn'] = setdel_okl_btn070a5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group7f870Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group7f870Ref.current?.setSearchParams();
    del_group7f870Ref.current?.handleSearch({});
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
        !Array.isArray(del_group7f870) &&
        Object.keys(del_group7f870)?.length > 0
      ) {
        setdel_group7f870({})
        setdel_group7f870Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [del_group7f870Props?.refresh])


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
          setdeleteserviceidentity_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* f9471 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 321ef */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 5cf8a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("identity_id") ?<Textidentity_id   /* e840b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* 9ff1b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 6163e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 57627 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("principal_id") ?<Textprincipal_id   /* 3e7f4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* 4fcd1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("principal_type") ?<Textprincipal_type   /* fe01d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* c44b6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("identity_provider") ?<Textidentity_provider   /* 1bb9d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 9d6d5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 3064f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
