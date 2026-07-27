

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
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


const DatePickerhire_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
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
  const {new_employee_groupdf01f, setnew_employee_groupdf01f}= useContext(TotalContext) as TotalContextProps  
  const {new_employee_groupdf01fProps, setnew_employee_groupdf01fProps}= useContext(TotalContext) as TotalContextProps  
  const {basic_details_groupe03ea, setbasic_details_groupe03ea}= useContext(TotalContext) as TotalContextProps  
  const {basic_details_groupe03eaProps, setbasic_details_groupe03eaProps}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_group3ff3d, setcontact_details_group3ff3d}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_group3ff3dProps, setcontact_details_group3ff3dProps}= useContext(TotalContext) as TotalContextProps  
  const {address_details_group75e08, setaddress_details_group75e08}= useContext(TotalContext) as TotalContextProps  
  const {address_details_group75e08Props, setaddress_details_group75e08Props}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group20918, setidentity_details_group20918}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group20918Props, setidentity_details_group20918Props}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group2c703, setemployment_details_group2c703}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group2c703Props, setemployment_details_group2c703Props}= useContext(TotalContext) as TotalContextProps  
  const {employment_details91e0a, setemployment_details91e0a}= useContext(TotalContext) as TotalContextProps  
  const {employment_type9321e, setemployment_type9321e}= useContext(TotalContext) as TotalContextProps  
  const {employment_status78e5b, setemployment_status78e5b}= useContext(TotalContext) as TotalContextProps  
  const {hire_date31217, sethire_date31217}= useContext(TotalContext) as TotalContextProps  
  const {confirmation_date350d6, setconfirmation_date350d6}= useContext(TotalContext) as TotalContextProps  
  const {probation_end_datefb160, setprobation_end_datefb160}= useContext(TotalContext) as TotalContextProps  
  const {work_modefea3c, setwork_modefea3c}= useContext(TotalContext) as TotalContextProps  
  const {time_zoneba768, settime_zoneba768}= useContext(TotalContext) as TotalContextProps  
  const {hr_manager_idec19f, sethr_manager_idec19f}= useContext(TotalContext) as TotalContextProps  
  const {reporting_mmanager_id7f8b5, setreporting_mmanager_id7f8b5}= useContext(TotalContext) as TotalContextProps  
  const {compensation_details_group83106, setcompensation_details_group83106}= useContext(TotalContext) as TotalContextProps  
  const {compensation_details_group83106Props, setcompensation_details_group83106Props}= useContext(TotalContext) as TotalContextProps  
  const {bank_detailsf21b7, setbank_detailsf21b7}= useContext(TotalContext) as TotalContextProps  
  const {bank_detailsf21b7Props, setbank_detailsf21b7Props}= useContext(TotalContext) as TotalContextProps  
  const {emergency_contact_groupd1907, setemergency_contact_groupd1907}= useContext(TotalContext) as TotalContextProps  
  const {emergency_contact_groupd1907Props, setemergency_contact_groupd1907Props}= useContext(TotalContext) as TotalContextProps  
  const {skills_education_groupd1667, setskills_education_groupd1667}= useContext(TotalContext) as TotalContextProps  
  const {skills_education_groupd1667Props, setskills_education_groupd1667Props}= useContext(TotalContext) as TotalContextProps  
  const {skills_group92cc8, setskills_group92cc8}= useContext(TotalContext) as TotalContextProps  
  const {skills_group92cc8Props, setskills_group92cc8Props}= useContext(TotalContext) as TotalContextProps  
  const {skilld0dba, setskilld0dba}= useContext(TotalContext) as TotalContextProps  
  const {skilld0dbaProps, setskilld0dbaProps}= useContext(TotalContext) as TotalContextProps  
  const {education_groupcd288, seteducation_groupcd288}= useContext(TotalContext) as TotalContextProps  
  const {education_groupcd288Props, seteducation_groupcd288Props}= useContext(TotalContext) as TotalContextProps  
  const {education28de7, seteducation28de7}= useContext(TotalContext) as TotalContextProps  
  const {education28de7Props, seteducation28de7Props}= useContext(TotalContext) as TotalContextProps  
  const {cert_group3be86, setcert_group3be86}= useContext(TotalContext) as TotalContextProps  
  const {cert_group3be86Props, setcert_group3be86Props}= useContext(TotalContext) as TotalContextProps  
  const {certification02740, setcertification02740}= useContext(TotalContext) as TotalContextProps  
  const {certification02740Props, setcertification02740Props}= useContext(TotalContext) as TotalContextProps  
  const {family_detail_group496b3, setfamily_detail_group496b3}= useContext(TotalContext) as TotalContextProps  
  const {family_detail_group496b3Props, setfamily_detail_group496b3Props}= useContext(TotalContext) as TotalContextProps  
  const {famly_detailsb4eb8, setfamly_detailsb4eb8}= useContext(TotalContext) as TotalContextProps  
  const {famly_detailsb4eb8Props, setfamly_detailsb4eb8Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,hire_date:undefined}}));
  if (!date) {
    setemployment_details_group2c703((prev: any) => ({ ...prev, hire_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setemployment_details_group2c703((prev: any) => ({ ...prev, hire_date: isoDate }))
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
        "47ab0503c3ef42c41f62b7cc6712c703",
        "965a9cb54f1b672014f11110f3e31217"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_employee_group'] = new_employee_groupdf01f,
    codeStates['setnew_employee_group'] = setnew_employee_groupdf01f,
    codeStates['new_employee_groupdf01f'] = new_employee_groupdf01fProps,
    codeStates['setnew_employee_groupdf01f'] = setnew_employee_groupdf01fProps,
    codeStates['basic_details_group'] = basic_details_groupe03ea,
    codeStates['setbasic_details_group'] = setbasic_details_groupe03ea,
    codeStates['basic_details_groupe03ea'] = basic_details_groupe03eaProps,
    codeStates['setbasic_details_groupe03ea'] = setbasic_details_groupe03eaProps,
    codeStates['contact_details_group'] = contact_details_group3ff3d,
    codeStates['setcontact_details_group'] = setcontact_details_group3ff3d,
    codeStates['contact_details_group3ff3d'] = contact_details_group3ff3dProps,
    codeStates['setcontact_details_group3ff3d'] = setcontact_details_group3ff3dProps,
    codeStates['address_details_group'] = address_details_group75e08,
    codeStates['setaddress_details_group'] = setaddress_details_group75e08,
    codeStates['address_details_group75e08'] = address_details_group75e08Props,
    codeStates['setaddress_details_group75e08'] = setaddress_details_group75e08Props,
    codeStates['identity_details_group'] = identity_details_group20918,
    codeStates['setidentity_details_group'] = setidentity_details_group20918,
    codeStates['identity_details_group20918'] = identity_details_group20918Props,
    codeStates['setidentity_details_group20918'] = setidentity_details_group20918Props,
    codeStates['employment_details_group'] = employment_details_group2c703,
    codeStates['setemployment_details_group'] = setemployment_details_group2c703,
    codeStates['employment_details_group2c703'] = employment_details_group2c703Props,
    codeStates['setemployment_details_group2c703'] = setemployment_details_group2c703Props,
    codeStates['employment_details'] = employment_details91e0a,
    codeStates['setemployment_details'] = setemployment_details91e0a,
    codeStates['employment_type'] = employment_type9321e,
    codeStates['setemployment_type'] = setemployment_type9321e,
    codeStates['employment_status'] = employment_status78e5b,
    codeStates['setemployment_status'] = setemployment_status78e5b,
    codeStates['hire_date'] = hire_date31217,
    codeStates['sethire_date'] = sethire_date31217,
    codeStates['confirmation_date'] = confirmation_date350d6,
    codeStates['setconfirmation_date'] = setconfirmation_date350d6,
    codeStates['probation_end_date'] = probation_end_datefb160,
    codeStates['setprobation_end_date'] = setprobation_end_datefb160,
    codeStates['work_mode'] = work_modefea3c,
    codeStates['setwork_mode'] = setwork_modefea3c,
    codeStates['time_zone'] = time_zoneba768,
    codeStates['settime_zone'] = settime_zoneba768,
    codeStates['hr_manager_id'] = hr_manager_idec19f,
    codeStates['sethr_manager_id'] = sethr_manager_idec19f,
    codeStates['reporting_mmanager_id'] = reporting_mmanager_id7f8b5,
    codeStates['setreporting_mmanager_id'] = setreporting_mmanager_id7f8b5,
    codeStates['compensation_details_group'] = compensation_details_group83106,
    codeStates['setcompensation_details_group'] = setcompensation_details_group83106,
    codeStates['compensation_details_group83106'] = compensation_details_group83106Props,
    codeStates['setcompensation_details_group83106'] = setcompensation_details_group83106Props,
    codeStates['bank_details'] = bank_detailsf21b7,
    codeStates['setbank_details'] = setbank_detailsf21b7,
    codeStates['bank_detailsf21b7'] = bank_detailsf21b7Props,
    codeStates['setbank_detailsf21b7'] = setbank_detailsf21b7Props,
    codeStates['emergency_contact_group'] = emergency_contact_groupd1907,
    codeStates['setemergency_contact_group'] = setemergency_contact_groupd1907,
    codeStates['emergency_contact_groupd1907'] = emergency_contact_groupd1907Props,
    codeStates['setemergency_contact_groupd1907'] = setemergency_contact_groupd1907Props,
    codeStates['skills_education_group'] = skills_education_groupd1667,
    codeStates['setskills_education_group'] = setskills_education_groupd1667,
    codeStates['skills_education_groupd1667'] = skills_education_groupd1667Props,
    codeStates['setskills_education_groupd1667'] = setskills_education_groupd1667Props,
    codeStates['skills_group'] = skills_group92cc8,
    codeStates['setskills_group'] = setskills_group92cc8,
    codeStates['skills_group92cc8'] = skills_group92cc8Props,
    codeStates['setskills_group92cc8'] = setskills_group92cc8Props,
    codeStates['skill'] = skilld0dba,
    codeStates['setskill'] = setskilld0dba,
    codeStates['skilld0dba'] = skilld0dbaProps,
    codeStates['setskilld0dba'] = setskilld0dbaProps,
    codeStates['education_group'] = education_groupcd288,
    codeStates['seteducation_group'] = seteducation_groupcd288,
    codeStates['education_groupcd288'] = education_groupcd288Props,
    codeStates['seteducation_groupcd288'] = seteducation_groupcd288Props,
    codeStates['education'] = education28de7,
    codeStates['seteducation'] = seteducation28de7,
    codeStates['education28de7'] = education28de7Props,
    codeStates['seteducation28de7'] = seteducation28de7Props,
    codeStates['cert_group'] = cert_group3be86,
    codeStates['setcert_group'] = setcert_group3be86,
    codeStates['cert_group3be86'] = cert_group3be86Props,
    codeStates['setcert_group3be86'] = setcert_group3be86Props,
    codeStates['certification'] = certification02740,
    codeStates['setcertification'] = setcertification02740,
    codeStates['certification02740'] = certification02740Props,
    codeStates['setcertification02740'] = setcertification02740Props,
    codeStates['family_detail_group'] = family_detail_group496b3,
    codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
    codeStates['family_detail_group496b3'] = family_detail_group496b3Props,
    codeStates['setfamily_detail_group496b3'] = setfamily_detail_group496b3Props,
    codeStates['famly_details'] = famly_detailsb4eb8,
    codeStates['setfamly_details'] = setfamly_detailsb4eb8,
    codeStates['famly_detailsb4eb8'] = famly_detailsb4eb8Props,
    codeStates['setfamly_detailsb4eb8'] = setfamly_detailsb4eb8Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setemployment_details_group2c703Props((pre:any)=>({...pre,validation:true}))
 },[hire_date31217?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (hire_date31217?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 19`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={employment_details_group2c703?.hire_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {hire_date31217?.isDisabled ? true : false}
      disabled= {hire_date31217?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Hire Date"
      dateValidation=""
      validationState={validate?.viewNewEmployees_v1?.hire_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerhire_date
