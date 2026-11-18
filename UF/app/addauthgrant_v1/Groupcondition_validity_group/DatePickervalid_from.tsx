

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
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
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickervalid_from = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
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
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps  
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps  
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps  
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps  
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps  
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps  
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps  
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps  
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps  
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps  
  const {conditions_validity_txt8e17b, setconditions_validity_txt8e17b}= useContext(TotalContext) as TotalContextProps  
  const {conditionsc0116, setconditionsc0116}= useContext(TotalContext) as TotalContextProps  
  const {valid_from4be71, setvalid_from4be71}= useContext(TotalContext) as TotalContextProps  
  const {valid_tod383c, setvalid_tod383c}= useContext(TotalContext) as TotalContextProps  
  const {status98447, setstatus98447}= useContext(TotalContext) as TotalContextProps  
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps  
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addAuthGrant_v1:{...pre?.addAuthGrant_v1,valid_from:undefined}}));
  if (!date) {
    setcondition_validity_group3e45f((prev: any) => ({ ...prev, valid_from: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcondition_validity_group3e45f((prev: any) => ({ ...prev, valid_from: isoDate }))
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
        "c19310158cbdbaaf77c7ca2db763e45f",
        "dc6e795659b247aa9d9f587f2ea4be71"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
    codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
    codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
    codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
    codeStates['revocat_info_group'] = revocat_info_group2037f,
    codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
    codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
    codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
    codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
    codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
    codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
    codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
    codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
    codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
    codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
    codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
    codeStates['condition_validity_group'] = condition_validity_group3e45f,
    codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
    codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
    codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
    codeStates['conditions_validity_txt'] = conditions_validity_txt8e17b,
    codeStates['setconditions_validity_txt'] = setconditions_validity_txt8e17b,
    codeStates['conditions'] = conditionsc0116,
    codeStates['setconditions'] = setconditionsc0116,
    codeStates['valid_from'] = valid_from4be71,
    codeStates['setvalid_from'] = setvalid_from4be71,
    codeStates['valid_to'] = valid_tod383c,
    codeStates['setvalid_to'] = setvalid_tod383c,
    codeStates['status'] = status98447,
    codeStates['setstatus'] = setstatus98447,
    codeStates['certification_group'] = certification_group91bfd,
    codeStates['setcertification_group'] = setcertification_group91bfd,
    codeStates['certification_group91bfd'] = certification_group91bfdProps,
    codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
    codeStates['dynamicactions'] = dynamicactions401a9,
    codeStates['setdynamicactions'] = setdynamicactions401a9,
    codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
    codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setcondition_validity_group3e45fProps((pre:any)=>({...pre,validation:true}))
 },[valid_from4be71?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (valid_from4be71?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={condition_validity_group3e45f?.valid_from}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {valid_from4be71?.isDisabled ? true : false}
      disabled= {valid_from4be71?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Valid From"
      dateValidation=""
      validationState={validate?.addAuthGrant_v1?.valid_from ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalid_from
