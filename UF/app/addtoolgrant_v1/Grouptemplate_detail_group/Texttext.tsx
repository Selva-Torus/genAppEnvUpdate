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
  const {groupc4c71, setgroupc4c71}= useContext(TotalContext) as TotalContextProps;
  const {groupc4c71Props, setgroupc4c71Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2, settemplate_detail_groupe14a2}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2Props, settemplate_detail_groupe14a2Props}= useContext(TotalContext) as TotalContextProps;
  const {textfaa89, settextfaa89}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec9725, setasset_namec9725}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_namec6175, settool_asset_namec6175}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation3f831, settool_operation3f831}= useContext(TotalContext) as TotalContextProps;
  const {access_mode1a5e5, setaccess_mode1a5e5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43b, setdynamicactionce43b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43bProps, setdynamicactionce43bProps}= useContext(TotalContext) as TotalContextProps;
  const {textfaa89Props, settextfaa89Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[textfaa89?.refresh])

  if (textfaa89?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 8`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Tool Grant Details")}
</Text>
  </div>
  )
}

export default Texttext
