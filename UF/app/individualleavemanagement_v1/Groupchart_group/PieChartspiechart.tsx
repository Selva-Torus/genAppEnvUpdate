
'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { Tooltip } from '@/components/Tooltip'
import {PieChart} from '@/components/PieChart';
import { Text } from "@/components/Text";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Card } from '@/components/Card';
import i18n from '@/app/components/i18n';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

type ContentAlign = "left" | "center" | "right";

interface PieChartspieChartCompProps {
  encryptionFlagCompData: any;
  controlData:any;
  setIsProcessing:any;
}

export default function PieChartspiechart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: PieChartspieChartCompProps) {
  const token: string = getCookie('token');
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps
  const [data,setData] = useState<any>([]);
  const {dfd_leavepiechart_v1Props, setdfd_leavepiechart_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
 
  /////////////
   //another screen
  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;  
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;  
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;  
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;  
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;  
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;  
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;  
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;  
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;  
  const {chart_textfde29, setchart_textfde29}= useContext(TotalContext) as TotalContextProps;  
  const {piechart31095, setpiechart31095}= useContext(TotalContext) as TotalContextProps;  
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;  
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;  
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;  
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////
  
  const handleMapperDetails=async()=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "9c92deb8c0df4c54b1f9e6a4ba7dd9ff",
      "283418ab6685409faddc19e811131095"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
        codeStates['hrm_dashboard_group']  = hrm_dashboard_groupc9b72,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
        codeStates['total_employees_group']  = total_employees_group69415,
        codeStates['settotal_employees_group'] = settotal_employees_group69415,
        codeStates['leave_requests_group']  = leave_requests_groupb9aaf,
        codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
        codeStates['onboarding_group']  = onboarding_group4ab1e,
        codeStates['setonboarding_group'] = setonboarding_group4ab1e,
        codeStates['chart_group']  = chart_groupdd9ff,
        codeStates['setchart_group'] = setchart_groupdd9ff,
        codeStates['leave_group']  = leave_group1d83d,
        codeStates['setleave_group'] = setleave_group1d83d,
        codeStates['leave_req_table']  = leave_req_table1dfa0,
        codeStates['setleave_req_table'] = setleave_req_table1dfa0,
      codeExecution(code,codeStates)
      }
      if(Array.isArray(dfd_leavepiechart_v1Props) && dfd_leavepiechart_v1Props?.length > 0){
        setData(dfd_leavepiechart_v1Props)
        setchart_groupdd9ff((pre:any)=>({...pre,name:dfd_leavepiechart_v1Props[0]?.name}))
      }
      if(Array.isArray(dfd_leavepiechart_v1Props)){
        return
      }
    }catch(err){
      console.log(err)
    }
  }
  

useEffect(() => {
  if (prevRefreshRef.current) {
    handleMapperDetails()
  }else 
  prevRefreshRef.current= true
},[piechart31095?.refresh])

useEffect(() => {
  if(Array.isArray(dfd_leavepiechart_v1Props) && dfd_leavepiechart_v1Props?.length > 0){
    setData(dfd_leavepiechart_v1Props)
    setchart_groupdd9ff((pre:any)=>({...pre,name:dfd_leavepiechart_v1Props[0]?.name}))
  }
},[dfd_leavepiechart_v1Props])

  if (piechart31095?.isHidden) {
    return <></>
  }
   return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `9 / 89`, gap:``, height: `100%`}}
    >
      <PieChart
        data={data}
        fillContainer={true}
        colors = {["#ee8e3f","#65b842","#4d8adb"]}
        className = ""
        contentAlign="left"
      />      
    </div>
  )
}
