

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
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps  
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps  
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps  
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps  
  const {certification_stage_configure_txtcf368, setcertification_stage_configure_txtcf368}= useContext(TotalContext) as TotalContextProps  
  const {due_onff8bd, setdue_onff8bd}= useContext(TotalContext) as TotalContextProps  
  const {evidence_counteb603, setevidence_counteb603}= useContext(TotalContext) as TotalContextProps  
  const {is_active65ee3, setis_active65ee3}= useContext(TotalContext) as TotalContextProps  
  const {decision_comment4dd53, setdecision_comment4dd53}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,editCertificationStages_v1:{...pre?.editCertificationStages_v1,due_on:undefined}}));
  if (!date) {
    setstage_group_24dcf0((prev: any) => ({ ...prev, due_on: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setstage_group_24dcf0((prev: any) => ({ ...prev, due_on: isoDate }))
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
        "ae3afa36801148598004a9647364dcf0",
        "131446393d24433da9a063e4d9bff8bd"
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
    codeStates['stage_group_2'] = stage_group_24dcf0,
    codeStates['setstage_group_2'] = setstage_group_24dcf0,
    codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
    codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
    codeStates['certification_stage_configure_txt'] = certification_stage_configure_txtcf368,
    codeStates['setcertification_stage_configure_txt'] = setcertification_stage_configure_txtcf368,
    codeStates['due_on'] = due_onff8bd,
    codeStates['setdue_on'] = setdue_onff8bd,
    codeStates['evidence_count'] = evidence_counteb603,
    codeStates['setevidence_count'] = setevidence_counteb603,
    codeStates['is_active'] = is_active65ee3,
    codeStates['setis_active'] = setis_active65ee3,
    codeStates['decision_comment'] = decision_comment4dd53,
    codeStates['setdecision_comment'] = setdecision_comment4dd53,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setstage_group_24dcf0Props((pre:any)=>({...pre,validation:true}))
 },[due_onff8bd?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (due_onff8bd?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 10`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={stage_group_24dcf0?.due_on}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {due_onff8bd?.isDisabled ? true : false}
      disabled= {due_onff8bd?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Due On"
      dateValidation=""
      validationState={validate?.editCertificationStages_v1?.due_on ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdue_on
