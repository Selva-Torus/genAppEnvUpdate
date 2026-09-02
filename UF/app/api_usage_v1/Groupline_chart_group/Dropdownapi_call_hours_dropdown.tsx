

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdownapi_call_hours_dropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
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
  const {api_call_hours6d062, setapi_call_hours6d062}= useContext(TotalContext) as TotalContextProps;
  const {api_call_hours_dropdown14e0a, setapi_call_hours_dropdown14e0a}= useContext(TotalContext) as TotalContextProps;
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
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Hour',
    'Week',
    'Month',
  ];

  useEffect(() => {
  if(line_chart_groupadc5c?.api_call_hours_dropdown=="" || line_chart_groupadc5c?.api_call_hours_dropdown==undefined || line_chart_groupadc5c?.api_call_hours_dropdown==null ){
    setSelectedItem("");
  }
  },[line_chart_groupadc5c?.api_call_hours_dropdown])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "2150f24b9f8d42f4be5c49f18b9adc5c",
        "236586a005ca4e929456806d39714e0a"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
      if(orchestrationData?.data?.rule?.nodes?.length>0){
        setRuleCode(orchestrationData?.data?.rule)        
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[api_call_hours_dropdown14e0a?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      let staticValueProps : any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Hour",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Hour",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Week",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Week",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Month",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Month",
      "enabled": true
    }
  }
];
      for (let i = 0; i < staticValueProps.length; i++) {
        if(staticValueProps[i]?.value?.name === "value"){ 
          if(staticValueProps[i]?.value?.value === value){
            staticTextValue = staticValueProps[i].text.value;
          }
        }
      }
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setline_chart_groupadc5c((prev: any) => ({ ...prev, api_call_hours_dropdown: staticTextValue, api_call_hours_dropdown14e0a: value}))
         setIsRequredData(false)
    } else {
       setline_chart_groupadc5c((prev: any) => ({ ...prev, api_call_hours_dropdown: '', api_call_hours_dropdown14e0a: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,apiUsageDashboard_v1:{...pre?.apiUsageDashboard_v1,api_call_hours_dropdown:undefined}}));
   
    // static
    selected.current={
      api_call_hours_dropdown:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
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
        codeStates['api_call_hours'] = api_call_hours6d062,
        codeStates['setapi_call_hours'] = setapi_call_hours6d062,
        codeStates['api_call_hours_dropdown'] = api_call_hours_dropdown14e0a,
        codeStates['setapi_call_hours_dropdown'] = setapi_call_hours_dropdown14e0a,
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
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
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
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const line_chart_groupadc5cRef = useRef<any>(line_chart_groupadc5c);
  useEffect(() => { line_chart_groupadc5cRef.current = line_chart_groupadc5c; }, [line_chart_groupadc5c]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "236586a005ca4e929456806d39714e0a") {
        handleClick(line_chart_groupadc5cRef?.current?.api_call_hours_dropdown14e0a?line_chart_groupadc5cRef?.current?.api_call_hours_dropdown14e0a:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "236586a005ca4e929456806d39714e0a");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setline_chart_groupadc5c((pre:any)=>({...pre,api_call_hours_dropdown:""}))
    else
      setInitialCount(1)
    setline_chart_groupadc5c((pre:any)=>({...pre,api_call_hours_dropdown : items[0]}))
  },[api_call_hours_dropdown14e0a?.refresh])
  

  if (api_call_hours_dropdown14e0a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `1 / 9`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {api_call_hours_dropdown14e0a?.isDisabled ? true : false}
        contentAlign={"center"}
        value={
            line_chart_groupadc5c?.api_call_hours_dropdown14e0a ? [line_chart_groupadc5c?.api_call_hours_dropdown14e0a] :
                [items[0]]
            }
        onChange={handleClick} 
        validationState={validate?.apiUsageDashboard_v1?.api_call_hours_dropdown ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownapi_call_hours_dropdown;
