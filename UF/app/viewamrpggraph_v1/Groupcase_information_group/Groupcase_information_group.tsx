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
import Groupcard_group  from "../Groupcard_group/Groupcard_group";
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
import TextInputdebtor_name  from "./TextInputdebtor_name";
import TextInputcase_display_id  from "./TextInputcase_display_id";
import TextInputssn_masked  from "./TextInputssn_masked";
import DatePickerdob  from "./DatePickerdob";
import TextAreaaddress  from "./TextAreaaddress";
import TextInputcreditor_name  from "./TextInputcreditor_name";
import DatePickercharge_off_date  from "./DatePickercharge_off_date";
import DatePickerlast_payment_date  from "./DatePickerlast_payment_date";
import Dividerdivider  from "./Dividerdivider";
import DatePickersol_expiry_date  from "./DatePickersol_expiry_date";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcase_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_venuesurerealdb_v1Props, setdfd_venuesurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "case_info_text",
      "debtor_name",
      "case_display_id",
      "ssn_masked",
      "dob",
      "address",
      "creditor_name",
      "charge_off_date",
      "last_payment_date",
      "divider",
      "sol_expiry_date"
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
      "case_info_text",
      "debtor_name",
      "case_display_id",
      "ssn_masked",
      "dob",
      "address",
      "creditor_name",
      "charge_off_date",
      "last_payment_date",
      "divider",
      "sol_expiry_date"
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
  const {case_info_textee1f0, setcase_info_textee1f0}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name12f82, setdebtor_name12f82}= useContext(TotalContext) as TotalContextProps;
  const {case_display_idda9aa, setcase_display_idda9aa}= useContext(TotalContext) as TotalContextProps;
  const {ssn_masked6441e, setssn_masked6441e}= useContext(TotalContext) as TotalContextProps;
  const {dobb26e1, setdobb26e1}= useContext(TotalContext) as TotalContextProps;
  const {address6196d, setaddress6196d}= useContext(TotalContext) as TotalContextProps;
  const {creditor_nameb337f, setcreditor_nameb337f}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_date4e80f, setcharge_off_date4e80f}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_datef6b2b, setlast_payment_datef6b2b}= useContext(TotalContext) as TotalContextProps;
  const {divider09dfa, setdivider09dfa}= useContext(TotalContext) as TotalContextProps;
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
  const {sol_expiry_date3d70d, setsol_expiry_date3d70d}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "29949970b12d2ab7344e422611d40df6");
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
    setcase_information_group40df6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("case_info_text")){
        setcase_info_textee1f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_info_textee1f0?.isDisabled==null)
      {
        setcase_info_textee1f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debtor_name")){
        setdebtor_name12f82((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(debtor_name12f82?.isDisabled==null)
      {
        setdebtor_name12f82((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("case_display_id")){
        setcase_display_idda9aa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_display_idda9aa?.isDisabled==null)
      {
        setcase_display_idda9aa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ssn_masked")){
        setssn_masked6441e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ssn_masked6441e?.isDisabled==null)
      {
        setssn_masked6441e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dob")){
        setdobb26e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dobb26e1?.isDisabled==null)
      {
        setdobb26e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("address")){
        setaddress6196d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(address6196d?.isDisabled==null)
      {
        setaddress6196d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("creditor_name")){
        setcreditor_nameb337f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(creditor_nameb337f?.isDisabled==null)
      {
        setcreditor_nameb337f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("charge_off_date")){
        setcharge_off_date4e80f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(charge_off_date4e80f?.isDisabled==null)
      {
        setcharge_off_date4e80f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_payment_date")){
        setlast_payment_datef6b2b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(last_payment_datef6b2b?.isDisabled==null)
      {
        setlast_payment_datef6b2b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider09dfa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider09dfa?.isDisabled==null)
      {
        setdivider09dfa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("card_group")){
        setcard_group00ce3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(card_group00ce3?.isDisabled==null)
      {
        setcard_group00ce3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sol_expiry_date")){
        setsol_expiry_date3d70d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(sol_expiry_date3d70d?.isDisabled==null)
      {
        setsol_expiry_date3d70d((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['case_info_text'] = case_info_textee1f0,
        codeStates['setcase_info_text'] = setcase_info_textee1f0,
        codeStates['debtor_name'] = debtor_name12f82,
        codeStates['setdebtor_name'] = setdebtor_name12f82,
        codeStates['case_display_id'] = case_display_idda9aa,
        codeStates['setcase_display_id'] = setcase_display_idda9aa,
        codeStates['ssn_masked'] = ssn_masked6441e,
        codeStates['setssn_masked'] = setssn_masked6441e,
        codeStates['dob'] = dobb26e1,
        codeStates['setdob'] = setdobb26e1,
        codeStates['address'] = address6196d,
        codeStates['setaddress'] = setaddress6196d,
        codeStates['creditor_name'] = creditor_nameb337f,
        codeStates['setcreditor_name'] = setcreditor_nameb337f,
        codeStates['charge_off_date'] = charge_off_date4e80f,
        codeStates['setcharge_off_date'] = setcharge_off_date4e80f,
        codeStates['last_payment_date'] = last_payment_datef6b2b,
        codeStates['setlast_payment_date'] = setlast_payment_datef6b2b,
        codeStates['divider'] = divider09dfa,
        codeStates['setdivider'] = setdivider09dfa,
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
        codeStates['sol_expiry_date'] = sol_expiry_date3d70d,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3d70d,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
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
        codeStates['case_info_text'] = case_info_textee1f0,
        codeStates['setcase_info_text'] = setcase_info_textee1f0,
        codeStates['debtor_name'] = debtor_name12f82,
        codeStates['setdebtor_name'] = setdebtor_name12f82,
        codeStates['case_display_id'] = case_display_idda9aa,
        codeStates['setcase_display_id'] = setcase_display_idda9aa,
        codeStates['ssn_masked'] = ssn_masked6441e,
        codeStates['setssn_masked'] = setssn_masked6441e,
        codeStates['dob'] = dobb26e1,
        codeStates['setdob'] = setdobb26e1,
        codeStates['address'] = address6196d,
        codeStates['setaddress'] = setaddress6196d,
        codeStates['creditor_name'] = creditor_nameb337f,
        codeStates['setcreditor_name'] = setcreditor_nameb337f,
        codeStates['charge_off_date'] = charge_off_date4e80f,
        codeStates['setcharge_off_date'] = setcharge_off_date4e80f,
        codeStates['last_payment_date'] = last_payment_datef6b2b,
        codeStates['setlast_payment_date'] = setlast_payment_datef6b2b,
        codeStates['divider'] = divider09dfa,
        codeStates['setdivider'] = setdivider09dfa,
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
        codeStates['sol_expiry_date'] = sol_expiry_date3d70d,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3d70d,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
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


  const case_information_group40df6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    case_information_group40df6Ref.current?.setSearchParams();
    case_information_group40df6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(case_information_group40df6) && Object.keys(case_information_group40df6)?.length>0)
      {
        setcase_information_group40df6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [case_information_group40df6Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '9 / 19',
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
          setviewamrpggraph_v1((pre:any)=>({...pre,_selectedGroup_:"case_information_group"}))
        }}
    >
        {allowedComponent.includes("card_group")  &&<Groupcard_group  
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
          {allowedControls.includes("case_info_text") ?<Textcase_info_text   /* ee1f0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("debtor_name") ?<TextInputdebtor_name   /* 12f82 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("case_display_id") ?<TextInputcase_display_id   /* da9aa */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ssn_masked") ?<TextInputssn_masked   /* 6441e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dob") ?<DatePickerdob   /* b26e1 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("address") ?<TextAreaaddress   /* 6196d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("creditor_name") ?<TextInputcreditor_name   /* b337f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("charge_off_date") ?<DatePickercharge_off_date   /* 4e80f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("last_payment_date") ?<DatePickerlast_payment_date   /* f6b2b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 09dfa */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sol_expiry_date") ?<DatePickersol_expiry_date   /* 3d70d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcase_information_group
