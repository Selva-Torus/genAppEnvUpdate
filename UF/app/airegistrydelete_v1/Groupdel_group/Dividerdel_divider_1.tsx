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
  const {del_groupd73cb, setdel_groupd73cb}= useContext(TotalContext) as TotalContextProps;
  const {del_groupd73cbProps, setdel_groupd73cbProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt74c2d, setdelete_heading_txt74c2d}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1258b4, setdel_divider_1258b4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7fd5e, setasset_name_text7fd5e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64b8e, setasset_name64b8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text333ee, setasset_code_text333ee}= useContext(TotalContext) as TotalContextProps;
  const {asset_codeabd34, setasset_codeabd34}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textfadb9, setasset_type_code_textfadb9}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code2fd2c, setasset_type_code2fd2c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text398fb, setrisk_tier_code_text398fb}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codea1cf5, setrisk_tier_codea1cf5}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_texte5517, setlifecycle_status_code_texte5517}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code21964, setlifecycle_status_code21964}= useContext(TotalContext) as TotalContextProps;
  const {textb25bd, settextb25bd}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_25d9ec, setdel_divider_25d9ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id005d2, setai_asset_id005d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn0ef33, setdel_cancel_btn0ef33}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn0f4f4, setdel_okl_btn0f4f4}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_1258b4?.refresh])

  if (del_divider_1258b4?.isHidden) {
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
