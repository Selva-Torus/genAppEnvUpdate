'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
const Iconicon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {header_groupd8ba9, setheader_groupd8ba9}= useContext(TotalContext) as TotalContextProps
  const {header_groupd8ba9Props, setheader_groupd8ba9Props}= useContext(TotalContext) as TotalContextProps
  const {asset_dashboard_group1aa03, setasset_dashboard_group1aa03}= useContext(TotalContext) as TotalContextProps
  const {asset_dashboard_group1aa03Props, setasset_dashboard_group1aa03Props}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_group3c082, setamr_queue_group3c082}= useContext(TotalContext) as TotalContextProps
  const {amr_queue_group3c082Props, setamr_queue_group3c082Props}= useContext(TotalContext) as TotalContextProps
  const {pending_file_group2128c, setpending_file_group2128c}= useContext(TotalContext) as TotalContextProps
  const {pending_file_group2128cProps, setpending_file_group2128cProps}= useContext(TotalContext) as TotalContextProps
  const {service_pending_group8c0ca, setservice_pending_group8c0ca}= useContext(TotalContext) as TotalContextProps
  const {service_pending_group8c0caProps, setservice_pending_group8c0caProps}= useContext(TotalContext) as TotalContextProps
  const {slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0}= useContext(TotalContext) as TotalContextProps
  const {slas_at_risk_group1f8c0Props, setslas_at_risk_group1f8c0Props}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_groupdf57a, setcourt_rejection_groupdf57a}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_groupdf57aProps, setcourt_rejection_groupdf57aProps}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_textc9a86, setcourt_rejection_textc9a86}= useContext(TotalContext) as TotalContextProps
  const {icon87359, seticon87359}= useContext(TotalContext) as TotalContextProps
  const {court_rejectionff779, setcourt_rejectionff779}= useContext(TotalContext) as TotalContextProps
  const {court_rejection_desc6f72f, setcourt_rejection_desc6f72f}= useContext(TotalContext) as TotalContextProps
  const {collected_mtd_group0f074, setcollected_mtd_group0f074}= useContext(TotalContext) as TotalContextProps
  const {collected_mtd_group0f074Props, setcollected_mtd_group0f074Props}= useContext(TotalContext) as TotalContextProps
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711}= useContext(TotalContext) as TotalContextProps
  const {overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props}= useContext(TotalContext) as TotalContextProps
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf}= useContext(TotalContext) as TotalContextProps
  const {key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps}= useContext(TotalContext) as TotalContextProps
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "22d56a77560b7876e1bd59db9c6df57a",
      "3502572deaa10bb023db18f76e087359"
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

  if (icon87359?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `20 / 23`,gridRow: `3 / 11`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-red-600 !rounded-xl"
      data="MdOutlineCancelScheduleSend"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconicon
