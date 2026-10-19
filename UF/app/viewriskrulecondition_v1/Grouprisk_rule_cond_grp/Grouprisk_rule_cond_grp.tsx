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
import Dropdownrule_name  from "./Dropdownrule_name";
import TextInputsequence_no  from "./TextInputsequence_no";
import Dropdownoperator_code  from "./Dropdownoperator_code";
import TextInputcompare_value  from "./TextInputcompare_value";
import TextInputattribute_name  from "./TextInputattribute_name";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprisk_rule_cond_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "rule_name",
      "sequence_no",
      "operator_code",
      "compare_value",
      "attribute_name",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "risk_rule_cond_grp"
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
  const {add_group713a3, setadd_group713a3}= useContext(TotalContext) as TotalContextProps;
  const {add_group713a3Props, setadd_group713a3Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6e, setrisk_rule_cond_grp9fa6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6eProps, setrisk_rule_cond_grp9fa6eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_nameb202a, setrule_nameb202a}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no20c50, setsequence_no20c50}= useContext(TotalContext) as TotalContextProps;
  const {operator_code06297, setoperator_code06297}= useContext(TotalContext) as TotalContextProps;
  const {compare_valueaa22d, setcompare_valueaa22d}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name1565b, setattribute_name1565b}= useContext(TotalContext) as TotalContextProps;
  const {is_activea3076, setis_activea3076}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewriskrulecondition_v1, setviewriskrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewRiskRuleCondition:AFVK:v1',
    [user],
    'GroupRiskRuleCondGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5ea00bc4b4c97dc044026d95c0f9fa6e");
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
    setrisk_rule_cond_grp9fa6eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("rule_name")){
        setrule_nameb202a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_nameb202a?.isDisabled==null)
      {
        setrule_nameb202a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sequence_no")){
        setsequence_no20c50((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sequence_no20c50?.isDisabled==null)
      {
        setsequence_no20c50((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operator_code")){
        setoperator_code06297((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operator_code06297?.isDisabled==null)
      {
        setoperator_code06297((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compare_value")){
        setcompare_valueaa22d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(compare_valueaa22d?.isDisabled==null)
      {
        setcompare_valueaa22d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attribute_name")){
        setattribute_name1565b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attribute_name1565b?.isDisabled==null)
      {
        setattribute_name1565b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activea3076((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activea3076?.isDisabled==null)
      {
        setis_activea3076((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group713a3,
        codeStates['setadd_group'] = setadd_group713a3,
        codeStates['add_group713a3'] = add_group713a3Props,
        codeStates['setadd_group713a3'] = setadd_group713a3Props,
        codeStates['risk_rule_cond_grp'] = risk_rule_cond_grp9fa6e,
        codeStates['setrisk_rule_cond_grp'] = setrisk_rule_cond_grp9fa6e,
        codeStates['risk_rule_cond_grp9fa6e'] = risk_rule_cond_grp9fa6eProps,
        codeStates['setrisk_rule_cond_grp9fa6e'] = setrisk_rule_cond_grp9fa6eProps,
        codeStates['rule_name'] = rule_nameb202a,
        codeStates['setrule_name'] = setrule_nameb202a,
        codeStates['sequence_no'] = sequence_no20c50,
        codeStates['setsequence_no'] = setsequence_no20c50,
        codeStates['operator_code'] = operator_code06297,
        codeStates['setoperator_code'] = setoperator_code06297,
        codeStates['compare_value'] = compare_valueaa22d,
        codeStates['setcompare_value'] = setcompare_valueaa22d,
        codeStates['attribute_name'] = attribute_name1565b,
        codeStates['setattribute_name'] = setattribute_name1565b,
        codeStates['is_active'] = is_activea3076,
        codeStates['setis_active'] = setis_activea3076,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5ea00bc4b4c97dc044026d95c0f9fa6e");
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
        codeStates['add_group'] = add_group713a3,
        codeStates['setadd_group'] = setadd_group713a3,
        codeStates['add_group713a3'] = add_group713a3Props,
        codeStates['setadd_group713a3'] = setadd_group713a3Props,
        codeStates['risk_rule_cond_grp'] = risk_rule_cond_grp9fa6e,
        codeStates['setrisk_rule_cond_grp'] = setrisk_rule_cond_grp9fa6e,
        codeStates['risk_rule_cond_grp9fa6e'] = risk_rule_cond_grp9fa6eProps,
        codeStates['setrisk_rule_cond_grp9fa6e'] = setrisk_rule_cond_grp9fa6eProps,
        codeStates['rule_name'] = rule_nameb202a,
        codeStates['setrule_name'] = setrule_nameb202a,
        codeStates['sequence_no'] = sequence_no20c50,
        codeStates['setsequence_no'] = setsequence_no20c50,
        codeStates['operator_code'] = operator_code06297,
        codeStates['setoperator_code'] = setoperator_code06297,
        codeStates['compare_value'] = compare_valueaa22d,
        codeStates['setcompare_value'] = setcompare_valueaa22d,
        codeStates['attribute_name'] = attribute_name1565b,
        codeStates['setattribute_name'] = setattribute_name1565b,
        codeStates['is_active'] = is_activea3076,
        codeStates['setis_active'] = setis_activea3076,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const risk_rule_cond_grp9fa6eRef = useRef<any>(null);
  const handleClearSearch = () => {
    risk_rule_cond_grp9fa6eRef.current?.setSearchParams();
    risk_rule_cond_grp9fa6eRef.current?.handleSearch({});
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
        !Array.isArray(risk_rule_cond_grp9fa6e) &&
        Object.keys(risk_rule_cond_grp9fa6e)?.length > 0
      ) {
        setrisk_rule_cond_grp9fa6e({})
        setrisk_rule_cond_grp9fa6eProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [risk_rule_cond_grp9fa6eProps?.refresh])


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
        gridRow: '1 / 30',
      
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
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewriskrulecondition_v1((pre:any)=>({...pre,_selectedGroup_:"risk_rule_cond_grp"}))
        }}
    >
        {allowedControls.includes("rule_name") ?<Dropdownrule_name   /* b202a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("sequence_no") ?<TextInputsequence_no   /* 20c50 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("operator_code") ?<Dropdownoperator_code   /* 06297 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("compare_value") ?<TextInputcompare_value   /* aa22d */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("attribute_name") ?<TextInputattribute_name   /* 1565b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* a3076 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprisk_rule_cond_grp
