


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  header_groupb1913: any 
  setheader_groupb1913: React.Dispatch<React.SetStateAction<any>>
  header_groupb1913Props: any 
  setheader_groupb1913Props: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group4bbfe: any 
  setasset_dashboard_group4bbfe: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group4bbfeProps: any 
  setasset_dashboard_group4bbfeProps: React.Dispatch<React.SetStateAction<any>>
  amr_queue_groupc92ca: any 
  setamr_queue_groupc92ca: React.Dispatch<React.SetStateAction<any>>
  amr_queue_groupc92caProps: any 
  setamr_queue_groupc92caProps: React.Dispatch<React.SetStateAction<any>>
  pending_file_groupffe32: any 
  setpending_file_groupffe32: React.Dispatch<React.SetStateAction<any>>
  pending_file_groupffe32Props: any 
  setpending_file_groupffe32Props: React.Dispatch<React.SetStateAction<any>>
  service_pending_group7ba93: any 
  setservice_pending_group7ba93: React.Dispatch<React.SetStateAction<any>>
  service_pending_group7ba93Props: any 
  setservice_pending_group7ba93Props: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_group23eb4: any 
  setslas_at_risk_group23eb4: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_group23eb4Props: any 
  setslas_at_risk_group23eb4Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_groupc9d54: any 
  setcourt_rejection_groupc9d54: React.Dispatch<React.SetStateAction<any>>
  court_rejection_groupc9d54Props: any 
  setcourt_rejection_groupc9d54Props: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_group7b7b5: any 
  setcollected_mtd_group7b7b5: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_group7b7b5Props: any 
  setcollected_mtd_group7b7b5Props: React.Dispatch<React.SetStateAction<any>>
  table_group112bd: any 
  settable_group112bd: React.Dispatch<React.SetStateAction<any>>
  table_group112bdProps: any 
  settable_group112bdProps: React.Dispatch<React.SetStateAction<any>>
  subscreene9ab5: any 
  setsubscreene9ab5: React.Dispatch<React.SetStateAction<any>>
  subscreene9ab5Props: any 
  setsubscreene9ab5Props: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797: any 
  setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props: any 
  setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props: React.Dispatch<React.SetStateAction<any>>
  group28176: any 
  setgroup28176: React.Dispatch<React.SetStateAction<any>>
  group28176Props: any 
  setgroup28176Props: React.Dispatch<React.SetStateAction<any>>
  table852e3: any 
  settable852e3: React.Dispatch<React.SetStateAction<any>>
  table852e3Props: any 
  settable852e3Props: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da: any 
  setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps: any 
  setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps: React.Dispatch<React.SetStateAction<any>>
  pending_fillings_groupb1568: any 
  setpending_fillings_groupb1568: React.Dispatch<React.SetStateAction<any>>
  pending_fillings_groupb1568Props: any 
  setpending_fillings_groupb1568Props: React.Dispatch<React.SetStateAction<any>>
  pending_fillings_table11279: any 
  setpending_fillings_table11279: React.Dispatch<React.SetStateAction<any>>
  pending_fillings_table11279Props: any 
  setpending_fillings_table11279Props: React.Dispatch<React.SetStateAction<any>>
  search_groupdefa1: any 
  setsearch_groupdefa1: React.Dispatch<React.SetStateAction<any>>
  search_groupdefa1Props: any 
  setsearch_groupdefa1Props: React.Dispatch<React.SetStateAction<any>>
  add_case_groupeb161: any 
  setadd_case_groupeb161: React.Dispatch<React.SetStateAction<any>>
  add_case_groupeb161Props: any 
  setadd_case_groupeb161Props: React.Dispatch<React.SetStateAction<any>>
  header_group4878f: any 
  setheader_group4878f: React.Dispatch<React.SetStateAction<any>>
  header_group4878fProps: any 
  setheader_group4878fProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactions094c3: any 
  setdynamicactions094c3: React.Dispatch<React.SetStateAction<any>>
  dynamicactions094c3Props: any 
  setdynamicactions094c3Props: React.Dispatch<React.SetStateAction<any>>
  case_information_group28f6f: any 
  setcase_information_group28f6f: React.Dispatch<React.SetStateAction<any>>
  case_information_group28f6fProps: any 
  setcase_information_group28f6fProps: React.Dispatch<React.SetStateAction<any>>
  venue_group6a36d: any 
  setvenue_group6a36d: React.Dispatch<React.SetStateAction<any>>
  venue_group6a36dProps: any 
  setvenue_group6a36dProps: React.Dispatch<React.SetStateAction<any>>
  georgia_group0fa18: any 
  setgeorgia_group0fa18: React.Dispatch<React.SetStateAction<any>>
  georgia_group0fa18Props: any 
  setgeorgia_group0fa18Props: React.Dispatch<React.SetStateAction<any>>
  georgias_group945fd: any 
  setgeorgias_group945fd: React.Dispatch<React.SetStateAction<any>>
  georgias_group945fdProps: any 
  setgeorgias_group945fdProps: React.Dispatch<React.SetStateAction<any>>
  georgias_groups6f85f: any 
  setgeorgias_groups6f85f: React.Dispatch<React.SetStateAction<any>>
  georgias_groups6f85fProps: any 
  setgeorgias_groups6f85fProps: React.Dispatch<React.SetStateAction<any>>
  georgiass_groups86a87: any 
  setgeorgiass_groups86a87: React.Dispatch<React.SetStateAction<any>>
  georgiass_groups86a87Props: any 
  setgeorgiass_groups86a87Props: React.Dispatch<React.SetStateAction<any>>
  georgsiass_groupsb044a: any 
  setgeorgsiass_groupsb044a: React.Dispatch<React.SetStateAction<any>>
  georgsiass_groupsb044aProps: any 
  setgeorgsiass_groupsb044aProps: React.Dispatch<React.SetStateAction<any>>
  debtor_information_group78a70: any 
  setdebtor_information_group78a70: React.Dispatch<React.SetStateAction<any>>
  debtor_information_group78a70Props: any 
  setdebtor_information_group78a70Props: React.Dispatch<React.SetStateAction<any>>
  financial_details_group52f47: any 
  setfinancial_details_group52f47: React.Dispatch<React.SetStateAction<any>>
  financial_details_group52f47Props: any 
  setfinancial_details_group52f47Props: React.Dispatch<React.SetStateAction<any>>
  venue_details_group17ac6: any 
  setvenue_details_group17ac6: React.Dispatch<React.SetStateAction<any>>
  venue_details_group17ac6Props: any 
  setvenue_details_group17ac6Props: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group04e92: any 
  setrequired_dociument_main_group04e92: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group04e92Props: any 
  setrequired_dociument_main_group04e92Props: React.Dispatch<React.SetStateAction<any>>
  required_dociument_header_groupe39c8: any 
  setrequired_dociument_header_groupe39c8: React.Dispatch<React.SetStateAction<any>>
  required_dociument_header_groupe39c8Props: any 
  setrequired_dociument_header_groupe39c8Props: React.Dispatch<React.SetStateAction<any>>
  doc_type_tablebe9fa: any 
  setdoc_type_tablebe9fa: React.Dispatch<React.SetStateAction<any>>
  doc_type_tablebe9faProps: any 
  setdoc_type_tablebe9faProps: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group0df6b: any 
  setchecklist_main_group0df6b: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group0df6bProps: any 
  setchecklist_main_group0df6bProps: React.Dispatch<React.SetStateAction<any>>
  checklist_group32b3d: any 
  setchecklist_group32b3d: React.Dispatch<React.SetStateAction<any>>
  checklist_group32b3dProps: any 
  setchecklist_group32b3dProps: React.Dispatch<React.SetStateAction<any>>
  checklist_table198e1: any 
  setchecklist_table198e1: React.Dispatch<React.SetStateAction<any>>
  checklist_table198e1Props: any 
  setchecklist_table198e1Props: React.Dispatch<React.SetStateAction<any>>
  add_case_group1f6e4: any 
  setadd_case_group1f6e4: React.Dispatch<React.SetStateAction<any>>
  add_case_group1f6e4Props: any 
  setadd_case_group1f6e4Props: React.Dispatch<React.SetStateAction<any>>
  header_group3749a: any 
  setheader_group3749a: React.Dispatch<React.SetStateAction<any>>
  header_group3749aProps: any 
  setheader_group3749aProps: React.Dispatch<React.SetStateAction<any>>
  case_information_groupcec29: any 
  setcase_information_groupcec29: React.Dispatch<React.SetStateAction<any>>
  case_information_groupcec29Props: any 
  setcase_information_groupcec29Props: React.Dispatch<React.SetStateAction<any>>
  venue_groupa72d9: any 
  setvenue_groupa72d9: React.Dispatch<React.SetStateAction<any>>
  venue_groupa72d9Props: any 
  setvenue_groupa72d9Props: React.Dispatch<React.SetStateAction<any>>
  georgia_groupa636c: any 
  setgeorgia_groupa636c: React.Dispatch<React.SetStateAction<any>>
  georgia_groupa636cProps: any 
  setgeorgia_groupa636cProps: React.Dispatch<React.SetStateAction<any>>
  georgias_groupbac01: any 
  setgeorgias_groupbac01: React.Dispatch<React.SetStateAction<any>>
  georgias_groupbac01Props: any 
  setgeorgias_groupbac01Props: React.Dispatch<React.SetStateAction<any>>
  georgias_groupsbf356: any 
  setgeorgias_groupsbf356: React.Dispatch<React.SetStateAction<any>>
  georgias_groupsbf356Props: any 
  setgeorgias_groupsbf356Props: React.Dispatch<React.SetStateAction<any>>
  georgiass_groups9e4dd: any 
  setgeorgiass_groups9e4dd: React.Dispatch<React.SetStateAction<any>>
  georgiass_groups9e4ddProps: any 
  setgeorgiass_groups9e4ddProps: React.Dispatch<React.SetStateAction<any>>
  georgsiass_groups6bf7a: any 
  setgeorgsiass_groups6bf7a: React.Dispatch<React.SetStateAction<any>>
  georgsiass_groups6bf7aProps: any 
  setgeorgsiass_groups6bf7aProps: React.Dispatch<React.SetStateAction<any>>
  debtor_information_groupdfa55: any 
  setdebtor_information_groupdfa55: React.Dispatch<React.SetStateAction<any>>
  debtor_information_groupdfa55Props: any 
  setdebtor_information_groupdfa55Props: React.Dispatch<React.SetStateAction<any>>
  financial_details_grouped0d9: any 
  setfinancial_details_grouped0d9: React.Dispatch<React.SetStateAction<any>>
  financial_details_grouped0d9Props: any 
  setfinancial_details_grouped0d9Props: React.Dispatch<React.SetStateAction<any>>
  venue_details_group6a27a: any 
  setvenue_details_group6a27a: React.Dispatch<React.SetStateAction<any>>
  venue_details_group6a27aProps: any 
  setvenue_details_group6a27aProps: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group3eb5b: any 
  setrequired_dociument_main_group3eb5b: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group3eb5bProps: any 
  setrequired_dociument_main_group3eb5bProps: React.Dispatch<React.SetStateAction<any>>
  doc_tablee79c7: any 
  setdoc_tablee79c7: React.Dispatch<React.SetStateAction<any>>
  doc_tablee79c7Props: any 
  setdoc_tablee79c7Props: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group5b62e: any 
  setchecklist_main_group5b62e: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group5b62eProps: any 
  setchecklist_main_group5b62eProps: React.Dispatch<React.SetStateAction<any>>
  checklist_table45abc: any 
  setchecklist_table45abc: React.Dispatch<React.SetStateAction<any>>
  checklist_table45abcProps: any 
  setchecklist_table45abcProps: React.Dispatch<React.SetStateAction<any>>
  document_viewer_groupe4249: any 
  setdocument_viewer_groupe4249: React.Dispatch<React.SetStateAction<any>>
  document_viewer_groupe4249Props: any 
  setdocument_viewer_groupe4249Props: React.Dispatch<React.SetStateAction<any>>
  search_group39b74: any 
  setsearch_group39b74: React.Dispatch<React.SetStateAction<any>>
  search_group39b74Props: any 
  setsearch_group39b74Props: React.Dispatch<React.SetStateAction<any>>
  text9e38a: any,
  settext9e38a:React.Dispatch<React.SetStateAction<any>>
  text9e38aProps: any 
  settext9e38aProps: React.Dispatch<React.SetStateAction<any>>
  amr_queue_text28561: any,
  setamr_queue_text28561:React.Dispatch<React.SetStateAction<any>>
  amr_queue_text28561Props: any 
  setamr_queue_text28561Props: React.Dispatch<React.SetStateAction<any>>
  icon_total_assest208f5: any,
  seticon_total_assest208f5:React.Dispatch<React.SetStateAction<any>>
  icon_total_assest208f5Props: any 
  seticon_total_assest208f5Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue5b620: any,
  setamr_queue5b620:React.Dispatch<React.SetStateAction<any>>
  amr_queue5b620Props: any 
  setamr_queue5b620Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_descafe0e: any,
  setamr_queue_descafe0e:React.Dispatch<React.SetStateAction<any>>
  amr_queue_descafe0eProps: any 
  setamr_queue_descafe0eProps: React.Dispatch<React.SetStateAction<any>>
  pending_file_text86c2a: any,
  setpending_file_text86c2a:React.Dispatch<React.SetStateAction<any>>
  pending_file_text86c2aProps: any 
  setpending_file_text86c2aProps: React.Dispatch<React.SetStateAction<any>>
  icon_maintenance_duecab92: any,
  seticon_maintenance_duecab92:React.Dispatch<React.SetStateAction<any>>
  icon_maintenance_duecab92Props: any 
  seticon_maintenance_duecab92Props: React.Dispatch<React.SetStateAction<any>>
  pending_file1721b: any,
  setpending_file1721b:React.Dispatch<React.SetStateAction<any>>
  pending_file1721bProps: any 
  setpending_file1721bProps: React.Dispatch<React.SetStateAction<any>>
  pending_file_desc53378: any,
  setpending_file_desc53378:React.Dispatch<React.SetStateAction<any>>
  pending_file_desc53378Props: any 
  setpending_file_desc53378Props: React.Dispatch<React.SetStateAction<any>>
  service_pending_text5cc58: any,
  setservice_pending_text5cc58:React.Dispatch<React.SetStateAction<any>>
  service_pending_text5cc58Props: any 
  setservice_pending_text5cc58Props: React.Dispatch<React.SetStateAction<any>>
  icon_warranty_expiring6d299: any,
  seticon_warranty_expiring6d299:React.Dispatch<React.SetStateAction<any>>
  icon_warranty_expiring6d299Props: any 
  seticon_warranty_expiring6d299Props: React.Dispatch<React.SetStateAction<any>>
  service_pending918f0: any,
  setservice_pending918f0:React.Dispatch<React.SetStateAction<any>>
  service_pending918f0Props: any 
  setservice_pending918f0Props: React.Dispatch<React.SetStateAction<any>>
  service_pending_descabf48: any,
  setservice_pending_descabf48:React.Dispatch<React.SetStateAction<any>>
  service_pending_descabf48Props: any 
  setservice_pending_descabf48Props: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_text33ae5: any,
  setslas_at_risk_text33ae5:React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_text33ae5Props: any 
  setslas_at_risk_text33ae5Props: React.Dispatch<React.SetStateAction<any>>
  icon_2caf8: any,
  seticon_2caf8:React.Dispatch<React.SetStateAction<any>>
  icon_2caf8Props: any 
  seticon_2caf8Props: React.Dispatch<React.SetStateAction<any>>
  slas_at_riskf177b: any,
  setslas_at_riskf177b:React.Dispatch<React.SetStateAction<any>>
  slas_at_riskf177bProps: any 
  setslas_at_riskf177bProps: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_desc5c075: any,
  setslas_at_risk_desc5c075:React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_desc5c075Props: any 
  setslas_at_risk_desc5c075Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_text06a86: any,
  setcourt_rejection_text06a86:React.Dispatch<React.SetStateAction<any>>
  court_rejection_text06a86Props: any 
  setcourt_rejection_text06a86Props: React.Dispatch<React.SetStateAction<any>>
  icona5abd: any,
  seticona5abd:React.Dispatch<React.SetStateAction<any>>
  icona5abdProps: any 
  seticona5abdProps: React.Dispatch<React.SetStateAction<any>>
  court_rejection2460a: any,
  setcourt_rejection2460a:React.Dispatch<React.SetStateAction<any>>
  court_rejection2460aProps: any 
  setcourt_rejection2460aProps: React.Dispatch<React.SetStateAction<any>>
  court_rejection_desc7c63b: any,
  setcourt_rejection_desc7c63b:React.Dispatch<React.SetStateAction<any>>
  court_rejection_desc7c63bProps: any 
  setcourt_rejection_desc7c63bProps: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_text4d825: any,
  setcollected_mtd_text4d825:React.Dispatch<React.SetStateAction<any>>
  collected_mtd_text4d825Props: any 
  setcollected_mtd_text4d825Props: React.Dispatch<React.SetStateAction<any>>
  iconaff33: any,
  seticonaff33:React.Dispatch<React.SetStateAction<any>>
  iconaff33Props: any 
  seticonaff33Props: React.Dispatch<React.SetStateAction<any>>
  collected_mtdab52b: any,
  setcollected_mtdab52b:React.Dispatch<React.SetStateAction<any>>
  collected_mtdab52bProps: any 
  setcollected_mtdab52bProps: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_descfffed: any,
  setcollected_mtd_descfffed:React.Dispatch<React.SetStateAction<any>>
  collected_mtd_descfffedProps: any 
  setcollected_mtd_descfffedProps: React.Dispatch<React.SetStateAction<any>>
  search_btn4c2ed: any,
  setsearch_btn4c2ed:React.Dispatch<React.SetStateAction<any>>
  search_btn4c2edProps: any 
  setsearch_btn4c2edProps: React.Dispatch<React.SetStateAction<any>>
  add_btn2f9d0: any,
  setadd_btn2f9d0:React.Dispatch<React.SetStateAction<any>>
  add_btn2f9d0Props: any 
  setadd_btn2f9d0Props: React.Dispatch<React.SetStateAction<any>>
  textc2337: any,
  settextc2337:React.Dispatch<React.SetStateAction<any>>
  textc2337Props: any 
  settextc2337Props: React.Dispatch<React.SetStateAction<any>>
  case_display_id8caab: any,
  setcase_display_id8caab:React.Dispatch<React.SetStateAction<any>>
  case_display_id8caabProps: any 
  setcase_display_id8caabProps: React.Dispatch<React.SetStateAction<any>>
  debtor_namedb464: any,
  setdebtor_namedb464:React.Dispatch<React.SetStateAction<any>>
  debtor_namedb464Props: any 
  setdebtor_namedb464Props: React.Dispatch<React.SetStateAction<any>>
  creditor_name29781: any,
  setcreditor_name29781:React.Dispatch<React.SetStateAction<any>>
  creditor_name29781Props: any 
  setcreditor_name29781Props: React.Dispatch<React.SetStateAction<any>>
  full_nameda699: any,
  setfull_nameda699:React.Dispatch<React.SetStateAction<any>>
  full_nameda699Props: any 
  setfull_nameda699Props: React.Dispatch<React.SetStateAction<any>>
  total_balancea27e6: any,
  settotal_balancea27e6:React.Dispatch<React.SetStateAction<any>>
  total_balancea27e6Props: any 
  settotal_balancea27e6Props: React.Dispatch<React.SetStateAction<any>>
  court_name03aea: any,
  setcourt_name03aea:React.Dispatch<React.SetStateAction<any>>
  court_name03aeaProps: any 
  setcourt_name03aeaProps: React.Dispatch<React.SetStateAction<any>>
  priority_namec8266: any,
  setpriority_namec8266:React.Dispatch<React.SetStateAction<any>>
  priority_namec8266Props: any 
  setpriority_namec8266Props: React.Dispatch<React.SetStateAction<any>>
  status_named2368: any,
  setstatus_named2368:React.Dispatch<React.SetStateAction<any>>
  status_named2368Props: any 
  setstatus_named2368Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_datec9e9d: any,
  settrs_created_datec9e9d:React.Dispatch<React.SetStateAction<any>>
  trs_created_datec9e9dProps: any 
  settrs_created_datec9e9dProps: React.Dispatch<React.SetStateAction<any>>
  view_btns77c69: any,
  setview_btns77c69:React.Dispatch<React.SetStateAction<any>>
  view_btns77c69Props: any 
  setview_btns77c69Props: React.Dispatch<React.SetStateAction<any>>
  edit_btns48ea7: any,
  setedit_btns48ea7:React.Dispatch<React.SetStateAction<any>>
  edit_btns48ea7Props: any 
  setedit_btns48ea7Props: React.Dispatch<React.SetStateAction<any>>
  search_btn15268: any,
  setsearch_btn15268:React.Dispatch<React.SetStateAction<any>>
  search_btn15268Props: any 
  setsearch_btn15268Props: React.Dispatch<React.SetStateAction<any>>
  add_btn707cf: any,
  setadd_btn707cf:React.Dispatch<React.SetStateAction<any>>
  add_btn707cfProps: any 
  setadd_btn707cfProps: React.Dispatch<React.SetStateAction<any>>
  text3ced2: any,
  settext3ced2:React.Dispatch<React.SetStateAction<any>>
  text3ced2Props: any 
  settext3ced2Props: React.Dispatch<React.SetStateAction<any>>
  case_display_id32ae4: any,
  setcase_display_id32ae4:React.Dispatch<React.SetStateAction<any>>
  case_display_id32ae4Props: any 
  setcase_display_id32ae4Props: React.Dispatch<React.SetStateAction<any>>
  debtor_namecd77b: any,
  setdebtor_namecd77b:React.Dispatch<React.SetStateAction<any>>
  debtor_namecd77bProps: any 
  setdebtor_namecd77bProps: React.Dispatch<React.SetStateAction<any>>
  creditor_nameb14ce: any,
  setcreditor_nameb14ce:React.Dispatch<React.SetStateAction<any>>
  creditor_nameb14ceProps: any 
  setcreditor_nameb14ceProps: React.Dispatch<React.SetStateAction<any>>
  full_name592f3: any,
  setfull_name592f3:React.Dispatch<React.SetStateAction<any>>
  full_name592f3Props: any 
  setfull_name592f3Props: React.Dispatch<React.SetStateAction<any>>
  total_balance98c00: any,
  settotal_balance98c00:React.Dispatch<React.SetStateAction<any>>
  total_balance98c00Props: any 
  settotal_balance98c00Props: React.Dispatch<React.SetStateAction<any>>
  court_name4b97b: any,
  setcourt_name4b97b:React.Dispatch<React.SetStateAction<any>>
  court_name4b97bProps: any 
  setcourt_name4b97bProps: React.Dispatch<React.SetStateAction<any>>
  priority_namec61c4: any,
  setpriority_namec61c4:React.Dispatch<React.SetStateAction<any>>
  priority_namec61c4Props: any 
  setpriority_namec61c4Props: React.Dispatch<React.SetStateAction<any>>
  status_namec590e: any,
  setstatus_namec590e:React.Dispatch<React.SetStateAction<any>>
  status_namec590eProps: any 
  setstatus_namec590eProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date4e909: any,
  settrs_created_date4e909:React.Dispatch<React.SetStateAction<any>>
  trs_created_date4e909Props: any 
  settrs_created_date4e909Props: React.Dispatch<React.SetStateAction<any>>
  view_btn88178: any,
  setview_btn88178:React.Dispatch<React.SetStateAction<any>>
  view_btn88178Props: any 
  setview_btn88178Props: React.Dispatch<React.SetStateAction<any>>
  edit_btn4cc84: any,
  setedit_btn4cc84:React.Dispatch<React.SetStateAction<any>>
  edit_btn4cc84Props: any 
  setedit_btn4cc84Props: React.Dispatch<React.SetStateAction<any>>
  status77d60: any,
  setstatus77d60:React.Dispatch<React.SetStateAction<any>>
  status77d60Props: any 
  setstatus77d60Props: React.Dispatch<React.SetStateAction<any>>
  advancesearch6059f: any,
  setadvancesearch6059f:React.Dispatch<React.SetStateAction<any>>
  advancesearch6059fProps: any 
  setadvancesearch6059fProps: React.Dispatch<React.SetStateAction<any>>
  craete_header_textace67: any,
  setcraete_header_textace67:React.Dispatch<React.SetStateAction<any>>
  craete_header_textace67Props: any 
  setcraete_header_textace67Props: React.Dispatch<React.SetStateAction<any>>
  cancel_button70ef3: any,
  setcancel_button70ef3:React.Dispatch<React.SetStateAction<any>>
  cancel_button70ef3Props: any 
  setcancel_button70ef3Props: React.Dispatch<React.SetStateAction<any>>
  update294f0: any,
  setupdate294f0:React.Dispatch<React.SetStateAction<any>>
  update294f0Props: any 
  setupdate294f0Props: React.Dispatch<React.SetStateAction<any>>
  submit0112f: any,
  setsubmit0112f:React.Dispatch<React.SetStateAction<any>>
  submit0112fProps: any 
  setsubmit0112fProps: React.Dispatch<React.SetStateAction<any>>
  venue_id0c4bb: any,
  setvenue_id0c4bb:React.Dispatch<React.SetStateAction<any>>
  venue_id0c4bbProps: any 
  setvenue_id0c4bbProps: React.Dispatch<React.SetStateAction<any>>
  creditor_idf6f71: any,
  setcreditor_idf6f71:React.Dispatch<React.SetStateAction<any>>
  creditor_idf6f71Props: any 
  setcreditor_idf6f71Props: React.Dispatch<React.SetStateAction<any>>
  case_info_text1f2c8: any,
  setcase_info_text1f2c8:React.Dispatch<React.SetStateAction<any>>
  case_info_text1f2c8Props: any 
  setcase_info_text1f2c8Props: React.Dispatch<React.SetStateAction<any>>
  creditor_namef8de4: any,
  setcreditor_namef8de4:React.Dispatch<React.SetStateAction<any>>
  creditor_namef8de4Props: any 
  setcreditor_namef8de4Props: React.Dispatch<React.SetStateAction<any>>
  attorney_name073fd: any,
  setattorney_name073fd:React.Dispatch<React.SetStateAction<any>>
  attorney_name073fdProps: any 
  setattorney_name073fdProps: React.Dispatch<React.SetStateAction<any>>
  priority_namebcbd5: any,
  setpriority_namebcbd5:React.Dispatch<React.SetStateAction<any>>
  priority_namebcbd5Props: any 
  setpriority_namebcbd5Props: React.Dispatch<React.SetStateAction<any>>
  status_namecbe6f: any,
  setstatus_namecbe6f:React.Dispatch<React.SetStateAction<any>>
  status_namecbe6fProps: any 
  setstatus_namecbe6fProps: React.Dispatch<React.SetStateAction<any>>
  queue_position049be: any,
  setqueue_position049be:React.Dispatch<React.SetStateAction<any>>
  queue_position049beProps: any 
  setqueue_position049beProps: React.Dispatch<React.SetStateAction<any>>
  quality_score2c29e: any,
  setquality_score2c29e:React.Dispatch<React.SetStateAction<any>>
  quality_score2c29eProps: any 
  setquality_score2c29eProps: React.Dispatch<React.SetStateAction<any>>
  sla_wait_start_time2fb95: any,
  setsla_wait_start_time2fb95:React.Dispatch<React.SetStateAction<any>>
  sla_wait_start_time2fb95Props: any 
  setsla_wait_start_time2fb95Props: React.Dispatch<React.SetStateAction<any>>
  rules_iconbdce0: any,
  setrules_iconbdce0:React.Dispatch<React.SetStateAction<any>>
  rules_iconbdce0Props: any 
  setrules_iconbdce0Props: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_text2cdf6: any,
  setvenue_special_rules_text2cdf6:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_text2cdf6Props: any 
  setvenue_special_rules_text2cdf6Props: React.Dispatch<React.SetStateAction<any>>
  special_rulesbd9d8: any,
  setspecial_rulesbd9d8:React.Dispatch<React.SetStateAction<any>>
  special_rulesbd9d8Props: any 
  setspecial_rulesbd9d8Props: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividere4760: any,
  setvenue_special_rules_dividere4760:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividere4760Props: any 
  setvenue_special_rules_dividere4760Props: React.Dispatch<React.SetStateAction<any>>
  warning_iconc4eea: any,
  setwarning_iconc4eea:React.Dispatch<React.SetStateAction<any>>
  warning_iconc4eeaProps: any 
  setwarning_iconc4eeaProps: React.Dispatch<React.SetStateAction<any>>
  georgia_sol_text6238e: any,
  setgeorgia_sol_text6238e:React.Dispatch<React.SetStateAction<any>>
  georgia_sol_text6238eProps: any 
  setgeorgia_sol_text6238eProps: React.Dispatch<React.SetStateAction<any>>
  special_rules031f4: any,
  setspecial_rules031f4:React.Dispatch<React.SetStateAction<any>>
  special_rules031f4Props: any 
  setspecial_rules031f4Props: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerscd6e7: any,
  setvenue_special_rules_dividerscd6e7:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerscd6e7Props: any 
  setvenue_special_rules_dividerscd6e7Props: React.Dispatch<React.SetStateAction<any>>
  warnings_icon63b3d: any,
  setwarnings_icon63b3d:React.Dispatch<React.SetStateAction<any>>
  warnings_icon63b3dProps: any 
  setwarnings_icon63b3dProps: React.Dispatch<React.SetStateAction<any>>
  georgias_sol_textea2e1: any,
  setgeorgias_sol_textea2e1:React.Dispatch<React.SetStateAction<any>>
  georgias_sol_textea2e1Props: any 
  setgeorgias_sol_textea2e1Props: React.Dispatch<React.SetStateAction<any>>
  specials_rulesb4b8b: any,
  setspecials_rulesb4b8b:React.Dispatch<React.SetStateAction<any>>
  specials_rulesb4b8bProps: any 
  setspecials_rulesb4b8bProps: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerss0fa18: any,
  setvenue_special_rules_dividerss0fa18:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerss0fa18Props: any 
  setvenue_special_rules_dividerss0fa18Props: React.Dispatch<React.SetStateAction<any>>
  warningss_iconsb27c3: any,
  setwarningss_iconsb27c3:React.Dispatch<React.SetStateAction<any>>
  warningss_iconsb27c3Props: any 
  setwarningss_iconsb27c3Props: React.Dispatch<React.SetStateAction<any>>
  georgias_sosl_texts1ccd5: any,
  setgeorgias_sosl_texts1ccd5:React.Dispatch<React.SetStateAction<any>>
  georgias_sosl_texts1ccd5Props: any 
  setgeorgias_sosl_texts1ccd5Props: React.Dispatch<React.SetStateAction<any>>
  specials_rulesscabb6: any,
  setspecials_rulesscabb6:React.Dispatch<React.SetStateAction<any>>
  specials_rulesscabb6Props: any 
  setspecials_rulesscabb6Props: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerssss2b01f: any,
  setvenue_special_rules_dividerssss2b01f:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerssss2b01fProps: any 
  setvenue_special_rules_dividerssss2b01fProps: React.Dispatch<React.SetStateAction<any>>
  warningsss_iconse38db: any,
  setwarningsss_iconse38db:React.Dispatch<React.SetStateAction<any>>
  warningsss_iconse38dbProps: any 
  setwarningsss_iconse38dbProps: React.Dispatch<React.SetStateAction<any>>
  georgiass_sosl_texts52ad5: any,
  setgeorgiass_sosl_texts52ad5:React.Dispatch<React.SetStateAction<any>>
  georgiass_sosl_texts52ad5Props: any 
  setgeorgiass_sosl_texts52ad5Props: React.Dispatch<React.SetStateAction<any>>
  speciasls_rulessc3d56: any,
  setspeciasls_rulessc3d56:React.Dispatch<React.SetStateAction<any>>
  speciasls_rulessc3d56Props: any 
  setspeciasls_rulessc3d56Props: React.Dispatch<React.SetStateAction<any>>
  venues_special_rules_dividerssss9b36c: any,
  setvenues_special_rules_dividerssss9b36c:React.Dispatch<React.SetStateAction<any>>
  venues_special_rules_dividerssss9b36cProps: any 
  setvenues_special_rules_dividerssss9b36cProps: React.Dispatch<React.SetStateAction<any>>
  warningssss_iconsbdae5: any,
  setwarningssss_iconsbdae5:React.Dispatch<React.SetStateAction<any>>
  warningssss_iconsbdae5Props: any 
  setwarningssss_iconsbdae5Props: React.Dispatch<React.SetStateAction<any>>
  georsgiass_sosl_texts14d14: any,
  setgeorsgiass_sosl_texts14d14:React.Dispatch<React.SetStateAction<any>>
  georsgiass_sosl_texts14d14Props: any 
  setgeorsgiass_sosl_texts14d14Props: React.Dispatch<React.SetStateAction<any>>
  spesciasls_ruless22364: any,
  setspesciasls_ruless22364:React.Dispatch<React.SetStateAction<any>>
  spesciasls_ruless22364Props: any 
  setspesciasls_ruless22364Props: React.Dispatch<React.SetStateAction<any>>
  debt_info_text9078e: any,
  setdebt_info_text9078e:React.Dispatch<React.SetStateAction<any>>
  debt_info_text9078eProps: any 
  setdebt_info_text9078eProps: React.Dispatch<React.SetStateAction<any>>
  debtor_namea5e3f: any,
  setdebtor_namea5e3f:React.Dispatch<React.SetStateAction<any>>
  debtor_namea5e3fProps: any 
  setdebtor_namea5e3fProps: React.Dispatch<React.SetStateAction<any>>
  ssn_masked273fe: any,
  setssn_masked273fe:React.Dispatch<React.SetStateAction<any>>
  ssn_masked273feProps: any 
  setssn_masked273feProps: React.Dispatch<React.SetStateAction<any>>
  dobdba19: any,
  setdobdba19:React.Dispatch<React.SetStateAction<any>>
  dobdba19Props: any 
  setdobdba19Props: React.Dispatch<React.SetStateAction<any>>
  addressa3e42: any,
  setaddressa3e42:React.Dispatch<React.SetStateAction<any>>
  addressa3e42Props: any 
  setaddressa3e42Props: React.Dispatch<React.SetStateAction<any>>
  financial_dtls_text3b122: any,
  setfinancial_dtls_text3b122:React.Dispatch<React.SetStateAction<any>>
  financial_dtls_text3b122Props: any 
  setfinancial_dtls_text3b122Props: React.Dispatch<React.SetStateAction<any>>
  charge_off_datef15ef: any,
  setcharge_off_datef15ef:React.Dispatch<React.SetStateAction<any>>
  charge_off_datef15efProps: any 
  setcharge_off_datef15efProps: React.Dispatch<React.SetStateAction<any>>
  last_payment_date23905: any,
  setlast_payment_date23905:React.Dispatch<React.SetStateAction<any>>
  last_payment_date23905Props: any 
  setlast_payment_date23905Props: React.Dispatch<React.SetStateAction<any>>
  total_balanced15a0: any,
  settotal_balanced15a0:React.Dispatch<React.SetStateAction<any>>
  total_balanced15a0Props: any 
  settotal_balanced15a0Props: React.Dispatch<React.SetStateAction<any>>
  principalc3ba6: any,
  setprincipalc3ba6:React.Dispatch<React.SetStateAction<any>>
  principalc3ba6Props: any 
  setprincipalc3ba6Props: React.Dispatch<React.SetStateAction<any>>
  interest81968: any,
  setinterest81968:React.Dispatch<React.SetStateAction<any>>
  interest81968Props: any 
  setinterest81968Props: React.Dispatch<React.SetStateAction<any>>
  fees0f99a: any,
  setfees0f99a:React.Dispatch<React.SetStateAction<any>>
  fees0f99aProps: any 
  setfees0f99aProps: React.Dispatch<React.SetStateAction<any>>
  ven_name_textef3ac: any,
  setven_name_textef3ac:React.Dispatch<React.SetStateAction<any>>
  ven_name_textef3acProps: any 
  setven_name_textef3acProps: React.Dispatch<React.SetStateAction<any>>
  state752e3: any,
  setstate752e3:React.Dispatch<React.SetStateAction<any>>
  state752e3Props: any 
  setstate752e3Props: React.Dispatch<React.SetStateAction<any>>
  countryf4404: any,
  setcountryf4404:React.Dispatch<React.SetStateAction<any>>
  countryf4404Props: any 
  setcountryf4404Props: React.Dispatch<React.SetStateAction<any>>
  court_namef21b5: any,
  setcourt_namef21b5:React.Dispatch<React.SetStateAction<any>>
  court_namef21b5Props: any 
  setcourt_namef21b5Props: React.Dispatch<React.SetStateAction<any>>
  judge_name78f03: any,
  setjudge_name78f03:React.Dispatch<React.SetStateAction<any>>
  judge_name78f03Props: any 
  setjudge_name78f03Props: React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date8639c: any,
  setsol_expiry_date8639c:React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date8639cProps: any 
  setsol_expiry_date8639cProps: React.Dispatch<React.SetStateAction<any>>
  filing_fee389dd: any,
  setfiling_fee389dd:React.Dispatch<React.SetStateAction<any>>
  filing_fee389ddProps: any 
  setfiling_fee389ddProps: React.Dispatch<React.SetStateAction<any>>
  service_methoddeae7: any,
  setservice_methoddeae7:React.Dispatch<React.SetStateAction<any>>
  service_methoddeae7Props: any 
  setservice_methoddeae7Props: React.Dispatch<React.SetStateAction<any>>
  efiling_systemc00e5: any,
  setefiling_systemc00e5:React.Dispatch<React.SetStateAction<any>>
  efiling_systemc00e5Props: any 
  setefiling_systemc00e5Props: React.Dispatch<React.SetStateAction<any>>
  efiling_requiredb3e9d: any,
  setefiling_requiredb3e9d:React.Dispatch<React.SetStateAction<any>>
  efiling_requiredb3e9dProps: any 
  setefiling_requiredb3e9dProps: React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text9e8f8: any,
  setreeq_doc_text9e8f8:React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text9e8f8Props: any 
  setreeq_doc_text9e8f8Props: React.Dispatch<React.SetStateAction<any>>
  doc_type_idaf61f: any,
  setdoc_type_idaf61f:React.Dispatch<React.SetStateAction<any>>
  doc_type_idaf61fProps: any 
  setdoc_type_idaf61fProps: React.Dispatch<React.SetStateAction<any>>
  doc_type_name949dd: any,
  setdoc_type_name949dd:React.Dispatch<React.SetStateAction<any>>
  doc_type_name949ddProps: any 
  setdoc_type_name949ddProps: React.Dispatch<React.SetStateAction<any>>
  uploaderdff25: any,
  setuploaderdff25:React.Dispatch<React.SetStateAction<any>>
  uploaderdff25Props: any 
  setuploaderdff25Props: React.Dispatch<React.SetStateAction<any>>
  doc_reference_urld9056: any,
  setdoc_reference_urld9056:React.Dispatch<React.SetStateAction<any>>
  doc_reference_urld9056Props: any 
  setdoc_reference_urld9056Props: React.Dispatch<React.SetStateAction<any>>
  description_textb45ef: any,
  setdescription_textb45ef:React.Dispatch<React.SetStateAction<any>>
  description_textb45efProps: any 
  setdescription_textb45efProps: React.Dispatch<React.SetStateAction<any>>
  customwidgetd1a34: any,
  setcustomwidgetd1a34:React.Dispatch<React.SetStateAction<any>>
  customwidgetd1a34Props: any 
  setcustomwidgetd1a34Props: React.Dispatch<React.SetStateAction<any>>
  account_id7e64e: any,
  setaccount_id7e64e:React.Dispatch<React.SetStateAction<any>>
  account_id7e64eProps: any 
  setaccount_id7e64eProps: React.Dispatch<React.SetStateAction<any>>
  valid_checklist_textc0f22: any,
  setvalid_checklist_textc0f22:React.Dispatch<React.SetStateAction<any>>
  valid_checklist_textc0f22Props: any 
  setvalid_checklist_textc0f22Props: React.Dispatch<React.SetStateAction<any>>
  checklist_item_id255b0: any,
  setchecklist_item_id255b0:React.Dispatch<React.SetStateAction<any>>
  checklist_item_id255b0Props: any 
  setchecklist_item_id255b0Props: React.Dispatch<React.SetStateAction<any>>
  item_nameeed39: any,
  setitem_nameeed39:React.Dispatch<React.SetStateAction<any>>
  item_nameeed39Props: any 
  setitem_nameeed39Props: React.Dispatch<React.SetStateAction<any>>
  is_completeb8c69: any,
  setis_completeb8c69:React.Dispatch<React.SetStateAction<any>>
  is_completeb8c69Props: any 
  setis_completeb8c69Props: React.Dispatch<React.SetStateAction<any>>
  remarks_textareadc753: any,
  setremarks_textareadc753:React.Dispatch<React.SetStateAction<any>>
  remarks_textareadc753Props: any 
  setremarks_textareadc753Props: React.Dispatch<React.SetStateAction<any>>
  craete_header_text93eaa: any,
  setcraete_header_text93eaa:React.Dispatch<React.SetStateAction<any>>
  craete_header_text93eaaProps: any 
  setcraete_header_text93eaaProps: React.Dispatch<React.SetStateAction<any>>
  venue_idcb444: any,
  setvenue_idcb444:React.Dispatch<React.SetStateAction<any>>
  venue_idcb444Props: any 
  setvenue_idcb444Props: React.Dispatch<React.SetStateAction<any>>
  creditor_idb1867: any,
  setcreditor_idb1867:React.Dispatch<React.SetStateAction<any>>
  creditor_idb1867Props: any 
  setcreditor_idb1867Props: React.Dispatch<React.SetStateAction<any>>
  case_info_textdf3f1: any,
  setcase_info_textdf3f1:React.Dispatch<React.SetStateAction<any>>
  case_info_textdf3f1Props: any 
  setcase_info_textdf3f1Props: React.Dispatch<React.SetStateAction<any>>
  creditor_name257be: any,
  setcreditor_name257be:React.Dispatch<React.SetStateAction<any>>
  creditor_name257beProps: any 
  setcreditor_name257beProps: React.Dispatch<React.SetStateAction<any>>
  attorney_name87be1: any,
  setattorney_name87be1:React.Dispatch<React.SetStateAction<any>>
  attorney_name87be1Props: any 
  setattorney_name87be1Props: React.Dispatch<React.SetStateAction<any>>
  status_namea5f92: any,
  setstatus_namea5f92:React.Dispatch<React.SetStateAction<any>>
  status_namea5f92Props: any 
  setstatus_namea5f92Props: React.Dispatch<React.SetStateAction<any>>
  priority_name449dd: any,
  setpriority_name449dd:React.Dispatch<React.SetStateAction<any>>
  priority_name449ddProps: any 
  setpriority_name449ddProps: React.Dispatch<React.SetStateAction<any>>
  queue_positionceb8d: any,
  setqueue_positionceb8d:React.Dispatch<React.SetStateAction<any>>
  queue_positionceb8dProps: any 
  setqueue_positionceb8dProps: React.Dispatch<React.SetStateAction<any>>
  quality_scoredfaa9: any,
  setquality_scoredfaa9:React.Dispatch<React.SetStateAction<any>>
  quality_scoredfaa9Props: any 
  setquality_scoredfaa9Props: React.Dispatch<React.SetStateAction<any>>
  sla_wait_start_time20502: any,
  setsla_wait_start_time20502:React.Dispatch<React.SetStateAction<any>>
  sla_wait_start_time20502Props: any 
  setsla_wait_start_time20502Props: React.Dispatch<React.SetStateAction<any>>
  rules_iconfb03f: any,
  setrules_iconfb03f:React.Dispatch<React.SetStateAction<any>>
  rules_iconfb03fProps: any 
  setrules_iconfb03fProps: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_textecd92: any,
  setvenue_special_rules_textecd92:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_textecd92Props: any 
  setvenue_special_rules_textecd92Props: React.Dispatch<React.SetStateAction<any>>
  special_rules2001a: any,
  setspecial_rules2001a:React.Dispatch<React.SetStateAction<any>>
  special_rules2001aProps: any 
  setspecial_rules2001aProps: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_divider206ab: any,
  setvenue_special_rules_divider206ab:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_divider206abProps: any 
  setvenue_special_rules_divider206abProps: React.Dispatch<React.SetStateAction<any>>
  warning_icond1cd0: any,
  setwarning_icond1cd0:React.Dispatch<React.SetStateAction<any>>
  warning_icond1cd0Props: any 
  setwarning_icond1cd0Props: React.Dispatch<React.SetStateAction<any>>
  georgia_sol_text460ef: any,
  setgeorgia_sol_text460ef:React.Dispatch<React.SetStateAction<any>>
  georgia_sol_text460efProps: any 
  setgeorgia_sol_text460efProps: React.Dispatch<React.SetStateAction<any>>
  special_rulesd6c6e: any,
  setspecial_rulesd6c6e:React.Dispatch<React.SetStateAction<any>>
  special_rulesd6c6eProps: any 
  setspecial_rulesd6c6eProps: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividers28a68: any,
  setvenue_special_rules_dividers28a68:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividers28a68Props: any 
  setvenue_special_rules_dividers28a68Props: React.Dispatch<React.SetStateAction<any>>
  warnings_icon0adcc: any,
  setwarnings_icon0adcc:React.Dispatch<React.SetStateAction<any>>
  warnings_icon0adccProps: any 
  setwarnings_icon0adccProps: React.Dispatch<React.SetStateAction<any>>
  georgias_sol_text24265: any,
  setgeorgias_sol_text24265:React.Dispatch<React.SetStateAction<any>>
  georgias_sol_text24265Props: any 
  setgeorgias_sol_text24265Props: React.Dispatch<React.SetStateAction<any>>
  specials_rules14021: any,
  setspecials_rules14021:React.Dispatch<React.SetStateAction<any>>
  specials_rules14021Props: any 
  setspecials_rules14021Props: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerss0c16e: any,
  setvenue_special_rules_dividerss0c16e:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividerss0c16eProps: any 
  setvenue_special_rules_dividerss0c16eProps: React.Dispatch<React.SetStateAction<any>>
  warningss_icons476c3: any,
  setwarningss_icons476c3:React.Dispatch<React.SetStateAction<any>>
  warningss_icons476c3Props: any 
  setwarningss_icons476c3Props: React.Dispatch<React.SetStateAction<any>>
  georgias_sosl_texts3f264: any,
  setgeorgias_sosl_texts3f264:React.Dispatch<React.SetStateAction<any>>
  georgias_sosl_texts3f264Props: any 
  setgeorgias_sosl_texts3f264Props: React.Dispatch<React.SetStateAction<any>>
  specials_rulesscc30f: any,
  setspecials_rulesscc30f:React.Dispatch<React.SetStateAction<any>>
  specials_rulesscc30fProps: any 
  setspecials_rulesscc30fProps: React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividersssdcaab: any,
  setvenue_special_rules_dividersssdcaab:React.Dispatch<React.SetStateAction<any>>
  venue_special_rules_dividersssdcaabProps: any 
  setvenue_special_rules_dividersssdcaabProps: React.Dispatch<React.SetStateAction<any>>
  warningsss_icons3be9c: any,
  setwarningsss_icons3be9c:React.Dispatch<React.SetStateAction<any>>
  warningsss_icons3be9cProps: any 
  setwarningsss_icons3be9cProps: React.Dispatch<React.SetStateAction<any>>
  georgiass_sosl_texts88097: any,
  setgeorgiass_sosl_texts88097:React.Dispatch<React.SetStateAction<any>>
  georgiass_sosl_texts88097Props: any 
  setgeorgiass_sosl_texts88097Props: React.Dispatch<React.SetStateAction<any>>
  specials_ruless95686: any,
  setspecials_ruless95686:React.Dispatch<React.SetStateAction<any>>
  specials_ruless95686Props: any 
  setspecials_ruless95686Props: React.Dispatch<React.SetStateAction<any>>
  venues_special_rules_dividerssss44419: any,
  setvenues_special_rules_dividerssss44419:React.Dispatch<React.SetStateAction<any>>
  venues_special_rules_dividerssss44419Props: any 
  setvenues_special_rules_dividerssss44419Props: React.Dispatch<React.SetStateAction<any>>
  warningssss_icons55275: any,
  setwarningssss_icons55275:React.Dispatch<React.SetStateAction<any>>
  warningssss_icons55275Props: any 
  setwarningssss_icons55275Props: React.Dispatch<React.SetStateAction<any>>
  georsgiass_sosl_texts15f5e: any,
  setgeorsgiass_sosl_texts15f5e:React.Dispatch<React.SetStateAction<any>>
  georsgiass_sosl_texts15f5eProps: any 
  setgeorsgiass_sosl_texts15f5eProps: React.Dispatch<React.SetStateAction<any>>
  spesciasls_ruless910f1: any,
  setspesciasls_ruless910f1:React.Dispatch<React.SetStateAction<any>>
  spesciasls_ruless910f1Props: any 
  setspesciasls_ruless910f1Props: React.Dispatch<React.SetStateAction<any>>
  debt_info_textb09b8: any,
  setdebt_info_textb09b8:React.Dispatch<React.SetStateAction<any>>
  debt_info_textb09b8Props: any 
  setdebt_info_textb09b8Props: React.Dispatch<React.SetStateAction<any>>
  debtor_namef7cac: any,
  setdebtor_namef7cac:React.Dispatch<React.SetStateAction<any>>
  debtor_namef7cacProps: any 
  setdebtor_namef7cacProps: React.Dispatch<React.SetStateAction<any>>
  ssn_masked26c46: any,
  setssn_masked26c46:React.Dispatch<React.SetStateAction<any>>
  ssn_masked26c46Props: any 
  setssn_masked26c46Props: React.Dispatch<React.SetStateAction<any>>
  dob0f0bf: any,
  setdob0f0bf:React.Dispatch<React.SetStateAction<any>>
  dob0f0bfProps: any 
  setdob0f0bfProps: React.Dispatch<React.SetStateAction<any>>
  address22d72: any,
  setaddress22d72:React.Dispatch<React.SetStateAction<any>>
  address22d72Props: any 
  setaddress22d72Props: React.Dispatch<React.SetStateAction<any>>
  financial_dtls_text3451f: any,
  setfinancial_dtls_text3451f:React.Dispatch<React.SetStateAction<any>>
  financial_dtls_text3451fProps: any 
  setfinancial_dtls_text3451fProps: React.Dispatch<React.SetStateAction<any>>
  charge_off_date13a39: any,
  setcharge_off_date13a39:React.Dispatch<React.SetStateAction<any>>
  charge_off_date13a39Props: any 
  setcharge_off_date13a39Props: React.Dispatch<React.SetStateAction<any>>
  last_payment_dateeab2f: any,
  setlast_payment_dateeab2f:React.Dispatch<React.SetStateAction<any>>
  last_payment_dateeab2fProps: any 
  setlast_payment_dateeab2fProps: React.Dispatch<React.SetStateAction<any>>
  total_balanceca1e1: any,
  settotal_balanceca1e1:React.Dispatch<React.SetStateAction<any>>
  total_balanceca1e1Props: any 
  settotal_balanceca1e1Props: React.Dispatch<React.SetStateAction<any>>
  principal6eb2a: any,
  setprincipal6eb2a:React.Dispatch<React.SetStateAction<any>>
  principal6eb2aProps: any 
  setprincipal6eb2aProps: React.Dispatch<React.SetStateAction<any>>
  interesta6b7d: any,
  setinteresta6b7d:React.Dispatch<React.SetStateAction<any>>
  interesta6b7dProps: any 
  setinteresta6b7dProps: React.Dispatch<React.SetStateAction<any>>
  feesb456c: any,
  setfeesb456c:React.Dispatch<React.SetStateAction<any>>
  feesb456cProps: any 
  setfeesb456cProps: React.Dispatch<React.SetStateAction<any>>
  ven_name_text0c8ba: any,
  setven_name_text0c8ba:React.Dispatch<React.SetStateAction<any>>
  ven_name_text0c8baProps: any 
  setven_name_text0c8baProps: React.Dispatch<React.SetStateAction<any>>
  state3010e: any,
  setstate3010e:React.Dispatch<React.SetStateAction<any>>
  state3010eProps: any 
  setstate3010eProps: React.Dispatch<React.SetStateAction<any>>
  country1983b: any,
  setcountry1983b:React.Dispatch<React.SetStateAction<any>>
  country1983bProps: any 
  setcountry1983bProps: React.Dispatch<React.SetStateAction<any>>
  court_name41a77: any,
  setcourt_name41a77:React.Dispatch<React.SetStateAction<any>>
  court_name41a77Props: any 
  setcourt_name41a77Props: React.Dispatch<React.SetStateAction<any>>
  judge_name0a819: any,
  setjudge_name0a819:React.Dispatch<React.SetStateAction<any>>
  judge_name0a819Props: any 
  setjudge_name0a819Props: React.Dispatch<React.SetStateAction<any>>
  sol_expiry_dated5486: any,
  setsol_expiry_dated5486:React.Dispatch<React.SetStateAction<any>>
  sol_expiry_dated5486Props: any 
  setsol_expiry_dated5486Props: React.Dispatch<React.SetStateAction<any>>
  filing_fee89c7f: any,
  setfiling_fee89c7f:React.Dispatch<React.SetStateAction<any>>
  filing_fee89c7fProps: any 
  setfiling_fee89c7fProps: React.Dispatch<React.SetStateAction<any>>
  service_method1b411: any,
  setservice_method1b411:React.Dispatch<React.SetStateAction<any>>
  service_method1b411Props: any 
  setservice_method1b411Props: React.Dispatch<React.SetStateAction<any>>
  efiling_system7d508: any,
  setefiling_system7d508:React.Dispatch<React.SetStateAction<any>>
  efiling_system7d508Props: any 
  setefiling_system7d508Props: React.Dispatch<React.SetStateAction<any>>
  efiling_required36d60: any,
  setefiling_required36d60:React.Dispatch<React.SetStateAction<any>>
  efiling_required36d60Props: any 
  setefiling_required36d60Props: React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text732f8: any,
  setreeq_doc_text732f8:React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text732f8Props: any 
  setreeq_doc_text732f8Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id54469: any,
  setattachment_id54469:React.Dispatch<React.SetStateAction<any>>
  attachment_id54469Props: any 
  setattachment_id54469Props: React.Dispatch<React.SetStateAction<any>>
  doc_name513db: any,
  setdoc_name513db:React.Dispatch<React.SetStateAction<any>>
  doc_name513dbProps: any 
  setdoc_name513dbProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_by736ad: any,
  settrs_created_by736ad:React.Dispatch<React.SetStateAction<any>>
  trs_created_by736adProps: any 
  settrs_created_by736adProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_datecfead: any,
  settrs_created_datecfead:React.Dispatch<React.SetStateAction<any>>
  trs_created_datecfeadProps: any 
  settrs_created_datecfeadProps: React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text1428a: any,
  setvalid_checklist_text1428a:React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text1428aProps: any 
  setvalid_checklist_text1428aProps: React.Dispatch<React.SetStateAction<any>>
  checklist_item_id611e6: any,
  setchecklist_item_id611e6:React.Dispatch<React.SetStateAction<any>>
  checklist_item_id611e6Props: any 
  setchecklist_item_id611e6Props: React.Dispatch<React.SetStateAction<any>>
  item_nameafc9a: any,
  setitem_nameafc9a:React.Dispatch<React.SetStateAction<any>>
  item_nameafc9aProps: any 
  setitem_nameafc9aProps: React.Dispatch<React.SetStateAction<any>>
  is_completed6ef7a: any,
  setis_completed6ef7a:React.Dispatch<React.SetStateAction<any>>
  is_completed6ef7aProps: any 
  setis_completed6ef7aProps: React.Dispatch<React.SetStateAction<any>>
  remarks_textarea15a62: any,
  setremarks_textarea15a62:React.Dispatch<React.SetStateAction<any>>
  remarks_textarea15a62Props: any 
  setremarks_textarea15a62Props: React.Dispatch<React.SetStateAction<any>>
  account_id4ecc7: any,
  setaccount_id4ecc7:React.Dispatch<React.SetStateAction<any>>
  account_id4ecc7Props: any 
  setaccount_id4ecc7Props: React.Dispatch<React.SetStateAction<any>>
  documentviewer64771: any,
  setdocumentviewer64771:React.Dispatch<React.SetStateAction<any>>
  documentviewer64771Props: any 
  setdocumentviewer64771Props: React.Dispatch<React.SetStateAction<any>>
  advancesearch1e502: any,
  setadvancesearch1e502:React.Dispatch<React.SetStateAction<any>>
  advancesearch1e502Props: any 
  setadvancesearch1e502Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  dashboard_v1: any 
  setdashboard_v1: React.Dispatch<React.SetStateAction<any>>
  dashboard_v1Props: any 
  setdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  amrqueuesearch_v1: any 
  setamrqueuesearch_v1: React.Dispatch<React.SetStateAction<any>>
  amrqueuesearch_v1Props: any 
  setamrqueuesearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  addcase_v1: any 
  setaddcase_v1: React.Dispatch<React.SetStateAction<any>>
  addcase_v1Props: any 
  setaddcase_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewcase_v1: any 
  setviewcase_v1: React.Dispatch<React.SetStateAction<any>>
  viewcase_v1Props: any 
  setviewcase_v1Props: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1: any 
  setdocumentviewer_v1: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1Props: any 
  setdocumentviewer_v1Props: React.Dispatch<React.SetStateAction<any>>
  pendingfillingsearch_v1: any 
  setpendingfillingsearch_v1: React.Dispatch<React.SetStateAction<any>>
  pendingfillingsearch_v1Props: any 
  setpendingfillingsearch_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_amrqueuedashboard_v1Props: any 
  setdfd_amrqueuedashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_addcase_v1Props: any 
  setdfd_addcase_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_doctypenamecombo_v1Props: any 
  setdfd_doctypenamecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_attorneyscombo_v1Props: any 
  setdfd_attorneyscombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_prioritycombo_v1Props: any 
  setdfd_prioritycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_statuscombo_v1Props: any 
  setdfd_statuscombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_amrchecklistcombo_v1Props: any 
  setdfd_amrchecklistcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_doctable_v1Props: any 
  setdfd_doctable_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_amrcheckliststatus_v1Props: any 
  setdfd_amrcheckliststatus_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_pendingfilingsdashboard_v1Props: any 
  setdfd_pendingfilingsdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_cardsdashboard_v1Props: any 
  setdfd_cardsdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [header_groupb1913, setheader_groupb1913 ] = React.useState<any>({}) 
    const [header_groupb1913Props, setheader_groupb1913Props ] = React.useState<any>({
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
        const [asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe ] = React.useState<any>({}) 
    const [asset_dashboard_group4bbfeProps, setasset_dashboard_group4bbfeProps ] = React.useState<any>({
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
        const [amr_queue_groupc92ca, setamr_queue_groupc92ca ] = React.useState<any>({}) 
    const [amr_queue_groupc92caProps, setamr_queue_groupc92caProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "amr_queue_text",
            "icon_total_assest",
            "amr_queue",
            "amr_queue_desc",
      ]
      }) 
        const [pending_file_groupffe32, setpending_file_groupffe32 ] = React.useState<any>({}) 
    const [pending_file_groupffe32Props, setpending_file_groupffe32Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "pending_file_text",
            "icon_maintenance_due",
            "pending_filings",
            "pending_file_desc",
      ]
      }) 
        const [service_pending_group7ba93, setservice_pending_group7ba93 ] = React.useState<any>({}) 
    const [service_pending_group7ba93Props, setservice_pending_group7ba93Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "service_pending_text",
            "icon_warranty_expiring",
            "service_pending",
            "service_pending_desc",
      ]
      }) 
        const [slas_at_risk_group23eb4, setslas_at_risk_group23eb4 ] = React.useState<any>({}) 
    const [slas_at_risk_group23eb4Props, setslas_at_risk_group23eb4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "slas_at_risk_text",
            "icon_",
            "slas_at_risk",
            "slas_at_risk_desc",
      ]
      }) 
        const [court_rejection_groupc9d54, setcourt_rejection_groupc9d54 ] = React.useState<any>({}) 
    const [court_rejection_groupc9d54Props, setcourt_rejection_groupc9d54Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "court_rejection_text",
            "icon",
            "court_rejections",
            "court_rejection_desc",
      ]
      }) 
        const [collected_mtd_group7b7b5, setcollected_mtd_group7b7b5 ] = React.useState<any>({}) 
    const [collected_mtd_group7b7b5Props, setcollected_mtd_group7b7b5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "collected_mtd_text",
            "icon",
            "collected_mtd",
            "collected_mtd_desc",
      ]
      }) 
        const [table_group112bd, settable_group112bd ] = React.useState<any>({}) 
    const [table_group112bdProps, settable_group112bdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "status",
      ]
      }) 
        const [subscreene9ab5, setsubscreene9ab5 ] = React.useState<any>({}) 
    const [subscreene9ab5Props, setsubscreene9ab5Props ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797 ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props ] = React.useState<any>({
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
        const [group28176, setgroup28176 ] = React.useState<any>({}) 
    const [group28176Props, setgroup28176Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search_btn",
            "add_btn",
            "text",
      ]
      }) 
    
    const [table852e3, settable852e3 ] = React.useState<any>([]) 
    const [table852e3Props, settable852e3Props ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps ] = React.useState<any>({
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
        const [pending_fillings_groupb1568, setpending_fillings_groupb1568 ] = React.useState<any>({}) 
    const [pending_fillings_groupb1568Props, setpending_fillings_groupb1568Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search_btn",
            "add_btn",
            "text",
      ]
      }) 
    
    const [pending_fillings_table11279, setpending_fillings_table11279 ] = React.useState<any>([]) 
    const [pending_fillings_table11279Props, setpending_fillings_table11279Props ] = React.useState<any>({
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
        const [search_groupdefa1, setsearch_groupdefa1 ] = React.useState<any>({}) 
    const [search_groupdefa1Props, setsearch_groupdefa1Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_display_id",
      ]
      }) 
        const [add_case_groupeb161, setadd_case_groupeb161 ] = React.useState<any>({}) 
    const [add_case_groupeb161Props, setadd_case_groupeb161Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "venue_id",
            "creditor_id",
            "customwidget",
            "account_id",
            "remarks_textarea",
      ]
      }) 
        const [header_group4878f, setheader_group4878f ] = React.useState<any>({}) 
    const [header_group4878fProps, setheader_group4878fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "craete_header_text",
      ]
      }) 
        const [dynamicactions094c3, setdynamicactions094c3 ] = React.useState<any>({}) 
    const [dynamicactions094c3Props, setdynamicactions094c3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel_button",
            "update",
            "submit",
      ]
      }) 
        const [case_information_group28f6f, setcase_information_group28f6f ] = React.useState<any>({}) 
    const [case_information_group28f6fProps, setcase_information_group28f6fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_info_text",
            "creditor_name",
            "attorney_name",
            "priority_name",
            "status_name",
            "queue_position",
            "quality_score",
            "sla_wait_start_time",
      ]
      }) 
        const [venue_group6a36d, setvenue_group6a36d ] = React.useState<any>({}) 
    const [venue_group6a36dProps, setvenue_group6a36dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "rules_icon",
            "venue_special_rules_text",
            "special_rules",
            "venue_special_rules_divider",
            "venue_special_rules_dividers",
            "venue_special_rules_dividerss",
            "venue_special_rules_dividerssss",
            "venues_special_rules_dividerssss",
      ]
      }) 
        const [georgia_group0fa18, setgeorgia_group0fa18 ] = React.useState<any>({}) 
    const [georgia_group0fa18Props, setgeorgia_group0fa18Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warning_icon",
            "georgia_sol_text",
            "special_rules",
      ]
      }) 
        const [georgias_group945fd, setgeorgias_group945fd ] = React.useState<any>({}) 
    const [georgias_group945fdProps, setgeorgias_group945fdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warnings_icon",
            "georgias_sol_text",
            "specials_rules",
      ]
      }) 
        const [georgias_groups6f85f, setgeorgias_groups6f85f ] = React.useState<any>({}) 
    const [georgias_groups6f85fProps, setgeorgias_groups6f85fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningss_icons",
            "georgias_sosl_texts",
            "specials_ruless",
      ]
      }) 
        const [georgiass_groups86a87, setgeorgiass_groups86a87 ] = React.useState<any>({}) 
    const [georgiass_groups86a87Props, setgeorgiass_groups86a87Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningsss_icons",
            "georgiass_sosl_texts",
            "speciasls_ruless",
      ]
      }) 
        const [georgsiass_groupsb044a, setgeorgsiass_groupsb044a ] = React.useState<any>({}) 
    const [georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningssss_icons",
            "georsgiass_sosl_texts",
            "spesciasls_ruless",
      ]
      }) 
        const [debtor_information_group78a70, setdebtor_information_group78a70 ] = React.useState<any>({}) 
    const [debtor_information_group78a70Props, setdebtor_information_group78a70Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debt_info_text",
            "debtor_name",
            "ssn_masked",
            "dob",
            "address",
      ]
      }) 
        const [financial_details_group52f47, setfinancial_details_group52f47 ] = React.useState<any>({}) 
    const [financial_details_group52f47Props, setfinancial_details_group52f47Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "financial_dtls_text",
            "charge_off_date",
            "last_payment_date",
            "total_balance",
            "principal",
            "interest",
            "fees",
      ]
      }) 
        const [venue_details_group17ac6, setvenue_details_group17ac6 ] = React.useState<any>({}) 
    const [venue_details_group17ac6Props, setvenue_details_group17ac6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ven_name_text",
            "state",
            "county",
            "court_name",
            "judge_name",
            "sol_expiry_date",
            "filing_fee",
            "service_method",
            "efiling_system",
            "efiling_required",
      ]
      }) 
        const [required_dociument_main_group04e92, setrequired_dociument_main_group04e92 ] = React.useState<any>({}) 
    const [required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "reeq_doc_text",
            "description_text",
      ]
      }) 
        const [required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8 ] = React.useState<any>({}) 
    const [required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props ] = React.useState<any>({
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
    
    const [doc_type_tablebe9fa, setdoc_type_tablebe9fa ] = React.useState<any>([]) 
    const [doc_type_tablebe9faProps, setdoc_type_tablebe9faProps ] = React.useState<any>({
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
        const [checklist_main_group0df6b, setchecklist_main_group0df6b ] = React.useState<any>({}) 
    const [checklist_main_group0df6bProps, setchecklist_main_group0df6bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "valid_checklist_text",
      ]
      }) 
        const [checklist_group32b3d, setchecklist_group32b3d ] = React.useState<any>({}) 
    const [checklist_group32b3dProps, setchecklist_group32b3dProps ] = React.useState<any>({
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
    
    const [checklist_table198e1, setchecklist_table198e1 ] = React.useState<any>([]) 
    const [checklist_table198e1Props, setchecklist_table198e1Props ] = React.useState<any>({
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
        const [add_case_group1f6e4, setadd_case_group1f6e4 ] = React.useState<any>({}) 
    const [add_case_group1f6e4Props, setadd_case_group1f6e4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "venue_id",
            "creditor_id",
            "remarks_textarea",
            "account_id",
      ]
      }) 
        const [header_group3749a, setheader_group3749a ] = React.useState<any>({}) 
    const [header_group3749aProps, setheader_group3749aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "craete_header_text",
      ]
      }) 
        const [case_information_groupcec29, setcase_information_groupcec29 ] = React.useState<any>({}) 
    const [case_information_groupcec29Props, setcase_information_groupcec29Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_info_text",
            "creditor_name",
            "attorney_name",
            "status_name",
            "priority_name",
            "queue_position",
            "quality_score",
            "sla_wait_start_time",
      ]
      }) 
        const [venue_groupa72d9, setvenue_groupa72d9 ] = React.useState<any>({}) 
    const [venue_groupa72d9Props, setvenue_groupa72d9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "rules_icon",
            "venue_special_rules_text",
            "special_rules",
            "venue_special_rules_divider",
            "venue_special_rules_dividers",
            "venue_special_rules_dividerss",
            "venue_special_rules_dividersss",
            "venues_special_rules_dividerssss",
      ]
      }) 
        const [georgia_groupa636c, setgeorgia_groupa636c ] = React.useState<any>({}) 
    const [georgia_groupa636cProps, setgeorgia_groupa636cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warning_icon",
            "georgia_sol_text",
            "special_rules",
      ]
      }) 
        const [georgias_groupbac01, setgeorgias_groupbac01 ] = React.useState<any>({}) 
    const [georgias_groupbac01Props, setgeorgias_groupbac01Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warnings_icon",
            "georgias_sol_text",
            "specials_rules",
      ]
      }) 
        const [georgias_groupsbf356, setgeorgias_groupsbf356 ] = React.useState<any>({}) 
    const [georgias_groupsbf356Props, setgeorgias_groupsbf356Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningss_icons",
            "georgias_sosl_texts",
            "specials_ruless",
      ]
      }) 
        const [georgiass_groups9e4dd, setgeorgiass_groups9e4dd ] = React.useState<any>({}) 
    const [georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningsss_icons",
            "georgiass_sosl_texts",
            "specials_ruless",
      ]
      }) 
        const [georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a ] = React.useState<any>({}) 
    const [georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningssss_icons",
            "georsgiass_sosl_texts",
            "spesciasls_ruless",
      ]
      }) 
        const [debtor_information_groupdfa55, setdebtor_information_groupdfa55 ] = React.useState<any>({}) 
    const [debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debt_info_text",
            "debtor_name",
            "ssn_masked",
            "dob",
            "address",
      ]
      }) 
        const [financial_details_grouped0d9, setfinancial_details_grouped0d9 ] = React.useState<any>({}) 
    const [financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "financial_dtls_text",
            "charge_off_date",
            "last_payment_date",
            "total_balance",
            "principal",
            "interest",
            "fees",
      ]
      }) 
        const [venue_details_group6a27a, setvenue_details_group6a27a ] = React.useState<any>({}) 
    const [venue_details_group6a27aProps, setvenue_details_group6a27aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ven_name_text",
            "state",
            "county",
            "court_name",
            "judge_name",
            "sol_expiry_date",
            "filing_fee",
            "service_method",
            "efiling_system",
            "efiling_required",
      ]
      }) 
        const [required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b ] = React.useState<any>({}) 
    const [required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "reeq_doc_text",
      ]
      }) 
    
    const [doc_tablee79c7, setdoc_tablee79c7 ] = React.useState<any>([]) 
    const [doc_tablee79c7Props, setdoc_tablee79c7Props ] = React.useState<any>({
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
        const [checklist_main_group5b62e, setchecklist_main_group5b62e ] = React.useState<any>({}) 
    const [checklist_main_group5b62eProps, setchecklist_main_group5b62eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "valid_checklist_text",
      ]
      }) 
    
    const [checklist_table45abc, setchecklist_table45abc ] = React.useState<any>([]) 
    const [checklist_table45abcProps, setchecklist_table45abcProps ] = React.useState<any>({
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
        const [document_viewer_groupe4249, setdocument_viewer_groupe4249 ] = React.useState<any>({}) 
    const [document_viewer_groupe4249Props, setdocument_viewer_groupe4249Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "attachment_id",
      ]
      }) 
        const [search_group39b74, setsearch_group39b74 ] = React.useState<any>({}) 
    const [search_group39b74Props, setsearch_group39b74Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_display_id",
      ]
      }) 
   const [text9e38a,settext9e38a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text9e38aProps,settext9e38aProps] = React.useState<any>({}) 
   const [amr_queue_text28561,setamr_queue_text28561] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue_text28561Props,setamr_queue_text28561Props] = React.useState<any>({}) 
   const [icon_total_assest208f5,seticon_total_assest208f5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_total_assest208f5Props,seticon_total_assest208f5Props] = React.useState<any>({}) 
   const [amr_queue5b620,setamr_queue5b620] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue5b620Props,setamr_queue5b620Props] = React.useState<any>({}) 
   const [amr_queue_descafe0e,setamr_queue_descafe0e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue_descafe0eProps,setamr_queue_descafe0eProps] = React.useState<any>({}) 
   const [pending_file_text86c2a,setpending_file_text86c2a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_file_text86c2aProps,setpending_file_text86c2aProps] = React.useState<any>({}) 
   const [icon_maintenance_duecab92,seticon_maintenance_duecab92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_maintenance_duecab92Props,seticon_maintenance_duecab92Props] = React.useState<any>({}) 
   const [pending_file1721b,setpending_file1721b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_file1721bProps,setpending_file1721bProps] = React.useState<any>({}) 
   const [pending_file_desc53378,setpending_file_desc53378] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_file_desc53378Props,setpending_file_desc53378Props] = React.useState<any>({}) 
   const [service_pending_text5cc58,setservice_pending_text5cc58] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending_text5cc58Props,setservice_pending_text5cc58Props] = React.useState<any>({}) 
   const [icon_warranty_expiring6d299,seticon_warranty_expiring6d299] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_warranty_expiring6d299Props,seticon_warranty_expiring6d299Props] = React.useState<any>({}) 
   const [service_pending918f0,setservice_pending918f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending918f0Props,setservice_pending918f0Props] = React.useState<any>({}) 
   const [service_pending_descabf48,setservice_pending_descabf48] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending_descabf48Props,setservice_pending_descabf48Props] = React.useState<any>({}) 
   const [slas_at_risk_text33ae5,setslas_at_risk_text33ae5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_risk_text33ae5Props,setslas_at_risk_text33ae5Props] = React.useState<any>({}) 
   const [icon_2caf8,seticon_2caf8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_2caf8Props,seticon_2caf8Props] = React.useState<any>({}) 
   const [slas_at_riskf177b,setslas_at_riskf177b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_riskf177bProps,setslas_at_riskf177bProps] = React.useState<any>({}) 
   const [slas_at_risk_desc5c075,setslas_at_risk_desc5c075] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_risk_desc5c075Props,setslas_at_risk_desc5c075Props] = React.useState<any>({}) 
   const [court_rejection_text06a86,setcourt_rejection_text06a86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_text06a86Props,setcourt_rejection_text06a86Props] = React.useState<any>({}) 
   const [icona5abd,seticona5abd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icona5abdProps,seticona5abdProps] = React.useState<any>({}) 
   const [court_rejection2460a,setcourt_rejection2460a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection2460aProps,setcourt_rejection2460aProps] = React.useState<any>({}) 
   const [court_rejection_desc7c63b,setcourt_rejection_desc7c63b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_desc7c63bProps,setcourt_rejection_desc7c63bProps] = React.useState<any>({}) 
   const [collected_mtd_text4d825,setcollected_mtd_text4d825] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtd_text4d825Props,setcollected_mtd_text4d825Props] = React.useState<any>({}) 
   const [iconaff33,seticonaff33] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [iconaff33Props,seticonaff33Props] = React.useState<any>({}) 
   const [collected_mtdab52b,setcollected_mtdab52b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtdab52bProps,setcollected_mtdab52bProps] = React.useState<any>({}) 
   const [collected_mtd_descfffed,setcollected_mtd_descfffed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtd_descfffedProps,setcollected_mtd_descfffedProps] = React.useState<any>({}) 
   const [search_btn4c2ed,setsearch_btn4c2ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [search_btn4c2edProps,setsearch_btn4c2edProps] = React.useState<any>({}) 
   const [add_btn2f9d0,setadd_btn2f9d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [add_btn2f9d0Props,setadd_btn2f9d0Props] = React.useState<any>({}) 
   const [textc2337,settextc2337] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textc2337Props,settextc2337Props] = React.useState<any>({}) 
   const [case_display_id8caab,setcase_display_id8caab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_display_id8caabProps,setcase_display_id8caabProps] = React.useState<any>({}) 
   const [debtor_namedb464,setdebtor_namedb464] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namedb464Props,setdebtor_namedb464Props] = React.useState<any>({}) 
   const [creditor_name29781,setcreditor_name29781] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_name29781Props,setcreditor_name29781Props] = React.useState<any>({}) 
   const [full_nameda699,setfull_nameda699] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [full_nameda699Props,setfull_nameda699Props] = React.useState<any>({}) 
   const [total_balancea27e6,settotal_balancea27e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balancea27e6Props,settotal_balancea27e6Props] = React.useState<any>({}) 
   const [court_name03aea,setcourt_name03aea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name03aeaProps,setcourt_name03aeaProps] = React.useState<any>({}) 
   const [priority_namec8266,setpriority_namec8266] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [priority_namec8266Props,setpriority_namec8266Props] = React.useState<any>({}) 
   const [status_named2368,setstatus_named2368] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_named2368Props,setstatus_named2368Props] = React.useState<any>({}) 
   const [trs_created_datec9e9d,settrs_created_datec9e9d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_datec9e9dProps,settrs_created_datec9e9dProps] = React.useState<any>({}) 
   const [view_btns77c69,setview_btns77c69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_btns77c69Props,setview_btns77c69Props] = React.useState<any>({}) 
   const [edit_btns48ea7,setedit_btns48ea7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [edit_btns48ea7Props,setedit_btns48ea7Props] = React.useState<any>({}) 
   const [search_btn15268,setsearch_btn15268] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [search_btn15268Props,setsearch_btn15268Props] = React.useState<any>({}) 
   const [add_btn707cf,setadd_btn707cf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [add_btn707cfProps,setadd_btn707cfProps] = React.useState<any>({}) 
   const [text3ced2,settext3ced2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text3ced2Props,settext3ced2Props] = React.useState<any>({}) 
   const [case_display_id32ae4,setcase_display_id32ae4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_display_id32ae4Props,setcase_display_id32ae4Props] = React.useState<any>({}) 
   const [debtor_namecd77b,setdebtor_namecd77b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namecd77bProps,setdebtor_namecd77bProps] = React.useState<any>({}) 
   const [creditor_nameb14ce,setcreditor_nameb14ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_nameb14ceProps,setcreditor_nameb14ceProps] = React.useState<any>({}) 
   const [full_name592f3,setfull_name592f3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [full_name592f3Props,setfull_name592f3Props] = React.useState<any>({}) 
   const [total_balance98c00,settotal_balance98c00] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance98c00Props,settotal_balance98c00Props] = React.useState<any>({}) 
   const [court_name4b97b,setcourt_name4b97b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name4b97bProps,setcourt_name4b97bProps] = React.useState<any>({}) 
   const [priority_namec61c4,setpriority_namec61c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [priority_namec61c4Props,setpriority_namec61c4Props] = React.useState<any>({}) 
   const [status_namec590e,setstatus_namec590e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_namec590eProps,setstatus_namec590eProps] = React.useState<any>({}) 
   const [trs_created_date4e909,settrs_created_date4e909] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_date4e909Props,settrs_created_date4e909Props] = React.useState<any>({}) 
   const [view_btn88178,setview_btn88178] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_btn88178Props,setview_btn88178Props] = React.useState<any>({}) 
   const [edit_btn4cc84,setedit_btn4cc84] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [edit_btn4cc84Props,setedit_btn4cc84Props] = React.useState<any>({}) 
   const [status77d60,setstatus77d60] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status77d60Props,setstatus77d60Props] = React.useState<any>({}) 
   const [advancesearch6059f,setadvancesearch6059f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [advancesearch6059fProps,setadvancesearch6059fProps] = React.useState<any>({}) 
   const [craete_header_textace67,setcraete_header_textace67] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [craete_header_textace67Props,setcraete_header_textace67Props] = React.useState<any>({}) 
   const [cancel_button70ef3,setcancel_button70ef3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel_button70ef3Props,setcancel_button70ef3Props] = React.useState<any>({}) 
   const [update294f0,setupdate294f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [update294f0Props,setupdate294f0Props] = React.useState<any>({}) 
   const [submit0112f,setsubmit0112f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [submit0112fProps,setsubmit0112fProps] = React.useState<any>({}) 
   const [venue_id0c4bb,setvenue_id0c4bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_id0c4bbProps,setvenue_id0c4bbProps] = React.useState<any>({}) 
   const [creditor_idf6f71,setcreditor_idf6f71] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_idf6f71Props,setcreditor_idf6f71Props] = React.useState<any>({}) 
   const [case_info_text1f2c8,setcase_info_text1f2c8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_info_text1f2c8Props,setcase_info_text1f2c8Props] = React.useState<any>({}) 
   const [creditor_namef8de4,setcreditor_namef8de4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_namef8de4Props,setcreditor_namef8de4Props] = React.useState<any>({}) 
   const [attorney_name073fd,setattorney_name073fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attorney_name073fdProps,setattorney_name073fdProps] = React.useState<any>({}) 
   const [priority_namebcbd5,setpriority_namebcbd5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [priority_namebcbd5Props,setpriority_namebcbd5Props] = React.useState<any>({}) 
   const [status_namecbe6f,setstatus_namecbe6f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_namecbe6fProps,setstatus_namecbe6fProps] = React.useState<any>({}) 
   const [queue_position049be,setqueue_position049be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [queue_position049beProps,setqueue_position049beProps] = React.useState<any>({}) 
   const [quality_score2c29e,setquality_score2c29e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [quality_score2c29eProps,setquality_score2c29eProps] = React.useState<any>({}) 
   const [sla_wait_start_time2fb95,setsla_wait_start_time2fb95] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sla_wait_start_time2fb95Props,setsla_wait_start_time2fb95Props] = React.useState<any>({}) 
   const [rules_iconbdce0,setrules_iconbdce0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rules_iconbdce0Props,setrules_iconbdce0Props] = React.useState<any>({}) 
   const [venue_special_rules_text2cdf6,setvenue_special_rules_text2cdf6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_text2cdf6Props,setvenue_special_rules_text2cdf6Props] = React.useState<any>({}) 
   const [special_rulesbd9d8,setspecial_rulesbd9d8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rulesbd9d8Props,setspecial_rulesbd9d8Props] = React.useState<any>({}) 
   const [venue_special_rules_dividere4760,setvenue_special_rules_dividere4760] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividere4760Props,setvenue_special_rules_dividere4760Props] = React.useState<any>({}) 
   const [warning_iconc4eea,setwarning_iconc4eea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warning_iconc4eeaProps,setwarning_iconc4eeaProps] = React.useState<any>({}) 
   const [georgia_sol_text6238e,setgeorgia_sol_text6238e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgia_sol_text6238eProps,setgeorgia_sol_text6238eProps] = React.useState<any>({}) 
   const [special_rules031f4,setspecial_rules031f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rules031f4Props,setspecial_rules031f4Props] = React.useState<any>({}) 
   const [venue_special_rules_dividerscd6e7,setvenue_special_rules_dividerscd6e7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividerscd6e7Props,setvenue_special_rules_dividerscd6e7Props] = React.useState<any>({}) 
   const [warnings_icon63b3d,setwarnings_icon63b3d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warnings_icon63b3dProps,setwarnings_icon63b3dProps] = React.useState<any>({}) 
   const [georgias_sol_textea2e1,setgeorgias_sol_textea2e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgias_sol_textea2e1Props,setgeorgias_sol_textea2e1Props] = React.useState<any>({}) 
   const [specials_rulesb4b8b,setspecials_rulesb4b8b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [specials_rulesb4b8bProps,setspecials_rulesb4b8bProps] = React.useState<any>({}) 
   const [venue_special_rules_dividerss0fa18,setvenue_special_rules_dividerss0fa18] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividerss0fa18Props,setvenue_special_rules_dividerss0fa18Props] = React.useState<any>({}) 
   const [warningss_iconsb27c3,setwarningss_iconsb27c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningss_iconsb27c3Props,setwarningss_iconsb27c3Props] = React.useState<any>({}) 
   const [georgias_sosl_texts1ccd5,setgeorgias_sosl_texts1ccd5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgias_sosl_texts1ccd5Props,setgeorgias_sosl_texts1ccd5Props] = React.useState<any>({}) 
   const [specials_rulesscabb6,setspecials_rulesscabb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [specials_rulesscabb6Props,setspecials_rulesscabb6Props] = React.useState<any>({}) 
   const [venue_special_rules_dividerssss2b01f,setvenue_special_rules_dividerssss2b01f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividerssss2b01fProps,setvenue_special_rules_dividerssss2b01fProps] = React.useState<any>({}) 
   const [warningsss_iconse38db,setwarningsss_iconse38db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningsss_iconse38dbProps,setwarningsss_iconse38dbProps] = React.useState<any>({}) 
   const [georgiass_sosl_texts52ad5,setgeorgiass_sosl_texts52ad5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgiass_sosl_texts52ad5Props,setgeorgiass_sosl_texts52ad5Props] = React.useState<any>({}) 
   const [speciasls_rulessc3d56,setspeciasls_rulessc3d56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [speciasls_rulessc3d56Props,setspeciasls_rulessc3d56Props] = React.useState<any>({}) 
   const [venues_special_rules_dividerssss9b36c,setvenues_special_rules_dividerssss9b36c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venues_special_rules_dividerssss9b36cProps,setvenues_special_rules_dividerssss9b36cProps] = React.useState<any>({}) 
   const [warningssss_iconsbdae5,setwarningssss_iconsbdae5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningssss_iconsbdae5Props,setwarningssss_iconsbdae5Props] = React.useState<any>({}) 
   const [georsgiass_sosl_texts14d14,setgeorsgiass_sosl_texts14d14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georsgiass_sosl_texts14d14Props,setgeorsgiass_sosl_texts14d14Props] = React.useState<any>({}) 
   const [spesciasls_ruless22364,setspesciasls_ruless22364] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [spesciasls_ruless22364Props,setspesciasls_ruless22364Props] = React.useState<any>({}) 
   const [debt_info_text9078e,setdebt_info_text9078e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debt_info_text9078eProps,setdebt_info_text9078eProps] = React.useState<any>({}) 
   const [debtor_namea5e3f,setdebtor_namea5e3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namea5e3fProps,setdebtor_namea5e3fProps] = React.useState<any>({}) 
   const [ssn_masked273fe,setssn_masked273fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ssn_masked273feProps,setssn_masked273feProps] = React.useState<any>({}) 
   const [dobdba19,setdobdba19] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dobdba19Props,setdobdba19Props] = React.useState<any>({}) 
   const [addressa3e42,setaddressa3e42] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [addressa3e42Props,setaddressa3e42Props] = React.useState<any>({}) 
   const [financial_dtls_text3b122,setfinancial_dtls_text3b122] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [financial_dtls_text3b122Props,setfinancial_dtls_text3b122Props] = React.useState<any>({}) 
   const [charge_off_datef15ef,setcharge_off_datef15ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [charge_off_datef15efProps,setcharge_off_datef15efProps] = React.useState<any>({}) 
   const [last_payment_date23905,setlast_payment_date23905] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [last_payment_date23905Props,setlast_payment_date23905Props] = React.useState<any>({}) 
   const [total_balanced15a0,settotal_balanced15a0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balanced15a0Props,settotal_balanced15a0Props] = React.useState<any>({}) 
   const [principalc3ba6,setprincipalc3ba6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principalc3ba6Props,setprincipalc3ba6Props] = React.useState<any>({}) 
   const [interest81968,setinterest81968] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interest81968Props,setinterest81968Props] = React.useState<any>({}) 
   const [fees0f99a,setfees0f99a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [fees0f99aProps,setfees0f99aProps] = React.useState<any>({}) 
   const [ven_name_textef3ac,setven_name_textef3ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ven_name_textef3acProps,setven_name_textef3acProps] = React.useState<any>({}) 
   const [state752e3,setstate752e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state752e3Props,setstate752e3Props] = React.useState<any>({}) 
   const [countryf4404,setcountryf4404] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [countryf4404Props,setcountryf4404Props] = React.useState<any>({}) 
   const [court_namef21b5,setcourt_namef21b5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_namef21b5Props,setcourt_namef21b5Props] = React.useState<any>({}) 
   const [judge_name78f03,setjudge_name78f03] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judge_name78f03Props,setjudge_name78f03Props] = React.useState<any>({}) 
   const [sol_expiry_date8639c,setsol_expiry_date8639c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sol_expiry_date8639cProps,setsol_expiry_date8639cProps] = React.useState<any>({}) 
   const [filing_fee389dd,setfiling_fee389dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filing_fee389ddProps,setfiling_fee389ddProps] = React.useState<any>({}) 
   const [service_methoddeae7,setservice_methoddeae7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_methoddeae7Props,setservice_methoddeae7Props] = React.useState<any>({}) 
   const [efiling_systemc00e5,setefiling_systemc00e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_systemc00e5Props,setefiling_systemc00e5Props] = React.useState<any>({}) 
   const [efiling_requiredb3e9d,setefiling_requiredb3e9d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_requiredb3e9dProps,setefiling_requiredb3e9dProps] = React.useState<any>({}) 
   const [reeq_doc_text9e8f8,setreeq_doc_text9e8f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reeq_doc_text9e8f8Props,setreeq_doc_text9e8f8Props] = React.useState<any>({}) 
   const [doc_type_idaf61f,setdoc_type_idaf61f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_type_idaf61fProps,setdoc_type_idaf61fProps] = React.useState<any>({}) 
   const [doc_type_name949dd,setdoc_type_name949dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_type_name949ddProps,setdoc_type_name949ddProps] = React.useState<any>({}) 
   const [uploaderdff25,setuploaderdff25] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [uploaderdff25Props,setuploaderdff25Props] = React.useState<any>({}) 
   const [doc_reference_urld9056,setdoc_reference_urld9056] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_reference_urld9056Props,setdoc_reference_urld9056Props] = React.useState<any>({}) 
   const [description_textb45ef,setdescription_textb45ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [description_textb45efProps,setdescription_textb45efProps] = React.useState<any>({}) 
   const [customwidgetd1a34,setcustomwidgetd1a34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [customwidgetd1a34Props,setcustomwidgetd1a34Props] = React.useState<any>({}) 
   const [account_id7e64e,setaccount_id7e64e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_id7e64eProps,setaccount_id7e64eProps] = React.useState<any>({}) 
   const [valid_checklist_textc0f22,setvalid_checklist_textc0f22] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [valid_checklist_textc0f22Props,setvalid_checklist_textc0f22Props] = React.useState<any>({}) 
   const [checklist_item_id255b0,setchecklist_item_id255b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checklist_item_id255b0Props,setchecklist_item_id255b0Props] = React.useState<any>({}) 
   const [item_nameeed39,setitem_nameeed39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [item_nameeed39Props,setitem_nameeed39Props] = React.useState<any>({}) 
   const [is_completeb8c69,setis_completeb8c69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [is_completeb8c69Props,setis_completeb8c69Props] = React.useState<any>({}) 
   const [remarks_textareadc753,setremarks_textareadc753] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remarks_textareadc753Props,setremarks_textareadc753Props] = React.useState<any>({}) 
   const [craete_header_text93eaa,setcraete_header_text93eaa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [craete_header_text93eaaProps,setcraete_header_text93eaaProps] = React.useState<any>({}) 
   const [venue_idcb444,setvenue_idcb444] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_idcb444Props,setvenue_idcb444Props] = React.useState<any>({}) 
   const [creditor_idb1867,setcreditor_idb1867] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_idb1867Props,setcreditor_idb1867Props] = React.useState<any>({}) 
   const [case_info_textdf3f1,setcase_info_textdf3f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_info_textdf3f1Props,setcase_info_textdf3f1Props] = React.useState<any>({}) 
   const [creditor_name257be,setcreditor_name257be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_name257beProps,setcreditor_name257beProps] = React.useState<any>({}) 
   const [attorney_name87be1,setattorney_name87be1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attorney_name87be1Props,setattorney_name87be1Props] = React.useState<any>({}) 
   const [status_namea5f92,setstatus_namea5f92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_namea5f92Props,setstatus_namea5f92Props] = React.useState<any>({}) 
   const [priority_name449dd,setpriority_name449dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [priority_name449ddProps,setpriority_name449ddProps] = React.useState<any>({}) 
   const [queue_positionceb8d,setqueue_positionceb8d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [queue_positionceb8dProps,setqueue_positionceb8dProps] = React.useState<any>({}) 
   const [quality_scoredfaa9,setquality_scoredfaa9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [quality_scoredfaa9Props,setquality_scoredfaa9Props] = React.useState<any>({}) 
   const [sla_wait_start_time20502,setsla_wait_start_time20502] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sla_wait_start_time20502Props,setsla_wait_start_time20502Props] = React.useState<any>({}) 
   const [rules_iconfb03f,setrules_iconfb03f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rules_iconfb03fProps,setrules_iconfb03fProps] = React.useState<any>({}) 
   const [venue_special_rules_textecd92,setvenue_special_rules_textecd92] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_textecd92Props,setvenue_special_rules_textecd92Props] = React.useState<any>({}) 
   const [special_rules2001a,setspecial_rules2001a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rules2001aProps,setspecial_rules2001aProps] = React.useState<any>({}) 
   const [venue_special_rules_divider206ab,setvenue_special_rules_divider206ab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_divider206abProps,setvenue_special_rules_divider206abProps] = React.useState<any>({}) 
   const [warning_icond1cd0,setwarning_icond1cd0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warning_icond1cd0Props,setwarning_icond1cd0Props] = React.useState<any>({}) 
   const [georgia_sol_text460ef,setgeorgia_sol_text460ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgia_sol_text460efProps,setgeorgia_sol_text460efProps] = React.useState<any>({}) 
   const [special_rulesd6c6e,setspecial_rulesd6c6e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rulesd6c6eProps,setspecial_rulesd6c6eProps] = React.useState<any>({}) 
   const [venue_special_rules_dividers28a68,setvenue_special_rules_dividers28a68] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividers28a68Props,setvenue_special_rules_dividers28a68Props] = React.useState<any>({}) 
   const [warnings_icon0adcc,setwarnings_icon0adcc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warnings_icon0adccProps,setwarnings_icon0adccProps] = React.useState<any>({}) 
   const [georgias_sol_text24265,setgeorgias_sol_text24265] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgias_sol_text24265Props,setgeorgias_sol_text24265Props] = React.useState<any>({}) 
   const [specials_rules14021,setspecials_rules14021] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [specials_rules14021Props,setspecials_rules14021Props] = React.useState<any>({}) 
   const [venue_special_rules_dividerss0c16e,setvenue_special_rules_dividerss0c16e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividerss0c16eProps,setvenue_special_rules_dividerss0c16eProps] = React.useState<any>({}) 
   const [warningss_icons476c3,setwarningss_icons476c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningss_icons476c3Props,setwarningss_icons476c3Props] = React.useState<any>({}) 
   const [georgias_sosl_texts3f264,setgeorgias_sosl_texts3f264] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgias_sosl_texts3f264Props,setgeorgias_sosl_texts3f264Props] = React.useState<any>({}) 
   const [specials_rulesscc30f,setspecials_rulesscc30f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [specials_rulesscc30fProps,setspecials_rulesscc30fProps] = React.useState<any>({}) 
   const [venue_special_rules_dividersssdcaab,setvenue_special_rules_dividersssdcaab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_special_rules_dividersssdcaabProps,setvenue_special_rules_dividersssdcaabProps] = React.useState<any>({}) 
   const [warningsss_icons3be9c,setwarningsss_icons3be9c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningsss_icons3be9cProps,setwarningsss_icons3be9cProps] = React.useState<any>({}) 
   const [georgiass_sosl_texts88097,setgeorgiass_sosl_texts88097] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georgiass_sosl_texts88097Props,setgeorgiass_sosl_texts88097Props] = React.useState<any>({}) 
   const [specials_ruless95686,setspecials_ruless95686] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [specials_ruless95686Props,setspecials_ruless95686Props] = React.useState<any>({}) 
   const [venues_special_rules_dividerssss44419,setvenues_special_rules_dividerssss44419] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venues_special_rules_dividerssss44419Props,setvenues_special_rules_dividerssss44419Props] = React.useState<any>({}) 
   const [warningssss_icons55275,setwarningssss_icons55275] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warningssss_icons55275Props,setwarningssss_icons55275Props] = React.useState<any>({}) 
   const [georsgiass_sosl_texts15f5e,setgeorsgiass_sosl_texts15f5e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [georsgiass_sosl_texts15f5eProps,setgeorsgiass_sosl_texts15f5eProps] = React.useState<any>({}) 
   const [spesciasls_ruless910f1,setspesciasls_ruless910f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [spesciasls_ruless910f1Props,setspesciasls_ruless910f1Props] = React.useState<any>({}) 
   const [debt_info_textb09b8,setdebt_info_textb09b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debt_info_textb09b8Props,setdebt_info_textb09b8Props] = React.useState<any>({}) 
   const [debtor_namef7cac,setdebtor_namef7cac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namef7cacProps,setdebtor_namef7cacProps] = React.useState<any>({}) 
   const [ssn_masked26c46,setssn_masked26c46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ssn_masked26c46Props,setssn_masked26c46Props] = React.useState<any>({}) 
   const [dob0f0bf,setdob0f0bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dob0f0bfProps,setdob0f0bfProps] = React.useState<any>({}) 
   const [address22d72,setaddress22d72] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [address22d72Props,setaddress22d72Props] = React.useState<any>({}) 
   const [financial_dtls_text3451f,setfinancial_dtls_text3451f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [financial_dtls_text3451fProps,setfinancial_dtls_text3451fProps] = React.useState<any>({}) 
   const [charge_off_date13a39,setcharge_off_date13a39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [charge_off_date13a39Props,setcharge_off_date13a39Props] = React.useState<any>({}) 
   const [last_payment_dateeab2f,setlast_payment_dateeab2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [last_payment_dateeab2fProps,setlast_payment_dateeab2fProps] = React.useState<any>({}) 
   const [total_balanceca1e1,settotal_balanceca1e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balanceca1e1Props,settotal_balanceca1e1Props] = React.useState<any>({}) 
   const [principal6eb2a,setprincipal6eb2a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principal6eb2aProps,setprincipal6eb2aProps] = React.useState<any>({}) 
   const [interesta6b7d,setinteresta6b7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interesta6b7dProps,setinteresta6b7dProps] = React.useState<any>({}) 
   const [feesb456c,setfeesb456c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [feesb456cProps,setfeesb456cProps] = React.useState<any>({}) 
   const [ven_name_text0c8ba,setven_name_text0c8ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ven_name_text0c8baProps,setven_name_text0c8baProps] = React.useState<any>({}) 
   const [state3010e,setstate3010e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state3010eProps,setstate3010eProps] = React.useState<any>({}) 
   const [country1983b,setcountry1983b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country1983bProps,setcountry1983bProps] = React.useState<any>({}) 
   const [court_name41a77,setcourt_name41a77] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name41a77Props,setcourt_name41a77Props] = React.useState<any>({}) 
   const [judge_name0a819,setjudge_name0a819] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judge_name0a819Props,setjudge_name0a819Props] = React.useState<any>({}) 
   const [sol_expiry_dated5486,setsol_expiry_dated5486] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sol_expiry_dated5486Props,setsol_expiry_dated5486Props] = React.useState<any>({}) 
   const [filing_fee89c7f,setfiling_fee89c7f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filing_fee89c7fProps,setfiling_fee89c7fProps] = React.useState<any>({}) 
   const [service_method1b411,setservice_method1b411] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_method1b411Props,setservice_method1b411Props] = React.useState<any>({}) 
   const [efiling_system7d508,setefiling_system7d508] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_system7d508Props,setefiling_system7d508Props] = React.useState<any>({}) 
   const [efiling_required36d60,setefiling_required36d60] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_required36d60Props,setefiling_required36d60Props] = React.useState<any>({}) 
   const [reeq_doc_text732f8,setreeq_doc_text732f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reeq_doc_text732f8Props,setreeq_doc_text732f8Props] = React.useState<any>({}) 
   const [attachment_id54469,setattachment_id54469] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attachment_id54469Props,setattachment_id54469Props] = React.useState<any>({}) 
   const [doc_name513db,setdoc_name513db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_name513dbProps,setdoc_name513dbProps] = React.useState<any>({}) 
   const [trs_created_by736ad,settrs_created_by736ad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_by736adProps,settrs_created_by736adProps] = React.useState<any>({}) 
   const [trs_created_datecfead,settrs_created_datecfead] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_datecfeadProps,settrs_created_datecfeadProps] = React.useState<any>({}) 
   const [valid_checklist_text1428a,setvalid_checklist_text1428a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [valid_checklist_text1428aProps,setvalid_checklist_text1428aProps] = React.useState<any>({}) 
   const [checklist_item_id611e6,setchecklist_item_id611e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checklist_item_id611e6Props,setchecklist_item_id611e6Props] = React.useState<any>({}) 
   const [item_nameafc9a,setitem_nameafc9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [item_nameafc9aProps,setitem_nameafc9aProps] = React.useState<any>({}) 
   const [is_completed6ef7a,setis_completed6ef7a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [is_completed6ef7aProps,setis_completed6ef7aProps] = React.useState<any>({}) 
   const [remarks_textarea15a62,setremarks_textarea15a62] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [remarks_textarea15a62Props,setremarks_textarea15a62Props] = React.useState<any>({}) 
   const [account_id4ecc7,setaccount_id4ecc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_id4ecc7Props,setaccount_id4ecc7Props] = React.useState<any>({}) 
   const [documentviewer64771,setdocumentviewer64771] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [documentviewer64771Props,setdocumentviewer64771Props] = React.useState<any>({}) 
   const [advancesearch1e502,setadvancesearch1e502] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [advancesearch1e502Props,setadvancesearch1e502Props] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       texttext9e38a:false,
       textamr_queue_text28561:false,
       iconicon_total_assest208f5:false,
       textamr_queue5b620:false,
       textamr_queue_descafe0e:false,
       textpending_file_text86c2a:false,
       iconicon_maintenance_duecab92:false,
       textpending_file1721b:false,
       textpending_file_desc53378:false,
       textservice_pending_text5cc58:false,
       iconicon_warranty_expiring6d299:false,
       textservice_pending918f0:false,
       textservice_pending_descabf48:false,
       textslas_at_risk_text33ae5:false,
       iconicon_2caf8:false,
       textslas_at_riskf177b:false,
       textslas_at_risk_desc5c075:false,
       textcourt_rejection_text06a86:false,
       iconicona5abd:false,
       textcourt_rejection2460a:false,
       textcourt_rejection_desc7c63b:false,
       textcollected_mtd_text4d825:false,
       iconiconaff33:false,
       textcollected_mtdab52b:false,
       textcollected_mtd_descfffed:false,
       buttonsearch_btn4c2ed:false,
       buttonadd_btn2f9d0:false,
       texttextc2337:false,
       columncase_display_id8caab:false,
       columndebtor_namedb464:false,
       columncreditor_name29781:false,
       columnfull_nameda699:false,
       columntotal_balancea27e6:false,
       columncourt_name03aea:false,
       columnpriority_namec8266:false,
       columnstatus_named2368:false,
       columntrs_created_datec9e9d:false,
       buttonview_btns77c69:false,
       buttonedit_btns48ea7:false,
       buttonsearch_btn15268:false,
       buttonadd_btn707cf:false,
       texttext3ced2:false,
       columncase_display_id32ae4:false,
       columndebtor_namecd77b:false,
       columncreditor_nameb14ce:false,
       columnfull_name592f3:false,
       columntotal_balance98c00:false,
       columncourt_name4b97b:false,
       columnpriority_namec61c4:false,
       columnstatus_namec590e:false,
       columntrs_created_date4e909:false,
       buttonview_btn88178:false,
       buttonedit_btn4cc84:false,
       textstatus77d60:false,
       advancesearchadvancesearch6059f:false,
       textcraete_header_textace67:false,
       buttoncancel_button70ef3:false,
       buttonupdate294f0:false,
       buttonsubmit0112f:false,
       textvenue_id0c4bb:false,
       textcreditor_idf6f71:false,
       textcase_info_text1f2c8:false,
       textinputcreditor_namef8de4:false,
       comboboxattorney_name073fd:false,
       dropdownpriority_namebcbd5:false,
       dropdownstatus_namecbe6f:false,
       textinputqueue_position049be:false,
       textinputquality_score2c29e:false,
       datepickersla_wait_start_time2fb95:false,
       iconrules_iconbdce0:false,
       textvenue_special_rules_text2cdf6:false,
       textspecial_rulesbd9d8:false,
       dividervenue_special_rules_dividere4760:false,
       iconwarning_iconc4eea:false,
       textgeorgia_sol_text6238e:false,
       textspecial_rules031f4:false,
       dividervenue_special_rules_dividerscd6e7:false,
       iconwarnings_icon63b3d:false,
       textgeorgias_sol_textea2e1:false,
       textspecials_rulesb4b8b:false,
       dividervenue_special_rules_dividerss0fa18:false,
       iconwarningss_iconsb27c3:false,
       textgeorgias_sosl_texts1ccd5:false,
       textspecials_rulesscabb6:false,
       dividervenue_special_rules_dividerssss2b01f:false,
       iconwarningsss_iconse38db:false,
       textgeorgiass_sosl_texts52ad5:false,
       textspeciasls_rulessc3d56:false,
       dividervenues_special_rules_dividerssss9b36c:false,
       iconwarningssss_iconsbdae5:false,
       textgeorsgiass_sosl_texts14d14:false,
       textspesciasls_ruless22364:false,
       textdebt_info_text9078e:false,
       textinputdebtor_namea5e3f:false,
       textinputssn_masked273fe:false,
       datepickerdobdba19:false,
       textareaaddressa3e42:false,
       textfinancial_dtls_text3b122:false,
       datepickercharge_off_datef15ef:false,
       datepickerlast_payment_date23905:false,
       textinputtotal_balanced15a0:false,
       textinputprincipalc3ba6:false,
       textinputinterest81968:false,
       textinputfees0f99a:false,
       textven_name_textef3ac:false,
       textinputstate752e3:false,
       textinputcountryf4404:false,
       textinputcourt_namef21b5:false,
       textinputjudge_name78f03:false,
       datepickersol_expiry_date8639c:false,
       textinputfiling_fee389dd:false,
       dropdownservice_methoddeae7:false,
       dropdownefiling_systemc00e5:false,
       switchefiling_requiredb3e9d:false,
       textreeq_doc_text9e8f8:false,
       columndoc_type_idaf61f:false,
       columndoc_type_name949dd:false,
       buttonuploaderdff25:false,
       columndoc_reference_urld9056:false,
       textdescription_textb45ef:false,
       customwidgetcustomwidgetd1a34:false,
       textaccount_id7e64e:false,
       textvalid_checklist_textc0f22:false,
       columnchecklist_item_id255b0:false,
       columnitem_nameeed39:false,
       columnis_completeb8c69:false,
       textarearemarks_textareadc753:false,
       textcraete_header_text93eaa:false,
       textvenue_idcb444:false,
       textcreditor_idb1867:false,
       textcase_info_textdf3f1:false,
       textinputcreditor_name257be:false,
       textinputattorney_name87be1:false,
       textinputstatus_namea5f92:false,
       textinputpriority_name449dd:false,
       textinputqueue_positionceb8d:false,
       textinputquality_scoredfaa9:false,
       datepickersla_wait_start_time20502:false,
       iconrules_iconfb03f:false,
       textvenue_special_rules_textecd92:false,
       textspecial_rules2001a:false,
       dividervenue_special_rules_divider206ab:false,
       iconwarning_icond1cd0:false,
       textgeorgia_sol_text460ef:false,
       textspecial_rulesd6c6e:false,
       dividervenue_special_rules_dividers28a68:false,
       iconwarnings_icon0adcc:false,
       textgeorgias_sol_text24265:false,
       textspecials_rules14021:false,
       dividervenue_special_rules_dividerss0c16e:false,
       iconwarningss_icons476c3:false,
       textgeorgias_sosl_texts3f264:false,
       textspecials_rulesscc30f:false,
       dividervenue_special_rules_dividersssdcaab:false,
       iconwarningsss_icons3be9c:false,
       textgeorgiass_sosl_texts88097:false,
       textspecials_ruless95686:false,
       dividervenues_special_rules_dividerssss44419:false,
       iconwarningssss_icons55275:false,
       textgeorsgiass_sosl_texts15f5e:false,
       textspesciasls_ruless910f1:false,
       textdebt_info_textb09b8:false,
       textinputdebtor_namef7cac:false,
       textinputssn_masked26c46:false,
       datepickerdob0f0bf:false,
       textareaaddress22d72:false,
       textfinancial_dtls_text3451f:false,
       datepickercharge_off_date13a39:false,
       datepickerlast_payment_dateeab2f:false,
       textinputtotal_balanceca1e1:false,
       textinputprincipal6eb2a:false,
       textinputinteresta6b7d:false,
       textinputfeesb456c:false,
       textven_name_text0c8ba:false,
       textinputstate3010e:false,
       textinputcountry1983b:false,
       textinputcourt_name41a77:false,
       textinputjudge_name0a819:false,
       datepickersol_expiry_dated5486:false,
       textinputfiling_fee89c7f:false,
       textinputservice_method1b411:false,
       textinputefiling_system7d508:false,
       switchefiling_required36d60:false,
       textreeq_doc_text732f8:false,
       columnattachment_id54469:false,
       columndoc_name513db:false,
       columntrs_created_by736ad:false,
       columntrs_created_datecfead:false,
       textvalid_checklist_text1428a:false,
       columnchecklist_item_id611e6:false,
       columnitem_nameafc9a:false,
       columnis_completed6ef7a:false,
       textarearemarks_textarea15a62:false,
       textaccount_id4ecc7:false,
       documentviewerdocumentviewer64771:false,
       advancesearchadvancesearch1e502:false,
       groupheader_groupb1913:false,
       groupasset_dashboard_group4bbfe:false,
       groupamr_queue_groupc92ca:false,
       grouppending_file_groupffe32:false,
       groupservice_pending_group7ba93:false,
       groupslas_at_risk_group23eb4:false,
       groupcourt_rejection_groupc9d54:false,
       groupcollected_mtd_group7b7b5:false,
       grouptable_group112bd:false,
       groupsubscreene9ab5:false,
       groupCT006_AF_UF_UFWS_LAP_LAP_amrQueueTable_v18a797:false,
       groupgroup28176:false,
       tabletable852e3:false,
       groupCT006_AF_UF_UFWS_LAP_LAP_pendingFilingTable_v1ff8da:false,
       grouppending_fillings_groupb1568:false,
       tablepending_fillings_table11279:false,
       groupsearch_groupdefa1:false,
       groupadd_case_groupeb161:false,
       groupheader_group4878f:false,
       groupdynamicactions094c3:false,
       groupcase_information_group28f6f:false,
       groupvenue_group6a36d:false,
       groupgeorgia_group0fa18:false,
       groupgeorgias_group945fd:false,
       groupgeorgias_groups6f85f:false,
       groupgeorgiass_groups86a87:false,
       groupgeorgsiass_groupsb044a:false,
       groupdebtor_information_group78a70:false,
       groupfinancial_details_group52f47:false,
       groupvenue_details_group17ac6:false,
       grouprequired_dociument_main_group04e92:false,
       grouprequired_dociument_header_groupe39c8:false,
       tabledoc_type_tablebe9fa:false,
       groupchecklist_main_group0df6b:false,
       groupchecklist_group32b3d:false,
       tablechecklist_table198e1:false,
       groupadd_case_group1f6e4:false,
       groupheader_group3749a:false,
       groupcase_information_groupcec29:false,
       groupvenue_groupa72d9:false,
       groupgeorgia_groupa636c:false,
       groupgeorgias_groupbac01:false,
       groupgeorgias_groupsbf356:false,
       groupgeorgiass_groups9e4dd:false,
       groupgeorgsiass_groups6bf7a:false,
       groupdebtor_information_groupdfa55:false,
       groupfinancial_details_grouped0d9:false,
       groupvenue_details_group6a27a:false,
       grouprequired_dociument_main_group3eb5b:false,
       tabledoc_tablee79c7:false,
       groupchecklist_main_group5b62e:false,
       tablechecklist_table45abc:false,
       groupdocument_viewer_groupe4249:false,
       groupsearch_group39b74:false,
      })

  ////// screen states 
  const [dashboard_v1,setdashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [dashboard_v1Props,setdashboard_v1Props] = React.useState<any>({})
  const [amrqueuesearch_v1,setamrqueuesearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [amrqueuesearch_v1Props,setamrqueuesearch_v1Props] = React.useState<any>({})
  const [addcase_v1,setaddcase_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [addcase_v1Props,setaddcase_v1Props] = React.useState<any>({})
  const [viewcase_v1,setviewcase_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [viewcase_v1Props,setviewcase_v1Props] = React.useState<any>({})
  const [documentviewer_v1,setdocumentviewer_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [documentviewer_v1Props,setdocumentviewer_v1Props] = React.useState<any>({})
  const [pendingfillingsearch_v1,setpendingfillingsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [pendingfillingsearch_v1Props,setpendingfillingsearch_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_amrqueuedashboard_v1Props,setdfd_amrqueuedashboard_v1Props] = React.useState<any>([])
  const [dfd_addcase_v1Props,setdfd_addcase_v1Props] = React.useState<any>([])
  const [dfd_doctypenamecombo_v1Props,setdfd_doctypenamecombo_v1Props] = React.useState<any>([])
  const [dfd_attorneyscombo_v1Props,setdfd_attorneyscombo_v1Props] = React.useState<any>([])
  const [dfd_prioritycombo_v1Props,setdfd_prioritycombo_v1Props] = React.useState<any>([])
  const [dfd_statuscombo_v1Props,setdfd_statuscombo_v1Props] = React.useState<any>([])
  const [dfd_amrchecklistcombo_v1Props,setdfd_amrchecklistcombo_v1Props] = React.useState<any>([])
  const [dfd_doctable_v1Props,setdfd_doctable_v1Props] = React.useState<any>([])
  const [dfd_amrcheckliststatus_v1Props,setdfd_amrcheckliststatus_v1Props] = React.useState<any>([])
  const [dfd_pendingfilingsdashboard_v1Props,setdfd_pendingfilingsdashboard_v1Props] = React.useState<any>([])
  const [dfd_cardsdashboard_v1Props,setdfd_cardsdashboard_v1Props] = React.useState<any>([])
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
    settext9e38a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue_text28561(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_total_assest208f5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue5b620(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue_descafe0e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_file_text86c2a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_maintenance_duecab92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_file1721b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_file_desc53378(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending_text5cc58(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_warranty_expiring6d299(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending918f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending_descabf48(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_risk_text33ae5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_2caf8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_riskf177b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_risk_desc5c075(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_text06a86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticona5abd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection2460a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_desc7c63b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtd_text4d825(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticonaff33(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtdab52b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtd_descfffed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_btn4c2ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_btn2f9d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextc2337(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_display_id8caab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namedb464(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_name29781(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfull_nameda699(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balancea27e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name03aea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_namec8266(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_named2368(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_datec9e9d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_btns77c69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setedit_btns48ea7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_btn15268(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_btn707cf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext3ced2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_display_id32ae4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namecd77b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_nameb14ce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfull_name592f3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance98c00(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name4b97b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_namec61c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_namec590e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date4e909(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_btn88178(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setedit_btn4cc84(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus77d60(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch6059f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcraete_header_textace67(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button70ef3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setupdate294f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsubmit0112f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_id0c4bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_idf6f71(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_info_text1f2c8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_namef8de4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattorney_name073fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_namebcbd5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_namecbe6f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setqueue_position049be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setquality_score2c29e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsla_wait_start_time2fb95(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrules_iconbdce0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_text2cdf6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rulesbd9d8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividere4760(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarning_iconc4eea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgia_sol_text6238e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rules031f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividerscd6e7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarnings_icon63b3d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgias_sol_textea2e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecials_rulesb4b8b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividerss0fa18(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningss_iconsb27c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgias_sosl_texts1ccd5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecials_rulesscabb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividerssss2b01f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningsss_iconse38db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgiass_sosl_texts52ad5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspeciasls_rulessc3d56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenues_special_rules_dividerssss9b36c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningssss_iconsbdae5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorsgiass_sosl_texts14d14(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspesciasls_ruless22364(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebt_info_text9078e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namea5e3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setssn_masked273fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdobdba19(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddressa3e42(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfinancial_dtls_text3b122(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_off_datef15ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlast_payment_date23905(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balanced15a0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipalc3ba6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinterest81968(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfees0f99a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setven_name_textef3ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate752e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountryf4404(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_namef21b5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudge_name78f03(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsol_expiry_date8639c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfiling_fee389dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_methoddeae7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_systemc00e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_requiredb3e9d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreeq_doc_text9e8f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_type_idaf61f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_type_name949dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuploaderdff25(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_reference_urld9056(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescription_textb45ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetd1a34(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_id7e64e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalid_checklist_textc0f22(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchecklist_item_id255b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setitem_nameeed39(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_completeb8c69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremarks_textareadc753(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcraete_header_text93eaa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_idcb444(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_idb1867(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_info_textdf3f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_name257be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattorney_name87be1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_namea5f92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_name449dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setqueue_positionceb8d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setquality_scoredfaa9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsla_wait_start_time20502(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrules_iconfb03f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_textecd92(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rules2001a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_divider206ab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarning_icond1cd0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgia_sol_text460ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rulesd6c6e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividers28a68(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarnings_icon0adcc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgias_sol_text24265(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecials_rules14021(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividerss0c16e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningss_icons476c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgias_sosl_texts3f264(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecials_rulesscc30f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_special_rules_dividersssdcaab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningsss_icons3be9c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorgiass_sosl_texts88097(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecials_ruless95686(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenues_special_rules_dividerssss44419(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarningssss_icons55275(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeorsgiass_sosl_texts15f5e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspesciasls_ruless910f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebt_info_textb09b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namef7cac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setssn_masked26c46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdob0f0bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddress22d72(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfinancial_dtls_text3451f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_off_date13a39(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlast_payment_dateeab2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balanceca1e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipal6eb2a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinteresta6b7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfeesb456c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setven_name_text0c8ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate3010e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry1983b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name41a77(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudge_name0a819(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsol_expiry_dated5486(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfiling_fee89c7f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_method1b411(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_system7d508(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_required36d60(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreeq_doc_text732f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id54469(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name513db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by736ad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_datecfead(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalid_checklist_text1428a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchecklist_item_id611e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setitem_nameafc9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_completed6ef7a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremarks_textarea15a62(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_id4ecc7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentviewer64771(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch1e502(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setheader_groupb1913({}) 
    setheader_groupb1913Props({
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
        setasset_dashboard_group4bbfe({}) 
    setasset_dashboard_group4bbfeProps({
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
        setamr_queue_groupc92ca({}) 
    setamr_queue_groupc92caProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "amr_queue_text",
            "icon_total_assest",
            "amr_queue",
            "amr_queue_desc",
      ]
      }) 
        setpending_file_groupffe32({}) 
    setpending_file_groupffe32Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "pending_file_text",
            "icon_maintenance_due",
            "pending_filings",
            "pending_file_desc",
      ]
      }) 
        setservice_pending_group7ba93({}) 
    setservice_pending_group7ba93Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "service_pending_text",
            "icon_warranty_expiring",
            "service_pending",
            "service_pending_desc",
      ]
      }) 
        setslas_at_risk_group23eb4({}) 
    setslas_at_risk_group23eb4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "slas_at_risk_text",
            "icon_",
            "slas_at_risk",
            "slas_at_risk_desc",
      ]
      }) 
        setcourt_rejection_groupc9d54({}) 
    setcourt_rejection_groupc9d54Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "court_rejection_text",
            "icon",
            "court_rejections",
            "court_rejection_desc",
      ]
      }) 
        setcollected_mtd_group7b7b5({}) 
    setcollected_mtd_group7b7b5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "collected_mtd_text",
            "icon",
            "collected_mtd",
            "collected_mtd_desc",
      ]
      }) 
        settable_group112bd({}) 
    settable_group112bdProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "status",
      ]
      }) 
        setsubscreene9ab5({}) 
    setsubscreene9ab5Props({
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
        setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797({}) 
    setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props({
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
        setgroup28176({}) 
    setgroup28176Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search_btn",
            "add_btn",
            "text",
      ]
      }) 
    
    settable852e3([]) 
    settable852e3Props({
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
        setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da({}) 
    setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps({
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
        setpending_fillings_groupb1568({}) 
    setpending_fillings_groupb1568Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search_btn",
            "add_btn",
            "text",
      ]
      }) 
    
    setpending_fillings_table11279([]) 
    setpending_fillings_table11279Props({
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
        setsearch_groupdefa1({}) 
    setsearch_groupdefa1Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_display_id",
      ]
      }) 
        setadd_case_groupeb161({}) 
    setadd_case_groupeb161Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "venue_id",
            "creditor_id",
            "customwidget",
            "account_id",
            "remarks_textarea",
      ]
      }) 
        setheader_group4878f({}) 
    setheader_group4878fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "craete_header_text",
      ]
      }) 
        setdynamicactions094c3({}) 
    setdynamicactions094c3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel_button",
            "update",
            "submit",
      ]
      }) 
        setcase_information_group28f6f({}) 
    setcase_information_group28f6fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_info_text",
            "creditor_name",
            "attorney_name",
            "priority_name",
            "status_name",
            "queue_position",
            "quality_score",
            "sla_wait_start_time",
      ]
      }) 
        setvenue_group6a36d({}) 
    setvenue_group6a36dProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "rules_icon",
            "venue_special_rules_text",
            "special_rules",
            "venue_special_rules_divider",
            "venue_special_rules_dividers",
            "venue_special_rules_dividerss",
            "venue_special_rules_dividerssss",
            "venues_special_rules_dividerssss",
      ]
      }) 
        setgeorgia_group0fa18({}) 
    setgeorgia_group0fa18Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warning_icon",
            "georgia_sol_text",
            "special_rules",
      ]
      }) 
        setgeorgias_group945fd({}) 
    setgeorgias_group945fdProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warnings_icon",
            "georgias_sol_text",
            "specials_rules",
      ]
      }) 
        setgeorgias_groups6f85f({}) 
    setgeorgias_groups6f85fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningss_icons",
            "georgias_sosl_texts",
            "specials_ruless",
      ]
      }) 
        setgeorgiass_groups86a87({}) 
    setgeorgiass_groups86a87Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningsss_icons",
            "georgiass_sosl_texts",
            "speciasls_ruless",
      ]
      }) 
        setgeorgsiass_groupsb044a({}) 
    setgeorgsiass_groupsb044aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningssss_icons",
            "georsgiass_sosl_texts",
            "spesciasls_ruless",
      ]
      }) 
        setdebtor_information_group78a70({}) 
    setdebtor_information_group78a70Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debt_info_text",
            "debtor_name",
            "ssn_masked",
            "dob",
            "address",
      ]
      }) 
        setfinancial_details_group52f47({}) 
    setfinancial_details_group52f47Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "financial_dtls_text",
            "charge_off_date",
            "last_payment_date",
            "total_balance",
            "principal",
            "interest",
            "fees",
      ]
      }) 
        setvenue_details_group17ac6({}) 
    setvenue_details_group17ac6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ven_name_text",
            "state",
            "county",
            "court_name",
            "judge_name",
            "sol_expiry_date",
            "filing_fee",
            "service_method",
            "efiling_system",
            "efiling_required",
      ]
      }) 
        setrequired_dociument_main_group04e92({}) 
    setrequired_dociument_main_group04e92Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "reeq_doc_text",
            "description_text",
      ]
      }) 
        setrequired_dociument_header_groupe39c8({}) 
    setrequired_dociument_header_groupe39c8Props({
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
    
    setdoc_type_tablebe9fa([]) 
    setdoc_type_tablebe9faProps({
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
        setchecklist_main_group0df6b({}) 
    setchecklist_main_group0df6bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "valid_checklist_text",
      ]
      }) 
        setchecklist_group32b3d({}) 
    setchecklist_group32b3dProps({
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
    
    setchecklist_table198e1([]) 
    setchecklist_table198e1Props({
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
        setadd_case_group1f6e4({}) 
    setadd_case_group1f6e4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "venue_id",
            "creditor_id",
            "remarks_textarea",
            "account_id",
      ]
      }) 
        setheader_group3749a({}) 
    setheader_group3749aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "craete_header_text",
      ]
      }) 
        setcase_information_groupcec29({}) 
    setcase_information_groupcec29Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_info_text",
            "creditor_name",
            "attorney_name",
            "status_name",
            "priority_name",
            "queue_position",
            "quality_score",
            "sla_wait_start_time",
      ]
      }) 
        setvenue_groupa72d9({}) 
    setvenue_groupa72d9Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "rules_icon",
            "venue_special_rules_text",
            "special_rules",
            "venue_special_rules_divider",
            "venue_special_rules_dividers",
            "venue_special_rules_dividerss",
            "venue_special_rules_dividersss",
            "venues_special_rules_dividerssss",
      ]
      }) 
        setgeorgia_groupa636c({}) 
    setgeorgia_groupa636cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warning_icon",
            "georgia_sol_text",
            "special_rules",
      ]
      }) 
        setgeorgias_groupbac01({}) 
    setgeorgias_groupbac01Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warnings_icon",
            "georgias_sol_text",
            "specials_rules",
      ]
      }) 
        setgeorgias_groupsbf356({}) 
    setgeorgias_groupsbf356Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningss_icons",
            "georgias_sosl_texts",
            "specials_ruless",
      ]
      }) 
        setgeorgiass_groups9e4dd({}) 
    setgeorgiass_groups9e4ddProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningsss_icons",
            "georgiass_sosl_texts",
            "specials_ruless",
      ]
      }) 
        setgeorgsiass_groups6bf7a({}) 
    setgeorgsiass_groups6bf7aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warningssss_icons",
            "georsgiass_sosl_texts",
            "spesciasls_ruless",
      ]
      }) 
        setdebtor_information_groupdfa55({}) 
    setdebtor_information_groupdfa55Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "debt_info_text",
            "debtor_name",
            "ssn_masked",
            "dob",
            "address",
      ]
      }) 
        setfinancial_details_grouped0d9({}) 
    setfinancial_details_grouped0d9Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "financial_dtls_text",
            "charge_off_date",
            "last_payment_date",
            "total_balance",
            "principal",
            "interest",
            "fees",
      ]
      }) 
        setvenue_details_group6a27a({}) 
    setvenue_details_group6a27aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ven_name_text",
            "state",
            "county",
            "court_name",
            "judge_name",
            "sol_expiry_date",
            "filing_fee",
            "service_method",
            "efiling_system",
            "efiling_required",
      ]
      }) 
        setrequired_dociument_main_group3eb5b({}) 
    setrequired_dociument_main_group3eb5bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "reeq_doc_text",
      ]
      }) 
    
    setdoc_tablee79c7([]) 
    setdoc_tablee79c7Props({
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
        setchecklist_main_group5b62e({}) 
    setchecklist_main_group5b62eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "valid_checklist_text",
      ]
      }) 
    
    setchecklist_table45abc([]) 
    setchecklist_table45abcProps({
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
        setdocument_viewer_groupe4249({}) 
    setdocument_viewer_groupe4249Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "attachment_id",
      ]
      }) 
        setsearch_group39b74({}) 
    setsearch_group39b74Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "case_display_id",
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
        header_groupb1913, 
        setheader_groupb1913,
        header_groupb1913Props, 
        setheader_groupb1913Props,
        asset_dashboard_group4bbfe, 
        setasset_dashboard_group4bbfe,
        asset_dashboard_group4bbfeProps, 
        setasset_dashboard_group4bbfeProps,
        amr_queue_groupc92ca, 
        setamr_queue_groupc92ca,
        amr_queue_groupc92caProps, 
        setamr_queue_groupc92caProps,
        pending_file_groupffe32, 
        setpending_file_groupffe32,
        pending_file_groupffe32Props, 
        setpending_file_groupffe32Props,
        service_pending_group7ba93, 
        setservice_pending_group7ba93,
        service_pending_group7ba93Props, 
        setservice_pending_group7ba93Props,
        slas_at_risk_group23eb4, 
        setslas_at_risk_group23eb4,
        slas_at_risk_group23eb4Props, 
        setslas_at_risk_group23eb4Props,
        court_rejection_groupc9d54, 
        setcourt_rejection_groupc9d54,
        court_rejection_groupc9d54Props, 
        setcourt_rejection_groupc9d54Props,
        collected_mtd_group7b7b5, 
        setcollected_mtd_group7b7b5,
        collected_mtd_group7b7b5Props, 
        setcollected_mtd_group7b7b5Props,
        table_group112bd, 
        settable_group112bd,
        table_group112bdProps, 
        settable_group112bdProps,
        subscreene9ab5, 
        setsubscreene9ab5,
        subscreene9ab5Props, 
        setsubscreene9ab5Props,
        ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, 
        setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, 
        setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        group28176, 
        setgroup28176,
        group28176Props, 
        setgroup28176Props,
        table852e3, 
        settable852e3,
        table852e3Props, 
        settable852e3Props,
        ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, 
        setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, 
        setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        pending_fillings_groupb1568, 
        setpending_fillings_groupb1568,
        pending_fillings_groupb1568Props, 
        setpending_fillings_groupb1568Props,
        pending_fillings_table11279, 
        setpending_fillings_table11279,
        pending_fillings_table11279Props, 
        setpending_fillings_table11279Props,
        search_groupdefa1, 
        setsearch_groupdefa1,
        search_groupdefa1Props, 
        setsearch_groupdefa1Props,
        add_case_groupeb161, 
        setadd_case_groupeb161,
        add_case_groupeb161Props, 
        setadd_case_groupeb161Props,
        header_group4878f, 
        setheader_group4878f,
        header_group4878fProps, 
        setheader_group4878fProps,
        dynamicactions094c3, 
        setdynamicactions094c3,
        dynamicactions094c3Props, 
        setdynamicactions094c3Props,
        case_information_group28f6f, 
        setcase_information_group28f6f,
        case_information_group28f6fProps, 
        setcase_information_group28f6fProps,
        venue_group6a36d, 
        setvenue_group6a36d,
        venue_group6a36dProps, 
        setvenue_group6a36dProps,
        georgia_group0fa18, 
        setgeorgia_group0fa18,
        georgia_group0fa18Props, 
        setgeorgia_group0fa18Props,
        georgias_group945fd, 
        setgeorgias_group945fd,
        georgias_group945fdProps, 
        setgeorgias_group945fdProps,
        georgias_groups6f85f, 
        setgeorgias_groups6f85f,
        georgias_groups6f85fProps, 
        setgeorgias_groups6f85fProps,
        georgiass_groups86a87, 
        setgeorgiass_groups86a87,
        georgiass_groups86a87Props, 
        setgeorgiass_groups86a87Props,
        georgsiass_groupsb044a, 
        setgeorgsiass_groupsb044a,
        georgsiass_groupsb044aProps, 
        setgeorgsiass_groupsb044aProps,
        debtor_information_group78a70, 
        setdebtor_information_group78a70,
        debtor_information_group78a70Props, 
        setdebtor_information_group78a70Props,
        financial_details_group52f47, 
        setfinancial_details_group52f47,
        financial_details_group52f47Props, 
        setfinancial_details_group52f47Props,
        venue_details_group17ac6, 
        setvenue_details_group17ac6,
        venue_details_group17ac6Props, 
        setvenue_details_group17ac6Props,
        required_dociument_main_group04e92, 
        setrequired_dociument_main_group04e92,
        required_dociument_main_group04e92Props, 
        setrequired_dociument_main_group04e92Props,
        required_dociument_header_groupe39c8, 
        setrequired_dociument_header_groupe39c8,
        required_dociument_header_groupe39c8Props, 
        setrequired_dociument_header_groupe39c8Props,
        doc_type_tablebe9fa, 
        setdoc_type_tablebe9fa,
        doc_type_tablebe9faProps, 
        setdoc_type_tablebe9faProps,
        checklist_main_group0df6b, 
        setchecklist_main_group0df6b,
        checklist_main_group0df6bProps, 
        setchecklist_main_group0df6bProps,
        checklist_group32b3d, 
        setchecklist_group32b3d,
        checklist_group32b3dProps, 
        setchecklist_group32b3dProps,
        checklist_table198e1, 
        setchecklist_table198e1,
        checklist_table198e1Props, 
        setchecklist_table198e1Props,
        add_case_group1f6e4, 
        setadd_case_group1f6e4,
        add_case_group1f6e4Props, 
        setadd_case_group1f6e4Props,
        header_group3749a, 
        setheader_group3749a,
        header_group3749aProps, 
        setheader_group3749aProps,
        case_information_groupcec29, 
        setcase_information_groupcec29,
        case_information_groupcec29Props, 
        setcase_information_groupcec29Props,
        venue_groupa72d9, 
        setvenue_groupa72d9,
        venue_groupa72d9Props, 
        setvenue_groupa72d9Props,
        georgia_groupa636c, 
        setgeorgia_groupa636c,
        georgia_groupa636cProps, 
        setgeorgia_groupa636cProps,
        georgias_groupbac01, 
        setgeorgias_groupbac01,
        georgias_groupbac01Props, 
        setgeorgias_groupbac01Props,
        georgias_groupsbf356, 
        setgeorgias_groupsbf356,
        georgias_groupsbf356Props, 
        setgeorgias_groupsbf356Props,
        georgiass_groups9e4dd, 
        setgeorgiass_groups9e4dd,
        georgiass_groups9e4ddProps, 
        setgeorgiass_groups9e4ddProps,
        georgsiass_groups6bf7a, 
        setgeorgsiass_groups6bf7a,
        georgsiass_groups6bf7aProps, 
        setgeorgsiass_groups6bf7aProps,
        debtor_information_groupdfa55, 
        setdebtor_information_groupdfa55,
        debtor_information_groupdfa55Props, 
        setdebtor_information_groupdfa55Props,
        financial_details_grouped0d9, 
        setfinancial_details_grouped0d9,
        financial_details_grouped0d9Props, 
        setfinancial_details_grouped0d9Props,
        venue_details_group6a27a, 
        setvenue_details_group6a27a,
        venue_details_group6a27aProps, 
        setvenue_details_group6a27aProps,
        required_dociument_main_group3eb5b, 
        setrequired_dociument_main_group3eb5b,
        required_dociument_main_group3eb5bProps, 
        setrequired_dociument_main_group3eb5bProps,
        doc_tablee79c7, 
        setdoc_tablee79c7,
        doc_tablee79c7Props, 
        setdoc_tablee79c7Props,
        checklist_main_group5b62e, 
        setchecklist_main_group5b62e,
        checklist_main_group5b62eProps, 
        setchecklist_main_group5b62eProps,
        checklist_table45abc, 
        setchecklist_table45abc,
        checklist_table45abcProps, 
        setchecklist_table45abcProps,
        document_viewer_groupe4249, 
        setdocument_viewer_groupe4249,
        document_viewer_groupe4249Props, 
        setdocument_viewer_groupe4249Props,
        search_group39b74, 
        setsearch_group39b74,
        search_group39b74Props, 
        setsearch_group39b74Props,
        text9e38a,
        settext9e38a, 
        text9e38aProps,
        settext9e38aProps,
        amr_queue_text28561,
        setamr_queue_text28561, 
        amr_queue_text28561Props,
        setamr_queue_text28561Props,
        icon_total_assest208f5,
        seticon_total_assest208f5, 
        icon_total_assest208f5Props,
        seticon_total_assest208f5Props,
        amr_queue5b620,
        setamr_queue5b620, 
        amr_queue5b620Props,
        setamr_queue5b620Props,
        amr_queue_descafe0e,
        setamr_queue_descafe0e, 
        amr_queue_descafe0eProps,
        setamr_queue_descafe0eProps,
        pending_file_text86c2a,
        setpending_file_text86c2a, 
        pending_file_text86c2aProps,
        setpending_file_text86c2aProps,
        icon_maintenance_duecab92,
        seticon_maintenance_duecab92, 
        icon_maintenance_duecab92Props,
        seticon_maintenance_duecab92Props,
        pending_file1721b,
        setpending_file1721b, 
        pending_file1721bProps,
        setpending_file1721bProps,
        pending_file_desc53378,
        setpending_file_desc53378, 
        pending_file_desc53378Props,
        setpending_file_desc53378Props,
        service_pending_text5cc58,
        setservice_pending_text5cc58, 
        service_pending_text5cc58Props,
        setservice_pending_text5cc58Props,
        icon_warranty_expiring6d299,
        seticon_warranty_expiring6d299, 
        icon_warranty_expiring6d299Props,
        seticon_warranty_expiring6d299Props,
        service_pending918f0,
        setservice_pending918f0, 
        service_pending918f0Props,
        setservice_pending918f0Props,
        service_pending_descabf48,
        setservice_pending_descabf48, 
        service_pending_descabf48Props,
        setservice_pending_descabf48Props,
        slas_at_risk_text33ae5,
        setslas_at_risk_text33ae5, 
        slas_at_risk_text33ae5Props,
        setslas_at_risk_text33ae5Props,
        icon_2caf8,
        seticon_2caf8, 
        icon_2caf8Props,
        seticon_2caf8Props,
        slas_at_riskf177b,
        setslas_at_riskf177b, 
        slas_at_riskf177bProps,
        setslas_at_riskf177bProps,
        slas_at_risk_desc5c075,
        setslas_at_risk_desc5c075, 
        slas_at_risk_desc5c075Props,
        setslas_at_risk_desc5c075Props,
        court_rejection_text06a86,
        setcourt_rejection_text06a86, 
        court_rejection_text06a86Props,
        setcourt_rejection_text06a86Props,
        icona5abd,
        seticona5abd, 
        icona5abdProps,
        seticona5abdProps,
        court_rejection2460a,
        setcourt_rejection2460a, 
        court_rejection2460aProps,
        setcourt_rejection2460aProps,
        court_rejection_desc7c63b,
        setcourt_rejection_desc7c63b, 
        court_rejection_desc7c63bProps,
        setcourt_rejection_desc7c63bProps,
        collected_mtd_text4d825,
        setcollected_mtd_text4d825, 
        collected_mtd_text4d825Props,
        setcollected_mtd_text4d825Props,
        iconaff33,
        seticonaff33, 
        iconaff33Props,
        seticonaff33Props,
        collected_mtdab52b,
        setcollected_mtdab52b, 
        collected_mtdab52bProps,
        setcollected_mtdab52bProps,
        collected_mtd_descfffed,
        setcollected_mtd_descfffed, 
        collected_mtd_descfffedProps,
        setcollected_mtd_descfffedProps,
        search_btn4c2ed,
        setsearch_btn4c2ed, 
        search_btn4c2edProps,
        setsearch_btn4c2edProps,
        add_btn2f9d0,
        setadd_btn2f9d0, 
        add_btn2f9d0Props,
        setadd_btn2f9d0Props,
        textc2337,
        settextc2337, 
        textc2337Props,
        settextc2337Props,
        case_display_id8caab,
        setcase_display_id8caab, 
        case_display_id8caabProps,
        setcase_display_id8caabProps,
        debtor_namedb464,
        setdebtor_namedb464, 
        debtor_namedb464Props,
        setdebtor_namedb464Props,
        creditor_name29781,
        setcreditor_name29781, 
        creditor_name29781Props,
        setcreditor_name29781Props,
        full_nameda699,
        setfull_nameda699, 
        full_nameda699Props,
        setfull_nameda699Props,
        total_balancea27e6,
        settotal_balancea27e6, 
        total_balancea27e6Props,
        settotal_balancea27e6Props,
        court_name03aea,
        setcourt_name03aea, 
        court_name03aeaProps,
        setcourt_name03aeaProps,
        priority_namec8266,
        setpriority_namec8266, 
        priority_namec8266Props,
        setpriority_namec8266Props,
        status_named2368,
        setstatus_named2368, 
        status_named2368Props,
        setstatus_named2368Props,
        trs_created_datec9e9d,
        settrs_created_datec9e9d, 
        trs_created_datec9e9dProps,
        settrs_created_datec9e9dProps,
        view_btns77c69,
        setview_btns77c69, 
        view_btns77c69Props,
        setview_btns77c69Props,
        edit_btns48ea7,
        setedit_btns48ea7, 
        edit_btns48ea7Props,
        setedit_btns48ea7Props,
        search_btn15268,
        setsearch_btn15268, 
        search_btn15268Props,
        setsearch_btn15268Props,
        add_btn707cf,
        setadd_btn707cf, 
        add_btn707cfProps,
        setadd_btn707cfProps,
        text3ced2,
        settext3ced2, 
        text3ced2Props,
        settext3ced2Props,
        case_display_id32ae4,
        setcase_display_id32ae4, 
        case_display_id32ae4Props,
        setcase_display_id32ae4Props,
        debtor_namecd77b,
        setdebtor_namecd77b, 
        debtor_namecd77bProps,
        setdebtor_namecd77bProps,
        creditor_nameb14ce,
        setcreditor_nameb14ce, 
        creditor_nameb14ceProps,
        setcreditor_nameb14ceProps,
        full_name592f3,
        setfull_name592f3, 
        full_name592f3Props,
        setfull_name592f3Props,
        total_balance98c00,
        settotal_balance98c00, 
        total_balance98c00Props,
        settotal_balance98c00Props,
        court_name4b97b,
        setcourt_name4b97b, 
        court_name4b97bProps,
        setcourt_name4b97bProps,
        priority_namec61c4,
        setpriority_namec61c4, 
        priority_namec61c4Props,
        setpriority_namec61c4Props,
        status_namec590e,
        setstatus_namec590e, 
        status_namec590eProps,
        setstatus_namec590eProps,
        trs_created_date4e909,
        settrs_created_date4e909, 
        trs_created_date4e909Props,
        settrs_created_date4e909Props,
        view_btn88178,
        setview_btn88178, 
        view_btn88178Props,
        setview_btn88178Props,
        edit_btn4cc84,
        setedit_btn4cc84, 
        edit_btn4cc84Props,
        setedit_btn4cc84Props,
        status77d60,
        setstatus77d60, 
        status77d60Props,
        setstatus77d60Props,
        advancesearch6059f,
        setadvancesearch6059f, 
        advancesearch6059fProps,
        setadvancesearch6059fProps,
        craete_header_textace67,
        setcraete_header_textace67, 
        craete_header_textace67Props,
        setcraete_header_textace67Props,
        cancel_button70ef3,
        setcancel_button70ef3, 
        cancel_button70ef3Props,
        setcancel_button70ef3Props,
        update294f0,
        setupdate294f0, 
        update294f0Props,
        setupdate294f0Props,
        submit0112f,
        setsubmit0112f, 
        submit0112fProps,
        setsubmit0112fProps,
        venue_id0c4bb,
        setvenue_id0c4bb, 
        venue_id0c4bbProps,
        setvenue_id0c4bbProps,
        creditor_idf6f71,
        setcreditor_idf6f71, 
        creditor_idf6f71Props,
        setcreditor_idf6f71Props,
        case_info_text1f2c8,
        setcase_info_text1f2c8, 
        case_info_text1f2c8Props,
        setcase_info_text1f2c8Props,
        creditor_namef8de4,
        setcreditor_namef8de4, 
        creditor_namef8de4Props,
        setcreditor_namef8de4Props,
        attorney_name073fd,
        setattorney_name073fd, 
        attorney_name073fdProps,
        setattorney_name073fdProps,
        priority_namebcbd5,
        setpriority_namebcbd5, 
        priority_namebcbd5Props,
        setpriority_namebcbd5Props,
        status_namecbe6f,
        setstatus_namecbe6f, 
        status_namecbe6fProps,
        setstatus_namecbe6fProps,
        queue_position049be,
        setqueue_position049be, 
        queue_position049beProps,
        setqueue_position049beProps,
        quality_score2c29e,
        setquality_score2c29e, 
        quality_score2c29eProps,
        setquality_score2c29eProps,
        sla_wait_start_time2fb95,
        setsla_wait_start_time2fb95, 
        sla_wait_start_time2fb95Props,
        setsla_wait_start_time2fb95Props,
        rules_iconbdce0,
        setrules_iconbdce0, 
        rules_iconbdce0Props,
        setrules_iconbdce0Props,
        venue_special_rules_text2cdf6,
        setvenue_special_rules_text2cdf6, 
        venue_special_rules_text2cdf6Props,
        setvenue_special_rules_text2cdf6Props,
        special_rulesbd9d8,
        setspecial_rulesbd9d8, 
        special_rulesbd9d8Props,
        setspecial_rulesbd9d8Props,
        venue_special_rules_dividere4760,
        setvenue_special_rules_dividere4760, 
        venue_special_rules_dividere4760Props,
        setvenue_special_rules_dividere4760Props,
        warning_iconc4eea,
        setwarning_iconc4eea, 
        warning_iconc4eeaProps,
        setwarning_iconc4eeaProps,
        georgia_sol_text6238e,
        setgeorgia_sol_text6238e, 
        georgia_sol_text6238eProps,
        setgeorgia_sol_text6238eProps,
        special_rules031f4,
        setspecial_rules031f4, 
        special_rules031f4Props,
        setspecial_rules031f4Props,
        venue_special_rules_dividerscd6e7,
        setvenue_special_rules_dividerscd6e7, 
        venue_special_rules_dividerscd6e7Props,
        setvenue_special_rules_dividerscd6e7Props,
        warnings_icon63b3d,
        setwarnings_icon63b3d, 
        warnings_icon63b3dProps,
        setwarnings_icon63b3dProps,
        georgias_sol_textea2e1,
        setgeorgias_sol_textea2e1, 
        georgias_sol_textea2e1Props,
        setgeorgias_sol_textea2e1Props,
        specials_rulesb4b8b,
        setspecials_rulesb4b8b, 
        specials_rulesb4b8bProps,
        setspecials_rulesb4b8bProps,
        venue_special_rules_dividerss0fa18,
        setvenue_special_rules_dividerss0fa18, 
        venue_special_rules_dividerss0fa18Props,
        setvenue_special_rules_dividerss0fa18Props,
        warningss_iconsb27c3,
        setwarningss_iconsb27c3, 
        warningss_iconsb27c3Props,
        setwarningss_iconsb27c3Props,
        georgias_sosl_texts1ccd5,
        setgeorgias_sosl_texts1ccd5, 
        georgias_sosl_texts1ccd5Props,
        setgeorgias_sosl_texts1ccd5Props,
        specials_rulesscabb6,
        setspecials_rulesscabb6, 
        specials_rulesscabb6Props,
        setspecials_rulesscabb6Props,
        venue_special_rules_dividerssss2b01f,
        setvenue_special_rules_dividerssss2b01f, 
        venue_special_rules_dividerssss2b01fProps,
        setvenue_special_rules_dividerssss2b01fProps,
        warningsss_iconse38db,
        setwarningsss_iconse38db, 
        warningsss_iconse38dbProps,
        setwarningsss_iconse38dbProps,
        georgiass_sosl_texts52ad5,
        setgeorgiass_sosl_texts52ad5, 
        georgiass_sosl_texts52ad5Props,
        setgeorgiass_sosl_texts52ad5Props,
        speciasls_rulessc3d56,
        setspeciasls_rulessc3d56, 
        speciasls_rulessc3d56Props,
        setspeciasls_rulessc3d56Props,
        venues_special_rules_dividerssss9b36c,
        setvenues_special_rules_dividerssss9b36c, 
        venues_special_rules_dividerssss9b36cProps,
        setvenues_special_rules_dividerssss9b36cProps,
        warningssss_iconsbdae5,
        setwarningssss_iconsbdae5, 
        warningssss_iconsbdae5Props,
        setwarningssss_iconsbdae5Props,
        georsgiass_sosl_texts14d14,
        setgeorsgiass_sosl_texts14d14, 
        georsgiass_sosl_texts14d14Props,
        setgeorsgiass_sosl_texts14d14Props,
        spesciasls_ruless22364,
        setspesciasls_ruless22364, 
        spesciasls_ruless22364Props,
        setspesciasls_ruless22364Props,
        debt_info_text9078e,
        setdebt_info_text9078e, 
        debt_info_text9078eProps,
        setdebt_info_text9078eProps,
        debtor_namea5e3f,
        setdebtor_namea5e3f, 
        debtor_namea5e3fProps,
        setdebtor_namea5e3fProps,
        ssn_masked273fe,
        setssn_masked273fe, 
        ssn_masked273feProps,
        setssn_masked273feProps,
        dobdba19,
        setdobdba19, 
        dobdba19Props,
        setdobdba19Props,
        addressa3e42,
        setaddressa3e42, 
        addressa3e42Props,
        setaddressa3e42Props,
        financial_dtls_text3b122,
        setfinancial_dtls_text3b122, 
        financial_dtls_text3b122Props,
        setfinancial_dtls_text3b122Props,
        charge_off_datef15ef,
        setcharge_off_datef15ef, 
        charge_off_datef15efProps,
        setcharge_off_datef15efProps,
        last_payment_date23905,
        setlast_payment_date23905, 
        last_payment_date23905Props,
        setlast_payment_date23905Props,
        total_balanced15a0,
        settotal_balanced15a0, 
        total_balanced15a0Props,
        settotal_balanced15a0Props,
        principalc3ba6,
        setprincipalc3ba6, 
        principalc3ba6Props,
        setprincipalc3ba6Props,
        interest81968,
        setinterest81968, 
        interest81968Props,
        setinterest81968Props,
        fees0f99a,
        setfees0f99a, 
        fees0f99aProps,
        setfees0f99aProps,
        ven_name_textef3ac,
        setven_name_textef3ac, 
        ven_name_textef3acProps,
        setven_name_textef3acProps,
        state752e3,
        setstate752e3, 
        state752e3Props,
        setstate752e3Props,
        countryf4404,
        setcountryf4404, 
        countryf4404Props,
        setcountryf4404Props,
        court_namef21b5,
        setcourt_namef21b5, 
        court_namef21b5Props,
        setcourt_namef21b5Props,
        judge_name78f03,
        setjudge_name78f03, 
        judge_name78f03Props,
        setjudge_name78f03Props,
        sol_expiry_date8639c,
        setsol_expiry_date8639c, 
        sol_expiry_date8639cProps,
        setsol_expiry_date8639cProps,
        filing_fee389dd,
        setfiling_fee389dd, 
        filing_fee389ddProps,
        setfiling_fee389ddProps,
        service_methoddeae7,
        setservice_methoddeae7, 
        service_methoddeae7Props,
        setservice_methoddeae7Props,
        efiling_systemc00e5,
        setefiling_systemc00e5, 
        efiling_systemc00e5Props,
        setefiling_systemc00e5Props,
        efiling_requiredb3e9d,
        setefiling_requiredb3e9d, 
        efiling_requiredb3e9dProps,
        setefiling_requiredb3e9dProps,
        reeq_doc_text9e8f8,
        setreeq_doc_text9e8f8, 
        reeq_doc_text9e8f8Props,
        setreeq_doc_text9e8f8Props,
        doc_type_idaf61f,
        setdoc_type_idaf61f, 
        doc_type_idaf61fProps,
        setdoc_type_idaf61fProps,
        doc_type_name949dd,
        setdoc_type_name949dd, 
        doc_type_name949ddProps,
        setdoc_type_name949ddProps,
        uploaderdff25,
        setuploaderdff25, 
        uploaderdff25Props,
        setuploaderdff25Props,
        doc_reference_urld9056,
        setdoc_reference_urld9056, 
        doc_reference_urld9056Props,
        setdoc_reference_urld9056Props,
        description_textb45ef,
        setdescription_textb45ef, 
        description_textb45efProps,
        setdescription_textb45efProps,
        customwidgetd1a34,
        setcustomwidgetd1a34, 
        customwidgetd1a34Props,
        setcustomwidgetd1a34Props,
        account_id7e64e,
        setaccount_id7e64e, 
        account_id7e64eProps,
        setaccount_id7e64eProps,
        valid_checklist_textc0f22,
        setvalid_checklist_textc0f22, 
        valid_checklist_textc0f22Props,
        setvalid_checklist_textc0f22Props,
        checklist_item_id255b0,
        setchecklist_item_id255b0, 
        checklist_item_id255b0Props,
        setchecklist_item_id255b0Props,
        item_nameeed39,
        setitem_nameeed39, 
        item_nameeed39Props,
        setitem_nameeed39Props,
        is_completeb8c69,
        setis_completeb8c69, 
        is_completeb8c69Props,
        setis_completeb8c69Props,
        remarks_textareadc753,
        setremarks_textareadc753, 
        remarks_textareadc753Props,
        setremarks_textareadc753Props,
        craete_header_text93eaa,
        setcraete_header_text93eaa, 
        craete_header_text93eaaProps,
        setcraete_header_text93eaaProps,
        venue_idcb444,
        setvenue_idcb444, 
        venue_idcb444Props,
        setvenue_idcb444Props,
        creditor_idb1867,
        setcreditor_idb1867, 
        creditor_idb1867Props,
        setcreditor_idb1867Props,
        case_info_textdf3f1,
        setcase_info_textdf3f1, 
        case_info_textdf3f1Props,
        setcase_info_textdf3f1Props,
        creditor_name257be,
        setcreditor_name257be, 
        creditor_name257beProps,
        setcreditor_name257beProps,
        attorney_name87be1,
        setattorney_name87be1, 
        attorney_name87be1Props,
        setattorney_name87be1Props,
        status_namea5f92,
        setstatus_namea5f92, 
        status_namea5f92Props,
        setstatus_namea5f92Props,
        priority_name449dd,
        setpriority_name449dd, 
        priority_name449ddProps,
        setpriority_name449ddProps,
        queue_positionceb8d,
        setqueue_positionceb8d, 
        queue_positionceb8dProps,
        setqueue_positionceb8dProps,
        quality_scoredfaa9,
        setquality_scoredfaa9, 
        quality_scoredfaa9Props,
        setquality_scoredfaa9Props,
        sla_wait_start_time20502,
        setsla_wait_start_time20502, 
        sla_wait_start_time20502Props,
        setsla_wait_start_time20502Props,
        rules_iconfb03f,
        setrules_iconfb03f, 
        rules_iconfb03fProps,
        setrules_iconfb03fProps,
        venue_special_rules_textecd92,
        setvenue_special_rules_textecd92, 
        venue_special_rules_textecd92Props,
        setvenue_special_rules_textecd92Props,
        special_rules2001a,
        setspecial_rules2001a, 
        special_rules2001aProps,
        setspecial_rules2001aProps,
        venue_special_rules_divider206ab,
        setvenue_special_rules_divider206ab, 
        venue_special_rules_divider206abProps,
        setvenue_special_rules_divider206abProps,
        warning_icond1cd0,
        setwarning_icond1cd0, 
        warning_icond1cd0Props,
        setwarning_icond1cd0Props,
        georgia_sol_text460ef,
        setgeorgia_sol_text460ef, 
        georgia_sol_text460efProps,
        setgeorgia_sol_text460efProps,
        special_rulesd6c6e,
        setspecial_rulesd6c6e, 
        special_rulesd6c6eProps,
        setspecial_rulesd6c6eProps,
        venue_special_rules_dividers28a68,
        setvenue_special_rules_dividers28a68, 
        venue_special_rules_dividers28a68Props,
        setvenue_special_rules_dividers28a68Props,
        warnings_icon0adcc,
        setwarnings_icon0adcc, 
        warnings_icon0adccProps,
        setwarnings_icon0adccProps,
        georgias_sol_text24265,
        setgeorgias_sol_text24265, 
        georgias_sol_text24265Props,
        setgeorgias_sol_text24265Props,
        specials_rules14021,
        setspecials_rules14021, 
        specials_rules14021Props,
        setspecials_rules14021Props,
        venue_special_rules_dividerss0c16e,
        setvenue_special_rules_dividerss0c16e, 
        venue_special_rules_dividerss0c16eProps,
        setvenue_special_rules_dividerss0c16eProps,
        warningss_icons476c3,
        setwarningss_icons476c3, 
        warningss_icons476c3Props,
        setwarningss_icons476c3Props,
        georgias_sosl_texts3f264,
        setgeorgias_sosl_texts3f264, 
        georgias_sosl_texts3f264Props,
        setgeorgias_sosl_texts3f264Props,
        specials_rulesscc30f,
        setspecials_rulesscc30f, 
        specials_rulesscc30fProps,
        setspecials_rulesscc30fProps,
        venue_special_rules_dividersssdcaab,
        setvenue_special_rules_dividersssdcaab, 
        venue_special_rules_dividersssdcaabProps,
        setvenue_special_rules_dividersssdcaabProps,
        warningsss_icons3be9c,
        setwarningsss_icons3be9c, 
        warningsss_icons3be9cProps,
        setwarningsss_icons3be9cProps,
        georgiass_sosl_texts88097,
        setgeorgiass_sosl_texts88097, 
        georgiass_sosl_texts88097Props,
        setgeorgiass_sosl_texts88097Props,
        specials_ruless95686,
        setspecials_ruless95686, 
        specials_ruless95686Props,
        setspecials_ruless95686Props,
        venues_special_rules_dividerssss44419,
        setvenues_special_rules_dividerssss44419, 
        venues_special_rules_dividerssss44419Props,
        setvenues_special_rules_dividerssss44419Props,
        warningssss_icons55275,
        setwarningssss_icons55275, 
        warningssss_icons55275Props,
        setwarningssss_icons55275Props,
        georsgiass_sosl_texts15f5e,
        setgeorsgiass_sosl_texts15f5e, 
        georsgiass_sosl_texts15f5eProps,
        setgeorsgiass_sosl_texts15f5eProps,
        spesciasls_ruless910f1,
        setspesciasls_ruless910f1, 
        spesciasls_ruless910f1Props,
        setspesciasls_ruless910f1Props,
        debt_info_textb09b8,
        setdebt_info_textb09b8, 
        debt_info_textb09b8Props,
        setdebt_info_textb09b8Props,
        debtor_namef7cac,
        setdebtor_namef7cac, 
        debtor_namef7cacProps,
        setdebtor_namef7cacProps,
        ssn_masked26c46,
        setssn_masked26c46, 
        ssn_masked26c46Props,
        setssn_masked26c46Props,
        dob0f0bf,
        setdob0f0bf, 
        dob0f0bfProps,
        setdob0f0bfProps,
        address22d72,
        setaddress22d72, 
        address22d72Props,
        setaddress22d72Props,
        financial_dtls_text3451f,
        setfinancial_dtls_text3451f, 
        financial_dtls_text3451fProps,
        setfinancial_dtls_text3451fProps,
        charge_off_date13a39,
        setcharge_off_date13a39, 
        charge_off_date13a39Props,
        setcharge_off_date13a39Props,
        last_payment_dateeab2f,
        setlast_payment_dateeab2f, 
        last_payment_dateeab2fProps,
        setlast_payment_dateeab2fProps,
        total_balanceca1e1,
        settotal_balanceca1e1, 
        total_balanceca1e1Props,
        settotal_balanceca1e1Props,
        principal6eb2a,
        setprincipal6eb2a, 
        principal6eb2aProps,
        setprincipal6eb2aProps,
        interesta6b7d,
        setinteresta6b7d, 
        interesta6b7dProps,
        setinteresta6b7dProps,
        feesb456c,
        setfeesb456c, 
        feesb456cProps,
        setfeesb456cProps,
        ven_name_text0c8ba,
        setven_name_text0c8ba, 
        ven_name_text0c8baProps,
        setven_name_text0c8baProps,
        state3010e,
        setstate3010e, 
        state3010eProps,
        setstate3010eProps,
        country1983b,
        setcountry1983b, 
        country1983bProps,
        setcountry1983bProps,
        court_name41a77,
        setcourt_name41a77, 
        court_name41a77Props,
        setcourt_name41a77Props,
        judge_name0a819,
        setjudge_name0a819, 
        judge_name0a819Props,
        setjudge_name0a819Props,
        sol_expiry_dated5486,
        setsol_expiry_dated5486, 
        sol_expiry_dated5486Props,
        setsol_expiry_dated5486Props,
        filing_fee89c7f,
        setfiling_fee89c7f, 
        filing_fee89c7fProps,
        setfiling_fee89c7fProps,
        service_method1b411,
        setservice_method1b411, 
        service_method1b411Props,
        setservice_method1b411Props,
        efiling_system7d508,
        setefiling_system7d508, 
        efiling_system7d508Props,
        setefiling_system7d508Props,
        efiling_required36d60,
        setefiling_required36d60, 
        efiling_required36d60Props,
        setefiling_required36d60Props,
        reeq_doc_text732f8,
        setreeq_doc_text732f8, 
        reeq_doc_text732f8Props,
        setreeq_doc_text732f8Props,
        attachment_id54469,
        setattachment_id54469, 
        attachment_id54469Props,
        setattachment_id54469Props,
        doc_name513db,
        setdoc_name513db, 
        doc_name513dbProps,
        setdoc_name513dbProps,
        trs_created_by736ad,
        settrs_created_by736ad, 
        trs_created_by736adProps,
        settrs_created_by736adProps,
        trs_created_datecfead,
        settrs_created_datecfead, 
        trs_created_datecfeadProps,
        settrs_created_datecfeadProps,
        valid_checklist_text1428a,
        setvalid_checklist_text1428a, 
        valid_checklist_text1428aProps,
        setvalid_checklist_text1428aProps,
        checklist_item_id611e6,
        setchecklist_item_id611e6, 
        checklist_item_id611e6Props,
        setchecklist_item_id611e6Props,
        item_nameafc9a,
        setitem_nameafc9a, 
        item_nameafc9aProps,
        setitem_nameafc9aProps,
        is_completed6ef7a,
        setis_completed6ef7a, 
        is_completed6ef7aProps,
        setis_completed6ef7aProps,
        remarks_textarea15a62,
        setremarks_textarea15a62, 
        remarks_textarea15a62Props,
        setremarks_textarea15a62Props,
        account_id4ecc7,
        setaccount_id4ecc7, 
        account_id4ecc7Props,
        setaccount_id4ecc7Props,
        documentviewer64771,
        setdocumentviewer64771, 
        documentviewer64771Props,
        setdocumentviewer64771Props,
        advancesearch1e502,
        setadvancesearch1e502, 
        advancesearch1e502Props,
        setadvancesearch1e502Props,
        ////// screen states 
          dashboard_v1,
          setdashboard_v1,
          dashboard_v1Props,
          setdashboard_v1Props,
          amrqueuesearch_v1,
          setamrqueuesearch_v1,
          amrqueuesearch_v1Props,
          setamrqueuesearch_v1Props,
          addcase_v1,
          setaddcase_v1,
          addcase_v1Props,
          setaddcase_v1Props,
          viewcase_v1,
          setviewcase_v1,
          viewcase_v1Props,
          setviewcase_v1Props,
          documentviewer_v1,
          setdocumentviewer_v1,
          documentviewer_v1Props,
          setdocumentviewer_v1Props,
          pendingfillingsearch_v1,
          setpendingfillingsearch_v1,
          pendingfillingsearch_v1Props,
          setpendingfillingsearch_v1Props,
        //////////

        ///////// dfd
        dfd_amrqueuedashboard_v1Props,
        setdfd_amrqueuedashboard_v1Props,
        dfd_addcase_v1Props,
        setdfd_addcase_v1Props,
        dfd_doctypenamecombo_v1Props,
        setdfd_doctypenamecombo_v1Props,
        dfd_attorneyscombo_v1Props,
        setdfd_attorneyscombo_v1Props,
        dfd_prioritycombo_v1Props,
        setdfd_prioritycombo_v1Props,
        dfd_statuscombo_v1Props,
        setdfd_statuscombo_v1Props,
        dfd_amrchecklistcombo_v1Props,
        setdfd_amrchecklistcombo_v1Props,
        dfd_doctable_v1Props,
        setdfd_doctable_v1Props,
        dfd_amrcheckliststatus_v1Props,
        setdfd_amrcheckliststatus_v1Props,
        dfd_pendingfilingsdashboard_v1Props,
        setdfd_pendingfilingsdashboard_v1Props,
        dfd_cardsdashboard_v1Props,
        setdfd_cardsdashboard_v1Props,
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