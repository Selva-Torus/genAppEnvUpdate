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
  "Branch Manager": {
    "allowedControls": [
      "account_id",
      "case_id",
      "debtor_name",
      "creditor_name",
      "full_name",
      "total_balance",
      "court_name",
      "priority_name",
      "status_name",
      "trs_created_date",
      "view_btn",
      "view_btn_pg_graph",
      "bt_approve"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
    ],
    "blockedControls": [
      "venue_id",
      "edit_btn"
    ],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "account_id",
      "case_id",
      "debtor_name",
      "creditor_name",
      "full_name",
      "total_balance",
      "court_name",
      "priority_name",
      "status_name",
      "trs_created_date",
      "view_btn",
      "view_btn_pg_graph",
      "bt_approve"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
    ],
    "blockedControls": [
      "venue_id",
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
  const {account_id9a546, setaccount_id9a546}= useContext(TotalContext) as TotalContextProps;
  const {case_id734ed, setcase_id734ed}= useContext(TotalContext) as TotalContextProps;
  const {debtor_nameb1ea9, setdebtor_nameb1ea9}= useContext(TotalContext) as TotalContextProps;
  const {creditor_namee48d1, setcreditor_namee48d1}= useContext(TotalContext) as TotalContextProps;
  const {full_name7a369, setfull_name7a369}= useContext(TotalContext) as TotalContextProps;
  const {total_balance6a331, settotal_balance6a331}= useContext(TotalContext) as TotalContextProps;
  const {court_name5ae4f, setcourt_name5ae4f}= useContext(TotalContext) as TotalContextProps;
  const {priority_name6740a, setpriority_name6740a}= useContext(TotalContext) as TotalContextProps;
  const {status_name86d6c, setstatus_name86d6c}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date92fe2, settrs_created_date92fe2}= useContext(TotalContext) as TotalContextProps;
  const {venue_idb51d8, setvenue_idb51d8}= useContext(TotalContext) as TotalContextProps;
  const {view_btnbd9a5, setview_btnbd9a5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn10d01, setedit_btn10d01}= useContext(TotalContext) as TotalContextProps;
  const {view_btn_pg_graph1baad, setview_btn_pg_graph1baad}= useContext(TotalContext) as TotalContextProps;
  const {bt_approveec5db, setbt_approveec5db}= useContext(TotalContext) as TotalContextProps;
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
    if(orchestrationData?.data?.readableControls.includes("account_id")){
        setaccount_id9a546((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(account_id9a546?.isDisabled==null)
      {
        setaccount_id9a546((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("case_id")){
        setcase_id734ed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(case_id734ed?.isDisabled==null)
      {
        setcase_id734ed((pre:any)=>({...pre,isDisabled:false}));
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
    if(orchestrationData?.data?.readableControls.includes("creditor_name")){
        setcreditor_namee48d1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(creditor_namee48d1?.isDisabled==null)
      {
        setcreditor_namee48d1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name7a369((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name7a369?.isDisabled==null)
      {
        setfull_name7a369((pre:any)=>({...pre,isDisabled:false}));
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
    if(orchestrationData?.data?.readableControls.includes("court_name")){
        setcourt_name5ae4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(court_name5ae4f?.isDisabled==null)
      {
        setcourt_name5ae4f((pre:any)=>({...pre,isDisabled:false}));
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
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date92fe2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_date92fe2?.isDisabled==null)
      {
        settrs_created_date92fe2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("venue_id")){
        setvenue_idb51d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(venue_idb51d8?.isDisabled==null)
      {
        setvenue_idb51d8((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['account_id'] = account_id9a546,
        codeStates['setaccount_id'] = setaccount_id9a546,
        codeStates['case_id'] = case_id734ed,
        codeStates['setcase_id'] = setcase_id734ed,
        codeStates['debtor_name'] = debtor_nameb1ea9,
        codeStates['setdebtor_name'] = setdebtor_nameb1ea9,
        codeStates['creditor_name'] = creditor_namee48d1,
        codeStates['setcreditor_name'] = setcreditor_namee48d1,
        codeStates['full_name'] = full_name7a369,
        codeStates['setfull_name'] = setfull_name7a369,
        codeStates['total_balance'] = total_balance6a331,
        codeStates['settotal_balance'] = settotal_balance6a331,
        codeStates['court_name'] = court_name5ae4f,
        codeStates['setcourt_name'] = setcourt_name5ae4f,
        codeStates['priority_name'] = priority_name6740a,
        codeStates['setpriority_name'] = setpriority_name6740a,
        codeStates['status_name'] = status_name86d6c,
        codeStates['setstatus_name'] = setstatus_name86d6c,
        codeStates['trs_created_date'] = trs_created_date92fe2,
        codeStates['settrs_created_date'] = settrs_created_date92fe2,
        codeStates['venue_id'] = venue_idb51d8,
        codeStates['setvenue_id'] = setvenue_idb51d8,
        codeStates['view_btn'] = view_btnbd9a5,
        codeStates['setview_btn'] = setview_btnbd9a5,
        codeStates['edit_btn'] = edit_btn10d01,
        codeStates['setedit_btn'] = setedit_btn10d01,
        codeStates['view_btn_pg_graph'] = view_btn_pg_graph1baad,
        codeStates['setview_btn_pg_graph'] = setview_btn_pg_graph1baad,
        codeStates['bt_approve'] = bt_approveec5db,
        codeStates['setbt_approve'] = setbt_approveec5db,
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
        gridRow: '9 / 153',
      
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
