


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  header_groupd8ba9: any 
  setheader_groupd8ba9: React.Dispatch<React.SetStateAction<any>>
  header_groupd8ba9Props: any 
  setheader_groupd8ba9Props: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group1aa03: any 
  setasset_dashboard_group1aa03: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group1aa03Props: any 
  setasset_dashboard_group1aa03Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_group3c082: any 
  setamr_queue_group3c082: React.Dispatch<React.SetStateAction<any>>
  amr_queue_group3c082Props: any 
  setamr_queue_group3c082Props: React.Dispatch<React.SetStateAction<any>>
  pending_file_group2128c: any 
  setpending_file_group2128c: React.Dispatch<React.SetStateAction<any>>
  pending_file_group2128cProps: any 
  setpending_file_group2128cProps: React.Dispatch<React.SetStateAction<any>>
  service_pending_group8c0ca: any 
  setservice_pending_group8c0ca: React.Dispatch<React.SetStateAction<any>>
  service_pending_group8c0caProps: any 
  setservice_pending_group8c0caProps: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_group1f8c0: any 
  setslas_at_risk_group1f8c0: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_group1f8c0Props: any 
  setslas_at_risk_group1f8c0Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_groupdf57a: any 
  setcourt_rejection_groupdf57a: React.Dispatch<React.SetStateAction<any>>
  court_rejection_groupdf57aProps: any 
  setcourt_rejection_groupdf57aProps: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_group0f074: any 
  setcollected_mtd_group0f074: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_group0f074Props: any 
  setcollected_mtd_group0f074Props: React.Dispatch<React.SetStateAction<any>>
  overall_key_performance_indicatorsc2711: any 
  setoverall_key_performance_indicatorsc2711: React.Dispatch<React.SetStateAction<any>>
  overall_key_performance_indicatorsc2711Props: any 
  setoverall_key_performance_indicatorsc2711Props: React.Dispatch<React.SetStateAction<any>>
  key_performance_indicator_groupf9eaf: any 
  setkey_performance_indicator_groupf9eaf: React.Dispatch<React.SetStateAction<any>>
  key_performance_indicator_groupf9eafProps: any 
  setkey_performance_indicator_groupf9eafProps: React.Dispatch<React.SetStateAction<any>>
  recent_activity_group91db6: any 
  setrecent_activity_group91db6: React.Dispatch<React.SetStateAction<any>>
  recent_activity_group91db6Props: any 
  setrecent_activity_group91db6Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_group79589: any 
  setamr_queue_group79589: React.Dispatch<React.SetStateAction<any>>
  amr_queue_group79589Props: any 
  setamr_queue_group79589Props: React.Dispatch<React.SetStateAction<any>>
  amr_group17ac4: any 
  setamr_group17ac4: React.Dispatch<React.SetStateAction<any>>
  amr_group17ac4Props: any 
  setamr_group17ac4Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_table09598: any 
  setamr_queue_table09598: React.Dispatch<React.SetStateAction<any>>
  amr_queue_table09598Props: any 
  setamr_queue_table09598Props: React.Dispatch<React.SetStateAction<any>>
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
  add_case_groupbe1de: any 
  setadd_case_groupbe1de: React.Dispatch<React.SetStateAction<any>>
  add_case_groupbe1deProps: any 
  setadd_case_groupbe1deProps: React.Dispatch<React.SetStateAction<any>>
  header_groupc587e: any 
  setheader_groupc587e: React.Dispatch<React.SetStateAction<any>>
  header_groupc587eProps: any 
  setheader_groupc587eProps: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group6f022: any 
  setrequired_dociument_main_group6f022: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group6f022Props: any 
  setrequired_dociument_main_group6f022Props: React.Dispatch<React.SetStateAction<any>>
  doc_table8bfa1: any 
  setdoc_table8bfa1: React.Dispatch<React.SetStateAction<any>>
  doc_table8bfa1Props: any 
  setdoc_table8bfa1Props: React.Dispatch<React.SetStateAction<any>>
  case_information_groupe3c1b: any 
  setcase_information_groupe3c1b: React.Dispatch<React.SetStateAction<any>>
  case_information_groupe3c1bProps: any 
  setcase_information_groupe3c1bProps: React.Dispatch<React.SetStateAction<any>>
  card_group7fa83: any 
  setcard_group7fa83: React.Dispatch<React.SetStateAction<any>>
  card_group7fa83Props: any 
  setcard_group7fa83Props: React.Dispatch<React.SetStateAction<any>>
  principal_groupde6dd: any 
  setprincipal_groupde6dd: React.Dispatch<React.SetStateAction<any>>
  principal_groupde6ddProps: any 
  setprincipal_groupde6ddProps: React.Dispatch<React.SetStateAction<any>>
  intrest_group44b4d: any 
  setintrest_group44b4d: React.Dispatch<React.SetStateAction<any>>
  intrest_group44b4dProps: any 
  setintrest_group44b4dProps: React.Dispatch<React.SetStateAction<any>>
  fees_groupee523: any 
  setfees_groupee523: React.Dispatch<React.SetStateAction<any>>
  fees_groupee523Props: any 
  setfees_groupee523Props: React.Dispatch<React.SetStateAction<any>>
  total_groupd3e06: any 
  settotal_groupd3e06: React.Dispatch<React.SetStateAction<any>>
  total_groupd3e06Props: any 
  settotal_groupd3e06Props: React.Dispatch<React.SetStateAction<any>>
  venue_details_group1d734: any 
  setvenue_details_group1d734: React.Dispatch<React.SetStateAction<any>>
  venue_details_group1d734Props: any 
  setvenue_details_group1d734Props: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group32240: any 
  setchecklist_main_group32240: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group32240Props: any 
  setchecklist_main_group32240Props: React.Dispatch<React.SetStateAction<any>>
  checklist_tablee7dea: any 
  setchecklist_tablee7dea: React.Dispatch<React.SetStateAction<any>>
  checklist_tablee7deaProps: any 
  setchecklist_tablee7deaProps: React.Dispatch<React.SetStateAction<any>>
  special_rules_groupf22ab: any 
  setspecial_rules_groupf22ab: React.Dispatch<React.SetStateAction<any>>
  special_rules_groupf22abProps: any 
  setspecial_rules_groupf22abProps: React.Dispatch<React.SetStateAction<any>>
  special_rules96aec: any 
  setspecial_rules96aec: React.Dispatch<React.SetStateAction<any>>
  special_rules96aecProps: any 
  setspecial_rules96aecProps: React.Dispatch<React.SetStateAction<any>>
  document_viewer_groupe4249: any 
  setdocument_viewer_groupe4249: React.Dispatch<React.SetStateAction<any>>
  document_viewer_groupe4249Props: any 
  setdocument_viewer_groupe4249Props: React.Dispatch<React.SetStateAction<any>>
  add_case_grouped126: any 
  setadd_case_grouped126: React.Dispatch<React.SetStateAction<any>>
  add_case_grouped126Props: any 
  setadd_case_grouped126Props: React.Dispatch<React.SetStateAction<any>>
  header_groupbd8a8: any 
  setheader_groupbd8a8: React.Dispatch<React.SetStateAction<any>>
  header_groupbd8a8Props: any 
  setheader_groupbd8a8Props: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group255d1: any 
  setrequired_dociument_main_group255d1: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group255d1Props: any 
  setrequired_dociument_main_group255d1Props: React.Dispatch<React.SetStateAction<any>>
  doc_table9c4f7: any 
  setdoc_table9c4f7: React.Dispatch<React.SetStateAction<any>>
  doc_table9c4f7Props: any 
  setdoc_table9c4f7Props: React.Dispatch<React.SetStateAction<any>>
  case_information_group48f3c: any 
  setcase_information_group48f3c: React.Dispatch<React.SetStateAction<any>>
  case_information_group48f3cProps: any 
  setcase_information_group48f3cProps: React.Dispatch<React.SetStateAction<any>>
  card_group4c709: any 
  setcard_group4c709: React.Dispatch<React.SetStateAction<any>>
  card_group4c709Props: any 
  setcard_group4c709Props: React.Dispatch<React.SetStateAction<any>>
  principal_group42235: any 
  setprincipal_group42235: React.Dispatch<React.SetStateAction<any>>
  principal_group42235Props: any 
  setprincipal_group42235Props: React.Dispatch<React.SetStateAction<any>>
  intrest_group65c3b: any 
  setintrest_group65c3b: React.Dispatch<React.SetStateAction<any>>
  intrest_group65c3bProps: any 
  setintrest_group65c3bProps: React.Dispatch<React.SetStateAction<any>>
  fees_group8c4a6: any 
  setfees_group8c4a6: React.Dispatch<React.SetStateAction<any>>
  fees_group8c4a6Props: any 
  setfees_group8c4a6Props: React.Dispatch<React.SetStateAction<any>>
  total_groupc52d3: any 
  settotal_groupc52d3: React.Dispatch<React.SetStateAction<any>>
  total_groupc52d3Props: any 
  settotal_groupc52d3Props: React.Dispatch<React.SetStateAction<any>>
  venue_details_group51614: any 
  setvenue_details_group51614: React.Dispatch<React.SetStateAction<any>>
  venue_details_group51614Props: any 
  setvenue_details_group51614Props: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group2b466: any 
  setchecklist_main_group2b466: React.Dispatch<React.SetStateAction<any>>
  checklist_main_group2b466Props: any 
  setchecklist_main_group2b466Props: React.Dispatch<React.SetStateAction<any>>
  checklist_tablecafb0: any 
  setchecklist_tablecafb0: React.Dispatch<React.SetStateAction<any>>
  checklist_tablecafb0Props: any 
  setchecklist_tablecafb0Props: React.Dispatch<React.SetStateAction<any>>
  special_rules_group7ce9f: any 
  setspecial_rules_group7ce9f: React.Dispatch<React.SetStateAction<any>>
  special_rules_group7ce9fProps: any 
  setspecial_rules_group7ce9fProps: React.Dispatch<React.SetStateAction<any>>
  special_rules7f109: any 
  setspecial_rules7f109: React.Dispatch<React.SetStateAction<any>>
  special_rules7f109Props: any 
  setspecial_rules7f109Props: React.Dispatch<React.SetStateAction<any>>
  add_case_group77747: any 
  setadd_case_group77747: React.Dispatch<React.SetStateAction<any>>
  add_case_group77747Props: any 
  setadd_case_group77747Props: React.Dispatch<React.SetStateAction<any>>
  header_groupbae8a: any 
  setheader_groupbae8a: React.Dispatch<React.SetStateAction<any>>
  header_groupbae8aProps: any 
  setheader_groupbae8aProps: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group999a8: any 
  setrequired_dociument_main_group999a8: React.Dispatch<React.SetStateAction<any>>
  required_dociument_main_group999a8Props: any 
  setrequired_dociument_main_group999a8Props: React.Dispatch<React.SetStateAction<any>>
  doc_table45b8d: any 
  setdoc_table45b8d: React.Dispatch<React.SetStateAction<any>>
  doc_table45b8dProps: any 
  setdoc_table45b8dProps: React.Dispatch<React.SetStateAction<any>>
  case_information_group35ed3: any 
  setcase_information_group35ed3: React.Dispatch<React.SetStateAction<any>>
  case_information_group35ed3Props: any 
  setcase_information_group35ed3Props: React.Dispatch<React.SetStateAction<any>>
  card_groupe78fa: any 
  setcard_groupe78fa: React.Dispatch<React.SetStateAction<any>>
  card_groupe78faProps: any 
  setcard_groupe78faProps: React.Dispatch<React.SetStateAction<any>>
  principal_group9ae9f: any 
  setprincipal_group9ae9f: React.Dispatch<React.SetStateAction<any>>
  principal_group9ae9fProps: any 
  setprincipal_group9ae9fProps: React.Dispatch<React.SetStateAction<any>>
  intrest_group8df75: any 
  setintrest_group8df75: React.Dispatch<React.SetStateAction<any>>
  intrest_group8df75Props: any 
  setintrest_group8df75Props: React.Dispatch<React.SetStateAction<any>>
  fees_groupac23b: any 
  setfees_groupac23b: React.Dispatch<React.SetStateAction<any>>
  fees_groupac23bProps: any 
  setfees_groupac23bProps: React.Dispatch<React.SetStateAction<any>>
  total_groupe6175: any 
  settotal_groupe6175: React.Dispatch<React.SetStateAction<any>>
  total_groupe6175Props: any 
  settotal_groupe6175Props: React.Dispatch<React.SetStateAction<any>>
  venue_details_group6904e: any 
  setvenue_details_group6904e: React.Dispatch<React.SetStateAction<any>>
  venue_details_group6904eProps: any 
  setvenue_details_group6904eProps: React.Dispatch<React.SetStateAction<any>>
  checklist_main_groupda0ff: any 
  setchecklist_main_groupda0ff: React.Dispatch<React.SetStateAction<any>>
  checklist_main_groupda0ffProps: any 
  setchecklist_main_groupda0ffProps: React.Dispatch<React.SetStateAction<any>>
  checklist_table0e25b: any 
  setchecklist_table0e25b: React.Dispatch<React.SetStateAction<any>>
  checklist_table0e25bProps: any 
  setchecklist_table0e25bProps: React.Dispatch<React.SetStateAction<any>>
  special_rules_groupc1585: any 
  setspecial_rules_groupc1585: React.Dispatch<React.SetStateAction<any>>
  special_rules_groupc1585Props: any 
  setspecial_rules_groupc1585Props: React.Dispatch<React.SetStateAction<any>>
  special_rules1fc30: any 
  setspecial_rules1fc30: React.Dispatch<React.SetStateAction<any>>
  special_rules1fc30Props: any 
  setspecial_rules1fc30Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactions37e34: any 
  setdynamicactions37e34: React.Dispatch<React.SetStateAction<any>>
  dynamicactions37e34Props: any 
  setdynamicactions37e34Props: React.Dispatch<React.SetStateAction<any>>
  group_report8ef47: any 
  setgroup_report8ef47: React.Dispatch<React.SetStateAction<any>>
  group_report8ef47Props: any 
  setgroup_report8ef47Props: React.Dispatch<React.SetStateAction<any>>
  lap_test_screen_group38f1e: any 
  setlap_test_screen_group38f1e: React.Dispatch<React.SetStateAction<any>>
  lap_test_screen_group38f1eProps: any 
  setlap_test_screen_group38f1eProps: React.Dispatch<React.SetStateAction<any>>
  text5e6b2: any,
  settext5e6b2:React.Dispatch<React.SetStateAction<any>>
  text5e6b2Props: any 
  settext5e6b2Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_text17149: any,
  setamr_queue_text17149:React.Dispatch<React.SetStateAction<any>>
  amr_queue_text17149Props: any 
  setamr_queue_text17149Props: React.Dispatch<React.SetStateAction<any>>
  icon_total_assest42cc7: any,
  seticon_total_assest42cc7:React.Dispatch<React.SetStateAction<any>>
  icon_total_assest42cc7Props: any 
  seticon_total_assest42cc7Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue0e5a7: any,
  setamr_queue0e5a7:React.Dispatch<React.SetStateAction<any>>
  amr_queue0e5a7Props: any 
  setamr_queue0e5a7Props: React.Dispatch<React.SetStateAction<any>>
  amr_queue_desc10020: any,
  setamr_queue_desc10020:React.Dispatch<React.SetStateAction<any>>
  amr_queue_desc10020Props: any 
  setamr_queue_desc10020Props: React.Dispatch<React.SetStateAction<any>>
  pending_file_text61240: any,
  setpending_file_text61240:React.Dispatch<React.SetStateAction<any>>
  pending_file_text61240Props: any 
  setpending_file_text61240Props: React.Dispatch<React.SetStateAction<any>>
  icon_maintenance_dueb2661: any,
  seticon_maintenance_dueb2661:React.Dispatch<React.SetStateAction<any>>
  icon_maintenance_dueb2661Props: any 
  seticon_maintenance_dueb2661Props: React.Dispatch<React.SetStateAction<any>>
  pending_filea7d91: any,
  setpending_filea7d91:React.Dispatch<React.SetStateAction<any>>
  pending_filea7d91Props: any 
  setpending_filea7d91Props: React.Dispatch<React.SetStateAction<any>>
  pending_file_desca182c: any,
  setpending_file_desca182c:React.Dispatch<React.SetStateAction<any>>
  pending_file_desca182cProps: any 
  setpending_file_desca182cProps: React.Dispatch<React.SetStateAction<any>>
  service_pending_textb9d5c: any,
  setservice_pending_textb9d5c:React.Dispatch<React.SetStateAction<any>>
  service_pending_textb9d5cProps: any 
  setservice_pending_textb9d5cProps: React.Dispatch<React.SetStateAction<any>>
  icon_warranty_expiringa065e: any,
  seticon_warranty_expiringa065e:React.Dispatch<React.SetStateAction<any>>
  icon_warranty_expiringa065eProps: any 
  seticon_warranty_expiringa065eProps: React.Dispatch<React.SetStateAction<any>>
  service_pending0898e: any,
  setservice_pending0898e:React.Dispatch<React.SetStateAction<any>>
  service_pending0898eProps: any 
  setservice_pending0898eProps: React.Dispatch<React.SetStateAction<any>>
  service_pending_desc91c8a: any,
  setservice_pending_desc91c8a:React.Dispatch<React.SetStateAction<any>>
  service_pending_desc91c8aProps: any 
  setservice_pending_desc91c8aProps: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_text42bdc: any,
  setslas_at_risk_text42bdc:React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_text42bdcProps: any 
  setslas_at_risk_text42bdcProps: React.Dispatch<React.SetStateAction<any>>
  icon_eaa1e: any,
  seticon_eaa1e:React.Dispatch<React.SetStateAction<any>>
  icon_eaa1eProps: any 
  seticon_eaa1eProps: React.Dispatch<React.SetStateAction<any>>
  slas_at_riska3022: any,
  setslas_at_riska3022:React.Dispatch<React.SetStateAction<any>>
  slas_at_riska3022Props: any 
  setslas_at_riska3022Props: React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_desc57375: any,
  setslas_at_risk_desc57375:React.Dispatch<React.SetStateAction<any>>
  slas_at_risk_desc57375Props: any 
  setslas_at_risk_desc57375Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_textc9a86: any,
  setcourt_rejection_textc9a86:React.Dispatch<React.SetStateAction<any>>
  court_rejection_textc9a86Props: any 
  setcourt_rejection_textc9a86Props: React.Dispatch<React.SetStateAction<any>>
  icon87359: any,
  seticon87359:React.Dispatch<React.SetStateAction<any>>
  icon87359Props: any 
  seticon87359Props: React.Dispatch<React.SetStateAction<any>>
  court_rejectionff779: any,
  setcourt_rejectionff779:React.Dispatch<React.SetStateAction<any>>
  court_rejectionff779Props: any 
  setcourt_rejectionff779Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_desc6f72f: any,
  setcourt_rejection_desc6f72f:React.Dispatch<React.SetStateAction<any>>
  court_rejection_desc6f72fProps: any 
  setcourt_rejection_desc6f72fProps: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_textf5ff3: any,
  setcollected_mtd_textf5ff3:React.Dispatch<React.SetStateAction<any>>
  collected_mtd_textf5ff3Props: any 
  setcollected_mtd_textf5ff3Props: React.Dispatch<React.SetStateAction<any>>
  iconb9347: any,
  seticonb9347:React.Dispatch<React.SetStateAction<any>>
  iconb9347Props: any 
  seticonb9347Props: React.Dispatch<React.SetStateAction<any>>
  collected_mtd65ae0: any,
  setcollected_mtd65ae0:React.Dispatch<React.SetStateAction<any>>
  collected_mtd65ae0Props: any 
  setcollected_mtd65ae0Props: React.Dispatch<React.SetStateAction<any>>
  collected_mtd_desc21bcb: any,
  setcollected_mtd_desc21bcb:React.Dispatch<React.SetStateAction<any>>
  collected_mtd_desc21bcbProps: any 
  setcollected_mtd_desc21bcbProps: React.Dispatch<React.SetStateAction<any>>
  key_performance_indicators_text4f6db: any,
  setkey_performance_indicators_text4f6db:React.Dispatch<React.SetStateAction<any>>
  key_performance_indicators_text4f6dbProps: any 
  setkey_performance_indicators_text4f6dbProps: React.Dispatch<React.SetStateAction<any>>
  total_active_accounts_texted4d7: any,
  settotal_active_accounts_texted4d7:React.Dispatch<React.SetStateAction<any>>
  total_active_accounts_texted4d7Props: any 
  settotal_active_accounts_texted4d7Props: React.Dispatch<React.SetStateAction<any>>
  total_active_accounts_text1b45d0: any,
  settotal_active_accounts_text1b45d0:React.Dispatch<React.SetStateAction<any>>
  total_active_accounts_text1b45d0Props: any 
  settotal_active_accounts_text1b45d0Props: React.Dispatch<React.SetStateAction<any>>
  divider13ca73: any,
  setdivider13ca73:React.Dispatch<React.SetStateAction<any>>
  divider13ca73Props: any 
  setdivider13ca73Props: React.Dispatch<React.SetStateAction<any>>
  avg_days_to_judgment_text82b69: any,
  setavg_days_to_judgment_text82b69:React.Dispatch<React.SetStateAction<any>>
  avg_days_to_judgment_text82b69Props: any 
  setavg_days_to_judgment_text82b69Props: React.Dispatch<React.SetStateAction<any>>
  avg_days_to_judgment_text14ed01: any,
  setavg_days_to_judgment_text14ed01:React.Dispatch<React.SetStateAction<any>>
  avg_days_to_judgment_text14ed01Props: any 
  setavg_days_to_judgment_text14ed01Props: React.Dispatch<React.SetStateAction<any>>
  divider214543: any,
  setdivider214543:React.Dispatch<React.SetStateAction<any>>
  divider214543Props: any 
  setdivider214543Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_rate_text86ac0: any,
  setcourt_rejection_rate_text86ac0:React.Dispatch<React.SetStateAction<any>>
  court_rejection_rate_text86ac0Props: any 
  setcourt_rejection_rate_text86ac0Props: React.Dispatch<React.SetStateAction<any>>
  court_rejection_rate_text10b69f: any,
  setcourt_rejection_rate_text10b69f:React.Dispatch<React.SetStateAction<any>>
  court_rejection_rate_text10b69fProps: any 
  setcourt_rejection_rate_text10b69fProps: React.Dispatch<React.SetStateAction<any>>
  divider39db36: any,
  setdivider39db36:React.Dispatch<React.SetStateAction<any>>
  divider39db36Props: any 
  setdivider39db36Props: React.Dispatch<React.SetStateAction<any>>
  compliance_score_textbf682: any,
  setcompliance_score_textbf682:React.Dispatch<React.SetStateAction<any>>
  compliance_score_textbf682Props: any 
  setcompliance_score_textbf682Props: React.Dispatch<React.SetStateAction<any>>
  compliance_score_text1f41e4: any,
  setcompliance_score_text1f41e4:React.Dispatch<React.SetStateAction<any>>
  compliance_score_text1f41e4Props: any 
  setcompliance_score_text1f41e4Props: React.Dispatch<React.SetStateAction<any>>
  divider432793: any,
  setdivider432793:React.Dispatch<React.SetStateAction<any>>
  divider432793Props: any 
  setdivider432793Props: React.Dispatch<React.SetStateAction<any>>
  collection_rate_mtd_text335f5: any,
  setcollection_rate_mtd_text335f5:React.Dispatch<React.SetStateAction<any>>
  collection_rate_mtd_text335f5Props: any 
  setcollection_rate_mtd_text335f5Props: React.Dispatch<React.SetStateAction<any>>
  collection_rate_mtd_text16258d: any,
  setcollection_rate_mtd_text16258d:React.Dispatch<React.SetStateAction<any>>
  collection_rate_mtd_text16258dProps: any 
  setcollection_rate_mtd_text16258dProps: React.Dispatch<React.SetStateAction<any>>
  recent_activity_text25b7b: any,
  setrecent_activity_text25b7b:React.Dispatch<React.SetStateAction<any>>
  recent_activity_text25b7bProps: any 
  setrecent_activity_text25b7bProps: React.Dispatch<React.SetStateAction<any>>
  amr_queued_textb4f27: any,
  setamr_queued_textb4f27:React.Dispatch<React.SetStateAction<any>>
  amr_queued_textb4f27Props: any 
  setamr_queued_textb4f27Props: React.Dispatch<React.SetStateAction<any>>
  amr_queued_text_1dc178: any,
  setamr_queued_text_1dc178:React.Dispatch<React.SetStateAction<any>>
  amr_queued_text_1dc178Props: any 
  setamr_queued_text_1dc178Props: React.Dispatch<React.SetStateAction<any>>
  divider1cb266: any,
  setdivider1cb266:React.Dispatch<React.SetStateAction<any>>
  divider1cb266Props: any 
  setdivider1cb266Props: React.Dispatch<React.SetStateAction<any>>
  judgment_entered_text2f3e7: any,
  setjudgment_entered_text2f3e7:React.Dispatch<React.SetStateAction<any>>
  judgment_entered_text2f3e7Props: any 
  setjudgment_entered_text2f3e7Props: React.Dispatch<React.SetStateAction<any>>
  judgment_entered_text_1d4af4: any,
  setjudgment_entered_text_1d4af4:React.Dispatch<React.SetStateAction<any>>
  judgment_entered_text_1d4af4Props: any 
  setjudgment_entered_text_1d4af4Props: React.Dispatch<React.SetStateAction<any>>
  divider2269d0: any,
  setdivider2269d0:React.Dispatch<React.SetStateAction<any>>
  divider2269d0Props: any 
  setdivider2269d0Props: React.Dispatch<React.SetStateAction<any>>
  service_completed_text835e5: any,
  setservice_completed_text835e5:React.Dispatch<React.SetStateAction<any>>
  service_completed_text835e5Props: any 
  setservice_completed_text835e5Props: React.Dispatch<React.SetStateAction<any>>
  service_completed_text_197211: any,
  setservice_completed_text_197211:React.Dispatch<React.SetStateAction<any>>
  service_completed_text_197211Props: any 
  setservice_completed_text_197211Props: React.Dispatch<React.SetStateAction<any>>
  divider3acb72: any,
  setdivider3acb72:React.Dispatch<React.SetStateAction<any>>
  divider3acb72Props: any 
  setdivider3acb72Props: React.Dispatch<React.SetStateAction<any>>
  amr_passed_text144d2: any,
  setamr_passed_text144d2:React.Dispatch<React.SetStateAction<any>>
  amr_passed_text144d2Props: any 
  setamr_passed_text144d2Props: React.Dispatch<React.SetStateAction<any>>
  amr_passed_text188d24: any,
  setamr_passed_text188d24:React.Dispatch<React.SetStateAction<any>>
  amr_passed_text188d24Props: any 
  setamr_passed_text188d24Props: React.Dispatch<React.SetStateAction<any>>
  divider4ffc0d: any,
  setdivider4ffc0d:React.Dispatch<React.SetStateAction<any>>
  divider4ffc0dProps: any 
  setdivider4ffc0dProps: React.Dispatch<React.SetStateAction<any>>
  court_rejection_texte1e9c: any,
  setcourt_rejection_texte1e9c:React.Dispatch<React.SetStateAction<any>>
  court_rejection_texte1e9cProps: any 
  setcourt_rejection_texte1e9cProps: React.Dispatch<React.SetStateAction<any>>
  court_rejection_text16e38f: any,
  setcourt_rejection_text16e38f:React.Dispatch<React.SetStateAction<any>>
  court_rejection_text16e38fProps: any 
  setcourt_rejection_text16e38fProps: React.Dispatch<React.SetStateAction<any>>
  divider52864b: any,
  setdivider52864b:React.Dispatch<React.SetStateAction<any>>
  divider52864bProps: any 
  setdivider52864bProps: React.Dispatch<React.SetStateAction<any>>
  service_assigned_textb2d7d: any,
  setservice_assigned_textb2d7d:React.Dispatch<React.SetStateAction<any>>
  service_assigned_textb2d7dProps: any 
  setservice_assigned_textb2d7dProps: React.Dispatch<React.SetStateAction<any>>
  service_assigned_text15a8e1: any,
  setservice_assigned_text15a8e1:React.Dispatch<React.SetStateAction<any>>
  service_assigned_text15a8e1Props: any 
  setservice_assigned_text15a8e1Props: React.Dispatch<React.SetStateAction<any>>
  divider6aaa01: any,
  setdivider6aaa01:React.Dispatch<React.SetStateAction<any>>
  divider6aaa01Props: any 
  setdivider6aaa01Props: React.Dispatch<React.SetStateAction<any>>
  amr_rejected_text92e50: any,
  setamr_rejected_text92e50:React.Dispatch<React.SetStateAction<any>>
  amr_rejected_text92e50Props: any 
  setamr_rejected_text92e50Props: React.Dispatch<React.SetStateAction<any>>
  amr_rejected_text11a51a: any,
  setamr_rejected_text11a51a:React.Dispatch<React.SetStateAction<any>>
  amr_rejected_text11a51aProps: any 
  setamr_rejected_text11a51aProps: React.Dispatch<React.SetStateAction<any>>
  back_btn83b00: any,
  setback_btn83b00:React.Dispatch<React.SetStateAction<any>>
  back_btn83b00Props: any 
  setback_btn83b00Props: React.Dispatch<React.SetStateAction<any>>
  amr_textcc6d3: any,
  setamr_textcc6d3:React.Dispatch<React.SetStateAction<any>>
  amr_textcc6d3Props: any 
  setamr_textcc6d3Props: React.Dispatch<React.SetStateAction<any>>
  bt_searchc8991: any,
  setbt_searchc8991:React.Dispatch<React.SetStateAction<any>>
  bt_searchc8991Props: any 
  setbt_searchc8991Props: React.Dispatch<React.SetStateAction<any>>
  new_case_button34af2: any,
  setnew_case_button34af2:React.Dispatch<React.SetStateAction<any>>
  new_case_button34af2Props: any 
  setnew_case_button34af2Props: React.Dispatch<React.SetStateAction<any>>
  account_id9a546: any,
  setaccount_id9a546:React.Dispatch<React.SetStateAction<any>>
  account_id9a546Props: any 
  setaccount_id9a546Props: React.Dispatch<React.SetStateAction<any>>
  case_id734ed: any,
  setcase_id734ed:React.Dispatch<React.SetStateAction<any>>
  case_id734edProps: any 
  setcase_id734edProps: React.Dispatch<React.SetStateAction<any>>
  debtor_nameb1ea9: any,
  setdebtor_nameb1ea9:React.Dispatch<React.SetStateAction<any>>
  debtor_nameb1ea9Props: any 
  setdebtor_nameb1ea9Props: React.Dispatch<React.SetStateAction<any>>
  creditor_namee48d1: any,
  setcreditor_namee48d1:React.Dispatch<React.SetStateAction<any>>
  creditor_namee48d1Props: any 
  setcreditor_namee48d1Props: React.Dispatch<React.SetStateAction<any>>
  full_name7a369: any,
  setfull_name7a369:React.Dispatch<React.SetStateAction<any>>
  full_name7a369Props: any 
  setfull_name7a369Props: React.Dispatch<React.SetStateAction<any>>
  total_balance6a331: any,
  settotal_balance6a331:React.Dispatch<React.SetStateAction<any>>
  total_balance6a331Props: any 
  settotal_balance6a331Props: React.Dispatch<React.SetStateAction<any>>
  court_name5ae4f: any,
  setcourt_name5ae4f:React.Dispatch<React.SetStateAction<any>>
  court_name5ae4fProps: any 
  setcourt_name5ae4fProps: React.Dispatch<React.SetStateAction<any>>
  priority_name6740a: any,
  setpriority_name6740a:React.Dispatch<React.SetStateAction<any>>
  priority_name6740aProps: any 
  setpriority_name6740aProps: React.Dispatch<React.SetStateAction<any>>
  status_name86d6c: any,
  setstatus_name86d6c:React.Dispatch<React.SetStateAction<any>>
  status_name86d6cProps: any 
  setstatus_name86d6cProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date92fe2: any,
  settrs_created_date92fe2:React.Dispatch<React.SetStateAction<any>>
  trs_created_date92fe2Props: any 
  settrs_created_date92fe2Props: React.Dispatch<React.SetStateAction<any>>
  venue_idb51d8: any,
  setvenue_idb51d8:React.Dispatch<React.SetStateAction<any>>
  venue_idb51d8Props: any 
  setvenue_idb51d8Props: React.Dispatch<React.SetStateAction<any>>
  view_btnbd9a5: any,
  setview_btnbd9a5:React.Dispatch<React.SetStateAction<any>>
  view_btnbd9a5Props: any 
  setview_btnbd9a5Props: React.Dispatch<React.SetStateAction<any>>
  edit_btn10d01: any,
  setedit_btn10d01:React.Dispatch<React.SetStateAction<any>>
  edit_btn10d01Props: any 
  setedit_btn10d01Props: React.Dispatch<React.SetStateAction<any>>
  view_btn_pg_graph1baad: any,
  setview_btn_pg_graph1baad:React.Dispatch<React.SetStateAction<any>>
  view_btn_pg_graph1baadProps: any 
  setview_btn_pg_graph1baadProps: React.Dispatch<React.SetStateAction<any>>
  bt_approveec5db: any,
  setbt_approveec5db:React.Dispatch<React.SetStateAction<any>>
  bt_approveec5dbProps: any 
  setbt_approveec5dbProps: React.Dispatch<React.SetStateAction<any>>
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
  button_back1a912: any,
  setbutton_back1a912:React.Dispatch<React.SetStateAction<any>>
  button_back1a912Props: any 
  setbutton_back1a912Props: React.Dispatch<React.SetStateAction<any>>
  craete_header_texte958c: any,
  setcraete_header_texte958c:React.Dispatch<React.SetStateAction<any>>
  craete_header_texte958cProps: any 
  setcraete_header_texte958cProps: React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text78b91: any,
  setreeq_doc_text78b91:React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text78b91Props: any 
  setreeq_doc_text78b91Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id394f7: any,
  setattachment_id394f7:React.Dispatch<React.SetStateAction<any>>
  attachment_id394f7Props: any 
  setattachment_id394f7Props: React.Dispatch<React.SetStateAction<any>>
  doc_namef31ac: any,
  setdoc_namef31ac:React.Dispatch<React.SetStateAction<any>>
  doc_namef31acProps: any 
  setdoc_namef31acProps: React.Dispatch<React.SetStateAction<any>>
  view_button04be7: any,
  setview_button04be7:React.Dispatch<React.SetStateAction<any>>
  view_button04be7Props: any 
  setview_button04be7Props: React.Dispatch<React.SetStateAction<any>>
  case_info_textd4267: any,
  setcase_info_textd4267:React.Dispatch<React.SetStateAction<any>>
  case_info_textd4267Props: any 
  setcase_info_textd4267Props: React.Dispatch<React.SetStateAction<any>>
  debtor_name83b58: any,
  setdebtor_name83b58:React.Dispatch<React.SetStateAction<any>>
  debtor_name83b58Props: any 
  setdebtor_name83b58Props: React.Dispatch<React.SetStateAction<any>>
  case_display_idb53b9: any,
  setcase_display_idb53b9:React.Dispatch<React.SetStateAction<any>>
  case_display_idb53b9Props: any 
  setcase_display_idb53b9Props: React.Dispatch<React.SetStateAction<any>>
  ssn_masked24ce0: any,
  setssn_masked24ce0:React.Dispatch<React.SetStateAction<any>>
  ssn_masked24ce0Props: any 
  setssn_masked24ce0Props: React.Dispatch<React.SetStateAction<any>>
  dobea900: any,
  setdobea900:React.Dispatch<React.SetStateAction<any>>
  dobea900Props: any 
  setdobea900Props: React.Dispatch<React.SetStateAction<any>>
  address4e81d: any,
  setaddress4e81d:React.Dispatch<React.SetStateAction<any>>
  address4e81dProps: any 
  setaddress4e81dProps: React.Dispatch<React.SetStateAction<any>>
  creditor_name62479: any,
  setcreditor_name62479:React.Dispatch<React.SetStateAction<any>>
  creditor_name62479Props: any 
  setcreditor_name62479Props: React.Dispatch<React.SetStateAction<any>>
  charge_off_dated3231: any,
  setcharge_off_dated3231:React.Dispatch<React.SetStateAction<any>>
  charge_off_dated3231Props: any 
  setcharge_off_dated3231Props: React.Dispatch<React.SetStateAction<any>>
  last_payment_date500eb: any,
  setlast_payment_date500eb:React.Dispatch<React.SetStateAction<any>>
  last_payment_date500ebProps: any 
  setlast_payment_date500ebProps: React.Dispatch<React.SetStateAction<any>>
  divider772d9: any,
  setdivider772d9:React.Dispatch<React.SetStateAction<any>>
  divider772d9Props: any 
  setdivider772d9Props: React.Dispatch<React.SetStateAction<any>>
  principal_text73a3d: any,
  setprincipal_text73a3d:React.Dispatch<React.SetStateAction<any>>
  principal_text73a3dProps: any 
  setprincipal_text73a3dProps: React.Dispatch<React.SetStateAction<any>>
  principald89b4: any,
  setprincipald89b4:React.Dispatch<React.SetStateAction<any>>
  principald89b4Props: any 
  setprincipald89b4Props: React.Dispatch<React.SetStateAction<any>>
  intrest_text58114: any,
  setintrest_text58114:React.Dispatch<React.SetStateAction<any>>
  intrest_text58114Props: any 
  setintrest_text58114Props: React.Dispatch<React.SetStateAction<any>>
  interest42832: any,
  setinterest42832:React.Dispatch<React.SetStateAction<any>>
  interest42832Props: any 
  setinterest42832Props: React.Dispatch<React.SetStateAction<any>>
  fees_text67815: any,
  setfees_text67815:React.Dispatch<React.SetStateAction<any>>
  fees_text67815Props: any 
  setfees_text67815Props: React.Dispatch<React.SetStateAction<any>>
  fees9a14f: any,
  setfees9a14f:React.Dispatch<React.SetStateAction<any>>
  fees9a14fProps: any 
  setfees9a14fProps: React.Dispatch<React.SetStateAction<any>>
  total_balance_texted1be: any,
  settotal_balance_texted1be:React.Dispatch<React.SetStateAction<any>>
  total_balance_texted1beProps: any 
  settotal_balance_texted1beProps: React.Dispatch<React.SetStateAction<any>>
  total_balancee5904: any,
  settotal_balancee5904:React.Dispatch<React.SetStateAction<any>>
  total_balancee5904Props: any 
  settotal_balancee5904Props: React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date69782: any,
  setsol_expiry_date69782:React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date69782Props: any 
  setsol_expiry_date69782Props: React.Dispatch<React.SetStateAction<any>>
  ven_name_textdfed0: any,
  setven_name_textdfed0:React.Dispatch<React.SetStateAction<any>>
  ven_name_textdfed0Props: any 
  setven_name_textdfed0Props: React.Dispatch<React.SetStateAction<any>>
  state8a16f: any,
  setstate8a16f:React.Dispatch<React.SetStateAction<any>>
  state8a16fProps: any 
  setstate8a16fProps: React.Dispatch<React.SetStateAction<any>>
  dividers29243: any,
  setdividers29243:React.Dispatch<React.SetStateAction<any>>
  dividers29243Props: any 
  setdividers29243Props: React.Dispatch<React.SetStateAction<any>>
  country40b75: any,
  setcountry40b75:React.Dispatch<React.SetStateAction<any>>
  country40b75Props: any 
  setcountry40b75Props: React.Dispatch<React.SetStateAction<any>>
  dividerss6e19f: any,
  setdividerss6e19f:React.Dispatch<React.SetStateAction<any>>
  dividerss6e19fProps: any 
  setdividerss6e19fProps: React.Dispatch<React.SetStateAction<any>>
  court_name27e21: any,
  setcourt_name27e21:React.Dispatch<React.SetStateAction<any>>
  court_name27e21Props: any 
  setcourt_name27e21Props: React.Dispatch<React.SetStateAction<any>>
  dividersss5d68a: any,
  setdividersss5d68a:React.Dispatch<React.SetStateAction<any>>
  dividersss5d68aProps: any 
  setdividersss5d68aProps: React.Dispatch<React.SetStateAction<any>>
  judge_name5abc6: any,
  setjudge_name5abc6:React.Dispatch<React.SetStateAction<any>>
  judge_name5abc6Props: any 
  setjudge_name5abc6Props: React.Dispatch<React.SetStateAction<any>>
  dividerssss4ac29: any,
  setdividerssss4ac29:React.Dispatch<React.SetStateAction<any>>
  dividerssss4ac29Props: any 
  setdividerssss4ac29Props: React.Dispatch<React.SetStateAction<any>>
  filing_fee7fab8: any,
  setfiling_fee7fab8:React.Dispatch<React.SetStateAction<any>>
  filing_fee7fab8Props: any 
  setfiling_fee7fab8Props: React.Dispatch<React.SetStateAction<any>>
  dividersssssec43b: any,
  setdividersssssec43b:React.Dispatch<React.SetStateAction<any>>
  dividersssssec43bProps: any 
  setdividersssssec43bProps: React.Dispatch<React.SetStateAction<any>>
  service_method80ec2: any,
  setservice_method80ec2:React.Dispatch<React.SetStateAction<any>>
  service_method80ec2Props: any 
  setservice_method80ec2Props: React.Dispatch<React.SetStateAction<any>>
  dividerssssssbc99f: any,
  setdividerssssssbc99f:React.Dispatch<React.SetStateAction<any>>
  dividerssssssbc99fProps: any 
  setdividerssssssbc99fProps: React.Dispatch<React.SetStateAction<any>>
  efiling_system9b6bc: any,
  setefiling_system9b6bc:React.Dispatch<React.SetStateAction<any>>
  efiling_system9b6bcProps: any 
  setefiling_system9b6bcProps: React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text6c6d2: any,
  setvalid_checklist_text6c6d2:React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text6c6d2Props: any 
  setvalid_checklist_text6c6d2Props: React.Dispatch<React.SetStateAction<any>>
  checklist_item_ida8a87: any,
  setchecklist_item_ida8a87:React.Dispatch<React.SetStateAction<any>>
  checklist_item_ida8a87Props: any 
  setchecklist_item_ida8a87Props: React.Dispatch<React.SetStateAction<any>>
  item_name8baf4: any,
  setitem_name8baf4:React.Dispatch<React.SetStateAction<any>>
  item_name8baf4Props: any 
  setitem_name8baf4Props: React.Dispatch<React.SetStateAction<any>>
  is_completed2fafb: any,
  setis_completed2fafb:React.Dispatch<React.SetStateAction<any>>
  is_completed2fafbProps: any 
  setis_completed2fafbProps: React.Dispatch<React.SetStateAction<any>>
  special_rules_textda90e: any,
  setspecial_rules_textda90e:React.Dispatch<React.SetStateAction<any>>
  special_rules_textda90eProps: any 
  setspecial_rules_textda90eProps: React.Dispatch<React.SetStateAction<any>>
  dynamic_icon8f352: any,
  setdynamic_icon8f352:React.Dispatch<React.SetStateAction<any>>
  dynamic_icon8f352Props: any 
  setdynamic_icon8f352Props: React.Dispatch<React.SetStateAction<any>>
  rules_text55ce9: any,
  setrules_text55ce9:React.Dispatch<React.SetStateAction<any>>
  rules_text55ce9Props: any 
  setrules_text55ce9Props: React.Dispatch<React.SetStateAction<any>>
  account_idc92b6: any,
  setaccount_idc92b6:React.Dispatch<React.SetStateAction<any>>
  account_idc92b6Props: any 
  setaccount_idc92b6Props: React.Dispatch<React.SetStateAction<any>>
  venue_id063aa: any,
  setvenue_id063aa:React.Dispatch<React.SetStateAction<any>>
  venue_id063aaProps: any 
  setvenue_id063aaProps: React.Dispatch<React.SetStateAction<any>>
  documentviewer64771: any,
  setdocumentviewer64771:React.Dispatch<React.SetStateAction<any>>
  documentviewer64771Props: any 
  setdocumentviewer64771Props: React.Dispatch<React.SetStateAction<any>>
  back_bt22897: any,
  setback_bt22897:React.Dispatch<React.SetStateAction<any>>
  back_bt22897Props: any 
  setback_bt22897Props: React.Dispatch<React.SetStateAction<any>>
  craete_header_textae5d6: any,
  setcraete_header_textae5d6:React.Dispatch<React.SetStateAction<any>>
  craete_header_textae5d6Props: any 
  setcraete_header_textae5d6Props: React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text64f93: any,
  setreeq_doc_text64f93:React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text64f93Props: any 
  setreeq_doc_text64f93Props: React.Dispatch<React.SetStateAction<any>>
  attachment_idcc3f4: any,
  setattachment_idcc3f4:React.Dispatch<React.SetStateAction<any>>
  attachment_idcc3f4Props: any 
  setattachment_idcc3f4Props: React.Dispatch<React.SetStateAction<any>>
  doc_name909a3: any,
  setdoc_name909a3:React.Dispatch<React.SetStateAction<any>>
  doc_name909a3Props: any 
  setdoc_name909a3Props: React.Dispatch<React.SetStateAction<any>>
  view_button22ede: any,
  setview_button22ede:React.Dispatch<React.SetStateAction<any>>
  view_button22edeProps: any 
  setview_button22edeProps: React.Dispatch<React.SetStateAction<any>>
  case_info_text1e3db: any,
  setcase_info_text1e3db:React.Dispatch<React.SetStateAction<any>>
  case_info_text1e3dbProps: any 
  setcase_info_text1e3dbProps: React.Dispatch<React.SetStateAction<any>>
  debtor_name2af58: any,
  setdebtor_name2af58:React.Dispatch<React.SetStateAction<any>>
  debtor_name2af58Props: any 
  setdebtor_name2af58Props: React.Dispatch<React.SetStateAction<any>>
  case_display_idd1272: any,
  setcase_display_idd1272:React.Dispatch<React.SetStateAction<any>>
  case_display_idd1272Props: any 
  setcase_display_idd1272Props: React.Dispatch<React.SetStateAction<any>>
  ssn_maskedc4424: any,
  setssn_maskedc4424:React.Dispatch<React.SetStateAction<any>>
  ssn_maskedc4424Props: any 
  setssn_maskedc4424Props: React.Dispatch<React.SetStateAction<any>>
  dob29785: any,
  setdob29785:React.Dispatch<React.SetStateAction<any>>
  dob29785Props: any 
  setdob29785Props: React.Dispatch<React.SetStateAction<any>>
  address70906: any,
  setaddress70906:React.Dispatch<React.SetStateAction<any>>
  address70906Props: any 
  setaddress70906Props: React.Dispatch<React.SetStateAction<any>>
  creditor_namea9b98: any,
  setcreditor_namea9b98:React.Dispatch<React.SetStateAction<any>>
  creditor_namea9b98Props: any 
  setcreditor_namea9b98Props: React.Dispatch<React.SetStateAction<any>>
  charge_off_date763d0: any,
  setcharge_off_date763d0:React.Dispatch<React.SetStateAction<any>>
  charge_off_date763d0Props: any 
  setcharge_off_date763d0Props: React.Dispatch<React.SetStateAction<any>>
  last_payment_date43bdb: any,
  setlast_payment_date43bdb:React.Dispatch<React.SetStateAction<any>>
  last_payment_date43bdbProps: any 
  setlast_payment_date43bdbProps: React.Dispatch<React.SetStateAction<any>>
  dividere3c67: any,
  setdividere3c67:React.Dispatch<React.SetStateAction<any>>
  dividere3c67Props: any 
  setdividere3c67Props: React.Dispatch<React.SetStateAction<any>>
  principal_text6883f: any,
  setprincipal_text6883f:React.Dispatch<React.SetStateAction<any>>
  principal_text6883fProps: any 
  setprincipal_text6883fProps: React.Dispatch<React.SetStateAction<any>>
  principal65ef3: any,
  setprincipal65ef3:React.Dispatch<React.SetStateAction<any>>
  principal65ef3Props: any 
  setprincipal65ef3Props: React.Dispatch<React.SetStateAction<any>>
  intrest_text3a919: any,
  setintrest_text3a919:React.Dispatch<React.SetStateAction<any>>
  intrest_text3a919Props: any 
  setintrest_text3a919Props: React.Dispatch<React.SetStateAction<any>>
  interest783c4: any,
  setinterest783c4:React.Dispatch<React.SetStateAction<any>>
  interest783c4Props: any 
  setinterest783c4Props: React.Dispatch<React.SetStateAction<any>>
  fees_text4a6b6: any,
  setfees_text4a6b6:React.Dispatch<React.SetStateAction<any>>
  fees_text4a6b6Props: any 
  setfees_text4a6b6Props: React.Dispatch<React.SetStateAction<any>>
  feesab1fe: any,
  setfeesab1fe:React.Dispatch<React.SetStateAction<any>>
  feesab1feProps: any 
  setfeesab1feProps: React.Dispatch<React.SetStateAction<any>>
  total_balance_text0b418: any,
  settotal_balance_text0b418:React.Dispatch<React.SetStateAction<any>>
  total_balance_text0b418Props: any 
  settotal_balance_text0b418Props: React.Dispatch<React.SetStateAction<any>>
  total_balancee7e5f: any,
  settotal_balancee7e5f:React.Dispatch<React.SetStateAction<any>>
  total_balancee7e5fProps: any 
  settotal_balancee7e5fProps: React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date4dfe3: any,
  setsol_expiry_date4dfe3:React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date4dfe3Props: any 
  setsol_expiry_date4dfe3Props: React.Dispatch<React.SetStateAction<any>>
  ven_name_textf01f8: any,
  setven_name_textf01f8:React.Dispatch<React.SetStateAction<any>>
  ven_name_textf01f8Props: any 
  setven_name_textf01f8Props: React.Dispatch<React.SetStateAction<any>>
  statea7e09: any,
  setstatea7e09:React.Dispatch<React.SetStateAction<any>>
  statea7e09Props: any 
  setstatea7e09Props: React.Dispatch<React.SetStateAction<any>>
  dividersa774c: any,
  setdividersa774c:React.Dispatch<React.SetStateAction<any>>
  dividersa774cProps: any 
  setdividersa774cProps: React.Dispatch<React.SetStateAction<any>>
  countydb772: any,
  setcountydb772:React.Dispatch<React.SetStateAction<any>>
  countydb772Props: any 
  setcountydb772Props: React.Dispatch<React.SetStateAction<any>>
  dividerssaf051: any,
  setdividerssaf051:React.Dispatch<React.SetStateAction<any>>
  dividerssaf051Props: any 
  setdividerssaf051Props: React.Dispatch<React.SetStateAction<any>>
  court7a5a6: any,
  setcourt7a5a6:React.Dispatch<React.SetStateAction<any>>
  court7a5a6Props: any 
  setcourt7a5a6Props: React.Dispatch<React.SetStateAction<any>>
  dividersssbef5f: any,
  setdividersssbef5f:React.Dispatch<React.SetStateAction<any>>
  dividersssbef5fProps: any 
  setdividersssbef5fProps: React.Dispatch<React.SetStateAction<any>>
  judge71e3e: any,
  setjudge71e3e:React.Dispatch<React.SetStateAction<any>>
  judge71e3eProps: any 
  setjudge71e3eProps: React.Dispatch<React.SetStateAction<any>>
  dividerssss61d06: any,
  setdividerssss61d06:React.Dispatch<React.SetStateAction<any>>
  dividerssss61d06Props: any 
  setdividerssss61d06Props: React.Dispatch<React.SetStateAction<any>>
  filing_fee144cd: any,
  setfiling_fee144cd:React.Dispatch<React.SetStateAction<any>>
  filing_fee144cdProps: any 
  setfiling_fee144cdProps: React.Dispatch<React.SetStateAction<any>>
  dividersssssd333b: any,
  setdividersssssd333b:React.Dispatch<React.SetStateAction<any>>
  dividersssssd333bProps: any 
  setdividersssssd333bProps: React.Dispatch<React.SetStateAction<any>>
  service_method48ac6: any,
  setservice_method48ac6:React.Dispatch<React.SetStateAction<any>>
  service_method48ac6Props: any 
  setservice_method48ac6Props: React.Dispatch<React.SetStateAction<any>>
  dividerssssss06ce3: any,
  setdividerssssss06ce3:React.Dispatch<React.SetStateAction<any>>
  dividerssssss06ce3Props: any 
  setdividerssssss06ce3Props: React.Dispatch<React.SetStateAction<any>>
  efile_system964db: any,
  setefile_system964db:React.Dispatch<React.SetStateAction<any>>
  efile_system964dbProps: any 
  setefile_system964dbProps: React.Dispatch<React.SetStateAction<any>>
  valid_checklist_texta0e64: any,
  setvalid_checklist_texta0e64:React.Dispatch<React.SetStateAction<any>>
  valid_checklist_texta0e64Props: any 
  setvalid_checklist_texta0e64Props: React.Dispatch<React.SetStateAction<any>>
  checklist_item_id5bd1d: any,
  setchecklist_item_id5bd1d:React.Dispatch<React.SetStateAction<any>>
  checklist_item_id5bd1dProps: any 
  setchecklist_item_id5bd1dProps: React.Dispatch<React.SetStateAction<any>>
  item_name24046: any,
  setitem_name24046:React.Dispatch<React.SetStateAction<any>>
  item_name24046Props: any 
  setitem_name24046Props: React.Dispatch<React.SetStateAction<any>>
  is_completed1fd36: any,
  setis_completed1fd36:React.Dispatch<React.SetStateAction<any>>
  is_completed1fd36Props: any 
  setis_completed1fd36Props: React.Dispatch<React.SetStateAction<any>>
  special_rules_text24a29: any,
  setspecial_rules_text24a29:React.Dispatch<React.SetStateAction<any>>
  special_rules_text24a29Props: any 
  setspecial_rules_text24a29Props: React.Dispatch<React.SetStateAction<any>>
  dynamic_iconc7b56: any,
  setdynamic_iconc7b56:React.Dispatch<React.SetStateAction<any>>
  dynamic_iconc7b56Props: any 
  setdynamic_iconc7b56Props: React.Dispatch<React.SetStateAction<any>>
  textdb2d4: any,
  settextdb2d4:React.Dispatch<React.SetStateAction<any>>
  textdb2d4Props: any 
  settextdb2d4Props: React.Dispatch<React.SetStateAction<any>>
  account_idcc45c: any,
  setaccount_idcc45c:React.Dispatch<React.SetStateAction<any>>
  account_idcc45cProps: any 
  setaccount_idcc45cProps: React.Dispatch<React.SetStateAction<any>>
  craete_header_text26dc6: any,
  setcraete_header_text26dc6:React.Dispatch<React.SetStateAction<any>>
  craete_header_text26dc6Props: any 
  setcraete_header_text26dc6Props: React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text01111: any,
  setreeq_doc_text01111:React.Dispatch<React.SetStateAction<any>>
  reeq_doc_text01111Props: any 
  setreeq_doc_text01111Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id08b6e: any,
  setattachment_id08b6e:React.Dispatch<React.SetStateAction<any>>
  attachment_id08b6eProps: any 
  setattachment_id08b6eProps: React.Dispatch<React.SetStateAction<any>>
  doc_nameedf63: any,
  setdoc_nameedf63:React.Dispatch<React.SetStateAction<any>>
  doc_nameedf63Props: any 
  setdoc_nameedf63Props: React.Dispatch<React.SetStateAction<any>>
  view_buttoncb62a: any,
  setview_buttoncb62a:React.Dispatch<React.SetStateAction<any>>
  view_buttoncb62aProps: any 
  setview_buttoncb62aProps: React.Dispatch<React.SetStateAction<any>>
  case_info_text53524: any,
  setcase_info_text53524:React.Dispatch<React.SetStateAction<any>>
  case_info_text53524Props: any 
  setcase_info_text53524Props: React.Dispatch<React.SetStateAction<any>>
  debtor_namea603a: any,
  setdebtor_namea603a:React.Dispatch<React.SetStateAction<any>>
  debtor_namea603aProps: any 
  setdebtor_namea603aProps: React.Dispatch<React.SetStateAction<any>>
  case_display_id3ba0a: any,
  setcase_display_id3ba0a:React.Dispatch<React.SetStateAction<any>>
  case_display_id3ba0aProps: any 
  setcase_display_id3ba0aProps: React.Dispatch<React.SetStateAction<any>>
  ssn_masked36fce: any,
  setssn_masked36fce:React.Dispatch<React.SetStateAction<any>>
  ssn_masked36fceProps: any 
  setssn_masked36fceProps: React.Dispatch<React.SetStateAction<any>>
  dob19a93: any,
  setdob19a93:React.Dispatch<React.SetStateAction<any>>
  dob19a93Props: any 
  setdob19a93Props: React.Dispatch<React.SetStateAction<any>>
  address0e39e: any,
  setaddress0e39e:React.Dispatch<React.SetStateAction<any>>
  address0e39eProps: any 
  setaddress0e39eProps: React.Dispatch<React.SetStateAction<any>>
  creditor_name04ffa: any,
  setcreditor_name04ffa:React.Dispatch<React.SetStateAction<any>>
  creditor_name04ffaProps: any 
  setcreditor_name04ffaProps: React.Dispatch<React.SetStateAction<any>>
  charge_off_datef5bba: any,
  setcharge_off_datef5bba:React.Dispatch<React.SetStateAction<any>>
  charge_off_datef5bbaProps: any 
  setcharge_off_datef5bbaProps: React.Dispatch<React.SetStateAction<any>>
  last_payment_date37076: any,
  setlast_payment_date37076:React.Dispatch<React.SetStateAction<any>>
  last_payment_date37076Props: any 
  setlast_payment_date37076Props: React.Dispatch<React.SetStateAction<any>>
  divider9cfd3: any,
  setdivider9cfd3:React.Dispatch<React.SetStateAction<any>>
  divider9cfd3Props: any 
  setdivider9cfd3Props: React.Dispatch<React.SetStateAction<any>>
  principal_textb6dc5: any,
  setprincipal_textb6dc5:React.Dispatch<React.SetStateAction<any>>
  principal_textb6dc5Props: any 
  setprincipal_textb6dc5Props: React.Dispatch<React.SetStateAction<any>>
  principalae986: any,
  setprincipalae986:React.Dispatch<React.SetStateAction<any>>
  principalae986Props: any 
  setprincipalae986Props: React.Dispatch<React.SetStateAction<any>>
  intrest_textfab09: any,
  setintrest_textfab09:React.Dispatch<React.SetStateAction<any>>
  intrest_textfab09Props: any 
  setintrest_textfab09Props: React.Dispatch<React.SetStateAction<any>>
  interestf94e4: any,
  setinterestf94e4:React.Dispatch<React.SetStateAction<any>>
  interestf94e4Props: any 
  setinterestf94e4Props: React.Dispatch<React.SetStateAction<any>>
  fees_textdf3db: any,
  setfees_textdf3db:React.Dispatch<React.SetStateAction<any>>
  fees_textdf3dbProps: any 
  setfees_textdf3dbProps: React.Dispatch<React.SetStateAction<any>>
  feesd3a22: any,
  setfeesd3a22:React.Dispatch<React.SetStateAction<any>>
  feesd3a22Props: any 
  setfeesd3a22Props: React.Dispatch<React.SetStateAction<any>>
  total_balance_texta06df: any,
  settotal_balance_texta06df:React.Dispatch<React.SetStateAction<any>>
  total_balance_texta06dfProps: any 
  settotal_balance_texta06dfProps: React.Dispatch<React.SetStateAction<any>>
  total_balance92fd1: any,
  settotal_balance92fd1:React.Dispatch<React.SetStateAction<any>>
  total_balance92fd1Props: any 
  settotal_balance92fd1Props: React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date3775f: any,
  setsol_expiry_date3775f:React.Dispatch<React.SetStateAction<any>>
  sol_expiry_date3775fProps: any 
  setsol_expiry_date3775fProps: React.Dispatch<React.SetStateAction<any>>
  ven_name_text4470c: any,
  setven_name_text4470c:React.Dispatch<React.SetStateAction<any>>
  ven_name_text4470cProps: any 
  setven_name_text4470cProps: React.Dispatch<React.SetStateAction<any>>
  state10d95: any,
  setstate10d95:React.Dispatch<React.SetStateAction<any>>
  state10d95Props: any 
  setstate10d95Props: React.Dispatch<React.SetStateAction<any>>
  dividers6822a: any,
  setdividers6822a:React.Dispatch<React.SetStateAction<any>>
  dividers6822aProps: any 
  setdividers6822aProps: React.Dispatch<React.SetStateAction<any>>
  countryc8824: any,
  setcountryc8824:React.Dispatch<React.SetStateAction<any>>
  countryc8824Props: any 
  setcountryc8824Props: React.Dispatch<React.SetStateAction<any>>
  dividerss8b343: any,
  setdividerss8b343:React.Dispatch<React.SetStateAction<any>>
  dividerss8b343Props: any 
  setdividerss8b343Props: React.Dispatch<React.SetStateAction<any>>
  court_name70da0: any,
  setcourt_name70da0:React.Dispatch<React.SetStateAction<any>>
  court_name70da0Props: any 
  setcourt_name70da0Props: React.Dispatch<React.SetStateAction<any>>
  dividersssd0216: any,
  setdividersssd0216:React.Dispatch<React.SetStateAction<any>>
  dividersssd0216Props: any 
  setdividersssd0216Props: React.Dispatch<React.SetStateAction<any>>
  judge_name833b7: any,
  setjudge_name833b7:React.Dispatch<React.SetStateAction<any>>
  judge_name833b7Props: any 
  setjudge_name833b7Props: React.Dispatch<React.SetStateAction<any>>
  dividerssss9e016: any,
  setdividerssss9e016:React.Dispatch<React.SetStateAction<any>>
  dividerssss9e016Props: any 
  setdividerssss9e016Props: React.Dispatch<React.SetStateAction<any>>
  filing_fee9d0c4: any,
  setfiling_fee9d0c4:React.Dispatch<React.SetStateAction<any>>
  filing_fee9d0c4Props: any 
  setfiling_fee9d0c4Props: React.Dispatch<React.SetStateAction<any>>
  dividersssss85652: any,
  setdividersssss85652:React.Dispatch<React.SetStateAction<any>>
  dividersssss85652Props: any 
  setdividersssss85652Props: React.Dispatch<React.SetStateAction<any>>
  service_method926d2: any,
  setservice_method926d2:React.Dispatch<React.SetStateAction<any>>
  service_method926d2Props: any 
  setservice_method926d2Props: React.Dispatch<React.SetStateAction<any>>
  dividerssssss7d379: any,
  setdividerssssss7d379:React.Dispatch<React.SetStateAction<any>>
  dividerssssss7d379Props: any 
  setdividerssssss7d379Props: React.Dispatch<React.SetStateAction<any>>
  efiling_system056da: any,
  setefiling_system056da:React.Dispatch<React.SetStateAction<any>>
  efiling_system056daProps: any 
  setefiling_system056daProps: React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text6a0da: any,
  setvalid_checklist_text6a0da:React.Dispatch<React.SetStateAction<any>>
  valid_checklist_text6a0daProps: any 
  setvalid_checklist_text6a0daProps: React.Dispatch<React.SetStateAction<any>>
  checklist_item_id27c72: any,
  setchecklist_item_id27c72:React.Dispatch<React.SetStateAction<any>>
  checklist_item_id27c72Props: any 
  setchecklist_item_id27c72Props: React.Dispatch<React.SetStateAction<any>>
  item_name14346: any,
  setitem_name14346:React.Dispatch<React.SetStateAction<any>>
  item_name14346Props: any 
  setitem_name14346Props: React.Dispatch<React.SetStateAction<any>>
  is_completeda9a9a: any,
  setis_completeda9a9a:React.Dispatch<React.SetStateAction<any>>
  is_completeda9a9aProps: any 
  setis_completeda9a9aProps: React.Dispatch<React.SetStateAction<any>>
  special_rules_textdd5e9: any,
  setspecial_rules_textdd5e9:React.Dispatch<React.SetStateAction<any>>
  special_rules_textdd5e9Props: any 
  setspecial_rules_textdd5e9Props: React.Dispatch<React.SetStateAction<any>>
  warning_icon83e9f: any,
  setwarning_icon83e9f:React.Dispatch<React.SetStateAction<any>>
  warning_icon83e9fProps: any 
  setwarning_icon83e9fProps: React.Dispatch<React.SetStateAction<any>>
  rule_texta87d5: any,
  setrule_texta87d5:React.Dispatch<React.SetStateAction<any>>
  rule_texta87d5Props: any 
  setrule_texta87d5Props: React.Dispatch<React.SetStateAction<any>>
  account_id8944a: any,
  setaccount_id8944a:React.Dispatch<React.SetStateAction<any>>
  account_id8944aProps: any 
  setaccount_id8944aProps: React.Dispatch<React.SetStateAction<any>>
  cancel_btnc64a4: any,
  setcancel_btnc64a4:React.Dispatch<React.SetStateAction<any>>
  cancel_btnc64a4Props: any 
  setcancel_btnc64a4Props: React.Dispatch<React.SetStateAction<any>>
  reject_btn27005: any,
  setreject_btn27005:React.Dispatch<React.SetStateAction<any>>
  reject_btn27005Props: any 
  setreject_btn27005Props: React.Dispatch<React.SetStateAction<any>>
  pass_sign_btn916fa: any,
  setpass_sign_btn916fa:React.Dispatch<React.SetStateAction<any>>
  pass_sign_btn916faProps: any 
  setpass_sign_btn916faProps: React.Dispatch<React.SetStateAction<any>>
  report_editor1140e: any,
  setreport_editor1140e:React.Dispatch<React.SetStateAction<any>>
  report_editor1140eProps: any 
  setreport_editor1140eProps: React.Dispatch<React.SetStateAction<any>>
  lap_test_screen_texta85ad: any,
  setlap_test_screen_texta85ad:React.Dispatch<React.SetStateAction<any>>
  lap_test_screen_texta85adProps: any 
  setlap_test_screen_texta85adProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  newdashboard_v1: any 
  setnewdashboard_v1: React.Dispatch<React.SetStateAction<any>>
  newdashboard_v1Props: any 
  setnewdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  amrqueuetable_v1: any 
  setamrqueuetable_v1: React.Dispatch<React.SetStateAction<any>>
  amrqueuetable_v1Props: any 
  setamrqueuetable_v1Props: React.Dispatch<React.SetStateAction<any>>
  amrqueuesearch_v1: any 
  setamrqueuesearch_v1: React.Dispatch<React.SetStateAction<any>>
  amrqueuesearch_v1Props: any 
  setamrqueuesearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  addcase_v1: any 
  setaddcase_v1: React.Dispatch<React.SetStateAction<any>>
  addcase_v1Props: any 
  setaddcase_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewamrcase_v1: any 
  setviewamrcase_v1: React.Dispatch<React.SetStateAction<any>>
  viewamrcase_v1Props: any 
  setviewamrcase_v1Props: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1: any 
  setdocumentviewer_v1: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1Props: any 
  setdocumentviewer_v1Props: React.Dispatch<React.SetStateAction<any>>
  viewamrcasepggraph_v1: any 
  setviewamrcasepggraph_v1: React.Dispatch<React.SetStateAction<any>>
  viewamrcasepggraph_v1Props: any 
  setviewamrcasepggraph_v1Props: React.Dispatch<React.SetStateAction<any>>
  amrcaseapproval_v1: any 
  setamrcaseapproval_v1: React.Dispatch<React.SetStateAction<any>>
  amrcaseapproval_v1Props: any 
  setamrcaseapproval_v1Props: React.Dispatch<React.SetStateAction<any>>
  report_v1: any 
  setreport_v1: React.Dispatch<React.SetStateAction<any>>
  report_v1Props: any 
  setreport_v1Props: React.Dispatch<React.SetStateAction<any>>
  laptestscreen_v1: any 
  setlaptestscreen_v1: React.Dispatch<React.SetStateAction<any>>
  laptestscreen_v1Props: any 
  setlaptestscreen_v1Props: React.Dispatch<React.SetStateAction<any>>

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
  dfd_venuespecialrules_v1Props: any 
  setdfd_venuespecialrules_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_specialrulessurerealdb_v1Props: any 
  setdfd_specialrulessurerealdb_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_pendingfilingsdashboard_v1Props: any 
  setdfd_pendingfilingsdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_cardsdashboard_v1Props: any 
  setdfd_cardsdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_reportcase_v1Props: any 
  setdfd_reportcase_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [header_groupd8ba9, setheader_groupd8ba9 ] = React.useState<any>({}) 
    const [header_groupd8ba9Props, setheader_groupd8ba9Props ] = React.useState<any>({
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
        const [asset_dashboard_group1aa03, setasset_dashboard_group1aa03 ] = React.useState<any>({}) 
    const [asset_dashboard_group1aa03Props, setasset_dashboard_group1aa03Props ] = React.useState<any>({
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
        const [amr_queue_group3c082, setamr_queue_group3c082 ] = React.useState<any>({}) 
    const [amr_queue_group3c082Props, setamr_queue_group3c082Props ] = React.useState<any>({
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
        const [pending_file_group2128c, setpending_file_group2128c ] = React.useState<any>({}) 
    const [pending_file_group2128cProps, setpending_file_group2128cProps ] = React.useState<any>({
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
        const [service_pending_group8c0ca, setservice_pending_group8c0ca ] = React.useState<any>({}) 
    const [service_pending_group8c0caProps, setservice_pending_group8c0caProps ] = React.useState<any>({
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
        const [slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0 ] = React.useState<any>({}) 
    const [slas_at_risk_group1f8c0Props, setslas_at_risk_group1f8c0Props ] = React.useState<any>({
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
        const [court_rejection_groupdf57a, setcourt_rejection_groupdf57a ] = React.useState<any>({}) 
    const [court_rejection_groupdf57aProps, setcourt_rejection_groupdf57aProps ] = React.useState<any>({
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
        const [collected_mtd_group0f074, setcollected_mtd_group0f074 ] = React.useState<any>({}) 
    const [collected_mtd_group0f074Props, setcollected_mtd_group0f074Props ] = React.useState<any>({
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
        const [overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711 ] = React.useState<any>({}) 
    const [overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props ] = React.useState<any>({
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
        const [key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf ] = React.useState<any>({}) 
    const [key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "key_performance_indicators_text",
            "total_active_accounts_text",
            "total_active_accounts_text1",
            "divider1",
            "avg_days_to_judgment_text",
            "avg_days_to_judgment_text1",
            "divider2",
            "court_rejection_rate_text",
            "court_rejection_rate_text1",
            "divider3",
            "compliance_score_text",
            "compliance_score_text1",
            "divider4",
            "collection_rate_mtd_text",
            "collection_rate_mtd_text1",
      ]
      }) 
        const [recent_activity_group91db6, setrecent_activity_group91db6 ] = React.useState<any>({}) 
    const [recent_activity_group91db6Props, setrecent_activity_group91db6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "recent_activity_text",
            "amr_queued_text",
            "amr_queued_text_1",
            "divider1",
            "judgment_entered_text",
            "judgment_entered_text_1",
            "divider2",
            "service_completed_text",
            "service_completed_text_1",
            "divider3",
            "amr_passed_text",
            "amr_passed_text1",
            "divider4",
            "court_rejection_text",
            "court_rejection_text1",
            "divider5",
            "service_assigned_text",
            "service_assigned_text1",
            "divider6",
            "amr_rejected_text",
            "amr_rejected_text1",
      ]
      }) 
        const [amr_queue_group79589, setamr_queue_group79589 ] = React.useState<any>({}) 
    const [amr_queue_group79589Props, setamr_queue_group79589Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_btn",
            "bt_search",
            "new_case_button",
      ]
      }) 
        const [amr_group17ac4, setamr_group17ac4 ] = React.useState<any>({}) 
    const [amr_group17ac4Props, setamr_group17ac4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "amr_text",
      ]
      }) 
    
    const [amr_queue_table09598, setamr_queue_table09598 ] = React.useState<any>([]) 
    const [amr_queue_table09598Props, setamr_queue_table09598Props ] = React.useState<any>({
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
        const [add_case_groupbe1de, setadd_case_groupbe1de ] = React.useState<any>({}) 
    const [add_case_groupbe1deProps, setadd_case_groupbe1deProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
            "venue_id",
      ]
      }) 
        const [header_groupc587e, setheader_groupc587e ] = React.useState<any>({}) 
    const [header_groupc587eProps, setheader_groupc587eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button_back",
            "craete_header_text",
      ]
      }) 
        const [required_dociument_main_group6f022, setrequired_dociument_main_group6f022 ] = React.useState<any>({}) 
    const [required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props ] = React.useState<any>({
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
    
    const [doc_table8bfa1, setdoc_table8bfa1 ] = React.useState<any>([]) 
    const [doc_table8bfa1Props, setdoc_table8bfa1Props ] = React.useState<any>({
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
        const [case_information_groupe3c1b, setcase_information_groupe3c1b ] = React.useState<any>({}) 
    const [case_information_groupe3c1bProps, setcase_information_groupe3c1bProps ] = React.useState<any>({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        const [card_group7fa83, setcard_group7fa83 ] = React.useState<any>({}) 
    const [card_group7fa83Props, setcard_group7fa83Props ] = React.useState<any>({
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
        const [principal_groupde6dd, setprincipal_groupde6dd ] = React.useState<any>({}) 
    const [principal_groupde6ddProps, setprincipal_groupde6ddProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        const [intrest_group44b4d, setintrest_group44b4d ] = React.useState<any>({}) 
    const [intrest_group44b4dProps, setintrest_group44b4dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        const [fees_groupee523, setfees_groupee523 ] = React.useState<any>({}) 
    const [fees_groupee523Props, setfees_groupee523Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        const [total_groupd3e06, settotal_groupd3e06 ] = React.useState<any>({}) 
    const [total_groupd3e06Props, settotal_groupd3e06Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        const [venue_details_group1d734, setvenue_details_group1d734 ] = React.useState<any>({}) 
    const [venue_details_group1d734Props, setvenue_details_group1d734Props ] = React.useState<any>({
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
            "dividers",
            "county",
            "dividerss",
            "court_name",
            "dividersss",
            "judge_name",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efiling_system",
      ]
      }) 
        const [checklist_main_group32240, setchecklist_main_group32240 ] = React.useState<any>({}) 
    const [checklist_main_group32240Props, setchecklist_main_group32240Props ] = React.useState<any>({
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
    
    const [checklist_tablee7dea, setchecklist_tablee7dea ] = React.useState<any>([]) 
    const [checklist_tablee7deaProps, setchecklist_tablee7deaProps ] = React.useState<any>({
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
        const [special_rules_groupf22ab, setspecial_rules_groupf22ab ] = React.useState<any>({}) 
    const [special_rules_groupf22abProps, setspecial_rules_groupf22abProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        const [special_rules96aec, setspecial_rules96aec ] = React.useState<any>({}) 
    const [special_rules96aecProps, setspecial_rules96aecProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dynamic_icon",
            "rule_text",
      ]
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
        const [add_case_grouped126, setadd_case_grouped126 ] = React.useState<any>({}) 
    const [add_case_grouped126Props, setadd_case_grouped126Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        const [header_groupbd8a8, setheader_groupbd8a8 ] = React.useState<any>({}) 
    const [header_groupbd8a8Props, setheader_groupbd8a8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_bt",
            "craete_header_text",
      ]
      }) 
        const [required_dociument_main_group255d1, setrequired_dociument_main_group255d1 ] = React.useState<any>({}) 
    const [required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props ] = React.useState<any>({
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
    
    const [doc_table9c4f7, setdoc_table9c4f7 ] = React.useState<any>([]) 
    const [doc_table9c4f7Props, setdoc_table9c4f7Props ] = React.useState<any>({
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
        const [case_information_group48f3c, setcase_information_group48f3c ] = React.useState<any>({}) 
    const [case_information_group48f3cProps, setcase_information_group48f3cProps ] = React.useState<any>({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        const [card_group4c709, setcard_group4c709 ] = React.useState<any>({}) 
    const [card_group4c709Props, setcard_group4c709Props ] = React.useState<any>({
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
        const [principal_group42235, setprincipal_group42235 ] = React.useState<any>({}) 
    const [principal_group42235Props, setprincipal_group42235Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        const [intrest_group65c3b, setintrest_group65c3b ] = React.useState<any>({}) 
    const [intrest_group65c3bProps, setintrest_group65c3bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        const [fees_group8c4a6, setfees_group8c4a6 ] = React.useState<any>({}) 
    const [fees_group8c4a6Props, setfees_group8c4a6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        const [total_groupc52d3, settotal_groupc52d3 ] = React.useState<any>({}) 
    const [total_groupc52d3Props, settotal_groupc52d3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        const [venue_details_group51614, setvenue_details_group51614 ] = React.useState<any>({}) 
    const [venue_details_group51614Props, setvenue_details_group51614Props ] = React.useState<any>({
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
            "dividers",
            "county",
            "dividerss",
            "court",
            "dividersss",
            "judge",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efile_system",
      ]
      }) 
        const [checklist_main_group2b466, setchecklist_main_group2b466 ] = React.useState<any>({}) 
    const [checklist_main_group2b466Props, setchecklist_main_group2b466Props ] = React.useState<any>({
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
    
    const [checklist_tablecafb0, setchecklist_tablecafb0 ] = React.useState<any>([]) 
    const [checklist_tablecafb0Props, setchecklist_tablecafb0Props ] = React.useState<any>({
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
        const [special_rules_group7ce9f, setspecial_rules_group7ce9f ] = React.useState<any>({}) 
    const [special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        const [special_rules7f109, setspecial_rules7f109 ] = React.useState<any>({}) 
    const [special_rules7f109Props, setspecial_rules7f109Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dynamic_icon",
            "text",
      ]
      }) 
        const [add_case_group77747, setadd_case_group77747 ] = React.useState<any>({}) 
    const [add_case_group77747Props, setadd_case_group77747Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        const [header_groupbae8a, setheader_groupbae8a ] = React.useState<any>({}) 
    const [header_groupbae8aProps, setheader_groupbae8aProps ] = React.useState<any>({
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
        const [required_dociument_main_group999a8, setrequired_dociument_main_group999a8 ] = React.useState<any>({}) 
    const [required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props ] = React.useState<any>({
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
    
    const [doc_table45b8d, setdoc_table45b8d ] = React.useState<any>([]) 
    const [doc_table45b8dProps, setdoc_table45b8dProps ] = React.useState<any>({
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
        const [case_information_group35ed3, setcase_information_group35ed3 ] = React.useState<any>({}) 
    const [case_information_group35ed3Props, setcase_information_group35ed3Props ] = React.useState<any>({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        const [card_groupe78fa, setcard_groupe78fa ] = React.useState<any>({}) 
    const [card_groupe78faProps, setcard_groupe78faProps ] = React.useState<any>({
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
        const [principal_group9ae9f, setprincipal_group9ae9f ] = React.useState<any>({}) 
    const [principal_group9ae9fProps, setprincipal_group9ae9fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        const [intrest_group8df75, setintrest_group8df75 ] = React.useState<any>({}) 
    const [intrest_group8df75Props, setintrest_group8df75Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        const [fees_groupac23b, setfees_groupac23b ] = React.useState<any>({}) 
    const [fees_groupac23bProps, setfees_groupac23bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        const [total_groupe6175, settotal_groupe6175 ] = React.useState<any>({}) 
    const [total_groupe6175Props, settotal_groupe6175Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        const [venue_details_group6904e, setvenue_details_group6904e ] = React.useState<any>({}) 
    const [venue_details_group6904eProps, setvenue_details_group6904eProps ] = React.useState<any>({
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
            "dividers",
            "county",
            "dividerss",
            "court_name",
            "dividersss",
            "judge_name",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efiling_system",
      ]
      }) 
        const [checklist_main_groupda0ff, setchecklist_main_groupda0ff ] = React.useState<any>({}) 
    const [checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps ] = React.useState<any>({
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
    
    const [checklist_table0e25b, setchecklist_table0e25b ] = React.useState<any>([]) 
    const [checklist_table0e25bProps, setchecklist_table0e25bProps ] = React.useState<any>({
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
        const [special_rules_groupc1585, setspecial_rules_groupc1585 ] = React.useState<any>({}) 
    const [special_rules_groupc1585Props, setspecial_rules_groupc1585Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        const [special_rules1fc30, setspecial_rules1fc30 ] = React.useState<any>({}) 
    const [special_rules1fc30Props, setspecial_rules1fc30Props ] = React.useState<any>({
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
            "rule_text",
      ]
      }) 
        const [dynamicactions37e34, setdynamicactions37e34 ] = React.useState<any>({}) 
    const [dynamicactions37e34Props, setdynamicactions37e34Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel_btn",
            "reject_btn",
            "pass_sign_btn",
      ]
      }) 
        const [group_report8ef47, setgroup_report8ef47 ] = React.useState<any>({}) 
    const [group_report8ef47Props, setgroup_report8ef47Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        const [lap_test_screen_group38f1e, setlap_test_screen_group38f1e ] = React.useState<any>({}) 
    const [lap_test_screen_group38f1eProps, setlap_test_screen_group38f1eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "lap_test_screen_text",
      ]
      }) 
   const [text5e6b2,settext5e6b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [text5e6b2Props,settext5e6b2Props] = React.useState<any>({}) 
   const [amr_queue_text17149,setamr_queue_text17149] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue_text17149Props,setamr_queue_text17149Props] = React.useState<any>({}) 
   const [icon_total_assest42cc7,seticon_total_assest42cc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_total_assest42cc7Props,seticon_total_assest42cc7Props] = React.useState<any>({}) 
   const [amr_queue0e5a7,setamr_queue0e5a7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue0e5a7Props,setamr_queue0e5a7Props] = React.useState<any>({}) 
   const [amr_queue_desc10020,setamr_queue_desc10020] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queue_desc10020Props,setamr_queue_desc10020Props] = React.useState<any>({}) 
   const [pending_file_text61240,setpending_file_text61240] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_file_text61240Props,setpending_file_text61240Props] = React.useState<any>({}) 
   const [icon_maintenance_dueb2661,seticon_maintenance_dueb2661] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_maintenance_dueb2661Props,seticon_maintenance_dueb2661Props] = React.useState<any>({}) 
   const [pending_filea7d91,setpending_filea7d91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_filea7d91Props,setpending_filea7d91Props] = React.useState<any>({}) 
   const [pending_file_desca182c,setpending_file_desca182c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pending_file_desca182cProps,setpending_file_desca182cProps] = React.useState<any>({}) 
   const [service_pending_textb9d5c,setservice_pending_textb9d5c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending_textb9d5cProps,setservice_pending_textb9d5cProps] = React.useState<any>({}) 
   const [icon_warranty_expiringa065e,seticon_warranty_expiringa065e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_warranty_expiringa065eProps,seticon_warranty_expiringa065eProps] = React.useState<any>({}) 
   const [service_pending0898e,setservice_pending0898e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending0898eProps,setservice_pending0898eProps] = React.useState<any>({}) 
   const [service_pending_desc91c8a,setservice_pending_desc91c8a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_pending_desc91c8aProps,setservice_pending_desc91c8aProps] = React.useState<any>({}) 
   const [slas_at_risk_text42bdc,setslas_at_risk_text42bdc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_risk_text42bdcProps,setslas_at_risk_text42bdcProps] = React.useState<any>({}) 
   const [icon_eaa1e,seticon_eaa1e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon_eaa1eProps,seticon_eaa1eProps] = React.useState<any>({}) 
   const [slas_at_riska3022,setslas_at_riska3022] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_riska3022Props,setslas_at_riska3022Props] = React.useState<any>({}) 
   const [slas_at_risk_desc57375,setslas_at_risk_desc57375] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [slas_at_risk_desc57375Props,setslas_at_risk_desc57375Props] = React.useState<any>({}) 
   const [court_rejection_textc9a86,setcourt_rejection_textc9a86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_textc9a86Props,setcourt_rejection_textc9a86Props] = React.useState<any>({}) 
   const [icon87359,seticon87359] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [icon87359Props,seticon87359Props] = React.useState<any>({}) 
   const [court_rejectionff779,setcourt_rejectionff779] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejectionff779Props,setcourt_rejectionff779Props] = React.useState<any>({}) 
   const [court_rejection_desc6f72f,setcourt_rejection_desc6f72f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_desc6f72fProps,setcourt_rejection_desc6f72fProps] = React.useState<any>({}) 
   const [collected_mtd_textf5ff3,setcollected_mtd_textf5ff3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtd_textf5ff3Props,setcollected_mtd_textf5ff3Props] = React.useState<any>({}) 
   const [iconb9347,seticonb9347] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [iconb9347Props,seticonb9347Props] = React.useState<any>({}) 
   const [collected_mtd65ae0,setcollected_mtd65ae0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtd65ae0Props,setcollected_mtd65ae0Props] = React.useState<any>({}) 
   const [collected_mtd_desc21bcb,setcollected_mtd_desc21bcb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collected_mtd_desc21bcbProps,setcollected_mtd_desc21bcbProps] = React.useState<any>({}) 
   const [key_performance_indicators_text4f6db,setkey_performance_indicators_text4f6db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [key_performance_indicators_text4f6dbProps,setkey_performance_indicators_text4f6dbProps] = React.useState<any>({}) 
   const [total_active_accounts_texted4d7,settotal_active_accounts_texted4d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_active_accounts_texted4d7Props,settotal_active_accounts_texted4d7Props] = React.useState<any>({}) 
   const [total_active_accounts_text1b45d0,settotal_active_accounts_text1b45d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_active_accounts_text1b45d0Props,settotal_active_accounts_text1b45d0Props] = React.useState<any>({}) 
   const [divider13ca73,setdivider13ca73] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider13ca73Props,setdivider13ca73Props] = React.useState<any>({}) 
   const [avg_days_to_judgment_text82b69,setavg_days_to_judgment_text82b69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [avg_days_to_judgment_text82b69Props,setavg_days_to_judgment_text82b69Props] = React.useState<any>({}) 
   const [avg_days_to_judgment_text14ed01,setavg_days_to_judgment_text14ed01] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [avg_days_to_judgment_text14ed01Props,setavg_days_to_judgment_text14ed01Props] = React.useState<any>({}) 
   const [divider214543,setdivider214543] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider214543Props,setdivider214543Props] = React.useState<any>({}) 
   const [court_rejection_rate_text86ac0,setcourt_rejection_rate_text86ac0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_rate_text86ac0Props,setcourt_rejection_rate_text86ac0Props] = React.useState<any>({}) 
   const [court_rejection_rate_text10b69f,setcourt_rejection_rate_text10b69f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_rate_text10b69fProps,setcourt_rejection_rate_text10b69fProps] = React.useState<any>({}) 
   const [divider39db36,setdivider39db36] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider39db36Props,setdivider39db36Props] = React.useState<any>({}) 
   const [compliance_score_textbf682,setcompliance_score_textbf682] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [compliance_score_textbf682Props,setcompliance_score_textbf682Props] = React.useState<any>({}) 
   const [compliance_score_text1f41e4,setcompliance_score_text1f41e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [compliance_score_text1f41e4Props,setcompliance_score_text1f41e4Props] = React.useState<any>({}) 
   const [divider432793,setdivider432793] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider432793Props,setdivider432793Props] = React.useState<any>({}) 
   const [collection_rate_mtd_text335f5,setcollection_rate_mtd_text335f5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collection_rate_mtd_text335f5Props,setcollection_rate_mtd_text335f5Props] = React.useState<any>({}) 
   const [collection_rate_mtd_text16258d,setcollection_rate_mtd_text16258d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [collection_rate_mtd_text16258dProps,setcollection_rate_mtd_text16258dProps] = React.useState<any>({}) 
   const [recent_activity_text25b7b,setrecent_activity_text25b7b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [recent_activity_text25b7bProps,setrecent_activity_text25b7bProps] = React.useState<any>({}) 
   const [amr_queued_textb4f27,setamr_queued_textb4f27] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queued_textb4f27Props,setamr_queued_textb4f27Props] = React.useState<any>({}) 
   const [amr_queued_text_1dc178,setamr_queued_text_1dc178] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_queued_text_1dc178Props,setamr_queued_text_1dc178Props] = React.useState<any>({}) 
   const [divider1cb266,setdivider1cb266] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider1cb266Props,setdivider1cb266Props] = React.useState<any>({}) 
   const [judgment_entered_text2f3e7,setjudgment_entered_text2f3e7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judgment_entered_text2f3e7Props,setjudgment_entered_text2f3e7Props] = React.useState<any>({}) 
   const [judgment_entered_text_1d4af4,setjudgment_entered_text_1d4af4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judgment_entered_text_1d4af4Props,setjudgment_entered_text_1d4af4Props] = React.useState<any>({}) 
   const [divider2269d0,setdivider2269d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider2269d0Props,setdivider2269d0Props] = React.useState<any>({}) 
   const [service_completed_text835e5,setservice_completed_text835e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_completed_text835e5Props,setservice_completed_text835e5Props] = React.useState<any>({}) 
   const [service_completed_text_197211,setservice_completed_text_197211] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_completed_text_197211Props,setservice_completed_text_197211Props] = React.useState<any>({}) 
   const [divider3acb72,setdivider3acb72] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider3acb72Props,setdivider3acb72Props] = React.useState<any>({}) 
   const [amr_passed_text144d2,setamr_passed_text144d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_passed_text144d2Props,setamr_passed_text144d2Props] = React.useState<any>({}) 
   const [amr_passed_text188d24,setamr_passed_text188d24] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_passed_text188d24Props,setamr_passed_text188d24Props] = React.useState<any>({}) 
   const [divider4ffc0d,setdivider4ffc0d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider4ffc0dProps,setdivider4ffc0dProps] = React.useState<any>({}) 
   const [court_rejection_texte1e9c,setcourt_rejection_texte1e9c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_texte1e9cProps,setcourt_rejection_texte1e9cProps] = React.useState<any>({}) 
   const [court_rejection_text16e38f,setcourt_rejection_text16e38f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_rejection_text16e38fProps,setcourt_rejection_text16e38fProps] = React.useState<any>({}) 
   const [divider52864b,setdivider52864b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider52864bProps,setdivider52864bProps] = React.useState<any>({}) 
   const [service_assigned_textb2d7d,setservice_assigned_textb2d7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_assigned_textb2d7dProps,setservice_assigned_textb2d7dProps] = React.useState<any>({}) 
   const [service_assigned_text15a8e1,setservice_assigned_text15a8e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_assigned_text15a8e1Props,setservice_assigned_text15a8e1Props] = React.useState<any>({}) 
   const [divider6aaa01,setdivider6aaa01] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider6aaa01Props,setdivider6aaa01Props] = React.useState<any>({}) 
   const [amr_rejected_text92e50,setamr_rejected_text92e50] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_rejected_text92e50Props,setamr_rejected_text92e50Props] = React.useState<any>({}) 
   const [amr_rejected_text11a51a,setamr_rejected_text11a51a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_rejected_text11a51aProps,setamr_rejected_text11a51aProps] = React.useState<any>({}) 
   const [back_btn83b00,setback_btn83b00] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [back_btn83b00Props,setback_btn83b00Props] = React.useState<any>({}) 
   const [amr_textcc6d3,setamr_textcc6d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [amr_textcc6d3Props,setamr_textcc6d3Props] = React.useState<any>({}) 
   const [bt_searchc8991,setbt_searchc8991] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [bt_searchc8991Props,setbt_searchc8991Props] = React.useState<any>({}) 
   const [new_case_button34af2,setnew_case_button34af2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [new_case_button34af2Props,setnew_case_button34af2Props] = React.useState<any>({}) 
   const [account_id9a546,setaccount_id9a546] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_id9a546Props,setaccount_id9a546Props] = React.useState<any>({}) 
   const [case_id734ed,setcase_id734ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_id734edProps,setcase_id734edProps] = React.useState<any>({}) 
   const [debtor_nameb1ea9,setdebtor_nameb1ea9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_nameb1ea9Props,setdebtor_nameb1ea9Props] = React.useState<any>({}) 
   const [creditor_namee48d1,setcreditor_namee48d1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_namee48d1Props,setcreditor_namee48d1Props] = React.useState<any>({}) 
   const [full_name7a369,setfull_name7a369] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [full_name7a369Props,setfull_name7a369Props] = React.useState<any>({}) 
   const [total_balance6a331,settotal_balance6a331] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance6a331Props,settotal_balance6a331Props] = React.useState<any>({}) 
   const [court_name5ae4f,setcourt_name5ae4f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name5ae4fProps,setcourt_name5ae4fProps] = React.useState<any>({}) 
   const [priority_name6740a,setpriority_name6740a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [priority_name6740aProps,setpriority_name6740aProps] = React.useState<any>({}) 
   const [status_name86d6c,setstatus_name86d6c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [status_name86d6cProps,setstatus_name86d6cProps] = React.useState<any>({}) 
   const [trs_created_date92fe2,settrs_created_date92fe2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [trs_created_date92fe2Props,settrs_created_date92fe2Props] = React.useState<any>({}) 
   const [venue_idb51d8,setvenue_idb51d8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_idb51d8Props,setvenue_idb51d8Props] = React.useState<any>({}) 
   const [view_btnbd9a5,setview_btnbd9a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_btnbd9a5Props,setview_btnbd9a5Props] = React.useState<any>({}) 
   const [edit_btn10d01,setedit_btn10d01] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [edit_btn10d01Props,setedit_btn10d01Props] = React.useState<any>({}) 
   const [view_btn_pg_graph1baad,setview_btn_pg_graph1baad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_btn_pg_graph1baadProps,setview_btn_pg_graph1baadProps] = React.useState<any>({}) 
   const [bt_approveec5db,setbt_approveec5db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [bt_approveec5dbProps,setbt_approveec5dbProps] = React.useState<any>({}) 
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
   const [button_back1a912,setbutton_back1a912] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [button_back1a912Props,setbutton_back1a912Props] = React.useState<any>({}) 
   const [craete_header_texte958c,setcraete_header_texte958c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [craete_header_texte958cProps,setcraete_header_texte958cProps] = React.useState<any>({}) 
   const [reeq_doc_text78b91,setreeq_doc_text78b91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reeq_doc_text78b91Props,setreeq_doc_text78b91Props] = React.useState<any>({}) 
   const [attachment_id394f7,setattachment_id394f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attachment_id394f7Props,setattachment_id394f7Props] = React.useState<any>({}) 
   const [doc_namef31ac,setdoc_namef31ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_namef31acProps,setdoc_namef31acProps] = React.useState<any>({}) 
   const [view_button04be7,setview_button04be7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_button04be7Props,setview_button04be7Props] = React.useState<any>({}) 
   const [case_info_textd4267,setcase_info_textd4267] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_info_textd4267Props,setcase_info_textd4267Props] = React.useState<any>({}) 
   const [debtor_name83b58,setdebtor_name83b58] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_name83b58Props,setdebtor_name83b58Props] = React.useState<any>({}) 
   const [case_display_idb53b9,setcase_display_idb53b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_display_idb53b9Props,setcase_display_idb53b9Props] = React.useState<any>({}) 
   const [ssn_masked24ce0,setssn_masked24ce0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ssn_masked24ce0Props,setssn_masked24ce0Props] = React.useState<any>({}) 
   const [dobea900,setdobea900] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dobea900Props,setdobea900Props] = React.useState<any>({}) 
   const [address4e81d,setaddress4e81d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [address4e81dProps,setaddress4e81dProps] = React.useState<any>({}) 
   const [creditor_name62479,setcreditor_name62479] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_name62479Props,setcreditor_name62479Props] = React.useState<any>({}) 
   const [charge_off_dated3231,setcharge_off_dated3231] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [charge_off_dated3231Props,setcharge_off_dated3231Props] = React.useState<any>({}) 
   const [last_payment_date500eb,setlast_payment_date500eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [last_payment_date500ebProps,setlast_payment_date500ebProps] = React.useState<any>({}) 
   const [divider772d9,setdivider772d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider772d9Props,setdivider772d9Props] = React.useState<any>({}) 
   const [principal_text73a3d,setprincipal_text73a3d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principal_text73a3dProps,setprincipal_text73a3dProps] = React.useState<any>({}) 
   const [principald89b4,setprincipald89b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principald89b4Props,setprincipald89b4Props] = React.useState<any>({}) 
   const [intrest_text58114,setintrest_text58114] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [intrest_text58114Props,setintrest_text58114Props] = React.useState<any>({}) 
   const [interest42832,setinterest42832] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interest42832Props,setinterest42832Props] = React.useState<any>({}) 
   const [fees_text67815,setfees_text67815] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [fees_text67815Props,setfees_text67815Props] = React.useState<any>({}) 
   const [fees9a14f,setfees9a14f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [fees9a14fProps,setfees9a14fProps] = React.useState<any>({}) 
   const [total_balance_texted1be,settotal_balance_texted1be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance_texted1beProps,settotal_balance_texted1beProps] = React.useState<any>({}) 
   const [total_balancee5904,settotal_balancee5904] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balancee5904Props,settotal_balancee5904Props] = React.useState<any>({}) 
   const [sol_expiry_date69782,setsol_expiry_date69782] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sol_expiry_date69782Props,setsol_expiry_date69782Props] = React.useState<any>({}) 
   const [ven_name_textdfed0,setven_name_textdfed0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ven_name_textdfed0Props,setven_name_textdfed0Props] = React.useState<any>({}) 
   const [state8a16f,setstate8a16f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state8a16fProps,setstate8a16fProps] = React.useState<any>({}) 
   const [dividers29243,setdividers29243] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividers29243Props,setdividers29243Props] = React.useState<any>({}) 
   const [country40b75,setcountry40b75] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [country40b75Props,setcountry40b75Props] = React.useState<any>({}) 
   const [dividerss6e19f,setdividerss6e19f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerss6e19fProps,setdividerss6e19fProps] = React.useState<any>({}) 
   const [court_name27e21,setcourt_name27e21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name27e21Props,setcourt_name27e21Props] = React.useState<any>({}) 
   const [dividersss5d68a,setdividersss5d68a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersss5d68aProps,setdividersss5d68aProps] = React.useState<any>({}) 
   const [judge_name5abc6,setjudge_name5abc6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judge_name5abc6Props,setjudge_name5abc6Props] = React.useState<any>({}) 
   const [dividerssss4ac29,setdividerssss4ac29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssss4ac29Props,setdividerssss4ac29Props] = React.useState<any>({}) 
   const [filing_fee7fab8,setfiling_fee7fab8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filing_fee7fab8Props,setfiling_fee7fab8Props] = React.useState<any>({}) 
   const [dividersssssec43b,setdividersssssec43b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersssssec43bProps,setdividersssssec43bProps] = React.useState<any>({}) 
   const [service_method80ec2,setservice_method80ec2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_method80ec2Props,setservice_method80ec2Props] = React.useState<any>({}) 
   const [dividerssssssbc99f,setdividerssssssbc99f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssssssbc99fProps,setdividerssssssbc99fProps] = React.useState<any>({}) 
   const [efiling_system9b6bc,setefiling_system9b6bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_system9b6bcProps,setefiling_system9b6bcProps] = React.useState<any>({}) 
   const [valid_checklist_text6c6d2,setvalid_checklist_text6c6d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [valid_checklist_text6c6d2Props,setvalid_checklist_text6c6d2Props] = React.useState<any>({}) 
   const [checklist_item_ida8a87,setchecklist_item_ida8a87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checklist_item_ida8a87Props,setchecklist_item_ida8a87Props] = React.useState<any>({}) 
   const [item_name8baf4,setitem_name8baf4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [item_name8baf4Props,setitem_name8baf4Props] = React.useState<any>({}) 
   const [is_completed2fafb,setis_completed2fafb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [is_completed2fafbProps,setis_completed2fafbProps] = React.useState<any>({}) 
   const [special_rules_textda90e,setspecial_rules_textda90e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rules_textda90eProps,setspecial_rules_textda90eProps] = React.useState<any>({}) 
   const [dynamic_icon8f352,setdynamic_icon8f352] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dynamic_icon8f352Props,setdynamic_icon8f352Props] = React.useState<any>({}) 
   const [rules_text55ce9,setrules_text55ce9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rules_text55ce9Props,setrules_text55ce9Props] = React.useState<any>({}) 
   const [account_idc92b6,setaccount_idc92b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_idc92b6Props,setaccount_idc92b6Props] = React.useState<any>({}) 
   const [venue_id063aa,setvenue_id063aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [venue_id063aaProps,setvenue_id063aaProps] = React.useState<any>({}) 
   const [documentviewer64771,setdocumentviewer64771] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [documentviewer64771Props,setdocumentviewer64771Props] = React.useState<any>({}) 
   const [back_bt22897,setback_bt22897] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [back_bt22897Props,setback_bt22897Props] = React.useState<any>({}) 
   const [craete_header_textae5d6,setcraete_header_textae5d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [craete_header_textae5d6Props,setcraete_header_textae5d6Props] = React.useState<any>({}) 
   const [reeq_doc_text64f93,setreeq_doc_text64f93] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reeq_doc_text64f93Props,setreeq_doc_text64f93Props] = React.useState<any>({}) 
   const [attachment_idcc3f4,setattachment_idcc3f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attachment_idcc3f4Props,setattachment_idcc3f4Props] = React.useState<any>({}) 
   const [doc_name909a3,setdoc_name909a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_name909a3Props,setdoc_name909a3Props] = React.useState<any>({}) 
   const [view_button22ede,setview_button22ede] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_button22edeProps,setview_button22edeProps] = React.useState<any>({}) 
   const [case_info_text1e3db,setcase_info_text1e3db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_info_text1e3dbProps,setcase_info_text1e3dbProps] = React.useState<any>({}) 
   const [debtor_name2af58,setdebtor_name2af58] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_name2af58Props,setdebtor_name2af58Props] = React.useState<any>({}) 
   const [case_display_idd1272,setcase_display_idd1272] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_display_idd1272Props,setcase_display_idd1272Props] = React.useState<any>({}) 
   const [ssn_maskedc4424,setssn_maskedc4424] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ssn_maskedc4424Props,setssn_maskedc4424Props] = React.useState<any>({}) 
   const [dob29785,setdob29785] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dob29785Props,setdob29785Props] = React.useState<any>({}) 
   const [address70906,setaddress70906] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [address70906Props,setaddress70906Props] = React.useState<any>({}) 
   const [creditor_namea9b98,setcreditor_namea9b98] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_namea9b98Props,setcreditor_namea9b98Props] = React.useState<any>({}) 
   const [charge_off_date763d0,setcharge_off_date763d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [charge_off_date763d0Props,setcharge_off_date763d0Props] = React.useState<any>({}) 
   const [last_payment_date43bdb,setlast_payment_date43bdb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [last_payment_date43bdbProps,setlast_payment_date43bdbProps] = React.useState<any>({}) 
   const [dividere3c67,setdividere3c67] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividere3c67Props,setdividere3c67Props] = React.useState<any>({}) 
   const [principal_text6883f,setprincipal_text6883f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principal_text6883fProps,setprincipal_text6883fProps] = React.useState<any>({}) 
   const [principal65ef3,setprincipal65ef3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principal65ef3Props,setprincipal65ef3Props] = React.useState<any>({}) 
   const [intrest_text3a919,setintrest_text3a919] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [intrest_text3a919Props,setintrest_text3a919Props] = React.useState<any>({}) 
   const [interest783c4,setinterest783c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interest783c4Props,setinterest783c4Props] = React.useState<any>({}) 
   const [fees_text4a6b6,setfees_text4a6b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [fees_text4a6b6Props,setfees_text4a6b6Props] = React.useState<any>({}) 
   const [feesab1fe,setfeesab1fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [feesab1feProps,setfeesab1feProps] = React.useState<any>({}) 
   const [total_balance_text0b418,settotal_balance_text0b418] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance_text0b418Props,settotal_balance_text0b418Props] = React.useState<any>({}) 
   const [total_balancee7e5f,settotal_balancee7e5f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balancee7e5fProps,settotal_balancee7e5fProps] = React.useState<any>({}) 
   const [sol_expiry_date4dfe3,setsol_expiry_date4dfe3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sol_expiry_date4dfe3Props,setsol_expiry_date4dfe3Props] = React.useState<any>({}) 
   const [ven_name_textf01f8,setven_name_textf01f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ven_name_textf01f8Props,setven_name_textf01f8Props] = React.useState<any>({}) 
   const [statea7e09,setstatea7e09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [statea7e09Props,setstatea7e09Props] = React.useState<any>({}) 
   const [dividersa774c,setdividersa774c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersa774cProps,setdividersa774cProps] = React.useState<any>({}) 
   const [countydb772,setcountydb772] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [countydb772Props,setcountydb772Props] = React.useState<any>({}) 
   const [dividerssaf051,setdividerssaf051] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssaf051Props,setdividerssaf051Props] = React.useState<any>({}) 
   const [court7a5a6,setcourt7a5a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court7a5a6Props,setcourt7a5a6Props] = React.useState<any>({}) 
   const [dividersssbef5f,setdividersssbef5f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersssbef5fProps,setdividersssbef5fProps] = React.useState<any>({}) 
   const [judge71e3e,setjudge71e3e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judge71e3eProps,setjudge71e3eProps] = React.useState<any>({}) 
   const [dividerssss61d06,setdividerssss61d06] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssss61d06Props,setdividerssss61d06Props] = React.useState<any>({}) 
   const [filing_fee144cd,setfiling_fee144cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filing_fee144cdProps,setfiling_fee144cdProps] = React.useState<any>({}) 
   const [dividersssssd333b,setdividersssssd333b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersssssd333bProps,setdividersssssd333bProps] = React.useState<any>({}) 
   const [service_method48ac6,setservice_method48ac6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_method48ac6Props,setservice_method48ac6Props] = React.useState<any>({}) 
   const [dividerssssss06ce3,setdividerssssss06ce3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssssss06ce3Props,setdividerssssss06ce3Props] = React.useState<any>({}) 
   const [efile_system964db,setefile_system964db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efile_system964dbProps,setefile_system964dbProps] = React.useState<any>({}) 
   const [valid_checklist_texta0e64,setvalid_checklist_texta0e64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [valid_checklist_texta0e64Props,setvalid_checklist_texta0e64Props] = React.useState<any>({}) 
   const [checklist_item_id5bd1d,setchecklist_item_id5bd1d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checklist_item_id5bd1dProps,setchecklist_item_id5bd1dProps] = React.useState<any>({}) 
   const [item_name24046,setitem_name24046] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [item_name24046Props,setitem_name24046Props] = React.useState<any>({}) 
   const [is_completed1fd36,setis_completed1fd36] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [is_completed1fd36Props,setis_completed1fd36Props] = React.useState<any>({}) 
   const [special_rules_text24a29,setspecial_rules_text24a29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rules_text24a29Props,setspecial_rules_text24a29Props] = React.useState<any>({}) 
   const [dynamic_iconc7b56,setdynamic_iconc7b56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dynamic_iconc7b56Props,setdynamic_iconc7b56Props] = React.useState<any>({}) 
   const [textdb2d4,settextdb2d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [textdb2d4Props,settextdb2d4Props] = React.useState<any>({}) 
   const [account_idcc45c,setaccount_idcc45c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_idcc45cProps,setaccount_idcc45cProps] = React.useState<any>({}) 
   const [craete_header_text26dc6,setcraete_header_text26dc6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [craete_header_text26dc6Props,setcraete_header_text26dc6Props] = React.useState<any>({}) 
   const [reeq_doc_text01111,setreeq_doc_text01111] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reeq_doc_text01111Props,setreeq_doc_text01111Props] = React.useState<any>({}) 
   const [attachment_id08b6e,setattachment_id08b6e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [attachment_id08b6eProps,setattachment_id08b6eProps] = React.useState<any>({}) 
   const [doc_nameedf63,setdoc_nameedf63] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [doc_nameedf63Props,setdoc_nameedf63Props] = React.useState<any>({}) 
   const [view_buttoncb62a,setview_buttoncb62a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [view_buttoncb62aProps,setview_buttoncb62aProps] = React.useState<any>({}) 
   const [case_info_text53524,setcase_info_text53524] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_info_text53524Props,setcase_info_text53524Props] = React.useState<any>({}) 
   const [debtor_namea603a,setdebtor_namea603a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [debtor_namea603aProps,setdebtor_namea603aProps] = React.useState<any>({}) 
   const [case_display_id3ba0a,setcase_display_id3ba0a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [case_display_id3ba0aProps,setcase_display_id3ba0aProps] = React.useState<any>({}) 
   const [ssn_masked36fce,setssn_masked36fce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ssn_masked36fceProps,setssn_masked36fceProps] = React.useState<any>({}) 
   const [dob19a93,setdob19a93] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dob19a93Props,setdob19a93Props] = React.useState<any>({}) 
   const [address0e39e,setaddress0e39e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [address0e39eProps,setaddress0e39eProps] = React.useState<any>({}) 
   const [creditor_name04ffa,setcreditor_name04ffa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [creditor_name04ffaProps,setcreditor_name04ffaProps] = React.useState<any>({}) 
   const [charge_off_datef5bba,setcharge_off_datef5bba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [charge_off_datef5bbaProps,setcharge_off_datef5bbaProps] = React.useState<any>({}) 
   const [last_payment_date37076,setlast_payment_date37076] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [last_payment_date37076Props,setlast_payment_date37076Props] = React.useState<any>({}) 
   const [divider9cfd3,setdivider9cfd3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [divider9cfd3Props,setdivider9cfd3Props] = React.useState<any>({}) 
   const [principal_textb6dc5,setprincipal_textb6dc5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principal_textb6dc5Props,setprincipal_textb6dc5Props] = React.useState<any>({}) 
   const [principalae986,setprincipalae986] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [principalae986Props,setprincipalae986Props] = React.useState<any>({}) 
   const [intrest_textfab09,setintrest_textfab09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [intrest_textfab09Props,setintrest_textfab09Props] = React.useState<any>({}) 
   const [interestf94e4,setinterestf94e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [interestf94e4Props,setinterestf94e4Props] = React.useState<any>({}) 
   const [fees_textdf3db,setfees_textdf3db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [fees_textdf3dbProps,setfees_textdf3dbProps] = React.useState<any>({}) 
   const [feesd3a22,setfeesd3a22] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [feesd3a22Props,setfeesd3a22Props] = React.useState<any>({}) 
   const [total_balance_texta06df,settotal_balance_texta06df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance_texta06dfProps,settotal_balance_texta06dfProps] = React.useState<any>({}) 
   const [total_balance92fd1,settotal_balance92fd1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [total_balance92fd1Props,settotal_balance92fd1Props] = React.useState<any>({}) 
   const [sol_expiry_date3775f,setsol_expiry_date3775f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [sol_expiry_date3775fProps,setsol_expiry_date3775fProps] = React.useState<any>({}) 
   const [ven_name_text4470c,setven_name_text4470c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [ven_name_text4470cProps,setven_name_text4470cProps] = React.useState<any>({}) 
   const [state10d95,setstate10d95] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [state10d95Props,setstate10d95Props] = React.useState<any>({}) 
   const [dividers6822a,setdividers6822a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividers6822aProps,setdividers6822aProps] = React.useState<any>({}) 
   const [countryc8824,setcountryc8824] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [countryc8824Props,setcountryc8824Props] = React.useState<any>({}) 
   const [dividerss8b343,setdividerss8b343] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerss8b343Props,setdividerss8b343Props] = React.useState<any>({}) 
   const [court_name70da0,setcourt_name70da0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [court_name70da0Props,setcourt_name70da0Props] = React.useState<any>({}) 
   const [dividersssd0216,setdividersssd0216] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersssd0216Props,setdividersssd0216Props] = React.useState<any>({}) 
   const [judge_name833b7,setjudge_name833b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [judge_name833b7Props,setjudge_name833b7Props] = React.useState<any>({}) 
   const [dividerssss9e016,setdividerssss9e016] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssss9e016Props,setdividerssss9e016Props] = React.useState<any>({}) 
   const [filing_fee9d0c4,setfiling_fee9d0c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [filing_fee9d0c4Props,setfiling_fee9d0c4Props] = React.useState<any>({}) 
   const [dividersssss85652,setdividersssss85652] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividersssss85652Props,setdividersssss85652Props] = React.useState<any>({}) 
   const [service_method926d2,setservice_method926d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [service_method926d2Props,setservice_method926d2Props] = React.useState<any>({}) 
   const [dividerssssss7d379,setdividerssssss7d379] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [dividerssssss7d379Props,setdividerssssss7d379Props] = React.useState<any>({}) 
   const [efiling_system056da,setefiling_system056da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [efiling_system056daProps,setefiling_system056daProps] = React.useState<any>({}) 
   const [valid_checklist_text6a0da,setvalid_checklist_text6a0da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [valid_checklist_text6a0daProps,setvalid_checklist_text6a0daProps] = React.useState<any>({}) 
   const [checklist_item_id27c72,setchecklist_item_id27c72] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [checklist_item_id27c72Props,setchecklist_item_id27c72Props] = React.useState<any>({}) 
   const [item_name14346,setitem_name14346] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [item_name14346Props,setitem_name14346Props] = React.useState<any>({}) 
   const [is_completeda9a9a,setis_completeda9a9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [is_completeda9a9aProps,setis_completeda9a9aProps] = React.useState<any>({}) 
   const [special_rules_textdd5e9,setspecial_rules_textdd5e9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [special_rules_textdd5e9Props,setspecial_rules_textdd5e9Props] = React.useState<any>({}) 
   const [warning_icon83e9f,setwarning_icon83e9f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [warning_icon83e9fProps,setwarning_icon83e9fProps] = React.useState<any>({}) 
   const [rule_texta87d5,setrule_texta87d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [rule_texta87d5Props,setrule_texta87d5Props] = React.useState<any>({}) 
   const [account_id8944a,setaccount_id8944a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [account_id8944aProps,setaccount_id8944aProps] = React.useState<any>({}) 
   const [cancel_btnc64a4,setcancel_btnc64a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [cancel_btnc64a4Props,setcancel_btnc64a4Props] = React.useState<any>({}) 
   const [reject_btn27005,setreject_btn27005] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [reject_btn27005Props,setreject_btn27005Props] = React.useState<any>({}) 
   const [pass_sign_btn916fa,setpass_sign_btn916fa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [pass_sign_btn916faProps,setpass_sign_btn916faProps] = React.useState<any>({}) 
   const [report_editor1140e,setreport_editor1140e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [report_editor1140eProps,setreport_editor1140eProps] = React.useState<any>({}) 
   const [lap_test_screen_texta85ad,setlap_test_screen_texta85ad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null
    }) 
   const [lap_test_screen_texta85adProps,setlap_test_screen_texta85adProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       texttext5e6b2:false,
       textamr_queue_text17149:false,
       iconicon_total_assest42cc7:false,
       textamr_queue0e5a7:false,
       textamr_queue_desc10020:false,
       textpending_file_text61240:false,
       iconicon_maintenance_dueb2661:false,
       textpending_filea7d91:false,
       textpending_file_desca182c:false,
       textservice_pending_textb9d5c:false,
       iconicon_warranty_expiringa065e:false,
       textservice_pending0898e:false,
       textservice_pending_desc91c8a:false,
       textslas_at_risk_text42bdc:false,
       iconicon_eaa1e:false,
       textslas_at_riska3022:false,
       textslas_at_risk_desc57375:false,
       textcourt_rejection_textc9a86:false,
       iconicon87359:false,
       textcourt_rejectionff779:false,
       textcourt_rejection_desc6f72f:false,
       textcollected_mtd_textf5ff3:false,
       iconiconb9347:false,
       textcollected_mtd65ae0:false,
       textcollected_mtd_desc21bcb:false,
       textkey_performance_indicators_text4f6db:false,
       texttotal_active_accounts_texted4d7:false,
       texttotal_active_accounts_text1b45d0:false,
       dividerdivider13ca73:false,
       textavg_days_to_judgment_text82b69:false,
       textavg_days_to_judgment_text14ed01:false,
       dividerdivider214543:false,
       textcourt_rejection_rate_text86ac0:false,
       textcourt_rejection_rate_text10b69f:false,
       dividerdivider39db36:false,
       textcompliance_score_textbf682:false,
       textcompliance_score_text1f41e4:false,
       dividerdivider432793:false,
       textcollection_rate_mtd_text335f5:false,
       textcollection_rate_mtd_text16258d:false,
       textrecent_activity_text25b7b:false,
       textamr_queued_textb4f27:false,
       textamr_queued_text_1dc178:false,
       dividerdivider1cb266:false,
       textjudgment_entered_text2f3e7:false,
       textjudgment_entered_text_1d4af4:false,
       dividerdivider2269d0:false,
       textservice_completed_text835e5:false,
       textservice_completed_text_197211:false,
       dividerdivider3acb72:false,
       textamr_passed_text144d2:false,
       textamr_passed_text188d24:false,
       dividerdivider4ffc0d:false,
       textcourt_rejection_texte1e9c:false,
       textcourt_rejection_text16e38f:false,
       dividerdivider52864b:false,
       textservice_assigned_textb2d7d:false,
       textservice_assigned_text15a8e1:false,
       dividerdivider6aaa01:false,
       textamr_rejected_text92e50:false,
       textamr_rejected_text11a51a:false,
       buttonback_btn83b00:false,
       textamr_textcc6d3:false,
       buttonbt_searchc8991:false,
       buttonnew_case_button34af2:false,
       columnaccount_id9a546:false,
       columncase_id734ed:false,
       columndebtor_nameb1ea9:false,
       columncreditor_namee48d1:false,
       columnfull_name7a369:false,
       columntotal_balance6a331:false,
       columncourt_name5ae4f:false,
       columnpriority_name6740a:false,
       columnstatus_name86d6c:false,
       columntrs_created_date92fe2:false,
       columnvenue_idb51d8:false,
       buttonview_btnbd9a5:false,
       buttonedit_btn10d01:false,
       buttonview_btn_pg_graph1baad:false,
       buttonbt_approveec5db:false,
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
       buttonbutton_back1a912:false,
       textcraete_header_texte958c:false,
       textreeq_doc_text78b91:false,
       columnattachment_id394f7:false,
       columndoc_namef31ac:false,
       buttonview_button04be7:false,
       textcase_info_textd4267:false,
       textinputdebtor_name83b58:false,
       textinputcase_display_idb53b9:false,
       textinputssn_masked24ce0:false,
       datepickerdobea900:false,
       textareaaddress4e81d:false,
       textinputcreditor_name62479:false,
       datepickercharge_off_dated3231:false,
       datepickerlast_payment_date500eb:false,
       dividerdivider772d9:false,
       textprincipal_text73a3d:false,
       textprincipald89b4:false,
       textintrest_text58114:false,
       textinterest42832:false,
       textfees_text67815:false,
       textfees9a14f:false,
       texttotal_balance_texted1be:false,
       texttotal_balancee5904:false,
       datepickersol_expiry_date69782:false,
       textven_name_textdfed0:false,
       textinputstate8a16f:false,
       dividerdividers29243:false,
       textinputcountry40b75:false,
       dividerdividerss6e19f:false,
       textinputcourt_name27e21:false,
       dividerdividersss5d68a:false,
       textinputjudge_name5abc6:false,
       dividerdividerssss4ac29:false,
       textinputfiling_fee7fab8:false,
       dividerdividersssssec43b:false,
       textinputservice_method80ec2:false,
       dividerdividerssssssbc99f:false,
       textinputefiling_system9b6bc:false,
       textvalid_checklist_text6c6d2:false,
       columnchecklist_item_ida8a87:false,
       columnitem_name8baf4:false,
       columnis_completed2fafb:false,
       textspecial_rules_textda90e:false,
       icondynamic_icon8f352:false,
       textrules_text55ce9:false,
       textaccount_idc92b6:false,
       textvenue_id063aa:false,
       documentviewerdocumentviewer64771:false,
       buttonback_bt22897:false,
       textcraete_header_textae5d6:false,
       textreeq_doc_text64f93:false,
       columnattachment_idcc3f4:false,
       columndoc_name909a3:false,
       buttonview_button22ede:false,
       textcase_info_text1e3db:false,
       textinputdebtor_name2af58:false,
       textinputcase_display_idd1272:false,
       textinputssn_maskedc4424:false,
       datepickerdob29785:false,
       textareaaddress70906:false,
       textinputcreditor_namea9b98:false,
       datepickercharge_off_date763d0:false,
       datepickerlast_payment_date43bdb:false,
       dividerdividere3c67:false,
       textprincipal_text6883f:false,
       textprincipal65ef3:false,
       textintrest_text3a919:false,
       textinterest783c4:false,
       textfees_text4a6b6:false,
       textfeesab1fe:false,
       texttotal_balance_text0b418:false,
       texttotal_balancee7e5f:false,
       datepickersol_expiry_date4dfe3:false,
       textven_name_textf01f8:false,
       textinputstatea7e09:false,
       dividerdividersa774c:false,
       textinputcountydb772:false,
       dividerdividerssaf051:false,
       textinputcourt7a5a6:false,
       dividerdividersssbef5f:false,
       textinputjudge71e3e:false,
       dividerdividerssss61d06:false,
       textinputfiling_fee144cd:false,
       dividerdividersssssd333b:false,
       textinputservice_method48ac6:false,
       dividerdividerssssss06ce3:false,
       textinputefile_system964db:false,
       textvalid_checklist_texta0e64:false,
       columnchecklist_item_id5bd1d:false,
       columnitem_name24046:false,
       columnis_completed1fd36:false,
       textspecial_rules_text24a29:false,
       icondynamic_iconc7b56:false,
       texttextdb2d4:false,
       textaccount_idcc45c:false,
       textcraete_header_text26dc6:false,
       textreeq_doc_text01111:false,
       columnattachment_id08b6e:false,
       columndoc_nameedf63:false,
       buttonview_buttoncb62a:false,
       textcase_info_text53524:false,
       textinputdebtor_namea603a:false,
       textinputcase_display_id3ba0a:false,
       textinputssn_masked36fce:false,
       datepickerdob19a93:false,
       textareaaddress0e39e:false,
       textinputcreditor_name04ffa:false,
       datepickercharge_off_datef5bba:false,
       datepickerlast_payment_date37076:false,
       dividerdivider9cfd3:false,
       textprincipal_textb6dc5:false,
       textprincipalae986:false,
       textintrest_textfab09:false,
       textinterestf94e4:false,
       textfees_textdf3db:false,
       textfeesd3a22:false,
       texttotal_balance_texta06df:false,
       texttotal_balance92fd1:false,
       datepickersol_expiry_date3775f:false,
       textven_name_text4470c:false,
       textinputstate10d95:false,
       dividerdividers6822a:false,
       textinputcountryc8824:false,
       dividerdividerss8b343:false,
       textinputcourt_name70da0:false,
       dividerdividersssd0216:false,
       textinputjudge_name833b7:false,
       dividerdividerssss9e016:false,
       textinputfiling_fee9d0c4:false,
       dividerdividersssss85652:false,
       textinputservice_method926d2:false,
       dividerdividerssssss7d379:false,
       textinputefiling_system056da:false,
       textvalid_checklist_text6a0da:false,
       columnchecklist_item_id27c72:false,
       columnitem_name14346:false,
       columnis_completeda9a9a:false,
       textspecial_rules_textdd5e9:false,
       iconwarning_icon83e9f:false,
       textrule_texta87d5:false,
       textaccount_id8944a:false,
       buttoncancel_btnc64a4:false,
       buttonreject_btn27005:false,
       buttonpass_sign_btn916fa:false,
       editorreport_editor1140e:false,
       textlap_test_screen_texta85ad:false,
       groupheader_groupd8ba9:false,
       groupasset_dashboard_group1aa03:false,
       groupamr_queue_group3c082:false,
       grouppending_file_group2128c:false,
       groupservice_pending_group8c0ca:false,
       groupslas_at_risk_group1f8c0:false,
       groupcourt_rejection_groupdf57a:false,
       groupcollected_mtd_group0f074:false,
       groupoverall_key_performance_indicatorsc2711:false,
       groupkey_performance_indicator_groupf9eaf:false,
       grouprecent_activity_group91db6:false,
       groupamr_queue_group79589:false,
       groupamr_group17ac4:false,
       tableamr_queue_table09598:false,
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
       groupadd_case_groupbe1de:false,
       groupheader_groupc587e:false,
       grouprequired_dociument_main_group6f022:false,
       tabledoc_table8bfa1:false,
       groupcase_information_groupe3c1b:false,
       groupcard_group7fa83:false,
       groupprincipal_groupde6dd:false,
       groupintrest_group44b4d:false,
       groupfees_groupee523:false,
       grouptotal_groupd3e06:false,
       groupvenue_details_group1d734:false,
       groupchecklist_main_group32240:false,
       tablechecklist_tablee7dea:false,
       groupspecial_rules_groupf22ab:false,
       groupspecial_rules96aec:false,
       groupdocument_viewer_groupe4249:false,
       groupadd_case_grouped126:false,
       groupheader_groupbd8a8:false,
       grouprequired_dociument_main_group255d1:false,
       tabledoc_table9c4f7:false,
       groupcase_information_group48f3c:false,
       groupcard_group4c709:false,
       groupprincipal_group42235:false,
       groupintrest_group65c3b:false,
       groupfees_group8c4a6:false,
       grouptotal_groupc52d3:false,
       groupvenue_details_group51614:false,
       groupchecklist_main_group2b466:false,
       tablechecklist_tablecafb0:false,
       groupspecial_rules_group7ce9f:false,
       groupspecial_rules7f109:false,
       groupadd_case_group77747:false,
       groupheader_groupbae8a:false,
       grouprequired_dociument_main_group999a8:false,
       tabledoc_table45b8d:false,
       groupcase_information_group35ed3:false,
       groupcard_groupe78fa:false,
       groupprincipal_group9ae9f:false,
       groupintrest_group8df75:false,
       groupfees_groupac23b:false,
       grouptotal_groupe6175:false,
       groupvenue_details_group6904e:false,
       groupchecklist_main_groupda0ff:false,
       tablechecklist_table0e25b:false,
       groupspecial_rules_groupc1585:false,
       groupspecial_rules1fc30:false,
       groupdynamicactions37e34:false,
       groupgroup_report8ef47:false,
       grouplap_test_screen_group38f1e:false,
      })

  ////// screen states 
  const [newdashboard_v1,setnewdashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [newdashboard_v1Props,setnewdashboard_v1Props] = React.useState<any>({})
  const [amrqueuetable_v1,setamrqueuetable_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [amrqueuetable_v1Props,setamrqueuetable_v1Props] = React.useState<any>({})
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
  const [viewamrcase_v1,setviewamrcase_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [viewamrcase_v1Props,setviewamrcase_v1Props] = React.useState<any>({})
  const [documentviewer_v1,setdocumentviewer_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [documentviewer_v1Props,setdocumentviewer_v1Props] = React.useState<any>({})
  const [viewamrcasepggraph_v1,setviewamrcasepggraph_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [viewamrcasepggraph_v1Props,setviewamrcasepggraph_v1Props] = React.useState<any>({})
  const [amrcaseapproval_v1,setamrcaseapproval_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [amrcaseapproval_v1Props,setamrcaseapproval_v1Props] = React.useState<any>({})
  const [report_v1,setreport_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [report_v1Props,setreport_v1Props] = React.useState<any>({})
  const [laptestscreen_v1,setlaptestscreen_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200"
    })
  const [laptestscreen_v1Props,setlaptestscreen_v1Props] = React.useState<any>({})

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
  const [dfd_venuespecialrules_v1Props,setdfd_venuespecialrules_v1Props] = React.useState<any>([])
  const [dfd_specialrulessurerealdb_v1Props,setdfd_specialrulessurerealdb_v1Props] = React.useState<any>([])
  const [dfd_pendingfilingsdashboard_v1Props,setdfd_pendingfilingsdashboard_v1Props] = React.useState<any>([])
  const [dfd_cardsdashboard_v1Props,setdfd_cardsdashboard_v1Props] = React.useState<any>([])
  const [dfd_reportcase_v1Props,setdfd_reportcase_v1Props] = React.useState<any>([])
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
    settext5e6b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue_text17149(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_total_assest42cc7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue0e5a7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queue_desc10020(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_file_text61240(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_maintenance_dueb2661(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_filea7d91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_file_desca182c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending_textb9d5c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_warranty_expiringa065e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending0898e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_pending_desc91c8a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_risk_text42bdc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon_eaa1e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_riska3022(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setslas_at_risk_desc57375(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_textc9a86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticon87359(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejectionff779(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_desc6f72f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtd_textf5ff3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticonb9347(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtd65ae0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollected_mtd_desc21bcb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setkey_performance_indicators_text4f6db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_active_accounts_texted4d7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_active_accounts_text1b45d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider13ca73(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setavg_days_to_judgment_text82b69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setavg_days_to_judgment_text14ed01(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider214543(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_rate_text86ac0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_rate_text10b69f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider39db36(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompliance_score_textbf682(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompliance_score_text1f41e4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider432793(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollection_rate_mtd_text335f5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcollection_rate_mtd_text16258d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrecent_activity_text25b7b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queued_textb4f27(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_queued_text_1dc178(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider1cb266(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudgment_entered_text2f3e7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudgment_entered_text_1d4af4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider2269d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_completed_text835e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_completed_text_197211(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider3acb72(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_passed_text144d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_passed_text188d24(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider4ffc0d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_texte1e9c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_rejection_text16e38f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider52864b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_assigned_textb2d7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_assigned_text15a8e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider6aaa01(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_rejected_text92e50(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_rejected_text11a51a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setback_btn83b00(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamr_textcc6d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_searchc8991(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnew_case_button34af2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_id9a546(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_id734ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_nameb1ea9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_namee48d1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfull_name7a369(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance6a331(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name5ae4f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_name6740a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus_name86d6c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date92fe2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_idb51d8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_btnbd9a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setedit_btn10d01(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_btn_pg_graph1baad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_approveec5db(
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
    setbutton_back1a912(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcraete_header_texte958c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreeq_doc_text78b91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id394f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_namef31ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_button04be7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_info_textd4267(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_name83b58(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_display_idb53b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setssn_masked24ce0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdobea900(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddress4e81d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_name62479(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_off_dated3231(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlast_payment_date500eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider772d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipal_text73a3d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipald89b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setintrest_text58114(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinterest42832(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfees_text67815(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfees9a14f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance_texted1be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balancee5904(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsol_expiry_date69782(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setven_name_textdfed0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate8a16f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividers29243(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountry40b75(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerss6e19f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name27e21(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersss5d68a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudge_name5abc6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssss4ac29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfiling_fee7fab8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersssssec43b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_method80ec2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssssssbc99f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_system9b6bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalid_checklist_text6c6d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchecklist_item_ida8a87(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setitem_name8baf4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_completed2fafb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rules_textda90e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdynamic_icon8f352(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrules_text55ce9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_idc92b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvenue_id063aa(
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
    setback_bt22897(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcraete_header_textae5d6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreeq_doc_text64f93(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_idcc3f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name909a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_button22ede(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_info_text1e3db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_name2af58(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_display_idd1272(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setssn_maskedc4424(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdob29785(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddress70906(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_namea9b98(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_off_date763d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlast_payment_date43bdb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividere3c67(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipal_text6883f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipal65ef3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setintrest_text3a919(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinterest783c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfees_text4a6b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfeesab1fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance_text0b418(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balancee7e5f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsol_expiry_date4dfe3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setven_name_textf01f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatea7e09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersa774c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountydb772(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssaf051(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt7a5a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersssbef5f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudge71e3e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssss61d06(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfiling_fee144cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersssssd333b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_method48ac6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssssss06ce3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefile_system964db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalid_checklist_texta0e64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchecklist_item_id5bd1d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setitem_name24046(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_completed1fd36(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rules_text24a29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdynamic_iconc7b56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settextdb2d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_idcc45c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcraete_header_text26dc6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreeq_doc_text01111(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id08b6e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_nameedf63(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_buttoncb62a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_info_text53524(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_namea603a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcase_display_id3ba0a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setssn_masked36fce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdob19a93(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddress0e39e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_name04ffa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_off_datef5bba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlast_payment_date37076(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdivider9cfd3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipal_textb6dc5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprincipalae986(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setintrest_textfab09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinterestf94e4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfees_textdf3db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfeesd3a22(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance_texta06df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_balance92fd1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsol_expiry_date3775f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setven_name_text4470c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstate10d95(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividers6822a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcountryc8824(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerss8b343(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcourt_name70da0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersssd0216(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setjudge_name833b7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssss9e016(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfiling_fee9d0c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividersssss85652(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_method926d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdividerssssss7d379(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setefiling_system056da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalid_checklist_text6a0da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchecklist_item_id27c72(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setitem_name14346(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_completeda9a9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setspecial_rules_textdd5e9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarning_icon83e9f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrule_texta87d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_id8944a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_btnc64a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject_btn27005(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpass_sign_btn916fa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreport_editor1140e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlap_test_screen_texta85ad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setheader_groupd8ba9({}) 
    setheader_groupd8ba9Props({
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
        setasset_dashboard_group1aa03({}) 
    setasset_dashboard_group1aa03Props({
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
        setamr_queue_group3c082({}) 
    setamr_queue_group3c082Props({
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
        setpending_file_group2128c({}) 
    setpending_file_group2128cProps({
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
        setservice_pending_group8c0ca({}) 
    setservice_pending_group8c0caProps({
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
        setslas_at_risk_group1f8c0({}) 
    setslas_at_risk_group1f8c0Props({
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
        setcourt_rejection_groupdf57a({}) 
    setcourt_rejection_groupdf57aProps({
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
        setcollected_mtd_group0f074({}) 
    setcollected_mtd_group0f074Props({
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
        setoverall_key_performance_indicatorsc2711({}) 
    setoverall_key_performance_indicatorsc2711Props({
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
        setkey_performance_indicator_groupf9eaf({}) 
    setkey_performance_indicator_groupf9eafProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "key_performance_indicators_text",
            "total_active_accounts_text",
            "total_active_accounts_text1",
            "divider1",
            "avg_days_to_judgment_text",
            "avg_days_to_judgment_text1",
            "divider2",
            "court_rejection_rate_text",
            "court_rejection_rate_text1",
            "divider3",
            "compliance_score_text",
            "compliance_score_text1",
            "divider4",
            "collection_rate_mtd_text",
            "collection_rate_mtd_text1",
      ]
      }) 
        setrecent_activity_group91db6({}) 
    setrecent_activity_group91db6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "recent_activity_text",
            "amr_queued_text",
            "amr_queued_text_1",
            "divider1",
            "judgment_entered_text",
            "judgment_entered_text_1",
            "divider2",
            "service_completed_text",
            "service_completed_text_1",
            "divider3",
            "amr_passed_text",
            "amr_passed_text1",
            "divider4",
            "court_rejection_text",
            "court_rejection_text1",
            "divider5",
            "service_assigned_text",
            "service_assigned_text1",
            "divider6",
            "amr_rejected_text",
            "amr_rejected_text1",
      ]
      }) 
        setamr_queue_group79589({}) 
    setamr_queue_group79589Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_btn",
            "bt_search",
            "new_case_button",
      ]
      }) 
        setamr_group17ac4({}) 
    setamr_group17ac4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "amr_text",
      ]
      }) 
    
    setamr_queue_table09598([]) 
    setamr_queue_table09598Props({
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
        setadd_case_groupbe1de({}) 
    setadd_case_groupbe1deProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
            "venue_id",
      ]
      }) 
        setheader_groupc587e({}) 
    setheader_groupc587eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button_back",
            "craete_header_text",
      ]
      }) 
        setrequired_dociument_main_group6f022({}) 
    setrequired_dociument_main_group6f022Props({
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
    
    setdoc_table8bfa1([]) 
    setdoc_table8bfa1Props({
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
        setcase_information_groupe3c1b({}) 
    setcase_information_groupe3c1bProps({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        setcard_group7fa83({}) 
    setcard_group7fa83Props({
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
        setprincipal_groupde6dd({}) 
    setprincipal_groupde6ddProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        setintrest_group44b4d({}) 
    setintrest_group44b4dProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        setfees_groupee523({}) 
    setfees_groupee523Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        settotal_groupd3e06({}) 
    settotal_groupd3e06Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        setvenue_details_group1d734({}) 
    setvenue_details_group1d734Props({
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
            "dividers",
            "county",
            "dividerss",
            "court_name",
            "dividersss",
            "judge_name",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efiling_system",
      ]
      }) 
        setchecklist_main_group32240({}) 
    setchecklist_main_group32240Props({
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
    
    setchecklist_tablee7dea([]) 
    setchecklist_tablee7deaProps({
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
        setspecial_rules_groupf22ab({}) 
    setspecial_rules_groupf22abProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        setspecial_rules96aec({}) 
    setspecial_rules96aecProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dynamic_icon",
            "rule_text",
      ]
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
        setadd_case_grouped126({}) 
    setadd_case_grouped126Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        setheader_groupbd8a8({}) 
    setheader_groupbd8a8Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "back_bt",
            "craete_header_text",
      ]
      }) 
        setrequired_dociument_main_group255d1({}) 
    setrequired_dociument_main_group255d1Props({
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
    
    setdoc_table9c4f7([]) 
    setdoc_table9c4f7Props({
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
        setcase_information_group48f3c({}) 
    setcase_information_group48f3cProps({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        setcard_group4c709({}) 
    setcard_group4c709Props({
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
        setprincipal_group42235({}) 
    setprincipal_group42235Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        setintrest_group65c3b({}) 
    setintrest_group65c3bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        setfees_group8c4a6({}) 
    setfees_group8c4a6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        settotal_groupc52d3({}) 
    settotal_groupc52d3Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        setvenue_details_group51614({}) 
    setvenue_details_group51614Props({
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
            "dividers",
            "county",
            "dividerss",
            "court",
            "dividersss",
            "judge",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efile_system",
      ]
      }) 
        setchecklist_main_group2b466({}) 
    setchecklist_main_group2b466Props({
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
    
    setchecklist_tablecafb0([]) 
    setchecklist_tablecafb0Props({
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
        setspecial_rules_group7ce9f({}) 
    setspecial_rules_group7ce9fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        setspecial_rules7f109({}) 
    setspecial_rules7f109Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dynamic_icon",
            "text",
      ]
      }) 
        setadd_case_group77747({}) 
    setadd_case_group77747Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        setheader_groupbae8a({}) 
    setheader_groupbae8aProps({
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
        setrequired_dociument_main_group999a8({}) 
    setrequired_dociument_main_group999a8Props({
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
    
    setdoc_table45b8d([]) 
    setdoc_table45b8dProps({
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
        setcase_information_group35ed3({}) 
    setcase_information_group35ed3Props({
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
            "debtor_name",
            "case_display_id",
            "ssn_masked",
            "dob",
            "address",
            "creditor_name",
            "charge_off_date",
            "last_payment_date",
            "divider",
            "sol_expiry_date",
      ]
      }) 
        setcard_groupe78fa({}) 
    setcard_groupe78faProps({
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
        setprincipal_group9ae9f({}) 
    setprincipal_group9ae9fProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "principal_text",
            "principal",
      ]
      }) 
        setintrest_group8df75({}) 
    setintrest_group8df75Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "intrest_text",
            "interest",
      ]
      }) 
        setfees_groupac23b({}) 
    setfees_groupac23bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "fees_text",
            "fees",
      ]
      }) 
        settotal_groupe6175({}) 
    settotal_groupe6175Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_balance_text",
            "total_balance",
      ]
      }) 
        setvenue_details_group6904e({}) 
    setvenue_details_group6904eProps({
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
            "dividers",
            "county",
            "dividerss",
            "court_name",
            "dividersss",
            "judge_name",
            "dividerssss",
            "filing_fee",
            "dividersssss",
            "service_method",
            "dividerssssss",
            "efiling_system",
      ]
      }) 
        setchecklist_main_groupda0ff({}) 
    setchecklist_main_groupda0ffProps({
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
    
    setchecklist_table0e25b([]) 
    setchecklist_table0e25bProps({
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
        setspecial_rules_groupc1585({}) 
    setspecial_rules_groupc1585Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "special_rules_text",
      ]
      }) 
        setspecial_rules1fc30({}) 
    setspecial_rules1fc30Props({
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
            "rule_text",
      ]
      }) 
        setdynamicactions37e34({}) 
    setdynamicactions37e34Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel_btn",
            "reject_btn",
            "pass_sign_btn",
      ]
      }) 
        setgroup_report8ef47({}) 
    setgroup_report8ef47Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "account_id",
      ]
      }) 
        setlap_test_screen_group38f1e({}) 
    setlap_test_screen_group38f1eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "lap_test_screen_text",
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
        header_groupd8ba9, 
        setheader_groupd8ba9,
        header_groupd8ba9Props, 
        setheader_groupd8ba9Props,
        asset_dashboard_group1aa03, 
        setasset_dashboard_group1aa03,
        asset_dashboard_group1aa03Props, 
        setasset_dashboard_group1aa03Props,
        amr_queue_group3c082, 
        setamr_queue_group3c082,
        amr_queue_group3c082Props, 
        setamr_queue_group3c082Props,
        pending_file_group2128c, 
        setpending_file_group2128c,
        pending_file_group2128cProps, 
        setpending_file_group2128cProps,
        service_pending_group8c0ca, 
        setservice_pending_group8c0ca,
        service_pending_group8c0caProps, 
        setservice_pending_group8c0caProps,
        slas_at_risk_group1f8c0, 
        setslas_at_risk_group1f8c0,
        slas_at_risk_group1f8c0Props, 
        setslas_at_risk_group1f8c0Props,
        court_rejection_groupdf57a, 
        setcourt_rejection_groupdf57a,
        court_rejection_groupdf57aProps, 
        setcourt_rejection_groupdf57aProps,
        collected_mtd_group0f074, 
        setcollected_mtd_group0f074,
        collected_mtd_group0f074Props, 
        setcollected_mtd_group0f074Props,
        overall_key_performance_indicatorsc2711, 
        setoverall_key_performance_indicatorsc2711,
        overall_key_performance_indicatorsc2711Props, 
        setoverall_key_performance_indicatorsc2711Props,
        key_performance_indicator_groupf9eaf, 
        setkey_performance_indicator_groupf9eaf,
        key_performance_indicator_groupf9eafProps, 
        setkey_performance_indicator_groupf9eafProps,
        recent_activity_group91db6, 
        setrecent_activity_group91db6,
        recent_activity_group91db6Props, 
        setrecent_activity_group91db6Props,
        amr_queue_group79589, 
        setamr_queue_group79589,
        amr_queue_group79589Props, 
        setamr_queue_group79589Props,
        amr_group17ac4, 
        setamr_group17ac4,
        amr_group17ac4Props, 
        setamr_group17ac4Props,
        amr_queue_table09598, 
        setamr_queue_table09598,
        amr_queue_table09598Props, 
        setamr_queue_table09598Props,
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
        add_case_groupbe1de, 
        setadd_case_groupbe1de,
        add_case_groupbe1deProps, 
        setadd_case_groupbe1deProps,
        header_groupc587e, 
        setheader_groupc587e,
        header_groupc587eProps, 
        setheader_groupc587eProps,
        required_dociument_main_group6f022, 
        setrequired_dociument_main_group6f022,
        required_dociument_main_group6f022Props, 
        setrequired_dociument_main_group6f022Props,
        doc_table8bfa1, 
        setdoc_table8bfa1,
        doc_table8bfa1Props, 
        setdoc_table8bfa1Props,
        case_information_groupe3c1b, 
        setcase_information_groupe3c1b,
        case_information_groupe3c1bProps, 
        setcase_information_groupe3c1bProps,
        card_group7fa83, 
        setcard_group7fa83,
        card_group7fa83Props, 
        setcard_group7fa83Props,
        principal_groupde6dd, 
        setprincipal_groupde6dd,
        principal_groupde6ddProps, 
        setprincipal_groupde6ddProps,
        intrest_group44b4d, 
        setintrest_group44b4d,
        intrest_group44b4dProps, 
        setintrest_group44b4dProps,
        fees_groupee523, 
        setfees_groupee523,
        fees_groupee523Props, 
        setfees_groupee523Props,
        total_groupd3e06, 
        settotal_groupd3e06,
        total_groupd3e06Props, 
        settotal_groupd3e06Props,
        venue_details_group1d734, 
        setvenue_details_group1d734,
        venue_details_group1d734Props, 
        setvenue_details_group1d734Props,
        checklist_main_group32240, 
        setchecklist_main_group32240,
        checklist_main_group32240Props, 
        setchecklist_main_group32240Props,
        checklist_tablee7dea, 
        setchecklist_tablee7dea,
        checklist_tablee7deaProps, 
        setchecklist_tablee7deaProps,
        special_rules_groupf22ab, 
        setspecial_rules_groupf22ab,
        special_rules_groupf22abProps, 
        setspecial_rules_groupf22abProps,
        special_rules96aec, 
        setspecial_rules96aec,
        special_rules96aecProps, 
        setspecial_rules96aecProps,
        document_viewer_groupe4249, 
        setdocument_viewer_groupe4249,
        document_viewer_groupe4249Props, 
        setdocument_viewer_groupe4249Props,
        add_case_grouped126, 
        setadd_case_grouped126,
        add_case_grouped126Props, 
        setadd_case_grouped126Props,
        header_groupbd8a8, 
        setheader_groupbd8a8,
        header_groupbd8a8Props, 
        setheader_groupbd8a8Props,
        required_dociument_main_group255d1, 
        setrequired_dociument_main_group255d1,
        required_dociument_main_group255d1Props, 
        setrequired_dociument_main_group255d1Props,
        doc_table9c4f7, 
        setdoc_table9c4f7,
        doc_table9c4f7Props, 
        setdoc_table9c4f7Props,
        case_information_group48f3c, 
        setcase_information_group48f3c,
        case_information_group48f3cProps, 
        setcase_information_group48f3cProps,
        card_group4c709, 
        setcard_group4c709,
        card_group4c709Props, 
        setcard_group4c709Props,
        principal_group42235, 
        setprincipal_group42235,
        principal_group42235Props, 
        setprincipal_group42235Props,
        intrest_group65c3b, 
        setintrest_group65c3b,
        intrest_group65c3bProps, 
        setintrest_group65c3bProps,
        fees_group8c4a6, 
        setfees_group8c4a6,
        fees_group8c4a6Props, 
        setfees_group8c4a6Props,
        total_groupc52d3, 
        settotal_groupc52d3,
        total_groupc52d3Props, 
        settotal_groupc52d3Props,
        venue_details_group51614, 
        setvenue_details_group51614,
        venue_details_group51614Props, 
        setvenue_details_group51614Props,
        checklist_main_group2b466, 
        setchecklist_main_group2b466,
        checklist_main_group2b466Props, 
        setchecklist_main_group2b466Props,
        checklist_tablecafb0, 
        setchecklist_tablecafb0,
        checklist_tablecafb0Props, 
        setchecklist_tablecafb0Props,
        special_rules_group7ce9f, 
        setspecial_rules_group7ce9f,
        special_rules_group7ce9fProps, 
        setspecial_rules_group7ce9fProps,
        special_rules7f109, 
        setspecial_rules7f109,
        special_rules7f109Props, 
        setspecial_rules7f109Props,
        add_case_group77747, 
        setadd_case_group77747,
        add_case_group77747Props, 
        setadd_case_group77747Props,
        header_groupbae8a, 
        setheader_groupbae8a,
        header_groupbae8aProps, 
        setheader_groupbae8aProps,
        required_dociument_main_group999a8, 
        setrequired_dociument_main_group999a8,
        required_dociument_main_group999a8Props, 
        setrequired_dociument_main_group999a8Props,
        doc_table45b8d, 
        setdoc_table45b8d,
        doc_table45b8dProps, 
        setdoc_table45b8dProps,
        case_information_group35ed3, 
        setcase_information_group35ed3,
        case_information_group35ed3Props, 
        setcase_information_group35ed3Props,
        card_groupe78fa, 
        setcard_groupe78fa,
        card_groupe78faProps, 
        setcard_groupe78faProps,
        principal_group9ae9f, 
        setprincipal_group9ae9f,
        principal_group9ae9fProps, 
        setprincipal_group9ae9fProps,
        intrest_group8df75, 
        setintrest_group8df75,
        intrest_group8df75Props, 
        setintrest_group8df75Props,
        fees_groupac23b, 
        setfees_groupac23b,
        fees_groupac23bProps, 
        setfees_groupac23bProps,
        total_groupe6175, 
        settotal_groupe6175,
        total_groupe6175Props, 
        settotal_groupe6175Props,
        venue_details_group6904e, 
        setvenue_details_group6904e,
        venue_details_group6904eProps, 
        setvenue_details_group6904eProps,
        checklist_main_groupda0ff, 
        setchecklist_main_groupda0ff,
        checklist_main_groupda0ffProps, 
        setchecklist_main_groupda0ffProps,
        checklist_table0e25b, 
        setchecklist_table0e25b,
        checklist_table0e25bProps, 
        setchecklist_table0e25bProps,
        special_rules_groupc1585, 
        setspecial_rules_groupc1585,
        special_rules_groupc1585Props, 
        setspecial_rules_groupc1585Props,
        special_rules1fc30, 
        setspecial_rules1fc30,
        special_rules1fc30Props, 
        setspecial_rules1fc30Props,
        dynamicactions37e34, 
        setdynamicactions37e34,
        dynamicactions37e34Props, 
        setdynamicactions37e34Props,
        group_report8ef47, 
        setgroup_report8ef47,
        group_report8ef47Props, 
        setgroup_report8ef47Props,
        lap_test_screen_group38f1e, 
        setlap_test_screen_group38f1e,
        lap_test_screen_group38f1eProps, 
        setlap_test_screen_group38f1eProps,
        text5e6b2,
        settext5e6b2, 
        text5e6b2Props,
        settext5e6b2Props,
        amr_queue_text17149,
        setamr_queue_text17149, 
        amr_queue_text17149Props,
        setamr_queue_text17149Props,
        icon_total_assest42cc7,
        seticon_total_assest42cc7, 
        icon_total_assest42cc7Props,
        seticon_total_assest42cc7Props,
        amr_queue0e5a7,
        setamr_queue0e5a7, 
        amr_queue0e5a7Props,
        setamr_queue0e5a7Props,
        amr_queue_desc10020,
        setamr_queue_desc10020, 
        amr_queue_desc10020Props,
        setamr_queue_desc10020Props,
        pending_file_text61240,
        setpending_file_text61240, 
        pending_file_text61240Props,
        setpending_file_text61240Props,
        icon_maintenance_dueb2661,
        seticon_maintenance_dueb2661, 
        icon_maintenance_dueb2661Props,
        seticon_maintenance_dueb2661Props,
        pending_filea7d91,
        setpending_filea7d91, 
        pending_filea7d91Props,
        setpending_filea7d91Props,
        pending_file_desca182c,
        setpending_file_desca182c, 
        pending_file_desca182cProps,
        setpending_file_desca182cProps,
        service_pending_textb9d5c,
        setservice_pending_textb9d5c, 
        service_pending_textb9d5cProps,
        setservice_pending_textb9d5cProps,
        icon_warranty_expiringa065e,
        seticon_warranty_expiringa065e, 
        icon_warranty_expiringa065eProps,
        seticon_warranty_expiringa065eProps,
        service_pending0898e,
        setservice_pending0898e, 
        service_pending0898eProps,
        setservice_pending0898eProps,
        service_pending_desc91c8a,
        setservice_pending_desc91c8a, 
        service_pending_desc91c8aProps,
        setservice_pending_desc91c8aProps,
        slas_at_risk_text42bdc,
        setslas_at_risk_text42bdc, 
        slas_at_risk_text42bdcProps,
        setslas_at_risk_text42bdcProps,
        icon_eaa1e,
        seticon_eaa1e, 
        icon_eaa1eProps,
        seticon_eaa1eProps,
        slas_at_riska3022,
        setslas_at_riska3022, 
        slas_at_riska3022Props,
        setslas_at_riska3022Props,
        slas_at_risk_desc57375,
        setslas_at_risk_desc57375, 
        slas_at_risk_desc57375Props,
        setslas_at_risk_desc57375Props,
        court_rejection_textc9a86,
        setcourt_rejection_textc9a86, 
        court_rejection_textc9a86Props,
        setcourt_rejection_textc9a86Props,
        icon87359,
        seticon87359, 
        icon87359Props,
        seticon87359Props,
        court_rejectionff779,
        setcourt_rejectionff779, 
        court_rejectionff779Props,
        setcourt_rejectionff779Props,
        court_rejection_desc6f72f,
        setcourt_rejection_desc6f72f, 
        court_rejection_desc6f72fProps,
        setcourt_rejection_desc6f72fProps,
        collected_mtd_textf5ff3,
        setcollected_mtd_textf5ff3, 
        collected_mtd_textf5ff3Props,
        setcollected_mtd_textf5ff3Props,
        iconb9347,
        seticonb9347, 
        iconb9347Props,
        seticonb9347Props,
        collected_mtd65ae0,
        setcollected_mtd65ae0, 
        collected_mtd65ae0Props,
        setcollected_mtd65ae0Props,
        collected_mtd_desc21bcb,
        setcollected_mtd_desc21bcb, 
        collected_mtd_desc21bcbProps,
        setcollected_mtd_desc21bcbProps,
        key_performance_indicators_text4f6db,
        setkey_performance_indicators_text4f6db, 
        key_performance_indicators_text4f6dbProps,
        setkey_performance_indicators_text4f6dbProps,
        total_active_accounts_texted4d7,
        settotal_active_accounts_texted4d7, 
        total_active_accounts_texted4d7Props,
        settotal_active_accounts_texted4d7Props,
        total_active_accounts_text1b45d0,
        settotal_active_accounts_text1b45d0, 
        total_active_accounts_text1b45d0Props,
        settotal_active_accounts_text1b45d0Props,
        divider13ca73,
        setdivider13ca73, 
        divider13ca73Props,
        setdivider13ca73Props,
        avg_days_to_judgment_text82b69,
        setavg_days_to_judgment_text82b69, 
        avg_days_to_judgment_text82b69Props,
        setavg_days_to_judgment_text82b69Props,
        avg_days_to_judgment_text14ed01,
        setavg_days_to_judgment_text14ed01, 
        avg_days_to_judgment_text14ed01Props,
        setavg_days_to_judgment_text14ed01Props,
        divider214543,
        setdivider214543, 
        divider214543Props,
        setdivider214543Props,
        court_rejection_rate_text86ac0,
        setcourt_rejection_rate_text86ac0, 
        court_rejection_rate_text86ac0Props,
        setcourt_rejection_rate_text86ac0Props,
        court_rejection_rate_text10b69f,
        setcourt_rejection_rate_text10b69f, 
        court_rejection_rate_text10b69fProps,
        setcourt_rejection_rate_text10b69fProps,
        divider39db36,
        setdivider39db36, 
        divider39db36Props,
        setdivider39db36Props,
        compliance_score_textbf682,
        setcompliance_score_textbf682, 
        compliance_score_textbf682Props,
        setcompliance_score_textbf682Props,
        compliance_score_text1f41e4,
        setcompliance_score_text1f41e4, 
        compliance_score_text1f41e4Props,
        setcompliance_score_text1f41e4Props,
        divider432793,
        setdivider432793, 
        divider432793Props,
        setdivider432793Props,
        collection_rate_mtd_text335f5,
        setcollection_rate_mtd_text335f5, 
        collection_rate_mtd_text335f5Props,
        setcollection_rate_mtd_text335f5Props,
        collection_rate_mtd_text16258d,
        setcollection_rate_mtd_text16258d, 
        collection_rate_mtd_text16258dProps,
        setcollection_rate_mtd_text16258dProps,
        recent_activity_text25b7b,
        setrecent_activity_text25b7b, 
        recent_activity_text25b7bProps,
        setrecent_activity_text25b7bProps,
        amr_queued_textb4f27,
        setamr_queued_textb4f27, 
        amr_queued_textb4f27Props,
        setamr_queued_textb4f27Props,
        amr_queued_text_1dc178,
        setamr_queued_text_1dc178, 
        amr_queued_text_1dc178Props,
        setamr_queued_text_1dc178Props,
        divider1cb266,
        setdivider1cb266, 
        divider1cb266Props,
        setdivider1cb266Props,
        judgment_entered_text2f3e7,
        setjudgment_entered_text2f3e7, 
        judgment_entered_text2f3e7Props,
        setjudgment_entered_text2f3e7Props,
        judgment_entered_text_1d4af4,
        setjudgment_entered_text_1d4af4, 
        judgment_entered_text_1d4af4Props,
        setjudgment_entered_text_1d4af4Props,
        divider2269d0,
        setdivider2269d0, 
        divider2269d0Props,
        setdivider2269d0Props,
        service_completed_text835e5,
        setservice_completed_text835e5, 
        service_completed_text835e5Props,
        setservice_completed_text835e5Props,
        service_completed_text_197211,
        setservice_completed_text_197211, 
        service_completed_text_197211Props,
        setservice_completed_text_197211Props,
        divider3acb72,
        setdivider3acb72, 
        divider3acb72Props,
        setdivider3acb72Props,
        amr_passed_text144d2,
        setamr_passed_text144d2, 
        amr_passed_text144d2Props,
        setamr_passed_text144d2Props,
        amr_passed_text188d24,
        setamr_passed_text188d24, 
        amr_passed_text188d24Props,
        setamr_passed_text188d24Props,
        divider4ffc0d,
        setdivider4ffc0d, 
        divider4ffc0dProps,
        setdivider4ffc0dProps,
        court_rejection_texte1e9c,
        setcourt_rejection_texte1e9c, 
        court_rejection_texte1e9cProps,
        setcourt_rejection_texte1e9cProps,
        court_rejection_text16e38f,
        setcourt_rejection_text16e38f, 
        court_rejection_text16e38fProps,
        setcourt_rejection_text16e38fProps,
        divider52864b,
        setdivider52864b, 
        divider52864bProps,
        setdivider52864bProps,
        service_assigned_textb2d7d,
        setservice_assigned_textb2d7d, 
        service_assigned_textb2d7dProps,
        setservice_assigned_textb2d7dProps,
        service_assigned_text15a8e1,
        setservice_assigned_text15a8e1, 
        service_assigned_text15a8e1Props,
        setservice_assigned_text15a8e1Props,
        divider6aaa01,
        setdivider6aaa01, 
        divider6aaa01Props,
        setdivider6aaa01Props,
        amr_rejected_text92e50,
        setamr_rejected_text92e50, 
        amr_rejected_text92e50Props,
        setamr_rejected_text92e50Props,
        amr_rejected_text11a51a,
        setamr_rejected_text11a51a, 
        amr_rejected_text11a51aProps,
        setamr_rejected_text11a51aProps,
        back_btn83b00,
        setback_btn83b00, 
        back_btn83b00Props,
        setback_btn83b00Props,
        amr_textcc6d3,
        setamr_textcc6d3, 
        amr_textcc6d3Props,
        setamr_textcc6d3Props,
        bt_searchc8991,
        setbt_searchc8991, 
        bt_searchc8991Props,
        setbt_searchc8991Props,
        new_case_button34af2,
        setnew_case_button34af2, 
        new_case_button34af2Props,
        setnew_case_button34af2Props,
        account_id9a546,
        setaccount_id9a546, 
        account_id9a546Props,
        setaccount_id9a546Props,
        case_id734ed,
        setcase_id734ed, 
        case_id734edProps,
        setcase_id734edProps,
        debtor_nameb1ea9,
        setdebtor_nameb1ea9, 
        debtor_nameb1ea9Props,
        setdebtor_nameb1ea9Props,
        creditor_namee48d1,
        setcreditor_namee48d1, 
        creditor_namee48d1Props,
        setcreditor_namee48d1Props,
        full_name7a369,
        setfull_name7a369, 
        full_name7a369Props,
        setfull_name7a369Props,
        total_balance6a331,
        settotal_balance6a331, 
        total_balance6a331Props,
        settotal_balance6a331Props,
        court_name5ae4f,
        setcourt_name5ae4f, 
        court_name5ae4fProps,
        setcourt_name5ae4fProps,
        priority_name6740a,
        setpriority_name6740a, 
        priority_name6740aProps,
        setpriority_name6740aProps,
        status_name86d6c,
        setstatus_name86d6c, 
        status_name86d6cProps,
        setstatus_name86d6cProps,
        trs_created_date92fe2,
        settrs_created_date92fe2, 
        trs_created_date92fe2Props,
        settrs_created_date92fe2Props,
        venue_idb51d8,
        setvenue_idb51d8, 
        venue_idb51d8Props,
        setvenue_idb51d8Props,
        view_btnbd9a5,
        setview_btnbd9a5, 
        view_btnbd9a5Props,
        setview_btnbd9a5Props,
        edit_btn10d01,
        setedit_btn10d01, 
        edit_btn10d01Props,
        setedit_btn10d01Props,
        view_btn_pg_graph1baad,
        setview_btn_pg_graph1baad, 
        view_btn_pg_graph1baadProps,
        setview_btn_pg_graph1baadProps,
        bt_approveec5db,
        setbt_approveec5db, 
        bt_approveec5dbProps,
        setbt_approveec5dbProps,
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
        button_back1a912,
        setbutton_back1a912, 
        button_back1a912Props,
        setbutton_back1a912Props,
        craete_header_texte958c,
        setcraete_header_texte958c, 
        craete_header_texte958cProps,
        setcraete_header_texte958cProps,
        reeq_doc_text78b91,
        setreeq_doc_text78b91, 
        reeq_doc_text78b91Props,
        setreeq_doc_text78b91Props,
        attachment_id394f7,
        setattachment_id394f7, 
        attachment_id394f7Props,
        setattachment_id394f7Props,
        doc_namef31ac,
        setdoc_namef31ac, 
        doc_namef31acProps,
        setdoc_namef31acProps,
        view_button04be7,
        setview_button04be7, 
        view_button04be7Props,
        setview_button04be7Props,
        case_info_textd4267,
        setcase_info_textd4267, 
        case_info_textd4267Props,
        setcase_info_textd4267Props,
        debtor_name83b58,
        setdebtor_name83b58, 
        debtor_name83b58Props,
        setdebtor_name83b58Props,
        case_display_idb53b9,
        setcase_display_idb53b9, 
        case_display_idb53b9Props,
        setcase_display_idb53b9Props,
        ssn_masked24ce0,
        setssn_masked24ce0, 
        ssn_masked24ce0Props,
        setssn_masked24ce0Props,
        dobea900,
        setdobea900, 
        dobea900Props,
        setdobea900Props,
        address4e81d,
        setaddress4e81d, 
        address4e81dProps,
        setaddress4e81dProps,
        creditor_name62479,
        setcreditor_name62479, 
        creditor_name62479Props,
        setcreditor_name62479Props,
        charge_off_dated3231,
        setcharge_off_dated3231, 
        charge_off_dated3231Props,
        setcharge_off_dated3231Props,
        last_payment_date500eb,
        setlast_payment_date500eb, 
        last_payment_date500ebProps,
        setlast_payment_date500ebProps,
        divider772d9,
        setdivider772d9, 
        divider772d9Props,
        setdivider772d9Props,
        principal_text73a3d,
        setprincipal_text73a3d, 
        principal_text73a3dProps,
        setprincipal_text73a3dProps,
        principald89b4,
        setprincipald89b4, 
        principald89b4Props,
        setprincipald89b4Props,
        intrest_text58114,
        setintrest_text58114, 
        intrest_text58114Props,
        setintrest_text58114Props,
        interest42832,
        setinterest42832, 
        interest42832Props,
        setinterest42832Props,
        fees_text67815,
        setfees_text67815, 
        fees_text67815Props,
        setfees_text67815Props,
        fees9a14f,
        setfees9a14f, 
        fees9a14fProps,
        setfees9a14fProps,
        total_balance_texted1be,
        settotal_balance_texted1be, 
        total_balance_texted1beProps,
        settotal_balance_texted1beProps,
        total_balancee5904,
        settotal_balancee5904, 
        total_balancee5904Props,
        settotal_balancee5904Props,
        sol_expiry_date69782,
        setsol_expiry_date69782, 
        sol_expiry_date69782Props,
        setsol_expiry_date69782Props,
        ven_name_textdfed0,
        setven_name_textdfed0, 
        ven_name_textdfed0Props,
        setven_name_textdfed0Props,
        state8a16f,
        setstate8a16f, 
        state8a16fProps,
        setstate8a16fProps,
        dividers29243,
        setdividers29243, 
        dividers29243Props,
        setdividers29243Props,
        country40b75,
        setcountry40b75, 
        country40b75Props,
        setcountry40b75Props,
        dividerss6e19f,
        setdividerss6e19f, 
        dividerss6e19fProps,
        setdividerss6e19fProps,
        court_name27e21,
        setcourt_name27e21, 
        court_name27e21Props,
        setcourt_name27e21Props,
        dividersss5d68a,
        setdividersss5d68a, 
        dividersss5d68aProps,
        setdividersss5d68aProps,
        judge_name5abc6,
        setjudge_name5abc6, 
        judge_name5abc6Props,
        setjudge_name5abc6Props,
        dividerssss4ac29,
        setdividerssss4ac29, 
        dividerssss4ac29Props,
        setdividerssss4ac29Props,
        filing_fee7fab8,
        setfiling_fee7fab8, 
        filing_fee7fab8Props,
        setfiling_fee7fab8Props,
        dividersssssec43b,
        setdividersssssec43b, 
        dividersssssec43bProps,
        setdividersssssec43bProps,
        service_method80ec2,
        setservice_method80ec2, 
        service_method80ec2Props,
        setservice_method80ec2Props,
        dividerssssssbc99f,
        setdividerssssssbc99f, 
        dividerssssssbc99fProps,
        setdividerssssssbc99fProps,
        efiling_system9b6bc,
        setefiling_system9b6bc, 
        efiling_system9b6bcProps,
        setefiling_system9b6bcProps,
        valid_checklist_text6c6d2,
        setvalid_checklist_text6c6d2, 
        valid_checklist_text6c6d2Props,
        setvalid_checklist_text6c6d2Props,
        checklist_item_ida8a87,
        setchecklist_item_ida8a87, 
        checklist_item_ida8a87Props,
        setchecklist_item_ida8a87Props,
        item_name8baf4,
        setitem_name8baf4, 
        item_name8baf4Props,
        setitem_name8baf4Props,
        is_completed2fafb,
        setis_completed2fafb, 
        is_completed2fafbProps,
        setis_completed2fafbProps,
        special_rules_textda90e,
        setspecial_rules_textda90e, 
        special_rules_textda90eProps,
        setspecial_rules_textda90eProps,
        dynamic_icon8f352,
        setdynamic_icon8f352, 
        dynamic_icon8f352Props,
        setdynamic_icon8f352Props,
        rules_text55ce9,
        setrules_text55ce9, 
        rules_text55ce9Props,
        setrules_text55ce9Props,
        account_idc92b6,
        setaccount_idc92b6, 
        account_idc92b6Props,
        setaccount_idc92b6Props,
        venue_id063aa,
        setvenue_id063aa, 
        venue_id063aaProps,
        setvenue_id063aaProps,
        documentviewer64771,
        setdocumentviewer64771, 
        documentviewer64771Props,
        setdocumentviewer64771Props,
        back_bt22897,
        setback_bt22897, 
        back_bt22897Props,
        setback_bt22897Props,
        craete_header_textae5d6,
        setcraete_header_textae5d6, 
        craete_header_textae5d6Props,
        setcraete_header_textae5d6Props,
        reeq_doc_text64f93,
        setreeq_doc_text64f93, 
        reeq_doc_text64f93Props,
        setreeq_doc_text64f93Props,
        attachment_idcc3f4,
        setattachment_idcc3f4, 
        attachment_idcc3f4Props,
        setattachment_idcc3f4Props,
        doc_name909a3,
        setdoc_name909a3, 
        doc_name909a3Props,
        setdoc_name909a3Props,
        view_button22ede,
        setview_button22ede, 
        view_button22edeProps,
        setview_button22edeProps,
        case_info_text1e3db,
        setcase_info_text1e3db, 
        case_info_text1e3dbProps,
        setcase_info_text1e3dbProps,
        debtor_name2af58,
        setdebtor_name2af58, 
        debtor_name2af58Props,
        setdebtor_name2af58Props,
        case_display_idd1272,
        setcase_display_idd1272, 
        case_display_idd1272Props,
        setcase_display_idd1272Props,
        ssn_maskedc4424,
        setssn_maskedc4424, 
        ssn_maskedc4424Props,
        setssn_maskedc4424Props,
        dob29785,
        setdob29785, 
        dob29785Props,
        setdob29785Props,
        address70906,
        setaddress70906, 
        address70906Props,
        setaddress70906Props,
        creditor_namea9b98,
        setcreditor_namea9b98, 
        creditor_namea9b98Props,
        setcreditor_namea9b98Props,
        charge_off_date763d0,
        setcharge_off_date763d0, 
        charge_off_date763d0Props,
        setcharge_off_date763d0Props,
        last_payment_date43bdb,
        setlast_payment_date43bdb, 
        last_payment_date43bdbProps,
        setlast_payment_date43bdbProps,
        dividere3c67,
        setdividere3c67, 
        dividere3c67Props,
        setdividere3c67Props,
        principal_text6883f,
        setprincipal_text6883f, 
        principal_text6883fProps,
        setprincipal_text6883fProps,
        principal65ef3,
        setprincipal65ef3, 
        principal65ef3Props,
        setprincipal65ef3Props,
        intrest_text3a919,
        setintrest_text3a919, 
        intrest_text3a919Props,
        setintrest_text3a919Props,
        interest783c4,
        setinterest783c4, 
        interest783c4Props,
        setinterest783c4Props,
        fees_text4a6b6,
        setfees_text4a6b6, 
        fees_text4a6b6Props,
        setfees_text4a6b6Props,
        feesab1fe,
        setfeesab1fe, 
        feesab1feProps,
        setfeesab1feProps,
        total_balance_text0b418,
        settotal_balance_text0b418, 
        total_balance_text0b418Props,
        settotal_balance_text0b418Props,
        total_balancee7e5f,
        settotal_balancee7e5f, 
        total_balancee7e5fProps,
        settotal_balancee7e5fProps,
        sol_expiry_date4dfe3,
        setsol_expiry_date4dfe3, 
        sol_expiry_date4dfe3Props,
        setsol_expiry_date4dfe3Props,
        ven_name_textf01f8,
        setven_name_textf01f8, 
        ven_name_textf01f8Props,
        setven_name_textf01f8Props,
        statea7e09,
        setstatea7e09, 
        statea7e09Props,
        setstatea7e09Props,
        dividersa774c,
        setdividersa774c, 
        dividersa774cProps,
        setdividersa774cProps,
        countydb772,
        setcountydb772, 
        countydb772Props,
        setcountydb772Props,
        dividerssaf051,
        setdividerssaf051, 
        dividerssaf051Props,
        setdividerssaf051Props,
        court7a5a6,
        setcourt7a5a6, 
        court7a5a6Props,
        setcourt7a5a6Props,
        dividersssbef5f,
        setdividersssbef5f, 
        dividersssbef5fProps,
        setdividersssbef5fProps,
        judge71e3e,
        setjudge71e3e, 
        judge71e3eProps,
        setjudge71e3eProps,
        dividerssss61d06,
        setdividerssss61d06, 
        dividerssss61d06Props,
        setdividerssss61d06Props,
        filing_fee144cd,
        setfiling_fee144cd, 
        filing_fee144cdProps,
        setfiling_fee144cdProps,
        dividersssssd333b,
        setdividersssssd333b, 
        dividersssssd333bProps,
        setdividersssssd333bProps,
        service_method48ac6,
        setservice_method48ac6, 
        service_method48ac6Props,
        setservice_method48ac6Props,
        dividerssssss06ce3,
        setdividerssssss06ce3, 
        dividerssssss06ce3Props,
        setdividerssssss06ce3Props,
        efile_system964db,
        setefile_system964db, 
        efile_system964dbProps,
        setefile_system964dbProps,
        valid_checklist_texta0e64,
        setvalid_checklist_texta0e64, 
        valid_checklist_texta0e64Props,
        setvalid_checklist_texta0e64Props,
        checklist_item_id5bd1d,
        setchecklist_item_id5bd1d, 
        checklist_item_id5bd1dProps,
        setchecklist_item_id5bd1dProps,
        item_name24046,
        setitem_name24046, 
        item_name24046Props,
        setitem_name24046Props,
        is_completed1fd36,
        setis_completed1fd36, 
        is_completed1fd36Props,
        setis_completed1fd36Props,
        special_rules_text24a29,
        setspecial_rules_text24a29, 
        special_rules_text24a29Props,
        setspecial_rules_text24a29Props,
        dynamic_iconc7b56,
        setdynamic_iconc7b56, 
        dynamic_iconc7b56Props,
        setdynamic_iconc7b56Props,
        textdb2d4,
        settextdb2d4, 
        textdb2d4Props,
        settextdb2d4Props,
        account_idcc45c,
        setaccount_idcc45c, 
        account_idcc45cProps,
        setaccount_idcc45cProps,
        craete_header_text26dc6,
        setcraete_header_text26dc6, 
        craete_header_text26dc6Props,
        setcraete_header_text26dc6Props,
        reeq_doc_text01111,
        setreeq_doc_text01111, 
        reeq_doc_text01111Props,
        setreeq_doc_text01111Props,
        attachment_id08b6e,
        setattachment_id08b6e, 
        attachment_id08b6eProps,
        setattachment_id08b6eProps,
        doc_nameedf63,
        setdoc_nameedf63, 
        doc_nameedf63Props,
        setdoc_nameedf63Props,
        view_buttoncb62a,
        setview_buttoncb62a, 
        view_buttoncb62aProps,
        setview_buttoncb62aProps,
        case_info_text53524,
        setcase_info_text53524, 
        case_info_text53524Props,
        setcase_info_text53524Props,
        debtor_namea603a,
        setdebtor_namea603a, 
        debtor_namea603aProps,
        setdebtor_namea603aProps,
        case_display_id3ba0a,
        setcase_display_id3ba0a, 
        case_display_id3ba0aProps,
        setcase_display_id3ba0aProps,
        ssn_masked36fce,
        setssn_masked36fce, 
        ssn_masked36fceProps,
        setssn_masked36fceProps,
        dob19a93,
        setdob19a93, 
        dob19a93Props,
        setdob19a93Props,
        address0e39e,
        setaddress0e39e, 
        address0e39eProps,
        setaddress0e39eProps,
        creditor_name04ffa,
        setcreditor_name04ffa, 
        creditor_name04ffaProps,
        setcreditor_name04ffaProps,
        charge_off_datef5bba,
        setcharge_off_datef5bba, 
        charge_off_datef5bbaProps,
        setcharge_off_datef5bbaProps,
        last_payment_date37076,
        setlast_payment_date37076, 
        last_payment_date37076Props,
        setlast_payment_date37076Props,
        divider9cfd3,
        setdivider9cfd3, 
        divider9cfd3Props,
        setdivider9cfd3Props,
        principal_textb6dc5,
        setprincipal_textb6dc5, 
        principal_textb6dc5Props,
        setprincipal_textb6dc5Props,
        principalae986,
        setprincipalae986, 
        principalae986Props,
        setprincipalae986Props,
        intrest_textfab09,
        setintrest_textfab09, 
        intrest_textfab09Props,
        setintrest_textfab09Props,
        interestf94e4,
        setinterestf94e4, 
        interestf94e4Props,
        setinterestf94e4Props,
        fees_textdf3db,
        setfees_textdf3db, 
        fees_textdf3dbProps,
        setfees_textdf3dbProps,
        feesd3a22,
        setfeesd3a22, 
        feesd3a22Props,
        setfeesd3a22Props,
        total_balance_texta06df,
        settotal_balance_texta06df, 
        total_balance_texta06dfProps,
        settotal_balance_texta06dfProps,
        total_balance92fd1,
        settotal_balance92fd1, 
        total_balance92fd1Props,
        settotal_balance92fd1Props,
        sol_expiry_date3775f,
        setsol_expiry_date3775f, 
        sol_expiry_date3775fProps,
        setsol_expiry_date3775fProps,
        ven_name_text4470c,
        setven_name_text4470c, 
        ven_name_text4470cProps,
        setven_name_text4470cProps,
        state10d95,
        setstate10d95, 
        state10d95Props,
        setstate10d95Props,
        dividers6822a,
        setdividers6822a, 
        dividers6822aProps,
        setdividers6822aProps,
        countryc8824,
        setcountryc8824, 
        countryc8824Props,
        setcountryc8824Props,
        dividerss8b343,
        setdividerss8b343, 
        dividerss8b343Props,
        setdividerss8b343Props,
        court_name70da0,
        setcourt_name70da0, 
        court_name70da0Props,
        setcourt_name70da0Props,
        dividersssd0216,
        setdividersssd0216, 
        dividersssd0216Props,
        setdividersssd0216Props,
        judge_name833b7,
        setjudge_name833b7, 
        judge_name833b7Props,
        setjudge_name833b7Props,
        dividerssss9e016,
        setdividerssss9e016, 
        dividerssss9e016Props,
        setdividerssss9e016Props,
        filing_fee9d0c4,
        setfiling_fee9d0c4, 
        filing_fee9d0c4Props,
        setfiling_fee9d0c4Props,
        dividersssss85652,
        setdividersssss85652, 
        dividersssss85652Props,
        setdividersssss85652Props,
        service_method926d2,
        setservice_method926d2, 
        service_method926d2Props,
        setservice_method926d2Props,
        dividerssssss7d379,
        setdividerssssss7d379, 
        dividerssssss7d379Props,
        setdividerssssss7d379Props,
        efiling_system056da,
        setefiling_system056da, 
        efiling_system056daProps,
        setefiling_system056daProps,
        valid_checklist_text6a0da,
        setvalid_checklist_text6a0da, 
        valid_checklist_text6a0daProps,
        setvalid_checklist_text6a0daProps,
        checklist_item_id27c72,
        setchecklist_item_id27c72, 
        checklist_item_id27c72Props,
        setchecklist_item_id27c72Props,
        item_name14346,
        setitem_name14346, 
        item_name14346Props,
        setitem_name14346Props,
        is_completeda9a9a,
        setis_completeda9a9a, 
        is_completeda9a9aProps,
        setis_completeda9a9aProps,
        special_rules_textdd5e9,
        setspecial_rules_textdd5e9, 
        special_rules_textdd5e9Props,
        setspecial_rules_textdd5e9Props,
        warning_icon83e9f,
        setwarning_icon83e9f, 
        warning_icon83e9fProps,
        setwarning_icon83e9fProps,
        rule_texta87d5,
        setrule_texta87d5, 
        rule_texta87d5Props,
        setrule_texta87d5Props,
        account_id8944a,
        setaccount_id8944a, 
        account_id8944aProps,
        setaccount_id8944aProps,
        cancel_btnc64a4,
        setcancel_btnc64a4, 
        cancel_btnc64a4Props,
        setcancel_btnc64a4Props,
        reject_btn27005,
        setreject_btn27005, 
        reject_btn27005Props,
        setreject_btn27005Props,
        pass_sign_btn916fa,
        setpass_sign_btn916fa, 
        pass_sign_btn916faProps,
        setpass_sign_btn916faProps,
        report_editor1140e,
        setreport_editor1140e, 
        report_editor1140eProps,
        setreport_editor1140eProps,
        lap_test_screen_texta85ad,
        setlap_test_screen_texta85ad, 
        lap_test_screen_texta85adProps,
        setlap_test_screen_texta85adProps,
        ////// screen states 
          newdashboard_v1,
          setnewdashboard_v1,
          newdashboard_v1Props,
          setnewdashboard_v1Props,
          amrqueuetable_v1,
          setamrqueuetable_v1,
          amrqueuetable_v1Props,
          setamrqueuetable_v1Props,
          amrqueuesearch_v1,
          setamrqueuesearch_v1,
          amrqueuesearch_v1Props,
          setamrqueuesearch_v1Props,
          addcase_v1,
          setaddcase_v1,
          addcase_v1Props,
          setaddcase_v1Props,
          viewamrcase_v1,
          setviewamrcase_v1,
          viewamrcase_v1Props,
          setviewamrcase_v1Props,
          documentviewer_v1,
          setdocumentviewer_v1,
          documentviewer_v1Props,
          setdocumentviewer_v1Props,
          viewamrcasepggraph_v1,
          setviewamrcasepggraph_v1,
          viewamrcasepggraph_v1Props,
          setviewamrcasepggraph_v1Props,
          amrcaseapproval_v1,
          setamrcaseapproval_v1,
          amrcaseapproval_v1Props,
          setamrcaseapproval_v1Props,
          report_v1,
          setreport_v1,
          report_v1Props,
          setreport_v1Props,
          laptestscreen_v1,
          setlaptestscreen_v1,
          laptestscreen_v1Props,
          setlaptestscreen_v1Props,
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
        dfd_venuespecialrules_v1Props,
        setdfd_venuespecialrules_v1Props,
        dfd_specialrulessurerealdb_v1Props,
        setdfd_specialrulessurerealdb_v1Props,
        dfd_pendingfilingsdashboard_v1Props,
        setdfd_pendingfilingsdashboard_v1Props,
        dfd_cardsdashboard_v1Props,
        setdfd_cardsdashboard_v1Props,
        dfd_reportcase_v1Props,
        setdfd_reportcase_v1Props,
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