

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


const DatePickervalid_to = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_group1505e, setoverall_group1505e}= useContext(TotalContext) as TotalContextProps  
  const {overall_group1505eProps, setoverall_group1505eProps}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group51bc6, setaction_details_group51bc6}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group51bc6Props, setaction_details_group51bc6Props}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group32126, setaction_detail_group32126}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group32126Props, setaction_detail_group32126Props}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_group60f7c, setrisk_conf_group60f7c}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_group60f7cProps, setrisk_conf_group60f7cProps}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_text22db6, setlifecycle_text22db6}= useContext(TotalContext) as TotalContextProps  
  const {valid_from3fa1b, setvalid_from3fa1b}= useContext(TotalContext) as TotalContextProps  
  const {valid_to60360, setvalid_to60360}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsae385, setdynamicactionsae385}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsae385Props, setdynamicactionsae385Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addAssetVersion_v1:{...pre?.addAssetVersion_v1,valid_to:undefined}}));
  if (!date) {
    setrisk_conf_group60f7c((prev: any) => ({ ...prev, valid_to: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrisk_conf_group60f7c((prev: any) => ({ ...prev, valid_to: isoDate }))
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
        "c5121a330b080b0fd6fc43a854660f7c",
        "62baa4b1213d48489265e66fd3560360"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_group'] = overall_group1505e,
    codeStates['setoverall_group'] = setoverall_group1505e,
    codeStates['overall_group1505e'] = overall_group1505eProps,
    codeStates['setoverall_group1505e'] = setoverall_group1505eProps,
    codeStates['action_details_group'] = action_details_group51bc6,
    codeStates['setaction_details_group'] = setaction_details_group51bc6,
    codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
    codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
    codeStates['action_detail_group'] = action_detail_group32126,
    codeStates['setaction_detail_group'] = setaction_detail_group32126,
    codeStates['action_detail_group32126'] = action_detail_group32126Props,
    codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
    codeStates['risk_conf_group'] = risk_conf_group60f7c,
    codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
    codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
    codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
    codeStates['lifecycle_text'] = lifecycle_text22db6,
    codeStates['setlifecycle_text'] = setlifecycle_text22db6,
    codeStates['valid_from'] = valid_from3fa1b,
    codeStates['setvalid_from'] = setvalid_from3fa1b,
    codeStates['valid_to'] = valid_to60360,
    codeStates['setvalid_to'] = setvalid_to60360,
    codeStates['dynamicactions'] = dynamicactionsae385,
    codeStates['setdynamicactions'] = setdynamicactionsae385,
    codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
    codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrisk_conf_group60f7cProps((pre:any)=>({...pre,validation:true}))
 },[valid_to60360?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (valid_to60360?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `24 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={risk_conf_group60f7c?.valid_to}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {valid_to60360?.isDisabled ? true : false}
      disabled= {valid_to60360?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Valid From"
      dateValidation=""
      validationState={validate?.addAssetVersion_v1?.valid_to ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalid_to
