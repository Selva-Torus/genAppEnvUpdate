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

const Textjudgment_entered_text_1 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_text25b7b, setrecent_activity_text25b7b}= useContext(TotalContext) as TotalContextProps;
  const {amr_queued_textb4f27, setamr_queued_textb4f27}= useContext(TotalContext) as TotalContextProps;
  const {amr_queued_text_1dc178, setamr_queued_text_1dc178}= useContext(TotalContext) as TotalContextProps;
  const {divider1cb266, setdivider1cb266}= useContext(TotalContext) as TotalContextProps;
  const {judgment_entered_text2f3e7, setjudgment_entered_text2f3e7}= useContext(TotalContext) as TotalContextProps;
  const {judgment_entered_text_1d4af4, setjudgment_entered_text_1d4af4}= useContext(TotalContext) as TotalContextProps;
  const {divider2269d0, setdivider2269d0}= useContext(TotalContext) as TotalContextProps;
  const {service_completed_text835e5, setservice_completed_text835e5}= useContext(TotalContext) as TotalContextProps;
  const {service_completed_text_197211, setservice_completed_text_197211}= useContext(TotalContext) as TotalContextProps;
  const {divider3acb72, setdivider3acb72}= useContext(TotalContext) as TotalContextProps;
  const {amr_passed_text144d2, setamr_passed_text144d2}= useContext(TotalContext) as TotalContextProps;
  const {amr_passed_text188d24, setamr_passed_text188d24}= useContext(TotalContext) as TotalContextProps;
  const {divider4ffc0d, setdivider4ffc0d}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_texte1e9c, setcourt_rejection_texte1e9c}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_text16e38f, setcourt_rejection_text16e38f}= useContext(TotalContext) as TotalContextProps;
  const {divider52864b, setdivider52864b}= useContext(TotalContext) as TotalContextProps;
  const {service_assigned_textb2d7d, setservice_assigned_textb2d7d}= useContext(TotalContext) as TotalContextProps;
  const {service_assigned_text15a8e1, setservice_assigned_text15a8e1}= useContext(TotalContext) as TotalContextProps;
  const {divider6aaa01, setdivider6aaa01}= useContext(TotalContext) as TotalContextProps;
  const {amr_rejected_text92e50, setamr_rejected_text92e50}= useContext(TotalContext) as TotalContextProps;
  const {amr_rejected_text11a51a, setamr_rejected_text11a51a}= useContext(TotalContext) as TotalContextProps;
  const {judgment_entered_text_1d4af4Props, setjudgment_entered_text_1d4af4Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[judgment_entered_text_1d4af4?.refresh])

  if (judgment_entered_text_1d4af4?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `29 / 34`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-1"
  color="primary"
>
      {keyset("Judgment entered — $5,432.10")}
</Text>
  </div>
  )
}

export default Textjudgment_entered_text_1
