'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
const Iconrej_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps
  const {dividerd3a93, setdividerd3a93}= useContext(TotalContext) as TotalContextProps
  const {rej_icon0c7ca, setrej_icon0c7ca}= useContext(TotalContext) as TotalContextProps
  const {reject_text7fb06, setreject_text7fb06}= useContext(TotalContext) as TotalContextProps
  const {rejected_requestsf6330, setrejected_requestsf6330}= useContext(TotalContext) as TotalContextProps
  const {board_des_text1e55c, setboard_des_text1e55c}= useContext(TotalContext) as TotalContextProps
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
      "b1ac60952791ef3e0ea3f2a0cd94ab1e",
      "a31ca90ae84f45b4bd33d42ce420c7ca"
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

  if (rej_icon0c7ca?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `22 / 25`,gridRow: `3 / 12`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-red-600 !rounded-xl"
      data="MdFreeCancellation"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconrej_icon
