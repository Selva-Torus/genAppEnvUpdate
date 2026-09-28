

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
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


const DatePickerended_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
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
  const {inegration_run_group5a7be, setinegration_run_group5a7be}= useContext(TotalContext) as TotalContextProps  
  const {inegration_run_group5a7beProps, setinegration_run_group5a7beProps}= useContext(TotalContext) as TotalContextProps  
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps  
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps  
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps  
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps  
  const {timing_status54aec, settiming_status54aec}= useContext(TotalContext) as TotalContextProps  
  const {started_ond88e8, setstarted_ond88e8}= useContext(TotalContext) as TotalContextProps  
  const {ended_on9cf0a, setended_on9cf0a}= useContext(TotalContext) as TotalContextProps  
  const {run_status_codef6fc6, setrun_status_codef6fc6}= useContext(TotalContext) as TotalContextProps  
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps  
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps  
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps  
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addIntegrationRun_v1:{...pre?.addIntegrationRun_v1,ended_on:undefined}}));
  if (!date) {
    settimeandstatus_group9ec90((prev: any) => ({ ...prev, ended_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  settimeandstatus_group9ec90((prev: any) => ({ ...prev, ended_on: isoDate }))
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
        "acb1b9ef22344e2899907659f179ec90",
        "057ca4dca72a44b7b7e58d6b84d9cf0a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['inegration_run_group'] = inegration_run_group5a7be,
    codeStates['setinegration_run_group'] = setinegration_run_group5a7be,
    codeStates['inegration_run_group5a7be'] = inegration_run_group5a7beProps,
    codeStates['setinegration_run_group5a7be'] = setinegration_run_group5a7beProps,
    codeStates['run_information_group'] = run_information_group519a1,
    codeStates['setrun_information_group'] = setrun_information_group519a1,
    codeStates['run_information_group519a1'] = run_information_group519a1Props,
    codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
    codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
    codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
    codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
    codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
    codeStates['timing_status'] = timing_status54aec,
    codeStates['settiming_status'] = settiming_status54aec,
    codeStates['started_on'] = started_ond88e8,
    codeStates['setstarted_on'] = setstarted_ond88e8,
    codeStates['ended_on'] = ended_on9cf0a,
    codeStates['setended_on'] = setended_on9cf0a,
    codeStates['run_status_code'] = run_status_codef6fc6,
    codeStates['setrun_status_code'] = setrun_status_codef6fc6,
    codeStates['record_group'] = record_groupa6d32,
    codeStates['setrecord_group'] = setrecord_groupa6d32,
    codeStates['record_groupa6d32'] = record_groupa6d32Props,
    codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
    codeStates['error_group'] = error_group193e2,
    codeStates['seterror_group'] = seterror_group193e2,
    codeStates['error_group193e2'] = error_group193e2Props,
    codeStates['seterror_group193e2'] = seterror_group193e2Props,
    codeStates['dynamicactions'] = dynamicactions669ce,
    codeStates['setdynamicactions'] = setdynamicactions669ce,
    codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
    codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  settimeandstatus_group9ec90Props((pre:any)=>({...pre,validation:true}))
 },[ended_on9cf0a?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (ended_on9cf0a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `22 / 34`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={timeandstatus_group9ec90?.ended_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {ended_on9cf0a?.isDisabled ? true : false}
      disabled= {ended_on9cf0a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="End"
      dateValidation=""
      validationState={validate?.addIntegrationRun_v1?.ended_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerended_on
