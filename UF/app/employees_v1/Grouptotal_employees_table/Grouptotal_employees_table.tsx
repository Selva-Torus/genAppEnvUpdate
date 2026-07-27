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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
      "employee_id",
      "employee_code",
      "full_name",
      "employee_number",
      "work_email",
      "gender",
      "employment_type",
      "hire_date",
      "workmode",
      "employee_status",
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
  const {total_employees_group75b01, settotal_employees_group75b01}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group75b01Props, settotal_employees_group75b01Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13c, setemp_groupdf13c}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13cProps, setemp_groupdf13cProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_id4e73e, setemployee_id4e73e}= useContext(TotalContext) as TotalContextProps;
  const {employee_code47d84, setemployee_code47d84}= useContext(TotalContext) as TotalContextProps;
  const {full_nameff05a, setfull_nameff05a}= useContext(TotalContext) as TotalContextProps;
  const {employee_numberddb89, setemployee_numberddb89}= useContext(TotalContext) as TotalContextProps;
  const {work_email2a2a1, setwork_email2a2a1}= useContext(TotalContext) as TotalContextProps;
  const {gender25d32, setgender25d32}= useContext(TotalContext) as TotalContextProps;
  const {employment_typeb853c, setemployment_typeb853c}= useContext(TotalContext) as TotalContextProps;
  const {hire_date8a106, sethire_date8a106}= useContext(TotalContext) as TotalContextProps;
  const {workmode568a3, setworkmode568a3}= useContext(TotalContext) as TotalContextProps;
  const {employee_status62c4f, setemployee_status62c4f}= useContext(TotalContext) as TotalContextProps;
  const {view_btnc2391, setview_btnc2391}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnb7ae1, setedit_btnb7ae1}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn20022, setdelete_btn20022}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doce1237, setbt_add_doce1237}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "267e1421a9f4452a8ebcf3c4183e694e");
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
    settotal_employees_tablee694eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("employee_id")){
        setemployee_id4e73e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_id4e73e?.isDisabled==null)
      {
        setemployee_id4e73e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_code")){
        setemployee_code47d84((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_code47d84?.isDisabled==null)
      {
        setemployee_code47d84((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_nameff05a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_nameff05a?.isDisabled==null)
      {
        setfull_nameff05a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_number")){
        setemployee_numberddb89((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_numberddb89?.isDisabled==null)
      {
        setemployee_numberddb89((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("work_email")){
        setwork_email2a2a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(work_email2a2a1?.isDisabled==null)
      {
        setwork_email2a2a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("gender")){
        setgender25d32((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(gender25d32?.isDisabled==null)
      {
        setgender25d32((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_type")){
        setemployment_typeb853c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_typeb853c?.isDisabled==null)
      {
        setemployment_typeb853c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hire_date")){
        sethire_date8a106((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(hire_date8a106?.isDisabled==null)
      {
        sethire_date8a106((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("workmode")){
        setworkmode568a3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(workmode568a3?.isDisabled==null)
      {
        setworkmode568a3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_status")){
        setemployee_status62c4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_status62c4f?.isDisabled==null)
      {
        setemployee_status62c4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnc2391((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btnc2391?.isDisabled==null)
      {
        setview_btnc2391((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnb7ae1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btnb7ae1?.isDisabled==null)
      {
        setedit_btnb7ae1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn20022((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btn20022?.isDisabled==null)
      {
        setdelete_btn20022((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_doce1237((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_add_doce1237?.isDisabled==null)
      {
        setbt_add_doce1237((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['total_employees_group'] = total_employees_group75b01,
        codeStates['settotal_employees_group'] = settotal_employees_group75b01,
        codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
        codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
        codeStates['emp_group'] = emp_groupdf13c,
        codeStates['setemp_group'] = setemp_groupdf13c,
        codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
        codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
        codeStates['employee_id'] = employee_id4e73e,
        codeStates['setemployee_id'] = setemployee_id4e73e,
        codeStates['employee_code'] = employee_code47d84,
        codeStates['setemployee_code'] = setemployee_code47d84,
        codeStates['full_name'] = full_nameff05a,
        codeStates['setfull_name'] = setfull_nameff05a,
        codeStates['employee_number'] = employee_numberddb89,
        codeStates['setemployee_number'] = setemployee_numberddb89,
        codeStates['work_email'] = work_email2a2a1,
        codeStates['setwork_email'] = setwork_email2a2a1,
        codeStates['gender'] = gender25d32,
        codeStates['setgender'] = setgender25d32,
        codeStates['employment_type'] = employment_typeb853c,
        codeStates['setemployment_type'] = setemployment_typeb853c,
        codeStates['hire_date'] = hire_date8a106,
        codeStates['sethire_date'] = sethire_date8a106,
        codeStates['workmode'] = workmode568a3,
        codeStates['setworkmode'] = setworkmode568a3,
        codeStates['employee_status'] = employee_status62c4f,
        codeStates['setemployee_status'] = setemployee_status62c4f,
        codeStates['view_btn'] = view_btnc2391,
        codeStates['setview_btn'] = setview_btnc2391,
        codeStates['edit_btn'] = edit_btnb7ae1,
        codeStates['setedit_btn'] = setedit_btnb7ae1,
        codeStates['delete_btn'] = delete_btn20022,
        codeStates['setdelete_btn'] = setdelete_btn20022,
        codeStates['bt_add_doc'] = bt_add_doce1237,
        codeStates['setbt_add_doc'] = setbt_add_doce1237,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_tablee694eRef = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_tablee694eRef.current?.setSearchParams();
    total_employees_tablee694eRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_tablee694e) && Object.keys(total_employees_tablee694e)?.length>0)
      {
        settotal_employees_tablee694e({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_tablee694eProps?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 177',
      
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
          setemployees_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletotal_employees_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={total_employees_tablee694eRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptotal_employees_table
