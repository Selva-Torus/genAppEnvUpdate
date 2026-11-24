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
import TextInputdr_account  from "./TextInputdr_account";
import TextInputdr_currency  from "./TextInputdr_currency";
import TextInputdebit_exchange_rate  from "./TextInputdebit_exchange_rate";
import TextInputret_amount  from "./TextInputret_amount";
import TextInputret_currency  from "./TextInputret_currency";
import TextInputexchange_rate  from "./TextInputexchange_rate";
import TextInputcalculated_ret_amount  from "./TextInputcalculated_ret_amount";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupapplyspecialratesubgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  "Operational Manager": {
    "allowedControls": [
      "dr_account",
      "dr_currency",
      "debit_exchange_rate",
      "ret_amount",
      "ret_currency",
      "exchange_rate",
      "calculated_ret_amount"
    ],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratedynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "dr_account",
      "dr_currency",
      "debit_exchange_rate",
      "ret_amount",
      "ret_currency",
      "exchange_rate",
      "calculated_ret_amount"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "dr_account",
      "dr_currency",
      "debit_exchange_rate",
      "ret_amount",
      "ret_currency",
      "exchange_rate",
      "calculated_ret_amount"
    ],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratesubgroup",
      "applyspecialratedynamicactions"
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
  const {applyspecialratemaingroup6cd35, setapplyspecialratemaingroup6cd35}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup6cd35Props, setapplyspecialratemaingroup6cd35Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_account8ccf1, setdr_account8ccf1}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency6b8f0, setdr_currency6b8f0}= useContext(TotalContext) as TotalContextProps;
  const {debit_exchange_rate710eb, setdebit_exchange_rate710eb}= useContext(TotalContext) as TotalContextProps;
  const {ret_amountb0252, setret_amountb0252}= useContext(TotalContext) as TotalContextProps;
  const {ret_currencye06ce, setret_currencye06ce}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate71ca9, setexchange_rate71ca9}= useContext(TotalContext) as TotalContextProps;
  const {calculated_ret_amountdc5ca, setcalculated_ret_amountdc5ca}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48, setapplyspecialratedynamicactions8ee48}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48Props, setapplyspecialratedynamicactions8ee48Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {outboundmanualreturnprocess_v1, setoutboundmanualreturnprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1',
    [user],
    'GroupApplyspecialratesubgroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "caa7a90344fcb98d6f8d0fda126d7745");
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
    setapplyspecialratesubgroupd7745Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dr_account")){
        setdr_account8ccf1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account8ccf1?.isDisabled==null)
      {
        setdr_account8ccf1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_currency")){
        setdr_currency6b8f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_currency6b8f0?.isDisabled==null)
      {
        setdr_currency6b8f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debit_exchange_rate")){
        setdebit_exchange_rate710eb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(debit_exchange_rate710eb?.isDisabled==null)
      {
        setdebit_exchange_rate710eb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ret_amount")){
        setret_amountb0252((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ret_amountb0252?.isDisabled==null)
      {
        setret_amountb0252((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ret_currency")){
        setret_currencye06ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ret_currencye06ce?.isDisabled==null)
      {
        setret_currencye06ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("exchange_rate")){
        setexchange_rate71ca9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(exchange_rate71ca9?.isDisabled==null)
      {
        setexchange_rate71ca9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("calculated_ret_amount")){
        setcalculated_ret_amountdc5ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(calculated_ret_amountdc5ca?.isDisabled==null)
      {
        setcalculated_ret_amountdc5ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['dr_account'] = dr_account8ccf1,
        codeStates['setdr_account'] = setdr_account8ccf1,
        codeStates['dr_currency'] = dr_currency6b8f0,
        codeStates['setdr_currency'] = setdr_currency6b8f0,
        codeStates['debit_exchange_rate'] = debit_exchange_rate710eb,
        codeStates['setdebit_exchange_rate'] = setdebit_exchange_rate710eb,
        codeStates['ret_amount'] = ret_amountb0252,
        codeStates['setret_amount'] = setret_amountb0252,
        codeStates['ret_currency'] = ret_currencye06ce,
        codeStates['setret_currency'] = setret_currencye06ce,
        codeStates['exchange_rate'] = exchange_rate71ca9,
        codeStates['setexchange_rate'] = setexchange_rate71ca9,
        codeStates['calculated_ret_amount'] = calculated_ret_amountdc5ca,
        codeStates['setcalculated_ret_amount'] = setcalculated_ret_amountdc5ca,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "caa7a90344fcb98d6f8d0fda126d7745");
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
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['dr_account'] = dr_account8ccf1,
        codeStates['setdr_account'] = setdr_account8ccf1,
        codeStates['dr_currency'] = dr_currency6b8f0,
        codeStates['setdr_currency'] = setdr_currency6b8f0,
        codeStates['debit_exchange_rate'] = debit_exchange_rate710eb,
        codeStates['setdebit_exchange_rate'] = setdebit_exchange_rate710eb,
        codeStates['ret_amount'] = ret_amountb0252,
        codeStates['setret_amount'] = setret_amountb0252,
        codeStates['ret_currency'] = ret_currencye06ce,
        codeStates['setret_currency'] = setret_currencye06ce,
        codeStates['exchange_rate'] = exchange_rate71ca9,
        codeStates['setexchange_rate'] = setexchange_rate71ca9,
        codeStates['calculated_ret_amount'] = calculated_ret_amountdc5ca,
        codeStates['setcalculated_ret_amount'] = setcalculated_ret_amountdc5ca,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratesubgroupd7745Ref = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratesubgroupd7745Ref.current?.setSearchParams();
    applyspecialratesubgroupd7745Ref.current?.handleSearch({});
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
        !Array.isArray(applyspecialratesubgroupd7745) &&
        Object.keys(applyspecialratesubgroupd7745)?.length > 0
      ) {
        setapplyspecialratesubgroupd7745({})
        setapplyspecialratesubgroupd7745Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratesubgroupd7745Props?.refresh])


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
        gridRow: '1 / 111',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setoutboundmanualreturnprocess_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratesubgroup"}))
        }}
    >
        {allowedControls.includes("dr_account") ?<TextInputdr_account   /* 8ccf1 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_currency") ?<TextInputdr_currency   /* 6b8f0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("debit_exchange_rate") ?<TextInputdebit_exchange_rate   /* 710eb */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ret_amount") ?<TextInputret_amount   /* b0252 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ret_currency") ?<TextInputret_currency   /* e06ce */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("exchange_rate") ?<TextInputexchange_rate   /* 71ca9 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("calculated_ret_amount") ?<TextInputcalculated_ret_amount   /* dc5ca */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupapplyspecialratesubgroup
