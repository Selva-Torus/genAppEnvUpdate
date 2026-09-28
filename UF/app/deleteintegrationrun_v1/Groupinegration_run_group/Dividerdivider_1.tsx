'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_1 = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {inegration_run_groupe1d5c, setinegration_run_groupe1d5c}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupe1d5cProps, setinegration_run_groupe1d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_header_textda5f0, setdelete_header_textda5f0}= useContext(TotalContext) as TotalContextProps;
  const {divider_1b3e45, setdivider_1b3e45}= useContext(TotalContext) as TotalContextProps;
  const {del_run_idbec07, setdel_run_idbec07}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id13501, setintegration_run_id13501}= useContext(TotalContext) as TotalContextProps;
  const {del_intergration_sorucename7fb8f, setdel_intergration_sorucename7fb8f}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_namece900, setintegration_source_namece900}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_codeb5d3d, setrun_trigger_codeb5d3d}= useContext(TotalContext) as TotalContextProps;
  const {del_trigger08e5f, setdel_trigger08e5f}= useContext(TotalContext) as TotalContextProps;
  const {del_start_onc70e3, setdel_start_onc70e3}= useContext(TotalContext) as TotalContextProps;
  const {stared_ona8f54, setstared_ona8f54}= useContext(TotalContext) as TotalContextProps;
  const {del_status29cc8, setdel_status29cc8}= useContext(TotalContext) as TotalContextProps;
  const {run_status_code37f79, setrun_status_code37f79}= useContext(TotalContext) as TotalContextProps;
  const {del_action1cf57, setdel_action1cf57}= useContext(TotalContext) as TotalContextProps;
  const {divider_2dbf85, setdivider_2dbf85}= useContext(TotalContext) as TotalContextProps;
  const {integration_run_id_texta0ce0, setintegration_run_id_texta0ce0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btna8a96, setcancel_btna8a96}= useContext(TotalContext) as TotalContextProps;
  const {del_btn80c50, setdel_btn80c50}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_1b3e45?.refresh])

  if (divider_1b3e45?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `11 / 13`, gap:``, height: `100%`}} >
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

export default Dividerdivider_1
