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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
      "dynamicactions"
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
      "compensation_benfits_group",
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
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text8d8fc, setstaffing_compensation_text8d8fc}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min6aa6e, setsalary_range_min6aa6e}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxebe1d, setsalary_range_maxebe1d}= useContext(TotalContext) as TotalContextProps;
  const {headcount5aefa, setheadcount5aefa}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount42f81, setapproved_headcount42f81}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount049fc, setfilled_headcount049fc}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status989f7, setvacancy_status989f7}= useContext(TotalContext) as TotalContextProps;
  const {remote_allowed76541, setremote_allowed76541}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredfe60a, settravel_requiredfe60a}= useContext(TotalContext) as TotalContextProps;
  const {is_open18094, setis_open18094}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addemployeejobposition_v1, setaddemployeejobposition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobPosition:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f1469b256669687453aa33ae83eb46e6");
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
    setcompensation_benfits_groupb46e6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("staffing_compensation_text")){
        setstaffing_compensation_text8d8fc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(staffing_compensation_text8d8fc?.isDisabled==null)
      {
        setstaffing_compensation_text8d8fc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range_min")){
        setsalary_range_min6aa6e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range_min6aa6e?.isDisabled==null)
      {
        setsalary_range_min6aa6e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range_max")){
        setsalary_range_maxebe1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range_maxebe1d?.isDisabled==null)
      {
        setsalary_range_maxebe1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("headcount")){
        setheadcount5aefa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(headcount5aefa?.isDisabled==null)
      {
        setheadcount5aefa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approved_headcount")){
        setapproved_headcount42f81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approved_headcount42f81?.isDisabled==null)
      {
        setapproved_headcount42f81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("filled_headcount")){
        setfilled_headcount049fc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(filled_headcount049fc?.isDisabled==null)
      {
        setfilled_headcount049fc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vacancy_status")){
        setvacancy_status989f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(vacancy_status989f7?.isDisabled==null)
      {
        setvacancy_status989f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("remote_allowed")){
        setremote_allowed76541((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(remote_allowed76541?.isDisabled==null)
      {
        setremote_allowed76541((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("travel_required")){
        settravel_requiredfe60a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(travel_requiredfe60a?.isDisabled==null)
      {
        settravel_requiredfe60a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_open")){
        setis_open18094((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(is_open18094?.isDisabled==null)
      {
        setis_open18094((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupae38a,
        codeStates['setoverall_group'] = setoverall_groupae38a,
        codeStates['overall_groupae38a'] = overall_groupae38aProps,
        codeStates['setoverall_groupae38a'] = setoverall_groupae38aProps,
        codeStates['position_information_group'] = position_information_group5335b,
        codeStates['setposition_information_group'] = setposition_information_group5335b,
        codeStates['position_information_group5335b'] = position_information_group5335bProps,
        codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['staffing_compensation_text'] = staffing_compensation_text8d8fc,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text8d8fc,
        codeStates['salary_range_min'] = salary_range_min6aa6e,
        codeStates['setsalary_range_min'] = setsalary_range_min6aa6e,
        codeStates['salary_range_max'] = salary_range_maxebe1d,
        codeStates['setsalary_range_max'] = setsalary_range_maxebe1d,
        codeStates['headcount'] = headcount5aefa,
        codeStates['setheadcount'] = setheadcount5aefa,
        codeStates['approved_headcount'] = approved_headcount42f81,
        codeStates['setapproved_headcount'] = setapproved_headcount42f81,
        codeStates['filled_headcount'] = filled_headcount049fc,
        codeStates['setfilled_headcount'] = setfilled_headcount049fc,
        codeStates['vacancy_status'] = vacancy_status989f7,
        codeStates['setvacancy_status'] = setvacancy_status989f7,
        codeStates['remote_allowed'] = remote_allowed76541,
        codeStates['setremote_allowed'] = setremote_allowed76541,
        codeStates['travel_required'] = travel_requiredfe60a,
        codeStates['settravel_required'] = settravel_requiredfe60a,
        codeStates['is_open'] = is_open18094,
        codeStates['setis_open'] = setis_open18094,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,

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
        codeStates['overall_group'] = overall_groupae38a,
        codeStates['setoverall_group'] = setoverall_groupae38a,
        codeStates['overall_groupae38a'] = overall_groupae38aProps,
        codeStates['setoverall_groupae38a'] = setoverall_groupae38aProps,
        codeStates['position_information_group'] = position_information_group5335b,
        codeStates['setposition_information_group'] = setposition_information_group5335b,
        codeStates['position_information_group5335b'] = position_information_group5335bProps,
        codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['staffing_compensation_text'] = staffing_compensation_text8d8fc,
        codeStates['setstaffing_compensation_text'] = setstaffing_compensation_text8d8fc,
        codeStates['salary_range_min'] = salary_range_min6aa6e,
        codeStates['setsalary_range_min'] = setsalary_range_min6aa6e,
        codeStates['salary_range_max'] = salary_range_maxebe1d,
        codeStates['setsalary_range_max'] = setsalary_range_maxebe1d,
        codeStates['headcount'] = headcount5aefa,
        codeStates['setheadcount'] = setheadcount5aefa,
        codeStates['approved_headcount'] = approved_headcount42f81,
        codeStates['setapproved_headcount'] = setapproved_headcount42f81,
        codeStates['filled_headcount'] = filled_headcount049fc,
        codeStates['setfilled_headcount'] = setfilled_headcount049fc,
        codeStates['vacancy_status'] = vacancy_status989f7,
        codeStates['setvacancy_status'] = setvacancy_status989f7,
        codeStates['remote_allowed'] = remote_allowed76541,
        codeStates['setremote_allowed'] = setremote_allowed76541,
        codeStates['travel_required'] = travel_requiredfe60a,
        codeStates['settravel_required'] = settravel_requiredfe60a,
        codeStates['is_open'] = is_open18094,
        codeStates['setis_open'] = setis_open18094,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compensation_benfits_groupb46e6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    compensation_benfits_groupb46e6Ref.current?.setSearchParams();
    compensation_benfits_groupb46e6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compensation_benfits_groupb46e6) && Object.keys(compensation_benfits_groupb46e6)?.length>0)
      {
        setcompensation_benfits_groupb46e6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compensation_benfits_groupb46e6Props?.refresh,token])


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
          setaddemployeejobposition_v1((pre:any)=>({...pre,_selectedGroup_:"compensation_benfits_group"}))
        }}
    >
          {allowedControls.includes("staffing_compensation_text") ?<Textstaffing_compensation_text   /* 8d8fc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salary_range_min") ?<TextInputsalary_range_min   /* 6aa6e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("salary_range_max") ?<TextInputsalary_range_max   /* ebe1d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("headcount") ?<TextInputheadcount   /* 5aefa */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("approved_headcount") ?<TextInputapproved_headcount   /* 42f81 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("filled_headcount") ?<TextInputfilled_headcount   /* 049fc */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("vacancy_status") ?<Dropdownvacancy_status   /* 989f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("remote_allowed")?<Switchremote_allowed  /* 76541 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("travel_required")?<Switchtravel_required  /* fe60a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_open")?<Switchis_open  /* 18094 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompensation_benfits_group
