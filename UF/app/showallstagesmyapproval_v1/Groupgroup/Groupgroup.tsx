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
import Texttext  from "./Texttext";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputcert_code  from "./TextInputcert_code";
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
  const {dfd_listallshowstages_v1Props, setdfd_listallshowstages_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
  const {overall_groupc4a49, setoverall_groupc4a49}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupc4a49Props, setoverall_groupc4a49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27, setai_asset_version_table_group1bd27}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27Props, setai_asset_version_table_group1bd27Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012, setgroupe4012}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012Props, setgroupe4012Props}= useContext(TotalContext) as TotalContextProps;
  const {textab450, settextab450}= useContext(TotalContext) as TotalContextProps;
  const {asset_coded6048, setasset_coded6048}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0b551, setasset_name0b551}= useContext(TotalContext) as TotalContextProps;
  const {cert_codecea1f, setcert_codecea1f}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99eb, setstages_tableb99eb}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99ebProps, setstages_tableb99ebProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {showallstagesmyapproval_v1, setshowallstagesmyapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:showallStagesMyApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2d5640c7eecabc597165c9b26f7e4012");
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
    setgroupe4012Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextab450((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textab450?.isDisabled==null)
      {
        settextab450((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_coded6048((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_coded6048?.isDisabled==null)
      {
        setasset_coded6048((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name0b551((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name0b551?.isDisabled==null)
      {
        setasset_name0b551((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_codecea1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_codecea1f?.isDisabled==null)
      {
        setcert_codecea1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['text'] = textab450,
        codeStates['settext'] = settextab450,
        codeStates['asset_code'] = asset_coded6048,
        codeStates['setasset_code'] = setasset_coded6048,
        codeStates['asset_name'] = asset_name0b551,
        codeStates['setasset_name'] = setasset_name0b551,
        codeStates['cert_code'] = cert_codecea1f,
        codeStates['setcert_code'] = setcert_codecea1f,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2d5640c7eecabc597165c9b26f7e4012");
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
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['text'] = textab450,
        codeStates['settext'] = settextab450,
        codeStates['asset_code'] = asset_coded6048,
        codeStates['setasset_code'] = setasset_coded6048,
        codeStates['asset_name'] = asset_name0b551,
        codeStates['setasset_name'] = setasset_name0b551,
        codeStates['cert_code'] = cert_codecea1f,
        codeStates['setcert_code'] = setcert_codecea1f,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupe4012Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupe4012Ref.current?.setSearchParams();
    groupe4012Ref.current?.handleSearch({});
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
        !Array.isArray(groupe4012) &&
        Object.keys(groupe4012)?.length > 0
      ) {
        setgroupe4012({})
        setgroupe4012Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [groupe4012Props?.refresh])


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
        gridRow: '1 / 27',
      
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
          setshowallstagesmyapproval_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* ab450 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* d6048 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 0b551 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_code") ?<TextInputcert_code   /* cea1f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
