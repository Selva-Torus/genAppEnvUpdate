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

const Textasset_code = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_evidences_group59fa9, setoverall_evidences_group59fa9}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_group59fa9Props, setoverall_evidences_group59fa9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355e, setasset_information_groupa355e}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355eProps, setasset_information_groupa355eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_textb71c0, setasset_id_textb71c0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id599fe, setai_asset_id599fe}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textca27e, setasset_code_textca27e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code74d3d, setasset_code74d3d}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text180c8, setasset_name_text180c8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name37ece, setasset_name37ece}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text3154f, setasset_type_code_text3154f}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code0912c, setasset_type_code0912c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375d, setevidence_table_group8375d}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375dProps, setevidence_table_group8375dProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958a, setevidence_tablef958a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958aProps, setevidence_tablef958aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_code74d3dProps, setasset_code74d3dProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[asset_code74d3d?.refresh])

  if (asset_code74d3d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `16 / 25`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.asset_code : (asset_information_groupa355e?.asset_code || ""))}
</Text>
  </div>
  )
}

export default Textasset_code
