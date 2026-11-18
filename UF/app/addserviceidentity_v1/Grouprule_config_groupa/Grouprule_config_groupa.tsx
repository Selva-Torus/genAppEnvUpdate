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
import Textinfo_rule  from "./Textinfo_rule";
import Dropdownasset_name  from "./Dropdownasset_name";
import Dropdownprincipal_type  from "./Dropdownprincipal_type";
import TextInputprincipal_id  from "./TextInputprincipal_id";
import Dropdownidentity_provider  from "./Dropdownidentity_provider";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_config_groupa = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policystatuscombo_v1Props, setdfd_policystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crenditalsrefnamecombo_v1Props, setdfd_crenditalsrefnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_identityprovidercombo_v1Props, setdfd_identityprovidercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_credtypecombo_v1Props, setdfd_credtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "info_rule",
      "asset_name",
      "principal_type",
      "principal_id",
      "identity_provider"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_groupa",
      "rule_config_group",
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
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule8c9ca, setinfo_rule8c9ca}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7bcd2, setasset_name7bcd2}= useContext(TotalContext) as TotalContextProps;
  const {principal_typee2125, setprincipal_typee2125}= useContext(TotalContext) as TotalContextProps;
  const {principal_id014c3, setprincipal_id014c3}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider06648, setidentity_provider06648}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addserviceidentity_v1, setaddserviceidentity_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addServiceIdentity:AFVK:v1',
    [user],
    'GroupRuleConfigGroupa',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2625f75e8e7d98ce085e0d93bb67e53e");
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
    setrule_config_groupa7e53eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("info_rule")){
        setinfo_rule8c9ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(info_rule8c9ca?.isDisabled==null)
      {
        setinfo_rule8c9ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name7bcd2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name7bcd2?.isDisabled==null)
      {
        setasset_name7bcd2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_type")){
        setprincipal_typee2125((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_typee2125?.isDisabled==null)
      {
        setprincipal_typee2125((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_id")){
        setprincipal_id014c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_id014c3?.isDisabled==null)
      {
        setprincipal_id014c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_provider06648((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_provider06648?.isDisabled==null)
      {
        setidentity_provider06648((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group9d912,
        codeStates['setinfo_group'] = setinfo_group9d912,
        codeStates['info_group9d912'] = info_group9d912Props,
        codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
        codeStates['group'] = groupe6728,
        codeStates['setgroup'] = setgroupe6728,
        codeStates['groupe6728'] = groupe6728Props,
        codeStates['setgroupe6728'] = setgroupe6728Props,
        codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
        codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
        codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
        codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
        codeStates['info_rule'] = info_rule8c9ca,
        codeStates['setinfo_rule'] = setinfo_rule8c9ca,
        codeStates['asset_name'] = asset_name7bcd2,
        codeStates['setasset_name'] = setasset_name7bcd2,
        codeStates['principal_type'] = principal_typee2125,
        codeStates['setprincipal_type'] = setprincipal_typee2125,
        codeStates['principal_id'] = principal_id014c3,
        codeStates['setprincipal_id'] = setprincipal_id014c3,
        codeStates['identity_provider'] = identity_provider06648,
        codeStates['setidentity_provider'] = setidentity_provider06648,
        codeStates['rule_config_group'] = rule_config_group98282,
        codeStates['setrule_config_group'] = setrule_config_group98282,
        codeStates['rule_config_group98282'] = rule_config_group98282Props,
        codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
        codeStates['dynamicactions'] = dynamicactions5796b,
        codeStates['setdynamicactions'] = setdynamicactions5796b,
        codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
        codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2625f75e8e7d98ce085e0d93bb67e53e");
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
        codeStates['info_group'] = info_group9d912,
        codeStates['setinfo_group'] = setinfo_group9d912,
        codeStates['info_group9d912'] = info_group9d912Props,
        codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
        codeStates['group'] = groupe6728,
        codeStates['setgroup'] = setgroupe6728,
        codeStates['groupe6728'] = groupe6728Props,
        codeStates['setgroupe6728'] = setgroupe6728Props,
        codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
        codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
        codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
        codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
        codeStates['info_rule'] = info_rule8c9ca,
        codeStates['setinfo_rule'] = setinfo_rule8c9ca,
        codeStates['asset_name'] = asset_name7bcd2,
        codeStates['setasset_name'] = setasset_name7bcd2,
        codeStates['principal_type'] = principal_typee2125,
        codeStates['setprincipal_type'] = setprincipal_typee2125,
        codeStates['principal_id'] = principal_id014c3,
        codeStates['setprincipal_id'] = setprincipal_id014c3,
        codeStates['identity_provider'] = identity_provider06648,
        codeStates['setidentity_provider'] = setidentity_provider06648,
        codeStates['rule_config_group'] = rule_config_group98282,
        codeStates['setrule_config_group'] = setrule_config_group98282,
        codeStates['rule_config_group98282'] = rule_config_group98282Props,
        codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
        codeStates['dynamicactions'] = dynamicactions5796b,
        codeStates['setdynamicactions'] = setdynamicactions5796b,
        codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
        codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_config_groupa7e53eRef = useRef<any>(null);
  const handleClearSearch = () => {
    rule_config_groupa7e53eRef.current?.setSearchParams();
    rule_config_groupa7e53eRef.current?.handleSearch({});
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
        !Array.isArray(rule_config_groupa7e53e) &&
        Object.keys(rule_config_groupa7e53e)?.length > 0
      ) {
        setrule_config_groupa7e53e({})
        setrule_config_groupa7e53eProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [rule_config_groupa7e53eProps?.refresh])


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
        gridRow: '3 / 45',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f1f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddserviceidentity_v1((pre:any)=>({...pre,_selectedGroup_:"rule_config_groupa"}))
        }}
    >
          {allowedControls.includes("info_rule") ?<Textinfo_rule   /* 8c9ca */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<Dropdownasset_name   /* 7bcd2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("principal_type") ?<Dropdownprincipal_type   /* e2125 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("principal_id") ?<TextInputprincipal_id   /* 014c3 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("identity_provider") ?<Dropdownidentity_provider   /* 06648 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Grouprule_config_groupa
