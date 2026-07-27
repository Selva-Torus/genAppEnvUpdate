

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
  const {new_employee_group42d78, setnew_employee_group42d78}= useContext(TotalContext) as TotalContextProps  
  const {new_employee_group42d78Props, setnew_employee_group42d78Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps  
  const {basic_details_groupd39fd, setbasic_details_groupd39fd}= useContext(TotalContext) as TotalContextProps  
  const {basic_details_groupd39fdProps, setbasic_details_groupd39fdProps}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_groupa1911, setcontact_details_groupa1911}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_groupa1911Props, setcontact_details_groupa1911Props}= useContext(TotalContext) as TotalContextProps  
  const {address_details_groupb72f4, setaddress_details_groupb72f4}= useContext(TotalContext) as TotalContextProps  
  const {address_details_groupb72f4Props, setaddress_details_groupb72f4Props}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group6a6fe, setidentity_details_group6a6fe}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group6a6feProps, setidentity_details_group6a6feProps}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group89cd6, setemployment_details_group89cd6}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group89cd6Props, setemployment_details_group89cd6Props}= useContext(TotalContext) as TotalContextProps  
  const {employment_details12445, setemployment_details12445}= useContext(TotalContext) as TotalContextProps  
  const {employment_type0a7c5, setemployment_type0a7c5}= useContext(TotalContext) as TotalContextProps  
  const {employment_statusb6594, setemployment_statusb6594}= useContext(TotalContext) as TotalContextProps  
  const {hire_date039f8, sethire_date039f8}= useContext(TotalContext) as TotalContextProps  
  const {confirmation_date264bb, setconfirmation_date264bb}= useContext(TotalContext) as TotalContextProps  
  const {probation_end_dated4862, setprobation_end_dated4862}= useContext(TotalContext) as TotalContextProps  
  const {work_mode83dbf, setwork_mode83dbf}= useContext(TotalContext) as TotalContextProps  
  const {time_zonec76a9, settime_zonec76a9}= useContext(TotalContext) as TotalContextProps  
  const {hr_manager_id385b1, sethr_manager_id385b1}= useContext(TotalContext) as TotalContextProps  
  const {reporting_mmanager_id99b9a, setreporting_mmanager_id99b9a}= useContext(TotalContext) as TotalContextProps  
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1}= useContext(TotalContext) as TotalContextProps  
  const {compensation_details_groupf9ef1Props, setcompensation_details_groupf9ef1Props}= useContext(TotalContext) as TotalContextProps  
  const {bank_details820cd, setbank_details820cd}= useContext(TotalContext) as TotalContextProps  
  const {bank_details820cdProps, setbank_details820cdProps}= useContext(TotalContext) as TotalContextProps  
  const {emergency_contact_group73988, setemergency_contact_group73988}= useContext(TotalContext) as TotalContextProps  
  const {emergency_contact_group73988Props, setemergency_contact_group73988Props}= useContext(TotalContext) as TotalContextProps  
  const {skills_education_groupcb53a, setskills_education_groupcb53a}= useContext(TotalContext) as TotalContextProps  
  const {skills_education_groupcb53aProps, setskills_education_groupcb53aProps}= useContext(TotalContext) as TotalContextProps  
  const {skills_group36679, setskills_group36679}= useContext(TotalContext) as TotalContextProps  
  const {skills_group36679Props, setskills_group36679Props}= useContext(TotalContext) as TotalContextProps  
  const {skill9f89a, setskill9f89a}= useContext(TotalContext) as TotalContextProps  
  const {skill9f89aProps, setskill9f89aProps}= useContext(TotalContext) as TotalContextProps  
  const {education_group70757, seteducation_group70757}= useContext(TotalContext) as TotalContextProps  
  const {education_group70757Props, seteducation_group70757Props}= useContext(TotalContext) as TotalContextProps  
  const {education2393a, seteducation2393a}= useContext(TotalContext) as TotalContextProps  
  const {education2393aProps, seteducation2393aProps}= useContext(TotalContext) as TotalContextProps  
  const {cert_groupedb63, setcert_groupedb63}= useContext(TotalContext) as TotalContextProps  
  const {cert_groupedb63Props, setcert_groupedb63Props}= useContext(TotalContext) as TotalContextProps  
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps  
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps  
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps  
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps  
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps  
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


          const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'))

