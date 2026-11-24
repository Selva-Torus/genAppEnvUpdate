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
import Textadd_info_text_label  from "./Textadd_info_text_label";
import Dropdownpayment_method  from "./Dropdownpayment_method";
import Dropdowninstruction_priority  from "./Dropdowninstruction_priority";
import Dropdowncategory_purpose  from "./Dropdowncategory_purpose";
import TextInputremittance_info  from "./TextInputremittance_info";
import TextInputintermediary_institution  from "./TextInputintermediary_institution";
import TextInputsender_receiver_info  from "./TextInputsender_receiver_info";
import Dropdowncorrespondent_bank  from "./Dropdowncorrespondent_bank";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupadd_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_purposecombo_v1Props, setdfd_purposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_crbankcodecombo_v1Props, setdfd_crbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_drbankcodecombo_v1Props, setdfd_drbankcodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_chargetypecombo_v1Props, setdfd_chargetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_paymentmethodcombo_v1Props, setdfd_paymentmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_initiationinstructionprioritycombo_v1Props, setdfd_initiationinstructionprioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_categorypurposecombo_v1Props, setdfd_categorypurposecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_correspondentbankcombo_v1Props, setdfd_correspondentbankcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_manualinitiationuimappingquery_v1Props, setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_servicelevelcombo_v1Props, setdfd_servicelevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "add_info_text_label",
      "payment_method",
      "instruction_priority",
      "category_purpose",
      "remittance_info",
      "intermediary_institution",
      "sender_receiver_info",
      "correspondent_bank"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "add_info_text_label",
      "payment_method",
      "instruction_priority",
      "category_purpose",
      "remittance_info",
      "intermediary_institution",
      "sender_receiver_info",
      "correspondent_bank"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "add_info_text_label",
      "payment_method",
      "instruction_priority",
      "category_purpose",
      "remittance_info",
      "intermediary_institution",
      "sender_receiver_info",
      "correspondent_bank"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions",
      "general_info_group",
      "dbtr_info_group",
      "cr_info_group",
      "chrg_info_group",
      "add_info_group"
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
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_text_label19bc1, setadd_info_text_label19bc1}= useContext(TotalContext) as TotalContextProps;
  const {payment_method031c1, setpayment_method031c1}= useContext(TotalContext) as TotalContextProps;
  const {instruction_priorityafb4d, setinstruction_priorityafb4d}= useContext(TotalContext) as TotalContextProps;
  const {category_purposead521, setcategory_purposead521}= useContext(TotalContext) as TotalContextProps;
  const {remittance_info6fbdf, setremittance_info6fbdf}= useContext(TotalContext) as TotalContextProps;
  const {intermediary_institution45fe6, setintermediary_institution45fe6}= useContext(TotalContext) as TotalContextProps;
  const {sender_receiver_info30c67, setsender_receiver_info30c67}= useContext(TotalContext) as TotalContextProps;
  const {correspondent_bank2a7ae, setcorrespondent_bank2a7ae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {paymentinfo_v1, setpaymentinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1',
    [user],
    'GroupAddInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7acc0e94b47140b8b61b1d88b85e8dc6");
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
    setadd_info_groupe8dc6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("add_info_text_label")){
        setadd_info_text_label19bc1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_info_text_label19bc1?.isDisabled==null)
      {
        setadd_info_text_label19bc1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("payment_method")){
        setpayment_method031c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(payment_method031c1?.isDisabled==null)
      {
        setpayment_method031c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("instruction_priority")){
        setinstruction_priorityafb4d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(instruction_priorityafb4d?.isDisabled==null)
      {
        setinstruction_priorityafb4d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_purpose")){
        setcategory_purposead521((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(category_purposead521?.isDisabled==null)
      {
        setcategory_purposead521((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("remittance_info")){
        setremittance_info6fbdf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(remittance_info6fbdf?.isDisabled==null)
      {
        setremittance_info6fbdf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("intermediary_institution")){
        setintermediary_institution45fe6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(intermediary_institution45fe6?.isDisabled==null)
      {
        setintermediary_institution45fe6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sender_receiver_info")){
        setsender_receiver_info30c67((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sender_receiver_info30c67?.isDisabled==null)
      {
        setsender_receiver_info30c67((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("correspondent_bank")){
        setcorrespondent_bank2a7ae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(correspondent_bank2a7ae?.isDisabled==null)
      {
        setcorrespondent_bank2a7ae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['add_info_text_label'] = add_info_text_label19bc1,
        codeStates['setadd_info_text_label'] = setadd_info_text_label19bc1,
        codeStates['payment_method'] = payment_method031c1,
        codeStates['setpayment_method'] = setpayment_method031c1,
        codeStates['instruction_priority'] = instruction_priorityafb4d,
        codeStates['setinstruction_priority'] = setinstruction_priorityafb4d,
        codeStates['category_purpose'] = category_purposead521,
        codeStates['setcategory_purpose'] = setcategory_purposead521,
        codeStates['remittance_info'] = remittance_info6fbdf,
        codeStates['setremittance_info'] = setremittance_info6fbdf,
        codeStates['intermediary_institution'] = intermediary_institution45fe6,
        codeStates['setintermediary_institution'] = setintermediary_institution45fe6,
        codeStates['sender_receiver_info'] = sender_receiver_info30c67,
        codeStates['setsender_receiver_info'] = setsender_receiver_info30c67,
        codeStates['correspondent_bank'] = correspondent_bank2a7ae,
        codeStates['setcorrespondent_bank'] = setcorrespondent_bank2a7ae,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7acc0e94b47140b8b61b1d88b85e8dc6");
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
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['add_info_text_label'] = add_info_text_label19bc1,
        codeStates['setadd_info_text_label'] = setadd_info_text_label19bc1,
        codeStates['payment_method'] = payment_method031c1,
        codeStates['setpayment_method'] = setpayment_method031c1,
        codeStates['instruction_priority'] = instruction_priorityafb4d,
        codeStates['setinstruction_priority'] = setinstruction_priorityafb4d,
        codeStates['category_purpose'] = category_purposead521,
        codeStates['setcategory_purpose'] = setcategory_purposead521,
        codeStates['remittance_info'] = remittance_info6fbdf,
        codeStates['setremittance_info'] = setremittance_info6fbdf,
        codeStates['intermediary_institution'] = intermediary_institution45fe6,
        codeStates['setintermediary_institution'] = setintermediary_institution45fe6,
        codeStates['sender_receiver_info'] = sender_receiver_info30c67,
        codeStates['setsender_receiver_info'] = setsender_receiver_info30c67,
        codeStates['correspondent_bank'] = correspondent_bank2a7ae,
        codeStates['setcorrespondent_bank'] = setcorrespondent_bank2a7ae,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const add_info_groupe8dc6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    add_info_groupe8dc6Ref.current?.setSearchParams();
    add_info_groupe8dc6Ref.current?.handleSearch({});
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
        !Array.isArray(add_info_groupe8dc6) &&
        Object.keys(add_info_groupe8dc6)?.length > 0
      ) {
        setadd_info_groupe8dc6({})
        setadd_info_groupe8dc6Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [add_info_groupe8dc6Props?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '137 / 195',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#F4F5FA',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-4 !pl-4 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setpaymentinfo_v1((pre:any)=>({...pre,_selectedGroup_:"add_info_group"}))
        }}
    >
          {allowedControls.includes("add_info_text_label") ?<Textadd_info_text_label   /* 19bc1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("payment_method") ?<Dropdownpayment_method   /* 031c1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("instruction_priority") ?<Dropdowninstruction_priority   /* afb4d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("category_purpose") ?<Dropdowncategory_purpose   /* ad521 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("remittance_info") ?<TextInputremittance_info   /* 6fbdf */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("intermediary_institution") ?<TextInputintermediary_institution   /* 45fe6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sender_receiver_info") ?<TextInputsender_receiver_info   /* 30c67 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("correspondent_bank") ?<Dropdowncorrespondent_bank   /* 2a7ae */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupadd_info_group
