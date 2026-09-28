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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {text792c7, settext792c7}= useContext(TotalContext) as TotalContextProps;
  const {template_name53616, settemplate_name53616}= useContext(TotalContext) as TotalContextProps;
  const {template_code83f6f, settemplate_code83f6f}= useContext(TotalContext) as TotalContextProps;
  const {template_versionc2087, settemplate_versionc2087}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code4010b, setapplies_tier_code4010b}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_casee4c68, setapplies_use_casee4c68}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typeb380f, setapplies_asset_typeb380f}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  const {text792c7Props, settext792c7Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text792c7?.refresh])

  if (text792c7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 8`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Template Details")}
</Text>
  </div>
  )
}

export default Texttext
