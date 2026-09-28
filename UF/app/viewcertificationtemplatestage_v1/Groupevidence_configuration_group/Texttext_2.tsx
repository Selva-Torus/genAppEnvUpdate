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

const Texttext_2 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {groupcccf9, setgroupcccf9}= useContext(TotalContext) as TotalContextProps;
  const {groupcccf9Props, setgroupcccf9Props}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3, setstage_details_groupbaac3}= useContext(TotalContext) as TotalContextProps;
  const {stage_details_groupbaac3Props, setstage_details_groupbaac3Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300, setevidence_configuration_group80300}= useContext(TotalContext) as TotalContextProps;
  const {evidence_configuration_group80300Props, setevidence_configuration_group80300Props}= useContext(TotalContext) as TotalContextProps;
  const {text_26244c, settext_26244c}= useContext(TotalContext) as TotalContextProps;
  const {min_evidence_count7cdda, setmin_evidence_count7cdda}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory46a07, setis_mandatory46a07}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required45165, setevidence_required45165}= useContext(TotalContext) as TotalContextProps;
  const {guidance_text68090, setguidance_text68090}= useContext(TotalContext) as TotalContextProps;
  const {is_active8fb50, setis_active8fb50}= useContext(TotalContext) as TotalContextProps;
  const {text_26244cProps, settext_26244cProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[text_26244c?.refresh])

  if (text_26244c?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 10`,gridRow: `1 / 13`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Evidence and Configuration")}
</Text>
  </div>
  )
}

export default Texttext_2
