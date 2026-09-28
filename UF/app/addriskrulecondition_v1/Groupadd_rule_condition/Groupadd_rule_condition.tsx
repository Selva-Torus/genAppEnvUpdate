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
import Dropdownrisk_rule_id  from "./Dropdownrisk_rule_id";
import TextInputsequence_no  from "./TextInputsequence_no";
import Dropdownoperator_code  from "./Dropdownoperator_code";
import TextInputcompare_value  from "./TextInputcompare_value";
import TextInputattribute_name  from "./TextInputattribute_name";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupadd_rule_condition = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "add_rule_condition",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "risk_rule_id",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
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
  const {add_group111bb, setadd_group111bb}= useContext(TotalContext) as TotalContextProps;
  const {add_group111bbProps, setadd_group111bbProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50, setadd_rule_conditiona9c50}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_conditiona9c50Props, setadd_rule_conditiona9c50Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id67700, setrisk_rule_id67700}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no29818, setsequence_no29818}= useContext(TotalContext) as TotalContextProps;
  const {operator_code042cd, setoperator_code042cd}= useContext(TotalContext) as TotalContextProps;
  const {compare_value0b503, setcompare_value0b503}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name05959, setattribute_name05959}= useContext(TotalContext) as TotalContextProps;
  const {is_activecad18, setis_activecad18}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461, setdynamicactions0c461}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461Props, setdynamicactions0c461Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addriskrulecondition_v1, setaddriskrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRiskRuleCondition:AFVK:v1',
    [user],
    'GroupAddRuleCondition',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "97dc0160feae252158b073e5b1da9c50");
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
    setadd_rule_conditiona9c50Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("risk_rule_id")){
        setrisk_rule_id67700((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_id67700?.isDisabled==null)
      {
        setrisk_rule_id67700((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sequence_no")){
        setsequence_no29818((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sequence_no29818?.isDisabled==null)
      {
        setsequence_no29818((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operator_code")){
        setoperator_code042cd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operator_code042cd?.isDisabled==null)
      {
        setoperator_code042cd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compare_value")){
        setcompare_value0b503((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(compare_value0b503?.isDisabled==null)
      {
        setcompare_value0b503((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attribute_name")){
        setattribute_name05959((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attribute_name05959?.isDisabled==null)
      {
        setattribute_name05959((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activecad18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activecad18?.isDisabled==null)
      {
        setis_activecad18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group111bb,
        codeStates['setadd_group'] = setadd_group111bb,
        codeStates['add_group111bb'] = add_group111bbProps,
        codeStates['setadd_group111bb'] = setadd_group111bbProps,
        codeStates['add_rule_condition'] = add_rule_conditiona9c50,
        codeStates['setadd_rule_condition'] = setadd_rule_conditiona9c50,
        codeStates['add_rule_conditiona9c50'] = add_rule_conditiona9c50Props,
        codeStates['setadd_rule_conditiona9c50'] = setadd_rule_conditiona9c50Props,
        codeStates['risk_rule_id'] = risk_rule_id67700,
        codeStates['setrisk_rule_id'] = setrisk_rule_id67700,
        codeStates['sequence_no'] = sequence_no29818,
        codeStates['setsequence_no'] = setsequence_no29818,
        codeStates['operator_code'] = operator_code042cd,
        codeStates['setoperator_code'] = setoperator_code042cd,
        codeStates['compare_value'] = compare_value0b503,
        codeStates['setcompare_value'] = setcompare_value0b503,
        codeStates['attribute_name'] = attribute_name05959,
        codeStates['setattribute_name'] = setattribute_name05959,
        codeStates['is_active'] = is_activecad18,
        codeStates['setis_active'] = setis_activecad18,
        codeStates['dynamicactions'] = dynamicactions0c461,
        codeStates['setdynamicactions'] = setdynamicactions0c461,
        codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
        codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "97dc0160feae252158b073e5b1da9c50");
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
        codeStates['add_group'] = add_group111bb,
        codeStates['setadd_group'] = setadd_group111bb,
        codeStates['add_group111bb'] = add_group111bbProps,
        codeStates['setadd_group111bb'] = setadd_group111bbProps,
        codeStates['add_rule_condition'] = add_rule_conditiona9c50,
        codeStates['setadd_rule_condition'] = setadd_rule_conditiona9c50,
        codeStates['add_rule_conditiona9c50'] = add_rule_conditiona9c50Props,
        codeStates['setadd_rule_conditiona9c50'] = setadd_rule_conditiona9c50Props,
        codeStates['risk_rule_id'] = risk_rule_id67700,
        codeStates['setrisk_rule_id'] = setrisk_rule_id67700,
        codeStates['sequence_no'] = sequence_no29818,
        codeStates['setsequence_no'] = setsequence_no29818,
        codeStates['operator_code'] = operator_code042cd,
        codeStates['setoperator_code'] = setoperator_code042cd,
        codeStates['compare_value'] = compare_value0b503,
        codeStates['setcompare_value'] = setcompare_value0b503,
        codeStates['attribute_name'] = attribute_name05959,
        codeStates['setattribute_name'] = setattribute_name05959,
        codeStates['is_active'] = is_activecad18,
        codeStates['setis_active'] = setis_activecad18,
        codeStates['dynamicactions'] = dynamicactions0c461,
        codeStates['setdynamicactions'] = setdynamicactions0c461,
        codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
        codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const add_rule_conditiona9c50Ref = useRef<any>(null);
  const handleClearSearch = () => {
    add_rule_conditiona9c50Ref.current?.setSearchParams();
    add_rule_conditiona9c50Ref.current?.handleSearch({});
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
        !Array.isArray(add_rule_conditiona9c50) &&
        Object.keys(add_rule_conditiona9c50)?.length > 0
      ) {
        setadd_rule_conditiona9c50({})
      }
    } else prevRefreshRef.current = true
  }, [add_rule_conditiona9c50Props?.refresh])


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
        gridRow: '1 / 29',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddriskrulecondition_v1((pre:any)=>({...pre,_selectedGroup_:"add_rule_condition"}))
        }}
    >
        {allowedControls.includes("risk_rule_id") ?<Dropdownrisk_rule_id   /* 67700 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("sequence_no") ?<TextInputsequence_no   /* 29818 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("operator_code") ?<Dropdownoperator_code   /* 042cd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("compare_value") ?<TextInputcompare_value   /* 0b503 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("attribute_name") ?<TextInputattribute_name   /* 05959 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* cad18 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupadd_rule_condition
