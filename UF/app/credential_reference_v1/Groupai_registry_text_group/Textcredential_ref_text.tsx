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

const Textcredential_ref_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry28d63, setoverall_ai_asset_registry28d63}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry28d63Props, setoverall_ai_asset_registry28d63Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101, setai_registry_groupd4101}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101Props, setai_registry_groupd4101Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1e, setai_registry_text_group0da1e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1eProps, setai_registry_text_group0da1eProps}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_text06055, setcredential_ref_text06055}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906, setai_registry_table8e906}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906Props, setai_registry_table8e906Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_text06055Props, setcredential_ref_text06055Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[credential_ref_text06055?.refresh])

  if (credential_ref_text06055?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Credential Reference")}
</Text>
  </div>
  )
}

export default Textcredential_ref_text
