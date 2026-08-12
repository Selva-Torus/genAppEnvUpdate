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

const Textintrest_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_text3a919, setintrest_text3a919}= useContext(TotalContext) as TotalContextProps;
  const {interest783c4, setinterest783c4}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_text3a919Props, setintrest_text3a919Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[intrest_text3a919?.refresh])

  if (intrest_text3a919?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 7`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("INTEREST")}
</Text>
  </div>
  )
}

export default Textintrest_text
