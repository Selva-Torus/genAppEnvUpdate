'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textplocy_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {total_employees_group93757, settotal_employees_group93757}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group93757Props, settotal_employees_group93757Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312a, setemp_group3312a}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312aProps, setemp_group3312aProps}= useContext(TotalContext) as TotalContextProps;
  const {plocy_textfda84, setplocy_textfda84}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51, settotal_employees_table02f51}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51Props, settotal_employees_table02f51Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[plocy_textfda84?.refresh])

  if (plocy_textfda84?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-black !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Leave Policy")}
</Text>
  </div>
  )
}

export default Textplocy_text
