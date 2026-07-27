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
  const {doc_attached_groupb4f40, setdoc_attached_groupb4f40}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40Props, setdoc_attached_groupb4f40Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9, settable_groupb0ef9}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9Props, settable_groupb0ef9Props}= useContext(TotalContext) as TotalContextProps;
  const {check_id_text5c745, setcheck_id_text5c745}= useContext(TotalContext) as TotalContextProps;
  const {check_id3aca0, setcheck_id3aca0}= useContext(TotalContext) as TotalContextProps;
  const {check_type_text4cf7f, setcheck_type_text4cf7f}= useContext(TotalContext) as TotalContextProps;
  const {check_type4e3f3, setcheck_type4e3f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_name_text2283d, setemployee_name_text2283d}= useContext(TotalContext) as TotalContextProps;
  const {full_name92cde, setfull_name92cde}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2f, setemployee_doc_table78f2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2fProps, setemployee_doc_table78f2fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[employee_name_text2283d?.refresh])

  if (employee_name_text2283d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 6`,gridRow: `15 / 21`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold "
  variant="subheader-2"
  color="primary"
>
      {keyset("Employee Name")}
</Text>
  </div>
  )
}

export default Textemployee_name_text
