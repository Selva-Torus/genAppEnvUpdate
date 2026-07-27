'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textemployee_name_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id_textb89d8, setleave_req_id_textb89d8}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_idd31d0, setleave_req_idd31d0}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number_text70447, setleave_request_number_text70447}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number4d42c, setleave_request_number4d42c}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text8d1dd, setemployee_name_text8d1dd}= useContext(TotalContext) as TotalContextProps;
  const {full_name74b7d, setfull_name74b7d}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_name_text8d1dd?.refresh])

  if (employee_name_text8d1dd?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 6`,gridRow: `15 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("Employee Name")}
</Text>
  </div>
  )
}

export default Textemployee_name_text
