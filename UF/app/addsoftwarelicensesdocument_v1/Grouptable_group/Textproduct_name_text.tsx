'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textproduct_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_groupc3d26, setdoc_attached_groupc3d26}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52, settable_group7bc52}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52Props, settable_group7bc52Props}= useContext(TotalContext) as TotalContextProps;
  const {license_id_text641eb, setlicense_id_text641eb}= useContext(TotalContext) as TotalContextProps;
  const {license_idd34c8, setlicense_idd34c8}= useContext(TotalContext) as TotalContextProps;
  const {product_name_textc07aa, setproduct_name_textc07aa}= useContext(TotalContext) as TotalContextProps;
  const {product_name405f8, setproduct_name405f8}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[product_name_textc07aa?.refresh])

  if (product_name_textc07aa?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Product Name")}
</Text>
  </div>
  )
}

export default Textproduct_name_text
