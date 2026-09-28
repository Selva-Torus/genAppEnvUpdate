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
import Textassets_by_business_unit_text  from "./Textassets_by_business_unit_text";
import Textconsumer_lending_text  from "./Textconsumer_lending_text";
import Progressconsumer_lending_progress  from "./Progressconsumer_lending_progress";
import Textgroup_functions_text  from "./Textgroup_functions_text";
import Progressgroup_functions_progress  from "./Progressgroup_functions_progress";
import Textoperations_text  from "./Textoperations_text";
import Progressoperations_progress  from "./Progressoperations_progress";
import Textfinancial_crime_text  from "./Textfinancial_crime_text";
import Progressfinancial_crime_progress  from "./Progressfinancial_crime_progress";
import Textcards_payments_text  from "./Textcards_payments_text";
import Progresscards_payments_progress  from "./Progresscards_payments_progress";
import Texttechnology_text  from "./Texttechnology_text";
import Progresstechnology_progress  from "./Progresstechnology_progress";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupassets_by_business_unit_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
      "assets_by_business_unit_text",
      "consumer_lending_text",
      "consumer_lending_progress",
      "group_functions_text",
      "group_functions_progress",
      "operations_text",
      "operations_progress",
      "financial_crime_text",
      "financial_crime_progress",
      "cards_payments_text",
      "cards_payments_progress",
      "technology_text",
      "technology_progress"
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
  const {assets_by_business_unit_text4d6de, setassets_by_business_unit_text4d6de}= useContext(TotalContext) as TotalContextProps;
  const {consumer_lending_textefa99, setconsumer_lending_textefa99}= useContext(TotalContext) as TotalContextProps;
  const {consumer_lending_progress2fc54, setconsumer_lending_progress2fc54}= useContext(TotalContext) as TotalContextProps;
  const {group_functions_text8952f, setgroup_functions_text8952f}= useContext(TotalContext) as TotalContextProps;
  const {group_functions_progress9da7f, setgroup_functions_progress9da7f}= useContext(TotalContext) as TotalContextProps;
  const {operations_text8f8e9, setoperations_text8f8e9}= useContext(TotalContext) as TotalContextProps;
  const {operations_progress41d7e, setoperations_progress41d7e}= useContext(TotalContext) as TotalContextProps;
  const {financial_crime_textcfa1a, setfinancial_crime_textcfa1a}= useContext(TotalContext) as TotalContextProps;
  const {financial_crime_progresse6070, setfinancial_crime_progresse6070}= useContext(TotalContext) as TotalContextProps;
  const {cards_payments_text80d57, setcards_payments_text80d57}= useContext(TotalContext) as TotalContextProps;
  const {cards_payments_progressc4402, setcards_payments_progressc4402}= useContext(TotalContext) as TotalContextProps;
  const {technology_textb5146, settechnology_textb5146}= useContext(TotalContext) as TotalContextProps;
  const {technology_progressc4269, settechnology_progressc4269}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAssetsByBusinessUnitGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1e7362a8a8ea46bda7a7e2dcb4b374c2");
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
    setassets_by_business_unit_group374c2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("assets_by_business_unit_text")){
        setassets_by_business_unit_text4d6de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assets_by_business_unit_text4d6de?.isDisabled==null)
      {
        setassets_by_business_unit_text4d6de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("consumer_lending_text")){
        setconsumer_lending_textefa99((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(consumer_lending_textefa99?.isDisabled==null)
      {
        setconsumer_lending_textefa99((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("consumer_lending_progress")){
        setconsumer_lending_progress2fc54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(consumer_lending_progress2fc54?.isDisabled==null)
      {
        setconsumer_lending_progress2fc54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("group_functions_text")){
        setgroup_functions_text8952f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(group_functions_text8952f?.isDisabled==null)
      {
        setgroup_functions_text8952f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("group_functions_progress")){
        setgroup_functions_progress9da7f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(group_functions_progress9da7f?.isDisabled==null)
      {
        setgroup_functions_progress9da7f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operations_text")){
        setoperations_text8f8e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operations_text8f8e9?.isDisabled==null)
      {
        setoperations_text8f8e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("operations_progress")){
        setoperations_progress41d7e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(operations_progress41d7e?.isDisabled==null)
      {
        setoperations_progress41d7e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("financial_crime_text")){
        setfinancial_crime_textcfa1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(financial_crime_textcfa1a?.isDisabled==null)
      {
        setfinancial_crime_textcfa1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("financial_crime_progress")){
        setfinancial_crime_progresse6070((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(financial_crime_progresse6070?.isDisabled==null)
      {
        setfinancial_crime_progresse6070((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cards_payments_text")){
        setcards_payments_text80d57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cards_payments_text80d57?.isDisabled==null)
      {
        setcards_payments_text80d57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cards_payments_progress")){
        setcards_payments_progressc4402((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cards_payments_progressc4402?.isDisabled==null)
      {
        setcards_payments_progressc4402((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("technology_text")){
        settechnology_textb5146((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(technology_textb5146?.isDisabled==null)
      {
        settechnology_textb5146((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("technology_progress")){
        settechnology_progressc4269((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(technology_progressc4269?.isDisabled==null)
      {
        settechnology_progressc4269((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['overall_group0ca82'] = overall_group0ca82Props,
        codeStates['setoverall_group0ca82'] = setoverall_group0ca82Props,
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
        codeStates['assets_by_business_unit_text'] = assets_by_business_unit_text4d6de,
        codeStates['setassets_by_business_unit_text'] = setassets_by_business_unit_text4d6de,
        codeStates['consumer_lending_text'] = consumer_lending_textefa99,
        codeStates['setconsumer_lending_text'] = setconsumer_lending_textefa99,
        codeStates['consumer_lending_progress'] = consumer_lending_progress2fc54,
        codeStates['setconsumer_lending_progress'] = setconsumer_lending_progress2fc54,
        codeStates['group_functions_text'] = group_functions_text8952f,
        codeStates['setgroup_functions_text'] = setgroup_functions_text8952f,
        codeStates['group_functions_progress'] = group_functions_progress9da7f,
        codeStates['setgroup_functions_progress'] = setgroup_functions_progress9da7f,
        codeStates['operations_text'] = operations_text8f8e9,
        codeStates['setoperations_text'] = setoperations_text8f8e9,
        codeStates['operations_progress'] = operations_progress41d7e,
        codeStates['setoperations_progress'] = setoperations_progress41d7e,
        codeStates['financial_crime_text'] = financial_crime_textcfa1a,
        codeStates['setfinancial_crime_text'] = setfinancial_crime_textcfa1a,
        codeStates['financial_crime_progress'] = financial_crime_progresse6070,
        codeStates['setfinancial_crime_progress'] = setfinancial_crime_progresse6070,
        codeStates['cards_payments_text'] = cards_payments_text80d57,
        codeStates['setcards_payments_text'] = setcards_payments_text80d57,
        codeStates['cards_payments_progress'] = cards_payments_progressc4402,
        codeStates['setcards_payments_progress'] = setcards_payments_progressc4402,
        codeStates['technology_text'] = technology_textb5146,
        codeStates['settechnology_text'] = settechnology_textb5146,
        codeStates['technology_progress'] = technology_progressc4269,
        codeStates['settechnology_progress'] = settechnology_progressc4269,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1e7362a8a8ea46bda7a7e2dcb4b374c2");
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
        codeStates['assets_by_business_unit_text'] = assets_by_business_unit_text4d6de,
        codeStates['setassets_by_business_unit_text'] = setassets_by_business_unit_text4d6de,
        codeStates['consumer_lending_text'] = consumer_lending_textefa99,
        codeStates['setconsumer_lending_text'] = setconsumer_lending_textefa99,
        codeStates['consumer_lending_progress'] = consumer_lending_progress2fc54,
        codeStates['setconsumer_lending_progress'] = setconsumer_lending_progress2fc54,
        codeStates['group_functions_text'] = group_functions_text8952f,
        codeStates['setgroup_functions_text'] = setgroup_functions_text8952f,
        codeStates['group_functions_progress'] = group_functions_progress9da7f,
        codeStates['setgroup_functions_progress'] = setgroup_functions_progress9da7f,
        codeStates['operations_text'] = operations_text8f8e9,
        codeStates['setoperations_text'] = setoperations_text8f8e9,
        codeStates['operations_progress'] = operations_progress41d7e,
        codeStates['setoperations_progress'] = setoperations_progress41d7e,
        codeStates['financial_crime_text'] = financial_crime_textcfa1a,
        codeStates['setfinancial_crime_text'] = setfinancial_crime_textcfa1a,
        codeStates['financial_crime_progress'] = financial_crime_progresse6070,
        codeStates['setfinancial_crime_progress'] = setfinancial_crime_progresse6070,
        codeStates['cards_payments_text'] = cards_payments_text80d57,
        codeStates['setcards_payments_text'] = setcards_payments_text80d57,
        codeStates['cards_payments_progress'] = cards_payments_progressc4402,
        codeStates['setcards_payments_progress'] = setcards_payments_progressc4402,
        codeStates['technology_text'] = technology_textb5146,
        codeStates['settechnology_text'] = settechnology_textb5146,
        codeStates['technology_progress'] = technology_progressc4269,
        codeStates['settechnology_progress'] = settechnology_progressc4269,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const assets_by_business_unit_group374c2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    assets_by_business_unit_group374c2Ref.current?.setSearchParams();
    assets_by_business_unit_group374c2Ref.current?.handleSearch({});
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
        !Array.isArray(assets_by_business_unit_group374c2) &&
        Object.keys(assets_by_business_unit_group374c2)?.length > 0
      ) {
        setassets_by_business_unit_group374c2({})
      }
    } else prevRefreshRef.current = true
  }, [assets_by_business_unit_group374c2Props?.refresh])


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
        gridColumn: '15 / 25',
        gridRow: '104 / 163',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '3px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 bg-white ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"assets_by_business_unit_group"}))
        }}
    >
          {allowedControls.includes("assets_by_business_unit_text") ?<Textassets_by_business_unit_text   /* 4d6de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("consumer_lending_text") ?<Textconsumer_lending_text   /* efa99 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("consumer_lending_progress")?<Progressconsumer_lending_progress  /* 2fc54 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("group_functions_text") ?<Textgroup_functions_text   /* 8952f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("group_functions_progress")?<Progressgroup_functions_progress  /* 9da7f */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("operations_text") ?<Textoperations_text   /* 8f8e9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("operations_progress")?<Progressoperations_progress  /* 41d7e */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("financial_crime_text") ?<Textfinancial_crime_text   /* cfa1a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("financial_crime_progress")?<Progressfinancial_crime_progress  /* e6070 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("cards_payments_text") ?<Textcards_payments_text   /* 80d57 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cards_payments_progress")?<Progresscards_payments_progress  /* c4402 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("technology_text") ?<Texttechnology_text   /* b5146 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("technology_progress")?<Progresstechnology_progress  /* c4269 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupassets_by_business_unit_group
