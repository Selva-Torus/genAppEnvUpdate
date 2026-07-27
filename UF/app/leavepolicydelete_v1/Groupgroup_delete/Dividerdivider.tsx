'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete40e71, setgroup_delete40e71}= useContext(TotalContext) as TotalContextProps;
  const {group_delete40e71Props, setgroup_delete40e71Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb8510, setdivider_topb8510}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text43413, setdelete_heading_text43413}= useContext(TotalContext) as TotalContextProps;
  const {policy_code_textc4602, setpolicy_code_textc4602}= useContext(TotalContext) as TotalContextProps;
  const {policy_codeea843, setpolicy_codeea843}= useContext(TotalContext) as TotalContextProps;
  const {policy_nmf1837, setpolicy_nmf1837}= useContext(TotalContext) as TotalContextProps;
  const {policy_name3b3f3, setpolicy_name3b3f3}= useContext(TotalContext) as TotalContextProps;
  const {leave_typ6b883, setleave_typ6b883}= useContext(TotalContext) as TotalContextProps;
  const {leave_type0879a, setleave_type0879a}= useContext(TotalContext) as TotalContextProps;
  const {confo_text43c73, setconfo_text43c73}= useContext(TotalContext) as TotalContextProps;
  const {divider8d9a8, setdivider8d9a8}= useContext(TotalContext) as TotalContextProps;
  const {policy_id80b01, setpolicy_id80b01}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc1acc, setcancel_buttonc1acc}= useContext(TotalContext) as TotalContextProps;
  const {ok_button4bf3f, setok_button4bf3f}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider8d9a8?.refresh])

  if (divider8d9a8?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `35 / 38`, gap:``, height: `100%`}} >
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

export default Dividerdivider
