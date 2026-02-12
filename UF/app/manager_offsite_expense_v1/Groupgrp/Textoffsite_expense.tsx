'use client'


import React, { useContext,useEffect } from 'react'; 
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import i18n from '@/app/components/i18n';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";

const Textoffsite_expense = ({encryptionFlagCompData,isDynamic,item,index}:any) => {
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
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[offsite_expense46e6c?.refresh])

  if (offsite_expense46e6c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 7`,gridRow: `1 / 10`, gap:``, height: `100%`}} >
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
