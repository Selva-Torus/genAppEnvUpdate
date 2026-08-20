


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
  view_all_journey_group67ce4: any 
  setview_all_journey_group67ce4: React.Dispatch<React.SetStateAction<any>>
  view_all_journey_group67ce4Props: any 
  setview_all_journey_group67ce4Props: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tab69f01: any 
  setfailure_queue_tab69f01: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tab69f01Props: any 
  setfailure_queue_tab69f01Props: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tablea476f: any 
  setfailure_queue_tablea476f: React.Dispatch<React.SetStateAction<any>>
  failure_queue_tablea476fProps: any 
  setfailure_queue_tablea476fProps: React.Dispatch<React.SetStateAction<any>>
  failure_queue_journey_group36aba: any 
  setfailure_queue_journey_group36aba: React.Dispatch<React.SetStateAction<any>>
  failure_queue_journey_group36abaProps: any 
  setfailure_queue_journey_group36abaProps: React.Dispatch<React.SetStateAction<any>>
  success_queue_tabef582: any 
  setsuccess_queue_tabef582: React.Dispatch<React.SetStateAction<any>>
  success_queue_tabef582Props: any 
  setsuccess_queue_tabef582Props: React.Dispatch<React.SetStateAction<any>>
  success_queue_table63aae: any 
  setsuccess_queue_table63aae: React.Dispatch<React.SetStateAction<any>>
  success_queue_table63aaeProps: any 
  setsuccess_queue_table63aaeProps: React.Dispatch<React.SetStateAction<any>>
  success_queue_journey_group755eb: any 
  setsuccess_queue_journey_group755eb: React.Dispatch<React.SetStateAction<any>>
  success_queue_journey_group755ebProps: any 
  setsuccess_queue_journey_group755ebProps: React.Dispatch<React.SetStateAction<any>>
  return_queue_tab5611e: any 
  setreturn_queue_tab5611e: React.Dispatch<React.SetStateAction<any>>
  return_queue_tab5611eProps: any 
  setreturn_queue_tab5611eProps: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0: any 
  setreturn_queue_table267f0: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0Props: any 
  setreturn_queue_table267f0Props: React.Dispatch<React.SetStateAction<any>>
  return_queue_journey_group92c55: any 
  setreturn_queue_journey_group92c55: React.Dispatch<React.SetStateAction<any>>
  return_queue_journey_group92c55Props: any 
  setreturn_queue_journey_group92c55Props: React.Dispatch<React.SetStateAction<any>>
  operational_pending_tab67331: any 
  setoperational_pending_tab67331: React.Dispatch<React.SetStateAction<any>>
  operational_pending_tab67331Props: any 
  setoperational_pending_tab67331Props: React.Dispatch<React.SetStateAction<any>>
  operational_pending_table0a253: any 
  setoperational_pending_table0a253: React.Dispatch<React.SetStateAction<any>>
  operational_pending_table0a253Props: any 
  setoperational_pending_table0a253Props: React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey_group63667: any 
  setoperational_pending_journey_group63667: React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey_group63667Props: any 
  setoperational_pending_journey_group63667Props: React.Dispatch<React.SetStateAction<any>>
  technical_pending_tab0b23f: any 
  settechnical_pending_tab0b23f: React.Dispatch<React.SetStateAction<any>>
  technical_pending_tab0b23fProps: any 
  settechnical_pending_tab0b23fProps: React.Dispatch<React.SetStateAction<any>>
  technical_pending_table84f30: any 
  settechnical_pending_table84f30: React.Dispatch<React.SetStateAction<any>>
  technical_pending_table84f30Props: any 
  settechnical_pending_table84f30Props: React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey_groupe4f03: any 
  settechnical_pending_journey_groupe4f03: React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey_groupe4f03Props: any 
  settechnical_pending_journey_groupe4f03Props: React.Dispatch<React.SetStateAction<any>>
  main_group9066f: any 
  setmain_group9066f: React.Dispatch<React.SetStateAction<any>>
  main_group9066fProps: any 
  setmain_group9066fProps: React.Dispatch<React.SetStateAction<any>>
  overallgroup01c61: any 
  setoverallgroup01c61: React.Dispatch<React.SetStateAction<any>>
  overallgroup01c61Props: any 
  setoverallgroup01c61Props: React.Dispatch<React.SetStateAction<any>>
  controlgroupda197: any 
  setcontrolgroupda197: React.Dispatch<React.SetStateAction<any>>
  controlgroupda197Props: any 
  setcontrolgroupda197Props: React.Dispatch<React.SetStateAction<any>>
  control_tab_groupbc3e2: any 
  setcontrol_tab_groupbc3e2: React.Dispatch<React.SetStateAction<any>>
  control_tab_groupbc3e2Props: any 
  setcontrol_tab_groupbc3e2Props: React.Dispatch<React.SetStateAction<any>>
  button_group74f3e: any 
  setbutton_group74f3e: React.Dispatch<React.SetStateAction<any>>
  button_group74f3eProps: any 
  setbutton_group74f3eProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_infofd0aa: any 
  setrtgs_infofd0aa: React.Dispatch<React.SetStateAction<any>>
  rtgs_infofd0aaProps: any 
  setrtgs_infofd0aaProps: React.Dispatch<React.SetStateAction<any>>
  allcontrols71c54: any 
  setallcontrols71c54: React.Dispatch<React.SetStateAction<any>>
  allcontrols71c54Props: any 
  setallcontrols71c54Props: React.Dispatch<React.SetStateAction<any>>
  commoninfof4607: any 
  setcommoninfof4607: React.Dispatch<React.SetStateAction<any>>
  commoninfof4607Props: any 
  setcommoninfof4607Props: React.Dispatch<React.SetStateAction<any>>
  basicinfo3d198: any 
  setbasicinfo3d198: React.Dispatch<React.SetStateAction<any>>
  basicinfo3d198Props: any 
  setbasicinfo3d198Props: React.Dispatch<React.SetStateAction<any>>
  additionalinfod2894: any 
  setadditionalinfod2894: React.Dispatch<React.SetStateAction<any>>
  additionalinfod2894Props: any 
  setadditionalinfod2894Props: React.Dispatch<React.SetStateAction<any>>
  listgroupdcdbd: any 
  setlistgroupdcdbd: React.Dispatch<React.SetStateAction<any>>
  listgroupdcdbdProps: any 
  setlistgroupdcdbdProps: React.Dispatch<React.SetStateAction<any>>
  list_tab_groupd6905: any 
  setlist_tab_groupd6905: React.Dispatch<React.SetStateAction<any>>
  list_tab_groupd6905Props: any 
  setlist_tab_groupd6905Props: React.Dispatch<React.SetStateAction<any>>
  document_list38c6e: any 
  setdocument_list38c6e: React.Dispatch<React.SetStateAction<any>>
  document_list38c6eProps: any 
  setdocument_list38c6eProps: React.Dispatch<React.SetStateAction<any>>
  doclisttable56e97: any 
  setdoclisttable56e97: React.Dispatch<React.SetStateAction<any>>
  doclisttable56e97Props: any 
  setdoclisttable56e97Props: React.Dispatch<React.SetStateAction<any>>
  validation_listae827: any 
  setvalidation_listae827: React.Dispatch<React.SetStateAction<any>>
  validation_listae827Props: any 
  setvalidation_listae827Props: React.Dispatch<React.SetStateAction<any>>
  valdnlisttable17ec7: any 
  setvaldnlisttable17ec7: React.Dispatch<React.SetStateAction<any>>
  valdnlisttable17ec7Props: any 
  setvaldnlisttable17ec7Props: React.Dispatch<React.SetStateAction<any>>
  comment_list72944: any 
  setcomment_list72944: React.Dispatch<React.SetStateAction<any>>
  comment_list72944Props: any 
  setcomment_list72944Props: React.Dispatch<React.SetStateAction<any>>
  cmntlisttable02d0e: any 
  setcmntlisttable02d0e: React.Dispatch<React.SetStateAction<any>>
  cmntlisttable02d0eProps: any 
  setcmntlisttable02d0eProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_lista0a19: any 
  setrtgs_lista0a19: React.Dispatch<React.SetStateAction<any>>
  rtgs_lista0a19Props: any 
  setrtgs_lista0a19Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_grpcf7d8: any 
  setrtgs_list_grpcf7d8: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_grpcf7d8Props: any 
  setrtgs_list_grpcf7d8Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tble_groupab24b: any 
  setrtgs_list_tble_groupab24b: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tble_groupab24bProps: any 
  setrtgs_list_tble_groupab24bProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_table2926a: any 
  setrtgs_list_table2926a: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_table2926aProps: any 
  setrtgs_list_table2926aProps: React.Dispatch<React.SetStateAction<any>>
  group05462: any 
  setgroup05462: React.Dispatch<React.SetStateAction<any>>
  group05462Props: any 
  setgroup05462Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tab_grp28533: any 
  setrtgs_list_tab_grp28533: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tab_grp28533Props: any 
  setrtgs_list_tab_grp28533Props: React.Dispatch<React.SetStateAction<any>>
  documnt_list3a31d: any 
  setdocumnt_list3a31d: React.Dispatch<React.SetStateAction<any>>
  documnt_list3a31dProps: any 
  setdocumnt_list3a31dProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_lst_doc_list_table32147: any 
  setrtgs_lst_doc_list_table32147: React.Dispatch<React.SetStateAction<any>>
  rtgs_lst_doc_list_table32147Props: any 
  setrtgs_lst_doc_list_table32147Props: React.Dispatch<React.SetStateAction<any>>
  validtn_list10f93: any 
  setvalidtn_list10f93: React.Dispatch<React.SetStateAction<any>>
  validtn_list10f93Props: any 
  setvalidtn_list10f93Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_validtn_table84666: any 
  setrtgs_list_validtn_table84666: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_validtn_table84666Props: any 
  setrtgs_list_validtn_table84666Props: React.Dispatch<React.SetStateAction<any>>
  cmnt_liste161c: any 
  setcmnt_liste161c: React.Dispatch<React.SetStateAction<any>>
  cmnt_liste161cProps: any 
  setcmnt_liste161cProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_cmnts_list2148d: any 
  setrtgs_list_cmnts_list2148d: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_cmnts_list2148dProps: any 
  setrtgs_list_cmnts_list2148dProps: React.Dispatch<React.SetStateAction<any>>
  overallgroup05ff6: any 
  setoverallgroup05ff6: React.Dispatch<React.SetStateAction<any>>
  overallgroup05ff6Props: any 
  setoverallgroup05ff6Props: React.Dispatch<React.SetStateAction<any>>
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
  overallgroup1218f: any 
  setoverallgroup1218f: React.Dispatch<React.SetStateAction<any>>
  overallgroup1218fProps: any 
  setoverallgroup1218fProps: React.Dispatch<React.SetStateAction<any>>
  controlgroupfbb48: any 
  setcontrolgroupfbb48: React.Dispatch<React.SetStateAction<any>>
  controlgroupfbb48Props: any 
  setcontrolgroupfbb48Props: React.Dispatch<React.SetStateAction<any>>
  control_tab_group161ff: any 
  setcontrol_tab_group161ff: React.Dispatch<React.SetStateAction<any>>
  control_tab_group161ffProps: any 
  setcontrol_tab_group161ffProps: React.Dispatch<React.SetStateAction<any>>
  button_groupb9855: any 
  setbutton_groupb9855: React.Dispatch<React.SetStateAction<any>>
  button_groupb9855Props: any 
  setbutton_groupb9855Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_info5957a: any 
  setrtgs_info5957a: React.Dispatch<React.SetStateAction<any>>
  rtgs_info5957aProps: any 
  setrtgs_info5957aProps: React.Dispatch<React.SetStateAction<any>>
  allcontrolsb8c72: any 
  setallcontrolsb8c72: React.Dispatch<React.SetStateAction<any>>
  allcontrolsb8c72Props: any 
  setallcontrolsb8c72Props: React.Dispatch<React.SetStateAction<any>>
  commoninfod7eda: any 
  setcommoninfod7eda: React.Dispatch<React.SetStateAction<any>>
  commoninfod7edaProps: any 
  setcommoninfod7edaProps: React.Dispatch<React.SetStateAction<any>>
  basicinfoffb0a: any 
  setbasicinfoffb0a: React.Dispatch<React.SetStateAction<any>>
  basicinfoffb0aProps: any 
  setbasicinfoffb0aProps: React.Dispatch<React.SetStateAction<any>>
  additionalinfo4baba: any 
  setadditionalinfo4baba: React.Dispatch<React.SetStateAction<any>>
  additionalinfo4babaProps: any 
  setadditionalinfo4babaProps: React.Dispatch<React.SetStateAction<any>>
  listgroup97a7c: any 
  setlistgroup97a7c: React.Dispatch<React.SetStateAction<any>>
  listgroup97a7cProps: any 
  setlistgroup97a7cProps: React.Dispatch<React.SetStateAction<any>>
  list_tab_group6782e: any 
  setlist_tab_group6782e: React.Dispatch<React.SetStateAction<any>>
  list_tab_group6782eProps: any 
  setlist_tab_group6782eProps: React.Dispatch<React.SetStateAction<any>>
  validation_listcc09d: any 
  setvalidation_listcc09d: React.Dispatch<React.SetStateAction<any>>
  validation_listcc09dProps: any 
  setvalidation_listcc09dProps: React.Dispatch<React.SetStateAction<any>>
  valdnlisttable4db84: any 
  setvaldnlisttable4db84: React.Dispatch<React.SetStateAction<any>>
  valdnlisttable4db84Props: any 
  setvaldnlisttable4db84Props: React.Dispatch<React.SetStateAction<any>>
  comment_listb158b: any 
  setcomment_listb158b: React.Dispatch<React.SetStateAction<any>>
  comment_listb158bProps: any 
  setcomment_listb158bProps: React.Dispatch<React.SetStateAction<any>>
  cmntlisttable96834: any 
  setcmntlisttable96834: React.Dispatch<React.SetStateAction<any>>
  cmntlisttable96834Props: any 
  setcmntlisttable96834Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_listf12c6: any 
  setrtgs_listf12c6: React.Dispatch<React.SetStateAction<any>>
  rtgs_listf12c6Props: any 
  setrtgs_listf12c6Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_grp82cfc: any 
  setrtgs_list_grp82cfc: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_grp82cfcProps: any 
  setrtgs_list_grp82cfcProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tble_groupe1ac5: any 
  setrtgs_list_tble_groupe1ac5: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tble_groupe1ac5Props: any 
  setrtgs_list_tble_groupe1ac5Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tablead2c7: any 
  setrtgs_list_tablead2c7: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tablead2c7Props: any 
  setrtgs_list_tablead2c7Props: React.Dispatch<React.SetStateAction<any>>
  group1b1aa: any 
  setgroup1b1aa: React.Dispatch<React.SetStateAction<any>>
  group1b1aaProps: any 
  setgroup1b1aaProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tab_grp43579: any 
  setrtgs_list_tab_grp43579: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_tab_grp43579Props: any 
  setrtgs_list_tab_grp43579Props: React.Dispatch<React.SetStateAction<any>>
  validtn_list3a9a1: any 
  setvalidtn_list3a9a1: React.Dispatch<React.SetStateAction<any>>
  validtn_list3a9a1Props: any 
  setvalidtn_list3a9a1Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_validtn_table10755: any 
  setrtgs_list_validtn_table10755: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_validtn_table10755Props: any 
  setrtgs_list_validtn_table10755Props: React.Dispatch<React.SetStateAction<any>>
  cmnt_list18a3b: any 
  setcmnt_list18a3b: React.Dispatch<React.SetStateAction<any>>
  cmnt_list18a3bProps: any 
  setcmnt_list18a3bProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_cmnts_list85130: any 
  setrtgs_list_cmnts_list85130: React.Dispatch<React.SetStateAction<any>>
  rtgs_list_cmnts_list85130Props: any 
  setrtgs_list_cmnts_list85130Props: React.Dispatch<React.SetStateAction<any>>
  groupdd3f6: any 
  setgroupdd3f6: React.Dispatch<React.SetStateAction<any>>
  groupdd3f6Props: any 
  setgroupdd3f6Props: React.Dispatch<React.SetStateAction<any>>
  simulator_main_group0541e: any 
  setsimulator_main_group0541e: React.Dispatch<React.SetStateAction<any>>
  simulator_main_group0541eProps: any 
  setsimulator_main_group0541eProps: React.Dispatch<React.SetStateAction<any>>
  simulator_tab_groupfd732: any 
  setsimulator_tab_groupfd732: React.Dispatch<React.SetStateAction<any>>
  simulator_tab_groupfd732Props: any 
  setsimulator_tab_groupfd732Props: React.Dispatch<React.SetStateAction<any>>
  op_financial4735b: any 
  setop_financial4735b: React.Dispatch<React.SetStateAction<any>>
  op_financial4735bProps: any 
  setop_financial4735bProps: React.Dispatch<React.SetStateAction<any>>
  op_financial_grp8a39a: any 
  setop_financial_grp8a39a: React.Dispatch<React.SetStateAction<any>>
  op_financial_grp8a39aProps: any 
  setop_financial_grp8a39aProps: React.Dispatch<React.SetStateAction<any>>
  op_settlemente399b: any 
  setop_settlemente399b: React.Dispatch<React.SetStateAction<any>>
  op_settlemente399bProps: any 
  setop_settlemente399bProps: React.Dispatch<React.SetStateAction<any>>
  op_settlement_grpb706d: any 
  setop_settlement_grpb706d: React.Dispatch<React.SetStateAction<any>>
  op_settlement_grpb706dProps: any 
  setop_settlement_grpb706dProps: React.Dispatch<React.SetStateAction<any>>
  ip_financial66005: any 
  setip_financial66005: React.Dispatch<React.SetStateAction<any>>
  ip_financial66005Props: any 
  setip_financial66005Props: React.Dispatch<React.SetStateAction<any>>
  ip_debtor_dtls8143c: any 
  setip_debtor_dtls8143c: React.Dispatch<React.SetStateAction<any>>
  ip_debtor_dtls8143cProps: any 
  setip_debtor_dtls8143cProps: React.Dispatch<React.SetStateAction<any>>
  ip_creditor_dtls1ade4: any 
  setip_creditor_dtls1ade4: React.Dispatch<React.SetStateAction<any>>
  ip_creditor_dtls1ade4Props: any 
  setip_creditor_dtls1ade4Props: React.Dispatch<React.SetStateAction<any>>
  payment_dtls30132: any 
  setpayment_dtls30132: React.Dispatch<React.SetStateAction<any>>
  payment_dtls30132Props: any 
  setpayment_dtls30132Props: React.Dispatch<React.SetStateAction<any>>
  addionl_info43014: any 
  setaddionl_info43014: React.Dispatch<React.SetStateAction<any>>
  addionl_info43014Props: any 
  setaddionl_info43014Props: React.Dispatch<React.SetStateAction<any>>
  button_grp7b9b7: any 
  setbutton_grp7b9b7: React.Dispatch<React.SetStateAction<any>>
  button_grp7b9b7Props: any 
  setbutton_grp7b9b7Props: React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5e076: any,
  setoutbound_or_inbound5e076:React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5e076Props: any 
  setoutbound_or_inbound5e076Props: React.Dispatch<React.SetStateAction<any>>
  search14cf0: any,
  setsearch14cf0:React.Dispatch<React.SetStateAction<any>>
  search14cf0Props: any 
  setsearch14cf0Props: React.Dispatch<React.SetStateAction<any>>
  refresh313d0: any,
  setrefresh313d0:React.Dispatch<React.SetStateAction<any>>
  refresh313d0Props: any 
  setrefresh313d0Props: React.Dispatch<React.SetStateAction<any>>
  downloadcb505: any,
  setdownloadcb505:React.Dispatch<React.SetStateAction<any>>
  downloadcb505Props: any 
  setdownloadcb505Props: React.Dispatch<React.SetStateAction<any>>
  new_payment7f5db: any,
  setnew_payment7f5db:React.Dispatch<React.SetStateAction<any>>
  new_payment7f5dbProps: any 
  setnew_payment7f5dbProps: React.Dispatch<React.SetStateAction<any>>
  value_date_view_allb0df6: any,
  setvalue_date_view_allb0df6:React.Dispatch<React.SetStateAction<any>>
  value_date_view_allb0df6Props: any 
  setvalue_date_view_allb0df6Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_view_all33724: any,
  setdr_account_view_all33724:React.Dispatch<React.SetStateAction<any>>
  dr_account_view_all33724Props: any 
  setdr_account_view_all33724Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_view_allc0a46: any,
  setdr_name_view_allc0a46:React.Dispatch<React.SetStateAction<any>>
  dr_name_view_allc0a46Props: any 
  setdr_name_view_allc0a46Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_view_all54da6: any,
  setdr_currency_view_all54da6:React.Dispatch<React.SetStateAction<any>>
  dr_currency_view_all54da6Props: any 
  setdr_currency_view_all54da6Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_view_all88d6b: any,
  setdr_amount_view_all88d6b:React.Dispatch<React.SetStateAction<any>>
  dr_amount_view_all88d6bProps: any 
  setdr_amount_view_all88d6bProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alld4b39: any,
  setcr_account_view_alld4b39:React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alld4b39Props: any 
  setcr_account_view_alld4b39Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_view_all19d14: any,
  setcr_name_view_all19d14:React.Dispatch<React.SetStateAction<any>>
  cr_name_view_all19d14Props: any 
  setcr_name_view_all19d14Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_view_all82afd: any,
  setcr_currency_view_all82afd:React.Dispatch<React.SetStateAction<any>>
  cr_currency_view_all82afdProps: any 
  setcr_currency_view_all82afdProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all47e6b: any,
  setcr_amount_view_all47e6b:React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all47e6bProps: any 
  setcr_amount_view_all47e6bProps: React.Dispatch<React.SetStateAction<any>>
  uuid_view_allef1ca: any,
  setuuid_view_allef1ca:React.Dispatch<React.SetStateAction<any>>
  uuid_view_allef1caProps: any 
  setuuid_view_allef1caProps: React.Dispatch<React.SetStateAction<any>>
  view_process_type569cf: any,
  setview_process_type569cf:React.Dispatch<React.SetStateAction<any>>
  view_process_type569cfProps: any 
  setview_process_type569cfProps: React.Dispatch<React.SetStateAction<any>>
  view_all_journeyd3ae9: any,
  setview_all_journeyd3ae9:React.Dispatch<React.SetStateAction<any>>
  view_all_journeyd3ae9Props: any 
  setview_all_journeyd3ae9Props: React.Dispatch<React.SetStateAction<any>>
  value_date_failure_queue12297: any,
  setvalue_date_failure_queue12297:React.Dispatch<React.SetStateAction<any>>
  value_date_failure_queue12297Props: any 
  setvalue_date_failure_queue12297Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_failure_queue42953: any,
  setdr_account_failure_queue42953:React.Dispatch<React.SetStateAction<any>>
  dr_account_failure_queue42953Props: any 
  setdr_account_failure_queue42953Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_failure_queue03c86: any,
  setdr_name_failure_queue03c86:React.Dispatch<React.SetStateAction<any>>
  dr_name_failure_queue03c86Props: any 
  setdr_name_failure_queue03c86Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_failure_queuef9d2d: any,
  setdr_currency_failure_queuef9d2d:React.Dispatch<React.SetStateAction<any>>
  dr_currency_failure_queuef9d2dProps: any 
  setdr_currency_failure_queuef9d2dProps: React.Dispatch<React.SetStateAction<any>>
  dr_amount_failure_queue95d4e: any,
  setdr_amount_failure_queue95d4e:React.Dispatch<React.SetStateAction<any>>
  dr_amount_failure_queue95d4eProps: any 
  setdr_amount_failure_queue95d4eProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_failure_queuea7246: any,
  setcr_account_failure_queuea7246:React.Dispatch<React.SetStateAction<any>>
  cr_account_failure_queuea7246Props: any 
  setcr_account_failure_queuea7246Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_failure_queue57c4d: any,
  setcr_name_failure_queue57c4d:React.Dispatch<React.SetStateAction<any>>
  cr_name_failure_queue57c4dProps: any 
  setcr_name_failure_queue57c4dProps: React.Dispatch<React.SetStateAction<any>>
  cr_currency_failure_queue09d7a: any,
  setcr_currency_failure_queue09d7a:React.Dispatch<React.SetStateAction<any>>
  cr_currency_failure_queue09d7aProps: any 
  setcr_currency_failure_queue09d7aProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_failure_queue0aef8: any,
  setcr_amount_failure_queue0aef8:React.Dispatch<React.SetStateAction<any>>
  cr_amount_failure_queue0aef8Props: any 
  setcr_amount_failure_queue0aef8Props: React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queueb7b55: any,
  setuuid_failure_queueb7b55:React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queueb7b55Props: any 
  setuuid_failure_queueb7b55Props: React.Dispatch<React.SetStateAction<any>>
  failure_queue_journeyc8638: any,
  setfailure_queue_journeyc8638:React.Dispatch<React.SetStateAction<any>>
  failure_queue_journeyc8638Props: any 
  setfailure_queue_journeyc8638Props: React.Dispatch<React.SetStateAction<any>>
  value_date_success_queue7c209: any,
  setvalue_date_success_queue7c209:React.Dispatch<React.SetStateAction<any>>
  value_date_success_queue7c209Props: any 
  setvalue_date_success_queue7c209Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_success_queueeddaf: any,
  setdr_account_success_queueeddaf:React.Dispatch<React.SetStateAction<any>>
  dr_account_success_queueeddafProps: any 
  setdr_account_success_queueeddafProps: React.Dispatch<React.SetStateAction<any>>
  dr_name_success_queuec805b: any,
  setdr_name_success_queuec805b:React.Dispatch<React.SetStateAction<any>>
  dr_name_success_queuec805bProps: any 
  setdr_name_success_queuec805bProps: React.Dispatch<React.SetStateAction<any>>
  dr_currency_operational_pending10a49: any,
  setdr_currency_operational_pending10a49:React.Dispatch<React.SetStateAction<any>>
  dr_currency_operational_pending10a49Props: any 
  setdr_currency_operational_pending10a49Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_success_queueda254: any,
  setdr_amount_success_queueda254:React.Dispatch<React.SetStateAction<any>>
  dr_amount_success_queueda254Props: any 
  setdr_amount_success_queueda254Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_success_queue60480: any,
  setcr_account_success_queue60480:React.Dispatch<React.SetStateAction<any>>
  cr_account_success_queue60480Props: any 
  setcr_account_success_queue60480Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_success_queueb80d4: any,
  setcr_name_success_queueb80d4:React.Dispatch<React.SetStateAction<any>>
  cr_name_success_queueb80d4Props: any 
  setcr_name_success_queueb80d4Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_success_queue2f950: any,
  setcr_currency_success_queue2f950:React.Dispatch<React.SetStateAction<any>>
  cr_currency_success_queue2f950Props: any 
  setcr_currency_success_queue2f950Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_success_queue019a2: any,
  setcr_amount_success_queue019a2:React.Dispatch<React.SetStateAction<any>>
  cr_amount_success_queue019a2Props: any 
  setcr_amount_success_queue019a2Props: React.Dispatch<React.SetStateAction<any>>
  uuid_success_queued0e34: any,
  setuuid_success_queued0e34:React.Dispatch<React.SetStateAction<any>>
  uuid_success_queued0e34Props: any 
  setuuid_success_queued0e34Props: React.Dispatch<React.SetStateAction<any>>
  success_queue_journey68ac9: any,
  setsuccess_queue_journey68ac9:React.Dispatch<React.SetStateAction<any>>
  success_queue_journey68ac9Props: any 
  setsuccess_queue_journey68ac9Props: React.Dispatch<React.SetStateAction<any>>
  value_date_return_queuee5e11: any,
  setvalue_date_return_queuee5e11:React.Dispatch<React.SetStateAction<any>>
  value_date_return_queuee5e11Props: any 
  setvalue_date_return_queuee5e11Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_return_queuebdabb: any,
  setdr_account_return_queuebdabb:React.Dispatch<React.SetStateAction<any>>
  dr_account_return_queuebdabbProps: any 
  setdr_account_return_queuebdabbProps: React.Dispatch<React.SetStateAction<any>>
  dr_name_return_queue958c9: any,
  setdr_name_return_queue958c9:React.Dispatch<React.SetStateAction<any>>
  dr_name_return_queue958c9Props: any 
  setdr_name_return_queue958c9Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_return_queuee94b2: any,
  setdr_currency_return_queuee94b2:React.Dispatch<React.SetStateAction<any>>
  dr_currency_return_queuee94b2Props: any 
  setdr_currency_return_queuee94b2Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_return_queue2f324: any,
  setdr_amount_return_queue2f324:React.Dispatch<React.SetStateAction<any>>
  dr_amount_return_queue2f324Props: any 
  setdr_amount_return_queue2f324Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_return_queue21a57: any,
  setcr_account_return_queue21a57:React.Dispatch<React.SetStateAction<any>>
  cr_account_return_queue21a57Props: any 
  setcr_account_return_queue21a57Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_return_queue13fec: any,
  setcr_name_return_queue13fec:React.Dispatch<React.SetStateAction<any>>
  cr_name_return_queue13fecProps: any 
  setcr_name_return_queue13fecProps: React.Dispatch<React.SetStateAction<any>>
  cr_currency_return_queuef37f7: any,
  setcr_currency_return_queuef37f7:React.Dispatch<React.SetStateAction<any>>
  cr_currency_return_queuef37f7Props: any 
  setcr_currency_return_queuef37f7Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_return_queue95903: any,
  setcr_amount_return_queue95903:React.Dispatch<React.SetStateAction<any>>
  cr_amount_return_queue95903Props: any 
  setcr_amount_return_queue95903Props: React.Dispatch<React.SetStateAction<any>>
  uuid_return_queue9fa04: any,
  setuuid_return_queue9fa04:React.Dispatch<React.SetStateAction<any>>
  uuid_return_queue9fa04Props: any 
  setuuid_return_queue9fa04Props: React.Dispatch<React.SetStateAction<any>>
  return_queue_journeycc9d3: any,
  setreturn_queue_journeycc9d3:React.Dispatch<React.SetStateAction<any>>
  return_queue_journeycc9d3Props: any 
  setreturn_queue_journeycc9d3Props: React.Dispatch<React.SetStateAction<any>>
  value_date_operational_pending6ecd4: any,
  setvalue_date_operational_pending6ecd4:React.Dispatch<React.SetStateAction<any>>
  value_date_operational_pending6ecd4Props: any 
  setvalue_date_operational_pending6ecd4Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_name_operational_pending2ab87: any,
  setdr_account_name_operational_pending2ab87:React.Dispatch<React.SetStateAction<any>>
  dr_account_name_operational_pending2ab87Props: any 
  setdr_account_name_operational_pending2ab87Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_operational_pendinga8ff6: any,
  setdr_name_operational_pendinga8ff6:React.Dispatch<React.SetStateAction<any>>
  dr_name_operational_pendinga8ff6Props: any 
  setdr_name_operational_pendinga8ff6Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_operational_pending5146b: any,
  setdr_currency_operational_pending5146b:React.Dispatch<React.SetStateAction<any>>
  dr_currency_operational_pending5146bProps: any 
  setdr_currency_operational_pending5146bProps: React.Dispatch<React.SetStateAction<any>>
  dr_amount_operational_pending70e3f: any,
  setdr_amount_operational_pending70e3f:React.Dispatch<React.SetStateAction<any>>
  dr_amount_operational_pending70e3fProps: any 
  setdr_amount_operational_pending70e3fProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_operational_pendingf9a9c: any,
  setcr_account_operational_pendingf9a9c:React.Dispatch<React.SetStateAction<any>>
  cr_account_operational_pendingf9a9cProps: any 
  setcr_account_operational_pendingf9a9cProps: React.Dispatch<React.SetStateAction<any>>
  cr_name_operational_pendingbce21: any,
  setcr_name_operational_pendingbce21:React.Dispatch<React.SetStateAction<any>>
  cr_name_operational_pendingbce21Props: any 
  setcr_name_operational_pendingbce21Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_operational_pending282bc: any,
  setcr_currency_operational_pending282bc:React.Dispatch<React.SetStateAction<any>>
  cr_currency_operational_pending282bcProps: any 
  setcr_currency_operational_pending282bcProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_operational_pending0df81: any,
  setcr_amount_operational_pending0df81:React.Dispatch<React.SetStateAction<any>>
  cr_amount_operational_pending0df81Props: any 
  setcr_amount_operational_pending0df81Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btn770f9: any,
  setnew_payment_chk_approve_btn770f9:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btn770f9Props: any 
  setnew_payment_chk_approve_btn770f9Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_send_to_maker_btn4c9a0: any,
  setnew_payment_chk_send_to_maker_btn4c9a0:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_send_to_maker_btn4c9a0Props: any 
  setnew_payment_chk_send_to_maker_btn4c9a0Props: React.Dispatch<React.SetStateAction<any>>
  view_details00488: any,
  setview_details00488:React.Dispatch<React.SetStateAction<any>>
  view_details00488Props: any 
  setview_details00488Props: React.Dispatch<React.SetStateAction<any>>
  repair9a97b: any,
  setrepair9a97b:React.Dispatch<React.SetStateAction<any>>
  repair9a97bProps: any 
  setrepair9a97bProps: React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendingeb172: any,
  setuuid_operational_pendingeb172:React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendingeb172Props: any 
  setuuid_operational_pendingeb172Props: React.Dispatch<React.SetStateAction<any>>
  trs_status11519: any,
  settrs_status11519:React.Dispatch<React.SetStateAction<any>>
  trs_status11519Props: any 
  settrs_status11519Props: React.Dispatch<React.SetStateAction<any>>
  reverse_posting0765b: any,
  setreverse_posting0765b:React.Dispatch<React.SetStateAction<any>>
  reverse_posting0765bProps: any 
  setreverse_posting0765bProps: React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey1a1a5: any,
  setoperational_pending_journey1a1a5:React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey1a1a5Props: any 
  setoperational_pending_journey1a1a5Props: React.Dispatch<React.SetStateAction<any>>
  value_date_technical_pending11fe0: any,
  setvalue_date_technical_pending11fe0:React.Dispatch<React.SetStateAction<any>>
  value_date_technical_pending11fe0Props: any 
  setvalue_date_technical_pending11fe0Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_technical_pendinge182f: any,
  setdr_account_technical_pendinge182f:React.Dispatch<React.SetStateAction<any>>
  dr_account_technical_pendinge182fProps: any 
  setdr_account_technical_pendinge182fProps: React.Dispatch<React.SetStateAction<any>>
  dr_name_technical_pendingbc6bb: any,
  setdr_name_technical_pendingbc6bb:React.Dispatch<React.SetStateAction<any>>
  dr_name_technical_pendingbc6bbProps: any 
  setdr_name_technical_pendingbc6bbProps: React.Dispatch<React.SetStateAction<any>>
  dr_currency_technical_pendingbc856: any,
  setdr_currency_technical_pendingbc856:React.Dispatch<React.SetStateAction<any>>
  dr_currency_technical_pendingbc856Props: any 
  setdr_currency_technical_pendingbc856Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_technical_pending5e6cc: any,
  setdr_amount_technical_pending5e6cc:React.Dispatch<React.SetStateAction<any>>
  dr_amount_technical_pending5e6ccProps: any 
  setdr_amount_technical_pending5e6ccProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_technical_pending3c4aa: any,
  setcr_account_technical_pending3c4aa:React.Dispatch<React.SetStateAction<any>>
  cr_account_technical_pending3c4aaProps: any 
  setcr_account_technical_pending3c4aaProps: React.Dispatch<React.SetStateAction<any>>
  cr_name_technical_pending1bc34: any,
  setcr_name_technical_pending1bc34:React.Dispatch<React.SetStateAction<any>>
  cr_name_technical_pending1bc34Props: any 
  setcr_name_technical_pending1bc34Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_technical_pending78349: any,
  setcr_currency_technical_pending78349:React.Dispatch<React.SetStateAction<any>>
  cr_currency_technical_pending78349Props: any 
  setcr_currency_technical_pending78349Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_technical_pending738a2: any,
  setcr_amount_technical_pending738a2:React.Dispatch<React.SetStateAction<any>>
  cr_amount_technical_pending738a2Props: any 
  setcr_amount_technical_pending738a2Props: React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queue73334: any,
  setuuid_failure_queue73334:React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queue73334Props: any 
  setuuid_failure_queue73334Props: React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601c: any,
  settechnical_pending_journey6601c:React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601cProps: any 
  settechnical_pending_journey6601cProps: React.Dispatch<React.SetStateAction<any>>
  top_divider52f90: any,
  settop_divider52f90:React.Dispatch<React.SetStateAction<any>>
  top_divider52f90Props: any 
  settop_divider52f90Props: React.Dispatch<React.SetStateAction<any>>
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
  status4bd75: any,
  setstatus4bd75:React.Dispatch<React.SetStateAction<any>>
  status4bd75Props: any 
  setstatus4bd75Props: React.Dispatch<React.SetStateAction<any>>
  bottom_dividerb9220: any,
  setbottom_dividerb9220:React.Dispatch<React.SetStateAction<any>>
  bottom_dividerb9220Props: any 
  setbottom_dividerb9220Props: React.Dispatch<React.SetStateAction<any>>
  search0e695: any,
  setsearch0e695:React.Dispatch<React.SetStateAction<any>>
  search0e695Props: any 
  setsearch0e695Props: React.Dispatch<React.SetStateAction<any>>
  cleareddfa: any,
  setcleareddfa:React.Dispatch<React.SetStateAction<any>>
  cleareddfaProps: any 
  setcleareddfaProps: React.Dispatch<React.SetStateAction<any>>
  scan31ce1: any,
  setscan31ce1:React.Dispatch<React.SetStateAction<any>>
  scan31ce1Props: any 
  setscan31ce1Props: React.Dispatch<React.SetStateAction<any>>
  folderscanf14e0: any,
  setfolderscanf14e0:React.Dispatch<React.SetStateAction<any>>
  folderscanf14e0Props: any 
  setfolderscanf14e0Props: React.Dispatch<React.SetStateAction<any>>
  savef2390: any,
  setsavef2390:React.Dispatch<React.SetStateAction<any>>
  savef2390Props: any 
  setsavef2390Props: React.Dispatch<React.SetStateAction<any>>
  cancel2bf72: any,
  setcancel2bf72:React.Dispatch<React.SetStateAction<any>>
  cancel2bf72Props: any 
  setcancel2bf72Props: React.Dispatch<React.SetStateAction<any>>
  updateed7a9: any,
  setupdateed7a9:React.Dispatch<React.SetStateAction<any>>
  updateed7a9Props: any 
  setupdateed7a9Props: React.Dispatch<React.SetStateAction<any>>
  signature3ad2e: any,
  setsignature3ad2e:React.Dispatch<React.SetStateAction<any>>
  signature3ad2eProps: any 
  setsignature3ad2eProps: React.Dispatch<React.SetStateAction<any>>
  approve05fe8: any,
  setapprove05fe8:React.Dispatch<React.SetStateAction<any>>
  approve05fe8Props: any 
  setapprove05fe8Props: React.Dispatch<React.SetStateAction<any>>
  send_to_makera4797: any,
  setsend_to_makera4797:React.Dispatch<React.SetStateAction<any>>
  send_to_makera4797Props: any 
  setsend_to_makera4797Props: React.Dispatch<React.SetStateAction<any>>
  common_info3a458: any,
  setcommon_info3a458:React.Dispatch<React.SetStateAction<any>>
  common_info3a458Props: any 
  setcommon_info3a458Props: React.Dispatch<React.SetStateAction<any>>
  dr_account27abb: any,
  setdr_account27abb:React.Dispatch<React.SetStateAction<any>>
  dr_account27abbProps: any 
  setdr_account27abbProps: React.Dispatch<React.SetStateAction<any>>
  dr_name84266: any,
  setdr_name84266:React.Dispatch<React.SetStateAction<any>>
  dr_name84266Props: any 
  setdr_name84266Props: React.Dispatch<React.SetStateAction<any>>
  base_currencyb386d: any,
  setbase_currencyb386d:React.Dispatch<React.SetStateAction<any>>
  base_currencyb386dProps: any 
  setbase_currencyb386dProps: React.Dispatch<React.SetStateAction<any>>
  dr_cust_ac_sanc_lmtb74f7: any,
  setdr_cust_ac_sanc_lmtb74f7:React.Dispatch<React.SetStateAction<any>>
  dr_cust_ac_sanc_lmtb74f7Props: any 
  setdr_cust_ac_sanc_lmtb74f7Props: React.Dispatch<React.SetStateAction<any>>
  dr_cust_ac_balance753dd: any,
  setdr_cust_ac_balance753dd:React.Dispatch<React.SetStateAction<any>>
  dr_cust_ac_balance753ddProps: any 
  setdr_cust_ac_balance753ddProps: React.Dispatch<React.SetStateAction<any>>
  basic_info216f3: any,
  setbasic_info216f3:React.Dispatch<React.SetStateAction<any>>
  basic_info216f3Props: any 
  setbasic_info216f3Props: React.Dispatch<React.SetStateAction<any>>
  waive_charges929e5: any,
  setwaive_charges929e5:React.Dispatch<React.SetStateAction<any>>
  waive_charges929e5Props: any 
  setwaive_charges929e5Props: React.Dispatch<React.SetStateAction<any>>
  cr_accounta818b: any,
  setcr_accounta818b:React.Dispatch<React.SetStateAction<any>>
  cr_accounta818bProps: any 
  setcr_accounta818bProps: React.Dispatch<React.SetStateAction<any>>
  cr_namea4b34: any,
  setcr_namea4b34:React.Dispatch<React.SetStateAction<any>>
  cr_namea4b34Props: any 
  setcr_namea4b34Props: React.Dispatch<React.SetStateAction<any>>
  cr_bank_code8a2bc: any,
  setcr_bank_code8a2bc:React.Dispatch<React.SetStateAction<any>>
  cr_bank_code8a2bcProps: any 
  setcr_bank_code8a2bcProps: React.Dispatch<React.SetStateAction<any>>
  cr_bank_name434eb: any,
  setcr_bank_name434eb:React.Dispatch<React.SetStateAction<any>>
  cr_bank_name434ebProps: any 
  setcr_bank_name434ebProps: React.Dispatch<React.SetStateAction<any>>
  cr_bank_bic3d26f: any,
  setcr_bank_bic3d26f:React.Dispatch<React.SetStateAction<any>>
  cr_bank_bic3d26fProps: any 
  setcr_bank_bic3d26fProps: React.Dispatch<React.SetStateAction<any>>
  forex_currency65e0b: any,
  setforex_currency65e0b:React.Dispatch<React.SetStateAction<any>>
  forex_currency65e0bProps: any 
  setforex_currency65e0bProps: React.Dispatch<React.SetStateAction<any>>
  exchange_rate88caf: any,
  setexchange_rate88caf:React.Dispatch<React.SetStateAction<any>>
  exchange_rate88cafProps: any 
  setexchange_rate88cafProps: React.Dispatch<React.SetStateAction<any>>
  rate_codee56ad: any,
  setrate_codee56ad:React.Dispatch<React.SetStateAction<any>>
  rate_codee56adProps: any 
  setrate_codee56adProps: React.Dispatch<React.SetStateAction<any>>
  forex_amounta58a5: any,
  setforex_amounta58a5:React.Dispatch<React.SetStateAction<any>>
  forex_amounta58a5Props: any 
  setforex_amounta58a5Props: React.Dispatch<React.SetStateAction<any>>
  base_amount3b226: any,
  setbase_amount3b226:React.Dispatch<React.SetStateAction<any>>
  base_amount3b226Props: any 
  setbase_amount3b226Props: React.Dispatch<React.SetStateAction<any>>
  rate_ref_no82399: any,
  setrate_ref_no82399:React.Dispatch<React.SetStateAction<any>>
  rate_ref_no82399Props: any 
  setrate_ref_no82399Props: React.Dispatch<React.SetStateAction<any>>
  rate_cust_idad42a: any,
  setrate_cust_idad42a:React.Dispatch<React.SetStateAction<any>>
  rate_cust_idad42aProps: any 
  setrate_cust_idad42aProps: React.Dispatch<React.SetStateAction<any>>
  addtional_info46cb8: any,
  setaddtional_info46cb8:React.Dispatch<React.SetStateAction<any>>
  addtional_info46cb8Props: any 
  setaddtional_info46cb8Props: React.Dispatch<React.SetStateAction<any>>
  signature_screen413bb: any,
  setsignature_screen413bb:React.Dispatch<React.SetStateAction<any>>
  signature_screen413bbProps: any 
  setsignature_screen413bbProps: React.Dispatch<React.SetStateAction<any>>
  remittance_infoba5e0: any,
  setremittance_infoba5e0:React.Dispatch<React.SetStateAction<any>>
  remittance_infoba5e0Props: any 
  setremittance_infoba5e0Props: React.Dispatch<React.SetStateAction<any>>
  additional_reff63a3: any,
  setadditional_reff63a3:React.Dispatch<React.SetStateAction<any>>
  additional_reff63a3Props: any 
  setadditional_reff63a3Props: React.Dispatch<React.SetStateAction<any>>
  customwidgetd7e47: any,
  setcustomwidgetd7e47:React.Dispatch<React.SetStateAction<any>>
  customwidgetd7e47Props: any 
  setcustomwidgetd7e47Props: React.Dispatch<React.SetStateAction<any>>
  vgphstm_uuidcf6fc: any,
  setvgphstm_uuidcf6fc:React.Dispatch<React.SetStateAction<any>>
  vgphstm_uuidcf6fcProps: any 
  setvgphstm_uuidcf6fcProps: React.Dispatch<React.SetStateAction<any>>
  filename7c104: any,
  setfilename7c104:React.Dispatch<React.SetStateAction<any>>
  filename7c104Props: any 
  setfilename7c104Props: React.Dispatch<React.SetStateAction<any>>
  actionf530a: any,
  setactionf530a:React.Dispatch<React.SetStateAction<any>>
  actionf530aProps: any 
  setactionf530aProps: React.Dispatch<React.SetStateAction<any>>
  vldcode0c0ce: any,
  setvldcode0c0ce:React.Dispatch<React.SetStateAction<any>>
  vldcode0c0ceProps: any 
  setvldcode0c0ceProps: React.Dispatch<React.SetStateAction<any>>
  vldreason2ef16: any,
  setvldreason2ef16:React.Dispatch<React.SetStateAction<any>>
  vldreason2ef16Props: any 
  setvldreason2ef16Props: React.Dispatch<React.SetStateAction<any>>
  cmnts11ffa: any,
  setcmnts11ffa:React.Dispatch<React.SetStateAction<any>>
  cmnts11ffaProps: any 
  setcmnts11ffaProps: React.Dispatch<React.SetStateAction<any>>
  tran_id5f12f: any,
  settran_id5f12f:React.Dispatch<React.SetStateAction<any>>
  tran_id5f12fProps: any 
  settran_id5f12fProps: React.Dispatch<React.SetStateAction<any>>
  dr_acnt_no469c1: any,
  setdr_acnt_no469c1:React.Dispatch<React.SetStateAction<any>>
  dr_acnt_no469c1Props: any 
  setdr_acnt_no469c1Props: React.Dispatch<React.SetStateAction<any>>
  cr_acnt_nocb409: any,
  setcr_acnt_nocb409:React.Dispatch<React.SetStateAction<any>>
  cr_acnt_nocb409Props: any 
  setcr_acnt_nocb409Props: React.Dispatch<React.SetStateAction<any>>
  amntef7a4: any,
  setamntef7a4:React.Dispatch<React.SetStateAction<any>>
  amntef7a4Props: any 
  setamntef7a4Props: React.Dispatch<React.SetStateAction<any>>
  cr_bank_code24beb: any,
  setcr_bank_code24beb:React.Dispatch<React.SetStateAction<any>>
  cr_bank_code24bebProps: any 
  setcr_bank_code24bebProps: React.Dispatch<React.SetStateAction<any>>
  created_bye14cd: any,
  setcreated_bye14cd:React.Dispatch<React.SetStateAction<any>>
  created_bye14cdProps: any 
  setcreated_bye14cdProps: React.Dispatch<React.SetStateAction<any>>
  created_date14669: any,
  setcreated_date14669:React.Dispatch<React.SetStateAction<any>>
  created_date14669Props: any 
  setcreated_date14669Props: React.Dispatch<React.SetStateAction<any>>
  file_name_rtgs_list06cd7: any,
  setfile_name_rtgs_list06cd7:React.Dispatch<React.SetStateAction<any>>
  file_name_rtgs_list06cd7Props: any 
  setfile_name_rtgs_list06cd7Props: React.Dispatch<React.SetStateAction<any>>
  action_rtgs_listcf67e: any,
  setaction_rtgs_listcf67e:React.Dispatch<React.SetStateAction<any>>
  action_rtgs_listcf67eProps: any 
  setaction_rtgs_listcf67eProps: React.Dispatch<React.SetStateAction<any>>
  vld_code_rtgs_lsta5e1f: any,
  setvld_code_rtgs_lsta5e1f:React.Dispatch<React.SetStateAction<any>>
  vld_code_rtgs_lsta5e1fProps: any 
  setvld_code_rtgs_lsta5e1fProps: React.Dispatch<React.SetStateAction<any>>
  vld_reason_rtgs_listdd73b: any,
  setvld_reason_rtgs_listdd73b:React.Dispatch<React.SetStateAction<any>>
  vld_reason_rtgs_listdd73bProps: any 
  setvld_reason_rtgs_listdd73bProps: React.Dispatch<React.SetStateAction<any>>
  cmnts_rtgs_listee03b: any,
  setcmnts_rtgs_listee03b:React.Dispatch<React.SetStateAction<any>>
  cmnts_rtgs_listee03bProps: any 
  setcmnts_rtgs_listee03bProps: React.Dispatch<React.SetStateAction<any>>
  documentviewer9df1d: any,
  setdocumentviewer9df1d:React.Dispatch<React.SetStateAction<any>>
  documentviewer9df1dProps: any 
  setdocumentviewer9df1dProps: React.Dispatch<React.SetStateAction<any>>
  text9205d: any,
  settext9205d:React.Dispatch<React.SetStateAction<any>>
  text9205dProps: any 
  settext9205dProps: React.Dispatch<React.SetStateAction<any>>
  reasondesc20b1a: any,
  setreasondesc20b1a:React.Dispatch<React.SetStateAction<any>>
  reasondesc20b1aProps: any 
  setreasondesc20b1aProps: React.Dispatch<React.SetStateAction<any>>
  cancel7f45a: any,
  setcancel7f45a:React.Dispatch<React.SetStateAction<any>>
  cancel7f45aProps: any 
  setcancel7f45aProps: React.Dispatch<React.SetStateAction<any>>
  continue599e4: any,
  setcontinue599e4:React.Dispatch<React.SetStateAction<any>>
  continue599e4Props: any 
  setcontinue599e4Props: React.Dispatch<React.SetStateAction<any>>
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
  dr_account36b40: any,
  setdr_account36b40:React.Dispatch<React.SetStateAction<any>>
  dr_account36b40Props: any 
  setdr_account36b40Props: React.Dispatch<React.SetStateAction<any>>
  currency_labele21ba: any,
  setcurrency_labele21ba:React.Dispatch<React.SetStateAction<any>>
  currency_labele21baProps: any 
  setcurrency_labele21baProps: React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7b: any,
  setcredit_account_label65c7b:React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7bProps: any 
  setcredit_account_label65c7bProps: React.Dispatch<React.SetStateAction<any>>
  dr_currency9c8a2: any,
  setdr_currency9c8a2:React.Dispatch<React.SetStateAction<any>>
  dr_currency9c8a2Props: any 
  setdr_currency9c8a2Props: React.Dispatch<React.SetStateAction<any>>
  cr_account0d1f4: any,
  setcr_account0d1f4:React.Dispatch<React.SetStateAction<any>>
  cr_account0d1f4Props: any 
  setcr_account0d1f4Props: React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725: any,
  setamount_labelfd725:React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725Props: any 
  setamount_labelfd725Props: React.Dispatch<React.SetStateAction<any>>
  process_status_labelb1ca9: any,
  setprocess_status_labelb1ca9:React.Dispatch<React.SetStateAction<any>>
  process_status_labelb1ca9Props: any 
  setprocess_status_labelb1ca9Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount01416: any,
  setcr_amount01416:React.Dispatch<React.SetStateAction<any>>
  cr_amount01416Props: any 
  setcr_amount01416Props: React.Dispatch<React.SetStateAction<any>>
  process_status500d6: any,
  setprocess_status500d6:React.Dispatch<React.SetStateAction<any>>
  process_status500d6Props: any 
  setprocess_status500d6Props: React.Dispatch<React.SetStateAction<any>>
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
  req_jsonviewer8d071: any,
  setreq_jsonviewer8d071:React.Dispatch<React.SetStateAction<any>>
  req_jsonviewer8d071Props: any 
  setreq_jsonviewer8d071Props: React.Dispatch<React.SetStateAction<any>>
  res_jsonviewerdd261: any,
  setres_jsonviewerdd261:React.Dispatch<React.SetStateAction<any>>
  res_jsonviewerdd261Props: any 
  setres_jsonviewerdd261Props: React.Dispatch<React.SetStateAction<any>>
  hold12b6e: any,
  sethold12b6e:React.Dispatch<React.SetStateAction<any>>
  hold12b6eProps: any 
  sethold12b6eProps: React.Dispatch<React.SetStateAction<any>>
  force_pass93cf0: any,
  setforce_pass93cf0:React.Dispatch<React.SetStateAction<any>>
  force_pass93cf0Props: any 
  setforce_pass93cf0Props: React.Dispatch<React.SetStateAction<any>>
  ip_approve2a0bf: any,
  setip_approve2a0bf:React.Dispatch<React.SetStateAction<any>>
  ip_approve2a0bfProps: any 
  setip_approve2a0bfProps: React.Dispatch<React.SetStateAction<any>>
  return0f9cc: any,
  setreturn0f9cc:React.Dispatch<React.SetStateAction<any>>
  return0f9ccProps: any 
  setreturn0f9ccProps: React.Dispatch<React.SetStateAction<any>>
  cancel568c6: any,
  setcancel568c6:React.Dispatch<React.SetStateAction<any>>
  cancel568c6Props: any 
  setcancel568c6Props: React.Dispatch<React.SetStateAction<any>>
  common_infoe66a9: any,
  setcommon_infoe66a9:React.Dispatch<React.SetStateAction<any>>
  common_infoe66a9Props: any 
  setcommon_infoe66a9Props: React.Dispatch<React.SetStateAction<any>>
  dr_account953ea: any,
  setdr_account953ea:React.Dispatch<React.SetStateAction<any>>
  dr_account953eaProps: any 
  setdr_account953eaProps: React.Dispatch<React.SetStateAction<any>>
  dr_named06e2: any,
  setdr_named06e2:React.Dispatch<React.SetStateAction<any>>
  dr_named06e2Props: any 
  setdr_named06e2Props: React.Dispatch<React.SetStateAction<any>>
  base_currency57d7d: any,
  setbase_currency57d7d:React.Dispatch<React.SetStateAction<any>>
  base_currency57d7dProps: any 
  setbase_currency57d7dProps: React.Dispatch<React.SetStateAction<any>>
  basic_info219cf: any,
  setbasic_info219cf:React.Dispatch<React.SetStateAction<any>>
  basic_info219cfProps: any 
  setbasic_info219cfProps: React.Dispatch<React.SetStateAction<any>>
  cr_accountddb15: any,
  setcr_accountddb15:React.Dispatch<React.SetStateAction<any>>
  cr_accountddb15Props: any 
  setcr_accountddb15Props: React.Dispatch<React.SetStateAction<any>>
  cr_name517b4: any,
  setcr_name517b4:React.Dispatch<React.SetStateAction<any>>
  cr_name517b4Props: any 
  setcr_name517b4Props: React.Dispatch<React.SetStateAction<any>>
  cr_bank_code9af27: any,
  setcr_bank_code9af27:React.Dispatch<React.SetStateAction<any>>
  cr_bank_code9af27Props: any 
  setcr_bank_code9af27Props: React.Dispatch<React.SetStateAction<any>>
  forex_currency10f51: any,
  setforex_currency10f51:React.Dispatch<React.SetStateAction<any>>
  forex_currency10f51Props: any 
  setforex_currency10f51Props: React.Dispatch<React.SetStateAction<any>>
  forex_amount2d477: any,
  setforex_amount2d477:React.Dispatch<React.SetStateAction<any>>
  forex_amount2d477Props: any 
  setforex_amount2d477Props: React.Dispatch<React.SetStateAction<any>>
  base_amount2df6d: any,
  setbase_amount2df6d:React.Dispatch<React.SetStateAction<any>>
  base_amount2df6dProps: any 
  setbase_amount2df6dProps: React.Dispatch<React.SetStateAction<any>>
  addtional_infof3fad: any,
  setaddtional_infof3fad:React.Dispatch<React.SetStateAction<any>>
  addtional_infof3fadProps: any 
  setaddtional_infof3fadProps: React.Dispatch<React.SetStateAction<any>>
  signature_screened28f: any,
  setsignature_screened28f:React.Dispatch<React.SetStateAction<any>>
  signature_screened28fProps: any 
  setsignature_screened28fProps: React.Dispatch<React.SetStateAction<any>>
  remittance_info0bded: any,
  setremittance_info0bded:React.Dispatch<React.SetStateAction<any>>
  remittance_info0bdedProps: any 
  setremittance_info0bdedProps: React.Dispatch<React.SetStateAction<any>>
  customwidget339ed: any,
  setcustomwidget339ed:React.Dispatch<React.SetStateAction<any>>
  customwidget339edProps: any 
  setcustomwidget339edProps: React.Dispatch<React.SetStateAction<any>>
  vgphstm_uuidf9485: any,
  setvgphstm_uuidf9485:React.Dispatch<React.SetStateAction<any>>
  vgphstm_uuidf9485Props: any 
  setvgphstm_uuidf9485Props: React.Dispatch<React.SetStateAction<any>>
  vldcoded6381: any,
  setvldcoded6381:React.Dispatch<React.SetStateAction<any>>
  vldcoded6381Props: any 
  setvldcoded6381Props: React.Dispatch<React.SetStateAction<any>>
  vldreasonfca81: any,
  setvldreasonfca81:React.Dispatch<React.SetStateAction<any>>
  vldreasonfca81Props: any 
  setvldreasonfca81Props: React.Dispatch<React.SetStateAction<any>>
  cmntsa418a: any,
  setcmntsa418a:React.Dispatch<React.SetStateAction<any>>
  cmntsa418aProps: any 
  setcmntsa418aProps: React.Dispatch<React.SetStateAction<any>>
  tran_id6705e: any,
  settran_id6705e:React.Dispatch<React.SetStateAction<any>>
  tran_id6705eProps: any 
  settran_id6705eProps: React.Dispatch<React.SetStateAction<any>>
  dr_acnt_no28ad2: any,
  setdr_acnt_no28ad2:React.Dispatch<React.SetStateAction<any>>
  dr_acnt_no28ad2Props: any 
  setdr_acnt_no28ad2Props: React.Dispatch<React.SetStateAction<any>>
  cr_acnt_no58585: any,
  setcr_acnt_no58585:React.Dispatch<React.SetStateAction<any>>
  cr_acnt_no58585Props: any 
  setcr_acnt_no58585Props: React.Dispatch<React.SetStateAction<any>>
  amnt95ed1: any,
  setamnt95ed1:React.Dispatch<React.SetStateAction<any>>
  amnt95ed1Props: any 
  setamnt95ed1Props: React.Dispatch<React.SetStateAction<any>>
  cr_bank_code01850: any,
  setcr_bank_code01850:React.Dispatch<React.SetStateAction<any>>
  cr_bank_code01850Props: any 
  setcr_bank_code01850Props: React.Dispatch<React.SetStateAction<any>>
  created_byb7915: any,
  setcreated_byb7915:React.Dispatch<React.SetStateAction<any>>
  created_byb7915Props: any 
  setcreated_byb7915Props: React.Dispatch<React.SetStateAction<any>>
  created_date6b8a8: any,
  setcreated_date6b8a8:React.Dispatch<React.SetStateAction<any>>
  created_date6b8a8Props: any 
  setcreated_date6b8a8Props: React.Dispatch<React.SetStateAction<any>>
  vld_code_rtgs_lst274ca: any,
  setvld_code_rtgs_lst274ca:React.Dispatch<React.SetStateAction<any>>
  vld_code_rtgs_lst274caProps: any 
  setvld_code_rtgs_lst274caProps: React.Dispatch<React.SetStateAction<any>>
  vld_reason_rtgs_listff18d: any,
  setvld_reason_rtgs_listff18d:React.Dispatch<React.SetStateAction<any>>
  vld_reason_rtgs_listff18dProps: any 
  setvld_reason_rtgs_listff18dProps: React.Dispatch<React.SetStateAction<any>>
  cmnts_rtgs_listd0091: any,
  setcmnts_rtgs_listd0091:React.Dispatch<React.SetStateAction<any>>
  cmnts_rtgs_listd0091Props: any 
  setcmnts_rtgs_listd0091Props: React.Dispatch<React.SetStateAction<any>>
  text574c6: any,
  settext574c6:React.Dispatch<React.SetStateAction<any>>
  text574c6Props: any 
  settext574c6Props: React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown6f51c: any,
  setreturn_reason_dropdown6f51c:React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown6f51cProps: any 
  setreturn_reason_dropdown6f51cProps: React.Dispatch<React.SetStateAction<any>>
  closea52fd: any,
  setclosea52fd:React.Dispatch<React.SetStateAction<any>>
  closea52fdProps: any 
  setclosea52fdProps: React.Dispatch<React.SetStateAction<any>>
  savebe5ab: any,
  setsavebe5ab:React.Dispatch<React.SetStateAction<any>>
  savebe5abProps: any 
  setsavebe5abProps: React.Dispatch<React.SetStateAction<any>>
  product_code_op8fcb1: any,
  setproduct_code_op8fcb1:React.Dispatch<React.SetStateAction<any>>
  product_code_op8fcb1Props: any 
  setproduct_code_op8fcb1Props: React.Dispatch<React.SetStateAction<any>>
  product_code_op_financ92df8: any,
  setproduct_code_op_financ92df8:React.Dispatch<React.SetStateAction<any>>
  product_code_op_financ92df8Props: any 
  setproduct_code_op_financ92df8Props: React.Dispatch<React.SetStateAction<any>>
  message_type_opc2fc6: any,
  setmessage_type_opc2fc6:React.Dispatch<React.SetStateAction<any>>
  message_type_opc2fc6Props: any 
  setmessage_type_opc2fc6Props: React.Dispatch<React.SetStateAction<any>>
  message_type_op_financcbd29: any,
  setmessage_type_op_financcbd29:React.Dispatch<React.SetStateAction<any>>
  message_type_op_financcbd29Props: any 
  setmessage_type_op_financcbd29Props: React.Dispatch<React.SetStateAction<any>>
  date_op9a41b: any,
  setdate_op9a41b:React.Dispatch<React.SetStateAction<any>>
  date_op9a41bProps: any 
  setdate_op9a41bProps: React.Dispatch<React.SetStateAction<any>>
  date_op_fianc516b0: any,
  setdate_op_fianc516b0:React.Dispatch<React.SetStateAction<any>>
  date_op_fianc516b0Props: any 
  setdate_op_fianc516b0Props: React.Dispatch<React.SetStateAction<any>>
  uuid_op4c851: any,
  setuuid_op4c851:React.Dispatch<React.SetStateAction<any>>
  uuid_op4c851Props: any 
  setuuid_op4c851Props: React.Dispatch<React.SetStateAction<any>>
  uuid_op_financb7282: any,
  setuuid_op_financb7282:React.Dispatch<React.SetStateAction<any>>
  uuid_op_financb7282Props: any 
  setuuid_op_financb7282Props: React.Dispatch<React.SetStateAction<any>>
  status_op98685: any,
  setstatus_op98685:React.Dispatch<React.SetStateAction<any>>
  status_op98685Props: any 
  setstatus_op98685Props: React.Dispatch<React.SetStateAction<any>>
  status_op_financc8de7: any,
  setstatus_op_financc8de7:React.Dispatch<React.SetStateAction<any>>
  status_op_financc8de7Props: any 
  setstatus_op_financc8de7Props: React.Dispatch<React.SetStateAction<any>>
  reject_reason_op5ba8d: any,
  setreject_reason_op5ba8d:React.Dispatch<React.SetStateAction<any>>
  reject_reason_op5ba8dProps: any 
  setreject_reason_op5ba8dProps: React.Dispatch<React.SetStateAction<any>>
  rej_reasn_op_financ13f05: any,
  setrej_reasn_op_financ13f05:React.Dispatch<React.SetStateAction<any>>
  rej_reasn_op_financ13f05Props: any 
  setrej_reasn_op_financ13f05Props: React.Dispatch<React.SetStateAction<any>>
  submit_opcf1e2: any,
  setsubmit_opcf1e2:React.Dispatch<React.SetStateAction<any>>
  submit_opcf1e2Props: any 
  setsubmit_opcf1e2Props: React.Dispatch<React.SetStateAction<any>>
  customwidget0c844: any,
  setcustomwidget0c844:React.Dispatch<React.SetStateAction<any>>
  customwidget0c844Props: any 
  setcustomwidget0c844Props: React.Dispatch<React.SetStateAction<any>>
  op_setl_product_code63258: any,
  setop_setl_product_code63258:React.Dispatch<React.SetStateAction<any>>
  op_setl_product_code63258Props: any 
  setop_setl_product_code63258Props: React.Dispatch<React.SetStateAction<any>>
  product_code_setl_op20fab: any,
  setproduct_code_setl_op20fab:React.Dispatch<React.SetStateAction<any>>
  product_code_setl_op20fabProps: any 
  setproduct_code_setl_op20fabProps: React.Dispatch<React.SetStateAction<any>>
  msg_type_op_setlmnta011a: any,
  setmsg_type_op_setlmnta011a:React.Dispatch<React.SetStateAction<any>>
  msg_type_op_setlmnta011aProps: any 
  setmsg_type_op_setlmnta011aProps: React.Dispatch<React.SetStateAction<any>>
  op_setl_message_type41552: any,
  setop_setl_message_type41552:React.Dispatch<React.SetStateAction<any>>
  op_setl_message_type41552Props: any 
  setop_setl_message_type41552Props: React.Dispatch<React.SetStateAction<any>>
  op_setl_date62e49: any,
  setop_setl_date62e49:React.Dispatch<React.SetStateAction<any>>
  op_setl_date62e49Props: any 
  setop_setl_date62e49Props: React.Dispatch<React.SetStateAction<any>>
  date_op_setlmntaf3c2: any,
  setdate_op_setlmntaf3c2:React.Dispatch<React.SetStateAction<any>>
  date_op_setlmntaf3c2Props: any 
  setdate_op_setlmntaf3c2Props: React.Dispatch<React.SetStateAction<any>>
  uuid_op_setlmntffbc8: any,
  setuuid_op_setlmntffbc8:React.Dispatch<React.SetStateAction<any>>
  uuid_op_setlmntffbc8Props: any 
  setuuid_op_setlmntffbc8Props: React.Dispatch<React.SetStateAction<any>>
  uuid_op_settlmnt831e5: any,
  setuuid_op_settlmnt831e5:React.Dispatch<React.SetStateAction<any>>
  uuid_op_settlmnt831e5Props: any 
  setuuid_op_settlmnt831e5Props: React.Dispatch<React.SetStateAction<any>>
  op_setlmnt_submit05756: any,
  setop_setlmnt_submit05756:React.Dispatch<React.SetStateAction<any>>
  op_setlmnt_submit05756Props: any 
  setop_setlmnt_submit05756Props: React.Dispatch<React.SetStateAction<any>>
  debtor_info5fbb6: any,
  setdebtor_info5fbb6:React.Dispatch<React.SetStateAction<any>>
  debtor_info5fbb6Props: any 
  setdebtor_info5fbb6Props: React.Dispatch<React.SetStateAction<any>>
  dr_account50944: any,
  setdr_account50944:React.Dispatch<React.SetStateAction<any>>
  dr_account50944Props: any 
  setdr_account50944Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_lble3517: any,
  setdr_account_lble3517:React.Dispatch<React.SetStateAction<any>>
  dr_account_lble3517Props: any 
  setdr_account_lble3517Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_lbl2b7b9: any,
  setdr_name_lbl2b7b9:React.Dispatch<React.SetStateAction<any>>
  dr_name_lbl2b7b9Props: any 
  setdr_name_lbl2b7b9Props: React.Dispatch<React.SetStateAction<any>>
  dr_name9810f: any,
  setdr_name9810f:React.Dispatch<React.SetStateAction<any>>
  dr_name9810fProps: any 
  setdr_name9810fProps: React.Dispatch<React.SetStateAction<any>>
  dr_bank_lbl81c4c: any,
  setdr_bank_lbl81c4c:React.Dispatch<React.SetStateAction<any>>
  dr_bank_lbl81c4cProps: any 
  setdr_bank_lbl81c4cProps: React.Dispatch<React.SetStateAction<any>>
  dr_banke5943: any,
  setdr_banke5943:React.Dispatch<React.SetStateAction<any>>
  dr_banke5943Props: any 
  setdr_banke5943Props: React.Dispatch<React.SetStateAction<any>>
  creditor_info1146f: any,
  setcreditor_info1146f:React.Dispatch<React.SetStateAction<any>>
  creditor_info1146fProps: any 
  setcreditor_info1146fProps: React.Dispatch<React.SetStateAction<any>>
  cr_accountb0c70: any,
  setcr_accountb0c70:React.Dispatch<React.SetStateAction<any>>
  cr_accountb0c70Props: any 
  setcr_accountb0c70Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_lbl09825: any,
  setcr_account_lbl09825:React.Dispatch<React.SetStateAction<any>>
  cr_account_lbl09825Props: any 
  setcr_account_lbl09825Props: React.Dispatch<React.SetStateAction<any>>
  cr_name89142: any,
  setcr_name89142:React.Dispatch<React.SetStateAction<any>>
  cr_name89142Props: any 
  setcr_name89142Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_lbla2539: any,
  setcr_name_lbla2539:React.Dispatch<React.SetStateAction<any>>
  cr_name_lbla2539Props: any 
  setcr_name_lbla2539Props: React.Dispatch<React.SetStateAction<any>>
  cr_banke46ca: any,
  setcr_banke46ca:React.Dispatch<React.SetStateAction<any>>
  cr_banke46caProps: any 
  setcr_banke46caProps: React.Dispatch<React.SetStateAction<any>>
  cr_bank_lble07fc: any,
  setcr_bank_lble07fc:React.Dispatch<React.SetStateAction<any>>
  cr_bank_lble07fcProps: any 
  setcr_bank_lble07fcProps: React.Dispatch<React.SetStateAction<any>>
  rtgs_account8a1f0: any,
  setrtgs_account8a1f0:React.Dispatch<React.SetStateAction<any>>
  rtgs_account8a1f0Props: any 
  setrtgs_account8a1f0Props: React.Dispatch<React.SetStateAction<any>>
  rtgs_acnt_lblccdfc: any,
  setrtgs_acnt_lblccdfc:React.Dispatch<React.SetStateAction<any>>
  rtgs_acnt_lblccdfcProps: any 
  setrtgs_acnt_lblccdfcProps: React.Dispatch<React.SetStateAction<any>>
  payment_info0041b: any,
  setpayment_info0041b:React.Dispatch<React.SetStateAction<any>>
  payment_info0041bProps: any 
  setpayment_info0041bProps: React.Dispatch<React.SetStateAction<any>>
  currency52580: any,
  setcurrency52580:React.Dispatch<React.SetStateAction<any>>
  currency52580Props: any 
  setcurrency52580Props: React.Dispatch<React.SetStateAction<any>>
  currency_lbl99714: any,
  setcurrency_lbl99714:React.Dispatch<React.SetStateAction<any>>
  currency_lbl99714Props: any 
  setcurrency_lbl99714Props: React.Dispatch<React.SetStateAction<any>>
  amount07414: any,
  setamount07414:React.Dispatch<React.SetStateAction<any>>
  amount07414Props: any 
  setamount07414Props: React.Dispatch<React.SetStateAction<any>>
  amount_lblc3248: any,
  setamount_lblc3248:React.Dispatch<React.SetStateAction<any>>
  amount_lblc3248Props: any 
  setamount_lblc3248Props: React.Dispatch<React.SetStateAction<any>>
  addtional_info60a69: any,
  setaddtional_info60a69:React.Dispatch<React.SetStateAction<any>>
  addtional_info60a69Props: any 
  setaddtional_info60a69Props: React.Dispatch<React.SetStateAction<any>>
  remittance_infod7394: any,
  setremittance_infod7394:React.Dispatch<React.SetStateAction<any>>
  remittance_infod7394Props: any 
  setremittance_infod7394Props: React.Dispatch<React.SetStateAction<any>>
  remittance_lbl3a5c2: any,
  setremittance_lbl3a5c2:React.Dispatch<React.SetStateAction<any>>
  remittance_lbl3a5c2Props: any 
  setremittance_lbl3a5c2Props: React.Dispatch<React.SetStateAction<any>>
  submit_ip98bbf: any,
  setsubmit_ip98bbf:React.Dispatch<React.SetStateAction<any>>
  submit_ip98bbfProps: any 
  setsubmit_ip98bbfProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  transactionproduct_v1: any 
  settransactionproduct_v1: React.Dispatch<React.SetStateAction<any>>
  transactionproduct_v1Props: any 
  settransactionproduct_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1: any 
  settransactionsearch_v1: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1Props: any 
  settransactionsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  scansaveprocessui_v1: any 
  setscansaveprocessui_v1: React.Dispatch<React.SetStateAction<any>>
  scansaveprocessui_v1Props: any 
  setscansaveprocessui_v1Props: React.Dispatch<React.SetStateAction<any>>
  rejectpopupui_v1: any 
  setrejectpopupui_v1: React.Dispatch<React.SetStateAction<any>>
  rejectpopupui_v1Props: any 
  setrejectpopupui_v1Props: React.Dispatch<React.SetStateAction<any>>
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
  inboundscanprocessui_v1: any 
  setinboundscanprocessui_v1: React.Dispatch<React.SetStateAction<any>>
  inboundscanprocessui_v1Props: any 
  setinboundscanprocessui_v1Props: React.Dispatch<React.SetStateAction<any>>
  returnreasonpopupui_v1: any 
  setreturnreasonpopupui_v1: React.Dispatch<React.SetStateAction<any>>
  returnreasonpopupui_v1Props: any 
  setreturnreasonpopupui_v1Props: React.Dispatch<React.SetStateAction<any>>
  simulatorprocessui_v1: any 
  setsimulatorprocessui_v1: React.Dispatch<React.SetStateAction<any>>
  simulatorprocessui_v1Props: any 
  setsimulatorprocessui_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_transaction_v1Props: any 
  setdfd_transaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_forexcurrencydropdowndfd_v1Props: any 
  setdfd_forexcurrencydropdowndfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_rejectpopupdfd_v1Props: any 
  setdfd_rejectpopupdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_scansaveprocessdfd_v1Props: any 
  setdfd_scansaveprocessdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_crbankcodedropdowndfd_v1Props: any 
  setdfd_crbankcodedropdowndfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_documentlistdfd_v1Props: any 
  setdfd_documentlistdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_errorlistdfd_v1Props: any 
  setdfd_errorlistdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transactionlistdfd_v1Props: any 
  setdfd_transactionlistdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_commentlistdfd_v1Props: any 
  setdfd_commentlistdfd_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_journey_v1Props: any 
  setdfd_journey_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_returnreasondfd_v1Props: any 
  setdfd_returnreasondfd_v1Props: React.Dispatch<React.SetStateAction<any>>

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
            "new_payment",
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
        const [view_all_journey_group67ce4, setview_all_journey_group67ce4 ] = React.useState<any>({}) 
    const [view_all_journey_group67ce4Props, setview_all_journey_group67ce4Props ] = React.useState<any>({
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
        const [failure_queue_journey_group36aba, setfailure_queue_journey_group36aba ] = React.useState<any>({}) 
    const [failure_queue_journey_group36abaProps, setfailure_queue_journey_group36abaProps ] = React.useState<any>({
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
        const [success_queue_journey_group755eb, setsuccess_queue_journey_group755eb ] = React.useState<any>({}) 
    const [success_queue_journey_group755ebProps, setsuccess_queue_journey_group755ebProps ] = React.useState<any>({
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
        const [return_queue_journey_group92c55, setreturn_queue_journey_group92c55 ] = React.useState<any>({}) 
    const [return_queue_journey_group92c55Props, setreturn_queue_journey_group92c55Props ] = React.useState<any>({
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
        const [operational_pending_tab67331, setoperational_pending_tab67331 ] = React.useState<any>({}) 
    const [operational_pending_tab67331Props, setoperational_pending_tab67331Props ] = React.useState<any>({
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
    
    const [operational_pending_table0a253, setoperational_pending_table0a253 ] = React.useState<any>([]) 
    const [operational_pending_table0a253Props, setoperational_pending_table0a253Props ] = React.useState<any>({
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
        const [operational_pending_journey_group63667, setoperational_pending_journey_group63667 ] = React.useState<any>({}) 
    const [operational_pending_journey_group63667Props, setoperational_pending_journey_group63667Props ] = React.useState<any>({
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
        const [technical_pending_tab0b23f, settechnical_pending_tab0b23f ] = React.useState<any>({}) 
    const [technical_pending_tab0b23fProps, settechnical_pending_tab0b23fProps ] = React.useState<any>({
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
    
    const [technical_pending_table84f30, settechnical_pending_table84f30 ] = React.useState<any>([]) 
    const [technical_pending_table84f30Props, settechnical_pending_table84f30Props ] = React.useState<any>({
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
        const [technical_pending_journey_groupe4f03, settechnical_pending_journey_groupe4f03 ] = React.useState<any>({}) 
    const [technical_pending_journey_groupe4f03Props, settechnical_pending_journey_groupe4f03Props ] = React.useState<any>({
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
            "top_divider",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "cr_currency",
            "dr_amount",
            "vgphstm_uuid",
            "trs_status",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        const [overallgroup01c61, setoverallgroup01c61 ] = React.useState<any>({}) 
    const [overallgroup01c61Props, setoverallgroup01c61Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "url",
      ]
      }) 
        const [controlgroupda197, setcontrolgroupda197 ] = React.useState<any>({}) 
    const [controlgroupda197Props, setcontrolgroupda197Props ] = React.useState<any>({
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
        const [control_tab_groupbc3e2, setcontrol_tab_groupbc3e2 ] = React.useState<any>({}) 
    const [control_tab_groupbc3e2Props, setcontrol_tab_groupbc3e2Props ] = React.useState<any>({
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
        const [button_group74f3e, setbutton_group74f3e ] = React.useState<any>({}) 
    const [button_group74f3eProps, setbutton_group74f3eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "scan",
            "folderscan",
            "save",
            "cancel",
            "update",
            "signature",
            "approve",
            "send_to_maker",
      ]
      }) 
        const [rtgs_infofd0aa, setrtgs_infofd0aa ] = React.useState<any>({}) 
    const [rtgs_infofd0aaProps, setrtgs_infofd0aaProps ] = React.useState<any>({
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
        const [allcontrols71c54, setallcontrols71c54 ] = React.useState<any>({}) 
    const [allcontrols71c54Props, setallcontrols71c54Props ] = React.useState<any>({
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
        const [commoninfof4607, setcommoninfof4607 ] = React.useState<any>({}) 
    const [commoninfof4607Props, setcommoninfof4607Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "common_info",
            "dr_account",
            "dr_name",
            "dr_currency",
            "dr_cust_ac_sanc_lmt",
            "dr_cust_ac_balance",
      ]
      }) 
        const [basicinfo3d198, setbasicinfo3d198 ] = React.useState<any>({}) 
    const [basicinfo3d198Props, setbasicinfo3d198Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_info",
            "waive_charges",
            "cr_account",
            "cr_name",
            "cr_bank_code",
            "cr_bank_code",
            "bank_name",
            "bic_code",
            "forex_currency",
            "forex_currency",
            "cr_currency",
            "exchange_rate",
            "rate_code",
            "dr_amount",
            "cr_amount",
            "rate_ref_no",
            "rate_cust_id",
      ]
      }) 
        const [additionalinfod2894, setadditionalinfod2894 ] = React.useState<any>({}) 
    const [additionalinfod2894Props, setadditionalinfod2894Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "signature_screen",
            "remittance_info",
            "additional_reference",
            "customwidget",
            "vgphstm_uuid",
      ]
      }) 
        const [listgroupdcdbd, setlistgroupdcdbd ] = React.useState<any>({}) 
    const [listgroupdcdbdProps, setlistgroupdcdbdProps ] = React.useState<any>({
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
        const [list_tab_groupd6905, setlist_tab_groupd6905 ] = React.useState<any>({}) 
    const [list_tab_groupd6905Props, setlist_tab_groupd6905Props ] = React.useState<any>({
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
        const [document_list38c6e, setdocument_list38c6e ] = React.useState<any>({}) 
    const [document_list38c6eProps, setdocument_list38c6eProps ] = React.useState<any>({
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
    
    const [doclisttable56e97, setdoclisttable56e97 ] = React.useState<any>([]) 
    const [doclisttable56e97Props, setdoclisttable56e97Props ] = React.useState<any>({
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
        const [validation_listae827, setvalidation_listae827 ] = React.useState<any>({}) 
    const [validation_listae827Props, setvalidation_listae827Props ] = React.useState<any>({
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
    
    const [valdnlisttable17ec7, setvaldnlisttable17ec7 ] = React.useState<any>([]) 
    const [valdnlisttable17ec7Props, setvaldnlisttable17ec7Props ] = React.useState<any>({
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
        const [comment_list72944, setcomment_list72944 ] = React.useState<any>({}) 
    const [comment_list72944Props, setcomment_list72944Props ] = React.useState<any>({
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
    
    const [cmntlisttable02d0e, setcmntlisttable02d0e ] = React.useState<any>([]) 
    const [cmntlisttable02d0eProps, setcmntlisttable02d0eProps ] = React.useState<any>({
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
        const [rtgs_lista0a19, setrtgs_lista0a19 ] = React.useState<any>({}) 
    const [rtgs_lista0a19Props, setrtgs_lista0a19Props ] = React.useState<any>({
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
        const [rtgs_list_grpcf7d8, setrtgs_list_grpcf7d8 ] = React.useState<any>({}) 
    const [rtgs_list_grpcf7d8Props, setrtgs_list_grpcf7d8Props ] = React.useState<any>({
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
        const [rtgs_list_tble_groupab24b, setrtgs_list_tble_groupab24b ] = React.useState<any>({}) 
    const [rtgs_list_tble_groupab24bProps, setrtgs_list_tble_groupab24bProps ] = React.useState<any>({
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
    
    const [rtgs_list_table2926a, setrtgs_list_table2926a ] = React.useState<any>([]) 
    const [rtgs_list_table2926aProps, setrtgs_list_table2926aProps ] = React.useState<any>({
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
        const [group05462, setgroup05462 ] = React.useState<any>({}) 
    const [group05462Props, setgroup05462Props ] = React.useState<any>({
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
        const [rtgs_list_tab_grp28533, setrtgs_list_tab_grp28533 ] = React.useState<any>({}) 
    const [rtgs_list_tab_grp28533Props, setrtgs_list_tab_grp28533Props ] = React.useState<any>({
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
        const [documnt_list3a31d, setdocumnt_list3a31d ] = React.useState<any>({}) 
    const [documnt_list3a31dProps, setdocumnt_list3a31dProps ] = React.useState<any>({
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
    
    const [rtgs_lst_doc_list_table32147, setrtgs_lst_doc_list_table32147 ] = React.useState<any>([]) 
    const [rtgs_lst_doc_list_table32147Props, setrtgs_lst_doc_list_table32147Props ] = React.useState<any>({
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
        const [validtn_list10f93, setvalidtn_list10f93 ] = React.useState<any>({}) 
    const [validtn_list10f93Props, setvalidtn_list10f93Props ] = React.useState<any>({
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
    
    const [rtgs_list_validtn_table84666, setrtgs_list_validtn_table84666 ] = React.useState<any>([]) 
    const [rtgs_list_validtn_table84666Props, setrtgs_list_validtn_table84666Props ] = React.useState<any>({
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
        const [cmnt_liste161c, setcmnt_liste161c ] = React.useState<any>({}) 
    const [cmnt_liste161cProps, setcmnt_liste161cProps ] = React.useState<any>({
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
    
    const [rtgs_list_cmnts_list2148d, setrtgs_list_cmnts_list2148d ] = React.useState<any>([]) 
    const [rtgs_list_cmnts_list2148dProps, setrtgs_list_cmnts_list2148dProps ] = React.useState<any>({
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
        const [overallgroup05ff6, setoverallgroup05ff6 ] = React.useState<any>({}) 
    const [overallgroup05ff6Props, setoverallgroup05ff6Props ] = React.useState<any>({
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
            "comments",
            "cancel",
            "continue",
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
            "trs_status",
            "processed_by_label",
            "debit_account_label",
            "processing_system",
            "dr_account",
            "currency_label",
            "credit_account_label",
            "dr_currency",
            "cr_account",
            "amount_label",
            "process_status_label",
            "cr_amount",
            "trs_process_status",
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
        const [overallgroup1218f, setoverallgroup1218f ] = React.useState<any>({}) 
    const [overallgroup1218fProps, setoverallgroup1218fProps ] = React.useState<any>({
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
        const [controlgroupfbb48, setcontrolgroupfbb48 ] = React.useState<any>({}) 
    const [controlgroupfbb48Props, setcontrolgroupfbb48Props ] = React.useState<any>({
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
        const [control_tab_group161ff, setcontrol_tab_group161ff ] = React.useState<any>({}) 
    const [control_tab_group161ffProps, setcontrol_tab_group161ffProps ] = React.useState<any>({
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
        const [button_groupb9855, setbutton_groupb9855 ] = React.useState<any>({}) 
    const [button_groupb9855Props, setbutton_groupb9855Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hold",
            "force_pass",
            "ip_approve",
            "return",
            "cancel",
      ]
      }) 
        const [rtgs_info5957a, setrtgs_info5957a ] = React.useState<any>({}) 
    const [rtgs_info5957aProps, setrtgs_info5957aProps ] = React.useState<any>({
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
        const [allcontrolsb8c72, setallcontrolsb8c72 ] = React.useState<any>({}) 
    const [allcontrolsb8c72Props, setallcontrolsb8c72Props ] = React.useState<any>({
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
        const [commoninfod7eda, setcommoninfod7eda ] = React.useState<any>({}) 
    const [commoninfod7edaProps, setcommoninfod7edaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "common_info",
            "dr_account",
            "dr_name",
            "dr_currency",
      ]
      }) 
        const [basicinfoffb0a, setbasicinfoffb0a ] = React.useState<any>({}) 
    const [basicinfoffb0aProps, setbasicinfoffb0aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_info",
            "cr_account",
            "cr_name",
            "cr_bank_code",
            "cr_bank_code",
            "forex_currency",
            "forex_currency",
            "cr_currency",
            "dr_amount",
            "cr_amount",
      ]
      }) 
        const [additionalinfo4baba, setadditionalinfo4baba ] = React.useState<any>({}) 
    const [additionalinfo4babaProps, setadditionalinfo4babaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "signature_screen",
            "remittance_info",
            "customwidget",
            "vgphstm_uuid",
      ]
      }) 
        const [listgroup97a7c, setlistgroup97a7c ] = React.useState<any>({}) 
    const [listgroup97a7cProps, setlistgroup97a7cProps ] = React.useState<any>({
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
        const [list_tab_group6782e, setlist_tab_group6782e ] = React.useState<any>({}) 
    const [list_tab_group6782eProps, setlist_tab_group6782eProps ] = React.useState<any>({
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
        const [validation_listcc09d, setvalidation_listcc09d ] = React.useState<any>({}) 
    const [validation_listcc09dProps, setvalidation_listcc09dProps ] = React.useState<any>({
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
    
    const [valdnlisttable4db84, setvaldnlisttable4db84 ] = React.useState<any>([]) 
    const [valdnlisttable4db84Props, setvaldnlisttable4db84Props ] = React.useState<any>({
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
        const [comment_listb158b, setcomment_listb158b ] = React.useState<any>({}) 
    const [comment_listb158bProps, setcomment_listb158bProps ] = React.useState<any>({
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
    
    const [cmntlisttable96834, setcmntlisttable96834 ] = React.useState<any>([]) 
    const [cmntlisttable96834Props, setcmntlisttable96834Props ] = React.useState<any>({
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
        const [rtgs_listf12c6, setrtgs_listf12c6 ] = React.useState<any>({}) 
    const [rtgs_listf12c6Props, setrtgs_listf12c6Props ] = React.useState<any>({
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
        const [rtgs_list_grp82cfc, setrtgs_list_grp82cfc ] = React.useState<any>({}) 
    const [rtgs_list_grp82cfcProps, setrtgs_list_grp82cfcProps ] = React.useState<any>({
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
        const [rtgs_list_tble_groupe1ac5, setrtgs_list_tble_groupe1ac5 ] = React.useState<any>({}) 
    const [rtgs_list_tble_groupe1ac5Props, setrtgs_list_tble_groupe1ac5Props ] = React.useState<any>({
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
    
    const [rtgs_list_tablead2c7, setrtgs_list_tablead2c7 ] = React.useState<any>([]) 
    const [rtgs_list_tablead2c7Props, setrtgs_list_tablead2c7Props ] = React.useState<any>({
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
        const [group1b1aa, setgroup1b1aa ] = React.useState<any>({}) 
    const [group1b1aaProps, setgroup1b1aaProps ] = React.useState<any>({
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
        const [rtgs_list_tab_grp43579, setrtgs_list_tab_grp43579 ] = React.useState<any>({}) 
    const [rtgs_list_tab_grp43579Props, setrtgs_list_tab_grp43579Props ] = React.useState<any>({
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
        const [validtn_list3a9a1, setvalidtn_list3a9a1 ] = React.useState<any>({}) 
    const [validtn_list3a9a1Props, setvalidtn_list3a9a1Props ] = React.useState<any>({
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
    
    const [rtgs_list_validtn_table10755, setrtgs_list_validtn_table10755 ] = React.useState<any>([]) 
    const [rtgs_list_validtn_table10755Props, setrtgs_list_validtn_table10755Props ] = React.useState<any>({
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
        const [cmnt_list18a3b, setcmnt_list18a3b ] = React.useState<any>({}) 
    const [cmnt_list18a3bProps, setcmnt_list18a3bProps ] = React.useState<any>({
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
    
    const [rtgs_list_cmnts_list85130, setrtgs_list_cmnts_list85130 ] = React.useState<any>([]) 
    const [rtgs_list_cmnts_list85130Props, setrtgs_list_cmnts_list85130Props ] = React.useState<any>({
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
        const [groupdd3f6, setgroupdd3f6 ] = React.useState<any>({}) 
    const [groupdd3f6Props, setgroupdd3f6Props ] = React.useState<any>({
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
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        const [simulator_main_group0541e, setsimulator_main_group0541e ] = React.useState<any>({}) 
    const [simulator_main_group0541eProps, setsimulator_main_group0541eProps ] = React.useState<any>({
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
        const [simulator_tab_groupfd732, setsimulator_tab_groupfd732 ] = React.useState<any>({}) 
    const [simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props ] = React.useState<any>({
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
        const [op_financial4735b, setop_financial4735b ] = React.useState<any>({}) 
    const [op_financial4735bProps, setop_financial4735bProps ] = React.useState<any>({
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
        const [op_financial_grp8a39a, setop_financial_grp8a39a ] = React.useState<any>({}) 
    const [op_financial_grp8a39aProps, setop_financial_grp8a39aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_code_op",
            "product_code_op_financ",
            "message_type_op",
            "message_type_op_financ",
            "date_op",
            "date_op_fianc",
            "uuid_op",
            "uuid_op_financ",
            "status_op",
            "status_op_financ",
            "reason",
            "rej_reasn_op_financ",
            "submit_op",
            "customwidget",
      ]
      }) 
        const [op_settlemente399b, setop_settlemente399b ] = React.useState<any>({}) 
    const [op_settlemente399bProps, setop_settlemente399bProps ] = React.useState<any>({
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
        const [op_settlement_grpb706d, setop_settlement_grpb706d ] = React.useState<any>({}) 
    const [op_settlement_grpb706dProps, setop_settlement_grpb706dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_setl_product_code",
            "product_code_setl_op",
            "msg_type_op_setlmnt",
            "op_setl_message_type",
            "op_setl_date",
            "date_op_setlmnt",
            "uuid_op_setlmnt",
            "uuid_op_settlmnt",
            "op_setlmnt_submit",
      ]
      }) 
        const [ip_financial66005, setip_financial66005 ] = React.useState<any>({}) 
    const [ip_financial66005Props, setip_financial66005Props ] = React.useState<any>({
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
        const [ip_debtor_dtls8143c, setip_debtor_dtls8143c ] = React.useState<any>({}) 
    const [ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debtor_info",
            "dr_account",
            "dr_account_lbl",
            "dr_name_lbl",
            "dr_name",
            "dr_bank_lbl",
            "dr_bank",
      ]
      }) 
        const [ip_creditor_dtls1ade4, setip_creditor_dtls1ade4 ] = React.useState<any>({}) 
    const [ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "creditor_info",
            "cr_account",
            "cr_account_lbl",
            "cr_name",
            "cr_name_lbl",
            "cr_bank",
            "cr_bank_lbl",
            "rtgs_account",
            "rtgs_acnt_lbl",
      ]
      }) 
        const [payment_dtls30132, setpayment_dtls30132 ] = React.useState<any>({}) 
    const [payment_dtls30132Props, setpayment_dtls30132Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_info",
            "currency",
            "currency_lbl",
            "amount",
            "amount_lbl",
      ]
      }) 
        const [addionl_info43014, setaddionl_info43014 ] = React.useState<any>({}) 
    const [addionl_info43014Props, setaddionl_info43014Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "remittance_info",
            "remittance_lbl",
      ]
      }) 
        const [button_grp7b9b7, setbutton_grp7b9b7 ] = React.useState<any>({}) 
    const [button_grp7b9b7Props, setbutton_grp7b9b7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "submit_ip",
      ]
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
   const [search14cf0,setsearch14cf0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [search14cf0Props,setsearch14cf0Props] = React.useState<any>({}) 
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
   const [new_payment7f5db,setnew_payment7f5db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [new_payment7f5dbProps,setnew_payment7f5dbProps] = React.useState<any>({}) 
   const [value_date_view_allb0df6,setvalue_date_view_allb0df6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_view_allb0df6Props,setvalue_date_view_allb0df6Props] = React.useState<any>({}) 
   const [dr_account_view_all33724,setdr_account_view_all33724] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_view_all33724Props,setdr_account_view_all33724Props] = React.useState<any>({}) 
   const [dr_name_view_allc0a46,setdr_name_view_allc0a46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_view_allc0a46Props,setdr_name_view_allc0a46Props] = React.useState<any>({}) 
   const [dr_currency_view_all54da6,setdr_currency_view_all54da6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_view_all54da6Props,setdr_currency_view_all54da6Props] = React.useState<any>({}) 
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
   const [cr_name_view_all19d14,setcr_name_view_all19d14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_view_all19d14Props,setcr_name_view_all19d14Props] = React.useState<any>({}) 
   const [cr_currency_view_all82afd,setcr_currency_view_all82afd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_view_all82afdProps,setcr_currency_view_all82afdProps] = React.useState<any>({}) 
   const [cr_amount_view_all47e6b,setcr_amount_view_all47e6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_view_all47e6bProps,setcr_amount_view_all47e6bProps] = React.useState<any>({}) 
   const [uuid_view_allef1ca,setuuid_view_allef1ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_view_allef1caProps,setuuid_view_allef1caProps] = React.useState<any>({}) 
   const [view_process_type569cf,setview_process_type569cf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_process_type569cfProps,setview_process_type569cfProps] = React.useState<any>({}) 
   const [view_all_journeyd3ae9,setview_all_journeyd3ae9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_all_journeyd3ae9Props,setview_all_journeyd3ae9Props] = React.useState<any>({}) 
   const [value_date_failure_queue12297,setvalue_date_failure_queue12297] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_failure_queue12297Props,setvalue_date_failure_queue12297Props] = React.useState<any>({}) 
   const [dr_account_failure_queue42953,setdr_account_failure_queue42953] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_failure_queue42953Props,setdr_account_failure_queue42953Props] = React.useState<any>({}) 
   const [dr_name_failure_queue03c86,setdr_name_failure_queue03c86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_failure_queue03c86Props,setdr_name_failure_queue03c86Props] = React.useState<any>({}) 
   const [dr_currency_failure_queuef9d2d,setdr_currency_failure_queuef9d2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_failure_queuef9d2dProps,setdr_currency_failure_queuef9d2dProps] = React.useState<any>({}) 
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
   const [cr_name_failure_queue57c4d,setcr_name_failure_queue57c4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_failure_queue57c4dProps,setcr_name_failure_queue57c4dProps] = React.useState<any>({}) 
   const [cr_currency_failure_queue09d7a,setcr_currency_failure_queue09d7a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_failure_queue09d7aProps,setcr_currency_failure_queue09d7aProps] = React.useState<any>({}) 
   const [cr_amount_failure_queue0aef8,setcr_amount_failure_queue0aef8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_failure_queue0aef8Props,setcr_amount_failure_queue0aef8Props] = React.useState<any>({}) 
   const [uuid_failure_queueb7b55,setuuid_failure_queueb7b55] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_failure_queueb7b55Props,setuuid_failure_queueb7b55Props] = React.useState<any>({}) 
   const [failure_queue_journeyc8638,setfailure_queue_journeyc8638] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [failure_queue_journeyc8638Props,setfailure_queue_journeyc8638Props] = React.useState<any>({}) 
   const [value_date_success_queue7c209,setvalue_date_success_queue7c209] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_success_queue7c209Props,setvalue_date_success_queue7c209Props] = React.useState<any>({}) 
   const [dr_account_success_queueeddaf,setdr_account_success_queueeddaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_success_queueeddafProps,setdr_account_success_queueeddafProps] = React.useState<any>({}) 
   const [dr_name_success_queuec805b,setdr_name_success_queuec805b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_success_queuec805bProps,setdr_name_success_queuec805bProps] = React.useState<any>({}) 
   const [dr_currency_operational_pending10a49,setdr_currency_operational_pending10a49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_operational_pending10a49Props,setdr_currency_operational_pending10a49Props] = React.useState<any>({}) 
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
   const [cr_name_success_queueb80d4,setcr_name_success_queueb80d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_success_queueb80d4Props,setcr_name_success_queueb80d4Props] = React.useState<any>({}) 
   const [cr_currency_success_queue2f950,setcr_currency_success_queue2f950] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_success_queue2f950Props,setcr_currency_success_queue2f950Props] = React.useState<any>({}) 
   const [cr_amount_success_queue019a2,setcr_amount_success_queue019a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_success_queue019a2Props,setcr_amount_success_queue019a2Props] = React.useState<any>({}) 
   const [uuid_success_queued0e34,setuuid_success_queued0e34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_success_queued0e34Props,setuuid_success_queued0e34Props] = React.useState<any>({}) 
   const [success_queue_journey68ac9,setsuccess_queue_journey68ac9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [success_queue_journey68ac9Props,setsuccess_queue_journey68ac9Props] = React.useState<any>({}) 
   const [value_date_return_queuee5e11,setvalue_date_return_queuee5e11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_return_queuee5e11Props,setvalue_date_return_queuee5e11Props] = React.useState<any>({}) 
   const [dr_account_return_queuebdabb,setdr_account_return_queuebdabb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_return_queuebdabbProps,setdr_account_return_queuebdabbProps] = React.useState<any>({}) 
   const [dr_name_return_queue958c9,setdr_name_return_queue958c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_return_queue958c9Props,setdr_name_return_queue958c9Props] = React.useState<any>({}) 
   const [dr_currency_return_queuee94b2,setdr_currency_return_queuee94b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_return_queuee94b2Props,setdr_currency_return_queuee94b2Props] = React.useState<any>({}) 
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
   const [cr_name_return_queue13fec,setcr_name_return_queue13fec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_return_queue13fecProps,setcr_name_return_queue13fecProps] = React.useState<any>({}) 
   const [cr_currency_return_queuef37f7,setcr_currency_return_queuef37f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_return_queuef37f7Props,setcr_currency_return_queuef37f7Props] = React.useState<any>({}) 
   const [cr_amount_return_queue95903,setcr_amount_return_queue95903] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_return_queue95903Props,setcr_amount_return_queue95903Props] = React.useState<any>({}) 
   const [uuid_return_queue9fa04,setuuid_return_queue9fa04] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_return_queue9fa04Props,setuuid_return_queue9fa04Props] = React.useState<any>({}) 
   const [return_queue_journeycc9d3,setreturn_queue_journeycc9d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [return_queue_journeycc9d3Props,setreturn_queue_journeycc9d3Props] = React.useState<any>({}) 
   const [value_date_operational_pending6ecd4,setvalue_date_operational_pending6ecd4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_operational_pending6ecd4Props,setvalue_date_operational_pending6ecd4Props] = React.useState<any>({}) 
   const [dr_account_name_operational_pending2ab87,setdr_account_name_operational_pending2ab87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_name_operational_pending2ab87Props,setdr_account_name_operational_pending2ab87Props] = React.useState<any>({}) 
   const [dr_name_operational_pendinga8ff6,setdr_name_operational_pendinga8ff6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_operational_pendinga8ff6Props,setdr_name_operational_pendinga8ff6Props] = React.useState<any>({}) 
   const [dr_currency_operational_pending5146b,setdr_currency_operational_pending5146b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_operational_pending5146bProps,setdr_currency_operational_pending5146bProps] = React.useState<any>({}) 
   const [dr_amount_operational_pending70e3f,setdr_amount_operational_pending70e3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_operational_pending70e3fProps,setdr_amount_operational_pending70e3fProps] = React.useState<any>({}) 
   const [cr_account_operational_pendingf9a9c,setcr_account_operational_pendingf9a9c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_operational_pendingf9a9cProps,setcr_account_operational_pendingf9a9cProps] = React.useState<any>({}) 
   const [cr_name_operational_pendingbce21,setcr_name_operational_pendingbce21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_operational_pendingbce21Props,setcr_name_operational_pendingbce21Props] = React.useState<any>({}) 
   const [cr_currency_operational_pending282bc,setcr_currency_operational_pending282bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_operational_pending282bcProps,setcr_currency_operational_pending282bcProps] = React.useState<any>({}) 
   const [cr_amount_operational_pending0df81,setcr_amount_operational_pending0df81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_operational_pending0df81Props,setcr_amount_operational_pending0df81Props] = React.useState<any>({}) 
   const [new_payment_chk_approve_btn770f9,setnew_payment_chk_approve_btn770f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [new_payment_chk_approve_btn770f9Props,setnew_payment_chk_approve_btn770f9Props] = React.useState<any>({}) 
   const [new_payment_chk_send_to_maker_btn4c9a0,setnew_payment_chk_send_to_maker_btn4c9a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [new_payment_chk_send_to_maker_btn4c9a0Props,setnew_payment_chk_send_to_maker_btn4c9a0Props] = React.useState<any>({}) 
   const [view_details00488,setview_details00488] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_details00488Props,setview_details00488Props] = React.useState<any>({}) 
   const [repair9a97b,setrepair9a97b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [repair9a97bProps,setrepair9a97bProps] = React.useState<any>({}) 
   const [uuid_operational_pendingeb172,setuuid_operational_pendingeb172] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_operational_pendingeb172Props,setuuid_operational_pendingeb172Props] = React.useState<any>({}) 
   const [trs_status11519,settrs_status11519] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_status11519Props,settrs_status11519Props] = React.useState<any>({}) 
   const [reverse_posting0765b,setreverse_posting0765b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reverse_posting0765bProps,setreverse_posting0765bProps] = React.useState<any>({}) 
   const [operational_pending_journey1a1a5,setoperational_pending_journey1a1a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [operational_pending_journey1a1a5Props,setoperational_pending_journey1a1a5Props] = React.useState<any>({}) 
   const [value_date_technical_pending11fe0,setvalue_date_technical_pending11fe0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [value_date_technical_pending11fe0Props,setvalue_date_technical_pending11fe0Props] = React.useState<any>({}) 
   const [dr_account_technical_pendinge182f,setdr_account_technical_pendinge182f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_technical_pendinge182fProps,setdr_account_technical_pendinge182fProps] = React.useState<any>({}) 
   const [dr_name_technical_pendingbc6bb,setdr_name_technical_pendingbc6bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_technical_pendingbc6bbProps,setdr_name_technical_pendingbc6bbProps] = React.useState<any>({}) 
   const [dr_currency_technical_pendingbc856,setdr_currency_technical_pendingbc856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency_technical_pendingbc856Props,setdr_currency_technical_pendingbc856Props] = React.useState<any>({}) 
   const [dr_amount_technical_pending5e6cc,setdr_amount_technical_pending5e6cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_amount_technical_pending5e6ccProps,setdr_amount_technical_pending5e6ccProps] = React.useState<any>({}) 
   const [cr_account_technical_pending3c4aa,setcr_account_technical_pending3c4aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_technical_pending3c4aaProps,setcr_account_technical_pending3c4aaProps] = React.useState<any>({}) 
   const [cr_name_technical_pending1bc34,setcr_name_technical_pending1bc34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_technical_pending1bc34Props,setcr_name_technical_pending1bc34Props] = React.useState<any>({}) 
   const [cr_currency_technical_pending78349,setcr_currency_technical_pending78349] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_currency_technical_pending78349Props,setcr_currency_technical_pending78349Props] = React.useState<any>({}) 
   const [cr_amount_technical_pending738a2,setcr_amount_technical_pending738a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount_technical_pending738a2Props,setcr_amount_technical_pending738a2Props] = React.useState<any>({}) 
   const [uuid_failure_queue73334,setuuid_failure_queue73334] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_failure_queue73334Props,setuuid_failure_queue73334Props] = React.useState<any>({}) 
   const [technical_pending_journey6601c,settechnical_pending_journey6601c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [technical_pending_journey6601cProps,settechnical_pending_journey6601cProps] = React.useState<any>({}) 
   const [top_divider52f90,settop_divider52f90] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [top_divider52f90Props,settop_divider52f90Props] = React.useState<any>({}) 
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
   const [status4bd75,setstatus4bd75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status4bd75Props,setstatus4bd75Props] = React.useState<any>({}) 
   const [bottom_dividerb9220,setbottom_dividerb9220] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [bottom_dividerb9220Props,setbottom_dividerb9220Props] = React.useState<any>({}) 
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
   const [scan31ce1,setscan31ce1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [scan31ce1Props,setscan31ce1Props] = React.useState<any>({}) 
   const [folderscanf14e0,setfolderscanf14e0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [folderscanf14e0Props,setfolderscanf14e0Props] = React.useState<any>({}) 
   const [savef2390,setsavef2390] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [savef2390Props,setsavef2390Props] = React.useState<any>({}) 
   const [cancel2bf72,setcancel2bf72] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel2bf72Props,setcancel2bf72Props] = React.useState<any>({}) 
   const [updateed7a9,setupdateed7a9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [updateed7a9Props,setupdateed7a9Props] = React.useState<any>({}) 
   const [signature3ad2e,setsignature3ad2e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [signature3ad2eProps,setsignature3ad2eProps] = React.useState<any>({}) 
   const [approve05fe8,setapprove05fe8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [approve05fe8Props,setapprove05fe8Props] = React.useState<any>({}) 
   const [send_to_makera4797,setsend_to_makera4797] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [send_to_makera4797Props,setsend_to_makera4797Props] = React.useState<any>({}) 
   const [common_info3a458,setcommon_info3a458] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [common_info3a458Props,setcommon_info3a458Props] = React.useState<any>({}) 
   const [dr_account27abb,setdr_account27abb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account27abbProps,setdr_account27abbProps] = React.useState<any>({}) 
   const [dr_name84266,setdr_name84266] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name84266Props,setdr_name84266Props] = React.useState<any>({}) 
   const [base_currencyb386d,setbase_currencyb386d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [base_currencyb386dProps,setbase_currencyb386dProps] = React.useState<any>({}) 
   const [dr_cust_ac_sanc_lmtb74f7,setdr_cust_ac_sanc_lmtb74f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_cust_ac_sanc_lmtb74f7Props,setdr_cust_ac_sanc_lmtb74f7Props] = React.useState<any>({}) 
   const [dr_cust_ac_balance753dd,setdr_cust_ac_balance753dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_cust_ac_balance753ddProps,setdr_cust_ac_balance753ddProps] = React.useState<any>({}) 
   const [basic_info216f3,setbasic_info216f3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [basic_info216f3Props,setbasic_info216f3Props] = React.useState<any>({}) 
   const [waive_charges929e5,setwaive_charges929e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [waive_charges929e5Props,setwaive_charges929e5Props] = React.useState<any>({}) 
   const [cr_accounta818b,setcr_accounta818b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_accounta818bProps,setcr_accounta818bProps] = React.useState<any>({}) 
   const [cr_namea4b34,setcr_namea4b34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_namea4b34Props,setcr_namea4b34Props] = React.useState<any>({}) 
   const [cr_bank_code8a2bc,setcr_bank_code8a2bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_code8a2bcProps,setcr_bank_code8a2bcProps] = React.useState<any>({}) 
   const [cr_bank_name434eb,setcr_bank_name434eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_name434ebProps,setcr_bank_name434ebProps] = React.useState<any>({}) 
   const [cr_bank_bic3d26f,setcr_bank_bic3d26f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_bic3d26fProps,setcr_bank_bic3d26fProps] = React.useState<any>({}) 
   const [forex_currency65e0b,setforex_currency65e0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [forex_currency65e0bProps,setforex_currency65e0bProps] = React.useState<any>({}) 
   const [exchange_rate88caf,setexchange_rate88caf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [exchange_rate88cafProps,setexchange_rate88cafProps] = React.useState<any>({}) 
   const [rate_codee56ad,setrate_codee56ad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rate_codee56adProps,setrate_codee56adProps] = React.useState<any>({}) 
   const [forex_amounta58a5,setforex_amounta58a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [forex_amounta58a5Props,setforex_amounta58a5Props] = React.useState<any>({}) 
   const [base_amount3b226,setbase_amount3b226] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [base_amount3b226Props,setbase_amount3b226Props] = React.useState<any>({}) 
   const [rate_ref_no82399,setrate_ref_no82399] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rate_ref_no82399Props,setrate_ref_no82399Props] = React.useState<any>({}) 
   const [rate_cust_idad42a,setrate_cust_idad42a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rate_cust_idad42aProps,setrate_cust_idad42aProps] = React.useState<any>({}) 
   const [addtional_info46cb8,setaddtional_info46cb8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [addtional_info46cb8Props,setaddtional_info46cb8Props] = React.useState<any>({}) 
   const [signature_screen413bb,setsignature_screen413bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [signature_screen413bbProps,setsignature_screen413bbProps] = React.useState<any>({}) 
   const [remittance_infoba5e0,setremittance_infoba5e0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_infoba5e0Props,setremittance_infoba5e0Props] = React.useState<any>({}) 
   const [additional_reff63a3,setadditional_reff63a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [additional_reff63a3Props,setadditional_reff63a3Props] = React.useState<any>({}) 
   const [customwidgetd7e47,setcustomwidgetd7e47] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [customwidgetd7e47Props,setcustomwidgetd7e47Props] = React.useState<any>({}) 
   const [vgphstm_uuidcf6fc,setvgphstm_uuidcf6fc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vgphstm_uuidcf6fcProps,setvgphstm_uuidcf6fcProps] = React.useState<any>({}) 
   const [filename7c104,setfilename7c104] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filename7c104Props,setfilename7c104Props] = React.useState<any>({}) 
   const [actionf530a,setactionf530a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [actionf530aProps,setactionf530aProps] = React.useState<any>({}) 
   const [vldcode0c0ce,setvldcode0c0ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vldcode0c0ceProps,setvldcode0c0ceProps] = React.useState<any>({}) 
   const [vldreason2ef16,setvldreason2ef16] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vldreason2ef16Props,setvldreason2ef16Props] = React.useState<any>({}) 
   const [cmnts11ffa,setcmnts11ffa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cmnts11ffaProps,setcmnts11ffaProps] = React.useState<any>({}) 
   const [tran_id5f12f,settran_id5f12f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tran_id5f12fProps,settran_id5f12fProps] = React.useState<any>({}) 
   const [dr_acnt_no469c1,setdr_acnt_no469c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_acnt_no469c1Props,setdr_acnt_no469c1Props] = React.useState<any>({}) 
   const [cr_acnt_nocb409,setcr_acnt_nocb409] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_acnt_nocb409Props,setcr_acnt_nocb409Props] = React.useState<any>({}) 
   const [amntef7a4,setamntef7a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amntef7a4Props,setamntef7a4Props] = React.useState<any>({}) 
   const [cr_bank_code24beb,setcr_bank_code24beb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_code24bebProps,setcr_bank_code24bebProps] = React.useState<any>({}) 
   const [created_bye14cd,setcreated_bye14cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [created_bye14cdProps,setcreated_bye14cdProps] = React.useState<any>({}) 
   const [created_date14669,setcreated_date14669] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [created_date14669Props,setcreated_date14669Props] = React.useState<any>({}) 
   const [file_name_rtgs_list06cd7,setfile_name_rtgs_list06cd7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [file_name_rtgs_list06cd7Props,setfile_name_rtgs_list06cd7Props] = React.useState<any>({}) 
   const [action_rtgs_listcf67e,setaction_rtgs_listcf67e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [action_rtgs_listcf67eProps,setaction_rtgs_listcf67eProps] = React.useState<any>({}) 
   const [vld_code_rtgs_lsta5e1f,setvld_code_rtgs_lsta5e1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vld_code_rtgs_lsta5e1fProps,setvld_code_rtgs_lsta5e1fProps] = React.useState<any>({}) 
   const [vld_reason_rtgs_listdd73b,setvld_reason_rtgs_listdd73b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vld_reason_rtgs_listdd73bProps,setvld_reason_rtgs_listdd73bProps] = React.useState<any>({}) 
   const [cmnts_rtgs_listee03b,setcmnts_rtgs_listee03b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cmnts_rtgs_listee03bProps,setcmnts_rtgs_listee03bProps] = React.useState<any>({}) 
   const [documentviewer9df1d,setdocumentviewer9df1d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [documentviewer9df1dProps,setdocumentviewer9df1dProps] = React.useState<any>({}) 
   const [text9205d,settext9205d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text9205dProps,settext9205dProps] = React.useState<any>({}) 
   const [reasondesc20b1a,setreasondesc20b1a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reasondesc20b1aProps,setreasondesc20b1aProps] = React.useState<any>({}) 
   const [cancel7f45a,setcancel7f45a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel7f45aProps,setcancel7f45aProps] = React.useState<any>({}) 
   const [continue599e4,setcontinue599e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [continue599e4Props,setcontinue599e4Props] = React.useState<any>({}) 
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
   const [dr_account36b40,setdr_account36b40] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account36b40Props,setdr_account36b40Props] = React.useState<any>({}) 
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
   const [dr_currency9c8a2,setdr_currency9c8a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_currency9c8a2Props,setdr_currency9c8a2Props] = React.useState<any>({}) 
   const [cr_account0d1f4,setcr_account0d1f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account0d1f4Props,setcr_account0d1f4Props] = React.useState<any>({}) 
   const [amount_labelfd725,setamount_labelfd725] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount_labelfd725Props,setamount_labelfd725Props] = React.useState<any>({}) 
   const [process_status_labelb1ca9,setprocess_status_labelb1ca9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [process_status_labelb1ca9Props,setprocess_status_labelb1ca9Props] = React.useState<any>({}) 
   const [cr_amount01416,setcr_amount01416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_amount01416Props,setcr_amount01416Props] = React.useState<any>({}) 
   const [process_status500d6,setprocess_status500d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [process_status500d6Props,setprocess_status500d6Props] = React.useState<any>({}) 
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
   const [req_jsonviewer8d071,setreq_jsonviewer8d071] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [req_jsonviewer8d071Props,setreq_jsonviewer8d071Props] = React.useState<any>({}) 
   const [res_jsonviewerdd261,setres_jsonviewerdd261] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [res_jsonviewerdd261Props,setres_jsonviewerdd261Props] = React.useState<any>({}) 
   const [hold12b6e,sethold12b6e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [hold12b6eProps,sethold12b6eProps] = React.useState<any>({}) 
   const [force_pass93cf0,setforce_pass93cf0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [force_pass93cf0Props,setforce_pass93cf0Props] = React.useState<any>({}) 
   const [ip_approve2a0bf,setip_approve2a0bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ip_approve2a0bfProps,setip_approve2a0bfProps] = React.useState<any>({}) 
   const [return0f9cc,setreturn0f9cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [return0f9ccProps,setreturn0f9ccProps] = React.useState<any>({}) 
   const [cancel568c6,setcancel568c6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel568c6Props,setcancel568c6Props] = React.useState<any>({}) 
   const [common_infoe66a9,setcommon_infoe66a9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [common_infoe66a9Props,setcommon_infoe66a9Props] = React.useState<any>({}) 
   const [dr_account953ea,setdr_account953ea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account953eaProps,setdr_account953eaProps] = React.useState<any>({}) 
   const [dr_named06e2,setdr_named06e2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_named06e2Props,setdr_named06e2Props] = React.useState<any>({}) 
   const [base_currency57d7d,setbase_currency57d7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [base_currency57d7dProps,setbase_currency57d7dProps] = React.useState<any>({}) 
   const [basic_info219cf,setbasic_info219cf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [basic_info219cfProps,setbasic_info219cfProps] = React.useState<any>({}) 
   const [cr_accountddb15,setcr_accountddb15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_accountddb15Props,setcr_accountddb15Props] = React.useState<any>({}) 
   const [cr_name517b4,setcr_name517b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name517b4Props,setcr_name517b4Props] = React.useState<any>({}) 
   const [cr_bank_code9af27,setcr_bank_code9af27] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_code9af27Props,setcr_bank_code9af27Props] = React.useState<any>({}) 
   const [forex_currency10f51,setforex_currency10f51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [forex_currency10f51Props,setforex_currency10f51Props] = React.useState<any>({}) 
   const [forex_amount2d477,setforex_amount2d477] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [forex_amount2d477Props,setforex_amount2d477Props] = React.useState<any>({}) 
   const [base_amount2df6d,setbase_amount2df6d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [base_amount2df6dProps,setbase_amount2df6dProps] = React.useState<any>({}) 
   const [addtional_infof3fad,setaddtional_infof3fad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [addtional_infof3fadProps,setaddtional_infof3fadProps] = React.useState<any>({}) 
   const [signature_screened28f,setsignature_screened28f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [signature_screened28fProps,setsignature_screened28fProps] = React.useState<any>({}) 
   const [remittance_info0bded,setremittance_info0bded] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_info0bdedProps,setremittance_info0bdedProps] = React.useState<any>({}) 
   const [customwidget339ed,setcustomwidget339ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [customwidget339edProps,setcustomwidget339edProps] = React.useState<any>({}) 
   const [vgphstm_uuidf9485,setvgphstm_uuidf9485] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vgphstm_uuidf9485Props,setvgphstm_uuidf9485Props] = React.useState<any>({}) 
   const [vldcoded6381,setvldcoded6381] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vldcoded6381Props,setvldcoded6381Props] = React.useState<any>({}) 
   const [vldreasonfca81,setvldreasonfca81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vldreasonfca81Props,setvldreasonfca81Props] = React.useState<any>({}) 
   const [cmntsa418a,setcmntsa418a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cmntsa418aProps,setcmntsa418aProps] = React.useState<any>({}) 
   const [tran_id6705e,settran_id6705e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [tran_id6705eProps,settran_id6705eProps] = React.useState<any>({}) 
   const [dr_acnt_no28ad2,setdr_acnt_no28ad2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_acnt_no28ad2Props,setdr_acnt_no28ad2Props] = React.useState<any>({}) 
   const [cr_acnt_no58585,setcr_acnt_no58585] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_acnt_no58585Props,setcr_acnt_no58585Props] = React.useState<any>({}) 
   const [amnt95ed1,setamnt95ed1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amnt95ed1Props,setamnt95ed1Props] = React.useState<any>({}) 
   const [cr_bank_code01850,setcr_bank_code01850] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_code01850Props,setcr_bank_code01850Props] = React.useState<any>({}) 
   const [created_byb7915,setcreated_byb7915] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [created_byb7915Props,setcreated_byb7915Props] = React.useState<any>({}) 
   const [created_date6b8a8,setcreated_date6b8a8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [created_date6b8a8Props,setcreated_date6b8a8Props] = React.useState<any>({}) 
   const [vld_code_rtgs_lst274ca,setvld_code_rtgs_lst274ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vld_code_rtgs_lst274caProps,setvld_code_rtgs_lst274caProps] = React.useState<any>({}) 
   const [vld_reason_rtgs_listff18d,setvld_reason_rtgs_listff18d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [vld_reason_rtgs_listff18dProps,setvld_reason_rtgs_listff18dProps] = React.useState<any>({}) 
   const [cmnts_rtgs_listd0091,setcmnts_rtgs_listd0091] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cmnts_rtgs_listd0091Props,setcmnts_rtgs_listd0091Props] = React.useState<any>({}) 
   const [text574c6,settext574c6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text574c6Props,settext574c6Props] = React.useState<any>({}) 
   const [return_reason_dropdown6f51c,setreturn_reason_dropdown6f51c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [return_reason_dropdown6f51cProps,setreturn_reason_dropdown6f51cProps] = React.useState<any>({}) 
   const [closea52fd,setclosea52fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [closea52fdProps,setclosea52fdProps] = React.useState<any>({}) 
   const [savebe5ab,setsavebe5ab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [savebe5abProps,setsavebe5abProps] = React.useState<any>({}) 
   const [product_code_op8fcb1,setproduct_code_op8fcb1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_op8fcb1Props,setproduct_code_op8fcb1Props] = React.useState<any>({}) 
   const [product_code_op_financ92df8,setproduct_code_op_financ92df8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_op_financ92df8Props,setproduct_code_op_financ92df8Props] = React.useState<any>({}) 
   const [message_type_opc2fc6,setmessage_type_opc2fc6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [message_type_opc2fc6Props,setmessage_type_opc2fc6Props] = React.useState<any>({}) 
   const [message_type_op_financcbd29,setmessage_type_op_financcbd29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [message_type_op_financcbd29Props,setmessage_type_op_financcbd29Props] = React.useState<any>({}) 
   const [date_op9a41b,setdate_op9a41b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [date_op9a41bProps,setdate_op9a41bProps] = React.useState<any>({}) 
   const [date_op_fianc516b0,setdate_op_fianc516b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [date_op_fianc516b0Props,setdate_op_fianc516b0Props] = React.useState<any>({}) 
   const [uuid_op4c851,setuuid_op4c851] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_op4c851Props,setuuid_op4c851Props] = React.useState<any>({}) 
   const [uuid_op_financb7282,setuuid_op_financb7282] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_op_financb7282Props,setuuid_op_financb7282Props] = React.useState<any>({}) 
   const [status_op98685,setstatus_op98685] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_op98685Props,setstatus_op98685Props] = React.useState<any>({}) 
   const [status_op_financc8de7,setstatus_op_financc8de7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_op_financc8de7Props,setstatus_op_financc8de7Props] = React.useState<any>({}) 
   const [reject_reason_op5ba8d,setreject_reason_op5ba8d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reject_reason_op5ba8dProps,setreject_reason_op5ba8dProps] = React.useState<any>({}) 
   const [rej_reasn_op_financ13f05,setrej_reasn_op_financ13f05] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rej_reasn_op_financ13f05Props,setrej_reasn_op_financ13f05Props] = React.useState<any>({}) 
   const [submit_opcf1e2,setsubmit_opcf1e2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [submit_opcf1e2Props,setsubmit_opcf1e2Props] = React.useState<any>({}) 
   const [customwidget0c844,setcustomwidget0c844] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [customwidget0c844Props,setcustomwidget0c844Props] = React.useState<any>({}) 
   const [op_setl_product_code63258,setop_setl_product_code63258] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [op_setl_product_code63258Props,setop_setl_product_code63258Props] = React.useState<any>({}) 
   const [product_code_setl_op20fab,setproduct_code_setl_op20fab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [product_code_setl_op20fabProps,setproduct_code_setl_op20fabProps] = React.useState<any>({}) 
   const [msg_type_op_setlmnta011a,setmsg_type_op_setlmnta011a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [msg_type_op_setlmnta011aProps,setmsg_type_op_setlmnta011aProps] = React.useState<any>({}) 
   const [op_setl_message_type41552,setop_setl_message_type41552] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [op_setl_message_type41552Props,setop_setl_message_type41552Props] = React.useState<any>({}) 
   const [op_setl_date62e49,setop_setl_date62e49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [op_setl_date62e49Props,setop_setl_date62e49Props] = React.useState<any>({}) 
   const [date_op_setlmntaf3c2,setdate_op_setlmntaf3c2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [date_op_setlmntaf3c2Props,setdate_op_setlmntaf3c2Props] = React.useState<any>({}) 
   const [uuid_op_setlmntffbc8,setuuid_op_setlmntffbc8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_op_setlmntffbc8Props,setuuid_op_setlmntffbc8Props] = React.useState<any>({}) 
   const [uuid_op_settlmnt831e5,setuuid_op_settlmnt831e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uuid_op_settlmnt831e5Props,setuuid_op_settlmnt831e5Props] = React.useState<any>({}) 
   const [op_setlmnt_submit05756,setop_setlmnt_submit05756] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [op_setlmnt_submit05756Props,setop_setlmnt_submit05756Props] = React.useState<any>({}) 
   const [debtor_info5fbb6,setdebtor_info5fbb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_info5fbb6Props,setdebtor_info5fbb6Props] = React.useState<any>({}) 
   const [dr_account50944,setdr_account50944] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account50944Props,setdr_account50944Props] = React.useState<any>({}) 
   const [dr_account_lble3517,setdr_account_lble3517] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_account_lble3517Props,setdr_account_lble3517Props] = React.useState<any>({}) 
   const [dr_name_lbl2b7b9,setdr_name_lbl2b7b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name_lbl2b7b9Props,setdr_name_lbl2b7b9Props] = React.useState<any>({}) 
   const [dr_name9810f,setdr_name9810f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_name9810fProps,setdr_name9810fProps] = React.useState<any>({}) 
   const [dr_bank_lbl81c4c,setdr_bank_lbl81c4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_bank_lbl81c4cProps,setdr_bank_lbl81c4cProps] = React.useState<any>({}) 
   const [dr_banke5943,setdr_banke5943] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dr_banke5943Props,setdr_banke5943Props] = React.useState<any>({}) 
   const [creditor_info1146f,setcreditor_info1146f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_info1146fProps,setcreditor_info1146fProps] = React.useState<any>({}) 
   const [cr_accountb0c70,setcr_accountb0c70] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_accountb0c70Props,setcr_accountb0c70Props] = React.useState<any>({}) 
   const [cr_account_lbl09825,setcr_account_lbl09825] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_account_lbl09825Props,setcr_account_lbl09825Props] = React.useState<any>({}) 
   const [cr_name89142,setcr_name89142] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name89142Props,setcr_name89142Props] = React.useState<any>({}) 
   const [cr_name_lbla2539,setcr_name_lbla2539] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_name_lbla2539Props,setcr_name_lbla2539Props] = React.useState<any>({}) 
   const [cr_banke46ca,setcr_banke46ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_banke46caProps,setcr_banke46caProps] = React.useState<any>({}) 
   const [cr_bank_lble07fc,setcr_bank_lble07fc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cr_bank_lble07fcProps,setcr_bank_lble07fcProps] = React.useState<any>({}) 
   const [rtgs_account8a1f0,setrtgs_account8a1f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rtgs_account8a1f0Props,setrtgs_account8a1f0Props] = React.useState<any>({}) 
   const [rtgs_acnt_lblccdfc,setrtgs_acnt_lblccdfc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rtgs_acnt_lblccdfcProps,setrtgs_acnt_lblccdfcProps] = React.useState<any>({}) 
   const [payment_info0041b,setpayment_info0041b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [payment_info0041bProps,setpayment_info0041bProps] = React.useState<any>({}) 
   const [currency52580,setcurrency52580] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [currency52580Props,setcurrency52580Props] = React.useState<any>({}) 
   const [currency_lbl99714,setcurrency_lbl99714] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [currency_lbl99714Props,setcurrency_lbl99714Props] = React.useState<any>({}) 
   const [amount07414,setamount07414] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount07414Props,setamount07414Props] = React.useState<any>({}) 
   const [amount_lblc3248,setamount_lblc3248] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amount_lblc3248Props,setamount_lblc3248Props] = React.useState<any>({}) 
   const [addtional_info60a69,setaddtional_info60a69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [addtional_info60a69Props,setaddtional_info60a69Props] = React.useState<any>({}) 
   const [remittance_infod7394,setremittance_infod7394] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_infod7394Props,setremittance_infod7394Props] = React.useState<any>({}) 
   const [remittance_lbl3a5c2,setremittance_lbl3a5c2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remittance_lbl3a5c2Props,setremittance_lbl3a5c2Props] = React.useState<any>({}) 
   const [submit_ip98bbf,setsubmit_ip98bbf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [submit_ip98bbfProps,setsubmit_ip98bbfProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       switchoutbound_or_inbound5e076:false,
       buttonsearch14cf0:false,
       buttonrefresh313d0:false,
       buttondownloadcb505:false,
       buttonnew_payment7f5db:false,
       columnvalue_date_view_allb0df6:false,
       columndr_account_view_all33724:false,
       columndr_name_view_allc0a46:false,
       columndr_currency_view_all54da6:false,
       columndr_amount_view_all88d6b:false,
       columncr_account_view_alld4b39:false,
       columncr_name_view_all19d14:false,
       columncr_currency_view_all82afd:false,
       columncr_amount_view_all47e6b:false,
       columnuuid_view_allef1ca:false,
       columnview_process_type569cf:false,
       timelineview_all_journeyd3ae9:false,
       columnvalue_date_failure_queue12297:false,
       columndr_account_failure_queue42953:false,
       columndr_name_failure_queue03c86:false,
       columndr_currency_failure_queuef9d2d:false,
       columndr_amount_failure_queue95d4e:false,
       columncr_account_failure_queuea7246:false,
       columncr_name_failure_queue57c4d:false,
       columncr_currency_failure_queue09d7a:false,
       columncr_amount_failure_queue0aef8:false,
       columnuuid_failure_queueb7b55:false,
       timelinefailure_queue_journeyc8638:false,
       columnvalue_date_success_queue7c209:false,
       columndr_account_success_queueeddaf:false,
       columndr_name_success_queuec805b:false,
       columndr_currency_operational_pending10a49:false,
       columndr_amount_success_queueda254:false,
       columncr_account_success_queue60480:false,
       columncr_name_success_queueb80d4:false,
       columncr_currency_success_queue2f950:false,
       columncr_amount_success_queue019a2:false,
       columnuuid_success_queued0e34:false,
       timelinesuccess_queue_journey68ac9:false,
       columnvalue_date_return_queuee5e11:false,
       columndr_account_return_queuebdabb:false,
       columndr_name_return_queue958c9:false,
       columndr_currency_return_queuee94b2:false,
       columndr_amount_return_queue2f324:false,
       columncr_account_return_queue21a57:false,
       columncr_name_return_queue13fec:false,
       columncr_currency_return_queuef37f7:false,
       columncr_amount_return_queue95903:false,
       columnuuid_return_queue9fa04:false,
       timelinereturn_queue_journeycc9d3:false,
       columnvalue_date_operational_pending6ecd4:false,
       columndr_account_name_operational_pending2ab87:false,
       columndr_name_operational_pendinga8ff6:false,
       columndr_currency_operational_pending5146b:false,
       columndr_amount_operational_pending70e3f:false,
       columncr_account_operational_pendingf9a9c:false,
       columncr_name_operational_pendingbce21:false,
       columncr_currency_operational_pending282bc:false,
       columncr_amount_operational_pending0df81:false,
       buttonnew_payment_chk_approve_btn770f9:false,
       buttonnew_payment_chk_send_to_maker_btn4c9a0:false,
       buttonview_details00488:false,
       buttonrepair9a97b:false,
       columnuuid_operational_pendingeb172:false,
       columntrs_status11519:false,
       buttonreverse_posting0765b:false,
       timelineoperational_pending_journey1a1a5:false,
       columnvalue_date_technical_pending11fe0:false,
       columndr_account_technical_pendinge182f:false,
       columndr_name_technical_pendingbc6bb:false,
       columndr_currency_technical_pendingbc856:false,
       columndr_amount_technical_pending5e6cc:false,
       columncr_account_technical_pending3c4aa:false,
       columncr_name_technical_pending1bc34:false,
       columncr_currency_technical_pending78349:false,
       columncr_amount_technical_pending738a2:false,
       columnuuid_failure_queue73334:false,
       timelinetechnical_pending_journey6601c:false,
       dividertop_divider52f90:false,
       datepickertrs_created_date2cea8:false,
       textinputdebtor_account_no963e4:false,
       textinputdebtor_namee2d9f:false,
       textinputcreditor_account_noca692:false,
       dropdownpayment_currency703d2:false,
       textinputpayment_amount042b1:false,
       textinputuuid29c9f:false,
       textinputstatus4bd75:false,
       dividerbottom_dividerb9220:false,
       buttonsearch0e695:false,
       buttoncleareddfa:false,
       buttonscan31ce1:false,
       buttonfolderScanf14e0:false,
       buttonsavef2390:false,
       buttoncancel2bf72:false,
       buttonupdateed7a9:false,
       buttonsignature3ad2e:false,
       buttonapprove05fe8:false,
       buttonsend_to_makera4797:false,
       textcommon_info3a458:false,
       textinputdr_account27abb:false,
       textinputdr_name84266:false,
       textinputbase_currencyb386d:false,
       textinputdr_cust_ac_sanc_lmtb74f7:false,
       textinputdr_cust_ac_balance753dd:false,
       textbasic_info216f3:false,
       checkboxwaive_charges929e5:false,
       textinputcr_accounta818b:false,
       textinputcr_namea4b34:false,
       dropdowncr_bank_code8a2bc:false,
       textinputcr_bank_name434eb:false,
       textinputcr_bank_bic3d26f:false,
       dropdownforex_currency65e0b:false,
       textinputexchange_rate88caf:false,
       textinputrate_codee56ad:false,
       textinputforex_amounta58a5:false,
       textinputbase_amount3b226:false,
       textinputrate_ref_no82399:false,
       textinputrate_cust_idad42a:false,
       textaddtional_info46cb8:false,
       customwidgetsignature_screen413bb:false,
       textinputremittance_infoba5e0:false,
       textinputadditional_reff63a3:false,
       customwidgetcustomwidgetd7e47:false,
       textinputvgphstm_uuidcf6fc:false,
       columnfileName7c104:false,
       buttonactionf530a:false,
       columnvldCode0c0ce:false,
       columnvldReason2ef16:false,
       columncmnts11ffa:false,
       columntran_id5f12f:false,
       columndr_acnt_no469c1:false,
       columncr_acnt_nocb409:false,
       columnamntef7a4:false,
       columncr_bank_code24beb:false,
       columncreated_bye14cd:false,
       columncreated_date14669:false,
       columnfile_name_rtgs_list06cd7:false,
       buttonaction_rtgs_listcf67e:false,
       columnvld_code_rtgs_lsta5e1f:false,
       columnvld_reason_rtgs_listdd73b:false,
       columncmnts_rtgs_listee03b:false,
       documentviewerdocumentviewer9df1d:false,
       texttext9205d:false,
       textareareasonDesc20b1a:false,
       buttoncancel7f45a:false,
       buttoncontinue599e4:false,
       dividerdivider_tope6917:false,
       texttransaction_date_time_label669d7:false,
       textstatus_labelf3713:false,
       texttransaction_date_time14856:false,
       textstatus88bc7:false,
       textprocessed_by_label542e8:false,
       textdebit_account_label3b1b7:false,
       textprocessed_byd2b69:false,
       textdr_account36b40:false,
       textcurrency_labele21ba:false,
       textcredit_account_label65c7b:false,
       textdr_currency9c8a2:false,
       textcr_account0d1f4:false,
       textamount_labelfd725:false,
       textprocess_status_labelb1ca9:false,
       textcr_amount01416:false,
       textprocess_status500d6:false,
       dividerdivider_bottom8bad5:false,
       buttonview_msg_data_btne6a88:false,
       buttonview_tran_log_btn9cd8c:false,
       dividerdivider_topf46a0:false,
       xmlviewerxmlviewer9fe8d:false,
       dividerdivider_bottom6920d:false,
       buttoncancel_btn5e840:false,
       jsonviewerreq_jsonviewer8d071:false,
       jsonviewerres_jsonviewerdd261:false,
       buttonhold12b6e:false,
       buttonforce_pass93cf0:false,
       buttonip_approve2a0bf:false,
       buttonreturn0f9cc:false,
       buttoncancel568c6:false,
       textcommon_infoe66a9:false,
       textinputdr_account953ea:false,
       textinputdr_named06e2:false,
       textinputbase_currency57d7d:false,
       textbasic_info219cf:false,
       textinputcr_accountddb15:false,
       textinputcr_name517b4:false,
       dropdowncr_bank_code9af27:false,
       dropdownforex_currency10f51:false,
       textinputforex_amount2d477:false,
       textinputbase_amount2df6d:false,
       textaddtional_infof3fad:false,
       customwidgetsignature_screened28f:false,
       textinputremittance_info0bded:false,
       customwidgetcustomwidget339ed:false,
       textinputvgphstm_uuidf9485:false,
       columnvldCoded6381:false,
       columnvldReasonfca81:false,
       columncmntsa418a:false,
       columntran_id6705e:false,
       columndr_acnt_no28ad2:false,
       columncr_acnt_no58585:false,
       columnamnt95ed1:false,
       columncr_bank_code01850:false,
       columncreated_byb7915:false,
       columncreated_date6b8a8:false,
       columnvld_code_rtgs_lst274ca:false,
       columnvld_reason_rtgs_listff18d:false,
       columncmnts_rtgs_listd0091:false,
       texttext574c6:false,
       dropdownreturn_reason_dropdown6f51c:false,
       buttonclosea52fd:false,
       buttonsavebe5ab:false,
       textinputproduct_code_op8fcb1:false,
       textproduct_code_op_financ92df8:false,
       textinputmessage_type_opc2fc6:false,
       textmessage_type_op_financcbd29:false,
       datepickerdate_op9a41b:false,
       textdate_op_fianc516b0:false,
       textinputuuid_op4c851:false,
       textuuid_op_financb7282:false,
       dropdownstatus_op98685:false,
       textstatus_op_financc8de7:false,
       dropdownreject_reason_op5ba8d:false,
       textrej_reasn_op_financ13f05:false,
       buttonsubmit_opcf1e2:false,
       customwidgetcustomwidget0c844:false,
       textinputop_setl_product_code63258:false,
       textproduct_code_setl_op20fab:false,
       textmsg_type_op_setlmnta011a:false,
       textinputop_setl_message_type41552:false,
       datepickerop_setl_date62e49:false,
       textdate_op_setlmntaf3c2:false,
       textuuid_op_setlmntffbc8:false,
       textinputuuid_op_settlmnt831e5:false,
       buttonop_setlmnt_submit05756:false,
       textdebtor_info5fbb6:false,
       textinputdr_account50944:false,
       textdr_account_lble3517:false,
       textdr_name_lbl2b7b9:false,
       textinputdr_name9810f:false,
       textdr_bank_lbl81c4c:false,
       textinputdr_banke5943:false,
       textcreditor_info1146f:false,
       textinputcr_accountb0c70:false,
       textcr_account_lbl09825:false,
       textinputcr_name89142:false,
       textcr_name_lbla2539:false,
       textinputcr_banke46ca:false,
       textcr_bank_lble07fc:false,
       textinputrtgs_account8a1f0:false,
       textrtgs_acnt_lblccdfc:false,
       textpayment_info0041b:false,
       textinputcurrency52580:false,
       textcurrency_lbl99714:false,
       textinputamount07414:false,
       textamount_lblc3248:false,
       textaddtional_info60a69:false,
       textinputremittance_infod7394:false,
       textremittance_lbl3a5c2:false,
       buttonsubmit_ip98bbf:false,
       grouptran_main_group1dc7f:false,
       grouptran_tab_group08b64:false,
       groupview_all_tab4a963:false,
       tableview_all_tablec9e87:false,
       groupview_all_journey_group67ce4:false,
       groupfailure_queue_tab69f01:false,
       tablefailure_queue_tablea476f:false,
       groupfailure_queue_journey_group36aba:false,
       groupsuccess_queue_tabef582:false,
       tablesuccess_queue_table63aae:false,
       groupsuccess_queue_journey_group755eb:false,
       groupreturn_queue_tab5611e:false,
       tablereturn_queue_table267f0:false,
       groupreturn_queue_journey_group92c55:false,
       groupoperational_pending_tab67331:false,
       tableoperational_pending_table0a253:false,
       groupoperational_pending_journey_group63667:false,
       grouptechnical_pending_tab0b23f:false,
       tabletechnical_pending_table84f30:false,
       grouptechnical_pending_journey_groupe4f03:false,
       groupmain_group9066f:false,
       groupoverallgroup01c61:false,
       groupcontrolgroupda197:false,
       groupcontrol_tab_groupbc3e2:false,
       groupbutton_group74f3e:false,
       grouprtgs_infofd0aa:false,
       groupallControls71c54:false,
       groupcommonInfof4607:false,
       groupbasicInfo3d198:false,
       groupadditionalInfod2894:false,
       grouplistgroupdcdbd:false,
       grouplist_tab_groupd6905:false,
       groupdocument_list38c6e:false,
       tabledocListTable56e97:false,
       groupvalidation_listae827:false,
       tablevaldnListTable17ec7:false,
       groupcomment_list72944:false,
       tablecmntListTable02d0e:false,
       grouprtgs_lista0a19:false,
       grouprtgs_list_grpcf7d8:false,
       grouprtgs_list_tble_groupab24b:false,
       tablertgs_list_table2926a:false,
       groupgroup05462:false,
       grouprtgs_list_tab_grp28533:false,
       groupdocumnt_list3a31d:false,
       tablertgs_lst_doc_list_table32147:false,
       groupvalidtn_list10f93:false,
       tablertgs_list_validtn_table84666:false,
       groupcmnt_liste161c:false,
       tablertgs_list_cmnts_list2148d:false,
       groupoverallgroup05ff6:false,
       groupjourney_details_groupd9a0e:false,
       grouptran_data_group84f25:false,
       groupreq_data_group8d4d7:false,
       groupres_data_group9d75a:false,
       groupoverallgroup1218f:false,
       groupcontrolgroupfbb48:false,
       groupcontrol_tab_group161ff:false,
       groupbutton_groupb9855:false,
       grouprtgs_info5957a:false,
       groupallControlsb8c72:false,
       groupcommonInfod7eda:false,
       groupbasicInfoffb0a:false,
       groupadditionalInfo4baba:false,
       grouplistgroup97a7c:false,
       grouplist_tab_group6782e:false,
       groupvalidation_listcc09d:false,
       tablevaldnListTable4db84:false,
       groupcomment_listb158b:false,
       tablecmntListTable96834:false,
       grouprtgs_listf12c6:false,
       grouprtgs_list_grp82cfc:false,
       grouprtgs_list_tble_groupe1ac5:false,
       tablertgs_list_tablead2c7:false,
       groupgroup1b1aa:false,
       grouprtgs_list_tab_grp43579:false,
       groupvalidtn_list3a9a1:false,
       tablertgs_list_validtn_table10755:false,
       groupcmnt_list18a3b:false,
       tablertgs_list_cmnts_list85130:false,
       groupgroupdd3f6:false,
       groupsimulator_main_group0541e:false,
       groupsimulator_tab_groupfd732:false,
       groupop_financial4735b:false,
       groupop_financial_grp8a39a:false,
       groupop_settlemente399b:false,
       groupop_settlement_grpb706d:false,
       groupip_financial66005:false,
       groupip_debtor_dtls8143c:false,
       groupip_creditor_dtls1ade4:false,
       grouppayment_dtls30132:false,
       groupaddionl_info43014:false,
       groupbutton_grp7b9b7:false,
      })

  ////// screen states 
  const [transactionproduct_v1,settransactionproduct_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [transactionproduct_v1Props,settransactionproduct_v1Props] = React.useState<any>({})
  const [transactionsearch_v1,settransactionsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [transactionsearch_v1Props,settransactionsearch_v1Props] = React.useState<any>({})
  const [scansaveprocessui_v1,setscansaveprocessui_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [scansaveprocessui_v1Props,setscansaveprocessui_v1Props] = React.useState<any>({})
  const [rejectpopupui_v1,setrejectpopupui_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [rejectpopupui_v1Props,setrejectpopupui_v1Props] = React.useState<any>({})
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
  const [inboundscanprocessui_v1,setinboundscanprocessui_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [inboundscanprocessui_v1Props,setinboundscanprocessui_v1Props] = React.useState<any>({})
  const [returnreasonpopupui_v1,setreturnreasonpopupui_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [returnreasonpopupui_v1Props,setreturnreasonpopupui_v1Props] = React.useState<any>({})
  const [simulatorprocessui_v1,setsimulatorprocessui_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [simulatorprocessui_v1Props,setsimulatorprocessui_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_transaction_v1Props,setdfd_transaction_v1Props] = React.useState<any>([])
  const [dfd_forexcurrencydropdowndfd_v1Props,setdfd_forexcurrencydropdowndfd_v1Props] = React.useState<any>([])
  const [dfd_rejectpopupdfd_v1Props,setdfd_rejectpopupdfd_v1Props] = React.useState<any>([])
  const [dfd_scansaveprocessdfd_v1Props,setdfd_scansaveprocessdfd_v1Props] = React.useState<any>([])
  const [dfd_crbankcodedropdowndfd_v1Props,setdfd_crbankcodedropdowndfd_v1Props] = React.useState<any>([])
  const [dfd_documentlistdfd_v1Props,setdfd_documentlistdfd_v1Props] = React.useState<any>([])
  const [dfd_errorlistdfd_v1Props,setdfd_errorlistdfd_v1Props] = React.useState<any>([])
  const [dfd_transactionlistdfd_v1Props,setdfd_transactionlistdfd_v1Props] = React.useState<any>([])
  const [dfd_commentlistdfd_v1Props,setdfd_commentlistdfd_v1Props] = React.useState<any>([])
  const [dfd_journey_v1Props,setdfd_journey_v1Props] = React.useState<any>([])
  const [dfd_returnreasondfd_v1Props,setdfd_returnreasondfd_v1Props] = React.useState<any>([])
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
    setsearch14cf0(
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
    setnew_payment7f5db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_view_allb0df6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_view_all33724(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_view_allc0a46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_view_all54da6(
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
    setcr_name_view_all19d14(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_view_all82afd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_view_all47e6b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_view_allef1ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_process_type569cf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_all_journeyd3ae9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_failure_queue12297(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_failure_queue42953(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_failure_queue03c86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_failure_queuef9d2d(
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
    setcr_name_failure_queue57c4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_failure_queue09d7a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_failure_queue0aef8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_failure_queueb7b55(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfailure_queue_journeyc8638(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_success_queue7c209(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_success_queueeddaf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_success_queuec805b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_operational_pending10a49(
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
    setcr_name_success_queueb80d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_success_queue2f950(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_success_queue019a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_success_queued0e34(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsuccess_queue_journey68ac9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_return_queuee5e11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_return_queuebdabb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_return_queue958c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_return_queuee94b2(
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
    setcr_name_return_queue13fec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_return_queuef37f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_return_queue95903(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_return_queue9fa04(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_queue_journeycc9d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_operational_pending6ecd4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_name_operational_pending2ab87(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_operational_pendinga8ff6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_operational_pending5146b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_operational_pending70e3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_operational_pendingf9a9c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_operational_pendingbce21(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_operational_pending282bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_operational_pending0df81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnew_payment_chk_approve_btn770f9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnew_payment_chk_send_to_maker_btn4c9a0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_details00488(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrepair9a97b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_operational_pendingeb172(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status11519(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreverse_posting0765b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoperational_pending_journey1a1a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_technical_pending11fe0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_technical_pendinge182f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_technical_pendingbc6bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_technical_pendingbc856(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_technical_pending5e6cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_technical_pending3c4aa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_technical_pending1bc34(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_technical_pending78349(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_technical_pending738a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_failure_queue73334(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settechnical_pending_journey6601c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settop_divider52f90(
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
    setstatus4bd75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbottom_dividerb9220(
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
    setscan31ce1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfolderscanf14e0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsavef2390(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel2bf72(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setupdateed7a9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsignature3ad2e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprove05fe8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsend_to_makera4797(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcommon_info3a458(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account27abb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name84266(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbase_currencyb386d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_cust_ac_sanc_lmtb74f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_cust_ac_balance753dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbasic_info216f3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwaive_charges929e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_accounta818b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_namea4b34(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_code8a2bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_name434eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_bic3d26f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setforex_currency65e0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexchange_rate88caf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrate_codee56ad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setforex_amounta58a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbase_amount3b226(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrate_ref_no82399(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrate_cust_idad42a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddtional_info46cb8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsignature_screen413bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_infoba5e0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadditional_reff63a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetd7e47(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvgphstm_uuidcf6fc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfilename7c104(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setactionf530a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvldcode0c0ce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvldreason2ef16(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcmnts11ffa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_id5f12f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_acnt_no469c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_acnt_nocb409(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamntef7a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_code24beb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreated_bye14cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreated_date14669(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_name_rtgs_list06cd7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaction_rtgs_listcf67e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvld_code_rtgs_lsta5e1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvld_reason_rtgs_listdd73b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcmnts_rtgs_listee03b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentviewer9df1d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext9205d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreasondesc20b1a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel7f45a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcontinue599e4(
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
    setdr_account36b40(
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
    setdr_currency9c8a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account0d1f4(
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
    setprocess_status_labelb1ca9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount01416(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess_status500d6(
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
    setreq_jsonviewer8d071(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setres_jsonviewerdd261(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethold12b6e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setforce_pass93cf0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_approve2a0bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn0f9cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel568c6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcommon_infoe66a9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account953ea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_named06e2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbase_currency57d7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbasic_info219cf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_accountddb15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name517b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_code9af27(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setforex_currency10f51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setforex_amount2d477(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbase_amount2df6d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddtional_infof3fad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsignature_screened28f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info0bded(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidget339ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvgphstm_uuidf9485(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvldcoded6381(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvldreasonfca81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcmntsa418a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_id6705e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_acnt_no28ad2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_acnt_no58585(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamnt95ed1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_code01850(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreated_byb7915(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreated_date6b8a8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvld_code_rtgs_lst274ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvld_reason_rtgs_listff18d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcmnts_rtgs_listd0091(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext574c6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reason_dropdown6f51c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclosea52fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsavebe5ab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_op8fcb1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_op_financ92df8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_type_opc2fc6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_type_op_financcbd29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate_op9a41b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate_op_fianc516b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_op4c851(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_op_financb7282(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_op98685(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_op_financc8de7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject_reason_op5ba8d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrej_reasn_op_financ13f05(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsubmit_opcf1e2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidget0c844(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_setl_product_code63258(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_setl_op20fab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmsg_type_op_setlmnta011a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_setl_message_type41552(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_setl_date62e49(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate_op_setlmntaf3c2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_op_setlmntffbc8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_op_settlmnt831e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_setlmnt_submit05756(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_info5fbb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account50944(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_lble3517(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_lbl2b7b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name9810f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_bank_lbl81c4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_banke5943(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_info1146f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_accountb0c70(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_lbl09825(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name89142(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_lbla2539(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_banke46ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_lble07fc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrtgs_account8a1f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrtgs_acnt_lblccdfc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpayment_info0041b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency52580(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency_lbl99714(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount07414(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount_lblc3248(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddtional_info60a69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_infod7394(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_lbl3a5c2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsubmit_ip98bbf(
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
            "new_payment",
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
        setview_all_journey_group67ce4({}) 
    setview_all_journey_group67ce4Props({
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
        setfailure_queue_journey_group36aba({}) 
    setfailure_queue_journey_group36abaProps({
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
        setsuccess_queue_journey_group755eb({}) 
    setsuccess_queue_journey_group755ebProps({
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
        setreturn_queue_journey_group92c55({}) 
    setreturn_queue_journey_group92c55Props({
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
        setoperational_pending_tab67331({}) 
    setoperational_pending_tab67331Props({
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
    
    setoperational_pending_table0a253([]) 
    setoperational_pending_table0a253Props({
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
        setoperational_pending_journey_group63667({}) 
    setoperational_pending_journey_group63667Props({
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
        settechnical_pending_tab0b23f({}) 
    settechnical_pending_tab0b23fProps({
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
    
    settechnical_pending_table84f30([]) 
    settechnical_pending_table84f30Props({
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
        settechnical_pending_journey_groupe4f03({}) 
    settechnical_pending_journey_groupe4f03Props({
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
            "top_divider",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "cr_currency",
            "dr_amount",
            "vgphstm_uuid",
            "trs_status",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        setoverallgroup01c61({}) 
    setoverallgroup01c61Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "url",
      ]
      }) 
        setcontrolgroupda197({}) 
    setcontrolgroupda197Props({
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
        setcontrol_tab_groupbc3e2({}) 
    setcontrol_tab_groupbc3e2Props({
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
        setbutton_group74f3e({}) 
    setbutton_group74f3eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "scan",
            "folderscan",
            "save",
            "cancel",
            "update",
            "signature",
            "approve",
            "send_to_maker",
      ]
      }) 
        setrtgs_infofd0aa({}) 
    setrtgs_infofd0aaProps({
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
        setallcontrols71c54({}) 
    setallcontrols71c54Props({
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
        setcommoninfof4607({}) 
    setcommoninfof4607Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "common_info",
            "dr_account",
            "dr_name",
            "dr_currency",
            "dr_cust_ac_sanc_lmt",
            "dr_cust_ac_balance",
      ]
      }) 
        setbasicinfo3d198({}) 
    setbasicinfo3d198Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_info",
            "waive_charges",
            "cr_account",
            "cr_name",
            "cr_bank_code",
            "cr_bank_code",
            "bank_name",
            "bic_code",
            "forex_currency",
            "forex_currency",
            "cr_currency",
            "exchange_rate",
            "rate_code",
            "dr_amount",
            "cr_amount",
            "rate_ref_no",
            "rate_cust_id",
      ]
      }) 
        setadditionalinfod2894({}) 
    setadditionalinfod2894Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "signature_screen",
            "remittance_info",
            "additional_reference",
            "customwidget",
            "vgphstm_uuid",
      ]
      }) 
        setlistgroupdcdbd({}) 
    setlistgroupdcdbdProps({
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
        setlist_tab_groupd6905({}) 
    setlist_tab_groupd6905Props({
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
        setdocument_list38c6e({}) 
    setdocument_list38c6eProps({
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
    
    setdoclisttable56e97([]) 
    setdoclisttable56e97Props({
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
        setvalidation_listae827({}) 
    setvalidation_listae827Props({
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
    
    setvaldnlisttable17ec7([]) 
    setvaldnlisttable17ec7Props({
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
        setcomment_list72944({}) 
    setcomment_list72944Props({
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
    
    setcmntlisttable02d0e([]) 
    setcmntlisttable02d0eProps({
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
        setrtgs_lista0a19({}) 
    setrtgs_lista0a19Props({
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
        setrtgs_list_grpcf7d8({}) 
    setrtgs_list_grpcf7d8Props({
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
        setrtgs_list_tble_groupab24b({}) 
    setrtgs_list_tble_groupab24bProps({
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
    
    setrtgs_list_table2926a([]) 
    setrtgs_list_table2926aProps({
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
        setgroup05462({}) 
    setgroup05462Props({
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
        setrtgs_list_tab_grp28533({}) 
    setrtgs_list_tab_grp28533Props({
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
        setdocumnt_list3a31d({}) 
    setdocumnt_list3a31dProps({
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
    
    setrtgs_lst_doc_list_table32147([]) 
    setrtgs_lst_doc_list_table32147Props({
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
        setvalidtn_list10f93({}) 
    setvalidtn_list10f93Props({
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
    
    setrtgs_list_validtn_table84666([]) 
    setrtgs_list_validtn_table84666Props({
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
        setcmnt_liste161c({}) 
    setcmnt_liste161cProps({
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
    
    setrtgs_list_cmnts_list2148d([]) 
    setrtgs_list_cmnts_list2148dProps({
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
        setoverallgroup05ff6({}) 
    setoverallgroup05ff6Props({
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
            "comments",
            "cancel",
            "continue",
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
            "trs_status",
            "processed_by_label",
            "debit_account_label",
            "processing_system",
            "dr_account",
            "currency_label",
            "credit_account_label",
            "dr_currency",
            "cr_account",
            "amount_label",
            "process_status_label",
            "cr_amount",
            "trs_process_status",
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
        setoverallgroup1218f({}) 
    setoverallgroup1218fProps({
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
        setcontrolgroupfbb48({}) 
    setcontrolgroupfbb48Props({
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
        setcontrol_tab_group161ff({}) 
    setcontrol_tab_group161ffProps({
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
        setbutton_groupb9855({}) 
    setbutton_groupb9855Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hold",
            "force_pass",
            "ip_approve",
            "return",
            "cancel",
      ]
      }) 
        setrtgs_info5957a({}) 
    setrtgs_info5957aProps({
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
        setallcontrolsb8c72({}) 
    setallcontrolsb8c72Props({
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
        setcommoninfod7eda({}) 
    setcommoninfod7edaProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "common_info",
            "dr_account",
            "dr_name",
            "dr_currency",
      ]
      }) 
        setbasicinfoffb0a({}) 
    setbasicinfoffb0aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_info",
            "cr_account",
            "cr_name",
            "cr_bank_code",
            "cr_bank_code",
            "forex_currency",
            "forex_currency",
            "cr_currency",
            "dr_amount",
            "cr_amount",
      ]
      }) 
        setadditionalinfo4baba({}) 
    setadditionalinfo4babaProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "signature_screen",
            "remittance_info",
            "customwidget",
            "vgphstm_uuid",
      ]
      }) 
        setlistgroup97a7c({}) 
    setlistgroup97a7cProps({
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
        setlist_tab_group6782e({}) 
    setlist_tab_group6782eProps({
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
        setvalidation_listcc09d({}) 
    setvalidation_listcc09dProps({
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
    
    setvaldnlisttable4db84([]) 
    setvaldnlisttable4db84Props({
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
        setcomment_listb158b({}) 
    setcomment_listb158bProps({
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
    
    setcmntlisttable96834([]) 
    setcmntlisttable96834Props({
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
        setrtgs_listf12c6({}) 
    setrtgs_listf12c6Props({
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
        setrtgs_list_grp82cfc({}) 
    setrtgs_list_grp82cfcProps({
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
        setrtgs_list_tble_groupe1ac5({}) 
    setrtgs_list_tble_groupe1ac5Props({
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
    
    setrtgs_list_tablead2c7([]) 
    setrtgs_list_tablead2c7Props({
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
        setgroup1b1aa({}) 
    setgroup1b1aaProps({
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
        setrtgs_list_tab_grp43579({}) 
    setrtgs_list_tab_grp43579Props({
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
        setvalidtn_list3a9a1({}) 
    setvalidtn_list3a9a1Props({
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
    
    setrtgs_list_validtn_table10755([]) 
    setrtgs_list_validtn_table10755Props({
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
        setcmnt_list18a3b({}) 
    setcmnt_list18a3bProps({
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
    
    setrtgs_list_cmnts_list85130([]) 
    setrtgs_list_cmnts_list85130Props({
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
        setgroupdd3f6({}) 
    setgroupdd3f6Props({
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
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        setsimulator_main_group0541e({}) 
    setsimulator_main_group0541eProps({
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
        setsimulator_tab_groupfd732({}) 
    setsimulator_tab_groupfd732Props({
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
        setop_financial4735b({}) 
    setop_financial4735bProps({
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
        setop_financial_grp8a39a({}) 
    setop_financial_grp8a39aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "product_code_op",
            "product_code_op_financ",
            "message_type_op",
            "message_type_op_financ",
            "date_op",
            "date_op_fianc",
            "uuid_op",
            "uuid_op_financ",
            "status_op",
            "status_op_financ",
            "reason",
            "rej_reasn_op_financ",
            "submit_op",
            "customwidget",
      ]
      }) 
        setop_settlemente399b({}) 
    setop_settlemente399bProps({
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
        setop_settlement_grpb706d({}) 
    setop_settlement_grpb706dProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_setl_product_code",
            "product_code_setl_op",
            "msg_type_op_setlmnt",
            "op_setl_message_type",
            "op_setl_date",
            "date_op_setlmnt",
            "uuid_op_setlmnt",
            "uuid_op_settlmnt",
            "op_setlmnt_submit",
      ]
      }) 
        setip_financial66005({}) 
    setip_financial66005Props({
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
        setip_debtor_dtls8143c({}) 
    setip_debtor_dtls8143cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debtor_info",
            "dr_account",
            "dr_account_lbl",
            "dr_name_lbl",
            "dr_name",
            "dr_bank_lbl",
            "dr_bank",
      ]
      }) 
        setip_creditor_dtls1ade4({}) 
    setip_creditor_dtls1ade4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "creditor_info",
            "cr_account",
            "cr_account_lbl",
            "cr_name",
            "cr_name_lbl",
            "cr_bank",
            "cr_bank_lbl",
            "rtgs_account",
            "rtgs_acnt_lbl",
      ]
      }) 
        setpayment_dtls30132({}) 
    setpayment_dtls30132Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_info",
            "currency",
            "currency_lbl",
            "amount",
            "amount_lbl",
      ]
      }) 
        setaddionl_info43014({}) 
    setaddionl_info43014Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "addtional_info",
            "remittance_info",
            "remittance_lbl",
      ]
      }) 
        setbutton_grp7b9b7({}) 
    setbutton_grp7b9b7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "submit_ip",
      ]
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
        view_all_journey_group67ce4, 
        setview_all_journey_group67ce4,
        view_all_journey_group67ce4Props, 
        setview_all_journey_group67ce4Props,
        failure_queue_tab69f01, 
        setfailure_queue_tab69f01,
        failure_queue_tab69f01Props, 
        setfailure_queue_tab69f01Props,
        failure_queue_tablea476f, 
        setfailure_queue_tablea476f,
        failure_queue_tablea476fProps, 
        setfailure_queue_tablea476fProps,
        failure_queue_journey_group36aba, 
        setfailure_queue_journey_group36aba,
        failure_queue_journey_group36abaProps, 
        setfailure_queue_journey_group36abaProps,
        success_queue_tabef582, 
        setsuccess_queue_tabef582,
        success_queue_tabef582Props, 
        setsuccess_queue_tabef582Props,
        success_queue_table63aae, 
        setsuccess_queue_table63aae,
        success_queue_table63aaeProps, 
        setsuccess_queue_table63aaeProps,
        success_queue_journey_group755eb, 
        setsuccess_queue_journey_group755eb,
        success_queue_journey_group755ebProps, 
        setsuccess_queue_journey_group755ebProps,
        return_queue_tab5611e, 
        setreturn_queue_tab5611e,
        return_queue_tab5611eProps, 
        setreturn_queue_tab5611eProps,
        return_queue_table267f0, 
        setreturn_queue_table267f0,
        return_queue_table267f0Props, 
        setreturn_queue_table267f0Props,
        return_queue_journey_group92c55, 
        setreturn_queue_journey_group92c55,
        return_queue_journey_group92c55Props, 
        setreturn_queue_journey_group92c55Props,
        operational_pending_tab67331, 
        setoperational_pending_tab67331,
        operational_pending_tab67331Props, 
        setoperational_pending_tab67331Props,
        operational_pending_table0a253, 
        setoperational_pending_table0a253,
        operational_pending_table0a253Props, 
        setoperational_pending_table0a253Props,
        operational_pending_journey_group63667, 
        setoperational_pending_journey_group63667,
        operational_pending_journey_group63667Props, 
        setoperational_pending_journey_group63667Props,
        technical_pending_tab0b23f, 
        settechnical_pending_tab0b23f,
        technical_pending_tab0b23fProps, 
        settechnical_pending_tab0b23fProps,
        technical_pending_table84f30, 
        settechnical_pending_table84f30,
        technical_pending_table84f30Props, 
        settechnical_pending_table84f30Props,
        technical_pending_journey_groupe4f03, 
        settechnical_pending_journey_groupe4f03,
        technical_pending_journey_groupe4f03Props, 
        settechnical_pending_journey_groupe4f03Props,
        main_group9066f, 
        setmain_group9066f,
        main_group9066fProps, 
        setmain_group9066fProps,
        overallgroup01c61, 
        setoverallgroup01c61,
        overallgroup01c61Props, 
        setoverallgroup01c61Props,
        controlgroupda197, 
        setcontrolgroupda197,
        controlgroupda197Props, 
        setcontrolgroupda197Props,
        control_tab_groupbc3e2, 
        setcontrol_tab_groupbc3e2,
        control_tab_groupbc3e2Props, 
        setcontrol_tab_groupbc3e2Props,
        button_group74f3e, 
        setbutton_group74f3e,
        button_group74f3eProps, 
        setbutton_group74f3eProps,
        rtgs_infofd0aa, 
        setrtgs_infofd0aa,
        rtgs_infofd0aaProps, 
        setrtgs_infofd0aaProps,
        allcontrols71c54, 
        setallcontrols71c54,
        allcontrols71c54Props, 
        setallcontrols71c54Props,
        commoninfof4607, 
        setcommoninfof4607,
        commoninfof4607Props, 
        setcommoninfof4607Props,
        basicinfo3d198, 
        setbasicinfo3d198,
        basicinfo3d198Props, 
        setbasicinfo3d198Props,
        additionalinfod2894, 
        setadditionalinfod2894,
        additionalinfod2894Props, 
        setadditionalinfod2894Props,
        listgroupdcdbd, 
        setlistgroupdcdbd,
        listgroupdcdbdProps, 
        setlistgroupdcdbdProps,
        list_tab_groupd6905, 
        setlist_tab_groupd6905,
        list_tab_groupd6905Props, 
        setlist_tab_groupd6905Props,
        document_list38c6e, 
        setdocument_list38c6e,
        document_list38c6eProps, 
        setdocument_list38c6eProps,
        doclisttable56e97, 
        setdoclisttable56e97,
        doclisttable56e97Props, 
        setdoclisttable56e97Props,
        validation_listae827, 
        setvalidation_listae827,
        validation_listae827Props, 
        setvalidation_listae827Props,
        valdnlisttable17ec7, 
        setvaldnlisttable17ec7,
        valdnlisttable17ec7Props, 
        setvaldnlisttable17ec7Props,
        comment_list72944, 
        setcomment_list72944,
        comment_list72944Props, 
        setcomment_list72944Props,
        cmntlisttable02d0e, 
        setcmntlisttable02d0e,
        cmntlisttable02d0eProps, 
        setcmntlisttable02d0eProps,
        rtgs_lista0a19, 
        setrtgs_lista0a19,
        rtgs_lista0a19Props, 
        setrtgs_lista0a19Props,
        rtgs_list_grpcf7d8, 
        setrtgs_list_grpcf7d8,
        rtgs_list_grpcf7d8Props, 
        setrtgs_list_grpcf7d8Props,
        rtgs_list_tble_groupab24b, 
        setrtgs_list_tble_groupab24b,
        rtgs_list_tble_groupab24bProps, 
        setrtgs_list_tble_groupab24bProps,
        rtgs_list_table2926a, 
        setrtgs_list_table2926a,
        rtgs_list_table2926aProps, 
        setrtgs_list_table2926aProps,
        group05462, 
        setgroup05462,
        group05462Props, 
        setgroup05462Props,
        rtgs_list_tab_grp28533, 
        setrtgs_list_tab_grp28533,
        rtgs_list_tab_grp28533Props, 
        setrtgs_list_tab_grp28533Props,
        documnt_list3a31d, 
        setdocumnt_list3a31d,
        documnt_list3a31dProps, 
        setdocumnt_list3a31dProps,
        rtgs_lst_doc_list_table32147, 
        setrtgs_lst_doc_list_table32147,
        rtgs_lst_doc_list_table32147Props, 
        setrtgs_lst_doc_list_table32147Props,
        validtn_list10f93, 
        setvalidtn_list10f93,
        validtn_list10f93Props, 
        setvalidtn_list10f93Props,
        rtgs_list_validtn_table84666, 
        setrtgs_list_validtn_table84666,
        rtgs_list_validtn_table84666Props, 
        setrtgs_list_validtn_table84666Props,
        cmnt_liste161c, 
        setcmnt_liste161c,
        cmnt_liste161cProps, 
        setcmnt_liste161cProps,
        rtgs_list_cmnts_list2148d, 
        setrtgs_list_cmnts_list2148d,
        rtgs_list_cmnts_list2148dProps, 
        setrtgs_list_cmnts_list2148dProps,
        overallgroup05ff6, 
        setoverallgroup05ff6,
        overallgroup05ff6Props, 
        setoverallgroup05ff6Props,
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
        overallgroup1218f, 
        setoverallgroup1218f,
        overallgroup1218fProps, 
        setoverallgroup1218fProps,
        controlgroupfbb48, 
        setcontrolgroupfbb48,
        controlgroupfbb48Props, 
        setcontrolgroupfbb48Props,
        control_tab_group161ff, 
        setcontrol_tab_group161ff,
        control_tab_group161ffProps, 
        setcontrol_tab_group161ffProps,
        button_groupb9855, 
        setbutton_groupb9855,
        button_groupb9855Props, 
        setbutton_groupb9855Props,
        rtgs_info5957a, 
        setrtgs_info5957a,
        rtgs_info5957aProps, 
        setrtgs_info5957aProps,
        allcontrolsb8c72, 
        setallcontrolsb8c72,
        allcontrolsb8c72Props, 
        setallcontrolsb8c72Props,
        commoninfod7eda, 
        setcommoninfod7eda,
        commoninfod7edaProps, 
        setcommoninfod7edaProps,
        basicinfoffb0a, 
        setbasicinfoffb0a,
        basicinfoffb0aProps, 
        setbasicinfoffb0aProps,
        additionalinfo4baba, 
        setadditionalinfo4baba,
        additionalinfo4babaProps, 
        setadditionalinfo4babaProps,
        listgroup97a7c, 
        setlistgroup97a7c,
        listgroup97a7cProps, 
        setlistgroup97a7cProps,
        list_tab_group6782e, 
        setlist_tab_group6782e,
        list_tab_group6782eProps, 
        setlist_tab_group6782eProps,
        validation_listcc09d, 
        setvalidation_listcc09d,
        validation_listcc09dProps, 
        setvalidation_listcc09dProps,
        valdnlisttable4db84, 
        setvaldnlisttable4db84,
        valdnlisttable4db84Props, 
        setvaldnlisttable4db84Props,
        comment_listb158b, 
        setcomment_listb158b,
        comment_listb158bProps, 
        setcomment_listb158bProps,
        cmntlisttable96834, 
        setcmntlisttable96834,
        cmntlisttable96834Props, 
        setcmntlisttable96834Props,
        rtgs_listf12c6, 
        setrtgs_listf12c6,
        rtgs_listf12c6Props, 
        setrtgs_listf12c6Props,
        rtgs_list_grp82cfc, 
        setrtgs_list_grp82cfc,
        rtgs_list_grp82cfcProps, 
        setrtgs_list_grp82cfcProps,
        rtgs_list_tble_groupe1ac5, 
        setrtgs_list_tble_groupe1ac5,
        rtgs_list_tble_groupe1ac5Props, 
        setrtgs_list_tble_groupe1ac5Props,
        rtgs_list_tablead2c7, 
        setrtgs_list_tablead2c7,
        rtgs_list_tablead2c7Props, 
        setrtgs_list_tablead2c7Props,
        group1b1aa, 
        setgroup1b1aa,
        group1b1aaProps, 
        setgroup1b1aaProps,
        rtgs_list_tab_grp43579, 
        setrtgs_list_tab_grp43579,
        rtgs_list_tab_grp43579Props, 
        setrtgs_list_tab_grp43579Props,
        validtn_list3a9a1, 
        setvalidtn_list3a9a1,
        validtn_list3a9a1Props, 
        setvalidtn_list3a9a1Props,
        rtgs_list_validtn_table10755, 
        setrtgs_list_validtn_table10755,
        rtgs_list_validtn_table10755Props, 
        setrtgs_list_validtn_table10755Props,
        cmnt_list18a3b, 
        setcmnt_list18a3b,
        cmnt_list18a3bProps, 
        setcmnt_list18a3bProps,
        rtgs_list_cmnts_list85130, 
        setrtgs_list_cmnts_list85130,
        rtgs_list_cmnts_list85130Props, 
        setrtgs_list_cmnts_list85130Props,
        groupdd3f6, 
        setgroupdd3f6,
        groupdd3f6Props, 
        setgroupdd3f6Props,
        simulator_main_group0541e, 
        setsimulator_main_group0541e,
        simulator_main_group0541eProps, 
        setsimulator_main_group0541eProps,
        simulator_tab_groupfd732, 
        setsimulator_tab_groupfd732,
        simulator_tab_groupfd732Props, 
        setsimulator_tab_groupfd732Props,
        op_financial4735b, 
        setop_financial4735b,
        op_financial4735bProps, 
        setop_financial4735bProps,
        op_financial_grp8a39a, 
        setop_financial_grp8a39a,
        op_financial_grp8a39aProps, 
        setop_financial_grp8a39aProps,
        op_settlemente399b, 
        setop_settlemente399b,
        op_settlemente399bProps, 
        setop_settlemente399bProps,
        op_settlement_grpb706d, 
        setop_settlement_grpb706d,
        op_settlement_grpb706dProps, 
        setop_settlement_grpb706dProps,
        ip_financial66005, 
        setip_financial66005,
        ip_financial66005Props, 
        setip_financial66005Props,
        ip_debtor_dtls8143c, 
        setip_debtor_dtls8143c,
        ip_debtor_dtls8143cProps, 
        setip_debtor_dtls8143cProps,
        ip_creditor_dtls1ade4, 
        setip_creditor_dtls1ade4,
        ip_creditor_dtls1ade4Props, 
        setip_creditor_dtls1ade4Props,
        payment_dtls30132, 
        setpayment_dtls30132,
        payment_dtls30132Props, 
        setpayment_dtls30132Props,
        addionl_info43014, 
        setaddionl_info43014,
        addionl_info43014Props, 
        setaddionl_info43014Props,
        button_grp7b9b7, 
        setbutton_grp7b9b7,
        button_grp7b9b7Props, 
        setbutton_grp7b9b7Props,
        outbound_or_inbound5e076,
        setoutbound_or_inbound5e076, 
        outbound_or_inbound5e076Props,
        setoutbound_or_inbound5e076Props,
        search14cf0,
        setsearch14cf0, 
        search14cf0Props,
        setsearch14cf0Props,
        refresh313d0,
        setrefresh313d0, 
        refresh313d0Props,
        setrefresh313d0Props,
        downloadcb505,
        setdownloadcb505, 
        downloadcb505Props,
        setdownloadcb505Props,
        new_payment7f5db,
        setnew_payment7f5db, 
        new_payment7f5dbProps,
        setnew_payment7f5dbProps,
        value_date_view_allb0df6,
        setvalue_date_view_allb0df6, 
        value_date_view_allb0df6Props,
        setvalue_date_view_allb0df6Props,
        dr_account_view_all33724,
        setdr_account_view_all33724, 
        dr_account_view_all33724Props,
        setdr_account_view_all33724Props,
        dr_name_view_allc0a46,
        setdr_name_view_allc0a46, 
        dr_name_view_allc0a46Props,
        setdr_name_view_allc0a46Props,
        dr_currency_view_all54da6,
        setdr_currency_view_all54da6, 
        dr_currency_view_all54da6Props,
        setdr_currency_view_all54da6Props,
        dr_amount_view_all88d6b,
        setdr_amount_view_all88d6b, 
        dr_amount_view_all88d6bProps,
        setdr_amount_view_all88d6bProps,
        cr_account_view_alld4b39,
        setcr_account_view_alld4b39, 
        cr_account_view_alld4b39Props,
        setcr_account_view_alld4b39Props,
        cr_name_view_all19d14,
        setcr_name_view_all19d14, 
        cr_name_view_all19d14Props,
        setcr_name_view_all19d14Props,
        cr_currency_view_all82afd,
        setcr_currency_view_all82afd, 
        cr_currency_view_all82afdProps,
        setcr_currency_view_all82afdProps,
        cr_amount_view_all47e6b,
        setcr_amount_view_all47e6b, 
        cr_amount_view_all47e6bProps,
        setcr_amount_view_all47e6bProps,
        uuid_view_allef1ca,
        setuuid_view_allef1ca, 
        uuid_view_allef1caProps,
        setuuid_view_allef1caProps,
        view_process_type569cf,
        setview_process_type569cf, 
        view_process_type569cfProps,
        setview_process_type569cfProps,
        view_all_journeyd3ae9,
        setview_all_journeyd3ae9, 
        view_all_journeyd3ae9Props,
        setview_all_journeyd3ae9Props,
        value_date_failure_queue12297,
        setvalue_date_failure_queue12297, 
        value_date_failure_queue12297Props,
        setvalue_date_failure_queue12297Props,
        dr_account_failure_queue42953,
        setdr_account_failure_queue42953, 
        dr_account_failure_queue42953Props,
        setdr_account_failure_queue42953Props,
        dr_name_failure_queue03c86,
        setdr_name_failure_queue03c86, 
        dr_name_failure_queue03c86Props,
        setdr_name_failure_queue03c86Props,
        dr_currency_failure_queuef9d2d,
        setdr_currency_failure_queuef9d2d, 
        dr_currency_failure_queuef9d2dProps,
        setdr_currency_failure_queuef9d2dProps,
        dr_amount_failure_queue95d4e,
        setdr_amount_failure_queue95d4e, 
        dr_amount_failure_queue95d4eProps,
        setdr_amount_failure_queue95d4eProps,
        cr_account_failure_queuea7246,
        setcr_account_failure_queuea7246, 
        cr_account_failure_queuea7246Props,
        setcr_account_failure_queuea7246Props,
        cr_name_failure_queue57c4d,
        setcr_name_failure_queue57c4d, 
        cr_name_failure_queue57c4dProps,
        setcr_name_failure_queue57c4dProps,
        cr_currency_failure_queue09d7a,
        setcr_currency_failure_queue09d7a, 
        cr_currency_failure_queue09d7aProps,
        setcr_currency_failure_queue09d7aProps,
        cr_amount_failure_queue0aef8,
        setcr_amount_failure_queue0aef8, 
        cr_amount_failure_queue0aef8Props,
        setcr_amount_failure_queue0aef8Props,
        uuid_failure_queueb7b55,
        setuuid_failure_queueb7b55, 
        uuid_failure_queueb7b55Props,
        setuuid_failure_queueb7b55Props,
        failure_queue_journeyc8638,
        setfailure_queue_journeyc8638, 
        failure_queue_journeyc8638Props,
        setfailure_queue_journeyc8638Props,
        value_date_success_queue7c209,
        setvalue_date_success_queue7c209, 
        value_date_success_queue7c209Props,
        setvalue_date_success_queue7c209Props,
        dr_account_success_queueeddaf,
        setdr_account_success_queueeddaf, 
        dr_account_success_queueeddafProps,
        setdr_account_success_queueeddafProps,
        dr_name_success_queuec805b,
        setdr_name_success_queuec805b, 
        dr_name_success_queuec805bProps,
        setdr_name_success_queuec805bProps,
        dr_currency_operational_pending10a49,
        setdr_currency_operational_pending10a49, 
        dr_currency_operational_pending10a49Props,
        setdr_currency_operational_pending10a49Props,
        dr_amount_success_queueda254,
        setdr_amount_success_queueda254, 
        dr_amount_success_queueda254Props,
        setdr_amount_success_queueda254Props,
        cr_account_success_queue60480,
        setcr_account_success_queue60480, 
        cr_account_success_queue60480Props,
        setcr_account_success_queue60480Props,
        cr_name_success_queueb80d4,
        setcr_name_success_queueb80d4, 
        cr_name_success_queueb80d4Props,
        setcr_name_success_queueb80d4Props,
        cr_currency_success_queue2f950,
        setcr_currency_success_queue2f950, 
        cr_currency_success_queue2f950Props,
        setcr_currency_success_queue2f950Props,
        cr_amount_success_queue019a2,
        setcr_amount_success_queue019a2, 
        cr_amount_success_queue019a2Props,
        setcr_amount_success_queue019a2Props,
        uuid_success_queued0e34,
        setuuid_success_queued0e34, 
        uuid_success_queued0e34Props,
        setuuid_success_queued0e34Props,
        success_queue_journey68ac9,
        setsuccess_queue_journey68ac9, 
        success_queue_journey68ac9Props,
        setsuccess_queue_journey68ac9Props,
        value_date_return_queuee5e11,
        setvalue_date_return_queuee5e11, 
        value_date_return_queuee5e11Props,
        setvalue_date_return_queuee5e11Props,
        dr_account_return_queuebdabb,
        setdr_account_return_queuebdabb, 
        dr_account_return_queuebdabbProps,
        setdr_account_return_queuebdabbProps,
        dr_name_return_queue958c9,
        setdr_name_return_queue958c9, 
        dr_name_return_queue958c9Props,
        setdr_name_return_queue958c9Props,
        dr_currency_return_queuee94b2,
        setdr_currency_return_queuee94b2, 
        dr_currency_return_queuee94b2Props,
        setdr_currency_return_queuee94b2Props,
        dr_amount_return_queue2f324,
        setdr_amount_return_queue2f324, 
        dr_amount_return_queue2f324Props,
        setdr_amount_return_queue2f324Props,
        cr_account_return_queue21a57,
        setcr_account_return_queue21a57, 
        cr_account_return_queue21a57Props,
        setcr_account_return_queue21a57Props,
        cr_name_return_queue13fec,
        setcr_name_return_queue13fec, 
        cr_name_return_queue13fecProps,
        setcr_name_return_queue13fecProps,
        cr_currency_return_queuef37f7,
        setcr_currency_return_queuef37f7, 
        cr_currency_return_queuef37f7Props,
        setcr_currency_return_queuef37f7Props,
        cr_amount_return_queue95903,
        setcr_amount_return_queue95903, 
        cr_amount_return_queue95903Props,
        setcr_amount_return_queue95903Props,
        uuid_return_queue9fa04,
        setuuid_return_queue9fa04, 
        uuid_return_queue9fa04Props,
        setuuid_return_queue9fa04Props,
        return_queue_journeycc9d3,
        setreturn_queue_journeycc9d3, 
        return_queue_journeycc9d3Props,
        setreturn_queue_journeycc9d3Props,
        value_date_operational_pending6ecd4,
        setvalue_date_operational_pending6ecd4, 
        value_date_operational_pending6ecd4Props,
        setvalue_date_operational_pending6ecd4Props,
        dr_account_name_operational_pending2ab87,
        setdr_account_name_operational_pending2ab87, 
        dr_account_name_operational_pending2ab87Props,
        setdr_account_name_operational_pending2ab87Props,
        dr_name_operational_pendinga8ff6,
        setdr_name_operational_pendinga8ff6, 
        dr_name_operational_pendinga8ff6Props,
        setdr_name_operational_pendinga8ff6Props,
        dr_currency_operational_pending5146b,
        setdr_currency_operational_pending5146b, 
        dr_currency_operational_pending5146bProps,
        setdr_currency_operational_pending5146bProps,
        dr_amount_operational_pending70e3f,
        setdr_amount_operational_pending70e3f, 
        dr_amount_operational_pending70e3fProps,
        setdr_amount_operational_pending70e3fProps,
        cr_account_operational_pendingf9a9c,
        setcr_account_operational_pendingf9a9c, 
        cr_account_operational_pendingf9a9cProps,
        setcr_account_operational_pendingf9a9cProps,
        cr_name_operational_pendingbce21,
        setcr_name_operational_pendingbce21, 
        cr_name_operational_pendingbce21Props,
        setcr_name_operational_pendingbce21Props,
        cr_currency_operational_pending282bc,
        setcr_currency_operational_pending282bc, 
        cr_currency_operational_pending282bcProps,
        setcr_currency_operational_pending282bcProps,
        cr_amount_operational_pending0df81,
        setcr_amount_operational_pending0df81, 
        cr_amount_operational_pending0df81Props,
        setcr_amount_operational_pending0df81Props,
        new_payment_chk_approve_btn770f9,
        setnew_payment_chk_approve_btn770f9, 
        new_payment_chk_approve_btn770f9Props,
        setnew_payment_chk_approve_btn770f9Props,
        new_payment_chk_send_to_maker_btn4c9a0,
        setnew_payment_chk_send_to_maker_btn4c9a0, 
        new_payment_chk_send_to_maker_btn4c9a0Props,
        setnew_payment_chk_send_to_maker_btn4c9a0Props,
        view_details00488,
        setview_details00488, 
        view_details00488Props,
        setview_details00488Props,
        repair9a97b,
        setrepair9a97b, 
        repair9a97bProps,
        setrepair9a97bProps,
        uuid_operational_pendingeb172,
        setuuid_operational_pendingeb172, 
        uuid_operational_pendingeb172Props,
        setuuid_operational_pendingeb172Props,
        trs_status11519,
        settrs_status11519, 
        trs_status11519Props,
        settrs_status11519Props,
        reverse_posting0765b,
        setreverse_posting0765b, 
        reverse_posting0765bProps,
        setreverse_posting0765bProps,
        operational_pending_journey1a1a5,
        setoperational_pending_journey1a1a5, 
        operational_pending_journey1a1a5Props,
        setoperational_pending_journey1a1a5Props,
        value_date_technical_pending11fe0,
        setvalue_date_technical_pending11fe0, 
        value_date_technical_pending11fe0Props,
        setvalue_date_technical_pending11fe0Props,
        dr_account_technical_pendinge182f,
        setdr_account_technical_pendinge182f, 
        dr_account_technical_pendinge182fProps,
        setdr_account_technical_pendinge182fProps,
        dr_name_technical_pendingbc6bb,
        setdr_name_technical_pendingbc6bb, 
        dr_name_technical_pendingbc6bbProps,
        setdr_name_technical_pendingbc6bbProps,
        dr_currency_technical_pendingbc856,
        setdr_currency_technical_pendingbc856, 
        dr_currency_technical_pendingbc856Props,
        setdr_currency_technical_pendingbc856Props,
        dr_amount_technical_pending5e6cc,
        setdr_amount_technical_pending5e6cc, 
        dr_amount_technical_pending5e6ccProps,
        setdr_amount_technical_pending5e6ccProps,
        cr_account_technical_pending3c4aa,
        setcr_account_technical_pending3c4aa, 
        cr_account_technical_pending3c4aaProps,
        setcr_account_technical_pending3c4aaProps,
        cr_name_technical_pending1bc34,
        setcr_name_technical_pending1bc34, 
        cr_name_technical_pending1bc34Props,
        setcr_name_technical_pending1bc34Props,
        cr_currency_technical_pending78349,
        setcr_currency_technical_pending78349, 
        cr_currency_technical_pending78349Props,
        setcr_currency_technical_pending78349Props,
        cr_amount_technical_pending738a2,
        setcr_amount_technical_pending738a2, 
        cr_amount_technical_pending738a2Props,
        setcr_amount_technical_pending738a2Props,
        uuid_failure_queue73334,
        setuuid_failure_queue73334, 
        uuid_failure_queue73334Props,
        setuuid_failure_queue73334Props,
        technical_pending_journey6601c,
        settechnical_pending_journey6601c, 
        technical_pending_journey6601cProps,
        settechnical_pending_journey6601cProps,
        top_divider52f90,
        settop_divider52f90, 
        top_divider52f90Props,
        settop_divider52f90Props,
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
        status4bd75,
        setstatus4bd75, 
        status4bd75Props,
        setstatus4bd75Props,
        bottom_dividerb9220,
        setbottom_dividerb9220, 
        bottom_dividerb9220Props,
        setbottom_dividerb9220Props,
        search0e695,
        setsearch0e695, 
        search0e695Props,
        setsearch0e695Props,
        cleareddfa,
        setcleareddfa, 
        cleareddfaProps,
        setcleareddfaProps,
        scan31ce1,
        setscan31ce1, 
        scan31ce1Props,
        setscan31ce1Props,
        folderscanf14e0,
        setfolderscanf14e0, 
        folderscanf14e0Props,
        setfolderscanf14e0Props,
        savef2390,
        setsavef2390, 
        savef2390Props,
        setsavef2390Props,
        cancel2bf72,
        setcancel2bf72, 
        cancel2bf72Props,
        setcancel2bf72Props,
        updateed7a9,
        setupdateed7a9, 
        updateed7a9Props,
        setupdateed7a9Props,
        signature3ad2e,
        setsignature3ad2e, 
        signature3ad2eProps,
        setsignature3ad2eProps,
        approve05fe8,
        setapprove05fe8, 
        approve05fe8Props,
        setapprove05fe8Props,
        send_to_makera4797,
        setsend_to_makera4797, 
        send_to_makera4797Props,
        setsend_to_makera4797Props,
        common_info3a458,
        setcommon_info3a458, 
        common_info3a458Props,
        setcommon_info3a458Props,
        dr_account27abb,
        setdr_account27abb, 
        dr_account27abbProps,
        setdr_account27abbProps,
        dr_name84266,
        setdr_name84266, 
        dr_name84266Props,
        setdr_name84266Props,
        base_currencyb386d,
        setbase_currencyb386d, 
        base_currencyb386dProps,
        setbase_currencyb386dProps,
        dr_cust_ac_sanc_lmtb74f7,
        setdr_cust_ac_sanc_lmtb74f7, 
        dr_cust_ac_sanc_lmtb74f7Props,
        setdr_cust_ac_sanc_lmtb74f7Props,
        dr_cust_ac_balance753dd,
        setdr_cust_ac_balance753dd, 
        dr_cust_ac_balance753ddProps,
        setdr_cust_ac_balance753ddProps,
        basic_info216f3,
        setbasic_info216f3, 
        basic_info216f3Props,
        setbasic_info216f3Props,
        waive_charges929e5,
        setwaive_charges929e5, 
        waive_charges929e5Props,
        setwaive_charges929e5Props,
        cr_accounta818b,
        setcr_accounta818b, 
        cr_accounta818bProps,
        setcr_accounta818bProps,
        cr_namea4b34,
        setcr_namea4b34, 
        cr_namea4b34Props,
        setcr_namea4b34Props,
        cr_bank_code8a2bc,
        setcr_bank_code8a2bc, 
        cr_bank_code8a2bcProps,
        setcr_bank_code8a2bcProps,
        cr_bank_name434eb,
        setcr_bank_name434eb, 
        cr_bank_name434ebProps,
        setcr_bank_name434ebProps,
        cr_bank_bic3d26f,
        setcr_bank_bic3d26f, 
        cr_bank_bic3d26fProps,
        setcr_bank_bic3d26fProps,
        forex_currency65e0b,
        setforex_currency65e0b, 
        forex_currency65e0bProps,
        setforex_currency65e0bProps,
        exchange_rate88caf,
        setexchange_rate88caf, 
        exchange_rate88cafProps,
        setexchange_rate88cafProps,
        rate_codee56ad,
        setrate_codee56ad, 
        rate_codee56adProps,
        setrate_codee56adProps,
        forex_amounta58a5,
        setforex_amounta58a5, 
        forex_amounta58a5Props,
        setforex_amounta58a5Props,
        base_amount3b226,
        setbase_amount3b226, 
        base_amount3b226Props,
        setbase_amount3b226Props,
        rate_ref_no82399,
        setrate_ref_no82399, 
        rate_ref_no82399Props,
        setrate_ref_no82399Props,
        rate_cust_idad42a,
        setrate_cust_idad42a, 
        rate_cust_idad42aProps,
        setrate_cust_idad42aProps,
        addtional_info46cb8,
        setaddtional_info46cb8, 
        addtional_info46cb8Props,
        setaddtional_info46cb8Props,
        signature_screen413bb,
        setsignature_screen413bb, 
        signature_screen413bbProps,
        setsignature_screen413bbProps,
        remittance_infoba5e0,
        setremittance_infoba5e0, 
        remittance_infoba5e0Props,
        setremittance_infoba5e0Props,
        additional_reff63a3,
        setadditional_reff63a3, 
        additional_reff63a3Props,
        setadditional_reff63a3Props,
        customwidgetd7e47,
        setcustomwidgetd7e47, 
        customwidgetd7e47Props,
        setcustomwidgetd7e47Props,
        vgphstm_uuidcf6fc,
        setvgphstm_uuidcf6fc, 
        vgphstm_uuidcf6fcProps,
        setvgphstm_uuidcf6fcProps,
        filename7c104,
        setfilename7c104, 
        filename7c104Props,
        setfilename7c104Props,
        actionf530a,
        setactionf530a, 
        actionf530aProps,
        setactionf530aProps,
        vldcode0c0ce,
        setvldcode0c0ce, 
        vldcode0c0ceProps,
        setvldcode0c0ceProps,
        vldreason2ef16,
        setvldreason2ef16, 
        vldreason2ef16Props,
        setvldreason2ef16Props,
        cmnts11ffa,
        setcmnts11ffa, 
        cmnts11ffaProps,
        setcmnts11ffaProps,
        tran_id5f12f,
        settran_id5f12f, 
        tran_id5f12fProps,
        settran_id5f12fProps,
        dr_acnt_no469c1,
        setdr_acnt_no469c1, 
        dr_acnt_no469c1Props,
        setdr_acnt_no469c1Props,
        cr_acnt_nocb409,
        setcr_acnt_nocb409, 
        cr_acnt_nocb409Props,
        setcr_acnt_nocb409Props,
        amntef7a4,
        setamntef7a4, 
        amntef7a4Props,
        setamntef7a4Props,
        cr_bank_code24beb,
        setcr_bank_code24beb, 
        cr_bank_code24bebProps,
        setcr_bank_code24bebProps,
        created_bye14cd,
        setcreated_bye14cd, 
        created_bye14cdProps,
        setcreated_bye14cdProps,
        created_date14669,
        setcreated_date14669, 
        created_date14669Props,
        setcreated_date14669Props,
        file_name_rtgs_list06cd7,
        setfile_name_rtgs_list06cd7, 
        file_name_rtgs_list06cd7Props,
        setfile_name_rtgs_list06cd7Props,
        action_rtgs_listcf67e,
        setaction_rtgs_listcf67e, 
        action_rtgs_listcf67eProps,
        setaction_rtgs_listcf67eProps,
        vld_code_rtgs_lsta5e1f,
        setvld_code_rtgs_lsta5e1f, 
        vld_code_rtgs_lsta5e1fProps,
        setvld_code_rtgs_lsta5e1fProps,
        vld_reason_rtgs_listdd73b,
        setvld_reason_rtgs_listdd73b, 
        vld_reason_rtgs_listdd73bProps,
        setvld_reason_rtgs_listdd73bProps,
        cmnts_rtgs_listee03b,
        setcmnts_rtgs_listee03b, 
        cmnts_rtgs_listee03bProps,
        setcmnts_rtgs_listee03bProps,
        documentviewer9df1d,
        setdocumentviewer9df1d, 
        documentviewer9df1dProps,
        setdocumentviewer9df1dProps,
        text9205d,
        settext9205d, 
        text9205dProps,
        settext9205dProps,
        reasondesc20b1a,
        setreasondesc20b1a, 
        reasondesc20b1aProps,
        setreasondesc20b1aProps,
        cancel7f45a,
        setcancel7f45a, 
        cancel7f45aProps,
        setcancel7f45aProps,
        continue599e4,
        setcontinue599e4, 
        continue599e4Props,
        setcontinue599e4Props,
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
        dr_account36b40,
        setdr_account36b40, 
        dr_account36b40Props,
        setdr_account36b40Props,
        currency_labele21ba,
        setcurrency_labele21ba, 
        currency_labele21baProps,
        setcurrency_labele21baProps,
        credit_account_label65c7b,
        setcredit_account_label65c7b, 
        credit_account_label65c7bProps,
        setcredit_account_label65c7bProps,
        dr_currency9c8a2,
        setdr_currency9c8a2, 
        dr_currency9c8a2Props,
        setdr_currency9c8a2Props,
        cr_account0d1f4,
        setcr_account0d1f4, 
        cr_account0d1f4Props,
        setcr_account0d1f4Props,
        amount_labelfd725,
        setamount_labelfd725, 
        amount_labelfd725Props,
        setamount_labelfd725Props,
        process_status_labelb1ca9,
        setprocess_status_labelb1ca9, 
        process_status_labelb1ca9Props,
        setprocess_status_labelb1ca9Props,
        cr_amount01416,
        setcr_amount01416, 
        cr_amount01416Props,
        setcr_amount01416Props,
        process_status500d6,
        setprocess_status500d6, 
        process_status500d6Props,
        setprocess_status500d6Props,
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
        req_jsonviewer8d071,
        setreq_jsonviewer8d071, 
        req_jsonviewer8d071Props,
        setreq_jsonviewer8d071Props,
        res_jsonviewerdd261,
        setres_jsonviewerdd261, 
        res_jsonviewerdd261Props,
        setres_jsonviewerdd261Props,
        hold12b6e,
        sethold12b6e, 
        hold12b6eProps,
        sethold12b6eProps,
        force_pass93cf0,
        setforce_pass93cf0, 
        force_pass93cf0Props,
        setforce_pass93cf0Props,
        ip_approve2a0bf,
        setip_approve2a0bf, 
        ip_approve2a0bfProps,
        setip_approve2a0bfProps,
        return0f9cc,
        setreturn0f9cc, 
        return0f9ccProps,
        setreturn0f9ccProps,
        cancel568c6,
        setcancel568c6, 
        cancel568c6Props,
        setcancel568c6Props,
        common_infoe66a9,
        setcommon_infoe66a9, 
        common_infoe66a9Props,
        setcommon_infoe66a9Props,
        dr_account953ea,
        setdr_account953ea, 
        dr_account953eaProps,
        setdr_account953eaProps,
        dr_named06e2,
        setdr_named06e2, 
        dr_named06e2Props,
        setdr_named06e2Props,
        base_currency57d7d,
        setbase_currency57d7d, 
        base_currency57d7dProps,
        setbase_currency57d7dProps,
        basic_info219cf,
        setbasic_info219cf, 
        basic_info219cfProps,
        setbasic_info219cfProps,
        cr_accountddb15,
        setcr_accountddb15, 
        cr_accountddb15Props,
        setcr_accountddb15Props,
        cr_name517b4,
        setcr_name517b4, 
        cr_name517b4Props,
        setcr_name517b4Props,
        cr_bank_code9af27,
        setcr_bank_code9af27, 
        cr_bank_code9af27Props,
        setcr_bank_code9af27Props,
        forex_currency10f51,
        setforex_currency10f51, 
        forex_currency10f51Props,
        setforex_currency10f51Props,
        forex_amount2d477,
        setforex_amount2d477, 
        forex_amount2d477Props,
        setforex_amount2d477Props,
        base_amount2df6d,
        setbase_amount2df6d, 
        base_amount2df6dProps,
        setbase_amount2df6dProps,
        addtional_infof3fad,
        setaddtional_infof3fad, 
        addtional_infof3fadProps,
        setaddtional_infof3fadProps,
        signature_screened28f,
        setsignature_screened28f, 
        signature_screened28fProps,
        setsignature_screened28fProps,
        remittance_info0bded,
        setremittance_info0bded, 
        remittance_info0bdedProps,
        setremittance_info0bdedProps,
        customwidget339ed,
        setcustomwidget339ed, 
        customwidget339edProps,
        setcustomwidget339edProps,
        vgphstm_uuidf9485,
        setvgphstm_uuidf9485, 
        vgphstm_uuidf9485Props,
        setvgphstm_uuidf9485Props,
        vldcoded6381,
        setvldcoded6381, 
        vldcoded6381Props,
        setvldcoded6381Props,
        vldreasonfca81,
        setvldreasonfca81, 
        vldreasonfca81Props,
        setvldreasonfca81Props,
        cmntsa418a,
        setcmntsa418a, 
        cmntsa418aProps,
        setcmntsa418aProps,
        tran_id6705e,
        settran_id6705e, 
        tran_id6705eProps,
        settran_id6705eProps,
        dr_acnt_no28ad2,
        setdr_acnt_no28ad2, 
        dr_acnt_no28ad2Props,
        setdr_acnt_no28ad2Props,
        cr_acnt_no58585,
        setcr_acnt_no58585, 
        cr_acnt_no58585Props,
        setcr_acnt_no58585Props,
        amnt95ed1,
        setamnt95ed1, 
        amnt95ed1Props,
        setamnt95ed1Props,
        cr_bank_code01850,
        setcr_bank_code01850, 
        cr_bank_code01850Props,
        setcr_bank_code01850Props,
        created_byb7915,
        setcreated_byb7915, 
        created_byb7915Props,
        setcreated_byb7915Props,
        created_date6b8a8,
        setcreated_date6b8a8, 
        created_date6b8a8Props,
        setcreated_date6b8a8Props,
        vld_code_rtgs_lst274ca,
        setvld_code_rtgs_lst274ca, 
        vld_code_rtgs_lst274caProps,
        setvld_code_rtgs_lst274caProps,
        vld_reason_rtgs_listff18d,
        setvld_reason_rtgs_listff18d, 
        vld_reason_rtgs_listff18dProps,
        setvld_reason_rtgs_listff18dProps,
        cmnts_rtgs_listd0091,
        setcmnts_rtgs_listd0091, 
        cmnts_rtgs_listd0091Props,
        setcmnts_rtgs_listd0091Props,
        text574c6,
        settext574c6, 
        text574c6Props,
        settext574c6Props,
        return_reason_dropdown6f51c,
        setreturn_reason_dropdown6f51c, 
        return_reason_dropdown6f51cProps,
        setreturn_reason_dropdown6f51cProps,
        closea52fd,
        setclosea52fd, 
        closea52fdProps,
        setclosea52fdProps,
        savebe5ab,
        setsavebe5ab, 
        savebe5abProps,
        setsavebe5abProps,
        product_code_op8fcb1,
        setproduct_code_op8fcb1, 
        product_code_op8fcb1Props,
        setproduct_code_op8fcb1Props,
        product_code_op_financ92df8,
        setproduct_code_op_financ92df8, 
        product_code_op_financ92df8Props,
        setproduct_code_op_financ92df8Props,
        message_type_opc2fc6,
        setmessage_type_opc2fc6, 
        message_type_opc2fc6Props,
        setmessage_type_opc2fc6Props,
        message_type_op_financcbd29,
        setmessage_type_op_financcbd29, 
        message_type_op_financcbd29Props,
        setmessage_type_op_financcbd29Props,
        date_op9a41b,
        setdate_op9a41b, 
        date_op9a41bProps,
        setdate_op9a41bProps,
        date_op_fianc516b0,
        setdate_op_fianc516b0, 
        date_op_fianc516b0Props,
        setdate_op_fianc516b0Props,
        uuid_op4c851,
        setuuid_op4c851, 
        uuid_op4c851Props,
        setuuid_op4c851Props,
        uuid_op_financb7282,
        setuuid_op_financb7282, 
        uuid_op_financb7282Props,
        setuuid_op_financb7282Props,
        status_op98685,
        setstatus_op98685, 
        status_op98685Props,
        setstatus_op98685Props,
        status_op_financc8de7,
        setstatus_op_financc8de7, 
        status_op_financc8de7Props,
        setstatus_op_financc8de7Props,
        reject_reason_op5ba8d,
        setreject_reason_op5ba8d, 
        reject_reason_op5ba8dProps,
        setreject_reason_op5ba8dProps,
        rej_reasn_op_financ13f05,
        setrej_reasn_op_financ13f05, 
        rej_reasn_op_financ13f05Props,
        setrej_reasn_op_financ13f05Props,
        submit_opcf1e2,
        setsubmit_opcf1e2, 
        submit_opcf1e2Props,
        setsubmit_opcf1e2Props,
        customwidget0c844,
        setcustomwidget0c844, 
        customwidget0c844Props,
        setcustomwidget0c844Props,
        op_setl_product_code63258,
        setop_setl_product_code63258, 
        op_setl_product_code63258Props,
        setop_setl_product_code63258Props,
        product_code_setl_op20fab,
        setproduct_code_setl_op20fab, 
        product_code_setl_op20fabProps,
        setproduct_code_setl_op20fabProps,
        msg_type_op_setlmnta011a,
        setmsg_type_op_setlmnta011a, 
        msg_type_op_setlmnta011aProps,
        setmsg_type_op_setlmnta011aProps,
        op_setl_message_type41552,
        setop_setl_message_type41552, 
        op_setl_message_type41552Props,
        setop_setl_message_type41552Props,
        op_setl_date62e49,
        setop_setl_date62e49, 
        op_setl_date62e49Props,
        setop_setl_date62e49Props,
        date_op_setlmntaf3c2,
        setdate_op_setlmntaf3c2, 
        date_op_setlmntaf3c2Props,
        setdate_op_setlmntaf3c2Props,
        uuid_op_setlmntffbc8,
        setuuid_op_setlmntffbc8, 
        uuid_op_setlmntffbc8Props,
        setuuid_op_setlmntffbc8Props,
        uuid_op_settlmnt831e5,
        setuuid_op_settlmnt831e5, 
        uuid_op_settlmnt831e5Props,
        setuuid_op_settlmnt831e5Props,
        op_setlmnt_submit05756,
        setop_setlmnt_submit05756, 
        op_setlmnt_submit05756Props,
        setop_setlmnt_submit05756Props,
        debtor_info5fbb6,
        setdebtor_info5fbb6, 
        debtor_info5fbb6Props,
        setdebtor_info5fbb6Props,
        dr_account50944,
        setdr_account50944, 
        dr_account50944Props,
        setdr_account50944Props,
        dr_account_lble3517,
        setdr_account_lble3517, 
        dr_account_lble3517Props,
        setdr_account_lble3517Props,
        dr_name_lbl2b7b9,
        setdr_name_lbl2b7b9, 
        dr_name_lbl2b7b9Props,
        setdr_name_lbl2b7b9Props,
        dr_name9810f,
        setdr_name9810f, 
        dr_name9810fProps,
        setdr_name9810fProps,
        dr_bank_lbl81c4c,
        setdr_bank_lbl81c4c, 
        dr_bank_lbl81c4cProps,
        setdr_bank_lbl81c4cProps,
        dr_banke5943,
        setdr_banke5943, 
        dr_banke5943Props,
        setdr_banke5943Props,
        creditor_info1146f,
        setcreditor_info1146f, 
        creditor_info1146fProps,
        setcreditor_info1146fProps,
        cr_accountb0c70,
        setcr_accountb0c70, 
        cr_accountb0c70Props,
        setcr_accountb0c70Props,
        cr_account_lbl09825,
        setcr_account_lbl09825, 
        cr_account_lbl09825Props,
        setcr_account_lbl09825Props,
        cr_name89142,
        setcr_name89142, 
        cr_name89142Props,
        setcr_name89142Props,
        cr_name_lbla2539,
        setcr_name_lbla2539, 
        cr_name_lbla2539Props,
        setcr_name_lbla2539Props,
        cr_banke46ca,
        setcr_banke46ca, 
        cr_banke46caProps,
        setcr_banke46caProps,
        cr_bank_lble07fc,
        setcr_bank_lble07fc, 
        cr_bank_lble07fcProps,
        setcr_bank_lble07fcProps,
        rtgs_account8a1f0,
        setrtgs_account8a1f0, 
        rtgs_account8a1f0Props,
        setrtgs_account8a1f0Props,
        rtgs_acnt_lblccdfc,
        setrtgs_acnt_lblccdfc, 
        rtgs_acnt_lblccdfcProps,
        setrtgs_acnt_lblccdfcProps,
        payment_info0041b,
        setpayment_info0041b, 
        payment_info0041bProps,
        setpayment_info0041bProps,
        currency52580,
        setcurrency52580, 
        currency52580Props,
        setcurrency52580Props,
        currency_lbl99714,
        setcurrency_lbl99714, 
        currency_lbl99714Props,
        setcurrency_lbl99714Props,
        amount07414,
        setamount07414, 
        amount07414Props,
        setamount07414Props,
        amount_lblc3248,
        setamount_lblc3248, 
        amount_lblc3248Props,
        setamount_lblc3248Props,
        addtional_info60a69,
        setaddtional_info60a69, 
        addtional_info60a69Props,
        setaddtional_info60a69Props,
        remittance_infod7394,
        setremittance_infod7394, 
        remittance_infod7394Props,
        setremittance_infod7394Props,
        remittance_lbl3a5c2,
        setremittance_lbl3a5c2, 
        remittance_lbl3a5c2Props,
        setremittance_lbl3a5c2Props,
        submit_ip98bbf,
        setsubmit_ip98bbf, 
        submit_ip98bbfProps,
        setsubmit_ip98bbfProps,
        ////// screen states 
          transactionproduct_v1,
          settransactionproduct_v1,
          transactionproduct_v1Props,
          settransactionproduct_v1Props,
          transactionsearch_v1,
          settransactionsearch_v1,
          transactionsearch_v1Props,
          settransactionsearch_v1Props,
          scansaveprocessui_v1,
          setscansaveprocessui_v1,
          scansaveprocessui_v1Props,
          setscansaveprocessui_v1Props,
          rejectpopupui_v1,
          setrejectpopupui_v1,
          rejectpopupui_v1Props,
          setrejectpopupui_v1Props,
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
          inboundscanprocessui_v1,
          setinboundscanprocessui_v1,
          inboundscanprocessui_v1Props,
          setinboundscanprocessui_v1Props,
          returnreasonpopupui_v1,
          setreturnreasonpopupui_v1,
          returnreasonpopupui_v1Props,
          setreturnreasonpopupui_v1Props,
          simulatorprocessui_v1,
          setsimulatorprocessui_v1,
          simulatorprocessui_v1Props,
          setsimulatorprocessui_v1Props,
        //////////

        ///////// dfd
        dfd_transaction_v1Props,
        setdfd_transaction_v1Props,
        dfd_forexcurrencydropdowndfd_v1Props,
        setdfd_forexcurrencydropdowndfd_v1Props,
        dfd_rejectpopupdfd_v1Props,
        setdfd_rejectpopupdfd_v1Props,
        dfd_scansaveprocessdfd_v1Props,
        setdfd_scansaveprocessdfd_v1Props,
        dfd_crbankcodedropdowndfd_v1Props,
        setdfd_crbankcodedropdowndfd_v1Props,
        dfd_documentlistdfd_v1Props,
        setdfd_documentlistdfd_v1Props,
        dfd_errorlistdfd_v1Props,
        setdfd_errorlistdfd_v1Props,
        dfd_transactionlistdfd_v1Props,
        setdfd_transactionlistdfd_v1Props,
        dfd_commentlistdfd_v1Props,
        setdfd_commentlistdfd_v1Props,
        dfd_journey_v1Props,
        setdfd_journey_v1Props,
        dfd_returnreasondfd_v1Props,
        setdfd_returnreasondfd_v1Props,
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