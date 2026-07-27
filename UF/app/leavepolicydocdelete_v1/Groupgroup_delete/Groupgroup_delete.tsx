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
import Dividerdivider_top  from "./Dividerdivider_top";
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
import Dividerdivider  from "./Dividerdivider";
import Textpolicy_id  from "./Textpolicy_id";
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
  const {dfd_leavepolicydoctable_v1Props, setdfd_leavepolicydoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
      "divider_top",
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
      "divider",
      "policy_id",
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
  const {group_delete34b87, setgroup_delete34b87}= useContext(TotalContext) as TotalContextProps;
  const {group_delete34b87Props, setgroup_delete34b87Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_top46f9f, setdivider_top46f9f}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text27aec, setdelete_heading_text27aec}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txtafea2, setattachment_id_txtafea2}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idb53af, setattachment_idb53af}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text06da8, setdoc_group_text06da8}= useContext(TotalContext) as TotalContextProps;
  const {doc_group6a933, setdoc_group6a933}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text43fe5, setdoc_name_text43fe5}= useContext(TotalContext) as TotalContextProps;
  const {doc_namec14df, setdoc_namec14df}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6f28, settrs_created_by_textb6f28}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by2301e, settrs_created_by2301e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text31826, setconfo_text31826}= useContext(TotalContext) as TotalContextProps;
  const {divider19fb2, setdivider19fb2}= useContext(TotalContext) as TotalContextProps;
  const {policy_idb60b9, setpolicy_idb60b9}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button890a9, setcancel_button890a9}= useContext(TotalContext) as TotalContextProps;
  const {ok_button435a9, setok_button435a9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavepolicydocdelete_v1, setleavepolicydocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicyDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8478877420f1cbcccf3342f2aef34b87");
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
    setgroup_delete34b87Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_top46f9f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_top46f9f?.isDisabled==null)
      {
        setdivider_top46f9f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text27aec((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text27aec?.isDisabled==null)
      {
        setdelete_heading_text27aec((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txtafea2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id_txtafea2?.isDisabled==null)
      {
        setattachment_id_txtafea2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_idb53af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_idb53af?.isDisabled==null)
      {
        setattachment_idb53af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_text06da8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group_text06da8?.isDisabled==null)
      {
        setdoc_group_text06da8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group6a933((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group6a933?.isDisabled==null)
      {
        setdoc_group6a933((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_text43fe5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name_text43fe5?.isDisabled==null)
      {
        setdoc_name_text43fe5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_namec14df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_namec14df?.isDisabled==null)
      {
        setdoc_namec14df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_textb6f28((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by_textb6f28?.isDisabled==null)
      {
        settrs_created_by_textb6f28((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by2301e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by2301e?.isDisabled==null)
      {
        settrs_created_by2301e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text31826((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text31826?.isDisabled==null)
      {
        setconfo_text31826((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider19fb2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider19fb2?.isDisabled==null)
      {
        setdivider19fb2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_id")){
        setpolicy_idb60b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_idb60b9?.isDisabled==null)
      {
        setpolicy_idb60b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button890a9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_button890a9?.isDisabled==null)
      {
        setcancel_button890a9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button435a9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button435a9?.isDisabled==null)
      {
        setok_button435a9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete34b87,
        codeStates['setgroup_delete'] = setgroup_delete34b87,
        codeStates['group_delete34b87'] = group_delete34b87Props,
        codeStates['setgroup_delete34b87'] = setgroup_delete34b87Props,
        codeStates['divider_top'] = divider_top46f9f,
        codeStates['setdivider_top'] = setdivider_top46f9f,
        codeStates['delete_heading_text'] = delete_heading_text27aec,
        codeStates['setdelete_heading_text'] = setdelete_heading_text27aec,
        codeStates['attachment_id_txt'] = attachment_id_txtafea2,
        codeStates['setattachment_id_txt'] = setattachment_id_txtafea2,
        codeStates['attachment_id'] = attachment_idb53af,
        codeStates['setattachment_id'] = setattachment_idb53af,
        codeStates['doc_group_text'] = doc_group_text06da8,
        codeStates['setdoc_group_text'] = setdoc_group_text06da8,
        codeStates['doc_group'] = doc_group6a933,
        codeStates['setdoc_group'] = setdoc_group6a933,
        codeStates['doc_name_text'] = doc_name_text43fe5,
        codeStates['setdoc_name_text'] = setdoc_name_text43fe5,
        codeStates['doc_name'] = doc_namec14df,
        codeStates['setdoc_name'] = setdoc_namec14df,
        codeStates['trs_created_by_text'] = trs_created_by_textb6f28,
        codeStates['settrs_created_by_text'] = settrs_created_by_textb6f28,
        codeStates['trs_created_by'] = trs_created_by2301e,
        codeStates['settrs_created_by'] = settrs_created_by2301e,
        codeStates['confo_text'] = confo_text31826,
        codeStates['setconfo_text'] = setconfo_text31826,
        codeStates['divider'] = divider19fb2,
        codeStates['setdivider'] = setdivider19fb2,
        codeStates['policy_id'] = policy_idb60b9,
        codeStates['setpolicy_id'] = setpolicy_idb60b9,
        codeStates['cancel_button'] = cancel_button890a9,
        codeStates['setcancel_button'] = setcancel_button890a9,
        codeStates['ok_button'] = ok_button435a9,
        codeStates['setok_button'] = setok_button435a9,

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
        codeStates['group_delete'] = group_delete34b87,
        codeStates['setgroup_delete'] = setgroup_delete34b87,
        codeStates['group_delete34b87'] = group_delete34b87Props,
        codeStates['setgroup_delete34b87'] = setgroup_delete34b87Props,
        codeStates['divider_top'] = divider_top46f9f,
        codeStates['setdivider_top'] = setdivider_top46f9f,
        codeStates['delete_heading_text'] = delete_heading_text27aec,
        codeStates['setdelete_heading_text'] = setdelete_heading_text27aec,
        codeStates['attachment_id_txt'] = attachment_id_txtafea2,
        codeStates['setattachment_id_txt'] = setattachment_id_txtafea2,
        codeStates['attachment_id'] = attachment_idb53af,
        codeStates['setattachment_id'] = setattachment_idb53af,
        codeStates['doc_group_text'] = doc_group_text06da8,
        codeStates['setdoc_group_text'] = setdoc_group_text06da8,
        codeStates['doc_group'] = doc_group6a933,
        codeStates['setdoc_group'] = setdoc_group6a933,
        codeStates['doc_name_text'] = doc_name_text43fe5,
        codeStates['setdoc_name_text'] = setdoc_name_text43fe5,
        codeStates['doc_name'] = doc_namec14df,
        codeStates['setdoc_name'] = setdoc_namec14df,
        codeStates['trs_created_by_text'] = trs_created_by_textb6f28,
        codeStates['settrs_created_by_text'] = settrs_created_by_textb6f28,
        codeStates['trs_created_by'] = trs_created_by2301e,
        codeStates['settrs_created_by'] = settrs_created_by2301e,
        codeStates['confo_text'] = confo_text31826,
        codeStates['setconfo_text'] = setconfo_text31826,
        codeStates['divider'] = divider19fb2,
        codeStates['setdivider'] = setdivider19fb2,
        codeStates['policy_id'] = policy_idb60b9,
        codeStates['setpolicy_id'] = setpolicy_idb60b9,
        codeStates['cancel_button'] = cancel_button890a9,
        codeStates['setcancel_button'] = setcancel_button890a9,
        codeStates['ok_button'] = ok_button435a9,
        codeStates['setok_button'] = setok_button435a9,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete34b87Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete34b87Ref.current?.setSearchParams();
    group_delete34b87Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete34b87) && Object.keys(group_delete34b87)?.length>0)
      {
        setgroup_delete34b87({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete34b87Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 56',
      
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
          setleavepolicydocdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* 46f9f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 27aec */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* afea2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* b53af */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* 06da8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 6a933 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* 43fe5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* c14df */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* b6f28 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* 2301e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 31826 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 19fb2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_id") ?<Textpolicy_id   /* b60b9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
