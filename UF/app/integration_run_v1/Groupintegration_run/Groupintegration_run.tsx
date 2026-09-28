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
import Tableintegration_run  from './Tableintegration_run';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupintegration_run = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationrun_v1Props, setdfd_integrationrun_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "integration_id",
      "run_trigger_code",
      "started_on",
      "ended_on",
      "run_status_code",
      "records_read",
      "records_rejected",
      "view_btn",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "integration_run"
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
  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02, setintegration_run8ef02}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02Props, setintegration_run8ef02Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_ide9a61, setintegration_ide9a61}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_code5637f, setrun_trigger_code5637f}= useContext(TotalContext) as TotalContextProps;
  const {started_onb93fa, setstarted_onb93fa}= useContext(TotalContext) as TotalContextProps;
  const {ended_onc29ee, setended_onc29ee}= useContext(TotalContext) as TotalContextProps;
  const {run_status_code1137e, setrun_status_code1137e}= useContext(TotalContext) as TotalContextProps;
  const {records_readb1c9b, setrecords_readb1c9b}= useContext(TotalContext) as TotalContextProps;
  const {records_rejectedfb2e8, setrecords_rejectedfb2e8}= useContext(TotalContext) as TotalContextProps;
  const {view_btn7c798, setview_btn7c798}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn74fa8, setedit_btn74fa8}= useContext(TotalContext) as TotalContextProps;
  const {delete_btndcd7c, setdelete_btndcd7c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {integrationrun_v1, setintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1',
    [user],
    'GroupIntegrationRun',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a2ef4363e74442759a518b4c6c58ef02");
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
    setintegration_run8ef02Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("integration_id")){
        setintegration_ide9a61((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_ide9a61?.isDisabled==null)
      {
        setintegration_ide9a61((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_trigger_code")){
        setrun_trigger_code5637f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_trigger_code5637f?.isDisabled==null)
      {
        setrun_trigger_code5637f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("started_on")){
        setstarted_onb93fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(started_onb93fa?.isDisabled==null)
      {
        setstarted_onb93fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ended_on")){
        setended_onc29ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ended_onc29ee?.isDisabled==null)
      {
        setended_onc29ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("run_status_code")){
        setrun_status_code1137e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(run_status_code1137e?.isDisabled==null)
      {
        setrun_status_code1137e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("records_read")){
        setrecords_readb1c9b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(records_readb1c9b?.isDisabled==null)
      {
        setrecords_readb1c9b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("records_rejected")){
        setrecords_rejectedfb2e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(records_rejectedfb2e8?.isDisabled==null)
      {
        setrecords_rejectedfb2e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn7c798((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btn7c798?.isDisabled==null)
      {
        setview_btn7c798((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn74fa8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn74fa8?.isDisabled==null)
      {
        setedit_btn74fa8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btndcd7c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btndcd7c?.isDisabled==null)
      {
        setdelete_btndcd7c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a2ef4363e74442759a518b4c6c58ef02");
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
        codeStates['group'] = group089a5,
        codeStates['setgroup'] = setgroup089a5,
        codeStates['group089a5'] = group089a5Props,
        codeStates['setgroup089a5'] = setgroup089a5Props,
        codeStates['integration_run'] = integration_run8ef02,
        codeStates['setintegration_run'] = setintegration_run8ef02,
        codeStates['integration_run8ef02'] = integration_run8ef02Props,
        codeStates['setintegration_run8ef02'] = setintegration_run8ef02Props,
        codeStates['integration_id'] = integration_ide9a61,
        codeStates['setintegration_id'] = setintegration_ide9a61,
        codeStates['run_trigger_code'] = run_trigger_code5637f,
        codeStates['setrun_trigger_code'] = setrun_trigger_code5637f,
        codeStates['started_on'] = started_onb93fa,
        codeStates['setstarted_on'] = setstarted_onb93fa,
        codeStates['ended_on'] = ended_onc29ee,
        codeStates['setended_on'] = setended_onc29ee,
        codeStates['run_status_code'] = run_status_code1137e,
        codeStates['setrun_status_code'] = setrun_status_code1137e,
        codeStates['records_read'] = records_readb1c9b,
        codeStates['setrecords_read'] = setrecords_readb1c9b,
        codeStates['records_rejected'] = records_rejectedfb2e8,
        codeStates['setrecords_rejected'] = setrecords_rejectedfb2e8,
        codeStates['view_btn'] = view_btn7c798,
        codeStates['setview_btn'] = setview_btn7c798,
        codeStates['edit_btn'] = edit_btn74fa8,
        codeStates['setedit_btn'] = setedit_btn74fa8,
        codeStates['delete_btn'] = delete_btndcd7c,
        codeStates['setdelete_btn'] = setdelete_btndcd7c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const integration_run8ef02Ref = useRef<any>(null);
  const handleClearSearch = () => {
    integration_run8ef02Ref.current?.setSearchParams();
    integration_run8ef02Ref.current?.handleSearch({});
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
        !Array.isArray(integration_run8ef02) &&
        Object.keys(integration_run8ef02)?.length > 0
      ) {
        setintegration_run8ef02({})
      }
    } else prevRefreshRef.current = true
  }, [integration_run8ef02Props?.refresh])


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
        gridRow: '10 / 116',
      
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
          setintegrationrun_v1((pre:any)=>({...pre,_selectedGroup_:"integration_run"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableintegration_run headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={integration_run8ef02Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupintegration_run
