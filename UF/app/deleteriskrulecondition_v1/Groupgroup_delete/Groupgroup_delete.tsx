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
import Textdel_risk_rule__id  from "./Textdel_risk_rule__id";
import Textrisk_rule_id  from "./Textrisk_rule_id";
import Textdel_attribute_name  from "./Textdel_attribute_name";
import Textattribute_name  from "./Textattribute_name";
import Textdel_operator_code  from "./Textdel_operator_code";
import Textoperator_code  from "./Textoperator_code";
import Textsequence_no_del  from "./Textsequence_no_del";
import Textsequence_no  from "./Textsequence_no";
import Textactive_type  from "./Textactive_type";
import Textis_active  from "./Textis_active";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "DEV_AT": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "Executive": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_risk_rule__id",
      "risk_rule_id",
      "del_attribute_name",
      "attribute_name",
      "del_operator_code",
      "operator_code",
      "sequence_no_del",
      "sequence_no",
      "active_type",
      "is_active",
      "confo_text",
      "divider",
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
  const {group_delete8f763, setgroup_delete8f763}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8f763Props, setgroup_delete8f763Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texta0ff5, setdelete_heading_texta0ff5}= useContext(TotalContext) as TotalContextProps;
  const {divider_s5e9e7, setdivider_s5e9e7}= useContext(TotalContext) as TotalContextProps;
  const {del_risk_rule__id8a1a8, setdel_risk_rule__id8a1a8}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_idb7f80, setrisk_rule_idb7f80}= useContext(TotalContext) as TotalContextProps;
  const {del_attribute_nameea67e, setdel_attribute_nameea67e}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name38f26, setattribute_name38f26}= useContext(TotalContext) as TotalContextProps;
  const {del_operator_codefe788, setdel_operator_codefe788}= useContext(TotalContext) as TotalContextProps;
  const {operator_code0e759, setoperator_code0e759}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no_del5f79d, setsequence_no_del5f79d}= useContext(TotalContext) as TotalContextProps;
  const {sequence_nofc431, setsequence_nofc431}= useContext(TotalContext) as TotalContextProps;
  const {active_type5f80e, setactive_type5f80e}= useContext(TotalContext) as TotalContextProps;
  const {is_active4eecd, setis_active4eecd}= useContext(TotalContext) as TotalContextProps;
  const {confo_text2ede6, setconfo_text2ede6}= useContext(TotalContext) as TotalContextProps;
  const {divider40ded, setdivider40ded}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button620c9, setcancel_button620c9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfd2d0, setok_buttonfd2d0}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteriskrulecondition_v1, setdeleteriskrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteRiskRuleCondition:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2040cb2d2a638e62738d3ce99e68f763");
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
    setgroup_delete8f763Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_texta0ff5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_texta0ff5?.isDisabled==null)
      {
        setdelete_heading_texta0ff5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_s")){
        setdivider_s5e9e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_s5e9e7?.isDisabled==null)
      {
        setdivider_s5e9e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_risk_rule__id")){
        setdel_risk_rule__id8a1a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_risk_rule__id8a1a8?.isDisabled==null)
      {
        setdel_risk_rule__id8a1a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_id")){
        setrisk_rule_idb7f80((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_idb7f80?.isDisabled==null)
      {
        setrisk_rule_idb7f80((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_attribute_name")){
        setdel_attribute_nameea67e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_attribute_nameea67e?.isDisabled==null)
      {
        setdel_attribute_nameea67e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attribute_name")){
        setattribute_name38f26((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(attribute_name38f26?.isDisabled==null)
      {
        setattribute_name38f26((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_operator_code")){
        setdel_operator_codefe788((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_operator_codefe788?.isDisabled==null)
      {
        setdel_operator_codefe788((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operator_code")){
        setoperator_code0e759((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operator_code0e759?.isDisabled==null)
      {
        setoperator_code0e759((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sequence_no_del")){
        setsequence_no_del5f79d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sequence_no_del5f79d?.isDisabled==null)
      {
        setsequence_no_del5f79d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sequence_no")){
        setsequence_nofc431((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sequence_nofc431?.isDisabled==null)
      {
        setsequence_nofc431((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("active_type")){
        setactive_type5f80e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(active_type5f80e?.isDisabled==null)
      {
        setactive_type5f80e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active4eecd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active4eecd?.isDisabled==null)
      {
        setis_active4eecd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text2ede6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(confo_text2ede6?.isDisabled==null)
      {
        setconfo_text2ede6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider40ded((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider40ded?.isDisabled==null)
      {
        setdivider40ded((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button620c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_button620c9?.isDisabled==null)
      {
        setcancel_button620c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonfd2d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ok_buttonfd2d0?.isDisabled==null)
      {
        setok_buttonfd2d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete8f763,
        codeStates['setgroup_delete'] = setgroup_delete8f763,
        codeStates['group_delete8f763'] = group_delete8f763Props,
        codeStates['setgroup_delete8f763'] = setgroup_delete8f763Props,
        codeStates['delete_heading_text'] = delete_heading_texta0ff5,
        codeStates['setdelete_heading_text'] = setdelete_heading_texta0ff5,
        codeStates['divider_s'] = divider_s5e9e7,
        codeStates['setdivider_s'] = setdivider_s5e9e7,
        codeStates['del_risk_rule__id'] = del_risk_rule__id8a1a8,
        codeStates['setdel_risk_rule__id'] = setdel_risk_rule__id8a1a8,
        codeStates['risk_rule_id'] = risk_rule_idb7f80,
        codeStates['setrisk_rule_id'] = setrisk_rule_idb7f80,
        codeStates['del_attribute_name'] = del_attribute_nameea67e,
        codeStates['setdel_attribute_name'] = setdel_attribute_nameea67e,
        codeStates['attribute_name'] = attribute_name38f26,
        codeStates['setattribute_name'] = setattribute_name38f26,
        codeStates['del_operator_code'] = del_operator_codefe788,
        codeStates['setdel_operator_code'] = setdel_operator_codefe788,
        codeStates['operator_code'] = operator_code0e759,
        codeStates['setoperator_code'] = setoperator_code0e759,
        codeStates['sequence_no_del'] = sequence_no_del5f79d,
        codeStates['setsequence_no_del'] = setsequence_no_del5f79d,
        codeStates['sequence_no'] = sequence_nofc431,
        codeStates['setsequence_no'] = setsequence_nofc431,
        codeStates['active_type'] = active_type5f80e,
        codeStates['setactive_type'] = setactive_type5f80e,
        codeStates['is_active'] = is_active4eecd,
        codeStates['setis_active'] = setis_active4eecd,
        codeStates['confo_text'] = confo_text2ede6,
        codeStates['setconfo_text'] = setconfo_text2ede6,
        codeStates['divider'] = divider40ded,
        codeStates['setdivider'] = setdivider40ded,
        codeStates['cancel_button'] = cancel_button620c9,
        codeStates['setcancel_button'] = setcancel_button620c9,
        codeStates['ok_button'] = ok_buttonfd2d0,
        codeStates['setok_button'] = setok_buttonfd2d0,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2040cb2d2a638e62738d3ce99e68f763");
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
        codeStates['group_delete'] = group_delete8f763,
        codeStates['setgroup_delete'] = setgroup_delete8f763,
        codeStates['group_delete8f763'] = group_delete8f763Props,
        codeStates['setgroup_delete8f763'] = setgroup_delete8f763Props,
        codeStates['delete_heading_text'] = delete_heading_texta0ff5,
        codeStates['setdelete_heading_text'] = setdelete_heading_texta0ff5,
        codeStates['divider_s'] = divider_s5e9e7,
        codeStates['setdivider_s'] = setdivider_s5e9e7,
        codeStates['del_risk_rule__id'] = del_risk_rule__id8a1a8,
        codeStates['setdel_risk_rule__id'] = setdel_risk_rule__id8a1a8,
        codeStates['risk_rule_id'] = risk_rule_idb7f80,
        codeStates['setrisk_rule_id'] = setrisk_rule_idb7f80,
        codeStates['del_attribute_name'] = del_attribute_nameea67e,
        codeStates['setdel_attribute_name'] = setdel_attribute_nameea67e,
        codeStates['attribute_name'] = attribute_name38f26,
        codeStates['setattribute_name'] = setattribute_name38f26,
        codeStates['del_operator_code'] = del_operator_codefe788,
        codeStates['setdel_operator_code'] = setdel_operator_codefe788,
        codeStates['operator_code'] = operator_code0e759,
        codeStates['setoperator_code'] = setoperator_code0e759,
        codeStates['sequence_no_del'] = sequence_no_del5f79d,
        codeStates['setsequence_no_del'] = setsequence_no_del5f79d,
        codeStates['sequence_no'] = sequence_nofc431,
        codeStates['setsequence_no'] = setsequence_nofc431,
        codeStates['active_type'] = active_type5f80e,
        codeStates['setactive_type'] = setactive_type5f80e,
        codeStates['is_active'] = is_active4eecd,
        codeStates['setis_active'] = setis_active4eecd,
        codeStates['confo_text'] = confo_text2ede6,
        codeStates['setconfo_text'] = setconfo_text2ede6,
        codeStates['divider'] = divider40ded,
        codeStates['setdivider'] = setdivider40ded,
        codeStates['cancel_button'] = cancel_button620c9,
        codeStates['setcancel_button'] = setcancel_button620c9,
        codeStates['ok_button'] = ok_buttonfd2d0,
        codeStates['setok_button'] = setok_buttonfd2d0,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete8f763Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete8f763Ref.current?.setSearchParams();
    group_delete8f763Ref.current?.handleSearch({});
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
        !Array.isArray(group_delete8f763) &&
        Object.keys(group_delete8f763)?.length > 0
      ) {
        setgroup_delete8f763({})
      }
    } else prevRefreshRef.current = true
  }, [group_delete8f763Props?.refresh])


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
        gridRow: '1 / 71',
      
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
          setdeleteriskrulecondition_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* a0ff5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_s") ?<Dividerdivider_s   /* 5e9e7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_risk_rule__id") ?<Textdel_risk_rule__id   /* 8a1a8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("risk_rule_id") ?<Textrisk_rule_id   /* b7f80 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_attribute_name") ?<Textdel_attribute_name   /* ea67e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attribute_name") ?<Textattribute_name   /* 38f26 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_operator_code") ?<Textdel_operator_code   /* fe788 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("operator_code") ?<Textoperator_code   /* 0e759 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("sequence_no_del") ?<Textsequence_no_del   /* 5f79d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("sequence_no") ?<Textsequence_no   /* fc431 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("active_type") ?<Textactive_type   /* 5f80e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 4eecd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 2ede6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 40ded */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
