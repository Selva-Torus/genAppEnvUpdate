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
import Tableperf_cycle_table  from './Tableperf_cycle_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupperf_cycle_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
      "review_id",
      "review_number",
      "full_name",
      "cycle_name",
      "review_type",
      "review_status",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "final_rating",
      "attachments"
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
  const {total_employees_group5fd1a, settotal_employees_group5fd1a}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group5fd1aProps, settotal_employees_group5fd1aProps}= useContext(TotalContext) as TotalContextProps;
  const {emp_group2ed27, setemp_group2ed27}= useContext(TotalContext) as TotalContextProps;
  const {emp_group2ed27Props, setemp_group2ed27Props}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table1d11f, setperf_cycle_table1d11f}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table1d11fProps, setperf_cycle_table1d11fProps}= useContext(TotalContext) as TotalContextProps;
  const {review_id14901, setreview_id14901}= useContext(TotalContext) as TotalContextProps;
  const {review_numbere1dc8, setreview_numbere1dc8}= useContext(TotalContext) as TotalContextProps;
  const {full_namebe804, setfull_namebe804}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name718ff, setcycle_name718ff}= useContext(TotalContext) as TotalContextProps;
  const {review_type1bdf9, setreview_type1bdf9}= useContext(TotalContext) as TotalContextProps;
  const {review_status2b312, setreview_status2b312}= useContext(TotalContext) as TotalContextProps;
  const {view_btna5669, setview_btna5669}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn37795, setedit_btn37795}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn0952e, setdelete_btn0952e}= useContext(TotalContext) as TotalContextProps;
  const {final_rating81ca1, setfinal_rating81ca1}= useContext(TotalContext) as TotalContextProps;
  const {attachmentsd466c, setattachmentsd466c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancereview_v1, setperformancereview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReview:AFVK:v1',
    [user],
    'GroupPerfCycleTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7ad86c050521a42a5cd27edbda51d11f");
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
    setperf_cycle_table1d11fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("review_id")){
        setreview_id14901((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_id14901?.isDisabled==null)
      {
        setreview_id14901((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number")){
        setreview_numbere1dc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_numbere1dc8?.isDisabled==null)
      {
        setreview_numbere1dc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_namebe804((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_namebe804?.isDisabled==null)
      {
        setfull_namebe804((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name718ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name718ff?.isDisabled==null)
      {
        setcycle_name718ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_type")){
        setreview_type1bdf9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_type1bdf9?.isDisabled==null)
      {
        setreview_type1bdf9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_status")){
        setreview_status2b312((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_status2b312?.isDisabled==null)
      {
        setreview_status2b312((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btna5669((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view_btna5669?.isDisabled==null)
      {
        setview_btna5669((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn37795((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_btn37795?.isDisabled==null)
      {
        setedit_btn37795((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn0952e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_btn0952e?.isDisabled==null)
      {
        setdelete_btn0952e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("final_rating")){
        setfinal_rating81ca1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(final_rating81ca1?.isDisabled==null)
      {
        setfinal_rating81ca1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachments")){
        setattachmentsd466c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachmentsd466c?.isDisabled==null)
      {
        setattachmentsd466c((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['total_employees_group'] = total_employees_group5fd1a,
        codeStates['settotal_employees_group'] = settotal_employees_group5fd1a,
        codeStates['total_employees_group5fd1a'] = total_employees_group5fd1aProps,
        codeStates['settotal_employees_group5fd1a'] = settotal_employees_group5fd1aProps,
        codeStates['emp_group'] = emp_group2ed27,
        codeStates['setemp_group'] = setemp_group2ed27,
        codeStates['emp_group2ed27'] = emp_group2ed27Props,
        codeStates['setemp_group2ed27'] = setemp_group2ed27Props,
        codeStates['perf_cycle_table'] = perf_cycle_table1d11f,
        codeStates['setperf_cycle_table'] = setperf_cycle_table1d11f,
        codeStates['perf_cycle_table1d11f'] = perf_cycle_table1d11fProps,
        codeStates['setperf_cycle_table1d11f'] = setperf_cycle_table1d11fProps,
        codeStates['review_id'] = review_id14901,
        codeStates['setreview_id'] = setreview_id14901,
        codeStates['review_number'] = review_numbere1dc8,
        codeStates['setreview_number'] = setreview_numbere1dc8,
        codeStates['full_name'] = full_namebe804,
        codeStates['setfull_name'] = setfull_namebe804,
        codeStates['cycle_name'] = cycle_name718ff,
        codeStates['setcycle_name'] = setcycle_name718ff,
        codeStates['review_type'] = review_type1bdf9,
        codeStates['setreview_type'] = setreview_type1bdf9,
        codeStates['review_status'] = review_status2b312,
        codeStates['setreview_status'] = setreview_status2b312,
        codeStates['view_btn'] = view_btna5669,
        codeStates['setview_btn'] = setview_btna5669,
        codeStates['edit_btn'] = edit_btn37795,
        codeStates['setedit_btn'] = setedit_btn37795,
        codeStates['delete_btn'] = delete_btn0952e,
        codeStates['setdelete_btn'] = setdelete_btn0952e,
        codeStates['final_rating'] = final_rating81ca1,
        codeStates['setfinal_rating'] = setfinal_rating81ca1,
        codeStates['attachments'] = attachmentsd466c,
        codeStates['setattachments'] = setattachmentsd466c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const perf_cycle_table1d11fRef = useRef<any>(null);
  const handleClearSearch = () => {
    perf_cycle_table1d11fRef.current?.setSearchParams();
    perf_cycle_table1d11fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(perf_cycle_table1d11f) && Object.keys(perf_cycle_table1d11f)?.length>0)
      {
        setperf_cycle_table1d11f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [perf_cycle_table1d11fProps?.refresh,token])


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
          setperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"perf_cycle_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableperf_cycle_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={perf_cycle_table1d11fRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupperf_cycle_table
