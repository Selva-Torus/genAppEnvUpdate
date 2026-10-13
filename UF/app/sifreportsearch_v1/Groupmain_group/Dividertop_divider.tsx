'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividertop_divider = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {main_groupb2798, setmain_groupb2798}= useContext(TotalContext) as TotalContextProps;
  const {main_groupb2798Props, setmain_groupb2798Props}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerbb8b6, settop_dividerbb8b6}= useContext(TotalContext) as TotalContextProps;
  const {file_namefb5d0, setfile_namefb5d0}= useContext(TotalContext) as TotalContextProps;
  const {sf_file_name06efb, setsf_file_name06efb}= useContext(TotalContext) as TotalContextProps;
  const {estab_idbde42, setestab_idbde42}= useContext(TotalContext) as TotalContextProps;
  const {corp_name2b998, setcorp_name2b998}= useContext(TotalContext) as TotalContextProps;
  const {bottom_dividerdb520, setbottom_dividerdb520}= useContext(TotalContext) as TotalContextProps;
  const {searchb3ab8, setsearchb3ab8}= useContext(TotalContext) as TotalContextProps;
  const {clear56e07, setclear56e07}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[top_dividerbb8b6?.refresh])

  if (top_dividerbb8b6?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 4`, gap:``, height: `100%`}} >
<Divider
  className=""
  direction="horizontal"
  position="middle"
  color="#d9d9d9"
  thickness={2}
/>
  </div>
  )
}

export default Dividertop_divider
