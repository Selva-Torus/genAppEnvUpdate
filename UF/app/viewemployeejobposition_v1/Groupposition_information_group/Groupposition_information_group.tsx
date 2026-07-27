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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
      "compensation_benfits_group"
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
  const {posiiton_information_text98456, setposiiton_information_text98456}= useContext(TotalContext) as TotalContextProps;
  const {position_codea8a48, setposition_codea8a48}= useContext(TotalContext) as TotalContextProps;
  const {position_title6e1ab, setposition_title6e1ab}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf7b05, setdescriptionf7b05}= useContext(TotalContext) as TotalContextProps;
  const {grade_name11b6f, setgrade_name11b6f}= useContext(TotalContext) as TotalContextProps;
  const {employment_type77cb7, setemployment_type77cb7}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredd886e, setexperience_requiredd886e}= useContext(TotalContext) as TotalContextProps;
  const {job_familyebc1e, setjob_familyebc1e}= useContext(TotalContext) as TotalContextProps;
  const {job_level44b70, setjob_level44b70}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c7b866caed721de00fbfdfc1f8967802");
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
    setposition_information_group67802Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("posiiton_information_text")){
        setposiiton_information_text98456((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(posiiton_information_text98456?.isDisabled==null)
      {
        setposiiton_information_text98456((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_code")){
        setposition_codea8a48((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_codea8a48?.isDisabled==null)
      {
        setposition_codea8a48((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_title")){
        setposition_title6e1ab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_title6e1ab?.isDisabled==null)
      {
        setposition_title6e1ab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptionf7b05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(descriptionf7b05?.isDisabled==null)
      {
        setdescriptionf7b05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_name11b6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_name11b6f?.isDisabled==null)
      {
        setgrade_name11b6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type")){
        setemployment_type77cb7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_type77cb7?.isDisabled==null)
      {
        setemployment_type77cb7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("experience_required")){
        setexperience_requiredd886e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(experience_requiredd886e?.isDisabled==null)
      {
        setexperience_requiredd886e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_family")){
        setjob_familyebc1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_familyebc1e?.isDisabled==null)
      {
        setjob_familyebc1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_level")){
        setjob_level44b70((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_level44b70?.isDisabled==null)
      {
        setjob_level44b70((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['posiiton_information_text'] = posiiton_information_text98456,
        codeStates['setposiiton_information_text'] = setposiiton_information_text98456,
        codeStates['position_code'] = position_codea8a48,
        codeStates['setposition_code'] = setposition_codea8a48,
        codeStates['position_title'] = position_title6e1ab,
        codeStates['setposition_title'] = setposition_title6e1ab,
        codeStates['description'] = descriptionf7b05,
        codeStates['setdescription'] = setdescriptionf7b05,
        codeStates['grade_name'] = grade_name11b6f,
        codeStates['setgrade_name'] = setgrade_name11b6f,
        codeStates['employment_type'] = employment_type77cb7,
        codeStates['setemployment_type'] = setemployment_type77cb7,
        codeStates['experience_required'] = experience_requiredd886e,
        codeStates['setexperience_required'] = setexperience_requiredd886e,
        codeStates['job_family'] = job_familyebc1e,
        codeStates['setjob_family'] = setjob_familyebc1e,
        codeStates['job_level'] = job_level44b70,
        codeStates['setjob_level'] = setjob_level44b70,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,

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
        codeStates['posiiton_information_text'] = posiiton_information_text98456,
        codeStates['setposiiton_information_text'] = setposiiton_information_text98456,
        codeStates['position_code'] = position_codea8a48,
        codeStates['setposition_code'] = setposition_codea8a48,
        codeStates['position_title'] = position_title6e1ab,
        codeStates['setposition_title'] = setposition_title6e1ab,
        codeStates['description'] = descriptionf7b05,
        codeStates['setdescription'] = setdescriptionf7b05,
        codeStates['grade_name'] = grade_name11b6f,
        codeStates['setgrade_name'] = setgrade_name11b6f,
        codeStates['employment_type'] = employment_type77cb7,
        codeStates['setemployment_type'] = setemployment_type77cb7,
        codeStates['experience_required'] = experience_requiredd886e,
        codeStates['setexperience_required'] = setexperience_requiredd886e,
        codeStates['job_family'] = job_familyebc1e,
        codeStates['setjob_family'] = setjob_familyebc1e,
        codeStates['job_level'] = job_level44b70,
        codeStates['setjob_level'] = setjob_level44b70,
        codeStates['compensation_benfits_group'] = compensation_benfits_group0d8fe,
        codeStates['setcompensation_benfits_group'] = setcompensation_benfits_group0d8fe,
        codeStates['compensation_benfits_group0d8fe'] = compensation_benfits_group0d8feProps,
        codeStates['setcompensation_benfits_group0d8fe'] = setcompensation_benfits_group0d8feProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const position_information_group67802Ref = useRef<any>(null);
  const handleClearSearch = () => {
    position_information_group67802Ref.current?.setSearchParams();
    position_information_group67802Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(position_information_group67802) && Object.keys(position_information_group67802)?.length>0)
      {
        setposition_information_group67802({})
      }
    }else 
      prevRefreshRef.current= true
  }, [position_information_group67802Props?.refresh,token])


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
          setviewemployeejobposition_v1((pre:any)=>({...pre,_selectedGroup_:"position_information_group"}))
        }}
    >
          {allowedControls.includes("posiiton_information_text") ?<Textposiiton_information_text   /* 98456 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("position_code") ?<TextInputposition_code   /* a8a48 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("position_title") ?<TextInputposition_title   /* 6e1ab */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextInputdescription   /* f7b05 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("grade_name") ?<Dropdowngrade_name   /* 11b6f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("employment_type") ?<Dropdownemployment_type   /* 77cb7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("experience_required") ?<TextInputexperience_required   /* d886e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("job_family") ?<TextInputjob_family   /* ebc1e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("job_level") ?<TextInputjob_level   /* 44b70 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupposition_information_group
