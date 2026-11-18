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
  const {del_group7f870, setdel_group7f870}= useContext(TotalContext) as TotalContextProps;
  const {del_group7f870Props, setdel_group7f870Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtf9471, setdelete_heading_txtf9471}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1321ef, setdel_divider_1321ef}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text5cf8a, setasset_name_text5cf8a}= useContext(TotalContext) as TotalContextProps;
  const {identity_ide840b, setidentity_ide840b}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text9ff1b, setasset_code_text9ff1b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name6163e, setasset_name6163e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_text57627, setasset_type_code_text57627}= useContext(TotalContext) as TotalContextProps;
  const {principal_id3e7f4, setprincipal_id3e7f4}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text4fcd1, setrisk_tier_code_text4fcd1}= useContext(TotalContext) as TotalContextProps;
  const {principal_typefe01d, setprincipal_typefe01d}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_textc44b6, setlifecycle_status_code_textc44b6}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1bb9d, setidentity_provider1bb9d}= useContext(TotalContext) as TotalContextProps;
  const {text9d6d5, settext9d6d5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_23064f, setdel_divider_23064f}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn69608, setdel_cancel_btn69608}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn070a5, setdel_okl_btn070a5}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_1321ef?.refresh])

  if (del_divider_1321ef?.isHidden) {
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
