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

const Textlifecycle_status_code_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_groupd73cb, setdel_groupd73cb}= useContext(TotalContext) as TotalContextProps;
  const {del_groupd73cbProps, setdel_groupd73cbProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt74c2d, setdelete_heading_txt74c2d}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1258b4, setdel_divider_1258b4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7fd5e, setasset_name_text7fd5e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64b8e, setasset_name64b8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text333ee, setasset_code_text333ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeabd34, setasset_codeabd34}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textfadb9, setasset_type_code_textfadb9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code2fd2c, setasset_type_code2fd2c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text398fb, setrisk_tier_code_text398fb}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codea1cf5, setrisk_tier_codea1cf5}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_texte5517, setlifecycle_status_code_texte5517}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code21964, setlifecycle_status_code21964}= useContext(TotalContext) as TotalContextProps;
  const {textb25bd, settextb25bd}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_25d9ec, setdel_divider_25d9ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id005d2, setai_asset_id005d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn0ef33, setdel_cancel_btn0ef33}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn0f4f4, setdel_okl_btn0f4f4}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_texte5517Props, setlifecycle_status_code_texte5517Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[lifecycle_status_code_texte5517?.refresh])

  if (lifecycle_status_code_texte5517?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `34 / 39`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Status")}
</Text>
  </div>
  )
}

export default Textlifecycle_status_code_text
