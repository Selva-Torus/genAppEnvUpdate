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
import Groupai_registry_text_group  from "../Groupai_registry_text_group/Groupai_registry_text_group";
import Groupai_control_table  from "../Groupai_control_table/Groupai_control_table";
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
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch  from "./Buttonsearch";
import Buttonadd_control  from "./Buttonadd_control";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_control_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_control"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
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
  const {overall_ai_data_class672d4, setoverall_ai_data_class672d4}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class672d4Props, setoverall_ai_data_class672d4Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9, setai_control_group538c9}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9Props, setai_control_group538c9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbab, setai_registry_text_group8cbab}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbabProps, setai_registry_text_group8cbabProps}= useContext(TotalContext) as TotalContextProps;
  const {refresh_buttonc61cc, setrefresh_buttonc61cc}= useContext(TotalContext) as TotalContextProps;
  const {search0ed0a, setsearch0ed0a}= useContext(TotalContext) as TotalContextProps;
  const {add_controld81b2, setadd_controld81b2}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126f, setai_control_table8126f}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126fProps, setai_control_table8126fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aiagentcontrol_v1, setaiagentcontrol_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1',
    [user],
    'GroupAiControlGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7c6db5b604c66ad66f42050521f538c9");
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
    setai_control_group538c9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text_group")){
        setai_registry_text_group8cbab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_text_group8cbab?.isDisabled==null)
      {
        setai_registry_text_group8cbab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_buttonc61cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_buttonc61cc?.isDisabled==null)
      {
        setrefresh_buttonc61cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch0ed0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search0ed0a?.isDisabled==null)
      {
        setsearch0ed0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_control")){
        setadd_controld81b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_controld81b2?.isDisabled==null)
      {
        setadd_controld81b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_control_table")){
        setai_control_table8126fProps((pre:any)=>({...pre,...ai_control_table8126f,isDisabled:true}));

    }else
    {
      if(ai_control_table8126f?.isDisabled==null)
      {
        setai_control_table8126fProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_data_class'] = overall_ai_data_class672d4,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class672d4,
        codeStates['overall_ai_data_class672d4'] = overall_ai_data_class672d4Props,
        codeStates['setoverall_ai_data_class672d4'] = setoverall_ai_data_class672d4Props,
        codeStates['ai_control_group'] = ai_control_group538c9,
        codeStates['setai_control_group'] = setai_control_group538c9,
        codeStates['ai_control_group538c9'] = ai_control_group538c9Props,
        codeStates['setai_control_group538c9'] = setai_control_group538c9Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8cbab,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8cbab,
        codeStates['ai_registry_text_group8cbab'] = ai_registry_text_group8cbabProps,
        codeStates['setai_registry_text_group8cbab'] = setai_registry_text_group8cbabProps,
        codeStates['refresh_button'] = refresh_buttonc61cc,
        codeStates['setrefresh_button'] = setrefresh_buttonc61cc,
        codeStates['search'] = search0ed0a,
        codeStates['setsearch'] = setsearch0ed0a,
        codeStates['add_control'] = add_controld81b2,
        codeStates['setadd_control'] = setadd_controld81b2,
        codeStates['ai_control_table'] = ai_control_table8126f,
        codeStates['setai_control_table'] = setai_control_table8126f,
        codeStates['ai_control_table8126f'] = ai_control_table8126fProps,
        codeStates['setai_control_table8126f'] = setai_control_table8126fProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7c6db5b604c66ad66f42050521f538c9");
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
        codeStates['overall_ai_data_class'] = overall_ai_data_class672d4,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class672d4,
        codeStates['overall_ai_data_class672d4'] = overall_ai_data_class672d4Props,
        codeStates['setoverall_ai_data_class672d4'] = setoverall_ai_data_class672d4Props,
        codeStates['ai_control_group'] = ai_control_group538c9,
        codeStates['setai_control_group'] = setai_control_group538c9,
        codeStates['ai_control_group538c9'] = ai_control_group538c9Props,
        codeStates['setai_control_group538c9'] = setai_control_group538c9Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8cbab,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8cbab,
        codeStates['ai_registry_text_group8cbab'] = ai_registry_text_group8cbabProps,
        codeStates['setai_registry_text_group8cbab'] = setai_registry_text_group8cbabProps,
        codeStates['refresh_button'] = refresh_buttonc61cc,
        codeStates['setrefresh_button'] = setrefresh_buttonc61cc,
        codeStates['search'] = search0ed0a,
        codeStates['setsearch'] = setsearch0ed0a,
        codeStates['add_control'] = add_controld81b2,
        codeStates['setadd_control'] = setadd_controld81b2,
        codeStates['ai_control_table'] = ai_control_table8126f,
        codeStates['setai_control_table'] = setai_control_table8126f,
        codeStates['ai_control_table8126f'] = ai_control_table8126fProps,
        codeStates['setai_control_table8126f'] = setai_control_table8126fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_control_group538c9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_control_group538c9Ref.current?.setSearchParams();
    ai_control_group538c9Ref.current?.handleSearch({});
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
        !Array.isArray(ai_control_group538c9) &&
        Object.keys(ai_control_group538c9)?.length > 0
      ) {
        setai_control_group538c9({})
      }
    } else prevRefreshRef.current = true
  }, [ai_control_group538c9Props?.refresh])


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
        gridRow: '1 / 151',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
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
          setaiagentcontrol_v1((pre:any)=>({...pre,_selectedGroup_:"ai_control_group"}))
        }}
    >
        {allowedComponent.includes("ai_registry_text_group")  &&<Groupai_registry_text_group  
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
        {allowedComponent.includes("ai_control_table")  &&<Groupai_control_table  
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
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_control" in ButtonGoRuleData)?ButtonGoRuleData["add_control"]:true) && 
          allowedControls.includes("add_control")  ?            <Buttonadd_control tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_control_group
