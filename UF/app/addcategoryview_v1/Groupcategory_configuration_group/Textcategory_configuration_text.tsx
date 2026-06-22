'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcategory_configuration_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {category_configuration_group06f09, setcategory_configuration_group06f09}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group06f09Props, setcategory_configuration_group06f09Props}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_text66228, setcategory_configuration_text66228}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method50f2f, setdepreciation_method50f2f}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years864b4, setuseful_life_years864b4}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[category_configuration_text66228?.refresh])

  if (category_configuration_text66228?.isHidden) {
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
      {keyset("Category Configuration")}
</Text>
  </div>
  )
}

export default Textcategory_configuration_text
