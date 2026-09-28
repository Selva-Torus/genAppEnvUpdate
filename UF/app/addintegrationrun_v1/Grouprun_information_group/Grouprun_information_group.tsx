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
import Dropdownintegration_source  from "./Dropdownintegration_source";
import Dropdownrun_trigger_code  from "./Dropdownrun_trigger_code";
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
      "run_information_text",
      "integration_source",
      "run_trigger_code",
      "triggered_by"
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
  const {run_information_textf877a, setrun_information_textf877a}= useContext(TotalContext) as TotalContextProps;
  const {integration_source854fe, setintegration_source854fe}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_coded077c, setrun_trigger_coded077c}= useContext(TotalContext) as TotalContextProps;
  const {triggered_by95bfc, settriggered_by95bfc}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e32a6b00403b4ca295eac748c62519a1");
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
    setrun_information_group519a1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("run_information_text")){
        setrun_information_textf877a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_information_textf877a?.isDisabled==null)
      {
        setrun_information_textf877a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source")){
        setintegration_source854fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source854fe?.isDisabled==null)
      {
        setintegration_source854fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_trigger_code")){
        setrun_trigger_coded077c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_trigger_coded077c?.isDisabled==null)
      {
        setrun_trigger_coded077c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("triggered_by")){
        settriggered_by95bfc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(triggered_by95bfc?.isDisabled==null)
      {
        settriggered_by95bfc((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['run_information_text'] = run_information_textf877a,
        codeStates['setrun_information_text'] = setrun_information_textf877a,
        codeStates['integration_source'] = integration_source854fe,
        codeStates['setintegration_source'] = setintegration_source854fe,
        codeStates['run_trigger_code'] = run_trigger_coded077c,
        codeStates['setrun_trigger_code'] = setrun_trigger_coded077c,
        codeStates['triggered_by'] = triggered_by95bfc,
        codeStates['settriggered_by'] = settriggered_by95bfc,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e32a6b00403b4ca295eac748c62519a1");
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
        codeStates['run_information_text'] = run_information_textf877a,
        codeStates['setrun_information_text'] = setrun_information_textf877a,
        codeStates['integration_source'] = integration_source854fe,
        codeStates['setintegration_source'] = setintegration_source854fe,
        codeStates['run_trigger_code'] = run_trigger_coded077c,
        codeStates['setrun_trigger_code'] = setrun_trigger_coded077c,
        codeStates['triggered_by'] = triggered_by95bfc,
        codeStates['settriggered_by'] = settriggered_by95bfc,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
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


  const run_information_group519a1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    run_information_group519a1Ref.current?.setSearchParams();
    run_information_group519a1Ref.current?.handleSearch({});
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
        !Array.isArray(run_information_group519a1) &&
        Object.keys(run_information_group519a1)?.length > 0
      ) {
        setrun_information_group519a1({})
      }
    } else prevRefreshRef.current = true
  }, [run_information_group519a1Props?.refresh])


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
        gridRow: '1 / 39',
      
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
          setaddintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"run_information_group"}))
        }}
    >
          {allowedControls.includes("run_information_text") ?<Textrun_information_text   /* f877a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("integration_source") ?<Dropdownintegration_source   /* 854fe */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("run_trigger_code") ?<Dropdownrun_trigger_code   /* d077c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("triggered_by") ?<TextInputtriggered_by   /* 95bfc */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprun_information_group
