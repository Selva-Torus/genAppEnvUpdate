

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


const DatePickerdue_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps  
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps  
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps  
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps  
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps  
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps  
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps  
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps  
  const {text113556f, settext113556f}= useContext(TotalContext) as TotalContextProps  
  const {due_on4bc44, setdue_on4bc44}= useContext(TotalContext) as TotalContextProps  
  const {evidence_count4538e, setevidence_count4538e}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_oncdec5, settrs_created_oncdec5}= useContext(TotalContext) as TotalContextProps  
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps  
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps  
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps  
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addReviewScreen_v1:{...pre?.addReviewScreen_v1,due_on:undefined}}));
  if (!date) {
    setschedule_groupc0bee((prev: any) => ({ ...prev, due_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setschedule_groupc0bee((prev: any) => ({ ...prev, due_on: isoDate }))
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
        "4d49821bf244436a96aaeedbce5c0bee",
        "89c864b96b924f978c2b6ef13784bc44"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_group'] = add_groupac52e,
    codeStates['setadd_group'] = setadd_groupac52e,
    codeStates['add_groupac52e'] = add_groupac52eProps,
    codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
    codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
    codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
    codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
    codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
    codeStates['group'] = group73b09,
    codeStates['setgroup'] = setgroup73b09,
    codeStates['group73b09'] = group73b09Props,
    codeStates['setgroup73b09'] = setgroup73b09Props,
    codeStates['schedule_group'] = schedule_groupc0bee,
    codeStates['setschedule_group'] = setschedule_groupc0bee,
    codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
    codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
    codeStates['text11'] = text113556f,
    codeStates['settext11'] = settext113556f,
    codeStates['due_on'] = due_on4bc44,
    codeStates['setdue_on'] = setdue_on4bc44,
    codeStates['evidence_count'] = evidence_count4538e,
    codeStates['setevidence_count'] = setevidence_count4538e,
    codeStates['trs_created_on'] = trs_created_oncdec5,
    codeStates['settrs_created_on'] = settrs_created_oncdec5,
    codeStates['status_group'] = status_groupc59b9,
    codeStates['setstatus_group'] = setstatus_groupc59b9,
    codeStates['status_groupc59b9'] = status_groupc59b9Props,
    codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
    codeStates['add_rule_condition'] = add_rule_condition96c45,
    codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
    codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
    codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
    codeStates['dynamicactions'] = dynamicactions62ac1,
    codeStates['setdynamicactions'] = setdynamicactions62ac1,
    codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
    codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setschedule_groupc0beeProps((pre:any)=>({...pre,validation:true}))
 },[due_on4bc44?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (due_on4bc44?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={schedule_groupc0bee?.due_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled={ true }
      contentAlign={"center"}
      headerPosition='top'
      headerText="Due on"
      dateValidation=""
      validationState={validate?.addReviewScreen_v1?.due_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdue_on
