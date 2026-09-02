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

const Cardactive_apis = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_mongodb_maindashboard_dfd_v1Props, setdfd_mongodb_maindashboard_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {vob_dashboard_screen9ce49, setvob_dashboard_screen9ce49}= useContext(TotalContext) as TotalContextProps
  const {vob_dashboard_screen9ce49Props, setvob_dashboard_screen9ce49Props}= useContext(TotalContext) as TotalContextProps
  const {api_usage_group868b4, setapi_usage_group868b4}= useContext(TotalContext) as TotalContextProps
  const {api_usage_group868b4Props, setapi_usage_group868b4Props}= useContext(TotalContext) as TotalContextProps
  const {req_groupdf5e7, setreq_groupdf5e7}= useContext(TotalContext) as TotalContextProps
  const {req_groupdf5e7Props, setreq_groupdf5e7Props}= useContext(TotalContext) as TotalContextProps
  const {active_group31e18, setactive_group31e18}= useContext(TotalContext) as TotalContextProps
  const {active_group31e18Props, setactive_group31e18Props}= useContext(TotalContext) as TotalContextProps
  const {active_apisac162, setactive_apisac162}= useContext(TotalContext) as TotalContextProps
  const {active_icon42af9, setactive_icon42af9}= useContext(TotalContext) as TotalContextProps
  const {total_api_calls_groupd4dee, settotal_api_calls_groupd4dee}= useContext(TotalContext) as TotalContextProps
  const {total_api_calls_groupd4deeProps, settotal_api_calls_groupd4deeProps}= useContext(TotalContext) as TotalContextProps
  const {most_groupc5ce0, setmost_groupc5ce0}= useContext(TotalContext) as TotalContextProps
  const {most_groupc5ce0Props, setmost_groupc5ce0Props}= useContext(TotalContext) as TotalContextProps
  const {line_chart_groupadc5c, setline_chart_groupadc5c}= useContext(TotalContext) as TotalContextProps
  const {line_chart_groupadc5cProps, setline_chart_groupadc5cProps}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_frequency_subscreenb8acc, setapi_call_over_frequency_subscreenb8acc}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_frequency_subscreenb8accProps, setapi_call_over_frequency_subscreenb8accProps}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_hour_group2febf, setapi_call_over_hour_group2febf}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_hour_group2febfProps, setapi_call_over_hour_group2febfProps}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_month_groupccb80, setapi_call_over_month_groupccb80}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_month_groupccb80Props, setapi_call_over_month_groupccb80Props}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6}= useContext(TotalContext) as TotalContextProps
  const {ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_week_group987fe, setapi_call_over_week_group987fe}= useContext(TotalContext) as TotalContextProps
  const {api_call_over_week_group987feProps, setapi_call_over_week_group987feProps}= useContext(TotalContext) as TotalContextProps
  const {total_used_api_groupcd37d, settotal_used_api_groupcd37d}= useContext(TotalContext) as TotalContextProps
  const {total_used_api_groupcd37dProps, settotal_used_api_groupcd37dProps}= useContext(TotalContext) as TotalContextProps
  const {list_of_register_tpp_groupbe9d5, setlist_of_register_tpp_groupbe9d5}= useContext(TotalContext) as TotalContextProps
  const {list_of_register_tpp_groupbe9d5Props, setlist_of_register_tpp_groupbe9d5Props}= useContext(TotalContext) as TotalContextProps
  const {connected_application19ab2, setconnected_application19ab2}= useContext(TotalContext) as TotalContextProps
  const {connected_application19ab2Props, setconnected_application19ab2Props}= useContext(TotalContext) as TotalContextProps
  const {api_repo_table162e4, setapi_repo_table162e4}= useContext(TotalContext) as TotalContextProps
  const {api_repo_table162e4Props, setapi_repo_table162e4Props}= useContext(TotalContext) as TotalContextProps
  const {api_repositoryb1ab8, setapi_repositoryb1ab8}= useContext(TotalContext) as TotalContextProps
  const {api_repositoryb1ab8Props, setapi_repositoryb1ab8Props}= useContext(TotalContext) as TotalContextProps
  const {group1233a04c, setgroup1233a04c}= useContext(TotalContext) as TotalContextProps
  const {group1233a04cProps, setgroup1233a04cProps}= useContext(TotalContext) as TotalContextProps
  const {group4549ff98, setgroup4549ff98}= useContext(TotalContext) as TotalContextProps
  const {group4549ff98Props, setgroup4549ff98Props}= useContext(TotalContext) as TotalContextProps
  const {group657d5, setgroup657d5}= useContext(TotalContext) as TotalContextProps
  const {group657d5Props, setgroup657d5Props}= useContext(TotalContext) as TotalContextProps
  const {group6576622ab, setgroup6576622ab}= useContext(TotalContext) as TotalContextProps
  const {group6576622abProps, setgroup6576622abProps}= useContext(TotalContext) as TotalContextProps
  const {group796798bff3, setgroup796798bff3}= useContext(TotalContext) as TotalContextProps
  const {group796798bff3Props, setgroup796798bff3Props}= useContext(TotalContext) as TotalContextProps
  const {active_apisac162Props, setactive_apisac162Props} = useContext(TotalContext) as TotalContextProps;
  //////////////
 
  
  const handleMapperDetails=async(filterProps?:any,filterFlag?:boolean):Promise<void>=>{
    try{
    let code:string;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "eeeb5c250aa74e2993d16229dce31e18",
        "2909867a1b8f43fba016a719612ac162"
      );
    code = orchestrationData?.data?.code;
    if (code != '') {
      let codeStates: Record<string, any> = {}
      codeStates['vob_dashboard_screen'] = vob_dashboard_screen9ce49,
      codeStates['setvob_dashboard_screen'] = setvob_dashboard_screen9ce49,
      codeStates['vob_dashboard_screen9ce49'] = vob_dashboard_screen9ce49Props,
      codeStates['setvob_dashboard_screen9ce49'] = setvob_dashboard_screen9ce49Props,
      codeStates['api_usage_group'] = api_usage_group868b4,
      codeStates['setapi_usage_group'] = setapi_usage_group868b4,
      codeStates['api_usage_group868b4'] = api_usage_group868b4Props,
      codeStates['setapi_usage_group868b4'] = setapi_usage_group868b4Props,
      codeStates['req_group'] = req_groupdf5e7,
      codeStates['setreq_group'] = setreq_groupdf5e7,
      codeStates['req_groupdf5e7'] = req_groupdf5e7Props,
      codeStates['setreq_groupdf5e7'] = setreq_groupdf5e7Props,
      codeStates['active_group'] = active_group31e18,
      codeStates['setactive_group'] = setactive_group31e18,
      codeStates['active_group31e18'] = active_group31e18Props,
      codeStates['setactive_group31e18'] = setactive_group31e18Props,
      codeStates['active_apis'] = active_apisac162,
      codeStates['setactive_apis'] = setactive_apisac162,
      codeStates['active_icon'] = active_icon42af9,
      codeStates['setactive_icon'] = setactive_icon42af9,
      codeStates['total_api_calls_group'] = total_api_calls_groupd4dee,
      codeStates['settotal_api_calls_group'] = settotal_api_calls_groupd4dee,
      codeStates['total_api_calls_groupd4dee'] = total_api_calls_groupd4deeProps,
      codeStates['settotal_api_calls_groupd4dee'] = settotal_api_calls_groupd4deeProps,
      codeStates['most_group'] = most_groupc5ce0,
      codeStates['setmost_group'] = setmost_groupc5ce0,
      codeStates['most_groupc5ce0'] = most_groupc5ce0Props,
      codeStates['setmost_groupc5ce0'] = setmost_groupc5ce0Props,
      codeStates['line_chart_group'] = line_chart_groupadc5c,
      codeStates['setline_chart_group'] = setline_chart_groupadc5c,
      codeStates['line_chart_groupadc5c'] = line_chart_groupadc5cProps,
      codeStates['setline_chart_groupadc5c'] = setline_chart_groupadc5cProps,
      codeStates['api_call_over_frequency_subscreen'] = api_call_over_frequency_subscreenb8acc,
      codeStates['setapi_call_over_frequency_subscreen'] = setapi_call_over_frequency_subscreenb8acc,
      codeStates['api_call_over_frequency_subscreenb8acc'] = api_call_over_frequency_subscreenb8accProps,
      codeStates['setapi_call_over_frequency_subscreenb8acc'] = setapi_call_over_frequency_subscreenb8accProps,
      codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
      codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
      codeStates['ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026'] = ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props,
      codeStates['setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026'] = setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props,
      codeStates['api_call_over_hour_group'] = api_call_over_hour_group2febf,
      codeStates['setapi_call_over_hour_group'] = setapi_call_over_hour_group2febf,
      codeStates['api_call_over_hour_group2febf'] = api_call_over_hour_group2febfProps,
      codeStates['setapi_call_over_hour_group2febf'] = setapi_call_over_hour_group2febfProps,
      codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
      codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v1'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
      codeStates['ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528'] = ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props,
      codeStates['setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528'] = setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props,
      codeStates['api_call_over_month_group'] = api_call_over_month_groupccb80,
      codeStates['setapi_call_over_month_group'] = setapi_call_over_month_groupccb80,
      codeStates['api_call_over_month_groupccb80'] = api_call_over_month_groupccb80Props,
      codeStates['setapi_call_over_month_groupccb80'] = setapi_call_over_month_groupccb80Props,
      codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
      codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
      codeStates['ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6'] = ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props,
      codeStates['setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6'] = setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props,
      codeStates['api_call_over_week_group'] = api_call_over_week_group987fe,
      codeStates['setapi_call_over_week_group'] = setapi_call_over_week_group987fe,
      codeStates['api_call_over_week_group987fe'] = api_call_over_week_group987feProps,
      codeStates['setapi_call_over_week_group987fe'] = setapi_call_over_week_group987feProps,
      codeStates['total_used_api_group'] = total_used_api_groupcd37d,
      codeStates['settotal_used_api_group'] = settotal_used_api_groupcd37d,
      codeStates['total_used_api_groupcd37d'] = total_used_api_groupcd37dProps,
      codeStates['settotal_used_api_groupcd37d'] = settotal_used_api_groupcd37dProps,
      codeStates['list_of_register_tpp_group'] = list_of_register_tpp_groupbe9d5,
      codeStates['setlist_of_register_tpp_group'] = setlist_of_register_tpp_groupbe9d5,
      codeStates['list_of_register_tpp_groupbe9d5'] = list_of_register_tpp_groupbe9d5Props,
      codeStates['setlist_of_register_tpp_groupbe9d5'] = setlist_of_register_tpp_groupbe9d5Props,
      codeStates['connected_application'] = connected_application19ab2,
      codeStates['setconnected_application'] = setconnected_application19ab2,
      codeStates['connected_application19ab2'] = connected_application19ab2Props,
      codeStates['setconnected_application19ab2'] = setconnected_application19ab2Props,
      codeStates['api_repo_table'] = api_repo_table162e4,
      codeStates['setapi_repo_table'] = setapi_repo_table162e4,
      codeStates['api_repo_table162e4'] = api_repo_table162e4Props,
      codeStates['setapi_repo_table162e4'] = setapi_repo_table162e4Props,
      codeStates['api_repository'] = api_repositoryb1ab8,
      codeStates['setapi_repository'] = setapi_repositoryb1ab8,
      codeStates['api_repositoryb1ab8'] = api_repositoryb1ab8Props,
      codeStates['setapi_repositoryb1ab8'] = setapi_repositoryb1ab8Props,
      codeStates['group123'] = group1233a04c,
      codeStates['setgroup123'] = setgroup1233a04c,
      codeStates['group1233a04c'] = group1233a04cProps,
      codeStates['setgroup1233a04c'] = setgroup1233a04cProps,
      codeStates['group454'] = group4549ff98,
      codeStates['setgroup454'] = setgroup4549ff98,
      codeStates['group4549ff98'] = group4549ff98Props,
      codeStates['setgroup4549ff98'] = setgroup4549ff98Props,
      codeStates['group'] = group657d5,
      codeStates['setgroup'] = setgroup657d5,
      codeStates['group657d5'] = group657d5Props,
      codeStates['setgroup657d5'] = setgroup657d5Props,
      codeStates['group6576'] = group6576622ab,
      codeStates['setgroup6576'] = setgroup6576622ab,
      codeStates['group6576622ab'] = group6576622abProps,
      codeStates['setgroup6576622ab'] = setgroup6576622abProps,
      codeStates['group79679'] = group796798bff3,
      codeStates['setgroup79679'] = setgroup796798bff3,
      codeStates['group796798bff3'] = group796798bff3Props,
      codeStates['setgroup796798bff3'] = setgroup796798bff3Props,
      codeStates['selected']  = selected
      codeExecution(code,codeStates)
    }
    }catch(err){
      console.log(err)
    }
    try{
      if ("hasLogicCenter" in dfd_mongodb_maindashboard_dfd_v1Props && !dfd_mongodb_maindashboard_dfd_v1Props.hasLogicCenter) {
        let searchFilter: any = {};
        if (filterProps?.length) {
          searchFilter = filterProps;
        }
        const api_paginationData: any = await AxiosService.post('/UF/pagination',
          {
            key: dfd_mongodb_maindashboard_dfd_v1Props.dstKey,
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
        setactive_group31e18((pre: any) => ({
          ...pre,
          active_apis: api_paginationData.data.records?.length > 0
            ? api_paginationData.data.records[0]?.active_apis
            : "0"
        }))
      }
      else{
        if(filterFlag){
          setactive_group31e18((pre: any) => ({
            ...pre,
            active_apis: active_apisac162Props?.filteredData?.length > 0
              ? active_apisac162Props?.filteredData[0]?.active_apis
              : "0"
          }))
        }else if(Array.isArray(dfd_mongodb_maindashboard_dfd_v1Props) && dfd_mongodb_maindashboard_dfd_v1Props && !active_group31e18.active_apis){
          setactive_group31e18((pre:any)=>({...pre,active_apis:dfd_mongodb_maindashboard_dfd_v1Props[0]?.active_apis}))
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
  },[active_apisac162?.refresh])

  useEffect(() => {
    handleMapperDetails()
    if(Array.isArray(dfd_mongodb_maindashboard_dfd_v1Props)){
      setactive_group31e18((pre:any)=>({...pre,active_apis:dfd_mongodb_maindashboard_dfd_v1Props[0]?.active_apis}));
    }
  },[dfd_mongodb_maindashboard_dfd_v1Props])

  // setSearchFilters
  useEffect(() => {
    if (!active_apisac162Props?.filterProps) return;
    handleMapperDetails(active_apisac162Props?.filterProps,active_apisac162Props?.filterFlag);
  },[active_apisac162Props?.filterProps])


  const style = {
    
    display: 'flex',
   // boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (active_apisac162?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `7 / 25`,gridRow: `1 / 18`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      style={style}
      className="p-1 !text-xl !text-white font-bold"   
      theme="normal"
      view="clear"
      label={keyset("Active API")}
      disabled= {active_apisac162?.isDisabled ? true : false}
      onClick={handleClick} 
      contentAlign={"center"}
      >
      {active_group31e18?.active_apis?active_group31e18?.active_apis:"0"}
      </Card>
    </div>
  )
}

export default Cardactive_apis
