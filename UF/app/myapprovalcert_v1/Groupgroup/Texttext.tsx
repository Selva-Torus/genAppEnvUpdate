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
  const {overall_group6cd49, setoverall_group6cd49}= useContext(TotalContext) as TotalContextProps;
  const {overall_group6cd49Props, setoverall_group6cd49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48d, setai_asset_version_table_group1b48d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48dProps, setai_asset_version_table_group1b48dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3, setgroupa86a3}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3Props, setgroupa86a3Props}= useContext(TotalContext) as TotalContextProps;
  const {textff0b2, settextff0b2}= useContext(TotalContext) as TotalContextProps;
  const {asset_codefdd43, setasset_codefdd43}= useContext(TotalContext) as TotalContextProps;
  const {asset_namefcdb4, setasset_namefcdb4}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8, setcertificate_table48fb8}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8Props, setcertificate_table48fb8Props}= useContext(TotalContext) as TotalContextProps;
  const {textff0b2Props, settextff0b2Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textff0b2?.refresh])

  if (textff0b2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 8`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="font-bold"
  variant="subheader-3"
  color="primary"
>
      {keyset("Asset Info")}
</Text>
  </div>
  )
}

export default Texttext
