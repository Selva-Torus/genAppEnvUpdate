

'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { Tooltip } from '@/components/Tooltip'
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { LineChart } from '@/components/LineChart';
import { Text } from "@/components/Text";
import { Card } from '@/components/Card';
import i18n from '@/app/components/i18n';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { getFilterProps } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import filterData from '@/context/filterdata.json';

type ContentAlign = "left" | "center" | "right";

interface LineChartslineChartCompProps {
  lockedData:any;
  setLockedData:any;
  encryptionFlagCompData: any;
  controlData:any;
  setIsProcessing:any;
}

export default function LineChartslinechart({ 
  lockedData,
  setLockedData,
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: LineChartslineChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any>([]);
  const {dfd_channelchartdashboard_dashboard_v1Props, setdfd_channelchartdashboard_dashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {line_chart_group61ee8, setline_chart_group61ee8}= useContext(TotalContext) as TotalContextProps;  
  const {line_chart_group61ee8Props, setline_chart_group61ee8Props}= useContext(TotalContext) as TotalContextProps;  
  const {linechartdd99a, setlinechartdd99a}= useContext(TotalContext) as TotalContextProps;  
  const {bar_chart_group737a3, setbar_chart_group737a3}= useContext(TotalContext) as TotalContextProps;  
  const {bar_chart_group737a3Props, setbar_chart_group737a3Props}= useContext(TotalContext) as TotalContextProps;  
  const {pie_chart_group15067, setpie_chart_group15067}= useContext(TotalContext) as TotalContextProps;  
  const {pie_chart_group15067Props, setpie_chart_group15067Props}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34, settransaction_tablef4f34}= useContext(TotalContext) as TotalContextProps;  
  const {transaction_tablef4f34Props, settransaction_tablef4f34Props}= useContext(TotalContext) as TotalContextProps;  
  const {linechartdd99aProps, setlinechartdd99aProps} = useContext(TotalContext) as TotalContextProps;
  //////////////



//setSearchFilters
async function handleSearch0(value:any) {
  let mainData: any =  nullFilter({...structuredClone(line_chart_group61ee8), name: value})
  let temp: any = {}, filteredData: any = [], filterFlag = true;
  line_chart_group61ee8Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"c2a320f6a30140a487ed20c46f1763dd",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c2a320f6a30140a487ed20c46f1763dd",
        "object": {
          "properties.trs_product_code": "48bd654c96fb412a91fa1349d94dd99a"
        }
      }
    ]
  }
];

  const filterColumn = Object.keys(originalFiltervalues[0]?.nodeBasedData?.[0]?.object ?? {})[0];
  filterProps = line_chart_group61ee8Props?.needToSpread?.length ? spreadedValues : originalFiltervalues;
  let filterData = (await getFilterProps(filterProps, mainData)).map(({ DFDkey, ...rest }: any) => rest);

  filterData=nullFilter(filterData);
  if (transaction_tablef4f34Props?.filterProps?.length) {
    transaction_tablef4f34Props.filterProps.forEach((existingItem: any) => {
      const matchIndex = filterData.findIndex(
        (f: any) => f.nodeId === existingItem.nodeId
      );
      if (matchIndex >= 0) {
        filterData[matchIndex] = {
          ...existingItem,
          ...filterData[matchIndex]
        };
      } else {
        filterData.push(existingItem);
      }
    });
  }
  if (!value) {
    filterData = filterData.map((f: any) => {
      const filtered = { ...f };
      delete filtered[filterColumn];
      return filtered;
    });
  }
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:PAGE_SIZE,
    page:currentPage
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet0:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet0)
  settransaction_tablef4f34Props((prev: any) => {
  let mergedData: any;
  mergedData = [...filterData];

  return {
    ...prev,
    filterProps: mergedData,
    filteredData:filteredData,
    filterFlag:filterFlag,
    filterInitalLoad:true
  };
  });
  }
  ///////////////

  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "3c41641b5d9141cb86eecd50ae461ee8",
      "48bd654c96fb412a91fa1349d94dd99a"
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
        codeStates['line_chart_group']  = line_chart_group61ee8,
        codeStates['setline_chart_group'] = setline_chart_group61ee8,
        codeStates['bar_chart_group']  = bar_chart_group737a3,
        codeStates['setbar_chart_group'] = setbar_chart_group737a3,
        codeStates['pie_chart_group']  = pie_chart_group15067,
        codeStates['setpie_chart_group'] = setpie_chart_group15067,
        codeStates['transaction_table']  = transaction_tablef4f34,
        codeStates['settransaction_table'] = settransaction_tablef4f34,
      codeExecution(code,codeStates)
      }
      try{
        if ("hasLogicCenter" in dfd_channelchartdashboard_dashboard_v1Props && !dfd_channelchartdashboard_dashboard_v1Props.hasLogicCenter) {
          let searchFilter: any = {};
          if (filterProps?.length) {
            searchFilter = filterProps;
          }
          const api_paginationData: any = await AxiosService.post('/UF/pagination',
            {
              key: dfd_channelchartdashboard_dashboard_v1Props.dstKey,
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
          setline_chart_group61ee8((pre: any) => ({
            ...pre,
            name: api_paginationData.data.records?.length > 0
              ? api_paginationData.data.records[0]?.name
              : "0"
          }))
          setData(api_paginationData.data.records);
        }else{
        if(filterFlag){
          setline_chart_group61ee8((pre: any) => ({
            ...pre,
            name: linechartdd99aProps?.filteredData?.length > 0
              ? linechartdd99aProps?.filteredData[0]?.name
              : "0"
          }))
          setData(linechartdd99aProps?.filteredData);
        }else if(Array.isArray(dfd_channelchartdashboard_dashboard_v1Props) && dfd_channelchartdashboard_dashboard_v1Props && !line_chart_group61ee8.name){
          setData(dfd_channelchartdashboard_dashboard_v1Props);
          setline_chart_group61ee8((pre:any)=>({...pre,name:dfd_channelchartdashboard_dashboard_v1Props[0]?.name}));
        }
      }
      }catch(err){
        console.log(err)
      }
      if(Array.isArray(dfd_channelchartdashboard_dashboard_v1Props)){
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
      await  handleSearch0(value);
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

  async function handleConfirmonClick(){
  } 

  const handleLineChartClick = async (linechartData: any, index: number, event: React.MouseEvent) => {
    const clickedName = linechartData?.payload?.name;
    await handleClick(clickedName);
  }; 

  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    handleMapperDetails();
  },[linechartdd99a?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_channelchartdashboard_dashboard_v1Props) && dfd_channelchartdashboard_dashboard_v1Props?.length > 0){
      setData(dfd_channelchartdashboard_dashboard_v1Props)
      setline_chart_group61ee8((pre:any)=>({...pre,name:dfd_channelchartdashboard_dashboard_v1Props[0]?.name}))
    }
  },[dfd_channelchartdashboard_dashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (linechartdd99aProps?.filterInitalLoad) return;

    const filterControllers = linechartdd99aProps?.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['linechartdd99a']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['linechartdd99a']).filter((k: string) => jsonEntry['linechartdd99a'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      handleMapperDetails(linechartdd99aProps?.filterProps,linechartdd99aProps?.filterFlag);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;

    skipNextFilterPropsRef.current = true;
    setlinechartdd99aProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    handleMapperDetails(linechartdd99aProps?.filterProps,linechartdd99aProps?.filterFlag);
  },[linechartdd99aProps?.filterControllers])

  // subsequent filterProps changes, once the gated initial load has completed
  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!linechartdd99aProps?.filterInitalLoad) return;
    if (!linechartdd99aProps?.filterProps) return;
    handleMapperDetails(linechartdd99aProps?.filterProps,linechartdd99aProps?.filterFlag);
  },[linechartdd99aProps?.filterProps])

  if (linechartdd99a?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `2 / 28`, gap:``, height: `100%`}}
    >
      <LineChart
        data={data}
        showCurrencySign = "₹"
        fillContainer={true}
        colors = {["#000000"]}
        className = ""
        numberKey= {'count'}
        contentAlign="left"
        onClick={handleLineChartClick}
      />
    </div>
  );
}
