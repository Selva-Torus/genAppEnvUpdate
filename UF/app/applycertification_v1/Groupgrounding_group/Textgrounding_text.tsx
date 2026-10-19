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

const Textgrounding_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registry73226, setoverall_ai_asset_registry73226}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry73226Props, setoverall_ai_asset_registry73226Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07, setregister_ai_asset_groupacb07}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupacb07Props, setregister_ai_asset_groupacb07Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9d, setgrounding_group64d9d}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group64d9dProps, setgrounding_group64d9dProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901, setgrounding_text80901}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text4e90a, setcert_code_text4e90a}= useContext(TotalContext) as TotalContextProps;
  const {cert_temp_text88aa1, setcert_temp_text88aa1}= useContext(TotalContext) as TotalContextProps;
  const {text_current_stage_seqf99a6, settext_current_stage_seqf99a6}= useContext(TotalContext) as TotalContextProps;
  const {cert_code601b0, setcert_code601b0}= useContext(TotalContext) as TotalContextProps;
  const {template_namee23cf, settemplate_namee23cf}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code3cbb6, setstage_type_code3cbb6}= useContext(TotalContext) as TotalContextProps;
  const {text_status5e33f, settext_status5e33f}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code047b5, setcert_status_code047b5}= useContext(TotalContext) as TotalContextProps;
  const {is_recertificationbdc1e, setis_recertificationbdc1e}= useContext(TotalContext) as TotalContextProps;
  const {is_actived0a4e, setis_actived0a4e}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80901Props, setgrounding_text80901Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[grounding_text80901?.refresh])

  if (grounding_text80901?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=" !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Certification Details")}
</Text>
  </div>
  )
}

export default Textgrounding_text
