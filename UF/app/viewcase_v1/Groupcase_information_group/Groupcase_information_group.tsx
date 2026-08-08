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
import Textcase_info_text  from "./Textcase_info_text";
import TextInputcreditor_name  from "./TextInputcreditor_name";
import TextInputattorney_name  from "./TextInputattorney_name";
import TextInputstatus_name  from "./TextInputstatus_name";
import TextInputpriority_name  from "./TextInputpriority_name";
import TextInputqueue_position  from "./TextInputqueue_position";
import TextInputquality_score  from "./TextInputquality_score";
import DatePickersla_wait_start_time  from "./DatePickersla_wait_start_time";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcase_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctypenamecombo_v1Props, setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctable_v1Props, setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrcheckliststatus_v1Props, setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "case_info_text",
      "creditor_name",
      "attorney_name",
      "status_name",
      "priority_name",
      "queue_position",
      "quality_score",
      "sla_wait_start_time"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "case_information_group",
      "venue_group",
      "georgia_group",
      "georgias_group",
      "georgias_groups",
      "georgiass_groups",
      "georgsiass_groups",
      "debtor_information_group",
      "financial_details_group",
      "venue_details_group",
      "required_dociument_main_group",
      "doc_table",
      "checklist_main_group",
      "checklist_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "case_info_text",
      "creditor_name",
      "attorney_name",
      "status_name",
      "priority_name",
      "queue_position",
      "quality_score",
      "sla_wait_start_time"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "case_information_group",
      "venue_group",
      "georgia_group",
      "georgias_group",
      "georgias_groups",
      "georgiass_groups",
      "georgsiass_groups",
      "debtor_information_group",
      "financial_details_group",
      "venue_details_group",
      "required_dociument_main_group",
      "doc_table",
      "checklist_main_group",
      "checklist_table"
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
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps;
  const {case_info_textdf3f1, setcase_info_textdf3f1}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name257be, setcreditor_name257be}= useContext(TotalContext) as TotalContextProps;
  const {attorney_name87be1, setattorney_name87be1}= useContext(TotalContext) as TotalContextProps;
  const {status_namea5f92, setstatus_namea5f92}= useContext(TotalContext) as TotalContextProps;
  const {priority_name449dd, setpriority_name449dd}= useContext(TotalContext) as TotalContextProps;
  const {queue_positionceb8d, setqueue_positionceb8d}= useContext(TotalContext) as TotalContextProps;
  const {quality_scoredfaa9, setquality_scoredfaa9}= useContext(TotalContext) as TotalContextProps;
  const {sla_wait_start_time20502, setsla_wait_start_time20502}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcase_v1, setviewcase_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewCase:AFVK:v1',
    [user],
    'GroupCaseInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "19e9edfb1e7ccf7985bc9825117cec29");
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
    setcase_information_groupcec29Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("case_info_text")){
        setcase_info_textdf3f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_info_textdf3f1?.isDisabled==null)
      {
        setcase_info_textdf3f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("creditor_name")){
        setcreditor_name257be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(creditor_name257be?.isDisabled==null)
      {
        setcreditor_name257be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attorney_name")){
        setattorney_name87be1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attorney_name87be1?.isDisabled==null)
      {
        setattorney_name87be1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_name")){
        setstatus_namea5f92((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(status_namea5f92?.isDisabled==null)
      {
        setstatus_namea5f92((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority_name")){
        setpriority_name449dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(priority_name449dd?.isDisabled==null)
      {
        setpriority_name449dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("queue_position")){
        setqueue_positionceb8d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(queue_positionceb8d?.isDisabled==null)
      {
        setqueue_positionceb8d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("quality_score")){
        setquality_scoredfaa9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(quality_scoredfaa9?.isDisabled==null)
      {
        setquality_scoredfaa9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_wait_start_time")){
        setsla_wait_start_time20502((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(sla_wait_start_time20502?.isDisabled==null)
      {
        setsla_wait_start_time20502((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_group1f6e4,
        codeStates['setadd_case_group'] = setadd_case_group1f6e4,
        codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
        codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
        codeStates['header_group'] = header_group3749a,
        codeStates['setheader_group'] = setheader_group3749a,
        codeStates['header_group3749a'] = header_group3749aProps,
        codeStates['setheader_group3749a'] = setheader_group3749aProps,
        codeStates['case_information_group'] = case_information_groupcec29,
        codeStates['setcase_information_group'] = setcase_information_groupcec29,
        codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
        codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
        codeStates['case_info_text'] = case_info_textdf3f1,
        codeStates['setcase_info_text'] = setcase_info_textdf3f1,
        codeStates['creditor_name'] = creditor_name257be,
        codeStates['setcreditor_name'] = setcreditor_name257be,
        codeStates['attorney_name'] = attorney_name87be1,
        codeStates['setattorney_name'] = setattorney_name87be1,
        codeStates['status_name'] = status_namea5f92,
        codeStates['setstatus_name'] = setstatus_namea5f92,
        codeStates['priority_name'] = priority_name449dd,
        codeStates['setpriority_name'] = setpriority_name449dd,
        codeStates['queue_position'] = queue_positionceb8d,
        codeStates['setqueue_position'] = setqueue_positionceb8d,
        codeStates['quality_score'] = quality_scoredfaa9,
        codeStates['setquality_score'] = setquality_scoredfaa9,
        codeStates['sla_wait_start_time'] = sla_wait_start_time20502,
        codeStates['setsla_wait_start_time'] = setsla_wait_start_time20502,
        codeStates['venue_group'] = venue_groupa72d9,
        codeStates['setvenue_group'] = setvenue_groupa72d9,
        codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
        codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
        codeStates['georgia_group'] = georgia_groupa636c,
        codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
        codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
        codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
        codeStates['georgias_group'] = georgias_groupbac01,
        codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
        codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
        codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
        codeStates['georgias_groups'] = georgias_groupsbf356,
        codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
        codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
        codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
        codeStates['georgiass_groups'] = georgiass_groups9e4dd,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
        codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
        codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
        codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
        codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
        codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
        codeStates['debtor_information_group'] = debtor_information_groupdfa55,
        codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
        codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
        codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
        codeStates['financial_details_group'] = financial_details_grouped0d9,
        codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
        codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
        codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
        codeStates['venue_details_group'] = venue_details_group6a27a,
        codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
        codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
        codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
        codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
        codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
        codeStates['doc_table'] = doc_tablee79c7,
        codeStates['setdoc_table'] = setdoc_tablee79c7,
        codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
        codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
        codeStates['checklist_main_group'] = checklist_main_group5b62e,
        codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
        codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
        codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
        codeStates['checklist_table'] = checklist_table45abc,
        codeStates['setchecklist_table'] = setchecklist_table45abc,
        codeStates['checklist_table45abc'] = checklist_table45abcProps,
        codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,

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
        codeStates['add_case_group'] = add_case_group1f6e4,
        codeStates['setadd_case_group'] = setadd_case_group1f6e4,
        codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
        codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
        codeStates['header_group'] = header_group3749a,
        codeStates['setheader_group'] = setheader_group3749a,
        codeStates['header_group3749a'] = header_group3749aProps,
        codeStates['setheader_group3749a'] = setheader_group3749aProps,
        codeStates['case_information_group'] = case_information_groupcec29,
        codeStates['setcase_information_group'] = setcase_information_groupcec29,
        codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
        codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
        codeStates['case_info_text'] = case_info_textdf3f1,
        codeStates['setcase_info_text'] = setcase_info_textdf3f1,
        codeStates['creditor_name'] = creditor_name257be,
        codeStates['setcreditor_name'] = setcreditor_name257be,
        codeStates['attorney_name'] = attorney_name87be1,
        codeStates['setattorney_name'] = setattorney_name87be1,
        codeStates['status_name'] = status_namea5f92,
        codeStates['setstatus_name'] = setstatus_namea5f92,
        codeStates['priority_name'] = priority_name449dd,
        codeStates['setpriority_name'] = setpriority_name449dd,
        codeStates['queue_position'] = queue_positionceb8d,
        codeStates['setqueue_position'] = setqueue_positionceb8d,
        codeStates['quality_score'] = quality_scoredfaa9,
        codeStates['setquality_score'] = setquality_scoredfaa9,
        codeStates['sla_wait_start_time'] = sla_wait_start_time20502,
        codeStates['setsla_wait_start_time'] = setsla_wait_start_time20502,
        codeStates['venue_group'] = venue_groupa72d9,
        codeStates['setvenue_group'] = setvenue_groupa72d9,
        codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
        codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
        codeStates['georgia_group'] = georgia_groupa636c,
        codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
        codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
        codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
        codeStates['georgias_group'] = georgias_groupbac01,
        codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
        codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
        codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
        codeStates['georgias_groups'] = georgias_groupsbf356,
        codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
        codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
        codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
        codeStates['georgiass_groups'] = georgiass_groups9e4dd,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
        codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
        codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
        codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
        codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
        codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
        codeStates['debtor_information_group'] = debtor_information_groupdfa55,
        codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
        codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
        codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
        codeStates['financial_details_group'] = financial_details_grouped0d9,
        codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
        codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
        codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
        codeStates['venue_details_group'] = venue_details_group6a27a,
        codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
        codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
        codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
        codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
        codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
        codeStates['doc_table'] = doc_tablee79c7,
        codeStates['setdoc_table'] = setdoc_tablee79c7,
        codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
        codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
        codeStates['checklist_main_group'] = checklist_main_group5b62e,
        codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
        codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
        codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
        codeStates['checklist_table'] = checklist_table45abc,
        codeStates['setchecklist_table'] = setchecklist_table45abc,
        codeStates['checklist_table45abc'] = checklist_table45abcProps,
        codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const case_information_groupcec29Ref = useRef<any>(null);
  const handleClearSearch = () => {
    case_information_groupcec29Ref.current?.setSearchParams();
    case_information_groupcec29Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(case_information_groupcec29) && Object.keys(case_information_groupcec29)?.length>0)
      {
        setcase_information_groupcec29({})
      }
    }else 
      prevRefreshRef.current= true
  }, [case_information_groupcec29Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 17',
        gridRow: '13 / 81',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewcase_v1((pre:any)=>({...pre,_selectedGroup_:"case_information_group"}))
        }}
    >
          {allowedControls.includes("case_info_text") ?<Textcase_info_text   /* df3f1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("creditor_name") ?<TextInputcreditor_name   /* 257be */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("attorney_name") ?<TextInputattorney_name   /* 87be1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("status_name") ?<TextInputstatus_name   /* a5f92 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("priority_name") ?<TextInputpriority_name   /* 449dd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("queue_position") ?<TextInputqueue_position   /* ceb8d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("quality_score") ?<TextInputquality_score   /* dfaa9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sla_wait_start_time") ?<DatePickersla_wait_start_time   /* 20502 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcase_information_group
