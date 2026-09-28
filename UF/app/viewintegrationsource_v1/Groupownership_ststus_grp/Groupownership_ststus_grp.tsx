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
import Textownership_ststus_grp_text  from "./Textownership_ststus_grp_text";
import Dropdownowner_user_id  from "./Dropdownowner_user_id";
import Switchis_active  from "./Switchis_active";
import Switchis_enabled  from "./Switchis_enabled";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupownership_ststus_grp = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sourcecategorycombo_v1Props, setdfd_sourcecategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const securityData:any={};
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
  const {add_group37fbc, setadd_group37fbc}= useContext(TotalContext) as TotalContextProps;
  const {add_group37fbcProps, setadd_group37fbcProps}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6, setsource_details_grp9bff6}= useContext(TotalContext) as TotalContextProps;
  const {source_details_grp9bff6Props, setsource_details_grp9bff6Props}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893, setconnect_group1b893}= useContext(TotalContext) as TotalContextProps;
  const {connect_group1b893Props, setconnect_group1b893Props}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28, setscheduler_retry_grp8ca28}= useContext(TotalContext) as TotalContextProps;
  const {scheduler_retry_grp8ca28Props, setscheduler_retry_grp8ca28Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00a, setownership_ststus_grpbc00a}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grpbc00aProps, setownership_ststus_grpbc00aProps}= useContext(TotalContext) as TotalContextProps;
  const {ownership_ststus_grp_text9a786, setownership_ststus_grp_text9a786}= useContext(TotalContext) as TotalContextProps;
  const {owner_user_id7a26e, setowner_user_id7a26e}= useContext(TotalContext) as TotalContextProps;
  const {is_activee7e2f, setis_activee7e2f}= useContext(TotalContext) as TotalContextProps;
  const {is_enableda6dd4, setis_enableda6dd4}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967, setlast_run_grpc3967}= useContext(TotalContext) as TotalContextProps;
  const {last_run_grpc3967Props, setlast_run_grpc3967Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewintegrationsource_v1, setviewintegrationsource_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewIntegrationSource:AFVK:v1',
    [user],
    'GroupOwnershipStstusGrp',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1d690206545df750bdceeff2077bc00a");
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
    setownership_ststus_grpbc00aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ownership_ststus_grp_text")){
        setownership_ststus_grp_text9a786((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ownership_ststus_grp_text9a786?.isDisabled==null)
      {
        setownership_ststus_grp_text9a786((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("owner_user_id")){
        setowner_user_id7a26e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(owner_user_id7a26e?.isDisabled==null)
      {
        setowner_user_id7a26e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activee7e2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activee7e2f?.isDisabled==null)
      {
        setis_activee7e2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_enabled")){
        setis_enableda6dd4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_enableda6dd4?.isDisabled==null)
      {
        setis_enableda6dd4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['add_group'] = add_group37fbc,
        codeStates['setadd_group'] = setadd_group37fbc,
        codeStates['add_group37fbc'] = add_group37fbcProps,
        codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
        codeStates['source_details_grp'] = source_details_grp9bff6,
        codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
        codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
        codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
        codeStates['connect_group'] = connect_group1b893,
        codeStates['setconnect_group'] = setconnect_group1b893,
        codeStates['connect_group1b893'] = connect_group1b893Props,
        codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
        codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
        codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
        codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
        codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
        codeStates['ownership_ststus_grp_text'] = ownership_ststus_grp_text9a786,
        codeStates['setownership_ststus_grp_text'] = setownership_ststus_grp_text9a786,
        codeStates['owner_user_id'] = owner_user_id7a26e,
        codeStates['setowner_user_id'] = setowner_user_id7a26e,
        codeStates['is_active'] = is_activee7e2f,
        codeStates['setis_active'] = setis_activee7e2f,
        codeStates['is_enabled'] = is_enableda6dd4,
        codeStates['setis_enabled'] = setis_enableda6dd4,
        codeStates['last_run_grp'] = last_run_grpc3967,
        codeStates['setlast_run_grp'] = setlast_run_grpc3967,
        codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
        codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1d690206545df750bdceeff2077bc00a");
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
        codeStates['add_group'] = add_group37fbc,
        codeStates['setadd_group'] = setadd_group37fbc,
        codeStates['add_group37fbc'] = add_group37fbcProps,
        codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
        codeStates['source_details_grp'] = source_details_grp9bff6,
        codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
        codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
        codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
        codeStates['connect_group'] = connect_group1b893,
        codeStates['setconnect_group'] = setconnect_group1b893,
        codeStates['connect_group1b893'] = connect_group1b893Props,
        codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
        codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
        codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
        codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
        codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
        codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
        codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
        codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
        codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
        codeStates['ownership_ststus_grp_text'] = ownership_ststus_grp_text9a786,
        codeStates['setownership_ststus_grp_text'] = setownership_ststus_grp_text9a786,
        codeStates['owner_user_id'] = owner_user_id7a26e,
        codeStates['setowner_user_id'] = setowner_user_id7a26e,
        codeStates['is_active'] = is_activee7e2f,
        codeStates['setis_active'] = setis_activee7e2f,
        codeStates['is_enabled'] = is_enableda6dd4,
        codeStates['setis_enabled'] = setis_enableda6dd4,
        codeStates['last_run_grp'] = last_run_grpc3967,
        codeStates['setlast_run_grp'] = setlast_run_grpc3967,
        codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
        codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ownership_ststus_grpbc00aRef = useRef<any>(null);
  const handleClearSearch = () => {
    ownership_ststus_grpbc00aRef.current?.setSearchParams();
    ownership_ststus_grpbc00aRef.current?.handleSearch({});
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
        !Array.isArray(ownership_ststus_grpbc00a) &&
        Object.keys(ownership_ststus_grpbc00a)?.length > 0
      ) {
        setownership_ststus_grpbc00a({})
      }
    } else prevRefreshRef.current = true
  }, [ownership_ststus_grpbc00aProps?.refresh])


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
        gridColumn: '14 / 25',
        gridRow: '40 / 79',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewintegrationsource_v1((pre:any)=>({...pre,_selectedGroup_:"ownership_ststus_grp"}))
        }}
    >
          {allowedControls.includes("ownership_ststus_grp_text") ?<Textownership_ststus_grp_text   /* 9a786 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("owner_user_id") ?<Dropdownowner_user_id   /* 7a26e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* e7e2f */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_enabled")?<Switchis_enabled  /* a6dd4 */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupownership_ststus_grp
