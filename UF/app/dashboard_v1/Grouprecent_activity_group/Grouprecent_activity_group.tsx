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
import Textrecent_activity_text  from "./Textrecent_activity_text";
import Textamr_queued_text  from "./Textamr_queued_text";
import Textamr_queued_text_1  from "./Textamr_queued_text_1";
import Dividerdivider1  from "./Dividerdivider1";
import Textjudgment_entered_text  from "./Textjudgment_entered_text";
import Textjudgment_entered_text_1  from "./Textjudgment_entered_text_1";
import Dividerdivider2  from "./Dividerdivider2";
import Textservice_completed_text  from "./Textservice_completed_text";
import Textservice_completed_text_1  from "./Textservice_completed_text_1";
import Dividerdivider3  from "./Dividerdivider3";
import Textamr_passed_text  from "./Textamr_passed_text";
import Textamr_passed_text1  from "./Textamr_passed_text1";
import Dividerdivider4  from "./Dividerdivider4";
import Textcourt_rejection_text  from "./Textcourt_rejection_text";
import Textcourt_rejection_text1  from "./Textcourt_rejection_text1";
import Dividerdivider5  from "./Dividerdivider5";
import Textservice_assigned_text  from "./Textservice_assigned_text";
import Textservice_assigned_text1  from "./Textservice_assigned_text1";
import Dividerdivider6  from "./Dividerdivider6";
import Textamr_rejected_text  from "./Textamr_rejected_text";
import Textamr_rejected_text1  from "./Textamr_rejected_text1";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprecent_activity_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "recent_activity_text",
      "amr_queued_text",
      "amr_queued_text_1",
      "divider1",
      "judgment_entered_text",
      "judgment_entered_text_1",
      "divider2",
      "service_completed_text",
      "service_completed_text_1",
      "divider3",
      "amr_passed_text",
      "amr_passed_text1",
      "divider4",
      "court_rejection_text",
      "court_rejection_text1",
      "divider5",
      "service_assigned_text",
      "service_assigned_text1",
      "divider6",
      "amr_rejected_text",
      "amr_rejected_text1"
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
      "recent_activity_text",
      "amr_queued_text",
      "amr_queued_text_1",
      "divider1",
      "judgment_entered_text",
      "judgment_entered_text_1",
      "divider2",
      "service_completed_text",
      "service_completed_text_1",
      "divider3",
      "amr_passed_text",
      "amr_passed_text1",
      "divider4",
      "court_rejection_text",
      "court_rejection_text1",
      "divider5",
      "service_assigned_text",
      "service_assigned_text1",
      "divider6",
      "amr_rejected_text",
      "amr_rejected_text1"
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
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_text25b7b, setrecent_activity_text25b7b}= useContext(TotalContext) as TotalContextProps;
  const {amr_queued_textb4f27, setamr_queued_textb4f27}= useContext(TotalContext) as TotalContextProps;
  const {amr_queued_text_1dc178, setamr_queued_text_1dc178}= useContext(TotalContext) as TotalContextProps;
  const {divider1cb266, setdivider1cb266}= useContext(TotalContext) as TotalContextProps;
  const {judgment_entered_text2f3e7, setjudgment_entered_text2f3e7}= useContext(TotalContext) as TotalContextProps;
  const {judgment_entered_text_1d4af4, setjudgment_entered_text_1d4af4}= useContext(TotalContext) as TotalContextProps;
  const {divider2269d0, setdivider2269d0}= useContext(TotalContext) as TotalContextProps;
  const {service_completed_text835e5, setservice_completed_text835e5}= useContext(TotalContext) as TotalContextProps;
  const {service_completed_text_197211, setservice_completed_text_197211}= useContext(TotalContext) as TotalContextProps;
  const {divider3acb72, setdivider3acb72}= useContext(TotalContext) as TotalContextProps;
  const {amr_passed_text144d2, setamr_passed_text144d2}= useContext(TotalContext) as TotalContextProps;
  const {amr_passed_text188d24, setamr_passed_text188d24}= useContext(TotalContext) as TotalContextProps;
  const {divider4ffc0d, setdivider4ffc0d}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_texte1e9c, setcourt_rejection_texte1e9c}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_text16e38f, setcourt_rejection_text16e38f}= useContext(TotalContext) as TotalContextProps;
  const {divider52864b, setdivider52864b}= useContext(TotalContext) as TotalContextProps;
  const {service_assigned_textb2d7d, setservice_assigned_textb2d7d}= useContext(TotalContext) as TotalContextProps;
  const {service_assigned_text15a8e1, setservice_assigned_text15a8e1}= useContext(TotalContext) as TotalContextProps;
  const {divider6aaa01, setdivider6aaa01}= useContext(TotalContext) as TotalContextProps;
  const {amr_rejected_text92e50, setamr_rejected_text92e50}= useContext(TotalContext) as TotalContextProps;
  const {amr_rejected_text11a51a, setamr_rejected_text11a51a}= useContext(TotalContext) as TotalContextProps;
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
    'GroupRecentActivityGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "720b792286324812a771a52a44d91db6");
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
    setrecent_activity_group91db6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("recent_activity_text")){
        setrecent_activity_text25b7b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(recent_activity_text25b7b?.isDisabled==null)
      {
        setrecent_activity_text25b7b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_queued_text")){
        setamr_queued_textb4f27((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queued_textb4f27?.isDisabled==null)
      {
        setamr_queued_textb4f27((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_queued_text_1")){
        setamr_queued_text_1dc178((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queued_text_1dc178?.isDisabled==null)
      {
        setamr_queued_text_1dc178((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider1")){
        setdivider1cb266((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider1cb266?.isDisabled==null)
      {
        setdivider1cb266((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("judgment_entered_text")){
        setjudgment_entered_text2f3e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(judgment_entered_text2f3e7?.isDisabled==null)
      {
        setjudgment_entered_text2f3e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("judgment_entered_text_1")){
        setjudgment_entered_text_1d4af4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(judgment_entered_text_1d4af4?.isDisabled==null)
      {
        setjudgment_entered_text_1d4af4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider2")){
        setdivider2269d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider2269d0?.isDisabled==null)
      {
        setdivider2269d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_completed_text")){
        setservice_completed_text835e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_completed_text835e5?.isDisabled==null)
      {
        setservice_completed_text835e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_completed_text_1")){
        setservice_completed_text_197211((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_completed_text_197211?.isDisabled==null)
      {
        setservice_completed_text_197211((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider3")){
        setdivider3acb72((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider3acb72?.isDisabled==null)
      {
        setdivider3acb72((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_passed_text")){
        setamr_passed_text144d2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_passed_text144d2?.isDisabled==null)
      {
        setamr_passed_text144d2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_passed_text1")){
        setamr_passed_text188d24((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_passed_text188d24?.isDisabled==null)
      {
        setamr_passed_text188d24((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider4")){
        setdivider4ffc0d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider4ffc0d?.isDisabled==null)
      {
        setdivider4ffc0d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_rejection_text")){
        setcourt_rejection_texte1e9c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_rejection_texte1e9c?.isDisabled==null)
      {
        setcourt_rejection_texte1e9c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_rejection_text1")){
        setcourt_rejection_text16e38f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_rejection_text16e38f?.isDisabled==null)
      {
        setcourt_rejection_text16e38f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider5")){
        setdivider52864b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider52864b?.isDisabled==null)
      {
        setdivider52864b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_assigned_text")){
        setservice_assigned_textb2d7d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_assigned_textb2d7d?.isDisabled==null)
      {
        setservice_assigned_textb2d7d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_assigned_text1")){
        setservice_assigned_text15a8e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_assigned_text15a8e1?.isDisabled==null)
      {
        setservice_assigned_text15a8e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider6")){
        setdivider6aaa01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider6aaa01?.isDisabled==null)
      {
        setdivider6aaa01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_rejected_text")){
        setamr_rejected_text92e50((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_rejected_text92e50?.isDisabled==null)
      {
        setamr_rejected_text92e50((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_rejected_text1")){
        setamr_rejected_text11a51a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_rejected_text11a51a?.isDisabled==null)
      {
        setamr_rejected_text11a51a((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,
        codeStates['recent_activity_text'] = recent_activity_text25b7b,
        codeStates['setrecent_activity_text'] = setrecent_activity_text25b7b,
        codeStates['amr_queued_text'] = amr_queued_textb4f27,
        codeStates['setamr_queued_text'] = setamr_queued_textb4f27,
        codeStates['amr_queued_text_1'] = amr_queued_text_1dc178,
        codeStates['setamr_queued_text_1'] = setamr_queued_text_1dc178,
        codeStates['divider1'] = divider1cb266,
        codeStates['setdivider1'] = setdivider1cb266,
        codeStates['judgment_entered_text'] = judgment_entered_text2f3e7,
        codeStates['setjudgment_entered_text'] = setjudgment_entered_text2f3e7,
        codeStates['judgment_entered_text_1'] = judgment_entered_text_1d4af4,
        codeStates['setjudgment_entered_text_1'] = setjudgment_entered_text_1d4af4,
        codeStates['divider2'] = divider2269d0,
        codeStates['setdivider2'] = setdivider2269d0,
        codeStates['service_completed_text'] = service_completed_text835e5,
        codeStates['setservice_completed_text'] = setservice_completed_text835e5,
        codeStates['service_completed_text_1'] = service_completed_text_197211,
        codeStates['setservice_completed_text_1'] = setservice_completed_text_197211,
        codeStates['divider3'] = divider3acb72,
        codeStates['setdivider3'] = setdivider3acb72,
        codeStates['amr_passed_text'] = amr_passed_text144d2,
        codeStates['setamr_passed_text'] = setamr_passed_text144d2,
        codeStates['amr_passed_text1'] = amr_passed_text188d24,
        codeStates['setamr_passed_text1'] = setamr_passed_text188d24,
        codeStates['divider4'] = divider4ffc0d,
        codeStates['setdivider4'] = setdivider4ffc0d,
        codeStates['court_rejection_text'] = court_rejection_texte1e9c,
        codeStates['setcourt_rejection_text'] = setcourt_rejection_texte1e9c,
        codeStates['court_rejection_text1'] = court_rejection_text16e38f,
        codeStates['setcourt_rejection_text1'] = setcourt_rejection_text16e38f,
        codeStates['divider5'] = divider52864b,
        codeStates['setdivider5'] = setdivider52864b,
        codeStates['service_assigned_text'] = service_assigned_textb2d7d,
        codeStates['setservice_assigned_text'] = setservice_assigned_textb2d7d,
        codeStates['service_assigned_text1'] = service_assigned_text15a8e1,
        codeStates['setservice_assigned_text1'] = setservice_assigned_text15a8e1,
        codeStates['divider6'] = divider6aaa01,
        codeStates['setdivider6'] = setdivider6aaa01,
        codeStates['amr_rejected_text'] = amr_rejected_text92e50,
        codeStates['setamr_rejected_text'] = setamr_rejected_text92e50,
        codeStates['amr_rejected_text1'] = amr_rejected_text11a51a,
        codeStates['setamr_rejected_text1'] = setamr_rejected_text11a51a,

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
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,
        codeStates['recent_activity_text'] = recent_activity_text25b7b,
        codeStates['setrecent_activity_text'] = setrecent_activity_text25b7b,
        codeStates['amr_queued_text'] = amr_queued_textb4f27,
        codeStates['setamr_queued_text'] = setamr_queued_textb4f27,
        codeStates['amr_queued_text_1'] = amr_queued_text_1dc178,
        codeStates['setamr_queued_text_1'] = setamr_queued_text_1dc178,
        codeStates['divider1'] = divider1cb266,
        codeStates['setdivider1'] = setdivider1cb266,
        codeStates['judgment_entered_text'] = judgment_entered_text2f3e7,
        codeStates['setjudgment_entered_text'] = setjudgment_entered_text2f3e7,
        codeStates['judgment_entered_text_1'] = judgment_entered_text_1d4af4,
        codeStates['setjudgment_entered_text_1'] = setjudgment_entered_text_1d4af4,
        codeStates['divider2'] = divider2269d0,
        codeStates['setdivider2'] = setdivider2269d0,
        codeStates['service_completed_text'] = service_completed_text835e5,
        codeStates['setservice_completed_text'] = setservice_completed_text835e5,
        codeStates['service_completed_text_1'] = service_completed_text_197211,
        codeStates['setservice_completed_text_1'] = setservice_completed_text_197211,
        codeStates['divider3'] = divider3acb72,
        codeStates['setdivider3'] = setdivider3acb72,
        codeStates['amr_passed_text'] = amr_passed_text144d2,
        codeStates['setamr_passed_text'] = setamr_passed_text144d2,
        codeStates['amr_passed_text1'] = amr_passed_text188d24,
        codeStates['setamr_passed_text1'] = setamr_passed_text188d24,
        codeStates['divider4'] = divider4ffc0d,
        codeStates['setdivider4'] = setdivider4ffc0d,
        codeStates['court_rejection_text'] = court_rejection_texte1e9c,
        codeStates['setcourt_rejection_text'] = setcourt_rejection_texte1e9c,
        codeStates['court_rejection_text1'] = court_rejection_text16e38f,
        codeStates['setcourt_rejection_text1'] = setcourt_rejection_text16e38f,
        codeStates['divider5'] = divider52864b,
        codeStates['setdivider5'] = setdivider52864b,
        codeStates['service_assigned_text'] = service_assigned_textb2d7d,
        codeStates['setservice_assigned_text'] = setservice_assigned_textb2d7d,
        codeStates['service_assigned_text1'] = service_assigned_text15a8e1,
        codeStates['setservice_assigned_text1'] = setservice_assigned_text15a8e1,
        codeStates['divider6'] = divider6aaa01,
        codeStates['setdivider6'] = setdivider6aaa01,
        codeStates['amr_rejected_text'] = amr_rejected_text92e50,
        codeStates['setamr_rejected_text'] = setamr_rejected_text92e50,
        codeStates['amr_rejected_text1'] = amr_rejected_text11a51a,
        codeStates['setamr_rejected_text1'] = setamr_rejected_text11a51a,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const recent_activity_group91db6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    recent_activity_group91db6Ref.current?.setSearchParams();
    recent_activity_group91db6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(recent_activity_group91db6) && Object.keys(recent_activity_group91db6)?.length>0)
      {
        setrecent_activity_group91db6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [recent_activity_group91db6Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
        gridRow: '1 / 118',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setnewdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"recent_activity_group"}))
        }}
    >
          {allowedControls.includes("recent_activity_text") ?<Textrecent_activity_text   /* 25b7b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_queued_text") ?<Textamr_queued_text   /* b4f27 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_queued_text_1") ?<Textamr_queued_text_1   /* dc178 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider1") ?<Dividerdivider1   /* cb266 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("judgment_entered_text") ?<Textjudgment_entered_text   /* 2f3e7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("judgment_entered_text_1") ?<Textjudgment_entered_text_1   /* d4af4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider2") ?<Dividerdivider2   /* 269d0 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("service_completed_text") ?<Textservice_completed_text   /* 835e5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("service_completed_text_1") ?<Textservice_completed_text_1   /* 97211 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider3") ?<Dividerdivider3   /* acb72 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_passed_text") ?<Textamr_passed_text   /* 144d2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_passed_text1") ?<Textamr_passed_text1   /* 88d24 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider4") ?<Dividerdivider4   /* ffc0d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("court_rejection_text") ?<Textcourt_rejection_text   /* e1e9c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("court_rejection_text1") ?<Textcourt_rejection_text1   /* 6e38f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider5") ?<Dividerdivider5   /* 2864b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("service_assigned_text") ?<Textservice_assigned_text   /* b2d7d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("service_assigned_text1") ?<Textservice_assigned_text1   /* 5a8e1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider6") ?<Dividerdivider6   /* aaa01 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_rejected_text") ?<Textamr_rejected_text   /* 92e50 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_rejected_text1") ?<Textamr_rejected_text1   /* 1a51a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprecent_activity_group
