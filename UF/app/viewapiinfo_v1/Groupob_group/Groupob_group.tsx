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
import Textapi_info_text  from "./Textapi_info_text";
import Textapi_name_text  from "./Textapi_name_text";
import TextInputapi_name_textinput  from "./TextInputapi_name_textinput";
import Textversion_text  from "./Textversion_text";
import TextInputversion_textinput  from "./TextInputversion_textinput";
import Textstatus_text  from "./Textstatus_text";
import TextInputstatus_textinput  from "./TextInputstatus_textinput";
import Textcategiry_text  from "./Textcategiry_text";
import TextInputcategory_textinput  from "./TextInputcategory_textinput";
import Textdate_text  from "./Textdate_text";
import TextInputdate_textinput  from "./TextInputdate_textinput";
import Textpath_text  from "./Textpath_text";
import TextInputpath_textinput  from "./TextInputpath_textinput";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupob_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_mongo_totalcalls_dfd_v1Props, setdfd_mongo_totalcalls_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_api_repository_dfd_v1Props, setdfd_mongo_api_repository_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongodb_api_process_logs_dfd_v1Props, setdfd_mongodb_api_process_logs_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_pie_chart_dfd_v1Props, setdfd_mongo_pie_chart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Template 1": {
    "allowedControls": [
      "api_info_text",
      "api_name_text",
      "api_name_textinput",
      "version_text",
      "version_textinput",
      "status_text",
      "status_textinput",
      "categiry_text",
      "category_textinput",
      "date_text",
      "date_textinput",
      "path_text",
      "path_textinput"
    ],
    "allowedGroups": [
      "canvas",
      "vob_api_info_group",
      "group",
      "api_info_group",
      "total_calls_group",
      "success_rate_group",
      "error_rate_group",
      "ob_group",
      "api_process_log_group",
      "api_process_log_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
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
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {api_info_text692fd, setapi_info_text692fd}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textaccc0, setapi_name_textaccc0}= useContext(TotalContext) as TotalContextProps;
  const {api_name_textinput4e4bf, setapi_name_textinput4e4bf}= useContext(TotalContext) as TotalContextProps;
  const {version_text67538, setversion_text67538}= useContext(TotalContext) as TotalContextProps;
  const {version_textinput19065, setversion_textinput19065}= useContext(TotalContext) as TotalContextProps;
  const {status_text66555, setstatus_text66555}= useContext(TotalContext) as TotalContextProps;
  const {status_textinput62886, setstatus_textinput62886}= useContext(TotalContext) as TotalContextProps;
  const {categiry_text7520b, setcategiry_text7520b}= useContext(TotalContext) as TotalContextProps;
  const {category_textinpute77d9, setcategory_textinpute77d9}= useContext(TotalContext) as TotalContextProps;
  const {date_text44a5e, setdate_text44a5e}= useContext(TotalContext) as TotalContextProps;
  const {date_textinputb262e, setdate_textinputb262e}= useContext(TotalContext) as TotalContextProps;
  const {path_textaf97a, setpath_textaf97a}= useContext(TotalContext) as TotalContextProps;
  const {path_textinputec3d3, setpath_textinputec3d3}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewapiinfo_v1, setviewapiinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1',
    [user],
    'GroupObGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "58264eecca5f4b09982e0f561e876678");
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
    setob_group76678Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("api_info_text")){
        setapi_info_text692fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(api_info_text692fd?.isDisabled==null)
      {
        setapi_info_text692fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("api_name_text")){
        setapi_name_textaccc0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(api_name_textaccc0?.isDisabled==null)
      {
        setapi_name_textaccc0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("api_name_textinput")){
        setapi_name_textinput4e4bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(api_name_textinput4e4bf?.isDisabled==null)
      {
        setapi_name_textinput4e4bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version_text")){
        setversion_text67538((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version_text67538?.isDisabled==null)
      {
        setversion_text67538((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version_textinput")){
        setversion_textinput19065((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version_textinput19065?.isDisabled==null)
      {
        setversion_textinput19065((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_text")){
        setstatus_text66555((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_text66555?.isDisabled==null)
      {
        setstatus_text66555((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_textinput")){
        setstatus_textinput62886((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_textinput62886?.isDisabled==null)
      {
        setstatus_textinput62886((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("categiry_text")){
        setcategiry_text7520b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(categiry_text7520b?.isDisabled==null)
      {
        setcategiry_text7520b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_textinput")){
        setcategory_textinpute77d9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_textinpute77d9?.isDisabled==null)
      {
        setcategory_textinpute77d9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date_text")){
        setdate_text44a5e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(date_text44a5e?.isDisabled==null)
      {
        setdate_text44a5e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("date_textinput")){
        setdate_textinputb262e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(date_textinputb262e?.isDisabled==null)
      {
        setdate_textinputb262e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("path_text")){
        setpath_textaf97a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(path_textaf97a?.isDisabled==null)
      {
        setpath_textaf97a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("path_textinput")){
        setpath_textinputec3d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(path_textinputec3d3?.isDisabled==null)
      {
        setpath_textinputec3d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
        codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
        codeStates['group'] = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['group1f4ba'] = group1f4baProps,
        codeStates['setgroup1f4ba'] = setgroup1f4baProps,
        codeStates['api_info_group'] = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
        codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
        codeStates['total_calls_group'] = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['total_calls_group76982'] = total_calls_group76982Props,
        codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
        codeStates['success_rate_group'] = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
        codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
        codeStates['error_rate_group'] = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
        codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
        codeStates['ob_group'] = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['ob_group76678'] = ob_group76678Props,
        codeStates['setob_group76678'] = setob_group76678Props,
        codeStates['api_info_text'] = api_info_text692fd,
        codeStates['setapi_info_text'] = setapi_info_text692fd,
        codeStates['api_name_text'] = api_name_textaccc0,
        codeStates['setapi_name_text'] = setapi_name_textaccc0,
        codeStates['api_name_textinput'] = api_name_textinput4e4bf,
        codeStates['setapi_name_textinput'] = setapi_name_textinput4e4bf,
        codeStates['version_text'] = version_text67538,
        codeStates['setversion_text'] = setversion_text67538,
        codeStates['version_textinput'] = version_textinput19065,
        codeStates['setversion_textinput'] = setversion_textinput19065,
        codeStates['status_text'] = status_text66555,
        codeStates['setstatus_text'] = setstatus_text66555,
        codeStates['status_textinput'] = status_textinput62886,
        codeStates['setstatus_textinput'] = setstatus_textinput62886,
        codeStates['categiry_text'] = categiry_text7520b,
        codeStates['setcategiry_text'] = setcategiry_text7520b,
        codeStates['category_textinput'] = category_textinpute77d9,
        codeStates['setcategory_textinput'] = setcategory_textinpute77d9,
        codeStates['date_text'] = date_text44a5e,
        codeStates['setdate_text'] = setdate_text44a5e,
        codeStates['date_textinput'] = date_textinputb262e,
        codeStates['setdate_textinput'] = setdate_textinputb262e,
        codeStates['path_text'] = path_textaf97a,
        codeStates['setpath_text'] = setpath_textaf97a,
        codeStates['path_textinput'] = path_textinputec3d3,
        codeStates['setpath_textinput'] = setpath_textinputec3d3,
        codeStates['api_process_log_group'] = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
        codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "58264eecca5f4b09982e0f561e876678");
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
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
        codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
        codeStates['group'] = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['group1f4ba'] = group1f4baProps,
        codeStates['setgroup1f4ba'] = setgroup1f4baProps,
        codeStates['api_info_group'] = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
        codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
        codeStates['total_calls_group'] = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['total_calls_group76982'] = total_calls_group76982Props,
        codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
        codeStates['success_rate_group'] = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
        codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
        codeStates['error_rate_group'] = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
        codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
        codeStates['ob_group'] = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['ob_group76678'] = ob_group76678Props,
        codeStates['setob_group76678'] = setob_group76678Props,
        codeStates['api_info_text'] = api_info_text692fd,
        codeStates['setapi_info_text'] = setapi_info_text692fd,
        codeStates['api_name_text'] = api_name_textaccc0,
        codeStates['setapi_name_text'] = setapi_name_textaccc0,
        codeStates['api_name_textinput'] = api_name_textinput4e4bf,
        codeStates['setapi_name_textinput'] = setapi_name_textinput4e4bf,
        codeStates['version_text'] = version_text67538,
        codeStates['setversion_text'] = setversion_text67538,
        codeStates['version_textinput'] = version_textinput19065,
        codeStates['setversion_textinput'] = setversion_textinput19065,
        codeStates['status_text'] = status_text66555,
        codeStates['setstatus_text'] = setstatus_text66555,
        codeStates['status_textinput'] = status_textinput62886,
        codeStates['setstatus_textinput'] = setstatus_textinput62886,
        codeStates['categiry_text'] = categiry_text7520b,
        codeStates['setcategiry_text'] = setcategiry_text7520b,
        codeStates['category_textinput'] = category_textinpute77d9,
        codeStates['setcategory_textinput'] = setcategory_textinpute77d9,
        codeStates['date_text'] = date_text44a5e,
        codeStates['setdate_text'] = setdate_text44a5e,
        codeStates['date_textinput'] = date_textinputb262e,
        codeStates['setdate_textinput'] = setdate_textinputb262e,
        codeStates['path_text'] = path_textaf97a,
        codeStates['setpath_text'] = setpath_textaf97a,
        codeStates['path_textinput'] = path_textinputec3d3,
        codeStates['setpath_textinput'] = setpath_textinputec3d3,
        codeStates['api_process_log_group'] = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
        codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ob_group76678Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ob_group76678Ref.current?.setSearchParams();
    ob_group76678Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(ob_group76678) &&
        Object.keys(ob_group76678)?.length > 0
      ) {
        setob_group76678({})
      }
    } else prevRefreshRef.current = true
  }, [ob_group76678Props?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

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
        gridColumn: '1 / 15',
        gridRow: '31 / 113',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'#EEEEEE',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2  !rounded-xl ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewapiinfo_v1((pre:any)=>({...pre,_selectedGroup_:"ob_group"}))
        }}
    >
          {allowedControls.includes("api_info_text") ?<Textapi_info_text   /* 692fd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("api_name_text") ?<Textapi_name_text   /* accc0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("api_name_textinput") ?<TextInputapi_name_textinput   /* 4e4bf */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("version_text") ?<Textversion_text   /* 67538 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("version_textinput") ?<TextInputversion_textinput   /* 19065 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status_text") ?<Textstatus_text   /* 66555 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("status_textinput") ?<TextInputstatus_textinput   /* 62886 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("categiry_text") ?<Textcategiry_text   /* 7520b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("category_textinput") ?<TextInputcategory_textinput   /* e77d9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("date_text") ?<Textdate_text   /* 44a5e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("date_textinput") ?<TextInputdate_textinput   /* b262e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("path_text") ?<Textpath_text   /* af97a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("path_textinput") ?<TextInputpath_textinput   /* ec3d3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupob_group
