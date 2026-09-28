

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


const DatePickerlast_validated_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps  
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps  
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps  
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps  
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps  
  const {validation_textfb967, setvalidation_textfb967}= useContext(TotalContext) as TotalContextProps  
  const {last_validated_on7080a, setlast_validated_on7080a}= useContext(TotalContext) as TotalContextProps  
  const {next_validation_due17bcf, setnext_validation_due17bcf}= useContext(TotalContext) as TotalContextProps  
  const {is_active7bbd4, setis_active7bbd4}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addAIModels_v1:{...pre?.addAIModels_v1,last_validated_on:undefined}}));
  if (!date) {
    setvalidation_group50e82((prev: any) => ({ ...prev, last_validated_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setvalidation_group50e82((prev: any) => ({ ...prev, last_validated_on: isoDate }))
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
        "58996cbbeb6c79603c0b95a546b50e82",
        "b8b54639f95547f28c7978355407080a"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
    codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
    codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
    codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
    codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
    codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
    codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
    codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
    codeStates['model_info_group'] = model_info_group905fc,
    codeStates['setmodel_info_group'] = setmodel_info_group905fc,
    codeStates['model_info_group905fc'] = model_info_group905fcProps,
    codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
    codeStates['grounding_group'] = grounding_group4df86,
    codeStates['setgrounding_group'] = setgrounding_group4df86,
    codeStates['grounding_group4df86'] = grounding_group4df86Props,
    codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
    codeStates['validation_group'] = validation_group50e82,
    codeStates['setvalidation_group'] = setvalidation_group50e82,
    codeStates['validation_group50e82'] = validation_group50e82Props,
    codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
    codeStates['validation_text'] = validation_textfb967,
    codeStates['setvalidation_text'] = setvalidation_textfb967,
    codeStates['last_validated_on'] = last_validated_on7080a,
    codeStates['setlast_validated_on'] = setlast_validated_on7080a,
    codeStates['next_validation_due'] = next_validation_due17bcf,
    codeStates['setnext_validation_due'] = setnext_validation_due17bcf,
    codeStates['is_active'] = is_active7bbd4,
    codeStates['setis_active'] = setis_active7bbd4,
    codeStates['dynamicactions'] = dynamicactions16b90,
    codeStates['setdynamicactions'] = setdynamicactions16b90,
    codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
    codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setvalidation_group50e82Props((pre:any)=>({...pre,validation:true}))
 },[last_validated_on7080a?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (last_validated_on7080a?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={validation_group50e82?.last_validated_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {last_validated_on7080a?.isDisabled ? true : false}
      disabled= {last_validated_on7080a?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Last Validation On"
      dateValidation=""
      validationState={validate?.addAIModels_v1?.last_validated_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerlast_validated_on
