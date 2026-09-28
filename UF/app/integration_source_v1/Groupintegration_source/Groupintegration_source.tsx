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
import Tableintegration_source  from './Tableintegration_source';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupintegration_source = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "integration_source_id",
      "source_code",
      "source_name",
      "source_category_code",
      "connector_type_code",
      "auth_method_code",
      "last_run_at",
      "view_btn",
      "edit_btn",
      "delete_btn",
      "last_run_status"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "integration_group",
      "integration_source"
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
  const {overall_ai_asset_registry0f921, setoverall_ai_asset_registry0f921}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry0f921Props, setoverall_ai_asset_registry0f921Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7, setintegration_groupdc7c7}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7Props, setintegration_groupdc7c7Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5, setintegration_source1fae5}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5Props, setintegration_source1fae5Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_id1c758, setintegration_source_id1c758}= useContext(TotalContext) as TotalContextProps;
  const {source_codedb33c, setsource_codedb33c}= useContext(TotalContext) as TotalContextProps;
  const {source_name66c25, setsource_name66c25}= useContext(TotalContext) as TotalContextProps;
  const {source_category_code45f6b, setsource_category_code45f6b}= useContext(TotalContext) as TotalContextProps;
  const {connector_type_code2f1c8, setconnector_type_code2f1c8}= useContext(TotalContext) as TotalContextProps;
  const {auth_method_codeea17b, setauth_method_codeea17b}= useContext(TotalContext) as TotalContextProps;
  const {last_run_at01576, setlast_run_at01576}= useContext(TotalContext) as TotalContextProps;
  const {view_btn345d8, setview_btn345d8}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd114a, setedit_btnd114a}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnc6dc1, setdelete_btnc6dc1}= useContext(TotalContext) as TotalContextProps;
  const {last_run_statusb04da, setlast_run_statusb04da}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {integrationsource_v1, setintegrationsource_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1',
    [user],
    'GroupIntegrationSource',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a696d81507e88f293fe369b29901fae5");
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
    setintegration_source1fae5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("integration_source_id")){
        setintegration_source_id1c758((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source_id1c758?.isDisabled==null)
      {
        setintegration_source_id1c758((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_code")){
        setsource_codedb33c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_codedb33c?.isDisabled==null)
      {
        setsource_codedb33c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_name")){
        setsource_name66c25((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_name66c25?.isDisabled==null)
      {
        setsource_name66c25((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_category_code")){
        setsource_category_code45f6b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_category_code45f6b?.isDisabled==null)
      {
        setsource_category_code45f6b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("connector_type_code")){
        setconnector_type_code2f1c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(connector_type_code2f1c8?.isDisabled==null)
      {
        setconnector_type_code2f1c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("auth_method_code")){
        setauth_method_codeea17b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(auth_method_codeea17b?.isDisabled==null)
      {
        setauth_method_codeea17b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_run_at")){
        setlast_run_at01576((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(last_run_at01576?.isDisabled==null)
      {
        setlast_run_at01576((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn345d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btn345d8?.isDisabled==null)
      {
        setview_btn345d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnd114a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btnd114a?.isDisabled==null)
      {
        setedit_btnd114a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnc6dc1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btnc6dc1?.isDisabled==null)
      {
        setdelete_btnc6dc1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_run_status")){
        setlast_run_statusb04da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(last_run_statusb04da?.isDisabled==null)
      {
        setlast_run_statusb04da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a696d81507e88f293fe369b29901fae5");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry0f921,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry0f921,
        codeStates['overall_ai_asset_registry0f921'] = overall_ai_asset_registry0f921Props,
        codeStates['setoverall_ai_asset_registry0f921'] = setoverall_ai_asset_registry0f921Props,
        codeStates['integration_group'] = integration_groupdc7c7,
        codeStates['setintegration_group'] = setintegration_groupdc7c7,
        codeStates['integration_groupdc7c7'] = integration_groupdc7c7Props,
        codeStates['setintegration_groupdc7c7'] = setintegration_groupdc7c7Props,
        codeStates['integration_source'] = integration_source1fae5,
        codeStates['setintegration_source'] = setintegration_source1fae5,
        codeStates['integration_source1fae5'] = integration_source1fae5Props,
        codeStates['setintegration_source1fae5'] = setintegration_source1fae5Props,
        codeStates['integration_source_id'] = integration_source_id1c758,
        codeStates['setintegration_source_id'] = setintegration_source_id1c758,
        codeStates['source_code'] = source_codedb33c,
        codeStates['setsource_code'] = setsource_codedb33c,
        codeStates['source_name'] = source_name66c25,
        codeStates['setsource_name'] = setsource_name66c25,
        codeStates['source_category_code'] = source_category_code45f6b,
        codeStates['setsource_category_code'] = setsource_category_code45f6b,
        codeStates['connector_type_code'] = connector_type_code2f1c8,
        codeStates['setconnector_type_code'] = setconnector_type_code2f1c8,
        codeStates['auth_method_code'] = auth_method_codeea17b,
        codeStates['setauth_method_code'] = setauth_method_codeea17b,
        codeStates['last_run_at'] = last_run_at01576,
        codeStates['setlast_run_at'] = setlast_run_at01576,
        codeStates['view_btn'] = view_btn345d8,
        codeStates['setview_btn'] = setview_btn345d8,
        codeStates['edit_btn'] = edit_btnd114a,
        codeStates['setedit_btn'] = setedit_btnd114a,
        codeStates['delete_btn'] = delete_btnc6dc1,
        codeStates['setdelete_btn'] = setdelete_btnc6dc1,
        codeStates['last_run_status'] = last_run_statusb04da,
        codeStates['setlast_run_status'] = setlast_run_statusb04da,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const integration_source1fae5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    integration_source1fae5Ref.current?.setSearchParams();
    integration_source1fae5Ref.current?.handleSearch({});
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
        !Array.isArray(integration_source1fae5) &&
        Object.keys(integration_source1fae5)?.length > 0
      ) {
        setintegration_source1fae5({})
      }
    } else prevRefreshRef.current = true
  }, [integration_source1fae5Props?.refresh])


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
          setintegrationsource_v1((pre:any)=>({...pre,_selectedGroup_:"integration_source"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableintegration_source headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={integration_source1fae5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupintegration_source
