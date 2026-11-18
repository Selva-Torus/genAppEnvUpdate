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
  const {del_group56243, setdel_group56243}= useContext(TotalContext) as TotalContextProps;
  const {del_group56243Props, setdel_group56243Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txte8a82, setdelete_heading_txte8a82}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1bd3d8, setdel_divider_1bd3d8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text60051, setasset_name_text60051}= useContext(TotalContext) as TotalContextProps;
  const {policy_code3279a, setpolicy_code3279a}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_texta659e, setasset_code_texta659e}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3072c, setpolicy_name3072c}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text620ea, setasset_type_code_text620ea}= useContext(TotalContext) as TotalContextProps;
  const {policy_type7ebd5, setpolicy_type7ebd5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text79046, setrisk_tier_code_text79046}= useContext(TotalContext) as TotalContextProps;
  const {applies_to_tiers7f62c, setapplies_to_tiers7f62c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc74b9, setlifecycle_status_code_textc74b9}= useContext(TotalContext) as TotalContextProps;
  const {test_status61eae, settest_status61eae}= useContext(TotalContext) as TotalContextProps;
  const {text48ed4, settext48ed4}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_24cf58, setdel_divider_24cf58}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_id35702, setpolicy_rule_id35702}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn42f6a, setdel_cancel_btn42f6a}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn6aa11, setdel_okl_btn6aa11}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_1bd3d8?.refresh])

  if (del_divider_1bd3d8?.isHidden) {
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
