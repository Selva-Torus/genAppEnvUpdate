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
import Textagent_identity_ref_text  from "./Textagent_identity_ref_text";
import Textagent_identity_ref  from "./Textagent_identity_ref";
import Textidentity_provider_text  from "./Textidentity_provider_text";
import Textidentity_provider  from "./Textidentity_provider";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textagent_control_id  from "./Textagent_control_id";
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
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
      "agent_identity_ref_text",
      "agent_identity_ref",
      "identity_provider_text",
      "identity_provider",
      "text",
      "del_divider_2",
      "agent_control_id",
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
  const {del_group9b94a, setdel_group9b94a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9b94aProps, setdel_group9b94aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt85a72, setdelete_heading_txt85a72}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1a0820, setdel_divider_1a0820}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text203a8, setasset_name_text203a8}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee9a75, setasset_namee9a75}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref_texteb31d, setagent_identity_ref_texteb31d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref64e77, setagent_identity_ref64e77}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider_textc3f7e, setidentity_provider_textc3f7e}= useContext(TotalContext) as TotalContextProps;
  const {identity_providerd954f, setidentity_providerd954f}= useContext(TotalContext) as TotalContextProps;
  const {textf0a5f, settextf0a5f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eac8b, setdel_divider_2eac8b}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_idbe6d2, setagent_control_idbe6d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnc83c5, setdel_cancel_btnc83c5}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2a546, setdel_okl_btn2a546}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {agentdelete_v1, setagentdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:agentDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0ef0e970f5f736413b8a0c7e1539b94a");
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
    setdel_group9b94aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt85a72((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt85a72?.isDisabled==null)
      {
        setdelete_heading_txt85a72((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1a0820((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1a0820?.isDisabled==null)
      {
        setdel_divider_1a0820((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text203a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text203a8?.isDisabled==null)
      {
        setasset_name_text203a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namee9a75((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namee9a75?.isDisabled==null)
      {
        setasset_namee9a75((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_identity_ref_text")){
        setagent_identity_ref_texteb31d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_identity_ref_texteb31d?.isDisabled==null)
      {
        setagent_identity_ref_texteb31d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_identity_ref")){
        setagent_identity_ref64e77((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_identity_ref64e77?.isDisabled==null)
      {
        setagent_identity_ref64e77((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider_text")){
        setidentity_provider_textc3f7e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_provider_textc3f7e?.isDisabled==null)
      {
        setidentity_provider_textc3f7e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_providerd954f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_providerd954f?.isDisabled==null)
      {
        setidentity_providerd954f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextf0a5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textf0a5f?.isDisabled==null)
      {
        settextf0a5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_2eac8b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_2eac8b?.isDisabled==null)
      {
        setdel_divider_2eac8b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_control_id")){
        setagent_control_idbe6d2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_control_idbe6d2?.isDisabled==null)
      {
        setagent_control_idbe6d2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btnc83c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btnc83c5?.isDisabled==null)
      {
        setdel_cancel_btnc83c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn2a546((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn2a546?.isDisabled==null)
      {
        setdel_okl_btn2a546((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group9b94a,
        codeStates['setdel_group'] = setdel_group9b94a,
        codeStates['del_group9b94a'] = del_group9b94aProps,
        codeStates['setdel_group9b94a'] = setdel_group9b94aProps,
        codeStates['delete_heading_txt'] = delete_heading_txt85a72,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt85a72,
        codeStates['del_divider_1'] = del_divider_1a0820,
        codeStates['setdel_divider_1'] = setdel_divider_1a0820,
        codeStates['asset_name_text'] = asset_name_text203a8,
        codeStates['setasset_name_text'] = setasset_name_text203a8,
        codeStates['asset_name'] = asset_namee9a75,
        codeStates['setasset_name'] = setasset_namee9a75,
        codeStates['agent_identity_ref_text'] = agent_identity_ref_texteb31d,
        codeStates['setagent_identity_ref_text'] = setagent_identity_ref_texteb31d,
        codeStates['agent_identity_ref'] = agent_identity_ref64e77,
        codeStates['setagent_identity_ref'] = setagent_identity_ref64e77,
        codeStates['identity_provider_text'] = identity_provider_textc3f7e,
        codeStates['setidentity_provider_text'] = setidentity_provider_textc3f7e,
        codeStates['identity_provider'] = identity_providerd954f,
        codeStates['setidentity_provider'] = setidentity_providerd954f,
        codeStates['text'] = textf0a5f,
        codeStates['settext'] = settextf0a5f,
        codeStates['del_divider_2'] = del_divider_2eac8b,
        codeStates['setdel_divider_2'] = setdel_divider_2eac8b,
        codeStates['agent_control_id'] = agent_control_idbe6d2,
        codeStates['setagent_control_id'] = setagent_control_idbe6d2,
        codeStates['del_cancel_btn'] = del_cancel_btnc83c5,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnc83c5,
        codeStates['del_okl_btn'] = del_okl_btn2a546,
        codeStates['setdel_okl_btn'] = setdel_okl_btn2a546,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0ef0e970f5f736413b8a0c7e1539b94a");
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
        codeStates['del_group'] = del_group9b94a,
        codeStates['setdel_group'] = setdel_group9b94a,
        codeStates['del_group9b94a'] = del_group9b94aProps,
        codeStates['setdel_group9b94a'] = setdel_group9b94aProps,
        codeStates['delete_heading_txt'] = delete_heading_txt85a72,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt85a72,
        codeStates['del_divider_1'] = del_divider_1a0820,
        codeStates['setdel_divider_1'] = setdel_divider_1a0820,
        codeStates['asset_name_text'] = asset_name_text203a8,
        codeStates['setasset_name_text'] = setasset_name_text203a8,
        codeStates['asset_name'] = asset_namee9a75,
        codeStates['setasset_name'] = setasset_namee9a75,
        codeStates['agent_identity_ref_text'] = agent_identity_ref_texteb31d,
        codeStates['setagent_identity_ref_text'] = setagent_identity_ref_texteb31d,
        codeStates['agent_identity_ref'] = agent_identity_ref64e77,
        codeStates['setagent_identity_ref'] = setagent_identity_ref64e77,
        codeStates['identity_provider_text'] = identity_provider_textc3f7e,
        codeStates['setidentity_provider_text'] = setidentity_provider_textc3f7e,
        codeStates['identity_provider'] = identity_providerd954f,
        codeStates['setidentity_provider'] = setidentity_providerd954f,
        codeStates['text'] = textf0a5f,
        codeStates['settext'] = settextf0a5f,
        codeStates['del_divider_2'] = del_divider_2eac8b,
        codeStates['setdel_divider_2'] = setdel_divider_2eac8b,
        codeStates['agent_control_id'] = agent_control_idbe6d2,
        codeStates['setagent_control_id'] = setagent_control_idbe6d2,
        codeStates['del_cancel_btn'] = del_cancel_btnc83c5,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnc83c5,
        codeStates['del_okl_btn'] = del_okl_btn2a546,
        codeStates['setdel_okl_btn'] = setdel_okl_btn2a546,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group9b94aRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_group9b94aRef.current?.setSearchParams();
    del_group9b94aRef.current?.handleSearch({});
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
        !Array.isArray(del_group9b94a) &&
        Object.keys(del_group9b94a)?.length > 0
      ) {
        setdel_group9b94a({})
      }
    } else prevRefreshRef.current = true
  }, [del_group9b94aProps?.refresh])


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
        gridRow: '1 / 50',
      
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
          setagentdelete_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 85a72 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* a0820 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 203a8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* e9a75 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_identity_ref_text") ?<Textagent_identity_ref_text   /* eb31d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_identity_ref") ?<Textagent_identity_ref   /* 64e77 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("identity_provider_text") ?<Textidentity_provider_text   /* c3f7e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("identity_provider") ?<Textidentity_provider   /* d954f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* f0a5f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* eac8b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("agent_control_id") ?<Textagent_control_id   /* be6d2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
