

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


const DatePickercert_expiry_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry121deProps, setoverall_ai_asset_registry121deProps}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_groupf02dcProps, setregister_ai_asset_groupf02dcProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1}= useContext(TotalContext) as TotalContextProps  
  const {asset_identity_group8d5e1Props, setasset_identity_group8d5e1Props}= useContext(TotalContext) as TotalContextProps  
  const {ownership_groupf52d5, setownership_groupf52d5}= useContext(TotalContext) as TotalContextProps  
  const {ownership_groupf52d5Props, setownership_groupf52d5Props}= useContext(TotalContext) as TotalContextProps  
  const {vending_group8f2ec, setvending_group8f2ec}= useContext(TotalContext) as TotalContextProps  
  const {vending_group8f2ecProps, setvending_group8f2ecProps}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupa10eb, setcertification_groupa10eb}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupa10ebProps, setcertification_groupa10ebProps}= useContext(TotalContext) as TotalContextProps  
  const {certification_textf1dc3, setcertification_textf1dc3}= useContext(TotalContext) as TotalContextProps  
  const {current_certification_idd992e, setcurrent_certification_idd992e}= useContext(TotalContext) as TotalContextProps  
  const {cert_expiry_datecaf83, setcert_expiry_datecaf83}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_code695b4, setdiscovery_source_code695b4}= useContext(TotalContext) as TotalContextProps  
  const {integration_source_idc3c56, setintegration_source_idc3c56}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group233f9, setusecase_group233f9}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group233f9Props, setusecase_group233f9Props}= useContext(TotalContext) as TotalContextProps  
  const {tier_group6915b, settier_group6915b}= useContext(TotalContext) as TotalContextProps  
  const {tier_group6915bProps, settier_group6915bProps}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_groupb7909, setlifecycle_groupb7909}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_groupb7909Props, setlifecycle_groupb7909Props}= useContext(TotalContext) as TotalContextProps  
  const {version_group3fe6f, setversion_group3fe6f}= useContext(TotalContext) as TotalContextProps  
  const {version_group3fe6fProps, setversion_group3fe6fProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsf846f, setdynamicactionsf846f}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsf846fProps, setdynamicactionsf846fProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,registerAIAsset_v1:{...pre?.registerAIAsset_v1,cert_expiry_date:undefined}}));
  if (!date) {
    setcertification_groupa10eb((prev: any) => ({ ...prev, cert_expiry_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcertification_groupa10eb((prev: any) => ({ ...prev, cert_expiry_date: isoDate }))
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
        "6baf2419ee954255a3d070e08f4a10eb",
        "d0e47ead53d946498f6455f2ab7caf83"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de,
    codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de,
    codeStates['overall_ai_asset_registry121de'] = overall_ai_asset_registry121deProps,
    codeStates['setoverall_ai_asset_registry121de'] = setoverall_ai_asset_registry121deProps,
    codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc,
    codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc,
    codeStates['register_ai_asset_groupf02dc'] = register_ai_asset_groupf02dcProps,
    codeStates['setregister_ai_asset_groupf02dc'] = setregister_ai_asset_groupf02dcProps,
    codeStates['asset_identity_group'] = asset_identity_group8d5e1,
    codeStates['setasset_identity_group'] = setasset_identity_group8d5e1,
    codeStates['asset_identity_group8d5e1'] = asset_identity_group8d5e1Props,
    codeStates['setasset_identity_group8d5e1'] = setasset_identity_group8d5e1Props,
    codeStates['ownership_group'] = ownership_groupf52d5,
    codeStates['setownership_group'] = setownership_groupf52d5,
    codeStates['ownership_groupf52d5'] = ownership_groupf52d5Props,
    codeStates['setownership_groupf52d5'] = setownership_groupf52d5Props,
    codeStates['vending_group'] = vending_group8f2ec,
    codeStates['setvending_group'] = setvending_group8f2ec,
    codeStates['vending_group8f2ec'] = vending_group8f2ecProps,
    codeStates['setvending_group8f2ec'] = setvending_group8f2ecProps,
    codeStates['certification_group'] = certification_groupa10eb,
    codeStates['setcertification_group'] = setcertification_groupa10eb,
    codeStates['certification_groupa10eb'] = certification_groupa10ebProps,
    codeStates['setcertification_groupa10eb'] = setcertification_groupa10ebProps,
    codeStates['certification_text'] = certification_textf1dc3,
    codeStates['setcertification_text'] = setcertification_textf1dc3,
    codeStates['current_certification_id'] = current_certification_idd992e,
    codeStates['setcurrent_certification_id'] = setcurrent_certification_idd992e,
    codeStates['cert_expiry_date'] = cert_expiry_datecaf83,
    codeStates['setcert_expiry_date'] = setcert_expiry_datecaf83,
    codeStates['discovery_source_code'] = discovery_source_code695b4,
    codeStates['setdiscovery_source_code'] = setdiscovery_source_code695b4,
    codeStates['integration_source_id'] = integration_source_idc3c56,
    codeStates['setintegration_source_id'] = setintegration_source_idc3c56,
    codeStates['usecase_group'] = usecase_group233f9,
    codeStates['setusecase_group'] = setusecase_group233f9,
    codeStates['usecase_group233f9'] = usecase_group233f9Props,
    codeStates['setusecase_group233f9'] = setusecase_group233f9Props,
    codeStates['tier_group'] = tier_group6915b,
    codeStates['settier_group'] = settier_group6915b,
    codeStates['tier_group6915b'] = tier_group6915bProps,
    codeStates['settier_group6915b'] = settier_group6915bProps,
    codeStates['lifecycle_group'] = lifecycle_groupb7909,
    codeStates['setlifecycle_group'] = setlifecycle_groupb7909,
    codeStates['lifecycle_groupb7909'] = lifecycle_groupb7909Props,
    codeStates['setlifecycle_groupb7909'] = setlifecycle_groupb7909Props,
    codeStates['version_group'] = version_group3fe6f,
    codeStates['setversion_group'] = setversion_group3fe6f,
    codeStates['version_group3fe6f'] = version_group3fe6fProps,
    codeStates['setversion_group3fe6f'] = setversion_group3fe6fProps,
    codeStates['dynamicactions'] = dynamicactionsf846f,
    codeStates['setdynamicactions'] = setdynamicactionsf846f,
    codeStates['dynamicactionsf846f'] = dynamicactionsf846fProps,
    codeStates['setdynamicactionsf846f'] = setdynamicactionsf846fProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setcertification_groupa10ebProps((pre:any)=>({...pre,validation:true}))
 },[cert_expiry_datecaf83?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (cert_expiry_datecaf83?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={certification_groupa10eb?.cert_expiry_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {cert_expiry_datecaf83?.isDisabled ? true : false}
      disabled= {cert_expiry_datecaf83?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Certification Expiry Date"
      dateValidation=""
      validationState={validate?.registerAIAsset_v1?.cert_expiry_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickercert_expiry_date
