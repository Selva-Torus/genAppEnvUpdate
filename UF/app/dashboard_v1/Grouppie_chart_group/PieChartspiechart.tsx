

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

export default function PieChartspiechart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: PieChartspieChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps
  const [data,setData] = useState<any>([]);
  const {dfd_productchartdashboard_v1Props, setdfd_productchartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;  
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;  
  const {product_organation_label2e07d, setproduct_organation_label2e07d}= useContext(TotalContext) as TotalContextProps;  
  const {piechart9dde7, setpiechart9dde7}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;  
  const {piechart9dde7Props, setpiechart9dde7Props} = useContext(TotalContext) as TotalContextProps;
  //////////////



  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "7169a37581d049d395f6f3949db15067",
      "ae87fc1c45764459839c480c6e49dde7"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
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
      codeExecution(code,codeStates)
      }
      if ("hasLogicCenter" in dfd_productchartdashboard_v1Props && !dfd_productchartdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_productchartdashboard_v1Props.dstKey,
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
        setpie_chart_group15067((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setpie_chart_group15067((pre: any) => ({
          ...pre,
          name: piechart9dde7Props?.filteredData?.length > 0
            ? piechart9dde7Props?.filteredData[0]?.name
            : "0"
        }))
        setData(piechart9dde7Props?.filteredData);
      }else if(Array.isArray(dfd_productchartdashboard_v1Props) && dfd_productchartdashboard_v1Props && !pie_chart_group15067.name){
          setData(dfd_productchartdashboard_v1Props);
          setpie_chart_group15067((pre:any)=>({...pre,name:dfd_productchartdashboard_v1Props[0]?.name}));
        }
      }
      if(Array.isArray(dfd_productchartdashboard_v1Props)){
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
  },[piechart9dde7?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_productchartdashboard_v1Props) && dfd_productchartdashboard_v1Props?.length > 0){
      setData(dfd_productchartdashboard_v1Props)
      setpie_chart_group15067((pre:any)=>({...pre,name:dfd_productchartdashboard_v1Props[0]?.name}))
    }
  },[dfd_productchartdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!piechart9dde7Props?.filterProps) return;
    handleMapperDetails(piechart9dde7Props?.filterProps,piechart9dde7Props?.filterFlag);
  },[piechart9dde7Props?.filterProps])

  if (piechart9dde7?.isHidden) {
    return <></>
  }
   return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `12 / 54`, gap:``, height: `100%`}}
    >
      <PieChart
        data={data}
        showCurrencySign = "₹"
        title  = {`${keyset("title")}`}
        fillContainer={true}
        colors = {["#66BB6A","#42A5F5","#4ECDC4","#AB47BC","#FF6B6B","#bec92c"]}
        className = ""
        contentAlign="left"
        onClick={handlePieClick}
      />      
    </div>
  )
}
