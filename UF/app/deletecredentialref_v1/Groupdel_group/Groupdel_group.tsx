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
import Textdelete_heading_txt  from "./Textdelete_heading_txt";
import Dividerdel_divider_1  from "./Dividerdel_divider_1";
import Textref_name_text  from "./Textref_name_text";
import Textref_name  from "./Textref_name";
import Textvault_path_text  from "./Textvault_path_text";
import Textvault_path  from "./Textvault_path";
import Textcredential_type_text  from "./Textcredential_type_text";
import Textcredential_type  from "./Textcredential_type";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textcredential_ref_id  from "./Textcredential_ref_id";
import Buttondel_cancel_btn  from "./Buttondel_cancel_btn";
import Buttondel_okl_btn  from "./Buttondel_okl_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdel_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "ref_name_text",
      "ref_name",
      "vault_path_text",
      "vault_path",
      "credential_type_text",
      "credential_type",
      "text",
      "del_divider_2",
      "credential_ref_id",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
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
  const {del_group3becd, setdel_group3becd}= useContext(TotalContext) as TotalContextProps;
  const {del_group3becdProps, setdel_group3becdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc7473, setdelete_heading_txtc7473}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1f696f, setdel_divider_1f696f}= useContext(TotalContext) as TotalContextProps;
  const {ref_name_textaabe8, setref_name_textaabe8}= useContext(TotalContext) as TotalContextProps;
  const {ref_name9d1bd, setref_name9d1bd}= useContext(TotalContext) as TotalContextProps;
  const {vault_path_textf581e, setvault_path_textf581e}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf1128, setvault_pathf1128}= useContext(TotalContext) as TotalContextProps;
  const {credential_type_text132b9, setcredential_type_text132b9}= useContext(TotalContext) as TotalContextProps;
  const {credential_type67f51, setcredential_type67f51}= useContext(TotalContext) as TotalContextProps;
  const {texta0b32, settexta0b32}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_207f16, setdel_divider_207f16}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idc5f97, setcredential_ref_idc5f97}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9c8ad, setdel_cancel_btn9c8ad}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnc484c, setdel_okl_btnc484c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecredentialref_v1, setdeletecredentialref_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCredentialRef:AFVK:v1',
    [user],
    'GroupDelGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a96ac40da2789bb26a29bf4d13b3becd");
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
    setdel_group3becdProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtc7473((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtc7473?.isDisabled==null)
      {
        setdelete_heading_txtc7473((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_1f696f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_1f696f?.isDisabled==null)
      {
        setdel_divider_1f696f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_name_text")){
        setref_name_textaabe8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_name_textaabe8?.isDisabled==null)
      {
        setref_name_textaabe8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_name")){
        setref_name9d1bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_name9d1bd?.isDisabled==null)
      {
        setref_name9d1bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vault_path_text")){
        setvault_path_textf581e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(vault_path_textf581e?.isDisabled==null)
      {
        setvault_path_textf581e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vault_path")){
        setvault_pathf1128((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(vault_pathf1128?.isDisabled==null)
      {
        setvault_pathf1128((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credential_type_text")){
        setcredential_type_text132b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_type_text132b9?.isDisabled==null)
      {
        setcredential_type_text132b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credential_type")){
        setcredential_type67f51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_type67f51?.isDisabled==null)
      {
        setcredential_type67f51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settexta0b32((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(texta0b32?.isDisabled==null)
      {
        settexta0b32((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_207f16((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_207f16?.isDisabled==null)
      {
        setdel_divider_207f16((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credential_ref_id")){
        setcredential_ref_idc5f97((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_ref_idc5f97?.isDisabled==null)
      {
        setcredential_ref_idc5f97((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn9c8ad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn9c8ad?.isDisabled==null)
      {
        setdel_cancel_btn9c8ad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btnc484c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btnc484c?.isDisabled==null)
      {
        setdel_okl_btnc484c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group3becd,
        codeStates['setdel_group'] = setdel_group3becd,
        codeStates['del_group3becd'] = del_group3becdProps,
        codeStates['setdel_group3becd'] = setdel_group3becdProps,
        codeStates['delete_heading_txt'] = delete_heading_txtc7473,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc7473,
        codeStates['del_divider_1'] = del_divider_1f696f,
        codeStates['setdel_divider_1'] = setdel_divider_1f696f,
        codeStates['ref_name_text'] = ref_name_textaabe8,
        codeStates['setref_name_text'] = setref_name_textaabe8,
        codeStates['ref_name'] = ref_name9d1bd,
        codeStates['setref_name'] = setref_name9d1bd,
        codeStates['vault_path_text'] = vault_path_textf581e,
        codeStates['setvault_path_text'] = setvault_path_textf581e,
        codeStates['vault_path'] = vault_pathf1128,
        codeStates['setvault_path'] = setvault_pathf1128,
        codeStates['credential_type_text'] = credential_type_text132b9,
        codeStates['setcredential_type_text'] = setcredential_type_text132b9,
        codeStates['credential_type'] = credential_type67f51,
        codeStates['setcredential_type'] = setcredential_type67f51,
        codeStates['text'] = texta0b32,
        codeStates['settext'] = settexta0b32,
        codeStates['del_divider_2'] = del_divider_207f16,
        codeStates['setdel_divider_2'] = setdel_divider_207f16,
        codeStates['credential_ref_id'] = credential_ref_idc5f97,
        codeStates['setcredential_ref_id'] = setcredential_ref_idc5f97,
        codeStates['del_cancel_btn'] = del_cancel_btn9c8ad,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn9c8ad,
        codeStates['del_okl_btn'] = del_okl_btnc484c,
        codeStates['setdel_okl_btn'] = setdel_okl_btnc484c,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a96ac40da2789bb26a29bf4d13b3becd");
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
        codeStates['del_group'] = del_group3becd,
        codeStates['setdel_group'] = setdel_group3becd,
        codeStates['del_group3becd'] = del_group3becdProps,
        codeStates['setdel_group3becd'] = setdel_group3becdProps,
        codeStates['delete_heading_txt'] = delete_heading_txtc7473,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc7473,
        codeStates['del_divider_1'] = del_divider_1f696f,
        codeStates['setdel_divider_1'] = setdel_divider_1f696f,
        codeStates['ref_name_text'] = ref_name_textaabe8,
        codeStates['setref_name_text'] = setref_name_textaabe8,
        codeStates['ref_name'] = ref_name9d1bd,
        codeStates['setref_name'] = setref_name9d1bd,
        codeStates['vault_path_text'] = vault_path_textf581e,
        codeStates['setvault_path_text'] = setvault_path_textf581e,
        codeStates['vault_path'] = vault_pathf1128,
        codeStates['setvault_path'] = setvault_pathf1128,
        codeStates['credential_type_text'] = credential_type_text132b9,
        codeStates['setcredential_type_text'] = setcredential_type_text132b9,
        codeStates['credential_type'] = credential_type67f51,
        codeStates['setcredential_type'] = setcredential_type67f51,
        codeStates['text'] = texta0b32,
        codeStates['settext'] = settexta0b32,
        codeStates['del_divider_2'] = del_divider_207f16,
        codeStates['setdel_divider_2'] = setdel_divider_207f16,
        codeStates['credential_ref_id'] = credential_ref_idc5f97,
        codeStates['setcredential_ref_id'] = setcredential_ref_idc5f97,
        codeStates['del_cancel_btn'] = del_cancel_btn9c8ad,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn9c8ad,
        codeStates['del_okl_btn'] = del_okl_btnc484c,
        codeStates['setdel_okl_btn'] = setdel_okl_btnc484c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group3becdRef = useRef<any>(null);
  const handleClearSearch = () => {
    del_group3becdRef.current?.setSearchParams();
    del_group3becdRef.current?.handleSearch({});
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
        !Array.isArray(del_group3becd) &&
        Object.keys(del_group3becd)?.length > 0
      ) {
        setdel_group3becd({})
        setdel_group3becdProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [del_group3becdProps?.refresh])


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
        gridRow: '1 / 50',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'',
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
          setdeletecredentialref_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* c7473 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* f696f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ref_name_text") ?<Textref_name_text   /* aabe8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ref_name") ?<Textref_name   /* 9d1bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("vault_path_text") ?<Textvault_path_text   /* f581e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("vault_path") ?<Textvault_path   /* f1128 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("credential_type_text") ?<Textcredential_type_text   /* 132b9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("credential_type") ?<Textcredential_type   /* 67f51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* a0b32 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 07f16 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("credential_ref_id") ?<Textcredential_ref_id   /* c5f97 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
