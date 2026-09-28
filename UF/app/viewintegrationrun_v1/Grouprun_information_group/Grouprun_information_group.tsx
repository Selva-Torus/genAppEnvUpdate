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
import Textrun_information_text  from "./Textrun_information_text";
import TextInputintegration_sorce  from "./TextInputintegration_sorce";
import TextInputrun_trigger_code  from "./TextInputrun_trigger_code";
import TextInputtriggered_by  from "./TextInputtriggered_by";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprun_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "run_information_text",
      "integration_sorce",
      "run_trigger_code",
      "triggered_by"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group"
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
  const {inegration_run_groupaf8be, setinegration_run_groupaf8be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupaf8beProps, setinegration_run_groupaf8beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48, setrun_information_group6fd48}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48Props, setrun_information_group6fd48Props}= useContext(TotalContext) as TotalContextProps;
  const {run_information_text4cb4a, setrun_information_text4cb4a}= useContext(TotalContext) as TotalContextProps;
  const {integration_sorcecc941, setintegration_sorcecc941}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_code27359, setrun_trigger_code27359}= useContext(TotalContext) as TotalContextProps;
  const {triggered_by41ed2, settriggered_by41ed2}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220c, settimeandstatus_groupb220c}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220cProps, settimeandstatus_groupb220cProps}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184, setrecord_groupdb184}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184Props, setrecord_groupdb184Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbc, seterror_group9bfbc}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbcProps, seterror_group9bfbcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewintegrationrun_v1, setviewintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationRun:AFVK:v1',
    [user],
    'GroupRunInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8cb54e4f441a457784c1d2b17ee6fd48");
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
    setrun_information_group6fd48Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("run_information_text")){
        setrun_information_text4cb4a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_information_text4cb4a?.isDisabled==null)
      {
        setrun_information_text4cb4a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_sorce")){
        setintegration_sorcecc941((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_sorcecc941?.isDisabled==null)
      {
        setintegration_sorcecc941((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_trigger_code")){
        setrun_trigger_code27359((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_trigger_code27359?.isDisabled==null)
      {
        setrun_trigger_code27359((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("triggered_by")){
        settriggered_by41ed2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(triggered_by41ed2?.isDisabled==null)
      {
        settriggered_by41ed2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['inegration_run_group'] = inegration_run_groupaf8be,
        codeStates['setinegration_run_group'] = setinegration_run_groupaf8be,
        codeStates['inegration_run_groupaf8be'] = inegration_run_groupaf8beProps,
        codeStates['setinegration_run_groupaf8be'] = setinegration_run_groupaf8beProps,
        codeStates['run_information_group'] = run_information_group6fd48,
        codeStates['setrun_information_group'] = setrun_information_group6fd48,
        codeStates['run_information_group6fd48'] = run_information_group6fd48Props,
        codeStates['setrun_information_group6fd48'] = setrun_information_group6fd48Props,
        codeStates['run_information_text'] = run_information_text4cb4a,
        codeStates['setrun_information_text'] = setrun_information_text4cb4a,
        codeStates['integration_sorce'] = integration_sorcecc941,
        codeStates['setintegration_sorce'] = setintegration_sorcecc941,
        codeStates['run_trigger_code'] = run_trigger_code27359,
        codeStates['setrun_trigger_code'] = setrun_trigger_code27359,
        codeStates['triggered_by'] = triggered_by41ed2,
        codeStates['settriggered_by'] = settriggered_by41ed2,
        codeStates['timeandstatus_group'] = timeandstatus_groupb220c,
        codeStates['settimeandstatus_group'] = settimeandstatus_groupb220c,
        codeStates['timeandstatus_groupb220c'] = timeandstatus_groupb220cProps,
        codeStates['settimeandstatus_groupb220c'] = settimeandstatus_groupb220cProps,
        codeStates['record_group'] = record_groupdb184,
        codeStates['setrecord_group'] = setrecord_groupdb184,
        codeStates['record_groupdb184'] = record_groupdb184Props,
        codeStates['setrecord_groupdb184'] = setrecord_groupdb184Props,
        codeStates['error_group'] = error_group9bfbc,
        codeStates['seterror_group'] = seterror_group9bfbc,
        codeStates['error_group9bfbc'] = error_group9bfbcProps,
        codeStates['seterror_group9bfbc'] = seterror_group9bfbcProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8cb54e4f441a457784c1d2b17ee6fd48");
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
        codeStates['inegration_run_group'] = inegration_run_groupaf8be,
        codeStates['setinegration_run_group'] = setinegration_run_groupaf8be,
        codeStates['inegration_run_groupaf8be'] = inegration_run_groupaf8beProps,
        codeStates['setinegration_run_groupaf8be'] = setinegration_run_groupaf8beProps,
        codeStates['run_information_group'] = run_information_group6fd48,
        codeStates['setrun_information_group'] = setrun_information_group6fd48,
        codeStates['run_information_group6fd48'] = run_information_group6fd48Props,
        codeStates['setrun_information_group6fd48'] = setrun_information_group6fd48Props,
        codeStates['run_information_text'] = run_information_text4cb4a,
        codeStates['setrun_information_text'] = setrun_information_text4cb4a,
        codeStates['integration_sorce'] = integration_sorcecc941,
        codeStates['setintegration_sorce'] = setintegration_sorcecc941,
        codeStates['run_trigger_code'] = run_trigger_code27359,
        codeStates['setrun_trigger_code'] = setrun_trigger_code27359,
        codeStates['triggered_by'] = triggered_by41ed2,
        codeStates['settriggered_by'] = settriggered_by41ed2,
        codeStates['timeandstatus_group'] = timeandstatus_groupb220c,
        codeStates['settimeandstatus_group'] = settimeandstatus_groupb220c,
        codeStates['timeandstatus_groupb220c'] = timeandstatus_groupb220cProps,
        codeStates['settimeandstatus_groupb220c'] = settimeandstatus_groupb220cProps,
        codeStates['record_group'] = record_groupdb184,
        codeStates['setrecord_group'] = setrecord_groupdb184,
        codeStates['record_groupdb184'] = record_groupdb184Props,
        codeStates['setrecord_groupdb184'] = setrecord_groupdb184Props,
        codeStates['error_group'] = error_group9bfbc,
        codeStates['seterror_group'] = seterror_group9bfbc,
        codeStates['error_group9bfbc'] = error_group9bfbcProps,
        codeStates['seterror_group9bfbc'] = seterror_group9bfbcProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const run_information_group6fd48Ref = useRef<any>(null);
  const handleClearSearch = () => {
    run_information_group6fd48Ref.current?.setSearchParams();
    run_information_group6fd48Ref.current?.handleSearch({});
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
        !Array.isArray(run_information_group6fd48) &&
        Object.keys(run_information_group6fd48)?.length > 0
      ) {
        setrun_information_group6fd48({})
      }
    } else prevRefreshRef.current = true
  }, [run_information_group6fd48Props?.refresh])


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
        gridColumn: '1 / 15',
        gridRow: '2 / 49',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#ffffff',
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
          setviewintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"run_information_group"}))
        }}
    >
          {allowedControls.includes("run_information_text") ?<Textrun_information_text   /* 4cb4a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("integration_sorce") ?<TextInputintegration_sorce   /* cc941 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("run_trigger_code") ?<TextInputrun_trigger_code   /* 27359 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("triggered_by") ?<TextInputtriggered_by   /* 41ed2 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprun_information_group
