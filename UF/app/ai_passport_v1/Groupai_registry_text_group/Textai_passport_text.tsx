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

const Textai_passport_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry3961c, setoverall_ai_asset_registry3961c}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3961cProps, setoverall_ai_asset_registry3961cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2f, setai_registry_group7ba2f}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2fProps, setai_registry_group7ba2fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849, setai_registry_text_group8b849}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849Props, setai_registry_text_group8b849Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_passport_text42583, setai_passport_text42583}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5c, setai_registry_table91f5c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5cProps, setai_registry_table91f5cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_passport_text42583Props, setai_passport_text42583Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_passport_text42583?.refresh])

  if (ai_passport_text42583?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("AI Passport")}
</Text>
  </div>
  )
}

export default Textai_passport_text
