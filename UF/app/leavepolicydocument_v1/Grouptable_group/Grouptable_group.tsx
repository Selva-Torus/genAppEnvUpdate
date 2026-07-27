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
import Grouppolicy_doc_table  from "../Grouppolicy_doc_table/Grouppolicy_doc_table";
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
import Textpolicy_id_text  from "./Textpolicy_id_text";
import Textpolicy_id  from "./Textpolicy_id";
import Textpolicy_name_text  from "./Textpolicy_name_text";
import Textpolicy_name  from "./Textpolicy_name";
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
  const {dfd_leavepolicydoctable_v1Props, setdfd_leavepolicydoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "policy_id_text",
      "policy_id",
      "policy_name_text",
      "policy_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "policy_doc_table"
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
  const {doc_attached_group1c693, setdoc_attached_group1c693}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group1c693Props, setdoc_attached_group1c693Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0, settable_group973f0}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0Props, settable_group973f0Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_id_textbba07, setpolicy_id_textbba07}= useContext(TotalContext) as TotalContextProps;
  const {policy_id4c831, setpolicy_id4c831}= useContext(TotalContext) as TotalContextProps;
  const {policy_name_textf741b, setpolicy_name_textf741b}= useContext(TotalContext) as TotalContextProps;
  const {policy_name67d57, setpolicy_name67d57}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavepolicydocument_v1, setleavepolicydocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicyDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0cb780e30a75a271c0e0dc89cef973f0");
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
    settable_group973f0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("policy_id_text")){
        setpolicy_id_textbba07((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_id_textbba07?.isDisabled==null)
      {
        setpolicy_id_textbba07((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_id")){
        setpolicy_id4c831((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_id4c831?.isDisabled==null)
      {
        setpolicy_id4c831((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name_text")){
        setpolicy_name_textf741b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_name_textf741b?.isDisabled==null)
      {
        setpolicy_name_textf741b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_name67d57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_name67d57?.isDisabled==null)
      {
        setpolicy_name67d57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_doc_table")){
        setpolicy_doc_table06d23((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(policy_doc_table06d23?.isDisabled==null)
      {
        setpolicy_doc_table06d23((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group1c693,
        codeStates['setdoc_attached_group'] = setdoc_attached_group1c693,
        codeStates['doc_attached_group1c693'] = doc_attached_group1c693Props,
        codeStates['setdoc_attached_group1c693'] = setdoc_attached_group1c693Props,
        codeStates['table_group'] = table_group973f0,
        codeStates['settable_group'] = settable_group973f0,
        codeStates['table_group973f0'] = table_group973f0Props,
        codeStates['settable_group973f0'] = settable_group973f0Props,
        codeStates['policy_id_text'] = policy_id_textbba07,
        codeStates['setpolicy_id_text'] = setpolicy_id_textbba07,
        codeStates['policy_id'] = policy_id4c831,
        codeStates['setpolicy_id'] = setpolicy_id4c831,
        codeStates['policy_name_text'] = policy_name_textf741b,
        codeStates['setpolicy_name_text'] = setpolicy_name_textf741b,
        codeStates['policy_name'] = policy_name67d57,
        codeStates['setpolicy_name'] = setpolicy_name67d57,
        codeStates['policy_doc_table'] = policy_doc_table06d23,
        codeStates['setpolicy_doc_table'] = setpolicy_doc_table06d23,
        codeStates['policy_doc_table06d23'] = policy_doc_table06d23Props,
        codeStates['setpolicy_doc_table06d23'] = setpolicy_doc_table06d23Props,

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
        codeStates['doc_attached_group'] = doc_attached_group1c693,
        codeStates['setdoc_attached_group'] = setdoc_attached_group1c693,
        codeStates['doc_attached_group1c693'] = doc_attached_group1c693Props,
        codeStates['setdoc_attached_group1c693'] = setdoc_attached_group1c693Props,
        codeStates['table_group'] = table_group973f0,
        codeStates['settable_group'] = settable_group973f0,
        codeStates['table_group973f0'] = table_group973f0Props,
        codeStates['settable_group973f0'] = settable_group973f0Props,
        codeStates['policy_id_text'] = policy_id_textbba07,
        codeStates['setpolicy_id_text'] = setpolicy_id_textbba07,
        codeStates['policy_id'] = policy_id4c831,
        codeStates['setpolicy_id'] = setpolicy_id4c831,
        codeStates['policy_name_text'] = policy_name_textf741b,
        codeStates['setpolicy_name_text'] = setpolicy_name_textf741b,
        codeStates['policy_name'] = policy_name67d57,
        codeStates['setpolicy_name'] = setpolicy_name67d57,
        codeStates['policy_doc_table'] = policy_doc_table06d23,
        codeStates['setpolicy_doc_table'] = setpolicy_doc_table06d23,
        codeStates['policy_doc_table06d23'] = policy_doc_table06d23Props,
        codeStates['setpolicy_doc_table06d23'] = setpolicy_doc_table06d23Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group973f0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_group973f0Ref.current?.setSearchParams();
    table_group973f0Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group973f0) && Object.keys(table_group973f0)?.length>0)
      {
        settable_group973f0({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group973f0Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 73',
      
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
          setleavepolicydocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
        }}
    >
        {allowedComponent.includes("policy_doc_table")  &&<Grouppolicy_doc_table  
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
          {allowedControls.includes("policy_id_text") ?<Textpolicy_id_text   /* bba07 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_id") ?<Textpolicy_id   /* 4c831 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_name_text") ?<Textpolicy_name_text   /* f741b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("policy_name") ?<Textpolicy_name   /* 67d57 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
