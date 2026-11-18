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
import Textinfo_rule  from "./Textinfo_rule";
import TextInputstage_name  from "./TextInputstage_name";
import Dropdownstatus_code  from "./Dropdownstatus_code";
import TextAreacondition_text  from "./TextAreacondition_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_statuscodecombo_v1Props, setdfd_statuscodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "info_rule",
      "stage_name",
      "status_code",
      "condition_text"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
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
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule9eda4, setinfo_rule9eda4}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef85b6, setstage_namef85b6}= useContext(TotalContext) as TotalContextProps;
  const {status_codeb8e30, setstatus_codeb8e30}= useContext(TotalContext) as TotalContextProps;
  const {condition_text4da2f, setcondition_text4da2f}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcertificationcondition_v1, setaddcertificationcondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationCondition:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5cda5668c9e05cd0c1c49d447b385ee1");
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
    setgroup85ee1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("info_rule")){
        setinfo_rule9eda4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(info_rule9eda4?.isDisabled==null)
      {
        setinfo_rule9eda4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_namef85b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_namef85b6?.isDisabled==null)
      {
        setstage_namef85b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_code")){
        setstatus_codeb8e30((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_codeb8e30?.isDisabled==null)
      {
        setstatus_codeb8e30((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_text")){
        setcondition_text4da2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(condition_text4da2f?.isDisabled==null)
      {
        setcondition_text4da2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['info_rule'] = info_rule9eda4,
        codeStates['setinfo_rule'] = setinfo_rule9eda4,
        codeStates['stage_name'] = stage_namef85b6,
        codeStates['setstage_name'] = setstage_namef85b6,
        codeStates['status_code'] = status_codeb8e30,
        codeStates['setstatus_code'] = setstatus_codeb8e30,
        codeStates['condition_text'] = condition_text4da2f,
        codeStates['setcondition_text'] = setcondition_text4da2f,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5cda5668c9e05cd0c1c49d447b385ee1");
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
        codeStates['info_group'] = info_groupcb42f,
        codeStates['setinfo_group'] = setinfo_groupcb42f,
        codeStates['info_groupcb42f'] = info_groupcb42fProps,
        codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
        codeStates['group'] = group85ee1,
        codeStates['setgroup'] = setgroup85ee1,
        codeStates['group85ee1'] = group85ee1Props,
        codeStates['setgroup85ee1'] = setgroup85ee1Props,
        codeStates['info_rule'] = info_rule9eda4,
        codeStates['setinfo_rule'] = setinfo_rule9eda4,
        codeStates['stage_name'] = stage_namef85b6,
        codeStates['setstage_name'] = setstage_namef85b6,
        codeStates['status_code'] = status_codeb8e30,
        codeStates['setstatus_code'] = setstatus_codeb8e30,
        codeStates['condition_text'] = condition_text4da2f,
        codeStates['setcondition_text'] = setcondition_text4da2f,
        codeStates['rule_config_group'] = rule_config_groupa2b93,
        codeStates['setrule_config_group'] = setrule_config_groupa2b93,
        codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
        codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
        codeStates['dynamicactions'] = dynamicactionsbe417,
        codeStates['setdynamicactions'] = setdynamicactionsbe417,
        codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
        codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group85ee1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group85ee1Ref.current?.setSearchParams();
    group85ee1Ref.current?.handleSearch({});
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
        !Array.isArray(group85ee1) &&
        Object.keys(group85ee1)?.length > 0
      ) {
        setgroup85ee1({})
        setgroup85ee1Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group85ee1Props?.refresh])


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
        gridRow: '1 / 59',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f1f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddcertificationcondition_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("info_rule") ?<Textinfo_rule   /* 9eda4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_name") ?<TextInputstage_name   /* f85b6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("status_code") ?<Dropdownstatus_code   /* b8e30 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("condition_text") ?<TextAreacondition_text   /* 4da2f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupgroup
