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
import Textsearch_label  from "./Textsearch_label";
import Dividertop_divider  from "./Dividertop_divider";
import DatePickertrs_created_date  from "./DatePickertrs_created_date";
import TextInputuuid  from "./TextInputuuid";
import TextInputdebtor_account_no  from "./TextInputdebtor_account_no";
import TextInputdebtor_name  from "./TextInputdebtor_name";
import TextInputcreditor_account_no  from "./TextInputcreditor_account_no";
import TextInputcr_name  from "./TextInputcr_name";
import TextInputcr_currency  from "./TextInputcr_currency";
import TextInputcr_amount  from "./TextInputcr_amount";
import Dropdownmessage_code  from "./Dropdownmessage_code";
import Dividerbottom_divider  from "./Dividerbottom_divider";
import Buttonsearch  from "./Buttonsearch";
import Buttonclear  from "./Buttonclear";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmain_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_nftransaction_v1Props, setdfd_nftransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "search_label",
      "top_divider",
      "trs_created_date",
      "uuid",
      "debtor_account_no",
      "debtor_name",
      "creditor_account_no",
      "cr_name",
      "cr_currency",
      "cr_amount",
      "message_code",
      "bottom_divider",
      "search",
      "clear"
    ],
    "allowedGroups": [
      "canvas",
      "main_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "search_label",
      "top_divider",
      "trs_created_date",
      "uuid",
      "debtor_account_no",
      "debtor_name",
      "creditor_account_no",
      "cr_name",
      "cr_currency",
      "cr_amount",
      "message_code",
      "bottom_divider",
      "search",
      "clear"
    ],
    "allowedGroups": [
      "canvas",
      "main_group"
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
  const {main_group746bf, setmain_group746bf}= useContext(TotalContext) as TotalContextProps;
  const {main_group746bfProps, setmain_group746bfProps}= useContext(TotalContext) as TotalContextProps;
  const {search_label130a2, setsearch_label130a2}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerdea5b, settop_dividerdea5b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date28cb9, settrs_created_date28cb9}= useContext(TotalContext) as TotalContextProps;
  const {uuida0e9e, setuuida0e9e}= useContext(TotalContext) as TotalContextProps;
  const {debtor_account_no1b62b, setdebtor_account_no1b62b}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name908b6, setdebtor_name908b6}= useContext(TotalContext) as TotalContextProps;
  const {creditor_account_no14a5f, setcreditor_account_no14a5f}= useContext(TotalContext) as TotalContextProps;
  const {cr_name1ecf4, setcr_name1ecf4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencydbebf, setcr_currencydbebf}= useContext(TotalContext) as TotalContextProps;
  const {cr_amounta1974, setcr_amounta1974}= useContext(TotalContext) as TotalContextProps;
  const {message_codefa765, setmessage_codefa765}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divideradc51, setbottom_divideradc51}= useContext(TotalContext) as TotalContextProps;
  const {search4197d, setsearch4197d}= useContext(TotalContext) as TotalContextProps;
  const {clear91c04, setclear91c04}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {nftransactionsearch_v1, setnftransactionsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionSearch:AFVK:v1',
    [user],
    'GroupMainGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3784ce38ae1194ccec87c8de818746bf");
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
    setmain_group746bfProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("search_label")){
        setsearch_label130a2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_label130a2?.isDisabled==null)
      {
        setsearch_label130a2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("top_divider")){
        settop_dividerdea5b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(top_dividerdea5b?.isDisabled==null)
      {
        settop_dividerdea5b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_date")){
        settrs_created_date28cb9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trs_created_date28cb9?.isDisabled==null)
      {
        settrs_created_date28cb9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("uuid")){
        setuuida0e9e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(uuida0e9e?.isDisabled==null)
      {
        setuuida0e9e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debtor_account_no")){
        setdebtor_account_no1b62b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(debtor_account_no1b62b?.isDisabled==null)
      {
        setdebtor_account_no1b62b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("debtor_name")){
        setdebtor_name908b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(debtor_name908b6?.isDisabled==null)
      {
        setdebtor_name908b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("creditor_account_no")){
        setcreditor_account_no14a5f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(creditor_account_no14a5f?.isDisabled==null)
      {
        setcreditor_account_no14a5f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_name")){
        setcr_name1ecf4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_name1ecf4?.isDisabled==null)
      {
        setcr_name1ecf4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency")){
        setcr_currencydbebf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currencydbebf?.isDisabled==null)
      {
        setcr_currencydbebf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount")){
        setcr_amounta1974((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amounta1974?.isDisabled==null)
      {
        setcr_amounta1974((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_code")){
        setmessage_codefa765((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_codefa765?.isDisabled==null)
      {
        setmessage_codefa765((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bottom_divider")){
        setbottom_divideradc51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(bottom_divideradc51?.isDisabled==null)
      {
        setbottom_divideradc51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch4197d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search4197d?.isDisabled==null)
      {
        setsearch4197d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("clear")){
        setclear91c04((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(clear91c04?.isDisabled==null)
      {
        setclear91c04((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['main_group'] = main_group746bf,
        codeStates['setmain_group'] = setmain_group746bf,
        codeStates['main_group746bf'] = main_group746bfProps,
        codeStates['setmain_group746bf'] = setmain_group746bfProps,
        codeStates['search_label'] = search_label130a2,
        codeStates['setsearch_label'] = setsearch_label130a2,
        codeStates['top_divider'] = top_dividerdea5b,
        codeStates['settop_divider'] = settop_dividerdea5b,
        codeStates['trs_created_date'] = trs_created_date28cb9,
        codeStates['settrs_created_date'] = settrs_created_date28cb9,
        codeStates['uuid'] = uuida0e9e,
        codeStates['setuuid'] = setuuida0e9e,
        codeStates['debtor_account_no'] = debtor_account_no1b62b,
        codeStates['setdebtor_account_no'] = setdebtor_account_no1b62b,
        codeStates['debtor_name'] = debtor_name908b6,
        codeStates['setdebtor_name'] = setdebtor_name908b6,
        codeStates['creditor_account_no'] = creditor_account_no14a5f,
        codeStates['setcreditor_account_no'] = setcreditor_account_no14a5f,
        codeStates['cr_name'] = cr_name1ecf4,
        codeStates['setcr_name'] = setcr_name1ecf4,
        codeStates['cr_currency'] = cr_currencydbebf,
        codeStates['setcr_currency'] = setcr_currencydbebf,
        codeStates['cr_amount'] = cr_amounta1974,
        codeStates['setcr_amount'] = setcr_amounta1974,
        codeStates['message_code'] = message_codefa765,
        codeStates['setmessage_code'] = setmessage_codefa765,
        codeStates['bottom_divider'] = bottom_divideradc51,
        codeStates['setbottom_divider'] = setbottom_divideradc51,
        codeStates['search'] = search4197d,
        codeStates['setsearch'] = setsearch4197d,
        codeStates['clear'] = clear91c04,
        codeStates['setclear'] = setclear91c04,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3784ce38ae1194ccec87c8de818746bf");
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
        codeStates['main_group'] = main_group746bf,
        codeStates['setmain_group'] = setmain_group746bf,
        codeStates['main_group746bf'] = main_group746bfProps,
        codeStates['setmain_group746bf'] = setmain_group746bfProps,
        codeStates['search_label'] = search_label130a2,
        codeStates['setsearch_label'] = setsearch_label130a2,
        codeStates['top_divider'] = top_dividerdea5b,
        codeStates['settop_divider'] = settop_dividerdea5b,
        codeStates['trs_created_date'] = trs_created_date28cb9,
        codeStates['settrs_created_date'] = settrs_created_date28cb9,
        codeStates['uuid'] = uuida0e9e,
        codeStates['setuuid'] = setuuida0e9e,
        codeStates['debtor_account_no'] = debtor_account_no1b62b,
        codeStates['setdebtor_account_no'] = setdebtor_account_no1b62b,
        codeStates['debtor_name'] = debtor_name908b6,
        codeStates['setdebtor_name'] = setdebtor_name908b6,
        codeStates['creditor_account_no'] = creditor_account_no14a5f,
        codeStates['setcreditor_account_no'] = setcreditor_account_no14a5f,
        codeStates['cr_name'] = cr_name1ecf4,
        codeStates['setcr_name'] = setcr_name1ecf4,
        codeStates['cr_currency'] = cr_currencydbebf,
        codeStates['setcr_currency'] = setcr_currencydbebf,
        codeStates['cr_amount'] = cr_amounta1974,
        codeStates['setcr_amount'] = setcr_amounta1974,
        codeStates['message_code'] = message_codefa765,
        codeStates['setmessage_code'] = setmessage_codefa765,
        codeStates['bottom_divider'] = bottom_divideradc51,
        codeStates['setbottom_divider'] = setbottom_divideradc51,
        codeStates['search'] = search4197d,
        codeStates['setsearch'] = setsearch4197d,
        codeStates['clear'] = clear91c04,
        codeStates['setclear'] = setclear91c04,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const main_group746bfRef = useRef<any>(null);
  const handleClearSearch = () => {
    main_group746bfRef.current?.setSearchParams();
    main_group746bfRef.current?.handleSearch({});
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
        !Array.isArray(main_group746bf) &&
        Object.keys(main_group746bf)?.length > 0
      ) {
        setmain_group746bf({})
        setmain_group746bfProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [main_group746bfProps?.refresh])


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
        gridRow: '1 / 99',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnftransactionsearch_v1((pre:any)=>({...pre,_selectedGroup_:"main_group"}))
        }}
    >
          {allowedControls.includes("search_label") ?<Textsearch_label   /* 130a2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("top_divider") ?<Dividertop_divider   /* dea5b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("trs_created_date") ?<DatePickertrs_created_date   /* 28cb9 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("uuid") ?<TextInputuuid   /* a0e9e */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("debtor_account_no") ?<TextInputdebtor_account_no   /* 1b62b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("debtor_name") ?<TextInputdebtor_name   /* 908b6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("creditor_account_no") ?<TextInputcreditor_account_no   /* 14a5f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_name") ?<TextInputcr_name   /* 1ecf4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_currency") ?<TextInputcr_currency   /* dbebf */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_amount") ?<TextInputcr_amount   /* a1974 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("message_code") ?<Dropdownmessage_code   /* fa765 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("bottom_divider") ?<Dividerbottom_divider   /* adc51 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          allowedControls.includes("clear")  ?            <Buttonclear tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupmain_group
