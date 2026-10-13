'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilecw_btn_show_hide   from './customwidgetCodeFilecw_btn_show_hide'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {journey_details_group764b7:journey_details_group, setjourney_details_group764b7:setjourney_details_group}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props:journey_details_groupProps, setjourney_details_group764b7Props:setjourney_details_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {details_labelaa81c:details_label, setdetails_labelaa81c:setdetails_label}= useContext(TotalContext) as TotalContextProps;
  const {divider_topb49bf:divider_top, setdivider_topb49bf:setdivider_top}= useContext(TotalContext) as TotalContextProps;
  const {l_file_name7a6bd:l_file_name, setl_file_name7a6bd:setl_file_name}= useContext(TotalContext) as TotalContextProps;
  const {l_emp_mol8c2e1:l_emp_mol, setl_emp_mol8c2e1:setl_emp_mol}= useContext(TotalContext) as TotalContextProps;
  const {file_nameebc26:file_name, setfile_nameebc26:setfile_name}= useContext(TotalContext) as TotalContextProps;
  const {empl_mold6666:empl_mol, setempl_mold6666:setempl_mol}= useContext(TotalContext) as TotalContextProps;
  const {l_fixed_amont9c6be:l_fixed_amont, setl_fixed_amont9c6be:setl_fixed_amont}= useContext(TotalContext) as TotalContextProps;
  const {l_variable_amount98c92:l_variable_amount, setl_variable_amount98c92:setl_variable_amount}= useContext(TotalContext) as TotalContextProps;
  const {fixed_amot7ca4c:fixed_amot, setfixed_amot7ca4c:setfixed_amot}= useContext(TotalContext) as TotalContextProps;
  const {var_amontdd609:var_amont, setvar_amontdd609:setvar_amont}= useContext(TotalContext) as TotalContextProps;
  const {l_charge_amount53cd9:l_charge_amount, setl_charge_amount53cd9:setl_charge_amount}= useContext(TotalContext) as TotalContextProps;
  const {l_agent_routing_code9af99:l_agent_routing_code, setl_agent_routing_code9af99:setl_agent_routing_code}= useContext(TotalContext) as TotalContextProps;
  const {charge_amnt64cb4:charge_amnt, setcharge_amnt64cb4:setcharge_amnt}= useContext(TotalContext) as TotalContextProps;
  const {agent_routng_codee5a1e:agent_routng_code, setagent_routng_codee5a1e:setagent_routng_code}= useContext(TotalContext) as TotalContextProps;
  const {l_processing_system553cb:l_processing_system, setl_processing_system553cb:setl_processing_system}= useContext(TotalContext) as TotalContextProps;
  const {l_tran_categoryaa4a1:l_tran_category, setl_tran_categoryaa4a1:setl_tran_category}= useContext(TotalContext) as TotalContextProps;
  const {process_system9b66e:process_system, setprocess_system9b66e:setprocess_system}= useContext(TotalContext) as TotalContextProps;
  const {tran_catey46647:tran_catey, settran_catey46647:settran_catey}= useContext(TotalContext) as TotalContextProps;
  const {divider_bottom02761:divider_bottom, setdivider_bottom02761:setdivider_bottom}= useContext(TotalContext) as TotalContextProps;
  const {view_msg_data_btn2563b:view_msg_data_btn, setview_msg_data_btn2563b:setview_msg_data_btn}= useContext(TotalContext) as TotalContextProps;
  const {view_tran_log_btn00416:view_tran_log_btn, setview_tran_log_btn00416:setview_tran_log_btn}= useContext(TotalContext) as TotalContextProps;
  const {customwidget84bb0:customwidget, setcustomwidget84bb0:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `8 / 9`,gridRow: `91 / 93`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilecw_btn_show_hide 
  journey_details_group={ journey_details_group}
  setjourney_details_group={setjourney_details_group}
  journey_details_groupProps={ journey_details_groupProps}
  setjourney_details_groupProps={setjourney_details_groupProps}
  details_label={ details_label}
  setdetails_label={setdetails_label}
  divider_top={ divider_top}
  setdivider_top={setdivider_top}
  l_file_name={ l_file_name}
  setl_file_name={setl_file_name}
  l_emp_mol={ l_emp_mol}
  setl_emp_mol={setl_emp_mol}
  file_name={ file_name}
  setfile_name={setfile_name}
  empl_mol={ empl_mol}
  setempl_mol={setempl_mol}
  l_fixed_amont={ l_fixed_amont}
  setl_fixed_amont={setl_fixed_amont}
  l_variable_amount={ l_variable_amount}
  setl_variable_amount={setl_variable_amount}
  fixed_amot={ fixed_amot}
  setfixed_amot={setfixed_amot}
  var_amont={ var_amont}
  setvar_amont={setvar_amont}
  l_charge_amount={ l_charge_amount}
  setl_charge_amount={setl_charge_amount}
  l_agent_routing_code={ l_agent_routing_code}
  setl_agent_routing_code={setl_agent_routing_code}
  charge_amnt={ charge_amnt}
  setcharge_amnt={setcharge_amnt}
  agent_routng_code={ agent_routng_code}
  setagent_routng_code={setagent_routng_code}
  l_processing_system={ l_processing_system}
  setl_processing_system={setl_processing_system}
  l_tran_category={ l_tran_category}
  setl_tran_category={setl_tran_category}
  process_system={ process_system}
  setprocess_system={setprocess_system}
  tran_catey={ tran_catey}
  settran_catey={settran_catey}
  divider_bottom={ divider_bottom}
  setdivider_bottom={setdivider_bottom}
  view_msg_data_btn={ view_msg_data_btn}
  setview_msg_data_btn={setview_msg_data_btn}
  view_tran_log_btn={ view_tran_log_btn}
  setview_tran_log_btn={setview_tran_log_btn}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
