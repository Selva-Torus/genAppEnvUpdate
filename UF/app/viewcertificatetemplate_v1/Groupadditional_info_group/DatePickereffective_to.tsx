

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


const DatePickereffective_to = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {groupac196, setgroupac196}= useContext(TotalContext) as TotalContextProps  
  const {groupac196Props, setgroupac196Props}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_group268e9, settemplate_detail_group268e9}= useContext(TotalContext) as TotalContextProps  
  const {template_detail_group268e9Props, settemplate_detail_group268e9Props}= useContext(TotalContext) as TotalContextProps  
  const {additional_info_group4d159, setadditional_info_group4d159}= useContext(TotalContext) as TotalContextProps  
  const {additional_info_group4d159Props, setadditional_info_group4d159Props}= useContext(TotalContext) as TotalContextProps  
  const {text_260eef, settext_260eef}= useContext(TotalContext) as TotalContextProps  
  const {validity_months25400, setvalidity_months25400}= useContext(TotalContext) as TotalContextProps  
  const {effective_froma55d1, seteffective_froma55d1}= useContext(TotalContext) as TotalContextProps  
  const {effective_to3bac5, seteffective_to3bac5}= useContext(TotalContext) as TotalContextProps  
  const {is_active5793c, setis_active5793c}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewCertificateTemplate_v1:{...pre?.viewCertificateTemplate_v1,effective_to:undefined}}));
  if (!date) {
    setadditional_info_group4d159((prev: any) => ({ ...prev, effective_to: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setadditional_info_group4d159((prev: any) => ({ ...prev, effective_to: isoDate }))
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
        "e23c4a3e08e7453caf5b207aaa64d159",
        "4f23d1df8f794ce3b148c8b4a3e3bac5"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['group'] = groupac196,
    codeStates['setgroup'] = setgroupac196,
    codeStates['groupac196'] = groupac196Props,
    codeStates['setgroupac196'] = setgroupac196Props,
    codeStates['template_detail_group'] = template_detail_group268e9,
    codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
    codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
    codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
    codeStates['additional_info_group'] = additional_info_group4d159,
    codeStates['setadditional_info_group'] = setadditional_info_group4d159,
    codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
    codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
    codeStates['text_2'] = text_260eef,
    codeStates['settext_2'] = settext_260eef,
    codeStates['validity_months'] = validity_months25400,
    codeStates['setvalidity_months'] = setvalidity_months25400,
    codeStates['effective_from'] = effective_froma55d1,
    codeStates['seteffective_from'] = seteffective_froma55d1,
    codeStates['effective_to'] = effective_to3bac5,
    codeStates['seteffective_to'] = seteffective_to3bac5,
    codeStates['is_active'] = is_active5793c,
    codeStates['setis_active'] = setis_active5793c,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setadditional_info_group4d159Props((pre:any)=>({...pre,validation:true}))
 },[effective_to3bac5?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_to3bac5?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `29 / 41`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={additional_info_group4d159?.effective_to}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_to3bac5?.isDisabled ? true : false}
      disabled= {effective_to3bac5?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Effective To"
      dateValidation=""
      validationState={validate?.viewCertificateTemplate_v1?.effective_to ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_to
