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
import Tabletotal_employees_table  from './Tabletotal_employees_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_employees_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_leavepolicy_v1Props, setdfd_leavepolicy_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
      "policy_id",
      "policy_code",
      "policy_name",
      "leave_type",
      "days_per_year",
      "applicable_to",
      "trs_event_process_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "bt_add_doc"
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
  const {total_employees_group93757, settotal_employees_group93757}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group93757Props, settotal_employees_group93757Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312a, setemp_group3312a}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312aProps, setemp_group3312aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51, settotal_employees_table02f51}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51Props, settotal_employees_table02f51Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_id59787, setpolicy_id59787}= useContext(TotalContext) as TotalContextProps;
  const {policy_code26cc7, setpolicy_code26cc7}= useContext(TotalContext) as TotalContextProps;
  const {policy_name2dc31, setpolicy_name2dc31}= useContext(TotalContext) as TotalContextProps;
  const {leave_type6ad16, setleave_type6ad16}= useContext(TotalContext) as TotalContextProps;
  const {days_per_yearcee52, setdays_per_yearcee52}= useContext(TotalContext) as TotalContextProps;
  const {applicable_tod9dcb, setapplicable_tod9dcb}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_status42183, settrs_event_process_status42183}= useContext(TotalContext) as TotalContextProps;
  const {view_btn766f2, setview_btn766f2}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn5600b, setedit_btn5600b}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn8376d, setdelete_btn8376d}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docc7a1b, setbt_add_docc7a1b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavepolicy_v1, setleavepolicy_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicy:AFVK:v1',
    [user],
    'GroupTotalEmployeesTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9fa367ce3d1da5763dd7401922002f51");
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
    settotal_employees_table02f51Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("policy_id")){
        setpolicy_id59787((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_id59787?.isDisabled==null)
      {
        setpolicy_id59787((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_code")){
        setpolicy_code26cc7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_code26cc7?.isDisabled==null)
      {
        setpolicy_code26cc7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_name2dc31((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_name2dc31?.isDisabled==null)
      {
        setpolicy_name2dc31((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_type")){
        setleave_type6ad16((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_type6ad16?.isDisabled==null)
      {
        setleave_type6ad16((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("days_per_year")){
        setdays_per_yearcee52((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(days_per_yearcee52?.isDisabled==null)
      {
        setdays_per_yearcee52((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applicable_to")){
        setapplicable_tod9dcb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(applicable_tod9dcb?.isDisabled==null)
      {
        setapplicable_tod9dcb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_event_process_status")){
        settrs_event_process_status42183((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_event_process_status42183?.isDisabled==null)
      {
        settrs_event_process_status42183((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn766f2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btn766f2?.isDisabled==null)
      {
        setview_btn766f2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn5600b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btn5600b?.isDisabled==null)
      {
        setedit_btn5600b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn8376d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btn8376d?.isDisabled==null)
      {
        setdelete_btn8376d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_docc7a1b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_add_docc7a1b?.isDisabled==null)
      {
        setbt_add_docc7a1b((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['total_employees_group'] = total_employees_group93757,
        codeStates['settotal_employees_group'] = settotal_employees_group93757,
        codeStates['total_employees_group93757'] = total_employees_group93757Props,
        codeStates['settotal_employees_group93757'] = settotal_employees_group93757Props,
        codeStates['emp_group'] = emp_group3312a,
        codeStates['setemp_group'] = setemp_group3312a,
        codeStates['emp_group3312a'] = emp_group3312aProps,
        codeStates['setemp_group3312a'] = setemp_group3312aProps,
        codeStates['total_employees_table'] = total_employees_table02f51,
        codeStates['settotal_employees_table'] = settotal_employees_table02f51,
        codeStates['total_employees_table02f51'] = total_employees_table02f51Props,
        codeStates['settotal_employees_table02f51'] = settotal_employees_table02f51Props,
        codeStates['policy_id'] = policy_id59787,
        codeStates['setpolicy_id'] = setpolicy_id59787,
        codeStates['policy_code'] = policy_code26cc7,
        codeStates['setpolicy_code'] = setpolicy_code26cc7,
        codeStates['policy_name'] = policy_name2dc31,
        codeStates['setpolicy_name'] = setpolicy_name2dc31,
        codeStates['leave_type'] = leave_type6ad16,
        codeStates['setleave_type'] = setleave_type6ad16,
        codeStates['days_per_year'] = days_per_yearcee52,
        codeStates['setdays_per_year'] = setdays_per_yearcee52,
        codeStates['applicable_to'] = applicable_tod9dcb,
        codeStates['setapplicable_to'] = setapplicable_tod9dcb,
        codeStates['trs_event_process_status'] = trs_event_process_status42183,
        codeStates['settrs_event_process_status'] = settrs_event_process_status42183,
        codeStates['view_btn'] = view_btn766f2,
        codeStates['setview_btn'] = setview_btn766f2,
        codeStates['edit_btn'] = edit_btn5600b,
        codeStates['setedit_btn'] = setedit_btn5600b,
        codeStates['delete_btn'] = delete_btn8376d,
        codeStates['setdelete_btn'] = setdelete_btn8376d,
        codeStates['bt_add_doc'] = bt_add_docc7a1b,
        codeStates['setbt_add_doc'] = setbt_add_docc7a1b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_table02f51Ref = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_table02f51Ref.current?.setSearchParams();
    total_employees_table02f51Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_table02f51) && Object.keys(total_employees_table02f51)?.length>0)
      {
        settotal_employees_table02f51({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_table02f51Props?.refresh,token])


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
          setleavepolicy_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletotal_employees_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={total_employees_table02f51Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptotal_employees_table
