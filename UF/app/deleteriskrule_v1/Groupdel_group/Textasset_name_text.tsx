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

const Textasset_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group9ef8a, setdel_group9ef8a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9ef8aProps, setdel_group9ef8aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtdb5d3, setdelete_heading_txtdb5d3}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_156db0, setdel_divider_156db0}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text54f6e, setasset_name_text54f6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id410ac, setrisk_rule_id410ac}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text06814, setasset_code_text06814}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_codee559b, setrisk_rule_codee559b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text95c11, setasset_type_code_text95c11}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_code8dc1a, setresult_tier_code8dc1a}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textcc1ba, setrisk_tier_code_textcc1ba}= useContext(TotalContext) as TotalContextProps;
  const {effective_from26db3, seteffective_from26db3}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textacd8e, setlifecycle_status_code_textacd8e}= useContext(TotalContext) as TotalContextProps;
  const {is_active03bb0, setis_active03bb0}= useContext(TotalContext) as TotalContextProps;
  const {texted768, settexted768}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28b40e, setdel_divider_28b40e}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn18f5b, setdel_cancel_btn18f5b}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2baeb, setdel_okl_btn2baeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text54f6eProps, setasset_name_text54f6eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_name_text54f6e?.refresh])

  if (asset_name_text54f6e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `10 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Risk Rule ID")}
</Text>
  </div>
  )
}

export default Textasset_name_text
