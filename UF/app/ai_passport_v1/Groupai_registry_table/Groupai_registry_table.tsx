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
  const {dfd_aipassport_v1Props, setdfd_aipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
  const {overall_ai_asset_registry3961c, setoverall_ai_asset_registry3961c}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3961cProps, setoverall_ai_asset_registry3961cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2f, setai_registry_group7ba2f}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2fProps, setai_registry_group7ba2fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849, setai_registry_text_group8b849}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849Props, setai_registry_text_group8b849Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5c, setai_registry_table91f5c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5cProps, setai_registry_table91f5cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_iddb52f, setai_asset_iddb52f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameed2ce, setasset_nameed2ce}= useContext(TotalContext) as TotalContextProps;
  const {asset_codee08cb, setasset_codee08cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code33d1e, setasset_type_code33d1e}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code24a57, setrisk_tier_code24a57}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name61107, setbusiness_unit_name61107}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_name6b6fb, setbusiness_owner_name6b6fb}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code76eba, setdiscovery_source_code76eba}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code6a8aa, setlifecycle_status_code6a8aa}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {airegistryview_v1, setairegistryview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryView:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5be4b9736604e36ddb7b4159a0591f5c");
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
    setai_registry_table91f5cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_iddb52f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_iddb52f?.isDisabled==null)
      {
        setai_asset_iddb52f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_nameed2ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_nameed2ce?.isDisabled==null)
      {
        setasset_nameed2ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_codee08cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_codee08cb?.isDisabled==null)
      {
        setasset_codee08cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code33d1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code33d1e?.isDisabled==null)
      {
        setasset_type_code33d1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code24a57((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code24a57?.isDisabled==null)
      {
        setrisk_tier_code24a57((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name61107((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name61107?.isDisabled==null)
      {
        setbusiness_unit_name61107((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_name6b6fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_name6b6fb?.isDisabled==null)
      {
        setbusiness_owner_name6b6fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("discovery_source_code")){
        setdiscovery_source_code76eba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_source_code76eba?.isDisabled==null)
      {
        setdiscovery_source_code76eba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_code6a8aa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_code6a8aa?.isDisabled==null)
      {
        setlifecycle_status_code6a8aa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5be4b9736604e36ddb7b4159a0591f5c");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3961c,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3961c,
        codeStates['overall_ai_asset_registry3961c'] = overall_ai_asset_registry3961cProps,
        codeStates['setoverall_ai_asset_registry3961c'] = setoverall_ai_asset_registry3961cProps,
        codeStates['ai_registry_group'] = ai_registry_group7ba2f,
        codeStates['setai_registry_group'] = setai_registry_group7ba2f,
        codeStates['ai_registry_group7ba2f'] = ai_registry_group7ba2fProps,
        codeStates['setai_registry_group7ba2f'] = setai_registry_group7ba2fProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8b849,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8b849,
        codeStates['ai_registry_text_group8b849'] = ai_registry_text_group8b849Props,
        codeStates['setai_registry_text_group8b849'] = setai_registry_text_group8b849Props,
        codeStates['ai_registry_table'] = ai_registry_table91f5c,
        codeStates['setai_registry_table'] = setai_registry_table91f5c,
        codeStates['ai_registry_table91f5c'] = ai_registry_table91f5cProps,
        codeStates['setai_registry_table91f5c'] = setai_registry_table91f5cProps,
        codeStates['ai_asset_id'] = ai_asset_iddb52f,
        codeStates['setai_asset_id'] = setai_asset_iddb52f,
        codeStates['asset_name'] = asset_nameed2ce,
        codeStates['setasset_name'] = setasset_nameed2ce,
        codeStates['asset_code'] = asset_codee08cb,
        codeStates['setasset_code'] = setasset_codee08cb,
        codeStates['asset_type_code'] = asset_type_code33d1e,
        codeStates['setasset_type_code'] = setasset_type_code33d1e,
        codeStates['risk_tier_code'] = risk_tier_code24a57,
        codeStates['setrisk_tier_code'] = setrisk_tier_code24a57,
        codeStates['business_unit_name'] = business_unit_name61107,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name61107,
        codeStates['business_owner_name'] = business_owner_name6b6fb,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_name6b6fb,
        codeStates['discovery_source_code'] = discovery_source_code76eba,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code76eba,
        codeStates['lifecycle_status_code'] = lifecycle_status_code6a8aa,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code6a8aa,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_table91f5cRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_table91f5cRef.current?.setSearchParams();
    ai_registry_table91f5cRef.current?.handleSearch({});
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
        !Array.isArray(ai_registry_table91f5c) &&
        Object.keys(ai_registry_table91f5c)?.length > 0
      ) {
        setai_registry_table91f5c({})
        setai_registry_table91f5cProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_table91f5cProps?.refresh])


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
          setairegistryview_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_registry_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_registry_table91f5cRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_registry_table
