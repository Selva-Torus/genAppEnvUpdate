

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


const DatePickertrs_created_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps  
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps  
  const {grounding_text80bed, setgrounding_text80bed}= useContext(TotalContext) as TotalContextProps  
  const {cert_code_text_15adbc, setcert_code_text_15adbc}= useContext(TotalContext) as TotalContextProps  
  const {cert_code_text0fa1b, setcert_code_text0fa1b}= useContext(TotalContext) as TotalContextProps  
  const {text_statusa2d30, settext_statusa2d30}= useContext(TotalContext) as TotalContextProps  
  const {certification_idb4ceb, setcertification_idb4ceb}= useContext(TotalContext) as TotalContextProps  
  const {cert_code74900, setcert_code74900}= useContext(TotalContext) as TotalContextProps  
  const {cert_status_code2f5be, setcert_status_code2f5be}= useContext(TotalContext) as TotalContextProps  
  const {cert_code_text_126c1f4, setcert_code_text_126c1f4}= useContext(TotalContext) as TotalContextProps  
  const {cert_code_text_1_12e212, setcert_code_text_1_12e212}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_by0b26f, settrs_created_by0b26f}= useContext(TotalContext) as TotalContextProps  
  const {trs_created_date297b9, settrs_created_date297b9}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,trs_created_date:undefined}}));
  if (!date) {
    setgrounding_group_19abb8((prev: any) => ({ ...prev, trs_created_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setgrounding_group_19abb8((prev: any) => ({ ...prev, trs_created_date: isoDate }))
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
        "714415292c394b20a86570cff659abb8",
        "780bc691c62b492eb263a48ea8e297b9"
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
    codeStates['grounding_group_1'] = grounding_group_19abb8,
    codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
    codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
    codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
    codeStates['grounding_text'] = grounding_text80bed,
    codeStates['setgrounding_text'] = setgrounding_text80bed,
    codeStates['cert_code_text_1'] = cert_code_text_15adbc,
    codeStates['setcert_code_text_1'] = setcert_code_text_15adbc,
    codeStates['cert_code_text'] = cert_code_text0fa1b,
    codeStates['setcert_code_text'] = setcert_code_text0fa1b,
    codeStates['text_status'] = text_statusa2d30,
    codeStates['settext_status'] = settext_statusa2d30,
    codeStates['certification_id'] = certification_idb4ceb,
    codeStates['setcertification_id'] = setcertification_idb4ceb,
    codeStates['cert_code'] = cert_code74900,
    codeStates['setcert_code'] = setcert_code74900,
    codeStates['cert_status_code'] = cert_status_code2f5be,
    codeStates['setcert_status_code'] = setcert_status_code2f5be,
    codeStates['cert_code_text_12'] = cert_code_text_126c1f4,
    codeStates['setcert_code_text_12'] = setcert_code_text_126c1f4,
    codeStates['cert_code_text_1_1'] = cert_code_text_1_12e212,
    codeStates['setcert_code_text_1_1'] = setcert_code_text_1_12e212,
    codeStates['trs_created_by'] = trs_created_by0b26f,
    codeStates['settrs_created_by'] = settrs_created_by0b26f,
    codeStates['trs_created_date'] = trs_created_date297b9,
    codeStates['settrs_created_date'] = settrs_created_date297b9,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setgrounding_group_19abb8Props((pre:any)=>({...pre,validation:true}))
 },[trs_created_date297b9?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (trs_created_date297b9?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `9 / 17`,gridRow: `30 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!border-[1px]"
      //label={keyset("")}
      value={grounding_group_19abb8?.trs_created_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled={ true }
      contentAlign={"center"}
      dateValidation=""
      validationState={validate?.editCertificate_v1?.trs_created_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickertrs_created_date
