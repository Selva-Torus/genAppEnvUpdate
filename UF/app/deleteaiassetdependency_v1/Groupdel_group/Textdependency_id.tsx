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

const Textdependency_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group75aad, setdel_group75aad}= useContext(TotalContext) as TotalContextProps;
  const {del_group75aadProps, setdel_group75aadProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtea30c, setdelete_heading_txtea30c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_145e91, setdel_divider_145e91}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7e015, setasset_name_text7e015}= useContext(TotalContext) as TotalContextProps;
  const {dependency_id4cc36, setdependency_id4cc36}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text08d4f, setasset_code_text08d4f}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code9420e, setdependency_type_code9420e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd9470, setasset_type_code_textd9470}= useContext(TotalContext) as TotalContextProps;
  const {dependency_name3b43e, setdependency_name3b43e}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text5d15a, setrisk_tier_code_text5d15a}= useContext(TotalContext) as TotalContextProps;
  const {direction3a025, setdirection3a025}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text04375, setlifecycle_status_code_text04375}= useContext(TotalContext) as TotalContextProps;
  const {is_activeecfb5, setis_activeecfb5}= useContext(TotalContext) as TotalContextProps;
  const {texte1857, settexte1857}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_22accf, setdel_divider_22accf}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn1a923, setdel_cancel_btn1a923}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn48b24, setdel_okl_btn48b24}= useContext(TotalContext) as TotalContextProps;
  const {dependency_id4cc36Props, setdependency_id4cc36Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dependency_id4cc36?.refresh])

  if (dependency_id4cc36?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `10 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.dependency_id : (del_group75aad?.dependency_id || ""))}
</Text>
  </div>
  )
}

export default Textdependency_id
