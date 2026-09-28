

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
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps  
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps  
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps  
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps  
  const {info_rule00a91, setinfo_rule00a91}= useContext(TotalContext) as TotalContextProps  
  const {priority_orderebd55, setpriority_orderebd55}= useContext(TotalContext) as TotalContextProps  
  const {is_activefb18e, setis_activefb18e}= useContext(TotalContext) as TotalContextProps  
  const {effective_toc5034, seteffective_toc5034}= useContext(TotalContext) as TotalContextProps  
  const {effective_fromfc1bf, seteffective_fromfc1bf}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addRiskRule_v1:{...pre?.addRiskRule_v1,effective_from:undefined}}));
  if (!date) {
    setrule_config_groupa38fa((prev: any) => ({ ...prev, effective_from: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrule_config_groupa38fa((prev: any) => ({ ...prev, effective_from: isoDate }))
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
        "788963b195ce493bb5a84ef9698a38fa",
        "0f752504ef9f460cb149c561d4afc1bf"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['info_group'] = info_group69a49,
    codeStates['setinfo_group'] = setinfo_group69a49,
    codeStates['info_group69a49'] = info_group69a49Props,
    codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
    codeStates['group'] = groupc3f8e,
    codeStates['setgroup'] = setgroupc3f8e,
    codeStates['groupc3f8e'] = groupc3f8eProps,
    codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
    codeStates['rule_config_group'] = rule_config_groupa38fa,
    codeStates['setrule_config_group'] = setrule_config_groupa38fa,
    codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
    codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
    codeStates['info_rule'] = info_rule00a91,
    codeStates['setinfo_rule'] = setinfo_rule00a91,
    codeStates['priority_order'] = priority_orderebd55,
    codeStates['setpriority_order'] = setpriority_orderebd55,
    codeStates['is_active'] = is_activefb18e,
    codeStates['setis_active'] = setis_activefb18e,
    codeStates['effective_to'] = effective_toc5034,
    codeStates['seteffective_to'] = seteffective_toc5034,
    codeStates['effective_from'] = effective_fromfc1bf,
    codeStates['seteffective_from'] = seteffective_fromfc1bf,
    codeStates['dynamicactions'] = dynamicactions618ef,
    codeStates['setdynamicactions'] = setdynamicactions618ef,
    codeStates['dynamicactions618ef'] = dynamicactions618efProps,
    codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrule_config_groupa38faProps((pre:any)=>({...pre,validation:true}))
 },[effective_fromfc1bf?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_fromfc1bf?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `38 / 51`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={rule_config_groupa38fa?.effective_from}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_fromfc1bf?.isDisabled ? true : false}
      disabled= {effective_fromfc1bf?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Effective From"
      dateValidation=""
      validationState={validate?.addRiskRule_v1?.effective_from ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_from
