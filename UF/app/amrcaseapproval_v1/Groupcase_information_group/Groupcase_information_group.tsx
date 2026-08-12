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
  const {dfd_venuespecialrules_v1Props, setdfd_venuespecialrules_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "special_rules",
      "dynamicactions"
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
      "special_rules",
      "dynamicactions"
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
  const {add_case_group77747, setadd_case_group77747}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group77747Props, setadd_case_group77747Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8a, setheader_groupbae8a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbae8aProps, setheader_groupbae8aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8, setrequired_dociument_main_group999a8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8d, setdoc_table45b8d}= useContext(TotalContext) as TotalContextProps;
  const {doc_table45b8dProps, setdoc_table45b8dProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3, setcase_information_group35ed3}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group35ed3Props, setcase_information_group35ed3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_info_text53524, setcase_info_text53524}= useContext(TotalContext) as TotalContextProps;
  const {debtor_namea603a, setdebtor_namea603a}= useContext(TotalContext) as TotalContextProps;
  const {case_display_id3ba0a, setcase_display_id3ba0a}= useContext(TotalContext) as TotalContextProps;
  const {ssn_masked36fce, setssn_masked36fce}= useContext(TotalContext) as TotalContextProps;
  const {dob19a93, setdob19a93}= useContext(TotalContext) as TotalContextProps;
  const {address0e39e, setaddress0e39e}= useContext(TotalContext) as TotalContextProps;
  const {creditor_name04ffa, setcreditor_name04ffa}= useContext(TotalContext) as TotalContextProps;
  const {charge_off_datef5bba, setcharge_off_datef5bba}= useContext(TotalContext) as TotalContextProps;
  const {last_payment_date37076, setlast_payment_date37076}= useContext(TotalContext) as TotalContextProps;
  const {divider9cfd3, setdivider9cfd3}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78fa, setcard_groupe78fa}= useContext(TotalContext) as TotalContextProps;
  const {card_groupe78faProps, setcard_groupe78faProps}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9f, setprincipal_group9ae9f}= useContext(TotalContext) as TotalContextProps;
  const {principal_group9ae9fProps, setprincipal_group9ae9fProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75, setintrest_group8df75}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group8df75Props, setintrest_group8df75Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23b, setfees_groupac23b}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupac23bProps, setfees_groupac23bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175, settotal_groupe6175}= useContext(TotalContext) as TotalContextProps;
  const {total_groupe6175Props, settotal_groupe6175Props}= useContext(TotalContext) as TotalContextProps;
  const {sol_expiry_date3775f, setsol_expiry_date3775f}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904e, setvenue_details_group6904e}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6904eProps, setvenue_details_group6904eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ff, setchecklist_main_groupda0ff}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25b, setchecklist_table0e25b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table0e25bProps, setchecklist_table0e25bProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585, setspecial_rules_groupc1585}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupc1585Props, setspecial_rules_groupc1585Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30, setspecial_rules1fc30}= useContext(TotalContext) as TotalContextProps;
  const {special_rules1fc30Props, setspecial_rules1fc30Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34, setdynamicactions37e34}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions37e34Props, setdynamicactions37e34Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {amrcaseapproval_v1, setamrcaseapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRCaseApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b270458f4e722fe38d9cd7c50335ed3");
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
    setcase_information_group35ed3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("case_info_text")){
        setcase_info_text53524((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_info_text53524?.isDisabled==null)
      {
        setcase_info_text53524((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debtor_name")){
        setdebtor_namea603a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(debtor_namea603a?.isDisabled==null)
      {
        setdebtor_namea603a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("case_display_id")){
        setcase_display_id3ba0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_display_id3ba0a?.isDisabled==null)
      {
        setcase_display_id3ba0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ssn_masked")){
        setssn_masked36fce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ssn_masked36fce?.isDisabled==null)
      {
        setssn_masked36fce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dob")){
        setdob19a93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dob19a93?.isDisabled==null)
      {
        setdob19a93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("address")){
        setaddress0e39e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(address0e39e?.isDisabled==null)
      {
        setaddress0e39e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("creditor_name")){
        setcreditor_name04ffa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(creditor_name04ffa?.isDisabled==null)
      {
        setcreditor_name04ffa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("charge_off_date")){
        setcharge_off_datef5bba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(charge_off_datef5bba?.isDisabled==null)
      {
        setcharge_off_datef5bba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_payment_date")){
        setlast_payment_date37076((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(last_payment_date37076?.isDisabled==null)
      {
        setlast_payment_date37076((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider9cfd3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider9cfd3?.isDisabled==null)
      {
        setdivider9cfd3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("card_group")){
        setcard_groupe78fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(card_groupe78fa?.isDisabled==null)
      {
        setcard_groupe78fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sol_expiry_date")){
        setsol_expiry_date3775f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(sol_expiry_date3775f?.isDisabled==null)
      {
        setsol_expiry_date3775f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_group77747,
        codeStates['setadd_case_group'] = setadd_case_group77747,
        codeStates['add_case_group77747'] = add_case_group77747Props,
        codeStates['setadd_case_group77747'] = setadd_case_group77747Props,
        codeStates['header_group'] = header_groupbae8a,
        codeStates['setheader_group'] = setheader_groupbae8a,
        codeStates['header_groupbae8a'] = header_groupbae8aProps,
        codeStates['setheader_groupbae8a'] = setheader_groupbae8aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group999a8,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group999a8,
        codeStates['required_dociument_main_group999a8'] = required_dociument_main_group999a8Props,
        codeStates['setrequired_dociument_main_group999a8'] = setrequired_dociument_main_group999a8Props,
        codeStates['doc_table'] = doc_table45b8d,
        codeStates['setdoc_table'] = setdoc_table45b8d,
        codeStates['doc_table45b8d'] = doc_table45b8dProps,
        codeStates['setdoc_table45b8d'] = setdoc_table45b8dProps,
        codeStates['case_information_group'] = case_information_group35ed3,
        codeStates['setcase_information_group'] = setcase_information_group35ed3,
        codeStates['case_information_group35ed3'] = case_information_group35ed3Props,
        codeStates['setcase_information_group35ed3'] = setcase_information_group35ed3Props,
        codeStates['case_info_text'] = case_info_text53524,
        codeStates['setcase_info_text'] = setcase_info_text53524,
        codeStates['debtor_name'] = debtor_namea603a,
        codeStates['setdebtor_name'] = setdebtor_namea603a,
        codeStates['case_display_id'] = case_display_id3ba0a,
        codeStates['setcase_display_id'] = setcase_display_id3ba0a,
        codeStates['ssn_masked'] = ssn_masked36fce,
        codeStates['setssn_masked'] = setssn_masked36fce,
        codeStates['dob'] = dob19a93,
        codeStates['setdob'] = setdob19a93,
        codeStates['address'] = address0e39e,
        codeStates['setaddress'] = setaddress0e39e,
        codeStates['creditor_name'] = creditor_name04ffa,
        codeStates['setcreditor_name'] = setcreditor_name04ffa,
        codeStates['charge_off_date'] = charge_off_datef5bba,
        codeStates['setcharge_off_date'] = setcharge_off_datef5bba,
        codeStates['last_payment_date'] = last_payment_date37076,
        codeStates['setlast_payment_date'] = setlast_payment_date37076,
        codeStates['divider'] = divider9cfd3,
        codeStates['setdivider'] = setdivider9cfd3,
        codeStates['card_group'] = card_groupe78fa,
        codeStates['setcard_group'] = setcard_groupe78fa,
        codeStates['card_groupe78fa'] = card_groupe78faProps,
        codeStates['setcard_groupe78fa'] = setcard_groupe78faProps,
        codeStates['principal_group'] = principal_group9ae9f,
        codeStates['setprincipal_group'] = setprincipal_group9ae9f,
        codeStates['principal_group9ae9f'] = principal_group9ae9fProps,
        codeStates['setprincipal_group9ae9f'] = setprincipal_group9ae9fProps,
        codeStates['intrest_group'] = intrest_group8df75,
        codeStates['setintrest_group'] = setintrest_group8df75,
        codeStates['intrest_group8df75'] = intrest_group8df75Props,
        codeStates['setintrest_group8df75'] = setintrest_group8df75Props,
        codeStates['fees_group'] = fees_groupac23b,
        codeStates['setfees_group'] = setfees_groupac23b,
        codeStates['fees_groupac23b'] = fees_groupac23bProps,
        codeStates['setfees_groupac23b'] = setfees_groupac23bProps,
        codeStates['total_group'] = total_groupe6175,
        codeStates['settotal_group'] = settotal_groupe6175,
        codeStates['total_groupe6175'] = total_groupe6175Props,
        codeStates['settotal_groupe6175'] = settotal_groupe6175Props,
        codeStates['sol_expiry_date'] = sol_expiry_date3775f,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3775f,
        codeStates['venue_details_group'] = venue_details_group6904e,
        codeStates['setvenue_details_group'] = setvenue_details_group6904e,
        codeStates['venue_details_group6904e'] = venue_details_group6904eProps,
        codeStates['setvenue_details_group6904e'] = setvenue_details_group6904eProps,
        codeStates['checklist_main_group'] = checklist_main_groupda0ff,
        codeStates['setchecklist_main_group'] = setchecklist_main_groupda0ff,
        codeStates['checklist_main_groupda0ff'] = checklist_main_groupda0ffProps,
        codeStates['setchecklist_main_groupda0ff'] = setchecklist_main_groupda0ffProps,
        codeStates['checklist_table'] = checklist_table0e25b,
        codeStates['setchecklist_table'] = setchecklist_table0e25b,
        codeStates['checklist_table0e25b'] = checklist_table0e25bProps,
        codeStates['setchecklist_table0e25b'] = setchecklist_table0e25bProps,
        codeStates['special_rules_group'] = special_rules_groupc1585,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupc1585,
        codeStates['special_rules_groupc1585'] = special_rules_groupc1585Props,
        codeStates['setspecial_rules_groupc1585'] = setspecial_rules_groupc1585Props,
        codeStates['special_rules'] = special_rules1fc30,
        codeStates['setspecial_rules'] = setspecial_rules1fc30,
        codeStates['special_rules1fc30'] = special_rules1fc30Props,
        codeStates['setspecial_rules1fc30'] = setspecial_rules1fc30Props,
        codeStates['dynamicactions'] = dynamicactions37e34,
        codeStates['setdynamicactions'] = setdynamicactions37e34,
        codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
        codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,

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
        codeStates['add_case_group'] = add_case_group77747,
        codeStates['setadd_case_group'] = setadd_case_group77747,
        codeStates['add_case_group77747'] = add_case_group77747Props,
        codeStates['setadd_case_group77747'] = setadd_case_group77747Props,
        codeStates['header_group'] = header_groupbae8a,
        codeStates['setheader_group'] = setheader_groupbae8a,
        codeStates['header_groupbae8a'] = header_groupbae8aProps,
        codeStates['setheader_groupbae8a'] = setheader_groupbae8aProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group999a8,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group999a8,
        codeStates['required_dociument_main_group999a8'] = required_dociument_main_group999a8Props,
        codeStates['setrequired_dociument_main_group999a8'] = setrequired_dociument_main_group999a8Props,
        codeStates['doc_table'] = doc_table45b8d,
        codeStates['setdoc_table'] = setdoc_table45b8d,
        codeStates['doc_table45b8d'] = doc_table45b8dProps,
        codeStates['setdoc_table45b8d'] = setdoc_table45b8dProps,
        codeStates['case_information_group'] = case_information_group35ed3,
        codeStates['setcase_information_group'] = setcase_information_group35ed3,
        codeStates['case_information_group35ed3'] = case_information_group35ed3Props,
        codeStates['setcase_information_group35ed3'] = setcase_information_group35ed3Props,
        codeStates['case_info_text'] = case_info_text53524,
        codeStates['setcase_info_text'] = setcase_info_text53524,
        codeStates['debtor_name'] = debtor_namea603a,
        codeStates['setdebtor_name'] = setdebtor_namea603a,
        codeStates['case_display_id'] = case_display_id3ba0a,
        codeStates['setcase_display_id'] = setcase_display_id3ba0a,
        codeStates['ssn_masked'] = ssn_masked36fce,
        codeStates['setssn_masked'] = setssn_masked36fce,
        codeStates['dob'] = dob19a93,
        codeStates['setdob'] = setdob19a93,
        codeStates['address'] = address0e39e,
        codeStates['setaddress'] = setaddress0e39e,
        codeStates['creditor_name'] = creditor_name04ffa,
        codeStates['setcreditor_name'] = setcreditor_name04ffa,
        codeStates['charge_off_date'] = charge_off_datef5bba,
        codeStates['setcharge_off_date'] = setcharge_off_datef5bba,
        codeStates['last_payment_date'] = last_payment_date37076,
        codeStates['setlast_payment_date'] = setlast_payment_date37076,
        codeStates['divider'] = divider9cfd3,
        codeStates['setdivider'] = setdivider9cfd3,
        codeStates['card_group'] = card_groupe78fa,
        codeStates['setcard_group'] = setcard_groupe78fa,
        codeStates['card_groupe78fa'] = card_groupe78faProps,
        codeStates['setcard_groupe78fa'] = setcard_groupe78faProps,
        codeStates['principal_group'] = principal_group9ae9f,
        codeStates['setprincipal_group'] = setprincipal_group9ae9f,
        codeStates['principal_group9ae9f'] = principal_group9ae9fProps,
        codeStates['setprincipal_group9ae9f'] = setprincipal_group9ae9fProps,
        codeStates['intrest_group'] = intrest_group8df75,
        codeStates['setintrest_group'] = setintrest_group8df75,
        codeStates['intrest_group8df75'] = intrest_group8df75Props,
        codeStates['setintrest_group8df75'] = setintrest_group8df75Props,
        codeStates['fees_group'] = fees_groupac23b,
        codeStates['setfees_group'] = setfees_groupac23b,
        codeStates['fees_groupac23b'] = fees_groupac23bProps,
        codeStates['setfees_groupac23b'] = setfees_groupac23bProps,
        codeStates['total_group'] = total_groupe6175,
        codeStates['settotal_group'] = settotal_groupe6175,
        codeStates['total_groupe6175'] = total_groupe6175Props,
        codeStates['settotal_groupe6175'] = settotal_groupe6175Props,
        codeStates['sol_expiry_date'] = sol_expiry_date3775f,
        codeStates['setsol_expiry_date'] = setsol_expiry_date3775f,
        codeStates['venue_details_group'] = venue_details_group6904e,
        codeStates['setvenue_details_group'] = setvenue_details_group6904e,
        codeStates['venue_details_group6904e'] = venue_details_group6904eProps,
        codeStates['setvenue_details_group6904e'] = setvenue_details_group6904eProps,
        codeStates['checklist_main_group'] = checklist_main_groupda0ff,
        codeStates['setchecklist_main_group'] = setchecklist_main_groupda0ff,
        codeStates['checklist_main_groupda0ff'] = checklist_main_groupda0ffProps,
        codeStates['setchecklist_main_groupda0ff'] = setchecklist_main_groupda0ffProps,
        codeStates['checklist_table'] = checklist_table0e25b,
        codeStates['setchecklist_table'] = setchecklist_table0e25b,
        codeStates['checklist_table0e25b'] = checklist_table0e25bProps,
        codeStates['setchecklist_table0e25b'] = setchecklist_table0e25bProps,
        codeStates['special_rules_group'] = special_rules_groupc1585,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupc1585,
        codeStates['special_rules_groupc1585'] = special_rules_groupc1585Props,
        codeStates['setspecial_rules_groupc1585'] = setspecial_rules_groupc1585Props,
        codeStates['special_rules'] = special_rules1fc30,
        codeStates['setspecial_rules'] = setspecial_rules1fc30,
        codeStates['special_rules1fc30'] = special_rules1fc30Props,
        codeStates['setspecial_rules1fc30'] = setspecial_rules1fc30Props,
        codeStates['dynamicactions'] = dynamicactions37e34,
        codeStates['setdynamicactions'] = setdynamicactions37e34,
        codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
        codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const case_information_group35ed3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    case_information_group35ed3Ref.current?.setSearchParams();
    case_information_group35ed3Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(case_information_group35ed3) && Object.keys(case_information_group35ed3)?.length>0)
      {
        setcase_information_group35ed3({})
      }
    }else 
      prevRefreshRef.current= true
  }, [case_information_group35ed3Props?.refresh,token])


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
          setamrcaseapproval_v1((pre:any)=>({...pre,_selectedGroup_:"case_information_group"}))
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
          {allowedControls.includes("case_info_text") ?<Textcase_info_text   /* 53524 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("debtor_name") ?<TextInputdebtor_name   /* a603a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("case_display_id") ?<TextInputcase_display_id   /* 3ba0a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ssn_masked") ?<TextInputssn_masked   /* 36fce */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dob") ?<DatePickerdob   /* 19a93 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("address") ?<TextAreaaddress   /* 0e39e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("creditor_name") ?<TextInputcreditor_name   /* 04ffa */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("charge_off_date") ?<DatePickercharge_off_date   /* f5bba */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("last_payment_date") ?<DatePickerlast_payment_date   /* 37076 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 9cfd3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sol_expiry_date") ?<DatePickersol_expiry_date   /* 3775f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcase_information_group
