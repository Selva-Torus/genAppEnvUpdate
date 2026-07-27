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
import Textgrade_code_text  from "./Textgrade_code_text";
import Textgrade_code  from "./Textgrade_code";
import Textgrade_name_text  from "./Textgrade_name_text";
import Textgrade_name  from "./Textgrade_name";
import Textgrade_level_text  from "./Textgrade_level_text";
import Textgrade_level  from "./Textgrade_level";
import Textsalary_range_text  from "./Textsalary_range_text";
import Textsalary_range  from "./Textsalary_range";
import Textappraisal_cycle_text  from "./Textappraisal_cycle_text";
import Textappraisal_cycle  from "./Textappraisal_cycle";
import Textconfo_text  from "./Textconfo_text";
import Textgrade_id  from "./Textgrade_id";
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
  const {dfd_jobgrade_v1Props, setdfd_jobgrade_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
      "grade_code_text",
      "grade_code",
      "grade_name_text",
      "grade_name",
      "grade_level_text",
      "grade_level",
      "salary_range_text",
      "salary_range",
      "appraisal_cycle_text",
      "appraisal_cycle",
      "confo_text",
      "grade_id",
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
  const {group_deletea1de0, setgroup_deletea1de0}= useContext(TotalContext) as TotalContextProps;
  const {group_deletea1de0Props, setgroup_deletea1de0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text14d64, setdelete_heading_text14d64}= useContext(TotalContext) as TotalContextProps;
  const {grade_code_textff14c, setgrade_code_textff14c}= useContext(TotalContext) as TotalContextProps;
  const {grade_code812e5, setgrade_code812e5}= useContext(TotalContext) as TotalContextProps;
  const {grade_name_textea710, setgrade_name_textea710}= useContext(TotalContext) as TotalContextProps;
  const {grade_nameaa0a4, setgrade_nameaa0a4}= useContext(TotalContext) as TotalContextProps;
  const {grade_level_text85021, setgrade_level_text85021}= useContext(TotalContext) as TotalContextProps;
  const {grade_level40e36, setgrade_level40e36}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_text80689, setsalary_range_text80689}= useContext(TotalContext) as TotalContextProps;
  const {salary_range4d41c, setsalary_range4d41c}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle_text2841d, setappraisal_cycle_text2841d}= useContext(TotalContext) as TotalContextProps;
  const {appraisal_cycle961f2, setappraisal_cycle961f2}= useContext(TotalContext) as TotalContextProps;
  const {confo_texta7470, setconfo_texta7470}= useContext(TotalContext) as TotalContextProps;
  const {grade_id65c54, setgrade_id65c54}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0a3db, setcancel_button0a3db}= useContext(TotalContext) as TotalContextProps;
  const {ok_button504a2, setok_button504a2}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeejobgradedelete_v1, setemployeejobgradedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGradeDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "25d78f163c6cf2b29df63021f43a1de0");
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
    setgroup_deletea1de0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text14d64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text14d64?.isDisabled==null)
      {
        setdelete_heading_text14d64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_code_text")){
        setgrade_code_textff14c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_code_textff14c?.isDisabled==null)
      {
        setgrade_code_textff14c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_code")){
        setgrade_code812e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_code812e5?.isDisabled==null)
      {
        setgrade_code812e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name_text")){
        setgrade_name_textea710((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_name_textea710?.isDisabled==null)
      {
        setgrade_name_textea710((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_name")){
        setgrade_nameaa0a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_nameaa0a4?.isDisabled==null)
      {
        setgrade_nameaa0a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_level_text")){
        setgrade_level_text85021((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_level_text85021?.isDisabled==null)
      {
        setgrade_level_text85021((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_level")){
        setgrade_level40e36((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_level40e36?.isDisabled==null)
      {
        setgrade_level40e36((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range_text")){
        setsalary_range_text80689((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range_text80689?.isDisabled==null)
      {
        setsalary_range_text80689((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("salary_range")){
        setsalary_range4d41c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(salary_range4d41c?.isDisabled==null)
      {
        setsalary_range4d41c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("appraisal_cycle_text")){
        setappraisal_cycle_text2841d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(appraisal_cycle_text2841d?.isDisabled==null)
      {
        setappraisal_cycle_text2841d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("appraisal_cycle")){
        setappraisal_cycle961f2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(appraisal_cycle961f2?.isDisabled==null)
      {
        setappraisal_cycle961f2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_texta7470((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_texta7470?.isDisabled==null)
      {
        setconfo_texta7470((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_id")){
        setgrade_id65c54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_id65c54?.isDisabled==null)
      {
        setgrade_id65c54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button0a3db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_button0a3db?.isDisabled==null)
      {
        setcancel_button0a3db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button504a2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button504a2?.isDisabled==null)
      {
        setok_button504a2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_deletea1de0,
        codeStates['setgroup_delete'] = setgroup_deletea1de0,
        codeStates['group_deletea1de0'] = group_deletea1de0Props,
        codeStates['setgroup_deletea1de0'] = setgroup_deletea1de0Props,
        codeStates['delete_heading_text'] = delete_heading_text14d64,
        codeStates['setdelete_heading_text'] = setdelete_heading_text14d64,
        codeStates['grade_code_text'] = grade_code_textff14c,
        codeStates['setgrade_code_text'] = setgrade_code_textff14c,
        codeStates['grade_code'] = grade_code812e5,
        codeStates['setgrade_code'] = setgrade_code812e5,
        codeStates['grade_name_text'] = grade_name_textea710,
        codeStates['setgrade_name_text'] = setgrade_name_textea710,
        codeStates['grade_name'] = grade_nameaa0a4,
        codeStates['setgrade_name'] = setgrade_nameaa0a4,
        codeStates['grade_level_text'] = grade_level_text85021,
        codeStates['setgrade_level_text'] = setgrade_level_text85021,
        codeStates['grade_level'] = grade_level40e36,
        codeStates['setgrade_level'] = setgrade_level40e36,
        codeStates['salary_range_text'] = salary_range_text80689,
        codeStates['setsalary_range_text'] = setsalary_range_text80689,
        codeStates['salary_range'] = salary_range4d41c,
        codeStates['setsalary_range'] = setsalary_range4d41c,
        codeStates['appraisal_cycle_text'] = appraisal_cycle_text2841d,
        codeStates['setappraisal_cycle_text'] = setappraisal_cycle_text2841d,
        codeStates['appraisal_cycle'] = appraisal_cycle961f2,
        codeStates['setappraisal_cycle'] = setappraisal_cycle961f2,
        codeStates['confo_text'] = confo_texta7470,
        codeStates['setconfo_text'] = setconfo_texta7470,
        codeStates['grade_id'] = grade_id65c54,
        codeStates['setgrade_id'] = setgrade_id65c54,
        codeStates['cancel_button'] = cancel_button0a3db,
        codeStates['setcancel_button'] = setcancel_button0a3db,
        codeStates['ok_button'] = ok_button504a2,
        codeStates['setok_button'] = setok_button504a2,

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
        codeStates['group_delete'] = group_deletea1de0,
        codeStates['setgroup_delete'] = setgroup_deletea1de0,
        codeStates['group_deletea1de0'] = group_deletea1de0Props,
        codeStates['setgroup_deletea1de0'] = setgroup_deletea1de0Props,
        codeStates['delete_heading_text'] = delete_heading_text14d64,
        codeStates['setdelete_heading_text'] = setdelete_heading_text14d64,
        codeStates['grade_code_text'] = grade_code_textff14c,
        codeStates['setgrade_code_text'] = setgrade_code_textff14c,
        codeStates['grade_code'] = grade_code812e5,
        codeStates['setgrade_code'] = setgrade_code812e5,
        codeStates['grade_name_text'] = grade_name_textea710,
        codeStates['setgrade_name_text'] = setgrade_name_textea710,
        codeStates['grade_name'] = grade_nameaa0a4,
        codeStates['setgrade_name'] = setgrade_nameaa0a4,
        codeStates['grade_level_text'] = grade_level_text85021,
        codeStates['setgrade_level_text'] = setgrade_level_text85021,
        codeStates['grade_level'] = grade_level40e36,
        codeStates['setgrade_level'] = setgrade_level40e36,
        codeStates['salary_range_text'] = salary_range_text80689,
        codeStates['setsalary_range_text'] = setsalary_range_text80689,
        codeStates['salary_range'] = salary_range4d41c,
        codeStates['setsalary_range'] = setsalary_range4d41c,
        codeStates['appraisal_cycle_text'] = appraisal_cycle_text2841d,
        codeStates['setappraisal_cycle_text'] = setappraisal_cycle_text2841d,
        codeStates['appraisal_cycle'] = appraisal_cycle961f2,
        codeStates['setappraisal_cycle'] = setappraisal_cycle961f2,
        codeStates['confo_text'] = confo_texta7470,
        codeStates['setconfo_text'] = setconfo_texta7470,
        codeStates['grade_id'] = grade_id65c54,
        codeStates['setgrade_id'] = setgrade_id65c54,
        codeStates['cancel_button'] = cancel_button0a3db,
        codeStates['setcancel_button'] = setcancel_button0a3db,
        codeStates['ok_button'] = ok_button504a2,
        codeStates['setok_button'] = setok_button504a2,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_deletea1de0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_deletea1de0Ref.current?.setSearchParams();
    group_deletea1de0Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_deletea1de0) && Object.keys(group_deletea1de0)?.length>0)
      {
        setgroup_deletea1de0({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_deletea1de0Props?.refresh,token])


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
        backgroundColor:'#aeb8c7',
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
          setemployeejobgradedelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 14d64 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_code_text") ?<Textgrade_code_text   /* ff14c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_code") ?<Textgrade_code   /* 812e5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_name_text") ?<Textgrade_name_text   /* ea710 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_name") ?<Textgrade_name   /* aa0a4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_level_text") ?<Textgrade_level_text   /* 85021 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_level") ?<Textgrade_level   /* 40e36 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("salary_range_text") ?<Textsalary_range_text   /* 80689 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("salary_range") ?<Textsalary_range   /* 4d41c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("appraisal_cycle_text") ?<Textappraisal_cycle_text   /* 2841d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("appraisal_cycle") ?<Textappraisal_cycle   /* 961f2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* a7470 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_id") ?<Textgrade_id   /* 65c54 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
