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
import Groupai_registry_table  from "../Groupai_registry_table/Groupai_registry_table";
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
import Buttonadd_ai_registry  from "./Buttonadd_ai_registry";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_ai_registry"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
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
  const {overall_ai_asset_registry28d63, setoverall_ai_asset_registry28d63}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry28d63Props, setoverall_ai_asset_registry28d63Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101, setai_registry_groupd4101}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101Props, setai_registry_groupd4101Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1e, setai_registry_text_group0da1e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1eProps, setai_registry_text_group0da1eProps}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button5aae2, setrefresh_button5aae2}= useContext(TotalContext) as TotalContextProps;
  const {search1ee9a, setsearch1ee9a}= useContext(TotalContext) as TotalContextProps;
  const {add_ai_registry6e47a, setadd_ai_registry6e47a}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906, setai_registry_table8e906}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906Props, setai_registry_table8e906Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {credentialreferencelist_v1, setcredentialreferencelist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:credentialReferenceList:AFVK:v1',
    [user],
    'GroupAiRegistryGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f082ab9a2459f4def4abc458e62d4101");
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
    setai_registry_groupd4101Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text_group")){
        setai_registry_text_group0da1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_text_group0da1e?.isDisabled==null)
      {
        setai_registry_text_group0da1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button5aae2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button5aae2?.isDisabled==null)
      {
        setrefresh_button5aae2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch1ee9a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search1ee9a?.isDisabled==null)
      {
        setsearch1ee9a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_ai_registry")){
        setadd_ai_registry6e47a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_ai_registry6e47a?.isDisabled==null)
      {
        setadd_ai_registry6e47a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_registry_table")){
        setai_registry_table8e906Props((pre:any)=>({...pre,...ai_registry_table8e906,isDisabled:true}));

    }else
    {
      if(ai_registry_table8e906?.isDisabled==null)
      {
        setai_registry_table8e906Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry28d63,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry28d63,
        codeStates['overall_ai_asset_registry28d63'] = overall_ai_asset_registry28d63Props,
        codeStates['setoverall_ai_asset_registry28d63'] = setoverall_ai_asset_registry28d63Props,
        codeStates['ai_registry_group'] = ai_registry_groupd4101,
        codeStates['setai_registry_group'] = setai_registry_groupd4101,
        codeStates['ai_registry_groupd4101'] = ai_registry_groupd4101Props,
        codeStates['setai_registry_groupd4101'] = setai_registry_groupd4101Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group0da1e,
        codeStates['setai_registry_text_group'] = setai_registry_text_group0da1e,
        codeStates['ai_registry_text_group0da1e'] = ai_registry_text_group0da1eProps,
        codeStates['setai_registry_text_group0da1e'] = setai_registry_text_group0da1eProps,
        codeStates['refresh_button'] = refresh_button5aae2,
        codeStates['setrefresh_button'] = setrefresh_button5aae2,
        codeStates['search'] = search1ee9a,
        codeStates['setsearch'] = setsearch1ee9a,
        codeStates['add_ai_registry'] = add_ai_registry6e47a,
        codeStates['setadd_ai_registry'] = setadd_ai_registry6e47a,
        codeStates['ai_registry_table'] = ai_registry_table8e906,
        codeStates['setai_registry_table'] = setai_registry_table8e906,
        codeStates['ai_registry_table8e906'] = ai_registry_table8e906Props,
        codeStates['setai_registry_table8e906'] = setai_registry_table8e906Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f082ab9a2459f4def4abc458e62d4101");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry28d63,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry28d63,
        codeStates['overall_ai_asset_registry28d63'] = overall_ai_asset_registry28d63Props,
        codeStates['setoverall_ai_asset_registry28d63'] = setoverall_ai_asset_registry28d63Props,
        codeStates['ai_registry_group'] = ai_registry_groupd4101,
        codeStates['setai_registry_group'] = setai_registry_groupd4101,
        codeStates['ai_registry_groupd4101'] = ai_registry_groupd4101Props,
        codeStates['setai_registry_groupd4101'] = setai_registry_groupd4101Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group0da1e,
        codeStates['setai_registry_text_group'] = setai_registry_text_group0da1e,
        codeStates['ai_registry_text_group0da1e'] = ai_registry_text_group0da1eProps,
        codeStates['setai_registry_text_group0da1e'] = setai_registry_text_group0da1eProps,
        codeStates['refresh_button'] = refresh_button5aae2,
        codeStates['setrefresh_button'] = setrefresh_button5aae2,
        codeStates['search'] = search1ee9a,
        codeStates['setsearch'] = setsearch1ee9a,
        codeStates['add_ai_registry'] = add_ai_registry6e47a,
        codeStates['setadd_ai_registry'] = setadd_ai_registry6e47a,
        codeStates['ai_registry_table'] = ai_registry_table8e906,
        codeStates['setai_registry_table'] = setai_registry_table8e906,
        codeStates['ai_registry_table8e906'] = ai_registry_table8e906Props,
        codeStates['setai_registry_table8e906'] = setai_registry_table8e906Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_groupd4101Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_groupd4101Ref.current?.setSearchParams();
    ai_registry_groupd4101Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_groupd4101) &&
        Object.keys(ai_registry_groupd4101)?.length > 0
      ) {
        setai_registry_groupd4101({})
        setai_registry_groupd4101Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_groupd4101Props?.refresh])


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
        gridRow: '1 / 141',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#f5f5f7',
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
          setcredentialreferencelist_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_group"}))
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
        {allowedComponent.includes("ai_registry_table")  &&<Groupai_registry_table  
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
        {        ((ruleData?.length>0 && "add_ai_registry" in ButtonGoRuleData)?ButtonGoRuleData["add_ai_registry"]:true) && 
          allowedControls.includes("add_ai_registry")  ?            <Buttonadd_ai_registry tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_registry_group
