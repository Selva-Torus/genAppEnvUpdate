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
  const {dfd_certificationstagestable_v1Props, setdfd_certificationstagestable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "stage_status_code",
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
  const {overall_groupf5901, setoverall_groupf5901}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupf5901Props, setoverall_groupf5901Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682b, setai_asset_version_table_groupa682b}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682bProps, setai_asset_version_table_groupa682bProps}= useContext(TotalContext) as TotalContextProps;
  const {group6f907, setgroup6f907}= useContext(TotalContext) as TotalContextProps;
  const {group6f907Props, setgroup6f907Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01d, setcertificate_tablebc01d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01dProps, setcertificate_tablebc01dProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idcd4f0, setcert_stage_idcd4f0}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence4c57e, setstage_sequence4c57e}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code75f70, setstage_type_code75f70}= useContext(TotalContext) as TotalContextProps;
  const {stage_name51f6d, setstage_name51f6d}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_namedfe29, setassigned_login_namedfe29}= useContext(TotalContext) as TotalContextProps;
  const {decided_onf4112, setdecided_onf4112}= useContext(TotalContext) as TotalContextProps;
  const {stage_status_codead22a, setstage_status_codead22a}= useContext(TotalContext) as TotalContextProps;
  const {edit_btne067e, setedit_btne067e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificationstages_v1, setcertificationstages_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationStages:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8f818cb76d267d3c83510489ed8bc01d");
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
    setcertificate_tablebc01dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_idcd4f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_idcd4f0?.isDisabled==null)
      {
        setcert_stage_idcd4f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequence4c57e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequence4c57e?.isDisabled==null)
      {
        setstage_sequence4c57e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_code75f70((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_code75f70?.isDisabled==null)
      {
        setstage_type_code75f70((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name51f6d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name51f6d?.isDisabled==null)
      {
        setstage_name51f6d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_login_name")){
        setassigned_login_namedfe29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assigned_login_namedfe29?.isDisabled==null)
      {
        setassigned_login_namedfe29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("decided_on")){
        setdecided_onf4112((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(decided_onf4112?.isDisabled==null)
      {
        setdecided_onf4112((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_status_code")){
        setstage_status_codead22a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_status_codead22a?.isDisabled==null)
      {
        setstage_status_codead22a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btne067e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btne067e?.isDisabled==null)
      {
        setedit_btne067e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8f818cb76d267d3c83510489ed8bc01d");
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
        codeStates['overall_group'] = overall_groupf5901,
        codeStates['setoverall_group'] = setoverall_groupf5901,
        codeStates['overall_groupf5901'] = overall_groupf5901Props,
        codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
        codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
        codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
        codeStates['group'] = group6f907,
        codeStates['setgroup'] = setgroup6f907,
        codeStates['group6f907'] = group6f907Props,
        codeStates['setgroup6f907'] = setgroup6f907Props,
        codeStates['certificate_table'] = certificate_tablebc01d,
        codeStates['setcertificate_table'] = setcertificate_tablebc01d,
        codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
        codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,
        codeStates['cert_stage_id'] = cert_stage_idcd4f0,
        codeStates['setcert_stage_id'] = setcert_stage_idcd4f0,
        codeStates['stage_sequence'] = stage_sequence4c57e,
        codeStates['setstage_sequence'] = setstage_sequence4c57e,
        codeStates['stage_type_code'] = stage_type_code75f70,
        codeStates['setstage_type_code'] = setstage_type_code75f70,
        codeStates['stage_name'] = stage_name51f6d,
        codeStates['setstage_name'] = setstage_name51f6d,
        codeStates['assigned_login_name'] = assigned_login_namedfe29,
        codeStates['setassigned_login_name'] = setassigned_login_namedfe29,
        codeStates['decided_on'] = decided_onf4112,
        codeStates['setdecided_on'] = setdecided_onf4112,
        codeStates['stage_status_code'] = stage_status_codead22a,
        codeStates['setstage_status_code'] = setstage_status_codead22a,
        codeStates['edit_btn'] = edit_btne067e,
        codeStates['setedit_btn'] = setedit_btne067e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_tablebc01dRef = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_tablebc01dRef.current?.setSearchParams();
    certificate_tablebc01dRef.current?.handleSearch({});
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
        !Array.isArray(certificate_tablebc01d) &&
        Object.keys(certificate_tablebc01d)?.length > 0
      ) {
        setcertificate_tablebc01d({})
        setcertificate_tablebc01dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_tablebc01dProps?.refresh])


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
        gridRow: '29 / 134',
      
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
          setcertificationstages_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_tablebc01dRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
