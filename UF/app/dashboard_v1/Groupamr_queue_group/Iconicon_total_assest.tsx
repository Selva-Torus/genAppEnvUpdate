'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconicon_total_assest = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {header_groupb1913, setheader_groupb1913}= useContext(TotalContext) as TotalContextProps
  const {header_groupb1913Props, setheader_groupb1913Props}= useContext(TotalContext) as TotalContextProps
  const {asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe}= useContext(TotalContext) as TotalContextProps
  const {asset_dashboard_group4bbfeProps, setasset_dashboard_group4bbfeProps}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_groupc92ca, setamr_queue_groupc92ca}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_groupc92caProps, setamr_queue_groupc92caProps}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_text28561, setamr_queue_text28561}= useContext(TotalContext) as TotalContextProps
  const {icon_total_assest208f5, seticon_total_assest208f5}= useContext(TotalContext) as TotalContextProps
  const {amr_queue5b620, setamr_queue5b620}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_descafe0e, setamr_queue_descafe0e}= useContext(TotalContext) as TotalContextProps
  const {pending_file_groupffe32, setpending_file_groupffe32}= useContext(TotalContext) as TotalContextProps
  const {pending_file_groupffe32Props, setpending_file_groupffe32Props}= useContext(TotalContext) as TotalContextProps
  const {service_pending_group7ba93, setservice_pending_group7ba93}= useContext(TotalContext) as TotalContextProps
  const {service_pending_group7ba93Props, setservice_pending_group7ba93Props}= useContext(TotalContext) as TotalContextProps
  const {slas_at_risk_group23eb4, setslas_at_risk_group23eb4}= useContext(TotalContext) as TotalContextProps
  const {slas_at_risk_group23eb4Props, setslas_at_risk_group23eb4Props}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_groupc9d54, setcourt_rejection_groupc9d54}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_groupc9d54Props, setcourt_rejection_groupc9d54Props}= useContext(TotalContext) as TotalContextProps
  const {collected_mtd_group7b7b5, setcollected_mtd_group7b7b5}= useContext(TotalContext) as TotalContextProps
  const {collected_mtd_group7b7b5Props, setcollected_mtd_group7b7b5Props}= useContext(TotalContext) as TotalContextProps
  const {table_group112bd, settable_group112bd}= useContext(TotalContext) as TotalContextProps
  const {table_group112bdProps, settable_group112bdProps}= useContext(TotalContext) as TotalContextProps
  const {subscreene9ab5, setsubscreene9ab5}= useContext(TotalContext) as TotalContextProps
  const {subscreene9ab5Props, setsubscreene9ab5Props}= useContext(TotalContext) as TotalContextProps
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797}= useContext(TotalContext) as TotalContextProps
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props}= useContext(TotalContext) as TotalContextProps
  const {group28176, setgroup28176}= useContext(TotalContext) as TotalContextProps
  const {group28176Props, setgroup28176Props}= useContext(TotalContext) as TotalContextProps
  const {table852e3, settable852e3}= useContext(TotalContext) as TotalContextProps
  const {table852e3Props, settable852e3Props}= useContext(TotalContext) as TotalContextProps
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da}= useContext(TotalContext) as TotalContextProps
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps}= useContext(TotalContext) as TotalContextProps
  const {pending_fillings_groupb1568, setpending_fillings_groupb1568}= useContext(TotalContext) as TotalContextProps
  const {pending_fillings_groupb1568Props, setpending_fillings_groupb1568Props}= useContext(TotalContext) as TotalContextProps
  const {pending_fillings_table11279, setpending_fillings_table11279}= useContext(TotalContext) as TotalContextProps
  const {pending_fillings_table11279Props, setpending_fillings_table11279Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "31d0c407d67675a58107f5dad6dc92ca",
      "49d407d603c880a2e5cd1d4cf8d208f5"
    );
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    handleCode()
  }, [])

  if (icon_total_assest208f5?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `21 / 24`,gridRow: `3 / 11`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-blue-800 !rounded-xl"
      data="MdBalance"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconicon_total_assest
