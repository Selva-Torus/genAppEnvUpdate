

'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
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
import { nullFilter } from '@/app/utils/nullDataFilter';
import { getFilterProps } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

type ContentAlign = "left" | "center" | "right";

interface PieChartspieChartCompProps {
  encryptionFlagCompData: any;
  controlData:any;
  setIsProcessing:any;
}

export default function PieChartsrate_piechart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: PieChartspieChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps
  const [data,setData] = useState<any>([]);
  const {dfd_mongo_pie_chart_dfd_v1Props, setdfd_mongo_pie_chart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
 
  /////////////
   //another screen
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;  
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;  
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;  
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;  
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;  
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;  
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;  
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;  
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;  
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;  
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;  
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;  
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;  
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;  
  const {rate_piechartbb394, setrate_piechartbb394}= useContext(TotalContext) as TotalContextProps;  
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;  
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;  
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;  
  const {rate_piechartbb394Props, setrate_piechartbb394Props} = useContext(TotalContext) as TotalContextProps;
  //////////////



  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "91e5ee3dbbdf431bb11b4c1d64f6ad41",
      "6d48b6ce9bda41919d632c43a5bbb394"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
        codeStates['vob_api_info_group']  = vob_api_info_group5fc53,
        codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
        codeStates['group']  = group1f4ba,
        codeStates['setgroup'] = setgroup1f4ba,
        codeStates['api_info_group']  = api_info_group6ad41,
        codeStates['setapi_info_group'] = setapi_info_group6ad41,
        codeStates['total_calls_group']  = total_calls_group76982,
        codeStates['settotal_calls_group'] = settotal_calls_group76982,
        codeStates['success_rate_group']  = success_rate_groupb6598,
        codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
        codeStates['error_rate_group']  = error_rate_group773d1,
        codeStates['seterror_rate_group'] = seterror_rate_group773d1,
        codeStates['ob_group']  = ob_group76678,
        codeStates['setob_group'] = setob_group76678,
        codeStates['api_process_log_group']  = api_process_log_group192b0,
        codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
        codeStates['api_process_log_table']  = api_process_log_table5904e,
        codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
      codeExecution(code,codeStates)
      }
      if ("hasLogicCenter" in dfd_mongo_pie_chart_dfd_v1Props && !dfd_mongo_pie_chart_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_mongo_pie_chart_dfd_v1Props.dstKey,
            page: +orchestrationData?.data?.action?.pagination?.page,
            count: +orchestrationData?.data?.action?.pagination?.count,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setapi_info_group6ad41((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setapi_info_group6ad41((pre: any) => ({
          ...pre,
          name: rate_piechartbb394Props?.filteredData?.length > 0
            ? rate_piechartbb394Props?.filteredData[0]?.name
            : "0"
        }))
        setData(rate_piechartbb394Props?.filteredData);
      }else if(Array.isArray(dfd_mongo_pie_chart_dfd_v1Props) && dfd_mongo_pie_chart_dfd_v1Props && !api_info_group6ad41.name){
          setData(dfd_mongo_pie_chart_dfd_v1Props);
          setapi_info_group6ad41((pre:any)=>({...pre,name:dfd_mongo_pie_chart_dfd_v1Props[0]?.name}));
        }
      }
      if(Array.isArray(dfd_mongo_pie_chart_dfd_v1Props)){
        return
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick=async(value?:any)=>{
    try{
    setIsProcessing(true);
    if(value){
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }


  const handlePieClick = async (pieData: any, index: number, event: React.MouseEvent) => {
    const clickedName = pieData?.name;
    await handleClick(clickedName);
  }; 

  useEffect(() => {
    handleMapperDetails();
  },[rate_piechartbb394?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_mongo_pie_chart_dfd_v1Props) && dfd_mongo_pie_chart_dfd_v1Props?.length > 0){
      setData(dfd_mongo_pie_chart_dfd_v1Props)
      setapi_info_group6ad41((pre:any)=>({...pre,name:dfd_mongo_pie_chart_dfd_v1Props[0]?.name}))
    }
  },[dfd_mongo_pie_chart_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!rate_piechartbb394Props?.filterProps) return;
    handleMapperDetails(rate_piechartbb394Props?.filterProps,rate_piechartbb394Props?.filterFlag);
  },[rate_piechartbb394Props?.filterProps])

  if (rate_piechartbb394?.isHidden) {
    return <></>
  }
   return (
    <div
      className="w-full h-full"
      style={{gridColumn: `15 / 25`,gridRow: `31 / 113`, gap:``, height: `100%`}}
    >
      <PieChart
        data={data}
        title  = {`${keyset("API Reliability Overview")}`}
        fillContainer={true}
        colors = {["#FC9D3F","#ec6f6f"]}
        className = "bg-white"
        numberKey= {'count'}
        contentAlign="left"
        onClick={handlePieClick}
      />      
    </div>
  )
}
