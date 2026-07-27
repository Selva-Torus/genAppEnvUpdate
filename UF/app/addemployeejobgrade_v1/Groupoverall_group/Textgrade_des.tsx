'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textgrade_des = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_groupfc238, setoverall_groupfc238}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupfc238Props, setoverall_groupfc238Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_title7a754, setgrade_title7a754}= useContext(TotalContext) as TotalContextProps;
  const {grade_desefd9c, setgrade_desefd9c}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50, setgrade_information_groupddd50}= useContext(TotalContext) as TotalContextProps;
  const {grade_information_groupddd50Props, setgrade_information_groupddd50Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64, setcompensation_benfits_group49b64}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_group49b64Props, setcompensation_benfits_group49b64Props}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880, sethr_policies_group0f880}= useContext(TotalContext) as TotalContextProps;
  const {hr_policies_group0f880Props, sethr_policies_group0f880Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_iddb511, setgrade_iddb511}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_desefd9c?.refresh])

  if (grade_desefd9c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `12 / 18`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Create and configure job grades to define employee levels, compensation ranges, benefits eligibility, and HR policies across the organization.")}
</Text>
  </div>
  )
}

export default Textgrade_des
