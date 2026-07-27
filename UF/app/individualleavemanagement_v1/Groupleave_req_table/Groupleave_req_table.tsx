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
import Tableleave_req_table  from './Tableleave_req_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupleave_req_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_individualleavereqtable_v1Props, setdfd_individualleavereqtable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavepiechart_v1Props, setdfd_leavepiechart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_individualleavereqcards_v1Props, setdfd_individualleavereqcards_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_req_id",
      "leave_request_number",
      "leave_type",
      "start_date",
      "end_date",
      "days_requested",
      "trs_event_process_status",
      "view_bt",
      "attach_bt"
    ],
    "allowedGroups": [
      "canvas",
      "hrm_dashboard_group",
      "total_employees_group",
      "leave_requests_group",
      "onboarding_group",
      "chart_group",
      "leave_group",
      "leave_req_table"
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
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id6149c, setleave_req_id6149c}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number962d5, setleave_request_number962d5}= useContext(TotalContext) as TotalContextProps;
  const {leave_type274e3, setleave_type274e3}= useContext(TotalContext) as TotalContextProps;
  const {start_date502ce, setstart_date502ce}= useContext(TotalContext) as TotalContextProps;
  const {end_date285f8, setend_date285f8}= useContext(TotalContext) as TotalContextProps;
  const {days_requesteda438c, setdays_requesteda438c}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_statusdd679, settrs_event_process_statusdd679}= useContext(TotalContext) as TotalContextProps;
  const {view_btb1a53, setview_btb1a53}= useContext(TotalContext) as TotalContextProps;
  const {attach_btcee90, setattach_btcee90}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {individualleavemanagement_v1, setindividualleavemanagement_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1',
    [user],
    'GroupLeaveReqTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6ae8b086b23d14630c1c13c329c1dfa0");
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
    setleave_req_table1dfa0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_req_id")){
        setleave_req_id6149c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_id6149c?.isDisabled==null)
      {
        setleave_req_id6149c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_request_number")){
        setleave_request_number962d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_request_number962d5?.isDisabled==null)
      {
        setleave_request_number962d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_type")){
        setleave_type274e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_type274e3?.isDisabled==null)
      {
        setleave_type274e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("start_date")){
        setstart_date502ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(start_date502ce?.isDisabled==null)
      {
        setstart_date502ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("end_date")){
        setend_date285f8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(end_date285f8?.isDisabled==null)
      {
        setend_date285f8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("days_requested")){
        setdays_requesteda438c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(days_requesteda438c?.isDisabled==null)
      {
        setdays_requesteda438c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_event_process_status")){
        settrs_event_process_statusdd679((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_event_process_statusdd679?.isDisabled==null)
      {
        settrs_event_process_statusdd679((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_bt")){
        setview_btb1a53((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btb1a53?.isDisabled==null)
      {
        setview_btb1a53((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attach_bt")){
        setattach_btcee90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attach_btcee90?.isDisabled==null)
      {
        setattach_btcee90((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
        codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
        codeStates['total_employees_group'] = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['total_employees_group69415'] = total_employees_group69415Props,
        codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
        codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
        codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
        codeStates['onboarding_group'] = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
        codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
        codeStates['chart_group'] = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
        codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
        codeStates['leave_group'] = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_group1d83d'] = leave_group1d83dProps,
        codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
        codeStates['leave_req_table'] = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
        codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
        codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
        codeStates['leave_req_id'] = leave_req_id6149c,
        codeStates['setleave_req_id'] = setleave_req_id6149c,
        codeStates['leave_request_number'] = leave_request_number962d5,
        codeStates['setleave_request_number'] = setleave_request_number962d5,
        codeStates['leave_type'] = leave_type274e3,
        codeStates['setleave_type'] = setleave_type274e3,
        codeStates['start_date'] = start_date502ce,
        codeStates['setstart_date'] = setstart_date502ce,
        codeStates['end_date'] = end_date285f8,
        codeStates['setend_date'] = setend_date285f8,
        codeStates['days_requested'] = days_requesteda438c,
        codeStates['setdays_requested'] = setdays_requesteda438c,
        codeStates['trs_event_process_status'] = trs_event_process_statusdd679,
        codeStates['settrs_event_process_status'] = settrs_event_process_statusdd679,
        codeStates['view_bt'] = view_btb1a53,
        codeStates['setview_bt'] = setview_btb1a53,
        codeStates['attach_bt'] = attach_btcee90,
        codeStates['setattach_bt'] = setattach_btcee90,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const leave_req_table1dfa0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    leave_req_table1dfa0Ref.current?.setSearchParams();
    leave_req_table1dfa0Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(leave_req_table1dfa0) && Object.keys(leave_req_table1dfa0)?.length>0)
      {
        setleave_req_table1dfa0({})
      }
    }else 
      prevRefreshRef.current= true
  }, [leave_req_table1dfa0Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 101',
      
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
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setindividualleavemanagement_v1((pre:any)=>({...pre,_selectedGroup_:"leave_req_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableleave_req_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={leave_req_table1dfa0Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupleave_req_table
