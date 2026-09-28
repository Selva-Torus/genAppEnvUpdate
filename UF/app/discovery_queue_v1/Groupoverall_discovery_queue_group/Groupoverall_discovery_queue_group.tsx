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
import Groupdiscovery_queue_text_group  from "../Groupdiscovery_queue_text_group/Groupdiscovery_queue_text_group";
import Groupawaiting_review_group  from "../Groupawaiting_review_group/Groupawaiting_review_group";
import Grouppossible_duplicate_group  from "../Grouppossible_duplicate_group/Grouppossible_duplicate_group";
import Grouprejecte_on_ingest_group  from "../Grouprejecte_on_ingest_group/Grouprejecte_on_ingest_group";
import Grouppending_review_group  from "../Grouppending_review_group/Grouppending_review_group";
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
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonrun_connectors_now_button  from "./Buttonrun_connectors_now_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_discovery_queue_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_discoveryqueue_v1Props, setdfd_discoveryqueue_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_discoveryqueuecards_v1Props, setdfd_discoveryqueuecards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "run_connectors_now_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_discovery_queue_group",
      "discovery_queue_text_group",
      "awaiting_review_group",
      "possible_duplicate_group",
      "rejecte_on_ingest_group",
      "pending_review_group",
      "pending_review_table"
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
  const {overall_discovery_queue_groupad3a5, setoverall_discovery_queue_groupad3a5}= useContext(TotalContext) as TotalContextProps;
  const {overall_discovery_queue_groupad3a5Props, setoverall_discovery_queue_groupad3a5Props}= useContext(TotalContext) as TotalContextProps;
  const {discovery_queue_text_group9da41, setdiscovery_queue_text_group9da41}= useContext(TotalContext) as TotalContextProps;
  const {discovery_queue_text_group9da41Props, setdiscovery_queue_text_group9da41Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button8e89d, setrefresh_button8e89d}= useContext(TotalContext) as TotalContextProps;
  const {run_connectors_now_buttonea7af, setrun_connectors_now_buttonea7af}= useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294c, setawaiting_review_groupb294c}= useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294cProps, setawaiting_review_groupb294cProps}= useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4, setpossible_duplicate_groupbf3b4}= useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4Props, setpossible_duplicate_groupbf3b4Props}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267, setrejecte_on_ingest_group81267}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267Props, setrejecte_on_ingest_group81267Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8e, setpending_review_groupe9d8e}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8eProps, setpending_review_groupe9d8eProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7d, setpending_review_table3db7d}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7dProps, setpending_review_table3db7dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {discoveryqueue_v1, setdiscoveryqueue_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1',
    [user],
    'GroupOverallDiscoveryQueueGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "92d660bf5bb34fe6860f3a2f109ad3a5");
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
    setoverall_discovery_queue_groupad3a5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("discovery_queue_text_group")){
        setdiscovery_queue_text_group9da41((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_queue_text_group9da41?.isDisabled==null)
      {
        setdiscovery_queue_text_group9da41((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button8e89d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button8e89d?.isDisabled==null)
      {
        setrefresh_button8e89d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_connectors_now_button")){
        setrun_connectors_now_buttonea7af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_connectors_now_buttonea7af?.isDisabled==null)
      {
        setrun_connectors_now_buttonea7af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("awaiting_review_group")){
        setawaiting_review_groupb294c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(awaiting_review_groupb294c?.isDisabled==null)
      {
        setawaiting_review_groupb294c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("possible_duplicate_group")){
        setpossible_duplicate_groupbf3b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(possible_duplicate_groupbf3b4?.isDisabled==null)
      {
        setpossible_duplicate_groupbf3b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rejecte_on_ingest_group")){
        setrejecte_on_ingest_group81267((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rejecte_on_ingest_group81267?.isDisabled==null)
      {
        setrejecte_on_ingest_group81267((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pending_review_group")){
        setpending_review_groupe9d8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(pending_review_groupe9d8e?.isDisabled==null)
      {
        setpending_review_groupe9d8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_discovery_queue_group'] = overall_discovery_queue_groupad3a5,
        codeStates['setoverall_discovery_queue_group'] = setoverall_discovery_queue_groupad3a5,
        codeStates['overall_discovery_queue_groupad3a5'] = overall_discovery_queue_groupad3a5Props,
        codeStates['setoverall_discovery_queue_groupad3a5'] = setoverall_discovery_queue_groupad3a5Props,
        codeStates['discovery_queue_text_group'] = discovery_queue_text_group9da41,
        codeStates['setdiscovery_queue_text_group'] = setdiscovery_queue_text_group9da41,
        codeStates['discovery_queue_text_group9da41'] = discovery_queue_text_group9da41Props,
        codeStates['setdiscovery_queue_text_group9da41'] = setdiscovery_queue_text_group9da41Props,
        codeStates['refresh_button'] = refresh_button8e89d,
        codeStates['setrefresh_button'] = setrefresh_button8e89d,
        codeStates['run_connectors_now_button'] = run_connectors_now_buttonea7af,
        codeStates['setrun_connectors_now_button'] = setrun_connectors_now_buttonea7af,
        codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
        codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
        codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
        codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
        codeStates['possible_duplicate_group'] = possible_duplicate_groupbf3b4,
        codeStates['setpossible_duplicate_group'] = setpossible_duplicate_groupbf3b4,
        codeStates['possible_duplicate_groupbf3b4'] = possible_duplicate_groupbf3b4Props,
        codeStates['setpossible_duplicate_groupbf3b4'] = setpossible_duplicate_groupbf3b4Props,
        codeStates['rejecte_on_ingest_group'] = rejecte_on_ingest_group81267,
        codeStates['setrejecte_on_ingest_group'] = setrejecte_on_ingest_group81267,
        codeStates['rejecte_on_ingest_group81267'] = rejecte_on_ingest_group81267Props,
        codeStates['setrejecte_on_ingest_group81267'] = setrejecte_on_ingest_group81267Props,
        codeStates['pending_review_group'] = pending_review_groupe9d8e,
        codeStates['setpending_review_group'] = setpending_review_groupe9d8e,
        codeStates['pending_review_groupe9d8e'] = pending_review_groupe9d8eProps,
        codeStates['setpending_review_groupe9d8e'] = setpending_review_groupe9d8eProps,
        codeStates['pending_review_table'] = pending_review_table3db7d,
        codeStates['setpending_review_table'] = setpending_review_table3db7d,
        codeStates['pending_review_table3db7d'] = pending_review_table3db7dProps,
        codeStates['setpending_review_table3db7d'] = setpending_review_table3db7dProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "92d660bf5bb34fe6860f3a2f109ad3a5");
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
        codeStates['overall_discovery_queue_group'] = overall_discovery_queue_groupad3a5,
        codeStates['setoverall_discovery_queue_group'] = setoverall_discovery_queue_groupad3a5,
        codeStates['overall_discovery_queue_groupad3a5'] = overall_discovery_queue_groupad3a5Props,
        codeStates['setoverall_discovery_queue_groupad3a5'] = setoverall_discovery_queue_groupad3a5Props,
        codeStates['discovery_queue_text_group'] = discovery_queue_text_group9da41,
        codeStates['setdiscovery_queue_text_group'] = setdiscovery_queue_text_group9da41,
        codeStates['discovery_queue_text_group9da41'] = discovery_queue_text_group9da41Props,
        codeStates['setdiscovery_queue_text_group9da41'] = setdiscovery_queue_text_group9da41Props,
        codeStates['refresh_button'] = refresh_button8e89d,
        codeStates['setrefresh_button'] = setrefresh_button8e89d,
        codeStates['run_connectors_now_button'] = run_connectors_now_buttonea7af,
        codeStates['setrun_connectors_now_button'] = setrun_connectors_now_buttonea7af,
        codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
        codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
        codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
        codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
        codeStates['possible_duplicate_group'] = possible_duplicate_groupbf3b4,
        codeStates['setpossible_duplicate_group'] = setpossible_duplicate_groupbf3b4,
        codeStates['possible_duplicate_groupbf3b4'] = possible_duplicate_groupbf3b4Props,
        codeStates['setpossible_duplicate_groupbf3b4'] = setpossible_duplicate_groupbf3b4Props,
        codeStates['rejecte_on_ingest_group'] = rejecte_on_ingest_group81267,
        codeStates['setrejecte_on_ingest_group'] = setrejecte_on_ingest_group81267,
        codeStates['rejecte_on_ingest_group81267'] = rejecte_on_ingest_group81267Props,
        codeStates['setrejecte_on_ingest_group81267'] = setrejecte_on_ingest_group81267Props,
        codeStates['pending_review_group'] = pending_review_groupe9d8e,
        codeStates['setpending_review_group'] = setpending_review_groupe9d8e,
        codeStates['pending_review_groupe9d8e'] = pending_review_groupe9d8eProps,
        codeStates['setpending_review_groupe9d8e'] = setpending_review_groupe9d8eProps,
        codeStates['pending_review_table'] = pending_review_table3db7d,
        codeStates['setpending_review_table'] = setpending_review_table3db7d,
        codeStates['pending_review_table3db7d'] = pending_review_table3db7dProps,
        codeStates['setpending_review_table3db7d'] = setpending_review_table3db7dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_discovery_queue_groupad3a5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_discovery_queue_groupad3a5Ref.current?.setSearchParams();
    overall_discovery_queue_groupad3a5Ref.current?.handleSearch({});
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
        !Array.isArray(overall_discovery_queue_groupad3a5) &&
        Object.keys(overall_discovery_queue_groupad3a5)?.length > 0
      ) {
        setoverall_discovery_queue_groupad3a5({})
      }
    } else prevRefreshRef.current = true
  }, [overall_discovery_queue_groupad3a5Props?.refresh])


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
        gridRow: '1 / 154',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdiscoveryqueue_v1((pre:any)=>({...pre,_selectedGroup_:"overall_discovery_queue_group"}))
        }}
    >
        {allowedComponent.includes("discovery_queue_text_group")  &&<Groupdiscovery_queue_text_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("awaiting_review_group")  &&<Groupawaiting_review_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("possible_duplicate_group")  &&<Grouppossible_duplicate_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("rejecte_on_ingest_group")  &&<Grouprejecte_on_ingest_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("pending_review_group")  &&<Grouppending_review_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "run_connectors_now_button" in ButtonGoRuleData)?ButtonGoRuleData["run_connectors_now_button"]:true) && 
          allowedControls.includes("run_connectors_now_button")  ?            <Buttonrun_connectors_now_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupoverall_discovery_queue_group
