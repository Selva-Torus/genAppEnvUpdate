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
  const {groupb40f5, setgroupb40f5}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5Props, setgroupb40f5Props}= useContext(TotalContext) as TotalContextProps;
  const {del_headibg_textff66f, setdel_headibg_textff66f}= useContext(TotalContext) as TotalContextProps;
  const {divider_103b38, setdivider_103b38}= useContext(TotalContext) as TotalContextProps;
  const {del_template_stage_id9994c, setdel_template_stage_id9994c}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_id33d37, settemplate_stage_id33d37}= useContext(TotalContext) as TotalContextProps;
  const {del_cert_template_id08b25, setdel_cert_template_id08b25}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id54cca, setcert_template_id54cca}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_namef6a12, setdel_stage_namef6a12}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6920f, setstage_name6920f}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_type_codeb7ed2, setdel_stage_type_codeb7ed2}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code0d58a, setstage_type_code0d58a}= useContext(TotalContext) as TotalContextProps;
  const {del_sla_days4f73f, setdel_sla_days4f73f}= useContext(TotalContext) as TotalContextProps;
  const {sla_days7b386, setsla_days7b386}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active9e4c4, setdel_is_active9e4c4}= useContext(TotalContext) as TotalContextProps;
  const {is_active312fd, setis_active312fd}= useContext(TotalContext) as TotalContextProps;
  const {combo_text1c6ae, setcombo_text1c6ae}= useContext(TotalContext) as TotalContextProps;
  const {divider_2a3264, setdivider_2a3264}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btneba2d, setcancel_btneba2d}= useContext(TotalContext) as TotalContextProps;
  const {ok_btn01d91, setok_btn01d91}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idtexte686f, settemplate_stage_idtexte686f}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_103b38?.refresh])

  if (divider_103b38?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 24`,gridRow: `14 / 17`, gap:``, height: `100%`}} >
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
