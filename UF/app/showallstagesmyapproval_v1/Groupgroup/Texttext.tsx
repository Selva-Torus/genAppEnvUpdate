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

const Texttext = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_groupc4a49, setoverall_groupc4a49}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupc4a49Props, setoverall_groupc4a49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27, setai_asset_version_table_group1bd27}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27Props, setai_asset_version_table_group1bd27Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012, setgroupe4012}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012Props, setgroupe4012Props}= useContext(TotalContext) as TotalContextProps;
  const {textab450, settextab450}= useContext(TotalContext) as TotalContextProps;
  const {asset_coded6048, setasset_coded6048}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0b551, setasset_name0b551}= useContext(TotalContext) as TotalContextProps;
  const {cert_codecea1f, setcert_codecea1f}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99eb, setstages_tableb99eb}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99ebProps, setstages_tableb99ebProps}= useContext(TotalContext) as TotalContextProps;
  const {textab450Props, settextab450Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textab450?.refresh])

  if (textab450?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 8`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Asset Info")}
</Text>
  </div>
  )
}

export default Texttext
