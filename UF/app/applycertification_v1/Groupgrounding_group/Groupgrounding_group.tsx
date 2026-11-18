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
import Textcert_code_text  from "./Textcert_code_text";
import Textcert_temp_text  from "./Textcert_temp_text";
import Texttext_current_stage_seq  from "./Texttext_current_stage_seq";
import TextInputcert_code  from "./TextInputcert_code";
import Dropdowntemplate_name  from "./Dropdowntemplate_name";
import Dropdownstage_type_code  from "./Dropdownstage_type_code";
import Texttext_status  from "./Texttext_status";
import Dropdowncert_status_code  from "./Dropdowncert_status_code";
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
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "grounding_text",
      "cert_code_text",
      "cert_temp_text",
      "text_current_stage_seq",
      "cert_code",
      "template_name",
      "stage_type_code",
      "text_status",
      "cert_status_code",
      "is_recertification",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group"
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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901, setgrounding_text80901}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text4e90a, setcert_code_text4e90a}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_text88aa1, setcert_temp_text88aa1}= useContext(TotalContext) as TotalContextProps;
  const {text_current_stage_seqf99a6, settext_current_stage_seqf99a6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code601b0, setcert_code601b0}= useContext(TotalContext) as TotalContextProps;
  const {template_namee23cf, settemplate_namee23cf}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code3cbb6, setstage_type_code3cbb6}= useContext(TotalContext) as TotalContextProps;
  const {text_status5e33f, settext_status5e33f}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code047b5, setcert_status_code047b5}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationbdc1e, setis_recertificationbdc1e}= useContext(TotalContext) as TotalContextProps;
  const {is_actived0a4e, setis_actived0a4e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {applycertification_v1, setapplycertification_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:applyCertification:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c69fba169af09340a1ee1388b0464d9d");
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
    setgrounding_group64d9dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grounding_text")){
        setgrounding_text80901((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grounding_text80901?.isDisabled==null)
      {
        setgrounding_text80901((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code_text")){
        setcert_code_text4e90a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code_text4e90a?.isDisabled==null)
      {
        setcert_code_text4e90a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_temp_text")){
        setcert_temp_text88aa1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_temp_text88aa1?.isDisabled==null)
      {
        setcert_temp_text88aa1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_current_stage_seq")){
        settext_current_stage_seqf99a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_current_stage_seqf99a6?.isDisabled==null)
      {
        settext_current_stage_seqf99a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_code601b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code601b0?.isDisabled==null)
      {
        setcert_code601b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_namee23cf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_namee23cf?.isDisabled==null)
      {
        settemplate_namee23cf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_code3cbb6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_code3cbb6?.isDisabled==null)
      {
        setstage_type_code3cbb6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_status")){
        settext_status5e33f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_status5e33f?.isDisabled==null)
      {
        settext_status5e33f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_status_code")){
        setcert_status_code047b5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_status_code047b5?.isDisabled==null)
      {
        setcert_status_code047b5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_recertification")){
        setis_recertificationbdc1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_recertificationbdc1e?.isDisabled==null)
      {
        setis_recertificationbdc1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_actived0a4e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_actived0a4e?.isDisabled==null)
      {
        setis_actived0a4e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
        codeStates['grounding_text'] = grounding_text80901,
        codeStates['setgrounding_text'] = setgrounding_text80901,
        codeStates['cert_code_text'] = cert_code_text4e90a,
        codeStates['setcert_code_text'] = setcert_code_text4e90a,
        codeStates['cert_temp_text'] = cert_temp_text88aa1,
        codeStates['setcert_temp_text'] = setcert_temp_text88aa1,
        codeStates['text_current_stage_seq'] = text_current_stage_seqf99a6,
        codeStates['settext_current_stage_seq'] = settext_current_stage_seqf99a6,
        codeStates['cert_code'] = cert_code601b0,
        codeStates['setcert_code'] = setcert_code601b0,
        codeStates['template_name'] = template_namee23cf,
        codeStates['settemplate_name'] = settemplate_namee23cf,
        codeStates['stage_type_code'] = stage_type_code3cbb6,
        codeStates['setstage_type_code'] = setstage_type_code3cbb6,
        codeStates['text_status'] = text_status5e33f,
        codeStates['settext_status'] = settext_status5e33f,
        codeStates['cert_status_code'] = cert_status_code047b5,
        codeStates['setcert_status_code'] = setcert_status_code047b5,
        codeStates['is_recertification'] = is_recertificationbdc1e,
        codeStates['setis_recertification'] = setis_recertificationbdc1e,
        codeStates['is_active'] = is_actived0a4e,
        codeStates['setis_active'] = setis_actived0a4e,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c69fba169af09340a1ee1388b0464d9d");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry73226,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry73226,
        codeStates['overall_ai_asset_registry73226'] = overall_ai_asset_registry73226Props,
        codeStates['setoverall_ai_asset_registry73226'] = setoverall_ai_asset_registry73226Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupacb07,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupacb07,
        codeStates['register_ai_asset_groupacb07'] = register_ai_asset_groupacb07Props,
        codeStates['setregister_ai_asset_groupacb07'] = setregister_ai_asset_groupacb07Props,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['grounding_group'] = grounding_group64d9d,
        codeStates['setgrounding_group'] = setgrounding_group64d9d,
        codeStates['grounding_group64d9d'] = grounding_group64d9dProps,
        codeStates['setgrounding_group64d9d'] = setgrounding_group64d9dProps,
        codeStates['grounding_text'] = grounding_text80901,
        codeStates['setgrounding_text'] = setgrounding_text80901,
        codeStates['cert_code_text'] = cert_code_text4e90a,
        codeStates['setcert_code_text'] = setcert_code_text4e90a,
        codeStates['cert_temp_text'] = cert_temp_text88aa1,
        codeStates['setcert_temp_text'] = setcert_temp_text88aa1,
        codeStates['text_current_stage_seq'] = text_current_stage_seqf99a6,
        codeStates['settext_current_stage_seq'] = settext_current_stage_seqf99a6,
        codeStates['cert_code'] = cert_code601b0,
        codeStates['setcert_code'] = setcert_code601b0,
        codeStates['template_name'] = template_namee23cf,
        codeStates['settemplate_name'] = settemplate_namee23cf,
        codeStates['stage_type_code'] = stage_type_code3cbb6,
        codeStates['setstage_type_code'] = setstage_type_code3cbb6,
        codeStates['text_status'] = text_status5e33f,
        codeStates['settext_status'] = settext_status5e33f,
        codeStates['cert_status_code'] = cert_status_code047b5,
        codeStates['setcert_status_code'] = setcert_status_code047b5,
        codeStates['is_recertification'] = is_recertificationbdc1e,
        codeStates['setis_recertification'] = setis_recertificationbdc1e,
        codeStates['is_active'] = is_actived0a4e,
        codeStates['setis_active'] = setis_actived0a4e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grounding_group64d9dRef = useRef<any>(null);
  const handleClearSearch = () => {
    grounding_group64d9dRef.current?.setSearchParams();
    grounding_group64d9dRef.current?.handleSearch({});
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
        !Array.isArray(grounding_group64d9d) &&
        Object.keys(grounding_group64d9d)?.length > 0
      ) {
        setgrounding_group64d9d({})
        setgrounding_group64d9dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grounding_group64d9dProps?.refresh])


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
        gridRow: '31 / 69',
      
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
          setapplycertification_v1((pre:any)=>({...pre,_selectedGroup_:"grounding_group"}))
        }}
    >
          {allowedControls.includes("grounding_text") ?<Textgrounding_text   /* 80901 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_code_text") ?<Textcert_code_text   /* 4e90a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_temp_text") ?<Textcert_temp_text   /* 88aa1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_current_stage_seq") ?<Texttext_current_stage_seq   /* f99a6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_code") ?<TextInputcert_code   /* 601b0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("template_name") ?<Dropdowntemplate_name   /* e23cf */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("stage_type_code") ?<Dropdownstage_type_code   /* 3cbb6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("text_status") ?<Texttext_status   /* 5e33f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_status_code") ?<Dropdowncert_status_code   /* 047b5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_recertification")?<Switchis_recertification  /* bdc1e */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* d0a4e */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrounding_group
