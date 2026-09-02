

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

export default function BarChartsgroup_barchart({ 
  encryptionFlagCompData,
  setIsProcessing,
  controlData
}: BarChartsbarChartCompProps) {
  const { token } = useGlobal();
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any[]>([]);
  const {dfd_tob_mzdsh_group_barchart_dfd_v1Props, setdfd_tob_mzdsh_group_barchart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {monetization_groupf0a3b, setmonetization_groupf0a3b}= useContext(TotalContext) as TotalContextProps;  
  const {monetization_groupf0a3bProps, setmonetization_groupf0a3bProps}= useContext(TotalContext) as TotalContextProps;  
  const {dash_groupc162b, setdash_groupc162b}= useContext(TotalContext) as TotalContextProps;  
  const {dash_groupc162bProps, setdash_groupc162bProps}= useContext(TotalContext) as TotalContextProps;  
  const {monthly_revenue_card_group3bf72, setmonthly_revenue_card_group3bf72}= useContext(TotalContext) as TotalContextProps;  
  const {monthly_revenue_card_group3bf72Props, setmonthly_revenue_card_group3bf72Props}= useContext(TotalContext) as TotalContextProps;  
  const {ytd_revenue_card_groupbb98b, setytd_revenue_card_groupbb98b}= useContext(TotalContext) as TotalContextProps;  
  const {ytd_revenue_card_groupbb98bProps, setytd_revenue_card_groupbb98bProps}= useContext(TotalContext) as TotalContextProps;  
  const {invoice_raised_card_group23315, setinvoice_raised_card_group23315}= useContext(TotalContext) as TotalContextProps;  
  const {invoice_raised_card_group23315Props, setinvoice_raised_card_group23315Props}= useContext(TotalContext) as TotalContextProps;  
  const {avg_revenue_tpp_card_group56d8e, setavg_revenue_tpp_card_group56d8e}= useContext(TotalContext) as TotalContextProps;  
  const {avg_revenue_tpp_card_group56d8eProps, setavg_revenue_tpp_card_group56d8eProps}= useContext(TotalContext) as TotalContextProps;  
  const {revenue_trend_groupa654b, setrevenue_trend_groupa654b}= useContext(TotalContext) as TotalContextProps;  
  const {revenue_trend_groupa654bProps, setrevenue_trend_groupa654bProps}= useContext(TotalContext) as TotalContextProps;  
  const {trend_text1634c, settrend_text1634c}= useContext(TotalContext) as TotalContextProps;  
  const {group_barchart5116c, setgroup_barchart5116c}= useContext(TotalContext) as TotalContextProps;  
  const {piechart_groupce72b, setpiechart_groupce72b}= useContext(TotalContext) as TotalContextProps;  
  const {piechart_groupce72bProps, setpiechart_groupce72bProps}= useContext(TotalContext) as TotalContextProps;  
  const {billing_status_tableef735, setbilling_status_tableef735}= useContext(TotalContext) as TotalContextProps;  
  const {billing_status_tableef735Props, setbilling_status_tableef735Props}= useContext(TotalContext) as TotalContextProps;  
  const {overage_charges_group44542, setoverage_charges_group44542}= useContext(TotalContext) as TotalContextProps;  
  const {overage_charges_group44542Props, setoverage_charges_group44542Props}= useContext(TotalContext) as TotalContextProps;  
  const {tier_table17c1c, settier_table17c1c}= useContext(TotalContext) as TotalContextProps;  
  const {tier_table17c1cProps, settier_table17c1cProps}= useContext(TotalContext) as TotalContextProps;  
  const {group_barchart5116cProps, setgroup_barchart5116cProps} = useContext(TotalContext) as TotalContextProps;
  //////////////




  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "509207a428354c17bb910172bc1a654b",
      "88061820dd7a4dc7b2b71ed3d755116c"
    );
    let code:string= orchestrationData?.data?.code;
      if (code != '') {
        let codeStates: Record<string, any> = {}
          codeStates['monetization_group']  = monetization_groupf0a3b,
          codeStates['setmonetization_group'] = setmonetization_groupf0a3b,
          codeStates['dash_group']  = dash_groupc162b,
          codeStates['setdash_group'] = setdash_groupc162b,
          codeStates['monthly_revenue_card_group']  = monthly_revenue_card_group3bf72,
          codeStates['setmonthly_revenue_card_group'] = setmonthly_revenue_card_group3bf72,
          codeStates['ytd_revenue_card_group']  = ytd_revenue_card_groupbb98b,
          codeStates['setytd_revenue_card_group'] = setytd_revenue_card_groupbb98b,
          codeStates['invoice_raised_card_group']  = invoice_raised_card_group23315,
          codeStates['setinvoice_raised_card_group'] = setinvoice_raised_card_group23315,
          codeStates['avg_revenue_tpp_card_group']  = avg_revenue_tpp_card_group56d8e,
          codeStates['setavg_revenue_tpp_card_group'] = setavg_revenue_tpp_card_group56d8e,
          codeStates['revenue_trend_group']  = revenue_trend_groupa654b,
          codeStates['setrevenue_trend_group'] = setrevenue_trend_groupa654b,
          codeStates['piechart_group']  = piechart_groupce72b,
          codeStates['setpiechart_group'] = setpiechart_groupce72b,
          codeStates['billing_status_table']  = billing_status_tableef735,
          codeStates['setbilling_status_table'] = setbilling_status_tableef735,
          codeStates['overage_charges_group']  = overage_charges_group44542,
          codeStates['setoverage_charges_group'] = setoverage_charges_group44542,
          codeStates['tier_table']  = tier_table17c1c,
          codeStates['settier_table'] = settier_table17c1c,
        codeExecution(code,codeStates);
      }
      if ("hasLogicCenter" in dfd_tob_mzdsh_group_barchart_dfd_v1Props && !dfd_tob_mzdsh_group_barchart_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_tob_mzdsh_group_barchart_dfd_v1Props.dstKey,
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
        setrevenue_trend_groupa654b((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setrevenue_trend_groupa654b((pre: any) => ({
          ...pre,
          name: group_barchart5116cProps?.filteredData?.length > 0
            ? group_barchart5116cProps?.filteredData[0]?.name
            : "0"
        }))
        setData(group_barchart5116cProps?.filteredData);
      }else if(Array.isArray(dfd_tob_mzdsh_group_barchart_dfd_v1Props) && dfd_tob_mzdsh_group_barchart_dfd_v1Props && !revenue_trend_groupa654b.name){
          setData(dfd_tob_mzdsh_group_barchart_dfd_v1Props);
          setrevenue_trend_groupa654b((pre:any)=>({...pre,name:dfd_tob_mzdsh_group_barchart_dfd_v1Props[0]?.name}));
        }
      }
      if(Array.isArray(dfd_tob_mzdsh_group_barchart_dfd_v1Props)){
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
   },[group_barchart5116c?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_tob_mzdsh_group_barchart_dfd_v1Props) && dfd_tob_mzdsh_group_barchart_dfd_v1Props?.length > 0){
      setData(dfd_tob_mzdsh_group_barchart_dfd_v1Props);
      setrevenue_trend_groupa654b((pre:any)=>({...pre,name:dfd_tob_mzdsh_group_barchart_dfd_v1Props[0]?.name}));
    }
  },[dfd_tob_mzdsh_group_barchart_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!group_barchart5116cProps?.filterProps) return;
    handleMapperDetails(group_barchart5116cProps?.filterProps,group_barchart5116cProps?.filterFlag);
  },[group_barchart5116cProps?.filterProps])

 
  if (group_barchart5116c?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `9 / 55`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        showCurrencySign = "د.إ"
        className = ""
        fillContainer={true}
        colors = {["#7EC8D8","#3B6FA6"]}
        contentAlign="left"
        onClick={handleBarClick}
      />
    </div>
  );
}
