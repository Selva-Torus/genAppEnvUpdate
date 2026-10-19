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

const Textasset_type_code_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_evidences_groupc014d, setoverall_evidences_groupc014d}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupc014dProps, setoverall_evidences_groupc014dProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2, setasset_information_group300d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2Props, setasset_information_group300d2Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text4f495, setasset_id_text4f495}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idd9435, setai_asset_idd9435}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textba6bd, setasset_code_textba6bd}= useContext(TotalContext) as TotalContextProps;
  const {asset_codea01f3, setasset_codea01f3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textb3fda, setasset_name_textb3fda}= useContext(TotalContext) as TotalContextProps;
  const {asset_namef39a9, setasset_namef39a9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textea45e, setasset_type_code_textea45e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code76bdf, setasset_type_code76bdf}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37c, setevidence_table_groupfe37c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37cProps, setevidence_table_groupfe37cProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5c, setevidence_table88d5c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5cProps, setevidence_table88d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textea45eProps, setasset_type_code_textea45eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_type_code_textea45e?.refresh])

  if (asset_type_code_textea45e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `13 / 16`,gridRow: `7 / 12`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Asset Type Code")}
</Text>
  </div>
  )
}

export default Textasset_type_code_text
