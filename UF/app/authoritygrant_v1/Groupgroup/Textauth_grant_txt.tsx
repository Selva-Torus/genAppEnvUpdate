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

const Textauth_grant_txt = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group7b86a, setgroup7b86a}= useContext(TotalContext) as TotalContextProps;
  const {group7b86aProps, setgroup7b86aProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_txt69316, setauth_grant_txt69316}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnb51e8, setref_btnb51e8}= useContext(TotalContext) as TotalContextProps;
  const {search_btnceb31, setsearch_btnceb31}= useContext(TotalContext) as TotalContextProps;
  const {add_btnc52a0, setadd_btnc52a0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_txt69316Props, setauth_grant_txt69316Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[auth_grant_txt69316?.refresh])

  if (auth_grant_txt69316?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 18`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="header-1"
  color="primary"
>
      {keyset("Authority Grant")}
</Text>
  </div>
  )
}

export default Textauth_grant_txt
