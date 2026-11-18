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
import Textasst_name_text  from "./Textasst_name_text";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputasset_name  from "./TextInputasset_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassets_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asst_name_text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
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
  const {group90bf1, setgroup90bf1}= useContext(TotalContext) as TotalContextProps;
  const {group90bf1Props, setgroup90bf1Props}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88, setassets_group37c88}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88Props, setassets_group37c88Props}= useContext(TotalContext) as TotalContextProps;
  const {asst_name_text714f6, setasst_name_text714f6}= useContext(TotalContext) as TotalContextProps;
  const {asset_code6783b, setasset_code6783b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name8f414, setasset_name8f414}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5, settool_grant_tabled00d5}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5Props, settool_grant_tabled00d5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {toolgrant_v1, settoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1',
    [user],
    'GroupAssetsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "990c78ffe64b4aec8967135ec6137c88");
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
    setassets_group37c88Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asst_name_text")){
        setasst_name_text714f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asst_name_text714f6?.isDisabled==null)
      {
        setasst_name_text714f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code6783b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code6783b?.isDisabled==null)
      {
        setasset_code6783b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name8f414((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name8f414?.isDisabled==null)
      {
        setasset_name8f414((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group90bf1,
        codeStates['setgroup'] = setgroup90bf1,
        codeStates['group90bf1'] = group90bf1Props,
        codeStates['setgroup90bf1'] = setgroup90bf1Props,
        codeStates['assets_group'] = assets_group37c88,
        codeStates['setassets_group'] = setassets_group37c88,
        codeStates['assets_group37c88'] = assets_group37c88Props,
        codeStates['setassets_group37c88'] = setassets_group37c88Props,
        codeStates['asst_name_text'] = asst_name_text714f6,
        codeStates['setasst_name_text'] = setasst_name_text714f6,
        codeStates['asset_code'] = asset_code6783b,
        codeStates['setasset_code'] = setasset_code6783b,
        codeStates['asset_name'] = asset_name8f414,
        codeStates['setasset_name'] = setasset_name8f414,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "990c78ffe64b4aec8967135ec6137c88");
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
        codeStates['group'] = group90bf1,
        codeStates['setgroup'] = setgroup90bf1,
        codeStates['group90bf1'] = group90bf1Props,
        codeStates['setgroup90bf1'] = setgroup90bf1Props,
        codeStates['assets_group'] = assets_group37c88,
        codeStates['setassets_group'] = setassets_group37c88,
        codeStates['assets_group37c88'] = assets_group37c88Props,
        codeStates['setassets_group37c88'] = setassets_group37c88Props,
        codeStates['asst_name_text'] = asst_name_text714f6,
        codeStates['setasst_name_text'] = setasst_name_text714f6,
        codeStates['asset_code'] = asset_code6783b,
        codeStates['setasset_code'] = setasset_code6783b,
        codeStates['asset_name'] = asset_name8f414,
        codeStates['setasset_name'] = setasset_name8f414,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assets_group37c88Ref = useRef<any>(null);
  const handleClearSearch = () => {
    assets_group37c88Ref.current?.setSearchParams();
    assets_group37c88Ref.current?.handleSearch({});
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
        !Array.isArray(assets_group37c88) &&
        Object.keys(assets_group37c88)?.length > 0
      ) {
        setassets_group37c88({})
        setassets_group37c88Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [assets_group37c88Props?.refresh])


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
        gridRow: '10 / 36',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
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
          settoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"assets_group"}))
        }}
    >
          {allowedControls.includes("asst_name_text") ?<Textasst_name_text   /* 714f6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* 6783b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 8f414 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassets_group
