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

const Texttext_head = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {grp_overallsif_list46e94, setgrp_overallsif_list46e94}= useContext(TotalContext) as TotalContextProps;
  const {grp_overallsif_list46e94Props, setgrp_overallsif_list46e94Props}= useContext(TotalContext) as TotalContextProps;
  const {text_head38a37, settext_head38a37}= useContext(TotalContext) as TotalContextProps;
  const {btn_search3c2e1, setbtn_search3c2e1}= useContext(TotalContext) as TotalContextProps;
  const {btn_export_as_excelb2d92, setbtn_export_as_excelb2d92}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fc, settbl_sif_list592fc}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fcProps, settbl_sif_list592fcProps}= useContext(TotalContext) as TotalContextProps;
  const {text_head38a37Props, settext_head38a37Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text_head38a37?.refresh])

  if (text_head38a37?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `7 / 18`,gridRow: `2 / 12`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("SIF Summary Report")}
</Text>
  </div>
  )
}

export default Texttext_head
