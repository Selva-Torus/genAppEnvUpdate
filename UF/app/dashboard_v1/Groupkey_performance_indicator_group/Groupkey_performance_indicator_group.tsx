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
import Textkey_performance_indicators_text  from "./Textkey_performance_indicators_text";
import Texttotal_active_accounts_text  from "./Texttotal_active_accounts_text";
import Texttotal_active_accounts_text1  from "./Texttotal_active_accounts_text1";
import Dividerdivider1  from "./Dividerdivider1";
import Textavg_days_to_judgment_text  from "./Textavg_days_to_judgment_text";
import Textavg_days_to_judgment_text1  from "./Textavg_days_to_judgment_text1";
import Dividerdivider2  from "./Dividerdivider2";
import Textcourt_rejection_rate_text  from "./Textcourt_rejection_rate_text";
import Textcourt_rejection_rate_text1  from "./Textcourt_rejection_rate_text1";
import Dividerdivider3  from "./Dividerdivider3";
import Textcompliance_score_text  from "./Textcompliance_score_text";
import Textcompliance_score_text1  from "./Textcompliance_score_text1";
import Dividerdivider4  from "./Dividerdivider4";
import Textcollection_rate_mtd_text  from "./Textcollection_rate_mtd_text";
import Textcollection_rate_mtd_text1  from "./Textcollection_rate_mtd_text1";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupkey_performance_indicator_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_amrqueuedashboard_v1Props, setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_pendingfilingsdashboard_v1Props, setdfd_pendingfilingsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardsdashboard_v1Props, setdfd_cardsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Branch Manager": {
    "allowedControls": [
      "key_performance_indicators_text",
      "total_active_accounts_text",
      "total_active_accounts_text1",
      "divider1",
      "avg_days_to_judgment_text",
      "avg_days_to_judgment_text1",
      "divider2",
      "court_rejection_rate_text",
      "court_rejection_rate_text1",
      "divider3",
      "compliance_score_text",
      "compliance_score_text1",
      "divider4",
      "collection_rate_mtd_text",
      "collection_rate_mtd_text1"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "asset_dashboard_group",
      "amr_queue_group",
      "pending_file_group",
      "service_pending_group",
      "slas_at_risk_group",
      "court_rejection_group",
      "collected_mtd_group",
      "overall_key_performance_indicators",
      "key_performance_indicator_group",
      "recent_activity_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "key_performance_indicators_text",
      "total_active_accounts_text",
      "total_active_accounts_text1",
      "divider1",
      "avg_days_to_judgment_text",
      "avg_days_to_judgment_text1",
      "divider2",
      "court_rejection_rate_text",
      "court_rejection_rate_text1",
      "divider3",
      "compliance_score_text",
      "compliance_score_text1",
      "divider4",
      "collection_rate_mtd_text",
      "collection_rate_mtd_text1"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "asset_dashboard_group",
      "amr_queue_group",
      "pending_file_group",
      "service_pending_group",
      "slas_at_risk_group",
      "court_rejection_group",
      "collected_mtd_group",
      "overall_key_performance_indicators",
      "key_performance_indicator_group",
      "recent_activity_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
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
  const {header_groupd8ba9, setheader_groupd8ba9}= useContext(TotalContext) as TotalContextProps;
  const {header_groupd8ba9Props, setheader_groupd8ba9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03, setasset_dashboard_group1aa03}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03Props, setasset_dashboard_group1aa03Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082, setamr_queue_group3c082}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082Props, setamr_queue_group3c082Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128c, setpending_file_group2128c}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128cProps, setpending_file_group2128cProps}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0ca, setservice_pending_group8c0ca}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0caProps, setservice_pending_group8c0caProps}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0Props, setslas_at_risk_group1f8c0Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57a, setcourt_rejection_groupdf57a}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57aProps, setcourt_rejection_groupdf57aProps}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074, setcollected_mtd_group0f074}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074Props, setcollected_mtd_group0f074Props}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicators_text4f6db, setkey_performance_indicators_text4f6db}= useContext(TotalContext) as TotalContextProps;
  const {total_active_accounts_texted4d7, settotal_active_accounts_texted4d7}= useContext(TotalContext) as TotalContextProps;
  const {total_active_accounts_text1b45d0, settotal_active_accounts_text1b45d0}= useContext(TotalContext) as TotalContextProps;
  const {divider13ca73, setdivider13ca73}= useContext(TotalContext) as TotalContextProps;
  const {avg_days_to_judgment_text82b69, setavg_days_to_judgment_text82b69}= useContext(TotalContext) as TotalContextProps;
  const {avg_days_to_judgment_text14ed01, setavg_days_to_judgment_text14ed01}= useContext(TotalContext) as TotalContextProps;
  const {divider214543, setdivider214543}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_rate_text86ac0, setcourt_rejection_rate_text86ac0}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_rate_text10b69f, setcourt_rejection_rate_text10b69f}= useContext(TotalContext) as TotalContextProps;
  const {divider39db36, setdivider39db36}= useContext(TotalContext) as TotalContextProps;
  const {compliance_score_textbf682, setcompliance_score_textbf682}= useContext(TotalContext) as TotalContextProps;
  const {compliance_score_text1f41e4, setcompliance_score_text1f41e4}= useContext(TotalContext) as TotalContextProps;
  const {divider432793, setdivider432793}= useContext(TotalContext) as TotalContextProps;
  const {collection_rate_mtd_text335f5, setcollection_rate_mtd_text335f5}= useContext(TotalContext) as TotalContextProps;
  const {collection_rate_mtd_text16258d, setcollection_rate_mtd_text16258d}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newdashboard_v1, setnewdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1',
    [user],
    'GroupKeyPerformanceIndicatorGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a3e36a46b1994131bd3d7cb1841f9eaf");
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
    setkey_performance_indicator_groupf9eafProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("key_performance_indicators_text")){
        setkey_performance_indicators_text4f6db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(key_performance_indicators_text4f6db?.isDisabled==null)
      {
        setkey_performance_indicators_text4f6db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_active_accounts_text")){
        settotal_active_accounts_texted4d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_active_accounts_texted4d7?.isDisabled==null)
      {
        settotal_active_accounts_texted4d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_active_accounts_text1")){
        settotal_active_accounts_text1b45d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_active_accounts_text1b45d0?.isDisabled==null)
      {
        settotal_active_accounts_text1b45d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider1")){
        setdivider13ca73((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider13ca73?.isDisabled==null)
      {
        setdivider13ca73((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("avg_days_to_judgment_text")){
        setavg_days_to_judgment_text82b69((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(avg_days_to_judgment_text82b69?.isDisabled==null)
      {
        setavg_days_to_judgment_text82b69((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("avg_days_to_judgment_text1")){
        setavg_days_to_judgment_text14ed01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(avg_days_to_judgment_text14ed01?.isDisabled==null)
      {
        setavg_days_to_judgment_text14ed01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider2")){
        setdivider214543((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider214543?.isDisabled==null)
      {
        setdivider214543((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_rejection_rate_text")){
        setcourt_rejection_rate_text86ac0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_rejection_rate_text86ac0?.isDisabled==null)
      {
        setcourt_rejection_rate_text86ac0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_rejection_rate_text1")){
        setcourt_rejection_rate_text10b69f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_rejection_rate_text10b69f?.isDisabled==null)
      {
        setcourt_rejection_rate_text10b69f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider3")){
        setdivider39db36((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider39db36?.isDisabled==null)
      {
        setdivider39db36((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compliance_score_text")){
        setcompliance_score_textbf682((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(compliance_score_textbf682?.isDisabled==null)
      {
        setcompliance_score_textbf682((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compliance_score_text1")){
        setcompliance_score_text1f41e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(compliance_score_text1f41e4?.isDisabled==null)
      {
        setcompliance_score_text1f41e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider4")){
        setdivider432793((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider432793?.isDisabled==null)
      {
        setdivider432793((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("collection_rate_mtd_text")){
        setcollection_rate_mtd_text335f5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(collection_rate_mtd_text335f5?.isDisabled==null)
      {
        setcollection_rate_mtd_text335f5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("collection_rate_mtd_text1")){
        setcollection_rate_mtd_text16258d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(collection_rate_mtd_text16258d?.isDisabled==null)
      {
        setcollection_rate_mtd_text16258d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupd8ba9,
        codeStates['setheader_group'] = setheader_groupd8ba9,
        codeStates['header_groupd8ba9'] = header_groupd8ba9Props,
        codeStates['setheader_groupd8ba9'] = setheader_groupd8ba9Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group1aa03,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group1aa03,
        codeStates['asset_dashboard_group1aa03'] = asset_dashboard_group1aa03Props,
        codeStates['setasset_dashboard_group1aa03'] = setasset_dashboard_group1aa03Props,
        codeStates['amr_queue_group'] = amr_queue_group3c082,
        codeStates['setamr_queue_group'] = setamr_queue_group3c082,
        codeStates['amr_queue_group3c082'] = amr_queue_group3c082Props,
        codeStates['setamr_queue_group3c082'] = setamr_queue_group3c082Props,
        codeStates['pending_file_group'] = pending_file_group2128c,
        codeStates['setpending_file_group'] = setpending_file_group2128c,
        codeStates['pending_file_group2128c'] = pending_file_group2128cProps,
        codeStates['setpending_file_group2128c'] = setpending_file_group2128cProps,
        codeStates['service_pending_group'] = service_pending_group8c0ca,
        codeStates['setservice_pending_group'] = setservice_pending_group8c0ca,
        codeStates['service_pending_group8c0ca'] = service_pending_group8c0caProps,
        codeStates['setservice_pending_group8c0ca'] = setservice_pending_group8c0caProps,
        codeStates['slas_at_risk_group'] = slas_at_risk_group1f8c0,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group1f8c0,
        codeStates['slas_at_risk_group1f8c0'] = slas_at_risk_group1f8c0Props,
        codeStates['setslas_at_risk_group1f8c0'] = setslas_at_risk_group1f8c0Props,
        codeStates['court_rejection_group'] = court_rejection_groupdf57a,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupdf57a,
        codeStates['court_rejection_groupdf57a'] = court_rejection_groupdf57aProps,
        codeStates['setcourt_rejection_groupdf57a'] = setcourt_rejection_groupdf57aProps,
        codeStates['collected_mtd_group'] = collected_mtd_group0f074,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group0f074,
        codeStates['collected_mtd_group0f074'] = collected_mtd_group0f074Props,
        codeStates['setcollected_mtd_group0f074'] = setcollected_mtd_group0f074Props,
        codeStates['overall_key_performance_indicators'] = overall_key_performance_indicatorsc2711,
        codeStates['setoverall_key_performance_indicators'] = setoverall_key_performance_indicatorsc2711,
        codeStates['overall_key_performance_indicatorsc2711'] = overall_key_performance_indicatorsc2711Props,
        codeStates['setoverall_key_performance_indicatorsc2711'] = setoverall_key_performance_indicatorsc2711Props,
        codeStates['key_performance_indicator_group'] = key_performance_indicator_groupf9eaf,
        codeStates['setkey_performance_indicator_group'] = setkey_performance_indicator_groupf9eaf,
        codeStates['key_performance_indicator_groupf9eaf'] = key_performance_indicator_groupf9eafProps,
        codeStates['setkey_performance_indicator_groupf9eaf'] = setkey_performance_indicator_groupf9eafProps,
        codeStates['key_performance_indicators_text'] = key_performance_indicators_text4f6db,
        codeStates['setkey_performance_indicators_text'] = setkey_performance_indicators_text4f6db,
        codeStates['total_active_accounts_text'] = total_active_accounts_texted4d7,
        codeStates['settotal_active_accounts_text'] = settotal_active_accounts_texted4d7,
        codeStates['total_active_accounts_text1'] = total_active_accounts_text1b45d0,
        codeStates['settotal_active_accounts_text1'] = settotal_active_accounts_text1b45d0,
        codeStates['divider1'] = divider13ca73,
        codeStates['setdivider1'] = setdivider13ca73,
        codeStates['avg_days_to_judgment_text'] = avg_days_to_judgment_text82b69,
        codeStates['setavg_days_to_judgment_text'] = setavg_days_to_judgment_text82b69,
        codeStates['avg_days_to_judgment_text1'] = avg_days_to_judgment_text14ed01,
        codeStates['setavg_days_to_judgment_text1'] = setavg_days_to_judgment_text14ed01,
        codeStates['divider2'] = divider214543,
        codeStates['setdivider2'] = setdivider214543,
        codeStates['court_rejection_rate_text'] = court_rejection_rate_text86ac0,
        codeStates['setcourt_rejection_rate_text'] = setcourt_rejection_rate_text86ac0,
        codeStates['court_rejection_rate_text1'] = court_rejection_rate_text10b69f,
        codeStates['setcourt_rejection_rate_text1'] = setcourt_rejection_rate_text10b69f,
        codeStates['divider3'] = divider39db36,
        codeStates['setdivider3'] = setdivider39db36,
        codeStates['compliance_score_text'] = compliance_score_textbf682,
        codeStates['setcompliance_score_text'] = setcompliance_score_textbf682,
        codeStates['compliance_score_text1'] = compliance_score_text1f41e4,
        codeStates['setcompliance_score_text1'] = setcompliance_score_text1f41e4,
        codeStates['divider4'] = divider432793,
        codeStates['setdivider4'] = setdivider432793,
        codeStates['collection_rate_mtd_text'] = collection_rate_mtd_text335f5,
        codeStates['setcollection_rate_mtd_text'] = setcollection_rate_mtd_text335f5,
        codeStates['collection_rate_mtd_text1'] = collection_rate_mtd_text16258d,
        codeStates['setcollection_rate_mtd_text1'] = setcollection_rate_mtd_text16258d,
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupd8ba9,
        codeStates['setheader_group'] = setheader_groupd8ba9,
        codeStates['header_groupd8ba9'] = header_groupd8ba9Props,
        codeStates['setheader_groupd8ba9'] = setheader_groupd8ba9Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group1aa03,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group1aa03,
        codeStates['asset_dashboard_group1aa03'] = asset_dashboard_group1aa03Props,
        codeStates['setasset_dashboard_group1aa03'] = setasset_dashboard_group1aa03Props,
        codeStates['amr_queue_group'] = amr_queue_group3c082,
        codeStates['setamr_queue_group'] = setamr_queue_group3c082,
        codeStates['amr_queue_group3c082'] = amr_queue_group3c082Props,
        codeStates['setamr_queue_group3c082'] = setamr_queue_group3c082Props,
        codeStates['pending_file_group'] = pending_file_group2128c,
        codeStates['setpending_file_group'] = setpending_file_group2128c,
        codeStates['pending_file_group2128c'] = pending_file_group2128cProps,
        codeStates['setpending_file_group2128c'] = setpending_file_group2128cProps,
        codeStates['service_pending_group'] = service_pending_group8c0ca,
        codeStates['setservice_pending_group'] = setservice_pending_group8c0ca,
        codeStates['service_pending_group8c0ca'] = service_pending_group8c0caProps,
        codeStates['setservice_pending_group8c0ca'] = setservice_pending_group8c0caProps,
        codeStates['slas_at_risk_group'] = slas_at_risk_group1f8c0,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group1f8c0,
        codeStates['slas_at_risk_group1f8c0'] = slas_at_risk_group1f8c0Props,
        codeStates['setslas_at_risk_group1f8c0'] = setslas_at_risk_group1f8c0Props,
        codeStates['court_rejection_group'] = court_rejection_groupdf57a,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupdf57a,
        codeStates['court_rejection_groupdf57a'] = court_rejection_groupdf57aProps,
        codeStates['setcourt_rejection_groupdf57a'] = setcourt_rejection_groupdf57aProps,
        codeStates['collected_mtd_group'] = collected_mtd_group0f074,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group0f074,
        codeStates['collected_mtd_group0f074'] = collected_mtd_group0f074Props,
        codeStates['setcollected_mtd_group0f074'] = setcollected_mtd_group0f074Props,
        codeStates['overall_key_performance_indicators'] = overall_key_performance_indicatorsc2711,
        codeStates['setoverall_key_performance_indicators'] = setoverall_key_performance_indicatorsc2711,
        codeStates['overall_key_performance_indicatorsc2711'] = overall_key_performance_indicatorsc2711Props,
        codeStates['setoverall_key_performance_indicatorsc2711'] = setoverall_key_performance_indicatorsc2711Props,
        codeStates['key_performance_indicator_group'] = key_performance_indicator_groupf9eaf,
        codeStates['setkey_performance_indicator_group'] = setkey_performance_indicator_groupf9eaf,
        codeStates['key_performance_indicator_groupf9eaf'] = key_performance_indicator_groupf9eafProps,
        codeStates['setkey_performance_indicator_groupf9eaf'] = setkey_performance_indicator_groupf9eafProps,
        codeStates['key_performance_indicators_text'] = key_performance_indicators_text4f6db,
        codeStates['setkey_performance_indicators_text'] = setkey_performance_indicators_text4f6db,
        codeStates['total_active_accounts_text'] = total_active_accounts_texted4d7,
        codeStates['settotal_active_accounts_text'] = settotal_active_accounts_texted4d7,
        codeStates['total_active_accounts_text1'] = total_active_accounts_text1b45d0,
        codeStates['settotal_active_accounts_text1'] = settotal_active_accounts_text1b45d0,
        codeStates['divider1'] = divider13ca73,
        codeStates['setdivider1'] = setdivider13ca73,
        codeStates['avg_days_to_judgment_text'] = avg_days_to_judgment_text82b69,
        codeStates['setavg_days_to_judgment_text'] = setavg_days_to_judgment_text82b69,
        codeStates['avg_days_to_judgment_text1'] = avg_days_to_judgment_text14ed01,
        codeStates['setavg_days_to_judgment_text1'] = setavg_days_to_judgment_text14ed01,
        codeStates['divider2'] = divider214543,
        codeStates['setdivider2'] = setdivider214543,
        codeStates['court_rejection_rate_text'] = court_rejection_rate_text86ac0,
        codeStates['setcourt_rejection_rate_text'] = setcourt_rejection_rate_text86ac0,
        codeStates['court_rejection_rate_text1'] = court_rejection_rate_text10b69f,
        codeStates['setcourt_rejection_rate_text1'] = setcourt_rejection_rate_text10b69f,
        codeStates['divider3'] = divider39db36,
        codeStates['setdivider3'] = setdivider39db36,
        codeStates['compliance_score_text'] = compliance_score_textbf682,
        codeStates['setcompliance_score_text'] = setcompliance_score_textbf682,
        codeStates['compliance_score_text1'] = compliance_score_text1f41e4,
        codeStates['setcompliance_score_text1'] = setcompliance_score_text1f41e4,
        codeStates['divider4'] = divider432793,
        codeStates['setdivider4'] = setdivider432793,
        codeStates['collection_rate_mtd_text'] = collection_rate_mtd_text335f5,
        codeStates['setcollection_rate_mtd_text'] = setcollection_rate_mtd_text335f5,
        codeStates['collection_rate_mtd_text1'] = collection_rate_mtd_text16258d,
        codeStates['setcollection_rate_mtd_text1'] = setcollection_rate_mtd_text16258d,
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const key_performance_indicator_groupf9eafRef = useRef<any>(null);
  const handleClearSearch = () => {
    key_performance_indicator_groupf9eafRef.current?.setSearchParams();
    key_performance_indicator_groupf9eafRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(key_performance_indicator_groupf9eaf) && Object.keys(key_performance_indicator_groupf9eaf)?.length>0)
      {
        setkey_performance_indicator_groupf9eaf({})
      }
    }else 
      prevRefreshRef.current= true
  }, [key_performance_indicator_groupf9eafProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '1 / 118',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"key_performance_indicator_group"}))
        }}
    >
          {allowedControls.includes("key_performance_indicators_text") ?<Textkey_performance_indicators_text   /* 4f6db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("total_active_accounts_text") ?<Texttotal_active_accounts_text   /* ed4d7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("total_active_accounts_text1") ?<Texttotal_active_accounts_text1   /* b45d0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider1") ?<Dividerdivider1   /* 3ca73 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("avg_days_to_judgment_text") ?<Textavg_days_to_judgment_text   /* 82b69 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("avg_days_to_judgment_text1") ?<Textavg_days_to_judgment_text1   /* 4ed01 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider2") ?<Dividerdivider2   /* 14543 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("court_rejection_rate_text") ?<Textcourt_rejection_rate_text   /* 86ac0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("court_rejection_rate_text1") ?<Textcourt_rejection_rate_text1   /* 0b69f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider3") ?<Dividerdivider3   /* 9db36 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("compliance_score_text") ?<Textcompliance_score_text   /* bf682 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("compliance_score_text1") ?<Textcompliance_score_text1   /* f41e4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider4") ?<Dividerdivider4   /* 32793 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("collection_rate_mtd_text") ?<Textcollection_rate_mtd_text   /* 335f5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("collection_rate_mtd_text1") ?<Textcollection_rate_mtd_text1   /* 6258d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupkey_performance_indicator_group
