'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilecw_initiate_authorize   from './cw_tab_initiate_authorizeCodeFilecw_initiate_authorize'   
     
//////////


const CustomWidgetcw_tab_initiate_authorize = ({encryptionFlagCompData,controlData}:any) => {
  const {grp_wpsb96c6:grp_wps, setgrp_wpsb96c6:setgrp_wps}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsb96c6Props:grp_wpsProps, setgrp_wpsb96c6Props:setgrp_wpsProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127:grp_eob, setgrp_eobed127:setgrp_eob}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127Props:grp_eobProps, setgrp_eobed127Props:setgrp_eobProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03:grp_return_refund, setgrp_return_refundc4a03:setgrp_return_refund}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03Props:grp_return_refundProps, setgrp_return_refundc4a03Props:setgrp_return_refundProps}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7:tabgroup_return_refund, settabgroup_return_refund4e9b7:settabgroup_return_refund}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7Props:tabgroup_return_refundProps, settabgroup_return_refund4e9b7Props:settabgroup_return_refundProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327:tab_header_return_frm_agent, settab_header_return_frm_agent2d327:settab_header_return_frm_agent}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327Props:tab_header_return_frm_agentProps, settab_header_return_frm_agent2d327Props:settab_header_return_frm_agentProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6:grp_retun_ref, setgrp_retun_ref3e6e6:setgrp_retun_ref}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6Props:grp_retun_refProps, setgrp_retun_ref3e6e6Props:setgrp_retun_refProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636:tbl_return_fie_list, settbl_return_fie_list8f636:settbl_return_fie_list}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636Props:tbl_return_fie_listProps, settbl_return_fie_list8f636Props:settbl_return_fie_listProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2:tab_header_req_for_refund, settab_header_req_for_refundeadd2:settab_header_req_for_refund}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2Props:tab_header_req_for_refundProps, settab_header_req_for_refundeadd2Props:settab_header_req_for_refundProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d:grp_rr_retun_ref, setgrp_rr_retun_ref5362d:setgrp_rr_retun_ref}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362dProps:grp_rr_retun_refProps, setgrp_rr_retun_ref5362dProps:setgrp_rr_retun_refProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a:tbl_rr_req_for_refund, settbl_rr_req_for_refunde2c9a:settbl_rr_req_for_refund}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9aProps:tbl_rr_req_for_refundProps, settbl_rr_req_for_refunde2c9aProps:settbl_rr_req_for_refundProps}= useContext(TotalContext) as TotalContextProps;
  const {cw_tab_initiate_authorize1fdcd:cw_tab_initiate_authorize, setcw_tab_initiate_authorize1fdcd:setcw_tab_initiate_authorize}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `6 / 8`,gridRow: `141 / 145`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilecw_initiate_authorize 
  grp_wps={ grp_wps}
  setgrp_wps={setgrp_wps}
  grp_wpsProps={ grp_wpsProps}
  setgrp_wpsProps={setgrp_wpsProps}
  grp_eob={ grp_eob}
  setgrp_eob={setgrp_eob}
  grp_eobProps={ grp_eobProps}
  setgrp_eobProps={setgrp_eobProps}
  grp_return_refund={ grp_return_refund}
  setgrp_return_refund={setgrp_return_refund}
  grp_return_refundProps={ grp_return_refundProps}
  setgrp_return_refundProps={setgrp_return_refundProps}
  tabgroup_return_refund={ tabgroup_return_refund}
  settabgroup_return_refund={settabgroup_return_refund}
  tabgroup_return_refundProps={ tabgroup_return_refundProps}
  settabgroup_return_refundProps={settabgroup_return_refundProps}
  tab_header_return_frm_agent={ tab_header_return_frm_agent}
  settab_header_return_frm_agent={settab_header_return_frm_agent}
  tab_header_return_frm_agentProps={ tab_header_return_frm_agentProps}
  settab_header_return_frm_agentProps={settab_header_return_frm_agentProps}
  grp_retun_ref={ grp_retun_ref}
  setgrp_retun_ref={setgrp_retun_ref}
  grp_retun_refProps={ grp_retun_refProps}
  setgrp_retun_refProps={setgrp_retun_refProps}
  tbl_return_fie_list={ tbl_return_fie_list}
  settbl_return_fie_list={settbl_return_fie_list}
  tbl_return_fie_listProps={ tbl_return_fie_listProps}
  settbl_return_fie_listProps={settbl_return_fie_listProps}
  tab_header_req_for_refund={ tab_header_req_for_refund}
  settab_header_req_for_refund={settab_header_req_for_refund}
  tab_header_req_for_refundProps={ tab_header_req_for_refundProps}
  settab_header_req_for_refundProps={settab_header_req_for_refundProps}
  grp_rr_retun_ref={ grp_rr_retun_ref}
  setgrp_rr_retun_ref={setgrp_rr_retun_ref}
  grp_rr_retun_refProps={ grp_rr_retun_refProps}
  setgrp_rr_retun_refProps={setgrp_rr_retun_refProps}
  tbl_rr_req_for_refund={ tbl_rr_req_for_refund}
  settbl_rr_req_for_refund={settbl_rr_req_for_refund}
  tbl_rr_req_for_refundProps={ tbl_rr_req_for_refundProps}
  settbl_rr_req_for_refundProps={settbl_rr_req_for_refundProps}
  cw_tab_initiate_authorize={ cw_tab_initiate_authorize}
  setcw_tab_initiate_authorize={setcw_tab_initiate_authorize}
      />
    </div>
  )
}

export default CustomWidgetcw_tab_initiate_authorize ;
