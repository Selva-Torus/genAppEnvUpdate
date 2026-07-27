'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textreview_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_group8ed8b, setdoc_attached_group8ed8b}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group8ed8bProps, setdoc_attached_group8ed8bProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4, settable_group106c4}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4Props, settable_group106c4Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849d, setemployee_doc_tabled849d}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849dProps, setemployee_doc_tabled849dProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel9d802, setdocumentuploadpanel9d802}= useContext(TotalContext) as TotalContextProps;
  const {review_idea959, setreview_idea959}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docb64ae, setbutton_add_docb64ae}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[review_idea959?.refresh])

  if (review_idea959?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `3 / 4`,gridRow: `150 / 151`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Lorem ipsum dolor sit")}
</Text>
  </div>
  )
}

export default Textreview_id
