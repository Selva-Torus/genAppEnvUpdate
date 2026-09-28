

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
  const {dfd_piechartdashboard_v1Props, setdfd_piechartdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  const {overall_group0ca82, setoverall_group0ca82}= useContext(TotalContext) as TotalContextProps;  
  const {overall_group0ca82Props, setoverall_group0ca82Props}= useContext(TotalContext) as TotalContextProps;  
  const {register_ai_group08810, setregister_ai_group08810}= useContext(TotalContext) as TotalContextProps;  
  const {register_ai_group08810Props, setregister_ai_group08810Props}= useContext(TotalContext) as TotalContextProps;  
  const {tier_critical_group484c4, settier_critical_group484c4}= useContext(TotalContext) as TotalContextProps;  
  const {tier_critical_group484c4Props, settier_critical_group484c4Props}= useContext(TotalContext) as TotalContextProps;  
  const {cert_expired_groupf48db, setcert_expired_groupf48db}= useContext(TotalContext) as TotalContextProps;  
  const {cert_expired_groupf48dbProps, setcert_expired_groupf48dbProps}= useContext(TotalContext) as TotalContextProps;  
  const {named_owner_group4361e, setnamed_owner_group4361e}= useContext(TotalContext) as TotalContextProps;  
  const {named_owner_group4361eProps, setnamed_owner_group4361eProps}= useContext(TotalContext) as TotalContextProps;  
  const {cert_date_group9ac35, setcert_date_group9ac35}= useContext(TotalContext) as TotalContextProps;  
  const {cert_date_group9ac35Props, setcert_date_group9ac35Props}= useContext(TotalContext) as TotalContextProps;  
  const {governer_gap_group09585, setgoverner_gap_group09585}= useContext(TotalContext) as TotalContextProps;  
  const {governer_gap_group09585Props, setgoverner_gap_group09585Props}= useContext(TotalContext) as TotalContextProps;  
  const {table0a722, settable0a722}= useContext(TotalContext) as TotalContextProps;  
  const {table0a722Props, settable0a722Props}= useContext(TotalContext) as TotalContextProps;  
  const {pirchart_group8d70d, setpirchart_group8d70d}= useContext(TotalContext) as TotalContextProps;  
  const {pirchart_group8d70dProps, setpirchart_group8d70dProps}= useContext(TotalContext) as TotalContextProps;  
  const {piechart_header9d07c, setpiechart_header9d07c}= useContext(TotalContext) as TotalContextProps;  
  const {piechartbd633, setpiechartbd633}= useContext(TotalContext) as TotalContextProps;  
  const {assets_by_business_unit_group374c2, setassets_by_business_unit_group374c2}= useContext(TotalContext) as TotalContextProps;  
  const {assets_by_business_unit_group374c2Props, setassets_by_business_unit_group374c2Props}= useContext(TotalContext) as TotalContextProps;  
  const {piechartbd633Props, setpiechartbd633Props} = useContext(TotalContext) as TotalContextProps;
  //////////////



  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean)=>{
    try{
     // orchestration API call 
    const orchestrationData : any = getControlOrchestrationData(
      controlData,
      "9ec89fa6254d4463a0595b1d7a48d70d",
      "b133776d9f2144c1803095d5633bd633"
    ); 
    let code:any= orchestrationData?.data?.code ;
    if (code != '') {
        let codeStates: any = {}
        codeStates['overall_group']  = overall_group0ca82,
        codeStates['setoverall_group'] = setoverall_group0ca82,
        codeStates['register_ai_group']  = register_ai_group08810,
        codeStates['setregister_ai_group'] = setregister_ai_group08810,
        codeStates['tier_critical_group']  = tier_critical_group484c4,
        codeStates['settier_critical_group'] = settier_critical_group484c4,
        codeStates['cert_expired_group']  = cert_expired_groupf48db,
        codeStates['setcert_expired_group'] = setcert_expired_groupf48db,
        codeStates['named_owner_group']  = named_owner_group4361e,
        codeStates['setnamed_owner_group'] = setnamed_owner_group4361e,
        codeStates['cert_date_group']  = cert_date_group9ac35,
        codeStates['setcert_date_group'] = setcert_date_group9ac35,
        codeStates['governer_gap_group']  = governer_gap_group09585,
        codeStates['setgoverner_gap_group'] = setgoverner_gap_group09585,
        codeStates['table']  = table0a722,
        codeStates['settable'] = settable0a722,
        codeStates['pirchart_group']  = pirchart_group8d70d,
        codeStates['setpirchart_group'] = setpirchart_group8d70d,
        codeStates['assets_by_business_unit_group']  = assets_by_business_unit_group374c2,
        codeStates['setassets_by_business_unit_group'] = setassets_by_business_unit_group374c2,
      codeExecution(code,codeStates)
      }
      if ("hasLogicCenter" in dfd_piechartdashboard_v1Props && !dfd_piechartdashboard_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_piechartdashboard_v1Props.dstKey,
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
        setpirchart_group8d70d((pre: any) => ({
          ...pre,
          name: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.name
            : "0"
        }))
        setData(api_paginationData.data.records);
      }else{
      if(filterFlag){
        setpirchart_group8d70d((pre: any) => ({
          ...pre,
          name: piechartbd633Props?.filteredData?.length > 0
            ? piechartbd633Props?.filteredData[0]?.name
            : "0"
        }))
        setData(piechartbd633Props?.filteredData);
      }else if(Array.isArray(dfd_piechartdashboard_v1Props) && dfd_piechartdashboard_v1Props && !pirchart_group8d70d.name){
          setData(dfd_piechartdashboard_v1Props);
          setpirchart_group8d70d((pre:any)=>({...pre,name:dfd_piechartdashboard_v1Props[0]?.name}));
        }
      }
      if(Array.isArray(dfd_piechartdashboard_v1Props)){
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
  },[piechartbd633?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_piechartdashboard_v1Props) && dfd_piechartdashboard_v1Props?.length > 0){
      setData(dfd_piechartdashboard_v1Props)
      setpirchart_group8d70d((pre:any)=>({...pre,name:dfd_piechartdashboard_v1Props[0]?.name}))
    }
  },[dfd_piechartdashboard_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!piechartbd633Props?.filterProps) return;
    handleMapperDetails(piechartbd633Props?.filterProps,piechartbd633Props?.filterFlag);
  },[piechartbd633Props?.filterProps])

  if (piechartbd633?.isHidden) {
    return <></>
  }
   return (
    <div
      className="w-full h-full"
      style={{gridColumn: `1 / 25`,gridRow: `7 / 65`, gap:``, height: `100%`}}
    >
      <PieChart
        data={data}
        fillContainer={true}
        colors = {["#7C0AB1","#014F91","#0AB19A"]}
        className = ""
        numberKey= {'count'}
        contentAlign="left"
        onClick={handlePieClick}
      />      
    </div>
  )
}
