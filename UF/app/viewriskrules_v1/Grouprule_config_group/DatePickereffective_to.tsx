

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
  const {info_group95877, setinfo_group95877}= useContext(TotalContext) as TotalContextProps  
  const {info_group95877Props, setinfo_group95877Props}= useContext(TotalContext) as TotalContextProps  
  const {group76151, setgroup76151}= useContext(TotalContext) as TotalContextProps  
  const {group76151Props, setgroup76151Props}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupb9eb4, setrule_config_groupb9eb4}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupb9eb4Props, setrule_config_groupb9eb4Props}= useContext(TotalContext) as TotalContextProps  
  const {info_rule8323f, setinfo_rule8323f}= useContext(TotalContext) as TotalContextProps  
  const {priority_order6450a, setpriority_order6450a}= useContext(TotalContext) as TotalContextProps  
  const {is_active739c3, setis_active739c3}= useContext(TotalContext) as TotalContextProps  
  const {effective_to5c703, seteffective_to5c703}= useContext(TotalContext) as TotalContextProps  
  const {effective_from972ff, seteffective_from972ff}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewRiskRules_v1:{...pre?.viewRiskRules_v1,effective_to:undefined}}));
  if (!date) {
    setrule_config_groupb9eb4((prev: any) => ({ ...prev, effective_to: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrule_config_groupb9eb4((prev: any) => ({ ...prev, effective_to: isoDate }))
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
        "1001cc51af96bbc2103d413bee5b9eb4",
        "c862e2c1169b3f9b2f89a6ee71e5c703"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['info_group'] = info_group95877,
    codeStates['setinfo_group'] = setinfo_group95877,
    codeStates['info_group95877'] = info_group95877Props,
    codeStates['setinfo_group95877'] = setinfo_group95877Props,
    codeStates['group'] = group76151,
    codeStates['setgroup'] = setgroup76151,
    codeStates['group76151'] = group76151Props,
    codeStates['setgroup76151'] = setgroup76151Props,
    codeStates['rule_config_group'] = rule_config_groupb9eb4,
    codeStates['setrule_config_group'] = setrule_config_groupb9eb4,
    codeStates['rule_config_groupb9eb4'] = rule_config_groupb9eb4Props,
    codeStates['setrule_config_groupb9eb4'] = setrule_config_groupb9eb4Props,
    codeStates['info_rule'] = info_rule8323f,
    codeStates['setinfo_rule'] = setinfo_rule8323f,
    codeStates['priority_order'] = priority_order6450a,
    codeStates['setpriority_order'] = setpriority_order6450a,
    codeStates['is_active'] = is_active739c3,
    codeStates['setis_active'] = setis_active739c3,
    codeStates['effective_to'] = effective_to5c703,
    codeStates['seteffective_to'] = seteffective_to5c703,
    codeStates['effective_from'] = effective_from972ff,
    codeStates['seteffective_from'] = seteffective_from972ff,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrule_config_groupb9eb4Props((pre:any)=>({...pre,validation:true}))
 },[effective_to5c703?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_to5c703?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `24 / 37`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={rule_config_groupb9eb4?.effective_to}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_to5c703?.isDisabled ? true : false}
      disabled= {effective_to5c703?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Effective To"
      dateValidation=""
      validationState={validate?.viewRiskRules_v1?.effective_to ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_to
