'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textleave_management = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {overall_group3fa8c, setoverall_group3fa8c}= useContext(TotalContext) as TotalContextProps;
  const {overall_group3fa8cProps, setoverall_group3fa8cProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_management4632d, setleave_management4632d}= useContext(TotalContext) as TotalContextProps;
  const {search_buttonc7fc6, setsearch_buttonc7fc6}= useContext(TotalContext) as TotalContextProps;
  const {tab_groupfe908, settab_groupfe908}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233, setleave_request_table25233}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_table25233Props, setleave_request_table25233Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cd, setemp_table_group0a9cd}= useContext(TotalContext) as TotalContextProps;
  const {emp_table_group0a9cdProps, setemp_table_group0a9cdProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32b, setleave_req_tablesbb32b}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_tablesbb32bProps, setleave_req_tablesbb32bProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0b, setapproval_pendinge1c0b}= useContext(TotalContext) as TotalContextProps;
  const {approval_pendinge1c0bProps, setapproval_pendinge1c0bProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215, setleave_approval_pending_group05215}= useContext(TotalContext) as TotalContextProps;
  const {leave_approval_pending_group05215Props, setleave_approval_pending_group05215Props}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294f, setapproval_pending_tablee294f}= useContext(TotalContext) as TotalContextProps;
  const {approval_pending_tablee294fProps, setapproval_pending_tablee294fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[leave_management4632d?.refresh])

  if (leave_management4632d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 11`,gridRow: `1 / 8`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!text-black !font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Leave Management")}
</Text>
  </div>
  )
}

export default Textleave_management
