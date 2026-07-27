

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


const DatePickerdate_of_birth = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {basic_details6ea99, setbasic_details6ea99}= useContext(TotalContext) as TotalContextProps  
  const {employee_code06972, setemployee_code06972}= useContext(TotalContext) as TotalContextProps  
  const {employee_number8b9ab, setemployee_number8b9ab}= useContext(TotalContext) as TotalContextProps  
  const {first_name60ab5, setfirst_name60ab5}= useContext(TotalContext) as TotalContextProps  
  const {middle_name02f8e, setmiddle_name02f8e}= useContext(TotalContext) as TotalContextProps  
  const {last_namece947, setlast_namece947}= useContext(TotalContext) as TotalContextProps  
  const {preferred_nameffc33, setpreferred_nameffc33}= useContext(TotalContext) as TotalContextProps  
  const {gender91e7d, setgender91e7d}= useContext(TotalContext) as TotalContextProps  
  const {blood_group07520, setblood_group07520}= useContext(TotalContext) as TotalContextProps  
  const {date_of_birth4942d, setdate_of_birth4942d}= useContext(TotalContext) as TotalContextProps  
  const {marital_status3bac8, setmarital_status3bac8}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_group3ff3d, setcontact_details_group3ff3d}= useContext(TotalContext) as TotalContextProps  
  const {contact_details_group3ff3dProps, setcontact_details_group3ff3dProps}= useContext(TotalContext) as TotalContextProps  
  const {address_details_group75e08, setaddress_details_group75e08}= useContext(TotalContext) as TotalContextProps  
  const {address_details_group75e08Props, setaddress_details_group75e08Props}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group20918, setidentity_details_group20918}= useContext(TotalContext) as TotalContextProps  
  const {identity_details_group20918Props, setidentity_details_group20918Props}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group2c703, setemployment_details_group2c703}= useContext(TotalContext) as TotalContextProps  
  const {employment_details_group2c703Props, setemployment_details_group2c703Props}= useContext(TotalContext) as TotalContextProps  
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
  setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,date_of_birth:undefined}}));
  if (!date) {
    setbasic_details_groupe03ea((prev: any) => ({ ...prev, date_of_birth: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setbasic_details_groupe03ea((prev: any) => ({ ...prev, date_of_birth: isoDate }))
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
        "5d92c67029c108d489235a37078e03ea",
        "6d2aff59df41202a5a73c0419d74942d"
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
    codeStates['basic_details'] = basic_details6ea99,
    codeStates['setbasic_details'] = setbasic_details6ea99,
    codeStates['employee_code'] = employee_code06972,
    codeStates['setemployee_code'] = setemployee_code06972,
    codeStates['employee_number'] = employee_number8b9ab,
    codeStates['setemployee_number'] = setemployee_number8b9ab,
    codeStates['first_name'] = first_name60ab5,
    codeStates['setfirst_name'] = setfirst_name60ab5,
    codeStates['middle_name'] = middle_name02f8e,
    codeStates['setmiddle_name'] = setmiddle_name02f8e,
    codeStates['last_name'] = last_namece947,
    codeStates['setlast_name'] = setlast_namece947,
    codeStates['preferred_name'] = preferred_nameffc33,
    codeStates['setpreferred_name'] = setpreferred_nameffc33,
    codeStates['gender'] = gender91e7d,
    codeStates['setgender'] = setgender91e7d,
    codeStates['blood_group'] = blood_group07520,
    codeStates['setblood_group'] = setblood_group07520,
    codeStates['date_of_birth'] = date_of_birth4942d,
    codeStates['setdate_of_birth'] = setdate_of_birth4942d,
    codeStates['marital_status'] = marital_status3bac8,
    codeStates['setmarital_status'] = setmarital_status3bac8,
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
  setbasic_details_groupe03eaProps((pre:any)=>({...pre,validation:true}))
 },[date_of_birth4942d?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (date_of_birth4942d?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 7`,gridRow: `33 / 45`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={basic_details_groupe03ea?.date_of_birth}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {date_of_birth4942d?.isDisabled ? true : false}
      disabled= {date_of_birth4942d?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Date of Birth"
      dateValidation=""
      validationState={validate?.viewNewEmployees_v1?.date_of_birth ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdate_of_birth
