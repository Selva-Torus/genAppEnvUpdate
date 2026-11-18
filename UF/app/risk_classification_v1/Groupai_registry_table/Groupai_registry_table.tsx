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
import Tableai_registry_table  from './Tableai_registry_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_airegistry_v1Props, setdfd_airegistry_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
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
  const {overall_ai_asset_registry8ac99, setoverall_ai_asset_registry8ac99}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry8ac99Props, setoverall_ai_asset_registry8ac99Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5043e, setai_registry_group5043e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5043eProps, setai_registry_group5043eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupfc839, setai_registry_text_groupfc839}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupfc839Props, setai_registry_text_groupfc839Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table0e400, setai_registry_table0e400}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table0e400Props, setai_registry_table0e400Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_ided67d, setai_asset_ided67d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code9ccc1, setasset_code9ccc1}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameed2a9, setasset_nameed2a9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code9aa4b, setasset_type_code9aa4b}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codedeff4, setrisk_tier_codedeff4}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name7efed, setbusiness_unit_name7efed}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namee2591, setbusiness_owner_namee2591}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_name08dcb, settechnical_owner_name08dcb}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code8c829, setdiscovery_source_code8c829}= useContext(TotalContext) as TotalContextProps;
  const {calculate_risk04417, setcalculate_risk04417}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_codea5742, setlifecycle_status_codea5742}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetlist_v1, setassetlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1',
    [user],
    'GroupAiRegistryTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "359ced20e56ba1041a74f13c7b70e400");
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
    setai_registry_table0e400Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_ided67d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_ided67d?.isDisabled==null)
      {
        setai_asset_ided67d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code9ccc1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code9ccc1?.isDisabled==null)
      {
        setasset_code9ccc1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_nameed2a9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_nameed2a9?.isDisabled==null)
      {
        setasset_nameed2a9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code9aa4b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code9aa4b?.isDisabled==null)
      {
        setasset_type_code9aa4b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_codedeff4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_codedeff4?.isDisabled==null)
      {
        setrisk_tier_codedeff4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name7efed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name7efed?.isDisabled==null)
      {
        setbusiness_unit_name7efed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_namee2591((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_namee2591?.isDisabled==null)
      {
        setbusiness_owner_namee2591((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("technical_owner_name")){
        settechnical_owner_name08dcb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(technical_owner_name08dcb?.isDisabled==null)
      {
        settechnical_owner_name08dcb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("discovery_source_code")){
        setdiscovery_source_code8c829((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_source_code8c829?.isDisabled==null)
      {
        setdiscovery_source_code8c829((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("calculate_risk")){
        setcalculate_risk04417((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(calculate_risk04417?.isDisabled==null)
      {
        setcalculate_risk04417((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_codea5742((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_codea5742?.isDisabled==null)
      {
        setlifecycle_status_codea5742((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "359ced20e56ba1041a74f13c7b70e400");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry8ac99,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry8ac99,
        codeStates['overall_ai_asset_registry8ac99'] = overall_ai_asset_registry8ac99Props,
        codeStates['setoverall_ai_asset_registry8ac99'] = setoverall_ai_asset_registry8ac99Props,
        codeStates['ai_registry_group'] = ai_registry_group5043e,
        codeStates['setai_registry_group'] = setai_registry_group5043e,
        codeStates['ai_registry_group5043e'] = ai_registry_group5043eProps,
        codeStates['setai_registry_group5043e'] = setai_registry_group5043eProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupfc839,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupfc839,
        codeStates['ai_registry_text_groupfc839'] = ai_registry_text_groupfc839Props,
        codeStates['setai_registry_text_groupfc839'] = setai_registry_text_groupfc839Props,
        codeStates['ai_registry_table'] = ai_registry_table0e400,
        codeStates['setai_registry_table'] = setai_registry_table0e400,
        codeStates['ai_registry_table0e400'] = ai_registry_table0e400Props,
        codeStates['setai_registry_table0e400'] = setai_registry_table0e400Props,
        codeStates['ai_asset_id'] = ai_asset_ided67d,
        codeStates['setai_asset_id'] = setai_asset_ided67d,
        codeStates['asset_code'] = asset_code9ccc1,
        codeStates['setasset_code'] = setasset_code9ccc1,
        codeStates['asset_name'] = asset_nameed2a9,
        codeStates['setasset_name'] = setasset_nameed2a9,
        codeStates['asset_type_code'] = asset_type_code9aa4b,
        codeStates['setasset_type_code'] = setasset_type_code9aa4b,
        codeStates['risk_tier_code'] = risk_tier_codedeff4,
        codeStates['setrisk_tier_code'] = setrisk_tier_codedeff4,
        codeStates['business_unit_name'] = business_unit_name7efed,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name7efed,
        codeStates['business_owner_name'] = business_owner_namee2591,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_namee2591,
        codeStates['technical_owner_name'] = technical_owner_name08dcb,
        codeStates['settechnical_owner_name'] = settechnical_owner_name08dcb,
        codeStates['discovery_source_code'] = discovery_source_code8c829,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code8c829,
        codeStates['calculate_risk'] = calculate_risk04417,
        codeStates['setcalculate_risk'] = setcalculate_risk04417,
        codeStates['lifecycle_status_code'] = lifecycle_status_codea5742,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_codea5742,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_table0e400Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_table0e400Ref.current?.setSearchParams();
    ai_registry_table0e400Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_table0e400) &&
        Object.keys(ai_registry_table0e400)?.length > 0
      ) {
        setai_registry_table0e400({})
        setai_registry_table0e400Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_table0e400Props?.refresh])


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
        gridRow: '11 / 143',
      
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
          setassetlist_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_registry_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_registry_table0e400Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_registry_table
