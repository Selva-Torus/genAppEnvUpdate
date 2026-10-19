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
  const {dfd_certificationstagestable_v1Props, setdfd_certificationstagestable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "certificate_table"
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
      "certificate_table"
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
      "certificate_table"
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
      "certificate_table"
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
      "certificate_table"
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
      "certificate_table"
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
  const {overall_groupf5901, setoverall_groupf5901}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupf5901Props, setoverall_groupf5901Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682b, setai_asset_version_table_groupa682b}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682bProps, setai_asset_version_table_groupa682bProps}= useContext(TotalContext) as TotalContextProps;
  const {group6f907, setgroup6f907}= useContext(TotalContext) as TotalContextProps;
  const {group6f907Props, setgroup6f907Props}= useContext(TotalContext) as TotalContextProps;
  const {textb8f60, settextb8f60}= useContext(TotalContext) as TotalContextProps;
  const {asset_code2ec46, setasset_code2ec46}= useContext(TotalContext) as TotalContextProps;
  const {asset_name11425, setasset_name11425}= useContext(TotalContext) as TotalContextProps;
  const {cert_coded232c, setcert_coded232c}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01d, setcertificate_tablebc01d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01dProps, setcertificate_tablebc01dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificationstages_v1, setcertificationstages_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationStages:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3445234cb486d40e10739e854876f907");
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
    setgroup6f907Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextb8f60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textb8f60?.isDisabled==null)
      {
        settextb8f60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code2ec46((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code2ec46?.isDisabled==null)
      {
        setasset_code2ec46((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name11425((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name11425?.isDisabled==null)
      {
        setasset_name11425((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_coded232c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_coded232c?.isDisabled==null)
      {
        setcert_coded232c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupf5901,
        codeStates['setoverall_group'] = setoverall_groupf5901,
        codeStates['overall_groupf5901'] = overall_groupf5901Props,
        codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
        codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
        codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
        codeStates['group'] = group6f907,
        codeStates['setgroup'] = setgroup6f907,
        codeStates['group6f907'] = group6f907Props,
        codeStates['setgroup6f907'] = setgroup6f907Props,
        codeStates['text'] = textb8f60,
        codeStates['settext'] = settextb8f60,
        codeStates['asset_code'] = asset_code2ec46,
        codeStates['setasset_code'] = setasset_code2ec46,
        codeStates['asset_name'] = asset_name11425,
        codeStates['setasset_name'] = setasset_name11425,
        codeStates['cert_code'] = cert_coded232c,
        codeStates['setcert_code'] = setcert_coded232c,
        codeStates['certificate_table'] = certificate_tablebc01d,
        codeStates['setcertificate_table'] = setcertificate_tablebc01d,
        codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
        codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3445234cb486d40e10739e854876f907");
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
        codeStates['overall_group'] = overall_groupf5901,
        codeStates['setoverall_group'] = setoverall_groupf5901,
        codeStates['overall_groupf5901'] = overall_groupf5901Props,
        codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
        codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
        codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
        codeStates['group'] = group6f907,
        codeStates['setgroup'] = setgroup6f907,
        codeStates['group6f907'] = group6f907Props,
        codeStates['setgroup6f907'] = setgroup6f907Props,
        codeStates['text'] = textb8f60,
        codeStates['settext'] = settextb8f60,
        codeStates['asset_code'] = asset_code2ec46,
        codeStates['setasset_code'] = setasset_code2ec46,
        codeStates['asset_name'] = asset_name11425,
        codeStates['setasset_name'] = setasset_name11425,
        codeStates['cert_code'] = cert_coded232c,
        codeStates['setcert_code'] = setcert_coded232c,
        codeStates['certificate_table'] = certificate_tablebc01d,
        codeStates['setcertificate_table'] = setcertificate_tablebc01d,
        codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
        codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group6f907Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group6f907Ref.current?.setSearchParams();
    group6f907Ref.current?.handleSearch({});
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
        !Array.isArray(group6f907) &&
        Object.keys(group6f907)?.length > 0
      ) {
        setgroup6f907({})
        setgroup6f907Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group6f907Props?.refresh])


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
          setcertificationstages_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* b8f60 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* 2ec46 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 11425 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_code") ?<TextInputcert_code   /* d232c */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
