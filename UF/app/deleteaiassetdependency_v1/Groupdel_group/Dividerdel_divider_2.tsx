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
  const {del_group75aad, setdel_group75aad}= useContext(TotalContext) as TotalContextProps;
  const {del_group75aadProps, setdel_group75aadProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtea30c, setdelete_heading_txtea30c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_145e91, setdel_divider_145e91}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7e015, setasset_name_text7e015}= useContext(TotalContext) as TotalContextProps;
  const {dependency_id4cc36, setdependency_id4cc36}= useContext(TotalContext) as TotalContextProps;
  const {asset_code_text08d4f, setasset_code_text08d4f}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code9420e, setdependency_type_code9420e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code_textd9470, setasset_type_code_textd9470}= useContext(TotalContext) as TotalContextProps;
  const {dependency_name3b43e, setdependency_name3b43e}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code_text5d15a, setrisk_tier_code_text5d15a}= useContext(TotalContext) as TotalContextProps;
  const {direction3a025, setdirection3a025}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code_text04375, setlifecycle_status_code_text04375}= useContext(TotalContext) as TotalContextProps;
  const {is_activeecfb5, setis_activeecfb5}= useContext(TotalContext) as TotalContextProps;
  const {texte1857, settexte1857}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_22accf, setdel_divider_22accf}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn1a923, setdel_cancel_btn1a923}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn48b24, setdel_okl_btn48b24}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[del_divider_22accf?.refresh])

  if (del_divider_22accf?.isHidden) {
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
