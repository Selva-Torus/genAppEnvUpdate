

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


const DatePickerend_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps  
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps  
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps  
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps  
  const {review_period848bb, setreview_period848bb}= useContext(TotalContext) as TotalContextProps  
  const {start_dated9832, setstart_dated9832}= useContext(TotalContext) as TotalContextProps  
  const {end_date18250, setend_date18250}= useContext(TotalContext) as TotalContextProps  
  const {review_frequency1d4fa, setreview_frequency1d4fa}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


          const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'))

const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,end_date: "invalid"}}))
    setvalid_group35ad5((prev: any) => ({ ...prev, end_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,end_date:undefined}}));
  if (!date) {
    setvalid_group35ad5((prev: any) => ({ ...prev, end_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalid_group35ad5((prev: any) => ({ ...prev, end_date: isoDate }))
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
      if(valid_group35ad5?.end_date == "" || valid_group35ad5?.end_date == undefined){
        const result = v.safeParse(schema, valid_group35ad5?.end_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,viewPerformanceCycle_v1:{...pre?.viewPerformanceCycle_v1,end_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "41276bf255eaf4639feec6d920c35ad5",
        "3be843daf9da7109bbafe28ca5e18250"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_groupc1763,
    codeStates['setnew_access_group'] = setnew_access_groupc1763,
    codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
    codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
    codeStates['access_req__group'] = access_req__group70ea9,
    codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
    codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
    codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
    codeStates['valid_group'] = valid_group35ad5,
    codeStates['setvalid_group'] = setvalid_group35ad5,
    codeStates['valid_group35ad5'] = valid_group35ad5Props,
    codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
    codeStates['review_period'] = review_period848bb,
    codeStates['setreview_period'] = setreview_period848bb,
    codeStates['start_date'] = start_dated9832,
    codeStates['setstart_date'] = setstart_dated9832,
    codeStates['end_date'] = end_date18250,
    codeStates['setend_date'] = setend_date18250,
    codeStates['review_frequency'] = review_frequency1d4fa,
    codeStates['setreview_frequency'] = setreview_frequency1d4fa,
    codeStates['business_just__group'] = business_just__group2db99,
    codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
    codeStates['business_just__group2db99'] = business_just__group2db99Props,
    codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalid_group35ad5Props((pre:any)=>({...pre,validation:true,required:true}))
 },[end_date18250?.refresh])

useEffect(()=>{
  if(!valid_group35ad5?.end_date){ 
    setvalid_group35ad5Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (end_date18250?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={valid_group35ad5?.end_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {end_date18250?.isDisabled ? true : false}
      disabled= {end_date18250?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="End Date"
      dateValidation=""
      validationState={validate?.viewPerformanceCycle_v1?.end_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerend_date
