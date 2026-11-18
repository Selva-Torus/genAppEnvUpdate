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

const Texttext_status = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80bed, setgrounding_text80bed}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_15adbc, setcert_code_text_15adbc}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text0fa1b, setcert_code_text0fa1b}= useContext(TotalContext) as TotalContextProps;
  const {text_statusa2d30, settext_statusa2d30}= useContext(TotalContext) as TotalContextProps;
  const {certification_idb4ceb, setcertification_idb4ceb}= useContext(TotalContext) as TotalContextProps;
  const {cert_code74900, setcert_code74900}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code2f5be, setcert_status_code2f5be}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_126c1f4, setcert_code_text_126c1f4}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_1_12e212, setcert_code_text_1_12e212}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0b26f, settrs_created_by0b26f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date297b9, settrs_created_date297b9}= useContext(TotalContext) as TotalContextProps;
  const {text_statusa2d30Props, settext_statusa2d30Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text_statusa2d30?.refresh])

  if (text_statusa2d30?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `17 / 25`,gridRow: `9 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-[11px] !font-bold p-1"
  variant="subheader-1"
  color="primary"
>
      {keyset("Status")}
</Text>
  </div>
  )
}

export default Texttext_status
