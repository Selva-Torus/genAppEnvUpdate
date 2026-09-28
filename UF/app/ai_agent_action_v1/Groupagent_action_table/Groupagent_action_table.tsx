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
import Tableagent_action_table  from './Tableagent_action_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupagent_action_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aiagentaction_v1Props, setdfd_aiagentaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "agent_action_id",
      "action_name",
      "target_system",
      "tool_or_api",
      "is_permitted",
      "is_high_risk",
      "approval_required",
      "is_active",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "agent_action_group",
      "agent_action_table"
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
  const {overall_groupe3f32, setoverall_groupe3f32}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe3f32Props, setoverall_groupe3f32Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_groupfa736, setagent_action_groupfa736}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_groupfa736Props, setagent_action_groupfa736Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50, setagent_action_table39b50}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50Props, setagent_action_table39b50Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_id2fa37, setagent_action_id2fa37}= useContext(TotalContext) as TotalContextProps;
  const {action_name3c469, setaction_name3c469}= useContext(TotalContext) as TotalContextProps;
  const {target_systemdb907, settarget_systemdb907}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_api349b3, settool_or_api349b3}= useContext(TotalContext) as TotalContextProps;
  const {is_permitted23d6f, setis_permitted23d6f}= useContext(TotalContext) as TotalContextProps;
  const {is_high_risk9c751, setis_high_risk9c751}= useContext(TotalContext) as TotalContextProps;
  const {approval_required9ccc6, setapproval_required9ccc6}= useContext(TotalContext) as TotalContextProps;
  const {is_actived82af, setis_actived82af}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn45f95, setedit_btn45f95}= useContext(TotalContext) as TotalContextProps;
  const {delete_btna1555, setdelete_btna1555}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aiagentaction_v1, setaiagentaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1',
    [user],
    'GroupAgentActionTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7528885c1dc33cbc4802210eda139b50");
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
    setagent_action_table39b50Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("agent_action_id")){
        setagent_action_id2fa37((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_action_id2fa37?.isDisabled==null)
      {
        setagent_action_id2fa37((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_name")){
        setaction_name3c469((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_name3c469?.isDisabled==null)
      {
        setaction_name3c469((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_system")){
        settarget_systemdb907((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_systemdb907?.isDisabled==null)
      {
        settarget_systemdb907((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_or_api")){
        settool_or_api349b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_or_api349b3?.isDisabled==null)
      {
        settool_or_api349b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_permitted")){
        setis_permitted23d6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_permitted23d6f?.isDisabled==null)
      {
        setis_permitted23d6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_high_risk")){
        setis_high_risk9c751((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_high_risk9c751?.isDisabled==null)
      {
        setis_high_risk9c751((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_required")){
        setapproval_required9ccc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approval_required9ccc6?.isDisabled==null)
      {
        setapproval_required9ccc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_actived82af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_actived82af?.isDisabled==null)
      {
        setis_actived82af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn45f95((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn45f95?.isDisabled==null)
      {
        setedit_btn45f95((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btna1555((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btna1555?.isDisabled==null)
      {
        setdelete_btna1555((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7528885c1dc33cbc4802210eda139b50");
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
        codeStates['overall_group'] = overall_groupe3f32,
        codeStates['setoverall_group'] = setoverall_groupe3f32,
        codeStates['overall_groupe3f32'] = overall_groupe3f32Props,
        codeStates['setoverall_groupe3f32'] = setoverall_groupe3f32Props,
        codeStates['agent_action_group'] = agent_action_groupfa736,
        codeStates['setagent_action_group'] = setagent_action_groupfa736,
        codeStates['agent_action_groupfa736'] = agent_action_groupfa736Props,
        codeStates['setagent_action_groupfa736'] = setagent_action_groupfa736Props,
        codeStates['agent_action_table'] = agent_action_table39b50,
        codeStates['setagent_action_table'] = setagent_action_table39b50,
        codeStates['agent_action_table39b50'] = agent_action_table39b50Props,
        codeStates['setagent_action_table39b50'] = setagent_action_table39b50Props,
        codeStates['agent_action_id'] = agent_action_id2fa37,
        codeStates['setagent_action_id'] = setagent_action_id2fa37,
        codeStates['action_name'] = action_name3c469,
        codeStates['setaction_name'] = setaction_name3c469,
        codeStates['target_system'] = target_systemdb907,
        codeStates['settarget_system'] = settarget_systemdb907,
        codeStates['tool_or_api'] = tool_or_api349b3,
        codeStates['settool_or_api'] = settool_or_api349b3,
        codeStates['is_permitted'] = is_permitted23d6f,
        codeStates['setis_permitted'] = setis_permitted23d6f,
        codeStates['is_high_risk'] = is_high_risk9c751,
        codeStates['setis_high_risk'] = setis_high_risk9c751,
        codeStates['approval_required'] = approval_required9ccc6,
        codeStates['setapproval_required'] = setapproval_required9ccc6,
        codeStates['is_active'] = is_actived82af,
        codeStates['setis_active'] = setis_actived82af,
        codeStates['edit_btn'] = edit_btn45f95,
        codeStates['setedit_btn'] = setedit_btn45f95,
        codeStates['delete_btn'] = delete_btna1555,
        codeStates['setdelete_btn'] = setdelete_btna1555,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const agent_action_table39b50Ref = useRef<any>(null);
  const handleClearSearch = () => {
    agent_action_table39b50Ref.current?.setSearchParams();
    agent_action_table39b50Ref.current?.handleSearch({});
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
        !Array.isArray(agent_action_table39b50) &&
        Object.keys(agent_action_table39b50)?.length > 0
      ) {
        setagent_action_table39b50({})
      }
    } else prevRefreshRef.current = true
  }, [agent_action_table39b50Props?.refresh])


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
        gridRow: '10 / 142',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'#ffffff',
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
          setaiagentaction_v1((pre:any)=>({...pre,_selectedGroup_:"agent_action_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableagent_action_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={agent_action_table39b50Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupagent_action_table
