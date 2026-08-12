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
import Texttext_state  from "./Texttext_state";
import Textstate  from "./Textstate";
import Dividerdividers  from "./Dividerdividers";
import Texttext  from "./Texttext";
import Textcounty  from "./Textcounty";
import Dividerdividerss  from "./Dividerdividerss";
import Texttext_court  from "./Texttext_court";
import Textcourt  from "./Textcourt";
import Dividerdividersss  from "./Dividerdividersss";
import Texttext_judge  from "./Texttext_judge";
import Textjudge  from "./Textjudge";
import Dividerdividerssss  from "./Dividerdividerssss";
import Texttext_filing_fee  from "./Texttext_filing_fee";
import Textfiling_fee  from "./Textfiling_fee";
import Dividerdividersssss  from "./Dividerdividersssss";
import Texttext_service_method  from "./Texttext_service_method";
import Textservice_method  from "./Textservice_method";
import Dividerdividerssssss  from "./Dividerdividerssssss";
import Texttext_efile_system  from "./Texttext_efile_system";
import Textefile_system  from "./Textefile_system";
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
  const {dfd_venuesurerealdb_v1Props, setdfd_venuesurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text_state",
      "state",
      "dividers",
      "text",
      "county",
      "dividerss",
      "text_court",
      "court",
      "dividersss",
      "text_judge",
      "judge",
      "dividerssss",
      "text_filing_fee",
      "filing_fee",
      "dividersssss",
      "text_service_method",
      "service_method",
      "dividerssssss",
      "text_efile_system",
      "efile_system"
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
      "text_state",
      "state",
      "dividers",
      "text",
      "county",
      "dividerss",
      "text_court",
      "court",
      "dividersss",
      "text_judge",
      "judge",
      "dividerssss",
      "text_filing_fee",
      "filing_fee",
      "dividersssss",
      "text_service_method",
      "service_method",
      "dividerssssss",
      "text_efile_system",
      "efile_system"
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
  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
  const {ven_name_textb2d6a, setven_name_textb2d6a}= useContext(TotalContext) as TotalContextProps;
  const {text_stateb7b09, settext_stateb7b09}= useContext(TotalContext) as TotalContextProps;
  const {state7419e, setstate7419e}= useContext(TotalContext) as TotalContextProps;
  const {dividers23b80, setdividers23b80}= useContext(TotalContext) as TotalContextProps;
  const {text1eec9, settext1eec9}= useContext(TotalContext) as TotalContextProps;
  const {countyb406d, setcountyb406d}= useContext(TotalContext) as TotalContextProps;
  const {dividerss87146, setdividerss87146}= useContext(TotalContext) as TotalContextProps;
  const {text_courtc793b, settext_courtc793b}= useContext(TotalContext) as TotalContextProps;
  const {court02ff6, setcourt02ff6}= useContext(TotalContext) as TotalContextProps;
  const {dividersss1271b, setdividersss1271b}= useContext(TotalContext) as TotalContextProps;
  const {text_judgeba2cd, settext_judgeba2cd}= useContext(TotalContext) as TotalContextProps;
  const {judge65dff, setjudge65dff}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssedbaf, setdividerssssedbaf}= useContext(TotalContext) as TotalContextProps;
  const {text_filing_fee56d8d, settext_filing_fee56d8d}= useContext(TotalContext) as TotalContextProps;
  const {filing_fee3e689, setfiling_fee3e689}= useContext(TotalContext) as TotalContextProps;
  const {dividersssssc1504, setdividersssssc1504}= useContext(TotalContext) as TotalContextProps;
  const {text_service_methodabd13, settext_service_methodabd13}= useContext(TotalContext) as TotalContextProps;
  const {service_method624d8, setservice_method624d8}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssss6b575, setdividerssssss6b575}= useContext(TotalContext) as TotalContextProps;
  const {text_efile_system7e43b, settext_efile_system7e43b}= useContext(TotalContext) as TotalContextProps;
  const {efile_system553b3, setefile_system553b3}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47bec, setspecial_rules_group47bec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47becProps, setspecial_rules_group47becProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582, setspecial_rules3c582}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582Props, setspecial_rules3c582Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewamrpggraph_v1, setviewamrpggraph_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRPgGraph:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bb2fc560566e3bb613de9b434655f664");
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
    setvenue_details_group5f664Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ven_name_text")){
        setven_name_textb2d6a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ven_name_textb2d6a?.isDisabled==null)
      {
        setven_name_textb2d6a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_state")){
        settext_stateb7b09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_stateb7b09?.isDisabled==null)
      {
        settext_stateb7b09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("state")){
        setstate7419e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(state7419e?.isDisabled==null)
      {
        setstate7419e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividers")){
        setdividers23b80((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividers23b80?.isDisabled==null)
      {
        setdividers23b80((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext1eec9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text1eec9?.isDisabled==null)
      {
        settext1eec9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("county")){
        setcountyb406d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(countyb406d?.isDisabled==null)
      {
        setcountyb406d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerss")){
        setdividerss87146((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerss87146?.isDisabled==null)
      {
        setdividerss87146((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_court")){
        settext_courtc793b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_courtc793b?.isDisabled==null)
      {
        settext_courtc793b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court")){
        setcourt02ff6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court02ff6?.isDisabled==null)
      {
        setcourt02ff6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividersss")){
        setdividersss1271b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividersss1271b?.isDisabled==null)
      {
        setdividersss1271b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_judge")){
        settext_judgeba2cd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_judgeba2cd?.isDisabled==null)
      {
        settext_judgeba2cd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("judge")){
        setjudge65dff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(judge65dff?.isDisabled==null)
      {
        setjudge65dff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerssss")){
        setdividerssssedbaf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerssssedbaf?.isDisabled==null)
      {
        setdividerssssedbaf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_filing_fee")){
        settext_filing_fee56d8d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_filing_fee56d8d?.isDisabled==null)
      {
        settext_filing_fee56d8d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("filing_fee")){
        setfiling_fee3e689((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(filing_fee3e689?.isDisabled==null)
      {
        setfiling_fee3e689((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividersssss")){
        setdividersssssc1504((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividersssssc1504?.isDisabled==null)
      {
        setdividersssssc1504((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_service_method")){
        settext_service_methodabd13((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_service_methodabd13?.isDisabled==null)
      {
        settext_service_methodabd13((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("service_method")){
        setservice_method624d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(service_method624d8?.isDisabled==null)
      {
        setservice_method624d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dividerssssss")){
        setdividerssssss6b575((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dividerssssss6b575?.isDisabled==null)
      {
        setdividerssssss6b575((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text_efile_system")){
        settext_efile_system7e43b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(text_efile_system7e43b?.isDisabled==null)
      {
        settext_efile_system7e43b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("efile_system")){
        setefile_system553b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(efile_system553b3?.isDisabled==null)
      {
        setefile_system553b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_group4945a,
        codeStates['setadd_case_group'] = setadd_case_group4945a,
        codeStates['add_case_group4945a'] = add_case_group4945aProps,
        codeStates['setadd_case_group4945a'] = setadd_case_group4945aProps,
        codeStates['header_group'] = header_groupf55cb,
        codeStates['setheader_group'] = setheader_groupf55cb,
        codeStates['header_groupf55cb'] = header_groupf55cbProps,
        codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_groupdfaaf,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_groupdfaaf,
        codeStates['required_dociument_main_groupdfaaf'] = required_dociument_main_groupdfaafProps,
        codeStates['setrequired_dociument_main_groupdfaaf'] = setrequired_dociument_main_groupdfaafProps,
        codeStates['doc_table'] = doc_table8af83,
        codeStates['setdoc_table'] = setdoc_table8af83,
        codeStates['doc_table8af83'] = doc_table8af83Props,
        codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
        codeStates['case_information_group'] = case_information_group40df6,
        codeStates['setcase_information_group'] = setcase_information_group40df6,
        codeStates['case_information_group40df6'] = case_information_group40df6Props,
        codeStates['setcase_information_group40df6'] = setcase_information_group40df6Props,
        codeStates['card_group'] = card_group00ce3,
        codeStates['setcard_group'] = setcard_group00ce3,
        codeStates['card_group00ce3'] = card_group00ce3Props,
        codeStates['setcard_group00ce3'] = setcard_group00ce3Props,
        codeStates['principal_group'] = principal_group510ca,
        codeStates['setprincipal_group'] = setprincipal_group510ca,
        codeStates['principal_group510ca'] = principal_group510caProps,
        codeStates['setprincipal_group510ca'] = setprincipal_group510caProps,
        codeStates['intrest_group'] = intrest_group1ba85,
        codeStates['setintrest_group'] = setintrest_group1ba85,
        codeStates['intrest_group1ba85'] = intrest_group1ba85Props,
        codeStates['setintrest_group1ba85'] = setintrest_group1ba85Props,
        codeStates['fees_group'] = fees_groupbee4a,
        codeStates['setfees_group'] = setfees_groupbee4a,
        codeStates['fees_groupbee4a'] = fees_groupbee4aProps,
        codeStates['setfees_groupbee4a'] = setfees_groupbee4aProps,
        codeStates['total_group'] = total_group197f6,
        codeStates['settotal_group'] = settotal_group197f6,
        codeStates['total_group197f6'] = total_group197f6Props,
        codeStates['settotal_group197f6'] = settotal_group197f6Props,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
        codeStates['ven_name_text'] = ven_name_textb2d6a,
        codeStates['setven_name_text'] = setven_name_textb2d6a,
        codeStates['text_state'] = text_stateb7b09,
        codeStates['settext_state'] = settext_stateb7b09,
        codeStates['state'] = state7419e,
        codeStates['setstate'] = setstate7419e,
        codeStates['dividers'] = dividers23b80,
        codeStates['setdividers'] = setdividers23b80,
        codeStates['text'] = text1eec9,
        codeStates['settext'] = settext1eec9,
        codeStates['county'] = countyb406d,
        codeStates['setcounty'] = setcountyb406d,
        codeStates['dividerss'] = dividerss87146,
        codeStates['setdividerss'] = setdividerss87146,
        codeStates['text_court'] = text_courtc793b,
        codeStates['settext_court'] = settext_courtc793b,
        codeStates['court'] = court02ff6,
        codeStates['setcourt'] = setcourt02ff6,
        codeStates['dividersss'] = dividersss1271b,
        codeStates['setdividersss'] = setdividersss1271b,
        codeStates['text_judge'] = text_judgeba2cd,
        codeStates['settext_judge'] = settext_judgeba2cd,
        codeStates['judge'] = judge65dff,
        codeStates['setjudge'] = setjudge65dff,
        codeStates['dividerssss'] = dividerssssedbaf,
        codeStates['setdividerssss'] = setdividerssssedbaf,
        codeStates['text_filing_fee'] = text_filing_fee56d8d,
        codeStates['settext_filing_fee'] = settext_filing_fee56d8d,
        codeStates['filing_fee'] = filing_fee3e689,
        codeStates['setfiling_fee'] = setfiling_fee3e689,
        codeStates['dividersssss'] = dividersssssc1504,
        codeStates['setdividersssss'] = setdividersssssc1504,
        codeStates['text_service_method'] = text_service_methodabd13,
        codeStates['settext_service_method'] = settext_service_methodabd13,
        codeStates['service_method'] = service_method624d8,
        codeStates['setservice_method'] = setservice_method624d8,
        codeStates['dividerssssss'] = dividerssssss6b575,
        codeStates['setdividerssssss'] = setdividerssssss6b575,
        codeStates['text_efile_system'] = text_efile_system7e43b,
        codeStates['settext_efile_system'] = settext_efile_system7e43b,
        codeStates['efile_system'] = efile_system553b3,
        codeStates['setefile_system'] = setefile_system553b3,
        codeStates['checklist_main_group'] = checklist_main_group2d71b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2d71b,
        codeStates['checklist_main_group2d71b'] = checklist_main_group2d71bProps,
        codeStates['setchecklist_main_group2d71b'] = setchecklist_main_group2d71bProps,
        codeStates['checklist_table'] = checklist_tablec0934,
        codeStates['setchecklist_table'] = setchecklist_tablec0934,
        codeStates['checklist_tablec0934'] = checklist_tablec0934Props,
        codeStates['setchecklist_tablec0934'] = setchecklist_tablec0934Props,
        codeStates['special_rules_group'] = special_rules_group47bec,
        codeStates['setspecial_rules_group'] = setspecial_rules_group47bec,
        codeStates['special_rules_group47bec'] = special_rules_group47becProps,
        codeStates['setspecial_rules_group47bec'] = setspecial_rules_group47becProps,
        codeStates['special_rules'] = special_rules3c582,
        codeStates['setspecial_rules'] = setspecial_rules3c582,
        codeStates['special_rules3c582'] = special_rules3c582Props,
        codeStates['setspecial_rules3c582'] = setspecial_rules3c582Props,

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
        codeStates['add_case_group'] = add_case_group4945a,
        codeStates['setadd_case_group'] = setadd_case_group4945a,
        codeStates['add_case_group4945a'] = add_case_group4945aProps,
        codeStates['setadd_case_group4945a'] = setadd_case_group4945aProps,
        codeStates['header_group'] = header_groupf55cb,
        codeStates['setheader_group'] = setheader_groupf55cb,
        codeStates['header_groupf55cb'] = header_groupf55cbProps,
        codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_groupdfaaf,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_groupdfaaf,
        codeStates['required_dociument_main_groupdfaaf'] = required_dociument_main_groupdfaafProps,
        codeStates['setrequired_dociument_main_groupdfaaf'] = setrequired_dociument_main_groupdfaafProps,
        codeStates['doc_table'] = doc_table8af83,
        codeStates['setdoc_table'] = setdoc_table8af83,
        codeStates['doc_table8af83'] = doc_table8af83Props,
        codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
        codeStates['case_information_group'] = case_information_group40df6,
        codeStates['setcase_information_group'] = setcase_information_group40df6,
        codeStates['case_information_group40df6'] = case_information_group40df6Props,
        codeStates['setcase_information_group40df6'] = setcase_information_group40df6Props,
        codeStates['card_group'] = card_group00ce3,
        codeStates['setcard_group'] = setcard_group00ce3,
        codeStates['card_group00ce3'] = card_group00ce3Props,
        codeStates['setcard_group00ce3'] = setcard_group00ce3Props,
        codeStates['principal_group'] = principal_group510ca,
        codeStates['setprincipal_group'] = setprincipal_group510ca,
        codeStates['principal_group510ca'] = principal_group510caProps,
        codeStates['setprincipal_group510ca'] = setprincipal_group510caProps,
        codeStates['intrest_group'] = intrest_group1ba85,
        codeStates['setintrest_group'] = setintrest_group1ba85,
        codeStates['intrest_group1ba85'] = intrest_group1ba85Props,
        codeStates['setintrest_group1ba85'] = setintrest_group1ba85Props,
        codeStates['fees_group'] = fees_groupbee4a,
        codeStates['setfees_group'] = setfees_groupbee4a,
        codeStates['fees_groupbee4a'] = fees_groupbee4aProps,
        codeStates['setfees_groupbee4a'] = setfees_groupbee4aProps,
        codeStates['total_group'] = total_group197f6,
        codeStates['settotal_group'] = settotal_group197f6,
        codeStates['total_group197f6'] = total_group197f6Props,
        codeStates['settotal_group197f6'] = settotal_group197f6Props,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
        codeStates['ven_name_text'] = ven_name_textb2d6a,
        codeStates['setven_name_text'] = setven_name_textb2d6a,
        codeStates['text_state'] = text_stateb7b09,
        codeStates['settext_state'] = settext_stateb7b09,
        codeStates['state'] = state7419e,
        codeStates['setstate'] = setstate7419e,
        codeStates['dividers'] = dividers23b80,
        codeStates['setdividers'] = setdividers23b80,
        codeStates['text'] = text1eec9,
        codeStates['settext'] = settext1eec9,
        codeStates['county'] = countyb406d,
        codeStates['setcounty'] = setcountyb406d,
        codeStates['dividerss'] = dividerss87146,
        codeStates['setdividerss'] = setdividerss87146,
        codeStates['text_court'] = text_courtc793b,
        codeStates['settext_court'] = settext_courtc793b,
        codeStates['court'] = court02ff6,
        codeStates['setcourt'] = setcourt02ff6,
        codeStates['dividersss'] = dividersss1271b,
        codeStates['setdividersss'] = setdividersss1271b,
        codeStates['text_judge'] = text_judgeba2cd,
        codeStates['settext_judge'] = settext_judgeba2cd,
        codeStates['judge'] = judge65dff,
        codeStates['setjudge'] = setjudge65dff,
        codeStates['dividerssss'] = dividerssssedbaf,
        codeStates['setdividerssss'] = setdividerssssedbaf,
        codeStates['text_filing_fee'] = text_filing_fee56d8d,
        codeStates['settext_filing_fee'] = settext_filing_fee56d8d,
        codeStates['filing_fee'] = filing_fee3e689,
        codeStates['setfiling_fee'] = setfiling_fee3e689,
        codeStates['dividersssss'] = dividersssssc1504,
        codeStates['setdividersssss'] = setdividersssssc1504,
        codeStates['text_service_method'] = text_service_methodabd13,
        codeStates['settext_service_method'] = settext_service_methodabd13,
        codeStates['service_method'] = service_method624d8,
        codeStates['setservice_method'] = setservice_method624d8,
        codeStates['dividerssssss'] = dividerssssss6b575,
        codeStates['setdividerssssss'] = setdividerssssss6b575,
        codeStates['text_efile_system'] = text_efile_system7e43b,
        codeStates['settext_efile_system'] = settext_efile_system7e43b,
        codeStates['efile_system'] = efile_system553b3,
        codeStates['setefile_system'] = setefile_system553b3,
        codeStates['checklist_main_group'] = checklist_main_group2d71b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2d71b,
        codeStates['checklist_main_group2d71b'] = checklist_main_group2d71bProps,
        codeStates['setchecklist_main_group2d71b'] = setchecklist_main_group2d71bProps,
        codeStates['checklist_table'] = checklist_tablec0934,
        codeStates['setchecklist_table'] = setchecklist_tablec0934,
        codeStates['checklist_tablec0934'] = checklist_tablec0934Props,
        codeStates['setchecklist_tablec0934'] = setchecklist_tablec0934Props,
        codeStates['special_rules_group'] = special_rules_group47bec,
        codeStates['setspecial_rules_group'] = setspecial_rules_group47bec,
        codeStates['special_rules_group47bec'] = special_rules_group47becProps,
        codeStates['setspecial_rules_group47bec'] = setspecial_rules_group47becProps,
        codeStates['special_rules'] = special_rules3c582,
        codeStates['setspecial_rules'] = setspecial_rules3c582,
        codeStates['special_rules3c582'] = special_rules3c582Props,
        codeStates['setspecial_rules3c582'] = setspecial_rules3c582Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const venue_details_group5f664Ref = useRef<any>(null);
  const handleClearSearch = () => {
    venue_details_group5f664Ref.current?.setSearchParams();
    venue_details_group5f664Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(venue_details_group5f664) && Object.keys(venue_details_group5f664)?.length>0)
      {
        setvenue_details_group5f664({})
      }
    }else 
      prevRefreshRef.current= true
  }, [venue_details_group5f664Props?.refresh,token])


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
          setviewamrpggraph_v1((pre:any)=>({...pre,_selectedGroup_:"venue_details_group"}))
        }}
    >
          {allowedControls.includes("ven_name_text") ?<Textven_name_text   /* b2d6a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_state") ?<Texttext_state   /* b7b09 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("state") ?<Textstate   /* 7419e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividers") ?<Dividerdividers   /* 23b80 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 1eec9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("county") ?<Textcounty   /* b406d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerss") ?<Dividerdividerss   /* 87146 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_court") ?<Texttext_court   /* c793b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("court") ?<Textcourt   /* 02ff6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividersss") ?<Dividerdividersss   /* 1271b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_judge") ?<Texttext_judge   /* ba2cd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("judge") ?<Textjudge   /* 65dff */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerssss") ?<Dividerdividerssss   /* edbaf */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_filing_fee") ?<Texttext_filing_fee   /* 56d8d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("filing_fee") ?<Textfiling_fee   /* 3e689 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividersssss") ?<Dividerdividersssss   /* c1504 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_service_method") ?<Texttext_service_method   /* abd13 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("service_method") ?<Textservice_method   /* 624d8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dividerssssss") ?<Dividerdividerssssss   /* 6b575 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text_efile_system") ?<Texttext_efile_system   /* 7e43b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("efile_system") ?<Textefile_system   /* 553b3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupvenue_details_group
