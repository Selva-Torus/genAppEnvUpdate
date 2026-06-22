'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textmaintenance_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_maintenance_group04cba, setoverall_maintenance_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3, seticon_groupedce3}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3Props, seticon_groupedce3Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_text_icondf716, setmaintenance_text_icondf716}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_text0649c, setmaintenance_text0649c}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5d, setmaintenance_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5dProps, setmaintenance_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[maintenance_text0649c?.refresh])

  if (maintenance_text0649c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `5 / 21`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("MAINTENANCE")}
</Text>
  </div>
  )
}

export default Textmaintenance_text
