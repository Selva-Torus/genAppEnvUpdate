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
import Textven_name_text  from "./Textven_name_text";
import TextInputstate  from "./TextInputstate";
import Dividerdividers  from "./Dividerdividers";
import TextInputcountry  from "./TextInputcountry";
import Dividerdividerss  from "./Dividerdividerss";
import TextInputcourt_name  from "./TextInputcourt_name";
import Dividerdividersss  from "./Dividerdividersss";
import TextInputjudge_name  from "./TextInputjudge_name";
import Dividerdividerssss  from "./Dividerdividerssss";
import TextInputfiling_fee  from "./TextInputfiling_fee";
import Dividerdividersssss  from "./Dividerdividersssss";
import TextInputservice_method  from "./TextInputservice_method";
import Dividerdividerssssss  from "./Dividerdividerssssss";
import TextInputefiling_system  from "./TextInputefiling_system";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvenue_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctypenamecombo_v1Props, setdfd_doctypenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrchecklistcombo_v1Props, setdfd_amrchecklistcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_doctable_v1Props, setdfd_doctable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_amrcheckliststatus_v1Props, setdfd_amrcheckliststatus_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_specialrulessurerealdb_v1Props, setdfd_specialrulessurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ven_name_text",
      "state",
      "dividers",
      "country",
      "dividerss",
      "court_name",
      "dividersss",
      "judge_name",
      "dividerssss",
      "filing_fee",
      "dividersssss",
      "service_method",
      "dividerssssss",
      "efiling_system"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "required_dociument_main_group",
      "doc_table",
      "case_information_group",
      "card_group",
      "principal_group",
      "intrest_group",
      "fees_group",
      "total_group",
      "venue_details_group",
      "checklist_main_group",
      "checklist_table",
      "special_rules_group",
      "special_rules"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "ven_name_text",
      "state",
      "dividers",
      "country",
      "dividerss",
      "court_name",
      "dividersss",
      "judge_name",
      "dividerssss",
      "filing_fee",
      "dividersssss",
      "service_method",
      "dividerssssss",
      "efiling_system"
    ],
    "allowedGroups": [
      "canvas",
      "add_case_group",
      "header_group",
      "required_dociument_main_group",
      "doc_table",
      "case_information_group",
      "card_group",
      "principal_group",
      "intrest_group",
      "fees_group",
      "total_group",
      "venue_details_group",
      "checklist_main_group",
      "checklist_table",
      "special_rules_group",
      "special_rules"
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
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {ven_name_textf01f8, setven_name_textf01f8}= useContext(TotalContext) as TotalContextProps;
  const {statea7e09, setstatea7e09}= useContext(TotalContext) as TotalContextProps;
  const {dividersa774c, setdividersa774c}= useContext(TotalContext) as TotalContextProps;
  const {countrydb772, setcountrydb772}= useContext(TotalContext) as TotalContextProps;
  const {dividerssaf051, setdividerssaf051}= useContext(TotalContext) as TotalContextProps;
  const {court_name7a5a6, setcourt_name7a5a6}= useContext(TotalContext) as TotalContextProps;
  const {dividersssbef5f, setdividersssbef5f}= useContext(TotalContext) as TotalContextProps;
  const {judge_name71e3e, setjudge_name71e3e}= useContext(TotalContext) as TotalContextProps;
  const {dividerssss61d06, setdividerssss61d06}= useContext(TotalContext) as TotalContextProps;
  const {filing_fee144cd, setfiling_fee144cd}= useContext(TotalContext) as TotalContextProps;
  const {dividersssssd333b, setdividersssssd333b}= useContext(TotalContext) as TotalContextProps;
  const {service_method48ac6, setservice_method48ac6}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssss06ce3, setdividerssssss06ce3}= useContext(TotalContext) as TotalContextProps;
  const {efiling_system964db, setefiling_system964db}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewamrcasepggraph_v1, setviewamrcasepggraph_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1',
    [user],
    'GroupVenueDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "57c10704bc2bf3a621d11bfa47051614");
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
    setvenue_details_group51614Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ven_name_text")){
        setven_name_textf01f8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ven_name_textf01f8?.isDisabled==null)
      {
        setven_name_textf01f8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("state")){
        setstatea7e09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(statea7e09?.isDisabled==null)
      {
        setstatea7e09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividers")){
        setdividersa774c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividersa774c?.isDisabled==null)
      {
        setdividersa774c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("country")){
        setcountrydb772((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(countrydb772?.isDisabled==null)
      {
        setcountrydb772((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerss")){
        setdividerssaf051((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerssaf051?.isDisabled==null)
      {
        setdividerssaf051((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_name")){
        setcourt_name7a5a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_name7a5a6?.isDisabled==null)
      {
        setcourt_name7a5a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividersss")){
        setdividersssbef5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividersssbef5f?.isDisabled==null)
      {
        setdividersssbef5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("judge_name")){
        setjudge_name71e3e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(judge_name71e3e?.isDisabled==null)
      {
        setjudge_name71e3e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerssss")){
        setdividerssss61d06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerssss61d06?.isDisabled==null)
      {
        setdividerssss61d06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("filing_fee")){
        setfiling_fee144cd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(filing_fee144cd?.isDisabled==null)
      {
        setfiling_fee144cd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividersssss")){
        setdividersssssd333b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividersssssd333b?.isDisabled==null)
      {
        setdividersssssd333b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_method")){
        setservice_method48ac6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_method48ac6?.isDisabled==null)
      {
        setservice_method48ac6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerssssss")){
        setdividerssssss06ce3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerssssss06ce3?.isDisabled==null)
      {
        setdividerssssss06ce3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("efiling_system")){
        setefiling_system964db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(efiling_system964db?.isDisabled==null)
      {
        setefiling_system964db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_grouped126,
        codeStates['setadd_case_group'] = setadd_case_grouped126,
        codeStates['add_case_grouped126'] = add_case_grouped126Props,
        codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
        codeStates['header_group'] = header_groupbd8a8,
        codeStates['setheader_group'] = setheader_groupbd8a8,
        codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
        codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
        codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
        codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
        codeStates['doc_table'] = doc_table9c4f7,
        codeStates['setdoc_table'] = setdoc_table9c4f7,
        codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
        codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
        codeStates['case_information_group'] = case_information_group48f3c,
        codeStates['setcase_information_group'] = setcase_information_group48f3c,
        codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
        codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
        codeStates['card_group'] = card_group4c709,
        codeStates['setcard_group'] = setcard_group4c709,
        codeStates['card_group4c709'] = card_group4c709Props,
        codeStates['setcard_group4c709'] = setcard_group4c709Props,
        codeStates['principal_group'] = principal_group42235,
        codeStates['setprincipal_group'] = setprincipal_group42235,
        codeStates['principal_group42235'] = principal_group42235Props,
        codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
        codeStates['intrest_group'] = intrest_group65c3b,
        codeStates['setintrest_group'] = setintrest_group65c3b,
        codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
        codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
        codeStates['fees_group'] = fees_group8c4a6,
        codeStates['setfees_group'] = setfees_group8c4a6,
        codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
        codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
        codeStates['total_group'] = total_groupc52d3,
        codeStates['settotal_group'] = settotal_groupc52d3,
        codeStates['total_groupc52d3'] = total_groupc52d3Props,
        codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
        codeStates['venue_details_group'] = venue_details_group51614,
        codeStates['setvenue_details_group'] = setvenue_details_group51614,
        codeStates['venue_details_group51614'] = venue_details_group51614Props,
        codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
        codeStates['ven_name_text'] = ven_name_textf01f8,
        codeStates['setven_name_text'] = setven_name_textf01f8,
        codeStates['state'] = statea7e09,
        codeStates['setstate'] = setstatea7e09,
        codeStates['dividers'] = dividersa774c,
        codeStates['setdividers'] = setdividersa774c,
        codeStates['country'] = countrydb772,
        codeStates['setcountry'] = setcountrydb772,
        codeStates['dividerss'] = dividerssaf051,
        codeStates['setdividerss'] = setdividerssaf051,
        codeStates['court_name'] = court_name7a5a6,
        codeStates['setcourt_name'] = setcourt_name7a5a6,
        codeStates['dividersss'] = dividersssbef5f,
        codeStates['setdividersss'] = setdividersssbef5f,
        codeStates['judge_name'] = judge_name71e3e,
        codeStates['setjudge_name'] = setjudge_name71e3e,
        codeStates['dividerssss'] = dividerssss61d06,
        codeStates['setdividerssss'] = setdividerssss61d06,
        codeStates['filing_fee'] = filing_fee144cd,
        codeStates['setfiling_fee'] = setfiling_fee144cd,
        codeStates['dividersssss'] = dividersssssd333b,
        codeStates['setdividersssss'] = setdividersssssd333b,
        codeStates['service_method'] = service_method48ac6,
        codeStates['setservice_method'] = setservice_method48ac6,
        codeStates['dividerssssss'] = dividerssssss06ce3,
        codeStates['setdividerssssss'] = setdividerssssss06ce3,
        codeStates['efiling_system'] = efiling_system964db,
        codeStates['setefiling_system'] = setefiling_system964db,
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['checklist_table'] = checklist_tablecafb0,
        codeStates['setchecklist_table'] = setchecklist_tablecafb0,
        codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
        codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
        codeStates['special_rules_group'] = special_rules_group7ce9f,
        codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
        codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
        codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
        codeStates['special_rules'] = special_rules7f109,
        codeStates['setspecial_rules'] = setspecial_rules7f109,
        codeStates['special_rules7f109'] = special_rules7f109Props,
        codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,

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
        codeStates['add_case_group'] = add_case_grouped126,
        codeStates['setadd_case_group'] = setadd_case_grouped126,
        codeStates['add_case_grouped126'] = add_case_grouped126Props,
        codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
        codeStates['header_group'] = header_groupbd8a8,
        codeStates['setheader_group'] = setheader_groupbd8a8,
        codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
        codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
        codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
        codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
        codeStates['doc_table'] = doc_table9c4f7,
        codeStates['setdoc_table'] = setdoc_table9c4f7,
        codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
        codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
        codeStates['case_information_group'] = case_information_group48f3c,
        codeStates['setcase_information_group'] = setcase_information_group48f3c,
        codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
        codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
        codeStates['card_group'] = card_group4c709,
        codeStates['setcard_group'] = setcard_group4c709,
        codeStates['card_group4c709'] = card_group4c709Props,
        codeStates['setcard_group4c709'] = setcard_group4c709Props,
        codeStates['principal_group'] = principal_group42235,
        codeStates['setprincipal_group'] = setprincipal_group42235,
        codeStates['principal_group42235'] = principal_group42235Props,
        codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
        codeStates['intrest_group'] = intrest_group65c3b,
        codeStates['setintrest_group'] = setintrest_group65c3b,
        codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
        codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
        codeStates['fees_group'] = fees_group8c4a6,
        codeStates['setfees_group'] = setfees_group8c4a6,
        codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
        codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
        codeStates['total_group'] = total_groupc52d3,
        codeStates['settotal_group'] = settotal_groupc52d3,
        codeStates['total_groupc52d3'] = total_groupc52d3Props,
        codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
        codeStates['venue_details_group'] = venue_details_group51614,
        codeStates['setvenue_details_group'] = setvenue_details_group51614,
        codeStates['venue_details_group51614'] = venue_details_group51614Props,
        codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
        codeStates['ven_name_text'] = ven_name_textf01f8,
        codeStates['setven_name_text'] = setven_name_textf01f8,
        codeStates['state'] = statea7e09,
        codeStates['setstate'] = setstatea7e09,
        codeStates['dividers'] = dividersa774c,
        codeStates['setdividers'] = setdividersa774c,
        codeStates['country'] = countrydb772,
        codeStates['setcountry'] = setcountrydb772,
        codeStates['dividerss'] = dividerssaf051,
        codeStates['setdividerss'] = setdividerssaf051,
        codeStates['court_name'] = court_name7a5a6,
        codeStates['setcourt_name'] = setcourt_name7a5a6,
        codeStates['dividersss'] = dividersssbef5f,
        codeStates['setdividersss'] = setdividersssbef5f,
        codeStates['judge_name'] = judge_name71e3e,
        codeStates['setjudge_name'] = setjudge_name71e3e,
        codeStates['dividerssss'] = dividerssss61d06,
        codeStates['setdividerssss'] = setdividerssss61d06,
        codeStates['filing_fee'] = filing_fee144cd,
        codeStates['setfiling_fee'] = setfiling_fee144cd,
        codeStates['dividersssss'] = dividersssssd333b,
        codeStates['setdividersssss'] = setdividersssssd333b,
        codeStates['service_method'] = service_method48ac6,
        codeStates['setservice_method'] = setservice_method48ac6,
        codeStates['dividerssssss'] = dividerssssss06ce3,
        codeStates['setdividerssssss'] = setdividerssssss06ce3,
        codeStates['efiling_system'] = efiling_system964db,
        codeStates['setefiling_system'] = setefiling_system964db,
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['checklist_table'] = checklist_tablecafb0,
        codeStates['setchecklist_table'] = setchecklist_tablecafb0,
        codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
        codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
        codeStates['special_rules_group'] = special_rules_group7ce9f,
        codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
        codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
        codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
        codeStates['special_rules'] = special_rules7f109,
        codeStates['setspecial_rules'] = setspecial_rules7f109,
        codeStates['special_rules7f109'] = special_rules7f109Props,
        codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const venue_details_group51614Ref = useRef<any>(null);
  const handleClearSearch = () => {
    venue_details_group51614Ref.current?.setSearchParams();
    venue_details_group51614Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(venue_details_group51614) && Object.keys(venue_details_group51614)?.length>0)
      {
        setvenue_details_group51614({})
      }
    }else 
      prevRefreshRef.current= true
  }, [venue_details_group51614Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '19 / 25',
        gridRow: '11 / 129',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
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
          setviewamrcasepggraph_v1((pre:any)=>({...pre,_selectedGroup_:"venue_details_group"}))
        }}
    >
          {allowedControls.includes("ven_name_text") ?<Textven_name_text   /* f01f8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("state") ?<TextInputstate   /* a7e09 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividers") ?<Dividerdividers   /* a774c */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("country") ?<TextInputcountry   /* db772 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerss") ?<Dividerdividerss   /* af051 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("court_name") ?<TextInputcourt_name   /* 7a5a6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividersss") ?<Dividerdividersss   /* bef5f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("judge_name") ?<TextInputjudge_name   /* 71e3e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerssss") ?<Dividerdividerssss   /* 61d06 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("filing_fee") ?<TextInputfiling_fee   /* 144cd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividersssss") ?<Dividerdividersssss   /* d333b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("service_method") ?<TextInputservice_method   /* 48ac6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerssssss") ?<Dividerdividerssssss   /* 06ce3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("efiling_system") ?<TextInputefiling_system   /* 964db */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvenue_details_group
