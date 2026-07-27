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
import Grouprequest_doc_table  from "../Grouprequest_doc_table/Grouprequest_doc_table";
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
import Textleave_req_id_text  from "./Textleave_req_id_text";
import Textleave_req_id  from "./Textleave_req_id";
import Textleave_request_number_text  from "./Textleave_request_number_text";
import Textleave_request_number  from "./Textleave_request_number";
import Textemployee_name_text  from "./Textemployee_name_text";
import Textfull_name  from "./Textfull_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_leavemanagedoctable_v1Props, setdfd_leavemanagedoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "leave_req_id_text",
      "leave_req_id",
      "leave_request_number_text",
      "leave_request_number",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
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
  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id_textb89d8, setleave_req_id_textb89d8}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_idd31d0, setleave_req_idd31d0}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number_text70447, setleave_request_number_text70447}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number4d42c, setleave_request_number4d42c}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text8d1dd, setemployee_name_text8d1dd}= useContext(TotalContext) as TotalContextProps;
  const {full_name74b7d, setfull_name74b7d}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavemanagementdocument_v1, setleavemanagementdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveManagementDocument:AFVK:v1',
    [user],
    'GroupTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dbd5cab6e78783435ffedf49c03f34e5");
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
    settable_groupf34e5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("leave_req_id_text")){
        setleave_req_id_textb89d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_id_textb89d8?.isDisabled==null)
      {
        setleave_req_id_textb89d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_req_id")){
        setleave_req_idd31d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_idd31d0?.isDisabled==null)
      {
        setleave_req_idd31d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_request_number_text")){
        setleave_request_number_text70447((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_request_number_text70447?.isDisabled==null)
      {
        setleave_request_number_text70447((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_request_number")){
        setleave_request_number4d42c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_request_number4d42c?.isDisabled==null)
      {
        setleave_request_number4d42c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name_text")){
        setemployee_name_text8d1dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name_text8d1dd?.isDisabled==null)
      {
        setemployee_name_text8d1dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name74b7d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name74b7d?.isDisabled==null)
      {
        setfull_name74b7d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_doc_table")){
        setrequest_doc_tabled1189((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_doc_tabled1189?.isDisabled==null)
      {
        setrequest_doc_tabled1189((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupe2bd6,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe2bd6,
        codeStates['doc_attached_groupe2bd6'] = doc_attached_groupe2bd6Props,
        codeStates['setdoc_attached_groupe2bd6'] = setdoc_attached_groupe2bd6Props,
        codeStates['table_group'] = table_groupf34e5,
        codeStates['settable_group'] = settable_groupf34e5,
        codeStates['table_groupf34e5'] = table_groupf34e5Props,
        codeStates['settable_groupf34e5'] = settable_groupf34e5Props,
        codeStates['leave_req_id_text'] = leave_req_id_textb89d8,
        codeStates['setleave_req_id_text'] = setleave_req_id_textb89d8,
        codeStates['leave_req_id'] = leave_req_idd31d0,
        codeStates['setleave_req_id'] = setleave_req_idd31d0,
        codeStates['leave_request_number_text'] = leave_request_number_text70447,
        codeStates['setleave_request_number_text'] = setleave_request_number_text70447,
        codeStates['leave_request_number'] = leave_request_number4d42c,
        codeStates['setleave_request_number'] = setleave_request_number4d42c,
        codeStates['employee_name_text'] = employee_name_text8d1dd,
        codeStates['setemployee_name_text'] = setemployee_name_text8d1dd,
        codeStates['full_name'] = full_name74b7d,
        codeStates['setfull_name'] = setfull_name74b7d,
        codeStates['request_doc_table'] = request_doc_tabled1189,
        codeStates['setrequest_doc_table'] = setrequest_doc_tabled1189,
        codeStates['request_doc_tabled1189'] = request_doc_tabled1189Props,
        codeStates['setrequest_doc_tabled1189'] = setrequest_doc_tabled1189Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupe2bd6,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe2bd6,
        codeStates['doc_attached_groupe2bd6'] = doc_attached_groupe2bd6Props,
        codeStates['setdoc_attached_groupe2bd6'] = setdoc_attached_groupe2bd6Props,
        codeStates['table_group'] = table_groupf34e5,
        codeStates['settable_group'] = settable_groupf34e5,
        codeStates['table_groupf34e5'] = table_groupf34e5Props,
        codeStates['settable_groupf34e5'] = settable_groupf34e5Props,
        codeStates['leave_req_id_text'] = leave_req_id_textb89d8,
        codeStates['setleave_req_id_text'] = setleave_req_id_textb89d8,
        codeStates['leave_req_id'] = leave_req_idd31d0,
        codeStates['setleave_req_id'] = setleave_req_idd31d0,
        codeStates['leave_request_number_text'] = leave_request_number_text70447,
        codeStates['setleave_request_number_text'] = setleave_request_number_text70447,
        codeStates['leave_request_number'] = leave_request_number4d42c,
        codeStates['setleave_request_number'] = setleave_request_number4d42c,
        codeStates['employee_name_text'] = employee_name_text8d1dd,
        codeStates['setemployee_name_text'] = setemployee_name_text8d1dd,
        codeStates['full_name'] = full_name74b7d,
        codeStates['setfull_name'] = setfull_name74b7d,
        codeStates['request_doc_table'] = request_doc_tabled1189,
        codeStates['setrequest_doc_table'] = setrequest_doc_tabled1189,
        codeStates['request_doc_tabled1189'] = request_doc_tabled1189Props,
        codeStates['setrequest_doc_tabled1189'] = setrequest_doc_tabled1189Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_groupf34e5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_groupf34e5Ref.current?.setSearchParams();
    table_groupf34e5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_groupf34e5) && Object.keys(table_groupf34e5)?.length>0)
      {
        settable_groupf34e5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_groupf34e5Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 82',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '3px',
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
          setleavemanagementdocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
        }}
    >
        {allowedComponent.includes("request_doc_table")  &&<Grouprequest_doc_table  
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
          {allowedControls.includes("leave_req_id_text") ?<Textleave_req_id_text   /* b89d8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_req_id") ?<Textleave_req_id   /* d31d0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_request_number_text") ?<Textleave_request_number_text   /* 70447 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_request_number") ?<Textleave_request_number   /* 4d42c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name_text") ?<Textemployee_name_text   /* 8d1dd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 74b7d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
