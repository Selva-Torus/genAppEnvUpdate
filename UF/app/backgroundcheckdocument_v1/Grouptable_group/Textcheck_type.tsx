'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textcheck_type = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  },[check_type4e3f3?.refresh])

  if (check_type4e3f3?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `6 / 25`,gridRow: `8 / 14`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!bg-[#f0f2f7] !border !border-[#c4c4c4] !text-black"
  variant="subheader-1"
  color="primary"
>
      {keyset(isDynamic ? item?.check_type : (table_groupb0ef9?.check_type || ""))}
</Text>
  </div>
  )
}

export default Textcheck_type
