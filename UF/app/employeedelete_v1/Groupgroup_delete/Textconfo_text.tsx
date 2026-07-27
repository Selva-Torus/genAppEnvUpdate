'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Textconfo_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
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
  const {group_delete68104, setgroup_delete68104}= useContext(TotalContext) as TotalContextProps;
  const {group_delete68104Props, setgroup_delete68104Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textf472f, setdelete_heading_textf472f}= useContext(TotalContext) as TotalContextProps;
  const {divider_se84d1, setdivider_se84d1}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_textd7eed, setemployee_code_textd7eed}= useContext(TotalContext) as TotalContextProps;
  const {employee_code89740, setemployee_code89740}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text4a492, setfull_name_text4a492}= useContext(TotalContext) as TotalContextProps;
  const {full_name89c4f, setfull_name89c4f}= useContext(TotalContext) as TotalContextProps;
  const {work_email_text10688, setwork_email_text10688}= useContext(TotalContext) as TotalContextProps;
  const {work_email16f90, setwork_email16f90}= useContext(TotalContext) as TotalContextProps;
  const {employment_type_textc33f9, setemployment_type_textc33f9}= useContext(TotalContext) as TotalContextProps;
  const {employment_type48765, setemployment_type48765}= useContext(TotalContext) as TotalContextProps;
  const {employee_status_textef64f, setemployee_status_textef64f}= useContext(TotalContext) as TotalContextProps;
  const {employee_status8c982, setemployee_status8c982}= useContext(TotalContext) as TotalContextProps;
  const {confo_text730b1, setconfo_text730b1}= useContext(TotalContext) as TotalContextProps;
  const {divider0b449, setdivider0b449}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonccddf, setcancel_buttonccddf}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3d34b, setok_button3d34b}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7e621, setemployee_id7e621}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[confo_text730b1?.refresh])

  if (confo_text730b1?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `40 / 45`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-2"
  color="primary"
>
      {keyset("⚠️This action cannot be undone.")}
</Text>
  </div>
  )
}

export default Textconfo_text
