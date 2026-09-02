'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonview_log = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
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
  const {apinamecccc2, setapinamecccc2}= useContext(TotalContext) as TotalContextProps;
  const {version33b3f, setversion33b3f}= useContext(TotalContext) as TotalContextProps;
  const {statuscd1e6, setstatuscd1e6}= useContext(TotalContext) as TotalContextProps;
  const {api_category0905e, setapi_category0905e}= useContext(TotalContext) as TotalContextProps;
  const {release_date1939f, setrelease_date1939f}= useContext(TotalContext) as TotalContextProps;
  const {view_log82d2f, setview_log82d2f}= useContext(TotalContext) as TotalContextProps;
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
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {viewapiinfo_v1Props, setviewapiinfo_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
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
      codeStates['apiname'] = apinamecccc2,
      codeStates['setapiname'] = setapinamecccc2,
      codeStates['version'] = version33b3f,
      codeStates['setversion'] = setversion33b3f,
      codeStates['status'] = statuscd1e6,
      codeStates['setstatus'] = setstatuscd1e6,
      codeStates['api_category'] = api_category0905e,
      codeStates['setapi_category'] = setapi_category0905e,
      codeStates['release_date'] = release_date1939f,
      codeStates['setrelease_date'] = setrelease_date1939f,
      codeStates['view_log'] = view_log82d2f,
      codeStates['setview_log'] = setview_log82d2f,
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
      codeStates['api_process_log_table'] = api_process_log_table5904e,
      codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
      codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
      codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
      codeStates['ob_group'] = ob_group76678,
      codeStates['setob_group'] = setob_group76678,
      codeStates['ob_group76678'] = ob_group76678Props,
      codeStates['setob_group76678'] = setob_group76678Props,
      codeStates['viewapiinfo_v1'] = viewapiinfo_v1Props,
      codeStates['setviewapiinfo_v1'] = setviewapiinfo_v1Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "82ecab6738f749949432f786075b1ab8",
        "746d2ff743b547f1b3bd0574e1682d2f"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view_log82d2f") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[view_log82d2f?.refresh])


  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //bindTran
    // For group or table
    setapi_process_log_table5904e(mainData||{})
    setapi_process_log_table5904eProps({...api_process_log_table5904eProps,presetValues:{...(mainData||{})}})
    // copyFormData
    // For group
    setob_group76678((pre:any)=>({...pre,...mainData}));
    setob_group76678Props({...ob_group76678Props,presetValues:mainData});
    // showArtifact
    let filterProps6: any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_TotalCalls_DFD:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "9d8e3276724947c2912f87ea49574067",
        "object": {
          "properties.apiname": "746ab2f3b9074ff497518233b4ccccc2"
        }
      }
    ]
  },
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:MongoDB_API_Process_Logs_DFD:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "7f2ec8b8c5214c2194a8f1e0a48dad16",
        "object": {
          "properties.tob_api_repositoryid": "746ab2f3b9074ff497518233b4ccccc2"
        }
      }
    ]
  },
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:Trs:AFGK:TOB:AFK:Mongo_Pie_Chart_DFD:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "feddb94d93ad4bcc831513bebfc6c1f4",
        "object": {
          "properties.apiname": "746ab2f3b9074ff497518233b4ccccc2"
        }
      }
    ]
  }
];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setviewapiinfo_v1Props([...filterData6 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1', 'viewapiinfo_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

 if (view_log82d2f?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1','apiusagedashboard','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='raised'
          disabled= {view_log82d2f?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Log")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_log

