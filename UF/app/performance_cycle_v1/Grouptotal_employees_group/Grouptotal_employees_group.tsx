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
import Groupemp_group  from "../Groupemp_group/Groupemp_group";
import Groupperf_cycle_table  from "../Groupperf_cycle_table/Groupperf_cycle_table";
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
import Buttonbt_search  from "./Buttonbt_search";
import Buttonnew_cycle_button  from "./Buttonnew_cycle_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_employees_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
      "bt_search",
      "new_cycle_button"
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
  const {bt_searchd141a, setbt_searchd141a}= useContext(TotalContext) as TotalContextProps;
  const {new_cycle_button93934, setnew_cycle_button93934}= useContext(TotalContext) as TotalContextProps;
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
    'GroupTotalEmployeesGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b8d51312f35f34aff6513df29b3496b5");
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
    settotal_employees_group496b5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("emp_group")){
        setemp_group0afb1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emp_group0afb1?.isDisabled==null)
      {
        setemp_group0afb1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_search")){
        setbt_searchd141a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_searchd141a?.isDisabled==null)
      {
        setbt_searchd141a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_cycle_button")){
        setnew_cycle_button93934((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(new_cycle_button93934?.isDisabled==null)
      {
        setnew_cycle_button93934((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("perf_cycle_table")){
        setperf_cycle_table26d28((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(perf_cycle_table26d28?.isDisabled==null)
      {
        setperf_cycle_table26d28((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['bt_search'] = bt_searchd141a,
        codeStates['setbt_search'] = setbt_searchd141a,
        codeStates['new_cycle_button'] = new_cycle_button93934,
        codeStates['setnew_cycle_button'] = setnew_cycle_button93934,
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
        codeStates['bt_search'] = bt_searchd141a,
        codeStates['setbt_search'] = setbt_searchd141a,
        codeStates['new_cycle_button'] = new_cycle_button93934,
        codeStates['setnew_cycle_button'] = setnew_cycle_button93934,
        codeStates['perf_cycle_table'] = perf_cycle_table26d28,
        codeStates['setperf_cycle_table'] = setperf_cycle_table26d28,
        codeStates['perf_cycle_table26d28'] = perf_cycle_table26d28Props,
        codeStates['setperf_cycle_table26d28'] = setperf_cycle_table26d28Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_group496b5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_group496b5Ref.current?.setSearchParams();
    total_employees_group496b5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_group496b5) && Object.keys(total_employees_group496b5)?.length>0)
      {
        settotal_employees_group496b5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_group496b5Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 139',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'',
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
          setperformancecycles_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_group"}))
        }}
    >
        {allowedComponent.includes("emp_group")  &&<Groupemp_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("perf_cycle_table")  &&<Groupperf_cycle_table  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {        ((ruleData?.length>0 && "bt_search" in ButtonGoRuleData)?ButtonGoRuleData["bt_search"]:true) && 
          allowedControls.includes("bt_search")  ?            <Buttonbt_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_cycle_button" in ButtonGoRuleData)?ButtonGoRuleData["new_cycle_button"]:true) && 
          allowedControls.includes("new_cycle_button")  ?            <Buttonnew_cycle_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouptotal_employees_group
