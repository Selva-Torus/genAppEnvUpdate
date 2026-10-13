'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
const Iconicon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {file_upload_groupfa783, setfile_upload_groupfa783}= useContext(TotalContext) as TotalContextProps
  const {file_upload_groupfa783Props, setfile_upload_groupfa783Props}= useContext(TotalContext) as TotalContextProps
  const {icon12b96, seticon12b96}= useContext(TotalContext) as TotalContextProps
  const {success_textd0c07, setsuccess_textd0c07}= useContext(TotalContext) as TotalContextProps
  const {file_upload_success9ee39, setfile_upload_success9ee39}= useContext(TotalContext) as TotalContextProps
  const {dividerdb2f5, setdividerdb2f5}= useContext(TotalContext) as TotalContextProps
  const {okk_btn97301, setokk_btn97301}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "bd9f507e7fca9e4a7b503974c2efa783",
      "df937819a9ed9f3d86aaea60d3312b96"
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

  if (icon12b96?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `12 / 14`,gridRow: `4 / 21`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className="!text-[#2f53d5]"
      data="MdDownloadDone"
      contentAlign={"center"}
    />
  </div>
  )
}

export default Iconicon
