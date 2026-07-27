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
import Textdelete_heading_text  from "./Textdelete_heading_text";
import Textattachment_id_txt  from "./Textattachment_id_txt";
import Textattachment_id  from "./Textattachment_id";
import Textdoc_group_text  from "./Textdoc_group_text";
import Textdoc_group  from "./Textdoc_group";
import Textdoc_name_text  from "./Textdoc_name_text";
import Textdoc_name  from "./Textdoc_name";
import Texttrs_created_by_text  from "./Texttrs_created_by_text";
import Texttrs_created_by  from "./Texttrs_created_by";
import Textconfo_text  from "./Textconfo_text";
import Textcheck_id  from "./Textcheck_id";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_backgroundcheckdoctable_v1Props, setdfd_backgroundcheckdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "check_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
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
  const {group_delete04302, setgroup_delete04302}= useContext(TotalContext) as TotalContextProps;
  const {group_delete04302Props, setgroup_delete04302Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text813d1, setdelete_heading_text813d1}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta2aee, setattachment_id_txta2aee}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id23a23, setattachment_id23a23}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text1a134, setdoc_group_text1a134}= useContext(TotalContext) as TotalContextProps;
  const {doc_group89f93, setdoc_group89f93}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_texted263, setdoc_name_texted263}= useContext(TotalContext) as TotalContextProps;
  const {doc_name36a98, setdoc_name36a98}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6c3e, settrs_created_by_textb6c3e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by1d9cc, settrs_created_by1d9cc}= useContext(TotalContext) as TotalContextProps;
  const {confo_text86039, setconfo_text86039}= useContext(TotalContext) as TotalContextProps;
  const {check_ide9e25, setcheck_ide9e25}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3bd3f, setcancel_button3bd3f}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonba1e7, setok_buttonba1e7}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {backgroundcheckdocdelete_v1, setbackgroundcheckdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheckDocDelete:AFVK:v1',
    [user],
    'GroupGroupDelete',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1c41ce322e1e7891f96d939d82f04302");
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
    setgroup_delete04302Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text813d1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text813d1?.isDisabled==null)
      {
        setdelete_heading_text813d1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txta2aee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id_txta2aee?.isDisabled==null)
      {
        setattachment_id_txta2aee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id23a23((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id23a23?.isDisabled==null)
      {
        setattachment_id23a23((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_text1a134((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group_text1a134?.isDisabled==null)
      {
        setdoc_group_text1a134((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group89f93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group89f93?.isDisabled==null)
      {
        setdoc_group89f93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_texted263((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name_texted263?.isDisabled==null)
      {
        setdoc_name_texted263((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name36a98((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name36a98?.isDisabled==null)
      {
        setdoc_name36a98((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_textb6c3e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by_textb6c3e?.isDisabled==null)
      {
        settrs_created_by_textb6c3e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by1d9cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by1d9cc?.isDisabled==null)
      {
        settrs_created_by1d9cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text86039((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text86039?.isDisabled==null)
      {
        setconfo_text86039((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("check_id")){
        setcheck_ide9e25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_ide9e25?.isDisabled==null)
      {
        setcheck_ide9e25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button3bd3f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_button3bd3f?.isDisabled==null)
      {
        setcancel_button3bd3f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonba1e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_buttonba1e7?.isDisabled==null)
      {
        setok_buttonba1e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete04302,
        codeStates['setgroup_delete'] = setgroup_delete04302,
        codeStates['group_delete04302'] = group_delete04302Props,
        codeStates['setgroup_delete04302'] = setgroup_delete04302Props,
        codeStates['delete_heading_text'] = delete_heading_text813d1,
        codeStates['setdelete_heading_text'] = setdelete_heading_text813d1,
        codeStates['attachment_id_txt'] = attachment_id_txta2aee,
        codeStates['setattachment_id_txt'] = setattachment_id_txta2aee,
        codeStates['attachment_id'] = attachment_id23a23,
        codeStates['setattachment_id'] = setattachment_id23a23,
        codeStates['doc_group_text'] = doc_group_text1a134,
        codeStates['setdoc_group_text'] = setdoc_group_text1a134,
        codeStates['doc_group'] = doc_group89f93,
        codeStates['setdoc_group'] = setdoc_group89f93,
        codeStates['doc_name_text'] = doc_name_texted263,
        codeStates['setdoc_name_text'] = setdoc_name_texted263,
        codeStates['doc_name'] = doc_name36a98,
        codeStates['setdoc_name'] = setdoc_name36a98,
        codeStates['trs_created_by_text'] = trs_created_by_textb6c3e,
        codeStates['settrs_created_by_text'] = settrs_created_by_textb6c3e,
        codeStates['trs_created_by'] = trs_created_by1d9cc,
        codeStates['settrs_created_by'] = settrs_created_by1d9cc,
        codeStates['confo_text'] = confo_text86039,
        codeStates['setconfo_text'] = setconfo_text86039,
        codeStates['check_id'] = check_ide9e25,
        codeStates['setcheck_id'] = setcheck_ide9e25,
        codeStates['cancel_button'] = cancel_button3bd3f,
        codeStates['setcancel_button'] = setcancel_button3bd3f,
        codeStates['ok_button'] = ok_buttonba1e7,
        codeStates['setok_button'] = setok_buttonba1e7,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete04302,
        codeStates['setgroup_delete'] = setgroup_delete04302,
        codeStates['group_delete04302'] = group_delete04302Props,
        codeStates['setgroup_delete04302'] = setgroup_delete04302Props,
        codeStates['delete_heading_text'] = delete_heading_text813d1,
        codeStates['setdelete_heading_text'] = setdelete_heading_text813d1,
        codeStates['attachment_id_txt'] = attachment_id_txta2aee,
        codeStates['setattachment_id_txt'] = setattachment_id_txta2aee,
        codeStates['attachment_id'] = attachment_id23a23,
        codeStates['setattachment_id'] = setattachment_id23a23,
        codeStates['doc_group_text'] = doc_group_text1a134,
        codeStates['setdoc_group_text'] = setdoc_group_text1a134,
        codeStates['doc_group'] = doc_group89f93,
        codeStates['setdoc_group'] = setdoc_group89f93,
        codeStates['doc_name_text'] = doc_name_texted263,
        codeStates['setdoc_name_text'] = setdoc_name_texted263,
        codeStates['doc_name'] = doc_name36a98,
        codeStates['setdoc_name'] = setdoc_name36a98,
        codeStates['trs_created_by_text'] = trs_created_by_textb6c3e,
        codeStates['settrs_created_by_text'] = settrs_created_by_textb6c3e,
        codeStates['trs_created_by'] = trs_created_by1d9cc,
        codeStates['settrs_created_by'] = settrs_created_by1d9cc,
        codeStates['confo_text'] = confo_text86039,
        codeStates['setconfo_text'] = setconfo_text86039,
        codeStates['check_id'] = check_ide9e25,
        codeStates['setcheck_id'] = setcheck_ide9e25,
        codeStates['cancel_button'] = cancel_button3bd3f,
        codeStates['setcancel_button'] = setcancel_button3bd3f,
        codeStates['ok_button'] = ok_buttonba1e7,
        codeStates['setok_button'] = setok_buttonba1e7,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete04302Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete04302Ref.current?.setSearchParams();
    group_delete04302Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete04302) && Object.keys(group_delete04302)?.length>0)
      {
        setgroup_delete04302({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete04302Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 48',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setbackgroundcheckdocdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 813d1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* a2aee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* 23a23 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* 1a134 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 89f93 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* ed263 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* 36a98 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* b6c3e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* 1d9cc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 86039 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("check_id") ?<Textcheck_id   /* e9e25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
