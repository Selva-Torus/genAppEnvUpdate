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
import Texttext_2  from "./Texttext_2";
import TextInputmin_evidence_count  from "./TextInputmin_evidence_count";
import Switchis_mandatory  from "./Switchis_mandatory";
import Switchevidence_required  from "./Switchevidence_required";
import TextAreaguidance_text  from "./TextAreaguidance_text";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupevidence_configuration_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text_2",
      "min_evidence_count",
      "is_mandatory",
      "evidence_required",
      "guidance_text",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "stage_details_group",
      "evidence_configuration_group",
      "dynamicaction"
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
  const {group6f5e6, setgroup6f5e6}= useContext(TotalContext) as TotalContextProps;
  const {group6f5e6Props, setgroup6f5e6Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06, setstage_details_group3cc06}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_group3cc06Props, setstage_details_group3cc06Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
  const {text_2d05b1, settext_2d05b1}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count3252a, setmin_evidence_count3252a}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory05efb, setis_mandatory05efb}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required78dc8, setevidence_required78dc8}= useContext(TotalContext) as TotalContextProps;
  const {guidance_texte8af0, setguidance_texte8af0}= useContext(TotalContext) as TotalContextProps;
  const {is_active49c13, setis_active49c13}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0, setdynamicaction218e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction218e0Props, setdynamicaction218e0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcertificationstage_v1, setaddcertificationstage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificationStage:AFVK:v1',
    [user],
    'GroupEvidenceConfigurationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "040cc34ed88145e18757f311ecb8a0a2");
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
    setevidence_configuration_group8a0a2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text_2")){
        settext_2d05b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_2d05b1?.isDisabled==null)
      {
        settext_2d05b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("min_evidence_count")){
        setmin_evidence_count3252a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(min_evidence_count3252a?.isDisabled==null)
      {
        setmin_evidence_count3252a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_mandatory")){
        setis_mandatory05efb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_mandatory05efb?.isDisabled==null)
      {
        setis_mandatory05efb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("evidence_required")){
        setevidence_required78dc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(evidence_required78dc8?.isDisabled==null)
      {
        setevidence_required78dc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("guidance_text")){
        setguidance_texte8af0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(guidance_texte8af0?.isDisabled==null)
      {
        setguidance_texte8af0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active49c13((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active49c13?.isDisabled==null)
      {
        setis_active49c13((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['text_2'] = text_2d05b1,
        codeStates['settext_2'] = settext_2d05b1,
        codeStates['min_evidence_count'] = min_evidence_count3252a,
        codeStates['setmin_evidence_count'] = setmin_evidence_count3252a,
        codeStates['is_mandatory'] = is_mandatory05efb,
        codeStates['setis_mandatory'] = setis_mandatory05efb,
        codeStates['evidence_required'] = evidence_required78dc8,
        codeStates['setevidence_required'] = setevidence_required78dc8,
        codeStates['guidance_text'] = guidance_texte8af0,
        codeStates['setguidance_text'] = setguidance_texte8af0,
        codeStates['is_active'] = is_active49c13,
        codeStates['setis_active'] = setis_active49c13,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "040cc34ed88145e18757f311ecb8a0a2");
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
        codeStates['group'] = group6f5e6,
        codeStates['setgroup'] = setgroup6f5e6,
        codeStates['group6f5e6'] = group6f5e6Props,
        codeStates['setgroup6f5e6'] = setgroup6f5e6Props,
        codeStates['stage_details_group'] = stage_details_group3cc06,
        codeStates['setstage_details_group'] = setstage_details_group3cc06,
        codeStates['stage_details_group3cc06'] = stage_details_group3cc06Props,
        codeStates['setstage_details_group3cc06'] = setstage_details_group3cc06Props,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['text_2'] = text_2d05b1,
        codeStates['settext_2'] = settext_2d05b1,
        codeStates['min_evidence_count'] = min_evidence_count3252a,
        codeStates['setmin_evidence_count'] = setmin_evidence_count3252a,
        codeStates['is_mandatory'] = is_mandatory05efb,
        codeStates['setis_mandatory'] = setis_mandatory05efb,
        codeStates['evidence_required'] = evidence_required78dc8,
        codeStates['setevidence_required'] = setevidence_required78dc8,
        codeStates['guidance_text'] = guidance_texte8af0,
        codeStates['setguidance_text'] = setguidance_texte8af0,
        codeStates['is_active'] = is_active49c13,
        codeStates['setis_active'] = setis_active49c13,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const evidence_configuration_group8a0a2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    evidence_configuration_group8a0a2Ref.current?.setSearchParams();
    evidence_configuration_group8a0a2Ref.current?.handleSearch({});
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
        !Array.isArray(evidence_configuration_group8a0a2) &&
        Object.keys(evidence_configuration_group8a0a2)?.length > 0
      ) {
        setevidence_configuration_group8a0a2({})
      }
    } else prevRefreshRef.current = true
  }, [evidence_configuration_group8a0a2Props?.refresh])


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
        gridRow: '1 / 77',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddcertificationstage_v1((pre:any)=>({...pre,_selectedGroup_:"evidence_configuration_group"}))
        }}
    >
          {allowedControls.includes("text_2") ?<Texttext_2   /* d05b1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("min_evidence_count") ?<TextInputmin_evidence_count   /* 3252a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_mandatory")?<Switchis_mandatory  /* 05efb */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("evidence_required")?<Switchevidence_required  /* 78dc8 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("guidance_text") ?<TextAreaguidance_text   /* e8af0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* 49c13 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupevidence_configuration_group
