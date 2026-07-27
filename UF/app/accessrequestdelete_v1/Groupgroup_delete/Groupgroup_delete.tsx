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
import Dividerdivider_s  from "./Dividerdivider_s";
import Textdelete_heading_text  from "./Textdelete_heading_text";
import Textrequest_number_text  from "./Textrequest_number_text";
import Textrequest_number  from "./Textrequest_number";
import Textfull_name_text  from "./Textfull_name_text";
import Textfull_name  from "./Textfull_name";
import Textsystem_name_text  from "./Textsystem_name_text";
import Textsystem_name  from "./Textsystem_name";
import Textaccess_role_text  from "./Textaccess_role_text";
import Textaccess_role  from "./Textaccess_role";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Textaccess_req_id  from "./Textaccess_req_id";
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
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
      "divider_s",
      "delete_heading_text",
      "request_number_text",
      "request_number",
      "full_name_text",
      "full_name",
      "system_name_text",
      "system_name",
      "access_role_text",
      "access_role",
      "confo_text",
      "divider",
      "access_req_id",
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
  const {group_delete39e95, setgroup_delete39e95}= useContext(TotalContext) as TotalContextProps;
  const {group_delete39e95Props, setgroup_delete39e95Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_s2f4d7, setdivider_s2f4d7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text9fa17, setdelete_heading_text9fa17}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textfe1e3, setrequest_number_textfe1e3}= useContext(TotalContext) as TotalContextProps;
  const {request_numbera8283, setrequest_numbera8283}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text42c95, setfull_name_text42c95}= useContext(TotalContext) as TotalContextProps;
  const {full_name3103b, setfull_name3103b}= useContext(TotalContext) as TotalContextProps;
  const {system_name_text214d0, setsystem_name_text214d0}= useContext(TotalContext) as TotalContextProps;
  const {system_named477d, setsystem_named477d}= useContext(TotalContext) as TotalContextProps;
  const {access_role_text651e8, setaccess_role_text651e8}= useContext(TotalContext) as TotalContextProps;
  const {access_rolef3310, setaccess_rolef3310}= useContext(TotalContext) as TotalContextProps;
  const {confo_text6b398, setconfo_text6b398}= useContext(TotalContext) as TotalContextProps;
  const {divider2d5c2, setdivider2d5c2}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2b2a7, setaccess_req_id2b2a7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button00993, setcancel_button00993}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3840c, setok_button3840c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {accessrequestdelete_v1, setaccessrequestdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequestDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ca9cdea6f8a03f06fdff527167339e95");
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
    setgroup_delete39e95Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_s")){
        setdivider_s2f4d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_s2f4d7?.isDisabled==null)
      {
        setdivider_s2f4d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text9fa17((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text9fa17?.isDisabled==null)
      {
        setdelete_heading_text9fa17((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number_text")){
        setrequest_number_textfe1e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_number_textfe1e3?.isDisabled==null)
      {
        setrequest_number_textfe1e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_numbera8283((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_numbera8283?.isDisabled==null)
      {
        setrequest_numbera8283((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name_text")){
        setfull_name_text42c95((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name_text42c95?.isDisabled==null)
      {
        setfull_name_text42c95((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name3103b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name3103b?.isDisabled==null)
      {
        setfull_name3103b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name_text")){
        setsystem_name_text214d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_name_text214d0?.isDisabled==null)
      {
        setsystem_name_text214d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name")){
        setsystem_named477d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_named477d?.isDisabled==null)
      {
        setsystem_named477d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role_text")){
        setaccess_role_text651e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_role_text651e8?.isDisabled==null)
      {
        setaccess_role_text651e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role")){
        setaccess_rolef3310((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_rolef3310?.isDisabled==null)
      {
        setaccess_rolef3310((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text6b398((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text6b398?.isDisabled==null)
      {
        setconfo_text6b398((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider2d5c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider2d5c2?.isDisabled==null)
      {
        setdivider2d5c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_req_id")){
        setaccess_req_id2b2a7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_id2b2a7?.isDisabled==null)
      {
        setaccess_req_id2b2a7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button00993((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_button00993?.isDisabled==null)
      {
        setcancel_button00993((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button3840c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button3840c?.isDisabled==null)
      {
        setok_button3840c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete39e95,
        codeStates['setgroup_delete'] = setgroup_delete39e95,
        codeStates['group_delete39e95'] = group_delete39e95Props,
        codeStates['setgroup_delete39e95'] = setgroup_delete39e95Props,
        codeStates['divider_s'] = divider_s2f4d7,
        codeStates['setdivider_s'] = setdivider_s2f4d7,
        codeStates['delete_heading_text'] = delete_heading_text9fa17,
        codeStates['setdelete_heading_text'] = setdelete_heading_text9fa17,
        codeStates['request_number_text'] = request_number_textfe1e3,
        codeStates['setrequest_number_text'] = setrequest_number_textfe1e3,
        codeStates['request_number'] = request_numbera8283,
        codeStates['setrequest_number'] = setrequest_numbera8283,
        codeStates['full_name_text'] = full_name_text42c95,
        codeStates['setfull_name_text'] = setfull_name_text42c95,
        codeStates['full_name'] = full_name3103b,
        codeStates['setfull_name'] = setfull_name3103b,
        codeStates['system_name_text'] = system_name_text214d0,
        codeStates['setsystem_name_text'] = setsystem_name_text214d0,
        codeStates['system_name'] = system_named477d,
        codeStates['setsystem_name'] = setsystem_named477d,
        codeStates['access_role_text'] = access_role_text651e8,
        codeStates['setaccess_role_text'] = setaccess_role_text651e8,
        codeStates['access_role'] = access_rolef3310,
        codeStates['setaccess_role'] = setaccess_rolef3310,
        codeStates['confo_text'] = confo_text6b398,
        codeStates['setconfo_text'] = setconfo_text6b398,
        codeStates['divider'] = divider2d5c2,
        codeStates['setdivider'] = setdivider2d5c2,
        codeStates['access_req_id'] = access_req_id2b2a7,
        codeStates['setaccess_req_id'] = setaccess_req_id2b2a7,
        codeStates['cancel_button'] = cancel_button00993,
        codeStates['setcancel_button'] = setcancel_button00993,
        codeStates['ok_button'] = ok_button3840c,
        codeStates['setok_button'] = setok_button3840c,

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
        codeStates['group_delete'] = group_delete39e95,
        codeStates['setgroup_delete'] = setgroup_delete39e95,
        codeStates['group_delete39e95'] = group_delete39e95Props,
        codeStates['setgroup_delete39e95'] = setgroup_delete39e95Props,
        codeStates['divider_s'] = divider_s2f4d7,
        codeStates['setdivider_s'] = setdivider_s2f4d7,
        codeStates['delete_heading_text'] = delete_heading_text9fa17,
        codeStates['setdelete_heading_text'] = setdelete_heading_text9fa17,
        codeStates['request_number_text'] = request_number_textfe1e3,
        codeStates['setrequest_number_text'] = setrequest_number_textfe1e3,
        codeStates['request_number'] = request_numbera8283,
        codeStates['setrequest_number'] = setrequest_numbera8283,
        codeStates['full_name_text'] = full_name_text42c95,
        codeStates['setfull_name_text'] = setfull_name_text42c95,
        codeStates['full_name'] = full_name3103b,
        codeStates['setfull_name'] = setfull_name3103b,
        codeStates['system_name_text'] = system_name_text214d0,
        codeStates['setsystem_name_text'] = setsystem_name_text214d0,
        codeStates['system_name'] = system_named477d,
        codeStates['setsystem_name'] = setsystem_named477d,
        codeStates['access_role_text'] = access_role_text651e8,
        codeStates['setaccess_role_text'] = setaccess_role_text651e8,
        codeStates['access_role'] = access_rolef3310,
        codeStates['setaccess_role'] = setaccess_rolef3310,
        codeStates['confo_text'] = confo_text6b398,
        codeStates['setconfo_text'] = setconfo_text6b398,
        codeStates['divider'] = divider2d5c2,
        codeStates['setdivider'] = setdivider2d5c2,
        codeStates['access_req_id'] = access_req_id2b2a7,
        codeStates['setaccess_req_id'] = setaccess_req_id2b2a7,
        codeStates['cancel_button'] = cancel_button00993,
        codeStates['setcancel_button'] = setcancel_button00993,
        codeStates['ok_button'] = ok_button3840c,
        codeStates['setok_button'] = setok_button3840c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete39e95Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete39e95Ref.current?.setSearchParams();
    group_delete39e95Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete39e95) && Object.keys(group_delete39e95)?.length>0)
      {
        setgroup_delete39e95({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete39e95Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 60',
      
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
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-3 !pl-3 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaccessrequestdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_s") ?<Dividerdivider_s   /* 2f4d7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 9fa17 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("request_number_text") ?<Textrequest_number_text   /* fe1e3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("request_number") ?<Textrequest_number   /* a8283 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name_text") ?<Textfull_name_text   /* 42c95 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 3103b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("system_name_text") ?<Textsystem_name_text   /* 214d0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("system_name") ?<Textsystem_name   /* d477d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_role_text") ?<Textaccess_role_text   /* 651e8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_role") ?<Textaccess_role   /* f3310 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 6b398 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 2d5c2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_req_id") ?<Textaccess_req_id   /* 2b2a7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
