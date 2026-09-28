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

const Textagent_identity_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_text6046a, setagent_identity_text6046a}= useContext(TotalContext) as TotalContextProps;
  const {asset_name91b54, setasset_name91b54}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref508a1, setagent_identity_ref508a1}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1e79b, setidentity_provider1e79b}= useContext(TotalContext) as TotalContextProps;
  const {authority_level_codebd1b1, setauthority_level_codebd1b1}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_text6046aProps, setagent_identity_text6046aProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[agent_identity_text6046a?.refresh])

  if (agent_identity_text6046a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-blue-800 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Agent Identity")}
</Text>
  </div>
  )
}

export default Textagent_identity_text
