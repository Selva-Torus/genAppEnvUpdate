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

const Textmodel_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group073d4, setdel_group073d4}= useContext(TotalContext) as TotalContextProps;
  const {del_group073d4Props, setdel_group073d4Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc584e, setdelete_heading_txtc584e}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_114f19, setdel_divider_114f19}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text3b7d3, setasset_name_text3b7d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name58385, setasset_name58385}= useContext(TotalContext) as TotalContextProps;
  const {model_name_textb06fd, setmodel_name_textb06fd}= useContext(TotalContext) as TotalContextProps;
  const {model_namec6433, setmodel_namec6433}= useContext(TotalContext) as TotalContextProps;
  const {model_version_textb815a, setmodel_version_textb815a}= useContext(TotalContext) as TotalContextProps;
  const {model_version6f6be, setmodel_version6f6be}= useContext(TotalContext) as TotalContextProps;
  const {text515f0, settext515f0}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_204d02, setdel_divider_204d02}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id844e1, setasset_model_id844e1}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn6fc66, setdel_cancel_btn6fc66}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn1f59f, setdel_okl_btn1f59f}= useContext(TotalContext) as TotalContextProps;
  const {model_name_textb06fdProps, setmodel_name_textb06fdProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[model_name_textb06fd?.refresh])

  if (model_name_textb06fd?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `16 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Model Name")}
</Text>
  </div>
  )
}

export default Textmodel_name_text
