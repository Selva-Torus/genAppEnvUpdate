

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
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps  
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps  
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps  
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps  
  const {review_periodab344, setreview_periodab344}= useContext(TotalContext) as TotalContextProps  
  const {start_date2419e, setstart_date2419e}= useContext(TotalContext) as TotalContextProps  
  const {end_date8751a, setend_date8751a}= useContext(TotalContext) as TotalContextProps  
  const {review_frequency7df15, setreview_frequency7df15}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps  
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps  
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps  
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
    setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,end_date: "invalid"}}))
    setvalid_group071c1((prev: any) => ({ ...prev, end_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,end_date:undefined}}));
  if (!date) {
    setvalid_group071c1((prev: any) => ({ ...prev, end_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalid_group071c1((prev: any) => ({ ...prev, end_date: isoDate }))
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
      if(valid_group071c1?.end_date == "" || valid_group071c1?.end_date == undefined){
        const result = v.safeParse(schema, valid_group071c1?.end_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,newPerformanceCycle_v1:{...pre?.newPerformanceCycle_v1,end_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ba03158b2f63423f78073c125eb071c1",
        "5a1cf29eda43f548f5a9ddce3488751a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_groupe9bce,
    codeStates['setnew_access_group'] = setnew_access_groupe9bce,
    codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
    codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
    codeStates['access_req__group'] = access_req__groupbdb89,
    codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
    codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
    codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
    codeStates['valid_group'] = valid_group071c1,
    codeStates['setvalid_group'] = setvalid_group071c1,
    codeStates['valid_group071c1'] = valid_group071c1Props,
    codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
    codeStates['review_period'] = review_periodab344,
    codeStates['setreview_period'] = setreview_periodab344,
    codeStates['start_date'] = start_date2419e,
    codeStates['setstart_date'] = setstart_date2419e,
    codeStates['end_date'] = end_date8751a,
    codeStates['setend_date'] = setend_date8751a,
    codeStates['review_frequency'] = review_frequency7df15,
    codeStates['setreview_frequency'] = setreview_frequency7df15,
    codeStates['business_just__group'] = business_just__group04cc1,
    codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
    codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
    codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
    codeStates['addt__group'] = addt__group284f6,
    codeStates['setaddt__group'] = setaddt__group284f6,
    codeStates['addt__group284f6'] = addt__group284f6Props,
    codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
    codeStates['dynamicactions'] = dynamicactionsd94d3,
    codeStates['setdynamicactions'] = setdynamicactionsd94d3,
    codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
    codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalid_group071c1Props((pre:any)=>({...pre,validation:true,required:true}))
 },[end_date8751a?.refresh])

useEffect(()=>{
  if(!valid_group071c1?.end_date){ 
    setvalid_group071c1Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (end_date8751a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={valid_group071c1?.end_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {end_date8751a?.isDisabled ? true : false}
      disabled= {end_date8751a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="End Date"
      dateValidation=""
      validationState={validate?.newPerformanceCycle_v1?.end_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerend_date
