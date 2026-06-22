

'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickersupport_expiry = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [isRequiredData,setIsRequiredData]=useState<boolean>(false)
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  //showComponentAsPopup || showArtifactAsModal
    
  /////////////
   //another screen
  const {add_license_groupdb5a7, setadd_license_groupdb5a7}= useContext(TotalContext) as TotalContextProps  
  const {add_license_groupdb5a7Props, setadd_license_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps  
  const {license_information_groupfae34, setlicense_information_groupfae34}= useContext(TotalContext) as TotalContextProps  
  const {license_information_groupfae34Props, setlicense_information_groupfae34Props}= useContext(TotalContext) as TotalContextProps  
  const {license_configuration_groupb5d91, setlicense_configuration_groupb5d91}= useContext(TotalContext) as TotalContextProps  
  const {license_configuration_groupb5d91Props, setlicense_configuration_groupb5d91Props}= useContext(TotalContext) as TotalContextProps  
  const {validity_financial_details_grouped4a1, setvalidity_financial_details_grouped4a1}= useContext(TotalContext) as TotalContextProps  
  const {validity_financial_details_grouped4a1Props, setvalidity_financial_details_grouped4a1Props}= useContext(TotalContext) as TotalContextProps  
  const {validity_financial_details82762, setvalidity_financial_details82762}= useContext(TotalContext) as TotalContextProps  
  const {purchase_datebfe70, setpurchase_datebfe70}= useContext(TotalContext) as TotalContextProps  
  const {expiry_date5c034, setexpiry_date5c034}= useContext(TotalContext) as TotalContextProps  
  const {support_expiry4ec2c, setsupport_expiry4ec2c}= useContext(TotalContext) as TotalContextProps  
  const {costf9899, setcostf9899}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions67d98, setdynamicactions67d98}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions67d98Props, setdynamicactions67d98Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addLicense_v1:{...pre?.addLicense_v1,support_expiry:undefined}}));
  if (!date) {
    setvalidity_financial_details_grouped4a1((prev: any) => ({ ...prev, support_expiry: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setvalidity_financial_details_grouped4a1((prev: any) => ({ ...prev, support_expiry: isoDate }))
  }catch (err: any) {
    //setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
}



const handleBlur=async () => {
    //validation
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1eedc787c9574ce3abe0ab94a8ced4a1",
        "5ad115a1be0346279c63fe7b2034ec2c"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_license_group'] = add_license_groupdb5a7,
    codeStates['setadd_license_group'] = setadd_license_groupdb5a7,
    codeStates['add_license_groupdb5a7'] = add_license_groupdb5a7Props,
    codeStates['setadd_license_groupdb5a7'] = setadd_license_groupdb5a7Props,
    codeStates['license_information_group'] = license_information_groupfae34,
    codeStates['setlicense_information_group'] = setlicense_information_groupfae34,
    codeStates['license_information_groupfae34'] = license_information_groupfae34Props,
    codeStates['setlicense_information_groupfae34'] = setlicense_information_groupfae34Props,
    codeStates['license_configuration_group'] = license_configuration_groupb5d91,
    codeStates['setlicense_configuration_group'] = setlicense_configuration_groupb5d91,
    codeStates['license_configuration_groupb5d91'] = license_configuration_groupb5d91Props,
    codeStates['setlicense_configuration_groupb5d91'] = setlicense_configuration_groupb5d91Props,
    codeStates['validity_financial_details_group'] = validity_financial_details_grouped4a1,
    codeStates['setvalidity_financial_details_group'] = setvalidity_financial_details_grouped4a1,
    codeStates['validity_financial_details_grouped4a1'] = validity_financial_details_grouped4a1Props,
    codeStates['setvalidity_financial_details_grouped4a1'] = setvalidity_financial_details_grouped4a1Props,
    codeStates['validity_financial_details'] = validity_financial_details82762,
    codeStates['setvalidity_financial_details'] = setvalidity_financial_details82762,
    codeStates['purchase_date'] = purchase_datebfe70,
    codeStates['setpurchase_date'] = setpurchase_datebfe70,
    codeStates['expiry_date'] = expiry_date5c034,
    codeStates['setexpiry_date'] = setexpiry_date5c034,
    codeStates['support_expiry'] = support_expiry4ec2c,
    codeStates['setsupport_expiry'] = setsupport_expiry4ec2c,
    codeStates['cost'] = costf9899,
    codeStates['setcost'] = setcostf9899,
    codeStates['dynamicactions'] = dynamicactions67d98,
    codeStates['setdynamicactions'] = setdynamicactions67d98,
    codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
    codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalidity_financial_details_grouped4a1Props((pre:any)=>({...pre,validation:true}))
 },[support_expiry4ec2c?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (support_expiry4ec2c?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `17 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={validity_financial_details_grouped4a1?.support_expiry}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {support_expiry4ec2c?.isDisabled ? true : false}
      disabled= {support_expiry4ec2c?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Support Expiry"
      dateValidation=""
      validationState={validate?.addLicense_v1?.support_expiry ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickersupport_expiry
