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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_information_text5b740, setmodel_information_text5b740}= useContext(TotalContext) as TotalContextProps;
  const {text0abdf, settext0abdf}= useContext(TotalContext) as TotalContextProps;
  const {text124429, settext124429}= useContext(TotalContext) as TotalContextProps;
  const {text2a1105, settext2a1105}= useContext(TotalContext) as TotalContextProps;
  const {asset_codec72a5, setasset_codec72a5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name63a71, setasset_name63a71}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code0c018, setrisk_tier_code0c018}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {text0abdfProps, settext0abdfProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text0abdf?.refresh])

  if (text0abdf?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 9`,gridRow: `10 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-[11px] !font-bold p-1"
  variant="subheader-1"
  color="primary"
>
      {keyset("Asset Code")}
</Text>
  </div>
  )
}

export default Texttext
