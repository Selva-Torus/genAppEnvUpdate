'use client'


import React, { useContext,useEffect } from 'react';
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import i18n from '@/app/components/i18n';

const Texttiming_status = ({encryptionFlagCompData,isDynamic,item,index,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {inegration_run_groupaf8be, setinegration_run_groupaf8be}= useContext(TotalContext) as TotalContextProps;
  const {inegration_run_groupaf8beProps, setinegration_run_groupaf8beProps}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48, setrun_information_group6fd48}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group6fd48Props, setrun_information_group6fd48Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220c, settimeandstatus_groupb220c}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_groupb220cProps, settimeandstatus_groupb220cProps}= useContext(TotalContext) as TotalContextProps;
  const {timing_status8fa27, settiming_status8fa27}= useContext(TotalContext) as TotalContextProps;
  const {started_onf60a2, setstarted_onf60a2}= useContext(TotalContext) as TotalContextProps;
  const {ended_on2e42e, setended_on2e42e}= useContext(TotalContext) as TotalContextProps;
  const {run_status_codefeadd, setrun_status_codefeadd}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184, setrecord_groupdb184}= useContext(TotalContext) as TotalContextProps;
  const {record_groupdb184Props, setrecord_groupdb184Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbc, seterror_group9bfbc}= useContext(TotalContext) as TotalContextProps;
  const {error_group9bfbcProps, seterror_group9bfbcProps}= useContext(TotalContext) as TotalContextProps;
  const {timing_status8fa27Props, settiming_status8fa27Props} = useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async(filterProps?:any,filterFlag?:boolean)=>{
  }

  useEffect(()=>{
    handleMapperValue()
  },[timing_status8fa27?.refresh])

  if (timing_status8fa27?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `1 / 17`,gridRow: `4 / 10`, gap:``, height: `100%`}} >
<Text
  contentAlign={"left"}
  className="!font-bold"
  variant="subheader-2"
  color="primary"
>
      {keyset("Timing And Status")}
</Text>
  </div>
  )
}

export default Texttiming_status
