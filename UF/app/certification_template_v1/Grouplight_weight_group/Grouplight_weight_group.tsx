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
import Textlight_weight_group  from "./Textlight_weight_group";
import Texttire_3  from "./Texttire_3";
import Textstage  from "./Textstage";
import Textvalidity  from "./Textvalidity";
import Textin_use  from "./Textin_use";
import Textversion  from "./Textversion";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouplight_weight_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
      "light_weight_group",
      "tire_3",
      "stage",
      "validity",
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
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group76252, setlight_weight_group76252}= useContext(TotalContext) as TotalContextProps;
  const {tire_384a05, settire_384a05}= useContext(TotalContext) as TotalContextProps;
  const {stage96582, setstage96582}= useContext(TotalContext) as TotalContextProps;
  const {validity09969, setvalidity09969}= useContext(TotalContext) as TotalContextProps;
  const {in_use0fffb, setin_use0fffb}= useContext(TotalContext) as TotalContextProps;
  const {version92bd2, setversion92bd2}= useContext(TotalContext) as TotalContextProps;
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
    'GroupLightWeightGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0804d731f31b4f078583fa3c9a215e17");
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
    setlight_weight_group15e17Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("light_weight_group")){
        setlight_weight_group76252((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(light_weight_group76252?.isDisabled==null)
      {
        setlight_weight_group76252((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tire_3")){
        settire_384a05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tire_384a05?.isDisabled==null)
      {
        settire_384a05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage")){
        setstage96582((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage96582?.isDisabled==null)
      {
        setstage96582((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validity")){
        setvalidity09969((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validity09969?.isDisabled==null)
      {
        setvalidity09969((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("in_use")){
        setin_use0fffb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(in_use0fffb?.isDisabled==null)
      {
        setin_use0fffb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version")){
        setversion92bd2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version92bd2?.isDisabled==null)
      {
        setversion92bd2((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['light_weight_group'] = light_weight_group76252,
        codeStates['setlight_weight_group'] = setlight_weight_group76252,
        codeStates['tire_3'] = tire_384a05,
        codeStates['settire_3'] = settire_384a05,
        codeStates['stage'] = stage96582,
        codeStates['setstage'] = setstage96582,
        codeStates['validity'] = validity09969,
        codeStates['setvalidity'] = setvalidity09969,
        codeStates['in_use'] = in_use0fffb,
        codeStates['setin_use'] = setin_use0fffb,
        codeStates['version'] = version92bd2,
        codeStates['setversion'] = setversion92bd2,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0804d731f31b4f078583fa3c9a215e17");
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
        codeStates['structed_cert_group'] = structed_cert_groupe6058,
        codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
        codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
        codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
        codeStates['light_weight_group'] = light_weight_group15e17,
        codeStates['setlight_weight_group'] = setlight_weight_group15e17,
        codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
        codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
        codeStates['light_weight_group'] = light_weight_group76252,
        codeStates['setlight_weight_group'] = setlight_weight_group76252,
        codeStates['tire_3'] = tire_384a05,
        codeStates['settire_3'] = settire_384a05,
        codeStates['stage'] = stage96582,
        codeStates['setstage'] = setstage96582,
        codeStates['validity'] = validity09969,
        codeStates['setvalidity'] = setvalidity09969,
        codeStates['in_use'] = in_use0fffb,
        codeStates['setin_use'] = setin_use0fffb,
        codeStates['version'] = version92bd2,
        codeStates['setversion'] = setversion92bd2,
        codeStates['cert_template_table'] = cert_template_table75349,
        codeStates['setcert_template_table'] = setcert_template_table75349,
        codeStates['cert_template_table75349'] = cert_template_table75349Props,
        codeStates['setcert_template_table75349'] = setcert_template_table75349Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const light_weight_group15e17Ref = useRef<any>(null);
  const handleClearSearch = () => {
    light_weight_group15e17Ref.current?.setSearchParams();
    light_weight_group15e17Ref.current?.handleSearch({});
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
        !Array.isArray(light_weight_group15e17) &&
        Object.keys(light_weight_group15e17)?.length > 0
      ) {
        setlight_weight_group15e17({})
      }
    } else prevRefreshRef.current = true
  }, [light_weight_group15e17Props?.refresh])


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
        gridColumn: '16 / 24',
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
      className={`flex flex-col overflow-auto rounded-md p-3 !rounded-2xl border-2 border-solid ${isDark ? 'text-white' : 'text-black'}  ${certificatetemplate_v1?._selectedGroup_=="light_weight_group" ?'border-2 border-solid !border-[var(--selection-color)]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"light_weight_group"}))
        }}
    >
          {allowedControls.includes("light_weight_group") ?<Textlight_weight_group   /* 76252 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tire_3") ?<Texttire_3   /* 84a05 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stage") ?<Textstage   /* 96582 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("validity") ?<Textvalidity   /* 09969 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("in_use") ?<Textin_use   /* 0fffb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("version") ?<Textversion   /* 92bd2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouplight_weight_group
