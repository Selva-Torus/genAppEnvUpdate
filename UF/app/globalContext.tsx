


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  vob_dashboard_screen9ce49: any 
  setvob_dashboard_screen9ce49: React.Dispatch<React.SetStateAction<any>>
  vob_dashboard_screen9ce49Props: any 
  setvob_dashboard_screen9ce49Props: React.Dispatch<React.SetStateAction<any>>
  api_usage_group868b4: any 
  setapi_usage_group868b4: React.Dispatch<React.SetStateAction<any>>
  api_usage_group868b4Props: any 
  setapi_usage_group868b4Props: React.Dispatch<React.SetStateAction<any>>
  req_groupdf5e7: any 
  setreq_groupdf5e7: React.Dispatch<React.SetStateAction<any>>
  req_groupdf5e7Props: any 
  setreq_groupdf5e7Props: React.Dispatch<React.SetStateAction<any>>
  active_group31e18: any 
  setactive_group31e18: React.Dispatch<React.SetStateAction<any>>
  active_group31e18Props: any 
  setactive_group31e18Props: React.Dispatch<React.SetStateAction<any>>
  total_api_calls_groupd4dee: any 
  settotal_api_calls_groupd4dee: React.Dispatch<React.SetStateAction<any>>
  total_api_calls_groupd4deeProps: any 
  settotal_api_calls_groupd4deeProps: React.Dispatch<React.SetStateAction<any>>
  most_groupc5ce0: any 
  setmost_groupc5ce0: React.Dispatch<React.SetStateAction<any>>
  most_groupc5ce0Props: any 
  setmost_groupc5ce0Props: React.Dispatch<React.SetStateAction<any>>
  line_chart_groupadc5c: any 
  setline_chart_groupadc5c: React.Dispatch<React.SetStateAction<any>>
  line_chart_groupadc5cProps: any 
  setline_chart_groupadc5cProps: React.Dispatch<React.SetStateAction<any>>
  api_call_over_frequency_subscreenb8acc: any 
  setapi_call_over_frequency_subscreenb8acc: React.Dispatch<React.SetStateAction<any>>
  api_call_over_frequency_subscreenb8accProps: any 
  setapi_call_over_frequency_subscreenb8accProps: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026: any 
  setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props: any 
  setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props: React.Dispatch<React.SetStateAction<any>>
  api_call_over_hour_group2febf: any 
  setapi_call_over_hour_group2febf: React.Dispatch<React.SetStateAction<any>>
  api_call_over_hour_group2febfProps: any 
  setapi_call_over_hour_group2febfProps: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528: any 
  setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props: any 
  setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props: React.Dispatch<React.SetStateAction<any>>
  api_call_over_month_groupccb80: any 
  setapi_call_over_month_groupccb80: React.Dispatch<React.SetStateAction<any>>
  api_call_over_month_groupccb80Props: any 
  setapi_call_over_month_groupccb80Props: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6: any 
  setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6: React.Dispatch<React.SetStateAction<any>>
  ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props: any 
  setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props: React.Dispatch<React.SetStateAction<any>>
  api_call_over_week_group987fe: any 
  setapi_call_over_week_group987fe: React.Dispatch<React.SetStateAction<any>>
  api_call_over_week_group987feProps: any 
  setapi_call_over_week_group987feProps: React.Dispatch<React.SetStateAction<any>>
  total_used_api_groupcd37d: any 
  settotal_used_api_groupcd37d: React.Dispatch<React.SetStateAction<any>>
  total_used_api_groupcd37dProps: any 
  settotal_used_api_groupcd37dProps: React.Dispatch<React.SetStateAction<any>>
  list_of_register_tpp_groupbe9d5: any 
  setlist_of_register_tpp_groupbe9d5: React.Dispatch<React.SetStateAction<any>>
  list_of_register_tpp_groupbe9d5Props: any 
  setlist_of_register_tpp_groupbe9d5Props: React.Dispatch<React.SetStateAction<any>>
  connected_application19ab2: any 
  setconnected_application19ab2: React.Dispatch<React.SetStateAction<any>>
  connected_application19ab2Props: any 
  setconnected_application19ab2Props: React.Dispatch<React.SetStateAction<any>>
  api_repo_table162e4: any 
  setapi_repo_table162e4: React.Dispatch<React.SetStateAction<any>>
  api_repo_table162e4Props: any 
  setapi_repo_table162e4Props: React.Dispatch<React.SetStateAction<any>>
  api_repositoryb1ab8: any 
  setapi_repositoryb1ab8: React.Dispatch<React.SetStateAction<any>>
  api_repositoryb1ab8Props: any 
  setapi_repositoryb1ab8Props: React.Dispatch<React.SetStateAction<any>>
  group1233a04c: any 
  setgroup1233a04c: React.Dispatch<React.SetStateAction<any>>
  group1233a04cProps: any 
  setgroup1233a04cProps: React.Dispatch<React.SetStateAction<any>>
  group4549ff98: any 
  setgroup4549ff98: React.Dispatch<React.SetStateAction<any>>
  group4549ff98Props: any 
  setgroup4549ff98Props: React.Dispatch<React.SetStateAction<any>>
  group657d5: any 
  setgroup657d5: React.Dispatch<React.SetStateAction<any>>
  group657d5Props: any 
  setgroup657d5Props: React.Dispatch<React.SetStateAction<any>>
  group6576622ab: any 
  setgroup6576622ab: React.Dispatch<React.SetStateAction<any>>
  group6576622abProps: any 
  setgroup6576622abProps: React.Dispatch<React.SetStateAction<any>>
  group796798bff3: any 
  setgroup796798bff3: React.Dispatch<React.SetStateAction<any>>
  group796798bff3Props: any 
  setgroup796798bff3Props: React.Dispatch<React.SetStateAction<any>>
  vob_api_info_group5fc53: any 
  setvob_api_info_group5fc53: React.Dispatch<React.SetStateAction<any>>
  vob_api_info_group5fc53Props: any 
  setvob_api_info_group5fc53Props: React.Dispatch<React.SetStateAction<any>>
  group1f4ba: any 
  setgroup1f4ba: React.Dispatch<React.SetStateAction<any>>
  group1f4baProps: any 
  setgroup1f4baProps: React.Dispatch<React.SetStateAction<any>>
  api_info_group6ad41: any 
  setapi_info_group6ad41: React.Dispatch<React.SetStateAction<any>>
  api_info_group6ad41Props: any 
  setapi_info_group6ad41Props: React.Dispatch<React.SetStateAction<any>>
  total_calls_group76982: any 
  settotal_calls_group76982: React.Dispatch<React.SetStateAction<any>>
  total_calls_group76982Props: any 
  settotal_calls_group76982Props: React.Dispatch<React.SetStateAction<any>>
  success_rate_groupb6598: any 
  setsuccess_rate_groupb6598: React.Dispatch<React.SetStateAction<any>>
  success_rate_groupb6598Props: any 
  setsuccess_rate_groupb6598Props: React.Dispatch<React.SetStateAction<any>>
  error_rate_group773d1: any 
  seterror_rate_group773d1: React.Dispatch<React.SetStateAction<any>>
  error_rate_group773d1Props: any 
  seterror_rate_group773d1Props: React.Dispatch<React.SetStateAction<any>>
  ob_group76678: any 
  setob_group76678: React.Dispatch<React.SetStateAction<any>>
  ob_group76678Props: any 
  setob_group76678Props: React.Dispatch<React.SetStateAction<any>>
  api_process_log_group192b0: any 
  setapi_process_log_group192b0: React.Dispatch<React.SetStateAction<any>>
  api_process_log_group192b0Props: any 
  setapi_process_log_group192b0Props: React.Dispatch<React.SetStateAction<any>>
  api_process_log_table5904e: any 
  setapi_process_log_table5904e: React.Dispatch<React.SetStateAction<any>>
  api_process_log_table5904eProps: any 
  setapi_process_log_table5904eProps: React.Dispatch<React.SetStateAction<any>>
  consent_logs_group3070a: any 
  setconsent_logs_group3070a: React.Dispatch<React.SetStateAction<any>>
  consent_logs_group3070aProps: any 
  setconsent_logs_group3070aProps: React.Dispatch<React.SetStateAction<any>>
  consent_logs53635: any 
  setconsent_logs53635: React.Dispatch<React.SetStateAction<any>>
  consent_logs53635Props: any 
  setconsent_logs53635Props: React.Dispatch<React.SetStateAction<any>>
  monetization_groupf0a3b: any 
  setmonetization_groupf0a3b: React.Dispatch<React.SetStateAction<any>>
  monetization_groupf0a3bProps: any 
  setmonetization_groupf0a3bProps: React.Dispatch<React.SetStateAction<any>>
  dash_groupc162b: any 
  setdash_groupc162b: React.Dispatch<React.SetStateAction<any>>
  dash_groupc162bProps: any 
  setdash_groupc162bProps: React.Dispatch<React.SetStateAction<any>>
  monthly_revenue_card_group3bf72: any 
  setmonthly_revenue_card_group3bf72: React.Dispatch<React.SetStateAction<any>>
  monthly_revenue_card_group3bf72Props: any 
  setmonthly_revenue_card_group3bf72Props: React.Dispatch<React.SetStateAction<any>>
  ytd_revenue_card_groupbb98b: any 
  setytd_revenue_card_groupbb98b: React.Dispatch<React.SetStateAction<any>>
  ytd_revenue_card_groupbb98bProps: any 
  setytd_revenue_card_groupbb98bProps: React.Dispatch<React.SetStateAction<any>>
  invoice_raised_card_group23315: any 
  setinvoice_raised_card_group23315: React.Dispatch<React.SetStateAction<any>>
  invoice_raised_card_group23315Props: any 
  setinvoice_raised_card_group23315Props: React.Dispatch<React.SetStateAction<any>>
  avg_revenue_tpp_card_group56d8e: any 
  setavg_revenue_tpp_card_group56d8e: React.Dispatch<React.SetStateAction<any>>
  avg_revenue_tpp_card_group56d8eProps: any 
  setavg_revenue_tpp_card_group56d8eProps: React.Dispatch<React.SetStateAction<any>>
  revenue_trend_groupa654b: any 
  setrevenue_trend_groupa654b: React.Dispatch<React.SetStateAction<any>>
  revenue_trend_groupa654bProps: any 
  setrevenue_trend_groupa654bProps: React.Dispatch<React.SetStateAction<any>>
  piechart_groupce72b: any 
  setpiechart_groupce72b: React.Dispatch<React.SetStateAction<any>>
  piechart_groupce72bProps: any 
  setpiechart_groupce72bProps: React.Dispatch<React.SetStateAction<any>>
  billing_status_tableef735: any 
  setbilling_status_tableef735: React.Dispatch<React.SetStateAction<any>>
  billing_status_tableef735Props: any 
  setbilling_status_tableef735Props: React.Dispatch<React.SetStateAction<any>>
  overage_charges_group44542: any 
  setoverage_charges_group44542: React.Dispatch<React.SetStateAction<any>>
  overage_charges_group44542Props: any 
  setoverage_charges_group44542Props: React.Dispatch<React.SetStateAction<any>>
  tier_table17c1c: any 
  settier_table17c1c: React.Dispatch<React.SetStateAction<any>>
  tier_table17c1cProps: any 
  settier_table17c1cProps: React.Dispatch<React.SetStateAction<any>>
  api_usage_overviewecc9e: any,
  setapi_usage_overviewecc9e:React.Dispatch<React.SetStateAction<any>>
  api_usage_overviewecc9eProps: any 
  setapi_usage_overviewecc9eProps: React.Dispatch<React.SetStateAction<any>>
  total_requests06c5a: any,
  settotal_requests06c5a:React.Dispatch<React.SetStateAction<any>>
  total_requests06c5aProps: any 
  settotal_requests06c5aProps: React.Dispatch<React.SetStateAction<any>>
  tot_req_icon1fa8f: any,
  settot_req_icon1fa8f:React.Dispatch<React.SetStateAction<any>>
  tot_req_icon1fa8fProps: any 
  settot_req_icon1fa8fProps: React.Dispatch<React.SetStateAction<any>>
  active_apisac162: any,
  setactive_apisac162:React.Dispatch<React.SetStateAction<any>>
  active_apisac162Props: any 
  setactive_apisac162Props: React.Dispatch<React.SetStateAction<any>>
  active_icon42af9: any,
  setactive_icon42af9:React.Dispatch<React.SetStateAction<any>>
  active_icon42af9Props: any 
  setactive_icon42af9Props: React.Dispatch<React.SetStateAction<any>>
  most_used_apis2686b: any,
  setmost_used_apis2686b:React.Dispatch<React.SetStateAction<any>>
  most_used_apis2686bProps: any 
  setmost_used_apis2686bProps: React.Dispatch<React.SetStateAction<any>>
  most_used_api_icon6560d: any,
  setmost_used_api_icon6560d:React.Dispatch<React.SetStateAction<any>>
  most_used_api_icon6560dProps: any 
  setmost_used_api_icon6560dProps: React.Dispatch<React.SetStateAction<any>>
  error_rate72497: any,
  seterror_rate72497:React.Dispatch<React.SetStateAction<any>>
  error_rate72497Props: any 
  seterror_rate72497Props: React.Dispatch<React.SetStateAction<any>>
  error_rate_icon89a9a: any,
  seterror_rate_icon89a9a:React.Dispatch<React.SetStateAction<any>>
  error_rate_icon89a9aProps: any 
  seterror_rate_icon89a9aProps: React.Dispatch<React.SetStateAction<any>>
  api_call_hours6d062: any,
  setapi_call_hours6d062:React.Dispatch<React.SetStateAction<any>>
  api_call_hours6d062Props: any 
  setapi_call_hours6d062Props: React.Dispatch<React.SetStateAction<any>>
  api_call_hours_dropdown14e0a: any,
  setapi_call_hours_dropdown14e0a:React.Dispatch<React.SetStateAction<any>>
  api_call_hours_dropdown14e0aProps: any 
  setapi_call_hours_dropdown14e0aProps: React.Dispatch<React.SetStateAction<any>>
  api_call_over_hour_linechart01342: any,
  setapi_call_over_hour_linechart01342:React.Dispatch<React.SetStateAction<any>>
  api_call_over_hour_linechart01342Props: any 
  setapi_call_over_hour_linechart01342Props: React.Dispatch<React.SetStateAction<any>>
  api_call_over_month_linecharte59b1: any,
  setapi_call_over_month_linecharte59b1:React.Dispatch<React.SetStateAction<any>>
  api_call_over_month_linecharte59b1Props: any 
  setapi_call_over_month_linecharte59b1Props: React.Dispatch<React.SetStateAction<any>>
  week_linechart22a2f: any,
  setweek_linechart22a2f:React.Dispatch<React.SetStateAction<any>>
  week_linechart22a2fProps: any 
  setweek_linechart22a2fProps: React.Dispatch<React.SetStateAction<any>>
  total_used_api_text0681a: any,
  settotal_used_api_text0681a:React.Dispatch<React.SetStateAction<any>>
  total_used_api_text0681aProps: any 
  settotal_used_api_text0681aProps: React.Dispatch<React.SetStateAction<any>>
  get_accounts_textded93: any,
  setget_accounts_textded93:React.Dispatch<React.SetStateAction<any>>
  get_accounts_textded93Props: any 
  setget_accounts_textded93Props: React.Dispatch<React.SetStateAction<any>>
  get_acc_progressf3140: any,
  setget_acc_progressf3140:React.Dispatch<React.SetStateAction<any>>
  get_acc_progressf3140Props: any 
  setget_acc_progressf3140Props: React.Dispatch<React.SetStateAction<any>>
  get_account_id_textcfcd9: any,
  setget_account_id_textcfcd9:React.Dispatch<React.SetStateAction<any>>
  get_account_id_textcfcd9Props: any 
  setget_account_id_textcfcd9Props: React.Dispatch<React.SetStateAction<any>>
  get_acc_id_progress564cc: any,
  setget_acc_id_progress564cc:React.Dispatch<React.SetStateAction<any>>
  get_acc_id_progress564ccProps: any 
  setget_acc_id_progress564ccProps: React.Dispatch<React.SetStateAction<any>>
  get_balance_textc22b2: any,
  setget_balance_textc22b2:React.Dispatch<React.SetStateAction<any>>
  get_balance_textc22b2Props: any 
  setget_balance_textc22b2Props: React.Dispatch<React.SetStateAction<any>>
  get_balance_progressa0d54: any,
  setget_balance_progressa0d54:React.Dispatch<React.SetStateAction<any>>
  get_balance_progressa0d54Props: any 
  setget_balance_progressa0d54Props: React.Dispatch<React.SetStateAction<any>>
  get_direct_debits_progress04032: any,
  setget_direct_debits_progress04032:React.Dispatch<React.SetStateAction<any>>
  get_direct_debits_progress04032Props: any 
  setget_direct_debits_progress04032Props: React.Dispatch<React.SetStateAction<any>>
  get_direct_debits_text067ca: any,
  setget_direct_debits_text067ca:React.Dispatch<React.SetStateAction<any>>
  get_direct_debits_text067caProps: any 
  setget_direct_debits_text067caProps: React.Dispatch<React.SetStateAction<any>>
  products_textc39eb: any,
  setproducts_textc39eb:React.Dispatch<React.SetStateAction<any>>
  products_textc39ebProps: any 
  setproducts_textc39ebProps: React.Dispatch<React.SetStateAction<any>>
  product_progressee376: any,
  setproduct_progressee376:React.Dispatch<React.SetStateAction<any>>
  product_progressee376Props: any 
  setproduct_progressee376Props: React.Dispatch<React.SetStateAction<any>>
  app_namedc4c5: any,
  setapp_namedc4c5:React.Dispatch<React.SetStateAction<any>>
  app_namedc4c5Props: any 
  setapp_namedc4c5Props: React.Dispatch<React.SetStateAction<any>>
  tppname5b032: any,
  settppname5b032:React.Dispatch<React.SetStateAction<any>>
  tppname5b032Props: any 
  settppname5b032Props: React.Dispatch<React.SetStateAction<any>>
  typed4eac: any,
  settyped4eac:React.Dispatch<React.SetStateAction<any>>
  typed4eacProps: any 
  settyped4eacProps: React.Dispatch<React.SetStateAction<any>>
  status_value3beb3: any,
  setstatus_value3beb3:React.Dispatch<React.SetStateAction<any>>
  status_value3beb3Props: any 
  setstatus_value3beb3Props: React.Dispatch<React.SetStateAction<any>>
  apinamecccc2: any,
  setapinamecccc2:React.Dispatch<React.SetStateAction<any>>
  apinamecccc2Props: any 
  setapinamecccc2Props: React.Dispatch<React.SetStateAction<any>>
  version33b3f: any,
  setversion33b3f:React.Dispatch<React.SetStateAction<any>>
  version33b3fProps: any 
  setversion33b3fProps: React.Dispatch<React.SetStateAction<any>>
  statuscd1e6: any,
  setstatuscd1e6:React.Dispatch<React.SetStateAction<any>>
  statuscd1e6Props: any 
  setstatuscd1e6Props: React.Dispatch<React.SetStateAction<any>>
  api_category0905e: any,
  setapi_category0905e:React.Dispatch<React.SetStateAction<any>>
  api_category0905eProps: any 
  setapi_category0905eProps: React.Dispatch<React.SetStateAction<any>>
  release_date1939f: any,
  setrelease_date1939f:React.Dispatch<React.SetStateAction<any>>
  release_date1939fProps: any 
  setrelease_date1939fProps: React.Dispatch<React.SetStateAction<any>>
  view_log82d2f: any,
  setview_log82d2f:React.Dispatch<React.SetStateAction<any>>
  view_log82d2fProps: any 
  setview_log82d2fProps: React.Dispatch<React.SetStateAction<any>>
  consent_lifecycles11691: any,
  setconsent_lifecycles11691:React.Dispatch<React.SetStateAction<any>>
  consent_lifecycles11691Props: any 
  setconsent_lifecycles11691Props: React.Dispatch<React.SetStateAction<any>>
  icon56454d73c: any,
  seticon56454d73c:React.Dispatch<React.SetStateAction<any>>
  icon56454d73cProps: any 
  seticon56454d73cProps: React.Dispatch<React.SetStateAction<any>>
  text45645c95a7: any,
  settext45645c95a7:React.Dispatch<React.SetStateAction<any>>
  text45645c95a7Props: any 
  settext45645c95a7Props: React.Dispatch<React.SetStateAction<any>>
  text23523e7140: any,
  settext23523e7140:React.Dispatch<React.SetStateAction<any>>
  text23523e7140Props: any 
  settext23523e7140Props: React.Dispatch<React.SetStateAction<any>>
  icon5675ee8ba: any,
  seticon5675ee8ba:React.Dispatch<React.SetStateAction<any>>
  icon5675ee8baProps: any 
  seticon5675ee8baProps: React.Dispatch<React.SetStateAction<any>>
  text454513feb: any,
  settext454513feb:React.Dispatch<React.SetStateAction<any>>
  text454513febProps: any 
  settext454513febProps: React.Dispatch<React.SetStateAction<any>>
  text4564580602: any,
  settext4564580602:React.Dispatch<React.SetStateAction<any>>
  text4564580602Props: any 
  settext4564580602Props: React.Dispatch<React.SetStateAction<any>>
  icon234234e2c9a: any,
  seticon234234e2c9a:React.Dispatch<React.SetStateAction<any>>
  icon234234e2c9aProps: any 
  seticon234234e2c9aProps: React.Dispatch<React.SetStateAction<any>>
  textwrwer0e4e1: any,
  settextwrwer0e4e1:React.Dispatch<React.SetStateAction<any>>
  textwrwer0e4e1Props: any 
  settextwrwer0e4e1Props: React.Dispatch<React.SetStateAction<any>>
  textwerweraf6e8: any,
  settextwerweraf6e8:React.Dispatch<React.SetStateAction<any>>
  textwerweraf6e8Props: any 
  settextwerweraf6e8Props: React.Dispatch<React.SetStateAction<any>>
  icon86986b1a3: any,
  seticon86986b1a3:React.Dispatch<React.SetStateAction<any>>
  icon86986b1a3Props: any 
  seticon86986b1a3Props: React.Dispatch<React.SetStateAction<any>>
  text3457254757f70: any,
  settext3457254757f70:React.Dispatch<React.SetStateAction<any>>
  text3457254757f70Props: any 
  settext3457254757f70Props: React.Dispatch<React.SetStateAction<any>>
  text2668f: any,
  settext2668f:React.Dispatch<React.SetStateAction<any>>
  text2668fProps: any 
  settext2668fProps: React.Dispatch<React.SetStateAction<any>>
  back_button9eaea: any,
  setback_button9eaea:React.Dispatch<React.SetStateAction<any>>
  back_button9eaeaProps: any 
  setback_button9eaeaProps: React.Dispatch<React.SetStateAction<any>>
  global_bank_text5cc81: any,
  setglobal_bank_text5cc81:React.Dispatch<React.SetStateAction<any>>
  global_bank_text5cc81Props: any 
  setglobal_bank_text5cc81Props: React.Dispatch<React.SetStateAction<any>>
  total_calls_cardce82b: any,
  settotal_calls_cardce82b:React.Dispatch<React.SetStateAction<any>>
  total_calls_cardce82bProps: any 
  settotal_calls_cardce82bProps: React.Dispatch<React.SetStateAction<any>>
  success_rate_card0eba7: any,
  setsuccess_rate_card0eba7:React.Dispatch<React.SetStateAction<any>>
  success_rate_card0eba7Props: any 
  setsuccess_rate_card0eba7Props: React.Dispatch<React.SetStateAction<any>>
  error_rate_card9f823: any,
  seterror_rate_card9f823:React.Dispatch<React.SetStateAction<any>>
  error_rate_card9f823Props: any 
  seterror_rate_card9f823Props: React.Dispatch<React.SetStateAction<any>>
  api_info_text692fd: any,
  setapi_info_text692fd:React.Dispatch<React.SetStateAction<any>>
  api_info_text692fdProps: any 
  setapi_info_text692fdProps: React.Dispatch<React.SetStateAction<any>>
  api_name_textaccc0: any,
  setapi_name_textaccc0:React.Dispatch<React.SetStateAction<any>>
  api_name_textaccc0Props: any 
  setapi_name_textaccc0Props: React.Dispatch<React.SetStateAction<any>>
  api_name_textinput4e4bf: any,
  setapi_name_textinput4e4bf:React.Dispatch<React.SetStateAction<any>>
  api_name_textinput4e4bfProps: any 
  setapi_name_textinput4e4bfProps: React.Dispatch<React.SetStateAction<any>>
  version_text67538: any,
  setversion_text67538:React.Dispatch<React.SetStateAction<any>>
  version_text67538Props: any 
  setversion_text67538Props: React.Dispatch<React.SetStateAction<any>>
  version_textinput19065: any,
  setversion_textinput19065:React.Dispatch<React.SetStateAction<any>>
  version_textinput19065Props: any 
  setversion_textinput19065Props: React.Dispatch<React.SetStateAction<any>>
  status_text66555: any,
  setstatus_text66555:React.Dispatch<React.SetStateAction<any>>
  status_text66555Props: any 
  setstatus_text66555Props: React.Dispatch<React.SetStateAction<any>>
  status_textinput62886: any,
  setstatus_textinput62886:React.Dispatch<React.SetStateAction<any>>
  status_textinput62886Props: any 
  setstatus_textinput62886Props: React.Dispatch<React.SetStateAction<any>>
  categiry_text7520b: any,
  setcategiry_text7520b:React.Dispatch<React.SetStateAction<any>>
  categiry_text7520bProps: any 
  setcategiry_text7520bProps: React.Dispatch<React.SetStateAction<any>>
  category_textinpute77d9: any,
  setcategory_textinpute77d9:React.Dispatch<React.SetStateAction<any>>
  category_textinpute77d9Props: any 
  setcategory_textinpute77d9Props: React.Dispatch<React.SetStateAction<any>>
  date_text44a5e: any,
  setdate_text44a5e:React.Dispatch<React.SetStateAction<any>>
  date_text44a5eProps: any 
  setdate_text44a5eProps: React.Dispatch<React.SetStateAction<any>>
  date_textinputb262e: any,
  setdate_textinputb262e:React.Dispatch<React.SetStateAction<any>>
  date_textinputb262eProps: any 
  setdate_textinputb262eProps: React.Dispatch<React.SetStateAction<any>>
  path_textaf97a: any,
  setpath_textaf97a:React.Dispatch<React.SetStateAction<any>>
  path_textaf97aProps: any 
  setpath_textaf97aProps: React.Dispatch<React.SetStateAction<any>>
  path_textinputec3d3: any,
  setpath_textinputec3d3:React.Dispatch<React.SetStateAction<any>>
  path_textinputec3d3Props: any 
  setpath_textinputec3d3Props: React.Dispatch<React.SetStateAction<any>>
  rate_piechartbb394: any,
  setrate_piechartbb394:React.Dispatch<React.SetStateAction<any>>
  rate_piechartbb394Props: any 
  setrate_piechartbb394Props: React.Dispatch<React.SetStateAction<any>>
  api_process_log_texte6f38: any,
  setapi_process_log_texte6f38:React.Dispatch<React.SetStateAction<any>>
  api_process_log_texte6f38Props: any 
  setapi_process_log_texte6f38Props: React.Dispatch<React.SetStateAction<any>>
  timestampc53f0: any,
  settimestampc53f0:React.Dispatch<React.SetStateAction<any>>
  timestampc53f0Props: any 
  settimestampc53f0Props: React.Dispatch<React.SetStateAction<any>>
  requestc5c44: any,
  setrequestc5c44:React.Dispatch<React.SetStateAction<any>>
  requestc5c44Props: any 
  setrequestc5c44Props: React.Dispatch<React.SetStateAction<any>>
  response5db6d: any,
  setresponse5db6d:React.Dispatch<React.SetStateAction<any>>
  response5db6dProps: any 
  setresponse5db6dProps: React.Dispatch<React.SetStateAction<any>>
  tob_consent_requestid32916: any,
  settob_consent_requestid32916:React.Dispatch<React.SetStateAction<any>>
  tob_consent_requestid32916Props: any 
  settob_consent_requestid32916Props: React.Dispatch<React.SetStateAction<any>>
  view_logs8b253: any,
  setview_logs8b253:React.Dispatch<React.SetStateAction<any>>
  view_logs8b253Props: any 
  setview_logs8b253Props: React.Dispatch<React.SetStateAction<any>>
  textfe486: any,
  settextfe486:React.Dispatch<React.SetStateAction<any>>
  textfe486Props: any 
  settextfe486Props: React.Dispatch<React.SetStateAction<any>>
  request_consent_baseconsentid4221e: any,
  setrequest_consent_baseconsentid4221e:React.Dispatch<React.SetStateAction<any>>
  request_consent_baseconsentid4221eProps: any 
  setrequest_consent_baseconsentid4221eProps: React.Dispatch<React.SetStateAction<any>>
  interactionid5cd91: any,
  setinteractionid5cd91:React.Dispatch<React.SetStateAction<any>>
  interactionid5cd91Props: any 
  setinteractionid5cd91Props: React.Dispatch<React.SetStateAction<any>>
  request_consent_permissions1448d: any,
  setrequest_consent_permissions1448d:React.Dispatch<React.SetStateAction<any>>
  request_consent_permissions1448dProps: any 
  setrequest_consent_permissions1448dProps: React.Dispatch<React.SetStateAction<any>>
  consentbody_data_revokedby6ede9: any,
  setconsentbody_data_revokedby6ede9:React.Dispatch<React.SetStateAction<any>>
  consentbody_data_revokedby6ede9Props: any 
  setconsentbody_data_revokedby6ede9Props: React.Dispatch<React.SetStateAction<any>>
  request_consent_expiratriondatetime3ba51: any,
  setrequest_consent_expiratriondatetime3ba51:React.Dispatch<React.SetStateAction<any>>
  request_consent_expiratriondatetime3ba51Props: any 
  setrequest_consent_expiratriondatetime3ba51Props: React.Dispatch<React.SetStateAction<any>>
  status61386: any,
  setstatus61386:React.Dispatch<React.SetStateAction<any>>
  status61386Props: any 
  setstatus61386Props: React.Dispatch<React.SetStateAction<any>>
  dash_text814be: any,
  setdash_text814be:React.Dispatch<React.SetStateAction<any>>
  dash_text814beProps: any 
  setdash_text814beProps: React.Dispatch<React.SetStateAction<any>>
  monthly_revenue_card0ab73: any,
  setmonthly_revenue_card0ab73:React.Dispatch<React.SetStateAction<any>>
  monthly_revenue_card0ab73Props: any 
  setmonthly_revenue_card0ab73Props: React.Dispatch<React.SetStateAction<any>>
  monthly_icone201a: any,
  setmonthly_icone201a:React.Dispatch<React.SetStateAction<any>>
  monthly_icone201aProps: any 
  setmonthly_icone201aProps: React.Dispatch<React.SetStateAction<any>>
  ytd_revenue_card19ac3: any,
  setytd_revenue_card19ac3:React.Dispatch<React.SetStateAction<any>>
  ytd_revenue_card19ac3Props: any 
  setytd_revenue_card19ac3Props: React.Dispatch<React.SetStateAction<any>>
  ytd_icon346d8: any,
  setytd_icon346d8:React.Dispatch<React.SetStateAction<any>>
  ytd_icon346d8Props: any 
  setytd_icon346d8Props: React.Dispatch<React.SetStateAction<any>>
  invoice_raised_card87b51: any,
  setinvoice_raised_card87b51:React.Dispatch<React.SetStateAction<any>>
  invoice_raised_card87b51Props: any 
  setinvoice_raised_card87b51Props: React.Dispatch<React.SetStateAction<any>>
  invoice_icon43350: any,
  setinvoice_icon43350:React.Dispatch<React.SetStateAction<any>>
  invoice_icon43350Props: any 
  setinvoice_icon43350Props: React.Dispatch<React.SetStateAction<any>>
  avg_revenue_tpp_card6eb26: any,
  setavg_revenue_tpp_card6eb26:React.Dispatch<React.SetStateAction<any>>
  avg_revenue_tpp_card6eb26Props: any 
  setavg_revenue_tpp_card6eb26Props: React.Dispatch<React.SetStateAction<any>>
  tpp_icon1dafd: any,
  settpp_icon1dafd:React.Dispatch<React.SetStateAction<any>>
  tpp_icon1dafdProps: any 
  settpp_icon1dafdProps: React.Dispatch<React.SetStateAction<any>>
  trend_text1634c: any,
  settrend_text1634c:React.Dispatch<React.SetStateAction<any>>
  trend_text1634cProps: any 
  settrend_text1634cProps: React.Dispatch<React.SetStateAction<any>>
  group_barchart5116c: any,
  setgroup_barchart5116c:React.Dispatch<React.SetStateAction<any>>
  group_barchart5116cProps: any 
  setgroup_barchart5116cProps: React.Dispatch<React.SetStateAction<any>>
  api_text0685a: any,
  setapi_text0685a:React.Dispatch<React.SetStateAction<any>>
  api_text0685aProps: any 
  setapi_text0685aProps: React.Dispatch<React.SetStateAction<any>>
  piechart04991: any,
  setpiechart04991:React.Dispatch<React.SetStateAction<any>>
  piechart04991Props: any 
  setpiechart04991Props: React.Dispatch<React.SetStateAction<any>>
  tpp_column0b7bb: any,
  settpp_column0b7bb:React.Dispatch<React.SetStateAction<any>>
  tpp_column0b7bbProps: any 
  settpp_column0b7bbProps: React.Dispatch<React.SetStateAction<any>>
  amount_columnb4219: any,
  setamount_columnb4219:React.Dispatch<React.SetStateAction<any>>
  amount_columnb4219Props: any 
  setamount_columnb4219Props: React.Dispatch<React.SetStateAction<any>>
  duedate_columne7d57: any,
  setduedate_columne7d57:React.Dispatch<React.SetStateAction<any>>
  duedate_columne7d57Props: any 
  setduedate_columne7d57Props: React.Dispatch<React.SetStateAction<any>>
  status_columnc8f4d: any,
  setstatus_columnc8f4d:React.Dispatch<React.SetStateAction<any>>
  status_columnc8f4dProps: any 
  setstatus_columnc8f4dProps: React.Dispatch<React.SetStateAction<any>>
  overage_textf2644: any,
  setoverage_textf2644:React.Dispatch<React.SetStateAction<any>>
  overage_textf2644Props: any 
  setoverage_textf2644Props: React.Dispatch<React.SetStateAction<any>>
  single_barchart0a200: any,
  setsingle_barchart0a200:React.Dispatch<React.SetStateAction<any>>
  single_barchart0a200Props: any 
  setsingle_barchart0a200Props: React.Dispatch<React.SetStateAction<any>>
  pricing_id_column2bf94: any,
  setpricing_id_column2bf94:React.Dispatch<React.SetStateAction<any>>
  pricing_id_column2bf94Props: any 
  setpricing_id_column2bf94Props: React.Dispatch<React.SetStateAction<any>>
  monthly_fee_column42a75: any,
  setmonthly_fee_column42a75:React.Dispatch<React.SetStateAction<any>>
  monthly_fee_column42a75Props: any 
  setmonthly_fee_column42a75Props: React.Dispatch<React.SetStateAction<any>>
  overage_rate_column50e70: any,
  setoverage_rate_column50e70:React.Dispatch<React.SetStateAction<any>>
  overage_rate_column50e70Props: any 
  setoverage_rate_column50e70Props: React.Dispatch<React.SetStateAction<any>>
  tpps_column84964: any,
  settpps_column84964:React.Dispatch<React.SetStateAction<any>>
  tpps_column84964Props: any 
  settpps_column84964Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  apiusagedashboard_v1: any 
  setapiusagedashboard_v1: React.Dispatch<React.SetStateAction<any>>
  apiusagedashboard_v1Props: any 
  setapiusagedashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewapiinfo_v1: any 
  setviewapiinfo_v1: React.Dispatch<React.SetStateAction<any>>
  viewapiinfo_v1Props: any 
  setviewapiinfo_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewapiconsentlog_v1: any 
  setviewapiconsentlog_v1: React.Dispatch<React.SetStateAction<any>>
  viewapiconsentlog_v1Props: any 
  setviewapiconsentlog_v1Props: React.Dispatch<React.SetStateAction<any>>
  monetizationdashboard_v1: any 
  setmonetizationdashboard_v1: React.Dispatch<React.SetStateAction<any>>
  monetizationdashboard_v1Props: any 
  setmonetizationdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_tob_consent_request_ca_dfd_v1Props: any 
  setdfd_tob_consent_request_ca_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongo_totalcalls_dfd_v1Props: any 
  setdfd_mongo_totalcalls_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongo_api_repository_dfd_v1Props: any 
  setdfd_mongo_api_repository_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongodb_api_process_logs_dfd_v1Props: any 
  setdfd_mongodb_api_process_logs_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongo_pie_chart_dfd_v1Props: any 
  setdfd_mongo_pie_chart_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongo_linechart_dfd_v1Props: any 
  setdfd_mongo_linechart_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_consents_request_dfd_v1Props: any 
  setdfd_tob_consents_request_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_mongodb_maindashboard_dfd_v1Props: any 
  setdfd_mongodb_maindashboard_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_total_used_api_dfd_v1Props: any 
  setdfd_tob_total_used_api_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_totalcards_dfd_v1Props: any 
  setdfd_tob_mzdsh_totalcards_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_group_barchart_dfd_v1Props: any 
  setdfd_tob_mzdsh_group_barchart_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_piechart_dfd_v1Props: any 
  setdfd_tob_mzdsh_piechart_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props: any 
  setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_pricingtiertable_dfd_v1Props: any 
  setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tob_mzdsh_invoice_table_dfd_v1Props: any 
  setdfd_tob_mzdsh_invoice_table_dfd_v1Props: React.Dispatch<React.SetStateAction<any>>

  refetch: any,
  setRefetch: React.Dispatch<React.SetStateAction<any>>
  searchParam: string,
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
  disableParam: Record<string, boolean>,
  setDisableParam: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  globalState: Record<string, any>,
  setGlobalState: React.Dispatch<React.SetStateAction<Record<string, any>>>
  // for all textInput validation
  validate: Record<string, any>,
  setValidate: React.Dispatch<React.SetStateAction<Record<string, any>>>

  //its used for validate once again on button click
  validateRefetch: { value: boolean; init: number },
  setValidateRefetch: React.Dispatch<React.SetStateAction<{ value: boolean; init: number }>>
  accessProfile:any,
  setAccessProfile: React.Dispatch<React.SetStateAction<any>>
  memoryVariables: Record<string, string>
  setMemoryVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>
  property: Record<string, any>
  setProperty: React.Dispatch<React.SetStateAction<Record<string, any>>>
  refresh: Record<string, boolean>,
  setRefresh: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  lockedData: Record<string, any>,
  setLockedData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  tableData: Record<string, any>,
  setTableData: React.Dispatch<React.SetStateAction<Record<string, any>>>    
  paginationDetails: Record<string, any>,
  setpaginationDetails: React.Dispatch<React.SetStateAction<Record<string, any>>>
  eventEmitterData: any,
  setEventEmitterData: React.Dispatch<React.SetStateAction<any>>
  userDetails: Record<string, any>,
  setUserDetails: React.Dispatch<React.SetStateAction<Record<string, any>>>
  encAppFalg: Record<string, any>,
  setEncAppFalg: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const TotalContext = React.createContext<TotalContextProps | {}>({})

