'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilecustomWidget   from './customwidgetCodeFilecustomWidget'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {simulator_main_group0541e:simulator_main_group, setsimulator_main_group0541e:setsimulator_main_group}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps:simulator_main_groupProps, setsimulator_main_group0541eProps:setsimulator_main_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732:simulator_tab_group, setsimulator_tab_groupfd732:setsimulator_tab_group}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props:simulator_tab_groupProps, setsimulator_tab_groupfd732Props:setsimulator_tab_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b:op_financial, setop_financial4735b:setop_financial}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps:op_financialProps, setop_financial4735bProps:setop_financialProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a:op_financial_grp, setop_financial_grp8a39a:setop_financial_grp}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps:op_financial_grpProps, setop_financial_grp8a39aProps:setop_financial_grpProps}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op8fcb1:product_code_op, setproduct_code_op8fcb1:setproduct_code_op}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op_financ92df8:product_code_op_financ, setproduct_code_op_financ92df8:setproduct_code_op_financ}= useContext(TotalContext) as TotalContextProps;
  const {message_type_opc2fc6:message_type_op, setmessage_type_opc2fc6:setmessage_type_op}= useContext(TotalContext) as TotalContextProps;
  const {message_type_op_financcbd29:message_type_op_financ, setmessage_type_op_financcbd29:setmessage_type_op_financ}= useContext(TotalContext) as TotalContextProps;
  const {date_op9a41b:date_op, setdate_op9a41b:setdate_op}= useContext(TotalContext) as TotalContextProps;
  const {date_op_fianc516b0:date_op_fianc, setdate_op_fianc516b0:setdate_op_fianc}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op4c851:uuid_op, setuuid_op4c851:setuuid_op}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_financb7282:uuid_op_financ, setuuid_op_financb7282:setuuid_op_financ}= useContext(TotalContext) as TotalContextProps;
  const {status_op98685:status_op, setstatus_op98685:setstatus_op}= useContext(TotalContext) as TotalContextProps;
  const {status_op_financc8de7:status_op_financ, setstatus_op_financc8de7:setstatus_op_financ}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason_op5ba8d:reject_reason_op, setreject_reason_op5ba8d:setreject_reason_op}= useContext(TotalContext) as TotalContextProps;
  const {rej_reasn_op_financ13f05:rej_reasn_op_financ, setrej_reasn_op_financ13f05:setrej_reasn_op_financ}= useContext(TotalContext) as TotalContextProps;
  const {submit_opcf1e2:submit_op, setsubmit_opcf1e2:setsubmit_op}= useContext(TotalContext) as TotalContextProps;
  const {customwidget0c844:customwidget, setcustomwidget0c844:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b:op_settlement, setop_settlemente399b:setop_settlement}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps:op_settlementProps, setop_settlemente399bProps:setop_settlementProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d:op_settlement_grp, setop_settlement_grpb706d:setop_settlement_grp}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps:op_settlement_grpProps, setop_settlement_grpb706dProps:setop_settlement_grpProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005:ip_financial, setip_financial66005:setip_financial}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005Props:ip_financialProps, setip_financial66005Props:setip_financialProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c:ip_debtor_dtls, setip_debtor_dtls8143c:setip_debtor_dtls}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps:ip_debtor_dtlsProps, setip_debtor_dtls8143cProps:setip_debtor_dtlsProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4:ip_creditor_dtls, setip_creditor_dtls1ade4:setip_creditor_dtls}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props:ip_creditor_dtlsProps, setip_creditor_dtls1ade4Props:setip_creditor_dtlsProps}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132:payment_dtls, setpayment_dtls30132:setpayment_dtls}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props:payment_dtlsProps, setpayment_dtls30132Props:setpayment_dtlsProps}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014:addionl_info, setaddionl_info43014:setaddionl_info}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props:addionl_infoProps, setaddionl_info43014Props:setaddionl_infoProps}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7:button_grp, setbutton_grp7b9b7:setbutton_grp}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props:button_grpProps, setbutton_grp7b9b7Props:setbutton_grpProps}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `6 / 7`,gridRow: `59 / 64`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilecustomWidget 
  simulator_main_group={ simulator_main_group}
  setsimulator_main_group={setsimulator_main_group}
  simulator_main_groupProps={ simulator_main_groupProps}
  setsimulator_main_groupProps={setsimulator_main_groupProps}
  simulator_tab_group={ simulator_tab_group}
  setsimulator_tab_group={setsimulator_tab_group}
  simulator_tab_groupProps={ simulator_tab_groupProps}
  setsimulator_tab_groupProps={setsimulator_tab_groupProps}
  op_financial={ op_financial}
  setop_financial={setop_financial}
  op_financialProps={ op_financialProps}
  setop_financialProps={setop_financialProps}
  op_financial_grp={ op_financial_grp}
  setop_financial_grp={setop_financial_grp}
  op_financial_grpProps={ op_financial_grpProps}
  setop_financial_grpProps={setop_financial_grpProps}
  product_code_op={ product_code_op}
  setproduct_code_op={setproduct_code_op}
  product_code_op_financ={ product_code_op_financ}
  setproduct_code_op_financ={setproduct_code_op_financ}
  message_type_op={ message_type_op}
  setmessage_type_op={setmessage_type_op}
  message_type_op_financ={ message_type_op_financ}
  setmessage_type_op_financ={setmessage_type_op_financ}
  date_op={ date_op}
  setdate_op={setdate_op}
  date_op_fianc={ date_op_fianc}
  setdate_op_fianc={setdate_op_fianc}
  uuid_op={ uuid_op}
  setuuid_op={setuuid_op}
  uuid_op_financ={ uuid_op_financ}
  setuuid_op_financ={setuuid_op_financ}
  status_op={ status_op}
  setstatus_op={setstatus_op}
  status_op_financ={ status_op_financ}
  setstatus_op_financ={setstatus_op_financ}
  reject_reason_op={ reject_reason_op}
  setreject_reason_op={setreject_reason_op}
  rej_reasn_op_financ={ rej_reasn_op_financ}
  setrej_reasn_op_financ={setrej_reasn_op_financ}
  submit_op={ submit_op}
  setsubmit_op={setsubmit_op}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
  op_settlement={ op_settlement}
  setop_settlement={setop_settlement}
  op_settlementProps={ op_settlementProps}
  setop_settlementProps={setop_settlementProps}
  op_settlement_grp={ op_settlement_grp}
  setop_settlement_grp={setop_settlement_grp}
  op_settlement_grpProps={ op_settlement_grpProps}
  setop_settlement_grpProps={setop_settlement_grpProps}
  ip_financial={ ip_financial}
  setip_financial={setip_financial}
  ip_financialProps={ ip_financialProps}
  setip_financialProps={setip_financialProps}
  ip_debtor_dtls={ ip_debtor_dtls}
  setip_debtor_dtls={setip_debtor_dtls}
  ip_debtor_dtlsProps={ ip_debtor_dtlsProps}
  setip_debtor_dtlsProps={setip_debtor_dtlsProps}
  ip_creditor_dtls={ ip_creditor_dtls}
  setip_creditor_dtls={setip_creditor_dtls}
  ip_creditor_dtlsProps={ ip_creditor_dtlsProps}
  setip_creditor_dtlsProps={setip_creditor_dtlsProps}
  payment_dtls={ payment_dtls}
  setpayment_dtls={setpayment_dtls}
  payment_dtlsProps={ payment_dtlsProps}
  setpayment_dtlsProps={setpayment_dtlsProps}
  addionl_info={ addionl_info}
  setaddionl_info={setaddionl_info}
  addionl_infoProps={ addionl_infoProps}
  setaddionl_infoProps={setaddionl_infoProps}
  button_grp={ button_grp}
  setbutton_grp={setbutton_grp}
  button_grpProps={ button_grpProps}
  setbutton_grpProps={setbutton_grpProps}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
