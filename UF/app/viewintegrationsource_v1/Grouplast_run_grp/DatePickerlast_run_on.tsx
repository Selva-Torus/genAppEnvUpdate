

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


const DatePickerlast_run_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_group37fbc, setadd_group37fbc}= useContext(TotalContext) as TotalContextProps  
  const {add_group37fbcProps, setadd_group37fbcProps}= useContext(TotalContext) as TotalContextProps  
  const {source_details_grp9bff6, setsource_details_grp9bff6}= useContext(TotalContext) as TotalContextProps  
  const {source_details_grp9bff6Props, setsource_details_grp9bff6Props}= useContext(TotalContext) as TotalContextProps  
  const {connect_group1b893, setconnect_group1b893}= useContext(TotalContext) as TotalContextProps  
  const {connect_group1b893Props, setconnect_group1b893Props}= useContext(TotalContext) as TotalContextProps  
  const {scheduler_retry_grp8ca28, setscheduler_retry_grp8ca28}= useContext(TotalContext) as TotalContextProps  
  const {scheduler_retry_grp8ca28Props, setscheduler_retry_grp8ca28Props}= useContext(TotalContext) as TotalContextProps  
  const {ownership_ststus_grpbc00a, setownership_ststus_grpbc00a}= useContext(TotalContext) as TotalContextProps  
  const {ownership_ststus_grpbc00aProps, setownership_ststus_grpbc00aProps}= useContext(TotalContext) as TotalContextProps  
  const {last_run_grpc3967, setlast_run_grpc3967}= useContext(TotalContext) as TotalContextProps  
  const {last_run_grpc3967Props, setlast_run_grpc3967Props}= useContext(TotalContext) as TotalContextProps  
  const {text7bd91, settext7bd91}= useContext(TotalContext) as TotalContextProps  
  const {last_run_on47bd1, setlast_run_on47bd1}= useContext(TotalContext) as TotalContextProps  
  const {last_run_statusd5b13, setlast_run_statusd5b13}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewIntegrationSource_v1:{...pre?.viewIntegrationSource_v1,last_run_on:undefined}}));
  if (!date) {
    setlast_run_grpc3967((prev: any) => ({ ...prev, last_run_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setlast_run_grpc3967((prev: any) => ({ ...prev, last_run_on: isoDate }))
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
        "03e81b78c77d59039901fdb12f7c3967",
        "6f3b37c8536a438b8fdb760af6547bd1"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_group'] = add_group37fbc,
    codeStates['setadd_group'] = setadd_group37fbc,
    codeStates['add_group37fbc'] = add_group37fbcProps,
    codeStates['setadd_group37fbc'] = setadd_group37fbcProps,
    codeStates['source_details_grp'] = source_details_grp9bff6,
    codeStates['setsource_details_grp'] = setsource_details_grp9bff6,
    codeStates['source_details_grp9bff6'] = source_details_grp9bff6Props,
    codeStates['setsource_details_grp9bff6'] = setsource_details_grp9bff6Props,
    codeStates['connect_group'] = connect_group1b893,
    codeStates['setconnect_group'] = setconnect_group1b893,
    codeStates['connect_group1b893'] = connect_group1b893Props,
    codeStates['setconnect_group1b893'] = setconnect_group1b893Props,
    codeStates['scheduler_retry_grp'] = scheduler_retry_grp8ca28,
    codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp8ca28,
    codeStates['scheduler_retry_grp8ca28'] = scheduler_retry_grp8ca28Props,
    codeStates['setscheduler_retry_grp8ca28'] = setscheduler_retry_grp8ca28Props,
    codeStates['ownership_ststus_grp'] = ownership_ststus_grpbc00a,
    codeStates['setownership_ststus_grp'] = setownership_ststus_grpbc00a,
    codeStates['ownership_ststus_grpbc00a'] = ownership_ststus_grpbc00aProps,
    codeStates['setownership_ststus_grpbc00a'] = setownership_ststus_grpbc00aProps,
    codeStates['last_run_grp'] = last_run_grpc3967,
    codeStates['setlast_run_grp'] = setlast_run_grpc3967,
    codeStates['last_run_grpc3967'] = last_run_grpc3967Props,
    codeStates['setlast_run_grpc3967'] = setlast_run_grpc3967Props,
    codeStates['text'] = text7bd91,
    codeStates['settext'] = settext7bd91,
    codeStates['last_run_on'] = last_run_on47bd1,
    codeStates['setlast_run_on'] = setlast_run_on47bd1,
    codeStates['last_run_status'] = last_run_statusd5b13,
    codeStates['setlast_run_status'] = setlast_run_statusd5b13,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setlast_run_grpc3967Props((pre:any)=>({...pre,validation:true}))
 },[last_run_on47bd1?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (last_run_on47bd1?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `2 / 9`,gridRow: `10 / 22`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={last_run_grpc3967?.last_run_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {last_run_on47bd1?.isDisabled ? true : false}
      disabled= {last_run_on47bd1?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Last Run On"
      dateValidation=""
      validationState={validate?.viewIntegrationSource_v1?.last_run_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerlast_run_on
