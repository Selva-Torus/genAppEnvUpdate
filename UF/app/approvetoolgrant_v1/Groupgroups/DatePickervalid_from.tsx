

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


const DatePickervalid_from = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps  
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps  
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps  
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps  
  const {texts951ea, settexts951ea}= useContext(TotalContext) as TotalContextProps  
  const {approved_by9359d, setapproved_by9359d}= useContext(TotalContext) as TotalContextProps  
  const {valid_from79806, setvalid_from79806}= useContext(TotalContext) as TotalContextProps  
  const {valid_to21a55, setvalid_to21a55}= useContext(TotalContext) as TotalContextProps  
  const {status2e5d0, setstatus2e5d0}= useContext(TotalContext) as TotalContextProps  
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps  
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,approveToolGrant_v1:{...pre?.approveToolGrant_v1,valid_from:undefined}}));
  if (!date) {
    setgroupsae790((prev: any) => ({ ...prev, valid_from: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgroupsae790((prev: any) => ({ ...prev, valid_from: isoDate }))
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
        "958194d4e02f4eacb7adc2d8007ae790",
        "bc5f95096737497a9797a4be9c979806"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = group8f0c2,
    codeStates['setgroup'] = setgroup8f0c2,
    codeStates['group8f0c2'] = group8f0c2Props,
    codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
    codeStates['template_detail_group'] = template_detail_group410a7,
    codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
    codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
    codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
    codeStates['groups'] = groupsae790,
    codeStates['setgroups'] = setgroupsae790,
    codeStates['groupsae790'] = groupsae790Props,
    codeStates['setgroupsae790'] = setgroupsae790Props,
    codeStates['texts'] = texts951ea,
    codeStates['settexts'] = settexts951ea,
    codeStates['approved_by'] = approved_by9359d,
    codeStates['setapproved_by'] = setapproved_by9359d,
    codeStates['valid_from'] = valid_from79806,
    codeStates['setvalid_from'] = setvalid_from79806,
    codeStates['valid_to'] = valid_to21a55,
    codeStates['setvalid_to'] = setvalid_to21a55,
    codeStates['status'] = status2e5d0,
    codeStates['setstatus'] = setstatus2e5d0,
    codeStates['dynamicaction'] = dynamicaction9560b,
    codeStates['setdynamicaction'] = setdynamicaction9560b,
    codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
    codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgroupsae790Props((pre:any)=>({...pre,validation:true}))
 },[valid_from79806?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (valid_from79806?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `11 / 25`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={groupsae790?.valid_from}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {valid_from79806?.isDisabled ? true : false}
      disabled= {valid_from79806?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Valid From"
      dateValidation=""
      validationState={validate?.approveToolGrant_v1?.valid_from ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickervalid_from
