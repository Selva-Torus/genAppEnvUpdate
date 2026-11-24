

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
  const {investigationresponsecamt111maingroup058ec, setinvestigationresponsecamt111maingroup058ec}= useContext(TotalContext) as TotalContextProps  
  const {investigationresponsecamt111maingroup058ecProps, setinvestigationresponsecamt111maingroup058ecProps}= useContext(TotalContext) as TotalContextProps  
  const {investigationresponsecamt111subgroupafab5, setinvestigationresponsecamt111subgroupafab5}= useContext(TotalContext) as TotalContextProps  
  const {investigationresponsecamt111subgroupafab5Props, setinvestigationresponsecamt111subgroupafab5Props}= useContext(TotalContext) as TotalContextProps  
  const {tran_date51032, settran_date51032}= useContext(TotalContext) as TotalContextProps  
  const {message_code3e093, setmessage_code3e093}= useContext(TotalContext) as TotalContextProps  
  const {response_type65b90, setresponse_type65b90}= useContext(TotalContext) as TotalContextProps  
  const {response_reason7039a, setresponse_reason7039a}= useContext(TotalContext) as TotalContextProps  
  const {reason_descriptiond33de, setreason_descriptiond33de}= useContext(TotalContext) as TotalContextProps  
  const {investigationresponsecamt111dynamicactionsceeed, setinvestigationresponsecamt111dynamicactionsceeed}= useContext(TotalContext) as TotalContextProps  
  const {investigationresponsecamt111dynamicactionsceeedProps, setinvestigationresponsecamt111dynamicactionsceeedProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,nfInvestigationResponseCamt111_v1:{...pre?.nfInvestigationResponseCamt111_v1,tran_date:undefined}}));
  if (!date) {
    setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, tran_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setinvestigationresponsecamt111subgroupafab5((prev: any) => ({ ...prev, tran_date: isoDate }))
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
        "dcf99be43c68bc746c27e738db2afab5",
        "223e7dd9bf98b8f0edf5e931d5351032"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['investigationresponsecamt111maingroup'] = investigationresponsecamt111maingroup058ec,
    codeStates['setinvestigationresponsecamt111maingroup'] = setinvestigationresponsecamt111maingroup058ec,
    codeStates['investigationresponsecamt111maingroup058ec'] = investigationresponsecamt111maingroup058ecProps,
    codeStates['setinvestigationresponsecamt111maingroup058ec'] = setinvestigationresponsecamt111maingroup058ecProps,
    codeStates['investigationresponsecamt111subgroup'] = investigationresponsecamt111subgroupafab5,
    codeStates['setinvestigationresponsecamt111subgroup'] = setinvestigationresponsecamt111subgroupafab5,
    codeStates['investigationresponsecamt111subgroupafab5'] = investigationresponsecamt111subgroupafab5Props,
    codeStates['setinvestigationresponsecamt111subgroupafab5'] = setinvestigationresponsecamt111subgroupafab5Props,
    codeStates['tran_date'] = tran_date51032,
    codeStates['settran_date'] = settran_date51032,
    codeStates['message_code'] = message_code3e093,
    codeStates['setmessage_code'] = setmessage_code3e093,
    codeStates['response_type'] = response_type65b90,
    codeStates['setresponse_type'] = setresponse_type65b90,
    codeStates['response_reason'] = response_reason7039a,
    codeStates['setresponse_reason'] = setresponse_reason7039a,
    codeStates['reason_description'] = reason_descriptiond33de,
    codeStates['setreason_description'] = setreason_descriptiond33de,
    codeStates['investigationresponsecamt111dynamicactions'] = investigationresponsecamt111dynamicactionsceeed,
    codeStates['setinvestigationresponsecamt111dynamicactions'] = setinvestigationresponsecamt111dynamicactionsceeed,
    codeStates['investigationresponsecamt111dynamicactionsceeed'] = investigationresponsecamt111dynamicactionsceeedProps,
    codeStates['setinvestigationresponsecamt111dynamicactionsceeed'] = setinvestigationresponsecamt111dynamicactionsceeedProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!investigationresponsecamt111subgroupafab5?.tran_date)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setinvestigationresponsecamt111subgroupafab5((pre:any)=>({...pre,tran_date:indiaToday.toISOString()}))
    }
  setinvestigationresponsecamt111subgroupafab5Props((pre:any)=>({...pre,validation:true}))
 },[tran_date51032?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (tran_date51032?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `1 / 15`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-lg"
      //label={keyset("")}
      value={investigationresponsecamt111subgroupafab5?.tran_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {tran_date51032?.isDisabled ? true : false}
      disabled={ true }
      contentAlign={"center"}
      headerPosition='top'
      headerText="Date"
      dateValidation=""
      validationState={validate?.nfInvestigationResponseCamt111_v1?.tran_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickertran_date
