

'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DateAndTime } from '@/components/DateAndTime';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerdateandtime = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {groupf6bcb, setgroupf6bcb}= useContext(TotalContext) as TotalContextProps  
  const {groupf6bcbProps, setgroupf6bcbProps}= useContext(TotalContext) as TotalContextProps  
  const {advancesearch6c997, setadvancesearch6c997}= useContext(TotalContext) as TotalContextProps  
  const {dateandtimeb3eda, setdateandtimeb3eda}= useContext(TotalContext) as TotalContextProps  
  const {table7d435, settable7d435}= useContext(TotalContext) as TotalContextProps  
  const {table7d435Props, settable7d435Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,advancedsearch_v1:{...pre?.advancedsearch_v1,dateandtime:undefined}}));
  if (!date) {
    setgroupf6bcb((prev: any) => ({ ...prev, dateandtime: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setgroupf6bcb((prev: any) => ({ ...prev, dateandtime: isoDate }))
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
        "62fca87896cc475fa1bcb5e25e9f6bcb",
        "18fca22eea724d7e83cc9f26f40b3eda"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = groupf6bcb,
    codeStates['setgroup'] = setgroupf6bcb,
    codeStates['groupf6bcb'] = groupf6bcbProps,
    codeStates['setgroupf6bcb'] = setgroupf6bcbProps,
    codeStates['advancesearch'] = advancesearch6c997,
    codeStates['setadvancesearch'] = setadvancesearch6c997,
    codeStates['dateandtime'] = dateandtimeb3eda,
    codeStates['setdateandtime'] = setdateandtimeb3eda,
    codeStates['table'] = table7d435,
    codeStates['settable'] = settable7d435,
    codeStates['table7d435'] = table7d435Props,
    codeStates['settable7d435'] = settable7d435Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroupf6bcbProps((pre:any)=>({...pre,validation:true}))
 },[dateandtimeb3eda?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (dateandtimeb3eda?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `16 / 21`,gridRow: `34 / 99`, gap:``, height: `100%`, overflow: 'visible'}} >
    <DateAndTime
      className=""
      //label={keyset("dateandtime")}
      value={groupf6bcb?.dateandtime}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {dateandtimeb3eda?.isDisabled ? true : false}
      disabled= {dateandtimeb3eda?.isDisabled ? true : false}
      contentAlign={"center"}
      validationState={validate?.advancedsearch_v1?.dateandtime ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdateandtime
