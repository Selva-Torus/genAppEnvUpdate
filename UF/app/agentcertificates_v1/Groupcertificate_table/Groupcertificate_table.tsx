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
      "edit_btn"
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
      "edit_btn"
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
      "edit_btn"
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
      "edit_btn"
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
      "edit_btn"
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
      "edit_btn"
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
      "edit_btn"
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
  const {overall_groupae13f, setoverall_groupae13f}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae13fProps, setoverall_groupae13fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701, setai_asset_version_table_group35701}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701Props, setai_asset_version_table_group35701Props}= useContext(TotalContext) as TotalContextProps;
  const {groupf74cc, setgroupf74cc}= useContext(TotalContext) as TotalContextProps;
  const {groupf74ccProps, setgroupf74ccProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32ae, setcertificate_tablea32ae}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32aeProps, setcertificate_tablea32aeProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_idc1df1, setcertification_idc1df1}= useContext(TotalContext) as TotalContextProps;
  const {cert_code8a33d, setcert_code8a33d}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codeba0b3, setrisk_tier_codeba0b3}= useContext(TotalContext) as TotalContextProps;
  const {template_nameb0455, settemplate_nameb0455}= useContext(TotalContext) as TotalContextProps;
  const {initiated_onc5bb1, setinitiated_onc5bb1}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_nameb5a7a, setbusiness_unit_nameb5a7a}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnde66b, setcertificate_stages_btnde66b}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn02d22, setedit_btn02d22}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {agentcertificates_v1, setagentcertificates_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:agentCertificates:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f787e987cb3df8b477db7010418a32ae");
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
    setcertificate_tablea32aeProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("certification_id")){
        setcertification_idc1df1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certification_idc1df1?.isDisabled==null)
      {
        setcertification_idc1df1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_code8a33d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code8a33d?.isDisabled==null)
      {
        setcert_code8a33d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_codeba0b3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_codeba0b3?.isDisabled==null)
      {
        setrisk_tier_codeba0b3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_nameb0455((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_nameb0455?.isDisabled==null)
      {
        settemplate_nameb0455((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_on")){
        setinitiated_onc5bb1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_onc5bb1?.isDisabled==null)
      {
        setinitiated_onc5bb1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("business_unit_name")){
        setbusiness_unit_nameb5a7a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(business_unit_nameb5a7a?.isDisabled==null)
      {
        setbusiness_unit_nameb5a7a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_stages_btn")){
        setcertificate_stages_btnde66b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(certificate_stages_btnde66b?.isDisabled==null)
      {
        setcertificate_stages_btnde66b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn02d22((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn02d22?.isDisabled==null)
      {
        setedit_btn02d22((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f787e987cb3df8b477db7010418a32ae");
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
        codeStates['overall_group'] = overall_groupae13f,
        codeStates['setoverall_group'] = setoverall_groupae13f,
        codeStates['overall_groupae13f'] = overall_groupae13fProps,
        codeStates['setoverall_groupae13f'] = setoverall_groupae13fProps,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group35701,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group35701,
        codeStates['ai_asset_version_table_group35701'] = ai_asset_version_table_group35701Props,
        codeStates['setai_asset_version_table_group35701'] = setai_asset_version_table_group35701Props,
        codeStates['group'] = groupf74cc,
        codeStates['setgroup'] = setgroupf74cc,
        codeStates['groupf74cc'] = groupf74ccProps,
        codeStates['setgroupf74cc'] = setgroupf74ccProps,
        codeStates['certificate_table'] = certificate_tablea32ae,
        codeStates['setcertificate_table'] = setcertificate_tablea32ae,
        codeStates['certificate_tablea32ae'] = certificate_tablea32aeProps,
        codeStates['setcertificate_tablea32ae'] = setcertificate_tablea32aeProps,
        codeStates['certification_id'] = certification_idc1df1,
        codeStates['setcertification_id'] = setcertification_idc1df1,
        codeStates['cert_code'] = cert_code8a33d,
        codeStates['setcert_code'] = setcert_code8a33d,
        codeStates['risk_tier_code'] = risk_tier_codeba0b3,
        codeStates['setrisk_tier_code'] = setrisk_tier_codeba0b3,
        codeStates['template_name'] = template_nameb0455,
        codeStates['settemplate_name'] = settemplate_nameb0455,
        codeStates['initiated_on'] = initiated_onc5bb1,
        codeStates['setinitiated_on'] = setinitiated_onc5bb1,
        codeStates['business_unit_name'] = business_unit_nameb5a7a,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_nameb5a7a,
        codeStates['certificate_stages_btn'] = certificate_stages_btnde66b,
        codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnde66b,
        codeStates['edit_btn'] = edit_btn02d22,
        codeStates['setedit_btn'] = setedit_btn02d22,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_tablea32aeRef = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_tablea32aeRef.current?.setSearchParams();
    certificate_tablea32aeRef.current?.handleSearch({});
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
        !Array.isArray(certificate_tablea32ae) &&
        Object.keys(certificate_tablea32ae)?.length > 0
      ) {
        setcertificate_tablea32ae({})
        setcertificate_tablea32aeProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_tablea32aeProps?.refresh])


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
        gridRow: '39 / 144',
      
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
          setagentcertificates_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_tablea32aeRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
