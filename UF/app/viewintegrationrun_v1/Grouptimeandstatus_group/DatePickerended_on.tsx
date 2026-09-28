

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
  const {inegration_run_groupaf8be, setinegration_run_groupaf8be}= useContext(TotalContext) as TotalContextProps  
  const {inegration_run_groupaf8beProps, setinegration_run_groupaf8beProps}= useContext(TotalContext) as TotalContextProps  
  const {run_information_group6fd48, setrun_information_group6fd48}= useContext(TotalContext) as TotalContextProps  
  const {run_information_group6fd48Props, setrun_information_group6fd48Props}= useContext(TotalContext) as TotalContextProps  
  const {timeandstatus_groupb220c, settimeandstatus_groupb220c}= useContext(TotalContext) as TotalContextProps  
  const {timeandstatus_groupb220cProps, settimeandstatus_groupb220cProps}= useContext(TotalContext) as TotalContextProps  
  const {timing_status8fa27, settiming_status8fa27}= useContext(TotalContext) as TotalContextProps  
  const {started_onf60a2, setstarted_onf60a2}= useContext(TotalContext) as TotalContextProps  
  const {ended_on2e42e, setended_on2e42e}= useContext(TotalContext) as TotalContextProps  
  const {run_status_codefeadd, setrun_status_codefeadd}= useContext(TotalContext) as TotalContextProps  
  const {record_groupdb184, setrecord_groupdb184}= useContext(TotalContext) as TotalContextProps  
  const {record_groupdb184Props, setrecord_groupdb184Props}= useContext(TotalContext) as TotalContextProps  
  const {error_group9bfbc, seterror_group9bfbc}= useContext(TotalContext) as TotalContextProps  
  const {error_group9bfbcProps, seterror_group9bfbcProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewIntegrationRun_v1:{...pre?.viewIntegrationRun_v1,ended_on:undefined}}));
  if (!date) {
    settimeandstatus_groupb220c((prev: any) => ({ ...prev, ended_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  settimeandstatus_groupb220c((prev: any) => ({ ...prev, ended_on: isoDate }))
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
        "18a5d5fdeab6402aa4d743f3bdbb220c",
        "aa9089ac4ed149fba1e53be78b92e42e"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['inegration_run_group'] = inegration_run_groupaf8be,
    codeStates['setinegration_run_group'] = setinegration_run_groupaf8be,
    codeStates['inegration_run_groupaf8be'] = inegration_run_groupaf8beProps,
    codeStates['setinegration_run_groupaf8be'] = setinegration_run_groupaf8beProps,
    codeStates['run_information_group'] = run_information_group6fd48,
    codeStates['setrun_information_group'] = setrun_information_group6fd48,
    codeStates['run_information_group6fd48'] = run_information_group6fd48Props,
    codeStates['setrun_information_group6fd48'] = setrun_information_group6fd48Props,
    codeStates['timeandstatus_group'] = timeandstatus_groupb220c,
    codeStates['settimeandstatus_group'] = settimeandstatus_groupb220c,
    codeStates['timeandstatus_groupb220c'] = timeandstatus_groupb220cProps,
    codeStates['settimeandstatus_groupb220c'] = settimeandstatus_groupb220cProps,
    codeStates['timing_status'] = timing_status8fa27,
    codeStates['settiming_status'] = settiming_status8fa27,
    codeStates['started_on'] = started_onf60a2,
    codeStates['setstarted_on'] = setstarted_onf60a2,
    codeStates['ended_on'] = ended_on2e42e,
    codeStates['setended_on'] = setended_on2e42e,
    codeStates['run_status_code'] = run_status_codefeadd,
    codeStates['setrun_status_code'] = setrun_status_codefeadd,
    codeStates['record_group'] = record_groupdb184,
    codeStates['setrecord_group'] = setrecord_groupdb184,
    codeStates['record_groupdb184'] = record_groupdb184Props,
    codeStates['setrecord_groupdb184'] = setrecord_groupdb184Props,
    codeStates['error_group'] = error_group9bfbc,
    codeStates['seterror_group'] = seterror_group9bfbc,
    codeStates['error_group9bfbc'] = error_group9bfbcProps,
    codeStates['seterror_group9bfbc'] = seterror_group9bfbcProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  settimeandstatus_groupb220cProps((pre:any)=>({...pre,validation:true}))
 },[ended_on2e42e?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (ended_on2e42e?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `29 / 41`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={timeandstatus_groupb220c?.ended_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {ended_on2e42e?.isDisabled ? true : false}
      disabled= {ended_on2e42e?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="End"
      dateValidation=""
      validationState={validate?.viewIntegrationRun_v1?.ended_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerended_on
