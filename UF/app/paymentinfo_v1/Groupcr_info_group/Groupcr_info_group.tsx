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
import Textcreditor_info_label_text  from "./Textcreditor_info_label_text";
import Checkboxben_checkbox  from "./Checkboxben_checkbox";
import TextInputcr_account  from "./TextInputcr_account";
import TextInputcr_name  from "./TextInputcr_name";
import TextInputcr_street_name  from "./TextInputcr_street_name";
import Buttoncr_benif_action  from "./Buttoncr_benif_action";
import TextInputcr_building_name  from "./TextInputcr_building_name";
import TextInputcr_floor  from "./TextInputcr_floor";
import TextInputcr_post_code  from "./TextInputcr_post_code";
import TextInputcr_town_name  from "./TextInputcr_town_name";
import Dropdowncr_country  from "./Dropdowncr_country";
import Dropdowncr_currency  from "./Dropdowncr_currency";
import TextInputexchange_rate  from "./TextInputexchange_rate";
import TextInputcr_amount  from "./TextInputcr_amount";
import Dropdowncr_bank_code  from "./Dropdowncr_bank_code";
import TextInputcr_clr_code  from "./TextInputcr_clr_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcr_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "creditor_info_label_text",
      "ben_checkbox",
      "cr_account",
      "cr_name",
      "cr_street_name",
      "cr_benif_action",
      "cr_building_name",
      "cr_floor",
      "cr_post_code",
      "cr_town_name",
      "cr_country",
      "cr_currency",
      "exchange_rate",
      "cr_amount",
      "cr_bank_code",
      "cr_clr_code"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "creditor_info_label_text",
      "ben_checkbox",
      "cr_account",
      "cr_name",
      "cr_street_name",
      "cr_benif_action",
      "cr_building_name",
      "cr_floor",
      "cr_post_code",
      "cr_town_name",
      "cr_country",
      "cr_currency",
      "exchange_rate",
      "cr_amount",
      "cr_bank_code",
      "cr_clr_code"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "creditor_info_label_text",
      "ben_checkbox",
      "cr_account",
      "cr_name",
      "cr_street_name",
      "cr_benif_action",
      "cr_building_name",
      "cr_floor",
      "cr_post_code",
      "cr_town_name",
      "cr_country",
      "cr_currency",
      "exchange_rate",
      "cr_amount",
      "cr_bank_code",
      "cr_clr_code"
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
  const {creditor_info_label_text02833, setcreditor_info_label_text02833}= useContext(TotalContext) as TotalContextProps;
  const {ben_checkbox780b4, setben_checkbox780b4}= useContext(TotalContext) as TotalContextProps;
  const {cr_account3b649, setcr_account3b649}= useContext(TotalContext) as TotalContextProps;
  const {cr_namee0835, setcr_namee0835}= useContext(TotalContext) as TotalContextProps;
  const {cr_street_name21bab, setcr_street_name21bab}= useContext(TotalContext) as TotalContextProps;
  const {cr_benif_action9998d, setcr_benif_action9998d}= useContext(TotalContext) as TotalContextProps;
  const {cr_building_namea6ac7, setcr_building_namea6ac7}= useContext(TotalContext) as TotalContextProps;
  const {cr_floor44bed, setcr_floor44bed}= useContext(TotalContext) as TotalContextProps;
  const {cr_post_codef645b, setcr_post_codef645b}= useContext(TotalContext) as TotalContextProps;
  const {cr_town_nameed852, setcr_town_nameed852}= useContext(TotalContext) as TotalContextProps;
  const {cr_country38218, setcr_country38218}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencyb2ebe, setcr_currencyb2ebe}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate86282, setexchange_rate86282}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code76d12, setcr_bank_code76d12}= useContext(TotalContext) as TotalContextProps;
  const {cr_clr_code4387d, setcr_clr_code4387d}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupCrInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "18502770a2a84feb968a3817c35b01e8");
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
    setcr_info_groupb01e8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("creditor_info_label_text")){
        setcreditor_info_label_text02833((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(creditor_info_label_text02833?.isDisabled==null)
      {
        setcreditor_info_label_text02833((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ben_checkbox")){
        setben_checkbox780b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ben_checkbox780b4?.isDisabled==null)
      {
        setben_checkbox780b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_account")){
        setcr_account3b649((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_account3b649?.isDisabled==null)
      {
        setcr_account3b649((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_name")){
        setcr_namee0835((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_namee0835?.isDisabled==null)
      {
        setcr_namee0835((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_street_name")){
        setcr_street_name21bab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_street_name21bab?.isDisabled==null)
      {
        setcr_street_name21bab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_benif_action")){
        setcr_benif_action9998d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_benif_action9998d?.isDisabled==null)
      {
        setcr_benif_action9998d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_building_name")){
        setcr_building_namea6ac7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_building_namea6ac7?.isDisabled==null)
      {
        setcr_building_namea6ac7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_floor")){
        setcr_floor44bed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_floor44bed?.isDisabled==null)
      {
        setcr_floor44bed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_post_code")){
        setcr_post_codef645b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_post_codef645b?.isDisabled==null)
      {
        setcr_post_codef645b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_town_name")){
        setcr_town_nameed852((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_town_nameed852?.isDisabled==null)
      {
        setcr_town_nameed852((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_country")){
        setcr_country38218((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_country38218?.isDisabled==null)
      {
        setcr_country38218((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_currency")){
        setcr_currencyb2ebe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_currencyb2ebe?.isDisabled==null)
      {
        setcr_currencyb2ebe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("exchange_rate")){
        setexchange_rate86282((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(exchange_rate86282?.isDisabled==null)
      {
        setexchange_rate86282((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_amount")){
        setcr_amountbd2bf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_amountbd2bf?.isDisabled==null)
      {
        setcr_amountbd2bf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_bank_code")){
        setcr_bank_code76d12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_bank_code76d12?.isDisabled==null)
      {
        setcr_bank_code76d12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cr_clr_code")){
        setcr_clr_code4387d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cr_clr_code4387d?.isDisabled==null)
      {
        setcr_clr_code4387d((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['creditor_info_label_text'] = creditor_info_label_text02833,
        codeStates['setcreditor_info_label_text'] = setcreditor_info_label_text02833,
        codeStates['ben_checkbox'] = ben_checkbox780b4,
        codeStates['setben_checkbox'] = setben_checkbox780b4,
        codeStates['cr_account'] = cr_account3b649,
        codeStates['setcr_account'] = setcr_account3b649,
        codeStates['cr_name'] = cr_namee0835,
        codeStates['setcr_name'] = setcr_namee0835,
        codeStates['cr_street_name'] = cr_street_name21bab,
        codeStates['setcr_street_name'] = setcr_street_name21bab,
        codeStates['cr_benif_action'] = cr_benif_action9998d,
        codeStates['setcr_benif_action'] = setcr_benif_action9998d,
        codeStates['cr_building_name'] = cr_building_namea6ac7,
        codeStates['setcr_building_name'] = setcr_building_namea6ac7,
        codeStates['cr_floor'] = cr_floor44bed,
        codeStates['setcr_floor'] = setcr_floor44bed,
        codeStates['cr_post_code'] = cr_post_codef645b,
        codeStates['setcr_post_code'] = setcr_post_codef645b,
        codeStates['cr_town_name'] = cr_town_nameed852,
        codeStates['setcr_town_name'] = setcr_town_nameed852,
        codeStates['cr_country'] = cr_country38218,
        codeStates['setcr_country'] = setcr_country38218,
        codeStates['cr_currency'] = cr_currencyb2ebe,
        codeStates['setcr_currency'] = setcr_currencyb2ebe,
        codeStates['exchange_rate'] = exchange_rate86282,
        codeStates['setexchange_rate'] = setexchange_rate86282,
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['cr_bank_code'] = cr_bank_code76d12,
        codeStates['setcr_bank_code'] = setcr_bank_code76d12,
        codeStates['cr_clr_code'] = cr_clr_code4387d,
        codeStates['setcr_clr_code'] = setcr_clr_code4387d,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "18502770a2a84feb968a3817c35b01e8");
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
        codeStates['creditor_info_label_text'] = creditor_info_label_text02833,
        codeStates['setcreditor_info_label_text'] = setcreditor_info_label_text02833,
        codeStates['ben_checkbox'] = ben_checkbox780b4,
        codeStates['setben_checkbox'] = setben_checkbox780b4,
        codeStates['cr_account'] = cr_account3b649,
        codeStates['setcr_account'] = setcr_account3b649,
        codeStates['cr_name'] = cr_namee0835,
        codeStates['setcr_name'] = setcr_namee0835,
        codeStates['cr_street_name'] = cr_street_name21bab,
        codeStates['setcr_street_name'] = setcr_street_name21bab,
        codeStates['cr_benif_action'] = cr_benif_action9998d,
        codeStates['setcr_benif_action'] = setcr_benif_action9998d,
        codeStates['cr_building_name'] = cr_building_namea6ac7,
        codeStates['setcr_building_name'] = setcr_building_namea6ac7,
        codeStates['cr_floor'] = cr_floor44bed,
        codeStates['setcr_floor'] = setcr_floor44bed,
        codeStates['cr_post_code'] = cr_post_codef645b,
        codeStates['setcr_post_code'] = setcr_post_codef645b,
        codeStates['cr_town_name'] = cr_town_nameed852,
        codeStates['setcr_town_name'] = setcr_town_nameed852,
        codeStates['cr_country'] = cr_country38218,
        codeStates['setcr_country'] = setcr_country38218,
        codeStates['cr_currency'] = cr_currencyb2ebe,
        codeStates['setcr_currency'] = setcr_currencyb2ebe,
        codeStates['exchange_rate'] = exchange_rate86282,
        codeStates['setexchange_rate'] = setexchange_rate86282,
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['cr_bank_code'] = cr_bank_code76d12,
        codeStates['setcr_bank_code'] = setcr_bank_code76d12,
        codeStates['cr_clr_code'] = cr_clr_code4387d,
        codeStates['setcr_clr_code'] = setcr_clr_code4387d,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const cr_info_groupb01e8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    cr_info_groupb01e8Ref.current?.setSearchParams();
    cr_info_groupb01e8Ref.current?.handleSearch({});
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
        !Array.isArray(cr_info_groupb01e8) &&
        Object.keys(cr_info_groupb01e8)?.length > 0
      ) {
        setcr_info_groupb01e8({})
        setcr_info_groupb01e8Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [cr_info_groupb01e8Props?.refresh])


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
        gridRow: '47 / 135',
      
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
          setpaymentinfo_v1((pre:any)=>({...pre,_selectedGroup_:"cr_info_group"}))
        }}
    >
          {allowedControls.includes("creditor_info_label_text") ?<Textcreditor_info_label_text   /* 02833 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("ben_checkbox") ?<Checkboxben_checkbox   /* 780b4 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_account") ?<TextInputcr_account   /* 3b649 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_name") ?<TextInputcr_name   /* e0835 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_street_name") ?<TextInputcr_street_name   /* 21bab */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cr_benif_action" in ButtonGoRuleData)?ButtonGoRuleData["cr_benif_action"]:true) && 
          allowedControls.includes("cr_benif_action")  ?            <Buttoncr_benif_action tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("cr_building_name") ?<TextInputcr_building_name   /* a6ac7 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_floor") ?<TextInputcr_floor   /* 44bed */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_post_code") ?<TextInputcr_post_code   /* f645b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_town_name") ?<TextInputcr_town_name   /* ed852 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_country") ?<Dropdowncr_country   /* 38218 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("cr_currency") ?<Dropdowncr_currency   /* b2ebe */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("exchange_rate") ?<TextInputexchange_rate   /* 86282 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_amount") ?<TextInputcr_amount   /* bd2bf */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cr_bank_code") ?<Dropdowncr_bank_code   /* 76d12 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("cr_clr_code") ?<TextInputcr_clr_code   /* 4387d */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcr_info_group
