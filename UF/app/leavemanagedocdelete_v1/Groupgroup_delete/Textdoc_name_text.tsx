'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textdoc_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_delete617ef, setgroup_delete617ef}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617efProps, setgroup_delete617efProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_top168f7, setdivider_top168f7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text2560c, setdelete_heading_text2560c}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt17233, setattachment_id_txt17233}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id987ae, setattachment_id987ae}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textffd12, setdoc_group_textffd12}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3263c, setdoc_group3263c}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text76c54, setdoc_name_text76c54}= useContext(TotalContext) as TotalContextProps;
  const {doc_name2d223, setdoc_name2d223}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte87c8, settrs_created_by_texte87c8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3ee0e, settrs_created_by3ee0e}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbbf51, setconfo_textbbf51}= useContext(TotalContext) as TotalContextProps;
  const {divider77bc6, setdivider77bc6}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id3cec0, setleave_req_id3cec0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc4f32, setcancel_buttonc4f32}= useContext(TotalContext) as TotalContextProps;
  const {ok_button0c2f2, setok_button0c2f2}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[doc_name_text76c54?.refresh])

  if (doc_name_text76c54?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `23 / 28`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Document Name")}
</Text>
  </div>
  )
}

export default Textdoc_name_text
