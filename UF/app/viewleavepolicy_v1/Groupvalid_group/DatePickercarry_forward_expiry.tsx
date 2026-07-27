

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
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


const DatePickercarry_forward_expiry = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps  
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps  
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps  
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps  
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps  
  const {leave_entity44a9e, setleave_entity44a9e}= useContext(TotalContext) as TotalContextProps  
  const {days_per_year540db, setdays_per_year540db}= useContext(TotalContext) as TotalContextProps  
  const {carry_forward_days069b8, setcarry_forward_days069b8}= useContext(TotalContext) as TotalContextProps  
  const {carry_forward_expiry2db6d, setcarry_forward_expiry2db6d}= useContext(TotalContext) as TotalContextProps  
  const {accrual_frequency7324d, setaccrual_frequency7324d}= useContext(TotalContext) as TotalContextProps  
  const {max_consecutive_days47fe8, setmax_consecutive_days47fe8}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps  
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps  
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps  
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps  
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewLeavePolicy_v1:{...pre?.viewLeavePolicy_v1,carry_forward_expiry:undefined}}));
  if (!date) {
    setvalid_group60f4e((prev: any) => ({ ...prev, carry_forward_expiry: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalid_group60f4e((prev: any) => ({ ...prev, carry_forward_expiry: isoDate }))
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
        "844ad10a3f3090d34b205744d9d60f4e",
        "dab2862e946c0e8d1d3d2d8192f2db6d"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group193d2,
    codeStates['setnew_access_group'] = setnew_access_group193d2,
    codeStates['new_access_group193d2'] = new_access_group193d2Props,
    codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
    codeStates['access_req__group'] = access_req__groupc57b7,
    codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
    codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
    codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
    codeStates['app_inf_group'] = app_inf_group60e94,
    codeStates['setapp_inf_group'] = setapp_inf_group60e94,
    codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
    codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
    codeStates['approve_group'] = approve_group27e47,
    codeStates['setapprove_group'] = setapprove_group27e47,
    codeStates['approve_group27e47'] = approve_group27e47Props,
    codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
    codeStates['valid_group'] = valid_group60f4e,
    codeStates['setvalid_group'] = setvalid_group60f4e,
    codeStates['valid_group60f4e'] = valid_group60f4eProps,
    codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
    codeStates['leave_entity'] = leave_entity44a9e,
    codeStates['setleave_entity'] = setleave_entity44a9e,
    codeStates['days_per_year'] = days_per_year540db,
    codeStates['setdays_per_year'] = setdays_per_year540db,
    codeStates['carry_forward_days'] = carry_forward_days069b8,
    codeStates['setcarry_forward_days'] = setcarry_forward_days069b8,
    codeStates['carry_forward_expiry'] = carry_forward_expiry2db6d,
    codeStates['setcarry_forward_expiry'] = setcarry_forward_expiry2db6d,
    codeStates['accrual_frequency'] = accrual_frequency7324d,
    codeStates['setaccrual_frequency'] = setaccrual_frequency7324d,
    codeStates['max_consecutive_days'] = max_consecutive_days47fe8,
    codeStates['setmax_consecutive_days'] = setmax_consecutive_days47fe8,
    codeStates['business_just__group'] = business_just__group4dcdb,
    codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
    codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
    codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
    codeStates['provision_group'] = provision_group68072,
    codeStates['setprovision_group'] = setprovision_group68072,
    codeStates['provision_group68072'] = provision_group68072Props,
    codeStates['setprovision_group68072'] = setprovision_group68072Props,
    codeStates['leave_rule_group'] = leave_rule_group1e665,
    codeStates['setleave_rule_group'] = setleave_rule_group1e665,
    codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
    codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalid_group60f4eProps((pre:any)=>({...pre,validation:true}))
 },[carry_forward_expiry2db6d?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (carry_forward_expiry2db6d?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `16 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={valid_group60f4e?.carry_forward_expiry}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {carry_forward_expiry2db6d?.isDisabled ? true : false}
      disabled= {carry_forward_expiry2db6d?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Carry Forward Expiry"
      dateValidation=""
      validationState={validate?.viewLeavePolicy_v1?.carry_forward_expiry ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickercarry_forward_expiry
