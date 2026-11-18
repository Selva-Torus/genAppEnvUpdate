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

const Textrevocation_reason_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group1428f, setdel_group1428f}= useContext(TotalContext) as TotalContextProps;
  const {del_group1428fProps, setdel_group1428fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtebcb8, setdelete_heading_txtebcb8}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_127efe, setdel_divider_127efe}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id_text79504, setauthority_grant_id_text79504}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_id84597, setauthority_grant_id84597}= useContext(TotalContext) as TotalContextProps;
  const {grant_code_text94baa, setgrant_code_text94baa}= useContext(TotalContext) as TotalContextProps;
  const {grant_code8a454, setgrant_code8a454}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txn_textec183, setmax_amount_per_txn_textec183}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txnd3f90, setmax_amount_per_txnd3f90}= useContext(TotalContext) as TotalContextProps;
  const {currency_text0fee1, setcurrency_text0fee1}= useContext(TotalContext) as TotalContextProps;
  const {currencye5d71, setcurrencye5d71}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reason_texte522e, setrevocation_reason_texte522e}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reasonb4abb, setrevocation_reasonb4abb}= useContext(TotalContext) as TotalContextProps;
  const {statust_textcc6bd, setstatust_textcc6bd}= useContext(TotalContext) as TotalContextProps;
  const {status66a0b, setstatus66a0b}= useContext(TotalContext) as TotalContextProps;
  const {text6cc24, settext6cc24}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28ee76, setdel_divider_28ee76}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn6d001, setdel_cancel_btn6d001}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn256dd, setdel_okl_btn256dd}= useContext(TotalContext) as TotalContextProps;
  const {revocation_reason_texte522eProps, setrevocation_reason_texte522eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[revocation_reason_texte522e?.refresh])

  if (revocation_reason_texte522e?.isHidden) {
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
      {keyset("Revocation Reason")}
</Text>
  </div>
  )
}

export default Textrevocation_reason_text
