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
  const {overall_group1b28a, setoverall_group1b28a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1b28aProps, setoverall_group1b28aProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ec, setai_asset_version_table_group2d2ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ecProps, setai_asset_version_table_group2d2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {textb98d7, settextb98d7}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button96b75, setrefresh_button96b75}= useContext(TotalContext) as TotalContextProps;
  const {search370c1, setsearch370c1}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61c, setcertificate_table8c61c}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61cProps, setcertificate_table8c61cProps}= useContext(TotalContext) as TotalContextProps;
  const {textb98d7Props, settextb98d7Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textb98d7?.refresh])

  if (textb98d7?.isHidden) {
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
      {keyset("My Approvals - Risk Classification")}
</Text>
  </div>
  )
}

export default Texttext
