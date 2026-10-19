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
import Tablestages_table  from './Tablestages_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstages_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_listallshowstages_v1Props, setdfd_listallshowstages_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
      "stage_status_code",
      "initiated_by_user_id",
      "initiated_on",
      "assigned_login_name",
      "expiry_date",
      "approve_btn",
      "condition_btn",
      "view_attach_btn",
      "view_evidence_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
  const {overall_groupd5c13, setoverall_groupd5c13}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupd5c13Props, setoverall_groupd5c13Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6, setai_asset_version_table_group5cbf6}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6Props, setai_asset_version_table_group5cbf6Props}= useContext(TotalContext) as TotalContextProps;
  const {group32bca, setgroup32bca}= useContext(TotalContext) as TotalContextProps;
  const {group32bcaProps, setgroup32bcaProps}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82, setstages_table01d82}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82Props, setstages_table01d82Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idf4e4a, setcert_stage_idf4e4a}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence77cb4, setstage_sequence77cb4}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codeaba16, setstage_type_codeaba16}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6f01e, setstage_name6f01e}= useContext(TotalContext) as TotalContextProps;
  const {stage_status_code53e7b, setstage_status_code53e7b}= useContext(TotalContext) as TotalContextProps;
  const {initiated_by_user_id9e7cb, setinitiated_by_user_id9e7cb}= useContext(TotalContext) as TotalContextProps;
  const {initiated_onde819, setinitiated_onde819}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name96056, setassigned_login_name96056}= useContext(TotalContext) as TotalContextProps;
  const {expiry_datea44d5, setexpiry_datea44d5}= useContext(TotalContext) as TotalContextProps;
  const {approve_btn67764, setapprove_btn67764}= useContext(TotalContext) as TotalContextProps;
  const {condition_btn335e4, setcondition_btn335e4}= useContext(TotalContext) as TotalContextProps;
  const {view_attach_btnd4d21, setview_attach_btnd4d21}= useContext(TotalContext) as TotalContextProps;
  const {view_evidence_btna42e5, setview_evidence_btna42e5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {liststagesbyloginid_v1, setliststagesbyloginid_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ListStagesByLoginId:AFVK:v1',
    [user],
    'GroupStagesTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a389afe9f961345264193b1318501d82");
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
    setstages_table01d82Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_idf4e4a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_idf4e4a?.isDisabled==null)
      {
        setcert_stage_idf4e4a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequence77cb4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequence77cb4?.isDisabled==null)
      {
        setstage_sequence77cb4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_codeaba16((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_codeaba16?.isDisabled==null)
      {
        setstage_type_codeaba16((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name6f01e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name6f01e?.isDisabled==null)
      {
        setstage_name6f01e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_status_code")){
        setstage_status_code53e7b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_status_code53e7b?.isDisabled==null)
      {
        setstage_status_code53e7b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_by_user_id")){
        setinitiated_by_user_id9e7cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_by_user_id9e7cb?.isDisabled==null)
      {
        setinitiated_by_user_id9e7cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_on")){
        setinitiated_onde819((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_onde819?.isDisabled==null)
      {
        setinitiated_onde819((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_login_name")){
        setassigned_login_name96056((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assigned_login_name96056?.isDisabled==null)
      {
        setassigned_login_name96056((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expiry_date")){
        setexpiry_datea44d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expiry_datea44d5?.isDisabled==null)
      {
        setexpiry_datea44d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve_btn")){
        setapprove_btn67764((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve_btn67764?.isDisabled==null)
      {
        setapprove_btn67764((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_btn")){
        setcondition_btn335e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(condition_btn335e4?.isDisabled==null)
      {
        setcondition_btn335e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_attach_btn")){
        setview_attach_btnd4d21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_attach_btnd4d21?.isDisabled==null)
      {
        setview_attach_btnd4d21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_evidence_btn")){
        setview_evidence_btna42e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_evidence_btna42e5?.isDisabled==null)
      {
        setview_evidence_btna42e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a389afe9f961345264193b1318501d82");
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
        codeStates['overall_group'] = overall_groupd5c13,
        codeStates['setoverall_group'] = setoverall_groupd5c13,
        codeStates['overall_groupd5c13'] = overall_groupd5c13Props,
        codeStates['setoverall_groupd5c13'] = setoverall_groupd5c13Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group5cbf6,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group5cbf6,
        codeStates['ai_asset_version_table_group5cbf6'] = ai_asset_version_table_group5cbf6Props,
        codeStates['setai_asset_version_table_group5cbf6'] = setai_asset_version_table_group5cbf6Props,
        codeStates['group'] = group32bca,
        codeStates['setgroup'] = setgroup32bca,
        codeStates['group32bca'] = group32bcaProps,
        codeStates['setgroup32bca'] = setgroup32bcaProps,
        codeStates['stages_table'] = stages_table01d82,
        codeStates['setstages_table'] = setstages_table01d82,
        codeStates['stages_table01d82'] = stages_table01d82Props,
        codeStates['setstages_table01d82'] = setstages_table01d82Props,
        codeStates['cert_stage_id'] = cert_stage_idf4e4a,
        codeStates['setcert_stage_id'] = setcert_stage_idf4e4a,
        codeStates['stage_sequence'] = stage_sequence77cb4,
        codeStates['setstage_sequence'] = setstage_sequence77cb4,
        codeStates['stage_type_code'] = stage_type_codeaba16,
        codeStates['setstage_type_code'] = setstage_type_codeaba16,
        codeStates['stage_name'] = stage_name6f01e,
        codeStates['setstage_name'] = setstage_name6f01e,
        codeStates['stage_status_code'] = stage_status_code53e7b,
        codeStates['setstage_status_code'] = setstage_status_code53e7b,
        codeStates['initiated_by_user_id'] = initiated_by_user_id9e7cb,
        codeStates['setinitiated_by_user_id'] = setinitiated_by_user_id9e7cb,
        codeStates['initiated_on'] = initiated_onde819,
        codeStates['setinitiated_on'] = setinitiated_onde819,
        codeStates['assigned_login_name'] = assigned_login_name96056,
        codeStates['setassigned_login_name'] = setassigned_login_name96056,
        codeStates['expiry_date'] = expiry_datea44d5,
        codeStates['setexpiry_date'] = setexpiry_datea44d5,
        codeStates['approve_btn'] = approve_btn67764,
        codeStates['setapprove_btn'] = setapprove_btn67764,
        codeStates['condition_btn'] = condition_btn335e4,
        codeStates['setcondition_btn'] = setcondition_btn335e4,
        codeStates['view_attach_btn'] = view_attach_btnd4d21,
        codeStates['setview_attach_btn'] = setview_attach_btnd4d21,
        codeStates['view_evidence_btn'] = view_evidence_btna42e5,
        codeStates['setview_evidence_btn'] = setview_evidence_btna42e5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stages_table01d82Ref = useRef<any>(null);
  const handleClearSearch = () => {
    stages_table01d82Ref.current?.setSearchParams();
    stages_table01d82Ref.current?.handleSearch({});
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
        !Array.isArray(stages_table01d82) &&
        Object.keys(stages_table01d82)?.length > 0
      ) {
        setstages_table01d82({})
        setstages_table01d82Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [stages_table01d82Props?.refresh])


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
          setliststagesbyloginid_v1((pre:any)=>({...pre,_selectedGroup_:"stages_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablestages_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={stages_table01d82Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupstages_table
