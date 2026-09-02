'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import Texttotal_used_api_text  from "./Texttotal_used_api_text";
import Textget_accounts_text  from "./Textget_accounts_text";
import Progressget_acc_progress  from "./Progressget_acc_progress";
import Textget_account_id_text  from "./Textget_account_id_text";
import Progressget_acc_id_progress  from "./Progressget_acc_id_progress";
import Textget_balance_text  from "./Textget_balance_text";
import Progressget_balance_progress  from "./Progressget_balance_progress";
import Progressget_direct_debits_progress  from "./Progressget_direct_debits_progress";
import Textget_direct_debits_text  from "./Textget_direct_debits_text";
import Textproducts_text  from "./Textproducts_text";
import Progressproduct_progress  from "./Progressproduct_progress";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptotal_used_api_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_mongo_linechart_dfd_v1Props, setdfd_mongo_linechart_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_consents_request_dfd_v1Props, setdfd_tob_consents_request_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_api_repository_dfd_v1Props, setdfd_mongo_api_repository_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongodb_maindashboard_dfd_v1Props, setdfd_mongodb_maindashboard_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tob_total_used_api_dfd_v1Props, setdfd_tob_total_used_api_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_mongo_totalcalls_dfd_v1Props, setdfd_mongo_totalcalls_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "total_used_api_text",
      "get_accounts_text",
      "get_acc_progress",
      "get_account_id_text",
      "get_acc_id_progress",
      "get_balance_text",
      "get_balance_progress",
      "get_direct_debits_progress",
      "get_direct_debits_text",
      "products_text",
      "product_progress"
    ],
    "allowedGroups": [
      "canvas",
      "vob_dashboard_screen",
      "api_usage_group",
      "req_group",
      "active_group",
      "total_api_calls_group",
      "most_group",
      "line_chart_group",
      "api_call_over_frequency_subscreen",
      "ct003_af_uf_ufws_trs_tob_apicalloverhour_v1",
      "api_call_over_hour_group",
      "ct003_af_uf_ufws_trs_tob_apicallovermonth_v1",
      "api_call_over_month_group",
      "ct003_af_uf_ufws_trs_tob_apicalloverweek_v1",
      "api_call_over_week_group",
      "total_used_api_group",
      "list_of_register_tpp_group",
      "connected_application",
      "api_repo_table",
      "api_repository",
      "group123",
      "group454",
      "group",
      "group6576",
      "group79679"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
  const {total_used_api_text0681a, settotal_used_api_text0681a}= useContext(TotalContext) as TotalContextProps;
  const {get_accounts_textded93, setget_accounts_textded93}= useContext(TotalContext) as TotalContextProps;
  const {get_acc_progressf3140, setget_acc_progressf3140}= useContext(TotalContext) as TotalContextProps;
  const {get_account_id_textcfcd9, setget_account_id_textcfcd9}= useContext(TotalContext) as TotalContextProps;
  const {get_acc_id_progress564cc, setget_acc_id_progress564cc}= useContext(TotalContext) as TotalContextProps;
  const {get_balance_textc22b2, setget_balance_textc22b2}= useContext(TotalContext) as TotalContextProps;
  const {get_balance_progressa0d54, setget_balance_progressa0d54}= useContext(TotalContext) as TotalContextProps;
  const {get_direct_debits_progress04032, setget_direct_debits_progress04032}= useContext(TotalContext) as TotalContextProps;
  const {get_direct_debits_text067ca, setget_direct_debits_text067ca}= useContext(TotalContext) as TotalContextProps;
  const {products_textc39eb, setproducts_textc39eb}= useContext(TotalContext) as TotalContextProps;
  const {product_progressee376, setproduct_progressee376}= useContext(TotalContext) as TotalContextProps;
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
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {apiusagedashboard_v1, setapiusagedashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:apiUsageDashboard:AFVK:v1',
    [user],
    'GroupTotalUsedApiGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d42ef98a96c5441a8eeb036107ccd37d");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    settotal_used_api_groupcd37dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("total_used_api_text")){
        settotal_used_api_text0681a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(total_used_api_text0681a?.isDisabled==null)
      {
        settotal_used_api_text0681a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_accounts_text")){
        setget_accounts_textded93((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_accounts_textded93?.isDisabled==null)
      {
        setget_accounts_textded93((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_acc_progress")){
        setget_acc_progressf3140((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_acc_progressf3140?.isDisabled==null)
      {
        setget_acc_progressf3140((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_account_id_text")){
        setget_account_id_textcfcd9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_account_id_textcfcd9?.isDisabled==null)
      {
        setget_account_id_textcfcd9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_acc_id_progress")){
        setget_acc_id_progress564cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_acc_id_progress564cc?.isDisabled==null)
      {
        setget_acc_id_progress564cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_balance_text")){
        setget_balance_textc22b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_balance_textc22b2?.isDisabled==null)
      {
        setget_balance_textc22b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_balance_progress")){
        setget_balance_progressa0d54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_balance_progressa0d54?.isDisabled==null)
      {
        setget_balance_progressa0d54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_direct_debits_progress")){
        setget_direct_debits_progress04032((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_direct_debits_progress04032?.isDisabled==null)
      {
        setget_direct_debits_progress04032((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("get_direct_debits_text")){
        setget_direct_debits_text067ca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(get_direct_debits_text067ca?.isDisabled==null)
      {
        setget_direct_debits_text067ca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("products_text")){
        setproducts_textc39eb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(products_textc39eb?.isDisabled==null)
      {
        setproducts_textc39eb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_progress")){
        setproduct_progressee376((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(product_progressee376?.isDisabled==null)
      {
        setproduct_progressee376((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
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
        codeStates['total_used_api_text'] = total_used_api_text0681a,
        codeStates['settotal_used_api_text'] = settotal_used_api_text0681a,
        codeStates['get_accounts_text'] = get_accounts_textded93,
        codeStates['setget_accounts_text'] = setget_accounts_textded93,
        codeStates['get_acc_progress'] = get_acc_progressf3140,
        codeStates['setget_acc_progress'] = setget_acc_progressf3140,
        codeStates['get_account_id_text'] = get_account_id_textcfcd9,
        codeStates['setget_account_id_text'] = setget_account_id_textcfcd9,
        codeStates['get_acc_id_progress'] = get_acc_id_progress564cc,
        codeStates['setget_acc_id_progress'] = setget_acc_id_progress564cc,
        codeStates['get_balance_text'] = get_balance_textc22b2,
        codeStates['setget_balance_text'] = setget_balance_textc22b2,
        codeStates['get_balance_progress'] = get_balance_progressa0d54,
        codeStates['setget_balance_progress'] = setget_balance_progressa0d54,
        codeStates['get_direct_debits_progress'] = get_direct_debits_progress04032,
        codeStates['setget_direct_debits_progress'] = setget_direct_debits_progress04032,
        codeStates['get_direct_debits_text'] = get_direct_debits_text067ca,
        codeStates['setget_direct_debits_text'] = setget_direct_debits_text067ca,
        codeStates['products_text'] = products_textc39eb,
        codeStates['setproducts_text'] = setproducts_textc39eb,
        codeStates['product_progress'] = product_progressee376,
        codeStates['setproduct_progress'] = setproduct_progressee376,
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

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d42ef98a96c5441a8eeb036107ccd37d");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
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
        codeStates['total_used_api_text'] = total_used_api_text0681a,
        codeStates['settotal_used_api_text'] = settotal_used_api_text0681a,
        codeStates['get_accounts_text'] = get_accounts_textded93,
        codeStates['setget_accounts_text'] = setget_accounts_textded93,
        codeStates['get_acc_progress'] = get_acc_progressf3140,
        codeStates['setget_acc_progress'] = setget_acc_progressf3140,
        codeStates['get_account_id_text'] = get_account_id_textcfcd9,
        codeStates['setget_account_id_text'] = setget_account_id_textcfcd9,
        codeStates['get_acc_id_progress'] = get_acc_id_progress564cc,
        codeStates['setget_acc_id_progress'] = setget_acc_id_progress564cc,
        codeStates['get_balance_text'] = get_balance_textc22b2,
        codeStates['setget_balance_text'] = setget_balance_textc22b2,
        codeStates['get_balance_progress'] = get_balance_progressa0d54,
        codeStates['setget_balance_progress'] = setget_balance_progressa0d54,
        codeStates['get_direct_debits_progress'] = get_direct_debits_progress04032,
        codeStates['setget_direct_debits_progress'] = setget_direct_debits_progress04032,
        codeStates['get_direct_debits_text'] = get_direct_debits_text067ca,
        codeStates['setget_direct_debits_text'] = setget_direct_debits_text067ca,
        codeStates['products_text'] = products_textc39eb,
        codeStates['setproducts_text'] = setproducts_textc39eb,
        codeStates['product_progress'] = product_progressee376,
        codeStates['setproduct_progress'] = setproduct_progressee376,
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const total_used_api_groupcd37dRef = useRef<any>(null);
  const handleClearSearch = () => {
    total_used_api_groupcd37dRef.current?.setSearchParams();
    total_used_api_groupcd37dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true
      handleOnload()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(total_used_api_groupcd37d) &&
        Object.keys(total_used_api_groupcd37d)?.length > 0
      ) {
        settotal_used_api_groupcd37d({})
      }
    } else prevRefreshRef.current = true
  }, [total_used_api_groupcd37dProps?.refresh])

  useEffect(() => {
    securityCheck()
  }, [token])

  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '10 / 16',
        gridRow: '37 / 101',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '2px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setapiusagedashboard_v1((pre:any)=>({...pre,_selectedGroup_:"total_used_api_group"}))
        }}
    >
          {allowedControls.includes("total_used_api_text") ?<Texttotal_used_api_text   /* 0681a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("get_accounts_text") ?<Textget_accounts_text   /* ded93 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("get_acc_progress")?<Progressget_acc_progress  /* f3140 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("get_account_id_text") ?<Textget_account_id_text   /* cfcd9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("get_acc_id_progress")?<Progressget_acc_id_progress  /* 564cc */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("get_balance_text") ?<Textget_balance_text   /* c22b2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("get_balance_progress")?<Progressget_balance_progress  /* a0d54 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("get_direct_debits_progress")?<Progressget_direct_debits_progress  /* 04032 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("get_direct_debits_text") ?<Textget_direct_debits_text   /* 067ca */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("products_text") ?<Textproducts_text   /* c39eb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("product_progress")?<Progressproduct_progress  /* ee376 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptotal_used_api_group
