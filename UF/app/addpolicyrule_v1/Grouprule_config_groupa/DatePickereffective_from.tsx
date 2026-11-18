

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


const DatePickereffective_from = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps  
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps  
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps  
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps  
  const {info_rule17e81, setinfo_rule17e81}= useContext(TotalContext) as TotalContextProps  
  const {default_effectf2b26, setdefault_effectf2b26}= useContext(TotalContext) as TotalContextProps  
  const {applies_to_tiersfcfec, setapplies_to_tiersfcfec}= useContext(TotalContext) as TotalContextProps  
  const {fail_modeef857, setfail_modeef857}= useContext(TotalContext) as TotalContextProps  
  const {status696d3, setstatus696d3}= useContext(TotalContext) as TotalContextProps  
  const {test_statusacb3e, settest_statusacb3e}= useContext(TotalContext) as TotalContextProps  
  const {effective_fromc0572, seteffective_fromc0572}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addPolicyRule_v1:{...pre?.addPolicyRule_v1,effective_from:undefined}}));
  if (!date) {
    setrule_config_groupab2fc0((prev: any) => ({ ...prev, effective_from: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrule_config_groupab2fc0((prev: any) => ({ ...prev, effective_from: isoDate }))
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
        "19ed3c6d0faf4072bff82d4e059b2fc0",
        "e936907102154227828bc6ee894c0572"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['info_group'] = info_group321cd,
    codeStates['setinfo_group'] = setinfo_group321cd,
    codeStates['info_group321cd'] = info_group321cdProps,
    codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
    codeStates['group'] = group51f33,
    codeStates['setgroup'] = setgroup51f33,
    codeStates['group51f33'] = group51f33Props,
    codeStates['setgroup51f33'] = setgroup51f33Props,
    codeStates['rule_config_group'] = rule_config_group8a62a,
    codeStates['setrule_config_group'] = setrule_config_group8a62a,
    codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
    codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
    codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
    codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
    codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
    codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
    codeStates['info_rule'] = info_rule17e81,
    codeStates['setinfo_rule'] = setinfo_rule17e81,
    codeStates['default_effect'] = default_effectf2b26,
    codeStates['setdefault_effect'] = setdefault_effectf2b26,
    codeStates['applies_to_tiers'] = applies_to_tiersfcfec,
    codeStates['setapplies_to_tiers'] = setapplies_to_tiersfcfec,
    codeStates['fail_mode'] = fail_modeef857,
    codeStates['setfail_mode'] = setfail_modeef857,
    codeStates['status'] = status696d3,
    codeStates['setstatus'] = setstatus696d3,
    codeStates['test_status'] = test_statusacb3e,
    codeStates['settest_status'] = settest_statusacb3e,
    codeStates['effective_from'] = effective_fromc0572,
    codeStates['seteffective_from'] = seteffective_fromc0572,
    codeStates['dynamicactions'] = dynamicactions57d44,
    codeStates['setdynamicactions'] = setdynamicactions57d44,
    codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
    codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrule_config_groupab2fc0Props((pre:any)=>({...pre,validation:true}))
 },[effective_fromc0572?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_fromc0572?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `17 / 25`,gridRow: `24 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={rule_config_groupab2fc0?.effective_from}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_fromc0572?.isDisabled ? true : false}
      disabled= {effective_fromc0572?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Effective From"
      dateValidation=""
      validationState={validate?.addPolicyRule_v1?.effective_from ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_from
