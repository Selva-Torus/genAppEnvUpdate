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
import Dividerdivider_s  from "./Dividerdivider_s";
import Textcycle_code_text  from "./Textcycle_code_text";
import Textcycle_code  from "./Textcycle_code";
import Textcycle_name_text  from "./Textcycle_name_text";
import Textcycle_name  from "./Textcycle_name";
import Textcycle_type_text  from "./Textcycle_type_text";
import Textcycle_type  from "./Textcycle_type";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import Textcycle_id  from "./Textcycle_id";
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
  const {dfd_performancecycle_v1Props, setdfd_performancecycle_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
      "divider_s",
      "cycle_code_text",
      "cycle_code",
      "cycle_name_text",
      "cycle_name",
      "cycle_type_text",
      "cycle_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button",
      "cycle_id"
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
  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textfe4b7, setdelete_heading_textfe4b7}= useContext(TotalContext) as TotalContextProps;
  const {divider_s18ff5, setdivider_s18ff5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code_textea00f, setcycle_code_textea00f}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code5f073, setcycle_code5f073}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name_text7ecc5, setcycle_name_text7ecc5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name6a018, setcycle_name6a018}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type_text57344, setcycle_type_text57344}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type89f52, setcycle_type89f52}= useContext(TotalContext) as TotalContextProps;
  const {confo_text4c8be, setconfo_text4c8be}= useContext(TotalContext) as TotalContextProps;
  const {divider477db, setdivider477db}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonb2f7a, setcancel_buttonb2f7a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button24d12, setok_button24d12}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id8c16d, setcycle_id8c16d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancecyclesdelete_v1, setperformancecyclesdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCyclesDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "42a94e2f764887a1ec7c9ac5dbbbe86e");
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
    setgroup_deletebe86eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textfe4b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_textfe4b7?.isDisabled==null)
      {
        setdelete_heading_textfe4b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_s")){
        setdivider_s18ff5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_s18ff5?.isDisabled==null)
      {
        setdivider_s18ff5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_code_text")){
        setcycle_code_textea00f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_code_textea00f?.isDisabled==null)
      {
        setcycle_code_textea00f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_code")){
        setcycle_code5f073((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_code5f073?.isDisabled==null)
      {
        setcycle_code5f073((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name_text")){
        setcycle_name_text7ecc5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name_text7ecc5?.isDisabled==null)
      {
        setcycle_name_text7ecc5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name6a018((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name6a018?.isDisabled==null)
      {
        setcycle_name6a018((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_type_text")){
        setcycle_type_text57344((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_type_text57344?.isDisabled==null)
      {
        setcycle_type_text57344((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_type")){
        setcycle_type89f52((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_type89f52?.isDisabled==null)
      {
        setcycle_type89f52((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text4c8be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text4c8be?.isDisabled==null)
      {
        setconfo_text4c8be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider477db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider477db?.isDisabled==null)
      {
        setdivider477db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonb2f7a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonb2f7a?.isDisabled==null)
      {
        setcancel_buttonb2f7a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button24d12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button24d12?.isDisabled==null)
      {
        setok_button24d12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_id")){
        setcycle_id8c16d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_id8c16d?.isDisabled==null)
      {
        setcycle_id8c16d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_deletebe86e,
        codeStates['setgroup_delete'] = setgroup_deletebe86e,
        codeStates['group_deletebe86e'] = group_deletebe86eProps,
        codeStates['setgroup_deletebe86e'] = setgroup_deletebe86eProps,
        codeStates['delete_heading_text'] = delete_heading_textfe4b7,
        codeStates['setdelete_heading_text'] = setdelete_heading_textfe4b7,
        codeStates['divider_s'] = divider_s18ff5,
        codeStates['setdivider_s'] = setdivider_s18ff5,
        codeStates['cycle_code_text'] = cycle_code_textea00f,
        codeStates['setcycle_code_text'] = setcycle_code_textea00f,
        codeStates['cycle_code'] = cycle_code5f073,
        codeStates['setcycle_code'] = setcycle_code5f073,
        codeStates['cycle_name_text'] = cycle_name_text7ecc5,
        codeStates['setcycle_name_text'] = setcycle_name_text7ecc5,
        codeStates['cycle_name'] = cycle_name6a018,
        codeStates['setcycle_name'] = setcycle_name6a018,
        codeStates['cycle_type_text'] = cycle_type_text57344,
        codeStates['setcycle_type_text'] = setcycle_type_text57344,
        codeStates['cycle_type'] = cycle_type89f52,
        codeStates['setcycle_type'] = setcycle_type89f52,
        codeStates['confo_text'] = confo_text4c8be,
        codeStates['setconfo_text'] = setconfo_text4c8be,
        codeStates['divider'] = divider477db,
        codeStates['setdivider'] = setdivider477db,
        codeStates['cancel_button'] = cancel_buttonb2f7a,
        codeStates['setcancel_button'] = setcancel_buttonb2f7a,
        codeStates['ok_button'] = ok_button24d12,
        codeStates['setok_button'] = setok_button24d12,
        codeStates['cycle_id'] = cycle_id8c16d,
        codeStates['setcycle_id'] = setcycle_id8c16d,

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
        codeStates['group_delete'] = group_deletebe86e,
        codeStates['setgroup_delete'] = setgroup_deletebe86e,
        codeStates['group_deletebe86e'] = group_deletebe86eProps,
        codeStates['setgroup_deletebe86e'] = setgroup_deletebe86eProps,
        codeStates['delete_heading_text'] = delete_heading_textfe4b7,
        codeStates['setdelete_heading_text'] = setdelete_heading_textfe4b7,
        codeStates['divider_s'] = divider_s18ff5,
        codeStates['setdivider_s'] = setdivider_s18ff5,
        codeStates['cycle_code_text'] = cycle_code_textea00f,
        codeStates['setcycle_code_text'] = setcycle_code_textea00f,
        codeStates['cycle_code'] = cycle_code5f073,
        codeStates['setcycle_code'] = setcycle_code5f073,
        codeStates['cycle_name_text'] = cycle_name_text7ecc5,
        codeStates['setcycle_name_text'] = setcycle_name_text7ecc5,
        codeStates['cycle_name'] = cycle_name6a018,
        codeStates['setcycle_name'] = setcycle_name6a018,
        codeStates['cycle_type_text'] = cycle_type_text57344,
        codeStates['setcycle_type_text'] = setcycle_type_text57344,
        codeStates['cycle_type'] = cycle_type89f52,
        codeStates['setcycle_type'] = setcycle_type89f52,
        codeStates['confo_text'] = confo_text4c8be,
        codeStates['setconfo_text'] = setconfo_text4c8be,
        codeStates['divider'] = divider477db,
        codeStates['setdivider'] = setdivider477db,
        codeStates['cancel_button'] = cancel_buttonb2f7a,
        codeStates['setcancel_button'] = setcancel_buttonb2f7a,
        codeStates['ok_button'] = ok_button24d12,
        codeStates['setok_button'] = setok_button24d12,
        codeStates['cycle_id'] = cycle_id8c16d,
        codeStates['setcycle_id'] = setcycle_id8c16d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_deletebe86eRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_deletebe86eRef.current?.setSearchParams();
    group_deletebe86eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_deletebe86e) && Object.keys(group_deletebe86e)?.length>0)
      {
        setgroup_deletebe86e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_deletebe86eProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 52',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#fffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-3 !pl-3 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setperformancecyclesdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* fe4b7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_s") ?<Dividerdivider_s   /* 18ff5 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_code_text") ?<Textcycle_code_text   /* ea00f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_code") ?<Textcycle_code   /* 5f073 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_name_text") ?<Textcycle_name_text   /* 7ecc5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_name") ?<Textcycle_name   /* 6a018 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_type_text") ?<Textcycle_type_text   /* 57344 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cycle_type") ?<Textcycle_type   /* 89f52 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 4c8be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 477db */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("cycle_id") ?<Textcycle_id   /* 8c16d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup_delete
