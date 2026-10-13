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
  const {file_upload_groupfa783, setfile_upload_groupfa783}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_groupfa783Props, setfile_upload_groupfa783Props}= useContext(TotalContext) as TotalContextProps;
  const {icon12b96, seticon12b96}= useContext(TotalContext) as TotalContextProps;
  const {success_textd0c07, setsuccess_textd0c07}= useContext(TotalContext) as TotalContextProps;
  const {file_upload_success9ee39, setfile_upload_success9ee39}= useContext(TotalContext) as TotalContextProps;
  const {dividerdb2f5, setdividerdb2f5}= useContext(TotalContext) as TotalContextProps;
  const {okk_btn97301, setokk_btn97301}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[dividerdb2f5?.refresh])

  if (dividerdb2f5?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 25`,gridRow: `50 / 53`, gap:``, height: `100%`}} >
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
