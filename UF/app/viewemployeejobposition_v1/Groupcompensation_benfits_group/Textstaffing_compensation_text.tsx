'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textstaffing_compensation_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {overall_group2c693, setoverall_group2c693}= useContext(TotalContext) as TotalContextProps;
  const {overall_group2c693Props, setoverall_group2c693Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802, setposition_information_group67802}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group67802Props, setposition_information_group67802Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text16f4a, setstaffing_compensation_text16f4a}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min31c0f, setsalary_range_min31c0f}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxb8794, setsalary_range_maxb8794}= useContext(TotalContext) as TotalContextProps;
  const {headcount4c5a4, setheadcount4c5a4}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount53c3b, setapproved_headcount53c3b}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount35c2c, setfilled_headcount35c2c}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status83fc0, setvacancy_status83fc0}= useContext(TotalContext) as TotalContextProps;
  const {remote_alloweda2944, setremote_alloweda2944}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredee204, settravel_requiredee204}= useContext(TotalContext) as TotalContextProps;
  const {is_open9bbae, setis_open9bbae}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[staffing_compensation_text16f4a?.refresh])

  if (staffing_compensation_text16f4a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Staffing And Compensation")}
</Text>
  </div>
  )
}

export default Textstaffing_compensation_text
