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
import Groupemployee_doc_table  from "../Groupemployee_doc_table/Groupemployee_doc_table";
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
import Textemployee_id_text  from "./Textemployee_id_text";
import Textemployee_id  from "./Textemployee_id";
import Textemployee_code_text  from "./Textemployee_code_text";
import Textemployee_code  from "./Textemployee_code";
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
  const {dfd_employeedoctable_v1Props, setdfd_employeedoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "employee_id_text",
      "employee_id",
      "employee_code_text",
      "employee_code",
      "employee_name_text",
      "full_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
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
  const {doc_attached_groupac2a0, setdoc_attached_groupac2a0}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0Props, setdoc_attached_groupac2a0Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1, settable_group034b1}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1Props, settable_group034b1Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_id_text0c3bb, setemployee_id_text0c3bb}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7455d, setemployee_id7455d}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_text464d8, setemployee_code_text464d8}= useContext(TotalContext) as TotalContextProps;
  const {employee_coded1c2f, setemployee_coded1c2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_textca8de, setemployee_name_textca8de}= useContext(TotalContext) as TotalContextProps;
  const {full_namede77c, setfull_namede77c}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3, setemployee_doc_tableb42f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3Props, setemployee_doc_tableb42f3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {employeesdocument_v1, setemployeesdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeesDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "45b4bfaeb425c79c92a4bfc1b28034b1");
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
    settable_group034b1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("employee_id_text")){
        setemployee_id_text0c3bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_id_text0c3bb?.isDisabled==null)
      {
        setemployee_id_text0c3bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_id")){
        setemployee_id7455d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_id7455d?.isDisabled==null)
      {
        setemployee_id7455d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_code_text")){
        setemployee_code_text464d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_code_text464d8?.isDisabled==null)
      {
        setemployee_code_text464d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_code")){
        setemployee_coded1c2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_coded1c2f?.isDisabled==null)
      {
        setemployee_coded1c2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name_text")){
        setemployee_name_textca8de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name_textca8de?.isDisabled==null)
      {
        setemployee_name_textca8de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_namede77c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_namede77c?.isDisabled==null)
      {
        setfull_namede77c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_doc_table")){
        setemployee_doc_tableb42f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_doc_tableb42f3?.isDisabled==null)
      {
        setemployee_doc_tableb42f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupac2a0,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupac2a0,
        codeStates['doc_attached_groupac2a0'] = doc_attached_groupac2a0Props,
        codeStates['setdoc_attached_groupac2a0'] = setdoc_attached_groupac2a0Props,
        codeStates['table_group'] = table_group034b1,
        codeStates['settable_group'] = settable_group034b1,
        codeStates['table_group034b1'] = table_group034b1Props,
        codeStates['settable_group034b1'] = settable_group034b1Props,
        codeStates['employee_id_text'] = employee_id_text0c3bb,
        codeStates['setemployee_id_text'] = setemployee_id_text0c3bb,
        codeStates['employee_id'] = employee_id7455d,
        codeStates['setemployee_id'] = setemployee_id7455d,
        codeStates['employee_code_text'] = employee_code_text464d8,
        codeStates['setemployee_code_text'] = setemployee_code_text464d8,
        codeStates['employee_code'] = employee_coded1c2f,
        codeStates['setemployee_code'] = setemployee_coded1c2f,
        codeStates['employee_name_text'] = employee_name_textca8de,
        codeStates['setemployee_name_text'] = setemployee_name_textca8de,
        codeStates['full_name'] = full_namede77c,
        codeStates['setfull_name'] = setfull_namede77c,
        codeStates['employee_doc_table'] = employee_doc_tableb42f3,
        codeStates['setemployee_doc_table'] = setemployee_doc_tableb42f3,
        codeStates['employee_doc_tableb42f3'] = employee_doc_tableb42f3Props,
        codeStates['setemployee_doc_tableb42f3'] = setemployee_doc_tableb42f3Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupac2a0,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupac2a0,
        codeStates['doc_attached_groupac2a0'] = doc_attached_groupac2a0Props,
        codeStates['setdoc_attached_groupac2a0'] = setdoc_attached_groupac2a0Props,
        codeStates['table_group'] = table_group034b1,
        codeStates['settable_group'] = settable_group034b1,
        codeStates['table_group034b1'] = table_group034b1Props,
        codeStates['settable_group034b1'] = settable_group034b1Props,
        codeStates['employee_id_text'] = employee_id_text0c3bb,
        codeStates['setemployee_id_text'] = setemployee_id_text0c3bb,
        codeStates['employee_id'] = employee_id7455d,
        codeStates['setemployee_id'] = setemployee_id7455d,
        codeStates['employee_code_text'] = employee_code_text464d8,
        codeStates['setemployee_code_text'] = setemployee_code_text464d8,
        codeStates['employee_code'] = employee_coded1c2f,
        codeStates['setemployee_code'] = setemployee_coded1c2f,
        codeStates['employee_name_text'] = employee_name_textca8de,
        codeStates['setemployee_name_text'] = setemployee_name_textca8de,
        codeStates['full_name'] = full_namede77c,
        codeStates['setfull_name'] = setfull_namede77c,
        codeStates['employee_doc_table'] = employee_doc_tableb42f3,
        codeStates['setemployee_doc_table'] = setemployee_doc_tableb42f3,
        codeStates['employee_doc_tableb42f3'] = employee_doc_tableb42f3Props,
        codeStates['setemployee_doc_tableb42f3'] = setemployee_doc_tableb42f3Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group034b1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_group034b1Ref.current?.setSearchParams();
    table_group034b1Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group034b1) && Object.keys(table_group034b1)?.length>0)
      {
        settable_group034b1({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group034b1Props?.refresh,token])


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
          setemployeesdocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
        }}
    >
        {allowedComponent.includes("employee_doc_table")  &&<Groupemployee_doc_table  
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
          {allowedControls.includes("employee_id_text") ?<Textemployee_id_text   /* 0c3bb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_id") ?<Textemployee_id   /* 7455d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_code_text") ?<Textemployee_code_text   /* 464d8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_code") ?<Textemployee_code   /* d1c2f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name_text") ?<Textemployee_name_text   /* ca8de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* de77c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
