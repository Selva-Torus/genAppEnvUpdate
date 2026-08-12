'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilecustomcode   from './customwidgetCodeFilecustomcode'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {add_case_groupeb161:add_case_group, setadd_case_groupeb161:setadd_case_group}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props:add_case_groupProps, setadd_case_groupeb161Props:setadd_case_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f:header_group, setheader_group4878f:setheader_group}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps:header_groupProps, setheader_group4878fProps:setheader_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3:dynamicactions, setdynamicactions094c3:setdynamicactions}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props:dynamicactionsProps, setdynamicactions094c3Props:setdynamicactionsProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_id0c4bb:venue_id, setvenue_id0c4bb:setvenue_id}= useContext(TotalContext) as TotalContextProps;
  const {creditor_idf6f71:creditor_id, setcreditor_idf6f71:setcreditor_id}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f:case_information_group, setcase_information_group28f6f:setcase_information_group}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps:case_information_groupProps, setcase_information_group28f6fProps:setcase_information_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d:venue_group, setvenue_group6a36d:setvenue_group}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps:venue_groupProps, setvenue_group6a36dProps:setvenue_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18:georgia_group, setgeorgia_group0fa18:setgeorgia_group}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18Props:georgia_groupProps, setgeorgia_group0fa18Props:setgeorgia_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd:georgias_group, setgeorgias_group945fd:setgeorgias_group}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fdProps:georgias_groupProps, setgeorgias_group945fdProps:setgeorgias_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f:georgias_groups, setgeorgias_groups6f85f:setgeorgias_groups}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85fProps:georgias_groupsProps, setgeorgias_groups6f85fProps:setgeorgias_groupsProps}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87:georgiass_groups, setgeorgiass_groups86a87:setgeorgiass_groups}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87Props:georgiass_groupsProps, setgeorgiass_groups86a87Props:setgeorgiass_groupsProps}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a:georgsiass_groups, setgeorgsiass_groupsb044a:setgeorgsiass_groups}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044aProps:georgsiass_groupsProps, setgeorgsiass_groupsb044aProps:setgeorgsiass_groupsProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70:debtor_information_group, setdebtor_information_group78a70:setdebtor_information_group}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props:debtor_information_groupProps, setdebtor_information_group78a70Props:setdebtor_information_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47:financial_details_group, setfinancial_details_group52f47:setfinancial_details_group}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props:financial_details_groupProps, setfinancial_details_group52f47Props:setfinancial_details_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6:venue_details_group, setvenue_details_group17ac6:setvenue_details_group}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props:venue_details_groupProps, setvenue_details_group17ac6Props:setvenue_details_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92:required_dociument_main_group, setrequired_dociument_main_group04e92:setrequired_dociument_main_group}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props:required_dociument_main_groupProps, setrequired_dociument_main_group04e92Props:setrequired_dociument_main_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8:required_dociument_header_group, setrequired_dociument_header_groupe39c8:setrequired_dociument_header_group}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props:required_dociument_header_groupProps, setrequired_dociument_header_groupe39c8Props:setrequired_dociument_header_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa:doc_type_table, setdoc_type_tablebe9fa:setdoc_type_table}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps:doc_type_tableProps, setdoc_type_tablebe9faProps:setdoc_type_tableProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetd1a34:customwidget, setcustomwidgetd1a34:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  const {account_id7e64e:account_id, setaccount_id7e64e:setaccount_id}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b:checklist_main_group, setchecklist_main_group0df6b:setchecklist_main_group}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps:checklist_main_groupProps, setchecklist_main_group0df6bProps:setchecklist_main_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d:checklist_group, setchecklist_group32b3d:setchecklist_group}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps:checklist_groupProps, setchecklist_group32b3dProps:setchecklist_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1:checklist_table, setchecklist_table198e1:setchecklist_table}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props:checklist_tableProps, setchecklist_table198e1Props:setchecklist_tableProps}= useContext(TotalContext) as TotalContextProps;
  const {remarks_textareadc753:remarks_textarea, setremarks_textareadc753:setremarks_textarea}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `17 / 25`,gridRow: `318 / 341`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilecustomcode 
  add_case_group={ add_case_group}
  setadd_case_group={setadd_case_group}
  add_case_groupProps={ add_case_groupProps}
  setadd_case_groupProps={setadd_case_groupProps}
  header_group={ header_group}
  setheader_group={setheader_group}
  header_groupProps={ header_groupProps}
  setheader_groupProps={setheader_groupProps}
  dynamicactions={ dynamicactions}
  setdynamicactions={setdynamicactions}
  dynamicactionsProps={ dynamicactionsProps}
  setdynamicactionsProps={setdynamicactionsProps}
  venue_id={ venue_id}
  setvenue_id={setvenue_id}
  creditor_id={ creditor_id}
  setcreditor_id={setcreditor_id}
  case_information_group={ case_information_group}
  setcase_information_group={setcase_information_group}
  case_information_groupProps={ case_information_groupProps}
  setcase_information_groupProps={setcase_information_groupProps}
  venue_group={ venue_group}
  setvenue_group={setvenue_group}
  venue_groupProps={ venue_groupProps}
  setvenue_groupProps={setvenue_groupProps}
  georgia_group={ georgia_group}
  setgeorgia_group={setgeorgia_group}
  georgia_groupProps={ georgia_groupProps}
  setgeorgia_groupProps={setgeorgia_groupProps}
  georgias_group={ georgias_group}
  setgeorgias_group={setgeorgias_group}
  georgias_groupProps={ georgias_groupProps}
  setgeorgias_groupProps={setgeorgias_groupProps}
  georgias_groups={ georgias_groups}
  setgeorgias_groups={setgeorgias_groups}
  georgias_groupsProps={ georgias_groupsProps}
  setgeorgias_groupsProps={setgeorgias_groupsProps}
  georgiass_groups={ georgiass_groups}
  setgeorgiass_groups={setgeorgiass_groups}
  georgiass_groupsProps={ georgiass_groupsProps}
  setgeorgiass_groupsProps={setgeorgiass_groupsProps}
  georgsiass_groups={ georgsiass_groups}
  setgeorgsiass_groups={setgeorgsiass_groups}
  georgsiass_groupsProps={ georgsiass_groupsProps}
  setgeorgsiass_groupsProps={setgeorgsiass_groupsProps}
  debtor_information_group={ debtor_information_group}
  setdebtor_information_group={setdebtor_information_group}
  debtor_information_groupProps={ debtor_information_groupProps}
  setdebtor_information_groupProps={setdebtor_information_groupProps}
  financial_details_group={ financial_details_group}
  setfinancial_details_group={setfinancial_details_group}
  financial_details_groupProps={ financial_details_groupProps}
  setfinancial_details_groupProps={setfinancial_details_groupProps}
  venue_details_group={ venue_details_group}
  setvenue_details_group={setvenue_details_group}
  venue_details_groupProps={ venue_details_groupProps}
  setvenue_details_groupProps={setvenue_details_groupProps}
  required_dociument_main_group={ required_dociument_main_group}
  setrequired_dociument_main_group={setrequired_dociument_main_group}
  required_dociument_main_groupProps={ required_dociument_main_groupProps}
  setrequired_dociument_main_groupProps={setrequired_dociument_main_groupProps}
  required_dociument_header_group={ required_dociument_header_group}
  setrequired_dociument_header_group={setrequired_dociument_header_group}
  required_dociument_header_groupProps={ required_dociument_header_groupProps}
  setrequired_dociument_header_groupProps={setrequired_dociument_header_groupProps}
  doc_type_table={ doc_type_table}
  setdoc_type_table={setdoc_type_table}
  doc_type_tableProps={ doc_type_tableProps}
  setdoc_type_tableProps={setdoc_type_tableProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
  account_id={ account_id}
  setaccount_id={setaccount_id}
  checklist_main_group={ checklist_main_group}
  setchecklist_main_group={setchecklist_main_group}
  checklist_main_groupProps={ checklist_main_groupProps}
  setchecklist_main_groupProps={setchecklist_main_groupProps}
  checklist_group={ checklist_group}
  setchecklist_group={setchecklist_group}
  checklist_groupProps={ checklist_groupProps}
  setchecklist_groupProps={setchecklist_groupProps}
  checklist_table={ checklist_table}
  setchecklist_table={setchecklist_table}
  checklist_tableProps={ checklist_tableProps}
  setchecklist_tableProps={setchecklist_tableProps}
  remarks_textarea={ remarks_textarea}
  setremarks_textarea={setremarks_textarea}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
