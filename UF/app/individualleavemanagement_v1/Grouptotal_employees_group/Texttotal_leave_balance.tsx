'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttotal_leave_balance = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_individualleavereqcards_v1Props, setdfd_individualleavereqcards_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {divider4a3ae, setdivider4a3ae}= useContext(TotalContext) as TotalContextProps;
  const {leave_iconfc692, setleave_iconfc692}= useContext(TotalContext) as TotalContextProps;
  const {total_leave_bal_textdb7dd, settotal_leave_bal_textdb7dd}= useContext(TotalContext) as TotalContextProps;
  const {total_leave_balancebbdf8, settotal_leave_balancebbdf8}= useContext(TotalContext) as TotalContextProps;
  const {days_text8f7e1, setdays_text8f7e1}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_individualleavereqcards_v1Props && !dfd_individualleavereqcards_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_individualleavereqcards_v1Props.dstKey,
            page: 1,
            count: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(api_paginationData.data.records?.length){
        settotal_employees_group69415((pre: any) => {
          return { ...pre, total_leave_balance: api_paginationData.data.records[0]?.total_leave_balance }
        })
        }
      }
      else{
      if(Array.isArray(dfd_individualleavereqcards_v1Props) && dfd_individualleavereqcards_v1Props && !total_employees_group69415.total_leave_balance){
        settotal_employees_group69415((pre:any)=>({...pre,total_leave_balance:dfd_individualleavereqcards_v1Props[0]?.total_leave_balance}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[total_leave_balancebbdf8?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_individualleavereqcards_v1Props) && !total_employees_group69415.total_leave_balance){
    settotal_employees_group69415((pre:any)=>({...pre,total_leave_balance:dfd_individualleavereqcards_v1Props[0]?.total_leave_balance}));
  }
  },[dfd_individualleavereqcards_v1Props])

  if (total_leave_balancebbdf8?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 15`,gridRow: `10 / 16`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-purple-700 !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset(isDynamic ? item?.total_leave_balance : (total_employees_group69415?.total_leave_balance || ""))}
</Text>
  </div>
  )
}

export default Texttotal_leave_balance
