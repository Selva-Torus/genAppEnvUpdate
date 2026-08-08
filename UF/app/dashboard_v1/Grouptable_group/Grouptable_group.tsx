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
import Groupsubscreen  from "../Groupsubscreen/Groupsubscreen";
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
import Textstatus  from "./Textstatus";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
      "status"
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
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_lap_lap_amrqueuetable_v1",
      "group",
      "table",
      "ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1",
      "pending_fillings_group",
      "pending_fillings_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "status"
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
      "table_group",
      "subscreen",
      "ct006_af_uf_ufws_lap_lap_amrqueuetable_v1",
      "group",
      "table",
      "ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1",
      "pending_fillings_group",
      "pending_fillings_table"
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
  const {header_groupb1913, setheader_groupb1913}= useContext(TotalContext) as TotalContextProps;
  const {header_groupb1913Props, setheader_groupb1913Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfeProps, setasset_dashboard_group4bbfeProps}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92ca, setamr_queue_groupc92ca}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92caProps, setamr_queue_groupc92caProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32, setpending_file_groupffe32}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32Props, setpending_file_groupffe32Props}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93, setservice_pending_group7ba93}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93Props, setservice_pending_group7ba93Props}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4, setslas_at_risk_group23eb4}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4Props, setslas_at_risk_group23eb4Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54, setcourt_rejection_groupc9d54}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54Props, setcourt_rejection_groupc9d54Props}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5, setcollected_mtd_group7b7b5}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5Props, setcollected_mtd_group7b7b5Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bd, settable_group112bd}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bdProps, settable_group112bdProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5, setsubscreene9ab5}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5Props, setsubscreene9ab5Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props}= useContext(TotalContext) as TotalContextProps;
  const {group28176, setgroup28176}= useContext(TotalContext) as TotalContextProps;
  const {group28176Props, setgroup28176Props}= useContext(TotalContext) as TotalContextProps;
  const {table852e3, settable852e3}= useContext(TotalContext) as TotalContextProps;
  const {table852e3Props, settable852e3Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568, setpending_fillings_groupb1568}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568Props, setpending_fillings_groupb1568Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279, setpending_fillings_table11279}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279Props, setpending_fillings_table11279Props}= useContext(TotalContext) as TotalContextProps;
  const {status77d60, setstatus77d60}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1',
    [user],
    'GroupTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b9118f7a57de8ff9afdeb08f880112bd");
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
    settable_group112bdProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("subscreen")){
        setsubscreene9ab5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(subscreene9ab5?.isDisabled==null)
      {
        setsubscreene9ab5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus77d60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(status77d60?.isDisabled==null)
      {
        setstatus77d60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupb1913,
        codeStates['setheader_group'] = setheader_groupb1913,
        codeStates['header_groupb1913'] = header_groupb1913Props,
        codeStates['setheader_groupb1913'] = setheader_groupb1913Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group4bbfe,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4bbfe,
        codeStates['asset_dashboard_group4bbfe'] = asset_dashboard_group4bbfeProps,
        codeStates['setasset_dashboard_group4bbfe'] = setasset_dashboard_group4bbfeProps,
        codeStates['amr_queue_group'] = amr_queue_groupc92ca,
        codeStates['setamr_queue_group'] = setamr_queue_groupc92ca,
        codeStates['amr_queue_groupc92ca'] = amr_queue_groupc92caProps,
        codeStates['setamr_queue_groupc92ca'] = setamr_queue_groupc92caProps,
        codeStates['pending_file_group'] = pending_file_groupffe32,
        codeStates['setpending_file_group'] = setpending_file_groupffe32,
        codeStates['pending_file_groupffe32'] = pending_file_groupffe32Props,
        codeStates['setpending_file_groupffe32'] = setpending_file_groupffe32Props,
        codeStates['service_pending_group'] = service_pending_group7ba93,
        codeStates['setservice_pending_group'] = setservice_pending_group7ba93,
        codeStates['service_pending_group7ba93'] = service_pending_group7ba93Props,
        codeStates['setservice_pending_group7ba93'] = setservice_pending_group7ba93Props,
        codeStates['slas_at_risk_group'] = slas_at_risk_group23eb4,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group23eb4,
        codeStates['slas_at_risk_group23eb4'] = slas_at_risk_group23eb4Props,
        codeStates['setslas_at_risk_group23eb4'] = setslas_at_risk_group23eb4Props,
        codeStates['court_rejection_group'] = court_rejection_groupc9d54,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupc9d54,
        codeStates['court_rejection_groupc9d54'] = court_rejection_groupc9d54Props,
        codeStates['setcourt_rejection_groupc9d54'] = setcourt_rejection_groupc9d54Props,
        codeStates['collected_mtd_group'] = collected_mtd_group7b7b5,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group7b7b5,
        codeStates['collected_mtd_group7b7b5'] = collected_mtd_group7b7b5Props,
        codeStates['setcollected_mtd_group7b7b5'] = setcollected_mtd_group7b7b5Props,
        codeStates['table_group'] = table_group112bd,
        codeStates['settable_group'] = settable_group112bd,
        codeStates['table_group112bd'] = table_group112bdProps,
        codeStates['settable_group112bd'] = settable_group112bdProps,
        codeStates['subscreen'] = subscreene9ab5,
        codeStates['setsubscreen'] = setsubscreene9ab5,
        codeStates['subscreene9ab5'] = subscreene9ab5Props,
        codeStates['setsubscreene9ab5'] = setsubscreene9ab5Props,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['group'] = group28176,
        codeStates['setgroup'] = setgroup28176,
        codeStates['group28176'] = group28176Props,
        codeStates['setgroup28176'] = setgroup28176Props,
        codeStates['table'] = table852e3,
        codeStates['settable'] = settable852e3,
        codeStates['table852e3'] = table852e3Props,
        codeStates['settable852e3'] = settable852e3Props,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['pending_fillings_group'] = pending_fillings_groupb1568,
        codeStates['setpending_fillings_group'] = setpending_fillings_groupb1568,
        codeStates['pending_fillings_groupb1568'] = pending_fillings_groupb1568Props,
        codeStates['setpending_fillings_groupb1568'] = setpending_fillings_groupb1568Props,
        codeStates['pending_fillings_table'] = pending_fillings_table11279,
        codeStates['setpending_fillings_table'] = setpending_fillings_table11279,
        codeStates['pending_fillings_table11279'] = pending_fillings_table11279Props,
        codeStates['setpending_fillings_table11279'] = setpending_fillings_table11279Props,
        codeStates['status'] = status77d60,
        codeStates['setstatus'] = setstatus77d60,

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
        codeStates['header_group'] = header_groupb1913,
        codeStates['setheader_group'] = setheader_groupb1913,
        codeStates['header_groupb1913'] = header_groupb1913Props,
        codeStates['setheader_groupb1913'] = setheader_groupb1913Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group4bbfe,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4bbfe,
        codeStates['asset_dashboard_group4bbfe'] = asset_dashboard_group4bbfeProps,
        codeStates['setasset_dashboard_group4bbfe'] = setasset_dashboard_group4bbfeProps,
        codeStates['amr_queue_group'] = amr_queue_groupc92ca,
        codeStates['setamr_queue_group'] = setamr_queue_groupc92ca,
        codeStates['amr_queue_groupc92ca'] = amr_queue_groupc92caProps,
        codeStates['setamr_queue_groupc92ca'] = setamr_queue_groupc92caProps,
        codeStates['pending_file_group'] = pending_file_groupffe32,
        codeStates['setpending_file_group'] = setpending_file_groupffe32,
        codeStates['pending_file_groupffe32'] = pending_file_groupffe32Props,
        codeStates['setpending_file_groupffe32'] = setpending_file_groupffe32Props,
        codeStates['service_pending_group'] = service_pending_group7ba93,
        codeStates['setservice_pending_group'] = setservice_pending_group7ba93,
        codeStates['service_pending_group7ba93'] = service_pending_group7ba93Props,
        codeStates['setservice_pending_group7ba93'] = setservice_pending_group7ba93Props,
        codeStates['slas_at_risk_group'] = slas_at_risk_group23eb4,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group23eb4,
        codeStates['slas_at_risk_group23eb4'] = slas_at_risk_group23eb4Props,
        codeStates['setslas_at_risk_group23eb4'] = setslas_at_risk_group23eb4Props,
        codeStates['court_rejection_group'] = court_rejection_groupc9d54,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupc9d54,
        codeStates['court_rejection_groupc9d54'] = court_rejection_groupc9d54Props,
        codeStates['setcourt_rejection_groupc9d54'] = setcourt_rejection_groupc9d54Props,
        codeStates['collected_mtd_group'] = collected_mtd_group7b7b5,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group7b7b5,
        codeStates['collected_mtd_group7b7b5'] = collected_mtd_group7b7b5Props,
        codeStates['setcollected_mtd_group7b7b5'] = setcollected_mtd_group7b7b5Props,
        codeStates['table_group'] = table_group112bd,
        codeStates['settable_group'] = settable_group112bd,
        codeStates['table_group112bd'] = table_group112bdProps,
        codeStates['settable_group112bd'] = settable_group112bdProps,
        codeStates['subscreen'] = subscreene9ab5,
        codeStates['setsubscreen'] = setsubscreene9ab5,
        codeStates['subscreene9ab5'] = subscreene9ab5Props,
        codeStates['setsubscreene9ab5'] = setsubscreene9ab5Props,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['group'] = group28176,
        codeStates['setgroup'] = setgroup28176,
        codeStates['group28176'] = group28176Props,
        codeStates['setgroup28176'] = setgroup28176Props,
        codeStates['table'] = table852e3,
        codeStates['settable'] = settable852e3,
        codeStates['table852e3'] = table852e3Props,
        codeStates['settable852e3'] = settable852e3Props,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['pending_fillings_group'] = pending_fillings_groupb1568,
        codeStates['setpending_fillings_group'] = setpending_fillings_groupb1568,
        codeStates['pending_fillings_groupb1568'] = pending_fillings_groupb1568Props,
        codeStates['setpending_fillings_groupb1568'] = setpending_fillings_groupb1568Props,
        codeStates['pending_fillings_table'] = pending_fillings_table11279,
        codeStates['setpending_fillings_table'] = setpending_fillings_table11279,
        codeStates['pending_fillings_table11279'] = pending_fillings_table11279Props,
        codeStates['setpending_fillings_table11279'] = setpending_fillings_table11279Props,
        codeStates['status'] = status77d60,
        codeStates['setstatus'] = setstatus77d60,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group112bdRef = useRef<any>(null);
  const handleClearSearch = () => {
    table_group112bdRef.current?.setSearchParams();
    table_group112bdRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group112bd) && Object.keys(table_group112bd)?.length>0)
      {
        settable_group112bd({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group112bdProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '42 / 158',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
        }}
    >
        {allowedComponent.includes("subscreen")  &&<Groupsubscreen  
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
          {allowedControls.includes("status") ?<Textstatus   /* 77d60 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
