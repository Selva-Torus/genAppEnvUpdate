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
import Textleave_management  from "./Textleave_management";
import Buttonsearch_button  from "./Buttonsearch_button";
import Grouptab_group  from "../Grouptab_group/Grouptab_group";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_leaverequesttab_v1Props, setdfd_leaverequesttab_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leaveapprovalpendingtab_v1Props, setdfd_leaveapprovalpendingtab_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_management",
      "search_button"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "tab_group",
      "leave_request_table",
      "emp_table_group",
      "leave_req_tables",
      "approval_pending",
      "leave_approval_pending_group",
      "approval_pending_table"
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
  const {overall_group3fa8c, setoverall_group3fa8c}= useContext(TotalContext) as TotalContextProps;
  const {overall_group3fa8cProps, setoverall_group3fa8cProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_management4632d, setleave_management4632d}= useContext(TotalContext) as TotalContextProps;
  const {search_buttonc7fc6, setsearch_buttonc7fc6}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233, setleave_request_table25233}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233Props, setleave_request_table25233Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cdProps, setemp_table_group0a9cdProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32bProps, setleave_req_tablesbb32bProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0bProps, setapproval_pendinge1c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leaverequest_v1, setleaverequest_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1',
    [user],
    'GroupOverallGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "516a7bcb00774d49883ad3c9d003fa8c");
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
    setoverall_group3fa8cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_management")){
        setleave_management4632d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_management4632d?.isDisabled==null)
      {
        setleave_management4632d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_button")){
        setsearch_buttonc7fc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(search_buttonc7fc6?.isDisabled==null)
      {
        setsearch_buttonc7fc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tab_group")){
        settab_groupfe908((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(tab_groupfe908?.isDisabled==null)
      {
        settab_groupfe908((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group3fa8c,
        codeStates['setoverall_group'] = setoverall_group3fa8c,
        codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
        codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
        codeStates['leave_management'] = leave_management4632d,
        codeStates['setleave_management'] = setleave_management4632d,
        codeStates['search_button'] = search_buttonc7fc6,
        codeStates['setsearch_button'] = setsearch_buttonc7fc6,
        codeStates['tab_group'] = tab_groupfe908,
        codeStates['settab_group'] = settab_groupfe908,
        codeStates['leave_request_table'] = leave_request_table25233,
        codeStates['setleave_request_table'] = setleave_request_table25233,
        codeStates['leave_request_table25233'] = leave_request_table25233Props,
        codeStates['setleave_request_table25233'] = setleave_request_table25233Props,
        codeStates['emp_table_group'] = emp_table_group0a9cd,
        codeStates['setemp_table_group'] = setemp_table_group0a9cd,
        codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
        codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
        codeStates['leave_req_tables'] = leave_req_tablesbb32b,
        codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
        codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
        codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
        codeStates['approval_pending'] = approval_pendinge1c0b,
        codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
        codeStates['approval_pendinge1c0b'] = approval_pendinge1c0bProps,
        codeStates['setapproval_pendinge1c0b'] = setapproval_pendinge1c0bProps,
        codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
        codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
        codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
        codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
        codeStates['approval_pending_table'] = approval_pending_tablee294f,
        codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
        codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
        codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,

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
        codeStates['overall_group'] = overall_group3fa8c,
        codeStates['setoverall_group'] = setoverall_group3fa8c,
        codeStates['overall_group3fa8c'] = overall_group3fa8cProps,
        codeStates['setoverall_group3fa8c'] = setoverall_group3fa8cProps,
        codeStates['leave_management'] = leave_management4632d,
        codeStates['setleave_management'] = setleave_management4632d,
        codeStates['search_button'] = search_buttonc7fc6,
        codeStates['setsearch_button'] = setsearch_buttonc7fc6,
        codeStates['tab_group'] = tab_groupfe908,
        codeStates['settab_group'] = settab_groupfe908,
        codeStates['leave_request_table'] = leave_request_table25233,
        codeStates['setleave_request_table'] = setleave_request_table25233,
        codeStates['leave_request_table25233'] = leave_request_table25233Props,
        codeStates['setleave_request_table25233'] = setleave_request_table25233Props,
        codeStates['emp_table_group'] = emp_table_group0a9cd,
        codeStates['setemp_table_group'] = setemp_table_group0a9cd,
        codeStates['emp_table_group0a9cd'] = emp_table_group0a9cdProps,
        codeStates['setemp_table_group0a9cd'] = setemp_table_group0a9cdProps,
        codeStates['leave_req_tables'] = leave_req_tablesbb32b,
        codeStates['setleave_req_tables'] = setleave_req_tablesbb32b,
        codeStates['leave_req_tablesbb32b'] = leave_req_tablesbb32bProps,
        codeStates['setleave_req_tablesbb32b'] = setleave_req_tablesbb32bProps,
        codeStates['approval_pending'] = approval_pendinge1c0b,
        codeStates['setapproval_pending'] = setapproval_pendinge1c0b,
        codeStates['approval_pendinge1c0b'] = approval_pendinge1c0bProps,
        codeStates['setapproval_pendinge1c0b'] = setapproval_pendinge1c0bProps,
        codeStates['leave_approval_pending_group'] = leave_approval_pending_group05215,
        codeStates['setleave_approval_pending_group'] = setleave_approval_pending_group05215,
        codeStates['leave_approval_pending_group05215'] = leave_approval_pending_group05215Props,
        codeStates['setleave_approval_pending_group05215'] = setleave_approval_pending_group05215Props,
        codeStates['approval_pending_table'] = approval_pending_tablee294f,
        codeStates['setapproval_pending_table'] = setapproval_pending_tablee294f,
        codeStates['approval_pending_tablee294f'] = approval_pending_tablee294fProps,
        codeStates['setapproval_pending_tablee294f'] = setapproval_pending_tablee294fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_group3fa8cRef = useRef<any>(null);
  const handleClearSearch = () => {
    overall_group3fa8cRef.current?.setSearchParams();
    overall_group3fa8cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_group3fa8c) && Object.keys(overall_group3fa8c)?.length>0)
      {
        setoverall_group3fa8c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_group3fa8cProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 146',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
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
          setleaverequest_v1((pre:any)=>({...pre,_selectedGroup_:"overall_group"}))
        }}
    >
        {allowedComponent.includes("tab_group")  &&<Grouptab_group  
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
          {allowedControls.includes("leave_management") ?<Textleave_management   /* 4632d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "search_button" in ButtonGoRuleData)?ButtonGoRuleData["search_button"]:true) && 
          allowedControls.includes("search_button")  ?            <Buttonsearch_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupoverall_group
