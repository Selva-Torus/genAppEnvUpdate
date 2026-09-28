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
import Cardreview_status_code  from "./Cardreview_status_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupawaiting_review_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "review_status_code"
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
      "review_status_code"
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
      "review_status_code"
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
      "review_status_code"
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
      "review_status_code"
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
      "review_status_code"
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
      "review_status_code"
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
  const {awaiting_review_groupb294c, setawaiting_review_groupb294c}= useContext(TotalContext) as TotalContextProps;
  const {awaiting_review_groupb294cProps, setawaiting_review_groupb294cProps}= useContext(TotalContext) as TotalContextProps;
  const {review_status_code8db7b, setreview_status_code8db7b}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAwaitingReviewGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f0987b485817451da29d80a176db294c");
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
    setawaiting_review_groupb294cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("review_status_code")){
        setreview_status_code8db7b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(review_status_code8db7b?.isDisabled==null)
      {
        setreview_status_code8db7b((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
        codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
        codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
        codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
        codeStates['review_status_code'] = review_status_code8db7b,
        codeStates['setreview_status_code'] = setreview_status_code8db7b,
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f0987b485817451da29d80a176db294c");
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
        codeStates['awaiting_review_group'] = awaiting_review_groupb294c,
        codeStates['setawaiting_review_group'] = setawaiting_review_groupb294c,
        codeStates['awaiting_review_groupb294c'] = awaiting_review_groupb294cProps,
        codeStates['setawaiting_review_groupb294c'] = setawaiting_review_groupb294cProps,
        codeStates['review_status_code'] = review_status_code8db7b,
        codeStates['setreview_status_code'] = setreview_status_code8db7b,
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


  const awaiting_review_groupb294cRef = useRef<any>(null);
  const handleClearSearch = () => {
    awaiting_review_groupb294cRef.current?.setSearchParams();
    awaiting_review_groupb294cRef.current?.handleSearch({});
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
        !Array.isArray(awaiting_review_groupb294c) &&
        Object.keys(awaiting_review_groupb294c)?.length > 0
      ) {
        setawaiting_review_groupb294c({})
      }
    } else prevRefreshRef.current = true
  }, [awaiting_review_groupb294cProps?.refresh])


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
        gridColumn: '1 / 9',
        gridRow: '15 / 35',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdiscoveryqueue_v1((pre:any)=>({...pre,_selectedGroup_:"awaiting_review_group"}))
        }}
    >
        {allowedControls.includes("review_status_code") ?<Cardreview_status_code  /* 8db7b */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
    </div>
 )
}

export default Groupawaiting_review_group
