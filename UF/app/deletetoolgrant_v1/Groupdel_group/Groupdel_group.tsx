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
import Texttool_grant_id  from "./Texttool_grant_id";
import Textagent_name_text  from "./Textagent_name_text";
import Textasset_name  from "./Textasset_name";
import Texttoo_operation_text  from "./Texttoo_operation_text";
import Texttool_operation  from "./Texttool_operation";
import Textaccess_mode_text  from "./Textaccess_mode_text";
import Textaccess_mode  from "./Textaccess_mode";
import Textststus_txt  from "./Textststus_txt";
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
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
      "asset_name_text",
      "tool_grant_id",
      "agent_name_text",
      "asset_name",
      "too_operation_text",
      "tool_operation",
      "access_mode_text",
      "access_mode",
      "ststus_txt",
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
  const {del_groupbb7f0, setdel_groupbb7f0}= useContext(TotalContext) as TotalContextProps;
  const {del_groupbb7f0Props, setdel_groupbb7f0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8b, setdelete_heading_txt26f8b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1c0da3, setdel_divider_1c0da3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textfb333, setasset_name_textfb333}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4, settool_grant_id281e4}= useContext(TotalContext) as TotalContextProps;
  const {agent_name_text71756, setagent_name_text71756}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5c40e, setasset_name5c40e}= useContext(TotalContext) as TotalContextProps;
  const {too_operation_texte0dbf, settoo_operation_texte0dbf}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation03227, settool_operation03227}= useContext(TotalContext) as TotalContextProps;
  const {access_mode_text74d1f, setaccess_mode_text74d1f}= useContext(TotalContext) as TotalContextProps;
  const {access_mode763de, setaccess_mode763de}= useContext(TotalContext) as TotalContextProps;
  const {ststus_txt329f4, setststus_txt329f4}= useContext(TotalContext) as TotalContextProps;
  const {status659a7, setstatus659a7}= useContext(TotalContext) as TotalContextProps;
  const {textb6666, settextb6666}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_27f134, setdel_divider_27f134}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn3e3af, setdel_cancel_btn3e3af}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnbeefc, setdel_okl_btnbeefc}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletetoolgrant_v1, setdeletetoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteToolGrant:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "05d5ea796b25cc795e0e6fd72c1bb7f0");
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
    setdel_groupbb7f0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt26f8b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt26f8b?.isDisabled==null)
      {
        setdelete_heading_txt26f8b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1c0da3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1c0da3?.isDisabled==null)
      {
        setdel_divider_1c0da3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textfb333((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_textfb333?.isDisabled==null)
      {
        setasset_name_textfb333((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant_id")){
        settool_grant_id281e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_grant_id281e4?.isDisabled==null)
      {
        settool_grant_id281e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_name_text")){
        setagent_name_text71756((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_name_text71756?.isDisabled==null)
      {
        setagent_name_text71756((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name5c40e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name5c40e?.isDisabled==null)
      {
        setasset_name5c40e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("too_operation_text")){
        settoo_operation_texte0dbf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(too_operation_texte0dbf?.isDisabled==null)
      {
        settoo_operation_texte0dbf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_operation")){
        settool_operation03227((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_operation03227?.isDisabled==null)
      {
        settool_operation03227((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_mode_text")){
        setaccess_mode_text74d1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(access_mode_text74d1f?.isDisabled==null)
      {
        setaccess_mode_text74d1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_mode")){
        setaccess_mode763de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(access_mode763de?.isDisabled==null)
      {
        setaccess_mode763de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ststus_txt")){
        setststus_txt329f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ststus_txt329f4?.isDisabled==null)
      {
        setststus_txt329f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus659a7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status659a7?.isDisabled==null)
      {
        setstatus659a7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextb6666((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textb6666?.isDisabled==null)
      {
        settextb6666((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_27f134((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_27f134?.isDisabled==null)
      {
        setdel_divider_27f134((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn3e3af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn3e3af?.isDisabled==null)
      {
        setdel_cancel_btn3e3af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btnbeefc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btnbeefc?.isDisabled==null)
      {
        setdel_okl_btnbeefc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_groupbb7f0,
        codeStates['setdel_group'] = setdel_groupbb7f0,
        codeStates['del_groupbb7f0'] = del_groupbb7f0Props,
        codeStates['setdel_groupbb7f0'] = setdel_groupbb7f0Props,
        codeStates['delete_heading_txt'] = delete_heading_txt26f8b,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt26f8b,
        codeStates['del_divider_1'] = del_divider_1c0da3,
        codeStates['setdel_divider_1'] = setdel_divider_1c0da3,
        codeStates['asset_name_text'] = asset_name_textfb333,
        codeStates['setasset_name_text'] = setasset_name_textfb333,
        codeStates['tool_grant_id'] = tool_grant_id281e4,
        codeStates['settool_grant_id'] = settool_grant_id281e4,
        codeStates['agent_name_text'] = agent_name_text71756,
        codeStates['setagent_name_text'] = setagent_name_text71756,
        codeStates['asset_name'] = asset_name5c40e,
        codeStates['setasset_name'] = setasset_name5c40e,
        codeStates['too_operation_text'] = too_operation_texte0dbf,
        codeStates['settoo_operation_text'] = settoo_operation_texte0dbf,
        codeStates['tool_operation'] = tool_operation03227,
        codeStates['settool_operation'] = settool_operation03227,
        codeStates['access_mode_text'] = access_mode_text74d1f,
        codeStates['setaccess_mode_text'] = setaccess_mode_text74d1f,
        codeStates['access_mode'] = access_mode763de,
        codeStates['setaccess_mode'] = setaccess_mode763de,
        codeStates['ststus_txt'] = ststus_txt329f4,
        codeStates['setststus_txt'] = setststus_txt329f4,
        codeStates['status'] = status659a7,
        codeStates['setstatus'] = setstatus659a7,
        codeStates['text'] = textb6666,
        codeStates['settext'] = settextb6666,
        codeStates['del_divider_2'] = del_divider_27f134,
        codeStates['setdel_divider_2'] = setdel_divider_27f134,
        codeStates['del_cancel_btn'] = del_cancel_btn3e3af,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn3e3af,
        codeStates['del_okl_btn'] = del_okl_btnbeefc,
        codeStates['setdel_okl_btn'] = setdel_okl_btnbeefc,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "05d5ea796b25cc795e0e6fd72c1bb7f0");
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
        codeStates['del_group'] = del_groupbb7f0,
        codeStates['setdel_group'] = setdel_groupbb7f0,
        codeStates['del_groupbb7f0'] = del_groupbb7f0Props,
        codeStates['setdel_groupbb7f0'] = setdel_groupbb7f0Props,
        codeStates['delete_heading_txt'] = delete_heading_txt26f8b,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt26f8b,
        codeStates['del_divider_1'] = del_divider_1c0da3,
        codeStates['setdel_divider_1'] = setdel_divider_1c0da3,
        codeStates['asset_name_text'] = asset_name_textfb333,
        codeStates['setasset_name_text'] = setasset_name_textfb333,
        codeStates['tool_grant_id'] = tool_grant_id281e4,
        codeStates['settool_grant_id'] = settool_grant_id281e4,
        codeStates['agent_name_text'] = agent_name_text71756,
        codeStates['setagent_name_text'] = setagent_name_text71756,
        codeStates['asset_name'] = asset_name5c40e,
        codeStates['setasset_name'] = setasset_name5c40e,
        codeStates['too_operation_text'] = too_operation_texte0dbf,
        codeStates['settoo_operation_text'] = settoo_operation_texte0dbf,
        codeStates['tool_operation'] = tool_operation03227,
        codeStates['settool_operation'] = settool_operation03227,
        codeStates['access_mode_text'] = access_mode_text74d1f,
        codeStates['setaccess_mode_text'] = setaccess_mode_text74d1f,
        codeStates['access_mode'] = access_mode763de,
        codeStates['setaccess_mode'] = setaccess_mode763de,
        codeStates['ststus_txt'] = ststus_txt329f4,
        codeStates['setststus_txt'] = setststus_txt329f4,
        codeStates['status'] = status659a7,
        codeStates['setstatus'] = setstatus659a7,
        codeStates['text'] = textb6666,
        codeStates['settext'] = settextb6666,
        codeStates['del_divider_2'] = del_divider_27f134,
        codeStates['setdel_divider_2'] = setdel_divider_27f134,
        codeStates['del_cancel_btn'] = del_cancel_btn3e3af,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn3e3af,
        codeStates['del_okl_btn'] = del_okl_btnbeefc,
        codeStates['setdel_okl_btn'] = setdel_okl_btnbeefc,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_groupbb7f0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_groupbb7f0Ref.current?.setSearchParams();
    del_groupbb7f0Ref.current?.handleSearch({});
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
        !Array.isArray(del_groupbb7f0) &&
        Object.keys(del_groupbb7f0)?.length > 0
      ) {
        setdel_groupbb7f0({})
        setdel_groupbb7f0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [del_groupbb7f0Props?.refresh])


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
        gridRow: '1 / 59',
      
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
          setdeletetoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 26f8b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* c0da3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* fb333 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tool_grant_id") ?<Texttool_grant_id   /* 281e4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_name_text") ?<Textagent_name_text   /* 71756 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 5c40e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("too_operation_text") ?<Texttoo_operation_text   /* e0dbf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tool_operation") ?<Texttool_operation   /* 03227 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_mode_text") ?<Textaccess_mode_text   /* 74d1f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_mode") ?<Textaccess_mode   /* 763de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ststus_txt") ?<Textststus_txt   /* 329f4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status") ?<Textstatus   /* 659a7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* b6666 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 7f134 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
