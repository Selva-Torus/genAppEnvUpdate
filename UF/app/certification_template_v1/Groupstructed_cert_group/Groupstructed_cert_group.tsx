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
import Textstructed_cert  from "./Textstructed_cert";
import Texttire_2  from "./Texttire_2";
import Textstages  from "./Textstages";
import Textvalidity  from "./Textvalidity";
import Textin_use  from "./Textin_use";
import Textversion  from "./Textversion";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstructed_cert_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
      "structed_cert",
      "tire_2",
      "stages",
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
  const {structed_certa9a51, setstructed_certa9a51}= useContext(TotalContext) as TotalContextProps;
  const {tire_297bcf, settire_297bcf}= useContext(TotalContext) as TotalContextProps;
  const {stages00739, setstages00739}= useContext(TotalContext) as TotalContextProps;
  const {validity6e01e, setvalidity6e01e}= useContext(TotalContext) as TotalContextProps;
  const {in_use86cd2, setin_use86cd2}= useContext(TotalContext) as TotalContextProps;
  const {version59154, setversion59154}= useContext(TotalContext) as TotalContextProps;
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
    'GroupStructedCertGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "150af353600e4b5ba45cf78a708e6058");
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
    setstructed_cert_groupe6058Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("structed_cert")){
        setstructed_certa9a51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(structed_certa9a51?.isDisabled==null)
      {
        setstructed_certa9a51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tire_2")){
        settire_297bcf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tire_297bcf?.isDisabled==null)
      {
        settire_297bcf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stages")){
        setstages00739((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stages00739?.isDisabled==null)
      {
        setstages00739((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validity")){
        setvalidity6e01e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validity6e01e?.isDisabled==null)
      {
        setvalidity6e01e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("in_use")){
        setin_use86cd2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(in_use86cd2?.isDisabled==null)
      {
        setin_use86cd2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version")){
        setversion59154((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version59154?.isDisabled==null)
      {
        setversion59154((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['structed_cert'] = structed_certa9a51,
        codeStates['setstructed_cert'] = setstructed_certa9a51,
        codeStates['tire_2'] = tire_297bcf,
        codeStates['settire_2'] = settire_297bcf,
        codeStates['stages'] = stages00739,
        codeStates['setstages'] = setstages00739,
        codeStates['validity'] = validity6e01e,
        codeStates['setvalidity'] = setvalidity6e01e,
        codeStates['in_use'] = in_use86cd2,
        codeStates['setin_use'] = setin_use86cd2,
        codeStates['version'] = version59154,
        codeStates['setversion'] = setversion59154,
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "150af353600e4b5ba45cf78a708e6058");
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
        codeStates['structed_cert'] = structed_certa9a51,
        codeStates['setstructed_cert'] = setstructed_certa9a51,
        codeStates['tire_2'] = tire_297bcf,
        codeStates['settire_2'] = settire_297bcf,
        codeStates['stages'] = stages00739,
        codeStates['setstages'] = setstages00739,
        codeStates['validity'] = validity6e01e,
        codeStates['setvalidity'] = setvalidity6e01e,
        codeStates['in_use'] = in_use86cd2,
        codeStates['setin_use'] = setin_use86cd2,
        codeStates['version'] = version59154,
        codeStates['setversion'] = setversion59154,
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


  const structed_cert_groupe6058Ref = useRef<any>(null);
  const handleClearSearch = () => {
    structed_cert_groupe6058Ref.current?.setSearchParams();
    structed_cert_groupe6058Ref.current?.handleSearch({});
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
        !Array.isArray(structed_cert_groupe6058) &&
        Object.keys(structed_cert_groupe6058)?.length > 0
      ) {
        setstructed_cert_groupe6058({})
      }
    } else prevRefreshRef.current = true
  }, [structed_cert_groupe6058Props?.refresh])


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
        gridColumn: '8 / 16',
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
      className={`flex flex-col overflow-auto rounded-md p-3 !rounded-2xl border-2 border-solid ${isDark ? 'text-white' : 'text-black'}  ${certificatetemplate_v1?._selectedGroup_=="structed_cert_group" ?'border-2 border-solid !border-[var(--selection-color)]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"structed_cert_group"}))
        }}
    >
          {allowedControls.includes("structed_cert") ?<Textstructed_cert   /* a9a51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tire_2") ?<Texttire_2   /* 97bcf */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("stages") ?<Textstages   /* 00739 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("validity") ?<Textvalidity   /* 6e01e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("in_use") ?<Textin_use   /* 86cd2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("version") ?<Textversion   /* 59154 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupstructed_cert_group
