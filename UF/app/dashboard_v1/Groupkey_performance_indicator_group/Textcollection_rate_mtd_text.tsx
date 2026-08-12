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

const Textcollection_rate_mtd_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {header_groupd8ba9, setheader_groupd8ba9}= useContext(TotalContext) as TotalContextProps;
  const {header_groupd8ba9Props, setheader_groupd8ba9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03, setasset_dashboard_group1aa03}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03Props, setasset_dashboard_group1aa03Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082, setamr_queue_group3c082}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082Props, setamr_queue_group3c082Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128c, setpending_file_group2128c}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128cProps, setpending_file_group2128cProps}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0ca, setservice_pending_group8c0ca}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0caProps, setservice_pending_group8c0caProps}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0Props, setslas_at_risk_group1f8c0Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57a, setcourt_rejection_groupdf57a}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57aProps, setcourt_rejection_groupdf57aProps}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074, setcollected_mtd_group0f074}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074Props, setcollected_mtd_group0f074Props}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicators_text4f6db, setkey_performance_indicators_text4f6db}= useContext(TotalContext) as TotalContextProps;
  const {total_active_accounts_texted4d7, settotal_active_accounts_texted4d7}= useContext(TotalContext) as TotalContextProps;
  const {total_active_accounts_text1b45d0, settotal_active_accounts_text1b45d0}= useContext(TotalContext) as TotalContextProps;
  const {divider13ca73, setdivider13ca73}= useContext(TotalContext) as TotalContextProps;
  const {avg_days_to_judgment_text82b69, setavg_days_to_judgment_text82b69}= useContext(TotalContext) as TotalContextProps;
  const {avg_days_to_judgment_text14ed01, setavg_days_to_judgment_text14ed01}= useContext(TotalContext) as TotalContextProps;
  const {divider214543, setdivider214543}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_rate_text86ac0, setcourt_rejection_rate_text86ac0}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_rate_text10b69f, setcourt_rejection_rate_text10b69f}= useContext(TotalContext) as TotalContextProps;
  const {divider39db36, setdivider39db36}= useContext(TotalContext) as TotalContextProps;
  const {compliance_score_textbf682, setcompliance_score_textbf682}= useContext(TotalContext) as TotalContextProps;
  const {compliance_score_text1f41e4, setcompliance_score_text1f41e4}= useContext(TotalContext) as TotalContextProps;
  const {divider432793, setdivider432793}= useContext(TotalContext) as TotalContextProps;
  const {collection_rate_mtd_text335f5, setcollection_rate_mtd_text335f5}= useContext(TotalContext) as TotalContextProps;
  const {collection_rate_mtd_text16258d, setcollection_rate_mtd_text16258d}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  const {collection_rate_mtd_text335f5Props, setcollection_rate_mtd_text335f5Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[collection_rate_mtd_text335f5?.refresh])

  if (collection_rate_mtd_text335f5?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 17`,gridRow: `58 / 63`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("📊 MTD Collection Rate")}
</Text>
  </div>
  )
}

export default Textcollection_rate_mtd_text
