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
import Groupchecklist_table  from "../Groupchecklist_table/Groupchecklist_table";
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
import Textvalid_checklist_text  from "./Textvalid_checklist_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupchecklist_main_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "valid_checklist_text"
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
      "valid_checklist_text"
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
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_checklist_texta0e64, setvalid_checklist_texta0e64}= useContext(TotalContext) as TotalContextProps;
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
    'GroupChecklistMainGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ab92acc97fd875f8d708d5f6d922b466");
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
    setchecklist_main_group2b466Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("valid_checklist_text")){
        setvalid_checklist_texta0e64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(valid_checklist_texta0e64?.isDisabled==null)
      {
        setvalid_checklist_texta0e64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("checklist_table")){
        setchecklist_tablecafb0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(checklist_tablecafb0?.isDisabled==null)
      {
        setchecklist_tablecafb0((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['valid_checklist_text'] = valid_checklist_texta0e64,
        codeStates['setvalid_checklist_text'] = setvalid_checklist_texta0e64,
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
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['valid_checklist_text'] = valid_checklist_texta0e64,
        codeStates['setvalid_checklist_text'] = setvalid_checklist_texta0e64,
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


  const checklist_main_group2b466Ref = useRef<any>(null);
  const handleClearSearch = () => {
    checklist_main_group2b466Ref.current?.setSearchParams();
    checklist_main_group2b466Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(checklist_main_group2b466) && Object.keys(checklist_main_group2b466)?.length>0)
      {
        setchecklist_main_group2b466({})
      }
    }else 
      prevRefreshRef.current= true
  }, [checklist_main_group2b466Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '9 / 19',
        gridRow: '131 / 252',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7',
        backgroundColor:'#f4f5fa',
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
          setviewamrcasepggraph_v1((pre:any)=>({...pre,_selectedGroup_:"checklist_main_group"}))
        }}
    >
        {allowedComponent.includes("checklist_table")  &&<Groupchecklist_table  
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
          {allowedControls.includes("valid_checklist_text") ?<Textvalid_checklist_text   /* a0e64 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupchecklist_main_group
