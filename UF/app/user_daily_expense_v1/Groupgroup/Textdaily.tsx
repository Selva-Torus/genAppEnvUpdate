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

const Textdaily = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {groupc9a87, setgroupc9a87}= useContext(TotalContext) as TotalContextProps;
  const {groupc9a87Props, setgroupc9a87Props}= useContext(TotalContext) as TotalContextProps;
  const {dailyc5d00, setdailyc5d00}= useContext(TotalContext) as TotalContextProps;
  const {daily_user_table76baf, setdaily_user_table76baf}= useContext(TotalContext) as TotalContextProps;
  const {daily_user_table76bafProps, setdaily_user_table76bafProps}= useContext(TotalContext) as TotalContextProps;
  const {dailyc5d00Props, setdailyc5d00Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dailyc5d00?.refresh])

  if (dailyc5d00?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 20`,gridRow: `10 / 20`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="display-1"
  color="primary"
>
      {keyset("Daily Expenses")}
</Text>
  </div>
  )
}

export default Textdaily
