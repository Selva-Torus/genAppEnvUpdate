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
import Buttonback_button  from "./Buttonback_button";
import Textglobal_bank_text  from "./Textglobal_bank_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_mongo_totalcalls_dfd_v1Props, setdfd_mongo_totalcalls_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_api_repository_dfd_v1Props, setdfd_mongo_api_repository_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongodb_api_process_logs_dfd_v1Props, setdfd_mongodb_api_process_logs_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_pie_chart_dfd_v1Props, setdfd_mongo_pie_chart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "back_button",
      "global_bank_text"
    ],
    "allowedGroups": [
      "canvas",
      "vob_api_info_group",
      "group",
      "api_info_group",
      "total_calls_group",
      "success_rate_group",
      "error_rate_group",
      "ob_group",
      "api_process_log_group",
      "api_process_log_table"
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
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;
  const {back_button9eaea, setback_button9eaea}= useContext(TotalContext) as TotalContextProps;
  const {global_bank_text5cc81, setglobal_bank_text5cc81}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewapiinfo_v1, setviewapiinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6a134659b8f1479fb4233f820a31f4ba");
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
    setgroup1f4baProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("back_button")){
        setback_button9eaea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(back_button9eaea?.isDisabled==null)
      {
        setback_button9eaea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("global_bank_text")){
        setglobal_bank_text5cc81((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(global_bank_text5cc81?.isDisabled==null)
      {
        setglobal_bank_text5cc81((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
        codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
        codeStates['group'] = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['group1f4ba'] = group1f4baProps,
        codeStates['setgroup1f4ba'] = setgroup1f4baProps,
        codeStates['back_button'] = back_button9eaea,
        codeStates['setback_button'] = setback_button9eaea,
        codeStates['global_bank_text'] = global_bank_text5cc81,
        codeStates['setglobal_bank_text'] = setglobal_bank_text5cc81,
        codeStates['api_info_group'] = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
        codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
        codeStates['total_calls_group'] = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['total_calls_group76982'] = total_calls_group76982Props,
        codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
        codeStates['success_rate_group'] = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
        codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
        codeStates['error_rate_group'] = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
        codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
        codeStates['ob_group'] = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['ob_group76678'] = ob_group76678Props,
        codeStates['setob_group76678'] = setob_group76678Props,
        codeStates['api_process_log_group'] = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
        codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6a134659b8f1479fb4233f820a31f4ba");
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
        codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
        codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
        codeStates['group'] = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['group1f4ba'] = group1f4baProps,
        codeStates['setgroup1f4ba'] = setgroup1f4baProps,
        codeStates['back_button'] = back_button9eaea,
        codeStates['setback_button'] = setback_button9eaea,
        codeStates['global_bank_text'] = global_bank_text5cc81,
        codeStates['setglobal_bank_text'] = setglobal_bank_text5cc81,
        codeStates['api_info_group'] = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
        codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
        codeStates['total_calls_group'] = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['total_calls_group76982'] = total_calls_group76982Props,
        codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
        codeStates['success_rate_group'] = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
        codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
        codeStates['error_rate_group'] = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
        codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
        codeStates['ob_group'] = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['ob_group76678'] = ob_group76678Props,
        codeStates['setob_group76678'] = setob_group76678Props,
        codeStates['api_process_log_group'] = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
        codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
        codeStates['api_process_log_table'] = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
        codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
        codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group1f4baRef = useRef<any>(null);
  const handleClearSearch = () => {
    group1f4baRef.current?.setSearchParams();
    group1f4baRef.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(group1f4ba) &&
        Object.keys(group1f4ba)?.length > 0
      ) {
        setgroup1f4ba({})
      }
    } else prevRefreshRef.current = true
  }, [group1f4baProps?.refresh])

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
        gridRow: '1 / 12',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#F5F5F5',
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
          setviewapiinfo_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {        ((ruleData?.length>0 && "back_button" in ButtonGoRuleData)?ButtonGoRuleData["back_button"]:true) && 
          allowedControls.includes("back_button")  ?            <Buttonback_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("global_bank_text") ?<Textglobal_bank_text   /* 5cc81 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
