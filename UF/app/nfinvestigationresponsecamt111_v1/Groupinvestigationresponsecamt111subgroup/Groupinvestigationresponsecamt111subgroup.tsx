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
import DatePickertran_date  from "./DatePickertran_date";
import TextInputmessage_code  from "./TextInputmessage_code";
import Dropdownresponse_type  from "./Dropdownresponse_type";
import Dropdownresponse_reason  from "./Dropdownresponse_reason";
import TextInputreason_description  from "./TextInputreason_description";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupinvestigationresponsecamt111subgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfresponsetypecombo_v1Props, setdfd_nfresponsetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfresponsereasoncombo_v1Props, setdfd_nfresponsereasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tran_date",
      "message_code",
      "response_type",
      "response_reason",
      "reason_description"
    ],
    "allowedGroups": [
      "canvas",
      "investigationresponsecamt111maingroup",
      "investigationresponsecamt111subgroup",
      "investigationresponsecamt111dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "response_type",
      "response_reason",
      "reason_description"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "tran_date",
      "message_code",
      "response_type",
      "response_reason",
      "reason_description"
    ],
    "allowedGroups": [
      "canvas",
      "investigationresponsecamt111maingroup",
      "investigationresponsecamt111subgroup",
      "investigationresponsecamt111dynamicactions"
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
  const {investigationresponsecamt111maingroup058ec, setinvestigationresponsecamt111maingroup058ec}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111maingroup058ecProps, setinvestigationresponsecamt111maingroup058ecProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5, setinvestigationresponsecamt111subgroupafab5}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5Props, setinvestigationresponsecamt111subgroupafab5Props}= useContext(TotalContext) as TotalContextProps;
  const {tran_date51032, settran_date51032}= useContext(TotalContext) as TotalContextProps;
  const {message_code3e093, setmessage_code3e093}= useContext(TotalContext) as TotalContextProps;
  const {response_type65b90, setresponse_type65b90}= useContext(TotalContext) as TotalContextProps;
  const {response_reason7039a, setresponse_reason7039a}= useContext(TotalContext) as TotalContextProps;
  const {reason_descriptiond33de, setreason_descriptiond33de}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeed, setinvestigationresponsecamt111dynamicactionsceeed}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeedProps, setinvestigationresponsecamt111dynamicactionsceeedProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {nfinvestigationresponsecamt111_v1, setnfinvestigationresponsecamt111_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfInvestigationResponseCamt111:AFVK:v1',
    [user],
    'GroupInvestigationresponsecamt111subgroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dcf99be43c68bc746c27e738db2afab5");
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
    setinvestigationresponsecamt111subgroupafab5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tran_date")){
        settran_date51032((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tran_date51032?.isDisabled==null)
      {
        settran_date51032((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_code")){
        setmessage_code3e093((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_code3e093?.isDisabled==null)
      {
        setmessage_code3e093((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("response_type")){
        setresponse_type65b90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(response_type65b90?.isDisabled==null)
      {
        setresponse_type65b90((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("response_reason")){
        setresponse_reason7039a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(response_reason7039a?.isDisabled==null)
      {
        setresponse_reason7039a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reason_description")){
        setreason_descriptiond33de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(reason_descriptiond33de?.isDisabled==null)
      {
        setreason_descriptiond33de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['investigationresponsecamt111maingroup'] = investigationresponsecamt111maingroup058ec,
        codeStates['setinvestigationresponsecamt111maingroup'] = setinvestigationresponsecamt111maingroup058ec,
        codeStates['investigationresponsecamt111maingroup058ec'] = investigationresponsecamt111maingroup058ecProps,
        codeStates['setinvestigationresponsecamt111maingroup058ec'] = setinvestigationresponsecamt111maingroup058ecProps,
        codeStates['investigationresponsecamt111subgroup'] = investigationresponsecamt111subgroupafab5,
        codeStates['setinvestigationresponsecamt111subgroup'] = setinvestigationresponsecamt111subgroupafab5,
        codeStates['investigationresponsecamt111subgroupafab5'] = investigationresponsecamt111subgroupafab5Props,
        codeStates['setinvestigationresponsecamt111subgroupafab5'] = setinvestigationresponsecamt111subgroupafab5Props,
        codeStates['tran_date'] = tran_date51032,
        codeStates['settran_date'] = settran_date51032,
        codeStates['message_code'] = message_code3e093,
        codeStates['setmessage_code'] = setmessage_code3e093,
        codeStates['response_type'] = response_type65b90,
        codeStates['setresponse_type'] = setresponse_type65b90,
        codeStates['response_reason'] = response_reason7039a,
        codeStates['setresponse_reason'] = setresponse_reason7039a,
        codeStates['reason_description'] = reason_descriptiond33de,
        codeStates['setreason_description'] = setreason_descriptiond33de,
        codeStates['investigationresponsecamt111dynamicactions'] = investigationresponsecamt111dynamicactionsceeed,
        codeStates['setinvestigationresponsecamt111dynamicactions'] = setinvestigationresponsecamt111dynamicactionsceeed,
        codeStates['investigationresponsecamt111dynamicactionsceeed'] = investigationresponsecamt111dynamicactionsceeedProps,
        codeStates['setinvestigationresponsecamt111dynamicactionsceeed'] = setinvestigationresponsecamt111dynamicactionsceeedProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dcf99be43c68bc746c27e738db2afab5");
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
        codeStates['investigationresponsecamt111maingroup'] = investigationresponsecamt111maingroup058ec,
        codeStates['setinvestigationresponsecamt111maingroup'] = setinvestigationresponsecamt111maingroup058ec,
        codeStates['investigationresponsecamt111maingroup058ec'] = investigationresponsecamt111maingroup058ecProps,
        codeStates['setinvestigationresponsecamt111maingroup058ec'] = setinvestigationresponsecamt111maingroup058ecProps,
        codeStates['investigationresponsecamt111subgroup'] = investigationresponsecamt111subgroupafab5,
        codeStates['setinvestigationresponsecamt111subgroup'] = setinvestigationresponsecamt111subgroupafab5,
        codeStates['investigationresponsecamt111subgroupafab5'] = investigationresponsecamt111subgroupafab5Props,
        codeStates['setinvestigationresponsecamt111subgroupafab5'] = setinvestigationresponsecamt111subgroupafab5Props,
        codeStates['tran_date'] = tran_date51032,
        codeStates['settran_date'] = settran_date51032,
        codeStates['message_code'] = message_code3e093,
        codeStates['setmessage_code'] = setmessage_code3e093,
        codeStates['response_type'] = response_type65b90,
        codeStates['setresponse_type'] = setresponse_type65b90,
        codeStates['response_reason'] = response_reason7039a,
        codeStates['setresponse_reason'] = setresponse_reason7039a,
        codeStates['reason_description'] = reason_descriptiond33de,
        codeStates['setreason_description'] = setreason_descriptiond33de,
        codeStates['investigationresponsecamt111dynamicactions'] = investigationresponsecamt111dynamicactionsceeed,
        codeStates['setinvestigationresponsecamt111dynamicactions'] = setinvestigationresponsecamt111dynamicactionsceeed,
        codeStates['investigationresponsecamt111dynamicactionsceeed'] = investigationresponsecamt111dynamicactionsceeedProps,
        codeStates['setinvestigationresponsecamt111dynamicactionsceeed'] = setinvestigationresponsecamt111dynamicactionsceeedProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const investigationresponsecamt111subgroupafab5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    investigationresponsecamt111subgroupafab5Ref.current?.setSearchParams();
    investigationresponsecamt111subgroupafab5Ref.current?.handleSearch({});
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
        !Array.isArray(investigationresponsecamt111subgroupafab5) &&
        Object.keys(investigationresponsecamt111subgroupafab5)?.length > 0
      ) {
        setinvestigationresponsecamt111subgroupafab5({})
        setinvestigationresponsecamt111subgroupafab5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [investigationresponsecamt111subgroupafab5Props?.refresh])


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
        gridRow: '1 / 103',
      
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
      className={`flex flex-col overflow-auto rounded-md p-3 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnfinvestigationresponsecamt111_v1((pre:any)=>({...pre,_selectedGroup_:"investigationresponsecamt111subgroup"}))
        }}
    >
        {allowedControls.includes("tran_date") ?<DatePickertran_date   /* 51032 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("message_code") ?<TextInputmessage_code   /* 3e093 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("response_type") ?<Dropdownresponse_type   /* 65b90 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("response_reason") ?<Dropdownresponse_reason   /* 7039a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("reason_description") ?<TextInputreason_description   /* d33de */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupinvestigationresponsecamt111subgroup
