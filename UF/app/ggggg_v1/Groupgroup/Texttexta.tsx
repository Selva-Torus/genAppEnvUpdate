'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttexta = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group02593, setgroup02593}= useContext(TotalContext) as TotalContextProps;
  const {group02593Props, setgroup02593Props}= useContext(TotalContext) as TotalContextProps;
  const {textinput950e5, settextinput950e5}= useContext(TotalContext) as TotalContextProps;
  const {textc76eb1, settextc76eb1}= useContext(TotalContext) as TotalContextProps;
  const {texta1d27a, settexta1d27a}= useContext(TotalContext) as TotalContextProps;
  const {textbca8ba, settextbca8ba}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[texta1d27a?.refresh])

  if (texta1d27a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `61 / 111`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="display-4"
  color="primary"
>
      {keyset("Lorem ipsum dolor sit")}
</Text>
  </div>
  )
}

export default Texttexta
