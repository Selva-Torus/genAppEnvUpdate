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

const Textasset_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registryc00ea, setoverall_ai_asset_registryc00ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc00eaProps, setoverall_ai_asset_registryc00eaProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5d, setai_registry_groupdee5d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5dProps, setai_registry_groupdee5dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4, setgroupf7df4}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4Props, setgroupf7df4Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_text4a506, setasset_text4a506}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta29b2, setasset_code_texta29b2}= useContext(TotalContext) as TotalContextProps;
  const {asset_code7015f, setasset_code7015f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textb0758, setasset_name_textb0758}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee27e8, setasset_namee27e8}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_texta2f95, setrisk_tier_texta2f95}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code89845, setrisk_tier_code89845}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code_text0fb21, setassessed_tier_code_text0fb21}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_code6f8d5, setassessed_tier_code6f8d5}= useContext(TotalContext) as TotalContextProps;
  const {justification_text513cf, setjustification_text513cf}= useContext(TotalContext) as TotalContextProps;
  const {justificationcf400, setjustificationcf400}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textb0758Props, setasset_name_textb0758Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_name_textb0758?.refresh])

  if (asset_name_textb0758?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 4`,gridRow: `17 / 23`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Asset Name")}
</Text>
  </div>
  )
}

export default Textasset_name_text
