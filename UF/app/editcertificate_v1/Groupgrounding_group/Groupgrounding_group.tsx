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
import Textgrounding_text  from "./Textgrounding_text";
import Texttext_effective_date  from "./Texttext_effective_date";
import Texttext_effective_date_1  from "./Texttext_effective_date_1";
import Texttext_effective_date_2  from "./Texttext_effective_date_2";
import DatePickereffective_date  from "./DatePickereffective_date";
import DatePickerexpiry_date  from "./DatePickerexpiry_date";
import DatePickercompleted_on  from "./DatePickercompleted_on";
import Textcert_temp_text  from "./Textcert_temp_text";
import Dropdowntemplate_name  from "./Dropdowntemplate_name";
import Switchis_recertification  from "./Switchis_recertification";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrounding_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_applycertificatetempname_v1Props, setdfd_applycertificatetempname_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertstatuscombo_v1Props, setdfd_applycertstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertificatestagecombo_v1Props, setdfd_applycertificatestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "grounding_text",
      "text_effective_date",
      "text_effective_date_1",
      "text_effective_date_2",
      "effective_date",
      "expiry_date",
      "completed_on",
      "cert_temp_text",
      "template_name",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "grounding_group_1"
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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_textde33a, setgrounding_textde33a}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date2f0e9, settext_effective_date2f0e9}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_1e9a79, settext_effective_date_1e9a79}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_283f74, settext_effective_date_283f74}= useContext(TotalContext) as TotalContextProps;
  const {effective_date585df, seteffective_date585df}= useContext(TotalContext) as TotalContextProps;
  const {expiry_dated0967, setexpiry_dated0967}= useContext(TotalContext) as TotalContextProps;
  const {completed_on67679, setcompleted_on67679}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_textea047, setcert_temp_textea047}= useContext(TotalContext) as TotalContextProps;
  const {template_name5834f, settemplate_name5834f}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationa8241, setis_recertificationa8241}= useContext(TotalContext) as TotalContextProps;
  const {is_active72c74, setis_active72c74}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {editcertificate_v1, seteditcertificate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:editCertificate:AFVK:v1',
    [user],
    'GroupGroundingGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c443411dc1584fcda4ad9d757eedf2f5");
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
    setgrounding_groupdf2f5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grounding_text")){
        setgrounding_textde33a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grounding_textde33a?.isDisabled==null)
      {
        setgrounding_textde33a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_effective_date")){
        settext_effective_date2f0e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_effective_date2f0e9?.isDisabled==null)
      {
        settext_effective_date2f0e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_effective_date_1")){
        settext_effective_date_1e9a79((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_effective_date_1e9a79?.isDisabled==null)
      {
        settext_effective_date_1e9a79((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_effective_date_2")){
        settext_effective_date_283f74((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_effective_date_283f74?.isDisabled==null)
      {
        settext_effective_date_283f74((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_date")){
        seteffective_date585df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_date585df?.isDisabled==null)
      {
        seteffective_date585df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expiry_date")){
        setexpiry_dated0967((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expiry_dated0967?.isDisabled==null)
      {
        setexpiry_dated0967((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("completed_on")){
        setcompleted_on67679((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(completed_on67679?.isDisabled==null)
      {
        setcompleted_on67679((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_temp_text")){
        setcert_temp_textea047((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_temp_textea047?.isDisabled==null)
      {
        setcert_temp_textea047((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_name5834f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_name5834f?.isDisabled==null)
      {
        settemplate_name5834f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_recertification")){
        setis_recertificationa8241((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_recertificationa8241?.isDisabled==null)
      {
        setis_recertificationa8241((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active72c74((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active72c74?.isDisabled==null)
      {
        setis_active72c74((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_text'] = grounding_textde33a,
        codeStates['setgrounding_text'] = setgrounding_textde33a,
        codeStates['text_effective_date'] = text_effective_date2f0e9,
        codeStates['settext_effective_date'] = settext_effective_date2f0e9,
        codeStates['text_effective_date_1'] = text_effective_date_1e9a79,
        codeStates['settext_effective_date_1'] = settext_effective_date_1e9a79,
        codeStates['text_effective_date_2'] = text_effective_date_283f74,
        codeStates['settext_effective_date_2'] = settext_effective_date_283f74,
        codeStates['effective_date'] = effective_date585df,
        codeStates['seteffective_date'] = seteffective_date585df,
        codeStates['expiry_date'] = expiry_dated0967,
        codeStates['setexpiry_date'] = setexpiry_dated0967,
        codeStates['completed_on'] = completed_on67679,
        codeStates['setcompleted_on'] = setcompleted_on67679,
        codeStates['cert_temp_text'] = cert_temp_textea047,
        codeStates['setcert_temp_text'] = setcert_temp_textea047,
        codeStates['template_name'] = template_name5834f,
        codeStates['settemplate_name'] = settemplate_name5834f,
        codeStates['is_recertification'] = is_recertificationa8241,
        codeStates['setis_recertification'] = setis_recertificationa8241,
        codeStates['is_active'] = is_active72c74,
        codeStates['setis_active'] = setis_active72c74,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c443411dc1584fcda4ad9d757eedf2f5");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_text'] = grounding_textde33a,
        codeStates['setgrounding_text'] = setgrounding_textde33a,
        codeStates['text_effective_date'] = text_effective_date2f0e9,
        codeStates['settext_effective_date'] = settext_effective_date2f0e9,
        codeStates['text_effective_date_1'] = text_effective_date_1e9a79,
        codeStates['settext_effective_date_1'] = settext_effective_date_1e9a79,
        codeStates['text_effective_date_2'] = text_effective_date_283f74,
        codeStates['settext_effective_date_2'] = settext_effective_date_283f74,
        codeStates['effective_date'] = effective_date585df,
        codeStates['seteffective_date'] = seteffective_date585df,
        codeStates['expiry_date'] = expiry_dated0967,
        codeStates['setexpiry_date'] = setexpiry_dated0967,
        codeStates['completed_on'] = completed_on67679,
        codeStates['setcompleted_on'] = setcompleted_on67679,
        codeStates['cert_temp_text'] = cert_temp_textea047,
        codeStates['setcert_temp_text'] = setcert_temp_textea047,
        codeStates['template_name'] = template_name5834f,
        codeStates['settemplate_name'] = settemplate_name5834f,
        codeStates['is_recertification'] = is_recertificationa8241,
        codeStates['setis_recertification'] = setis_recertificationa8241,
        codeStates['is_active'] = is_active72c74,
        codeStates['setis_active'] = setis_active72c74,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grounding_groupdf2f5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grounding_groupdf2f5Ref.current?.setSearchParams();
    grounding_groupdf2f5Ref.current?.handleSearch({});
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
        !Array.isArray(grounding_groupdf2f5) &&
        Object.keys(grounding_groupdf2f5)?.length > 0
      ) {
        setgrounding_groupdf2f5({})
        setgrounding_groupdf2f5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grounding_groupdf2f5Props?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '31 / 73',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          seteditcertificate_v1((pre:any)=>({...pre,_selectedGroup_:"grounding_group"}))
        }}
    >
          {allowedControls.includes("grounding_text") ?<Textgrounding_text   /* de33a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_effective_date") ?<Texttext_effective_date   /* 2f0e9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_effective_date_1") ?<Texttext_effective_date_1   /* e9a79 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_effective_date_2") ?<Texttext_effective_date_2   /* 83f74 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("effective_date") ?<DatePickereffective_date   /* 585df */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expiry_date") ?<DatePickerexpiry_date   /* d0967 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("completed_on") ?<DatePickercompleted_on   /* 67679 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_temp_text") ?<Textcert_temp_text   /* ea047 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("template_name") ?<Dropdowntemplate_name   /* 5834f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_recertification")?<Switchis_recertification  /* a8241 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* 72c74 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrounding_group
