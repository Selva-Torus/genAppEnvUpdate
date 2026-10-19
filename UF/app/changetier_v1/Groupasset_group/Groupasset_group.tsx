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
import Dropdownassessed_tier_code  from "./Dropdownassessed_tier_code";
import TextAreajustification  from "./TextAreajustification";
import Textdesc_text  from "./Textdesc_text";
import Dropdownassigned_login_name  from "./Dropdownassigned_login_name";
import Textdescs_text  from "./Textdescs_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupasset_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_businessownercombo_v1Props, setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tierassessment_v1Props, setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "assessed_tier_code",
      "justification",
      "desc_text",
      "assigned_login_name",
      "descs_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "asset_group"
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
  const {code_value_groupa2e67, setcode_value_groupa2e67}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67Props, setcode_value_groupa2e67Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0, setasset_group181c0}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0Props, setasset_group181c0Props}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code8866c, setassessed_tier_code8866c}= useContext(TotalContext) as TotalContextProps;
  const {justificationc41ce, setjustificationc41ce}= useContext(TotalContext) as TotalContextProps;
  const {desc_texta0702, setdesc_texta0702}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name8a256, setassigned_login_name8a256}= useContext(TotalContext) as TotalContextProps;
  const {descs_text2e8fe, setdescs_text2e8fe}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {changetier_v1, setchangetier_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:changeTier:AFVK:v1',
    [user],
    'GroupAssetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ea9bd4cdc3847f7ace4026cc310181c0");
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
    setasset_group181c0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assessed_tier_code")){
        setassessed_tier_code8866c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_tier_code8866c?.isDisabled==null)
      {
        setassessed_tier_code8866c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("justification")){
        setjustificationc41ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(justificationc41ce?.isDisabled==null)
      {
        setjustificationc41ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("desc_text")){
        setdesc_texta0702((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(desc_texta0702?.isDisabled==null)
      {
        setdesc_texta0702((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_login_name")){
        setassigned_login_name8a256((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assigned_login_name8a256?.isDisabled==null)
      {
        setassigned_login_name8a256((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("descs_text")){
        setdescs_text2e8fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(descs_text2e8fe?.isDisabled==null)
      {
        setdescs_text2e8fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_groupa2e67,
        codeStates['setcode_value_group'] = setcode_value_groupa2e67,
        codeStates['code_value_groupa2e67'] = code_value_groupa2e67Props,
        codeStates['setcode_value_groupa2e67'] = setcode_value_groupa2e67Props,
        codeStates['asset_group'] = asset_group181c0,
        codeStates['setasset_group'] = setasset_group181c0,
        codeStates['asset_group181c0'] = asset_group181c0Props,
        codeStates['setasset_group181c0'] = setasset_group181c0Props,
        codeStates['assessed_tier_code'] = assessed_tier_code8866c,
        codeStates['setassessed_tier_code'] = setassessed_tier_code8866c,
        codeStates['justification'] = justificationc41ce,
        codeStates['setjustification'] = setjustificationc41ce,
        codeStates['desc_text'] = desc_texta0702,
        codeStates['setdesc_text'] = setdesc_texta0702,
        codeStates['assigned_login_name'] = assigned_login_name8a256,
        codeStates['setassigned_login_name'] = setassigned_login_name8a256,
        codeStates['descs_text'] = descs_text2e8fe,
        codeStates['setdescs_text'] = setdescs_text2e8fe,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ea9bd4cdc3847f7ace4026cc310181c0");
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
        codeStates['code_value_group'] = code_value_groupa2e67,
        codeStates['setcode_value_group'] = setcode_value_groupa2e67,
        codeStates['code_value_groupa2e67'] = code_value_groupa2e67Props,
        codeStates['setcode_value_groupa2e67'] = setcode_value_groupa2e67Props,
        codeStates['asset_group'] = asset_group181c0,
        codeStates['setasset_group'] = setasset_group181c0,
        codeStates['asset_group181c0'] = asset_group181c0Props,
        codeStates['setasset_group181c0'] = setasset_group181c0Props,
        codeStates['assessed_tier_code'] = assessed_tier_code8866c,
        codeStates['setassessed_tier_code'] = setassessed_tier_code8866c,
        codeStates['justification'] = justificationc41ce,
        codeStates['setjustification'] = setjustificationc41ce,
        codeStates['desc_text'] = desc_texta0702,
        codeStates['setdesc_text'] = setdesc_texta0702,
        codeStates['assigned_login_name'] = assigned_login_name8a256,
        codeStates['setassigned_login_name'] = setassigned_login_name8a256,
        codeStates['descs_text'] = descs_text2e8fe,
        codeStates['setdescs_text'] = setdescs_text2e8fe,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const asset_group181c0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    asset_group181c0Ref.current?.setSearchParams();
    asset_group181c0Ref.current?.handleSearch({});
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
        !Array.isArray(asset_group181c0) &&
        Object.keys(asset_group181c0)?.length > 0
      ) {
        setasset_group181c0({})
        setasset_group181c0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [asset_group181c0Props?.refresh])


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
        gridRow: '1 / 77',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#ffffff',
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
          setchangetier_v1((pre:any)=>({...pre,_selectedGroup_:"asset_group"}))
        }}
    >
        {allowedControls.includes("assessed_tier_code") ?<Dropdownassessed_tier_code   /* 8866c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("justification") ?<TextAreajustification   /* c41ce */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("desc_text") ?<Textdesc_text   /* a0702 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_login_name") ?<Dropdownassigned_login_name   /* 8a256 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("descs_text") ?<Textdescs_text   /* 2e8fe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupasset_group
