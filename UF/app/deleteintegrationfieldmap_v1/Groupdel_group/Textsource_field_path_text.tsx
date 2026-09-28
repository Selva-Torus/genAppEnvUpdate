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

const Textsource_field_path_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group0e789, setdel_group0e789}= useContext(TotalContext) as TotalContextProps;
  const {del_group0e789Props, setdel_group0e789Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc115c, setdelete_heading_txtc115c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_19e216, setdel_divider_19e216}= useContext(TotalContext) as TotalContextProps;
  const {del_field_map_id42f08, setdel_field_map_id42f08}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id7529d, setfield_map_id7529d}= useContext(TotalContext) as TotalContextProps;
  const {del_integration_source_text3544e, setdel_integration_source_text3544e}= useContext(TotalContext) as TotalContextProps;
  const {source_name6c577, setsource_name6c577}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path_textdb42b, setsource_field_path_textdb42b}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path92e47, setsource_field_path92e47}= useContext(TotalContext) as TotalContextProps;
  const {targe_tentity__text6b5d0, settarge_tentity__text6b5d0}= useContext(TotalContext) as TotalContextProps;
  const {target_entity6f0f5, settarget_entity6f0f5}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute_txtf878b, settarget_attribute_txtf878b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributedce21, settarget_attributedce21}= useContext(TotalContext) as TotalContextProps;
  const {is_active_txt7b746, setis_active_txt7b746}= useContext(TotalContext) as TotalContextProps;
  const {is_active9655f, setis_active9655f}= useContext(TotalContext) as TotalContextProps;
  const {textb50e5, settextb50e5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_231d84, setdel_divider_231d84}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn4ada6, setdel_cancel_btn4ada6}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnb2163, setdel_okl_btnb2163}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path_textdb42bProps, setsource_field_path_textdb42bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[source_field_path_textdb42b?.refresh])

  if (source_field_path_textdb42b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 8`,gridRow: `22 / 26`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Source Field Path")}
</Text>
  </div>
  )
}

export default Textsource_field_path_text
