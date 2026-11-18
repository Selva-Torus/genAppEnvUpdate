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

const Textai_registry_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry29963, setoverall_ai_asset_registry29963}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry29963Props, setoverall_ai_asset_registry29963Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9c, setai_registry_groupc1c9c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9cProps, setai_registry_groupc1c9cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfd, setai_registry_text_groupf3cfd}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfdProps, setai_registry_text_groupf3cfdProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text5e358, setai_registry_text5e358}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51, setai_registry_table5bf51}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51Props, setai_registry_table5bf51Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text5e358Props, setai_registry_text5e358Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_registry_text5e358?.refresh])

  if (ai_registry_text5e358?.isHidden) {
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
      {keyset("Identity & Authority Setup")}
</Text>
  </div>
  )
}

export default Textai_registry_text
