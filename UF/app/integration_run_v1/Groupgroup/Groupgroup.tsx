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
import Groupintegration_run  from "../Groupintegration_run/Groupintegration_run";
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
import Textintegrationrun_text  from "./Textintegrationrun_text";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonnew_run_btn  from "./Buttonnew_run_btn";
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
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "DEV_AT": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "integrationrun_text",
      "ref_btn",
      "search_btn",
      "new_run_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
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
  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  const {integrationrun_text846c5, setintegrationrun_text846c5}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn14f17, setref_btn14f17}= useContext(TotalContext) as TotalContextProps;
  const {search_btn323c8, setsearch_btn323c8}= useContext(TotalContext) as TotalContextProps;
  const {new_run_btn3082c, setnew_run_btn3082c}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02, setintegration_run8ef02}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02Props, setintegration_run8ef02Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {integrationrun_v1, setintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f7b773f04e894eb1a40dba46ed5089a5");
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
    setgroup089a5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("integrationrun_text")){
        setintegrationrun_text846c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integrationrun_text846c5?.isDisabled==null)
      {
        setintegrationrun_text846c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btn14f17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btn14f17?.isDisabled==null)
      {
        setref_btn14f17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn323c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn323c8?.isDisabled==null)
      {
        setsearch_btn323c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_run_btn")){
        setnew_run_btn3082c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_run_btn3082c?.isDisabled==null)
      {
        setnew_run_btn3082c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_run")){
        setintegration_run8ef02Props((pre:any)=>({...pre,...integration_run8ef02,isDisabled:true}));

    }else
    {
      if(integration_run8ef02?.isDisabled==null)
      {
        setintegration_run8ef02Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group089a5,
        codeStates['setgroup'] = setgroup089a5,
        codeStates['group089a5'] = group089a5Props,
        codeStates['setgroup089a5'] = setgroup089a5Props,
        codeStates['integrationrun_text'] = integrationrun_text846c5,
        codeStates['setintegrationrun_text'] = setintegrationrun_text846c5,
        codeStates['ref_btn'] = ref_btn14f17,
        codeStates['setref_btn'] = setref_btn14f17,
        codeStates['search_btn'] = search_btn323c8,
        codeStates['setsearch_btn'] = setsearch_btn323c8,
        codeStates['new_run_btn'] = new_run_btn3082c,
        codeStates['setnew_run_btn'] = setnew_run_btn3082c,
        codeStates['integration_run'] = integration_run8ef02,
        codeStates['setintegration_run'] = setintegration_run8ef02,
        codeStates['integration_run8ef02'] = integration_run8ef02Props,
        codeStates['setintegration_run8ef02'] = setintegration_run8ef02Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f7b773f04e894eb1a40dba46ed5089a5");
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
        codeStates['group'] = group089a5,
        codeStates['setgroup'] = setgroup089a5,
        codeStates['group089a5'] = group089a5Props,
        codeStates['setgroup089a5'] = setgroup089a5Props,
        codeStates['integrationrun_text'] = integrationrun_text846c5,
        codeStates['setintegrationrun_text'] = setintegrationrun_text846c5,
        codeStates['ref_btn'] = ref_btn14f17,
        codeStates['setref_btn'] = setref_btn14f17,
        codeStates['search_btn'] = search_btn323c8,
        codeStates['setsearch_btn'] = setsearch_btn323c8,
        codeStates['new_run_btn'] = new_run_btn3082c,
        codeStates['setnew_run_btn'] = setnew_run_btn3082c,
        codeStates['integration_run'] = integration_run8ef02,
        codeStates['setintegration_run'] = setintegration_run8ef02,
        codeStates['integration_run8ef02'] = integration_run8ef02Props,
        codeStates['setintegration_run8ef02'] = setintegration_run8ef02Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group089a5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group089a5Ref.current?.setSearchParams();
    group089a5Ref.current?.handleSearch({});
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
        !Array.isArray(group089a5) &&
        Object.keys(group089a5)?.length > 0
      ) {
        setgroup089a5({})
      }
    } else prevRefreshRef.current = true
  }, [group089a5Props?.refresh])


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
        gridRow: '1 / 121',
      
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
          setintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("integration_run")  &&<Groupintegration_run  
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
          {allowedControls.includes("integrationrun_text") ?<Textintegrationrun_text   /* 846c5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_run_btn" in ButtonGoRuleData)?ButtonGoRuleData["new_run_btn"]:true) && 
          allowedControls.includes("new_run_btn")  ?            <Buttonnew_run_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
