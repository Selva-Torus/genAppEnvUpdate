'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textgrade_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_groupe6469, setdoc_attached_groupe6469}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe6469Props, setdoc_attached_groupe6469Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33, settable_group16d33}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33Props, settable_group16d33Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652a, setgrade_doc_tablea652a}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652aProps, setgrade_doc_tablea652aProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanela5371, setdocumentuploadpanela5371}= useContext(TotalContext) as TotalContextProps;
  const {grade_id91bb0, setgrade_id91bb0}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docc82a5, setbutton_add_docc82a5}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[grade_id91bb0?.refresh])

  if (grade_id91bb0?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 3`,gridRow: `141 / 142`, gap:``, height: `100%`}} >
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

export default Textgrade_id
