

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
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickertran_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232}= useContext(TotalContext) as TotalContextProps  
  const {cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props}= useContext(TotalContext) as TotalContextProps  
  const {cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44}= useContext(TotalContext) as TotalContextProps  
  const {cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props}= useContext(TotalContext) as TotalContextProps  
  const {tran_date5d7c0, settran_date5d7c0}= useContext(TotalContext) as TotalContextProps  
  const {message_code5df7d, setmessage_code5df7d}= useContext(TotalContext) as TotalContextProps  
  const {cancel_reason1d34e, setcancel_reason1d34e}= useContext(TotalContext) as TotalContextProps  
  const {reason_description5420a, setreason_description5420a}= useContext(TotalContext) as TotalContextProps  
  const {cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a}= useContext(TotalContext) as TotalContextProps  
  const {cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,nfCancelRequestCamt055_v1:{...pre?.nfCancelRequestCamt055_v1,tran_date:undefined}}));
  if (!date) {
    setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, tran_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcancelrequestcamt055subgroup5ac44((prev: any) => ({ ...prev, tran_date: isoDate }))
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
        "489dfdfd3c6b26ca7c134bfeb3e5ac44",
        "a03a640b6cf04952a55247044d35d7c0"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
    codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
    codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
    codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
    codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
    codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
    codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
    codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
    codeStates['tran_date'] = tran_date5d7c0,
    codeStates['settran_date'] = settran_date5d7c0,
    codeStates['message_code'] = message_code5df7d,
    codeStates['setmessage_code'] = setmessage_code5df7d,
    codeStates['cancel_reason'] = cancel_reason1d34e,
    codeStates['setcancel_reason'] = setcancel_reason1d34e,
    codeStates['reason_description'] = reason_description5420a,
    codeStates['setreason_description'] = setreason_description5420a,
    codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
    codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
    codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
    codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!cancelrequestcamt055subgroup5ac44?.tran_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setcancelrequestcamt055subgroup5ac44((pre:any)=>({...pre,tran_date:indiaToday.toISOString()}))
    }
  setcancelrequestcamt055subgroup5ac44Props((pre:any)=>({...pre,validation:true}))
 },[tran_date5d7c0?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (tran_date5d7c0?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `1 / 15`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("")}
      value={cancelrequestcamt055subgroup5ac44?.tran_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {tran_date5d7c0?.isDisabled ? true : false}
      disabled={ true }
      contentAlign={"center"}
      headerPosition='top'
      headerText="Date"
      dateValidation=""
      validationState={validate?.nfCancelRequestCamt055_v1?.tran_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickertran_date
