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
  const {investigationresponsecamt111maingroup058ec:investigationresponsecamt111maingroup, setinvestigationresponsecamt111maingroup058ec:setinvestigationresponsecamt111maingroup}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111maingroup058ecProps:investigationresponsecamt111maingroupProps, setinvestigationresponsecamt111maingroup058ecProps:setinvestigationresponsecamt111maingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5:investigationresponsecamt111subgroup, setinvestigationresponsecamt111subgroupafab5:setinvestigationresponsecamt111subgroup}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111subgroupafab5Props:investigationresponsecamt111subgroupProps, setinvestigationresponsecamt111subgroupafab5Props:setinvestigationresponsecamt111subgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeed:investigationresponsecamt111dynamicactions, setinvestigationresponsecamt111dynamicactionsceeed:setinvestigationresponsecamt111dynamicactions}= useContext(TotalContext) as TotalContextProps;
  const {investigationresponsecamt111dynamicactionsceeedProps:investigationresponsecamt111dynamicactionsProps, setinvestigationresponsecamt111dynamicactionsceeedProps:setinvestigationresponsecamt111dynamicactionsProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetab151:customwidget, setcustomwidgetab151:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `1 / 14`,gridRow: `122 / 128`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilevalidate 
  investigationresponsecamt111maingroup={ investigationresponsecamt111maingroup}
  setinvestigationresponsecamt111maingroup={setinvestigationresponsecamt111maingroup}
  investigationresponsecamt111maingroupProps={ investigationresponsecamt111maingroupProps}
  setinvestigationresponsecamt111maingroupProps={setinvestigationresponsecamt111maingroupProps}
  investigationresponsecamt111subgroup={ investigationresponsecamt111subgroup}
  setinvestigationresponsecamt111subgroup={setinvestigationresponsecamt111subgroup}
  investigationresponsecamt111subgroupProps={ investigationresponsecamt111subgroupProps}
  setinvestigationresponsecamt111subgroupProps={setinvestigationresponsecamt111subgroupProps}
  investigationresponsecamt111dynamicactions={ investigationresponsecamt111dynamicactions}
  setinvestigationresponsecamt111dynamicactions={setinvestigationresponsecamt111dynamicactions}
  investigationresponsecamt111dynamicactionsProps={ investigationresponsecamt111dynamicactionsProps}
  setinvestigationresponsecamt111dynamicactionsProps={setinvestigationresponsecamt111dynamicactionsProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
