'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilelogicCalculation   from './customwidgetCodeFilelogicCalculation'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {overallgroup1218f:overallgroup, setoverallgroup1218f:setoverallgroup}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup1218fProps:overallgroupProps, setoverallgroup1218fProps:setoverallgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48:controlgroup, setcontrolgroupfbb48:setcontrolgroup}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48Props:controlgroupProps, setcontrolgroupfbb48Props:setcontrolgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ff:control_tab_group, setcontrol_tab_group161ff:setcontrol_tab_group}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ffProps:control_tab_groupProps, setcontrol_tab_group161ffProps:setcontrol_tab_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855:button_group, setbutton_groupb9855:setbutton_group}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855Props:button_groupProps, setbutton_groupb9855Props:setbutton_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957a:rtgs_info, setrtgs_info5957a:setrtgs_info}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957aProps:rtgs_infoProps, setrtgs_info5957aProps:setrtgs_infoProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72:allcontrols, setallcontrolsb8c72:setallcontrols}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72Props:allcontrolsProps, setallcontrolsb8c72Props:setallcontrolsProps}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7eda:commoninfo, setcommoninfod7eda:setcommoninfo}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7edaProps:commoninfoProps, setcommoninfod7edaProps:setcommoninfoProps}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0a:basicinfo, setbasicinfoffb0a:setbasicinfo}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0aProps:basicinfoProps, setbasicinfoffb0aProps:setbasicinfoProps}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4baba:additionalinfo, setadditionalinfo4baba:setadditionalinfo}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4babaProps:additionalinfoProps, setadditionalinfo4babaProps:setadditionalinfoProps}= useContext(TotalContext) as TotalContextProps;
  const {addtional_infof3fad:addtional_info, setaddtional_infof3fad:setaddtional_info}= useContext(TotalContext) as TotalContextProps;
  const {signature_screened28f:signature_screen, setsignature_screened28f:setsignature_screen}= useContext(TotalContext) as TotalContextProps;
  const {remittance_info0bded:remittance_info, setremittance_info0bded:setremittance_info}= useContext(TotalContext) as TotalContextProps;
  const {customwidget339ed:customwidget, setcustomwidget339ed:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  const {vgphstm_uuidf9485:vgphstm_uuid, setvgphstm_uuidf9485:setvgphstm_uuid}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7c:listgroup, setlistgroup97a7c:setlistgroup}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7cProps:listgroupProps, setlistgroup97a7cProps:setlistgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782e:list_tab_group, setlist_tab_group6782e:setlist_tab_group}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782eProps:list_tab_groupProps, setlist_tab_group6782eProps:setlist_tab_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09d:validation_list, setvalidation_listcc09d:setvalidation_list}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09dProps:validation_listProps, setvalidation_listcc09dProps:setvalidation_listProps}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84:valdnlisttable, setvaldnlisttable4db84:setvaldnlisttable}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84Props:valdnlisttableProps, setvaldnlisttable4db84Props:setvaldnlisttableProps}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158b:comment_list, setcomment_listb158b:setcomment_list}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158bProps:comment_listProps, setcomment_listb158bProps:setcomment_listProps}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834:cmntlisttable, setcmntlisttable96834:setcmntlisttable}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834Props:cmntlisttableProps, setcmntlisttable96834Props:setcmntlisttableProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6:rtgs_list, setrtgs_listf12c6:setrtgs_list}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6Props:rtgs_listProps, setrtgs_listf12c6Props:setrtgs_listProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfc:rtgs_list_grp, setrtgs_list_grp82cfc:setrtgs_list_grp}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfcProps:rtgs_list_grpProps, setrtgs_list_grp82cfcProps:setrtgs_list_grpProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5:rtgs_list_tble_group, setrtgs_list_tble_groupe1ac5:setrtgs_list_tble_group}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5Props:rtgs_list_tble_groupProps, setrtgs_list_tble_groupe1ac5Props:setrtgs_list_tble_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7:rtgs_list_table, setrtgs_list_tablead2c7:setrtgs_list_table}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7Props:rtgs_list_tableProps, setrtgs_list_tablead2c7Props:setrtgs_list_tableProps}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aa:group, setgroup1b1aa:setgroup}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aaProps:groupProps, setgroup1b1aaProps:setgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579:rtgs_list_tab_grp, setrtgs_list_tab_grp43579:setrtgs_list_tab_grp}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579Props:rtgs_list_tab_grpProps, setrtgs_list_tab_grp43579Props:setrtgs_list_tab_grpProps}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1:validtn_list, setvalidtn_list3a9a1:setvalidtn_list}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1Props:validtn_listProps, setvalidtn_list3a9a1Props:setvalidtn_listProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755:rtgs_list_validtn_table, setrtgs_list_validtn_table10755:setrtgs_list_validtn_table}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755Props:rtgs_list_validtn_tableProps, setrtgs_list_validtn_table10755Props:setrtgs_list_validtn_tableProps}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3b:cmnt_list, setcmnt_list18a3b:setcmnt_list}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3bProps:cmnt_listProps, setcmnt_list18a3bProps:setcmnt_listProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130:rtgs_list_cmnts_list, setrtgs_list_cmnts_list85130:setrtgs_list_cmnts_list}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130Props:rtgs_list_cmnts_listProps, setrtgs_list_cmnts_list85130Props:setrtgs_list_cmnts_listProps}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `13 / 17`,gridRow: `10 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilelogicCalculation 
  overallgroup={ overallgroup}
  setoverallgroup={setoverallgroup}
  overallgroupProps={ overallgroupProps}
  setoverallgroupProps={setoverallgroupProps}
  controlgroup={ controlgroup}
  setcontrolgroup={setcontrolgroup}
  controlgroupProps={ controlgroupProps}
  setcontrolgroupProps={setcontrolgroupProps}
  control_tab_group={ control_tab_group}
  setcontrol_tab_group={setcontrol_tab_group}
  control_tab_groupProps={ control_tab_groupProps}
  setcontrol_tab_groupProps={setcontrol_tab_groupProps}
  button_group={ button_group}
  setbutton_group={setbutton_group}
  button_groupProps={ button_groupProps}
  setbutton_groupProps={setbutton_groupProps}
  rtgs_info={ rtgs_info}
  setrtgs_info={setrtgs_info}
  rtgs_infoProps={ rtgs_infoProps}
  setrtgs_infoProps={setrtgs_infoProps}
  allcontrols={ allcontrols}
  setallcontrols={setallcontrols}
  allcontrolsProps={ allcontrolsProps}
  setallcontrolsProps={setallcontrolsProps}
  commoninfo={ commoninfo}
  setcommoninfo={setcommoninfo}
  commoninfoProps={ commoninfoProps}
  setcommoninfoProps={setcommoninfoProps}
  basicinfo={ basicinfo}
  setbasicinfo={setbasicinfo}
  basicinfoProps={ basicinfoProps}
  setbasicinfoProps={setbasicinfoProps}
  additionalinfo={ additionalinfo}
  setadditionalinfo={setadditionalinfo}
  additionalinfoProps={ additionalinfoProps}
  setadditionalinfoProps={setadditionalinfoProps}
  addtional_info={ addtional_info}
  setaddtional_info={setaddtional_info}
  signature_screen={ signature_screen}
  setsignature_screen={setsignature_screen}
  remittance_info={ remittance_info}
  setremittance_info={setremittance_info}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
  vgphstm_uuid={ vgphstm_uuid}
  setvgphstm_uuid={setvgphstm_uuid}
  listgroup={ listgroup}
  setlistgroup={setlistgroup}
  listgroupProps={ listgroupProps}
  setlistgroupProps={setlistgroupProps}
  list_tab_group={ list_tab_group}
  setlist_tab_group={setlist_tab_group}
  list_tab_groupProps={ list_tab_groupProps}
  setlist_tab_groupProps={setlist_tab_groupProps}
  validation_list={ validation_list}
  setvalidation_list={setvalidation_list}
  validation_listProps={ validation_listProps}
  setvalidation_listProps={setvalidation_listProps}
  valdnlisttable={ valdnlisttable}
  setvaldnlisttable={setvaldnlisttable}
  valdnlisttableProps={ valdnlisttableProps}
  setvaldnlisttableProps={setvaldnlisttableProps}
  comment_list={ comment_list}
  setcomment_list={setcomment_list}
  comment_listProps={ comment_listProps}
  setcomment_listProps={setcomment_listProps}
  cmntlisttable={ cmntlisttable}
  setcmntlisttable={setcmntlisttable}
  cmntlisttableProps={ cmntlisttableProps}
  setcmntlisttableProps={setcmntlisttableProps}
  rtgs_list={ rtgs_list}
  setrtgs_list={setrtgs_list}
  rtgs_listProps={ rtgs_listProps}
  setrtgs_listProps={setrtgs_listProps}
  rtgs_list_grp={ rtgs_list_grp}
  setrtgs_list_grp={setrtgs_list_grp}
  rtgs_list_grpProps={ rtgs_list_grpProps}
  setrtgs_list_grpProps={setrtgs_list_grpProps}
  rtgs_list_tble_group={ rtgs_list_tble_group}
  setrtgs_list_tble_group={setrtgs_list_tble_group}
  rtgs_list_tble_groupProps={ rtgs_list_tble_groupProps}
  setrtgs_list_tble_groupProps={setrtgs_list_tble_groupProps}
  rtgs_list_table={ rtgs_list_table}
  setrtgs_list_table={setrtgs_list_table}
  rtgs_list_tableProps={ rtgs_list_tableProps}
  setrtgs_list_tableProps={setrtgs_list_tableProps}
  group={ group}
  setgroup={setgroup}
  groupProps={ groupProps}
  setgroupProps={setgroupProps}
  rtgs_list_tab_grp={ rtgs_list_tab_grp}
  setrtgs_list_tab_grp={setrtgs_list_tab_grp}
  rtgs_list_tab_grpProps={ rtgs_list_tab_grpProps}
  setrtgs_list_tab_grpProps={setrtgs_list_tab_grpProps}
  validtn_list={ validtn_list}
  setvalidtn_list={setvalidtn_list}
  validtn_listProps={ validtn_listProps}
  setvalidtn_listProps={setvalidtn_listProps}
  rtgs_list_validtn_table={ rtgs_list_validtn_table}
  setrtgs_list_validtn_table={setrtgs_list_validtn_table}
  rtgs_list_validtn_tableProps={ rtgs_list_validtn_tableProps}
  setrtgs_list_validtn_tableProps={setrtgs_list_validtn_tableProps}
  cmnt_list={ cmnt_list}
  setcmnt_list={setcmnt_list}
  cmnt_listProps={ cmnt_listProps}
  setcmnt_listProps={setcmnt_listProps}
  rtgs_list_cmnts_list={ rtgs_list_cmnts_list}
  setrtgs_list_cmnts_list={setrtgs_list_cmnts_list}
  rtgs_list_cmnts_listProps={ rtgs_list_cmnts_listProps}
  setrtgs_list_cmnts_listProps={setrtgs_list_cmnts_listProps}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
