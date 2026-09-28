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
import Textconnect_text  from "./Textconnect_text";
import TextInputbase_url  from "./TextInputbase_url";
import TextInputauth_method_code  from "./TextInputauth_method_code";
import TextInputcredential_ref  from "./TextInputcredential_ref";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupconnect_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sourcecategorycombo_v1Props, setdfd_sourcecategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "connect_text",
      "base_url",
      "auth_method_code",
      "credential_ref"
    ],
    "allowedGroups": [
      "canvas",
      "add_group",
      "source_details_grp",
      "connect_group",
      "scheduler_retry_grp",
      "ownership_ststus_grp",
      "last_run_grp",
      "dynamicactions"
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
  const {add_group9cddc, setadd_group9cddc}= useContext(TotalContext) as TotalContextProps;
  const {add_group9cddcProps, setadd_group9cddcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfd, setsource_details_grp23dfd}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp23dfdProps, setsource_details_grp23dfdProps}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616a, setconnect_group3616a}= useContext(TotalContext) as TotalContextProps;
  const {connect_group3616aProps, setconnect_group3616aProps}= useContext(TotalContext) as TotalContextProps;
  const {connect_textcbed4, setconnect_textcbed4}= useContext(TotalContext) as TotalContextProps;
  const {base_url40ed4, setbase_url40ed4}= useContext(TotalContext) as TotalContextProps;
  const {auth_method_codebde42, setauth_method_codebde42}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref168b0, setcredential_ref168b0}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aeb, setscheduler_retry_grp90aeb}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp90aebProps, setscheduler_retry_grp90aebProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249, setownership_ststus_grp32249}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp32249Props, setownership_ststus_grp32249Props}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98, setlast_run_grpa6d98}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpa6d98Props, setlast_run_grpa6d98Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6, setdynamicactions2cac6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2cac6Props, setdynamicactions2cac6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addintegrationsource_v1, setaddintegrationsource_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addIntegrationSource:AFVK:v1',
    [user],
    'GroupConnectGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "75540776da5947198c8ae1197e33616a");
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
    setconnect_group3616aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("connect_text")){
        setconnect_textcbed4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(connect_textcbed4?.isDisabled==null)
      {
        setconnect_textcbed4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("base_url")){
        setbase_url40ed4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(base_url40ed4?.isDisabled==null)
      {
        setbase_url40ed4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("auth_method_code")){
        setauth_method_codebde42((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(auth_method_codebde42?.isDisabled==null)
      {
        setauth_method_codebde42((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credential_ref")){
        setcredential_ref168b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_ref168b0?.isDisabled==null)
      {
        setcredential_ref168b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group9cddc,
        codeStates['setadd_group'] = setadd_group9cddc,
        codeStates['add_group9cddc'] = add_group9cddcProps,
        codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
        codeStates['source_details_grp'] = source_details_grp23dfd,
        codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
        codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
        codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
        codeStates['connect_group'] = connect_group3616a,
        codeStates['setconnect_group'] = setconnect_group3616a,
        codeStates['connect_group3616a'] = connect_group3616aProps,
        codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
        codeStates['connect_text'] = connect_textcbed4,
        codeStates['setconnect_text'] = setconnect_textcbed4,
        codeStates['base_url'] = base_url40ed4,
        codeStates['setbase_url'] = setbase_url40ed4,
        codeStates['auth_method_code'] = auth_method_codebde42,
        codeStates['setauth_method_code'] = setauth_method_codebde42,
        codeStates['credential_ref'] = credential_ref168b0,
        codeStates['setcredential_ref'] = setcredential_ref168b0,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
        codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
        codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
        codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
        codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
        codeStates['last_run_grp'] = last_run_grpa6d98,
        codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
        codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
        codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
        codeStates['dynamicactions'] = dynamicactions2cac6,
        codeStates['setdynamicactions'] = setdynamicactions2cac6,
        codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
        codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "75540776da5947198c8ae1197e33616a");
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
        codeStates['add_group'] = add_group9cddc,
        codeStates['setadd_group'] = setadd_group9cddc,
        codeStates['add_group9cddc'] = add_group9cddcProps,
        codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
        codeStates['source_details_grp'] = source_details_grp23dfd,
        codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
        codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
        codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
        codeStates['connect_group'] = connect_group3616a,
        codeStates['setconnect_group'] = setconnect_group3616a,
        codeStates['connect_group3616a'] = connect_group3616aProps,
        codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
        codeStates['connect_text'] = connect_textcbed4,
        codeStates['setconnect_text'] = setconnect_textcbed4,
        codeStates['base_url'] = base_url40ed4,
        codeStates['setbase_url'] = setbase_url40ed4,
        codeStates['auth_method_code'] = auth_method_codebde42,
        codeStates['setauth_method_code'] = setauth_method_codebde42,
        codeStates['credential_ref'] = credential_ref168b0,
        codeStates['setcredential_ref'] = setcredential_ref168b0,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
        codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
        codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
        codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
        codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
        codeStates['last_run_grp'] = last_run_grpa6d98,
        codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
        codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
        codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
        codeStates['dynamicactions'] = dynamicactions2cac6,
        codeStates['setdynamicactions'] = setdynamicactions2cac6,
        codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
        codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const connect_group3616aRef = useRef<any>(null);
  const handleClearSearch = () => {
    connect_group3616aRef.current?.setSearchParams();
    connect_group3616aRef.current?.handleSearch({});
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
        !Array.isArray(connect_group3616a) &&
        Object.keys(connect_group3616a)?.length > 0
      ) {
        setconnect_group3616a({})
      }
    } else prevRefreshRef.current = true
  }, [connect_group3616aProps?.refresh])


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
        gridColumn: '14 / 25',
        gridRow: '1 / 36',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '4px',
        backgroundColor:'#ffff',
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
          setaddintegrationsource_v1((pre:any)=>({...pre,_selectedGroup_:"connect_group"}))
        }}
    >
          {allowedControls.includes("connect_text") ?<Textconnect_text   /* cbed4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("base_url") ?<TextInputbase_url   /* 40ed4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("auth_method_code") ?<TextInputauth_method_code   /* bde42 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("credential_ref") ?<TextInputcredential_ref   /* 168b0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupconnect_group
