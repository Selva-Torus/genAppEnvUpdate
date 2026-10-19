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
import Tablerule_evaluation_table  from './Tablerule_evaluation_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_evaluation_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_tierassessment_v1Props, setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "previous_tier_code",
      "rule_code",
      "rule_name",
      "assessed_tier_code",
      "change_tier_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
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
  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id76935, settier_assessment_id76935}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id97328, setai_asset_id97328}= useContext(TotalContext) as TotalContextProps;
  const {previous_tier_codeb04e7, setprevious_tier_codeb04e7}= useContext(TotalContext) as TotalContextProps;
  const {rule_code8774e, setrule_code8774e}= useContext(TotalContext) as TotalContextProps;
  const {rule_name68434, setrule_name68434}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_codec45d4, setassessed_tier_codec45d4}= useContext(TotalContext) as TotalContextProps;
  const {change_tier_btn642f8, setchange_tier_btn642f8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {ruleevaluation_v1, setruleevaluation_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1',
    [user],
    'GroupRuleEvaluationTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3ebb4db546144797b9dd1be70639e865");
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
    setrule_evaluation_table9e865Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tier_assessment_id")){
        settier_assessment_id76935((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tier_assessment_id76935?.isDisabled==null)
      {
        settier_assessment_id76935((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id97328((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id97328?.isDisabled==null)
      {
        setai_asset_id97328((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("previous_tier_code")){
        setprevious_tier_codeb04e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(previous_tier_codeb04e7?.isDisabled==null)
      {
        setprevious_tier_codeb04e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_code")){
        setrule_code8774e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_code8774e?.isDisabled==null)
      {
        setrule_code8774e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_name")){
        setrule_name68434((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_name68434?.isDisabled==null)
      {
        setrule_name68434((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_tier_code")){
        setassessed_tier_codec45d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_tier_codec45d4?.isDisabled==null)
      {
        setassessed_tier_codec45d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("change_tier_btn")){
        setchange_tier_btn642f8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(change_tier_btn642f8?.isDisabled==null)
      {
        setchange_tier_btn642f8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3ebb4db546144797b9dd1be70639e865");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
        codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
        codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
        codeStates['ai_registry_group'] = ai_registry_groupb6b42,
        codeStates['setai_registry_group'] = setai_registry_groupb6b42,
        codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
        codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
        codeStates['group'] = group675e8,
        codeStates['setgroup'] = setgroup675e8,
        codeStates['group675e8'] = group675e8Props,
        codeStates['setgroup675e8'] = setgroup675e8Props,
        codeStates['desc_group'] = desc_groupda73a,
        codeStates['setdesc_group'] = setdesc_groupda73a,
        codeStates['desc_groupda73a'] = desc_groupda73aProps,
        codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
        codeStates['rule_group'] = rule_group83db0,
        codeStates['setrule_group'] = setrule_group83db0,
        codeStates['rule_group83db0'] = rule_group83db0Props,
        codeStates['setrule_group83db0'] = setrule_group83db0Props,
        codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
        codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
        codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
        codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,
        codeStates['tier_assessment_id'] = tier_assessment_id76935,
        codeStates['settier_assessment_id'] = settier_assessment_id76935,
        codeStates['ai_asset_id'] = ai_asset_id97328,
        codeStates['setai_asset_id'] = setai_asset_id97328,
        codeStates['previous_tier_code'] = previous_tier_codeb04e7,
        codeStates['setprevious_tier_code'] = setprevious_tier_codeb04e7,
        codeStates['rule_code'] = rule_code8774e,
        codeStates['setrule_code'] = setrule_code8774e,
        codeStates['rule_name'] = rule_name68434,
        codeStates['setrule_name'] = setrule_name68434,
        codeStates['assessed_tier_code'] = assessed_tier_codec45d4,
        codeStates['setassessed_tier_code'] = setassessed_tier_codec45d4,
        codeStates['change_tier_btn'] = change_tier_btn642f8,
        codeStates['setchange_tier_btn'] = setchange_tier_btn642f8,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_evaluation_table9e865Ref = useRef<any>(null);
  const handleClearSearch = () => {
    rule_evaluation_table9e865Ref.current?.setSearchParams();
    rule_evaluation_table9e865Ref.current?.handleSearch({});
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
        !Array.isArray(rule_evaluation_table9e865) &&
        Object.keys(rule_evaluation_table9e865)?.length > 0
      ) {
        setrule_evaluation_table9e865({})
        setrule_evaluation_table9e865Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [rule_evaluation_table9e865Props?.refresh])


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
        gridRow: '9 / 61',
      
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
          setruleevaluation_v1((pre:any)=>({...pre,_selectedGroup_:"rule_evaluation_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablerule_evaluation_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={rule_evaluation_table9e865Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouprule_evaluation_table
