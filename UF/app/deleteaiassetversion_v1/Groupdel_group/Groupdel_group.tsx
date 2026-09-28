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
import Textasset_version_id  from "./Textasset_version_id";
import Textasset_code_text  from "./Textasset_code_text";
import Textversion_no  from "./Textversion_no";
import Textasset_type_code_text  from "./Textasset_type_code_text";
import Textchange_type_code  from "./Textchange_type_code";
import Textrisk_tier_code_text  from "./Textrisk_tier_code_text";
import Textvalid_from  from "./Textvalid_from";
import Textlifecycle_status_code_text  from "./Textlifecycle_status_code_text";
import Textvalid_to  from "./Textvalid_to";
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
      "asset_version_id",
      "asset_code_text",
      "version_no",
      "asset_type_code_text",
      "change_type_code",
      "risk_tier_code_text",
      "valid_from",
      "lifecycle_status_code_text",
      "valid_to",
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
  const {del_group0a1e4, setdel_group0a1e4}= useContext(TotalContext) as TotalContextProps;
  const {del_group0a1e4Props, setdel_group0a1e4Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt257e2, setdelete_heading_txt257e2}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1d3380, setdel_divider_1d3380}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textd9565, setasset_name_textd9565}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_idd8a9c, setasset_version_idd8a9c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textbb47a, setasset_code_textbb47a}= useContext(TotalContext) as TotalContextProps;
  const {version_no1d837, setversion_no1d837}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text2a3a9, setasset_type_code_text2a3a9}= useContext(TotalContext) as TotalContextProps;
  const {change_type_code38ad2, setchange_type_code38ad2}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textf8ea3, setrisk_tier_code_textf8ea3}= useContext(TotalContext) as TotalContextProps;
  const {valid_from0005c, setvalid_from0005c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textdbc1a, setlifecycle_status_code_textdbc1a}= useContext(TotalContext) as TotalContextProps;
  const {valid_to432ce, setvalid_to432ce}= useContext(TotalContext) as TotalContextProps;
  const {textc1c26, settextc1c26}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2e3d3b, setdel_divider_2e3d3b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9abbc, setdel_cancel_btn9abbc}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn82920, setdel_okl_btn82920}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteaiassetversion_v1, setdeleteaiassetversion_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteAIAssetVersion:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a0cdf54c603608ef58444d65c880a1e4");
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
    setdel_group0a1e4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt257e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt257e2?.isDisabled==null)
      {
        setdelete_heading_txt257e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1d3380((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1d3380?.isDisabled==null)
      {
        setdel_divider_1d3380((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textd9565((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_textd9565?.isDisabled==null)
      {
        setasset_name_textd9565((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_version_id")){
        setasset_version_idd8a9c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_version_idd8a9c?.isDisabled==null)
      {
        setasset_version_idd8a9c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_textbb47a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_textbb47a?.isDisabled==null)
      {
        setasset_code_textbb47a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version_no")){
        setversion_no1d837((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version_no1d837?.isDisabled==null)
      {
        setversion_no1d837((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code_text")){
        setasset_type_code_text2a3a9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code_text2a3a9?.isDisabled==null)
      {
        setasset_type_code_text2a3a9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("change_type_code")){
        setchange_type_code38ad2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(change_type_code38ad2?.isDisabled==null)
      {
        setchange_type_code38ad2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code_text")){
        setrisk_tier_code_textf8ea3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code_textf8ea3?.isDisabled==null)
      {
        setrisk_tier_code_textf8ea3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_from")){
        setvalid_from0005c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_from0005c?.isDisabled==null)
      {
        setvalid_from0005c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code_text")){
        setlifecycle_status_code_textdbc1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code_textdbc1a?.isDisabled==null)
      {
        setlifecycle_status_code_textdbc1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_to")){
        setvalid_to432ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_to432ce?.isDisabled==null)
      {
        setvalid_to432ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextc1c26((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textc1c26?.isDisabled==null)
      {
        settextc1c26((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_2e3d3b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_2e3d3b?.isDisabled==null)
      {
        setdel_divider_2e3d3b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn9abbc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn9abbc?.isDisabled==null)
      {
        setdel_cancel_btn9abbc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn82920((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn82920?.isDisabled==null)
      {
        setdel_okl_btn82920((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group0a1e4,
        codeStates['setdel_group'] = setdel_group0a1e4,
        codeStates['del_group0a1e4'] = del_group0a1e4Props,
        codeStates['setdel_group0a1e4'] = setdel_group0a1e4Props,
        codeStates['delete_heading_txt'] = delete_heading_txt257e2,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt257e2,
        codeStates['del_divider_1'] = del_divider_1d3380,
        codeStates['setdel_divider_1'] = setdel_divider_1d3380,
        codeStates['asset_name_text'] = asset_name_textd9565,
        codeStates['setasset_name_text'] = setasset_name_textd9565,
        codeStates['asset_version_id'] = asset_version_idd8a9c,
        codeStates['setasset_version_id'] = setasset_version_idd8a9c,
        codeStates['asset_code_text'] = asset_code_textbb47a,
        codeStates['setasset_code_text'] = setasset_code_textbb47a,
        codeStates['version_no'] = version_no1d837,
        codeStates['setversion_no'] = setversion_no1d837,
        codeStates['asset_type_code_text'] = asset_type_code_text2a3a9,
        codeStates['setasset_type_code_text'] = setasset_type_code_text2a3a9,
        codeStates['change_type_code'] = change_type_code38ad2,
        codeStates['setchange_type_code'] = setchange_type_code38ad2,
        codeStates['risk_tier_code_text'] = risk_tier_code_textf8ea3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textf8ea3,
        codeStates['valid_from'] = valid_from0005c,
        codeStates['setvalid_from'] = setvalid_from0005c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textdbc1a,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textdbc1a,
        codeStates['valid_to'] = valid_to432ce,
        codeStates['setvalid_to'] = setvalid_to432ce,
        codeStates['text'] = textc1c26,
        codeStates['settext'] = settextc1c26,
        codeStates['del_divider_2'] = del_divider_2e3d3b,
        codeStates['setdel_divider_2'] = setdel_divider_2e3d3b,
        codeStates['del_cancel_btn'] = del_cancel_btn9abbc,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn9abbc,
        codeStates['del_okl_btn'] = del_okl_btn82920,
        codeStates['setdel_okl_btn'] = setdel_okl_btn82920,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a0cdf54c603608ef58444d65c880a1e4");
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
        codeStates['del_group'] = del_group0a1e4,
        codeStates['setdel_group'] = setdel_group0a1e4,
        codeStates['del_group0a1e4'] = del_group0a1e4Props,
        codeStates['setdel_group0a1e4'] = setdel_group0a1e4Props,
        codeStates['delete_heading_txt'] = delete_heading_txt257e2,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt257e2,
        codeStates['del_divider_1'] = del_divider_1d3380,
        codeStates['setdel_divider_1'] = setdel_divider_1d3380,
        codeStates['asset_name_text'] = asset_name_textd9565,
        codeStates['setasset_name_text'] = setasset_name_textd9565,
        codeStates['asset_version_id'] = asset_version_idd8a9c,
        codeStates['setasset_version_id'] = setasset_version_idd8a9c,
        codeStates['asset_code_text'] = asset_code_textbb47a,
        codeStates['setasset_code_text'] = setasset_code_textbb47a,
        codeStates['version_no'] = version_no1d837,
        codeStates['setversion_no'] = setversion_no1d837,
        codeStates['asset_type_code_text'] = asset_type_code_text2a3a9,
        codeStates['setasset_type_code_text'] = setasset_type_code_text2a3a9,
        codeStates['change_type_code'] = change_type_code38ad2,
        codeStates['setchange_type_code'] = setchange_type_code38ad2,
        codeStates['risk_tier_code_text'] = risk_tier_code_textf8ea3,
        codeStates['setrisk_tier_code_text'] = setrisk_tier_code_textf8ea3,
        codeStates['valid_from'] = valid_from0005c,
        codeStates['setvalid_from'] = setvalid_from0005c,
        codeStates['lifecycle_status_code_text'] = lifecycle_status_code_textdbc1a,
        codeStates['setlifecycle_status_code_text'] = setlifecycle_status_code_textdbc1a,
        codeStates['valid_to'] = valid_to432ce,
        codeStates['setvalid_to'] = setvalid_to432ce,
        codeStates['text'] = textc1c26,
        codeStates['settext'] = settextc1c26,
        codeStates['del_divider_2'] = del_divider_2e3d3b,
        codeStates['setdel_divider_2'] = setdel_divider_2e3d3b,
        codeStates['del_cancel_btn'] = del_cancel_btn9abbc,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn9abbc,
        codeStates['del_okl_btn'] = del_okl_btn82920,
        codeStates['setdel_okl_btn'] = setdel_okl_btn82920,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group0a1e4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group0a1e4Ref.current?.setSearchParams();
    del_group0a1e4Ref.current?.handleSearch({});
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
        !Array.isArray(del_group0a1e4) &&
        Object.keys(del_group0a1e4)?.length > 0
      ) {
        setdel_group0a1e4({})
      }
    } else prevRefreshRef.current = true
  }, [del_group0a1e4Props?.refresh])


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
          setdeleteaiassetversion_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 257e2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* d3380 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* d9565 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_version_id") ?<Textasset_version_id   /* d8a9c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* bb47a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("version_no") ?<Textversion_no   /* 1d837 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_code_text") ?<Textasset_type_code_text   /* 2a3a9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("change_type_code") ?<Textchange_type_code   /* 38ad2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code_text") ?<Textrisk_tier_code_text   /* f8ea3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("valid_from") ?<Textvalid_from   /* 0005c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("lifecycle_status_code_text") ?<Textlifecycle_status_code_text   /* dbc1a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("valid_to") ?<Textvalid_to   /* 432ce */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* c1c26 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* e3d3b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
