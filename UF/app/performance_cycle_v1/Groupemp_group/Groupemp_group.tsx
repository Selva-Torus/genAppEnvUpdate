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
import Textperf_text  from "./Textperf_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupemp_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
      "perf_text"
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
  const {perf_textb0e01, setperf_textb0e01}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28, setperf_cycle_table26d28}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table26d28Props, setperf_cycle_table26d28Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupEmpGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "131280543c1de635615000d13750afb1");
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
    setemp_group0afb1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("perf_text")){
        setperf_textb0e01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(perf_textb0e01?.isDisabled==null)
      {
        setperf_textb0e01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['total_employees_group'] = total_employees_group496b5,
        codeStates['settotal_employees_group'] = settotal_employees_group496b5,
        codeStates['total_employees_group496b5'] = total_employees_group496b5Props,
        codeStates['settotal_employees_group496b5'] = settotal_employees_group496b5Props,
        codeStates['emp_group'] = emp_group0afb1,
        codeStates['setemp_group'] = setemp_group0afb1,
        codeStates['emp_group0afb1'] = emp_group0afb1Props,
        codeStates['setemp_group0afb1'] = setemp_group0afb1Props,
        codeStates['perf_text'] = perf_textb0e01,
        codeStates['setperf_text'] = setperf_textb0e01,
        codeStates['perf_cycle_table'] = perf_cycle_table26d28,
        codeStates['setperf_cycle_table'] = setperf_cycle_table26d28,
        codeStates['perf_cycle_table26d28'] = perf_cycle_table26d28Props,
        codeStates['setperf_cycle_table26d28'] = setperf_cycle_table26d28Props,

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
        codeStates['total_employees_group'] = total_employees_group496b5,
        codeStates['settotal_employees_group'] = settotal_employees_group496b5,
        codeStates['total_employees_group496b5'] = total_employees_group496b5Props,
        codeStates['settotal_employees_group496b5'] = settotal_employees_group496b5Props,
        codeStates['emp_group'] = emp_group0afb1,
        codeStates['setemp_group'] = setemp_group0afb1,
        codeStates['emp_group0afb1'] = emp_group0afb1Props,
        codeStates['setemp_group0afb1'] = setemp_group0afb1Props,
        codeStates['perf_text'] = perf_textb0e01,
        codeStates['setperf_text'] = setperf_textb0e01,
        codeStates['perf_cycle_table'] = perf_cycle_table26d28,
        codeStates['setperf_cycle_table'] = setperf_cycle_table26d28,
        codeStates['perf_cycle_table26d28'] = perf_cycle_table26d28Props,
        codeStates['setperf_cycle_table26d28'] = setperf_cycle_table26d28Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const emp_group0afb1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    emp_group0afb1Ref.current?.setSearchParams();
    emp_group0afb1Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(emp_group0afb1) && Object.keys(emp_group0afb1)?.length>0)
      {
        setemp_group0afb1({})
      }
    }else 
      prevRefreshRef.current= true
  }, [emp_group0afb1Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 7',
        gridRow: '1 / 9',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setperformancecycles_v1((pre:any)=>({...pre,_selectedGroup_:"emp_group"}))
        }}
    >
          {allowedControls.includes("perf_text") ?<Textperf_text   /* b0e01 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupemp_group
