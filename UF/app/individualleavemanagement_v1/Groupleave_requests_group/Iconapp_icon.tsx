'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconapp_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps
  const {dividerdb068, setdividerdb068}= useContext(TotalContext) as TotalContextProps
  const {app_iconeccb1, setapp_iconeccb1}= useContext(TotalContext) as TotalContextProps
  const {approved_text01cff, setapproved_text01cff}= useContext(TotalContext) as TotalContextProps
  const {approved_this_month268e6, setapproved_this_month268e6}= useContext(TotalContext) as TotalContextProps
  const {day_text5965c, setday_text5965c}= useContext(TotalContext) as TotalContextProps
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "e11d9677efd34bc2733dbda4d2fb9aaf",
      "dcbd85fa09c241f3849b46a2421eccb1"
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

  if (app_iconeccb1?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `21 / 24`,gridRow: `3 / 12`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-green-600 !rounded-xl"
      data="MdFactCheck"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconapp_icon
