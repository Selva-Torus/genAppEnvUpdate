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
import Textdelete_header_text  from "./Textdelete_header_text";
import Dividerdivider_1  from "./Dividerdivider_1";
import Textdel_run_id  from "./Textdel_run_id";
import Textintegration_run_id  from "./Textintegration_run_id";
import Textdel_intergration_sorucename  from "./Textdel_intergration_sorucename";
import Textintegration_source_name  from "./Textintegration_source_name";
import Textrun_trigger_code  from "./Textrun_trigger_code";
import Textdel_trigger  from "./Textdel_trigger";
import Textdel_start_on  from "./Textdel_start_on";
import Textstared_on  from "./Textstared_on";
import Textdel_status  from "./Textdel_status";
import Textrun_status_code  from "./Textrun_status_code";
import Textdel_action  from "./Textdel_action";
import Dividerdivider_2  from "./Dividerdivider_2";
import Textintegration_run_id_text  from "./Textintegration_run_id_text";
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttondel_btn  from "./Buttondel_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupinegration_run_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_header_text",
      "divider_1",
      "del_run_id",
      "integration_run_id",
      "del_intergration_sorucename",
      "integration_source_name",
      "run_trigger_code",
      "del_trigger",
      "del_start_on",
      "stared_on",
      "del_status",
      "run_status_code",
      "del_action",
      "divider_2",
      "integration_run_id_text",
      "cancel_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "inegration_run_group"
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
  const {inegration_run_groupe1d5c, setinegration_run_groupe1d5c}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupe1d5cProps, setinegration_run_groupe1d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_header_textda5f0, setdelete_header_textda5f0}= useContext(TotalContext) as TotalContextProps;
  const {divider_1b3e45, setdivider_1b3e45}= useContext(TotalContext) as TotalContextProps;
  const {del_run_idbec07, setdel_run_idbec07}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id13501, setintegration_run_id13501}= useContext(TotalContext) as TotalContextProps;
  const {del_intergration_sorucename7fb8f, setdel_intergration_sorucename7fb8f}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_namece900, setintegration_source_namece900}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_codeb5d3d, setrun_trigger_codeb5d3d}= useContext(TotalContext) as TotalContextProps;
  const {del_trigger08e5f, setdel_trigger08e5f}= useContext(TotalContext) as TotalContextProps;
  const {del_start_onc70e3, setdel_start_onc70e3}= useContext(TotalContext) as TotalContextProps;
  const {stared_ona8f54, setstared_ona8f54}= useContext(TotalContext) as TotalContextProps;
  const {del_status29cc8, setdel_status29cc8}= useContext(TotalContext) as TotalContextProps;
  const {run_status_code37f79, setrun_status_code37f79}= useContext(TotalContext) as TotalContextProps;
  const {del_action1cf57, setdel_action1cf57}= useContext(TotalContext) as TotalContextProps;
  const {divider_2dbf85, setdivider_2dbf85}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id_texta0ce0, setintegration_run_id_texta0ce0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btna8a96, setcancel_btna8a96}= useContext(TotalContext) as TotalContextProps;
  const {del_btn80c50, setdel_btn80c50}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteintegrationrun_v1, setdeleteintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteIntegrationRun:AFVK:v1',
    [user],
    'GroupInegrationRunGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9991cabdc3af40f199ccaf392b8e1d5c");
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
    setinegration_run_groupe1d5cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_header_text")){
        setdelete_header_textda5f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_header_textda5f0?.isDisabled==null)
      {
        setdelete_header_textda5f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_1")){
        setdivider_1b3e45((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_1b3e45?.isDisabled==null)
      {
        setdivider_1b3e45((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_run_id")){
        setdel_run_idbec07((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_run_idbec07?.isDisabled==null)
      {
        setdel_run_idbec07((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_run_id")){
        setintegration_run_id13501((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_run_id13501?.isDisabled==null)
      {
        setintegration_run_id13501((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_intergration_sorucename")){
        setdel_intergration_sorucename7fb8f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_intergration_sorucename7fb8f?.isDisabled==null)
      {
        setdel_intergration_sorucename7fb8f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source_name")){
        setintegration_source_namece900((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source_namece900?.isDisabled==null)
      {
        setintegration_source_namece900((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_trigger_code")){
        setrun_trigger_codeb5d3d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_trigger_codeb5d3d?.isDisabled==null)
      {
        setrun_trigger_codeb5d3d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_trigger")){
        setdel_trigger08e5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_trigger08e5f?.isDisabled==null)
      {
        setdel_trigger08e5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_start_on")){
        setdel_start_onc70e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_start_onc70e3?.isDisabled==null)
      {
        setdel_start_onc70e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stared_on")){
        setstared_ona8f54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stared_ona8f54?.isDisabled==null)
      {
        setstared_ona8f54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_status")){
        setdel_status29cc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_status29cc8?.isDisabled==null)
      {
        setdel_status29cc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_status_code")){
        setrun_status_code37f79((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_status_code37f79?.isDisabled==null)
      {
        setrun_status_code37f79((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_action")){
        setdel_action1cf57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_action1cf57?.isDisabled==null)
      {
        setdel_action1cf57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_2")){
        setdivider_2dbf85((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_2dbf85?.isDisabled==null)
      {
        setdivider_2dbf85((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_run_id_text")){
        setintegration_run_id_texta0ce0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_run_id_texta0ce0?.isDisabled==null)
      {
        setintegration_run_id_texta0ce0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btna8a96((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btna8a96?.isDisabled==null)
      {
        setcancel_btna8a96((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn80c50((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn80c50?.isDisabled==null)
      {
        setdel_btn80c50((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['inegration_run_group'] = inegration_run_groupe1d5c,
        codeStates['setinegration_run_group'] = setinegration_run_groupe1d5c,
        codeStates['inegration_run_groupe1d5c'] = inegration_run_groupe1d5cProps,
        codeStates['setinegration_run_groupe1d5c'] = setinegration_run_groupe1d5cProps,
        codeStates['delete_header_text'] = delete_header_textda5f0,
        codeStates['setdelete_header_text'] = setdelete_header_textda5f0,
        codeStates['divider_1'] = divider_1b3e45,
        codeStates['setdivider_1'] = setdivider_1b3e45,
        codeStates['del_run_id'] = del_run_idbec07,
        codeStates['setdel_run_id'] = setdel_run_idbec07,
        codeStates['integration_run_id'] = integration_run_id13501,
        codeStates['setintegration_run_id'] = setintegration_run_id13501,
        codeStates['del_intergration_sorucename'] = del_intergration_sorucename7fb8f,
        codeStates['setdel_intergration_sorucename'] = setdel_intergration_sorucename7fb8f,
        codeStates['integration_source_name'] = integration_source_namece900,
        codeStates['setintegration_source_name'] = setintegration_source_namece900,
        codeStates['run_trigger_code'] = run_trigger_codeb5d3d,
        codeStates['setrun_trigger_code'] = setrun_trigger_codeb5d3d,
        codeStates['del_trigger'] = del_trigger08e5f,
        codeStates['setdel_trigger'] = setdel_trigger08e5f,
        codeStates['del_start_on'] = del_start_onc70e3,
        codeStates['setdel_start_on'] = setdel_start_onc70e3,
        codeStates['stared_on'] = stared_ona8f54,
        codeStates['setstared_on'] = setstared_ona8f54,
        codeStates['del_status'] = del_status29cc8,
        codeStates['setdel_status'] = setdel_status29cc8,
        codeStates['run_status_code'] = run_status_code37f79,
        codeStates['setrun_status_code'] = setrun_status_code37f79,
        codeStates['del_action'] = del_action1cf57,
        codeStates['setdel_action'] = setdel_action1cf57,
        codeStates['divider_2'] = divider_2dbf85,
        codeStates['setdivider_2'] = setdivider_2dbf85,
        codeStates['integration_run_id_text'] = integration_run_id_texta0ce0,
        codeStates['setintegration_run_id_text'] = setintegration_run_id_texta0ce0,
        codeStates['cancel_btn'] = cancel_btna8a96,
        codeStates['setcancel_btn'] = setcancel_btna8a96,
        codeStates['del_btn'] = del_btn80c50,
        codeStates['setdel_btn'] = setdel_btn80c50,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9991cabdc3af40f199ccaf392b8e1d5c");
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
        codeStates['inegration_run_group'] = inegration_run_groupe1d5c,
        codeStates['setinegration_run_group'] = setinegration_run_groupe1d5c,
        codeStates['inegration_run_groupe1d5c'] = inegration_run_groupe1d5cProps,
        codeStates['setinegration_run_groupe1d5c'] = setinegration_run_groupe1d5cProps,
        codeStates['delete_header_text'] = delete_header_textda5f0,
        codeStates['setdelete_header_text'] = setdelete_header_textda5f0,
        codeStates['divider_1'] = divider_1b3e45,
        codeStates['setdivider_1'] = setdivider_1b3e45,
        codeStates['del_run_id'] = del_run_idbec07,
        codeStates['setdel_run_id'] = setdel_run_idbec07,
        codeStates['integration_run_id'] = integration_run_id13501,
        codeStates['setintegration_run_id'] = setintegration_run_id13501,
        codeStates['del_intergration_sorucename'] = del_intergration_sorucename7fb8f,
        codeStates['setdel_intergration_sorucename'] = setdel_intergration_sorucename7fb8f,
        codeStates['integration_source_name'] = integration_source_namece900,
        codeStates['setintegration_source_name'] = setintegration_source_namece900,
        codeStates['run_trigger_code'] = run_trigger_codeb5d3d,
        codeStates['setrun_trigger_code'] = setrun_trigger_codeb5d3d,
        codeStates['del_trigger'] = del_trigger08e5f,
        codeStates['setdel_trigger'] = setdel_trigger08e5f,
        codeStates['del_start_on'] = del_start_onc70e3,
        codeStates['setdel_start_on'] = setdel_start_onc70e3,
        codeStates['stared_on'] = stared_ona8f54,
        codeStates['setstared_on'] = setstared_ona8f54,
        codeStates['del_status'] = del_status29cc8,
        codeStates['setdel_status'] = setdel_status29cc8,
        codeStates['run_status_code'] = run_status_code37f79,
        codeStates['setrun_status_code'] = setrun_status_code37f79,
        codeStates['del_action'] = del_action1cf57,
        codeStates['setdel_action'] = setdel_action1cf57,
        codeStates['divider_2'] = divider_2dbf85,
        codeStates['setdivider_2'] = setdivider_2dbf85,
        codeStates['integration_run_id_text'] = integration_run_id_texta0ce0,
        codeStates['setintegration_run_id_text'] = setintegration_run_id_texta0ce0,
        codeStates['cancel_btn'] = cancel_btna8a96,
        codeStates['setcancel_btn'] = setcancel_btna8a96,
        codeStates['del_btn'] = del_btn80c50,
        codeStates['setdel_btn'] = setdel_btn80c50,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const inegration_run_groupe1d5cRef = useRef<any>(null);
  const handleClearSearch = () => {
    inegration_run_groupe1d5cRef.current?.setSearchParams();
    inegration_run_groupe1d5cRef.current?.handleSearch({});
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
        !Array.isArray(inegration_run_groupe1d5c) &&
        Object.keys(inegration_run_groupe1d5c)?.length > 0
      ) {
        setinegration_run_groupe1d5c({})
      }
    } else prevRefreshRef.current = true
  }, [inegration_run_groupe1d5cProps?.refresh])


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
        gridRow: '5 / 74',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f1f2f7',
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
          setdeleteintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"inegration_run_group"}))
        }}
    >
          {allowedControls.includes("delete_header_text") ?<Textdelete_header_text   /* da5f0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_1") ?<Dividerdivider_1   /* b3e45 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_run_id") ?<Textdel_run_id   /* bec07 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_run_id") ?<Textintegration_run_id   /* 13501 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_intergration_sorucename") ?<Textdel_intergration_sorucename   /* 7fb8f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_source_name") ?<Textintegration_source_name   /* ce900 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("run_trigger_code") ?<Textrun_trigger_code   /* b5d3d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_trigger") ?<Textdel_trigger   /* 08e5f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_start_on") ?<Textdel_start_on   /* c70e3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stared_on") ?<Textstared_on   /* a8f54 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_status") ?<Textdel_status   /* 29cc8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("run_status_code") ?<Textrun_status_code   /* 37f79 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_action") ?<Textdel_action   /* 1cf57 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_2") ?<Dividerdivider_2   /* dbf85 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_run_id_text") ?<Textintegration_run_id_text   /* a0ce0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_btn"]:true) && 
          allowedControls.includes("del_btn")  ?            <Buttondel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupinegration_run_group
