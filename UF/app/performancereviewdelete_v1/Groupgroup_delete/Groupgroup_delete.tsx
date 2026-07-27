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
import Textreviewnum  from "./Textreviewnum";
import Textreview_number  from "./Textreview_number";
import Textemployee_name  from "./Textemployee_name";
import Textfull_name  from "./Textfull_name";
import Textcyclename  from "./Textcyclename";
import Textcycle_name  from "./Textcycle_name";
import Textstatus  from "./Textstatus";
import Textreview_status  from "./Textreview_status";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Textreview_id  from "./Textreview_id";
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
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
      "reviewnum",
      "review_number",
      "employee_name",
      "full_name",
      "cyclename",
      "cycle_name",
      "status",
      "review_status",
      "confo_text",
      "divider",
      "review_id",
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
  const {group_delete3ee3b, setgroup_delete3ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3bProps, setgroup_delete3ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topc704d, setdivider_topc704d}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textdfa35, setdelete_heading_textdfa35}= useContext(TotalContext) as TotalContextProps;
  const {reviewnumb10f3, setreviewnumb10f3}= useContext(TotalContext) as TotalContextProps;
  const {review_number5cbc0, setreview_number5cbc0}= useContext(TotalContext) as TotalContextProps;
  const {employee_name564a0, setemployee_name564a0}= useContext(TotalContext) as TotalContextProps;
  const {full_name68092, setfull_name68092}= useContext(TotalContext) as TotalContextProps;
  const {cyclename50ebb, setcyclename50ebb}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namecf2b5, setcycle_namecf2b5}= useContext(TotalContext) as TotalContextProps;
  const {statusbb202, setstatusbb202}= useContext(TotalContext) as TotalContextProps;
  const {review_status9db4f, setreview_status9db4f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textd6ad8, setconfo_textd6ad8}= useContext(TotalContext) as TotalContextProps;
  const {divider652b0, setdivider652b0}= useContext(TotalContext) as TotalContextProps;
  const {review_id5d984, setreview_id5d984}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button5aa68, setcancel_button5aa68}= useContext(TotalContext) as TotalContextProps;
  const {ok_button9b4bd, setok_button9b4bd}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancereviewdelete_v1, setperformancereviewdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReviewDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96494fb4b5c9ae186734b6f9b033ee3b");
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
    setgroup_delete3ee3bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_topc704d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_topc704d?.isDisabled==null)
      {
        setdivider_topc704d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textdfa35((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_textdfa35?.isDisabled==null)
      {
        setdelete_heading_textdfa35((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reviewnum")){
        setreviewnumb10f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(reviewnumb10f3?.isDisabled==null)
      {
        setreviewnumb10f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number")){
        setreview_number5cbc0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_number5cbc0?.isDisabled==null)
      {
        setreview_number5cbc0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name")){
        setemployee_name564a0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name564a0?.isDisabled==null)
      {
        setemployee_name564a0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name68092((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name68092?.isDisabled==null)
      {
        setfull_name68092((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cyclename")){
        setcyclename50ebb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cyclename50ebb?.isDisabled==null)
      {
        setcyclename50ebb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_namecf2b5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_namecf2b5?.isDisabled==null)
      {
        setcycle_namecf2b5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusbb202((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(statusbb202?.isDisabled==null)
      {
        setstatusbb202((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_status")){
        setreview_status9db4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_status9db4f?.isDisabled==null)
      {
        setreview_status9db4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textd6ad8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_textd6ad8?.isDisabled==null)
      {
        setconfo_textd6ad8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider652b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider652b0?.isDisabled==null)
      {
        setdivider652b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_id")){
        setreview_id5d984((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_id5d984?.isDisabled==null)
      {
        setreview_id5d984((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button5aa68((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_button5aa68?.isDisabled==null)
      {
        setcancel_button5aa68((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button9b4bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button9b4bd?.isDisabled==null)
      {
        setok_button9b4bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete3ee3b,
        codeStates['setgroup_delete'] = setgroup_delete3ee3b,
        codeStates['group_delete3ee3b'] = group_delete3ee3bProps,
        codeStates['setgroup_delete3ee3b'] = setgroup_delete3ee3bProps,
        codeStates['divider_top'] = divider_topc704d,
        codeStates['setdivider_top'] = setdivider_topc704d,
        codeStates['delete_heading_text'] = delete_heading_textdfa35,
        codeStates['setdelete_heading_text'] = setdelete_heading_textdfa35,
        codeStates['reviewnum'] = reviewnumb10f3,
        codeStates['setreviewnum'] = setreviewnumb10f3,
        codeStates['review_number'] = review_number5cbc0,
        codeStates['setreview_number'] = setreview_number5cbc0,
        codeStates['employee_name'] = employee_name564a0,
        codeStates['setemployee_name'] = setemployee_name564a0,
        codeStates['full_name'] = full_name68092,
        codeStates['setfull_name'] = setfull_name68092,
        codeStates['cyclename'] = cyclename50ebb,
        codeStates['setcyclename'] = setcyclename50ebb,
        codeStates['cycle_name'] = cycle_namecf2b5,
        codeStates['setcycle_name'] = setcycle_namecf2b5,
        codeStates['status'] = statusbb202,
        codeStates['setstatus'] = setstatusbb202,
        codeStates['review_status'] = review_status9db4f,
        codeStates['setreview_status'] = setreview_status9db4f,
        codeStates['confo_text'] = confo_textd6ad8,
        codeStates['setconfo_text'] = setconfo_textd6ad8,
        codeStates['divider'] = divider652b0,
        codeStates['setdivider'] = setdivider652b0,
        codeStates['review_id'] = review_id5d984,
        codeStates['setreview_id'] = setreview_id5d984,
        codeStates['cancel_button'] = cancel_button5aa68,
        codeStates['setcancel_button'] = setcancel_button5aa68,
        codeStates['ok_button'] = ok_button9b4bd,
        codeStates['setok_button'] = setok_button9b4bd,

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
        codeStates['group_delete'] = group_delete3ee3b,
        codeStates['setgroup_delete'] = setgroup_delete3ee3b,
        codeStates['group_delete3ee3b'] = group_delete3ee3bProps,
        codeStates['setgroup_delete3ee3b'] = setgroup_delete3ee3bProps,
        codeStates['divider_top'] = divider_topc704d,
        codeStates['setdivider_top'] = setdivider_topc704d,
        codeStates['delete_heading_text'] = delete_heading_textdfa35,
        codeStates['setdelete_heading_text'] = setdelete_heading_textdfa35,
        codeStates['reviewnum'] = reviewnumb10f3,
        codeStates['setreviewnum'] = setreviewnumb10f3,
        codeStates['review_number'] = review_number5cbc0,
        codeStates['setreview_number'] = setreview_number5cbc0,
        codeStates['employee_name'] = employee_name564a0,
        codeStates['setemployee_name'] = setemployee_name564a0,
        codeStates['full_name'] = full_name68092,
        codeStates['setfull_name'] = setfull_name68092,
        codeStates['cyclename'] = cyclename50ebb,
        codeStates['setcyclename'] = setcyclename50ebb,
        codeStates['cycle_name'] = cycle_namecf2b5,
        codeStates['setcycle_name'] = setcycle_namecf2b5,
        codeStates['status'] = statusbb202,
        codeStates['setstatus'] = setstatusbb202,
        codeStates['review_status'] = review_status9db4f,
        codeStates['setreview_status'] = setreview_status9db4f,
        codeStates['confo_text'] = confo_textd6ad8,
        codeStates['setconfo_text'] = setconfo_textd6ad8,
        codeStates['divider'] = divider652b0,
        codeStates['setdivider'] = setdivider652b0,
        codeStates['review_id'] = review_id5d984,
        codeStates['setreview_id'] = setreview_id5d984,
        codeStates['cancel_button'] = cancel_button5aa68,
        codeStates['setcancel_button'] = setcancel_button5aa68,
        codeStates['ok_button'] = ok_button9b4bd,
        codeStates['setok_button'] = setok_button9b4bd,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete3ee3bRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete3ee3bRef.current?.setSearchParams();
    group_delete3ee3bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete3ee3b) && Object.keys(group_delete3ee3b)?.length>0)
      {
        setgroup_delete3ee3b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete3ee3bProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 57',
      
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
          setperformancereviewdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* c704d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* dfa35 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("reviewnum") ?<Textreviewnum   /* b10f3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_number") ?<Textreview_number   /* 5cbc0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name") ?<Textemployee_name   /* 564a0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 68092 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cyclename") ?<Textcyclename   /* 50ebb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_name") ?<Textcycle_name   /* cf2b5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status") ?<Textstatus   /* bb202 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_status") ?<Textreview_status   /* 9db4f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* d6ad8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 652b0 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_id") ?<Textreview_id   /* 5d984 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
