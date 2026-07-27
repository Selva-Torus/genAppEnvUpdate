

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


const DatePickerrevok_at = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {revoked_byfe056, setrevoked_byfe056}= useContext(TotalContext) as TotalContextProps  
  const {revok_atdf48b, setrevok_atdf48b}= useContext(TotalContext) as TotalContextProps  
  const {revoked_reason86407, setrevoked_reason86407}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,revoked_at:undefined}}));
  if (!date) {
    setrevocation_groupbee08((prev: any) => ({ ...prev, revoked_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrevocation_groupbee08((prev: any) => ({ ...prev, revoked_at: isoDate }))
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
        "014b84d6884d2b1d1ff85b64e4bbee08",
        "1b36f945269e8a5c80dfca666bddf48b"
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
    codeStates['revoked_by'] = revoked_byfe056,
    codeStates['setrevoked_by'] = setrevoked_byfe056,
    codeStates['revok_at'] = revok_atdf48b,
    codeStates['setrevok_at'] = setrevok_atdf48b,
    codeStates['revoked_reason'] = revoked_reason86407,
    codeStates['setrevoked_reason'] = setrevoked_reason86407,
    codeStates['audit_group'] = audit_groupdea6a,
    codeStates['setaudit_group'] = setaudit_groupdea6a,
    codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
    codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrevocation_groupbee08Props((pre:any)=>({...pre,validation:true}))
 },[revok_atdf48b?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (revok_atdf48b?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={revocation_groupbee08?.revoked_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {revok_atdf48b?.isDisabled ? true : false}
      disabled= {revok_atdf48b?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Revoked At"
      dateValidation=""
      validationState={validate?.viewAccessRequest_v1?.revoked_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerrevok_at
