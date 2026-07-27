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
import Textemps_text  from "./Textemps_text";
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
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
      "emps_text"
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
  const {total_employees_group75b01, settotal_employees_group75b01}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group75b01Props, settotal_employees_group75b01Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13c, setemp_groupdf13c}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13cProps, setemp_groupdf13cProps}= useContext(TotalContext) as TotalContextProps;
  const {emps_text99d1f, setemps_text99d1f}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employees_v1, setemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f6621112331047bbb07a5a1cc92df13c");
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
    setemp_groupdf13cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("emps_text")){
        setemps_text99d1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emps_text99d1f?.isDisabled==null)
      {
        setemps_text99d1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['total_employees_group'] = total_employees_group75b01,
        codeStates['settotal_employees_group'] = settotal_employees_group75b01,
        codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
        codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
        codeStates['emp_group'] = emp_groupdf13c,
        codeStates['setemp_group'] = setemp_groupdf13c,
        codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
        codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
        codeStates['emps_text'] = emps_text99d1f,
        codeStates['setemps_text'] = setemps_text99d1f,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,

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
        codeStates['total_employees_group'] = total_employees_group75b01,
        codeStates['settotal_employees_group'] = settotal_employees_group75b01,
        codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
        codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
        codeStates['emp_group'] = emp_groupdf13c,
        codeStates['setemp_group'] = setemp_groupdf13c,
        codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
        codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
        codeStates['emps_text'] = emps_text99d1f,
        codeStates['setemps_text'] = setemps_text99d1f,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const emp_groupdf13cRef = useRef<any>(null);
  const handleClearSearch = () => {
    emp_groupdf13cRef.current?.setSearchParams();
    emp_groupdf13cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(emp_groupdf13c) && Object.keys(emp_groupdf13c)?.length>0)
      {
        setemp_groupdf13c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [emp_groupdf13cProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 5',
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
          setemployees_v1((pre:any)=>({...pre,_selectedGroup_:"emp_group"}))
        }}
    >
          {allowedControls.includes("emps_text") ?<Textemps_text   /* 99d1f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupemp_group
