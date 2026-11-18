'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdel_divider_1 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group3becd, setdel_group3becd}= useContext(TotalContext) as TotalContextProps;
  const {del_group3becdProps, setdel_group3becdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc7473, setdelete_heading_txtc7473}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1f696f, setdel_divider_1f696f}= useContext(TotalContext) as TotalContextProps;
  const {ref_name_textaabe8, setref_name_textaabe8}= useContext(TotalContext) as TotalContextProps;
  const {ref_name9d1bd, setref_name9d1bd}= useContext(TotalContext) as TotalContextProps;
  const {vault_path_textf581e, setvault_path_textf581e}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf1128, setvault_pathf1128}= useContext(TotalContext) as TotalContextProps;
  const {credential_type_text132b9, setcredential_type_text132b9}= useContext(TotalContext) as TotalContextProps;
  const {credential_type67f51, setcredential_type67f51}= useContext(TotalContext) as TotalContextProps;
  const {texta0b32, settexta0b32}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_207f16, setdel_divider_207f16}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_idc5f97, setcredential_ref_idc5f97}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9c8ad, setdel_cancel_btn9c8ad}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnc484c, setdel_okl_btnc484c}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_1f696f?.refresh])

  if (del_divider_1f696f?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `7 / 9`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#dad7d7"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdel_divider_1
