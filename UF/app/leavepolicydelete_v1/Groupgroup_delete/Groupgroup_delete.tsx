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
import Textpolicy_code_text  from "./Textpolicy_code_text";
import Textpolicy_code  from "./Textpolicy_code";
import Textpolicy_nm  from "./Textpolicy_nm";
import Textpolicy_name  from "./Textpolicy_name";
import Textleave_typ  from "./Textleave_typ";
import Textleave_type  from "./Textleave_type";
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
  const {dfd_leavepolicy_v1Props, setdfd_leavepolicy_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
      "policy_code_text",
      "policy_code",
      "policy_nm",
      "policy_name",
      "leave_typ",
      "leave_type",
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
  const {group_delete40e71, setgroup_delete40e71}= useContext(TotalContext) as TotalContextProps;
  const {group_delete40e71Props, setgroup_delete40e71Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb8510, setdivider_topb8510}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text43413, setdelete_heading_text43413}= useContext(TotalContext) as TotalContextProps;
  const {policy_code_textc4602, setpolicy_code_textc4602}= useContext(TotalContext) as TotalContextProps;
  const {policy_codeea843, setpolicy_codeea843}= useContext(TotalContext) as TotalContextProps;
  const {policy_nmf1837, setpolicy_nmf1837}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3b3f3, setpolicy_name3b3f3}= useContext(TotalContext) as TotalContextProps;
  const {leave_typ6b883, setleave_typ6b883}= useContext(TotalContext) as TotalContextProps;
  const {leave_type0879a, setleave_type0879a}= useContext(TotalContext) as TotalContextProps;
  const {confo_text43c73, setconfo_text43c73}= useContext(TotalContext) as TotalContextProps;
  const {divider8d9a8, setdivider8d9a8}= useContext(TotalContext) as TotalContextProps;
  const {policy_id80b01, setpolicy_id80b01}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc1acc, setcancel_buttonc1acc}= useContext(TotalContext) as TotalContextProps;
  const {ok_button4bf3f, setok_button4bf3f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavepolicydelete_v1, setleavepolicydelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicyDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b2b3eea4cda0f957b654318d90d40e71");
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
    setgroup_delete40e71Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_topb8510((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_topb8510?.isDisabled==null)
      {
        setdivider_topb8510((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text43413((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text43413?.isDisabled==null)
      {
        setdelete_heading_text43413((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_code_text")){
        setpolicy_code_textc4602((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_code_textc4602?.isDisabled==null)
      {
        setpolicy_code_textc4602((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_code")){
        setpolicy_codeea843((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_codeea843?.isDisabled==null)
      {
        setpolicy_codeea843((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_nm")){
        setpolicy_nmf1837((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_nmf1837?.isDisabled==null)
      {
        setpolicy_nmf1837((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_name3b3f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_name3b3f3?.isDisabled==null)
      {
        setpolicy_name3b3f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_typ")){
        setleave_typ6b883((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_typ6b883?.isDisabled==null)
      {
        setleave_typ6b883((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_type")){
        setleave_type0879a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_type0879a?.isDisabled==null)
      {
        setleave_type0879a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text43c73((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text43c73?.isDisabled==null)
      {
        setconfo_text43c73((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider8d9a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider8d9a8?.isDisabled==null)
      {
        setdivider8d9a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_id")){
        setpolicy_id80b01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_id80b01?.isDisabled==null)
      {
        setpolicy_id80b01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonc1acc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonc1acc?.isDisabled==null)
      {
        setcancel_buttonc1acc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button4bf3f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button4bf3f?.isDisabled==null)
      {
        setok_button4bf3f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete40e71,
        codeStates['setgroup_delete'] = setgroup_delete40e71,
        codeStates['group_delete40e71'] = group_delete40e71Props,
        codeStates['setgroup_delete40e71'] = setgroup_delete40e71Props,
        codeStates['divider_top'] = divider_topb8510,
        codeStates['setdivider_top'] = setdivider_topb8510,
        codeStates['delete_heading_text'] = delete_heading_text43413,
        codeStates['setdelete_heading_text'] = setdelete_heading_text43413,
        codeStates['policy_code_text'] = policy_code_textc4602,
        codeStates['setpolicy_code_text'] = setpolicy_code_textc4602,
        codeStates['policy_code'] = policy_codeea843,
        codeStates['setpolicy_code'] = setpolicy_codeea843,
        codeStates['policy_nm'] = policy_nmf1837,
        codeStates['setpolicy_nm'] = setpolicy_nmf1837,
        codeStates['policy_name'] = policy_name3b3f3,
        codeStates['setpolicy_name'] = setpolicy_name3b3f3,
        codeStates['leave_typ'] = leave_typ6b883,
        codeStates['setleave_typ'] = setleave_typ6b883,
        codeStates['leave_type'] = leave_type0879a,
        codeStates['setleave_type'] = setleave_type0879a,
        codeStates['confo_text'] = confo_text43c73,
        codeStates['setconfo_text'] = setconfo_text43c73,
        codeStates['divider'] = divider8d9a8,
        codeStates['setdivider'] = setdivider8d9a8,
        codeStates['policy_id'] = policy_id80b01,
        codeStates['setpolicy_id'] = setpolicy_id80b01,
        codeStates['cancel_button'] = cancel_buttonc1acc,
        codeStates['setcancel_button'] = setcancel_buttonc1acc,
        codeStates['ok_button'] = ok_button4bf3f,
        codeStates['setok_button'] = setok_button4bf3f,

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
        codeStates['group_delete'] = group_delete40e71,
        codeStates['setgroup_delete'] = setgroup_delete40e71,
        codeStates['group_delete40e71'] = group_delete40e71Props,
        codeStates['setgroup_delete40e71'] = setgroup_delete40e71Props,
        codeStates['divider_top'] = divider_topb8510,
        codeStates['setdivider_top'] = setdivider_topb8510,
        codeStates['delete_heading_text'] = delete_heading_text43413,
        codeStates['setdelete_heading_text'] = setdelete_heading_text43413,
        codeStates['policy_code_text'] = policy_code_textc4602,
        codeStates['setpolicy_code_text'] = setpolicy_code_textc4602,
        codeStates['policy_code'] = policy_codeea843,
        codeStates['setpolicy_code'] = setpolicy_codeea843,
        codeStates['policy_nm'] = policy_nmf1837,
        codeStates['setpolicy_nm'] = setpolicy_nmf1837,
        codeStates['policy_name'] = policy_name3b3f3,
        codeStates['setpolicy_name'] = setpolicy_name3b3f3,
        codeStates['leave_typ'] = leave_typ6b883,
        codeStates['setleave_typ'] = setleave_typ6b883,
        codeStates['leave_type'] = leave_type0879a,
        codeStates['setleave_type'] = setleave_type0879a,
        codeStates['confo_text'] = confo_text43c73,
        codeStates['setconfo_text'] = setconfo_text43c73,
        codeStates['divider'] = divider8d9a8,
        codeStates['setdivider'] = setdivider8d9a8,
        codeStates['policy_id'] = policy_id80b01,
        codeStates['setpolicy_id'] = setpolicy_id80b01,
        codeStates['cancel_button'] = cancel_buttonc1acc,
        codeStates['setcancel_button'] = setcancel_buttonc1acc,
        codeStates['ok_button'] = ok_button4bf3f,
        codeStates['setok_button'] = setok_button4bf3f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete40e71Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete40e71Ref.current?.setSearchParams();
    group_delete40e71Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete40e71) && Object.keys(group_delete40e71)?.length>0)
      {
        setgroup_delete40e71({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete40e71Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 53',
      
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
          setleavepolicydelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* b8510 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 43413 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_code_text") ?<Textpolicy_code_text   /* c4602 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_code") ?<Textpolicy_code   /* ea843 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_nm") ?<Textpolicy_nm   /* f1837 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_name") ?<Textpolicy_name   /* 3b3f3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_typ") ?<Textleave_typ   /* 6b883 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_type") ?<Textleave_type   /* 0879a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 43c73 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 8d9a8 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_id") ?<Textpolicy_id   /* 80b01 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
