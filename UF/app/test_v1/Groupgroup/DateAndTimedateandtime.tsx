

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
  const {group7f2ed, setgroup7f2ed}= useContext(TotalContext) as TotalContextProps  
  const {group7f2edProps, setgroup7f2edProps}= useContext(TotalContext) as TotalContextProps  
  const {textinputd0435, settextinputd0435}= useContext(TotalContext) as TotalContextProps  
  const {textinput5daae3, settextinput5daae3}= useContext(TotalContext) as TotalContextProps  
  const {dateandtimec481e, setdateandtimec481e}= useContext(TotalContext) as TotalContextProps  
  const {datepicker019ca, setdatepicker019ca}= useContext(TotalContext) as TotalContextProps  
  const {textinput165d1d, settextinput165d1d}= useContext(TotalContext) as TotalContextProps  
  const {textinput204f11, settextinput204f11}= useContext(TotalContext) as TotalContextProps  
  const {textinput38ac83, settextinput38ac83}= useContext(TotalContext) as TotalContextProps  
  const {textinput455cca, settextinput455cca}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];



  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0); // Set to midnight (start of today)
  yesterday.setDate(yesterday.getDate() ); // Move back to yesterday
    const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'),v.transform((value) => new Date(value)),v.date(),v.maxValue(yesterday, 'Date must be in the past'))
const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,dateandtime: "invalid"}}))
    setgroup7f2ed((prev: any) => ({ ...prev, dateandtime: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,dateandtime:undefined}}));
  if (!date) {
    setgroup7f2ed((prev: any) => ({ ...prev, dateandtime: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setgroup7f2ed((prev: any) => ({ ...prev, dateandtime: isoDate }))
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
    if(group7f2ed?.dateandtime == "" || group7f2ed?.dateandtime == undefined){
    group7f2ed.dateandtime = "";
    const validate:any = v.safeParse(schema, group7f2ed?.dateandtime);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,dateandtime:"invalid"}}))
    }else{
    setError('')
    setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,dateandtime:undefined}  }))
    }
    }else if(group7f2ed?.dateandtime !== ""){
      const validate:any = v.safeParse(schema, group7f2ed?.dateandtime);  
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,dateandtime: "invalid"}}));
      }
    }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "aaa21094dc8b49d0be2621f7ea87f2ed",
        "957d096de49947be9bdae5b269dc481e"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = group7f2ed,
    codeStates['setgroup'] = setgroup7f2ed,
    codeStates['group7f2ed'] = group7f2edProps,
    codeStates['setgroup7f2ed'] = setgroup7f2edProps,
    codeStates['textinput'] = textinputd0435,
    codeStates['settextinput'] = settextinputd0435,
    codeStates['textinput5'] = textinput5daae3,
    codeStates['settextinput5'] = settextinput5daae3,
    codeStates['dateandtime'] = dateandtimec481e,
    codeStates['setdateandtime'] = setdateandtimec481e,
    codeStates['datepicker'] = datepicker019ca,
    codeStates['setdatepicker'] = setdatepicker019ca,
    codeStates['textinput1'] = textinput165d1d,
    codeStates['settextinput1'] = settextinput165d1d,
    codeStates['textinput2'] = textinput204f11,
    codeStates['settextinput2'] = settextinput204f11,
    codeStates['textinput3'] = textinput38ac83,
    codeStates['settextinput3'] = settextinput38ac83,
    codeStates['textinput4'] = textinput455cca,
    codeStates['settextinput4'] = settextinput455cca,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroup7f2edProps((pre:any)=>({...pre,validation:true,required:true}))
 },[dateandtimec481e?.refresh])

useEffect(()=>{
  if(!group7f2ed?.dateandtime){ 
    setgroup7f2edProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])

if (dateandtimec481e?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `14 / 19`,gridRow: `6 / 24`, gap:``, height: `100%`, overflow: 'visible'}} >
        {<span style={{ color: 'red' }}>*</span>}
    <DateAndTime
      className=""
      //label={keyset("dateandtime")}
      value={group7f2ed?.dateandtime}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {dateandtimec481e?.isDisabled ? true : false}
      disabled= {dateandtimec481e?.isDisabled ? true : false}
      contentAlign={"center"}
      validationState={validate?.ffff_v1?.dateandtime ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdateandtime
