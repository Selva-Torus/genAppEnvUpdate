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
import Textasset_text  from "./Textasset_text";
import Textasset_code_text  from "./Textasset_code_text";
import Textasset_code  from "./Textasset_code";
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textrisk_tier_text  from "./Textrisk_tier_text";
import Textrisk_tier_code  from "./Textrisk_tier_code";
import Textassessed_tier_code_text  from "./Textassessed_tier_code_text";
import Textassessed_tier_code  from "./Textassessed_tier_code";
import Textjustification_text  from "./Textjustification_text";
import Textjustification  from "./Textjustification";
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
  const {dfd_myapprovalrisk_v1Props, setdfd_myapprovalrisk_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_text",
      "asset_code_text",
      "asset_code",
      "asset_name_text",
      "asset_name",
      "risk_tier_text",
      "risk_tier_code",
      "assessed_tier_code_text",
      "assessed_tier_code",
      "justification_text",
      "justification"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
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
  const {overall_ai_asset_registryc00ea, setoverall_ai_asset_registryc00ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc00eaProps, setoverall_ai_asset_registryc00eaProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5d, setai_registry_groupdee5d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5dProps, setai_registry_groupdee5dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4, setgroupf7df4}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4Props, setgroupf7df4Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_text4a506, setasset_text4a506}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta29b2, setasset_code_texta29b2}= useContext(TotalContext) as TotalContextProps;
  const {asset_code7015f, setasset_code7015f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textb0758, setasset_name_textb0758}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee27e8, setasset_namee27e8}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_texta2f95, setrisk_tier_texta2f95}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code89845, setrisk_tier_code89845}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code_text0fb21, setassessed_tier_code_text0fb21}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code6f8d5, setassessed_tier_code6f8d5}= useContext(TotalContext) as TotalContextProps;
  const {justification_text513cf, setjustification_text513cf}= useContext(TotalContext) as TotalContextProps;
  const {justificationcf400, setjustificationcf400}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewruleevaluation_v1, setviewruleevaluation_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewRuleEvaluation:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "37128d1e695956cc8058d049f91f7df4");
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
    setgroupf7df4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_text")){
        setasset_text4a506((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_text4a506?.isDisabled==null)
      {
        setasset_text4a506((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code_text")){
        setasset_code_texta29b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code_texta29b2?.isDisabled==null)
      {
        setasset_code_texta29b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code7015f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code7015f?.isDisabled==null)
      {
        setasset_code7015f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_textb0758((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_textb0758?.isDisabled==null)
      {
        setasset_name_textb0758((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namee27e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namee27e8?.isDisabled==null)
      {
        setasset_namee27e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_text")){
        setrisk_tier_texta2f95((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_texta2f95?.isDisabled==null)
      {
        setrisk_tier_texta2f95((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code89845((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code89845?.isDisabled==null)
      {
        setrisk_tier_code89845((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_tier_code_text")){
        setassessed_tier_code_text0fb21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_tier_code_text0fb21?.isDisabled==null)
      {
        setassessed_tier_code_text0fb21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_tier_code")){
        setassessed_tier_code6f8d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_tier_code6f8d5?.isDisabled==null)
      {
        setassessed_tier_code6f8d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("justification_text")){
        setjustification_text513cf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(justification_text513cf?.isDisabled==null)
      {
        setjustification_text513cf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("justification")){
        setjustificationcf400((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(justificationcf400?.isDisabled==null)
      {
        setjustificationcf400((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc00ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc00ea,
        codeStates['overall_ai_asset_registryc00ea'] = overall_ai_asset_registryc00eaProps,
        codeStates['setoverall_ai_asset_registryc00ea'] = setoverall_ai_asset_registryc00eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdee5d,
        codeStates['setai_registry_group'] = setai_registry_groupdee5d,
        codeStates['ai_registry_groupdee5d'] = ai_registry_groupdee5dProps,
        codeStates['setai_registry_groupdee5d'] = setai_registry_groupdee5dProps,
        codeStates['group'] = groupf7df4,
        codeStates['setgroup'] = setgroupf7df4,
        codeStates['groupf7df4'] = groupf7df4Props,
        codeStates['setgroupf7df4'] = setgroupf7df4Props,
        codeStates['asset_text'] = asset_text4a506,
        codeStates['setasset_text'] = setasset_text4a506,
        codeStates['asset_code_text'] = asset_code_texta29b2,
        codeStates['setasset_code_text'] = setasset_code_texta29b2,
        codeStates['asset_code'] = asset_code7015f,
        codeStates['setasset_code'] = setasset_code7015f,
        codeStates['asset_name_text'] = asset_name_textb0758,
        codeStates['setasset_name_text'] = setasset_name_textb0758,
        codeStates['asset_name'] = asset_namee27e8,
        codeStates['setasset_name'] = setasset_namee27e8,
        codeStates['risk_tier_text'] = risk_tier_texta2f95,
        codeStates['setrisk_tier_text'] = setrisk_tier_texta2f95,
        codeStates['risk_tier_code'] = risk_tier_code89845,
        codeStates['setrisk_tier_code'] = setrisk_tier_code89845,
        codeStates['assessed_tier_code_text'] = assessed_tier_code_text0fb21,
        codeStates['setassessed_tier_code_text'] = setassessed_tier_code_text0fb21,
        codeStates['assessed_tier_code'] = assessed_tier_code6f8d5,
        codeStates['setassessed_tier_code'] = setassessed_tier_code6f8d5,
        codeStates['justification_text'] = justification_text513cf,
        codeStates['setjustification_text'] = setjustification_text513cf,
        codeStates['justification'] = justificationcf400,
        codeStates['setjustification'] = setjustificationcf400,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "37128d1e695956cc8058d049f91f7df4");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc00ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc00ea,
        codeStates['overall_ai_asset_registryc00ea'] = overall_ai_asset_registryc00eaProps,
        codeStates['setoverall_ai_asset_registryc00ea'] = setoverall_ai_asset_registryc00eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdee5d,
        codeStates['setai_registry_group'] = setai_registry_groupdee5d,
        codeStates['ai_registry_groupdee5d'] = ai_registry_groupdee5dProps,
        codeStates['setai_registry_groupdee5d'] = setai_registry_groupdee5dProps,
        codeStates['group'] = groupf7df4,
        codeStates['setgroup'] = setgroupf7df4,
        codeStates['groupf7df4'] = groupf7df4Props,
        codeStates['setgroupf7df4'] = setgroupf7df4Props,
        codeStates['asset_text'] = asset_text4a506,
        codeStates['setasset_text'] = setasset_text4a506,
        codeStates['asset_code_text'] = asset_code_texta29b2,
        codeStates['setasset_code_text'] = setasset_code_texta29b2,
        codeStates['asset_code'] = asset_code7015f,
        codeStates['setasset_code'] = setasset_code7015f,
        codeStates['asset_name_text'] = asset_name_textb0758,
        codeStates['setasset_name_text'] = setasset_name_textb0758,
        codeStates['asset_name'] = asset_namee27e8,
        codeStates['setasset_name'] = setasset_namee27e8,
        codeStates['risk_tier_text'] = risk_tier_texta2f95,
        codeStates['setrisk_tier_text'] = setrisk_tier_texta2f95,
        codeStates['risk_tier_code'] = risk_tier_code89845,
        codeStates['setrisk_tier_code'] = setrisk_tier_code89845,
        codeStates['assessed_tier_code_text'] = assessed_tier_code_text0fb21,
        codeStates['setassessed_tier_code_text'] = setassessed_tier_code_text0fb21,
        codeStates['assessed_tier_code'] = assessed_tier_code6f8d5,
        codeStates['setassessed_tier_code'] = setassessed_tier_code6f8d5,
        codeStates['justification_text'] = justification_text513cf,
        codeStates['setjustification_text'] = setjustification_text513cf,
        codeStates['justification'] = justificationcf400,
        codeStates['setjustification'] = setjustificationcf400,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupf7df4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupf7df4Ref.current?.setSearchParams();
    groupf7df4Ref.current?.handleSearch({});
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
        !Array.isArray(groupf7df4) &&
        Object.keys(groupf7df4)?.length > 0
      ) {
        setgroupf7df4({})
        setgroupf7df4Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [groupf7df4Props?.refresh])


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
        gridRow: '1 / 59',
      
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
      className={`flex flex-col overflow-auto rounded-md p-4 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewruleevaluation_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("asset_text") ?<Textasset_text   /* 4a506 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code_text") ?<Textasset_code_text   /* a29b2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_code") ?<Textasset_code   /* 7015f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* b0758 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* e27e8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_text") ?<Textrisk_tier_text   /* a2f95 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_tier_code") ?<Textrisk_tier_code   /* 89845 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assessed_tier_code_text") ?<Textassessed_tier_code_text   /* 0fb21 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assessed_tier_code") ?<Textassessed_tier_code   /* 6f8d5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("justification_text") ?<Textjustification_text   /* 513cf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("justification") ?<Textjustification   /* cf400 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
