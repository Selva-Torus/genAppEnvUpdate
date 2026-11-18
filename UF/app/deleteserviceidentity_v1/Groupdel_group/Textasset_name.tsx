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

const Textasset_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group7f870, setdel_group7f870}= useContext(TotalContext) as TotalContextProps;
  const {del_group7f870Props, setdel_group7f870Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtf9471, setdelete_heading_txtf9471}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1321ef, setdel_divider_1321ef}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text5cf8a, setasset_name_text5cf8a}= useContext(TotalContext) as TotalContextProps;
  const {identity_ide840b, setidentity_ide840b}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text9ff1b, setasset_code_text9ff1b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name6163e, setasset_name6163e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text57627, setasset_type_code_text57627}= useContext(TotalContext) as TotalContextProps;
  const {principal_id3e7f4, setprincipal_id3e7f4}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text4fcd1, setrisk_tier_code_text4fcd1}= useContext(TotalContext) as TotalContextProps;
  const {principal_typefe01d, setprincipal_typefe01d}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc44b6, setlifecycle_status_code_textc44b6}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1bb9d, setidentity_provider1bb9d}= useContext(TotalContext) as TotalContextProps;
  const {text9d6d5, settext9d6d5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_23064f, setdel_divider_23064f}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn69608, setdel_cancel_btn69608}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn070a5, setdel_okl_btn070a5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name6163eProps, setasset_name6163eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_name6163e?.refresh])

  if (asset_name6163e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `16 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_name : (del_group7f870?.asset_name || ""))}
</Text>
  </div>
  )
}

export default Textasset_name
