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
  const {del_group9ef8a, setdel_group9ef8a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9ef8aProps, setdel_group9ef8aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtdb5d3, setdelete_heading_txtdb5d3}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_156db0, setdel_divider_156db0}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text54f6e, setasset_name_text54f6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id410ac, setrisk_rule_id410ac}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text06814, setasset_code_text06814}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_codee559b, setrisk_rule_codee559b}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text95c11, setasset_type_code_text95c11}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_code8dc1a, setresult_tier_code8dc1a}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_textcc1ba, setrisk_tier_code_textcc1ba}= useContext(TotalContext) as TotalContextProps;
  const {effective_from26db3, seteffective_from26db3}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textacd8e, setlifecycle_status_code_textacd8e}= useContext(TotalContext) as TotalContextProps;
  const {is_active03bb0, setis_active03bb0}= useContext(TotalContext) as TotalContextProps;
  const {texted768, settexted768}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_28b40e, setdel_divider_28b40e}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn18f5b, setdel_cancel_btn18f5b}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2baeb, setdel_okl_btn2baeb}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_156db0?.refresh])

  if (del_divider_156db0?.isHidden) {
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
