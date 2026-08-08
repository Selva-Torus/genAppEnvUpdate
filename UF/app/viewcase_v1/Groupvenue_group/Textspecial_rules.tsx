'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textspecial_rules = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps;
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps;
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps;
  const {rules_iconfb03f, setrules_iconfb03f}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_textecd92, setvenue_special_rules_textecd92}= useContext(TotalContext) as TotalContextProps;
  const {special_rules2001a, setspecial_rules2001a}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_divider206ab, setvenue_special_rules_divider206ab}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps;
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividers28a68, setvenue_special_rules_dividers28a68}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividerss0c16e, setvenue_special_rules_dividerss0c16e}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_special_rules_dividersssdcaab, setvenue_special_rules_dividersssdcaab}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps;
  const {venues_special_rules_dividerssss44419, setvenues_special_rules_dividerssss44419}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps;
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules2001aProps, setspecial_rules2001aProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[special_rules2001a?.refresh])

  if (special_rules2001a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 22`,gridRow: `21 / 46`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!p-1"
  variant="subheader-3"
  color="primary"
>
      {keyset("Please review the following venue specific rules and requirements before submitting this case")}
</Text>
  </div>
  )
}

export default Textspecial_rules
