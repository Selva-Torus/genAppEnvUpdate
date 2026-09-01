


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  tran_main_group1dc7f: any 
  settran_main_group1dc7f: React.Dispatch<React.SetStateAction<any>>
  tran_main_group1dc7fProps: any 
  settran_main_group1dc7fProps: React.Dispatch<React.SetStateAction<any>>
  tran_tab_group08b64: any 
  settran_tab_group08b64: React.Dispatch<React.SetStateAction<any>>
  tran_tab_group08b64Props: any 
  settran_tab_group08b64Props: React.Dispatch<React.SetStateAction<any>>
  view_all_tab4a963: any 
  setview_all_tab4a963: React.Dispatch<React.SetStateAction<any>>
  view_all_tab4a963Props: any 
  setview_all_tab4a963Props: React.Dispatch<React.SetStateAction<any>>
  view_all_tablec9e87: any 
  setview_all_tablec9e87: React.Dispatch<React.SetStateAction<any>>
  view_all_tablec9e87Props: any 
  setview_all_tablec9e87Props: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tab69f01: any 
  setfailure_queue_tab69f01: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tab69f01Props: any 
  setfailure_queue_tab69f01Props: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tablea476f: any 
  setfailure_queue_tablea476f: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tablea476fProps: any 
  setfailure_queue_tablea476fProps: React.Dispatch<React.SetStateAction<any>>
  success_queue_tabef582: any 
  setsuccess_queue_tabef582: React.Dispatch<React.SetStateAction<any>>
  success_queue_tabef582Props: any 
  setsuccess_queue_tabef582Props: React.Dispatch<React.SetStateAction<any>>
  success_queue_table63aae: any 
  setsuccess_queue_table63aae: React.Dispatch<React.SetStateAction<any>>
  success_queue_table63aaeProps: any 
  setsuccess_queue_table63aaeProps: React.Dispatch<React.SetStateAction<any>>
  return_queue_tab5611e: any 
  setreturn_queue_tab5611e: React.Dispatch<React.SetStateAction<any>>
  return_queue_tab5611eProps: any 
  setreturn_queue_tab5611eProps: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0: any 
  setreturn_queue_table267f0: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0Props: any 
  setreturn_queue_table267f0Props: React.Dispatch<React.SetStateAction<any>>
  main_group9066f: any 
  setmain_group9066f: React.Dispatch<React.SetStateAction<any>>
  main_group9066fProps: any 
  setmain_group9066fProps: React.Dispatch<React.SetStateAction<any>>
  tran_journey_group9eb2e: any 
  settran_journey_group9eb2e: React.Dispatch<React.SetStateAction<any>>
  tran_journey_group9eb2eProps: any 
  settran_journey_group9eb2eProps: React.Dispatch<React.SetStateAction<any>>
  journey_details_groupd9a0e: any 
  setjourney_details_groupd9a0e: React.Dispatch<React.SetStateAction<any>>
  journey_details_groupd9a0eProps: any 
  setjourney_details_groupd9a0eProps: React.Dispatch<React.SetStateAction<any>>
  tran_data_group84f25: any 
  settran_data_group84f25: React.Dispatch<React.SetStateAction<any>>
  tran_data_group84f25Props: any 
  settran_data_group84f25Props: React.Dispatch<React.SetStateAction<any>>
  req_data_group8d4d7: any 
  setreq_data_group8d4d7: React.Dispatch<React.SetStateAction<any>>
  req_data_group8d4d7Props: any 
  setreq_data_group8d4d7Props: React.Dispatch<React.SetStateAction<any>>
  res_data_group9d75a: any 
  setres_data_group9d75a: React.Dispatch<React.SetStateAction<any>>
  res_data_group9d75aProps: any 
  setres_data_group9d75aProps: React.Dispatch<React.SetStateAction<any>>
  gdb_group5384d: any 
  setgdb_group5384d: React.Dispatch<React.SetStateAction<any>>
  gdb_group5384dProps: any 
  setgdb_group5384dProps: React.Dispatch<React.SetStateAction<any>>
  tab_group65b41: any 
  settab_group65b41: React.Dispatch<React.SetStateAction<any>>
  tab_group65b41Props: any 
  settab_group65b41Props: React.Dispatch<React.SetStateAction<any>>
  tab_header04820: any 
  settab_header04820: React.Dispatch<React.SetStateAction<any>>
  tab_header04820Props: any 
  settab_header04820Props: React.Dispatch<React.SetStateAction<any>>
  tab_grpe63f4: any 
  settab_grpe63f4: React.Dispatch<React.SetStateAction<any>>
  tab_grpe63f4Props: any 
  settab_grpe63f4Props: React.Dispatch<React.SetStateAction<any>>
  transaction_group6c6f2: any 
  settransaction_group6c6f2: React.Dispatch<React.SetStateAction<any>>
  transaction_group6c6f2Props: any 
  settransaction_group6c6f2Props: React.Dispatch<React.SetStateAction<any>>
  total_value_group9d783: any 
  settotal_value_group9d783: React.Dispatch<React.SetStateAction<any>>
  total_value_group9d783Props: any 
  settotal_value_group9d783Props: React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_group7ad24: any 
  setonline_offline_processing_group7ad24: React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_group7ad24Props: any 
  setonline_offline_processing_group7ad24Props: React.Dispatch<React.SetStateAction<any>>
  bar_chart_group737a3: any 
  setbar_chart_group737a3: React.Dispatch<React.SetStateAction<any>>
  bar_chart_group737a3Props: any 
  setbar_chart_group737a3Props: React.Dispatch<React.SetStateAction<any>>
  pie_chart_group15067: any 
  setpie_chart_group15067: React.Dispatch<React.SetStateAction<any>>
  pie_chart_group15067Props: any 
  setpie_chart_group15067Props: React.Dispatch<React.SetStateAction<any>>
  transaction_tablef4f34: any 
  settransaction_tablef4f34: React.Dispatch<React.SetStateAction<any>>
  transaction_tablef4f34Props: any 
  settransaction_tablef4f34Props: React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5e076: any,
  setoutbound_or_inbound5e076:React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5e076Props: any 
  setoutbound_or_inbound5e076Props: React.Dispatch<React.SetStateAction<any>>
  searchcc244: any,
  setsearchcc244:React.Dispatch<React.SetStateAction<any>>
  searchcc244Props: any 
  setsearchcc244Props: React.Dispatch<React.SetStateAction<any>>
  refresh313d0: any,
  setrefresh313d0:React.Dispatch<React.SetStateAction<any>>
  refresh313d0Props: any 
  setrefresh313d0Props: React.Dispatch<React.SetStateAction<any>>
  downloadcb505: any,
  setdownloadcb505:React.Dispatch<React.SetStateAction<any>>
  downloadcb505Props: any 
  setdownloadcb505Props: React.Dispatch<React.SetStateAction<any>>
  product_code_view_allb0df6: any,
  setproduct_code_view_allb0df6:React.Dispatch<React.SetStateAction<any>>
  product_code_view_allb0df6Props: any 
  setproduct_code_view_allb0df6Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_view_all33724: any,
  setchannel_name_view_all33724:React.Dispatch<React.SetStateAction<any>>
  channel_name_view_all33724Props: any 
  setchannel_name_view_all33724Props: React.Dispatch<React.SetStateAction<any>>
  uuid_view_allc0a46: any,
  setuuid_view_allc0a46:React.Dispatch<React.SetStateAction<any>>
  uuid_view_allc0a46Props: any 
  setuuid_view_allc0a46Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_view_all54da6: any,
  setdr_account_view_all54da6:React.Dispatch<React.SetStateAction<any>>
  dr_account_view_all54da6Props: any 
  setdr_account_view_all54da6Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_view_all88d6b: any,
  setdr_amount_view_all88d6b:React.Dispatch<React.SetStateAction<any>>
  dr_amount_view_all88d6bProps: any 
  setdr_amount_view_all88d6bProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alld4b39: any,
  setcr_account_view_alld4b39:React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alld4b39Props: any 
  setcr_account_view_alld4b39Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all19d14: any,
  setcr_amount_view_all19d14:React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all19d14Props: any 
  setcr_amount_view_all19d14Props: React.Dispatch<React.SetStateAction<any>>
  remittance_info_view_all82afd: any,
  setremittance_info_view_all82afd:React.Dispatch<React.SetStateAction<any>>
  remittance_info_view_all82afdProps: any 
  setremittance_info_view_all82afdProps: React.Dispatch<React.SetStateAction<any>>
  status_view_all47e6b: any,
  setstatus_view_all47e6b:React.Dispatch<React.SetStateAction<any>>
  status_view_all47e6bProps: any 
  setstatus_view_all47e6bProps: React.Dispatch<React.SetStateAction<any>>
  log_btnfe134: any,
  setlog_btnfe134:React.Dispatch<React.SetStateAction<any>>
  log_btnfe134Props: any 
  setlog_btnfe134Props: React.Dispatch<React.SetStateAction<any>>
  product_code_failure_queue12297: any,
  setproduct_code_failure_queue12297:React.Dispatch<React.SetStateAction<any>>
  product_code_failure_queue12297Props: any 
  setproduct_code_failure_queue12297Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_failure_queue42953: any,
  setchannel_name_failure_queue42953:React.Dispatch<React.SetStateAction<any>>
  channel_name_failure_queue42953Props: any 
  setchannel_name_failure_queue42953Props: React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queue03c86: any,
  setuuid_failure_queue03c86:React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queue03c86Props: any 
  setuuid_failure_queue03c86Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_failure_queuef9d2d: any,
  setdr_account_failure_queuef9d2d:React.Dispatch<React.SetStateAction<any>>
  dr_account_failure_queuef9d2dProps: any 
  setdr_account_failure_queuef9d2dProps: React.Dispatch<React.SetStateAction<any>>
  dr_amount_failure_queue95d4e: any,
  setdr_amount_failure_queue95d4e:React.Dispatch<React.SetStateAction<any>>
  dr_amount_failure_queue95d4eProps: any 
  setdr_amount_failure_queue95d4eProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_failure_queuea7246: any,
  setcr_account_failure_queuea7246:React.Dispatch<React.SetStateAction<any>>
  cr_account_failure_queuea7246Props: any 
  setcr_account_failure_queuea7246Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_failure_queue57c4d: any,
  setcr_amount_failure_queue57c4d:React.Dispatch<React.SetStateAction<any>>
  cr_amount_failure_queue57c4dProps: any 
  setcr_amount_failure_queue57c4dProps: React.Dispatch<React.SetStateAction<any>>
  remittance_info_failure_queue09d7a: any,
  setremittance_info_failure_queue09d7a:React.Dispatch<React.SetStateAction<any>>
  remittance_info_failure_queue09d7aProps: any 
  setremittance_info_failure_queue09d7aProps: React.Dispatch<React.SetStateAction<any>>
  status_failure_queue0aef8: any,
  setstatus_failure_queue0aef8:React.Dispatch<React.SetStateAction<any>>
  status_failure_queue0aef8Props: any 
  setstatus_failure_queue0aef8Props: React.Dispatch<React.SetStateAction<any>>
  product_code_success_queue7c209: any,
  setproduct_code_success_queue7c209:React.Dispatch<React.SetStateAction<any>>
  product_code_success_queue7c209Props: any 
  setproduct_code_success_queue7c209Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_success_queueeddaf: any,
  setchannel_name_success_queueeddaf:React.Dispatch<React.SetStateAction<any>>
  channel_name_success_queueeddafProps: any 
  setchannel_name_success_queueeddafProps: React.Dispatch<React.SetStateAction<any>>
  uuid_success_queuec805b: any,
  setuuid_success_queuec805b:React.Dispatch<React.SetStateAction<any>>
  uuid_success_queuec805bProps: any 
  setuuid_success_queuec805bProps: React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending10a49: any,
  setdr_account_operational_pending10a49:React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending10a49Props: any 
  setdr_account_operational_pending10a49Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_success_queueda254: any,
  setdr_amount_success_queueda254:React.Dispatch<React.SetStateAction<any>>
  dr_amount_success_queueda254Props: any 
  setdr_amount_success_queueda254Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_success_queue60480: any,
  setcr_account_success_queue60480:React.Dispatch<React.SetStateAction<any>>
  cr_account_success_queue60480Props: any 
  setcr_account_success_queue60480Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_success_queueb80d4: any,
  setcr_amount_success_queueb80d4:React.Dispatch<React.SetStateAction<any>>
  cr_amount_success_queueb80d4Props: any 
  setcr_amount_success_queueb80d4Props: React.Dispatch<React.SetStateAction<any>>
  remittance_info_success_queue2f950: any,
  setremittance_info_success_queue2f950:React.Dispatch<React.SetStateAction<any>>
  remittance_info_success_queue2f950Props: any 
  setremittance_info_success_queue2f950Props: React.Dispatch<React.SetStateAction<any>>
  status_success_queue019a2: any,
  setstatus_success_queue019a2:React.Dispatch<React.SetStateAction<any>>
  status_success_queue019a2Props: any 
  setstatus_success_queue019a2Props: React.Dispatch<React.SetStateAction<any>>
  product_code_return_queuee5e11: any,
  setproduct_code_return_queuee5e11:React.Dispatch<React.SetStateAction<any>>
  product_code_return_queuee5e11Props: any 
  setproduct_code_return_queuee5e11Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_return_queuebdabb: any,
  setchannel_name_return_queuebdabb:React.Dispatch<React.SetStateAction<any>>
  channel_name_return_queuebdabbProps: any 
  setchannel_name_return_queuebdabbProps: React.Dispatch<React.SetStateAction<any>>
  uuid_return_queue958c9: any,
  setuuid_return_queue958c9:React.Dispatch<React.SetStateAction<any>>
  uuid_return_queue958c9Props: any 
  setuuid_return_queue958c9Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_return_queuee94b2: any,
  setdr_account_return_queuee94b2:React.Dispatch<React.SetStateAction<any>>
  dr_account_return_queuee94b2Props: any 
  setdr_account_return_queuee94b2Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_return_queue2f324: any,
  setdr_amount_return_queue2f324:React.Dispatch<React.SetStateAction<any>>
  dr_amount_return_queue2f324Props: any 
  setdr_amount_return_queue2f324Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_return_queue21a57: any,
  setcr_account_return_queue21a57:React.Dispatch<React.SetStateAction<any>>
  cr_account_return_queue21a57Props: any 
  setcr_account_return_queue21a57Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_return_queue13fec: any,
  setcr_amount_return_queue13fec:React.Dispatch<React.SetStateAction<any>>
  cr_amount_return_queue13fecProps: any 
  setcr_amount_return_queue13fecProps: React.Dispatch<React.SetStateAction<any>>
  remittance_info_return_queuef37f7: any,
  setremittance_info_return_queuef37f7:React.Dispatch<React.SetStateAction<any>>
  remittance_info_return_queuef37f7Props: any 
  setremittance_info_return_queuef37f7Props: React.Dispatch<React.SetStateAction<any>>
  status_return_queue95903: any,
  setstatus_return_queue95903:React.Dispatch<React.SetStateAction<any>>
  status_return_queue95903Props: any 
  setstatus_return_queue95903Props: React.Dispatch<React.SetStateAction<any>>
  divider_top0354b: any,
  setdivider_top0354b:React.Dispatch<React.SetStateAction<any>>
  divider_top0354bProps: any 
  setdivider_top0354bProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date2cea8: any,
  settrs_created_date2cea8:React.Dispatch<React.SetStateAction<any>>
  trs_created_date2cea8Props: any 
  settrs_created_date2cea8Props: React.Dispatch<React.SetStateAction<any>>
  debtor_account_no963e4: any,
  setdebtor_account_no963e4:React.Dispatch<React.SetStateAction<any>>
  debtor_account_no963e4Props: any 
  setdebtor_account_no963e4Props: React.Dispatch<React.SetStateAction<any>>
  debtor_namee2d9f: any,
  setdebtor_namee2d9f:React.Dispatch<React.SetStateAction<any>>
  debtor_namee2d9fProps: any 
  setdebtor_namee2d9fProps: React.Dispatch<React.SetStateAction<any>>
  creditor_account_noca692: any,
  setcreditor_account_noca692:React.Dispatch<React.SetStateAction<any>>
  creditor_account_noca692Props: any 
  setcreditor_account_noca692Props: React.Dispatch<React.SetStateAction<any>>
  payment_currency703d2: any,
  setpayment_currency703d2:React.Dispatch<React.SetStateAction<any>>
  payment_currency703d2Props: any 
  setpayment_currency703d2Props: React.Dispatch<React.SetStateAction<any>>
  payment_amount042b1: any,
  setpayment_amount042b1:React.Dispatch<React.SetStateAction<any>>
  payment_amount042b1Props: any 
  setpayment_amount042b1Props: React.Dispatch<React.SetStateAction<any>>
  uuid29c9f: any,
  setuuid29c9f:React.Dispatch<React.SetStateAction<any>>
  uuid29c9fProps: any 
  setuuid29c9fProps: React.Dispatch<React.SetStateAction<any>>
  channel26e83: any,
  setchannel26e83:React.Dispatch<React.SetStateAction<any>>
  channel26e83Props: any 
  setchannel26e83Props: React.Dispatch<React.SetStateAction<any>>
  processstatus134a1: any,
  setprocessstatus134a1:React.Dispatch<React.SetStateAction<any>>
  processstatus134a1Props: any 
  setprocessstatus134a1Props: React.Dispatch<React.SetStateAction<any>>
  status4bd75: any,
  setstatus4bd75:React.Dispatch<React.SetStateAction<any>>
  status4bd75Props: any 
  setstatus4bd75Props: React.Dispatch<React.SetStateAction<any>>
  divider_bottom72ab5: any,
  setdivider_bottom72ab5:React.Dispatch<React.SetStateAction<any>>
  divider_bottom72ab5Props: any 
  setdivider_bottom72ab5Props: React.Dispatch<React.SetStateAction<any>>
  search0e695: any,
  setsearch0e695:React.Dispatch<React.SetStateAction<any>>
  search0e695Props: any 
  setsearch0e695Props: React.Dispatch<React.SetStateAction<any>>
  cleareddfa: any,
  setcleareddfa:React.Dispatch<React.SetStateAction<any>>
  cleareddfaProps: any 
  setcleareddfaProps: React.Dispatch<React.SetStateAction<any>>
  tran_journey1602a: any,
  settran_journey1602a:React.Dispatch<React.SetStateAction<any>>
  tran_journey1602aProps: any 
  settran_journey1602aProps: React.Dispatch<React.SetStateAction<any>>
  divider_tope6917: any,
  setdivider_tope6917:React.Dispatch<React.SetStateAction<any>>
  divider_tope6917Props: any 
  setdivider_tope6917Props: React.Dispatch<React.SetStateAction<any>>
  transaction_date_time_label669d7: any,
  settransaction_date_time_label669d7:React.Dispatch<React.SetStateAction<any>>
  transaction_date_time_label669d7Props: any 
  settransaction_date_time_label669d7Props: React.Dispatch<React.SetStateAction<any>>
  status_labelf3713: any,
  setstatus_labelf3713:React.Dispatch<React.SetStateAction<any>>
  status_labelf3713Props: any 
  setstatus_labelf3713Props: React.Dispatch<React.SetStateAction<any>>
  transaction_date_time14856: any,
  settransaction_date_time14856:React.Dispatch<React.SetStateAction<any>>
  transaction_date_time14856Props: any 
  settransaction_date_time14856Props: React.Dispatch<React.SetStateAction<any>>
  status88bc7: any,
  setstatus88bc7:React.Dispatch<React.SetStateAction<any>>
  status88bc7Props: any 
  setstatus88bc7Props: React.Dispatch<React.SetStateAction<any>>
  processed_by_label542e8: any,
  setprocessed_by_label542e8:React.Dispatch<React.SetStateAction<any>>
  processed_by_label542e8Props: any 
  setprocessed_by_label542e8Props: React.Dispatch<React.SetStateAction<any>>
  debit_account_label3b1b7: any,
  setdebit_account_label3b1b7:React.Dispatch<React.SetStateAction<any>>
  debit_account_label3b1b7Props: any 
  setdebit_account_label3b1b7Props: React.Dispatch<React.SetStateAction<any>>
  processed_byd2b69: any,
  setprocessed_byd2b69:React.Dispatch<React.SetStateAction<any>>
  processed_byd2b69Props: any 
  setprocessed_byd2b69Props: React.Dispatch<React.SetStateAction<any>>
  debit_account36b40: any,
  setdebit_account36b40:React.Dispatch<React.SetStateAction<any>>
  debit_account36b40Props: any 
  setdebit_account36b40Props: React.Dispatch<React.SetStateAction<any>>
  currency_labele21ba: any,
  setcurrency_labele21ba:React.Dispatch<React.SetStateAction<any>>
  currency_labele21baProps: any 
  setcurrency_labele21baProps: React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7b: any,
  setcredit_account_label65c7b:React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7bProps: any 
  setcredit_account_label65c7bProps: React.Dispatch<React.SetStateAction<any>>
  currency9c8a2: any,
  setcurrency9c8a2:React.Dispatch<React.SetStateAction<any>>
  currency9c8a2Props: any 
  setcurrency9c8a2Props: React.Dispatch<React.SetStateAction<any>>
  credit_account0d1f4: any,
  setcredit_account0d1f4:React.Dispatch<React.SetStateAction<any>>
  credit_account0d1f4Props: any 
  setcredit_account0d1f4Props: React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725: any,
  setamount_labelfd725:React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725Props: any 
  setamount_labelfd725Props: React.Dispatch<React.SetStateAction<any>>
  transaction_reference_labelb1ca9: any,
  settransaction_reference_labelb1ca9:React.Dispatch<React.SetStateAction<any>>
  transaction_reference_labelb1ca9Props: any 
  settransaction_reference_labelb1ca9Props: React.Dispatch<React.SetStateAction<any>>
  amount01416: any,
  setamount01416:React.Dispatch<React.SetStateAction<any>>
  amount01416Props: any 
  setamount01416Props: React.Dispatch<React.SetStateAction<any>>
  transaction_reference500d6: any,
  settransaction_reference500d6:React.Dispatch<React.SetStateAction<any>>
  transaction_reference500d6Props: any 
  settransaction_reference500d6Props: React.Dispatch<React.SetStateAction<any>>
  divider_bottom8bad5: any,
  setdivider_bottom8bad5:React.Dispatch<React.SetStateAction<any>>
  divider_bottom8bad5Props: any 
  setdivider_bottom8bad5Props: React.Dispatch<React.SetStateAction<any>>
  view_msg_data_btne6a88: any,
  setview_msg_data_btne6a88:React.Dispatch<React.SetStateAction<any>>
  view_msg_data_btne6a88Props: any 
  setview_msg_data_btne6a88Props: React.Dispatch<React.SetStateAction<any>>
  view_tran_log_btn9cd8c: any,
  setview_tran_log_btn9cd8c:React.Dispatch<React.SetStateAction<any>>
  view_tran_log_btn9cd8cProps: any 
  setview_tran_log_btn9cd8cProps: React.Dispatch<React.SetStateAction<any>>
  divider_topf46a0: any,
  setdivider_topf46a0:React.Dispatch<React.SetStateAction<any>>
  divider_topf46a0Props: any 
  setdivider_topf46a0Props: React.Dispatch<React.SetStateAction<any>>
  xmlviewer9fe8d: any,
  setxmlviewer9fe8d:React.Dispatch<React.SetStateAction<any>>
  xmlviewer9fe8dProps: any 
  setxmlviewer9fe8dProps: React.Dispatch<React.SetStateAction<any>>
  divider_bottom6920d: any,
  setdivider_bottom6920d:React.Dispatch<React.SetStateAction<any>>
  divider_bottom6920dProps: any 
  setdivider_bottom6920dProps: React.Dispatch<React.SetStateAction<any>>
  cancel_btn5e840: any,
  setcancel_btn5e840:React.Dispatch<React.SetStateAction<any>>
  cancel_btn5e840Props: any 
  setcancel_btn5e840Props: React.Dispatch<React.SetStateAction<any>>
  req_jsonviewerc80ab: any,
  setreq_jsonviewerc80ab:React.Dispatch<React.SetStateAction<any>>
  req_jsonviewerc80abProps: any 
  setreq_jsonviewerc80abProps: React.Dispatch<React.SetStateAction<any>>
  res_jsonviewer9d6d1: any,
  setres_jsonviewer9d6d1:React.Dispatch<React.SetStateAction<any>>
  res_jsonviewer9d6d1Props: any 
  setres_jsonviewer9d6d1Props: React.Dispatch<React.SetStateAction<any>>
  product_combobox7ef64: any,
  setproduct_combobox7ef64:React.Dispatch<React.SetStateAction<any>>
  product_combobox7ef64Props: any 
  setproduct_combobox7ef64Props: React.Dispatch<React.SetStateAction<any>>
  channel_combobox95649: any,
  setchannel_combobox95649:React.Dispatch<React.SetStateAction<any>>
  channel_combobox95649Props: any 
  setchannel_combobox95649Props: React.Dispatch<React.SetStateAction<any>>
  currency_comboboxfbbfc: any,
  setcurrency_comboboxfbbfc:React.Dispatch<React.SetStateAction<any>>
  currency_comboboxfbbfcProps: any 
  setcurrency_comboboxfbbfcProps: React.Dispatch<React.SetStateAction<any>>
  process_category_comboboxbb731: any,
  setprocess_category_comboboxbb731:React.Dispatch<React.SetStateAction<any>>
  process_category_comboboxbb731Props: any 
  setprocess_category_comboboxbb731Props: React.Dispatch<React.SetStateAction<any>>
  offline_online_combobox88add: any,
  setoffline_online_combobox88add:React.Dispatch<React.SetStateAction<any>>
  offline_online_combobox88addProps: any 
  setoffline_online_combobox88addProps: React.Dispatch<React.SetStateAction<any>>
  key_matrics54124: any,
  setkey_matrics54124:React.Dispatch<React.SetStateAction<any>>
  key_matrics54124Props: any 
  setkey_matrics54124Props: React.Dispatch<React.SetStateAction<any>>
  product_icon07465: any,
  setproduct_icon07465:React.Dispatch<React.SetStateAction<any>>
  product_icon07465Props: any 
  setproduct_icon07465Props: React.Dispatch<React.SetStateAction<any>>
  transactions_labelf64b1: any,
  settransactions_labelf64b1:React.Dispatch<React.SetStateAction<any>>
  transactions_labelf64b1Props: any 
  settransactions_labelf64b1Props: React.Dispatch<React.SetStateAction<any>>
  transaction_countc3fd5: any,
  settransaction_countc3fd5:React.Dispatch<React.SetStateAction<any>>
  transaction_countc3fd5Props: any 
  settransaction_countc3fd5Props: React.Dispatch<React.SetStateAction<any>>
  total_value_icon16d5d: any,
  settotal_value_icon16d5d:React.Dispatch<React.SetStateAction<any>>
  total_value_icon16d5dProps: any 
  settotal_value_icon16d5dProps: React.Dispatch<React.SetStateAction<any>>
  total_value_labeld1dce: any,
  settotal_value_labeld1dce:React.Dispatch<React.SetStateAction<any>>
  total_value_labeld1dceProps: any 
  settotal_value_labeld1dceProps: React.Dispatch<React.SetStateAction<any>>
  total_amount94c0b: any,
  settotal_amount94c0b:React.Dispatch<React.SetStateAction<any>>
  total_amount94c0bProps: any 
  settotal_amount94c0bProps: React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_icon87fd3: any,
  setonline_offline_processing_icon87fd3:React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_icon87fd3Props: any 
  setonline_offline_processing_icon87fd3Props: React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_label9cdc2: any,
  setonline_offline_processing_label9cdc2:React.Dispatch<React.SetStateAction<any>>
  online_offline_processing_label9cdc2Props: any 
  setonline_offline_processing_label9cdc2Props: React.Dispatch<React.SetStateAction<any>>
  online_offline_process41265: any,
  setonline_offline_process41265:React.Dispatch<React.SetStateAction<any>>
  online_offline_process41265Props: any 
  setonline_offline_process41265Props: React.Dispatch<React.SetStateAction<any>>
  transaction_volume_by_channel2b08e: any,
  settransaction_volume_by_channel2b08e:React.Dispatch<React.SetStateAction<any>>
  transaction_volume_by_channel2b08eProps: any 
  settransaction_volume_by_channel2b08eProps: React.Dispatch<React.SetStateAction<any>>
  barchart84262: any,
  setbarchart84262:React.Dispatch<React.SetStateAction<any>>
  barchart84262Props: any 
  setbarchart84262Props: React.Dispatch<React.SetStateAction<any>>
  product_organation_label2e07d: any,
  setproduct_organation_label2e07d:React.Dispatch<React.SetStateAction<any>>
  product_organation_label2e07dProps: any 
  setproduct_organation_label2e07dProps: React.Dispatch<React.SetStateAction<any>>
  piechart9dde7: any,
  setpiechart9dde7:React.Dispatch<React.SetStateAction<any>>
  piechart9dde7Props: any 
  setpiechart9dde7Props: React.Dispatch<React.SetStateAction<any>>
  transaction_table_label9d37f: any,
  settransaction_table_label9d37f:React.Dispatch<React.SetStateAction<any>>
  transaction_table_label9d37fProps: any 
  settransaction_table_label9d37fProps: React.Dispatch<React.SetStateAction<any>>
  value_date26f4c: any,
  setvalue_date26f4c:React.Dispatch<React.SetStateAction<any>>
  value_date26f4cProps: any 
  setvalue_date26f4cProps: React.Dispatch<React.SetStateAction<any>>
  dr_accounte2a30: any,
  setdr_accounte2a30:React.Dispatch<React.SetStateAction<any>>
  dr_accounte2a30Props: any 
  setdr_accounte2a30Props: React.Dispatch<React.SetStateAction<any>>
  dr_name59632: any,
  setdr_name59632:React.Dispatch<React.SetStateAction<any>>
  dr_name59632Props: any 
  setdr_name59632Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency39803: any,
  setdr_currency39803:React.Dispatch<React.SetStateAction<any>>
  dr_currency39803Props: any 
  setdr_currency39803Props: React.Dispatch<React.SetStateAction<any>>
  dr_amountc3a1f: any,
  setdr_amountc3a1f:React.Dispatch<React.SetStateAction<any>>
  dr_amountc3a1fProps: any 
  setdr_amountc3a1fProps: React.Dispatch<React.SetStateAction<any>>
  cr_accountcf8bb: any,
  setcr_accountcf8bb:React.Dispatch<React.SetStateAction<any>>
  cr_accountcf8bbProps: any 
  setcr_accountcf8bbProps: React.Dispatch<React.SetStateAction<any>>
  cr_name8be31: any,
  setcr_name8be31:React.Dispatch<React.SetStateAction<any>>
  cr_name8be31Props: any 
  setcr_name8be31Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency5fe15: any,
  setcr_currency5fe15:React.Dispatch<React.SetStateAction<any>>
  cr_currency5fe15Props: any 
  setcr_currency5fe15Props: React.Dispatch<React.SetStateAction<any>>
  cr_amounta66de: any,
  setcr_amounta66de:React.Dispatch<React.SetStateAction<any>>
  cr_amounta66deProps: any 
  setcr_amounta66deProps: React.Dispatch<React.SetStateAction<any>>
  uuid9822d: any,
  setuuid9822d:React.Dispatch<React.SetStateAction<any>>
  uuid9822dProps: any 
  setuuid9822dProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  transaction_v1: any 
  settransaction_v1: React.Dispatch<React.SetStateAction<any>>
  transaction_v1Props: any 
  settransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1: any 
  settransactionsearch_v1: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1Props: any 
  settransactionsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionjourney_v1: any 
  settransactionjourney_v1: React.Dispatch<React.SetStateAction<any>>
  transactionjourney_v1Props: any 
  settransactionjourney_v1Props: React.Dispatch<React.SetStateAction<any>>
  tranjourneydetails_v1: any 
  settranjourneydetails_v1: React.Dispatch<React.SetStateAction<any>>
  tranjourneydetails_v1Props: any 
  settranjourneydetails_v1Props: React.Dispatch<React.SetStateAction<any>>
  messagedataview_v1: any 
  setmessagedataview_v1: React.Dispatch<React.SetStateAction<any>>
  messagedataview_v1Props: any 
  setmessagedataview_v1Props: React.Dispatch<React.SetStateAction<any>>
  trandataview_v1: any 
  settrandataview_v1: React.Dispatch<React.SetStateAction<any>>
  trandataview_v1Props: any 
  settrandataview_v1Props: React.Dispatch<React.SetStateAction<any>>
  globaldashboard_v1: any 
  setglobaldashboard_v1: React.Dispatch<React.SetStateAction<any>>
  globaldashboard_v1Props: any 
  setglobaldashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_combocurrencysearch_v1Props: any 
  setdfd_combocurrencysearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transaction_v1Props: any 
  setdfd_transaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_processstatuscombosearch_v1Props: any 
  setdfd_processstatuscombosearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelcombosearch_v1Props: any 
  setdfd_channelcombosearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_journey_v1Props: any 
  setdfd_journey_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_productdashboard_v1Props: any 
  setdfd_productdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channeldashboard_v1Props: any 
  setdfd_channeldashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_currencydashboard_v1Props: any 
  setdfd_currencydashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_onlineofflinedashboard_v1Props: any 
  setdfd_onlineofflinedashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_processcategorydashboard_v1Props: any 
  setdfd_processcategorydashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transactioncountvphdashboard_v1Props: any 
  setdfd_transactioncountvphdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelcountvphdashboard_v1Props: any 
  setdfd_channelcountvphdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelchartdashboard_v1Props: any 
  setdfd_channelchartdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_productchartdashboard_v1Props: any 
  setdfd_productchartdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_onlineofflinecountvphdashboard_v1Props: any 
  setdfd_onlineofflinecountvphdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [tran_main_group1dc7f, settran_main_group1dc7f ] = React.useState<any>({}) 
    const [tran_main_group1dc7fProps, settran_main_group1dc7fProps ] = React.useState<any>({
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
        const [tran_tab_group08b64, settran_tab_group08b64 ] = React.useState<any>({}) 
    const [tran_tab_group08b64Props, settran_tab_group08b64Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "outbound_or_inbound",
            "search",
            "refresh",
            "download",
      ]
      }) 
        const [view_all_tab4a963, setview_all_tab4a963 ] = React.useState<any>({}) 
    const [view_all_tab4a963Props, setview_all_tab4a963Props ] = React.useState<any>({
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
    
    const [view_all_tablec9e87, setview_all_tablec9e87 ] = React.useState<any>([]) 
    const [view_all_tablec9e87Props, setview_all_tablec9e87Props ] = React.useState<any>({
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
        const [failure_queue_tab69f01, setfailure_queue_tab69f01 ] = React.useState<any>({}) 
    const [failure_queue_tab69f01Props, setfailure_queue_tab69f01Props ] = React.useState<any>({
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
    
    const [failure_queue_tablea476f, setfailure_queue_tablea476f ] = React.useState<any>([]) 
    const [failure_queue_tablea476fProps, setfailure_queue_tablea476fProps ] = React.useState<any>({
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
        const [success_queue_tabef582, setsuccess_queue_tabef582 ] = React.useState<any>({}) 
    const [success_queue_tabef582Props, setsuccess_queue_tabef582Props ] = React.useState<any>({
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
    
    const [success_queue_table63aae, setsuccess_queue_table63aae ] = React.useState<any>([]) 
    const [success_queue_table63aaeProps, setsuccess_queue_table63aaeProps ] = React.useState<any>({
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
        const [return_queue_tab5611e, setreturn_queue_tab5611e ] = React.useState<any>({}) 
    const [return_queue_tab5611eProps, setreturn_queue_tab5611eProps ] = React.useState<any>({
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
    
    const [return_queue_table267f0, setreturn_queue_table267f0 ] = React.useState<any>([]) 
    const [return_queue_table267f0Props, setreturn_queue_table267f0Props ] = React.useState<any>({
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
        const [main_group9066f, setmain_group9066f ] = React.useState<any>({}) 
    const [main_group9066fProps, setmain_group9066fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "payment_currency",
            "payment_currency",
            "dr_amount",
            "uuid",
            "channel",
            "channel",
            "processstatus",
            "processstatus",
            "trs_status",
            "divider_bottom",
            "search",
            "clear",
      ]
      }) 
        const [tran_journey_group9eb2e, settran_journey_group9eb2e ] = React.useState<any>({}) 
    const [tran_journey_group9eb2eProps, settran_journey_group9eb2eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "vgphstm_uuid",
      ]
      }) 
        const [journey_details_groupd9a0e, setjourney_details_groupd9a0e ] = React.useState<any>({}) 
    const [journey_details_groupd9a0eProps, setjourney_details_groupd9a0eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "transaction_date_time_label",
            "status_label",
            "trs_created_date",
            "result",
            "processed_by_label",
            "debit_account_label",
            "processing_system",
            "dr_account",
            "currency_label",
            "credit_account_label",
            "dr_currency",
            "cr_account",
            "amount_label",
            "transaction_reference_label",
            "dr_amount",
            "tran_reference",
            "divider_bottom",
            "view_msg_data_btn",
            "view_tran_log_btn",
      ]
      }) 
        const [tran_data_group84f25, settran_data_group84f25 ] = React.useState<any>({}) 
    const [tran_data_group84f25Props, settran_data_group84f25Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "divider_bottom",
            "cancel_btn",
      ]
      }) 
        const [req_data_group8d4d7, setreq_data_group8d4d7 ] = React.useState<any>({}) 
    const [req_data_group8d4d7Props, setreq_data_group8d4d7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "request_data",
      ]
      }) 
        const [res_data_group9d75a, setres_data_group9d75a ] = React.useState<any>({}) 
    const [res_data_group9d75aProps, setres_data_group9d75aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "response_data",
      ]
      }) 
        const [gdb_group5384d, setgdb_group5384d ] = React.useState<any>({}) 
    const [gdb_group5384dProps, setgdb_group5384dProps ] = React.useState<any>({
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
        const [tab_group65b41, settab_group65b41 ] = React.useState<any>({}) 
    const [tab_group65b41Props, settab_group65b41Props ] = React.useState<any>({
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
        const [tab_header04820, settab_header04820 ] = React.useState<any>({}) 
    const [tab_header04820Props, settab_header04820Props ] = React.useState<any>({
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
        const [tab_grpe63f4, settab_grpe63f4 ] = React.useState<any>({}) 
    const [tab_grpe63f4Props, settab_grpe63f4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_combobox",
            "product_combobox",
            "channel_combobox",
            "channel_combobox",
            "currency_combobox",
            "currency_combobox",
            "process_category_combobox",
            "process_category_combobox",
            "offline_online_combobox",
            "offline_online_combobox",
            "key_matrics",
            "transaction_table_label",
      ]
      }) 
        const [transaction_group6c6f2, settransaction_group6c6f2 ] = React.useState<any>({}) 
    const [transaction_group6c6f2Props, settransaction_group6c6f2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_icon",
            "transactions_label",
            "total_count",
      ]
      }) 
        const [total_value_group9d783, settotal_value_group9d783 ] = React.useState<any>({}) 
    const [total_value_group9d783Props, settotal_value_group9d783Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_value_icon",
            "total_value_label",
            "total_value",
      ]
      }) 
        const [online_offline_processing_group7ad24, setonline_offline_processing_group7ad24 ] = React.useState<any>({}) 
    const [online_offline_processing_group7ad24Props, setonline_offline_processing_group7ad24Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "online_offline_processing_icon",
            "online_offline_processing_label",
            "total_count",
      ]
      }) 
        const [bar_chart_group737a3, setbar_chart_group737a3 ] = React.useState<any>({}) 
    const [bar_chart_group737a3Props, setbar_chart_group737a3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "transaction_volume_by_channel",
            "name",
      ]
      }) 
        const [pie_chart_group15067, setpie_chart_group15067 ] = React.useState<any>({}) 
    const [pie_chart_group15067Props, setpie_chart_group15067Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_organation_label",
            "name",
      ]
      }) 
    
    const [transaction_tablef4f34, settransaction_tablef4f34 ] = React.useState<any>([]) 
    const [transaction_tablef4f34Props, settransaction_tablef4f34Props ] = React.useState<any>({
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
   const [outbound_or_inbound5e076,setoutbound_or_inbound5e076] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [outbound_or_inbound5e076Props,setoutbound_or_inbound5e076Props] = React.useState<any>({}) 
   const [searchcc244,setsearchcc244] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [searchcc244Props,setsearchcc244Props] = React.useState<any>({}) 
   const [refresh313d0,setrefresh313d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [refresh313d0Props,setrefresh313d0Props] = React.useState<any>({}) 
   const [downloadcb505,setdownloadcb505] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [downloadcb505Props,setdownloadcb505Props] = React.useState<any>({}) 
   const [product_code_view_allb0df6,setproduct_code_view_allb0df6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_view_allb0df6Props,setproduct_code_view_allb0df6Props] = React.useState<any>({}) 
   const [channel_name_view_all33724,setchannel_name_view_all33724] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel_name_view_all33724Props,setchannel_name_view_all33724Props] = React.useState<any>({}) 
   const [uuid_view_allc0a46,setuuid_view_allc0a46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_view_allc0a46Props,setuuid_view_allc0a46Props] = React.useState<any>({}) 
   const [dr_account_view_all54da6,setdr_account_view_all54da6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_view_all54da6Props,setdr_account_view_all54da6Props] = React.useState<any>({}) 
   const [dr_amount_view_all88d6b,setdr_amount_view_all88d6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_view_all88d6bProps,setdr_amount_view_all88d6bProps] = React.useState<any>({}) 
   const [cr_account_view_alld4b39,setcr_account_view_alld4b39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_view_alld4b39Props,setcr_account_view_alld4b39Props] = React.useState<any>({}) 
   const [cr_amount_view_all19d14,setcr_amount_view_all19d14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_view_all19d14Props,setcr_amount_view_all19d14Props] = React.useState<any>({}) 
   const [remittance_info_view_all82afd,setremittance_info_view_all82afd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_info_view_all82afdProps,setremittance_info_view_all82afdProps] = React.useState<any>({}) 
   const [status_view_all47e6b,setstatus_view_all47e6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_view_all47e6bProps,setstatus_view_all47e6bProps] = React.useState<any>({}) 
   const [log_btnfe134,setlog_btnfe134] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [log_btnfe134Props,setlog_btnfe134Props] = React.useState<any>({}) 
   const [product_code_failure_queue12297,setproduct_code_failure_queue12297] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_failure_queue12297Props,setproduct_code_failure_queue12297Props] = React.useState<any>({}) 
   const [channel_name_failure_queue42953,setchannel_name_failure_queue42953] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel_name_failure_queue42953Props,setchannel_name_failure_queue42953Props] = React.useState<any>({}) 
   const [uuid_failure_queue03c86,setuuid_failure_queue03c86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_failure_queue03c86Props,setuuid_failure_queue03c86Props] = React.useState<any>({}) 
   const [dr_account_failure_queuef9d2d,setdr_account_failure_queuef9d2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_failure_queuef9d2dProps,setdr_account_failure_queuef9d2dProps] = React.useState<any>({}) 
   const [dr_amount_failure_queue95d4e,setdr_amount_failure_queue95d4e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_failure_queue95d4eProps,setdr_amount_failure_queue95d4eProps] = React.useState<any>({}) 
   const [cr_account_failure_queuea7246,setcr_account_failure_queuea7246] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_failure_queuea7246Props,setcr_account_failure_queuea7246Props] = React.useState<any>({}) 
   const [cr_amount_failure_queue57c4d,setcr_amount_failure_queue57c4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_failure_queue57c4dProps,setcr_amount_failure_queue57c4dProps] = React.useState<any>({}) 
   const [remittance_info_failure_queue09d7a,setremittance_info_failure_queue09d7a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_info_failure_queue09d7aProps,setremittance_info_failure_queue09d7aProps] = React.useState<any>({}) 
   const [status_failure_queue0aef8,setstatus_failure_queue0aef8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_failure_queue0aef8Props,setstatus_failure_queue0aef8Props] = React.useState<any>({}) 
   const [product_code_success_queue7c209,setproduct_code_success_queue7c209] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_success_queue7c209Props,setproduct_code_success_queue7c209Props] = React.useState<any>({}) 
   const [channel_name_success_queueeddaf,setchannel_name_success_queueeddaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel_name_success_queueeddafProps,setchannel_name_success_queueeddafProps] = React.useState<any>({}) 
   const [uuid_success_queuec805b,setuuid_success_queuec805b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_success_queuec805bProps,setuuid_success_queuec805bProps] = React.useState<any>({}) 
   const [dr_account_operational_pending10a49,setdr_account_operational_pending10a49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_operational_pending10a49Props,setdr_account_operational_pending10a49Props] = React.useState<any>({}) 
   const [dr_amount_success_queueda254,setdr_amount_success_queueda254] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_success_queueda254Props,setdr_amount_success_queueda254Props] = React.useState<any>({}) 
   const [cr_account_success_queue60480,setcr_account_success_queue60480] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_success_queue60480Props,setcr_account_success_queue60480Props] = React.useState<any>({}) 
   const [cr_amount_success_queueb80d4,setcr_amount_success_queueb80d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_success_queueb80d4Props,setcr_amount_success_queueb80d4Props] = React.useState<any>({}) 
   const [remittance_info_success_queue2f950,setremittance_info_success_queue2f950] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_info_success_queue2f950Props,setremittance_info_success_queue2f950Props] = React.useState<any>({}) 
   const [status_success_queue019a2,setstatus_success_queue019a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_success_queue019a2Props,setstatus_success_queue019a2Props] = React.useState<any>({}) 
   const [product_code_return_queuee5e11,setproduct_code_return_queuee5e11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_return_queuee5e11Props,setproduct_code_return_queuee5e11Props] = React.useState<any>({}) 
   const [channel_name_return_queuebdabb,setchannel_name_return_queuebdabb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel_name_return_queuebdabbProps,setchannel_name_return_queuebdabbProps] = React.useState<any>({}) 
   const [uuid_return_queue958c9,setuuid_return_queue958c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_return_queue958c9Props,setuuid_return_queue958c9Props] = React.useState<any>({}) 
   const [dr_account_return_queuee94b2,setdr_account_return_queuee94b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_return_queuee94b2Props,setdr_account_return_queuee94b2Props] = React.useState<any>({}) 
   const [dr_amount_return_queue2f324,setdr_amount_return_queue2f324] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_return_queue2f324Props,setdr_amount_return_queue2f324Props] = React.useState<any>({}) 
   const [cr_account_return_queue21a57,setcr_account_return_queue21a57] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_return_queue21a57Props,setcr_account_return_queue21a57Props] = React.useState<any>({}) 
   const [cr_amount_return_queue13fec,setcr_amount_return_queue13fec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_return_queue13fecProps,setcr_amount_return_queue13fecProps] = React.useState<any>({}) 
   const [remittance_info_return_queuef37f7,setremittance_info_return_queuef37f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_info_return_queuef37f7Props,setremittance_info_return_queuef37f7Props] = React.useState<any>({}) 
   const [status_return_queue95903,setstatus_return_queue95903] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_return_queue95903Props,setstatus_return_queue95903Props] = React.useState<any>({}) 
   const [divider_top0354b,setdivider_top0354b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_top0354bProps,setdivider_top0354bProps] = React.useState<any>({}) 
   const [trs_created_date2cea8,settrs_created_date2cea8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_date2cea8Props,settrs_created_date2cea8Props] = React.useState<any>({}) 
   const [debtor_account_no963e4,setdebtor_account_no963e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_account_no963e4Props,setdebtor_account_no963e4Props] = React.useState<any>({}) 
   const [debtor_namee2d9f,setdebtor_namee2d9f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namee2d9fProps,setdebtor_namee2d9fProps] = React.useState<any>({}) 
   const [creditor_account_noca692,setcreditor_account_noca692] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_account_noca692Props,setcreditor_account_noca692Props] = React.useState<any>({}) 
   const [payment_currency703d2,setpayment_currency703d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [payment_currency703d2Props,setpayment_currency703d2Props] = React.useState<any>({}) 
   const [payment_amount042b1,setpayment_amount042b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [payment_amount042b1Props,setpayment_amount042b1Props] = React.useState<any>({}) 
   const [uuid29c9f,setuuid29c9f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid29c9fProps,setuuid29c9fProps] = React.useState<any>({}) 
   const [channel26e83,setchannel26e83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel26e83Props,setchannel26e83Props] = React.useState<any>({}) 
   const [processstatus134a1,setprocessstatus134a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [processstatus134a1Props,setprocessstatus134a1Props] = React.useState<any>({}) 
   const [status4bd75,setstatus4bd75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status4bd75Props,setstatus4bd75Props] = React.useState<any>({}) 
   const [divider_bottom72ab5,setdivider_bottom72ab5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_bottom72ab5Props,setdivider_bottom72ab5Props] = React.useState<any>({}) 
   const [search0e695,setsearch0e695] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [search0e695Props,setsearch0e695Props] = React.useState<any>({}) 
   const [cleareddfa,setcleareddfa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cleareddfaProps,setcleareddfaProps] = React.useState<any>({}) 
   const [tran_journey1602a,settran_journey1602a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tran_journey1602aProps,settran_journey1602aProps] = React.useState<any>({}) 
   const [divider_tope6917,setdivider_tope6917] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_tope6917Props,setdivider_tope6917Props] = React.useState<any>({}) 
   const [transaction_date_time_label669d7,settransaction_date_time_label669d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_date_time_label669d7Props,settransaction_date_time_label669d7Props] = React.useState<any>({}) 
   const [status_labelf3713,setstatus_labelf3713] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_labelf3713Props,setstatus_labelf3713Props] = React.useState<any>({}) 
   const [transaction_date_time14856,settransaction_date_time14856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_date_time14856Props,settransaction_date_time14856Props] = React.useState<any>({}) 
   const [status88bc7,setstatus88bc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status88bc7Props,setstatus88bc7Props] = React.useState<any>({}) 
   const [processed_by_label542e8,setprocessed_by_label542e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [processed_by_label542e8Props,setprocessed_by_label542e8Props] = React.useState<any>({}) 
   const [debit_account_label3b1b7,setdebit_account_label3b1b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debit_account_label3b1b7Props,setdebit_account_label3b1b7Props] = React.useState<any>({}) 
   const [processed_byd2b69,setprocessed_byd2b69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [processed_byd2b69Props,setprocessed_byd2b69Props] = React.useState<any>({}) 
   const [debit_account36b40,setdebit_account36b40] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debit_account36b40Props,setdebit_account36b40Props] = React.useState<any>({}) 
   const [currency_labele21ba,setcurrency_labele21ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [currency_labele21baProps,setcurrency_labele21baProps] = React.useState<any>({}) 
   const [credit_account_label65c7b,setcredit_account_label65c7b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [credit_account_label65c7bProps,setcredit_account_label65c7bProps] = React.useState<any>({}) 
   const [currency9c8a2,setcurrency9c8a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [currency9c8a2Props,setcurrency9c8a2Props] = React.useState<any>({}) 
   const [credit_account0d1f4,setcredit_account0d1f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [credit_account0d1f4Props,setcredit_account0d1f4Props] = React.useState<any>({}) 
   const [amount_labelfd725,setamount_labelfd725] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount_labelfd725Props,setamount_labelfd725Props] = React.useState<any>({}) 
   const [transaction_reference_labelb1ca9,settransaction_reference_labelb1ca9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_reference_labelb1ca9Props,settransaction_reference_labelb1ca9Props] = React.useState<any>({}) 
   const [amount01416,setamount01416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount01416Props,setamount01416Props] = React.useState<any>({}) 
   const [transaction_reference500d6,settransaction_reference500d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_reference500d6Props,settransaction_reference500d6Props] = React.useState<any>({}) 
   const [divider_bottom8bad5,setdivider_bottom8bad5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_bottom8bad5Props,setdivider_bottom8bad5Props] = React.useState<any>({}) 
   const [view_msg_data_btne6a88,setview_msg_data_btne6a88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_msg_data_btne6a88Props,setview_msg_data_btne6a88Props] = React.useState<any>({}) 
   const [view_tran_log_btn9cd8c,setview_tran_log_btn9cd8c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_tran_log_btn9cd8cProps,setview_tran_log_btn9cd8cProps] = React.useState<any>({}) 
   const [divider_topf46a0,setdivider_topf46a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_topf46a0Props,setdivider_topf46a0Props] = React.useState<any>({}) 
   const [xmlviewer9fe8d,setxmlviewer9fe8d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [xmlviewer9fe8dProps,setxmlviewer9fe8dProps] = React.useState<any>({}) 
   const [divider_bottom6920d,setdivider_bottom6920d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider_bottom6920dProps,setdivider_bottom6920dProps] = React.useState<any>({}) 
   const [cancel_btn5e840,setcancel_btn5e840] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel_btn5e840Props,setcancel_btn5e840Props] = React.useState<any>({}) 
   const [req_jsonviewerc80ab,setreq_jsonviewerc80ab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [req_jsonviewerc80abProps,setreq_jsonviewerc80abProps] = React.useState<any>({}) 
   const [res_jsonviewer9d6d1,setres_jsonviewer9d6d1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [res_jsonviewer9d6d1Props,setres_jsonviewer9d6d1Props] = React.useState<any>({}) 
   const [product_combobox7ef64,setproduct_combobox7ef64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_combobox7ef64Props,setproduct_combobox7ef64Props] = React.useState<any>({}) 
   const [channel_combobox95649,setchannel_combobox95649] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [channel_combobox95649Props,setchannel_combobox95649Props] = React.useState<any>({}) 
   const [currency_comboboxfbbfc,setcurrency_comboboxfbbfc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [currency_comboboxfbbfcProps,setcurrency_comboboxfbbfcProps] = React.useState<any>({}) 
   const [process_category_comboboxbb731,setprocess_category_comboboxbb731] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [process_category_comboboxbb731Props,setprocess_category_comboboxbb731Props] = React.useState<any>({}) 
   const [offline_online_combobox88add,setoffline_online_combobox88add] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [offline_online_combobox88addProps,setoffline_online_combobox88addProps] = React.useState<any>({}) 
   const [key_matrics54124,setkey_matrics54124] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [key_matrics54124Props,setkey_matrics54124Props] = React.useState<any>({}) 
   const [product_icon07465,setproduct_icon07465] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_icon07465Props,setproduct_icon07465Props] = React.useState<any>({}) 
   const [transactions_labelf64b1,settransactions_labelf64b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transactions_labelf64b1Props,settransactions_labelf64b1Props] = React.useState<any>({}) 
   const [transaction_countc3fd5,settransaction_countc3fd5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_countc3fd5Props,settransaction_countc3fd5Props] = React.useState<any>({}) 
   const [total_value_icon16d5d,settotal_value_icon16d5d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_value_icon16d5dProps,settotal_value_icon16d5dProps] = React.useState<any>({}) 
   const [total_value_labeld1dce,settotal_value_labeld1dce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_value_labeld1dceProps,settotal_value_labeld1dceProps] = React.useState<any>({}) 
   const [total_amount94c0b,settotal_amount94c0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_amount94c0bProps,settotal_amount94c0bProps] = React.useState<any>({}) 
   const [online_offline_processing_icon87fd3,setonline_offline_processing_icon87fd3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [online_offline_processing_icon87fd3Props,setonline_offline_processing_icon87fd3Props] = React.useState<any>({}) 
   const [online_offline_processing_label9cdc2,setonline_offline_processing_label9cdc2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [online_offline_processing_label9cdc2Props,setonline_offline_processing_label9cdc2Props] = React.useState<any>({}) 
   const [online_offline_process41265,setonline_offline_process41265] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [online_offline_process41265Props,setonline_offline_process41265Props] = React.useState<any>({}) 
   const [transaction_volume_by_channel2b08e,settransaction_volume_by_channel2b08e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_volume_by_channel2b08eProps,settransaction_volume_by_channel2b08eProps] = React.useState<any>({}) 
   const [barchart84262,setbarchart84262] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [barchart84262Props,setbarchart84262Props] = React.useState<any>({}) 
   const [product_organation_label2e07d,setproduct_organation_label2e07d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_organation_label2e07dProps,setproduct_organation_label2e07dProps] = React.useState<any>({}) 
   const [piechart9dde7,setpiechart9dde7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [piechart9dde7Props,setpiechart9dde7Props] = React.useState<any>({}) 
   const [transaction_table_label9d37f,settransaction_table_label9d37f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [transaction_table_label9d37fProps,settransaction_table_label9d37fProps] = React.useState<any>({}) 
   const [value_date26f4c,setvalue_date26f4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date26f4cProps,setvalue_date26f4cProps] = React.useState<any>({}) 
   const [dr_accounte2a30,setdr_accounte2a30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_accounte2a30Props,setdr_accounte2a30Props] = React.useState<any>({}) 
   const [dr_name59632,setdr_name59632] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name59632Props,setdr_name59632Props] = React.useState<any>({}) 
   const [dr_currency39803,setdr_currency39803] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency39803Props,setdr_currency39803Props] = React.useState<any>({}) 
   const [dr_amountc3a1f,setdr_amountc3a1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amountc3a1fProps,setdr_amountc3a1fProps] = React.useState<any>({}) 
   const [cr_accountcf8bb,setcr_accountcf8bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_accountcf8bbProps,setcr_accountcf8bbProps] = React.useState<any>({}) 
   const [cr_name8be31,setcr_name8be31] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name8be31Props,setcr_name8be31Props] = React.useState<any>({}) 
   const [cr_currency5fe15,setcr_currency5fe15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency5fe15Props,setcr_currency5fe15Props] = React.useState<any>({}) 
   const [cr_amounta66de,setcr_amounta66de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amounta66deProps,setcr_amounta66deProps] = React.useState<any>({}) 
   const [uuid9822d,setuuid9822d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid9822dProps,setuuid9822dProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       switchoutbound_or_inbound5e076:false,
       buttonsearchcc244:false,
       buttonrefresh313d0:false,
       buttondownloadcb505:false,
       columnproduct_code_view_allb0df6:false,
       columnchannel_name_view_all33724:false,
       columnuuid_view_allc0a46:false,
       columndr_account_view_all54da6:false,
       columndr_amount_view_all88d6b:false,
       columncr_account_view_alld4b39:false,
       columncr_Amount_view_all19d14:false,
       columnremittance_info_view_all82afd:false,
       columnstatus_view_all47e6b:false,
       buttonlog_btnfe134:false,
       columnproduct_code_failure_queue12297:false,
       columnchannel_name_failure_queue42953:false,
       columnuuid_failure_queue03c86:false,
       columndr_account_failure_queuef9d2d:false,
       columndr_amount_failure_queue95d4e:false,
       columncr_account_failure_queuea7246:false,
       columncr_Amount_failure_queue57c4d:false,
       columnremittance_info_failure_queue09d7a:false,
       columnstatus_failure_queue0aef8:false,
       columnproduct_code_success_queue7c209:false,
       columnchannel_name_success_queueeddaf:false,
       columnuuid_success_queuec805b:false,
       columndr_account_operational_pending10a49:false,
       columndr_amount_success_queueda254:false,
       columncr_account_success_queue60480:false,
       columncr_Amount_success_queueb80d4:false,
       columnremittance_info_success_queue2f950:false,
       columnstatus_success_queue019a2:false,
       columnproduct_code_return_queuee5e11:false,
       columnchannel_name_return_queuebdabb:false,
       columnuuid_return_queue958c9:false,
       columndr_account_return_queuee94b2:false,
       columndr_amount_return_queue2f324:false,
       columncr_account_return_queue21a57:false,
       columncr_Amount_return_queue13fec:false,
       columnremittance_info_return_queuef37f7:false,
       columnstatus_return_queue95903:false,
       dividerdivider_top0354b:false,
       datepickertrs_created_date2cea8:false,
       textinputdebtor_account_no963e4:false,
       textinputdebtor_namee2d9f:false,
       textinputcreditor_account_noca692:false,
       dropdownpayment_currency703d2:false,
       textinputpayment_amount042b1:false,
       textinputuuid29c9f:false,
       dropdownchannel26e83:false,
       dropdownprocessstatus134a1:false,
       textinputstatus4bd75:false,
       dividerdivider_bottom72ab5:false,
       buttonsearch0e695:false,
       buttoncleareddfa:false,
       timelinetran_journey1602a:false,
       dividerdivider_tope6917:false,
       texttransaction_date_time_label669d7:false,
       textstatus_labelf3713:false,
       texttransaction_date_time14856:false,
       textstatus88bc7:false,
       textprocessed_by_label542e8:false,
       textdebit_account_label3b1b7:false,
       textprocessed_byd2b69:false,
       textdebit_account36b40:false,
       textcurrency_labele21ba:false,
       textcredit_account_label65c7b:false,
       textcurrency9c8a2:false,
       textcredit_account0d1f4:false,
       textamount_labelfd725:false,
       texttransaction_reference_labelb1ca9:false,
       textamount01416:false,
       texttransaction_reference500d6:false,
       dividerdivider_bottom8bad5:false,
       buttonview_msg_data_btne6a88:false,
       buttonview_tran_log_btn9cd8c:false,
       dividerdivider_topf46a0:false,
       xmlviewerxmlviewer9fe8d:false,
       dividerdivider_bottom6920d:false,
       buttoncancel_btn5e840:false,
       jsonviewerreq_jsonviewerc80ab:false,
       jsonviewerres_jsonviewer9d6d1:false,
       comboboxproduct_combobox7ef64:false,
       comboboxchannel_combobox95649:false,
       comboboxcurrency_comboboxfbbfc:false,
       comboboxprocess_category_comboboxbb731:false,
       comboboxoffline_online_combobox88add:false,
       labelkey_matrics54124:false,
       iconproduct_icon07465:false,
       labeltransactions_labelf64b1:false,
       texttransaction_countc3fd5:false,
       icontotal_value_icon16d5d:false,
       labeltotal_value_labeld1dce:false,
       texttotal_amount94c0b:false,
       icononline_offline_processing_icon87fd3:false,
       labelonline_offline_processing_label9cdc2:false,
       textonline_offline_process41265:false,
       labeltransaction_volume_by_channel2b08e:false,
       barchartbarchart84262:false,
       labelproduct_organation_label2e07d:false,
       piechartpiechart9dde7:false,
       labeltransaction_table_label9d37f:false,
       columnvalue_date26f4c:false,
       columndr_accounte2a30:false,
       columndr_name59632:false,
       columndr_currency39803:false,
       columndr_amountc3a1f:false,
       columncr_accountcf8bb:false,
       columncr_name8be31:false,
       columncr_currency5fe15:false,
       columncr_amounta66de:false,
       columnuuid9822d:false,
       grouptran_main_group1dc7f:false,
       grouptran_tab_group08b64:false,
       groupview_all_tab4a963:false,
       tableview_all_tablec9e87:false,
       groupfailure_queue_tab69f01:false,
       tablefailure_queue_tablea476f:false,
       groupsuccess_queue_tabef582:false,
       tablesuccess_queue_table63aae:false,
       groupreturn_queue_tab5611e:false,
       tablereturn_queue_table267f0:false,
       groupmain_group9066f:false,
       grouptran_journey_group9eb2e:false,
       groupjourney_details_groupd9a0e:false,
       grouptran_data_group84f25:false,
       groupreq_data_group8d4d7:false,
       groupres_data_group9d75a:false,
       groupgdb_group5384d:false,
       grouptab_group65b41:false,
       grouptab_header04820:false,
       grouptab_grpe63f4:false,
       grouptransaction_group6c6f2:false,
       grouptotal_value_group9d783:false,
       grouponline_offline_processing_group7ad24:false,
       groupbar_chart_group737a3:false,
       grouppie_chart_group15067:false,
       tabletransaction_tablef4f34:false,
      })

  ////// screen states 
  const [transaction_v1,settransaction_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [transaction_v1Props,settransaction_v1Props] = React.useState<any>({})
  const [transactionsearch_v1,settransactionsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [transactionsearch_v1Props,settransactionsearch_v1Props] = React.useState<any>({})
  const [transactionjourney_v1,settransactionjourney_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [transactionjourney_v1Props,settransactionjourney_v1Props] = React.useState<any>({})
  const [tranjourneydetails_v1,settranjourneydetails_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [tranjourneydetails_v1Props,settranjourneydetails_v1Props] = React.useState<any>({})
  const [messagedataview_v1,setmessagedataview_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [messagedataview_v1Props,setmessagedataview_v1Props] = React.useState<any>({})
  const [trandataview_v1,settrandataview_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [trandataview_v1Props,settrandataview_v1Props] = React.useState<any>({})
  const [globaldashboard_v1,setglobaldashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [globaldashboard_v1Props,setglobaldashboard_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_combocurrencysearch_v1Props,setdfd_combocurrencysearch_v1Props] = React.useState<any>([])
  const [dfd_transaction_v1Props,setdfd_transaction_v1Props] = React.useState<any>([])
  const [dfd_processstatuscombosearch_v1Props,setdfd_processstatuscombosearch_v1Props] = React.useState<any>([])
  const [dfd_channelcombosearch_v1Props,setdfd_channelcombosearch_v1Props] = React.useState<any>([])
  const [dfd_journey_v1Props,setdfd_journey_v1Props] = React.useState<any>([])
  const [dfd_productdashboard_v1Props,setdfd_productdashboard_v1Props] = React.useState<any>([])
  const [dfd_channeldashboard_v1Props,setdfd_channeldashboard_v1Props] = React.useState<any>([])
  const [dfd_currencydashboard_v1Props,setdfd_currencydashboard_v1Props] = React.useState<any>([])
  const [dfd_onlineofflinedashboard_v1Props,setdfd_onlineofflinedashboard_v1Props] = React.useState<any>([])
  const [dfd_processcategorydashboard_v1Props,setdfd_processcategorydashboard_v1Props] = React.useState<any>([])
  const [dfd_transactioncountvphdashboard_v1Props,setdfd_transactioncountvphdashboard_v1Props] = React.useState<any>([])
  const [dfd_channelcountvphdashboard_v1Props,setdfd_channelcountvphdashboard_v1Props] = React.useState<any>([])
  const [dfd_channelchartdashboard_v1Props,setdfd_channelchartdashboard_v1Props] = React.useState<any>([])
  const [dfd_productchartdashboard_v1Props,setdfd_productchartdashboard_v1Props] = React.useState<any>([])
  const [dfd_onlineofflinecountvphdashboard_v1Props,setdfd_onlineofflinecountvphdashboard_v1Props] = React.useState<any>([])
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
    setoutbound_or_inbound5e076(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearchcc244(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrefresh313d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdownloadcb505(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_view_allb0df6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_view_all33724(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_view_allc0a46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_view_all54da6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_view_all88d6b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_view_alld4b39(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_view_all19d14(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_view_all82afd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_view_all47e6b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlog_btnfe134(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_failure_queue12297(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_failure_queue42953(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_failure_queue03c86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_failure_queuef9d2d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_failure_queue95d4e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_failure_queuea7246(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_failure_queue57c4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_failure_queue09d7a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_failure_queue0aef8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_success_queue7c209(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_success_queueeddaf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_success_queuec805b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_operational_pending10a49(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_success_queueda254(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_success_queue60480(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_success_queueb80d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_success_queue2f950(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_success_queue019a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_return_queuee5e11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_return_queuebdabb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_return_queue958c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_return_queuee94b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_return_queue2f324(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_return_queue21a57(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_return_queue13fec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_return_queuef37f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_return_queue95903(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_top0354b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date2cea8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_account_no963e4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namee2d9f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_account_noca692(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpayment_currency703d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpayment_amount042b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid29c9f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel26e83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocessstatus134a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus4bd75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_bottom72ab5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch0e695(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcleareddfa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_journey1602a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_tope6917(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_date_time_label669d7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_labelf3713(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_date_time14856(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus88bc7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocessed_by_label542e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebit_account_label3b1b7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocessed_byd2b69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebit_account36b40(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency_labele21ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcredit_account_label65c7b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency9c8a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcredit_account0d1f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount_labelfd725(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_reference_labelb1ca9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount01416(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_reference500d6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_bottom8bad5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_msg_data_btne6a88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_tran_log_btn9cd8c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_topf46a0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setxmlviewer9fe8d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_bottom6920d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_btn5e840(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreq_jsonviewerc80ab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setres_jsonviewer9d6d1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_combobox7ef64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_combobox95649(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency_comboboxfbbfc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess_category_comboboxbb731(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffline_online_combobox88add(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setkey_matrics54124(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_icon07465(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransactions_labelf64b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_countc3fd5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_value_icon16d5d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_value_labeld1dce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_amount94c0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setonline_offline_processing_icon87fd3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setonline_offline_processing_label9cdc2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setonline_offline_process41265(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_volume_by_channel2b08e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbarchart84262(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_organation_label2e07d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpiechart9dde7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settransaction_table_label9d37f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date26f4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_accounte2a30(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name59632(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency39803(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amountc3a1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_accountcf8bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name8be31(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency5fe15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amounta66de(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid9822d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        settran_main_group1dc7f({}) 
    settran_main_group1dc7fProps({
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
        settran_tab_group08b64({}) 
    settran_tab_group08b64Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "outbound_or_inbound",
            "search",
            "refresh",
            "download",
      ]
      }) 
        setview_all_tab4a963({}) 
    setview_all_tab4a963Props({
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
    
    setview_all_tablec9e87([]) 
    setview_all_tablec9e87Props({
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
        setfailure_queue_tab69f01({}) 
    setfailure_queue_tab69f01Props({
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
    
    setfailure_queue_tablea476f([]) 
    setfailure_queue_tablea476fProps({
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
        setsuccess_queue_tabef582({}) 
    setsuccess_queue_tabef582Props({
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
    
    setsuccess_queue_table63aae([]) 
    setsuccess_queue_table63aaeProps({
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
        setreturn_queue_tab5611e({}) 
    setreturn_queue_tab5611eProps({
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
    
    setreturn_queue_table267f0([]) 
    setreturn_queue_table267f0Props({
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
        setmain_group9066f({}) 
    setmain_group9066fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "payment_currency",
            "payment_currency",
            "dr_amount",
            "uuid",
            "channel",
            "channel",
            "processstatus",
            "processstatus",
            "trs_status",
            "divider_bottom",
            "search",
            "clear",
      ]
      }) 
        settran_journey_group9eb2e({}) 
    settran_journey_group9eb2eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "vgphstm_uuid",
      ]
      }) 
        setjourney_details_groupd9a0e({}) 
    setjourney_details_groupd9a0eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "transaction_date_time_label",
            "status_label",
            "trs_created_date",
            "result",
            "processed_by_label",
            "debit_account_label",
            "processing_system",
            "dr_account",
            "currency_label",
            "credit_account_label",
            "dr_currency",
            "cr_account",
            "amount_label",
            "transaction_reference_label",
            "dr_amount",
            "tran_reference",
            "divider_bottom",
            "view_msg_data_btn",
            "view_tran_log_btn",
      ]
      }) 
        settran_data_group84f25({}) 
    settran_data_group84f25Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "divider_top",
            "divider_bottom",
            "cancel_btn",
      ]
      }) 
        setreq_data_group8d4d7({}) 
    setreq_data_group8d4d7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "request_data",
      ]
      }) 
        setres_data_group9d75a({}) 
    setres_data_group9d75aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "response_data",
      ]
      }) 
        setgdb_group5384d({}) 
    setgdb_group5384dProps({
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
        settab_group65b41({}) 
    settab_group65b41Props({
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
        settab_header04820({}) 
    settab_header04820Props({
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
        settab_grpe63f4({}) 
    settab_grpe63f4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_combobox",
            "product_combobox",
            "channel_combobox",
            "channel_combobox",
            "currency_combobox",
            "currency_combobox",
            "process_category_combobox",
            "process_category_combobox",
            "offline_online_combobox",
            "offline_online_combobox",
            "key_matrics",
            "transaction_table_label",
      ]
      }) 
        settransaction_group6c6f2({}) 
    settransaction_group6c6f2Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_icon",
            "transactions_label",
            "total_count",
      ]
      }) 
        settotal_value_group9d783({}) 
    settotal_value_group9d783Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_value_icon",
            "total_value_label",
            "total_value",
      ]
      }) 
        setonline_offline_processing_group7ad24({}) 
    setonline_offline_processing_group7ad24Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "online_offline_processing_icon",
            "online_offline_processing_label",
            "total_count",
      ]
      }) 
        setbar_chart_group737a3({}) 
    setbar_chart_group737a3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "transaction_volume_by_channel",
            "name",
      ]
      }) 
        setpie_chart_group15067({}) 
    setpie_chart_group15067Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_organation_label",
            "name",
      ]
      }) 
    
    settransaction_tablef4f34([]) 
    settransaction_tablef4f34Props({
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
        tran_main_group1dc7f, 
        settran_main_group1dc7f,
        tran_main_group1dc7fProps, 
        settran_main_group1dc7fProps,
        tran_tab_group08b64, 
        settran_tab_group08b64,
        tran_tab_group08b64Props, 
        settran_tab_group08b64Props,
        view_all_tab4a963, 
        setview_all_tab4a963,
        view_all_tab4a963Props, 
        setview_all_tab4a963Props,
        view_all_tablec9e87, 
        setview_all_tablec9e87,
        view_all_tablec9e87Props, 
        setview_all_tablec9e87Props,
        failure_queue_tab69f01, 
        setfailure_queue_tab69f01,
        failure_queue_tab69f01Props, 
        setfailure_queue_tab69f01Props,
        failure_queue_tablea476f, 
        setfailure_queue_tablea476f,
        failure_queue_tablea476fProps, 
        setfailure_queue_tablea476fProps,
        success_queue_tabef582, 
        setsuccess_queue_tabef582,
        success_queue_tabef582Props, 
        setsuccess_queue_tabef582Props,
        success_queue_table63aae, 
        setsuccess_queue_table63aae,
        success_queue_table63aaeProps, 
        setsuccess_queue_table63aaeProps,
        return_queue_tab5611e, 
        setreturn_queue_tab5611e,
        return_queue_tab5611eProps, 
        setreturn_queue_tab5611eProps,
        return_queue_table267f0, 
        setreturn_queue_table267f0,
        return_queue_table267f0Props, 
        setreturn_queue_table267f0Props,
        main_group9066f, 
        setmain_group9066f,
        main_group9066fProps, 
        setmain_group9066fProps,
        tran_journey_group9eb2e, 
        settran_journey_group9eb2e,
        tran_journey_group9eb2eProps, 
        settran_journey_group9eb2eProps,
        journey_details_groupd9a0e, 
        setjourney_details_groupd9a0e,
        journey_details_groupd9a0eProps, 
        setjourney_details_groupd9a0eProps,
        tran_data_group84f25, 
        settran_data_group84f25,
        tran_data_group84f25Props, 
        settran_data_group84f25Props,
        req_data_group8d4d7, 
        setreq_data_group8d4d7,
        req_data_group8d4d7Props, 
        setreq_data_group8d4d7Props,
        res_data_group9d75a, 
        setres_data_group9d75a,
        res_data_group9d75aProps, 
        setres_data_group9d75aProps,
        gdb_group5384d, 
        setgdb_group5384d,
        gdb_group5384dProps, 
        setgdb_group5384dProps,
        tab_group65b41, 
        settab_group65b41,
        tab_group65b41Props, 
        settab_group65b41Props,
        tab_header04820, 
        settab_header04820,
        tab_header04820Props, 
        settab_header04820Props,
        tab_grpe63f4, 
        settab_grpe63f4,
        tab_grpe63f4Props, 
        settab_grpe63f4Props,
        transaction_group6c6f2, 
        settransaction_group6c6f2,
        transaction_group6c6f2Props, 
        settransaction_group6c6f2Props,
        total_value_group9d783, 
        settotal_value_group9d783,
        total_value_group9d783Props, 
        settotal_value_group9d783Props,
        online_offline_processing_group7ad24, 
        setonline_offline_processing_group7ad24,
        online_offline_processing_group7ad24Props, 
        setonline_offline_processing_group7ad24Props,
        bar_chart_group737a3, 
        setbar_chart_group737a3,
        bar_chart_group737a3Props, 
        setbar_chart_group737a3Props,
        pie_chart_group15067, 
        setpie_chart_group15067,
        pie_chart_group15067Props, 
        setpie_chart_group15067Props,
        transaction_tablef4f34, 
        settransaction_tablef4f34,
        transaction_tablef4f34Props, 
        settransaction_tablef4f34Props,
        outbound_or_inbound5e076,
        setoutbound_or_inbound5e076, 
        outbound_or_inbound5e076Props,
        setoutbound_or_inbound5e076Props,
        searchcc244,
        setsearchcc244, 
        searchcc244Props,
        setsearchcc244Props,
        refresh313d0,
        setrefresh313d0, 
        refresh313d0Props,
        setrefresh313d0Props,
        downloadcb505,
        setdownloadcb505, 
        downloadcb505Props,
        setdownloadcb505Props,
        product_code_view_allb0df6,
        setproduct_code_view_allb0df6, 
        product_code_view_allb0df6Props,
        setproduct_code_view_allb0df6Props,
        channel_name_view_all33724,
        setchannel_name_view_all33724, 
        channel_name_view_all33724Props,
        setchannel_name_view_all33724Props,
        uuid_view_allc0a46,
        setuuid_view_allc0a46, 
        uuid_view_allc0a46Props,
        setuuid_view_allc0a46Props,
        dr_account_view_all54da6,
        setdr_account_view_all54da6, 
        dr_account_view_all54da6Props,
        setdr_account_view_all54da6Props,
        dr_amount_view_all88d6b,
        setdr_amount_view_all88d6b, 
        dr_amount_view_all88d6bProps,
        setdr_amount_view_all88d6bProps,
        cr_account_view_alld4b39,
        setcr_account_view_alld4b39, 
        cr_account_view_alld4b39Props,
        setcr_account_view_alld4b39Props,
        cr_amount_view_all19d14,
        setcr_amount_view_all19d14, 
        cr_amount_view_all19d14Props,
        setcr_amount_view_all19d14Props,
        remittance_info_view_all82afd,
        setremittance_info_view_all82afd, 
        remittance_info_view_all82afdProps,
        setremittance_info_view_all82afdProps,
        status_view_all47e6b,
        setstatus_view_all47e6b, 
        status_view_all47e6bProps,
        setstatus_view_all47e6bProps,
        log_btnfe134,
        setlog_btnfe134, 
        log_btnfe134Props,
        setlog_btnfe134Props,
        product_code_failure_queue12297,
        setproduct_code_failure_queue12297, 
        product_code_failure_queue12297Props,
        setproduct_code_failure_queue12297Props,
        channel_name_failure_queue42953,
        setchannel_name_failure_queue42953, 
        channel_name_failure_queue42953Props,
        setchannel_name_failure_queue42953Props,
        uuid_failure_queue03c86,
        setuuid_failure_queue03c86, 
        uuid_failure_queue03c86Props,
        setuuid_failure_queue03c86Props,
        dr_account_failure_queuef9d2d,
        setdr_account_failure_queuef9d2d, 
        dr_account_failure_queuef9d2dProps,
        setdr_account_failure_queuef9d2dProps,
        dr_amount_failure_queue95d4e,
        setdr_amount_failure_queue95d4e, 
        dr_amount_failure_queue95d4eProps,
        setdr_amount_failure_queue95d4eProps,
        cr_account_failure_queuea7246,
        setcr_account_failure_queuea7246, 
        cr_account_failure_queuea7246Props,
        setcr_account_failure_queuea7246Props,
        cr_amount_failure_queue57c4d,
        setcr_amount_failure_queue57c4d, 
        cr_amount_failure_queue57c4dProps,
        setcr_amount_failure_queue57c4dProps,
        remittance_info_failure_queue09d7a,
        setremittance_info_failure_queue09d7a, 
        remittance_info_failure_queue09d7aProps,
        setremittance_info_failure_queue09d7aProps,
        status_failure_queue0aef8,
        setstatus_failure_queue0aef8, 
        status_failure_queue0aef8Props,
        setstatus_failure_queue0aef8Props,
        product_code_success_queue7c209,
        setproduct_code_success_queue7c209, 
        product_code_success_queue7c209Props,
        setproduct_code_success_queue7c209Props,
        channel_name_success_queueeddaf,
        setchannel_name_success_queueeddaf, 
        channel_name_success_queueeddafProps,
        setchannel_name_success_queueeddafProps,
        uuid_success_queuec805b,
        setuuid_success_queuec805b, 
        uuid_success_queuec805bProps,
        setuuid_success_queuec805bProps,
        dr_account_operational_pending10a49,
        setdr_account_operational_pending10a49, 
        dr_account_operational_pending10a49Props,
        setdr_account_operational_pending10a49Props,
        dr_amount_success_queueda254,
        setdr_amount_success_queueda254, 
        dr_amount_success_queueda254Props,
        setdr_amount_success_queueda254Props,
        cr_account_success_queue60480,
        setcr_account_success_queue60480, 
        cr_account_success_queue60480Props,
        setcr_account_success_queue60480Props,
        cr_amount_success_queueb80d4,
        setcr_amount_success_queueb80d4, 
        cr_amount_success_queueb80d4Props,
        setcr_amount_success_queueb80d4Props,
        remittance_info_success_queue2f950,
        setremittance_info_success_queue2f950, 
        remittance_info_success_queue2f950Props,
        setremittance_info_success_queue2f950Props,
        status_success_queue019a2,
        setstatus_success_queue019a2, 
        status_success_queue019a2Props,
        setstatus_success_queue019a2Props,
        product_code_return_queuee5e11,
        setproduct_code_return_queuee5e11, 
        product_code_return_queuee5e11Props,
        setproduct_code_return_queuee5e11Props,
        channel_name_return_queuebdabb,
        setchannel_name_return_queuebdabb, 
        channel_name_return_queuebdabbProps,
        setchannel_name_return_queuebdabbProps,
        uuid_return_queue958c9,
        setuuid_return_queue958c9, 
        uuid_return_queue958c9Props,
        setuuid_return_queue958c9Props,
        dr_account_return_queuee94b2,
        setdr_account_return_queuee94b2, 
        dr_account_return_queuee94b2Props,
        setdr_account_return_queuee94b2Props,
        dr_amount_return_queue2f324,
        setdr_amount_return_queue2f324, 
        dr_amount_return_queue2f324Props,
        setdr_amount_return_queue2f324Props,
        cr_account_return_queue21a57,
        setcr_account_return_queue21a57, 
        cr_account_return_queue21a57Props,
        setcr_account_return_queue21a57Props,
        cr_amount_return_queue13fec,
        setcr_amount_return_queue13fec, 
        cr_amount_return_queue13fecProps,
        setcr_amount_return_queue13fecProps,
        remittance_info_return_queuef37f7,
        setremittance_info_return_queuef37f7, 
        remittance_info_return_queuef37f7Props,
        setremittance_info_return_queuef37f7Props,
        status_return_queue95903,
        setstatus_return_queue95903, 
        status_return_queue95903Props,
        setstatus_return_queue95903Props,
        divider_top0354b,
        setdivider_top0354b, 
        divider_top0354bProps,
        setdivider_top0354bProps,
        trs_created_date2cea8,
        settrs_created_date2cea8, 
        trs_created_date2cea8Props,
        settrs_created_date2cea8Props,
        debtor_account_no963e4,
        setdebtor_account_no963e4, 
        debtor_account_no963e4Props,
        setdebtor_account_no963e4Props,
        debtor_namee2d9f,
        setdebtor_namee2d9f, 
        debtor_namee2d9fProps,
        setdebtor_namee2d9fProps,
        creditor_account_noca692,
        setcreditor_account_noca692, 
        creditor_account_noca692Props,
        setcreditor_account_noca692Props,
        payment_currency703d2,
        setpayment_currency703d2, 
        payment_currency703d2Props,
        setpayment_currency703d2Props,
        payment_amount042b1,
        setpayment_amount042b1, 
        payment_amount042b1Props,
        setpayment_amount042b1Props,
        uuid29c9f,
        setuuid29c9f, 
        uuid29c9fProps,
        setuuid29c9fProps,
        channel26e83,
        setchannel26e83, 
        channel26e83Props,
        setchannel26e83Props,
        processstatus134a1,
        setprocessstatus134a1, 
        processstatus134a1Props,
        setprocessstatus134a1Props,
        status4bd75,
        setstatus4bd75, 
        status4bd75Props,
        setstatus4bd75Props,
        divider_bottom72ab5,
        setdivider_bottom72ab5, 
        divider_bottom72ab5Props,
        setdivider_bottom72ab5Props,
        search0e695,
        setsearch0e695, 
        search0e695Props,
        setsearch0e695Props,
        cleareddfa,
        setcleareddfa, 
        cleareddfaProps,
        setcleareddfaProps,
        tran_journey1602a,
        settran_journey1602a, 
        tran_journey1602aProps,
        settran_journey1602aProps,
        divider_tope6917,
        setdivider_tope6917, 
        divider_tope6917Props,
        setdivider_tope6917Props,
        transaction_date_time_label669d7,
        settransaction_date_time_label669d7, 
        transaction_date_time_label669d7Props,
        settransaction_date_time_label669d7Props,
        status_labelf3713,
        setstatus_labelf3713, 
        status_labelf3713Props,
        setstatus_labelf3713Props,
        transaction_date_time14856,
        settransaction_date_time14856, 
        transaction_date_time14856Props,
        settransaction_date_time14856Props,
        status88bc7,
        setstatus88bc7, 
        status88bc7Props,
        setstatus88bc7Props,
        processed_by_label542e8,
        setprocessed_by_label542e8, 
        processed_by_label542e8Props,
        setprocessed_by_label542e8Props,
        debit_account_label3b1b7,
        setdebit_account_label3b1b7, 
        debit_account_label3b1b7Props,
        setdebit_account_label3b1b7Props,
        processed_byd2b69,
        setprocessed_byd2b69, 
        processed_byd2b69Props,
        setprocessed_byd2b69Props,
        debit_account36b40,
        setdebit_account36b40, 
        debit_account36b40Props,
        setdebit_account36b40Props,
        currency_labele21ba,
        setcurrency_labele21ba, 
        currency_labele21baProps,
        setcurrency_labele21baProps,
        credit_account_label65c7b,
        setcredit_account_label65c7b, 
        credit_account_label65c7bProps,
        setcredit_account_label65c7bProps,
        currency9c8a2,
        setcurrency9c8a2, 
        currency9c8a2Props,
        setcurrency9c8a2Props,
        credit_account0d1f4,
        setcredit_account0d1f4, 
        credit_account0d1f4Props,
        setcredit_account0d1f4Props,
        amount_labelfd725,
        setamount_labelfd725, 
        amount_labelfd725Props,
        setamount_labelfd725Props,
        transaction_reference_labelb1ca9,
        settransaction_reference_labelb1ca9, 
        transaction_reference_labelb1ca9Props,
        settransaction_reference_labelb1ca9Props,
        amount01416,
        setamount01416, 
        amount01416Props,
        setamount01416Props,
        transaction_reference500d6,
        settransaction_reference500d6, 
        transaction_reference500d6Props,
        settransaction_reference500d6Props,
        divider_bottom8bad5,
        setdivider_bottom8bad5, 
        divider_bottom8bad5Props,
        setdivider_bottom8bad5Props,
        view_msg_data_btne6a88,
        setview_msg_data_btne6a88, 
        view_msg_data_btne6a88Props,
        setview_msg_data_btne6a88Props,
        view_tran_log_btn9cd8c,
        setview_tran_log_btn9cd8c, 
        view_tran_log_btn9cd8cProps,
        setview_tran_log_btn9cd8cProps,
        divider_topf46a0,
        setdivider_topf46a0, 
        divider_topf46a0Props,
        setdivider_topf46a0Props,
        xmlviewer9fe8d,
        setxmlviewer9fe8d, 
        xmlviewer9fe8dProps,
        setxmlviewer9fe8dProps,
        divider_bottom6920d,
        setdivider_bottom6920d, 
        divider_bottom6920dProps,
        setdivider_bottom6920dProps,
        cancel_btn5e840,
        setcancel_btn5e840, 
        cancel_btn5e840Props,
        setcancel_btn5e840Props,
        req_jsonviewerc80ab,
        setreq_jsonviewerc80ab, 
        req_jsonviewerc80abProps,
        setreq_jsonviewerc80abProps,
        res_jsonviewer9d6d1,
        setres_jsonviewer9d6d1, 
        res_jsonviewer9d6d1Props,
        setres_jsonviewer9d6d1Props,
        product_combobox7ef64,
        setproduct_combobox7ef64, 
        product_combobox7ef64Props,
        setproduct_combobox7ef64Props,
        channel_combobox95649,
        setchannel_combobox95649, 
        channel_combobox95649Props,
        setchannel_combobox95649Props,
        currency_comboboxfbbfc,
        setcurrency_comboboxfbbfc, 
        currency_comboboxfbbfcProps,
        setcurrency_comboboxfbbfcProps,
        process_category_comboboxbb731,
        setprocess_category_comboboxbb731, 
        process_category_comboboxbb731Props,
        setprocess_category_comboboxbb731Props,
        offline_online_combobox88add,
        setoffline_online_combobox88add, 
        offline_online_combobox88addProps,
        setoffline_online_combobox88addProps,
        key_matrics54124,
        setkey_matrics54124, 
        key_matrics54124Props,
        setkey_matrics54124Props,
        product_icon07465,
        setproduct_icon07465, 
        product_icon07465Props,
        setproduct_icon07465Props,
        transactions_labelf64b1,
        settransactions_labelf64b1, 
        transactions_labelf64b1Props,
        settransactions_labelf64b1Props,
        transaction_countc3fd5,
        settransaction_countc3fd5, 
        transaction_countc3fd5Props,
        settransaction_countc3fd5Props,
        total_value_icon16d5d,
        settotal_value_icon16d5d, 
        total_value_icon16d5dProps,
        settotal_value_icon16d5dProps,
        total_value_labeld1dce,
        settotal_value_labeld1dce, 
        total_value_labeld1dceProps,
        settotal_value_labeld1dceProps,
        total_amount94c0b,
        settotal_amount94c0b, 
        total_amount94c0bProps,
        settotal_amount94c0bProps,
        online_offline_processing_icon87fd3,
        setonline_offline_processing_icon87fd3, 
        online_offline_processing_icon87fd3Props,
        setonline_offline_processing_icon87fd3Props,
        online_offline_processing_label9cdc2,
        setonline_offline_processing_label9cdc2, 
        online_offline_processing_label9cdc2Props,
        setonline_offline_processing_label9cdc2Props,
        online_offline_process41265,
        setonline_offline_process41265, 
        online_offline_process41265Props,
        setonline_offline_process41265Props,
        transaction_volume_by_channel2b08e,
        settransaction_volume_by_channel2b08e, 
        transaction_volume_by_channel2b08eProps,
        settransaction_volume_by_channel2b08eProps,
        barchart84262,
        setbarchart84262, 
        barchart84262Props,
        setbarchart84262Props,
        product_organation_label2e07d,
        setproduct_organation_label2e07d, 
        product_organation_label2e07dProps,
        setproduct_organation_label2e07dProps,
        piechart9dde7,
        setpiechart9dde7, 
        piechart9dde7Props,
        setpiechart9dde7Props,
        transaction_table_label9d37f,
        settransaction_table_label9d37f, 
        transaction_table_label9d37fProps,
        settransaction_table_label9d37fProps,
        value_date26f4c,
        setvalue_date26f4c, 
        value_date26f4cProps,
        setvalue_date26f4cProps,
        dr_accounte2a30,
        setdr_accounte2a30, 
        dr_accounte2a30Props,
        setdr_accounte2a30Props,
        dr_name59632,
        setdr_name59632, 
        dr_name59632Props,
        setdr_name59632Props,
        dr_currency39803,
        setdr_currency39803, 
        dr_currency39803Props,
        setdr_currency39803Props,
        dr_amountc3a1f,
        setdr_amountc3a1f, 
        dr_amountc3a1fProps,
        setdr_amountc3a1fProps,
        cr_accountcf8bb,
        setcr_accountcf8bb, 
        cr_accountcf8bbProps,
        setcr_accountcf8bbProps,
        cr_name8be31,
        setcr_name8be31, 
        cr_name8be31Props,
        setcr_name8be31Props,
        cr_currency5fe15,
        setcr_currency5fe15, 
        cr_currency5fe15Props,
        setcr_currency5fe15Props,
        cr_amounta66de,
        setcr_amounta66de, 
        cr_amounta66deProps,
        setcr_amounta66deProps,
        uuid9822d,
        setuuid9822d, 
        uuid9822dProps,
        setuuid9822dProps,
        ////// screen states 
          transaction_v1,
          settransaction_v1,
          transaction_v1Props,
          settransaction_v1Props,
          transactionsearch_v1,
          settransactionsearch_v1,
          transactionsearch_v1Props,
          settransactionsearch_v1Props,
          transactionjourney_v1,
          settransactionjourney_v1,
          transactionjourney_v1Props,
          settransactionjourney_v1Props,
          tranjourneydetails_v1,
          settranjourneydetails_v1,
          tranjourneydetails_v1Props,
          settranjourneydetails_v1Props,
          messagedataview_v1,
          setmessagedataview_v1,
          messagedataview_v1Props,
          setmessagedataview_v1Props,
          trandataview_v1,
          settrandataview_v1,
          trandataview_v1Props,
          settrandataview_v1Props,
          globaldashboard_v1,
          setglobaldashboard_v1,
          globaldashboard_v1Props,
          setglobaldashboard_v1Props,
        //////////

        ///////// dfd
        dfd_combocurrencysearch_v1Props,
        setdfd_combocurrencysearch_v1Props,
        dfd_transaction_v1Props,
        setdfd_transaction_v1Props,
        dfd_processstatuscombosearch_v1Props,
        setdfd_processstatuscombosearch_v1Props,
        dfd_channelcombosearch_v1Props,
        setdfd_channelcombosearch_v1Props,
        dfd_journey_v1Props,
        setdfd_journey_v1Props,
        dfd_productdashboard_v1Props,
        setdfd_productdashboard_v1Props,
        dfd_channeldashboard_v1Props,
        setdfd_channeldashboard_v1Props,
        dfd_currencydashboard_v1Props,
        setdfd_currencydashboard_v1Props,
        dfd_onlineofflinedashboard_v1Props,
        setdfd_onlineofflinedashboard_v1Props,
        dfd_processcategorydashboard_v1Props,
        setdfd_processcategorydashboard_v1Props,
        dfd_transactioncountvphdashboard_v1Props,
        setdfd_transactioncountvphdashboard_v1Props,
        dfd_channelcountvphdashboard_v1Props,
        setdfd_channelcountvphdashboard_v1Props,
        dfd_channelchartdashboard_v1Props,
        setdfd_channelchartdashboard_v1Props,
        dfd_productchartdashboard_v1Props,
        setdfd_productchartdashboard_v1Props,
        dfd_onlineofflinecountvphdashboard_v1Props,
        setdfd_onlineofflinecountvphdashboard_v1Props,
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