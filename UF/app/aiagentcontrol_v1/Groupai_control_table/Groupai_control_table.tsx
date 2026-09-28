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
import Tableai_control_table  from './Tableai_control_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_control_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "agent_control_id",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code",
      "kill_switch_state_code",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_control_group",
      "ai_registry_text_group",
      "ai_control_table"
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
  const {overall_ai_data_class672d4, setoverall_ai_data_class672d4}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class672d4Props, setoverall_ai_data_class672d4Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9, setai_control_group538c9}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9Props, setai_control_group538c9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbab, setai_registry_text_group8cbab}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbabProps, setai_registry_text_group8cbabProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126f, setai_control_table8126f}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126fProps, setai_control_table8126fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idb7f77, setai_asset_idb7f77}= useContext(TotalContext) as TotalContextProps;
  const {asset_name06439, setasset_name06439}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_id0dd2d, setagent_control_id0dd2d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_refc4c89, setagent_identity_refc4c89}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider4076a, setidentity_provider4076a}= useContext(TotalContext) as TotalContextProps;
  const {authority_level_codea4eeb, setauthority_level_codea4eeb}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_state_code78d44, setkill_switch_state_code78d44}= useContext(TotalContext) as TotalContextProps;
  const {edit_btab9fa, setedit_btab9fa}= useContext(TotalContext) as TotalContextProps;
  const {delete_bteda7a, setdelete_bteda7a}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aiagentcontrol_v1, setaiagentcontrol_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1',
    [user],
    'GroupAiControlTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f5f29f052a967c8eb254e29b6a48126f");
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
    setai_control_table8126fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_idb7f77((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_idb7f77?.isDisabled==null)
      {
        setai_asset_idb7f77((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name06439((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name06439?.isDisabled==null)
      {
        setasset_name06439((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_control_id")){
        setagent_control_id0dd2d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_control_id0dd2d?.isDisabled==null)
      {
        setagent_control_id0dd2d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_identity_ref")){
        setagent_identity_refc4c89((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_identity_refc4c89?.isDisabled==null)
      {
        setagent_identity_refc4c89((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_provider4076a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_provider4076a?.isDisabled==null)
      {
        setidentity_provider4076a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("authority_level_code")){
        setauthority_level_codea4eeb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_level_codea4eeb?.isDisabled==null)
      {
        setauthority_level_codea4eeb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("kill_switch_state_code")){
        setkill_switch_state_code78d44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(kill_switch_state_code78d44?.isDisabled==null)
      {
        setkill_switch_state_code78d44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_bt")){
        setedit_btab9fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btab9fa?.isDisabled==null)
      {
        setedit_btab9fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_bt")){
        setdelete_bteda7a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_bteda7a?.isDisabled==null)
      {
        setdelete_bteda7a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f5f29f052a967c8eb254e29b6a48126f");
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
        codeStates['overall_ai_data_class'] = overall_ai_data_class672d4,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class672d4,
        codeStates['overall_ai_data_class672d4'] = overall_ai_data_class672d4Props,
        codeStates['setoverall_ai_data_class672d4'] = setoverall_ai_data_class672d4Props,
        codeStates['ai_control_group'] = ai_control_group538c9,
        codeStates['setai_control_group'] = setai_control_group538c9,
        codeStates['ai_control_group538c9'] = ai_control_group538c9Props,
        codeStates['setai_control_group538c9'] = setai_control_group538c9Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8cbab,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8cbab,
        codeStates['ai_registry_text_group8cbab'] = ai_registry_text_group8cbabProps,
        codeStates['setai_registry_text_group8cbab'] = setai_registry_text_group8cbabProps,
        codeStates['ai_control_table'] = ai_control_table8126f,
        codeStates['setai_control_table'] = setai_control_table8126f,
        codeStates['ai_control_table8126f'] = ai_control_table8126fProps,
        codeStates['setai_control_table8126f'] = setai_control_table8126fProps,
        codeStates['ai_asset_id'] = ai_asset_idb7f77,
        codeStates['setai_asset_id'] = setai_asset_idb7f77,
        codeStates['asset_name'] = asset_name06439,
        codeStates['setasset_name'] = setasset_name06439,
        codeStates['agent_control_id'] = agent_control_id0dd2d,
        codeStates['setagent_control_id'] = setagent_control_id0dd2d,
        codeStates['agent_identity_ref'] = agent_identity_refc4c89,
        codeStates['setagent_identity_ref'] = setagent_identity_refc4c89,
        codeStates['identity_provider'] = identity_provider4076a,
        codeStates['setidentity_provider'] = setidentity_provider4076a,
        codeStates['authority_level_code'] = authority_level_codea4eeb,
        codeStates['setauthority_level_code'] = setauthority_level_codea4eeb,
        codeStates['kill_switch_state_code'] = kill_switch_state_code78d44,
        codeStates['setkill_switch_state_code'] = setkill_switch_state_code78d44,
        codeStates['edit_bt'] = edit_btab9fa,
        codeStates['setedit_bt'] = setedit_btab9fa,
        codeStates['delete_bt'] = delete_bteda7a,
        codeStates['setdelete_bt'] = setdelete_bteda7a,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_control_table8126fRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_control_table8126fRef.current?.setSearchParams();
    ai_control_table8126fRef.current?.handleSearch({});
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
        !Array.isArray(ai_control_table8126f) &&
        Object.keys(ai_control_table8126f)?.length > 0
      ) {
        setai_control_table8126f({})
      }
    } else prevRefreshRef.current = true
  }, [ai_control_table8126fProps?.refresh])


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
        gridRow: '14 / 146',
      
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
          setaiagentcontrol_v1((pre:any)=>({...pre,_selectedGroup_:"ai_control_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_control_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_control_table8126fRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_control_table
