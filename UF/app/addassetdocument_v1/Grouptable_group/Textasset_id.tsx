'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textasset_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_group36b0d, setdoc_attached_group36b0d}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group36b0dProps, setdoc_attached_group36b0dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaa, settable_groupdaaaa}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaaProps, settable_groupdaaaaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text67e51, setasset_id_text67e51}= useContext(TotalContext) as TotalContextProps;
  const {asset_idfc689, setasset_idfc689}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text06c7c, setasset_name_text06c7c}= useContext(TotalContext) as TotalContextProps;
  const {asset_name7dfbc, setasset_name7dfbc}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_idfc689?.refresh])

  if (asset_idfc689?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_id : (table_groupdaaaa?.asset_id || ""))}
</Text>
  </div>
  )
}

export default Textasset_id
