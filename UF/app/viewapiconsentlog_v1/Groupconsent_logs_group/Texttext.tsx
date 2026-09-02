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
  const {consent_logs_group3070a, setconsent_logs_group3070a}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs_group3070aProps, setconsent_logs_group3070aProps}= useContext(TotalContext) as TotalContextProps;
  const {textfe486, settextfe486}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs53635, setconsent_logs53635}= useContext(TotalContext) as TotalContextProps;
  const {consent_logs53635Props, setconsent_logs53635Props}= useContext(TotalContext) as TotalContextProps;
  const {textfe486Props, settextfe486Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textfe486?.refresh])

  if (textfe486?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `4 / 17`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="header-1"
  color="primary"
>
      {keyset("Consent Log")}
</Text>
  </div>
  )
}

export default Texttext
