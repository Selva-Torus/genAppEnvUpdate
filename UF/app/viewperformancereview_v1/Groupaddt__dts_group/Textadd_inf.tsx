'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textadd_inf = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {add_inff39c2, setadd_inff39c2}= useContext(TotalContext) as TotalContextProps;
  const {add_dtsd1841, setadd_dtsd1841}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[add_inff39c2?.refresh])

  if (add_inff39c2?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 12`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Additional Information")}
</Text>
  </div>
  )
}

export default Textadd_inf
