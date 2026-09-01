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

const Texttotal_amount = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_channelcountvphdashboard_v1Props, setdfd_channelcountvphdashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps;
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps;
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps;
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps;
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps;
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps;
  const {total_value_icon16d5d, settotal_value_icon16d5d}= useContext(TotalContext) as TotalContextProps;
  const {total_value_labeld1dce, settotal_value_labeld1dce}= useContext(TotalContext) as TotalContextProps;
  const {total_amount94c0b, settotal_amount94c0b}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps;
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;
  const {total_amount94c0bProps, settotal_amount94c0bProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
      if ("hasLogicCenter" in dfd_channelcountvphdashboard_v1Props && !dfd_channelcountvphdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_channelcountvphdashboard_v1Props.dstKey,
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
        settotal_value_group9d783((pre: any) => ({
          ...pre,
          total_value: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.total_value
            : "0"
        }))
      }
      else{
      if(filterFlag){
        settotal_value_group9d783((pre: any) => ({
          ...pre,
          total_value: total_amount94c0bProps?.filteredData?.length > 0
            ? total_amount94c0bProps?.filteredData[0]?.total_value
            : "0"
        }))
      }else if(Array.isArray(dfd_channelcountvphdashboard_v1Props) && dfd_channelcountvphdashboard_v1Props && !total_value_group9d783.total_value){
        settotal_value_group9d783((pre:any)=>({...pre,total_value:dfd_channelcountvphdashboard_v1Props[0]?.total_value}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[total_amount94c0b?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_channelcountvphdashboard_v1Props) && !total_value_group9d783.total_value){
    settotal_value_group9d783((pre:any)=>({...pre,total_value:dfd_channelcountvphdashboard_v1Props[0]?.total_value}));
  }
  },[dfd_channelcountvphdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!total_amount94c0bProps?.filterProps) return;
    handleMapperValue(total_amount94c0bProps?.filterProps,total_amount94c0bProps?.filterFlag);
  },[total_amount94c0bProps?.filterProps])

  if (total_amount94c0b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 16`,gridRow: `9 / 19`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset(isDynamic ? item?.total_value : (total_value_group9d783?.total_value || ""))}
</Text>
  </div>
  )
}

export default Texttotal_amount
