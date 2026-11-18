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

const Texttext = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group3becd, setdel_group3becd}= useContext(TotalContext) as TotalContextProps;
  const {del_group3becdProps, setdel_group3becdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc7473, setdelete_heading_txtc7473}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1f696f, setdel_divider_1f696f}= useContext(TotalContext) as TotalContextProps;
  const {ref_name_textaabe8, setref_name_textaabe8}= useContext(TotalContext) as TotalContextProps;
  const {ref_name9d1bd, setref_name9d1bd}= useContext(TotalContext) as TotalContextProps;
  const {vault_path_textf581e, setvault_path_textf581e}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf1128, setvault_pathf1128}= useContext(TotalContext) as TotalContextProps;
  const {credential_type_text132b9, setcredential_type_text132b9}= useContext(TotalContext) as TotalContextProps;
  const {credential_type67f51, setcredential_type67f51}= useContext(TotalContext) as TotalContextProps;
  const {texta0b32, settexta0b32}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_207f16, setdel_divider_207f16}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idc5f97, setcredential_ref_idc5f97}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9c8ad, setdel_cancel_btn9c8ad}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnc484c, setdel_okl_btnc484c}= useContext(TotalContext) as TotalContextProps;
  const {texta0b32Props, settexta0b32Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[texta0b32?.refresh])

  if (texta0b32?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `28 / 33`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("⚠️ This action cannot be undone")}
</Text>
  </div>
  )
}

export default Texttext
