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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
      "dynamicactions"
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
      "hr_policies_group",
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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text97eea, setcategory_configuration_text97eea}= useContext(TotalContext) as TotalContextProps;
  const {min_salary807a5, setmin_salary807a5}= useContext(TotalContext) as TotalContextProps;
  const {max_salarye78c6, setmax_salarye78c6}= useContext(TotalContext) as TotalContextProps;
  const {currencyb8f2e, setcurrencyb8f2e}= useContext(TotalContext) as TotalContextProps;
  const {bonus_percentageae1ae, setbonus_percentageae1ae}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligible4c314, setpromotion_eligible4c314}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligible66e37, setovertime_eligible66e37}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addemployeejobgrade_v1, setaddemployeejobgrade_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addEmployeeJobGrade:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d1c13cefdc89a0d6a6ad217393049b64");
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
    setcompensation_benfits_group49b64Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("category_configuration_text")){
        setcategory_configuration_text97eea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(category_configuration_text97eea?.isDisabled==null)
      {
        setcategory_configuration_text97eea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("min_salary")){
        setmin_salary807a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(min_salary807a5?.isDisabled==null)
      {
        setmin_salary807a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_salary")){
        setmax_salarye78c6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(max_salarye78c6?.isDisabled==null)
      {
        setmax_salarye78c6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("currency")){
        setcurrencyb8f2e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(currencyb8f2e?.isDisabled==null)
      {
        setcurrencyb8f2e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bonus_percentage")){
        setbonus_percentageae1ae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bonus_percentageae1ae?.isDisabled==null)
      {
        setbonus_percentageae1ae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("promotion_eligible")){
        setpromotion_eligible4c314((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(promotion_eligible4c314?.isDisabled==null)
      {
        setpromotion_eligible4c314((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("overtime_eligible")){
        setovertime_eligible66e37((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(overtime_eligible66e37?.isDisabled==null)
      {
        setovertime_eligible66e37((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['category_configuration_text'] = category_configuration_text97eea,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text97eea,
        codeStates['min_salary'] = min_salary807a5,
        codeStates['setmin_salary'] = setmin_salary807a5,
        codeStates['max_salary'] = max_salarye78c6,
        codeStates['setmax_salary'] = setmax_salarye78c6,
        codeStates['currency'] = currencyb8f2e,
        codeStates['setcurrency'] = setcurrencyb8f2e,
        codeStates['bonus_percentage'] = bonus_percentageae1ae,
        codeStates['setbonus_percentage'] = setbonus_percentageae1ae,
        codeStates['promotion_eligible'] = promotion_eligible4c314,
        codeStates['setpromotion_eligible'] = setpromotion_eligible4c314,
        codeStates['overtime_eligible'] = overtime_eligible66e37,
        codeStates['setovertime_eligible'] = setovertime_eligible66e37,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,

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
        codeStates['overall_group'] = overall_groupfc238,
        codeStates['setoverall_group'] = setoverall_groupfc238,
        codeStates['overall_groupfc238'] = overall_groupfc238Props,
        codeStates['setoverall_groupfc238'] = setoverall_groupfc238Props,
        codeStates['grade_information_group'] = grade_information_groupddd50,
        codeStates['setgrade_information_group'] = setgrade_information_groupddd50,
        codeStates['grade_information_groupddd50'] = grade_information_groupddd50Props,
        codeStates['setgrade_information_groupddd50'] = setgrade_information_groupddd50Props,
        codeStates['compensation_benfits_group'] = compensation_benfits_group49b64,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group49b64,
        codeStates['compensation_benfits_group49b64'] = compensation_benfits_group49b64Props,
        codeStates['setcompensation_benfits_group49b64'] = setcompensation_benfits_group49b64Props,
        codeStates['category_configuration_text'] = category_configuration_text97eea,
        codeStates['setcategory_configuration_text'] = setcategory_configuration_text97eea,
        codeStates['min_salary'] = min_salary807a5,
        codeStates['setmin_salary'] = setmin_salary807a5,
        codeStates['max_salary'] = max_salarye78c6,
        codeStates['setmax_salary'] = setmax_salarye78c6,
        codeStates['currency'] = currencyb8f2e,
        codeStates['setcurrency'] = setcurrencyb8f2e,
        codeStates['bonus_percentage'] = bonus_percentageae1ae,
        codeStates['setbonus_percentage'] = setbonus_percentageae1ae,
        codeStates['promotion_eligible'] = promotion_eligible4c314,
        codeStates['setpromotion_eligible'] = setpromotion_eligible4c314,
        codeStates['overtime_eligible'] = overtime_eligible66e37,
        codeStates['setovertime_eligible'] = setovertime_eligible66e37,
        codeStates['hr_policies_group'] = hr_policies_group0f880,
        codeStates['sethr_policies_group'] = sethr_policies_group0f880,
        codeStates['hr_policies_group0f880'] = hr_policies_group0f880Props,
        codeStates['sethr_policies_group0f880'] = sethr_policies_group0f880Props,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const compensation_benfits_group49b64Ref = useRef<any>(null);
  const handleClearSearch = () => {
    compensation_benfits_group49b64Ref.current?.setSearchParams();
    compensation_benfits_group49b64Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(compensation_benfits_group49b64) && Object.keys(compensation_benfits_group49b64)?.length>0)
      {
        setcompensation_benfits_group49b64({})
      }
    }else 
      prevRefreshRef.current= true
  }, [compensation_benfits_group49b64Props?.refresh,token])


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
          setaddemployeejobgrade_v1((pre:any)=>({...pre,_selectedGroup_:"compensation_benfits_group"}))
        }}
    >
          {allowedControls.includes("category_configuration_text") ?<Textcategory_configuration_text   /* 97eea */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("min_salary") ?<TextInputmin_salary   /* 807a5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("max_salary") ?<TextInputmax_salary   /* e78c6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("currency") ?<Dropdowncurrency   /* b8f2e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("bonus_percentage") ?<TextInputbonus_percentage   /* ae1ae */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("promotion_eligible")?<Switchpromotion_eligible  /* 4c314 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("overtime_eligible")?<Switchovertime_eligible  /* 66e37 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcompensation_benfits_group
