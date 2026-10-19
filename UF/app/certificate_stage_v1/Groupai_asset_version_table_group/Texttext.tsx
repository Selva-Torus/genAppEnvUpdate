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
  const {overall_groupde19e, setoverall_groupde19e}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupde19eProps, setoverall_groupde19eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015, setai_asset_version_table_group4a015}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015Props, setai_asset_version_table_group4a015Props}= useContext(TotalContext) as TotalContextProps;
  const {text20773, settext20773}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button3c002, setrefresh_button3c002}= useContext(TotalContext) as TotalContextProps;
  const {searchf8a5d, setsearchf8a5d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096, setcertificate_tablefb096}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096Props, setcertificate_tablefb096Props}= useContext(TotalContext) as TotalContextProps;
  const {text20773Props, settext20773Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text20773?.refresh])

  if (text20773?.isHidden) {
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
      {keyset("My Approval - Assets")}
</Text>
  </div>
  )
}

export default Texttext
