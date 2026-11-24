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
import Textdbtr_info_text_label  from "./Textdbtr_info_text_label";
import TextInputdr_account  from "./TextInputdr_account";
import TextInputdr_Name  from "./TextInputdr_Name";
import Dropdowndr_currency  from "./Dropdowndr_currency";
import TextInputdr_account_balance  from "./TextInputdr_account_balance";
import TextInputdr_iban  from "./TextInputdr_iban";
import TextInputdr_street_name  from "./TextInputdr_street_name";
import TextInputdr_building_number  from "./TextInputdr_building_number";
import TextInputdr_pstl_code  from "./TextInputdr_pstl_code";
import TextInputdr_town_name  from "./TextInputdr_town_name";
import Dropdowndr_country  from "./Dropdowndr_country";
import Dropdowndr_bank_code  from "./Dropdowndr_bank_code";
import RadioGroupamount_input_type  from "./RadioGroupamount_input_type";
import TextInputdr_amount  from "./TextInputdr_amount";
import TextInputsettlement_amount  from "./TextInputsettlement_amount";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdbtr_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "dbtr_info_text_label",
      "dr_account",
      "dr_name",
      "dr_currency",
      "dr_account_balance",
      "dr_iban",
      "dr_street_name",
      "dr_building_number",
      "dr_pstl_code",
      "dr_town_name",
      "dr_country",
      "dr_bank_code",
      "amount_input_type",
      "dr_amount",
      "settlement_amount"
    ],
    "allowedGroups": [
      "canvas",
      "payment_info_group",
      "midynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": [
      "dbtr_info_text_label",
      "dr_account",
      "dr_name",
      "dr_currency",
      "dr_account_balance",
      "dr_iban",
      "dr_street_name",
      "dr_building_number",
      "dr_pstl_code",
      "dr_town_name",
      "dr_country",
      "dr_bank_code",
      "amount_input_type",
      "dr_amount",
      "settlement_amount"
    ]
  },
  "Operational Officer": {
    "allowedControls": [
      "dbtr_info_text_label",
      "dr_account",
      "dr_name",
      "dr_currency",
      "dr_account_balance",
      "dr_iban",
      "dr_street_name",
      "dr_building_number",
      "dr_pstl_code",
      "dr_town_name",
      "dr_country",
      "dr_bank_code",
      "amount_input_type",
      "dr_amount",
      "settlement_amount"
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
  const {dbtr_info_text_label1015f, setdbtr_info_text_label1015f}= useContext(TotalContext) as TotalContextProps;
  const {dr_accounta8f91, setdr_accounta8f91}= useContext(TotalContext) as TotalContextProps;
  const {dr_namef1c15, setdr_namef1c15}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency45f51, setdr_currency45f51}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_balancea2246, setdr_account_balancea2246}= useContext(TotalContext) as TotalContextProps;
  const {dr_ibanbaa1f, setdr_ibanbaa1f}= useContext(TotalContext) as TotalContextProps;
  const {dr_street_name149b0, setdr_street_name149b0}= useContext(TotalContext) as TotalContextProps;
  const {dr_building_numberba75a, setdr_building_numberba75a}= useContext(TotalContext) as TotalContextProps;
  const {dr_pstl_code5ec76, setdr_pstl_code5ec76}= useContext(TotalContext) as TotalContextProps;
  const {dr_town_name19970, setdr_town_name19970}= useContext(TotalContext) as TotalContextProps;
  const {dr_countrydd685, setdr_countrydd685}= useContext(TotalContext) as TotalContextProps;
  const {dr_bank_codeffb62, setdr_bank_codeffb62}= useContext(TotalContext) as TotalContextProps;
  const {amount_input_typecd6ed, setamount_input_typecd6ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount178b9, setdr_amount178b9}= useContext(TotalContext) as TotalContextProps;
  const {settlement_amount32b14, setsettlement_amount32b14}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDbtrInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3ecea796df8c424d898e967635c4e8ea");
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
    setdbtr_info_group4e8eaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dbtr_info_text_label")){
        setdbtr_info_text_label1015f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dbtr_info_text_label1015f?.isDisabled==null)
      {
        setdbtr_info_text_label1015f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account")){
        setdr_accounta8f91((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_accounta8f91?.isDisabled==null)
      {
        setdr_accounta8f91((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_name")){
        setdr_namef1c15((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_namef1c15?.isDisabled==null)
      {
        setdr_namef1c15((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_currency")){
        setdr_currency45f51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_currency45f51?.isDisabled==null)
      {
        setdr_currency45f51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_account_balance")){
        setdr_account_balancea2246((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_account_balancea2246?.isDisabled==null)
      {
        setdr_account_balancea2246((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_iban")){
        setdr_ibanbaa1f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_ibanbaa1f?.isDisabled==null)
      {
        setdr_ibanbaa1f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_street_name")){
        setdr_street_name149b0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_street_name149b0?.isDisabled==null)
      {
        setdr_street_name149b0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_building_number")){
        setdr_building_numberba75a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_building_numberba75a?.isDisabled==null)
      {
        setdr_building_numberba75a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_pstl_code")){
        setdr_pstl_code5ec76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_pstl_code5ec76?.isDisabled==null)
      {
        setdr_pstl_code5ec76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_town_name")){
        setdr_town_name19970((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_town_name19970?.isDisabled==null)
      {
        setdr_town_name19970((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_country")){
        setdr_countrydd685((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_countrydd685?.isDisabled==null)
      {
        setdr_countrydd685((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_bank_code")){
        setdr_bank_codeffb62((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_bank_codeffb62?.isDisabled==null)
      {
        setdr_bank_codeffb62((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amount_input_type")){
        setamount_input_typecd6ed((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(amount_input_typecd6ed?.isDisabled==null)
      {
        setamount_input_typecd6ed((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dr_amount")){
        setdr_amount178b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dr_amount178b9?.isDisabled==null)
      {
        setdr_amount178b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("settlement_amount")){
        setsettlement_amount32b14((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(settlement_amount32b14?.isDisabled==null)
      {
        setsettlement_amount32b14((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['dbtr_info_text_label'] = dbtr_info_text_label1015f,
        codeStates['setdbtr_info_text_label'] = setdbtr_info_text_label1015f,
        codeStates['dr_account'] = dr_accounta8f91,
        codeStates['setdr_account'] = setdr_accounta8f91,
        codeStates['dr_name'] = dr_namef1c15,
        codeStates['setdr_name'] = setdr_namef1c15,
        codeStates['dr_currency'] = dr_currency45f51,
        codeStates['setdr_currency'] = setdr_currency45f51,
        codeStates['dr_account_balance'] = dr_account_balancea2246,
        codeStates['setdr_account_balance'] = setdr_account_balancea2246,
        codeStates['dr_iban'] = dr_ibanbaa1f,
        codeStates['setdr_iban'] = setdr_ibanbaa1f,
        codeStates['dr_street_name'] = dr_street_name149b0,
        codeStates['setdr_street_name'] = setdr_street_name149b0,
        codeStates['dr_building_number'] = dr_building_numberba75a,
        codeStates['setdr_building_number'] = setdr_building_numberba75a,
        codeStates['dr_pstl_code'] = dr_pstl_code5ec76,
        codeStates['setdr_pstl_code'] = setdr_pstl_code5ec76,
        codeStates['dr_town_name'] = dr_town_name19970,
        codeStates['setdr_town_name'] = setdr_town_name19970,
        codeStates['dr_country'] = dr_countrydd685,
        codeStates['setdr_country'] = setdr_countrydd685,
        codeStates['dr_bank_code'] = dr_bank_codeffb62,
        codeStates['setdr_bank_code'] = setdr_bank_codeffb62,
        codeStates['amount_input_type'] = amount_input_typecd6ed,
        codeStates['setamount_input_type'] = setamount_input_typecd6ed,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
        codeStates['settlement_amount'] = settlement_amount32b14,
        codeStates['setsettlement_amount'] = setsettlement_amount32b14,
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

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3ecea796df8c424d898e967635c4e8ea");
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
      setsettlement_amount32b14((prev: any) => ({ ...prev, isDisabled: true }))
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
        codeStates['dbtr_info_text_label'] = dbtr_info_text_label1015f,
        codeStates['setdbtr_info_text_label'] = setdbtr_info_text_label1015f,
        codeStates['dr_account'] = dr_accounta8f91,
        codeStates['setdr_account'] = setdr_accounta8f91,
        codeStates['dr_name'] = dr_namef1c15,
        codeStates['setdr_name'] = setdr_namef1c15,
        codeStates['dr_currency'] = dr_currency45f51,
        codeStates['setdr_currency'] = setdr_currency45f51,
        codeStates['dr_account_balance'] = dr_account_balancea2246,
        codeStates['setdr_account_balance'] = setdr_account_balancea2246,
        codeStates['dr_iban'] = dr_ibanbaa1f,
        codeStates['setdr_iban'] = setdr_ibanbaa1f,
        codeStates['dr_street_name'] = dr_street_name149b0,
        codeStates['setdr_street_name'] = setdr_street_name149b0,
        codeStates['dr_building_number'] = dr_building_numberba75a,
        codeStates['setdr_building_number'] = setdr_building_numberba75a,
        codeStates['dr_pstl_code'] = dr_pstl_code5ec76,
        codeStates['setdr_pstl_code'] = setdr_pstl_code5ec76,
        codeStates['dr_town_name'] = dr_town_name19970,
        codeStates['setdr_town_name'] = setdr_town_name19970,
        codeStates['dr_country'] = dr_countrydd685,
        codeStates['setdr_country'] = setdr_countrydd685,
        codeStates['dr_bank_code'] = dr_bank_codeffb62,
        codeStates['setdr_bank_code'] = setdr_bank_codeffb62,
        codeStates['amount_input_type'] = amount_input_typecd6ed,
        codeStates['setamount_input_type'] = setamount_input_typecd6ed,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
        codeStates['settlement_amount'] = settlement_amount32b14,
        codeStates['setsettlement_amount'] = setsettlement_amount32b14,
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dbtr_info_group4e8eaRef = useRef<any>(null);
  const handleClearSearch = () => {
    dbtr_info_group4e8eaRef.current?.setSearchParams();
    dbtr_info_group4e8eaRef.current?.handleSearch({});
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
        !Array.isArray(dbtr_info_group4e8ea) &&
        Object.keys(dbtr_info_group4e8ea)?.length > 0
      ) {
        setdbtr_info_group4e8ea({})
        setdbtr_info_group4e8eaProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dbtr_info_group4e8eaProps?.refresh])


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
        gridColumn: '1 / 13',
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
          setpaymentinfo_v1((pre:any)=>({...pre,_selectedGroup_:"dbtr_info_group"}))
        }}
    >
          {allowedControls.includes("dbtr_info_text_label") ?<Textdbtr_info_text_label   /* 1015f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_account") ?<TextInputdr_account   /* a8f91 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_name") ?<TextInputdr_Name   /* f1c15 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_currency") ?<Dropdowndr_currency   /* 45f51 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("dr_account_balance") ?<TextInputdr_account_balance   /* a2246 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_iban") ?<TextInputdr_iban   /* baa1f */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_street_name") ?<TextInputdr_street_name   /* 149b0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_building_number") ?<TextInputdr_building_number   /* ba75a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_pstl_code") ?<TextInputdr_pstl_code   /* 5ec76 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_town_name") ?<TextInputdr_town_name   /* 19970 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_country") ?<Dropdowndr_country   /* dd685 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("dr_bank_code") ?<Dropdowndr_bank_code   /* ffb62 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("amount_input_type")?<RadioGroupamount_input_type   /* cd6ed */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("dr_amount") ?<TextInputdr_amount   /* 178b9 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("settlement_amount") ?<TextInputsettlement_amount   /* 32b14 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupdbtr_info_group
