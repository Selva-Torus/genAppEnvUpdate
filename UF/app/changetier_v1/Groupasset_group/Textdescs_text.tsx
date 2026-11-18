'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdescs_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {code_value_groupa2e67, setcode_value_groupa2e67}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67Props, setcode_value_groupa2e67Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0, setasset_group181c0}= useContext(TotalContext) as TotalContextProps;
  const {asset_group181c0Props, setasset_group181c0Props}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code8866c, setassessed_tier_code8866c}= useContext(TotalContext) as TotalContextProps;
  const {justificationc41ce, setjustificationc41ce}= useContext(TotalContext) as TotalContextProps;
  const {desc_texta0702, setdesc_texta0702}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name8a256, setassigned_login_name8a256}= useContext(TotalContext) as TotalContextProps;
  const {descs_text2e8fe, setdescs_text2e8fe}= useContext(TotalContext) as TotalContextProps;
  const {descs_text2e8feProps, setdescs_text2e8feProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[descs_text2e8fe?.refresh])

  if (descs_text2e8fe?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `66 / 72`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-500"
  variant="body-1"
  color="primary"
>
      {keyset("A move away from previous Tier always needs a second approver.")}
</Text>
  </div>
  )
}

export default Textdescs_text
