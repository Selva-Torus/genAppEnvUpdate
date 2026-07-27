'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textemployee_name = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {review_id_text98d83, setreview_id_text98d83}= useContext(TotalContext) as TotalContextProps;
  const {review_id1df70, setreview_id1df70}= useContext(TotalContext) as TotalContextProps;
  const {employee_name61cfc, setemployee_name61cfc}= useContext(TotalContext) as TotalContextProps;
  const {full_namebcb8e, setfull_namebcb8e}= useContext(TotalContext) as TotalContextProps;
  const {review_number_text7becd, setreview_number_text7becd}= useContext(TotalContext) as TotalContextProps;
  const {review_number1cdea, setreview_number1cdea}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849d, setemployee_doc_tabled849d}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849dProps, setemployee_doc_tabled849dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_name61cfc?.refresh])

  if (employee_name61cfc?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 6`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Employee")}
</Text>
  </div>
  )
}

export default Textemployee_name
