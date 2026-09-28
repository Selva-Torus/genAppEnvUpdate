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
import Tablepending_review_table  from './Tablepending_review_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouppending_review_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const securityData:any={};
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
  const {possible_duplicate_groupbf3b4, setpossible_duplicate_groupbf3b4}= useContext(TotalContext) as TotalContextProps;
  const {possible_duplicate_groupbf3b4Props, setpossible_duplicate_groupbf3b4Props}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267, setrejecte_on_ingest_group81267}= useContext(TotalContext) as TotalContextProps;
  const {rejecte_on_ingest_group81267Props, setrejecte_on_ingest_group81267Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8e, setpending_review_groupe9d8e}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_groupe9d8eProps, setpending_review_groupe9d8eProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7d, setpending_review_table3db7d}= useContext(TotalContext) as TotalContextProps;
  const {pending_review_table3db7dProps, setpending_review_table3db7dProps}= useContext(TotalContext) as TotalContextProps;
  const {proposed_name287c5, setproposed_name287c5}= useContext(TotalContext) as TotalContextProps;
  const {external_reference00717, setexternal_reference00717}= useContext(TotalContext) as TotalContextProps;
  const {source_code20b9d, setsource_code20b9d}= useContext(TotalContext) as TotalContextProps;
  const {proposed_type_code5f02c, setproposed_type_code5f02c}= useContext(TotalContext) as TotalContextProps;
  const {suggested_unitf5899, setsuggested_unitf5899}= useContext(TotalContext) as TotalContextProps;
  const {match_status_code1d8ad, setmatch_status_code1d8ad}= useContext(TotalContext) as TotalContextProps;
  const {confirmfd7d5, setconfirmfd7d5}= useContext(TotalContext) as TotalContextProps;
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
    'GroupPendingReviewTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2d28d03321f44bde92c0df9bdb83db7d");
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
    setpending_review_table3db7dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("proposed_name")){
        setproposed_name287c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(proposed_name287c5?.isDisabled==null)
      {
        setproposed_name287c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("external_reference")){
        setexternal_reference00717((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(external_reference00717?.isDisabled==null)
      {
        setexternal_reference00717((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_code")){
        setsource_code20b9d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_code20b9d?.isDisabled==null)
      {
        setsource_code20b9d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("proposed_type_code")){
        setproposed_type_code5f02c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(proposed_type_code5f02c?.isDisabled==null)
      {
        setproposed_type_code5f02c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("suggested_unit")){
        setsuggested_unitf5899((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(suggested_unitf5899?.isDisabled==null)
      {
        setsuggested_unitf5899((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("match_status_code")){
        setmatch_status_code1d8ad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(match_status_code1d8ad?.isDisabled==null)
      {
        setmatch_status_code1d8ad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confirm")){
        setconfirmfd7d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(confirmfd7d5?.isDisabled==null)
      {
        setconfirmfd7d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2d28d03321f44bde92c0df9bdb83db7d");
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
        codeStates['proposed_name'] = proposed_name287c5,
        codeStates['setproposed_name'] = setproposed_name287c5,
        codeStates['external_reference'] = external_reference00717,
        codeStates['setexternal_reference'] = setexternal_reference00717,
        codeStates['source_code'] = source_code20b9d,
        codeStates['setsource_code'] = setsource_code20b9d,
        codeStates['proposed_type_code'] = proposed_type_code5f02c,
        codeStates['setproposed_type_code'] = setproposed_type_code5f02c,
        codeStates['suggested_unit'] = suggested_unitf5899,
        codeStates['setsuggested_unit'] = setsuggested_unitf5899,
        codeStates['match_status_code'] = match_status_code1d8ad,
        codeStates['setmatch_status_code'] = setmatch_status_code1d8ad,
        codeStates['confirm'] = confirmfd7d5,
        codeStates['setconfirm'] = setconfirmfd7d5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const pending_review_table3db7dRef = useRef<any>(null);
  const handleClearSearch = () => {
    pending_review_table3db7dRef.current?.setSearchParams();
    pending_review_table3db7dRef.current?.handleSearch({});
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
        !Array.isArray(pending_review_table3db7d) &&
        Object.keys(pending_review_table3db7d)?.length > 0
      ) {
        setpending_review_table3db7d({})
      }
    } else prevRefreshRef.current = true
  }, [pending_review_table3db7dProps?.refresh])


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
        gridRow: '8 / 114',
      
        //rowGap: '0px',
        overflow: 'visible',
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
          setdiscoveryqueue_v1((pre:any)=>({...pre,_selectedGroup_:"pending_review_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablepending_review_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={pending_review_table3db7dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouppending_review_table
