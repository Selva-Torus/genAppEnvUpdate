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
import Groupgeorgia_group  from "../Groupgeorgia_group/Groupgeorgia_group";
import Groupgeorgias_group  from "../Groupgeorgias_group/Groupgeorgias_group";
import Groupgeorgias_groups  from "../Groupgeorgias_groups/Groupgeorgias_groups";
import Groupgeorgiass_groups  from "../Groupgeorgiass_groups/Groupgeorgiass_groups";
import Groupgeorgsiass_groups  from "../Groupgeorgsiass_groups/Groupgeorgsiass_groups";
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
import Iconrules_icon  from "./Iconrules_icon";
import Textvenue_special_rules_text  from "./Textvenue_special_rules_text";
import Textspecial_rules  from "./Textspecial_rules";
import Dividervenue_special_rules_divider  from "./Dividervenue_special_rules_divider";
import Dividervenue_special_rules_dividers  from "./Dividervenue_special_rules_dividers";
import Dividervenue_special_rules_dividerss  from "./Dividervenue_special_rules_dividerss";
import Dividervenue_special_rules_dividerssss  from "./Dividervenue_special_rules_dividerssss";
import Dividervenues_special_rules_dividerssss  from "./Dividervenues_special_rules_dividerssss";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvenue_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_attorneyscombo_v1Props, setdfd_attorneyscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statuscombo_v1Props, setdfd_statuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "rules_icon",
      "venue_special_rules_text",
      "special_rules",
      "venue_special_rules_divider",
      "venue_special_rules_dividers",
      "venue_special_rules_dividerss",
      "venue_special_rules_dividerssss",
      "venues_special_rules_dividerssss"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "dynamicactions",
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
      "required_dociument_header_group",
      "doc_type_table",
      "checklist_main_group",
      "checklist_group",
      "checklist_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "rules_icon",
      "venue_special_rules_text",
      "special_rules",
      "venue_special_rules_divider",
      "venue_special_rules_dividers",
      "venue_special_rules_dividerss",
      "venue_special_rules_dividerssss",
      "venues_special_rules_dividerssss"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "dynamicactions",
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
      "required_dociument_header_group",
      "doc_type_table",
      "checklist_main_group",
      "checklist_group",
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
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps;
  const {rules_iconbdce0, setrules_iconbdce0}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_text2cdf6, setvenue_special_rules_text2cdf6}= useContext(TotalContext) as TotalContextProps;
  const {special_rulesbd9d8, setspecial_rulesbd9d8}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividere4760, setvenue_special_rules_dividere4760}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividerscd6e7, setvenue_special_rules_dividerscd6e7}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividerss0fa18, setvenue_special_rules_dividerss0fa18}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividerssss2b01f, setvenue_special_rules_dividerssss2b01f}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps;
  const {venues_special_rules_dividerssss9b36c, setvenues_special_rules_dividerssss9b36c}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcase_v1, setaddcase_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1',
    [user],
    'GroupVenueGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c6fdc005863d4969ba67c2216726a36d");
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
    setvenue_group6a36dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("rules_icon")){
        setrules_iconbdce0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(rules_iconbdce0?.isDisabled==null)
      {
        setrules_iconbdce0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_special_rules_text")){
        setvenue_special_rules_text2cdf6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_special_rules_text2cdf6?.isDisabled==null)
      {
        setvenue_special_rules_text2cdf6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("special_rules")){
        setspecial_rulesbd9d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(special_rulesbd9d8?.isDisabled==null)
      {
        setspecial_rulesbd9d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_special_rules_divider")){
        setvenue_special_rules_dividere4760((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_special_rules_dividere4760?.isDisabled==null)
      {
        setvenue_special_rules_dividere4760((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("georgia_group")){
        setgeorgia_group0fa18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(georgia_group0fa18?.isDisabled==null)
      {
        setgeorgia_group0fa18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_special_rules_dividers")){
        setvenue_special_rules_dividerscd6e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_special_rules_dividerscd6e7?.isDisabled==null)
      {
        setvenue_special_rules_dividerscd6e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("georgias_group")){
        setgeorgias_group945fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(georgias_group945fd?.isDisabled==null)
      {
        setgeorgias_group945fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_special_rules_dividerss")){
        setvenue_special_rules_dividerss0fa18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_special_rules_dividerss0fa18?.isDisabled==null)
      {
        setvenue_special_rules_dividerss0fa18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("georgias_groups")){
        setgeorgias_groups6f85f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(georgias_groups6f85f?.isDisabled==null)
      {
        setgeorgias_groups6f85f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_special_rules_dividerssss")){
        setvenue_special_rules_dividerssss2b01f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_special_rules_dividerssss2b01f?.isDisabled==null)
      {
        setvenue_special_rules_dividerssss2b01f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("georgiass_groups")){
        setgeorgiass_groups86a87((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(georgiass_groups86a87?.isDisabled==null)
      {
        setgeorgiass_groups86a87((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venues_special_rules_dividerssss")){
        setvenues_special_rules_dividerssss9b36c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venues_special_rules_dividerssss9b36c?.isDisabled==null)
      {
        setvenues_special_rules_dividerssss9b36c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("georgsiass_groups")){
        setgeorgsiass_groupsb044a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(georgsiass_groupsb044a?.isDisabled==null)
      {
        setgeorgsiass_groupsb044a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_groupeb161,
        codeStates['setadd_case_group'] = setadd_case_groupeb161,
        codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
        codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
        codeStates['header_group'] = header_group4878f,
        codeStates['setheader_group'] = setheader_group4878f,
        codeStates['header_group4878f'] = header_group4878fProps,
        codeStates['setheader_group4878f'] = setheader_group4878fProps,
        codeStates['dynamicactions'] = dynamicactions094c3,
        codeStates['setdynamicactions'] = setdynamicactions094c3,
        codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
        codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
        codeStates['case_information_group'] = case_information_group28f6f,
        codeStates['setcase_information_group'] = setcase_information_group28f6f,
        codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
        codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
        codeStates['venue_group'] = venue_group6a36d,
        codeStates['setvenue_group'] = setvenue_group6a36d,
        codeStates['venue_group6a36d'] = venue_group6a36dProps,
        codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
        codeStates['rules_icon'] = rules_iconbdce0,
        codeStates['setrules_icon'] = setrules_iconbdce0,
        codeStates['venue_special_rules_text'] = venue_special_rules_text2cdf6,
        codeStates['setvenue_special_rules_text'] = setvenue_special_rules_text2cdf6,
        codeStates['special_rules'] = special_rulesbd9d8,
        codeStates['setspecial_rules'] = setspecial_rulesbd9d8,
        codeStates['venue_special_rules_divider'] = venue_special_rules_dividere4760,
        codeStates['setvenue_special_rules_divider'] = setvenue_special_rules_dividere4760,
        codeStates['georgia_group'] = georgia_group0fa18,
        codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
        codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
        codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
        codeStates['venue_special_rules_dividers'] = venue_special_rules_dividerscd6e7,
        codeStates['setvenue_special_rules_dividers'] = setvenue_special_rules_dividerscd6e7,
        codeStates['georgias_group'] = georgias_group945fd,
        codeStates['setgeorgias_group'] = setgeorgias_group945fd,
        codeStates['georgias_group945fd'] = georgias_group945fdProps,
        codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
        codeStates['venue_special_rules_dividerss'] = venue_special_rules_dividerss0fa18,
        codeStates['setvenue_special_rules_dividerss'] = setvenue_special_rules_dividerss0fa18,
        codeStates['georgias_groups'] = georgias_groups6f85f,
        codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
        codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
        codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
        codeStates['venue_special_rules_dividerssss'] = venue_special_rules_dividerssss2b01f,
        codeStates['setvenue_special_rules_dividerssss'] = setvenue_special_rules_dividerssss2b01f,
        codeStates['georgiass_groups'] = georgiass_groups86a87,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
        codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
        codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
        codeStates['venues_special_rules_dividerssss'] = venues_special_rules_dividerssss9b36c,
        codeStates['setvenues_special_rules_dividerssss'] = setvenues_special_rules_dividerssss9b36c,
        codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
        codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
        codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
        codeStates['debtor_information_group'] = debtor_information_group78a70,
        codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
        codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
        codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
        codeStates['financial_details_group'] = financial_details_group52f47,
        codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
        codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
        codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
        codeStates['venue_details_group'] = venue_details_group17ac6,
        codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
        codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
        codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
        codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
        codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
        codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
        codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
        codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
        codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
        codeStates['doc_type_table'] = doc_type_tablebe9fa,
        codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
        codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
        codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
        codeStates['checklist_main_group'] = checklist_main_group0df6b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
        codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
        codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
        codeStates['checklist_group'] = checklist_group32b3d,
        codeStates['setchecklist_group'] = setchecklist_group32b3d,
        codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
        codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
        codeStates['checklist_table'] = checklist_table198e1,
        codeStates['setchecklist_table'] = setchecklist_table198e1,
        codeStates['checklist_table198e1'] = checklist_table198e1Props,
        codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,

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
        codeStates['add_case_group'] = add_case_groupeb161,
        codeStates['setadd_case_group'] = setadd_case_groupeb161,
        codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
        codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
        codeStates['header_group'] = header_group4878f,
        codeStates['setheader_group'] = setheader_group4878f,
        codeStates['header_group4878f'] = header_group4878fProps,
        codeStates['setheader_group4878f'] = setheader_group4878fProps,
        codeStates['dynamicactions'] = dynamicactions094c3,
        codeStates['setdynamicactions'] = setdynamicactions094c3,
        codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
        codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
        codeStates['case_information_group'] = case_information_group28f6f,
        codeStates['setcase_information_group'] = setcase_information_group28f6f,
        codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
        codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
        codeStates['venue_group'] = venue_group6a36d,
        codeStates['setvenue_group'] = setvenue_group6a36d,
        codeStates['venue_group6a36d'] = venue_group6a36dProps,
        codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
        codeStates['rules_icon'] = rules_iconbdce0,
        codeStates['setrules_icon'] = setrules_iconbdce0,
        codeStates['venue_special_rules_text'] = venue_special_rules_text2cdf6,
        codeStates['setvenue_special_rules_text'] = setvenue_special_rules_text2cdf6,
        codeStates['special_rules'] = special_rulesbd9d8,
        codeStates['setspecial_rules'] = setspecial_rulesbd9d8,
        codeStates['venue_special_rules_divider'] = venue_special_rules_dividere4760,
        codeStates['setvenue_special_rules_divider'] = setvenue_special_rules_dividere4760,
        codeStates['georgia_group'] = georgia_group0fa18,
        codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
        codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
        codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
        codeStates['venue_special_rules_dividers'] = venue_special_rules_dividerscd6e7,
        codeStates['setvenue_special_rules_dividers'] = setvenue_special_rules_dividerscd6e7,
        codeStates['georgias_group'] = georgias_group945fd,
        codeStates['setgeorgias_group'] = setgeorgias_group945fd,
        codeStates['georgias_group945fd'] = georgias_group945fdProps,
        codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
        codeStates['venue_special_rules_dividerss'] = venue_special_rules_dividerss0fa18,
        codeStates['setvenue_special_rules_dividerss'] = setvenue_special_rules_dividerss0fa18,
        codeStates['georgias_groups'] = georgias_groups6f85f,
        codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
        codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
        codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
        codeStates['venue_special_rules_dividerssss'] = venue_special_rules_dividerssss2b01f,
        codeStates['setvenue_special_rules_dividerssss'] = setvenue_special_rules_dividerssss2b01f,
        codeStates['georgiass_groups'] = georgiass_groups86a87,
        codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
        codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
        codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
        codeStates['venues_special_rules_dividerssss'] = venues_special_rules_dividerssss9b36c,
        codeStates['setvenues_special_rules_dividerssss'] = setvenues_special_rules_dividerssss9b36c,
        codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
        codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
        codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
        codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
        codeStates['debtor_information_group'] = debtor_information_group78a70,
        codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
        codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
        codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
        codeStates['financial_details_group'] = financial_details_group52f47,
        codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
        codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
        codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
        codeStates['venue_details_group'] = venue_details_group17ac6,
        codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
        codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
        codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
        codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
        codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
        codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
        codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
        codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
        codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
        codeStates['doc_type_table'] = doc_type_tablebe9fa,
        codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
        codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
        codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
        codeStates['checklist_main_group'] = checklist_main_group0df6b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
        codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
        codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
        codeStates['checklist_group'] = checklist_group32b3d,
        codeStates['setchecklist_group'] = setchecklist_group32b3d,
        codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
        codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
        codeStates['checklist_table'] = checklist_table198e1,
        codeStates['setchecklist_table'] = setchecklist_table198e1,
        codeStates['checklist_table198e1'] = checklist_table198e1Props,
        codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const venue_group6a36dRef = useRef<any>(null);
  const handleClearSearch = () => {
    venue_group6a36dRef.current?.setSearchParams();
    venue_group6a36dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(venue_group6a36d) && Object.keys(venue_group6a36d)?.length>0)
      {
        setvenue_group6a36d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [venue_group6a36dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '17 / 25',
        gridRow: '13 / 316',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7',
        backgroundColor:'#FEFBF3',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-3 !rounded-2xl className=&#34;group border border-[#daad2f] rounded-xl p-6 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddcase_v1((pre:any)=>({...pre,_selectedGroup_:"venue_group"}))
        }}
    >
        {allowedComponent.includes("georgia_group")  &&<Groupgeorgia_group  
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
        {allowedComponent.includes("georgias_group")  &&<Groupgeorgias_group  
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
        {allowedComponent.includes("georgias_groups")  &&<Groupgeorgias_groups  
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
        {allowedComponent.includes("georgiass_groups")  &&<Groupgeorgiass_groups  
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
        {allowedComponent.includes("georgsiass_groups")  &&<Groupgeorgsiass_groups  
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
        {allowedControls.includes("rules_icon")?<Iconrules_icon /* bdce0 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("venue_special_rules_text") ?<Textvenue_special_rules_text   /* 2cdf6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("special_rules") ?<Textspecial_rules   /* bd9d8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("venue_special_rules_divider") ?<Dividervenue_special_rules_divider   /* e4760 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("venue_special_rules_dividers") ?<Dividervenue_special_rules_dividers   /* cd6e7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("venue_special_rules_dividerss") ?<Dividervenue_special_rules_dividerss   /* 0fa18 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("venue_special_rules_dividerssss") ?<Dividervenue_special_rules_dividerssss   /* 2b01f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("venues_special_rules_dividerssss") ?<Dividervenues_special_rules_dividerssss   /* 9b36c */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvenue_group
