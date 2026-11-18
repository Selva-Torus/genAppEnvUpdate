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

const Texttier_assessment_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {approved_btn70ab7, setapproved_btn70ab7}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id30bca, settier_assessment_id30bca}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id30bcaProps, settier_assessment_id30bcaProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[tier_assessment_id30bca?.refresh])

  if (tier_assessment_id30bca?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `71 / 72`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.tier_assessment_id : (ai_registry_groupdee5d?.tier_assessment_id || ""))}
</Text>
  </div>
  )
}

export default Texttier_assessment_id
