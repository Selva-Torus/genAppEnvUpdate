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

const Texttext = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group81804, setdel_group81804}= useContext(TotalContext) as TotalContextProps;
  const {del_group81804Props, setdel_group81804Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt0ed43, setdelete_heading_txt0ed43}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_10a88e, setdel_divider_10a88e}= useContext(TotalContext) as TotalContextProps;
  const {del_code_value_id_text78165, setdel_code_value_id_text78165}= useContext(TotalContext) as TotalContextProps;
  const {code_value_id92302, setcode_value_id92302}= useContext(TotalContext) as TotalContextProps;
  const {code_textee61f, setcode_textee61f}= useContext(TotalContext) as TotalContextProps;
  const {code95034, setcode95034}= useContext(TotalContext) as TotalContextProps;
  const {display_name_text27447, setdisplay_name_text27447}= useContext(TotalContext) as TotalContextProps;
  const {display_name8365e, setdisplay_name8365e}= useContext(TotalContext) as TotalContextProps;
  const {description_text492cc, setdescription_text492cc}= useContext(TotalContext) as TotalContextProps;
  const {descriptionabf40, setdescriptionabf40}= useContext(TotalContext) as TotalContextProps;
  const {status_text4b485, setstatus_text4b485}= useContext(TotalContext) as TotalContextProps;
  const {is_active80b66, setis_active80b66}= useContext(TotalContext) as TotalContextProps;
  const {text5fad6, settext5fad6}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eb63b, setdel_divider_2eb63b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnb85db, setdel_cancel_btnb85db}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn7369c, setdel_okl_btn7369c}= useContext(TotalContext) as TotalContextProps;
  const {text5fad6Props, settext5fad6Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text5fad6?.refresh])

  if (text5fad6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `41 / 47`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("⚠️ This action cannot be undone")}
</Text>
  </div>
  )
}

export default Texttext
