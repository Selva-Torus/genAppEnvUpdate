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

const Textoperations_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;
  const {assets_by_business_unit_text4d6de, setassets_by_business_unit_text4d6de}= useContext(TotalContext) as TotalContextProps;
  const {consumer_lending_textefa99, setconsumer_lending_textefa99}= useContext(TotalContext) as TotalContextProps;
  const {consumer_lending_progress2fc54, setconsumer_lending_progress2fc54}= useContext(TotalContext) as TotalContextProps;
  const {group_functions_text8952f, setgroup_functions_text8952f}= useContext(TotalContext) as TotalContextProps;
  const {group_functions_progress9da7f, setgroup_functions_progress9da7f}= useContext(TotalContext) as TotalContextProps;
  const {operations_text8f8e9, setoperations_text8f8e9}= useContext(TotalContext) as TotalContextProps;
  const {operations_progress41d7e, setoperations_progress41d7e}= useContext(TotalContext) as TotalContextProps;
  const {financial_crime_textcfa1a, setfinancial_crime_textcfa1a}= useContext(TotalContext) as TotalContextProps;
  const {financial_crime_progresse6070, setfinancial_crime_progresse6070}= useContext(TotalContext) as TotalContextProps;
  const {cards_payments_text80d57, setcards_payments_text80d57}= useContext(TotalContext) as TotalContextProps;
  const {cards_payments_progressc4402, setcards_payments_progressc4402}= useContext(TotalContext) as TotalContextProps;
  const {technology_textb5146, settechnology_textb5146}= useContext(TotalContext) as TotalContextProps;
  const {technology_progressc4269, settechnology_progressc4269}= useContext(TotalContext) as TotalContextProps;
  const {operations_text8f8e9Props, setoperations_text8f8e9Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[operations_text8f8e9?.refresh])

  if (operations_text8f8e9?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 9`,gridRow: `24 / 29`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-500 font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset("Operations")}
</Text>
  </div>
  )
}

export default Textoperations_text
