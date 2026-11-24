'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { RadioGroup } from '@/components/RadioGroup';
import { AxiosService } from "@/app/components/axiosService";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import i18n from '@/app/components/i18n';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import * as v from 'valibot';
import UOmapperData from '@/context/dfdmapperContolnames.json';

const RadioGroupamount_input_type = ({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(TotalContext) as TotalContextProps;
  const { validateRefetch, setValidateRefetch } = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const keyset:any=i18n.keyset("language");
  const [error, setError] = useState<string>('')
  const [isRequredData, setIsRequredData]=useState<boolean>(false)
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
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
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;  
  //////////////
  const options: any[] = [
      {value: 'CR' ,content:'CR'},
      {value: 'DR' ,content:'DR'},
  ];
  const defaultValue = options[0]?.value ?? "";
  useEffect(()=>{
    if(dbtr_info_group4e8ea?.amount_input_type == undefined || dbtr_info_group4e8ea?.amount_input_type == ""){
    handleChange(defaultValue)
    }
  },[])

  let optionsValue:any=options.map(item=>item.content);   
  //validation
  let schemaArray = [] ;
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(
      controlData,
      "3ecea796df8c424d898e967635c4e8ea",
      "228ca721138446a2a2f76312138cd6ed"
    );
     if(orchestrationData?.data?.error == true){
      return;
    }
    setAllCode( orchestrationData?.data?.code);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    if(dbtr_info_group4e8ea?.amount_input_type == undefined || dbtr_info_group4e8ea?.amount_input_type == ""){
    setdbtr_info_group4e8ea((pre:any)=>({...pre,amount_input_type: defaultValue}));
    }
  },[amount_input_typecd6ed?.refresh])
    const selected=useRef({})
  useEffect(()=>{
    handleBlur()
},[validateRefetch.value])
  const handleBlur = async () => {
    //validation
  }
  const handleChange= async(e:any)=>{
    try{
    setIsProcessing(true);
    if (e !== '') {
    setdbtr_info_group4e8ea((prev: any) => ({ ...prev, amount_input_type: e }));
    if (String(e) === "DR") {
      if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Maker"},{...decodedTokenObj,...dbtr_info_group4e8ea})==false){
        if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Maker"},{...decodedTokenObj,...dbtr_info_group4e8ea})==false)
        {
          setcr_amountbd2bf((prev: any) => ({ ...prev, isDisabled: true }));
        }
      }
    }
    if (String(e) === "CR") {
      if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Maker"},{...decodedTokenObj,...dbtr_info_group4e8ea})==false){
        if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Maker"},{...decodedTokenObj,...dbtr_info_group4e8ea})==false)
        {
          setcr_amountbd2bf((prev: any) => ({ ...prev, isDisabled: false }));
        }
      }
    }
    if (String(e) === "DR") {
        setdr_amount178b9((prev: any) => ({ ...prev, isDisabled: false }));
    }
    if (String(e) === "CR") {
        setdr_amount178b9((prev: any) => ({ ...prev, isDisabled: true }));
    }
      } else {
      setdbtr_info_group4e8ea((prev: any) => ({ ...prev, amount_input_type: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,amount_input_type:undefined}}));
    selected.current=String(e)
    let code = allCode;
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
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
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['selected']  = selected
    codeExecution(code,codeStates);
    }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }


 
  if (amount_input_typecd6ed?.isHidden) {
    return <></>
  }
  
return (
  <div 
    style={{gridColumn: `17 / 25`,gridRow: `53 / 67`, gap:``, height: `100%`, overflow: 'auto'}} >
      <RadioGroup
        className=""
        value={dbtr_info_group4e8ea?.amount_input_type || ""} 
        disabled= {amount_input_typecd6ed?.isDisabled ? true : false}
        direction="horizontal"
        defaultValue={options[0].value}
        items={options}
        onChange={handleChange}
        contentAlign={"center"}
        headerPosition='top'
        headerText="Amount Input Type"
      />
  </div>
  )
}

export default RadioGroupamount_input_type
