

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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickereffective_to = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps  
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps  
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps  
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps  
  const {text_26f93c, settext_26f93c}= useContext(TotalContext) as TotalContextProps  
  const {validity_months29fbf, setvalidity_months29fbf}= useContext(TotalContext) as TotalContextProps  
  const {effective_from9832b, seteffective_from9832b}= useContext(TotalContext) as TotalContextProps  
  const {effective_to1ba20, seteffective_to1ba20}= useContext(TotalContext) as TotalContextProps  
  const {is_active8acbf, setis_active8acbf}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addCertificateTemplate_v1:{...pre?.addCertificateTemplate_v1,effective_to:undefined}}));
  if (!date) {
    setadditional_info_group23860((prev: any) => ({ ...prev, effective_to: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setadditional_info_group23860((prev: any) => ({ ...prev, effective_to: isoDate }))
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
        "da4538aa9fab4d87a1d0b9ee7df23860",
        "64f3e2a68bbe482a88f9c0d27d31ba20"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = groupb224b,
    codeStates['setgroup'] = setgroupb224b,
    codeStates['groupb224b'] = groupb224bProps,
    codeStates['setgroupb224b'] = setgroupb224bProps,
    codeStates['template_detail_group'] = template_detail_groupec16d,
    codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
    codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
    codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
    codeStates['additional_info_group'] = additional_info_group23860,
    codeStates['setadditional_info_group'] = setadditional_info_group23860,
    codeStates['additional_info_group23860'] = additional_info_group23860Props,
    codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
    codeStates['text_2'] = text_26f93c,
    codeStates['settext_2'] = settext_26f93c,
    codeStates['validity_months'] = validity_months29fbf,
    codeStates['setvalidity_months'] = setvalidity_months29fbf,
    codeStates['effective_from'] = effective_from9832b,
    codeStates['seteffective_from'] = seteffective_from9832b,
    codeStates['effective_to'] = effective_to1ba20,
    codeStates['seteffective_to'] = seteffective_to1ba20,
    codeStates['is_active'] = is_active8acbf,
    codeStates['setis_active'] = setis_active8acbf,
    codeStates['dynamicaction'] = dynamicactionb465f,
    codeStates['setdynamicaction'] = setdynamicactionb465f,
    codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
    codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setadditional_info_group23860Props((pre:any)=>({...pre,validation:true}))
 },[effective_to1ba20?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_to1ba20?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `29 / 41`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={additional_info_group23860?.effective_to}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_to1ba20?.isDisabled ? true : false}
      disabled= {effective_to1ba20?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Effective To"
      dateValidation=""
      validationState={validate?.addCertificateTemplate_v1?.effective_to ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_to
