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

const Textservice_pending = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardsdashboard_v1Props, setdfd_cardsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {service_pending_textb9d5c, setservice_pending_textb9d5c}= useContext(TotalContext) as TotalContextProps;
  const {icon_warranty_expiringa065e, seticon_warranty_expiringa065e}= useContext(TotalContext) as TotalContextProps;
  const {service_pending0898e, setservice_pending0898e}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_desc91c8a, setservice_pending_desc91c8a}= useContext(TotalContext) as TotalContextProps;
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
  const {service_pending0898eProps, setservice_pending0898eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_cardsdashboard_v1Props && !dfd_cardsdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_cardsdashboard_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setservice_pending_group8c0ca((pre: any) => ({
          ...pre,
          service_pending: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.service_pending
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setservice_pending_group8c0ca((pre: any) => ({
          ...pre,
          service_pending: service_pending0898eProps?.filteredData?.length > 0
            ? service_pending0898eProps?.filteredData[0]?.service_pending
            : "0"
        }))
      }else if(Array.isArray(dfd_cardsdashboard_v1Props) && dfd_cardsdashboard_v1Props && !service_pending_group8c0ca.service_pending){
        setservice_pending_group8c0ca((pre:any)=>({...pre,service_pending:dfd_cardsdashboard_v1Props[0]?.service_pending}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[service_pending0898e?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_cardsdashboard_v1Props) && !service_pending_group8c0ca.service_pending){
    setservice_pending_group8c0ca((pre:any)=>({...pre,service_pending:dfd_cardsdashboard_v1Props[0]?.service_pending}));
  }
  },[dfd_cardsdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!service_pending0898eProps?.filterProps) return;
    handleMapperValue(service_pending0898eProps?.filterProps,service_pending0898eProps?.filterFlag);
  },[service_pending0898eProps?.filterProps])

  if (service_pending0898e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 19`,gridRow: `9 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.service_pending : (service_pending_group8c0ca?.service_pending || ""))}
</Text>
  </div>
  )
}

export default Textservice_pending
