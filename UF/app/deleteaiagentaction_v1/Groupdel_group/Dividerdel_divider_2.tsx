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
  const {del_group87d56, setdel_group87d56}= useContext(TotalContext) as TotalContextProps;
  const {del_group87d56Props, setdel_group87d56Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtb320e, setdelete_heading_txtb320e}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1e8bce, setdel_divider_1e8bce}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text4d46c, setasset_name_text4d46c}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_idc996d, setagent_action_idc996d}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text5a75b, setasset_code_text5a75b}= useContext(TotalContext) as TotalContextProps;
  const {action_name4a670, setaction_name4a670}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd42be, setasset_type_code_textd42be}= useContext(TotalContext) as TotalContextProps;
  const {target_systemec4ff, settarget_systemec4ff}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text38bd3, setrisk_tier_code_text38bd3}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_api8bd7c, settool_or_api8bd7c}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text05717, setlifecycle_status_code_text05717}= useContext(TotalContext) as TotalContextProps;
  const {is_active7f904, setis_active7f904}= useContext(TotalContext) as TotalContextProps;
  const {text7f98b, settext7f98b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_217aff, setdel_divider_217aff}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn5cca7, setdel_cancel_btn5cca7}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn87d21, setdel_okl_btn87d21}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_217aff?.refresh])

  if (del_divider_217aff?.isHidden) {
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
