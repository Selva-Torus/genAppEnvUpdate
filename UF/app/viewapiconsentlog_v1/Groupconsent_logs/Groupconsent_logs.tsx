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
import Tableconsent_logs  from './Tableconsent_logs';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupconsent_logs = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_tob_consent_request_ca_dfd_v1Props, setdfd_tob_consent_request_ca_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Template 1": {
    "allowedControls": [
      "request_consent_baseconsentid",
      "interactionid",
      "request_consent_permissions",
      "consentbody_data_revokedby",
      "request_consent_expiratriondatetime",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "consent_logs_group",
      "consent_logs"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
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
  const {consent_logs_group3070a, setconsent_logs_group3070a}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs_group3070aProps, setconsent_logs_group3070aProps}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs53635, setconsent_logs53635}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs53635Props, setconsent_logs53635Props}= useContext(TotalContext) as TotalContextProps;
  const {request_consent_baseconsentid4221e, setrequest_consent_baseconsentid4221e}= useContext(TotalContext) as TotalContextProps;
  const {interactionid5cd91, setinteractionid5cd91}= useContext(TotalContext) as TotalContextProps;
  const {request_consent_permissions1448d, setrequest_consent_permissions1448d}= useContext(TotalContext) as TotalContextProps;
  const {consentbody_data_revokedby6ede9, setconsentbody_data_revokedby6ede9}= useContext(TotalContext) as TotalContextProps;
  const {request_consent_expiratriondatetime3ba51, setrequest_consent_expiratriondatetime3ba51}= useContext(TotalContext) as TotalContextProps;
  const {status61386, setstatus61386}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewapiconsentlog_v1, setviewapiconsentlog_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiConsentLog:AFVK:v1',
    [user],
    'GroupConsentLogs',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c6d9d40fe273408a8398282399253635");
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
    setconsent_logs53635Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("request_consent_baseconsentid")){
        setrequest_consent_baseconsentid4221e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(request_consent_baseconsentid4221e?.isDisabled==null)
      {
        setrequest_consent_baseconsentid4221e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("interactionid")){
        setinteractionid5cd91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(interactionid5cd91?.isDisabled==null)
      {
        setinteractionid5cd91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_consent_permissions")){
        setrequest_consent_permissions1448d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(request_consent_permissions1448d?.isDisabled==null)
      {
        setrequest_consent_permissions1448d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("consentbody_data_revokedby")){
        setconsentbody_data_revokedby6ede9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(consentbody_data_revokedby6ede9?.isDisabled==null)
      {
        setconsentbody_data_revokedby6ede9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_consent_expiratriondatetime")){
        setrequest_consent_expiratriondatetime3ba51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(request_consent_expiratriondatetime3ba51?.isDisabled==null)
      {
        setrequest_consent_expiratriondatetime3ba51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus61386((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status61386?.isDisabled==null)
      {
        setstatus61386((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c6d9d40fe273408a8398282399253635");
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
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['consent_logs_group'] = consent_logs_group3070a,
        codeStates['setconsent_logs_group'] = setconsent_logs_group3070a,
        codeStates['consent_logs_group3070a'] = consent_logs_group3070aProps,
        codeStates['setconsent_logs_group3070a'] = setconsent_logs_group3070aProps,
        codeStates['consent_logs'] = consent_logs53635,
        codeStates['setconsent_logs'] = setconsent_logs53635,
        codeStates['consent_logs53635'] = consent_logs53635Props,
        codeStates['setconsent_logs53635'] = setconsent_logs53635Props,
        codeStates['request_consent_baseconsentid'] = request_consent_baseconsentid4221e,
        codeStates['setrequest_consent_baseconsentid'] = setrequest_consent_baseconsentid4221e,
        codeStates['interactionid'] = interactionid5cd91,
        codeStates['setinteractionid'] = setinteractionid5cd91,
        codeStates['request_consent_permissions'] = request_consent_permissions1448d,
        codeStates['setrequest_consent_permissions'] = setrequest_consent_permissions1448d,
        codeStates['consentbody_data_revokedby'] = consentbody_data_revokedby6ede9,
        codeStates['setconsentbody_data_revokedby'] = setconsentbody_data_revokedby6ede9,
        codeStates['request_consent_expiratriondatetime'] = request_consent_expiratriondatetime3ba51,
        codeStates['setrequest_consent_expiratriondatetime'] = setrequest_consent_expiratriondatetime3ba51,
        codeStates['status'] = status61386,
        codeStates['setstatus'] = setstatus61386,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const consent_logs53635Ref = useRef<any>(null);
  const handleClearSearch = () => {
    consent_logs53635Ref.current?.setSearchParams();
    consent_logs53635Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(consent_logs53635) &&
        Object.keys(consent_logs53635)?.length > 0
      ) {
        setconsent_logs53635({})
      }
    } else prevRefreshRef.current = true
  }, [consent_logs53635Props?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

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
        gridRow: '17 / 101',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
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
          setviewapiconsentlog_v1((pre:any)=>({...pre,_selectedGroup_:"consent_logs"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableconsent_logs headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={consent_logs53635Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupconsent_logs
