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

const Texttest_status = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {del_group56243, setdel_group56243}= useContext(TotalContext) as TotalContextProps;
  const {del_group56243Props, setdel_group56243Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txte8a82, setdelete_heading_txte8a82}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1bd3d8, setdel_divider_1bd3d8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text60051, setasset_name_text60051}= useContext(TotalContext) as TotalContextProps;
  const {policy_code3279a, setpolicy_code3279a}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta659e, setasset_code_texta659e}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3072c, setpolicy_name3072c}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text620ea, setasset_type_code_text620ea}= useContext(TotalContext) as TotalContextProps;
  const {policy_type7ebd5, setpolicy_type7ebd5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text79046, setrisk_tier_code_text79046}= useContext(TotalContext) as TotalContextProps;
  const {applies_to_tiers7f62c, setapplies_to_tiers7f62c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc74b9, setlifecycle_status_code_textc74b9}= useContext(TotalContext) as TotalContextProps;
  const {test_status61eae, settest_status61eae}= useContext(TotalContext) as TotalContextProps;
  const {text48ed4, settext48ed4}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_24cf58, setdel_divider_24cf58}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_id35702, setpolicy_rule_id35702}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn42f6a, setdel_cancel_btn42f6a}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn6aa11, setdel_okl_btn6aa11}= useContext(TotalContext) as TotalContextProps;
  const {test_status61eaeProps, settest_status61eaeProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[test_status61eae?.refresh])

  if (test_status61eae?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `8 / 24`,gridRow: `34 / 39`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !rounded-l !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.test_status : (del_group56243?.test_status || ""))}
</Text>
  </div>
  )
}

export default Texttest_status
