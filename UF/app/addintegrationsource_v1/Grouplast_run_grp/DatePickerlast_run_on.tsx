

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
  const {add_group9cddc, setadd_group9cddc}= useContext(TotalContext) as TotalContextProps  
  const {add_group9cddcProps, setadd_group9cddcProps}= useContext(TotalContext) as TotalContextProps  
  const {source_details_grp23dfd, setsource_details_grp23dfd}= useContext(TotalContext) as TotalContextProps  
  const {source_details_grp23dfdProps, setsource_details_grp23dfdProps}= useContext(TotalContext) as TotalContextProps  
  const {connect_group3616a, setconnect_group3616a}= useContext(TotalContext) as TotalContextProps  
  const {connect_group3616aProps, setconnect_group3616aProps}= useContext(TotalContext) as TotalContextProps  
  const {scheduler_retry_grp90aeb, setscheduler_retry_grp90aeb}= useContext(TotalContext) as TotalContextProps  
  const {scheduler_retry_grp90aebProps, setscheduler_retry_grp90aebProps}= useContext(TotalContext) as TotalContextProps  
  const {ownership_ststus_grp32249, setownership_ststus_grp32249}= useContext(TotalContext) as TotalContextProps  
  const {ownership_ststus_grp32249Props, setownership_ststus_grp32249Props}= useContext(TotalContext) as TotalContextProps  
  const {last_run_grpa6d98, setlast_run_grpa6d98}= useContext(TotalContext) as TotalContextProps  
  const {last_run_grpa6d98Props, setlast_run_grpa6d98Props}= useContext(TotalContext) as TotalContextProps  
  const {text8f594, settext8f594}= useContext(TotalContext) as TotalContextProps  
  const {last_run_onb3b55, setlast_run_onb3b55}= useContext(TotalContext) as TotalContextProps  
  const {last_run_status420cc, setlast_run_status420cc}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions2cac6, setdynamicactions2cac6}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions2cac6Props, setdynamicactions2cac6Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addIntegrationSource_v1:{...pre?.addIntegrationSource_v1,last_run_on:undefined}}));
  if (!date) {
    setlast_run_grpa6d98((prev: any) => ({ ...prev, last_run_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setlast_run_grpa6d98((prev: any) => ({ ...prev, last_run_on: isoDate }))
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
        "e24265618ba2455f8ac1b291e7ea6d98",
        "fca273053c6c4555b3f02c2f148b3b55"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_group'] = add_group9cddc,
    codeStates['setadd_group'] = setadd_group9cddc,
    codeStates['add_group9cddc'] = add_group9cddcProps,
    codeStates['setadd_group9cddc'] = setadd_group9cddcProps,
    codeStates['source_details_grp'] = source_details_grp23dfd,
    codeStates['setsource_details_grp'] = setsource_details_grp23dfd,
    codeStates['source_details_grp23dfd'] = source_details_grp23dfdProps,
    codeStates['setsource_details_grp23dfd'] = setsource_details_grp23dfdProps,
    codeStates['connect_group'] = connect_group3616a,
    codeStates['setconnect_group'] = setconnect_group3616a,
    codeStates['connect_group3616a'] = connect_group3616aProps,
    codeStates['setconnect_group3616a'] = setconnect_group3616aProps,
    codeStates['scheduler_retry_grp'] = scheduler_retry_grp90aeb,
    codeStates['setscheduler_retry_grp'] = setscheduler_retry_grp90aeb,
    codeStates['scheduler_retry_grp90aeb'] = scheduler_retry_grp90aebProps,
    codeStates['setscheduler_retry_grp90aeb'] = setscheduler_retry_grp90aebProps,
    codeStates['ownership_ststus_grp'] = ownership_ststus_grp32249,
    codeStates['setownership_ststus_grp'] = setownership_ststus_grp32249,
    codeStates['ownership_ststus_grp32249'] = ownership_ststus_grp32249Props,
    codeStates['setownership_ststus_grp32249'] = setownership_ststus_grp32249Props,
    codeStates['last_run_grp'] = last_run_grpa6d98,
    codeStates['setlast_run_grp'] = setlast_run_grpa6d98,
    codeStates['last_run_grpa6d98'] = last_run_grpa6d98Props,
    codeStates['setlast_run_grpa6d98'] = setlast_run_grpa6d98Props,
    codeStates['text'] = text8f594,
    codeStates['settext'] = settext8f594,
    codeStates['last_run_on'] = last_run_onb3b55,
    codeStates['setlast_run_on'] = setlast_run_onb3b55,
    codeStates['last_run_status'] = last_run_status420cc,
    codeStates['setlast_run_status'] = setlast_run_status420cc,
    codeStates['dynamicactions'] = dynamicactions2cac6,
    codeStates['setdynamicactions'] = setdynamicactions2cac6,
    codeStates['dynamicactions2cac6'] = dynamicactions2cac6Props,
    codeStates['setdynamicactions2cac6'] = setdynamicactions2cac6Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setlast_run_grpa6d98Props((pre:any)=>({...pre,validation:true}))
 },[last_run_onb3b55?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (last_run_onb3b55?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 14`,gridRow: `10 / 22`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={last_run_grpa6d98?.last_run_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {last_run_onb3b55?.isDisabled ? true : false}
      disabled= {last_run_onb3b55?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Last Run On"
      dateValidation=""
      validationState={validate?.addIntegrationSource_v1?.last_run_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerlast_run_on
