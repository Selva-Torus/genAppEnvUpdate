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

const Texttext_effective_date_2 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {grounding_textde33a, setgrounding_textde33a}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date2f0e9, settext_effective_date2f0e9}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_1e9a79, settext_effective_date_1e9a79}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_283f74, settext_effective_date_283f74}= useContext(TotalContext) as TotalContextProps;
  const {effective_date585df, seteffective_date585df}= useContext(TotalContext) as TotalContextProps;
  const {expiry_dated0967, setexpiry_dated0967}= useContext(TotalContext) as TotalContextProps;
  const {completed_on67679, setcompleted_on67679}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_textea047, setcert_temp_textea047}= useContext(TotalContext) as TotalContextProps;
  const {template_name5834f, settemplate_name5834f}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationa8241, setis_recertificationa8241}= useContext(TotalContext) as TotalContextProps;
  const {is_active72c74, setis_active72c74}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {text_effective_date_283f74Props, settext_effective_date_283f74Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text_effective_date_283f74?.refresh])

  if (text_effective_date_283f74?.isHidden) {
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
      {keyset("Completed on")}
</Text>
  </div>
  )
}

export default Texttext_effective_date_2
