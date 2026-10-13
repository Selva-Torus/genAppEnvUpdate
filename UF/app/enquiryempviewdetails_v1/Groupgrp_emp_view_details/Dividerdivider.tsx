'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
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
  const {grp_emp_view_details7cca5, setgrp_emp_view_details7cca5}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_view_details7cca5Props, setgrp_emp_view_details7cca5Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_view_detailsde0ef, sethdr_view_detailsde0ef}= useContext(TotalContext) as TotalContextProps;
  const {divider85e5a, setdivider85e5a}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3, setgrp_emp_details5bbf3}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3Props, setgrp_emp_details5bbf3Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[divider85e5a?.refresh])

  if (divider85e5a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `12 / 14`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#f5f6f7"
  thickness={2}
/>
  </div>
  )
}

export default Dividerdivider
