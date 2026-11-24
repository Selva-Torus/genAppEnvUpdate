


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
  return_queue_journey_group92c55: any 
  setreturn_queue_journey_group92c55: React.Dispatch<React.SetStateAction<any>>
  return_queue_journey_group92c55Props: any 
  setreturn_queue_journey_group92c55Props: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0: any 
  setreturn_queue_table267f0: React.Dispatch<React.SetStateAction<any>>
  return_queue_table267f0Props: any 
  setreturn_queue_table267f0Props: React.Dispatch<React.SetStateAction<any>>
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
  notification_pending_tab223c7: any 
  setnotification_pending_tab223c7: React.Dispatch<React.SetStateAction<any>>
  notification_pending_tab223c7Props: any 
  setnotification_pending_tab223c7Props: React.Dispatch<React.SetStateAction<any>>
  notification_pending_table45836: any 
  setnotification_pending_table45836: React.Dispatch<React.SetStateAction<any>>
  notification_pending_table45836Props: any 
  setnotification_pending_table45836Props: React.Dispatch<React.SetStateAction<any>>
  notification_pending_journey_groupc9534: any 
  setnotification_pending_journey_groupc9534: React.Dispatch<React.SetStateAction<any>>
  notification_pending_journey_groupc9534Props: any 
  setnotification_pending_journey_groupc9534Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_tabfb252: any 
  setenquiry_tabfb252: React.Dispatch<React.SetStateAction<any>>
  enquiry_tabfb252Props: any 
  setenquiry_tabfb252Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_tableb3b4e: any 
  setenquiry_tableb3b4e: React.Dispatch<React.SetStateAction<any>>
  enquiry_tableb3b4eProps: any 
  setenquiry_tableb3b4eProps: React.Dispatch<React.SetStateAction<any>>
  enquiry_journey_group047c9: any 
  setenquiry_journey_group047c9: React.Dispatch<React.SetStateAction<any>>
  enquiry_journey_group047c9Props: any 
  setenquiry_journey_group047c9Props: React.Dispatch<React.SetStateAction<any>>
  group7e695: any 
  setgroup7e695: React.Dispatch<React.SetStateAction<any>>
  group7e695Props: any 
  setgroup7e695Props: React.Dispatch<React.SetStateAction<any>>
  main_group9066f: any 
  setmain_group9066f: React.Dispatch<React.SetStateAction<any>>
  main_group9066fProps: any 
  setmain_group9066fProps: React.Dispatch<React.SetStateAction<any>>
  payment_info_group1bac9: any 
  setpayment_info_group1bac9: React.Dispatch<React.SetStateAction<any>>
  payment_info_group1bac9Props: any 
  setpayment_info_group1bac9Props: React.Dispatch<React.SetStateAction<any>>
  midynamicactions3b39d: any 
  setmidynamicactions3b39d: React.Dispatch<React.SetStateAction<any>>
  midynamicactions3b39dProps: any 
  setmidynamicactions3b39dProps: React.Dispatch<React.SetStateAction<any>>
  general_info_groupc83e6: any 
  setgeneral_info_groupc83e6: React.Dispatch<React.SetStateAction<any>>
  general_info_groupc83e6Props: any 
  setgeneral_info_groupc83e6Props: React.Dispatch<React.SetStateAction<any>>
  dbtr_info_group4e8ea: any 
  setdbtr_info_group4e8ea: React.Dispatch<React.SetStateAction<any>>
  dbtr_info_group4e8eaProps: any 
  setdbtr_info_group4e8eaProps: React.Dispatch<React.SetStateAction<any>>
  cr_info_groupb01e8: any 
  setcr_info_groupb01e8: React.Dispatch<React.SetStateAction<any>>
  cr_info_groupb01e8Props: any 
  setcr_info_groupb01e8Props: React.Dispatch<React.SetStateAction<any>>
  chrg_info_group76ab0: any 
  setchrg_info_group76ab0: React.Dispatch<React.SetStateAction<any>>
  chrg_info_group76ab0Props: any 
  setchrg_info_group76ab0Props: React.Dispatch<React.SetStateAction<any>>
  add_info_groupe8dc6: any 
  setadd_info_groupe8dc6: React.Dispatch<React.SetStateAction<any>>
  add_info_groupe8dc6Props: any 
  setadd_info_groupe8dc6Props: React.Dispatch<React.SetStateAction<any>>
  beneficiary_list_group9d9c4: any 
  setbeneficiary_list_group9d9c4: React.Dispatch<React.SetStateAction<any>>
  beneficiary_list_group9d9c4Props: any 
  setbeneficiary_list_group9d9c4Props: React.Dispatch<React.SetStateAction<any>>
  ben_list_groupb24ac: any 
  setben_list_groupb24ac: React.Dispatch<React.SetStateAction<any>>
  ben_list_groupb24acProps: any 
  setben_list_groupb24acProps: React.Dispatch<React.SetStateAction<any>>
  benc_groupa95a7: any 
  setbenc_groupa95a7: React.Dispatch<React.SetStateAction<any>>
  benc_groupa95a7Props: any 
  setbenc_groupa95a7Props: React.Dispatch<React.SetStateAction<any>>
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
  returnreasonmaingroup60037: any 
  setreturnreasonmaingroup60037: React.Dispatch<React.SetStateAction<any>>
  returnreasonmaingroup60037Props: any 
  setreturnreasonmaingroup60037Props: React.Dispatch<React.SetStateAction<any>>
  returnreasonsubgroup63981: any 
  setreturnreasonsubgroup63981: React.Dispatch<React.SetStateAction<any>>
  returnreasonsubgroup63981Props: any 
  setreturnreasonsubgroup63981Props: React.Dispatch<React.SetStateAction<any>>
  returndynamicactions87eb7: any 
  setreturndynamicactions87eb7: React.Dispatch<React.SetStateAction<any>>
  returndynamicactions87eb7Props: any 
  setreturndynamicactions87eb7Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroup6cd35: any 
  setapplyspecialratemaingroup6cd35: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroup6cd35Props: any 
  setapplyspecialratemaingroup6cd35Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroupd7745: any 
  setapplyspecialratesubgroupd7745: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroupd7745Props: any 
  setapplyspecialratesubgroupd7745Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactions8ee48: any 
  setapplyspecialratedynamicactions8ee48: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactions8ee48Props: any 
  setapplyspecialratedynamicactions8ee48Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroupe0950: any 
  setapplyspecialratemaingroupe0950: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroupe0950Props: any 
  setapplyspecialratemaingroupe0950Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroup2d2fd: any 
  setapplyspecialratesubgroup2d2fd: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroup2d2fdProps: any 
  setapplyspecialratesubgroup2d2fdProps: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactionsc09cc: any 
  setapplyspecialratedynamicactionsc09cc: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactionsc09ccProps: any 
  setapplyspecialratedynamicactionsc09ccProps: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroup5736c: any 
  setapplyspecialratemaingroup5736c: React.Dispatch<React.SetStateAction<any>>
  applyspecialratemaingroup5736cProps: any 
  setapplyspecialratemaingroup5736cProps: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroup36462: any 
  setapplyspecialratesubgroup36462: React.Dispatch<React.SetStateAction<any>>
  applyspecialratesubgroup36462Props: any 
  setapplyspecialratesubgroup36462Props: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactionsd8714: any 
  setapplyspecialratedynamicactionsd8714: React.Dispatch<React.SetStateAction<any>>
  applyspecialratedynamicactionsd8714Props: any 
  setapplyspecialratedynamicactionsd8714Props: React.Dispatch<React.SetStateAction<any>>
  returnreasonmaingroup382bc: any 
  setreturnreasonmaingroup382bc: React.Dispatch<React.SetStateAction<any>>
  returnreasonmaingroup382bcProps: any 
  setreturnreasonmaingroup382bcProps: React.Dispatch<React.SetStateAction<any>>
  returnreasonsubgroupf68e5: any 
  setreturnreasonsubgroupf68e5: React.Dispatch<React.SetStateAction<any>>
  returnreasonsubgroupf68e5Props: any 
  setreturnreasonsubgroupf68e5Props: React.Dispatch<React.SetStateAction<any>>
  returndynamicactionsc7672: any 
  setreturndynamicactionsc7672: React.Dispatch<React.SetStateAction<any>>
  returndynamicactionsc7672Props: any 
  setreturndynamicactionsc7672Props: React.Dispatch<React.SetStateAction<any>>
  enquirymaingroup8a315: any 
  setenquirymaingroup8a315: React.Dispatch<React.SetStateAction<any>>
  enquirymaingroup8a315Props: any 
  setenquirymaingroup8a315Props: React.Dispatch<React.SetStateAction<any>>
  enquirysubgroup4c021: any 
  setenquirysubgroup4c021: React.Dispatch<React.SetStateAction<any>>
  enquirysubgroup4c021Props: any 
  setenquirysubgroup4c021Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactions13e5e: any 
  setdynamicactions13e5e: React.Dispatch<React.SetStateAction<any>>
  dynamicactions13e5eProps: any 
  setdynamicactions13e5eProps: React.Dispatch<React.SetStateAction<any>>
  tran_main_group9581a: any 
  settran_main_group9581a: React.Dispatch<React.SetStateAction<any>>
  tran_main_group9581aProps: any 
  settran_main_group9581aProps: React.Dispatch<React.SetStateAction<any>>
  tran_tab_group2a929: any 
  settran_tab_group2a929: React.Dispatch<React.SetStateAction<any>>
  tran_tab_group2a929Props: any 
  settran_tab_group2a929Props: React.Dispatch<React.SetStateAction<any>>
  view_all_tab9a177: any 
  setview_all_tab9a177: React.Dispatch<React.SetStateAction<any>>
  view_all_tab9a177Props: any 
  setview_all_tab9a177Props: React.Dispatch<React.SetStateAction<any>>
  view_all_tableccb40: any 
  setview_all_tableccb40: React.Dispatch<React.SetStateAction<any>>
  view_all_tableccb40Props: any 
  setview_all_tableccb40Props: React.Dispatch<React.SetStateAction<any>>
  view_all_journey_groupca47a: any 
  setview_all_journey_groupca47a: React.Dispatch<React.SetStateAction<any>>
  view_all_journey_groupca47aProps: any 
  setview_all_journey_groupca47aProps: React.Dispatch<React.SetStateAction<any>>
  cancel_equest_camt055_tabf8dc6: any 
  setcancel_equest_camt055_tabf8dc6: React.Dispatch<React.SetStateAction<any>>
  cancel_equest_camt055_tabf8dc6Props: any 
  setcancel_equest_camt055_tabf8dc6Props: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_table9e976: any 
  setcancel_request_camt055_table9e976: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_table9e976Props: any 
  setcancel_request_camt055_table9e976Props: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_journey_groupd18a2: any 
  setcancel_request_camt055_journey_groupd18a2: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_journey_groupd18a2Props: any 
  setcancel_request_camt055_journey_groupd18a2Props: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_tab81869: any 
  setinves_req_camt110_tab81869: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_tab81869Props: any 
  setinves_req_camt110_tab81869Props: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_tablefa00e: any 
  setinves_req_camt110_tablefa00e: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_tablefa00eProps: any 
  setinves_req_camt110_tablefa00eProps: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_journey_groupca738: any 
  setinves_req_camt110_journey_groupca738: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_journey_groupca738Props: any 
  setinves_req_camt110_journey_groupca738Props: React.Dispatch<React.SetStateAction<any>>
  investigation_response_camt111_tabf6177: any 
  setinvestigation_response_camt111_tabf6177: React.Dispatch<React.SetStateAction<any>>
  investigation_response_camt111_tabf6177Props: any 
  setinvestigation_response_camt111_tabf6177Props: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_table0f401: any 
  setinves_res_camt111_table0f401: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_table0f401Props: any 
  setinves_res_camt111_table0f401Props: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_journey_group785d4: any 
  setinves_res_camt111_journey_group785d4: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_journey_group785d4Props: any 
  setinves_res_camt111_journey_group785d4Props: React.Dispatch<React.SetStateAction<any>>
  main_group746bf: any 
  setmain_group746bf: React.Dispatch<React.SetStateAction<any>>
  main_group746bfProps: any 
  setmain_group746bfProps: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055maingroupbf232: any 
  setcancelrequestcamt055maingroupbf232: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055maingroupbf232Props: any 
  setcancelrequestcamt055maingroupbf232Props: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055subgroup5ac44: any 
  setcancelrequestcamt055subgroup5ac44: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055subgroup5ac44Props: any 
  setcancelrequestcamt055subgroup5ac44Props: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055dynamicactions2a75a: any 
  setcancelrequestcamt055dynamicactions2a75a: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055dynamicactions2a75aProps: any 
  setcancelrequestcamt055dynamicactions2a75aProps: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110maingroup7a2f5: any 
  setinvestigationrequestcamt110maingroup7a2f5: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110maingroup7a2f5Props: any 
  setinvestigationrequestcamt110maingroup7a2f5Props: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110subgroup276a5: any 
  setinvestigationrequestcamt110subgroup276a5: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110subgroup276a5Props: any 
  setinvestigationrequestcamt110subgroup276a5Props: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110dynamicactionsbfdc2: any 
  setinvestigationrequestcamt110dynamicactionsbfdc2: React.Dispatch<React.SetStateAction<any>>
  investigationrequestcamt110dynamicactionsbfdc2Props: any 
  setinvestigationrequestcamt110dynamicactionsbfdc2Props: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111maingroup058ec: any 
  setinvestigationresponsecamt111maingroup058ec: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111maingroup058ecProps: any 
  setinvestigationresponsecamt111maingroup058ecProps: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111subgroupafab5: any 
  setinvestigationresponsecamt111subgroupafab5: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111subgroupafab5Props: any 
  setinvestigationresponsecamt111subgroupafab5Props: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111dynamicactionsceeed: any 
  setinvestigationresponsecamt111dynamicactionsceeed: React.Dispatch<React.SetStateAction<any>>
  investigationresponsecamt111dynamicactionsceeedProps: any 
  setinvestigationresponsecamt111dynamicactionsceeedProps: React.Dispatch<React.SetStateAction<any>>
  acksimulatormaingroup3a007: any 
  setacksimulatormaingroup3a007: React.Dispatch<React.SetStateAction<any>>
  acksimulatormaingroup3a007Props: any 
  setacksimulatormaingroup3a007Props: React.Dispatch<React.SetStateAction<any>>
  ack_simulator_tab_group0778c: any 
  setack_simulator_tab_group0778c: React.Dispatch<React.SetStateAction<any>>
  ack_simulator_tab_group0778cProps: any 
  setack_simulator_tab_group0778cProps: React.Dispatch<React.SetStateAction<any>>
  op_financial_tab_headerc391f: any 
  setop_financial_tab_headerc391f: React.Dispatch<React.SetStateAction<any>>
  op_financial_tab_headerc391fProps: any 
  setop_financial_tab_headerc391fProps: React.Dispatch<React.SetStateAction<any>>
  op_simulator_sub_group467ba: any 
  setop_simulator_sub_group467ba: React.Dispatch<React.SetStateAction<any>>
  op_simulator_sub_group467baProps: any 
  setop_simulator_sub_group467baProps: React.Dispatch<React.SetStateAction<any>>
  customwidgetmaingroupcf43a: any 
  setcustomwidgetmaingroupcf43a: React.Dispatch<React.SetStateAction<any>>
  customwidgetmaingroupcf43aProps: any 
  setcustomwidgetmaingroupcf43aProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactionmaingroupd3a78: any 
  setdynamicactionmaingroupd3a78: React.Dispatch<React.SetStateAction<any>>
  dynamicactionmaingroupd3a78Props: any 
  setdynamicactionmaingroupd3a78Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsubgroupa58e6: any 
  setdynamicactionsubgroupa58e6: React.Dispatch<React.SetStateAction<any>>
  dynamicactionsubgroupa58e6Props: any 
  setdynamicactionsubgroupa58e6Props: React.Dispatch<React.SetStateAction<any>>
  ip_financial_tab_header60896: any 
  setip_financial_tab_header60896: React.Dispatch<React.SetStateAction<any>>
  ip_financial_tab_header60896Props: any 
  setip_financial_tab_header60896Props: React.Dispatch<React.SetStateAction<any>>
  ip_simulator_sub_groupa1dc8: any 
  setip_simulator_sub_groupa1dc8: React.Dispatch<React.SetStateAction<any>>
  ip_simulator_sub_groupa1dc8Props: any 
  setip_simulator_sub_groupa1dc8Props: React.Dispatch<React.SetStateAction<any>>
  ip_dynamicactionmaingroup2f849: any 
  setip_dynamicactionmaingroup2f849: React.Dispatch<React.SetStateAction<any>>
  ip_dynamicactionmaingroup2f849Props: any 
  setip_dynamicactionmaingroup2f849Props: React.Dispatch<React.SetStateAction<any>>
  ip_dynamicactionsubgroup31c5b: any 
  setip_dynamicactionsubgroup31c5b: React.Dispatch<React.SetStateAction<any>>
  ip_dynamicactionsubgroup31c5bProps: any 
  setip_dynamicactionsubgroup31c5bProps: React.Dispatch<React.SetStateAction<any>>
  op_nf_camt110_tab_header4fa71: any 
  setop_nf_camt110_tab_header4fa71: React.Dispatch<React.SetStateAction<any>>
  op_nf_camt110_tab_header4fa71Props: any 
  setop_nf_camt110_tab_header4fa71Props: React.Dispatch<React.SetStateAction<any>>
  op_camt110_simulator_sub_group6f9ed: any 
  setop_camt110_simulator_sub_group6f9ed: React.Dispatch<React.SetStateAction<any>>
  op_camt110_simulator_sub_group6f9edProps: any 
  setop_camt110_simulator_sub_group6f9edProps: React.Dispatch<React.SetStateAction<any>>
  op_110_dynamicactionmaingroup4acc0: any 
  setop_110_dynamicactionmaingroup4acc0: React.Dispatch<React.SetStateAction<any>>
  op_110_dynamicactionmaingroup4acc0Props: any 
  setop_110_dynamicactionmaingroup4acc0Props: React.Dispatch<React.SetStateAction<any>>
  op_110_dynamicactionsubgroup56a89: any 
  setop_110_dynamicactionsubgroup56a89: React.Dispatch<React.SetStateAction<any>>
  op_110_dynamicactionsubgroup56a89Props: any 
  setop_110_dynamicactionsubgroup56a89Props: React.Dispatch<React.SetStateAction<any>>
  op_nf_camt111_tab_header05ca0: any 
  setop_nf_camt111_tab_header05ca0: React.Dispatch<React.SetStateAction<any>>
  op_nf_camt111_tab_header05ca0Props: any 
  setop_nf_camt111_tab_header05ca0Props: React.Dispatch<React.SetStateAction<any>>
  op_camt111_simulator_sub_group120d6: any 
  setop_camt111_simulator_sub_group120d6: React.Dispatch<React.SetStateAction<any>>
  op_camt111_simulator_sub_group120d6Props: any 
  setop_camt111_simulator_sub_group120d6Props: React.Dispatch<React.SetStateAction<any>>
  op_111_dynamicactionmaingroupe4308: any 
  setop_111_dynamicactionmaingroupe4308: React.Dispatch<React.SetStateAction<any>>
  op_111_dynamicactionmaingroupe4308Props: any 
  setop_111_dynamicactionmaingroupe4308Props: React.Dispatch<React.SetStateAction<any>>
  op_111_dynamicactionsubgroup73de7: any 
  setop_111_dynamicactionsubgroup73de7: React.Dispatch<React.SetStateAction<any>>
  op_111_dynamicactionsubgroup73de7Props: any 
  setop_111_dynamicactionsubgroup73de7Props: React.Dispatch<React.SetStateAction<any>>
  ip_nf_camt055_tab_header06c62: any 
  setip_nf_camt055_tab_header06c62: React.Dispatch<React.SetStateAction<any>>
  ip_nf_camt055_tab_header06c62Props: any 
  setip_nf_camt055_tab_header06c62Props: React.Dispatch<React.SetStateAction<any>>
  ip_camt055_simulator_sub_group52216: any 
  setip_camt055_simulator_sub_group52216: React.Dispatch<React.SetStateAction<any>>
  ip_camt055_simulator_sub_group52216Props: any 
  setip_camt055_simulator_sub_group52216Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_dynamicactionmaingroup84550: any 
  setip_055_dynamicactionmaingroup84550: React.Dispatch<React.SetStateAction<any>>
  ip_055_dynamicactionmaingroup84550Props: any 
  setip_055_dynamicactionmaingroup84550Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_dynamicactionsubgroup2ae9c: any 
  setip_055_dynamicactionsubgroup2ae9c: React.Dispatch<React.SetStateAction<any>>
  ip_055_dynamicactionsubgroup2ae9cProps: any 
  setip_055_dynamicactionsubgroup2ae9cProps: React.Dispatch<React.SetStateAction<any>>
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
  line_chart_group61ee8: any 
  setline_chart_group61ee8: React.Dispatch<React.SetStateAction<any>>
  line_chart_group61ee8Props: any 
  setline_chart_group61ee8Props: React.Dispatch<React.SetStateAction<any>>
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
  advance_searcheb531: any,
  setadvance_searcheb531:React.Dispatch<React.SetStateAction<any>>
  advance_searcheb531Props: any 
  setadvance_searcheb531Props: React.Dispatch<React.SetStateAction<any>>
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
  dr_amount_view_alls88d6b: any,
  setdr_amount_view_alls88d6b:React.Dispatch<React.SetStateAction<any>>
  dr_amount_view_alls88d6bProps: any 
  setdr_amount_view_alls88d6bProps: React.Dispatch<React.SetStateAction<any>>
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
  uuid_view_alldb6f0: any,
  setuuid_view_alldb6f0:React.Dispatch<React.SetStateAction<any>>
  uuid_view_alldb6f0Props: any 
  setuuid_view_alldb6f0Props: React.Dispatch<React.SetStateAction<any>>
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
  uuid_failure_queuea9c80: any,
  setuuid_failure_queuea9c80:React.Dispatch<React.SetStateAction<any>>
  uuid_failure_queuea9c80Props: any 
  setuuid_failure_queuea9c80Props: React.Dispatch<React.SetStateAction<any>>
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
  dr_currency_success_queue10a49: any,
  setdr_currency_success_queue10a49:React.Dispatch<React.SetStateAction<any>>
  dr_currency_success_queue10a49Props: any 
  setdr_currency_success_queue10a49Props: React.Dispatch<React.SetStateAction<any>>
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
  uuid_success_queue87fbe: any,
  setuuid_success_queue87fbe:React.Dispatch<React.SetStateAction<any>>
  uuid_success_queue87fbeProps: any 
  setuuid_success_queue87fbeProps: React.Dispatch<React.SetStateAction<any>>
  success_queue_journey68ac9: any,
  setsuccess_queue_journey68ac9:React.Dispatch<React.SetStateAction<any>>
  success_queue_journey68ac9Props: any 
  setsuccess_queue_journey68ac9Props: React.Dispatch<React.SetStateAction<any>>
  return_queue_journeycc9d3: any,
  setreturn_queue_journeycc9d3:React.Dispatch<React.SetStateAction<any>>
  return_queue_journeycc9d3Props: any 
  setreturn_queue_journeycc9d3Props: React.Dispatch<React.SetStateAction<any>>
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
  uuid_return_queue2f467: any,
  setuuid_return_queue2f467:React.Dispatch<React.SetStateAction<any>>
  uuid_return_queue2f467Props: any 
  setuuid_return_queue2f467Props: React.Dispatch<React.SetStateAction<any>>
  value_date_operational_pending6ecd4: any,
  setvalue_date_operational_pending6ecd4:React.Dispatch<React.SetStateAction<any>>
  value_date_operational_pending6ecd4Props: any 
  setvalue_date_operational_pending6ecd4Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending2ab87: any,
  setdr_account_operational_pending2ab87:React.Dispatch<React.SetStateAction<any>>
  dr_account_operational_pending2ab87Props: any 
  setdr_account_operational_pending2ab87Props: React.Dispatch<React.SetStateAction<any>>
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
  new_payment_chk_verify_btn3918d: any,
  setnew_payment_chk_verify_btn3918d:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_verify_btn3918dProps: any 
  setnew_payment_chk_verify_btn3918dProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_authorize_btne1fa7: any,
  setopr_pending_chk_authorize_btne1fa7:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_authorize_btne1fa7Props: any 
  setopr_pending_chk_authorize_btne1fa7Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_approve_btn33fe9: any,
  setopr_pending_chk_approve_btn33fe9:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_approve_btn33fe9Props: any 
  setopr_pending_chk_approve_btn33fe9Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_reject_btn18529: any,
  setopr_pending_chk_reject_btn18529:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_reject_btn18529Props: any 
  setopr_pending_chk_reject_btn18529Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_already_posted_btn4eb90: any,
  setopr_pending_mk_already_posted_btn4eb90:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_already_posted_btn4eb90Props: any 
  setopr_pending_mk_already_posted_btn4eb90Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_retry_btn4af05: any,
  setopr_pending_mk_retry_btn4af05:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_retry_btn4af05Props: any 
  setopr_pending_mk_retry_btn4af05Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_reject_btnb2c93: any,
  setopr_pending_mk_reject_btnb2c93:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_reject_btnb2c93Props: any 
  setopr_pending_mk_reject_btnb2c93Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_repost_btn4506c: any,
  setopr_pending_mk_repost_btn4506c:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_repost_btn4506cProps: any 
  setopr_pending_mk_repost_btn4506cProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_push_next_step_btn631df: any,
  setopr_pending_mk_push_next_step_btn631df:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_push_next_step_btn631dfProps: any 
  setopr_pending_mk_push_next_step_btn631dfProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_reverse_btndab56: any,
  setopr_pending_mk_reverse_btndab56:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_reverse_btndab56Props: any 
  setopr_pending_mk_reverse_btndab56Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_ip_return_btnb715b: any,
  setopr_pending_mk_ip_return_btnb715b:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_ip_return_btnb715bProps: any 
  setopr_pending_mk_ip_return_btnb715bProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_repair_btnc91a5: any,
  setopr_pending_mk_repair_btnc91a5:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_repair_btnc91a5Props: any 
  setopr_pending_mk_repair_btnc91a5Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_ip_verify_return_btnb8342: any,
  setopr_pending_chk_ip_verify_return_btnb8342:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_ip_verify_return_btnb8342Props: any 
  setopr_pending_chk_ip_verify_return_btnb8342Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_op_return_btn311fd: any,
  setopr_pending_mk_op_return_btn311fd:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_op_return_btn311fdProps: any 
  setopr_pending_mk_op_return_btn311fdProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_op_return_verify_btne3f5b: any,
  setopr_pending_chk_op_return_verify_btne3f5b:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_op_return_verify_btne3f5bProps: any 
  setopr_pending_chk_op_return_verify_btne3f5bProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_force_pass_btnc0708: any,
  setopr_pending_mk_force_pass_btnc0708:React.Dispatch<React.SetStateAction<any>>
  opr_pending_mk_force_pass_btnc0708Props: any 
  setopr_pending_mk_force_pass_btnc0708Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_op_mk_applysplrate_btn52343: any,
  setopr_pending_op_mk_applysplrate_btn52343:React.Dispatch<React.SetStateAction<any>>
  opr_pending_op_mk_applysplrate_btn52343Props: any 
  setopr_pending_op_mk_applysplrate_btn52343Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_ip_mkr_applysplrate_btna62ff: any,
  setopr_pending_ip_mkr_applysplrate_btna62ff:React.Dispatch<React.SetStateAction<any>>
  opr_pending_ip_mkr_applysplrate_btna62ffProps: any 
  setopr_pending_ip_mkr_applysplrate_btna62ffProps: React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendinga5f0a: any,
  setuuid_operational_pendinga5f0a:React.Dispatch<React.SetStateAction<any>>
  uuid_operational_pendinga5f0aProps: any 
  setuuid_operational_pendinga5f0aProps: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_op_appl_spl_rate_verfiy592a5: any,
  setopr_pending_chk_op_appl_spl_rate_verfiy592a5:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_op_appl_spl_rate_verfiy592a5Props: any 
  setopr_pending_chk_op_appl_spl_rate_verfiy592a5Props: React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_ip_appl_spl_rate_verfiyca082: any,
  setopr_pending_chk_ip_appl_spl_rate_verfiyca082:React.Dispatch<React.SetStateAction<any>>
  opr_pending_chk_ip_appl_spl_rate_verfiyca082Props: any 
  setopr_pending_chk_ip_appl_spl_rate_verfiyca082Props: React.Dispatch<React.SetStateAction<any>>
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
  uuid_technical_pendingb820e: any,
  setuuid_technical_pendingb820e:React.Dispatch<React.SetStateAction<any>>
  uuid_technical_pendingb820eProps: any 
  setuuid_technical_pendingb820eProps: React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_reject_btn432a8: any,
  settech_pending_mk_reject_btn432a8:React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_reject_btn432a8Props: any 
  settech_pending_mk_reject_btn432a8Props: React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_retry_btn5f5cf: any,
  settech_pending_mk_retry_btn5f5cf:React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_retry_btn5f5cfProps: any 
  settech_pending_mk_retry_btn5f5cfProps: React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_approve_btnc932b: any,
  settech_pending_chk_approve_btnc932b:React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_approve_btnc932bProps: any 
  settech_pending_chk_approve_btnc932bProps: React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_reject_btn2ef0c: any,
  settech_pending_chk_reject_btn2ef0c:React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_reject_btn2ef0cProps: any 
  settech_pending_chk_reject_btn2ef0cProps: React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_ip_return_btn3d651: any,
  settech_pending_mk_ip_return_btn3d651:React.Dispatch<React.SetStateAction<any>>
  tech_pending_mk_ip_return_btn3d651Props: any 
  settech_pending_mk_ip_return_btn3d651Props: React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_ip_verify_return_btn54b4c: any,
  settech_pending_chk_ip_verify_return_btn54b4c:React.Dispatch<React.SetStateAction<any>>
  tech_pending_chk_ip_verify_return_btn54b4cProps: any 
  settech_pending_chk_ip_verify_return_btn54b4cProps: React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601c: any,
  settechnical_pending_journey6601c:React.Dispatch<React.SetStateAction<any>>
  technical_pending_journey6601cProps: any 
  settechnical_pending_journey6601cProps: React.Dispatch<React.SetStateAction<any>>
  value_date_notification_pendinga37ed: any,
  setvalue_date_notification_pendinga37ed:React.Dispatch<React.SetStateAction<any>>
  value_date_notification_pendinga37edProps: any 
  setvalue_date_notification_pendinga37edProps: React.Dispatch<React.SetStateAction<any>>
  dr_account_notification_pendinge066b: any,
  setdr_account_notification_pendinge066b:React.Dispatch<React.SetStateAction<any>>
  dr_account_notification_pendinge066bProps: any 
  setdr_account_notification_pendinge066bProps: React.Dispatch<React.SetStateAction<any>>
  dr_name_notification_pending23ac6: any,
  setdr_name_notification_pending23ac6:React.Dispatch<React.SetStateAction<any>>
  dr_name_notification_pending23ac6Props: any 
  setdr_name_notification_pending23ac6Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_notification_pendingeabf3: any,
  setdr_currency_notification_pendingeabf3:React.Dispatch<React.SetStateAction<any>>
  dr_currency_notification_pendingeabf3Props: any 
  setdr_currency_notification_pendingeabf3Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_notification_pendingd808b: any,
  setdr_amount_notification_pendingd808b:React.Dispatch<React.SetStateAction<any>>
  dr_amount_notification_pendingd808bProps: any 
  setdr_amount_notification_pendingd808bProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_notification_pending7feb9: any,
  setcr_account_notification_pending7feb9:React.Dispatch<React.SetStateAction<any>>
  cr_account_notification_pending7feb9Props: any 
  setcr_account_notification_pending7feb9Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_notification_pendingfcab8: any,
  setcr_name_notification_pendingfcab8:React.Dispatch<React.SetStateAction<any>>
  cr_name_notification_pendingfcab8Props: any 
  setcr_name_notification_pendingfcab8Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_notification_pending587a1: any,
  setcr_currency_notification_pending587a1:React.Dispatch<React.SetStateAction<any>>
  cr_currency_notification_pending587a1Props: any 
  setcr_currency_notification_pending587a1Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_notification_pendingde11a: any,
  setcr_amount_notification_pendingde11a:React.Dispatch<React.SetStateAction<any>>
  cr_amount_notification_pendingde11aProps: any 
  setcr_amount_notification_pendingde11aProps: React.Dispatch<React.SetStateAction<any>>
  uuid_notification_pending2ba49: any,
  setuuid_notification_pending2ba49:React.Dispatch<React.SetStateAction<any>>
  uuid_notification_pending2ba49Props: any 
  setuuid_notification_pending2ba49Props: React.Dispatch<React.SetStateAction<any>>
  non_pending_mk_retry_btnf5b0b: any,
  setnon_pending_mk_retry_btnf5b0b:React.Dispatch<React.SetStateAction<any>>
  non_pending_mk_retry_btnf5b0bProps: any 
  setnon_pending_mk_retry_btnf5b0bProps: React.Dispatch<React.SetStateAction<any>>
  non_pending_chk_approve_btnb3cbf: any,
  setnon_pending_chk_approve_btnb3cbf:React.Dispatch<React.SetStateAction<any>>
  non_pending_chk_approve_btnb3cbfProps: any 
  setnon_pending_chk_approve_btnb3cbfProps: React.Dispatch<React.SetStateAction<any>>
  non_pending_chk_reject_btn16cba: any,
  setnon_pending_chk_reject_btn16cba:React.Dispatch<React.SetStateAction<any>>
  non_pending_chk_reject_btn16cbaProps: any 
  setnon_pending_chk_reject_btn16cbaProps: React.Dispatch<React.SetStateAction<any>>
  notification_pending_journey32a13: any,
  setnotification_pending_journey32a13:React.Dispatch<React.SetStateAction<any>>
  notification_pending_journey32a13Props: any 
  setnotification_pending_journey32a13Props: React.Dispatch<React.SetStateAction<any>>
  value_date_enquiryccb63: any,
  setvalue_date_enquiryccb63:React.Dispatch<React.SetStateAction<any>>
  value_date_enquiryccb63Props: any 
  setvalue_date_enquiryccb63Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_enquiry51592: any,
  setdr_account_enquiry51592:React.Dispatch<React.SetStateAction<any>>
  dr_account_enquiry51592Props: any 
  setdr_account_enquiry51592Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_enquiry1f341: any,
  setdr_name_enquiry1f341:React.Dispatch<React.SetStateAction<any>>
  dr_name_enquiry1f341Props: any 
  setdr_name_enquiry1f341Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency_enquiry529c9: any,
  setdr_currency_enquiry529c9:React.Dispatch<React.SetStateAction<any>>
  dr_currency_enquiry529c9Props: any 
  setdr_currency_enquiry529c9Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount_enquiryf15a6: any,
  setdr_amount_enquiryf15a6:React.Dispatch<React.SetStateAction<any>>
  dr_amount_enquiryf15a6Props: any 
  setdr_amount_enquiryf15a6Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_enquiry8fc22: any,
  setcr_account_enquiry8fc22:React.Dispatch<React.SetStateAction<any>>
  cr_account_enquiry8fc22Props: any 
  setcr_account_enquiry8fc22Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_enquiry89e7c: any,
  setcr_name_enquiry89e7c:React.Dispatch<React.SetStateAction<any>>
  cr_name_enquiry89e7cProps: any 
  setcr_name_enquiry89e7cProps: React.Dispatch<React.SetStateAction<any>>
  cr_currency_enquiryaba9a: any,
  setcr_currency_enquiryaba9a:React.Dispatch<React.SetStateAction<any>>
  cr_currency_enquiryaba9aProps: any 
  setcr_currency_enquiryaba9aProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_enquiry6d821: any,
  setcr_amount_enquiry6d821:React.Dispatch<React.SetStateAction<any>>
  cr_amount_enquiry6d821Props: any 
  setcr_amount_enquiry6d821Props: React.Dispatch<React.SetStateAction<any>>
  uuid_enquiryc00eb: any,
  setuuid_enquiryc00eb:React.Dispatch<React.SetStateAction<any>>
  uuid_enquiryc00ebProps: any 
  setuuid_enquiryc00ebProps: React.Dispatch<React.SetStateAction<any>>
  enquiry_mk_btnd1038: any,
  setenquiry_mk_btnd1038:React.Dispatch<React.SetStateAction<any>>
  enquiry_mk_btnd1038Props: any 
  setenquiry_mk_btnd1038Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_journey9d5ba: any,
  setenquiry_journey9d5ba:React.Dispatch<React.SetStateAction<any>>
  enquiry_journey9d5baProps: any 
  setenquiry_journey9d5baProps: React.Dispatch<React.SetStateAction<any>>
  advancesearch50825: any,
  setadvancesearch50825:React.Dispatch<React.SetStateAction<any>>
  advancesearch50825Props: any 
  setadvancesearch50825Props: React.Dispatch<React.SetStateAction<any>>
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
  channel95601: any,
  setchannel95601:React.Dispatch<React.SetStateAction<any>>
  channel95601Props: any 
  setchannel95601Props: React.Dispatch<React.SetStateAction<any>>
  processstatus28eca: any,
  setprocessstatus28eca:React.Dispatch<React.SetStateAction<any>>
  processstatus28ecaProps: any 
  setprocessstatus28ecaProps: React.Dispatch<React.SetStateAction<any>>
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
  payment_info_text_label47b13: any,
  setpayment_info_text_label47b13:React.Dispatch<React.SetStateAction<any>>
  payment_info_text_label47b13Props: any 
  setpayment_info_text_label47b13Props: React.Dispatch<React.SetStateAction<any>>
  repair_new_payment_mk_save_btnbd6df: any,
  setrepair_new_payment_mk_save_btnbd6df:React.Dispatch<React.SetStateAction<any>>
  repair_new_payment_mk_save_btnbd6dfProps: any 
  setrepair_new_payment_mk_save_btnbd6dfProps: React.Dispatch<React.SetStateAction<any>>
  cancel242e6: any,
  setcancel242e6:React.Dispatch<React.SetStateAction<any>>
  cancel242e6Props: any 
  setcancel242e6Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_reject_btnb2949: any,
  setnew_payment_chk_reject_btnb2949:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_reject_btnb2949Props: any 
  setnew_payment_chk_reject_btnb2949Props: React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btncb94c: any,
  setnew_payment_chk_approve_btncb94c:React.Dispatch<React.SetStateAction<any>>
  new_payment_chk_approve_btncb94cProps: any 
  setnew_payment_chk_approve_btncb94cProps: React.Dispatch<React.SetStateAction<any>>
  save62f33: any,
  setsave62f33:React.Dispatch<React.SetStateAction<any>>
  save62f33Props: any 
  setsave62f33Props: React.Dispatch<React.SetStateAction<any>>
  general_info_text_label92c1e: any,
  setgeneral_info_text_label92c1e:React.Dispatch<React.SetStateAction<any>>
  general_info_text_label92c1eProps: any 
  setgeneral_info_text_label92c1eProps: React.Dispatch<React.SetStateAction<any>>
  value_date45767: any,
  setvalue_date45767:React.Dispatch<React.SetStateAction<any>>
  value_date45767Props: any 
  setvalue_date45767Props: React.Dispatch<React.SetStateAction<any>>
  service_level75e42: any,
  setservice_level75e42:React.Dispatch<React.SetStateAction<any>>
  service_level75e42Props: any 
  setservice_level75e42Props: React.Dispatch<React.SetStateAction<any>>
  purpose75771: any,
  setpurpose75771:React.Dispatch<React.SetStateAction<any>>
  purpose75771Props: any 
  setpurpose75771Props: React.Dispatch<React.SetStateAction<any>>
  dbtr_info_text_label1015f: any,
  setdbtr_info_text_label1015f:React.Dispatch<React.SetStateAction<any>>
  dbtr_info_text_label1015fProps: any 
  setdbtr_info_text_label1015fProps: React.Dispatch<React.SetStateAction<any>>
  dr_accounta8f91: any,
  setdr_accounta8f91:React.Dispatch<React.SetStateAction<any>>
  dr_accounta8f91Props: any 
  setdr_accounta8f91Props: React.Dispatch<React.SetStateAction<any>>
  dr_namef1c15: any,
  setdr_namef1c15:React.Dispatch<React.SetStateAction<any>>
  dr_namef1c15Props: any 
  setdr_namef1c15Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency45f51: any,
  setdr_currency45f51:React.Dispatch<React.SetStateAction<any>>
  dr_currency45f51Props: any 
  setdr_currency45f51Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_balancea2246: any,
  setdr_account_balancea2246:React.Dispatch<React.SetStateAction<any>>
  dr_account_balancea2246Props: any 
  setdr_account_balancea2246Props: React.Dispatch<React.SetStateAction<any>>
  dr_ibanbaa1f: any,
  setdr_ibanbaa1f:React.Dispatch<React.SetStateAction<any>>
  dr_ibanbaa1fProps: any 
  setdr_ibanbaa1fProps: React.Dispatch<React.SetStateAction<any>>
  dr_street_name149b0: any,
  setdr_street_name149b0:React.Dispatch<React.SetStateAction<any>>
  dr_street_name149b0Props: any 
  setdr_street_name149b0Props: React.Dispatch<React.SetStateAction<any>>
  dr_building_numberba75a: any,
  setdr_building_numberba75a:React.Dispatch<React.SetStateAction<any>>
  dr_building_numberba75aProps: any 
  setdr_building_numberba75aProps: React.Dispatch<React.SetStateAction<any>>
  dr_pstl_code5ec76: any,
  setdr_pstl_code5ec76:React.Dispatch<React.SetStateAction<any>>
  dr_pstl_code5ec76Props: any 
  setdr_pstl_code5ec76Props: React.Dispatch<React.SetStateAction<any>>
  dr_town_name19970: any,
  setdr_town_name19970:React.Dispatch<React.SetStateAction<any>>
  dr_town_name19970Props: any 
  setdr_town_name19970Props: React.Dispatch<React.SetStateAction<any>>
  dr_countrydd685: any,
  setdr_countrydd685:React.Dispatch<React.SetStateAction<any>>
  dr_countrydd685Props: any 
  setdr_countrydd685Props: React.Dispatch<React.SetStateAction<any>>
  dr_bank_codeffb62: any,
  setdr_bank_codeffb62:React.Dispatch<React.SetStateAction<any>>
  dr_bank_codeffb62Props: any 
  setdr_bank_codeffb62Props: React.Dispatch<React.SetStateAction<any>>
  amount_input_typecd6ed: any,
  setamount_input_typecd6ed:React.Dispatch<React.SetStateAction<any>>
  amount_input_typecd6edProps: any 
  setamount_input_typecd6edProps: React.Dispatch<React.SetStateAction<any>>
  dr_amount178b9: any,
  setdr_amount178b9:React.Dispatch<React.SetStateAction<any>>
  dr_amount178b9Props: any 
  setdr_amount178b9Props: React.Dispatch<React.SetStateAction<any>>
  settlement_amount32b14: any,
  setsettlement_amount32b14:React.Dispatch<React.SetStateAction<any>>
  settlement_amount32b14Props: any 
  setsettlement_amount32b14Props: React.Dispatch<React.SetStateAction<any>>
  creditor_info_label_text02833: any,
  setcreditor_info_label_text02833:React.Dispatch<React.SetStateAction<any>>
  creditor_info_label_text02833Props: any 
  setcreditor_info_label_text02833Props: React.Dispatch<React.SetStateAction<any>>
  ben_checkbox780b4: any,
  setben_checkbox780b4:React.Dispatch<React.SetStateAction<any>>
  ben_checkbox780b4Props: any 
  setben_checkbox780b4Props: React.Dispatch<React.SetStateAction<any>>
  cr_account3b649: any,
  setcr_account3b649:React.Dispatch<React.SetStateAction<any>>
  cr_account3b649Props: any 
  setcr_account3b649Props: React.Dispatch<React.SetStateAction<any>>
  cr_namee0835: any,
  setcr_namee0835:React.Dispatch<React.SetStateAction<any>>
  cr_namee0835Props: any 
  setcr_namee0835Props: React.Dispatch<React.SetStateAction<any>>
  cr_street_name21bab: any,
  setcr_street_name21bab:React.Dispatch<React.SetStateAction<any>>
  cr_street_name21babProps: any 
  setcr_street_name21babProps: React.Dispatch<React.SetStateAction<any>>
  cr_benif_action9998d: any,
  setcr_benif_action9998d:React.Dispatch<React.SetStateAction<any>>
  cr_benif_action9998dProps: any 
  setcr_benif_action9998dProps: React.Dispatch<React.SetStateAction<any>>
  cr_building_namea6ac7: any,
  setcr_building_namea6ac7:React.Dispatch<React.SetStateAction<any>>
  cr_building_namea6ac7Props: any 
  setcr_building_namea6ac7Props: React.Dispatch<React.SetStateAction<any>>
  cr_floor44bed: any,
  setcr_floor44bed:React.Dispatch<React.SetStateAction<any>>
  cr_floor44bedProps: any 
  setcr_floor44bedProps: React.Dispatch<React.SetStateAction<any>>
  cr_post_codef645b: any,
  setcr_post_codef645b:React.Dispatch<React.SetStateAction<any>>
  cr_post_codef645bProps: any 
  setcr_post_codef645bProps: React.Dispatch<React.SetStateAction<any>>
  cr_town_nameed852: any,
  setcr_town_nameed852:React.Dispatch<React.SetStateAction<any>>
  cr_town_nameed852Props: any 
  setcr_town_nameed852Props: React.Dispatch<React.SetStateAction<any>>
  cr_country38218: any,
  setcr_country38218:React.Dispatch<React.SetStateAction<any>>
  cr_country38218Props: any 
  setcr_country38218Props: React.Dispatch<React.SetStateAction<any>>
  cr_currencyb2ebe: any,
  setcr_currencyb2ebe:React.Dispatch<React.SetStateAction<any>>
  cr_currencyb2ebeProps: any 
  setcr_currencyb2ebeProps: React.Dispatch<React.SetStateAction<any>>
  exchange_rate86282: any,
  setexchange_rate86282:React.Dispatch<React.SetStateAction<any>>
  exchange_rate86282Props: any 
  setexchange_rate86282Props: React.Dispatch<React.SetStateAction<any>>
  cr_amountbd2bf: any,
  setcr_amountbd2bf:React.Dispatch<React.SetStateAction<any>>
  cr_amountbd2bfProps: any 
  setcr_amountbd2bfProps: React.Dispatch<React.SetStateAction<any>>
  cr_bank_code76d12: any,
  setcr_bank_code76d12:React.Dispatch<React.SetStateAction<any>>
  cr_bank_code76d12Props: any 
  setcr_bank_code76d12Props: React.Dispatch<React.SetStateAction<any>>
  cr_clr_code4387d: any,
  setcr_clr_code4387d:React.Dispatch<React.SetStateAction<any>>
  cr_clr_code4387dProps: any 
  setcr_clr_code4387dProps: React.Dispatch<React.SetStateAction<any>>
  chrg_info_text_labelf2fb3: any,
  setchrg_info_text_labelf2fb3:React.Dispatch<React.SetStateAction<any>>
  chrg_info_text_labelf2fb3Props: any 
  setchrg_info_text_labelf2fb3Props: React.Dispatch<React.SetStateAction<any>>
  charge_type63052: any,
  setcharge_type63052:React.Dispatch<React.SetStateAction<any>>
  charge_type63052Props: any 
  setcharge_type63052Props: React.Dispatch<React.SetStateAction<any>>
  charge_amount44ea6: any,
  setcharge_amount44ea6:React.Dispatch<React.SetStateAction<any>>
  charge_amount44ea6Props: any 
  setcharge_amount44ea6Props: React.Dispatch<React.SetStateAction<any>>
  correspondent_chargeff14a: any,
  setcorrespondent_chargeff14a:React.Dispatch<React.SetStateAction<any>>
  correspondent_chargeff14aProps: any 
  setcorrespondent_chargeff14aProps: React.Dispatch<React.SetStateAction<any>>
  bank_chargeb33d7: any,
  setbank_chargeb33d7:React.Dispatch<React.SetStateAction<any>>
  bank_chargeb33d7Props: any 
  setbank_chargeb33d7Props: React.Dispatch<React.SetStateAction<any>>
  add_info_text_label19bc1: any,
  setadd_info_text_label19bc1:React.Dispatch<React.SetStateAction<any>>
  add_info_text_label19bc1Props: any 
  setadd_info_text_label19bc1Props: React.Dispatch<React.SetStateAction<any>>
  payment_method031c1: any,
  setpayment_method031c1:React.Dispatch<React.SetStateAction<any>>
  payment_method031c1Props: any 
  setpayment_method031c1Props: React.Dispatch<React.SetStateAction<any>>
  instruction_priorityafb4d: any,
  setinstruction_priorityafb4d:React.Dispatch<React.SetStateAction<any>>
  instruction_priorityafb4dProps: any 
  setinstruction_priorityafb4dProps: React.Dispatch<React.SetStateAction<any>>
  category_purposead521: any,
  setcategory_purposead521:React.Dispatch<React.SetStateAction<any>>
  category_purposead521Props: any 
  setcategory_purposead521Props: React.Dispatch<React.SetStateAction<any>>
  remittance_info6fbdf: any,
  setremittance_info6fbdf:React.Dispatch<React.SetStateAction<any>>
  remittance_info6fbdfProps: any 
  setremittance_info6fbdfProps: React.Dispatch<React.SetStateAction<any>>
  intermediary_institution45fe6: any,
  setintermediary_institution45fe6:React.Dispatch<React.SetStateAction<any>>
  intermediary_institution45fe6Props: any 
  setintermediary_institution45fe6Props: React.Dispatch<React.SetStateAction<any>>
  sender_receiver_info30c67: any,
  setsender_receiver_info30c67:React.Dispatch<React.SetStateAction<any>>
  sender_receiver_info30c67Props: any 
  setsender_receiver_info30c67Props: React.Dispatch<React.SetStateAction<any>>
  correspondent_bank2a7ae: any,
  setcorrespondent_bank2a7ae:React.Dispatch<React.SetStateAction<any>>
  correspondent_bank2a7aeProps: any 
  setcorrespondent_bank2a7aeProps: React.Dispatch<React.SetStateAction<any>>
  customwidget02697: any,
  setcustomwidget02697:React.Dispatch<React.SetStateAction<any>>
  customwidget02697Props: any 
  setcustomwidget02697Props: React.Dispatch<React.SetStateAction<any>>
  benificiary_textb53b9: any,
  setbenificiary_textb53b9:React.Dispatch<React.SetStateAction<any>>
  benificiary_textb53b9Props: any 
  setbenificiary_textb53b9Props: React.Dispatch<React.SetStateAction<any>>
  search_textinput7144f: any,
  setsearch_textinput7144f:React.Dispatch<React.SetStateAction<any>>
  search_textinput7144fProps: any 
  setsearch_textinput7144fProps: React.Dispatch<React.SetStateAction<any>>
  search_btne5c0a: any,
  setsearch_btne5c0a:React.Dispatch<React.SetStateAction<any>>
  search_btne5c0aProps: any 
  setsearch_btne5c0aProps: React.Dispatch<React.SetStateAction<any>>
  ben_divideraec54: any,
  setben_divideraec54:React.Dispatch<React.SetStateAction<any>>
  ben_divideraec54Props: any 
  setben_divideraec54Props: React.Dispatch<React.SetStateAction<any>>
  account_holder_namedb849: any,
  setaccount_holder_namedb849:React.Dispatch<React.SetStateAction<any>>
  account_holder_namedb849Props: any 
  setaccount_holder_namedb849Props: React.Dispatch<React.SetStateAction<any>>
  iconcd6e8: any,
  seticoncd6e8:React.Dispatch<React.SetStateAction<any>>
  iconcd6e8Props: any 
  seticoncd6e8Props: React.Dispatch<React.SetStateAction<any>>
  account_numberf1543: any,
  setaccount_numberf1543:React.Dispatch<React.SetStateAction<any>>
  account_numberf1543Props: any 
  setaccount_numberf1543Props: React.Dispatch<React.SetStateAction<any>>
  confirm_dividere3b17: any,
  setconfirm_dividere3b17:React.Dispatch<React.SetStateAction<any>>
  confirm_dividere3b17Props: any 
  setconfirm_dividere3b17Props: React.Dispatch<React.SetStateAction<any>>
  clear_button188cc: any,
  setclear_button188cc:React.Dispatch<React.SetStateAction<any>>
  clear_button188ccProps: any 
  setclear_button188ccProps: React.Dispatch<React.SetStateAction<any>>
  confirm_button246d5: any,
  setconfirm_button246d5:React.Dispatch<React.SetStateAction<any>>
  confirm_button246d5Props: any 
  setconfirm_button246d5Props: React.Dispatch<React.SetStateAction<any>>
  divider_tope6917: any,
  setdivider_tope6917:React.Dispatch<React.SetStateAction<any>>
  divider_tope6917Props: any 
  setdivider_tope6917Props: React.Dispatch<React.SetStateAction<any>>
  transaction_date_time_label669d7: any,
  settransaction_date_time_label669d7:React.Dispatch<React.SetStateAction<any>>
  transaction_date_time_label669d7Props: any 
  settransaction_date_time_label669d7Props: React.Dispatch<React.SetStateAction<any>>
  processed_by_label542e8: any,
  setprocessed_by_label542e8:React.Dispatch<React.SetStateAction<any>>
  processed_by_label542e8Props: any 
  setprocessed_by_label542e8Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_date14856: any,
  settrs_created_date14856:React.Dispatch<React.SetStateAction<any>>
  trs_created_date14856Props: any 
  settrs_created_date14856Props: React.Dispatch<React.SetStateAction<any>>
  processing_systemd2b69: any,
  setprocessing_systemd2b69:React.Dispatch<React.SetStateAction<any>>
  processing_systemd2b69Props: any 
  setprocessing_systemd2b69Props: React.Dispatch<React.SetStateAction<any>>
  currency_labele21ba: any,
  setcurrency_labele21ba:React.Dispatch<React.SetStateAction<any>>
  currency_labele21baProps: any 
  setcurrency_labele21baProps: React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725: any,
  setamount_labelfd725:React.Dispatch<React.SetStateAction<any>>
  amount_labelfd725Props: any 
  setamount_labelfd725Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency9c8a2: any,
  setdr_currency9c8a2:React.Dispatch<React.SetStateAction<any>>
  dr_currency9c8a2Props: any 
  setdr_currency9c8a2Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount01416: any,
  setdr_amount01416:React.Dispatch<React.SetStateAction<any>>
  dr_amount01416Props: any 
  setdr_amount01416Props: React.Dispatch<React.SetStateAction<any>>
  debit_account_label3b1b7: any,
  setdebit_account_label3b1b7:React.Dispatch<React.SetStateAction<any>>
  debit_account_label3b1b7Props: any 
  setdebit_account_label3b1b7Props: React.Dispatch<React.SetStateAction<any>>
  process_status_labelb6505: any,
  setprocess_status_labelb6505:React.Dispatch<React.SetStateAction<any>>
  process_status_labelb6505Props: any 
  setprocess_status_labelb6505Props: React.Dispatch<React.SetStateAction<any>>
  dr_account36b40: any,
  setdr_account36b40:React.Dispatch<React.SetStateAction<any>>
  dr_account36b40Props: any 
  setdr_account36b40Props: React.Dispatch<React.SetStateAction<any>>
  trs_process_statusa4262: any,
  settrs_process_statusa4262:React.Dispatch<React.SetStateAction<any>>
  trs_process_statusa4262Props: any 
  settrs_process_statusa4262Props: React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7b: any,
  setcredit_account_label65c7b:React.Dispatch<React.SetStateAction<any>>
  credit_account_label65c7bProps: any 
  setcredit_account_label65c7bProps: React.Dispatch<React.SetStateAction<any>>
  status_labelf3713: any,
  setstatus_labelf3713:React.Dispatch<React.SetStateAction<any>>
  status_labelf3713Props: any 
  setstatus_labelf3713Props: React.Dispatch<React.SetStateAction<any>>
  cr_account500d6: any,
  setcr_account500d6:React.Dispatch<React.SetStateAction<any>>
  cr_account500d6Props: any 
  setcr_account500d6Props: React.Dispatch<React.SetStateAction<any>>
  trs_status88bc7: any,
  settrs_status88bc7:React.Dispatch<React.SetStateAction<any>>
  trs_status88bc7Props: any 
  settrs_status88bc7Props: React.Dispatch<React.SetStateAction<any>>
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
  return_reason38055: any,
  setreturn_reason38055:React.Dispatch<React.SetStateAction<any>>
  return_reason38055Props: any 
  setreturn_reason38055Props: React.Dispatch<React.SetStateAction<any>>
  return_reason_code06fe7: any,
  setreturn_reason_code06fe7:React.Dispatch<React.SetStateAction<any>>
  return_reason_code06fe7Props: any 
  setreturn_reason_code06fe7Props: React.Dispatch<React.SetStateAction<any>>
  return_currency5d707: any,
  setreturn_currency5d707:React.Dispatch<React.SetStateAction<any>>
  return_currency5d707Props: any 
  setreturn_currency5d707Props: React.Dispatch<React.SetStateAction<any>>
  return_amount7f000: any,
  setreturn_amount7f000:React.Dispatch<React.SetStateAction<any>>
  return_amount7f000Props: any 
  setreturn_amount7f000Props: React.Dispatch<React.SetStateAction<any>>
  return_close1890d: any,
  setreturn_close1890d:React.Dispatch<React.SetStateAction<any>>
  return_close1890dProps: any 
  setreturn_close1890dProps: React.Dispatch<React.SetStateAction<any>>
  return_reject6b8cc: any,
  setreturn_reject6b8cc:React.Dispatch<React.SetStateAction<any>>
  return_reject6b8ccProps: any 
  setreturn_reject6b8ccProps: React.Dispatch<React.SetStateAction<any>>
  return_approveaa4d9: any,
  setreturn_approveaa4d9:React.Dispatch<React.SetStateAction<any>>
  return_approveaa4d9Props: any 
  setreturn_approveaa4d9Props: React.Dispatch<React.SetStateAction<any>>
  return_save03b4e: any,
  setreturn_save03b4e:React.Dispatch<React.SetStateAction<any>>
  return_save03b4eProps: any 
  setreturn_save03b4eProps: React.Dispatch<React.SetStateAction<any>>
  dr_account8ccf1: any,
  setdr_account8ccf1:React.Dispatch<React.SetStateAction<any>>
  dr_account8ccf1Props: any 
  setdr_account8ccf1Props: React.Dispatch<React.SetStateAction<any>>
  dr_currency6b8f0: any,
  setdr_currency6b8f0:React.Dispatch<React.SetStateAction<any>>
  dr_currency6b8f0Props: any 
  setdr_currency6b8f0Props: React.Dispatch<React.SetStateAction<any>>
  debit_exchange_rate710eb: any,
  setdebit_exchange_rate710eb:React.Dispatch<React.SetStateAction<any>>
  debit_exchange_rate710ebProps: any 
  setdebit_exchange_rate710ebProps: React.Dispatch<React.SetStateAction<any>>
  ret_amountb0252: any,
  setret_amountb0252:React.Dispatch<React.SetStateAction<any>>
  ret_amountb0252Props: any 
  setret_amountb0252Props: React.Dispatch<React.SetStateAction<any>>
  ret_currencye06ce: any,
  setret_currencye06ce:React.Dispatch<React.SetStateAction<any>>
  ret_currencye06ceProps: any 
  setret_currencye06ceProps: React.Dispatch<React.SetStateAction<any>>
  exchange_rate71ca9: any,
  setexchange_rate71ca9:React.Dispatch<React.SetStateAction<any>>
  exchange_rate71ca9Props: any 
  setexchange_rate71ca9Props: React.Dispatch<React.SetStateAction<any>>
  calculated_ret_amountdc5ca: any,
  setcalculated_ret_amountdc5ca:React.Dispatch<React.SetStateAction<any>>
  calculated_ret_amountdc5caProps: any 
  setcalculated_ret_amountdc5caProps: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_closef2db0: any,
  setapply_special_rate_closef2db0:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_closef2db0Props: any 
  setapply_special_rate_closef2db0Props: React.Dispatch<React.SetStateAction<any>>
  return_rejectdab31: any,
  setreturn_rejectdab31:React.Dispatch<React.SetStateAction<any>>
  return_rejectdab31Props: any 
  setreturn_rejectdab31Props: React.Dispatch<React.SetStateAction<any>>
  return_approve9ff3e: any,
  setreturn_approve9ff3e:React.Dispatch<React.SetStateAction<any>>
  return_approve9ff3eProps: any 
  setreturn_approve9ff3eProps: React.Dispatch<React.SetStateAction<any>>
  return_savec7f8c: any,
  setreturn_savec7f8c:React.Dispatch<React.SetStateAction<any>>
  return_savec7f8cProps: any 
  setreturn_savec7f8cProps: React.Dispatch<React.SetStateAction<any>>
  dr_account4eafa: any,
  setdr_account4eafa:React.Dispatch<React.SetStateAction<any>>
  dr_account4eafaProps: any 
  setdr_account4eafaProps: React.Dispatch<React.SetStateAction<any>>
  dr_currencyf9a11: any,
  setdr_currencyf9a11:React.Dispatch<React.SetStateAction<any>>
  dr_currencyf9a11Props: any 
  setdr_currencyf9a11Props: React.Dispatch<React.SetStateAction<any>>
  dr_amount3c1d4: any,
  setdr_amount3c1d4:React.Dispatch<React.SetStateAction<any>>
  dr_amount3c1d4Props: any 
  setdr_amount3c1d4Props: React.Dispatch<React.SetStateAction<any>>
  cr_currencya5017: any,
  setcr_currencya5017:React.Dispatch<React.SetStateAction<any>>
  cr_currencya5017Props: any 
  setcr_currencya5017Props: React.Dispatch<React.SetStateAction<any>>
  cr_amountac0e3: any,
  setcr_amountac0e3:React.Dispatch<React.SetStateAction<any>>
  cr_amountac0e3Props: any 
  setcr_amountac0e3Props: React.Dispatch<React.SetStateAction<any>>
  exchange_rate42ef6: any,
  setexchange_rate42ef6:React.Dispatch<React.SetStateAction<any>>
  exchange_rate42ef6Props: any 
  setexchange_rate42ef6Props: React.Dispatch<React.SetStateAction<any>>
  revised_exchange_rate18eff: any,
  setrevised_exchange_rate18eff:React.Dispatch<React.SetStateAction<any>>
  revised_exchange_rate18effProps: any 
  setrevised_exchange_rate18effProps: React.Dispatch<React.SetStateAction<any>>
  revised_debit_amount6130b: any,
  setrevised_debit_amount6130b:React.Dispatch<React.SetStateAction<any>>
  revised_debit_amount6130bProps: any 
  setrevised_debit_amount6130bProps: React.Dispatch<React.SetStateAction<any>>
  revised_credit_amount67a97: any,
  setrevised_credit_amount67a97:React.Dispatch<React.SetStateAction<any>>
  revised_credit_amount67a97Props: any 
  setrevised_credit_amount67a97Props: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_close57a71: any,
  setapply_special_rate_close57a71:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_close57a71Props: any 
  setapply_special_rate_close57a71Props: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_rejectba9fa: any,
  setapply_special_rate_rejectba9fa:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_rejectba9faProps: any 
  setapply_special_rate_rejectba9faProps: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_approve58219: any,
  setapply_special_rate_approve58219:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_approve58219Props: any 
  setapply_special_rate_approve58219Props: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_savebdf41: any,
  setapply_special_rate_savebdf41:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_savebdf41Props: any 
  setapply_special_rate_savebdf41Props: React.Dispatch<React.SetStateAction<any>>
  cr_accountede53: any,
  setcr_accountede53:React.Dispatch<React.SetStateAction<any>>
  cr_accountede53Props: any 
  setcr_accountede53Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency233af: any,
  setcr_currency233af:React.Dispatch<React.SetStateAction<any>>
  cr_currency233afProps: any 
  setcr_currency233afProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount807dd: any,
  setcr_amount807dd:React.Dispatch<React.SetStateAction<any>>
  cr_amount807ddProps: any 
  setcr_amount807ddProps: React.Dispatch<React.SetStateAction<any>>
  account_currency8e273: any,
  setaccount_currency8e273:React.Dispatch<React.SetStateAction<any>>
  account_currency8e273Props: any 
  setaccount_currency8e273Props: React.Dispatch<React.SetStateAction<any>>
  current_exchange_rateb1fbe: any,
  setcurrent_exchange_rateb1fbe:React.Dispatch<React.SetStateAction<any>>
  current_exchange_rateb1fbeProps: any 
  setcurrent_exchange_rateb1fbeProps: React.Dispatch<React.SetStateAction<any>>
  credit_amountda91c: any,
  setcredit_amountda91c:React.Dispatch<React.SetStateAction<any>>
  credit_amountda91cProps: any 
  setcredit_amountda91cProps: React.Dispatch<React.SetStateAction<any>>
  revised_exchange_ratedb974: any,
  setrevised_exchange_ratedb974:React.Dispatch<React.SetStateAction<any>>
  revised_exchange_ratedb974Props: any 
  setrevised_exchange_ratedb974Props: React.Dispatch<React.SetStateAction<any>>
  revised_credit_amount747be: any,
  setrevised_credit_amount747be:React.Dispatch<React.SetStateAction<any>>
  revised_credit_amount747beProps: any 
  setrevised_credit_amount747beProps: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_close57120: any,
  setapply_special_rate_process_close57120:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_close57120Props: any 
  setapply_special_rate_process_close57120Props: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_reject934bd: any,
  setapply_special_rate_process_reject934bd:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_reject934bdProps: any 
  setapply_special_rate_process_reject934bdProps: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_approvecfefb: any,
  setapply_special_rate_process_approvecfefb:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_approvecfefbProps: any 
  setapply_special_rate_process_approvecfefbProps: React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_save4fcee: any,
  setapply_special_rate_process_save4fcee:React.Dispatch<React.SetStateAction<any>>
  apply_special_rate_process_save4fceeProps: any 
  setapply_special_rate_process_save4fceeProps: React.Dispatch<React.SetStateAction<any>>
  return_reasonac630: any,
  setreturn_reasonac630:React.Dispatch<React.SetStateAction<any>>
  return_reasonac630Props: any 
  setreturn_reasonac630Props: React.Dispatch<React.SetStateAction<any>>
  return_reason_code6797b: any,
  setreturn_reason_code6797b:React.Dispatch<React.SetStateAction<any>>
  return_reason_code6797bProps: any 
  setreturn_reason_code6797bProps: React.Dispatch<React.SetStateAction<any>>
  return_currency378ac: any,
  setreturn_currency378ac:React.Dispatch<React.SetStateAction<any>>
  return_currency378acProps: any 
  setreturn_currency378acProps: React.Dispatch<React.SetStateAction<any>>
  return_amount9646b: any,
  setreturn_amount9646b:React.Dispatch<React.SetStateAction<any>>
  return_amount9646bProps: any 
  setreturn_amount9646bProps: React.Dispatch<React.SetStateAction<any>>
  tech_return_approve71c38: any,
  settech_return_approve71c38:React.Dispatch<React.SetStateAction<any>>
  tech_return_approve71c38Props: any 
  settech_return_approve71c38Props: React.Dispatch<React.SetStateAction<any>>
  tech_return_closefec09: any,
  settech_return_closefec09:React.Dispatch<React.SetStateAction<any>>
  tech_return_closefec09Props: any 
  settech_return_closefec09Props: React.Dispatch<React.SetStateAction<any>>
  tech_return_reject676d0: any,
  settech_return_reject676d0:React.Dispatch<React.SetStateAction<any>>
  tech_return_reject676d0Props: any 
  settech_return_reject676d0Props: React.Dispatch<React.SetStateAction<any>>
  tech_return_savea3f06: any,
  settech_return_savea3f06:React.Dispatch<React.SetStateAction<any>>
  tech_return_savea3f06Props: any 
  settech_return_savea3f06Props: React.Dispatch<React.SetStateAction<any>>
  payment_type7038c: any,
  setpayment_type7038c:React.Dispatch<React.SetStateAction<any>>
  payment_type7038cProps: any 
  setpayment_type7038cProps: React.Dispatch<React.SetStateAction<any>>
  message_code7cd22: any,
  setmessage_code7cd22:React.Dispatch<React.SetStateAction<any>>
  message_code7cd22Props: any 
  setmessage_code7cd22Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_sendfcaa9: any,
  setenquiry_sendfcaa9:React.Dispatch<React.SetStateAction<any>>
  enquiry_sendfcaa9Props: any 
  setenquiry_sendfcaa9Props: React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5a71c: any,
  setoutbound_or_inbound5a71c:React.Dispatch<React.SetStateAction<any>>
  outbound_or_inbound5a71cProps: any 
  setoutbound_or_inbound5a71cProps: React.Dispatch<React.SetStateAction<any>>
  searchfab91: any,
  setsearchfab91:React.Dispatch<React.SetStateAction<any>>
  searchfab91Props: any 
  setsearchfab91Props: React.Dispatch<React.SetStateAction<any>>
  refreshe9e64: any,
  setrefreshe9e64:React.Dispatch<React.SetStateAction<any>>
  refreshe9e64Props: any 
  setrefreshe9e64Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_view_alle4831: any,
  setchannel_name_view_alle4831:React.Dispatch<React.SetStateAction<any>>
  channel_name_view_alle4831Props: any 
  setchannel_name_view_alle4831Props: React.Dispatch<React.SetStateAction<any>>
  uuid_view_all17e51: any,
  setuuid_view_all17e51:React.Dispatch<React.SetStateAction<any>>
  uuid_view_all17e51Props: any 
  setuuid_view_all17e51Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_view_alleb786: any,
  setdr_account_view_alleb786:React.Dispatch<React.SetStateAction<any>>
  dr_account_view_alleb786Props: any 
  setdr_account_view_alleb786Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_view_all418a1: any,
  setdr_name_view_all418a1:React.Dispatch<React.SetStateAction<any>>
  dr_name_view_all418a1Props: any 
  setdr_name_view_all418a1Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alle3b47: any,
  setcr_account_view_alle3b47:React.Dispatch<React.SetStateAction<any>>
  cr_account_view_alle3b47Props: any 
  setcr_account_view_alle3b47Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_view_alld92c9: any,
  setcr_name_view_alld92c9:React.Dispatch<React.SetStateAction<any>>
  cr_name_view_alld92c9Props: any 
  setcr_name_view_alld92c9Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_view_all459b1: any,
  setcr_currency_view_all459b1:React.Dispatch<React.SetStateAction<any>>
  cr_currency_view_all459b1Props: any 
  setcr_currency_view_all459b1Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all511fd: any,
  setcr_amount_view_all511fd:React.Dispatch<React.SetStateAction<any>>
  cr_amount_view_all511fdProps: any 
  setcr_amount_view_all511fdProps: React.Dispatch<React.SetStateAction<any>>
  message_code_view_all346ce: any,
  setmessage_code_view_all346ce:React.Dispatch<React.SetStateAction<any>>
  message_code_view_all346ceProps: any 
  setmessage_code_view_all346ceProps: React.Dispatch<React.SetStateAction<any>>
  tran_date_view_all4223e: any,
  settran_date_view_all4223e:React.Dispatch<React.SetStateAction<any>>
  tran_date_view_all4223eProps: any 
  settran_date_view_all4223eProps: React.Dispatch<React.SetStateAction<any>>
  view_all_journey12494: any,
  setview_all_journey12494:React.Dispatch<React.SetStateAction<any>>
  view_all_journey12494Props: any 
  setview_all_journey12494Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_can_req_camt055f27d8: any,
  setchannel_name_can_req_camt055f27d8:React.Dispatch<React.SetStateAction<any>>
  channel_name_can_req_camt055f27d8Props: any 
  setchannel_name_can_req_camt055f27d8Props: React.Dispatch<React.SetStateAction<any>>
  uuid_can_req_camt0558430a: any,
  setuuid_can_req_camt0558430a:React.Dispatch<React.SetStateAction<any>>
  uuid_can_req_camt0558430aProps: any 
  setuuid_can_req_camt0558430aProps: React.Dispatch<React.SetStateAction<any>>
  dr_account_can_req_camt055050c7: any,
  setdr_account_can_req_camt055050c7:React.Dispatch<React.SetStateAction<any>>
  dr_account_can_req_camt055050c7Props: any 
  setdr_account_can_req_camt055050c7Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_can_req_camt055679dd: any,
  setdr_name_can_req_camt055679dd:React.Dispatch<React.SetStateAction<any>>
  dr_name_can_req_camt055679ddProps: any 
  setdr_name_can_req_camt055679ddProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_can_req_camt0555b65e: any,
  setcr_account_can_req_camt0555b65e:React.Dispatch<React.SetStateAction<any>>
  cr_account_can_req_camt0555b65eProps: any 
  setcr_account_can_req_camt0555b65eProps: React.Dispatch<React.SetStateAction<any>>
  cr_name_can_req_camt055bcc5f: any,
  setcr_name_can_req_camt055bcc5f:React.Dispatch<React.SetStateAction<any>>
  cr_name_can_req_camt055bcc5fProps: any 
  setcr_name_can_req_camt055bcc5fProps: React.Dispatch<React.SetStateAction<any>>
  cr_currency_can_req_camt0556e4f6: any,
  setcr_currency_can_req_camt0556e4f6:React.Dispatch<React.SetStateAction<any>>
  cr_currency_can_req_camt0556e4f6Props: any 
  setcr_currency_can_req_camt0556e4f6Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_can_req_camt0550e8b4: any,
  setcr_amount_can_req_camt0550e8b4:React.Dispatch<React.SetStateAction<any>>
  cr_amount_can_req_camt0550e8b4Props: any 
  setcr_amount_can_req_camt0550e8b4Props: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_mk_initiate_btn2902f: any,
  setcancel_request_camt055_mk_initiate_btn2902f:React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_mk_initiate_btn2902fProps: any 
  setcancel_request_camt055_mk_initiate_btn2902fProps: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_chk_verify_btn42585: any,
  setcancel_request_camt055_chk_verify_btn42585:React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_chk_verify_btn42585Props: any 
  setcancel_request_camt055_chk_verify_btn42585Props: React.Dispatch<React.SetStateAction<any>>
  message_code_can_req_camt055532c4: any,
  setmessage_code_can_req_camt055532c4:React.Dispatch<React.SetStateAction<any>>
  message_code_can_req_camt055532c4Props: any 
  setmessage_code_can_req_camt055532c4Props: React.Dispatch<React.SetStateAction<any>>
  tran_date_can_req_camt055ea19b: any,
  settran_date_can_req_camt055ea19b:React.Dispatch<React.SetStateAction<any>>
  tran_date_can_req_camt055ea19bProps: any 
  settran_date_can_req_camt055ea19bProps: React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_journeyb00e8: any,
  setcancel_request_camt055_journeyb00e8:React.Dispatch<React.SetStateAction<any>>
  cancel_request_camt055_journeyb00e8Props: any 
  setcancel_request_camt055_journeyb00e8Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_inves_req_camt110026bb: any,
  setchannel_name_inves_req_camt110026bb:React.Dispatch<React.SetStateAction<any>>
  channel_name_inves_req_camt110026bbProps: any 
  setchannel_name_inves_req_camt110026bbProps: React.Dispatch<React.SetStateAction<any>>
  uuid_inves_req_camt110c3172: any,
  setuuid_inves_req_camt110c3172:React.Dispatch<React.SetStateAction<any>>
  uuid_inves_req_camt110c3172Props: any 
  setuuid_inves_req_camt110c3172Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_inves_req_camt110a53ed: any,
  setdr_account_inves_req_camt110a53ed:React.Dispatch<React.SetStateAction<any>>
  dr_account_inves_req_camt110a53edProps: any 
  setdr_account_inves_req_camt110a53edProps: React.Dispatch<React.SetStateAction<any>>
  dr_name_inves_req_camt1101105a: any,
  setdr_name_inves_req_camt1101105a:React.Dispatch<React.SetStateAction<any>>
  dr_name_inves_req_camt1101105aProps: any 
  setdr_name_inves_req_camt1101105aProps: React.Dispatch<React.SetStateAction<any>>
  cr_account_inves_req_camt110492e3: any,
  setcr_account_inves_req_camt110492e3:React.Dispatch<React.SetStateAction<any>>
  cr_account_inves_req_camt110492e3Props: any 
  setcr_account_inves_req_camt110492e3Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_inves_req_camt110dc531: any,
  setcr_name_inves_req_camt110dc531:React.Dispatch<React.SetStateAction<any>>
  cr_name_inves_req_camt110dc531Props: any 
  setcr_name_inves_req_camt110dc531Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_inves_req_camt110e2b2d: any,
  setcr_currency_inves_req_camt110e2b2d:React.Dispatch<React.SetStateAction<any>>
  cr_currency_inves_req_camt110e2b2dProps: any 
  setcr_currency_inves_req_camt110e2b2dProps: React.Dispatch<React.SetStateAction<any>>
  cr_amount_inves_req_camt11060ab5: any,
  setcr_amount_inves_req_camt11060ab5:React.Dispatch<React.SetStateAction<any>>
  cr_amount_inves_req_camt11060ab5Props: any 
  setcr_amount_inves_req_camt11060ab5Props: React.Dispatch<React.SetStateAction<any>>
  message_code_inves_req_camt11064432: any,
  setmessage_code_inves_req_camt11064432:React.Dispatch<React.SetStateAction<any>>
  message_code_inves_req_camt11064432Props: any 
  setmessage_code_inves_req_camt11064432Props: React.Dispatch<React.SetStateAction<any>>
  tran_date_inves_req_camt110772d7: any,
  settran_date_inves_req_camt110772d7:React.Dispatch<React.SetStateAction<any>>
  tran_date_inves_req_camt110772d7Props: any 
  settran_date_inves_req_camt110772d7Props: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_mk_initiate_btn3da3f: any,
  setinves_req_camt110_mk_initiate_btn3da3f:React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_mk_initiate_btn3da3fProps: any 
  setinves_req_camt110_mk_initiate_btn3da3fProps: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_chk_verify_btn97d7c: any,
  setinves_req_camt110_chk_verify_btn97d7c:React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_chk_verify_btn97d7cProps: any 
  setinves_req_camt110_chk_verify_btn97d7cProps: React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_journey28ae2: any,
  setinves_req_camt110_journey28ae2:React.Dispatch<React.SetStateAction<any>>
  inves_req_camt110_journey28ae2Props: any 
  setinves_req_camt110_journey28ae2Props: React.Dispatch<React.SetStateAction<any>>
  channel_name_inves_res_camt111d0063: any,
  setchannel_name_inves_res_camt111d0063:React.Dispatch<React.SetStateAction<any>>
  channel_name_inves_res_camt111d0063Props: any 
  setchannel_name_inves_res_camt111d0063Props: React.Dispatch<React.SetStateAction<any>>
  uuid_inves_res_camt1118b477: any,
  setuuid_inves_res_camt1118b477:React.Dispatch<React.SetStateAction<any>>
  uuid_inves_res_camt1118b477Props: any 
  setuuid_inves_res_camt1118b477Props: React.Dispatch<React.SetStateAction<any>>
  dr_account_inves_res_camt11129cf4: any,
  setdr_account_inves_res_camt11129cf4:React.Dispatch<React.SetStateAction<any>>
  dr_account_inves_res_camt11129cf4Props: any 
  setdr_account_inves_res_camt11129cf4Props: React.Dispatch<React.SetStateAction<any>>
  dr_name_inves_res_camt111514e6: any,
  setdr_name_inves_res_camt111514e6:React.Dispatch<React.SetStateAction<any>>
  dr_name_inves_res_camt111514e6Props: any 
  setdr_name_inves_res_camt111514e6Props: React.Dispatch<React.SetStateAction<any>>
  cr_account_inves_res_camt1112e6f0: any,
  setcr_account_inves_res_camt1112e6f0:React.Dispatch<React.SetStateAction<any>>
  cr_account_inves_res_camt1112e6f0Props: any 
  setcr_account_inves_res_camt1112e6f0Props: React.Dispatch<React.SetStateAction<any>>
  cr_name_inves_res_camt11102682: any,
  setcr_name_inves_res_camt11102682:React.Dispatch<React.SetStateAction<any>>
  cr_name_inves_res_camt11102682Props: any 
  setcr_name_inves_res_camt11102682Props: React.Dispatch<React.SetStateAction<any>>
  cr_currency_inves_res_camt1114b416: any,
  setcr_currency_inves_res_camt1114b416:React.Dispatch<React.SetStateAction<any>>
  cr_currency_inves_res_camt1114b416Props: any 
  setcr_currency_inves_res_camt1114b416Props: React.Dispatch<React.SetStateAction<any>>
  cr_amount_inves_res_camt11184bb7: any,
  setcr_amount_inves_res_camt11184bb7:React.Dispatch<React.SetStateAction<any>>
  cr_amount_inves_res_camt11184bb7Props: any 
  setcr_amount_inves_res_camt11184bb7Props: React.Dispatch<React.SetStateAction<any>>
  message_code_inves_res_camt111005f1: any,
  setmessage_code_inves_res_camt111005f1:React.Dispatch<React.SetStateAction<any>>
  message_code_inves_res_camt111005f1Props: any 
  setmessage_code_inves_res_camt111005f1Props: React.Dispatch<React.SetStateAction<any>>
  tran_date_inves_res_camt111a30a9: any,
  settran_date_inves_res_camt111a30a9:React.Dispatch<React.SetStateAction<any>>
  tran_date_inves_res_camt111a30a9Props: any 
  settran_date_inves_res_camt111a30a9Props: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_mk_initiate_btn47e33: any,
  setinves_res_camt111_mk_initiate_btn47e33:React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_mk_initiate_btn47e33Props: any 
  setinves_res_camt111_mk_initiate_btn47e33Props: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_chk_verify_btnf5ad1: any,
  setinves_res_camt111_chk_verify_btnf5ad1:React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_chk_verify_btnf5ad1Props: any 
  setinves_res_camt111_chk_verify_btnf5ad1Props: React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_journey3d289: any,
  setinves_res_camt111_journey3d289:React.Dispatch<React.SetStateAction<any>>
  inves_res_camt111_journey3d289Props: any 
  setinves_res_camt111_journey3d289Props: React.Dispatch<React.SetStateAction<any>>
  search_label130a2: any,
  setsearch_label130a2:React.Dispatch<React.SetStateAction<any>>
  search_label130a2Props: any 
  setsearch_label130a2Props: React.Dispatch<React.SetStateAction<any>>
  top_dividerdea5b: any,
  settop_dividerdea5b:React.Dispatch<React.SetStateAction<any>>
  top_dividerdea5bProps: any 
  settop_dividerdea5bProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date28cb9: any,
  settrs_created_date28cb9:React.Dispatch<React.SetStateAction<any>>
  trs_created_date28cb9Props: any 
  settrs_created_date28cb9Props: React.Dispatch<React.SetStateAction<any>>
  uuida0e9e: any,
  setuuida0e9e:React.Dispatch<React.SetStateAction<any>>
  uuida0e9eProps: any 
  setuuida0e9eProps: React.Dispatch<React.SetStateAction<any>>
  debtor_account_no1b62b: any,
  setdebtor_account_no1b62b:React.Dispatch<React.SetStateAction<any>>
  debtor_account_no1b62bProps: any 
  setdebtor_account_no1b62bProps: React.Dispatch<React.SetStateAction<any>>
  debtor_name908b6: any,
  setdebtor_name908b6:React.Dispatch<React.SetStateAction<any>>
  debtor_name908b6Props: any 
  setdebtor_name908b6Props: React.Dispatch<React.SetStateAction<any>>
  creditor_account_no14a5f: any,
  setcreditor_account_no14a5f:React.Dispatch<React.SetStateAction<any>>
  creditor_account_no14a5fProps: any 
  setcreditor_account_no14a5fProps: React.Dispatch<React.SetStateAction<any>>
  cr_name1ecf4: any,
  setcr_name1ecf4:React.Dispatch<React.SetStateAction<any>>
  cr_name1ecf4Props: any 
  setcr_name1ecf4Props: React.Dispatch<React.SetStateAction<any>>
  cr_currencydbebf: any,
  setcr_currencydbebf:React.Dispatch<React.SetStateAction<any>>
  cr_currencydbebfProps: any 
  setcr_currencydbebfProps: React.Dispatch<React.SetStateAction<any>>
  cr_amounta1974: any,
  setcr_amounta1974:React.Dispatch<React.SetStateAction<any>>
  cr_amounta1974Props: any 
  setcr_amounta1974Props: React.Dispatch<React.SetStateAction<any>>
  message_codefa765: any,
  setmessage_codefa765:React.Dispatch<React.SetStateAction<any>>
  message_codefa765Props: any 
  setmessage_codefa765Props: React.Dispatch<React.SetStateAction<any>>
  bottom_divideradc51: any,
  setbottom_divideradc51:React.Dispatch<React.SetStateAction<any>>
  bottom_divideradc51Props: any 
  setbottom_divideradc51Props: React.Dispatch<React.SetStateAction<any>>
  search4197d: any,
  setsearch4197d:React.Dispatch<React.SetStateAction<any>>
  search4197dProps: any 
  setsearch4197dProps: React.Dispatch<React.SetStateAction<any>>
  clear91c04: any,
  setclear91c04:React.Dispatch<React.SetStateAction<any>>
  clear91c04Props: any 
  setclear91c04Props: React.Dispatch<React.SetStateAction<any>>
  tran_date5d7c0: any,
  settran_date5d7c0:React.Dispatch<React.SetStateAction<any>>
  tran_date5d7c0Props: any 
  settran_date5d7c0Props: React.Dispatch<React.SetStateAction<any>>
  message_code5df7d: any,
  setmessage_code5df7d:React.Dispatch<React.SetStateAction<any>>
  message_code5df7dProps: any 
  setmessage_code5df7dProps: React.Dispatch<React.SetStateAction<any>>
  cancel_reason1d34e: any,
  setcancel_reason1d34e:React.Dispatch<React.SetStateAction<any>>
  cancel_reason1d34eProps: any 
  setcancel_reason1d34eProps: React.Dispatch<React.SetStateAction<any>>
  reason_description5420a: any,
  setreason_description5420a:React.Dispatch<React.SetStateAction<any>>
  reason_description5420aProps: any 
  setreason_description5420aProps: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_closed99be: any,
  setcancelrequestcamt055_closed99be:React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_closed99beProps: any 
  setcancelrequestcamt055_closed99beProps: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_reject88d84: any,
  setcancelrequestcamt055_reject88d84:React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_reject88d84Props: any 
  setcancelrequestcamt055_reject88d84Props: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_approve510fd: any,
  setcancelrequestcamt055_approve510fd:React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_approve510fdProps: any 
  setcancelrequestcamt055_approve510fdProps: React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_save46cc8: any,
  setcancelrequestcamt055_save46cc8:React.Dispatch<React.SetStateAction<any>>
  cancelrequestcamt055_save46cc8Props: any 
  setcancelrequestcamt055_save46cc8Props: React.Dispatch<React.SetStateAction<any>>
  customwidgetb9148: any,
  setcustomwidgetb9148:React.Dispatch<React.SetStateAction<any>>
  customwidgetb9148Props: any 
  setcustomwidgetb9148Props: React.Dispatch<React.SetStateAction<any>>
  tran_date9acc4: any,
  settran_date9acc4:React.Dispatch<React.SetStateAction<any>>
  tran_date9acc4Props: any 
  settran_date9acc4Props: React.Dispatch<React.SetStateAction<any>>
  message_code581ad: any,
  setmessage_code581ad:React.Dispatch<React.SetStateAction<any>>
  message_code581adProps: any 
  setmessage_code581adProps: React.Dispatch<React.SetStateAction<any>>
  investigation_type576c6: any,
  setinvestigation_type576c6:React.Dispatch<React.SetStateAction<any>>
  investigation_type576c6Props: any 
  setinvestigation_type576c6Props: React.Dispatch<React.SetStateAction<any>>
  investigation_reason74007: any,
  setinvestigation_reason74007:React.Dispatch<React.SetStateAction<any>>
  investigation_reason74007Props: any 
  setinvestigation_reason74007Props: React.Dispatch<React.SetStateAction<any>>
  reason_description6d274: any,
  setreason_description6d274:React.Dispatch<React.SetStateAction<any>>
  reason_description6d274Props: any 
  setreason_description6d274Props: React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_closee3b00: any,
  setinvesreqcamt110_closee3b00:React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_closee3b00Props: any 
  setinvesreqcamt110_closee3b00Props: React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_reject5b353: any,
  setinvesreqcamt110_reject5b353:React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_reject5b353Props: any 
  setinvesreqcamt110_reject5b353Props: React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_approve727ff: any,
  setinvesreqcamt110_approve727ff:React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_approve727ffProps: any 
  setinvesreqcamt110_approve727ffProps: React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_save86b45: any,
  setinvesreqcamt110_save86b45:React.Dispatch<React.SetStateAction<any>>
  invesreqcamt110_save86b45Props: any 
  setinvesreqcamt110_save86b45Props: React.Dispatch<React.SetStateAction<any>>
  customwidgetad336: any,
  setcustomwidgetad336:React.Dispatch<React.SetStateAction<any>>
  customwidgetad336Props: any 
  setcustomwidgetad336Props: React.Dispatch<React.SetStateAction<any>>
  tran_date51032: any,
  settran_date51032:React.Dispatch<React.SetStateAction<any>>
  tran_date51032Props: any 
  settran_date51032Props: React.Dispatch<React.SetStateAction<any>>
  message_code3e093: any,
  setmessage_code3e093:React.Dispatch<React.SetStateAction<any>>
  message_code3e093Props: any 
  setmessage_code3e093Props: React.Dispatch<React.SetStateAction<any>>
  response_type65b90: any,
  setresponse_type65b90:React.Dispatch<React.SetStateAction<any>>
  response_type65b90Props: any 
  setresponse_type65b90Props: React.Dispatch<React.SetStateAction<any>>
  response_reason7039a: any,
  setresponse_reason7039a:React.Dispatch<React.SetStateAction<any>>
  response_reason7039aProps: any 
  setresponse_reason7039aProps: React.Dispatch<React.SetStateAction<any>>
  reason_descriptiond33de: any,
  setreason_descriptiond33de:React.Dispatch<React.SetStateAction<any>>
  reason_descriptiond33deProps: any 
  setreason_descriptiond33deProps: React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_close9d90c: any,
  setinvesrescamt111_close9d90c:React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_close9d90cProps: any 
  setinvesrescamt111_close9d90cProps: React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_reject651be: any,
  setinvesrescamt111_reject651be:React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_reject651beProps: any 
  setinvesrescamt111_reject651beProps: React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_approve0d9a3: any,
  setinvesrescamt111_approve0d9a3:React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_approve0d9a3Props: any 
  setinvesrescamt111_approve0d9a3Props: React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_save36a0c: any,
  setinvesrescamt111_save36a0c:React.Dispatch<React.SetStateAction<any>>
  invesrescamt111_save36a0cProps: any 
  setinvesrescamt111_save36a0cProps: React.Dispatch<React.SetStateAction<any>>
  customwidgetab151: any,
  setcustomwidgetab151:React.Dispatch<React.SetStateAction<any>>
  customwidgetab151Props: any 
  setcustomwidgetab151Props: React.Dispatch<React.SetStateAction<any>>
  productcode5d3b1: any,
  setproductcode5d3b1:React.Dispatch<React.SetStateAction<any>>
  productcode5d3b1Props: any 
  setproductcode5d3b1Props: React.Dispatch<React.SetStateAction<any>>
  message_type404e3: any,
  setmessage_type404e3:React.Dispatch<React.SetStateAction<any>>
  message_type404e3Props: any 
  setmessage_type404e3Props: React.Dispatch<React.SetStateAction<any>>
  datece158: any,
  setdatece158:React.Dispatch<React.SetStateAction<any>>
  datece158Props: any 
  setdatece158Props: React.Dispatch<React.SetStateAction<any>>
  uuid076a4: any,
  setuuid076a4:React.Dispatch<React.SetStateAction<any>>
  uuid076a4Props: any 
  setuuid076a4Props: React.Dispatch<React.SetStateAction<any>>
  statusa3cf5: any,
  setstatusa3cf5:React.Dispatch<React.SetStateAction<any>>
  statusa3cf5Props: any 
  setstatusa3cf5Props: React.Dispatch<React.SetStateAction<any>>
  reject_reasonc1c38: any,
  setreject_reasonc1c38:React.Dispatch<React.SetStateAction<any>>
  reject_reasonc1c38Props: any 
  setreject_reasonc1c38Props: React.Dispatch<React.SetStateAction<any>>
  customwidgetd1c52: any,
  setcustomwidgetd1c52:React.Dispatch<React.SetStateAction<any>>
  customwidgetd1c52Props: any 
  setcustomwidgetd1c52Props: React.Dispatch<React.SetStateAction<any>>
  op_financial_submit_btna4ae6: any,
  setop_financial_submit_btna4ae6:React.Dispatch<React.SetStateAction<any>>
  op_financial_submit_btna4ae6Props: any 
  setop_financial_submit_btna4ae6Props: React.Dispatch<React.SetStateAction<any>>
  ip_productcodea41e0: any,
  setip_productcodea41e0:React.Dispatch<React.SetStateAction<any>>
  ip_productcodea41e0Props: any 
  setip_productcodea41e0Props: React.Dispatch<React.SetStateAction<any>>
  ip_message_type89b47: any,
  setip_message_type89b47:React.Dispatch<React.SetStateAction<any>>
  ip_message_type89b47Props: any 
  setip_message_type89b47Props: React.Dispatch<React.SetStateAction<any>>
  ip_dated0c4a: any,
  setip_dated0c4a:React.Dispatch<React.SetStateAction<any>>
  ip_dated0c4aProps: any 
  setip_dated0c4aProps: React.Dispatch<React.SetStateAction<any>>
  amountdeca1: any,
  setamountdeca1:React.Dispatch<React.SetStateAction<any>>
  amountdeca1Props: any 
  setamountdeca1Props: React.Dispatch<React.SetStateAction<any>>
  ip_financial_submit_btne9bd8: any,
  setip_financial_submit_btne9bd8:React.Dispatch<React.SetStateAction<any>>
  ip_financial_submit_btne9bd8Props: any 
  setip_financial_submit_btne9bd8Props: React.Dispatch<React.SetStateAction<any>>
  op_110_productcodec2128: any,
  setop_110_productcodec2128:React.Dispatch<React.SetStateAction<any>>
  op_110_productcodec2128Props: any 
  setop_110_productcodec2128Props: React.Dispatch<React.SetStateAction<any>>
  op_110_message_type8876c: any,
  setop_110_message_type8876c:React.Dispatch<React.SetStateAction<any>>
  op_110_message_type8876cProps: any 
  setop_110_message_type8876cProps: React.Dispatch<React.SetStateAction<any>>
  op_110_date89cec: any,
  setop_110_date89cec:React.Dispatch<React.SetStateAction<any>>
  op_110_date89cecProps: any 
  setop_110_date89cecProps: React.Dispatch<React.SetStateAction<any>>
  op_110_uuid82718: any,
  setop_110_uuid82718:React.Dispatch<React.SetStateAction<any>>
  op_110_uuid82718Props: any 
  setop_110_uuid82718Props: React.Dispatch<React.SetStateAction<any>>
  op_110_request_type2c432: any,
  setop_110_request_type2c432:React.Dispatch<React.SetStateAction<any>>
  op_110_request_type2c432Props: any 
  setop_110_request_type2c432Props: React.Dispatch<React.SetStateAction<any>>
  op_110_request_reason6d6fa: any,
  setop_110_request_reason6d6fa:React.Dispatch<React.SetStateAction<any>>
  op_110_request_reason6d6faProps: any 
  setop_110_request_reason6d6faProps: React.Dispatch<React.SetStateAction<any>>
  op_110_submit_btn08cbe: any,
  setop_110_submit_btn08cbe:React.Dispatch<React.SetStateAction<any>>
  op_110_submit_btn08cbeProps: any 
  setop_110_submit_btn08cbeProps: React.Dispatch<React.SetStateAction<any>>
  op_111_productcodedfd30: any,
  setop_111_productcodedfd30:React.Dispatch<React.SetStateAction<any>>
  op_111_productcodedfd30Props: any 
  setop_111_productcodedfd30Props: React.Dispatch<React.SetStateAction<any>>
  op_111_message_typec1184: any,
  setop_111_message_typec1184:React.Dispatch<React.SetStateAction<any>>
  op_111_message_typec1184Props: any 
  setop_111_message_typec1184Props: React.Dispatch<React.SetStateAction<any>>
  op_111_dateadfdb: any,
  setop_111_dateadfdb:React.Dispatch<React.SetStateAction<any>>
  op_111_dateadfdbProps: any 
  setop_111_dateadfdbProps: React.Dispatch<React.SetStateAction<any>>
  op_111_uuidd642f: any,
  setop_111_uuidd642f:React.Dispatch<React.SetStateAction<any>>
  op_111_uuidd642fProps: any 
  setop_111_uuidd642fProps: React.Dispatch<React.SetStateAction<any>>
  op_111_response_status46eaf: any,
  setop_111_response_status46eaf:React.Dispatch<React.SetStateAction<any>>
  op_111_response_status46eafProps: any 
  setop_111_response_status46eafProps: React.Dispatch<React.SetStateAction<any>>
  op_111_response_reason39b24: any,
  setop_111_response_reason39b24:React.Dispatch<React.SetStateAction<any>>
  op_111_response_reason39b24Props: any 
  setop_111_response_reason39b24Props: React.Dispatch<React.SetStateAction<any>>
  op_111_submit_btn3f88e: any,
  setop_111_submit_btn3f88e:React.Dispatch<React.SetStateAction<any>>
  op_111_submit_btn3f88eProps: any 
  setop_111_submit_btn3f88eProps: React.Dispatch<React.SetStateAction<any>>
  ip_055_productcode77a4c: any,
  setip_055_productcode77a4c:React.Dispatch<React.SetStateAction<any>>
  ip_055_productcode77a4cProps: any 
  setip_055_productcode77a4cProps: React.Dispatch<React.SetStateAction<any>>
  ip_055_message_typed8915: any,
  setip_055_message_typed8915:React.Dispatch<React.SetStateAction<any>>
  ip_055_message_typed8915Props: any 
  setip_055_message_typed8915Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_date87912: any,
  setip_055_date87912:React.Dispatch<React.SetStateAction<any>>
  ip_055_date87912Props: any 
  setip_055_date87912Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_uuidf2ab4: any,
  setip_055_uuidf2ab4:React.Dispatch<React.SetStateAction<any>>
  ip_055_uuidf2ab4Props: any 
  setip_055_uuidf2ab4Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_reason_code579a1: any,
  setip_055_reason_code579a1:React.Dispatch<React.SetStateAction<any>>
  ip_055_reason_code579a1Props: any 
  setip_055_reason_code579a1Props: React.Dispatch<React.SetStateAction<any>>
  ip_055_additional_info7ae0a: any,
  setip_055_additional_info7ae0a:React.Dispatch<React.SetStateAction<any>>
  ip_055_additional_info7ae0aProps: any 
  setip_055_additional_info7ae0aProps: React.Dispatch<React.SetStateAction<any>>
  ip_055_submit_btnfff0c: any,
  setip_055_submit_btnfff0c:React.Dispatch<React.SetStateAction<any>>
  ip_055_submit_btnfff0cProps: any 
  setip_055_submit_btnfff0cProps: React.Dispatch<React.SetStateAction<any>>
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
  linechartdd99a: any,
  setlinechartdd99a:React.Dispatch<React.SetStateAction<any>>
  linechartdd99aProps: any 
  setlinechartdd99aProps: React.Dispatch<React.SetStateAction<any>>
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
  statusd47ce: any,
  setstatusd47ce:React.Dispatch<React.SetStateAction<any>>
  statusd47ceProps: any 
  setstatusd47ceProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  transactionproduct_v1: any 
  settransactionproduct_v1: React.Dispatch<React.SetStateAction<any>>
  transactionproduct_v1Props: any 
  settransactionproduct_v1Props: React.Dispatch<React.SetStateAction<any>>
  advancesearch_v1: any 
  setadvancesearch_v1: React.Dispatch<React.SetStateAction<any>>
  advancesearch_v1Props: any 
  setadvancesearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1: any 
  settransactionsearch_v1: React.Dispatch<React.SetStateAction<any>>
  transactionsearch_v1Props: any 
  settransactionsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  paymentinfo_v1: any 
  setpaymentinfo_v1: React.Dispatch<React.SetStateAction<any>>
  paymentinfo_v1Props: any 
  setpaymentinfo_v1Props: React.Dispatch<React.SetStateAction<any>>
  beneficiarylistpopup_v1: any 
  setbeneficiarylistpopup_v1: React.Dispatch<React.SetStateAction<any>>
  beneficiarylistpopup_v1Props: any 
  setbeneficiarylistpopup_v1Props: React.Dispatch<React.SetStateAction<any>>
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
  inboundreturnprocess_v1: any 
  setinboundreturnprocess_v1: React.Dispatch<React.SetStateAction<any>>
  inboundreturnprocess_v1Props: any 
  setinboundreturnprocess_v1Props: React.Dispatch<React.SetStateAction<any>>
  outboundmanualreturnprocess_v1: any 
  setoutboundmanualreturnprocess_v1: React.Dispatch<React.SetStateAction<any>>
  outboundmanualreturnprocess_v1Props: any 
  setoutboundmanualreturnprocess_v1Props: React.Dispatch<React.SetStateAction<any>>
  outboundapplyspecialrate_v1: any 
  setoutboundapplyspecialrate_v1: React.Dispatch<React.SetStateAction<any>>
  outboundapplyspecialrate_v1Props: any 
  setoutboundapplyspecialrate_v1Props: React.Dispatch<React.SetStateAction<any>>
  inboundapplyspecialrateprocess_v1: any 
  setinboundapplyspecialrateprocess_v1: React.Dispatch<React.SetStateAction<any>>
  inboundapplyspecialrateprocess_v1Props: any 
  setinboundapplyspecialrateprocess_v1Props: React.Dispatch<React.SetStateAction<any>>
  techinboundreturnprocess_v1: any 
  settechinboundreturnprocess_v1: React.Dispatch<React.SetStateAction<any>>
  techinboundreturnprocess_v1Props: any 
  settechinboundreturnprocess_v1Props: React.Dispatch<React.SetStateAction<any>>
  enquiry_v1: any 
  setenquiry_v1: React.Dispatch<React.SetStateAction<any>>
  enquiry_v1Props: any 
  setenquiry_v1Props: React.Dispatch<React.SetStateAction<any>>
  nftransactionproduct_v1: any 
  setnftransactionproduct_v1: React.Dispatch<React.SetStateAction<any>>
  nftransactionproduct_v1Props: any 
  setnftransactionproduct_v1Props: React.Dispatch<React.SetStateAction<any>>
  nftransactionsearch_v1: any 
  setnftransactionsearch_v1: React.Dispatch<React.SetStateAction<any>>
  nftransactionsearch_v1Props: any 
  setnftransactionsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  nfcancelrequestcamt055_v1: any 
  setnfcancelrequestcamt055_v1: React.Dispatch<React.SetStateAction<any>>
  nfcancelrequestcamt055_v1Props: any 
  setnfcancelrequestcamt055_v1Props: React.Dispatch<React.SetStateAction<any>>
  nfinvestigationrequestcamt110_v1: any 
  setnfinvestigationrequestcamt110_v1: React.Dispatch<React.SetStateAction<any>>
  nfinvestigationrequestcamt110_v1Props: any 
  setnfinvestigationrequestcamt110_v1Props: React.Dispatch<React.SetStateAction<any>>
  nfinvestigationresponsecamt111_v1: any 
  setnfinvestigationresponsecamt111_v1: React.Dispatch<React.SetStateAction<any>>
  nfinvestigationresponsecamt111_v1Props: any 
  setnfinvestigationresponsecamt111_v1Props: React.Dispatch<React.SetStateAction<any>>
  acksimulator_v1: any 
  setacksimulator_v1: React.Dispatch<React.SetStateAction<any>>
  acksimulator_v1Props: any 
  setacksimulator_v1Props: React.Dispatch<React.SetStateAction<any>>
  dashboard_v1: any 
  setdashboard_v1: React.Dispatch<React.SetStateAction<any>>
  dashboard_v1Props: any 
  setdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_transaction_v1Props: any 
  setdfd_transaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelcombosearch_v1Props: any 
  setdfd_channelcombosearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_processstatuscombosearch_v1Props: any 
  setdfd_processstatuscombosearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_currencycombo_v1Props: any 
  setdfd_currencycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_beneficiarylistquery_v1Props: any 
  setdfd_beneficiarylistquery_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_purposecombo_v1Props: any 
  setdfd_purposecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_countrycombo_v1Props: any 
  setdfd_countrycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_crbankcodecombo_v1Props: any 
  setdfd_crbankcodecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_drbankcodecombo_v1Props: any 
  setdfd_drbankcodecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_chargetypecombo_v1Props: any 
  setdfd_chargetypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_paymentmethodcombo_v1Props: any 
  setdfd_paymentmethodcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_initiationinstructionprioritycombo_v1Props: any 
  setdfd_initiationinstructionprioritycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_categorypurposecombo_v1Props: any 
  setdfd_categorypurposecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_correspondentbankcombo_v1Props: any 
  setdfd_correspondentbankcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_manualinitiationuimappingquery_v1Props: any 
  setdfd_manualinitiationuimappingquery_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_servicelevelcombo_v1Props: any 
  setdfd_servicelevelcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_journey_v1Props: any 
  setdfd_journey_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_returnreason_v1Props: any 
  setdfd_returnreason_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transactiondetailquery_v1Props: any 
  setdfd_transactiondetailquery_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquirypaymenttypecombo_v1Props: any 
  setdfd_enquirypaymenttypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_enquirymessagetypecombo_v1Props: any 
  setdfd_enquirymessagetypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nftransaction_v1Props: any 
  setdfd_nftransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nftranmaintransaction_v1Props: any 
  setdfd_nftranmaintransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfcancelreasoncombo_v1Props: any 
  setdfd_nfcancelreasoncombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfinvestigationtypecombo_v1Props: any 
  setdfd_nfinvestigationtypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfinvestigationreasoncombo_v1Props: any 
  setdfd_nfinvestigationreasoncombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfresponsetypecombo_v1Props: any 
  setdfd_nfresponsetypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfresponsereasoncombo_v1Props: any 
  setdfd_nfresponsereasoncombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfviewalltransaction_v1Props: any 
  setdfd_nfviewalltransaction_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_messagetypesimulatorcombo_v1Props: any 
  setdfd_messagetypesimulatorcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_statussimulatorcombo_v1Props: any 
  setdfd_statussimulatorcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_ipmessagetypestimulatorcombo_v1Props: any 
  setdfd_ipmessagetypestimulatorcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfsimulatormessage_v1Props: any 
  setdfd_nfsimulatormessage_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfreqtype_v1Props: any 
  setdfd_nfreqtype_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfreqreason_v1Props: any 
  setdfd_nfreqreason_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfrespreason_v1Props: any 
  setdfd_nfrespreason_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_nfresptype_v1Props: any 
  setdfd_nfresptype_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_rejectreasonsimulatorcombo_v1Props: any 
  setdfd_rejectreasonsimulatorcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channeldashboard_dashboard_v1Props: any 
  setdfd_channeldashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_currencydashboard_dashboard_v1Props: any 
  setdfd_currencydashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transaction_dashboard_v1Props: any 
  setdfd_transaction_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_onlineofflinedashboard_dashboard_v1Props: any 
  setdfd_onlineofflinedashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_processcategorydashboard_dashboard_v1Props: any 
  setdfd_processcategorydashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_transactioncountvphdashboard_dashboard_v1Props: any 
  setdfd_transactioncountvphdashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelcountvphdashboard_dashboard_v1Props: any 
  setdfd_channelcountvphdashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_channelchartdashboard_dashboard_v1Props: any 
  setdfd_channelchartdashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_onlineofflinecountvphdashboard_dashboard_v1Props: any 
  setdfd_onlineofflinecountvphdashboard_dashboard_v1Props: React.Dispatch<React.SetStateAction<any>>

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
            "advance_search",
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
        const [notification_pending_tab223c7, setnotification_pending_tab223c7 ] = React.useState<any>({}) 
    const [notification_pending_tab223c7Props, setnotification_pending_tab223c7Props ] = React.useState<any>({
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
    
    const [notification_pending_table45836, setnotification_pending_table45836 ] = React.useState<any>([]) 
    const [notification_pending_table45836Props, setnotification_pending_table45836Props ] = React.useState<any>({
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
        const [notification_pending_journey_groupc9534, setnotification_pending_journey_groupc9534 ] = React.useState<any>({}) 
    const [notification_pending_journey_groupc9534Props, setnotification_pending_journey_groupc9534Props ] = React.useState<any>({
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
        const [enquiry_tabfb252, setenquiry_tabfb252 ] = React.useState<any>({}) 
    const [enquiry_tabfb252Props, setenquiry_tabfb252Props ] = React.useState<any>({
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
    
    const [enquiry_tableb3b4e, setenquiry_tableb3b4e ] = React.useState<any>([]) 
    const [enquiry_tableb3b4eProps, setenquiry_tableb3b4eProps ] = React.useState<any>({
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
        const [enquiry_journey_group047c9, setenquiry_journey_group047c9 ] = React.useState<any>({}) 
    const [enquiry_journey_group047c9Props, setenquiry_journey_group047c9Props ] = React.useState<any>({
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
        const [group7e695, setgroup7e695 ] = React.useState<any>({}) 
    const [group7e695Props, setgroup7e695Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "trs_created_date",
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
            "top_divider",
            "trs_created_date",
            "dr_account",
            "dr_name",
            "cr_account",
            "payment_currency",
            "payment_currency",
            "cr_currency",
            "dr_amount",
            "uuid",
            "channel",
            "channel",
            "processstatus",
            "processstatus",
            "trs_status",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        const [payment_info_group1bac9, setpayment_info_group1bac9 ] = React.useState<any>({}) 
    const [payment_info_group1bac9Props, setpayment_info_group1bac9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_info_text_label",
            "customwidget",
      ]
      }) 
        const [midynamicactions3b39d, setmidynamicactions3b39d ] = React.useState<any>({}) 
    const [midynamicactions3b39dProps, setmidynamicactions3b39dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "repair_new_payment_mk_save_btn",
            "cancel",
            "new_payment_chk_reject_btn",
            "new_payment_chk_approve_btn",
            "save",
      ]
      }) 
        const [general_info_groupc83e6, setgeneral_info_groupc83e6 ] = React.useState<any>({}) 
    const [general_info_groupc83e6Props, setgeneral_info_groupc83e6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "general_info_text_label",
            "value_date",
            "service_level",
            "purpose",
            "purpose",
            "purpose",
      ]
      }) 
        const [dbtr_info_group4e8ea, setdbtr_info_group4e8ea ] = React.useState<any>({}) 
    const [dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dbtr_info_text_label",
            "dr_account",
            "dr_name",
            "dr_currency",
            "dr_currency",
            "dr_currency",
            "dr_account_balance",
            "dr_iban",
            "dr_street_name",
            "dr_building_number",
            "dr_post_code",
            "dr_town_name",
            "dr_country",
            "dr_bank_code",
            "amount_input_type",
            "dr_amount",
            "settlement_amount",
      ]
      }) 
        const [cr_info_groupb01e8, setcr_info_groupb01e8 ] = React.useState<any>({}) 
    const [cr_info_groupb01e8Props, setcr_info_groupb01e8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "creditor_info_label_text",
            "ben_checkbox",
            "cr_account",
            "cr_name",
            "cr_street_name",
            "cr_benif_action",
            "cr_building_name",
            "cr_floor",
            "cr_post_code",
            "cr_town_name",
            "cr_country",
            "cr_currency",
            "cr_currency",
            "cr_currency",
            "exchange_rate",
            "cr_amount",
            "cr_bank_code",
            "cr_bank_code",
            "cr_bank_code",
            "cr_clr_code",
      ]
      }) 
        const [chrg_info_group76ab0, setchrg_info_group76ab0 ] = React.useState<any>({}) 
    const [chrg_info_group76ab0Props, setchrg_info_group76ab0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "chrg_info_text_label",
            "charge_type",
            "charge_type",
            "charge_type",
            "charge_amount",
            "correspondent_charge",
            "bank_charge",
      ]
      }) 
        const [add_info_groupe8dc6, setadd_info_groupe8dc6 ] = React.useState<any>({}) 
    const [add_info_groupe8dc6Props, setadd_info_groupe8dc6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "add_info_text_label",
            "payment_method",
            "payment_method",
            "payment_method",
            "instruction_priority",
            "instruction_priority",
            "instruction_priority",
            "category_purpose",
            "category_purpose",
            "category_purpose",
            "remittance_info",
            "intermediary_institution",
            "sender_receiver_info",
            "correspondent_bank",
      ]
      }) 
        const [beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4 ] = React.useState<any>({}) 
    const [beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "benificiary_text",
            "cr_name",
            "search_btn",
            "ben_divider",
            "confirm_divider",
            "clear_button",
            "confirm_button",
      ]
      }) 
        const [ben_list_groupb24ac, setben_list_groupb24ac ] = React.useState<any>({}) 
    const [ben_list_groupb24acProps, setben_list_groupb24acProps ] = React.useState<any>({
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
        const [benc_groupa95a7, setbenc_groupa95a7 ] = React.useState<any>({}) 
    const [benc_groupa95a7Props, setbenc_groupa95a7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cr_name",
            "icon",
            "cr_account",
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
            "divider_top",
            "transaction_date_time_label",
            "processed_by_label",
            "trs_created_date",
            "processing_system",
            "currency_label",
            "amount_label",
            "dr_currency",
            "dr_amount",
            "debit_account_label",
            "process_status_label",
            "dr_account",
            "trs_process_status",
            "credit_account_label",
            "status_label",
            "cr_account",
            "trs_status",
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
        const [returnreasonmaingroup60037, setreturnreasonmaingroup60037 ] = React.useState<any>({}) 
    const [returnreasonmaingroup60037Props, setreturnreasonmaingroup60037Props ] = React.useState<any>({
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
        const [returnreasonsubgroup63981, setreturnreasonsubgroup63981 ] = React.useState<any>({}) 
    const [returnreasonsubgroup63981Props, setreturnreasonsubgroup63981Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason",
            "return_reason",
            "return_reason",
            "return_reason_code",
            "return_reason_code",
            "return_reason_code",
            "cr_currency",
            "cr_amount",
      ]
      }) 
        const [returndynamicactions87eb7, setreturndynamicactions87eb7 ] = React.useState<any>({}) 
    const [returndynamicactions87eb7Props, setreturndynamicactions87eb7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_close",
            "return_reject",
            "return_approve",
            "return_save",
      ]
      }) 
        const [applyspecialratemaingroup6cd35, setapplyspecialratemaingroup6cd35 ] = React.useState<any>({}) 
    const [applyspecialratemaingroup6cd35Props, setapplyspecialratemaingroup6cd35Props ] = React.useState<any>({
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
        const [applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745 ] = React.useState<any>({}) 
    const [applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dr_account",
            "dr_currency",
            "debit_exchange_rate",
            "ret_amount",
            "ret_currency",
            "exchange_rate",
            "calculated_ret_amount",
      ]
      }) 
        const [applyspecialratedynamicactions8ee48, setapplyspecialratedynamicactions8ee48 ] = React.useState<any>({}) 
    const [applyspecialratedynamicactions8ee48Props, setapplyspecialratedynamicactions8ee48Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_close",
            "return_reject",
            "return_approve",
            "return_save",
      ]
      }) 
        const [applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950 ] = React.useState<any>({}) 
    const [applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props ] = React.useState<any>({
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
        const [applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd ] = React.useState<any>({}) 
    const [applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dr_account",
            "dr_currency",
            "dr_amount",
            "cr_currency",
            "cr_amount",
            "exchange_rate",
            "revised_exchange_rate",
            "revised_debit_amount",
            "revised_credit_amount",
      ]
      }) 
        const [applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc ] = React.useState<any>({}) 
    const [applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_close",
            "apply_special_rate_reject",
            "apply_special_rate_approve",
            "apply_special_rate_save",
      ]
      }) 
        const [applyspecialratemaingroup5736c, setapplyspecialratemaingroup5736c ] = React.useState<any>({}) 
    const [applyspecialratemaingroup5736cProps, setapplyspecialratemaingroup5736cProps ] = React.useState<any>({
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
        const [applyspecialratesubgroup36462, setapplyspecialratesubgroup36462 ] = React.useState<any>({}) 
    const [applyspecialratesubgroup36462Props, setapplyspecialratesubgroup36462Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cr_account",
            "cr_currency",
            "cr_amount",
            "account_currency",
            "current_exchange_rate",
            "credit_amount",
            "revised_exchange_rate",
            "revised_credit_amount",
      ]
      }) 
        const [applyspecialratedynamicactionsd8714, setapplyspecialratedynamicactionsd8714 ] = React.useState<any>({}) 
    const [applyspecialratedynamicactionsd8714Props, setapplyspecialratedynamicactionsd8714Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_process_close",
            "apply_special_rate_process_reject",
            "apply_special_rate_process_approve",
            "apply_special_rate_process_save",
      ]
      }) 
        const [returnreasonmaingroup382bc, setreturnreasonmaingroup382bc ] = React.useState<any>({}) 
    const [returnreasonmaingroup382bcProps, setreturnreasonmaingroup382bcProps ] = React.useState<any>({
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
        const [returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5 ] = React.useState<any>({}) 
    const [returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason",
            "return_reason",
            "return_reason",
            "return_reason_code",
            "return_reason_code",
            "return_reason_code",
            "cr_currency",
            "cr_amount",
      ]
      }) 
        const [returndynamicactionsc7672, setreturndynamicactionsc7672 ] = React.useState<any>({}) 
    const [returndynamicactionsc7672Props, setreturndynamicactionsc7672Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tech_return_approve",
            "tech_return_close",
            "tech_return_reject",
            "tech_return_save",
      ]
      }) 
        const [enquirymaingroup8a315, setenquirymaingroup8a315 ] = React.useState<any>({}) 
    const [enquirymaingroup8a315Props, setenquirymaingroup8a315Props ] = React.useState<any>({
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
        const [enquirysubgroup4c021, setenquirysubgroup4c021 ] = React.useState<any>({}) 
    const [enquirysubgroup4c021Props, setenquirysubgroup4c021Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_type",
            "payment_type",
            "message_code",
            "message_code",
      ]
      }) 
        const [dynamicactions13e5e, setdynamicactions13e5e ] = React.useState<any>({}) 
    const [dynamicactions13e5eProps, setdynamicactions13e5eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "enquiry_send",
      ]
      }) 
        const [tran_main_group9581a, settran_main_group9581a ] = React.useState<any>({}) 
    const [tran_main_group9581aProps, settran_main_group9581aProps ] = React.useState<any>({
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
        const [tran_tab_group2a929, settran_tab_group2a929 ] = React.useState<any>({}) 
    const [tran_tab_group2a929Props, settran_tab_group2a929Props ] = React.useState<any>({
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
      ]
      }) 
        const [view_all_tab9a177, setview_all_tab9a177 ] = React.useState<any>({}) 
    const [view_all_tab9a177Props, setview_all_tab9a177Props ] = React.useState<any>({
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
    
    const [view_all_tableccb40, setview_all_tableccb40 ] = React.useState<any>([]) 
    const [view_all_tableccb40Props, setview_all_tableccb40Props ] = React.useState<any>({
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
        const [view_all_journey_groupca47a, setview_all_journey_groupca47a ] = React.useState<any>({}) 
    const [view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps ] = React.useState<any>({
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
        const [cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6 ] = React.useState<any>({}) 
    const [cancel_equest_camt055_tabf8dc6Props, setcancel_equest_camt055_tabf8dc6Props ] = React.useState<any>({
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
    
    const [cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976 ] = React.useState<any>([]) 
    const [cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props ] = React.useState<any>({
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
        const [cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2 ] = React.useState<any>({}) 
    const [cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props ] = React.useState<any>({
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
        const [inves_req_camt110_tab81869, setinves_req_camt110_tab81869 ] = React.useState<any>({}) 
    const [inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props ] = React.useState<any>({
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
    
    const [inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e ] = React.useState<any>([]) 
    const [inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps ] = React.useState<any>({
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
        const [inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738 ] = React.useState<any>({}) 
    const [inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props ] = React.useState<any>({
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
        const [investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177 ] = React.useState<any>({}) 
    const [investigation_response_camt111_tabf6177Props, setinvestigation_response_camt111_tabf6177Props ] = React.useState<any>({
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
    
    const [inves_res_camt111_table0f401, setinves_res_camt111_table0f401 ] = React.useState<any>([]) 
    const [inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props ] = React.useState<any>({
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
        const [inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4 ] = React.useState<any>({}) 
    const [inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props ] = React.useState<any>({
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
        const [main_group746bf, setmain_group746bf ] = React.useState<any>({}) 
    const [main_group746bfProps, setmain_group746bfProps ] = React.useState<any>({
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
            "tran_date",
            "uuid",
            "dr_account",
            "dr_name",
            "cr_account",
            "cr_name",
            "cr_currency",
            "cr_amount",
            "message_code",
            "message_code",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        const [cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232 ] = React.useState<any>({}) 
    const [cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        const [cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44 ] = React.useState<any>({}) 
    const [cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "cancel_reason",
            "cancel_reason",
            "cancel_reason",
            "reason_description",
      ]
      }) 
        const [cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a ] = React.useState<any>({}) 
    const [cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancelrequestcamt055_close",
            "cancelrequestcamt055_reject",
            "cancelrequestcamt055_approve",
            "cancelrequestcamt055_save",
      ]
      }) 
        const [investigationrequestcamt110maingroup7a2f5, setinvestigationrequestcamt110maingroup7a2f5 ] = React.useState<any>({}) 
    const [investigationrequestcamt110maingroup7a2f5Props, setinvestigationrequestcamt110maingroup7a2f5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        const [investigationrequestcamt110subgroup276a5, setinvestigationrequestcamt110subgroup276a5 ] = React.useState<any>({}) 
    const [investigationrequestcamt110subgroup276a5Props, setinvestigationrequestcamt110subgroup276a5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "investigation_type",
            "investigation_type",
            "investigation_type",
            "investigation_reason",
            "investigation_reason",
            "investigation_reason",
            "reason_description",
      ]
      }) 
        const [investigationrequestcamt110dynamicactionsbfdc2, setinvestigationrequestcamt110dynamicactionsbfdc2 ] = React.useState<any>({}) 
    const [investigationrequestcamt110dynamicactionsbfdc2Props, setinvestigationrequestcamt110dynamicactionsbfdc2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invesreqcamt110_close",
            "invesreqcamt110_reject",
            "invesreqcamt110_approve",
            "invesreqcamt110_save",
      ]
      }) 
        const [investigationresponsecamt111maingroup058ec, setinvestigationresponsecamt111maingroup058ec ] = React.useState<any>({}) 
    const [investigationresponsecamt111maingroup058ecProps, setinvestigationresponsecamt111maingroup058ecProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        const [investigationresponsecamt111subgroupafab5, setinvestigationresponsecamt111subgroupafab5 ] = React.useState<any>({}) 
    const [investigationresponsecamt111subgroupafab5Props, setinvestigationresponsecamt111subgroupafab5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "response_type",
            "response_reason",
            "reason_description",
      ]
      }) 
        const [investigationresponsecamt111dynamicactionsceeed, setinvestigationresponsecamt111dynamicactionsceeed ] = React.useState<any>({}) 
    const [investigationresponsecamt111dynamicactionsceeedProps, setinvestigationresponsecamt111dynamicactionsceeedProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invesrescamt111_close",
            "invesrescamt111_reject",
            "invesrescamt111_approve",
            "invesrescamt111_save",
      ]
      }) 
        const [acksimulatormaingroup3a007, setacksimulatormaingroup3a007 ] = React.useState<any>({}) 
    const [acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props ] = React.useState<any>({
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
        const [ack_simulator_tab_group0778c, setack_simulator_tab_group0778c ] = React.useState<any>({}) 
    const [ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps ] = React.useState<any>({
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
        const [op_financial_tab_headerc391f, setop_financial_tab_headerc391f ] = React.useState<any>({}) 
    const [op_financial_tab_headerc391fProps, setop_financial_tab_headerc391fProps ] = React.useState<any>({
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
        const [op_simulator_sub_group467ba, setop_simulator_sub_group467ba ] = React.useState<any>({}) 
    const [op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "productcode",
            "message_type",
            "message_type",
            "date",
            "uuid",
            "status",
            "status",
            "reject_reason",
            "reject_reason",
      ]
      }) 
        const [customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a ] = React.useState<any>({}) 
    const [customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        const [dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78 ] = React.useState<any>({}) 
    const [dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props ] = React.useState<any>({
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
        const [dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6 ] = React.useState<any>({}) 
    const [dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_financial_submit_btn",
      ]
      }) 
        const [ip_financial_tab_header60896, setip_financial_tab_header60896 ] = React.useState<any>({}) 
    const [ip_financial_tab_header60896Props, setip_financial_tab_header60896Props ] = React.useState<any>({
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
        const [ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8 ] = React.useState<any>({}) 
    const [ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_productcode",
            "ip_message_type",
            "ip_message_type",
            "ip_date",
            "amount",
      ]
      }) 
        const [ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849 ] = React.useState<any>({}) 
    const [ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props ] = React.useState<any>({
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
        const [ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b ] = React.useState<any>({}) 
    const [ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_financial_submit_btn",
      ]
      }) 
        const [op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71 ] = React.useState<any>({}) 
    const [op_nf_camt110_tab_header4fa71Props, setop_nf_camt110_tab_header4fa71Props ] = React.useState<any>({
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
        const [op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed ] = React.useState<any>({}) 
    const [op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_110_productcode",
            "op_110_message_type",
            "op_110_date",
            "op_110_uuid",
            "op_110_request_type",
            "op_110_request_type",
            "op_110_request_reason",
            "op_110_request_reason",
      ]
      }) 
        const [op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0 ] = React.useState<any>({}) 
    const [op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props ] = React.useState<any>({
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
        const [op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89 ] = React.useState<any>({}) 
    const [op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_110_submit_btn",
      ]
      }) 
        const [op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0 ] = React.useState<any>({}) 
    const [op_nf_camt111_tab_header05ca0Props, setop_nf_camt111_tab_header05ca0Props ] = React.useState<any>({
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
        const [op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6 ] = React.useState<any>({}) 
    const [op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_111_productcode",
            "op_111_message_type",
            "op_111_date",
            "op_111_uuid",
            "op_111_response_status",
            "op_111_response_status",
            "op_111_response_reason",
            "op_111_response_reason",
      ]
      }) 
        const [op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308 ] = React.useState<any>({}) 
    const [op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props ] = React.useState<any>({
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
        const [op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7 ] = React.useState<any>({}) 
    const [op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_111_submit_btn",
      ]
      }) 
        const [ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62 ] = React.useState<any>({}) 
    const [ip_nf_camt055_tab_header06c62Props, setip_nf_camt055_tab_header06c62Props ] = React.useState<any>({
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
        const [ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216 ] = React.useState<any>({}) 
    const [ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_055_productcode",
            "ip_055_message_type",
            "ip_055_date",
            "ip_055_uuid",
            "ip_055_reason_code",
            "ip_055_reason_code",
            "ip_055_additional_info",
      ]
      }) 
        const [ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550 ] = React.useState<any>({}) 
    const [ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props ] = React.useState<any>({
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
        const [ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c ] = React.useState<any>({}) 
    const [ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_055_submit_btn",
      ]
      }) 
        const [gdb_group5384d, setgdb_group5384d ] = React.useState<any>({}) 
    const [gdb_group5384dProps, setgdb_group5384dProps ] = React.useState<any>({
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
        const [tab_group65b41, settab_group65b41 ] = React.useState<any>({}) 
    const [tab_group65b41Props, settab_group65b41Props ] = React.useState<any>({
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
        const [tab_header04820, settab_header04820 ] = React.useState<any>({}) 
    const [tab_header04820Props, settab_header04820Props ] = React.useState<any>({
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
        const [tab_grpe63f4, settab_grpe63f4 ] = React.useState<any>({}) 
    const [tab_grpe63f4Props, settab_grpe63f4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "channel_combobox",
            "channel_combobox",
            "currency_combobox",
            "currency_combobox",
            "process_category_combobox",
            "process_category_combobox",
            "offline_online_combobox",
            "offline_online_combobox",
            "transaction_table_label",
      ]
      }) 
        const [transaction_group6c6f2, settransaction_group6c6f2 ] = React.useState<any>({}) 
    const [transaction_group6c6f2Props, settransaction_group6c6f2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "online_offline_processing_icon",
            "online_offline_processing_label",
            "total_percentage",
      ]
      }) 
        const [line_chart_group61ee8, setline_chart_group61ee8 ] = React.useState<any>({}) 
    const [line_chart_group61ee8Props, setline_chart_group61ee8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "name",
      ]
      }) 
        const [bar_chart_group737a3, setbar_chart_group737a3 ] = React.useState<any>({}) 
    const [bar_chart_group737a3Props, setbar_chart_group737a3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
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
      refresh:false, // if change this value to true group array refresh will not work
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
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [outbound_or_inbound5e076Props,setoutbound_or_inbound5e076Props] = React.useState<any>({}) 
   const [advance_searcheb531,setadvance_searcheb531] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [advance_searcheb531Props,setadvance_searcheb531Props] = React.useState<any>({}) 
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
   const [value_date_view_allb0df6,setvalue_date_view_allb0df6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_view_allb0df6Props,setvalue_date_view_allb0df6Props] = React.useState<any>({}) 
   const [dr_account_view_all33724,setdr_account_view_all33724] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_view_all33724Props,setdr_account_view_all33724Props] = React.useState<any>({}) 
   const [dr_name_view_allc0a46,setdr_name_view_allc0a46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_view_allc0a46Props,setdr_name_view_allc0a46Props] = React.useState<any>({}) 
   const [dr_currency_view_all54da6,setdr_currency_view_all54da6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_view_all54da6Props,setdr_currency_view_all54da6Props] = React.useState<any>({}) 
   const [dr_amount_view_alls88d6b,setdr_amount_view_alls88d6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_view_alls88d6bProps,setdr_amount_view_alls88d6bProps] = React.useState<any>({}) 
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
   const [cr_name_view_all19d14,setcr_name_view_all19d14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_view_all19d14Props,setcr_name_view_all19d14Props] = React.useState<any>({}) 
   const [cr_currency_view_all82afd,setcr_currency_view_all82afd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_view_all82afdProps,setcr_currency_view_all82afdProps] = React.useState<any>({}) 
   const [cr_amount_view_all47e6b,setcr_amount_view_all47e6b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_view_all47e6bProps,setcr_amount_view_all47e6bProps] = React.useState<any>({}) 
   const [uuid_view_alldb6f0,setuuid_view_alldb6f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_view_alldb6f0Props,setuuid_view_alldb6f0Props] = React.useState<any>({}) 
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
   const [value_date_failure_queue12297,setvalue_date_failure_queue12297] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_failure_queue12297Props,setvalue_date_failure_queue12297Props] = React.useState<any>({}) 
   const [dr_account_failure_queue42953,setdr_account_failure_queue42953] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_failure_queue42953Props,setdr_account_failure_queue42953Props] = React.useState<any>({}) 
   const [dr_name_failure_queue03c86,setdr_name_failure_queue03c86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_failure_queue03c86Props,setdr_name_failure_queue03c86Props] = React.useState<any>({}) 
   const [dr_currency_failure_queuef9d2d,setdr_currency_failure_queuef9d2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_failure_queuef9d2dProps,setdr_currency_failure_queuef9d2dProps] = React.useState<any>({}) 
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
   const [cr_name_failure_queue57c4d,setcr_name_failure_queue57c4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_failure_queue57c4dProps,setcr_name_failure_queue57c4dProps] = React.useState<any>({}) 
   const [cr_currency_failure_queue09d7a,setcr_currency_failure_queue09d7a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_failure_queue09d7aProps,setcr_currency_failure_queue09d7aProps] = React.useState<any>({}) 
   const [cr_amount_failure_queue0aef8,setcr_amount_failure_queue0aef8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_failure_queue0aef8Props,setcr_amount_failure_queue0aef8Props] = React.useState<any>({}) 
   const [uuid_failure_queuea9c80,setuuid_failure_queuea9c80] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_failure_queuea9c80Props,setuuid_failure_queuea9c80Props] = React.useState<any>({}) 
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
   const [value_date_success_queue7c209,setvalue_date_success_queue7c209] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_success_queue7c209Props,setvalue_date_success_queue7c209Props] = React.useState<any>({}) 
   const [dr_account_success_queueeddaf,setdr_account_success_queueeddaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_success_queueeddafProps,setdr_account_success_queueeddafProps] = React.useState<any>({}) 
   const [dr_name_success_queuec805b,setdr_name_success_queuec805b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_success_queuec805bProps,setdr_name_success_queuec805bProps] = React.useState<any>({}) 
   const [dr_currency_success_queue10a49,setdr_currency_success_queue10a49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_success_queue10a49Props,setdr_currency_success_queue10a49Props] = React.useState<any>({}) 
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
   const [cr_name_success_queueb80d4,setcr_name_success_queueb80d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_success_queueb80d4Props,setcr_name_success_queueb80d4Props] = React.useState<any>({}) 
   const [cr_currency_success_queue2f950,setcr_currency_success_queue2f950] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_success_queue2f950Props,setcr_currency_success_queue2f950Props] = React.useState<any>({}) 
   const [cr_amount_success_queue019a2,setcr_amount_success_queue019a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_success_queue019a2Props,setcr_amount_success_queue019a2Props] = React.useState<any>({}) 
   const [uuid_success_queue87fbe,setuuid_success_queue87fbe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_success_queue87fbeProps,setuuid_success_queue87fbeProps] = React.useState<any>({}) 
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
   const [value_date_return_queuee5e11,setvalue_date_return_queuee5e11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_return_queuee5e11Props,setvalue_date_return_queuee5e11Props] = React.useState<any>({}) 
   const [dr_account_return_queuebdabb,setdr_account_return_queuebdabb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_return_queuebdabbProps,setdr_account_return_queuebdabbProps] = React.useState<any>({}) 
   const [dr_name_return_queue958c9,setdr_name_return_queue958c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_return_queue958c9Props,setdr_name_return_queue958c9Props] = React.useState<any>({}) 
   const [dr_currency_return_queuee94b2,setdr_currency_return_queuee94b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_return_queuee94b2Props,setdr_currency_return_queuee94b2Props] = React.useState<any>({}) 
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
   const [cr_name_return_queue13fec,setcr_name_return_queue13fec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_return_queue13fecProps,setcr_name_return_queue13fecProps] = React.useState<any>({}) 
   const [cr_currency_return_queuef37f7,setcr_currency_return_queuef37f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_return_queuef37f7Props,setcr_currency_return_queuef37f7Props] = React.useState<any>({}) 
   const [cr_amount_return_queue95903,setcr_amount_return_queue95903] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_return_queue95903Props,setcr_amount_return_queue95903Props] = React.useState<any>({}) 
   const [uuid_return_queue2f467,setuuid_return_queue2f467] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_return_queue2f467Props,setuuid_return_queue2f467Props] = React.useState<any>({}) 
   const [value_date_operational_pending6ecd4,setvalue_date_operational_pending6ecd4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_operational_pending6ecd4Props,setvalue_date_operational_pending6ecd4Props] = React.useState<any>({}) 
   const [dr_account_operational_pending2ab87,setdr_account_operational_pending2ab87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_operational_pending2ab87Props,setdr_account_operational_pending2ab87Props] = React.useState<any>({}) 
   const [dr_name_operational_pendinga8ff6,setdr_name_operational_pendinga8ff6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_operational_pendinga8ff6Props,setdr_name_operational_pendinga8ff6Props] = React.useState<any>({}) 
   const [dr_currency_operational_pending5146b,setdr_currency_operational_pending5146b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_operational_pending5146bProps,setdr_currency_operational_pending5146bProps] = React.useState<any>({}) 
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
   const [cr_name_operational_pendingbce21,setcr_name_operational_pendingbce21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_operational_pendingbce21Props,setcr_name_operational_pendingbce21Props] = React.useState<any>({}) 
   const [cr_currency_operational_pending282bc,setcr_currency_operational_pending282bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_operational_pending282bcProps,setcr_currency_operational_pending282bcProps] = React.useState<any>({}) 
   const [cr_amount_operational_pending0df81,setcr_amount_operational_pending0df81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_operational_pending0df81Props,setcr_amount_operational_pending0df81Props] = React.useState<any>({}) 
   const [new_payment_chk_verify_btn3918d,setnew_payment_chk_verify_btn3918d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment_chk_verify_btn3918dProps,setnew_payment_chk_verify_btn3918dProps] = React.useState<any>({}) 
   const [opr_pending_chk_authorize_btne1fa7,setopr_pending_chk_authorize_btne1fa7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_authorize_btne1fa7Props,setopr_pending_chk_authorize_btne1fa7Props] = React.useState<any>({}) 
   const [opr_pending_chk_approve_btn33fe9,setopr_pending_chk_approve_btn33fe9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_approve_btn33fe9Props,setopr_pending_chk_approve_btn33fe9Props] = React.useState<any>({}) 
   const [opr_pending_chk_reject_btn18529,setopr_pending_chk_reject_btn18529] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_reject_btn18529Props,setopr_pending_chk_reject_btn18529Props] = React.useState<any>({}) 
   const [opr_pending_mk_already_posted_btn4eb90,setopr_pending_mk_already_posted_btn4eb90] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_already_posted_btn4eb90Props,setopr_pending_mk_already_posted_btn4eb90Props] = React.useState<any>({}) 
   const [opr_pending_mk_retry_btn4af05,setopr_pending_mk_retry_btn4af05] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_retry_btn4af05Props,setopr_pending_mk_retry_btn4af05Props] = React.useState<any>({}) 
   const [opr_pending_mk_reject_btnb2c93,setopr_pending_mk_reject_btnb2c93] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_reject_btnb2c93Props,setopr_pending_mk_reject_btnb2c93Props] = React.useState<any>({}) 
   const [opr_pending_mk_repost_btn4506c,setopr_pending_mk_repost_btn4506c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_repost_btn4506cProps,setopr_pending_mk_repost_btn4506cProps] = React.useState<any>({}) 
   const [opr_pending_mk_push_next_step_btn631df,setopr_pending_mk_push_next_step_btn631df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_push_next_step_btn631dfProps,setopr_pending_mk_push_next_step_btn631dfProps] = React.useState<any>({}) 
   const [opr_pending_mk_reverse_btndab56,setopr_pending_mk_reverse_btndab56] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_reverse_btndab56Props,setopr_pending_mk_reverse_btndab56Props] = React.useState<any>({}) 
   const [opr_pending_mk_ip_return_btnb715b,setopr_pending_mk_ip_return_btnb715b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_ip_return_btnb715bProps,setopr_pending_mk_ip_return_btnb715bProps] = React.useState<any>({}) 
   const [opr_pending_mk_repair_btnc91a5,setopr_pending_mk_repair_btnc91a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_repair_btnc91a5Props,setopr_pending_mk_repair_btnc91a5Props] = React.useState<any>({}) 
   const [opr_pending_chk_ip_verify_return_btnb8342,setopr_pending_chk_ip_verify_return_btnb8342] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_ip_verify_return_btnb8342Props,setopr_pending_chk_ip_verify_return_btnb8342Props] = React.useState<any>({}) 
   const [opr_pending_mk_op_return_btn311fd,setopr_pending_mk_op_return_btn311fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_op_return_btn311fdProps,setopr_pending_mk_op_return_btn311fdProps] = React.useState<any>({}) 
   const [opr_pending_chk_op_return_verify_btne3f5b,setopr_pending_chk_op_return_verify_btne3f5b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_op_return_verify_btne3f5bProps,setopr_pending_chk_op_return_verify_btne3f5bProps] = React.useState<any>({}) 
   const [opr_pending_mk_force_pass_btnc0708,setopr_pending_mk_force_pass_btnc0708] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_mk_force_pass_btnc0708Props,setopr_pending_mk_force_pass_btnc0708Props] = React.useState<any>({}) 
   const [opr_pending_op_mk_applysplrate_btn52343,setopr_pending_op_mk_applysplrate_btn52343] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_op_mk_applysplrate_btn52343Props,setopr_pending_op_mk_applysplrate_btn52343Props] = React.useState<any>({}) 
   const [opr_pending_ip_mkr_applysplrate_btna62ff,setopr_pending_ip_mkr_applysplrate_btna62ff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_ip_mkr_applysplrate_btna62ffProps,setopr_pending_ip_mkr_applysplrate_btna62ffProps] = React.useState<any>({}) 
   const [uuid_operational_pendinga5f0a,setuuid_operational_pendinga5f0a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_operational_pendinga5f0aProps,setuuid_operational_pendinga5f0aProps] = React.useState<any>({}) 
   const [opr_pending_chk_op_appl_spl_rate_verfiy592a5,setopr_pending_chk_op_appl_spl_rate_verfiy592a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_op_appl_spl_rate_verfiy592a5Props,setopr_pending_chk_op_appl_spl_rate_verfiy592a5Props] = React.useState<any>({}) 
   const [opr_pending_chk_ip_appl_spl_rate_verfiyca082,setopr_pending_chk_ip_appl_spl_rate_verfiyca082] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [opr_pending_chk_ip_appl_spl_rate_verfiyca082Props,setopr_pending_chk_ip_appl_spl_rate_verfiyca082Props] = React.useState<any>({}) 
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
   const [value_date_technical_pending11fe0,setvalue_date_technical_pending11fe0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_technical_pending11fe0Props,setvalue_date_technical_pending11fe0Props] = React.useState<any>({}) 
   const [dr_account_technical_pendinge182f,setdr_account_technical_pendinge182f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_technical_pendinge182fProps,setdr_account_technical_pendinge182fProps] = React.useState<any>({}) 
   const [dr_name_technical_pendingbc6bb,setdr_name_technical_pendingbc6bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_technical_pendingbc6bbProps,setdr_name_technical_pendingbc6bbProps] = React.useState<any>({}) 
   const [dr_currency_technical_pendingbc856,setdr_currency_technical_pendingbc856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_technical_pendingbc856Props,setdr_currency_technical_pendingbc856Props] = React.useState<any>({}) 
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
   const [cr_name_technical_pending1bc34,setcr_name_technical_pending1bc34] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_technical_pending1bc34Props,setcr_name_technical_pending1bc34Props] = React.useState<any>({}) 
   const [cr_currency_technical_pending78349,setcr_currency_technical_pending78349] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_technical_pending78349Props,setcr_currency_technical_pending78349Props] = React.useState<any>({}) 
   const [cr_amount_technical_pending738a2,setcr_amount_technical_pending738a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_technical_pending738a2Props,setcr_amount_technical_pending738a2Props] = React.useState<any>({}) 
   const [uuid_technical_pendingb820e,setuuid_technical_pendingb820e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_technical_pendingb820eProps,setuuid_technical_pendingb820eProps] = React.useState<any>({}) 
   const [tech_pending_mk_reject_btn432a8,settech_pending_mk_reject_btn432a8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_mk_reject_btn432a8Props,settech_pending_mk_reject_btn432a8Props] = React.useState<any>({}) 
   const [tech_pending_mk_retry_btn5f5cf,settech_pending_mk_retry_btn5f5cf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_mk_retry_btn5f5cfProps,settech_pending_mk_retry_btn5f5cfProps] = React.useState<any>({}) 
   const [tech_pending_chk_approve_btnc932b,settech_pending_chk_approve_btnc932b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_chk_approve_btnc932bProps,settech_pending_chk_approve_btnc932bProps] = React.useState<any>({}) 
   const [tech_pending_chk_reject_btn2ef0c,settech_pending_chk_reject_btn2ef0c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_chk_reject_btn2ef0cProps,settech_pending_chk_reject_btn2ef0cProps] = React.useState<any>({}) 
   const [tech_pending_mk_ip_return_btn3d651,settech_pending_mk_ip_return_btn3d651] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_mk_ip_return_btn3d651Props,settech_pending_mk_ip_return_btn3d651Props] = React.useState<any>({}) 
   const [tech_pending_chk_ip_verify_return_btn54b4c,settech_pending_chk_ip_verify_return_btn54b4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_pending_chk_ip_verify_return_btn54b4cProps,settech_pending_chk_ip_verify_return_btn54b4cProps] = React.useState<any>({}) 
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
   const [value_date_notification_pendinga37ed,setvalue_date_notification_pendinga37ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_notification_pendinga37edProps,setvalue_date_notification_pendinga37edProps] = React.useState<any>({}) 
   const [dr_account_notification_pendinge066b,setdr_account_notification_pendinge066b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_notification_pendinge066bProps,setdr_account_notification_pendinge066bProps] = React.useState<any>({}) 
   const [dr_name_notification_pending23ac6,setdr_name_notification_pending23ac6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_notification_pending23ac6Props,setdr_name_notification_pending23ac6Props] = React.useState<any>({}) 
   const [dr_currency_notification_pendingeabf3,setdr_currency_notification_pendingeabf3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_notification_pendingeabf3Props,setdr_currency_notification_pendingeabf3Props] = React.useState<any>({}) 
   const [dr_amount_notification_pendingd808b,setdr_amount_notification_pendingd808b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_notification_pendingd808bProps,setdr_amount_notification_pendingd808bProps] = React.useState<any>({}) 
   const [cr_account_notification_pending7feb9,setcr_account_notification_pending7feb9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_notification_pending7feb9Props,setcr_account_notification_pending7feb9Props] = React.useState<any>({}) 
   const [cr_name_notification_pendingfcab8,setcr_name_notification_pendingfcab8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_notification_pendingfcab8Props,setcr_name_notification_pendingfcab8Props] = React.useState<any>({}) 
   const [cr_currency_notification_pending587a1,setcr_currency_notification_pending587a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_notification_pending587a1Props,setcr_currency_notification_pending587a1Props] = React.useState<any>({}) 
   const [cr_amount_notification_pendingde11a,setcr_amount_notification_pendingde11a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_notification_pendingde11aProps,setcr_amount_notification_pendingde11aProps] = React.useState<any>({}) 
   const [uuid_notification_pending2ba49,setuuid_notification_pending2ba49] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_notification_pending2ba49Props,setuuid_notification_pending2ba49Props] = React.useState<any>({}) 
   const [non_pending_mk_retry_btnf5b0b,setnon_pending_mk_retry_btnf5b0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_pending_mk_retry_btnf5b0bProps,setnon_pending_mk_retry_btnf5b0bProps] = React.useState<any>({}) 
   const [non_pending_chk_approve_btnb3cbf,setnon_pending_chk_approve_btnb3cbf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_pending_chk_approve_btnb3cbfProps,setnon_pending_chk_approve_btnb3cbfProps] = React.useState<any>({}) 
   const [non_pending_chk_reject_btn16cba,setnon_pending_chk_reject_btn16cba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [non_pending_chk_reject_btn16cbaProps,setnon_pending_chk_reject_btn16cbaProps] = React.useState<any>({}) 
   const [notification_pending_journey32a13,setnotification_pending_journey32a13] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [notification_pending_journey32a13Props,setnotification_pending_journey32a13Props] = React.useState<any>({}) 
   const [value_date_enquiryccb63,setvalue_date_enquiryccb63] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date_enquiryccb63Props,setvalue_date_enquiryccb63Props] = React.useState<any>({}) 
   const [dr_account_enquiry51592,setdr_account_enquiry51592] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_enquiry51592Props,setdr_account_enquiry51592Props] = React.useState<any>({}) 
   const [dr_name_enquiry1f341,setdr_name_enquiry1f341] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_enquiry1f341Props,setdr_name_enquiry1f341Props] = React.useState<any>({}) 
   const [dr_currency_enquiry529c9,setdr_currency_enquiry529c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency_enquiry529c9Props,setdr_currency_enquiry529c9Props] = React.useState<any>({}) 
   const [dr_amount_enquiryf15a6,setdr_amount_enquiryf15a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount_enquiryf15a6Props,setdr_amount_enquiryf15a6Props] = React.useState<any>({}) 
   const [cr_account_enquiry8fc22,setcr_account_enquiry8fc22] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_enquiry8fc22Props,setcr_account_enquiry8fc22Props] = React.useState<any>({}) 
   const [cr_name_enquiry89e7c,setcr_name_enquiry89e7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_enquiry89e7cProps,setcr_name_enquiry89e7cProps] = React.useState<any>({}) 
   const [cr_currency_enquiryaba9a,setcr_currency_enquiryaba9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_enquiryaba9aProps,setcr_currency_enquiryaba9aProps] = React.useState<any>({}) 
   const [cr_amount_enquiry6d821,setcr_amount_enquiry6d821] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_enquiry6d821Props,setcr_amount_enquiry6d821Props] = React.useState<any>({}) 
   const [uuid_enquiryc00eb,setuuid_enquiryc00eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_enquiryc00ebProps,setuuid_enquiryc00ebProps] = React.useState<any>({}) 
   const [enquiry_mk_btnd1038,setenquiry_mk_btnd1038] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enquiry_mk_btnd1038Props,setenquiry_mk_btnd1038Props] = React.useState<any>({}) 
   const [enquiry_journey9d5ba,setenquiry_journey9d5ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enquiry_journey9d5baProps,setenquiry_journey9d5baProps] = React.useState<any>({}) 
   const [advancesearch50825,setadvancesearch50825] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [advancesearch50825Props,setadvancesearch50825Props] = React.useState<any>({}) 
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
   const [channel95601,setchannel95601] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel95601Props,setchannel95601Props] = React.useState<any>({}) 
   const [processstatus28eca,setprocessstatus28eca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [processstatus28ecaProps,setprocessstatus28ecaProps] = React.useState<any>({}) 
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
   const [payment_info_text_label47b13,setpayment_info_text_label47b13] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [payment_info_text_label47b13Props,setpayment_info_text_label47b13Props] = React.useState<any>({}) 
   const [repair_new_payment_mk_save_btnbd6df,setrepair_new_payment_mk_save_btnbd6df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [repair_new_payment_mk_save_btnbd6dfProps,setrepair_new_payment_mk_save_btnbd6dfProps] = React.useState<any>({}) 
   const [cancel242e6,setcancel242e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel242e6Props,setcancel242e6Props] = React.useState<any>({}) 
   const [new_payment_chk_reject_btnb2949,setnew_payment_chk_reject_btnb2949] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment_chk_reject_btnb2949Props,setnew_payment_chk_reject_btnb2949Props] = React.useState<any>({}) 
   const [new_payment_chk_approve_btncb94c,setnew_payment_chk_approve_btncb94c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [new_payment_chk_approve_btncb94cProps,setnew_payment_chk_approve_btncb94cProps] = React.useState<any>({}) 
   const [save62f33,setsave62f33] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [save62f33Props,setsave62f33Props] = React.useState<any>({}) 
   const [general_info_text_label92c1e,setgeneral_info_text_label92c1e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [general_info_text_label92c1eProps,setgeneral_info_text_label92c1eProps] = React.useState<any>({}) 
   const [value_date45767,setvalue_date45767] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date45767Props,setvalue_date45767Props] = React.useState<any>({}) 
   const [service_level75e42,setservice_level75e42] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [service_level75e42Props,setservice_level75e42Props] = React.useState<any>({}) 
   const [purpose75771,setpurpose75771] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [purpose75771Props,setpurpose75771Props] = React.useState<any>({}) 
   const [dbtr_info_text_label1015f,setdbtr_info_text_label1015f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dbtr_info_text_label1015fProps,setdbtr_info_text_label1015fProps] = React.useState<any>({}) 
   const [dr_accounta8f91,setdr_accounta8f91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_accounta8f91Props,setdr_accounta8f91Props] = React.useState<any>({}) 
   const [dr_namef1c15,setdr_namef1c15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_namef1c15Props,setdr_namef1c15Props] = React.useState<any>({}) 
   const [dr_currency45f51,setdr_currency45f51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency45f51Props,setdr_currency45f51Props] = React.useState<any>({}) 
   const [dr_account_balancea2246,setdr_account_balancea2246] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_balancea2246Props,setdr_account_balancea2246Props] = React.useState<any>({}) 
   const [dr_ibanbaa1f,setdr_ibanbaa1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_ibanbaa1fProps,setdr_ibanbaa1fProps] = React.useState<any>({}) 
   const [dr_street_name149b0,setdr_street_name149b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_street_name149b0Props,setdr_street_name149b0Props] = React.useState<any>({}) 
   const [dr_building_numberba75a,setdr_building_numberba75a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_building_numberba75aProps,setdr_building_numberba75aProps] = React.useState<any>({}) 
   const [dr_pstl_code5ec76,setdr_pstl_code5ec76] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_pstl_code5ec76Props,setdr_pstl_code5ec76Props] = React.useState<any>({}) 
   const [dr_town_name19970,setdr_town_name19970] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_town_name19970Props,setdr_town_name19970Props] = React.useState<any>({}) 
   const [dr_countrydd685,setdr_countrydd685] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_countrydd685Props,setdr_countrydd685Props] = React.useState<any>({}) 
   const [dr_bank_codeffb62,setdr_bank_codeffb62] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_bank_codeffb62Props,setdr_bank_codeffb62Props] = React.useState<any>({}) 
   const [amount_input_typecd6ed,setamount_input_typecd6ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [amount_input_typecd6edProps,setamount_input_typecd6edProps] = React.useState<any>({}) 
   const [dr_amount178b9,setdr_amount178b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount178b9Props,setdr_amount178b9Props] = React.useState<any>({}) 
   const [settlement_amount32b14,setsettlement_amount32b14] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [settlement_amount32b14Props,setsettlement_amount32b14Props] = React.useState<any>({}) 
   const [creditor_info_label_text02833,setcreditor_info_label_text02833] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [creditor_info_label_text02833Props,setcreditor_info_label_text02833Props] = React.useState<any>({}) 
   const [ben_checkbox780b4,setben_checkbox780b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ben_checkbox780b4Props,setben_checkbox780b4Props] = React.useState<any>({}) 
   const [cr_account3b649,setcr_account3b649] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account3b649Props,setcr_account3b649Props] = React.useState<any>({}) 
   const [cr_namee0835,setcr_namee0835] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_namee0835Props,setcr_namee0835Props] = React.useState<any>({}) 
   const [cr_street_name21bab,setcr_street_name21bab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_street_name21babProps,setcr_street_name21babProps] = React.useState<any>({}) 
   const [cr_benif_action9998d,setcr_benif_action9998d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_benif_action9998dProps,setcr_benif_action9998dProps] = React.useState<any>({}) 
   const [cr_building_namea6ac7,setcr_building_namea6ac7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_building_namea6ac7Props,setcr_building_namea6ac7Props] = React.useState<any>({}) 
   const [cr_floor44bed,setcr_floor44bed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_floor44bedProps,setcr_floor44bedProps] = React.useState<any>({}) 
   const [cr_post_codef645b,setcr_post_codef645b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_post_codef645bProps,setcr_post_codef645bProps] = React.useState<any>({}) 
   const [cr_town_nameed852,setcr_town_nameed852] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_town_nameed852Props,setcr_town_nameed852Props] = React.useState<any>({}) 
   const [cr_country38218,setcr_country38218] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_country38218Props,setcr_country38218Props] = React.useState<any>({}) 
   const [cr_currencyb2ebe,setcr_currencyb2ebe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currencyb2ebeProps,setcr_currencyb2ebeProps] = React.useState<any>({}) 
   const [exchange_rate86282,setexchange_rate86282] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [exchange_rate86282Props,setexchange_rate86282Props] = React.useState<any>({}) 
   const [cr_amountbd2bf,setcr_amountbd2bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amountbd2bfProps,setcr_amountbd2bfProps] = React.useState<any>({}) 
   const [cr_bank_code76d12,setcr_bank_code76d12] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_bank_code76d12Props,setcr_bank_code76d12Props] = React.useState<any>({}) 
   const [cr_clr_code4387d,setcr_clr_code4387d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_clr_code4387dProps,setcr_clr_code4387dProps] = React.useState<any>({}) 
   const [chrg_info_text_labelf2fb3,setchrg_info_text_labelf2fb3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [chrg_info_text_labelf2fb3Props,setchrg_info_text_labelf2fb3Props] = React.useState<any>({}) 
   const [charge_type63052,setcharge_type63052] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [charge_type63052Props,setcharge_type63052Props] = React.useState<any>({}) 
   const [charge_amount44ea6,setcharge_amount44ea6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [charge_amount44ea6Props,setcharge_amount44ea6Props] = React.useState<any>({}) 
   const [correspondent_chargeff14a,setcorrespondent_chargeff14a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [correspondent_chargeff14aProps,setcorrespondent_chargeff14aProps] = React.useState<any>({}) 
   const [bank_chargeb33d7,setbank_chargeb33d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bank_chargeb33d7Props,setbank_chargeb33d7Props] = React.useState<any>({}) 
   const [add_info_text_label19bc1,setadd_info_text_label19bc1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [add_info_text_label19bc1Props,setadd_info_text_label19bc1Props] = React.useState<any>({}) 
   const [payment_method031c1,setpayment_method031c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [payment_method031c1Props,setpayment_method031c1Props] = React.useState<any>({}) 
   const [instruction_priorityafb4d,setinstruction_priorityafb4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [instruction_priorityafb4dProps,setinstruction_priorityafb4dProps] = React.useState<any>({}) 
   const [category_purposead521,setcategory_purposead521] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_purposead521Props,setcategory_purposead521Props] = React.useState<any>({}) 
   const [remittance_info6fbdf,setremittance_info6fbdf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [remittance_info6fbdfProps,setremittance_info6fbdfProps] = React.useState<any>({}) 
   const [intermediary_institution45fe6,setintermediary_institution45fe6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [intermediary_institution45fe6Props,setintermediary_institution45fe6Props] = React.useState<any>({}) 
   const [sender_receiver_info30c67,setsender_receiver_info30c67] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [sender_receiver_info30c67Props,setsender_receiver_info30c67Props] = React.useState<any>({}) 
   const [correspondent_bank2a7ae,setcorrespondent_bank2a7ae] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [correspondent_bank2a7aeProps,setcorrespondent_bank2a7aeProps] = React.useState<any>({}) 
   const [customwidget02697,setcustomwidget02697] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidget02697Props,setcustomwidget02697Props] = React.useState<any>({}) 
   const [benificiary_textb53b9,setbenificiary_textb53b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [benificiary_textb53b9Props,setbenificiary_textb53b9Props] = React.useState<any>({}) 
   const [search_textinput7144f,setsearch_textinput7144f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search_textinput7144fProps,setsearch_textinput7144fProps] = React.useState<any>({}) 
   const [search_btne5c0a,setsearch_btne5c0a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search_btne5c0aProps,setsearch_btne5c0aProps] = React.useState<any>({}) 
   const [ben_divideraec54,setben_divideraec54] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ben_divideraec54Props,setben_divideraec54Props] = React.useState<any>({}) 
   const [account_holder_namedb849,setaccount_holder_namedb849] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [account_holder_namedb849Props,setaccount_holder_namedb849Props] = React.useState<any>({}) 
   const [iconcd6e8,seticoncd6e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [iconcd6e8Props,seticoncd6e8Props] = React.useState<any>({}) 
   const [account_numberf1543,setaccount_numberf1543] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [account_numberf1543Props,setaccount_numberf1543Props] = React.useState<any>({}) 
   const [confirm_dividere3b17,setconfirm_dividere3b17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [confirm_dividere3b17Props,setconfirm_dividere3b17Props] = React.useState<any>({}) 
   const [clear_button188cc,setclear_button188cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear_button188ccProps,setclear_button188ccProps] = React.useState<any>({}) 
   const [confirm_button246d5,setconfirm_button246d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [confirm_button246d5Props,setconfirm_button246d5Props] = React.useState<any>({}) 
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
   const [trs_created_date14856,settrs_created_date14856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_date14856Props,settrs_created_date14856Props] = React.useState<any>({}) 
   const [processing_systemd2b69,setprocessing_systemd2b69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [processing_systemd2b69Props,setprocessing_systemd2b69Props] = React.useState<any>({}) 
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
   const [dr_currency9c8a2,setdr_currency9c8a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency9c8a2Props,setdr_currency9c8a2Props] = React.useState<any>({}) 
   const [dr_amount01416,setdr_amount01416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount01416Props,setdr_amount01416Props] = React.useState<any>({}) 
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
   const [process_status_labelb6505,setprocess_status_labelb6505] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process_status_labelb6505Props,setprocess_status_labelb6505Props] = React.useState<any>({}) 
   const [dr_account36b40,setdr_account36b40] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account36b40Props,setdr_account36b40Props] = React.useState<any>({}) 
   const [trs_process_statusa4262,settrs_process_statusa4262] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_process_statusa4262Props,settrs_process_statusa4262Props] = React.useState<any>({}) 
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
   const [cr_account500d6,setcr_account500d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account500d6Props,setcr_account500d6Props] = React.useState<any>({}) 
   const [trs_status88bc7,settrs_status88bc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_status88bc7Props,settrs_status88bc7Props] = React.useState<any>({}) 
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
   const [return_reason38055,setreturn_reason38055] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reason38055Props,setreturn_reason38055Props] = React.useState<any>({}) 
   const [return_reason_code06fe7,setreturn_reason_code06fe7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reason_code06fe7Props,setreturn_reason_code06fe7Props] = React.useState<any>({}) 
   const [return_currency5d707,setreturn_currency5d707] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_currency5d707Props,setreturn_currency5d707Props] = React.useState<any>({}) 
   const [return_amount7f000,setreturn_amount7f000] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_amount7f000Props,setreturn_amount7f000Props] = React.useState<any>({}) 
   const [return_close1890d,setreturn_close1890d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_close1890dProps,setreturn_close1890dProps] = React.useState<any>({}) 
   const [return_reject6b8cc,setreturn_reject6b8cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reject6b8ccProps,setreturn_reject6b8ccProps] = React.useState<any>({}) 
   const [return_approveaa4d9,setreturn_approveaa4d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_approveaa4d9Props,setreturn_approveaa4d9Props] = React.useState<any>({}) 
   const [return_save03b4e,setreturn_save03b4e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_save03b4eProps,setreturn_save03b4eProps] = React.useState<any>({}) 
   const [dr_account8ccf1,setdr_account8ccf1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account8ccf1Props,setdr_account8ccf1Props] = React.useState<any>({}) 
   const [dr_currency6b8f0,setdr_currency6b8f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency6b8f0Props,setdr_currency6b8f0Props] = React.useState<any>({}) 
   const [debit_exchange_rate710eb,setdebit_exchange_rate710eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debit_exchange_rate710ebProps,setdebit_exchange_rate710ebProps] = React.useState<any>({}) 
   const [ret_amountb0252,setret_amountb0252] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ret_amountb0252Props,setret_amountb0252Props] = React.useState<any>({}) 
   const [ret_currencye06ce,setret_currencye06ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ret_currencye06ceProps,setret_currencye06ceProps] = React.useState<any>({}) 
   const [exchange_rate71ca9,setexchange_rate71ca9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [exchange_rate71ca9Props,setexchange_rate71ca9Props] = React.useState<any>({}) 
   const [calculated_ret_amountdc5ca,setcalculated_ret_amountdc5ca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [calculated_ret_amountdc5caProps,setcalculated_ret_amountdc5caProps] = React.useState<any>({}) 
   const [apply_special_rate_closef2db0,setapply_special_rate_closef2db0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_closef2db0Props,setapply_special_rate_closef2db0Props] = React.useState<any>({}) 
   const [return_rejectdab31,setreturn_rejectdab31] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_rejectdab31Props,setreturn_rejectdab31Props] = React.useState<any>({}) 
   const [return_approve9ff3e,setreturn_approve9ff3e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_approve9ff3eProps,setreturn_approve9ff3eProps] = React.useState<any>({}) 
   const [return_savec7f8c,setreturn_savec7f8c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_savec7f8cProps,setreturn_savec7f8cProps] = React.useState<any>({}) 
   const [dr_account4eafa,setdr_account4eafa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account4eafaProps,setdr_account4eafaProps] = React.useState<any>({}) 
   const [dr_currencyf9a11,setdr_currencyf9a11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currencyf9a11Props,setdr_currencyf9a11Props] = React.useState<any>({}) 
   const [dr_amount3c1d4,setdr_amount3c1d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amount3c1d4Props,setdr_amount3c1d4Props] = React.useState<any>({}) 
   const [cr_currencya5017,setcr_currencya5017] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currencya5017Props,setcr_currencya5017Props] = React.useState<any>({}) 
   const [cr_amountac0e3,setcr_amountac0e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amountac0e3Props,setcr_amountac0e3Props] = React.useState<any>({}) 
   const [exchange_rate42ef6,setexchange_rate42ef6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [exchange_rate42ef6Props,setexchange_rate42ef6Props] = React.useState<any>({}) 
   const [revised_exchange_rate18eff,setrevised_exchange_rate18eff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [revised_exchange_rate18effProps,setrevised_exchange_rate18effProps] = React.useState<any>({}) 
   const [revised_debit_amount6130b,setrevised_debit_amount6130b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [revised_debit_amount6130bProps,setrevised_debit_amount6130bProps] = React.useState<any>({}) 
   const [revised_credit_amount67a97,setrevised_credit_amount67a97] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [revised_credit_amount67a97Props,setrevised_credit_amount67a97Props] = React.useState<any>({}) 
   const [apply_special_rate_close57a71,setapply_special_rate_close57a71] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_close57a71Props,setapply_special_rate_close57a71Props] = React.useState<any>({}) 
   const [apply_special_rate_rejectba9fa,setapply_special_rate_rejectba9fa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_rejectba9faProps,setapply_special_rate_rejectba9faProps] = React.useState<any>({}) 
   const [apply_special_rate_approve58219,setapply_special_rate_approve58219] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_approve58219Props,setapply_special_rate_approve58219Props] = React.useState<any>({}) 
   const [apply_special_rate_savebdf41,setapply_special_rate_savebdf41] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_savebdf41Props,setapply_special_rate_savebdf41Props] = React.useState<any>({}) 
   const [cr_accountede53,setcr_accountede53] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_accountede53Props,setcr_accountede53Props] = React.useState<any>({}) 
   const [cr_currency233af,setcr_currency233af] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency233afProps,setcr_currency233afProps] = React.useState<any>({}) 
   const [cr_amount807dd,setcr_amount807dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount807ddProps,setcr_amount807ddProps] = React.useState<any>({}) 
   const [account_currency8e273,setaccount_currency8e273] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [account_currency8e273Props,setaccount_currency8e273Props] = React.useState<any>({}) 
   const [current_exchange_rateb1fbe,setcurrent_exchange_rateb1fbe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [current_exchange_rateb1fbeProps,setcurrent_exchange_rateb1fbeProps] = React.useState<any>({}) 
   const [credit_amountda91c,setcredit_amountda91c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [credit_amountda91cProps,setcredit_amountda91cProps] = React.useState<any>({}) 
   const [revised_exchange_ratedb974,setrevised_exchange_ratedb974] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [revised_exchange_ratedb974Props,setrevised_exchange_ratedb974Props] = React.useState<any>({}) 
   const [revised_credit_amount747be,setrevised_credit_amount747be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [revised_credit_amount747beProps,setrevised_credit_amount747beProps] = React.useState<any>({}) 
   const [apply_special_rate_process_close57120,setapply_special_rate_process_close57120] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_process_close57120Props,setapply_special_rate_process_close57120Props] = React.useState<any>({}) 
   const [apply_special_rate_process_reject934bd,setapply_special_rate_process_reject934bd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_process_reject934bdProps,setapply_special_rate_process_reject934bdProps] = React.useState<any>({}) 
   const [apply_special_rate_process_approvecfefb,setapply_special_rate_process_approvecfefb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_process_approvecfefbProps,setapply_special_rate_process_approvecfefbProps] = React.useState<any>({}) 
   const [apply_special_rate_process_save4fcee,setapply_special_rate_process_save4fcee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [apply_special_rate_process_save4fceeProps,setapply_special_rate_process_save4fceeProps] = React.useState<any>({}) 
   const [return_reasonac630,setreturn_reasonac630] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reasonac630Props,setreturn_reasonac630Props] = React.useState<any>({}) 
   const [return_reason_code6797b,setreturn_reason_code6797b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_reason_code6797bProps,setreturn_reason_code6797bProps] = React.useState<any>({}) 
   const [return_currency378ac,setreturn_currency378ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_currency378acProps,setreturn_currency378acProps] = React.useState<any>({}) 
   const [return_amount9646b,setreturn_amount9646b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [return_amount9646bProps,setreturn_amount9646bProps] = React.useState<any>({}) 
   const [tech_return_approve71c38,settech_return_approve71c38] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_return_approve71c38Props,settech_return_approve71c38Props] = React.useState<any>({}) 
   const [tech_return_closefec09,settech_return_closefec09] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_return_closefec09Props,settech_return_closefec09Props] = React.useState<any>({}) 
   const [tech_return_reject676d0,settech_return_reject676d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_return_reject676d0Props,settech_return_reject676d0Props] = React.useState<any>({}) 
   const [tech_return_savea3f06,settech_return_savea3f06] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tech_return_savea3f06Props,settech_return_savea3f06Props] = React.useState<any>({}) 
   const [payment_type7038c,setpayment_type7038c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [payment_type7038cProps,setpayment_type7038cProps] = React.useState<any>({}) 
   const [message_code7cd22,setmessage_code7cd22] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code7cd22Props,setmessage_code7cd22Props] = React.useState<any>({}) 
   const [enquiry_sendfcaa9,setenquiry_sendfcaa9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enquiry_sendfcaa9Props,setenquiry_sendfcaa9Props] = React.useState<any>({}) 
   const [outbound_or_inbound5a71c,setoutbound_or_inbound5a71c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [outbound_or_inbound5a71cProps,setoutbound_or_inbound5a71cProps] = React.useState<any>({}) 
   const [searchfab91,setsearchfab91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [searchfab91Props,setsearchfab91Props] = React.useState<any>({}) 
   const [refreshe9e64,setrefreshe9e64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [refreshe9e64Props,setrefreshe9e64Props] = React.useState<any>({}) 
   const [channel_name_view_alle4831,setchannel_name_view_alle4831] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_view_alle4831Props,setchannel_name_view_alle4831Props] = React.useState<any>({}) 
   const [uuid_view_all17e51,setuuid_view_all17e51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_view_all17e51Props,setuuid_view_all17e51Props] = React.useState<any>({}) 
   const [dr_account_view_alleb786,setdr_account_view_alleb786] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_view_alleb786Props,setdr_account_view_alleb786Props] = React.useState<any>({}) 
   const [dr_name_view_all418a1,setdr_name_view_all418a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_view_all418a1Props,setdr_name_view_all418a1Props] = React.useState<any>({}) 
   const [cr_account_view_alle3b47,setcr_account_view_alle3b47] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_view_alle3b47Props,setcr_account_view_alle3b47Props] = React.useState<any>({}) 
   const [cr_name_view_alld92c9,setcr_name_view_alld92c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_view_alld92c9Props,setcr_name_view_alld92c9Props] = React.useState<any>({}) 
   const [cr_currency_view_all459b1,setcr_currency_view_all459b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_view_all459b1Props,setcr_currency_view_all459b1Props] = React.useState<any>({}) 
   const [cr_amount_view_all511fd,setcr_amount_view_all511fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_view_all511fdProps,setcr_amount_view_all511fdProps] = React.useState<any>({}) 
   const [message_code_view_all346ce,setmessage_code_view_all346ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code_view_all346ceProps,setmessage_code_view_all346ceProps] = React.useState<any>({}) 
   const [tran_date_view_all4223e,settran_date_view_all4223e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date_view_all4223eProps,settran_date_view_all4223eProps] = React.useState<any>({}) 
   const [view_all_journey12494,setview_all_journey12494] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [view_all_journey12494Props,setview_all_journey12494Props] = React.useState<any>({}) 
   const [channel_name_can_req_camt055f27d8,setchannel_name_can_req_camt055f27d8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_can_req_camt055f27d8Props,setchannel_name_can_req_camt055f27d8Props] = React.useState<any>({}) 
   const [uuid_can_req_camt0558430a,setuuid_can_req_camt0558430a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_can_req_camt0558430aProps,setuuid_can_req_camt0558430aProps] = React.useState<any>({}) 
   const [dr_account_can_req_camt055050c7,setdr_account_can_req_camt055050c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_can_req_camt055050c7Props,setdr_account_can_req_camt055050c7Props] = React.useState<any>({}) 
   const [dr_name_can_req_camt055679dd,setdr_name_can_req_camt055679dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_can_req_camt055679ddProps,setdr_name_can_req_camt055679ddProps] = React.useState<any>({}) 
   const [cr_account_can_req_camt0555b65e,setcr_account_can_req_camt0555b65e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_can_req_camt0555b65eProps,setcr_account_can_req_camt0555b65eProps] = React.useState<any>({}) 
   const [cr_name_can_req_camt055bcc5f,setcr_name_can_req_camt055bcc5f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_can_req_camt055bcc5fProps,setcr_name_can_req_camt055bcc5fProps] = React.useState<any>({}) 
   const [cr_currency_can_req_camt0556e4f6,setcr_currency_can_req_camt0556e4f6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_can_req_camt0556e4f6Props,setcr_currency_can_req_camt0556e4f6Props] = React.useState<any>({}) 
   const [cr_amount_can_req_camt0550e8b4,setcr_amount_can_req_camt0550e8b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_can_req_camt0550e8b4Props,setcr_amount_can_req_camt0550e8b4Props] = React.useState<any>({}) 
   const [cancel_request_camt055_mk_initiate_btn2902f,setcancel_request_camt055_mk_initiate_btn2902f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel_request_camt055_mk_initiate_btn2902fProps,setcancel_request_camt055_mk_initiate_btn2902fProps] = React.useState<any>({}) 
   const [cancel_request_camt055_chk_verify_btn42585,setcancel_request_camt055_chk_verify_btn42585] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel_request_camt055_chk_verify_btn42585Props,setcancel_request_camt055_chk_verify_btn42585Props] = React.useState<any>({}) 
   const [message_code_can_req_camt055532c4,setmessage_code_can_req_camt055532c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code_can_req_camt055532c4Props,setmessage_code_can_req_camt055532c4Props] = React.useState<any>({}) 
   const [tran_date_can_req_camt055ea19b,settran_date_can_req_camt055ea19b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date_can_req_camt055ea19bProps,settran_date_can_req_camt055ea19bProps] = React.useState<any>({}) 
   const [cancel_request_camt055_journeyb00e8,setcancel_request_camt055_journeyb00e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel_request_camt055_journeyb00e8Props,setcancel_request_camt055_journeyb00e8Props] = React.useState<any>({}) 
   const [channel_name_inves_req_camt110026bb,setchannel_name_inves_req_camt110026bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_inves_req_camt110026bbProps,setchannel_name_inves_req_camt110026bbProps] = React.useState<any>({}) 
   const [uuid_inves_req_camt110c3172,setuuid_inves_req_camt110c3172] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_inves_req_camt110c3172Props,setuuid_inves_req_camt110c3172Props] = React.useState<any>({}) 
   const [dr_account_inves_req_camt110a53ed,setdr_account_inves_req_camt110a53ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_inves_req_camt110a53edProps,setdr_account_inves_req_camt110a53edProps] = React.useState<any>({}) 
   const [dr_name_inves_req_camt1101105a,setdr_name_inves_req_camt1101105a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_inves_req_camt1101105aProps,setdr_name_inves_req_camt1101105aProps] = React.useState<any>({}) 
   const [cr_account_inves_req_camt110492e3,setcr_account_inves_req_camt110492e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_inves_req_camt110492e3Props,setcr_account_inves_req_camt110492e3Props] = React.useState<any>({}) 
   const [cr_name_inves_req_camt110dc531,setcr_name_inves_req_camt110dc531] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_inves_req_camt110dc531Props,setcr_name_inves_req_camt110dc531Props] = React.useState<any>({}) 
   const [cr_currency_inves_req_camt110e2b2d,setcr_currency_inves_req_camt110e2b2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_inves_req_camt110e2b2dProps,setcr_currency_inves_req_camt110e2b2dProps] = React.useState<any>({}) 
   const [cr_amount_inves_req_camt11060ab5,setcr_amount_inves_req_camt11060ab5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_inves_req_camt11060ab5Props,setcr_amount_inves_req_camt11060ab5Props] = React.useState<any>({}) 
   const [message_code_inves_req_camt11064432,setmessage_code_inves_req_camt11064432] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code_inves_req_camt11064432Props,setmessage_code_inves_req_camt11064432Props] = React.useState<any>({}) 
   const [tran_date_inves_req_camt110772d7,settran_date_inves_req_camt110772d7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date_inves_req_camt110772d7Props,settran_date_inves_req_camt110772d7Props] = React.useState<any>({}) 
   const [inves_req_camt110_mk_initiate_btn3da3f,setinves_req_camt110_mk_initiate_btn3da3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_req_camt110_mk_initiate_btn3da3fProps,setinves_req_camt110_mk_initiate_btn3da3fProps] = React.useState<any>({}) 
   const [inves_req_camt110_chk_verify_btn97d7c,setinves_req_camt110_chk_verify_btn97d7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_req_camt110_chk_verify_btn97d7cProps,setinves_req_camt110_chk_verify_btn97d7cProps] = React.useState<any>({}) 
   const [inves_req_camt110_journey28ae2,setinves_req_camt110_journey28ae2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_req_camt110_journey28ae2Props,setinves_req_camt110_journey28ae2Props] = React.useState<any>({}) 
   const [channel_name_inves_res_camt111d0063,setchannel_name_inves_res_camt111d0063] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_name_inves_res_camt111d0063Props,setchannel_name_inves_res_camt111d0063Props] = React.useState<any>({}) 
   const [uuid_inves_res_camt1118b477,setuuid_inves_res_camt1118b477] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid_inves_res_camt1118b477Props,setuuid_inves_res_camt1118b477Props] = React.useState<any>({}) 
   const [dr_account_inves_res_camt11129cf4,setdr_account_inves_res_camt11129cf4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_account_inves_res_camt11129cf4Props,setdr_account_inves_res_camt11129cf4Props] = React.useState<any>({}) 
   const [dr_name_inves_res_camt111514e6,setdr_name_inves_res_camt111514e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name_inves_res_camt111514e6Props,setdr_name_inves_res_camt111514e6Props] = React.useState<any>({}) 
   const [cr_account_inves_res_camt1112e6f0,setcr_account_inves_res_camt1112e6f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_account_inves_res_camt1112e6f0Props,setcr_account_inves_res_camt1112e6f0Props] = React.useState<any>({}) 
   const [cr_name_inves_res_camt11102682,setcr_name_inves_res_camt11102682] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name_inves_res_camt11102682Props,setcr_name_inves_res_camt11102682Props] = React.useState<any>({}) 
   const [cr_currency_inves_res_camt1114b416,setcr_currency_inves_res_camt1114b416] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency_inves_res_camt1114b416Props,setcr_currency_inves_res_camt1114b416Props] = React.useState<any>({}) 
   const [cr_amount_inves_res_camt11184bb7,setcr_amount_inves_res_camt11184bb7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amount_inves_res_camt11184bb7Props,setcr_amount_inves_res_camt11184bb7Props] = React.useState<any>({}) 
   const [message_code_inves_res_camt111005f1,setmessage_code_inves_res_camt111005f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code_inves_res_camt111005f1Props,setmessage_code_inves_res_camt111005f1Props] = React.useState<any>({}) 
   const [tran_date_inves_res_camt111a30a9,settran_date_inves_res_camt111a30a9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date_inves_res_camt111a30a9Props,settran_date_inves_res_camt111a30a9Props] = React.useState<any>({}) 
   const [inves_res_camt111_mk_initiate_btn47e33,setinves_res_camt111_mk_initiate_btn47e33] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_res_camt111_mk_initiate_btn47e33Props,setinves_res_camt111_mk_initiate_btn47e33Props] = React.useState<any>({}) 
   const [inves_res_camt111_chk_verify_btnf5ad1,setinves_res_camt111_chk_verify_btnf5ad1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_res_camt111_chk_verify_btnf5ad1Props,setinves_res_camt111_chk_verify_btnf5ad1Props] = React.useState<any>({}) 
   const [inves_res_camt111_journey3d289,setinves_res_camt111_journey3d289] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [inves_res_camt111_journey3d289Props,setinves_res_camt111_journey3d289Props] = React.useState<any>({}) 
   const [search_label130a2,setsearch_label130a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search_label130a2Props,setsearch_label130a2Props] = React.useState<any>({}) 
   const [top_dividerdea5b,settop_dividerdea5b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [top_dividerdea5bProps,settop_dividerdea5bProps] = React.useState<any>({}) 
   const [trs_created_date28cb9,settrs_created_date28cb9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_date28cb9Props,settrs_created_date28cb9Props] = React.useState<any>({}) 
   const [uuida0e9e,setuuida0e9e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuida0e9eProps,setuuida0e9eProps] = React.useState<any>({}) 
   const [debtor_account_no1b62b,setdebtor_account_no1b62b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debtor_account_no1b62bProps,setdebtor_account_no1b62bProps] = React.useState<any>({}) 
   const [debtor_name908b6,setdebtor_name908b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [debtor_name908b6Props,setdebtor_name908b6Props] = React.useState<any>({}) 
   const [creditor_account_no14a5f,setcreditor_account_no14a5f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [creditor_account_no14a5fProps,setcreditor_account_no14a5fProps] = React.useState<any>({}) 
   const [cr_name1ecf4,setcr_name1ecf4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name1ecf4Props,setcr_name1ecf4Props] = React.useState<any>({}) 
   const [cr_currencydbebf,setcr_currencydbebf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currencydbebfProps,setcr_currencydbebfProps] = React.useState<any>({}) 
   const [cr_amounta1974,setcr_amounta1974] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amounta1974Props,setcr_amounta1974Props] = React.useState<any>({}) 
   const [message_codefa765,setmessage_codefa765] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_codefa765Props,setmessage_codefa765Props] = React.useState<any>({}) 
   const [bottom_divideradc51,setbottom_divideradc51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bottom_divideradc51Props,setbottom_divideradc51Props] = React.useState<any>({}) 
   const [search4197d,setsearch4197d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [search4197dProps,setsearch4197dProps] = React.useState<any>({}) 
   const [clear91c04,setclear91c04] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear91c04Props,setclear91c04Props] = React.useState<any>({}) 
   const [tran_date5d7c0,settran_date5d7c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date5d7c0Props,settran_date5d7c0Props] = React.useState<any>({}) 
   const [message_code5df7d,setmessage_code5df7d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code5df7dProps,setmessage_code5df7dProps] = React.useState<any>({}) 
   const [cancel_reason1d34e,setcancel_reason1d34e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancel_reason1d34eProps,setcancel_reason1d34eProps] = React.useState<any>({}) 
   const [reason_description5420a,setreason_description5420a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reason_description5420aProps,setreason_description5420aProps] = React.useState<any>({}) 
   const [cancelrequestcamt055_closed99be,setcancelrequestcamt055_closed99be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancelrequestcamt055_closed99beProps,setcancelrequestcamt055_closed99beProps] = React.useState<any>({}) 
   const [cancelrequestcamt055_reject88d84,setcancelrequestcamt055_reject88d84] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancelrequestcamt055_reject88d84Props,setcancelrequestcamt055_reject88d84Props] = React.useState<any>({}) 
   const [cancelrequestcamt055_approve510fd,setcancelrequestcamt055_approve510fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancelrequestcamt055_approve510fdProps,setcancelrequestcamt055_approve510fdProps] = React.useState<any>({}) 
   const [cancelrequestcamt055_save46cc8,setcancelrequestcamt055_save46cc8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cancelrequestcamt055_save46cc8Props,setcancelrequestcamt055_save46cc8Props] = React.useState<any>({}) 
   const [customwidgetb9148,setcustomwidgetb9148] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidgetb9148Props,setcustomwidgetb9148Props] = React.useState<any>({}) 
   const [tran_date9acc4,settran_date9acc4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date9acc4Props,settran_date9acc4Props] = React.useState<any>({}) 
   const [message_code581ad,setmessage_code581ad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code581adProps,setmessage_code581adProps] = React.useState<any>({}) 
   const [investigation_type576c6,setinvestigation_type576c6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [investigation_type576c6Props,setinvestigation_type576c6Props] = React.useState<any>({}) 
   const [investigation_reason74007,setinvestigation_reason74007] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [investigation_reason74007Props,setinvestigation_reason74007Props] = React.useState<any>({}) 
   const [reason_description6d274,setreason_description6d274] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reason_description6d274Props,setreason_description6d274Props] = React.useState<any>({}) 
   const [invesreqcamt110_closee3b00,setinvesreqcamt110_closee3b00] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesreqcamt110_closee3b00Props,setinvesreqcamt110_closee3b00Props] = React.useState<any>({}) 
   const [invesreqcamt110_reject5b353,setinvesreqcamt110_reject5b353] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesreqcamt110_reject5b353Props,setinvesreqcamt110_reject5b353Props] = React.useState<any>({}) 
   const [invesreqcamt110_approve727ff,setinvesreqcamt110_approve727ff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesreqcamt110_approve727ffProps,setinvesreqcamt110_approve727ffProps] = React.useState<any>({}) 
   const [invesreqcamt110_save86b45,setinvesreqcamt110_save86b45] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesreqcamt110_save86b45Props,setinvesreqcamt110_save86b45Props] = React.useState<any>({}) 
   const [customwidgetad336,setcustomwidgetad336] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidgetad336Props,setcustomwidgetad336Props] = React.useState<any>({}) 
   const [tran_date51032,settran_date51032] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [tran_date51032Props,settran_date51032Props] = React.useState<any>({}) 
   const [message_code3e093,setmessage_code3e093] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_code3e093Props,setmessage_code3e093Props] = React.useState<any>({}) 
   const [response_type65b90,setresponse_type65b90] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [response_type65b90Props,setresponse_type65b90Props] = React.useState<any>({}) 
   const [response_reason7039a,setresponse_reason7039a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [response_reason7039aProps,setresponse_reason7039aProps] = React.useState<any>({}) 
   const [reason_descriptiond33de,setreason_descriptiond33de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reason_descriptiond33deProps,setreason_descriptiond33deProps] = React.useState<any>({}) 
   const [invesrescamt111_close9d90c,setinvesrescamt111_close9d90c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesrescamt111_close9d90cProps,setinvesrescamt111_close9d90cProps] = React.useState<any>({}) 
   const [invesrescamt111_reject651be,setinvesrescamt111_reject651be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesrescamt111_reject651beProps,setinvesrescamt111_reject651beProps] = React.useState<any>({}) 
   const [invesrescamt111_approve0d9a3,setinvesrescamt111_approve0d9a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesrescamt111_approve0d9a3Props,setinvesrescamt111_approve0d9a3Props] = React.useState<any>({}) 
   const [invesrescamt111_save36a0c,setinvesrescamt111_save36a0c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [invesrescamt111_save36a0cProps,setinvesrescamt111_save36a0cProps] = React.useState<any>({}) 
   const [customwidgetab151,setcustomwidgetab151] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidgetab151Props,setcustomwidgetab151Props] = React.useState<any>({}) 
   const [productcode5d3b1,setproductcode5d3b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [productcode5d3b1Props,setproductcode5d3b1Props] = React.useState<any>({}) 
   const [message_type404e3,setmessage_type404e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [message_type404e3Props,setmessage_type404e3Props] = React.useState<any>({}) 
   const [datece158,setdatece158] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [datece158Props,setdatece158Props] = React.useState<any>({}) 
   const [uuid076a4,setuuid076a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid076a4Props,setuuid076a4Props] = React.useState<any>({}) 
   const [statusa3cf5,setstatusa3cf5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [statusa3cf5Props,setstatusa3cf5Props] = React.useState<any>({}) 
   const [reject_reasonc1c38,setreject_reasonc1c38] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reject_reasonc1c38Props,setreject_reasonc1c38Props] = React.useState<any>({}) 
   const [customwidgetd1c52,setcustomwidgetd1c52] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [customwidgetd1c52Props,setcustomwidgetd1c52Props] = React.useState<any>({}) 
   const [op_financial_submit_btna4ae6,setop_financial_submit_btna4ae6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_financial_submit_btna4ae6Props,setop_financial_submit_btna4ae6Props] = React.useState<any>({}) 
   const [ip_productcodea41e0,setip_productcodea41e0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_productcodea41e0Props,setip_productcodea41e0Props] = React.useState<any>({}) 
   const [ip_message_type89b47,setip_message_type89b47] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_message_type89b47Props,setip_message_type89b47Props] = React.useState<any>({}) 
   const [ip_dated0c4a,setip_dated0c4a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_dated0c4aProps,setip_dated0c4aProps] = React.useState<any>({}) 
   const [amountdeca1,setamountdeca1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [amountdeca1Props,setamountdeca1Props] = React.useState<any>({}) 
   const [ip_financial_submit_btne9bd8,setip_financial_submit_btne9bd8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_financial_submit_btne9bd8Props,setip_financial_submit_btne9bd8Props] = React.useState<any>({}) 
   const [op_110_productcodec2128,setop_110_productcodec2128] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_productcodec2128Props,setop_110_productcodec2128Props] = React.useState<any>({}) 
   const [op_110_message_type8876c,setop_110_message_type8876c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_message_type8876cProps,setop_110_message_type8876cProps] = React.useState<any>({}) 
   const [op_110_date89cec,setop_110_date89cec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_date89cecProps,setop_110_date89cecProps] = React.useState<any>({}) 
   const [op_110_uuid82718,setop_110_uuid82718] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_uuid82718Props,setop_110_uuid82718Props] = React.useState<any>({}) 
   const [op_110_request_type2c432,setop_110_request_type2c432] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_request_type2c432Props,setop_110_request_type2c432Props] = React.useState<any>({}) 
   const [op_110_request_reason6d6fa,setop_110_request_reason6d6fa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_request_reason6d6faProps,setop_110_request_reason6d6faProps] = React.useState<any>({}) 
   const [op_110_submit_btn08cbe,setop_110_submit_btn08cbe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_110_submit_btn08cbeProps,setop_110_submit_btn08cbeProps] = React.useState<any>({}) 
   const [op_111_productcodedfd30,setop_111_productcodedfd30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_productcodedfd30Props,setop_111_productcodedfd30Props] = React.useState<any>({}) 
   const [op_111_message_typec1184,setop_111_message_typec1184] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_message_typec1184Props,setop_111_message_typec1184Props] = React.useState<any>({}) 
   const [op_111_dateadfdb,setop_111_dateadfdb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_dateadfdbProps,setop_111_dateadfdbProps] = React.useState<any>({}) 
   const [op_111_uuidd642f,setop_111_uuidd642f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_uuidd642fProps,setop_111_uuidd642fProps] = React.useState<any>({}) 
   const [op_111_response_status46eaf,setop_111_response_status46eaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_response_status46eafProps,setop_111_response_status46eafProps] = React.useState<any>({}) 
   const [op_111_response_reason39b24,setop_111_response_reason39b24] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_response_reason39b24Props,setop_111_response_reason39b24Props] = React.useState<any>({}) 
   const [op_111_submit_btn3f88e,setop_111_submit_btn3f88e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [op_111_submit_btn3f88eProps,setop_111_submit_btn3f88eProps] = React.useState<any>({}) 
   const [ip_055_productcode77a4c,setip_055_productcode77a4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_productcode77a4cProps,setip_055_productcode77a4cProps] = React.useState<any>({}) 
   const [ip_055_message_typed8915,setip_055_message_typed8915] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_message_typed8915Props,setip_055_message_typed8915Props] = React.useState<any>({}) 
   const [ip_055_date87912,setip_055_date87912] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_date87912Props,setip_055_date87912Props] = React.useState<any>({}) 
   const [ip_055_uuidf2ab4,setip_055_uuidf2ab4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_uuidf2ab4Props,setip_055_uuidf2ab4Props] = React.useState<any>({}) 
   const [ip_055_reason_code579a1,setip_055_reason_code579a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_reason_code579a1Props,setip_055_reason_code579a1Props] = React.useState<any>({}) 
   const [ip_055_additional_info7ae0a,setip_055_additional_info7ae0a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_additional_info7ae0aProps,setip_055_additional_info7ae0aProps] = React.useState<any>({}) 
   const [ip_055_submit_btnfff0c,setip_055_submit_btnfff0c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [ip_055_submit_btnfff0cProps,setip_055_submit_btnfff0cProps] = React.useState<any>({}) 
   const [channel_combobox95649,setchannel_combobox95649] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [channel_combobox95649Props,setchannel_combobox95649Props] = React.useState<any>({}) 
   const [currency_comboboxfbbfc,setcurrency_comboboxfbbfc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [currency_comboboxfbbfcProps,setcurrency_comboboxfbbfcProps] = React.useState<any>({}) 
   const [process_category_comboboxbb731,setprocess_category_comboboxbb731] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [process_category_comboboxbb731Props,setprocess_category_comboboxbb731Props] = React.useState<any>({}) 
   const [offline_online_combobox88add,setoffline_online_combobox88add] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offline_online_combobox88addProps,setoffline_online_combobox88addProps] = React.useState<any>({}) 
   const [product_icon07465,setproduct_icon07465] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_icon07465Props,setproduct_icon07465Props] = React.useState<any>({}) 
   const [transactions_labelf64b1,settransactions_labelf64b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transactions_labelf64b1Props,settransactions_labelf64b1Props] = React.useState<any>({}) 
   const [transaction_countc3fd5,settransaction_countc3fd5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_countc3fd5Props,settransaction_countc3fd5Props] = React.useState<any>({}) 
   const [total_value_icon16d5d,settotal_value_icon16d5d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_value_icon16d5dProps,settotal_value_icon16d5dProps] = React.useState<any>({}) 
   const [total_value_labeld1dce,settotal_value_labeld1dce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_value_labeld1dceProps,settotal_value_labeld1dceProps] = React.useState<any>({}) 
   const [total_amount94c0b,settotal_amount94c0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_amount94c0bProps,settotal_amount94c0bProps] = React.useState<any>({}) 
   const [online_offline_processing_icon87fd3,setonline_offline_processing_icon87fd3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [online_offline_processing_icon87fd3Props,setonline_offline_processing_icon87fd3Props] = React.useState<any>({}) 
   const [online_offline_processing_label9cdc2,setonline_offline_processing_label9cdc2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [online_offline_processing_label9cdc2Props,setonline_offline_processing_label9cdc2Props] = React.useState<any>({}) 
   const [online_offline_process41265,setonline_offline_process41265] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [online_offline_process41265Props,setonline_offline_process41265Props] = React.useState<any>({}) 
   const [linechartdd99a,setlinechartdd99a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [linechartdd99aProps,setlinechartdd99aProps] = React.useState<any>({}) 
   const [transaction_volume_by_channel2b08e,settransaction_volume_by_channel2b08e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_volume_by_channel2b08eProps,settransaction_volume_by_channel2b08eProps] = React.useState<any>({}) 
   const [barchart84262,setbarchart84262] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [barchart84262Props,setbarchart84262Props] = React.useState<any>({}) 
   const [product_organation_label2e07d,setproduct_organation_label2e07d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [product_organation_label2e07dProps,setproduct_organation_label2e07dProps] = React.useState<any>({}) 
   const [piechart9dde7,setpiechart9dde7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [piechart9dde7Props,setpiechart9dde7Props] = React.useState<any>({}) 
   const [transaction_table_label9d37f,settransaction_table_label9d37f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [transaction_table_label9d37fProps,settransaction_table_label9d37fProps] = React.useState<any>({}) 
   const [value_date26f4c,setvalue_date26f4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [value_date26f4cProps,setvalue_date26f4cProps] = React.useState<any>({}) 
   const [dr_accounte2a30,setdr_accounte2a30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_accounte2a30Props,setdr_accounte2a30Props] = React.useState<any>({}) 
   const [dr_name59632,setdr_name59632] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_name59632Props,setdr_name59632Props] = React.useState<any>({}) 
   const [dr_currency39803,setdr_currency39803] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_currency39803Props,setdr_currency39803Props] = React.useState<any>({}) 
   const [dr_amountc3a1f,setdr_amountc3a1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dr_amountc3a1fProps,setdr_amountc3a1fProps] = React.useState<any>({}) 
   const [cr_accountcf8bb,setcr_accountcf8bb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_accountcf8bbProps,setcr_accountcf8bbProps] = React.useState<any>({}) 
   const [cr_name8be31,setcr_name8be31] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_name8be31Props,setcr_name8be31Props] = React.useState<any>({}) 
   const [cr_currency5fe15,setcr_currency5fe15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_currency5fe15Props,setcr_currency5fe15Props] = React.useState<any>({}) 
   const [cr_amounta66de,setcr_amounta66de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cr_amounta66deProps,setcr_amounta66deProps] = React.useState<any>({}) 
   const [uuid9822d,setuuid9822d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [uuid9822dProps,setuuid9822dProps] = React.useState<any>({}) 
   const [statusd47ce,setstatusd47ce] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [statusd47ceProps,setstatusd47ceProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       switchoutbound_or_inbound5e076:false,
       buttonadvance_searcheb531:false,
       buttonsearch14cf0:false,
       buttonrefresh313d0:false,
       buttondownloadcb505:false,
       buttonnew_payment7f5db:false,
       columnvalue_date_view_allb0df6:false,
       columndr_account_view_all33724:false,
       columndr_name_view_allc0a46:false,
       columndr_currency_view_all54da6:false,
       columndr_amount_view_alls88d6b:false,
       columncr_account_view_alld4b39:false,
       columncr_name_view_all19d14:false,
       columncr_currency_view_all82afd:false,
       columncr_amount_view_all47e6b:false,
       columnuuid_view_alldb6f0:false,
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
       columnuuid_failure_queuea9c80:false,
       timelinefailure_queue_journeyc8638:false,
       columnvalue_date_success_queue7c209:false,
       columndr_account_success_queueeddaf:false,
       columndr_name_success_queuec805b:false,
       columndr_currency_success_queue10a49:false,
       columndr_amount_success_queueda254:false,
       columncr_account_success_queue60480:false,
       columncr_name_success_queueb80d4:false,
       columncr_currency_success_queue2f950:false,
       columncr_amount_success_queue019a2:false,
       columnuuid_success_queue87fbe:false,
       timelinesuccess_queue_journey68ac9:false,
       timelinereturn_queue_journeycc9d3:false,
       columnvalue_date_return_queuee5e11:false,
       columndr_account_return_queuebdabb:false,
       columndr_name_return_queue958c9:false,
       columndr_currency_return_queuee94b2:false,
       columndr_amount_return_queue2f324:false,
       columncr_account_return_queue21a57:false,
       columncr_name_return_queue13fec:false,
       columncr_currency_return_queuef37f7:false,
       columncr_amount_return_queue95903:false,
       columnuuid_return_queue2f467:false,
       columnvalue_date_operational_pending6ecd4:false,
       columndr_account_operational_pending2ab87:false,
       columndr_name_operational_pendinga8ff6:false,
       columndr_currency_operational_pending5146b:false,
       columndr_amount_operational_pending70e3f:false,
       columncr_account_operational_pendingf9a9c:false,
       columncr_name_operational_pendingbce21:false,
       columncr_currency_operational_pending282bc:false,
       columncr_amount_operational_pending0df81:false,
       buttonnew_payment_chk_verify_btn3918d:false,
       buttonopr_pending_chk_authorize_btne1fa7:false,
       buttonopr_pending_chk_approve_btn33fe9:false,
       buttonopr_pending_chk_reject_btn18529:false,
       buttonopr_pending_mk_already_posted_btn4eb90:false,
       buttonopr_pending_mk_retry_btn4af05:false,
       buttonopr_pending_mk_reject_btnb2c93:false,
       buttonopr_pending_mk_repost_btn4506c:false,
       buttonopr_pending_mk_Push_next_step_btn631df:false,
       buttonopr_pending_mk_reverse_btndab56:false,
       buttonopr_pending_mk_ip_return_btnb715b:false,
       buttonopr_pending_mk_repair_btnc91a5:false,
       buttonopr_pending_chk_ip_verify_return_btnb8342:false,
       buttonopr_pending_mk_op_return_btn311fd:false,
       buttonopr_pending_chk_op_return_verify_btne3f5b:false,
       buttonopr_pending_mk_force_pass_btnc0708:false,
       buttonopr_pending_op_mk_applysplrate_btn52343:false,
       buttonopr_pending_ip_mkr_applysplrate_btna62ff:false,
       columnuuid_operational_pendinga5f0a:false,
       buttonopr_pending_chk_op_appl_spl_rate_verfiy592a5:false,
       buttonopr_pending_chk_ip_appl_spl_rate_verfiyca082:false,
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
       columnuuid_technical_pendingb820e:false,
       buttontech_pending_mk_reject_btn432a8:false,
       buttontech_pending_mk_retry_btn5f5cf:false,
       buttontech_pending_chk_approve_btnc932b:false,
       buttontech_pending_chk_reject_btn2ef0c:false,
       buttontech_pending_mk_ip_return_btn3d651:false,
       buttontech_pending_chk_ip_verify_return_btn54b4c:false,
       timelinetechnical_pending_journey6601c:false,
       columnvalue_date_notification_pendinga37ed:false,
       columndr_account_notification_pendinge066b:false,
       columndr_name_notification_pending23ac6:false,
       columndr_currency_notification_pendingeabf3:false,
       columndr_amount_notification_pendingd808b:false,
       columncr_account_notification_pending7feb9:false,
       columncr_name_notification_pendingfcab8:false,
       columncr_currency_notification_pending587a1:false,
       columncr_amount_notification_pendingde11a:false,
       columnuuid_notification_pending2ba49:false,
       buttonnon_pending_mk_retry_btnf5b0b:false,
       buttonnon_pending_chk_approve_btnb3cbf:false,
       buttonnon_pending_chk_reject_btn16cba:false,
       timelinenotification_pending_journey32a13:false,
       columnvalue_date_enquiryccb63:false,
       columndr_account_enquiry51592:false,
       columndr_name_enquiry1f341:false,
       columndr_currency_enquiry529c9:false,
       columndr_amount_enquiryf15a6:false,
       columncr_account_enquiry8fc22:false,
       columncr_name_enquiry89e7c:false,
       columncr_currency_enquiryaba9a:false,
       columncr_amount_enquiry6d821:false,
       columnuuid_enquiryc00eb:false,
       buttonenquiry_mk_btnd1038:false,
       timelineenquiry_journey9d5ba:false,
       advancesearchadvancesearch50825:false,
       dividertop_divider52f90:false,
       datepickertrs_created_date2cea8:false,
       textinputdebtor_account_no963e4:false,
       textinputdebtor_namee2d9f:false,
       textinputcreditor_account_noca692:false,
       dropdownpayment_currency703d2:false,
       textinputpayment_amount042b1:false,
       textinputuuid29c9f:false,
       dropdownchannel95601:false,
       dropdownprocessstatus28eca:false,
       textinputstatus4bd75:false,
       dividerbottom_dividerb9220:false,
       buttonsearch0e695:false,
       buttoncleareddfa:false,
       textpayment_info_text_label47b13:false,
       buttonrepair_new_payment_mk_save_btnbd6df:false,
       buttoncancel242e6:false,
       buttonnew_payment_chk_reject_btnb2949:false,
       buttonnew_payment_chk_approve_btncb94c:false,
       buttonsave62f33:false,
       textgeneral_info_text_label92c1e:false,
       datepickervalue_date45767:false,
       dropdownservice_level75e42:false,
       dropdownpurpose75771:false,
       textdbtr_info_text_label1015f:false,
       textinputdr_accounta8f91:false,
       textinputdr_Namef1c15:false,
       dropdowndr_currency45f51:false,
       textinputdr_account_balancea2246:false,
       textinputdr_ibanbaa1f:false,
       textinputdr_street_name149b0:false,
       textinputdr_building_numberba75a:false,
       textinputdr_pstl_code5ec76:false,
       textinputdr_town_name19970:false,
       dropdowndr_countrydd685:false,
       dropdowndr_bank_codeffb62:false,
       radiogroupamount_input_typecd6ed:false,
       textinputdr_amount178b9:false,
       textinputsettlement_amount32b14:false,
       textcreditor_info_label_text02833:false,
       checkboxben_checkbox780b4:false,
       textinputcr_account3b649:false,
       textinputcr_namee0835:false,
       textinputcr_street_name21bab:false,
       buttoncr_benif_action9998d:false,
       textinputcr_building_namea6ac7:false,
       textinputcr_floor44bed:false,
       textinputcr_post_codef645b:false,
       textinputcr_town_nameed852:false,
       dropdowncr_country38218:false,
       dropdowncr_currencyb2ebe:false,
       textinputexchange_rate86282:false,
       textinputcr_amountbd2bf:false,
       dropdowncr_bank_code76d12:false,
       textinputcr_clr_code4387d:false,
       textchrg_info_text_labelf2fb3:false,
       dropdowncharge_type63052:false,
       textinputcharge_amount44ea6:false,
       textinputcorrespondent_chargeff14a:false,
       textinputbank_chargeb33d7:false,
       textadd_info_text_label19bc1:false,
       dropdownpayment_method031c1:false,
       dropdowninstruction_priorityafb4d:false,
       dropdowncategory_purposead521:false,
       textinputremittance_info6fbdf:false,
       textinputintermediary_institution45fe6:false,
       textinputsender_receiver_info30c67:false,
       dropdowncorrespondent_bank2a7ae:false,
       customwidgetcustomwidget02697:false,
       textbenificiary_textb53b9:false,
       textinputsearch_textinput7144f:false,
       buttonsearch_btne5c0a:false,
       dividerben_divideraec54:false,
       textaccount_holder_namedb849:false,
       iconiconcd6e8:false,
       textaccount_numberf1543:false,
       dividerconfirm_dividere3b17:false,
       buttonclear_button188cc:false,
       buttonconfirm_button246d5:false,
       dividerdivider_tope6917:false,
       texttransaction_date_time_label669d7:false,
       textprocessed_by_label542e8:false,
       texttrs_created_date14856:false,
       textprocessing_systemd2b69:false,
       textcurrency_labele21ba:false,
       textamount_labelfd725:false,
       textdr_currency9c8a2:false,
       textdr_amount01416:false,
       textdebit_account_label3b1b7:false,
       textprocess_status_labelb6505:false,
       textdr_account36b40:false,
       texttrs_process_statusa4262:false,
       textcredit_account_label65c7b:false,
       textstatus_labelf3713:false,
       textcr_account500d6:false,
       texttrs_status88bc7:false,
       dividerdivider_bottom8bad5:false,
       buttonview_msg_data_btne6a88:false,
       buttonview_tran_log_btn9cd8c:false,
       dividerdivider_topf46a0:false,
       xmlviewerxmlviewer9fe8d:false,
       dividerdivider_bottom6920d:false,
       buttoncancel_btn5e840:false,
       jsonviewerreq_jsonviewer8d071:false,
       jsonviewerres_jsonviewerdd261:false,
       dropdownreturn_reason38055:false,
       dropdownreturn_reason_code06fe7:false,
       textinputreturn_currency5d707:false,
       textinputreturn_amount7f000:false,
       buttonreturn_close1890d:false,
       buttonreturn_reject6b8cc:false,
       buttonreturn_approveaa4d9:false,
       buttonreturn_save03b4e:false,
       textinputdr_account8ccf1:false,
       textinputdr_currency6b8f0:false,
       textinputdebit_exchange_rate710eb:false,
       textinputret_amountb0252:false,
       textinputret_currencye06ce:false,
       textinputexchange_rate71ca9:false,
       textinputcalculated_ret_amountdc5ca:false,
       buttonapply_special_rate_closef2db0:false,
       buttonreturn_rejectdab31:false,
       buttonreturn_approve9ff3e:false,
       buttonreturn_savec7f8c:false,
       textinputdr_account4eafa:false,
       textinputdr_currencyf9a11:false,
       textinputdr_amount3c1d4:false,
       textinputcr_currencya5017:false,
       textinputcr_amountac0e3:false,
       textinputexchange_rate42ef6:false,
       textinputrevised_exchange_rate18eff:false,
       textinputrevised_debit_amount6130b:false,
       textinputrevised_credit_amount67a97:false,
       buttonapply_special_rate_close57a71:false,
       buttonapply_special_rate_rejectba9fa:false,
       buttonapply_special_rate_approve58219:false,
       buttonapply_special_rate_savebdf41:false,
       textinputcr_accountede53:false,
       textinputcr_currency233af:false,
       textinputcr_amount807dd:false,
       textinputaccount_currency8e273:false,
       textinputcurrent_exchange_rateb1fbe:false,
       textinputcredit_amountda91c:false,
       textinputrevised_exchange_ratedb974:false,
       textinputrevised_credit_amount747be:false,
       buttonapply_special_rate_process_close57120:false,
       buttonapply_special_rate_process_reject934bd:false,
       buttonapply_special_rate_process_approvecfefb:false,
       buttonapply_special_rate_process_save4fcee:false,
       dropdownreturn_reasonac630:false,
       dropdownreturn_reason_code6797b:false,
       textinputreturn_currency378ac:false,
       textinputreturn_amount9646b:false,
       buttontech_return_approve71c38:false,
       buttontech_return_closefec09:false,
       buttontech_return_reject676d0:false,
       buttontech_return_savea3f06:false,
       dropdownpayment_type7038c:false,
       dropdownmessage_code7cd22:false,
       buttonenquiry_sendfcaa9:false,
       switchoutbound_or_inbound5a71c:false,
       buttonsearchfab91:false,
       buttonrefreshe9e64:false,
       columnchannel_name_view_alle4831:false,
       columnuuid_view_all17e51:false,
       columndr_account_view_alleb786:false,
       columndr_name_view_all418a1:false,
       columncr_account_view_alle3b47:false,
       columncr_name_view_alld92c9:false,
       columncr_currency_view_all459b1:false,
       columncr_amount_view_all511fd:false,
       columnmessage_code_view_all346ce:false,
       columntran_date_view_all4223e:false,
       timelineview_all_journey12494:false,
       columnchannel_name_can_req_camt055f27d8:false,
       columnuuid_can_req_camt0558430a:false,
       columndr_account_can_req_camt055050c7:false,
       columndr_name_can_req_camt055679dd:false,
       columncr_account_can_req_camt0555b65e:false,
       columncr_name_can_req_camt055bcc5f:false,
       columncr_currency_can_req_camt0556e4f6:false,
       columncr_amount_can_req_camt0550e8b4:false,
       buttoncancel_request_camt055_mk_initiate_btn2902f:false,
       buttoncancel_request_camt055_chk_verify_btn42585:false,
       columnmessage_code_can_req_camt055532c4:false,
       columntran_date_can_req_camt055ea19b:false,
       timelinecancel_request_camt055_journeyb00e8:false,
       columnchannel_name_inves_req_camt110026bb:false,
       columnuuid_inves_req_camt110c3172:false,
       columndr_account_inves_req_camt110a53ed:false,
       columndr_name_inves_req_camt1101105a:false,
       columncr_account_inves_req_camt110492e3:false,
       columncr_name_inves_req_camt110dc531:false,
       columncr_currency_inves_req_camt110e2b2d:false,
       columncr_amount_inves_req_camt11060ab5:false,
       columnmessage_code_inves_req_camt11064432:false,
       columntran_date_inves_req_camt110772d7:false,
       buttoninves_req_camt110_mk_initiate_btn3da3f:false,
       buttoninves_req_camt110_chk_verify_btn97d7c:false,
       timelineinves_req_camt110_journey28ae2:false,
       columnchannel_name_inves_res_camt111d0063:false,
       columnuuid_inves_res_camt1118b477:false,
       columndr_account_inves_res_camt11129cf4:false,
       columndr_name_inves_res_camt111514e6:false,
       columncr_account_inves_res_camt1112e6f0:false,
       columncr_name_inves_res_camt11102682:false,
       columncr_currency_inves_res_camt1114b416:false,
       columncr_amount_inves_res_camt11184bb7:false,
       columnmessage_code_inves_res_camt111005f1:false,
       columntran_date_inves_res_camt111a30a9:false,
       buttoninves_res_camt111_mk_initiate_btn47e33:false,
       buttoninves_res_camt111_chk_verify_btnf5ad1:false,
       timelineinves_res_camt111_journey3d289:false,
       textsearch_label130a2:false,
       dividertop_dividerdea5b:false,
       datepickertrs_created_date28cb9:false,
       textinputuuida0e9e:false,
       textinputdebtor_account_no1b62b:false,
       textinputdebtor_name908b6:false,
       textinputcreditor_account_no14a5f:false,
       textinputcr_name1ecf4:false,
       textinputcr_currencydbebf:false,
       textinputcr_amounta1974:false,
       dropdownmessage_codefa765:false,
       dividerbottom_divideradc51:false,
       buttonsearch4197d:false,
       buttonclear91c04:false,
       datepickertran_date5d7c0:false,
       textinputmessage_code5df7d:false,
       dropdowncancel_reason1d34e:false,
       textinputreason_description5420a:false,
       buttoncancelrequestcamt055_closed99be:false,
       buttoncancelrequestcamt055_reject88d84:false,
       buttoncancelrequestcamt055_approve510fd:false,
       buttoncancelrequestcamt055_save46cc8:false,
       customwidgetcustomwidgetb9148:false,
       datepickertran_date9acc4:false,
       textinputmessage_code581ad:false,
       dropdowninvestigation_type576c6:false,
       dropdowninvestigation_reason74007:false,
       textinputreason_description6d274:false,
       buttoninvesreqcamt110_closee3b00:false,
       buttoninvesreqcamt110_reject5b353:false,
       buttoninvesreqcamt110_approve727ff:false,
       buttoninvesreqcamt110_save86b45:false,
       customwidgetcustomwidgetad336:false,
       datepickertran_date51032:false,
       textinputmessage_code3e093:false,
       dropdownresponse_type65b90:false,
       dropdownresponse_reason7039a:false,
       textinputreason_descriptiond33de:false,
       buttoninvesrescamt111_close9d90c:false,
       buttoninvesrescamt111_reject651be:false,
       buttoninvesrescamt111_approve0d9a3:false,
       buttoninvesrescamt111_save36a0c:false,
       customwidgetcustomwidgetab151:false,
       textinputproductcode5d3b1:false,
       dropdownmessage_type404e3:false,
       datepickerdatece158:false,
       textinputuuid076a4:false,
       dropdownstatusa3cf5:false,
       dropdownreject_reasonc1c38:false,
       customwidgetcustomwidgetd1c52:false,
       buttonop_financial_submit_btna4ae6:false,
       textinputip_productcodea41e0:false,
       dropdownip_message_type89b47:false,
       datepickerip_dated0c4a:false,
       textinputamountdeca1:false,
       buttonip_financial_submit_btne9bd8:false,
       textinputop_110_productcodec2128:false,
       textinputop_110_message_type8876c:false,
       datepickerop_110_date89cec:false,
       textinputop_110_uuid82718:false,
       dropdownop_110_request_type2c432:false,
       dropdownop_110_request_reason6d6fa:false,
       buttonop_110_submit_btn08cbe:false,
       textinputop_111_productcodedfd30:false,
       textinputop_111_message_typec1184:false,
       datepickerop_111_dateadfdb:false,
       textinputop_111_uuidd642f:false,
       dropdownop_111_response_status46eaf:false,
       dropdownop_111_response_reason39b24:false,
       buttonop_111_submit_btn3f88e:false,
       textinputip_055_productcode77a4c:false,
       textinputip_055_message_typed8915:false,
       datepickerip_055_date87912:false,
       textinputip_055_uuidf2ab4:false,
       dropdownip_055_reason_code579a1:false,
       textareaip_055_additional_info7ae0a:false,
       buttonip_055_submit_btnfff0c:false,
       comboboxchannel_combobox95649:false,
       comboboxcurrency_comboboxfbbfc:false,
       comboboxprocess_category_comboboxbb731:false,
       comboboxoffline_online_combobox88add:false,
       iconproduct_icon07465:false,
       labeltransactions_labelf64b1:false,
       texttransaction_countc3fd5:false,
       icontotal_value_icon16d5d:false,
       labeltotal_value_labeld1dce:false,
       texttotal_amount94c0b:false,
       icononline_offline_processing_icon87fd3:false,
       labelonline_offline_processing_label9cdc2:false,
       textonline_offline_process41265:false,
       linechartlinechartdd99a:false,
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
       columnstatusd47ce:false,
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
       groupreturn_queue_journey_group92c55:false,
       tablereturn_queue_table267f0:false,
       groupoperational_pending_tab67331:false,
       tableoperational_pending_table0a253:false,
       groupoperational_pending_journey_group63667:false,
       grouptechnical_pending_tab0b23f:false,
       tabletechnical_pending_table84f30:false,
       grouptechnical_pending_journey_groupe4f03:false,
       groupnotification_pending_tab223c7:false,
       tablenotification_pending_table45836:false,
       groupnotification_pending_journey_groupc9534:false,
       groupenquiry_tabfb252:false,
       tableenquiry_tableb3b4e:false,
       groupenquiry_journey_group047c9:false,
       groupgroup7e695:false,
       groupmain_group9066f:false,
       grouppayment_info_group1bac9:false,
       groupmidynamicactions3b39d:false,
       groupgeneral_info_groupc83e6:false,
       groupdbtr_info_group4e8ea:false,
       groupcr_info_groupb01e8:false,
       groupchrg_info_group76ab0:false,
       groupadd_info_groupe8dc6:false,
       groupbeneficiary_list_group9d9c4:false,
       groupben_list_groupb24ac:false,
       groupbenc_groupa95a7:false,
       groupjourney_details_groupd9a0e:false,
       grouptran_data_group84f25:false,
       groupreq_data_group8d4d7:false,
       groupres_data_group9d75a:false,
       groupreturnreasonmaingroup60037:false,
       groupreturnreasonsubgroup63981:false,
       groupreturndynamicactions87eb7:false,
       groupapplyspecialratemaingroup6cd35:false,
       groupapplyspecialratesubgroupd7745:false,
       groupapplyspecialratedynamicactions8ee48:false,
       groupapplyspecialratemaingroupe0950:false,
       groupapplyspecialratesubgroup2d2fd:false,
       groupapplyspecialratedynamicactionsc09cc:false,
       groupapplyspecialratemaingroup5736c:false,
       groupapplyspecialratesubgroup36462:false,
       groupapplyspecialratedynamicactionsd8714:false,
       groupreturnreasonmaingroup382bc:false,
       groupreturnreasonsubgroupf68e5:false,
       groupreturndynamicactionsc7672:false,
       groupenquirymaingroup8a315:false,
       groupenquirysubgroup4c021:false,
       groupdynamicactions13e5e:false,
       grouptran_main_group9581a:false,
       grouptran_tab_group2a929:false,
       groupview_all_tab9a177:false,
       tableview_all_tableccb40:false,
       groupview_all_journey_groupca47a:false,
       groupcancel_equest_camt055_tabf8dc6:false,
       tablecancel_request_camt055_table9e976:false,
       groupcancel_request_camt055_journey_groupd18a2:false,
       groupinves_req_camt110_tab81869:false,
       tableinves_req_camt110_tablefa00e:false,
       groupinves_req_camt110_journey_groupca738:false,
       groupinvestigation_response_camt111_tabf6177:false,
       tableinves_res_camt111_table0f401:false,
       groupinves_res_camt111_journey_group785d4:false,
       groupmain_group746bf:false,
       groupcancelrequestcamt055maingroupbf232:false,
       groupcancelrequestcamt055subgroup5ac44:false,
       groupcancelrequestcamt055dynamicactions2a75a:false,
       groupinvestigationrequestcamt110maingroup7a2f5:false,
       groupinvestigationrequestcamt110subgroup276a5:false,
       groupinvestigationrequestcamt110dynamicactionsbfdc2:false,
       groupinvestigationresponsecamt111maingroup058ec:false,
       groupinvestigationresponsecamt111subgroupafab5:false,
       groupinvestigationresponsecamt111dynamicactionsceeed:false,
       groupacksimulatormaingroup3a007:false,
       groupack_simulator_tab_group0778c:false,
       groupop_financial_tab_headerc391f:false,
       groupop_simulator_sub_group467ba:false,
       groupcustomwidgetmaingroupcf43a:false,
       groupdynamicactionmaingroupd3a78:false,
       groupdynamicactionsubgroupa58e6:false,
       groupip_financial_tab_header60896:false,
       groupip_simulator_sub_groupa1dc8:false,
       groupip_dynamicactionmaingroup2f849:false,
       groupip_dynamicactionsubgroup31c5b:false,
       groupop_nf_camt110_tab_header4fa71:false,
       groupop_camt110_simulator_sub_group6f9ed:false,
       groupop_110_dynamicactionmaingroup4acc0:false,
       groupop_110_dynamicactionsubgroup56a89:false,
       groupop_nf_camt111_tab_header05ca0:false,
       groupop_camt111_simulator_sub_group120d6:false,
       groupop_111_dynamicactionmaingroupe4308:false,
       groupop_111_dynamicactionsubgroup73de7:false,
       groupip_nf_camt055_tab_header06c62:false,
       groupip_camt055_simulator_sub_group52216:false,
       groupip_055_dynamicactionmaingroup84550:false,
       groupip_055_dynamicactionsubgroup2ae9c:false,
       groupgdb_group5384d:false,
       grouptab_group65b41:false,
       grouptab_header04820:false,
       grouptab_grpe63f4:false,
       grouptransaction_group6c6f2:false,
       grouptotal_value_group9d783:false,
       grouponline_offline_processing_group7ad24:false,
       groupline_chart_group61ee8:false,
       groupbar_chart_group737a3:false,
       grouppie_chart_group15067:false,
       tabletransaction_tablef4f34:false,
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
  const [advancesearch_v1,setadvancesearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [advancesearch_v1Props,setadvancesearch_v1Props] = React.useState<any>({})
  const [transactionsearch_v1,settransactionsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [transactionsearch_v1Props,settransactionsearch_v1Props] = React.useState<any>({})
  const [paymentinfo_v1,setpaymentinfo_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [paymentinfo_v1Props,setpaymentinfo_v1Props] = React.useState<any>({})
  const [beneficiarylistpopup_v1,setbeneficiarylistpopup_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [beneficiarylistpopup_v1Props,setbeneficiarylistpopup_v1Props] = React.useState<any>({})
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
  const [inboundreturnprocess_v1,setinboundreturnprocess_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [inboundreturnprocess_v1Props,setinboundreturnprocess_v1Props] = React.useState<any>({})
  const [outboundmanualreturnprocess_v1,setoutboundmanualreturnprocess_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [outboundmanualreturnprocess_v1Props,setoutboundmanualreturnprocess_v1Props] = React.useState<any>({})
  const [outboundapplyspecialrate_v1,setoutboundapplyspecialrate_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [outboundapplyspecialrate_v1Props,setoutboundapplyspecialrate_v1Props] = React.useState<any>({})
  const [inboundapplyspecialrateprocess_v1,setinboundapplyspecialrateprocess_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [inboundapplyspecialrateprocess_v1Props,setinboundapplyspecialrateprocess_v1Props] = React.useState<any>({})
  const [techinboundreturnprocess_v1,settechinboundreturnprocess_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [techinboundreturnprocess_v1Props,settechinboundreturnprocess_v1Props] = React.useState<any>({})
  const [enquiry_v1,setenquiry_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [enquiry_v1Props,setenquiry_v1Props] = React.useState<any>({})
  const [nftransactionproduct_v1,setnftransactionproduct_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [nftransactionproduct_v1Props,setnftransactionproduct_v1Props] = React.useState<any>({})
  const [nftransactionsearch_v1,setnftransactionsearch_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [nftransactionsearch_v1Props,setnftransactionsearch_v1Props] = React.useState<any>({})
  const [nfcancelrequestcamt055_v1,setnfcancelrequestcamt055_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [nfcancelrequestcamt055_v1Props,setnfcancelrequestcamt055_v1Props] = React.useState<any>({})
  const [nfinvestigationrequestcamt110_v1,setnfinvestigationrequestcamt110_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [nfinvestigationrequestcamt110_v1Props,setnfinvestigationrequestcamt110_v1Props] = React.useState<any>({})
  const [nfinvestigationresponsecamt111_v1,setnfinvestigationresponsecamt111_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [nfinvestigationresponsecamt111_v1Props,setnfinvestigationresponsecamt111_v1Props] = React.useState<any>({})
  const [acksimulator_v1,setacksimulator_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [acksimulator_v1Props,setacksimulator_v1Props] = React.useState<any>({})
  const [dashboard_v1,setdashboard_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [dashboard_v1Props,setdashboard_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_transaction_v1Props,setdfd_transaction_v1Props] = React.useState<any>([])
  const [dfd_channelcombosearch_v1Props,setdfd_channelcombosearch_v1Props] = React.useState<any>([])
  const [dfd_processstatuscombosearch_v1Props,setdfd_processstatuscombosearch_v1Props] = React.useState<any>([])
  const [dfd_currencycombo_v1Props,setdfd_currencycombo_v1Props] = React.useState<any>([])
  const [dfd_beneficiarylistquery_v1Props,setdfd_beneficiarylistquery_v1Props] = React.useState<any>([])
  const [dfd_purposecombo_v1Props,setdfd_purposecombo_v1Props] = React.useState<any>([])
  const [dfd_countrycombo_v1Props,setdfd_countrycombo_v1Props] = React.useState<any>([])
  const [dfd_crbankcodecombo_v1Props,setdfd_crbankcodecombo_v1Props] = React.useState<any>([])
  const [dfd_drbankcodecombo_v1Props,setdfd_drbankcodecombo_v1Props] = React.useState<any>([])
  const [dfd_chargetypecombo_v1Props,setdfd_chargetypecombo_v1Props] = React.useState<any>([])
  const [dfd_paymentmethodcombo_v1Props,setdfd_paymentmethodcombo_v1Props] = React.useState<any>([])
  const [dfd_initiationinstructionprioritycombo_v1Props,setdfd_initiationinstructionprioritycombo_v1Props] = React.useState<any>([])
  const [dfd_categorypurposecombo_v1Props,setdfd_categorypurposecombo_v1Props] = React.useState<any>([])
  const [dfd_correspondentbankcombo_v1Props,setdfd_correspondentbankcombo_v1Props] = React.useState<any>([])
  const [dfd_manualinitiationuimappingquery_v1Props,setdfd_manualinitiationuimappingquery_v1Props] = React.useState<any>([])
  const [dfd_servicelevelcombo_v1Props,setdfd_servicelevelcombo_v1Props] = React.useState<any>([])
  const [dfd_journey_v1Props,setdfd_journey_v1Props] = React.useState<any>([])
  const [dfd_returnreason_v1Props,setdfd_returnreason_v1Props] = React.useState<any>([])
  const [dfd_transactiondetailquery_v1Props,setdfd_transactiondetailquery_v1Props] = React.useState<any>([])
  const [dfd_enquirypaymenttypecombo_v1Props,setdfd_enquirypaymenttypecombo_v1Props] = React.useState<any>([])
  const [dfd_enquirymessagetypecombo_v1Props,setdfd_enquirymessagetypecombo_v1Props] = React.useState<any>([])
  const [dfd_nftransaction_v1Props,setdfd_nftransaction_v1Props] = React.useState<any>([])
  const [dfd_nftranmaintransaction_v1Props,setdfd_nftranmaintransaction_v1Props] = React.useState<any>([])
  const [dfd_nfcancelreasoncombo_v1Props,setdfd_nfcancelreasoncombo_v1Props] = React.useState<any>([])
  const [dfd_nfinvestigationtypecombo_v1Props,setdfd_nfinvestigationtypecombo_v1Props] = React.useState<any>([])
  const [dfd_nfinvestigationreasoncombo_v1Props,setdfd_nfinvestigationreasoncombo_v1Props] = React.useState<any>([])
  const [dfd_nfresponsetypecombo_v1Props,setdfd_nfresponsetypecombo_v1Props] = React.useState<any>([])
  const [dfd_nfresponsereasoncombo_v1Props,setdfd_nfresponsereasoncombo_v1Props] = React.useState<any>([])
  const [dfd_nfviewalltransaction_v1Props,setdfd_nfviewalltransaction_v1Props] = React.useState<any>([])
  const [dfd_messagetypesimulatorcombo_v1Props,setdfd_messagetypesimulatorcombo_v1Props] = React.useState<any>([])
  const [dfd_statussimulatorcombo_v1Props,setdfd_statussimulatorcombo_v1Props] = React.useState<any>([])
  const [dfd_ipmessagetypestimulatorcombo_v1Props,setdfd_ipmessagetypestimulatorcombo_v1Props] = React.useState<any>([])
  const [dfd_nfsimulatormessage_v1Props,setdfd_nfsimulatormessage_v1Props] = React.useState<any>([])
  const [dfd_nfreqtype_v1Props,setdfd_nfreqtype_v1Props] = React.useState<any>([])
  const [dfd_nfreqreason_v1Props,setdfd_nfreqreason_v1Props] = React.useState<any>([])
  const [dfd_nfrespreason_v1Props,setdfd_nfrespreason_v1Props] = React.useState<any>([])
  const [dfd_nfresptype_v1Props,setdfd_nfresptype_v1Props] = React.useState<any>([])
  const [dfd_rejectreasonsimulatorcombo_v1Props,setdfd_rejectreasonsimulatorcombo_v1Props] = React.useState<any>([])
  const [dfd_channeldashboard_dashboard_v1Props,setdfd_channeldashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_currencydashboard_dashboard_v1Props,setdfd_currencydashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_transaction_dashboard_v1Props,setdfd_transaction_dashboard_v1Props] = React.useState<any>([])
  const [dfd_onlineofflinedashboard_dashboard_v1Props,setdfd_onlineofflinedashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_processcategorydashboard_dashboard_v1Props,setdfd_processcategorydashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_transactioncountvphdashboard_dashboard_v1Props,setdfd_transactioncountvphdashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_channelcountvphdashboard_dashboard_v1Props,setdfd_channelcountvphdashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_channelchartdashboard_dashboard_v1Props,setdfd_channelchartdashboard_dashboard_v1Props] = React.useState<any>([])
  const [dfd_onlineofflinecountvphdashboard_dashboard_v1Props,setdfd_onlineofflinecountvphdashboard_dashboard_v1Props] = React.useState<any>([])
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
    setadvance_searcheb531(
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
    setdr_amount_view_alls88d6b(
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
    setuuid_view_alldb6f0(
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
    setuuid_failure_queuea9c80(
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
    setdr_currency_success_queue10a49(
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
    setuuid_success_queue87fbe(
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
    setreturn_queue_journeycc9d3(
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
    setuuid_return_queue2f467(
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
    setdr_account_operational_pending2ab87(
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
    setnew_payment_chk_verify_btn3918d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_authorize_btne1fa7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_approve_btn33fe9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_reject_btn18529(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_already_posted_btn4eb90(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_retry_btn4af05(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_reject_btnb2c93(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_repost_btn4506c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_push_next_step_btn631df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_reverse_btndab56(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_ip_return_btnb715b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_repair_btnc91a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_ip_verify_return_btnb8342(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_op_return_btn311fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_op_return_verify_btne3f5b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_mk_force_pass_btnc0708(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_op_mk_applysplrate_btn52343(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_ip_mkr_applysplrate_btna62ff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_operational_pendinga5f0a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_op_appl_spl_rate_verfiy592a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setopr_pending_chk_ip_appl_spl_rate_verfiyca082(
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
    setuuid_technical_pendingb820e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_mk_reject_btn432a8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_mk_retry_btn5f5cf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_chk_approve_btnc932b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_chk_reject_btn2ef0c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_mk_ip_return_btn3d651(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_pending_chk_ip_verify_return_btn54b4c(
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
    setvalue_date_notification_pendinga37ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_notification_pendinge066b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_notification_pending23ac6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_notification_pendingeabf3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_notification_pendingd808b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_notification_pending7feb9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_notification_pendingfcab8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_notification_pending587a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_notification_pendingde11a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_notification_pending2ba49(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_pending_mk_retry_btnf5b0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_pending_chk_approve_btnb3cbf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnon_pending_chk_reject_btn16cba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnotification_pending_journey32a13(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date_enquiryccb63(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_enquiry51592(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_enquiry1f341(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency_enquiry529c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount_enquiryf15a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_enquiry8fc22(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_enquiry89e7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_enquiryaba9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_enquiry6d821(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_enquiryc00eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenquiry_mk_btnd1038(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenquiry_journey9d5ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch50825(
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
    setchannel95601(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocessstatus28eca(
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
    setpayment_info_text_label47b13(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrepair_new_payment_mk_save_btnbd6df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel242e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnew_payment_chk_reject_btnb2949(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnew_payment_chk_approve_btncb94c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsave62f33(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setgeneral_info_text_label92c1e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalue_date45767(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setservice_level75e42(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurpose75771(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdbtr_info_text_label1015f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_accounta8f91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_namef1c15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency45f51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_balancea2246(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_ibanbaa1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_street_name149b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_building_numberba75a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_pstl_code5ec76(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_town_name19970(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_countrydd685(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_bank_codeffb62(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamount_input_typecd6ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount178b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsettlement_amount32b14(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_info_label_text02833(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setben_checkbox780b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account3b649(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_namee0835(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_street_name21bab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_benif_action9998d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_building_namea6ac7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_floor44bed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_post_codef645b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_town_nameed852(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_country38218(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currencyb2ebe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexchange_rate86282(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amountbd2bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_bank_code76d12(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_clr_code4387d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchrg_info_text_labelf2fb3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_type63052(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcharge_amount44ea6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcorrespondent_chargeff14a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbank_chargeb33d7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_info_text_label19bc1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpayment_method031c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinstruction_priorityafb4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_purposead521(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setremittance_info6fbdf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setintermediary_institution45fe6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsender_receiver_info30c67(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcorrespondent_bank2a7ae(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidget02697(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbenificiary_textb53b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_textinput7144f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_btne5c0a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setben_divideraec54(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_holder_namedb849(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    seticoncd6e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_numberf1543(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfirm_dividere3b17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear_button188cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfirm_button246d5(
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
    setprocessed_by_label542e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date14856(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setprocessing_systemd2b69(
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
    setamount_labelfd725(
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
    setdr_amount01416(
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
    setprocess_status_labelb6505(
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
    settrs_process_statusa4262(
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
    setstatus_labelf3713(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account500d6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status88bc7(
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
    setreturn_reason38055(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reason_code06fe7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_currency5d707(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_amount7f000(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_close1890d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reject6b8cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_approveaa4d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_save03b4e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account8ccf1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currency6b8f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebit_exchange_rate710eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setret_amountb0252(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setret_currencye06ce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexchange_rate71ca9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcalculated_ret_amountdc5ca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_closef2db0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_rejectdab31(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_approve9ff3e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_savec7f8c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account4eafa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_currencyf9a11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_amount3c1d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currencya5017(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amountac0e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexchange_rate42ef6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrevised_exchange_rate18eff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrevised_debit_amount6130b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrevised_credit_amount67a97(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_close57a71(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_rejectba9fa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_approve58219(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_savebdf41(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_accountede53(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency233af(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount807dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaccount_currency8e273(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrent_exchange_rateb1fbe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcredit_amountda91c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrevised_exchange_ratedb974(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrevised_credit_amount747be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_process_close57120(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_process_reject934bd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_process_approvecfefb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapply_special_rate_process_save4fcee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reasonac630(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_reason_code6797b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_currency378ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturn_amount9646b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_return_approve71c38(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_return_closefec09(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_return_reject676d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settech_return_savea3f06(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpayment_type7038c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code7cd22(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenquiry_sendfcaa9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoutbound_or_inbound5a71c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearchfab91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrefreshe9e64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_view_alle4831(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_view_all17e51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_view_alleb786(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_view_all418a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_view_alle3b47(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_view_alld92c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_view_all459b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_view_all511fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code_view_all346ce(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date_view_all4223e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview_all_journey12494(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_can_req_camt055f27d8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_can_req_camt0558430a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_can_req_camt055050c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_can_req_camt055679dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_can_req_camt0555b65e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_can_req_camt055bcc5f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_can_req_camt0556e4f6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_can_req_camt0550e8b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_request_camt055_mk_initiate_btn2902f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_request_camt055_chk_verify_btn42585(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code_can_req_camt055532c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date_can_req_camt055ea19b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_request_camt055_journeyb00e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_inves_req_camt110026bb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_inves_req_camt110c3172(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_inves_req_camt110a53ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_inves_req_camt1101105a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_inves_req_camt110492e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_inves_req_camt110dc531(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_inves_req_camt110e2b2d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_inves_req_camt11060ab5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code_inves_req_camt11064432(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date_inves_req_camt110772d7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_req_camt110_mk_initiate_btn3da3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_req_camt110_chk_verify_btn97d7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_req_camt110_journey28ae2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setchannel_name_inves_res_camt111d0063(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid_inves_res_camt1118b477(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_account_inves_res_camt11129cf4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdr_name_inves_res_camt111514e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_account_inves_res_camt1112e6f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name_inves_res_camt11102682(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currency_inves_res_camt1114b416(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amount_inves_res_camt11184bb7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code_inves_res_camt111005f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date_inves_res_camt111a30a9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_res_camt111_mk_initiate_btn47e33(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_res_camt111_chk_verify_btnf5ad1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinves_res_camt111_journey3d289(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch_label130a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settop_dividerdea5b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date28cb9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuida0e9e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_account_no1b62b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdebtor_name908b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcreditor_account_no14a5f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_name1ecf4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_currencydbebf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcr_amounta1974(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_codefa765(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbottom_divideradc51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch4197d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear91c04(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date5d7c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code5df7d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_reason1d34e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreason_description5420a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancelrequestcamt055_closed99be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancelrequestcamt055_reject88d84(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancelrequestcamt055_approve510fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancelrequestcamt055_save46cc8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetb9148(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date9acc4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code581ad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvestigation_type576c6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvestigation_reason74007(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreason_description6d274(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesreqcamt110_closee3b00(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesreqcamt110_reject5b353(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesreqcamt110_approve727ff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesreqcamt110_save86b45(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetad336(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settran_date51032(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_code3e093(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setresponse_type65b90(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setresponse_reason7039a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreason_descriptiond33de(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesrescamt111_close9d90c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesrescamt111_reject651be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesrescamt111_approve0d9a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinvesrescamt111_save36a0c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetab151(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproductcode5d3b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmessage_type404e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdatece158(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuuid076a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatusa3cf5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject_reasonc1c38(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcustomwidgetd1c52(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_financial_submit_btna4ae6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_productcodea41e0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_message_type89b47(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_dated0c4a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamountdeca1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_financial_submit_btne9bd8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_productcodec2128(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_message_type8876c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_date89cec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_uuid82718(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_request_type2c432(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_request_reason6d6fa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_110_submit_btn08cbe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_productcodedfd30(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_message_typec1184(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_dateadfdb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_uuidd642f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_response_status46eaf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_response_reason39b24(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setop_111_submit_btn3f88e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_productcode77a4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_message_typed8915(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_date87912(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_uuidf2ab4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_reason_code579a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_additional_info7ae0a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setip_055_submit_btnfff0c(
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
    setlinechartdd99a(
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
    setstatusd47ce(
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
            "advance_search",
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
        setnotification_pending_tab223c7({}) 
    setnotification_pending_tab223c7Props({
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
    
    setnotification_pending_table45836([]) 
    setnotification_pending_table45836Props({
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
        setnotification_pending_journey_groupc9534({}) 
    setnotification_pending_journey_groupc9534Props({
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
        setenquiry_tabfb252({}) 
    setenquiry_tabfb252Props({
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
    
    setenquiry_tableb3b4e([]) 
    setenquiry_tableb3b4eProps({
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
        setenquiry_journey_group047c9({}) 
    setenquiry_journey_group047c9Props({
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
        setgroup7e695({}) 
    setgroup7e695Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "trs_created_date",
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
            "payment_currency",
            "payment_currency",
            "cr_currency",
            "dr_amount",
            "uuid",
            "channel",
            "channel",
            "processstatus",
            "processstatus",
            "trs_status",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        setpayment_info_group1bac9({}) 
    setpayment_info_group1bac9Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_info_text_label",
            "customwidget",
      ]
      }) 
        setmidynamicactions3b39d({}) 
    setmidynamicactions3b39dProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "repair_new_payment_mk_save_btn",
            "cancel",
            "new_payment_chk_reject_btn",
            "new_payment_chk_approve_btn",
            "save",
      ]
      }) 
        setgeneral_info_groupc83e6({}) 
    setgeneral_info_groupc83e6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "general_info_text_label",
            "value_date",
            "service_level",
            "purpose",
            "purpose",
            "purpose",
      ]
      }) 
        setdbtr_info_group4e8ea({}) 
    setdbtr_info_group4e8eaProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dbtr_info_text_label",
            "dr_account",
            "dr_name",
            "dr_currency",
            "dr_currency",
            "dr_currency",
            "dr_account_balance",
            "dr_iban",
            "dr_street_name",
            "dr_building_number",
            "dr_post_code",
            "dr_town_name",
            "dr_country",
            "dr_bank_code",
            "amount_input_type",
            "dr_amount",
            "settlement_amount",
      ]
      }) 
        setcr_info_groupb01e8({}) 
    setcr_info_groupb01e8Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "creditor_info_label_text",
            "ben_checkbox",
            "cr_account",
            "cr_name",
            "cr_street_name",
            "cr_benif_action",
            "cr_building_name",
            "cr_floor",
            "cr_post_code",
            "cr_town_name",
            "cr_country",
            "cr_currency",
            "cr_currency",
            "cr_currency",
            "exchange_rate",
            "cr_amount",
            "cr_bank_code",
            "cr_bank_code",
            "cr_bank_code",
            "cr_clr_code",
      ]
      }) 
        setchrg_info_group76ab0({}) 
    setchrg_info_group76ab0Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "chrg_info_text_label",
            "charge_type",
            "charge_type",
            "charge_type",
            "charge_amount",
            "correspondent_charge",
            "bank_charge",
      ]
      }) 
        setadd_info_groupe8dc6({}) 
    setadd_info_groupe8dc6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "add_info_text_label",
            "payment_method",
            "payment_method",
            "payment_method",
            "instruction_priority",
            "instruction_priority",
            "instruction_priority",
            "category_purpose",
            "category_purpose",
            "category_purpose",
            "remittance_info",
            "intermediary_institution",
            "sender_receiver_info",
            "correspondent_bank",
      ]
      }) 
        setbeneficiary_list_group9d9c4({}) 
    setbeneficiary_list_group9d9c4Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "benificiary_text",
            "cr_name",
            "search_btn",
            "ben_divider",
            "confirm_divider",
            "clear_button",
            "confirm_button",
      ]
      }) 
        setben_list_groupb24ac({}) 
    setben_list_groupb24acProps({
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
        setbenc_groupa95a7({}) 
    setbenc_groupa95a7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cr_name",
            "icon",
            "cr_account",
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
            "processed_by_label",
            "trs_created_date",
            "processing_system",
            "currency_label",
            "amount_label",
            "dr_currency",
            "dr_amount",
            "debit_account_label",
            "process_status_label",
            "dr_account",
            "trs_process_status",
            "credit_account_label",
            "status_label",
            "cr_account",
            "trs_status",
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
        setreturnreasonmaingroup60037({}) 
    setreturnreasonmaingroup60037Props({
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
        setreturnreasonsubgroup63981({}) 
    setreturnreasonsubgroup63981Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason",
            "return_reason",
            "return_reason",
            "return_reason_code",
            "return_reason_code",
            "return_reason_code",
            "cr_currency",
            "cr_amount",
      ]
      }) 
        setreturndynamicactions87eb7({}) 
    setreturndynamicactions87eb7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_close",
            "return_reject",
            "return_approve",
            "return_save",
      ]
      }) 
        setapplyspecialratemaingroup6cd35({}) 
    setapplyspecialratemaingroup6cd35Props({
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
        setapplyspecialratesubgroupd7745({}) 
    setapplyspecialratesubgroupd7745Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dr_account",
            "dr_currency",
            "debit_exchange_rate",
            "ret_amount",
            "ret_currency",
            "exchange_rate",
            "calculated_ret_amount",
      ]
      }) 
        setapplyspecialratedynamicactions8ee48({}) 
    setapplyspecialratedynamicactions8ee48Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_close",
            "return_reject",
            "return_approve",
            "return_save",
      ]
      }) 
        setapplyspecialratemaingroupe0950({}) 
    setapplyspecialratemaingroupe0950Props({
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
        setapplyspecialratesubgroup2d2fd({}) 
    setapplyspecialratesubgroup2d2fdProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "dr_account",
            "dr_currency",
            "dr_amount",
            "cr_currency",
            "cr_amount",
            "exchange_rate",
            "revised_exchange_rate",
            "revised_debit_amount",
            "revised_credit_amount",
      ]
      }) 
        setapplyspecialratedynamicactionsc09cc({}) 
    setapplyspecialratedynamicactionsc09ccProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_close",
            "apply_special_rate_reject",
            "apply_special_rate_approve",
            "apply_special_rate_save",
      ]
      }) 
        setapplyspecialratemaingroup5736c({}) 
    setapplyspecialratemaingroup5736cProps({
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
        setapplyspecialratesubgroup36462({}) 
    setapplyspecialratesubgroup36462Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cr_account",
            "cr_currency",
            "cr_amount",
            "account_currency",
            "current_exchange_rate",
            "credit_amount",
            "revised_exchange_rate",
            "revised_credit_amount",
      ]
      }) 
        setapplyspecialratedynamicactionsd8714({}) 
    setapplyspecialratedynamicactionsd8714Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "apply_special_rate_process_close",
            "apply_special_rate_process_reject",
            "apply_special_rate_process_approve",
            "apply_special_rate_process_save",
      ]
      }) 
        setreturnreasonmaingroup382bc({}) 
    setreturnreasonmaingroup382bcProps({
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
        setreturnreasonsubgroupf68e5({}) 
    setreturnreasonsubgroupf68e5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "return_reason",
            "return_reason",
            "return_reason",
            "return_reason_code",
            "return_reason_code",
            "return_reason_code",
            "cr_currency",
            "cr_amount",
      ]
      }) 
        setreturndynamicactionsc7672({}) 
    setreturndynamicactionsc7672Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tech_return_approve",
            "tech_return_close",
            "tech_return_reject",
            "tech_return_save",
      ]
      }) 
        setenquirymaingroup8a315({}) 
    setenquirymaingroup8a315Props({
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
        setenquirysubgroup4c021({}) 
    setenquirysubgroup4c021Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "payment_type",
            "payment_type",
            "message_code",
            "message_code",
      ]
      }) 
        setdynamicactions13e5e({}) 
    setdynamicactions13e5eProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "enquiry_send",
      ]
      }) 
        settran_main_group9581a({}) 
    settran_main_group9581aProps({
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
        settran_tab_group2a929({}) 
    settran_tab_group2a929Props({
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
      ]
      }) 
        setview_all_tab9a177({}) 
    setview_all_tab9a177Props({
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
    
    setview_all_tableccb40([]) 
    setview_all_tableccb40Props({
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
        setview_all_journey_groupca47a({}) 
    setview_all_journey_groupca47aProps({
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
        setcancel_equest_camt055_tabf8dc6({}) 
    setcancel_equest_camt055_tabf8dc6Props({
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
    
    setcancel_request_camt055_table9e976([]) 
    setcancel_request_camt055_table9e976Props({
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
        setcancel_request_camt055_journey_groupd18a2({}) 
    setcancel_request_camt055_journey_groupd18a2Props({
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
        setinves_req_camt110_tab81869({}) 
    setinves_req_camt110_tab81869Props({
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
    
    setinves_req_camt110_tablefa00e([]) 
    setinves_req_camt110_tablefa00eProps({
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
        setinves_req_camt110_journey_groupca738({}) 
    setinves_req_camt110_journey_groupca738Props({
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
        setinvestigation_response_camt111_tabf6177({}) 
    setinvestigation_response_camt111_tabf6177Props({
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
    
    setinves_res_camt111_table0f401([]) 
    setinves_res_camt111_table0f401Props({
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
        setinves_res_camt111_journey_group785d4({}) 
    setinves_res_camt111_journey_group785d4Props({
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
        setmain_group746bf({}) 
    setmain_group746bfProps({
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
            "tran_date",
            "uuid",
            "dr_account",
            "dr_name",
            "cr_account",
            "cr_name",
            "cr_currency",
            "cr_amount",
            "message_code",
            "message_code",
            "bottom_divider",
            "search",
            "clear",
      ]
      }) 
        setcancelrequestcamt055maingroupbf232({}) 
    setcancelrequestcamt055maingroupbf232Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        setcancelrequestcamt055subgroup5ac44({}) 
    setcancelrequestcamt055subgroup5ac44Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "cancel_reason",
            "cancel_reason",
            "cancel_reason",
            "reason_description",
      ]
      }) 
        setcancelrequestcamt055dynamicactions2a75a({}) 
    setcancelrequestcamt055dynamicactions2a75aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancelrequestcamt055_close",
            "cancelrequestcamt055_reject",
            "cancelrequestcamt055_approve",
            "cancelrequestcamt055_save",
      ]
      }) 
        setinvestigationrequestcamt110maingroup7a2f5({}) 
    setinvestigationrequestcamt110maingroup7a2f5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        setinvestigationrequestcamt110subgroup276a5({}) 
    setinvestigationrequestcamt110subgroup276a5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "investigation_type",
            "investigation_type",
            "investigation_type",
            "investigation_reason",
            "investigation_reason",
            "investigation_reason",
            "reason_description",
      ]
      }) 
        setinvestigationrequestcamt110dynamicactionsbfdc2({}) 
    setinvestigationrequestcamt110dynamicactionsbfdc2Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invesreqcamt110_close",
            "invesreqcamt110_reject",
            "invesreqcamt110_approve",
            "invesreqcamt110_save",
      ]
      }) 
        setinvestigationresponsecamt111maingroup058ec({}) 
    setinvestigationresponsecamt111maingroup058ecProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        setinvestigationresponsecamt111subgroupafab5({}) 
    setinvestigationresponsecamt111subgroupafab5Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "tran_date",
            "message_code",
            "response_type",
            "response_reason",
            "reason_description",
      ]
      }) 
        setinvestigationresponsecamt111dynamicactionsceeed({}) 
    setinvestigationresponsecamt111dynamicactionsceeedProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "invesrescamt111_close",
            "invesrescamt111_reject",
            "invesrescamt111_approve",
            "invesrescamt111_save",
      ]
      }) 
        setacksimulatormaingroup3a007({}) 
    setacksimulatormaingroup3a007Props({
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
        setack_simulator_tab_group0778c({}) 
    setack_simulator_tab_group0778cProps({
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
        setop_financial_tab_headerc391f({}) 
    setop_financial_tab_headerc391fProps({
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
        setop_simulator_sub_group467ba({}) 
    setop_simulator_sub_group467baProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "productcode",
            "message_type",
            "message_type",
            "date",
            "uuid",
            "status",
            "status",
            "reject_reason",
            "reject_reason",
      ]
      }) 
        setcustomwidgetmaingroupcf43a({}) 
    setcustomwidgetmaingroupcf43aProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "customwidget",
      ]
      }) 
        setdynamicactionmaingroupd3a78({}) 
    setdynamicactionmaingroupd3a78Props({
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
        setdynamicactionsubgroupa58e6({}) 
    setdynamicactionsubgroupa58e6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_financial_submit_btn",
      ]
      }) 
        setip_financial_tab_header60896({}) 
    setip_financial_tab_header60896Props({
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
        setip_simulator_sub_groupa1dc8({}) 
    setip_simulator_sub_groupa1dc8Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_productcode",
            "ip_message_type",
            "ip_message_type",
            "ip_date",
            "amount",
      ]
      }) 
        setip_dynamicactionmaingroup2f849({}) 
    setip_dynamicactionmaingroup2f849Props({
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
        setip_dynamicactionsubgroup31c5b({}) 
    setip_dynamicactionsubgroup31c5bProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_financial_submit_btn",
      ]
      }) 
        setop_nf_camt110_tab_header4fa71({}) 
    setop_nf_camt110_tab_header4fa71Props({
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
        setop_camt110_simulator_sub_group6f9ed({}) 
    setop_camt110_simulator_sub_group6f9edProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_110_productcode",
            "op_110_message_type",
            "op_110_date",
            "op_110_uuid",
            "op_110_request_type",
            "op_110_request_type",
            "op_110_request_reason",
            "op_110_request_reason",
      ]
      }) 
        setop_110_dynamicactionmaingroup4acc0({}) 
    setop_110_dynamicactionmaingroup4acc0Props({
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
        setop_110_dynamicactionsubgroup56a89({}) 
    setop_110_dynamicactionsubgroup56a89Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_110_submit_btn",
      ]
      }) 
        setop_nf_camt111_tab_header05ca0({}) 
    setop_nf_camt111_tab_header05ca0Props({
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
        setop_camt111_simulator_sub_group120d6({}) 
    setop_camt111_simulator_sub_group120d6Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_111_productcode",
            "op_111_message_type",
            "op_111_date",
            "op_111_uuid",
            "op_111_response_status",
            "op_111_response_status",
            "op_111_response_reason",
            "op_111_response_reason",
      ]
      }) 
        setop_111_dynamicactionmaingroupe4308({}) 
    setop_111_dynamicactionmaingroupe4308Props({
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
        setop_111_dynamicactionsubgroup73de7({}) 
    setop_111_dynamicactionsubgroup73de7Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "op_111_submit_btn",
      ]
      }) 
        setip_nf_camt055_tab_header06c62({}) 
    setip_nf_camt055_tab_header06c62Props({
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
        setip_camt055_simulator_sub_group52216({}) 
    setip_camt055_simulator_sub_group52216Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_055_productcode",
            "ip_055_message_type",
            "ip_055_date",
            "ip_055_uuid",
            "ip_055_reason_code",
            "ip_055_reason_code",
            "ip_055_additional_info",
      ]
      }) 
        setip_055_dynamicactionmaingroup84550({}) 
    setip_055_dynamicactionmaingroup84550Props({
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
        setip_055_dynamicactionsubgroup2ae9c({}) 
    setip_055_dynamicactionsubgroup2ae9cProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "ip_055_submit_btn",
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
            "channel_combobox",
            "channel_combobox",
            "currency_combobox",
            "currency_combobox",
            "process_category_combobox",
            "process_category_combobox",
            "offline_online_combobox",
            "offline_online_combobox",
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
            "total_percentage",
      ]
      }) 
        setline_chart_group61ee8({}) 
    setline_chart_group61ee8Props({
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
        return_queue_journey_group92c55, 
        setreturn_queue_journey_group92c55,
        return_queue_journey_group92c55Props, 
        setreturn_queue_journey_group92c55Props,
        return_queue_table267f0, 
        setreturn_queue_table267f0,
        return_queue_table267f0Props, 
        setreturn_queue_table267f0Props,
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
        notification_pending_tab223c7, 
        setnotification_pending_tab223c7,
        notification_pending_tab223c7Props, 
        setnotification_pending_tab223c7Props,
        notification_pending_table45836, 
        setnotification_pending_table45836,
        notification_pending_table45836Props, 
        setnotification_pending_table45836Props,
        notification_pending_journey_groupc9534, 
        setnotification_pending_journey_groupc9534,
        notification_pending_journey_groupc9534Props, 
        setnotification_pending_journey_groupc9534Props,
        enquiry_tabfb252, 
        setenquiry_tabfb252,
        enquiry_tabfb252Props, 
        setenquiry_tabfb252Props,
        enquiry_tableb3b4e, 
        setenquiry_tableb3b4e,
        enquiry_tableb3b4eProps, 
        setenquiry_tableb3b4eProps,
        enquiry_journey_group047c9, 
        setenquiry_journey_group047c9,
        enquiry_journey_group047c9Props, 
        setenquiry_journey_group047c9Props,
        group7e695, 
        setgroup7e695,
        group7e695Props, 
        setgroup7e695Props,
        main_group9066f, 
        setmain_group9066f,
        main_group9066fProps, 
        setmain_group9066fProps,
        payment_info_group1bac9, 
        setpayment_info_group1bac9,
        payment_info_group1bac9Props, 
        setpayment_info_group1bac9Props,
        midynamicactions3b39d, 
        setmidynamicactions3b39d,
        midynamicactions3b39dProps, 
        setmidynamicactions3b39dProps,
        general_info_groupc83e6, 
        setgeneral_info_groupc83e6,
        general_info_groupc83e6Props, 
        setgeneral_info_groupc83e6Props,
        dbtr_info_group4e8ea, 
        setdbtr_info_group4e8ea,
        dbtr_info_group4e8eaProps, 
        setdbtr_info_group4e8eaProps,
        cr_info_groupb01e8, 
        setcr_info_groupb01e8,
        cr_info_groupb01e8Props, 
        setcr_info_groupb01e8Props,
        chrg_info_group76ab0, 
        setchrg_info_group76ab0,
        chrg_info_group76ab0Props, 
        setchrg_info_group76ab0Props,
        add_info_groupe8dc6, 
        setadd_info_groupe8dc6,
        add_info_groupe8dc6Props, 
        setadd_info_groupe8dc6Props,
        beneficiary_list_group9d9c4, 
        setbeneficiary_list_group9d9c4,
        beneficiary_list_group9d9c4Props, 
        setbeneficiary_list_group9d9c4Props,
        ben_list_groupb24ac, 
        setben_list_groupb24ac,
        ben_list_groupb24acProps, 
        setben_list_groupb24acProps,
        benc_groupa95a7, 
        setbenc_groupa95a7,
        benc_groupa95a7Props, 
        setbenc_groupa95a7Props,
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
        returnreasonmaingroup60037, 
        setreturnreasonmaingroup60037,
        returnreasonmaingroup60037Props, 
        setreturnreasonmaingroup60037Props,
        returnreasonsubgroup63981, 
        setreturnreasonsubgroup63981,
        returnreasonsubgroup63981Props, 
        setreturnreasonsubgroup63981Props,
        returndynamicactions87eb7, 
        setreturndynamicactions87eb7,
        returndynamicactions87eb7Props, 
        setreturndynamicactions87eb7Props,
        applyspecialratemaingroup6cd35, 
        setapplyspecialratemaingroup6cd35,
        applyspecialratemaingroup6cd35Props, 
        setapplyspecialratemaingroup6cd35Props,
        applyspecialratesubgroupd7745, 
        setapplyspecialratesubgroupd7745,
        applyspecialratesubgroupd7745Props, 
        setapplyspecialratesubgroupd7745Props,
        applyspecialratedynamicactions8ee48, 
        setapplyspecialratedynamicactions8ee48,
        applyspecialratedynamicactions8ee48Props, 
        setapplyspecialratedynamicactions8ee48Props,
        applyspecialratemaingroupe0950, 
        setapplyspecialratemaingroupe0950,
        applyspecialratemaingroupe0950Props, 
        setapplyspecialratemaingroupe0950Props,
        applyspecialratesubgroup2d2fd, 
        setapplyspecialratesubgroup2d2fd,
        applyspecialratesubgroup2d2fdProps, 
        setapplyspecialratesubgroup2d2fdProps,
        applyspecialratedynamicactionsc09cc, 
        setapplyspecialratedynamicactionsc09cc,
        applyspecialratedynamicactionsc09ccProps, 
        setapplyspecialratedynamicactionsc09ccProps,
        applyspecialratemaingroup5736c, 
        setapplyspecialratemaingroup5736c,
        applyspecialratemaingroup5736cProps, 
        setapplyspecialratemaingroup5736cProps,
        applyspecialratesubgroup36462, 
        setapplyspecialratesubgroup36462,
        applyspecialratesubgroup36462Props, 
        setapplyspecialratesubgroup36462Props,
        applyspecialratedynamicactionsd8714, 
        setapplyspecialratedynamicactionsd8714,
        applyspecialratedynamicactionsd8714Props, 
        setapplyspecialratedynamicactionsd8714Props,
        returnreasonmaingroup382bc, 
        setreturnreasonmaingroup382bc,
        returnreasonmaingroup382bcProps, 
        setreturnreasonmaingroup382bcProps,
        returnreasonsubgroupf68e5, 
        setreturnreasonsubgroupf68e5,
        returnreasonsubgroupf68e5Props, 
        setreturnreasonsubgroupf68e5Props,
        returndynamicactionsc7672, 
        setreturndynamicactionsc7672,
        returndynamicactionsc7672Props, 
        setreturndynamicactionsc7672Props,
        enquirymaingroup8a315, 
        setenquirymaingroup8a315,
        enquirymaingroup8a315Props, 
        setenquirymaingroup8a315Props,
        enquirysubgroup4c021, 
        setenquirysubgroup4c021,
        enquirysubgroup4c021Props, 
        setenquirysubgroup4c021Props,
        dynamicactions13e5e, 
        setdynamicactions13e5e,
        dynamicactions13e5eProps, 
        setdynamicactions13e5eProps,
        tran_main_group9581a, 
        settran_main_group9581a,
        tran_main_group9581aProps, 
        settran_main_group9581aProps,
        tran_tab_group2a929, 
        settran_tab_group2a929,
        tran_tab_group2a929Props, 
        settran_tab_group2a929Props,
        view_all_tab9a177, 
        setview_all_tab9a177,
        view_all_tab9a177Props, 
        setview_all_tab9a177Props,
        view_all_tableccb40, 
        setview_all_tableccb40,
        view_all_tableccb40Props, 
        setview_all_tableccb40Props,
        view_all_journey_groupca47a, 
        setview_all_journey_groupca47a,
        view_all_journey_groupca47aProps, 
        setview_all_journey_groupca47aProps,
        cancel_equest_camt055_tabf8dc6, 
        setcancel_equest_camt055_tabf8dc6,
        cancel_equest_camt055_tabf8dc6Props, 
        setcancel_equest_camt055_tabf8dc6Props,
        cancel_request_camt055_table9e976, 
        setcancel_request_camt055_table9e976,
        cancel_request_camt055_table9e976Props, 
        setcancel_request_camt055_table9e976Props,
        cancel_request_camt055_journey_groupd18a2, 
        setcancel_request_camt055_journey_groupd18a2,
        cancel_request_camt055_journey_groupd18a2Props, 
        setcancel_request_camt055_journey_groupd18a2Props,
        inves_req_camt110_tab81869, 
        setinves_req_camt110_tab81869,
        inves_req_camt110_tab81869Props, 
        setinves_req_camt110_tab81869Props,
        inves_req_camt110_tablefa00e, 
        setinves_req_camt110_tablefa00e,
        inves_req_camt110_tablefa00eProps, 
        setinves_req_camt110_tablefa00eProps,
        inves_req_camt110_journey_groupca738, 
        setinves_req_camt110_journey_groupca738,
        inves_req_camt110_journey_groupca738Props, 
        setinves_req_camt110_journey_groupca738Props,
        investigation_response_camt111_tabf6177, 
        setinvestigation_response_camt111_tabf6177,
        investigation_response_camt111_tabf6177Props, 
        setinvestigation_response_camt111_tabf6177Props,
        inves_res_camt111_table0f401, 
        setinves_res_camt111_table0f401,
        inves_res_camt111_table0f401Props, 
        setinves_res_camt111_table0f401Props,
        inves_res_camt111_journey_group785d4, 
        setinves_res_camt111_journey_group785d4,
        inves_res_camt111_journey_group785d4Props, 
        setinves_res_camt111_journey_group785d4Props,
        main_group746bf, 
        setmain_group746bf,
        main_group746bfProps, 
        setmain_group746bfProps,
        cancelrequestcamt055maingroupbf232, 
        setcancelrequestcamt055maingroupbf232,
        cancelrequestcamt055maingroupbf232Props, 
        setcancelrequestcamt055maingroupbf232Props,
        cancelrequestcamt055subgroup5ac44, 
        setcancelrequestcamt055subgroup5ac44,
        cancelrequestcamt055subgroup5ac44Props, 
        setcancelrequestcamt055subgroup5ac44Props,
        cancelrequestcamt055dynamicactions2a75a, 
        setcancelrequestcamt055dynamicactions2a75a,
        cancelrequestcamt055dynamicactions2a75aProps, 
        setcancelrequestcamt055dynamicactions2a75aProps,
        investigationrequestcamt110maingroup7a2f5, 
        setinvestigationrequestcamt110maingroup7a2f5,
        investigationrequestcamt110maingroup7a2f5Props, 
        setinvestigationrequestcamt110maingroup7a2f5Props,
        investigationrequestcamt110subgroup276a5, 
        setinvestigationrequestcamt110subgroup276a5,
        investigationrequestcamt110subgroup276a5Props, 
        setinvestigationrequestcamt110subgroup276a5Props,
        investigationrequestcamt110dynamicactionsbfdc2, 
        setinvestigationrequestcamt110dynamicactionsbfdc2,
        investigationrequestcamt110dynamicactionsbfdc2Props, 
        setinvestigationrequestcamt110dynamicactionsbfdc2Props,
        investigationresponsecamt111maingroup058ec, 
        setinvestigationresponsecamt111maingroup058ec,
        investigationresponsecamt111maingroup058ecProps, 
        setinvestigationresponsecamt111maingroup058ecProps,
        investigationresponsecamt111subgroupafab5, 
        setinvestigationresponsecamt111subgroupafab5,
        investigationresponsecamt111subgroupafab5Props, 
        setinvestigationresponsecamt111subgroupafab5Props,
        investigationresponsecamt111dynamicactionsceeed, 
        setinvestigationresponsecamt111dynamicactionsceeed,
        investigationresponsecamt111dynamicactionsceeedProps, 
        setinvestigationresponsecamt111dynamicactionsceeedProps,
        acksimulatormaingroup3a007, 
        setacksimulatormaingroup3a007,
        acksimulatormaingroup3a007Props, 
        setacksimulatormaingroup3a007Props,
        ack_simulator_tab_group0778c, 
        setack_simulator_tab_group0778c,
        ack_simulator_tab_group0778cProps, 
        setack_simulator_tab_group0778cProps,
        op_financial_tab_headerc391f, 
        setop_financial_tab_headerc391f,
        op_financial_tab_headerc391fProps, 
        setop_financial_tab_headerc391fProps,
        op_simulator_sub_group467ba, 
        setop_simulator_sub_group467ba,
        op_simulator_sub_group467baProps, 
        setop_simulator_sub_group467baProps,
        customwidgetmaingroupcf43a, 
        setcustomwidgetmaingroupcf43a,
        customwidgetmaingroupcf43aProps, 
        setcustomwidgetmaingroupcf43aProps,
        dynamicactionmaingroupd3a78, 
        setdynamicactionmaingroupd3a78,
        dynamicactionmaingroupd3a78Props, 
        setdynamicactionmaingroupd3a78Props,
        dynamicactionsubgroupa58e6, 
        setdynamicactionsubgroupa58e6,
        dynamicactionsubgroupa58e6Props, 
        setdynamicactionsubgroupa58e6Props,
        ip_financial_tab_header60896, 
        setip_financial_tab_header60896,
        ip_financial_tab_header60896Props, 
        setip_financial_tab_header60896Props,
        ip_simulator_sub_groupa1dc8, 
        setip_simulator_sub_groupa1dc8,
        ip_simulator_sub_groupa1dc8Props, 
        setip_simulator_sub_groupa1dc8Props,
        ip_dynamicactionmaingroup2f849, 
        setip_dynamicactionmaingroup2f849,
        ip_dynamicactionmaingroup2f849Props, 
        setip_dynamicactionmaingroup2f849Props,
        ip_dynamicactionsubgroup31c5b, 
        setip_dynamicactionsubgroup31c5b,
        ip_dynamicactionsubgroup31c5bProps, 
        setip_dynamicactionsubgroup31c5bProps,
        op_nf_camt110_tab_header4fa71, 
        setop_nf_camt110_tab_header4fa71,
        op_nf_camt110_tab_header4fa71Props, 
        setop_nf_camt110_tab_header4fa71Props,
        op_camt110_simulator_sub_group6f9ed, 
        setop_camt110_simulator_sub_group6f9ed,
        op_camt110_simulator_sub_group6f9edProps, 
        setop_camt110_simulator_sub_group6f9edProps,
        op_110_dynamicactionmaingroup4acc0, 
        setop_110_dynamicactionmaingroup4acc0,
        op_110_dynamicactionmaingroup4acc0Props, 
        setop_110_dynamicactionmaingroup4acc0Props,
        op_110_dynamicactionsubgroup56a89, 
        setop_110_dynamicactionsubgroup56a89,
        op_110_dynamicactionsubgroup56a89Props, 
        setop_110_dynamicactionsubgroup56a89Props,
        op_nf_camt111_tab_header05ca0, 
        setop_nf_camt111_tab_header05ca0,
        op_nf_camt111_tab_header05ca0Props, 
        setop_nf_camt111_tab_header05ca0Props,
        op_camt111_simulator_sub_group120d6, 
        setop_camt111_simulator_sub_group120d6,
        op_camt111_simulator_sub_group120d6Props, 
        setop_camt111_simulator_sub_group120d6Props,
        op_111_dynamicactionmaingroupe4308, 
        setop_111_dynamicactionmaingroupe4308,
        op_111_dynamicactionmaingroupe4308Props, 
        setop_111_dynamicactionmaingroupe4308Props,
        op_111_dynamicactionsubgroup73de7, 
        setop_111_dynamicactionsubgroup73de7,
        op_111_dynamicactionsubgroup73de7Props, 
        setop_111_dynamicactionsubgroup73de7Props,
        ip_nf_camt055_tab_header06c62, 
        setip_nf_camt055_tab_header06c62,
        ip_nf_camt055_tab_header06c62Props, 
        setip_nf_camt055_tab_header06c62Props,
        ip_camt055_simulator_sub_group52216, 
        setip_camt055_simulator_sub_group52216,
        ip_camt055_simulator_sub_group52216Props, 
        setip_camt055_simulator_sub_group52216Props,
        ip_055_dynamicactionmaingroup84550, 
        setip_055_dynamicactionmaingroup84550,
        ip_055_dynamicactionmaingroup84550Props, 
        setip_055_dynamicactionmaingroup84550Props,
        ip_055_dynamicactionsubgroup2ae9c, 
        setip_055_dynamicactionsubgroup2ae9c,
        ip_055_dynamicactionsubgroup2ae9cProps, 
        setip_055_dynamicactionsubgroup2ae9cProps,
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
        line_chart_group61ee8, 
        setline_chart_group61ee8,
        line_chart_group61ee8Props, 
        setline_chart_group61ee8Props,
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
        advance_searcheb531,
        setadvance_searcheb531, 
        advance_searcheb531Props,
        setadvance_searcheb531Props,
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
        dr_amount_view_alls88d6b,
        setdr_amount_view_alls88d6b, 
        dr_amount_view_alls88d6bProps,
        setdr_amount_view_alls88d6bProps,
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
        uuid_view_alldb6f0,
        setuuid_view_alldb6f0, 
        uuid_view_alldb6f0Props,
        setuuid_view_alldb6f0Props,
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
        uuid_failure_queuea9c80,
        setuuid_failure_queuea9c80, 
        uuid_failure_queuea9c80Props,
        setuuid_failure_queuea9c80Props,
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
        dr_currency_success_queue10a49,
        setdr_currency_success_queue10a49, 
        dr_currency_success_queue10a49Props,
        setdr_currency_success_queue10a49Props,
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
        uuid_success_queue87fbe,
        setuuid_success_queue87fbe, 
        uuid_success_queue87fbeProps,
        setuuid_success_queue87fbeProps,
        success_queue_journey68ac9,
        setsuccess_queue_journey68ac9, 
        success_queue_journey68ac9Props,
        setsuccess_queue_journey68ac9Props,
        return_queue_journeycc9d3,
        setreturn_queue_journeycc9d3, 
        return_queue_journeycc9d3Props,
        setreturn_queue_journeycc9d3Props,
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
        uuid_return_queue2f467,
        setuuid_return_queue2f467, 
        uuid_return_queue2f467Props,
        setuuid_return_queue2f467Props,
        value_date_operational_pending6ecd4,
        setvalue_date_operational_pending6ecd4, 
        value_date_operational_pending6ecd4Props,
        setvalue_date_operational_pending6ecd4Props,
        dr_account_operational_pending2ab87,
        setdr_account_operational_pending2ab87, 
        dr_account_operational_pending2ab87Props,
        setdr_account_operational_pending2ab87Props,
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
        new_payment_chk_verify_btn3918d,
        setnew_payment_chk_verify_btn3918d, 
        new_payment_chk_verify_btn3918dProps,
        setnew_payment_chk_verify_btn3918dProps,
        opr_pending_chk_authorize_btne1fa7,
        setopr_pending_chk_authorize_btne1fa7, 
        opr_pending_chk_authorize_btne1fa7Props,
        setopr_pending_chk_authorize_btne1fa7Props,
        opr_pending_chk_approve_btn33fe9,
        setopr_pending_chk_approve_btn33fe9, 
        opr_pending_chk_approve_btn33fe9Props,
        setopr_pending_chk_approve_btn33fe9Props,
        opr_pending_chk_reject_btn18529,
        setopr_pending_chk_reject_btn18529, 
        opr_pending_chk_reject_btn18529Props,
        setopr_pending_chk_reject_btn18529Props,
        opr_pending_mk_already_posted_btn4eb90,
        setopr_pending_mk_already_posted_btn4eb90, 
        opr_pending_mk_already_posted_btn4eb90Props,
        setopr_pending_mk_already_posted_btn4eb90Props,
        opr_pending_mk_retry_btn4af05,
        setopr_pending_mk_retry_btn4af05, 
        opr_pending_mk_retry_btn4af05Props,
        setopr_pending_mk_retry_btn4af05Props,
        opr_pending_mk_reject_btnb2c93,
        setopr_pending_mk_reject_btnb2c93, 
        opr_pending_mk_reject_btnb2c93Props,
        setopr_pending_mk_reject_btnb2c93Props,
        opr_pending_mk_repost_btn4506c,
        setopr_pending_mk_repost_btn4506c, 
        opr_pending_mk_repost_btn4506cProps,
        setopr_pending_mk_repost_btn4506cProps,
        opr_pending_mk_push_next_step_btn631df,
        setopr_pending_mk_push_next_step_btn631df, 
        opr_pending_mk_push_next_step_btn631dfProps,
        setopr_pending_mk_push_next_step_btn631dfProps,
        opr_pending_mk_reverse_btndab56,
        setopr_pending_mk_reverse_btndab56, 
        opr_pending_mk_reverse_btndab56Props,
        setopr_pending_mk_reverse_btndab56Props,
        opr_pending_mk_ip_return_btnb715b,
        setopr_pending_mk_ip_return_btnb715b, 
        opr_pending_mk_ip_return_btnb715bProps,
        setopr_pending_mk_ip_return_btnb715bProps,
        opr_pending_mk_repair_btnc91a5,
        setopr_pending_mk_repair_btnc91a5, 
        opr_pending_mk_repair_btnc91a5Props,
        setopr_pending_mk_repair_btnc91a5Props,
        opr_pending_chk_ip_verify_return_btnb8342,
        setopr_pending_chk_ip_verify_return_btnb8342, 
        opr_pending_chk_ip_verify_return_btnb8342Props,
        setopr_pending_chk_ip_verify_return_btnb8342Props,
        opr_pending_mk_op_return_btn311fd,
        setopr_pending_mk_op_return_btn311fd, 
        opr_pending_mk_op_return_btn311fdProps,
        setopr_pending_mk_op_return_btn311fdProps,
        opr_pending_chk_op_return_verify_btne3f5b,
        setopr_pending_chk_op_return_verify_btne3f5b, 
        opr_pending_chk_op_return_verify_btne3f5bProps,
        setopr_pending_chk_op_return_verify_btne3f5bProps,
        opr_pending_mk_force_pass_btnc0708,
        setopr_pending_mk_force_pass_btnc0708, 
        opr_pending_mk_force_pass_btnc0708Props,
        setopr_pending_mk_force_pass_btnc0708Props,
        opr_pending_op_mk_applysplrate_btn52343,
        setopr_pending_op_mk_applysplrate_btn52343, 
        opr_pending_op_mk_applysplrate_btn52343Props,
        setopr_pending_op_mk_applysplrate_btn52343Props,
        opr_pending_ip_mkr_applysplrate_btna62ff,
        setopr_pending_ip_mkr_applysplrate_btna62ff, 
        opr_pending_ip_mkr_applysplrate_btna62ffProps,
        setopr_pending_ip_mkr_applysplrate_btna62ffProps,
        uuid_operational_pendinga5f0a,
        setuuid_operational_pendinga5f0a, 
        uuid_operational_pendinga5f0aProps,
        setuuid_operational_pendinga5f0aProps,
        opr_pending_chk_op_appl_spl_rate_verfiy592a5,
        setopr_pending_chk_op_appl_spl_rate_verfiy592a5, 
        opr_pending_chk_op_appl_spl_rate_verfiy592a5Props,
        setopr_pending_chk_op_appl_spl_rate_verfiy592a5Props,
        opr_pending_chk_ip_appl_spl_rate_verfiyca082,
        setopr_pending_chk_ip_appl_spl_rate_verfiyca082, 
        opr_pending_chk_ip_appl_spl_rate_verfiyca082Props,
        setopr_pending_chk_ip_appl_spl_rate_verfiyca082Props,
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
        uuid_technical_pendingb820e,
        setuuid_technical_pendingb820e, 
        uuid_technical_pendingb820eProps,
        setuuid_technical_pendingb820eProps,
        tech_pending_mk_reject_btn432a8,
        settech_pending_mk_reject_btn432a8, 
        tech_pending_mk_reject_btn432a8Props,
        settech_pending_mk_reject_btn432a8Props,
        tech_pending_mk_retry_btn5f5cf,
        settech_pending_mk_retry_btn5f5cf, 
        tech_pending_mk_retry_btn5f5cfProps,
        settech_pending_mk_retry_btn5f5cfProps,
        tech_pending_chk_approve_btnc932b,
        settech_pending_chk_approve_btnc932b, 
        tech_pending_chk_approve_btnc932bProps,
        settech_pending_chk_approve_btnc932bProps,
        tech_pending_chk_reject_btn2ef0c,
        settech_pending_chk_reject_btn2ef0c, 
        tech_pending_chk_reject_btn2ef0cProps,
        settech_pending_chk_reject_btn2ef0cProps,
        tech_pending_mk_ip_return_btn3d651,
        settech_pending_mk_ip_return_btn3d651, 
        tech_pending_mk_ip_return_btn3d651Props,
        settech_pending_mk_ip_return_btn3d651Props,
        tech_pending_chk_ip_verify_return_btn54b4c,
        settech_pending_chk_ip_verify_return_btn54b4c, 
        tech_pending_chk_ip_verify_return_btn54b4cProps,
        settech_pending_chk_ip_verify_return_btn54b4cProps,
        technical_pending_journey6601c,
        settechnical_pending_journey6601c, 
        technical_pending_journey6601cProps,
        settechnical_pending_journey6601cProps,
        value_date_notification_pendinga37ed,
        setvalue_date_notification_pendinga37ed, 
        value_date_notification_pendinga37edProps,
        setvalue_date_notification_pendinga37edProps,
        dr_account_notification_pendinge066b,
        setdr_account_notification_pendinge066b, 
        dr_account_notification_pendinge066bProps,
        setdr_account_notification_pendinge066bProps,
        dr_name_notification_pending23ac6,
        setdr_name_notification_pending23ac6, 
        dr_name_notification_pending23ac6Props,
        setdr_name_notification_pending23ac6Props,
        dr_currency_notification_pendingeabf3,
        setdr_currency_notification_pendingeabf3, 
        dr_currency_notification_pendingeabf3Props,
        setdr_currency_notification_pendingeabf3Props,
        dr_amount_notification_pendingd808b,
        setdr_amount_notification_pendingd808b, 
        dr_amount_notification_pendingd808bProps,
        setdr_amount_notification_pendingd808bProps,
        cr_account_notification_pending7feb9,
        setcr_account_notification_pending7feb9, 
        cr_account_notification_pending7feb9Props,
        setcr_account_notification_pending7feb9Props,
        cr_name_notification_pendingfcab8,
        setcr_name_notification_pendingfcab8, 
        cr_name_notification_pendingfcab8Props,
        setcr_name_notification_pendingfcab8Props,
        cr_currency_notification_pending587a1,
        setcr_currency_notification_pending587a1, 
        cr_currency_notification_pending587a1Props,
        setcr_currency_notification_pending587a1Props,
        cr_amount_notification_pendingde11a,
        setcr_amount_notification_pendingde11a, 
        cr_amount_notification_pendingde11aProps,
        setcr_amount_notification_pendingde11aProps,
        uuid_notification_pending2ba49,
        setuuid_notification_pending2ba49, 
        uuid_notification_pending2ba49Props,
        setuuid_notification_pending2ba49Props,
        non_pending_mk_retry_btnf5b0b,
        setnon_pending_mk_retry_btnf5b0b, 
        non_pending_mk_retry_btnf5b0bProps,
        setnon_pending_mk_retry_btnf5b0bProps,
        non_pending_chk_approve_btnb3cbf,
        setnon_pending_chk_approve_btnb3cbf, 
        non_pending_chk_approve_btnb3cbfProps,
        setnon_pending_chk_approve_btnb3cbfProps,
        non_pending_chk_reject_btn16cba,
        setnon_pending_chk_reject_btn16cba, 
        non_pending_chk_reject_btn16cbaProps,
        setnon_pending_chk_reject_btn16cbaProps,
        notification_pending_journey32a13,
        setnotification_pending_journey32a13, 
        notification_pending_journey32a13Props,
        setnotification_pending_journey32a13Props,
        value_date_enquiryccb63,
        setvalue_date_enquiryccb63, 
        value_date_enquiryccb63Props,
        setvalue_date_enquiryccb63Props,
        dr_account_enquiry51592,
        setdr_account_enquiry51592, 
        dr_account_enquiry51592Props,
        setdr_account_enquiry51592Props,
        dr_name_enquiry1f341,
        setdr_name_enquiry1f341, 
        dr_name_enquiry1f341Props,
        setdr_name_enquiry1f341Props,
        dr_currency_enquiry529c9,
        setdr_currency_enquiry529c9, 
        dr_currency_enquiry529c9Props,
        setdr_currency_enquiry529c9Props,
        dr_amount_enquiryf15a6,
        setdr_amount_enquiryf15a6, 
        dr_amount_enquiryf15a6Props,
        setdr_amount_enquiryf15a6Props,
        cr_account_enquiry8fc22,
        setcr_account_enquiry8fc22, 
        cr_account_enquiry8fc22Props,
        setcr_account_enquiry8fc22Props,
        cr_name_enquiry89e7c,
        setcr_name_enquiry89e7c, 
        cr_name_enquiry89e7cProps,
        setcr_name_enquiry89e7cProps,
        cr_currency_enquiryaba9a,
        setcr_currency_enquiryaba9a, 
        cr_currency_enquiryaba9aProps,
        setcr_currency_enquiryaba9aProps,
        cr_amount_enquiry6d821,
        setcr_amount_enquiry6d821, 
        cr_amount_enquiry6d821Props,
        setcr_amount_enquiry6d821Props,
        uuid_enquiryc00eb,
        setuuid_enquiryc00eb, 
        uuid_enquiryc00ebProps,
        setuuid_enquiryc00ebProps,
        enquiry_mk_btnd1038,
        setenquiry_mk_btnd1038, 
        enquiry_mk_btnd1038Props,
        setenquiry_mk_btnd1038Props,
        enquiry_journey9d5ba,
        setenquiry_journey9d5ba, 
        enquiry_journey9d5baProps,
        setenquiry_journey9d5baProps,
        advancesearch50825,
        setadvancesearch50825, 
        advancesearch50825Props,
        setadvancesearch50825Props,
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
        channel95601,
        setchannel95601, 
        channel95601Props,
        setchannel95601Props,
        processstatus28eca,
        setprocessstatus28eca, 
        processstatus28ecaProps,
        setprocessstatus28ecaProps,
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
        payment_info_text_label47b13,
        setpayment_info_text_label47b13, 
        payment_info_text_label47b13Props,
        setpayment_info_text_label47b13Props,
        repair_new_payment_mk_save_btnbd6df,
        setrepair_new_payment_mk_save_btnbd6df, 
        repair_new_payment_mk_save_btnbd6dfProps,
        setrepair_new_payment_mk_save_btnbd6dfProps,
        cancel242e6,
        setcancel242e6, 
        cancel242e6Props,
        setcancel242e6Props,
        new_payment_chk_reject_btnb2949,
        setnew_payment_chk_reject_btnb2949, 
        new_payment_chk_reject_btnb2949Props,
        setnew_payment_chk_reject_btnb2949Props,
        new_payment_chk_approve_btncb94c,
        setnew_payment_chk_approve_btncb94c, 
        new_payment_chk_approve_btncb94cProps,
        setnew_payment_chk_approve_btncb94cProps,
        save62f33,
        setsave62f33, 
        save62f33Props,
        setsave62f33Props,
        general_info_text_label92c1e,
        setgeneral_info_text_label92c1e, 
        general_info_text_label92c1eProps,
        setgeneral_info_text_label92c1eProps,
        value_date45767,
        setvalue_date45767, 
        value_date45767Props,
        setvalue_date45767Props,
        service_level75e42,
        setservice_level75e42, 
        service_level75e42Props,
        setservice_level75e42Props,
        purpose75771,
        setpurpose75771, 
        purpose75771Props,
        setpurpose75771Props,
        dbtr_info_text_label1015f,
        setdbtr_info_text_label1015f, 
        dbtr_info_text_label1015fProps,
        setdbtr_info_text_label1015fProps,
        dr_accounta8f91,
        setdr_accounta8f91, 
        dr_accounta8f91Props,
        setdr_accounta8f91Props,
        dr_namef1c15,
        setdr_namef1c15, 
        dr_namef1c15Props,
        setdr_namef1c15Props,
        dr_currency45f51,
        setdr_currency45f51, 
        dr_currency45f51Props,
        setdr_currency45f51Props,
        dr_account_balancea2246,
        setdr_account_balancea2246, 
        dr_account_balancea2246Props,
        setdr_account_balancea2246Props,
        dr_ibanbaa1f,
        setdr_ibanbaa1f, 
        dr_ibanbaa1fProps,
        setdr_ibanbaa1fProps,
        dr_street_name149b0,
        setdr_street_name149b0, 
        dr_street_name149b0Props,
        setdr_street_name149b0Props,
        dr_building_numberba75a,
        setdr_building_numberba75a, 
        dr_building_numberba75aProps,
        setdr_building_numberba75aProps,
        dr_pstl_code5ec76,
        setdr_pstl_code5ec76, 
        dr_pstl_code5ec76Props,
        setdr_pstl_code5ec76Props,
        dr_town_name19970,
        setdr_town_name19970, 
        dr_town_name19970Props,
        setdr_town_name19970Props,
        dr_countrydd685,
        setdr_countrydd685, 
        dr_countrydd685Props,
        setdr_countrydd685Props,
        dr_bank_codeffb62,
        setdr_bank_codeffb62, 
        dr_bank_codeffb62Props,
        setdr_bank_codeffb62Props,
        amount_input_typecd6ed,
        setamount_input_typecd6ed, 
        amount_input_typecd6edProps,
        setamount_input_typecd6edProps,
        dr_amount178b9,
        setdr_amount178b9, 
        dr_amount178b9Props,
        setdr_amount178b9Props,
        settlement_amount32b14,
        setsettlement_amount32b14, 
        settlement_amount32b14Props,
        setsettlement_amount32b14Props,
        creditor_info_label_text02833,
        setcreditor_info_label_text02833, 
        creditor_info_label_text02833Props,
        setcreditor_info_label_text02833Props,
        ben_checkbox780b4,
        setben_checkbox780b4, 
        ben_checkbox780b4Props,
        setben_checkbox780b4Props,
        cr_account3b649,
        setcr_account3b649, 
        cr_account3b649Props,
        setcr_account3b649Props,
        cr_namee0835,
        setcr_namee0835, 
        cr_namee0835Props,
        setcr_namee0835Props,
        cr_street_name21bab,
        setcr_street_name21bab, 
        cr_street_name21babProps,
        setcr_street_name21babProps,
        cr_benif_action9998d,
        setcr_benif_action9998d, 
        cr_benif_action9998dProps,
        setcr_benif_action9998dProps,
        cr_building_namea6ac7,
        setcr_building_namea6ac7, 
        cr_building_namea6ac7Props,
        setcr_building_namea6ac7Props,
        cr_floor44bed,
        setcr_floor44bed, 
        cr_floor44bedProps,
        setcr_floor44bedProps,
        cr_post_codef645b,
        setcr_post_codef645b, 
        cr_post_codef645bProps,
        setcr_post_codef645bProps,
        cr_town_nameed852,
        setcr_town_nameed852, 
        cr_town_nameed852Props,
        setcr_town_nameed852Props,
        cr_country38218,
        setcr_country38218, 
        cr_country38218Props,
        setcr_country38218Props,
        cr_currencyb2ebe,
        setcr_currencyb2ebe, 
        cr_currencyb2ebeProps,
        setcr_currencyb2ebeProps,
        exchange_rate86282,
        setexchange_rate86282, 
        exchange_rate86282Props,
        setexchange_rate86282Props,
        cr_amountbd2bf,
        setcr_amountbd2bf, 
        cr_amountbd2bfProps,
        setcr_amountbd2bfProps,
        cr_bank_code76d12,
        setcr_bank_code76d12, 
        cr_bank_code76d12Props,
        setcr_bank_code76d12Props,
        cr_clr_code4387d,
        setcr_clr_code4387d, 
        cr_clr_code4387dProps,
        setcr_clr_code4387dProps,
        chrg_info_text_labelf2fb3,
        setchrg_info_text_labelf2fb3, 
        chrg_info_text_labelf2fb3Props,
        setchrg_info_text_labelf2fb3Props,
        charge_type63052,
        setcharge_type63052, 
        charge_type63052Props,
        setcharge_type63052Props,
        charge_amount44ea6,
        setcharge_amount44ea6, 
        charge_amount44ea6Props,
        setcharge_amount44ea6Props,
        correspondent_chargeff14a,
        setcorrespondent_chargeff14a, 
        correspondent_chargeff14aProps,
        setcorrespondent_chargeff14aProps,
        bank_chargeb33d7,
        setbank_chargeb33d7, 
        bank_chargeb33d7Props,
        setbank_chargeb33d7Props,
        add_info_text_label19bc1,
        setadd_info_text_label19bc1, 
        add_info_text_label19bc1Props,
        setadd_info_text_label19bc1Props,
        payment_method031c1,
        setpayment_method031c1, 
        payment_method031c1Props,
        setpayment_method031c1Props,
        instruction_priorityafb4d,
        setinstruction_priorityafb4d, 
        instruction_priorityafb4dProps,
        setinstruction_priorityafb4dProps,
        category_purposead521,
        setcategory_purposead521, 
        category_purposead521Props,
        setcategory_purposead521Props,
        remittance_info6fbdf,
        setremittance_info6fbdf, 
        remittance_info6fbdfProps,
        setremittance_info6fbdfProps,
        intermediary_institution45fe6,
        setintermediary_institution45fe6, 
        intermediary_institution45fe6Props,
        setintermediary_institution45fe6Props,
        sender_receiver_info30c67,
        setsender_receiver_info30c67, 
        sender_receiver_info30c67Props,
        setsender_receiver_info30c67Props,
        correspondent_bank2a7ae,
        setcorrespondent_bank2a7ae, 
        correspondent_bank2a7aeProps,
        setcorrespondent_bank2a7aeProps,
        customwidget02697,
        setcustomwidget02697, 
        customwidget02697Props,
        setcustomwidget02697Props,
        benificiary_textb53b9,
        setbenificiary_textb53b9, 
        benificiary_textb53b9Props,
        setbenificiary_textb53b9Props,
        search_textinput7144f,
        setsearch_textinput7144f, 
        search_textinput7144fProps,
        setsearch_textinput7144fProps,
        search_btne5c0a,
        setsearch_btne5c0a, 
        search_btne5c0aProps,
        setsearch_btne5c0aProps,
        ben_divideraec54,
        setben_divideraec54, 
        ben_divideraec54Props,
        setben_divideraec54Props,
        account_holder_namedb849,
        setaccount_holder_namedb849, 
        account_holder_namedb849Props,
        setaccount_holder_namedb849Props,
        iconcd6e8,
        seticoncd6e8, 
        iconcd6e8Props,
        seticoncd6e8Props,
        account_numberf1543,
        setaccount_numberf1543, 
        account_numberf1543Props,
        setaccount_numberf1543Props,
        confirm_dividere3b17,
        setconfirm_dividere3b17, 
        confirm_dividere3b17Props,
        setconfirm_dividere3b17Props,
        clear_button188cc,
        setclear_button188cc, 
        clear_button188ccProps,
        setclear_button188ccProps,
        confirm_button246d5,
        setconfirm_button246d5, 
        confirm_button246d5Props,
        setconfirm_button246d5Props,
        divider_tope6917,
        setdivider_tope6917, 
        divider_tope6917Props,
        setdivider_tope6917Props,
        transaction_date_time_label669d7,
        settransaction_date_time_label669d7, 
        transaction_date_time_label669d7Props,
        settransaction_date_time_label669d7Props,
        processed_by_label542e8,
        setprocessed_by_label542e8, 
        processed_by_label542e8Props,
        setprocessed_by_label542e8Props,
        trs_created_date14856,
        settrs_created_date14856, 
        trs_created_date14856Props,
        settrs_created_date14856Props,
        processing_systemd2b69,
        setprocessing_systemd2b69, 
        processing_systemd2b69Props,
        setprocessing_systemd2b69Props,
        currency_labele21ba,
        setcurrency_labele21ba, 
        currency_labele21baProps,
        setcurrency_labele21baProps,
        amount_labelfd725,
        setamount_labelfd725, 
        amount_labelfd725Props,
        setamount_labelfd725Props,
        dr_currency9c8a2,
        setdr_currency9c8a2, 
        dr_currency9c8a2Props,
        setdr_currency9c8a2Props,
        dr_amount01416,
        setdr_amount01416, 
        dr_amount01416Props,
        setdr_amount01416Props,
        debit_account_label3b1b7,
        setdebit_account_label3b1b7, 
        debit_account_label3b1b7Props,
        setdebit_account_label3b1b7Props,
        process_status_labelb6505,
        setprocess_status_labelb6505, 
        process_status_labelb6505Props,
        setprocess_status_labelb6505Props,
        dr_account36b40,
        setdr_account36b40, 
        dr_account36b40Props,
        setdr_account36b40Props,
        trs_process_statusa4262,
        settrs_process_statusa4262, 
        trs_process_statusa4262Props,
        settrs_process_statusa4262Props,
        credit_account_label65c7b,
        setcredit_account_label65c7b, 
        credit_account_label65c7bProps,
        setcredit_account_label65c7bProps,
        status_labelf3713,
        setstatus_labelf3713, 
        status_labelf3713Props,
        setstatus_labelf3713Props,
        cr_account500d6,
        setcr_account500d6, 
        cr_account500d6Props,
        setcr_account500d6Props,
        trs_status88bc7,
        settrs_status88bc7, 
        trs_status88bc7Props,
        settrs_status88bc7Props,
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
        return_reason38055,
        setreturn_reason38055, 
        return_reason38055Props,
        setreturn_reason38055Props,
        return_reason_code06fe7,
        setreturn_reason_code06fe7, 
        return_reason_code06fe7Props,
        setreturn_reason_code06fe7Props,
        return_currency5d707,
        setreturn_currency5d707, 
        return_currency5d707Props,
        setreturn_currency5d707Props,
        return_amount7f000,
        setreturn_amount7f000, 
        return_amount7f000Props,
        setreturn_amount7f000Props,
        return_close1890d,
        setreturn_close1890d, 
        return_close1890dProps,
        setreturn_close1890dProps,
        return_reject6b8cc,
        setreturn_reject6b8cc, 
        return_reject6b8ccProps,
        setreturn_reject6b8ccProps,
        return_approveaa4d9,
        setreturn_approveaa4d9, 
        return_approveaa4d9Props,
        setreturn_approveaa4d9Props,
        return_save03b4e,
        setreturn_save03b4e, 
        return_save03b4eProps,
        setreturn_save03b4eProps,
        dr_account8ccf1,
        setdr_account8ccf1, 
        dr_account8ccf1Props,
        setdr_account8ccf1Props,
        dr_currency6b8f0,
        setdr_currency6b8f0, 
        dr_currency6b8f0Props,
        setdr_currency6b8f0Props,
        debit_exchange_rate710eb,
        setdebit_exchange_rate710eb, 
        debit_exchange_rate710ebProps,
        setdebit_exchange_rate710ebProps,
        ret_amountb0252,
        setret_amountb0252, 
        ret_amountb0252Props,
        setret_amountb0252Props,
        ret_currencye06ce,
        setret_currencye06ce, 
        ret_currencye06ceProps,
        setret_currencye06ceProps,
        exchange_rate71ca9,
        setexchange_rate71ca9, 
        exchange_rate71ca9Props,
        setexchange_rate71ca9Props,
        calculated_ret_amountdc5ca,
        setcalculated_ret_amountdc5ca, 
        calculated_ret_amountdc5caProps,
        setcalculated_ret_amountdc5caProps,
        apply_special_rate_closef2db0,
        setapply_special_rate_closef2db0, 
        apply_special_rate_closef2db0Props,
        setapply_special_rate_closef2db0Props,
        return_rejectdab31,
        setreturn_rejectdab31, 
        return_rejectdab31Props,
        setreturn_rejectdab31Props,
        return_approve9ff3e,
        setreturn_approve9ff3e, 
        return_approve9ff3eProps,
        setreturn_approve9ff3eProps,
        return_savec7f8c,
        setreturn_savec7f8c, 
        return_savec7f8cProps,
        setreturn_savec7f8cProps,
        dr_account4eafa,
        setdr_account4eafa, 
        dr_account4eafaProps,
        setdr_account4eafaProps,
        dr_currencyf9a11,
        setdr_currencyf9a11, 
        dr_currencyf9a11Props,
        setdr_currencyf9a11Props,
        dr_amount3c1d4,
        setdr_amount3c1d4, 
        dr_amount3c1d4Props,
        setdr_amount3c1d4Props,
        cr_currencya5017,
        setcr_currencya5017, 
        cr_currencya5017Props,
        setcr_currencya5017Props,
        cr_amountac0e3,
        setcr_amountac0e3, 
        cr_amountac0e3Props,
        setcr_amountac0e3Props,
        exchange_rate42ef6,
        setexchange_rate42ef6, 
        exchange_rate42ef6Props,
        setexchange_rate42ef6Props,
        revised_exchange_rate18eff,
        setrevised_exchange_rate18eff, 
        revised_exchange_rate18effProps,
        setrevised_exchange_rate18effProps,
        revised_debit_amount6130b,
        setrevised_debit_amount6130b, 
        revised_debit_amount6130bProps,
        setrevised_debit_amount6130bProps,
        revised_credit_amount67a97,
        setrevised_credit_amount67a97, 
        revised_credit_amount67a97Props,
        setrevised_credit_amount67a97Props,
        apply_special_rate_close57a71,
        setapply_special_rate_close57a71, 
        apply_special_rate_close57a71Props,
        setapply_special_rate_close57a71Props,
        apply_special_rate_rejectba9fa,
        setapply_special_rate_rejectba9fa, 
        apply_special_rate_rejectba9faProps,
        setapply_special_rate_rejectba9faProps,
        apply_special_rate_approve58219,
        setapply_special_rate_approve58219, 
        apply_special_rate_approve58219Props,
        setapply_special_rate_approve58219Props,
        apply_special_rate_savebdf41,
        setapply_special_rate_savebdf41, 
        apply_special_rate_savebdf41Props,
        setapply_special_rate_savebdf41Props,
        cr_accountede53,
        setcr_accountede53, 
        cr_accountede53Props,
        setcr_accountede53Props,
        cr_currency233af,
        setcr_currency233af, 
        cr_currency233afProps,
        setcr_currency233afProps,
        cr_amount807dd,
        setcr_amount807dd, 
        cr_amount807ddProps,
        setcr_amount807ddProps,
        account_currency8e273,
        setaccount_currency8e273, 
        account_currency8e273Props,
        setaccount_currency8e273Props,
        current_exchange_rateb1fbe,
        setcurrent_exchange_rateb1fbe, 
        current_exchange_rateb1fbeProps,
        setcurrent_exchange_rateb1fbeProps,
        credit_amountda91c,
        setcredit_amountda91c, 
        credit_amountda91cProps,
        setcredit_amountda91cProps,
        revised_exchange_ratedb974,
        setrevised_exchange_ratedb974, 
        revised_exchange_ratedb974Props,
        setrevised_exchange_ratedb974Props,
        revised_credit_amount747be,
        setrevised_credit_amount747be, 
        revised_credit_amount747beProps,
        setrevised_credit_amount747beProps,
        apply_special_rate_process_close57120,
        setapply_special_rate_process_close57120, 
        apply_special_rate_process_close57120Props,
        setapply_special_rate_process_close57120Props,
        apply_special_rate_process_reject934bd,
        setapply_special_rate_process_reject934bd, 
        apply_special_rate_process_reject934bdProps,
        setapply_special_rate_process_reject934bdProps,
        apply_special_rate_process_approvecfefb,
        setapply_special_rate_process_approvecfefb, 
        apply_special_rate_process_approvecfefbProps,
        setapply_special_rate_process_approvecfefbProps,
        apply_special_rate_process_save4fcee,
        setapply_special_rate_process_save4fcee, 
        apply_special_rate_process_save4fceeProps,
        setapply_special_rate_process_save4fceeProps,
        return_reasonac630,
        setreturn_reasonac630, 
        return_reasonac630Props,
        setreturn_reasonac630Props,
        return_reason_code6797b,
        setreturn_reason_code6797b, 
        return_reason_code6797bProps,
        setreturn_reason_code6797bProps,
        return_currency378ac,
        setreturn_currency378ac, 
        return_currency378acProps,
        setreturn_currency378acProps,
        return_amount9646b,
        setreturn_amount9646b, 
        return_amount9646bProps,
        setreturn_amount9646bProps,
        tech_return_approve71c38,
        settech_return_approve71c38, 
        tech_return_approve71c38Props,
        settech_return_approve71c38Props,
        tech_return_closefec09,
        settech_return_closefec09, 
        tech_return_closefec09Props,
        settech_return_closefec09Props,
        tech_return_reject676d0,
        settech_return_reject676d0, 
        tech_return_reject676d0Props,
        settech_return_reject676d0Props,
        tech_return_savea3f06,
        settech_return_savea3f06, 
        tech_return_savea3f06Props,
        settech_return_savea3f06Props,
        payment_type7038c,
        setpayment_type7038c, 
        payment_type7038cProps,
        setpayment_type7038cProps,
        message_code7cd22,
        setmessage_code7cd22, 
        message_code7cd22Props,
        setmessage_code7cd22Props,
        enquiry_sendfcaa9,
        setenquiry_sendfcaa9, 
        enquiry_sendfcaa9Props,
        setenquiry_sendfcaa9Props,
        outbound_or_inbound5a71c,
        setoutbound_or_inbound5a71c, 
        outbound_or_inbound5a71cProps,
        setoutbound_or_inbound5a71cProps,
        searchfab91,
        setsearchfab91, 
        searchfab91Props,
        setsearchfab91Props,
        refreshe9e64,
        setrefreshe9e64, 
        refreshe9e64Props,
        setrefreshe9e64Props,
        channel_name_view_alle4831,
        setchannel_name_view_alle4831, 
        channel_name_view_alle4831Props,
        setchannel_name_view_alle4831Props,
        uuid_view_all17e51,
        setuuid_view_all17e51, 
        uuid_view_all17e51Props,
        setuuid_view_all17e51Props,
        dr_account_view_alleb786,
        setdr_account_view_alleb786, 
        dr_account_view_alleb786Props,
        setdr_account_view_alleb786Props,
        dr_name_view_all418a1,
        setdr_name_view_all418a1, 
        dr_name_view_all418a1Props,
        setdr_name_view_all418a1Props,
        cr_account_view_alle3b47,
        setcr_account_view_alle3b47, 
        cr_account_view_alle3b47Props,
        setcr_account_view_alle3b47Props,
        cr_name_view_alld92c9,
        setcr_name_view_alld92c9, 
        cr_name_view_alld92c9Props,
        setcr_name_view_alld92c9Props,
        cr_currency_view_all459b1,
        setcr_currency_view_all459b1, 
        cr_currency_view_all459b1Props,
        setcr_currency_view_all459b1Props,
        cr_amount_view_all511fd,
        setcr_amount_view_all511fd, 
        cr_amount_view_all511fdProps,
        setcr_amount_view_all511fdProps,
        message_code_view_all346ce,
        setmessage_code_view_all346ce, 
        message_code_view_all346ceProps,
        setmessage_code_view_all346ceProps,
        tran_date_view_all4223e,
        settran_date_view_all4223e, 
        tran_date_view_all4223eProps,
        settran_date_view_all4223eProps,
        view_all_journey12494,
        setview_all_journey12494, 
        view_all_journey12494Props,
        setview_all_journey12494Props,
        channel_name_can_req_camt055f27d8,
        setchannel_name_can_req_camt055f27d8, 
        channel_name_can_req_camt055f27d8Props,
        setchannel_name_can_req_camt055f27d8Props,
        uuid_can_req_camt0558430a,
        setuuid_can_req_camt0558430a, 
        uuid_can_req_camt0558430aProps,
        setuuid_can_req_camt0558430aProps,
        dr_account_can_req_camt055050c7,
        setdr_account_can_req_camt055050c7, 
        dr_account_can_req_camt055050c7Props,
        setdr_account_can_req_camt055050c7Props,
        dr_name_can_req_camt055679dd,
        setdr_name_can_req_camt055679dd, 
        dr_name_can_req_camt055679ddProps,
        setdr_name_can_req_camt055679ddProps,
        cr_account_can_req_camt0555b65e,
        setcr_account_can_req_camt0555b65e, 
        cr_account_can_req_camt0555b65eProps,
        setcr_account_can_req_camt0555b65eProps,
        cr_name_can_req_camt055bcc5f,
        setcr_name_can_req_camt055bcc5f, 
        cr_name_can_req_camt055bcc5fProps,
        setcr_name_can_req_camt055bcc5fProps,
        cr_currency_can_req_camt0556e4f6,
        setcr_currency_can_req_camt0556e4f6, 
        cr_currency_can_req_camt0556e4f6Props,
        setcr_currency_can_req_camt0556e4f6Props,
        cr_amount_can_req_camt0550e8b4,
        setcr_amount_can_req_camt0550e8b4, 
        cr_amount_can_req_camt0550e8b4Props,
        setcr_amount_can_req_camt0550e8b4Props,
        cancel_request_camt055_mk_initiate_btn2902f,
        setcancel_request_camt055_mk_initiate_btn2902f, 
        cancel_request_camt055_mk_initiate_btn2902fProps,
        setcancel_request_camt055_mk_initiate_btn2902fProps,
        cancel_request_camt055_chk_verify_btn42585,
        setcancel_request_camt055_chk_verify_btn42585, 
        cancel_request_camt055_chk_verify_btn42585Props,
        setcancel_request_camt055_chk_verify_btn42585Props,
        message_code_can_req_camt055532c4,
        setmessage_code_can_req_camt055532c4, 
        message_code_can_req_camt055532c4Props,
        setmessage_code_can_req_camt055532c4Props,
        tran_date_can_req_camt055ea19b,
        settran_date_can_req_camt055ea19b, 
        tran_date_can_req_camt055ea19bProps,
        settran_date_can_req_camt055ea19bProps,
        cancel_request_camt055_journeyb00e8,
        setcancel_request_camt055_journeyb00e8, 
        cancel_request_camt055_journeyb00e8Props,
        setcancel_request_camt055_journeyb00e8Props,
        channel_name_inves_req_camt110026bb,
        setchannel_name_inves_req_camt110026bb, 
        channel_name_inves_req_camt110026bbProps,
        setchannel_name_inves_req_camt110026bbProps,
        uuid_inves_req_camt110c3172,
        setuuid_inves_req_camt110c3172, 
        uuid_inves_req_camt110c3172Props,
        setuuid_inves_req_camt110c3172Props,
        dr_account_inves_req_camt110a53ed,
        setdr_account_inves_req_camt110a53ed, 
        dr_account_inves_req_camt110a53edProps,
        setdr_account_inves_req_camt110a53edProps,
        dr_name_inves_req_camt1101105a,
        setdr_name_inves_req_camt1101105a, 
        dr_name_inves_req_camt1101105aProps,
        setdr_name_inves_req_camt1101105aProps,
        cr_account_inves_req_camt110492e3,
        setcr_account_inves_req_camt110492e3, 
        cr_account_inves_req_camt110492e3Props,
        setcr_account_inves_req_camt110492e3Props,
        cr_name_inves_req_camt110dc531,
        setcr_name_inves_req_camt110dc531, 
        cr_name_inves_req_camt110dc531Props,
        setcr_name_inves_req_camt110dc531Props,
        cr_currency_inves_req_camt110e2b2d,
        setcr_currency_inves_req_camt110e2b2d, 
        cr_currency_inves_req_camt110e2b2dProps,
        setcr_currency_inves_req_camt110e2b2dProps,
        cr_amount_inves_req_camt11060ab5,
        setcr_amount_inves_req_camt11060ab5, 
        cr_amount_inves_req_camt11060ab5Props,
        setcr_amount_inves_req_camt11060ab5Props,
        message_code_inves_req_camt11064432,
        setmessage_code_inves_req_camt11064432, 
        message_code_inves_req_camt11064432Props,
        setmessage_code_inves_req_camt11064432Props,
        tran_date_inves_req_camt110772d7,
        settran_date_inves_req_camt110772d7, 
        tran_date_inves_req_camt110772d7Props,
        settran_date_inves_req_camt110772d7Props,
        inves_req_camt110_mk_initiate_btn3da3f,
        setinves_req_camt110_mk_initiate_btn3da3f, 
        inves_req_camt110_mk_initiate_btn3da3fProps,
        setinves_req_camt110_mk_initiate_btn3da3fProps,
        inves_req_camt110_chk_verify_btn97d7c,
        setinves_req_camt110_chk_verify_btn97d7c, 
        inves_req_camt110_chk_verify_btn97d7cProps,
        setinves_req_camt110_chk_verify_btn97d7cProps,
        inves_req_camt110_journey28ae2,
        setinves_req_camt110_journey28ae2, 
        inves_req_camt110_journey28ae2Props,
        setinves_req_camt110_journey28ae2Props,
        channel_name_inves_res_camt111d0063,
        setchannel_name_inves_res_camt111d0063, 
        channel_name_inves_res_camt111d0063Props,
        setchannel_name_inves_res_camt111d0063Props,
        uuid_inves_res_camt1118b477,
        setuuid_inves_res_camt1118b477, 
        uuid_inves_res_camt1118b477Props,
        setuuid_inves_res_camt1118b477Props,
        dr_account_inves_res_camt11129cf4,
        setdr_account_inves_res_camt11129cf4, 
        dr_account_inves_res_camt11129cf4Props,
        setdr_account_inves_res_camt11129cf4Props,
        dr_name_inves_res_camt111514e6,
        setdr_name_inves_res_camt111514e6, 
        dr_name_inves_res_camt111514e6Props,
        setdr_name_inves_res_camt111514e6Props,
        cr_account_inves_res_camt1112e6f0,
        setcr_account_inves_res_camt1112e6f0, 
        cr_account_inves_res_camt1112e6f0Props,
        setcr_account_inves_res_camt1112e6f0Props,
        cr_name_inves_res_camt11102682,
        setcr_name_inves_res_camt11102682, 
        cr_name_inves_res_camt11102682Props,
        setcr_name_inves_res_camt11102682Props,
        cr_currency_inves_res_camt1114b416,
        setcr_currency_inves_res_camt1114b416, 
        cr_currency_inves_res_camt1114b416Props,
        setcr_currency_inves_res_camt1114b416Props,
        cr_amount_inves_res_camt11184bb7,
        setcr_amount_inves_res_camt11184bb7, 
        cr_amount_inves_res_camt11184bb7Props,
        setcr_amount_inves_res_camt11184bb7Props,
        message_code_inves_res_camt111005f1,
        setmessage_code_inves_res_camt111005f1, 
        message_code_inves_res_camt111005f1Props,
        setmessage_code_inves_res_camt111005f1Props,
        tran_date_inves_res_camt111a30a9,
        settran_date_inves_res_camt111a30a9, 
        tran_date_inves_res_camt111a30a9Props,
        settran_date_inves_res_camt111a30a9Props,
        inves_res_camt111_mk_initiate_btn47e33,
        setinves_res_camt111_mk_initiate_btn47e33, 
        inves_res_camt111_mk_initiate_btn47e33Props,
        setinves_res_camt111_mk_initiate_btn47e33Props,
        inves_res_camt111_chk_verify_btnf5ad1,
        setinves_res_camt111_chk_verify_btnf5ad1, 
        inves_res_camt111_chk_verify_btnf5ad1Props,
        setinves_res_camt111_chk_verify_btnf5ad1Props,
        inves_res_camt111_journey3d289,
        setinves_res_camt111_journey3d289, 
        inves_res_camt111_journey3d289Props,
        setinves_res_camt111_journey3d289Props,
        search_label130a2,
        setsearch_label130a2, 
        search_label130a2Props,
        setsearch_label130a2Props,
        top_dividerdea5b,
        settop_dividerdea5b, 
        top_dividerdea5bProps,
        settop_dividerdea5bProps,
        trs_created_date28cb9,
        settrs_created_date28cb9, 
        trs_created_date28cb9Props,
        settrs_created_date28cb9Props,
        uuida0e9e,
        setuuida0e9e, 
        uuida0e9eProps,
        setuuida0e9eProps,
        debtor_account_no1b62b,
        setdebtor_account_no1b62b, 
        debtor_account_no1b62bProps,
        setdebtor_account_no1b62bProps,
        debtor_name908b6,
        setdebtor_name908b6, 
        debtor_name908b6Props,
        setdebtor_name908b6Props,
        creditor_account_no14a5f,
        setcreditor_account_no14a5f, 
        creditor_account_no14a5fProps,
        setcreditor_account_no14a5fProps,
        cr_name1ecf4,
        setcr_name1ecf4, 
        cr_name1ecf4Props,
        setcr_name1ecf4Props,
        cr_currencydbebf,
        setcr_currencydbebf, 
        cr_currencydbebfProps,
        setcr_currencydbebfProps,
        cr_amounta1974,
        setcr_amounta1974, 
        cr_amounta1974Props,
        setcr_amounta1974Props,
        message_codefa765,
        setmessage_codefa765, 
        message_codefa765Props,
        setmessage_codefa765Props,
        bottom_divideradc51,
        setbottom_divideradc51, 
        bottom_divideradc51Props,
        setbottom_divideradc51Props,
        search4197d,
        setsearch4197d, 
        search4197dProps,
        setsearch4197dProps,
        clear91c04,
        setclear91c04, 
        clear91c04Props,
        setclear91c04Props,
        tran_date5d7c0,
        settran_date5d7c0, 
        tran_date5d7c0Props,
        settran_date5d7c0Props,
        message_code5df7d,
        setmessage_code5df7d, 
        message_code5df7dProps,
        setmessage_code5df7dProps,
        cancel_reason1d34e,
        setcancel_reason1d34e, 
        cancel_reason1d34eProps,
        setcancel_reason1d34eProps,
        reason_description5420a,
        setreason_description5420a, 
        reason_description5420aProps,
        setreason_description5420aProps,
        cancelrequestcamt055_closed99be,
        setcancelrequestcamt055_closed99be, 
        cancelrequestcamt055_closed99beProps,
        setcancelrequestcamt055_closed99beProps,
        cancelrequestcamt055_reject88d84,
        setcancelrequestcamt055_reject88d84, 
        cancelrequestcamt055_reject88d84Props,
        setcancelrequestcamt055_reject88d84Props,
        cancelrequestcamt055_approve510fd,
        setcancelrequestcamt055_approve510fd, 
        cancelrequestcamt055_approve510fdProps,
        setcancelrequestcamt055_approve510fdProps,
        cancelrequestcamt055_save46cc8,
        setcancelrequestcamt055_save46cc8, 
        cancelrequestcamt055_save46cc8Props,
        setcancelrequestcamt055_save46cc8Props,
        customwidgetb9148,
        setcustomwidgetb9148, 
        customwidgetb9148Props,
        setcustomwidgetb9148Props,
        tran_date9acc4,
        settran_date9acc4, 
        tran_date9acc4Props,
        settran_date9acc4Props,
        message_code581ad,
        setmessage_code581ad, 
        message_code581adProps,
        setmessage_code581adProps,
        investigation_type576c6,
        setinvestigation_type576c6, 
        investigation_type576c6Props,
        setinvestigation_type576c6Props,
        investigation_reason74007,
        setinvestigation_reason74007, 
        investigation_reason74007Props,
        setinvestigation_reason74007Props,
        reason_description6d274,
        setreason_description6d274, 
        reason_description6d274Props,
        setreason_description6d274Props,
        invesreqcamt110_closee3b00,
        setinvesreqcamt110_closee3b00, 
        invesreqcamt110_closee3b00Props,
        setinvesreqcamt110_closee3b00Props,
        invesreqcamt110_reject5b353,
        setinvesreqcamt110_reject5b353, 
        invesreqcamt110_reject5b353Props,
        setinvesreqcamt110_reject5b353Props,
        invesreqcamt110_approve727ff,
        setinvesreqcamt110_approve727ff, 
        invesreqcamt110_approve727ffProps,
        setinvesreqcamt110_approve727ffProps,
        invesreqcamt110_save86b45,
        setinvesreqcamt110_save86b45, 
        invesreqcamt110_save86b45Props,
        setinvesreqcamt110_save86b45Props,
        customwidgetad336,
        setcustomwidgetad336, 
        customwidgetad336Props,
        setcustomwidgetad336Props,
        tran_date51032,
        settran_date51032, 
        tran_date51032Props,
        settran_date51032Props,
        message_code3e093,
        setmessage_code3e093, 
        message_code3e093Props,
        setmessage_code3e093Props,
        response_type65b90,
        setresponse_type65b90, 
        response_type65b90Props,
        setresponse_type65b90Props,
        response_reason7039a,
        setresponse_reason7039a, 
        response_reason7039aProps,
        setresponse_reason7039aProps,
        reason_descriptiond33de,
        setreason_descriptiond33de, 
        reason_descriptiond33deProps,
        setreason_descriptiond33deProps,
        invesrescamt111_close9d90c,
        setinvesrescamt111_close9d90c, 
        invesrescamt111_close9d90cProps,
        setinvesrescamt111_close9d90cProps,
        invesrescamt111_reject651be,
        setinvesrescamt111_reject651be, 
        invesrescamt111_reject651beProps,
        setinvesrescamt111_reject651beProps,
        invesrescamt111_approve0d9a3,
        setinvesrescamt111_approve0d9a3, 
        invesrescamt111_approve0d9a3Props,
        setinvesrescamt111_approve0d9a3Props,
        invesrescamt111_save36a0c,
        setinvesrescamt111_save36a0c, 
        invesrescamt111_save36a0cProps,
        setinvesrescamt111_save36a0cProps,
        customwidgetab151,
        setcustomwidgetab151, 
        customwidgetab151Props,
        setcustomwidgetab151Props,
        productcode5d3b1,
        setproductcode5d3b1, 
        productcode5d3b1Props,
        setproductcode5d3b1Props,
        message_type404e3,
        setmessage_type404e3, 
        message_type404e3Props,
        setmessage_type404e3Props,
        datece158,
        setdatece158, 
        datece158Props,
        setdatece158Props,
        uuid076a4,
        setuuid076a4, 
        uuid076a4Props,
        setuuid076a4Props,
        statusa3cf5,
        setstatusa3cf5, 
        statusa3cf5Props,
        setstatusa3cf5Props,
        reject_reasonc1c38,
        setreject_reasonc1c38, 
        reject_reasonc1c38Props,
        setreject_reasonc1c38Props,
        customwidgetd1c52,
        setcustomwidgetd1c52, 
        customwidgetd1c52Props,
        setcustomwidgetd1c52Props,
        op_financial_submit_btna4ae6,
        setop_financial_submit_btna4ae6, 
        op_financial_submit_btna4ae6Props,
        setop_financial_submit_btna4ae6Props,
        ip_productcodea41e0,
        setip_productcodea41e0, 
        ip_productcodea41e0Props,
        setip_productcodea41e0Props,
        ip_message_type89b47,
        setip_message_type89b47, 
        ip_message_type89b47Props,
        setip_message_type89b47Props,
        ip_dated0c4a,
        setip_dated0c4a, 
        ip_dated0c4aProps,
        setip_dated0c4aProps,
        amountdeca1,
        setamountdeca1, 
        amountdeca1Props,
        setamountdeca1Props,
        ip_financial_submit_btne9bd8,
        setip_financial_submit_btne9bd8, 
        ip_financial_submit_btne9bd8Props,
        setip_financial_submit_btne9bd8Props,
        op_110_productcodec2128,
        setop_110_productcodec2128, 
        op_110_productcodec2128Props,
        setop_110_productcodec2128Props,
        op_110_message_type8876c,
        setop_110_message_type8876c, 
        op_110_message_type8876cProps,
        setop_110_message_type8876cProps,
        op_110_date89cec,
        setop_110_date89cec, 
        op_110_date89cecProps,
        setop_110_date89cecProps,
        op_110_uuid82718,
        setop_110_uuid82718, 
        op_110_uuid82718Props,
        setop_110_uuid82718Props,
        op_110_request_type2c432,
        setop_110_request_type2c432, 
        op_110_request_type2c432Props,
        setop_110_request_type2c432Props,
        op_110_request_reason6d6fa,
        setop_110_request_reason6d6fa, 
        op_110_request_reason6d6faProps,
        setop_110_request_reason6d6faProps,
        op_110_submit_btn08cbe,
        setop_110_submit_btn08cbe, 
        op_110_submit_btn08cbeProps,
        setop_110_submit_btn08cbeProps,
        op_111_productcodedfd30,
        setop_111_productcodedfd30, 
        op_111_productcodedfd30Props,
        setop_111_productcodedfd30Props,
        op_111_message_typec1184,
        setop_111_message_typec1184, 
        op_111_message_typec1184Props,
        setop_111_message_typec1184Props,
        op_111_dateadfdb,
        setop_111_dateadfdb, 
        op_111_dateadfdbProps,
        setop_111_dateadfdbProps,
        op_111_uuidd642f,
        setop_111_uuidd642f, 
        op_111_uuidd642fProps,
        setop_111_uuidd642fProps,
        op_111_response_status46eaf,
        setop_111_response_status46eaf, 
        op_111_response_status46eafProps,
        setop_111_response_status46eafProps,
        op_111_response_reason39b24,
        setop_111_response_reason39b24, 
        op_111_response_reason39b24Props,
        setop_111_response_reason39b24Props,
        op_111_submit_btn3f88e,
        setop_111_submit_btn3f88e, 
        op_111_submit_btn3f88eProps,
        setop_111_submit_btn3f88eProps,
        ip_055_productcode77a4c,
        setip_055_productcode77a4c, 
        ip_055_productcode77a4cProps,
        setip_055_productcode77a4cProps,
        ip_055_message_typed8915,
        setip_055_message_typed8915, 
        ip_055_message_typed8915Props,
        setip_055_message_typed8915Props,
        ip_055_date87912,
        setip_055_date87912, 
        ip_055_date87912Props,
        setip_055_date87912Props,
        ip_055_uuidf2ab4,
        setip_055_uuidf2ab4, 
        ip_055_uuidf2ab4Props,
        setip_055_uuidf2ab4Props,
        ip_055_reason_code579a1,
        setip_055_reason_code579a1, 
        ip_055_reason_code579a1Props,
        setip_055_reason_code579a1Props,
        ip_055_additional_info7ae0a,
        setip_055_additional_info7ae0a, 
        ip_055_additional_info7ae0aProps,
        setip_055_additional_info7ae0aProps,
        ip_055_submit_btnfff0c,
        setip_055_submit_btnfff0c, 
        ip_055_submit_btnfff0cProps,
        setip_055_submit_btnfff0cProps,
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
        linechartdd99a,
        setlinechartdd99a, 
        linechartdd99aProps,
        setlinechartdd99aProps,
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
        statusd47ce,
        setstatusd47ce, 
        statusd47ceProps,
        setstatusd47ceProps,
        ////// screen states 
          transactionproduct_v1,
          settransactionproduct_v1,
          transactionproduct_v1Props,
          settransactionproduct_v1Props,
          advancesearch_v1,
          setadvancesearch_v1,
          advancesearch_v1Props,
          setadvancesearch_v1Props,
          transactionsearch_v1,
          settransactionsearch_v1,
          transactionsearch_v1Props,
          settransactionsearch_v1Props,
          paymentinfo_v1,
          setpaymentinfo_v1,
          paymentinfo_v1Props,
          setpaymentinfo_v1Props,
          beneficiarylistpopup_v1,
          setbeneficiarylistpopup_v1,
          beneficiarylistpopup_v1Props,
          setbeneficiarylistpopup_v1Props,
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
          inboundreturnprocess_v1,
          setinboundreturnprocess_v1,
          inboundreturnprocess_v1Props,
          setinboundreturnprocess_v1Props,
          outboundmanualreturnprocess_v1,
          setoutboundmanualreturnprocess_v1,
          outboundmanualreturnprocess_v1Props,
          setoutboundmanualreturnprocess_v1Props,
          outboundapplyspecialrate_v1,
          setoutboundapplyspecialrate_v1,
          outboundapplyspecialrate_v1Props,
          setoutboundapplyspecialrate_v1Props,
          inboundapplyspecialrateprocess_v1,
          setinboundapplyspecialrateprocess_v1,
          inboundapplyspecialrateprocess_v1Props,
          setinboundapplyspecialrateprocess_v1Props,
          techinboundreturnprocess_v1,
          settechinboundreturnprocess_v1,
          techinboundreturnprocess_v1Props,
          settechinboundreturnprocess_v1Props,
          enquiry_v1,
          setenquiry_v1,
          enquiry_v1Props,
          setenquiry_v1Props,
          nftransactionproduct_v1,
          setnftransactionproduct_v1,
          nftransactionproduct_v1Props,
          setnftransactionproduct_v1Props,
          nftransactionsearch_v1,
          setnftransactionsearch_v1,
          nftransactionsearch_v1Props,
          setnftransactionsearch_v1Props,
          nfcancelrequestcamt055_v1,
          setnfcancelrequestcamt055_v1,
          nfcancelrequestcamt055_v1Props,
          setnfcancelrequestcamt055_v1Props,
          nfinvestigationrequestcamt110_v1,
          setnfinvestigationrequestcamt110_v1,
          nfinvestigationrequestcamt110_v1Props,
          setnfinvestigationrequestcamt110_v1Props,
          nfinvestigationresponsecamt111_v1,
          setnfinvestigationresponsecamt111_v1,
          nfinvestigationresponsecamt111_v1Props,
          setnfinvestigationresponsecamt111_v1Props,
          acksimulator_v1,
          setacksimulator_v1,
          acksimulator_v1Props,
          setacksimulator_v1Props,
          dashboard_v1,
          setdashboard_v1,
          dashboard_v1Props,
          setdashboard_v1Props,
        //////////

        ///////// dfd
        dfd_transaction_v1Props,
        setdfd_transaction_v1Props,
        dfd_channelcombosearch_v1Props,
        setdfd_channelcombosearch_v1Props,
        dfd_processstatuscombosearch_v1Props,
        setdfd_processstatuscombosearch_v1Props,
        dfd_currencycombo_v1Props,
        setdfd_currencycombo_v1Props,
        dfd_beneficiarylistquery_v1Props,
        setdfd_beneficiarylistquery_v1Props,
        dfd_purposecombo_v1Props,
        setdfd_purposecombo_v1Props,
        dfd_countrycombo_v1Props,
        setdfd_countrycombo_v1Props,
        dfd_crbankcodecombo_v1Props,
        setdfd_crbankcodecombo_v1Props,
        dfd_drbankcodecombo_v1Props,
        setdfd_drbankcodecombo_v1Props,
        dfd_chargetypecombo_v1Props,
        setdfd_chargetypecombo_v1Props,
        dfd_paymentmethodcombo_v1Props,
        setdfd_paymentmethodcombo_v1Props,
        dfd_initiationinstructionprioritycombo_v1Props,
        setdfd_initiationinstructionprioritycombo_v1Props,
        dfd_categorypurposecombo_v1Props,
        setdfd_categorypurposecombo_v1Props,
        dfd_correspondentbankcombo_v1Props,
        setdfd_correspondentbankcombo_v1Props,
        dfd_manualinitiationuimappingquery_v1Props,
        setdfd_manualinitiationuimappingquery_v1Props,
        dfd_servicelevelcombo_v1Props,
        setdfd_servicelevelcombo_v1Props,
        dfd_journey_v1Props,
        setdfd_journey_v1Props,
        dfd_returnreason_v1Props,
        setdfd_returnreason_v1Props,
        dfd_transactiondetailquery_v1Props,
        setdfd_transactiondetailquery_v1Props,
        dfd_enquirypaymenttypecombo_v1Props,
        setdfd_enquirypaymenttypecombo_v1Props,
        dfd_enquirymessagetypecombo_v1Props,
        setdfd_enquirymessagetypecombo_v1Props,
        dfd_nftransaction_v1Props,
        setdfd_nftransaction_v1Props,
        dfd_nftranmaintransaction_v1Props,
        setdfd_nftranmaintransaction_v1Props,
        dfd_nfcancelreasoncombo_v1Props,
        setdfd_nfcancelreasoncombo_v1Props,
        dfd_nfinvestigationtypecombo_v1Props,
        setdfd_nfinvestigationtypecombo_v1Props,
        dfd_nfinvestigationreasoncombo_v1Props,
        setdfd_nfinvestigationreasoncombo_v1Props,
        dfd_nfresponsetypecombo_v1Props,
        setdfd_nfresponsetypecombo_v1Props,
        dfd_nfresponsereasoncombo_v1Props,
        setdfd_nfresponsereasoncombo_v1Props,
        dfd_nfviewalltransaction_v1Props,
        setdfd_nfviewalltransaction_v1Props,
        dfd_messagetypesimulatorcombo_v1Props,
        setdfd_messagetypesimulatorcombo_v1Props,
        dfd_statussimulatorcombo_v1Props,
        setdfd_statussimulatorcombo_v1Props,
        dfd_ipmessagetypestimulatorcombo_v1Props,
        setdfd_ipmessagetypestimulatorcombo_v1Props,
        dfd_nfsimulatormessage_v1Props,
        setdfd_nfsimulatormessage_v1Props,
        dfd_nfreqtype_v1Props,
        setdfd_nfreqtype_v1Props,
        dfd_nfreqreason_v1Props,
        setdfd_nfreqreason_v1Props,
        dfd_nfrespreason_v1Props,
        setdfd_nfrespreason_v1Props,
        dfd_nfresptype_v1Props,
        setdfd_nfresptype_v1Props,
        dfd_rejectreasonsimulatorcombo_v1Props,
        setdfd_rejectreasonsimulatorcombo_v1Props,
        dfd_channeldashboard_dashboard_v1Props,
        setdfd_channeldashboard_dashboard_v1Props,
        dfd_currencydashboard_dashboard_v1Props,
        setdfd_currencydashboard_dashboard_v1Props,
        dfd_transaction_dashboard_v1Props,
        setdfd_transaction_dashboard_v1Props,
        dfd_onlineofflinedashboard_dashboard_v1Props,
        setdfd_onlineofflinedashboard_dashboard_v1Props,
        dfd_processcategorydashboard_dashboard_v1Props,
        setdfd_processcategorydashboard_dashboard_v1Props,
        dfd_transactioncountvphdashboard_dashboard_v1Props,
        setdfd_transactioncountvphdashboard_dashboard_v1Props,
        dfd_channelcountvphdashboard_dashboard_v1Props,
        setdfd_channelcountvphdashboard_dashboard_v1Props,
        dfd_channelchartdashboard_dashboard_v1Props,
        setdfd_channelchartdashboard_dashboard_v1Props,
        dfd_onlineofflinecountvphdashboard_dashboard_v1Props,
        setdfd_onlineofflinecountvphdashboard_dashboard_v1Props,
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