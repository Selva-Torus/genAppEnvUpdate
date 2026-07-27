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
import Textdelete_heading_text  from "./Textdelete_heading_text";
import Textposition_code_text  from "./Textposition_code_text";
import Textposition_code  from "./Textposition_code";
import Textposition_title_text  from "./Textposition_title_text";
import Textposition_title  from "./Textposition_title";
import Textgrade_name_text  from "./Textgrade_name_text";
import Textgrade_name  from "./Textgrade_name";
import Textjob_level_text  from "./Textjob_level_text";
import Textjob_level  from "./Textjob_level";
import Textvacancy_status_text  from "./Textvacancy_status_text";
import Textvacancy_status  from "./Textvacancy_status";
import Textconfo_text  from "./Textconfo_text";
import Textposition_id  from "./Textposition_id";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "delete_heading_text",
      "position_code_text",
      "position_code",
      "position_title_text",
      "position_title",
      "grade_name_text",
      "grade_name",
      "job_level_text",
      "job_level",
      "vacancy_status_text",
      "vacancy_status",
      "confo_text",
      "position_id",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
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
  const {group_deletebeb3a, setgroup_deletebeb3a}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebeb3aProps, setgroup_deletebeb3aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text04bf4, setdelete_heading_text04bf4}= useContext(TotalContext) as TotalContextProps;
  const {position_code_text4b960, setposition_code_text4b960}= useContext(TotalContext) as TotalContextProps;
  const {position_codea4c8a, setposition_codea4c8a}= useContext(TotalContext) as TotalContextProps;
  const {position_title_textd9ad1, setposition_title_textd9ad1}= useContext(TotalContext) as TotalContextProps;
  const {position_titleee3e1, setposition_titleee3e1}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_text9d72d, setgrade_name_text9d72d}= useContext(TotalContext) as TotalContextProps;
  const {grade_name2249c, setgrade_name2249c}= useContext(TotalContext) as TotalContextProps;
  const {job_level_text55a41, setjob_level_text55a41}= useContext(TotalContext) as TotalContextProps;
  const {job_level29550, setjob_level29550}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status_text733a2, setvacancy_status_text733a2}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status0fe05, setvacancy_status0fe05}= useContext(TotalContext) as TotalContextProps;
  const {confo_text9a251, setconfo_text9a251}= useContext(TotalContext) as TotalContextProps;
  const {position_idebcb1, setposition_idebcb1}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonedd0a, setcancel_buttonedd0a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button1f631, setok_button1f631}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobpositiondelete_v1, setemployeejobpositiondelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositionDelete:AFVK:v1',
    [user],
    'GroupGroupDelete',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5822fa74197f0eac3aa5917ea0cbeb3a");
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
    setgroup_deletebeb3aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text04bf4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text04bf4?.isDisabled==null)
      {
        setdelete_heading_text04bf4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_code_text")){
        setposition_code_text4b960((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_code_text4b960?.isDisabled==null)
      {
        setposition_code_text4b960((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_code")){
        setposition_codea4c8a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_codea4c8a?.isDisabled==null)
      {
        setposition_codea4c8a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_title_text")){
        setposition_title_textd9ad1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_title_textd9ad1?.isDisabled==null)
      {
        setposition_title_textd9ad1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_title")){
        setposition_titleee3e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_titleee3e1?.isDisabled==null)
      {
        setposition_titleee3e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name_text")){
        setgrade_name_text9d72d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_name_text9d72d?.isDisabled==null)
      {
        setgrade_name_text9d72d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_name2249c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_name2249c?.isDisabled==null)
      {
        setgrade_name2249c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_level_text")){
        setjob_level_text55a41((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_level_text55a41?.isDisabled==null)
      {
        setjob_level_text55a41((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("job_level")){
        setjob_level29550((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(job_level29550?.isDisabled==null)
      {
        setjob_level29550((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vacancy_status_text")){
        setvacancy_status_text733a2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(vacancy_status_text733a2?.isDisabled==null)
      {
        setvacancy_status_text733a2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vacancy_status")){
        setvacancy_status0fe05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(vacancy_status0fe05?.isDisabled==null)
      {
        setvacancy_status0fe05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text9a251((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text9a251?.isDisabled==null)
      {
        setconfo_text9a251((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_id")){
        setposition_idebcb1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_idebcb1?.isDisabled==null)
      {
        setposition_idebcb1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonedd0a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonedd0a?.isDisabled==null)
      {
        setcancel_buttonedd0a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button1f631((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button1f631?.isDisabled==null)
      {
        setok_button1f631((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_deletebeb3a,
        codeStates['setgroup_delete'] = setgroup_deletebeb3a,
        codeStates['group_deletebeb3a'] = group_deletebeb3aProps,
        codeStates['setgroup_deletebeb3a'] = setgroup_deletebeb3aProps,
        codeStates['delete_heading_text'] = delete_heading_text04bf4,
        codeStates['setdelete_heading_text'] = setdelete_heading_text04bf4,
        codeStates['position_code_text'] = position_code_text4b960,
        codeStates['setposition_code_text'] = setposition_code_text4b960,
        codeStates['position_code'] = position_codea4c8a,
        codeStates['setposition_code'] = setposition_codea4c8a,
        codeStates['position_title_text'] = position_title_textd9ad1,
        codeStates['setposition_title_text'] = setposition_title_textd9ad1,
        codeStates['position_title'] = position_titleee3e1,
        codeStates['setposition_title'] = setposition_titleee3e1,
        codeStates['grade_name_text'] = grade_name_text9d72d,
        codeStates['setgrade_name_text'] = setgrade_name_text9d72d,
        codeStates['grade_name'] = grade_name2249c,
        codeStates['setgrade_name'] = setgrade_name2249c,
        codeStates['job_level_text'] = job_level_text55a41,
        codeStates['setjob_level_text'] = setjob_level_text55a41,
        codeStates['job_level'] = job_level29550,
        codeStates['setjob_level'] = setjob_level29550,
        codeStates['vacancy_status_text'] = vacancy_status_text733a2,
        codeStates['setvacancy_status_text'] = setvacancy_status_text733a2,
        codeStates['vacancy_status'] = vacancy_status0fe05,
        codeStates['setvacancy_status'] = setvacancy_status0fe05,
        codeStates['confo_text'] = confo_text9a251,
        codeStates['setconfo_text'] = setconfo_text9a251,
        codeStates['position_id'] = position_idebcb1,
        codeStates['setposition_id'] = setposition_idebcb1,
        codeStates['cancel_button'] = cancel_buttonedd0a,
        codeStates['setcancel_button'] = setcancel_buttonedd0a,
        codeStates['ok_button'] = ok_button1f631,
        codeStates['setok_button'] = setok_button1f631,

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
        codeStates['group_delete'] = group_deletebeb3a,
        codeStates['setgroup_delete'] = setgroup_deletebeb3a,
        codeStates['group_deletebeb3a'] = group_deletebeb3aProps,
        codeStates['setgroup_deletebeb3a'] = setgroup_deletebeb3aProps,
        codeStates['delete_heading_text'] = delete_heading_text04bf4,
        codeStates['setdelete_heading_text'] = setdelete_heading_text04bf4,
        codeStates['position_code_text'] = position_code_text4b960,
        codeStates['setposition_code_text'] = setposition_code_text4b960,
        codeStates['position_code'] = position_codea4c8a,
        codeStates['setposition_code'] = setposition_codea4c8a,
        codeStates['position_title_text'] = position_title_textd9ad1,
        codeStates['setposition_title_text'] = setposition_title_textd9ad1,
        codeStates['position_title'] = position_titleee3e1,
        codeStates['setposition_title'] = setposition_titleee3e1,
        codeStates['grade_name_text'] = grade_name_text9d72d,
        codeStates['setgrade_name_text'] = setgrade_name_text9d72d,
        codeStates['grade_name'] = grade_name2249c,
        codeStates['setgrade_name'] = setgrade_name2249c,
        codeStates['job_level_text'] = job_level_text55a41,
        codeStates['setjob_level_text'] = setjob_level_text55a41,
        codeStates['job_level'] = job_level29550,
        codeStates['setjob_level'] = setjob_level29550,
        codeStates['vacancy_status_text'] = vacancy_status_text733a2,
        codeStates['setvacancy_status_text'] = setvacancy_status_text733a2,
        codeStates['vacancy_status'] = vacancy_status0fe05,
        codeStates['setvacancy_status'] = setvacancy_status0fe05,
        codeStates['confo_text'] = confo_text9a251,
        codeStates['setconfo_text'] = setconfo_text9a251,
        codeStates['position_id'] = position_idebcb1,
        codeStates['setposition_id'] = setposition_idebcb1,
        codeStates['cancel_button'] = cancel_buttonedd0a,
        codeStates['setcancel_button'] = setcancel_buttonedd0a,
        codeStates['ok_button'] = ok_button1f631,
        codeStates['setok_button'] = setok_button1f631,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_deletebeb3aRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_deletebeb3aRef.current?.setSearchParams();
    group_deletebeb3aRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_deletebeb3a) && Object.keys(group_deletebeb3a)?.length>0)
      {
        setgroup_deletebeb3a({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_deletebeb3aProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 63',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setemployeejobpositiondelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 04bf4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_code_text") ?<Textposition_code_text   /* 4b960 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_code") ?<Textposition_code   /* a4c8a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_title_text") ?<Textposition_title_text   /* d9ad1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_title") ?<Textposition_title   /* ee3e1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_name_text") ?<Textgrade_name_text   /* 9d72d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_name") ?<Textgrade_name   /* 2249c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("job_level_text") ?<Textjob_level_text   /* 55a41 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("job_level") ?<Textjob_level   /* 29550 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("vacancy_status_text") ?<Textvacancy_status_text   /* 733a2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("vacancy_status") ?<Textvacancy_status   /* 0fe05 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 9a251 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_id") ?<Textposition_id   /* ebcb1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
