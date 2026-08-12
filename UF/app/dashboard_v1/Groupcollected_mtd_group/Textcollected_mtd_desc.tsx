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

const Textcollected_mtd_desc = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {collected_mtd_textf5ff3, setcollected_mtd_textf5ff3}= useContext(TotalContext) as TotalContextProps;
  const {iconb9347, seticonb9347}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd65ae0, setcollected_mtd65ae0}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_desc21bcb, setcollected_mtd_desc21bcb}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_desc21bcbProps, setcollected_mtd_desc21bcbProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[collected_mtd_desc21bcb?.refresh])

  if (collected_mtd_desc21bcb?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `15 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#F4F5FA] !text-[#16A34A] !rounded-2xl !pl-2"
  variant="subheader-1"
  color="primary"
>
      {keyset("↗ +12.4% vs last month")}
</Text>
  </div>
  )
}

export default Textcollected_mtd_desc
