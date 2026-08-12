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
import Iconwarning_icon  from "./Iconwarning_icon";
import Textrule_text  from "./Textrule_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupspecial_rules = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "warning_icon",
      "rule_text"
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
      "warning_icon",
      "rule_text"
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
  const {warning_icon83e9f, setwarning_icon83e9f}= useContext(TotalContext) as TotalContextProps;
  const {rule_texta87d5, setrule_texta87d5}= useContext(TotalContext) as TotalContextProps;
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
    'GroupSpecialRules',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a02965c02b6ed5adb563fc6ff101fc30");
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
    setspecial_rules1fc30Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("warning_icon")){
        setwarning_icon83e9f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(warning_icon83e9f?.isDisabled==null)
      {
        setwarning_icon83e9f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_text")){
        setrule_texta87d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(rule_texta87d5?.isDisabled==null)
      {
        setrule_texta87d5((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['warning_icon'] = warning_icon83e9f,
        codeStates['setwarning_icon'] = setwarning_icon83e9f,
        codeStates['rule_text'] = rule_texta87d5,
        codeStates['setrule_text'] = setrule_texta87d5,
        codeStates['dynamicactions'] = dynamicactions37e34,
        codeStates['setdynamicactions'] = setdynamicactions37e34,
        codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
        codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,

    codeExecution(code,codeStates);
    } 
    if(dfd_venuespecialrules_v1Props?.hasLogicCenter==false  && dfd_venuespecialrules_v1Props?.dstKey!="")
    {
      const api_paginationBody: api_paginationDto = {
        key: dfd_venuespecialrules_v1Props?.dstKey,
        count:10,
        page: 1
      }
      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        api_paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (api_paginationData?.data?.error == true) {
        toast(api_paginationData?.data?.errorDetails?.message, 'danger')
        return
      }
      setdfd_venuespecialrules_v1Props(api_paginationData?.data?.records || []);
    }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
      setSelectedIdx(selectedIndex);
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
        codeStates['warning_icon'] = warning_icon83e9f,
        codeStates['setwarning_icon'] = setwarning_icon83e9f,
        codeStates['rule_text'] = rule_texta87d5,
        codeStates['setrule_text'] = setrule_texta87d5,
        codeStates['dynamicactions'] = dynamicactions37e34,
        codeStates['setdynamicactions'] = setdynamicactions37e34,
        codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
        codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const special_rules1fc30Ref = useRef<any>(null);
  const handleClearSearch = () => {
    special_rules1fc30Ref.current?.setSearchParams();
    special_rules1fc30Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(special_rules1fc30) && Object.keys(special_rules1fc30)?.length>0)
      {
        setspecial_rules1fc30({})
      }
    }else 
      prevRefreshRef.current= true
  }, [special_rules1fc30Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
return (
<>
  {Array.isArray(dfd_venuespecialrules_v1Props) && dfd_venuespecialrules_v1Props.map((item: any, idx: number) => {
  return (
    <div key={idx}
      style={{          
        gridRow: 'span 23', 
        gridColumn: 'span 24',  
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '4px',
        backgroundColor:'#fdf3dd',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col rounded-md !overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-[var(--hover-color)] !p-2 ${isDark ? 'text-white' : 'text-black'} ${selectedIdx === idx ? 'shadow-lg scale-[1.02] bg-[var(--hover-color)] outline outline-2 outline-blue-500' : ''}`}
      onClick={(e:any)=>{
        e.stopPropagation();
        handleOnClick(item, idx);
          setamrcaseapproval_v1((pre:any)=>({...pre,_selectedGroup_:"special_rules"+idx}))
      }}
    >
        {allowedControls.includes("warning_icon")?<Iconwarning_icon /* 83e9f */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("rule_text") ?<Textrule_text   /* a87d5 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
  )
  })}
  </>
 )
}

export default Groupspecial_rules
