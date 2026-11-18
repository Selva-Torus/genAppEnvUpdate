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
import Tablecertificate_table  from './Tablecertificate_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcertificate_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetlist_v1Props, setdfd_assetlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "asset_version_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "certificate_stages_btn",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
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
  const {overall_groupedc31, setoverall_groupedc31}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupedc31Props, setoverall_groupedc31Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0, setai_asset_version_table_groupc80e0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0Props, setai_asset_version_table_groupc80e0Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941, setcertificate_tableaa941}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941Props, setcertificate_tableaa941Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_id74d58, setasset_version_id74d58}= useContext(TotalContext) as TotalContextProps;
  const {asset_code42c4f, setasset_code42c4f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name527a0, setasset_name527a0}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code42ada, setasset_type_code42ada}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code78b3a, setrisk_tier_code78b3a}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name76651, setbusiness_unit_name76651}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_name7cdf2, setbusiness_owner_name7cdf2}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnf28b5, setcertificate_stages_btnf28b5}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_coded16a4, setdiscovery_source_coded16a4}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_codeddfc4, setlifecycle_status_codeddfc4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certification_v1, setcertification_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certification:AFVK:v1',
    [user],
    'GroupCertificateTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2178aeed8e5be8124bb2f196f35aa941");
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
    setcertificate_tableaa941Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("asset_version_id")){
        setasset_version_id74d58((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_version_id74d58?.isDisabled==null)
      {
        setasset_version_id74d58((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code42c4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code42c4f?.isDisabled==null)
      {
        setasset_code42c4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name527a0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name527a0?.isDisabled==null)
      {
        setasset_name527a0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code42ada((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code42ada?.isDisabled==null)
      {
        setasset_type_code42ada((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code78b3a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code78b3a?.isDisabled==null)
      {
        setrisk_tier_code78b3a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name76651((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name76651?.isDisabled==null)
      {
        setbusiness_unit_name76651((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_owner_name")){
        setbusiness_owner_name7cdf2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_owner_name7cdf2?.isDisabled==null)
      {
        setbusiness_owner_name7cdf2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_stages_btn")){
        setcertificate_stages_btnf28b5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certificate_stages_btnf28b5?.isDisabled==null)
      {
        setcertificate_stages_btnf28b5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("discovery_source_code")){
        setdiscovery_source_coded16a4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(discovery_source_coded16a4?.isDisabled==null)
      {
        setdiscovery_source_coded16a4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lifecycle_status_code")){
        setlifecycle_status_codeddfc4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_status_codeddfc4?.isDisabled==null)
      {
        setlifecycle_status_codeddfc4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2178aeed8e5be8124bb2f196f35aa941");
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
        codeStates['overall_group'] = overall_groupedc31,
        codeStates['setoverall_group'] = setoverall_groupedc31,
        codeStates['overall_groupedc31'] = overall_groupedc31Props,
        codeStates['setoverall_groupedc31'] = setoverall_groupedc31Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupc80e0,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupc80e0,
        codeStates['ai_asset_version_table_groupc80e0'] = ai_asset_version_table_groupc80e0Props,
        codeStates['setai_asset_version_table_groupc80e0'] = setai_asset_version_table_groupc80e0Props,
        codeStates['certificate_table'] = certificate_tableaa941,
        codeStates['setcertificate_table'] = setcertificate_tableaa941,
        codeStates['certificate_tableaa941'] = certificate_tableaa941Props,
        codeStates['setcertificate_tableaa941'] = setcertificate_tableaa941Props,
        codeStates['asset_version_id'] = asset_version_id74d58,
        codeStates['setasset_version_id'] = setasset_version_id74d58,
        codeStates['asset_code'] = asset_code42c4f,
        codeStates['setasset_code'] = setasset_code42c4f,
        codeStates['asset_name'] = asset_name527a0,
        codeStates['setasset_name'] = setasset_name527a0,
        codeStates['asset_type_code'] = asset_type_code42ada,
        codeStates['setasset_type_code'] = setasset_type_code42ada,
        codeStates['risk_tier_code'] = risk_tier_code78b3a,
        codeStates['setrisk_tier_code'] = setrisk_tier_code78b3a,
        codeStates['business_unit_name'] = business_unit_name76651,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name76651,
        codeStates['business_owner_name'] = business_owner_name7cdf2,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_name7cdf2,
        codeStates['certificate_stages_btn'] = certificate_stages_btnf28b5,
        codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnf28b5,
        codeStates['discovery_source_code'] = discovery_source_coded16a4,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_coded16a4,
        codeStates['lifecycle_status_code'] = lifecycle_status_codeddfc4,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_codeddfc4,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_tableaa941Ref = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_tableaa941Ref.current?.setSearchParams();
    certificate_tableaa941Ref.current?.handleSearch({});
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
        !Array.isArray(certificate_tableaa941) &&
        Object.keys(certificate_tableaa941)?.length > 0
      ) {
        setcertificate_tableaa941({})
        setcertificate_tableaa941Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_tableaa941Props?.refresh])


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
        gridRow: '9 / 142',
      
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
          setcertification_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_tableaa941Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
