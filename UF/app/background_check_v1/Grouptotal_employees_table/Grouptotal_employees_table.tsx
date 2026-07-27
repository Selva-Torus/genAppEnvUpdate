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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
      "check_id",
      "full_name",
      "check_type",
      "initiated_date",
      "completed_date",
      "result",
      "verification_status",
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
  const {total_employees_group455f5, settotal_employees_group455f5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group455f5Props, settotal_employees_group455f5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7, setemp_groupe44b7}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7Props, setemp_groupe44b7Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  const {check_idc0499, setcheck_idc0499}= useContext(TotalContext) as TotalContextProps;
  const {full_name8459f, setfull_name8459f}= useContext(TotalContext) as TotalContextProps;
  const {check_type67f55, setcheck_type67f55}= useContext(TotalContext) as TotalContextProps;
  const {initiated_dated326f, setinitiated_dated326f}= useContext(TotalContext) as TotalContextProps;
  const {completed_dateb46ea, setcompleted_dateb46ea}= useContext(TotalContext) as TotalContextProps;
  const {result428b3, setresult428b3}= useContext(TotalContext) as TotalContextProps;
  const {verification_status34423, setverification_status34423}= useContext(TotalContext) as TotalContextProps;
  const {view_btn75e2e, setview_btn75e2e}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd5238, setedit_btnd5238}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnd268c, setdelete_btnd268c}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doc1691b, setbt_add_doc1691b}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "33564afe78fbb2cdfc338e23720379da");
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
    settotal_employees_table379daProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("check_id")){
        setcheck_idc0499((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_idc0499?.isDisabled==null)
      {
        setcheck_idc0499((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name8459f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name8459f?.isDisabled==null)
      {
        setfull_name8459f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("check_type")){
        setcheck_type67f55((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_type67f55?.isDisabled==null)
      {
        setcheck_type67f55((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_date")){
        setinitiated_dated326f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(initiated_dated326f?.isDisabled==null)
      {
        setinitiated_dated326f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("completed_date")){
        setcompleted_dateb46ea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(completed_dateb46ea?.isDisabled==null)
      {
        setcompleted_dateb46ea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("result")){
        setresult428b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(result428b3?.isDisabled==null)
      {
        setresult428b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("verification_status")){
        setverification_status34423((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(verification_status34423?.isDisabled==null)
      {
        setverification_status34423((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn75e2e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btn75e2e?.isDisabled==null)
      {
        setview_btn75e2e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnd5238((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btnd5238?.isDisabled==null)
      {
        setedit_btnd5238((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnd268c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btnd268c?.isDisabled==null)
      {
        setdelete_btnd268c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_add_doc")){
        setbt_add_doc1691b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_add_doc1691b?.isDisabled==null)
      {
        setbt_add_doc1691b((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['total_employees_group'] = total_employees_group455f5,
        codeStates['settotal_employees_group'] = settotal_employees_group455f5,
        codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
        codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
        codeStates['emp_group'] = emp_groupe44b7,
        codeStates['setemp_group'] = setemp_groupe44b7,
        codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
        codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
        codeStates['total_employees_table'] = total_employees_table379da,
        codeStates['settotal_employees_table'] = settotal_employees_table379da,
        codeStates['total_employees_table379da'] = total_employees_table379daProps,
        codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
        codeStates['check_id'] = check_idc0499,
        codeStates['setcheck_id'] = setcheck_idc0499,
        codeStates['full_name'] = full_name8459f,
        codeStates['setfull_name'] = setfull_name8459f,
        codeStates['check_type'] = check_type67f55,
        codeStates['setcheck_type'] = setcheck_type67f55,
        codeStates['initiated_date'] = initiated_dated326f,
        codeStates['setinitiated_date'] = setinitiated_dated326f,
        codeStates['completed_date'] = completed_dateb46ea,
        codeStates['setcompleted_date'] = setcompleted_dateb46ea,
        codeStates['result'] = result428b3,
        codeStates['setresult'] = setresult428b3,
        codeStates['verification_status'] = verification_status34423,
        codeStates['setverification_status'] = setverification_status34423,
        codeStates['view_btn'] = view_btn75e2e,
        codeStates['setview_btn'] = setview_btn75e2e,
        codeStates['edit_btn'] = edit_btnd5238,
        codeStates['setedit_btn'] = setedit_btnd5238,
        codeStates['delete_btn'] = delete_btnd268c,
        codeStates['setdelete_btn'] = setdelete_btnd268c,
        codeStates['bt_add_doc'] = bt_add_doc1691b,
        codeStates['setbt_add_doc'] = setbt_add_doc1691b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_employees_table379daRef = useRef<any>(null);
  const handleClearSearch = () => {
    total_employees_table379daRef.current?.setSearchParams();
    total_employees_table379daRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(total_employees_table379da) && Object.keys(total_employees_table379da)?.length>0)
      {
        settotal_employees_table379da({})
      }
    }else 
      prevRefreshRef.current= true
  }, [total_employees_table379daProps?.refresh,token])


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
          setbackgroundcheck_v1((pre:any)=>({...pre,_selectedGroup_:"total_employees_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletotal_employees_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={total_employees_table379daRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptotal_employees_table
