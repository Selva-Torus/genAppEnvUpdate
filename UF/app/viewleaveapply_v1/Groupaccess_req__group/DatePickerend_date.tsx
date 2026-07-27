

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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps  
  const {leave_req_detailsf2bd7, setleave_req_detailsf2bd7}= useContext(TotalContext) as TotalContextProps  
  const {leave_request_numberb0948, setleave_request_numberb0948}= useContext(TotalContext) as TotalContextProps  
  const {full_namedebbe, setfull_namedebbe}= useContext(TotalContext) as TotalContextProps  
  const {policy_name67103, setpolicy_name67103}= useContext(TotalContext) as TotalContextProps  
  const {leave_reason_categorya15ad, setleave_reason_categorya15ad}= useContext(TotalContext) as TotalContextProps  
  const {emergency_leave_checkbox63f2e, setemergency_leave_checkbox63f2e}= useContext(TotalContext) as TotalContextProps  
  const {start_date8bb1a, setstart_date8bb1a}= useContext(TotalContext) as TotalContextProps  
  const {end_datea8b1a, setend_datea8b1a}= useContext(TotalContext) as TotalContextProps  
  const {days_requested4683c, setdays_requested4683c}= useContext(TotalContext) as TotalContextProps  
  const {half_day_switch96651, sethalf_day_switch96651}= useContext(TotalContext) as TotalContextProps  
  const {haf_day_session61b96, sethaf_day_session61b96}= useContext(TotalContext) as TotalContextProps  
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps  
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps  
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps  
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps  
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps  
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps  
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps  
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps  
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewLeaveApply_v1:{...pre?.viewLeaveApply_v1,end_date:undefined}}));
  if (!date) {
    setaccess_req__group578e5((prev: any) => ({ ...prev, end_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setaccess_req__group578e5((prev: any) => ({ ...prev, end_date: isoDate }))
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
        "1adc3ad97f24278a74ffd028cc8578e5",
        "4ac0f283b67feb181475b9fa352a8b1a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group8a441,
    codeStates['setnew_access_group'] = setnew_access_group8a441,
    codeStates['new_access_group8a441'] = new_access_group8a441Props,
    codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
    codeStates['access_req__group'] = access_req__group578e5,
    codeStates['setaccess_req__group'] = setaccess_req__group578e5,
    codeStates['access_req__group578e5'] = access_req__group578e5Props,
    codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
    codeStates['leave_req_details'] = leave_req_detailsf2bd7,
    codeStates['setleave_req_details'] = setleave_req_detailsf2bd7,
    codeStates['leave_request_number'] = leave_request_numberb0948,
    codeStates['setleave_request_number'] = setleave_request_numberb0948,
    codeStates['full_name'] = full_namedebbe,
    codeStates['setfull_name'] = setfull_namedebbe,
    codeStates['policy_name'] = policy_name67103,
    codeStates['setpolicy_name'] = setpolicy_name67103,
    codeStates['leave_reason_category'] = leave_reason_categorya15ad,
    codeStates['setleave_reason_category'] = setleave_reason_categorya15ad,
    codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox63f2e,
    codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox63f2e,
    codeStates['start_date'] = start_date8bb1a,
    codeStates['setstart_date'] = setstart_date8bb1a,
    codeStates['end_date'] = end_datea8b1a,
    codeStates['setend_date'] = setend_datea8b1a,
    codeStates['days_requested'] = days_requested4683c,
    codeStates['setdays_requested'] = setdays_requested4683c,
    codeStates['half_day_switch'] = half_day_switch96651,
    codeStates['sethalf_day_switch'] = sethalf_day_switch96651,
    codeStates['haf_day_session'] = haf_day_session61b96,
    codeStates['sethaf_day_session'] = sethaf_day_session61b96,
    codeStates['emp_avail_group'] = emp_avail_groupeb48f,
    codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
    codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
    codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
    codeStates['leave_balance_group'] = leave_balance_group98af0,
    codeStates['setleave_balance_group'] = setleave_balance_group98af0,
    codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
    codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
    codeStates['app_det_group'] = app_det_group5b97e,
    codeStates['setapp_det_group'] = setapp_det_group5b97e,
    codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
    codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
    codeStates['approve_group'] = approve_group4d845,
    codeStates['setapprove_group'] = setapprove_group4d845,
    codeStates['approve_group4d845'] = approve_group4d845Props,
    codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
    codeStates['audit_group'] = audit_group2b7ff,
    codeStates['setaudit_group'] = setaudit_group2b7ff,
    codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
    codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setaccess_req__group578e5Props((pre:any)=>({...pre,validation:true}))
 },[end_datea8b1a?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (end_datea8b1a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `6 / 11`,gridRow: `20 / 32`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={access_req__group578e5?.end_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {end_datea8b1a?.isDisabled ? true : false}
      disabled= {end_datea8b1a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="End Date"
      dateValidation=""
      validationState={validate?.viewLeaveApply_v1?.end_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerend_date
