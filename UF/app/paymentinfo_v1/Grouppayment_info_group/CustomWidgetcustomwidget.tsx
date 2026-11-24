'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFileManual_initiation   from './customwidgetCodeFileManual_initiation'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {payment_info_group1bac9:payment_info_group, setpayment_info_group1bac9:setpayment_info_group}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props:payment_info_groupProps, setpayment_info_group1bac9Props:setpayment_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_text_label47b13:payment_info_text_label, setpayment_info_text_label47b13:setpayment_info_text_label}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d:midynamicactions, setmidynamicactions3b39d:setmidynamicactions}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps:midynamicactionsProps, setmidynamicactions3b39dProps:setmidynamicactionsProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6:general_info_group, setgeneral_info_groupc83e6:setgeneral_info_group}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props:general_info_groupProps, setgeneral_info_groupc83e6Props:setgeneral_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea:dbtr_info_group, setdbtr_info_group4e8ea:setdbtr_info_group}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps:dbtr_info_groupProps, setdbtr_info_group4e8eaProps:setdbtr_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8:cr_info_group, setcr_info_groupb01e8:setcr_info_group}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props:cr_info_groupProps, setcr_info_groupb01e8Props:setcr_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0:chrg_info_group, setchrg_info_group76ab0:setchrg_info_group}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props:chrg_info_groupProps, setchrg_info_group76ab0Props:setchrg_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6:add_info_group, setadd_info_groupe8dc6:setadd_info_group}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props:add_info_groupProps, setadd_info_groupe8dc6Props:setadd_info_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidget02697:customwidget, setcustomwidget02697:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `1 / 6`,gridRow: `195 / 197`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFileManual_initiation 
  payment_info_group={ payment_info_group}
  setpayment_info_group={setpayment_info_group}
  payment_info_groupProps={ payment_info_groupProps}
  setpayment_info_groupProps={setpayment_info_groupProps}
  payment_info_text_label={ payment_info_text_label}
  setpayment_info_text_label={setpayment_info_text_label}
  midynamicactions={ midynamicactions}
  setmidynamicactions={setmidynamicactions}
  midynamicactionsProps={ midynamicactionsProps}
  setmidynamicactionsProps={setmidynamicactionsProps}
  general_info_group={ general_info_group}
  setgeneral_info_group={setgeneral_info_group}
  general_info_groupProps={ general_info_groupProps}
  setgeneral_info_groupProps={setgeneral_info_groupProps}
  dbtr_info_group={ dbtr_info_group}
  setdbtr_info_group={setdbtr_info_group}
  dbtr_info_groupProps={ dbtr_info_groupProps}
  setdbtr_info_groupProps={setdbtr_info_groupProps}
  cr_info_group={ cr_info_group}
  setcr_info_group={setcr_info_group}
  cr_info_groupProps={ cr_info_groupProps}
  setcr_info_groupProps={setcr_info_groupProps}
  chrg_info_group={ chrg_info_group}
  setchrg_info_group={setchrg_info_group}
  chrg_info_groupProps={ chrg_info_groupProps}
  setchrg_info_groupProps={setchrg_info_groupProps}
  add_info_group={ add_info_group}
  setadd_info_group={setadd_info_group}
  add_info_groupProps={ add_info_groupProps}
  setadd_info_groupProps={setadd_info_groupProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
