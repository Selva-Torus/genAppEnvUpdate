

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
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import filterData from '@/context/filterdata.json';

type ContentAlign = "left" | "center" | "right";

interface PieChartspieChartCompProps {
  lockedData:any;
  setLockedData:any;
  encryptionFlagCompData: any;
  controlData:any;
  setIsProcessing:any;
}

export default function PieChartspiechart({ 
  lockedData,
  setLockedData,
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: PieChartspieChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any>([]);
  const {dfd_chart_data_v1Props, setdfd_chart_data_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  const skipNextFilterPropsRef = useRef(false);
  const refreshInitRef = useRef(false);
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
 
  /////////////
   //another screen
  const {report_grp0286e, setreport_grp0286e}= useContext(TotalContext) as TotalContextProps;  
  const {report_grp0286eProps, setreport_grp0286eProps}= useContext(TotalContext) as TotalContextProps;  
  const {bar_chart477a2, setbar_chart477a2}= useContext(TotalContext) as TotalContextProps;  
  const {piechart7818e, setpiechart7818e}= useContext(TotalContext) as TotalContextProps;  
  const {piechart7818eProps, setpiechart7818eProps} = useContext(TotalContext) as TotalContextProps;
  //////////////



  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "f9fcdb0875fc40019af0ac40c9c0286e",
      "31589633aab648bf955757601a67818e"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
        codeStates['report_grp']  = report_grp0286e,
        codeStates['setreport_grp'] = setreport_grp0286e,
      codeExecution(code,codeStates)
      }
      if ("hasLogicCenter" in dfd_chart_data_v1Props && !dfd_chart_data_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_chart_data_v1Props.dstKey,
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
        setreport_grp0286e((pre: any) => ({
          ...pre,
          amount: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.amount
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setreport_grp0286e((pre: any) => ({
          ...pre,
          amount: piechart7818eProps?.filteredData?.length > 0
            ? piechart7818eProps?.filteredData[0]?.amount
            : "0"
        }))
        setData(piechart7818eProps?.filteredData);
      }else if(Array.isArray(dfd_chart_data_v1Props) && dfd_chart_data_v1Props && !report_grp0286e.amount){
          setData(dfd_chart_data_v1Props);
          setreport_grp0286e((pre:any)=>({...pre,amount:dfd_chart_data_v1Props[0]?.amount}));
        }
      }
      if(Array.isArray(dfd_chart_data_v1Props)){
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
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    handleMapperDetails();
  },[piechart7818e?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_chart_data_v1Props) && dfd_chart_data_v1Props?.length > 0){
      setData(dfd_chart_data_v1Props)
      setreport_grp0286e((pre:any)=>({...pre,amount:dfd_chart_data_v1Props[0]?.amount}))
    }
  },[dfd_chart_data_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (piechart7818eProps?.filterInitalLoad) return;

    const filterControllers = piechart7818eProps?.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['piechart7818e']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['piechart7818e']).filter((k: string) => jsonEntry['piechart7818e'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      handleMapperDetails(piechart7818eProps?.filterProps,piechart7818eProps?.filterFlag);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;

    skipNextFilterPropsRef.current = true;
    setpiechart7818eProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    handleMapperDetails(piechart7818eProps?.filterProps,piechart7818eProps?.filterFlag);
  },[piechart7818eProps?.filterControllers])

  // subsequent filterProps changes, once the gated initial load has completed
  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!piechart7818eProps?.filterInitalLoad) return;
    if (!piechart7818eProps?.filterProps) return;
    handleMapperDetails(piechart7818eProps?.filterProps,piechart7818eProps?.filterFlag);
  },[piechart7818eProps?.filterProps])

  if (piechart7818e?.isHidden) {
    return <></>
  }
   return (
    <div
      className="w-full h-full"
      style={{gridColumn: `14 / 25`,gridRow: `1 / 130`, gap:``, height: `100%`}}
    >
      <PieChart
        data={data}
        showCurrencySign = "₹"
        title  = {`${keyset("Pie Chart")}`}
        fillContainer={true}
        colors = {["#5082f7","#e8c069","#ed9292"]}
        className = ""
        contentAlign="left"
        onClick={handlePieClick}
      />      
    </div>
  )
}
