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
      "expiry_date"
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
      "expiry_date"
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
      "expiry_date"
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
      "expiry_date"
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
      "expiry_date"
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
      "expiry_date"
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
      "expiry_date"
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
  const {overall_groupc4a49, setoverall_groupc4a49}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupc4a49Props, setoverall_groupc4a49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27, setai_asset_version_table_group1bd27}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27Props, setai_asset_version_table_group1bd27Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012, setgroupe4012}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012Props, setgroupe4012Props}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99eb, setstages_tableb99eb}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99ebProps, setstages_tableb99ebProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_id712bd, setcert_stage_id712bd}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequenceb0ce1, setstage_sequenceb0ce1}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_coded75aa, setstage_type_coded75aa}= useContext(TotalContext) as TotalContextProps;
  const {stage_name001bf, setstage_name001bf}= useContext(TotalContext) as TotalContextProps;
  const {stage_status_codeaf4f6, setstage_status_codeaf4f6}= useContext(TotalContext) as TotalContextProps;
  const {initiated_by_user_idc2f1a, setinitiated_by_user_idc2f1a}= useContext(TotalContext) as TotalContextProps;
  const {initiated_onb44a5, setinitiated_onb44a5}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_named85c7, setassigned_login_named85c7}= useContext(TotalContext) as TotalContextProps;
  const {expiry_date7df69, setexpiry_date7df69}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {showallstagesmyapproval_v1, setshowallstagesmyapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:showallStagesMyApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b423d9041e5855d35c1dd80b3b0b99eb");
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
    setstages_tableb99ebProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_id712bd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_id712bd?.isDisabled==null)
      {
        setcert_stage_id712bd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequenceb0ce1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequenceb0ce1?.isDisabled==null)
      {
        setstage_sequenceb0ce1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_coded75aa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_coded75aa?.isDisabled==null)
      {
        setstage_type_coded75aa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_name001bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_name001bf?.isDisabled==null)
      {
        setstage_name001bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_status_code")){
        setstage_status_codeaf4f6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_status_codeaf4f6?.isDisabled==null)
      {
        setstage_status_codeaf4f6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_by_user_id")){
        setinitiated_by_user_idc2f1a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_by_user_idc2f1a?.isDisabled==null)
      {
        setinitiated_by_user_idc2f1a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiated_on")){
        setinitiated_onb44a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(initiated_onb44a5?.isDisabled==null)
      {
        setinitiated_onb44a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_login_name")){
        setassigned_login_named85c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assigned_login_named85c7?.isDisabled==null)
      {
        setassigned_login_named85c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expiry_date")){
        setexpiry_date7df69((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expiry_date7df69?.isDisabled==null)
      {
        setexpiry_date7df69((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b423d9041e5855d35c1dd80b3b0b99eb");
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
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,
        codeStates['cert_stage_id'] = cert_stage_id712bd,
        codeStates['setcert_stage_id'] = setcert_stage_id712bd,
        codeStates['stage_sequence'] = stage_sequenceb0ce1,
        codeStates['setstage_sequence'] = setstage_sequenceb0ce1,
        codeStates['stage_type_code'] = stage_type_coded75aa,
        codeStates['setstage_type_code'] = setstage_type_coded75aa,
        codeStates['stage_name'] = stage_name001bf,
        codeStates['setstage_name'] = setstage_name001bf,
        codeStates['stage_status_code'] = stage_status_codeaf4f6,
        codeStates['setstage_status_code'] = setstage_status_codeaf4f6,
        codeStates['initiated_by_user_id'] = initiated_by_user_idc2f1a,
        codeStates['setinitiated_by_user_id'] = setinitiated_by_user_idc2f1a,
        codeStates['initiated_on'] = initiated_onb44a5,
        codeStates['setinitiated_on'] = setinitiated_onb44a5,
        codeStates['assigned_login_name'] = assigned_login_named85c7,
        codeStates['setassigned_login_name'] = setassigned_login_named85c7,
        codeStates['expiry_date'] = expiry_date7df69,
        codeStates['setexpiry_date'] = setexpiry_date7df69,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stages_tableb99ebRef = useRef<any>(null);
  const handleClearSearch = () => {
    stages_tableb99ebRef.current?.setSearchParams();
    stages_tableb99ebRef.current?.handleSearch({});
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
        !Array.isArray(stages_tableb99eb) &&
        Object.keys(stages_tableb99eb)?.length > 0
      ) {
        setstages_tableb99eb({})
        setstages_tableb99ebProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [stages_tableb99ebProps?.refresh])


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
          setshowallstagesmyapproval_v1((pre:any)=>({...pre,_selectedGroup_:"stages_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablestages_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={stages_tableb99ebRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupstages_table
