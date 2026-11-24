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
import TextInputcr_account  from "./TextInputcr_account";
import TextInputcr_currency  from "./TextInputcr_currency";
import TextInputcr_amount  from "./TextInputcr_amount";
import TextInputaccount_currency  from "./TextInputaccount_currency";
import TextInputcurrent_exchange_rate  from "./TextInputcurrent_exchange_rate";
import TextInputcredit_amount  from "./TextInputcredit_amount";
import TextInputrevised_exchange_rate  from "./TextInputrevised_exchange_rate";
import TextInputrevised_credit_amount  from "./TextInputrevised_credit_amount";
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
      "cr_account",
      "cr_currency",
      "cr_amount",
      "account_currency",
      "current_exchange_rate",
      "credit_amount",
      "revised_exchange_rate",
      "revised_credit_amount"
    ],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratedynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "cr_account",
      "cr_currency",
      "cr_amount",
      "account_currency",
      "current_exchange_rate",
      "credit_amount",
      "revised_exchange_rate"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "cr_account",
      "cr_currency",
      "cr_amount",
      "account_currency",
      "current_exchange_rate",
      "credit_amount",
      "revised_exchange_rate",
      "revised_credit_amount"
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
  const {applyspecialratemaingroup5736c, setapplyspecialratemaingroup5736c}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup5736cProps, setapplyspecialratemaingroup5736cProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462, setapplyspecialratesubgroup36462}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462Props, setapplyspecialratesubgroup36462Props}= useContext(TotalContext) as TotalContextProps;
  const {cr_accountede53, setcr_accountede53}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency233af, setcr_currency233af}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount807dd, setcr_amount807dd}= useContext(TotalContext) as TotalContextProps;
  const {account_currency8e273, setaccount_currency8e273}= useContext(TotalContext) as TotalContextProps;
  const {current_exchange_rateb1fbe, setcurrent_exchange_rateb1fbe}= useContext(TotalContext) as TotalContextProps;
  const {credit_amountda91c, setcredit_amountda91c}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_ratedb974, setrevised_exchange_ratedb974}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount747be, setrevised_credit_amount747be}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714, setapplyspecialratedynamicactionsd8714}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714Props, setapplyspecialratedynamicactionsd8714Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {inboundapplyspecialrateprocess_v1, setinboundapplyspecialrateprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a38b8b08a926d1ee5006cd7800936462");
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
    setapplyspecialratesubgroup36462Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cr_account")){
        setcr_accountede53((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_accountede53?.isDisabled==null)
      {
        setcr_accountede53((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency")){
        setcr_currency233af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currency233af?.isDisabled==null)
      {
        setcr_currency233af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount")){
        setcr_amount807dd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amount807dd?.isDisabled==null)
      {
        setcr_amount807dd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("account_currency")){
        setaccount_currency8e273((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(account_currency8e273?.isDisabled==null)
      {
        setaccount_currency8e273((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("current_exchange_rate")){
        setcurrent_exchange_rateb1fbe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(current_exchange_rateb1fbe?.isDisabled==null)
      {
        setcurrent_exchange_rateb1fbe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credit_amount")){
        setcredit_amountda91c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credit_amountda91c?.isDisabled==null)
      {
        setcredit_amountda91c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revised_exchange_rate")){
        setrevised_exchange_ratedb974((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revised_exchange_ratedb974?.isDisabled==null)
      {
        setrevised_exchange_ratedb974((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revised_credit_amount")){
        setrevised_credit_amount747be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revised_credit_amount747be?.isDisabled==null)
      {
        setrevised_credit_amount747be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup5736c,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup5736c,
        codeStates['applyspecialratemaingroup5736c'] = applyspecialratemaingroup5736cProps,
        codeStates['setapplyspecialratemaingroup5736c'] = setapplyspecialratemaingroup5736cProps,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup36462,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup36462,
        codeStates['applyspecialratesubgroup36462'] = applyspecialratesubgroup36462Props,
        codeStates['setapplyspecialratesubgroup36462'] = setapplyspecialratesubgroup36462Props,
        codeStates['cr_account'] = cr_accountede53,
        codeStates['setcr_account'] = setcr_accountede53,
        codeStates['cr_currency'] = cr_currency233af,
        codeStates['setcr_currency'] = setcr_currency233af,
        codeStates['cr_amount'] = cr_amount807dd,
        codeStates['setcr_amount'] = setcr_amount807dd,
        codeStates['account_currency'] = account_currency8e273,
        codeStates['setaccount_currency'] = setaccount_currency8e273,
        codeStates['current_exchange_rate'] = current_exchange_rateb1fbe,
        codeStates['setcurrent_exchange_rate'] = setcurrent_exchange_rateb1fbe,
        codeStates['credit_amount'] = credit_amountda91c,
        codeStates['setcredit_amount'] = setcredit_amountda91c,
        codeStates['revised_exchange_rate'] = revised_exchange_ratedb974,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_ratedb974,
        codeStates['revised_credit_amount'] = revised_credit_amount747be,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount747be,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsd8714,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsd8714,
        codeStates['applyspecialratedynamicactionsd8714'] = applyspecialratedynamicactionsd8714Props,
        codeStates['setapplyspecialratedynamicactionsd8714'] = setapplyspecialratedynamicactionsd8714Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a38b8b08a926d1ee5006cd7800936462");
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
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup5736c,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup5736c,
        codeStates['applyspecialratemaingroup5736c'] = applyspecialratemaingroup5736cProps,
        codeStates['setapplyspecialratemaingroup5736c'] = setapplyspecialratemaingroup5736cProps,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup36462,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup36462,
        codeStates['applyspecialratesubgroup36462'] = applyspecialratesubgroup36462Props,
        codeStates['setapplyspecialratesubgroup36462'] = setapplyspecialratesubgroup36462Props,
        codeStates['cr_account'] = cr_accountede53,
        codeStates['setcr_account'] = setcr_accountede53,
        codeStates['cr_currency'] = cr_currency233af,
        codeStates['setcr_currency'] = setcr_currency233af,
        codeStates['cr_amount'] = cr_amount807dd,
        codeStates['setcr_amount'] = setcr_amount807dd,
        codeStates['account_currency'] = account_currency8e273,
        codeStates['setaccount_currency'] = setaccount_currency8e273,
        codeStates['current_exchange_rate'] = current_exchange_rateb1fbe,
        codeStates['setcurrent_exchange_rate'] = setcurrent_exchange_rateb1fbe,
        codeStates['credit_amount'] = credit_amountda91c,
        codeStates['setcredit_amount'] = setcredit_amountda91c,
        codeStates['revised_exchange_rate'] = revised_exchange_ratedb974,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_ratedb974,
        codeStates['revised_credit_amount'] = revised_credit_amount747be,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount747be,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsd8714,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsd8714,
        codeStates['applyspecialratedynamicactionsd8714'] = applyspecialratedynamicactionsd8714Props,
        codeStates['setapplyspecialratedynamicactionsd8714'] = setapplyspecialratedynamicactionsd8714Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratesubgroup36462Ref = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratesubgroup36462Ref.current?.setSearchParams();
    applyspecialratesubgroup36462Ref.current?.handleSearch({});
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
        !Array.isArray(applyspecialratesubgroup36462) &&
        Object.keys(applyspecialratesubgroup36462)?.length > 0
      ) {
        setapplyspecialratesubgroup36462({})
        setapplyspecialratesubgroup36462Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratesubgroup36462Props?.refresh])


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
        gridRow: '1 / 126',
      
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
          setinboundapplyspecialrateprocess_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratesubgroup"}))
        }}
    >
        {allowedControls.includes("cr_account") ?<TextInputcr_account   /* ede53 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_currency") ?<TextInputcr_currency   /* 233af */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_amount") ?<TextInputcr_amount   /* 807dd */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("account_currency") ?<TextInputaccount_currency   /* 8e273 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("current_exchange_rate") ?<TextInputcurrent_exchange_rate   /* b1fbe */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("credit_amount") ?<TextInputcredit_amount   /* da91c */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("revised_exchange_rate") ?<TextInputrevised_exchange_rate   /* db974 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("revised_credit_amount") ?<TextInputrevised_credit_amount   /* 747be */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupapplyspecialratesubgroup
