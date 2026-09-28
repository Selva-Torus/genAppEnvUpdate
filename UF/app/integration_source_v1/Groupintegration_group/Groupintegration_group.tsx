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
import Groupintegration_source  from "../Groupintegration_source/Groupintegration_source";
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
import Buttonnew_source  from "./Buttonnew_source";
import Texttext  from "./Texttext";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupintegration_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "search",
      "new_source",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
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
  const {overall_ai_asset_registry0f921, setoverall_ai_asset_registry0f921}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry0f921Props, setoverall_ai_asset_registry0f921Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7, setintegration_groupdc7c7}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7Props, setintegration_groupdc7c7Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button66087, setrefresh_button66087}= useContext(TotalContext) as TotalContextProps;
  const {searchc990c, setsearchc990c}= useContext(TotalContext) as TotalContextProps;
  const {new_sourceb26b0, setnew_sourceb26b0}= useContext(TotalContext) as TotalContextProps;
  const {text9e1de, settext9e1de}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5, setintegration_source1fae5}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5Props, setintegration_source1fae5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {integrationsource_v1, setintegrationsource_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1',
    [user],
    'GroupIntegrationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "049264434dbba2c04016c1707e0dc7c7");
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
    setintegration_groupdc7c7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button66087((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button66087?.isDisabled==null)
      {
        setrefresh_button66087((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearchc990c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(searchc990c?.isDisabled==null)
      {
        setsearchc990c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_source")){
        setnew_sourceb26b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_sourceb26b0?.isDisabled==null)
      {
        setnew_sourceb26b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext9e1de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text9e1de?.isDisabled==null)
      {
        settext9e1de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source")){
        setintegration_source1fae5Props((pre:any)=>({...pre,...integration_source1fae5,isDisabled:true}));

    }else
    {
      if(integration_source1fae5?.isDisabled==null)
      {
        setintegration_source1fae5Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry0f921,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry0f921,
        codeStates['overall_ai_asset_registry0f921'] = overall_ai_asset_registry0f921Props,
        codeStates['setoverall_ai_asset_registry0f921'] = setoverall_ai_asset_registry0f921Props,
        codeStates['integration_group'] = integration_groupdc7c7,
        codeStates['setintegration_group'] = setintegration_groupdc7c7,
        codeStates['integration_groupdc7c7'] = integration_groupdc7c7Props,
        codeStates['setintegration_groupdc7c7'] = setintegration_groupdc7c7Props,
        codeStates['refresh_button'] = refresh_button66087,
        codeStates['setrefresh_button'] = setrefresh_button66087,
        codeStates['search'] = searchc990c,
        codeStates['setsearch'] = setsearchc990c,
        codeStates['new_source'] = new_sourceb26b0,
        codeStates['setnew_source'] = setnew_sourceb26b0,
        codeStates['text'] = text9e1de,
        codeStates['settext'] = settext9e1de,
        codeStates['integration_source'] = integration_source1fae5,
        codeStates['setintegration_source'] = setintegration_source1fae5,
        codeStates['integration_source1fae5'] = integration_source1fae5Props,
        codeStates['setintegration_source1fae5'] = setintegration_source1fae5Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "049264434dbba2c04016c1707e0dc7c7");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry0f921,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry0f921,
        codeStates['overall_ai_asset_registry0f921'] = overall_ai_asset_registry0f921Props,
        codeStates['setoverall_ai_asset_registry0f921'] = setoverall_ai_asset_registry0f921Props,
        codeStates['integration_group'] = integration_groupdc7c7,
        codeStates['setintegration_group'] = setintegration_groupdc7c7,
        codeStates['integration_groupdc7c7'] = integration_groupdc7c7Props,
        codeStates['setintegration_groupdc7c7'] = setintegration_groupdc7c7Props,
        codeStates['refresh_button'] = refresh_button66087,
        codeStates['setrefresh_button'] = setrefresh_button66087,
        codeStates['search'] = searchc990c,
        codeStates['setsearch'] = setsearchc990c,
        codeStates['new_source'] = new_sourceb26b0,
        codeStates['setnew_source'] = setnew_sourceb26b0,
        codeStates['text'] = text9e1de,
        codeStates['settext'] = settext9e1de,
        codeStates['integration_source'] = integration_source1fae5,
        codeStates['setintegration_source'] = setintegration_source1fae5,
        codeStates['integration_source1fae5'] = integration_source1fae5Props,
        codeStates['setintegration_source1fae5'] = setintegration_source1fae5Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const integration_groupdc7c7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    integration_groupdc7c7Ref.current?.setSearchParams();
    integration_groupdc7c7Ref.current?.handleSearch({});
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
        !Array.isArray(integration_groupdc7c7) &&
        Object.keys(integration_groupdc7c7)?.length > 0
      ) {
        setintegration_groupdc7c7({})
      }
    } else prevRefreshRef.current = true
  }, [integration_groupdc7c7Props?.refresh])


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
      className={`flex flex-col overflow-auto rounded-md p-2 !border border-gray-300 hover:border-gray-400 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setintegrationsource_v1((pre:any)=>({...pre,_selectedGroup_:"integration_group"}))
        }}
    >
        {allowedComponent.includes("integration_source")  &&<Groupintegration_source  
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
        {        ((ruleData?.length>0 && "new_source" in ButtonGoRuleData)?ButtonGoRuleData["new_source"]:true) && 
          allowedControls.includes("new_source")  ?            <Buttonnew_source tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("text") ?<Texttext   /* 9e1de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupintegration_group
