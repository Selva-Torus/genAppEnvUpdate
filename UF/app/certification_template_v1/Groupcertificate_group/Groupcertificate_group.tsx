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
import Textfull_certificate  from "./Textfull_certificate";
import Texttire_1  from "./Texttire_1";
import Textstages  from "./Textstages";
import Textvalidiity  from "./Textvalidiity";
import Textin_use  from "./Textin_use";
import Textversion  from "./Textversion";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcertificate_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "full_certificate",
      "tire_1",
      "stages",
      "validiity",
      "in_use",
      "version"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "certificate_group",
      "structed_cert_group",
      "light_weight_group",
      "cert_template_table"
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
  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {full_certificate203ea, setfull_certificate203ea}= useContext(TotalContext) as TotalContextProps;
  const {tire_1dcb19, settire_1dcb19}= useContext(TotalContext) as TotalContextProps;
  const {stagesd1045, setstagesd1045}= useContext(TotalContext) as TotalContextProps;
  const {validiitye81a8, setvalidiitye81a8}= useContext(TotalContext) as TotalContextProps;
  const {in_usea8ed3, setin_usea8ed3}= useContext(TotalContext) as TotalContextProps;
  const {version6d864, setversion6d864}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificatetemplate_v1, setcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1',
    [user],
    'GroupCertificateGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3311193537d54f6ea08022b33d722fde");
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
    setcertificate_group22fdeProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("full_certificate")){
        setfull_certificate203ea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(full_certificate203ea?.isDisabled==null)
      {
        setfull_certificate203ea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tire_1")){
        settire_1dcb19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tire_1dcb19?.isDisabled==null)
      {
        settire_1dcb19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stages")){
        setstagesd1045((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stagesd1045?.isDisabled==null)
      {
        setstagesd1045((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validiity")){
        setvalidiitye81a8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validiitye81a8?.isDisabled==null)
      {
        setvalidiitye81a8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("in_use")){
        setin_usea8ed3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(in_usea8ed3?.isDisabled==null)
      {
        setin_usea8ed3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version")){
        setversion6d864((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version6d864?.isDisabled==null)
      {
        setversion6d864((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeStates['certificate_group'] = certificate_group22fde,
        codeStates['setcertificate_group'] = setcertificate_group22fde,
        codeStates['certificate_group22fde'] = certificate_group22fdeProps,
        codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
        codeStates['full_certificate'] = full_certificate203ea,
        codeStates['setfull_certificate'] = setfull_certificate203ea,
        codeStates['tire_1'] = tire_1dcb19,
        codeStates['settire_1'] = settire_1dcb19,
        codeStates['stages'] = stagesd1045,
        codeStates['setstages'] = setstagesd1045,
        codeStates['validiity'] = validiitye81a8,
        codeStates['setvalidiity'] = setvalidiitye81a8,
        codeStates['in_use'] = in_usea8ed3,
        codeStates['setin_use'] = setin_usea8ed3,
        codeStates['version'] = version6d864,
        codeStates['setversion'] = setversion6d864,
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3311193537d54f6ea08022b33d722fde");
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
        codeStates['group'] = group12090,
        codeStates['setgroup'] = setgroup12090,
        codeStates['group12090'] = group12090Props,
        codeStates['setgroup12090'] = setgroup12090Props,
        codeStates['certificate_group'] = certificate_group22fde,
        codeStates['setcertificate_group'] = setcertificate_group22fde,
        codeStates['certificate_group22fde'] = certificate_group22fdeProps,
        codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
        codeStates['full_certificate'] = full_certificate203ea,
        codeStates['setfull_certificate'] = setfull_certificate203ea,
        codeStates['tire_1'] = tire_1dcb19,
        codeStates['settire_1'] = settire_1dcb19,
        codeStates['stages'] = stagesd1045,
        codeStates['setstages'] = setstagesd1045,
        codeStates['validiity'] = validiitye81a8,
        codeStates['setvalidiity'] = setvalidiitye81a8,
        codeStates['in_use'] = in_usea8ed3,
        codeStates['setin_use'] = setin_usea8ed3,
        codeStates['version'] = version6d864,
        codeStates['setversion'] = setversion6d864,
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_group22fdeRef = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_group22fdeRef.current?.setSearchParams();
    certificate_group22fdeRef.current?.handleSearch({});
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
        !Array.isArray(certificate_group22fde) &&
        Object.keys(certificate_group22fde)?.length > 0
      ) {
        setcertificate_group22fde({})
      }
    } else prevRefreshRef.current = true
  }, [certificate_group22fdeProps?.refresh])


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
        gridColumn: '1 / 8',
        gridRow: '12 / 48',
      
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
      className={`flex flex-col overflow-auto rounded-md p-3 !rounded-2xl border-2 border-solid ${isDark ? 'text-white' : 'text-black'}  ${certificatetemplate_v1?._selectedGroup_=="certificate_group" ?'border-2 border-solid !border-[var(--selection-color)]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_group"}))
        }}
    >
          {allowedControls.includes("full_certificate") ?<Textfull_certificate   /* 203ea */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tire_1") ?<Texttire_1   /* dcb19 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stages") ?<Textstages   /* d1045 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("validiity") ?<Textvalidiity   /* e81a8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("in_use") ?<Textin_use   /* a8ed3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("version") ?<Textversion   /* 6d864 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcertificate_group
