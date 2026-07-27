'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcycle_type_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textfe4b7, setdelete_heading_textfe4b7}= useContext(TotalContext) as TotalContextProps;
  const {divider_s18ff5, setdivider_s18ff5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code_textea00f, setcycle_code_textea00f}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code5f073, setcycle_code5f073}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name_text7ecc5, setcycle_name_text7ecc5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name6a018, setcycle_name6a018}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type_text57344, setcycle_type_text57344}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type89f52, setcycle_type89f52}= useContext(TotalContext) as TotalContextProps;
  const {confo_text4c8be, setconfo_text4c8be}= useContext(TotalContext) as TotalContextProps;
  const {divider477db, setdivider477db}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonb2f7a, setcancel_buttonb2f7a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button24d12, setok_button24d12}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id8c16d, setcycle_id8c16d}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[cycle_type_text57344?.refresh])

  if (cycle_type_text57344?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `22 / 27`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Cycle Type")}
</Text>
  </div>
  )
}

export default Textcycle_type_text
