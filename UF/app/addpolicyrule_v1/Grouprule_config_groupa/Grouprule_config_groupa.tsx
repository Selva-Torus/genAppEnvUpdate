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
import Dropdowndefault_effect  from "./Dropdowndefault_effect";
import Dropdownapplies_to_tiers  from "./Dropdownapplies_to_tiers";
import Dropdownfail_mode  from "./Dropdownfail_mode";
import Dropdownstatus  from "./Dropdownstatus";
import Dropdowntest_status  from "./Dropdowntest_status";
import DatePickereffective_from  from "./DatePickereffective_from";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_config_groupa = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_policyfailmodecombo_v1Props, setdfd_policyfailmodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyrulelanguagecombo_v1Props, setdfd_policyrulelanguagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policystatuscombo_v1Props, setdfd_policystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyteststatuscombo_v1Props, setdfd_policyteststatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policytypecombo_v1Props, setdfd_policytypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_defaulteffectcombo_v1Props, setdfd_defaulteffectcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risktiercodecombo_v1Props, setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "info_rule",
      "default_effect",
      "applies_to_tiers",
      "fail_mode",
      "status",
      "test_status",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
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
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps;
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule17e81, setinfo_rule17e81}= useContext(TotalContext) as TotalContextProps;
  const {default_effectf2b26, setdefault_effectf2b26}= useContext(TotalContext) as TotalContextProps;
  const {applies_to_tiersfcfec, setapplies_to_tiersfcfec}= useContext(TotalContext) as TotalContextProps;
  const {fail_modeef857, setfail_modeef857}= useContext(TotalContext) as TotalContextProps;
  const {status696d3, setstatus696d3}= useContext(TotalContext) as TotalContextProps;
  const {test_statusacb3e, settest_statusacb3e}= useContext(TotalContext) as TotalContextProps;
  const {effective_fromc0572, seteffective_fromc0572}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addpolicyrule_v1, setaddpolicyrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1',
    [user],
    'GroupRuleConfigGroupa',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "19ed3c6d0faf4072bff82d4e059b2fc0");
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
    setrule_config_groupab2fc0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("info_rule")){
        setinfo_rule17e81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(info_rule17e81?.isDisabled==null)
      {
        setinfo_rule17e81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("default_effect")){
        setdefault_effectf2b26((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(default_effectf2b26?.isDisabled==null)
      {
        setdefault_effectf2b26((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_to_tiers")){
        setapplies_to_tiersfcfec((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_to_tiersfcfec?.isDisabled==null)
      {
        setapplies_to_tiersfcfec((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("fail_mode")){
        setfail_modeef857((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(fail_modeef857?.isDisabled==null)
      {
        setfail_modeef857((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus696d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status696d3?.isDisabled==null)
      {
        setstatus696d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("test_status")){
        settest_statusacb3e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(test_statusacb3e?.isDisabled==null)
      {
        settest_statusacb3e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_from")){
        seteffective_fromc0572((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_fromc0572?.isDisabled==null)
      {
        seteffective_fromc0572((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['info_rule'] = info_rule17e81,
        codeStates['setinfo_rule'] = setinfo_rule17e81,
        codeStates['default_effect'] = default_effectf2b26,
        codeStates['setdefault_effect'] = setdefault_effectf2b26,
        codeStates['applies_to_tiers'] = applies_to_tiersfcfec,
        codeStates['setapplies_to_tiers'] = setapplies_to_tiersfcfec,
        codeStates['fail_mode'] = fail_modeef857,
        codeStates['setfail_mode'] = setfail_modeef857,
        codeStates['status'] = status696d3,
        codeStates['setstatus'] = setstatus696d3,
        codeStates['test_status'] = test_statusacb3e,
        codeStates['settest_status'] = settest_statusacb3e,
        codeStates['effective_from'] = effective_fromc0572,
        codeStates['seteffective_from'] = seteffective_fromc0572,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "19ed3c6d0faf4072bff82d4e059b2fc0");
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
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['info_rule'] = info_rule17e81,
        codeStates['setinfo_rule'] = setinfo_rule17e81,
        codeStates['default_effect'] = default_effectf2b26,
        codeStates['setdefault_effect'] = setdefault_effectf2b26,
        codeStates['applies_to_tiers'] = applies_to_tiersfcfec,
        codeStates['setapplies_to_tiers'] = setapplies_to_tiersfcfec,
        codeStates['fail_mode'] = fail_modeef857,
        codeStates['setfail_mode'] = setfail_modeef857,
        codeStates['status'] = status696d3,
        codeStates['setstatus'] = setstatus696d3,
        codeStates['test_status'] = test_statusacb3e,
        codeStates['settest_status'] = settest_statusacb3e,
        codeStates['effective_from'] = effective_fromc0572,
        codeStates['seteffective_from'] = seteffective_fromc0572,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_config_groupab2fc0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    rule_config_groupab2fc0Ref.current?.setSearchParams();
    rule_config_groupab2fc0Ref.current?.handleSearch({});
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
        !Array.isArray(rule_config_groupab2fc0) &&
        Object.keys(rule_config_groupab2fc0)?.length > 0
      ) {
        setrule_config_groupab2fc0({})
        setrule_config_groupab2fc0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [rule_config_groupab2fc0Props?.refresh])


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
        gridRow: '48 / 90',
      
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
          setaddpolicyrule_v1((pre:any)=>({...pre,_selectedGroup_:"rule_config_groupa"}))
        }}
    >
          {allowedControls.includes("info_rule") ?<Textinfo_rule   /* 17e81 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("default_effect") ?<Dropdowndefault_effect   /* f2b26 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("applies_to_tiers") ?<Dropdownapplies_to_tiers   /* fcfec */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("fail_mode") ?<Dropdownfail_mode   /* ef857 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("status") ?<Dropdownstatus   /* 696d3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("test_status") ?<Dropdowntest_status   /* acb3e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("effective_from") ?<DatePickereffective_from   /* c0572 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprule_config_groupa
