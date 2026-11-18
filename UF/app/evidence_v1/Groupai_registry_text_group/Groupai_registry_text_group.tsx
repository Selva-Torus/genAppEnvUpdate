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
import Textai_registry_text  from "./Textai_registry_text";
import Textai_registry_texts  from "./Textai_registry_texts";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_text_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
      "ai_registry_text",
      "ai_registry_texts"
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
  const {overall_ai_asset_registryc83ea, setoverall_ai_asset_registryc83ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc83eaProps, setoverall_ai_asset_registryc83eaProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdd31c, setai_registry_groupdd31c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdd31cProps, setai_registry_groupdd31cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0df26, setai_registry_text_group0df26}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0df26Props, setai_registry_text_group0df26Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_textf127e, setai_registry_textf127e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_textsc3687, setai_registry_textsc3687}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tableca876, setai_registry_tableca876}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tableca876Props, setai_registry_tableca876Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetevidences_v1, setassetevidences_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetEvidences:AFVK:v1',
    [user],
    'GroupAiRegistryTextGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e78723dbaa5024416113bd2ad530df26");
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
    setai_registry_text_group0df26Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text")){
        setai_registry_textf127e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_textf127e?.isDisabled==null)
      {
        setai_registry_textf127e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_registry_texts")){
        setai_registry_textsc3687((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_textsc3687?.isDisabled==null)
      {
        setai_registry_textsc3687((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc83ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc83ea,
        codeStates['overall_ai_asset_registryc83ea'] = overall_ai_asset_registryc83eaProps,
        codeStates['setoverall_ai_asset_registryc83ea'] = setoverall_ai_asset_registryc83eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdd31c,
        codeStates['setai_registry_group'] = setai_registry_groupdd31c,
        codeStates['ai_registry_groupdd31c'] = ai_registry_groupdd31cProps,
        codeStates['setai_registry_groupdd31c'] = setai_registry_groupdd31cProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group0df26,
        codeStates['setai_registry_text_group'] = setai_registry_text_group0df26,
        codeStates['ai_registry_text_group0df26'] = ai_registry_text_group0df26Props,
        codeStates['setai_registry_text_group0df26'] = setai_registry_text_group0df26Props,
        codeStates['ai_registry_text'] = ai_registry_textf127e,
        codeStates['setai_registry_text'] = setai_registry_textf127e,
        codeStates['ai_registry_texts'] = ai_registry_textsc3687,
        codeStates['setai_registry_texts'] = setai_registry_textsc3687,
        codeStates['ai_registry_table'] = ai_registry_tableca876,
        codeStates['setai_registry_table'] = setai_registry_tableca876,
        codeStates['ai_registry_tableca876'] = ai_registry_tableca876Props,
        codeStates['setai_registry_tableca876'] = setai_registry_tableca876Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e78723dbaa5024416113bd2ad530df26");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc83ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc83ea,
        codeStates['overall_ai_asset_registryc83ea'] = overall_ai_asset_registryc83eaProps,
        codeStates['setoverall_ai_asset_registryc83ea'] = setoverall_ai_asset_registryc83eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdd31c,
        codeStates['setai_registry_group'] = setai_registry_groupdd31c,
        codeStates['ai_registry_groupdd31c'] = ai_registry_groupdd31cProps,
        codeStates['setai_registry_groupdd31c'] = setai_registry_groupdd31cProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group0df26,
        codeStates['setai_registry_text_group'] = setai_registry_text_group0df26,
        codeStates['ai_registry_text_group0df26'] = ai_registry_text_group0df26Props,
        codeStates['setai_registry_text_group0df26'] = setai_registry_text_group0df26Props,
        codeStates['ai_registry_text'] = ai_registry_textf127e,
        codeStates['setai_registry_text'] = setai_registry_textf127e,
        codeStates['ai_registry_texts'] = ai_registry_textsc3687,
        codeStates['setai_registry_texts'] = setai_registry_textsc3687,
        codeStates['ai_registry_table'] = ai_registry_tableca876,
        codeStates['setai_registry_table'] = setai_registry_tableca876,
        codeStates['ai_registry_tableca876'] = ai_registry_tableca876Props,
        codeStates['setai_registry_tableca876'] = setai_registry_tableca876Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_text_group0df26Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_text_group0df26Ref.current?.setSearchParams();
    ai_registry_text_group0df26Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_text_group0df26) &&
        Object.keys(ai_registry_text_group0df26)?.length > 0
      ) {
        setai_registry_text_group0df26({})
        setai_registry_text_group0df26Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_text_group0df26Props?.refresh])


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
        gridColumn: '1 / 16',
        gridRow: '1 / 14',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setassetevidences_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_text_group"}))
        }}
    >
          {allowedControls.includes("ai_registry_text") ?<Textai_registry_text   /* f127e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_registry_texts") ?<Textai_registry_texts   /* c3687 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupai_registry_text_group
