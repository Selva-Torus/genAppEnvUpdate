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
  const {overall_groupae38a, setoverall_groupae38a}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae38aProps, setoverall_groupae38aProps}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {staffing_compensation_text8d8fc, setstaffing_compensation_text8d8fc}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_min6aa6e, setsalary_range_min6aa6e}= useContext(TotalContext) as TotalContextProps;
  const {salary_range_maxebe1d, setsalary_range_maxebe1d}= useContext(TotalContext) as TotalContextProps;
  const {headcount5aefa, setheadcount5aefa}= useContext(TotalContext) as TotalContextProps;
  const {approved_headcount42f81, setapproved_headcount42f81}= useContext(TotalContext) as TotalContextProps;
  const {filled_headcount049fc, setfilled_headcount049fc}= useContext(TotalContext) as TotalContextProps;
  const {vacancy_status989f7, setvacancy_status989f7}= useContext(TotalContext) as TotalContextProps;
  const {remote_allowed76541, setremote_allowed76541}= useContext(TotalContext) as TotalContextProps;
  const {travel_requiredfe60a, settravel_requiredfe60a}= useContext(TotalContext) as TotalContextProps;
  const {is_open18094, setis_open18094}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[staffing_compensation_text8d8fc?.refresh])

  if (staffing_compensation_text8d8fc?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Staffing And Compensation")}
</Text>
  </div>
  )
}

export default Textstaffing_compensation_text
