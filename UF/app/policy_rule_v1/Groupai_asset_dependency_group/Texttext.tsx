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
  const {overall_group18db5, setoverall_group18db5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group18db5Props, setoverall_group18db5Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0d, setai_asset_dependency_group5fc0d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0dProps, setai_asset_dependency_group5fc0dProps}= useContext(TotalContext) as TotalContextProps;
  const {texte6aba, settexte6aba}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button56c95, setrefresh_button56c95}= useContext(TotalContext) as TotalContextProps;
  const {search94dd6, setsearch94dd6}= useContext(TotalContext) as TotalContextProps;
  const {add_btn09e47, setadd_btn09e47}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5, setpolicy_rule_table7fde5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5Props, setpolicy_rule_table7fde5Props}= useContext(TotalContext) as TotalContextProps;
  const {texte6abaProps, settexte6abaProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[texte6aba?.refresh])

  if (texte6aba?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 9`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="header-1"
  color="primary"
>
      {keyset("Policy Rule")}
</Text>
  </div>
  )
}

export default Texttext
