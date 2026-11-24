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
import Dropdownreturn_reason  from "./Dropdownreturn_reason";
import Dropdownreturn_reason_code  from "./Dropdownreturn_reason_code";
import TextInputreturn_currency  from "./TextInputreturn_currency";
import TextInputreturn_amount  from "./TextInputreturn_amount";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupreturnreasonsubgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnreason_v1Props, setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "return_reason",
      "return_reason_code",
      "return_currency",
      "return_amount"
    ],
    "allowedGroups": [
      "canvas",
      "returnreasonmaingroup",
      "returnreasonsubgroup",
      "returndynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "return_reason"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "return_reason",
      "return_reason_code",
      "return_currency",
      "return_amount"
    ],
    "allowedGroups": [
      "canvas",
      "returnreasonmaingroup",
      "returnreasonsubgroup",
      "returndynamicactions"
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
  const {returnreasonmaingroup382bc, setreturnreasonmaingroup382bc}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup382bcProps, setreturnreasonmaingroup382bcProps}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props}= useContext(TotalContext) as TotalContextProps;
  const {return_reasonac630, setreturn_reasonac630}= useContext(TotalContext) as TotalContextProps;
  const {return_reason_code6797b, setreturn_reason_code6797b}= useContext(TotalContext) as TotalContextProps;
  const {return_currency378ac, setreturn_currency378ac}= useContext(TotalContext) as TotalContextProps;
  const {return_amount9646b, setreturn_amount9646b}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672, setreturndynamicactionsc7672}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672Props, setreturndynamicactionsc7672Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {techinboundreturnprocess_v1, settechinboundreturnprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:techInboundReturnProcess:AFVK:v1',
    [user],
    'GroupReturnreasonsubgroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "114d37ab371e8f0381693391cc1f68e5");
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
    setreturnreasonsubgroupf68e5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("return_reason")){
        setreturn_reasonac630((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(return_reasonac630?.isDisabled==null)
      {
        setreturn_reasonac630((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("return_reason_code")){
        setreturn_reason_code6797b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(return_reason_code6797b?.isDisabled==null)
      {
        setreturn_reason_code6797b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("return_currency")){
        setreturn_currency378ac((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(return_currency378ac?.isDisabled==null)
      {
        setreturn_currency378ac((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("return_amount")){
        setreturn_amount9646b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(return_amount9646b?.isDisabled==null)
      {
        setreturn_amount9646b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['return_reason'] = return_reasonac630,
        codeStates['setreturn_reason'] = setreturn_reasonac630,
        codeStates['return_reason_code'] = return_reason_code6797b,
        codeStates['setreturn_reason_code'] = setreturn_reason_code6797b,
        codeStates['return_currency'] = return_currency378ac,
        codeStates['setreturn_currency'] = setreturn_currency378ac,
        codeStates['return_amount'] = return_amount9646b,
        codeStates['setreturn_amount'] = setreturn_amount9646b,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "114d37ab371e8f0381693391cc1f68e5");
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

  function handleConfirmOnLoad(){
  }

    const handleOnload=()=>{
      // copyFormData for group
      setreturndynamicactionsc7672((prev:any) => ({ ...prev, ...returnreasonsubgroupf68e5 }));
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
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['return_reason'] = return_reasonac630,
        codeStates['setreturn_reason'] = setreturn_reasonac630,
        codeStates['return_reason_code'] = return_reason_code6797b,
        codeStates['setreturn_reason_code'] = setreturn_reason_code6797b,
        codeStates['return_currency'] = return_currency378ac,
        codeStates['setreturn_currency'] = setreturn_currency378ac,
        codeStates['return_amount'] = return_amount9646b,
        codeStates['setreturn_amount'] = setreturn_amount9646b,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const returnreasonsubgroupf68e5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    returnreasonsubgroupf68e5Ref.current?.setSearchParams();
    returnreasonsubgroupf68e5Ref.current?.handleSearch({});
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
        !Array.isArray(returnreasonsubgroupf68e5) &&
        Object.keys(returnreasonsubgroupf68e5)?.length > 0
      ) {
        setreturnreasonsubgroupf68e5({})
        setreturnreasonsubgroupf68e5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [returnreasonsubgroupf68e5Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])

  useEffect(() => {      
    handleOnload()
    handleOnChange()
  }, [returnreasonsubgroupf68e5])

  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 84',
      
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
      className={`flex flex-col overflow-auto rounded-md p-5 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          settechinboundreturnprocess_v1((pre:any)=>({...pre,_selectedGroup_:"returnreasonsubgroup"}))
        }}
    >
        {allowedControls.includes("return_reason") ?<Dropdownreturn_reason   /* ac630 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("return_reason_code") ?<Dropdownreturn_reason_code   /* 6797b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("return_currency") ?<TextInputreturn_currency   /* 378ac */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("return_amount") ?<TextInputreturn_amount   /* 9646b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupreturnreasonsubgroup
