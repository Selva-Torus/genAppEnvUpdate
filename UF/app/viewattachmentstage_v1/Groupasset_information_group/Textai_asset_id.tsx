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

const Textai_asset_id = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_evidences_groupd988a, setoverall_evidences_groupd988a}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupd988aProps, setoverall_evidences_groupd988aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group1f808, setasset_information_group1f808}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group1f808Props, setasset_information_group1f808Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id_text60af3, setasset_id_text60af3}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id932d9, setai_asset_id932d9}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textc00bb, setasset_code_textc00bb}= useContext(TotalContext) as TotalContextProps;
  const {asset_code63f57, setasset_code63f57}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textcbb5f, setasset_name_textcbb5f}= useContext(TotalContext) as TotalContextProps;
  const {asset_named26c1, setasset_named26c1}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text3374b, setasset_type_code_text3374b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_coded1640, setasset_type_coded1640}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupea2c7, setevidence_table_groupea2c7}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupea2c7Props, setevidence_table_groupea2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4, setevidence_table6beb4}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table6beb4Props, setevidence_table6beb4Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id932d9Props, setai_asset_id932d9Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[ai_asset_id932d9?.refresh])

  if (ai_asset_id932d9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `4 / 13`,gridRow: `1 / 6`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.ai_asset_id : (asset_information_group1f808?.ai_asset_id || ""))}
</Text>
  </div>
  )
}

export default Textai_asset_id
