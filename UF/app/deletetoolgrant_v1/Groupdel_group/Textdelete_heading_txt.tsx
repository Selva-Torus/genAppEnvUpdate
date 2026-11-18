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

const Textdelete_heading_txt = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_groupbb7f0, setdel_groupbb7f0}= useContext(TotalContext) as TotalContextProps;
  const {del_groupbb7f0Props, setdel_groupbb7f0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8b, setdelete_heading_txt26f8b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1c0da3, setdel_divider_1c0da3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textfb333, setasset_name_textfb333}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4, settool_grant_id281e4}= useContext(TotalContext) as TotalContextProps;
  const {agent_name_text71756, setagent_name_text71756}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5c40e, setasset_name5c40e}= useContext(TotalContext) as TotalContextProps;
  const {too_operation_texte0dbf, settoo_operation_texte0dbf}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation03227, settool_operation03227}= useContext(TotalContext) as TotalContextProps;
  const {access_mode_text74d1f, setaccess_mode_text74d1f}= useContext(TotalContext) as TotalContextProps;
  const {access_mode763de, setaccess_mode763de}= useContext(TotalContext) as TotalContextProps;
  const {ststus_txt329f4, setststus_txt329f4}= useContext(TotalContext) as TotalContextProps;
  const {status659a7, setstatus659a7}= useContext(TotalContext) as TotalContextProps;
  const {textb6666, settextb6666}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_27f134, setdel_divider_27f134}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn3e3af, setdel_cancel_btn3e3af}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnbeefc, setdel_okl_btnbeefc}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8bProps, setdelete_heading_txt26f8bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[delete_heading_txt26f8b?.refresh])

  if (delete_heading_txt26f8b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Are you sure you want to delete this Tool Grant?")}
</Text>
  </div>
  )
}

export default Textdelete_heading_txt
