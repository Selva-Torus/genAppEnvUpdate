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
import Tablepolicy_doc_table  from './Tablepolicy_doc_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouppolicy_doc_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
      "attachment_id",
      "doc_group",
      "doc_name",
      "trs_created_date",
      "trs_created_by",
      "bt_delete"
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
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idc40d7, setattachment_idc40d7}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3b631, setdoc_group3b631}= useContext(TotalContext) as TotalContextProps;
  const {doc_name787f1, setdoc_name787f1}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_dated5da5, settrs_created_dated5da5}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byf9f2c, settrs_created_byf9f2c}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete640f6, setbt_delete640f6}= useContext(TotalContext) as TotalContextProps;
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
    'GroupPolicyDocTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "fa9dc617684d49ae4bf52f23d0806d23");
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
    setpolicy_doc_table06d23Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_idc40d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_idc40d7?.isDisabled==null)
      {
        setattachment_idc40d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group3b631((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group3b631?.isDisabled==null)
      {
        setdoc_group3b631((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name787f1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name787f1?.isDisabled==null)
      {
        setdoc_name787f1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_dated5da5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_dated5da5?.isDisabled==null)
      {
        settrs_created_dated5da5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byf9f2c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_byf9f2c?.isDisabled==null)
      {
        settrs_created_byf9f2c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_delete")){
        setbt_delete640f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_delete640f6?.isDisabled==null)
      {
        setbt_delete640f6((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['doc_attached_group'] = doc_attached_group1c693,
        codeStates['setdoc_attached_group'] = setdoc_attached_group1c693,
        codeStates['doc_attached_group1c693'] = doc_attached_group1c693Props,
        codeStates['setdoc_attached_group1c693'] = setdoc_attached_group1c693Props,
        codeStates['table_group'] = table_group973f0,
        codeStates['settable_group'] = settable_group973f0,
        codeStates['table_group973f0'] = table_group973f0Props,
        codeStates['settable_group973f0'] = settable_group973f0Props,
        codeStates['policy_doc_table'] = policy_doc_table06d23,
        codeStates['setpolicy_doc_table'] = setpolicy_doc_table06d23,
        codeStates['policy_doc_table06d23'] = policy_doc_table06d23Props,
        codeStates['setpolicy_doc_table06d23'] = setpolicy_doc_table06d23Props,
        codeStates['attachment_id'] = attachment_idc40d7,
        codeStates['setattachment_id'] = setattachment_idc40d7,
        codeStates['doc_group'] = doc_group3b631,
        codeStates['setdoc_group'] = setdoc_group3b631,
        codeStates['doc_name'] = doc_name787f1,
        codeStates['setdoc_name'] = setdoc_name787f1,
        codeStates['trs_created_date'] = trs_created_dated5da5,
        codeStates['settrs_created_date'] = settrs_created_dated5da5,
        codeStates['trs_created_by'] = trs_created_byf9f2c,
        codeStates['settrs_created_by'] = settrs_created_byf9f2c,
        codeStates['bt_delete'] = bt_delete640f6,
        codeStates['setbt_delete'] = setbt_delete640f6,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const policy_doc_table06d23Ref = useRef<any>(null);
  const handleClearSearch = () => {
    policy_doc_table06d23Ref.current?.setSearchParams();
    policy_doc_table06d23Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(policy_doc_table06d23) && Object.keys(policy_doc_table06d23)?.length>0)
      {
        setpolicy_doc_table06d23({})
      }
    }else 
      prevRefreshRef.current= true
  }, [policy_doc_table06d23Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '14 / 70',
      
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
          setleavepolicydocument_v1((pre:any)=>({...pre,_selectedGroup_:"policy_doc_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablepolicy_doc_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={policy_doc_table06d23Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouppolicy_doc_table
