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
import TextInputdr_amount  from "./TextInputdr_amount";
import TextInputcr_currency  from "./TextInputcr_currency";
import TextInputcr_amount  from "./TextInputcr_amount";
import TextInputexchange_rate  from "./TextInputexchange_rate";
import TextInputrevised_exchange_rate  from "./TextInputrevised_exchange_rate";
import TextInputrevised_debit_amount  from "./TextInputrevised_debit_amount";
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
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "dr_amount",
      "cr_currency",
      "cr_amount",
      "exchange_rate",
      "revised_exchange_rate",
      "revised_debit_amount",
      "revised_credit_amount"
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
      "dr_amount",
      "cr_currency",
      "cr_amount",
      "exchange_rate",
      "revised_exchange_rate",
      "revised_debit_amount",
      "revised_credit_amount"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "dr_account",
      "dr_currency",
      "dr_amount",
      "cr_currency",
      "cr_amount",
      "exchange_rate",
      "revised_exchange_rate",
      "revised_debit_amount",
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
  const {applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dr_account4eafa, setdr_account4eafa}= useContext(TotalContext) as TotalContextProps;
  const {dr_currencyf9a11, setdr_currencyf9a11}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount3c1d4, setdr_amount3c1d4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencya5017, setcr_currencya5017}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountac0e3, setcr_amountac0e3}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate42ef6, setexchange_rate42ef6}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_rate18eff, setrevised_exchange_rate18eff}= useContext(TotalContext) as TotalContextProps;
  const {revised_debit_amount6130b, setrevised_debit_amount6130b}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount67a97, setrevised_credit_amount67a97}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {outboundapplyspecialrate_v1, setoutboundapplyspecialrate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3f1201a701ab6abac505f255692d2fd");
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
    setapplyspecialratesubgroup2d2fdProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dr_account")){
        setdr_account4eafa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account4eafa?.isDisabled==null)
      {
        setdr_account4eafa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_currency")){
        setdr_currencyf9a11((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_currencyf9a11?.isDisabled==null)
      {
        setdr_currencyf9a11((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_amount")){
        setdr_amount3c1d4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_amount3c1d4?.isDisabled==null)
      {
        setdr_amount3c1d4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency")){
        setcr_currencya5017((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currencya5017?.isDisabled==null)
      {
        setcr_currencya5017((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount")){
        setcr_amountac0e3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amountac0e3?.isDisabled==null)
      {
        setcr_amountac0e3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("exchange_rate")){
        setexchange_rate42ef6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(exchange_rate42ef6?.isDisabled==null)
      {
        setexchange_rate42ef6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revised_exchange_rate")){
        setrevised_exchange_rate18eff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revised_exchange_rate18eff?.isDisabled==null)
      {
        setrevised_exchange_rate18eff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revised_debit_amount")){
        setrevised_debit_amount6130b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revised_debit_amount6130b?.isDisabled==null)
      {
        setrevised_debit_amount6130b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("revised_credit_amount")){
        setrevised_credit_amount67a97((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(revised_credit_amount67a97?.isDisabled==null)
      {
        setrevised_credit_amount67a97((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['dr_account'] = dr_account4eafa,
        codeStates['setdr_account'] = setdr_account4eafa,
        codeStates['dr_currency'] = dr_currencyf9a11,
        codeStates['setdr_currency'] = setdr_currencyf9a11,
        codeStates['dr_amount'] = dr_amount3c1d4,
        codeStates['setdr_amount'] = setdr_amount3c1d4,
        codeStates['cr_currency'] = cr_currencya5017,
        codeStates['setcr_currency'] = setcr_currencya5017,
        codeStates['cr_amount'] = cr_amountac0e3,
        codeStates['setcr_amount'] = setcr_amountac0e3,
        codeStates['exchange_rate'] = exchange_rate42ef6,
        codeStates['setexchange_rate'] = setexchange_rate42ef6,
        codeStates['revised_exchange_rate'] = revised_exchange_rate18eff,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_rate18eff,
        codeStates['revised_debit_amount'] = revised_debit_amount6130b,
        codeStates['setrevised_debit_amount'] = setrevised_debit_amount6130b,
        codeStates['revised_credit_amount'] = revised_credit_amount67a97,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount67a97,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3f1201a701ab6abac505f255692d2fd");
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
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['dr_account'] = dr_account4eafa,
        codeStates['setdr_account'] = setdr_account4eafa,
        codeStates['dr_currency'] = dr_currencyf9a11,
        codeStates['setdr_currency'] = setdr_currencyf9a11,
        codeStates['dr_amount'] = dr_amount3c1d4,
        codeStates['setdr_amount'] = setdr_amount3c1d4,
        codeStates['cr_currency'] = cr_currencya5017,
        codeStates['setcr_currency'] = setcr_currencya5017,
        codeStates['cr_amount'] = cr_amountac0e3,
        codeStates['setcr_amount'] = setcr_amountac0e3,
        codeStates['exchange_rate'] = exchange_rate42ef6,
        codeStates['setexchange_rate'] = setexchange_rate42ef6,
        codeStates['revised_exchange_rate'] = revised_exchange_rate18eff,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_rate18eff,
        codeStates['revised_debit_amount'] = revised_debit_amount6130b,
        codeStates['setrevised_debit_amount'] = setrevised_debit_amount6130b,
        codeStates['revised_credit_amount'] = revised_credit_amount67a97,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount67a97,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratesubgroup2d2fdRef = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratesubgroup2d2fdRef.current?.setSearchParams();
    applyspecialratesubgroup2d2fdRef.current?.handleSearch({});
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
        !Array.isArray(applyspecialratesubgroup2d2fd) &&
        Object.keys(applyspecialratesubgroup2d2fd)?.length > 0
      ) {
        setapplyspecialratesubgroup2d2fd({})
        setapplyspecialratesubgroup2d2fdProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratesubgroup2d2fdProps?.refresh])


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
        gridRow: '1 / 150',
      
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
          setoutboundapplyspecialrate_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratesubgroup"}))
        }}
    >
        {allowedControls.includes("dr_account") ?<TextInputdr_account   /* 4eafa */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_currency") ?<TextInputdr_currency   /* f9a11 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_amount") ?<TextInputdr_amount   /* 3c1d4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_currency") ?<TextInputcr_currency   /* a5017 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_amount") ?<TextInputcr_amount   /* ac0e3 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("exchange_rate") ?<TextInputexchange_rate   /* 42ef6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("revised_exchange_rate") ?<TextInputrevised_exchange_rate   /* 18eff */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("revised_debit_amount") ?<TextInputrevised_debit_amount   /* 6130b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("revised_credit_amount") ?<TextInputrevised_credit_amount   /* 67a97 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupapplyspecialratesubgroup
