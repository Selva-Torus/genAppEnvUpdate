


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group4d6cb: any 
  setasset_dashboard_group4d6cb: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group4d6cbProps: any 
  setasset_dashboard_group4d6cbProps: React.Dispatch<React.SetStateAction<any>>
  total_asset_group69aa9: any 
  settotal_asset_group69aa9: React.Dispatch<React.SetStateAction<any>>
  total_asset_group69aa9Props: any 
  settotal_asset_group69aa9Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_due_group704ca: any 
  setmaintenance_due_group704ca: React.Dispatch<React.SetStateAction<any>>
  maintenance_due_group704caProps: any 
  setmaintenance_due_group704caProps: React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_groupb5bd4: any 
  setwarranty_expiring_groupb5bd4: React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_groupb5bd4Props: any 
  setwarranty_expiring_groupb5bd4Props: React.Dispatch<React.SetStateAction<any>>
  software_licenses_group4beb5: any 
  setsoftware_licenses_group4beb5: React.Dispatch<React.SetStateAction<any>>
  software_licenses_group4beb5Props: any 
  setsoftware_licenses_group4beb5Props: React.Dispatch<React.SetStateAction<any>>
  pending_disposal_group2580d: any 
  setpending_disposal_group2580d: React.Dispatch<React.SetStateAction<any>>
  pending_disposal_group2580dProps: any 
  setpending_disposal_group2580dProps: React.Dispatch<React.SetStateAction<any>>
  table_group94010: any 
  settable_group94010: React.Dispatch<React.SetStateAction<any>>
  table_group94010Props: any 
  settable_group94010Props: React.Dispatch<React.SetStateAction<any>>
  subscreen99589: any 
  setsubscreen99589: React.Dispatch<React.SetStateAction<any>>
  subscreen99589Props: any 
  setsubscreen99589Props: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_asset_v104dc1: any 
  setct006_af_uf_ufws_ecp_ams_asset_v104dc1: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props: any 
  setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props: React.Dispatch<React.SetStateAction<any>>
  asset_table_group6fffa: any 
  setasset_table_group6fffa: React.Dispatch<React.SetStateAction<any>>
  asset_table_group6fffaProps: any 
  setasset_table_group6fffaProps: React.Dispatch<React.SetStateAction<any>>
  asset_table6082a: any 
  setasset_table6082a: React.Dispatch<React.SetStateAction<any>>
  asset_table6082aProps: any 
  setasset_table6082aProps: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e: any 
  setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps: any 
  setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps: React.Dispatch<React.SetStateAction<any>>
  asset_maintenance_table_groupe042b: any 
  setasset_maintenance_table_groupe042b: React.Dispatch<React.SetStateAction<any>>
  asset_maintenance_table_groupe042bProps: any 
  setasset_maintenance_table_groupe042bProps: React.Dispatch<React.SetStateAction<any>>
  asset_maintenance_table6cdf1: any 
  setasset_maintenance_table6cdf1: React.Dispatch<React.SetStateAction<any>>
  asset_maintenance_table6cdf1Props: any 
  setasset_maintenance_table6cdf1Props: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426: any 
  setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props: any 
  setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props: React.Dispatch<React.SetStateAction<any>>
  asset_software_licenses_table_groupcb553: any 
  setasset_software_licenses_table_groupcb553: React.Dispatch<React.SetStateAction<any>>
  asset_software_licenses_table_groupcb553Props: any 
  setasset_software_licenses_table_groupcb553Props: React.Dispatch<React.SetStateAction<any>>
  asset_software_licenses_table13758: any 
  setasset_software_licenses_table13758: React.Dispatch<React.SetStateAction<any>>
  asset_software_licenses_table13758Props: any 
  setasset_software_licenses_table13758Props: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1: any 
  setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props: any 
  setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props: React.Dispatch<React.SetStateAction<any>>
  asset_disposal_table_group329e9: any 
  setasset_disposal_table_group329e9: React.Dispatch<React.SetStateAction<any>>
  asset_disposal_table_group329e9Props: any 
  setasset_disposal_table_group329e9Props: React.Dispatch<React.SetStateAction<any>>
  asset_disposal_table440cd: any 
  setasset_disposal_table440cd: React.Dispatch<React.SetStateAction<any>>
  asset_disposal_table440cdProps: any 
  setasset_disposal_table440cdProps: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7: any 
  setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7: React.Dispatch<React.SetStateAction<any>>
  ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props: any 
  setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props: React.Dispatch<React.SetStateAction<any>>
  warrenty_expiring_table_group116d1: any 
  setwarrenty_expiring_table_group116d1: React.Dispatch<React.SetStateAction<any>>
  warrenty_expiring_table_group116d1Props: any 
  setwarrenty_expiring_table_group116d1Props: React.Dispatch<React.SetStateAction<any>>
  warrenty_expiring_tablee3168: any 
  setwarrenty_expiring_tablee3168: React.Dispatch<React.SetStateAction<any>>
  warrenty_expiring_tablee3168Props: any 
  setwarrenty_expiring_tablee3168Props: React.Dispatch<React.SetStateAction<any>>
  overall_asset_group7ded2: any 
  setoverall_asset_group7ded2: React.Dispatch<React.SetStateAction<any>>
  overall_asset_group7ded2Props: any 
  setoverall_asset_group7ded2Props: React.Dispatch<React.SetStateAction<any>>
  icon_text_group476bd: any 
  seticon_text_group476bd: React.Dispatch<React.SetStateAction<any>>
  icon_text_group476bdProps: any 
  seticon_text_group476bdProps: React.Dispatch<React.SetStateAction<any>>
  asset_tablef2b38: any 
  setasset_tablef2b38: React.Dispatch<React.SetStateAction<any>>
  asset_tablef2b38Props: any 
  setasset_tablef2b38Props: React.Dispatch<React.SetStateAction<any>>
  asset_search_group46c56: any 
  setasset_search_group46c56: React.Dispatch<React.SetStateAction<any>>
  asset_search_group46c56Props: any 
  setasset_search_group46c56Props: React.Dispatch<React.SetStateAction<any>>
  new_asset_groupdb5a7: any 
  setnew_asset_groupdb5a7: React.Dispatch<React.SetStateAction<any>>
  new_asset_groupdb5a7Props: any 
  setnew_asset_groupdb5a7Props: React.Dispatch<React.SetStateAction<any>>
  asset_info_groupdeeeb: any 
  setasset_info_groupdeeeb: React.Dispatch<React.SetStateAction<any>>
  asset_info_groupdeeebProps: any 
  setasset_info_groupdeeebProps: React.Dispatch<React.SetStateAction<any>>
  classification_group3c6b3: any 
  setclassification_group3c6b3: React.Dispatch<React.SetStateAction<any>>
  classification_group3c6b3Props: any 
  setclassification_group3c6b3Props: React.Dispatch<React.SetStateAction<any>>
  additional_details_group8c616: any 
  setadditional_details_group8c616: React.Dispatch<React.SetStateAction<any>>
  additional_details_group8c616Props: any 
  setadditional_details_group8c616Props: React.Dispatch<React.SetStateAction<any>>
  pyrchase_details_group76407: any 
  setpyrchase_details_group76407: React.Dispatch<React.SetStateAction<any>>
  pyrchase_details_group76407Props: any 
  setpyrchase_details_group76407Props: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupaffa1: any 
  setdisposal_details_groupaffa1: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupaffa1Props: any 
  setdisposal_details_groupaffa1Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactions1077f: any 
  setdynamicactions1077f: React.Dispatch<React.SetStateAction<any>>
  dynamicactions1077fProps: any 
  setdynamicactions1077fProps: React.Dispatch<React.SetStateAction<any>>
  new_asset_group3261e: any 
  setnew_asset_group3261e: React.Dispatch<React.SetStateAction<any>>
  new_asset_group3261eProps: any 
  setnew_asset_group3261eProps: React.Dispatch<React.SetStateAction<any>>
  asset_info_groupcc113: any 
  setasset_info_groupcc113: React.Dispatch<React.SetStateAction<any>>
  asset_info_groupcc113Props: any 
  setasset_info_groupcc113Props: React.Dispatch<React.SetStateAction<any>>
  classification_groupd9d65: any 
  setclassification_groupd9d65: React.Dispatch<React.SetStateAction<any>>
  classification_groupd9d65Props: any 
  setclassification_groupd9d65Props: React.Dispatch<React.SetStateAction<any>>
  additional_details_groupaff35: any 
  setadditional_details_groupaff35: React.Dispatch<React.SetStateAction<any>>
  additional_details_groupaff35Props: any 
  setadditional_details_groupaff35Props: React.Dispatch<React.SetStateAction<any>>
  pyrchase_details_groupc3900: any 
  setpyrchase_details_groupc3900: React.Dispatch<React.SetStateAction<any>>
  pyrchase_details_groupc3900Props: any 
  setpyrchase_details_groupc3900Props: React.Dispatch<React.SetStateAction<any>>
  disposal_details_group67f77: any 
  setdisposal_details_group67f77: React.Dispatch<React.SetStateAction<any>>
  disposal_details_group67f77Props: any 
  setdisposal_details_group67f77Props: React.Dispatch<React.SetStateAction<any>>
  group_delete3c02f: any 
  setgroup_delete3c02f: React.Dispatch<React.SetStateAction<any>>
  group_delete3c02fProps: any 
  setgroup_delete3c02fProps: React.Dispatch<React.SetStateAction<any>>
  doc_attached_group36b0d: any 
  setdoc_attached_group36b0d: React.Dispatch<React.SetStateAction<any>>
  doc_attached_group36b0dProps: any 
  setdoc_attached_group36b0dProps: React.Dispatch<React.SetStateAction<any>>
  table_groupdaaaa: any 
  settable_groupdaaaa: React.Dispatch<React.SetStateAction<any>>
  table_groupdaaaaProps: any 
  settable_groupdaaaaProps: React.Dispatch<React.SetStateAction<any>>
  asset_doc_table49f40: any 
  setasset_doc_table49f40: React.Dispatch<React.SetStateAction<any>>
  asset_doc_table49f40Props: any 
  setasset_doc_table49f40Props: React.Dispatch<React.SetStateAction<any>>
  document_viewer_group9a6ec: any 
  setdocument_viewer_group9a6ec: React.Dispatch<React.SetStateAction<any>>
  document_viewer_group9a6ecProps: any 
  setdocument_viewer_group9a6ecProps: React.Dispatch<React.SetStateAction<any>>
  group_delete10eb3: any 
  setgroup_delete10eb3: React.Dispatch<React.SetStateAction<any>>
  group_delete10eb3Props: any 
  setgroup_delete10eb3Props: React.Dispatch<React.SetStateAction<any>>
  overall_assignments_group04cba: any 
  setoverall_assignments_group04cba: React.Dispatch<React.SetStateAction<any>>
  overall_assignments_group04cbaProps: any 
  setoverall_assignments_group04cbaProps: React.Dispatch<React.SetStateAction<any>>
  group9ad63: any 
  setgroup9ad63: React.Dispatch<React.SetStateAction<any>>
  group9ad63Props: any 
  setgroup9ad63Props: React.Dispatch<React.SetStateAction<any>>
  assignments_table75a5d: any 
  setassignments_table75a5d: React.Dispatch<React.SetStateAction<any>>
  assignments_table75a5dProps: any 
  setassignments_table75a5dProps: React.Dispatch<React.SetStateAction<any>>
  asset_search_group75d0d: any 
  setasset_search_group75d0d: React.Dispatch<React.SetStateAction<any>>
  asset_search_group75d0dProps: any 
  setasset_search_group75d0dProps: React.Dispatch<React.SetStateAction<any>>
  assign_asset_groupdb5a7: any 
  setassign_asset_groupdb5a7: React.Dispatch<React.SetStateAction<any>>
  assign_asset_groupdb5a7Props: any 
  setassign_asset_groupdb5a7Props: React.Dispatch<React.SetStateAction<any>>
  assignment_information_group5d144: any 
  setassignment_information_group5d144: React.Dispatch<React.SetStateAction<any>>
  assignment_information_group5d144Props: any 
  setassignment_information_group5d144Props: React.Dispatch<React.SetStateAction<any>>
  assignment_details_group7f60d: any 
  setassignment_details_group7f60d: React.Dispatch<React.SetStateAction<any>>
  assignment_details_group7f60dProps: any 
  setassignment_details_group7f60dProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactions956ba: any 
  setdynamicactions956ba: React.Dispatch<React.SetStateAction<any>>
  dynamicactions956baProps: any 
  setdynamicactions956baProps: React.Dispatch<React.SetStateAction<any>>
  assign_asset_groupb4f2d: any 
  setassign_asset_groupb4f2d: React.Dispatch<React.SetStateAction<any>>
  assign_asset_groupb4f2dProps: any 
  setassign_asset_groupb4f2dProps: React.Dispatch<React.SetStateAction<any>>
  assignment_information_groupc96e9: any 
  setassignment_information_groupc96e9: React.Dispatch<React.SetStateAction<any>>
  assignment_information_groupc96e9Props: any 
  setassignment_information_groupc96e9Props: React.Dispatch<React.SetStateAction<any>>
  assignment_details_group136e4: any 
  setassignment_details_group136e4: React.Dispatch<React.SetStateAction<any>>
  assignment_details_group136e4Props: any 
  setassignment_details_group136e4Props: React.Dispatch<React.SetStateAction<any>>
  group_delete0df4b: any 
  setgroup_delete0df4b: React.Dispatch<React.SetStateAction<any>>
  group_delete0df4bProps: any 
  setgroup_delete0df4bProps: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupbc2cf: any 
  setdoc_attached_groupbc2cf: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupbc2cfProps: any 
  setdoc_attached_groupbc2cfProps: React.Dispatch<React.SetStateAction<any>>
  table_group75a5e: any 
  settable_group75a5e: React.Dispatch<React.SetStateAction<any>>
  table_group75a5eProps: any 
  settable_group75a5eProps: React.Dispatch<React.SetStateAction<any>>
  doc_table392d0: any 
  setdoc_table392d0: React.Dispatch<React.SetStateAction<any>>
  doc_table392d0Props: any 
  setdoc_table392d0Props: React.Dispatch<React.SetStateAction<any>>
  group_delete8ee3b: any 
  setgroup_delete8ee3b: React.Dispatch<React.SetStateAction<any>>
  group_delete8ee3bProps: any 
  setgroup_delete8ee3bProps: React.Dispatch<React.SetStateAction<any>>
  overall_maintenance_group04cba: any 
  setoverall_maintenance_group04cba: React.Dispatch<React.SetStateAction<any>>
  overall_maintenance_group04cbaProps: any 
  setoverall_maintenance_group04cbaProps: React.Dispatch<React.SetStateAction<any>>
  icon_groupedce3: any 
  seticon_groupedce3: React.Dispatch<React.SetStateAction<any>>
  icon_groupedce3Props: any 
  seticon_groupedce3Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_table75a5d: any 
  setmaintenance_table75a5d: React.Dispatch<React.SetStateAction<any>>
  maintenance_table75a5dProps: any 
  setmaintenance_table75a5dProps: React.Dispatch<React.SetStateAction<any>>
  asset_search_group1a6b1: any 
  setasset_search_group1a6b1: React.Dispatch<React.SetStateAction<any>>
  asset_search_group1a6b1Props: any 
  setasset_search_group1a6b1Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_groupdb5a7: any 
  setmaintenance_groupdb5a7: React.Dispatch<React.SetStateAction<any>>
  maintenance_groupdb5a7Props: any 
  setmaintenance_groupdb5a7Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_information_groupea3ac: any 
  setmaintenance_information_groupea3ac: React.Dispatch<React.SetStateAction<any>>
  maintenance_information_groupea3acProps: any 
  setmaintenance_information_groupea3acProps: React.Dispatch<React.SetStateAction<any>>
  execution_details_group591cd: any 
  setexecution_details_group591cd: React.Dispatch<React.SetStateAction<any>>
  execution_details_group591cdProps: any 
  setexecution_details_group591cdProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactions8672d: any 
  setdynamicactions8672d: React.Dispatch<React.SetStateAction<any>>
  dynamicactions8672dProps: any 
  setdynamicactions8672dProps: React.Dispatch<React.SetStateAction<any>>
  group_delete3f77f: any 
  setgroup_delete3f77f: React.Dispatch<React.SetStateAction<any>>
  group_delete3f77fProps: any 
  setgroup_delete3f77fProps: React.Dispatch<React.SetStateAction<any>>
  overall_disposal_group04cba: any 
  setoverall_disposal_group04cba: React.Dispatch<React.SetStateAction<any>>
  overall_disposal_group04cbaProps: any 
  setoverall_disposal_group04cbaProps: React.Dispatch<React.SetStateAction<any>>
  icon_text_group23d8c: any 
  seticon_text_group23d8c: React.Dispatch<React.SetStateAction<any>>
  icon_text_group23d8cProps: any 
  seticon_text_group23d8cProps: React.Dispatch<React.SetStateAction<any>>
  disposal_table75a5d: any 
  setdisposal_table75a5d: React.Dispatch<React.SetStateAction<any>>
  disposal_table75a5dProps: any 
  setdisposal_table75a5dProps: React.Dispatch<React.SetStateAction<any>>
  initiate_asset_disposal_groupdb5a7: any 
  setinitiate_asset_disposal_groupdb5a7: React.Dispatch<React.SetStateAction<any>>
  initiate_asset_disposal_groupdb5a7Props: any 
  setinitiate_asset_disposal_groupdb5a7Props: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupe1b0c: any 
  setdisposal_details_groupe1b0c: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupe1b0cProps: any 
  setdisposal_details_groupe1b0cProps: React.Dispatch<React.SetStateAction<any>>
  compliance_financial_group1f9bc: any 
  setcompliance_financial_group1f9bc: React.Dispatch<React.SetStateAction<any>>
  compliance_financial_group1f9bcProps: any 
  setcompliance_financial_group1f9bcProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactions9a7ff: any 
  setdynamicactions9a7ff: React.Dispatch<React.SetStateAction<any>>
  dynamicactions9a7ffProps: any 
  setdynamicactions9a7ffProps: React.Dispatch<React.SetStateAction<any>>
  initiate_asset_disposal_group0196a: any 
  setinitiate_asset_disposal_group0196a: React.Dispatch<React.SetStateAction<any>>
  initiate_asset_disposal_group0196aProps: any 
  setinitiate_asset_disposal_group0196aProps: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupaa369: any 
  setdisposal_details_groupaa369: React.Dispatch<React.SetStateAction<any>>
  disposal_details_groupaa369Props: any 
  setdisposal_details_groupaa369Props: React.Dispatch<React.SetStateAction<any>>
  compliance_financial_groupe5dd8: any 
  setcompliance_financial_groupe5dd8: React.Dispatch<React.SetStateAction<any>>
  compliance_financial_groupe5dd8Props: any 
  setcompliance_financial_groupe5dd8Props: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group485d3: any 
  setasset_dashboard_group485d3: React.Dispatch<React.SetStateAction<any>>
  asset_dashboard_group485d3Props: any 
  setasset_dashboard_group485d3Props: React.Dispatch<React.SetStateAction<any>>
  total_asset_groupfe2e6: any 
  settotal_asset_groupfe2e6: React.Dispatch<React.SetStateAction<any>>
  total_asset_groupfe2e6Props: any 
  settotal_asset_groupfe2e6Props: React.Dispatch<React.SetStateAction<any>>
  software_category_group6e622: any 
  setsoftware_category_group6e622: React.Dispatch<React.SetStateAction<any>>
  software_category_group6e622Props: any 
  setsoftware_category_group6e622Props: React.Dispatch<React.SetStateAction<any>>
  hardware_category_groupfcf3f: any 
  sethardware_category_groupfcf3f: React.Dispatch<React.SetStateAction<any>>
  hardware_category_groupfcf3fProps: any 
  sethardware_category_groupfcf3fProps: React.Dispatch<React.SetStateAction<any>>
  req_maint_groupcf317: any 
  setreq_maint_groupcf317: React.Dispatch<React.SetStateAction<any>>
  req_maint_groupcf317Props: any 
  setreq_maint_groupcf317Props: React.Dispatch<React.SetStateAction<any>>
  cat_groupe0f50: any 
  setcat_groupe0f50: React.Dispatch<React.SetStateAction<any>>
  cat_groupe0f50Props: any 
  setcat_groupe0f50Props: React.Dispatch<React.SetStateAction<any>>
  category_table3e4ac: any 
  setcategory_table3e4ac: React.Dispatch<React.SetStateAction<any>>
  category_table3e4acProps: any 
  setcategory_table3e4acProps: React.Dispatch<React.SetStateAction<any>>
  asset_search_groupd84d5: any 
  setasset_search_groupd84d5: React.Dispatch<React.SetStateAction<any>>
  asset_search_groupd84d5Props: any 
  setasset_search_groupd84d5Props: React.Dispatch<React.SetStateAction<any>>
  category_groupe3ebd: any 
  setcategory_groupe3ebd: React.Dispatch<React.SetStateAction<any>>
  category_groupe3ebdProps: any 
  setcategory_groupe3ebdProps: React.Dispatch<React.SetStateAction<any>>
  category_information_groupfb68a: any 
  setcategory_information_groupfb68a: React.Dispatch<React.SetStateAction<any>>
  category_information_groupfb68aProps: any 
  setcategory_information_groupfb68aProps: React.Dispatch<React.SetStateAction<any>>
  category_configuration_group5d6af: any 
  setcategory_configuration_group5d6af: React.Dispatch<React.SetStateAction<any>>
  category_configuration_group5d6afProps: any 
  setcategory_configuration_group5d6afProps: React.Dispatch<React.SetStateAction<any>>
  dynamicactions13884: any 
  setdynamicactions13884: React.Dispatch<React.SetStateAction<any>>
  dynamicactions13884Props: any 
  setdynamicactions13884Props: React.Dispatch<React.SetStateAction<any>>
  group_delete3c2cd: any 
  setgroup_delete3c2cd: React.Dispatch<React.SetStateAction<any>>
  group_delete3c2cdProps: any 
  setgroup_delete3c2cdProps: React.Dispatch<React.SetStateAction<any>>
  category_group70e38: any 
  setcategory_group70e38: React.Dispatch<React.SetStateAction<any>>
  category_group70e38Props: any 
  setcategory_group70e38Props: React.Dispatch<React.SetStateAction<any>>
  category_information_groupa040a: any 
  setcategory_information_groupa040a: React.Dispatch<React.SetStateAction<any>>
  category_information_groupa040aProps: any 
  setcategory_information_groupa040aProps: React.Dispatch<React.SetStateAction<any>>
  category_configuration_group06f09: any 
  setcategory_configuration_group06f09: React.Dispatch<React.SetStateAction<any>>
  category_configuration_group06f09Props: any 
  setcategory_configuration_group06f09Props: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupb9604: any 
  setdoc_attached_groupb9604: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupb9604Props: any 
  setdoc_attached_groupb9604Props: React.Dispatch<React.SetStateAction<any>>
  table_groupefcb8: any 
  settable_groupefcb8: React.Dispatch<React.SetStateAction<any>>
  table_groupefcb8Props: any 
  settable_groupefcb8Props: React.Dispatch<React.SetStateAction<any>>
  category_doc_table9b042: any 
  setcategory_doc_table9b042: React.Dispatch<React.SetStateAction<any>>
  category_doc_table9b042Props: any 
  setcategory_doc_table9b042Props: React.Dispatch<React.SetStateAction<any>>
  overall_softwarelicenses_group04cba: any 
  setoverall_softwarelicenses_group04cba: React.Dispatch<React.SetStateAction<any>>
  overall_softwarelicenses_group04cbaProps: any 
  setoverall_softwarelicenses_group04cbaProps: React.Dispatch<React.SetStateAction<any>>
  icon_text_group44cf7: any 
  seticon_text_group44cf7: React.Dispatch<React.SetStateAction<any>>
  icon_text_group44cf7Props: any 
  seticon_text_group44cf7Props: React.Dispatch<React.SetStateAction<any>>
  software_licenses_table75a5d: any 
  setsoftware_licenses_table75a5d: React.Dispatch<React.SetStateAction<any>>
  software_licenses_table75a5dProps: any 
  setsoftware_licenses_table75a5dProps: React.Dispatch<React.SetStateAction<any>>
  add_license_groupdb5a7: any 
  setadd_license_groupdb5a7: React.Dispatch<React.SetStateAction<any>>
  add_license_groupdb5a7Props: any 
  setadd_license_groupdb5a7Props: React.Dispatch<React.SetStateAction<any>>
  license_information_groupfae34: any 
  setlicense_information_groupfae34: React.Dispatch<React.SetStateAction<any>>
  license_information_groupfae34Props: any 
  setlicense_information_groupfae34Props: React.Dispatch<React.SetStateAction<any>>
  license_configuration_groupb5d91: any 
  setlicense_configuration_groupb5d91: React.Dispatch<React.SetStateAction<any>>
  license_configuration_groupb5d91Props: any 
  setlicense_configuration_groupb5d91Props: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details_grouped4a1: any 
  setvalidity_financial_details_grouped4a1: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details_grouped4a1Props: any 
  setvalidity_financial_details_grouped4a1Props: React.Dispatch<React.SetStateAction<any>>
  dynamicactions67d98: any 
  setdynamicactions67d98: React.Dispatch<React.SetStateAction<any>>
  dynamicactions67d98Props: any 
  setdynamicactions67d98Props: React.Dispatch<React.SetStateAction<any>>
  add_license_group1bee6: any 
  setadd_license_group1bee6: React.Dispatch<React.SetStateAction<any>>
  add_license_group1bee6Props: any 
  setadd_license_group1bee6Props: React.Dispatch<React.SetStateAction<any>>
  license_information_group4e03c: any 
  setlicense_information_group4e03c: React.Dispatch<React.SetStateAction<any>>
  license_information_group4e03cProps: any 
  setlicense_information_group4e03cProps: React.Dispatch<React.SetStateAction<any>>
  license_configuration_groupa329d: any 
  setlicense_configuration_groupa329d: React.Dispatch<React.SetStateAction<any>>
  license_configuration_groupa329dProps: any 
  setlicense_configuration_groupa329dProps: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details_groupb8a9f: any 
  setvalidity_financial_details_groupb8a9f: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details_groupb8a9fProps: any 
  setvalidity_financial_details_groupb8a9fProps: React.Dispatch<React.SetStateAction<any>>
  group_deletedf5b8: any 
  setgroup_deletedf5b8: React.Dispatch<React.SetStateAction<any>>
  group_deletedf5b8Props: any 
  setgroup_deletedf5b8Props: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupc3d26: any 
  setdoc_attached_groupc3d26: React.Dispatch<React.SetStateAction<any>>
  doc_attached_groupc3d26Props: any 
  setdoc_attached_groupc3d26Props: React.Dispatch<React.SetStateAction<any>>
  table_group7bc52: any 
  settable_group7bc52: React.Dispatch<React.SetStateAction<any>>
  table_group7bc52Props: any 
  settable_group7bc52Props: React.Dispatch<React.SetStateAction<any>>
  software_licenses_doc_table265b6: any 
  setsoftware_licenses_doc_table265b6: React.Dispatch<React.SetStateAction<any>>
  software_licenses_doc_table265b6Props: any 
  setsoftware_licenses_doc_table265b6Props: React.Dispatch<React.SetStateAction<any>>
  total_asset_dividerd84da: any,
  settotal_asset_dividerd84da:React.Dispatch<React.SetStateAction<any>>
  total_asset_dividerd84daProps: any 
  settotal_asset_dividerd84daProps: React.Dispatch<React.SetStateAction<any>>
  total_assest_text88ed3: any,
  settotal_assest_text88ed3:React.Dispatch<React.SetStateAction<any>>
  total_assest_text88ed3Props: any 
  settotal_assest_text88ed3Props: React.Dispatch<React.SetStateAction<any>>
  total_assest9e45d: any,
  settotal_assest9e45d:React.Dispatch<React.SetStateAction<any>>
  total_assest9e45dProps: any 
  settotal_assest9e45dProps: React.Dispatch<React.SetStateAction<any>>
  it_assets6051f: any,
  setit_assets6051f:React.Dispatch<React.SetStateAction<any>>
  it_assets6051fProps: any 
  setit_assets6051fProps: React.Dispatch<React.SetStateAction<any>>
  maintenance_due_divider05a2b: any,
  setmaintenance_due_divider05a2b:React.Dispatch<React.SetStateAction<any>>
  maintenance_due_divider05a2bProps: any 
  setmaintenance_due_divider05a2bProps: React.Dispatch<React.SetStateAction<any>>
  maintenance_due_text31400: any,
  setmaintenance_due_text31400:React.Dispatch<React.SetStateAction<any>>
  maintenance_due_text31400Props: any 
  setmaintenance_due_text31400Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_due09ab9: any,
  setmaintenance_due09ab9:React.Dispatch<React.SetStateAction<any>>
  maintenance_due09ab9Props: any 
  setmaintenance_due09ab9Props: React.Dispatch<React.SetStateAction<any>>
  overdue_maintenancef7357: any,
  setoverdue_maintenancef7357:React.Dispatch<React.SetStateAction<any>>
  overdue_maintenancef7357Props: any 
  setoverdue_maintenancef7357Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_dividerf7152: any,
  setwarranty_expiring_dividerf7152:React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_dividerf7152Props: any 
  setwarranty_expiring_dividerf7152Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_texteee70: any,
  setwarranty_expiring_texteee70:React.Dispatch<React.SetStateAction<any>>
  warranty_expiring_texteee70Props: any 
  setwarranty_expiring_texteee70Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiringfa250: any,
  setwarranty_expiringfa250:React.Dispatch<React.SetStateAction<any>>
  warranty_expiringfa250Props: any 
  setwarranty_expiringfa250Props: React.Dispatch<React.SetStateAction<any>>
  warranty_description49c85: any,
  setwarranty_description49c85:React.Dispatch<React.SetStateAction<any>>
  warranty_description49c85Props: any 
  setwarranty_description49c85Props: React.Dispatch<React.SetStateAction<any>>
  software_licenses_divider9376b: any,
  setsoftware_licenses_divider9376b:React.Dispatch<React.SetStateAction<any>>
  software_licenses_divider9376bProps: any 
  setsoftware_licenses_divider9376bProps: React.Dispatch<React.SetStateAction<any>>
  software_licenses_text92f3e: any,
  setsoftware_licenses_text92f3e:React.Dispatch<React.SetStateAction<any>>
  software_licenses_text92f3eProps: any 
  setsoftware_licenses_text92f3eProps: React.Dispatch<React.SetStateAction<any>>
  software_licenses46b7c: any,
  setsoftware_licenses46b7c:React.Dispatch<React.SetStateAction<any>>
  software_licenses46b7cProps: any 
  setsoftware_licenses46b7cProps: React.Dispatch<React.SetStateAction<any>>
  licenses_near_expiry46af3: any,
  setlicenses_near_expiry46af3:React.Dispatch<React.SetStateAction<any>>
  licenses_near_expiry46af3Props: any 
  setlicenses_near_expiry46af3Props: React.Dispatch<React.SetStateAction<any>>
  pending_disposal_dividerd7969: any,
  setpending_disposal_dividerd7969:React.Dispatch<React.SetStateAction<any>>
  pending_disposal_dividerd7969Props: any 
  setpending_disposal_dividerd7969Props: React.Dispatch<React.SetStateAction<any>>
  pending_disposal_text3d356: any,
  setpending_disposal_text3d356:React.Dispatch<React.SetStateAction<any>>
  pending_disposal_text3d356Props: any 
  setpending_disposal_text3d356Props: React.Dispatch<React.SetStateAction<any>>
  pending_disposal38551: any,
  setpending_disposal38551:React.Dispatch<React.SetStateAction<any>>
  pending_disposal38551Props: any 
  setpending_disposal38551Props: React.Dispatch<React.SetStateAction<any>>
  pending_disposal_descriptionceadc: any,
  setpending_disposal_descriptionceadc:React.Dispatch<React.SetStateAction<any>>
  pending_disposal_descriptionceadcProps: any 
  setpending_disposal_descriptionceadcProps: React.Dispatch<React.SetStateAction<any>>
  asset_idbd7bd: any,
  setasset_idbd7bd:React.Dispatch<React.SetStateAction<any>>
  asset_idbd7bdProps: any 
  setasset_idbd7bdProps: React.Dispatch<React.SetStateAction<any>>
  asset_tagafbdd: any,
  setasset_tagafbdd:React.Dispatch<React.SetStateAction<any>>
  asset_tagafbddProps: any 
  setasset_tagafbddProps: React.Dispatch<React.SetStateAction<any>>
  asset_name1ef31: any,
  setasset_name1ef31:React.Dispatch<React.SetStateAction<any>>
  asset_name1ef31Props: any 
  setasset_name1ef31Props: React.Dispatch<React.SetStateAction<any>>
  category2a9d0: any,
  setcategory2a9d0:React.Dispatch<React.SetStateAction<any>>
  category2a9d0Props: any 
  setcategory2a9d0Props: React.Dispatch<React.SetStateAction<any>>
  serial_no3915b: any,
  setserial_no3915b:React.Dispatch<React.SetStateAction<any>>
  serial_no3915bProps: any 
  setserial_no3915bProps: React.Dispatch<React.SetStateAction<any>>
  assigned_toe3252: any,
  setassigned_toe3252:React.Dispatch<React.SetStateAction<any>>
  assigned_toe3252Props: any 
  setassigned_toe3252Props: React.Dispatch<React.SetStateAction<any>>
  locationee1a6: any,
  setlocationee1a6:React.Dispatch<React.SetStateAction<any>>
  locationee1a6Props: any 
  setlocationee1a6Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiryc5b88: any,
  setwarranty_expiryc5b88:React.Dispatch<React.SetStateAction<any>>
  warranty_expiryc5b88Props: any 
  setwarranty_expiryc5b88Props: React.Dispatch<React.SetStateAction<any>>
  ref2b838: any,
  setref2b838:React.Dispatch<React.SetStateAction<any>>
  ref2b838Props: any 
  setref2b838Props: React.Dispatch<React.SetStateAction<any>>
  asset_name4d2a5: any,
  setasset_name4d2a5:React.Dispatch<React.SetStateAction<any>>
  asset_name4d2a5Props: any 
  setasset_name4d2a5Props: React.Dispatch<React.SetStateAction<any>>
  maint_typee7fac: any,
  setmaint_typee7fac:React.Dispatch<React.SetStateAction<any>>
  maint_typee7facProps: any 
  setmaint_typee7facProps: React.Dispatch<React.SetStateAction<any>>
  descriptionb10c9: any,
  setdescriptionb10c9:React.Dispatch<React.SetStateAction<any>>
  descriptionb10c9Props: any 
  setdescriptionb10c9Props: React.Dispatch<React.SetStateAction<any>>
  vendor_name73ece: any,
  setvendor_name73ece:React.Dispatch<React.SetStateAction<any>>
  vendor_name73eceProps: any 
  setvendor_name73eceProps: React.Dispatch<React.SetStateAction<any>>
  scheduled_date67fe7: any,
  setscheduled_date67fe7:React.Dispatch<React.SetStateAction<any>>
  scheduled_date67fe7Props: any 
  setscheduled_date67fe7Props: React.Dispatch<React.SetStateAction<any>>
  cost3b16a: any,
  setcost3b16a:React.Dispatch<React.SetStateAction<any>>
  cost3b16aProps: any 
  setcost3b16aProps: React.Dispatch<React.SetStateAction<any>>
  statusc3912: any,
  setstatusc3912:React.Dispatch<React.SetStateAction<any>>
  statusc3912Props: any 
  setstatusc3912Props: React.Dispatch<React.SetStateAction<any>>
  maint_ida5387: any,
  setmaint_ida5387:React.Dispatch<React.SetStateAction<any>>
  maint_ida5387Props: any 
  setmaint_ida5387Props: React.Dispatch<React.SetStateAction<any>>
  product_nameff649: any,
  setproduct_nameff649:React.Dispatch<React.SetStateAction<any>>
  product_nameff649Props: any 
  setproduct_nameff649Props: React.Dispatch<React.SetStateAction<any>>
  license_typee6826: any,
  setlicense_typee6826:React.Dispatch<React.SetStateAction<any>>
  license_typee6826Props: any 
  setlicense_typee6826Props: React.Dispatch<React.SetStateAction<any>>
  seats_total28de1: any,
  setseats_total28de1:React.Dispatch<React.SetStateAction<any>>
  seats_total28de1Props: any 
  setseats_total28de1Props: React.Dispatch<React.SetStateAction<any>>
  seats_used897a3: any,
  setseats_used897a3:React.Dispatch<React.SetStateAction<any>>
  seats_used897a3Props: any 
  setseats_used897a3Props: React.Dispatch<React.SetStateAction<any>>
  expiry_date7d6c7: any,
  setexpiry_date7d6c7:React.Dispatch<React.SetStateAction<any>>
  expiry_date7d6c7Props: any 
  setexpiry_date7d6c7Props: React.Dispatch<React.SetStateAction<any>>
  cost6edbe: any,
  setcost6edbe:React.Dispatch<React.SetStateAction<any>>
  cost6edbeProps: any 
  setcost6edbeProps: React.Dispatch<React.SetStateAction<any>>
  license_idc0471: any,
  setlicense_idc0471:React.Dispatch<React.SetStateAction<any>>
  license_idc0471Props: any 
  setlicense_idc0471Props: React.Dispatch<React.SetStateAction<any>>
  asset_name251dd: any,
  setasset_name251dd:React.Dispatch<React.SetStateAction<any>>
  asset_name251ddProps: any 
  setasset_name251ddProps: React.Dispatch<React.SetStateAction<any>>
  disposal_method84ead: any,
  setdisposal_method84ead:React.Dispatch<React.SetStateAction<any>>
  disposal_method84eadProps: any 
  setdisposal_method84eadProps: React.Dispatch<React.SetStateAction<any>>
  reason441ae: any,
  setreason441ae:React.Dispatch<React.SetStateAction<any>>
  reason441aeProps: any 
  setreason441aeProps: React.Dispatch<React.SetStateAction<any>>
  current_value047d6: any,
  setcurrent_value047d6:React.Dispatch<React.SetStateAction<any>>
  current_value047d6Props: any 
  setcurrent_value047d6Props: React.Dispatch<React.SetStateAction<any>>
  data_wiped9be82: any,
  setdata_wiped9be82:React.Dispatch<React.SetStateAction<any>>
  data_wiped9be82Props: any 
  setdata_wiped9be82Props: React.Dispatch<React.SetStateAction<any>>
  status00e2a: any,
  setstatus00e2a:React.Dispatch<React.SetStateAction<any>>
  status00e2aProps: any 
  setstatus00e2aProps: React.Dispatch<React.SetStateAction<any>>
  asset_id29a99: any,
  setasset_id29a99:React.Dispatch<React.SetStateAction<any>>
  asset_id29a99Props: any 
  setasset_id29a99Props: React.Dispatch<React.SetStateAction<any>>
  asset_tage74f0: any,
  setasset_tage74f0:React.Dispatch<React.SetStateAction<any>>
  asset_tage74f0Props: any 
  setasset_tage74f0Props: React.Dispatch<React.SetStateAction<any>>
  asset_name13b83: any,
  setasset_name13b83:React.Dispatch<React.SetStateAction<any>>
  asset_name13b83Props: any 
  setasset_name13b83Props: React.Dispatch<React.SetStateAction<any>>
  category2ca3f: any,
  setcategory2ca3f:React.Dispatch<React.SetStateAction<any>>
  category2ca3fProps: any 
  setcategory2ca3fProps: React.Dispatch<React.SetStateAction<any>>
  serial_no3f2a9: any,
  setserial_no3f2a9:React.Dispatch<React.SetStateAction<any>>
  serial_no3f2a9Props: any 
  setserial_no3f2a9Props: React.Dispatch<React.SetStateAction<any>>
  assigned_to28cfb: any,
  setassigned_to28cfb:React.Dispatch<React.SetStateAction<any>>
  assigned_to28cfbProps: any 
  setassigned_to28cfbProps: React.Dispatch<React.SetStateAction<any>>
  location7cca5: any,
  setlocation7cca5:React.Dispatch<React.SetStateAction<any>>
  location7cca5Props: any 
  setlocation7cca5Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiryd159c: any,
  setwarranty_expiryd159c:React.Dispatch<React.SetStateAction<any>>
  warranty_expiryd159cProps: any 
  setwarranty_expiryd159cProps: React.Dispatch<React.SetStateAction<any>>
  statusf4240: any,
  setstatusf4240:React.Dispatch<React.SetStateAction<any>>
  statusf4240Props: any 
  setstatusf4240Props: React.Dispatch<React.SetStateAction<any>>
  asset_icon_text2f408: any,
  setasset_icon_text2f408:React.Dispatch<React.SetStateAction<any>>
  asset_icon_text2f408Props: any 
  setasset_icon_text2f408Props: React.Dispatch<React.SetStateAction<any>>
  asset_text52a32: any,
  setasset_text52a32:React.Dispatch<React.SetStateAction<any>>
  asset_text52a32Props: any 
  setasset_text52a32Props: React.Dispatch<React.SetStateAction<any>>
  search15de2: any,
  setsearch15de2:React.Dispatch<React.SetStateAction<any>>
  search15de2Props: any 
  setsearch15de2Props: React.Dispatch<React.SetStateAction<any>>
  asset295b8: any,
  setasset295b8:React.Dispatch<React.SetStateAction<any>>
  asset295b8Props: any 
  setasset295b8Props: React.Dispatch<React.SetStateAction<any>>
  asset_id0e8f6: any,
  setasset_id0e8f6:React.Dispatch<React.SetStateAction<any>>
  asset_id0e8f6Props: any 
  setasset_id0e8f6Props: React.Dispatch<React.SetStateAction<any>>
  asset_tagd67f5: any,
  setasset_tagd67f5:React.Dispatch<React.SetStateAction<any>>
  asset_tagd67f5Props: any 
  setasset_tagd67f5Props: React.Dispatch<React.SetStateAction<any>>
  asset_name64bee: any,
  setasset_name64bee:React.Dispatch<React.SetStateAction<any>>
  asset_name64beeProps: any 
  setasset_name64beeProps: React.Dispatch<React.SetStateAction<any>>
  category3fb9d: any,
  setcategory3fb9d:React.Dispatch<React.SetStateAction<any>>
  category3fb9dProps: any 
  setcategory3fb9dProps: React.Dispatch<React.SetStateAction<any>>
  serial_no107f3: any,
  setserial_no107f3:React.Dispatch<React.SetStateAction<any>>
  serial_no107f3Props: any 
  setserial_no107f3Props: React.Dispatch<React.SetStateAction<any>>
  status26d3e: any,
  setstatus26d3e:React.Dispatch<React.SetStateAction<any>>
  status26d3eProps: any 
  setstatus26d3eProps: React.Dispatch<React.SetStateAction<any>>
  assigned_toea420: any,
  setassigned_toea420:React.Dispatch<React.SetStateAction<any>>
  assigned_toea420Props: any 
  setassigned_toea420Props: React.Dispatch<React.SetStateAction<any>>
  location96640: any,
  setlocation96640:React.Dispatch<React.SetStateAction<any>>
  location96640Props: any 
  setlocation96640Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiryd732d: any,
  setwarranty_expiryd732d:React.Dispatch<React.SetStateAction<any>>
  warranty_expiryd732dProps: any 
  setwarranty_expiryd732dProps: React.Dispatch<React.SetStateAction<any>>
  viewadef5: any,
  setviewadef5:React.Dispatch<React.SetStateAction<any>>
  viewadef5Props: any 
  setviewadef5Props: React.Dispatch<React.SetStateAction<any>>
  bt_delete26265: any,
  setbt_delete26265:React.Dispatch<React.SetStateAction<any>>
  bt_delete26265Props: any 
  setbt_delete26265Props: React.Dispatch<React.SetStateAction<any>>
  bt_edit17748: any,
  setbt_edit17748:React.Dispatch<React.SetStateAction<any>>
  bt_edit17748Props: any 
  setbt_edit17748Props: React.Dispatch<React.SetStateAction<any>>
  bt_add_docb191a: any,
  setbt_add_docb191a:React.Dispatch<React.SetStateAction<any>>
  bt_add_docb191aProps: any 
  setbt_add_docb191aProps: React.Dispatch<React.SetStateAction<any>>
  advancesearch9e02b: any,
  setadvancesearch9e02b:React.Dispatch<React.SetStateAction<any>>
  advancesearch9e02bProps: any 
  setadvancesearch9e02bProps: React.Dispatch<React.SetStateAction<any>>
  basic_infot_asset_text4d8c8: any,
  setbasic_infot_asset_text4d8c8:React.Dispatch<React.SetStateAction<any>>
  basic_infot_asset_text4d8c8Props: any 
  setbasic_infot_asset_text4d8c8Props: React.Dispatch<React.SetStateAction<any>>
  category_name3613b: any,
  setcategory_name3613b:React.Dispatch<React.SetStateAction<any>>
  category_name3613bProps: any 
  setcategory_name3613bProps: React.Dispatch<React.SetStateAction<any>>
  asset_type91879: any,
  setasset_type91879:React.Dispatch<React.SetStateAction<any>>
  asset_type91879Props: any 
  setasset_type91879Props: React.Dispatch<React.SetStateAction<any>>
  asset_namea35ee: any,
  setasset_namea35ee:React.Dispatch<React.SetStateAction<any>>
  asset_namea35eeProps: any 
  setasset_namea35eeProps: React.Dispatch<React.SetStateAction<any>>
  asset_tagcb5cb: any,
  setasset_tagcb5cb:React.Dispatch<React.SetStateAction<any>>
  asset_tagcb5cbProps: any 
  setasset_tagcb5cbProps: React.Dispatch<React.SetStateAction<any>>
  asset_codeaa68d: any,
  setasset_codeaa68d:React.Dispatch<React.SetStateAction<any>>
  asset_codeaa68dProps: any 
  setasset_codeaa68dProps: React.Dispatch<React.SetStateAction<any>>
  serial_numbera45cf: any,
  setserial_numbera45cf:React.Dispatch<React.SetStateAction<any>>
  serial_numbera45cfProps: any 
  setserial_numbera45cfProps: React.Dispatch<React.SetStateAction<any>>
  model_number32271: any,
  setmodel_number32271:React.Dispatch<React.SetStateAction<any>>
  model_number32271Props: any 
  setmodel_number32271Props: React.Dispatch<React.SetStateAction<any>>
  manufacturerb8d3f: any,
  setmanufacturerb8d3f:React.Dispatch<React.SetStateAction<any>>
  manufacturerb8d3fProps: any 
  setmanufacturerb8d3fProps: React.Dispatch<React.SetStateAction<any>>
  classification_text9bbdf: any,
  setclassification_text9bbdf:React.Dispatch<React.SetStateAction<any>>
  classification_text9bbdfProps: any 
  setclassification_text9bbdfProps: React.Dispatch<React.SetStateAction<any>>
  classification8722b: any,
  setclassification8722b:React.Dispatch<React.SetStateAction<any>>
  classification8722bProps: any 
  setclassification8722bProps: React.Dispatch<React.SetStateAction<any>>
  data_classification45708: any,
  setdata_classification45708:React.Dispatch<React.SetStateAction<any>>
  data_classification45708Props: any 
  setdata_classification45708Props: React.Dispatch<React.SetStateAction<any>>
  ownership_type1a506: any,
  setownership_type1a506:React.Dispatch<React.SetStateAction<any>>
  ownership_type1a506Props: any 
  setownership_type1a506Props: React.Dispatch<React.SetStateAction<any>>
  lifecycle_stage1446e: any,
  setlifecycle_stage1446e:React.Dispatch<React.SetStateAction<any>>
  lifecycle_stage1446eProps: any 
  setlifecycle_stage1446eProps: React.Dispatch<React.SetStateAction<any>>
  asset_condition414c5: any,
  setasset_condition414c5:React.Dispatch<React.SetStateAction<any>>
  asset_condition414c5Props: any 
  setasset_condition414c5Props: React.Dispatch<React.SetStateAction<any>>
  risk_levelf1e8c: any,
  setrisk_levelf1e8c:React.Dispatch<React.SetStateAction<any>>
  risk_levelf1e8cProps: any 
  setrisk_levelf1e8cProps: React.Dispatch<React.SetStateAction<any>>
  is_critical0f006: any,
  setis_critical0f006:React.Dispatch<React.SetStateAction<any>>
  is_critical0f006Props: any 
  setis_critical0f006Props: React.Dispatch<React.SetStateAction<any>>
  additional_details_text21426: any,
  setadditional_details_text21426:React.Dispatch<React.SetStateAction<any>>
  additional_details_text21426Props: any 
  setadditional_details_text21426Props: React.Dispatch<React.SetStateAction<any>>
  location2ff4b: any,
  setlocation2ff4b:React.Dispatch<React.SetStateAction<any>>
  location2ff4bProps: any 
  setlocation2ff4bProps: React.Dispatch<React.SetStateAction<any>>
  description09f58: any,
  setdescription09f58:React.Dispatch<React.SetStateAction<any>>
  description09f58Props: any 
  setdescription09f58Props: React.Dispatch<React.SetStateAction<any>>
  purchase_details_textf2780: any,
  setpurchase_details_textf2780:React.Dispatch<React.SetStateAction<any>>
  purchase_details_textf2780Props: any 
  setpurchase_details_textf2780Props: React.Dispatch<React.SetStateAction<any>>
  vendor_name4190d: any,
  setvendor_name4190d:React.Dispatch<React.SetStateAction<any>>
  vendor_name4190dProps: any 
  setvendor_name4190dProps: React.Dispatch<React.SetStateAction<any>>
  purchase_costff91e: any,
  setpurchase_costff91e:React.Dispatch<React.SetStateAction<any>>
  purchase_costff91eProps: any 
  setpurchase_costff91eProps: React.Dispatch<React.SetStateAction<any>>
  currency823ac: any,
  setcurrency823ac:React.Dispatch<React.SetStateAction<any>>
  currency823acProps: any 
  setcurrency823acProps: React.Dispatch<React.SetStateAction<any>>
  purchase_datec1162: any,
  setpurchase_datec1162:React.Dispatch<React.SetStateAction<any>>
  purchase_datec1162Props: any 
  setpurchase_datec1162Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expiry1fdec: any,
  setwarranty_expiry1fdec:React.Dispatch<React.SetStateAction<any>>
  warranty_expiry1fdecProps: any 
  setwarranty_expiry1fdecProps: React.Dispatch<React.SetStateAction<any>>
  current_value8f6cd: any,
  setcurrent_value8f6cd:React.Dispatch<React.SetStateAction<any>>
  current_value8f6cdProps: any 
  setcurrent_value8f6cdProps: React.Dispatch<React.SetStateAction<any>>
  depreciation_rate8d4a6: any,
  setdepreciation_rate8d4a6:React.Dispatch<React.SetStateAction<any>>
  depreciation_rate8d4a6Props: any 
  setdepreciation_rate8d4a6Props: React.Dispatch<React.SetStateAction<any>>
  salvage_valuef1995: any,
  setsalvage_valuef1995:React.Dispatch<React.SetStateAction<any>>
  salvage_valuef1995Props: any 
  setsalvage_valuef1995Props: React.Dispatch<React.SetStateAction<any>>
  disposal_details_text65909: any,
  setdisposal_details_text65909:React.Dispatch<React.SetStateAction<any>>
  disposal_details_text65909Props: any 
  setdisposal_details_text65909Props: React.Dispatch<React.SetStateAction<any>>
  disposal_methodd33dc: any,
  setdisposal_methodd33dc:React.Dispatch<React.SetStateAction<any>>
  disposal_methodd33dcProps: any 
  setdisposal_methodd33dcProps: React.Dispatch<React.SetStateAction<any>>
  disposal_date920f2: any,
  setdisposal_date920f2:React.Dispatch<React.SetStateAction<any>>
  disposal_date920f2Props: any 
  setdisposal_date920f2Props: React.Dispatch<React.SetStateAction<any>>
  disposal_ref075d5: any,
  setdisposal_ref075d5:React.Dispatch<React.SetStateAction<any>>
  disposal_ref075d5Props: any 
  setdisposal_ref075d5Props: React.Dispatch<React.SetStateAction<any>>
  asset_id3883f: any,
  setasset_id3883f:React.Dispatch<React.SetStateAction<any>>
  asset_id3883fProps: any 
  setasset_id3883fProps: React.Dispatch<React.SetStateAction<any>>
  cancel407b1: any,
  setcancel407b1:React.Dispatch<React.SetStateAction<any>>
  cancel407b1Props: any 
  setcancel407b1Props: React.Dispatch<React.SetStateAction<any>>
  button_update10522: any,
  setbutton_update10522:React.Dispatch<React.SetStateAction<any>>
  button_update10522Props: any 
  setbutton_update10522Props: React.Dispatch<React.SetStateAction<any>>
  add_asset1b88e: any,
  setadd_asset1b88e:React.Dispatch<React.SetStateAction<any>>
  add_asset1b88eProps: any 
  setadd_asset1b88eProps: React.Dispatch<React.SetStateAction<any>>
  basic_infot_asset_text673ff: any,
  setbasic_infot_asset_text673ff:React.Dispatch<React.SetStateAction<any>>
  basic_infot_asset_text673ffProps: any 
  setbasic_infot_asset_text673ffProps: React.Dispatch<React.SetStateAction<any>>
  category_name2dc3c: any,
  setcategory_name2dc3c:React.Dispatch<React.SetStateAction<any>>
  category_name2dc3cProps: any 
  setcategory_name2dc3cProps: React.Dispatch<React.SetStateAction<any>>
  asset_typecdf86: any,
  setasset_typecdf86:React.Dispatch<React.SetStateAction<any>>
  asset_typecdf86Props: any 
  setasset_typecdf86Props: React.Dispatch<React.SetStateAction<any>>
  asset_name4044f: any,
  setasset_name4044f:React.Dispatch<React.SetStateAction<any>>
  asset_name4044fProps: any 
  setasset_name4044fProps: React.Dispatch<React.SetStateAction<any>>
  asset_tag665c1: any,
  setasset_tag665c1:React.Dispatch<React.SetStateAction<any>>
  asset_tag665c1Props: any 
  setasset_tag665c1Props: React.Dispatch<React.SetStateAction<any>>
  asset_code9d69b: any,
  setasset_code9d69b:React.Dispatch<React.SetStateAction<any>>
  asset_code9d69bProps: any 
  setasset_code9d69bProps: React.Dispatch<React.SetStateAction<any>>
  serial_number67791: any,
  setserial_number67791:React.Dispatch<React.SetStateAction<any>>
  serial_number67791Props: any 
  setserial_number67791Props: React.Dispatch<React.SetStateAction<any>>
  model_number46a87: any,
  setmodel_number46a87:React.Dispatch<React.SetStateAction<any>>
  model_number46a87Props: any 
  setmodel_number46a87Props: React.Dispatch<React.SetStateAction<any>>
  manufacturer825e8: any,
  setmanufacturer825e8:React.Dispatch<React.SetStateAction<any>>
  manufacturer825e8Props: any 
  setmanufacturer825e8Props: React.Dispatch<React.SetStateAction<any>>
  classification_text91ff0: any,
  setclassification_text91ff0:React.Dispatch<React.SetStateAction<any>>
  classification_text91ff0Props: any 
  setclassification_text91ff0Props: React.Dispatch<React.SetStateAction<any>>
  classificationf4888: any,
  setclassificationf4888:React.Dispatch<React.SetStateAction<any>>
  classificationf4888Props: any 
  setclassificationf4888Props: React.Dispatch<React.SetStateAction<any>>
  data_classificationb7d47: any,
  setdata_classificationb7d47:React.Dispatch<React.SetStateAction<any>>
  data_classificationb7d47Props: any 
  setdata_classificationb7d47Props: React.Dispatch<React.SetStateAction<any>>
  ownership_type783c2: any,
  setownership_type783c2:React.Dispatch<React.SetStateAction<any>>
  ownership_type783c2Props: any 
  setownership_type783c2Props: React.Dispatch<React.SetStateAction<any>>
  lifecycle_stage26be5: any,
  setlifecycle_stage26be5:React.Dispatch<React.SetStateAction<any>>
  lifecycle_stage26be5Props: any 
  setlifecycle_stage26be5Props: React.Dispatch<React.SetStateAction<any>>
  asset_condition4d358: any,
  setasset_condition4d358:React.Dispatch<React.SetStateAction<any>>
  asset_condition4d358Props: any 
  setasset_condition4d358Props: React.Dispatch<React.SetStateAction<any>>
  risk_level7f64b: any,
  setrisk_level7f64b:React.Dispatch<React.SetStateAction<any>>
  risk_level7f64bProps: any 
  setrisk_level7f64bProps: React.Dispatch<React.SetStateAction<any>>
  location323da: any,
  setlocation323da:React.Dispatch<React.SetStateAction<any>>
  location323daProps: any 
  setlocation323daProps: React.Dispatch<React.SetStateAction<any>>
  additional_details_text5aceb: any,
  setadditional_details_text5aceb:React.Dispatch<React.SetStateAction<any>>
  additional_details_text5acebProps: any 
  setadditional_details_text5acebProps: React.Dispatch<React.SetStateAction<any>>
  location2acd9: any,
  setlocation2acd9:React.Dispatch<React.SetStateAction<any>>
  location2acd9Props: any 
  setlocation2acd9Props: React.Dispatch<React.SetStateAction<any>>
  description70aff: any,
  setdescription70aff:React.Dispatch<React.SetStateAction<any>>
  description70affProps: any 
  setdescription70affProps: React.Dispatch<React.SetStateAction<any>>
  purchase_details_text52695: any,
  setpurchase_details_text52695:React.Dispatch<React.SetStateAction<any>>
  purchase_details_text52695Props: any 
  setpurchase_details_text52695Props: React.Dispatch<React.SetStateAction<any>>
  vendor_name1f183: any,
  setvendor_name1f183:React.Dispatch<React.SetStateAction<any>>
  vendor_name1f183Props: any 
  setvendor_name1f183Props: React.Dispatch<React.SetStateAction<any>>
  purchase_cost899f9: any,
  setpurchase_cost899f9:React.Dispatch<React.SetStateAction<any>>
  purchase_cost899f9Props: any 
  setpurchase_cost899f9Props: React.Dispatch<React.SetStateAction<any>>
  currency0f0b1: any,
  setcurrency0f0b1:React.Dispatch<React.SetStateAction<any>>
  currency0f0b1Props: any 
  setcurrency0f0b1Props: React.Dispatch<React.SetStateAction<any>>
  purchase_date9a646: any,
  setpurchase_date9a646:React.Dispatch<React.SetStateAction<any>>
  purchase_date9a646Props: any 
  setpurchase_date9a646Props: React.Dispatch<React.SetStateAction<any>>
  warranty_expirye6615: any,
  setwarranty_expirye6615:React.Dispatch<React.SetStateAction<any>>
  warranty_expirye6615Props: any 
  setwarranty_expirye6615Props: React.Dispatch<React.SetStateAction<any>>
  depreciation_ratea6497: any,
  setdepreciation_ratea6497:React.Dispatch<React.SetStateAction<any>>
  depreciation_ratea6497Props: any 
  setdepreciation_ratea6497Props: React.Dispatch<React.SetStateAction<any>>
  salvage_value9adb6: any,
  setsalvage_value9adb6:React.Dispatch<React.SetStateAction<any>>
  salvage_value9adb6Props: any 
  setsalvage_value9adb6Props: React.Dispatch<React.SetStateAction<any>>
  current_value8e31d: any,
  setcurrent_value8e31d:React.Dispatch<React.SetStateAction<any>>
  current_value8e31dProps: any 
  setcurrent_value8e31dProps: React.Dispatch<React.SetStateAction<any>>
  disposal_details_textb2754: any,
  setdisposal_details_textb2754:React.Dispatch<React.SetStateAction<any>>
  disposal_details_textb2754Props: any 
  setdisposal_details_textb2754Props: React.Dispatch<React.SetStateAction<any>>
  disposal_method1fd3c: any,
  setdisposal_method1fd3c:React.Dispatch<React.SetStateAction<any>>
  disposal_method1fd3cProps: any 
  setdisposal_method1fd3cProps: React.Dispatch<React.SetStateAction<any>>
  disposal_dateb9385: any,
  setdisposal_dateb9385:React.Dispatch<React.SetStateAction<any>>
  disposal_dateb9385Props: any 
  setdisposal_dateb9385Props: React.Dispatch<React.SetStateAction<any>>
  disposal_ref35f4b: any,
  setdisposal_ref35f4b:React.Dispatch<React.SetStateAction<any>>
  disposal_ref35f4bProps: any 
  setdisposal_ref35f4bProps: React.Dispatch<React.SetStateAction<any>>
  asset_idb6b5a: any,
  setasset_idb6b5a:React.Dispatch<React.SetStateAction<any>>
  asset_idb6b5aProps: any 
  setasset_idb6b5aProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_text766e5: any,
  setdelete_heading_text766e5:React.Dispatch<React.SetStateAction<any>>
  delete_heading_text766e5Props: any 
  setdelete_heading_text766e5Props: React.Dispatch<React.SetStateAction<any>>
  asset_name_text2a279: any,
  setasset_name_text2a279:React.Dispatch<React.SetStateAction<any>>
  asset_name_text2a279Props: any 
  setasset_name_text2a279Props: React.Dispatch<React.SetStateAction<any>>
  asset_named7764: any,
  setasset_named7764:React.Dispatch<React.SetStateAction<any>>
  asset_named7764Props: any 
  setasset_named7764Props: React.Dispatch<React.SetStateAction<any>>
  asset_tag_text6db8e: any,
  setasset_tag_text6db8e:React.Dispatch<React.SetStateAction<any>>
  asset_tag_text6db8eProps: any 
  setasset_tag_text6db8eProps: React.Dispatch<React.SetStateAction<any>>
  asset_tag5b0ef: any,
  setasset_tag5b0ef:React.Dispatch<React.SetStateAction<any>>
  asset_tag5b0efProps: any 
  setasset_tag5b0efProps: React.Dispatch<React.SetStateAction<any>>
  category_name_text6b1b6: any,
  setcategory_name_text6b1b6:React.Dispatch<React.SetStateAction<any>>
  category_name_text6b1b6Props: any 
  setcategory_name_text6b1b6Props: React.Dispatch<React.SetStateAction<any>>
  category_nameb3bdb: any,
  setcategory_nameb3bdb:React.Dispatch<React.SetStateAction<any>>
  category_nameb3bdbProps: any 
  setcategory_nameb3bdbProps: React.Dispatch<React.SetStateAction<any>>
  asset_type_textbf4bc: any,
  setasset_type_textbf4bc:React.Dispatch<React.SetStateAction<any>>
  asset_type_textbf4bcProps: any 
  setasset_type_textbf4bcProps: React.Dispatch<React.SetStateAction<any>>
  asset_typebe078: any,
  setasset_typebe078:React.Dispatch<React.SetStateAction<any>>
  asset_typebe078Props: any 
  setasset_typebe078Props: React.Dispatch<React.SetStateAction<any>>
  location_text55088: any,
  setlocation_text55088:React.Dispatch<React.SetStateAction<any>>
  location_text55088Props: any 
  setlocation_text55088Props: React.Dispatch<React.SetStateAction<any>>
  location0b4e4: any,
  setlocation0b4e4:React.Dispatch<React.SetStateAction<any>>
  location0b4e4Props: any 
  setlocation0b4e4Props: React.Dispatch<React.SetStateAction<any>>
  confo_textad78a: any,
  setconfo_textad78a:React.Dispatch<React.SetStateAction<any>>
  confo_textad78aProps: any 
  setconfo_textad78aProps: React.Dispatch<React.SetStateAction<any>>
  cancel_button24a33: any,
  setcancel_button24a33:React.Dispatch<React.SetStateAction<any>>
  cancel_button24a33Props: any 
  setcancel_button24a33Props: React.Dispatch<React.SetStateAction<any>>
  ok_button58a95: any,
  setok_button58a95:React.Dispatch<React.SetStateAction<any>>
  ok_button58a95Props: any 
  setok_button58a95Props: React.Dispatch<React.SetStateAction<any>>
  asset_id4d81b: any,
  setasset_id4d81b:React.Dispatch<React.SetStateAction<any>>
  asset_id4d81bProps: any 
  setasset_id4d81bProps: React.Dispatch<React.SetStateAction<any>>
  asset_id_text67e51: any,
  setasset_id_text67e51:React.Dispatch<React.SetStateAction<any>>
  asset_id_text67e51Props: any 
  setasset_id_text67e51Props: React.Dispatch<React.SetStateAction<any>>
  asset_idfc689: any,
  setasset_idfc689:React.Dispatch<React.SetStateAction<any>>
  asset_idfc689Props: any 
  setasset_idfc689Props: React.Dispatch<React.SetStateAction<any>>
  asset_name_text06c7c: any,
  setasset_name_text06c7c:React.Dispatch<React.SetStateAction<any>>
  asset_name_text06c7cProps: any 
  setasset_name_text06c7cProps: React.Dispatch<React.SetStateAction<any>>
  asset_name7dfbc: any,
  setasset_name7dfbc:React.Dispatch<React.SetStateAction<any>>
  asset_name7dfbcProps: any 
  setasset_name7dfbcProps: React.Dispatch<React.SetStateAction<any>>
  attachment_id185f0: any,
  setattachment_id185f0:React.Dispatch<React.SetStateAction<any>>
  attachment_id185f0Props: any 
  setattachment_id185f0Props: React.Dispatch<React.SetStateAction<any>>
  doc_group6421d: any,
  setdoc_group6421d:React.Dispatch<React.SetStateAction<any>>
  doc_group6421dProps: any 
  setdoc_group6421dProps: React.Dispatch<React.SetStateAction<any>>
  doc_name41b3b: any,
  setdoc_name41b3b:React.Dispatch<React.SetStateAction<any>>
  doc_name41b3bProps: any 
  setdoc_name41b3bProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date2eb99: any,
  settrs_created_date2eb99:React.Dispatch<React.SetStateAction<any>>
  trs_created_date2eb99Props: any 
  settrs_created_date2eb99Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_byfae15: any,
  settrs_created_byfae15:React.Dispatch<React.SetStateAction<any>>
  trs_created_byfae15Props: any 
  settrs_created_byfae15Props: React.Dispatch<React.SetStateAction<any>>
  bt_delete6174f: any,
  setbt_delete6174f:React.Dispatch<React.SetStateAction<any>>
  bt_delete6174fProps: any 
  setbt_delete6174fProps: React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel14fde: any,
  setdocumentuploadpanel14fde:React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel14fdeProps: any 
  setdocumentuploadpanel14fdeProps: React.Dispatch<React.SetStateAction<any>>
  asset_id358d1: any,
  setasset_id358d1:React.Dispatch<React.SetStateAction<any>>
  asset_id358d1Props: any 
  setasset_id358d1Props: React.Dispatch<React.SetStateAction<any>>
  button_add_docfde68: any,
  setbutton_add_docfde68:React.Dispatch<React.SetStateAction<any>>
  button_add_docfde68Props: any 
  setbutton_add_docfde68Props: React.Dispatch<React.SetStateAction<any>>
  documentviewerd3b4b: any,
  setdocumentviewerd3b4b:React.Dispatch<React.SetStateAction<any>>
  documentviewerd3b4bProps: any 
  setdocumentviewerd3b4bProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_textc80ba: any,
  setdelete_heading_textc80ba:React.Dispatch<React.SetStateAction<any>>
  delete_heading_textc80baProps: any 
  setdelete_heading_textc80baProps: React.Dispatch<React.SetStateAction<any>>
  attachment_id_txt02e0f: any,
  setattachment_id_txt02e0f:React.Dispatch<React.SetStateAction<any>>
  attachment_id_txt02e0fProps: any 
  setattachment_id_txt02e0fProps: React.Dispatch<React.SetStateAction<any>>
  attachment_id4eeac: any,
  setattachment_id4eeac:React.Dispatch<React.SetStateAction<any>>
  attachment_id4eeacProps: any 
  setattachment_id4eeacProps: React.Dispatch<React.SetStateAction<any>>
  doc_group_texte3945: any,
  setdoc_group_texte3945:React.Dispatch<React.SetStateAction<any>>
  doc_group_texte3945Props: any 
  setdoc_group_texte3945Props: React.Dispatch<React.SetStateAction<any>>
  doc_group82055: any,
  setdoc_group82055:React.Dispatch<React.SetStateAction<any>>
  doc_group82055Props: any 
  setdoc_group82055Props: React.Dispatch<React.SetStateAction<any>>
  doc_name_text6a957: any,
  setdoc_name_text6a957:React.Dispatch<React.SetStateAction<any>>
  doc_name_text6a957Props: any 
  setdoc_name_text6a957Props: React.Dispatch<React.SetStateAction<any>>
  doc_name1f607: any,
  setdoc_name1f607:React.Dispatch<React.SetStateAction<any>>
  doc_name1f607Props: any 
  setdoc_name1f607Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_by_text29a4f: any,
  settrs_created_by_text29a4f:React.Dispatch<React.SetStateAction<any>>
  trs_created_by_text29a4fProps: any 
  settrs_created_by_text29a4fProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_byad133: any,
  settrs_created_byad133:React.Dispatch<React.SetStateAction<any>>
  trs_created_byad133Props: any 
  settrs_created_byad133Props: React.Dispatch<React.SetStateAction<any>>
  confo_text29a5c: any,
  setconfo_text29a5c:React.Dispatch<React.SetStateAction<any>>
  confo_text29a5cProps: any 
  setconfo_text29a5cProps: React.Dispatch<React.SetStateAction<any>>
  asset_idbf0b0: any,
  setasset_idbf0b0:React.Dispatch<React.SetStateAction<any>>
  asset_idbf0b0Props: any 
  setasset_idbf0b0Props: React.Dispatch<React.SetStateAction<any>>
  cancel_button753bf: any,
  setcancel_button753bf:React.Dispatch<React.SetStateAction<any>>
  cancel_button753bfProps: any 
  setcancel_button753bfProps: React.Dispatch<React.SetStateAction<any>>
  ok_buttone6d7f: any,
  setok_buttone6d7f:React.Dispatch<React.SetStateAction<any>>
  ok_buttone6d7fProps: any 
  setok_buttone6d7fProps: React.Dispatch<React.SetStateAction<any>>
  assign_icon_text232c3: any,
  setassign_icon_text232c3:React.Dispatch<React.SetStateAction<any>>
  assign_icon_text232c3Props: any 
  setassign_icon_text232c3Props: React.Dispatch<React.SetStateAction<any>>
  assign_texta5834: any,
  setassign_texta5834:React.Dispatch<React.SetStateAction<any>>
  assign_texta5834Props: any 
  setassign_texta5834Props: React.Dispatch<React.SetStateAction<any>>
  search1d0f8: any,
  setsearch1d0f8:React.Dispatch<React.SetStateAction<any>>
  search1d0f8Props: any 
  setsearch1d0f8Props: React.Dispatch<React.SetStateAction<any>>
  assign_asset20f5c: any,
  setassign_asset20f5c:React.Dispatch<React.SetStateAction<any>>
  assign_asset20f5cProps: any 
  setassign_asset20f5cProps: React.Dispatch<React.SetStateAction<any>>
  assign_idac541: any,
  setassign_idac541:React.Dispatch<React.SetStateAction<any>>
  assign_idac541Props: any 
  setassign_idac541Props: React.Dispatch<React.SetStateAction<any>>
  asset_namedaa81: any,
  setasset_namedaa81:React.Dispatch<React.SetStateAction<any>>
  asset_namedaa81Props: any 
  setasset_namedaa81Props: React.Dispatch<React.SetStateAction<any>>
  assigned_toba6cd: any,
  setassigned_toba6cd:React.Dispatch<React.SetStateAction<any>>
  assigned_toba6cdProps: any 
  setassigned_toba6cdProps: React.Dispatch<React.SetStateAction<any>>
  assigned_byba0b9: any,
  setassigned_byba0b9:React.Dispatch<React.SetStateAction<any>>
  assigned_byba0b9Props: any 
  setassigned_byba0b9Props: React.Dispatch<React.SetStateAction<any>>
  assigned_atc4b88: any,
  setassigned_atc4b88:React.Dispatch<React.SetStateAction<any>>
  assigned_atc4b88Props: any 
  setassigned_atc4b88Props: React.Dispatch<React.SetStateAction<any>>
  expected_return_date910b8: any,
  setexpected_return_date910b8:React.Dispatch<React.SetStateAction<any>>
  expected_return_date910b8Props: any 
  setexpected_return_date910b8Props: React.Dispatch<React.SetStateAction<any>>
  condition_at_assigne0685: any,
  setcondition_at_assigne0685:React.Dispatch<React.SetStateAction<any>>
  condition_at_assigne0685Props: any 
  setcondition_at_assigne0685Props: React.Dispatch<React.SetStateAction<any>>
  status7fb4b: any,
  setstatus7fb4b:React.Dispatch<React.SetStateAction<any>>
  status7fb4bProps: any 
  setstatus7fb4bProps: React.Dispatch<React.SetStateAction<any>>
  bt_view6b7cc: any,
  setbt_view6b7cc:React.Dispatch<React.SetStateAction<any>>
  bt_view6b7ccProps: any 
  setbt_view6b7ccProps: React.Dispatch<React.SetStateAction<any>>
  bt_editad624: any,
  setbt_editad624:React.Dispatch<React.SetStateAction<any>>
  bt_editad624Props: any 
  setbt_editad624Props: React.Dispatch<React.SetStateAction<any>>
  bt_deletefaec8: any,
  setbt_deletefaec8:React.Dispatch<React.SetStateAction<any>>
  bt_deletefaec8Props: any 
  setbt_deletefaec8Props: React.Dispatch<React.SetStateAction<any>>
  bt_add_docf5447: any,
  setbt_add_docf5447:React.Dispatch<React.SetStateAction<any>>
  bt_add_docf5447Props: any 
  setbt_add_docf5447Props: React.Dispatch<React.SetStateAction<any>>
  advancesearch9256e: any,
  setadvancesearch9256e:React.Dispatch<React.SetStateAction<any>>
  advancesearch9256eProps: any 
  setadvancesearch9256eProps: React.Dispatch<React.SetStateAction<any>>
  assignment_information_text8af67: any,
  setassignment_information_text8af67:React.Dispatch<React.SetStateAction<any>>
  assignment_information_text8af67Props: any 
  setassignment_information_text8af67Props: React.Dispatch<React.SetStateAction<any>>
  asset_name56fec: any,
  setasset_name56fec:React.Dispatch<React.SetStateAction<any>>
  asset_name56fecProps: any 
  setasset_name56fecProps: React.Dispatch<React.SetStateAction<any>>
  assigned_tof8f17: any,
  setassigned_tof8f17:React.Dispatch<React.SetStateAction<any>>
  assigned_tof8f17Props: any 
  setassigned_tof8f17Props: React.Dispatch<React.SetStateAction<any>>
  assigned_byc4563: any,
  setassigned_byc4563:React.Dispatch<React.SetStateAction<any>>
  assigned_byc4563Props: any 
  setassigned_byc4563Props: React.Dispatch<React.SetStateAction<any>>
  assigned_at45db5: any,
  setassigned_at45db5:React.Dispatch<React.SetStateAction<any>>
  assigned_at45db5Props: any 
  setassigned_at45db5Props: React.Dispatch<React.SetStateAction<any>>
  assignment_statusa6f80: any,
  setassignment_statusa6f80:React.Dispatch<React.SetStateAction<any>>
  assignment_statusa6f80Props: any 
  setassignment_statusa6f80Props: React.Dispatch<React.SetStateAction<any>>
  condition_at_assign27aff: any,
  setcondition_at_assign27aff:React.Dispatch<React.SetStateAction<any>>
  condition_at_assign27affProps: any 
  setcondition_at_assign27affProps: React.Dispatch<React.SetStateAction<any>>
  expected_return_date15cfe: any,
  setexpected_return_date15cfe:React.Dispatch<React.SetStateAction<any>>
  expected_return_date15cfeProps: any 
  setexpected_return_date15cfeProps: React.Dispatch<React.SetStateAction<any>>
  assignment_details_textb98b6: any,
  setassignment_details_textb98b6:React.Dispatch<React.SetStateAction<any>>
  assignment_details_textb98b6Props: any 
  setassignment_details_textb98b6Props: React.Dispatch<React.SetStateAction<any>>
  actual_return_date06574: any,
  setactual_return_date06574:React.Dispatch<React.SetStateAction<any>>
  actual_return_date06574Props: any 
  setactual_return_date06574Props: React.Dispatch<React.SetStateAction<any>>
  returned_atb4ccc: any,
  setreturned_atb4ccc:React.Dispatch<React.SetStateAction<any>>
  returned_atb4cccProps: any 
  setreturned_atb4cccProps: React.Dispatch<React.SetStateAction<any>>
  condition_at_return40b7c: any,
  setcondition_at_return40b7c:React.Dispatch<React.SetStateAction<any>>
  condition_at_return40b7cProps: any 
  setcondition_at_return40b7cProps: React.Dispatch<React.SetStateAction<any>>
  approved_by8c220: any,
  setapproved_by8c220:React.Dispatch<React.SetStateAction<any>>
  approved_by8c220Props: any 
  setapproved_by8c220Props: React.Dispatch<React.SetStateAction<any>>
  approval_statuseb2b2: any,
  setapproval_statuseb2b2:React.Dispatch<React.SetStateAction<any>>
  approval_statuseb2b2Props: any 
  setapproval_statuseb2b2Props: React.Dispatch<React.SetStateAction<any>>
  assignment_notese758f: any,
  setassignment_notese758f:React.Dispatch<React.SetStateAction<any>>
  assignment_notese758fProps: any 
  setassignment_notese758fProps: React.Dispatch<React.SetStateAction<any>>
  acknowledgement_signedfdaee: any,
  setacknowledgement_signedfdaee:React.Dispatch<React.SetStateAction<any>>
  acknowledgement_signedfdaeeProps: any 
  setacknowledgement_signedfdaeeProps: React.Dispatch<React.SetStateAction<any>>
  assign_id31be8: any,
  setassign_id31be8:React.Dispatch<React.SetStateAction<any>>
  assign_id31be8Props: any 
  setassign_id31be8Props: React.Dispatch<React.SetStateAction<any>>
  button_cancel83d84: any,
  setbutton_cancel83d84:React.Dispatch<React.SetStateAction<any>>
  button_cancel83d84Props: any 
  setbutton_cancel83d84Props: React.Dispatch<React.SetStateAction<any>>
  button_updatedc4e0: any,
  setbutton_updatedc4e0:React.Dispatch<React.SetStateAction<any>>
  button_updatedc4e0Props: any 
  setbutton_updatedc4e0Props: React.Dispatch<React.SetStateAction<any>>
  assign090a4: any,
  setassign090a4:React.Dispatch<React.SetStateAction<any>>
  assign090a4Props: any 
  setassign090a4Props: React.Dispatch<React.SetStateAction<any>>
  assignment_information_textbebbc: any,
  setassignment_information_textbebbc:React.Dispatch<React.SetStateAction<any>>
  assignment_information_textbebbcProps: any 
  setassignment_information_textbebbcProps: React.Dispatch<React.SetStateAction<any>>
  asset_name39101: any,
  setasset_name39101:React.Dispatch<React.SetStateAction<any>>
  asset_name39101Props: any 
  setasset_name39101Props: React.Dispatch<React.SetStateAction<any>>
  assigned_toad6a1: any,
  setassigned_toad6a1:React.Dispatch<React.SetStateAction<any>>
  assigned_toad6a1Props: any 
  setassigned_toad6a1Props: React.Dispatch<React.SetStateAction<any>>
  assigned_byaa464: any,
  setassigned_byaa464:React.Dispatch<React.SetStateAction<any>>
  assigned_byaa464Props: any 
  setassigned_byaa464Props: React.Dispatch<React.SetStateAction<any>>
  assigned_atca20b: any,
  setassigned_atca20b:React.Dispatch<React.SetStateAction<any>>
  assigned_atca20bProps: any 
  setassigned_atca20bProps: React.Dispatch<React.SetStateAction<any>>
  assignment_status1057b: any,
  setassignment_status1057b:React.Dispatch<React.SetStateAction<any>>
  assignment_status1057bProps: any 
  setassignment_status1057bProps: React.Dispatch<React.SetStateAction<any>>
  condition_at_assignf6852: any,
  setcondition_at_assignf6852:React.Dispatch<React.SetStateAction<any>>
  condition_at_assignf6852Props: any 
  setcondition_at_assignf6852Props: React.Dispatch<React.SetStateAction<any>>
  expected_return_datedf53d: any,
  setexpected_return_datedf53d:React.Dispatch<React.SetStateAction<any>>
  expected_return_datedf53dProps: any 
  setexpected_return_datedf53dProps: React.Dispatch<React.SetStateAction<any>>
  assignment_details_text97d83: any,
  setassignment_details_text97d83:React.Dispatch<React.SetStateAction<any>>
  assignment_details_text97d83Props: any 
  setassignment_details_text97d83Props: React.Dispatch<React.SetStateAction<any>>
  actual_return_datec1f64: any,
  setactual_return_datec1f64:React.Dispatch<React.SetStateAction<any>>
  actual_return_datec1f64Props: any 
  setactual_return_datec1f64Props: React.Dispatch<React.SetStateAction<any>>
  returned_atecafb: any,
  setreturned_atecafb:React.Dispatch<React.SetStateAction<any>>
  returned_atecafbProps: any 
  setreturned_atecafbProps: React.Dispatch<React.SetStateAction<any>>
  condition_at_return1d3c7: any,
  setcondition_at_return1d3c7:React.Dispatch<React.SetStateAction<any>>
  condition_at_return1d3c7Props: any 
  setcondition_at_return1d3c7Props: React.Dispatch<React.SetStateAction<any>>
  approved_by2b89c: any,
  setapproved_by2b89c:React.Dispatch<React.SetStateAction<any>>
  approved_by2b89cProps: any 
  setapproved_by2b89cProps: React.Dispatch<React.SetStateAction<any>>
  approval_statusf07b0: any,
  setapproval_statusf07b0:React.Dispatch<React.SetStateAction<any>>
  approval_statusf07b0Props: any 
  setapproval_statusf07b0Props: React.Dispatch<React.SetStateAction<any>>
  acknowledgement_signed5ee58: any,
  setacknowledgement_signed5ee58:React.Dispatch<React.SetStateAction<any>>
  acknowledgement_signed5ee58Props: any 
  setacknowledgement_signed5ee58Props: React.Dispatch<React.SetStateAction<any>>
  assignment_notes59be1: any,
  setassignment_notes59be1:React.Dispatch<React.SetStateAction<any>>
  assignment_notes59be1Props: any 
  setassignment_notes59be1Props: React.Dispatch<React.SetStateAction<any>>
  assign_idb53db: any,
  setassign_idb53db:React.Dispatch<React.SetStateAction<any>>
  assign_idb53dbProps: any 
  setassign_idb53dbProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_textc848b: any,
  setdelete_heading_textc848b:React.Dispatch<React.SetStateAction<any>>
  delete_heading_textc848bProps: any 
  setdelete_heading_textc848bProps: React.Dispatch<React.SetStateAction<any>>
  asset_name_text16bc2: any,
  setasset_name_text16bc2:React.Dispatch<React.SetStateAction<any>>
  asset_name_text16bc2Props: any 
  setasset_name_text16bc2Props: React.Dispatch<React.SetStateAction<any>>
  asset_named51ee: any,
  setasset_named51ee:React.Dispatch<React.SetStateAction<any>>
  asset_named51eeProps: any 
  setasset_named51eeProps: React.Dispatch<React.SetStateAction<any>>
  assigned_to_text5d18d: any,
  setassigned_to_text5d18d:React.Dispatch<React.SetStateAction<any>>
  assigned_to_text5d18dProps: any 
  setassigned_to_text5d18dProps: React.Dispatch<React.SetStateAction<any>>
  assigned_to51299: any,
  setassigned_to51299:React.Dispatch<React.SetStateAction<any>>
  assigned_to51299Props: any 
  setassigned_to51299Props: React.Dispatch<React.SetStateAction<any>>
  assigned_at_text4a3af: any,
  setassigned_at_text4a3af:React.Dispatch<React.SetStateAction<any>>
  assigned_at_text4a3afProps: any 
  setassigned_at_text4a3afProps: React.Dispatch<React.SetStateAction<any>>
  assigned_bycb5ab: any,
  setassigned_bycb5ab:React.Dispatch<React.SetStateAction<any>>
  assigned_bycb5abProps: any 
  setassigned_bycb5abProps: React.Dispatch<React.SetStateAction<any>>
  condition_at_assign_text4ad2d: any,
  setcondition_at_assign_text4ad2d:React.Dispatch<React.SetStateAction<any>>
  condition_at_assign_text4ad2dProps: any 
  setcondition_at_assign_text4ad2dProps: React.Dispatch<React.SetStateAction<any>>
  condition_at_assignc35c4: any,
  setcondition_at_assignc35c4:React.Dispatch<React.SetStateAction<any>>
  condition_at_assignc35c4Props: any 
  setcondition_at_assignc35c4Props: React.Dispatch<React.SetStateAction<any>>
  expected_return_date_text80abb: any,
  setexpected_return_date_text80abb:React.Dispatch<React.SetStateAction<any>>
  expected_return_date_text80abbProps: any 
  setexpected_return_date_text80abbProps: React.Dispatch<React.SetStateAction<any>>
  expected_return_date11169: any,
  setexpected_return_date11169:React.Dispatch<React.SetStateAction<any>>
  expected_return_date11169Props: any 
  setexpected_return_date11169Props: React.Dispatch<React.SetStateAction<any>>
  confo_text66873: any,
  setconfo_text66873:React.Dispatch<React.SetStateAction<any>>
  confo_text66873Props: any 
  setconfo_text66873Props: React.Dispatch<React.SetStateAction<any>>
  assign_idf7b2f: any,
  setassign_idf7b2f:React.Dispatch<React.SetStateAction<any>>
  assign_idf7b2fProps: any 
  setassign_idf7b2fProps: React.Dispatch<React.SetStateAction<any>>
  cancel_button0c073: any,
  setcancel_button0c073:React.Dispatch<React.SetStateAction<any>>
  cancel_button0c073Props: any 
  setcancel_button0c073Props: React.Dispatch<React.SetStateAction<any>>
  ok_buttonfa294: any,
  setok_buttonfa294:React.Dispatch<React.SetStateAction<any>>
  ok_buttonfa294Props: any 
  setok_buttonfa294Props: React.Dispatch<React.SetStateAction<any>>
  asset_name_textbdd29: any,
  setasset_name_textbdd29:React.Dispatch<React.SetStateAction<any>>
  asset_name_textbdd29Props: any 
  setasset_name_textbdd29Props: React.Dispatch<React.SetStateAction<any>>
  asset_namee1fc6: any,
  setasset_namee1fc6:React.Dispatch<React.SetStateAction<any>>
  asset_namee1fc6Props: any 
  setasset_namee1fc6Props: React.Dispatch<React.SetStateAction<any>>
  assigned_to_text824e7: any,
  setassigned_to_text824e7:React.Dispatch<React.SetStateAction<any>>
  assigned_to_text824e7Props: any 
  setassigned_to_text824e7Props: React.Dispatch<React.SetStateAction<any>>
  assigned_to72696: any,
  setassigned_to72696:React.Dispatch<React.SetStateAction<any>>
  assigned_to72696Props: any 
  setassigned_to72696Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id0c7b6: any,
  setattachment_id0c7b6:React.Dispatch<React.SetStateAction<any>>
  attachment_id0c7b6Props: any 
  setattachment_id0c7b6Props: React.Dispatch<React.SetStateAction<any>>
  doc_group8e81a: any,
  setdoc_group8e81a:React.Dispatch<React.SetStateAction<any>>
  doc_group8e81aProps: any 
  setdoc_group8e81aProps: React.Dispatch<React.SetStateAction<any>>
  doc_nameb994a: any,
  setdoc_nameb994a:React.Dispatch<React.SetStateAction<any>>
  doc_nameb994aProps: any 
  setdoc_nameb994aProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date26a21: any,
  settrs_created_date26a21:React.Dispatch<React.SetStateAction<any>>
  trs_created_date26a21Props: any 
  settrs_created_date26a21Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_by95da2: any,
  settrs_created_by95da2:React.Dispatch<React.SetStateAction<any>>
  trs_created_by95da2Props: any 
  settrs_created_by95da2Props: React.Dispatch<React.SetStateAction<any>>
  bt_deletea6263: any,
  setbt_deletea6263:React.Dispatch<React.SetStateAction<any>>
  bt_deletea6263Props: any 
  setbt_deletea6263Props: React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel96f16: any,
  setdocumentuploadpanel96f16:React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel96f16Props: any 
  setdocumentuploadpanel96f16Props: React.Dispatch<React.SetStateAction<any>>
  button_add_doc8e522: any,
  setbutton_add_doc8e522:React.Dispatch<React.SetStateAction<any>>
  button_add_doc8e522Props: any 
  setbutton_add_doc8e522Props: React.Dispatch<React.SetStateAction<any>>
  assign_id67308: any,
  setassign_id67308:React.Dispatch<React.SetStateAction<any>>
  assign_id67308Props: any 
  setassign_id67308Props: React.Dispatch<React.SetStateAction<any>>
  delete_heading_text5f884: any,
  setdelete_heading_text5f884:React.Dispatch<React.SetStateAction<any>>
  delete_heading_text5f884Props: any 
  setdelete_heading_text5f884Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id_txt0f0d3: any,
  setattachment_id_txt0f0d3:React.Dispatch<React.SetStateAction<any>>
  attachment_id_txt0f0d3Props: any 
  setattachment_id_txt0f0d3Props: React.Dispatch<React.SetStateAction<any>>
  attachment_idea582: any,
  setattachment_idea582:React.Dispatch<React.SetStateAction<any>>
  attachment_idea582Props: any 
  setattachment_idea582Props: React.Dispatch<React.SetStateAction<any>>
  doc_group_text09f3f: any,
  setdoc_group_text09f3f:React.Dispatch<React.SetStateAction<any>>
  doc_group_text09f3fProps: any 
  setdoc_group_text09f3fProps: React.Dispatch<React.SetStateAction<any>>
  doc_group796b8: any,
  setdoc_group796b8:React.Dispatch<React.SetStateAction<any>>
  doc_group796b8Props: any 
  setdoc_group796b8Props: React.Dispatch<React.SetStateAction<any>>
  doc_name_text69cc2: any,
  setdoc_name_text69cc2:React.Dispatch<React.SetStateAction<any>>
  doc_name_text69cc2Props: any 
  setdoc_name_text69cc2Props: React.Dispatch<React.SetStateAction<any>>
  doc_name19bda: any,
  setdoc_name19bda:React.Dispatch<React.SetStateAction<any>>
  doc_name19bdaProps: any 
  setdoc_name19bdaProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_by_text805fb: any,
  settrs_created_by_text805fb:React.Dispatch<React.SetStateAction<any>>
  trs_created_by_text805fbProps: any 
  settrs_created_by_text805fbProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_by4c93f: any,
  settrs_created_by4c93f:React.Dispatch<React.SetStateAction<any>>
  trs_created_by4c93fProps: any 
  settrs_created_by4c93fProps: React.Dispatch<React.SetStateAction<any>>
  confo_text0c7c5: any,
  setconfo_text0c7c5:React.Dispatch<React.SetStateAction<any>>
  confo_text0c7c5Props: any 
  setconfo_text0c7c5Props: React.Dispatch<React.SetStateAction<any>>
  assign_id67319: any,
  setassign_id67319:React.Dispatch<React.SetStateAction<any>>
  assign_id67319Props: any 
  setassign_id67319Props: React.Dispatch<React.SetStateAction<any>>
  cancel_button7e1a2: any,
  setcancel_button7e1a2:React.Dispatch<React.SetStateAction<any>>
  cancel_button7e1a2Props: any 
  setcancel_button7e1a2Props: React.Dispatch<React.SetStateAction<any>>
  ok_buttonc63df: any,
  setok_buttonc63df:React.Dispatch<React.SetStateAction<any>>
  ok_buttonc63dfProps: any 
  setok_buttonc63dfProps: React.Dispatch<React.SetStateAction<any>>
  maintenance_text_icondf716: any,
  setmaintenance_text_icondf716:React.Dispatch<React.SetStateAction<any>>
  maintenance_text_icondf716Props: any 
  setmaintenance_text_icondf716Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_text0649c: any,
  setmaintenance_text0649c:React.Dispatch<React.SetStateAction<any>>
  maintenance_text0649cProps: any 
  setmaintenance_text0649cProps: React.Dispatch<React.SetStateAction<any>>
  search7f293: any,
  setsearch7f293:React.Dispatch<React.SetStateAction<any>>
  search7f293Props: any 
  setsearch7f293Props: React.Dispatch<React.SetStateAction<any>>
  log_maintenanced8874: any,
  setlog_maintenanced8874:React.Dispatch<React.SetStateAction<any>>
  log_maintenanced8874Props: any 
  setlog_maintenanced8874Props: React.Dispatch<React.SetStateAction<any>>
  refdaa81: any,
  setrefdaa81:React.Dispatch<React.SetStateAction<any>>
  refdaa81Props: any 
  setrefdaa81Props: React.Dispatch<React.SetStateAction<any>>
  asset_nameba6cd: any,
  setasset_nameba6cd:React.Dispatch<React.SetStateAction<any>>
  asset_nameba6cdProps: any 
  setasset_nameba6cdProps: React.Dispatch<React.SetStateAction<any>>
  maint_typeba0b9: any,
  setmaint_typeba0b9:React.Dispatch<React.SetStateAction<any>>
  maint_typeba0b9Props: any 
  setmaint_typeba0b9Props: React.Dispatch<React.SetStateAction<any>>
  descriptionc4b88: any,
  setdescriptionc4b88:React.Dispatch<React.SetStateAction<any>>
  descriptionc4b88Props: any 
  setdescriptionc4b88Props: React.Dispatch<React.SetStateAction<any>>
  vendor_name910b8: any,
  setvendor_name910b8:React.Dispatch<React.SetStateAction<any>>
  vendor_name910b8Props: any 
  setvendor_name910b8Props: React.Dispatch<React.SetStateAction<any>>
  scheduled_datee0685: any,
  setscheduled_datee0685:React.Dispatch<React.SetStateAction<any>>
  scheduled_datee0685Props: any 
  setscheduled_datee0685Props: React.Dispatch<React.SetStateAction<any>>
  cost7fb4b: any,
  setcost7fb4b:React.Dispatch<React.SetStateAction<any>>
  cost7fb4bProps: any 
  setcost7fb4bProps: React.Dispatch<React.SetStateAction<any>>
  status0d30b: any,
  setstatus0d30b:React.Dispatch<React.SetStateAction<any>>
  status0d30bProps: any 
  setstatus0d30bProps: React.Dispatch<React.SetStateAction<any>>
  view113d0: any,
  setview113d0:React.Dispatch<React.SetStateAction<any>>
  view113d0Props: any 
  setview113d0Props: React.Dispatch<React.SetStateAction<any>>
  bt_edit93fc7: any,
  setbt_edit93fc7:React.Dispatch<React.SetStateAction<any>>
  bt_edit93fc7Props: any 
  setbt_edit93fc7Props: React.Dispatch<React.SetStateAction<any>>
  bt_delete70a91: any,
  setbt_delete70a91:React.Dispatch<React.SetStateAction<any>>
  bt_delete70a91Props: any 
  setbt_delete70a91Props: React.Dispatch<React.SetStateAction<any>>
  maint_idd22c1: any,
  setmaint_idd22c1:React.Dispatch<React.SetStateAction<any>>
  maint_idd22c1Props: any 
  setmaint_idd22c1Props: React.Dispatch<React.SetStateAction<any>>
  advancesearch64153: any,
  setadvancesearch64153:React.Dispatch<React.SetStateAction<any>>
  advancesearch64153Props: any 
  setadvancesearch64153Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_information_text37a24: any,
  setmaintenance_information_text37a24:React.Dispatch<React.SetStateAction<any>>
  maintenance_information_text37a24Props: any 
  setmaintenance_information_text37a24Props: React.Dispatch<React.SetStateAction<any>>
  asset_namec21fd: any,
  setasset_namec21fd:React.Dispatch<React.SetStateAction<any>>
  asset_namec21fdProps: any 
  setasset_namec21fdProps: React.Dispatch<React.SetStateAction<any>>
  maint_typea5ba4: any,
  setmaint_typea5ba4:React.Dispatch<React.SetStateAction<any>>
  maint_typea5ba4Props: any 
  setmaint_typea5ba4Props: React.Dispatch<React.SetStateAction<any>>
  priorityec586: any,
  setpriorityec586:React.Dispatch<React.SetStateAction<any>>
  priorityec586Props: any 
  setpriorityec586Props: React.Dispatch<React.SetStateAction<any>>
  scheduled_date83e9d: any,
  setscheduled_date83e9d:React.Dispatch<React.SetStateAction<any>>
  scheduled_date83e9dProps: any 
  setscheduled_date83e9dProps: React.Dispatch<React.SetStateAction<any>>
  completed_dated052f: any,
  setcompleted_dated052f:React.Dispatch<React.SetStateAction<any>>
  completed_dated052fProps: any 
  setcompleted_dated052fProps: React.Dispatch<React.SetStateAction<any>>
  next_maintenance_datee871a: any,
  setnext_maintenance_datee871a:React.Dispatch<React.SetStateAction<any>>
  next_maintenance_datee871aProps: any 
  setnext_maintenance_datee871aProps: React.Dispatch<React.SetStateAction<any>>
  execution_details_text71309: any,
  setexecution_details_text71309:React.Dispatch<React.SetStateAction<any>>
  execution_details_text71309Props: any 
  setexecution_details_text71309Props: React.Dispatch<React.SetStateAction<any>>
  performed_bycb4dc: any,
  setperformed_bycb4dc:React.Dispatch<React.SetStateAction<any>>
  performed_bycb4dcProps: any 
  setperformed_bycb4dcProps: React.Dispatch<React.SetStateAction<any>>
  vendor_name17b17: any,
  setvendor_name17b17:React.Dispatch<React.SetStateAction<any>>
  vendor_name17b17Props: any 
  setvendor_name17b17Props: React.Dispatch<React.SetStateAction<any>>
  vendor_referencefa982: any,
  setvendor_referencefa982:React.Dispatch<React.SetStateAction<any>>
  vendor_referencefa982Props: any 
  setvendor_referencefa982Props: React.Dispatch<React.SetStateAction<any>>
  downtime_hours721c7: any,
  setdowntime_hours721c7:React.Dispatch<React.SetStateAction<any>>
  downtime_hours721c7Props: any 
  setdowntime_hours721c7Props: React.Dispatch<React.SetStateAction<any>>
  cost35190: any,
  setcost35190:React.Dispatch<React.SetStateAction<any>>
  cost35190Props: any 
  setcost35190Props: React.Dispatch<React.SetStateAction<any>>
  descriptioneaa55: any,
  setdescriptioneaa55:React.Dispatch<React.SetStateAction<any>>
  descriptioneaa55Props: any 
  setdescriptioneaa55Props: React.Dispatch<React.SetStateAction<any>>
  maintenance_checklist024ed: any,
  setmaintenance_checklist024ed:React.Dispatch<React.SetStateAction<any>>
  maintenance_checklist024edProps: any 
  setmaintenance_checklist024edProps: React.Dispatch<React.SetStateAction<any>>
  maint_id9587d: any,
  setmaint_id9587d:React.Dispatch<React.SetStateAction<any>>
  maint_id9587dProps: any 
  setmaint_id9587dProps: React.Dispatch<React.SetStateAction<any>>
  button_cancel02d05: any,
  setbutton_cancel02d05:React.Dispatch<React.SetStateAction<any>>
  button_cancel02d05Props: any 
  setbutton_cancel02d05Props: React.Dispatch<React.SetStateAction<any>>
  button_update5cdad: any,
  setbutton_update5cdad:React.Dispatch<React.SetStateAction<any>>
  button_update5cdadProps: any 
  setbutton_update5cdadProps: React.Dispatch<React.SetStateAction<any>>
  schedule133fb: any,
  setschedule133fb:React.Dispatch<React.SetStateAction<any>>
  schedule133fbProps: any 
  setschedule133fbProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_text64ac6: any,
  setdelete_heading_text64ac6:React.Dispatch<React.SetStateAction<any>>
  delete_heading_text64ac6Props: any 
  setdelete_heading_text64ac6Props: React.Dispatch<React.SetStateAction<any>>
  asset_name_text99dc6: any,
  setasset_name_text99dc6:React.Dispatch<React.SetStateAction<any>>
  asset_name_text99dc6Props: any 
  setasset_name_text99dc6Props: React.Dispatch<React.SetStateAction<any>>
  asset_name9f8b1: any,
  setasset_name9f8b1:React.Dispatch<React.SetStateAction<any>>
  asset_name9f8b1Props: any 
  setasset_name9f8b1Props: React.Dispatch<React.SetStateAction<any>>
  maint_type_textf805a: any,
  setmaint_type_textf805a:React.Dispatch<React.SetStateAction<any>>
  maint_type_textf805aProps: any 
  setmaint_type_textf805aProps: React.Dispatch<React.SetStateAction<any>>
  maint_typefc524: any,
  setmaint_typefc524:React.Dispatch<React.SetStateAction<any>>
  maint_typefc524Props: any 
  setmaint_typefc524Props: React.Dispatch<React.SetStateAction<any>>
  priority_text5afe4: any,
  setpriority_text5afe4:React.Dispatch<React.SetStateAction<any>>
  priority_text5afe4Props: any 
  setpriority_text5afe4Props: React.Dispatch<React.SetStateAction<any>>
  priority1b975: any,
  setpriority1b975:React.Dispatch<React.SetStateAction<any>>
  priority1b975Props: any 
  setpriority1b975Props: React.Dispatch<React.SetStateAction<any>>
  schedule_date_textc8d71: any,
  setschedule_date_textc8d71:React.Dispatch<React.SetStateAction<any>>
  schedule_date_textc8d71Props: any 
  setschedule_date_textc8d71Props: React.Dispatch<React.SetStateAction<any>>
  schedule_dateef711: any,
  setschedule_dateef711:React.Dispatch<React.SetStateAction<any>>
  schedule_dateef711Props: any 
  setschedule_dateef711Props: React.Dispatch<React.SetStateAction<any>>
  performed_by_textb5193: any,
  setperformed_by_textb5193:React.Dispatch<React.SetStateAction<any>>
  performed_by_textb5193Props: any 
  setperformed_by_textb5193Props: React.Dispatch<React.SetStateAction<any>>
  performed_byc179b: any,
  setperformed_byc179b:React.Dispatch<React.SetStateAction<any>>
  performed_byc179bProps: any 
  setperformed_byc179bProps: React.Dispatch<React.SetStateAction<any>>
  confo_text7649e: any,
  setconfo_text7649e:React.Dispatch<React.SetStateAction<any>>
  confo_text7649eProps: any 
  setconfo_text7649eProps: React.Dispatch<React.SetStateAction<any>>
  maint_id927de: any,
  setmaint_id927de:React.Dispatch<React.SetStateAction<any>>
  maint_id927deProps: any 
  setmaint_id927deProps: React.Dispatch<React.SetStateAction<any>>
  cancel_button36974: any,
  setcancel_button36974:React.Dispatch<React.SetStateAction<any>>
  cancel_button36974Props: any 
  setcancel_button36974Props: React.Dispatch<React.SetStateAction<any>>
  ok_buttond1793: any,
  setok_buttond1793:React.Dispatch<React.SetStateAction<any>>
  ok_buttond1793Props: any 
  setok_buttond1793Props: React.Dispatch<React.SetStateAction<any>>
  disposal_text_icon59950: any,
  setdisposal_text_icon59950:React.Dispatch<React.SetStateAction<any>>
  disposal_text_icon59950Props: any 
  setdisposal_text_icon59950Props: React.Dispatch<React.SetStateAction<any>>
  disposal_text2d2ac: any,
  setdisposal_text2d2ac:React.Dispatch<React.SetStateAction<any>>
  disposal_text2d2acProps: any 
  setdisposal_text2d2acProps: React.Dispatch<React.SetStateAction<any>>
  searchc5de1: any,
  setsearchc5de1:React.Dispatch<React.SetStateAction<any>>
  searchc5de1Props: any 
  setsearchc5de1Props: React.Dispatch<React.SetStateAction<any>>
  initiate_disposal27af5: any,
  setinitiate_disposal27af5:React.Dispatch<React.SetStateAction<any>>
  initiate_disposal27af5Props: any 
  setinitiate_disposal27af5Props: React.Dispatch<React.SetStateAction<any>>
  disposal_id46e83: any,
  setdisposal_id46e83:React.Dispatch<React.SetStateAction<any>>
  disposal_id46e83Props: any 
  setdisposal_id46e83Props: React.Dispatch<React.SetStateAction<any>>
  disposal_methodba6cd: any,
  setdisposal_methodba6cd:React.Dispatch<React.SetStateAction<any>>
  disposal_methodba6cdProps: any 
  setdisposal_methodba6cdProps: React.Dispatch<React.SetStateAction<any>>
  disposal_datee0685: any,
  setdisposal_datee0685:React.Dispatch<React.SetStateAction<any>>
  disposal_datee0685Props: any 
  setdisposal_datee0685Props: React.Dispatch<React.SetStateAction<any>>
  witness_nameba0b9: any,
  setwitness_nameba0b9:React.Dispatch<React.SetStateAction<any>>
  witness_nameba0b9Props: any 
  setwitness_nameba0b9Props: React.Dispatch<React.SetStateAction<any>>
  data_wipe_methodc4b88: any,
  setdata_wipe_methodc4b88:React.Dispatch<React.SetStateAction<any>>
  data_wipe_methodc4b88Props: any 
  setdata_wipe_methodc4b88Props: React.Dispatch<React.SetStateAction<any>>
  disposal_cost910b8: any,
  setdisposal_cost910b8:React.Dispatch<React.SetStateAction<any>>
  disposal_cost910b8Props: any 
  setdisposal_cost910b8Props: React.Dispatch<React.SetStateAction<any>>
  view6b7cc: any,
  setview6b7cc:React.Dispatch<React.SetStateAction<any>>
  view6b7ccProps: any 
  setview6b7ccProps: React.Dispatch<React.SetStateAction<any>>
  bt_editb236b: any,
  setbt_editb236b:React.Dispatch<React.SetStateAction<any>>
  bt_editb236bProps: any 
  setbt_editb236bProps: React.Dispatch<React.SetStateAction<any>>
  disposal_details0c71e: any,
  setdisposal_details0c71e:React.Dispatch<React.SetStateAction<any>>
  disposal_details0c71eProps: any 
  setdisposal_details0c71eProps: React.Dispatch<React.SetStateAction<any>>
  vendor_nameabdbb: any,
  setvendor_nameabdbb:React.Dispatch<React.SetStateAction<any>>
  vendor_nameabdbbProps: any 
  setvendor_nameabdbbProps: React.Dispatch<React.SetStateAction<any>>
  asset_name819e8: any,
  setasset_name819e8:React.Dispatch<React.SetStateAction<any>>
  asset_name819e8Props: any 
  setasset_name819e8Props: React.Dispatch<React.SetStateAction<any>>
  disposal_methoddeb30: any,
  setdisposal_methoddeb30:React.Dispatch<React.SetStateAction<any>>
  disposal_methoddeb30Props: any 
  setdisposal_methoddeb30Props: React.Dispatch<React.SetStateAction<any>>
  disposal_date12263: any,
  setdisposal_date12263:React.Dispatch<React.SetStateAction<any>>
  disposal_date12263Props: any 
  setdisposal_date12263Props: React.Dispatch<React.SetStateAction<any>>
  reasonadb68: any,
  setreasonadb68:React.Dispatch<React.SetStateAction<any>>
  reasonadb68Props: any 
  setreasonadb68Props: React.Dispatch<React.SetStateAction<any>>
  compliance_financial664f8: any,
  setcompliance_financial664f8:React.Dispatch<React.SetStateAction<any>>
  compliance_financial664f8Props: any 
  setcompliance_financial664f8Props: React.Dispatch<React.SetStateAction<any>>
  approval_reference5e1aa: any,
  setapproval_reference5e1aa:React.Dispatch<React.SetStateAction<any>>
  approval_reference5e1aaProps: any 
  setapproval_reference5e1aaProps: React.Dispatch<React.SetStateAction<any>>
  witness_nameac8f7: any,
  setwitness_nameac8f7:React.Dispatch<React.SetStateAction<any>>
  witness_nameac8f7Props: any 
  setwitness_nameac8f7Props: React.Dispatch<React.SetStateAction<any>>
  data_wipe_methodfe1e6: any,
  setdata_wipe_methodfe1e6:React.Dispatch<React.SetStateAction<any>>
  data_wipe_methodfe1e6Props: any 
  setdata_wipe_methodfe1e6Props: React.Dispatch<React.SetStateAction<any>>
  data_wipedad12b: any,
  setdata_wipedad12b:React.Dispatch<React.SetStateAction<any>>
  data_wipedad12bProps: any 
  setdata_wipedad12bProps: React.Dispatch<React.SetStateAction<any>>
  disposal_valued21f4: any,
  setdisposal_valued21f4:React.Dispatch<React.SetStateAction<any>>
  disposal_valued21f4Props: any 
  setdisposal_valued21f4Props: React.Dispatch<React.SetStateAction<any>>
  disposal_cost031f6: any,
  setdisposal_cost031f6:React.Dispatch<React.SetStateAction<any>>
  disposal_cost031f6Props: any 
  setdisposal_cost031f6Props: React.Dispatch<React.SetStateAction<any>>
  resale_amount2eb0e: any,
  setresale_amount2eb0e:React.Dispatch<React.SetStateAction<any>>
  resale_amount2eb0eProps: any 
  setresale_amount2eb0eProps: React.Dispatch<React.SetStateAction<any>>
  cancel62a73: any,
  setcancel62a73:React.Dispatch<React.SetStateAction<any>>
  cancel62a73Props: any 
  setcancel62a73Props: React.Dispatch<React.SetStateAction<any>>
  update92b0c: any,
  setupdate92b0c:React.Dispatch<React.SetStateAction<any>>
  update92b0cProps: any 
  setupdate92b0cProps: React.Dispatch<React.SetStateAction<any>>
  initiate_disposal1b938: any,
  setinitiate_disposal1b938:React.Dispatch<React.SetStateAction<any>>
  initiate_disposal1b938Props: any 
  setinitiate_disposal1b938Props: React.Dispatch<React.SetStateAction<any>>
  disposal_details1d5ee: any,
  setdisposal_details1d5ee:React.Dispatch<React.SetStateAction<any>>
  disposal_details1d5eeProps: any 
  setdisposal_details1d5eeProps: React.Dispatch<React.SetStateAction<any>>
  vendor_name5f557: any,
  setvendor_name5f557:React.Dispatch<React.SetStateAction<any>>
  vendor_name5f557Props: any 
  setvendor_name5f557Props: React.Dispatch<React.SetStateAction<any>>
  asset_name298df: any,
  setasset_name298df:React.Dispatch<React.SetStateAction<any>>
  asset_name298dfProps: any 
  setasset_name298dfProps: React.Dispatch<React.SetStateAction<any>>
  disposal_methoda093b: any,
  setdisposal_methoda093b:React.Dispatch<React.SetStateAction<any>>
  disposal_methoda093bProps: any 
  setdisposal_methoda093bProps: React.Dispatch<React.SetStateAction<any>>
  disposal_date247ef: any,
  setdisposal_date247ef:React.Dispatch<React.SetStateAction<any>>
  disposal_date247efProps: any 
  setdisposal_date247efProps: React.Dispatch<React.SetStateAction<any>>
  reason8b938: any,
  setreason8b938:React.Dispatch<React.SetStateAction<any>>
  reason8b938Props: any 
  setreason8b938Props: React.Dispatch<React.SetStateAction<any>>
  compliance_financialc9043: any,
  setcompliance_financialc9043:React.Dispatch<React.SetStateAction<any>>
  compliance_financialc9043Props: any 
  setcompliance_financialc9043Props: React.Dispatch<React.SetStateAction<any>>
  approval_referenceb0a46: any,
  setapproval_referenceb0a46:React.Dispatch<React.SetStateAction<any>>
  approval_referenceb0a46Props: any 
  setapproval_referenceb0a46Props: React.Dispatch<React.SetStateAction<any>>
  witness_name6fddf: any,
  setwitness_name6fddf:React.Dispatch<React.SetStateAction<any>>
  witness_name6fddfProps: any 
  setwitness_name6fddfProps: React.Dispatch<React.SetStateAction<any>>
  data_wipe_method8923d: any,
  setdata_wipe_method8923d:React.Dispatch<React.SetStateAction<any>>
  data_wipe_method8923dProps: any 
  setdata_wipe_method8923dProps: React.Dispatch<React.SetStateAction<any>>
  data_wipeda4257: any,
  setdata_wipeda4257:React.Dispatch<React.SetStateAction<any>>
  data_wipeda4257Props: any 
  setdata_wipeda4257Props: React.Dispatch<React.SetStateAction<any>>
  disposal_value13578: any,
  setdisposal_value13578:React.Dispatch<React.SetStateAction<any>>
  disposal_value13578Props: any 
  setdisposal_value13578Props: React.Dispatch<React.SetStateAction<any>>
  disposal_cost23f44: any,
  setdisposal_cost23f44:React.Dispatch<React.SetStateAction<any>>
  disposal_cost23f44Props: any 
  setdisposal_cost23f44Props: React.Dispatch<React.SetStateAction<any>>
  resale_amount5336f: any,
  setresale_amount5336f:React.Dispatch<React.SetStateAction<any>>
  resale_amount5336fProps: any 
  setresale_amount5336fProps: React.Dispatch<React.SetStateAction<any>>
  disposal_idee44c: any,
  setdisposal_idee44c:React.Dispatch<React.SetStateAction<any>>
  disposal_idee44cProps: any 
  setdisposal_idee44cProps: React.Dispatch<React.SetStateAction<any>>
  total_category_divider52a07: any,
  settotal_category_divider52a07:React.Dispatch<React.SetStateAction<any>>
  total_category_divider52a07Props: any 
  settotal_category_divider52a07Props: React.Dispatch<React.SetStateAction<any>>
  tc_icon1ed4f: any,
  settc_icon1ed4f:React.Dispatch<React.SetStateAction<any>>
  tc_icon1ed4fProps: any 
  settc_icon1ed4fProps: React.Dispatch<React.SetStateAction<any>>
  total_category_textb2d2f: any,
  settotal_category_textb2d2f:React.Dispatch<React.SetStateAction<any>>
  total_category_textb2d2fProps: any 
  settotal_category_textb2d2fProps: React.Dispatch<React.SetStateAction<any>>
  total_categories55fa9: any,
  settotal_categories55fa9:React.Dispatch<React.SetStateAction<any>>
  total_categories55fa9Props: any 
  settotal_categories55fa9Props: React.Dispatch<React.SetStateAction<any>>
  sw_cat_divider016f6: any,
  setsw_cat_divider016f6:React.Dispatch<React.SetStateAction<any>>
  sw_cat_divider016f6Props: any 
  setsw_cat_divider016f6Props: React.Dispatch<React.SetStateAction<any>>
  sc_icon481ef: any,
  setsc_icon481ef:React.Dispatch<React.SetStateAction<any>>
  sc_icon481efProps: any 
  setsc_icon481efProps: React.Dispatch<React.SetStateAction<any>>
  software_category_text202b3: any,
  setsoftware_category_text202b3:React.Dispatch<React.SetStateAction<any>>
  software_category_text202b3Props: any 
  setsoftware_category_text202b3Props: React.Dispatch<React.SetStateAction<any>>
  software_category5cc47: any,
  setsoftware_category5cc47:React.Dispatch<React.SetStateAction<any>>
  software_category5cc47Props: any 
  setsoftware_category5cc47Props: React.Dispatch<React.SetStateAction<any>>
  hw_cat_divider1452f: any,
  sethw_cat_divider1452f:React.Dispatch<React.SetStateAction<any>>
  hw_cat_divider1452fProps: any 
  sethw_cat_divider1452fProps: React.Dispatch<React.SetStateAction<any>>
  sc_iconbaaa3: any,
  setsc_iconbaaa3:React.Dispatch<React.SetStateAction<any>>
  sc_iconbaaa3Props: any 
  setsc_iconbaaa3Props: React.Dispatch<React.SetStateAction<any>>
  hardware_category_text66f11: any,
  sethardware_category_text66f11:React.Dispatch<React.SetStateAction<any>>
  hardware_category_text66f11Props: any 
  sethardware_category_text66f11Props: React.Dispatch<React.SetStateAction<any>>
  hardware_categoryad98e: any,
  sethardware_categoryad98e:React.Dispatch<React.SetStateAction<any>>
  hardware_categoryad98eProps: any 
  sethardware_categoryad98eProps: React.Dispatch<React.SetStateAction<any>>
  hw_cat_divider5f14c: any,
  sethw_cat_divider5f14c:React.Dispatch<React.SetStateAction<any>>
  hw_cat_divider5f14cProps: any 
  sethw_cat_divider5f14cProps: React.Dispatch<React.SetStateAction<any>>
  sc_iconefedc: any,
  setsc_iconefedc:React.Dispatch<React.SetStateAction<any>>
  sc_iconefedcProps: any 
  setsc_iconefedcProps: React.Dispatch<React.SetStateAction<any>>
  req_maintenance027c1: any,
  setreq_maintenance027c1:React.Dispatch<React.SetStateAction<any>>
  req_maintenance027c1Props: any 
  setreq_maintenance027c1Props: React.Dispatch<React.SetStateAction<any>>
  required_maintenance9ce1e: any,
  setrequired_maintenance9ce1e:React.Dispatch<React.SetStateAction<any>>
  required_maintenance9ce1eProps: any 
  setrequired_maintenance9ce1eProps: React.Dispatch<React.SetStateAction<any>>
  categorytext_icond59a8: any,
  setcategorytext_icond59a8:React.Dispatch<React.SetStateAction<any>>
  categorytext_icond59a8Props: any 
  setcategorytext_icond59a8Props: React.Dispatch<React.SetStateAction<any>>
  categorytextbfea2: any,
  setcategorytextbfea2:React.Dispatch<React.SetStateAction<any>>
  categorytextbfea2Props: any 
  setcategorytextbfea2Props: React.Dispatch<React.SetStateAction<any>>
  search48da3: any,
  setsearch48da3:React.Dispatch<React.SetStateAction<any>>
  search48da3Props: any 
  setsearch48da3Props: React.Dispatch<React.SetStateAction<any>>
  button_add_category57a00: any,
  setbutton_add_category57a00:React.Dispatch<React.SetStateAction<any>>
  button_add_category57a00Props: any 
  setbutton_add_category57a00Props: React.Dispatch<React.SetStateAction<any>>
  acat_id37980: any,
  setacat_id37980:React.Dispatch<React.SetStateAction<any>>
  acat_id37980Props: any 
  setacat_id37980Props: React.Dispatch<React.SetStateAction<any>>
  category_code97856: any,
  setcategory_code97856:React.Dispatch<React.SetStateAction<any>>
  category_code97856Props: any 
  setcategory_code97856Props: React.Dispatch<React.SetStateAction<any>>
  asset_prefix8b10c: any,
  setasset_prefix8b10c:React.Dispatch<React.SetStateAction<any>>
  asset_prefix8b10cProps: any 
  setasset_prefix8b10cProps: React.Dispatch<React.SetStateAction<any>>
  category_name11d7f: any,
  setcategory_name11d7f:React.Dispatch<React.SetStateAction<any>>
  category_name11d7fProps: any 
  setcategory_name11d7fProps: React.Dispatch<React.SetStateAction<any>>
  depreciation_method2b046: any,
  setdepreciation_method2b046:React.Dispatch<React.SetStateAction<any>>
  depreciation_method2b046Props: any 
  setdepreciation_method2b046Props: React.Dispatch<React.SetStateAction<any>>
  useful_life_years73932: any,
  setuseful_life_years73932:React.Dispatch<React.SetStateAction<any>>
  useful_life_years73932Props: any 
  setuseful_life_years73932Props: React.Dispatch<React.SetStateAction<any>>
  bt_edit226cc: any,
  setbt_edit226cc:React.Dispatch<React.SetStateAction<any>>
  bt_edit226ccProps: any 
  setbt_edit226ccProps: React.Dispatch<React.SetStateAction<any>>
  bt_deleteebf73: any,
  setbt_deleteebf73:React.Dispatch<React.SetStateAction<any>>
  bt_deleteebf73Props: any 
  setbt_deleteebf73Props: React.Dispatch<React.SetStateAction<any>>
  view0d148: any,
  setview0d148:React.Dispatch<React.SetStateAction<any>>
  view0d148Props: any 
  setview0d148Props: React.Dispatch<React.SetStateAction<any>>
  bt_add_doc2ee68: any,
  setbt_add_doc2ee68:React.Dispatch<React.SetStateAction<any>>
  bt_add_doc2ee68Props: any 
  setbt_add_doc2ee68Props: React.Dispatch<React.SetStateAction<any>>
  advancesearchfab99: any,
  setadvancesearchfab99:React.Dispatch<React.SetStateAction<any>>
  advancesearchfab99Props: any 
  setadvancesearchfab99Props: React.Dispatch<React.SetStateAction<any>>
  category_information_text3e9d2: any,
  setcategory_information_text3e9d2:React.Dispatch<React.SetStateAction<any>>
  category_information_text3e9d2Props: any 
  setcategory_information_text3e9d2Props: React.Dispatch<React.SetStateAction<any>>
  category_code60d4a: any,
  setcategory_code60d4a:React.Dispatch<React.SetStateAction<any>>
  category_code60d4aProps: any 
  setcategory_code60d4aProps: React.Dispatch<React.SetStateAction<any>>
  category_name69309: any,
  setcategory_name69309:React.Dispatch<React.SetStateAction<any>>
  category_name69309Props: any 
  setcategory_name69309Props: React.Dispatch<React.SetStateAction<any>>
  parent_category_namec5eb6: any,
  setparent_category_namec5eb6:React.Dispatch<React.SetStateAction<any>>
  parent_category_namec5eb6Props: any 
  setparent_category_namec5eb6Props: React.Dispatch<React.SetStateAction<any>>
  asset_prefix16715: any,
  setasset_prefix16715:React.Dispatch<React.SetStateAction<any>>
  asset_prefix16715Props: any 
  setasset_prefix16715Props: React.Dispatch<React.SetStateAction<any>>
  category_configuration_text00171: any,
  setcategory_configuration_text00171:React.Dispatch<React.SetStateAction<any>>
  category_configuration_text00171Props: any 
  setcategory_configuration_text00171Props: React.Dispatch<React.SetStateAction<any>>
  depreciation_methodfa7cb: any,
  setdepreciation_methodfa7cb:React.Dispatch<React.SetStateAction<any>>
  depreciation_methodfa7cbProps: any 
  setdepreciation_methodfa7cbProps: React.Dispatch<React.SetStateAction<any>>
  useful_life_years231a3: any,
  setuseful_life_years231a3:React.Dispatch<React.SetStateAction<any>>
  useful_life_years231a3Props: any 
  setuseful_life_years231a3Props: React.Dispatch<React.SetStateAction<any>>
  acat_idba9a2: any,
  setacat_idba9a2:React.Dispatch<React.SetStateAction<any>>
  acat_idba9a2Props: any 
  setacat_idba9a2Props: React.Dispatch<React.SetStateAction<any>>
  button_cancel847fd: any,
  setbutton_cancel847fd:React.Dispatch<React.SetStateAction<any>>
  button_cancel847fdProps: any 
  setbutton_cancel847fdProps: React.Dispatch<React.SetStateAction<any>>
  button_update74a1f: any,
  setbutton_update74a1f:React.Dispatch<React.SetStateAction<any>>
  button_update74a1fProps: any 
  setbutton_update74a1fProps: React.Dispatch<React.SetStateAction<any>>
  bt_add_category240df: any,
  setbt_add_category240df:React.Dispatch<React.SetStateAction<any>>
  bt_add_category240dfProps: any 
  setbt_add_category240dfProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_textb1f29: any,
  setdelete_heading_textb1f29:React.Dispatch<React.SetStateAction<any>>
  delete_heading_textb1f29Props: any 
  setdelete_heading_textb1f29Props: React.Dispatch<React.SetStateAction<any>>
  category_code_text0975e: any,
  setcategory_code_text0975e:React.Dispatch<React.SetStateAction<any>>
  category_code_text0975eProps: any 
  setcategory_code_text0975eProps: React.Dispatch<React.SetStateAction<any>>
  category_codef16a8: any,
  setcategory_codef16a8:React.Dispatch<React.SetStateAction<any>>
  category_codef16a8Props: any 
  setcategory_codef16a8Props: React.Dispatch<React.SetStateAction<any>>
  category_name_text7648e: any,
  setcategory_name_text7648e:React.Dispatch<React.SetStateAction<any>>
  category_name_text7648eProps: any 
  setcategory_name_text7648eProps: React.Dispatch<React.SetStateAction<any>>
  category_namecbc0b: any,
  setcategory_namecbc0b:React.Dispatch<React.SetStateAction<any>>
  category_namecbc0bProps: any 
  setcategory_namecbc0bProps: React.Dispatch<React.SetStateAction<any>>
  depreciation_method_text82fb3: any,
  setdepreciation_method_text82fb3:React.Dispatch<React.SetStateAction<any>>
  depreciation_method_text82fb3Props: any 
  setdepreciation_method_text82fb3Props: React.Dispatch<React.SetStateAction<any>>
  depreciation_method0e872: any,
  setdepreciation_method0e872:React.Dispatch<React.SetStateAction<any>>
  depreciation_method0e872Props: any 
  setdepreciation_method0e872Props: React.Dispatch<React.SetStateAction<any>>
  useful_life_years_text30347: any,
  setuseful_life_years_text30347:React.Dispatch<React.SetStateAction<any>>
  useful_life_years_text30347Props: any 
  setuseful_life_years_text30347Props: React.Dispatch<React.SetStateAction<any>>
  useful_life_yearsa64db: any,
  setuseful_life_yearsa64db:React.Dispatch<React.SetStateAction<any>>
  useful_life_yearsa64dbProps: any 
  setuseful_life_yearsa64dbProps: React.Dispatch<React.SetStateAction<any>>
  maintenance_required_textf1aaf: any,
  setmaintenance_required_textf1aaf:React.Dispatch<React.SetStateAction<any>>
  maintenance_required_textf1aafProps: any 
  setmaintenance_required_textf1aafProps: React.Dispatch<React.SetStateAction<any>>
  maintenance_required336be: any,
  setmaintenance_required336be:React.Dispatch<React.SetStateAction<any>>
  maintenance_required336beProps: any 
  setmaintenance_required336beProps: React.Dispatch<React.SetStateAction<any>>
  confo_texte7cc3: any,
  setconfo_texte7cc3:React.Dispatch<React.SetStateAction<any>>
  confo_texte7cc3Props: any 
  setconfo_texte7cc3Props: React.Dispatch<React.SetStateAction<any>>
  acat_id9127b: any,
  setacat_id9127b:React.Dispatch<React.SetStateAction<any>>
  acat_id9127bProps: any 
  setacat_id9127bProps: React.Dispatch<React.SetStateAction<any>>
  cancel_buttonc0568: any,
  setcancel_buttonc0568:React.Dispatch<React.SetStateAction<any>>
  cancel_buttonc0568Props: any 
  setcancel_buttonc0568Props: React.Dispatch<React.SetStateAction<any>>
  ok_buttonc8577: any,
  setok_buttonc8577:React.Dispatch<React.SetStateAction<any>>
  ok_buttonc8577Props: any 
  setok_buttonc8577Props: React.Dispatch<React.SetStateAction<any>>
  category_information_textf1933: any,
  setcategory_information_textf1933:React.Dispatch<React.SetStateAction<any>>
  category_information_textf1933Props: any 
  setcategory_information_textf1933Props: React.Dispatch<React.SetStateAction<any>>
  category_codeeb8f1: any,
  setcategory_codeeb8f1:React.Dispatch<React.SetStateAction<any>>
  category_codeeb8f1Props: any 
  setcategory_codeeb8f1Props: React.Dispatch<React.SetStateAction<any>>
  category_name2a1ea: any,
  setcategory_name2a1ea:React.Dispatch<React.SetStateAction<any>>
  category_name2a1eaProps: any 
  setcategory_name2a1eaProps: React.Dispatch<React.SetStateAction<any>>
  parent_category_name9a67f: any,
  setparent_category_name9a67f:React.Dispatch<React.SetStateAction<any>>
  parent_category_name9a67fProps: any 
  setparent_category_name9a67fProps: React.Dispatch<React.SetStateAction<any>>
  asset_prefix5007a: any,
  setasset_prefix5007a:React.Dispatch<React.SetStateAction<any>>
  asset_prefix5007aProps: any 
  setasset_prefix5007aProps: React.Dispatch<React.SetStateAction<any>>
  category_configuration_text66228: any,
  setcategory_configuration_text66228:React.Dispatch<React.SetStateAction<any>>
  category_configuration_text66228Props: any 
  setcategory_configuration_text66228Props: React.Dispatch<React.SetStateAction<any>>
  depreciation_method50f2f: any,
  setdepreciation_method50f2f:React.Dispatch<React.SetStateAction<any>>
  depreciation_method50f2fProps: any 
  setdepreciation_method50f2fProps: React.Dispatch<React.SetStateAction<any>>
  useful_life_years864b4: any,
  setuseful_life_years864b4:React.Dispatch<React.SetStateAction<any>>
  useful_life_years864b4Props: any 
  setuseful_life_years864b4Props: React.Dispatch<React.SetStateAction<any>>
  acat_id298b7: any,
  setacat_id298b7:React.Dispatch<React.SetStateAction<any>>
  acat_id298b7Props: any 
  setacat_id298b7Props: React.Dispatch<React.SetStateAction<any>>
  acat_id_text04690: any,
  setacat_id_text04690:React.Dispatch<React.SetStateAction<any>>
  acat_id_text04690Props: any 
  setacat_id_text04690Props: React.Dispatch<React.SetStateAction<any>>
  acat_ida2d51: any,
  setacat_ida2d51:React.Dispatch<React.SetStateAction<any>>
  acat_ida2d51Props: any 
  setacat_ida2d51Props: React.Dispatch<React.SetStateAction<any>>
  acat_name_textc9d3e: any,
  setacat_name_textc9d3e:React.Dispatch<React.SetStateAction<any>>
  acat_name_textc9d3eProps: any 
  setacat_name_textc9d3eProps: React.Dispatch<React.SetStateAction<any>>
  category_name4ccfb: any,
  setcategory_name4ccfb:React.Dispatch<React.SetStateAction<any>>
  category_name4ccfbProps: any 
  setcategory_name4ccfbProps: React.Dispatch<React.SetStateAction<any>>
  attachment_id9b438: any,
  setattachment_id9b438:React.Dispatch<React.SetStateAction<any>>
  attachment_id9b438Props: any 
  setattachment_id9b438Props: React.Dispatch<React.SetStateAction<any>>
  doc_group344aa: any,
  setdoc_group344aa:React.Dispatch<React.SetStateAction<any>>
  doc_group344aaProps: any 
  setdoc_group344aaProps: React.Dispatch<React.SetStateAction<any>>
  doc_namef124d: any,
  setdoc_namef124d:React.Dispatch<React.SetStateAction<any>>
  doc_namef124dProps: any 
  setdoc_namef124dProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_date16faa: any,
  settrs_created_date16faa:React.Dispatch<React.SetStateAction<any>>
  trs_created_date16faaProps: any 
  settrs_created_date16faaProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_byfb6e3: any,
  settrs_created_byfb6e3:React.Dispatch<React.SetStateAction<any>>
  trs_created_byfb6e3Props: any 
  settrs_created_byfb6e3Props: React.Dispatch<React.SetStateAction<any>>
  bt_delete61896: any,
  setbt_delete61896:React.Dispatch<React.SetStateAction<any>>
  bt_delete61896Props: any 
  setbt_delete61896Props: React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel643f7: any,
  setdocumentuploadpanel643f7:React.Dispatch<React.SetStateAction<any>>
  documentuploadpanel643f7Props: any 
  setdocumentuploadpanel643f7Props: React.Dispatch<React.SetStateAction<any>>
  button_add_doc24b11: any,
  setbutton_add_doc24b11:React.Dispatch<React.SetStateAction<any>>
  button_add_doc24b11Props: any 
  setbutton_add_doc24b11Props: React.Dispatch<React.SetStateAction<any>>
  acat_idf572e: any,
  setacat_idf572e:React.Dispatch<React.SetStateAction<any>>
  acat_idf572eProps: any 
  setacat_idf572eProps: React.Dispatch<React.SetStateAction<any>>
  software_license_iconfe876: any,
  setsoftware_license_iconfe876:React.Dispatch<React.SetStateAction<any>>
  software_license_iconfe876Props: any 
  setsoftware_license_iconfe876Props: React.Dispatch<React.SetStateAction<any>>
  software_license_text8a69d: any,
  setsoftware_license_text8a69d:React.Dispatch<React.SetStateAction<any>>
  software_license_text8a69dProps: any 
  setsoftware_license_text8a69dProps: React.Dispatch<React.SetStateAction<any>>
  searchb475f: any,
  setsearchb475f:React.Dispatch<React.SetStateAction<any>>
  searchb475fProps: any 
  setsearchb475fProps: React.Dispatch<React.SetStateAction<any>>
  add_license9d3d9: any,
  setadd_license9d3d9:React.Dispatch<React.SetStateAction<any>>
  add_license9d3d9Props: any 
  setadd_license9d3d9Props: React.Dispatch<React.SetStateAction<any>>
  license_id87b4a: any,
  setlicense_id87b4a:React.Dispatch<React.SetStateAction<any>>
  license_id87b4aProps: any 
  setlicense_id87b4aProps: React.Dispatch<React.SetStateAction<any>>
  product_namedaa81: any,
  setproduct_namedaa81:React.Dispatch<React.SetStateAction<any>>
  product_namedaa81Props: any 
  setproduct_namedaa81Props: React.Dispatch<React.SetStateAction<any>>
  license_typeba0b9: any,
  setlicense_typeba0b9:React.Dispatch<React.SetStateAction<any>>
  license_typeba0b9Props: any 
  setlicense_typeba0b9Props: React.Dispatch<React.SetStateAction<any>>
  seats_totalc4b88: any,
  setseats_totalc4b88:React.Dispatch<React.SetStateAction<any>>
  seats_totalc4b88Props: any 
  setseats_totalc4b88Props: React.Dispatch<React.SetStateAction<any>>
  seats_used910b8: any,
  setseats_used910b8:React.Dispatch<React.SetStateAction<any>>
  seats_used910b8Props: any 
  setseats_used910b8Props: React.Dispatch<React.SetStateAction<any>>
  expiry_date7fb4b: any,
  setexpiry_date7fb4b:React.Dispatch<React.SetStateAction<any>>
  expiry_date7fb4bProps: any 
  setexpiry_date7fb4bProps: React.Dispatch<React.SetStateAction<any>>
  cost0d30b: any,
  setcost0d30b:React.Dispatch<React.SetStateAction<any>>
  cost0d30bProps: any 
  setcost0d30bProps: React.Dispatch<React.SetStateAction<any>>
  edit_btne7446: any,
  setedit_btne7446:React.Dispatch<React.SetStateAction<any>>
  edit_btne7446Props: any 
  setedit_btne7446Props: React.Dispatch<React.SetStateAction<any>>
  button_delete6b394: any,
  setbutton_delete6b394:React.Dispatch<React.SetStateAction<any>>
  button_delete6b394Props: any 
  setbutton_delete6b394Props: React.Dispatch<React.SetStateAction<any>>
  bt_add_doce2f55: any,
  setbt_add_doce2f55:React.Dispatch<React.SetStateAction<any>>
  bt_add_doce2f55Props: any 
  setbt_add_doce2f55Props: React.Dispatch<React.SetStateAction<any>>
  license_information90d62: any,
  setlicense_information90d62:React.Dispatch<React.SetStateAction<any>>
  license_information90d62Props: any 
  setlicense_information90d62Props: React.Dispatch<React.SetStateAction<any>>
  asset_namee8382: any,
  setasset_namee8382:React.Dispatch<React.SetStateAction<any>>
  asset_namee8382Props: any 
  setasset_namee8382Props: React.Dispatch<React.SetStateAction<any>>
  product_namec9548: any,
  setproduct_namec9548:React.Dispatch<React.SetStateAction<any>>
  product_namec9548Props: any 
  setproduct_namec9548Props: React.Dispatch<React.SetStateAction<any>>
  vendor_nameb519a: any,
  setvendor_nameb519a:React.Dispatch<React.SetStateAction<any>>
  vendor_nameb519aProps: any 
  setvendor_nameb519aProps: React.Dispatch<React.SetStateAction<any>>
  license_typeae36b: any,
  setlicense_typeae36b:React.Dispatch<React.SetStateAction<any>>
  license_typeae36bProps: any 
  setlicense_typeae36bProps: React.Dispatch<React.SetStateAction<any>>
  license_keyd5b6f: any,
  setlicense_keyd5b6f:React.Dispatch<React.SetStateAction<any>>
  license_keyd5b6fProps: any 
  setlicense_keyd5b6fProps: React.Dispatch<React.SetStateAction<any>>
  license_configuration37dd8: any,
  setlicense_configuration37dd8:React.Dispatch<React.SetStateAction<any>>
  license_configuration37dd8Props: any 
  setlicense_configuration37dd8Props: React.Dispatch<React.SetStateAction<any>>
  seats_total6dbc7: any,
  setseats_total6dbc7:React.Dispatch<React.SetStateAction<any>>
  seats_total6dbc7Props: any 
  setseats_total6dbc7Props: React.Dispatch<React.SetStateAction<any>>
  seats_useddd434: any,
  setseats_useddd434:React.Dispatch<React.SetStateAction<any>>
  seats_useddd434Props: any 
  setseats_useddd434Props: React.Dispatch<React.SetStateAction<any>>
  auto_renewalb4694: any,
  setauto_renewalb4694:React.Dispatch<React.SetStateAction<any>>
  auto_renewalb4694Props: any 
  setauto_renewalb4694Props: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details82762: any,
  setvalidity_financial_details82762:React.Dispatch<React.SetStateAction<any>>
  validity_financial_details82762Props: any 
  setvalidity_financial_details82762Props: React.Dispatch<React.SetStateAction<any>>
  purchase_datebfe70: any,
  setpurchase_datebfe70:React.Dispatch<React.SetStateAction<any>>
  purchase_datebfe70Props: any 
  setpurchase_datebfe70Props: React.Dispatch<React.SetStateAction<any>>
  expiry_date5c034: any,
  setexpiry_date5c034:React.Dispatch<React.SetStateAction<any>>
  expiry_date5c034Props: any 
  setexpiry_date5c034Props: React.Dispatch<React.SetStateAction<any>>
  support_expiry4ec2c: any,
  setsupport_expiry4ec2c:React.Dispatch<React.SetStateAction<any>>
  support_expiry4ec2cProps: any 
  setsupport_expiry4ec2cProps: React.Dispatch<React.SetStateAction<any>>
  costf9899: any,
  setcostf9899:React.Dispatch<React.SetStateAction<any>>
  costf9899Props: any 
  setcostf9899Props: React.Dispatch<React.SetStateAction<any>>
  license_id07bf2: any,
  setlicense_id07bf2:React.Dispatch<React.SetStateAction<any>>
  license_id07bf2Props: any 
  setlicense_id07bf2Props: React.Dispatch<React.SetStateAction<any>>
  canceld59b4: any,
  setcanceld59b4:React.Dispatch<React.SetStateAction<any>>
  canceld59b4Props: any 
  setcanceld59b4Props: React.Dispatch<React.SetStateAction<any>>
  update0d16c: any,
  setupdate0d16c:React.Dispatch<React.SetStateAction<any>>
  update0d16cProps: any 
  setupdate0d16cProps: React.Dispatch<React.SetStateAction<any>>
  add_license3b16e: any,
  setadd_license3b16e:React.Dispatch<React.SetStateAction<any>>
  add_license3b16eProps: any 
  setadd_license3b16eProps: React.Dispatch<React.SetStateAction<any>>
  license_information6a10f: any,
  setlicense_information6a10f:React.Dispatch<React.SetStateAction<any>>
  license_information6a10fProps: any 
  setlicense_information6a10fProps: React.Dispatch<React.SetStateAction<any>>
  asset_name1ae9b: any,
  setasset_name1ae9b:React.Dispatch<React.SetStateAction<any>>
  asset_name1ae9bProps: any 
  setasset_name1ae9bProps: React.Dispatch<React.SetStateAction<any>>
  product_name11c98: any,
  setproduct_name11c98:React.Dispatch<React.SetStateAction<any>>
  product_name11c98Props: any 
  setproduct_name11c98Props: React.Dispatch<React.SetStateAction<any>>
  vendor_namef2df8: any,
  setvendor_namef2df8:React.Dispatch<React.SetStateAction<any>>
  vendor_namef2df8Props: any 
  setvendor_namef2df8Props: React.Dispatch<React.SetStateAction<any>>
  license_typec8c15: any,
  setlicense_typec8c15:React.Dispatch<React.SetStateAction<any>>
  license_typec8c15Props: any 
  setlicense_typec8c15Props: React.Dispatch<React.SetStateAction<any>>
  license_keyab6d1: any,
  setlicense_keyab6d1:React.Dispatch<React.SetStateAction<any>>
  license_keyab6d1Props: any 
  setlicense_keyab6d1Props: React.Dispatch<React.SetStateAction<any>>
  license_configurationf7ede: any,
  setlicense_configurationf7ede:React.Dispatch<React.SetStateAction<any>>
  license_configurationf7edeProps: any 
  setlicense_configurationf7edeProps: React.Dispatch<React.SetStateAction<any>>
  seats_total8b54b: any,
  setseats_total8b54b:React.Dispatch<React.SetStateAction<any>>
  seats_total8b54bProps: any 
  setseats_total8b54bProps: React.Dispatch<React.SetStateAction<any>>
  seats_used3bba9: any,
  setseats_used3bba9:React.Dispatch<React.SetStateAction<any>>
  seats_used3bba9Props: any 
  setseats_used3bba9Props: React.Dispatch<React.SetStateAction<any>>
  auto_renewal3bee1: any,
  setauto_renewal3bee1:React.Dispatch<React.SetStateAction<any>>
  auto_renewal3bee1Props: any 
  setauto_renewal3bee1Props: React.Dispatch<React.SetStateAction<any>>
  validity_financial_details9259f: any,
  setvalidity_financial_details9259f:React.Dispatch<React.SetStateAction<any>>
  validity_financial_details9259fProps: any 
  setvalidity_financial_details9259fProps: React.Dispatch<React.SetStateAction<any>>
  purchase_date884a6: any,
  setpurchase_date884a6:React.Dispatch<React.SetStateAction<any>>
  purchase_date884a6Props: any 
  setpurchase_date884a6Props: React.Dispatch<React.SetStateAction<any>>
  expiry_date74df0: any,
  setexpiry_date74df0:React.Dispatch<React.SetStateAction<any>>
  expiry_date74df0Props: any 
  setexpiry_date74df0Props: React.Dispatch<React.SetStateAction<any>>
  support_expirybfd9e: any,
  setsupport_expirybfd9e:React.Dispatch<React.SetStateAction<any>>
  support_expirybfd9eProps: any 
  setsupport_expirybfd9eProps: React.Dispatch<React.SetStateAction<any>>
  cost2568f: any,
  setcost2568f:React.Dispatch<React.SetStateAction<any>>
  cost2568fProps: any 
  setcost2568fProps: React.Dispatch<React.SetStateAction<any>>
  license_id49b2a: any,
  setlicense_id49b2a:React.Dispatch<React.SetStateAction<any>>
  license_id49b2aProps: any 
  setlicense_id49b2aProps: React.Dispatch<React.SetStateAction<any>>
  delete_heading_textb375f: any,
  setdelete_heading_textb375f:React.Dispatch<React.SetStateAction<any>>
  delete_heading_textb375fProps: any 
  setdelete_heading_textb375fProps: React.Dispatch<React.SetStateAction<any>>
  product_name_text501de: any,
  setproduct_name_text501de:React.Dispatch<React.SetStateAction<any>>
  product_name_text501deProps: any 
  setproduct_name_text501deProps: React.Dispatch<React.SetStateAction<any>>
  product_namead2dd: any,
  setproduct_namead2dd:React.Dispatch<React.SetStateAction<any>>
  product_namead2ddProps: any 
  setproduct_namead2ddProps: React.Dispatch<React.SetStateAction<any>>
  license_type_text3c22b: any,
  setlicense_type_text3c22b:React.Dispatch<React.SetStateAction<any>>
  license_type_text3c22bProps: any 
  setlicense_type_text3c22bProps: React.Dispatch<React.SetStateAction<any>>
  license_typecec9e: any,
  setlicense_typecec9e:React.Dispatch<React.SetStateAction<any>>
  license_typecec9eProps: any 
  setlicense_typecec9eProps: React.Dispatch<React.SetStateAction<any>>
  auto_renewal_textbdbd2: any,
  setauto_renewal_textbdbd2:React.Dispatch<React.SetStateAction<any>>
  auto_renewal_textbdbd2Props: any 
  setauto_renewal_textbdbd2Props: React.Dispatch<React.SetStateAction<any>>
  auto_renewal8e280: any,
  setauto_renewal8e280:React.Dispatch<React.SetStateAction<any>>
  auto_renewal8e280Props: any 
  setauto_renewal8e280Props: React.Dispatch<React.SetStateAction<any>>
  seats_total_texta19fe: any,
  setseats_total_texta19fe:React.Dispatch<React.SetStateAction<any>>
  seats_total_texta19feProps: any 
  setseats_total_texta19feProps: React.Dispatch<React.SetStateAction<any>>
  seats_totalf37ee: any,
  setseats_totalf37ee:React.Dispatch<React.SetStateAction<any>>
  seats_totalf37eeProps: any 
  setseats_totalf37eeProps: React.Dispatch<React.SetStateAction<any>>
  seats_used_textc1a25: any,
  setseats_used_textc1a25:React.Dispatch<React.SetStateAction<any>>
  seats_used_textc1a25Props: any 
  setseats_used_textc1a25Props: React.Dispatch<React.SetStateAction<any>>
  seats_used8c8d5: any,
  setseats_used8c8d5:React.Dispatch<React.SetStateAction<any>>
  seats_used8c8d5Props: any 
  setseats_used8c8d5Props: React.Dispatch<React.SetStateAction<any>>
  confo_textbc695: any,
  setconfo_textbc695:React.Dispatch<React.SetStateAction<any>>
  confo_textbc695Props: any 
  setconfo_textbc695Props: React.Dispatch<React.SetStateAction<any>>
  license_id027b5: any,
  setlicense_id027b5:React.Dispatch<React.SetStateAction<any>>
  license_id027b5Props: any 
  setlicense_id027b5Props: React.Dispatch<React.SetStateAction<any>>
  cancel_button3e8d9: any,
  setcancel_button3e8d9:React.Dispatch<React.SetStateAction<any>>
  cancel_button3e8d9Props: any 
  setcancel_button3e8d9Props: React.Dispatch<React.SetStateAction<any>>
  ok_buttonf3727: any,
  setok_buttonf3727:React.Dispatch<React.SetStateAction<any>>
  ok_buttonf3727Props: any 
  setok_buttonf3727Props: React.Dispatch<React.SetStateAction<any>>
  license_id_text641eb: any,
  setlicense_id_text641eb:React.Dispatch<React.SetStateAction<any>>
  license_id_text641ebProps: any 
  setlicense_id_text641ebProps: React.Dispatch<React.SetStateAction<any>>
  license_idd34c8: any,
  setlicense_idd34c8:React.Dispatch<React.SetStateAction<any>>
  license_idd34c8Props: any 
  setlicense_idd34c8Props: React.Dispatch<React.SetStateAction<any>>
  product_name_textc07aa: any,
  setproduct_name_textc07aa:React.Dispatch<React.SetStateAction<any>>
  product_name_textc07aaProps: any 
  setproduct_name_textc07aaProps: React.Dispatch<React.SetStateAction<any>>
  product_name405f8: any,
  setproduct_name405f8:React.Dispatch<React.SetStateAction<any>>
  product_name405f8Props: any 
  setproduct_name405f8Props: React.Dispatch<React.SetStateAction<any>>
  attachment_id1138d: any,
  setattachment_id1138d:React.Dispatch<React.SetStateAction<any>>
  attachment_id1138dProps: any 
  setattachment_id1138dProps: React.Dispatch<React.SetStateAction<any>>
  doc_group3dcd4: any,
  setdoc_group3dcd4:React.Dispatch<React.SetStateAction<any>>
  doc_group3dcd4Props: any 
  setdoc_group3dcd4Props: React.Dispatch<React.SetStateAction<any>>
  doc_name698d2: any,
  setdoc_name698d2:React.Dispatch<React.SetStateAction<any>>
  doc_name698d2Props: any 
  setdoc_name698d2Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_date0acd9: any,
  settrs_created_date0acd9:React.Dispatch<React.SetStateAction<any>>
  trs_created_date0acd9Props: any 
  settrs_created_date0acd9Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_by0c4db: any,
  settrs_created_by0c4db:React.Dispatch<React.SetStateAction<any>>
  trs_created_by0c4dbProps: any 
  settrs_created_by0c4dbProps: React.Dispatch<React.SetStateAction<any>>
  bt_delete17f42: any,
  setbt_delete17f42:React.Dispatch<React.SetStateAction<any>>
  bt_delete17f42Props: any 
  setbt_delete17f42Props: React.Dispatch<React.SetStateAction<any>>
  documentuploadpanela3e1b: any,
  setdocumentuploadpanela3e1b:React.Dispatch<React.SetStateAction<any>>
  documentuploadpanela3e1bProps: any 
  setdocumentuploadpanela3e1bProps: React.Dispatch<React.SetStateAction<any>>
  button_add_doc7c1b7: any,
  setbutton_add_doc7c1b7:React.Dispatch<React.SetStateAction<any>>
  button_add_doc7c1b7Props: any 
  setbutton_add_doc7c1b7Props: React.Dispatch<React.SetStateAction<any>>
  license_idbc5e1: any,
  setlicense_idbc5e1:React.Dispatch<React.SetStateAction<any>>
  license_idbc5e1Props: any 
  setlicense_idbc5e1Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  assetdasboard_v1: any 
  setassetdasboard_v1: React.Dispatch<React.SetStateAction<any>>
  assetdasboard_v1Props: any 
  setassetdasboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  assets_v1: any 
  setassets_v1: React.Dispatch<React.SetStateAction<any>>
  assets_v1Props: any 
  setassets_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetsearch_v1: any 
  setassetsearch_v1: React.Dispatch<React.SetStateAction<any>>
  assetsearch_v1Props: any 
  setassetsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  newasset_v1: any 
  setnewasset_v1: React.Dispatch<React.SetStateAction<any>>
  newasset_v1Props: any 
  setnewasset_v1Props: React.Dispatch<React.SetStateAction<any>>
  newassetview_v1: any 
  setnewassetview_v1: React.Dispatch<React.SetStateAction<any>>
  newassetview_v1Props: any 
  setnewassetview_v1Props: React.Dispatch<React.SetStateAction<any>>
  deletescreen_v1: any 
  setdeletescreen_v1: React.Dispatch<React.SetStateAction<any>>
  deletescreen_v1Props: any 
  setdeletescreen_v1Props: React.Dispatch<React.SetStateAction<any>>
  addassetdocument_v1: any 
  setaddassetdocument_v1: React.Dispatch<React.SetStateAction<any>>
  addassetdocument_v1Props: any 
  setaddassetdocument_v1Props: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1: any 
  setdocumentviewer_v1: React.Dispatch<React.SetStateAction<any>>
  documentviewer_v1Props: any 
  setdocumentviewer_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetdocdelete_v1: any 
  setassetdocdelete_v1: React.Dispatch<React.SetStateAction<any>>
  assetdocdelete_v1Props: any 
  setassetdocdelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetassignments_v1: any 
  setassetassignments_v1: React.Dispatch<React.SetStateAction<any>>
  assetassignments_v1Props: any 
  setassetassignments_v1Props: React.Dispatch<React.SetStateAction<any>>
  assignassetsearch_v1: any 
  setassignassetsearch_v1: React.Dispatch<React.SetStateAction<any>>
  assignassetsearch_v1Props: any 
  setassignassetsearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  assignasset_v1: any 
  setassignasset_v1: React.Dispatch<React.SetStateAction<any>>
  assignasset_v1Props: any 
  setassignasset_v1Props: React.Dispatch<React.SetStateAction<any>>
  assignassetview_v1: any 
  setassignassetview_v1: React.Dispatch<React.SetStateAction<any>>
  assignassetview_v1Props: any 
  setassignassetview_v1Props: React.Dispatch<React.SetStateAction<any>>
  assignassetdelete_v1: any 
  setassignassetdelete_v1: React.Dispatch<React.SetStateAction<any>>
  assignassetdelete_v1Props: any 
  setassignassetdelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  addassignmentdocument_v1: any 
  setaddassignmentdocument_v1: React.Dispatch<React.SetStateAction<any>>
  addassignmentdocument_v1Props: any 
  setaddassignmentdocument_v1Props: React.Dispatch<React.SetStateAction<any>>
  assigndocdelete_v1: any 
  setassigndocdelete_v1: React.Dispatch<React.SetStateAction<any>>
  assigndocdelete_v1Props: any 
  setassigndocdelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetmaintenance_v1: any 
  setassetmaintenance_v1: React.Dispatch<React.SetStateAction<any>>
  assetmaintenance_v1Props: any 
  setassetmaintenance_v1Props: React.Dispatch<React.SetStateAction<any>>
  maintenancesearch_v1: any 
  setmaintenancesearch_v1: React.Dispatch<React.SetStateAction<any>>
  maintenancesearch_v1Props: any 
  setmaintenancesearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  logmaintenance_v1: any 
  setlogmaintenance_v1: React.Dispatch<React.SetStateAction<any>>
  logmaintenance_v1Props: any 
  setlogmaintenance_v1Props: React.Dispatch<React.SetStateAction<any>>
  maintenancedelete_v1: any 
  setmaintenancedelete_v1: React.Dispatch<React.SetStateAction<any>>
  maintenancedelete_v1Props: any 
  setmaintenancedelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetdisposal_v1: any 
  setassetdisposal_v1: React.Dispatch<React.SetStateAction<any>>
  assetdisposal_v1Props: any 
  setassetdisposal_v1Props: React.Dispatch<React.SetStateAction<any>>
  initiateassetdisposal_v1: any 
  setinitiateassetdisposal_v1: React.Dispatch<React.SetStateAction<any>>
  initiateassetdisposal_v1Props: any 
  setinitiateassetdisposal_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetdisposalview_v1: any 
  setassetdisposalview_v1: React.Dispatch<React.SetStateAction<any>>
  assetdisposalview_v1Props: any 
  setassetdisposalview_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetcategory_v1: any 
  setassetcategory_v1: React.Dispatch<React.SetStateAction<any>>
  assetcategory_v1Props: any 
  setassetcategory_v1Props: React.Dispatch<React.SetStateAction<any>>
  categorysearch_v1: any 
  setcategorysearch_v1: React.Dispatch<React.SetStateAction<any>>
  categorysearch_v1Props: any 
  setcategorysearch_v1Props: React.Dispatch<React.SetStateAction<any>>
  addcategory_v1: any 
  setaddcategory_v1: React.Dispatch<React.SetStateAction<any>>
  addcategory_v1Props: any 
  setaddcategory_v1Props: React.Dispatch<React.SetStateAction<any>>
  categorydelete_v1: any 
  setcategorydelete_v1: React.Dispatch<React.SetStateAction<any>>
  categorydelete_v1Props: any 
  setcategorydelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  addcategoryview_v1: any 
  setaddcategoryview_v1: React.Dispatch<React.SetStateAction<any>>
  addcategoryview_v1Props: any 
  setaddcategoryview_v1Props: React.Dispatch<React.SetStateAction<any>>
  addcategorydocument_v1: any 
  setaddcategorydocument_v1: React.Dispatch<React.SetStateAction<any>>
  addcategorydocument_v1Props: any 
  setaddcategorydocument_v1Props: React.Dispatch<React.SetStateAction<any>>
  assetsoftwarelicenses_v1: any 
  setassetsoftwarelicenses_v1: React.Dispatch<React.SetStateAction<any>>
  assetsoftwarelicenses_v1Props: any 
  setassetsoftwarelicenses_v1Props: React.Dispatch<React.SetStateAction<any>>
  addlicense_v1: any 
  setaddlicense_v1: React.Dispatch<React.SetStateAction<any>>
  addlicense_v1Props: any 
  setaddlicense_v1Props: React.Dispatch<React.SetStateAction<any>>
  addlicenseview_v1: any 
  setaddlicenseview_v1: React.Dispatch<React.SetStateAction<any>>
  addlicenseview_v1Props: any 
  setaddlicenseview_v1Props: React.Dispatch<React.SetStateAction<any>>
  licensedelete_v1: any 
  setlicensedelete_v1: React.Dispatch<React.SetStateAction<any>>
  licensedelete_v1Props: any 
  setlicensedelete_v1Props: React.Dispatch<React.SetStateAction<any>>
  addsoftwarelicensesdocument_v1: any 
  setaddsoftwarelicensesdocument_v1: React.Dispatch<React.SetStateAction<any>>
  addsoftwarelicensesdocument_v1Props: any 
  setaddsoftwarelicensesdocument_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_assetdashboard_v1Props: any 
  setdfd_assetdashboard_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assets_v1Props: any 
  setdfd_assets_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetmaintenance_v1Props: any 
  setdfd_assetmaintenance_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetsoftwarelicenses_v1Props: any 
  setdfd_assetsoftwarelicenses_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetdisposal_v1Props: any 
  setdfd_assetdisposal_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assettypecombo_v1Props: any 
  setdfd_assettypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetcategorycombo_v1Props: any 
  setdfd_assetcategorycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetclassificationcombo_v1Props: any 
  setdfd_assetclassificationcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetdataclassificationcombo_v1Props: any 
  setdfd_assetdataclassificationcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_ownershiptypecombo_v1Props: any 
  setdfd_ownershiptypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetconditioncombo_v1Props: any 
  setdfd_assetconditioncombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_disposalmethodcombo_v1Props: any 
  setdfd_disposalmethodcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_risklevelcombo_v1Props: any 
  setdfd_risklevelcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_vendornamecombo_v1Props: any 
  setdfd_vendornamecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_lifecyclestagecombo_v1Props: any 
  setdfd_lifecyclestagecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_currencycombo_v1Props: any 
  setdfd_currencycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetdoctable_v1Props: any 
  setdfd_assetdoctable_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assigndoctable_v1Props: any 
  setdfd_assigndoctable_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_categorydoctable_v1Props: any 
  setdfd_categorydoctable_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetassignments_v1Props: any 
  setdfd_assetassignments_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetnamecombo_v1Props: any 
  setdfd_assetnamecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assignmentstatuscombo_v1Props: any 
  setdfd_assignmentstatuscombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_conditionatreturncombo_v1Props: any 
  setdfd_conditionatreturncombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_approvalstatuscombo_v1Props: any 
  setdfd_approvalstatuscombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_maintenancetypecombo_v1Props: any 
  setdfd_maintenancetypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_prioritycombo_v1Props: any 
  setdfd_prioritycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetcategory_v1Props: any 
  setdfd_assetcategory_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_parentcategorycombo_v1Props: any 
  setdfd_parentcategorycombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_depreciationmethodcombo_v1Props: any 
  setdfd_depreciationmethodcombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_assetcategorycards_v1Props: any 
  setdfd_assetcategorycards_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_licensetypecombo_v1Props: any 
  setdfd_licensetypecombo_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_softwaredoctable_v1Props: any 
  setdfd_softwaredoctable_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb ] = React.useState<any>({}) 
    const [asset_dashboard_group4d6cbProps, setasset_dashboard_group4d6cbProps ] = React.useState<any>({
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
        const [total_asset_group69aa9, settotal_asset_group69aa9 ] = React.useState<any>({}) 
    const [total_asset_group69aa9Props, settotal_asset_group69aa9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_asset_divider",
            "total_assest_text",
            "total_assets",
            "it_assets",
      ]
      }) 
        const [maintenance_due_group704ca, setmaintenance_due_group704ca ] = React.useState<any>({}) 
    const [maintenance_due_group704caProps, setmaintenance_due_group704caProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "maintenance_due_divider",
            "maintenance_due_text",
            "maintenance_due",
            "overdue_maintenance",
      ]
      }) 
        const [warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4 ] = React.useState<any>({}) 
    const [warranty_expiring_groupb5bd4Props, setwarranty_expiring_groupb5bd4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "warranty_expiring_divider",
            "warranty_expiring_text",
            "warranty_expiring",
            "warranty_description",
      ]
      }) 
        const [software_licenses_group4beb5, setsoftware_licenses_group4beb5 ] = React.useState<any>({}) 
    const [software_licenses_group4beb5Props, setsoftware_licenses_group4beb5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "software_licenses_divider",
            "software_licenses_text",
            "software_licenses",
            "licenses_near_expiry",
      ]
      }) 
        const [pending_disposal_group2580d, setpending_disposal_group2580d ] = React.useState<any>({}) 
    const [pending_disposal_group2580dProps, setpending_disposal_group2580dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "pending_disposal_divider",
            "pending_disposal_text",
            "pending_disposal",
            "pending_disposal_description",
      ]
      }) 
        const [table_group94010, settable_group94010 ] = React.useState<any>({}) 
    const [table_group94010Props, settable_group94010Props ] = React.useState<any>({
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
        const [subscreen99589, setsubscreen99589 ] = React.useState<any>({}) 
    const [subscreen99589Props, setsubscreen99589Props ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1 ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props ] = React.useState<any>({
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
        const [asset_table_group6fffa, setasset_table_group6fffa ] = React.useState<any>({}) 
    const [asset_table_group6fffaProps, setasset_table_group6fffaProps ] = React.useState<any>({
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
    
    const [asset_table6082a, setasset_table6082a ] = React.useState<any>([]) 
    const [asset_table6082aProps, setasset_table6082aProps ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps ] = React.useState<any>({
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
        const [asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b ] = React.useState<any>({}) 
    const [asset_maintenance_table_groupe042bProps, setasset_maintenance_table_groupe042bProps ] = React.useState<any>({
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
    
    const [asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1 ] = React.useState<any>([]) 
    const [asset_maintenance_table6cdf1Props, setasset_maintenance_table6cdf1Props ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426 ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props ] = React.useState<any>({
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
        const [asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553 ] = React.useState<any>({}) 
    const [asset_software_licenses_table_groupcb553Props, setasset_software_licenses_table_groupcb553Props ] = React.useState<any>({
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
    
    const [asset_software_licenses_table13758, setasset_software_licenses_table13758 ] = React.useState<any>([]) 
    const [asset_software_licenses_table13758Props, setasset_software_licenses_table13758Props ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1 ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props ] = React.useState<any>({
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
        const [asset_disposal_table_group329e9, setasset_disposal_table_group329e9 ] = React.useState<any>({}) 
    const [asset_disposal_table_group329e9Props, setasset_disposal_table_group329e9Props ] = React.useState<any>({
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
    
    const [asset_disposal_table440cd, setasset_disposal_table440cd ] = React.useState<any>([]) 
    const [asset_disposal_table440cdProps, setasset_disposal_table440cdProps ] = React.useState<any>({
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
        const [ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7 ] = React.useState<any>({}) 
    const [ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props ] = React.useState<any>({
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
        const [warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1 ] = React.useState<any>({}) 
    const [warrenty_expiring_table_group116d1Props, setwarrenty_expiring_table_group116d1Props ] = React.useState<any>({
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
    
    const [warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168 ] = React.useState<any>([]) 
    const [warrenty_expiring_tablee3168Props, setwarrenty_expiring_tablee3168Props ] = React.useState<any>({
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
        const [overall_asset_group7ded2, setoverall_asset_group7ded2 ] = React.useState<any>({}) 
    const [overall_asset_group7ded2Props, setoverall_asset_group7ded2Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "asset",
      ]
      }) 
        const [icon_text_group476bd, seticon_text_group476bd ] = React.useState<any>({}) 
    const [icon_text_group476bdProps, seticon_text_group476bdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_icon_text",
            "asset_text",
      ]
      }) 
    
    const [asset_tablef2b38, setasset_tablef2b38 ] = React.useState<any>([]) 
    const [asset_tablef2b38Props, setasset_tablef2b38Props ] = React.useState<any>({
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
        const [asset_search_group46c56, setasset_search_group46c56 ] = React.useState<any>({}) 
    const [asset_search_group46c56Props, setasset_search_group46c56Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_name",
      ]
      }) 
        const [new_asset_groupdb5a7, setnew_asset_groupdb5a7 ] = React.useState<any>({}) 
    const [new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_id",
      ]
      }) 
        const [asset_info_groupdeeeb, setasset_info_groupdeeeb ] = React.useState<any>({}) 
    const [asset_info_groupdeeebProps, setasset_info_groupdeeebProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_infot_asset_text",
            "category_name",
            "category_name",
            "category_name",
            "asset_type",
            "asset_type",
            "asset_type",
            "asset_name",
            "asset_tag",
            "asset_code",
            "serial_number",
            "model_number",
            "manufacturer",
      ]
      }) 
        const [classification_group3c6b3, setclassification_group3c6b3 ] = React.useState<any>({}) 
    const [classification_group3c6b3Props, setclassification_group3c6b3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "classification_text",
            "classification",
            "classification",
            "classification",
            "data_classification",
            "data_classification",
            "data_classification",
            "ownership_type",
            "ownership_type",
            "ownership_type",
            "lifecycle_stage",
            "asset_condition",
            "asset_condition",
            "asset_condition",
            "risk_level",
            "risk_level",
            "risk_level",
            "is_critical",
      ]
      }) 
        const [additional_details_group8c616, setadditional_details_group8c616 ] = React.useState<any>({}) 
    const [additional_details_group8c616Props, setadditional_details_group8c616Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "additional_details_text",
            "location",
            "description",
      ]
      }) 
        const [pyrchase_details_group76407, setpyrchase_details_group76407 ] = React.useState<any>({}) 
    const [pyrchase_details_group76407Props, setpyrchase_details_group76407Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "purchase_details_text",
            "vendor_name",
            "vendor_name",
            "vendor_name",
            "purchase_cost",
            "currency",
            "purchase_date",
            "warranty_expiry",
            "current_value",
            "depreciation_rate",
            "salvage_value",
      ]
      }) 
        const [disposal_details_groupaffa1, setdisposal_details_groupaffa1 ] = React.useState<any>({}) 
    const [disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "disposal_details_text",
            "disposal_method",
            "disposal_method",
            "disposal_method",
            "disposal_date",
            "disposal_ref",
      ]
      }) 
        const [dynamicactions1077f, setdynamicactions1077f ] = React.useState<any>({}) 
    const [dynamicactions1077fProps, setdynamicactions1077fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel",
            "button_update",
            "add_asset",
      ]
      }) 
        const [new_asset_group3261e, setnew_asset_group3261e ] = React.useState<any>({}) 
    const [new_asset_group3261eProps, setnew_asset_group3261eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_id",
      ]
      }) 
        const [asset_info_groupcc113, setasset_info_groupcc113 ] = React.useState<any>({}) 
    const [asset_info_groupcc113Props, setasset_info_groupcc113Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "basic_infot_asset_text",
            "category_name",
            "asset_type",
            "asset_name",
            "asset_tag",
            "asset_code",
            "serial_number",
            "model_number",
            "manufacturer",
      ]
      }) 
        const [classification_groupd9d65, setclassification_groupd9d65 ] = React.useState<any>({}) 
    const [classification_groupd9d65Props, setclassification_groupd9d65Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "classification_text",
            "classification",
            "data_classification",
            "ownership_type",
            "lifecycle_stage",
            "asset_condition",
            "risk_level",
            "location",
      ]
      }) 
        const [additional_details_groupaff35, setadditional_details_groupaff35 ] = React.useState<any>({}) 
    const [additional_details_groupaff35Props, setadditional_details_groupaff35Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "additional_details_text",
            "location",
            "description",
      ]
      }) 
        const [pyrchase_details_groupc3900, setpyrchase_details_groupc3900 ] = React.useState<any>({}) 
    const [pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "purchase_details_text",
            "vendor_name",
            "purchase_cost",
            "currency",
            "purchase_date",
            "warranty_expiry",
            "depreciation_rate",
            "salvage_value",
            "current_value",
      ]
      }) 
        const [disposal_details_group67f77, setdisposal_details_group67f77 ] = React.useState<any>({}) 
    const [disposal_details_group67f77Props, setdisposal_details_group67f77Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "disposal_details_text",
            "disposal_method",
            "disposal_date",
            "disposal_ref",
      ]
      }) 
        const [group_delete3c02f, setgroup_delete3c02f ] = React.useState<any>({}) 
    const [group_delete3c02fProps, setgroup_delete3c02fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "asset_name_text",
            "asset_name",
            "asset_tag_text",
            "asset_tag",
            "category_name_text",
            "category_name",
            "asset_type_text",
            "asset_type",
            "location_text",
            "location",
            "confo_text",
            "cancel_button",
            "ok_button",
            "asset_id",
      ]
      }) 
        const [doc_attached_group36b0d, setdoc_attached_group36b0d ] = React.useState<any>({}) 
    const [doc_attached_group36b0dProps, setdoc_attached_group36b0dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "documentuploadpanel",
            "asset_id",
            "button_add_doc",
      ]
      }) 
        const [table_groupdaaaa, settable_groupdaaaa ] = React.useState<any>({}) 
    const [table_groupdaaaaProps, settable_groupdaaaaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_id_text",
            "asset_id",
            "asset_name_text",
            "asset_name",
      ]
      }) 
    
    const [asset_doc_table49f40, setasset_doc_table49f40 ] = React.useState<any>([]) 
    const [asset_doc_table49f40Props, setasset_doc_table49f40Props ] = React.useState<any>({
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
        const [document_viewer_group9a6ec, setdocument_viewer_group9a6ec ] = React.useState<any>({}) 
    const [document_viewer_group9a6ecProps, setdocument_viewer_group9a6ecProps ] = React.useState<any>({
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
        const [group_delete10eb3, setgroup_delete10eb3 ] = React.useState<any>({}) 
    const [group_delete10eb3Props, setgroup_delete10eb3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "attachment_id_txt",
            "attachment_id",
            "doc_group_text",
            "doc_group",
            "doc_name_text",
            "doc_name",
            "trs_created_by_text",
            "trs_created_by",
            "confo_text",
            "asset_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [overall_assignments_group04cba, setoverall_assignments_group04cba ] = React.useState<any>({}) 
    const [overall_assignments_group04cbaProps, setoverall_assignments_group04cbaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "assign_asset",
      ]
      }) 
        const [group9ad63, setgroup9ad63 ] = React.useState<any>({}) 
    const [group9ad63Props, setgroup9ad63Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assign_icon_text",
            "assign_text",
      ]
      }) 
    
    const [assignments_table75a5d, setassignments_table75a5d ] = React.useState<any>([]) 
    const [assignments_table75a5dProps, setassignments_table75a5dProps ] = React.useState<any>({
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
        const [asset_search_group75d0d, setasset_search_group75d0d ] = React.useState<any>({}) 
    const [asset_search_group75d0dProps, setasset_search_group75d0dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assigned_to",
      ]
      }) 
        const [assign_asset_groupdb5a7, setassign_asset_groupdb5a7 ] = React.useState<any>({}) 
    const [assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assign_id",
      ]
      }) 
        const [assignment_information_group5d144, setassignment_information_group5d144 ] = React.useState<any>({}) 
    const [assignment_information_group5d144Props, setassignment_information_group5d144Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assignment_information_text",
            "asset_name",
            "asset_name",
            "asset_name",
            "assigned_to",
            "assigned_by",
            "assigned_date",
            "assignment_status",
            "assignment_status",
            "assignment_status",
            "condition_at_assign",
            "condition_at_assign",
            "condition_at_assign",
            "expected_return_date",
      ]
      }) 
        const [assignment_details_group7f60d, setassignment_details_group7f60d ] = React.useState<any>({}) 
    const [assignment_details_group7f60dProps, setassignment_details_group7f60dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assignment_details_text",
            "actual_return_date",
            "returned_at",
            "condition_at_return",
            "condition_at_return",
            "condition_at_return",
            "approved_by",
            "approval_status",
            "approval_status",
            "approval_status",
            "assignment_notes",
            "acknowledgement_signed",
      ]
      }) 
        const [dynamicactions956ba, setdynamicactions956ba ] = React.useState<any>({}) 
    const [dynamicactions956baProps, setdynamicactions956baProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button_cancel",
            "button_update",
            "assign",
      ]
      }) 
        const [assign_asset_groupb4f2d, setassign_asset_groupb4f2d ] = React.useState<any>({}) 
    const [assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assign_id",
      ]
      }) 
        const [assignment_information_groupc96e9, setassignment_information_groupc96e9 ] = React.useState<any>({}) 
    const [assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assignment_information_text",
            "asset_name",
            "assigned_to",
            "assigned_by",
            "assigned_date",
            "assignment_status",
            "condition_at_assign",
            "expected_return_date",
      ]
      }) 
        const [assignment_details_group136e4, setassignment_details_group136e4 ] = React.useState<any>({}) 
    const [assignment_details_group136e4Props, setassignment_details_group136e4Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "assignment_details_text",
            "actual_return_date",
            "returned_at",
            "condition_at_return",
            "approved_by",
            "approval_status",
            "acknowledgement_signed",
            "assignment_notes",
      ]
      }) 
        const [group_delete0df4b, setgroup_delete0df4b ] = React.useState<any>({}) 
    const [group_delete0df4bProps, setgroup_delete0df4bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "asset_name_text",
            "asset_name",
            "assigned_to_text",
            "assigned_to",
            "assigned_at_text",
            "assigned_by",
            "condition_at_assign_text",
            "condition_at_assign",
            "expected_return_date_text",
            "expected_return_date",
            "confo_text",
            "assign_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [doc_attached_groupbc2cf, setdoc_attached_groupbc2cf ] = React.useState<any>({}) 
    const [doc_attached_groupbc2cfProps, setdoc_attached_groupbc2cfProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "documentuploadpanel",
            "button_add_doc",
            "assign_id",
      ]
      }) 
        const [table_group75a5e, settable_group75a5e ] = React.useState<any>({}) 
    const [table_group75a5eProps, settable_group75a5eProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_name_text",
            "asset_name",
            "assigned_to_text",
            "assigned_to",
      ]
      }) 
    
    const [doc_table392d0, setdoc_table392d0 ] = React.useState<any>([]) 
    const [doc_table392d0Props, setdoc_table392d0Props ] = React.useState<any>({
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
        const [group_delete8ee3b, setgroup_delete8ee3b ] = React.useState<any>({}) 
    const [group_delete8ee3bProps, setgroup_delete8ee3bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "attachment_id_txt",
            "attachment_id",
            "doc_group_text",
            "doc_group",
            "doc_name_text",
            "doc_name",
            "trs_created_by_text",
            "trs_created_by",
            "confo_text",
            "assign_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [overall_maintenance_group04cba, setoverall_maintenance_group04cba ] = React.useState<any>({}) 
    const [overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "log_maintenance",
      ]
      }) 
        const [icon_groupedce3, seticon_groupedce3 ] = React.useState<any>({}) 
    const [icon_groupedce3Props, seticon_groupedce3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "maintenance_text_icon",
            "maintenance_text",
      ]
      }) 
    
    const [maintenance_table75a5d, setmaintenance_table75a5d ] = React.useState<any>([]) 
    const [maintenance_table75a5dProps, setmaintenance_table75a5dProps ] = React.useState<any>({
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
        const [asset_search_group1a6b1, setasset_search_group1a6b1 ] = React.useState<any>({}) 
    const [asset_search_group1a6b1Props, setasset_search_group1a6b1Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "asset_name",
      ]
      }) 
        const [maintenance_groupdb5a7, setmaintenance_groupdb5a7 ] = React.useState<any>({}) 
    const [maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "maint_id",
      ]
      }) 
        const [maintenance_information_groupea3ac, setmaintenance_information_groupea3ac ] = React.useState<any>({}) 
    const [maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "maintenance_information_text",
            "asset_name",
            "maint_type",
            "priority",
            "scheduled_date",
            "completed_date",
            "next_maintenance_date",
      ]
      }) 
        const [execution_details_group591cd, setexecution_details_group591cd ] = React.useState<any>({}) 
    const [execution_details_group591cdProps, setexecution_details_group591cdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "execution_details_text",
            "performed_by",
            "vendor_name",
            "vendor_reference",
            "downtime_hours",
            "cost",
            "description",
            "maintenance_checklist",
      ]
      }) 
        const [dynamicactions8672d, setdynamicactions8672d ] = React.useState<any>({}) 
    const [dynamicactions8672dProps, setdynamicactions8672dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button_cancel",
            "button_update",
            "schedule",
      ]
      }) 
        const [group_delete3f77f, setgroup_delete3f77f ] = React.useState<any>({}) 
    const [group_delete3f77fProps, setgroup_delete3f77fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "asset_name_text",
            "asset_name",
            "maint_type_text",
            "maint_type",
            "priority_text",
            "priority",
            "schedule_date_text",
            "scheduled_date",
            "performed_by_text",
            "performed_by",
            "confo_text",
            "maint_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [overall_disposal_group04cba, setoverall_disposal_group04cba ] = React.useState<any>({}) 
    const [overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "initiate_disposal",
      ]
      }) 
        const [icon_text_group23d8c, seticon_text_group23d8c ] = React.useState<any>({}) 
    const [icon_text_group23d8cProps, seticon_text_group23d8cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "disposal_text_icon",
            "disposal_text",
      ]
      }) 
    
    const [disposal_table75a5d, setdisposal_table75a5d ] = React.useState<any>([]) 
    const [disposal_table75a5dProps, setdisposal_table75a5dProps ] = React.useState<any>({
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
        const [initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7 ] = React.useState<any>({}) 
    const [initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props ] = React.useState<any>({
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
        const [disposal_details_groupe1b0c, setdisposal_details_groupe1b0c ] = React.useState<any>({}) 
    const [disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "disposal_details",
            "vendor_name",
            "asset_name",
            "disposal_method",
            "disposal_date",
            "reason",
      ]
      }) 
        const [compliance_financial_group1f9bc, setcompliance_financial_group1f9bc ] = React.useState<any>({}) 
    const [compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "compliance_financial",
            "approval_reference",
            "witness_name",
            "data_wipe_method",
            "data_wiped",
            "disposal_value",
            "disposal_cost",
            "resale_amount",
      ]
      }) 
        const [dynamicactions9a7ff, setdynamicactions9a7ff ] = React.useState<any>({}) 
    const [dynamicactions9a7ffProps, setdynamicactions9a7ffProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel",
            "update",
            "initiate_disposal",
      ]
      }) 
        const [initiate_asset_disposal_group0196a, setinitiate_asset_disposal_group0196a ] = React.useState<any>({}) 
    const [initiate_asset_disposal_group0196aProps, setinitiate_asset_disposal_group0196aProps ] = React.useState<any>({
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
        const [disposal_details_groupaa369, setdisposal_details_groupaa369 ] = React.useState<any>({}) 
    const [disposal_details_groupaa369Props, setdisposal_details_groupaa369Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "disposal_details",
            "vendor_name",
            "asset_name",
            "disposal_method",
            "disposal_date",
            "reason",
      ]
      }) 
        const [compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8 ] = React.useState<any>({}) 
    const [compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "compliance_financial",
            "approval_reference",
            "witness_name",
            "data_wipe_method",
            "data_wiped",
            "disposal_value",
            "disposal_cost",
            "resale_amount",
            "disposal_id",
      ]
      }) 
        const [asset_dashboard_group485d3, setasset_dashboard_group485d3 ] = React.useState<any>({}) 
    const [asset_dashboard_group485d3Props, setasset_dashboard_group485d3Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "button_add_category",
      ]
      }) 
        const [total_asset_groupfe2e6, settotal_asset_groupfe2e6 ] = React.useState<any>({}) 
    const [total_asset_groupfe2e6Props, settotal_asset_groupfe2e6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "total_category_divider",
            "tc_icon",
            "total_category_text",
            "total_categories",
      ]
      }) 
        const [software_category_group6e622, setsoftware_category_group6e622 ] = React.useState<any>({}) 
    const [software_category_group6e622Props, setsoftware_category_group6e622Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "sw_cat_divider",
            "sc_icon",
            "software_category_text",
            "software_category",
      ]
      }) 
        const [hardware_category_groupfcf3f, sethardware_category_groupfcf3f ] = React.useState<any>({}) 
    const [hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hw_cat_divider",
            "sc_icon",
            "hardware_category_text",
            "hardware_category",
      ]
      }) 
        const [req_maint_groupcf317, setreq_maint_groupcf317 ] = React.useState<any>({}) 
    const [req_maint_groupcf317Props, setreq_maint_groupcf317Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "hw_cat_divider",
            "sc_icon",
            "req_maintenance",
            "required_maintenance",
      ]
      }) 
        const [cat_groupe0f50, setcat_groupe0f50 ] = React.useState<any>({}) 
    const [cat_groupe0f50Props, setcat_groupe0f50Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "categorytext_icon",
            "categorytext",
      ]
      }) 
    
    const [category_table3e4ac, setcategory_table3e4ac ] = React.useState<any>([]) 
    const [category_table3e4acProps, setcategory_table3e4acProps ] = React.useState<any>({
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
        const [asset_search_groupd84d5, setasset_search_groupd84d5 ] = React.useState<any>({}) 
    const [asset_search_groupd84d5Props, setasset_search_groupd84d5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_name",
      ]
      }) 
        const [category_groupe3ebd, setcategory_groupe3ebd ] = React.useState<any>({}) 
    const [category_groupe3ebdProps, setcategory_groupe3ebdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "acat_id",
      ]
      }) 
        const [category_information_groupfb68a, setcategory_information_groupfb68a ] = React.useState<any>({}) 
    const [category_information_groupfb68aProps, setcategory_information_groupfb68aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_information_text",
            "category_code",
            "category_name",
            "parent_category_name",
            "asset_prefix",
      ]
      }) 
        const [category_configuration_group5d6af, setcategory_configuration_group5d6af ] = React.useState<any>({}) 
    const [category_configuration_group5d6afProps, setcategory_configuration_group5d6afProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_configuration_text",
            "depreciation_method",
            "useful_life_years",
      ]
      }) 
        const [dynamicactions13884, setdynamicactions13884 ] = React.useState<any>({}) 
    const [dynamicactions13884Props, setdynamicactions13884Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "button_cancel",
            "button_update",
            "bt_add_category",
      ]
      }) 
        const [group_delete3c2cd, setgroup_delete3c2cd ] = React.useState<any>({}) 
    const [group_delete3c2cdProps, setgroup_delete3c2cdProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "category_code_text",
            "category_code",
            "category_name_text",
            "category_name",
            "depreciation_method_text",
            "depreciation_method",
            "useful_life_years_text",
            "useful_life_years",
            "maintenance_required_text",
            "maintenance_required",
            "confo_text",
            "acat_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [category_group70e38, setcategory_group70e38 ] = React.useState<any>({}) 
    const [category_group70e38Props, setcategory_group70e38Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "acat_id",
      ]
      }) 
        const [category_information_groupa040a, setcategory_information_groupa040a ] = React.useState<any>({}) 
    const [category_information_groupa040aProps, setcategory_information_groupa040aProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_information_text",
            "category_code",
            "category_name",
            "parent_category_name",
            "asset_prefix",
      ]
      }) 
        const [category_configuration_group06f09, setcategory_configuration_group06f09 ] = React.useState<any>({}) 
    const [category_configuration_group06f09Props, setcategory_configuration_group06f09Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "category_configuration_text",
            "depreciation_method",
            "useful_life_years",
      ]
      }) 
        const [doc_attached_groupb9604, setdoc_attached_groupb9604 ] = React.useState<any>({}) 
    const [doc_attached_groupb9604Props, setdoc_attached_groupb9604Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "documentuploadpanel",
            "button_add_doc",
            "acat_id",
      ]
      }) 
        const [table_groupefcb8, settable_groupefcb8 ] = React.useState<any>({}) 
    const [table_groupefcb8Props, settable_groupefcb8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "acat_id_text",
            "acat_id",
            "acat_name_text",
            "category_name",
      ]
      }) 
    
    const [category_doc_table9b042, setcategory_doc_table9b042 ] = React.useState<any>([]) 
    const [category_doc_table9b042Props, setcategory_doc_table9b042Props ] = React.useState<any>({
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
        const [overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba ] = React.useState<any>({}) 
    const [overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "search",
            "add_license",
      ]
      }) 
        const [icon_text_group44cf7, seticon_text_group44cf7 ] = React.useState<any>({}) 
    const [icon_text_group44cf7Props, seticon_text_group44cf7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "software_license_icon",
            "software_license_text",
      ]
      }) 
    
    const [software_licenses_table75a5d, setsoftware_licenses_table75a5d ] = React.useState<any>([]) 
    const [software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps ] = React.useState<any>({
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
        const [add_license_groupdb5a7, setadd_license_groupdb5a7 ] = React.useState<any>({}) 
    const [add_license_groupdb5a7Props, setadd_license_groupdb5a7Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_id",
      ]
      }) 
        const [license_information_groupfae34, setlicense_information_groupfae34 ] = React.useState<any>({}) 
    const [license_information_groupfae34Props, setlicense_information_groupfae34Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_information",
            "asset_name",
            "asset_name",
            "asset_name",
            "product_name",
            "vendor_name",
            "vendor_name",
            "vendor_name",
            "license_type",
            "license_type",
            "license_type",
            "license_key",
      ]
      }) 
        const [license_configuration_groupb5d91, setlicense_configuration_groupb5d91 ] = React.useState<any>({}) 
    const [license_configuration_groupb5d91Props, setlicense_configuration_groupb5d91Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_configuration",
            "seats_total",
            "seats_used",
            "auto_renewal",
      ]
      }) 
        const [validity_financial_details_grouped4a1, setvalidity_financial_details_grouped4a1 ] = React.useState<any>({}) 
    const [validity_financial_details_grouped4a1Props, setvalidity_financial_details_grouped4a1Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "validity_financial_details",
            "purchase_date",
            "expiry_date",
            "support_expiry",
            "cost",
      ]
      }) 
        const [dynamicactions67d98, setdynamicactions67d98 ] = React.useState<any>({}) 
    const [dynamicactions67d98Props, setdynamicactions67d98Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "cancel",
            "update",
            "add_license",
      ]
      }) 
        const [add_license_group1bee6, setadd_license_group1bee6 ] = React.useState<any>({}) 
    const [add_license_group1bee6Props, setadd_license_group1bee6Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_id",
      ]
      }) 
        const [license_information_group4e03c, setlicense_information_group4e03c ] = React.useState<any>({}) 
    const [license_information_group4e03cProps, setlicense_information_group4e03cProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_information",
            "asset_name",
            "product_name",
            "vendor_name",
            "license_type",
            "license_key",
      ]
      }) 
        const [license_configuration_groupa329d, setlicense_configuration_groupa329d ] = React.useState<any>({}) 
    const [license_configuration_groupa329dProps, setlicense_configuration_groupa329dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_configuration",
            "seats_total",
            "seats_used",
            "auto_renewal",
      ]
      }) 
        const [validity_financial_details_groupb8a9f, setvalidity_financial_details_groupb8a9f ] = React.useState<any>({}) 
    const [validity_financial_details_groupb8a9fProps, setvalidity_financial_details_groupb8a9fProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "validity_financial_details",
            "purchase_date",
            "expiry_date",
            "support_expiry",
            "cost",
      ]
      }) 
        const [group_deletedf5b8, setgroup_deletedf5b8 ] = React.useState<any>({}) 
    const [group_deletedf5b8Props, setgroup_deletedf5b8Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "delete_heading_text",
            "product_name_text",
            "product_name",
            "license_type_text",
            "license_type",
            "auto_renewal_text",
            "auto_renewal",
            "seats_total_text",
            "seats_total",
            "seats_used_text",
            "seats_used",
            "confo_text",
            "license_id",
            "cancel_button",
            "ok_button",
      ]
      }) 
        const [doc_attached_groupc3d26, setdoc_attached_groupc3d26 ] = React.useState<any>({}) 
    const [doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "documentuploadpanel",
            "button_add_doc",
            "license_id",
      ]
      }) 
        const [table_group7bc52, settable_group7bc52 ] = React.useState<any>({}) 
    const [table_group7bc52Props, settable_group7bc52Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "license_id_text",
            "license_id",
            "product_name_text",
            "product_name",
      ]
      }) 
    
    const [software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6 ] = React.useState<any>([]) 
    const [software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props ] = React.useState<any>({
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
   const [total_asset_dividerd84da,settotal_asset_dividerd84da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [total_assest_text88ed3,settotal_assest_text88ed3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [total_assest9e45d,settotal_assest9e45d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [it_assets6051f,setit_assets6051f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_due_divider05a2b,setmaintenance_due_divider05a2b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_due_text31400,setmaintenance_due_text31400] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_due09ab9,setmaintenance_due09ab9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [overdue_maintenancef7357,setoverdue_maintenancef7357] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiring_dividerf7152,setwarranty_expiring_dividerf7152] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiring_texteee70,setwarranty_expiring_texteee70] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiringfa250,setwarranty_expiringfa250] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_description49c85,setwarranty_description49c85] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_licenses_divider9376b,setsoftware_licenses_divider9376b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_licenses_text92f3e,setsoftware_licenses_text92f3e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_licenses46b7c,setsoftware_licenses46b7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [licenses_near_expiry46af3,setlicenses_near_expiry46af3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [pending_disposal_dividerd7969,setpending_disposal_dividerd7969] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [pending_disposal_text3d356,setpending_disposal_text3d356] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [pending_disposal38551,setpending_disposal38551] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [pending_disposal_descriptionceadc,setpending_disposal_descriptionceadc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_idbd7bd,setasset_idbd7bd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tagafbdd,setasset_tagafbdd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name1ef31,setasset_name1ef31] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category2a9d0,setcategory2a9d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [serial_no3915b,setserial_no3915b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_toe3252,setassigned_toe3252] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [locationee1a6,setlocationee1a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiryc5b88,setwarranty_expiryc5b88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ref2b838,setref2b838] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name4d2a5,setasset_name4d2a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_typee7fac,setmaint_typee7fac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [descriptionb10c9,setdescriptionb10c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name73ece,setvendor_name73ece] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [scheduled_date67fe7,setscheduled_date67fe7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost3b16a,setcost3b16a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [statusc3912,setstatusc3912] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_ida5387,setmaint_ida5387] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_nameff649,setproduct_nameff649] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_typee6826,setlicense_typee6826] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_total28de1,setseats_total28de1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_used897a3,setseats_used897a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expiry_date7d6c7,setexpiry_date7d6c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost6edbe,setcost6edbe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_idc0471,setlicense_idc0471] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name251dd,setasset_name251dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_method84ead,setdisposal_method84ead] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [reason441ae,setreason441ae] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [current_value047d6,setcurrent_value047d6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wiped9be82,setdata_wiped9be82] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [status00e2a,setstatus00e2a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id29a99,setasset_id29a99] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tage74f0,setasset_tage74f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name13b83,setasset_name13b83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category2ca3f,setcategory2ca3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [serial_no3f2a9,setserial_no3f2a9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_to28cfb,setassigned_to28cfb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location7cca5,setlocation7cca5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiryd159c,setwarranty_expiryd159c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [statusf4240,setstatusf4240] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_icon_text2f408,setasset_icon_text2f408] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_text52a32,setasset_text52a32] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [search15de2,setsearch15de2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset295b8,setasset295b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id0e8f6,setasset_id0e8f6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tagd67f5,setasset_tagd67f5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name64bee,setasset_name64bee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category3fb9d,setcategory3fb9d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [serial_no107f3,setserial_no107f3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [status26d3e,setstatus26d3e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_toea420,setassigned_toea420] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location96640,setlocation96640] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiryd732d,setwarranty_expiryd732d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [viewadef5,setviewadef5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_delete26265,setbt_delete26265] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_edit17748,setbt_edit17748] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_add_docb191a,setbt_add_docb191a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [advancesearch9e02b,setadvancesearch9e02b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [basic_infot_asset_text4d8c8,setbasic_infot_asset_text4d8c8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name3613b,setcategory_name3613b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_type91879,setasset_type91879] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_namea35ee,setasset_namea35ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tagcb5cb,setasset_tagcb5cb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_codeaa68d,setasset_codeaa68d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [serial_numbera45cf,setserial_numbera45cf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [model_number32271,setmodel_number32271] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [manufacturerb8d3f,setmanufacturerb8d3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [classification_text9bbdf,setclassification_text9bbdf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [classification8722b,setclassification8722b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_classification45708,setdata_classification45708] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ownership_type1a506,setownership_type1a506] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [lifecycle_stage1446e,setlifecycle_stage1446e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_condition414c5,setasset_condition414c5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [risk_levelf1e8c,setrisk_levelf1e8c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [is_critical0f006,setis_critical0f006] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [additional_details_text21426,setadditional_details_text21426] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location2ff4b,setlocation2ff4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [description09f58,setdescription09f58] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_details_textf2780,setpurchase_details_textf2780] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name4190d,setvendor_name4190d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_costff91e,setpurchase_costff91e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [currency823ac,setcurrency823ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_datec1162,setpurchase_datec1162] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expiry1fdec,setwarranty_expiry1fdec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [current_value8f6cd,setcurrent_value8f6cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_rate8d4a6,setdepreciation_rate8d4a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [salvage_valuef1995,setsalvage_valuef1995] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_details_text65909,setdisposal_details_text65909] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_methodd33dc,setdisposal_methodd33dc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_date920f2,setdisposal_date920f2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_ref075d5,setdisposal_ref075d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id3883f,setasset_id3883f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel407b1,setcancel407b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_update10522,setbutton_update10522] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [add_asset1b88e,setadd_asset1b88e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [basic_infot_asset_text673ff,setbasic_infot_asset_text673ff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name2dc3c,setcategory_name2dc3c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_typecdf86,setasset_typecdf86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name4044f,setasset_name4044f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tag665c1,setasset_tag665c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_code9d69b,setasset_code9d69b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [serial_number67791,setserial_number67791] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [model_number46a87,setmodel_number46a87] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [manufacturer825e8,setmanufacturer825e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [classification_text91ff0,setclassification_text91ff0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [classificationf4888,setclassificationf4888] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_classificationb7d47,setdata_classificationb7d47] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ownership_type783c2,setownership_type783c2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [lifecycle_stage26be5,setlifecycle_stage26be5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_condition4d358,setasset_condition4d358] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [risk_level7f64b,setrisk_level7f64b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location323da,setlocation323da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [additional_details_text5aceb,setadditional_details_text5aceb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location2acd9,setlocation2acd9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [description70aff,setdescription70aff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_details_text52695,setpurchase_details_text52695] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name1f183,setvendor_name1f183] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_cost899f9,setpurchase_cost899f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [currency0f0b1,setcurrency0f0b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_date9a646,setpurchase_date9a646] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [warranty_expirye6615,setwarranty_expirye6615] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_ratea6497,setdepreciation_ratea6497] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [salvage_value9adb6,setsalvage_value9adb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [current_value8e31d,setcurrent_value8e31d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_details_textb2754,setdisposal_details_textb2754] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_method1fd3c,setdisposal_method1fd3c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_dateb9385,setdisposal_dateb9385] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_ref35f4b,setdisposal_ref35f4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_idb6b5a,setasset_idb6b5a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_text766e5,setdelete_heading_text766e5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name_text2a279,setasset_name_text2a279] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_named7764,setasset_named7764] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tag_text6db8e,setasset_tag_text6db8e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_tag5b0ef,setasset_tag5b0ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name_text6b1b6,setcategory_name_text6b1b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_nameb3bdb,setcategory_nameb3bdb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_type_textbf4bc,setasset_type_textbf4bc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_typebe078,setasset_typebe078] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location_text55088,setlocation_text55088] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [location0b4e4,setlocation0b4e4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_textad78a,setconfo_textad78a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button24a33,setcancel_button24a33] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_button58a95,setok_button58a95] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id4d81b,setasset_id4d81b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id_text67e51,setasset_id_text67e51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_idfc689,setasset_idfc689] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name_text06c7c,setasset_name_text06c7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name7dfbc,setasset_name7dfbc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id185f0,setattachment_id185f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group6421d,setdoc_group6421d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name41b3b,setdoc_name41b3b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_date2eb99,settrs_created_date2eb99] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_byfae15,settrs_created_byfae15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_delete6174f,setbt_delete6174f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [documentuploadpanel14fde,setdocumentuploadpanel14fde] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_id358d1,setasset_id358d1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_add_docfde68,setbutton_add_docfde68] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [documentviewerd3b4b,setdocumentviewerd3b4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_textc80ba,setdelete_heading_textc80ba] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id_txt02e0f,setattachment_id_txt02e0f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id4eeac,setattachment_id4eeac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group_texte3945,setdoc_group_texte3945] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group82055,setdoc_group82055] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name_text6a957,setdoc_name_text6a957] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name1f607,setdoc_name1f607] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_by_text29a4f,settrs_created_by_text29a4f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_byad133,settrs_created_byad133] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_text29a5c,setconfo_text29a5c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_idbf0b0,setasset_idbf0b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button753bf,setcancel_button753bf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttone6d7f,setok_buttone6d7f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_icon_text232c3,setassign_icon_text232c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_texta5834,setassign_texta5834] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [search1d0f8,setsearch1d0f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_asset20f5c,setassign_asset20f5c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_idac541,setassign_idac541] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_namedaa81,setasset_namedaa81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_toba6cd,setassigned_toba6cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_byba0b9,setassigned_byba0b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_atc4b88,setassigned_atc4b88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expected_return_date910b8,setexpected_return_date910b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_assigne0685,setcondition_at_assigne0685] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [status7fb4b,setstatus7fb4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_view6b7cc,setbt_view6b7cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_editad624,setbt_editad624] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_deletefaec8,setbt_deletefaec8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_add_docf5447,setbt_add_docf5447] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [advancesearch9256e,setadvancesearch9256e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_information_text8af67,setassignment_information_text8af67] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name56fec,setasset_name56fec] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_tof8f17,setassigned_tof8f17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_byc4563,setassigned_byc4563] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_at45db5,setassigned_at45db5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_statusa6f80,setassignment_statusa6f80] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_assign27aff,setcondition_at_assign27aff] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expected_return_date15cfe,setexpected_return_date15cfe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_details_textb98b6,setassignment_details_textb98b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [actual_return_date06574,setactual_return_date06574] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [returned_atb4ccc,setreturned_atb4ccc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_return40b7c,setcondition_at_return40b7c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approved_by8c220,setapproved_by8c220] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approval_statuseb2b2,setapproval_statuseb2b2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_notese758f,setassignment_notese758f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acknowledgement_signedfdaee,setacknowledgement_signedfdaee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_id31be8,setassign_id31be8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_cancel83d84,setbutton_cancel83d84] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_updatedc4e0,setbutton_updatedc4e0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign090a4,setassign090a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_information_textbebbc,setassignment_information_textbebbc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name39101,setasset_name39101] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_toad6a1,setassigned_toad6a1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_byaa464,setassigned_byaa464] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_atca20b,setassigned_atca20b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_status1057b,setassignment_status1057b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_assignf6852,setcondition_at_assignf6852] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expected_return_datedf53d,setexpected_return_datedf53d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_details_text97d83,setassignment_details_text97d83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [actual_return_datec1f64,setactual_return_datec1f64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [returned_atecafb,setreturned_atecafb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_return1d3c7,setcondition_at_return1d3c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approved_by2b89c,setapproved_by2b89c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approval_statusf07b0,setapproval_statusf07b0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acknowledgement_signed5ee58,setacknowledgement_signed5ee58] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assignment_notes59be1,setassignment_notes59be1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_idb53db,setassign_idb53db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_textc848b,setdelete_heading_textc848b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name_text16bc2,setasset_name_text16bc2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_named51ee,setasset_named51ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_to_text5d18d,setassigned_to_text5d18d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_to51299,setassigned_to51299] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_at_text4a3af,setassigned_at_text4a3af] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_bycb5ab,setassigned_bycb5ab] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_assign_text4ad2d,setcondition_at_assign_text4ad2d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [condition_at_assignc35c4,setcondition_at_assignc35c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expected_return_date_text80abb,setexpected_return_date_text80abb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expected_return_date11169,setexpected_return_date11169] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_text66873,setconfo_text66873] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_idf7b2f,setassign_idf7b2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button0c073,setcancel_button0c073] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttonfa294,setok_buttonfa294] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name_textbdd29,setasset_name_textbdd29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_namee1fc6,setasset_namee1fc6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_to_text824e7,setassigned_to_text824e7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assigned_to72696,setassigned_to72696] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id0c7b6,setattachment_id0c7b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group8e81a,setdoc_group8e81a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_nameb994a,setdoc_nameb994a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_date26a21,settrs_created_date26a21] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_by95da2,settrs_created_by95da2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_deletea6263,setbt_deletea6263] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [documentuploadpanel96f16,setdocumentuploadpanel96f16] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_add_doc8e522,setbutton_add_doc8e522] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_id67308,setassign_id67308] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_text5f884,setdelete_heading_text5f884] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id_txt0f0d3,setattachment_id_txt0f0d3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_idea582,setattachment_idea582] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group_text09f3f,setdoc_group_text09f3f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group796b8,setdoc_group796b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name_text69cc2,setdoc_name_text69cc2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name19bda,setdoc_name19bda] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_by_text805fb,settrs_created_by_text805fb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_by4c93f,settrs_created_by4c93f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_text0c7c5,setconfo_text0c7c5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [assign_id67319,setassign_id67319] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button7e1a2,setcancel_button7e1a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttonc63df,setok_buttonc63df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_text_icondf716,setmaintenance_text_icondf716] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_text0649c,setmaintenance_text0649c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [search7f293,setsearch7f293] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [log_maintenanced8874,setlog_maintenanced8874] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [refdaa81,setrefdaa81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_nameba6cd,setasset_nameba6cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_typeba0b9,setmaint_typeba0b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [descriptionc4b88,setdescriptionc4b88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name910b8,setvendor_name910b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [scheduled_datee0685,setscheduled_datee0685] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost7fb4b,setcost7fb4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [status0d30b,setstatus0d30b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [view113d0,setview113d0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_edit93fc7,setbt_edit93fc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_delete70a91,setbt_delete70a91] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_idd22c1,setmaint_idd22c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [advancesearch64153,setadvancesearch64153] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_information_text37a24,setmaintenance_information_text37a24] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_namec21fd,setasset_namec21fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_typea5ba4,setmaint_typea5ba4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [priorityec586,setpriorityec586] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [scheduled_date83e9d,setscheduled_date83e9d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [completed_dated052f,setcompleted_dated052f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [next_maintenance_datee871a,setnext_maintenance_datee871a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [execution_details_text71309,setexecution_details_text71309] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [performed_bycb4dc,setperformed_bycb4dc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name17b17,setvendor_name17b17] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_referencefa982,setvendor_referencefa982] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [downtime_hours721c7,setdowntime_hours721c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost35190,setcost35190] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [descriptioneaa55,setdescriptioneaa55] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_checklist024ed,setmaintenance_checklist024ed] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_id9587d,setmaint_id9587d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_cancel02d05,setbutton_cancel02d05] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_update5cdad,setbutton_update5cdad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [schedule133fb,setschedule133fb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_text64ac6,setdelete_heading_text64ac6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name_text99dc6,setasset_name_text99dc6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name9f8b1,setasset_name9f8b1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_type_textf805a,setmaint_type_textf805a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_typefc524,setmaint_typefc524] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [priority_text5afe4,setpriority_text5afe4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [priority1b975,setpriority1b975] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [schedule_date_textc8d71,setschedule_date_textc8d71] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [schedule_dateef711,setschedule_dateef711] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [performed_by_textb5193,setperformed_by_textb5193] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [performed_byc179b,setperformed_byc179b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_text7649e,setconfo_text7649e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maint_id927de,setmaint_id927de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button36974,setcancel_button36974] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttond1793,setok_buttond1793] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_text_icon59950,setdisposal_text_icon59950] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_text2d2ac,setdisposal_text2d2ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [searchc5de1,setsearchc5de1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [initiate_disposal27af5,setinitiate_disposal27af5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_id46e83,setdisposal_id46e83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_methodba6cd,setdisposal_methodba6cd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_datee0685,setdisposal_datee0685] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [witness_nameba0b9,setwitness_nameba0b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wipe_methodc4b88,setdata_wipe_methodc4b88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_cost910b8,setdisposal_cost910b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [view6b7cc,setview6b7cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_editb236b,setbt_editb236b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_details0c71e,setdisposal_details0c71e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_nameabdbb,setvendor_nameabdbb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name819e8,setasset_name819e8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_methoddeb30,setdisposal_methoddeb30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_date12263,setdisposal_date12263] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [reasonadb68,setreasonadb68] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [compliance_financial664f8,setcompliance_financial664f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approval_reference5e1aa,setapproval_reference5e1aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [witness_nameac8f7,setwitness_nameac8f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wipe_methodfe1e6,setdata_wipe_methodfe1e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wipedad12b,setdata_wipedad12b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_valued21f4,setdisposal_valued21f4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_cost031f6,setdisposal_cost031f6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [resale_amount2eb0e,setresale_amount2eb0e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel62a73,setcancel62a73] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [update92b0c,setupdate92b0c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [initiate_disposal1b938,setinitiate_disposal1b938] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_details1d5ee,setdisposal_details1d5ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_name5f557,setvendor_name5f557] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name298df,setasset_name298df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_methoda093b,setdisposal_methoda093b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_date247ef,setdisposal_date247ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [reason8b938,setreason8b938] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [compliance_financialc9043,setcompliance_financialc9043] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [approval_referenceb0a46,setapproval_referenceb0a46] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [witness_name6fddf,setwitness_name6fddf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wipe_method8923d,setdata_wipe_method8923d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [data_wipeda4257,setdata_wipeda4257] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_value13578,setdisposal_value13578] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_cost23f44,setdisposal_cost23f44] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [resale_amount5336f,setresale_amount5336f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [disposal_idee44c,setdisposal_idee44c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [total_category_divider52a07,settotal_category_divider52a07] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [tc_icon1ed4f,settc_icon1ed4f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [total_category_textb2d2f,settotal_category_textb2d2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [total_categories55fa9,settotal_categories55fa9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [sw_cat_divider016f6,setsw_cat_divider016f6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [sc_icon481ef,setsc_icon481ef] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_category_text202b3,setsoftware_category_text202b3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_category5cc47,setsoftware_category5cc47] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [hw_cat_divider1452f,sethw_cat_divider1452f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [sc_iconbaaa3,setsc_iconbaaa3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [hardware_category_text66f11,sethardware_category_text66f11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [hardware_categoryad98e,sethardware_categoryad98e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [hw_cat_divider5f14c,sethw_cat_divider5f14c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [sc_iconefedc,setsc_iconefedc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [req_maintenance027c1,setreq_maintenance027c1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [required_maintenance9ce1e,setrequired_maintenance9ce1e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [categorytext_icond59a8,setcategorytext_icond59a8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [categorytextbfea2,setcategorytextbfea2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [search48da3,setsearch48da3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_add_category57a00,setbutton_add_category57a00] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_id37980,setacat_id37980] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_code97856,setcategory_code97856] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_prefix8b10c,setasset_prefix8b10c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name11d7f,setcategory_name11d7f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_method2b046,setdepreciation_method2b046] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [useful_life_years73932,setuseful_life_years73932] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_edit226cc,setbt_edit226cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_deleteebf73,setbt_deleteebf73] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [view0d148,setview0d148] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_add_doc2ee68,setbt_add_doc2ee68] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [advancesearchfab99,setadvancesearchfab99] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_information_text3e9d2,setcategory_information_text3e9d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_code60d4a,setcategory_code60d4a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name69309,setcategory_name69309] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [parent_category_namec5eb6,setparent_category_namec5eb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_prefix16715,setasset_prefix16715] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_configuration_text00171,setcategory_configuration_text00171] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_methodfa7cb,setdepreciation_methodfa7cb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [useful_life_years231a3,setuseful_life_years231a3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_idba9a2,setacat_idba9a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_cancel847fd,setbutton_cancel847fd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_update74a1f,setbutton_update74a1f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_add_category240df,setbt_add_category240df] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_textb1f29,setdelete_heading_textb1f29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_code_text0975e,setcategory_code_text0975e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_codef16a8,setcategory_codef16a8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name_text7648e,setcategory_name_text7648e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_namecbc0b,setcategory_namecbc0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_method_text82fb3,setdepreciation_method_text82fb3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_method0e872,setdepreciation_method0e872] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [useful_life_years_text30347,setuseful_life_years_text30347] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [useful_life_yearsa64db,setuseful_life_yearsa64db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_required_textf1aaf,setmaintenance_required_textf1aaf] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [maintenance_required336be,setmaintenance_required336be] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_texte7cc3,setconfo_texte7cc3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_id9127b,setacat_id9127b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_buttonc0568,setcancel_buttonc0568] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttonc8577,setok_buttonc8577] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_information_textf1933,setcategory_information_textf1933] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_codeeb8f1,setcategory_codeeb8f1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name2a1ea,setcategory_name2a1ea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [parent_category_name9a67f,setparent_category_name9a67f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_prefix5007a,setasset_prefix5007a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_configuration_text66228,setcategory_configuration_text66228] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [depreciation_method50f2f,setdepreciation_method50f2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [useful_life_years864b4,setuseful_life_years864b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_id298b7,setacat_id298b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_id_text04690,setacat_id_text04690] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_ida2d51,setacat_ida2d51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_name_textc9d3e,setacat_name_textc9d3e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [category_name4ccfb,setcategory_name4ccfb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id9b438,setattachment_id9b438] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group344aa,setdoc_group344aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_namef124d,setdoc_namef124d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_date16faa,settrs_created_date16faa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_byfb6e3,settrs_created_byfb6e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_delete61896,setbt_delete61896] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [documentuploadpanel643f7,setdocumentuploadpanel643f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_add_doc24b11,setbutton_add_doc24b11] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [acat_idf572e,setacat_idf572e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_license_iconfe876,setsoftware_license_iconfe876] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [software_license_text8a69d,setsoftware_license_text8a69d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [searchb475f,setsearchb475f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [add_license9d3d9,setadd_license9d3d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_id87b4a,setlicense_id87b4a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_namedaa81,setproduct_namedaa81] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_typeba0b9,setlicense_typeba0b9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_totalc4b88,setseats_totalc4b88] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_used910b8,setseats_used910b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expiry_date7fb4b,setexpiry_date7fb4b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost0d30b,setcost0d30b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [edit_btne7446,setedit_btne7446] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_delete6b394,setbutton_delete6b394] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_add_doce2f55,setbt_add_doce2f55] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_information90d62,setlicense_information90d62] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_namee8382,setasset_namee8382] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_namec9548,setproduct_namec9548] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_nameb519a,setvendor_nameb519a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_typeae36b,setlicense_typeae36b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_keyd5b6f,setlicense_keyd5b6f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_configuration37dd8,setlicense_configuration37dd8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_total6dbc7,setseats_total6dbc7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_useddd434,setseats_useddd434] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [auto_renewalb4694,setauto_renewalb4694] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [validity_financial_details82762,setvalidity_financial_details82762] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_datebfe70,setpurchase_datebfe70] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expiry_date5c034,setexpiry_date5c034] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [support_expiry4ec2c,setsupport_expiry4ec2c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [costf9899,setcostf9899] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_id07bf2,setlicense_id07bf2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [canceld59b4,setcanceld59b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [update0d16c,setupdate0d16c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [add_license3b16e,setadd_license3b16e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_information6a10f,setlicense_information6a10f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [asset_name1ae9b,setasset_name1ae9b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_name11c98,setproduct_name11c98] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [vendor_namef2df8,setvendor_namef2df8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_typec8c15,setlicense_typec8c15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_keyab6d1,setlicense_keyab6d1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_configurationf7ede,setlicense_configurationf7ede] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_total8b54b,setseats_total8b54b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_used3bba9,setseats_used3bba9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [auto_renewal3bee1,setauto_renewal3bee1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [validity_financial_details9259f,setvalidity_financial_details9259f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [purchase_date884a6,setpurchase_date884a6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [expiry_date74df0,setexpiry_date74df0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [support_expirybfd9e,setsupport_expirybfd9e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cost2568f,setcost2568f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_id49b2a,setlicense_id49b2a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [delete_heading_textb375f,setdelete_heading_textb375f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_name_text501de,setproduct_name_text501de] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_namead2dd,setproduct_namead2dd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_type_text3c22b,setlicense_type_text3c22b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_typecec9e,setlicense_typecec9e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [auto_renewal_textbdbd2,setauto_renewal_textbdbd2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [auto_renewal8e280,setauto_renewal8e280] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_total_texta19fe,setseats_total_texta19fe] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_totalf37ee,setseats_totalf37ee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_used_textc1a25,setseats_used_textc1a25] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [seats_used8c8d5,setseats_used8c8d5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [confo_textbc695,setconfo_textbc695] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_id027b5,setlicense_id027b5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [cancel_button3e8d9,setcancel_button3e8d9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [ok_buttonf3727,setok_buttonf3727] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_id_text641eb,setlicense_id_text641eb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_idd34c8,setlicense_idd34c8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_name_textc07aa,setproduct_name_textc07aa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [product_name405f8,setproduct_name405f8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [attachment_id1138d,setattachment_id1138d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_group3dcd4,setdoc_group3dcd4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [doc_name698d2,setdoc_name698d2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_date0acd9,settrs_created_date0acd9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [trs_created_by0c4db,settrs_created_by0c4db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [bt_delete17f42,setbt_delete17f42] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [documentuploadpanela3e1b,setdocumentuploadpanela3e1b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [button_add_doc7c1b7,setbutton_add_doc7c1b7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
   const [license_idbc5e1,setlicense_idbc5e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: false
    }) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       dividertotal_asset_dividerd84da:false,
       texttotal_assest_text88ed3:false,
       texttotal_assest9e45d:false,
       textit_assets6051f:false,
       dividermaintenance_due_divider05a2b:false,
       textmaintenance_due_text31400:false,
       textmaintenance_due09ab9:false,
       textoverdue_maintenancef7357:false,
       dividerwarranty_expiring_dividerf7152:false,
       textwarranty_expiring_texteee70:false,
       textwarranty_expiringfa250:false,
       textwarranty_description49c85:false,
       dividersoftware_licenses_divider9376b:false,
       textsoftware_licenses_text92f3e:false,
       textsoftware_licenses46b7c:false,
       textlicenses_near_expiry46af3:false,
       dividerpending_disposal_dividerd7969:false,
       textpending_disposal_text3d356:false,
       textpending_disposal38551:false,
       textpending_disposal_descriptionceadc:false,
       columnasset_idbd7bd:false,
       columnasset_tagafbdd:false,
       columnasset_name1ef31:false,
       columncategory2a9d0:false,
       columnserial_no3915b:false,
       columnassigned_toe3252:false,
       columnlocationee1a6:false,
       columnwarranty_expiryc5b88:false,
       columnref2b838:false,
       columnasset_name4d2a5:false,
       columnmaint_typee7fac:false,
       columndescriptionb10c9:false,
       columnvendor_name73ece:false,
       columnscheduled_date67fe7:false,
       columncost3b16a:false,
       columnstatusc3912:false,
       columnmaint_ida5387:false,
       columnproduct_nameff649:false,
       columnlicense_typee6826:false,
       columnseats_total28de1:false,
       columnseats_used897a3:false,
       columnexpiry_date7d6c7:false,
       columncost6edbe:false,
       columnlicense_idc0471:false,
       columnasset_name251dd:false,
       columndisposal_method84ead:false,
       columnreason441ae:false,
       columncurrent_value047d6:false,
       columndata_wiped9be82:false,
       columnstatus00e2a:false,
       columnasset_id29a99:false,
       columnasset_tage74f0:false,
       columnasset_name13b83:false,
       columncategory2ca3f:false,
       columnserial_no3f2a9:false,
       columnassigned_to28cfb:false,
       columnlocation7cca5:false,
       columnwarranty_expiryd159c:false,
       textinputstatusf4240:false,
       textasset_icon_text2f408:false,
       textasset_text52a32:false,
       buttonsearch15de2:false,
       buttonasset295b8:false,
       columnasset_id0e8f6:false,
       columnasset_tagd67f5:false,
       columnasset_name64bee:false,
       columncategory3fb9d:false,
       columnserial_no107f3:false,
       columnstatus26d3e:false,
       columnassigned_toea420:false,
       columnlocation96640:false,
       columnwarranty_expiryd732d:false,
       buttonviewadef5:false,
       buttonbt_delete26265:false,
       buttonbt_edit17748:false,
       buttonbt_add_docb191a:false,
       advancesearchadvancesearch9e02b:false,
       textbasic_infot_asset_text4d8c8:false,
       dropdowncategory_name3613b:false,
       dropdownasset_type91879:false,
       textinputasset_namea35ee:false,
       textinputasset_tagcb5cb:false,
       textinputasset_codeaa68d:false,
       textinputserial_numbera45cf:false,
       textinputmodel_number32271:false,
       textinputmanufacturerb8d3f:false,
       textclassification_text9bbdf:false,
       dropdownclassification8722b:false,
       dropdowndata_classification45708:false,
       dropdownownership_type1a506:false,
       dropdownlifecycle_stage1446e:false,
       dropdownasset_condition414c5:false,
       dropdownrisk_levelf1e8c:false,
       checkboxis_critical0f006:false,
       textadditional_details_text21426:false,
       textinputlocation2ff4b:false,
       textareadescription09f58:false,
       textpurchase_details_textf2780:false,
       dropdownvendor_name4190d:false,
       textinputpurchase_costff91e:false,
       dropdowncurrency823ac:false,
       datepickerpurchase_datec1162:false,
       datepickerwarranty_expiry1fdec:false,
       textinputcurrent_value8f6cd:false,
       textinputdepreciation_rate8d4a6:false,
       textinputsalvage_valuef1995:false,
       textdisposal_details_text65909:false,
       dropdowndisposal_methodd33dc:false,
       datepickerdisposal_date920f2:false,
       textinputdisposal_ref075d5:false,
       textasset_id3883f:false,
       buttoncancel407b1:false,
       buttonbutton_update10522:false,
       buttonadd_asset1b88e:false,
       textbasic_infot_asset_text673ff:false,
       textinputcategory_name2dc3c:false,
       textinputasset_typecdf86:false,
       textinputasset_name4044f:false,
       textinputasset_tag665c1:false,
       textinputasset_code9d69b:false,
       textinputserial_number67791:false,
       textinputmodel_number46a87:false,
       textinputmanufacturer825e8:false,
       textclassification_text91ff0:false,
       textinputclassificationf4888:false,
       textinputdata_classificationb7d47:false,
       textinputownership_type783c2:false,
       textinputlifecycle_stage26be5:false,
       textinputasset_condition4d358:false,
       textinputrisk_level7f64b:false,
       textinputlocation323da:false,
       textadditional_details_text5aceb:false,
       textinputlocation2acd9:false,
       textareadescription70aff:false,
       textpurchase_details_text52695:false,
       textinputvendor_name1f183:false,
       textinputpurchase_cost899f9:false,
       textinputcurrency0f0b1:false,
       textinputpurchase_date9a646:false,
       textinputwarranty_expirye6615:false,
       textinputdepreciation_ratea6497:false,
       textinputsalvage_value9adb6:false,
       textinputcurrent_value8e31d:false,
       textdisposal_details_textb2754:false,
       textinputdisposal_method1fd3c:false,
       textinputdisposal_dateb9385:false,
       textinputdisposal_ref35f4b:false,
       textasset_idb6b5a:false,
       textdelete_heading_text766e5:false,
       textasset_name_text2a279:false,
       textasset_named7764:false,
       textasset_tag_text6db8e:false,
       textasset_tag5b0ef:false,
       textcategory_name_text6b1b6:false,
       textcategory_nameb3bdb:false,
       textasset_type_textbf4bc:false,
       textasset_typebe078:false,
       textlocation_text55088:false,
       textlocation0b4e4:false,
       textconfo_textad78a:false,
       buttoncancel_button24a33:false,
       buttonok_button58a95:false,
       textasset_id4d81b:false,
       textasset_id_text67e51:false,
       textasset_idfc689:false,
       textasset_name_text06c7c:false,
       textasset_name7dfbc:false,
       columnattachment_id185f0:false,
       columndoc_group6421d:false,
       columndoc_name41b3b:false,
       columntrs_created_date2eb99:false,
       columntrs_created_byfae15:false,
       buttonbt_delete6174f:false,
       documentuploadpaneldocumentuploadpanel14fde:false,
       textasset_id358d1:false,
       buttonbutton_add_docfde68:false,
       documentviewerdocumentviewerd3b4b:false,
       textdelete_heading_textc80ba:false,
       textattachment_id_txt02e0f:false,
       textattachment_id4eeac:false,
       textdoc_group_texte3945:false,
       textdoc_group82055:false,
       textdoc_name_text6a957:false,
       textdoc_name1f607:false,
       texttrs_created_by_text29a4f:false,
       texttrs_created_byad133:false,
       textconfo_text29a5c:false,
       textasset_idbf0b0:false,
       buttoncancel_button753bf:false,
       buttonok_buttone6d7f:false,
       textassign_icon_text232c3:false,
       textassign_texta5834:false,
       buttonsearch1d0f8:false,
       buttonassign_asset20f5c:false,
       columnassign_idac541:false,
       columnasset_namedaa81:false,
       columnassigned_toba6cd:false,
       columnassigned_byba0b9:false,
       columnassigned_atc4b88:false,
       columnexpected_return_date910b8:false,
       columncondition_at_assigne0685:false,
       columnstatus7fb4b:false,
       buttonbt_view6b7cc:false,
       buttonbt_editad624:false,
       buttonbt_deletefaec8:false,
       buttonbt_add_docf5447:false,
       advancesearchadvancesearch9256e:false,
       textassignment_information_text8af67:false,
       dropdownasset_name56fec:false,
       textinputassigned_tof8f17:false,
       textinputassigned_byc4563:false,
       datepickerassigned_at45db5:false,
       dropdownassignment_statusa6f80:false,
       dropdowncondition_at_assign27aff:false,
       datepickerexpected_return_date15cfe:false,
       textassignment_details_textb98b6:false,
       datepickeractual_return_date06574:false,
       datepickerreturned_atb4ccc:false,
       dropdowncondition_at_return40b7c:false,
       textinputapproved_by8c220:false,
       dropdownapproval_statuseb2b2:false,
       textareaassignment_notese758f:false,
       checkboxacknowledgement_signedfdaee:false,
       textassign_id31be8:false,
       buttonbutton_cancel83d84:false,
       buttonbutton_updatedc4e0:false,
       buttonassign090a4:false,
       textassignment_information_textbebbc:false,
       textinputasset_name39101:false,
       textinputassigned_toad6a1:false,
       textinputassigned_byaa464:false,
       textinputassigned_atca20b:false,
       textinputassignment_status1057b:false,
       textinputcondition_at_assignf6852:false,
       textinputexpected_return_datedf53d:false,
       textassignment_details_text97d83:false,
       textinputactual_return_datec1f64:false,
       textinputreturned_atecafb:false,
       textinputcondition_at_return1d3c7:false,
       textinputapproved_by2b89c:false,
       textinputapproval_statusf07b0:false,
       textinputacknowledgement_signed5ee58:false,
       textareaassignment_notes59be1:false,
       textassign_idb53db:false,
       textdelete_heading_textc848b:false,
       textasset_name_text16bc2:false,
       textasset_named51ee:false,
       textassigned_to_text5d18d:false,
       textassigned_to51299:false,
       textassigned_at_text4a3af:false,
       textassigned_bycb5ab:false,
       textcondition_at_assign_text4ad2d:false,
       textcondition_at_assignc35c4:false,
       textexpected_return_date_text80abb:false,
       textexpected_return_date11169:false,
       textconfo_text66873:false,
       textassign_idf7b2f:false,
       buttoncancel_button0c073:false,
       buttonok_buttonfa294:false,
       textasset_name_textbdd29:false,
       textasset_namee1fc6:false,
       textassigned_to_text824e7:false,
       textassigned_to72696:false,
       columnattachment_id0c7b6:false,
       columndoc_group8e81a:false,
       columndoc_nameb994a:false,
       columntrs_created_date26a21:false,
       columntrs_created_by95da2:false,
       buttonbt_deletea6263:false,
       documentuploadpaneldocumentuploadpanel96f16:false,
       buttonbutton_add_doc8e522:false,
       textassign_id67308:false,
       textdelete_heading_text5f884:false,
       textattachment_id_txt0f0d3:false,
       textattachment_idea582:false,
       textdoc_group_text09f3f:false,
       textdoc_group796b8:false,
       textdoc_name_text69cc2:false,
       textdoc_name19bda:false,
       texttrs_created_by_text805fb:false,
       texttrs_created_by4c93f:false,
       textconfo_text0c7c5:false,
       textassign_id67319:false,
       buttoncancel_button7e1a2:false,
       buttonok_buttonc63df:false,
       textmaintenance_text_icondf716:false,
       textmaintenance_text0649c:false,
       buttonsearch7f293:false,
       buttonlog_maintenanced8874:false,
       columnrefdaa81:false,
       columnasset_nameba6cd:false,
       columnmaint_typeba0b9:false,
       columndescriptionc4b88:false,
       columnvendor_name910b8:false,
       columnscheduled_datee0685:false,
       columncost7fb4b:false,
       columnstatus0d30b:false,
       buttonview113d0:false,
       buttonbt_edit93fc7:false,
       buttonbt_delete70a91:false,
       columnmaint_idd22c1:false,
       advancesearchadvancesearch64153:false,
       textmaintenance_information_text37a24:false,
       dropdownasset_namec21fd:false,
       dropdownmaint_typea5ba4:false,
       dropdownpriorityec586:false,
       datepickerscheduled_date83e9d:false,
       datepickercompleted_dated052f:false,
       datepickernext_maintenance_datee871a:false,
       textexecution_details_text71309:false,
       textinputperformed_bycb4dc:false,
       dropdownvendor_name17b17:false,
       textinputvendor_referencefa982:false,
       textinputdowntime_hours721c7:false,
       textinputcost35190:false,
       textareadescriptioneaa55:false,
       checkboxmaintenance_checklist024ed:false,
       textmaint_id9587d:false,
       buttonbutton_cancel02d05:false,
       buttonbutton_update5cdad:false,
       buttonschedule133fb:false,
       textdelete_heading_text64ac6:false,
       textasset_name_text99dc6:false,
       textasset_name9f8b1:false,
       textmaint_type_textf805a:false,
       textmaint_typefc524:false,
       textpriority_text5afe4:false,
       textpriority1b975:false,
       textschedule_date_textc8d71:false,
       textschedule_dateef711:false,
       textperformed_by_textb5193:false,
       textperformed_byc179b:false,
       textconfo_text7649e:false,
       textmaint_id927de:false,
       buttoncancel_button36974:false,
       buttonok_buttond1793:false,
       textdisposal_text_icon59950:false,
       textdisposal_text2d2ac:false,
       buttonsearchc5de1:false,
       buttoninitiate_disposal27af5:false,
       columndisposal_id46e83:false,
       columndisposal_methodba6cd:false,
       columndisposal_datee0685:false,
       columnwitness_nameba0b9:false,
       columndata_wipe_methodc4b88:false,
       columndisposal_cost910b8:false,
       buttonview6b7cc:false,
       buttonbt_editb236b:false,
       textdisposal_details0c71e:false,
       dropdownvendor_nameabdbb:false,
       dropdownasset_name819e8:false,
       dropdowndisposal_methoddeb30:false,
       datepickerdisposal_date12263:false,
       textareareasonadb68:false,
       textcompliance_financial664f8:false,
       textinputapproval_reference5e1aa:false,
       textinputwitness_nameac8f7:false,
       dropdowndata_wipe_methodfe1e6:false,
       switchdata_wipedad12b:false,
       textinputdisposal_valued21f4:false,
       textinputdisposal_cost031f6:false,
       textinputresale_amount2eb0e:false,
       buttoncancel62a73:false,
       buttonupdate92b0c:false,
       buttoninitiate_disposal1b938:false,
       textdisposal_details1d5ee:false,
       textinputvendor_name5f557:false,
       textinputasset_name298df:false,
       textinputdisposal_methoda093b:false,
       textinputdisposal_date247ef:false,
       textareareason8b938:false,
       textcompliance_financialc9043:false,
       textinputapproval_referenceb0a46:false,
       textinputwitness_name6fddf:false,
       textinputdata_wipe_method8923d:false,
       textinputdata_wipeda4257:false,
       textinputdisposal_value13578:false,
       textinputdisposal_cost23f44:false,
       textinputresale_amount5336f:false,
       textdisposal_idee44c:false,
       dividertotal_category_divider52a07:false,
       texttc_icon1ed4f:false,
       texttotal_category_textb2d2f:false,
       texttotal_categories55fa9:false,
       dividersw_cat_divider016f6:false,
       textsc_icon481ef:false,
       textsoftware_category_text202b3:false,
       textsoftware_category5cc47:false,
       dividerhw_cat_divider1452f:false,
       textsc_iconbaaa3:false,
       texthardware_category_text66f11:false,
       texthardware_categoryad98e:false,
       dividerhw_cat_divider5f14c:false,
       textsc_iconefedc:false,
       textreq_maintenance027c1:false,
       textrequired_maintenance9ce1e:false,
       textcategorytext_icond59a8:false,
       textcategorytextbfea2:false,
       buttonsearch48da3:false,
       buttonbutton_add_category57a00:false,
       columnacat_id37980:false,
       columncategory_code97856:false,
       columnasset_prefix8b10c:false,
       columncategory_name11d7f:false,
       columndepreciation_method2b046:false,
       columnuseful_life_years73932:false,
       buttonbt_edit226cc:false,
       buttonbt_deleteebf73:false,
       buttonview0d148:false,
       buttonbt_add_doc2ee68:false,
       advancesearchadvancesearchfab99:false,
       textcategory_information_text3e9d2:false,
       textinputcategory_code60d4a:false,
       textinputcategory_name69309:false,
       dropdownparent_category_namec5eb6:false,
       textinputasset_prefix16715:false,
       textcategory_configuration_text00171:false,
       dropdowndepreciation_methodfa7cb:false,
       textinputuseful_life_years231a3:false,
       textacat_idba9a2:false,
       buttonbutton_cancel847fd:false,
       buttonbutton_update74a1f:false,
       buttonbt_add_category240df:false,
       textdelete_heading_textb1f29:false,
       textcategory_code_text0975e:false,
       textcategory_codef16a8:false,
       textcategory_name_text7648e:false,
       textcategory_namecbc0b:false,
       textdepreciation_method_text82fb3:false,
       textdepreciation_method0e872:false,
       textuseful_life_years_text30347:false,
       textuseful_life_yearsa64db:false,
       textmaintenance_required_textf1aaf:false,
       textmaintenance_required336be:false,
       textconfo_texte7cc3:false,
       textacat_id9127b:false,
       buttoncancel_buttonc0568:false,
       buttonok_buttonc8577:false,
       textcategory_information_textf1933:false,
       textinputcategory_codeeb8f1:false,
       textinputcategory_name2a1ea:false,
       textinputparent_category_name9a67f:false,
       textinputasset_prefix5007a:false,
       textcategory_configuration_text66228:false,
       textinputdepreciation_method50f2f:false,
       textinputuseful_life_years864b4:false,
       textacat_id298b7:false,
       textacat_id_text04690:false,
       textacat_ida2d51:false,
       textacat_name_textc9d3e:false,
       textcategory_name4ccfb:false,
       columnattachment_id9b438:false,
       columndoc_group344aa:false,
       columndoc_namef124d:false,
       columntrs_created_date16faa:false,
       columntrs_created_byfb6e3:false,
       buttonbt_delete61896:false,
       documentuploadpaneldocumentuploadpanel643f7:false,
       buttonbutton_add_doc24b11:false,
       textacat_idf572e:false,
       textsoftware_license_iconfe876:false,
       textsoftware_license_text8a69d:false,
       buttonsearchb475f:false,
       buttonadd_license9d3d9:false,
       columnlicense_id87b4a:false,
       columnproduct_namedaa81:false,
       columnlicense_typeba0b9:false,
       columnseats_totalc4b88:false,
       columnseats_used910b8:false,
       columnexpiry_date7fb4b:false,
       columncost0d30b:false,
       buttonedit_btne7446:false,
       buttonbutton_delete6b394:false,
       buttonbt_add_doce2f55:false,
       textlicense_information90d62:false,
       dropdownasset_namee8382:false,
       textinputproduct_namec9548:false,
       dropdownvendor_nameb519a:false,
       dropdownlicense_typeae36b:false,
       textinputlicense_keyd5b6f:false,
       textlicense_configuration37dd8:false,
       textinputseats_total6dbc7:false,
       textinputseats_useddd434:false,
       switchauto_renewalb4694:false,
       textvalidity_financial_details82762:false,
       datepickerpurchase_datebfe70:false,
       datepickerexpiry_date5c034:false,
       datepickersupport_expiry4ec2c:false,
       textinputcostf9899:false,
       textlicense_id07bf2:false,
       buttoncanceld59b4:false,
       buttonupdate0d16c:false,
       buttonadd_license3b16e:false,
       textlicense_information6a10f:false,
       textinputasset_name1ae9b:false,
       textinputproduct_name11c98:false,
       textinputvendor_namef2df8:false,
       textinputlicense_typec8c15:false,
       textinputlicense_keyab6d1:false,
       textlicense_configurationf7ede:false,
       textinputseats_total8b54b:false,
       textinputseats_used3bba9:false,
       textinputauto_renewal3bee1:false,
       textvalidity_financial_details9259f:false,
       textinputpurchase_date884a6:false,
       textinputexpiry_date74df0:false,
       textinputsupport_expirybfd9e:false,
       textinputcost2568f:false,
       textlicense_id49b2a:false,
       textdelete_heading_textb375f:false,
       textproduct_name_text501de:false,
       textproduct_namead2dd:false,
       textlicense_type_text3c22b:false,
       textlicense_typecec9e:false,
       textauto_renewal_textbdbd2:false,
       textauto_renewal8e280:false,
       textseats_total_texta19fe:false,
       textseats_totalf37ee:false,
       textseats_used_textc1a25:false,
       textseats_used8c8d5:false,
       textconfo_textbc695:false,
       textlicense_id027b5:false,
       buttoncancel_button3e8d9:false,
       buttonok_buttonf3727:false,
       textlicense_id_text641eb:false,
       textlicense_idd34c8:false,
       textproduct_name_textc07aa:false,
       textproduct_name405f8:false,
       columnattachment_id1138d:false,
       columndoc_group3dcd4:false,
       columndoc_name698d2:false,
       columntrs_created_date0acd9:false,
       columntrs_created_by0c4db:false,
       buttonbt_delete17f42:false,
       documentuploadpaneldocumentuploadpanela3e1b:false,
       buttonbutton_add_doc7c1b7:false,
       textlicense_idbc5e1:false,
       groupasset_dashboard_group4d6cb:false,
       grouptotal_asset_group69aa9:false,
       groupmaintenance_due_group704ca:false,
       groupwarranty_expiring_groupb5bd4:false,
       groupsoftware_licenses_group4beb5:false,
       grouppending_disposal_group2580d:false,
       grouptable_group94010:false,
       groupsubscreen99589:false,
       groupCT006_AF_UF_UFWS_ECP_AMS_asset_v104dc1:false,
       groupasset_table_group6fffa:false,
       tableasset_table6082a:false,
       groupCT006_AF_UF_UFWS_ECP_AMS_assetMaintenance_v1c3e7e:false,
       groupasset_maintenance_table_groupe042b:false,
       tableasset_maintenance_table6cdf1:false,
       groupCT006_AF_UF_UFWS_ECP_AMS_assetSoftwareLicenses_v19f426:false,
       groupasset_software_licenses_table_groupcb553:false,
       tableasset_software_licenses_table13758:false,
       groupCT006_AF_UF_UFWS_ECP_AMS_assetDisposal_v1612d1:false,
       groupasset_disposal_table_group329e9:false,
       tableasset_disposal_table440cd:false,
       groupCT006_AF_UF_UFWS_ECP_AMS_warrentyExpiring_v1faac7:false,
       groupwarrenty_expiring_table_group116d1:false,
       tablewarrenty_expiring_tablee3168:false,
       groupoverall_asset_group7ded2:false,
       groupicon_text_group476bd:false,
       tableasset_tablef2b38:false,
       groupasset_search_group46c56:false,
       groupnew_asset_groupdb5a7:false,
       groupasset_info_groupdeeeb:false,
       groupclassification_group3c6b3:false,
       groupadditional_details_group8c616:false,
       grouppyrchase_details_group76407:false,
       groupdisposal_details_groupaffa1:false,
       groupdynamicactions1077f:false,
       groupnew_asset_group3261e:false,
       groupasset_info_groupcc113:false,
       groupclassification_groupd9d65:false,
       groupadditional_details_groupaff35:false,
       grouppyrchase_details_groupc3900:false,
       groupdisposal_details_group67f77:false,
       groupgroup_delete3c02f:false,
       groupdoc_attached_group36b0d:false,
       grouptable_groupdaaaa:false,
       tableasset_doc_table49f40:false,
       groupdocument_viewer_group9a6ec:false,
       groupgroup_delete10eb3:false,
       groupoverall_assignments_group04cba:false,
       groupgroup9ad63:false,
       tableassignments_table75a5d:false,
       groupasset_search_group75d0d:false,
       groupassign_asset_groupdb5a7:false,
       groupassignment_information_group5d144:false,
       groupassignment_details_group7f60d:false,
       groupdynamicactions956ba:false,
       groupassign_asset_groupb4f2d:false,
       groupassignment_information_groupc96e9:false,
       groupassignment_details_group136e4:false,
       groupgroup_delete0df4b:false,
       groupdoc_attached_groupbc2cf:false,
       grouptable_group75a5e:false,
       tabledoc_table392d0:false,
       groupgroup_delete8ee3b:false,
       groupoverall_maintenance_group04cba:false,
       groupicon_groupedce3:false,
       tablemaintenance_table75a5d:false,
       groupasset_search_group1a6b1:false,
       groupmaintenance_groupdb5a7:false,
       groupmaintenance_information_groupea3ac:false,
       groupexecution_details_group591cd:false,
       groupdynamicactions8672d:false,
       groupgroup_delete3f77f:false,
       groupoverall_disposal_group04cba:false,
       groupicon_text_group23d8c:false,
       tabledisposal_table75a5d:false,
       groupinitiate_asset_disposal_groupdb5a7:false,
       groupdisposal_details_groupe1b0c:false,
       groupcompliance_financial_group1f9bc:false,
       groupdynamicactions9a7ff:false,
       groupinitiate_asset_disposal_group0196a:false,
       groupdisposal_details_groupaa369:false,
       groupcompliance_financial_groupe5dd8:false,
       groupasset_dashboard_group485d3:false,
       grouptotal_asset_groupfe2e6:false,
       groupsoftware_category_group6e622:false,
       grouphardware_category_groupfcf3f:false,
       groupreq_maint_groupcf317:false,
       groupcat_groupe0f50:false,
       tablecategory_table3e4ac:false,
       groupasset_search_groupd84d5:false,
       groupcategory_groupe3ebd:false,
       groupcategory_information_groupfb68a:false,
       groupcategory_configuration_group5d6af:false,
       groupdynamicactions13884:false,
       groupgroup_delete3c2cd:false,
       groupcategory_group70e38:false,
       groupcategory_information_groupa040a:false,
       groupcategory_configuration_group06f09:false,
       groupdoc_attached_groupb9604:false,
       grouptable_groupefcb8:false,
       tablecategory_doc_table9b042:false,
       groupoverall_softwarelicenses_group04cba:false,
       groupicon_text_group44cf7:false,
       tablesoftware_licenses_table75a5d:false,
       groupadd_license_groupdb5a7:false,
       grouplicense_information_groupfae34:false,
       grouplicense_configuration_groupb5d91:false,
       groupvalidity_financial_details_grouped4a1:false,
       groupdynamicactions67d98:false,
       groupadd_license_group1bee6:false,
       grouplicense_information_group4e03c:false,
       grouplicense_configuration_groupa329d:false,
       groupvalidity_financial_details_groupb8a9f:false,
       groupgroup_deletedf5b8:false,
       groupdoc_attached_groupc3d26:false,
       grouptable_group7bc52:false,
       tablesoftware_licenses_doc_table265b6:false,
      })

  ////// screen states 
  const [assetdasboard_v1,setassetdasboard_v1] = React.useState<any>({})
  const [assetdasboard_v1Props,setassetdasboard_v1Props] = React.useState<any>({})
  const [assets_v1,setassets_v1] = React.useState<any>({})
  const [assets_v1Props,setassets_v1Props] = React.useState<any>({})
  const [assetsearch_v1,setassetsearch_v1] = React.useState<any>({})
  const [assetsearch_v1Props,setassetsearch_v1Props] = React.useState<any>({})
  const [newasset_v1,setnewasset_v1] = React.useState<any>({})
  const [newasset_v1Props,setnewasset_v1Props] = React.useState<any>({})
  const [newassetview_v1,setnewassetview_v1] = React.useState<any>({})
  const [newassetview_v1Props,setnewassetview_v1Props] = React.useState<any>({})
  const [deletescreen_v1,setdeletescreen_v1] = React.useState<any>({})
  const [deletescreen_v1Props,setdeletescreen_v1Props] = React.useState<any>({})
  const [addassetdocument_v1,setaddassetdocument_v1] = React.useState<any>({})
  const [addassetdocument_v1Props,setaddassetdocument_v1Props] = React.useState<any>({})
  const [documentviewer_v1,setdocumentviewer_v1] = React.useState<any>({})
  const [documentviewer_v1Props,setdocumentviewer_v1Props] = React.useState<any>({})
  const [assetdocdelete_v1,setassetdocdelete_v1] = React.useState<any>({})
  const [assetdocdelete_v1Props,setassetdocdelete_v1Props] = React.useState<any>({})
  const [assetassignments_v1,setassetassignments_v1] = React.useState<any>({})
  const [assetassignments_v1Props,setassetassignments_v1Props] = React.useState<any>({})
  const [assignassetsearch_v1,setassignassetsearch_v1] = React.useState<any>({})
  const [assignassetsearch_v1Props,setassignassetsearch_v1Props] = React.useState<any>({})
  const [assignasset_v1,setassignasset_v1] = React.useState<any>({})
  const [assignasset_v1Props,setassignasset_v1Props] = React.useState<any>({})
  const [assignassetview_v1,setassignassetview_v1] = React.useState<any>({})
  const [assignassetview_v1Props,setassignassetview_v1Props] = React.useState<any>({})
  const [assignassetdelete_v1,setassignassetdelete_v1] = React.useState<any>({})
  const [assignassetdelete_v1Props,setassignassetdelete_v1Props] = React.useState<any>({})
  const [addassignmentdocument_v1,setaddassignmentdocument_v1] = React.useState<any>({})
  const [addassignmentdocument_v1Props,setaddassignmentdocument_v1Props] = React.useState<any>({})
  const [assigndocdelete_v1,setassigndocdelete_v1] = React.useState<any>({})
  const [assigndocdelete_v1Props,setassigndocdelete_v1Props] = React.useState<any>({})
  const [assetmaintenance_v1,setassetmaintenance_v1] = React.useState<any>({})
  const [assetmaintenance_v1Props,setassetmaintenance_v1Props] = React.useState<any>({})
  const [maintenancesearch_v1,setmaintenancesearch_v1] = React.useState<any>({})
  const [maintenancesearch_v1Props,setmaintenancesearch_v1Props] = React.useState<any>({})
  const [logmaintenance_v1,setlogmaintenance_v1] = React.useState<any>({})
  const [logmaintenance_v1Props,setlogmaintenance_v1Props] = React.useState<any>({})
  const [maintenancedelete_v1,setmaintenancedelete_v1] = React.useState<any>({})
  const [maintenancedelete_v1Props,setmaintenancedelete_v1Props] = React.useState<any>({})
  const [assetdisposal_v1,setassetdisposal_v1] = React.useState<any>({})
  const [assetdisposal_v1Props,setassetdisposal_v1Props] = React.useState<any>({})
  const [initiateassetdisposal_v1,setinitiateassetdisposal_v1] = React.useState<any>({})
  const [initiateassetdisposal_v1Props,setinitiateassetdisposal_v1Props] = React.useState<any>({})
  const [assetdisposalview_v1,setassetdisposalview_v1] = React.useState<any>({})
  const [assetdisposalview_v1Props,setassetdisposalview_v1Props] = React.useState<any>({})
  const [assetcategory_v1,setassetcategory_v1] = React.useState<any>({})
  const [assetcategory_v1Props,setassetcategory_v1Props] = React.useState<any>({})
  const [categorysearch_v1,setcategorysearch_v1] = React.useState<any>({})
  const [categorysearch_v1Props,setcategorysearch_v1Props] = React.useState<any>({})
  const [addcategory_v1,setaddcategory_v1] = React.useState<any>({})
  const [addcategory_v1Props,setaddcategory_v1Props] = React.useState<any>({})
  const [categorydelete_v1,setcategorydelete_v1] = React.useState<any>({})
  const [categorydelete_v1Props,setcategorydelete_v1Props] = React.useState<any>({})
  const [addcategoryview_v1,setaddcategoryview_v1] = React.useState<any>({})
  const [addcategoryview_v1Props,setaddcategoryview_v1Props] = React.useState<any>({})
  const [addcategorydocument_v1,setaddcategorydocument_v1] = React.useState<any>({})
  const [addcategorydocument_v1Props,setaddcategorydocument_v1Props] = React.useState<any>({})
  const [assetsoftwarelicenses_v1,setassetsoftwarelicenses_v1] = React.useState<any>({})
  const [assetsoftwarelicenses_v1Props,setassetsoftwarelicenses_v1Props] = React.useState<any>({})
  const [addlicense_v1,setaddlicense_v1] = React.useState<any>({})
  const [addlicense_v1Props,setaddlicense_v1Props] = React.useState<any>({})
  const [addlicenseview_v1,setaddlicenseview_v1] = React.useState<any>({})
  const [addlicenseview_v1Props,setaddlicenseview_v1Props] = React.useState<any>({})
  const [licensedelete_v1,setlicensedelete_v1] = React.useState<any>({})
  const [licensedelete_v1Props,setlicensedelete_v1Props] = React.useState<any>({})
  const [addsoftwarelicensesdocument_v1,setaddsoftwarelicensesdocument_v1] = React.useState<any>({})
  const [addsoftwarelicensesdocument_v1Props,setaddsoftwarelicensesdocument_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_assetdashboard_v1Props,setdfd_assetdashboard_v1Props] = React.useState<any>([])
  const [dfd_assets_v1Props,setdfd_assets_v1Props] = React.useState<any>([])
  const [dfd_assetmaintenance_v1Props,setdfd_assetmaintenance_v1Props] = React.useState<any>([])
  const [dfd_assetsoftwarelicenses_v1Props,setdfd_assetsoftwarelicenses_v1Props] = React.useState<any>([])
  const [dfd_assetdisposal_v1Props,setdfd_assetdisposal_v1Props] = React.useState<any>([])
  const [dfd_assettypecombo_v1Props,setdfd_assettypecombo_v1Props] = React.useState<any>([])
  const [dfd_assetcategorycombo_v1Props,setdfd_assetcategorycombo_v1Props] = React.useState<any>([])
  const [dfd_assetclassificationcombo_v1Props,setdfd_assetclassificationcombo_v1Props] = React.useState<any>([])
  const [dfd_assetdataclassificationcombo_v1Props,setdfd_assetdataclassificationcombo_v1Props] = React.useState<any>([])
  const [dfd_ownershiptypecombo_v1Props,setdfd_ownershiptypecombo_v1Props] = React.useState<any>([])
  const [dfd_assetconditioncombo_v1Props,setdfd_assetconditioncombo_v1Props] = React.useState<any>([])
  const [dfd_disposalmethodcombo_v1Props,setdfd_disposalmethodcombo_v1Props] = React.useState<any>([])
  const [dfd_risklevelcombo_v1Props,setdfd_risklevelcombo_v1Props] = React.useState<any>([])
  const [dfd_vendornamecombo_v1Props,setdfd_vendornamecombo_v1Props] = React.useState<any>([])
  const [dfd_lifecyclestagecombo_v1Props,setdfd_lifecyclestagecombo_v1Props] = React.useState<any>([])
  const [dfd_currencycombo_v1Props,setdfd_currencycombo_v1Props] = React.useState<any>([])
  const [dfd_assetdoctable_v1Props,setdfd_assetdoctable_v1Props] = React.useState<any>([])
  const [dfd_assigndoctable_v1Props,setdfd_assigndoctable_v1Props] = React.useState<any>([])
  const [dfd_categorydoctable_v1Props,setdfd_categorydoctable_v1Props] = React.useState<any>([])
  const [dfd_assetassignments_v1Props,setdfd_assetassignments_v1Props] = React.useState<any>([])
  const [dfd_assetnamecombo_v1Props,setdfd_assetnamecombo_v1Props] = React.useState<any>([])
  const [dfd_assignmentstatuscombo_v1Props,setdfd_assignmentstatuscombo_v1Props] = React.useState<any>([])
  const [dfd_conditionatreturncombo_v1Props,setdfd_conditionatreturncombo_v1Props] = React.useState<any>([])
  const [dfd_approvalstatuscombo_v1Props,setdfd_approvalstatuscombo_v1Props] = React.useState<any>([])
  const [dfd_maintenancetypecombo_v1Props,setdfd_maintenancetypecombo_v1Props] = React.useState<any>([])
  const [dfd_prioritycombo_v1Props,setdfd_prioritycombo_v1Props] = React.useState<any>([])
  const [dfd_assetcategory_v1Props,setdfd_assetcategory_v1Props] = React.useState<any>([])
  const [dfd_parentcategorycombo_v1Props,setdfd_parentcategorycombo_v1Props] = React.useState<any>([])
  const [dfd_depreciationmethodcombo_v1Props,setdfd_depreciationmethodcombo_v1Props] = React.useState<any>([])
  const [dfd_assetcategorycards_v1Props,setdfd_assetcategorycards_v1Props] = React.useState<any>([])
  const [dfd_licensetypecombo_v1Props,setdfd_licensetypecombo_v1Props] = React.useState<any>([])
  const [dfd_softwaredoctable_v1Props,setdfd_softwaredoctable_v1Props] = React.useState<any>([])
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
    settotal_asset_dividerd84da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_assest_text88ed3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_assest9e45d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setit_assets6051f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_due_divider05a2b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_due_text31400(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_due09ab9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoverdue_maintenancef7357(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiring_dividerf7152(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiring_texteee70(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiringfa250(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_description49c85(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_licenses_divider9376b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_licenses_text92f3e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_licenses46b7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicenses_near_expiry46af3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_disposal_dividerd7969(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_disposal_text3d356(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_disposal38551(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpending_disposal_descriptionceadc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_idbd7bd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tagafbdd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name1ef31(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory2a9d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setserial_no3915b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_toe3252(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocationee1a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiryc5b88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setref2b838(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name4d2a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_typee7fac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescriptionb10c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name73ece(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setscheduled_date67fe7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost3b16a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatusc3912(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_ida5387(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_nameff649(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_typee6826(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_total28de1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_used897a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpiry_date7d6c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost6edbe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_idc0471(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name251dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_method84ead(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreason441ae(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrent_value047d6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wiped9be82(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus00e2a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id29a99(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tage74f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name13b83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory2ca3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setserial_no3f2a9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_to28cfb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation7cca5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiryd159c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatusf4240(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_icon_text2f408(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_text52a32(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch15de2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset295b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id0e8f6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tagd67f5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name64bee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory3fb9d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setserial_no107f3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus26d3e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_toea420(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation96640(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiryd732d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setviewadef5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_delete26265(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_edit17748(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_add_docb191a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch9e02b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbasic_infot_asset_text4d8c8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name3613b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_type91879(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_namea35ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tagcb5cb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_codeaa68d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setserial_numbera45cf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmodel_number32271(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmanufacturerb8d3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclassification_text9bbdf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclassification8722b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_classification45708(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setownership_type1a506(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlifecycle_stage1446e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_condition414c5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrisk_levelf1e8c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_critical0f006(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadditional_details_text21426(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation2ff4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescription09f58(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_details_textf2780(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name4190d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_costff91e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency823ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_datec1162(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expiry1fdec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrent_value8f6cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_rate8d4a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalvage_valuef1995(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_details_text65909(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_methodd33dc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_date920f2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_ref075d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id3883f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel407b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_update10522(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_asset1b88e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbasic_infot_asset_text673ff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name2dc3c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_typecdf86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name4044f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tag665c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_code9d69b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setserial_number67791(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmodel_number46a87(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmanufacturer825e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclassification_text91ff0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclassificationf4888(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_classificationb7d47(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setownership_type783c2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlifecycle_stage26be5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_condition4d358(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrisk_level7f64b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation323da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadditional_details_text5aceb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation2acd9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescription70aff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_details_text52695(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name1f183(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_cost899f9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrency0f0b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_date9a646(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwarranty_expirye6615(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_ratea6497(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsalvage_value9adb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcurrent_value8e31d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_details_textb2754(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_method1fd3c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_dateb9385(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_ref35f4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_idb6b5a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_text766e5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name_text2a279(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_named7764(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tag_text6db8e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_tag5b0ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name_text6b1b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_nameb3bdb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_type_textbf4bc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_typebe078(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation_text55088(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlocation0b4e4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_textad78a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button24a33(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_button58a95(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id4d81b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id_text67e51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_idfc689(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name_text06c7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name7dfbc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id185f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group6421d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name41b3b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date2eb99(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_byfae15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_delete6174f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentuploadpanel14fde(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_id358d1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_add_docfde68(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentviewerd3b4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_textc80ba(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id_txt02e0f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id4eeac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group_texte3945(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group82055(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name_text6a957(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name1f607(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by_text29a4f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_byad133(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_text29a5c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_idbf0b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button753bf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttone6d7f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_icon_text232c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_texta5834(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch1d0f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_asset20f5c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_idac541(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_namedaa81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_toba6cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_byba0b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_atc4b88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpected_return_date910b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_assigne0685(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus7fb4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_view6b7cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_editad624(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_deletefaec8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_add_docf5447(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch9256e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_information_text8af67(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name56fec(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_tof8f17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_byc4563(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_at45db5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_statusa6f80(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_assign27aff(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpected_return_date15cfe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_details_textb98b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setactual_return_date06574(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturned_atb4ccc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_return40b7c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproved_by8c220(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproval_statuseb2b2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_notese758f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacknowledgement_signedfdaee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_id31be8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_cancel83d84(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_updatedc4e0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign090a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_information_textbebbc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name39101(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_toad6a1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_byaa464(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_atca20b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_status1057b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_assignf6852(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpected_return_datedf53d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_details_text97d83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setactual_return_datec1f64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreturned_atecafb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_return1d3c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproved_by2b89c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproval_statusf07b0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacknowledgement_signed5ee58(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassignment_notes59be1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_idb53db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_textc848b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name_text16bc2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_named51ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_to_text5d18d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_to51299(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_at_text4a3af(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_bycb5ab(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_assign_text4ad2d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcondition_at_assignc35c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpected_return_date_text80abb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpected_return_date11169(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_text66873(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_idf7b2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button0c073(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttonfa294(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name_textbdd29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_namee1fc6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_to_text824e7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassigned_to72696(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id0c7b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group8e81a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_nameb994a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date26a21(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by95da2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_deletea6263(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentuploadpanel96f16(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_add_doc8e522(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_id67308(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_text5f884(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id_txt0f0d3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_idea582(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group_text09f3f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group796b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name_text69cc2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name19bda(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by_text805fb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by4c93f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_text0c7c5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setassign_id67319(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button7e1a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttonc63df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_text_icondf716(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_text0649c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch7f293(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlog_maintenanced8874(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrefdaa81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_nameba6cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_typeba0b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescriptionc4b88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name910b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setscheduled_datee0685(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost7fb4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus0d30b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview113d0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_edit93fc7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_delete70a91(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_idd22c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearch64153(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_information_text37a24(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_namec21fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_typea5ba4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriorityec586(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setscheduled_date83e9d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompleted_dated052f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setnext_maintenance_datee871a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexecution_details_text71309(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setperformed_bycb4dc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name17b17(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_referencefa982(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdowntime_hours721c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost35190(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdescriptioneaa55(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_checklist024ed(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_id9587d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_cancel02d05(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_update5cdad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setschedule133fb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_text64ac6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name_text99dc6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name9f8b1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_type_textf805a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_typefc524(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority_text5afe4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpriority1b975(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setschedule_date_textc8d71(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setschedule_dateef711(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setperformed_by_textb5193(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setperformed_byc179b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_text7649e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaint_id927de(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button36974(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttond1793(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_text_icon59950(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_text2d2ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearchc5de1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinitiate_disposal27af5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_id46e83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_methodba6cd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_datee0685(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwitness_nameba0b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wipe_methodc4b88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_cost910b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview6b7cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_editb236b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_details0c71e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_nameabdbb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name819e8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_methoddeb30(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_date12263(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreasonadb68(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompliance_financial664f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproval_reference5e1aa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwitness_nameac8f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wipe_methodfe1e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wipedad12b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_valued21f4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_cost031f6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setresale_amount2eb0e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel62a73(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setupdate92b0c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setinitiate_disposal1b938(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_details1d5ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_name5f557(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name298df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_methoda093b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_date247ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreason8b938(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcompliance_financialc9043(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapproval_referenceb0a46(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setwitness_name6fddf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wipe_method8923d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdata_wipeda4257(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_value13578(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_cost23f44(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setresale_amount5336f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdisposal_idee44c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_category_divider52a07(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settc_icon1ed4f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_category_textb2d2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_categories55fa9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsw_cat_divider016f6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsc_icon481ef(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_category_text202b3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_category5cc47(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethw_cat_divider1452f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsc_iconbaaa3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethardware_category_text66f11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethardware_categoryad98e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    sethw_cat_divider5f14c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsc_iconefedc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreq_maintenance027c1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrequired_maintenance9ce1e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategorytext_icond59a8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategorytextbfea2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearch48da3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_add_category57a00(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_id37980(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_code97856(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_prefix8b10c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name11d7f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_method2b046(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuseful_life_years73932(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_edit226cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_deleteebf73(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setview0d148(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_add_doc2ee68(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadvancesearchfab99(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_information_text3e9d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_code60d4a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name69309(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setparent_category_namec5eb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_prefix16715(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_configuration_text00171(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_methodfa7cb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuseful_life_years231a3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_idba9a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_cancel847fd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_update74a1f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_add_category240df(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_textb1f29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_code_text0975e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_codef16a8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name_text7648e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_namecbc0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_method_text82fb3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_method0e872(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuseful_life_years_text30347(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuseful_life_yearsa64db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_required_textf1aaf(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmaintenance_required336be(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_texte7cc3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_id9127b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_buttonc0568(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttonc8577(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_information_textf1933(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_codeeb8f1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name2a1ea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setparent_category_name9a67f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_prefix5007a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_configuration_text66228(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdepreciation_method50f2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setuseful_life_years864b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_id298b7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_id_text04690(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_ida2d51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_name_textc9d3e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_name4ccfb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id9b438(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group344aa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_namef124d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date16faa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_byfb6e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_delete61896(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentuploadpanel643f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_add_doc24b11(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setacat_idf572e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_license_iconfe876(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsoftware_license_text8a69d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsearchb475f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_license9d3d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_id87b4a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_namedaa81(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_typeba0b9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_totalc4b88(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_used910b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpiry_date7fb4b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost0d30b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setedit_btne7446(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_delete6b394(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_add_doce2f55(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_information90d62(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_namee8382(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_namec9548(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_nameb519a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_typeae36b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_keyd5b6f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_configuration37dd8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_total6dbc7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_useddd434(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setauto_renewalb4694(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalidity_financial_details82762(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_datebfe70(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpiry_date5c034(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsupport_expiry4ec2c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcostf9899(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_id07bf2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcanceld59b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setupdate0d16c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd_license3b16e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_information6a10f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setasset_name1ae9b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_name11c98(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvendor_namef2df8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_typec8c15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_keyab6d1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_configurationf7ede(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_total8b54b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_used3bba9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setauto_renewal3bee1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setvalidity_financial_details9259f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpurchase_date884a6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpiry_date74df0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsupport_expirybfd9e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcost2568f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_id49b2a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdelete_heading_textb375f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_name_text501de(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_namead2dd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_type_text3c22b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_typecec9e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setauto_renewal_textbdbd2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setauto_renewal8e280(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_total_texta19fe(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_totalf37ee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_used_textc1a25(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setseats_used8c8d5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setconfo_textbc695(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_id027b5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcancel_button3e8d9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setok_buttonf3727(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_id_text641eb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_idd34c8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_name_textc07aa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setproduct_name405f8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment_id1138d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_group3dcd4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdoc_name698d2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_date0acd9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by0c4db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbt_delete17f42(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdocumentuploadpanela3e1b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbutton_add_doc7c1b7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setlicense_idbc5e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
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
        asset_dashboard_group4d6cb, 
        setasset_dashboard_group4d6cb,
        asset_dashboard_group4d6cbProps, 
        setasset_dashboard_group4d6cbProps,
        total_asset_group69aa9, 
        settotal_asset_group69aa9,
        total_asset_group69aa9Props, 
        settotal_asset_group69aa9Props,
        maintenance_due_group704ca, 
        setmaintenance_due_group704ca,
        maintenance_due_group704caProps, 
        setmaintenance_due_group704caProps,
        warranty_expiring_groupb5bd4, 
        setwarranty_expiring_groupb5bd4,
        warranty_expiring_groupb5bd4Props, 
        setwarranty_expiring_groupb5bd4Props,
        software_licenses_group4beb5, 
        setsoftware_licenses_group4beb5,
        software_licenses_group4beb5Props, 
        setsoftware_licenses_group4beb5Props,
        pending_disposal_group2580d, 
        setpending_disposal_group2580d,
        pending_disposal_group2580dProps, 
        setpending_disposal_group2580dProps,
        table_group94010, 
        settable_group94010,
        table_group94010Props, 
        settable_group94010Props,
        subscreen99589, 
        setsubscreen99589,
        subscreen99589Props, 
        setsubscreen99589Props,
        ct006_af_uf_ufws_ecp_ams_asset_v104dc1, 
        setct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, 
        setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        asset_table_group6fffa, 
        setasset_table_group6fffa,
        asset_table_group6fffaProps, 
        setasset_table_group6fffaProps,
        asset_table6082a, 
        setasset_table6082a,
        asset_table6082aProps, 
        setasset_table6082aProps,
        ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, 
        setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, 
        setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        asset_maintenance_table_groupe042b, 
        setasset_maintenance_table_groupe042b,
        asset_maintenance_table_groupe042bProps, 
        setasset_maintenance_table_groupe042bProps,
        asset_maintenance_table6cdf1, 
        setasset_maintenance_table6cdf1,
        asset_maintenance_table6cdf1Props, 
        setasset_maintenance_table6cdf1Props,
        ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, 
        setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, 
        setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        asset_software_licenses_table_groupcb553, 
        setasset_software_licenses_table_groupcb553,
        asset_software_licenses_table_groupcb553Props, 
        setasset_software_licenses_table_groupcb553Props,
        asset_software_licenses_table13758, 
        setasset_software_licenses_table13758,
        asset_software_licenses_table13758Props, 
        setasset_software_licenses_table13758Props,
        ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, 
        setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, 
        setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        asset_disposal_table_group329e9, 
        setasset_disposal_table_group329e9,
        asset_disposal_table_group329e9Props, 
        setasset_disposal_table_group329e9Props,
        asset_disposal_table440cd, 
        setasset_disposal_table440cd,
        asset_disposal_table440cdProps, 
        setasset_disposal_table440cdProps,
        ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, 
        setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, 
        setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        warrenty_expiring_table_group116d1, 
        setwarrenty_expiring_table_group116d1,
        warrenty_expiring_table_group116d1Props, 
        setwarrenty_expiring_table_group116d1Props,
        warrenty_expiring_tablee3168, 
        setwarrenty_expiring_tablee3168,
        warrenty_expiring_tablee3168Props, 
        setwarrenty_expiring_tablee3168Props,
        overall_asset_group7ded2, 
        setoverall_asset_group7ded2,
        overall_asset_group7ded2Props, 
        setoverall_asset_group7ded2Props,
        icon_text_group476bd, 
        seticon_text_group476bd,
        icon_text_group476bdProps, 
        seticon_text_group476bdProps,
        asset_tablef2b38, 
        setasset_tablef2b38,
        asset_tablef2b38Props, 
        setasset_tablef2b38Props,
        asset_search_group46c56, 
        setasset_search_group46c56,
        asset_search_group46c56Props, 
        setasset_search_group46c56Props,
        new_asset_groupdb5a7, 
        setnew_asset_groupdb5a7,
        new_asset_groupdb5a7Props, 
        setnew_asset_groupdb5a7Props,
        asset_info_groupdeeeb, 
        setasset_info_groupdeeeb,
        asset_info_groupdeeebProps, 
        setasset_info_groupdeeebProps,
        classification_group3c6b3, 
        setclassification_group3c6b3,
        classification_group3c6b3Props, 
        setclassification_group3c6b3Props,
        additional_details_group8c616, 
        setadditional_details_group8c616,
        additional_details_group8c616Props, 
        setadditional_details_group8c616Props,
        pyrchase_details_group76407, 
        setpyrchase_details_group76407,
        pyrchase_details_group76407Props, 
        setpyrchase_details_group76407Props,
        disposal_details_groupaffa1, 
        setdisposal_details_groupaffa1,
        disposal_details_groupaffa1Props, 
        setdisposal_details_groupaffa1Props,
        dynamicactions1077f, 
        setdynamicactions1077f,
        dynamicactions1077fProps, 
        setdynamicactions1077fProps,
        new_asset_group3261e, 
        setnew_asset_group3261e,
        new_asset_group3261eProps, 
        setnew_asset_group3261eProps,
        asset_info_groupcc113, 
        setasset_info_groupcc113,
        asset_info_groupcc113Props, 
        setasset_info_groupcc113Props,
        classification_groupd9d65, 
        setclassification_groupd9d65,
        classification_groupd9d65Props, 
        setclassification_groupd9d65Props,
        additional_details_groupaff35, 
        setadditional_details_groupaff35,
        additional_details_groupaff35Props, 
        setadditional_details_groupaff35Props,
        pyrchase_details_groupc3900, 
        setpyrchase_details_groupc3900,
        pyrchase_details_groupc3900Props, 
        setpyrchase_details_groupc3900Props,
        disposal_details_group67f77, 
        setdisposal_details_group67f77,
        disposal_details_group67f77Props, 
        setdisposal_details_group67f77Props,
        group_delete3c02f, 
        setgroup_delete3c02f,
        group_delete3c02fProps, 
        setgroup_delete3c02fProps,
        doc_attached_group36b0d, 
        setdoc_attached_group36b0d,
        doc_attached_group36b0dProps, 
        setdoc_attached_group36b0dProps,
        table_groupdaaaa, 
        settable_groupdaaaa,
        table_groupdaaaaProps, 
        settable_groupdaaaaProps,
        asset_doc_table49f40, 
        setasset_doc_table49f40,
        asset_doc_table49f40Props, 
        setasset_doc_table49f40Props,
        document_viewer_group9a6ec, 
        setdocument_viewer_group9a6ec,
        document_viewer_group9a6ecProps, 
        setdocument_viewer_group9a6ecProps,
        group_delete10eb3, 
        setgroup_delete10eb3,
        group_delete10eb3Props, 
        setgroup_delete10eb3Props,
        overall_assignments_group04cba, 
        setoverall_assignments_group04cba,
        overall_assignments_group04cbaProps, 
        setoverall_assignments_group04cbaProps,
        group9ad63, 
        setgroup9ad63,
        group9ad63Props, 
        setgroup9ad63Props,
        assignments_table75a5d, 
        setassignments_table75a5d,
        assignments_table75a5dProps, 
        setassignments_table75a5dProps,
        asset_search_group75d0d, 
        setasset_search_group75d0d,
        asset_search_group75d0dProps, 
        setasset_search_group75d0dProps,
        assign_asset_groupdb5a7, 
        setassign_asset_groupdb5a7,
        assign_asset_groupdb5a7Props, 
        setassign_asset_groupdb5a7Props,
        assignment_information_group5d144, 
        setassignment_information_group5d144,
        assignment_information_group5d144Props, 
        setassignment_information_group5d144Props,
        assignment_details_group7f60d, 
        setassignment_details_group7f60d,
        assignment_details_group7f60dProps, 
        setassignment_details_group7f60dProps,
        dynamicactions956ba, 
        setdynamicactions956ba,
        dynamicactions956baProps, 
        setdynamicactions956baProps,
        assign_asset_groupb4f2d, 
        setassign_asset_groupb4f2d,
        assign_asset_groupb4f2dProps, 
        setassign_asset_groupb4f2dProps,
        assignment_information_groupc96e9, 
        setassignment_information_groupc96e9,
        assignment_information_groupc96e9Props, 
        setassignment_information_groupc96e9Props,
        assignment_details_group136e4, 
        setassignment_details_group136e4,
        assignment_details_group136e4Props, 
        setassignment_details_group136e4Props,
        group_delete0df4b, 
        setgroup_delete0df4b,
        group_delete0df4bProps, 
        setgroup_delete0df4bProps,
        doc_attached_groupbc2cf, 
        setdoc_attached_groupbc2cf,
        doc_attached_groupbc2cfProps, 
        setdoc_attached_groupbc2cfProps,
        table_group75a5e, 
        settable_group75a5e,
        table_group75a5eProps, 
        settable_group75a5eProps,
        doc_table392d0, 
        setdoc_table392d0,
        doc_table392d0Props, 
        setdoc_table392d0Props,
        group_delete8ee3b, 
        setgroup_delete8ee3b,
        group_delete8ee3bProps, 
        setgroup_delete8ee3bProps,
        overall_maintenance_group04cba, 
        setoverall_maintenance_group04cba,
        overall_maintenance_group04cbaProps, 
        setoverall_maintenance_group04cbaProps,
        icon_groupedce3, 
        seticon_groupedce3,
        icon_groupedce3Props, 
        seticon_groupedce3Props,
        maintenance_table75a5d, 
        setmaintenance_table75a5d,
        maintenance_table75a5dProps, 
        setmaintenance_table75a5dProps,
        asset_search_group1a6b1, 
        setasset_search_group1a6b1,
        asset_search_group1a6b1Props, 
        setasset_search_group1a6b1Props,
        maintenance_groupdb5a7, 
        setmaintenance_groupdb5a7,
        maintenance_groupdb5a7Props, 
        setmaintenance_groupdb5a7Props,
        maintenance_information_groupea3ac, 
        setmaintenance_information_groupea3ac,
        maintenance_information_groupea3acProps, 
        setmaintenance_information_groupea3acProps,
        execution_details_group591cd, 
        setexecution_details_group591cd,
        execution_details_group591cdProps, 
        setexecution_details_group591cdProps,
        dynamicactions8672d, 
        setdynamicactions8672d,
        dynamicactions8672dProps, 
        setdynamicactions8672dProps,
        group_delete3f77f, 
        setgroup_delete3f77f,
        group_delete3f77fProps, 
        setgroup_delete3f77fProps,
        overall_disposal_group04cba, 
        setoverall_disposal_group04cba,
        overall_disposal_group04cbaProps, 
        setoverall_disposal_group04cbaProps,
        icon_text_group23d8c, 
        seticon_text_group23d8c,
        icon_text_group23d8cProps, 
        seticon_text_group23d8cProps,
        disposal_table75a5d, 
        setdisposal_table75a5d,
        disposal_table75a5dProps, 
        setdisposal_table75a5dProps,
        initiate_asset_disposal_groupdb5a7, 
        setinitiate_asset_disposal_groupdb5a7,
        initiate_asset_disposal_groupdb5a7Props, 
        setinitiate_asset_disposal_groupdb5a7Props,
        disposal_details_groupe1b0c, 
        setdisposal_details_groupe1b0c,
        disposal_details_groupe1b0cProps, 
        setdisposal_details_groupe1b0cProps,
        compliance_financial_group1f9bc, 
        setcompliance_financial_group1f9bc,
        compliance_financial_group1f9bcProps, 
        setcompliance_financial_group1f9bcProps,
        dynamicactions9a7ff, 
        setdynamicactions9a7ff,
        dynamicactions9a7ffProps, 
        setdynamicactions9a7ffProps,
        initiate_asset_disposal_group0196a, 
        setinitiate_asset_disposal_group0196a,
        initiate_asset_disposal_group0196aProps, 
        setinitiate_asset_disposal_group0196aProps,
        disposal_details_groupaa369, 
        setdisposal_details_groupaa369,
        disposal_details_groupaa369Props, 
        setdisposal_details_groupaa369Props,
        compliance_financial_groupe5dd8, 
        setcompliance_financial_groupe5dd8,
        compliance_financial_groupe5dd8Props, 
        setcompliance_financial_groupe5dd8Props,
        asset_dashboard_group485d3, 
        setasset_dashboard_group485d3,
        asset_dashboard_group485d3Props, 
        setasset_dashboard_group485d3Props,
        total_asset_groupfe2e6, 
        settotal_asset_groupfe2e6,
        total_asset_groupfe2e6Props, 
        settotal_asset_groupfe2e6Props,
        software_category_group6e622, 
        setsoftware_category_group6e622,
        software_category_group6e622Props, 
        setsoftware_category_group6e622Props,
        hardware_category_groupfcf3f, 
        sethardware_category_groupfcf3f,
        hardware_category_groupfcf3fProps, 
        sethardware_category_groupfcf3fProps,
        req_maint_groupcf317, 
        setreq_maint_groupcf317,
        req_maint_groupcf317Props, 
        setreq_maint_groupcf317Props,
        cat_groupe0f50, 
        setcat_groupe0f50,
        cat_groupe0f50Props, 
        setcat_groupe0f50Props,
        category_table3e4ac, 
        setcategory_table3e4ac,
        category_table3e4acProps, 
        setcategory_table3e4acProps,
        asset_search_groupd84d5, 
        setasset_search_groupd84d5,
        asset_search_groupd84d5Props, 
        setasset_search_groupd84d5Props,
        category_groupe3ebd, 
        setcategory_groupe3ebd,
        category_groupe3ebdProps, 
        setcategory_groupe3ebdProps,
        category_information_groupfb68a, 
        setcategory_information_groupfb68a,
        category_information_groupfb68aProps, 
        setcategory_information_groupfb68aProps,
        category_configuration_group5d6af, 
        setcategory_configuration_group5d6af,
        category_configuration_group5d6afProps, 
        setcategory_configuration_group5d6afProps,
        dynamicactions13884, 
        setdynamicactions13884,
        dynamicactions13884Props, 
        setdynamicactions13884Props,
        group_delete3c2cd, 
        setgroup_delete3c2cd,
        group_delete3c2cdProps, 
        setgroup_delete3c2cdProps,
        category_group70e38, 
        setcategory_group70e38,
        category_group70e38Props, 
        setcategory_group70e38Props,
        category_information_groupa040a, 
        setcategory_information_groupa040a,
        category_information_groupa040aProps, 
        setcategory_information_groupa040aProps,
        category_configuration_group06f09, 
        setcategory_configuration_group06f09,
        category_configuration_group06f09Props, 
        setcategory_configuration_group06f09Props,
        doc_attached_groupb9604, 
        setdoc_attached_groupb9604,
        doc_attached_groupb9604Props, 
        setdoc_attached_groupb9604Props,
        table_groupefcb8, 
        settable_groupefcb8,
        table_groupefcb8Props, 
        settable_groupefcb8Props,
        category_doc_table9b042, 
        setcategory_doc_table9b042,
        category_doc_table9b042Props, 
        setcategory_doc_table9b042Props,
        overall_softwarelicenses_group04cba, 
        setoverall_softwarelicenses_group04cba,
        overall_softwarelicenses_group04cbaProps, 
        setoverall_softwarelicenses_group04cbaProps,
        icon_text_group44cf7, 
        seticon_text_group44cf7,
        icon_text_group44cf7Props, 
        seticon_text_group44cf7Props,
        software_licenses_table75a5d, 
        setsoftware_licenses_table75a5d,
        software_licenses_table75a5dProps, 
        setsoftware_licenses_table75a5dProps,
        add_license_groupdb5a7, 
        setadd_license_groupdb5a7,
        add_license_groupdb5a7Props, 
        setadd_license_groupdb5a7Props,
        license_information_groupfae34, 
        setlicense_information_groupfae34,
        license_information_groupfae34Props, 
        setlicense_information_groupfae34Props,
        license_configuration_groupb5d91, 
        setlicense_configuration_groupb5d91,
        license_configuration_groupb5d91Props, 
        setlicense_configuration_groupb5d91Props,
        validity_financial_details_grouped4a1, 
        setvalidity_financial_details_grouped4a1,
        validity_financial_details_grouped4a1Props, 
        setvalidity_financial_details_grouped4a1Props,
        dynamicactions67d98, 
        setdynamicactions67d98,
        dynamicactions67d98Props, 
        setdynamicactions67d98Props,
        add_license_group1bee6, 
        setadd_license_group1bee6,
        add_license_group1bee6Props, 
        setadd_license_group1bee6Props,
        license_information_group4e03c, 
        setlicense_information_group4e03c,
        license_information_group4e03cProps, 
        setlicense_information_group4e03cProps,
        license_configuration_groupa329d, 
        setlicense_configuration_groupa329d,
        license_configuration_groupa329dProps, 
        setlicense_configuration_groupa329dProps,
        validity_financial_details_groupb8a9f, 
        setvalidity_financial_details_groupb8a9f,
        validity_financial_details_groupb8a9fProps, 
        setvalidity_financial_details_groupb8a9fProps,
        group_deletedf5b8, 
        setgroup_deletedf5b8,
        group_deletedf5b8Props, 
        setgroup_deletedf5b8Props,
        doc_attached_groupc3d26, 
        setdoc_attached_groupc3d26,
        doc_attached_groupc3d26Props, 
        setdoc_attached_groupc3d26Props,
        table_group7bc52, 
        settable_group7bc52,
        table_group7bc52Props, 
        settable_group7bc52Props,
        software_licenses_doc_table265b6, 
        setsoftware_licenses_doc_table265b6,
        software_licenses_doc_table265b6Props, 
        setsoftware_licenses_doc_table265b6Props,
        total_asset_dividerd84da,
        settotal_asset_dividerd84da, 
        total_assest_text88ed3,
        settotal_assest_text88ed3, 
        total_assest9e45d,
        settotal_assest9e45d, 
        it_assets6051f,
        setit_assets6051f, 
        maintenance_due_divider05a2b,
        setmaintenance_due_divider05a2b, 
        maintenance_due_text31400,
        setmaintenance_due_text31400, 
        maintenance_due09ab9,
        setmaintenance_due09ab9, 
        overdue_maintenancef7357,
        setoverdue_maintenancef7357, 
        warranty_expiring_dividerf7152,
        setwarranty_expiring_dividerf7152, 
        warranty_expiring_texteee70,
        setwarranty_expiring_texteee70, 
        warranty_expiringfa250,
        setwarranty_expiringfa250, 
        warranty_description49c85,
        setwarranty_description49c85, 
        software_licenses_divider9376b,
        setsoftware_licenses_divider9376b, 
        software_licenses_text92f3e,
        setsoftware_licenses_text92f3e, 
        software_licenses46b7c,
        setsoftware_licenses46b7c, 
        licenses_near_expiry46af3,
        setlicenses_near_expiry46af3, 
        pending_disposal_dividerd7969,
        setpending_disposal_dividerd7969, 
        pending_disposal_text3d356,
        setpending_disposal_text3d356, 
        pending_disposal38551,
        setpending_disposal38551, 
        pending_disposal_descriptionceadc,
        setpending_disposal_descriptionceadc, 
        asset_idbd7bd,
        setasset_idbd7bd, 
        asset_tagafbdd,
        setasset_tagafbdd, 
        asset_name1ef31,
        setasset_name1ef31, 
        category2a9d0,
        setcategory2a9d0, 
        serial_no3915b,
        setserial_no3915b, 
        assigned_toe3252,
        setassigned_toe3252, 
        locationee1a6,
        setlocationee1a6, 
        warranty_expiryc5b88,
        setwarranty_expiryc5b88, 
        ref2b838,
        setref2b838, 
        asset_name4d2a5,
        setasset_name4d2a5, 
        maint_typee7fac,
        setmaint_typee7fac, 
        descriptionb10c9,
        setdescriptionb10c9, 
        vendor_name73ece,
        setvendor_name73ece, 
        scheduled_date67fe7,
        setscheduled_date67fe7, 
        cost3b16a,
        setcost3b16a, 
        statusc3912,
        setstatusc3912, 
        maint_ida5387,
        setmaint_ida5387, 
        product_nameff649,
        setproduct_nameff649, 
        license_typee6826,
        setlicense_typee6826, 
        seats_total28de1,
        setseats_total28de1, 
        seats_used897a3,
        setseats_used897a3, 
        expiry_date7d6c7,
        setexpiry_date7d6c7, 
        cost6edbe,
        setcost6edbe, 
        license_idc0471,
        setlicense_idc0471, 
        asset_name251dd,
        setasset_name251dd, 
        disposal_method84ead,
        setdisposal_method84ead, 
        reason441ae,
        setreason441ae, 
        current_value047d6,
        setcurrent_value047d6, 
        data_wiped9be82,
        setdata_wiped9be82, 
        status00e2a,
        setstatus00e2a, 
        asset_id29a99,
        setasset_id29a99, 
        asset_tage74f0,
        setasset_tage74f0, 
        asset_name13b83,
        setasset_name13b83, 
        category2ca3f,
        setcategory2ca3f, 
        serial_no3f2a9,
        setserial_no3f2a9, 
        assigned_to28cfb,
        setassigned_to28cfb, 
        location7cca5,
        setlocation7cca5, 
        warranty_expiryd159c,
        setwarranty_expiryd159c, 
        statusf4240,
        setstatusf4240, 
        asset_icon_text2f408,
        setasset_icon_text2f408, 
        asset_text52a32,
        setasset_text52a32, 
        search15de2,
        setsearch15de2, 
        asset295b8,
        setasset295b8, 
        asset_id0e8f6,
        setasset_id0e8f6, 
        asset_tagd67f5,
        setasset_tagd67f5, 
        asset_name64bee,
        setasset_name64bee, 
        category3fb9d,
        setcategory3fb9d, 
        serial_no107f3,
        setserial_no107f3, 
        status26d3e,
        setstatus26d3e, 
        assigned_toea420,
        setassigned_toea420, 
        location96640,
        setlocation96640, 
        warranty_expiryd732d,
        setwarranty_expiryd732d, 
        viewadef5,
        setviewadef5, 
        bt_delete26265,
        setbt_delete26265, 
        bt_edit17748,
        setbt_edit17748, 
        bt_add_docb191a,
        setbt_add_docb191a, 
        advancesearch9e02b,
        setadvancesearch9e02b, 
        basic_infot_asset_text4d8c8,
        setbasic_infot_asset_text4d8c8, 
        category_name3613b,
        setcategory_name3613b, 
        asset_type91879,
        setasset_type91879, 
        asset_namea35ee,
        setasset_namea35ee, 
        asset_tagcb5cb,
        setasset_tagcb5cb, 
        asset_codeaa68d,
        setasset_codeaa68d, 
        serial_numbera45cf,
        setserial_numbera45cf, 
        model_number32271,
        setmodel_number32271, 
        manufacturerb8d3f,
        setmanufacturerb8d3f, 
        classification_text9bbdf,
        setclassification_text9bbdf, 
        classification8722b,
        setclassification8722b, 
        data_classification45708,
        setdata_classification45708, 
        ownership_type1a506,
        setownership_type1a506, 
        lifecycle_stage1446e,
        setlifecycle_stage1446e, 
        asset_condition414c5,
        setasset_condition414c5, 
        risk_levelf1e8c,
        setrisk_levelf1e8c, 
        is_critical0f006,
        setis_critical0f006, 
        additional_details_text21426,
        setadditional_details_text21426, 
        location2ff4b,
        setlocation2ff4b, 
        description09f58,
        setdescription09f58, 
        purchase_details_textf2780,
        setpurchase_details_textf2780, 
        vendor_name4190d,
        setvendor_name4190d, 
        purchase_costff91e,
        setpurchase_costff91e, 
        currency823ac,
        setcurrency823ac, 
        purchase_datec1162,
        setpurchase_datec1162, 
        warranty_expiry1fdec,
        setwarranty_expiry1fdec, 
        current_value8f6cd,
        setcurrent_value8f6cd, 
        depreciation_rate8d4a6,
        setdepreciation_rate8d4a6, 
        salvage_valuef1995,
        setsalvage_valuef1995, 
        disposal_details_text65909,
        setdisposal_details_text65909, 
        disposal_methodd33dc,
        setdisposal_methodd33dc, 
        disposal_date920f2,
        setdisposal_date920f2, 
        disposal_ref075d5,
        setdisposal_ref075d5, 
        asset_id3883f,
        setasset_id3883f, 
        cancel407b1,
        setcancel407b1, 
        button_update10522,
        setbutton_update10522, 
        add_asset1b88e,
        setadd_asset1b88e, 
        basic_infot_asset_text673ff,
        setbasic_infot_asset_text673ff, 
        category_name2dc3c,
        setcategory_name2dc3c, 
        asset_typecdf86,
        setasset_typecdf86, 
        asset_name4044f,
        setasset_name4044f, 
        asset_tag665c1,
        setasset_tag665c1, 
        asset_code9d69b,
        setasset_code9d69b, 
        serial_number67791,
        setserial_number67791, 
        model_number46a87,
        setmodel_number46a87, 
        manufacturer825e8,
        setmanufacturer825e8, 
        classification_text91ff0,
        setclassification_text91ff0, 
        classificationf4888,
        setclassificationf4888, 
        data_classificationb7d47,
        setdata_classificationb7d47, 
        ownership_type783c2,
        setownership_type783c2, 
        lifecycle_stage26be5,
        setlifecycle_stage26be5, 
        asset_condition4d358,
        setasset_condition4d358, 
        risk_level7f64b,
        setrisk_level7f64b, 
        location323da,
        setlocation323da, 
        additional_details_text5aceb,
        setadditional_details_text5aceb, 
        location2acd9,
        setlocation2acd9, 
        description70aff,
        setdescription70aff, 
        purchase_details_text52695,
        setpurchase_details_text52695, 
        vendor_name1f183,
        setvendor_name1f183, 
        purchase_cost899f9,
        setpurchase_cost899f9, 
        currency0f0b1,
        setcurrency0f0b1, 
        purchase_date9a646,
        setpurchase_date9a646, 
        warranty_expirye6615,
        setwarranty_expirye6615, 
        depreciation_ratea6497,
        setdepreciation_ratea6497, 
        salvage_value9adb6,
        setsalvage_value9adb6, 
        current_value8e31d,
        setcurrent_value8e31d, 
        disposal_details_textb2754,
        setdisposal_details_textb2754, 
        disposal_method1fd3c,
        setdisposal_method1fd3c, 
        disposal_dateb9385,
        setdisposal_dateb9385, 
        disposal_ref35f4b,
        setdisposal_ref35f4b, 
        asset_idb6b5a,
        setasset_idb6b5a, 
        delete_heading_text766e5,
        setdelete_heading_text766e5, 
        asset_name_text2a279,
        setasset_name_text2a279, 
        asset_named7764,
        setasset_named7764, 
        asset_tag_text6db8e,
        setasset_tag_text6db8e, 
        asset_tag5b0ef,
        setasset_tag5b0ef, 
        category_name_text6b1b6,
        setcategory_name_text6b1b6, 
        category_nameb3bdb,
        setcategory_nameb3bdb, 
        asset_type_textbf4bc,
        setasset_type_textbf4bc, 
        asset_typebe078,
        setasset_typebe078, 
        location_text55088,
        setlocation_text55088, 
        location0b4e4,
        setlocation0b4e4, 
        confo_textad78a,
        setconfo_textad78a, 
        cancel_button24a33,
        setcancel_button24a33, 
        ok_button58a95,
        setok_button58a95, 
        asset_id4d81b,
        setasset_id4d81b, 
        asset_id_text67e51,
        setasset_id_text67e51, 
        asset_idfc689,
        setasset_idfc689, 
        asset_name_text06c7c,
        setasset_name_text06c7c, 
        asset_name7dfbc,
        setasset_name7dfbc, 
        attachment_id185f0,
        setattachment_id185f0, 
        doc_group6421d,
        setdoc_group6421d, 
        doc_name41b3b,
        setdoc_name41b3b, 
        trs_created_date2eb99,
        settrs_created_date2eb99, 
        trs_created_byfae15,
        settrs_created_byfae15, 
        bt_delete6174f,
        setbt_delete6174f, 
        documentuploadpanel14fde,
        setdocumentuploadpanel14fde, 
        asset_id358d1,
        setasset_id358d1, 
        button_add_docfde68,
        setbutton_add_docfde68, 
        documentviewerd3b4b,
        setdocumentviewerd3b4b, 
        delete_heading_textc80ba,
        setdelete_heading_textc80ba, 
        attachment_id_txt02e0f,
        setattachment_id_txt02e0f, 
        attachment_id4eeac,
        setattachment_id4eeac, 
        doc_group_texte3945,
        setdoc_group_texte3945, 
        doc_group82055,
        setdoc_group82055, 
        doc_name_text6a957,
        setdoc_name_text6a957, 
        doc_name1f607,
        setdoc_name1f607, 
        trs_created_by_text29a4f,
        settrs_created_by_text29a4f, 
        trs_created_byad133,
        settrs_created_byad133, 
        confo_text29a5c,
        setconfo_text29a5c, 
        asset_idbf0b0,
        setasset_idbf0b0, 
        cancel_button753bf,
        setcancel_button753bf, 
        ok_buttone6d7f,
        setok_buttone6d7f, 
        assign_icon_text232c3,
        setassign_icon_text232c3, 
        assign_texta5834,
        setassign_texta5834, 
        search1d0f8,
        setsearch1d0f8, 
        assign_asset20f5c,
        setassign_asset20f5c, 
        assign_idac541,
        setassign_idac541, 
        asset_namedaa81,
        setasset_namedaa81, 
        assigned_toba6cd,
        setassigned_toba6cd, 
        assigned_byba0b9,
        setassigned_byba0b9, 
        assigned_atc4b88,
        setassigned_atc4b88, 
        expected_return_date910b8,
        setexpected_return_date910b8, 
        condition_at_assigne0685,
        setcondition_at_assigne0685, 
        status7fb4b,
        setstatus7fb4b, 
        bt_view6b7cc,
        setbt_view6b7cc, 
        bt_editad624,
        setbt_editad624, 
        bt_deletefaec8,
        setbt_deletefaec8, 
        bt_add_docf5447,
        setbt_add_docf5447, 
        advancesearch9256e,
        setadvancesearch9256e, 
        assignment_information_text8af67,
        setassignment_information_text8af67, 
        asset_name56fec,
        setasset_name56fec, 
        assigned_tof8f17,
        setassigned_tof8f17, 
        assigned_byc4563,
        setassigned_byc4563, 
        assigned_at45db5,
        setassigned_at45db5, 
        assignment_statusa6f80,
        setassignment_statusa6f80, 
        condition_at_assign27aff,
        setcondition_at_assign27aff, 
        expected_return_date15cfe,
        setexpected_return_date15cfe, 
        assignment_details_textb98b6,
        setassignment_details_textb98b6, 
        actual_return_date06574,
        setactual_return_date06574, 
        returned_atb4ccc,
        setreturned_atb4ccc, 
        condition_at_return40b7c,
        setcondition_at_return40b7c, 
        approved_by8c220,
        setapproved_by8c220, 
        approval_statuseb2b2,
        setapproval_statuseb2b2, 
        assignment_notese758f,
        setassignment_notese758f, 
        acknowledgement_signedfdaee,
        setacknowledgement_signedfdaee, 
        assign_id31be8,
        setassign_id31be8, 
        button_cancel83d84,
        setbutton_cancel83d84, 
        button_updatedc4e0,
        setbutton_updatedc4e0, 
        assign090a4,
        setassign090a4, 
        assignment_information_textbebbc,
        setassignment_information_textbebbc, 
        asset_name39101,
        setasset_name39101, 
        assigned_toad6a1,
        setassigned_toad6a1, 
        assigned_byaa464,
        setassigned_byaa464, 
        assigned_atca20b,
        setassigned_atca20b, 
        assignment_status1057b,
        setassignment_status1057b, 
        condition_at_assignf6852,
        setcondition_at_assignf6852, 
        expected_return_datedf53d,
        setexpected_return_datedf53d, 
        assignment_details_text97d83,
        setassignment_details_text97d83, 
        actual_return_datec1f64,
        setactual_return_datec1f64, 
        returned_atecafb,
        setreturned_atecafb, 
        condition_at_return1d3c7,
        setcondition_at_return1d3c7, 
        approved_by2b89c,
        setapproved_by2b89c, 
        approval_statusf07b0,
        setapproval_statusf07b0, 
        acknowledgement_signed5ee58,
        setacknowledgement_signed5ee58, 
        assignment_notes59be1,
        setassignment_notes59be1, 
        assign_idb53db,
        setassign_idb53db, 
        delete_heading_textc848b,
        setdelete_heading_textc848b, 
        asset_name_text16bc2,
        setasset_name_text16bc2, 
        asset_named51ee,
        setasset_named51ee, 
        assigned_to_text5d18d,
        setassigned_to_text5d18d, 
        assigned_to51299,
        setassigned_to51299, 
        assigned_at_text4a3af,
        setassigned_at_text4a3af, 
        assigned_bycb5ab,
        setassigned_bycb5ab, 
        condition_at_assign_text4ad2d,
        setcondition_at_assign_text4ad2d, 
        condition_at_assignc35c4,
        setcondition_at_assignc35c4, 
        expected_return_date_text80abb,
        setexpected_return_date_text80abb, 
        expected_return_date11169,
        setexpected_return_date11169, 
        confo_text66873,
        setconfo_text66873, 
        assign_idf7b2f,
        setassign_idf7b2f, 
        cancel_button0c073,
        setcancel_button0c073, 
        ok_buttonfa294,
        setok_buttonfa294, 
        asset_name_textbdd29,
        setasset_name_textbdd29, 
        asset_namee1fc6,
        setasset_namee1fc6, 
        assigned_to_text824e7,
        setassigned_to_text824e7, 
        assigned_to72696,
        setassigned_to72696, 
        attachment_id0c7b6,
        setattachment_id0c7b6, 
        doc_group8e81a,
        setdoc_group8e81a, 
        doc_nameb994a,
        setdoc_nameb994a, 
        trs_created_date26a21,
        settrs_created_date26a21, 
        trs_created_by95da2,
        settrs_created_by95da2, 
        bt_deletea6263,
        setbt_deletea6263, 
        documentuploadpanel96f16,
        setdocumentuploadpanel96f16, 
        button_add_doc8e522,
        setbutton_add_doc8e522, 
        assign_id67308,
        setassign_id67308, 
        delete_heading_text5f884,
        setdelete_heading_text5f884, 
        attachment_id_txt0f0d3,
        setattachment_id_txt0f0d3, 
        attachment_idea582,
        setattachment_idea582, 
        doc_group_text09f3f,
        setdoc_group_text09f3f, 
        doc_group796b8,
        setdoc_group796b8, 
        doc_name_text69cc2,
        setdoc_name_text69cc2, 
        doc_name19bda,
        setdoc_name19bda, 
        trs_created_by_text805fb,
        settrs_created_by_text805fb, 
        trs_created_by4c93f,
        settrs_created_by4c93f, 
        confo_text0c7c5,
        setconfo_text0c7c5, 
        assign_id67319,
        setassign_id67319, 
        cancel_button7e1a2,
        setcancel_button7e1a2, 
        ok_buttonc63df,
        setok_buttonc63df, 
        maintenance_text_icondf716,
        setmaintenance_text_icondf716, 
        maintenance_text0649c,
        setmaintenance_text0649c, 
        search7f293,
        setsearch7f293, 
        log_maintenanced8874,
        setlog_maintenanced8874, 
        refdaa81,
        setrefdaa81, 
        asset_nameba6cd,
        setasset_nameba6cd, 
        maint_typeba0b9,
        setmaint_typeba0b9, 
        descriptionc4b88,
        setdescriptionc4b88, 
        vendor_name910b8,
        setvendor_name910b8, 
        scheduled_datee0685,
        setscheduled_datee0685, 
        cost7fb4b,
        setcost7fb4b, 
        status0d30b,
        setstatus0d30b, 
        view113d0,
        setview113d0, 
        bt_edit93fc7,
        setbt_edit93fc7, 
        bt_delete70a91,
        setbt_delete70a91, 
        maint_idd22c1,
        setmaint_idd22c1, 
        advancesearch64153,
        setadvancesearch64153, 
        maintenance_information_text37a24,
        setmaintenance_information_text37a24, 
        asset_namec21fd,
        setasset_namec21fd, 
        maint_typea5ba4,
        setmaint_typea5ba4, 
        priorityec586,
        setpriorityec586, 
        scheduled_date83e9d,
        setscheduled_date83e9d, 
        completed_dated052f,
        setcompleted_dated052f, 
        next_maintenance_datee871a,
        setnext_maintenance_datee871a, 
        execution_details_text71309,
        setexecution_details_text71309, 
        performed_bycb4dc,
        setperformed_bycb4dc, 
        vendor_name17b17,
        setvendor_name17b17, 
        vendor_referencefa982,
        setvendor_referencefa982, 
        downtime_hours721c7,
        setdowntime_hours721c7, 
        cost35190,
        setcost35190, 
        descriptioneaa55,
        setdescriptioneaa55, 
        maintenance_checklist024ed,
        setmaintenance_checklist024ed, 
        maint_id9587d,
        setmaint_id9587d, 
        button_cancel02d05,
        setbutton_cancel02d05, 
        button_update5cdad,
        setbutton_update5cdad, 
        schedule133fb,
        setschedule133fb, 
        delete_heading_text64ac6,
        setdelete_heading_text64ac6, 
        asset_name_text99dc6,
        setasset_name_text99dc6, 
        asset_name9f8b1,
        setasset_name9f8b1, 
        maint_type_textf805a,
        setmaint_type_textf805a, 
        maint_typefc524,
        setmaint_typefc524, 
        priority_text5afe4,
        setpriority_text5afe4, 
        priority1b975,
        setpriority1b975, 
        schedule_date_textc8d71,
        setschedule_date_textc8d71, 
        schedule_dateef711,
        setschedule_dateef711, 
        performed_by_textb5193,
        setperformed_by_textb5193, 
        performed_byc179b,
        setperformed_byc179b, 
        confo_text7649e,
        setconfo_text7649e, 
        maint_id927de,
        setmaint_id927de, 
        cancel_button36974,
        setcancel_button36974, 
        ok_buttond1793,
        setok_buttond1793, 
        disposal_text_icon59950,
        setdisposal_text_icon59950, 
        disposal_text2d2ac,
        setdisposal_text2d2ac, 
        searchc5de1,
        setsearchc5de1, 
        initiate_disposal27af5,
        setinitiate_disposal27af5, 
        disposal_id46e83,
        setdisposal_id46e83, 
        disposal_methodba6cd,
        setdisposal_methodba6cd, 
        disposal_datee0685,
        setdisposal_datee0685, 
        witness_nameba0b9,
        setwitness_nameba0b9, 
        data_wipe_methodc4b88,
        setdata_wipe_methodc4b88, 
        disposal_cost910b8,
        setdisposal_cost910b8, 
        view6b7cc,
        setview6b7cc, 
        bt_editb236b,
        setbt_editb236b, 
        disposal_details0c71e,
        setdisposal_details0c71e, 
        vendor_nameabdbb,
        setvendor_nameabdbb, 
        asset_name819e8,
        setasset_name819e8, 
        disposal_methoddeb30,
        setdisposal_methoddeb30, 
        disposal_date12263,
        setdisposal_date12263, 
        reasonadb68,
        setreasonadb68, 
        compliance_financial664f8,
        setcompliance_financial664f8, 
        approval_reference5e1aa,
        setapproval_reference5e1aa, 
        witness_nameac8f7,
        setwitness_nameac8f7, 
        data_wipe_methodfe1e6,
        setdata_wipe_methodfe1e6, 
        data_wipedad12b,
        setdata_wipedad12b, 
        disposal_valued21f4,
        setdisposal_valued21f4, 
        disposal_cost031f6,
        setdisposal_cost031f6, 
        resale_amount2eb0e,
        setresale_amount2eb0e, 
        cancel62a73,
        setcancel62a73, 
        update92b0c,
        setupdate92b0c, 
        initiate_disposal1b938,
        setinitiate_disposal1b938, 
        disposal_details1d5ee,
        setdisposal_details1d5ee, 
        vendor_name5f557,
        setvendor_name5f557, 
        asset_name298df,
        setasset_name298df, 
        disposal_methoda093b,
        setdisposal_methoda093b, 
        disposal_date247ef,
        setdisposal_date247ef, 
        reason8b938,
        setreason8b938, 
        compliance_financialc9043,
        setcompliance_financialc9043, 
        approval_referenceb0a46,
        setapproval_referenceb0a46, 
        witness_name6fddf,
        setwitness_name6fddf, 
        data_wipe_method8923d,
        setdata_wipe_method8923d, 
        data_wipeda4257,
        setdata_wipeda4257, 
        disposal_value13578,
        setdisposal_value13578, 
        disposal_cost23f44,
        setdisposal_cost23f44, 
        resale_amount5336f,
        setresale_amount5336f, 
        disposal_idee44c,
        setdisposal_idee44c, 
        total_category_divider52a07,
        settotal_category_divider52a07, 
        tc_icon1ed4f,
        settc_icon1ed4f, 
        total_category_textb2d2f,
        settotal_category_textb2d2f, 
        total_categories55fa9,
        settotal_categories55fa9, 
        sw_cat_divider016f6,
        setsw_cat_divider016f6, 
        sc_icon481ef,
        setsc_icon481ef, 
        software_category_text202b3,
        setsoftware_category_text202b3, 
        software_category5cc47,
        setsoftware_category5cc47, 
        hw_cat_divider1452f,
        sethw_cat_divider1452f, 
        sc_iconbaaa3,
        setsc_iconbaaa3, 
        hardware_category_text66f11,
        sethardware_category_text66f11, 
        hardware_categoryad98e,
        sethardware_categoryad98e, 
        hw_cat_divider5f14c,
        sethw_cat_divider5f14c, 
        sc_iconefedc,
        setsc_iconefedc, 
        req_maintenance027c1,
        setreq_maintenance027c1, 
        required_maintenance9ce1e,
        setrequired_maintenance9ce1e, 
        categorytext_icond59a8,
        setcategorytext_icond59a8, 
        categorytextbfea2,
        setcategorytextbfea2, 
        search48da3,
        setsearch48da3, 
        button_add_category57a00,
        setbutton_add_category57a00, 
        acat_id37980,
        setacat_id37980, 
        category_code97856,
        setcategory_code97856, 
        asset_prefix8b10c,
        setasset_prefix8b10c, 
        category_name11d7f,
        setcategory_name11d7f, 
        depreciation_method2b046,
        setdepreciation_method2b046, 
        useful_life_years73932,
        setuseful_life_years73932, 
        bt_edit226cc,
        setbt_edit226cc, 
        bt_deleteebf73,
        setbt_deleteebf73, 
        view0d148,
        setview0d148, 
        bt_add_doc2ee68,
        setbt_add_doc2ee68, 
        advancesearchfab99,
        setadvancesearchfab99, 
        category_information_text3e9d2,
        setcategory_information_text3e9d2, 
        category_code60d4a,
        setcategory_code60d4a, 
        category_name69309,
        setcategory_name69309, 
        parent_category_namec5eb6,
        setparent_category_namec5eb6, 
        asset_prefix16715,
        setasset_prefix16715, 
        category_configuration_text00171,
        setcategory_configuration_text00171, 
        depreciation_methodfa7cb,
        setdepreciation_methodfa7cb, 
        useful_life_years231a3,
        setuseful_life_years231a3, 
        acat_idba9a2,
        setacat_idba9a2, 
        button_cancel847fd,
        setbutton_cancel847fd, 
        button_update74a1f,
        setbutton_update74a1f, 
        bt_add_category240df,
        setbt_add_category240df, 
        delete_heading_textb1f29,
        setdelete_heading_textb1f29, 
        category_code_text0975e,
        setcategory_code_text0975e, 
        category_codef16a8,
        setcategory_codef16a8, 
        category_name_text7648e,
        setcategory_name_text7648e, 
        category_namecbc0b,
        setcategory_namecbc0b, 
        depreciation_method_text82fb3,
        setdepreciation_method_text82fb3, 
        depreciation_method0e872,
        setdepreciation_method0e872, 
        useful_life_years_text30347,
        setuseful_life_years_text30347, 
        useful_life_yearsa64db,
        setuseful_life_yearsa64db, 
        maintenance_required_textf1aaf,
        setmaintenance_required_textf1aaf, 
        maintenance_required336be,
        setmaintenance_required336be, 
        confo_texte7cc3,
        setconfo_texte7cc3, 
        acat_id9127b,
        setacat_id9127b, 
        cancel_buttonc0568,
        setcancel_buttonc0568, 
        ok_buttonc8577,
        setok_buttonc8577, 
        category_information_textf1933,
        setcategory_information_textf1933, 
        category_codeeb8f1,
        setcategory_codeeb8f1, 
        category_name2a1ea,
        setcategory_name2a1ea, 
        parent_category_name9a67f,
        setparent_category_name9a67f, 
        asset_prefix5007a,
        setasset_prefix5007a, 
        category_configuration_text66228,
        setcategory_configuration_text66228, 
        depreciation_method50f2f,
        setdepreciation_method50f2f, 
        useful_life_years864b4,
        setuseful_life_years864b4, 
        acat_id298b7,
        setacat_id298b7, 
        acat_id_text04690,
        setacat_id_text04690, 
        acat_ida2d51,
        setacat_ida2d51, 
        acat_name_textc9d3e,
        setacat_name_textc9d3e, 
        category_name4ccfb,
        setcategory_name4ccfb, 
        attachment_id9b438,
        setattachment_id9b438, 
        doc_group344aa,
        setdoc_group344aa, 
        doc_namef124d,
        setdoc_namef124d, 
        trs_created_date16faa,
        settrs_created_date16faa, 
        trs_created_byfb6e3,
        settrs_created_byfb6e3, 
        bt_delete61896,
        setbt_delete61896, 
        documentuploadpanel643f7,
        setdocumentuploadpanel643f7, 
        button_add_doc24b11,
        setbutton_add_doc24b11, 
        acat_idf572e,
        setacat_idf572e, 
        software_license_iconfe876,
        setsoftware_license_iconfe876, 
        software_license_text8a69d,
        setsoftware_license_text8a69d, 
        searchb475f,
        setsearchb475f, 
        add_license9d3d9,
        setadd_license9d3d9, 
        license_id87b4a,
        setlicense_id87b4a, 
        product_namedaa81,
        setproduct_namedaa81, 
        license_typeba0b9,
        setlicense_typeba0b9, 
        seats_totalc4b88,
        setseats_totalc4b88, 
        seats_used910b8,
        setseats_used910b8, 
        expiry_date7fb4b,
        setexpiry_date7fb4b, 
        cost0d30b,
        setcost0d30b, 
        edit_btne7446,
        setedit_btne7446, 
        button_delete6b394,
        setbutton_delete6b394, 
        bt_add_doce2f55,
        setbt_add_doce2f55, 
        license_information90d62,
        setlicense_information90d62, 
        asset_namee8382,
        setasset_namee8382, 
        product_namec9548,
        setproduct_namec9548, 
        vendor_nameb519a,
        setvendor_nameb519a, 
        license_typeae36b,
        setlicense_typeae36b, 
        license_keyd5b6f,
        setlicense_keyd5b6f, 
        license_configuration37dd8,
        setlicense_configuration37dd8, 
        seats_total6dbc7,
        setseats_total6dbc7, 
        seats_useddd434,
        setseats_useddd434, 
        auto_renewalb4694,
        setauto_renewalb4694, 
        validity_financial_details82762,
        setvalidity_financial_details82762, 
        purchase_datebfe70,
        setpurchase_datebfe70, 
        expiry_date5c034,
        setexpiry_date5c034, 
        support_expiry4ec2c,
        setsupport_expiry4ec2c, 
        costf9899,
        setcostf9899, 
        license_id07bf2,
        setlicense_id07bf2, 
        canceld59b4,
        setcanceld59b4, 
        update0d16c,
        setupdate0d16c, 
        add_license3b16e,
        setadd_license3b16e, 
        license_information6a10f,
        setlicense_information6a10f, 
        asset_name1ae9b,
        setasset_name1ae9b, 
        product_name11c98,
        setproduct_name11c98, 
        vendor_namef2df8,
        setvendor_namef2df8, 
        license_typec8c15,
        setlicense_typec8c15, 
        license_keyab6d1,
        setlicense_keyab6d1, 
        license_configurationf7ede,
        setlicense_configurationf7ede, 
        seats_total8b54b,
        setseats_total8b54b, 
        seats_used3bba9,
        setseats_used3bba9, 
        auto_renewal3bee1,
        setauto_renewal3bee1, 
        validity_financial_details9259f,
        setvalidity_financial_details9259f, 
        purchase_date884a6,
        setpurchase_date884a6, 
        expiry_date74df0,
        setexpiry_date74df0, 
        support_expirybfd9e,
        setsupport_expirybfd9e, 
        cost2568f,
        setcost2568f, 
        license_id49b2a,
        setlicense_id49b2a, 
        delete_heading_textb375f,
        setdelete_heading_textb375f, 
        product_name_text501de,
        setproduct_name_text501de, 
        product_namead2dd,
        setproduct_namead2dd, 
        license_type_text3c22b,
        setlicense_type_text3c22b, 
        license_typecec9e,
        setlicense_typecec9e, 
        auto_renewal_textbdbd2,
        setauto_renewal_textbdbd2, 
        auto_renewal8e280,
        setauto_renewal8e280, 
        seats_total_texta19fe,
        setseats_total_texta19fe, 
        seats_totalf37ee,
        setseats_totalf37ee, 
        seats_used_textc1a25,
        setseats_used_textc1a25, 
        seats_used8c8d5,
        setseats_used8c8d5, 
        confo_textbc695,
        setconfo_textbc695, 
        license_id027b5,
        setlicense_id027b5, 
        cancel_button3e8d9,
        setcancel_button3e8d9, 
        ok_buttonf3727,
        setok_buttonf3727, 
        license_id_text641eb,
        setlicense_id_text641eb, 
        license_idd34c8,
        setlicense_idd34c8, 
        product_name_textc07aa,
        setproduct_name_textc07aa, 
        product_name405f8,
        setproduct_name405f8, 
        attachment_id1138d,
        setattachment_id1138d, 
        doc_group3dcd4,
        setdoc_group3dcd4, 
        doc_name698d2,
        setdoc_name698d2, 
        trs_created_date0acd9,
        settrs_created_date0acd9, 
        trs_created_by0c4db,
        settrs_created_by0c4db, 
        bt_delete17f42,
        setbt_delete17f42, 
        documentuploadpanela3e1b,
        setdocumentuploadpanela3e1b, 
        button_add_doc7c1b7,
        setbutton_add_doc7c1b7, 
        license_idbc5e1,
        setlicense_idbc5e1, 
        ////// screen states 
          assetdasboard_v1,
          setassetdasboard_v1,
          assetdasboard_v1Props,
          setassetdasboard_v1Props,
          assets_v1,
          setassets_v1,
          assets_v1Props,
          setassets_v1Props,
          assetsearch_v1,
          setassetsearch_v1,
          assetsearch_v1Props,
          setassetsearch_v1Props,
          newasset_v1,
          setnewasset_v1,
          newasset_v1Props,
          setnewasset_v1Props,
          newassetview_v1,
          setnewassetview_v1,
          newassetview_v1Props,
          setnewassetview_v1Props,
          deletescreen_v1,
          setdeletescreen_v1,
          deletescreen_v1Props,
          setdeletescreen_v1Props,
          addassetdocument_v1,
          setaddassetdocument_v1,
          addassetdocument_v1Props,
          setaddassetdocument_v1Props,
          documentviewer_v1,
          setdocumentviewer_v1,
          documentviewer_v1Props,
          setdocumentviewer_v1Props,
          assetdocdelete_v1,
          setassetdocdelete_v1,
          assetdocdelete_v1Props,
          setassetdocdelete_v1Props,
          assetassignments_v1,
          setassetassignments_v1,
          assetassignments_v1Props,
          setassetassignments_v1Props,
          assignassetsearch_v1,
          setassignassetsearch_v1,
          assignassetsearch_v1Props,
          setassignassetsearch_v1Props,
          assignasset_v1,
          setassignasset_v1,
          assignasset_v1Props,
          setassignasset_v1Props,
          assignassetview_v1,
          setassignassetview_v1,
          assignassetview_v1Props,
          setassignassetview_v1Props,
          assignassetdelete_v1,
          setassignassetdelete_v1,
          assignassetdelete_v1Props,
          setassignassetdelete_v1Props,
          addassignmentdocument_v1,
          setaddassignmentdocument_v1,
          addassignmentdocument_v1Props,
          setaddassignmentdocument_v1Props,
          assigndocdelete_v1,
          setassigndocdelete_v1,
          assigndocdelete_v1Props,
          setassigndocdelete_v1Props,
          assetmaintenance_v1,
          setassetmaintenance_v1,
          assetmaintenance_v1Props,
          setassetmaintenance_v1Props,
          maintenancesearch_v1,
          setmaintenancesearch_v1,
          maintenancesearch_v1Props,
          setmaintenancesearch_v1Props,
          logmaintenance_v1,
          setlogmaintenance_v1,
          logmaintenance_v1Props,
          setlogmaintenance_v1Props,
          maintenancedelete_v1,
          setmaintenancedelete_v1,
          maintenancedelete_v1Props,
          setmaintenancedelete_v1Props,
          assetdisposal_v1,
          setassetdisposal_v1,
          assetdisposal_v1Props,
          setassetdisposal_v1Props,
          initiateassetdisposal_v1,
          setinitiateassetdisposal_v1,
          initiateassetdisposal_v1Props,
          setinitiateassetdisposal_v1Props,
          assetdisposalview_v1,
          setassetdisposalview_v1,
          assetdisposalview_v1Props,
          setassetdisposalview_v1Props,
          assetcategory_v1,
          setassetcategory_v1,
          assetcategory_v1Props,
          setassetcategory_v1Props,
          categorysearch_v1,
          setcategorysearch_v1,
          categorysearch_v1Props,
          setcategorysearch_v1Props,
          addcategory_v1,
          setaddcategory_v1,
          addcategory_v1Props,
          setaddcategory_v1Props,
          categorydelete_v1,
          setcategorydelete_v1,
          categorydelete_v1Props,
          setcategorydelete_v1Props,
          addcategoryview_v1,
          setaddcategoryview_v1,
          addcategoryview_v1Props,
          setaddcategoryview_v1Props,
          addcategorydocument_v1,
          setaddcategorydocument_v1,
          addcategorydocument_v1Props,
          setaddcategorydocument_v1Props,
          assetsoftwarelicenses_v1,
          setassetsoftwarelicenses_v1,
          assetsoftwarelicenses_v1Props,
          setassetsoftwarelicenses_v1Props,
          addlicense_v1,
          setaddlicense_v1,
          addlicense_v1Props,
          setaddlicense_v1Props,
          addlicenseview_v1,
          setaddlicenseview_v1,
          addlicenseview_v1Props,
          setaddlicenseview_v1Props,
          licensedelete_v1,
          setlicensedelete_v1,
          licensedelete_v1Props,
          setlicensedelete_v1Props,
          addsoftwarelicensesdocument_v1,
          setaddsoftwarelicensesdocument_v1,
          addsoftwarelicensesdocument_v1Props,
          setaddsoftwarelicensesdocument_v1Props,
        //////////

        ///////// dfd
        dfd_assetdashboard_v1Props,
        setdfd_assetdashboard_v1Props,
        dfd_assets_v1Props,
        setdfd_assets_v1Props,
        dfd_assetmaintenance_v1Props,
        setdfd_assetmaintenance_v1Props,
        dfd_assetsoftwarelicenses_v1Props,
        setdfd_assetsoftwarelicenses_v1Props,
        dfd_assetdisposal_v1Props,
        setdfd_assetdisposal_v1Props,
        dfd_assettypecombo_v1Props,
        setdfd_assettypecombo_v1Props,
        dfd_assetcategorycombo_v1Props,
        setdfd_assetcategorycombo_v1Props,
        dfd_assetclassificationcombo_v1Props,
        setdfd_assetclassificationcombo_v1Props,
        dfd_assetdataclassificationcombo_v1Props,
        setdfd_assetdataclassificationcombo_v1Props,
        dfd_ownershiptypecombo_v1Props,
        setdfd_ownershiptypecombo_v1Props,
        dfd_assetconditioncombo_v1Props,
        setdfd_assetconditioncombo_v1Props,
        dfd_disposalmethodcombo_v1Props,
        setdfd_disposalmethodcombo_v1Props,
        dfd_risklevelcombo_v1Props,
        setdfd_risklevelcombo_v1Props,
        dfd_vendornamecombo_v1Props,
        setdfd_vendornamecombo_v1Props,
        dfd_lifecyclestagecombo_v1Props,
        setdfd_lifecyclestagecombo_v1Props,
        dfd_currencycombo_v1Props,
        setdfd_currencycombo_v1Props,
        dfd_assetdoctable_v1Props,
        setdfd_assetdoctable_v1Props,
        dfd_assigndoctable_v1Props,
        setdfd_assigndoctable_v1Props,
        dfd_categorydoctable_v1Props,
        setdfd_categorydoctable_v1Props,
        dfd_assetassignments_v1Props,
        setdfd_assetassignments_v1Props,
        dfd_assetnamecombo_v1Props,
        setdfd_assetnamecombo_v1Props,
        dfd_assignmentstatuscombo_v1Props,
        setdfd_assignmentstatuscombo_v1Props,
        dfd_conditionatreturncombo_v1Props,
        setdfd_conditionatreturncombo_v1Props,
        dfd_approvalstatuscombo_v1Props,
        setdfd_approvalstatuscombo_v1Props,
        dfd_maintenancetypecombo_v1Props,
        setdfd_maintenancetypecombo_v1Props,
        dfd_prioritycombo_v1Props,
        setdfd_prioritycombo_v1Props,
        dfd_assetcategory_v1Props,
        setdfd_assetcategory_v1Props,
        dfd_parentcategorycombo_v1Props,
        setdfd_parentcategorycombo_v1Props,
        dfd_depreciationmethodcombo_v1Props,
        setdfd_depreciationmethodcombo_v1Props,
        dfd_assetcategorycards_v1Props,
        setdfd_assetcategorycards_v1Props,
        dfd_licensetypecombo_v1Props,
        setdfd_licensetypecombo_v1Props,
        dfd_softwaredoctable_v1Props,
        setdfd_softwaredoctable_v1Props,
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