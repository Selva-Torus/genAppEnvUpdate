'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconskills_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
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
  const {skills_icon4cbbc, setskills_icon4cbbc}= useContext(TotalContext) as TotalContextProps
  const {skill_textb79c7, setskill_textb79c7}= useContext(TotalContext) as TotalContextProps
  const {skill_desb14d6, setskill_desb14d6}= useContext(TotalContext) as TotalContextProps
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
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "e32afbf567b63024ae1573641c992cc8",
      "52be76dabc2dce2216079e3a0bd4cbbc"
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

  if (skills_icon4cbbc?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 3`,gridRow: `1 / 12`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-blue-600"
      data="MdOutlineAssessment"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconskills_icon
