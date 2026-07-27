'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_top = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete3ee3b, setgroup_delete3ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3bProps, setgroup_delete3ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topc704d, setdivider_topc704d}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textdfa35, setdelete_heading_textdfa35}= useContext(TotalContext) as TotalContextProps;
  const {reviewnumb10f3, setreviewnumb10f3}= useContext(TotalContext) as TotalContextProps;
  const {review_number5cbc0, setreview_number5cbc0}= useContext(TotalContext) as TotalContextProps;
  const {employee_name564a0, setemployee_name564a0}= useContext(TotalContext) as TotalContextProps;
  const {full_name68092, setfull_name68092}= useContext(TotalContext) as TotalContextProps;
  const {cyclename50ebb, setcyclename50ebb}= useContext(TotalContext) as TotalContextProps;
  const {cycle_namecf2b5, setcycle_namecf2b5}= useContext(TotalContext) as TotalContextProps;
  const {statusbb202, setstatusbb202}= useContext(TotalContext) as TotalContextProps;
  const {review_status9db4f, setreview_status9db4f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textd6ad8, setconfo_textd6ad8}= useContext(TotalContext) as TotalContextProps;
  const {divider652b0, setdivider652b0}= useContext(TotalContext) as TotalContextProps;
  const {review_id5d984, setreview_id5d984}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button5aa68, setcancel_button5aa68}= useContext(TotalContext) as TotalContextProps;
  const {ok_button9b4bd, setok_button9b4bd}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_topc704d?.refresh])

  if (divider_topc704d?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 4`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#d4d4d4"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdivider_top
