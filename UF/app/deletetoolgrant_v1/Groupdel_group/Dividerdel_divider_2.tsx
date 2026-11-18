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
  const {del_groupbb7f0, setdel_groupbb7f0}= useContext(TotalContext) as TotalContextProps;
  const {del_groupbb7f0Props, setdel_groupbb7f0Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt26f8b, setdelete_heading_txt26f8b}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_1c0da3, setdel_divider_1c0da3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_textfb333, setasset_name_textfb333}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id281e4, settool_grant_id281e4}= useContext(TotalContext) as TotalContextProps;
  const {agent_name_text71756, setagent_name_text71756}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5c40e, setasset_name5c40e}= useContext(TotalContext) as TotalContextProps;
  const {too_operation_texte0dbf, settoo_operation_texte0dbf}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation03227, settool_operation03227}= useContext(TotalContext) as TotalContextProps;
  const {access_mode_text74d1f, setaccess_mode_text74d1f}= useContext(TotalContext) as TotalContextProps;
  const {access_mode763de, setaccess_mode763de}= useContext(TotalContext) as TotalContextProps;
  const {ststus_txt329f4, setststus_txt329f4}= useContext(TotalContext) as TotalContextProps;
  const {status659a7, setstatus659a7}= useContext(TotalContext) as TotalContextProps;
  const {textb6666, settextb6666}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_27f134, setdel_divider_27f134}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn3e3af, setdel_cancel_btn3e3af}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnbeefc, setdel_okl_btnbeefc}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_27f134?.refresh])

  if (del_divider_27f134?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `47 / 48`, gap:``, height: `100%`}} >
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
