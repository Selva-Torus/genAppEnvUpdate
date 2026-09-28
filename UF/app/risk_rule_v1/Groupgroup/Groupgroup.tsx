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
import Grouprisk_rule_table  from "../Grouprisk_rule_table/Grouprisk_rule_table";
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
import Textrisk_rule_txt  from "./Textrisk_rule_txt";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_btn  from "./Buttonadd_btn";
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
  const {dfd_riskrule_v1Props, setdfd_riskrule_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "risk_rule_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
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
  const {groupf5307, setgroupf5307}= useContext(TotalContext) as TotalContextProps;
  const {groupf5307Props, setgroupf5307Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_txt672cc, setrisk_rule_txt672cc}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn968e3, setref_btn968e3}= useContext(TotalContext) as TotalContextProps;
  const {search_btn47d67, setsearch_btn47d67}= useContext(TotalContext) as TotalContextProps;
  const {add_btn242f1, setadd_btn242f1}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6, setrisk_rule_table159f6}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6Props, setrisk_rule_table159f6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {riskrule_v1, setriskrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "333d6f1313fe4c5ca7ec51f51e3f5307");
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
    setgroupf5307Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("risk_rule_txt")){
        setrisk_rule_txt672cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_txt672cc?.isDisabled==null)
      {
        setrisk_rule_txt672cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btn968e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btn968e3?.isDisabled==null)
      {
        setref_btn968e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn47d67((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn47d67?.isDisabled==null)
      {
        setsearch_btn47d67((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_btn")){
        setadd_btn242f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_btn242f1?.isDisabled==null)
      {
        setadd_btn242f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_table")){
        setrisk_rule_table159f6Props((pre:any)=>({...pre,...risk_rule_table159f6,isDisabled:true}));

    }else
    {
      if(risk_rule_table159f6?.isDisabled==null)
      {
        setrisk_rule_table159f6Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupf5307,
        codeStates['setgroup'] = setgroupf5307,
        codeStates['groupf5307'] = groupf5307Props,
        codeStates['setgroupf5307'] = setgroupf5307Props,
        codeStates['risk_rule_txt'] = risk_rule_txt672cc,
        codeStates['setrisk_rule_txt'] = setrisk_rule_txt672cc,
        codeStates['ref_btn'] = ref_btn968e3,
        codeStates['setref_btn'] = setref_btn968e3,
        codeStates['search_btn'] = search_btn47d67,
        codeStates['setsearch_btn'] = setsearch_btn47d67,
        codeStates['add_btn'] = add_btn242f1,
        codeStates['setadd_btn'] = setadd_btn242f1,
        codeStates['risk_rule_table'] = risk_rule_table159f6,
        codeStates['setrisk_rule_table'] = setrisk_rule_table159f6,
        codeStates['risk_rule_table159f6'] = risk_rule_table159f6Props,
        codeStates['setrisk_rule_table159f6'] = setrisk_rule_table159f6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "333d6f1313fe4c5ca7ec51f51e3f5307");
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
        codeStates['group'] = groupf5307,
        codeStates['setgroup'] = setgroupf5307,
        codeStates['groupf5307'] = groupf5307Props,
        codeStates['setgroupf5307'] = setgroupf5307Props,
        codeStates['risk_rule_txt'] = risk_rule_txt672cc,
        codeStates['setrisk_rule_txt'] = setrisk_rule_txt672cc,
        codeStates['ref_btn'] = ref_btn968e3,
        codeStates['setref_btn'] = setref_btn968e3,
        codeStates['search_btn'] = search_btn47d67,
        codeStates['setsearch_btn'] = setsearch_btn47d67,
        codeStates['add_btn'] = add_btn242f1,
        codeStates['setadd_btn'] = setadd_btn242f1,
        codeStates['risk_rule_table'] = risk_rule_table159f6,
        codeStates['setrisk_rule_table'] = setrisk_rule_table159f6,
        codeStates['risk_rule_table159f6'] = risk_rule_table159f6Props,
        codeStates['setrisk_rule_table159f6'] = setrisk_rule_table159f6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupf5307Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupf5307Ref.current?.setSearchParams();
    groupf5307Ref.current?.handleSearch({});
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
        !Array.isArray(groupf5307) &&
        Object.keys(groupf5307)?.length > 0
      ) {
        setgroupf5307({})
      }
    } else prevRefreshRef.current = true
  }, [groupf5307Props?.refresh])


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
        gridRow: '1 / 144',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '4px',
        backgroundColor:'',
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
          setriskrule_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("risk_rule_table")  &&<Grouprisk_rule_table  
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
          {allowedControls.includes("risk_rule_txt") ?<Textrisk_rule_txt   /* 672cc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_btn" in ButtonGoRuleData)?ButtonGoRuleData["add_btn"]:true) && 
          allowedControls.includes("add_btn")  ?            <Buttonadd_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
