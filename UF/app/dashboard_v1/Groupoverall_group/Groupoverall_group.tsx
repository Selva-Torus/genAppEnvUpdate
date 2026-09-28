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
import Groupregister_ai_group  from "../Groupregister_ai_group/Groupregister_ai_group";
import Grouptier_critical_group  from "../Grouptier_critical_group/Grouptier_critical_group";
import Groupcert_expired_group  from "../Groupcert_expired_group/Groupcert_expired_group";
import Groupnamed_owner_group  from "../Groupnamed_owner_group/Groupnamed_owner_group";
import Groupcert_date_group  from "../Groupcert_date_group/Groupcert_date_group";
import Groupgoverner_gap_group  from "../Groupgoverner_gap_group/Groupgoverner_gap_group";
import Grouppirchart_group  from "../Grouppirchart_group/Grouppirchart_group";
import Groupassets_by_business_unit_group  from "../Groupassets_by_business_unit_group/Groupassets_by_business_unit_group";
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
import Textdashboard_header  from "./Textdashboard_header";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_dashboardtable_v1Props, setdfd_dashboardtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardmetricsdashboard_v1Props, setdfd_cardmetricsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_piechartdashboard_v1Props, setdfd_piechartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "dashboard_header"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "register_ai_group",
      "tier_critical_group",
      "cert_expired_group",
      "named_owner_group",
      "cert_date_group",
      "governer_gap_group",
      "table",
      "pirchart_group",
      "assets_by_business_unit_group"
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
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;
  const {dashboard_header6ba08, setdashboard_header6ba08}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1',
    [user],
    'GroupOverallGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6f63338159af49af8169bf7dd310ca82");
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
    setoverall_group0ca82Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dashboard_header")){
        setdashboard_header6ba08((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dashboard_header6ba08?.isDisabled==null)
      {
        setdashboard_header6ba08((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("register_ai_group")){
        setregister_ai_group08810((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(register_ai_group08810?.isDisabled==null)
      {
        setregister_ai_group08810((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tier_critical_group")){
        settier_critical_group484c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tier_critical_group484c4?.isDisabled==null)
      {
        settier_critical_group484c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_expired_group")){
        setcert_expired_groupf48db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_expired_groupf48db?.isDisabled==null)
      {
        setcert_expired_groupf48db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("named_owner_group")){
        setnamed_owner_group4361e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(named_owner_group4361e?.isDisabled==null)
      {
        setnamed_owner_group4361e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_date_group")){
        setcert_date_group9ac35((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_date_group9ac35?.isDisabled==null)
      {
        setcert_date_group9ac35((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("governer_gap_group")){
        setgoverner_gap_group09585((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(governer_gap_group09585?.isDisabled==null)
      {
        setgoverner_gap_group09585((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pirchart_group")){
        setpirchart_group8d70d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(pirchart_group8d70d?.isDisabled==null)
      {
        setpirchart_group8d70d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assets_by_business_unit_group")){
        setassets_by_business_unit_group374c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assets_by_business_unit_group374c2?.isDisabled==null)
      {
        setassets_by_business_unit_group374c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['overall_group0ca82'] = overall_group0ca82Props,
        codeStates['setoverall_group0ca82'] = setoverall_group0ca82Props,
        codeStates['dashboard_header'] = dashboard_header6ba08,
        codeStates['setdashboard_header'] = setdashboard_header6ba08,
        codeStates['register_ai_group'] = register_ai_group08810,
        codeStates['setregister_ai_group'] = setregister_ai_group08810,
        codeStates['register_ai_group08810'] = register_ai_group08810Props,
        codeStates['setregister_ai_group08810'] = setregister_ai_group08810Props,
        codeStates['tier_critical_group'] = tier_critical_group484c4,
        codeStates['settier_critical_group'] = settier_critical_group484c4,
        codeStates['tier_critical_group484c4'] = tier_critical_group484c4Props,
        codeStates['settier_critical_group484c4'] = settier_critical_group484c4Props,
        codeStates['cert_expired_group'] = cert_expired_groupf48db,
        codeStates['setcert_expired_group'] = setcert_expired_groupf48db,
        codeStates['cert_expired_groupf48db'] = cert_expired_groupf48dbProps,
        codeStates['setcert_expired_groupf48db'] = setcert_expired_groupf48dbProps,
        codeStates['named_owner_group'] = named_owner_group4361e,
        codeStates['setnamed_owner_group'] = setnamed_owner_group4361e,
        codeStates['named_owner_group4361e'] = named_owner_group4361eProps,
        codeStates['setnamed_owner_group4361e'] = setnamed_owner_group4361eProps,
        codeStates['cert_date_group'] = cert_date_group9ac35,
        codeStates['setcert_date_group'] = setcert_date_group9ac35,
        codeStates['cert_date_group9ac35'] = cert_date_group9ac35Props,
        codeStates['setcert_date_group9ac35'] = setcert_date_group9ac35Props,
        codeStates['governer_gap_group'] = governer_gap_group09585,
        codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585,
        codeStates['governer_gap_group09585'] = governer_gap_group09585Props,
        codeStates['setgoverner_gap_group09585'] = setgoverner_gap_group09585Props,
        codeStates['table'] = table0a722,
        codeStates['settable'] = settable0a722,
        codeStates['table0a722'] = table0a722Props,
        codeStates['settable0a722'] = settable0a722Props,
        codeStates['pirchart_group'] = pirchart_group8d70d,
        codeStates['setpirchart_group'] = setpirchart_group8d70d,
        codeStates['pirchart_group8d70d'] = pirchart_group8d70dProps,
        codeStates['setpirchart_group8d70d'] = setpirchart_group8d70dProps,
        codeStates['assets_by_business_unit_group'] = assets_by_business_unit_group374c2,
        codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2,
        codeStates['assets_by_business_unit_group374c2'] = assets_by_business_unit_group374c2Props,
        codeStates['setassets_by_business_unit_group374c2'] = setassets_by_business_unit_group374c2Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6f63338159af49af8169bf7dd310ca82");
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
        codeStates['overall_group'] = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['overall_group0ca82'] = overall_group0ca82Props,
        codeStates['setoverall_group0ca82'] = setoverall_group0ca82Props,
        codeStates['dashboard_header'] = dashboard_header6ba08,
        codeStates['setdashboard_header'] = setdashboard_header6ba08,
        codeStates['register_ai_group'] = register_ai_group08810,
        codeStates['setregister_ai_group'] = setregister_ai_group08810,
        codeStates['register_ai_group08810'] = register_ai_group08810Props,
        codeStates['setregister_ai_group08810'] = setregister_ai_group08810Props,
        codeStates['tier_critical_group'] = tier_critical_group484c4,
        codeStates['settier_critical_group'] = settier_critical_group484c4,
        codeStates['tier_critical_group484c4'] = tier_critical_group484c4Props,
        codeStates['settier_critical_group484c4'] = settier_critical_group484c4Props,
        codeStates['cert_expired_group'] = cert_expired_groupf48db,
        codeStates['setcert_expired_group'] = setcert_expired_groupf48db,
        codeStates['cert_expired_groupf48db'] = cert_expired_groupf48dbProps,
        codeStates['setcert_expired_groupf48db'] = setcert_expired_groupf48dbProps,
        codeStates['named_owner_group'] = named_owner_group4361e,
        codeStates['setnamed_owner_group'] = setnamed_owner_group4361e,
        codeStates['named_owner_group4361e'] = named_owner_group4361eProps,
        codeStates['setnamed_owner_group4361e'] = setnamed_owner_group4361eProps,
        codeStates['cert_date_group'] = cert_date_group9ac35,
        codeStates['setcert_date_group'] = setcert_date_group9ac35,
        codeStates['cert_date_group9ac35'] = cert_date_group9ac35Props,
        codeStates['setcert_date_group9ac35'] = setcert_date_group9ac35Props,
        codeStates['governer_gap_group'] = governer_gap_group09585,
        codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585,
        codeStates['governer_gap_group09585'] = governer_gap_group09585Props,
        codeStates['setgoverner_gap_group09585'] = setgoverner_gap_group09585Props,
        codeStates['table'] = table0a722,
        codeStates['settable'] = settable0a722,
        codeStates['table0a722'] = table0a722Props,
        codeStates['settable0a722'] = settable0a722Props,
        codeStates['pirchart_group'] = pirchart_group8d70d,
        codeStates['setpirchart_group'] = setpirchart_group8d70d,
        codeStates['pirchart_group8d70d'] = pirchart_group8d70dProps,
        codeStates['setpirchart_group8d70d'] = setpirchart_group8d70dProps,
        codeStates['assets_by_business_unit_group'] = assets_by_business_unit_group374c2,
        codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2,
        codeStates['assets_by_business_unit_group374c2'] = assets_by_business_unit_group374c2Props,
        codeStates['setassets_by_business_unit_group374c2'] = setassets_by_business_unit_group374c2Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_group0ca82Ref = useRef<any>(null);
  const handleClearSearch = () => {
    overall_group0ca82Ref.current?.setSearchParams();
    overall_group0ca82Ref.current?.handleSearch({});
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
        !Array.isArray(overall_group0ca82) &&
        Object.keys(overall_group0ca82)?.length > 0
      ) {
        setoverall_group0ca82({})
      }
    } else prevRefreshRef.current = true
  }, [overall_group0ca82Props?.refresh])


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
        gridRow: '1 / 170',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#F1F2F7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"overall_group"}))
        }}
    >
        {allowedComponent.includes("register_ai_group")  &&<Groupregister_ai_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("tier_critical_group")  &&<Grouptier_critical_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("cert_expired_group")  &&<Groupcert_expired_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("named_owner_group")  &&<Groupnamed_owner_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("cert_date_group")  &&<Groupcert_date_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("governer_gap_group")  &&<Groupgoverner_gap_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("pirchart_group")  &&<Grouppirchart_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("assets_by_business_unit_group")  &&<Groupassets_by_business_unit_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("dashboard_header") ?<Textdashboard_header   /* 6ba08 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupoverall_group
