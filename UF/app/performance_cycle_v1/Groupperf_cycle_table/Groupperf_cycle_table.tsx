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
import Tableperf_cycle_table  from './Tableperf_cycle_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupperf_cycle_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_performancecycle_v1Props, setdfd_performancecycle_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "cycle_id",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "start_date",
      "end_date",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "perf_cycle_table"
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
  const {total_employees_group496b5, settotal_employees_group496b5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group496b5Props, settotal_employees_group496b5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group0afb1, setemp_group0afb1}= useContext(TotalContext) as TotalContextProps;
  const {emp_group0afb1Props, setemp_group0afb1Props}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28, setperf_cycle_table26d28}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28Props, setperf_cycle_table26d28Props}= useContext(TotalContext) as TotalContextProps;
  const {cycle_idf3db9, setcycle_idf3db9}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code8b707, setcycle_code8b707}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name00a29, setcycle_name00a29}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type56178, setcycle_type56178}= useContext(TotalContext) as TotalContextProps;
  const {start_dateb7114, setstart_dateb7114}= useContext(TotalContext) as TotalContextProps;
  const {end_date058c0, setend_date058c0}= useContext(TotalContext) as TotalContextProps;
  const {view_btne0416, setview_btne0416}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnfd098, setedit_btnfd098}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn6b3e2, setdelete_btn6b3e2}= useContext(TotalContext) as TotalContextProps;
  const {review_frequency1892f, setreview_frequency1892f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancecycles_v1, setperformancecycles_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCycles:AFVK:v1',
    [user],
    'GroupPerfCycleTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fdda58d52835de518c271281ed326d28");
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
    setperf_cycle_table26d28Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cycle_id")){
        setcycle_idf3db9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_idf3db9?.isDisabled==null)
      {
        setcycle_idf3db9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_code")){
        setcycle_code8b707((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_code8b707?.isDisabled==null)
      {
        setcycle_code8b707((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name00a29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name00a29?.isDisabled==null)
      {
        setcycle_name00a29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_type")){
        setcycle_type56178((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_type56178?.isDisabled==null)
      {
        setcycle_type56178((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("start_date")){
        setstart_dateb7114((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(start_dateb7114?.isDisabled==null)
      {
        setstart_dateb7114((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("end_date")){
        setend_date058c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(end_date058c0?.isDisabled==null)
      {
        setend_date058c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btne0416((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btne0416?.isDisabled==null)
      {
        setview_btne0416((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnfd098((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btnfd098?.isDisabled==null)
      {
        setedit_btnfd098((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn6b3e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btn6b3e2?.isDisabled==null)
      {
        setdelete_btn6b3e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_frequency")){
        setreview_frequency1892f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_frequency1892f?.isDisabled==null)
      {
        setreview_frequency1892f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
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
        codeStates['total_employees_group'] = total_employees_group496b5,
        codeStates['settotal_employees_group'] = settotal_employees_group496b5,
        codeStates['total_employees_group496b5'] = total_employees_group496b5Props,
        codeStates['settotal_employees_group496b5'] = settotal_employees_group496b5Props,
        codeStates['emp_group'] = emp_group0afb1,
        codeStates['setemp_group'] = setemp_group0afb1,
        codeStates['emp_group0afb1'] = emp_group0afb1Props,
        codeStates['setemp_group0afb1'] = setemp_group0afb1Props,
        codeStates['perf_cycle_table'] = perf_cycle_table26d28,
        codeStates['setperf_cycle_table'] = setperf_cycle_table26d28,
        codeStates['perf_cycle_table26d28'] = perf_cycle_table26d28Props,
        codeStates['setperf_cycle_table26d28'] = setperf_cycle_table26d28Props,
        codeStates['cycle_id'] = cycle_idf3db9,
        codeStates['setcycle_id'] = setcycle_idf3db9,
        codeStates['cycle_code'] = cycle_code8b707,
        codeStates['setcycle_code'] = setcycle_code8b707,
        codeStates['cycle_name'] = cycle_name00a29,
        codeStates['setcycle_name'] = setcycle_name00a29,
        codeStates['cycle_type'] = cycle_type56178,
        codeStates['setcycle_type'] = setcycle_type56178,
        codeStates['start_date'] = start_dateb7114,
        codeStates['setstart_date'] = setstart_dateb7114,
        codeStates['end_date'] = end_date058c0,
        codeStates['setend_date'] = setend_date058c0,
        codeStates['view_btn'] = view_btne0416,
        codeStates['setview_btn'] = setview_btne0416,
        codeStates['edit_btn'] = edit_btnfd098,
        codeStates['setedit_btn'] = setedit_btnfd098,
        codeStates['delete_btn'] = delete_btn6b3e2,
        codeStates['setdelete_btn'] = setdelete_btn6b3e2,
        codeStates['review_frequency'] = review_frequency1892f,
        codeStates['setreview_frequency'] = setreview_frequency1892f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const perf_cycle_table26d28Ref = useRef<any>(null);
  const handleClearSearch = () => {
    perf_cycle_table26d28Ref.current?.setSearchParams();
    perf_cycle_table26d28Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(perf_cycle_table26d28) && Object.keys(perf_cycle_table26d28)?.length>0)
      {
        setperf_cycle_table26d28({})
      }
    }else 
      prevRefreshRef.current= true
  }, [perf_cycle_table26d28Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '10 / 136',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setperformancecycles_v1((pre:any)=>({...pre,_selectedGroup_:"perf_cycle_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableperf_cycle_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={perf_cycle_table26d28Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupperf_cycle_table
