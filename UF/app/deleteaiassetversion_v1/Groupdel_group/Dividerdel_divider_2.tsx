'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdel_divider_2 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {del_group0a1e4, setdel_group0a1e4}= useContext(TotalContext) as TotalContextProps;
  const {del_group0a1e4Props, setdel_group0a1e4Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt257e2, setdelete_heading_txt257e2}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1d3380, setdel_divider_1d3380}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textd9565, setasset_name_textd9565}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_idd8a9c, setasset_version_idd8a9c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_textbb47a, setasset_code_textbb47a}= useContext(TotalContext) as TotalContextProps;
  const {version_no1d837, setversion_no1d837}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text2a3a9, setasset_type_code_text2a3a9}= useContext(TotalContext) as TotalContextProps;
  const {change_type_code38ad2, setchange_type_code38ad2}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textf8ea3, setrisk_tier_code_textf8ea3}= useContext(TotalContext) as TotalContextProps;
  const {valid_from0005c, setvalid_from0005c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textdbc1a, setlifecycle_status_code_textdbc1a}= useContext(TotalContext) as TotalContextProps;
  const {valid_to432ce, setvalid_to432ce}= useContext(TotalContext) as TotalContextProps;
  const {textc1c26, settextc1c26}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2e3d3b, setdel_divider_2e3d3b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn9abbc, setdel_cancel_btn9abbc}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn82920, setdel_okl_btn82920}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_2e3d3b?.refresh])

  if (del_divider_2e3d3b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `48 / 49`, gap:``, height: `100%`}} >
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

export default Dividerdel_divider_2
