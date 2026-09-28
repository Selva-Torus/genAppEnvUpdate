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
import TextInputpriority_order  from "./TextInputpriority_order";
import Switchis_active  from "./Switchis_active";
import DatePickereffective_to  from "./DatePickereffective_to";
import DatePickereffective_from  from "./DatePickereffective_from";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_config_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "info_rule",
      "priority_order",
      "is_active",
      "effective_to",
      "effective_from"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group"
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
  const {info_group95877, setinfo_group95877}= useContext(TotalContext) as TotalContextProps;
  const {info_group95877Props, setinfo_group95877Props}= useContext(TotalContext) as TotalContextProps;
  const {group76151, setgroup76151}= useContext(TotalContext) as TotalContextProps;
  const {group76151Props, setgroup76151Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4, setrule_config_groupb9eb4}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupb9eb4Props, setrule_config_groupb9eb4Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule8323f, setinfo_rule8323f}= useContext(TotalContext) as TotalContextProps;
  const {priority_order6450a, setpriority_order6450a}= useContext(TotalContext) as TotalContextProps;
  const {is_active739c3, setis_active739c3}= useContext(TotalContext) as TotalContextProps;
  const {effective_to5c703, seteffective_to5c703}= useContext(TotalContext) as TotalContextProps;
  const {effective_from972ff, seteffective_from972ff}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewriskrules_v1, setviewriskrules_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewRiskRules:AFVK:v1',
    [user],
    'GroupRuleConfigGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1001cc51af96bbc2103d413bee5b9eb4");
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
    setrule_config_groupb9eb4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("info_rule")){
        setinfo_rule8323f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(info_rule8323f?.isDisabled==null)
      {
        setinfo_rule8323f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority_order")){
        setpriority_order6450a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(priority_order6450a?.isDisabled==null)
      {
        setpriority_order6450a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active739c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active739c3?.isDisabled==null)
      {
        setis_active739c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_to")){
        seteffective_to5c703((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_to5c703?.isDisabled==null)
      {
        seteffective_to5c703((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_from")){
        seteffective_from972ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_from972ff?.isDisabled==null)
      {
        seteffective_from972ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group95877,
        codeStates['setinfo_group'] = setinfo_group95877,
        codeStates['info_group95877'] = info_group95877Props,
        codeStates['setinfo_group95877'] = setinfo_group95877Props,
        codeStates['group'] = group76151,
        codeStates['setgroup'] = setgroup76151,
        codeStates['group76151'] = group76151Props,
        codeStates['setgroup76151'] = setgroup76151Props,
        codeStates['rule_config_group'] = rule_config_groupb9eb4,
        codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
        codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
        codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
        codeStates['info_rule'] = info_rule8323f,
        codeStates['setinfo_rule'] = setinfo_rule8323f,
        codeStates['priority_order'] = priority_order6450a,
        codeStates['setpriority_order'] = setpriority_order6450a,
        codeStates['is_active'] = is_active739c3,
        codeStates['setis_active'] = setis_active739c3,
        codeStates['effective_to'] = effective_to5c703,
        codeStates['seteffective_to'] = seteffective_to5c703,
        codeStates['effective_from'] = effective_from972ff,
        codeStates['seteffective_from'] = seteffective_from972ff,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1001cc51af96bbc2103d413bee5b9eb4");
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
        codeStates['info_group'] = info_group95877,
        codeStates['setinfo_group'] = setinfo_group95877,
        codeStates['info_group95877'] = info_group95877Props,
        codeStates['setinfo_group95877'] = setinfo_group95877Props,
        codeStates['group'] = group76151,
        codeStates['setgroup'] = setgroup76151,
        codeStates['group76151'] = group76151Props,
        codeStates['setgroup76151'] = setgroup76151Props,
        codeStates['rule_config_group'] = rule_config_groupb9eb4,
        codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
        codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
        codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
        codeStates['info_rule'] = info_rule8323f,
        codeStates['setinfo_rule'] = setinfo_rule8323f,
        codeStates['priority_order'] = priority_order6450a,
        codeStates['setpriority_order'] = setpriority_order6450a,
        codeStates['is_active'] = is_active739c3,
        codeStates['setis_active'] = setis_active739c3,
        codeStates['effective_to'] = effective_to5c703,
        codeStates['seteffective_to'] = seteffective_to5c703,
        codeStates['effective_from'] = effective_from972ff,
        codeStates['seteffective_from'] = seteffective_from972ff,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_config_groupb9eb4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    rule_config_groupb9eb4Ref.current?.setSearchParams();
    rule_config_groupb9eb4Ref.current?.handleSearch({});
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
        !Array.isArray(rule_config_groupb9eb4) &&
        Object.keys(rule_config_groupb9eb4)?.length > 0
      ) {
        setrule_config_groupb9eb4({})
      }
    } else prevRefreshRef.current = true
  }, [rule_config_groupb9eb4Props?.refresh])


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
        gridRow: '1 / 56',
      
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
          setviewriskrules_v1((pre:any)=>({...pre,_selectedGroup_:"rule_config_group"}))
        }}
    >
          {allowedControls.includes("info_rule") ?<Textinfo_rule   /* 8323f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("priority_order") ?<TextInputpriority_order   /* 6450a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* 739c3 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("effective_to") ?<DatePickereffective_to   /* 5c703 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("effective_from") ?<DatePickereffective_from   /* 972ff */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprule_config_group
