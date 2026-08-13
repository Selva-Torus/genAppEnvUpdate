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
import Tableamr_queue_table  from './Tableamr_queue_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupamr_queue_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Junior Attorney": {
    "allowedControls": [
      "case_id",
      "venue_id",
      "account_id",
      "debtor_name",
      "court_name",
      "total_balance",
      "priority_name",
      "status_name",
      "view_btn",
      "view_btn_pg_graph",
      "sla_wait_start_time"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
    ],
    "blockedControls": [
      "edit_btn",
      "bt_approve"
    ],
    "readOnlyControls": []
  },
  "Senior Attorney": {
    "allowedControls": [
      "case_id",
      "venue_id",
      "account_id",
      "debtor_name",
      "court_name",
      "total_balance",
      "priority_name",
      "status_name",
      "view_btn",
      "view_btn_pg_graph",
      "bt_approve",
      "sla_wait_start_time"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
    ],
    "blockedControls": [
      "edit_btn"
    ],
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
  const {amr_queue_group79589, setamr_queue_group79589}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group79589Props, setamr_queue_group79589Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4, setamr_group17ac4}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4Props, setamr_group17ac4Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598, setamr_queue_table09598}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598Props, setamr_queue_table09598Props}= useContext(TotalContext) as TotalContextProps;
  const {case_idea43b, setcase_idea43b}= useContext(TotalContext) as TotalContextProps;
  const {venue_id37c04, setvenue_id37c04}= useContext(TotalContext) as TotalContextProps;
  const {account_id4eec9, setaccount_id4eec9}= useContext(TotalContext) as TotalContextProps;
  const {debtor_nameb1ea9, setdebtor_nameb1ea9}= useContext(TotalContext) as TotalContextProps;
  const {court_name5ae4f, setcourt_name5ae4f}= useContext(TotalContext) as TotalContextProps;
  const {total_balance6a331, settotal_balance6a331}= useContext(TotalContext) as TotalContextProps;
  const {priority_name6740a, setpriority_name6740a}= useContext(TotalContext) as TotalContextProps;
  const {status_name86d6c, setstatus_name86d6c}= useContext(TotalContext) as TotalContextProps;
  const {view_btnbd9a5, setview_btnbd9a5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn10d01, setedit_btn10d01}= useContext(TotalContext) as TotalContextProps;
  const {view_btn_pg_graph1baad, setview_btn_pg_graph1baad}= useContext(TotalContext) as TotalContextProps;
  const {bt_approveec5db, setbt_approveec5db}= useContext(TotalContext) as TotalContextProps;
  const {sla_wait_start_time52ae8, setsla_wait_start_time52ae8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {amrqueuetable_v1, setamrqueuetable_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1',
    [user],
    'GroupAmrQueueTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6908a1f13f2c6c3a9936cc860b009598");
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
    setamr_queue_table09598Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("case_id")){
        setcase_idea43b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_idea43b?.isDisabled==null)
      {
        setcase_idea43b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_id")){
        setvenue_id37c04((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_id37c04?.isDisabled==null)
      {
        setvenue_id37c04((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("account_id")){
        setaccount_id4eec9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(account_id4eec9?.isDisabled==null)
      {
        setaccount_id4eec9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debtor_name")){
        setdebtor_nameb1ea9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(debtor_nameb1ea9?.isDisabled==null)
      {
        setdebtor_nameb1ea9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("court_name")){
        setcourt_name5ae4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_name5ae4f?.isDisabled==null)
      {
        setcourt_name5ae4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("total_balance")){
        settotal_balance6a331((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(total_balance6a331?.isDisabled==null)
      {
        settotal_balance6a331((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority_name")){
        setpriority_name6740a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(priority_name6740a?.isDisabled==null)
      {
        setpriority_name6740a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_name")){
        setstatus_name86d6c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(status_name86d6c?.isDisabled==null)
      {
        setstatus_name86d6c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btnbd9a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btnbd9a5?.isDisabled==null)
      {
        setview_btnbd9a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn10d01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btn10d01?.isDisabled==null)
      {
        setedit_btn10d01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn_pg_graph")){
        setview_btn_pg_graph1baad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btn_pg_graph1baad?.isDisabled==null)
      {
        setview_btn_pg_graph1baad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_approve")){
        setbt_approveec5db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_approveec5db?.isDisabled==null)
      {
        setbt_approveec5db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sla_wait_start_time")){
        setsla_wait_start_time52ae8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(sla_wait_start_time52ae8?.isDisabled==null)
      {
        setsla_wait_start_time52ae8((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['amr_queue_group'] = amr_queue_group79589,
        codeStates['setamr_queue_group'] = setamr_queue_group79589,
        codeStates['amr_queue_group79589'] = amr_queue_group79589Props,
        codeStates['setamr_queue_group79589'] = setamr_queue_group79589Props,
        codeStates['amr_group'] = amr_group17ac4,
        codeStates['setamr_group'] = setamr_group17ac4,
        codeStates['amr_group17ac4'] = amr_group17ac4Props,
        codeStates['setamr_group17ac4'] = setamr_group17ac4Props,
        codeStates['amr_queue_table'] = amr_queue_table09598,
        codeStates['setamr_queue_table'] = setamr_queue_table09598,
        codeStates['amr_queue_table09598'] = amr_queue_table09598Props,
        codeStates['setamr_queue_table09598'] = setamr_queue_table09598Props,
        codeStates['case_id'] = case_idea43b,
        codeStates['setcase_id'] = setcase_idea43b,
        codeStates['venue_id'] = venue_id37c04,
        codeStates['setvenue_id'] = setvenue_id37c04,
        codeStates['account_id'] = account_id4eec9,
        codeStates['setaccount_id'] = setaccount_id4eec9,
        codeStates['debtor_name'] = debtor_nameb1ea9,
        codeStates['setdebtor_name'] = setdebtor_nameb1ea9,
        codeStates['court_name'] = court_name5ae4f,
        codeStates['setcourt_name'] = setcourt_name5ae4f,
        codeStates['total_balance'] = total_balance6a331,
        codeStates['settotal_balance'] = settotal_balance6a331,
        codeStates['priority_name'] = priority_name6740a,
        codeStates['setpriority_name'] = setpriority_name6740a,
        codeStates['status_name'] = status_name86d6c,
        codeStates['setstatus_name'] = setstatus_name86d6c,
        codeStates['view_btn'] = view_btnbd9a5,
        codeStates['setview_btn'] = setview_btnbd9a5,
        codeStates['edit_btn'] = edit_btn10d01,
        codeStates['setedit_btn'] = setedit_btn10d01,
        codeStates['view_btn_pg_graph'] = view_btn_pg_graph1baad,
        codeStates['setview_btn_pg_graph'] = setview_btn_pg_graph1baad,
        codeStates['bt_approve'] = bt_approveec5db,
        codeStates['setbt_approve'] = setbt_approveec5db,
        codeStates['sla_wait_start_time'] = sla_wait_start_time52ae8,
        codeStates['setsla_wait_start_time'] = setsla_wait_start_time52ae8,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const amr_queue_table09598Ref = useRef<any>(null);
  const handleClearSearch = () => {
    amr_queue_table09598Ref.current?.setSearchParams();
    amr_queue_table09598Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(amr_queue_table09598) && Object.keys(amr_queue_table09598)?.length>0)
      {
        setamr_queue_table09598({})
      }
    }else 
      prevRefreshRef.current= true
  }, [amr_queue_table09598Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '15 / 159',
      
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
          setamrqueuetable_v1((pre:any)=>({...pre,_selectedGroup_:"amr_queue_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableamr_queue_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={amr_queue_table09598Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupamr_queue_table
