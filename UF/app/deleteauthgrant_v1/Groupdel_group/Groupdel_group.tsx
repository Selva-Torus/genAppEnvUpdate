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
import Textauthority_grant_id_text  from "./Textauthority_grant_id_text";
import Textauthority_grant_id  from "./Textauthority_grant_id";
import Textgrant_code_text  from "./Textgrant_code_text";
import Textgrant_code  from "./Textgrant_code";
import Textmax_amount_per_txn_text  from "./Textmax_amount_per_txn_text";
import Textmax_amount_per_txn  from "./Textmax_amount_per_txn";
import Textcurrency_text  from "./Textcurrency_text";
import Textcurrency  from "./Textcurrency";
import Textrevocation_reason_text  from "./Textrevocation_reason_text";
import Textrevocation_reason  from "./Textrevocation_reason";
import Textstatust_text  from "./Textstatust_text";
import Textstatus  from "./Textstatus";
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
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
      "authority_grant_id_text",
      "authority_grant_id",
      "grant_code_text",
      "grant_code",
      "max_amount_per_txn_text",
      "max_amount_per_txn",
      "currency_text",
      "currency",
      "revocation_reason_text",
      "revocation_reason",
      "statust_text",
      "status",
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
  const {del_group1428f, setdel_group1428f}= useContext(TotalContext) as TotalContextProps;
  const {del_group1428fProps, setdel_group1428fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtebcb8, setdelete_heading_txtebcb8}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_127efe, setdel_divider_127efe}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id_text79504, setauthority_grant_id_text79504}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id84597, setauthority_grant_id84597}= useContext(TotalContext) as TotalContextProps;
  const {grant_code_text94baa, setgrant_code_text94baa}= useContext(TotalContext) as TotalContextProps;
  const {grant_code8a454, setgrant_code8a454}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txn_textec183, setmax_amount_per_txn_textec183}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txnd3f90, setmax_amount_per_txnd3f90}= useContext(TotalContext) as TotalContextProps;
  const {currency_text0fee1, setcurrency_text0fee1}= useContext(TotalContext) as TotalContextProps;
  const {currencye5d71, setcurrencye5d71}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reason_texte522e, setrevocation_reason_texte522e}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reasonb4abb, setrevocation_reasonb4abb}= useContext(TotalContext) as TotalContextProps;
  const {statust_textcc6bd, setstatust_textcc6bd}= useContext(TotalContext) as TotalContextProps;
  const {status66a0b, setstatus66a0b}= useContext(TotalContext) as TotalContextProps;
  const {text6cc24, settext6cc24}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28ee76, setdel_divider_28ee76}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn6d001, setdel_cancel_btn6d001}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn256dd, setdel_okl_btn256dd}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteauthgrant_v1, setdeleteauthgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteAuthGrant:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e902dd5d310e73fc4e7885b74cf1428f");
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
    setdel_group1428fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtebcb8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtebcb8?.isDisabled==null)
      {
        setdelete_heading_txtebcb8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_127efe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_127efe?.isDisabled==null)
      {
        setdel_divider_127efe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("authority_grant_id_text")){
        setauthority_grant_id_text79504((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_grant_id_text79504?.isDisabled==null)
      {
        setauthority_grant_id_text79504((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("authority_grant_id")){
        setauthority_grant_id84597((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_grant_id84597?.isDisabled==null)
      {
        setauthority_grant_id84597((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grant_code_text")){
        setgrant_code_text94baa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grant_code_text94baa?.isDisabled==null)
      {
        setgrant_code_text94baa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grant_code")){
        setgrant_code8a454((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grant_code8a454?.isDisabled==null)
      {
        setgrant_code8a454((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_amount_per_txn_text")){
        setmax_amount_per_txn_textec183((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(max_amount_per_txn_textec183?.isDisabled==null)
      {
        setmax_amount_per_txn_textec183((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_amount_per_txn")){
        setmax_amount_per_txnd3f90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(max_amount_per_txnd3f90?.isDisabled==null)
      {
        setmax_amount_per_txnd3f90((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency_text")){
        setcurrency_text0fee1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(currency_text0fee1?.isDisabled==null)
      {
        setcurrency_text0fee1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency")){
        setcurrencye5d71((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(currencye5d71?.isDisabled==null)
      {
        setcurrencye5d71((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revocation_reason_text")){
        setrevocation_reason_texte522e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revocation_reason_texte522e?.isDisabled==null)
      {
        setrevocation_reason_texte522e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revocation_reason")){
        setrevocation_reasonb4abb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revocation_reasonb4abb?.isDisabled==null)
      {
        setrevocation_reasonb4abb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("statust_text")){
        setstatust_textcc6bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(statust_textcc6bd?.isDisabled==null)
      {
        setstatust_textcc6bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus66a0b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status66a0b?.isDisabled==null)
      {
        setstatus66a0b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext6cc24((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text6cc24?.isDisabled==null)
      {
        settext6cc24((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_28ee76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_28ee76?.isDisabled==null)
      {
        setdel_divider_28ee76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn6d001((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn6d001?.isDisabled==null)
      {
        setdel_cancel_btn6d001((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn256dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn256dd?.isDisabled==null)
      {
        setdel_okl_btn256dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group1428f,
        codeStates['setdel_group'] = setdel_group1428f,
        codeStates['del_group1428f'] = del_group1428fProps,
        codeStates['setdel_group1428f'] = setdel_group1428fProps,
        codeStates['delete_heading_txt'] = delete_heading_txtebcb8,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtebcb8,
        codeStates['del_divider_1'] = del_divider_127efe,
        codeStates['setdel_divider_1'] = setdel_divider_127efe,
        codeStates['authority_grant_id_text'] = authority_grant_id_text79504,
        codeStates['setauthority_grant_id_text'] = setauthority_grant_id_text79504,
        codeStates['authority_grant_id'] = authority_grant_id84597,
        codeStates['setauthority_grant_id'] = setauthority_grant_id84597,
        codeStates['grant_code_text'] = grant_code_text94baa,
        codeStates['setgrant_code_text'] = setgrant_code_text94baa,
        codeStates['grant_code'] = grant_code8a454,
        codeStates['setgrant_code'] = setgrant_code8a454,
        codeStates['max_amount_per_txn_text'] = max_amount_per_txn_textec183,
        codeStates['setmax_amount_per_txn_text'] = setmax_amount_per_txn_textec183,
        codeStates['max_amount_per_txn'] = max_amount_per_txnd3f90,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txnd3f90,
        codeStates['currency_text'] = currency_text0fee1,
        codeStates['setcurrency_text'] = setcurrency_text0fee1,
        codeStates['currency'] = currencye5d71,
        codeStates['setcurrency'] = setcurrencye5d71,
        codeStates['revocation_reason_text'] = revocation_reason_texte522e,
        codeStates['setrevocation_reason_text'] = setrevocation_reason_texte522e,
        codeStates['revocation_reason'] = revocation_reasonb4abb,
        codeStates['setrevocation_reason'] = setrevocation_reasonb4abb,
        codeStates['statust_text'] = statust_textcc6bd,
        codeStates['setstatust_text'] = setstatust_textcc6bd,
        codeStates['status'] = status66a0b,
        codeStates['setstatus'] = setstatus66a0b,
        codeStates['text'] = text6cc24,
        codeStates['settext'] = settext6cc24,
        codeStates['del_divider_2'] = del_divider_28ee76,
        codeStates['setdel_divider_2'] = setdel_divider_28ee76,
        codeStates['del_cancel_btn'] = del_cancel_btn6d001,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn6d001,
        codeStates['del_okl_btn'] = del_okl_btn256dd,
        codeStates['setdel_okl_btn'] = setdel_okl_btn256dd,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e902dd5d310e73fc4e7885b74cf1428f");
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
        codeStates['del_group'] = del_group1428f,
        codeStates['setdel_group'] = setdel_group1428f,
        codeStates['del_group1428f'] = del_group1428fProps,
        codeStates['setdel_group1428f'] = setdel_group1428fProps,
        codeStates['delete_heading_txt'] = delete_heading_txtebcb8,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtebcb8,
        codeStates['del_divider_1'] = del_divider_127efe,
        codeStates['setdel_divider_1'] = setdel_divider_127efe,
        codeStates['authority_grant_id_text'] = authority_grant_id_text79504,
        codeStates['setauthority_grant_id_text'] = setauthority_grant_id_text79504,
        codeStates['authority_grant_id'] = authority_grant_id84597,
        codeStates['setauthority_grant_id'] = setauthority_grant_id84597,
        codeStates['grant_code_text'] = grant_code_text94baa,
        codeStates['setgrant_code_text'] = setgrant_code_text94baa,
        codeStates['grant_code'] = grant_code8a454,
        codeStates['setgrant_code'] = setgrant_code8a454,
        codeStates['max_amount_per_txn_text'] = max_amount_per_txn_textec183,
        codeStates['setmax_amount_per_txn_text'] = setmax_amount_per_txn_textec183,
        codeStates['max_amount_per_txn'] = max_amount_per_txnd3f90,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txnd3f90,
        codeStates['currency_text'] = currency_text0fee1,
        codeStates['setcurrency_text'] = setcurrency_text0fee1,
        codeStates['currency'] = currencye5d71,
        codeStates['setcurrency'] = setcurrencye5d71,
        codeStates['revocation_reason_text'] = revocation_reason_texte522e,
        codeStates['setrevocation_reason_text'] = setrevocation_reason_texte522e,
        codeStates['revocation_reason'] = revocation_reasonb4abb,
        codeStates['setrevocation_reason'] = setrevocation_reasonb4abb,
        codeStates['statust_text'] = statust_textcc6bd,
        codeStates['setstatust_text'] = setstatust_textcc6bd,
        codeStates['status'] = status66a0b,
        codeStates['setstatus'] = setstatus66a0b,
        codeStates['text'] = text6cc24,
        codeStates['settext'] = settext6cc24,
        codeStates['del_divider_2'] = del_divider_28ee76,
        codeStates['setdel_divider_2'] = setdel_divider_28ee76,
        codeStates['del_cancel_btn'] = del_cancel_btn6d001,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn6d001,
        codeStates['del_okl_btn'] = del_okl_btn256dd,
        codeStates['setdel_okl_btn'] = setdel_okl_btn256dd,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group1428fRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_group1428fRef.current?.setSearchParams();
    del_group1428fRef.current?.handleSearch({});
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
        !Array.isArray(del_group1428f) &&
        Object.keys(del_group1428f)?.length > 0
      ) {
        setdel_group1428f({})
        setdel_group1428fProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [del_group1428fProps?.refresh])


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
        gridRow: '1 / 67',
      
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
          setdeleteauthgrant_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* ebcb8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 27efe */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("authority_grant_id_text") ?<Textauthority_grant_id_text   /* 79504 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("authority_grant_id") ?<Textauthority_grant_id   /* 84597 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grant_code_text") ?<Textgrant_code_text   /* 94baa */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grant_code") ?<Textgrant_code   /* 8a454 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("max_amount_per_txn_text") ?<Textmax_amount_per_txn_text   /* ec183 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("max_amount_per_txn") ?<Textmax_amount_per_txn   /* d3f90 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("currency_text") ?<Textcurrency_text   /* 0fee1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("currency") ?<Textcurrency   /* e5d71 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("revocation_reason_text") ?<Textrevocation_reason_text   /* e522e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("revocation_reason") ?<Textrevocation_reason   /* b4abb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("statust_text") ?<Textstatust_text   /* cc6bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status") ?<Textstatus   /* 66a0b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 6cc24 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 8ee76 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
