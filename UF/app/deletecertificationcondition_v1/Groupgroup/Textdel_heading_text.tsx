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

const Textdel_heading_text = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group33388, setgroup33388}= useContext(TotalContext) as TotalContextProps;
  const {group33388Props, setgroup33388Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_textaea5a, setdel_heading_textaea5a}= useContext(TotalContext) as TotalContextProps;
  const {divider_1e1b27, setdivider_1e1b27}= useContext(TotalContext) as TotalContextProps;
  const {stage_name_txt46880, setstage_name_txt46880}= useContext(TotalContext) as TotalContextProps;
  const {stage_name53e8f, setstage_name53e8f}= useContext(TotalContext) as TotalContextProps;
  const {del_condition_txt5e2fe, setdel_condition_txt5e2fe}= useContext(TotalContext) as TotalContextProps;
  const {condition_txt9eed1, setcondition_txt9eed1}= useContext(TotalContext) as TotalContextProps;
  const {del_status_code_txt7812f, setdel_status_code_txt7812f}= useContext(TotalContext) as TotalContextProps;
  const {status_code3655c, setstatus_code3655c}= useContext(TotalContext) as TotalContextProps;
  const {del_due_date4d800, setdel_due_date4d800}= useContext(TotalContext) as TotalContextProps;
  const {due_dated27ee, setdue_dated27ee}= useContext(TotalContext) as TotalContextProps;
  const {textd0517, settextd0517}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d32a6, setdivider_2d32a6}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnf4b06, setcancel_btnf4b06}= useContext(TotalContext) as TotalContextProps;
  const {del_btn5ea29, setdel_btn5ea29}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_idb65fc, setcert_condition_idb65fc}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idd8967, setcert_stage_idd8967}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_textaea5aProps, setdel_heading_textaea5aProps} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_heading_textaea5a?.refresh])

  if (del_heading_textaea5a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `2 / 9`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className=""
  variant="subheader-3"
  color="primary"
>
      {keyset("Are you sure you want to delete this Certificate Condition?")}
</Text>
  </div>
  )
}

export default Textdel_heading_text
