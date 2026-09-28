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

const Textinfo_rule = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {info_ruled5454, setinfo_ruled5454}= useContext(TotalContext) as TotalContextProps;
  const {rule_code4a3a5, setrule_code4a3a5}= useContext(TotalContext) as TotalContextProps;
  const {rule_name3412c, setrule_name3412c}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_drop86b67, setresult_tier_drop86b67}= useContext(TotalContext) as TotalContextProps;
  const {match_mode065c7, setmatch_mode065c7}= useContext(TotalContext) as TotalContextProps;
  const {descriptionf8851, setdescriptionf8851}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  const {info_ruled5454Props, setinfo_ruled5454Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[info_ruled5454?.refresh])

  if (info_ruled5454?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Risk Rule Details")}
</Text>
  </div>
  )
}

export default Textinfo_rule
