

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


const DatePickercompleted_at_datepicker = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps  
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps  
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps  
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps  
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps  
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps  
  const {completed_at_datepicker9e849, setcompleted_at_datepicker9e849}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps  
  const {review_id0ac0f, setreview_id0ac0f}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewPerformanceReview_v1:{...pre?.viewPerformanceReview_v1,completed_at:undefined}}));
  if (!date) {
    setnew_access_groupc5a99((prev: any) => ({ ...prev, completed_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setnew_access_groupc5a99((prev: any) => ({ ...prev, completed_at: isoDate }))
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
        "01dacc2683a5ab6a81623e4326cc5a99",
        "c3ebcb911a641af6a63e466633b9e849"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_groupc5a99,
    codeStates['setnew_access_group'] = setnew_access_groupc5a99,
    codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
    codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
    codeStates['access_req__group'] = access_req__group002d0,
    codeStates['setaccess_req__group'] = setaccess_req__group002d0,
    codeStates['access_req__group002d0'] = access_req__group002d0Props,
    codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
    codeStates['valid_group'] = valid_group3a8ab,
    codeStates['setvalid_group'] = setvalid_group3a8ab,
    codeStates['valid_group3a8ab'] = valid_group3a8abProps,
    codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
    codeStates['addt__group'] = addt__group6ba4f,
    codeStates['setaddt__group'] = setaddt__group6ba4f,
    codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
    codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
    codeStates['addt__dts_group'] = addt__dts_group613d2,
    codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
    codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
    codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
    codeStates['completed_at_datepicker'] = completed_at_datepicker9e849,
    codeStates['setcompleted_at_datepicker'] = setcompleted_at_datepicker9e849,
    codeStates['dynamicactions'] = dynamicactionsb315b,
    codeStates['setdynamicactions'] = setdynamicactionsb315b,
    codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
    codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
    codeStates['review_id'] = review_id0ac0f,
    codeStates['setreview_id'] = setreview_id0ac0f,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setnew_access_groupc5a99Props((pre:any)=>({...pre,validation:true}))
 },[completed_at_datepicker9e849?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (completed_at_datepicker9e849?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 5`,gridRow: `64 / 76`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={new_access_groupc5a99?.completed_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {completed_at_datepicker9e849?.isDisabled ? true : false}
      disabled= {completed_at_datepicker9e849?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Completed At"
      dateValidation=""
      validationState={validate?.viewPerformanceReview_v1?.completed_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickercompleted_at_datepicker
