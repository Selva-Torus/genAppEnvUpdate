'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerdivider_s = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group_delete39e95, setgroup_delete39e95}= useContext(TotalContext) as TotalContextProps;
  const {group_delete39e95Props, setgroup_delete39e95Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_s2f4d7, setdivider_s2f4d7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text9fa17, setdelete_heading_text9fa17}= useContext(TotalContext) as TotalContextProps;
  const {request_number_textfe1e3, setrequest_number_textfe1e3}= useContext(TotalContext) as TotalContextProps;
  const {request_numbera8283, setrequest_numbera8283}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text42c95, setfull_name_text42c95}= useContext(TotalContext) as TotalContextProps;
  const {full_name3103b, setfull_name3103b}= useContext(TotalContext) as TotalContextProps;
  const {system_name_text214d0, setsystem_name_text214d0}= useContext(TotalContext) as TotalContextProps;
  const {system_named477d, setsystem_named477d}= useContext(TotalContext) as TotalContextProps;
  const {access_role_text651e8, setaccess_role_text651e8}= useContext(TotalContext) as TotalContextProps;
  const {access_rolef3310, setaccess_rolef3310}= useContext(TotalContext) as TotalContextProps;
  const {confo_text6b398, setconfo_text6b398}= useContext(TotalContext) as TotalContextProps;
  const {divider2d5c2, setdivider2d5c2}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2b2a7, setaccess_req_id2b2a7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button00993, setcancel_button00993}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3840c, setok_button3840c}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider_s2f4d7?.refresh])

  if (divider_s2f4d7?.isHidden) {
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

export default Dividerdivider_s
