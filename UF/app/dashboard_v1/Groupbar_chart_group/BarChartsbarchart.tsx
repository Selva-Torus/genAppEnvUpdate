

'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext';
import { Tooltip } from '@/components/Tooltip';
import {BarChart} from '@/components/BarChart';
import { Text } from "@/components/Text";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Card } from '@/components/Card';
import i18n from '@/app/components/i18n';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { getFilterProps } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

type ContentAlign = "left" | "center" | "right";

interface BarChartsbarChartCompProps {
  encryptionFlagCompData: any;
  setIsProcessing: any;
  controlData: any;
}

export default function BarChartsbarchart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: BarChartsbarChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any[]>([]);
  const {dfd_channelchartdashboard_v1Props, setdfd_channelchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const toast : Function = useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  /////////////
   //another screen
  const {gdb_group5384d, setgdb_group5384d}= useContext(TotalContext) as TotalContextProps;  
  const {gdb_group5384dProps, setgdb_group5384dProps}= useContext(TotalContext) as TotalContextProps;  
  const {tab_group65b41, settab_group65b41}= useContext(TotalContext) as TotalContextProps;  
  const {tab_group65b41Props, settab_group65b41Props}= useContext(TotalContext) as TotalContextProps;  
  const {tab_header04820, settab_header04820}= useContext(TotalContext) as TotalContextProps;  
  const {tab_header04820Props, settab_header04820Props}= useContext(TotalContext) as TotalContextProps;  
  const {tab_grpe63f4, settab_grpe63f4}= useContext(TotalContext) as TotalContextProps;  
  const {tab_grpe63f4Props, settab_grpe63f4Props}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_group6c6f2, settransaction_group6c6f2}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_group6c6f2Props, settransaction_group6c6f2Props}= useContext(TotalContext) as TotalContextProps;  
  const {total_value_group9d783, settotal_value_group9d783}= useContext(TotalContext) as TotalContextProps;  
  const {total_value_group9d783Props, settotal_value_group9d783Props}= useContext(TotalContext) as TotalContextProps;  
  const {online_offline_processing_group7ad24, setonline_offline_processing_group7ad24}= useContext(TotalContext) as TotalContextProps;  
  const {online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props}= useContext(TotalContext) as TotalContextProps;  
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;  
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_volume_by_channel2b08e, settransaction_volume_by_channel2b08e}= useContext(TotalContext) as TotalContextProps;  
  const {barchart84262, setbarchart84262}= useContext(TotalContext) as TotalContextProps;  
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;  
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;  
  const {barchart84262Props, setbarchart84262Props} = useContext(TotalContext) as TotalContextProps;
  //////////////




  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "f986da5046b749b3ae592e940b7737a3",
      "7f8d444cae9d48e78e47188502b84262"
    );
    let code:string= orchestrationData?.data?.code;
      if (code != '') {
        let codeStates: Record<string, any> = {}
          codeStates['gdb_group']  = gdb_group5384d,
          codeStates['setgdb_group'] = setgdb_group5384d,
          codeStates['tab_grp']  = tab_grpe63f4,
          codeStates['settab_grp'] = settab_grpe63f4,
          codeStates['transaction_group']  = transaction_group6c6f2,
          codeStates['settransaction_group'] = settransaction_group6c6f2,
          codeStates['total_value_group']  = total_value_group9d783,
          codeStates['settotal_value_group'] = settotal_value_group9d783,
          codeStates['online_offline_processing_group']  = online_offline_processing_group7ad24,
          codeStates['setonline_offline_processing_group'] = setonline_offline_processing_group7ad24,
          codeStates['bar_chart_group']  = bar_chart_group737a3,
          codeStates['setbar_chart_group'] = setbar_chart_group737a3,
          codeStates['pie_chart_group']  = pie_chart_group15067,
          codeStates['setpie_chart_group'] = setpie_chart_group15067,
          codeStates['transaction_table']  = transaction_tablef4f34,
          codeStates['settransaction_table'] = settransaction_tablef4f34,
        codeExecution(code,codeStates);
      }
      if ("hasLogicCenter" in dfd_channelchartdashboard_v1Props && !dfd_channelchartdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_channelchartdashboard_v1Props.dstKey,
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
        setbar_chart_group737a3((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setbar_chart_group737a3((pre: any) => ({
          ...pre,
          name: barchart84262Props?.filteredData?.length > 0
            ? barchart84262Props?.filteredData[0]?.name
            : "0"
        }))
        setData(barchart84262Props?.filteredData);
      }else if(Array.isArray(dfd_channelchartdashboard_v1Props) && dfd_channelchartdashboard_v1Props && !bar_chart_group737a3.name){
          setData(dfd_channelchartdashboard_v1Props);
          setbar_chart_group737a3((pre:any)=>({...pre,name:dfd_channelchartdashboard_v1Props[0]?.name}));
        }
      }
      if(Array.isArray(dfd_channelchartdashboard_v1Props)){
        return
      }
    }catch(err){
      console.log(err);
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


  const handleBarClick = async (barData: any, index: number, event: React.MouseEvent) => {
    const clickedName = barData?.payload?.name;
    await handleClick(clickedName);
  };

  useEffect(() => {
    handleMapperDetails();
   },[barchart84262?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_channelchartdashboard_v1Props) && dfd_channelchartdashboard_v1Props?.length > 0){
      setData(dfd_channelchartdashboard_v1Props);
      setbar_chart_group737a3((pre:any)=>({...pre,name:dfd_channelchartdashboard_v1Props[0]?.name}));
    }
  },[dfd_channelchartdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!barchart84262Props?.filterProps) return;
    handleMapperDetails(barchart84262Props?.filterProps,barchart84262Props?.filterFlag);
  },[barchart84262Props?.filterProps])

 
  if (barchart84262?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `9 / 54`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        showCurrencySign = "₹"
        title  = {`${keyset("title")}`}
        className = ""
        fillContainer={true}
        colors = {["#d6af43"]}
        contentAlign="left"
        onClick={handleBarClick}
      />
    </div>
  );
}
