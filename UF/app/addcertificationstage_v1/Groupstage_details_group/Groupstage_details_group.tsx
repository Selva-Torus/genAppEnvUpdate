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
import Texttext  from "./Texttext";
import Dropdowncert_template_name  from "./Dropdowncert_template_name";
import TextInputstage_sequence  from "./TextInputstage_sequence";
import Dropdownstage_type_code  from "./Dropdownstage_type_code";
import TextInputstage_name  from "./TextInputstage_name";
import Dropdownapprover_role_id  from "./Dropdownapprover_role_id";
import TextInputsla_days  from "./TextInputsla_days";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstage_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
      "text",
      "cert_template_name",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "approver_role_id",
      "sla_days"
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
  const {text0cd7b, settext0cd7b}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_name79179, setcert_template_name79179}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequencefde55, setstage_sequencefde55}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codefe371, setstage_type_codefe371}= useContext(TotalContext) as TotalContextProps;
  const {stage_namef712f, setstage_namef712f}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id278bd, setapprover_role_id278bd}= useContext(TotalContext) as TotalContextProps;
  const {sla_days5202a, setsla_days5202a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2, setevidence_configuration_group8a0a2}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group8a0a2Props, setevidence_configuration_group8a0a2Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupStageDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "46a149b3f2104ac7ab84a4d24643cc06");
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
    setstage_details_group3cc06Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext0cd7b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text0cd7b?.isDisabled==null)
      {
        settext0cd7b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_template_name")){
        setcert_template_name79179((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_template_name79179?.isDisabled==null)
      {
        setcert_template_name79179((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequencefde55((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequencefde55?.isDisabled==null)
      {
        setstage_sequencefde55((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_codefe371((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_codefe371?.isDisabled==null)
      {
        setstage_type_codefe371((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_namef712f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_namef712f?.isDisabled==null)
      {
        setstage_namef712f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approver_role_id")){
        setapprover_role_id278bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approver_role_id278bd?.isDisabled==null)
      {
        setapprover_role_id278bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_days")){
        setsla_days5202a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sla_days5202a?.isDisabled==null)
      {
        setsla_days5202a((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['text'] = text0cd7b,
        codeStates['settext'] = settext0cd7b,
        codeStates['cert_template_name'] = cert_template_name79179,
        codeStates['setcert_template_name'] = setcert_template_name79179,
        codeStates['stage_sequence'] = stage_sequencefde55,
        codeStates['setstage_sequence'] = setstage_sequencefde55,
        codeStates['stage_type_code'] = stage_type_codefe371,
        codeStates['setstage_type_code'] = setstage_type_codefe371,
        codeStates['stage_name'] = stage_namef712f,
        codeStates['setstage_name'] = setstage_namef712f,
        codeStates['approver_role_id'] = approver_role_id278bd,
        codeStates['setapprover_role_id'] = setapprover_role_id278bd,
        codeStates['sla_days'] = sla_days5202a,
        codeStates['setsla_days'] = setsla_days5202a,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "46a149b3f2104ac7ab84a4d24643cc06");
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
        codeStates['text'] = text0cd7b,
        codeStates['settext'] = settext0cd7b,
        codeStates['cert_template_name'] = cert_template_name79179,
        codeStates['setcert_template_name'] = setcert_template_name79179,
        codeStates['stage_sequence'] = stage_sequencefde55,
        codeStates['setstage_sequence'] = setstage_sequencefde55,
        codeStates['stage_type_code'] = stage_type_codefe371,
        codeStates['setstage_type_code'] = setstage_type_codefe371,
        codeStates['stage_name'] = stage_namef712f,
        codeStates['setstage_name'] = setstage_namef712f,
        codeStates['approver_role_id'] = approver_role_id278bd,
        codeStates['setapprover_role_id'] = setapprover_role_id278bd,
        codeStates['sla_days'] = sla_days5202a,
        codeStates['setsla_days'] = setsla_days5202a,
        codeStates['evidence_configuration_group'] = evidence_configuration_group8a0a2,
        codeStates['setevidence_configuration_group'] = setevidence_configuration_group8a0a2,
        codeStates['evidence_configuration_group8a0a2'] = evidence_configuration_group8a0a2Props,
        codeStates['setevidence_configuration_group8a0a2'] = setevidence_configuration_group8a0a2Props,
        codeStates['dynamicaction'] = dynamicaction218e0,
        codeStates['setdynamicaction'] = setdynamicaction218e0,
        codeStates['dynamicaction218e0'] = dynamicaction218e0Props,
        codeStates['setdynamicaction218e0'] = setdynamicaction218e0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stage_details_group3cc06Ref = useRef<any>(null);
  const handleClearSearch = () => {
    stage_details_group3cc06Ref.current?.setSearchParams();
    stage_details_group3cc06Ref.current?.handleSearch({});
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
        !Array.isArray(stage_details_group3cc06) &&
        Object.keys(stage_details_group3cc06)?.length > 0
      ) {
        setstage_details_group3cc06({})
      }
    } else prevRefreshRef.current = true
  }, [stage_details_group3cc06Props?.refresh])


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
        gridRow: '1 / 77',
      
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
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddcertificationstage_v1((pre:any)=>({...pre,_selectedGroup_:"stage_details_group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* 0cd7b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_template_name") ?<Dropdowncert_template_name   /* 79179 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("stage_sequence") ?<TextInputstage_sequence   /* fde55 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_type_code") ?<Dropdownstage_type_code   /* fe371 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("stage_name") ?<TextInputstage_name   /* f712f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approver_role_id") ?<Dropdownapprover_role_id   /* 278bd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("sla_days") ?<TextInputsla_days   /* 5202a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupstage_details_group
