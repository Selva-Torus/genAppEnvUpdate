

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


const DatePickerdecided_on = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps  
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps  
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps  
  const {textfa52c, settextfa52c}= useContext(TotalContext) as TotalContextProps  
  const {cert_stage_id68938, setcert_stage_id68938}= useContext(TotalContext) as TotalContextProps  
  const {stage_sequence24d54, setstage_sequence24d54}= useContext(TotalContext) as TotalContextProps  
  const {stage_type_codeec1d6, setstage_type_codeec1d6}= useContext(TotalContext) as TotalContextProps  
  const {stage_namea95b4, setstage_namea95b4}= useContext(TotalContext) as TotalContextProps  
  const {assigned_login_name7df9b, setassigned_login_name7df9b}= useContext(TotalContext) as TotalContextProps  
  const {decided_onf3d30, setdecided_onf3d30}= useContext(TotalContext) as TotalContextProps  
  const {opened_on9697d, setopened_on9697d}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,decided_on:undefined}}));
  if (!date) {
    setstage_group_10fb7d((prev: any) => ({ ...prev, decided_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setstage_group_10fb7d((prev: any) => ({ ...prev, decided_on: isoDate }))
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
        "4f61f0334d1749399beb480b66f0fb7d",
        "f79be66552ac4203882b46d13e1f3d30"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['cert_stage_group'] = cert_stage_groupf8b90,
    codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
    codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
    codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
    codeStates['asset_group'] = asset_group173fd,
    codeStates['setasset_group'] = setasset_group173fd,
    codeStates['asset_group173fd'] = asset_group173fdProps,
    codeStates['setasset_group173fd'] = setasset_group173fdProps,
    codeStates['stage_group_1'] = stage_group_10fb7d,
    codeStates['setstage_group_1'] = setstage_group_10fb7d,
    codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
    codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
    codeStates['text'] = textfa52c,
    codeStates['settext'] = settextfa52c,
    codeStates['cert_stage_id'] = cert_stage_id68938,
    codeStates['setcert_stage_id'] = setcert_stage_id68938,
    codeStates['stage_sequence'] = stage_sequence24d54,
    codeStates['setstage_sequence'] = setstage_sequence24d54,
    codeStates['stage_type_code'] = stage_type_codeec1d6,
    codeStates['setstage_type_code'] = setstage_type_codeec1d6,
    codeStates['stage_name'] = stage_namea95b4,
    codeStates['setstage_name'] = setstage_namea95b4,
    codeStates['assigned_login_name'] = assigned_login_name7df9b,
    codeStates['setassigned_login_name'] = setassigned_login_name7df9b,
    codeStates['decided_on'] = decided_onf3d30,
    codeStates['setdecided_on'] = setdecided_onf3d30,
    codeStates['opened_on'] = opened_on9697d,
    codeStates['setopened_on'] = setopened_on9697d,
    codeStates['stage_group_2'] = stage_group_24dcf0,
    codeStates['setstage_group_2'] = setstage_group_24dcf0,
    codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
    codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setstage_group_10fb7dProps((pre:any)=>({...pre,validation:true}))
 },[decided_onf3d30?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (decided_onf3d30?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `35 / 47`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={stage_group_10fb7d?.decided_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled= {decided_onf3d30?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Decided On"
      dateValidation=""
      validationState={validate?.editCertificationStages_v1?.decided_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdecided_on
