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

const Textoffsite_expense = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {grpdeda0, setgrpdeda0}= useContext(TotalContext) as TotalContextProps;
  const {grpdeda0Props, setgrpdeda0Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense46e6c, setoffsite_expense46e6c}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5, settable98ff5}= useContext(TotalContext) as TotalContextProps;
  const {table98ff5Props, settable98ff5Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense46e6cProps, setoffsite_expense46e6cProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[offsite_expense46e6c?.refresh])

  if (offsite_expense46e6c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 20`,gridRow: `5 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="display-1"
  color="primary"
>
      {keyset("Offsite Expenses")}
</Text>
  </div>
  )
}

export default Textoffsite_expense
