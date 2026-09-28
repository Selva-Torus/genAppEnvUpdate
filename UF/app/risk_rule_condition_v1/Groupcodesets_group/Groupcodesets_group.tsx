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
import Grouprule_condition_table  from "../Grouprule_condition_table/Grouprule_condition_table";
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
import Texttext  from "./Texttext";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_btn  from "./Buttonadd_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcodesets_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_riskrulecondition_v1Props, setdfd_riskrulecondition_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "rule_condition_table"
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
  const {codesets_group1c519, setcodesets_group1c519}= useContext(TotalContext) as TotalContextProps;
  const {codesets_group1c519Props, setcodesets_group1c519Props}= useContext(TotalContext) as TotalContextProps;
  const {textbc13a, settextbc13a}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnf4142, setref_btnf4142}= useContext(TotalContext) as TotalContextProps;
  const {search_btn05bb6, setsearch_btn05bb6}= useContext(TotalContext) as TotalContextProps;
  const {add_btn6f87e, setadd_btn6f87e}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41f, setrule_condition_table7b41f}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41fProps, setrule_condition_table7b41fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {rulecondition_v1, setrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1',
    [user],
    'GroupCodesetsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ceb0260ac310f5640f2af3c83341c519");
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
    setcodesets_group1c519Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextbc13a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textbc13a?.isDisabled==null)
      {
        settextbc13a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btnf4142((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btnf4142?.isDisabled==null)
      {
        setref_btnf4142((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn05bb6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn05bb6?.isDisabled==null)
      {
        setsearch_btn05bb6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_btn")){
        setadd_btn6f87e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_btn6f87e?.isDisabled==null)
      {
        setadd_btn6f87e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_condition_table")){
        setrule_condition_table7b41fProps((pre:any)=>({...pre,...rule_condition_table7b41f,isDisabled:true}));

    }else
    {
      if(rule_condition_table7b41f?.isDisabled==null)
      {
        setrule_condition_table7b41fProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['codesets_group'] = codesets_group1c519,
        codeStates['setcodesets_group'] = setcodesets_group1c519,
        codeStates['codesets_group1c519'] = codesets_group1c519Props,
        codeStates['setcodesets_group1c519'] = setcodesets_group1c519Props,
        codeStates['text'] = textbc13a,
        codeStates['settext'] = settextbc13a,
        codeStates['ref_btn'] = ref_btnf4142,
        codeStates['setref_btn'] = setref_btnf4142,
        codeStates['search_btn'] = search_btn05bb6,
        codeStates['setsearch_btn'] = setsearch_btn05bb6,
        codeStates['add_btn'] = add_btn6f87e,
        codeStates['setadd_btn'] = setadd_btn6f87e,
        codeStates['rule_condition_table'] = rule_condition_table7b41f,
        codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
        codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
        codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ceb0260ac310f5640f2af3c83341c519");
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
        codeStates['codesets_group'] = codesets_group1c519,
        codeStates['setcodesets_group'] = setcodesets_group1c519,
        codeStates['codesets_group1c519'] = codesets_group1c519Props,
        codeStates['setcodesets_group1c519'] = setcodesets_group1c519Props,
        codeStates['text'] = textbc13a,
        codeStates['settext'] = settextbc13a,
        codeStates['ref_btn'] = ref_btnf4142,
        codeStates['setref_btn'] = setref_btnf4142,
        codeStates['search_btn'] = search_btn05bb6,
        codeStates['setsearch_btn'] = setsearch_btn05bb6,
        codeStates['add_btn'] = add_btn6f87e,
        codeStates['setadd_btn'] = setadd_btn6f87e,
        codeStates['rule_condition_table'] = rule_condition_table7b41f,
        codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
        codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
        codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const codesets_group1c519Ref = useRef<any>(null);
  const handleClearSearch = () => {
    codesets_group1c519Ref.current?.setSearchParams();
    codesets_group1c519Ref.current?.handleSearch({});
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
        !Array.isArray(codesets_group1c519) &&
        Object.keys(codesets_group1c519)?.length > 0
      ) {
        setcodesets_group1c519({})
      }
    } else prevRefreshRef.current = true
  }, [codesets_group1c519Props?.refresh])


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
        gridRow: '1 / 142',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '2px',
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
          setrulecondition_v1((pre:any)=>({...pre,_selectedGroup_:"codesets_group"}))
        }}
    >
        {allowedComponent.includes("rule_condition_table")  &&<Grouprule_condition_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("text") ?<Texttext   /* bc13a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_btn" in ButtonGoRuleData)?ButtonGoRuleData["add_btn"]:true) && 
          allowedControls.includes("add_btn")  ?            <Buttonadd_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupcodesets_group
