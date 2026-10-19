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
  const {dfd_myapprovalrisk_v1Props, setdfd_myapprovalrisk_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "tier_assessment_id",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "previous_tier_code",
      "assessed_tier_code",
      "approve_btn",
      "assessment_type",
      "assessed_by",
      "assessed_on"
    ],
    "allowedGroups": [
      "canvas",
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
  const {overall_group1b28a, setoverall_group1b28a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1b28aProps, setoverall_group1b28aProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ec, setai_asset_version_table_group2d2ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ecProps, setai_asset_version_table_group2d2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61c, setcertificate_table8c61c}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61cProps, setcertificate_table8c61cProps}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id04b97, settier_assessment_id04b97}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idcc640, setai_asset_idcc640}= useContext(TotalContext) as TotalContextProps;
  const {asset_code7c217, setasset_code7c217}= useContext(TotalContext) as TotalContextProps;
  const {asset_name4926c, setasset_name4926c}= useContext(TotalContext) as TotalContextProps;
  const {previous_tier_code9e9a1, setprevious_tier_code9e9a1}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_coded5fd2, setassessed_tier_coded5fd2}= useContext(TotalContext) as TotalContextProps;
  const {approve_btn770e7, setapprove_btn770e7}= useContext(TotalContext) as TotalContextProps;
  const {assessment_type67085, setassessment_type67085}= useContext(TotalContext) as TotalContextProps;
  const {assessed_byc6b93, setassessed_byc6b93}= useContext(TotalContext) as TotalContextProps;
  const {assessed_on8f41f, setassessed_on8f41f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {riskassetlist_v1, setriskassetlist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskAssetList:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e733d72b49362ebaeef14cd386c8c61c");
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
    setcertificate_table8c61cProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tier_assessment_id")){
        settier_assessment_id04b97((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tier_assessment_id04b97?.isDisabled==null)
      {
        settier_assessment_id04b97((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_idcc640((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_idcc640?.isDisabled==null)
      {
        setai_asset_idcc640((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code7c217((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code7c217?.isDisabled==null)
      {
        setasset_code7c217((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name4926c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name4926c?.isDisabled==null)
      {
        setasset_name4926c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("previous_tier_code")){
        setprevious_tier_code9e9a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(previous_tier_code9e9a1?.isDisabled==null)
      {
        setprevious_tier_code9e9a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_tier_code")){
        setassessed_tier_coded5fd2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_tier_coded5fd2?.isDisabled==null)
      {
        setassessed_tier_coded5fd2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve_btn")){
        setapprove_btn770e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve_btn770e7?.isDisabled==null)
      {
        setapprove_btn770e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessment_type")){
        setassessment_type67085((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessment_type67085?.isDisabled==null)
      {
        setassessment_type67085((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_by")){
        setassessed_byc6b93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_byc6b93?.isDisabled==null)
      {
        setassessed_byc6b93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assessed_on")){
        setassessed_on8f41f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assessed_on8f41f?.isDisabled==null)
      {
        setassessed_on8f41f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e733d72b49362ebaeef14cd386c8c61c");
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
        codeStates['overall_group'] = overall_group1b28a,
        codeStates['setoverall_group'] = setoverall_group1b28a,
        codeStates['overall_group1b28a'] = overall_group1b28aProps,
        codeStates['setoverall_group1b28a'] = setoverall_group1b28aProps,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group2d2ec,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group2d2ec,
        codeStates['ai_asset_version_table_group2d2ec'] = ai_asset_version_table_group2d2ecProps,
        codeStates['setai_asset_version_table_group2d2ec'] = setai_asset_version_table_group2d2ecProps,
        codeStates['certificate_table'] = certificate_table8c61c,
        codeStates['setcertificate_table'] = setcertificate_table8c61c,
        codeStates['certificate_table8c61c'] = certificate_table8c61cProps,
        codeStates['setcertificate_table8c61c'] = setcertificate_table8c61cProps,
        codeStates['tier_assessment_id'] = tier_assessment_id04b97,
        codeStates['settier_assessment_id'] = settier_assessment_id04b97,
        codeStates['ai_asset_id'] = ai_asset_idcc640,
        codeStates['setai_asset_id'] = setai_asset_idcc640,
        codeStates['asset_code'] = asset_code7c217,
        codeStates['setasset_code'] = setasset_code7c217,
        codeStates['asset_name'] = asset_name4926c,
        codeStates['setasset_name'] = setasset_name4926c,
        codeStates['previous_tier_code'] = previous_tier_code9e9a1,
        codeStates['setprevious_tier_code'] = setprevious_tier_code9e9a1,
        codeStates['assessed_tier_code'] = assessed_tier_coded5fd2,
        codeStates['setassessed_tier_code'] = setassessed_tier_coded5fd2,
        codeStates['approve_btn'] = approve_btn770e7,
        codeStates['setapprove_btn'] = setapprove_btn770e7,
        codeStates['assessment_type'] = assessment_type67085,
        codeStates['setassessment_type'] = setassessment_type67085,
        codeStates['assessed_by'] = assessed_byc6b93,
        codeStates['setassessed_by'] = setassessed_byc6b93,
        codeStates['assessed_on'] = assessed_on8f41f,
        codeStates['setassessed_on'] = setassessed_on8f41f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_table8c61cRef = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_table8c61cRef.current?.setSearchParams();
    certificate_table8c61cRef.current?.handleSearch({});
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
        !Array.isArray(certificate_table8c61c) &&
        Object.keys(certificate_table8c61c)?.length > 0
      ) {
        setcertificate_table8c61c({})
        setcertificate_table8c61cProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_table8c61cProps?.refresh])


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
        gridRow: '9 / 144',
      
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
          setriskassetlist_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_table8c61cRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
