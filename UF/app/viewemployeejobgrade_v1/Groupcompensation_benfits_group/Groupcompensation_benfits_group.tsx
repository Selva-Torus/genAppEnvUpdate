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
import Textcategory_configuration_text  from "./Textcategory_configuration_text";
import TextInputmin_salary  from "./TextInputmin_salary";
import TextInputmax_salary  from "./TextInputmax_salary";
import Dropdowncurrency  from "./Dropdowncurrency";
import TextInputbonus_percentage  from "./TextInputbonus_percentage";
import Switchpromotion_eligible  from "./Switchpromotion_eligible";
import Switchovertime_eligible  from "./Switchovertime_eligible";
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
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_appraisalcyclecombo_v1Props, setdfd_appraisalcyclecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "category_configuration_text",
      "min_salary",
      "max_salary",
      "currency",
      "bonus_percentage",
      "promotion_eligible",
      "overtime_eligible"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "grade_information_group",
      "compensation_benfits_group",
      "hr_policies_group"
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
  const {overall_group926e0, setoverall_group926e0}= useContext(TotalContext) as TotalContextProps;
  const {overall_group926e0Props, setoverall_group926e0Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8, setgrade_information_group162a8}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_group162a8Props, setgrade_information_group162a8Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044d, setcompensation_benfits_groupa044d}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupa044dProps, setcompensation_benfits_groupa044dProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text0f4bd, setcategory_configuration_text0f4bd}= useContext(TotalContext) as TotalContextProps;
  const {min_salary22457, setmin_salary22457}= useContext(TotalContext) as TotalContextProps;
  const {max_salary4199f, setmax_salary4199f}= useContext(TotalContext) as TotalContextProps;
  const {currencyd61f7, setcurrencyd61f7}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentagec00a0, setbonus_percentagec00a0}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible28dff, setpromotion_eligible28dff}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligiblee49e9, setovertime_eligiblee49e9}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79, sethr_policies_groupa0e79}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_groupa0e79Props, sethr_policies_groupa0e79Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewemployeejobgrade_v1, setviewemployeejobgrade_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewEmployeeJobGrade:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ff5ef8668484fc5fdc076b33084a044d");
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
    setcompensation_benfits_groupa044dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("category_configuration_text")){
        setcategory_configuration_text0f4bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(category_configuration_text0f4bd?.isDisabled==null)
      {
        setcategory_configuration_text0f4bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("min_salary")){
        setmin_salary22457((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(min_salary22457?.isDisabled==null)
      {
        setmin_salary22457((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_salary")){
        setmax_salary4199f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(max_salary4199f?.isDisabled==null)
      {
        setmax_salary4199f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency")){
        setcurrencyd61f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(currencyd61f7?.isDisabled==null)
      {
        setcurrencyd61f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bonus_percentage")){
        setbonus_percentagec00a0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bonus_percentagec00a0?.isDisabled==null)
      {
        setbonus_percentagec00a0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("promotion_eligible")){
        setpromotion_eligible28dff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(promotion_eligible28dff?.isDisabled==null)
      {
        setpromotion_eligible28dff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("overtime_eligible")){
        setovertime_eligiblee49e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(overtime_eligiblee49e9?.isDisabled==null)
      {
        setovertime_eligiblee49e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group926e0,
        codeStates['setoverall_group'] = setoverall_group926e0,
        codeStates['overall_group926e0'] = overall_group926e0Props,
        codeStates['setoverall_group926e0'] = setoverall_group926e0Props,
        codeStates['grade_information_group'] = grade_information_group162a8,
        codeStates['setgrade_information_group'] = setgrade_information_group162a8,
        codeStates['grade_information_group162a8'] = grade_information_group162a8Props,
        codeStates['setgrade_information_group162a8'] = setgrade_information_group162a8Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupa044d,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupa044d,
        codeStates['compensation_benfits_groupa044d'] = compensation_benfits_groupa044dProps,
        codeStates['setcompensation_benfits_groupa044d'] = setcompensation_benfits_groupa044dProps,
        codeStates['category_configuration_text'] = category_configuration_text0f4bd,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text0f4bd,
        codeStates['min_salary'] = min_salary22457,
        codeStates['setmin_salary'] = setmin_salary22457,
        codeStates['max_salary'] = max_salary4199f,
        codeStates['setmax_salary'] = setmax_salary4199f,
        codeStates['currency'] = currencyd61f7,
        codeStates['setcurrency'] = setcurrencyd61f7,
        codeStates['bonus_percentage'] = bonus_percentagec00a0,
        codeStates['setbonus_percentage'] = setbonus_percentagec00a0,
        codeStates['promotion_eligible'] = promotion_eligible28dff,
        codeStates['setpromotion_eligible'] = setpromotion_eligible28dff,
        codeStates['overtime_eligible'] = overtime_eligiblee49e9,
        codeStates['setovertime_eligible'] = setovertime_eligiblee49e9,
        codeStates['hr_policies_group'] = hr_policies_groupa0e79,
        codeStates['sethr_policies_group'] = sethr_policies_groupa0e79,
        codeStates['hr_policies_groupa0e79'] = hr_policies_groupa0e79Props,
        codeStates['sethr_policies_groupa0e79'] = sethr_policies_groupa0e79Props,

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
        codeStates['overall_group'] = overall_group926e0,
        codeStates['setoverall_group'] = setoverall_group926e0,
        codeStates['overall_group926e0'] = overall_group926e0Props,
        codeStates['setoverall_group926e0'] = setoverall_group926e0Props,
        codeStates['grade_information_group'] = grade_information_group162a8,
        codeStates['setgrade_information_group'] = setgrade_information_group162a8,
        codeStates['grade_information_group162a8'] = grade_information_group162a8Props,
        codeStates['setgrade_information_group162a8'] = setgrade_information_group162a8Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupa044d,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupa044d,
        codeStates['compensation_benfits_groupa044d'] = compensation_benfits_groupa044dProps,
        codeStates['setcompensation_benfits_groupa044d'] = setcompensation_benfits_groupa044dProps,
        codeStates['category_configuration_text'] = category_configuration_text0f4bd,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text0f4bd,
        codeStates['min_salary'] = min_salary22457,
        codeStates['setmin_salary'] = setmin_salary22457,
        codeStates['max_salary'] = max_salary4199f,
        codeStates['setmax_salary'] = setmax_salary4199f,
        codeStates['currency'] = currencyd61f7,
        codeStates['setcurrency'] = setcurrencyd61f7,
        codeStates['bonus_percentage'] = bonus_percentagec00a0,
        codeStates['setbonus_percentage'] = setbonus_percentagec00a0,
        codeStates['promotion_eligible'] = promotion_eligible28dff,
        codeStates['setpromotion_eligible'] = setpromotion_eligible28dff,
        codeStates['overtime_eligible'] = overtime_eligiblee49e9,
        codeStates['setovertime_eligible'] = setovertime_eligiblee49e9,
        codeStates['hr_policies_group'] = hr_policies_groupa0e79,
        codeStates['sethr_policies_group'] = sethr_policies_groupa0e79,
        codeStates['hr_policies_groupa0e79'] = hr_policies_groupa0e79Props,
        codeStates['sethr_policies_groupa0e79'] = sethr_policies_groupa0e79Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compensation_benfits_groupa044dRef = useRef<any>(null);
  const handleClearSearch = () => {
    compensation_benfits_groupa044dRef.current?.setSearchParams();
    compensation_benfits_groupa044dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compensation_benfits_groupa044d) && Object.keys(compensation_benfits_groupa044d)?.length>0)
      {
        setcompensation_benfits_groupa044d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compensation_benfits_groupa044dProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '45 / 80',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#e9eef7',
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
          setviewemployeejobgrade_v1((pre:any)=>({...pre,_selectedGroup_:"compensation_benfits_group"}))
        }}
    >
          {allowedControls.includes("category_configuration_text") ?<Textcategory_configuration_text   /* 0f4bd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("min_salary") ?<TextInputmin_salary   /* 22457 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("max_salary") ?<TextInputmax_salary   /* 4199f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("currency") ?<Dropdowncurrency   /* d61f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("bonus_percentage") ?<TextInputbonus_percentage   /* c00a0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("promotion_eligible")?<Switchpromotion_eligible  /* 28dff */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("overtime_eligible")?<Switchovertime_eligible  /* e49e9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompensation_benfits_group