const GlobalContext = ({children} : {children: React.ReactNode}) => {
    const [currentToken, setCurrentToken ] = React.useState<any>({})
    const [matchedAccessProfileData, setMatchedAccessProfileData] = React.useState<any>({})
    const pathname = usePathname()
      //////////
        const [vob_dashboard_screen9ce49, setvob_dashboard_screen9ce49 ] = React.useState<any>({}) 
    const [vob_dashboard_screen9ce49Props, setvob_dashboard_screen9ce49Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [api_usage_group868b4, setapi_usage_group868b4 ] = React.useState<any>({}) 
    const [api_usage_group868b4Props, setapi_usage_group868b4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_usage_overview",
      ]
      }) 
        const [req_groupdf5e7, setreq_groupdf5e7 ] = React.useState<any>({}) 
    const [req_groupdf5e7Props, setreq_groupdf5e7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_requests",
            "tot_req_icon",
      ]
      }) 
        const [active_group31e18, setactive_group31e18 ] = React.useState<any>({}) 
    const [active_group31e18Props, setactive_group31e18Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "active_apis",
            "active_icon",
      ]
      }) 
        const [total_api_calls_groupd4dee, settotal_api_calls_groupd4dee ] = React.useState<any>({}) 
    const [total_api_calls_groupd4deeProps, settotal_api_calls_groupd4deeProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "most_used_apis",
            "most_used_api_icon",
      ]
      }) 
        const [most_groupc5ce0, setmost_groupc5ce0 ] = React.useState<any>({}) 
    const [most_groupc5ce0Props, setmost_groupc5ce0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "error",
            "error_rate_icon",
      ]
      }) 
        const [line_chart_groupadc5c, setline_chart_groupadc5c ] = React.useState<any>({}) 
    const [line_chart_groupadc5cProps, setline_chart_groupadc5cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_call_hours",
            "api_call_hours_dropdown",
      ]
      }) 
        const [api_call_over_frequency_subscreenb8acc, setapi_call_over_frequency_subscreenb8acc ] = React.useState<any>({}) 
    const [api_call_over_frequency_subscreenb8accProps, setapi_call_over_frequency_subscreenb8accProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026 ] = React.useState<any>({}) 
    const [ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props, setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [api_call_over_hour_group2febf, setapi_call_over_hour_group2febf ] = React.useState<any>({}) 
    const [api_call_over_hour_group2febfProps, setapi_call_over_hour_group2febfProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        const [ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528 ] = React.useState<any>({}) 
    const [ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props, setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [api_call_over_month_groupccb80, setapi_call_over_month_groupccb80 ] = React.useState<any>({}) 
    const [api_call_over_month_groupccb80Props, setapi_call_over_month_groupccb80Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        const [ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6 ] = React.useState<any>({}) 
    const [ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props, setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [api_call_over_week_group987fe, setapi_call_over_week_group987fe ] = React.useState<any>({}) 
    const [api_call_over_week_group987feProps, setapi_call_over_week_group987feProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        const [total_used_api_groupcd37d, settotal_used_api_groupcd37d ] = React.useState<any>({}) 
    const [total_used_api_groupcd37dProps, settotal_used_api_groupcd37dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_used_api_text",
            "get_accounts_text",
            "percentage1",
            "get_account_id_text",
            "percentage3",
            "get_balance_text",
            "percentage2",
            "percentage4",
            "get_direct_debits_text",
            "products_text",
            "product_progress",
      ]
      }) 
        const [list_of_register_tpp_groupbe9d5, setlist_of_register_tpp_groupbe9d5 ] = React.useState<any>({}) 
    const [list_of_register_tpp_groupbe9d5Props, setlist_of_register_tpp_groupbe9d5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [connected_application19ab2, setconnected_application19ab2 ] = React.useState<any>([]) 
    const [connected_application19ab2Props, setconnected_application19ab2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
        const [api_repo_table162e4, setapi_repo_table162e4 ] = React.useState<any>({}) 
    const [api_repo_table162e4Props, setapi_repo_table162e4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [api_repositoryb1ab8, setapi_repositoryb1ab8 ] = React.useState<any>([]) 
    const [api_repositoryb1ab8Props, setapi_repositoryb1ab8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
        const [group1233a04c, setgroup1233a04c ] = React.useState<any>({}) 
    const [group1233a04cProps, setgroup1233a04cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "consent_lifecycles",
      ]
      }) 
        const [group4549ff98, setgroup4549ff98 ] = React.useState<any>({}) 
    const [group4549ff98Props, setgroup4549ff98Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon5645",
            "text45645",
            "text23523",
      ]
      }) 
        const [group657d5, setgroup657d5 ] = React.useState<any>({}) 
    const [group657d5Props, setgroup657d5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon5675",
            "text4545",
            "text45645",
      ]
      }) 
        const [group6576622ab, setgroup6576622ab ] = React.useState<any>({}) 
    const [group6576622abProps, setgroup6576622abProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon234234",
            "textwrwer",
            "textwerwer",
      ]
      }) 
        const [group796798bff3, setgroup796798bff3 ] = React.useState<any>({}) 
    const [group796798bff3Props, setgroup796798bff3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon8698",
            "text34572547",
            "text",
      ]
      }) 
        const [vob_api_info_group5fc53, setvob_api_info_group5fc53 ] = React.useState<any>({}) 
    const [vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [group1f4ba, setgroup1f4ba ] = React.useState<any>({}) 
    const [group1f4baProps, setgroup1f4baProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_button",
            "global_bank_text",
      ]
      }) 
        const [api_info_group6ad41, setapi_info_group6ad41 ] = React.useState<any>({}) 
    const [api_info_group6ad41Props, setapi_info_group6ad41Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        const [total_calls_group76982, settotal_calls_group76982 ] = React.useState<any>({}) 
    const [total_calls_group76982Props, settotal_calls_group76982Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_calls",
      ]
      }) 
        const [success_rate_groupb6598, setsuccess_rate_groupb6598 ] = React.useState<any>({}) 
    const [success_rate_groupb6598Props, setsuccess_rate_groupb6598Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "success_rate",
      ]
      }) 
        const [error_rate_group773d1, seterror_rate_group773d1 ] = React.useState<any>({}) 
    const [error_rate_group773d1Props, seterror_rate_group773d1Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "error_rate",
      ]
      }) 
        const [ob_group76678, setob_group76678 ] = React.useState<any>({}) 
    const [ob_group76678Props, setob_group76678Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_info_text",
            "api_name_text",
            "apiname",
            "version_text",
            "version",
            "status_text",
            "status",
            "categiry_text",
            "api_category",
            "date_text",
            "release_date",
            "path_text",
            "server_url",
      ]
      }) 
        const [api_process_log_group192b0, setapi_process_log_group192b0 ] = React.useState<any>({}) 
    const [api_process_log_group192b0Props, setapi_process_log_group192b0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_process_log_text",
      ]
      }) 
    
    const [api_process_log_table5904e, setapi_process_log_table5904e ] = React.useState<any>([]) 
    const [api_process_log_table5904eProps, setapi_process_log_table5904eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
        const [consent_logs_group3070a, setconsent_logs_group3070a ] = React.useState<any>({}) 
    const [consent_logs_group3070aProps, setconsent_logs_group3070aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text",
      ]
      }) 
    
    const [consent_logs53635, setconsent_logs53635 ] = React.useState<any>([]) 
    const [consent_logs53635Props, setconsent_logs53635Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
        const [monetization_groupf0a3b, setmonetization_groupf0a3b ] = React.useState<any>({}) 
    const [monetization_groupf0a3bProps, setmonetization_groupf0a3bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [dash_groupc162b, setdash_groupc162b ] = React.useState<any>({}) 
    const [dash_groupc162bProps, setdash_groupc162bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dash_text",
      ]
      }) 
        const [monthly_revenue_card_group3bf72, setmonthly_revenue_card_group3bf72 ] = React.useState<any>({}) 
    const [monthly_revenue_card_group3bf72Props, setmonthly_revenue_card_group3bf72Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "monthly_revenue",
            "monthly_icon",
      ]
      }) 
        const [ytd_revenue_card_groupbb98b, setytd_revenue_card_groupbb98b ] = React.useState<any>({}) 
    const [ytd_revenue_card_groupbb98bProps, setytd_revenue_card_groupbb98bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ytd_revenue",
            "ytd_icon",
      ]
      }) 
        const [invoice_raised_card_group23315, setinvoice_raised_card_group23315 ] = React.useState<any>({}) 
    const [invoice_raised_card_group23315Props, setinvoice_raised_card_group23315Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invoices_raised",
            "invoice_icon",
      ]
      }) 
        const [avg_revenue_tpp_card_group56d8e, setavg_revenue_tpp_card_group56d8e ] = React.useState<any>({}) 
    const [avg_revenue_tpp_card_group56d8eProps, setavg_revenue_tpp_card_group56d8eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "avg_revenue_per_tpp",
            "tpp_icon",
      ]
      }) 
        const [revenue_trend_groupa654b, setrevenue_trend_groupa654b ] = React.useState<any>({}) 
    const [revenue_trend_groupa654bProps, setrevenue_trend_groupa654bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "trend_text",
            "name",
      ]
      }) 
        const [piechart_groupce72b, setpiechart_groupce72b ] = React.useState<any>({}) 
    const [piechart_groupce72bProps, setpiechart_groupce72bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_text",
            "name",
      ]
      }) 
    
    const [billing_status_tableef735, setbilling_status_tableef735 ] = React.useState<any>([]) 
    const [billing_status_tableef735Props, setbilling_status_tableef735Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
        const [overage_charges_group44542, setoverage_charges_group44542 ] = React.useState<any>({}) 
    const [overage_charges_group44542Props, setoverage_charges_group44542Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "overage_text",
            "name",
      ]
      }) 
    
    const [tier_table17c1c, settier_table17c1c ] = React.useState<any>([]) 
    const [tier_table17c1cProps, settier_table17c1cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      refresh:false,
      filterInitalLoad: false,
      }) 
   const [api_usage_overviewecc9e,setapi_usage_overviewecc9e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_usage_overviewecc9eProps,setapi_usage_overviewecc9eProps] = React.useState<any>({}) 
   const [total_requests06c5a,settotal_requests06c5a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_requests06c5aProps,settotal_requests06c5aProps] = React.useState<any>({}) 
   const [tot_req_icon1fa8f,settot_req_icon1fa8f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tot_req_icon1fa8fProps,settot_req_icon1fa8fProps] = React.useState<any>({}) 
   const [active_apisac162,setactive_apisac162] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [active_apisac162Props,setactive_apisac162Props] = React.useState<any>({}) 
   const [active_icon42af9,setactive_icon42af9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [active_icon42af9Props,setactive_icon42af9Props] = React.useState<any>({}) 
   const [most_used_apis2686b,setmost_used_apis2686b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [most_used_apis2686bProps,setmost_used_apis2686bProps] = React.useState<any>({}) 
   const [most_used_api_icon6560d,setmost_used_api_icon6560d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [most_used_api_icon6560dProps,setmost_used_api_icon6560dProps] = React.useState<any>({}) 
   const [error_rate72497,seterror_rate72497] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [error_rate72497Props,seterror_rate72497Props] = React.useState<any>({}) 
   const [error_rate_icon89a9a,seterror_rate_icon89a9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [error_rate_icon89a9aProps,seterror_rate_icon89a9aProps] = React.useState<any>({}) 
   const [api_call_hours6d062,setapi_call_hours6d062] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_call_hours6d062Props,setapi_call_hours6d062Props] = React.useState<any>({}) 
   const [api_call_hours_dropdown14e0a,setapi_call_hours_dropdown14e0a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_call_hours_dropdown14e0aProps,setapi_call_hours_dropdown14e0aProps] = React.useState<any>({}) 
   const [api_call_over_hour_linechart01342,setapi_call_over_hour_linechart01342] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_call_over_hour_linechart01342Props,setapi_call_over_hour_linechart01342Props] = React.useState<any>({}) 
   const [api_call_over_month_linecharte59b1,setapi_call_over_month_linecharte59b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_call_over_month_linecharte59b1Props,setapi_call_over_month_linecharte59b1Props] = React.useState<any>({}) 
   const [week_linechart22a2f,setweek_linechart22a2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [week_linechart22a2fProps,setweek_linechart22a2fProps] = React.useState<any>({}) 
   const [total_used_api_text0681a,settotal_used_api_text0681a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_used_api_text0681aProps,settotal_used_api_text0681aProps] = React.useState<any>({}) 
   const [get_accounts_textded93,setget_accounts_textded93] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_accounts_textded93Props,setget_accounts_textded93Props] = React.useState<any>({}) 
   const [get_acc_progressf3140,setget_acc_progressf3140] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_acc_progressf3140Props,setget_acc_progressf3140Props] = React.useState<any>({}) 
   const [get_account_id_textcfcd9,setget_account_id_textcfcd9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_account_id_textcfcd9Props,setget_account_id_textcfcd9Props] = React.useState<any>({}) 
   const [get_acc_id_progress564cc,setget_acc_id_progress564cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_acc_id_progress564ccProps,setget_acc_id_progress564ccProps] = React.useState<any>({}) 
   const [get_balance_textc22b2,setget_balance_textc22b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_balance_textc22b2Props,setget_balance_textc22b2Props] = React.useState<any>({}) 
   const [get_balance_progressa0d54,setget_balance_progressa0d54] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_balance_progressa0d54Props,setget_balance_progressa0d54Props] = React.useState<any>({}) 
   const [get_direct_debits_progress04032,setget_direct_debits_progress04032] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_direct_debits_progress04032Props,setget_direct_debits_progress04032Props] = React.useState<any>({}) 
   const [get_direct_debits_text067ca,setget_direct_debits_text067ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [get_direct_debits_text067caProps,setget_direct_debits_text067caProps] = React.useState<any>({}) 
   const [products_textc39eb,setproducts_textc39eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [products_textc39ebProps,setproducts_textc39ebProps] = React.useState<any>({}) 
   const [product_progressee376,setproduct_progressee376] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_progressee376Props,setproduct_progressee376Props] = React.useState<any>({}) 
   const [app_namedc4c5,setapp_namedc4c5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [app_namedc4c5Props,setapp_namedc4c5Props] = React.useState<any>({}) 
   const [tppname5b032,settppname5b032] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tppname5b032Props,settppname5b032Props] = React.useState<any>({}) 
   const [typed4eac,settyped4eac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [typed4eacProps,settyped4eacProps] = React.useState<any>({}) 
   const [status_value3beb3,setstatus_value3beb3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_value3beb3Props,setstatus_value3beb3Props] = React.useState<any>({}) 
   const [apinamecccc2,setapinamecccc2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [apinamecccc2Props,setapinamecccc2Props] = React.useState<any>({}) 
   const [version33b3f,setversion33b3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [version33b3fProps,setversion33b3fProps] = React.useState<any>({}) 
   const [statuscd1e6,setstatuscd1e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [statuscd1e6Props,setstatuscd1e6Props] = React.useState<any>({}) 
   const [api_category0905e,setapi_category0905e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_category0905eProps,setapi_category0905eProps] = React.useState<any>({}) 
   const [release_date1939f,setrelease_date1939f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [release_date1939fProps,setrelease_date1939fProps] = React.useState<any>({}) 
   const [view_log82d2f,setview_log82d2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_log82d2fProps,setview_log82d2fProps] = React.useState<any>({}) 
   const [consent_lifecycles11691,setconsent_lifecycles11691] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [consent_lifecycles11691Props,setconsent_lifecycles11691Props] = React.useState<any>({}) 
   const [icon56454d73c,seticon56454d73c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon56454d73cProps,seticon56454d73cProps] = React.useState<any>({}) 
   const [text45645c95a7,settext45645c95a7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text45645c95a7Props,settext45645c95a7Props] = React.useState<any>({}) 
   const [text23523e7140,settext23523e7140] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text23523e7140Props,settext23523e7140Props] = React.useState<any>({}) 
   const [icon5675ee8ba,seticon5675ee8ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon5675ee8baProps,seticon5675ee8baProps] = React.useState<any>({}) 
   const [text454513feb,settext454513feb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text454513febProps,settext454513febProps] = React.useState<any>({}) 
   const [text4564580602,settext4564580602] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text4564580602Props,settext4564580602Props] = React.useState<any>({}) 
   const [icon234234e2c9a,seticon234234e2c9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon234234e2c9aProps,seticon234234e2c9aProps] = React.useState<any>({}) 
   const [textwrwer0e4e1,settextwrwer0e4e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textwrwer0e4e1Props,settextwrwer0e4e1Props] = React.useState<any>({}) 
   const [textwerweraf6e8,settextwerweraf6e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textwerweraf6e8Props,settextwerweraf6e8Props] = React.useState<any>({}) 
   const [icon86986b1a3,seticon86986b1a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon86986b1a3Props,seticon86986b1a3Props] = React.useState<any>({}) 
   const [text3457254757f70,settext3457254757f70] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text3457254757f70Props,settext3457254757f70Props] = React.useState<any>({}) 
   const [text2668f,settext2668f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text2668fProps,settext2668fProps] = React.useState<any>({}) 
   const [back_button9eaea,setback_button9eaea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [back_button9eaeaProps,setback_button9eaeaProps] = React.useState<any>({}) 
   const [global_bank_text5cc81,setglobal_bank_text5cc81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [global_bank_text5cc81Props,setglobal_bank_text5cc81Props] = React.useState<any>({}) 
   const [total_calls_cardce82b,settotal_calls_cardce82b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_calls_cardce82bProps,settotal_calls_cardce82bProps] = React.useState<any>({}) 
   const [success_rate_card0eba7,setsuccess_rate_card0eba7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [success_rate_card0eba7Props,setsuccess_rate_card0eba7Props] = React.useState<any>({}) 
   const [error_rate_card9f823,seterror_rate_card9f823] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [error_rate_card9f823Props,seterror_rate_card9f823Props] = React.useState<any>({}) 
   const [api_info_text692fd,setapi_info_text692fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_info_text692fdProps,setapi_info_text692fdProps] = React.useState<any>({}) 
   const [api_name_textaccc0,setapi_name_textaccc0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_name_textaccc0Props,setapi_name_textaccc0Props] = React.useState<any>({}) 
   const [api_name_textinput4e4bf,setapi_name_textinput4e4bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_name_textinput4e4bfProps,setapi_name_textinput4e4bfProps] = React.useState<any>({}) 
   const [version_text67538,setversion_text67538] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [version_text67538Props,setversion_text67538Props] = React.useState<any>({}) 
   const [version_textinput19065,setversion_textinput19065] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [version_textinput19065Props,setversion_textinput19065Props] = React.useState<any>({}) 
   const [status_text66555,setstatus_text66555] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_text66555Props,setstatus_text66555Props] = React.useState<any>({}) 
   const [status_textinput62886,setstatus_textinput62886] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_textinput62886Props,setstatus_textinput62886Props] = React.useState<any>({}) 
   const [categiry_text7520b,setcategiry_text7520b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [categiry_text7520bProps,setcategiry_text7520bProps] = React.useState<any>({}) 
   const [category_textinpute77d9,setcategory_textinpute77d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [category_textinpute77d9Props,setcategory_textinpute77d9Props] = React.useState<any>({}) 
   const [date_text44a5e,setdate_text44a5e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [date_text44a5eProps,setdate_text44a5eProps] = React.useState<any>({}) 
   const [date_textinputb262e,setdate_textinputb262e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [date_textinputb262eProps,setdate_textinputb262eProps] = React.useState<any>({}) 
   const [path_textaf97a,setpath_textaf97a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [path_textaf97aProps,setpath_textaf97aProps] = React.useState<any>({}) 
   const [path_textinputec3d3,setpath_textinputec3d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [path_textinputec3d3Props,setpath_textinputec3d3Props] = React.useState<any>({}) 
   const [rate_piechartbb394,setrate_piechartbb394] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rate_piechartbb394Props,setrate_piechartbb394Props] = React.useState<any>({}) 
   const [api_process_log_texte6f38,setapi_process_log_texte6f38] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_process_log_texte6f38Props,setapi_process_log_texte6f38Props] = React.useState<any>({}) 
   const [timestampc53f0,settimestampc53f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [timestampc53f0Props,settimestampc53f0Props] = React.useState<any>({}) 
   const [requestc5c44,setrequestc5c44] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [requestc5c44Props,setrequestc5c44Props] = React.useState<any>({}) 
   const [response5db6d,setresponse5db6d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [response5db6dProps,setresponse5db6dProps] = React.useState<any>({}) 
   const [tob_consent_requestid32916,settob_consent_requestid32916] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tob_consent_requestid32916Props,settob_consent_requestid32916Props] = React.useState<any>({}) 
   const [view_logs8b253,setview_logs8b253] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_logs8b253Props,setview_logs8b253Props] = React.useState<any>({}) 
   const [textfe486,settextfe486] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textfe486Props,settextfe486Props] = React.useState<any>({}) 
   const [request_consent_baseconsentid4221e,setrequest_consent_baseconsentid4221e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [request_consent_baseconsentid4221eProps,setrequest_consent_baseconsentid4221eProps] = React.useState<any>({}) 
   const [interactionid5cd91,setinteractionid5cd91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interactionid5cd91Props,setinteractionid5cd91Props] = React.useState<any>({}) 
   const [request_consent_permissions1448d,setrequest_consent_permissions1448d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [request_consent_permissions1448dProps,setrequest_consent_permissions1448dProps] = React.useState<any>({}) 
   const [consentbody_data_revokedby6ede9,setconsentbody_data_revokedby6ede9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [consentbody_data_revokedby6ede9Props,setconsentbody_data_revokedby6ede9Props] = React.useState<any>({}) 
   const [request_consent_expiratriondatetime3ba51,setrequest_consent_expiratriondatetime3ba51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [request_consent_expiratriondatetime3ba51Props,setrequest_consent_expiratriondatetime3ba51Props] = React.useState<any>({}) 
   const [status61386,setstatus61386] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status61386Props,setstatus61386Props] = React.useState<any>({}) 
   const [dash_text814be,setdash_text814be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dash_text814beProps,setdash_text814beProps] = React.useState<any>({}) 
   const [monthly_revenue_card0ab73,setmonthly_revenue_card0ab73] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [monthly_revenue_card0ab73Props,setmonthly_revenue_card0ab73Props] = React.useState<any>({}) 
   const [monthly_icone201a,setmonthly_icone201a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [monthly_icone201aProps,setmonthly_icone201aProps] = React.useState<any>({}) 
   const [ytd_revenue_card19ac3,setytd_revenue_card19ac3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ytd_revenue_card19ac3Props,setytd_revenue_card19ac3Props] = React.useState<any>({}) 
   const [ytd_icon346d8,setytd_icon346d8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ytd_icon346d8Props,setytd_icon346d8Props] = React.useState<any>({}) 
   const [invoice_raised_card87b51,setinvoice_raised_card87b51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [invoice_raised_card87b51Props,setinvoice_raised_card87b51Props] = React.useState<any>({}) 
   const [invoice_icon43350,setinvoice_icon43350] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [invoice_icon43350Props,setinvoice_icon43350Props] = React.useState<any>({}) 
   const [avg_revenue_tpp_card6eb26,setavg_revenue_tpp_card6eb26] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [avg_revenue_tpp_card6eb26Props,setavg_revenue_tpp_card6eb26Props] = React.useState<any>({}) 
   const [tpp_icon1dafd,settpp_icon1dafd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tpp_icon1dafdProps,settpp_icon1dafdProps] = React.useState<any>({}) 
   const [trend_text1634c,settrend_text1634c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trend_text1634cProps,settrend_text1634cProps] = React.useState<any>({}) 
   const [group_barchart5116c,setgroup_barchart5116c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [group_barchart5116cProps,setgroup_barchart5116cProps] = React.useState<any>({}) 
   const [api_text0685a,setapi_text0685a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [api_text0685aProps,setapi_text0685aProps] = React.useState<any>({}) 
   const [piechart04991,setpiechart04991] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [piechart04991Props,setpiechart04991Props] = React.useState<any>({}) 
   const [tpp_column0b7bb,settpp_column0b7bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tpp_column0b7bbProps,settpp_column0b7bbProps] = React.useState<any>({}) 
   const [amount_columnb4219,setamount_columnb4219] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount_columnb4219Props,setamount_columnb4219Props] = React.useState<any>({}) 
   const [duedate_columne7d57,setduedate_columne7d57] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [duedate_columne7d57Props,setduedate_columne7d57Props] = React.useState<any>({}) 
   const [status_columnc8f4d,setstatus_columnc8f4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_columnc8f4dProps,setstatus_columnc8f4dProps] = React.useState<any>({}) 
   const [overage_textf2644,setoverage_textf2644] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [overage_textf2644Props,setoverage_textf2644Props] = React.useState<any>({}) 
   const [single_barchart0a200,setsingle_barchart0a200] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [single_barchart0a200Props,setsingle_barchart0a200Props] = React.useState<any>({}) 
   const [pricing_id_column2bf94,setpricing_id_column2bf94] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pricing_id_column2bf94Props,setpricing_id_column2bf94Props] = React.useState<any>({}) 
   const [monthly_fee_column42a75,setmonthly_fee_column42a75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [monthly_fee_column42a75Props,setmonthly_fee_column42a75Props] = React.useState<any>({}) 
   const [overage_rate_column50e70,setoverage_rate_column50e70] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [overage_rate_column50e70Props,setoverage_rate_column50e70Props] = React.useState<any>({}) 
   const [tpps_column84964,settpps_column84964] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tpps_column84964Props,settpps_column84964Props] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       textapi_usage_overviewecc9e:false,
       cardtotal_requests06c5a:false,
       icontot_req_icon1fa8f:false,
       cardactive_apisac162:false,
       iconactive_icon42af9:false,
       cardmost_used_apis2686b:false,
       iconmost_used_api_icon6560d:false,
       carderror_rate72497:false,
       iconerror_rate_icon89a9a:false,
       textapi_call_hours6d062:false,
       dropdownapi_call_hours_dropdown14e0a:false,
       linechartapi_call_over_hour_linechart01342:false,
       linechartapi_call_over_month_linecharte59b1:false,
       linechartweek_linechart22a2f:false,
       texttotal_used_api_text0681a:false,
       textget_accounts_textded93:false,
       progressget_acc_progressf3140:false,
       textget_account_id_textcfcd9:false,
       progressget_acc_id_progress564cc:false,
       textget_balance_textc22b2:false,
       progressget_balance_progressa0d54:false,
       progressget_direct_debits_progress04032:false,
       textget_direct_debits_text067ca:false,
       textproducts_textc39eb:false,
       progressproduct_progressee376:false,
       columnapp_namedc4c5:false,
       columntppname5b032:false,
       columntyped4eac:false,
       columnstatus_value3beb3:false,
       columnapinamecccc2:false,
       columnversion33b3f:false,
       columnstatuscd1e6:false,
       columnapi_category0905e:false,
       columnrelease_date1939f:false,
       buttonview_log82d2f:false,
       textconsent_lifecycles11691:false,
       iconicon56454d73c:false,
       texttext45645c95a7:false,
       texttext23523e7140:false,
       iconicon5675ee8ba:false,
       texttext454513feb:false,
       texttext4564580602:false,
       iconicon234234e2c9a:false,
       texttextwrwer0e4e1:false,
       texttextwerweraf6e8:false,
       iconicon86986b1a3:false,
       texttext3457254757f70:false,
       texttext2668f:false,
       buttonback_button9eaea:false,
       textglobal_bank_text5cc81:false,
       cardtotal_calls_cardce82b:false,
       cardsuccess_rate_card0eba7:false,
       carderror_rate_card9f823:false,
       textapi_info_text692fd:false,
       textapi_name_textaccc0:false,
       textinputapi_name_textinput4e4bf:false,
       textversion_text67538:false,
       textinputversion_textinput19065:false,
       textstatus_text66555:false,
       textinputstatus_textinput62886:false,
       textcategiry_text7520b:false,
       textinputcategory_textinpute77d9:false,
       textdate_text44a5e:false,
       textinputdate_textinputb262e:false,
       textpath_textaf97a:false,
       textinputpath_textinputec3d3:false,
       piechartrate_piechartbb394:false,
       textapi_process_log_texte6f38:false,
       columntimestampc53f0:false,
       columnrequestc5c44:false,
       columnresponse5db6d:false,
       columntob_consent_requestid32916:false,
       buttonview_logs8b253:false,
       texttextfe486:false,
       columnrequest_consent_baseconsentid4221e:false,
       columninteractionid5cd91:false,
       columnrequest_consent_permissions1448d:false,
       columnconsentbody_data_revokedby6ede9:false,
       columnrequest_consent_expiratriondatetime3ba51:false,
       columnstatus61386:false,
       textdash_text814be:false,
       cardmonthly_revenue_card0ab73:false,
       iconmonthly_icone201a:false,
       cardytd_revenue_card19ac3:false,
       iconytd_icon346d8:false,
       cardinvoice_raised_card87b51:false,
       iconinvoice_icon43350:false,
       cardavg_revenue_tpp_card6eb26:false,
       icontpp_icon1dafd:false,
       texttrend_text1634c:false,
       barchartgroup_barchart5116c:false,
       textapi_text0685a:false,
       piechartpiechart04991:false,
       columntpp_column0b7bb:false,
       columnamount_columnb4219:false,
       columnduedate_columne7d57:false,
       columnstatus_columnc8f4d:false,
       textoverage_textf2644:false,
       barchartsingle_barchart0a200:false,
       columnpricing_id_column2bf94:false,
       columnmonthly_fee_column42a75:false,
       columnoverage_rate_column50e70:false,
       columntpps_column84964:false,
       groupvob_dashboard_screen9ce49:false,
       groupapi_usage_group868b4:false,
       groupreq_groupdf5e7:false,
       groupactive_group31e18:false,
       grouptotal_api_calls_groupd4dee:false,
       groupmost_groupc5ce0:false,
       groupline_chart_groupadc5c:false,
       groupapi_call_over_frequency_subscreenb8acc:false,
       groupCT003_AF_UF_UFWS_Trs_TOB_apiCallOverHour_v1c8026:false,
       groupapi_call_over_hour_group2febf:false,
       groupCT003_AF_UF_UFWS_Trs_TOB_apiCallOverMonth_v192528:false,
       groupapi_call_over_month_groupccb80:false,
       groupCT003_AF_UF_UFWS_Trs_TOB_apiCallOverWeek_v1b09c6:false,
       groupapi_call_over_week_group987fe:false,
       grouptotal_used_api_groupcd37d:false,
       grouplist_of_register_tpp_groupbe9d5:false,
       tableconnected_application19ab2:false,
       groupapi_repo_table162e4:false,
       tableapi_repositoryb1ab8:false,
       groupgroup1233a04c:false,
       groupgroup4549ff98:false,
       groupgroup657d5:false,
       groupgroup6576622ab:false,
       groupgroup796798bff3:false,
       groupvob_api_info_group5fc53:false,
       groupgroup1f4ba:false,
       groupapi_info_group6ad41:false,
       grouptotal_calls_group76982:false,
       groupsuccess_rate_groupb6598:false,
       grouperror_rate_group773d1:false,
       groupob_group76678:false,
       groupapi_process_log_group192b0:false,
       tableapi_process_log_table5904e:false,
       groupconsent_logs_group3070a:false,
       tableconsent_logs53635:false,
       groupmonetization_groupf0a3b:false,
       groupdash_groupc162b:false,
       groupmonthly_revenue_card_group3bf72:false,
       groupytd_revenue_card_groupbb98b:false,
       groupinvoice_raised_card_group23315:false,
       groupavg_revenue_tpp_card_group56d8e:false,
       grouprevenue_trend_groupa654b:false,
       grouppiechart_groupce72b:false,
       tablebilling_status_tableef735:false,
       groupoverage_charges_group44542:false,
       tabletier_table17c1c:false,
      })

  ////// screen states 
  const [apiusagedashboard_v1,setapiusagedashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [apiusagedashboard_v1Props,setapiusagedashboard_v1Props] = React.useState<any>({})
  const [viewapiinfo_v1,setviewapiinfo_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [viewapiinfo_v1Props,setviewapiinfo_v1Props] = React.useState<any>({})
  const [viewapiconsentlog_v1,setviewapiconsentlog_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [viewapiconsentlog_v1Props,setviewapiconsentlog_v1Props] = React.useState<any>({})
  const [monetizationdashboard_v1,setmonetizationdashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [monetizationdashboard_v1Props,setmonetizationdashboard_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_tob_consent_request_ca_dfd_v1Props,setdfd_tob_consent_request_ca_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongo_totalcalls_dfd_v1Props,setdfd_mongo_totalcalls_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongo_api_repository_dfd_v1Props,setdfd_mongo_api_repository_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongodb_api_process_logs_dfd_v1Props,setdfd_mongodb_api_process_logs_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongo_pie_chart_dfd_v1Props,setdfd_mongo_pie_chart_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongo_linechart_dfd_v1Props,setdfd_mongo_linechart_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_consents_request_dfd_v1Props,setdfd_tob_consents_request_dfd_v1Props] = React.useState<any>([])
  const [dfd_mongodb_maindashboard_dfd_v1Props,setdfd_mongodb_maindashboard_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_total_used_api_dfd_v1Props,setdfd_tob_total_used_api_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_totalcards_dfd_v1Props,setdfd_tob_mzdsh_totalcards_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_group_barchart_dfd_v1Props,setdfd_tob_mzdsh_group_barchart_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_piechart_dfd_v1Props,setdfd_tob_mzdsh_piechart_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props,setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_pricingtiertable_dfd_v1Props,setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props] = React.useState<any>([])
  const [dfd_tob_mzdsh_invoice_table_dfd_v1Props,setdfd_tob_mzdsh_invoice_table_dfd_v1Props] = React.useState<any>([])
    const [searchParam , setSearchParam] = React.useState<string>("")
    const [disableParam , setDisableParam] = React.useState<Record<string, boolean>>({})
    const [globalState , setGlobalState] = React.useState<Record<string, any>>({})
    const [refetch, setRefetch] = React.useState<any>(false)
    const [validate, setValidate] = React.useState<Record<string, any>>({});
    const [validateRefetch, setValidateRefetch] = React.useState<{ value: boolean; init: number }>({
      value:false,
      init:0
    })
    const [accessProfile, setAccessProfile] = React.useState<any>([])
    const [property, setProperty] = React.useState<any>({})
    const [memoryVariables, setMemoryVariables] = React.useState<any>({})
    const [lockedData, setLockedData] = React.useState<any>({})
    const [tableData, setTableData] = React.useState<any>({})      
    const [paginationDetails, setpaginationDetails] = React.useState<any>({})

    const [eventEmitterData,setEventEmitterData] = React.useState<any>([])
    const [userDetails , setUserDetails] = React.useState<any>({})
    const [encAppFalg , setEncAppFalg] = React.useState<any>({})
    const theme = getCookie('cfg_theme')


  const emptifyStateValues=()=>{ // for refresh disable key values exapmle app RTGS
    setapi_usage_overviewecc9e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_requests06c5a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settot_req_icon1fa8f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setactive_apisac162(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setactive_icon42af9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmost_used_apis2686b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmost_used_api_icon6560d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seterror_rate72497(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seterror_rate_icon89a9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_call_hours6d062(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_call_hours_dropdown14e0a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_call_over_hour_linechart01342(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_call_over_month_linecharte59b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setweek_linechart22a2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_used_api_text0681a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_accounts_textded93(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_acc_progressf3140(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_account_id_textcfcd9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_acc_id_progress564cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_balance_textc22b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_balance_progressa0d54(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_direct_debits_progress04032(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setget_direct_debits_text067ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproducts_textc39eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_progressee376(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapp_namedc4c5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settppname5b032(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settyped4eac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_value3beb3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapinamecccc2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setversion33b3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatuscd1e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_category0905e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrelease_date1939f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_log82d2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconsent_lifecycles11691(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon56454d73c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext45645c95a7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext23523e7140(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon5675ee8ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext454513feb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext4564580602(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon234234e2c9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextwrwer0e4e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextwerweraf6e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon86986b1a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext3457254757f70(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext2668f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setback_button9eaea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setglobal_bank_text5cc81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_calls_cardce82b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsuccess_rate_card0eba7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seterror_rate_card9f823(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_info_text692fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_name_textaccc0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_name_textinput4e4bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setversion_text67538(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setversion_textinput19065(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_text66555(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_textinput62886(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategiry_text7520b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_textinpute77d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate_text44a5e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate_textinputb262e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpath_textaf97a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpath_textinputec3d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrate_piechartbb394(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_process_log_texte6f38(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settimestampc53f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrequestc5c44(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setresponse5db6d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settob_consent_requestid32916(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_logs8b253(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextfe486(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrequest_consent_baseconsentid4221e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinteractionid5cd91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrequest_consent_permissions1448d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconsentbody_data_revokedby6ede9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrequest_consent_expiratriondatetime3ba51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus61386(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdash_text814be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmonthly_revenue_card0ab73(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmonthly_icone201a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setytd_revenue_card19ac3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setytd_icon346d8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvoice_raised_card87b51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvoice_icon43350(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setavg_revenue_tpp_card6eb26(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settpp_icon1dafd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrend_text1634c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgroup_barchart5116c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapi_text0685a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpiechart04991(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settpp_column0b7bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount_columnb4219(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setduedate_columne7d57(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_columnc8f4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoverage_textf2644(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsingle_barchart0a200(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpricing_id_column2bf94(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmonthly_fee_column42a75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoverage_rate_column50e70(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settpps_column84964(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setvob_dashboard_screen9ce49({}) 
    setvob_dashboard_screen9ce49Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setapi_usage_group868b4({}) 
    setapi_usage_group868b4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_usage_overview",
      ]
      }) 
        setreq_groupdf5e7({}) 
    setreq_groupdf5e7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_requests",
            "tot_req_icon",
      ]
      }) 
        setactive_group31e18({}) 
    setactive_group31e18Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "active_apis",
            "active_icon",
      ]
      }) 
        settotal_api_calls_groupd4dee({}) 
    settotal_api_calls_groupd4deeProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "most_used_apis",
            "most_used_api_icon",
      ]
      }) 
        setmost_groupc5ce0({}) 
    setmost_groupc5ce0Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "error",
            "error_rate_icon",
      ]
      }) 
        setline_chart_groupadc5c({}) 
    setline_chart_groupadc5cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_call_hours",
            "api_call_hours_dropdown",
      ]
      }) 
        setapi_call_over_frequency_subscreenb8acc({}) 
    setapi_call_over_frequency_subscreenb8accProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026({}) 
    setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setapi_call_over_hour_group2febf({}) 
    setapi_call_over_hour_group2febfProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528({}) 
    setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setapi_call_over_month_groupccb80({}) 
    setapi_call_over_month_groupccb80Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6({}) 
    setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setapi_call_over_week_group987fe({}) 
    setapi_call_over_week_group987feProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        settotal_used_api_groupcd37d({}) 
    settotal_used_api_groupcd37dProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_used_api_text",
            "get_accounts_text",
            "percentage1",
            "get_account_id_text",
            "percentage3",
            "get_balance_text",
            "percentage2",
            "percentage4",
            "get_direct_debits_text",
            "products_text",
            "product_progress",
      ]
      }) 
        setlist_of_register_tpp_groupbe9d5({}) 
    setlist_of_register_tpp_groupbe9d5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    setconnected_application19ab2([]) 
    setconnected_application19ab2Props({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
        setapi_repo_table162e4({}) 
    setapi_repo_table162e4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    setapi_repositoryb1ab8([]) 
    setapi_repositoryb1ab8Props({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
        setgroup1233a04c({}) 
    setgroup1233a04cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "consent_lifecycles",
      ]
      }) 
        setgroup4549ff98({}) 
    setgroup4549ff98Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon5645",
            "text45645",
            "text23523",
      ]
      }) 
        setgroup657d5({}) 
    setgroup657d5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon5675",
            "text4545",
            "text45645",
      ]
      }) 
        setgroup6576622ab({}) 
    setgroup6576622abProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon234234",
            "textwrwer",
            "textwerwer",
      ]
      }) 
        setgroup796798bff3({}) 
    setgroup796798bff3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon8698",
            "text34572547",
            "text",
      ]
      }) 
        setvob_api_info_group5fc53({}) 
    setvob_api_info_group5fc53Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setgroup1f4ba({}) 
    setgroup1f4baProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_button",
            "global_bank_text",
      ]
      }) 
        setapi_info_group6ad41({}) 
    setapi_info_group6ad41Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        settotal_calls_group76982({}) 
    settotal_calls_group76982Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_calls",
      ]
      }) 
        setsuccess_rate_groupb6598({}) 
    setsuccess_rate_groupb6598Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "success_rate",
      ]
      }) 
        seterror_rate_group773d1({}) 
    seterror_rate_group773d1Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "error_rate",
      ]
      }) 
        setob_group76678({}) 
    setob_group76678Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_info_text",
            "api_name_text",
            "apiname",
            "version_text",
            "version",
            "status_text",
            "status",
            "categiry_text",
            "api_category",
            "date_text",
            "release_date",
            "path_text",
            "server_url",
      ]
      }) 
        setapi_process_log_group192b0({}) 
    setapi_process_log_group192b0Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_process_log_text",
      ]
      }) 
    
    setapi_process_log_table5904e([]) 
    setapi_process_log_table5904eProps({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
        setconsent_logs_group3070a({}) 
    setconsent_logs_group3070aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text",
      ]
      }) 
    
    setconsent_logs53635([]) 
    setconsent_logs53635Props({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
        setmonetization_groupf0a3b({}) 
    setmonetization_groupf0a3bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        setdash_groupc162b({}) 
    setdash_groupc162bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dash_text",
      ]
      }) 
        setmonthly_revenue_card_group3bf72({}) 
    setmonthly_revenue_card_group3bf72Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "monthly_revenue",
            "monthly_icon",
      ]
      }) 
        setytd_revenue_card_groupbb98b({}) 
    setytd_revenue_card_groupbb98bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ytd_revenue",
            "ytd_icon",
      ]
      }) 
        setinvoice_raised_card_group23315({}) 
    setinvoice_raised_card_group23315Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invoices_raised",
            "invoice_icon",
      ]
      }) 
        setavg_revenue_tpp_card_group56d8e({}) 
    setavg_revenue_tpp_card_group56d8eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "avg_revenue_per_tpp",
            "tpp_icon",
      ]
      }) 
        setrevenue_trend_groupa654b({}) 
    setrevenue_trend_groupa654bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "trend_text",
            "name",
      ]
      }) 
        setpiechart_groupce72b({}) 
    setpiechart_groupce72bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "api_text",
            "name",
      ]
      }) 
    
    setbilling_status_tableef735([]) 
    setbilling_status_tableef735Props({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
        setoverage_charges_group44542({}) 
    setoverage_charges_group44542Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "overage_text",
            "name",
      ]
      }) 
    
    settier_table17c1c([]) 
    settier_table17c1cProps({
      validation:false,
      required:false,
      refetch:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      primaryColunm: '',
      refresh:false,
      filterInitalLoad: false,
      }) 
  }
  useEffect(() => {
    if (pathname?.includes('select-context')) {
      emptifyStateValues()
    }
  }, [pathname])
    
  return (
    <TotalContext.Provider 
      value={
      {
      //
        currentToken,
        setCurrentToken,
        matchedAccessProfileData,
        setMatchedAccessProfileData,
        vob_dashboard_screen9ce49, 
        setvob_dashboard_screen9ce49,
        vob_dashboard_screen9ce49Props, 
        setvob_dashboard_screen9ce49Props,
        api_usage_group868b4, 
        setapi_usage_group868b4,
        api_usage_group868b4Props, 
        setapi_usage_group868b4Props,
        req_groupdf5e7, 
        setreq_groupdf5e7,
        req_groupdf5e7Props, 
        setreq_groupdf5e7Props,
        active_group31e18, 
        setactive_group31e18,
        active_group31e18Props, 
        setactive_group31e18Props,
        total_api_calls_groupd4dee, 
        settotal_api_calls_groupd4dee,
        total_api_calls_groupd4deeProps, 
        settotal_api_calls_groupd4deeProps,
        most_groupc5ce0, 
        setmost_groupc5ce0,
        most_groupc5ce0Props, 
        setmost_groupc5ce0Props,
        line_chart_groupadc5c, 
        setline_chart_groupadc5c,
        line_chart_groupadc5cProps, 
        setline_chart_groupadc5cProps,
        api_call_over_frequency_subscreenb8acc, 
        setapi_call_over_frequency_subscreenb8acc,
        api_call_over_frequency_subscreenb8accProps, 
        setapi_call_over_frequency_subscreenb8accProps,
        ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026, 
        setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026,
        ct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props, 
        setct003_af_uf_ufws_trs_tob_apicalloverhour_v1c8026Props,
        api_call_over_hour_group2febf, 
        setapi_call_over_hour_group2febf,
        api_call_over_hour_group2febfProps, 
        setapi_call_over_hour_group2febfProps,
        ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528, 
        setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528,
        ct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props, 
        setct003_af_uf_ufws_trs_tob_apicallovermonth_v192528Props,
        api_call_over_month_groupccb80, 
        setapi_call_over_month_groupccb80,
        api_call_over_month_groupccb80Props, 
        setapi_call_over_month_groupccb80Props,
        ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6, 
        setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6,
        ct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props, 
        setct003_af_uf_ufws_trs_tob_apicalloverweek_v1b09c6Props,
        api_call_over_week_group987fe, 
        setapi_call_over_week_group987fe,
        api_call_over_week_group987feProps, 
        setapi_call_over_week_group987feProps,
        total_used_api_groupcd37d, 
        settotal_used_api_groupcd37d,
        total_used_api_groupcd37dProps, 
        settotal_used_api_groupcd37dProps,
        list_of_register_tpp_groupbe9d5, 
        setlist_of_register_tpp_groupbe9d5,
        list_of_register_tpp_groupbe9d5Props, 
        setlist_of_register_tpp_groupbe9d5Props,
        connected_application19ab2, 
        setconnected_application19ab2,
        connected_application19ab2Props, 
        setconnected_application19ab2Props,
        api_repo_table162e4, 
        setapi_repo_table162e4,
        api_repo_table162e4Props, 
        setapi_repo_table162e4Props,
        api_repositoryb1ab8, 
        setapi_repositoryb1ab8,
        api_repositoryb1ab8Props, 
        setapi_repositoryb1ab8Props,
        group1233a04c, 
        setgroup1233a04c,
        group1233a04cProps, 
        setgroup1233a04cProps,
        group4549ff98, 
        setgroup4549ff98,
        group4549ff98Props, 
        setgroup4549ff98Props,
        group657d5, 
        setgroup657d5,
        group657d5Props, 
        setgroup657d5Props,
        group6576622ab, 
        setgroup6576622ab,
        group6576622abProps, 
        setgroup6576622abProps,
        group796798bff3, 
        setgroup796798bff3,
        group796798bff3Props, 
        setgroup796798bff3Props,
        vob_api_info_group5fc53, 
        setvob_api_info_group5fc53,
        vob_api_info_group5fc53Props, 
        setvob_api_info_group5fc53Props,
        group1f4ba, 
        setgroup1f4ba,
        group1f4baProps, 
        setgroup1f4baProps,
        api_info_group6ad41, 
        setapi_info_group6ad41,
        api_info_group6ad41Props, 
        setapi_info_group6ad41Props,
        total_calls_group76982, 
        settotal_calls_group76982,
        total_calls_group76982Props, 
        settotal_calls_group76982Props,
        success_rate_groupb6598, 
        setsuccess_rate_groupb6598,
        success_rate_groupb6598Props, 
        setsuccess_rate_groupb6598Props,
        error_rate_group773d1, 
        seterror_rate_group773d1,
        error_rate_group773d1Props, 
        seterror_rate_group773d1Props,
        ob_group76678, 
        setob_group76678,
        ob_group76678Props, 
        setob_group76678Props,
        api_process_log_group192b0, 
        setapi_process_log_group192b0,
        api_process_log_group192b0Props, 
        setapi_process_log_group192b0Props,
        api_process_log_table5904e, 
        setapi_process_log_table5904e,
        api_process_log_table5904eProps, 
        setapi_process_log_table5904eProps,
        consent_logs_group3070a, 
        setconsent_logs_group3070a,
        consent_logs_group3070aProps, 
        setconsent_logs_group3070aProps,
        consent_logs53635, 
        setconsent_logs53635,
        consent_logs53635Props, 
        setconsent_logs53635Props,
        monetization_groupf0a3b, 
        setmonetization_groupf0a3b,
        monetization_groupf0a3bProps, 
        setmonetization_groupf0a3bProps,
        dash_groupc162b, 
        setdash_groupc162b,
        dash_groupc162bProps, 
        setdash_groupc162bProps,
        monthly_revenue_card_group3bf72, 
        setmonthly_revenue_card_group3bf72,
        monthly_revenue_card_group3bf72Props, 
        setmonthly_revenue_card_group3bf72Props,
        ytd_revenue_card_groupbb98b, 
        setytd_revenue_card_groupbb98b,
        ytd_revenue_card_groupbb98bProps, 
        setytd_revenue_card_groupbb98bProps,
        invoice_raised_card_group23315, 
        setinvoice_raised_card_group23315,
        invoice_raised_card_group23315Props, 
        setinvoice_raised_card_group23315Props,
        avg_revenue_tpp_card_group56d8e, 
        setavg_revenue_tpp_card_group56d8e,
        avg_revenue_tpp_card_group56d8eProps, 
        setavg_revenue_tpp_card_group56d8eProps,
        revenue_trend_groupa654b, 
        setrevenue_trend_groupa654b,
        revenue_trend_groupa654bProps, 
        setrevenue_trend_groupa654bProps,
        piechart_groupce72b, 
        setpiechart_groupce72b,
        piechart_groupce72bProps, 
        setpiechart_groupce72bProps,
        billing_status_tableef735, 
        setbilling_status_tableef735,
        billing_status_tableef735Props, 
        setbilling_status_tableef735Props,
        overage_charges_group44542, 
        setoverage_charges_group44542,
        overage_charges_group44542Props, 
        setoverage_charges_group44542Props,
        tier_table17c1c, 
        settier_table17c1c,
        tier_table17c1cProps, 
        settier_table17c1cProps,
        api_usage_overviewecc9e,
        setapi_usage_overviewecc9e, 
        api_usage_overviewecc9eProps,
        setapi_usage_overviewecc9eProps,
        total_requests06c5a,
        settotal_requests06c5a, 
        total_requests06c5aProps,
        settotal_requests06c5aProps,
        tot_req_icon1fa8f,
        settot_req_icon1fa8f, 
        tot_req_icon1fa8fProps,
        settot_req_icon1fa8fProps,
        active_apisac162,
        setactive_apisac162, 
        active_apisac162Props,
        setactive_apisac162Props,
        active_icon42af9,
        setactive_icon42af9, 
        active_icon42af9Props,
        setactive_icon42af9Props,
        most_used_apis2686b,
        setmost_used_apis2686b, 
        most_used_apis2686bProps,
        setmost_used_apis2686bProps,
        most_used_api_icon6560d,
        setmost_used_api_icon6560d, 
        most_used_api_icon6560dProps,
        setmost_used_api_icon6560dProps,
        error_rate72497,
        seterror_rate72497, 
        error_rate72497Props,
        seterror_rate72497Props,
        error_rate_icon89a9a,
        seterror_rate_icon89a9a, 
        error_rate_icon89a9aProps,
        seterror_rate_icon89a9aProps,
        api_call_hours6d062,
        setapi_call_hours6d062, 
        api_call_hours6d062Props,
        setapi_call_hours6d062Props,
        api_call_hours_dropdown14e0a,
        setapi_call_hours_dropdown14e0a, 
        api_call_hours_dropdown14e0aProps,
        setapi_call_hours_dropdown14e0aProps,
        api_call_over_hour_linechart01342,
        setapi_call_over_hour_linechart01342, 
        api_call_over_hour_linechart01342Props,
        setapi_call_over_hour_linechart01342Props,
        api_call_over_month_linecharte59b1,
        setapi_call_over_month_linecharte59b1, 
        api_call_over_month_linecharte59b1Props,
        setapi_call_over_month_linecharte59b1Props,
        week_linechart22a2f,
        setweek_linechart22a2f, 
        week_linechart22a2fProps,
        setweek_linechart22a2fProps,
        total_used_api_text0681a,
        settotal_used_api_text0681a, 
        total_used_api_text0681aProps,
        settotal_used_api_text0681aProps,
        get_accounts_textded93,
        setget_accounts_textded93, 
        get_accounts_textded93Props,
        setget_accounts_textded93Props,
        get_acc_progressf3140,
        setget_acc_progressf3140, 
        get_acc_progressf3140Props,
        setget_acc_progressf3140Props,
        get_account_id_textcfcd9,
        setget_account_id_textcfcd9, 
        get_account_id_textcfcd9Props,
        setget_account_id_textcfcd9Props,
        get_acc_id_progress564cc,
        setget_acc_id_progress564cc, 
        get_acc_id_progress564ccProps,
        setget_acc_id_progress564ccProps,
        get_balance_textc22b2,
        setget_balance_textc22b2, 
        get_balance_textc22b2Props,
        setget_balance_textc22b2Props,
        get_balance_progressa0d54,
        setget_balance_progressa0d54, 
        get_balance_progressa0d54Props,
        setget_balance_progressa0d54Props,
        get_direct_debits_progress04032,
        setget_direct_debits_progress04032, 
        get_direct_debits_progress04032Props,
        setget_direct_debits_progress04032Props,
        get_direct_debits_text067ca,
        setget_direct_debits_text067ca, 
        get_direct_debits_text067caProps,
        setget_direct_debits_text067caProps,
        products_textc39eb,
        setproducts_textc39eb, 
        products_textc39ebProps,
        setproducts_textc39ebProps,
        product_progressee376,
        setproduct_progressee376, 
        product_progressee376Props,
        setproduct_progressee376Props,
        app_namedc4c5,
        setapp_namedc4c5, 
        app_namedc4c5Props,
        setapp_namedc4c5Props,
        tppname5b032,
        settppname5b032, 
        tppname5b032Props,
        settppname5b032Props,
        typed4eac,
        settyped4eac, 
        typed4eacProps,
        settyped4eacProps,
        status_value3beb3,
        setstatus_value3beb3, 
        status_value3beb3Props,
        setstatus_value3beb3Props,
        apinamecccc2,
        setapinamecccc2, 
        apinamecccc2Props,
        setapinamecccc2Props,
        version33b3f,
        setversion33b3f, 
        version33b3fProps,
        setversion33b3fProps,
        statuscd1e6,
        setstatuscd1e6, 
        statuscd1e6Props,
        setstatuscd1e6Props,
        api_category0905e,
        setapi_category0905e, 
        api_category0905eProps,
        setapi_category0905eProps,
        release_date1939f,
        setrelease_date1939f, 
        release_date1939fProps,
        setrelease_date1939fProps,
        view_log82d2f,
        setview_log82d2f, 
        view_log82d2fProps,
        setview_log82d2fProps,
        consent_lifecycles11691,
        setconsent_lifecycles11691, 
        consent_lifecycles11691Props,
        setconsent_lifecycles11691Props,
        icon56454d73c,
        seticon56454d73c, 
        icon56454d73cProps,
        seticon56454d73cProps,
        text45645c95a7,
        settext45645c95a7, 
        text45645c95a7Props,
        settext45645c95a7Props,
        text23523e7140,
        settext23523e7140, 
        text23523e7140Props,
        settext23523e7140Props,
        icon5675ee8ba,
        seticon5675ee8ba, 
        icon5675ee8baProps,
        seticon5675ee8baProps,
        text454513feb,
        settext454513feb, 
        text454513febProps,
        settext454513febProps,
        text4564580602,
        settext4564580602, 
        text4564580602Props,
        settext4564580602Props,
        icon234234e2c9a,
        seticon234234e2c9a, 
        icon234234e2c9aProps,
        seticon234234e2c9aProps,
        textwrwer0e4e1,
        settextwrwer0e4e1, 
        textwrwer0e4e1Props,
        settextwrwer0e4e1Props,
        textwerweraf6e8,
        settextwerweraf6e8, 
        textwerweraf6e8Props,
        settextwerweraf6e8Props,
        icon86986b1a3,
        seticon86986b1a3, 
        icon86986b1a3Props,
        seticon86986b1a3Props,
        text3457254757f70,
        settext3457254757f70, 
        text3457254757f70Props,
        settext3457254757f70Props,
        text2668f,
        settext2668f, 
        text2668fProps,
        settext2668fProps,
        back_button9eaea,
        setback_button9eaea, 
        back_button9eaeaProps,
        setback_button9eaeaProps,
        global_bank_text5cc81,
        setglobal_bank_text5cc81, 
        global_bank_text5cc81Props,
        setglobal_bank_text5cc81Props,
        total_calls_cardce82b,
        settotal_calls_cardce82b, 
        total_calls_cardce82bProps,
        settotal_calls_cardce82bProps,
        success_rate_card0eba7,
        setsuccess_rate_card0eba7, 
        success_rate_card0eba7Props,
        setsuccess_rate_card0eba7Props,
        error_rate_card9f823,
        seterror_rate_card9f823, 
        error_rate_card9f823Props,
        seterror_rate_card9f823Props,
        api_info_text692fd,
        setapi_info_text692fd, 
        api_info_text692fdProps,
        setapi_info_text692fdProps,
        api_name_textaccc0,
        setapi_name_textaccc0, 
        api_name_textaccc0Props,
        setapi_name_textaccc0Props,
        api_name_textinput4e4bf,
        setapi_name_textinput4e4bf, 
        api_name_textinput4e4bfProps,
        setapi_name_textinput4e4bfProps,
        version_text67538,
        setversion_text67538, 
        version_text67538Props,
        setversion_text67538Props,
        version_textinput19065,
        setversion_textinput19065, 
        version_textinput19065Props,
        setversion_textinput19065Props,
        status_text66555,
        setstatus_text66555, 
        status_text66555Props,
        setstatus_text66555Props,
        status_textinput62886,
        setstatus_textinput62886, 
        status_textinput62886Props,
        setstatus_textinput62886Props,
        categiry_text7520b,
        setcategiry_text7520b, 
        categiry_text7520bProps,
        setcategiry_text7520bProps,
        category_textinpute77d9,
        setcategory_textinpute77d9, 
        category_textinpute77d9Props,
        setcategory_textinpute77d9Props,
        date_text44a5e,
        setdate_text44a5e, 
        date_text44a5eProps,
        setdate_text44a5eProps,
        date_textinputb262e,
        setdate_textinputb262e, 
        date_textinputb262eProps,
        setdate_textinputb262eProps,
        path_textaf97a,
        setpath_textaf97a, 
        path_textaf97aProps,
        setpath_textaf97aProps,
        path_textinputec3d3,
        setpath_textinputec3d3, 
        path_textinputec3d3Props,
        setpath_textinputec3d3Props,
        rate_piechartbb394,
        setrate_piechartbb394, 
        rate_piechartbb394Props,
        setrate_piechartbb394Props,
        api_process_log_texte6f38,
        setapi_process_log_texte6f38, 
        api_process_log_texte6f38Props,
        setapi_process_log_texte6f38Props,
        timestampc53f0,
        settimestampc53f0, 
        timestampc53f0Props,
        settimestampc53f0Props,
        requestc5c44,
        setrequestc5c44, 
        requestc5c44Props,
        setrequestc5c44Props,
        response5db6d,
        setresponse5db6d, 
        response5db6dProps,
        setresponse5db6dProps,
        tob_consent_requestid32916,
        settob_consent_requestid32916, 
        tob_consent_requestid32916Props,
        settob_consent_requestid32916Props,
        view_logs8b253,
        setview_logs8b253, 
        view_logs8b253Props,
        setview_logs8b253Props,
        textfe486,
        settextfe486, 
        textfe486Props,
        settextfe486Props,
        request_consent_baseconsentid4221e,
        setrequest_consent_baseconsentid4221e, 
        request_consent_baseconsentid4221eProps,
        setrequest_consent_baseconsentid4221eProps,
        interactionid5cd91,
        setinteractionid5cd91, 
        interactionid5cd91Props,
        setinteractionid5cd91Props,
        request_consent_permissions1448d,
        setrequest_consent_permissions1448d, 
        request_consent_permissions1448dProps,
        setrequest_consent_permissions1448dProps,
        consentbody_data_revokedby6ede9,
        setconsentbody_data_revokedby6ede9, 
        consentbody_data_revokedby6ede9Props,
        setconsentbody_data_revokedby6ede9Props,
        request_consent_expiratriondatetime3ba51,
        setrequest_consent_expiratriondatetime3ba51, 
        request_consent_expiratriondatetime3ba51Props,
        setrequest_consent_expiratriondatetime3ba51Props,
        status61386,
        setstatus61386, 
        status61386Props,
        setstatus61386Props,
        dash_text814be,
        setdash_text814be, 
        dash_text814beProps,
        setdash_text814beProps,
        monthly_revenue_card0ab73,
        setmonthly_revenue_card0ab73, 
        monthly_revenue_card0ab73Props,
        setmonthly_revenue_card0ab73Props,
        monthly_icone201a,
        setmonthly_icone201a, 
        monthly_icone201aProps,
        setmonthly_icone201aProps,
        ytd_revenue_card19ac3,
        setytd_revenue_card19ac3, 
        ytd_revenue_card19ac3Props,
        setytd_revenue_card19ac3Props,
        ytd_icon346d8,
        setytd_icon346d8, 
        ytd_icon346d8Props,
        setytd_icon346d8Props,
        invoice_raised_card87b51,
        setinvoice_raised_card87b51, 
        invoice_raised_card87b51Props,
        setinvoice_raised_card87b51Props,
        invoice_icon43350,
        setinvoice_icon43350, 
        invoice_icon43350Props,
        setinvoice_icon43350Props,
        avg_revenue_tpp_card6eb26,
        setavg_revenue_tpp_card6eb26, 
        avg_revenue_tpp_card6eb26Props,
        setavg_revenue_tpp_card6eb26Props,
        tpp_icon1dafd,
        settpp_icon1dafd, 
        tpp_icon1dafdProps,
        settpp_icon1dafdProps,
        trend_text1634c,
        settrend_text1634c, 
        trend_text1634cProps,
        settrend_text1634cProps,
        group_barchart5116c,
        setgroup_barchart5116c, 
        group_barchart5116cProps,
        setgroup_barchart5116cProps,
        api_text0685a,
        setapi_text0685a, 
        api_text0685aProps,
        setapi_text0685aProps,
        piechart04991,
        setpiechart04991, 
        piechart04991Props,
        setpiechart04991Props,
        tpp_column0b7bb,
        settpp_column0b7bb, 
        tpp_column0b7bbProps,
        settpp_column0b7bbProps,
        amount_columnb4219,
        setamount_columnb4219, 
        amount_columnb4219Props,
        setamount_columnb4219Props,
        duedate_columne7d57,
        setduedate_columne7d57, 
        duedate_columne7d57Props,
        setduedate_columne7d57Props,
        status_columnc8f4d,
        setstatus_columnc8f4d, 
        status_columnc8f4dProps,
        setstatus_columnc8f4dProps,
        overage_textf2644,
        setoverage_textf2644, 
        overage_textf2644Props,
        setoverage_textf2644Props,
        single_barchart0a200,
        setsingle_barchart0a200, 
        single_barchart0a200Props,
        setsingle_barchart0a200Props,
        pricing_id_column2bf94,
        setpricing_id_column2bf94, 
        pricing_id_column2bf94Props,
        setpricing_id_column2bf94Props,
        monthly_fee_column42a75,
        setmonthly_fee_column42a75, 
        monthly_fee_column42a75Props,
        setmonthly_fee_column42a75Props,
        overage_rate_column50e70,
        setoverage_rate_column50e70, 
        overage_rate_column50e70Props,
        setoverage_rate_column50e70Props,
        tpps_column84964,
        settpps_column84964, 
        tpps_column84964Props,
        settpps_column84964Props,
        ////// screen states 
          apiusagedashboard_v1,
          setapiusagedashboard_v1,
          apiusagedashboard_v1Props,
          setapiusagedashboard_v1Props,
          viewapiinfo_v1,
          setviewapiinfo_v1,
          viewapiinfo_v1Props,
          setviewapiinfo_v1Props,
          viewapiconsentlog_v1,
          setviewapiconsentlog_v1,
          viewapiconsentlog_v1Props,
          setviewapiconsentlog_v1Props,
          monetizationdashboard_v1,
          setmonetizationdashboard_v1,
          monetizationdashboard_v1Props,
          setmonetizationdashboard_v1Props,
        //////////

        ///////// dfd
        dfd_tob_consent_request_ca_dfd_v1Props,
        setdfd_tob_consent_request_ca_dfd_v1Props,
        dfd_mongo_totalcalls_dfd_v1Props,
        setdfd_mongo_totalcalls_dfd_v1Props,
        dfd_mongo_api_repository_dfd_v1Props,
        setdfd_mongo_api_repository_dfd_v1Props,
        dfd_mongodb_api_process_logs_dfd_v1Props,
        setdfd_mongodb_api_process_logs_dfd_v1Props,
        dfd_mongo_pie_chart_dfd_v1Props,
        setdfd_mongo_pie_chart_dfd_v1Props,
        dfd_mongo_linechart_dfd_v1Props,
        setdfd_mongo_linechart_dfd_v1Props,
        dfd_tob_consents_request_dfd_v1Props,
        setdfd_tob_consents_request_dfd_v1Props,
        dfd_mongodb_maindashboard_dfd_v1Props,
        setdfd_mongodb_maindashboard_dfd_v1Props,
        dfd_tob_total_used_api_dfd_v1Props,
        setdfd_tob_total_used_api_dfd_v1Props,
        dfd_tob_mzdsh_totalcards_dfd_v1Props,
        setdfd_tob_mzdsh_totalcards_dfd_v1Props,
        dfd_tob_mzdsh_group_barchart_dfd_v1Props,
        setdfd_tob_mzdsh_group_barchart_dfd_v1Props,
        dfd_tob_mzdsh_piechart_dfd_v1Props,
        setdfd_tob_mzdsh_piechart_dfd_v1Props,
        dfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props,
        setdfd_tob_mzdsh_barchart_overagecharges_dfd_v1Props,
        dfd_tob_mzdsh_pricingtiertable_dfd_v1Props,
        setdfd_tob_mzdsh_pricingtiertable_dfd_v1Props,
        dfd_tob_mzdsh_invoice_table_dfd_v1Props,
        setdfd_tob_mzdsh_invoice_table_dfd_v1Props,
        refetch,
        setRefetch,
        searchParam,
        setSearchParam,
        disableParam,
        setDisableParam,
        globalState,
        setGlobalState,
        validate,
        setValidate,
        validateRefetch,
        setValidateRefetch,
        accessProfile,
        setAccessProfile,
        property,
        setProperty,
        setRefresh,
        refresh,
        memoryVariables,
        setMemoryVariables,
        lockedData,
        setLockedData,
        tableData,
        setTableData,
        paginationDetails,
        setpaginationDetails,
        eventEmitterData,
        setEventEmitterData,
        userDetails,
        setUserDetails,
        encAppFalg,
        setEncAppFalg
        }}
      >
      {children}
    </TotalContext.Provider>
  )
}

export default GlobalContext