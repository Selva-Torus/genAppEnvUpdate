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
import Textmodel_information_text  from "./Textmodel_information_text";
import Texttext  from "./Texttext";
import Texttext1  from "./Texttext1";
import Texttext2  from "./Texttext2";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputrisk_tier_code  from "./TextInputrisk_tier_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmodel_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_applycertificatetempname_v1Props, setdfd_applycertificatetempname_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertstatuscombo_v1Props, setdfd_applycertstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatestagecombo_v1Props, setdfd_applycertificatestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "model_information_text",
      "text",
      "text1",
      "text2",
      "asset_code",
      "asset_name",
      "risk_tier_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_information_text5b740, setmodel_information_text5b740}= useContext(TotalContext) as TotalContextProps;
  const {text0abdf, settext0abdf}= useContext(TotalContext) as TotalContextProps;
  const {text124429, settext124429}= useContext(TotalContext) as TotalContextProps;
  const {text2a1105, settext2a1105}= useContext(TotalContext) as TotalContextProps;
  const {asset_codec72a5, setasset_codec72a5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name63a71, setasset_name63a71}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code0c018, setrisk_tier_code0c018}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {applycertification_v1, setapplycertification_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1',
    [user],
    'GroupModelInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8aa47a99ccff8aca769ac2cf021425e9");
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
    setmodel_info_group425e9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("model_information_text")){
        setmodel_information_text5b740((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_information_text5b740?.isDisabled==null)
      {
        setmodel_information_text5b740((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext0abdf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text0abdf?.isDisabled==null)
      {
        settext0abdf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text1")){
        settext124429((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text124429?.isDisabled==null)
      {
        settext124429((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text2")){
        settext2a1105((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text2a1105?.isDisabled==null)
      {
        settext2a1105((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_codec72a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_codec72a5?.isDisabled==null)
      {
        setasset_codec72a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name63a71((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name63a71?.isDisabled==null)
      {
        setasset_name63a71((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code0c018((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code0c018?.isDisabled==null)
      {
        setrisk_tier_code0c018((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['model_information_text'] = model_information_text5b740,
        codeStates['setmodel_information_text'] = setmodel_information_text5b740,
        codeStates['text'] = text0abdf,
        codeStates['settext'] = settext0abdf,
        codeStates['text1'] = text124429,
        codeStates['settext1'] = settext124429,
        codeStates['text2'] = text2a1105,
        codeStates['settext2'] = settext2a1105,
        codeStates['asset_code'] = asset_codec72a5,
        codeStates['setasset_code'] = setasset_codec72a5,
        codeStates['asset_name'] = asset_name63a71,
        codeStates['setasset_name'] = setasset_name63a71,
        codeStates['risk_tier_code'] = risk_tier_code0c018,
        codeStates['setrisk_tier_code'] = setrisk_tier_code0c018,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8aa47a99ccff8aca769ac2cf021425e9");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['model_information_text'] = model_information_text5b740,
        codeStates['setmodel_information_text'] = setmodel_information_text5b740,
        codeStates['text'] = text0abdf,
        codeStates['settext'] = settext0abdf,
        codeStates['text1'] = text124429,
        codeStates['settext1'] = settext124429,
        codeStates['text2'] = text2a1105,
        codeStates['settext2'] = settext2a1105,
        codeStates['asset_code'] = asset_codec72a5,
        codeStates['setasset_code'] = setasset_codec72a5,
        codeStates['asset_name'] = asset_name63a71,
        codeStates['setasset_name'] = setasset_name63a71,
        codeStates['risk_tier_code'] = risk_tier_code0c018,
        codeStates['setrisk_tier_code'] = setrisk_tier_code0c018,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const model_info_group425e9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    model_info_group425e9Ref.current?.setSearchParams();
    model_info_group425e9Ref.current?.handleSearch({});
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
        !Array.isArray(model_info_group425e9) &&
        Object.keys(model_info_group425e9)?.length > 0
      ) {
        setmodel_info_group425e9({})
        setmodel_info_group425e9Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [model_info_group425e9Props?.refresh])


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
        gridRow: '1 / 28',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setapplycertification_v1((pre:any)=>({...pre,_selectedGroup_:"model_info_group"}))
        }}
    >
          {allowedControls.includes("model_information_text") ?<Textmodel_information_text   /* 5b740 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 0abdf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text1") ?<Texttext1   /* 24429 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text2") ?<Texttext2   /* a1105 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* c72a5 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 63a71 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("risk_tier_code") ?<TextInputrisk_tier_code   /* 0c018 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupmodel_info_group
