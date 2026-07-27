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
import Textaccess_req_id_text  from "./Textaccess_req_id_text";
import Textaccess_req_id  from "./Textaccess_req_id";
import Textrequest_number_text  from "./Textrequest_number_text";
import Textrequest_number  from "./Textrequest_number";
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
  const {dfd_accessreqdoctable_v1Props, setdfd_accessreqdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
      "access_req_id_text",
      "access_req_id",
      "request_number_text",
      "request_number",
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
  const {doc_attached_groupd9ca3, setdoc_attached_groupd9ca3}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupd9ca3Props, setdoc_attached_groupd9ca3Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33, settable_groupbcd33}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33Props, settable_groupbcd33Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id_text12a0d, setaccess_req_id_text12a0d}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id5df25, setaccess_req_id5df25}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textdcd44, setrequest_number_textdcd44}= useContext(TotalContext) as TotalContextProps;
  const {request_numberd4d19, setrequest_numberd4d19}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text578db, setemployee_name_text578db}= useContext(TotalContext) as TotalContextProps;
  const {full_name84f79, setfull_name84f79}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {accessrequestdocument_v1, setaccessrequestdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequestDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f91d3a96695cac2bf53bb422216bcd33");
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
    settable_groupbcd33Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("access_req_id_text")){
        setaccess_req_id_text12a0d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_id_text12a0d?.isDisabled==null)
      {
        setaccess_req_id_text12a0d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_req_id")){
        setaccess_req_id5df25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_id5df25?.isDisabled==null)
      {
        setaccess_req_id5df25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number_text")){
        setrequest_number_textdcd44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_number_textdcd44?.isDisabled==null)
      {
        setrequest_number_textdcd44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_numberd4d19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_numberd4d19?.isDisabled==null)
      {
        setrequest_numberd4d19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name_text")){
        setemployee_name_text578db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name_text578db?.isDisabled==null)
      {
        setemployee_name_text578db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name84f79((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name84f79?.isDisabled==null)
      {
        setfull_name84f79((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_doc_table")){
        setrequest_doc_tablea9098((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_doc_tablea9098?.isDisabled==null)
      {
        setrequest_doc_tablea9098((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupd9ca3,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupd9ca3,
        codeStates['doc_attached_groupd9ca3'] = doc_attached_groupd9ca3Props,
        codeStates['setdoc_attached_groupd9ca3'] = setdoc_attached_groupd9ca3Props,
        codeStates['table_group'] = table_groupbcd33,
        codeStates['settable_group'] = settable_groupbcd33,
        codeStates['table_groupbcd33'] = table_groupbcd33Props,
        codeStates['settable_groupbcd33'] = settable_groupbcd33Props,
        codeStates['access_req_id_text'] = access_req_id_text12a0d,
        codeStates['setaccess_req_id_text'] = setaccess_req_id_text12a0d,
        codeStates['access_req_id'] = access_req_id5df25,
        codeStates['setaccess_req_id'] = setaccess_req_id5df25,
        codeStates['request_number_text'] = request_number_textdcd44,
        codeStates['setrequest_number_text'] = setrequest_number_textdcd44,
        codeStates['request_number'] = request_numberd4d19,
        codeStates['setrequest_number'] = setrequest_numberd4d19,
        codeStates['employee_name_text'] = employee_name_text578db,
        codeStates['setemployee_name_text'] = setemployee_name_text578db,
        codeStates['full_name'] = full_name84f79,
        codeStates['setfull_name'] = setfull_name84f79,
        codeStates['request_doc_table'] = request_doc_tablea9098,
        codeStates['setrequest_doc_table'] = setrequest_doc_tablea9098,
        codeStates['request_doc_tablea9098'] = request_doc_tablea9098Props,
        codeStates['setrequest_doc_tablea9098'] = setrequest_doc_tablea9098Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupd9ca3,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupd9ca3,
        codeStates['doc_attached_groupd9ca3'] = doc_attached_groupd9ca3Props,
        codeStates['setdoc_attached_groupd9ca3'] = setdoc_attached_groupd9ca3Props,
        codeStates['table_group'] = table_groupbcd33,
        codeStates['settable_group'] = settable_groupbcd33,
        codeStates['table_groupbcd33'] = table_groupbcd33Props,
        codeStates['settable_groupbcd33'] = settable_groupbcd33Props,
        codeStates['access_req_id_text'] = access_req_id_text12a0d,
        codeStates['setaccess_req_id_text'] = setaccess_req_id_text12a0d,
        codeStates['access_req_id'] = access_req_id5df25,
        codeStates['setaccess_req_id'] = setaccess_req_id5df25,
        codeStates['request_number_text'] = request_number_textdcd44,
        codeStates['setrequest_number_text'] = setrequest_number_textdcd44,
        codeStates['request_number'] = request_numberd4d19,
        codeStates['setrequest_number'] = setrequest_numberd4d19,
        codeStates['employee_name_text'] = employee_name_text578db,
        codeStates['setemployee_name_text'] = setemployee_name_text578db,
        codeStates['full_name'] = full_name84f79,
        codeStates['setfull_name'] = setfull_name84f79,
        codeStates['request_doc_table'] = request_doc_tablea9098,
        codeStates['setrequest_doc_table'] = setrequest_doc_tablea9098,
        codeStates['request_doc_tablea9098'] = request_doc_tablea9098Props,
        codeStates['setrequest_doc_tablea9098'] = setrequest_doc_tablea9098Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_groupbcd33Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_groupbcd33Ref.current?.setSearchParams();
    table_groupbcd33Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_groupbcd33) && Object.keys(table_groupbcd33)?.length>0)
      {
        settable_groupbcd33({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_groupbcd33Props?.refresh,token])


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
          setaccessrequestdocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
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
          {allowedControls.includes("access_req_id_text") ?<Textaccess_req_id_text   /* 12a0d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_req_id") ?<Textaccess_req_id   /* 5df25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("request_number_text") ?<Textrequest_number_text   /* dcd44 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("request_number") ?<Textrequest_number   /* d4d19 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name_text") ?<Textemployee_name_text   /* 578db */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 84f79 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
