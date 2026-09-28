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

const Texttransformation_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {add_field_map_grp9e14b, setadd_field_map_grp9e14b}= useContext(TotalContext) as TotalContextProps;
  const {add_field_map_grp9e14bProps, setadd_field_map_grp9e14bProps}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45, setsource_mapping_grp4af45}= useContext(TotalContext) as TotalContextProps;
  const {source_mapping_grp4af45Props, setsource_mapping_grp4af45Props}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8, settarget_mapping_grpa2fc8}= useContext(TotalContext) as TotalContextProps;
  const {target_mapping_grpa2fc8Props, settarget_mapping_grpa2fc8Props}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0e, settransformation_grp78a0e}= useContext(TotalContext) as TotalContextProps;
  const {transformation_grp78a0eProps, settransformation_grp78a0eProps}= useContext(TotalContext) as TotalContextProps;
  const {transformation_texte6db9, settransformation_texte6db9}= useContext(TotalContext) as TotalContextProps;
  const {transform_rule4a53a, settransform_rule4a53a}= useContext(TotalContext) as TotalContextProps;
  const {default_value7ccac, setdefault_value7ccac}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55, setfield_rules_grp65d55}= useContext(TotalContext) as TotalContextProps;
  const {field_rules_grp65d55Props, setfield_rules_grp65d55Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  const {transformation_texte6db9Props, settransformation_texte6db9Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[transformation_texte6db9?.refresh])

  if (transformation_texte6db9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 16`,gridRow: `2 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Transformation")}
</Text>
  </div>
  )
}

export default Texttransformation_text
