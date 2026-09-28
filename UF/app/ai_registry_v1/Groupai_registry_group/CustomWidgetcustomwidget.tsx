'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFileairegistry   from './customwidgetCodeFileairegistry'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {overall_ai_asset_registry24714:overall_ai_asset_registry, setoverall_ai_asset_registry24714:setoverall_ai_asset_registry}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry24714Props:overall_ai_asset_registryProps, setoverall_ai_asset_registry24714Props:setoverall_ai_asset_registryProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8:ai_registry_group, setai_registry_group15bd8:setai_registry_group}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8Props:ai_registry_groupProps, setai_registry_group15bd8Props:setai_registry_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565:ai_registry_text_group, setai_registry_text_groupc3565:setai_registry_text_group}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565Props:ai_registry_text_groupProps, setai_registry_text_groupc3565Props:setai_registry_text_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button0d91f:refresh_button, setrefresh_button0d91f:setrefresh_button}= useContext(TotalContext) as TotalContextProps;
  const {searchf8f37:search, setsearchf8f37:setsearch}= useContext(TotalContext) as TotalContextProps;
  const {add_ai_registry439c5:add_ai_registry, setadd_ai_registry439c5:setadd_ai_registry}= useContext(TotalContext) as TotalContextProps;
  const {edit_ai_registrya3497:edit_ai_registry, setedit_ai_registrya3497:setedit_ai_registry}= useContext(TotalContext) as TotalContextProps;
  const {delete_ai_registry1de8b:delete_ai_registry, setdelete_ai_registry1de8b:setdelete_ai_registry}= useContext(TotalContext) as TotalContextProps;
  const {customwidget30142:customwidget, setcustomwidget30142:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3:ai_registry_table, setai_registry_tablec54a3:setai_registry_table}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props:ai_registry_tableProps, setai_registry_tablec54a3Props:setai_registry_tableProps}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `16 / 19`,gridRow: `9 / 14`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFileairegistry 
  overall_ai_asset_registry={ overall_ai_asset_registry}
  setoverall_ai_asset_registry={setoverall_ai_asset_registry}
  overall_ai_asset_registryProps={ overall_ai_asset_registryProps}
  setoverall_ai_asset_registryProps={setoverall_ai_asset_registryProps}
  ai_registry_group={ ai_registry_group}
  setai_registry_group={setai_registry_group}
  ai_registry_groupProps={ ai_registry_groupProps}
  setai_registry_groupProps={setai_registry_groupProps}
  ai_registry_text_group={ ai_registry_text_group}
  setai_registry_text_group={setai_registry_text_group}
  ai_registry_text_groupProps={ ai_registry_text_groupProps}
  setai_registry_text_groupProps={setai_registry_text_groupProps}
  refresh_button={ refresh_button}
  setrefresh_button={setrefresh_button}
  search={ search}
  setsearch={setsearch}
  add_ai_registry={ add_ai_registry}
  setadd_ai_registry={setadd_ai_registry}
  edit_ai_registry={ edit_ai_registry}
  setedit_ai_registry={setedit_ai_registry}
  delete_ai_registry={ delete_ai_registry}
  setdelete_ai_registry={setdelete_ai_registry}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
  ai_registry_table={ ai_registry_table}
  setai_registry_table={setai_registry_table}
  ai_registry_tableProps={ ai_registry_tableProps}
  setai_registry_tableProps={setai_registry_tableProps}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
