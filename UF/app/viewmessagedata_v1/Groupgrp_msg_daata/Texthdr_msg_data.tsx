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

const Texthdr_msg_data = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {grp_msg_daatab68d6, setgrp_msg_daatab68d6}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_daatab68d6Props, setgrp_msg_daatab68d6Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_msg_data030c2, sethdr_msg_data030c2}= useContext(TotalContext) as TotalContextProps;
  const {divider590d5, setdivider590d5}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014, setgrp_msg_data_det0b014}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014Props, setgrp_msg_data_det0b014Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_msg_data030c2Props, sethdr_msg_data030c2Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[hdr_msg_data030c2?.refresh])

  if (hdr_msg_data030c2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 5`,gridRow: `5 / 12`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Message Data")}
</Text>
  </div>
  )
}

export default Texthdr_msg_data
