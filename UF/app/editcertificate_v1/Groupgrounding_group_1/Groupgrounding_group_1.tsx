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
import Textcert_code_text_1  from "./Textcert_code_text_1";
import Textcert_code_text  from "./Textcert_code_text";
import Texttext_status  from "./Texttext_status";
import TextInputcertification_id  from "./TextInputcertification_id";
import TextInputcert_code  from "./TextInputcert_code";
import Dropdowncert_status_code  from "./Dropdowncert_status_code";
import Textcert_code_text_12  from "./Textcert_code_text_12";
import Textcert_code_text_1_1  from "./Textcert_code_text_1_1";
import TextInputtrs_created_by  from "./TextInputtrs_created_by";
import DatePickertrs_created_date  from "./DatePickertrs_created_date";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrounding_group_1 = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
      "cert_code_text_1",
      "cert_code_text",
      "text_status",
      "certification_id",
      "cert_code",
      "cert_status_code",
      "cert_code_text_12",
      "cert_code_text_1_1",
      "trs_created_by",
      "trs_created_date"
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
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80bed, setgrounding_text80bed}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_15adbc, setcert_code_text_15adbc}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text0fa1b, setcert_code_text0fa1b}= useContext(TotalContext) as TotalContextProps;
  const {text_statusa2d30, settext_statusa2d30}= useContext(TotalContext) as TotalContextProps;
  const {certification_idb4ceb, setcertification_idb4ceb}= useContext(TotalContext) as TotalContextProps;
  const {cert_code74900, setcert_code74900}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code2f5be, setcert_status_code2f5be}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_126c1f4, setcert_code_text_126c1f4}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_1_12e212, setcert_code_text_1_12e212}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0b26f, settrs_created_by0b26f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date297b9, settrs_created_date297b9}= useContext(TotalContext) as TotalContextProps;
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
    'GroupGroundingGroup1',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "714415292c394b20a86570cff659abb8");
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
    setgrounding_group_19abb8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grounding_text")){
        setgrounding_text80bed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grounding_text80bed?.isDisabled==null)
      {
        setgrounding_text80bed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code_text_1")){
        setcert_code_text_15adbc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code_text_15adbc?.isDisabled==null)
      {
        setcert_code_text_15adbc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code_text")){
        setcert_code_text0fa1b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code_text0fa1b?.isDisabled==null)
      {
        setcert_code_text0fa1b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_status")){
        settext_statusa2d30((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_statusa2d30?.isDisabled==null)
      {
        settext_statusa2d30((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certification_id")){
        setcertification_idb4ceb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certification_idb4ceb?.isDisabled==null)
      {
        setcertification_idb4ceb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_code74900((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code74900?.isDisabled==null)
      {
        setcert_code74900((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_status_code")){
        setcert_status_code2f5be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_status_code2f5be?.isDisabled==null)
      {
        setcert_status_code2f5be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code_text_12")){
        setcert_code_text_126c1f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code_text_126c1f4?.isDisabled==null)
      {
        setcert_code_text_126c1f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code_text_1_1")){
        setcert_code_text_1_12e212((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code_text_1_12e212?.isDisabled==null)
      {
        setcert_code_text_1_12e212((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by0b26f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_by0b26f?.isDisabled==null)
      {
        settrs_created_by0b26f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date297b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_date297b9?.isDisabled==null)
      {
        settrs_created_date297b9((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
        codeStates['grounding_text'] = grounding_text80bed,
        codeStates['setgrounding_text'] = setgrounding_text80bed,
        codeStates['cert_code_text_1'] = cert_code_text_15adbc,
        codeStates['setcert_code_text_1'] = setcert_code_text_15adbc,
        codeStates['cert_code_text'] = cert_code_text0fa1b,
        codeStates['setcert_code_text'] = setcert_code_text0fa1b,
        codeStates['text_status'] = text_statusa2d30,
        codeStates['settext_status'] = settext_statusa2d30,
        codeStates['certification_id'] = certification_idb4ceb,
        codeStates['setcertification_id'] = setcertification_idb4ceb,
        codeStates['cert_code'] = cert_code74900,
        codeStates['setcert_code'] = setcert_code74900,
        codeStates['cert_status_code'] = cert_status_code2f5be,
        codeStates['setcert_status_code'] = setcert_status_code2f5be,
        codeStates['cert_code_text_12'] = cert_code_text_126c1f4,
        codeStates['setcert_code_text_12'] = setcert_code_text_126c1f4,
        codeStates['cert_code_text_1_1'] = cert_code_text_1_12e212,
        codeStates['setcert_code_text_1_1'] = setcert_code_text_1_12e212,
        codeStates['trs_created_by'] = trs_created_by0b26f,
        codeStates['settrs_created_by'] = settrs_created_by0b26f,
        codeStates['trs_created_date'] = trs_created_date297b9,
        codeStates['settrs_created_date'] = settrs_created_date297b9,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "714415292c394b20a86570cff659abb8");
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
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
        codeStates['grounding_text'] = grounding_text80bed,
        codeStates['setgrounding_text'] = setgrounding_text80bed,
        codeStates['cert_code_text_1'] = cert_code_text_15adbc,
        codeStates['setcert_code_text_1'] = setcert_code_text_15adbc,
        codeStates['cert_code_text'] = cert_code_text0fa1b,
        codeStates['setcert_code_text'] = setcert_code_text0fa1b,
        codeStates['text_status'] = text_statusa2d30,
        codeStates['settext_status'] = settext_statusa2d30,
        codeStates['certification_id'] = certification_idb4ceb,
        codeStates['setcertification_id'] = setcertification_idb4ceb,
        codeStates['cert_code'] = cert_code74900,
        codeStates['setcert_code'] = setcert_code74900,
        codeStates['cert_status_code'] = cert_status_code2f5be,
        codeStates['setcert_status_code'] = setcert_status_code2f5be,
        codeStates['cert_code_text_12'] = cert_code_text_126c1f4,
        codeStates['setcert_code_text_12'] = setcert_code_text_126c1f4,
        codeStates['cert_code_text_1_1'] = cert_code_text_1_12e212,
        codeStates['setcert_code_text_1_1'] = setcert_code_text_1_12e212,
        codeStates['trs_created_by'] = trs_created_by0b26f,
        codeStates['settrs_created_by'] = settrs_created_by0b26f,
        codeStates['trs_created_date'] = trs_created_date297b9,
        codeStates['settrs_created_date'] = settrs_created_date297b9,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grounding_group_19abb8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grounding_group_19abb8Ref.current?.setSearchParams();
    grounding_group_19abb8Ref.current?.handleSearch({});
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
        !Array.isArray(grounding_group_19abb8) &&
        Object.keys(grounding_group_19abb8)?.length > 0
      ) {
        setgrounding_group_19abb8({})
        setgrounding_group_19abb8Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grounding_group_19abb8Props?.refresh])


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
        gridColumn: '1 / 13',
        gridRow: '32 / 73',
      
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
          seteditcertificate_v1((pre:any)=>({...pre,_selectedGroup_:"grounding_group_1"}))
        }}
    >
          {allowedControls.includes("grounding_text") ?<Textgrounding_text   /* 80bed */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_code_text_1") ?<Textcert_code_text_1   /* 5adbc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_code_text") ?<Textcert_code_text   /* 0fa1b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_status") ?<Texttext_status   /* a2d30 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("certification_id") ?<TextInputcertification_id   /* b4ceb */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_code") ?<TextInputcert_code   /* 74900 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_status_code") ?<Dropdowncert_status_code   /* 2f5be */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
          {allowedControls.includes("cert_code_text_12") ?<Textcert_code_text_12   /* 6c1f4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cert_code_text_1_1") ?<Textcert_code_text_1_1   /* 2e212 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("trs_created_by") ?<TextInputtrs_created_by   /* 0b26f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("trs_created_date") ?<DatePickertrs_created_date   /* 297b9 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrounding_group_1
