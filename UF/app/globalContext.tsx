


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
  grp_wps7d0b0: any 
  setgrp_wps7d0b0: React.Dispatch<React.SetStateAction<any>>
  grp_wps7d0b0Props: any 
  setgrp_wps7d0b0Props: React.Dispatch<React.SetStateAction<any>>
  grp_eobedcde: any 
  setgrp_eobedcde: React.Dispatch<React.SetStateAction<any>>
  grp_eobedcdeProps: any 
  setgrp_eobedcdeProps: React.Dispatch<React.SetStateAction<any>>
  grp_wps_nack_failurecdb58: any 
  setgrp_wps_nack_failurecdb58: React.Dispatch<React.SetStateAction<any>>
  grp_wps_nack_failurecdb58Props: any 
  setgrp_wps_nack_failurecdb58Props: React.Dispatch<React.SetStateAction<any>>
  tabgroup_post_excep0d361: any 
  settabgroup_post_excep0d361: React.Dispatch<React.SetStateAction<any>>
  tabgroup_post_excep0d361Props: any 
  settabgroup_post_excep0d361Props: React.Dispatch<React.SetStateAction<any>>
  dashboard_tab_headercb15a: any 
  setdashboard_tab_headercb15a: React.Dispatch<React.SetStateAction<any>>
  dashboard_tab_headercb15aProps: any 
  setdashboard_tab_headercb15aProps: React.Dispatch<React.SetStateAction<any>>
  dash_tab_grp477aa: any 
  setdash_tab_grp477aa: React.Dispatch<React.SetStateAction<any>>
  dash_tab_grp477aaProps: any 
  setdash_tab_grp477aaProps: React.Dispatch<React.SetStateAction<any>>
  corporate_group92e02: any 
  setcorporate_group92e02: React.Dispatch<React.SetStateAction<any>>
  corporate_group92e02Props: any 
  setcorporate_group92e02Props: React.Dispatch<React.SetStateAction<any>>
  success_groupf3393: any 
  setsuccess_groupf3393: React.Dispatch<React.SetStateAction<any>>
  success_groupf3393Props: any 
  setsuccess_groupf3393Props: React.Dispatch<React.SetStateAction<any>>
  failure_group60ccc: any 
  setfailure_group60ccc: React.Dispatch<React.SetStateAction<any>>
  failure_group60cccProps: any 
  setfailure_group60cccProps: React.Dispatch<React.SetStateAction<any>>
  my_queue_group17a74: any 
  setmy_queue_group17a74: React.Dispatch<React.SetStateAction<any>>
  my_queue_group17a74Props: any 
  setmy_queue_group17a74Props: React.Dispatch<React.SetStateAction<any>>
  tab_overalla72da: any 
  settab_overalla72da: React.Dispatch<React.SetStateAction<any>>
  tab_overalla72daProps: any 
  settab_overalla72daProps: React.Dispatch<React.SetStateAction<any>>
  tab_all14848: any 
  settab_all14848: React.Dispatch<React.SetStateAction<any>>
  tab_all14848Props: any 
  settab_all14848Props: React.Dispatch<React.SetStateAction<any>>
  all_groupdc06f: any 
  setall_groupdc06f: React.Dispatch<React.SetStateAction<any>>
  all_groupdc06fProps: any 
  setall_groupdc06fProps: React.Dispatch<React.SetStateAction<any>>
  all_table9a484: any 
  setall_table9a484: React.Dispatch<React.SetStateAction<any>>
  all_table9a484Props: any 
  setall_table9a484Props: React.Dispatch<React.SetStateAction<any>>
  action_required_tab3b174: any 
  setaction_required_tab3b174: React.Dispatch<React.SetStateAction<any>>
  action_required_tab3b174Props: any 
  setaction_required_tab3b174Props: React.Dispatch<React.SetStateAction<any>>
  action_required_groupc490c: any 
  setaction_required_groupc490c: React.Dispatch<React.SetStateAction<any>>
  action_required_groupc490cProps: any 
  setaction_required_groupc490cProps: React.Dispatch<React.SetStateAction<any>>
  action_required_table0359e: any 
  setaction_required_table0359e: React.Dispatch<React.SetStateAction<any>>
  action_required_table0359eProps: any 
  setaction_required_table0359eProps: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_tabeaf18: any 
  setsalary_return_refund_tabeaf18: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_tabeaf18Props: any 
  setsalary_return_refund_tabeaf18Props: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_group9c3f2: any 
  setsalary_return_refund_group9c3f2: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_group9c3f2Props: any 
  setsalary_return_refund_group9c3f2Props: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_tablee81e8: any 
  setsalary_return_refund_tablee81e8: React.Dispatch<React.SetStateAction<any>>
  salary_return_refund_tablee81e8Props: any 
  setsalary_return_refund_tablee81e8Props: React.Dispatch<React.SetStateAction<any>>
  exception_tab1addc: any 
  setexception_tab1addc: React.Dispatch<React.SetStateAction<any>>
  exception_tab1addcProps: any 
  setexception_tab1addcProps: React.Dispatch<React.SetStateAction<any>>
  exception_group8bd2f: any 
  setexception_group8bd2f: React.Dispatch<React.SetStateAction<any>>
  exception_group8bd2fProps: any 
  setexception_group8bd2fProps: React.Dispatch<React.SetStateAction<any>>
  exception_table77afe: any 
  setexception_table77afe: React.Dispatch<React.SetStateAction<any>>
  exception_table77afeProps: any 
  setexception_table77afeProps: React.Dispatch<React.SetStateAction<any>>
  total_emp_group824bb: any 
  settotal_emp_group824bb: React.Dispatch<React.SetStateAction<any>>
  total_emp_group824bbProps: any 
  settotal_emp_group824bbProps: React.Dispatch<React.SetStateAction<any>>
  salary_process_groupe9737: any 
  setsalary_process_groupe9737: React.Dispatch<React.SetStateAction<any>>
  salary_process_groupe9737Props: any 
  setsalary_process_groupe9737Props: React.Dispatch<React.SetStateAction<any>>
  pie_chart_group31af3: any 
  setpie_chart_group31af3: React.Dispatch<React.SetStateAction<any>>
  pie_chart_group31af3Props: any 
  setpie_chart_group31af3Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_wps_nack_failuref61a4: any 
  settab_header_wps_nack_failuref61a4: React.Dispatch<React.SetStateAction<any>>
  tab_header_wps_nack_failuref61a4Props: any 
  settab_header_wps_nack_failuref61a4Props: React.Dispatch<React.SetStateAction<any>>
  grp_employee_verify730a2: any 
  setgrp_employee_verify730a2: React.Dispatch<React.SetStateAction<any>>
  grp_employee_verify730a2Props: any 
  setgrp_employee_verify730a2Props: React.Dispatch<React.SetStateAction<any>>
  table_file_list44ec7: any 
  settable_file_list44ec7: React.Dispatch<React.SetStateAction<any>>
  table_file_list44ec7Props: any 
  settable_file_list44ec7Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_wps_file_journey9bceb: any 
  settab_header_wps_file_journey9bceb: React.Dispatch<React.SetStateAction<any>>
  tab_header_wps_file_journey9bcebProps: any 
  settab_header_wps_file_journey9bcebProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_repair8807c: any 
  setgrp_overall_repair8807c: React.Dispatch<React.SetStateAction<any>>
  grp_overall_repair8807cProps: any 
  setgrp_overall_repair8807cProps: React.Dispatch<React.SetStateAction<any>>
  tbl_wps_file_journryabf3b: any 
  settbl_wps_file_journryabf3b: React.Dispatch<React.SetStateAction<any>>
  tbl_wps_file_journryabf3bProps: any 
  settbl_wps_file_journryabf3bProps: React.Dispatch<React.SetStateAction<any>>
  tab_header_posting_exceptionade8d: any 
  settab_header_posting_exceptionade8d: React.Dispatch<React.SetStateAction<any>>
  tab_header_posting_exceptionade8dProps: any 
  settab_header_posting_exceptionade8dProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_wps9c663: any 
  setgrp_overall_wps9c663: React.Dispatch<React.SetStateAction<any>>
  grp_overall_wps9c663Props: any 
  setgrp_overall_wps9c663Props: React.Dispatch<React.SetStateAction<any>>
  tbl_process_list752ff: any 
  settbl_process_list752ff: React.Dispatch<React.SetStateAction<any>>
  tbl_process_list752ffProps: any 
  settbl_process_list752ffProps: React.Dispatch<React.SetStateAction<any>>
  tbl_pos_file_lista1c83: any 
  settbl_pos_file_lista1c83: React.Dispatch<React.SetStateAction<any>>
  tbl_pos_file_lista1c83Props: any 
  settbl_pos_file_lista1c83Props: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_list52636: any 
  setgrp_overall_tran_list52636: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_list52636Props: any 
  setgrp_overall_tran_list52636Props: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list8df93: any 
  settbl_tran_list8df93: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list8df93Props: any 
  settbl_tran_list8df93Props: React.Dispatch<React.SetStateAction<any>>
  grp_msg_daatab68d6: any 
  setgrp_msg_daatab68d6: React.Dispatch<React.SetStateAction<any>>
  grp_msg_daatab68d6Props: any 
  setgrp_msg_daatab68d6Props: React.Dispatch<React.SetStateAction<any>>
  grp_msg_data_det0b014: any 
  setgrp_msg_data_det0b014: React.Dispatch<React.SetStateAction<any>>
  grp_msg_data_det0b014Props: any 
  setgrp_msg_data_det0b014Props: React.Dispatch<React.SetStateAction<any>>
  grp_overall_jrny_listc7a13: any 
  setgrp_overall_jrny_listc7a13: React.Dispatch<React.SetStateAction<any>>
  grp_overall_jrny_listc7a13Props: any 
  setgrp_overall_jrny_listc7a13Props: React.Dispatch<React.SetStateAction<any>>
  tbl_jrny_list1e9df: any 
  settbl_jrny_list1e9df: React.Dispatch<React.SetStateAction<any>>
  tbl_jrny_list1e9dfProps: any 
  settbl_jrny_list1e9dfProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_jrny_list67aa9: any 
  setgrp_overall_tran_jrny_list67aa9: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_jrny_list67aa9Props: any 
  setgrp_overall_tran_jrny_list67aa9Props: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_jrny_list6d62f: any 
  settbl_tran_jrny_list6d62f: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_jrny_list6d62fProps: any 
  settbl_tran_jrny_list6d62fProps: React.Dispatch<React.SetStateAction<any>>
  journey_details_group764b7: any 
  setjourney_details_group764b7: React.Dispatch<React.SetStateAction<any>>
  journey_details_group764b7Props: any 
  setjourney_details_group764b7Props: React.Dispatch<React.SetStateAction<any>>
  tbl_pos_ex_view_tran8df93: any 
  settbl_pos_ex_view_tran8df93: React.Dispatch<React.SetStateAction<any>>
  tbl_pos_ex_view_tran8df93Props: any 
  settbl_pos_ex_view_tran8df93Props: React.Dispatch<React.SetStateAction<any>>
  grp_wpsb96c6: any 
  setgrp_wpsb96c6: React.Dispatch<React.SetStateAction<any>>
  grp_wpsb96c6Props: any 
  setgrp_wpsb96c6Props: React.Dispatch<React.SetStateAction<any>>
  grp_eobed127: any 
  setgrp_eobed127: React.Dispatch<React.SetStateAction<any>>
  grp_eobed127Props: any 
  setgrp_eobed127Props: React.Dispatch<React.SetStateAction<any>>
  grp_return_refundc4a03: any 
  setgrp_return_refundc4a03: React.Dispatch<React.SetStateAction<any>>
  grp_return_refundc4a03Props: any 
  setgrp_return_refundc4a03Props: React.Dispatch<React.SetStateAction<any>>
  tabgroup_return_refund4e9b7: any 
  settabgroup_return_refund4e9b7: React.Dispatch<React.SetStateAction<any>>
  tabgroup_return_refund4e9b7Props: any 
  settabgroup_return_refund4e9b7Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_return_frm_agent2d327: any 
  settab_header_return_frm_agent2d327: React.Dispatch<React.SetStateAction<any>>
  tab_header_return_frm_agent2d327Props: any 
  settab_header_return_frm_agent2d327Props: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref3e6e6: any 
  setgrp_retun_ref3e6e6: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref3e6e6Props: any 
  setgrp_retun_ref3e6e6Props: React.Dispatch<React.SetStateAction<any>>
  tbl_return_fie_list8f636: any 
  settbl_return_fie_list8f636: React.Dispatch<React.SetStateAction<any>>
  tbl_return_fie_list8f636Props: any 
  settbl_return_fie_list8f636Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_req_for_refundeadd2: any 
  settab_header_req_for_refundeadd2: React.Dispatch<React.SetStateAction<any>>
  tab_header_req_for_refundeadd2Props: any 
  settab_header_req_for_refundeadd2Props: React.Dispatch<React.SetStateAction<any>>
  grp_rr_retun_ref5362d: any 
  setgrp_rr_retun_ref5362d: React.Dispatch<React.SetStateAction<any>>
  grp_rr_retun_ref5362dProps: any 
  setgrp_rr_retun_ref5362dProps: React.Dispatch<React.SetStateAction<any>>
  tbl_rr_req_for_refunde2c9a: any 
  settbl_rr_req_for_refunde2c9a: React.Dispatch<React.SetStateAction<any>>
  tbl_rr_req_for_refunde2c9aProps: any 
  settbl_rr_req_for_refunde2c9aProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_list10bd5: any 
  setgrp_overall_tran_list10bd5: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_list10bd5Props: any 
  setgrp_overall_tran_list10bd5Props: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list858ed: any 
  settbl_tran_list858ed: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list858edProps: any 
  settbl_tran_list858edProps: React.Dispatch<React.SetStateAction<any>>
  group2e463: any 
  setgroup2e463: React.Dispatch<React.SetStateAction<any>>
  group2e463Props: any 
  setgroup2e463Props: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_listc200a: any 
  setgrp_overall_tran_listc200a: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_listc200aProps: any 
  setgrp_overall_tran_listc200aProps: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list0634a: any 
  settbl_tran_list0634a: React.Dispatch<React.SetStateAction<any>>
  tbl_tran_list0634aProps: any 
  settbl_tran_list0634aProps: React.Dispatch<React.SetStateAction<any>>
  group64e07: any 
  setgroup64e07: React.Dispatch<React.SetStateAction<any>>
  group64e07Props: any 
  setgroup64e07Props: React.Dispatch<React.SetStateAction<any>>
  grp_wpsfa727: any 
  setgrp_wpsfa727: React.Dispatch<React.SetStateAction<any>>
  grp_wpsfa727Props: any 
  setgrp_wpsfa727Props: React.Dispatch<React.SetStateAction<any>>
  grp_eob8dfac: any 
  setgrp_eob8dfac: React.Dispatch<React.SetStateAction<any>>
  grp_eob8dfacProps: any 
  setgrp_eob8dfacProps: React.Dispatch<React.SetStateAction<any>>
  grp_enquiryd2b2a: any 
  setgrp_enquiryd2b2a: React.Dispatch<React.SetStateAction<any>>
  grp_enquiryd2b2aProps: any 
  setgrp_enquiryd2b2aProps: React.Dispatch<React.SetStateAction<any>>
  tabgroup_return_refund511db: any 
  settabgroup_return_refund511db: React.Dispatch<React.SetStateAction<any>>
  tabgroup_return_refund511dbProps: any 
  settabgroup_return_refund511dbProps: React.Dispatch<React.SetStateAction<any>>
  tab_header_view_all_emp58f45: any 
  settab_header_view_all_emp58f45: React.Dispatch<React.SetStateAction<any>>
  tab_header_view_all_emp58f45Props: any 
  settab_header_view_all_emp58f45Props: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref230e2: any 
  setgrp_retun_ref230e2: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref230e2Props: any 
  setgrp_retun_ref230e2Props: React.Dispatch<React.SetStateAction<any>>
  tbl_vw_all_empr8a2a9: any 
  settbl_vw_all_empr8a2a9: React.Dispatch<React.SetStateAction<any>>
  tbl_vw_all_empr8a2a9Props: any 
  settbl_vw_all_empr8a2a9Props: React.Dispatch<React.SetStateAction<any>>
  tab_headerview_all_tranaa773: any 
  settab_headerview_all_tranaa773: React.Dispatch<React.SetStateAction<any>>
  tab_headerview_all_tranaa773Props: any 
  settab_headerview_all_tranaa773Props: React.Dispatch<React.SetStateAction<any>>
  grp_reqforref4f82e: any 
  setgrp_reqforref4f82e: React.Dispatch<React.SetStateAction<any>>
  grp_reqforref4f82eProps: any 
  setgrp_reqforref4f82eProps: React.Dispatch<React.SetStateAction<any>>
  tbl_view_all_tran1b49d: any 
  settbl_view_all_tran1b49d: React.Dispatch<React.SetStateAction<any>>
  tbl_view_all_tran1b49dProps: any 
  settbl_view_all_tran1b49dProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_listfb644: any 
  setgrp_overall_tran_listfb644: React.Dispatch<React.SetStateAction<any>>
  grp_overall_tran_listfb644Props: any 
  setgrp_overall_tran_listfb644Props: React.Dispatch<React.SetStateAction<any>>
  tbl_emplr_list3557a: any 
  settbl_emplr_list3557a: React.Dispatch<React.SetStateAction<any>>
  tbl_emplr_list3557aProps: any 
  settbl_emplr_list3557aProps: React.Dispatch<React.SetStateAction<any>>
  grp_overall_employee_list350f4: any 
  setgrp_overall_employee_list350f4: React.Dispatch<React.SetStateAction<any>>
  grp_overall_employee_list350f4Props: any 
  setgrp_overall_employee_list350f4Props: React.Dispatch<React.SetStateAction<any>>
  tbl_emp_sal_listf67ed: any 
  settbl_emp_sal_listf67ed: React.Dispatch<React.SetStateAction<any>>
  tbl_emp_sal_listf67edProps: any 
  settbl_emp_sal_listf67edProps: React.Dispatch<React.SetStateAction<any>>
  grp_emp_view_details7cca5: any 
  setgrp_emp_view_details7cca5: React.Dispatch<React.SetStateAction<any>>
  grp_emp_view_details7cca5Props: any 
  setgrp_emp_view_details7cca5Props: React.Dispatch<React.SetStateAction<any>>
  grp_emp_details5bbf3: any 
  setgrp_emp_details5bbf3: React.Dispatch<React.SetStateAction<any>>
  grp_emp_details5bbf3Props: any 
  setgrp_emp_details5bbf3Props: React.Dispatch<React.SetStateAction<any>>
  grp_other_details0dea3: any 
  setgrp_other_details0dea3: React.Dispatch<React.SetStateAction<any>>
  grp_other_details0dea3Props: any 
  setgrp_other_details0dea3Props: React.Dispatch<React.SetStateAction<any>>
  grp_overall_employee_list1c655: any 
  setgrp_overall_employee_list1c655: React.Dispatch<React.SetStateAction<any>>
  grp_overall_employee_list1c655Props: any 
  setgrp_overall_employee_list1c655Props: React.Dispatch<React.SetStateAction<any>>
  tbl_emp_list2fa62: any 
  settbl_emp_list2fa62: React.Dispatch<React.SetStateAction<any>>
  tbl_emp_list2fa62Props: any 
  settbl_emp_list2fa62Props: React.Dispatch<React.SetStateAction<any>>
  salary_file_overall_group144dd: any 
  setsalary_file_overall_group144dd: React.Dispatch<React.SetStateAction<any>>
  salary_file_overall_group144ddProps: any 
  setsalary_file_overall_group144ddProps: React.Dispatch<React.SetStateAction<any>>
  tab_group12ca0: any 
  settab_group12ca0: React.Dispatch<React.SetStateAction<any>>
  tab_group12ca0Props: any 
  settab_group12ca0Props: React.Dispatch<React.SetStateAction<any>>
  dynamicatione8e04: any 
  setdynamicatione8e04: React.Dispatch<React.SetStateAction<any>>
  dynamicatione8e04Props: any 
  setdynamicatione8e04Props: React.Dispatch<React.SetStateAction<any>>
  update_reg_employr_tab78f7d: any 
  setupdate_reg_employr_tab78f7d: React.Dispatch<React.SetStateAction<any>>
  update_reg_employr_tab78f7dProps: any 
  setupdate_reg_employr_tab78f7dProps: React.Dispatch<React.SetStateAction<any>>
  upd_reg_group25c38: any 
  setupd_reg_group25c38: React.Dispatch<React.SetStateAction<any>>
  upd_reg_group25c38Props: any 
  setupd_reg_group25c38Props: React.Dispatch<React.SetStateAction<any>>
  upd_reg_emplr_listd336e: any 
  setupd_reg_emplr_listd336e: React.Dispatch<React.SetStateAction<any>>
  upd_reg_emplr_listd336eProps: any 
  setupd_reg_emplr_listd336eProps: React.Dispatch<React.SetStateAction<any>>
  reg_empr_tabb472c: any 
  setreg_empr_tabb472c: React.Dispatch<React.SetStateAction<any>>
  reg_empr_tabb472cProps: any 
  setreg_empr_tabb472cProps: React.Dispatch<React.SetStateAction<any>>
  reg_emplr_group1073d: any 
  setreg_emplr_group1073d: React.Dispatch<React.SetStateAction<any>>
  reg_emplr_group1073dProps: any 
  setreg_emplr_group1073dProps: React.Dispatch<React.SetStateAction<any>>
  emplr_list0e076: any 
  setemplr_list0e076: React.Dispatch<React.SetStateAction<any>>
  emplr_list0e076Props: any 
  setemplr_list0e076Props: React.Dispatch<React.SetStateAction<any>>
  groupfa4d0: any 
  setgroupfa4d0: React.Dispatch<React.SetStateAction<any>>
  groupfa4d0Props: any 
  setgroupfa4d0Props: React.Dispatch<React.SetStateAction<any>>
  grp_wpsc6e49: any 
  setgrp_wpsc6e49: React.Dispatch<React.SetStateAction<any>>
  grp_wpsc6e49Props: any 
  setgrp_wpsc6e49Props: React.Dispatch<React.SetStateAction<any>>
  grp_eob07ed4: any 
  setgrp_eob07ed4: React.Dispatch<React.SetStateAction<any>>
  grp_eob07ed4Props: any 
  setgrp_eob07ed4Props: React.Dispatch<React.SetStateAction<any>>
  grp_enquiry759a6: any 
  setgrp_enquiry759a6: React.Dispatch<React.SetStateAction<any>>
  grp_enquiry759a6Props: any 
  setgrp_enquiry759a6Props: React.Dispatch<React.SetStateAction<any>>
  tabgroup_dashboard0d387: any 
  settabgroup_dashboard0d387: React.Dispatch<React.SetStateAction<any>>
  tabgroup_dashboard0d387Props: any 
  settabgroup_dashboard0d387Props: React.Dispatch<React.SetStateAction<any>>
  tab_header_view_all_failcb8d9: any 
  settab_header_view_all_failcb8d9: React.Dispatch<React.SetStateAction<any>>
  tab_header_view_all_failcb8d9Props: any 
  settab_header_view_all_failcb8d9Props: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref84e8f: any 
  setgrp_retun_ref84e8f: React.Dispatch<React.SetStateAction<any>>
  grp_retun_ref84e8fProps: any 
  setgrp_retun_ref84e8fProps: React.Dispatch<React.SetStateAction<any>>
  tbl_vw_all_failf2e05: any 
  settbl_vw_all_failf2e05: React.Dispatch<React.SetStateAction<any>>
  tbl_vw_all_failf2e05Props: any 
  settbl_vw_all_failf2e05Props: React.Dispatch<React.SetStateAction<any>>
  tab_headerview_all_successdba67: any 
  settab_headerview_all_successdba67: React.Dispatch<React.SetStateAction<any>>
  tab_headerview_all_successdba67Props: any 
  settab_headerview_all_successdba67Props: React.Dispatch<React.SetStateAction<any>>
  grp_reqforref8b4e3: any 
  setgrp_reqforref8b4e3: React.Dispatch<React.SetStateAction<any>>
  grp_reqforref8b4e3Props: any 
  setgrp_reqforref8b4e3Props: React.Dispatch<React.SetStateAction<any>>
  tbl_view_all_successbc924: any 
  settbl_view_all_successbc924: React.Dispatch<React.SetStateAction<any>>
  tbl_view_all_successbc924Props: any 
  settbl_view_all_successbc924Props: React.Dispatch<React.SetStateAction<any>>
  file_upload_groupfa783: any 
  setfile_upload_groupfa783: React.Dispatch<React.SetStateAction<any>>
  file_upload_groupfa783Props: any 
  setfile_upload_groupfa783Props: React.Dispatch<React.SetStateAction<any>>
  grp_overallsif_list46e94: any 
  setgrp_overallsif_list46e94: React.Dispatch<React.SetStateAction<any>>
  grp_overallsif_list46e94Props: any 
  setgrp_overallsif_list46e94Props: React.Dispatch<React.SetStateAction<any>>
  tbl_sif_list592fc: any 
  settbl_sif_list592fc: React.Dispatch<React.SetStateAction<any>>
  tbl_sif_list592fcProps: any 
  settbl_sif_list592fcProps: React.Dispatch<React.SetStateAction<any>>
  main_groupb2798: any 
  setmain_groupb2798: React.Dispatch<React.SetStateAction<any>>
  main_groupb2798Props: any 
  setmain_groupb2798Props: React.Dispatch<React.SetStateAction<any>>
  grp_overallsif_list6060c: any 
  setgrp_overallsif_list6060c: React.Dispatch<React.SetStateAction<any>>
  grp_overallsif_list6060cProps: any 
  setgrp_overallsif_list6060cProps: React.Dispatch<React.SetStateAction<any>>
  tbl_pif_list653ae: any 
  settbl_pif_list653ae: React.Dispatch<React.SetStateAction<any>>
  tbl_pif_list653aeProps: any 
  settbl_pif_list653aeProps: React.Dispatch<React.SetStateAction<any>>
  main_group0c058: any 
  setmain_group0c058: React.Dispatch<React.SetStateAction<any>>
  main_group0c058Props: any 
  setmain_group0c058Props: React.Dispatch<React.SetStateAction<any>>
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
  view_all_journeyd3ae9: any,
  setview_all_journeyd3ae9:React.Dispatch<React.SetStateAction<any>>
  view_all_journeyd3ae9Props: any 
  setview_all_journeyd3ae9Props: React.Dispatch<React.SetStateAction<any>>
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
  failure_queue_journeyc8638: any,
  setfailure_queue_journeyc8638:React.Dispatch<React.SetStateAction<any>>
  failure_queue_journeyc8638Props: any 
  setfailure_queue_journeyc8638Props: React.Dispatch<React.SetStateAction<any>>
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
  success_queue_journey68ac9: any,
  setsuccess_queue_journey68ac9:React.Dispatch<React.SetStateAction<any>>
  success_queue_journey68ac9Props: any 
  setsuccess_queue_journey68ac9Props: React.Dispatch<React.SetStateAction<any>>
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
  return_queue_journeycc9d3: any,
  setreturn_queue_journeycc9d3:React.Dispatch<React.SetStateAction<any>>
  return_queue_journeycc9d3Props: any 
  setreturn_queue_journeycc9d3Props: React.Dispatch<React.SetStateAction<any>>
  product_code_operational_pending6ecd4: any,
  setproduct_code_operational_pending6ecd4:React.Dispatch<React.SetStateAction<any>>
  product_code_operational_pending6ecd4Props: any 
  setproduct_code_operational_pending6ecd4Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_operational_pending2ab87: any,
  setchannel_name_operational_pending2ab87:React.Dispatch<React.SetStateAction<any>>
  channel_name_operational_pending2ab87Props: any 
  setchannel_name_operational_pending2ab87Props: React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendinga8ff6: any,
  setuuid_operational_pendinga8ff6:React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendinga8ff6Props: any 
  setuuid_operational_pendinga8ff6Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending5146b: any,
  setdr_account_operational_pending5146b:React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending5146bProps: any 
  setdr_account_operational_pending5146bProps: React.Dispatch<React.SetStateAction<any>>
  dr_amount_operational_pending70e3f: any,
  setdr_amount_operational_pending70e3f:React.Dispatch<React.SetStateAction<any>>
  dr_amount_operational_pending70e3fProps: any 
  setdr_amount_operational_pending70e3fProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_operational_pendingf9a9c: any,
  setcr_account_operational_pendingf9a9c:React.Dispatch<React.SetStateAction<any>>
  cr_account_operational_pendingf9a9cProps: any 
  setcr_account_operational_pendingf9a9cProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_operational_pendingbce21: any,
  setcr_amount_operational_pendingbce21:React.Dispatch<React.SetStateAction<any>>
  cr_amount_operational_pendingbce21Props: any 
  setcr_amount_operational_pendingbce21Props: React.Dispatch<React.SetStateAction<any>>
  remittance_info_operational_pending282bc: any,
  setremittance_info_operational_pending282bc:React.Dispatch<React.SetStateAction<any>>
  remittance_info_operational_pending282bcProps: any 
  setremittance_info_operational_pending282bcProps: React.Dispatch<React.SetStateAction<any>>
  status_operational_pending0df81: any,
  setstatus_operational_pending0df81:React.Dispatch<React.SetStateAction<any>>
  status_operational_pending0df81Props: any 
  setstatus_operational_pending0df81Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btn770f9: any,
  setnew_payment_chk_approve_btn770f9:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btn770f9Props: any 
  setnew_payment_chk_approve_btn770f9Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_reject_btn4c9a0: any,
  setnew_payment_chk_reject_btn4c9a0:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_reject_btn4c9a0Props: any 
  setnew_payment_chk_reject_btn4c9a0Props: React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey1a1a5: any,
  setoperational_pending_journey1a1a5:React.Dispatch<React.SetStateAction<any>>
  operational_pending_journey1a1a5Props: any 
  setoperational_pending_journey1a1a5Props: React.Dispatch<React.SetStateAction<any>>
  product_code_technical_pending11fe0: any,
  setproduct_code_technical_pending11fe0:React.Dispatch<React.SetStateAction<any>>
  product_code_technical_pending11fe0Props: any 
  setproduct_code_technical_pending11fe0Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_technical_pendinge182f: any,
  setchannel_name_technical_pendinge182f:React.Dispatch<React.SetStateAction<any>>
  channel_name_technical_pendinge182fProps: any 
  setchannel_name_technical_pendinge182fProps: React.Dispatch<React.SetStateAction<any>>
  uuid_technical_pendingbc6bb: any,
  setuuid_technical_pendingbc6bb:React.Dispatch<React.SetStateAction<any>>
  uuid_technical_pendingbc6bbProps: any 
  setuuid_technical_pendingbc6bbProps: React.Dispatch<React.SetStateAction<any>>
  dr_account_technical_pendingbc856: any,
  setdr_account_technical_pendingbc856:React.Dispatch<React.SetStateAction<any>>
  dr_account_technical_pendingbc856Props: any 
  setdr_account_technical_pendingbc856Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_technical_pending5e6cc: any,
  setdr_amount_technical_pending5e6cc:React.Dispatch<React.SetStateAction<any>>
  dr_amount_technical_pending5e6ccProps: any 
  setdr_amount_technical_pending5e6ccProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_technical_pending3c4aa: any,
  setcr_account_technical_pending3c4aa:React.Dispatch<React.SetStateAction<any>>
  cr_account_technical_pending3c4aaProps: any 
  setcr_account_technical_pending3c4aaProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_technical_pending1bc34: any,
  setcr_amount_technical_pending1bc34:React.Dispatch<React.SetStateAction<any>>
  cr_amount_technical_pending1bc34Props: any 
  setcr_amount_technical_pending1bc34Props: React.Dispatch<React.SetStateAction<any>>
  remittance_info_technical_pending78349: any,
  setremittance_info_technical_pending78349:React.Dispatch<React.SetStateAction<any>>
  remittance_info_technical_pending78349Props: any 
  setremittance_info_technical_pending78349Props: React.Dispatch<React.SetStateAction<any>>
  status_technical_pending738a2: any,
  setstatus_technical_pending738a2:React.Dispatch<React.SetStateAction<any>>
  status_technical_pending738a2Props: any 
  setstatus_technical_pending738a2Props: React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601c: any,
  settechnical_pending_journey6601c:React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601cProps: any 
  settechnical_pending_journey6601cProps: React.Dispatch<React.SetStateAction<any>>
  search_label27572: any,
  setsearch_label27572:React.Dispatch<React.SetStateAction<any>>
  search_label27572Props: any 
  setsearch_label27572Props: React.Dispatch<React.SetStateAction<any>>
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
  details_labelb25b2: any,
  setdetails_labelb25b2:React.Dispatch<React.SetStateAction<any>>
  details_labelb25b2Props: any 
  setdetails_labelb25b2Props: React.Dispatch<React.SetStateAction<any>>
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
  msg_data_label7b760: any,
  setmsg_data_label7b760:React.Dispatch<React.SetStateAction<any>>
  msg_data_label7b760Props: any 
  setmsg_data_label7b760Props: React.Dispatch<React.SetStateAction<any>>
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
  transaction_log_label7b760: any,
  settransaction_log_label7b760:React.Dispatch<React.SetStateAction<any>>
  transaction_log_label7b760Props: any 
  settransaction_log_label7b760Props: React.Dispatch<React.SetStateAction<any>>
  req_jsonviewer8d071: any,
  setreq_jsonviewer8d071:React.Dispatch<React.SetStateAction<any>>
  req_jsonviewer8d071Props: any 
  setreq_jsonviewer8d071Props: React.Dispatch<React.SetStateAction<any>>
  res_jsonviewerdd261: any,
  setres_jsonviewerdd261:React.Dispatch<React.SetStateAction<any>>
  res_jsonviewerdd261Props: any 
  setres_jsonviewerdd261Props: React.Dispatch<React.SetStateAction<any>>
  mol_number_textcda45: any,
  setmol_number_textcda45:React.Dispatch<React.SetStateAction<any>>
  mol_number_textcda45Props: any 
  setmol_number_textcda45Props: React.Dispatch<React.SetStateAction<any>>
  mol_comboboxe2955: any,
  setmol_comboboxe2955:React.Dispatch<React.SetStateAction<any>>
  mol_comboboxe2955Props: any 
  setmol_comboboxe2955Props: React.Dispatch<React.SetStateAction<any>>
  corporate_label34daf: any,
  setcorporate_label34daf:React.Dispatch<React.SetStateAction<any>>
  corporate_label34dafProps: any 
  setcorporate_label34dafProps: React.Dispatch<React.SetStateAction<any>>
  parent_company_header79ceb: any,
  setparent_company_header79ceb:React.Dispatch<React.SetStateAction<any>>
  parent_company_header79cebProps: any 
  setparent_company_header79cebProps: React.Dispatch<React.SetStateAction<any>>
  parent_company_text27062: any,
  setparent_company_text27062:React.Dispatch<React.SetStateAction<any>>
  parent_company_text27062Props: any 
  setparent_company_text27062Props: React.Dispatch<React.SetStateAction<any>>
  company_headerb144a: any,
  setcompany_headerb144a:React.Dispatch<React.SetStateAction<any>>
  company_headerb144aProps: any 
  setcompany_headerb144aProps: React.Dispatch<React.SetStateAction<any>>
  company_text49f48: any,
  setcompany_text49f48:React.Dispatch<React.SetStateAction<any>>
  company_text49f48Props: any 
  setcompany_text49f48Props: React.Dispatch<React.SetStateAction<any>>
  branch_header75c0b: any,
  setbranch_header75c0b:React.Dispatch<React.SetStateAction<any>>
  branch_header75c0bProps: any 
  setbranch_header75c0bProps: React.Dispatch<React.SetStateAction<any>>
  branch_text2d7af: any,
  setbranch_text2d7af:React.Dispatch<React.SetStateAction<any>>
  branch_text2d7afProps: any 
  setbranch_text2d7afProps: React.Dispatch<React.SetStateAction<any>>
  success_headera7cd1: any,
  setsuccess_headera7cd1:React.Dispatch<React.SetStateAction<any>>
  success_headera7cd1Props: any 
  setsuccess_headera7cd1Props: React.Dispatch<React.SetStateAction<any>>
  icon_success2f16c: any,
  seticon_success2f16c:React.Dispatch<React.SetStateAction<any>>
  icon_success2f16cProps: any 
  seticon_success2f16cProps: React.Dispatch<React.SetStateAction<any>>
  wps_text64263: any,
  setwps_text64263:React.Dispatch<React.SetStateAction<any>>
  wps_text64263Props: any 
  setwps_text64263Props: React.Dispatch<React.SetStateAction<any>>
  wps_value_text0da25: any,
  setwps_value_text0da25:React.Dispatch<React.SetStateAction<any>>
  wps_value_text0da25Props: any 
  setwps_value_text0da25Props: React.Dispatch<React.SetStateAction<any>>
  non_wps_textcb8a4: any,
  setnon_wps_textcb8a4:React.Dispatch<React.SetStateAction<any>>
  non_wps_textcb8a4Props: any 
  setnon_wps_textcb8a4Props: React.Dispatch<React.SetStateAction<any>>
  non_wps_value_text11cd8: any,
  setnon_wps_value_text11cd8:React.Dispatch<React.SetStateAction<any>>
  non_wps_value_text11cd8Props: any 
  setnon_wps_value_text11cd8Props: React.Dispatch<React.SetStateAction<any>>
  paid_succes_texte33d6: any,
  setpaid_succes_texte33d6:React.Dispatch<React.SetStateAction<any>>
  paid_succes_texte33d6Props: any 
  setpaid_succes_texte33d6Props: React.Dispatch<React.SetStateAction<any>>
  failure_header2ed10: any,
  setfailure_header2ed10:React.Dispatch<React.SetStateAction<any>>
  failure_header2ed10Props: any 
  setfailure_header2ed10Props: React.Dispatch<React.SetStateAction<any>>
  icon_failure5acb0: any,
  seticon_failure5acb0:React.Dispatch<React.SetStateAction<any>>
  icon_failure5acb0Props: any 
  seticon_failure5acb0Props: React.Dispatch<React.SetStateAction<any>>
  wps_failure_text00f07: any,
  setwps_failure_text00f07:React.Dispatch<React.SetStateAction<any>>
  wps_failure_text00f07Props: any 
  setwps_failure_text00f07Props: React.Dispatch<React.SetStateAction<any>>
  wps_failure_value_text26223: any,
  setwps_failure_value_text26223:React.Dispatch<React.SetStateAction<any>>
  wps_failure_value_text26223Props: any 
  setwps_failure_value_text26223Props: React.Dispatch<React.SetStateAction<any>>
  non_wps_failure_text50cef: any,
  setnon_wps_failure_text50cef:React.Dispatch<React.SetStateAction<any>>
  non_wps_failure_text50cefProps: any 
  setnon_wps_failure_text50cefProps: React.Dispatch<React.SetStateAction<any>>
  non_wps_failure_value_textb39fe: any,
  setnon_wps_failure_value_textb39fe:React.Dispatch<React.SetStateAction<any>>
  non_wps_failure_value_textb39feProps: any 
  setnon_wps_failure_value_textb39feProps: React.Dispatch<React.SetStateAction<any>>
  paid_failure_text3db75: any,
  setpaid_failure_text3db75:React.Dispatch<React.SetStateAction<any>>
  paid_failure_text3db75Props: any 
  setpaid_failure_text3db75Props: React.Dispatch<React.SetStateAction<any>>
  salary_type_textf8cc1: any,
  setsalary_type_textf8cc1:React.Dispatch<React.SetStateAction<any>>
  salary_type_textf8cc1Props: any 
  setsalary_type_textf8cc1Props: React.Dispatch<React.SetStateAction<any>>
  month_texte777a: any,
  setmonth_texte777a:React.Dispatch<React.SetStateAction<any>>
  month_texte777aProps: any 
  setmonth_texte777aProps: React.Dispatch<React.SetStateAction<any>>
  year_text0fd6b: any,
  setyear_text0fd6b:React.Dispatch<React.SetStateAction<any>>
  year_text0fd6bProps: any 
  setyear_text0fd6bProps: React.Dispatch<React.SetStateAction<any>>
  salary_type_comboboxfe6ab: any,
  setsalary_type_comboboxfe6ab:React.Dispatch<React.SetStateAction<any>>
  salary_type_comboboxfe6abProps: any 
  setsalary_type_comboboxfe6abProps: React.Dispatch<React.SetStateAction<any>>
  month_combobox36b46: any,
  setmonth_combobox36b46:React.Dispatch<React.SetStateAction<any>>
  month_combobox36b46Props: any 
  setmonth_combobox36b46Props: React.Dispatch<React.SetStateAction<any>>
  year_comboboxf59eb: any,
  setyear_comboboxf59eb:React.Dispatch<React.SetStateAction<any>>
  year_comboboxf59ebProps: any 
  setyear_comboboxf59ebProps: React.Dispatch<React.SetStateAction<any>>
  my_queue_icon1d19c: any,
  setmy_queue_icon1d19c:React.Dispatch<React.SetStateAction<any>>
  my_queue_icon1d19cProps: any 
  setmy_queue_icon1d19cProps: React.Dispatch<React.SetStateAction<any>>
  my_queue_labelae911: any,
  setmy_queue_labelae911:React.Dispatch<React.SetStateAction<any>>
  my_queue_labelae911Props: any 
  setmy_queue_labelae911Props: React.Dispatch<React.SetStateAction<any>>
  process58458: any,
  setprocess58458:React.Dispatch<React.SetStateAction<any>>
  process58458Props: any 
  setprocess58458Props: React.Dispatch<React.SetStateAction<any>>
  file_count6d7a3: any,
  setfile_count6d7a3:React.Dispatch<React.SetStateAction<any>>
  file_count6d7a3Props: any 
  setfile_count6d7a3Props: React.Dispatch<React.SetStateAction<any>>
  record_count989b2: any,
  setrecord_count989b2:React.Dispatch<React.SetStateAction<any>>
  record_count989b2Props: any 
  setrecord_count989b2Props: React.Dispatch<React.SetStateAction<any>>
  process5248d: any,
  setprocess5248d:React.Dispatch<React.SetStateAction<any>>
  process5248dProps: any 
  setprocess5248dProps: React.Dispatch<React.SetStateAction<any>>
  file_count12835: any,
  setfile_count12835:React.Dispatch<React.SetStateAction<any>>
  file_count12835Props: any 
  setfile_count12835Props: React.Dispatch<React.SetStateAction<any>>
  record_count93af3: any,
  setrecord_count93af3:React.Dispatch<React.SetStateAction<any>>
  record_count93af3Props: any 
  setrecord_count93af3Props: React.Dispatch<React.SetStateAction<any>>
  process3627b: any,
  setprocess3627b:React.Dispatch<React.SetStateAction<any>>
  process3627bProps: any 
  setprocess3627bProps: React.Dispatch<React.SetStateAction<any>>
  file_counte79a4: any,
  setfile_counte79a4:React.Dispatch<React.SetStateAction<any>>
  file_counte79a4Props: any 
  setfile_counte79a4Props: React.Dispatch<React.SetStateAction<any>>
  record_count06b83: any,
  setrecord_count06b83:React.Dispatch<React.SetStateAction<any>>
  record_count06b83Props: any 
  setrecord_count06b83Props: React.Dispatch<React.SetStateAction<any>>
  process08e53: any,
  setprocess08e53:React.Dispatch<React.SetStateAction<any>>
  process08e53Props: any 
  setprocess08e53Props: React.Dispatch<React.SetStateAction<any>>
  file_count6f5f9: any,
  setfile_count6f5f9:React.Dispatch<React.SetStateAction<any>>
  file_count6f5f9Props: any 
  setfile_count6f5f9Props: React.Dispatch<React.SetStateAction<any>>
  record_count7fa24: any,
  setrecord_count7fa24:React.Dispatch<React.SetStateAction<any>>
  record_count7fa24Props: any 
  setrecord_count7fa24Props: React.Dispatch<React.SetStateAction<any>>
  total_employees_labelbe128: any,
  settotal_employees_labelbe128:React.Dispatch<React.SetStateAction<any>>
  total_employees_labelbe128Props: any 
  settotal_employees_labelbe128Props: React.Dispatch<React.SetStateAction<any>>
  total_emp_barchartc0370: any,
  settotal_emp_barchartc0370:React.Dispatch<React.SetStateAction<any>>
  total_emp_barchartc0370Props: any 
  settotal_emp_barchartc0370Props: React.Dispatch<React.SetStateAction<any>>
  salary_processed_label39115: any,
  setsalary_processed_label39115:React.Dispatch<React.SetStateAction<any>>
  salary_processed_label39115Props: any 
  setsalary_processed_label39115Props: React.Dispatch<React.SetStateAction<any>>
  salary_barcharteedc3: any,
  setsalary_barcharteedc3:React.Dispatch<React.SetStateAction<any>>
  salary_barcharteedc3Props: any 
  setsalary_barcharteedc3Props: React.Dispatch<React.SetStateAction<any>>
  piechart155d5: any,
  setpiechart155d5:React.Dispatch<React.SetStateAction<any>>
  piechart155d5Props: any 
  setpiechart155d5Props: React.Dispatch<React.SetStateAction<any>>
  btn_nack_view_transaction0510e: any,
  setbtn_nack_view_transaction0510e:React.Dispatch<React.SetStateAction<any>>
  btn_nack_view_transaction0510eProps: any 
  setbtn_nack_view_transaction0510eProps: React.Dispatch<React.SetStateAction<any>>
  col_source_name72b56: any,
  setcol_source_name72b56:React.Dispatch<React.SetStateAction<any>>
  col_source_name72b56Props: any 
  setcol_source_name72b56Props: React.Dispatch<React.SetStateAction<any>>
  col_source_uuid1755c: any,
  setcol_source_uuid1755c:React.Dispatch<React.SetStateAction<any>>
  col_source_uuid1755cProps: any 
  setcol_source_uuid1755cProps: React.Dispatch<React.SetStateAction<any>>
  col_file_typeea095: any,
  setcol_file_typeea095:React.Dispatch<React.SetStateAction<any>>
  col_file_typeea095Props: any 
  setcol_file_typeea095Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_file5dee0: any,
  setcol_sal_file5dee0:React.Dispatch<React.SetStateAction<any>>
  col_sal_file5dee0Props: any 
  setcol_sal_file5dee0Props: React.Dispatch<React.SetStateAction<any>>
  col_processing_monthb1bbd: any,
  setcol_processing_monthb1bbd:React.Dispatch<React.SetStateAction<any>>
  col_processing_monthb1bbdProps: any 
  setcol_processing_monthb1bbdProps: React.Dispatch<React.SetStateAction<any>>
  btn_journey_summary_list7c5fe: any,
  setbtn_journey_summary_list7c5fe:React.Dispatch<React.SetStateAction<any>>
  btn_journey_summary_list7c5feProps: any 
  setbtn_journey_summary_list7c5feProps: React.Dispatch<React.SetStateAction<any>>
  col_tot_sal8529c: any,
  setcol_tot_sal8529c:React.Dispatch<React.SetStateAction<any>>
  col_tot_sal8529cProps: any 
  setcol_tot_sal8529cProps: React.Dispatch<React.SetStateAction<any>>
  col_processe61a0: any,
  setcol_processe61a0:React.Dispatch<React.SetStateAction<any>>
  col_processe61a0Props: any 
  setcol_processe61a0Props: React.Dispatch<React.SetStateAction<any>>
  col_po_file_namee2783: any,
  setcol_po_file_namee2783:React.Dispatch<React.SetStateAction<any>>
  col_po_file_namee2783Props: any 
  setcol_po_file_namee2783Props: React.Dispatch<React.SetStateAction<any>>
  col_po_tran_count2921e: any,
  setcol_po_tran_count2921e:React.Dispatch<React.SetStateAction<any>>
  col_po_tran_count2921eProps: any 
  setcol_po_tran_count2921eProps: React.Dispatch<React.SetStateAction<any>>
  btn_view_transactionb2844: any,
  setbtn_view_transactionb2844:React.Dispatch<React.SetStateAction<any>>
  btn_view_transactionb2844Props: any 
  setbtn_view_transactionb2844Props: React.Dispatch<React.SetStateAction<any>>
  col_po_empr_molc2f22: any,
  setcol_po_empr_molc2f22:React.Dispatch<React.SetStateAction<any>>
  col_po_empr_molc2f22Props: any 
  setcol_po_empr_molc2f22Props: React.Dispatch<React.SetStateAction<any>>
  col_po_fix_sal2aefb: any,
  setcol_po_fix_sal2aefb:React.Dispatch<React.SetStateAction<any>>
  col_po_fix_sal2aefbProps: any 
  setcol_po_fix_sal2aefbProps: React.Dispatch<React.SetStateAction<any>>
  col_var_amnt70cb5: any,
  setcol_var_amnt70cb5:React.Dispatch<React.SetStateAction<any>>
  col_var_amnt70cb5Props: any 
  setcol_var_amnt70cb5Props: React.Dispatch<React.SetStateAction<any>>
  col_po_tot_amnt9842a: any,
  setcol_po_tot_amnt9842a:React.Dispatch<React.SetStateAction<any>>
  col_po_tot_amnt9842aProps: any 
  setcol_po_tot_amnt9842aProps: React.Dispatch<React.SetStateAction<any>>
  col_po_charges3c1af: any,
  setcol_po_charges3c1af:React.Dispatch<React.SetStateAction<any>>
  col_po_charges3c1afProps: any 
  setcol_po_charges3c1afProps: React.Dispatch<React.SetStateAction<any>>
  btn_retryb08fa: any,
  setbtn_retryb08fa:React.Dispatch<React.SetStateAction<any>>
  btn_retryb08faProps: any 
  setbtn_retryb08faProps: React.Dispatch<React.SetStateAction<any>>
  btn_already_posted0734c: any,
  setbtn_already_posted0734c:React.Dispatch<React.SetStateAction<any>>
  btn_already_posted0734cProps: any 
  setbtn_already_posted0734cProps: React.Dispatch<React.SetStateAction<any>>
  col_process_type35ae5: any,
  setcol_process_type35ae5:React.Dispatch<React.SetStateAction<any>>
  col_process_type35ae5Props: any 
  setcol_process_type35ae5Props: React.Dispatch<React.SetStateAction<any>>
  col_file_name06356: any,
  setcol_file_name06356:React.Dispatch<React.SetStateAction<any>>
  col_file_name06356Props: any 
  setcol_file_name06356Props: React.Dispatch<React.SetStateAction<any>>
  col_tran_iddff78: any,
  setcol_tran_iddff78:React.Dispatch<React.SetStateAction<any>>
  col_tran_iddff78Props: any 
  setcol_tran_iddff78Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_file_namee8195: any,
  setcol_sal_file_namee8195:React.Dispatch<React.SetStateAction<any>>
  col_sal_file_namee8195Props: any 
  setcol_sal_file_namee8195Props: React.Dispatch<React.SetStateAction<any>>
  col_file_type43a43: any,
  setcol_file_type43a43:React.Dispatch<React.SetStateAction<any>>
  col_file_type43a43Props: any 
  setcol_file_type43a43Props: React.Dispatch<React.SetStateAction<any>>
  col_created_date8dd2c: any,
  setcol_created_date8dd2c:React.Dispatch<React.SetStateAction<any>>
  col_created_date8dd2cProps: any 
  setcol_created_date8dd2cProps: React.Dispatch<React.SetStateAction<any>>
  btn_view_data6dcf1: any,
  setbtn_view_data6dcf1:React.Dispatch<React.SetStateAction<any>>
  btn_view_data6dcf1Props: any 
  setbtn_view_data6dcf1Props: React.Dispatch<React.SetStateAction<any>>
  col_vgphe_id3cf81: any,
  setcol_vgphe_id3cf81:React.Dispatch<React.SetStateAction<any>>
  col_vgphe_id3cf81Props: any 
  setcol_vgphe_id3cf81Props: React.Dispatch<React.SetStateAction<any>>
  btn_back80553: any,
  setbtn_back80553:React.Dispatch<React.SetStateAction<any>>
  btn_back80553Props: any 
  setbtn_back80553Props: React.Dispatch<React.SetStateAction<any>>
  hdr_msg_data030c2: any,
  sethdr_msg_data030c2:React.Dispatch<React.SetStateAction<any>>
  hdr_msg_data030c2Props: any 
  sethdr_msg_data030c2Props: React.Dispatch<React.SetStateAction<any>>
  divider590d5: any,
  setdivider590d5:React.Dispatch<React.SetStateAction<any>>
  divider590d5Props: any 
  setdivider590d5Props: React.Dispatch<React.SetStateAction<any>>
  hdr_infoed594: any,
  sethdr_infoed594:React.Dispatch<React.SetStateAction<any>>
  hdr_infoed594Props: any 
  sethdr_infoed594Props: React.Dispatch<React.SetStateAction<any>>
  msg_xmlviewera94fb: any,
  setmsg_xmlviewera94fb:React.Dispatch<React.SetStateAction<any>>
  msg_xmlviewera94fbProps: any 
  setmsg_xmlviewera94fbProps: React.Dispatch<React.SetStateAction<any>>
  divider37feba: any,
  setdivider37feba:React.Dispatch<React.SetStateAction<any>>
  divider37febaProps: any 
  setdivider37febaProps: React.Dispatch<React.SetStateAction<any>>
  btn_okay0c912: any,
  setbtn_okay0c912:React.Dispatch<React.SetStateAction<any>>
  btn_okay0c912Props: any 
  setbtn_okay0c912Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_filee0c17: any,
  setcol_sal_filee0c17:React.Dispatch<React.SetStateAction<any>>
  col_sal_filee0c17Props: any 
  setcol_sal_filee0c17Props: React.Dispatch<React.SetStateAction<any>>
  col_src_namee72b4: any,
  setcol_src_namee72b4:React.Dispatch<React.SetStateAction<any>>
  col_src_namee72b4Props: any 
  setcol_src_namee72b4Props: React.Dispatch<React.SetStateAction<any>>
  col_prcs_namee094a: any,
  setcol_prcs_namee094a:React.Dispatch<React.SetStateAction<any>>
  col_prcs_namee094aProps: any 
  setcol_prcs_namee094aProps: React.Dispatch<React.SetStateAction<any>>
  col_step900de: any,
  setcol_step900de:React.Dispatch<React.SetStateAction<any>>
  col_step900deProps: any 
  setcol_step900deProps: React.Dispatch<React.SetStateAction<any>>
  col_tran_count32ab4: any,
  setcol_tran_count32ab4:React.Dispatch<React.SetStateAction<any>>
  col_tran_count32ab4Props: any 
  setcol_tran_count32ab4Props: React.Dispatch<React.SetStateAction<any>>
  btn_view_transactionda729: any,
  setbtn_view_transactionda729:React.Dispatch<React.SetStateAction<any>>
  btn_view_transactionda729Props: any 
  setbtn_view_transactionda729Props: React.Dispatch<React.SetStateAction<any>>
  col_vgphe_idf0700: any,
  setcol_vgphe_idf0700:React.Dispatch<React.SetStateAction<any>>
  col_vgphe_idf0700Props: any 
  setcol_vgphe_idf0700Props: React.Dispatch<React.SetStateAction<any>>
  btn_back183b3: any,
  setbtn_back183b3:React.Dispatch<React.SetStateAction<any>>
  btn_back183b3Props: any 
  setbtn_back183b3Props: React.Dispatch<React.SetStateAction<any>>
  btn_back886c3: any,
  setbtn_back886c3:React.Dispatch<React.SetStateAction<any>>
  btn_back886c3Props: any 
  setbtn_back886c3Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_file1c7b1: any,
  setcol_sal_file1c7b1:React.Dispatch<React.SetStateAction<any>>
  col_sal_file1c7b1Props: any 
  setcol_sal_file1c7b1Props: React.Dispatch<React.SetStateAction<any>>
  col_source_name34913: any,
  setcol_source_name34913:React.Dispatch<React.SetStateAction<any>>
  col_source_name34913Props: any 
  setcol_source_name34913Props: React.Dispatch<React.SetStateAction<any>>
  col_process_name31fa1: any,
  setcol_process_name31fa1:React.Dispatch<React.SetStateAction<any>>
  col_process_name31fa1Props: any 
  setcol_process_name31fa1Props: React.Dispatch<React.SetStateAction<any>>
  col_process3a817: any,
  setcol_process3a817:React.Dispatch<React.SetStateAction<any>>
  col_process3a817Props: any 
  setcol_process3a817Props: React.Dispatch<React.SetStateAction<any>>
  col_created_date35d64: any,
  setcol_created_date35d64:React.Dispatch<React.SetStateAction<any>>
  col_created_date35d64Props: any 
  setcol_created_date35d64Props: React.Dispatch<React.SetStateAction<any>>
  btn_view_data0ca2b: any,
  setbtn_view_data0ca2b:React.Dispatch<React.SetStateAction<any>>
  btn_view_data0ca2bProps: any 
  setbtn_view_data0ca2bProps: React.Dispatch<React.SetStateAction<any>>
  col_stepee23d: any,
  setcol_stepee23d:React.Dispatch<React.SetStateAction<any>>
  col_stepee23dProps: any 
  setcol_stepee23dProps: React.Dispatch<React.SetStateAction<any>>
  col_tran_uuidce7f9: any,
  setcol_tran_uuidce7f9:React.Dispatch<React.SetStateAction<any>>
  col_tran_uuidce7f9Props: any 
  setcol_tran_uuidce7f9Props: React.Dispatch<React.SetStateAction<any>>
  col_status4cffe: any,
  setcol_status4cffe:React.Dispatch<React.SetStateAction<any>>
  col_status4cffeProps: any 
  setcol_status4cffeProps: React.Dispatch<React.SetStateAction<any>>
  btn_view_journeydb055: any,
  setbtn_view_journeydb055:React.Dispatch<React.SetStateAction<any>>
  btn_view_journeydb055Props: any 
  setbtn_view_journeydb055Props: React.Dispatch<React.SetStateAction<any>>
  trn_jrny23739: any,
  settrn_jrny23739:React.Dispatch<React.SetStateAction<any>>
  trn_jrny23739Props: any 
  settrn_jrny23739Props: React.Dispatch<React.SetStateAction<any>>
  details_labelaa81c: any,
  setdetails_labelaa81c:React.Dispatch<React.SetStateAction<any>>
  details_labelaa81cProps: any 
  setdetails_labelaa81cProps: React.Dispatch<React.SetStateAction<any>>
  divider_topb49bf: any,
  setdivider_topb49bf:React.Dispatch<React.SetStateAction<any>>
  divider_topb49bfProps: any 
  setdivider_topb49bfProps: React.Dispatch<React.SetStateAction<any>>
  l_file_name7a6bd: any,
  setl_file_name7a6bd:React.Dispatch<React.SetStateAction<any>>
  l_file_name7a6bdProps: any 
  setl_file_name7a6bdProps: React.Dispatch<React.SetStateAction<any>>
  l_emp_mol8c2e1: any,
  setl_emp_mol8c2e1:React.Dispatch<React.SetStateAction<any>>
  l_emp_mol8c2e1Props: any 
  setl_emp_mol8c2e1Props: React.Dispatch<React.SetStateAction<any>>
  file_nameebc26: any,
  setfile_nameebc26:React.Dispatch<React.SetStateAction<any>>
  file_nameebc26Props: any 
  setfile_nameebc26Props: React.Dispatch<React.SetStateAction<any>>
  empl_mold6666: any,
  setempl_mold6666:React.Dispatch<React.SetStateAction<any>>
  empl_mold6666Props: any 
  setempl_mold6666Props: React.Dispatch<React.SetStateAction<any>>
  l_fixed_amont9c6be: any,
  setl_fixed_amont9c6be:React.Dispatch<React.SetStateAction<any>>
  l_fixed_amont9c6beProps: any 
  setl_fixed_amont9c6beProps: React.Dispatch<React.SetStateAction<any>>
  l_variable_amount98c92: any,
  setl_variable_amount98c92:React.Dispatch<React.SetStateAction<any>>
  l_variable_amount98c92Props: any 
  setl_variable_amount98c92Props: React.Dispatch<React.SetStateAction<any>>
  fixed_amot7ca4c: any,
  setfixed_amot7ca4c:React.Dispatch<React.SetStateAction<any>>
  fixed_amot7ca4cProps: any 
  setfixed_amot7ca4cProps: React.Dispatch<React.SetStateAction<any>>
  var_amontdd609: any,
  setvar_amontdd609:React.Dispatch<React.SetStateAction<any>>
  var_amontdd609Props: any 
  setvar_amontdd609Props: React.Dispatch<React.SetStateAction<any>>
  l_charge_amount53cd9: any,
  setl_charge_amount53cd9:React.Dispatch<React.SetStateAction<any>>
  l_charge_amount53cd9Props: any 
  setl_charge_amount53cd9Props: React.Dispatch<React.SetStateAction<any>>
  l_agent_routing_code9af99: any,
  setl_agent_routing_code9af99:React.Dispatch<React.SetStateAction<any>>
  l_agent_routing_code9af99Props: any 
  setl_agent_routing_code9af99Props: React.Dispatch<React.SetStateAction<any>>
  charge_amnt64cb4: any,
  setcharge_amnt64cb4:React.Dispatch<React.SetStateAction<any>>
  charge_amnt64cb4Props: any 
  setcharge_amnt64cb4Props: React.Dispatch<React.SetStateAction<any>>
  agent_routng_codee5a1e: any,
  setagent_routng_codee5a1e:React.Dispatch<React.SetStateAction<any>>
  agent_routng_codee5a1eProps: any 
  setagent_routng_codee5a1eProps: React.Dispatch<React.SetStateAction<any>>
  l_processing_system553cb: any,
  setl_processing_system553cb:React.Dispatch<React.SetStateAction<any>>
  l_processing_system553cbProps: any 
  setl_processing_system553cbProps: React.Dispatch<React.SetStateAction<any>>
  l_tran_categoryaa4a1: any,
  setl_tran_categoryaa4a1:React.Dispatch<React.SetStateAction<any>>
  l_tran_categoryaa4a1Props: any 
  setl_tran_categoryaa4a1Props: React.Dispatch<React.SetStateAction<any>>
  process_system9b66e: any,
  setprocess_system9b66e:React.Dispatch<React.SetStateAction<any>>
  process_system9b66eProps: any 
  setprocess_system9b66eProps: React.Dispatch<React.SetStateAction<any>>
  tran_catey46647: any,
  settran_catey46647:React.Dispatch<React.SetStateAction<any>>
  tran_catey46647Props: any 
  settran_catey46647Props: React.Dispatch<React.SetStateAction<any>>
  divider_bottom02761: any,
  setdivider_bottom02761:React.Dispatch<React.SetStateAction<any>>
  divider_bottom02761Props: any 
  setdivider_bottom02761Props: React.Dispatch<React.SetStateAction<any>>
  view_msg_data_btn2563b: any,
  setview_msg_data_btn2563b:React.Dispatch<React.SetStateAction<any>>
  view_msg_data_btn2563bProps: any 
  setview_msg_data_btn2563bProps: React.Dispatch<React.SetStateAction<any>>
  view_tran_log_btn00416: any,
  setview_tran_log_btn00416:React.Dispatch<React.SetStateAction<any>>
  view_tran_log_btn00416Props: any 
  setview_tran_log_btn00416Props: React.Dispatch<React.SetStateAction<any>>
  customwidget84bb0: any,
  setcustomwidget84bb0:React.Dispatch<React.SetStateAction<any>>
  customwidget84bb0Props: any 
  setcustomwidget84bb0Props: React.Dispatch<React.SetStateAction<any>>
  btn_alredy_postedf023e: any,
  setbtn_alredy_postedf023e:React.Dispatch<React.SetStateAction<any>>
  btn_alredy_postedf023eProps: any 
  setbtn_alredy_postedf023eProps: React.Dispatch<React.SetStateAction<any>>
  col_source_name06356: any,
  setcol_source_name06356:React.Dispatch<React.SetStateAction<any>>
  col_source_name06356Props: any 
  setcol_source_name06356Props: React.Dispatch<React.SetStateAction<any>>
  col_vph_ref_iddff78: any,
  setcol_vph_ref_iddff78:React.Dispatch<React.SetStateAction<any>>
  col_vph_ref_iddff78Props: any 
  setcol_vph_ref_iddff78Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_namee8195: any,
  setcol_emp_namee8195:React.Dispatch<React.SetStateAction<any>>
  col_emp_namee8195Props: any 
  setcol_emp_namee8195Props: React.Dispatch<React.SetStateAction<any>>
  col_cr_ac_no43a43: any,
  setcol_cr_ac_no43a43:React.Dispatch<React.SetStateAction<any>>
  col_cr_ac_no43a43Props: any 
  setcol_cr_ac_no43a43Props: React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt8dd2c: any,
  setcol_fixed_amnt8dd2c:React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt8dd2cProps: any 
  setcol_fixed_amnt8dd2cProps: React.Dispatch<React.SetStateAction<any>>
  btn_retry6dcf1: any,
  setbtn_retry6dcf1:React.Dispatch<React.SetStateAction<any>>
  btn_retry6dcf1Props: any 
  setbtn_retry6dcf1Props: React.Dispatch<React.SetStateAction<any>>
  col_var_amnt3cf81: any,
  setcol_var_amnt3cf81:React.Dispatch<React.SetStateAction<any>>
  col_var_amnt3cf81Props: any 
  setcol_var_amnt3cf81Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_amnt3dd6f: any,
  setcol_tot_amnt3dd6f:React.Dispatch<React.SetStateAction<any>>
  col_tot_amnt3dd6fProps: any 
  setcol_tot_amnt3dd6fProps: React.Dispatch<React.SetStateAction<any>>
  col_src_file_name0456e: any,
  setcol_src_file_name0456e:React.Dispatch<React.SetStateAction<any>>
  col_src_file_name0456eProps: any 
  setcol_src_file_name0456eProps: React.Dispatch<React.SetStateAction<any>>
  col_src_namee7c6a: any,
  setcol_src_namee7c6a:React.Dispatch<React.SetStateAction<any>>
  col_src_namee7c6aProps: any 
  setcol_src_namee7c6aProps: React.Dispatch<React.SetStateAction<any>>
  col_tran_count3ad7d: any,
  setcol_tran_count3ad7d:React.Dispatch<React.SetStateAction<any>>
  col_tran_count3ad7dProps: any 
  setcol_tran_count3ad7dProps: React.Dispatch<React.SetStateAction<any>>
  btn_rr_view_tran772a2: any,
  setbtn_rr_view_tran772a2:React.Dispatch<React.SetStateAction<any>>
  btn_rr_view_tran772a2Props: any 
  setbtn_rr_view_tran772a2Props: React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt007c9: any,
  setcol_fixed_amnt007c9:React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt007c9Props: any 
  setcol_fixed_amnt007c9Props: React.Dispatch<React.SetStateAction<any>>
  col_var_amntdff09: any,
  setcol_var_amntdff09:React.Dispatch<React.SetStateAction<any>>
  col_var_amntdff09Props: any 
  setcol_var_amntdff09Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_file_amnt9fdc3: any,
  setcol_tot_file_amnt9fdc3:React.Dispatch<React.SetStateAction<any>>
  col_tot_file_amnt9fdc3Props: any 
  setcol_tot_file_amnt9fdc3Props: React.Dispatch<React.SetStateAction<any>>
  col_created_datef8d57: any,
  setcol_created_datef8d57:React.Dispatch<React.SetStateAction<any>>
  col_created_datef8d57Props: any 
  setcol_created_datef8d57Props: React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name809f4: any,
  setcol_sf_file_name809f4:React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name809f4Props: any 
  setcol_sf_file_name809f4Props: React.Dispatch<React.SetStateAction<any>>
  col_rr_src_nameaf109: any,
  setcol_rr_src_nameaf109:React.Dispatch<React.SetStateAction<any>>
  col_rr_src_nameaf109Props: any 
  setcol_rr_src_nameaf109Props: React.Dispatch<React.SetStateAction<any>>
  col_rr_tran_count17c14: any,
  setcol_rr_tran_count17c14:React.Dispatch<React.SetStateAction<any>>
  col_rr_tran_count17c14Props: any 
  setcol_rr_tran_count17c14Props: React.Dispatch<React.SetStateAction<any>>
  btn_rrefu_view_tran3e7fb: any,
  setbtn_rrefu_view_tran3e7fb:React.Dispatch<React.SetStateAction<any>>
  btn_rrefu_view_tran3e7fbProps: any 
  setbtn_rrefu_view_tran3e7fbProps: React.Dispatch<React.SetStateAction<any>>
  col_rr_fixed_amnt55eca: any,
  setcol_rr_fixed_amnt55eca:React.Dispatch<React.SetStateAction<any>>
  col_rr_fixed_amnt55ecaProps: any 
  setcol_rr_fixed_amnt55ecaProps: React.Dispatch<React.SetStateAction<any>>
  col_rr_var_amnt9bab1: any,
  setcol_rr_var_amnt9bab1:React.Dispatch<React.SetStateAction<any>>
  col_rr_var_amnt9bab1Props: any 
  setcol_rr_var_amnt9bab1Props: React.Dispatch<React.SetStateAction<any>>
  col_rr_tot_file_amnt074c8: any,
  setcol_rr_tot_file_amnt074c8:React.Dispatch<React.SetStateAction<any>>
  col_rr_tot_file_amnt074c8Props: any 
  setcol_rr_tot_file_amnt074c8Props: React.Dispatch<React.SetStateAction<any>>
  col_rr_created_date9c266: any,
  setcol_rr_created_date9c266:React.Dispatch<React.SetStateAction<any>>
  col_rr_created_date9c266Props: any 
  setcol_rr_created_date9c266Props: React.Dispatch<React.SetStateAction<any>>
  col_rr_sf_file_named6334: any,
  setcol_rr_sf_file_named6334:React.Dispatch<React.SetStateAction<any>>
  col_rr_sf_file_named6334Props: any 
  setcol_rr_sf_file_named6334Props: React.Dispatch<React.SetStateAction<any>>
  cw_tab_initiate_authorize1fdcd: any,
  setcw_tab_initiate_authorize1fdcd:React.Dispatch<React.SetStateAction<any>>
  cw_tab_initiate_authorize1fdcdProps: any 
  setcw_tab_initiate_authorize1fdcdProps: React.Dispatch<React.SetStateAction<any>>
  col_emp_mole4029: any,
  setcol_emp_mole4029:React.Dispatch<React.SetStateAction<any>>
  col_emp_mole4029Props: any 
  setcol_emp_mole4029Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_name32c92: any,
  setcol_emp_name32c92:React.Dispatch<React.SetStateAction<any>>
  col_emp_name32c92Props: any 
  setcol_emp_name32c92Props: React.Dispatch<React.SetStateAction<any>>
  col_cr_acc_no42627: any,
  setcol_cr_acc_no42627:React.Dispatch<React.SetStateAction<any>>
  col_cr_acc_no42627Props: any 
  setcol_cr_acc_no42627Props: React.Dispatch<React.SetStateAction<any>>
  col_fixed_amntd6d44: any,
  setcol_fixed_amntd6d44:React.Dispatch<React.SetStateAction<any>>
  col_fixed_amntd6d44Props: any 
  setcol_fixed_amntd6d44Props: React.Dispatch<React.SetStateAction<any>>
  col_var_amnt53ea2: any,
  setcol_var_amnt53ea2:React.Dispatch<React.SetStateAction<any>>
  col_var_amnt53ea2Props: any 
  setcol_var_amnt53ea2Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_tran_amnta3392: any,
  setcol_tot_tran_amnta3392:React.Dispatch<React.SetStateAction<any>>
  col_tot_tran_amnta3392Props: any 
  setcol_tot_tran_amnta3392Props: React.Dispatch<React.SetStateAction<any>>
  col_created_dateea4ac: any,
  setcol_created_dateea4ac:React.Dispatch<React.SetStateAction<any>>
  col_created_dateea4acProps: any 
  setcol_created_dateea4acProps: React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name36fc1: any,
  setcol_sf_file_name36fc1:React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name36fc1Props: any 
  setcol_sf_file_name36fc1Props: React.Dispatch<React.SetStateAction<any>>
  col_rsn_codef367b: any,
  setcol_rsn_codef367b:React.Dispatch<React.SetStateAction<any>>
  col_rsn_codef367bProps: any 
  setcol_rsn_codef367bProps: React.Dispatch<React.SetStateAction<any>>
  btn_initiate71727: any,
  setbtn_initiate71727:React.Dispatch<React.SetStateAction<any>>
  btn_initiate71727Props: any 
  setbtn_initiate71727Props: React.Dispatch<React.SetStateAction<any>>
  col_uuida83f1: any,
  setcol_uuida83f1:React.Dispatch<React.SetStateAction<any>>
  col_uuida83f1Props: any 
  setcol_uuida83f1Props: React.Dispatch<React.SetStateAction<any>>
  btn_authorizefce56: any,
  setbtn_authorizefce56:React.Dispatch<React.SetStateAction<any>>
  btn_authorizefce56Props: any 
  setbtn_authorizefce56Props: React.Dispatch<React.SetStateAction<any>>
  btn_back16e28: any,
  setbtn_back16e28:React.Dispatch<React.SetStateAction<any>>
  btn_back16e28Props: any 
  setbtn_back16e28Props: React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown59fcb: any,
  setreturn_reason_dropdown59fcb:React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown59fcbProps: any 
  setreturn_reason_dropdown59fcbProps: React.Dispatch<React.SetStateAction<any>>
  close969c9: any,
  setclose969c9:React.Dispatch<React.SetStateAction<any>>
  close969c9Props: any 
  setclose969c9Props: React.Dispatch<React.SetStateAction<any>>
  save99ff4: any,
  setsave99ff4:React.Dispatch<React.SetStateAction<any>>
  save99ff4Props: any 
  setsave99ff4Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_mol35ce2: any,
  setcol_emp_mol35ce2:React.Dispatch<React.SetStateAction<any>>
  col_emp_mol35ce2Props: any 
  setcol_emp_mol35ce2Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_name53515: any,
  setcol_emp_name53515:React.Dispatch<React.SetStateAction<any>>
  col_emp_name53515Props: any 
  setcol_emp_name53515Props: React.Dispatch<React.SetStateAction<any>>
  col_cr_acc_no519d3: any,
  setcol_cr_acc_no519d3:React.Dispatch<React.SetStateAction<any>>
  col_cr_acc_no519d3Props: any 
  setcol_cr_acc_no519d3Props: React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt0743c: any,
  setcol_fixed_amnt0743c:React.Dispatch<React.SetStateAction<any>>
  col_fixed_amnt0743cProps: any 
  setcol_fixed_amnt0743cProps: React.Dispatch<React.SetStateAction<any>>
  col_var_amnt25d0d: any,
  setcol_var_amnt25d0d:React.Dispatch<React.SetStateAction<any>>
  col_var_amnt25d0dProps: any 
  setcol_var_amnt25d0dProps: React.Dispatch<React.SetStateAction<any>>
  col_tot_tran_amnt1acc3: any,
  setcol_tot_tran_amnt1acc3:React.Dispatch<React.SetStateAction<any>>
  col_tot_tran_amnt1acc3Props: any 
  setcol_tot_tran_amnt1acc3Props: React.Dispatch<React.SetStateAction<any>>
  col_created_date5679d: any,
  setcol_created_date5679d:React.Dispatch<React.SetStateAction<any>>
  col_created_date5679dProps: any 
  setcol_created_date5679dProps: React.Dispatch<React.SetStateAction<any>>
  col_sf_file_namebaf46: any,
  setcol_sf_file_namebaf46:React.Dispatch<React.SetStateAction<any>>
  col_sf_file_namebaf46Props: any 
  setcol_sf_file_namebaf46Props: React.Dispatch<React.SetStateAction<any>>
  col_rsn_codeaa610: any,
  setcol_rsn_codeaa610:React.Dispatch<React.SetStateAction<any>>
  col_rsn_codeaa610Props: any 
  setcol_rsn_codeaa610Props: React.Dispatch<React.SetStateAction<any>>
  btn_initiate6f8a7: any,
  setbtn_initiate6f8a7:React.Dispatch<React.SetStateAction<any>>
  btn_initiate6f8a7Props: any 
  setbtn_initiate6f8a7Props: React.Dispatch<React.SetStateAction<any>>
  col_uuid8350f: any,
  setcol_uuid8350f:React.Dispatch<React.SetStateAction<any>>
  col_uuid8350fProps: any 
  setcol_uuid8350fProps: React.Dispatch<React.SetStateAction<any>>
  btn_authorize7ae96: any,
  setbtn_authorize7ae96:React.Dispatch<React.SetStateAction<any>>
  btn_authorize7ae96Props: any 
  setbtn_authorize7ae96Props: React.Dispatch<React.SetStateAction<any>>
  btn_back41a76: any,
  setbtn_back41a76:React.Dispatch<React.SetStateAction<any>>
  btn_back41a76Props: any 
  setbtn_back41a76Props: React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown233e0: any,
  setreturn_reason_dropdown233e0:React.Dispatch<React.SetStateAction<any>>
  return_reason_dropdown233e0Props: any 
  setreturn_reason_dropdown233e0Props: React.Dispatch<React.SetStateAction<any>>
  closef8f97: any,
  setclosef8f97:React.Dispatch<React.SetStateAction<any>>
  closef8f97Props: any 
  setclosef8f97Props: React.Dispatch<React.SetStateAction<any>>
  save89f56: any,
  setsave89f56:React.Dispatch<React.SetStateAction<any>>
  save89f56Props: any 
  setsave89f56Props: React.Dispatch<React.SetStateAction<any>>
  col_cor_mold12cb: any,
  setcol_cor_mold12cb:React.Dispatch<React.SetStateAction<any>>
  col_cor_mold12cbProps: any 
  setcol_cor_mold12cbProps: React.Dispatch<React.SetStateAction<any>>
  col_cor_namw4bb17: any,
  setcol_cor_namw4bb17:React.Dispatch<React.SetStateAction<any>>
  col_cor_namw4bb17Props: any 
  setcol_cor_namw4bb17Props: React.Dispatch<React.SetStateAction<any>>
  btn_get_reg_emprb999a: any,
  setbtn_get_reg_emprb999a:React.Dispatch<React.SetStateAction<any>>
  btn_get_reg_emprb999aProps: any 
  setbtn_get_reg_emprb999aProps: React.Dispatch<React.SetStateAction<any>>
  col_cor_reg_idf2c18: any,
  setcol_cor_reg_idf2c18:React.Dispatch<React.SetStateAction<any>>
  col_cor_reg_idf2c18Props: any 
  setcol_cor_reg_idf2c18Props: React.Dispatch<React.SetStateAction<any>>
  col_cor_eidcba45: any,
  setcol_cor_eidcba45:React.Dispatch<React.SetStateAction<any>>
  col_cor_eidcba45Props: any 
  setcol_cor_eidcba45Props: React.Dispatch<React.SetStateAction<any>>
  col_mh_sts9087c: any,
  setcol_mh_sts9087c:React.Dispatch<React.SetStateAction<any>>
  col_mh_sts9087cProps: any 
  setcol_mh_sts9087cProps: React.Dispatch<React.SetStateAction<any>>
  btn_empr_rpt13ff7: any,
  setbtn_empr_rpt13ff7:React.Dispatch<React.SetStateAction<any>>
  btn_empr_rpt13ff7Props: any 
  setbtn_empr_rpt13ff7Props: React.Dispatch<React.SetStateAction<any>>
  btn_empr_status5b036: any,
  setbtn_empr_status5b036:React.Dispatch<React.SetStateAction<any>>
  btn_empr_status5b036Props: any 
  setbtn_empr_status5b036Props: React.Dispatch<React.SetStateAction<any>>
  btn_getemployes2c08a: any,
  setbtn_getemployes2c08a:React.Dispatch<React.SetStateAction<any>>
  btn_getemployes2c08aProps: any 
  setbtn_getemployes2c08aProps: React.Dispatch<React.SetStateAction<any>>
  col_cr_mol2640a: any,
  setcol_cr_mol2640a:React.Dispatch<React.SetStateAction<any>>
  col_cr_mol2640aProps: any 
  setcol_cr_mol2640aProps: React.Dispatch<React.SetStateAction<any>>
  col_cr_namef6d51: any,
  setcol_cr_namef6d51:React.Dispatch<React.SetStateAction<any>>
  col_cr_namef6d51Props: any 
  setcol_cr_namef6d51Props: React.Dispatch<React.SetStateAction<any>>
  col_cr_status1147a: any,
  setcol_cr_status1147a:React.Dispatch<React.SetStateAction<any>>
  col_cr_status1147aProps: any 
  setcol_cr_status1147aProps: React.Dispatch<React.SetStateAction<any>>
  col_reg_num66de9: any,
  setcol_reg_num66de9:React.Dispatch<React.SetStateAction<any>>
  col_reg_num66de9Props: any 
  setcol_reg_num66de9Props: React.Dispatch<React.SetStateAction<any>>
  col_owner_emi_id78c37: any,
  setcol_owner_emi_id78c37:React.Dispatch<React.SetStateAction<any>>
  col_owner_emi_id78c37Props: any 
  setcol_owner_emi_id78c37Props: React.Dispatch<React.SetStateAction<any>>
  col_moh_stsaec9e: any,
  setcol_moh_stsaec9e:React.Dispatch<React.SetStateAction<any>>
  col_moh_stsaec9eProps: any 
  setcol_moh_stsaec9eProps: React.Dispatch<React.SetStateAction<any>>
  btn_back_upb0902: any,
  setbtn_back_upb0902:React.Dispatch<React.SetStateAction<any>>
  btn_back_upb0902Props: any 
  setbtn_back_upb0902Props: React.Dispatch<React.SetStateAction<any>>
  col_mol_numrd6584: any,
  setcol_mol_numrd6584:React.Dispatch<React.SetStateAction<any>>
  col_mol_numrd6584Props: any 
  setcol_mol_numrd6584Props: React.Dispatch<React.SetStateAction<any>>
  col_mohre_stse37dc: any,
  setcol_mohre_stse37dc:React.Dispatch<React.SetStateAction<any>>
  col_mohre_stse37dcProps: any 
  setcol_mohre_stse37dcProps: React.Dispatch<React.SetStateAction<any>>
  col_reg_num51c35: any,
  setcol_reg_num51c35:React.Dispatch<React.SetStateAction<any>>
  col_reg_num51c35Props: any 
  setcol_reg_num51c35Props: React.Dispatch<React.SetStateAction<any>>
  col_emirates_idce519: any,
  setcol_emirates_idce519:React.Dispatch<React.SetStateAction<any>>
  col_emirates_idce519Props: any 
  setcol_emirates_idce519Props: React.Dispatch<React.SetStateAction<any>>
  col_created_date1adb1: any,
  setcol_created_date1adb1:React.Dispatch<React.SetStateAction<any>>
  col_created_date1adb1Props: any 
  setcol_created_date1adb1Props: React.Dispatch<React.SetStateAction<any>>
  btn_backdb4f7: any,
  setbtn_backdb4f7:React.Dispatch<React.SetStateAction<any>>
  btn_backdb4f7Props: any 
  setbtn_backdb4f7Props: React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excelf9ac3: any,
  setbtn_export_as_excelf9ac3:React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excelf9ac3Props: any 
  setbtn_export_as_excelf9ac3Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_eidb6da5: any,
  setcol_emp_eidb6da5:React.Dispatch<React.SetStateAction<any>>
  col_emp_eidb6da5Props: any 
  setcol_emp_eidb6da5Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_mol_list8126c: any,
  setcol_emp_mol_list8126c:React.Dispatch<React.SetStateAction<any>>
  col_emp_mol_list8126cProps: any 
  setcol_emp_mol_list8126cProps: React.Dispatch<React.SetStateAction<any>>
  col_er_reg_idec20e: any,
  setcol_er_reg_idec20e:React.Dispatch<React.SetStateAction<any>>
  col_er_reg_idec20eProps: any 
  setcol_er_reg_idec20eProps: React.Dispatch<React.SetStateAction<any>>
  col_emp_mol_numa36ef: any,
  setcol_emp_mol_numa36ef:React.Dispatch<React.SetStateAction<any>>
  col_emp_mol_numa36efProps: any 
  setcol_emp_mol_numa36efProps: React.Dispatch<React.SetStateAction<any>>
  col_sal_mnth274bd: any,
  setcol_sal_mnth274bd:React.Dispatch<React.SetStateAction<any>>
  col_sal_mnth274bdProps: any 
  setcol_sal_mnth274bdProps: React.Dispatch<React.SetStateAction<any>>
  col_chnl_codefad7d: any,
  setcol_chnl_codefad7d:React.Dispatch<React.SetStateAction<any>>
  col_chnl_codefad7dProps: any 
  setcol_chnl_codefad7dProps: React.Dispatch<React.SetStateAction<any>>
  btn_view_details6a93d: any,
  setbtn_view_details6a93d:React.Dispatch<React.SetStateAction<any>>
  btn_view_details6a93dProps: any 
  setbtn_view_details6a93dProps: React.Dispatch<React.SetStateAction<any>>
  hdr_view_detailsde0ef: any,
  sethdr_view_detailsde0ef:React.Dispatch<React.SetStateAction<any>>
  hdr_view_detailsde0efProps: any 
  sethdr_view_detailsde0efProps: React.Dispatch<React.SetStateAction<any>>
  divider85e5a: any,
  setdivider85e5a:React.Dispatch<React.SetStateAction<any>>
  divider85e5aProps: any 
  setdivider85e5aProps: React.Dispatch<React.SetStateAction<any>>
  hdr_emp_details519b3: any,
  sethdr_emp_details519b3:React.Dispatch<React.SetStateAction<any>>
  hdr_emp_details519b3Props: any 
  sethdr_emp_details519b3Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_channel_code83f4d: any,
  setlbl_s_channel_code83f4d:React.Dispatch<React.SetStateAction<any>>
  lbl_s_channel_code83f4dProps: any 
  setlbl_s_channel_code83f4dProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_leave6881d: any,
  setlbl_s_leave6881d:React.Dispatch<React.SetStateAction<any>>
  lbl_s_leave6881dProps: any 
  setlbl_s_leave6881dProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_inside_cntrybe1b2: any,
  setlbl_s_inside_cntrybe1b2:React.Dispatch<React.SetStateAction<any>>
  lbl_s_inside_cntrybe1b2Props: any 
  setlbl_s_inside_cntrybe1b2Props: React.Dispatch<React.SetStateAction<any>>
  lbl_ch_code6fd21: any,
  setlbl_ch_code6fd21:React.Dispatch<React.SetStateAction<any>>
  lbl_ch_code6fd21Props: any 
  setlbl_ch_code6fd21Props: React.Dispatch<React.SetStateAction<any>>
  lbl_leavefc2c9: any,
  setlbl_leavefc2c9:React.Dispatch<React.SetStateAction<any>>
  lbl_leavefc2c9Props: any 
  setlbl_leavefc2c9Props: React.Dispatch<React.SetStateAction<any>>
  lbl_inside_cntry8bcae: any,
  setlbl_inside_cntry8bcae:React.Dispatch<React.SetStateAction<any>>
  lbl_inside_cntry8bcaeProps: any 
  setlbl_inside_cntry8bcaeProps: React.Dispatch<React.SetStateAction<any>>
  divider1d3fd6: any,
  setdivider1d3fd6:React.Dispatch<React.SetStateAction<any>>
  divider1d3fd6Props: any 
  setdivider1d3fd6Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_sal_typeb0082: any,
  setlbl_s_sal_typeb0082:React.Dispatch<React.SetStateAction<any>>
  lbl_s_sal_typeb0082Props: any 
  setlbl_s_sal_typeb0082Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_wrk_emid0fa84: any,
  setlbl_s_wrk_emid0fa84:React.Dispatch<React.SetStateAction<any>>
  lbl_s_wrk_emid0fa84Props: any 
  setlbl_s_wrk_emid0fa84Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_pas_num2951b: any,
  setlbl_s_pas_num2951b:React.Dispatch<React.SetStateAction<any>>
  lbl_s_pas_num2951bProps: any 
  setlbl_s_pas_num2951bProps: React.Dispatch<React.SetStateAction<any>>
  lbl_sal_typee5fad: any,
  setlbl_sal_typee5fad:React.Dispatch<React.SetStateAction<any>>
  lbl_sal_typee5fadProps: any 
  setlbl_sal_typee5fadProps: React.Dispatch<React.SetStateAction<any>>
  lbl_wrk_emidd0501: any,
  setlbl_wrk_emidd0501:React.Dispatch<React.SetStateAction<any>>
  lbl_wrk_emidd0501Props: any 
  setlbl_wrk_emidd0501Props: React.Dispatch<React.SetStateAction<any>>
  lbl_pass_numbf1c1: any,
  setlbl_pass_numbf1c1:React.Dispatch<React.SetStateAction<any>>
  lbl_pass_numbf1c1Props: any 
  setlbl_pass_numbf1c1Props: React.Dispatch<React.SetStateAction<any>>
  divider3e5b62: any,
  setdivider3e5b62:React.Dispatch<React.SetStateAction<any>>
  divider3e5b62Props: any 
  setdivider3e5b62Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_cmp_code11164: any,
  setlbl_s_cmp_code11164:React.Dispatch<React.SetStateAction<any>>
  lbl_s_cmp_code11164Props: any 
  setlbl_s_cmp_code11164Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_persn_code785b1: any,
  setlbl_s_persn_code785b1:React.Dispatch<React.SetStateAction<any>>
  lbl_s_persn_code785b1Props: any 
  setlbl_s_persn_code785b1Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_agntcodee3a1d: any,
  setlbl_s_agntcodee3a1d:React.Dispatch<React.SetStateAction<any>>
  lbl_s_agntcodee3a1dProps: any 
  setlbl_s_agntcodee3a1dProps: React.Dispatch<React.SetStateAction<any>>
  lbl_cmp_cde8afa3: any,
  setlbl_cmp_cde8afa3:React.Dispatch<React.SetStateAction<any>>
  lbl_cmp_cde8afa3Props: any 
  setlbl_cmp_cde8afa3Props: React.Dispatch<React.SetStateAction<any>>
  lbl_prsn_code9fac4: any,
  setlbl_prsn_code9fac4:React.Dispatch<React.SetStateAction<any>>
  lbl_prsn_code9fac4Props: any 
  setlbl_prsn_code9fac4Props: React.Dispatch<React.SetStateAction<any>>
  lbl_angnt_cdee285a: any,
  setlbl_angnt_cdee285a:React.Dispatch<React.SetStateAction<any>>
  lbl_angnt_cdee285aProps: any 
  setlbl_angnt_cdee285aProps: React.Dispatch<React.SetStateAction<any>>
  divider223785: any,
  setdivider223785:React.Dispatch<React.SetStateAction<any>>
  divider223785Props: any 
  setdivider223785Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_wrk_iban0b21a: any,
  setlbl_s_wrk_iban0b21a:React.Dispatch<React.SetStateAction<any>>
  lbl_s_wrk_iban0b21aProps: any 
  setlbl_s_wrk_iban0b21aProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_remarks514e5: any,
  setlbl_s_remarks514e5:React.Dispatch<React.SetStateAction<any>>
  lbl_s_remarks514e5Props: any 
  setlbl_s_remarks514e5Props: React.Dispatch<React.SetStateAction<any>>
  lblwrk_ibane57ee: any,
  setlblwrk_ibane57ee:React.Dispatch<React.SetStateAction<any>>
  lblwrk_ibane57eeProps: any 
  setlblwrk_ibane57eeProps: React.Dispatch<React.SetStateAction<any>>
  lbl_rmksb105f: any,
  setlbl_rmksb105f:React.Dispatch<React.SetStateAction<any>>
  lbl_rmksb105fProps: any 
  setlbl_rmksb105fProps: React.Dispatch<React.SetStateAction<any>>
  hdr_sal_detailscc668: any,
  sethdr_sal_detailscc668:React.Dispatch<React.SetStateAction<any>>
  hdr_sal_detailscc668Props: any 
  sethdr_sal_detailscc668Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_year8a7b7: any,
  setlbl_s_year8a7b7:React.Dispatch<React.SetStateAction<any>>
  lbl_s_year8a7b7Props: any 
  setlbl_s_year8a7b7Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_prd1d712: any,
  setlbl_s_prd1d712:React.Dispatch<React.SetStateAction<any>>
  lbl_s_prd1d712Props: any 
  setlbl_s_prd1d712Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_frm_dteaf9ff: any,
  setlbl_s_frm_dteaf9ff:React.Dispatch<React.SetStateAction<any>>
  lbl_s_frm_dteaf9ffProps: any 
  setlbl_s_frm_dteaf9ffProps: React.Dispatch<React.SetStateAction<any>>
  lbl_year77e9a: any,
  setlbl_year77e9a:React.Dispatch<React.SetStateAction<any>>
  lbl_year77e9aProps: any 
  setlbl_year77e9aProps: React.Dispatch<React.SetStateAction<any>>
  lbl_prd231ed: any,
  setlbl_prd231ed:React.Dispatch<React.SetStateAction<any>>
  lbl_prd231edProps: any 
  setlbl_prd231edProps: React.Dispatch<React.SetStateAction<any>>
  lbl_from_date5c572: any,
  setlbl_from_date5c572:React.Dispatch<React.SetStateAction<any>>
  lbl_from_date5c572Props: any 
  setlbl_from_date5c572Props: React.Dispatch<React.SetStateAction<any>>
  divider41b7ce: any,
  setdivider41b7ce:React.Dispatch<React.SetStateAction<any>>
  divider41b7ceProps: any 
  setdivider41b7ceProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_dtec31c3: any,
  setlbl_s_to_dtec31c3:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_dtec31c3Props: any 
  setlbl_s_to_dtec31c3Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_sal_pymt_date3433b: any,
  setlbl_s_sal_pymt_date3433b:React.Dispatch<React.SetStateAction<any>>
  lbl_s_sal_pymt_date3433bProps: any 
  setlbl_s_sal_pymt_date3433bProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_days_paid8f15c: any,
  setlbl_s_days_paid8f15c:React.Dispatch<React.SetStateAction<any>>
  lbl_s_days_paid8f15cProps: any 
  setlbl_s_days_paid8f15cProps: React.Dispatch<React.SetStateAction<any>>
  lbl_to_date68efb: any,
  setlbl_to_date68efb:React.Dispatch<React.SetStateAction<any>>
  lbl_to_date68efbProps: any 
  setlbl_to_date68efbProps: React.Dispatch<React.SetStateAction<any>>
  lbl_file_id71627: any,
  setlbl_file_id71627:React.Dispatch<React.SetStateAction<any>>
  lbl_file_id71627Props: any 
  setlbl_file_id71627Props: React.Dispatch<React.SetStateAction<any>>
  lbl_days_paidfaad7: any,
  setlbl_days_paidfaad7:React.Dispatch<React.SetStateAction<any>>
  lbl_days_paidfaad7Props: any 
  setlbl_days_paidfaad7Props: React.Dispatch<React.SetStateAction<any>>
  divider54066d: any,
  setdivider54066d:React.Dispatch<React.SetStateAction<any>>
  divider54066dProps: any 
  setdivider54066dProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_fix_in368c0: any,
  setlbl_s_fix_in368c0:React.Dispatch<React.SetStateAction<any>>
  lbl_s_fix_in368c0Props: any 
  setlbl_s_fix_in368c0Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_in_varaf378: any,
  setlbl_s_in_varaf378:React.Dispatch<React.SetStateAction<any>>
  lbl_s_in_varaf378Props: any 
  setlbl_s_in_varaf378Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_sal357e4: any,
  setlbl_s_to_sal357e4:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_sal357e4Props: any 
  setlbl_s_to_sal357e4Props: React.Dispatch<React.SetStateAction<any>>
  lbl_fix_in1338c: any,
  setlbl_fix_in1338c:React.Dispatch<React.SetStateAction<any>>
  lbl_fix_in1338cProps: any 
  setlbl_fix_in1338cProps: React.Dispatch<React.SetStateAction<any>>
  lbl_in_varb6ce9: any,
  setlbl_in_varb6ce9:React.Dispatch<React.SetStateAction<any>>
  lbl_in_varb6ce9Props: any 
  setlbl_in_varb6ce9Props: React.Dispatch<React.SetStateAction<any>>
  lbl_to_sal3b4e8: any,
  setlbl_to_sal3b4e8:React.Dispatch<React.SetStateAction<any>>
  lbl_to_sal3b4e8Props: any 
  setlbl_to_sal3b4e8Props: React.Dispatch<React.SetStateAction<any>>
  divider6490c6: any,
  setdivider6490c6:React.Dispatch<React.SetStateAction<any>>
  divider6490c6Props: any 
  setdivider6490c6Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_beneaed7e: any,
  setlbl_s_to_beneaed7e:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_beneaed7eProps: any 
  setlbl_s_to_beneaed7eProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_deduction078ca: any,
  setlbl_s_to_deduction078ca:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_deduction078caProps: any 
  setlbl_s_to_deduction078caProps: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_allow8942c: any,
  setlbl_s_to_allow8942c:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_allow8942cProps: any 
  setlbl_s_to_allow8942cProps: React.Dispatch<React.SetStateAction<any>>
  lbl_to_bene728c0: any,
  setlbl_to_bene728c0:React.Dispatch<React.SetStateAction<any>>
  lbl_to_bene728c0Props: any 
  setlbl_to_bene728c0Props: React.Dispatch<React.SetStateAction<any>>
  lbl_to_deductionbd7f3: any,
  setlbl_to_deductionbd7f3:React.Dispatch<React.SetStateAction<any>>
  lbl_to_deductionbd7f3Props: any 
  setlbl_to_deductionbd7f3Props: React.Dispatch<React.SetStateAction<any>>
  lbl_to_allo2f67a: any,
  setlbl_to_allo2f67a:React.Dispatch<React.SetStateAction<any>>
  lbl_to_allo2f67aProps: any 
  setlbl_to_allo2f67aProps: React.Dispatch<React.SetStateAction<any>>
  divider7df1c4: any,
  setdivider7df1c4:React.Dispatch<React.SetStateAction<any>>
  divider7df1c4Props: any 
  setdivider7df1c4Props: React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_incen9e037: any,
  setlbl_s_to_incen9e037:React.Dispatch<React.SetStateAction<any>>
  lbl_s_to_incen9e037Props: any 
  setlbl_s_to_incen9e037Props: React.Dispatch<React.SetStateAction<any>>
  lbl_toince2e251: any,
  setlbl_toince2e251:React.Dispatch<React.SetStateAction<any>>
  lbl_toince2e251Props: any 
  setlbl_toince2e251Props: React.Dispatch<React.SetStateAction<any>>
  btn_back2d2f3: any,
  setbtn_back2d2f3:React.Dispatch<React.SetStateAction<any>>
  btn_back2d2f3Props: any 
  setbtn_back2d2f3Props: React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excel39d79: any,
  setbtn_export_as_excel39d79:React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excel39d79Props: any 
  setbtn_export_as_excel39d79Props: React.Dispatch<React.SetStateAction<any>>
  btn_emp_rptf4b9a: any,
  setbtn_emp_rptf4b9a:React.Dispatch<React.SetStateAction<any>>
  btn_emp_rptf4b9aProps: any 
  setbtn_emp_rptf4b9aProps: React.Dispatch<React.SetStateAction<any>>
  btn_get_empdd09a: any,
  setbtn_get_empdd09a:React.Dispatch<React.SetStateAction<any>>
  btn_get_empdd09aProps: any 
  setbtn_get_empdd09aProps: React.Dispatch<React.SetStateAction<any>>
  col_card_numberbec8c: any,
  setcol_card_numberbec8c:React.Dispatch<React.SetStateAction<any>>
  col_card_numberbec8cProps: any 
  setcol_card_numberbec8cProps: React.Dispatch<React.SetStateAction<any>>
  col_uni_numd76ee: any,
  setcol_uni_numd76ee:React.Dispatch<React.SetStateAction<any>>
  col_uni_numd76eeProps: any 
  setcol_uni_numd76eeProps: React.Dispatch<React.SetStateAction<any>>
  col_emr_idd3a1f: any,
  setcol_emr_idd3a1f:React.Dispatch<React.SetStateAction<any>>
  col_emr_idd3a1fProps: any 
  setcol_emr_idd3a1fProps: React.Dispatch<React.SetStateAction<any>>
  col_sts_dated58fa4: any,
  setcol_sts_dated58fa4:React.Dispatch<React.SetStateAction<any>>
  col_sts_dated58fa4Props: any 
  setcol_sts_dated58fa4Props: React.Dispatch<React.SetStateAction<any>>
  col_is_actived0527: any,
  setcol_is_actived0527:React.Dispatch<React.SetStateAction<any>>
  col_is_actived0527Props: any 
  setcol_is_actived0527Props: React.Dispatch<React.SetStateAction<any>>
  col_pass_nume4031: any,
  setcol_pass_nume4031:React.Dispatch<React.SetStateAction<any>>
  col_pass_nume4031Props: any 
  setcol_pass_nume4031Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_sale3e91: any,
  setcol_tot_sale3e91:React.Dispatch<React.SetStateAction<any>>
  col_tot_sale3e91Props: any 
  setcol_tot_sale3e91Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_namefa4c3: any,
  setcol_emp_namefa4c3:React.Dispatch<React.SetStateAction<any>>
  col_emp_namefa4c3Props: any 
  setcol_emp_namefa4c3Props: React.Dispatch<React.SetStateAction<any>>
  col_emp_name_ar02a3b: any,
  setcol_emp_name_ar02a3b:React.Dispatch<React.SetStateAction<any>>
  col_emp_name_ar02a3bProps: any 
  setcol_emp_name_ar02a3bProps: React.Dispatch<React.SetStateAction<any>>
  col_prsn_code83655: any,
  setcol_prsn_code83655:React.Dispatch<React.SetStateAction<any>>
  col_prsn_code83655Props: any 
  setcol_prsn_code83655Props: React.Dispatch<React.SetStateAction<any>>
  btn_salary_slipb31d5: any,
  setbtn_salary_slipb31d5:React.Dispatch<React.SetStateAction<any>>
  btn_salary_slipb31d5Props: any 
  setbtn_salary_slipb31d5Props: React.Dispatch<React.SetStateAction<any>>
  col_empr_num3d80d: any,
  setcol_empr_num3d80d:React.Dispatch<React.SetStateAction<any>>
  col_empr_num3d80dProps: any 
  setcol_empr_num3d80dProps: React.Dispatch<React.SetStateAction<any>>
  btn_toggle12af0: any,
  setbtn_toggle12af0:React.Dispatch<React.SetStateAction<any>>
  btn_toggle12af0Props: any 
  setbtn_toggle12af0Props: React.Dispatch<React.SetStateAction<any>>
  btn_reg_mohd6fce: any,
  setbtn_reg_mohd6fce:React.Dispatch<React.SetStateAction<any>>
  btn_reg_mohd6fceProps: any 
  setbtn_reg_mohd6fceProps: React.Dispatch<React.SetStateAction<any>>
  reg_emplr_search8289f: any,
  setreg_emplr_search8289f:React.Dispatch<React.SetStateAction<any>>
  reg_emplr_search8289fProps: any 
  setreg_emplr_search8289fProps: React.Dispatch<React.SetStateAction<any>>
  search_btn1b8b6: any,
  setsearch_btn1b8b6:React.Dispatch<React.SetStateAction<any>>
  search_btn1b8b6Props: any 
  setsearch_btn1b8b6Props: React.Dispatch<React.SetStateAction<any>>
  cor_mol062f8: any,
  setcor_mol062f8:React.Dispatch<React.SetStateAction<any>>
  cor_mol062f8Props: any 
  setcor_mol062f8Props: React.Dispatch<React.SetStateAction<any>>
  cor_name7e300: any,
  setcor_name7e300:React.Dispatch<React.SetStateAction<any>>
  cor_name7e300Props: any 
  setcor_name7e300Props: React.Dispatch<React.SetStateAction<any>>
  owner_eid61dd1: any,
  setowner_eid61dd1:React.Dispatch<React.SetStateAction<any>>
  owner_eid61dd1Props: any 
  setowner_eid61dd1Props: React.Dispatch<React.SetStateAction<any>>
  cor_moh_sts343b0: any,
  setcor_moh_sts343b0:React.Dispatch<React.SetStateAction<any>>
  cor_moh_sts343b0Props: any 
  setcor_moh_sts343b0Props: React.Dispatch<React.SetStateAction<any>>
  cor_stsea777: any,
  setcor_stsea777:React.Dispatch<React.SetStateAction<any>>
  cor_stsea777Props: any 
  setcor_stsea777Props: React.Dispatch<React.SetStateAction<any>>
  comp_stse8d74: any,
  setcomp_stse8d74:React.Dispatch<React.SetStateAction<any>>
  comp_stse8d74Props: any 
  setcomp_stse8d74Props: React.Dispatch<React.SetStateAction<any>>
  cor_molffa7c: any,
  setcor_molffa7c:React.Dispatch<React.SetStateAction<any>>
  cor_molffa7cProps: any 
  setcor_molffa7cProps: React.Dispatch<React.SetStateAction<any>>
  cor_name7a1f6: any,
  setcor_name7a1f6:React.Dispatch<React.SetStateAction<any>>
  cor_name7a1f6Props: any 
  setcor_name7a1f6Props: React.Dispatch<React.SetStateAction<any>>
  cor_reg_idb804b: any,
  setcor_reg_idb804b:React.Dispatch<React.SetStateAction<any>>
  cor_reg_idb804bProps: any 
  setcor_reg_idb804bProps: React.Dispatch<React.SetStateAction<any>>
  cor_eid349aa: any,
  setcor_eid349aa:React.Dispatch<React.SetStateAction<any>>
  cor_eid349aaProps: any 
  setcor_eid349aaProps: React.Dispatch<React.SetStateAction<any>>
  moh_statusda3d9: any,
  setmoh_statusda3d9:React.Dispatch<React.SetStateAction<any>>
  moh_statusda3d9Props: any 
  setmoh_statusda3d9Props: React.Dispatch<React.SetStateAction<any>>
  toggle_dropdownfb4d3: any,
  settoggle_dropdownfb4d3:React.Dispatch<React.SetStateAction<any>>
  toggle_dropdownfb4d3Props: any 
  settoggle_dropdownfb4d3Props: React.Dispatch<React.SetStateAction<any>>
  btn_cancel9df0b: any,
  setbtn_cancel9df0b:React.Dispatch<React.SetStateAction<any>>
  btn_cancel9df0bProps: any 
  setbtn_cancel9df0bProps: React.Dispatch<React.SetStateAction<any>>
  btn_confirm34d75: any,
  setbtn_confirm34d75:React.Dispatch<React.SetStateAction<any>>
  btn_confirm34d75Props: any 
  setbtn_confirm34d75Props: React.Dispatch<React.SetStateAction<any>>
  col_com_code8c08a: any,
  setcol_com_code8c08a:React.Dispatch<React.SetStateAction<any>>
  col_com_code8c08aProps: any 
  setcol_com_code8c08aProps: React.Dispatch<React.SetStateAction<any>>
  col_emir_id08252: any,
  setcol_emir_id08252:React.Dispatch<React.SetStateAction<any>>
  col_emir_id08252Props: any 
  setcol_emir_id08252Props: React.Dispatch<React.SetStateAction<any>>
  btn_retryb8593: any,
  setbtn_retryb8593:React.Dispatch<React.SetStateAction<any>>
  btn_retryb8593Props: any 
  setbtn_retryb8593Props: React.Dispatch<React.SetStateAction<any>>
  col_reg_no9e196: any,
  setcol_reg_no9e196:React.Dispatch<React.SetStateAction<any>>
  col_reg_no9e196Props: any 
  setcol_reg_no9e196Props: React.Dispatch<React.SetStateAction<any>>
  col_prcs_nameb7721: any,
  setcol_prcs_nameb7721:React.Dispatch<React.SetStateAction<any>>
  col_prcs_nameb7721Props: any 
  setcol_prcs_nameb7721Props: React.Dispatch<React.SetStateAction<any>>
  col_sts9c434: any,
  setcol_sts9c434:React.Dispatch<React.SetStateAction<any>>
  col_sts9c434Props: any 
  setcol_sts9c434Props: React.Dispatch<React.SetStateAction<any>>
  col_sif_name7de17: any,
  setcol_sif_name7de17:React.Dispatch<React.SetStateAction<any>>
  col_sif_name7de17Props: any 
  setcol_sif_name7de17Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_monthaa65c: any,
  setcol_sal_monthaa65c:React.Dispatch<React.SetStateAction<any>>
  col_sal_monthaa65cProps: any 
  setcol_sal_monthaa65cProps: React.Dispatch<React.SetStateAction<any>>
  col_created_dated290b: any,
  setcol_created_dated290b:React.Dispatch<React.SetStateAction<any>>
  col_created_dated290bProps: any 
  setcol_created_dated290bProps: React.Dispatch<React.SetStateAction<any>>
  btn_view_req_res6cb5d: any,
  setbtn_view_req_res6cb5d:React.Dispatch<React.SetStateAction<any>>
  btn_view_req_res6cb5dProps: any 
  setbtn_view_req_res6cb5dProps: React.Dispatch<React.SetStateAction<any>>
  col_com_code3b35a: any,
  setcol_com_code3b35a:React.Dispatch<React.SetStateAction<any>>
  col_com_code3b35aProps: any 
  setcol_com_code3b35aProps: React.Dispatch<React.SetStateAction<any>>
  col_emi_id8bf26: any,
  setcol_emi_id8bf26:React.Dispatch<React.SetStateAction<any>>
  col_emi_id8bf26Props: any 
  setcol_emi_id8bf26Props: React.Dispatch<React.SetStateAction<any>>
  col_reg_noe3d8f: any,
  setcol_reg_noe3d8f:React.Dispatch<React.SetStateAction<any>>
  col_reg_noe3d8fProps: any 
  setcol_reg_noe3d8fProps: React.Dispatch<React.SetStateAction<any>>
  col_prcs_named06a3: any,
  setcol_prcs_named06a3:React.Dispatch<React.SetStateAction<any>>
  col_prcs_named06a3Props: any 
  setcol_prcs_named06a3Props: React.Dispatch<React.SetStateAction<any>>
  col_sts2b329: any,
  setcol_sts2b329:React.Dispatch<React.SetStateAction<any>>
  col_sts2b329Props: any 
  setcol_sts2b329Props: React.Dispatch<React.SetStateAction<any>>
  col_created_date2f60b: any,
  setcol_created_date2f60b:React.Dispatch<React.SetStateAction<any>>
  col_created_date2f60bProps: any 
  setcol_created_date2f60bProps: React.Dispatch<React.SetStateAction<any>>
  btn_succ_req_resc54e9: any,
  setbtn_succ_req_resc54e9:React.Dispatch<React.SetStateAction<any>>
  btn_succ_req_resc54e9Props: any 
  setbtn_succ_req_resc54e9Props: React.Dispatch<React.SetStateAction<any>>
  icon12b96: any,
  seticon12b96:React.Dispatch<React.SetStateAction<any>>
  icon12b96Props: any 
  seticon12b96Props: React.Dispatch<React.SetStateAction<any>>
  success_textd0c07: any,
  setsuccess_textd0c07:React.Dispatch<React.SetStateAction<any>>
  success_textd0c07Props: any 
  setsuccess_textd0c07Props: React.Dispatch<React.SetStateAction<any>>
  file_upload_success9ee39: any,
  setfile_upload_success9ee39:React.Dispatch<React.SetStateAction<any>>
  file_upload_success9ee39Props: any 
  setfile_upload_success9ee39Props: React.Dispatch<React.SetStateAction<any>>
  dividerdb2f5: any,
  setdividerdb2f5:React.Dispatch<React.SetStateAction<any>>
  dividerdb2f5Props: any 
  setdividerdb2f5Props: React.Dispatch<React.SetStateAction<any>>
  okk_btn97301: any,
  setokk_btn97301:React.Dispatch<React.SetStateAction<any>>
  okk_btn97301Props: any 
  setokk_btn97301Props: React.Dispatch<React.SetStateAction<any>>
  text_head38a37: any,
  settext_head38a37:React.Dispatch<React.SetStateAction<any>>
  text_head38a37Props: any 
  settext_head38a37Props: React.Dispatch<React.SetStateAction<any>>
  btn_search3c2e1: any,
  setbtn_search3c2e1:React.Dispatch<React.SetStateAction<any>>
  btn_search3c2e1Props: any 
  setbtn_search3c2e1Props: React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excelb2d92: any,
  setbtn_export_as_excelb2d92:React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excelb2d92Props: any 
  setbtn_export_as_excelb2d92Props: React.Dispatch<React.SetStateAction<any>>
  col_org_file_namee9218: any,
  setcol_org_file_namee9218:React.Dispatch<React.SetStateAction<any>>
  col_org_file_namee9218Props: any 
  setcol_org_file_namee9218Props: React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name2de87: any,
  setcol_sf_file_name2de87:React.Dispatch<React.SetStateAction<any>>
  col_sf_file_name2de87Props: any 
  setcol_sf_file_name2de87Props: React.Dispatch<React.SetStateAction<any>>
  col_empr_id3b1f4: any,
  setcol_empr_id3b1f4:React.Dispatch<React.SetStateAction<any>>
  col_empr_id3b1f4Props: any 
  setcol_empr_id3b1f4Props: React.Dispatch<React.SetStateAction<any>>
  col_corp_nameecc38: any,
  setcol_corp_nameecc38:React.Dispatch<React.SetStateAction<any>>
  col_corp_nameecc38Props: any 
  setcol_corp_nameecc38Props: React.Dispatch<React.SetStateAction<any>>
  col_dr_acca3ca2: any,
  setcol_dr_acca3ca2:React.Dispatch<React.SetStateAction<any>>
  col_dr_acca3ca2Props: any 
  setcol_dr_acca3ca2Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_rcd0a298: any,
  setcol_tot_rcd0a298:React.Dispatch<React.SetStateAction<any>>
  col_tot_rcd0a298Props: any 
  setcol_tot_rcd0a298Props: React.Dispatch<React.SetStateAction<any>>
  col_sf_file_amnt7be09: any,
  setcol_sf_file_amnt7be09:React.Dispatch<React.SetStateAction<any>>
  col_sf_file_amnt7be09Props: any 
  setcol_sf_file_amnt7be09Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_mnthc23c3: any,
  setcol_sal_mnthc23c3:React.Dispatch<React.SetStateAction<any>>
  col_sal_mnthc23c3Props: any 
  setcol_sal_mnthc23c3Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_year592c0: any,
  setcol_sal_year592c0:React.Dispatch<React.SetStateAction<any>>
  col_sal_year592c0Props: any 
  setcol_sal_year592c0Props: React.Dispatch<React.SetStateAction<any>>
  top_dividerbb8b6: any,
  settop_dividerbb8b6:React.Dispatch<React.SetStateAction<any>>
  top_dividerbb8b6Props: any 
  settop_dividerbb8b6Props: React.Dispatch<React.SetStateAction<any>>
  file_namefb5d0: any,
  setfile_namefb5d0:React.Dispatch<React.SetStateAction<any>>
  file_namefb5d0Props: any 
  setfile_namefb5d0Props: React.Dispatch<React.SetStateAction<any>>
  sf_file_name06efb: any,
  setsf_file_name06efb:React.Dispatch<React.SetStateAction<any>>
  sf_file_name06efbProps: any 
  setsf_file_name06efbProps: React.Dispatch<React.SetStateAction<any>>
  estab_idbde42: any,
  setestab_idbde42:React.Dispatch<React.SetStateAction<any>>
  estab_idbde42Props: any 
  setestab_idbde42Props: React.Dispatch<React.SetStateAction<any>>
  corp_name2b998: any,
  setcorp_name2b998:React.Dispatch<React.SetStateAction<any>>
  corp_name2b998Props: any 
  setcorp_name2b998Props: React.Dispatch<React.SetStateAction<any>>
  bottom_dividerdb520: any,
  setbottom_dividerdb520:React.Dispatch<React.SetStateAction<any>>
  bottom_dividerdb520Props: any 
  setbottom_dividerdb520Props: React.Dispatch<React.SetStateAction<any>>
  searchb3ab8: any,
  setsearchb3ab8:React.Dispatch<React.SetStateAction<any>>
  searchb3ab8Props: any 
  setsearchb3ab8Props: React.Dispatch<React.SetStateAction<any>>
  clear56e07: any,
  setclear56e07:React.Dispatch<React.SetStateAction<any>>
  clear56e07Props: any 
  setclear56e07Props: React.Dispatch<React.SetStateAction<any>>
  lbl_hear96d7b: any,
  setlbl_hear96d7b:React.Dispatch<React.SetStateAction<any>>
  lbl_hear96d7bProps: any 
  setlbl_hear96d7bProps: React.Dispatch<React.SetStateAction<any>>
  btn_search8b202: any,
  setbtn_search8b202:React.Dispatch<React.SetStateAction<any>>
  btn_search8b202Props: any 
  setbtn_search8b202Props: React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excele8f9c: any,
  setbtn_export_as_excele8f9c:React.Dispatch<React.SetStateAction<any>>
  btn_export_as_excele8f9cProps: any 
  setbtn_export_as_excele8f9cProps: React.Dispatch<React.SetStateAction<any>>
  col_pif_file_namee99d8: any,
  setcol_pif_file_namee99d8:React.Dispatch<React.SetStateAction<any>>
  col_pif_file_namee99d8Props: any 
  setcol_pif_file_namee99d8Props: React.Dispatch<React.SetStateAction<any>>
  col_emplr_ida847f: any,
  setcol_emplr_ida847f:React.Dispatch<React.SetStateAction<any>>
  col_emplr_ida847fProps: any 
  setcol_emplr_ida847fProps: React.Dispatch<React.SetStateAction<any>>
  col_corp_name9e9f0: any,
  setcol_corp_name9e9f0:React.Dispatch<React.SetStateAction<any>>
  col_corp_name9e9f0Props: any 
  setcol_corp_name9e9f0Props: React.Dispatch<React.SetStateAction<any>>
  col_dr_acc2afa8: any,
  setcol_dr_acc2afa8:React.Dispatch<React.SetStateAction<any>>
  col_dr_acc2afa8Props: any 
  setcol_dr_acc2afa8Props: React.Dispatch<React.SetStateAction<any>>
  col_tot_rcd8b718: any,
  setcol_tot_rcd8b718:React.Dispatch<React.SetStateAction<any>>
  col_tot_rcd8b718Props: any 
  setcol_tot_rcd8b718Props: React.Dispatch<React.SetStateAction<any>>
  col_pf_file_amnt5e967: any,
  setcol_pf_file_amnt5e967:React.Dispatch<React.SetStateAction<any>>
  col_pf_file_amnt5e967Props: any 
  setcol_pf_file_amnt5e967Props: React.Dispatch<React.SetStateAction<any>>
  col_sal_mnthba9cc: any,
  setcol_sal_mnthba9cc:React.Dispatch<React.SetStateAction<any>>
  col_sal_mnthba9ccProps: any 
  setcol_sal_mnthba9ccProps: React.Dispatch<React.SetStateAction<any>>
  col_sal_yeara098c: any,
  setcol_sal_yeara098c:React.Dispatch<React.SetStateAction<any>>
  col_sal_yeara098cProps: any 
  setcol_sal_yeara098cProps: React.Dispatch<React.SetStateAction<any>>
  top_divider34637: any,
  settop_divider34637:React.Dispatch<React.SetStateAction<any>>
  top_divider34637Props: any 
  settop_divider34637Props: React.Dispatch<React.SetStateAction<any>>
  corp_name3791a: any,
  setcorp_name3791a:React.Dispatch<React.SetStateAction<any>>
  corp_name3791aProps: any 
  setcorp_name3791aProps: React.Dispatch<React.SetStateAction<any>>
  pf_file_name2c4bc: any,
  setpf_file_name2c4bc:React.Dispatch<React.SetStateAction<any>>
  pf_file_name2c4bcProps: any 
  setpf_file_name2c4bcProps: React.Dispatch<React.SetStateAction<any>>
  bottom_divider87331: any,
  setbottom_divider87331:React.Dispatch<React.SetStateAction<any>>
  bottom_divider87331Props: any 
  setbottom_divider87331Props: React.Dispatch<React.SetStateAction<any>>
  search2ca66: any,
  setsearch2ca66:React.Dispatch<React.SetStateAction<any>>
  search2ca66Props: any 
  setsearch2ca66Props: React.Dispatch<React.SetStateAction<any>>
  clear3234f: any,
  setclear3234f:React.Dispatch<React.SetStateAction<any>>
  clear3234fProps: any 
  setclear3234fProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  transactionproduct_v1: any 
  settransactionproduct_v1: React.Dispatch<React.SetStateAction<any>>
  transactionproduct_v1Props: any 
  settransactionproduct_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1: any 
  settransactionsearch_v1: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1Props: any 
  settransactionsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
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
  wps_v1: any 
  setwps_v1: React.Dispatch<React.SetStateAction<any>>
  wps_v1Props: any 
  setwps_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionlist_v1: any 
  settransactionlist_v1: React.Dispatch<React.SetStateAction<any>>
  transactionlist_v1Props: any 
  settransactionlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewmessagedata_v1: any 
  setviewmessagedata_v1: React.Dispatch<React.SetStateAction<any>>
  viewmessagedata_v1Props: any 
  setviewmessagedata_v1Props: React.Dispatch<React.SetStateAction<any>>
  sfjourneylist_v1: any 
  setsfjourneylist_v1: React.Dispatch<React.SetStateAction<any>>
  sfjourneylist_v1Props: any 
  setsfjourneylist_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionlistwithjourney_v1: any 
  settransactionlistwithjourney_v1: React.Dispatch<React.SetStateAction<any>>
  transactionlistwithjourney_v1Props: any 
  settransactionlistwithjourney_v1Props: React.Dispatch<React.SetStateAction<any>>
  wpstranjourneydetails_v1: any 
  setwpstranjourneydetails_v1: React.Dispatch<React.SetStateAction<any>>
  wpstranjourneydetails_v1Props: any 
  setwpstranjourneydetails_v1Props: React.Dispatch<React.SetStateAction<any>>
  postingexceptionviewtransaction_v1: any 
  setpostingexceptionviewtransaction_v1: React.Dispatch<React.SetStateAction<any>>
  postingexceptionviewtransaction_v1Props: any 
  setpostingexceptionviewtransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  returnsrefund_v1: any 
  setreturnsrefund_v1: React.Dispatch<React.SetStateAction<any>>
  returnsrefund_v1Props: any 
  setreturnsrefund_v1Props: React.Dispatch<React.SetStateAction<any>>
  returntransactionlist_v1: any 
  setreturntransactionlist_v1: React.Dispatch<React.SetStateAction<any>>
  returntransactionlist_v1Props: any 
  setreturntransactionlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  returninitiatereaonpopup_v1: any 
  setreturninitiatereaonpopup_v1: React.Dispatch<React.SetStateAction<any>>
  returninitiatereaonpopup_v1Props: any 
  setreturninitiatereaonpopup_v1Props: React.Dispatch<React.SetStateAction<any>>
  requestrefundtransactionlist_v1: any 
  setrequestrefundtransactionlist_v1: React.Dispatch<React.SetStateAction<any>>
  requestrefundtransactionlist_v1Props: any 
  setrequestrefundtransactionlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  requestinitiatereasonpopup_v1: any 
  setrequestinitiatereasonpopup_v1: React.Dispatch<React.SetStateAction<any>>
  requestinitiatereasonpopup_v1Props: any 
  setrequestinitiatereasonpopup_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_v1: any 
  setenquiry_v1: React.Dispatch<React.SetStateAction<any>>
  enquiry_v1Props: any 
  setenquiry_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquirygetregemployer_v1: any 
  setenquirygetregemployer_v1: React.Dispatch<React.SetStateAction<any>>
  enquirygetregemployer_v1Props: any 
  setenquirygetregemployer_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquiryempsalrpt_v1: any 
  setenquiryempsalrpt_v1: React.Dispatch<React.SetStateAction<any>>
  enquiryempsalrpt_v1Props: any 
  setenquiryempsalrpt_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquiryempviewdetails_v1: any 
  setenquiryempviewdetails_v1: React.Dispatch<React.SetStateAction<any>>
  enquiryempviewdetails_v1Props: any 
  setenquiryempviewdetails_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquirygetemployees_v1: any 
  setenquirygetemployees_v1: React.Dispatch<React.SetStateAction<any>>
  enquirygetemployees_v1Props: any 
  setenquirygetemployees_v1Props: React.Dispatch<React.SetStateAction<any>>
  registration_v1: any 
  setregistration_v1: React.Dispatch<React.SetStateAction<any>>
  registration_v1Props: any 
  setregistration_v1Props: React.Dispatch<React.SetStateAction<any>>
  togglepopup_v1: any 
  settogglepopup_v1: React.Dispatch<React.SetStateAction<any>>
  togglepopup_v1Props: any 
  settogglepopup_v1Props: React.Dispatch<React.SetStateAction<any>>
  dashboard_v1: any 
  setdashboard_v1: React.Dispatch<React.SetStateAction<any>>
  dashboard_v1Props: any 
  setdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  infomsgpopup_v1: any 
  setinfomsgpopup_v1: React.Dispatch<React.SetStateAction<any>>
  infomsgpopup_v1Props: any 
  setinfomsgpopup_v1Props: React.Dispatch<React.SetStateAction<any>>
  sifsummaryreport_v1: any 
  setsifsummaryreport_v1: React.Dispatch<React.SetStateAction<any>>
  sifsummaryreport_v1Props: any 
  setsifsummaryreport_v1Props: React.Dispatch<React.SetStateAction<any>>
  sifreportsearch_v1: any 
  setsifreportsearch_v1: React.Dispatch<React.SetStateAction<any>>
  sifreportsearch_v1Props: any 
  setsifreportsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  pifsummaryreport_v1: any 
  setpifsummaryreport_v1: React.Dispatch<React.SetStateAction<any>>
  pifsummaryreport_v1Props: any 
  setpifsummaryreport_v1Props: React.Dispatch<React.SetStateAction<any>>
  pifreportsearch_v1: any 
  setpifreportsearch_v1: React.Dispatch<React.SetStateAction<any>>
  pifreportsearch_v1Props: any 
  setpifreportsearch_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_combocurrencysearch_v1Props: any 
  setdfd_combocurrencysearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transaction_v1Props: any 
  setdfd_transaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_journey_v1Props: any 
  setdfd_journey_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_tranjourney_v1Props: any 
  setdfd_tranjourney_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_employeelist_v1Props: any 
  setdfd_employeelist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsnackfailuretransactionlist_v1Props: any 
  setdfd_wpsnackfailuretransactionlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_sfjourneyviewtransaction_v1Props: any 
  setdfd_sfjourneyviewtransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_sfjourneylistwithcount_v1Props: any 
  setdfd_sfjourneylistwithcount_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props: any 
  setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsnackfailurefilelist_v1Props: any 
  setdfd_wpsnackfailurefilelist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsfilejourney_v1Props: any 
  setdfd_wpsfilejourney_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_postingexpectionfilelist_v1Props: any 
  setdfd_postingexpectionfilelist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_postingexceptionprocesslist_v1Props: any 
  setdfd_postingexceptionprocesslist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardcompanystructurecombo_v1Props: any 
  setdfd_wpsdashboardcompanystructurecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmolnumbercombo_v1Props: any 
  setdfd_wpsdashboardmolnumbercombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardsuccesstab_v1Props: any 
  setdfd_wpsdashboardsuccesstab_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardfailuretab_v1Props: any 
  setdfd_wpsdashboardfailuretab_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardsalarytypecombo_v1Props: any 
  setdfd_wpsdashboardsalarytypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardemployeesbarchart_v1Props: any 
  setdfd_wpsdashboardemployeesbarchart_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardsalaryprocessbarchart_v1Props: any 
  setdfd_wpsdashboardsalaryprocessbarchart_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmyqueueall_v1Props: any 
  setdfd_wpsdashboardmyqueueall_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmonthcombo_v1Props: any 
  setdfd_wpsdashboardmonthcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardyearcombo_v1Props: any 
  setdfd_wpsdashboardyearcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardsuccesstabnonwps_v1Props: any 
  setdfd_wpsdashboardsuccesstabnonwps_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardfailurenonwpstab_v1Props: any 
  setdfd_wpsdashboardfailurenonwpstab_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmyqueueactionrequired_v1Props: any 
  setdfd_wpsdashboardmyqueueactionrequired_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props: any 
  setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_wpsdashboardmyqueueexceptions_v1Props: any 
  setdfd_wpsdashboardmyqueueexceptions_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_returnreason_v1Props: any 
  setdfd_returnreason_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_returnagentfromtransactionlist_v1Props: any 
  setdfd_returnagentfromtransactionlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_requestreason_v1Props: any 
  setdfd_requestreason_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_returnfromagentfilelist_v1Props: any 
  setdfd_returnfromagentfilelist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_requestforrefundfilelist_v1Props: any 
  setdfd_requestforrefundfilelist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquirygetregemployeremployerlist_v1Props: any 
  setdfd_enquirygetregemployeremployerlist_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquiryemployersalaryrpt_v1Props: any 
  setdfd_enquiryemployersalaryrpt_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquirygetemployee_v1Props: any 
  setdfd_enquirygetemployee_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquiryviewallemployers_v1Props: any 
  setdfd_enquiryviewallemployers_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_updateregemployer_v1Props: any 
  setdfd_updateregemployer_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_regemployer_v1Props: any 
  setdfd_regemployer_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_dashboardviewallsuccess_v1Props: any 
  setdfd_dashboardviewallsuccess_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_dashboardviewallfailure_v1Props: any 
  setdfd_dashboardviewallfailure_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_sifsummaryreport_v1Props: any 
  setdfd_sifsummaryreport_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_pifsummaryreport_v1Props: any 
  setdfd_pifsummaryreport_v1Props: React.Dispatch<React.SetStateAction<any>>

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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search_label",
            "top_divider",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "payment_currency",
            "payment_currency",
            "dr_amount",
            "uuid",
            "status",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        const [journey_details_groupd9a0e, setjourney_details_groupd9a0e ] = React.useState<any>({}) 
    const [journey_details_groupd9a0eProps, setjourney_details_groupd9a0eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "details_label",
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
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "transaction_log_label",
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "response_data",
      ]
      }) 
        const [grp_wps7d0b0, setgrp_wps7d0b0 ] = React.useState<any>({}) 
    const [grp_wps7d0b0Props, setgrp_wps7d0b0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_eobedcde, setgrp_eobedcde ] = React.useState<any>({}) 
    const [grp_eobedcdeProps, setgrp_eobedcdeProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_wps_nack_failurecdb58, setgrp_wps_nack_failurecdb58 ] = React.useState<any>({}) 
    const [grp_wps_nack_failurecdb58Props, setgrp_wps_nack_failurecdb58Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tabgroup_post_excep0d361, settabgroup_post_excep0d361 ] = React.useState<any>({}) 
    const [tabgroup_post_excep0d361Props, settabgroup_post_excep0d361Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [dashboard_tab_headercb15a, setdashboard_tab_headercb15a ] = React.useState<any>({}) 
    const [dashboard_tab_headercb15aProps, setdashboard_tab_headercb15aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [dash_tab_grp477aa, setdash_tab_grp477aa ] = React.useState<any>({}) 
    const [dash_tab_grp477aaProps, setdash_tab_grp477aaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "salary_type_text",
            "month_text",
            "year_text",
            "salary_type_combobox",
            "salary_type_combobox",
            "month_combobox",
            "month_combobox",
            "year_combobox",
            "year_combobox",
      ]
      }) 
        const [corporate_group92e02, setcorporate_group92e02 ] = React.useState<any>({}) 
    const [corporate_group92e02Props, setcorporate_group92e02Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "mol_number_text",
            "mol_combobox",
            "mol_combobox",
            "corporate_label",
            "parent_company_header",
            "parent_company",
            "company_header",
            "company",
            "branch_header",
            "branch",
      ]
      }) 
        const [success_groupf3393, setsuccess_groupf3393 ] = React.useState<any>({}) 
    const [success_groupf3393Props, setsuccess_groupf3393Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "success_header",
            "icon_success",
            "wps_text",
            "total_tran_count",
            "non_wps_text",
            "total_count",
            "paid_succes_text",
      ]
      }) 
        const [failure_group60ccc, setfailure_group60ccc ] = React.useState<any>({}) 
    const [failure_group60cccProps, setfailure_group60cccProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "failure_header",
            "icon_failure",
            "wps_failure_text",
            "total_tran_count",
            "non_wps_failure_text",
            "total_count",
            "paid_failure_text",
      ]
      }) 
        const [my_queue_group17a74, setmy_queue_group17a74 ] = React.useState<any>({}) 
    const [my_queue_group17a74Props, setmy_queue_group17a74Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "my_queue_icon",
            "my_queue_label",
      ]
      }) 
        const [tab_overalla72da, settab_overalla72da ] = React.useState<any>({}) 
    const [tab_overalla72daProps, settab_overalla72daProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tab_all14848, settab_all14848 ] = React.useState<any>({}) 
    const [tab_all14848Props, settab_all14848Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [all_groupdc06f, setall_groupdc06f ] = React.useState<any>({}) 
    const [all_groupdc06fProps, setall_groupdc06fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [all_table9a484, setall_table9a484 ] = React.useState<any>([]) 
    const [all_table9a484Props, setall_table9a484Props ] = React.useState<any>({
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
        const [action_required_tab3b174, setaction_required_tab3b174 ] = React.useState<any>({}) 
    const [action_required_tab3b174Props, setaction_required_tab3b174Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [action_required_groupc490c, setaction_required_groupc490c ] = React.useState<any>({}) 
    const [action_required_groupc490cProps, setaction_required_groupc490cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [action_required_table0359e, setaction_required_table0359e ] = React.useState<any>([]) 
    const [action_required_table0359eProps, setaction_required_table0359eProps ] = React.useState<any>({
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
        const [salary_return_refund_tabeaf18, setsalary_return_refund_tabeaf18 ] = React.useState<any>({}) 
    const [salary_return_refund_tabeaf18Props, setsalary_return_refund_tabeaf18Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [salary_return_refund_group9c3f2, setsalary_return_refund_group9c3f2 ] = React.useState<any>({}) 
    const [salary_return_refund_group9c3f2Props, setsalary_return_refund_group9c3f2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [salary_return_refund_tablee81e8, setsalary_return_refund_tablee81e8 ] = React.useState<any>([]) 
    const [salary_return_refund_tablee81e8Props, setsalary_return_refund_tablee81e8Props ] = React.useState<any>({
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
        const [exception_tab1addc, setexception_tab1addc ] = React.useState<any>({}) 
    const [exception_tab1addcProps, setexception_tab1addcProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [exception_group8bd2f, setexception_group8bd2f ] = React.useState<any>({}) 
    const [exception_group8bd2fProps, setexception_group8bd2fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [exception_table77afe, setexception_table77afe ] = React.useState<any>([]) 
    const [exception_table77afeProps, setexception_table77afeProps ] = React.useState<any>({
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
        const [total_emp_group824bb, settotal_emp_group824bb ] = React.useState<any>({}) 
    const [total_emp_group824bbProps, settotal_emp_group824bbProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_employees_label",
            "name",
      ]
      }) 
        const [salary_process_groupe9737, setsalary_process_groupe9737 ] = React.useState<any>({}) 
    const [salary_process_groupe9737Props, setsalary_process_groupe9737Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "salary_processed_label",
            "total_salary",
      ]
      }) 
        const [pie_chart_group31af3, setpie_chart_group31af3 ] = React.useState<any>({}) 
    const [pie_chart_group31af3Props, setpie_chart_group31af3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "piechart",
      ]
      }) 
        const [tab_header_wps_nack_failuref61a4, settab_header_wps_nack_failuref61a4 ] = React.useState<any>({}) 
    const [tab_header_wps_nack_failuref61a4Props, settab_header_wps_nack_failuref61a4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_employee_verify730a2, setgrp_employee_verify730a2 ] = React.useState<any>({}) 
    const [grp_employee_verify730a2Props, setgrp_employee_verify730a2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [table_file_list44ec7, settable_file_list44ec7 ] = React.useState<any>([]) 
    const [table_file_list44ec7Props, settable_file_list44ec7Props ] = React.useState<any>({
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
        const [tab_header_wps_file_journey9bceb, settab_header_wps_file_journey9bceb ] = React.useState<any>({}) 
    const [tab_header_wps_file_journey9bcebProps, settab_header_wps_file_journey9bcebProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_overall_repair8807c, setgrp_overall_repair8807c ] = React.useState<any>({}) 
    const [grp_overall_repair8807cProps, setgrp_overall_repair8807cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_wps_file_journryabf3b, settbl_wps_file_journryabf3b ] = React.useState<any>([]) 
    const [tbl_wps_file_journryabf3bProps, settbl_wps_file_journryabf3bProps ] = React.useState<any>({
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
        const [tab_header_posting_exceptionade8d, settab_header_posting_exceptionade8d ] = React.useState<any>({}) 
    const [tab_header_posting_exceptionade8dProps, settab_header_posting_exceptionade8dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_overall_wps9c663, setgrp_overall_wps9c663 ] = React.useState<any>({}) 
    const [grp_overall_wps9c663Props, setgrp_overall_wps9c663Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_process_list752ff, settbl_process_list752ff ] = React.useState<any>([]) 
    const [tbl_process_list752ffProps, settbl_process_list752ffProps ] = React.useState<any>({
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
    
    const [tbl_pos_file_lista1c83, settbl_pos_file_lista1c83 ] = React.useState<any>([]) 
    const [tbl_pos_file_lista1c83Props, settbl_pos_file_lista1c83Props ] = React.useState<any>({
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
        const [grp_overall_tran_list52636, setgrp_overall_tran_list52636 ] = React.useState<any>({}) 
    const [grp_overall_tran_list52636Props, setgrp_overall_tran_list52636Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_tran_list8df93, settbl_tran_list8df93 ] = React.useState<any>([]) 
    const [tbl_tran_list8df93Props, settbl_tran_list8df93Props ] = React.useState<any>({
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
        const [grp_msg_daatab68d6, setgrp_msg_daatab68d6 ] = React.useState<any>({}) 
    const [grp_msg_daatab68d6Props, setgrp_msg_daatab68d6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_msg_data",
            "divider",
      ]
      }) 
        const [grp_msg_data_det0b014, setgrp_msg_data_det0b014 ] = React.useState<any>({}) 
    const [grp_msg_data_det0b014Props, setgrp_msg_data_det0b014Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_info",
            "msg_xmlviewer",
            "divider3",
            "btn_okay",
      ]
      }) 
        const [grp_overall_jrny_listc7a13, setgrp_overall_jrny_listc7a13 ] = React.useState<any>({}) 
    const [grp_overall_jrny_listc7a13Props, setgrp_overall_jrny_listc7a13Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_jrny_list1e9df, settbl_jrny_list1e9df ] = React.useState<any>([]) 
    const [tbl_jrny_list1e9dfProps, settbl_jrny_list1e9dfProps ] = React.useState<any>({
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
        const [grp_overall_tran_jrny_list67aa9, setgrp_overall_tran_jrny_list67aa9 ] = React.useState<any>({}) 
    const [grp_overall_tran_jrny_list67aa9Props, setgrp_overall_tran_jrny_list67aa9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "uuid",
      ]
      }) 
    
    const [tbl_tran_jrny_list6d62f, settbl_tran_jrny_list6d62f ] = React.useState<any>([]) 
    const [tbl_tran_jrny_list6d62fProps, settbl_tran_jrny_list6d62fProps ] = React.useState<any>({
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
        const [journey_details_group764b7, setjourney_details_group764b7 ] = React.useState<any>({}) 
    const [journey_details_group764b7Props, setjourney_details_group764b7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "details_label",
            "divider_top",
            "l_file_name",
            "l_emp_mol",
            "sf_filename",
            "employee_mol",
            "l_fixed_amont",
            "l_variable_amount",
            "fixed_amount",
            "variable_amount",
            "l_charge_amount",
            "l_agent_routing_code",
            "charge_amount",
            "agent_routing_code",
            "l_processing_system",
            "l_tran_category",
            "procesing_system",
            "tran_category",
            "divider_bottom",
            "view_msg_data_btn",
            "view_tran_log_btn",
            "customwidget",
      ]
      }) 
    
    const [tbl_pos_ex_view_tran8df93, settbl_pos_ex_view_tran8df93 ] = React.useState<any>([]) 
    const [tbl_pos_ex_view_tran8df93Props, settbl_pos_ex_view_tran8df93Props ] = React.useState<any>({
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
        const [grp_wpsb96c6, setgrp_wpsb96c6 ] = React.useState<any>({}) 
    const [grp_wpsb96c6Props, setgrp_wpsb96c6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cw_tab_initiate_authorize",
      ]
      }) 
        const [grp_eobed127, setgrp_eobed127 ] = React.useState<any>({}) 
    const [grp_eobed127Props, setgrp_eobed127Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_return_refundc4a03, setgrp_return_refundc4a03 ] = React.useState<any>({}) 
    const [grp_return_refundc4a03Props, setgrp_return_refundc4a03Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7 ] = React.useState<any>({}) 
    const [tabgroup_return_refund4e9b7Props, settabgroup_return_refund4e9b7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tab_header_return_frm_agent2d327, settab_header_return_frm_agent2d327 ] = React.useState<any>({}) 
    const [tab_header_return_frm_agent2d327Props, settab_header_return_frm_agent2d327Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_retun_ref3e6e6, setgrp_retun_ref3e6e6 ] = React.useState<any>({}) 
    const [grp_retun_ref3e6e6Props, setgrp_retun_ref3e6e6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_return_fie_list8f636, settbl_return_fie_list8f636 ] = React.useState<any>([]) 
    const [tbl_return_fie_list8f636Props, settbl_return_fie_list8f636Props ] = React.useState<any>({
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
        const [tab_header_req_for_refundeadd2, settab_header_req_for_refundeadd2 ] = React.useState<any>({}) 
    const [tab_header_req_for_refundeadd2Props, settab_header_req_for_refundeadd2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d ] = React.useState<any>({}) 
    const [grp_rr_retun_ref5362dProps, setgrp_rr_retun_ref5362dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a ] = React.useState<any>([]) 
    const [tbl_rr_req_for_refunde2c9aProps, settbl_rr_req_for_refunde2c9aProps ] = React.useState<any>({
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
        const [grp_overall_tran_list10bd5, setgrp_overall_tran_list10bd5 ] = React.useState<any>({}) 
    const [grp_overall_tran_list10bd5Props, setgrp_overall_tran_list10bd5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_tran_list858ed, settbl_tran_list858ed ] = React.useState<any>([]) 
    const [tbl_tran_list858edProps, settbl_tran_list858edProps ] = React.useState<any>({
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
        const [group2e463, setgroup2e463 ] = React.useState<any>({}) 
    const [group2e463Props, setgroup2e463Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        const [grp_overall_tran_listc200a, setgrp_overall_tran_listc200a ] = React.useState<any>({}) 
    const [grp_overall_tran_listc200aProps, setgrp_overall_tran_listc200aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_tran_list0634a, settbl_tran_list0634a ] = React.useState<any>([]) 
    const [tbl_tran_list0634aProps, settbl_tran_list0634aProps ] = React.useState<any>({
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
        const [group64e07, setgroup64e07 ] = React.useState<any>({}) 
    const [group64e07Props, setgroup64e07Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        const [grp_wpsfa727, setgrp_wpsfa727 ] = React.useState<any>({}) 
    const [grp_wpsfa727Props, setgrp_wpsfa727Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_eob8dfac, setgrp_eob8dfac ] = React.useState<any>({}) 
    const [grp_eob8dfacProps, setgrp_eob8dfacProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_enquiryd2b2a, setgrp_enquiryd2b2a ] = React.useState<any>({}) 
    const [grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tabgroup_return_refund511db, settabgroup_return_refund511db ] = React.useState<any>({}) 
    const [tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tab_header_view_all_emp58f45, settab_header_view_all_emp58f45 ] = React.useState<any>({}) 
    const [tab_header_view_all_emp58f45Props, settab_header_view_all_emp58f45Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_retun_ref230e2, setgrp_retun_ref230e2 ] = React.useState<any>({}) 
    const [grp_retun_ref230e2Props, setgrp_retun_ref230e2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9 ] = React.useState<any>([]) 
    const [tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props ] = React.useState<any>({
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
        const [tab_headerview_all_tranaa773, settab_headerview_all_tranaa773 ] = React.useState<any>({}) 
    const [tab_headerview_all_tranaa773Props, settab_headerview_all_tranaa773Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_reqforref4f82e, setgrp_reqforref4f82e ] = React.useState<any>({}) 
    const [grp_reqforref4f82eProps, setgrp_reqforref4f82eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_view_all_tran1b49d, settbl_view_all_tran1b49d ] = React.useState<any>([]) 
    const [tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps ] = React.useState<any>({
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
        const [grp_overall_tran_listfb644, setgrp_overall_tran_listfb644 ] = React.useState<any>({}) 
    const [grp_overall_tran_listfb644Props, setgrp_overall_tran_listfb644Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back_up",
      ]
      }) 
    
    const [tbl_emplr_list3557a, settbl_emplr_list3557a ] = React.useState<any>([]) 
    const [tbl_emplr_list3557aProps, settbl_emplr_list3557aProps ] = React.useState<any>({
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
        const [grp_overall_employee_list350f4, setgrp_overall_employee_list350f4 ] = React.useState<any>({}) 
    const [grp_overall_employee_list350f4Props, setgrp_overall_employee_list350f4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "btn_export_as_excel",
      ]
      }) 
    
    const [tbl_emp_sal_listf67ed, settbl_emp_sal_listf67ed ] = React.useState<any>([]) 
    const [tbl_emp_sal_listf67edProps, settbl_emp_sal_listf67edProps ] = React.useState<any>({
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
        const [grp_emp_view_details7cca5, setgrp_emp_view_details7cca5 ] = React.useState<any>({}) 
    const [grp_emp_view_details7cca5Props, setgrp_emp_view_details7cca5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_view_details",
            "divider",
      ]
      }) 
        const [grp_emp_details5bbf3, setgrp_emp_details5bbf3 ] = React.useState<any>({}) 
    const [grp_emp_details5bbf3Props, setgrp_emp_details5bbf3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_emp_details",
            "lbl_s_channel_code",
            "lbl_s_leave",
            "lbl_s_inside_cntry",
            "channel_code",
            "total_leaves",
            "is_inside_country",
            "divider1",
            "lbl_s_sal_type",
            "lbl_s_wrk_emid",
            "lbl_s_pas_num",
            "salary_type",
            "lbl_wrk_emid",
            "employee_passport_number",
            "divider3",
            "lbl_s_cmp_code",
            "lbl_s_persn_code",
            "lbl_s_agntcode",
            "lbl_cmp_cde",
            "lbl_prsn_code",
            "agent_code",
            "divider2",
            "lbl_s_wrk_iban",
            "lbl_s_remarks",
            "employee_iban",
            "remarks",
      ]
      }) 
        const [grp_other_details0dea3, setgrp_other_details0dea3 ] = React.useState<any>({}) 
    const [grp_other_details0dea3Props, setgrp_other_details0dea3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_sal_details",
            "lbl_s_year",
            "lbl_s_prd",
            "lbl_s_frm_dte",
            "salary_year",
            "lbl_prd",
            "from_date",
            "divider4",
            "lbl_s_to_dte",
            "lbl_s_sal_pymt_date",
            "lbl_s_days_paid",
            "to_date",
            "lbl_file_id",
            "days_paid",
            "divider5",
            "lbl_s_fix_in",
            "lbl_s_in_var",
            "lbl_s_to_sal",
            "fixed_income",
            "variable_income",
            "total_salary",
            "divider6",
            "lbl_s_to_bene",
            "lbl_s_to_deduction",
            "lbl_s_to_allow",
            "total_benefits",
            "total_deductions",
            "total_allowance",
            "divider7",
            "lbl_s_to_incen",
            "total_incentives",
      ]
      }) 
        const [grp_overall_employee_list1c655, setgrp_overall_employee_list1c655 ] = React.useState<any>({}) 
    const [grp_overall_employee_list1c655Props, setgrp_overall_employee_list1c655Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "btn_export_as_excel",
      ]
      }) 
    
    const [tbl_emp_list2fa62, settbl_emp_list2fa62 ] = React.useState<any>([]) 
    const [tbl_emp_list2fa62Props, settbl_emp_list2fa62Props ] = React.useState<any>({
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
        const [salary_file_overall_group144dd, setsalary_file_overall_group144dd ] = React.useState<any>({}) 
    const [salary_file_overall_group144ddProps, setsalary_file_overall_group144ddProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tab_group12ca0, settab_group12ca0 ] = React.useState<any>({}) 
    const [tab_group12ca0Props, settab_group12ca0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [dynamicatione8e04, setdynamicatione8e04 ] = React.useState<any>({}) 
    const [dynamicatione8e04Props, setdynamicatione8e04Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_toggle",
            "btn_reg_moh",
            "reg_emplr_search",
            "search_btn",
      ]
      }) 
        const [update_reg_employr_tab78f7d, setupdate_reg_employr_tab78f7d ] = React.useState<any>({}) 
    const [update_reg_employr_tab78f7dProps, setupdate_reg_employr_tab78f7dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [upd_reg_group25c38, setupd_reg_group25c38 ] = React.useState<any>({}) 
    const [upd_reg_group25c38Props, setupd_reg_group25c38Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [upd_reg_emplr_listd336e, setupd_reg_emplr_listd336e ] = React.useState<any>([]) 
    const [upd_reg_emplr_listd336eProps, setupd_reg_emplr_listd336eProps ] = React.useState<any>({
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
        const [reg_empr_tabb472c, setreg_empr_tabb472c ] = React.useState<any>({}) 
    const [reg_empr_tabb472cProps, setreg_empr_tabb472cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [reg_emplr_group1073d, setreg_emplr_group1073d ] = React.useState<any>({}) 
    const [reg_emplr_group1073dProps, setreg_emplr_group1073dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [emplr_list0e076, setemplr_list0e076 ] = React.useState<any>([]) 
    const [emplr_list0e076Props, setemplr_list0e076Props ] = React.useState<any>({
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
        const [groupfa4d0, setgroupfa4d0 ] = React.useState<any>({}) 
    const [groupfa4d0Props, setgroupfa4d0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "toggle_dropdown",
            "toggle_dropdown",
            "btn_cancel",
            "btn_confirm",
      ]
      }) 
        const [grp_wpsc6e49, setgrp_wpsc6e49 ] = React.useState<any>({}) 
    const [grp_wpsc6e49Props, setgrp_wpsc6e49Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_eob07ed4, setgrp_eob07ed4 ] = React.useState<any>({}) 
    const [grp_eob07ed4Props, setgrp_eob07ed4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_enquiry759a6, setgrp_enquiry759a6 ] = React.useState<any>({}) 
    const [grp_enquiry759a6Props, setgrp_enquiry759a6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tabgroup_dashboard0d387, settabgroup_dashboard0d387 ] = React.useState<any>({}) 
    const [tabgroup_dashboard0d387Props, settabgroup_dashboard0d387Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [tab_header_view_all_failcb8d9, settab_header_view_all_failcb8d9 ] = React.useState<any>({}) 
    const [tab_header_view_all_failcb8d9Props, settab_header_view_all_failcb8d9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_retun_ref84e8f, setgrp_retun_ref84e8f ] = React.useState<any>({}) 
    const [grp_retun_ref84e8fProps, setgrp_retun_ref84e8fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_vw_all_failf2e05, settbl_vw_all_failf2e05 ] = React.useState<any>([]) 
    const [tbl_vw_all_failf2e05Props, settbl_vw_all_failf2e05Props ] = React.useState<any>({
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
        const [tab_headerview_all_successdba67, settab_headerview_all_successdba67 ] = React.useState<any>({}) 
    const [tab_headerview_all_successdba67Props, settab_headerview_all_successdba67Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
        const [grp_reqforref8b4e3, setgrp_reqforref8b4e3 ] = React.useState<any>({}) 
    const [grp_reqforref8b4e3Props, setgrp_reqforref8b4e3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
      ]
      }) 
    
    const [tbl_view_all_successbc924, settbl_view_all_successbc924 ] = React.useState<any>([]) 
    const [tbl_view_all_successbc924Props, settbl_view_all_successbc924Props ] = React.useState<any>({
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
        const [file_upload_groupfa783, setfile_upload_groupfa783 ] = React.useState<any>({}) 
    const [file_upload_groupfa783Props, setfile_upload_groupfa783Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon",
            "success_text",
            "file_upload_success",
            "divider",
            "okk_btn",
      ]
      }) 
        const [grp_overallsif_list46e94, setgrp_overallsif_list46e94 ] = React.useState<any>({}) 
    const [grp_overallsif_list46e94Props, setgrp_overallsif_list46e94Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text_head",
            "btn_search",
            "btn_export_as_excel",
      ]
      }) 
    
    const [tbl_sif_list592fc, settbl_sif_list592fc ] = React.useState<any>([]) 
    const [tbl_sif_list592fcProps, settbl_sif_list592fcProps ] = React.useState<any>({
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
        const [main_groupb2798, setmain_groupb2798 ] = React.useState<any>({}) 
    const [main_groupb2798Props, setmain_groupb2798Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "top_divider",
            "originalfilename",
            "sffilename",
            "employerid",
            "companyname",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        const [grp_overallsif_list6060c, setgrp_overallsif_list6060c ] = React.useState<any>({}) 
    const [grp_overallsif_list6060cProps, setgrp_overallsif_list6060cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "lbl_hear",
            "btn_search",
            "btn_export_as_excel",
      ]
      }) 
    
    const [tbl_pif_list653ae, settbl_pif_list653ae ] = React.useState<any>([]) 
    const [tbl_pif_list653aeProps, settbl_pif_list653aeProps ] = React.useState<any>({
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
        const [main_group0c058, setmain_group0c058 ] = React.useState<any>({}) 
    const [main_group0c058Props, setmain_group0c058Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "top_divider",
            "corporatename",
            "piffilename",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
   const [outbound_or_inbound5e076,setoutbound_or_inbound5e076] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [outbound_or_inbound5e076Props,setoutbound_or_inbound5e076Props] = React.useState<any>({}) 
   const [search14cf0,setsearch14cf0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search14cf0Props,setsearch14cf0Props] = React.useState<any>({}) 
   const [refresh313d0,setrefresh313d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [refresh313d0Props,setrefresh313d0Props] = React.useState<any>({}) 
   const [downloadcb505,setdownloadcb505] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [downloadcb505Props,setdownloadcb505Props] = React.useState<any>({}) 
   const [new_payment7f5db,setnew_payment7f5db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment7f5dbProps,setnew_payment7f5dbProps] = React.useState<any>({}) 
   const [product_code_view_allb0df6,setproduct_code_view_allb0df6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_view_allb0df6Props,setproduct_code_view_allb0df6Props] = React.useState<any>({}) 
   const [channel_name_view_all33724,setchannel_name_view_all33724] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_view_all33724Props,setchannel_name_view_all33724Props] = React.useState<any>({}) 
   const [uuid_view_allc0a46,setuuid_view_allc0a46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_view_allc0a46Props,setuuid_view_allc0a46Props] = React.useState<any>({}) 
   const [dr_account_view_all54da6,setdr_account_view_all54da6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_view_all54da6Props,setdr_account_view_all54da6Props] = React.useState<any>({}) 
   const [dr_amount_view_all88d6b,setdr_amount_view_all88d6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_view_all88d6bProps,setdr_amount_view_all88d6bProps] = React.useState<any>({}) 
   const [cr_account_view_alld4b39,setcr_account_view_alld4b39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_view_alld4b39Props,setcr_account_view_alld4b39Props] = React.useState<any>({}) 
   const [cr_amount_view_all19d14,setcr_amount_view_all19d14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_view_all19d14Props,setcr_amount_view_all19d14Props] = React.useState<any>({}) 
   const [remittance_info_view_all82afd,setremittance_info_view_all82afd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_view_all82afdProps,setremittance_info_view_all82afdProps] = React.useState<any>({}) 
   const [status_view_all47e6b,setstatus_view_all47e6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_view_all47e6bProps,setstatus_view_all47e6bProps] = React.useState<any>({}) 
   const [view_all_journeyd3ae9,setview_all_journeyd3ae9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_all_journeyd3ae9Props,setview_all_journeyd3ae9Props] = React.useState<any>({}) 
   const [product_code_failure_queue12297,setproduct_code_failure_queue12297] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_failure_queue12297Props,setproduct_code_failure_queue12297Props] = React.useState<any>({}) 
   const [channel_name_failure_queue42953,setchannel_name_failure_queue42953] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_failure_queue42953Props,setchannel_name_failure_queue42953Props] = React.useState<any>({}) 
   const [uuid_failure_queue03c86,setuuid_failure_queue03c86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_failure_queue03c86Props,setuuid_failure_queue03c86Props] = React.useState<any>({}) 
   const [dr_account_failure_queuef9d2d,setdr_account_failure_queuef9d2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_failure_queuef9d2dProps,setdr_account_failure_queuef9d2dProps] = React.useState<any>({}) 
   const [dr_amount_failure_queue95d4e,setdr_amount_failure_queue95d4e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_failure_queue95d4eProps,setdr_amount_failure_queue95d4eProps] = React.useState<any>({}) 
   const [cr_account_failure_queuea7246,setcr_account_failure_queuea7246] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_failure_queuea7246Props,setcr_account_failure_queuea7246Props] = React.useState<any>({}) 
   const [cr_amount_failure_queue57c4d,setcr_amount_failure_queue57c4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_failure_queue57c4dProps,setcr_amount_failure_queue57c4dProps] = React.useState<any>({}) 
   const [remittance_info_failure_queue09d7a,setremittance_info_failure_queue09d7a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_failure_queue09d7aProps,setremittance_info_failure_queue09d7aProps] = React.useState<any>({}) 
   const [status_failure_queue0aef8,setstatus_failure_queue0aef8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_failure_queue0aef8Props,setstatus_failure_queue0aef8Props] = React.useState<any>({}) 
   const [failure_queue_journeyc8638,setfailure_queue_journeyc8638] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [failure_queue_journeyc8638Props,setfailure_queue_journeyc8638Props] = React.useState<any>({}) 
   const [product_code_success_queue7c209,setproduct_code_success_queue7c209] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_success_queue7c209Props,setproduct_code_success_queue7c209Props] = React.useState<any>({}) 
   const [channel_name_success_queueeddaf,setchannel_name_success_queueeddaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_success_queueeddafProps,setchannel_name_success_queueeddafProps] = React.useState<any>({}) 
   const [uuid_success_queuec805b,setuuid_success_queuec805b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_success_queuec805bProps,setuuid_success_queuec805bProps] = React.useState<any>({}) 
   const [dr_account_operational_pending10a49,setdr_account_operational_pending10a49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_operational_pending10a49Props,setdr_account_operational_pending10a49Props] = React.useState<any>({}) 
   const [dr_amount_success_queueda254,setdr_amount_success_queueda254] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_success_queueda254Props,setdr_amount_success_queueda254Props] = React.useState<any>({}) 
   const [cr_account_success_queue60480,setcr_account_success_queue60480] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_success_queue60480Props,setcr_account_success_queue60480Props] = React.useState<any>({}) 
   const [cr_amount_success_queueb80d4,setcr_amount_success_queueb80d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_success_queueb80d4Props,setcr_amount_success_queueb80d4Props] = React.useState<any>({}) 
   const [remittance_info_success_queue2f950,setremittance_info_success_queue2f950] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_success_queue2f950Props,setremittance_info_success_queue2f950Props] = React.useState<any>({}) 
   const [status_success_queue019a2,setstatus_success_queue019a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_success_queue019a2Props,setstatus_success_queue019a2Props] = React.useState<any>({}) 
   const [success_queue_journey68ac9,setsuccess_queue_journey68ac9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [success_queue_journey68ac9Props,setsuccess_queue_journey68ac9Props] = React.useState<any>({}) 
   const [product_code_return_queuee5e11,setproduct_code_return_queuee5e11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_return_queuee5e11Props,setproduct_code_return_queuee5e11Props] = React.useState<any>({}) 
   const [channel_name_return_queuebdabb,setchannel_name_return_queuebdabb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_return_queuebdabbProps,setchannel_name_return_queuebdabbProps] = React.useState<any>({}) 
   const [uuid_return_queue958c9,setuuid_return_queue958c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_return_queue958c9Props,setuuid_return_queue958c9Props] = React.useState<any>({}) 
   const [dr_account_return_queuee94b2,setdr_account_return_queuee94b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_return_queuee94b2Props,setdr_account_return_queuee94b2Props] = React.useState<any>({}) 
   const [dr_amount_return_queue2f324,setdr_amount_return_queue2f324] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_return_queue2f324Props,setdr_amount_return_queue2f324Props] = React.useState<any>({}) 
   const [cr_account_return_queue21a57,setcr_account_return_queue21a57] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_return_queue21a57Props,setcr_account_return_queue21a57Props] = React.useState<any>({}) 
   const [cr_amount_return_queue13fec,setcr_amount_return_queue13fec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_return_queue13fecProps,setcr_amount_return_queue13fecProps] = React.useState<any>({}) 
   const [remittance_info_return_queuef37f7,setremittance_info_return_queuef37f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_return_queuef37f7Props,setremittance_info_return_queuef37f7Props] = React.useState<any>({}) 
   const [status_return_queue95903,setstatus_return_queue95903] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_return_queue95903Props,setstatus_return_queue95903Props] = React.useState<any>({}) 
   const [return_queue_journeycc9d3,setreturn_queue_journeycc9d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_queue_journeycc9d3Props,setreturn_queue_journeycc9d3Props] = React.useState<any>({}) 
   const [product_code_operational_pending6ecd4,setproduct_code_operational_pending6ecd4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_operational_pending6ecd4Props,setproduct_code_operational_pending6ecd4Props] = React.useState<any>({}) 
   const [channel_name_operational_pending2ab87,setchannel_name_operational_pending2ab87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_operational_pending2ab87Props,setchannel_name_operational_pending2ab87Props] = React.useState<any>({}) 
   const [uuid_operational_pendinga8ff6,setuuid_operational_pendinga8ff6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_operational_pendinga8ff6Props,setuuid_operational_pendinga8ff6Props] = React.useState<any>({}) 
   const [dr_account_operational_pending5146b,setdr_account_operational_pending5146b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_operational_pending5146bProps,setdr_account_operational_pending5146bProps] = React.useState<any>({}) 
   const [dr_amount_operational_pending70e3f,setdr_amount_operational_pending70e3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_operational_pending70e3fProps,setdr_amount_operational_pending70e3fProps] = React.useState<any>({}) 
   const [cr_account_operational_pendingf9a9c,setcr_account_operational_pendingf9a9c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_operational_pendingf9a9cProps,setcr_account_operational_pendingf9a9cProps] = React.useState<any>({}) 
   const [cr_amount_operational_pendingbce21,setcr_amount_operational_pendingbce21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_operational_pendingbce21Props,setcr_amount_operational_pendingbce21Props] = React.useState<any>({}) 
   const [remittance_info_operational_pending282bc,setremittance_info_operational_pending282bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_operational_pending282bcProps,setremittance_info_operational_pending282bcProps] = React.useState<any>({}) 
   const [status_operational_pending0df81,setstatus_operational_pending0df81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_operational_pending0df81Props,setstatus_operational_pending0df81Props] = React.useState<any>({}) 
   const [new_payment_chk_approve_btn770f9,setnew_payment_chk_approve_btn770f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment_chk_approve_btn770f9Props,setnew_payment_chk_approve_btn770f9Props] = React.useState<any>({}) 
   const [new_payment_chk_reject_btn4c9a0,setnew_payment_chk_reject_btn4c9a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment_chk_reject_btn4c9a0Props,setnew_payment_chk_reject_btn4c9a0Props] = React.useState<any>({}) 
   const [operational_pending_journey1a1a5,setoperational_pending_journey1a1a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [operational_pending_journey1a1a5Props,setoperational_pending_journey1a1a5Props] = React.useState<any>({}) 
   const [product_code_technical_pending11fe0,setproduct_code_technical_pending11fe0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_code_technical_pending11fe0Props,setproduct_code_technical_pending11fe0Props] = React.useState<any>({}) 
   const [channel_name_technical_pendinge182f,setchannel_name_technical_pendinge182f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_technical_pendinge182fProps,setchannel_name_technical_pendinge182fProps] = React.useState<any>({}) 
   const [uuid_technical_pendingbc6bb,setuuid_technical_pendingbc6bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_technical_pendingbc6bbProps,setuuid_technical_pendingbc6bbProps] = React.useState<any>({}) 
   const [dr_account_technical_pendingbc856,setdr_account_technical_pendingbc856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_technical_pendingbc856Props,setdr_account_technical_pendingbc856Props] = React.useState<any>({}) 
   const [dr_amount_technical_pending5e6cc,setdr_amount_technical_pending5e6cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_technical_pending5e6ccProps,setdr_amount_technical_pending5e6ccProps] = React.useState<any>({}) 
   const [cr_account_technical_pending3c4aa,setcr_account_technical_pending3c4aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_technical_pending3c4aaProps,setcr_account_technical_pending3c4aaProps] = React.useState<any>({}) 
   const [cr_amount_technical_pending1bc34,setcr_amount_technical_pending1bc34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_technical_pending1bc34Props,setcr_amount_technical_pending1bc34Props] = React.useState<any>({}) 
   const [remittance_info_technical_pending78349,setremittance_info_technical_pending78349] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info_technical_pending78349Props,setremittance_info_technical_pending78349Props] = React.useState<any>({}) 
   const [status_technical_pending738a2,setstatus_technical_pending738a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_technical_pending738a2Props,setstatus_technical_pending738a2Props] = React.useState<any>({}) 
   const [technical_pending_journey6601c,settechnical_pending_journey6601c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [technical_pending_journey6601cProps,settechnical_pending_journey6601cProps] = React.useState<any>({}) 
   const [search_label27572,setsearch_label27572] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search_label27572Props,setsearch_label27572Props] = React.useState<any>({}) 
   const [top_divider52f90,settop_divider52f90] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [top_divider52f90Props,settop_divider52f90Props] = React.useState<any>({}) 
   const [trs_created_date2cea8,settrs_created_date2cea8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_date2cea8Props,settrs_created_date2cea8Props] = React.useState<any>({}) 
   const [debtor_account_no963e4,setdebtor_account_no963e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debtor_account_no963e4Props,setdebtor_account_no963e4Props] = React.useState<any>({}) 
   const [debtor_namee2d9f,setdebtor_namee2d9f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debtor_namee2d9fProps,setdebtor_namee2d9fProps] = React.useState<any>({}) 
   const [creditor_account_noca692,setcreditor_account_noca692] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [creditor_account_noca692Props,setcreditor_account_noca692Props] = React.useState<any>({}) 
   const [payment_currency703d2,setpayment_currency703d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [payment_currency703d2Props,setpayment_currency703d2Props] = React.useState<any>({}) 
   const [payment_amount042b1,setpayment_amount042b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [payment_amount042b1Props,setpayment_amount042b1Props] = React.useState<any>({}) 
   const [uuid29c9f,setuuid29c9f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid29c9fProps,setuuid29c9fProps] = React.useState<any>({}) 
   const [status4bd75,setstatus4bd75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status4bd75Props,setstatus4bd75Props] = React.useState<any>({}) 
   const [bottom_dividerb9220,setbottom_dividerb9220] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bottom_dividerb9220Props,setbottom_dividerb9220Props] = React.useState<any>({}) 
   const [search0e695,setsearch0e695] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search0e695Props,setsearch0e695Props] = React.useState<any>({}) 
   const [cleareddfa,setcleareddfa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cleareddfaProps,setcleareddfaProps] = React.useState<any>({}) 
   const [details_labelb25b2,setdetails_labelb25b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [details_labelb25b2Props,setdetails_labelb25b2Props] = React.useState<any>({}) 
   const [divider_tope6917,setdivider_tope6917] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_tope6917Props,setdivider_tope6917Props] = React.useState<any>({}) 
   const [transaction_date_time_label669d7,settransaction_date_time_label669d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_date_time_label669d7Props,settransaction_date_time_label669d7Props] = React.useState<any>({}) 
   const [status_labelf3713,setstatus_labelf3713] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status_labelf3713Props,setstatus_labelf3713Props] = React.useState<any>({}) 
   const [transaction_date_time14856,settransaction_date_time14856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_date_time14856Props,settransaction_date_time14856Props] = React.useState<any>({}) 
   const [status88bc7,setstatus88bc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status88bc7Props,setstatus88bc7Props] = React.useState<any>({}) 
   const [processed_by_label542e8,setprocessed_by_label542e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [processed_by_label542e8Props,setprocessed_by_label542e8Props] = React.useState<any>({}) 
   const [debit_account_label3b1b7,setdebit_account_label3b1b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debit_account_label3b1b7Props,setdebit_account_label3b1b7Props] = React.useState<any>({}) 
   const [processed_byd2b69,setprocessed_byd2b69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [processed_byd2b69Props,setprocessed_byd2b69Props] = React.useState<any>({}) 
   const [debit_account36b40,setdebit_account36b40] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debit_account36b40Props,setdebit_account36b40Props] = React.useState<any>({}) 
   const [currency_labele21ba,setcurrency_labele21ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [currency_labele21baProps,setcurrency_labele21baProps] = React.useState<any>({}) 
   const [credit_account_label65c7b,setcredit_account_label65c7b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [credit_account_label65c7bProps,setcredit_account_label65c7bProps] = React.useState<any>({}) 
   const [currency9c8a2,setcurrency9c8a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [currency9c8a2Props,setcurrency9c8a2Props] = React.useState<any>({}) 
   const [credit_account0d1f4,setcredit_account0d1f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [credit_account0d1f4Props,setcredit_account0d1f4Props] = React.useState<any>({}) 
   const [amount_labelfd725,setamount_labelfd725] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [amount_labelfd725Props,setamount_labelfd725Props] = React.useState<any>({}) 
   const [transaction_reference_labelb1ca9,settransaction_reference_labelb1ca9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_reference_labelb1ca9Props,settransaction_reference_labelb1ca9Props] = React.useState<any>({}) 
   const [amount01416,setamount01416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [amount01416Props,setamount01416Props] = React.useState<any>({}) 
   const [transaction_reference500d6,settransaction_reference500d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_reference500d6Props,settransaction_reference500d6Props] = React.useState<any>({}) 
   const [divider_bottom8bad5,setdivider_bottom8bad5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_bottom8bad5Props,setdivider_bottom8bad5Props] = React.useState<any>({}) 
   const [view_msg_data_btne6a88,setview_msg_data_btne6a88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_msg_data_btne6a88Props,setview_msg_data_btne6a88Props] = React.useState<any>({}) 
   const [view_tran_log_btn9cd8c,setview_tran_log_btn9cd8c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_tran_log_btn9cd8cProps,setview_tran_log_btn9cd8cProps] = React.useState<any>({}) 
   const [msg_data_label7b760,setmsg_data_label7b760] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [msg_data_label7b760Props,setmsg_data_label7b760Props] = React.useState<any>({}) 
   const [divider_topf46a0,setdivider_topf46a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_topf46a0Props,setdivider_topf46a0Props] = React.useState<any>({}) 
   const [xmlviewer9fe8d,setxmlviewer9fe8d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [xmlviewer9fe8dProps,setxmlviewer9fe8dProps] = React.useState<any>({}) 
   const [divider_bottom6920d,setdivider_bottom6920d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_bottom6920dProps,setdivider_bottom6920dProps] = React.useState<any>({}) 
   const [cancel_btn5e840,setcancel_btn5e840] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel_btn5e840Props,setcancel_btn5e840Props] = React.useState<any>({}) 
   const [transaction_log_label7b760,settransaction_log_label7b760] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_log_label7b760Props,settransaction_log_label7b760Props] = React.useState<any>({}) 
   const [req_jsonviewer8d071,setreq_jsonviewer8d071] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [req_jsonviewer8d071Props,setreq_jsonviewer8d071Props] = React.useState<any>({}) 
   const [res_jsonviewerdd261,setres_jsonviewerdd261] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [res_jsonviewerdd261Props,setres_jsonviewerdd261Props] = React.useState<any>({}) 
   const [mol_number_textcda45,setmol_number_textcda45] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [mol_number_textcda45Props,setmol_number_textcda45Props] = React.useState<any>({}) 
   const [mol_comboboxe2955,setmol_comboboxe2955] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [mol_comboboxe2955Props,setmol_comboboxe2955Props] = React.useState<any>({}) 
   const [corporate_label34daf,setcorporate_label34daf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [corporate_label34dafProps,setcorporate_label34dafProps] = React.useState<any>({}) 
   const [parent_company_header79ceb,setparent_company_header79ceb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [parent_company_header79cebProps,setparent_company_header79cebProps] = React.useState<any>({}) 
   const [parent_company_text27062,setparent_company_text27062] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [parent_company_text27062Props,setparent_company_text27062Props] = React.useState<any>({}) 
   const [company_headerb144a,setcompany_headerb144a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [company_headerb144aProps,setcompany_headerb144aProps] = React.useState<any>({}) 
   const [company_text49f48,setcompany_text49f48] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [company_text49f48Props,setcompany_text49f48Props] = React.useState<any>({}) 
   const [branch_header75c0b,setbranch_header75c0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [branch_header75c0bProps,setbranch_header75c0bProps] = React.useState<any>({}) 
   const [branch_text2d7af,setbranch_text2d7af] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [branch_text2d7afProps,setbranch_text2d7afProps] = React.useState<any>({}) 
   const [success_headera7cd1,setsuccess_headera7cd1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [success_headera7cd1Props,setsuccess_headera7cd1Props] = React.useState<any>({}) 
   const [icon_success2f16c,seticon_success2f16c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [icon_success2f16cProps,seticon_success2f16cProps] = React.useState<any>({}) 
   const [wps_text64263,setwps_text64263] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [wps_text64263Props,setwps_text64263Props] = React.useState<any>({}) 
   const [wps_value_text0da25,setwps_value_text0da25] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [wps_value_text0da25Props,setwps_value_text0da25Props] = React.useState<any>({}) 
   const [non_wps_textcb8a4,setnon_wps_textcb8a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_wps_textcb8a4Props,setnon_wps_textcb8a4Props] = React.useState<any>({}) 
   const [non_wps_value_text11cd8,setnon_wps_value_text11cd8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_wps_value_text11cd8Props,setnon_wps_value_text11cd8Props] = React.useState<any>({}) 
   const [paid_succes_texte33d6,setpaid_succes_texte33d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [paid_succes_texte33d6Props,setpaid_succes_texte33d6Props] = React.useState<any>({}) 
   const [failure_header2ed10,setfailure_header2ed10] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [failure_header2ed10Props,setfailure_header2ed10Props] = React.useState<any>({}) 
   const [icon_failure5acb0,seticon_failure5acb0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [icon_failure5acb0Props,seticon_failure5acb0Props] = React.useState<any>({}) 
   const [wps_failure_text00f07,setwps_failure_text00f07] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [wps_failure_text00f07Props,setwps_failure_text00f07Props] = React.useState<any>({}) 
   const [wps_failure_value_text26223,setwps_failure_value_text26223] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [wps_failure_value_text26223Props,setwps_failure_value_text26223Props] = React.useState<any>({}) 
   const [non_wps_failure_text50cef,setnon_wps_failure_text50cef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_wps_failure_text50cefProps,setnon_wps_failure_text50cefProps] = React.useState<any>({}) 
   const [non_wps_failure_value_textb39fe,setnon_wps_failure_value_textb39fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_wps_failure_value_textb39feProps,setnon_wps_failure_value_textb39feProps] = React.useState<any>({}) 
   const [paid_failure_text3db75,setpaid_failure_text3db75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [paid_failure_text3db75Props,setpaid_failure_text3db75Props] = React.useState<any>({}) 
   const [salary_type_textf8cc1,setsalary_type_textf8cc1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [salary_type_textf8cc1Props,setsalary_type_textf8cc1Props] = React.useState<any>({}) 
   const [month_texte777a,setmonth_texte777a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [month_texte777aProps,setmonth_texte777aProps] = React.useState<any>({}) 
   const [year_text0fd6b,setyear_text0fd6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [year_text0fd6bProps,setyear_text0fd6bProps] = React.useState<any>({}) 
   const [salary_type_comboboxfe6ab,setsalary_type_comboboxfe6ab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [salary_type_comboboxfe6abProps,setsalary_type_comboboxfe6abProps] = React.useState<any>({}) 
   const [month_combobox36b46,setmonth_combobox36b46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [month_combobox36b46Props,setmonth_combobox36b46Props] = React.useState<any>({}) 
   const [year_comboboxf59eb,setyear_comboboxf59eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [year_comboboxf59ebProps,setyear_comboboxf59ebProps] = React.useState<any>({}) 
   const [my_queue_icon1d19c,setmy_queue_icon1d19c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [my_queue_icon1d19cProps,setmy_queue_icon1d19cProps] = React.useState<any>({}) 
   const [my_queue_labelae911,setmy_queue_labelae911] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [my_queue_labelae911Props,setmy_queue_labelae911Props] = React.useState<any>({}) 
   const [process58458,setprocess58458] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process58458Props,setprocess58458Props] = React.useState<any>({}) 
   const [file_count6d7a3,setfile_count6d7a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_count6d7a3Props,setfile_count6d7a3Props] = React.useState<any>({}) 
   const [record_count989b2,setrecord_count989b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [record_count989b2Props,setrecord_count989b2Props] = React.useState<any>({}) 
   const [process5248d,setprocess5248d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process5248dProps,setprocess5248dProps] = React.useState<any>({}) 
   const [file_count12835,setfile_count12835] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_count12835Props,setfile_count12835Props] = React.useState<any>({}) 
   const [record_count93af3,setrecord_count93af3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [record_count93af3Props,setrecord_count93af3Props] = React.useState<any>({}) 
   const [process3627b,setprocess3627b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process3627bProps,setprocess3627bProps] = React.useState<any>({}) 
   const [file_counte79a4,setfile_counte79a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_counte79a4Props,setfile_counte79a4Props] = React.useState<any>({}) 
   const [record_count06b83,setrecord_count06b83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [record_count06b83Props,setrecord_count06b83Props] = React.useState<any>({}) 
   const [process08e53,setprocess08e53] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process08e53Props,setprocess08e53Props] = React.useState<any>({}) 
   const [file_count6f5f9,setfile_count6f5f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_count6f5f9Props,setfile_count6f5f9Props] = React.useState<any>({}) 
   const [record_count7fa24,setrecord_count7fa24] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [record_count7fa24Props,setrecord_count7fa24Props] = React.useState<any>({}) 
   const [total_employees_labelbe128,settotal_employees_labelbe128] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_employees_labelbe128Props,settotal_employees_labelbe128Props] = React.useState<any>({}) 
   const [total_emp_barchartc0370,settotal_emp_barchartc0370] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_emp_barchartc0370Props,settotal_emp_barchartc0370Props] = React.useState<any>({}) 
   const [salary_processed_label39115,setsalary_processed_label39115] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [salary_processed_label39115Props,setsalary_processed_label39115Props] = React.useState<any>({}) 
   const [salary_barcharteedc3,setsalary_barcharteedc3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [salary_barcharteedc3Props,setsalary_barcharteedc3Props] = React.useState<any>({}) 
   const [piechart155d5,setpiechart155d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [piechart155d5Props,setpiechart155d5Props] = React.useState<any>({}) 
   const [btn_nack_view_transaction0510e,setbtn_nack_view_transaction0510e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_nack_view_transaction0510eProps,setbtn_nack_view_transaction0510eProps] = React.useState<any>({}) 
   const [col_source_name72b56,setcol_source_name72b56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_source_name72b56Props,setcol_source_name72b56Props] = React.useState<any>({}) 
   const [col_source_uuid1755c,setcol_source_uuid1755c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_source_uuid1755cProps,setcol_source_uuid1755cProps] = React.useState<any>({}) 
   const [col_file_typeea095,setcol_file_typeea095] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_file_typeea095Props,setcol_file_typeea095Props] = React.useState<any>({}) 
   const [col_sal_file5dee0,setcol_sal_file5dee0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_file5dee0Props,setcol_sal_file5dee0Props] = React.useState<any>({}) 
   const [col_processing_monthb1bbd,setcol_processing_monthb1bbd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_processing_monthb1bbdProps,setcol_processing_monthb1bbdProps] = React.useState<any>({}) 
   const [btn_journey_summary_list7c5fe,setbtn_journey_summary_list7c5fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_journey_summary_list7c5feProps,setbtn_journey_summary_list7c5feProps] = React.useState<any>({}) 
   const [col_tot_sal8529c,setcol_tot_sal8529c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_sal8529cProps,setcol_tot_sal8529cProps] = React.useState<any>({}) 
   const [col_processe61a0,setcol_processe61a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_processe61a0Props,setcol_processe61a0Props] = React.useState<any>({}) 
   const [col_po_file_namee2783,setcol_po_file_namee2783] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_file_namee2783Props,setcol_po_file_namee2783Props] = React.useState<any>({}) 
   const [col_po_tran_count2921e,setcol_po_tran_count2921e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_tran_count2921eProps,setcol_po_tran_count2921eProps] = React.useState<any>({}) 
   const [btn_view_transactionb2844,setbtn_view_transactionb2844] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_transactionb2844Props,setbtn_view_transactionb2844Props] = React.useState<any>({}) 
   const [col_po_empr_molc2f22,setcol_po_empr_molc2f22] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_empr_molc2f22Props,setcol_po_empr_molc2f22Props] = React.useState<any>({}) 
   const [col_po_fix_sal2aefb,setcol_po_fix_sal2aefb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_fix_sal2aefbProps,setcol_po_fix_sal2aefbProps] = React.useState<any>({}) 
   const [col_var_amnt70cb5,setcol_var_amnt70cb5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_var_amnt70cb5Props,setcol_var_amnt70cb5Props] = React.useState<any>({}) 
   const [col_po_tot_amnt9842a,setcol_po_tot_amnt9842a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_tot_amnt9842aProps,setcol_po_tot_amnt9842aProps] = React.useState<any>({}) 
   const [col_po_charges3c1af,setcol_po_charges3c1af] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_po_charges3c1afProps,setcol_po_charges3c1afProps] = React.useState<any>({}) 
   const [btn_retryb08fa,setbtn_retryb08fa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_retryb08faProps,setbtn_retryb08faProps] = React.useState<any>({}) 
   const [btn_already_posted0734c,setbtn_already_posted0734c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_already_posted0734cProps,setbtn_already_posted0734cProps] = React.useState<any>({}) 
   const [col_process_type35ae5,setcol_process_type35ae5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_process_type35ae5Props,setcol_process_type35ae5Props] = React.useState<any>({}) 
   const [col_file_name06356,setcol_file_name06356] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_file_name06356Props,setcol_file_name06356Props] = React.useState<any>({}) 
   const [col_tran_iddff78,setcol_tran_iddff78] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tran_iddff78Props,setcol_tran_iddff78Props] = React.useState<any>({}) 
   const [col_sal_file_namee8195,setcol_sal_file_namee8195] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_file_namee8195Props,setcol_sal_file_namee8195Props] = React.useState<any>({}) 
   const [col_file_type43a43,setcol_file_type43a43] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_file_type43a43Props,setcol_file_type43a43Props] = React.useState<any>({}) 
   const [col_created_date8dd2c,setcol_created_date8dd2c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_date8dd2cProps,setcol_created_date8dd2cProps] = React.useState<any>({}) 
   const [btn_view_data6dcf1,setbtn_view_data6dcf1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_data6dcf1Props,setbtn_view_data6dcf1Props] = React.useState<any>({}) 
   const [col_vgphe_id3cf81,setcol_vgphe_id3cf81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_vgphe_id3cf81Props,setcol_vgphe_id3cf81Props] = React.useState<any>({}) 
   const [btn_back80553,setbtn_back80553] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back80553Props,setbtn_back80553Props] = React.useState<any>({}) 
   const [hdr_msg_data030c2,sethdr_msg_data030c2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [hdr_msg_data030c2Props,sethdr_msg_data030c2Props] = React.useState<any>({}) 
   const [divider590d5,setdivider590d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider590d5Props,setdivider590d5Props] = React.useState<any>({}) 
   const [hdr_infoed594,sethdr_infoed594] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [hdr_infoed594Props,sethdr_infoed594Props] = React.useState<any>({}) 
   const [msg_xmlviewera94fb,setmsg_xmlviewera94fb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [msg_xmlviewera94fbProps,setmsg_xmlviewera94fbProps] = React.useState<any>({}) 
   const [divider37feba,setdivider37feba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider37febaProps,setdivider37febaProps] = React.useState<any>({}) 
   const [btn_okay0c912,setbtn_okay0c912] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_okay0c912Props,setbtn_okay0c912Props] = React.useState<any>({}) 
   const [col_sal_filee0c17,setcol_sal_filee0c17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_filee0c17Props,setcol_sal_filee0c17Props] = React.useState<any>({}) 
   const [col_src_namee72b4,setcol_src_namee72b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_src_namee72b4Props,setcol_src_namee72b4Props] = React.useState<any>({}) 
   const [col_prcs_namee094a,setcol_prcs_namee094a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_prcs_namee094aProps,setcol_prcs_namee094aProps] = React.useState<any>({}) 
   const [col_step900de,setcol_step900de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_step900deProps,setcol_step900deProps] = React.useState<any>({}) 
   const [col_tran_count32ab4,setcol_tran_count32ab4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tran_count32ab4Props,setcol_tran_count32ab4Props] = React.useState<any>({}) 
   const [btn_view_transactionda729,setbtn_view_transactionda729] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_transactionda729Props,setbtn_view_transactionda729Props] = React.useState<any>({}) 
   const [col_vgphe_idf0700,setcol_vgphe_idf0700] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_vgphe_idf0700Props,setcol_vgphe_idf0700Props] = React.useState<any>({}) 
   const [btn_back183b3,setbtn_back183b3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back183b3Props,setbtn_back183b3Props] = React.useState<any>({}) 
   const [btn_back886c3,setbtn_back886c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back886c3Props,setbtn_back886c3Props] = React.useState<any>({}) 
   const [col_sal_file1c7b1,setcol_sal_file1c7b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_file1c7b1Props,setcol_sal_file1c7b1Props] = React.useState<any>({}) 
   const [col_source_name34913,setcol_source_name34913] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_source_name34913Props,setcol_source_name34913Props] = React.useState<any>({}) 
   const [col_process_name31fa1,setcol_process_name31fa1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_process_name31fa1Props,setcol_process_name31fa1Props] = React.useState<any>({}) 
   const [col_process3a817,setcol_process3a817] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_process3a817Props,setcol_process3a817Props] = React.useState<any>({}) 
   const [col_created_date35d64,setcol_created_date35d64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_date35d64Props,setcol_created_date35d64Props] = React.useState<any>({}) 
   const [btn_view_data0ca2b,setbtn_view_data0ca2b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_data0ca2bProps,setbtn_view_data0ca2bProps] = React.useState<any>({}) 
   const [col_stepee23d,setcol_stepee23d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_stepee23dProps,setcol_stepee23dProps] = React.useState<any>({}) 
   const [col_tran_uuidce7f9,setcol_tran_uuidce7f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tran_uuidce7f9Props,setcol_tran_uuidce7f9Props] = React.useState<any>({}) 
   const [col_status4cffe,setcol_status4cffe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_status4cffeProps,setcol_status4cffeProps] = React.useState<any>({}) 
   const [btn_view_journeydb055,setbtn_view_journeydb055] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_journeydb055Props,setbtn_view_journeydb055Props] = React.useState<any>({}) 
   const [trn_jrny23739,settrn_jrny23739] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trn_jrny23739Props,settrn_jrny23739Props] = React.useState<any>({}) 
   const [details_labelaa81c,setdetails_labelaa81c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [details_labelaa81cProps,setdetails_labelaa81cProps] = React.useState<any>({}) 
   const [divider_topb49bf,setdivider_topb49bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_topb49bfProps,setdivider_topb49bfProps] = React.useState<any>({}) 
   const [l_file_name7a6bd,setl_file_name7a6bd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_file_name7a6bdProps,setl_file_name7a6bdProps] = React.useState<any>({}) 
   const [l_emp_mol8c2e1,setl_emp_mol8c2e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_emp_mol8c2e1Props,setl_emp_mol8c2e1Props] = React.useState<any>({}) 
   const [file_nameebc26,setfile_nameebc26] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_nameebc26Props,setfile_nameebc26Props] = React.useState<any>({}) 
   const [empl_mold6666,setempl_mold6666] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [empl_mold6666Props,setempl_mold6666Props] = React.useState<any>({}) 
   const [l_fixed_amont9c6be,setl_fixed_amont9c6be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_fixed_amont9c6beProps,setl_fixed_amont9c6beProps] = React.useState<any>({}) 
   const [l_variable_amount98c92,setl_variable_amount98c92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_variable_amount98c92Props,setl_variable_amount98c92Props] = React.useState<any>({}) 
   const [fixed_amot7ca4c,setfixed_amot7ca4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [fixed_amot7ca4cProps,setfixed_amot7ca4cProps] = React.useState<any>({}) 
   const [var_amontdd609,setvar_amontdd609] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [var_amontdd609Props,setvar_amontdd609Props] = React.useState<any>({}) 
   const [l_charge_amount53cd9,setl_charge_amount53cd9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_charge_amount53cd9Props,setl_charge_amount53cd9Props] = React.useState<any>({}) 
   const [l_agent_routing_code9af99,setl_agent_routing_code9af99] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_agent_routing_code9af99Props,setl_agent_routing_code9af99Props] = React.useState<any>({}) 
   const [charge_amnt64cb4,setcharge_amnt64cb4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [charge_amnt64cb4Props,setcharge_amnt64cb4Props] = React.useState<any>({}) 
   const [agent_routng_codee5a1e,setagent_routng_codee5a1e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [agent_routng_codee5a1eProps,setagent_routng_codee5a1eProps] = React.useState<any>({}) 
   const [l_processing_system553cb,setl_processing_system553cb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_processing_system553cbProps,setl_processing_system553cbProps] = React.useState<any>({}) 
   const [l_tran_categoryaa4a1,setl_tran_categoryaa4a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [l_tran_categoryaa4a1Props,setl_tran_categoryaa4a1Props] = React.useState<any>({}) 
   const [process_system9b66e,setprocess_system9b66e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process_system9b66eProps,setprocess_system9b66eProps] = React.useState<any>({}) 
   const [tran_catey46647,settran_catey46647] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_catey46647Props,settran_catey46647Props] = React.useState<any>({}) 
   const [divider_bottom02761,setdivider_bottom02761] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider_bottom02761Props,setdivider_bottom02761Props] = React.useState<any>({}) 
   const [view_msg_data_btn2563b,setview_msg_data_btn2563b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_msg_data_btn2563bProps,setview_msg_data_btn2563bProps] = React.useState<any>({}) 
   const [view_tran_log_btn00416,setview_tran_log_btn00416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_tran_log_btn00416Props,setview_tran_log_btn00416Props] = React.useState<any>({}) 
   const [customwidget84bb0,setcustomwidget84bb0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidget84bb0Props,setcustomwidget84bb0Props] = React.useState<any>({}) 
   const [btn_alredy_postedf023e,setbtn_alredy_postedf023e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_alredy_postedf023eProps,setbtn_alredy_postedf023eProps] = React.useState<any>({}) 
   const [col_source_name06356,setcol_source_name06356] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_source_name06356Props,setcol_source_name06356Props] = React.useState<any>({}) 
   const [col_vph_ref_iddff78,setcol_vph_ref_iddff78] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_vph_ref_iddff78Props,setcol_vph_ref_iddff78Props] = React.useState<any>({}) 
   const [col_emp_namee8195,setcol_emp_namee8195] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_namee8195Props,setcol_emp_namee8195Props] = React.useState<any>({}) 
   const [col_cr_ac_no43a43,setcol_cr_ac_no43a43] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_ac_no43a43Props,setcol_cr_ac_no43a43Props] = React.useState<any>({}) 
   const [col_fixed_amnt8dd2c,setcol_fixed_amnt8dd2c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_fixed_amnt8dd2cProps,setcol_fixed_amnt8dd2cProps] = React.useState<any>({}) 
   const [btn_retry6dcf1,setbtn_retry6dcf1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_retry6dcf1Props,setbtn_retry6dcf1Props] = React.useState<any>({}) 
   const [col_var_amnt3cf81,setcol_var_amnt3cf81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_var_amnt3cf81Props,setcol_var_amnt3cf81Props] = React.useState<any>({}) 
   const [col_tot_amnt3dd6f,setcol_tot_amnt3dd6f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_amnt3dd6fProps,setcol_tot_amnt3dd6fProps] = React.useState<any>({}) 
   const [col_src_file_name0456e,setcol_src_file_name0456e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_src_file_name0456eProps,setcol_src_file_name0456eProps] = React.useState<any>({}) 
   const [col_src_namee7c6a,setcol_src_namee7c6a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_src_namee7c6aProps,setcol_src_namee7c6aProps] = React.useState<any>({}) 
   const [col_tran_count3ad7d,setcol_tran_count3ad7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tran_count3ad7dProps,setcol_tran_count3ad7dProps] = React.useState<any>({}) 
   const [btn_rr_view_tran772a2,setbtn_rr_view_tran772a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_rr_view_tran772a2Props,setbtn_rr_view_tran772a2Props] = React.useState<any>({}) 
   const [col_fixed_amnt007c9,setcol_fixed_amnt007c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_fixed_amnt007c9Props,setcol_fixed_amnt007c9Props] = React.useState<any>({}) 
   const [col_var_amntdff09,setcol_var_amntdff09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_var_amntdff09Props,setcol_var_amntdff09Props] = React.useState<any>({}) 
   const [col_tot_file_amnt9fdc3,setcol_tot_file_amnt9fdc3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_file_amnt9fdc3Props,setcol_tot_file_amnt9fdc3Props] = React.useState<any>({}) 
   const [col_created_datef8d57,setcol_created_datef8d57] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_datef8d57Props,setcol_created_datef8d57Props] = React.useState<any>({}) 
   const [col_sf_file_name809f4,setcol_sf_file_name809f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sf_file_name809f4Props,setcol_sf_file_name809f4Props] = React.useState<any>({}) 
   const [col_rr_src_nameaf109,setcol_rr_src_nameaf109] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_src_nameaf109Props,setcol_rr_src_nameaf109Props] = React.useState<any>({}) 
   const [col_rr_tran_count17c14,setcol_rr_tran_count17c14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_tran_count17c14Props,setcol_rr_tran_count17c14Props] = React.useState<any>({}) 
   const [btn_rrefu_view_tran3e7fb,setbtn_rrefu_view_tran3e7fb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_rrefu_view_tran3e7fbProps,setbtn_rrefu_view_tran3e7fbProps] = React.useState<any>({}) 
   const [col_rr_fixed_amnt55eca,setcol_rr_fixed_amnt55eca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_fixed_amnt55ecaProps,setcol_rr_fixed_amnt55ecaProps] = React.useState<any>({}) 
   const [col_rr_var_amnt9bab1,setcol_rr_var_amnt9bab1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_var_amnt9bab1Props,setcol_rr_var_amnt9bab1Props] = React.useState<any>({}) 
   const [col_rr_tot_file_amnt074c8,setcol_rr_tot_file_amnt074c8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_tot_file_amnt074c8Props,setcol_rr_tot_file_amnt074c8Props] = React.useState<any>({}) 
   const [col_rr_created_date9c266,setcol_rr_created_date9c266] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_created_date9c266Props,setcol_rr_created_date9c266Props] = React.useState<any>({}) 
   const [col_rr_sf_file_named6334,setcol_rr_sf_file_named6334] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rr_sf_file_named6334Props,setcol_rr_sf_file_named6334Props] = React.useState<any>({}) 
   const [cw_tab_initiate_authorize1fdcd,setcw_tab_initiate_authorize1fdcd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cw_tab_initiate_authorize1fdcdProps,setcw_tab_initiate_authorize1fdcdProps] = React.useState<any>({}) 
   const [col_emp_mole4029,setcol_emp_mole4029] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_mole4029Props,setcol_emp_mole4029Props] = React.useState<any>({}) 
   const [col_emp_name32c92,setcol_emp_name32c92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_name32c92Props,setcol_emp_name32c92Props] = React.useState<any>({}) 
   const [col_cr_acc_no42627,setcol_cr_acc_no42627] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_acc_no42627Props,setcol_cr_acc_no42627Props] = React.useState<any>({}) 
   const [col_fixed_amntd6d44,setcol_fixed_amntd6d44] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_fixed_amntd6d44Props,setcol_fixed_amntd6d44Props] = React.useState<any>({}) 
   const [col_var_amnt53ea2,setcol_var_amnt53ea2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_var_amnt53ea2Props,setcol_var_amnt53ea2Props] = React.useState<any>({}) 
   const [col_tot_tran_amnta3392,setcol_tot_tran_amnta3392] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_tran_amnta3392Props,setcol_tot_tran_amnta3392Props] = React.useState<any>({}) 
   const [col_created_dateea4ac,setcol_created_dateea4ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_dateea4acProps,setcol_created_dateea4acProps] = React.useState<any>({}) 
   const [col_sf_file_name36fc1,setcol_sf_file_name36fc1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sf_file_name36fc1Props,setcol_sf_file_name36fc1Props] = React.useState<any>({}) 
   const [col_rsn_codef367b,setcol_rsn_codef367b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rsn_codef367bProps,setcol_rsn_codef367bProps] = React.useState<any>({}) 
   const [btn_initiate71727,setbtn_initiate71727] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_initiate71727Props,setbtn_initiate71727Props] = React.useState<any>({}) 
   const [col_uuida83f1,setcol_uuida83f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_uuida83f1Props,setcol_uuida83f1Props] = React.useState<any>({}) 
   const [btn_authorizefce56,setbtn_authorizefce56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_authorizefce56Props,setbtn_authorizefce56Props] = React.useState<any>({}) 
   const [btn_back16e28,setbtn_back16e28] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back16e28Props,setbtn_back16e28Props] = React.useState<any>({}) 
   const [return_reason_dropdown59fcb,setreturn_reason_dropdown59fcb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reason_dropdown59fcbProps,setreturn_reason_dropdown59fcbProps] = React.useState<any>({}) 
   const [close969c9,setclose969c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [close969c9Props,setclose969c9Props] = React.useState<any>({}) 
   const [save99ff4,setsave99ff4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [save99ff4Props,setsave99ff4Props] = React.useState<any>({}) 
   const [col_emp_mol35ce2,setcol_emp_mol35ce2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_mol35ce2Props,setcol_emp_mol35ce2Props] = React.useState<any>({}) 
   const [col_emp_name53515,setcol_emp_name53515] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_name53515Props,setcol_emp_name53515Props] = React.useState<any>({}) 
   const [col_cr_acc_no519d3,setcol_cr_acc_no519d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_acc_no519d3Props,setcol_cr_acc_no519d3Props] = React.useState<any>({}) 
   const [col_fixed_amnt0743c,setcol_fixed_amnt0743c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_fixed_amnt0743cProps,setcol_fixed_amnt0743cProps] = React.useState<any>({}) 
   const [col_var_amnt25d0d,setcol_var_amnt25d0d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_var_amnt25d0dProps,setcol_var_amnt25d0dProps] = React.useState<any>({}) 
   const [col_tot_tran_amnt1acc3,setcol_tot_tran_amnt1acc3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_tran_amnt1acc3Props,setcol_tot_tran_amnt1acc3Props] = React.useState<any>({}) 
   const [col_created_date5679d,setcol_created_date5679d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_date5679dProps,setcol_created_date5679dProps] = React.useState<any>({}) 
   const [col_sf_file_namebaf46,setcol_sf_file_namebaf46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sf_file_namebaf46Props,setcol_sf_file_namebaf46Props] = React.useState<any>({}) 
   const [col_rsn_codeaa610,setcol_rsn_codeaa610] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_rsn_codeaa610Props,setcol_rsn_codeaa610Props] = React.useState<any>({}) 
   const [btn_initiate6f8a7,setbtn_initiate6f8a7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_initiate6f8a7Props,setbtn_initiate6f8a7Props] = React.useState<any>({}) 
   const [col_uuid8350f,setcol_uuid8350f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_uuid8350fProps,setcol_uuid8350fProps] = React.useState<any>({}) 
   const [btn_authorize7ae96,setbtn_authorize7ae96] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_authorize7ae96Props,setbtn_authorize7ae96Props] = React.useState<any>({}) 
   const [btn_back41a76,setbtn_back41a76] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back41a76Props,setbtn_back41a76Props] = React.useState<any>({}) 
   const [return_reason_dropdown233e0,setreturn_reason_dropdown233e0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reason_dropdown233e0Props,setreturn_reason_dropdown233e0Props] = React.useState<any>({}) 
   const [closef8f97,setclosef8f97] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [closef8f97Props,setclosef8f97Props] = React.useState<any>({}) 
   const [save89f56,setsave89f56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [save89f56Props,setsave89f56Props] = React.useState<any>({}) 
   const [col_cor_mold12cb,setcol_cor_mold12cb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cor_mold12cbProps,setcol_cor_mold12cbProps] = React.useState<any>({}) 
   const [col_cor_namw4bb17,setcol_cor_namw4bb17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cor_namw4bb17Props,setcol_cor_namw4bb17Props] = React.useState<any>({}) 
   const [btn_get_reg_emprb999a,setbtn_get_reg_emprb999a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_get_reg_emprb999aProps,setbtn_get_reg_emprb999aProps] = React.useState<any>({}) 
   const [col_cor_reg_idf2c18,setcol_cor_reg_idf2c18] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cor_reg_idf2c18Props,setcol_cor_reg_idf2c18Props] = React.useState<any>({}) 
   const [col_cor_eidcba45,setcol_cor_eidcba45] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cor_eidcba45Props,setcol_cor_eidcba45Props] = React.useState<any>({}) 
   const [col_mh_sts9087c,setcol_mh_sts9087c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_mh_sts9087cProps,setcol_mh_sts9087cProps] = React.useState<any>({}) 
   const [btn_empr_rpt13ff7,setbtn_empr_rpt13ff7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_empr_rpt13ff7Props,setbtn_empr_rpt13ff7Props] = React.useState<any>({}) 
   const [btn_empr_status5b036,setbtn_empr_status5b036] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_empr_status5b036Props,setbtn_empr_status5b036Props] = React.useState<any>({}) 
   const [btn_getemployes2c08a,setbtn_getemployes2c08a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_getemployes2c08aProps,setbtn_getemployes2c08aProps] = React.useState<any>({}) 
   const [col_cr_mol2640a,setcol_cr_mol2640a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_mol2640aProps,setcol_cr_mol2640aProps] = React.useState<any>({}) 
   const [col_cr_namef6d51,setcol_cr_namef6d51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_namef6d51Props,setcol_cr_namef6d51Props] = React.useState<any>({}) 
   const [col_cr_status1147a,setcol_cr_status1147a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_cr_status1147aProps,setcol_cr_status1147aProps] = React.useState<any>({}) 
   const [col_reg_num66de9,setcol_reg_num66de9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_reg_num66de9Props,setcol_reg_num66de9Props] = React.useState<any>({}) 
   const [col_owner_emi_id78c37,setcol_owner_emi_id78c37] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_owner_emi_id78c37Props,setcol_owner_emi_id78c37Props] = React.useState<any>({}) 
   const [col_moh_stsaec9e,setcol_moh_stsaec9e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_moh_stsaec9eProps,setcol_moh_stsaec9eProps] = React.useState<any>({}) 
   const [btn_back_upb0902,setbtn_back_upb0902] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back_upb0902Props,setbtn_back_upb0902Props] = React.useState<any>({}) 
   const [col_mol_numrd6584,setcol_mol_numrd6584] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_mol_numrd6584Props,setcol_mol_numrd6584Props] = React.useState<any>({}) 
   const [col_mohre_stse37dc,setcol_mohre_stse37dc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_mohre_stse37dcProps,setcol_mohre_stse37dcProps] = React.useState<any>({}) 
   const [col_reg_num51c35,setcol_reg_num51c35] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_reg_num51c35Props,setcol_reg_num51c35Props] = React.useState<any>({}) 
   const [col_emirates_idce519,setcol_emirates_idce519] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emirates_idce519Props,setcol_emirates_idce519Props] = React.useState<any>({}) 
   const [col_created_date1adb1,setcol_created_date1adb1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_date1adb1Props,setcol_created_date1adb1Props] = React.useState<any>({}) 
   const [btn_backdb4f7,setbtn_backdb4f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_backdb4f7Props,setbtn_backdb4f7Props] = React.useState<any>({}) 
   const [btn_export_as_excelf9ac3,setbtn_export_as_excelf9ac3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_export_as_excelf9ac3Props,setbtn_export_as_excelf9ac3Props] = React.useState<any>({}) 
   const [col_emp_eidb6da5,setcol_emp_eidb6da5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_eidb6da5Props,setcol_emp_eidb6da5Props] = React.useState<any>({}) 
   const [col_emp_mol_list8126c,setcol_emp_mol_list8126c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_mol_list8126cProps,setcol_emp_mol_list8126cProps] = React.useState<any>({}) 
   const [col_er_reg_idec20e,setcol_er_reg_idec20e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_er_reg_idec20eProps,setcol_er_reg_idec20eProps] = React.useState<any>({}) 
   const [col_emp_mol_numa36ef,setcol_emp_mol_numa36ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_mol_numa36efProps,setcol_emp_mol_numa36efProps] = React.useState<any>({}) 
   const [col_sal_mnth274bd,setcol_sal_mnth274bd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_mnth274bdProps,setcol_sal_mnth274bdProps] = React.useState<any>({}) 
   const [col_chnl_codefad7d,setcol_chnl_codefad7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_chnl_codefad7dProps,setcol_chnl_codefad7dProps] = React.useState<any>({}) 
   const [btn_view_details6a93d,setbtn_view_details6a93d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_details6a93dProps,setbtn_view_details6a93dProps] = React.useState<any>({}) 
   const [hdr_view_detailsde0ef,sethdr_view_detailsde0ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [hdr_view_detailsde0efProps,sethdr_view_detailsde0efProps] = React.useState<any>({}) 
   const [divider85e5a,setdivider85e5a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider85e5aProps,setdivider85e5aProps] = React.useState<any>({}) 
   const [hdr_emp_details519b3,sethdr_emp_details519b3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [hdr_emp_details519b3Props,sethdr_emp_details519b3Props] = React.useState<any>({}) 
   const [lbl_s_channel_code83f4d,setlbl_s_channel_code83f4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_channel_code83f4dProps,setlbl_s_channel_code83f4dProps] = React.useState<any>({}) 
   const [lbl_s_leave6881d,setlbl_s_leave6881d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_leave6881dProps,setlbl_s_leave6881dProps] = React.useState<any>({}) 
   const [lbl_s_inside_cntrybe1b2,setlbl_s_inside_cntrybe1b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_inside_cntrybe1b2Props,setlbl_s_inside_cntrybe1b2Props] = React.useState<any>({}) 
   const [lbl_ch_code6fd21,setlbl_ch_code6fd21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_ch_code6fd21Props,setlbl_ch_code6fd21Props] = React.useState<any>({}) 
   const [lbl_leavefc2c9,setlbl_leavefc2c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_leavefc2c9Props,setlbl_leavefc2c9Props] = React.useState<any>({}) 
   const [lbl_inside_cntry8bcae,setlbl_inside_cntry8bcae] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_inside_cntry8bcaeProps,setlbl_inside_cntry8bcaeProps] = React.useState<any>({}) 
   const [divider1d3fd6,setdivider1d3fd6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider1d3fd6Props,setdivider1d3fd6Props] = React.useState<any>({}) 
   const [lbl_s_sal_typeb0082,setlbl_s_sal_typeb0082] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_sal_typeb0082Props,setlbl_s_sal_typeb0082Props] = React.useState<any>({}) 
   const [lbl_s_wrk_emid0fa84,setlbl_s_wrk_emid0fa84] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_wrk_emid0fa84Props,setlbl_s_wrk_emid0fa84Props] = React.useState<any>({}) 
   const [lbl_s_pas_num2951b,setlbl_s_pas_num2951b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_pas_num2951bProps,setlbl_s_pas_num2951bProps] = React.useState<any>({}) 
   const [lbl_sal_typee5fad,setlbl_sal_typee5fad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_sal_typee5fadProps,setlbl_sal_typee5fadProps] = React.useState<any>({}) 
   const [lbl_wrk_emidd0501,setlbl_wrk_emidd0501] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_wrk_emidd0501Props,setlbl_wrk_emidd0501Props] = React.useState<any>({}) 
   const [lbl_pass_numbf1c1,setlbl_pass_numbf1c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_pass_numbf1c1Props,setlbl_pass_numbf1c1Props] = React.useState<any>({}) 
   const [divider3e5b62,setdivider3e5b62] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider3e5b62Props,setdivider3e5b62Props] = React.useState<any>({}) 
   const [lbl_s_cmp_code11164,setlbl_s_cmp_code11164] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_cmp_code11164Props,setlbl_s_cmp_code11164Props] = React.useState<any>({}) 
   const [lbl_s_persn_code785b1,setlbl_s_persn_code785b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_persn_code785b1Props,setlbl_s_persn_code785b1Props] = React.useState<any>({}) 
   const [lbl_s_agntcodee3a1d,setlbl_s_agntcodee3a1d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_agntcodee3a1dProps,setlbl_s_agntcodee3a1dProps] = React.useState<any>({}) 
   const [lbl_cmp_cde8afa3,setlbl_cmp_cde8afa3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_cmp_cde8afa3Props,setlbl_cmp_cde8afa3Props] = React.useState<any>({}) 
   const [lbl_prsn_code9fac4,setlbl_prsn_code9fac4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_prsn_code9fac4Props,setlbl_prsn_code9fac4Props] = React.useState<any>({}) 
   const [lbl_angnt_cdee285a,setlbl_angnt_cdee285a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_angnt_cdee285aProps,setlbl_angnt_cdee285aProps] = React.useState<any>({}) 
   const [divider223785,setdivider223785] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider223785Props,setdivider223785Props] = React.useState<any>({}) 
   const [lbl_s_wrk_iban0b21a,setlbl_s_wrk_iban0b21a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_wrk_iban0b21aProps,setlbl_s_wrk_iban0b21aProps] = React.useState<any>({}) 
   const [lbl_s_remarks514e5,setlbl_s_remarks514e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_remarks514e5Props,setlbl_s_remarks514e5Props] = React.useState<any>({}) 
   const [lblwrk_ibane57ee,setlblwrk_ibane57ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lblwrk_ibane57eeProps,setlblwrk_ibane57eeProps] = React.useState<any>({}) 
   const [lbl_rmksb105f,setlbl_rmksb105f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_rmksb105fProps,setlbl_rmksb105fProps] = React.useState<any>({}) 
   const [hdr_sal_detailscc668,sethdr_sal_detailscc668] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [hdr_sal_detailscc668Props,sethdr_sal_detailscc668Props] = React.useState<any>({}) 
   const [lbl_s_year8a7b7,setlbl_s_year8a7b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_year8a7b7Props,setlbl_s_year8a7b7Props] = React.useState<any>({}) 
   const [lbl_s_prd1d712,setlbl_s_prd1d712] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_prd1d712Props,setlbl_s_prd1d712Props] = React.useState<any>({}) 
   const [lbl_s_frm_dteaf9ff,setlbl_s_frm_dteaf9ff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_frm_dteaf9ffProps,setlbl_s_frm_dteaf9ffProps] = React.useState<any>({}) 
   const [lbl_year77e9a,setlbl_year77e9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_year77e9aProps,setlbl_year77e9aProps] = React.useState<any>({}) 
   const [lbl_prd231ed,setlbl_prd231ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_prd231edProps,setlbl_prd231edProps] = React.useState<any>({}) 
   const [lbl_from_date5c572,setlbl_from_date5c572] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_from_date5c572Props,setlbl_from_date5c572Props] = React.useState<any>({}) 
   const [divider41b7ce,setdivider41b7ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider41b7ceProps,setdivider41b7ceProps] = React.useState<any>({}) 
   const [lbl_s_to_dtec31c3,setlbl_s_to_dtec31c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_dtec31c3Props,setlbl_s_to_dtec31c3Props] = React.useState<any>({}) 
   const [lbl_s_sal_pymt_date3433b,setlbl_s_sal_pymt_date3433b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_sal_pymt_date3433bProps,setlbl_s_sal_pymt_date3433bProps] = React.useState<any>({}) 
   const [lbl_s_days_paid8f15c,setlbl_s_days_paid8f15c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_days_paid8f15cProps,setlbl_s_days_paid8f15cProps] = React.useState<any>({}) 
   const [lbl_to_date68efb,setlbl_to_date68efb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_to_date68efbProps,setlbl_to_date68efbProps] = React.useState<any>({}) 
   const [lbl_file_id71627,setlbl_file_id71627] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_file_id71627Props,setlbl_file_id71627Props] = React.useState<any>({}) 
   const [lbl_days_paidfaad7,setlbl_days_paidfaad7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_days_paidfaad7Props,setlbl_days_paidfaad7Props] = React.useState<any>({}) 
   const [divider54066d,setdivider54066d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider54066dProps,setdivider54066dProps] = React.useState<any>({}) 
   const [lbl_s_fix_in368c0,setlbl_s_fix_in368c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_fix_in368c0Props,setlbl_s_fix_in368c0Props] = React.useState<any>({}) 
   const [lbl_s_in_varaf378,setlbl_s_in_varaf378] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_in_varaf378Props,setlbl_s_in_varaf378Props] = React.useState<any>({}) 
   const [lbl_s_to_sal357e4,setlbl_s_to_sal357e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_sal357e4Props,setlbl_s_to_sal357e4Props] = React.useState<any>({}) 
   const [lbl_fix_in1338c,setlbl_fix_in1338c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_fix_in1338cProps,setlbl_fix_in1338cProps] = React.useState<any>({}) 
   const [lbl_in_varb6ce9,setlbl_in_varb6ce9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_in_varb6ce9Props,setlbl_in_varb6ce9Props] = React.useState<any>({}) 
   const [lbl_to_sal3b4e8,setlbl_to_sal3b4e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_to_sal3b4e8Props,setlbl_to_sal3b4e8Props] = React.useState<any>({}) 
   const [divider6490c6,setdivider6490c6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider6490c6Props,setdivider6490c6Props] = React.useState<any>({}) 
   const [lbl_s_to_beneaed7e,setlbl_s_to_beneaed7e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_beneaed7eProps,setlbl_s_to_beneaed7eProps] = React.useState<any>({}) 
   const [lbl_s_to_deduction078ca,setlbl_s_to_deduction078ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_deduction078caProps,setlbl_s_to_deduction078caProps] = React.useState<any>({}) 
   const [lbl_s_to_allow8942c,setlbl_s_to_allow8942c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_allow8942cProps,setlbl_s_to_allow8942cProps] = React.useState<any>({}) 
   const [lbl_to_bene728c0,setlbl_to_bene728c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_to_bene728c0Props,setlbl_to_bene728c0Props] = React.useState<any>({}) 
   const [lbl_to_deductionbd7f3,setlbl_to_deductionbd7f3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_to_deductionbd7f3Props,setlbl_to_deductionbd7f3Props] = React.useState<any>({}) 
   const [lbl_to_allo2f67a,setlbl_to_allo2f67a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_to_allo2f67aProps,setlbl_to_allo2f67aProps] = React.useState<any>({}) 
   const [divider7df1c4,setdivider7df1c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [divider7df1c4Props,setdivider7df1c4Props] = React.useState<any>({}) 
   const [lbl_s_to_incen9e037,setlbl_s_to_incen9e037] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_s_to_incen9e037Props,setlbl_s_to_incen9e037Props] = React.useState<any>({}) 
   const [lbl_toince2e251,setlbl_toince2e251] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_toince2e251Props,setlbl_toince2e251Props] = React.useState<any>({}) 
   const [btn_back2d2f3,setbtn_back2d2f3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_back2d2f3Props,setbtn_back2d2f3Props] = React.useState<any>({}) 
   const [btn_export_as_excel39d79,setbtn_export_as_excel39d79] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_export_as_excel39d79Props,setbtn_export_as_excel39d79Props] = React.useState<any>({}) 
   const [btn_emp_rptf4b9a,setbtn_emp_rptf4b9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_emp_rptf4b9aProps,setbtn_emp_rptf4b9aProps] = React.useState<any>({}) 
   const [btn_get_empdd09a,setbtn_get_empdd09a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_get_empdd09aProps,setbtn_get_empdd09aProps] = React.useState<any>({}) 
   const [col_card_numberbec8c,setcol_card_numberbec8c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_card_numberbec8cProps,setcol_card_numberbec8cProps] = React.useState<any>({}) 
   const [col_uni_numd76ee,setcol_uni_numd76ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_uni_numd76eeProps,setcol_uni_numd76eeProps] = React.useState<any>({}) 
   const [col_emr_idd3a1f,setcol_emr_idd3a1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emr_idd3a1fProps,setcol_emr_idd3a1fProps] = React.useState<any>({}) 
   const [col_sts_dated58fa4,setcol_sts_dated58fa4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sts_dated58fa4Props,setcol_sts_dated58fa4Props] = React.useState<any>({}) 
   const [col_is_actived0527,setcol_is_actived0527] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_is_actived0527Props,setcol_is_actived0527Props] = React.useState<any>({}) 
   const [col_pass_nume4031,setcol_pass_nume4031] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_pass_nume4031Props,setcol_pass_nume4031Props] = React.useState<any>({}) 
   const [col_tot_sale3e91,setcol_tot_sale3e91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_sale3e91Props,setcol_tot_sale3e91Props] = React.useState<any>({}) 
   const [col_emp_namefa4c3,setcol_emp_namefa4c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_namefa4c3Props,setcol_emp_namefa4c3Props] = React.useState<any>({}) 
   const [col_emp_name_ar02a3b,setcol_emp_name_ar02a3b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emp_name_ar02a3bProps,setcol_emp_name_ar02a3bProps] = React.useState<any>({}) 
   const [col_prsn_code83655,setcol_prsn_code83655] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_prsn_code83655Props,setcol_prsn_code83655Props] = React.useState<any>({}) 
   const [btn_salary_slipb31d5,setbtn_salary_slipb31d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_salary_slipb31d5Props,setbtn_salary_slipb31d5Props] = React.useState<any>({}) 
   const [col_empr_num3d80d,setcol_empr_num3d80d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_empr_num3d80dProps,setcol_empr_num3d80dProps] = React.useState<any>({}) 
   const [btn_toggle12af0,setbtn_toggle12af0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_toggle12af0Props,setbtn_toggle12af0Props] = React.useState<any>({}) 
   const [btn_reg_mohd6fce,setbtn_reg_mohd6fce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_reg_mohd6fceProps,setbtn_reg_mohd6fceProps] = React.useState<any>({}) 
   const [reg_emplr_search8289f,setreg_emplr_search8289f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reg_emplr_search8289fProps,setreg_emplr_search8289fProps] = React.useState<any>({}) 
   const [search_btn1b8b6,setsearch_btn1b8b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search_btn1b8b6Props,setsearch_btn1b8b6Props] = React.useState<any>({}) 
   const [cor_mol062f8,setcor_mol062f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_mol062f8Props,setcor_mol062f8Props] = React.useState<any>({}) 
   const [cor_name7e300,setcor_name7e300] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_name7e300Props,setcor_name7e300Props] = React.useState<any>({}) 
   const [owner_eid61dd1,setowner_eid61dd1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [owner_eid61dd1Props,setowner_eid61dd1Props] = React.useState<any>({}) 
   const [cor_moh_sts343b0,setcor_moh_sts343b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_moh_sts343b0Props,setcor_moh_sts343b0Props] = React.useState<any>({}) 
   const [cor_stsea777,setcor_stsea777] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_stsea777Props,setcor_stsea777Props] = React.useState<any>({}) 
   const [comp_stse8d74,setcomp_stse8d74] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [comp_stse8d74Props,setcomp_stse8d74Props] = React.useState<any>({}) 
   const [cor_molffa7c,setcor_molffa7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_molffa7cProps,setcor_molffa7cProps] = React.useState<any>({}) 
   const [cor_name7a1f6,setcor_name7a1f6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_name7a1f6Props,setcor_name7a1f6Props] = React.useState<any>({}) 
   const [cor_reg_idb804b,setcor_reg_idb804b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_reg_idb804bProps,setcor_reg_idb804bProps] = React.useState<any>({}) 
   const [cor_eid349aa,setcor_eid349aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cor_eid349aaProps,setcor_eid349aaProps] = React.useState<any>({}) 
   const [moh_statusda3d9,setmoh_statusda3d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [moh_statusda3d9Props,setmoh_statusda3d9Props] = React.useState<any>({}) 
   const [toggle_dropdownfb4d3,settoggle_dropdownfb4d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [toggle_dropdownfb4d3Props,settoggle_dropdownfb4d3Props] = React.useState<any>({}) 
   const [btn_cancel9df0b,setbtn_cancel9df0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_cancel9df0bProps,setbtn_cancel9df0bProps] = React.useState<any>({}) 
   const [btn_confirm34d75,setbtn_confirm34d75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_confirm34d75Props,setbtn_confirm34d75Props] = React.useState<any>({}) 
   const [col_com_code8c08a,setcol_com_code8c08a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_com_code8c08aProps,setcol_com_code8c08aProps] = React.useState<any>({}) 
   const [col_emir_id08252,setcol_emir_id08252] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emir_id08252Props,setcol_emir_id08252Props] = React.useState<any>({}) 
   const [btn_retryb8593,setbtn_retryb8593] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_retryb8593Props,setbtn_retryb8593Props] = React.useState<any>({}) 
   const [col_reg_no9e196,setcol_reg_no9e196] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_reg_no9e196Props,setcol_reg_no9e196Props] = React.useState<any>({}) 
   const [col_prcs_nameb7721,setcol_prcs_nameb7721] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_prcs_nameb7721Props,setcol_prcs_nameb7721Props] = React.useState<any>({}) 
   const [col_sts9c434,setcol_sts9c434] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sts9c434Props,setcol_sts9c434Props] = React.useState<any>({}) 
   const [col_sif_name7de17,setcol_sif_name7de17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sif_name7de17Props,setcol_sif_name7de17Props] = React.useState<any>({}) 
   const [col_sal_monthaa65c,setcol_sal_monthaa65c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_monthaa65cProps,setcol_sal_monthaa65cProps] = React.useState<any>({}) 
   const [col_created_dated290b,setcol_created_dated290b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_dated290bProps,setcol_created_dated290bProps] = React.useState<any>({}) 
   const [btn_view_req_res6cb5d,setbtn_view_req_res6cb5d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_view_req_res6cb5dProps,setbtn_view_req_res6cb5dProps] = React.useState<any>({}) 
   const [col_com_code3b35a,setcol_com_code3b35a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_com_code3b35aProps,setcol_com_code3b35aProps] = React.useState<any>({}) 
   const [col_emi_id8bf26,setcol_emi_id8bf26] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emi_id8bf26Props,setcol_emi_id8bf26Props] = React.useState<any>({}) 
   const [col_reg_noe3d8f,setcol_reg_noe3d8f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_reg_noe3d8fProps,setcol_reg_noe3d8fProps] = React.useState<any>({}) 
   const [col_prcs_named06a3,setcol_prcs_named06a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_prcs_named06a3Props,setcol_prcs_named06a3Props] = React.useState<any>({}) 
   const [col_sts2b329,setcol_sts2b329] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sts2b329Props,setcol_sts2b329Props] = React.useState<any>({}) 
   const [col_created_date2f60b,setcol_created_date2f60b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_created_date2f60bProps,setcol_created_date2f60bProps] = React.useState<any>({}) 
   const [btn_succ_req_resc54e9,setbtn_succ_req_resc54e9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_succ_req_resc54e9Props,setbtn_succ_req_resc54e9Props] = React.useState<any>({}) 
   const [icon12b96,seticon12b96] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [icon12b96Props,seticon12b96Props] = React.useState<any>({}) 
   const [success_textd0c07,setsuccess_textd0c07] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [success_textd0c07Props,setsuccess_textd0c07Props] = React.useState<any>({}) 
   const [file_upload_success9ee39,setfile_upload_success9ee39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_upload_success9ee39Props,setfile_upload_success9ee39Props] = React.useState<any>({}) 
   const [dividerdb2f5,setdividerdb2f5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dividerdb2f5Props,setdividerdb2f5Props] = React.useState<any>({}) 
   const [okk_btn97301,setokk_btn97301] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [okk_btn97301Props,setokk_btn97301Props] = React.useState<any>({}) 
   const [text_head38a37,settext_head38a37] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [text_head38a37Props,settext_head38a37Props] = React.useState<any>({}) 
   const [btn_search3c2e1,setbtn_search3c2e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_search3c2e1Props,setbtn_search3c2e1Props] = React.useState<any>({}) 
   const [btn_export_as_excelb2d92,setbtn_export_as_excelb2d92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_export_as_excelb2d92Props,setbtn_export_as_excelb2d92Props] = React.useState<any>({}) 
   const [col_org_file_namee9218,setcol_org_file_namee9218] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_org_file_namee9218Props,setcol_org_file_namee9218Props] = React.useState<any>({}) 
   const [col_sf_file_name2de87,setcol_sf_file_name2de87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sf_file_name2de87Props,setcol_sf_file_name2de87Props] = React.useState<any>({}) 
   const [col_empr_id3b1f4,setcol_empr_id3b1f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_empr_id3b1f4Props,setcol_empr_id3b1f4Props] = React.useState<any>({}) 
   const [col_corp_nameecc38,setcol_corp_nameecc38] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_corp_nameecc38Props,setcol_corp_nameecc38Props] = React.useState<any>({}) 
   const [col_dr_acca3ca2,setcol_dr_acca3ca2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_dr_acca3ca2Props,setcol_dr_acca3ca2Props] = React.useState<any>({}) 
   const [col_tot_rcd0a298,setcol_tot_rcd0a298] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_rcd0a298Props,setcol_tot_rcd0a298Props] = React.useState<any>({}) 
   const [col_sf_file_amnt7be09,setcol_sf_file_amnt7be09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sf_file_amnt7be09Props,setcol_sf_file_amnt7be09Props] = React.useState<any>({}) 
   const [col_sal_mnthc23c3,setcol_sal_mnthc23c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_mnthc23c3Props,setcol_sal_mnthc23c3Props] = React.useState<any>({}) 
   const [col_sal_year592c0,setcol_sal_year592c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_year592c0Props,setcol_sal_year592c0Props] = React.useState<any>({}) 
   const [top_dividerbb8b6,settop_dividerbb8b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [top_dividerbb8b6Props,settop_dividerbb8b6Props] = React.useState<any>({}) 
   const [file_namefb5d0,setfile_namefb5d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [file_namefb5d0Props,setfile_namefb5d0Props] = React.useState<any>({}) 
   const [sf_file_name06efb,setsf_file_name06efb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [sf_file_name06efbProps,setsf_file_name06efbProps] = React.useState<any>({}) 
   const [estab_idbde42,setestab_idbde42] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [estab_idbde42Props,setestab_idbde42Props] = React.useState<any>({}) 
   const [corp_name2b998,setcorp_name2b998] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [corp_name2b998Props,setcorp_name2b998Props] = React.useState<any>({}) 
   const [bottom_dividerdb520,setbottom_dividerdb520] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bottom_dividerdb520Props,setbottom_dividerdb520Props] = React.useState<any>({}) 
   const [searchb3ab8,setsearchb3ab8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [searchb3ab8Props,setsearchb3ab8Props] = React.useState<any>({}) 
   const [clear56e07,setclear56e07] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear56e07Props,setclear56e07Props] = React.useState<any>({}) 
   const [lbl_hear96d7b,setlbl_hear96d7b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [lbl_hear96d7bProps,setlbl_hear96d7bProps] = React.useState<any>({}) 
   const [btn_search8b202,setbtn_search8b202] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_search8b202Props,setbtn_search8b202Props] = React.useState<any>({}) 
   const [btn_export_as_excele8f9c,setbtn_export_as_excele8f9c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [btn_export_as_excele8f9cProps,setbtn_export_as_excele8f9cProps] = React.useState<any>({}) 
   const [col_pif_file_namee99d8,setcol_pif_file_namee99d8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_pif_file_namee99d8Props,setcol_pif_file_namee99d8Props] = React.useState<any>({}) 
   const [col_emplr_ida847f,setcol_emplr_ida847f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_emplr_ida847fProps,setcol_emplr_ida847fProps] = React.useState<any>({}) 
   const [col_corp_name9e9f0,setcol_corp_name9e9f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_corp_name9e9f0Props,setcol_corp_name9e9f0Props] = React.useState<any>({}) 
   const [col_dr_acc2afa8,setcol_dr_acc2afa8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_dr_acc2afa8Props,setcol_dr_acc2afa8Props] = React.useState<any>({}) 
   const [col_tot_rcd8b718,setcol_tot_rcd8b718] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_tot_rcd8b718Props,setcol_tot_rcd8b718Props] = React.useState<any>({}) 
   const [col_pf_file_amnt5e967,setcol_pf_file_amnt5e967] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_pf_file_amnt5e967Props,setcol_pf_file_amnt5e967Props] = React.useState<any>({}) 
   const [col_sal_mnthba9cc,setcol_sal_mnthba9cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_mnthba9ccProps,setcol_sal_mnthba9ccProps] = React.useState<any>({}) 
   const [col_sal_yeara098c,setcol_sal_yeara098c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [col_sal_yeara098cProps,setcol_sal_yeara098cProps] = React.useState<any>({}) 
   const [top_divider34637,settop_divider34637] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [top_divider34637Props,settop_divider34637Props] = React.useState<any>({}) 
   const [corp_name3791a,setcorp_name3791a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [corp_name3791aProps,setcorp_name3791aProps] = React.useState<any>({}) 
   const [pf_file_name2c4bc,setpf_file_name2c4bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [pf_file_name2c4bcProps,setpf_file_name2c4bcProps] = React.useState<any>({}) 
   const [bottom_divider87331,setbottom_divider87331] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bottom_divider87331Props,setbottom_divider87331Props] = React.useState<any>({}) 
   const [search2ca66,setsearch2ca66] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search2ca66Props,setsearch2ca66Props] = React.useState<any>({}) 
   const [clear3234f,setclear3234f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear3234fProps,setclear3234fProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       switchoutbound_or_inbound5e076:false,
       buttonsearch14cf0:false,
       buttonrefresh313d0:false,
       buttondownloadcb505:false,
       buttonnew_payment7f5db:false,
       columnproduct_code_view_allb0df6:false,
       columnchannel_name_view_all33724:false,
       columnuuid_view_allc0a46:false,
       columndr_account_view_all54da6:false,
       columndr_amount_view_all88d6b:false,
       columncr_account_view_alld4b39:false,
       columncr_Amount_view_all19d14:false,
       columnremittance_info_view_all82afd:false,
       columnstatus_view_all47e6b:false,
       timelineview_all_journeyd3ae9:false,
       columnproduct_code_failure_queue12297:false,
       columnchannel_name_failure_queue42953:false,
       columnuuid_failure_queue03c86:false,
       columndr_account_failure_queuef9d2d:false,
       columndr_amount_failure_queue95d4e:false,
       columncr_account_failure_queuea7246:false,
       columncr_Amount_failure_queue57c4d:false,
       columnremittance_info_failure_queue09d7a:false,
       columnstatus_failure_queue0aef8:false,
       timelinefailure_queue_journeyc8638:false,
       columnproduct_code_success_queue7c209:false,
       columnchannel_name_success_queueeddaf:false,
       columnuuid_success_queuec805b:false,
       columndr_account_operational_pending10a49:false,
       columndr_amount_success_queueda254:false,
       columncr_account_success_queue60480:false,
       columncr_Amount_success_queueb80d4:false,
       columnremittance_info_success_queue2f950:false,
       columnstatus_success_queue019a2:false,
       timelinesuccess_queue_journey68ac9:false,
       columnproduct_code_return_queuee5e11:false,
       columnchannel_name_return_queuebdabb:false,
       columnuuid_return_queue958c9:false,
       columndr_account_return_queuee94b2:false,
       columndr_amount_return_queue2f324:false,
       columncr_account_return_queue21a57:false,
       columncr_Amount_return_queue13fec:false,
       columnremittance_info_return_queuef37f7:false,
       columnstatus_return_queue95903:false,
       timelinereturn_queue_journeycc9d3:false,
       columnproduct_code_operational_pending6ecd4:false,
       columnchannel_name_operational_pending2ab87:false,
       columnuuid_operational_pendinga8ff6:false,
       columndr_account_operational_pending5146b:false,
       columndr_amount_operational_pending70e3f:false,
       columncr_account_operational_pendingf9a9c:false,
       columncr_Amount_operational_pendingbce21:false,
       columnremittance_info_operational_pending282bc:false,
       columnstatus_operational_pending0df81:false,
       buttonnew_payment_chk_approve_btn770f9:false,
       buttonnew_payment_chk_reject_btn4c9a0:false,
       timelineoperational_pending_journey1a1a5:false,
       columnproduct_code_technical_pending11fe0:false,
       columnchannel_name_technical_pendinge182f:false,
       columnuuid_technical_pendingbc6bb:false,
       columndr_account_technical_pendingbc856:false,
       columndr_amount_technical_pending5e6cc:false,
       columncr_account_technical_pending3c4aa:false,
       columncr_Amount_technical_pending1bc34:false,
       columnremittance_info_technical_pending78349:false,
       columnstatus_technical_pending738a2:false,
       timelinetechnical_pending_journey6601c:false,
       textsearch_label27572:false,
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
       textdetails_labelb25b2:false,
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
       textmsg_data_label7b760:false,
       dividerdivider_topf46a0:false,
       xmlviewerxmlviewer9fe8d:false,
       dividerdivider_bottom6920d:false,
       buttoncancel_btn5e840:false,
       texttransaction_log_label7b760:false,
       jsonviewerreq_jsonviewer8d071:false,
       jsonviewerres_jsonviewerdd261:false,
       textmol_number_textcda45:false,
       comboboxmol_comboboxe2955:false,
       labelcorporate_label34daf:false,
       textparent_company_header79ceb:false,
       textparent_company_text27062:false,
       textcompany_headerb144a:false,
       textcompany_text49f48:false,
       textbranch_header75c0b:false,
       textbranch_text2d7af:false,
       textsuccess_headera7cd1:false,
       iconicon_success2f16c:false,
       textwps_text64263:false,
       textwps_value_text0da25:false,
       textnon_wps_textcb8a4:false,
       textnon_wps_value_text11cd8:false,
       textpaid_succes_texte33d6:false,
       textfailure_header2ed10:false,
       iconicon_failure5acb0:false,
       textwps_failure_text00f07:false,
       textwps_failure_value_text26223:false,
       textnon_wps_failure_text50cef:false,
       textnon_wps_failure_value_textb39fe:false,
       textpaid_failure_text3db75:false,
       textsalary_type_textf8cc1:false,
       textmonth_texte777a:false,
       textyear_text0fd6b:false,
       comboboxsalary_type_comboboxfe6ab:false,
       comboboxmonth_combobox36b46:false,
       comboboxyear_comboboxf59eb:false,
       iconmy_queue_icon1d19c:false,
       labelmy_queue_labelae911:false,
       columnprocess58458:false,
       columnfile_count6d7a3:false,
       columnrecord_count989b2:false,
       columnprocess5248d:false,
       columnfile_count12835:false,
       columnrecord_count93af3:false,
       columnprocess3627b:false,
       columnfile_counte79a4:false,
       columnrecord_count06b83:false,
       columnprocess08e53:false,
       columnfile_count6f5f9:false,
       columnrecord_count7fa24:false,
       labeltotal_employees_labelbe128:false,
       barcharttotal_emp_barchartc0370:false,
       labelsalary_processed_label39115:false,
       barchartsalary_barcharteedc3:false,
       piechartpiechart155d5:false,
       buttonbtn_nack_view_transaction0510e:false,
       columncol_source_name72b56:false,
       columncol_source_uuid1755c:false,
       columncol_file_typeea095:false,
       columncol_sal_file5dee0:false,
       columncol_processing_monthb1bbd:false,
       buttonbtn_journey_summary_list7c5fe:false,
       columncol_tot_sal8529c:false,
       columncol_processe61a0:false,
       columncol_po_file_namee2783:false,
       columncol_po_tran_count2921e:false,
       buttonbtn_view_transactionb2844:false,
       columncol_po_empr_molc2f22:false,
       columncol_po_fix_sal2aefb:false,
       columncol_var_amnt70cb5:false,
       columncol_po_tot_amnt9842a:false,
       columncol_po_charges3c1af:false,
       buttonbtn_retryb08fa:false,
       buttonbtn_already_posted0734c:false,
       columncol_process_type35ae5:false,
       columncol_file_name06356:false,
       columncol_tran_iddff78:false,
       columncol_sal_file_namee8195:false,
       columncol_file_type43a43:false,
       columncol_created_date8dd2c:false,
       buttonbtn_view_data6dcf1:false,
       columncol_vgphe_id3cf81:false,
       buttonbtn_back80553:false,
       texthdr_msg_data030c2:false,
       dividerdivider590d5:false,
       texthdr_infoed594:false,
       xmlviewermsg_xmlviewera94fb:false,
       dividerdivider37feba:false,
       buttonbtn_okay0c912:false,
       columncol_sal_filee0c17:false,
       columncol_src_namee72b4:false,
       columncol_prcs_namee094a:false,
       columncol_step900de:false,
       columncol_tran_count32ab4:false,
       buttonbtn_view_transactionda729:false,
       columncol_vgphe_idf0700:false,
       buttonbtn_back183b3:false,
       buttonbtn_back886c3:false,
       columncol_sal_file1c7b1:false,
       columncol_source_name34913:false,
       columncol_process_name31fa1:false,
       columncol_process3a817:false,
       columncol_created_date35d64:false,
       buttonbtn_view_data0ca2b:false,
       columncol_stepee23d:false,
       columncol_tran_uuidce7f9:false,
       columncol_status4cffe:false,
       buttonbtn_view_journeydb055:false,
       timelinetrn_jrny23739:false,
       textdetails_labelaa81c:false,
       dividerdivider_topb49bf:false,
       textl_file_name7a6bd:false,
       textl_emp_mol8c2e1:false,
       textfile_nameebc26:false,
       textempl_mold6666:false,
       textl_fixed_amont9c6be:false,
       textl_variable_amount98c92:false,
       textfixed_amot7ca4c:false,
       textvar_amontdd609:false,
       textl_charge_amount53cd9:false,
       textl_agent_routing_code9af99:false,
       textcharge_amnt64cb4:false,
       textagent_routng_codee5a1e:false,
       textl_processing_system553cb:false,
       textl_tran_categoryaa4a1:false,
       textprocess_system9b66e:false,
       texttran_catey46647:false,
       dividerdivider_bottom02761:false,
       buttonview_msg_data_btn2563b:false,
       buttonview_tran_log_btn00416:false,
       customwidgetcustomwidget84bb0:false,
       buttonbtn_alredy_postedf023e:false,
       columncol_source_name06356:false,
       columncol_vph_ref_iddff78:false,
       columncol_emp_namee8195:false,
       columncol_cr_ac_no43a43:false,
       columncol_fixed_amnt8dd2c:false,
       buttonbtn_retry6dcf1:false,
       columncol_var_amnt3cf81:false,
       columncol_tot_amnt3dd6f:false,
       columncol_src_file_name0456e:false,
       columncol_src_namee7c6a:false,
       columncol_tran_count3ad7d:false,
       buttonbtn_rr_view_tran772a2:false,
       columncol_fixed_amnt007c9:false,
       columncol_var_amntdff09:false,
       columncol_tot_file_amnt9fdc3:false,
       columncol_created_datef8d57:false,
       columncol_sf_file_name809f4:false,
       columncol_rr_src_nameaf109:false,
       columncol_rr_tran_count17c14:false,
       buttonbtn_rrefu_view_tran3e7fb:false,
       columncol_rr_fixed_amnt55eca:false,
       columncol_rr_var_amnt9bab1:false,
       columncol_rr_tot_file_amnt074c8:false,
       columncol_rr_created_date9c266:false,
       columncol_rr_sf_file_named6334:false,
       customwidgetcw_tab_initiate_authorize1fdcd:false,
       columncol_emp_mole4029:false,
       columncol_emp_name32c92:false,
       columncol_cr_acc_no42627:false,
       columncol_fixed_amntd6d44:false,
       columncol_var_amnt53ea2:false,
       columncol_tot_tran_amnta3392:false,
       columncol_created_dateea4ac:false,
       columncol_sf_file_name36fc1:false,
       columncol_rsn_codef367b:false,
       buttonbtn_initiate71727:false,
       columncol_uuida83f1:false,
       buttonbtn_authorizefce56:false,
       buttonbtn_back16e28:false,
       dropdownreturn_reason_dropdown59fcb:false,
       buttonclose969c9:false,
       buttonsave99ff4:false,
       columncol_emp_mol35ce2:false,
       columncol_emp_name53515:false,
       columncol_cr_acc_no519d3:false,
       columncol_fixed_amnt0743c:false,
       columncol_var_amnt25d0d:false,
       columncol_tot_tran_amnt1acc3:false,
       columncol_created_date5679d:false,
       columncol_sf_file_namebaf46:false,
       columncol_rsn_codeaa610:false,
       buttonbtn_initiate6f8a7:false,
       columncol_uuid8350f:false,
       buttonbtn_authorize7ae96:false,
       buttonbtn_back41a76:false,
       dropdownreturn_reason_dropdown233e0:false,
       buttonclosef8f97:false,
       buttonsave89f56:false,
       columncol_cor_mold12cb:false,
       columncol_cor_namw4bb17:false,
       buttonbtn_get_reg_emprb999a:false,
       columncol_cor_reg_idf2c18:false,
       columncol_cor_eidcba45:false,
       columncol_mh_sts9087c:false,
       buttonbtn_empr_rpt13ff7:false,
       buttonbtn_empr_status5b036:false,
       buttonbtn_getemployes2c08a:false,
       columncol_cr_mol2640a:false,
       columncol_cr_namef6d51:false,
       columncol_cr_status1147a:false,
       columncol_reg_num66de9:false,
       columncol_owner_emi_id78c37:false,
       columncol_moh_stsaec9e:false,
       buttonbtn_back_upb0902:false,
       columncol_mol_numrd6584:false,
       columncol_mohre_stse37dc:false,
       columncol_reg_num51c35:false,
       columncol_emirates_idce519:false,
       columncol_created_date1adb1:false,
       buttonbtn_backdb4f7:false,
       buttonbtn_export_as_excelf9ac3:false,
       columncol_emp_eidb6da5:false,
       columncol_emp_mol_list8126c:false,
       columncol_er_reg_idec20e:false,
       columncol_emp_mol_numa36ef:false,
       columncol_sal_mnth274bd:false,
       columncol_chnl_codefad7d:false,
       buttonbtn_view_details6a93d:false,
       texthdr_view_detailsde0ef:false,
       dividerdivider85e5a:false,
       texthdr_emp_details519b3:false,
       textlbl_s_channel_code83f4d:false,
       textlbl_s_leave6881d:false,
       textlbl_s_inside_cntrybe1b2:false,
       textlbl_ch_code6fd21:false,
       textlbl_leavefc2c9:false,
       textlbl_inside_cntry8bcae:false,
       dividerdivider1d3fd6:false,
       textlbl_s_sal_typeb0082:false,
       textlbl_s_wrk_emid0fa84:false,
       textlbl_s_pas_num2951b:false,
       textlbl_sal_typee5fad:false,
       textlbl_wrk_emidd0501:false,
       textlbl_pass_numbf1c1:false,
       dividerdivider3e5b62:false,
       textlbl_s_cmp_code11164:false,
       textlbl_s_persn_code785b1:false,
       textlbl_s_agntcodee3a1d:false,
       textlbl_cmp_cde8afa3:false,
       textlbl_prsn_code9fac4:false,
       textlbl_angnt_cdee285a:false,
       dividerdivider223785:false,
       textlbl_s_wrk_iban0b21a:false,
       textlbl_s_remarks514e5:false,
       textlblwrk_ibane57ee:false,
       textlbl_rmksb105f:false,
       texthdr_sal_detailscc668:false,
       textlbl_s_year8a7b7:false,
       textlbl_s_prd1d712:false,
       textlbl_s_frm_dteaf9ff:false,
       textlbl_year77e9a:false,
       textlbl_prd231ed:false,
       textlbl_from_date5c572:false,
       dividerdivider41b7ce:false,
       textlbl_s_to_dtec31c3:false,
       textlbl_s_sal_pymt_date3433b:false,
       textlbl_s_days_paid8f15c:false,
       textlbl_to_date68efb:false,
       textlbl_file_id71627:false,
       textlbl_days_paidfaad7:false,
       dividerdivider54066d:false,
       textlbl_s_fix_in368c0:false,
       textlbl_s_in_varaf378:false,
       textlbl_s_to_sal357e4:false,
       textlbl_fix_in1338c:false,
       textlbl_in_varb6ce9:false,
       textlbl_to_sal3b4e8:false,
       dividerdivider6490c6:false,
       textlbl_s_to_beneaed7e:false,
       textlbl_s_to_deduction078ca:false,
       textlbl_s_to_allow8942c:false,
       textlbl_to_bene728c0:false,
       textlbl_to_deductionbd7f3:false,
       textlbl_to_allo2f67a:false,
       dividerdivider7df1c4:false,
       textlbl_s_to_incen9e037:false,
       textlbl_toince2e251:false,
       buttonbtn_back2d2f3:false,
       buttonbtn_export_as_excel39d79:false,
       buttonbtn_emp_rptf4b9a:false,
       buttonbtn_get_empdd09a:false,
       columncol_card_numberbec8c:false,
       columncol_uni_numd76ee:false,
       columncol_emr_idd3a1f:false,
       columncol_sts_dated58fa4:false,
       columncol_is_actived0527:false,
       columncol_pass_nume4031:false,
       columncol_tot_sale3e91:false,
       columncol_emp_namefa4c3:false,
       columncol_emp_name_ar02a3b:false,
       columncol_prsn_code83655:false,
       buttonbtn_salary_slipb31d5:false,
       columncol_empr_num3d80d:false,
       buttonbtn_toggle12af0:false,
       buttonbtn_reg_mohd6fce:false,
       buttonreg_emplr_search8289f:false,
       buttonsearch_btn1b8b6:false,
       columncor_mol062f8:false,
       columncor_name7e300:false,
       columnowner_eid61dd1:false,
       columncor_moh_sts343b0:false,
       columncor_stsea777:false,
       columncomp_stse8d74:false,
       columncor_molffa7c:false,
       columncor_name7a1f6:false,
       columncor_reg_idb804b:false,
       columncor_eid349aa:false,
       columnmoh_statusda3d9:false,
       dropdowntoggle_dropdownfb4d3:false,
       buttonbtn_cancel9df0b:false,
       buttonbtn_confirm34d75:false,
       columncol_com_code8c08a:false,
       columncol_emir_id08252:false,
       buttonbtn_retryb8593:false,
       columncol_reg_no9e196:false,
       columncol_prcs_nameb7721:false,
       columncol_sts9c434:false,
       columncol_sif_name7de17:false,
       columncol_sal_monthaa65c:false,
       columncol_created_dated290b:false,
       buttonbtn_view_req_res6cb5d:false,
       columncol_com_code3b35a:false,
       columncol_emi_id8bf26:false,
       columncol_reg_noe3d8f:false,
       columncol_prcs_named06a3:false,
       columncol_sts2b329:false,
       columncol_created_date2f60b:false,
       buttonbtn_succ_req_resc54e9:false,
       iconicon12b96:false,
       textsuccess_textd0c07:false,
       textfile_upload_success9ee39:false,
       dividerdividerdb2f5:false,
       buttonokk_btn97301:false,
       texttext_head38a37:false,
       buttonbtn_search3c2e1:false,
       buttonbtn_export_as_excelb2d92:false,
       columncol_org_file_namee9218:false,
       columncol_sf_file_name2de87:false,
       columncol_empr_id3b1f4:false,
       columncol_corp_nameecc38:false,
       columncol_dr_acca3ca2:false,
       columncol_tot_rcd0a298:false,
       columncol_sf_file_amnt7be09:false,
       columncol_sal_mnthc23c3:false,
       columncol_sal_year592c0:false,
       dividertop_dividerbb8b6:false,
       textinputfile_namefb5d0:false,
       textinputsf_file_name06efb:false,
       textinputestab_idbde42:false,
       textinputcorp_name2b998:false,
       dividerbottom_dividerdb520:false,
       buttonsearchb3ab8:false,
       buttonclear56e07:false,
       labellbl_hear96d7b:false,
       buttonbtn_search8b202:false,
       buttonbtn_export_as_excele8f9c:false,
       columncol_pif_file_namee99d8:false,
       columncol_emplr_ida847f:false,
       columncol_corp_name9e9f0:false,
       columncol_dr_acc2afa8:false,
       columncol_tot_rcd8b718:false,
       columncol_pf_file_amnt5e967:false,
       columncol_sal_mnthba9cc:false,
       columncol_sal_yeara098c:false,
       dividertop_divider34637:false,
       textinputcorp_name3791a:false,
       textinputpf_file_name2c4bc:false,
       dividerbottom_divider87331:false,
       buttonsearch2ca66:false,
       buttonclear3234f:false,
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
       groupjourney_details_groupd9a0e:false,
       grouptran_data_group84f25:false,
       groupreq_data_group8d4d7:false,
       groupres_data_group9d75a:false,
       groupgrp_wps7d0b0:false,
       groupgrp_eobedcde:false,
       groupgrp_wps_nack_failurecdb58:false,
       grouptabgroup_post_excep0d361:false,
       groupdashboard_tab_headercb15a:false,
       groupdash_tab_grp477aa:false,
       groupcorporate_group92e02:false,
       groupsuccess_groupf3393:false,
       groupfailure_group60ccc:false,
       groupmy_queue_group17a74:false,
       grouptab_overalla72da:false,
       grouptab_all14848:false,
       groupall_groupdc06f:false,
       tableall_table9a484:false,
       groupaction_required_tab3b174:false,
       groupaction_required_groupc490c:false,
       tableaction_required_table0359e:false,
       groupsalary_return_refund_tabeaf18:false,
       groupsalary_return_refund_group9c3f2:false,
       tablesalary_return_refund_tablee81e8:false,
       groupexception_tab1addc:false,
       groupexception_group8bd2f:false,
       tableexception_table77afe:false,
       grouptotal_emp_group824bb:false,
       groupsalary_process_groupe9737:false,
       grouppie_chart_group31af3:false,
       grouptab_header_wps_nack_failuref61a4:false,
       groupgrp_employee_verify730a2:false,
       tabletable_file_list44ec7:false,
       grouptab_header_wps_file_journey9bceb:false,
       groupgrp_overall_repair8807c:false,
       tabletbl_wps_file_journryabf3b:false,
       grouptab_header_posting_exceptionade8d:false,
       groupgrp_overall_wps9c663:false,
       tabletbl_process_list752ff:false,
       tabletbl_pos_file_lista1c83:false,
       groupgrp_overall_tran_list52636:false,
       tabletbl_tran_list8df93:false,
       groupgrp_msg_daatab68d6:false,
       groupgrp_msg_data_det0b014:false,
       groupgrp_overall_jrny_listc7a13:false,
       tabletbl_jrny_list1e9df:false,
       groupgrp_overall_tran_jrny_list67aa9:false,
       tabletbl_tran_jrny_list6d62f:false,
       groupjourney_details_group764b7:false,
       tabletbl_pos_ex_view_tran8df93:false,
       groupgrp_wpsb96c6:false,
       groupgrp_eobed127:false,
       groupgrp_return_refundc4a03:false,
       grouptabgroup_return_refund4e9b7:false,
       grouptab_header_return_frm_agent2d327:false,
       groupgrp_retun_ref3e6e6:false,
       tabletbl_return_fie_list8f636:false,
       grouptab_header_req_for_refundeadd2:false,
       groupgrp_rr_retun_ref5362d:false,
       tabletbl_rr_req_for_refunde2c9a:false,
       groupgrp_overall_tran_list10bd5:false,
       tabletbl_tran_list858ed:false,
       groupgroup2e463:false,
       groupgrp_overall_tran_listc200a:false,
       tabletbl_tran_list0634a:false,
       groupgroup64e07:false,
       groupgrp_wpsfa727:false,
       groupgrp_eob8dfac:false,
       groupgrp_enquiryd2b2a:false,
       grouptabgroup_return_refund511db:false,
       grouptab_header_view_all_emp58f45:false,
       groupgrp_retun_ref230e2:false,
       tabletbl_vw_all_empr8a2a9:false,
       grouptab_headerview_all_tranaa773:false,
       groupgrp_reqforref4f82e:false,
       tabletbl_view_all_tran1b49d:false,
       groupgrp_overall_tran_listfb644:false,
       tabletbl_emplr_list3557a:false,
       groupgrp_overall_employee_list350f4:false,
       tabletbl_emp_sal_listf67ed:false,
       groupgrp_emp_view_details7cca5:false,
       groupgrp_emp_details5bbf3:false,
       groupgrp_other_details0dea3:false,
       groupgrp_overall_employee_list1c655:false,
       tabletbl_emp_list2fa62:false,
       groupsalary_file_overall_group144dd:false,
       grouptab_group12ca0:false,
       groupdynamicatione8e04:false,
       groupupdate_reg_employr_tab78f7d:false,
       groupupd_reg_group25c38:false,
       tableupd_reg_emplr_listd336e:false,
       groupreg_empr_tabb472c:false,
       groupreg_emplr_group1073d:false,
       tableemplr_list0e076:false,
       groupgroupfa4d0:false,
       groupgrp_wpsc6e49:false,
       groupgrp_eob07ed4:false,
       groupgrp_enquiry759a6:false,
       grouptabgroup_dashboard0d387:false,
       grouptab_header_view_all_failcb8d9:false,
       groupgrp_retun_ref84e8f:false,
       tabletbl_vw_all_failf2e05:false,
       grouptab_headerview_all_successdba67:false,
       groupgrp_reqforref8b4e3:false,
       tabletbl_view_all_successbc924:false,
       groupfile_upload_groupfa783:false,
       groupgrp_overallsif_list46e94:false,
       tabletbl_sif_list592fc:false,
       groupmain_groupb2798:false,
       groupgrp_overallsif_list6060c:false,
       tabletbl_pif_list653ae:false,
       groupmain_group0c058:false,
      })

  ////// screen states 
  const [transactionproduct_v1,settransactionproduct_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [transactionproduct_v1Props,settransactionproduct_v1Props] = React.useState<any>({})
  const [transactionsearch_v1,settransactionsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [transactionsearch_v1Props,settransactionsearch_v1Props] = React.useState<any>({})
  const [tranjourneydetails_v1,settranjourneydetails_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [tranjourneydetails_v1Props,settranjourneydetails_v1Props] = React.useState<any>({})
  const [messagedataview_v1,setmessagedataview_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [messagedataview_v1Props,setmessagedataview_v1Props] = React.useState<any>({})
  const [trandataview_v1,settrandataview_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [trandataview_v1Props,settrandataview_v1Props] = React.useState<any>({})
  const [wps_v1,setwps_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [wps_v1Props,setwps_v1Props] = React.useState<any>({})
  const [transactionlist_v1,settransactionlist_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [transactionlist_v1Props,settransactionlist_v1Props] = React.useState<any>({})
  const [viewmessagedata_v1,setviewmessagedata_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [viewmessagedata_v1Props,setviewmessagedata_v1Props] = React.useState<any>({})
  const [sfjourneylist_v1,setsfjourneylist_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [sfjourneylist_v1Props,setsfjourneylist_v1Props] = React.useState<any>({})
  const [transactionlistwithjourney_v1,settransactionlistwithjourney_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [transactionlistwithjourney_v1Props,settransactionlistwithjourney_v1Props] = React.useState<any>({})
  const [wpstranjourneydetails_v1,setwpstranjourneydetails_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [wpstranjourneydetails_v1Props,setwpstranjourneydetails_v1Props] = React.useState<any>({})
  const [postingexceptionviewtransaction_v1,setpostingexceptionviewtransaction_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [postingexceptionviewtransaction_v1Props,setpostingexceptionviewtransaction_v1Props] = React.useState<any>({})
  const [returnsrefund_v1,setreturnsrefund_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [returnsrefund_v1Props,setreturnsrefund_v1Props] = React.useState<any>({})
  const [returntransactionlist_v1,setreturntransactionlist_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [returntransactionlist_v1Props,setreturntransactionlist_v1Props] = React.useState<any>({})
  const [returninitiatereaonpopup_v1,setreturninitiatereaonpopup_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [returninitiatereaonpopup_v1Props,setreturninitiatereaonpopup_v1Props] = React.useState<any>({})
  const [requestrefundtransactionlist_v1,setrequestrefundtransactionlist_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [requestrefundtransactionlist_v1Props,setrequestrefundtransactionlist_v1Props] = React.useState<any>({})
  const [requestinitiatereasonpopup_v1,setrequestinitiatereasonpopup_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [requestinitiatereasonpopup_v1Props,setrequestinitiatereasonpopup_v1Props] = React.useState<any>({})
  const [enquiry_v1,setenquiry_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquiry_v1Props,setenquiry_v1Props] = React.useState<any>({})
  const [enquirygetregemployer_v1,setenquirygetregemployer_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquirygetregemployer_v1Props,setenquirygetregemployer_v1Props] = React.useState<any>({})
  const [enquiryempsalrpt_v1,setenquiryempsalrpt_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquiryempsalrpt_v1Props,setenquiryempsalrpt_v1Props] = React.useState<any>({})
  const [enquiryempviewdetails_v1,setenquiryempviewdetails_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquiryempviewdetails_v1Props,setenquiryempviewdetails_v1Props] = React.useState<any>({})
  const [enquirygetemployees_v1,setenquirygetemployees_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquirygetemployees_v1Props,setenquirygetemployees_v1Props] = React.useState<any>({})
  const [registration_v1,setregistration_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [registration_v1Props,setregistration_v1Props] = React.useState<any>({})
  const [togglepopup_v1,settogglepopup_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [togglepopup_v1Props,settogglepopup_v1Props] = React.useState<any>({})
  const [dashboard_v1,setdashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [dashboard_v1Props,setdashboard_v1Props] = React.useState<any>({})
  const [infomsgpopup_v1,setinfomsgpopup_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [infomsgpopup_v1Props,setinfomsgpopup_v1Props] = React.useState<any>({})
  const [sifsummaryreport_v1,setsifsummaryreport_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [sifsummaryreport_v1Props,setsifsummaryreport_v1Props] = React.useState<any>({})
  const [sifreportsearch_v1,setsifreportsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [sifreportsearch_v1Props,setsifreportsearch_v1Props] = React.useState<any>({})
  const [pifsummaryreport_v1,setpifsummaryreport_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [pifsummaryreport_v1Props,setpifsummaryreport_v1Props] = React.useState<any>({})
  const [pifreportsearch_v1,setpifreportsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [pifreportsearch_v1Props,setpifreportsearch_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_combocurrencysearch_v1Props,setdfd_combocurrencysearch_v1Props] = React.useState<any>([])
  const [dfd_transaction_v1Props,setdfd_transaction_v1Props] = React.useState<any>([])
  const [dfd_journey_v1Props,setdfd_journey_v1Props] = React.useState<any>([])
  const [dfd_tranjourney_v1Props,setdfd_tranjourney_v1Props] = React.useState<any>([])
  const [dfd_employeelist_v1Props,setdfd_employeelist_v1Props] = React.useState<any>([])
  const [dfd_wpsnackfailuretransactionlist_v1Props,setdfd_wpsnackfailuretransactionlist_v1Props] = React.useState<any>([])
  const [dfd_sfjourneyviewtransaction_v1Props,setdfd_sfjourneyviewtransaction_v1Props] = React.useState<any>([])
  const [dfd_sfjourneylistwithcount_v1Props,setdfd_sfjourneylistwithcount_v1Props] = React.useState<any>([])
  const [dfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props] = React.useState<any>([])
  const [dfd_wpsnackfailurefilelist_v1Props,setdfd_wpsnackfailurefilelist_v1Props] = React.useState<any>([])
  const [dfd_wpsfilejourney_v1Props,setdfd_wpsfilejourney_v1Props] = React.useState<any>([])
  const [dfd_postingexpectionfilelist_v1Props,setdfd_postingexpectionfilelist_v1Props] = React.useState<any>([])
  const [dfd_postingexceptionprocesslist_v1Props,setdfd_postingexceptionprocesslist_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardcompanystructurecombo_v1Props,setdfd_wpsdashboardcompanystructurecombo_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmolnumbercombo_v1Props,setdfd_wpsdashboardmolnumbercombo_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardsuccesstab_v1Props,setdfd_wpsdashboardsuccesstab_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardfailuretab_v1Props,setdfd_wpsdashboardfailuretab_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardsalarytypecombo_v1Props,setdfd_wpsdashboardsalarytypecombo_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardemployeesbarchart_v1Props,setdfd_wpsdashboardemployeesbarchart_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardsalaryprocessbarchart_v1Props,setdfd_wpsdashboardsalaryprocessbarchart_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmyqueueall_v1Props,setdfd_wpsdashboardmyqueueall_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmonthcombo_v1Props,setdfd_wpsdashboardmonthcombo_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardyearcombo_v1Props,setdfd_wpsdashboardyearcombo_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardsuccesstabnonwps_v1Props,setdfd_wpsdashboardsuccesstabnonwps_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardfailurenonwpstab_v1Props,setdfd_wpsdashboardfailurenonwpstab_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmyqueueactionrequired_v1Props,setdfd_wpsdashboardmyqueueactionrequired_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props] = React.useState<any>([])
  const [dfd_wpsdashboardmyqueueexceptions_v1Props,setdfd_wpsdashboardmyqueueexceptions_v1Props] = React.useState<any>([])
  const [dfd_returnreason_v1Props,setdfd_returnreason_v1Props] = React.useState<any>([])
  const [dfd_returnagentfromtransactionlist_v1Props,setdfd_returnagentfromtransactionlist_v1Props] = React.useState<any>([])
  const [dfd_requestreason_v1Props,setdfd_requestreason_v1Props] = React.useState<any>([])
  const [dfd_returnfromagentfilelist_v1Props,setdfd_returnfromagentfilelist_v1Props] = React.useState<any>([])
  const [dfd_requestforrefundfilelist_v1Props,setdfd_requestforrefundfilelist_v1Props] = React.useState<any>([])
  const [dfd_enquirygetregemployeremployerlist_v1Props,setdfd_enquirygetregemployeremployerlist_v1Props] = React.useState<any>([])
  const [dfd_enquiryemployersalaryrpt_v1Props,setdfd_enquiryemployersalaryrpt_v1Props] = React.useState<any>([])
  const [dfd_enquirygetemployee_v1Props,setdfd_enquirygetemployee_v1Props] = React.useState<any>([])
  const [dfd_enquiryviewallemployers_v1Props,setdfd_enquiryviewallemployers_v1Props] = React.useState<any>([])
  const [dfd_updateregemployer_v1Props,setdfd_updateregemployer_v1Props] = React.useState<any>([])
  const [dfd_regemployer_v1Props,setdfd_regemployer_v1Props] = React.useState<any>([])
  const [dfd_dashboardviewallsuccess_v1Props,setdfd_dashboardviewallsuccess_v1Props] = React.useState<any>([])
  const [dfd_dashboardviewallfailure_v1Props,setdfd_dashboardviewallfailure_v1Props] = React.useState<any>([])
  const [dfd_sifsummaryreport_v1Props,setdfd_sifsummaryreport_v1Props] = React.useState<any>([])
  const [dfd_pifsummaryreport_v1Props,setdfd_pifsummaryreport_v1Props] = React.useState<any>([])
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
    setValidateRefetch({
      value:false,
      init:0
    })
    setValidate({})
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
    setview_all_journeyd3ae9(
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
    setfailure_queue_journeyc8638(
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
    setsuccess_queue_journey68ac9(
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
    setreturn_queue_journeycc9d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_code_operational_pending6ecd4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_operational_pending2ab87(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_operational_pendinga8ff6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_operational_pending5146b(
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
    setcr_amount_operational_pendingbce21(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_operational_pending282bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_operational_pending0df81(
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
    setnew_payment_chk_reject_btn4c9a0(
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
    setproduct_code_technical_pending11fe0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_technical_pendinge182f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_technical_pendingbc6bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_technical_pendingbc856(
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
    setcr_amount_technical_pending1bc34(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info_technical_pending78349(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_technical_pending738a2(
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
    setsearch_label27572(
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
    setdetails_labelb25b2(
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
    setmsg_data_label7b760(
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
    settransaction_log_label7b760(
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
    setmol_number_textcda45(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmol_comboboxe2955(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcorporate_label34daf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setparent_company_header79ceb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setparent_company_text27062(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompany_headerb144a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompany_text49f48(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbranch_header75c0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbranch_text2d7af(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsuccess_headera7cd1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_success2f16c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwps_text64263(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwps_value_text0da25(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_wps_textcb8a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_wps_value_text11cd8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpaid_succes_texte33d6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfailure_header2ed10(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_failure5acb0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwps_failure_text00f07(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwps_failure_value_text26223(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_wps_failure_text50cef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_wps_failure_value_textb39fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpaid_failure_text3db75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalary_type_textf8cc1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmonth_texte777a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setyear_text0fd6b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalary_type_comboboxfe6ab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmonth_combobox36b46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setyear_comboboxf59eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmy_queue_icon1d19c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmy_queue_labelae911(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess58458(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_count6d7a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrecord_count989b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess5248d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_count12835(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrecord_count93af3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess3627b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_counte79a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrecord_count06b83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess08e53(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_count6f5f9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrecord_count7fa24(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_employees_labelbe128(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_emp_barchartc0370(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalary_processed_label39115(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalary_barcharteedc3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpiechart155d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_nack_view_transaction0510e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_source_name72b56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_source_uuid1755c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_file_typeea095(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_file5dee0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_processing_monthb1bbd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_journey_summary_list7c5fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_sal8529c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_processe61a0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_file_namee2783(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_tran_count2921e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_transactionb2844(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_empr_molc2f22(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_fix_sal2aefb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_var_amnt70cb5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_tot_amnt9842a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_po_charges3c1af(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_retryb08fa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_already_posted0734c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_process_type35ae5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_file_name06356(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tran_iddff78(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_file_namee8195(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_file_type43a43(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_date8dd2c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_data6dcf1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_vgphe_id3cf81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back80553(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethdr_msg_data030c2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider590d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethdr_infoed594(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmsg_xmlviewera94fb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider37feba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_okay0c912(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_filee0c17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_src_namee72b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_prcs_namee094a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_step900de(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tran_count32ab4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_transactionda729(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_vgphe_idf0700(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back183b3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back886c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_file1c7b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_source_name34913(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_process_name31fa1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_process3a817(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_date35d64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_data0ca2b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_stepee23d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tran_uuidce7f9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_status4cffe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_journeydb055(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrn_jrny23739(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdetails_labelaa81c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_topb49bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_file_name7a6bd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_emp_mol8c2e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_nameebc26(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setempl_mold6666(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_fixed_amont9c6be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_variable_amount98c92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfixed_amot7ca4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvar_amontdd609(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_charge_amount53cd9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_agent_routing_code9af99(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_amnt64cb4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setagent_routng_codee5a1e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_processing_system553cb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setl_tran_categoryaa4a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocess_system9b66e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_catey46647(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider_bottom02761(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_msg_data_btn2563b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_tran_log_btn00416(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidget84bb0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_alredy_postedf023e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_source_name06356(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_vph_ref_iddff78(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_namee8195(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_ac_no43a43(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_fixed_amnt8dd2c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_retry6dcf1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_var_amnt3cf81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_amnt3dd6f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_src_file_name0456e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_src_namee7c6a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tran_count3ad7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_rr_view_tran772a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_fixed_amnt007c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_var_amntdff09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_file_amnt9fdc3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_datef8d57(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sf_file_name809f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_src_nameaf109(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_tran_count17c14(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_rrefu_view_tran3e7fb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_fixed_amnt55eca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_var_amnt9bab1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_tot_file_amnt074c8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_created_date9c266(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rr_sf_file_named6334(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcw_tab_initiate_authorize1fdcd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_mole4029(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_name32c92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_acc_no42627(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_fixed_amntd6d44(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_var_amnt53ea2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_tran_amnta3392(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_dateea4ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sf_file_name36fc1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rsn_codef367b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_initiate71727(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_uuida83f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_authorizefce56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back16e28(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reason_dropdown59fcb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclose969c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsave99ff4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_mol35ce2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_name53515(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_acc_no519d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_fixed_amnt0743c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_var_amnt25d0d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_tran_amnt1acc3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_date5679d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sf_file_namebaf46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_rsn_codeaa610(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_initiate6f8a7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_uuid8350f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_authorize7ae96(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back41a76(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reason_dropdown233e0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclosef8f97(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsave89f56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cor_mold12cb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cor_namw4bb17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_get_reg_emprb999a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cor_reg_idf2c18(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cor_eidcba45(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_mh_sts9087c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_empr_rpt13ff7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_empr_status5b036(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_getemployes2c08a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_mol2640a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_namef6d51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_cr_status1147a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_reg_num66de9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_owner_emi_id78c37(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_moh_stsaec9e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back_upb0902(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_mol_numrd6584(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_mohre_stse37dc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_reg_num51c35(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emirates_idce519(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_date1adb1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_backdb4f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_export_as_excelf9ac3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_eidb6da5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_mol_list8126c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_er_reg_idec20e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_mol_numa36ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_mnth274bd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_chnl_codefad7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_details6a93d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethdr_view_detailsde0ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider85e5a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethdr_emp_details519b3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_channel_code83f4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_leave6881d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_inside_cntrybe1b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_ch_code6fd21(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_leavefc2c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_inside_cntry8bcae(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider1d3fd6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_sal_typeb0082(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_wrk_emid0fa84(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_pas_num2951b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_sal_typee5fad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_wrk_emidd0501(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_pass_numbf1c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider3e5b62(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_cmp_code11164(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_persn_code785b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_agntcodee3a1d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_cmp_cde8afa3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_prsn_code9fac4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_angnt_cdee285a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider223785(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_wrk_iban0b21a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_remarks514e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlblwrk_ibane57ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_rmksb105f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethdr_sal_detailscc668(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_year8a7b7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_prd1d712(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_frm_dteaf9ff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_year77e9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_prd231ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_from_date5c572(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider41b7ce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_dtec31c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_sal_pymt_date3433b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_days_paid8f15c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_to_date68efb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_file_id71627(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_days_paidfaad7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider54066d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_fix_in368c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_in_varaf378(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_sal357e4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_fix_in1338c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_in_varb6ce9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_to_sal3b4e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider6490c6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_beneaed7e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_deduction078ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_allow8942c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_to_bene728c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_to_deductionbd7f3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_to_allo2f67a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider7df1c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_s_to_incen9e037(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_toince2e251(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_back2d2f3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_export_as_excel39d79(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_emp_rptf4b9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_get_empdd09a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_card_numberbec8c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_uni_numd76ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emr_idd3a1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sts_dated58fa4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_is_actived0527(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_pass_nume4031(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_sale3e91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_namefa4c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emp_name_ar02a3b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_prsn_code83655(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_salary_slipb31d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_empr_num3d80d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_toggle12af0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_reg_mohd6fce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreg_emplr_search8289f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_btn1b8b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_mol062f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_name7e300(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setowner_eid61dd1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_moh_sts343b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_stsea777(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomp_stse8d74(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_molffa7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_name7a1f6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_reg_idb804b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcor_eid349aa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmoh_statusda3d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settoggle_dropdownfb4d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_cancel9df0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_confirm34d75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_com_code8c08a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emir_id08252(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_retryb8593(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_reg_no9e196(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_prcs_nameb7721(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sts9c434(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sif_name7de17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_monthaa65c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_dated290b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_view_req_res6cb5d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_com_code3b35a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emi_id8bf26(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_reg_noe3d8f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_prcs_named06a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sts2b329(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_created_date2f60b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_succ_req_resc54e9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon12b96(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsuccess_textd0c07(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_upload_success9ee39(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerdb2f5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setokk_btn97301(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext_head38a37(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_search3c2e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_export_as_excelb2d92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_org_file_namee9218(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sf_file_name2de87(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_empr_id3b1f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_corp_nameecc38(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_dr_acca3ca2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_rcd0a298(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sf_file_amnt7be09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_mnthc23c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_year592c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settop_dividerbb8b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfile_namefb5d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsf_file_name06efb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setestab_idbde42(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcorp_name2b998(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbottom_dividerdb520(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearchb3ab8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear56e07(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlbl_hear96d7b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_search8b202(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbtn_export_as_excele8f9c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_pif_file_namee99d8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_emplr_ida847f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_corp_name9e9f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_dr_acc2afa8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_tot_rcd8b718(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_pf_file_amnt5e967(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_mnthba9cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcol_sal_yeara098c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settop_divider34637(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcorp_name3791a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpf_file_name2c4bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbottom_divider87331(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch2ca66(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear3234f(
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
            "search_label",
            "top_divider",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "payment_currency",
            "payment_currency",
            "dr_amount",
            "uuid",
            "status",
            "bottom_divider",
            "search",
            "clear",
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
            "details_label",
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
            "transaction_log_label",
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
        setgrp_wps7d0b0({}) 
    setgrp_wps7d0b0Props({
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
        setgrp_eobedcde({}) 
    setgrp_eobedcdeProps({
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
        setgrp_wps_nack_failurecdb58({}) 
    setgrp_wps_nack_failurecdb58Props({
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
        settabgroup_post_excep0d361({}) 
    settabgroup_post_excep0d361Props({
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
        setdashboard_tab_headercb15a({}) 
    setdashboard_tab_headercb15aProps({
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
        setdash_tab_grp477aa({}) 
    setdash_tab_grp477aaProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "salary_type_text",
            "month_text",
            "year_text",
            "salary_type_combobox",
            "salary_type_combobox",
            "month_combobox",
            "month_combobox",
            "year_combobox",
            "year_combobox",
      ]
      }) 
        setcorporate_group92e02({}) 
    setcorporate_group92e02Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "mol_number_text",
            "mol_combobox",
            "mol_combobox",
            "corporate_label",
            "parent_company_header",
            "parent_company",
            "company_header",
            "company",
            "branch_header",
            "branch",
      ]
      }) 
        setsuccess_groupf3393({}) 
    setsuccess_groupf3393Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "success_header",
            "icon_success",
            "wps_text",
            "total_tran_count",
            "non_wps_text",
            "total_count",
            "paid_succes_text",
      ]
      }) 
        setfailure_group60ccc({}) 
    setfailure_group60cccProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "failure_header",
            "icon_failure",
            "wps_failure_text",
            "total_tran_count",
            "non_wps_failure_text",
            "total_count",
            "paid_failure_text",
      ]
      }) 
        setmy_queue_group17a74({}) 
    setmy_queue_group17a74Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "my_queue_icon",
            "my_queue_label",
      ]
      }) 
        settab_overalla72da({}) 
    settab_overalla72daProps({
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
        settab_all14848({}) 
    settab_all14848Props({
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
        setall_groupdc06f({}) 
    setall_groupdc06fProps({
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
    
    setall_table9a484([]) 
    setall_table9a484Props({
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
        setaction_required_tab3b174({}) 
    setaction_required_tab3b174Props({
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
        setaction_required_groupc490c({}) 
    setaction_required_groupc490cProps({
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
    
    setaction_required_table0359e([]) 
    setaction_required_table0359eProps({
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
        setsalary_return_refund_tabeaf18({}) 
    setsalary_return_refund_tabeaf18Props({
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
        setsalary_return_refund_group9c3f2({}) 
    setsalary_return_refund_group9c3f2Props({
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
    
    setsalary_return_refund_tablee81e8([]) 
    setsalary_return_refund_tablee81e8Props({
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
        setexception_tab1addc({}) 
    setexception_tab1addcProps({
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
        setexception_group8bd2f({}) 
    setexception_group8bd2fProps({
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
    
    setexception_table77afe([]) 
    setexception_table77afeProps({
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
        settotal_emp_group824bb({}) 
    settotal_emp_group824bbProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_employees_label",
            "name",
      ]
      }) 
        setsalary_process_groupe9737({}) 
    setsalary_process_groupe9737Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "salary_processed_label",
            "total_salary",
      ]
      }) 
        setpie_chart_group31af3({}) 
    setpie_chart_group31af3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "piechart",
      ]
      }) 
        settab_header_wps_nack_failuref61a4({}) 
    settab_header_wps_nack_failuref61a4Props({
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
        setgrp_employee_verify730a2({}) 
    setgrp_employee_verify730a2Props({
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
    
    settable_file_list44ec7([]) 
    settable_file_list44ec7Props({
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
        settab_header_wps_file_journey9bceb({}) 
    settab_header_wps_file_journey9bcebProps({
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
        setgrp_overall_repair8807c({}) 
    setgrp_overall_repair8807cProps({
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
    
    settbl_wps_file_journryabf3b([]) 
    settbl_wps_file_journryabf3bProps({
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
        settab_header_posting_exceptionade8d({}) 
    settab_header_posting_exceptionade8dProps({
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
        setgrp_overall_wps9c663({}) 
    setgrp_overall_wps9c663Props({
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
    
    settbl_process_list752ff([]) 
    settbl_process_list752ffProps({
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
    
    settbl_pos_file_lista1c83([]) 
    settbl_pos_file_lista1c83Props({
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
        setgrp_overall_tran_list52636({}) 
    setgrp_overall_tran_list52636Props({
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
    
    settbl_tran_list8df93([]) 
    settbl_tran_list8df93Props({
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
        setgrp_msg_daatab68d6({}) 
    setgrp_msg_daatab68d6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_msg_data",
            "divider",
      ]
      }) 
        setgrp_msg_data_det0b014({}) 
    setgrp_msg_data_det0b014Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_info",
            "msg_xmlviewer",
            "divider3",
            "btn_okay",
      ]
      }) 
        setgrp_overall_jrny_listc7a13({}) 
    setgrp_overall_jrny_listc7a13Props({
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
    
    settbl_jrny_list1e9df([]) 
    settbl_jrny_list1e9dfProps({
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
        setgrp_overall_tran_jrny_list67aa9({}) 
    setgrp_overall_tran_jrny_list67aa9Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "uuid",
      ]
      }) 
    
    settbl_tran_jrny_list6d62f([]) 
    settbl_tran_jrny_list6d62fProps({
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
        setjourney_details_group764b7({}) 
    setjourney_details_group764b7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "details_label",
            "divider_top",
            "l_file_name",
            "l_emp_mol",
            "sf_filename",
            "employee_mol",
            "l_fixed_amont",
            "l_variable_amount",
            "fixed_amount",
            "variable_amount",
            "l_charge_amount",
            "l_agent_routing_code",
            "charge_amount",
            "agent_routing_code",
            "l_processing_system",
            "l_tran_category",
            "procesing_system",
            "tran_category",
            "divider_bottom",
            "view_msg_data_btn",
            "view_tran_log_btn",
            "customwidget",
      ]
      }) 
    
    settbl_pos_ex_view_tran8df93([]) 
    settbl_pos_ex_view_tran8df93Props({
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
        setgrp_wpsb96c6({}) 
    setgrp_wpsb96c6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cw_tab_initiate_authorize",
      ]
      }) 
        setgrp_eobed127({}) 
    setgrp_eobed127Props({
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
        setgrp_return_refundc4a03({}) 
    setgrp_return_refundc4a03Props({
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
        settabgroup_return_refund4e9b7({}) 
    settabgroup_return_refund4e9b7Props({
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
        settab_header_return_frm_agent2d327({}) 
    settab_header_return_frm_agent2d327Props({
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
        setgrp_retun_ref3e6e6({}) 
    setgrp_retun_ref3e6e6Props({
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
    
    settbl_return_fie_list8f636([]) 
    settbl_return_fie_list8f636Props({
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
        settab_header_req_for_refundeadd2({}) 
    settab_header_req_for_refundeadd2Props({
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
        setgrp_rr_retun_ref5362d({}) 
    setgrp_rr_retun_ref5362dProps({
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
    
    settbl_rr_req_for_refunde2c9a([]) 
    settbl_rr_req_for_refunde2c9aProps({
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
        setgrp_overall_tran_list10bd5({}) 
    setgrp_overall_tran_list10bd5Props({
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
    
    settbl_tran_list858ed([]) 
    settbl_tran_list858edProps({
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
        setgroup2e463({}) 
    setgroup2e463Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        setgrp_overall_tran_listc200a({}) 
    setgrp_overall_tran_listc200aProps({
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
    
    settbl_tran_list0634a([]) 
    settbl_tran_list0634aProps({
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
        setgroup64e07({}) 
    setgroup64e07Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason_dropdown",
            "return_reason_dropdown",
            "close",
            "save",
      ]
      }) 
        setgrp_wpsfa727({}) 
    setgrp_wpsfa727Props({
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
        setgrp_eob8dfac({}) 
    setgrp_eob8dfacProps({
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
        setgrp_enquiryd2b2a({}) 
    setgrp_enquiryd2b2aProps({
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
        settabgroup_return_refund511db({}) 
    settabgroup_return_refund511dbProps({
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
        settab_header_view_all_emp58f45({}) 
    settab_header_view_all_emp58f45Props({
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
        setgrp_retun_ref230e2({}) 
    setgrp_retun_ref230e2Props({
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
    
    settbl_vw_all_empr8a2a9([]) 
    settbl_vw_all_empr8a2a9Props({
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
        settab_headerview_all_tranaa773({}) 
    settab_headerview_all_tranaa773Props({
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
        setgrp_reqforref4f82e({}) 
    setgrp_reqforref4f82eProps({
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
    
    settbl_view_all_tran1b49d([]) 
    settbl_view_all_tran1b49dProps({
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
        setgrp_overall_tran_listfb644({}) 
    setgrp_overall_tran_listfb644Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back_up",
      ]
      }) 
    
    settbl_emplr_list3557a([]) 
    settbl_emplr_list3557aProps({
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
        setgrp_overall_employee_list350f4({}) 
    setgrp_overall_employee_list350f4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "btn_export_as_excel",
      ]
      }) 
    
    settbl_emp_sal_listf67ed([]) 
    settbl_emp_sal_listf67edProps({
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
        setgrp_emp_view_details7cca5({}) 
    setgrp_emp_view_details7cca5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_view_details",
            "divider",
      ]
      }) 
        setgrp_emp_details5bbf3({}) 
    setgrp_emp_details5bbf3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_emp_details",
            "lbl_s_channel_code",
            "lbl_s_leave",
            "lbl_s_inside_cntry",
            "channel_code",
            "total_leaves",
            "is_inside_country",
            "divider1",
            "lbl_s_sal_type",
            "lbl_s_wrk_emid",
            "lbl_s_pas_num",
            "salary_type",
            "lbl_wrk_emid",
            "employee_passport_number",
            "divider3",
            "lbl_s_cmp_code",
            "lbl_s_persn_code",
            "lbl_s_agntcode",
            "lbl_cmp_cde",
            "lbl_prsn_code",
            "agent_code",
            "divider2",
            "lbl_s_wrk_iban",
            "lbl_s_remarks",
            "employee_iban",
            "remarks",
      ]
      }) 
        setgrp_other_details0dea3({}) 
    setgrp_other_details0dea3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hdr_sal_details",
            "lbl_s_year",
            "lbl_s_prd",
            "lbl_s_frm_dte",
            "salary_year",
            "lbl_prd",
            "from_date",
            "divider4",
            "lbl_s_to_dte",
            "lbl_s_sal_pymt_date",
            "lbl_s_days_paid",
            "to_date",
            "lbl_file_id",
            "days_paid",
            "divider5",
            "lbl_s_fix_in",
            "lbl_s_in_var",
            "lbl_s_to_sal",
            "fixed_income",
            "variable_income",
            "total_salary",
            "divider6",
            "lbl_s_to_bene",
            "lbl_s_to_deduction",
            "lbl_s_to_allow",
            "total_benefits",
            "total_deductions",
            "total_allowance",
            "divider7",
            "lbl_s_to_incen",
            "total_incentives",
      ]
      }) 
        setgrp_overall_employee_list1c655({}) 
    setgrp_overall_employee_list1c655Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_back",
            "btn_export_as_excel",
      ]
      }) 
    
    settbl_emp_list2fa62([]) 
    settbl_emp_list2fa62Props({
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
        setsalary_file_overall_group144dd({}) 
    setsalary_file_overall_group144ddProps({
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
        settab_group12ca0({}) 
    settab_group12ca0Props({
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
        setdynamicatione8e04({}) 
    setdynamicatione8e04Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "btn_toggle",
            "btn_reg_moh",
            "reg_emplr_search",
            "search_btn",
      ]
      }) 
        setupdate_reg_employr_tab78f7d({}) 
    setupdate_reg_employr_tab78f7dProps({
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
        setupd_reg_group25c38({}) 
    setupd_reg_group25c38Props({
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
    
    setupd_reg_emplr_listd336e([]) 
    setupd_reg_emplr_listd336eProps({
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
        setreg_empr_tabb472c({}) 
    setreg_empr_tabb472cProps({
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
        setreg_emplr_group1073d({}) 
    setreg_emplr_group1073dProps({
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
    
    setemplr_list0e076([]) 
    setemplr_list0e076Props({
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
        setgroupfa4d0({}) 
    setgroupfa4d0Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "toggle_dropdown",
            "toggle_dropdown",
            "btn_cancel",
            "btn_confirm",
      ]
      }) 
        setgrp_wpsc6e49({}) 
    setgrp_wpsc6e49Props({
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
        setgrp_eob07ed4({}) 
    setgrp_eob07ed4Props({
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
        setgrp_enquiry759a6({}) 
    setgrp_enquiry759a6Props({
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
        settabgroup_dashboard0d387({}) 
    settabgroup_dashboard0d387Props({
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
        settab_header_view_all_failcb8d9({}) 
    settab_header_view_all_failcb8d9Props({
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
        setgrp_retun_ref84e8f({}) 
    setgrp_retun_ref84e8fProps({
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
    
    settbl_vw_all_failf2e05([]) 
    settbl_vw_all_failf2e05Props({
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
        settab_headerview_all_successdba67({}) 
    settab_headerview_all_successdba67Props({
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
        setgrp_reqforref8b4e3({}) 
    setgrp_reqforref8b4e3Props({
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
    
    settbl_view_all_successbc924([]) 
    settbl_view_all_successbc924Props({
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
        setfile_upload_groupfa783({}) 
    setfile_upload_groupfa783Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "icon",
            "success_text",
            "file_upload_success",
            "divider",
            "okk_btn",
      ]
      }) 
        setgrp_overallsif_list46e94({}) 
    setgrp_overallsif_list46e94Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text_head",
            "btn_search",
            "btn_export_as_excel",
      ]
      }) 
    
    settbl_sif_list592fc([]) 
    settbl_sif_list592fcProps({
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
        setmain_groupb2798({}) 
    setmain_groupb2798Props({
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
            "originalfilename",
            "sffilename",
            "employerid",
            "companyname",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        setgrp_overallsif_list6060c({}) 
    setgrp_overallsif_list6060cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "lbl_hear",
            "btn_search",
            "btn_export_as_excel",
      ]
      }) 
    
    settbl_pif_list653ae([]) 
    settbl_pif_list653aeProps({
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
        setmain_group0c058({}) 
    setmain_group0c058Props({
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
            "corporatename",
            "piffilename",
            "bottom_divider",
            "search",
            "clear",
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
        grp_wps7d0b0, 
        setgrp_wps7d0b0,
        grp_wps7d0b0Props, 
        setgrp_wps7d0b0Props,
        grp_eobedcde, 
        setgrp_eobedcde,
        grp_eobedcdeProps, 
        setgrp_eobedcdeProps,
        grp_wps_nack_failurecdb58, 
        setgrp_wps_nack_failurecdb58,
        grp_wps_nack_failurecdb58Props, 
        setgrp_wps_nack_failurecdb58Props,
        tabgroup_post_excep0d361, 
        settabgroup_post_excep0d361,
        tabgroup_post_excep0d361Props, 
        settabgroup_post_excep0d361Props,
        dashboard_tab_headercb15a, 
        setdashboard_tab_headercb15a,
        dashboard_tab_headercb15aProps, 
        setdashboard_tab_headercb15aProps,
        dash_tab_grp477aa, 
        setdash_tab_grp477aa,
        dash_tab_grp477aaProps, 
        setdash_tab_grp477aaProps,
        corporate_group92e02, 
        setcorporate_group92e02,
        corporate_group92e02Props, 
        setcorporate_group92e02Props,
        success_groupf3393, 
        setsuccess_groupf3393,
        success_groupf3393Props, 
        setsuccess_groupf3393Props,
        failure_group60ccc, 
        setfailure_group60ccc,
        failure_group60cccProps, 
        setfailure_group60cccProps,
        my_queue_group17a74, 
        setmy_queue_group17a74,
        my_queue_group17a74Props, 
        setmy_queue_group17a74Props,
        tab_overalla72da, 
        settab_overalla72da,
        tab_overalla72daProps, 
        settab_overalla72daProps,
        tab_all14848, 
        settab_all14848,
        tab_all14848Props, 
        settab_all14848Props,
        all_groupdc06f, 
        setall_groupdc06f,
        all_groupdc06fProps, 
        setall_groupdc06fProps,
        all_table9a484, 
        setall_table9a484,
        all_table9a484Props, 
        setall_table9a484Props,
        action_required_tab3b174, 
        setaction_required_tab3b174,
        action_required_tab3b174Props, 
        setaction_required_tab3b174Props,
        action_required_groupc490c, 
        setaction_required_groupc490c,
        action_required_groupc490cProps, 
        setaction_required_groupc490cProps,
        action_required_table0359e, 
        setaction_required_table0359e,
        action_required_table0359eProps, 
        setaction_required_table0359eProps,
        salary_return_refund_tabeaf18, 
        setsalary_return_refund_tabeaf18,
        salary_return_refund_tabeaf18Props, 
        setsalary_return_refund_tabeaf18Props,
        salary_return_refund_group9c3f2, 
        setsalary_return_refund_group9c3f2,
        salary_return_refund_group9c3f2Props, 
        setsalary_return_refund_group9c3f2Props,
        salary_return_refund_tablee81e8, 
        setsalary_return_refund_tablee81e8,
        salary_return_refund_tablee81e8Props, 
        setsalary_return_refund_tablee81e8Props,
        exception_tab1addc, 
        setexception_tab1addc,
        exception_tab1addcProps, 
        setexception_tab1addcProps,
        exception_group8bd2f, 
        setexception_group8bd2f,
        exception_group8bd2fProps, 
        setexception_group8bd2fProps,
        exception_table77afe, 
        setexception_table77afe,
        exception_table77afeProps, 
        setexception_table77afeProps,
        total_emp_group824bb, 
        settotal_emp_group824bb,
        total_emp_group824bbProps, 
        settotal_emp_group824bbProps,
        salary_process_groupe9737, 
        setsalary_process_groupe9737,
        salary_process_groupe9737Props, 
        setsalary_process_groupe9737Props,
        pie_chart_group31af3, 
        setpie_chart_group31af3,
        pie_chart_group31af3Props, 
        setpie_chart_group31af3Props,
        tab_header_wps_nack_failuref61a4, 
        settab_header_wps_nack_failuref61a4,
        tab_header_wps_nack_failuref61a4Props, 
        settab_header_wps_nack_failuref61a4Props,
        grp_employee_verify730a2, 
        setgrp_employee_verify730a2,
        grp_employee_verify730a2Props, 
        setgrp_employee_verify730a2Props,
        table_file_list44ec7, 
        settable_file_list44ec7,
        table_file_list44ec7Props, 
        settable_file_list44ec7Props,
        tab_header_wps_file_journey9bceb, 
        settab_header_wps_file_journey9bceb,
        tab_header_wps_file_journey9bcebProps, 
        settab_header_wps_file_journey9bcebProps,
        grp_overall_repair8807c, 
        setgrp_overall_repair8807c,
        grp_overall_repair8807cProps, 
        setgrp_overall_repair8807cProps,
        tbl_wps_file_journryabf3b, 
        settbl_wps_file_journryabf3b,
        tbl_wps_file_journryabf3bProps, 
        settbl_wps_file_journryabf3bProps,
        tab_header_posting_exceptionade8d, 
        settab_header_posting_exceptionade8d,
        tab_header_posting_exceptionade8dProps, 
        settab_header_posting_exceptionade8dProps,
        grp_overall_wps9c663, 
        setgrp_overall_wps9c663,
        grp_overall_wps9c663Props, 
        setgrp_overall_wps9c663Props,
        tbl_process_list752ff, 
        settbl_process_list752ff,
        tbl_process_list752ffProps, 
        settbl_process_list752ffProps,
        tbl_pos_file_lista1c83, 
        settbl_pos_file_lista1c83,
        tbl_pos_file_lista1c83Props, 
        settbl_pos_file_lista1c83Props,
        grp_overall_tran_list52636, 
        setgrp_overall_tran_list52636,
        grp_overall_tran_list52636Props, 
        setgrp_overall_tran_list52636Props,
        tbl_tran_list8df93, 
        settbl_tran_list8df93,
        tbl_tran_list8df93Props, 
        settbl_tran_list8df93Props,
        grp_msg_daatab68d6, 
        setgrp_msg_daatab68d6,
        grp_msg_daatab68d6Props, 
        setgrp_msg_daatab68d6Props,
        grp_msg_data_det0b014, 
        setgrp_msg_data_det0b014,
        grp_msg_data_det0b014Props, 
        setgrp_msg_data_det0b014Props,
        grp_overall_jrny_listc7a13, 
        setgrp_overall_jrny_listc7a13,
        grp_overall_jrny_listc7a13Props, 
        setgrp_overall_jrny_listc7a13Props,
        tbl_jrny_list1e9df, 
        settbl_jrny_list1e9df,
        tbl_jrny_list1e9dfProps, 
        settbl_jrny_list1e9dfProps,
        grp_overall_tran_jrny_list67aa9, 
        setgrp_overall_tran_jrny_list67aa9,
        grp_overall_tran_jrny_list67aa9Props, 
        setgrp_overall_tran_jrny_list67aa9Props,
        tbl_tran_jrny_list6d62f, 
        settbl_tran_jrny_list6d62f,
        tbl_tran_jrny_list6d62fProps, 
        settbl_tran_jrny_list6d62fProps,
        journey_details_group764b7, 
        setjourney_details_group764b7,
        journey_details_group764b7Props, 
        setjourney_details_group764b7Props,
        tbl_pos_ex_view_tran8df93, 
        settbl_pos_ex_view_tran8df93,
        tbl_pos_ex_view_tran8df93Props, 
        settbl_pos_ex_view_tran8df93Props,
        grp_wpsb96c6, 
        setgrp_wpsb96c6,
        grp_wpsb96c6Props, 
        setgrp_wpsb96c6Props,
        grp_eobed127, 
        setgrp_eobed127,
        grp_eobed127Props, 
        setgrp_eobed127Props,
        grp_return_refundc4a03, 
        setgrp_return_refundc4a03,
        grp_return_refundc4a03Props, 
        setgrp_return_refundc4a03Props,
        tabgroup_return_refund4e9b7, 
        settabgroup_return_refund4e9b7,
        tabgroup_return_refund4e9b7Props, 
        settabgroup_return_refund4e9b7Props,
        tab_header_return_frm_agent2d327, 
        settab_header_return_frm_agent2d327,
        tab_header_return_frm_agent2d327Props, 
        settab_header_return_frm_agent2d327Props,
        grp_retun_ref3e6e6, 
        setgrp_retun_ref3e6e6,
        grp_retun_ref3e6e6Props, 
        setgrp_retun_ref3e6e6Props,
        tbl_return_fie_list8f636, 
        settbl_return_fie_list8f636,
        tbl_return_fie_list8f636Props, 
        settbl_return_fie_list8f636Props,
        tab_header_req_for_refundeadd2, 
        settab_header_req_for_refundeadd2,
        tab_header_req_for_refundeadd2Props, 
        settab_header_req_for_refundeadd2Props,
        grp_rr_retun_ref5362d, 
        setgrp_rr_retun_ref5362d,
        grp_rr_retun_ref5362dProps, 
        setgrp_rr_retun_ref5362dProps,
        tbl_rr_req_for_refunde2c9a, 
        settbl_rr_req_for_refunde2c9a,
        tbl_rr_req_for_refunde2c9aProps, 
        settbl_rr_req_for_refunde2c9aProps,
        grp_overall_tran_list10bd5, 
        setgrp_overall_tran_list10bd5,
        grp_overall_tran_list10bd5Props, 
        setgrp_overall_tran_list10bd5Props,
        tbl_tran_list858ed, 
        settbl_tran_list858ed,
        tbl_tran_list858edProps, 
        settbl_tran_list858edProps,
        group2e463, 
        setgroup2e463,
        group2e463Props, 
        setgroup2e463Props,
        grp_overall_tran_listc200a, 
        setgrp_overall_tran_listc200a,
        grp_overall_tran_listc200aProps, 
        setgrp_overall_tran_listc200aProps,
        tbl_tran_list0634a, 
        settbl_tran_list0634a,
        tbl_tran_list0634aProps, 
        settbl_tran_list0634aProps,
        group64e07, 
        setgroup64e07,
        group64e07Props, 
        setgroup64e07Props,
        grp_wpsfa727, 
        setgrp_wpsfa727,
        grp_wpsfa727Props, 
        setgrp_wpsfa727Props,
        grp_eob8dfac, 
        setgrp_eob8dfac,
        grp_eob8dfacProps, 
        setgrp_eob8dfacProps,
        grp_enquiryd2b2a, 
        setgrp_enquiryd2b2a,
        grp_enquiryd2b2aProps, 
        setgrp_enquiryd2b2aProps,
        tabgroup_return_refund511db, 
        settabgroup_return_refund511db,
        tabgroup_return_refund511dbProps, 
        settabgroup_return_refund511dbProps,
        tab_header_view_all_emp58f45, 
        settab_header_view_all_emp58f45,
        tab_header_view_all_emp58f45Props, 
        settab_header_view_all_emp58f45Props,
        grp_retun_ref230e2, 
        setgrp_retun_ref230e2,
        grp_retun_ref230e2Props, 
        setgrp_retun_ref230e2Props,
        tbl_vw_all_empr8a2a9, 
        settbl_vw_all_empr8a2a9,
        tbl_vw_all_empr8a2a9Props, 
        settbl_vw_all_empr8a2a9Props,
        tab_headerview_all_tranaa773, 
        settab_headerview_all_tranaa773,
        tab_headerview_all_tranaa773Props, 
        settab_headerview_all_tranaa773Props,
        grp_reqforref4f82e, 
        setgrp_reqforref4f82e,
        grp_reqforref4f82eProps, 
        setgrp_reqforref4f82eProps,
        tbl_view_all_tran1b49d, 
        settbl_view_all_tran1b49d,
        tbl_view_all_tran1b49dProps, 
        settbl_view_all_tran1b49dProps,
        grp_overall_tran_listfb644, 
        setgrp_overall_tran_listfb644,
        grp_overall_tran_listfb644Props, 
        setgrp_overall_tran_listfb644Props,
        tbl_emplr_list3557a, 
        settbl_emplr_list3557a,
        tbl_emplr_list3557aProps, 
        settbl_emplr_list3557aProps,
        grp_overall_employee_list350f4, 
        setgrp_overall_employee_list350f4,
        grp_overall_employee_list350f4Props, 
        setgrp_overall_employee_list350f4Props,
        tbl_emp_sal_listf67ed, 
        settbl_emp_sal_listf67ed,
        tbl_emp_sal_listf67edProps, 
        settbl_emp_sal_listf67edProps,
        grp_emp_view_details7cca5, 
        setgrp_emp_view_details7cca5,
        grp_emp_view_details7cca5Props, 
        setgrp_emp_view_details7cca5Props,
        grp_emp_details5bbf3, 
        setgrp_emp_details5bbf3,
        grp_emp_details5bbf3Props, 
        setgrp_emp_details5bbf3Props,
        grp_other_details0dea3, 
        setgrp_other_details0dea3,
        grp_other_details0dea3Props, 
        setgrp_other_details0dea3Props,
        grp_overall_employee_list1c655, 
        setgrp_overall_employee_list1c655,
        grp_overall_employee_list1c655Props, 
        setgrp_overall_employee_list1c655Props,
        tbl_emp_list2fa62, 
        settbl_emp_list2fa62,
        tbl_emp_list2fa62Props, 
        settbl_emp_list2fa62Props,
        salary_file_overall_group144dd, 
        setsalary_file_overall_group144dd,
        salary_file_overall_group144ddProps, 
        setsalary_file_overall_group144ddProps,
        tab_group12ca0, 
        settab_group12ca0,
        tab_group12ca0Props, 
        settab_group12ca0Props,
        dynamicatione8e04, 
        setdynamicatione8e04,
        dynamicatione8e04Props, 
        setdynamicatione8e04Props,
        update_reg_employr_tab78f7d, 
        setupdate_reg_employr_tab78f7d,
        update_reg_employr_tab78f7dProps, 
        setupdate_reg_employr_tab78f7dProps,
        upd_reg_group25c38, 
        setupd_reg_group25c38,
        upd_reg_group25c38Props, 
        setupd_reg_group25c38Props,
        upd_reg_emplr_listd336e, 
        setupd_reg_emplr_listd336e,
        upd_reg_emplr_listd336eProps, 
        setupd_reg_emplr_listd336eProps,
        reg_empr_tabb472c, 
        setreg_empr_tabb472c,
        reg_empr_tabb472cProps, 
        setreg_empr_tabb472cProps,
        reg_emplr_group1073d, 
        setreg_emplr_group1073d,
        reg_emplr_group1073dProps, 
        setreg_emplr_group1073dProps,
        emplr_list0e076, 
        setemplr_list0e076,
        emplr_list0e076Props, 
        setemplr_list0e076Props,
        groupfa4d0, 
        setgroupfa4d0,
        groupfa4d0Props, 
        setgroupfa4d0Props,
        grp_wpsc6e49, 
        setgrp_wpsc6e49,
        grp_wpsc6e49Props, 
        setgrp_wpsc6e49Props,
        grp_eob07ed4, 
        setgrp_eob07ed4,
        grp_eob07ed4Props, 
        setgrp_eob07ed4Props,
        grp_enquiry759a6, 
        setgrp_enquiry759a6,
        grp_enquiry759a6Props, 
        setgrp_enquiry759a6Props,
        tabgroup_dashboard0d387, 
        settabgroup_dashboard0d387,
        tabgroup_dashboard0d387Props, 
        settabgroup_dashboard0d387Props,
        tab_header_view_all_failcb8d9, 
        settab_header_view_all_failcb8d9,
        tab_header_view_all_failcb8d9Props, 
        settab_header_view_all_failcb8d9Props,
        grp_retun_ref84e8f, 
        setgrp_retun_ref84e8f,
        grp_retun_ref84e8fProps, 
        setgrp_retun_ref84e8fProps,
        tbl_vw_all_failf2e05, 
        settbl_vw_all_failf2e05,
        tbl_vw_all_failf2e05Props, 
        settbl_vw_all_failf2e05Props,
        tab_headerview_all_successdba67, 
        settab_headerview_all_successdba67,
        tab_headerview_all_successdba67Props, 
        settab_headerview_all_successdba67Props,
        grp_reqforref8b4e3, 
        setgrp_reqforref8b4e3,
        grp_reqforref8b4e3Props, 
        setgrp_reqforref8b4e3Props,
        tbl_view_all_successbc924, 
        settbl_view_all_successbc924,
        tbl_view_all_successbc924Props, 
        settbl_view_all_successbc924Props,
        file_upload_groupfa783, 
        setfile_upload_groupfa783,
        file_upload_groupfa783Props, 
        setfile_upload_groupfa783Props,
        grp_overallsif_list46e94, 
        setgrp_overallsif_list46e94,
        grp_overallsif_list46e94Props, 
        setgrp_overallsif_list46e94Props,
        tbl_sif_list592fc, 
        settbl_sif_list592fc,
        tbl_sif_list592fcProps, 
        settbl_sif_list592fcProps,
        main_groupb2798, 
        setmain_groupb2798,
        main_groupb2798Props, 
        setmain_groupb2798Props,
        grp_overallsif_list6060c, 
        setgrp_overallsif_list6060c,
        grp_overallsif_list6060cProps, 
        setgrp_overallsif_list6060cProps,
        tbl_pif_list653ae, 
        settbl_pif_list653ae,
        tbl_pif_list653aeProps, 
        settbl_pif_list653aeProps,
        main_group0c058, 
        setmain_group0c058,
        main_group0c058Props, 
        setmain_group0c058Props,
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
        view_all_journeyd3ae9,
        setview_all_journeyd3ae9, 
        view_all_journeyd3ae9Props,
        setview_all_journeyd3ae9Props,
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
        failure_queue_journeyc8638,
        setfailure_queue_journeyc8638, 
        failure_queue_journeyc8638Props,
        setfailure_queue_journeyc8638Props,
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
        success_queue_journey68ac9,
        setsuccess_queue_journey68ac9, 
        success_queue_journey68ac9Props,
        setsuccess_queue_journey68ac9Props,
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
        return_queue_journeycc9d3,
        setreturn_queue_journeycc9d3, 
        return_queue_journeycc9d3Props,
        setreturn_queue_journeycc9d3Props,
        product_code_operational_pending6ecd4,
        setproduct_code_operational_pending6ecd4, 
        product_code_operational_pending6ecd4Props,
        setproduct_code_operational_pending6ecd4Props,
        channel_name_operational_pending2ab87,
        setchannel_name_operational_pending2ab87, 
        channel_name_operational_pending2ab87Props,
        setchannel_name_operational_pending2ab87Props,
        uuid_operational_pendinga8ff6,
        setuuid_operational_pendinga8ff6, 
        uuid_operational_pendinga8ff6Props,
        setuuid_operational_pendinga8ff6Props,
        dr_account_operational_pending5146b,
        setdr_account_operational_pending5146b, 
        dr_account_operational_pending5146bProps,
        setdr_account_operational_pending5146bProps,
        dr_amount_operational_pending70e3f,
        setdr_amount_operational_pending70e3f, 
        dr_amount_operational_pending70e3fProps,
        setdr_amount_operational_pending70e3fProps,
        cr_account_operational_pendingf9a9c,
        setcr_account_operational_pendingf9a9c, 
        cr_account_operational_pendingf9a9cProps,
        setcr_account_operational_pendingf9a9cProps,
        cr_amount_operational_pendingbce21,
        setcr_amount_operational_pendingbce21, 
        cr_amount_operational_pendingbce21Props,
        setcr_amount_operational_pendingbce21Props,
        remittance_info_operational_pending282bc,
        setremittance_info_operational_pending282bc, 
        remittance_info_operational_pending282bcProps,
        setremittance_info_operational_pending282bcProps,
        status_operational_pending0df81,
        setstatus_operational_pending0df81, 
        status_operational_pending0df81Props,
        setstatus_operational_pending0df81Props,
        new_payment_chk_approve_btn770f9,
        setnew_payment_chk_approve_btn770f9, 
        new_payment_chk_approve_btn770f9Props,
        setnew_payment_chk_approve_btn770f9Props,
        new_payment_chk_reject_btn4c9a0,
        setnew_payment_chk_reject_btn4c9a0, 
        new_payment_chk_reject_btn4c9a0Props,
        setnew_payment_chk_reject_btn4c9a0Props,
        operational_pending_journey1a1a5,
        setoperational_pending_journey1a1a5, 
        operational_pending_journey1a1a5Props,
        setoperational_pending_journey1a1a5Props,
        product_code_technical_pending11fe0,
        setproduct_code_technical_pending11fe0, 
        product_code_technical_pending11fe0Props,
        setproduct_code_technical_pending11fe0Props,
        channel_name_technical_pendinge182f,
        setchannel_name_technical_pendinge182f, 
        channel_name_technical_pendinge182fProps,
        setchannel_name_technical_pendinge182fProps,
        uuid_technical_pendingbc6bb,
        setuuid_technical_pendingbc6bb, 
        uuid_technical_pendingbc6bbProps,
        setuuid_technical_pendingbc6bbProps,
        dr_account_technical_pendingbc856,
        setdr_account_technical_pendingbc856, 
        dr_account_technical_pendingbc856Props,
        setdr_account_technical_pendingbc856Props,
        dr_amount_technical_pending5e6cc,
        setdr_amount_technical_pending5e6cc, 
        dr_amount_technical_pending5e6ccProps,
        setdr_amount_technical_pending5e6ccProps,
        cr_account_technical_pending3c4aa,
        setcr_account_technical_pending3c4aa, 
        cr_account_technical_pending3c4aaProps,
        setcr_account_technical_pending3c4aaProps,
        cr_amount_technical_pending1bc34,
        setcr_amount_technical_pending1bc34, 
        cr_amount_technical_pending1bc34Props,
        setcr_amount_technical_pending1bc34Props,
        remittance_info_technical_pending78349,
        setremittance_info_technical_pending78349, 
        remittance_info_technical_pending78349Props,
        setremittance_info_technical_pending78349Props,
        status_technical_pending738a2,
        setstatus_technical_pending738a2, 
        status_technical_pending738a2Props,
        setstatus_technical_pending738a2Props,
        technical_pending_journey6601c,
        settechnical_pending_journey6601c, 
        technical_pending_journey6601cProps,
        settechnical_pending_journey6601cProps,
        search_label27572,
        setsearch_label27572, 
        search_label27572Props,
        setsearch_label27572Props,
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
        details_labelb25b2,
        setdetails_labelb25b2, 
        details_labelb25b2Props,
        setdetails_labelb25b2Props,
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
        msg_data_label7b760,
        setmsg_data_label7b760, 
        msg_data_label7b760Props,
        setmsg_data_label7b760Props,
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
        transaction_log_label7b760,
        settransaction_log_label7b760, 
        transaction_log_label7b760Props,
        settransaction_log_label7b760Props,
        req_jsonviewer8d071,
        setreq_jsonviewer8d071, 
        req_jsonviewer8d071Props,
        setreq_jsonviewer8d071Props,
        res_jsonviewerdd261,
        setres_jsonviewerdd261, 
        res_jsonviewerdd261Props,
        setres_jsonviewerdd261Props,
        mol_number_textcda45,
        setmol_number_textcda45, 
        mol_number_textcda45Props,
        setmol_number_textcda45Props,
        mol_comboboxe2955,
        setmol_comboboxe2955, 
        mol_comboboxe2955Props,
        setmol_comboboxe2955Props,
        corporate_label34daf,
        setcorporate_label34daf, 
        corporate_label34dafProps,
        setcorporate_label34dafProps,
        parent_company_header79ceb,
        setparent_company_header79ceb, 
        parent_company_header79cebProps,
        setparent_company_header79cebProps,
        parent_company_text27062,
        setparent_company_text27062, 
        parent_company_text27062Props,
        setparent_company_text27062Props,
        company_headerb144a,
        setcompany_headerb144a, 
        company_headerb144aProps,
        setcompany_headerb144aProps,
        company_text49f48,
        setcompany_text49f48, 
        company_text49f48Props,
        setcompany_text49f48Props,
        branch_header75c0b,
        setbranch_header75c0b, 
        branch_header75c0bProps,
        setbranch_header75c0bProps,
        branch_text2d7af,
        setbranch_text2d7af, 
        branch_text2d7afProps,
        setbranch_text2d7afProps,
        success_headera7cd1,
        setsuccess_headera7cd1, 
        success_headera7cd1Props,
        setsuccess_headera7cd1Props,
        icon_success2f16c,
        seticon_success2f16c, 
        icon_success2f16cProps,
        seticon_success2f16cProps,
        wps_text64263,
        setwps_text64263, 
        wps_text64263Props,
        setwps_text64263Props,
        wps_value_text0da25,
        setwps_value_text0da25, 
        wps_value_text0da25Props,
        setwps_value_text0da25Props,
        non_wps_textcb8a4,
        setnon_wps_textcb8a4, 
        non_wps_textcb8a4Props,
        setnon_wps_textcb8a4Props,
        non_wps_value_text11cd8,
        setnon_wps_value_text11cd8, 
        non_wps_value_text11cd8Props,
        setnon_wps_value_text11cd8Props,
        paid_succes_texte33d6,
        setpaid_succes_texte33d6, 
        paid_succes_texte33d6Props,
        setpaid_succes_texte33d6Props,
        failure_header2ed10,
        setfailure_header2ed10, 
        failure_header2ed10Props,
        setfailure_header2ed10Props,
        icon_failure5acb0,
        seticon_failure5acb0, 
        icon_failure5acb0Props,
        seticon_failure5acb0Props,
        wps_failure_text00f07,
        setwps_failure_text00f07, 
        wps_failure_text00f07Props,
        setwps_failure_text00f07Props,
        wps_failure_value_text26223,
        setwps_failure_value_text26223, 
        wps_failure_value_text26223Props,
        setwps_failure_value_text26223Props,
        non_wps_failure_text50cef,
        setnon_wps_failure_text50cef, 
        non_wps_failure_text50cefProps,
        setnon_wps_failure_text50cefProps,
        non_wps_failure_value_textb39fe,
        setnon_wps_failure_value_textb39fe, 
        non_wps_failure_value_textb39feProps,
        setnon_wps_failure_value_textb39feProps,
        paid_failure_text3db75,
        setpaid_failure_text3db75, 
        paid_failure_text3db75Props,
        setpaid_failure_text3db75Props,
        salary_type_textf8cc1,
        setsalary_type_textf8cc1, 
        salary_type_textf8cc1Props,
        setsalary_type_textf8cc1Props,
        month_texte777a,
        setmonth_texte777a, 
        month_texte777aProps,
        setmonth_texte777aProps,
        year_text0fd6b,
        setyear_text0fd6b, 
        year_text0fd6bProps,
        setyear_text0fd6bProps,
        salary_type_comboboxfe6ab,
        setsalary_type_comboboxfe6ab, 
        salary_type_comboboxfe6abProps,
        setsalary_type_comboboxfe6abProps,
        month_combobox36b46,
        setmonth_combobox36b46, 
        month_combobox36b46Props,
        setmonth_combobox36b46Props,
        year_comboboxf59eb,
        setyear_comboboxf59eb, 
        year_comboboxf59ebProps,
        setyear_comboboxf59ebProps,
        my_queue_icon1d19c,
        setmy_queue_icon1d19c, 
        my_queue_icon1d19cProps,
        setmy_queue_icon1d19cProps,
        my_queue_labelae911,
        setmy_queue_labelae911, 
        my_queue_labelae911Props,
        setmy_queue_labelae911Props,
        process58458,
        setprocess58458, 
        process58458Props,
        setprocess58458Props,
        file_count6d7a3,
        setfile_count6d7a3, 
        file_count6d7a3Props,
        setfile_count6d7a3Props,
        record_count989b2,
        setrecord_count989b2, 
        record_count989b2Props,
        setrecord_count989b2Props,
        process5248d,
        setprocess5248d, 
        process5248dProps,
        setprocess5248dProps,
        file_count12835,
        setfile_count12835, 
        file_count12835Props,
        setfile_count12835Props,
        record_count93af3,
        setrecord_count93af3, 
        record_count93af3Props,
        setrecord_count93af3Props,
        process3627b,
        setprocess3627b, 
        process3627bProps,
        setprocess3627bProps,
        file_counte79a4,
        setfile_counte79a4, 
        file_counte79a4Props,
        setfile_counte79a4Props,
        record_count06b83,
        setrecord_count06b83, 
        record_count06b83Props,
        setrecord_count06b83Props,
        process08e53,
        setprocess08e53, 
        process08e53Props,
        setprocess08e53Props,
        file_count6f5f9,
        setfile_count6f5f9, 
        file_count6f5f9Props,
        setfile_count6f5f9Props,
        record_count7fa24,
        setrecord_count7fa24, 
        record_count7fa24Props,
        setrecord_count7fa24Props,
        total_employees_labelbe128,
        settotal_employees_labelbe128, 
        total_employees_labelbe128Props,
        settotal_employees_labelbe128Props,
        total_emp_barchartc0370,
        settotal_emp_barchartc0370, 
        total_emp_barchartc0370Props,
        settotal_emp_barchartc0370Props,
        salary_processed_label39115,
        setsalary_processed_label39115, 
        salary_processed_label39115Props,
        setsalary_processed_label39115Props,
        salary_barcharteedc3,
        setsalary_barcharteedc3, 
        salary_barcharteedc3Props,
        setsalary_barcharteedc3Props,
        piechart155d5,
        setpiechart155d5, 
        piechart155d5Props,
        setpiechart155d5Props,
        btn_nack_view_transaction0510e,
        setbtn_nack_view_transaction0510e, 
        btn_nack_view_transaction0510eProps,
        setbtn_nack_view_transaction0510eProps,
        col_source_name72b56,
        setcol_source_name72b56, 
        col_source_name72b56Props,
        setcol_source_name72b56Props,
        col_source_uuid1755c,
        setcol_source_uuid1755c, 
        col_source_uuid1755cProps,
        setcol_source_uuid1755cProps,
        col_file_typeea095,
        setcol_file_typeea095, 
        col_file_typeea095Props,
        setcol_file_typeea095Props,
        col_sal_file5dee0,
        setcol_sal_file5dee0, 
        col_sal_file5dee0Props,
        setcol_sal_file5dee0Props,
        col_processing_monthb1bbd,
        setcol_processing_monthb1bbd, 
        col_processing_monthb1bbdProps,
        setcol_processing_monthb1bbdProps,
        btn_journey_summary_list7c5fe,
        setbtn_journey_summary_list7c5fe, 
        btn_journey_summary_list7c5feProps,
        setbtn_journey_summary_list7c5feProps,
        col_tot_sal8529c,
        setcol_tot_sal8529c, 
        col_tot_sal8529cProps,
        setcol_tot_sal8529cProps,
        col_processe61a0,
        setcol_processe61a0, 
        col_processe61a0Props,
        setcol_processe61a0Props,
        col_po_file_namee2783,
        setcol_po_file_namee2783, 
        col_po_file_namee2783Props,
        setcol_po_file_namee2783Props,
        col_po_tran_count2921e,
        setcol_po_tran_count2921e, 
        col_po_tran_count2921eProps,
        setcol_po_tran_count2921eProps,
        btn_view_transactionb2844,
        setbtn_view_transactionb2844, 
        btn_view_transactionb2844Props,
        setbtn_view_transactionb2844Props,
        col_po_empr_molc2f22,
        setcol_po_empr_molc2f22, 
        col_po_empr_molc2f22Props,
        setcol_po_empr_molc2f22Props,
        col_po_fix_sal2aefb,
        setcol_po_fix_sal2aefb, 
        col_po_fix_sal2aefbProps,
        setcol_po_fix_sal2aefbProps,
        col_var_amnt70cb5,
        setcol_var_amnt70cb5, 
        col_var_amnt70cb5Props,
        setcol_var_amnt70cb5Props,
        col_po_tot_amnt9842a,
        setcol_po_tot_amnt9842a, 
        col_po_tot_amnt9842aProps,
        setcol_po_tot_amnt9842aProps,
        col_po_charges3c1af,
        setcol_po_charges3c1af, 
        col_po_charges3c1afProps,
        setcol_po_charges3c1afProps,
        btn_retryb08fa,
        setbtn_retryb08fa, 
        btn_retryb08faProps,
        setbtn_retryb08faProps,
        btn_already_posted0734c,
        setbtn_already_posted0734c, 
        btn_already_posted0734cProps,
        setbtn_already_posted0734cProps,
        col_process_type35ae5,
        setcol_process_type35ae5, 
        col_process_type35ae5Props,
        setcol_process_type35ae5Props,
        col_file_name06356,
        setcol_file_name06356, 
        col_file_name06356Props,
        setcol_file_name06356Props,
        col_tran_iddff78,
        setcol_tran_iddff78, 
        col_tran_iddff78Props,
        setcol_tran_iddff78Props,
        col_sal_file_namee8195,
        setcol_sal_file_namee8195, 
        col_sal_file_namee8195Props,
        setcol_sal_file_namee8195Props,
        col_file_type43a43,
        setcol_file_type43a43, 
        col_file_type43a43Props,
        setcol_file_type43a43Props,
        col_created_date8dd2c,
        setcol_created_date8dd2c, 
        col_created_date8dd2cProps,
        setcol_created_date8dd2cProps,
        btn_view_data6dcf1,
        setbtn_view_data6dcf1, 
        btn_view_data6dcf1Props,
        setbtn_view_data6dcf1Props,
        col_vgphe_id3cf81,
        setcol_vgphe_id3cf81, 
        col_vgphe_id3cf81Props,
        setcol_vgphe_id3cf81Props,
        btn_back80553,
        setbtn_back80553, 
        btn_back80553Props,
        setbtn_back80553Props,
        hdr_msg_data030c2,
        sethdr_msg_data030c2, 
        hdr_msg_data030c2Props,
        sethdr_msg_data030c2Props,
        divider590d5,
        setdivider590d5, 
        divider590d5Props,
        setdivider590d5Props,
        hdr_infoed594,
        sethdr_infoed594, 
        hdr_infoed594Props,
        sethdr_infoed594Props,
        msg_xmlviewera94fb,
        setmsg_xmlviewera94fb, 
        msg_xmlviewera94fbProps,
        setmsg_xmlviewera94fbProps,
        divider37feba,
        setdivider37feba, 
        divider37febaProps,
        setdivider37febaProps,
        btn_okay0c912,
        setbtn_okay0c912, 
        btn_okay0c912Props,
        setbtn_okay0c912Props,
        col_sal_filee0c17,
        setcol_sal_filee0c17, 
        col_sal_filee0c17Props,
        setcol_sal_filee0c17Props,
        col_src_namee72b4,
        setcol_src_namee72b4, 
        col_src_namee72b4Props,
        setcol_src_namee72b4Props,
        col_prcs_namee094a,
        setcol_prcs_namee094a, 
        col_prcs_namee094aProps,
        setcol_prcs_namee094aProps,
        col_step900de,
        setcol_step900de, 
        col_step900deProps,
        setcol_step900deProps,
        col_tran_count32ab4,
        setcol_tran_count32ab4, 
        col_tran_count32ab4Props,
        setcol_tran_count32ab4Props,
        btn_view_transactionda729,
        setbtn_view_transactionda729, 
        btn_view_transactionda729Props,
        setbtn_view_transactionda729Props,
        col_vgphe_idf0700,
        setcol_vgphe_idf0700, 
        col_vgphe_idf0700Props,
        setcol_vgphe_idf0700Props,
        btn_back183b3,
        setbtn_back183b3, 
        btn_back183b3Props,
        setbtn_back183b3Props,
        btn_back886c3,
        setbtn_back886c3, 
        btn_back886c3Props,
        setbtn_back886c3Props,
        col_sal_file1c7b1,
        setcol_sal_file1c7b1, 
        col_sal_file1c7b1Props,
        setcol_sal_file1c7b1Props,
        col_source_name34913,
        setcol_source_name34913, 
        col_source_name34913Props,
        setcol_source_name34913Props,
        col_process_name31fa1,
        setcol_process_name31fa1, 
        col_process_name31fa1Props,
        setcol_process_name31fa1Props,
        col_process3a817,
        setcol_process3a817, 
        col_process3a817Props,
        setcol_process3a817Props,
        col_created_date35d64,
        setcol_created_date35d64, 
        col_created_date35d64Props,
        setcol_created_date35d64Props,
        btn_view_data0ca2b,
        setbtn_view_data0ca2b, 
        btn_view_data0ca2bProps,
        setbtn_view_data0ca2bProps,
        col_stepee23d,
        setcol_stepee23d, 
        col_stepee23dProps,
        setcol_stepee23dProps,
        col_tran_uuidce7f9,
        setcol_tran_uuidce7f9, 
        col_tran_uuidce7f9Props,
        setcol_tran_uuidce7f9Props,
        col_status4cffe,
        setcol_status4cffe, 
        col_status4cffeProps,
        setcol_status4cffeProps,
        btn_view_journeydb055,
        setbtn_view_journeydb055, 
        btn_view_journeydb055Props,
        setbtn_view_journeydb055Props,
        trn_jrny23739,
        settrn_jrny23739, 
        trn_jrny23739Props,
        settrn_jrny23739Props,
        details_labelaa81c,
        setdetails_labelaa81c, 
        details_labelaa81cProps,
        setdetails_labelaa81cProps,
        divider_topb49bf,
        setdivider_topb49bf, 
        divider_topb49bfProps,
        setdivider_topb49bfProps,
        l_file_name7a6bd,
        setl_file_name7a6bd, 
        l_file_name7a6bdProps,
        setl_file_name7a6bdProps,
        l_emp_mol8c2e1,
        setl_emp_mol8c2e1, 
        l_emp_mol8c2e1Props,
        setl_emp_mol8c2e1Props,
        file_nameebc26,
        setfile_nameebc26, 
        file_nameebc26Props,
        setfile_nameebc26Props,
        empl_mold6666,
        setempl_mold6666, 
        empl_mold6666Props,
        setempl_mold6666Props,
        l_fixed_amont9c6be,
        setl_fixed_amont9c6be, 
        l_fixed_amont9c6beProps,
        setl_fixed_amont9c6beProps,
        l_variable_amount98c92,
        setl_variable_amount98c92, 
        l_variable_amount98c92Props,
        setl_variable_amount98c92Props,
        fixed_amot7ca4c,
        setfixed_amot7ca4c, 
        fixed_amot7ca4cProps,
        setfixed_amot7ca4cProps,
        var_amontdd609,
        setvar_amontdd609, 
        var_amontdd609Props,
        setvar_amontdd609Props,
        l_charge_amount53cd9,
        setl_charge_amount53cd9, 
        l_charge_amount53cd9Props,
        setl_charge_amount53cd9Props,
        l_agent_routing_code9af99,
        setl_agent_routing_code9af99, 
        l_agent_routing_code9af99Props,
        setl_agent_routing_code9af99Props,
        charge_amnt64cb4,
        setcharge_amnt64cb4, 
        charge_amnt64cb4Props,
        setcharge_amnt64cb4Props,
        agent_routng_codee5a1e,
        setagent_routng_codee5a1e, 
        agent_routng_codee5a1eProps,
        setagent_routng_codee5a1eProps,
        l_processing_system553cb,
        setl_processing_system553cb, 
        l_processing_system553cbProps,
        setl_processing_system553cbProps,
        l_tran_categoryaa4a1,
        setl_tran_categoryaa4a1, 
        l_tran_categoryaa4a1Props,
        setl_tran_categoryaa4a1Props,
        process_system9b66e,
        setprocess_system9b66e, 
        process_system9b66eProps,
        setprocess_system9b66eProps,
        tran_catey46647,
        settran_catey46647, 
        tran_catey46647Props,
        settran_catey46647Props,
        divider_bottom02761,
        setdivider_bottom02761, 
        divider_bottom02761Props,
        setdivider_bottom02761Props,
        view_msg_data_btn2563b,
        setview_msg_data_btn2563b, 
        view_msg_data_btn2563bProps,
        setview_msg_data_btn2563bProps,
        view_tran_log_btn00416,
        setview_tran_log_btn00416, 
        view_tran_log_btn00416Props,
        setview_tran_log_btn00416Props,
        customwidget84bb0,
        setcustomwidget84bb0, 
        customwidget84bb0Props,
        setcustomwidget84bb0Props,
        btn_alredy_postedf023e,
        setbtn_alredy_postedf023e, 
        btn_alredy_postedf023eProps,
        setbtn_alredy_postedf023eProps,
        col_source_name06356,
        setcol_source_name06356, 
        col_source_name06356Props,
        setcol_source_name06356Props,
        col_vph_ref_iddff78,
        setcol_vph_ref_iddff78, 
        col_vph_ref_iddff78Props,
        setcol_vph_ref_iddff78Props,
        col_emp_namee8195,
        setcol_emp_namee8195, 
        col_emp_namee8195Props,
        setcol_emp_namee8195Props,
        col_cr_ac_no43a43,
        setcol_cr_ac_no43a43, 
        col_cr_ac_no43a43Props,
        setcol_cr_ac_no43a43Props,
        col_fixed_amnt8dd2c,
        setcol_fixed_amnt8dd2c, 
        col_fixed_amnt8dd2cProps,
        setcol_fixed_amnt8dd2cProps,
        btn_retry6dcf1,
        setbtn_retry6dcf1, 
        btn_retry6dcf1Props,
        setbtn_retry6dcf1Props,
        col_var_amnt3cf81,
        setcol_var_amnt3cf81, 
        col_var_amnt3cf81Props,
        setcol_var_amnt3cf81Props,
        col_tot_amnt3dd6f,
        setcol_tot_amnt3dd6f, 
        col_tot_amnt3dd6fProps,
        setcol_tot_amnt3dd6fProps,
        col_src_file_name0456e,
        setcol_src_file_name0456e, 
        col_src_file_name0456eProps,
        setcol_src_file_name0456eProps,
        col_src_namee7c6a,
        setcol_src_namee7c6a, 
        col_src_namee7c6aProps,
        setcol_src_namee7c6aProps,
        col_tran_count3ad7d,
        setcol_tran_count3ad7d, 
        col_tran_count3ad7dProps,
        setcol_tran_count3ad7dProps,
        btn_rr_view_tran772a2,
        setbtn_rr_view_tran772a2, 
        btn_rr_view_tran772a2Props,
        setbtn_rr_view_tran772a2Props,
        col_fixed_amnt007c9,
        setcol_fixed_amnt007c9, 
        col_fixed_amnt007c9Props,
        setcol_fixed_amnt007c9Props,
        col_var_amntdff09,
        setcol_var_amntdff09, 
        col_var_amntdff09Props,
        setcol_var_amntdff09Props,
        col_tot_file_amnt9fdc3,
        setcol_tot_file_amnt9fdc3, 
        col_tot_file_amnt9fdc3Props,
        setcol_tot_file_amnt9fdc3Props,
        col_created_datef8d57,
        setcol_created_datef8d57, 
        col_created_datef8d57Props,
        setcol_created_datef8d57Props,
        col_sf_file_name809f4,
        setcol_sf_file_name809f4, 
        col_sf_file_name809f4Props,
        setcol_sf_file_name809f4Props,
        col_rr_src_nameaf109,
        setcol_rr_src_nameaf109, 
        col_rr_src_nameaf109Props,
        setcol_rr_src_nameaf109Props,
        col_rr_tran_count17c14,
        setcol_rr_tran_count17c14, 
        col_rr_tran_count17c14Props,
        setcol_rr_tran_count17c14Props,
        btn_rrefu_view_tran3e7fb,
        setbtn_rrefu_view_tran3e7fb, 
        btn_rrefu_view_tran3e7fbProps,
        setbtn_rrefu_view_tran3e7fbProps,
        col_rr_fixed_amnt55eca,
        setcol_rr_fixed_amnt55eca, 
        col_rr_fixed_amnt55ecaProps,
        setcol_rr_fixed_amnt55ecaProps,
        col_rr_var_amnt9bab1,
        setcol_rr_var_amnt9bab1, 
        col_rr_var_amnt9bab1Props,
        setcol_rr_var_amnt9bab1Props,
        col_rr_tot_file_amnt074c8,
        setcol_rr_tot_file_amnt074c8, 
        col_rr_tot_file_amnt074c8Props,
        setcol_rr_tot_file_amnt074c8Props,
        col_rr_created_date9c266,
        setcol_rr_created_date9c266, 
        col_rr_created_date9c266Props,
        setcol_rr_created_date9c266Props,
        col_rr_sf_file_named6334,
        setcol_rr_sf_file_named6334, 
        col_rr_sf_file_named6334Props,
        setcol_rr_sf_file_named6334Props,
        cw_tab_initiate_authorize1fdcd,
        setcw_tab_initiate_authorize1fdcd, 
        cw_tab_initiate_authorize1fdcdProps,
        setcw_tab_initiate_authorize1fdcdProps,
        col_emp_mole4029,
        setcol_emp_mole4029, 
        col_emp_mole4029Props,
        setcol_emp_mole4029Props,
        col_emp_name32c92,
        setcol_emp_name32c92, 
        col_emp_name32c92Props,
        setcol_emp_name32c92Props,
        col_cr_acc_no42627,
        setcol_cr_acc_no42627, 
        col_cr_acc_no42627Props,
        setcol_cr_acc_no42627Props,
        col_fixed_amntd6d44,
        setcol_fixed_amntd6d44, 
        col_fixed_amntd6d44Props,
        setcol_fixed_amntd6d44Props,
        col_var_amnt53ea2,
        setcol_var_amnt53ea2, 
        col_var_amnt53ea2Props,
        setcol_var_amnt53ea2Props,
        col_tot_tran_amnta3392,
        setcol_tot_tran_amnta3392, 
        col_tot_tran_amnta3392Props,
        setcol_tot_tran_amnta3392Props,
        col_created_dateea4ac,
        setcol_created_dateea4ac, 
        col_created_dateea4acProps,
        setcol_created_dateea4acProps,
        col_sf_file_name36fc1,
        setcol_sf_file_name36fc1, 
        col_sf_file_name36fc1Props,
        setcol_sf_file_name36fc1Props,
        col_rsn_codef367b,
        setcol_rsn_codef367b, 
        col_rsn_codef367bProps,
        setcol_rsn_codef367bProps,
        btn_initiate71727,
        setbtn_initiate71727, 
        btn_initiate71727Props,
        setbtn_initiate71727Props,
        col_uuida83f1,
        setcol_uuida83f1, 
        col_uuida83f1Props,
        setcol_uuida83f1Props,
        btn_authorizefce56,
        setbtn_authorizefce56, 
        btn_authorizefce56Props,
        setbtn_authorizefce56Props,
        btn_back16e28,
        setbtn_back16e28, 
        btn_back16e28Props,
        setbtn_back16e28Props,
        return_reason_dropdown59fcb,
        setreturn_reason_dropdown59fcb, 
        return_reason_dropdown59fcbProps,
        setreturn_reason_dropdown59fcbProps,
        close969c9,
        setclose969c9, 
        close969c9Props,
        setclose969c9Props,
        save99ff4,
        setsave99ff4, 
        save99ff4Props,
        setsave99ff4Props,
        col_emp_mol35ce2,
        setcol_emp_mol35ce2, 
        col_emp_mol35ce2Props,
        setcol_emp_mol35ce2Props,
        col_emp_name53515,
        setcol_emp_name53515, 
        col_emp_name53515Props,
        setcol_emp_name53515Props,
        col_cr_acc_no519d3,
        setcol_cr_acc_no519d3, 
        col_cr_acc_no519d3Props,
        setcol_cr_acc_no519d3Props,
        col_fixed_amnt0743c,
        setcol_fixed_amnt0743c, 
        col_fixed_amnt0743cProps,
        setcol_fixed_amnt0743cProps,
        col_var_amnt25d0d,
        setcol_var_amnt25d0d, 
        col_var_amnt25d0dProps,
        setcol_var_amnt25d0dProps,
        col_tot_tran_amnt1acc3,
        setcol_tot_tran_amnt1acc3, 
        col_tot_tran_amnt1acc3Props,
        setcol_tot_tran_amnt1acc3Props,
        col_created_date5679d,
        setcol_created_date5679d, 
        col_created_date5679dProps,
        setcol_created_date5679dProps,
        col_sf_file_namebaf46,
        setcol_sf_file_namebaf46, 
        col_sf_file_namebaf46Props,
        setcol_sf_file_namebaf46Props,
        col_rsn_codeaa610,
        setcol_rsn_codeaa610, 
        col_rsn_codeaa610Props,
        setcol_rsn_codeaa610Props,
        btn_initiate6f8a7,
        setbtn_initiate6f8a7, 
        btn_initiate6f8a7Props,
        setbtn_initiate6f8a7Props,
        col_uuid8350f,
        setcol_uuid8350f, 
        col_uuid8350fProps,
        setcol_uuid8350fProps,
        btn_authorize7ae96,
        setbtn_authorize7ae96, 
        btn_authorize7ae96Props,
        setbtn_authorize7ae96Props,
        btn_back41a76,
        setbtn_back41a76, 
        btn_back41a76Props,
        setbtn_back41a76Props,
        return_reason_dropdown233e0,
        setreturn_reason_dropdown233e0, 
        return_reason_dropdown233e0Props,
        setreturn_reason_dropdown233e0Props,
        closef8f97,
        setclosef8f97, 
        closef8f97Props,
        setclosef8f97Props,
        save89f56,
        setsave89f56, 
        save89f56Props,
        setsave89f56Props,
        col_cor_mold12cb,
        setcol_cor_mold12cb, 
        col_cor_mold12cbProps,
        setcol_cor_mold12cbProps,
        col_cor_namw4bb17,
        setcol_cor_namw4bb17, 
        col_cor_namw4bb17Props,
        setcol_cor_namw4bb17Props,
        btn_get_reg_emprb999a,
        setbtn_get_reg_emprb999a, 
        btn_get_reg_emprb999aProps,
        setbtn_get_reg_emprb999aProps,
        col_cor_reg_idf2c18,
        setcol_cor_reg_idf2c18, 
        col_cor_reg_idf2c18Props,
        setcol_cor_reg_idf2c18Props,
        col_cor_eidcba45,
        setcol_cor_eidcba45, 
        col_cor_eidcba45Props,
        setcol_cor_eidcba45Props,
        col_mh_sts9087c,
        setcol_mh_sts9087c, 
        col_mh_sts9087cProps,
        setcol_mh_sts9087cProps,
        btn_empr_rpt13ff7,
        setbtn_empr_rpt13ff7, 
        btn_empr_rpt13ff7Props,
        setbtn_empr_rpt13ff7Props,
        btn_empr_status5b036,
        setbtn_empr_status5b036, 
        btn_empr_status5b036Props,
        setbtn_empr_status5b036Props,
        btn_getemployes2c08a,
        setbtn_getemployes2c08a, 
        btn_getemployes2c08aProps,
        setbtn_getemployes2c08aProps,
        col_cr_mol2640a,
        setcol_cr_mol2640a, 
        col_cr_mol2640aProps,
        setcol_cr_mol2640aProps,
        col_cr_namef6d51,
        setcol_cr_namef6d51, 
        col_cr_namef6d51Props,
        setcol_cr_namef6d51Props,
        col_cr_status1147a,
        setcol_cr_status1147a, 
        col_cr_status1147aProps,
        setcol_cr_status1147aProps,
        col_reg_num66de9,
        setcol_reg_num66de9, 
        col_reg_num66de9Props,
        setcol_reg_num66de9Props,
        col_owner_emi_id78c37,
        setcol_owner_emi_id78c37, 
        col_owner_emi_id78c37Props,
        setcol_owner_emi_id78c37Props,
        col_moh_stsaec9e,
        setcol_moh_stsaec9e, 
        col_moh_stsaec9eProps,
        setcol_moh_stsaec9eProps,
        btn_back_upb0902,
        setbtn_back_upb0902, 
        btn_back_upb0902Props,
        setbtn_back_upb0902Props,
        col_mol_numrd6584,
        setcol_mol_numrd6584, 
        col_mol_numrd6584Props,
        setcol_mol_numrd6584Props,
        col_mohre_stse37dc,
        setcol_mohre_stse37dc, 
        col_mohre_stse37dcProps,
        setcol_mohre_stse37dcProps,
        col_reg_num51c35,
        setcol_reg_num51c35, 
        col_reg_num51c35Props,
        setcol_reg_num51c35Props,
        col_emirates_idce519,
        setcol_emirates_idce519, 
        col_emirates_idce519Props,
        setcol_emirates_idce519Props,
        col_created_date1adb1,
        setcol_created_date1adb1, 
        col_created_date1adb1Props,
        setcol_created_date1adb1Props,
        btn_backdb4f7,
        setbtn_backdb4f7, 
        btn_backdb4f7Props,
        setbtn_backdb4f7Props,
        btn_export_as_excelf9ac3,
        setbtn_export_as_excelf9ac3, 
        btn_export_as_excelf9ac3Props,
        setbtn_export_as_excelf9ac3Props,
        col_emp_eidb6da5,
        setcol_emp_eidb6da5, 
        col_emp_eidb6da5Props,
        setcol_emp_eidb6da5Props,
        col_emp_mol_list8126c,
        setcol_emp_mol_list8126c, 
        col_emp_mol_list8126cProps,
        setcol_emp_mol_list8126cProps,
        col_er_reg_idec20e,
        setcol_er_reg_idec20e, 
        col_er_reg_idec20eProps,
        setcol_er_reg_idec20eProps,
        col_emp_mol_numa36ef,
        setcol_emp_mol_numa36ef, 
        col_emp_mol_numa36efProps,
        setcol_emp_mol_numa36efProps,
        col_sal_mnth274bd,
        setcol_sal_mnth274bd, 
        col_sal_mnth274bdProps,
        setcol_sal_mnth274bdProps,
        col_chnl_codefad7d,
        setcol_chnl_codefad7d, 
        col_chnl_codefad7dProps,
        setcol_chnl_codefad7dProps,
        btn_view_details6a93d,
        setbtn_view_details6a93d, 
        btn_view_details6a93dProps,
        setbtn_view_details6a93dProps,
        hdr_view_detailsde0ef,
        sethdr_view_detailsde0ef, 
        hdr_view_detailsde0efProps,
        sethdr_view_detailsde0efProps,
        divider85e5a,
        setdivider85e5a, 
        divider85e5aProps,
        setdivider85e5aProps,
        hdr_emp_details519b3,
        sethdr_emp_details519b3, 
        hdr_emp_details519b3Props,
        sethdr_emp_details519b3Props,
        lbl_s_channel_code83f4d,
        setlbl_s_channel_code83f4d, 
        lbl_s_channel_code83f4dProps,
        setlbl_s_channel_code83f4dProps,
        lbl_s_leave6881d,
        setlbl_s_leave6881d, 
        lbl_s_leave6881dProps,
        setlbl_s_leave6881dProps,
        lbl_s_inside_cntrybe1b2,
        setlbl_s_inside_cntrybe1b2, 
        lbl_s_inside_cntrybe1b2Props,
        setlbl_s_inside_cntrybe1b2Props,
        lbl_ch_code6fd21,
        setlbl_ch_code6fd21, 
        lbl_ch_code6fd21Props,
        setlbl_ch_code6fd21Props,
        lbl_leavefc2c9,
        setlbl_leavefc2c9, 
        lbl_leavefc2c9Props,
        setlbl_leavefc2c9Props,
        lbl_inside_cntry8bcae,
        setlbl_inside_cntry8bcae, 
        lbl_inside_cntry8bcaeProps,
        setlbl_inside_cntry8bcaeProps,
        divider1d3fd6,
        setdivider1d3fd6, 
        divider1d3fd6Props,
        setdivider1d3fd6Props,
        lbl_s_sal_typeb0082,
        setlbl_s_sal_typeb0082, 
        lbl_s_sal_typeb0082Props,
        setlbl_s_sal_typeb0082Props,
        lbl_s_wrk_emid0fa84,
        setlbl_s_wrk_emid0fa84, 
        lbl_s_wrk_emid0fa84Props,
        setlbl_s_wrk_emid0fa84Props,
        lbl_s_pas_num2951b,
        setlbl_s_pas_num2951b, 
        lbl_s_pas_num2951bProps,
        setlbl_s_pas_num2951bProps,
        lbl_sal_typee5fad,
        setlbl_sal_typee5fad, 
        lbl_sal_typee5fadProps,
        setlbl_sal_typee5fadProps,
        lbl_wrk_emidd0501,
        setlbl_wrk_emidd0501, 
        lbl_wrk_emidd0501Props,
        setlbl_wrk_emidd0501Props,
        lbl_pass_numbf1c1,
        setlbl_pass_numbf1c1, 
        lbl_pass_numbf1c1Props,
        setlbl_pass_numbf1c1Props,
        divider3e5b62,
        setdivider3e5b62, 
        divider3e5b62Props,
        setdivider3e5b62Props,
        lbl_s_cmp_code11164,
        setlbl_s_cmp_code11164, 
        lbl_s_cmp_code11164Props,
        setlbl_s_cmp_code11164Props,
        lbl_s_persn_code785b1,
        setlbl_s_persn_code785b1, 
        lbl_s_persn_code785b1Props,
        setlbl_s_persn_code785b1Props,
        lbl_s_agntcodee3a1d,
        setlbl_s_agntcodee3a1d, 
        lbl_s_agntcodee3a1dProps,
        setlbl_s_agntcodee3a1dProps,
        lbl_cmp_cde8afa3,
        setlbl_cmp_cde8afa3, 
        lbl_cmp_cde8afa3Props,
        setlbl_cmp_cde8afa3Props,
        lbl_prsn_code9fac4,
        setlbl_prsn_code9fac4, 
        lbl_prsn_code9fac4Props,
        setlbl_prsn_code9fac4Props,
        lbl_angnt_cdee285a,
        setlbl_angnt_cdee285a, 
        lbl_angnt_cdee285aProps,
        setlbl_angnt_cdee285aProps,
        divider223785,
        setdivider223785, 
        divider223785Props,
        setdivider223785Props,
        lbl_s_wrk_iban0b21a,
        setlbl_s_wrk_iban0b21a, 
        lbl_s_wrk_iban0b21aProps,
        setlbl_s_wrk_iban0b21aProps,
        lbl_s_remarks514e5,
        setlbl_s_remarks514e5, 
        lbl_s_remarks514e5Props,
        setlbl_s_remarks514e5Props,
        lblwrk_ibane57ee,
        setlblwrk_ibane57ee, 
        lblwrk_ibane57eeProps,
        setlblwrk_ibane57eeProps,
        lbl_rmksb105f,
        setlbl_rmksb105f, 
        lbl_rmksb105fProps,
        setlbl_rmksb105fProps,
        hdr_sal_detailscc668,
        sethdr_sal_detailscc668, 
        hdr_sal_detailscc668Props,
        sethdr_sal_detailscc668Props,
        lbl_s_year8a7b7,
        setlbl_s_year8a7b7, 
        lbl_s_year8a7b7Props,
        setlbl_s_year8a7b7Props,
        lbl_s_prd1d712,
        setlbl_s_prd1d712, 
        lbl_s_prd1d712Props,
        setlbl_s_prd1d712Props,
        lbl_s_frm_dteaf9ff,
        setlbl_s_frm_dteaf9ff, 
        lbl_s_frm_dteaf9ffProps,
        setlbl_s_frm_dteaf9ffProps,
        lbl_year77e9a,
        setlbl_year77e9a, 
        lbl_year77e9aProps,
        setlbl_year77e9aProps,
        lbl_prd231ed,
        setlbl_prd231ed, 
        lbl_prd231edProps,
        setlbl_prd231edProps,
        lbl_from_date5c572,
        setlbl_from_date5c572, 
        lbl_from_date5c572Props,
        setlbl_from_date5c572Props,
        divider41b7ce,
        setdivider41b7ce, 
        divider41b7ceProps,
        setdivider41b7ceProps,
        lbl_s_to_dtec31c3,
        setlbl_s_to_dtec31c3, 
        lbl_s_to_dtec31c3Props,
        setlbl_s_to_dtec31c3Props,
        lbl_s_sal_pymt_date3433b,
        setlbl_s_sal_pymt_date3433b, 
        lbl_s_sal_pymt_date3433bProps,
        setlbl_s_sal_pymt_date3433bProps,
        lbl_s_days_paid8f15c,
        setlbl_s_days_paid8f15c, 
        lbl_s_days_paid8f15cProps,
        setlbl_s_days_paid8f15cProps,
        lbl_to_date68efb,
        setlbl_to_date68efb, 
        lbl_to_date68efbProps,
        setlbl_to_date68efbProps,
        lbl_file_id71627,
        setlbl_file_id71627, 
        lbl_file_id71627Props,
        setlbl_file_id71627Props,
        lbl_days_paidfaad7,
        setlbl_days_paidfaad7, 
        lbl_days_paidfaad7Props,
        setlbl_days_paidfaad7Props,
        divider54066d,
        setdivider54066d, 
        divider54066dProps,
        setdivider54066dProps,
        lbl_s_fix_in368c0,
        setlbl_s_fix_in368c0, 
        lbl_s_fix_in368c0Props,
        setlbl_s_fix_in368c0Props,
        lbl_s_in_varaf378,
        setlbl_s_in_varaf378, 
        lbl_s_in_varaf378Props,
        setlbl_s_in_varaf378Props,
        lbl_s_to_sal357e4,
        setlbl_s_to_sal357e4, 
        lbl_s_to_sal357e4Props,
        setlbl_s_to_sal357e4Props,
        lbl_fix_in1338c,
        setlbl_fix_in1338c, 
        lbl_fix_in1338cProps,
        setlbl_fix_in1338cProps,
        lbl_in_varb6ce9,
        setlbl_in_varb6ce9, 
        lbl_in_varb6ce9Props,
        setlbl_in_varb6ce9Props,
        lbl_to_sal3b4e8,
        setlbl_to_sal3b4e8, 
        lbl_to_sal3b4e8Props,
        setlbl_to_sal3b4e8Props,
        divider6490c6,
        setdivider6490c6, 
        divider6490c6Props,
        setdivider6490c6Props,
        lbl_s_to_beneaed7e,
        setlbl_s_to_beneaed7e, 
        lbl_s_to_beneaed7eProps,
        setlbl_s_to_beneaed7eProps,
        lbl_s_to_deduction078ca,
        setlbl_s_to_deduction078ca, 
        lbl_s_to_deduction078caProps,
        setlbl_s_to_deduction078caProps,
        lbl_s_to_allow8942c,
        setlbl_s_to_allow8942c, 
        lbl_s_to_allow8942cProps,
        setlbl_s_to_allow8942cProps,
        lbl_to_bene728c0,
        setlbl_to_bene728c0, 
        lbl_to_bene728c0Props,
        setlbl_to_bene728c0Props,
        lbl_to_deductionbd7f3,
        setlbl_to_deductionbd7f3, 
        lbl_to_deductionbd7f3Props,
        setlbl_to_deductionbd7f3Props,
        lbl_to_allo2f67a,
        setlbl_to_allo2f67a, 
        lbl_to_allo2f67aProps,
        setlbl_to_allo2f67aProps,
        divider7df1c4,
        setdivider7df1c4, 
        divider7df1c4Props,
        setdivider7df1c4Props,
        lbl_s_to_incen9e037,
        setlbl_s_to_incen9e037, 
        lbl_s_to_incen9e037Props,
        setlbl_s_to_incen9e037Props,
        lbl_toince2e251,
        setlbl_toince2e251, 
        lbl_toince2e251Props,
        setlbl_toince2e251Props,
        btn_back2d2f3,
        setbtn_back2d2f3, 
        btn_back2d2f3Props,
        setbtn_back2d2f3Props,
        btn_export_as_excel39d79,
        setbtn_export_as_excel39d79, 
        btn_export_as_excel39d79Props,
        setbtn_export_as_excel39d79Props,
        btn_emp_rptf4b9a,
        setbtn_emp_rptf4b9a, 
        btn_emp_rptf4b9aProps,
        setbtn_emp_rptf4b9aProps,
        btn_get_empdd09a,
        setbtn_get_empdd09a, 
        btn_get_empdd09aProps,
        setbtn_get_empdd09aProps,
        col_card_numberbec8c,
        setcol_card_numberbec8c, 
        col_card_numberbec8cProps,
        setcol_card_numberbec8cProps,
        col_uni_numd76ee,
        setcol_uni_numd76ee, 
        col_uni_numd76eeProps,
        setcol_uni_numd76eeProps,
        col_emr_idd3a1f,
        setcol_emr_idd3a1f, 
        col_emr_idd3a1fProps,
        setcol_emr_idd3a1fProps,
        col_sts_dated58fa4,
        setcol_sts_dated58fa4, 
        col_sts_dated58fa4Props,
        setcol_sts_dated58fa4Props,
        col_is_actived0527,
        setcol_is_actived0527, 
        col_is_actived0527Props,
        setcol_is_actived0527Props,
        col_pass_nume4031,
        setcol_pass_nume4031, 
        col_pass_nume4031Props,
        setcol_pass_nume4031Props,
        col_tot_sale3e91,
        setcol_tot_sale3e91, 
        col_tot_sale3e91Props,
        setcol_tot_sale3e91Props,
        col_emp_namefa4c3,
        setcol_emp_namefa4c3, 
        col_emp_namefa4c3Props,
        setcol_emp_namefa4c3Props,
        col_emp_name_ar02a3b,
        setcol_emp_name_ar02a3b, 
        col_emp_name_ar02a3bProps,
        setcol_emp_name_ar02a3bProps,
        col_prsn_code83655,
        setcol_prsn_code83655, 
        col_prsn_code83655Props,
        setcol_prsn_code83655Props,
        btn_salary_slipb31d5,
        setbtn_salary_slipb31d5, 
        btn_salary_slipb31d5Props,
        setbtn_salary_slipb31d5Props,
        col_empr_num3d80d,
        setcol_empr_num3d80d, 
        col_empr_num3d80dProps,
        setcol_empr_num3d80dProps,
        btn_toggle12af0,
        setbtn_toggle12af0, 
        btn_toggle12af0Props,
        setbtn_toggle12af0Props,
        btn_reg_mohd6fce,
        setbtn_reg_mohd6fce, 
        btn_reg_mohd6fceProps,
        setbtn_reg_mohd6fceProps,
        reg_emplr_search8289f,
        setreg_emplr_search8289f, 
        reg_emplr_search8289fProps,
        setreg_emplr_search8289fProps,
        search_btn1b8b6,
        setsearch_btn1b8b6, 
        search_btn1b8b6Props,
        setsearch_btn1b8b6Props,
        cor_mol062f8,
        setcor_mol062f8, 
        cor_mol062f8Props,
        setcor_mol062f8Props,
        cor_name7e300,
        setcor_name7e300, 
        cor_name7e300Props,
        setcor_name7e300Props,
        owner_eid61dd1,
        setowner_eid61dd1, 
        owner_eid61dd1Props,
        setowner_eid61dd1Props,
        cor_moh_sts343b0,
        setcor_moh_sts343b0, 
        cor_moh_sts343b0Props,
        setcor_moh_sts343b0Props,
        cor_stsea777,
        setcor_stsea777, 
        cor_stsea777Props,
        setcor_stsea777Props,
        comp_stse8d74,
        setcomp_stse8d74, 
        comp_stse8d74Props,
        setcomp_stse8d74Props,
        cor_molffa7c,
        setcor_molffa7c, 
        cor_molffa7cProps,
        setcor_molffa7cProps,
        cor_name7a1f6,
        setcor_name7a1f6, 
        cor_name7a1f6Props,
        setcor_name7a1f6Props,
        cor_reg_idb804b,
        setcor_reg_idb804b, 
        cor_reg_idb804bProps,
        setcor_reg_idb804bProps,
        cor_eid349aa,
        setcor_eid349aa, 
        cor_eid349aaProps,
        setcor_eid349aaProps,
        moh_statusda3d9,
        setmoh_statusda3d9, 
        moh_statusda3d9Props,
        setmoh_statusda3d9Props,
        toggle_dropdownfb4d3,
        settoggle_dropdownfb4d3, 
        toggle_dropdownfb4d3Props,
        settoggle_dropdownfb4d3Props,
        btn_cancel9df0b,
        setbtn_cancel9df0b, 
        btn_cancel9df0bProps,
        setbtn_cancel9df0bProps,
        btn_confirm34d75,
        setbtn_confirm34d75, 
        btn_confirm34d75Props,
        setbtn_confirm34d75Props,
        col_com_code8c08a,
        setcol_com_code8c08a, 
        col_com_code8c08aProps,
        setcol_com_code8c08aProps,
        col_emir_id08252,
        setcol_emir_id08252, 
        col_emir_id08252Props,
        setcol_emir_id08252Props,
        btn_retryb8593,
        setbtn_retryb8593, 
        btn_retryb8593Props,
        setbtn_retryb8593Props,
        col_reg_no9e196,
        setcol_reg_no9e196, 
        col_reg_no9e196Props,
        setcol_reg_no9e196Props,
        col_prcs_nameb7721,
        setcol_prcs_nameb7721, 
        col_prcs_nameb7721Props,
        setcol_prcs_nameb7721Props,
        col_sts9c434,
        setcol_sts9c434, 
        col_sts9c434Props,
        setcol_sts9c434Props,
        col_sif_name7de17,
        setcol_sif_name7de17, 
        col_sif_name7de17Props,
        setcol_sif_name7de17Props,
        col_sal_monthaa65c,
        setcol_sal_monthaa65c, 
        col_sal_monthaa65cProps,
        setcol_sal_monthaa65cProps,
        col_created_dated290b,
        setcol_created_dated290b, 
        col_created_dated290bProps,
        setcol_created_dated290bProps,
        btn_view_req_res6cb5d,
        setbtn_view_req_res6cb5d, 
        btn_view_req_res6cb5dProps,
        setbtn_view_req_res6cb5dProps,
        col_com_code3b35a,
        setcol_com_code3b35a, 
        col_com_code3b35aProps,
        setcol_com_code3b35aProps,
        col_emi_id8bf26,
        setcol_emi_id8bf26, 
        col_emi_id8bf26Props,
        setcol_emi_id8bf26Props,
        col_reg_noe3d8f,
        setcol_reg_noe3d8f, 
        col_reg_noe3d8fProps,
        setcol_reg_noe3d8fProps,
        col_prcs_named06a3,
        setcol_prcs_named06a3, 
        col_prcs_named06a3Props,
        setcol_prcs_named06a3Props,
        col_sts2b329,
        setcol_sts2b329, 
        col_sts2b329Props,
        setcol_sts2b329Props,
        col_created_date2f60b,
        setcol_created_date2f60b, 
        col_created_date2f60bProps,
        setcol_created_date2f60bProps,
        btn_succ_req_resc54e9,
        setbtn_succ_req_resc54e9, 
        btn_succ_req_resc54e9Props,
        setbtn_succ_req_resc54e9Props,
        icon12b96,
        seticon12b96, 
        icon12b96Props,
        seticon12b96Props,
        success_textd0c07,
        setsuccess_textd0c07, 
        success_textd0c07Props,
        setsuccess_textd0c07Props,
        file_upload_success9ee39,
        setfile_upload_success9ee39, 
        file_upload_success9ee39Props,
        setfile_upload_success9ee39Props,
        dividerdb2f5,
        setdividerdb2f5, 
        dividerdb2f5Props,
        setdividerdb2f5Props,
        okk_btn97301,
        setokk_btn97301, 
        okk_btn97301Props,
        setokk_btn97301Props,
        text_head38a37,
        settext_head38a37, 
        text_head38a37Props,
        settext_head38a37Props,
        btn_search3c2e1,
        setbtn_search3c2e1, 
        btn_search3c2e1Props,
        setbtn_search3c2e1Props,
        btn_export_as_excelb2d92,
        setbtn_export_as_excelb2d92, 
        btn_export_as_excelb2d92Props,
        setbtn_export_as_excelb2d92Props,
        col_org_file_namee9218,
        setcol_org_file_namee9218, 
        col_org_file_namee9218Props,
        setcol_org_file_namee9218Props,
        col_sf_file_name2de87,
        setcol_sf_file_name2de87, 
        col_sf_file_name2de87Props,
        setcol_sf_file_name2de87Props,
        col_empr_id3b1f4,
        setcol_empr_id3b1f4, 
        col_empr_id3b1f4Props,
        setcol_empr_id3b1f4Props,
        col_corp_nameecc38,
        setcol_corp_nameecc38, 
        col_corp_nameecc38Props,
        setcol_corp_nameecc38Props,
        col_dr_acca3ca2,
        setcol_dr_acca3ca2, 
        col_dr_acca3ca2Props,
        setcol_dr_acca3ca2Props,
        col_tot_rcd0a298,
        setcol_tot_rcd0a298, 
        col_tot_rcd0a298Props,
        setcol_tot_rcd0a298Props,
        col_sf_file_amnt7be09,
        setcol_sf_file_amnt7be09, 
        col_sf_file_amnt7be09Props,
        setcol_sf_file_amnt7be09Props,
        col_sal_mnthc23c3,
        setcol_sal_mnthc23c3, 
        col_sal_mnthc23c3Props,
        setcol_sal_mnthc23c3Props,
        col_sal_year592c0,
        setcol_sal_year592c0, 
        col_sal_year592c0Props,
        setcol_sal_year592c0Props,
        top_dividerbb8b6,
        settop_dividerbb8b6, 
        top_dividerbb8b6Props,
        settop_dividerbb8b6Props,
        file_namefb5d0,
        setfile_namefb5d0, 
        file_namefb5d0Props,
        setfile_namefb5d0Props,
        sf_file_name06efb,
        setsf_file_name06efb, 
        sf_file_name06efbProps,
        setsf_file_name06efbProps,
        estab_idbde42,
        setestab_idbde42, 
        estab_idbde42Props,
        setestab_idbde42Props,
        corp_name2b998,
        setcorp_name2b998, 
        corp_name2b998Props,
        setcorp_name2b998Props,
        bottom_dividerdb520,
        setbottom_dividerdb520, 
        bottom_dividerdb520Props,
        setbottom_dividerdb520Props,
        searchb3ab8,
        setsearchb3ab8, 
        searchb3ab8Props,
        setsearchb3ab8Props,
        clear56e07,
        setclear56e07, 
        clear56e07Props,
        setclear56e07Props,
        lbl_hear96d7b,
        setlbl_hear96d7b, 
        lbl_hear96d7bProps,
        setlbl_hear96d7bProps,
        btn_search8b202,
        setbtn_search8b202, 
        btn_search8b202Props,
        setbtn_search8b202Props,
        btn_export_as_excele8f9c,
        setbtn_export_as_excele8f9c, 
        btn_export_as_excele8f9cProps,
        setbtn_export_as_excele8f9cProps,
        col_pif_file_namee99d8,
        setcol_pif_file_namee99d8, 
        col_pif_file_namee99d8Props,
        setcol_pif_file_namee99d8Props,
        col_emplr_ida847f,
        setcol_emplr_ida847f, 
        col_emplr_ida847fProps,
        setcol_emplr_ida847fProps,
        col_corp_name9e9f0,
        setcol_corp_name9e9f0, 
        col_corp_name9e9f0Props,
        setcol_corp_name9e9f0Props,
        col_dr_acc2afa8,
        setcol_dr_acc2afa8, 
        col_dr_acc2afa8Props,
        setcol_dr_acc2afa8Props,
        col_tot_rcd8b718,
        setcol_tot_rcd8b718, 
        col_tot_rcd8b718Props,
        setcol_tot_rcd8b718Props,
        col_pf_file_amnt5e967,
        setcol_pf_file_amnt5e967, 
        col_pf_file_amnt5e967Props,
        setcol_pf_file_amnt5e967Props,
        col_sal_mnthba9cc,
        setcol_sal_mnthba9cc, 
        col_sal_mnthba9ccProps,
        setcol_sal_mnthba9ccProps,
        col_sal_yeara098c,
        setcol_sal_yeara098c, 
        col_sal_yeara098cProps,
        setcol_sal_yeara098cProps,
        top_divider34637,
        settop_divider34637, 
        top_divider34637Props,
        settop_divider34637Props,
        corp_name3791a,
        setcorp_name3791a, 
        corp_name3791aProps,
        setcorp_name3791aProps,
        pf_file_name2c4bc,
        setpf_file_name2c4bc, 
        pf_file_name2c4bcProps,
        setpf_file_name2c4bcProps,
        bottom_divider87331,
        setbottom_divider87331, 
        bottom_divider87331Props,
        setbottom_divider87331Props,
        search2ca66,
        setsearch2ca66, 
        search2ca66Props,
        setsearch2ca66Props,
        clear3234f,
        setclear3234f, 
        clear3234fProps,
        setclear3234fProps,
        ////// screen states 
          transactionproduct_v1,
          settransactionproduct_v1,
          transactionproduct_v1Props,
          settransactionproduct_v1Props,
          transactionsearch_v1,
          settransactionsearch_v1,
          transactionsearch_v1Props,
          settransactionsearch_v1Props,
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
          wps_v1,
          setwps_v1,
          wps_v1Props,
          setwps_v1Props,
          transactionlist_v1,
          settransactionlist_v1,
          transactionlist_v1Props,
          settransactionlist_v1Props,
          viewmessagedata_v1,
          setviewmessagedata_v1,
          viewmessagedata_v1Props,
          setviewmessagedata_v1Props,
          sfjourneylist_v1,
          setsfjourneylist_v1,
          sfjourneylist_v1Props,
          setsfjourneylist_v1Props,
          transactionlistwithjourney_v1,
          settransactionlistwithjourney_v1,
          transactionlistwithjourney_v1Props,
          settransactionlistwithjourney_v1Props,
          wpstranjourneydetails_v1,
          setwpstranjourneydetails_v1,
          wpstranjourneydetails_v1Props,
          setwpstranjourneydetails_v1Props,
          postingexceptionviewtransaction_v1,
          setpostingexceptionviewtransaction_v1,
          postingexceptionviewtransaction_v1Props,
          setpostingexceptionviewtransaction_v1Props,
          returnsrefund_v1,
          setreturnsrefund_v1,
          returnsrefund_v1Props,
          setreturnsrefund_v1Props,
          returntransactionlist_v1,
          setreturntransactionlist_v1,
          returntransactionlist_v1Props,
          setreturntransactionlist_v1Props,
          returninitiatereaonpopup_v1,
          setreturninitiatereaonpopup_v1,
          returninitiatereaonpopup_v1Props,
          setreturninitiatereaonpopup_v1Props,
          requestrefundtransactionlist_v1,
          setrequestrefundtransactionlist_v1,
          requestrefundtransactionlist_v1Props,
          setrequestrefundtransactionlist_v1Props,
          requestinitiatereasonpopup_v1,
          setrequestinitiatereasonpopup_v1,
          requestinitiatereasonpopup_v1Props,
          setrequestinitiatereasonpopup_v1Props,
          enquiry_v1,
          setenquiry_v1,
          enquiry_v1Props,
          setenquiry_v1Props,
          enquirygetregemployer_v1,
          setenquirygetregemployer_v1,
          enquirygetregemployer_v1Props,
          setenquirygetregemployer_v1Props,
          enquiryempsalrpt_v1,
          setenquiryempsalrpt_v1,
          enquiryempsalrpt_v1Props,
          setenquiryempsalrpt_v1Props,
          enquiryempviewdetails_v1,
          setenquiryempviewdetails_v1,
          enquiryempviewdetails_v1Props,
          setenquiryempviewdetails_v1Props,
          enquirygetemployees_v1,
          setenquirygetemployees_v1,
          enquirygetemployees_v1Props,
          setenquirygetemployees_v1Props,
          registration_v1,
          setregistration_v1,
          registration_v1Props,
          setregistration_v1Props,
          togglepopup_v1,
          settogglepopup_v1,
          togglepopup_v1Props,
          settogglepopup_v1Props,
          dashboard_v1,
          setdashboard_v1,
          dashboard_v1Props,
          setdashboard_v1Props,
          infomsgpopup_v1,
          setinfomsgpopup_v1,
          infomsgpopup_v1Props,
          setinfomsgpopup_v1Props,
          sifsummaryreport_v1,
          setsifsummaryreport_v1,
          sifsummaryreport_v1Props,
          setsifsummaryreport_v1Props,
          sifreportsearch_v1,
          setsifreportsearch_v1,
          sifreportsearch_v1Props,
          setsifreportsearch_v1Props,
          pifsummaryreport_v1,
          setpifsummaryreport_v1,
          pifsummaryreport_v1Props,
          setpifsummaryreport_v1Props,
          pifreportsearch_v1,
          setpifreportsearch_v1,
          pifreportsearch_v1Props,
          setpifreportsearch_v1Props,
        //////////

        ///////// dfd
        dfd_combocurrencysearch_v1Props,
        setdfd_combocurrencysearch_v1Props,
        dfd_transaction_v1Props,
        setdfd_transaction_v1Props,
        dfd_journey_v1Props,
        setdfd_journey_v1Props,
        dfd_tranjourney_v1Props,
        setdfd_tranjourney_v1Props,
        dfd_employeelist_v1Props,
        setdfd_employeelist_v1Props,
        dfd_wpsnackfailuretransactionlist_v1Props,
        setdfd_wpsnackfailuretransactionlist_v1Props,
        dfd_sfjourneyviewtransaction_v1Props,
        setdfd_sfjourneyviewtransaction_v1Props,
        dfd_sfjourneylistwithcount_v1Props,
        setdfd_sfjourneylistwithcount_v1Props,
        dfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,
        setdfd_wpsnackfailuretransactionlist_postingexceptionviewtransaction_v1Props,
        dfd_wpsnackfailurefilelist_v1Props,
        setdfd_wpsnackfailurefilelist_v1Props,
        dfd_wpsfilejourney_v1Props,
        setdfd_wpsfilejourney_v1Props,
        dfd_postingexpectionfilelist_v1Props,
        setdfd_postingexpectionfilelist_v1Props,
        dfd_postingexceptionprocesslist_v1Props,
        setdfd_postingexceptionprocesslist_v1Props,
        dfd_wpsdashboardcompanystructurecombo_v1Props,
        setdfd_wpsdashboardcompanystructurecombo_v1Props,
        dfd_wpsdashboardmolnumbercombo_v1Props,
        setdfd_wpsdashboardmolnumbercombo_v1Props,
        dfd_wpsdashboardsuccesstab_v1Props,
        setdfd_wpsdashboardsuccesstab_v1Props,
        dfd_wpsdashboardfailuretab_v1Props,
        setdfd_wpsdashboardfailuretab_v1Props,
        dfd_wpsdashboardsalarytypecombo_v1Props,
        setdfd_wpsdashboardsalarytypecombo_v1Props,
        dfd_wpsdashboardemployeesbarchart_v1Props,
        setdfd_wpsdashboardemployeesbarchart_v1Props,
        dfd_wpsdashboardsalaryprocessbarchart_v1Props,
        setdfd_wpsdashboardsalaryprocessbarchart_v1Props,
        dfd_wpsdashboardmyqueueall_v1Props,
        setdfd_wpsdashboardmyqueueall_v1Props,
        dfd_wpsdashboardmonthcombo_v1Props,
        setdfd_wpsdashboardmonthcombo_v1Props,
        dfd_wpsdashboardyearcombo_v1Props,
        setdfd_wpsdashboardyearcombo_v1Props,
        dfd_wpsdashboardsuccesstabnonwps_v1Props,
        setdfd_wpsdashboardsuccesstabnonwps_v1Props,
        dfd_wpsdashboardfailurenonwpstab_v1Props,
        setdfd_wpsdashboardfailurenonwpstab_v1Props,
        dfd_wpsdashboardmyqueueactionrequired_v1Props,
        setdfd_wpsdashboardmyqueueactionrequired_v1Props,
        dfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,
        setdfd_wpsdashboardmyqueuesalaryreturnrefund_v1Props,
        dfd_wpsdashboardmyqueueexceptions_v1Props,
        setdfd_wpsdashboardmyqueueexceptions_v1Props,
        dfd_returnreason_v1Props,
        setdfd_returnreason_v1Props,
        dfd_returnagentfromtransactionlist_v1Props,
        setdfd_returnagentfromtransactionlist_v1Props,
        dfd_requestreason_v1Props,
        setdfd_requestreason_v1Props,
        dfd_returnfromagentfilelist_v1Props,
        setdfd_returnfromagentfilelist_v1Props,
        dfd_requestforrefundfilelist_v1Props,
        setdfd_requestforrefundfilelist_v1Props,
        dfd_enquirygetregemployeremployerlist_v1Props,
        setdfd_enquirygetregemployeremployerlist_v1Props,
        dfd_enquiryemployersalaryrpt_v1Props,
        setdfd_enquiryemployersalaryrpt_v1Props,
        dfd_enquirygetemployee_v1Props,
        setdfd_enquirygetemployee_v1Props,
        dfd_enquiryviewallemployers_v1Props,
        setdfd_enquiryviewallemployers_v1Props,
        dfd_updateregemployer_v1Props,
        setdfd_updateregemployer_v1Props,
        dfd_regemployer_v1Props,
        setdfd_regemployer_v1Props,
        dfd_dashboardviewallsuccess_v1Props,
        setdfd_dashboardviewallsuccess_v1Props,
        dfd_dashboardviewallfailure_v1Props,
        setdfd_dashboardviewallfailure_v1Props,
        dfd_sifsummaryreport_v1Props,
        setdfd_sifsummaryreport_v1Props,
        dfd_pifsummaryreport_v1Props,
        setdfd_pifsummaryreport_v1Props,
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