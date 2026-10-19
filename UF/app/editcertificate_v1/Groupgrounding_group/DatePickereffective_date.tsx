

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


const DatePickereffective_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps  
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps  
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps  
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps  
  const {grounding_textde33a, setgrounding_textde33a}= useContext(TotalContext) as TotalContextProps  
  const {text_effective_date2f0e9, settext_effective_date2f0e9}= useContext(TotalContext) as TotalContextProps  
  const {text_effective_date_1e9a79, settext_effective_date_1e9a79}= useContext(TotalContext) as TotalContextProps  
  const {text_effective_date_283f74, settext_effective_date_283f74}= useContext(TotalContext) as TotalContextProps  
  const {effective_date585df, seteffective_date585df}= useContext(TotalContext) as TotalContextProps  
  const {expiry_dated0967, setexpiry_dated0967}= useContext(TotalContext) as TotalContextProps  
  const {completed_on67679, setcompleted_on67679}= useContext(TotalContext) as TotalContextProps  
  const {cert_temp_textea047, setcert_temp_textea047}= useContext(TotalContext) as TotalContextProps  
  const {template_name5834f, settemplate_name5834f}= useContext(TotalContext) as TotalContextProps  
  const {is_recertificationa8241, setis_recertificationa8241}= useContext(TotalContext) as TotalContextProps  
  const {is_active72c74, setis_active72c74}= useContext(TotalContext) as TotalContextProps  
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps  
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,effective_date:undefined}}));
  if (!date) {
    setgrounding_groupdf2f5((prev: any) => ({ ...prev, effective_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgrounding_groupdf2f5((prev: any) => ({ ...prev, effective_date: isoDate }))
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
        "c443411dc1584fcda4ad9d757eedf2f5",
        "e9adbf643d44060c41f9320214a585df"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
    codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
    codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
    codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
    codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
    codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
    codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
    codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
    codeStates['model_info_group'] = model_info_group45b98,
    codeStates['setmodel_info_group'] = setmodel_info_group45b98,
    codeStates['model_info_group45b98'] = model_info_group45b98Props,
    codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
    codeStates['grounding_group'] = grounding_groupdf2f5,
    codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
    codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
    codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
    codeStates['grounding_text'] = grounding_textde33a,
    codeStates['setgrounding_text'] = setgrounding_textde33a,
    codeStates['text_effective_date'] = text_effective_date2f0e9,
    codeStates['settext_effective_date'] = settext_effective_date2f0e9,
    codeStates['text_effective_date_1'] = text_effective_date_1e9a79,
    codeStates['settext_effective_date_1'] = settext_effective_date_1e9a79,
    codeStates['text_effective_date_2'] = text_effective_date_283f74,
    codeStates['settext_effective_date_2'] = settext_effective_date_283f74,
    codeStates['effective_date'] = effective_date585df,
    codeStates['seteffective_date'] = seteffective_date585df,
    codeStates['expiry_date'] = expiry_dated0967,
    codeStates['setexpiry_date'] = setexpiry_dated0967,
    codeStates['completed_on'] = completed_on67679,
    codeStates['setcompleted_on'] = setcompleted_on67679,
    codeStates['cert_temp_text'] = cert_temp_textea047,
    codeStates['setcert_temp_text'] = setcert_temp_textea047,
    codeStates['template_name'] = template_name5834f,
    codeStates['settemplate_name'] = settemplate_name5834f,
    codeStates['is_recertification'] = is_recertificationa8241,
    codeStates['setis_recertification'] = setis_recertificationa8241,
    codeStates['is_active'] = is_active72c74,
    codeStates['setis_active'] = setis_active72c74,
    codeStates['grounding_group_1'] = grounding_group_19abb8,
    codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
    codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
    codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgrounding_groupdf2f5Props((pre:any)=>({...pre,validation:true}))
 },[effective_date585df?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (effective_date585df?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `14 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!border-[1px]"
      //label={keyset("")}
      value={grounding_groupdf2f5?.effective_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {effective_date585df?.isDisabled ? true : false}
      disabled= {effective_date585df?.isDisabled ? true : false}
      contentAlign={"center"}
      dateValidation=""
      validationState={validate?.editCertificate_v1?.effective_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickereffective_date
