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
import Textposiiton_information_text  from "./Textposiiton_information_text";
import TextInputposition_code  from "./TextInputposition_code";
import TextInputposition_title  from "./TextInputposition_title";
import TextInputdescription  from "./TextInputdescription";
import Dropdowngrade_name  from "./Dropdowngrade_name";
import Dropdownemployment_type  from "./Dropdownemployment_type";
import TextInputexperience_required  from "./TextInputexperience_required";
import TextInputjob_family  from "./TextInputjob_family";
import TextInputjob_level  from "./TextInputjob_level";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupposition_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
      "posiiton_information_text",
      "position_code",
      "position_title",
      "description",
      "grade_name",
      "employment_type",
      "experience_required",
      "job_family",
      "job_level"
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
  const {posiiton_information_texta2b56, setposiiton_information_texta2b56}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4553, setposition_codea4553}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda529, setposition_titleda529}= useContext(TotalContext) as TotalContextProps;
  const {description9d446, setdescription9d446}= useContext(TotalContext) as TotalContextProps;
  const {grade_namee4856, setgrade_namee4856}= useContext(TotalContext) as TotalContextProps;
  const {employment_type9bb76, setemployment_type9bb76}= useContext(TotalContext) as TotalContextProps;
  const {experience_required6a911, setexperience_required6a911}= useContext(TotalContext) as TotalContextProps;
  const {job_family4c9f2, setjob_family4c9f2}= useContext(TotalContext) as TotalContextProps;
  const {job_level77c64, setjob_level77c64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupPositionInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b2c06e29b62cff17bf1e2725d255335b");
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
    setposition_information_group5335bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("posiiton_information_text")){
        setposiiton_information_texta2b56((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(posiiton_information_texta2b56?.isDisabled==null)
      {
        setposiiton_information_texta2b56((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_code")){
        setposition_codea4553((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_codea4553?.isDisabled==null)
      {
        setposition_codea4553((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_title")){
        setposition_titleda529((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_titleda529?.isDisabled==null)
      {
        setposition_titleda529((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescription9d446((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(description9d446?.isDisabled==null)
      {
        setdescription9d446((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_namee4856((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_namee4856?.isDisabled==null)
      {
        setgrade_namee4856((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type")){
        setemployment_type9bb76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_type9bb76?.isDisabled==null)
      {
        setemployment_type9bb76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("experience_required")){
        setexperience_required6a911((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(experience_required6a911?.isDisabled==null)
      {
        setexperience_required6a911((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_family")){
        setjob_family4c9f2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_family4c9f2?.isDisabled==null)
      {
        setjob_family4c9f2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_level")){
        setjob_level77c64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_level77c64?.isDisabled==null)
      {
        setjob_level77c64((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['posiiton_information_text'] = posiiton_information_texta2b56,
        codeStates['setposiiton_information_text'] = setposiiton_information_texta2b56,
        codeStates['position_code'] = position_codea4553,
        codeStates['setposition_code'] = setposition_codea4553,
        codeStates['position_title'] = position_titleda529,
        codeStates['setposition_title'] = setposition_titleda529,
        codeStates['description'] = description9d446,
        codeStates['setdescription'] = setdescription9d446,
        codeStates['grade_name'] = grade_namee4856,
        codeStates['setgrade_name'] = setgrade_namee4856,
        codeStates['employment_type'] = employment_type9bb76,
        codeStates['setemployment_type'] = setemployment_type9bb76,
        codeStates['experience_required'] = experience_required6a911,
        codeStates['setexperience_required'] = setexperience_required6a911,
        codeStates['job_family'] = job_family4c9f2,
        codeStates['setjob_family'] = setjob_family4c9f2,
        codeStates['job_level'] = job_level77c64,
        codeStates['setjob_level'] = setjob_level77c64,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
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
        codeStates['posiiton_information_text'] = posiiton_information_texta2b56,
        codeStates['setposiiton_information_text'] = setposiiton_information_texta2b56,
        codeStates['position_code'] = position_codea4553,
        codeStates['setposition_code'] = setposition_codea4553,
        codeStates['position_title'] = position_titleda529,
        codeStates['setposition_title'] = setposition_titleda529,
        codeStates['description'] = description9d446,
        codeStates['setdescription'] = setdescription9d446,
        codeStates['grade_name'] = grade_namee4856,
        codeStates['setgrade_name'] = setgrade_namee4856,
        codeStates['employment_type'] = employment_type9bb76,
        codeStates['setemployment_type'] = setemployment_type9bb76,
        codeStates['experience_required'] = experience_required6a911,
        codeStates['setexperience_required'] = setexperience_required6a911,
        codeStates['job_family'] = job_family4c9f2,
        codeStates['setjob_family'] = setjob_family4c9f2,
        codeStates['job_level'] = job_level77c64,
        codeStates['setjob_level'] = setjob_level77c64,
        codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
        codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
        codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
        codeStates['dynamicactions'] = dynamicactions76c44,
        codeStates['setdynamicactions'] = setdynamicactions76c44,
        codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
        codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const position_information_group5335bRef = useRef<any>(null);
  const handleClearSearch = () => {
    position_information_group5335bRef.current?.setSearchParams();
    position_information_group5335bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(position_information_group5335b) && Object.keys(position_information_group5335b)?.length>0)
      {
        setposition_information_group5335b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [position_information_group5335bProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 41',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddemployeejobposition_v1((pre:any)=>({...pre,_selectedGroup_:"position_information_group"}))
        }}
    >
          {allowedControls.includes("posiiton_information_text") ?<Textposiiton_information_text   /* a2b56 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("position_code") ?<TextInputposition_code   /* a4553 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("position_title") ?<TextInputposition_title   /* da529 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextInputdescription   /* 9d446 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("grade_name") ?<Dropdowngrade_name   /* e4856 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("employment_type") ?<Dropdownemployment_type   /* 9bb76 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("experience_required") ?<TextInputexperience_required   /* 6a911 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("job_family") ?<TextInputjob_family   /* 4c9f2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("job_level") ?<TextInputjob_level   /* 77c64 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupposition_information_group
