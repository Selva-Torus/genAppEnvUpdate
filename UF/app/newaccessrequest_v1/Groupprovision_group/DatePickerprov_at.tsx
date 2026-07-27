

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
  const {new_access_group1e8f3, setnew_access_group1e8f3}= useContext(TotalContext) as TotalContextProps  
  const {new_access_group1e8f3Props, setnew_access_group1e8f3Props}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group3a221, setaccess_req__group3a221}= useContext(TotalContext) as TotalContextProps  
  const {access_req__group3a221Props, setaccess_req__group3a221Props}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps  
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupec21c, setvalid_groupec21c}= useContext(TotalContext) as TotalContextProps  
  const {valid_groupec21cProps, setvalid_groupec21cProps}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_groupea43d, setapp_inf_groupea43d}= useContext(TotalContext) as TotalContextProps  
  const {app_inf_groupea43dProps, setapp_inf_groupea43dProps}= useContext(TotalContext) as TotalContextProps  
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps  
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps  
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps  
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps  
  const {provisioning_status57594, setprovisioning_status57594}= useContext(TotalContext) as TotalContextProps  
  const {prov_at1806a, setprov_at1806a}= useContext(TotalContext) as TotalContextProps  
  const {provisioning_referenced433b, setprovisioning_referenced433b}= useContext(TotalContext) as TotalContextProps  
  const {ticket_reference0daa0, setticket_reference0daa0}= useContext(TotalContext) as TotalContextProps  
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps  
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps  
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps  
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,newAccessRequest_v1:{...pre?.newAccessRequest_v1,provisioned_at:undefined}}));
  if (!date) {
    setprovision_group4e2a2((prev: any) => ({ ...prev, provisioned_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setprovision_group4e2a2((prev: any) => ({ ...prev, provisioned_at: isoDate }))
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
        "a03f43d59623a24f595dce6a88b4e2a2",
        "f02e146b81a05a84f1c508b2b871806a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_access_group'] = new_access_group1e8f3,
    codeStates['setnew_access_group'] = setnew_access_group1e8f3,
    codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
    codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
    codeStates['access_req__group'] = access_req__group3a221,
    codeStates['setaccess_req__group'] = setaccess_req__group3a221,
    codeStates['access_req__group3a221'] = access_req__group3a221Props,
    codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
    codeStates['business_just__group'] = business_just__group75edc,
    codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
    codeStates['business_just__group75edc'] = business_just__group75edcProps,
    codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
    codeStates['valid_group'] = valid_groupec21c,
    codeStates['setvalid_group'] = setvalid_groupec21c,
    codeStates['valid_groupec21c'] = valid_groupec21cProps,
    codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
    codeStates['app_inf_group'] = app_inf_groupea43d,
    codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
    codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
    codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
    codeStates['provision_group'] = provision_group4e2a2,
    codeStates['setprovision_group'] = setprovision_group4e2a2,
    codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
    codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
    codeStates['prov_group'] = prov_group3b4eb,
    codeStates['setprov_group'] = setprov_group3b4eb,
    codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
    codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
    codeStates['provisioning_status'] = provisioning_status57594,
    codeStates['setprovisioning_status'] = setprovisioning_status57594,
    codeStates['prov_at'] = prov_at1806a,
    codeStates['setprov_at'] = setprov_at1806a,
    codeStates['provisioning_reference'] = provisioning_referenced433b,
    codeStates['setprovisioning_reference'] = setprovisioning_referenced433b,
    codeStates['ticket_reference'] = ticket_reference0daa0,
    codeStates['setticket_reference'] = setticket_reference0daa0,
    codeStates['revocation_group'] = revocation_groupc3044,
    codeStates['setrevocation_group'] = setrevocation_groupc3044,
    codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
    codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
    codeStates['rev_group'] = rev_groupa6a87,
    codeStates['setrev_group'] = setrev_groupa6a87,
    codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
    codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
    codeStates['audit_group'] = audit_groupc16c3,
    codeStates['setaudit_group'] = setaudit_groupc16c3,
    codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
    codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
    codeStates['dynamicactions'] = dynamicactions820e8,
    codeStates['setdynamicactions'] = setdynamicactions820e8,
    codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
    codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setprovision_group4e2a2Props((pre:any)=>({...pre,validation:true}))
 },[prov_at1806a?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (prov_at1806a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={provision_group4e2a2?.provisioned_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {prov_at1806a?.isDisabled ? true : false}
      disabled= {prov_at1806a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Provisioned At"
      dateValidation=""
      validationState={validate?.newAccessRequest_v1?.provisioned_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerprov_at
