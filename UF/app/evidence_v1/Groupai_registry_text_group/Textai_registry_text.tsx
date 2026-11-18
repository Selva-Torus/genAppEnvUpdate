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
  const {overall_ai_asset_registryc83ea, setoverall_ai_asset_registryc83ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc83eaProps, setoverall_ai_asset_registryc83eaProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdd31c, setai_registry_groupdd31c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdd31cProps, setai_registry_groupdd31cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0df26, setai_registry_text_group0df26}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0df26Props, setai_registry_text_group0df26Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_textf127e, setai_registry_textf127e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_textsc3687, setai_registry_textsc3687}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tableca876, setai_registry_tableca876}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tableca876Props, setai_registry_tableca876Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_textf127eProps, setai_registry_textf127eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_registry_textf127e?.refresh])

  if (ai_registry_textf127e?.isHidden) {
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
      {keyset("Asset-Evidences")}
</Text>
  </div>
  )
}

export default Textai_registry_text
