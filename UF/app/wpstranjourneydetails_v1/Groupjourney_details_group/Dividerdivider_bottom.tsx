'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_bottom = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps;
  const {details_labelaa81c, setdetails_labelaa81c}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb49bf, setdivider_topb49bf}= useContext(TotalContext) as TotalContextProps;
  const {l_file_name7a6bd, setl_file_name7a6bd}= useContext(TotalContext) as TotalContextProps;
  const {l_emp_mol8c2e1, setl_emp_mol8c2e1}= useContext(TotalContext) as TotalContextProps;
  const {file_nameebc26, setfile_nameebc26}= useContext(TotalContext) as TotalContextProps;
  const {empl_mold6666, setempl_mold6666}= useContext(TotalContext) as TotalContextProps;
  const {l_fixed_amont9c6be, setl_fixed_amont9c6be}= useContext(TotalContext) as TotalContextProps;
  const {l_variable_amount98c92, setl_variable_amount98c92}= useContext(TotalContext) as TotalContextProps;
  const {fixed_amot7ca4c, setfixed_amot7ca4c}= useContext(TotalContext) as TotalContextProps;
  const {var_amontdd609, setvar_amontdd609}= useContext(TotalContext) as TotalContextProps;
  const {l_charge_amount53cd9, setl_charge_amount53cd9}= useContext(TotalContext) as TotalContextProps;
  const {l_agent_routing_code9af99, setl_agent_routing_code9af99}= useContext(TotalContext) as TotalContextProps;
  const {charge_amnt64cb4, setcharge_amnt64cb4}= useContext(TotalContext) as TotalContextProps;
  const {agent_routng_codee5a1e, setagent_routng_codee5a1e}= useContext(TotalContext) as TotalContextProps;
  const {l_processing_system553cb, setl_processing_system553cb}= useContext(TotalContext) as TotalContextProps;
  const {l_tran_categoryaa4a1, setl_tran_categoryaa4a1}= useContext(TotalContext) as TotalContextProps;
  const {process_system9b66e, setprocess_system9b66e}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647, settran_catey46647}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom02761, setdivider_bottom02761}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btn2563b, setview_msg_data_btn2563b}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn00416, setview_tran_log_btn00416}= useContext(TotalContext) as TotalContextProps;
  const {customwidget84bb0, setcustomwidget84bb0}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_bottom02761?.refresh])

  if (divider_bottom02761?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `83 / 87`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#000"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdivider_bottom
