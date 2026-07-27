

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


const DatePickercompleted_at_datepicker = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps  
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps  
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps  
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps  
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps  
  const {completed_at_datepicker4163e, setcompleted_at_datepicker4163e}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps  
  const {review_id1f0d1, setreview_id1f0d1}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,completed_at:undefined}}));
  if (!date) {
    setnew_access_groupfa034((prev: any) => ({ ...prev, completed_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setnew_access_groupfa034((prev: any) => ({ ...prev, completed_at: isoDate }))
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
        "37cea112d9c2947958360e56f6afa034",
        "f1aaac1844ee432ba74aee329004163e"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_groupfa034,
    codeStates['setnew_access_group'] = setnew_access_groupfa034,
    codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
    codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
    codeStates['access_req__group'] = access_req__groupdb1de,
    codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
    codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
    codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
    codeStates['valid_group'] = valid_groupb4569,
    codeStates['setvalid_group'] = setvalid_groupb4569,
    codeStates['valid_groupb4569'] = valid_groupb4569Props,
    codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
    codeStates['addt__group'] = addt__group82d26,
    codeStates['setaddt__group'] = setaddt__group82d26,
    codeStates['addt__group82d26'] = addt__group82d26Props,
    codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
    codeStates['addt__dts_group'] = addt__dts_group7fd81,
    codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
    codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
    codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
    codeStates['completed_at_datepicker'] = completed_at_datepicker4163e,
    codeStates['setcompleted_at_datepicker'] = setcompleted_at_datepicker4163e,
    codeStates['dynamicactions'] = dynamicactions31354,
    codeStates['setdynamicactions'] = setdynamicactions31354,
    codeStates['dynamicactions31354'] = dynamicactions31354Props,
    codeStates['setdynamicactions31354'] = setdynamicactions31354Props,
    codeStates['review_id'] = review_id1f0d1,
    codeStates['setreview_id'] = setreview_id1f0d1,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setnew_access_groupfa034Props((pre:any)=>({...pre,validation:true}))
 },[completed_at_datepicker4163e?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (completed_at_datepicker4163e?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 5`,gridRow: `64 / 76`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={new_access_groupfa034?.completed_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {completed_at_datepicker4163e?.isDisabled ? true : false}
      disabled= {completed_at_datepicker4163e?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Completed At"
      dateValidation=""
      validationState={validate?.newPerformanceReview_v1?.completed_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickercompleted_at_datepicker
