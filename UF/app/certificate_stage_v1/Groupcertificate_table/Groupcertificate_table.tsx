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
  const {dfd_myapprovaltable_v1Props, setdfd_myapprovaltable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "approve_btn",
      "view_evidence_btn"
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
  const {overall_groupde19e, setoverall_groupde19e}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupde19eProps, setoverall_groupde19eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015, setai_asset_version_table_group4a015}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015Props, setai_asset_version_table_group4a015Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096, setcertificate_tablefb096}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096Props, setcertificate_tablefb096Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idb993c, setai_asset_idb993c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code2b472, setasset_code2b472}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec5c0e, setasset_namec5c0e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code838c5, setasset_type_code838c5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code9cbc7, setrisk_tier_code9cbc7}= useContext(TotalContext) as TotalContextProps;
  const {approve_btnfafc6, setapprove_btnfafc6}= useContext(TotalContext) as TotalContextProps;
  const {view_evidence_btn5373f, setview_evidence_btn5373f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetapproval_v1, setassetapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2dcd0e2f9f7719aaf7ad25eb365fb096");
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
    setcertificate_tablefb096Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_idb993c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_idb993c?.isDisabled==null)
      {
        setai_asset_idb993c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code2b472((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code2b472?.isDisabled==null)
      {
        setasset_code2b472((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namec5c0e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namec5c0e?.isDisabled==null)
      {
        setasset_namec5c0e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_code")){
        setasset_type_code838c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_type_code838c5?.isDisabled==null)
      {
        setasset_type_code838c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_tier_code")){
        setrisk_tier_code9cbc7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_tier_code9cbc7?.isDisabled==null)
      {
        setrisk_tier_code9cbc7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve_btn")){
        setapprove_btnfafc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve_btnfafc6?.isDisabled==null)
      {
        setapprove_btnfafc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_evidence_btn")){
        setview_evidence_btn5373f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_evidence_btn5373f?.isDisabled==null)
      {
        setview_evidence_btn5373f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2dcd0e2f9f7719aaf7ad25eb365fb096");
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
        codeStates['overall_group'] = overall_groupde19e,
        codeStates['setoverall_group'] = setoverall_groupde19e,
        codeStates['overall_groupde19e'] = overall_groupde19eProps,
        codeStates['setoverall_groupde19e'] = setoverall_groupde19eProps,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group4a015,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group4a015,
        codeStates['ai_asset_version_table_group4a015'] = ai_asset_version_table_group4a015Props,
        codeStates['setai_asset_version_table_group4a015'] = setai_asset_version_table_group4a015Props,
        codeStates['certificate_table'] = certificate_tablefb096,
        codeStates['setcertificate_table'] = setcertificate_tablefb096,
        codeStates['certificate_tablefb096'] = certificate_tablefb096Props,
        codeStates['setcertificate_tablefb096'] = setcertificate_tablefb096Props,
        codeStates['ai_asset_id'] = ai_asset_idb993c,
        codeStates['setai_asset_id'] = setai_asset_idb993c,
        codeStates['asset_code'] = asset_code2b472,
        codeStates['setasset_code'] = setasset_code2b472,
        codeStates['asset_name'] = asset_namec5c0e,
        codeStates['setasset_name'] = setasset_namec5c0e,
        codeStates['asset_type_code'] = asset_type_code838c5,
        codeStates['setasset_type_code'] = setasset_type_code838c5,
        codeStates['risk_tier_code'] = risk_tier_code9cbc7,
        codeStates['setrisk_tier_code'] = setrisk_tier_code9cbc7,
        codeStates['approve_btn'] = approve_btnfafc6,
        codeStates['setapprove_btn'] = setapprove_btnfafc6,
        codeStates['view_evidence_btn'] = view_evidence_btn5373f,
        codeStates['setview_evidence_btn'] = setview_evidence_btn5373f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const certificate_tablefb096Ref = useRef<any>(null);
  const handleClearSearch = () => {
    certificate_tablefb096Ref.current?.setSearchParams();
    certificate_tablefb096Ref.current?.handleSearch({});
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
        !Array.isArray(certificate_tablefb096) &&
        Object.keys(certificate_tablefb096)?.length > 0
      ) {
        setcertificate_tablefb096({})
        setcertificate_tablefb096Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [certificate_tablefb096Props?.refresh])


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
          setassetapproval_v1((pre:any)=>({...pre,_selectedGroup_:"certificate_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablecertificate_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={certificate_tablefb096Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupcertificate_table
