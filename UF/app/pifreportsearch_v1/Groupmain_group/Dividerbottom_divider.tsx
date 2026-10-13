'use client'



import React, { useContext,useEffect } from 'react' 
import { Divider } from '@/components/Divider';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Dividerbottom_divider = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing,controlData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {main_group0c058, setmain_group0c058}= useContext(TotalContext) as TotalContextProps;
  const {main_group0c058Props, setmain_group0c058Props}= useContext(TotalContext) as TotalContextProps;
  const {top_divider34637, settop_divider34637}= useContext(TotalContext) as TotalContextProps;
  const {corp_name3791a, setcorp_name3791a}= useContext(TotalContext) as TotalContextProps;
  const {pf_file_name2c4bc, setpf_file_name2c4bc}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divider87331, setbottom_divider87331}= useContext(TotalContext) as TotalContextProps;
  const {search2ca66, setsearch2ca66}= useContext(TotalContext) as TotalContextProps;
  const {clear3234f, setclear3234f}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[bottom_divider87331?.refresh])

  if (bottom_divider87331?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `21 / 24`, gap:``, height: `100%`}} >
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

export default Dividerbottom_divider