const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,hire_date: "invalid"}}))
    setemployment_details_group89cd6((prev: any) => ({ ...prev, hire_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,hire_date:undefined}}));
  if (!date) {
    setemployment_details_group89cd6((prev: any) => ({ ...prev, hire_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setemployment_details_group89cd6((prev: any) => ({ ...prev, hire_date: isoDate }))
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
      if(employment_details_group89cd6?.hire_date == "" || employment_details_group89cd6?.hire_date == undefined){
        const result = v.safeParse(schema, employment_details_group89cd6?.hire_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,hire_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "143f5a610fef49deaa528d5f35a89cd6",
        "445d0fa600a04c398df8937d9b8039f8"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_employee_group'] = new_employee_group42d78,
    codeStates['setnew_employee_group'] = setnew_employee_group42d78,
    codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
    codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
    codeStates['dynamicactions'] = dynamicactionsa8358,
    codeStates['setdynamicactions'] = setdynamicactionsa8358,
    codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
    codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
    codeStates['basic_details_group'] = basic_details_groupd39fd,
    codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
    codeStates['basic_details_groupd39fd'] = basic_details_groupd39fdProps,
    codeStates['setbasic_details_groupd39fd'] = setbasic_details_groupd39fdProps,
    codeStates['contact_details_group'] = contact_details_groupa1911,
    codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
    codeStates['contact_details_groupa1911'] = contact_details_groupa1911Props,
    codeStates['setcontact_details_groupa1911'] = setcontact_details_groupa1911Props,
    codeStates['address_details_group'] = address_details_groupb72f4,
    codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
    codeStates['address_details_groupb72f4'] = address_details_groupb72f4Props,
    codeStates['setaddress_details_groupb72f4'] = setaddress_details_groupb72f4Props,
    codeStates['identity_details_group'] = identity_details_group6a6fe,
    codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
    codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
    codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
    codeStates['employment_details_group'] = employment_details_group89cd6,
    codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
    codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
    codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
    codeStates['employment_details'] = employment_details12445,
    codeStates['setemployment_details'] = setemployment_details12445,
    codeStates['employment_type'] = employment_type0a7c5,
    codeStates['setemployment_type'] = setemployment_type0a7c5,
    codeStates['employment_status'] = employment_statusb6594,
    codeStates['setemployment_status'] = setemployment_statusb6594,
    codeStates['hire_date'] = hire_date039f8,
    codeStates['sethire_date'] = sethire_date039f8,
    codeStates['confirmation_date'] = confirmation_date264bb,
    codeStates['setconfirmation_date'] = setconfirmation_date264bb,
    codeStates['probation_end_date'] = probation_end_dated4862,
    codeStates['setprobation_end_date'] = setprobation_end_dated4862,
    codeStates['work_mode'] = work_mode83dbf,
    codeStates['setwork_mode'] = setwork_mode83dbf,
    codeStates['time_zone'] = time_zonec76a9,
    codeStates['settime_zone'] = settime_zonec76a9,
    codeStates['hr_manager_id'] = hr_manager_id385b1,
    codeStates['sethr_manager_id'] = sethr_manager_id385b1,
    codeStates['reporting_mmanager_id'] = reporting_mmanager_id99b9a,
    codeStates['setreporting_mmanager_id'] = setreporting_mmanager_id99b9a,
    codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
    codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
    codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
    codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
    codeStates['bank_details'] = bank_details820cd,
    codeStates['setbank_details'] = setbank_details820cd,
    codeStates['bank_details820cd'] = bank_details820cdProps,
    codeStates['setbank_details820cd'] = setbank_details820cdProps,
    codeStates['emergency_contact_group'] = emergency_contact_group73988,
    codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
    codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
    codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
    codeStates['skills_education_group'] = skills_education_groupcb53a,
    codeStates['setskills_education_group'] = setskills_education_groupcb53a,
    codeStates['skills_education_groupcb53a'] = skills_education_groupcb53aProps,
    codeStates['setskills_education_groupcb53a'] = setskills_education_groupcb53aProps,
    codeStates['skills_group'] = skills_group36679,
    codeStates['setskills_group'] = setskills_group36679,
    codeStates['skills_group36679'] = skills_group36679Props,
    codeStates['setskills_group36679'] = setskills_group36679Props,
    codeStates['skill'] = skill9f89a,
    codeStates['setskill'] = setskill9f89a,
    codeStates['skill9f89a'] = skill9f89aProps,
    codeStates['setskill9f89a'] = setskill9f89aProps,
    codeStates['education_group'] = education_group70757,
    codeStates['seteducation_group'] = seteducation_group70757,
    codeStates['education_group70757'] = education_group70757Props,
    codeStates['seteducation_group70757'] = seteducation_group70757Props,
    codeStates['education'] = education2393a,
    codeStates['seteducation'] = seteducation2393a,
    codeStates['education2393a'] = education2393aProps,
    codeStates['seteducation2393a'] = seteducation2393aProps,
    codeStates['cert_group'] = cert_groupedb63,
    codeStates['setcert_group'] = setcert_groupedb63,
    codeStates['cert_groupedb63'] = cert_groupedb63Props,
    codeStates['setcert_groupedb63'] = setcert_groupedb63Props,
    codeStates['certification'] = certificationc7d06,
    codeStates['setcertification'] = setcertificationc7d06,
    codeStates['certificationc7d06'] = certificationc7d06Props,
    codeStates['setcertificationc7d06'] = setcertificationc7d06Props,
    codeStates['family_detail_group'] = family_detail_group800b7,
    codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
    codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
    codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
    codeStates['famly_details'] = famly_detailsb06ea,
    codeStates['setfamly_details'] = setfamly_detailsb06ea,
    codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
    codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setemployment_details_group89cd6Props((pre:any)=>({...pre,validation:true,required:true}))
 },[hire_date039f8?.refresh])

useEffect(()=>{
  if(!employment_details_group89cd6?.hire_date){ 
    setemployment_details_group89cd6Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])


if (hire_date039f8?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 19`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={employment_details_group89cd6?.hire_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {hire_date039f8?.isDisabled ? true : false}
      disabled= {hire_date039f8?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Hire Date"
      dateValidation=""
      validationState={validate?.newEmployees_v1?.hire_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerhire_date
