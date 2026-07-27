

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


const DatePickervalid_to = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_group89009, setnew_access_group89009}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group89009Props, setnew_access_group89009Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupf6698, setaccess_req__groupf6698}= useContext(TotalContext) as TotalContextProps  
  const {access_req__groupf6698Props, setaccess_req__groupf6698Props}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group5c7fc, setbusiness_just__group5c7fc}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group5c7fcProps, setbusiness_just__group5c7fcProps}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupec09d, setvalid_groupec09d}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupec09dProps, setvalid_groupec09dProps}= useContext(TotalContext) as TotalContextProps  
  const {validity_detailsc1882, setvalidity_detailsc1882}= useContext(TotalContext) as TotalContextProps  
  const {valid_frome715b, setvalid_frome715b}= useContext(TotalContext) as TotalContextProps  
  const {valid_to87d17, setvalid_to87d17}= useContext(TotalContext) as TotalContextProps  
  const {access_review_req_switchb4f76, setaccess_review_req_switchb4f76}= useContext(TotalContext) as TotalContextProps  
  const {access_expiry_date1529d, setaccess_expiry_date1529d}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group4185e, setapp_inf_group4185e}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group4185eProps, setapp_inf_group4185eProps}= useContext(TotalContext) as TotalContextProps  
  const {approve_group6b509, setapprove_group6b509}= useContext(TotalContext) as TotalContextProps  
  const {approve_group6b509Props, setapprove_group6b509Props}= useContext(TotalContext) as TotalContextProps  
  const {provision_groupf5a52, setprovision_groupf5a52}= useContext(TotalContext) as TotalContextProps  
  const {provision_groupf5a52Props, setprovision_groupf5a52Props}= useContext(TotalContext) as TotalContextProps  
  const {prov_group33ef1, setprov_group33ef1}= useContext(TotalContext) as TotalContextProps  
  const {prov_group33ef1Props, setprov_group33ef1Props}= useContext(TotalContext) as TotalContextProps  
  const {revocation_group9c6ae, setrevocation_group9c6ae}= useContext(TotalContext) as TotalContextProps  
  const {revocation_group9c6aeProps, setrevocation_group9c6aeProps}= useContext(TotalContext) as TotalContextProps  
  const {rev_group4b1cb, setrev_group4b1cb}= useContext(TotalContext) as TotalContextProps  
  const {rev_group4b1cbProps, setrev_group4b1cbProps}= useContext(TotalContext) as TotalContextProps  
  const {audit_group270d9, setaudit_group270d9}= useContext(TotalContext) as TotalContextProps  
  const {audit_group270d9Props, setaudit_group270d9Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions51364, setdynamicactions51364}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions51364Props, setdynamicactions51364Props}= useContext(TotalContext) as TotalContextProps  
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
    setValidate((pre:any)=>({...pre,newAccessRequestApproval_v1:{...pre?.newAccessRequestApproval_v1,valid_to: "invalid"}}))
    setvalid_groupec09d((prev: any) => ({ ...prev, valid_to: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,newAccessRequestApproval_v1:{...pre?.newAccessRequestApproval_v1,valid_to:undefined}}));
  if (!date) {
    setvalid_groupec09d((prev: any) => ({ ...prev, valid_to: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalid_groupec09d((prev: any) => ({ ...prev, valid_to: isoDate }))
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
      if(valid_groupec09d?.valid_to == "" || valid_groupec09d?.valid_to == undefined){
        const result = v.safeParse(schema, valid_groupec09d?.valid_to || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,newAccessRequestApproval_v1:{...pre?.newAccessRequestApproval_v1,valid_to: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0978f5fda842dbcc33deca2bea7ec09d",
        "4abaa7d7c29a1e2ed4ab7a942f787d17"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group89009,
    codeStates['setnew_access_group'] = setnew_access_group89009,
    codeStates['new_access_group89009'] = new_access_group89009Props,
    codeStates['setnew_access_group89009'] = setnew_access_group89009Props,
    codeStates['access_req__group'] = access_req__groupf6698,
    codeStates['setaccess_req__group'] = setaccess_req__groupf6698,
    codeStates['access_req__groupf6698'] = access_req__groupf6698Props,
    codeStates['setaccess_req__groupf6698'] = setaccess_req__groupf6698Props,
    codeStates['business_just__group'] = business_just__group5c7fc,
    codeStates['setbusiness_just__group'] = setbusiness_just__group5c7fc,
    codeStates['business_just__group5c7fc'] = business_just__group5c7fcProps,
    codeStates['setbusiness_just__group5c7fc'] = setbusiness_just__group5c7fcProps,
    codeStates['valid_group'] = valid_groupec09d,
    codeStates['setvalid_group'] = setvalid_groupec09d,
    codeStates['valid_groupec09d'] = valid_groupec09dProps,
    codeStates['setvalid_groupec09d'] = setvalid_groupec09dProps,
    codeStates['validity_details'] = validity_detailsc1882,
    codeStates['setvalidity_details'] = setvalidity_detailsc1882,
    codeStates['valid_from'] = valid_frome715b,
    codeStates['setvalid_from'] = setvalid_frome715b,
    codeStates['valid_to'] = valid_to87d17,
    codeStates['setvalid_to'] = setvalid_to87d17,
    codeStates['access_review_req_switch'] = access_review_req_switchb4f76,
    codeStates['setaccess_review_req_switch'] = setaccess_review_req_switchb4f76,
    codeStates['access_expiry_date'] = access_expiry_date1529d,
    codeStates['setaccess_expiry_date'] = setaccess_expiry_date1529d,
    codeStates['app_inf_group'] = app_inf_group4185e,
    codeStates['setapp_inf_group'] = setapp_inf_group4185e,
    codeStates['app_inf_group4185e'] = app_inf_group4185eProps,
    codeStates['setapp_inf_group4185e'] = setapp_inf_group4185eProps,
    codeStates['approve_group'] = approve_group6b509,
    codeStates['setapprove_group'] = setapprove_group6b509,
    codeStates['approve_group6b509'] = approve_group6b509Props,
    codeStates['setapprove_group6b509'] = setapprove_group6b509Props,
    codeStates['provision_group'] = provision_groupf5a52,
    codeStates['setprovision_group'] = setprovision_groupf5a52,
    codeStates['provision_groupf5a52'] = provision_groupf5a52Props,
    codeStates['setprovision_groupf5a52'] = setprovision_groupf5a52Props,
    codeStates['prov_group'] = prov_group33ef1,
    codeStates['setprov_group'] = setprov_group33ef1,
    codeStates['prov_group33ef1'] = prov_group33ef1Props,
    codeStates['setprov_group33ef1'] = setprov_group33ef1Props,
    codeStates['revocation_group'] = revocation_group9c6ae,
    codeStates['setrevocation_group'] = setrevocation_group9c6ae,
    codeStates['revocation_group9c6ae'] = revocation_group9c6aeProps,
    codeStates['setrevocation_group9c6ae'] = setrevocation_group9c6aeProps,
    codeStates['rev_group'] = rev_group4b1cb,
    codeStates['setrev_group'] = setrev_group4b1cb,
    codeStates['rev_group4b1cb'] = rev_group4b1cbProps,
    codeStates['setrev_group4b1cb'] = setrev_group4b1cbProps,
    codeStates['audit_group'] = audit_group270d9,
    codeStates['setaudit_group'] = setaudit_group270d9,
    codeStates['audit_group270d9'] = audit_group270d9Props,
    codeStates['setaudit_group270d9'] = setaudit_group270d9Props,
    codeStates['dynamicactions'] = dynamicactions51364,
    codeStates['setdynamicactions'] = setdynamicactions51364,
    codeStates['dynamicactions51364'] = dynamicactions51364Props,
    codeStates['setdynamicactions51364'] = setdynamicactions51364Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalid_groupec09dProps((pre:any)=>({...pre,validation:true,required:true}))
 },[valid_to87d17?.refresh])

useEffect(()=>{
  if(!valid_groupec09d?.valid_to){ 
    setvalid_groupec09dProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (valid_to87d17?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `9 / 17`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={valid_groupec09d?.valid_to}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {valid_to87d17?.isDisabled ? true : false}
      disabled= {valid_to87d17?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Valid To"
      dateValidation=""
      validationState={validate?.newAccessRequestApproval_v1?.valid_to ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalid_to
