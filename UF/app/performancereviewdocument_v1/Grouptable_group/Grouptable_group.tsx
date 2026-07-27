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
import Textreview_id_text  from "./Textreview_id_text";
import Textreview_id  from "./Textreview_id";
import Textemployee_name  from "./Textemployee_name";
import Textfull_name  from "./Textfull_name";
import Textreview_number_text  from "./Textreview_number_text";
import Textreview_number  from "./Textreview_number";
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
  const {dfd_performancereviewdoctable_v1Props, setdfd_performancereviewdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
      "review_id_text",
      "review_id",
      "employee_name",
      "full_name",
      "review_number_text",
      "review_number"
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
  const {doc_attached_group8ed8b, setdoc_attached_group8ed8b}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group8ed8bProps, setdoc_attached_group8ed8bProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4, settable_group106c4}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4Props, settable_group106c4Props}= useContext(TotalContext) as TotalContextProps;
  const {review_id_text98d83, setreview_id_text98d83}= useContext(TotalContext) as TotalContextProps;
  const {review_id1df70, setreview_id1df70}= useContext(TotalContext) as TotalContextProps;
  const {employee_name61cfc, setemployee_name61cfc}= useContext(TotalContext) as TotalContextProps;
  const {full_namebcb8e, setfull_namebcb8e}= useContext(TotalContext) as TotalContextProps;
  const {review_number_text7becd, setreview_number_text7becd}= useContext(TotalContext) as TotalContextProps;
  const {review_number1cdea, setreview_number1cdea}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849d, setemployee_doc_tabled849d}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849dProps, setemployee_doc_tabled849dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancereviewdocument_v1, setperformancereviewdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReviewDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d47ff08dc930b3bc01ceb5f055b106c4");
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
    settable_group106c4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("review_id_text")){
        setreview_id_text98d83((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_id_text98d83?.isDisabled==null)
      {
        setreview_id_text98d83((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_id")){
        setreview_id1df70((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_id1df70?.isDisabled==null)
      {
        setreview_id1df70((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_name")){
        setemployee_name61cfc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_name61cfc?.isDisabled==null)
      {
        setemployee_name61cfc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_namebcb8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_namebcb8e?.isDisabled==null)
      {
        setfull_namebcb8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number_text")){
        setreview_number_text7becd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_number_text7becd?.isDisabled==null)
      {
        setreview_number_text7becd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number")){
        setreview_number1cdea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_number1cdea?.isDisabled==null)
      {
        setreview_number1cdea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_doc_table")){
        setemployee_doc_tabled849d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_doc_tabled849d?.isDisabled==null)
      {
        setemployee_doc_tabled849d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group8ed8b,
        codeStates['setdoc_attached_group'] = setdoc_attached_group8ed8b,
        codeStates['doc_attached_group8ed8b'] = doc_attached_group8ed8bProps,
        codeStates['setdoc_attached_group8ed8b'] = setdoc_attached_group8ed8bProps,
        codeStates['table_group'] = table_group106c4,
        codeStates['settable_group'] = settable_group106c4,
        codeStates['table_group106c4'] = table_group106c4Props,
        codeStates['settable_group106c4'] = settable_group106c4Props,
        codeStates['review_id_text'] = review_id_text98d83,
        codeStates['setreview_id_text'] = setreview_id_text98d83,
        codeStates['review_id'] = review_id1df70,
        codeStates['setreview_id'] = setreview_id1df70,
        codeStates['employee_name'] = employee_name61cfc,
        codeStates['setemployee_name'] = setemployee_name61cfc,
        codeStates['full_name'] = full_namebcb8e,
        codeStates['setfull_name'] = setfull_namebcb8e,
        codeStates['review_number_text'] = review_number_text7becd,
        codeStates['setreview_number_text'] = setreview_number_text7becd,
        codeStates['review_number'] = review_number1cdea,
        codeStates['setreview_number'] = setreview_number1cdea,
        codeStates['employee_doc_table'] = employee_doc_tabled849d,
        codeStates['setemployee_doc_table'] = setemployee_doc_tabled849d,
        codeStates['employee_doc_tabled849d'] = employee_doc_tabled849dProps,
        codeStates['setemployee_doc_tabled849d'] = setemployee_doc_tabled849dProps,

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
        codeStates['doc_attached_group'] = doc_attached_group8ed8b,
        codeStates['setdoc_attached_group'] = setdoc_attached_group8ed8b,
        codeStates['doc_attached_group8ed8b'] = doc_attached_group8ed8bProps,
        codeStates['setdoc_attached_group8ed8b'] = setdoc_attached_group8ed8bProps,
        codeStates['table_group'] = table_group106c4,
        codeStates['settable_group'] = settable_group106c4,
        codeStates['table_group106c4'] = table_group106c4Props,
        codeStates['settable_group106c4'] = settable_group106c4Props,
        codeStates['review_id_text'] = review_id_text98d83,
        codeStates['setreview_id_text'] = setreview_id_text98d83,
        codeStates['review_id'] = review_id1df70,
        codeStates['setreview_id'] = setreview_id1df70,
        codeStates['employee_name'] = employee_name61cfc,
        codeStates['setemployee_name'] = setemployee_name61cfc,
        codeStates['full_name'] = full_namebcb8e,
        codeStates['setfull_name'] = setfull_namebcb8e,
        codeStates['review_number_text'] = review_number_text7becd,
        codeStates['setreview_number_text'] = setreview_number_text7becd,
        codeStates['review_number'] = review_number1cdea,
        codeStates['setreview_number'] = setreview_number1cdea,
        codeStates['employee_doc_table'] = employee_doc_tabled849d,
        codeStates['setemployee_doc_table'] = setemployee_doc_tabled849d,
        codeStates['employee_doc_tabled849d'] = employee_doc_tabled849dProps,
        codeStates['setemployee_doc_tabled849d'] = setemployee_doc_tabled849dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group106c4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_group106c4Ref.current?.setSearchParams();
    table_group106c4Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group106c4) && Object.keys(table_group106c4)?.length>0)
      {
        settable_group106c4({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group106c4Props?.refresh,token])


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
          setperformancereviewdocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
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
          {allowedControls.includes("review_id_text") ?<Textreview_id_text   /* 98d83 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_id") ?<Textreview_id   /* 1df70 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_name") ?<Textemployee_name   /* 61cfc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("full_name") ?<Textfull_name   /* bcb8e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_number_text") ?<Textreview_number_text   /* 7becd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_number") ?<Textreview_number   /* 1cdea */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
