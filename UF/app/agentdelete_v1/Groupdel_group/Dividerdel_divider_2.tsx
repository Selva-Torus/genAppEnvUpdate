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
  const {del_group9b94a, setdel_group9b94a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9b94aProps, setdel_group9b94aProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt85a72, setdelete_heading_txt85a72}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1a0820, setdel_divider_1a0820}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text203a8, setasset_name_text203a8}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee9a75, setasset_namee9a75}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref_texteb31d, setagent_identity_ref_texteb31d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref64e77, setagent_identity_ref64e77}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider_textc3f7e, setidentity_provider_textc3f7e}= useContext(TotalContext) as TotalContextProps;
  const {identity_providerd954f, setidentity_providerd954f}= useContext(TotalContext) as TotalContextProps;
  const {textf0a5f, settextf0a5f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eac8b, setdel_divider_2eac8b}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_idbe6d2, setagent_control_idbe6d2}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnc83c5, setdel_cancel_btnc83c5}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn2a546, setdel_okl_btn2a546}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_2eac8b?.refresh])

  if (del_divider_2eac8b?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `35 / 36`, gap:``, height: `100%`}} >
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
