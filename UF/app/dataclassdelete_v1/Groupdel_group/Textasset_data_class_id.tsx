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

const Textasset_data_class_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group7e857, setdel_group7e857}= useContext(TotalContext) as TotalContextProps;
  const {del_group7e857Props, setdel_group7e857Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt4a602, setdelete_heading_txt4a602}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_17957b, setdel_divider_17957b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7377f, setasset_name_text7377f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58e, setasset_nameae58e}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code_text87efb, setdata_class_code_text87efb}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codee6763, setdata_class_codee6763}= useContext(TotalContext) as TotalContextProps;
  const {text3364f, settext3364f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2725fd, setdel_divider_2725fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60, setasset_data_class_id9ae60}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnd5bbd, setdel_cancel_btnd5bbd}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn25863, setdel_okl_btn25863}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60Props, setasset_data_class_id9ae60Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_data_class_id9ae60?.refresh])

  if (asset_data_class_id9ae60?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 4`,gridRow: `31 / 32`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Lorem ipsum dolor sit")}
</Text>
  </div>
  )
}

export default Textasset_data_class_id
