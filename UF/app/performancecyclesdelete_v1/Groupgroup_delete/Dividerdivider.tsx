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
  const {group_deletebe86e, setgroup_deletebe86e}= useContext(TotalContext) as TotalContextProps;
  const {group_deletebe86eProps, setgroup_deletebe86eProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textfe4b7, setdelete_heading_textfe4b7}= useContext(TotalContext) as TotalContextProps;
  const {divider_s18ff5, setdivider_s18ff5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code_textea00f, setcycle_code_textea00f}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code5f073, setcycle_code5f073}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name_text7ecc5, setcycle_name_text7ecc5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name6a018, setcycle_name6a018}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type_text57344, setcycle_type_text57344}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type89f52, setcycle_type89f52}= useContext(TotalContext) as TotalContextProps;
  const {confo_text4c8be, setconfo_text4c8be}= useContext(TotalContext) as TotalContextProps;
  const {divider477db, setdivider477db}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonb2f7a, setcancel_buttonb2f7a}= useContext(TotalContext) as TotalContextProps;
  const {ok_button24d12, setok_button24d12}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id8c16d, setcycle_id8c16d}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider477db?.refresh])

  if (divider477db?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `34 / 37`, gap:``, height: `100%`}} >
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
