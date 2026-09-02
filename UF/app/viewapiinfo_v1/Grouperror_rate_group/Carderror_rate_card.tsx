'use client'


import React, { useState, useContext, useEffect, useRef } from 'react'; 
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import i18n from '@/app/components/i18n';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Carderror_rate_card = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_mongo_totalcalls_dfd_v1Props, setdfd_mongo_totalcalls_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const selected=useRef({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast : Function=useInfoMsg();
  const routes : AppRouterInstance  = useRouter();
  const prevRefreshRef = useRef<any>(false);
  //showComponentAsPopup || showArtifactAsModal
  /////////////
   //another screen
  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps
  const {error_rate_card9f823, seterror_rate_card9f823}= useContext(TotalContext) as TotalContextProps
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps
  const {error_rate_card9f823Props, seterror_rate_card9f823Props} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4e8b59975afa4262b8533f4e06c773d1",
        "84abd8c5156440a09ade1ad939b9f823"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
      codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
      codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
      codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
      codeStates['group'] = group1f4ba,
      codeStates['setgroup'] = setgroup1f4ba,
      codeStates['group1f4ba'] = group1f4baProps,
      codeStates['setgroup1f4ba'] = setgroup1f4baProps,
      codeStates['api_info_group'] = api_info_group6ad41,
      codeStates['setapi_info_group'] = setapi_info_group6ad41,
      codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
      codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
      codeStates['total_calls_group'] = total_calls_group76982,
      codeStates['settotal_calls_group'] = settotal_calls_group76982,
      codeStates['total_calls_group76982'] = total_calls_group76982Props,
      codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
      codeStates['success_rate_group'] = success_rate_groupb6598,
      codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
      codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
      codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
      codeStates['error_rate_group'] = error_rate_group773d1,
      codeStates['seterror_rate_group'] = seterror_rate_group773d1,
      codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
      codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
      codeStates['error_rate_card'] = error_rate_card9f823,
      codeStates['seterror_rate_card'] = seterror_rate_card9f823,
      codeStates['ob_group'] = ob_group76678,
      codeStates['setob_group'] = setob_group76678,
      codeStates['ob_group76678'] = ob_group76678Props,
      codeStates['setob_group76678'] = setob_group76678Props,
      codeStates['api_process_log_group'] = api_process_log_group192b0,
      codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
      codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
      codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
      codeStates['api_process_log_table'] = api_process_log_table5904e,
      codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
      codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
      codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_mongo_totalcalls_dfd_v1Props && !dfd_mongo_totalcalls_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_mongo_totalcalls_dfd_v1Props.dstKey,
            page: 1,
            count: 1,
            filterData: searchFilter
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        seterror_rate_group773d1((pre: any) => ({
          ...pre,
          error_rate: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.error_rate
            : "0"
        }))
      }
      else{
        if(filterFlag){
          seterror_rate_group773d1((pre: any) => ({
            ...pre,
            error_rate: error_rate_card9f823Props?.filteredData?.length > 0
              ? error_rate_card9f823Props?.filteredData[0]?.error_rate
              : "0"
          }))
        }else if(Array.isArray(dfd_mongo_totalcalls_dfd_v1Props) && dfd_mongo_totalcalls_dfd_v1Props && !error_rate_group773d1.error_rate){
          seterror_rate_group773d1((pre:any)=>({...pre,error_rate:dfd_mongo_totalcalls_dfd_v1Props[0]?.error_rate}))
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick=async(value:Record<string, any>):Promise<void>=>{
    try{
    setIsProcessing(true);
    selected.current = value;
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


  useEffect(() => {
    if (prevRefreshRef.current) {
      handleMapperDetails()
    }else 
    prevRefreshRef.current= true
  },[error_rate_card9f823?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_mongo_totalcalls_dfd_v1Props)){
      seterror_rate_group773d1((pre:any)=>({...pre,error_rate:dfd_mongo_totalcalls_dfd_v1Props[0]?.error_rate}));
    }
  },[dfd_mongo_totalcalls_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!error_rate_card9f823Props?.filterProps) return;
    handleMapperDetails(error_rate_card9f823Props?.filterProps,error_rate_card9f823Props?.filterFlag);
  },[error_rate_card9f823Props?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (error_rate_card9f823?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `1 / 25`,gridRow: `1 / 26`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className="p-1 !text-3xl !text-black font-bold"   
      theme="normal"
      view="clear"
      icon="MdOutlineReportGmailerrorred"
      label={keyset("Error Rate")}
      disabled= {error_rate_card9f823?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {error_rate_group773d1?.error_rate?error_rate_group773d1?.error_rate:"0"}
      </Card>
    </div>
  )
}

export default Carderror_rate_card
