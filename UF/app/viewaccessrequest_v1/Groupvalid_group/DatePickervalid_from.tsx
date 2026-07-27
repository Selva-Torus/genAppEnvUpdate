

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


const DatePickervalid_from = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps  
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps  
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps  
  const {validity_detailsb5ad1, setvalidity_detailsb5ad1}= useContext(TotalContext) as TotalContextProps  
  const {valid_frombddd6, setvalid_frombddd6}= useContext(TotalContext) as TotalContextProps  
  const {valid_toe6a41, setvalid_toe6a41}= useContext(TotalContext) as TotalContextProps  
  const {access_review_req_switch0077c, setaccess_review_req_switch0077c}= useContext(TotalContext) as TotalContextProps  
  const {access_expiry_dateea669, setaccess_expiry_dateea669}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps  
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps  
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps  
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps  
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps  
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps  
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps  
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps  
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps  
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
    setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,valid_from: "invalid"}}))
    setvalid_group6c83b((prev: any) => ({ ...prev, valid_from: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,valid_from:undefined}}));
  if (!date) {
    setvalid_group6c83b((prev: any) => ({ ...prev, valid_from: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalid_group6c83b((prev: any) => ({ ...prev, valid_from: isoDate }))
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
      if(valid_group6c83b?.valid_from == "" || valid_group6c83b?.valid_from == undefined){
        const result = v.safeParse(schema, valid_group6c83b?.valid_from || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,valid_from: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ecdca46e9d19ee2b6c057cc5e626c83b",
        "7f16d5ce93ad91352fd4af32cf1bddd6"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group99475,
    codeStates['setnew_access_group'] = setnew_access_group99475,
    codeStates['new_access_group99475'] = new_access_group99475Props,
    codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
    codeStates['access_req__group'] = access_req__group580cf,
    codeStates['setaccess_req__group'] = setaccess_req__group580cf,
    codeStates['access_req__group580cf'] = access_req__group580cfProps,
    codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
    codeStates['business_just__group'] = business_just__group2c68d,
    codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
    codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
    codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
    codeStates['valid_group'] = valid_group6c83b,
    codeStates['setvalid_group'] = setvalid_group6c83b,
    codeStates['valid_group6c83b'] = valid_group6c83bProps,
    codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
    codeStates['validity_details'] = validity_detailsb5ad1,
    codeStates['setvalidity_details'] = setvalidity_detailsb5ad1,
    codeStates['valid_from'] = valid_frombddd6,
    codeStates['setvalid_from'] = setvalid_frombddd6,
    codeStates['valid_to'] = valid_toe6a41,
    codeStates['setvalid_to'] = setvalid_toe6a41,
    codeStates['access_review_req_switch'] = access_review_req_switch0077c,
    codeStates['setaccess_review_req_switch'] = setaccess_review_req_switch0077c,
    codeStates['access_expiry_date'] = access_expiry_dateea669,
    codeStates['setaccess_expiry_date'] = setaccess_expiry_dateea669,
    codeStates['app_inf_group'] = app_inf_group5ad5c,
    codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
    codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
    codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
    codeStates['provision_group'] = provision_groupe166a,
    codeStates['setprovision_group'] = setprovision_groupe166a,
    codeStates['provision_groupe166a'] = provision_groupe166aProps,
    codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
    codeStates['prov_group'] = prov_groupce05f,
    codeStates['setprov_group'] = setprov_groupce05f,
    codeStates['prov_groupce05f'] = prov_groupce05fProps,
    codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
    codeStates['revocation_group'] = revocation_groupbee08,
    codeStates['setrevocation_group'] = setrevocation_groupbee08,
    codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
    codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
    codeStates['rev_group'] = rev_group1cf92,
    codeStates['setrev_group'] = setrev_group1cf92,
    codeStates['rev_group1cf92'] = rev_group1cf92Props,
    codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
    codeStates['audit_group'] = audit_groupdea6a,
    codeStates['setaudit_group'] = setaudit_groupdea6a,
    codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
    codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalid_group6c83bProps((pre:any)=>({...pre,validation:true,required:true}))
 },[valid_frombddd6?.refresh])

useEffect(()=>{
  if(!valid_group6c83b?.valid_from){ 
    setvalid_group6c83bProps((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (valid_frombddd6?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={valid_group6c83b?.valid_from}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {valid_frombddd6?.isDisabled ? true : false}
      disabled= {valid_frombddd6?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Valid From"
      dateValidation=""
      validationState={validate?.viewAccessRequest_v1?.valid_from ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalid_from
