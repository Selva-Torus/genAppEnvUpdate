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

const Textamr_queue = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {amr_queue_text17149, setamr_queue_text17149}= useContext(TotalContext) as TotalContextProps;
  const {icon_total_assest42cc7, seticon_total_assest42cc7}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue0e5a7, setamr_queue0e5a7}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_desc10020, setamr_queue_desc10020}= useContext(TotalContext) as TotalContextProps;
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
  const {amr_queue0e5a7Props, setamr_queue0e5a7Props} = useContext(TotalContext) as TotalContextProps;
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
        setamr_queue_group3c082((pre: any) => ({
          ...pre,
          amr_queue: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.amr_queue
            : "0"
        }))
      }
      else{
      if(filterFlag){
        setamr_queue_group3c082((pre: any) => ({
          ...pre,
          amr_queue: amr_queue0e5a7Props?.filteredData?.length > 0
            ? amr_queue0e5a7Props?.filteredData[0]?.amr_queue
            : "0"
        }))
      }else if(Array.isArray(dfd_cardsdashboard_v1Props) && dfd_cardsdashboard_v1Props && !amr_queue_group3c082.amr_queue){
        setamr_queue_group3c082((pre:any)=>({...pre,amr_queue:dfd_cardsdashboard_v1Props[0]?.amr_queue}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[amr_queue0e5a7?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_cardsdashboard_v1Props) && !amr_queue_group3c082.amr_queue){
    setamr_queue_group3c082((pre:any)=>({...pre,amr_queue:dfd_cardsdashboard_v1Props[0]?.amr_queue}));
  }
  },[dfd_cardsdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!amr_queue0e5a7Props?.filterProps) return;
    handleMapperValue(amr_queue0e5a7Props?.filterProps,amr_queue0e5a7Props?.filterFlag);
  },[amr_queue0e5a7Props?.filterProps])

  if (amr_queue0e5a7?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 19`,gridRow: `9 / 15`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-gray-900 !font-bold"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.amr_queue : (amr_queue_group3c082?.amr_queue || ""))}
</Text>
  </div>
  )
}

export default Textamr_queue
