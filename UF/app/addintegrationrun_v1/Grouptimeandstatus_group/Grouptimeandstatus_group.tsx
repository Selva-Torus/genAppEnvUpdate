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
import Texttiming_status  from "./Texttiming_status";
import DatePickerstarted_on  from "./DatePickerstarted_on";
import DatePickerended_on  from "./DatePickerended_on";
import Dropdownrun_status_code  from "./Dropdownrun_status_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptimeandstatus_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "timing_status",
      "started_on",
      "ended_on",
      "run_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group",
      "run_information_group",
      "timeandstatus_group",
      "record_group",
      "error_group",
      "dynamicactions"
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
  const {inegration_run_group5a7be, setinegration_run_group5a7be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_group5a7beProps, setinegration_run_group5a7beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {timing_status54aec, settiming_status54aec}= useContext(TotalContext) as TotalContextProps;
  const {started_ond88e8, setstarted_ond88e8}= useContext(TotalContext) as TotalContextProps;
  const {ended_on9cf0a, setended_on9cf0a}= useContext(TotalContext) as TotalContextProps;
  const {run_status_codef6fc6, setrun_status_codef6fc6}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addintegrationrun_v1, setaddintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationRun:AFVK:v1',
    [user],
    'GroupTimeandstatusGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "acb1b9ef22344e2899907659f179ec90");
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
    settimeandstatus_group9ec90Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("timing_status")){
        settiming_status54aec((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(timing_status54aec?.isDisabled==null)
      {
        settiming_status54aec((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("started_on")){
        setstarted_ond88e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(started_ond88e8?.isDisabled==null)
      {
        setstarted_ond88e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ended_on")){
        setended_on9cf0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ended_on9cf0a?.isDisabled==null)
      {
        setended_on9cf0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_status_code")){
        setrun_status_codef6fc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_status_codef6fc6?.isDisabled==null)
      {
        setrun_status_codef6fc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['inegration_run_group'] = inegration_run_group5a7be,
        codeStates['setinegration_run_group'] = setinegration_run_group5a7be,
        codeStates['inegration_run_group5a7be'] = inegration_run_group5a7beProps,
        codeStates['setinegration_run_group5a7be'] = setinegration_run_group5a7beProps,
        codeStates['run_information_group'] = run_information_group519a1,
        codeStates['setrun_information_group'] = setrun_information_group519a1,
        codeStates['run_information_group519a1'] = run_information_group519a1Props,
        codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
        codeStates['timing_status'] = timing_status54aec,
        codeStates['settiming_status'] = settiming_status54aec,
        codeStates['started_on'] = started_ond88e8,
        codeStates['setstarted_on'] = setstarted_ond88e8,
        codeStates['ended_on'] = ended_on9cf0a,
        codeStates['setended_on'] = setended_on9cf0a,
        codeStates['run_status_code'] = run_status_codef6fc6,
        codeStates['setrun_status_code'] = setrun_status_codef6fc6,
        codeStates['record_group'] = record_groupa6d32,
        codeStates['setrecord_group'] = setrecord_groupa6d32,
        codeStates['record_groupa6d32'] = record_groupa6d32Props,
        codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
        codeStates['error_group'] = error_group193e2,
        codeStates['seterror_group'] = seterror_group193e2,
        codeStates['error_group193e2'] = error_group193e2Props,
        codeStates['seterror_group193e2'] = seterror_group193e2Props,
        codeStates['dynamicactions'] = dynamicactions669ce,
        codeStates['setdynamicactions'] = setdynamicactions669ce,
        codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
        codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "acb1b9ef22344e2899907659f179ec90");
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
        codeStates['inegration_run_group'] = inegration_run_group5a7be,
        codeStates['setinegration_run_group'] = setinegration_run_group5a7be,
        codeStates['inegration_run_group5a7be'] = inegration_run_group5a7beProps,
        codeStates['setinegration_run_group5a7be'] = setinegration_run_group5a7beProps,
        codeStates['run_information_group'] = run_information_group519a1,
        codeStates['setrun_information_group'] = setrun_information_group519a1,
        codeStates['run_information_group519a1'] = run_information_group519a1Props,
        codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
        codeStates['timing_status'] = timing_status54aec,
        codeStates['settiming_status'] = settiming_status54aec,
        codeStates['started_on'] = started_ond88e8,
        codeStates['setstarted_on'] = setstarted_ond88e8,
        codeStates['ended_on'] = ended_on9cf0a,
        codeStates['setended_on'] = setended_on9cf0a,
        codeStates['run_status_code'] = run_status_codef6fc6,
        codeStates['setrun_status_code'] = setrun_status_codef6fc6,
        codeStates['record_group'] = record_groupa6d32,
        codeStates['setrecord_group'] = setrecord_groupa6d32,
        codeStates['record_groupa6d32'] = record_groupa6d32Props,
        codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
        codeStates['error_group'] = error_group193e2,
        codeStates['seterror_group'] = seterror_group193e2,
        codeStates['error_group193e2'] = error_group193e2Props,
        codeStates['seterror_group193e2'] = seterror_group193e2Props,
        codeStates['dynamicactions'] = dynamicactions669ce,
        codeStates['setdynamicactions'] = setdynamicactions669ce,
        codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
        codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const timeandstatus_group9ec90Ref = useRef<any>(null);
  const handleClearSearch = () => {
    timeandstatus_group9ec90Ref.current?.setSearchParams();
    timeandstatus_group9ec90Ref.current?.handleSearch({});
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
        !Array.isArray(timeandstatus_group9ec90) &&
        Object.keys(timeandstatus_group9ec90)?.length > 0
      ) {
        settimeandstatus_group9ec90({})
      }
    } else prevRefreshRef.current = true
  }, [timeandstatus_group9ec90Props?.refresh])


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
        gridColumn: '15 / 25',
        gridRow: '1 / 52',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
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
          setaddintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"timeandstatus_group"}))
        }}
    >
          {allowedControls.includes("timing_status") ?<Texttiming_status   /* 54aec */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("started_on") ?<DatePickerstarted_on   /* d88e8 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ended_on") ?<DatePickerended_on   /* 9cf0a */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("run_status_code") ?<Dropdownrun_status_code   /* f6fc6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Grouptimeandstatus_group
