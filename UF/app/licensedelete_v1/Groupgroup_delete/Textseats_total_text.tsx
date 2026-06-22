'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textseats_total_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_deletedf5b8, setgroup_deletedf5b8}= useContext(TotalContext) as TotalContextProps;
  const {group_deletedf5b8Props, setgroup_deletedf5b8Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb375f, setdelete_heading_textb375f}= useContext(TotalContext) as TotalContextProps;
  const {product_name_text501de, setproduct_name_text501de}= useContext(TotalContext) as TotalContextProps;
  const {product_namead2dd, setproduct_namead2dd}= useContext(TotalContext) as TotalContextProps;
  const {license_type_text3c22b, setlicense_type_text3c22b}= useContext(TotalContext) as TotalContextProps;
  const {license_typecec9e, setlicense_typecec9e}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal_textbdbd2, setauto_renewal_textbdbd2}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal8e280, setauto_renewal8e280}= useContext(TotalContext) as TotalContextProps;
  const {seats_total_texta19fe, setseats_total_texta19fe}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalf37ee, setseats_totalf37ee}= useContext(TotalContext) as TotalContextProps;
  const {seats_used_textc1a25, setseats_used_textc1a25}= useContext(TotalContext) as TotalContextProps;
  const {seats_used8c8d5, setseats_used8c8d5}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbc695, setconfo_textbc695}= useContext(TotalContext) as TotalContextProps;
  const {license_id027b5, setlicense_id027b5}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3e8d9, setcancel_button3e8d9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonf3727, setok_buttonf3727}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[seats_total_texta19fe?.refresh])

  if (seats_total_texta19fe?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 9`,gridRow: `30 / 36`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Seats Total")}
</Text>
  </div>
  )
}

export default Textseats_total_text
