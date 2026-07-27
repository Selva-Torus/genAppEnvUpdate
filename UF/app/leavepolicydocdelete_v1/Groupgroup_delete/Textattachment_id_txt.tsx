'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textattachment_id_txt = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_delete34b87, setgroup_delete34b87}= useContext(TotalContext) as TotalContextProps;
  const {group_delete34b87Props, setgroup_delete34b87Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_top46f9f, setdivider_top46f9f}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text27aec, setdelete_heading_text27aec}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txtafea2, setattachment_id_txtafea2}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idb53af, setattachment_idb53af}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text06da8, setdoc_group_text06da8}= useContext(TotalContext) as TotalContextProps;
  const {doc_group6a933, setdoc_group6a933}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text43fe5, setdoc_name_text43fe5}= useContext(TotalContext) as TotalContextProps;
  const {doc_namec14df, setdoc_namec14df}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_textb6f28, settrs_created_by_textb6f28}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by2301e, settrs_created_by2301e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text31826, setconfo_text31826}= useContext(TotalContext) as TotalContextProps;
  const {divider19fb2, setdivider19fb2}= useContext(TotalContext) as TotalContextProps;
  const {policy_idb60b9, setpolicy_idb60b9}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button890a9, setcancel_button890a9}= useContext(TotalContext) as TotalContextProps;
  const {ok_button435a9, setok_button435a9}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[attachment_id_txtafea2?.refresh])

  if (attachment_id_txtafea2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `11 / 16`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Attachment ID")}
</Text>
  </div>
  )
}

export default Textattachment_id_txt
