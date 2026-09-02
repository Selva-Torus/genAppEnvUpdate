

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

type ContentAlign = "left" | "center" | "right";

interface LineChartslineChartCompProps {
  encryptionFlagCompData: any;
  controlData:any;
  setIsProcessing:any;
}

export default function LineChartsapi_call_over_month_linechart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: LineChartslineChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any>([]);
  const {dfd_mongo_linechart_dfd_v1Props, setdfd_mongo_linechart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {vob_dashboard_screen9ce49, setvob_dashboard_screen9ce49}= useContext(TotalContext) as TotalContextProps;  
  const {vob_dashboard_screen9ce49Props, setvob_dashboard_screen9ce49Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_usage_group868b4, setapi_usage_group868b4}= useContext(TotalContext) as TotalContextProps;  
  const {api_usage_group868b4Props, setapi_usage_group868b4Props}= useContext(TotalContext) as TotalContextProps;  
  const {req_groupdf5e7, setreq_groupdf5e7}= useContext(TotalContext) as TotalContextProps;  
  const {req_groupdf5e7Props, setreq_groupdf5e7Props}= useContext(TotalContext) as TotalContextProps;  
  const {active_group31e18, setactive_group31e18}= useContext(TotalContext) as TotalContextProps;  
  const {active_group31e18Props, setactive_group31e18Props}= useContext(TotalContext) as TotalContextProps;  
  const {total_api_calls_groupd4dee, settotal_api_calls_groupd4dee}= useContext(TotalContext) as TotalContextProps;  
  const {total_api_calls_groupd4deeProps, settotal_api_calls_groupd4deeProps}= useContext(TotalContext) as TotalContextProps;  
  const {most_groupc5ce0, setmost_groupc5ce0}= useContext(TotalContext) as TotalContextProps;  
  const {most_groupc5ce0Props, setmost_groupc5ce0Props}= useContext(TotalContext) as TotalContextProps;  
  const {line_chart_groupadc5c, setline_chart_groupadc5c}= useContext(TotalContext) as TotalContextProps;  
  const {line_chart_groupadc5cProps, setline_chart_groupadc5cProps}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_frequency_subscreenb8acc, setapi_call_over_frequency_subscreenb8acc}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_frequency_subscreenb8accProps, setapi_call_over_frequency_subscreenb8accProps}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_hour_group2febf, setapi_call_over_hour_group2febf}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_hour_group2febfProps, setapi_call_over_hour_group2febfProps}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_month_groupccb80, setapi_call_over_month_groupccb80}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_month_groupccb80Props, setapi_call_over_month_groupccb80Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_month_linecharte59b1, setapi_call_over_month_linecharte59b1}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6}= useContext(TotalContext) as TotalContextProps;  
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_week_group987fe, setapi_call_over_week_group987fe}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_week_group987feProps, setapi_call_over_week_group987feProps}= useContext(TotalContext) as TotalContextProps;  
  const {total_used_api_groupcd37d, settotal_used_api_groupcd37d}= useContext(TotalContext) as TotalContextProps;  
  const {total_used_api_groupcd37dProps, settotal_used_api_groupcd37dProps}= useContext(TotalContext) as TotalContextProps;  
  const {list_of_register_tpp_groupbe9d5, setlist_of_register_tpp_groupbe9d5}= useContext(TotalContext) as TotalContextProps;  
  const {list_of_register_tpp_groupbe9d5Props, setlist_of_register_tpp_groupbe9d5Props}= useContext(TotalContext) as TotalContextProps;  
  const {connected_application19ab2, setconnected_application19ab2}= useContext(TotalContext) as TotalContextProps;  
  const {connected_application19ab2Props, setconnected_application19ab2Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_repo_table162e4, setapi_repo_table162e4}= useContext(TotalContext) as TotalContextProps;  
  const {api_repo_table162e4Props, setapi_repo_table162e4Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_repositoryb1ab8, setapi_repositoryb1ab8}= useContext(TotalContext) as TotalContextProps;  
  const {api_repositoryb1ab8Props, setapi_repositoryb1ab8Props}= useContext(TotalContext) as TotalContextProps;  
  const {group1233a04c, setgroup1233a04c}= useContext(TotalContext) as TotalContextProps;  
  const {group1233a04cProps, setgroup1233a04cProps}= useContext(TotalContext) as TotalContextProps;  
  const {group4549ff98, setgroup4549ff98}= useContext(TotalContext) as TotalContextProps;  
  const {group4549ff98Props, setgroup4549ff98Props}= useContext(TotalContext) as TotalContextProps;  
  const {group657d5, setgroup657d5}= useContext(TotalContext) as TotalContextProps;  
  const {group657d5Props, setgroup657d5Props}= useContext(TotalContext) as TotalContextProps;  
  const {group6576622ab, setgroup6576622ab}= useContext(TotalContext) as TotalContextProps;  
  const {group6576622abProps, setgroup6576622abProps}= useContext(TotalContext) as TotalContextProps;  
  const {group796798bff3, setgroup796798bff3}= useContext(TotalContext) as TotalContextProps;  
  const {group796798bff3Props, setgroup796798bff3Props}= useContext(TotalContext) as TotalContextProps;  
  const {api_call_over_month_linecharte59b1Props, setapi_call_over_month_linecharte59b1Props} = useContext(TotalContext) as TotalContextProps;
  //////////////




  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "136595a6c5b44c8990100d7e837ccb80",
      "2c02eecbb6924e2eb79417d8eb0e59b1"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
        codeStates['vob_dashboard_screen']  = vob_dashboard_screen9ce49,
        codeStates['setvob_dashboard_screen'] = setvob_dashboard_screen9ce49,
        codeStates['api_usage_group']  = api_usage_group868b4,
        codeStates['setapi_usage_group'] = setapi_usage_group868b4,
        codeStates['req_group']  = req_groupdf5e7,
        codeStates['setreq_group'] = setreq_groupdf5e7,
        codeStates['active_group']  = active_group31e18,
        codeStates['setactive_group'] = setactive_group31e18,
        codeStates['total_api_calls_group']  = total_api_calls_groupd4dee,
        codeStates['settotal_api_calls_group'] = settotal_api_calls_groupd4dee,
        codeStates['most_group']  = most_groupc5ce0,
        codeStates['setmost_group'] = setmost_groupc5ce0,
        codeStates['line_chart_group']  = line_chart_groupadc5c,
        codeStates['setline_chart_group'] = setline_chart_groupadc5c,
        codeStates['api_call_over_frequency_subscreen']  = api_call_over_frequency_subscreenb8acc,
        codeStates['setapi_call_over_frequency_subscreen'] = setapi_call_over_frequency_subscreenb8acc,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1']  = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
        codeStates['api_call_over_hour_group']  = api_call_over_hour_group2febf,
        codeStates['setapi_call_over_hour_group'] = setapi_call_over_hour_group2febf,
        codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v1']  = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
        codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
        codeStates['api_call_over_month_group']  = api_call_over_month_groupccb80,
        codeStates['setapi_call_over_month_group'] = setapi_call_over_month_groupccb80,
        codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1']  = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
        codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
        codeStates['api_call_over_week_group']  = api_call_over_week_group987fe,
        codeStates['setapi_call_over_week_group'] = setapi_call_over_week_group987fe,
        codeStates['total_used_api_group']  = total_used_api_groupcd37d,
        codeStates['settotal_used_api_group'] = settotal_used_api_groupcd37d,
        codeStates['list_of_register_tpp_group']  = list_of_register_tpp_groupbe9d5,
        codeStates['setlist_of_register_tpp_group'] = setlist_of_register_tpp_groupbe9d5,
        codeStates['connected_application']  = connected_application19ab2,
        codeStates['setconnected_application'] = setconnected_application19ab2,
        codeStates['api_repo_table']  = api_repo_table162e4,
        codeStates['setapi_repo_table'] = setapi_repo_table162e4,
        codeStates['api_repository']  = api_repositoryb1ab8,
        codeStates['setapi_repository'] = setapi_repositoryb1ab8,
        codeStates['group123']  = group1233a04c,
        codeStates['setgroup123'] = setgroup1233a04c,
        codeStates['group454']  = group4549ff98,
        codeStates['setgroup454'] = setgroup4549ff98,
        codeStates['group']  = group657d5,
        codeStates['setgroup'] = setgroup657d5,
        codeStates['group6576']  = group6576622ab,
        codeStates['setgroup6576'] = setgroup6576622ab,
        codeStates['group79679']  = group796798bff3,
        codeStates['setgroup79679'] = setgroup796798bff3,
      codeExecution(code,codeStates)
      }
      try{
        if ("hasLogicCenter" in dfd_mongo_linechart_dfd_v1Props && !dfd_mongo_linechart_dfd_v1Props.hasLogicCenter) {
          let searchFilter: any = {};
          if (filterProps?.length) {
            searchFilter = filterProps;
          }
          const api_paginationData: any = await AxiosService.post('/UF/pagination',
            {
              key: dfd_mongo_linechart_dfd_v1Props.dstKey,
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
          setapi_call_over_month_groupccb80((pre: any) => ({
            ...pre,
            name: api_paginationData.data.records?.length > 0
              ? api_paginationData.data.records[0]?.name
              : "0"
          }))
          setData(api_paginationData.data.records);
        }else{
        if(filterFlag){
          setapi_call_over_month_groupccb80((pre: any) => ({
            ...pre,
            name: api_call_over_month_linecharte59b1Props?.filteredData?.length > 0
              ? api_call_over_month_linecharte59b1Props?.filteredData[0]?.name
              : "0"
          }))
          setData(api_call_over_month_linecharte59b1Props?.filteredData);
        }else if(Array.isArray(dfd_mongo_linechart_dfd_v1Props) && dfd_mongo_linechart_dfd_v1Props && !api_call_over_month_groupccb80.name){
          setData(dfd_mongo_linechart_dfd_v1Props);
          setapi_call_over_month_groupccb80((pre:any)=>({...pre,name:dfd_mongo_linechart_dfd_v1Props[0]?.name}));
        }
      }
      }catch(err){
        console.log(err)
      }
      if(Array.isArray(dfd_mongo_linechart_dfd_v1Props)){
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


  const handleLineChartClick = async (linechartData: any, index: number, event: React.MouseEvent) => {
    const clickedName = linechartData?.payload?.name;
    await handleClick(clickedName);
  }; 

  useEffect(() => {
    handleMapperDetails();
  },[api_call_over_month_linecharte59b1?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_mongo_linechart_dfd_v1Props) && dfd_mongo_linechart_dfd_v1Props?.length > 0){
      setData(dfd_mongo_linechart_dfd_v1Props)
      setapi_call_over_month_groupccb80((pre:any)=>({...pre,name:dfd_mongo_linechart_dfd_v1Props[0]?.name}))
    }
  },[dfd_mongo_linechart_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!api_call_over_month_linecharte59b1Props?.filterProps) return;
    handleMapperDetails(api_call_over_month_linecharte59b1Props?.filterProps,api_call_over_month_linecharte59b1Props?.filterFlag);
  },[api_call_over_month_linecharte59b1Props?.filterProps])

  if (api_call_over_month_linecharte59b1?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `1 / 53`, gap:``, height: `100%`}}
    >
      <LineChart
        data={data}
        fillContainer={true}
        colors = {["#FCB875","#FCA3A3","#6DBAEE"]}
        className = ""
        numberKey= {'Totalcalls'}
        contentAlign="left"
        onClick={handleLineChartClick}
      />
    </div>
  );
}
