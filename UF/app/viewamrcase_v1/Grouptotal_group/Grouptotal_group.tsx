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
import Texttotal_balance_text  from "./Texttotal_balance_text";
import Texttotal_balance  from "./Texttotal_balance";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "total_balance_text",
      "total_balance"
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
      "total_balance_text",
      "total_balance"
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
  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps;
  const {total_balance_texted1be, settotal_balance_texted1be}= useContext(TotalContext) as TotalContextProps;
  const {total_balancee5904, settotal_balancee5904}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewamrcase_v1, setviewamrcase_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCase:AFVK:v1',
    [user],
    'GroupTotalGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5c022bb004f44c939ce295f6c73d3e06");
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
    settotal_groupd3e06Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("total_balance_text")){
        settotal_balance_texted1be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_balance_texted1be?.isDisabled==null)
      {
        settotal_balance_texted1be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_balance")){
        settotal_balancee5904((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_balancee5904?.isDisabled==null)
      {
        settotal_balancee5904((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_groupbe1de,
        codeStates['setadd_case_group'] = setadd_case_groupbe1de,
        codeStates['add_case_groupbe1de'] = add_case_groupbe1deProps,
        codeStates['setadd_case_groupbe1de'] = setadd_case_groupbe1deProps,
        codeStates['header_group'] = header_groupc587e,
        codeStates['setheader_group'] = setheader_groupc587e,
        codeStates['header_groupc587e'] = header_groupc587eProps,
        codeStates['setheader_groupc587e'] = setheader_groupc587eProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
        codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
        codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
        codeStates['doc_table'] = doc_table8bfa1,
        codeStates['setdoc_table'] = setdoc_table8bfa1,
        codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
        codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
        codeStates['case_information_group'] = case_information_groupe3c1b,
        codeStates['setcase_information_group'] = setcase_information_groupe3c1b,
        codeStates['case_information_groupe3c1b'] = case_information_groupe3c1bProps,
        codeStates['setcase_information_groupe3c1b'] = setcase_information_groupe3c1bProps,
        codeStates['card_group'] = card_group7fa83,
        codeStates['setcard_group'] = setcard_group7fa83,
        codeStates['card_group7fa83'] = card_group7fa83Props,
        codeStates['setcard_group7fa83'] = setcard_group7fa83Props,
        codeStates['principal_group'] = principal_groupde6dd,
        codeStates['setprincipal_group'] = setprincipal_groupde6dd,
        codeStates['principal_groupde6dd'] = principal_groupde6ddProps,
        codeStates['setprincipal_groupde6dd'] = setprincipal_groupde6ddProps,
        codeStates['intrest_group'] = intrest_group44b4d,
        codeStates['setintrest_group'] = setintrest_group44b4d,
        codeStates['intrest_group44b4d'] = intrest_group44b4dProps,
        codeStates['setintrest_group44b4d'] = setintrest_group44b4dProps,
        codeStates['fees_group'] = fees_groupee523,
        codeStates['setfees_group'] = setfees_groupee523,
        codeStates['fees_groupee523'] = fees_groupee523Props,
        codeStates['setfees_groupee523'] = setfees_groupee523Props,
        codeStates['total_group'] = total_groupd3e06,
        codeStates['settotal_group'] = settotal_groupd3e06,
        codeStates['total_groupd3e06'] = total_groupd3e06Props,
        codeStates['settotal_groupd3e06'] = settotal_groupd3e06Props,
        codeStates['total_balance_text'] = total_balance_texted1be,
        codeStates['settotal_balance_text'] = settotal_balance_texted1be,
        codeStates['total_balance'] = total_balancee5904,
        codeStates['settotal_balance'] = settotal_balancee5904,
        codeStates['venue_details_group'] = venue_details_group1d734,
        codeStates['setvenue_details_group'] = setvenue_details_group1d734,
        codeStates['venue_details_group1d734'] = venue_details_group1d734Props,
        codeStates['setvenue_details_group1d734'] = setvenue_details_group1d734Props,
        codeStates['checklist_main_group'] = checklist_main_group32240,
        codeStates['setchecklist_main_group'] = setchecklist_main_group32240,
        codeStates['checklist_main_group32240'] = checklist_main_group32240Props,
        codeStates['setchecklist_main_group32240'] = setchecklist_main_group32240Props,
        codeStates['checklist_table'] = checklist_tablee7dea,
        codeStates['setchecklist_table'] = setchecklist_tablee7dea,
        codeStates['checklist_tablee7dea'] = checklist_tablee7deaProps,
        codeStates['setchecklist_tablee7dea'] = setchecklist_tablee7deaProps,
        codeStates['special_rules_group'] = special_rules_groupf22ab,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupf22ab,
        codeStates['special_rules_groupf22ab'] = special_rules_groupf22abProps,
        codeStates['setspecial_rules_groupf22ab'] = setspecial_rules_groupf22abProps,
        codeStates['special_rules'] = special_rules96aec,
        codeStates['setspecial_rules'] = setspecial_rules96aec,
        codeStates['special_rules96aec'] = special_rules96aecProps,
        codeStates['setspecial_rules96aec'] = setspecial_rules96aecProps,

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
        codeStates['add_case_group'] = add_case_groupbe1de,
        codeStates['setadd_case_group'] = setadd_case_groupbe1de,
        codeStates['add_case_groupbe1de'] = add_case_groupbe1deProps,
        codeStates['setadd_case_groupbe1de'] = setadd_case_groupbe1deProps,
        codeStates['header_group'] = header_groupc587e,
        codeStates['setheader_group'] = setheader_groupc587e,
        codeStates['header_groupc587e'] = header_groupc587eProps,
        codeStates['setheader_groupc587e'] = setheader_groupc587eProps,
        codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
        codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
        codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
        codeStates['doc_table'] = doc_table8bfa1,
        codeStates['setdoc_table'] = setdoc_table8bfa1,
        codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
        codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
        codeStates['case_information_group'] = case_information_groupe3c1b,
        codeStates['setcase_information_group'] = setcase_information_groupe3c1b,
        codeStates['case_information_groupe3c1b'] = case_information_groupe3c1bProps,
        codeStates['setcase_information_groupe3c1b'] = setcase_information_groupe3c1bProps,
        codeStates['card_group'] = card_group7fa83,
        codeStates['setcard_group'] = setcard_group7fa83,
        codeStates['card_group7fa83'] = card_group7fa83Props,
        codeStates['setcard_group7fa83'] = setcard_group7fa83Props,
        codeStates['principal_group'] = principal_groupde6dd,
        codeStates['setprincipal_group'] = setprincipal_groupde6dd,
        codeStates['principal_groupde6dd'] = principal_groupde6ddProps,
        codeStates['setprincipal_groupde6dd'] = setprincipal_groupde6ddProps,
        codeStates['intrest_group'] = intrest_group44b4d,
        codeStates['setintrest_group'] = setintrest_group44b4d,
        codeStates['intrest_group44b4d'] = intrest_group44b4dProps,
        codeStates['setintrest_group44b4d'] = setintrest_group44b4dProps,
        codeStates['fees_group'] = fees_groupee523,
        codeStates['setfees_group'] = setfees_groupee523,
        codeStates['fees_groupee523'] = fees_groupee523Props,
        codeStates['setfees_groupee523'] = setfees_groupee523Props,
        codeStates['total_group'] = total_groupd3e06,
        codeStates['settotal_group'] = settotal_groupd3e06,
        codeStates['total_groupd3e06'] = total_groupd3e06Props,
        codeStates['settotal_groupd3e06'] = settotal_groupd3e06Props,
        codeStates['total_balance_text'] = total_balance_texted1be,
        codeStates['settotal_balance_text'] = settotal_balance_texted1be,
        codeStates['total_balance'] = total_balancee5904,
        codeStates['settotal_balance'] = settotal_balancee5904,
        codeStates['venue_details_group'] = venue_details_group1d734,
        codeStates['setvenue_details_group'] = setvenue_details_group1d734,
        codeStates['venue_details_group1d734'] = venue_details_group1d734Props,
        codeStates['setvenue_details_group1d734'] = setvenue_details_group1d734Props,
        codeStates['checklist_main_group'] = checklist_main_group32240,
        codeStates['setchecklist_main_group'] = setchecklist_main_group32240,
        codeStates['checklist_main_group32240'] = checklist_main_group32240Props,
        codeStates['setchecklist_main_group32240'] = setchecklist_main_group32240Props,
        codeStates['checklist_table'] = checklist_tablee7dea,
        codeStates['setchecklist_table'] = setchecklist_tablee7dea,
        codeStates['checklist_tablee7dea'] = checklist_tablee7deaProps,
        codeStates['setchecklist_tablee7dea'] = setchecklist_tablee7deaProps,
        codeStates['special_rules_group'] = special_rules_groupf22ab,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupf22ab,
        codeStates['special_rules_groupf22ab'] = special_rules_groupf22abProps,
        codeStates['setspecial_rules_groupf22ab'] = setspecial_rules_groupf22abProps,
        codeStates['special_rules'] = special_rules96aec,
        codeStates['setspecial_rules'] = setspecial_rules96aec,
        codeStates['special_rules96aec'] = special_rules96aecProps,
        codeStates['setspecial_rules96aec'] = setspecial_rules96aecProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_groupd3e06Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_groupd3e06Ref.current?.setSearchParams();
    total_groupd3e06Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_groupd3e06) && Object.keys(total_groupd3e06)?.length>0)
      {
        settotal_groupd3e06({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_groupd3e06Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '19 / 25',
        gridRow: '3 / 21',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#e2e5ee',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-xl ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewamrcase_v1((pre:any)=>({...pre,_selectedGroup_:"total_group"}))
        }}
    >
          {allowedControls.includes("total_balance_text") ?<Texttotal_balance_text   /* ed1be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("total_balance") ?<Texttotal_balance   /* e5904 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptotal_group
