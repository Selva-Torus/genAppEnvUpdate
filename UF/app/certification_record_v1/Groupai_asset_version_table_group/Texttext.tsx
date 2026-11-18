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
  const {overall_groupedc31, setoverall_groupedc31}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupedc31Props, setoverall_groupedc31Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0, setai_asset_version_table_groupc80e0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0Props, setai_asset_version_table_groupc80e0Props}= useContext(TotalContext) as TotalContextProps;
  const {text1d11f, settext1d11f}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button83c8a, setrefresh_button83c8a}= useContext(TotalContext) as TotalContextProps;
  const {search_btn6778f, setsearch_btn6778f}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941, setcertificate_tableaa941}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941Props, setcertificate_tableaa941Props}= useContext(TotalContext) as TotalContextProps;
  const {text1d11fProps, settext1d11fProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text1d11f?.refresh])

  if (text1d11f?.isHidden) {
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
      {keyset("Certification Record - Assets")}
</Text>
  </div>
  )
}

export default Texttext
