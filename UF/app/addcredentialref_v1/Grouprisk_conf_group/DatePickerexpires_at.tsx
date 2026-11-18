

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


const DatePickerexpires_at = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps  
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_text3e4de, setlifecycle_text3e4de}= useContext(TotalContext) as TotalContextProps  
  const {rotation_days8bd75, setrotation_days8bd75}= useContext(TotalContext) as TotalContextProps  
  const {last_rotated_atda7a6, setlast_rotated_atda7a6}= useContext(TotalContext) as TotalContextProps  
  const {expires_ata05dc, setexpires_ata05dc}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addCredentialRef_v1:{...pre?.addCredentialRef_v1,expires_at:undefined}}));
  if (!date) {
    setrisk_conf_group5fe07((prev: any) => ({ ...prev, expires_at: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrisk_conf_group5fe07((prev: any) => ({ ...prev, expires_at: isoDate }))
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
        "2e9bfa725ccf5221eb1b5435b385fe07",
        "0ebb1bf69fac41af8fc25e5ebeaa05dc"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_group'] = overall_group28e6a,
    codeStates['setoverall_group'] = setoverall_group28e6a,
    codeStates['overall_group28e6a'] = overall_group28e6aProps,
    codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
    codeStates['action_details_group'] = action_details_group24206,
    codeStates['setaction_details_group'] = setaction_details_group24206,
    codeStates['action_details_group24206'] = action_details_group24206Props,
    codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
    codeStates['action_detail_group'] = action_detail_group383de,
    codeStates['setaction_detail_group'] = setaction_detail_group383de,
    codeStates['action_detail_group383de'] = action_detail_group383deProps,
    codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
    codeStates['risk_conf_group'] = risk_conf_group5fe07,
    codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
    codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
    codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
    codeStates['lifecycle_text'] = lifecycle_text3e4de,
    codeStates['setlifecycle_text'] = setlifecycle_text3e4de,
    codeStates['rotation_days'] = rotation_days8bd75,
    codeStates['setrotation_days'] = setrotation_days8bd75,
    codeStates['last_rotated_at'] = last_rotated_atda7a6,
    codeStates['setlast_rotated_at'] = setlast_rotated_atda7a6,
    codeStates['expires_at'] = expires_ata05dc,
    codeStates['setexpires_at'] = setexpires_ata05dc,
    codeStates['dynamicactions'] = dynamicactions9ea03,
    codeStates['setdynamicactions'] = setdynamicactions9ea03,
    codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
    codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrisk_conf_group5fe07Props((pre:any)=>({...pre,validation:true}))
 },[expires_ata05dc?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (expires_ata05dc?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `23 / 35`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={risk_conf_group5fe07?.expires_at}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {expires_ata05dc?.isDisabled ? true : false}
      disabled= {expires_ata05dc?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Expiry DateSelect expiry date"
      dateValidation=""
      validationState={validate?.addCredentialRef_v1?.expires_at ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerexpires_at
