'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcategory_information_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {category_group70e38, setcategory_group70e38}= useContext(TotalContext) as TotalContextProps;
  const {category_group70e38Props, setcategory_group70e38Props}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040a, setcategory_information_groupa040a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupa040aProps, setcategory_information_groupa040aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_textf1933, setcategory_information_textf1933}= useContext(TotalContext) as TotalContextProps;
  const {category_codeeb8f1, setcategory_codeeb8f1}= useContext(TotalContext) as TotalContextProps;
  const {category_name2a1ea, setcategory_name2a1ea}= useContext(TotalContext) as TotalContextProps;
  const {parent_category_name9a67f, setparent_category_name9a67f}= useContext(TotalContext) as TotalContextProps;
  const {asset_prefix5007a, setasset_prefix5007a}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09, setcategory_configuration_group06f09}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09Props, setcategory_configuration_group06f09Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[category_information_textf1933?.refresh])

  if (category_information_textf1933?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Category Information")}
</Text>
  </div>
  )
}

export default Textcategory_information_text
