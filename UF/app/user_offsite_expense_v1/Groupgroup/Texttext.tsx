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
  const {groupe78de, setgroupe78de}= useContext(TotalContext) as TotalContextProps;
  const {groupe78deProps, setgroupe78deProps}= useContext(TotalContext) as TotalContextProps;
  const {text248b4, settext248b4}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_user_table94f29, setoffsite_expense_user_table94f29}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_user_table94f29Props, setoffsite_expense_user_table94f29Props}= useContext(TotalContext) as TotalContextProps;
  const {text248b4Props, settext248b4Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text248b4?.refresh])

  if (text248b4?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 21`,gridRow: `8 / 18`, gap:``, height: `100%`}} >
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

export default Texttext
