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
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {info_rule23059, setinfo_rule23059}= useContext(TotalContext) as TotalContextProps;
  const {ref_namea397a, setref_namea397a}= useContext(TotalContext) as TotalContextProps;
  const {status8efee, setstatus8efee}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  const {info_rule23059Props, setinfo_rule23059Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[info_rule23059?.refresh])

  if (info_rule23059?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Credential & Status")}
</Text>
  </div>
  )
}

export default Textinfo_rule
