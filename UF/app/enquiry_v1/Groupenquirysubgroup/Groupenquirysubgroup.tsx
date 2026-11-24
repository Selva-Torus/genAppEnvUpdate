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
import Dropdownpayment_type  from "./Dropdownpayment_type";
import Dropdownmessage_code  from "./Dropdownmessage_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupenquirysubgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquirypaymenttypecombo_v1Props, setdfd_enquirypaymenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_enquirymessagetypecombo_v1Props, setdfd_enquirymessagetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "payment_type",
      "message_code"
    ],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "payment_type",
      "message_code"
    ],
    "allowedGroups": [
      "canvas",
      "enquirymaingroup",
      "enquirysubgroup",
      "dynamicactions"
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
  const {enquirymaingroup8a315, setenquirymaingroup8a315}= useContext(TotalContext) as TotalContextProps;
  const {enquirymaingroup8a315Props, setenquirymaingroup8a315Props}= useContext(TotalContext) as TotalContextProps;
  const {enquirysubgroup4c021, setenquirysubgroup4c021}= useContext(TotalContext) as TotalContextProps;
  const {enquirysubgroup4c021Props, setenquirysubgroup4c021Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_type7038c, setpayment_type7038c}= useContext(TotalContext) as TotalContextProps;
  const {message_code7cd22, setmessage_code7cd22}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13e5e, setdynamicactions13e5e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13e5eProps, setdynamicactions13e5eProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiry_v1, setenquiry_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:Enquiry:AFVK:v1',
    [user],
    'GroupEnquirysubgroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "176a7014b5994b33a3a24c3d7c74c021");
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
    setenquirysubgroup4c021Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("payment_type")){
        setpayment_type7038c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(payment_type7038c?.isDisabled==null)
      {
        setpayment_type7038c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("message_code")){
        setmessage_code7cd22((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(message_code7cd22?.isDisabled==null)
      {
        setmessage_code7cd22((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['enquirymaingroup'] = enquirymaingroup8a315,
        codeStates['setenquirymaingroup'] = setenquirymaingroup8a315,
        codeStates['enquirymaingroup8a315'] = enquirymaingroup8a315Props,
        codeStates['setenquirymaingroup8a315'] = setenquirymaingroup8a315Props,
        codeStates['enquirysubgroup'] = enquirysubgroup4c021,
        codeStates['setenquirysubgroup'] = setenquirysubgroup4c021,
        codeStates['enquirysubgroup4c021'] = enquirysubgroup4c021Props,
        codeStates['setenquirysubgroup4c021'] = setenquirysubgroup4c021Props,
        codeStates['payment_type'] = payment_type7038c,
        codeStates['setpayment_type'] = setpayment_type7038c,
        codeStates['message_code'] = message_code7cd22,
        codeStates['setmessage_code'] = setmessage_code7cd22,
        codeStates['dynamicactions'] = dynamicactions13e5e,
        codeStates['setdynamicactions'] = setdynamicactions13e5e,
        codeStates['dynamicactions13e5e'] = dynamicactions13e5eProps,
        codeStates['setdynamicactions13e5e'] = setdynamicactions13e5eProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "176a7014b5994b33a3a24c3d7c74c021");
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
        codeStates['enquirymaingroup'] = enquirymaingroup8a315,
        codeStates['setenquirymaingroup'] = setenquirymaingroup8a315,
        codeStates['enquirymaingroup8a315'] = enquirymaingroup8a315Props,
        codeStates['setenquirymaingroup8a315'] = setenquirymaingroup8a315Props,
        codeStates['enquirysubgroup'] = enquirysubgroup4c021,
        codeStates['setenquirysubgroup'] = setenquirysubgroup4c021,
        codeStates['enquirysubgroup4c021'] = enquirysubgroup4c021Props,
        codeStates['setenquirysubgroup4c021'] = setenquirysubgroup4c021Props,
        codeStates['payment_type'] = payment_type7038c,
        codeStates['setpayment_type'] = setpayment_type7038c,
        codeStates['message_code'] = message_code7cd22,
        codeStates['setmessage_code'] = setmessage_code7cd22,
        codeStates['dynamicactions'] = dynamicactions13e5e,
        codeStates['setdynamicactions'] = setdynamicactions13e5e,
        codeStates['dynamicactions13e5e'] = dynamicactions13e5eProps,
        codeStates['setdynamicactions13e5e'] = setdynamicactions13e5eProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const enquirysubgroup4c021Ref = useRef<any>(null);
  const handleClearSearch = () => {
    enquirysubgroup4c021Ref.current?.setSearchParams();
    enquirysubgroup4c021Ref.current?.handleSearch({});
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
        !Array.isArray(enquirysubgroup4c021) &&
        Object.keys(enquirysubgroup4c021)?.length > 0
      ) {
        setenquirysubgroup4c021({})
        setenquirysubgroup4c021Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [enquirysubgroup4c021Props?.refresh])


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
        gridRow: '1 / 51',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
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
          setenquiry_v1((pre:any)=>({...pre,_selectedGroup_:"enquirysubgroup"}))
        }}
    >
        {allowedControls.includes("payment_type") ?<Dropdownpayment_type   /* 7038c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("message_code") ?<Dropdownmessage_code   /* 7cd22 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupenquirysubgroup
