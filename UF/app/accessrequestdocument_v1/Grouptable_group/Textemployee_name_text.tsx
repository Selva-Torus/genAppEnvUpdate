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
  const {doc_attached_groupd9ca3, setdoc_attached_groupd9ca3}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupd9ca3Props, setdoc_attached_groupd9ca3Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33, settable_groupbcd33}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33Props, settable_groupbcd33Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id_text12a0d, setaccess_req_id_text12a0d}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id5df25, setaccess_req_id5df25}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textdcd44, setrequest_number_textdcd44}= useContext(TotalContext) as TotalContextProps;
  const {request_numberd4d19, setrequest_numberd4d19}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text578db, setemployee_name_text578db}= useContext(TotalContext) as TotalContextProps;
  const {full_name84f79, setfull_name84f79}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_name_text578db?.refresh])

  if (employee_name_text578db?.isHidden) {
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
