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
  const {dfd_agentcertificatetable_v1Props, setdfd_agentcertificatetable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "asset_code",
      "asset_name"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
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
  const {overall_group6cd49, setoverall_group6cd49}= useContext(TotalContext) as TotalContextProps;
  const {overall_group6cd49Props, setoverall_group6cd49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48d, setai_asset_version_table_group1b48d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48dProps, setai_asset_version_table_group1b48dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3, setgroupa86a3}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3Props, setgroupa86a3Props}= useContext(TotalContext) as TotalContextProps;
  const {textff0b2, settextff0b2}= useContext(TotalContext) as TotalContextProps;
  const {asset_codefdd43, setasset_codefdd43}= useContext(TotalContext) as TotalContextProps;
  const {asset_namefcdb4, setasset_namefcdb4}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8, setcertificate_table48fb8}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8Props, setcertificate_table48fb8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {myapprovalcert_v1, setmyapprovalcert_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:myapprovalCert:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d579c1aba846ccbf0250286bc61a86a3");
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
    setgroupa86a3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextff0b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textff0b2?.isDisabled==null)
      {
        settextff0b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_codefdd43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_codefdd43?.isDisabled==null)
      {
        setasset_codefdd43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namefcdb4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namefcdb4?.isDisabled==null)
      {
        setasset_namefcdb4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group6cd49,
        codeStates['setoverall_group'] = setoverall_group6cd49,
        codeStates['overall_group6cd49'] = overall_group6cd49Props,
        codeStates['setoverall_group6cd49'] = setoverall_group6cd49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1b48d,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1b48d,
        codeStates['ai_asset_version_table_group1b48d'] = ai_asset_version_table_group1b48dProps,
        codeStates['setai_asset_version_table_group1b48d'] = setai_asset_version_table_group1b48dProps,
        codeStates['group'] = groupa86a3,
        codeStates['setgroup'] = setgroupa86a3,
        codeStates['groupa86a3'] = groupa86a3Props,
        codeStates['setgroupa86a3'] = setgroupa86a3Props,
        codeStates['text'] = textff0b2,
        codeStates['settext'] = settextff0b2,
        codeStates['asset_code'] = asset_codefdd43,
        codeStates['setasset_code'] = setasset_codefdd43,
        codeStates['asset_name'] = asset_namefcdb4,
        codeStates['setasset_name'] = setasset_namefcdb4,
        codeStates['certificate_table'] = certificate_table48fb8,
        codeStates['setcertificate_table'] = setcertificate_table48fb8,
        codeStates['certificate_table48fb8'] = certificate_table48fb8Props,
        codeStates['setcertificate_table48fb8'] = setcertificate_table48fb8Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d579c1aba846ccbf0250286bc61a86a3");
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
        codeStates['overall_group'] = overall_group6cd49,
        codeStates['setoverall_group'] = setoverall_group6cd49,
        codeStates['overall_group6cd49'] = overall_group6cd49Props,
        codeStates['setoverall_group6cd49'] = setoverall_group6cd49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1b48d,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1b48d,
        codeStates['ai_asset_version_table_group1b48d'] = ai_asset_version_table_group1b48dProps,
        codeStates['setai_asset_version_table_group1b48d'] = setai_asset_version_table_group1b48dProps,
        codeStates['group'] = groupa86a3,
        codeStates['setgroup'] = setgroupa86a3,
        codeStates['groupa86a3'] = groupa86a3Props,
        codeStates['setgroupa86a3'] = setgroupa86a3Props,
        codeStates['text'] = textff0b2,
        codeStates['settext'] = settextff0b2,
        codeStates['asset_code'] = asset_codefdd43,
        codeStates['setasset_code'] = setasset_codefdd43,
        codeStates['asset_name'] = asset_namefcdb4,
        codeStates['setasset_name'] = setasset_namefcdb4,
        codeStates['certificate_table'] = certificate_table48fb8,
        codeStates['setcertificate_table'] = setcertificate_table48fb8,
        codeStates['certificate_table48fb8'] = certificate_table48fb8Props,
        codeStates['setcertificate_table48fb8'] = setcertificate_table48fb8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupa86a3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupa86a3Ref.current?.setSearchParams();
    groupa86a3Ref.current?.handleSearch({});
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
        !Array.isArray(groupa86a3) &&
        Object.keys(groupa86a3)?.length > 0
      ) {
        setgroupa86a3({})
        setgroupa86a3Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [groupa86a3Props?.refresh])


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
          setmyapprovalcert_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* ff0b2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* fdd43 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* fcdb4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
