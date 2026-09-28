

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


const DatePickerkill_switch_updated_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps  
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps  
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps  
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps  
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps  
  const {security_text91cf6, setsecurity_text91cf6}= useContext(TotalContext) as TotalContextProps  
  const {kill_switch_state_code3ed20, setkill_switch_state_code3ed20}= useContext(TotalContext) as TotalContextProps  
  const {kill_switch_updated_by7a179, setkill_switch_updated_by7a179}= useContext(TotalContext) as TotalContextProps  
  const {kill_switch_updated_on0aadf, setkill_switch_updated_on0aadf}= useContext(TotalContext) as TotalContextProps  
  const {is_activee26e9, setis_activee26e9}= useContext(TotalContext) as TotalContextProps  
  const {segregation_notesd7da7, setsegregation_notesd7da7}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addAgentControl_v1:{...pre?.addAgentControl_v1,kill_switch_updated_on:undefined}}));
  if (!date) {
    setvalidation_group4d206((prev: any) => ({ ...prev, kill_switch_updated_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalidation_group4d206((prev: any) => ({ ...prev, kill_switch_updated_on: isoDate }))
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
        "1c0817c1402d547509cb443bace4d206",
        "a0fa42c01dee12fb851c00dae2d0aadf"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
    codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
    codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
    codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
    codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
    codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
    codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
    codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
    codeStates['model_info_group'] = model_info_group5b641,
    codeStates['setmodel_info_group'] = setmodel_info_group5b641,
    codeStates['model_info_group5b641'] = model_info_group5b641Props,
    codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
    codeStates['grounding_group'] = grounding_groupb1b6f,
    codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
    codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
    codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
    codeStates['validation_group'] = validation_group4d206,
    codeStates['setvalidation_group'] = setvalidation_group4d206,
    codeStates['validation_group4d206'] = validation_group4d206Props,
    codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
    codeStates['security_text'] = security_text91cf6,
    codeStates['setsecurity_text'] = setsecurity_text91cf6,
    codeStates['kill_switch_state_code'] = kill_switch_state_code3ed20,
    codeStates['setkill_switch_state_code'] = setkill_switch_state_code3ed20,
    codeStates['kill_switch_updated_by'] = kill_switch_updated_by7a179,
    codeStates['setkill_switch_updated_by'] = setkill_switch_updated_by7a179,
    codeStates['kill_switch_updated_on'] = kill_switch_updated_on0aadf,
    codeStates['setkill_switch_updated_on'] = setkill_switch_updated_on0aadf,
    codeStates['is_active'] = is_activee26e9,
    codeStates['setis_active'] = setis_activee26e9,
    codeStates['segregation_notes'] = segregation_notesd7da7,
    codeStates['setsegregation_notes'] = setsegregation_notesd7da7,
    codeStates['dynamicactions'] = dynamicactions78fa5,
    codeStates['setdynamicactions'] = setdynamicactions78fa5,
    codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
    codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalidation_group4d206Props((pre:any)=>({...pre,validation:true}))
 },[kill_switch_updated_on0aadf?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (kill_switch_updated_on0aadf?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 19`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={validation_group4d206?.kill_switch_updated_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {kill_switch_updated_on0aadf?.isDisabled ? true : false}
      disabled= {kill_switch_updated_on0aadf?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Kill Switch Updated On"
      dateValidation=""
      validationState={validate?.addAgentControl_v1?.kill_switch_updated_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerkill_switch_updated_on
