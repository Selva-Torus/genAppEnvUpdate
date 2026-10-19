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
import Tablecode_sets_table  from './Tablecode_sets_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_sets_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificationcondition_v1Props, setdfd_certificationcondition_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_condition_id",
      "condition_text",
      "due_date",
      "edit_btn",
      "delete_btn",
      "closed_on",
      "status_code"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {codesets_groupedfac, setcodesets_groupedfac}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupedfacProps, setcodesets_groupedfacProps}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7, setcode_sets_tableee3b7}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7Props, setcode_sets_tableee3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_id207b7, setcert_condition_id207b7}= useContext(TotalContext) as TotalContextProps;
  const {condition_textc845e, setcondition_textc845e}= useContext(TotalContext) as TotalContextProps;
  const {due_datebc916, setdue_datebc916}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn9ddb9, setedit_btn9ddb9}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn57f4e, setdelete_btn57f4e}= useContext(TotalContext) as TotalContextProps;
  const {closed_on6f4e5, setclosed_on6f4e5}= useContext(TotalContext) as TotalContextProps;
  const {status_codee5fc9, setstatus_codee5fc9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificatecondition_v1, setcertificatecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateCondition:AFVK:v1',
    [user],
    'GroupCodeSetsTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ec94f86fbeea65f5b26e9ebe93bee3b7");
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
    setcode_sets_tableee3b7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_condition_id")){
        setcert_condition_id207b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_condition_id207b7?.isDisabled==null)
      {
        setcert_condition_id207b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_text")){
        setcondition_textc845e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(condition_textc845e?.isDisabled==null)
      {
        setcondition_textc845e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("due_date")){
        setdue_datebc916((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(due_datebc916?.isDisabled==null)
      {
        setdue_datebc916((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn9ddb9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn9ddb9?.isDisabled==null)
      {
        setedit_btn9ddb9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn57f4e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn57f4e?.isDisabled==null)
      {
        setdelete_btn57f4e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("closed_on")){
        setclosed_on6f4e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(closed_on6f4e5?.isDisabled==null)
      {
        setclosed_on6f4e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_code")){
        setstatus_codee5fc9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_codee5fc9?.isDisabled==null)
      {
        setstatus_codee5fc9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ec94f86fbeea65f5b26e9ebe93bee3b7");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['codesets_group'] = codesets_groupedfac,
        codeStates['setcodesets_group'] = setcodesets_groupedfac,
        codeStates['codesets_groupedfac'] = codesets_groupedfacProps,
        codeStates['setcodesets_groupedfac'] = setcodesets_groupedfacProps,
        codeStates['code_sets_table'] = code_sets_tableee3b7,
        codeStates['setcode_sets_table'] = setcode_sets_tableee3b7,
        codeStates['code_sets_tableee3b7'] = code_sets_tableee3b7Props,
        codeStates['setcode_sets_tableee3b7'] = setcode_sets_tableee3b7Props,
        codeStates['cert_condition_id'] = cert_condition_id207b7,
        codeStates['setcert_condition_id'] = setcert_condition_id207b7,
        codeStates['condition_text'] = condition_textc845e,
        codeStates['setcondition_text'] = setcondition_textc845e,
        codeStates['due_date'] = due_datebc916,
        codeStates['setdue_date'] = setdue_datebc916,
        codeStates['edit_btn'] = edit_btn9ddb9,
        codeStates['setedit_btn'] = setedit_btn9ddb9,
        codeStates['delete_btn'] = delete_btn57f4e,
        codeStates['setdelete_btn'] = setdelete_btn57f4e,
        codeStates['closed_on'] = closed_on6f4e5,
        codeStates['setclosed_on'] = setclosed_on6f4e5,
        codeStates['status_code'] = status_codee5fc9,
        codeStates['setstatus_code'] = setstatus_codee5fc9,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_sets_tableee3b7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_sets_tableee3b7Ref.current?.setSearchParams();
    code_sets_tableee3b7Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(code_sets_tableee3b7) &&
        Object.keys(code_sets_tableee3b7)?.length > 0
      ) {
        setcode_sets_tableee3b7({})
        setcode_sets_tableee3b7Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [code_sets_tableee3b7Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 141',
      
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
          setcertificatecondition_v1((pre:any)=>({...pre,_selectedGroup_:"code_sets_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecode_sets_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={code_sets_tableee3b7Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcode_sets_table
