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
  const {dfd_agentcertificatetable_v1Props, setdfd_agentcertificatetable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "certification_id",
      "cert_code",
      "risk_tier_code",
      "template_name",
      "initiated_on",
      "business_unit_name",
      "certificate_stages_btn",
      "show_stages"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
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
  const {overall_group6cd49, setoverall_group6cd49}= useContext(TotalContext) as TotalContextProps;
  const {overall_group6cd49Props, setoverall_group6cd49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48d, setai_asset_version_table_group1b48d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48dProps, setai_asset_version_table_group1b48dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3, setgroupa86a3}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3Props, setgroupa86a3Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8, setcertificate_table48fb8}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8Props, setcertificate_table48fb8Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_idc2134, setcertification_idc2134}= useContext(TotalContext) as TotalContextProps;
  const {cert_code3089c, setcert_code3089c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codeee516, setrisk_tier_codeee516}= useContext(TotalContext) as TotalContextProps;
  const {template_name84746, settemplate_name84746}= useContext(TotalContext) as TotalContextProps;
  const {initiated_one0200, setinitiated_one0200}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name3c111, setbusiness_unit_name3c111}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnb2668, setcertificate_stages_btnb2668}= useContext(TotalContext) as TotalContextProps;
  const {show_stages4c364, setshow_stages4c364}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {myapprovalcert_v1, setmyapprovalcert_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:myapprovalCert:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96fbffd3d21cb2c50afdc6e27bf48fb8");
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
    setcertificate_table48fb8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("certification_id")){
        setcertification_idc2134((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certification_idc2134?.isDisabled==null)
      {
        setcertification_idc2134((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_code3089c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code3089c?.isDisabled==null)
      {
        setcert_code3089c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_codeee516((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_codeee516?.isDisabled==null)
      {
        setrisk_tier_codeee516((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_name84746((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_name84746?.isDisabled==null)
      {
        settemplate_name84746((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_on")){
        setinitiated_one0200((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_one0200?.isDisabled==null)
      {
        setinitiated_one0200((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_name3c111((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_name3c111?.isDisabled==null)
      {
        setbusiness_unit_name3c111((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_stages_btn")){
        setcertificate_stages_btnb2668((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certificate_stages_btnb2668?.isDisabled==null)
      {
        setcertificate_stages_btnb2668((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("show_stages")){
        setshow_stages4c364((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(show_stages4c364?.isDisabled==null)
      {
        setshow_stages4c364((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "96fbffd3d21cb2c50afdc6e27bf48fb8");
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
        codeStates['overall_group'] = overall_group6cd49,
        codeStates['setoverall_group'] = setoverall_group6cd49,
        codeStates['overall_group6cd49'] = overall_group6cd49Props,
        codeStates['setoverall_group6cd49'] = setoverall_group6cd49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1b48d,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1b48d,
        codeStates['ai_asset_version_table_group1b48d'] = ai_asset_version_table_group1b48dProps,
        codeStates['setai_asset_version_table_group1b48d'] = setai_asset_version_table_group1b48dProps,
        codeStates['group'] = groupa86a3,
        codeStates['setgroup'] = setgroupa86a3,
        codeStates['groupa86a3'] = groupa86a3Props,
        codeStates['setgroupa86a3'] = setgroupa86a3Props,
        codeStates['certificate_table'] = certificate_table48fb8,
        codeStates['setcertificate_table'] = setcertificate_table48fb8,
        codeStates['certificate_table48fb8'] = certificate_table48fb8Props,
        codeStates['setcertificate_table48fb8'] = setcertificate_table48fb8Props,
        codeStates['certification_id'] = certification_idc2134,
        codeStates['setcertification_id'] = setcertification_idc2134,
        codeStates['cert_code'] = cert_code3089c,
        codeStates['setcert_code'] = setcert_code3089c,
        codeStates['risk_tier_code'] = risk_tier_codeee516,
        codeStates['setrisk_tier_code'] = setrisk_tier_codeee516,
        codeStates['template_name'] = template_name84746,
        codeStates['settemplate_name'] = settemplate_name84746,
        codeStates['initiated_on'] = initiated_one0200,
        codeStates['setinitiated_on'] = setinitiated_one0200,
        codeStates['business_unit_name'] = business_unit_name3c111,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name3c111,
        codeStates['certificate_stages_btn'] = certificate_stages_btnb2668,
        codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnb2668,
        codeStates['show_stages'] = show_stages4c364,
        codeStates['setshow_stages'] = setshow_stages4c364,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_table48fb8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_table48fb8Ref.current?.setSearchParams();
    certificate_table48fb8Ref.current?.handleSearch({});
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
        !Array.isArray(certificate_table48fb8) &&
        Object.keys(certificate_table48fb8)?.length > 0
      ) {
        setcertificate_table48fb8({})
        setcertificate_table48fb8Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_table48fb8Props?.refresh])


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
        gridRow: '29 / 144',
      
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
          setmyapprovalcert_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_table48fb8Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
