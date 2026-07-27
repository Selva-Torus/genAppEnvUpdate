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
import Textcheck_id_text  from "./Textcheck_id_text";
import Textcheck_id  from "./Textcheck_id";
import Textcheck_type_text  from "./Textcheck_type_text";
import Textcheck_type  from "./Textcheck_type";
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
  const {dfd_backgroundcheckdoctable_v1Props, setdfd_backgroundcheckdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
      "check_id_text",
      "check_id",
      "check_type_text",
      "check_type",
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
  const {doc_attached_groupb4f40, setdoc_attached_groupb4f40}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40Props, setdoc_attached_groupb4f40Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9, settable_groupb0ef9}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9Props, settable_groupb0ef9Props}= useContext(TotalContext) as TotalContextProps;
  const {check_id_text5c745, setcheck_id_text5c745}= useContext(TotalContext) as TotalContextProps;
  const {check_id3aca0, setcheck_id3aca0}= useContext(TotalContext) as TotalContextProps;
  const {check_type_text4cf7f, setcheck_type_text4cf7f}= useContext(TotalContext) as TotalContextProps;
  const {check_type4e3f3, setcheck_type4e3f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text2283d, setemployee_name_text2283d}= useContext(TotalContext) as TotalContextProps;
  const {full_name92cde, setfull_name92cde}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2f, setemployee_doc_table78f2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2fProps, setemployee_doc_table78f2fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {backgroundcheckdocument_v1, setbackgroundcheckdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheckDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1abbc4cca0c188fdac3fac7bdb8b0ef9");
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
    settable_groupb0ef9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("check_id_text")){
        setcheck_id_text5c745((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_id_text5c745?.isDisabled==null)
      {
        setcheck_id_text5c745((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("check_id")){
        setcheck_id3aca0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_id3aca0?.isDisabled==null)
      {
        setcheck_id3aca0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("check_type_text")){
        setcheck_type_text4cf7f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_type_text4cf7f?.isDisabled==null)
      {
        setcheck_type_text4cf7f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("check_type")){
        setcheck_type4e3f3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(check_type4e3f3?.isDisabled==null)
      {
        setcheck_type4e3f3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name_text")){
        setemployee_name_text2283d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name_text2283d?.isDisabled==null)
      {
        setemployee_name_text2283d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name92cde((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name92cde?.isDisabled==null)
      {
        setfull_name92cde((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_doc_table")){
        setemployee_doc_table78f2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_doc_table78f2f?.isDisabled==null)
      {
        setemployee_doc_table78f2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupb4f40,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb4f40,
        codeStates['doc_attached_groupb4f40'] = doc_attached_groupb4f40Props,
        codeStates['setdoc_attached_groupb4f40'] = setdoc_attached_groupb4f40Props,
        codeStates['table_group'] = table_groupb0ef9,
        codeStates['settable_group'] = settable_groupb0ef9,
        codeStates['table_groupb0ef9'] = table_groupb0ef9Props,
        codeStates['settable_groupb0ef9'] = settable_groupb0ef9Props,
        codeStates['check_id_text'] = check_id_text5c745,
        codeStates['setcheck_id_text'] = setcheck_id_text5c745,
        codeStates['check_id'] = check_id3aca0,
        codeStates['setcheck_id'] = setcheck_id3aca0,
        codeStates['check_type_text'] = check_type_text4cf7f,
        codeStates['setcheck_type_text'] = setcheck_type_text4cf7f,
        codeStates['check_type'] = check_type4e3f3,
        codeStates['setcheck_type'] = setcheck_type4e3f3,
        codeStates['employee_name_text'] = employee_name_text2283d,
        codeStates['setemployee_name_text'] = setemployee_name_text2283d,
        codeStates['full_name'] = full_name92cde,
        codeStates['setfull_name'] = setfull_name92cde,
        codeStates['employee_doc_table'] = employee_doc_table78f2f,
        codeStates['setemployee_doc_table'] = setemployee_doc_table78f2f,
        codeStates['employee_doc_table78f2f'] = employee_doc_table78f2fProps,
        codeStates['setemployee_doc_table78f2f'] = setemployee_doc_table78f2fProps,

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
        codeStates['doc_attached_group'] = doc_attached_groupb4f40,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb4f40,
        codeStates['doc_attached_groupb4f40'] = doc_attached_groupb4f40Props,
        codeStates['setdoc_attached_groupb4f40'] = setdoc_attached_groupb4f40Props,
        codeStates['table_group'] = table_groupb0ef9,
        codeStates['settable_group'] = settable_groupb0ef9,
        codeStates['table_groupb0ef9'] = table_groupb0ef9Props,
        codeStates['settable_groupb0ef9'] = settable_groupb0ef9Props,
        codeStates['check_id_text'] = check_id_text5c745,
        codeStates['setcheck_id_text'] = setcheck_id_text5c745,
        codeStates['check_id'] = check_id3aca0,
        codeStates['setcheck_id'] = setcheck_id3aca0,
        codeStates['check_type_text'] = check_type_text4cf7f,
        codeStates['setcheck_type_text'] = setcheck_type_text4cf7f,
        codeStates['check_type'] = check_type4e3f3,
        codeStates['setcheck_type'] = setcheck_type4e3f3,
        codeStates['employee_name_text'] = employee_name_text2283d,
        codeStates['setemployee_name_text'] = setemployee_name_text2283d,
        codeStates['full_name'] = full_name92cde,
        codeStates['setfull_name'] = setfull_name92cde,
        codeStates['employee_doc_table'] = employee_doc_table78f2f,
        codeStates['setemployee_doc_table'] = setemployee_doc_table78f2f,
        codeStates['employee_doc_table78f2f'] = employee_doc_table78f2fProps,
        codeStates['setemployee_doc_table78f2f'] = setemployee_doc_table78f2fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_groupb0ef9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_groupb0ef9Ref.current?.setSearchParams();
    table_groupb0ef9Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_groupb0ef9) && Object.keys(table_groupb0ef9)?.length>0)
      {
        settable_groupb0ef9({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_groupb0ef9Props?.refresh,token])


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
          setbackgroundcheckdocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
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
          {allowedControls.includes("check_id_text") ?<Textcheck_id_text   /* 5c745 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("check_id") ?<Textcheck_id   /* 3aca0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("check_type_text") ?<Textcheck_type_text   /* 4cf7f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("check_type") ?<Textcheck_type   /* 4e3f3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name_text") ?<Textemployee_name_text   /* 2283d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* 92cde */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
