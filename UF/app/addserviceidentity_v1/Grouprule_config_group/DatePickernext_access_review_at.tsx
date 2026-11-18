

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


const DatePickernext_access_review_at = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps  
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps  
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps  
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps  
  const {info_rule72693, setinfo_rule72693}= useContext(TotalContext) as TotalContextProps  
  const {last_access_review_atc0b48, setlast_access_review_atc0b48}= useContext(TotalContext) as TotalContextProps  
  const {next_access_review_atec73d, setnext_access_review_atec73d}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addServiceIdentity_v1:{...pre?.addServiceIdentity_v1,next_access_review_at:undefined}}));
  if (!date) {
    setrule_config_group98282((prev: any) => ({ ...prev, next_access_review_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrule_config_group98282((prev: any) => ({ ...prev, next_access_review_at: isoDate }))
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
        "7d5790e9508eb1529f3f3f5bf9d98282",
        "9bfcc008dc1c430bbb4fba4e032ec73d"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['info_group'] = info_group9d912,
    codeStates['setinfo_group'] = setinfo_group9d912,
    codeStates['info_group9d912'] = info_group9d912Props,
    codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
    codeStates['group'] = groupe6728,
    codeStates['setgroup'] = setgroupe6728,
    codeStates['groupe6728'] = groupe6728Props,
    codeStates['setgroupe6728'] = setgroupe6728Props,
    codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
    codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
    codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
    codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
    codeStates['rule_config_group'] = rule_config_group98282,
    codeStates['setrule_config_group'] = setrule_config_group98282,
    codeStates['rule_config_group98282'] = rule_config_group98282Props,
    codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
    codeStates['info_rule'] = info_rule72693,
    codeStates['setinfo_rule'] = setinfo_rule72693,
    codeStates['last_access_review_at'] = last_access_review_atc0b48,
    codeStates['setlast_access_review_at'] = setlast_access_review_atc0b48,
    codeStates['next_access_review_at'] = next_access_review_atec73d,
    codeStates['setnext_access_review_at'] = setnext_access_review_atec73d,
    codeStates['dynamicactions'] = dynamicactions5796b,
    codeStates['setdynamicactions'] = setdynamicactions5796b,
    codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
    codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrule_config_group98282Props((pre:any)=>({...pre,validation:true}))
 },[next_access_review_atec73d?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (next_access_review_atec73d?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `10 / 22`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={rule_config_group98282?.next_access_review_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {next_access_review_atec73d?.isDisabled ? true : false}
      disabled= {next_access_review_atec73d?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Next Access Review Date"
      dateValidation=""
      validationState={validate?.addServiceIdentity_v1?.next_access_review_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickernext_access_review_at
