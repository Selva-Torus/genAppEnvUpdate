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
  const {investigationrequestcamt110maingroup7a2f5:investigationrequestcamt110maingroup, setinvestigationrequestcamt110maingroup7a2f5:setinvestigationrequestcamt110maingroup}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110maingroup7a2f5Props:investigationrequestcamt110maingroupProps, setinvestigationrequestcamt110maingroup7a2f5Props:setinvestigationrequestcamt110maingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5:investigationrequestcamt110subgroup, setinvestigationrequestcamt110subgroup276a5:setinvestigationrequestcamt110subgroup}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110subgroup276a5Props:investigationrequestcamt110subgroupProps, setinvestigationrequestcamt110subgroup276a5Props:setinvestigationrequestcamt110subgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2:investigationrequestcamt110dynamicactions, setinvestigationrequestcamt110dynamicactionsbfdc2:setinvestigationrequestcamt110dynamicactions}= useContext(TotalContext) as TotalContextProps;
  const {investigationrequestcamt110dynamicactionsbfdc2Props:investigationrequestcamt110dynamicactionsProps, setinvestigationrequestcamt110dynamicactionsbfdc2Props:setinvestigationrequestcamt110dynamicactionsProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetad336:customwidget, setcustomwidgetad336:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `1 / 13`,gridRow: `122 / 128`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilevalidate 
  investigationrequestcamt110maingroup={ investigationrequestcamt110maingroup}
  setinvestigationrequestcamt110maingroup={setinvestigationrequestcamt110maingroup}
  investigationrequestcamt110maingroupProps={ investigationrequestcamt110maingroupProps}
  setinvestigationrequestcamt110maingroupProps={setinvestigationrequestcamt110maingroupProps}
  investigationrequestcamt110subgroup={ investigationrequestcamt110subgroup}
  setinvestigationrequestcamt110subgroup={setinvestigationrequestcamt110subgroup}
  investigationrequestcamt110subgroupProps={ investigationrequestcamt110subgroupProps}
  setinvestigationrequestcamt110subgroupProps={setinvestigationrequestcamt110subgroupProps}
  investigationrequestcamt110dynamicactions={ investigationrequestcamt110dynamicactions}
  setinvestigationrequestcamt110dynamicactions={setinvestigationrequestcamt110dynamicactions}
  investigationrequestcamt110dynamicactionsProps={ investigationrequestcamt110dynamicactionsProps}
  setinvestigationrequestcamt110dynamicactionsProps={setinvestigationrequestcamt110dynamicactionsProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
