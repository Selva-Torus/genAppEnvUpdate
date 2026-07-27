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
import Textstaffing_compensation_text  from "./Textstaffing_compensation_text";
import TextInputsalary_range_min  from "./TextInputsalary_range_min";
import TextInputsalary_range_max  from "./TextInputsalary_range_max";
import TextInputheadcount  from "./TextInputheadcount";
import TextInputapproved_headcount  from "./TextInputapproved_headcount";
import TextInputfilled_headcount  from "./TextInputfilled_headcount";
import Dropdownvacancy_status  from "./Dropdownvacancy_status";
import Switchremote_allowed  from "./Switchremote_allowed";
import Switchtravel_required  from "./Switchtravel_required";
import Switchis_open  from "./Switchis_open";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcompensation_benfits_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_employmenttypecombo_v1Props, setdfd_employmenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vacancystatuscombo_v1Props, setdfd_vacancystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradenamecombo_v1Props, setdfd_gradenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_jobpositions_v1Props, setdfd_jobpositions_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "staffing_compensation_text",
      "salary_range_min",
      "salary_range_max",
      "headcount",
      "approved_headcount",
      "filled_headcount",
      "vacancy_status",
      "remote_allowed",
      "travel_required",
      "is_open"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "position_information_group",
      "compensation_benfits_group"
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
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text16f4a, setstaffing_compensation_text16f4a}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min31c0f, setsalary_range_min31c0f}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxb8794, setsalary_range_maxb8794}= useContext(TotalContext) as TotalContextProps;
  const {headcount4c5a4, setheadcount4c5a4}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount53c3b, setapproved_headcount53c3b}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount35c2c, setfilled_headcount35c2c}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status83fc0, setvacancy_status83fc0}= useContext(TotalContext) as TotalContextProps;
  const {remote_alloweda2944, setremote_alloweda2944}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredee204, settravel_requiredee204}= useContext(TotalContext) as TotalContextProps;
  const {is_open9bbae, setis_open9bbae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewemployeejobposition_v1, setviewemployeejobposition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobPosition:AFVK:v1',
    [user],
    'GroupCompensationBenfitsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2a5944178febfa18e4be375d2920d8fe");
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
    setcompensation_benfits_group0d8feProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("staffing_compensation_text")){
        setstaffing_compensation_text16f4a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(staffing_compensation_text16f4a?.isDisabled==null)
      {
        setstaffing_compensation_text16f4a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range_min")){
        setsalary_range_min31c0f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range_min31c0f?.isDisabled==null)
      {
        setsalary_range_min31c0f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range_max")){
        setsalary_range_maxb8794((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range_maxb8794?.isDisabled==null)
      {
        setsalary_range_maxb8794((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("headcount")){
        setheadcount4c5a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(headcount4c5a4?.isDisabled==null)
      {
        setheadcount4c5a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approved_headcount")){
        setapproved_headcount53c3b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approved_headcount53c3b?.isDisabled==null)
      {
        setapproved_headcount53c3b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("filled_headcount")){
        setfilled_headcount35c2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(filled_headcount35c2c?.isDisabled==null)
      {
        setfilled_headcount35c2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vacancy_status")){
        setvacancy_status83fc0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(vacancy_status83fc0?.isDisabled==null)
      {
        setvacancy_status83fc0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("remote_allowed")){
        setremote_alloweda2944((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(remote_alloweda2944?.isDisabled==null)
      {
        setremote_alloweda2944((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("travel_required")){
        settravel_requiredee204((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(travel_requiredee204?.isDisabled==null)
      {
        settravel_requiredee204((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_open")){
        setis_open9bbae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(is_open9bbae?.isDisabled==null)
      {
        setis_open9bbae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['staffing_compensation_text'] = staffing_compensation_text16f4a,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text16f4a,
        codeStates['salary_range_min'] = salary_range_min31c0f,
        codeStates['setsalary_range_min'] = setsalary_range_min31c0f,
        codeStates['salary_range_max'] = salary_range_maxb8794,
        codeStates['setsalary_range_max'] = setsalary_range_maxb8794,
        codeStates['headcount'] = headcount4c5a4,
        codeStates['setheadcount'] = setheadcount4c5a4,
        codeStates['approved_headcount'] = approved_headcount53c3b,
        codeStates['setapproved_headcount'] = setapproved_headcount53c3b,
        codeStates['filled_headcount'] = filled_headcount35c2c,
        codeStates['setfilled_headcount'] = setfilled_headcount35c2c,
        codeStates['vacancy_status'] = vacancy_status83fc0,
        codeStates['setvacancy_status'] = setvacancy_status83fc0,
        codeStates['remote_allowed'] = remote_alloweda2944,
        codeStates['setremote_allowed'] = setremote_alloweda2944,
        codeStates['travel_required'] = travel_requiredee204,
        codeStates['settravel_required'] = settravel_requiredee204,
        codeStates['is_open'] = is_open9bbae,
        codeStates['setis_open'] = setis_open9bbae,

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
        codeStates['overall_group'] = overall_group2c693,
        codeStates['setoverall_group'] = setoverall_group2c693,
        codeStates['overall_group2c693'] = overall_group2c693Props,
        codeStates['setoverall_group2c693'] = setoverall_group2c693Props,
        codeStates['position_information_group'] = position_information_group67802,
        codeStates['setposition_information_group'] = setposition_information_group67802,
        codeStates['position_information_group67802'] = position_information_group67802Props,
        codeStates['setposition_information_group67802'] = setposition_information_group67802Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
        codeStates['staffing_compensation_text'] = staffing_compensation_text16f4a,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text16f4a,
        codeStates['salary_range_min'] = salary_range_min31c0f,
        codeStates['setsalary_range_min'] = setsalary_range_min31c0f,
        codeStates['salary_range_max'] = salary_range_maxb8794,
        codeStates['setsalary_range_max'] = setsalary_range_maxb8794,
        codeStates['headcount'] = headcount4c5a4,
        codeStates['setheadcount'] = setheadcount4c5a4,
        codeStates['approved_headcount'] = approved_headcount53c3b,
        codeStates['setapproved_headcount'] = setapproved_headcount53c3b,
        codeStates['filled_headcount'] = filled_headcount35c2c,
        codeStates['setfilled_headcount'] = setfilled_headcount35c2c,
        codeStates['vacancy_status'] = vacancy_status83fc0,
        codeStates['setvacancy_status'] = setvacancy_status83fc0,
        codeStates['remote_allowed'] = remote_alloweda2944,
        codeStates['setremote_allowed'] = setremote_alloweda2944,
        codeStates['travel_required'] = travel_requiredee204,
        codeStates['settravel_required'] = settravel_requiredee204,
        codeStates['is_open'] = is_open9bbae,
        codeStates['setis_open'] = setis_open9bbae,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compensation_benfits_group0d8feRef = useRef<any>(null);
  const handleClearSearch = () => {
    compensation_benfits_group0d8feRef.current?.setSearchParams();
    compensation_benfits_group0d8feRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compensation_benfits_group0d8fe) && Object.keys(compensation_benfits_group0d8fe)?.length>0)
      {
        setcompensation_benfits_group0d8fe({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compensation_benfits_group0d8feProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '42 / 83',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewemployeejobposition_v1((pre:any)=>({...pre,_selectedGroup_:"compensation_benfits_group"}))
        }}
    >
          {allowedControls.includes("staffing_compensation_text") ?<Textstaffing_compensation_text   /* 16f4a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salary_range_min") ?<TextInputsalary_range_min   /* 31c0f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salary_range_max") ?<TextInputsalary_range_max   /* b8794 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("headcount") ?<TextInputheadcount   /* 4c5a4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approved_headcount") ?<TextInputapproved_headcount   /* 53c3b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("filled_headcount") ?<TextInputfilled_headcount   /* 35c2c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vacancy_status") ?<Dropdownvacancy_status   /* 83fc0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("remote_allowed")?<Switchremote_allowed  /* a2944 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("travel_required")?<Switchtravel_required  /* ee204 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_open")?<Switchis_open  /* 9bbae */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompensation_benfits_group
