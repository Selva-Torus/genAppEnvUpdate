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
import Textdel_headibg_text  from "./Textdel_headibg_text";
import Dividerdivider_1  from "./Dividerdivider_1";
import Textdel_template_stage_id  from "./Textdel_template_stage_id";
import Texttemplate_stage_id  from "./Texttemplate_stage_id";
import Textdel_cert_template_id  from "./Textdel_cert_template_id";
import Textcert_template_id  from "./Textcert_template_id";
import Textdel_stage_name  from "./Textdel_stage_name";
import Textstage_name  from "./Textstage_name";
import Textdel_stage_type_code  from "./Textdel_stage_type_code";
import Textstage_type_code  from "./Textstage_type_code";
import Textdel_sla_days  from "./Textdel_sla_days";
import Textsla_days  from "./Textsla_days";
import Textdel_is_active  from "./Textdel_is_active";
import Textis_active  from "./Textis_active";
import Textcombo_text  from "./Textcombo_text";
import Dividerdivider_2  from "./Dividerdivider_2";
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttonok_btn  from "./Buttonok_btn";
import Texttemplate_stage_idtext  from "./Texttemplate_stage_idtext";
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
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
      "del_headibg_text",
      "divider_1",
      "del_template_stage_id",
      "template_stage_id",
      "del_cert_template_id",
      "cert_template_id",
      "del_stage_name",
      "stage_name",
      "del_stage_type_code",
      "stage_type_code",
      "del_sla_days",
      "sla_days",
      "del_is_active",
      "is_active",
      "combo_text",
      "divider_2",
      "cancel_btn",
      "ok_btn",
      "template_stage_idtext"
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
  const {groupb40f5, setgroupb40f5}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5Props, setgroupb40f5Props}= useContext(TotalContext) as TotalContextProps;
  const {del_headibg_textff66f, setdel_headibg_textff66f}= useContext(TotalContext) as TotalContextProps;
  const {divider_103b38, setdivider_103b38}= useContext(TotalContext) as TotalContextProps;
  const {del_template_stage_id9994c, setdel_template_stage_id9994c}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_id33d37, settemplate_stage_id33d37}= useContext(TotalContext) as TotalContextProps;
  const {del_cert_template_id08b25, setdel_cert_template_id08b25}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id54cca, setcert_template_id54cca}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_namef6a12, setdel_stage_namef6a12}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6920f, setstage_name6920f}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_type_codeb7ed2, setdel_stage_type_codeb7ed2}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code0d58a, setstage_type_code0d58a}= useContext(TotalContext) as TotalContextProps;
  const {del_sla_days4f73f, setdel_sla_days4f73f}= useContext(TotalContext) as TotalContextProps;
  const {sla_days7b386, setsla_days7b386}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active9e4c4, setdel_is_active9e4c4}= useContext(TotalContext) as TotalContextProps;
  const {is_active312fd, setis_active312fd}= useContext(TotalContext) as TotalContextProps;
  const {combo_text1c6ae, setcombo_text1c6ae}= useContext(TotalContext) as TotalContextProps;
  const {divider_2a3264, setdivider_2a3264}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btneba2d, setcancel_btneba2d}= useContext(TotalContext) as TotalContextProps;
  const {ok_btn01d91, setok_btn01d91}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idtexte686f, settemplate_stage_idtexte686f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecertificationtemplatestage_v1, setdeletecertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCertificationTemplateStage:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "aa4bfe45293344718e81d6d290fb40f5");
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
    setgroupb40f5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("del_headibg_text")){
        setdel_headibg_textff66f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_headibg_textff66f?.isDisabled==null)
      {
        setdel_headibg_textff66f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_1")){
        setdivider_103b38((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_103b38?.isDisabled==null)
      {
        setdivider_103b38((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_template_stage_id")){
        setdel_template_stage_id9994c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_template_stage_id9994c?.isDisabled==null)
      {
        setdel_template_stage_id9994c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_stage_id")){
        settemplate_stage_id33d37((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_stage_id33d37?.isDisabled==null)
      {
        settemplate_stage_id33d37((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cert_template_id")){
        setdel_cert_template_id08b25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cert_template_id08b25?.isDisabled==null)
      {
        setdel_cert_template_id08b25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_id")){
        setcert_template_id54cca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_id54cca?.isDisabled==null)
      {
        setcert_template_id54cca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_stage_name")){
        setdel_stage_namef6a12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_stage_namef6a12?.isDisabled==null)
      {
        setdel_stage_namef6a12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name6920f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name6920f?.isDisabled==null)
      {
        setstage_name6920f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_stage_type_code")){
        setdel_stage_type_codeb7ed2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_stage_type_codeb7ed2?.isDisabled==null)
      {
        setdel_stage_type_codeb7ed2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_code0d58a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_code0d58a?.isDisabled==null)
      {
        setstage_type_code0d58a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_sla_days")){
        setdel_sla_days4f73f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_sla_days4f73f?.isDisabled==null)
      {
        setdel_sla_days4f73f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_days")){
        setsla_days7b386((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sla_days7b386?.isDisabled==null)
      {
        setsla_days7b386((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_is_active")){
        setdel_is_active9e4c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_is_active9e4c4?.isDisabled==null)
      {
        setdel_is_active9e4c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active312fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active312fd?.isDisabled==null)
      {
        setis_active312fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("combo_text")){
        setcombo_text1c6ae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(combo_text1c6ae?.isDisabled==null)
      {
        setcombo_text1c6ae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_2")){
        setdivider_2a3264((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_2a3264?.isDisabled==null)
      {
        setdivider_2a3264((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btneba2d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btneba2d?.isDisabled==null)
      {
        setcancel_btneba2d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_btn")){
        setok_btn01d91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ok_btn01d91?.isDisabled==null)
      {
        setok_btn01d91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_stage_idtext")){
        settemplate_stage_idtexte686f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_stage_idtexte686f?.isDisabled==null)
      {
        settemplate_stage_idtexte686f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupb40f5,
        codeStates['setgroup'] = setgroupb40f5,
        codeStates['groupb40f5'] = groupb40f5Props,
        codeStates['setgroupb40f5'] = setgroupb40f5Props,
        codeStates['del_headibg_text'] = del_headibg_textff66f,
        codeStates['setdel_headibg_text'] = setdel_headibg_textff66f,
        codeStates['divider_1'] = divider_103b38,
        codeStates['setdivider_1'] = setdivider_103b38,
        codeStates['del_template_stage_id'] = del_template_stage_id9994c,
        codeStates['setdel_template_stage_id'] = setdel_template_stage_id9994c,
        codeStates['template_stage_id'] = template_stage_id33d37,
        codeStates['settemplate_stage_id'] = settemplate_stage_id33d37,
        codeStates['del_cert_template_id'] = del_cert_template_id08b25,
        codeStates['setdel_cert_template_id'] = setdel_cert_template_id08b25,
        codeStates['cert_template_id'] = cert_template_id54cca,
        codeStates['setcert_template_id'] = setcert_template_id54cca,
        codeStates['del_stage_name'] = del_stage_namef6a12,
        codeStates['setdel_stage_name'] = setdel_stage_namef6a12,
        codeStates['stage_name'] = stage_name6920f,
        codeStates['setstage_name'] = setstage_name6920f,
        codeStates['del_stage_type_code'] = del_stage_type_codeb7ed2,
        codeStates['setdel_stage_type_code'] = setdel_stage_type_codeb7ed2,
        codeStates['stage_type_code'] = stage_type_code0d58a,
        codeStates['setstage_type_code'] = setstage_type_code0d58a,
        codeStates['del_sla_days'] = del_sla_days4f73f,
        codeStates['setdel_sla_days'] = setdel_sla_days4f73f,
        codeStates['sla_days'] = sla_days7b386,
        codeStates['setsla_days'] = setsla_days7b386,
        codeStates['del_is_active'] = del_is_active9e4c4,
        codeStates['setdel_is_active'] = setdel_is_active9e4c4,
        codeStates['is_active'] = is_active312fd,
        codeStates['setis_active'] = setis_active312fd,
        codeStates['combo_text'] = combo_text1c6ae,
        codeStates['setcombo_text'] = setcombo_text1c6ae,
        codeStates['divider_2'] = divider_2a3264,
        codeStates['setdivider_2'] = setdivider_2a3264,
        codeStates['cancel_btn'] = cancel_btneba2d,
        codeStates['setcancel_btn'] = setcancel_btneba2d,
        codeStates['ok_btn'] = ok_btn01d91,
        codeStates['setok_btn'] = setok_btn01d91,
        codeStates['template_stage_idtext'] = template_stage_idtexte686f,
        codeStates['settemplate_stage_idtext'] = settemplate_stage_idtexte686f,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "aa4bfe45293344718e81d6d290fb40f5");
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
        codeStates['group'] = groupb40f5,
        codeStates['setgroup'] = setgroupb40f5,
        codeStates['groupb40f5'] = groupb40f5Props,
        codeStates['setgroupb40f5'] = setgroupb40f5Props,
        codeStates['del_headibg_text'] = del_headibg_textff66f,
        codeStates['setdel_headibg_text'] = setdel_headibg_textff66f,
        codeStates['divider_1'] = divider_103b38,
        codeStates['setdivider_1'] = setdivider_103b38,
        codeStates['del_template_stage_id'] = del_template_stage_id9994c,
        codeStates['setdel_template_stage_id'] = setdel_template_stage_id9994c,
        codeStates['template_stage_id'] = template_stage_id33d37,
        codeStates['settemplate_stage_id'] = settemplate_stage_id33d37,
        codeStates['del_cert_template_id'] = del_cert_template_id08b25,
        codeStates['setdel_cert_template_id'] = setdel_cert_template_id08b25,
        codeStates['cert_template_id'] = cert_template_id54cca,
        codeStates['setcert_template_id'] = setcert_template_id54cca,
        codeStates['del_stage_name'] = del_stage_namef6a12,
        codeStates['setdel_stage_name'] = setdel_stage_namef6a12,
        codeStates['stage_name'] = stage_name6920f,
        codeStates['setstage_name'] = setstage_name6920f,
        codeStates['del_stage_type_code'] = del_stage_type_codeb7ed2,
        codeStates['setdel_stage_type_code'] = setdel_stage_type_codeb7ed2,
        codeStates['stage_type_code'] = stage_type_code0d58a,
        codeStates['setstage_type_code'] = setstage_type_code0d58a,
        codeStates['del_sla_days'] = del_sla_days4f73f,
        codeStates['setdel_sla_days'] = setdel_sla_days4f73f,
        codeStates['sla_days'] = sla_days7b386,
        codeStates['setsla_days'] = setsla_days7b386,
        codeStates['del_is_active'] = del_is_active9e4c4,
        codeStates['setdel_is_active'] = setdel_is_active9e4c4,
        codeStates['is_active'] = is_active312fd,
        codeStates['setis_active'] = setis_active312fd,
        codeStates['combo_text'] = combo_text1c6ae,
        codeStates['setcombo_text'] = setcombo_text1c6ae,
        codeStates['divider_2'] = divider_2a3264,
        codeStates['setdivider_2'] = setdivider_2a3264,
        codeStates['cancel_btn'] = cancel_btneba2d,
        codeStates['setcancel_btn'] = setcancel_btneba2d,
        codeStates['ok_btn'] = ok_btn01d91,
        codeStates['setok_btn'] = setok_btn01d91,
        codeStates['template_stage_idtext'] = template_stage_idtexte686f,
        codeStates['settemplate_stage_idtext'] = settemplate_stage_idtexte686f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupb40f5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupb40f5Ref.current?.setSearchParams();
    groupb40f5Ref.current?.handleSearch({});
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
        !Array.isArray(groupb40f5) &&
        Object.keys(groupb40f5)?.length > 0
      ) {
        setgroupb40f5({})
      }
    } else prevRefreshRef.current = true
  }, [groupb40f5Props?.refresh])


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
        gridRow: '1 / 76',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
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
          setdeletecertificationtemplatestage_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("del_headibg_text") ?<Textdel_headibg_text   /* ff66f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_1") ?<Dividerdivider_1   /* 03b38 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_template_stage_id") ?<Textdel_template_stage_id   /* 9994c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("template_stage_id") ?<Texttemplate_stage_id   /* 33d37 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_cert_template_id") ?<Textdel_cert_template_id   /* 08b25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_template_id") ?<Textcert_template_id   /* 54cca */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_stage_name") ?<Textdel_stage_name   /* f6a12 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stage_name") ?<Textstage_name   /* 6920f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_stage_type_code") ?<Textdel_stage_type_code   /* b7ed2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stage_type_code") ?<Textstage_type_code   /* 0d58a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_sla_days") ?<Textdel_sla_days   /* 4f73f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("sla_days") ?<Textsla_days   /* 7b386 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_is_active") ?<Textdel_is_active   /* 9e4c4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 312fd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("combo_text") ?<Textcombo_text   /* 1c6ae */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_2") ?<Dividerdivider_2   /* a3264 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_btn" in ButtonGoRuleData)?ButtonGoRuleData["ok_btn"]:true) && 
          allowedControls.includes("ok_btn")  ?            <Buttonok_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("template_stage_idtext") ?<Texttemplate_stage_idtext   /* e686f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
