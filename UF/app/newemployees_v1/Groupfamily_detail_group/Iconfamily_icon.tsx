'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconfamily_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
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
  const {family_iconafa72, setfamily_iconafa72}= useContext(TotalContext) as TotalContextProps
  const {fam_textcf8be, setfam_textcf8be}= useContext(TotalContext) as TotalContextProps
  const {family_desb62f4, setfamily_desb62f4}= useContext(TotalContext) as TotalContextProps
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "2bfc28e4b8f0480d8115a27401a800b7",
      "4e8131361c8b4b848063566c800afa72"
    );
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    handleCode()
  }, [])

  if (family_iconafa72?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 3`,gridRow: `1 / 12`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-blue-600"
      data="MdFamilyRestroom"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconfamily_icon
