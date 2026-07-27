

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


const DatePickerprov_at = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {provisioning_statusa0dcf, setprovisioning_statusa0dcf}= useContext(TotalContext) as TotalContextProps  
  const {prov_at8b178, setprov_at8b178}= useContext(TotalContext) as TotalContextProps  
  const {provisioning_reference8d6a1, setprovisioning_reference8d6a1}= useContext(TotalContext) as TotalContextProps  
  const {ticket_reference4e55b, setticket_reference4e55b}= useContext(TotalContext) as TotalContextProps  
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


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewAccessRequest_v1:{...pre?.viewAccessRequest_v1,provisioned_at:undefined}}));
  if (!date) {
    setprovision_groupe166a((prev: any) => ({ ...prev, provisioned_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setprovision_groupe166a((prev: any) => ({ ...prev, provisioned_at: isoDate }))
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
        "5f37cc88bca7ddd3a92f1469f1de166a",
        "ea33e872041f3cedb3fae46f37f8b178"
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
    codeStates['provisioning_status'] = provisioning_statusa0dcf,
    codeStates['setprovisioning_status'] = setprovisioning_statusa0dcf,
    codeStates['prov_at'] = prov_at8b178,
    codeStates['setprov_at'] = setprov_at8b178,
    codeStates['provisioning_reference'] = provisioning_reference8d6a1,
    codeStates['setprovisioning_reference'] = setprovisioning_reference8d6a1,
    codeStates['ticket_reference'] = ticket_reference4e55b,
    codeStates['setticket_reference'] = setticket_reference4e55b,
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
  setprovision_groupe166aProps((pre:any)=>({...pre,validation:true}))
 },[prov_at8b178?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (prov_at8b178?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={provision_groupe166a?.provisioned_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {prov_at8b178?.isDisabled ? true : false}
      disabled= {prov_at8b178?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Provisioned At"
      dateValidation=""
      validationState={validate?.viewAccessRequest_v1?.provisioned_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerprov_at
