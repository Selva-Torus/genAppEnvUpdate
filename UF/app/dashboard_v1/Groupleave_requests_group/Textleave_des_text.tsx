'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textleave_des_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_hrmdashboard_v1Props, setdfd_hrmdashboard_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {header_groupf778a, setheader_groupf778a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf778aProps, setheader_groupf778aProps}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cbProps, sethrm_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9, settotal_employees_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9Props, settotal_employees_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4Props, setpending_access_req_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5, setleave_requests_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5Props, setleave_requests_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_text92f3e, setleave_req_text92f3e}= useContext(TotalContext) as TotalContextProps;
  const {leave_iconce916, setleave_iconce916}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests46b7c, setleave_requests46b7c}= useContext(TotalContext) as TotalContextProps;
  const {leave_des_text39ee0, setleave_des_text39ee0}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580d, setonboarding_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580dProps, setonboarding_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6f, settable_groupe0a6f}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6fProps, settable_groupe0a6fProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010, setsubscreen1c010}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010Props, setsubscreen1c010Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008, setemployee_table_group55008}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008Props, setemployee_table_group55008Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40b, setemp_group5e40b}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40bProps, setemp_group5e40bProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9dProps, settotal_employee_tablee4e9dProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258, setaccess_req_groupb1258}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258Props, setaccess_req_groupb1258Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167, setacc_group3b167}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167Props, setacc_group3b167Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aac, setaccess_req_tablec5aac}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aacProps, setaccess_req_tablec5aacProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      if ("hasLogicCenter" in dfd_hrmdashboard_v1Props && !dfd_hrmdashboard_v1Props.hasLogicCenter) {
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_hrmdashboard_v1Props.dstKey,
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
        setleave_requests_group4beb5((pre: any) => {
          return { ...pre, on_leave_today: api_paginationData.data.records[0]?.on_leave_today }
        })
        }
      }
      else{
      if(Array.isArray(dfd_hrmdashboard_v1Props) && dfd_hrmdashboard_v1Props && !leave_requests_group4beb5.on_leave_today){
        setleave_requests_group4beb5((pre:any)=>({...pre,on_leave_today:dfd_hrmdashboard_v1Props[0]?.on_leave_today}));
      }
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[leave_des_text39ee0?.refresh])

  useEffect(() => {
  if(Array.isArray(dfd_hrmdashboard_v1Props) && !leave_requests_group4beb5.on_leave_today){
    setleave_requests_group4beb5((pre:any)=>({...pre,on_leave_today:dfd_hrmdashboard_v1Props[0]?.on_leave_today}));
  }
  },[dfd_hrmdashboard_v1Props])

  if (leave_des_text39ee0?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 12`,gridRow: `15 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"center"}
  className="!bg-[#F4F5FA] !text-[#71717A] !rounded-2xl"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.on_leave_today : (leave_requests_group4beb5?.on_leave_today || ""))}
</Text>
  </div>
  )
}

export default Textleave_des_text
