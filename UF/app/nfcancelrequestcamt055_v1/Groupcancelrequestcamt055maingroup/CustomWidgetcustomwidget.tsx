'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilevalidate   from './customwidgetCodeFilevalidate'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {cancelrequestcamt055maingroupbf232:cancelrequestcamt055maingroup, setcancelrequestcamt055maingroupbf232:setcancelrequestcamt055maingroup}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055maingroupbf232Props:cancelrequestcamt055maingroupProps, setcancelrequestcamt055maingroupbf232Props:setcancelrequestcamt055maingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44:cancelrequestcamt055subgroup, setcancelrequestcamt055subgroup5ac44:setcancelrequestcamt055subgroup}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44Props:cancelrequestcamt055subgroupProps, setcancelrequestcamt055subgroup5ac44Props:setcancelrequestcamt055subgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75a:cancelrequestcamt055dynamicactions, setcancelrequestcamt055dynamicactions2a75a:setcancelrequestcamt055dynamicactions}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75aProps:cancelrequestcamt055dynamicactionsProps, setcancelrequestcamt055dynamicactions2a75aProps:setcancelrequestcamt055dynamicactionsProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetb9148:customwidget, setcustomwidgetb9148:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `1 / 13`,gridRow: `102 / 106`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilevalidate 
  cancelrequestcamt055maingroup={ cancelrequestcamt055maingroup}
  setcancelrequestcamt055maingroup={setcancelrequestcamt055maingroup}
  cancelrequestcamt055maingroupProps={ cancelrequestcamt055maingroupProps}
  setcancelrequestcamt055maingroupProps={setcancelrequestcamt055maingroupProps}
  cancelrequestcamt055subgroup={ cancelrequestcamt055subgroup}
  setcancelrequestcamt055subgroup={setcancelrequestcamt055subgroup}
  cancelrequestcamt055subgroupProps={ cancelrequestcamt055subgroupProps}
  setcancelrequestcamt055subgroupProps={setcancelrequestcamt055subgroupProps}
  cancelrequestcamt055dynamicactions={ cancelrequestcamt055dynamicactions}
  setcancelrequestcamt055dynamicactions={setcancelrequestcamt055dynamicactions}
  cancelrequestcamt055dynamicactionsProps={ cancelrequestcamt055dynamicactionsProps}
  setcancelrequestcamt055dynamicactionsProps={setcancelrequestcamt055dynamicactionsProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
