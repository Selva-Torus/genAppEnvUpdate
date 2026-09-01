'use client'


import React, { useContext,useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
const Icontotal_value_icon = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps
  const {total_value_icon16d5d, settotal_value_icon16d5d}= useContext(TotalContext) as TotalContextProps
  const {total_value_labeld1dce, settotal_value_labeld1dce}= useContext(TotalContext) as TotalContextProps
  const {total_amount94c0b, settotal_amount94c0b}= useContext(TotalContext) as TotalContextProps
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    //get orchestration data for icon
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "cd2bedd58a5546819956f0cb77f9d783",
      "9612984d311e4ba1b776c1383da16d5d"
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

  if (total_value_icon16d5d?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 6`,gridRow: `1 / 11`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className=""
      data="MdMonetizationOn"
      contentAlign={"left"}
    />
  </div>
  )
}

export default Icontotal_value_icon
