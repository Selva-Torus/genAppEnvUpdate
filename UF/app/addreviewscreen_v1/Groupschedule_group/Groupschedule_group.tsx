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
import Texttext11  from "./Texttext11";
import DatePickerdue_on  from "./DatePickerdue_on";
import TextInputevidence_count  from "./TextInputevidence_count";
import DatePickertrs_created_on  from "./DatePickertrs_created_on";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupschedule_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_ruleconditioncombo_v1Props, setdfd_ruleconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_riskoperatorcodecombo_v1Props, setdfd_riskoperatorcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text11",
      "due_on",
      "evidence_count",
      "trs_created_on"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition_header",
      "group",
      "schedule_group",
      "status_group",
      "add_rule_condition",
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
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {text113556f, settext113556f}= useContext(TotalContext) as TotalContextProps;
  const {due_on4bc44, setdue_on4bc44}= useContext(TotalContext) as TotalContextProps;
  const {evidence_count4538e, setevidence_count4538e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_oncdec5, settrs_created_oncdec5}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addreviewscreen_v1, setaddreviewscreen_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addReviewScreen:AFVK:v1',
    [user],
    'GroupScheduleGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4d49821bf244436a96aaeedbce5c0bee");
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
    setschedule_groupc0beeProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text11")){
        settext113556f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text113556f?.isDisabled==null)
      {
        settext113556f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("due_on")){
        setdue_on4bc44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(due_on4bc44?.isDisabled==null)
      {
        setdue_on4bc44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_count")){
        setevidence_count4538e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_count4538e?.isDisabled==null)
      {
        setevidence_count4538e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_on")){
        settrs_created_oncdec5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_oncdec5?.isDisabled==null)
      {
        settrs_created_oncdec5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['text11'] = text113556f,
        codeStates['settext11'] = settext113556f,
        codeStates['due_on'] = due_on4bc44,
        codeStates['setdue_on'] = setdue_on4bc44,
        codeStates['evidence_count'] = evidence_count4538e,
        codeStates['setevidence_count'] = setevidence_count4538e,
        codeStates['trs_created_on'] = trs_created_oncdec5,
        codeStates['settrs_created_on'] = settrs_created_oncdec5,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4d49821bf244436a96aaeedbce5c0bee");
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
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['text11'] = text113556f,
        codeStates['settext11'] = settext113556f,
        codeStates['due_on'] = due_on4bc44,
        codeStates['setdue_on'] = setdue_on4bc44,
        codeStates['evidence_count'] = evidence_count4538e,
        codeStates['setevidence_count'] = setevidence_count4538e,
        codeStates['trs_created_on'] = trs_created_oncdec5,
        codeStates['settrs_created_on'] = settrs_created_oncdec5,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const schedule_groupc0beeRef = useRef<any>(null);
  const handleClearSearch = () => {
    schedule_groupc0beeRef.current?.setSearchParams();
    schedule_groupc0beeRef.current?.handleSearch({});
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
        !Array.isArray(schedule_groupc0bee) &&
        Object.keys(schedule_groupc0bee)?.length > 0
      ) {
        setschedule_groupc0bee({})
        setschedule_groupc0beeProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [schedule_groupc0beeProps?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '29 / 68',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
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
          setaddreviewscreen_v1((pre:any)=>({...pre,_selectedGroup_:"schedule_group"}))
        }}
    >
          {allowedControls.includes("text11") ?<Texttext11   /* 3556f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("due_on") ?<DatePickerdue_on   /* 4bc44 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("evidence_count") ?<TextInputevidence_count   /* 4538e */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("trs_created_on") ?<DatePickertrs_created_on   /* cdec5 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupschedule_group
