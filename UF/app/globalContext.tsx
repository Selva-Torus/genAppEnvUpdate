


"use client"
import React, { useEffect } from 'react';
import { getCookie } from './components/cookieMgment';
import { usePathname } from 'next/navigation'
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  matchedAccessProfileData: any;
  setMatchedAccessProfileData: React.Dispatch<React.SetStateAction<any>>
  user_grpd6690: any 
  setuser_grpd6690: React.Dispatch<React.SetStateAction<any>>
  user_grpd6690Props: any 
  setuser_grpd6690Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense_table13758: any 
  setdaily_expense_table13758: React.Dispatch<React.SetStateAction<any>>
  daily_expense_table13758Props: any 
  setdaily_expense_table13758Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_table4ffd6: any 
  setoffsite_expense_table4ffd6: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_table4ffd6Props: any 
  setoffsite_expense_table4ffd6Props: React.Dispatch<React.SetStateAction<any>>
  request_daily_group44e40: any 
  setrequest_daily_group44e40: React.Dispatch<React.SetStateAction<any>>
  request_daily_group44e40Props: any 
  setrequest_daily_group44e40Props: React.Dispatch<React.SetStateAction<any>>
  request_offsite_group429cb: any 
  setrequest_offsite_group429cb: React.Dispatch<React.SetStateAction<any>>
  request_offsite_group429cbProps: any 
  setrequest_offsite_group429cbProps: React.Dispatch<React.SetStateAction<any>>
  claimsdetailtablef8143: any 
  setclaimsdetailtablef8143: React.Dispatch<React.SetStateAction<any>>
  claimsdetailtablef8143Props: any 
  setclaimsdetailtablef8143Props: React.Dispatch<React.SetStateAction<any>>
  manager_group41477: any 
  setmanager_group41477: React.Dispatch<React.SetStateAction<any>>
  manager_group41477Props: any 
  setmanager_group41477Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense_table91568: any 
  setdaily_expense_table91568: React.Dispatch<React.SetStateAction<any>>
  daily_expense_table91568Props: any 
  setdaily_expense_table91568Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_table1e924: any 
  setoffsite_expense_table1e924: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_table1e924Props: any 
  setoffsite_expense_table1e924Props: React.Dispatch<React.SetStateAction<any>>
  daily_approval_group69531: any 
  setdaily_approval_group69531: React.Dispatch<React.SetStateAction<any>>
  daily_approval_group69531Props: any 
  setdaily_approval_group69531Props: React.Dispatch<React.SetStateAction<any>>
  offsite_approval_group8d6cc: any 
  setoffsite_approval_group8d6cc: React.Dispatch<React.SetStateAction<any>>
  offsite_approval_group8d6ccProps: any 
  setoffsite_approval_group8d6ccProps: React.Dispatch<React.SetStateAction<any>>
  claim_detail_table1835f: any 
  setclaim_detail_table1835f: React.Dispatch<React.SetStateAction<any>>
  claim_detail_table1835fProps: any 
  setclaim_detail_table1835fProps: React.Dispatch<React.SetStateAction<any>>
  groupc9a87: any 
  setgroupc9a87: React.Dispatch<React.SetStateAction<any>>
  groupc9a87Props: any 
  setgroupc9a87Props: React.Dispatch<React.SetStateAction<any>>
  daily_user_table76baf: any 
  setdaily_user_table76baf: React.Dispatch<React.SetStateAction<any>>
  daily_user_table76bafProps: any 
  setdaily_user_table76bafProps: React.Dispatch<React.SetStateAction<any>>
  groupe78de: any 
  setgroupe78de: React.Dispatch<React.SetStateAction<any>>
  groupe78deProps: any 
  setgroupe78deProps: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_user_table94f29: any 
  setoffsite_expense_user_table94f29: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_user_table94f29Props: any 
  setoffsite_expense_user_table94f29Props: React.Dispatch<React.SetStateAction<any>>
  grp63e95: any 
  setgrp63e95: React.Dispatch<React.SetStateAction<any>>
  grp63e95Props: any 
  setgrp63e95Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense_manager_tablee3342: any 
  setdaily_expense_manager_tablee3342: React.Dispatch<React.SetStateAction<any>>
  daily_expense_manager_tablee3342Props: any 
  setdaily_expense_manager_tablee3342Props: React.Dispatch<React.SetStateAction<any>>
  grpdeda0: any 
  setgrpdeda0: React.Dispatch<React.SetStateAction<any>>
  grpdeda0Props: any 
  setgrpdeda0Props: React.Dispatch<React.SetStateAction<any>>
  table98ff5: any 
  settable98ff5: React.Dispatch<React.SetStateAction<any>>
  table98ff5Props: any 
  settable98ff5Props: React.Dispatch<React.SetStateAction<any>>
  report_grp0286e: any 
  setreport_grp0286e: React.Dispatch<React.SetStateAction<any>>
  report_grp0286eProps: any 
  setreport_grp0286eProps: React.Dispatch<React.SetStateAction<any>>
  approvedcardc5971: any,
  setapprovedcardc5971:React.Dispatch<React.SetStateAction<any>>
  approvedcardc5971Props: any 
  setapprovedcardc5971Props: React.Dispatch<React.SetStateAction<any>>
  rejectedcardefafa: any,
  setrejectedcardefafa:React.Dispatch<React.SetStateAction<any>>
  rejectedcardefafaProps: any 
  setrejectedcardefafaProps: React.Dispatch<React.SetStateAction<any>>
  pendingcardee3c0: any,
  setpendingcardee3c0:React.Dispatch<React.SetStateAction<any>>
  pendingcardee3c0Props: any 
  setpendingcardee3c0Props: React.Dispatch<React.SetStateAction<any>>
  dailyexpenses798bd: any,
  setdailyexpenses798bd:React.Dispatch<React.SetStateAction<any>>
  dailyexpenses798bdProps: any 
  setdailyexpenses798bdProps: React.Dispatch<React.SetStateAction<any>>
  offsiteexpensescd925: any,
  setoffsiteexpensescd925:React.Dispatch<React.SetStateAction<any>>
  offsiteexpensescd925Props: any 
  setoffsiteexpensescd925Props: React.Dispatch<React.SetStateAction<any>>
  addd126f: any,
  setaddd126f:React.Dispatch<React.SetStateAction<any>>
  addd126fProps: any 
  setaddd126fProps: React.Dispatch<React.SetStateAction<any>>
  offsite_add1ab15: any,
  setoffsite_add1ab15:React.Dispatch<React.SetStateAction<any>>
  offsite_add1ab15Props: any 
  setoffsite_add1ab15Props: React.Dispatch<React.SetStateAction<any>>
  daily_expa1e3b: any,
  setdaily_expa1e3b:React.Dispatch<React.SetStateAction<any>>
  daily_expa1e3bProps: any 
  setdaily_expa1e3bProps: React.Dispatch<React.SetStateAction<any>>
  offsite_exp949f2: any,
  setoffsite_exp949f2:React.Dispatch<React.SetStateAction<any>>
  offsite_exp949f2Props: any 
  setoffsite_exp949f2Props: React.Dispatch<React.SetStateAction<any>>
  c_id1095d: any,
  setc_id1095d:React.Dispatch<React.SetStateAction<any>>
  c_id1095dProps: any 
  setc_id1095dProps: React.Dispatch<React.SetStateAction<any>>
  claim_category16bdb: any,
  setclaim_category16bdb:React.Dispatch<React.SetStateAction<any>>
  claim_category16bdbProps: any 
  setclaim_category16bdbProps: React.Dispatch<React.SetStateAction<any>>
  amountc124c: any,
  setamountc124c:React.Dispatch<React.SetStateAction<any>>
  amountc124cProps: any 
  setamountc124cProps: React.Dispatch<React.SetStateAction<any>>
  status3fa4d: any,
  setstatus3fa4d:React.Dispatch<React.SetStateAction<any>>
  status3fa4dProps: any 
  setstatus3fa4dProps: React.Dispatch<React.SetStateAction<any>>
  date5e32f: any,
  setdate5e32f:React.Dispatch<React.SetStateAction<any>>
  date5e32fProps: any 
  setdate5e32fProps: React.Dispatch<React.SetStateAction<any>>
  claim_idb67db: any,
  setclaim_idb67db:React.Dispatch<React.SetStateAction<any>>
  claim_idb67dbProps: any 
  setclaim_idb67dbProps: React.Dispatch<React.SetStateAction<any>>
  expense_name1040c: any,
  setexpense_name1040c:React.Dispatch<React.SetStateAction<any>>
  expense_name1040cProps: any 
  setexpense_name1040cProps: React.Dispatch<React.SetStateAction<any>>
  category_total_amount54e36: any,
  setcategory_total_amount54e36:React.Dispatch<React.SetStateAction<any>>
  category_total_amount54e36Props: any 
  setcategory_total_amount54e36Props: React.Dispatch<React.SetStateAction<any>>
  trs_status6f7ad: any,
  settrs_status6f7ad:React.Dispatch<React.SetStateAction<any>>
  trs_status6f7adProps: any 
  settrs_status6f7adProps: React.Dispatch<React.SetStateAction<any>>
  formatted_date7ebf5: any,
  setformatted_date7ebf5:React.Dispatch<React.SetStateAction<any>>
  formatted_date7ebf5Props: any 
  setformatted_date7ebf5Props: React.Dispatch<React.SetStateAction<any>>
  daily_expensefb8cc: any,
  setdaily_expensefb8cc:React.Dispatch<React.SetStateAction<any>>
  daily_expensefb8ccProps: any 
  setdaily_expensefb8ccProps: React.Dispatch<React.SetStateAction<any>>
  claim_expense_type22d67: any,
  setclaim_expense_type22d67:React.Dispatch<React.SetStateAction<any>>
  claim_expense_type22d67Props: any 
  setclaim_expense_type22d67Props: React.Dispatch<React.SetStateAction<any>>
  expense_name5f562: any,
  setexpense_name5f562:React.Dispatch<React.SetStateAction<any>>
  expense_name5f562Props: any 
  setexpense_name5f562Props: React.Dispatch<React.SetStateAction<any>>
  emailaf076: any,
  setemailaf076:React.Dispatch<React.SetStateAction<any>>
  emailaf076Props: any 
  setemailaf076Props: React.Dispatch<React.SetStateAction<any>>
  expense_date92269: any,
  setexpense_date92269:React.Dispatch<React.SetStateAction<any>>
  expense_date92269Props: any 
  setexpense_date92269Props: React.Dispatch<React.SetStateAction<any>>
  claim_categoryf1fb6: any,
  setclaim_categoryf1fb6:React.Dispatch<React.SetStateAction<any>>
  claim_categoryf1fb6Props: any 
  setclaim_categoryf1fb6Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amount9782f: any,
  setcategory_total_amount9782f:React.Dispatch<React.SetStateAction<any>>
  category_total_amount9782fProps: any 
  setcategory_total_amount9782fProps: React.Dispatch<React.SetStateAction<any>>
  attachment04414: any,
  setattachment04414:React.Dispatch<React.SetStateAction<any>>
  attachment04414Props: any 
  setattachment04414Props: React.Dispatch<React.SetStateAction<any>>
  receipt_image6afe2: any,
  setreceipt_image6afe2:React.Dispatch<React.SetStateAction<any>>
  receipt_image6afe2Props: any 
  setreceipt_image6afe2Props: React.Dispatch<React.SetStateAction<any>>
  enabletextb4878: any,
  setenabletextb4878:React.Dispatch<React.SetStateAction<any>>
  enabletextb4878Props: any 
  setenabletextb4878Props: React.Dispatch<React.SetStateAction<any>>
  commentsf2394: any,
  setcommentsf2394:React.Dispatch<React.SetStateAction<any>>
  commentsf2394Props: any 
  setcommentsf2394Props: React.Dispatch<React.SetStateAction<any>>
  iscommentenabled7244d: any,
  setiscommentenabled7244d:React.Dispatch<React.SetStateAction<any>>
  iscommentenabled7244dProps: any 
  setiscommentenabled7244dProps: React.Dispatch<React.SetStateAction<any>>
  clear14ae7: any,
  setclear14ae7:React.Dispatch<React.SetStateAction<any>>
  clear14ae7Props: any 
  setclear14ae7Props: React.Dispatch<React.SetStateAction<any>>
  saved507e: any,
  setsaved507e:React.Dispatch<React.SetStateAction<any>>
  saved507eProps: any 
  setsaved507eProps: React.Dispatch<React.SetStateAction<any>>
  offsite_expense39c39: any,
  setoffsite_expense39c39:React.Dispatch<React.SetStateAction<any>>
  offsite_expense39c39Props: any 
  setoffsite_expense39c39Props: React.Dispatch<React.SetStateAction<any>>
  claim_expense_type51f6e: any,
  setclaim_expense_type51f6e:React.Dispatch<React.SetStateAction<any>>
  claim_expense_type51f6eProps: any 
  setclaim_expense_type51f6eProps: React.Dispatch<React.SetStateAction<any>>
  expense_namebf755: any,
  setexpense_namebf755:React.Dispatch<React.SetStateAction<any>>
  expense_namebf755Props: any 
  setexpense_namebf755Props: React.Dispatch<React.SetStateAction<any>>
  emailad8a5: any,
  setemailad8a5:React.Dispatch<React.SetStateAction<any>>
  emailad8a5Props: any 
  setemailad8a5Props: React.Dispatch<React.SetStateAction<any>>
  from_datee96b6: any,
  setfrom_datee96b6:React.Dispatch<React.SetStateAction<any>>
  from_datee96b6Props: any 
  setfrom_datee96b6Props: React.Dispatch<React.SetStateAction<any>>
  to_dateaf8c4: any,
  setto_dateaf8c4:React.Dispatch<React.SetStateAction<any>>
  to_dateaf8c4Props: any 
  setto_dateaf8c4Props: React.Dispatch<React.SetStateAction<any>>
  claim_categoryb2e83: any,
  setclaim_categoryb2e83:React.Dispatch<React.SetStateAction<any>>
  claim_categoryb2e83Props: any 
  setclaim_categoryb2e83Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amounte603b: any,
  setcategory_total_amounte603b:React.Dispatch<React.SetStateAction<any>>
  category_total_amounte603bProps: any 
  setcategory_total_amounte603bProps: React.Dispatch<React.SetStateAction<any>>
  attachmentc9c51: any,
  setattachmentc9c51:React.Dispatch<React.SetStateAction<any>>
  attachmentc9c51Props: any 
  setattachmentc9c51Props: React.Dispatch<React.SetStateAction<any>>
  receipt_imageafe30: any,
  setreceipt_imageafe30:React.Dispatch<React.SetStateAction<any>>
  receipt_imageafe30Props: any 
  setreceipt_imageafe30Props: React.Dispatch<React.SetStateAction<any>>
  enableeff29: any,
  setenableeff29:React.Dispatch<React.SetStateAction<any>>
  enableeff29Props: any 
  setenableeff29Props: React.Dispatch<React.SetStateAction<any>>
  comments65b18: any,
  setcomments65b18:React.Dispatch<React.SetStateAction<any>>
  comments65b18Props: any 
  setcomments65b18Props: React.Dispatch<React.SetStateAction<any>>
  is_comment_enabled5ca5f: any,
  setis_comment_enabled5ca5f:React.Dispatch<React.SetStateAction<any>>
  is_comment_enabled5ca5fProps: any 
  setis_comment_enabled5ca5fProps: React.Dispatch<React.SetStateAction<any>>
  clear2b3e6: any,
  setclear2b3e6:React.Dispatch<React.SetStateAction<any>>
  clear2b3e6Props: any 
  setclear2b3e6Props: React.Dispatch<React.SetStateAction<any>>
  add5cae4: any,
  setadd5cae4:React.Dispatch<React.SetStateAction<any>>
  add5cae4Props: any 
  setadd5cae4Props: React.Dispatch<React.SetStateAction<any>>
  claim_detail_id97d69: any,
  setclaim_detail_id97d69:React.Dispatch<React.SetStateAction<any>>
  claim_detail_id97d69Props: any 
  setclaim_detail_id97d69Props: React.Dispatch<React.SetStateAction<any>>
  expense_category182d4: any,
  setexpense_category182d4:React.Dispatch<React.SetStateAction<any>>
  expense_category182d4Props: any 
  setexpense_category182d4Props: React.Dispatch<React.SetStateAction<any>>
  expense_descriptiondee64: any,
  setexpense_descriptiondee64:React.Dispatch<React.SetStateAction<any>>
  expense_descriptiondee64Props: any 
  setexpense_descriptiondee64Props: React.Dispatch<React.SetStateAction<any>>
  expense_datee47c7: any,
  setexpense_datee47c7:React.Dispatch<React.SetStateAction<any>>
  expense_datee47c7Props: any 
  setexpense_datee47c7Props: React.Dispatch<React.SetStateAction<any>>
  expense_amountb97f7: any,
  setexpense_amountb97f7:React.Dispatch<React.SetStateAction<any>>
  expense_amountb97f7Props: any 
  setexpense_amountb97f7Props: React.Dispatch<React.SetStateAction<any>>
  approvedcard75ed7: any,
  setapprovedcard75ed7:React.Dispatch<React.SetStateAction<any>>
  approvedcard75ed7Props: any 
  setapprovedcard75ed7Props: React.Dispatch<React.SetStateAction<any>>
  rejectedcard0ceee: any,
  setrejectedcard0ceee:React.Dispatch<React.SetStateAction<any>>
  rejectedcard0ceeeProps: any 
  setrejectedcard0ceeeProps: React.Dispatch<React.SetStateAction<any>>
  pendingcard727e3: any,
  setpendingcard727e3:React.Dispatch<React.SetStateAction<any>>
  pendingcard727e3Props: any 
  setpendingcard727e3Props: React.Dispatch<React.SetStateAction<any>>
  dailyexpensese7cda: any,
  setdailyexpensese7cda:React.Dispatch<React.SetStateAction<any>>
  dailyexpensese7cdaProps: any 
  setdailyexpensese7cdaProps: React.Dispatch<React.SetStateAction<any>>
  offsiteexpenses62fe1: any,
  setoffsiteexpenses62fe1:React.Dispatch<React.SetStateAction<any>>
  offsiteexpenses62fe1Props: any 
  setoffsiteexpenses62fe1Props: React.Dispatch<React.SetStateAction<any>>
  daily_expa8b25: any,
  setdaily_expa8b25:React.Dispatch<React.SetStateAction<any>>
  daily_expa8b25Props: any 
  setdaily_expa8b25Props: React.Dispatch<React.SetStateAction<any>>
  offstie_exp400c9: any,
  setoffstie_exp400c9:React.Dispatch<React.SetStateAction<any>>
  offstie_exp400c9Props: any 
  setoffstie_exp400c9Props: React.Dispatch<React.SetStateAction<any>>
  cl_id570c3: any,
  setcl_id570c3:React.Dispatch<React.SetStateAction<any>>
  cl_id570c3Props: any 
  setcl_id570c3Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_byae57b: any,
  settrs_created_byae57b:React.Dispatch<React.SetStateAction<any>>
  trs_created_byae57bProps: any 
  settrs_created_byae57bProps: React.Dispatch<React.SetStateAction<any>>
  claim_category090da: any,
  setclaim_category090da:React.Dispatch<React.SetStateAction<any>>
  claim_category090daProps: any 
  setclaim_category090daProps: React.Dispatch<React.SetStateAction<any>>
  total_amountc033a: any,
  settotal_amountc033a:React.Dispatch<React.SetStateAction<any>>
  total_amountc033aProps: any 
  settotal_amountc033aProps: React.Dispatch<React.SetStateAction<any>>
  status49843: any,
  setstatus49843:React.Dispatch<React.SetStateAction<any>>
  status49843Props: any 
  setstatus49843Props: React.Dispatch<React.SetStateAction<any>>
  expense_date0a4c3: any,
  setexpense_date0a4c3:React.Dispatch<React.SetStateAction<any>>
  expense_date0a4c3Props: any 
  setexpense_date0a4c3Props: React.Dispatch<React.SetStateAction<any>>
  claim_id4a599: any,
  setclaim_id4a599:React.Dispatch<React.SetStateAction<any>>
  claim_id4a599Props: any 
  setclaim_id4a599Props: React.Dispatch<React.SetStateAction<any>>
  expense_namec8f13: any,
  setexpense_namec8f13:React.Dispatch<React.SetStateAction<any>>
  expense_namec8f13Props: any 
  setexpense_namec8f13Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amountfb61b: any,
  setcategory_total_amountfb61b:React.Dispatch<React.SetStateAction<any>>
  category_total_amountfb61bProps: any 
  setcategory_total_amountfb61bProps: React.Dispatch<React.SetStateAction<any>>
  trs_status79b0b: any,
  settrs_status79b0b:React.Dispatch<React.SetStateAction<any>>
  trs_status79b0bProps: any 
  settrs_status79b0bProps: React.Dispatch<React.SetStateAction<any>>
  formatted_date46435: any,
  setformatted_date46435:React.Dispatch<React.SetStateAction<any>>
  formatted_date46435Props: any 
  setformatted_date46435Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense89868: any,
  setdaily_expense89868:React.Dispatch<React.SetStateAction<any>>
  daily_expense89868Props: any 
  setdaily_expense89868Props: React.Dispatch<React.SetStateAction<any>>
  expense_name88ccc: any,
  setexpense_name88ccc:React.Dispatch<React.SetStateAction<any>>
  expense_name88cccProps: any 
  setexpense_name88cccProps: React.Dispatch<React.SetStateAction<any>>
  email74f9a: any,
  setemail74f9a:React.Dispatch<React.SetStateAction<any>>
  email74f9aProps: any 
  setemail74f9aProps: React.Dispatch<React.SetStateAction<any>>
  claim_category46dd0: any,
  setclaim_category46dd0:React.Dispatch<React.SetStateAction<any>>
  claim_category46dd0Props: any 
  setclaim_category46dd0Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amountcf2e2: any,
  setcategory_total_amountcf2e2:React.Dispatch<React.SetStateAction<any>>
  category_total_amountcf2e2Props: any 
  setcategory_total_amountcf2e2Props: React.Dispatch<React.SetStateAction<any>>
  expense_date08e2f: any,
  setexpense_date08e2f:React.Dispatch<React.SetStateAction<any>>
  expense_date08e2fProps: any 
  setexpense_date08e2fProps: React.Dispatch<React.SetStateAction<any>>
  receipt_image3cd01: any,
  setreceipt_image3cd01:React.Dispatch<React.SetStateAction<any>>
  receipt_image3cd01Props: any 
  setreceipt_image3cd01Props: React.Dispatch<React.SetStateAction<any>>
  comments9336d: any,
  setcomments9336d:React.Dispatch<React.SetStateAction<any>>
  comments9336dProps: any 
  setcomments9336dProps: React.Dispatch<React.SetStateAction<any>>
  enable666c8: any,
  setenable666c8:React.Dispatch<React.SetStateAction<any>>
  enable666c8Props: any 
  setenable666c8Props: React.Dispatch<React.SetStateAction<any>>
  manager_commentsd309a: any,
  setmanager_commentsd309a:React.Dispatch<React.SetStateAction<any>>
  manager_commentsd309aProps: any 
  setmanager_commentsd309aProps: React.Dispatch<React.SetStateAction<any>>
  is_comment_enablede20a4: any,
  setis_comment_enablede20a4:React.Dispatch<React.SetStateAction<any>>
  is_comment_enablede20a4Props: any 
  setis_comment_enablede20a4Props: React.Dispatch<React.SetStateAction<any>>
  reject28a4c: any,
  setreject28a4c:React.Dispatch<React.SetStateAction<any>>
  reject28a4cProps: any 
  setreject28a4cProps: React.Dispatch<React.SetStateAction<any>>
  approve28765: any,
  setapprove28765:React.Dispatch<React.SetStateAction<any>>
  approve28765Props: any 
  setapprove28765Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense4be82: any,
  setoffsite_expense4be82:React.Dispatch<React.SetStateAction<any>>
  offsite_expense4be82Props: any 
  setoffsite_expense4be82Props: React.Dispatch<React.SetStateAction<any>>
  expense_name084c7: any,
  setexpense_name084c7:React.Dispatch<React.SetStateAction<any>>
  expense_name084c7Props: any 
  setexpense_name084c7Props: React.Dispatch<React.SetStateAction<any>>
  email070ac: any,
  setemail070ac:React.Dispatch<React.SetStateAction<any>>
  email070acProps: any 
  setemail070acProps: React.Dispatch<React.SetStateAction<any>>
  from_dateb920f: any,
  setfrom_dateb920f:React.Dispatch<React.SetStateAction<any>>
  from_dateb920fProps: any 
  setfrom_dateb920fProps: React.Dispatch<React.SetStateAction<any>>
  to_date5ca82: any,
  setto_date5ca82:React.Dispatch<React.SetStateAction<any>>
  to_date5ca82Props: any 
  setto_date5ca82Props: React.Dispatch<React.SetStateAction<any>>
  claim_categoryac401: any,
  setclaim_categoryac401:React.Dispatch<React.SetStateAction<any>>
  claim_categoryac401Props: any 
  setclaim_categoryac401Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amountdd7c0: any,
  setcategory_total_amountdd7c0:React.Dispatch<React.SetStateAction<any>>
  category_total_amountdd7c0Props: any 
  setcategory_total_amountdd7c0Props: React.Dispatch<React.SetStateAction<any>>
  receipt_image3a832: any,
  setreceipt_image3a832:React.Dispatch<React.SetStateAction<any>>
  receipt_image3a832Props: any 
  setreceipt_image3a832Props: React.Dispatch<React.SetStateAction<any>>
  commentse0ef7: any,
  setcommentse0ef7:React.Dispatch<React.SetStateAction<any>>
  commentse0ef7Props: any 
  setcommentse0ef7Props: React.Dispatch<React.SetStateAction<any>>
  manager_comments4bec2: any,
  setmanager_comments4bec2:React.Dispatch<React.SetStateAction<any>>
  manager_comments4bec2Props: any 
  setmanager_comments4bec2Props: React.Dispatch<React.SetStateAction<any>>
  enabled5c19: any,
  setenabled5c19:React.Dispatch<React.SetStateAction<any>>
  enabled5c19Props: any 
  setenabled5c19Props: React.Dispatch<React.SetStateAction<any>>
  is_comment_enabledf9731: any,
  setis_comment_enabledf9731:React.Dispatch<React.SetStateAction<any>>
  is_comment_enabledf9731Props: any 
  setis_comment_enabledf9731Props: React.Dispatch<React.SetStateAction<any>>
  claim_detail_idcd216: any,
  setclaim_detail_idcd216:React.Dispatch<React.SetStateAction<any>>
  claim_detail_idcd216Props: any 
  setclaim_detail_idcd216Props: React.Dispatch<React.SetStateAction<any>>
  expense_category71ccd: any,
  setexpense_category71ccd:React.Dispatch<React.SetStateAction<any>>
  expense_category71ccdProps: any 
  setexpense_category71ccdProps: React.Dispatch<React.SetStateAction<any>>
  expense_description84301: any,
  setexpense_description84301:React.Dispatch<React.SetStateAction<any>>
  expense_description84301Props: any 
  setexpense_description84301Props: React.Dispatch<React.SetStateAction<any>>
  expense_date2649c: any,
  setexpense_date2649c:React.Dispatch<React.SetStateAction<any>>
  expense_date2649cProps: any 
  setexpense_date2649cProps: React.Dispatch<React.SetStateAction<any>>
  expense_amount6b94f: any,
  setexpense_amount6b94f:React.Dispatch<React.SetStateAction<any>>
  expense_amount6b94fProps: any 
  setexpense_amount6b94fProps: React.Dispatch<React.SetStateAction<any>>
  reject74228: any,
  setreject74228:React.Dispatch<React.SetStateAction<any>>
  reject74228Props: any 
  setreject74228Props: React.Dispatch<React.SetStateAction<any>>
  approve098ea: any,
  setapprove098ea:React.Dispatch<React.SetStateAction<any>>
  approve098eaProps: any 
  setapprove098eaProps: React.Dispatch<React.SetStateAction<any>>
  dailyc5d00: any,
  setdailyc5d00:React.Dispatch<React.SetStateAction<any>>
  dailyc5d00Props: any 
  setdailyc5d00Props: React.Dispatch<React.SetStateAction<any>>
  claim_iddc381: any,
  setclaim_iddc381:React.Dispatch<React.SetStateAction<any>>
  claim_iddc381Props: any 
  setclaim_iddc381Props: React.Dispatch<React.SetStateAction<any>>
  expense_name0195f: any,
  setexpense_name0195f:React.Dispatch<React.SetStateAction<any>>
  expense_name0195fProps: any 
  setexpense_name0195fProps: React.Dispatch<React.SetStateAction<any>>
  claim_category8e630: any,
  setclaim_category8e630:React.Dispatch<React.SetStateAction<any>>
  claim_category8e630Props: any 
  setclaim_category8e630Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amount2b381: any,
  setcategory_total_amount2b381:React.Dispatch<React.SetStateAction<any>>
  category_total_amount2b381Props: any 
  setcategory_total_amount2b381Props: React.Dispatch<React.SetStateAction<any>>
  expense_date7df86: any,
  setexpense_date7df86:React.Dispatch<React.SetStateAction<any>>
  expense_date7df86Props: any 
  setexpense_date7df86Props: React.Dispatch<React.SetStateAction<any>>
  trs_statuscecb6: any,
  settrs_statuscecb6:React.Dispatch<React.SetStateAction<any>>
  trs_statuscecb6Props: any 
  settrs_statuscecb6Props: React.Dispatch<React.SetStateAction<any>>
  text248b4: any,
  settext248b4:React.Dispatch<React.SetStateAction<any>>
  text248b4Props: any 
  settext248b4Props: React.Dispatch<React.SetStateAction<any>>
  claim_idadd32: any,
  setclaim_idadd32:React.Dispatch<React.SetStateAction<any>>
  claim_idadd32Props: any 
  setclaim_idadd32Props: React.Dispatch<React.SetStateAction<any>>
  expense_name0255e: any,
  setexpense_name0255e:React.Dispatch<React.SetStateAction<any>>
  expense_name0255eProps: any 
  setexpense_name0255eProps: React.Dispatch<React.SetStateAction<any>>
  claim_category8981c: any,
  setclaim_category8981c:React.Dispatch<React.SetStateAction<any>>
  claim_category8981cProps: any 
  setclaim_category8981cProps: React.Dispatch<React.SetStateAction<any>>
  category_total_amounta8a33: any,
  setcategory_total_amounta8a33:React.Dispatch<React.SetStateAction<any>>
  category_total_amounta8a33Props: any 
  setcategory_total_amounta8a33Props: React.Dispatch<React.SetStateAction<any>>
  formatted_date0d1c9: any,
  setformatted_date0d1c9:React.Dispatch<React.SetStateAction<any>>
  formatted_date0d1c9Props: any 
  setformatted_date0d1c9Props: React.Dispatch<React.SetStateAction<any>>
  trs_statusf43c9: any,
  settrs_statusf43c9:React.Dispatch<React.SetStateAction<any>>
  trs_statusf43c9Props: any 
  settrs_statusf43c9Props: React.Dispatch<React.SetStateAction<any>>
  daily14f95: any,
  setdaily14f95:React.Dispatch<React.SetStateAction<any>>
  daily14f95Props: any 
  setdaily14f95Props: React.Dispatch<React.SetStateAction<any>>
  claim_id7ec53: any,
  setclaim_id7ec53:React.Dispatch<React.SetStateAction<any>>
  claim_id7ec53Props: any 
  setclaim_id7ec53Props: React.Dispatch<React.SetStateAction<any>>
  trs_created_by1f8f9: any,
  settrs_created_by1f8f9:React.Dispatch<React.SetStateAction<any>>
  trs_created_by1f8f9Props: any 
  settrs_created_by1f8f9Props: React.Dispatch<React.SetStateAction<any>>
  expense_name78eca: any,
  setexpense_name78eca:React.Dispatch<React.SetStateAction<any>>
  expense_name78ecaProps: any 
  setexpense_name78ecaProps: React.Dispatch<React.SetStateAction<any>>
  claim_category8466d: any,
  setclaim_category8466d:React.Dispatch<React.SetStateAction<any>>
  claim_category8466dProps: any 
  setclaim_category8466dProps: React.Dispatch<React.SetStateAction<any>>
  category_total_amount22435: any,
  setcategory_total_amount22435:React.Dispatch<React.SetStateAction<any>>
  category_total_amount22435Props: any 
  setcategory_total_amount22435Props: React.Dispatch<React.SetStateAction<any>>
  expense_date20458: any,
  setexpense_date20458:React.Dispatch<React.SetStateAction<any>>
  expense_date20458Props: any 
  setexpense_date20458Props: React.Dispatch<React.SetStateAction<any>>
  trs_status9f4b4: any,
  settrs_status9f4b4:React.Dispatch<React.SetStateAction<any>>
  trs_status9f4b4Props: any 
  settrs_status9f4b4Props: React.Dispatch<React.SetStateAction<any>>
  reject4d3f0: any,
  setreject4d3f0:React.Dispatch<React.SetStateAction<any>>
  reject4d3f0Props: any 
  setreject4d3f0Props: React.Dispatch<React.SetStateAction<any>>
  approve819e1: any,
  setapprove819e1:React.Dispatch<React.SetStateAction<any>>
  approve819e1Props: any 
  setapprove819e1Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense46e6c: any,
  setoffsite_expense46e6c:React.Dispatch<React.SetStateAction<any>>
  offsite_expense46e6cProps: any 
  setoffsite_expense46e6cProps: React.Dispatch<React.SetStateAction<any>>
  claim_id56078: any,
  setclaim_id56078:React.Dispatch<React.SetStateAction<any>>
  claim_id56078Props: any 
  setclaim_id56078Props: React.Dispatch<React.SetStateAction<any>>
  rejecte566a: any,
  setrejecte566a:React.Dispatch<React.SetStateAction<any>>
  rejecte566aProps: any 
  setrejecte566aProps: React.Dispatch<React.SetStateAction<any>>
  approve5709e: any,
  setapprove5709e:React.Dispatch<React.SetStateAction<any>>
  approve5709eProps: any 
  setapprove5709eProps: React.Dispatch<React.SetStateAction<any>>
  trs_created_by8053b: any,
  settrs_created_by8053b:React.Dispatch<React.SetStateAction<any>>
  trs_created_by8053bProps: any 
  settrs_created_by8053bProps: React.Dispatch<React.SetStateAction<any>>
  expense_name94440: any,
  setexpense_name94440:React.Dispatch<React.SetStateAction<any>>
  expense_name94440Props: any 
  setexpense_name94440Props: React.Dispatch<React.SetStateAction<any>>
  claim_category9ec61: any,
  setclaim_category9ec61:React.Dispatch<React.SetStateAction<any>>
  claim_category9ec61Props: any 
  setclaim_category9ec61Props: React.Dispatch<React.SetStateAction<any>>
  category_total_amount689b8: any,
  setcategory_total_amount689b8:React.Dispatch<React.SetStateAction<any>>
  category_total_amount689b8Props: any 
  setcategory_total_amount689b8Props: React.Dispatch<React.SetStateAction<any>>
  formatted_date1030f: any,
  setformatted_date1030f:React.Dispatch<React.SetStateAction<any>>
  formatted_date1030fProps: any 
  setformatted_date1030fProps: React.Dispatch<React.SetStateAction<any>>
  trs_status759b6: any,
  settrs_status759b6:React.Dispatch<React.SetStateAction<any>>
  trs_status759b6Props: any 
  settrs_status759b6Props: React.Dispatch<React.SetStateAction<any>>
  bar_chart477a2: any,
  setbar_chart477a2:React.Dispatch<React.SetStateAction<any>>
  bar_chart477a2Props: any 
  setbar_chart477a2Props: React.Dispatch<React.SetStateAction<any>>
  piechart7818e: any,
  setpiechart7818e:React.Dispatch<React.SetStateAction<any>>
  piechart7818eProps: any 
  setpiechart7818eProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  dashboard_for_user_v1: any 
  setdashboard_for_user_v1: React.Dispatch<React.SetStateAction<any>>
  dashboard_for_user_v1Props: any 
  setdashboard_for_user_v1Props: React.Dispatch<React.SetStateAction<any>>
  request_screen_daily_v1: any 
  setrequest_screen_daily_v1: React.Dispatch<React.SetStateAction<any>>
  request_screen_daily_v1Props: any 
  setrequest_screen_daily_v1Props: React.Dispatch<React.SetStateAction<any>>
  request_screen_offsite_v1: any 
  setrequest_screen_offsite_v1: React.Dispatch<React.SetStateAction<any>>
  request_screen_offsite_v1Props: any 
  setrequest_screen_offsite_v1Props: React.Dispatch<React.SetStateAction<any>>
  dashboard_for_manager_v1: any 
  setdashboard_for_manager_v1: React.Dispatch<React.SetStateAction<any>>
  dashboard_for_manager_v1Props: any 
  setdashboard_for_manager_v1Props: React.Dispatch<React.SetStateAction<any>>
  approval_screen_daily_v1: any 
  setapproval_screen_daily_v1: React.Dispatch<React.SetStateAction<any>>
  approval_screen_daily_v1Props: any 
  setapproval_screen_daily_v1Props: React.Dispatch<React.SetStateAction<any>>
  approval_screen_offsite_v1: any 
  setapproval_screen_offsite_v1: React.Dispatch<React.SetStateAction<any>>
  approval_screen_offsite_v1Props: any 
  setapproval_screen_offsite_v1Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense_user_table_v1: any 
  setdaily_expense_user_table_v1: React.Dispatch<React.SetStateAction<any>>
  daily_expense_user_table_v1Props: any 
  setdaily_expense_user_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_user_table_v1: any 
  setoffsite_expense_user_table_v1: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_user_table_v1Props: any 
  setoffsite_expense_user_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  daily_expense_manager_table_v1: any 
  setdaily_expense_manager_table_v1: React.Dispatch<React.SetStateAction<any>>
  daily_expense_manager_table_v1Props: any 
  setdaily_expense_manager_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_manager_table_v1: any 
  setoffsite_expense_manager_table_v1: React.Dispatch<React.SetStateAction<any>>
  offsite_expense_manager_table_v1Props: any 
  setoffsite_expense_manager_table_v1Props: React.Dispatch<React.SetStateAction<any>>
  report_v1: any 
  setreport_v1: React.Dispatch<React.SetStateAction<any>>
  report_v1Props: any 
  setreport_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd
  dfd_claims_v1Props: any 
  setdfd_claims_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_code_description_v1Props: any 
  setdfd_code_description_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_claims_detail_v1Props: any 
  setdfd_claims_detail_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_card_data_v1Props: any 
  setdfd_card_data_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_claim_table_data_v1Props: any 
  setdfd_claim_table_data_v1Props: React.Dispatch<React.SetStateAction<any>>
  dfd_chart_data_v1Props: any 
  setdfd_chart_data_v1Props: React.Dispatch<React.SetStateAction<any>>

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
        const [user_grpd6690, setuser_grpd6690 ] = React.useState<any>({}) 
    const [user_grpd6690Props, setuser_grpd6690Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "approvedcard",
            "rejectedcard",
            "pendingcard",
            "dailyexpenses",
            "offsiteexpenses",
            "add",
            "offsite_add",
            "daily_exp",
            "offsite_exp",
      ]
      }) 
    
    const [daily_expense_table13758, setdaily_expense_table13758 ] = React.useState<any>([]) 
    const [daily_expense_table13758Props, setdaily_expense_table13758Props ] = React.useState<any>({
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
    
    const [offsite_expense_table4ffd6, setoffsite_expense_table4ffd6 ] = React.useState<any>([]) 
    const [offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props ] = React.useState<any>({
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
        const [request_daily_group44e40, setrequest_daily_group44e40 ] = React.useState<any>({}) 
    const [request_daily_group44e40Props, setrequest_daily_group44e40Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "claim_expense_type",
            "expense_name",
            "email",
            "expense_date",
            "claim_category",
            "claim_category",
            "claim_category",
            "category_total_amount",
            "attachment",
            "receipt_image",
            "enabletext",
            "comments",
            "is_comment_enabled",
            "clear",
            "save",
      ]
      }) 
        const [request_offsite_group429cb, setrequest_offsite_group429cb ] = React.useState<any>({}) 
    const [request_offsite_group429cbProps, setrequest_offsite_group429cbProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
            "claim_expense_type",
            "expense_name",
            "email",
            "from_date",
            "to_date",
            "claim_category",
            "claim_category",
            "claim_category",
            "category_total_amount",
            "attachment",
            "receipt_image",
            "enable",
            "comments",
            "is_comment_enabled",
            "clear",
            "add",
      ]
      }) 
    
    const [claimsdetailtablef8143, setclaimsdetailtablef8143 ] = React.useState<any>([]) 
    const [claimsdetailtablef8143Props, setclaimsdetailtablef8143Props ] = React.useState<any>({
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
        const [manager_group41477, setmanager_group41477 ] = React.useState<any>({}) 
    const [manager_group41477Props, setmanager_group41477Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "approvedcard",
            "rejectedcard",
            "pendingcard",
            "dailyexpenses",
            "offsiteexpenses",
            "daily_exp",
            "offstie_exp",
      ]
      }) 
    
    const [daily_expense_table91568, setdaily_expense_table91568 ] = React.useState<any>([]) 
    const [daily_expense_table91568Props, setdaily_expense_table91568Props ] = React.useState<any>({
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
    
    const [offsite_expense_table1e924, setoffsite_expense_table1e924 ] = React.useState<any>([]) 
    const [offsite_expense_table1e924Props, setoffsite_expense_table1e924Props ] = React.useState<any>({
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
        const [daily_approval_group69531, setdaily_approval_group69531 ] = React.useState<any>({}) 
    const [daily_approval_group69531Props, setdaily_approval_group69531Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "expense_name",
            "email",
            "claim_category",
            "category_total_amount",
            "expense_date",
            "receipt_image",
            "comments",
            "enable",
            "manager_comments",
            "is_comment_enabled",
            "reject",
            "approve",
      ]
      }) 
        const [offsite_approval_group8d6cc, setoffsite_approval_group8d6cc ] = React.useState<any>({}) 
    const [offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
            "expense_name",
            "email",
            "from_date",
            "to_date",
            "claim_category",
            "category_total_amount",
            "receipt_image",
            "comments",
            "manager_comments",
            "enable",
            "is_comment_enabled",
            "reject",
            "approve",
      ]
      }) 
    
    const [claim_detail_table1835f, setclaim_detail_table1835f ] = React.useState<any>([]) 
    const [claim_detail_table1835fProps, setclaim_detail_table1835fProps ] = React.useState<any>({
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
        const [groupc9a87, setgroupc9a87 ] = React.useState<any>({}) 
    const [groupc9a87Props, setgroupc9a87Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily",
      ]
      }) 
    
    const [daily_user_table76baf, setdaily_user_table76baf ] = React.useState<any>([]) 
    const [daily_user_table76bafProps, setdaily_user_table76bafProps ] = React.useState<any>({
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
        const [groupe78de, setgroupe78de ] = React.useState<any>({}) 
    const [groupe78deProps, setgroupe78deProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "text",
      ]
      }) 
    
    const [offsite_expense_user_table94f29, setoffsite_expense_user_table94f29 ] = React.useState<any>([]) 
    const [offsite_expense_user_table94f29Props, setoffsite_expense_user_table94f29Props ] = React.useState<any>({
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
        const [grp63e95, setgrp63e95 ] = React.useState<any>({}) 
    const [grp63e95Props, setgrp63e95Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily",
      ]
      }) 
    
    const [daily_expense_manager_tablee3342, setdaily_expense_manager_tablee3342 ] = React.useState<any>([]) 
    const [daily_expense_manager_tablee3342Props, setdaily_expense_manager_tablee3342Props ] = React.useState<any>({
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
        const [grpdeda0, setgrpdeda0 ] = React.useState<any>({}) 
    const [grpdeda0Props, setgrpdeda0Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false, // if change this value to true group array refresh will not work
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
      ]
      }) 
    
    const [table98ff5, settable98ff5 ] = React.useState<any>([]) 
    const [table98ff5Props, settable98ff5Props ] = React.useState<any>({
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
        const [report_grp0286e, setreport_grp0286e ] = React.useState<any>({}) 
    const [report_grp0286eProps, setreport_grp0286eProps ] = React.useState<any>({
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
            "amount",
      ]
      }) 
   const [approvedcardc5971,setapprovedcardc5971] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approvedcardc5971Props,setapprovedcardc5971Props] = React.useState<any>({}) 
   const [rejectedcardefafa,setrejectedcardefafa] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [rejectedcardefafaProps,setrejectedcardefafaProps] = React.useState<any>({}) 
   const [pendingcardee3c0,setpendingcardee3c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [pendingcardee3c0Props,setpendingcardee3c0Props] = React.useState<any>({}) 
   const [dailyexpenses798bd,setdailyexpenses798bd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dailyexpenses798bdProps,setdailyexpenses798bdProps] = React.useState<any>({}) 
   const [offsiteexpensescd925,setoffsiteexpensescd925] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsiteexpensescd925Props,setoffsiteexpensescd925Props] = React.useState<any>({}) 
   const [addd126f,setaddd126f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [addd126fProps,setaddd126fProps] = React.useState<any>({}) 
   const [offsite_add1ab15,setoffsite_add1ab15] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsite_add1ab15Props,setoffsite_add1ab15Props] = React.useState<any>({}) 
   const [daily_expa1e3b,setdaily_expa1e3b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [daily_expa1e3bProps,setdaily_expa1e3bProps] = React.useState<any>({}) 
   const [offsite_exp949f2,setoffsite_exp949f2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsite_exp949f2Props,setoffsite_exp949f2Props] = React.useState<any>({}) 
   const [c_id1095d,setc_id1095d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [c_id1095dProps,setc_id1095dProps] = React.useState<any>({}) 
   const [claim_category16bdb,setclaim_category16bdb] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category16bdbProps,setclaim_category16bdbProps] = React.useState<any>({}) 
   const [amountc124c,setamountc124c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [amountc124cProps,setamountc124cProps] = React.useState<any>({}) 
   const [status3fa4d,setstatus3fa4d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status3fa4dProps,setstatus3fa4dProps] = React.useState<any>({}) 
   const [date5e32f,setdate5e32f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [date5e32fProps,setdate5e32fProps] = React.useState<any>({}) 
   const [claim_idb67db,setclaim_idb67db] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_idb67dbProps,setclaim_idb67dbProps] = React.useState<any>({}) 
   const [expense_name1040c,setexpense_name1040c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name1040cProps,setexpense_name1040cProps] = React.useState<any>({}) 
   const [category_total_amount54e36,setcategory_total_amount54e36] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amount54e36Props,setcategory_total_amount54e36Props] = React.useState<any>({}) 
   const [trs_status6f7ad,settrs_status6f7ad] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_status6f7adProps,settrs_status6f7adProps] = React.useState<any>({}) 
   const [formatted_date7ebf5,setformatted_date7ebf5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [formatted_date7ebf5Props,setformatted_date7ebf5Props] = React.useState<any>({}) 
   const [daily_expensefb8cc,setdaily_expensefb8cc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [daily_expensefb8ccProps,setdaily_expensefb8ccProps] = React.useState<any>({}) 
   const [claim_expense_type22d67,setclaim_expense_type22d67] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_expense_type22d67Props,setclaim_expense_type22d67Props] = React.useState<any>({}) 
   const [expense_name5f562,setexpense_name5f562] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name5f562Props,setexpense_name5f562Props] = React.useState<any>({}) 
   const [emailaf076,setemailaf076] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [emailaf076Props,setemailaf076Props] = React.useState<any>({}) 
   const [expense_date92269,setexpense_date92269] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date92269Props,setexpense_date92269Props] = React.useState<any>({}) 
   const [claim_categoryf1fb6,setclaim_categoryf1fb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_categoryf1fb6Props,setclaim_categoryf1fb6Props] = React.useState<any>({}) 
   const [category_total_amount9782f,setcategory_total_amount9782f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amount9782fProps,setcategory_total_amount9782fProps] = React.useState<any>({}) 
   const [attachment04414,setattachment04414] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [attachment04414Props,setattachment04414Props] = React.useState<any>({}) 
   const [receipt_image6afe2,setreceipt_image6afe2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [receipt_image6afe2Props,setreceipt_image6afe2Props] = React.useState<any>({}) 
   const [enabletextb4878,setenabletextb4878] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enabletextb4878Props,setenabletextb4878Props] = React.useState<any>({}) 
   const [commentsf2394,setcommentsf2394] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [commentsf2394Props,setcommentsf2394Props] = React.useState<any>({}) 
   const [iscommentenabled7244d,setiscommentenabled7244d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [iscommentenabled7244dProps,setiscommentenabled7244dProps] = React.useState<any>({}) 
   const [clear14ae7,setclear14ae7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear14ae7Props,setclear14ae7Props] = React.useState<any>({}) 
   const [saved507e,setsaved507e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [saved507eProps,setsaved507eProps] = React.useState<any>({}) 
   const [offsite_expense39c39,setoffsite_expense39c39] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsite_expense39c39Props,setoffsite_expense39c39Props] = React.useState<any>({}) 
   const [claim_expense_type51f6e,setclaim_expense_type51f6e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_expense_type51f6eProps,setclaim_expense_type51f6eProps] = React.useState<any>({}) 
   const [expense_namebf755,setexpense_namebf755] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_namebf755Props,setexpense_namebf755Props] = React.useState<any>({}) 
   const [emailad8a5,setemailad8a5] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [emailad8a5Props,setemailad8a5Props] = React.useState<any>({}) 
   const [from_datee96b6,setfrom_datee96b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [from_datee96b6Props,setfrom_datee96b6Props] = React.useState<any>({}) 
   const [to_dateaf8c4,setto_dateaf8c4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [to_dateaf8c4Props,setto_dateaf8c4Props] = React.useState<any>({}) 
   const [claim_categoryb2e83,setclaim_categoryb2e83] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_categoryb2e83Props,setclaim_categoryb2e83Props] = React.useState<any>({}) 
   const [category_total_amounte603b,setcategory_total_amounte603b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amounte603bProps,setcategory_total_amounte603bProps] = React.useState<any>({}) 
   const [attachmentc9c51,setattachmentc9c51] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [attachmentc9c51Props,setattachmentc9c51Props] = React.useState<any>({}) 
   const [receipt_imageafe30,setreceipt_imageafe30] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [receipt_imageafe30Props,setreceipt_imageafe30Props] = React.useState<any>({}) 
   const [enableeff29,setenableeff29] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enableeff29Props,setenableeff29Props] = React.useState<any>({}) 
   const [comments65b18,setcomments65b18] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [comments65b18Props,setcomments65b18Props] = React.useState<any>({}) 
   const [is_comment_enabled5ca5f,setis_comment_enabled5ca5f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [is_comment_enabled5ca5fProps,setis_comment_enabled5ca5fProps] = React.useState<any>({}) 
   const [clear2b3e6,setclear2b3e6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [clear2b3e6Props,setclear2b3e6Props] = React.useState<any>({}) 
   const [add5cae4,setadd5cae4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [add5cae4Props,setadd5cae4Props] = React.useState<any>({}) 
   const [claim_detail_id97d69,setclaim_detail_id97d69] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_detail_id97d69Props,setclaim_detail_id97d69Props] = React.useState<any>({}) 
   const [expense_category182d4,setexpense_category182d4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_category182d4Props,setexpense_category182d4Props] = React.useState<any>({}) 
   const [expense_descriptiondee64,setexpense_descriptiondee64] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_descriptiondee64Props,setexpense_descriptiondee64Props] = React.useState<any>({}) 
   const [expense_datee47c7,setexpense_datee47c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_datee47c7Props,setexpense_datee47c7Props] = React.useState<any>({}) 
   const [expense_amountb97f7,setexpense_amountb97f7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_amountb97f7Props,setexpense_amountb97f7Props] = React.useState<any>({}) 
   const [approvedcard75ed7,setapprovedcard75ed7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approvedcard75ed7Props,setapprovedcard75ed7Props] = React.useState<any>({}) 
   const [rejectedcard0ceee,setrejectedcard0ceee] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [rejectedcard0ceeeProps,setrejectedcard0ceeeProps] = React.useState<any>({}) 
   const [pendingcard727e3,setpendingcard727e3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [pendingcard727e3Props,setpendingcard727e3Props] = React.useState<any>({}) 
   const [dailyexpensese7cda,setdailyexpensese7cda] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dailyexpensese7cdaProps,setdailyexpensese7cdaProps] = React.useState<any>({}) 
   const [offsiteexpenses62fe1,setoffsiteexpenses62fe1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsiteexpenses62fe1Props,setoffsiteexpenses62fe1Props] = React.useState<any>({}) 
   const [daily_expa8b25,setdaily_expa8b25] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [daily_expa8b25Props,setdaily_expa8b25Props] = React.useState<any>({}) 
   const [offstie_exp400c9,setoffstie_exp400c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offstie_exp400c9Props,setoffstie_exp400c9Props] = React.useState<any>({}) 
   const [cl_id570c3,setcl_id570c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [cl_id570c3Props,setcl_id570c3Props] = React.useState<any>({}) 
   const [trs_created_byae57b,settrs_created_byae57b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_byae57bProps,settrs_created_byae57bProps] = React.useState<any>({}) 
   const [claim_category090da,setclaim_category090da] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category090daProps,setclaim_category090daProps] = React.useState<any>({}) 
   const [total_amountc033a,settotal_amountc033a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [total_amountc033aProps,settotal_amountc033aProps] = React.useState<any>({}) 
   const [status49843,setstatus49843] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [status49843Props,setstatus49843Props] = React.useState<any>({}) 
   const [expense_date0a4c3,setexpense_date0a4c3] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date0a4c3Props,setexpense_date0a4c3Props] = React.useState<any>({}) 
   const [claim_id4a599,setclaim_id4a599] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_id4a599Props,setclaim_id4a599Props] = React.useState<any>({}) 
   const [expense_namec8f13,setexpense_namec8f13] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_namec8f13Props,setexpense_namec8f13Props] = React.useState<any>({}) 
   const [category_total_amountfb61b,setcategory_total_amountfb61b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amountfb61bProps,setcategory_total_amountfb61bProps] = React.useState<any>({}) 
   const [trs_status79b0b,settrs_status79b0b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_status79b0bProps,settrs_status79b0bProps] = React.useState<any>({}) 
   const [formatted_date46435,setformatted_date46435] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [formatted_date46435Props,setformatted_date46435Props] = React.useState<any>({}) 
   const [daily_expense89868,setdaily_expense89868] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [daily_expense89868Props,setdaily_expense89868Props] = React.useState<any>({}) 
   const [expense_name88ccc,setexpense_name88ccc] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name88cccProps,setexpense_name88cccProps] = React.useState<any>({}) 
   const [email74f9a,setemail74f9a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [email74f9aProps,setemail74f9aProps] = React.useState<any>({}) 
   const [claim_category46dd0,setclaim_category46dd0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category46dd0Props,setclaim_category46dd0Props] = React.useState<any>({}) 
   const [category_total_amountcf2e2,setcategory_total_amountcf2e2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amountcf2e2Props,setcategory_total_amountcf2e2Props] = React.useState<any>({}) 
   const [expense_date08e2f,setexpense_date08e2f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date08e2fProps,setexpense_date08e2fProps] = React.useState<any>({}) 
   const [receipt_image3cd01,setreceipt_image3cd01] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [receipt_image3cd01Props,setreceipt_image3cd01Props] = React.useState<any>({}) 
   const [comments9336d,setcomments9336d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [comments9336dProps,setcomments9336dProps] = React.useState<any>({}) 
   const [enable666c8,setenable666c8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enable666c8Props,setenable666c8Props] = React.useState<any>({}) 
   const [manager_commentsd309a,setmanager_commentsd309a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [manager_commentsd309aProps,setmanager_commentsd309aProps] = React.useState<any>({}) 
   const [is_comment_enablede20a4,setis_comment_enablede20a4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [is_comment_enablede20a4Props,setis_comment_enablede20a4Props] = React.useState<any>({}) 
   const [reject28a4c,setreject28a4c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reject28a4cProps,setreject28a4cProps] = React.useState<any>({}) 
   const [approve28765,setapprove28765] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approve28765Props,setapprove28765Props] = React.useState<any>({}) 
   const [offsite_expense4be82,setoffsite_expense4be82] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsite_expense4be82Props,setoffsite_expense4be82Props] = React.useState<any>({}) 
   const [expense_name084c7,setexpense_name084c7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name084c7Props,setexpense_name084c7Props] = React.useState<any>({}) 
   const [email070ac,setemail070ac] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [email070acProps,setemail070acProps] = React.useState<any>({}) 
   const [from_dateb920f,setfrom_dateb920f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [from_dateb920fProps,setfrom_dateb920fProps] = React.useState<any>({}) 
   const [to_date5ca82,setto_date5ca82] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [to_date5ca82Props,setto_date5ca82Props] = React.useState<any>({}) 
   const [claim_categoryac401,setclaim_categoryac401] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_categoryac401Props,setclaim_categoryac401Props] = React.useState<any>({}) 
   const [category_total_amountdd7c0,setcategory_total_amountdd7c0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amountdd7c0Props,setcategory_total_amountdd7c0Props] = React.useState<any>({}) 
   const [receipt_image3a832,setreceipt_image3a832] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [receipt_image3a832Props,setreceipt_image3a832Props] = React.useState<any>({}) 
   const [commentse0ef7,setcommentse0ef7] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [commentse0ef7Props,setcommentse0ef7Props] = React.useState<any>({}) 
   const [manager_comments4bec2,setmanager_comments4bec2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [manager_comments4bec2Props,setmanager_comments4bec2Props] = React.useState<any>({}) 
   const [enabled5c19,setenabled5c19] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [enabled5c19Props,setenabled5c19Props] = React.useState<any>({}) 
   const [is_comment_enabledf9731,setis_comment_enabledf9731] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [is_comment_enabledf9731Props,setis_comment_enabledf9731Props] = React.useState<any>({}) 
   const [claim_detail_idcd216,setclaim_detail_idcd216] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_detail_idcd216Props,setclaim_detail_idcd216Props] = React.useState<any>({}) 
   const [expense_category71ccd,setexpense_category71ccd] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_category71ccdProps,setexpense_category71ccdProps] = React.useState<any>({}) 
   const [expense_description84301,setexpense_description84301] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_description84301Props,setexpense_description84301Props] = React.useState<any>({}) 
   const [expense_date2649c,setexpense_date2649c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date2649cProps,setexpense_date2649cProps] = React.useState<any>({}) 
   const [expense_amount6b94f,setexpense_amount6b94f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_amount6b94fProps,setexpense_amount6b94fProps] = React.useState<any>({}) 
   const [reject74228,setreject74228] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reject74228Props,setreject74228Props] = React.useState<any>({}) 
   const [approve098ea,setapprove098ea] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approve098eaProps,setapprove098eaProps] = React.useState<any>({}) 
   const [dailyc5d00,setdailyc5d00] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [dailyc5d00Props,setdailyc5d00Props] = React.useState<any>({}) 
   const [claim_iddc381,setclaim_iddc381] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_iddc381Props,setclaim_iddc381Props] = React.useState<any>({}) 
   const [expense_name0195f,setexpense_name0195f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name0195fProps,setexpense_name0195fProps] = React.useState<any>({}) 
   const [claim_category8e630,setclaim_category8e630] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category8e630Props,setclaim_category8e630Props] = React.useState<any>({}) 
   const [category_total_amount2b381,setcategory_total_amount2b381] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amount2b381Props,setcategory_total_amount2b381Props] = React.useState<any>({}) 
   const [expense_date7df86,setexpense_date7df86] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date7df86Props,setexpense_date7df86Props] = React.useState<any>({}) 
   const [trs_statuscecb6,settrs_statuscecb6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_statuscecb6Props,settrs_statuscecb6Props] = React.useState<any>({}) 
   const [text248b4,settext248b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [text248b4Props,settext248b4Props] = React.useState<any>({}) 
   const [claim_idadd32,setclaim_idadd32] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_idadd32Props,setclaim_idadd32Props] = React.useState<any>({}) 
   const [expense_name0255e,setexpense_name0255e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name0255eProps,setexpense_name0255eProps] = React.useState<any>({}) 
   const [claim_category8981c,setclaim_category8981c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category8981cProps,setclaim_category8981cProps] = React.useState<any>({}) 
   const [category_total_amounta8a33,setcategory_total_amounta8a33] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amounta8a33Props,setcategory_total_amounta8a33Props] = React.useState<any>({}) 
   const [formatted_date0d1c9,setformatted_date0d1c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [formatted_date0d1c9Props,setformatted_date0d1c9Props] = React.useState<any>({}) 
   const [trs_statusf43c9,settrs_statusf43c9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_statusf43c9Props,settrs_statusf43c9Props] = React.useState<any>({}) 
   const [daily14f95,setdaily14f95] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [daily14f95Props,setdaily14f95Props] = React.useState<any>({}) 
   const [claim_id7ec53,setclaim_id7ec53] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_id7ec53Props,setclaim_id7ec53Props] = React.useState<any>({}) 
   const [trs_created_by1f8f9,settrs_created_by1f8f9] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_by1f8f9Props,settrs_created_by1f8f9Props] = React.useState<any>({}) 
   const [expense_name78eca,setexpense_name78eca] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name78ecaProps,setexpense_name78ecaProps] = React.useState<any>({}) 
   const [claim_category8466d,setclaim_category8466d] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category8466dProps,setclaim_category8466dProps] = React.useState<any>({}) 
   const [category_total_amount22435,setcategory_total_amount22435] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amount22435Props,setcategory_total_amount22435Props] = React.useState<any>({}) 
   const [expense_date20458,setexpense_date20458] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_date20458Props,setexpense_date20458Props] = React.useState<any>({}) 
   const [trs_status9f4b4,settrs_status9f4b4] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_status9f4b4Props,settrs_status9f4b4Props] = React.useState<any>({}) 
   const [reject4d3f0,setreject4d3f0] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [reject4d3f0Props,setreject4d3f0Props] = React.useState<any>({}) 
   const [approve819e1,setapprove819e1] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approve819e1Props,setapprove819e1Props] = React.useState<any>({}) 
   const [offsite_expense46e6c,setoffsite_expense46e6c] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [offsite_expense46e6cProps,setoffsite_expense46e6cProps] = React.useState<any>({}) 
   const [claim_id56078,setclaim_id56078] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_id56078Props,setclaim_id56078Props] = React.useState<any>({}) 
   const [rejecte566a,setrejecte566a] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [rejecte566aProps,setrejecte566aProps] = React.useState<any>({}) 
   const [approve5709e,setapprove5709e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [approve5709eProps,setapprove5709eProps] = React.useState<any>({}) 
   const [trs_created_by8053b,settrs_created_by8053b] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_created_by8053bProps,settrs_created_by8053bProps] = React.useState<any>({}) 
   const [expense_name94440,setexpense_name94440] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [expense_name94440Props,setexpense_name94440Props] = React.useState<any>({}) 
   const [claim_category9ec61,setclaim_category9ec61] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [claim_category9ec61Props,setclaim_category9ec61Props] = React.useState<any>({}) 
   const [category_total_amount689b8,setcategory_total_amount689b8] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [category_total_amount689b8Props,setcategory_total_amount689b8Props] = React.useState<any>({}) 
   const [formatted_date1030f,setformatted_date1030f] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [formatted_date1030fProps,setformatted_date1030fProps] = React.useState<any>({}) 
   const [trs_status759b6,settrs_status759b6] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [trs_status759b6Props,settrs_status759b6Props] = React.useState<any>({}) 
   const [bar_chart477a2,setbar_chart477a2] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [bar_chart477a2Props,setbar_chart477a2Props] = React.useState<any>({}) 
   const [piechart7818e,setpiechart7818e] = React.useState<any>({
    isDisabled: null,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    trigger: null,
    currentIndex: 0,
    totalFiles: 0
    }) 
   const [piechart7818eProps,setpiechart7818eProps] = React.useState<any>({}) 
    ///////////
    const [refresh, setRefresh] = React.useState<Record<string, boolean>>({       cardapprovedcardc5971:false,
       cardrejectedcardefafa:false,
       cardpendingcardee3c0:false,
       carddailyexpenses798bd:false,
       cardoffsiteexpensescd925:false,
       buttonaddd126f:false,
       buttonoffsite_add1ab15:false,
       textdaily_expa1e3b:false,
       textoffsite_exp949f2:false,
       columnc_id1095d:false,
       columnclaim_category16bdb:false,
       columnamountc124c:false,
       columnstatus3fa4d:false,
       columndate5e32f:false,
       columnclaim_idb67db:false,
       columnexpense_name1040c:false,
       columncategory_total_amount54e36:false,
       columntrs_status6f7ad:false,
       columnformatted_date7ebf5:false,
       textdaily_expensefb8cc:false,
       textinputclaim_expense_type22d67:false,
       textinputexpense_name5f562:false,
       textinputemailaf076:false,
       datepickerexpense_date92269:false,
       dropdownclaim_categoryf1fb6:false,
       textinputcategory_total_amount9782f:false,
       textattachment04414:false,
       documentuploaderreceipt_image6afe2:false,
       textenabletextb4878:false,
       textareacommentsf2394:false,
       switchiscommentenabled7244d:false,
       buttonClear14ae7:false,
       buttonSaved507e:false,
       textoffsite_expense39c39:false,
       textinputclaim_expense_type51f6e:false,
       textinputexpense_namebf755:false,
       textinputemailad8a5:false,
       datepickerfrom_datee96b6:false,
       datepickerto_dateaf8c4:false,
       dropdownclaim_categoryb2e83:false,
       textinputcategory_total_amounte603b:false,
       textattachmentc9c51:false,
       documentuploaderreceipt_imageafe30:false,
       textenableeff29:false,
       textareacomments65b18:false,
       switchis_comment_enabled5ca5f:false,
       buttonClear2b3e6:false,
       buttonAdd5cae4:false,
       columnclaim_detail_id97d69:false,
       columnexpense_category182d4:false,
       columnexpense_descriptiondee64:false,
       columnexpense_datee47c7:false,
       columnexpense_amountb97f7:false,
       cardapprovedcard75ed7:false,
       cardrejectedcard0ceee:false,
       cardpendingcard727e3:false,
       carddailyexpensese7cda:false,
       cardoffsiteexpenses62fe1:false,
       textdaily_expa8b25:false,
       textoffstie_exp400c9:false,
       columncl_id570c3:false,
       columntrs_created_byae57b:false,
       columnclaim_category090da:false,
       columntotal_amountc033a:false,
       columnstatus49843:false,
       columnexpense_date0a4c3:false,
       columnclaim_id4a599:false,
       columnexpense_namec8f13:false,
       columncategory_total_amountfb61b:false,
       columntrs_status79b0b:false,
       columnformatted_date46435:false,
       textdaily_expense89868:false,
       textinputexpense_name88ccc:false,
       textinputemail74f9a:false,
       textinputclaim_category46dd0:false,
       textinputcategory_total_amountcf2e2:false,
       datepickerexpense_date08e2f:false,
       documentviewerreceipt_image3cd01:false,
       textareacomments9336d:false,
       textENABLE666c8:false,
       textareamanager_commentsd309a:false,
       switchis_comment_enablede20a4:false,
       buttonReject28a4c:false,
       buttonApprove28765:false,
       textoffsite_expense4be82:false,
       textinputexpense_name084c7:false,
       textinputemail070ac:false,
       datepickerfrom_dateb920f:false,
       datepickerto_date5ca82:false,
       textinputclaim_categoryac401:false,
       textinputcategory_total_amountdd7c0:false,
       documentviewerreceipt_image3a832:false,
       textareacommentse0ef7:false,
       textareamanager_comments4bec2:false,
       textEnabled5c19:false,
       switchis_comment_enabledf9731:false,
       columnclaim_detail_idcd216:false,
       columnexpense_category71ccd:false,
       columnexpense_description84301:false,
       columnexpense_date2649c:false,
       columnexpense_amount6b94f:false,
       buttonReject74228:false,
       buttonApprove098ea:false,
       textdailyc5d00:false,
       columnclaim_iddc381:false,
       columnexpense_name0195f:false,
       columnclaim_category8e630:false,
       columncategory_total_amount2b381:false,
       columnexpense_date7df86:false,
       columntrs_statuscecb6:false,
       texttext248b4:false,
       columnclaim_idadd32:false,
       columnexpense_name0255e:false,
       columnclaim_category8981c:false,
       columncategory_total_amounta8a33:false,
       columnformatted_date0d1c9:false,
       columntrs_statusf43c9:false,
       textdaily14f95:false,
       columnclaim_id7ec53:false,
       columntrs_created_by1f8f9:false,
       columnexpense_name78eca:false,
       columnclaim_category8466d:false,
       columncategory_total_amount22435:false,
       columnexpense_date20458:false,
       columntrs_status9f4b4:false,
       buttonReject4d3f0:false,
       buttonApprove819e1:false,
       textoffsite_expense46e6c:false,
       columnclaim_id56078:false,
       buttonRejecte566a:false,
       buttonApprove5709e:false,
       columntrs_created_by8053b:false,
       columnexpense_name94440:false,
       columnclaim_category9ec61:false,
       columncategory_total_amount689b8:false,
       columnformatted_date1030f:false,
       columntrs_status759b6:false,
       barchartbar_chart477a2:false,
       piechartpiechart7818e:false,
       groupUser_Grpd6690:false,
       tabledaily_expense_table13758:false,
       tableoffsite_expense_table4ffd6:false,
       grouprequest_daily_group44e40:false,
       groupRequest_Offsite_Group429cb:false,
       tableclaimsdetailtablef8143:false,
       groupmanager_group41477:false,
       tabledaily_expense_table91568:false,
       tableoffsite_expense_table1e924:false,
       groupDaily_Approval_Group69531:false,
       groupoffsite_approval_group8d6cc:false,
       tableclaim_detail_table1835f:false,
       groupgroupc9a87:false,
       tabledaily_user_table76baf:false,
       groupgroupe78de:false,
       tableoffsite_expense_user_table94f29:false,
       groupgrp63e95:false,
       tabledaily_expense_manager_tablee3342:false,
       groupgrpdeda0:false,
       tabletable98ff5:false,
       groupreport_grp0286e:false,
      })

  ////// screen states 
  const [dashboard_for_user_v1,setdashboard_for_user_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [dashboard_for_user_v1Props,setdashboard_for_user_v1Props] = React.useState<any>({})
  const [request_screen_daily_v1,setrequest_screen_daily_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [request_screen_daily_v1Props,setrequest_screen_daily_v1Props] = React.useState<any>({})
  const [request_screen_offsite_v1,setrequest_screen_offsite_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [request_screen_offsite_v1Props,setrequest_screen_offsite_v1Props] = React.useState<any>({})
  const [dashboard_for_manager_v1,setdashboard_for_manager_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [dashboard_for_manager_v1Props,setdashboard_for_manager_v1Props] = React.useState<any>({})
  const [approval_screen_daily_v1,setapproval_screen_daily_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [approval_screen_daily_v1Props,setapproval_screen_daily_v1Props] = React.useState<any>({})
  const [approval_screen_offsite_v1,setapproval_screen_offsite_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [approval_screen_offsite_v1Props,setapproval_screen_offsite_v1Props] = React.useState<any>({})
  const [daily_expense_user_table_v1,setdaily_expense_user_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [daily_expense_user_table_v1Props,setdaily_expense_user_table_v1Props] = React.useState<any>({})
  const [offsite_expense_user_table_v1,setoffsite_expense_user_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [offsite_expense_user_table_v1Props,setoffsite_expense_user_table_v1Props] = React.useState<any>({})
  const [daily_expense_manager_table_v1,setdaily_expense_manager_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [daily_expense_manager_table_v1Props,setdaily_expense_manager_table_v1Props] = React.useState<any>({})
  const [offsite_expense_manager_table_v1,setoffsite_expense_manager_table_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [offsite_expense_manager_table_v1Props,setoffsite_expense_manager_table_v1Props] = React.useState<any>({})
  const [report_v1,setreport_v1] = React.useState<any>({
    _selectedGroup_:"",
    _selectionColor_:"!bg-blue-200",
    __data:[],
    __index:0,
    __currentIndex:0,
    __editIndex:0
    })
  const [report_v1Props,setreport_v1Props] = React.useState<any>({})

///////// dfd
  const [dfd_claims_v1Props,setdfd_claims_v1Props] = React.useState<any>([])
  const [dfd_code_description_v1Props,setdfd_code_description_v1Props] = React.useState<any>([])
  const [dfd_claims_detail_v1Props,setdfd_claims_detail_v1Props] = React.useState<any>([])
  const [dfd_card_data_v1Props,setdfd_card_data_v1Props] = React.useState<any>([])
  const [dfd_claim_table_data_v1Props,setdfd_claim_table_data_v1Props] = React.useState<any>([])
  const [dfd_chart_data_v1Props,setdfd_chart_data_v1Props] = React.useState<any>([])
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
    setapprovedcardc5971(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrejectedcardefafa(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpendingcardee3c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdailyexpenses798bd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsiteexpensescd925(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setaddd126f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsite_add1ab15(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily_expa1e3b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsite_exp949f2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setc_id1095d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category16bdb(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setamountc124c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus3fa4d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdate5e32f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_idb67db(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name1040c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount54e36(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status6f7ad(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setformatted_date7ebf5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily_expensefb8cc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_expense_type22d67(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name5f562(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemailaf076(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date92269(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_categoryf1fb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount9782f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachment04414(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_image6afe2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenabletextb4878(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcommentsf2394(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setiscommentenabled7244d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear14ae7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setsaved507e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsite_expense39c39(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_expense_type51f6e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_namebf755(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemailad8a5(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfrom_datee96b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setto_dateaf8c4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_categoryb2e83(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amounte603b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setattachmentc9c51(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_imageafe30(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenableeff29(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomments65b18(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_comment_enabled5ca5f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclear2b3e6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setadd5cae4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_detail_id97d69(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_category182d4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_descriptiondee64(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_datee47c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_amountb97f7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprovedcard75ed7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrejectedcard0ceee(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpendingcard727e3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdailyexpensese7cda(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsiteexpenses62fe1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily_expa8b25(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffstie_exp400c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcl_id570c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_byae57b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category090da(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settotal_amountc033a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setstatus49843(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date0a4c3(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_id4a599(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_namec8f13(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amountfb61b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status79b0b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setformatted_date46435(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily_expense89868(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name88ccc(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemail74f9a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category46dd0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amountcf2e2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date08e2f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_image3cd01(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcomments9336d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenable666c8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmanager_commentsd309a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_comment_enablede20a4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject28a4c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprove28765(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsite_expense4be82(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name084c7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setemail070ac(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setfrom_dateb920f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setto_date5ca82(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_categoryac401(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amountdd7c0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreceipt_image3a832(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcommentse0ef7(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setmanager_comments4bec2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setenabled5c19(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setis_comment_enabledf9731(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_detail_idcd216(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_category71ccd(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_description84301(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date2649c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_amount6b94f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject74228(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprove098ea(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdailyc5d00(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_iddc381(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name0195f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category8e630(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount2b381(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date7df86(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_statuscecb6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settext248b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_idadd32(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name0255e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category8981c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amounta8a33(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setformatted_date0d1c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_statusf43c9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setdaily14f95(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_id7ec53(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by1f8f9(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name78eca(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category8466d(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount22435(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_date20458(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status9f4b4(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setreject4d3f0(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprove819e1(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setoffsite_expense46e6c(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_id56078(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setrejecte566a(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setapprove5709e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_created_by8053b(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setexpense_name94440(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setclaim_category9ec61(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setcategory_total_amount689b8(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setformatted_date1030f(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    settrs_status759b6(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setbar_chart477a2(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 
    setpiechart7818e(
                          {
                            isDisabled: null,
                            presetValues: '',
                            isHidden: false,
                            refetch:false,
                            refresh:false,
                            trigger: false
                          }) 

        setuser_grpd6690({}) 
    setuser_grpd6690Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "approvedcard",
            "rejectedcard",
            "pendingcard",
            "dailyexpenses",
            "offsiteexpenses",
            "add",
            "offsite_add",
            "daily_exp",
            "offsite_exp",
      ]
      }) 
    
    setdaily_expense_table13758([]) 
    setdaily_expense_table13758Props({
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
    
    setoffsite_expense_table4ffd6([]) 
    setoffsite_expense_table4ffd6Props({
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
        setrequest_daily_group44e40({}) 
    setrequest_daily_group44e40Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "claim_expense_type",
            "expense_name",
            "email",
            "expense_date",
            "claim_category",
            "claim_category",
            "claim_category",
            "category_total_amount",
            "attachment",
            "receipt_image",
            "enabletext",
            "comments",
            "is_comment_enabled",
            "clear",
            "save",
      ]
      }) 
        setrequest_offsite_group429cb({}) 
    setrequest_offsite_group429cbProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
            "claim_expense_type",
            "expense_name",
            "email",
            "from_date",
            "to_date",
            "claim_category",
            "claim_category",
            "claim_category",
            "category_total_amount",
            "attachment",
            "receipt_image",
            "enable",
            "comments",
            "is_comment_enabled",
            "clear",
            "add",
      ]
      }) 
    
    setclaimsdetailtablef8143([]) 
    setclaimsdetailtablef8143Props({
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
        setmanager_group41477({}) 
    setmanager_group41477Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "approvedcard",
            "rejectedcard",
            "pendingcard",
            "dailyexpenses",
            "offsiteexpenses",
            "daily_exp",
            "offstie_exp",
      ]
      }) 
    
    setdaily_expense_table91568([]) 
    setdaily_expense_table91568Props({
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
    
    setoffsite_expense_table1e924([]) 
    setoffsite_expense_table1e924Props({
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
        setdaily_approval_group69531({}) 
    setdaily_approval_group69531Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily_expense",
            "expense_name",
            "email",
            "claim_category",
            "category_total_amount",
            "expense_date",
            "receipt_image",
            "comments",
            "enable",
            "manager_comments",
            "is_comment_enabled",
            "reject",
            "approve",
      ]
      }) 
        setoffsite_approval_group8d6cc({}) 
    setoffsite_approval_group8d6ccProps({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
            "expense_name",
            "email",
            "from_date",
            "to_date",
            "claim_category",
            "category_total_amount",
            "receipt_image",
            "comments",
            "manager_comments",
            "enable",
            "is_comment_enabled",
            "reject",
            "approve",
      ]
      }) 
    
    setclaim_detail_table1835f([]) 
    setclaim_detail_table1835fProps({
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
        setgroupc9a87({}) 
    setgroupc9a87Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily",
      ]
      }) 
    
    setdaily_user_table76baf([]) 
    setdaily_user_table76bafProps({
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
        setgroupe78de({}) 
    setgroupe78deProps({
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
    
    setoffsite_expense_user_table94f29([]) 
    setoffsite_expense_user_table94f29Props({
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
        setgrp63e95({}) 
    setgrp63e95Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "daily",
      ]
      }) 
    
    setdaily_expense_manager_tablee3342([]) 
    setdaily_expense_manager_tablee3342Props({
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
        setgrpdeda0({}) 
    setgrpdeda0Props({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[],
      controls:[
            "offsite_expense",
      ]
      }) 
    
    settable98ff5([]) 
    settable98ff5Props({
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
        setreport_grp0286e({}) 
    setreport_grp0286eProps({
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
            "amount",
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
        user_grpd6690, 
        setuser_grpd6690,
        user_grpd6690Props, 
        setuser_grpd6690Props,
        daily_expense_table13758, 
        setdaily_expense_table13758,
        daily_expense_table13758Props, 
        setdaily_expense_table13758Props,
        offsite_expense_table4ffd6, 
        setoffsite_expense_table4ffd6,
        offsite_expense_table4ffd6Props, 
        setoffsite_expense_table4ffd6Props,
        request_daily_group44e40, 
        setrequest_daily_group44e40,
        request_daily_group44e40Props, 
        setrequest_daily_group44e40Props,
        request_offsite_group429cb, 
        setrequest_offsite_group429cb,
        request_offsite_group429cbProps, 
        setrequest_offsite_group429cbProps,
        claimsdetailtablef8143, 
        setclaimsdetailtablef8143,
        claimsdetailtablef8143Props, 
        setclaimsdetailtablef8143Props,
        manager_group41477, 
        setmanager_group41477,
        manager_group41477Props, 
        setmanager_group41477Props,
        daily_expense_table91568, 
        setdaily_expense_table91568,
        daily_expense_table91568Props, 
        setdaily_expense_table91568Props,
        offsite_expense_table1e924, 
        setoffsite_expense_table1e924,
        offsite_expense_table1e924Props, 
        setoffsite_expense_table1e924Props,
        daily_approval_group69531, 
        setdaily_approval_group69531,
        daily_approval_group69531Props, 
        setdaily_approval_group69531Props,
        offsite_approval_group8d6cc, 
        setoffsite_approval_group8d6cc,
        offsite_approval_group8d6ccProps, 
        setoffsite_approval_group8d6ccProps,
        claim_detail_table1835f, 
        setclaim_detail_table1835f,
        claim_detail_table1835fProps, 
        setclaim_detail_table1835fProps,
        groupc9a87, 
        setgroupc9a87,
        groupc9a87Props, 
        setgroupc9a87Props,
        daily_user_table76baf, 
        setdaily_user_table76baf,
        daily_user_table76bafProps, 
        setdaily_user_table76bafProps,
        groupe78de, 
        setgroupe78de,
        groupe78deProps, 
        setgroupe78deProps,
        offsite_expense_user_table94f29, 
        setoffsite_expense_user_table94f29,
        offsite_expense_user_table94f29Props, 
        setoffsite_expense_user_table94f29Props,
        grp63e95, 
        setgrp63e95,
        grp63e95Props, 
        setgrp63e95Props,
        daily_expense_manager_tablee3342, 
        setdaily_expense_manager_tablee3342,
        daily_expense_manager_tablee3342Props, 
        setdaily_expense_manager_tablee3342Props,
        grpdeda0, 
        setgrpdeda0,
        grpdeda0Props, 
        setgrpdeda0Props,
        table98ff5, 
        settable98ff5,
        table98ff5Props, 
        settable98ff5Props,
        report_grp0286e, 
        setreport_grp0286e,
        report_grp0286eProps, 
        setreport_grp0286eProps,
        approvedcardc5971,
        setapprovedcardc5971, 
        approvedcardc5971Props,
        setapprovedcardc5971Props,
        rejectedcardefafa,
        setrejectedcardefafa, 
        rejectedcardefafaProps,
        setrejectedcardefafaProps,
        pendingcardee3c0,
        setpendingcardee3c0, 
        pendingcardee3c0Props,
        setpendingcardee3c0Props,
        dailyexpenses798bd,
        setdailyexpenses798bd, 
        dailyexpenses798bdProps,
        setdailyexpenses798bdProps,
        offsiteexpensescd925,
        setoffsiteexpensescd925, 
        offsiteexpensescd925Props,
        setoffsiteexpensescd925Props,
        addd126f,
        setaddd126f, 
        addd126fProps,
        setaddd126fProps,
        offsite_add1ab15,
        setoffsite_add1ab15, 
        offsite_add1ab15Props,
        setoffsite_add1ab15Props,
        daily_expa1e3b,
        setdaily_expa1e3b, 
        daily_expa1e3bProps,
        setdaily_expa1e3bProps,
        offsite_exp949f2,
        setoffsite_exp949f2, 
        offsite_exp949f2Props,
        setoffsite_exp949f2Props,
        c_id1095d,
        setc_id1095d, 
        c_id1095dProps,
        setc_id1095dProps,
        claim_category16bdb,
        setclaim_category16bdb, 
        claim_category16bdbProps,
        setclaim_category16bdbProps,
        amountc124c,
        setamountc124c, 
        amountc124cProps,
        setamountc124cProps,
        status3fa4d,
        setstatus3fa4d, 
        status3fa4dProps,
        setstatus3fa4dProps,
        date5e32f,
        setdate5e32f, 
        date5e32fProps,
        setdate5e32fProps,
        claim_idb67db,
        setclaim_idb67db, 
        claim_idb67dbProps,
        setclaim_idb67dbProps,
        expense_name1040c,
        setexpense_name1040c, 
        expense_name1040cProps,
        setexpense_name1040cProps,
        category_total_amount54e36,
        setcategory_total_amount54e36, 
        category_total_amount54e36Props,
        setcategory_total_amount54e36Props,
        trs_status6f7ad,
        settrs_status6f7ad, 
        trs_status6f7adProps,
        settrs_status6f7adProps,
        formatted_date7ebf5,
        setformatted_date7ebf5, 
        formatted_date7ebf5Props,
        setformatted_date7ebf5Props,
        daily_expensefb8cc,
        setdaily_expensefb8cc, 
        daily_expensefb8ccProps,
        setdaily_expensefb8ccProps,
        claim_expense_type22d67,
        setclaim_expense_type22d67, 
        claim_expense_type22d67Props,
        setclaim_expense_type22d67Props,
        expense_name5f562,
        setexpense_name5f562, 
        expense_name5f562Props,
        setexpense_name5f562Props,
        emailaf076,
        setemailaf076, 
        emailaf076Props,
        setemailaf076Props,
        expense_date92269,
        setexpense_date92269, 
        expense_date92269Props,
        setexpense_date92269Props,
        claim_categoryf1fb6,
        setclaim_categoryf1fb6, 
        claim_categoryf1fb6Props,
        setclaim_categoryf1fb6Props,
        category_total_amount9782f,
        setcategory_total_amount9782f, 
        category_total_amount9782fProps,
        setcategory_total_amount9782fProps,
        attachment04414,
        setattachment04414, 
        attachment04414Props,
        setattachment04414Props,
        receipt_image6afe2,
        setreceipt_image6afe2, 
        receipt_image6afe2Props,
        setreceipt_image6afe2Props,
        enabletextb4878,
        setenabletextb4878, 
        enabletextb4878Props,
        setenabletextb4878Props,
        commentsf2394,
        setcommentsf2394, 
        commentsf2394Props,
        setcommentsf2394Props,
        iscommentenabled7244d,
        setiscommentenabled7244d, 
        iscommentenabled7244dProps,
        setiscommentenabled7244dProps,
        clear14ae7,
        setclear14ae7, 
        clear14ae7Props,
        setclear14ae7Props,
        saved507e,
        setsaved507e, 
        saved507eProps,
        setsaved507eProps,
        offsite_expense39c39,
        setoffsite_expense39c39, 
        offsite_expense39c39Props,
        setoffsite_expense39c39Props,
        claim_expense_type51f6e,
        setclaim_expense_type51f6e, 
        claim_expense_type51f6eProps,
        setclaim_expense_type51f6eProps,
        expense_namebf755,
        setexpense_namebf755, 
        expense_namebf755Props,
        setexpense_namebf755Props,
        emailad8a5,
        setemailad8a5, 
        emailad8a5Props,
        setemailad8a5Props,
        from_datee96b6,
        setfrom_datee96b6, 
        from_datee96b6Props,
        setfrom_datee96b6Props,
        to_dateaf8c4,
        setto_dateaf8c4, 
        to_dateaf8c4Props,
        setto_dateaf8c4Props,
        claim_categoryb2e83,
        setclaim_categoryb2e83, 
        claim_categoryb2e83Props,
        setclaim_categoryb2e83Props,
        category_total_amounte603b,
        setcategory_total_amounte603b, 
        category_total_amounte603bProps,
        setcategory_total_amounte603bProps,
        attachmentc9c51,
        setattachmentc9c51, 
        attachmentc9c51Props,
        setattachmentc9c51Props,
        receipt_imageafe30,
        setreceipt_imageafe30, 
        receipt_imageafe30Props,
        setreceipt_imageafe30Props,
        enableeff29,
        setenableeff29, 
        enableeff29Props,
        setenableeff29Props,
        comments65b18,
        setcomments65b18, 
        comments65b18Props,
        setcomments65b18Props,
        is_comment_enabled5ca5f,
        setis_comment_enabled5ca5f, 
        is_comment_enabled5ca5fProps,
        setis_comment_enabled5ca5fProps,
        clear2b3e6,
        setclear2b3e6, 
        clear2b3e6Props,
        setclear2b3e6Props,
        add5cae4,
        setadd5cae4, 
        add5cae4Props,
        setadd5cae4Props,
        claim_detail_id97d69,
        setclaim_detail_id97d69, 
        claim_detail_id97d69Props,
        setclaim_detail_id97d69Props,
        expense_category182d4,
        setexpense_category182d4, 
        expense_category182d4Props,
        setexpense_category182d4Props,
        expense_descriptiondee64,
        setexpense_descriptiondee64, 
        expense_descriptiondee64Props,
        setexpense_descriptiondee64Props,
        expense_datee47c7,
        setexpense_datee47c7, 
        expense_datee47c7Props,
        setexpense_datee47c7Props,
        expense_amountb97f7,
        setexpense_amountb97f7, 
        expense_amountb97f7Props,
        setexpense_amountb97f7Props,
        approvedcard75ed7,
        setapprovedcard75ed7, 
        approvedcard75ed7Props,
        setapprovedcard75ed7Props,
        rejectedcard0ceee,
        setrejectedcard0ceee, 
        rejectedcard0ceeeProps,
        setrejectedcard0ceeeProps,
        pendingcard727e3,
        setpendingcard727e3, 
        pendingcard727e3Props,
        setpendingcard727e3Props,
        dailyexpensese7cda,
        setdailyexpensese7cda, 
        dailyexpensese7cdaProps,
        setdailyexpensese7cdaProps,
        offsiteexpenses62fe1,
        setoffsiteexpenses62fe1, 
        offsiteexpenses62fe1Props,
        setoffsiteexpenses62fe1Props,
        daily_expa8b25,
        setdaily_expa8b25, 
        daily_expa8b25Props,
        setdaily_expa8b25Props,
        offstie_exp400c9,
        setoffstie_exp400c9, 
        offstie_exp400c9Props,
        setoffstie_exp400c9Props,
        cl_id570c3,
        setcl_id570c3, 
        cl_id570c3Props,
        setcl_id570c3Props,
        trs_created_byae57b,
        settrs_created_byae57b, 
        trs_created_byae57bProps,
        settrs_created_byae57bProps,
        claim_category090da,
        setclaim_category090da, 
        claim_category090daProps,
        setclaim_category090daProps,
        total_amountc033a,
        settotal_amountc033a, 
        total_amountc033aProps,
        settotal_amountc033aProps,
        status49843,
        setstatus49843, 
        status49843Props,
        setstatus49843Props,
        expense_date0a4c3,
        setexpense_date0a4c3, 
        expense_date0a4c3Props,
        setexpense_date0a4c3Props,
        claim_id4a599,
        setclaim_id4a599, 
        claim_id4a599Props,
        setclaim_id4a599Props,
        expense_namec8f13,
        setexpense_namec8f13, 
        expense_namec8f13Props,
        setexpense_namec8f13Props,
        category_total_amountfb61b,
        setcategory_total_amountfb61b, 
        category_total_amountfb61bProps,
        setcategory_total_amountfb61bProps,
        trs_status79b0b,
        settrs_status79b0b, 
        trs_status79b0bProps,
        settrs_status79b0bProps,
        formatted_date46435,
        setformatted_date46435, 
        formatted_date46435Props,
        setformatted_date46435Props,
        daily_expense89868,
        setdaily_expense89868, 
        daily_expense89868Props,
        setdaily_expense89868Props,
        expense_name88ccc,
        setexpense_name88ccc, 
        expense_name88cccProps,
        setexpense_name88cccProps,
        email74f9a,
        setemail74f9a, 
        email74f9aProps,
        setemail74f9aProps,
        claim_category46dd0,
        setclaim_category46dd0, 
        claim_category46dd0Props,
        setclaim_category46dd0Props,
        category_total_amountcf2e2,
        setcategory_total_amountcf2e2, 
        category_total_amountcf2e2Props,
        setcategory_total_amountcf2e2Props,
        expense_date08e2f,
        setexpense_date08e2f, 
        expense_date08e2fProps,
        setexpense_date08e2fProps,
        receipt_image3cd01,
        setreceipt_image3cd01, 
        receipt_image3cd01Props,
        setreceipt_image3cd01Props,
        comments9336d,
        setcomments9336d, 
        comments9336dProps,
        setcomments9336dProps,
        enable666c8,
        setenable666c8, 
        enable666c8Props,
        setenable666c8Props,
        manager_commentsd309a,
        setmanager_commentsd309a, 
        manager_commentsd309aProps,
        setmanager_commentsd309aProps,
        is_comment_enablede20a4,
        setis_comment_enablede20a4, 
        is_comment_enablede20a4Props,
        setis_comment_enablede20a4Props,
        reject28a4c,
        setreject28a4c, 
        reject28a4cProps,
        setreject28a4cProps,
        approve28765,
        setapprove28765, 
        approve28765Props,
        setapprove28765Props,
        offsite_expense4be82,
        setoffsite_expense4be82, 
        offsite_expense4be82Props,
        setoffsite_expense4be82Props,
        expense_name084c7,
        setexpense_name084c7, 
        expense_name084c7Props,
        setexpense_name084c7Props,
        email070ac,
        setemail070ac, 
        email070acProps,
        setemail070acProps,
        from_dateb920f,
        setfrom_dateb920f, 
        from_dateb920fProps,
        setfrom_dateb920fProps,
        to_date5ca82,
        setto_date5ca82, 
        to_date5ca82Props,
        setto_date5ca82Props,
        claim_categoryac401,
        setclaim_categoryac401, 
        claim_categoryac401Props,
        setclaim_categoryac401Props,
        category_total_amountdd7c0,
        setcategory_total_amountdd7c0, 
        category_total_amountdd7c0Props,
        setcategory_total_amountdd7c0Props,
        receipt_image3a832,
        setreceipt_image3a832, 
        receipt_image3a832Props,
        setreceipt_image3a832Props,
        commentse0ef7,
        setcommentse0ef7, 
        commentse0ef7Props,
        setcommentse0ef7Props,
        manager_comments4bec2,
        setmanager_comments4bec2, 
        manager_comments4bec2Props,
        setmanager_comments4bec2Props,
        enabled5c19,
        setenabled5c19, 
        enabled5c19Props,
        setenabled5c19Props,
        is_comment_enabledf9731,
        setis_comment_enabledf9731, 
        is_comment_enabledf9731Props,
        setis_comment_enabledf9731Props,
        claim_detail_idcd216,
        setclaim_detail_idcd216, 
        claim_detail_idcd216Props,
        setclaim_detail_idcd216Props,
        expense_category71ccd,
        setexpense_category71ccd, 
        expense_category71ccdProps,
        setexpense_category71ccdProps,
        expense_description84301,
        setexpense_description84301, 
        expense_description84301Props,
        setexpense_description84301Props,
        expense_date2649c,
        setexpense_date2649c, 
        expense_date2649cProps,
        setexpense_date2649cProps,
        expense_amount6b94f,
        setexpense_amount6b94f, 
        expense_amount6b94fProps,
        setexpense_amount6b94fProps,
        reject74228,
        setreject74228, 
        reject74228Props,
        setreject74228Props,
        approve098ea,
        setapprove098ea, 
        approve098eaProps,
        setapprove098eaProps,
        dailyc5d00,
        setdailyc5d00, 
        dailyc5d00Props,
        setdailyc5d00Props,
        claim_iddc381,
        setclaim_iddc381, 
        claim_iddc381Props,
        setclaim_iddc381Props,
        expense_name0195f,
        setexpense_name0195f, 
        expense_name0195fProps,
        setexpense_name0195fProps,
        claim_category8e630,
        setclaim_category8e630, 
        claim_category8e630Props,
        setclaim_category8e630Props,
        category_total_amount2b381,
        setcategory_total_amount2b381, 
        category_total_amount2b381Props,
        setcategory_total_amount2b381Props,
        expense_date7df86,
        setexpense_date7df86, 
        expense_date7df86Props,
        setexpense_date7df86Props,
        trs_statuscecb6,
        settrs_statuscecb6, 
        trs_statuscecb6Props,
        settrs_statuscecb6Props,
        text248b4,
        settext248b4, 
        text248b4Props,
        settext248b4Props,
        claim_idadd32,
        setclaim_idadd32, 
        claim_idadd32Props,
        setclaim_idadd32Props,
        expense_name0255e,
        setexpense_name0255e, 
        expense_name0255eProps,
        setexpense_name0255eProps,
        claim_category8981c,
        setclaim_category8981c, 
        claim_category8981cProps,
        setclaim_category8981cProps,
        category_total_amounta8a33,
        setcategory_total_amounta8a33, 
        category_total_amounta8a33Props,
        setcategory_total_amounta8a33Props,
        formatted_date0d1c9,
        setformatted_date0d1c9, 
        formatted_date0d1c9Props,
        setformatted_date0d1c9Props,
        trs_statusf43c9,
        settrs_statusf43c9, 
        trs_statusf43c9Props,
        settrs_statusf43c9Props,
        daily14f95,
        setdaily14f95, 
        daily14f95Props,
        setdaily14f95Props,
        claim_id7ec53,
        setclaim_id7ec53, 
        claim_id7ec53Props,
        setclaim_id7ec53Props,
        trs_created_by1f8f9,
        settrs_created_by1f8f9, 
        trs_created_by1f8f9Props,
        settrs_created_by1f8f9Props,
        expense_name78eca,
        setexpense_name78eca, 
        expense_name78ecaProps,
        setexpense_name78ecaProps,
        claim_category8466d,
        setclaim_category8466d, 
        claim_category8466dProps,
        setclaim_category8466dProps,
        category_total_amount22435,
        setcategory_total_amount22435, 
        category_total_amount22435Props,
        setcategory_total_amount22435Props,
        expense_date20458,
        setexpense_date20458, 
        expense_date20458Props,
        setexpense_date20458Props,
        trs_status9f4b4,
        settrs_status9f4b4, 
        trs_status9f4b4Props,
        settrs_status9f4b4Props,
        reject4d3f0,
        setreject4d3f0, 
        reject4d3f0Props,
        setreject4d3f0Props,
        approve819e1,
        setapprove819e1, 
        approve819e1Props,
        setapprove819e1Props,
        offsite_expense46e6c,
        setoffsite_expense46e6c, 
        offsite_expense46e6cProps,
        setoffsite_expense46e6cProps,
        claim_id56078,
        setclaim_id56078, 
        claim_id56078Props,
        setclaim_id56078Props,
        rejecte566a,
        setrejecte566a, 
        rejecte566aProps,
        setrejecte566aProps,
        approve5709e,
        setapprove5709e, 
        approve5709eProps,
        setapprove5709eProps,
        trs_created_by8053b,
        settrs_created_by8053b, 
        trs_created_by8053bProps,
        settrs_created_by8053bProps,
        expense_name94440,
        setexpense_name94440, 
        expense_name94440Props,
        setexpense_name94440Props,
        claim_category9ec61,
        setclaim_category9ec61, 
        claim_category9ec61Props,
        setclaim_category9ec61Props,
        category_total_amount689b8,
        setcategory_total_amount689b8, 
        category_total_amount689b8Props,
        setcategory_total_amount689b8Props,
        formatted_date1030f,
        setformatted_date1030f, 
        formatted_date1030fProps,
        setformatted_date1030fProps,
        trs_status759b6,
        settrs_status759b6, 
        trs_status759b6Props,
        settrs_status759b6Props,
        bar_chart477a2,
        setbar_chart477a2, 
        bar_chart477a2Props,
        setbar_chart477a2Props,
        piechart7818e,
        setpiechart7818e, 
        piechart7818eProps,
        setpiechart7818eProps,
        ////// screen states 
          dashboard_for_user_v1,
          setdashboard_for_user_v1,
          dashboard_for_user_v1Props,
          setdashboard_for_user_v1Props,
          request_screen_daily_v1,
          setrequest_screen_daily_v1,
          request_screen_daily_v1Props,
          setrequest_screen_daily_v1Props,
          request_screen_offsite_v1,
          setrequest_screen_offsite_v1,
          request_screen_offsite_v1Props,
          setrequest_screen_offsite_v1Props,
          dashboard_for_manager_v1,
          setdashboard_for_manager_v1,
          dashboard_for_manager_v1Props,
          setdashboard_for_manager_v1Props,
          approval_screen_daily_v1,
          setapproval_screen_daily_v1,
          approval_screen_daily_v1Props,
          setapproval_screen_daily_v1Props,
          approval_screen_offsite_v1,
          setapproval_screen_offsite_v1,
          approval_screen_offsite_v1Props,
          setapproval_screen_offsite_v1Props,
          daily_expense_user_table_v1,
          setdaily_expense_user_table_v1,
          daily_expense_user_table_v1Props,
          setdaily_expense_user_table_v1Props,
          offsite_expense_user_table_v1,
          setoffsite_expense_user_table_v1,
          offsite_expense_user_table_v1Props,
          setoffsite_expense_user_table_v1Props,
          daily_expense_manager_table_v1,
          setdaily_expense_manager_table_v1,
          daily_expense_manager_table_v1Props,
          setdaily_expense_manager_table_v1Props,
          offsite_expense_manager_table_v1,
          setoffsite_expense_manager_table_v1,
          offsite_expense_manager_table_v1Props,
          setoffsite_expense_manager_table_v1Props,
          report_v1,
          setreport_v1,
          report_v1Props,
          setreport_v1Props,
        //////////

        ///////// dfd
        dfd_claims_v1Props,
        setdfd_claims_v1Props,
        dfd_code_description_v1Props,
        setdfd_code_description_v1Props,
        dfd_claims_detail_v1Props,
        setdfd_claims_detail_v1Props,
        dfd_card_data_v1Props,
        setdfd_card_data_v1Props,
        dfd_claim_table_data_v1Props,
        setdfd_claim_table_data_v1Props,
        dfd_chart_data_v1Props,
        setdfd_chart_data_v1Props,
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