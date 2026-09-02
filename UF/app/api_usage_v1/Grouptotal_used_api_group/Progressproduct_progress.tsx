
'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { Progress } from '@/components/Progress';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Progressproduct_progress = ({encryptionFlagCompData, isDynamic, index, item,setIsProcessing,controlData}:any) => { 
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
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

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "d42ef98a96c5441a8eeb036107ccd37d",
        "c6df0fb3554347a6805459fd46cee376"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
    let temp:any=""
    handleCustomCode()
  }


  const handleCustomCode=async () => {
    let customCode:any=''
    let code :any = allCode;
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
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[product_progressee376?.refresh])

  if (product_progressee376?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `10 / 25`,gridRow: `54 / 62`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className=""
        theme = {'success'}
        value = {1}
    />
  </div>
  )
}

export default Progressproduct_progress
