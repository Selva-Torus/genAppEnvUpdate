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
import Textdel_heading_text  from "./Textdel_heading_text";
import Dividerdivider_1  from "./Dividerdivider_1";
import Textstage_name_txt  from "./Textstage_name_txt";
import Textstage_name  from "./Textstage_name";
import Textdel_condition_txt  from "./Textdel_condition_txt";
import Textcondition_txt  from "./Textcondition_txt";
import Textdel_status_code_txt  from "./Textdel_status_code_txt";
import Textstatus_code  from "./Textstatus_code";
import Textdel_due_date  from "./Textdel_due_date";
import Textdue_date  from "./Textdue_date";
import Texttext  from "./Texttext";
import Dividerdivider_2  from "./Dividerdivider_2";
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttondel_btn  from "./Buttondel_btn";
import Textcert_condition_id  from "./Textcert_condition_id";
import Textcert_stage_id  from "./Textcert_stage_id";
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
  const {dfd_certificationcondition_v1Props, setdfd_certificationcondition_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "del_heading_text",
      "divider_1",
      "stage_name_txt",
      "stage_name",
      "del_condition_txt",
      "condition_txt",
      "del_status_code_txt",
      "status_code",
      "del_due_date",
      "due_date",
      "text",
      "divider_2",
      "cancel_btn",
      "del_btn",
      "cert_condition_id",
      "cert_stage_id"
    ],
    "allowedGroups": [
      "canvas",
      "group"
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
  const {group33388, setgroup33388}= useContext(TotalContext) as TotalContextProps;
  const {group33388Props, setgroup33388Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_textaea5a, setdel_heading_textaea5a}= useContext(TotalContext) as TotalContextProps;
  const {divider_1e1b27, setdivider_1e1b27}= useContext(TotalContext) as TotalContextProps;
  const {stage_name_txt46880, setstage_name_txt46880}= useContext(TotalContext) as TotalContextProps;
  const {stage_name53e8f, setstage_name53e8f}= useContext(TotalContext) as TotalContextProps;
  const {del_condition_txt5e2fe, setdel_condition_txt5e2fe}= useContext(TotalContext) as TotalContextProps;
  const {condition_txt9eed1, setcondition_txt9eed1}= useContext(TotalContext) as TotalContextProps;
  const {del_status_code_txt7812f, setdel_status_code_txt7812f}= useContext(TotalContext) as TotalContextProps;
  const {status_code3655c, setstatus_code3655c}= useContext(TotalContext) as TotalContextProps;
  const {del_due_date4d800, setdel_due_date4d800}= useContext(TotalContext) as TotalContextProps;
  const {due_dated27ee, setdue_dated27ee}= useContext(TotalContext) as TotalContextProps;
  const {textd0517, settextd0517}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d32a6, setdivider_2d32a6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnf4b06, setcancel_btnf4b06}= useContext(TotalContext) as TotalContextProps;
  const {del_btn5ea29, setdel_btn5ea29}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_idb65fc, setcert_condition_idb65fc}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idd8967, setcert_stage_idd8967}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecertificationcondition_v1, setdeletecertificationcondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCertificationCondition:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dbbd91b2d162abdca2f335c881f33388");
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
    setgroup33388Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("del_heading_text")){
        setdel_heading_textaea5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_heading_textaea5a?.isDisabled==null)
      {
        setdel_heading_textaea5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_1")){
        setdivider_1e1b27((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_1e1b27?.isDisabled==null)
      {
        setdivider_1e1b27((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name_txt")){
        setstage_name_txt46880((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name_txt46880?.isDisabled==null)
      {
        setstage_name_txt46880((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name53e8f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name53e8f?.isDisabled==null)
      {
        setstage_name53e8f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_condition_txt")){
        setdel_condition_txt5e2fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_condition_txt5e2fe?.isDisabled==null)
      {
        setdel_condition_txt5e2fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_txt")){
        setcondition_txt9eed1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(condition_txt9eed1?.isDisabled==null)
      {
        setcondition_txt9eed1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_status_code_txt")){
        setdel_status_code_txt7812f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_status_code_txt7812f?.isDisabled==null)
      {
        setdel_status_code_txt7812f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_code")){
        setstatus_code3655c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_code3655c?.isDisabled==null)
      {
        setstatus_code3655c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_due_date")){
        setdel_due_date4d800((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_due_date4d800?.isDisabled==null)
      {
        setdel_due_date4d800((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("due_date")){
        setdue_dated27ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(due_dated27ee?.isDisabled==null)
      {
        setdue_dated27ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextd0517((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textd0517?.isDisabled==null)
      {
        settextd0517((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_2")){
        setdivider_2d32a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_2d32a6?.isDisabled==null)
      {
        setdivider_2d32a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btnf4b06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btnf4b06?.isDisabled==null)
      {
        setcancel_btnf4b06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn5ea29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn5ea29?.isDisabled==null)
      {
        setdel_btn5ea29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_condition_id")){
        setcert_condition_idb65fc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_condition_idb65fc?.isDisabled==null)
      {
        setcert_condition_idb65fc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_idd8967((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_idd8967?.isDisabled==null)
      {
        setcert_stage_idd8967((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group33388,
        codeStates['setgroup'] = setgroup33388,
        codeStates['group33388'] = group33388Props,
        codeStates['setgroup33388'] = setgroup33388Props,
        codeStates['del_heading_text'] = del_heading_textaea5a,
        codeStates['setdel_heading_text'] = setdel_heading_textaea5a,
        codeStates['divider_1'] = divider_1e1b27,
        codeStates['setdivider_1'] = setdivider_1e1b27,
        codeStates['stage_name_txt'] = stage_name_txt46880,
        codeStates['setstage_name_txt'] = setstage_name_txt46880,
        codeStates['stage_name'] = stage_name53e8f,
        codeStates['setstage_name'] = setstage_name53e8f,
        codeStates['del_condition_txt'] = del_condition_txt5e2fe,
        codeStates['setdel_condition_txt'] = setdel_condition_txt5e2fe,
        codeStates['condition_txt'] = condition_txt9eed1,
        codeStates['setcondition_txt'] = setcondition_txt9eed1,
        codeStates['del_status_code_txt'] = del_status_code_txt7812f,
        codeStates['setdel_status_code_txt'] = setdel_status_code_txt7812f,
        codeStates['status_code'] = status_code3655c,
        codeStates['setstatus_code'] = setstatus_code3655c,
        codeStates['del_due_date'] = del_due_date4d800,
        codeStates['setdel_due_date'] = setdel_due_date4d800,
        codeStates['due_date'] = due_dated27ee,
        codeStates['setdue_date'] = setdue_dated27ee,
        codeStates['text'] = textd0517,
        codeStates['settext'] = settextd0517,
        codeStates['divider_2'] = divider_2d32a6,
        codeStates['setdivider_2'] = setdivider_2d32a6,
        codeStates['cancel_btn'] = cancel_btnf4b06,
        codeStates['setcancel_btn'] = setcancel_btnf4b06,
        codeStates['del_btn'] = del_btn5ea29,
        codeStates['setdel_btn'] = setdel_btn5ea29,
        codeStates['cert_condition_id'] = cert_condition_idb65fc,
        codeStates['setcert_condition_id'] = setcert_condition_idb65fc,
        codeStates['cert_stage_id'] = cert_stage_idd8967,
        codeStates['setcert_stage_id'] = setcert_stage_idd8967,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dbbd91b2d162abdca2f335c881f33388");
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
        codeStates['group'] = group33388,
        codeStates['setgroup'] = setgroup33388,
        codeStates['group33388'] = group33388Props,
        codeStates['setgroup33388'] = setgroup33388Props,
        codeStates['del_heading_text'] = del_heading_textaea5a,
        codeStates['setdel_heading_text'] = setdel_heading_textaea5a,
        codeStates['divider_1'] = divider_1e1b27,
        codeStates['setdivider_1'] = setdivider_1e1b27,
        codeStates['stage_name_txt'] = stage_name_txt46880,
        codeStates['setstage_name_txt'] = setstage_name_txt46880,
        codeStates['stage_name'] = stage_name53e8f,
        codeStates['setstage_name'] = setstage_name53e8f,
        codeStates['del_condition_txt'] = del_condition_txt5e2fe,
        codeStates['setdel_condition_txt'] = setdel_condition_txt5e2fe,
        codeStates['condition_txt'] = condition_txt9eed1,
        codeStates['setcondition_txt'] = setcondition_txt9eed1,
        codeStates['del_status_code_txt'] = del_status_code_txt7812f,
        codeStates['setdel_status_code_txt'] = setdel_status_code_txt7812f,
        codeStates['status_code'] = status_code3655c,
        codeStates['setstatus_code'] = setstatus_code3655c,
        codeStates['del_due_date'] = del_due_date4d800,
        codeStates['setdel_due_date'] = setdel_due_date4d800,
        codeStates['due_date'] = due_dated27ee,
        codeStates['setdue_date'] = setdue_dated27ee,
        codeStates['text'] = textd0517,
        codeStates['settext'] = settextd0517,
        codeStates['divider_2'] = divider_2d32a6,
        codeStates['setdivider_2'] = setdivider_2d32a6,
        codeStates['cancel_btn'] = cancel_btnf4b06,
        codeStates['setcancel_btn'] = setcancel_btnf4b06,
        codeStates['del_btn'] = del_btn5ea29,
        codeStates['setdel_btn'] = setdel_btn5ea29,
        codeStates['cert_condition_id'] = cert_condition_idb65fc,
        codeStates['setcert_condition_id'] = setcert_condition_idb65fc,
        codeStates['cert_stage_id'] = cert_stage_idd8967,
        codeStates['setcert_stage_id'] = setcert_stage_idd8967,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group33388Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group33388Ref.current?.setSearchParams();
    group33388Ref.current?.handleSearch({});
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
        !Array.isArray(group33388) &&
        Object.keys(group33388)?.length > 0
      ) {
        setgroup33388({})
        setgroup33388Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group33388Props?.refresh])


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
        gridRow: '2 / 63',
      
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
          setdeletecertificationcondition_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("del_heading_text") ?<Textdel_heading_text   /* aea5a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_1") ?<Dividerdivider_1   /* e1b27 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stage_name_txt") ?<Textstage_name_txt   /* 46880 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stage_name") ?<Textstage_name   /* 53e8f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_condition_txt") ?<Textdel_condition_txt   /* 5e2fe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("condition_txt") ?<Textcondition_txt   /* 9eed1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_status_code_txt") ?<Textdel_status_code_txt   /* 7812f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status_code") ?<Textstatus_code   /* 3655c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_due_date") ?<Textdel_due_date   /* 4d800 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("due_date") ?<Textdue_date   /* d27ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* d0517 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_2") ?<Dividerdivider_2   /* d32a6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_btn"]:true) && 
          allowedControls.includes("del_btn")  ?            <Buttondel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("cert_condition_id") ?<Textcert_condition_id   /* b65fc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_stage_id") ?<Textcert_stage_id   /* d8967 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
