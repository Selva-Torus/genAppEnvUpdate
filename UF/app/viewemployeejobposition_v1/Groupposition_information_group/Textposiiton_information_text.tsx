'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textposiiton_information_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {posiiton_information_text98456, setposiiton_information_text98456}= useContext(TotalContext) as TotalContextProps;
  const {position_codea8a48, setposition_codea8a48}= useContext(TotalContext) as TotalContextProps;
  const {position_title6e1ab, setposition_title6e1ab}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf7b05, setdescriptionf7b05}= useContext(TotalContext) as TotalContextProps;
  const {grade_name11b6f, setgrade_name11b6f}= useContext(TotalContext) as TotalContextProps;
  const {employment_type77cb7, setemployment_type77cb7}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredd886e, setexperience_requiredd886e}= useContext(TotalContext) as TotalContextProps;
  const {job_familyebc1e, setjob_familyebc1e}= useContext(TotalContext) as TotalContextProps;
  const {job_level44b70, setjob_level44b70}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8fe, setcompensation_benfits_group0d8fe}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group0d8feProps, setcompensation_benfits_group0d8feProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[posiiton_information_text98456?.refresh])

  if (posiiton_information_text98456?.isHidden) {
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
      {keyset("Position Information")}
</Text>
  </div>
  )
}

export default Textposiiton_information_text
