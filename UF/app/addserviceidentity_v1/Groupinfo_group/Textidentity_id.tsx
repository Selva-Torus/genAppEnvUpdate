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

const Textidentity_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_ida14e7, setidentity_ida14e7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  const {identity_ida14e7Props, setidentity_ida14e7Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[identity_ida14e7?.refresh])

  if (identity_ida14e7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 3`,gridRow: `46 / 47`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.identity_id : (info_group9d912?.identity_id || ""))}
</Text>
  </div>
  )
}

export default Textidentity_id
