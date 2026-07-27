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
import Grouptotal_employees_table  from "../Grouptotal_employees_table/Grouptotal_employees_table";
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
import Buttonnew_check_button  from "./Buttonnew_check_button";
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
  const {dfd_backgroundcheck_v1Props, setdfd_backgroundcheck_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "bt_search",
      "new_check_button"
    ],
    "allowedGroups": [
      "canvas",
      "total_employees_group",
      "emp_group",
      "total_employees_table"
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
  const {total_employees_group455f5, settotal_employees_group455f5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group455f5Props, settotal_employees_group455f5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7, setemp_groupe44b7}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7Props, setemp_groupe44b7Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_searchfeae1, setbt_searchfeae1}= useContext(TotalContext) as TotalContextProps;
  const {new_check_button0edbf, setnew_check_button0edbf}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {backgroundcheck_v1, setbackgroundcheck_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a3e97cefbc5e061cdf58db82fe5455f5");
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
    settotal_employees_group455f5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("emp_group")){
        setemp_groupe44b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emp_groupe44b7?.isDisabled==null)
      {
        setemp_groupe44b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_search")){
        setbt_searchfeae1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_searchfeae1?.isDisabled==null)
      {
        setbt_searchfeae1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_check_button")){
        setnew_check_button0edbf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(new_check_button0edbf?.isDisabled==null)
      {
        setnew_check_button0edbf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_employees_table")){
        settotal_employees_table379da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_employees_table379da?.isDisabled==null)
      {
        settotal_employees_table379da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['total_employees_group'] = total_employees_group455f5,
        codeStates['settotal_employees_group'] = settotal_employees_group455f5,
        codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
        codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
        codeStates['emp_group'] = emp_groupe44b7,
        codeStates['setemp_group'] = setemp_groupe44b7,
        codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
        codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
        codeStates['bt_search'] = bt_searchfeae1,
        codeStates['setbt_search'] = setbt_searchfeae1,
        codeStates['new_check_button'] = new_check_button0edbf,
        codeStates['setnew_check_button'] = setnew_check_button0edbf,
        codeStates['total_employees_table'] = total_employees_table379da,
        codeStates['settotal_employees_table'] = settotal_employees_table379da,
        codeStates['total_employees_table379da'] = total_employees_table379daProps,
        codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,

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
        codeStates['total_employees_group'] = total_employees_group455f5,
        codeStates['settotal_employees_group'] = settotal_employees_group455f5,
        codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
        codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
        codeStates['emp_group'] = emp_groupe44b7,
        codeStates['setemp_group'] = setemp_groupe44b7,
        codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
        codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
        codeStates['bt_search'] = bt_searchfeae1,
        codeStates['setbt_search'] = setbt_searchfeae1,
        codeStates['new_check_button'] = new_check_button0edbf,
        codeStates['setnew_check_button'] = setnew_check_button0edbf,
        codeStates['total_employees_table'] = total_employees_table379da,
        codeStates['settotal_employees_table'] = settotal_employees_table379da,
        codeStates['total_employees_table379da'] = total_employees_table379daProps,
        codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_group455f5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_group455f5Ref.current?.setSearchParams();
    total_employees_group455f5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_group455f5) && Object.keys(total_employees_group455f5)?.length>0)
      {
        settotal_employees_group455f5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_group455f5Props?.refresh,token])


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
          setbackgroundcheck_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_group"}))
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
        {allowedComponent.includes("total_employees_table")  &&<Grouptotal_employees_table  
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
        {        ((ruleData?.length>0 && "new_check_button" in ButtonGoRuleData)?ButtonGoRuleData["new_check_button"]:true) && 
          allowedControls.includes("new_check_button")  ?            <Buttonnew_check_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouptotal_employees_group
