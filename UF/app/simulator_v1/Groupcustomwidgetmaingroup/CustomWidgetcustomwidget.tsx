'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import CodeFilelogicCodes   from './customwidgetCodeFilelogicCodes'   
     
//////////


const CustomWidgetcustomwidget = ({encryptionFlagCompData,controlData}:any) => {
  const {acksimulatormaingroup3a007:acksimulatormaingroup, setacksimulatormaingroup3a007:setacksimulatormaingroup}= useContext(TotalContext) as TotalContextProps;
  const {acksimulatormaingroup3a007Props:acksimulatormaingroupProps, setacksimulatormaingroup3a007Props:setacksimulatormaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c:ack_simulator_tab_group, setack_simulator_tab_group0778c:setack_simulator_tab_group}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778cProps:ack_simulator_tab_groupProps, setack_simulator_tab_group0778cProps:setack_simulator_tab_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391f:op_financial_tab_header, setop_financial_tab_headerc391f:setop_financial_tab_header}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391fProps:op_financial_tab_headerProps, setop_financial_tab_headerc391fProps:setop_financial_tab_headerProps}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba:op_simulator_sub_group, setop_simulator_sub_group467ba:setop_simulator_sub_group}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467baProps:op_simulator_sub_groupProps, setop_simulator_sub_group467baProps:setop_simulator_sub_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a:customwidgetmaingroup, setcustomwidgetmaingroupcf43a:setcustomwidgetmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43aProps:customwidgetmaingroupProps, setcustomwidgetmaingroupcf43aProps:setcustomwidgetmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetd1c52:customwidget, setcustomwidgetd1c52:setcustomwidget}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78:dynamicactionmaingroup, setdynamicactionmaingroupd3a78:setdynamicactionmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78Props:dynamicactionmaingroupProps, setdynamicactionmaingroupd3a78Props:setdynamicactionmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6:dynamicactionsubgroup, setdynamicactionsubgroupa58e6:setdynamicactionsubgroup}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6Props:dynamicactionsubgroupProps, setdynamicactionsubgroupa58e6Props:setdynamicactionsubgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896:ip_financial_tab_header, setip_financial_tab_header60896:setip_financial_tab_header}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896Props:ip_financial_tab_headerProps, setip_financial_tab_header60896Props:setip_financial_tab_headerProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8:ip_simulator_sub_group, setip_simulator_sub_groupa1dc8:setip_simulator_sub_group}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8Props:ip_simulator_sub_groupProps, setip_simulator_sub_groupa1dc8Props:setip_simulator_sub_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849:ip_dynamicactionmaingroup, setip_dynamicactionmaingroup2f849:setip_dynamicactionmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849Props:ip_dynamicactionmaingroupProps, setip_dynamicactionmaingroup2f849Props:setip_dynamicactionmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b:ip_dynamicactionsubgroup, setip_dynamicactionsubgroup31c5b:setip_dynamicactionsubgroup}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5bProps:ip_dynamicactionsubgroupProps, setip_dynamicactionsubgroup31c5bProps:setip_dynamicactionsubgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71:op_nf_camt110_tab_header, setop_nf_camt110_tab_header4fa71:setop_nf_camt110_tab_header}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71Props:op_nf_camt110_tab_headerProps, setop_nf_camt110_tab_header4fa71Props:setop_nf_camt110_tab_headerProps}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed:op_camt110_simulator_sub_group, setop_camt110_simulator_sub_group6f9ed:setop_camt110_simulator_sub_group}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9edProps:op_camt110_simulator_sub_groupProps, setop_camt110_simulator_sub_group6f9edProps:setop_camt110_simulator_sub_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0:op_110_dynamicactionmaingroup, setop_110_dynamicactionmaingroup4acc0:setop_110_dynamicactionmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0Props:op_110_dynamicactionmaingroupProps, setop_110_dynamicactionmaingroup4acc0Props:setop_110_dynamicactionmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89:op_110_dynamicactionsubgroup, setop_110_dynamicactionsubgroup56a89:setop_110_dynamicactionsubgroup}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89Props:op_110_dynamicactionsubgroupProps, setop_110_dynamicactionsubgroup56a89Props:setop_110_dynamicactionsubgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0:op_nf_camt111_tab_header, setop_nf_camt111_tab_header05ca0:setop_nf_camt111_tab_header}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0Props:op_nf_camt111_tab_headerProps, setop_nf_camt111_tab_header05ca0Props:setop_nf_camt111_tab_headerProps}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6:op_camt111_simulator_sub_group, setop_camt111_simulator_sub_group120d6:setop_camt111_simulator_sub_group}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6Props:op_camt111_simulator_sub_groupProps, setop_camt111_simulator_sub_group120d6Props:setop_camt111_simulator_sub_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308:op_111_dynamicactionmaingroup, setop_111_dynamicactionmaingroupe4308:setop_111_dynamicactionmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308Props:op_111_dynamicactionmaingroupProps, setop_111_dynamicactionmaingroupe4308Props:setop_111_dynamicactionmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7:op_111_dynamicactionsubgroup, setop_111_dynamicactionsubgroup73de7:setop_111_dynamicactionsubgroup}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7Props:op_111_dynamicactionsubgroupProps, setop_111_dynamicactionsubgroup73de7Props:setop_111_dynamicactionsubgroupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62:ip_nf_camt055_tab_header, setip_nf_camt055_tab_header06c62:setip_nf_camt055_tab_header}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62Props:ip_nf_camt055_tab_headerProps, setip_nf_camt055_tab_header06c62Props:setip_nf_camt055_tab_headerProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216:ip_camt055_simulator_sub_group, setip_camt055_simulator_sub_group52216:setip_camt055_simulator_sub_group}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216Props:ip_camt055_simulator_sub_groupProps, setip_camt055_simulator_sub_group52216Props:setip_camt055_simulator_sub_groupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550:ip_055_dynamicactionmaingroup, setip_055_dynamicactionmaingroup84550:setip_055_dynamicactionmaingroup}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550Props:ip_055_dynamicactionmaingroupProps, setip_055_dynamicactionmaingroup84550Props:setip_055_dynamicactionmaingroupProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c:ip_055_dynamicactionsubgroup, setip_055_dynamicactionsubgroup2ae9c:setip_055_dynamicactionsubgroup}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9cProps:ip_055_dynamicactionsubgroupProps, setip_055_dynamicactionsubgroup2ae9cProps:setip_055_dynamicactionsubgroupProps}= useContext(TotalContext) as TotalContextProps;
  
  return (
    <div className="" style={{gridColumn: `2 / 20`,gridRow: `2 / 4`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFilelogicCodes 
  acksimulatormaingroup={ acksimulatormaingroup}
  setacksimulatormaingroup={setacksimulatormaingroup}
  acksimulatormaingroupProps={ acksimulatormaingroupProps}
  setacksimulatormaingroupProps={setacksimulatormaingroupProps}
  ack_simulator_tab_group={ ack_simulator_tab_group}
  setack_simulator_tab_group={setack_simulator_tab_group}
  ack_simulator_tab_groupProps={ ack_simulator_tab_groupProps}
  setack_simulator_tab_groupProps={setack_simulator_tab_groupProps}
  op_financial_tab_header={ op_financial_tab_header}
  setop_financial_tab_header={setop_financial_tab_header}
  op_financial_tab_headerProps={ op_financial_tab_headerProps}
  setop_financial_tab_headerProps={setop_financial_tab_headerProps}
  op_simulator_sub_group={ op_simulator_sub_group}
  setop_simulator_sub_group={setop_simulator_sub_group}
  op_simulator_sub_groupProps={ op_simulator_sub_groupProps}
  setop_simulator_sub_groupProps={setop_simulator_sub_groupProps}
  customwidgetmaingroup={ customwidgetmaingroup}
  setcustomwidgetmaingroup={setcustomwidgetmaingroup}
  customwidgetmaingroupProps={ customwidgetmaingroupProps}
  setcustomwidgetmaingroupProps={setcustomwidgetmaingroupProps}
  customwidget={ customwidget}
  setcustomwidget={setcustomwidget}
  dynamicactionmaingroup={ dynamicactionmaingroup}
  setdynamicactionmaingroup={setdynamicactionmaingroup}
  dynamicactionmaingroupProps={ dynamicactionmaingroupProps}
  setdynamicactionmaingroupProps={setdynamicactionmaingroupProps}
  dynamicactionsubgroup={ dynamicactionsubgroup}
  setdynamicactionsubgroup={setdynamicactionsubgroup}
  dynamicactionsubgroupProps={ dynamicactionsubgroupProps}
  setdynamicactionsubgroupProps={setdynamicactionsubgroupProps}
  ip_financial_tab_header={ ip_financial_tab_header}
  setip_financial_tab_header={setip_financial_tab_header}
  ip_financial_tab_headerProps={ ip_financial_tab_headerProps}
  setip_financial_tab_headerProps={setip_financial_tab_headerProps}
  ip_simulator_sub_group={ ip_simulator_sub_group}
  setip_simulator_sub_group={setip_simulator_sub_group}
  ip_simulator_sub_groupProps={ ip_simulator_sub_groupProps}
  setip_simulator_sub_groupProps={setip_simulator_sub_groupProps}
  ip_dynamicactionmaingroup={ ip_dynamicactionmaingroup}
  setip_dynamicactionmaingroup={setip_dynamicactionmaingroup}
  ip_dynamicactionmaingroupProps={ ip_dynamicactionmaingroupProps}
  setip_dynamicactionmaingroupProps={setip_dynamicactionmaingroupProps}
  ip_dynamicactionsubgroup={ ip_dynamicactionsubgroup}
  setip_dynamicactionsubgroup={setip_dynamicactionsubgroup}
  ip_dynamicactionsubgroupProps={ ip_dynamicactionsubgroupProps}
  setip_dynamicactionsubgroupProps={setip_dynamicactionsubgroupProps}
  op_nf_camt110_tab_header={ op_nf_camt110_tab_header}
  setop_nf_camt110_tab_header={setop_nf_camt110_tab_header}
  op_nf_camt110_tab_headerProps={ op_nf_camt110_tab_headerProps}
  setop_nf_camt110_tab_headerProps={setop_nf_camt110_tab_headerProps}
  op_camt110_simulator_sub_group={ op_camt110_simulator_sub_group}
  setop_camt110_simulator_sub_group={setop_camt110_simulator_sub_group}
  op_camt110_simulator_sub_groupProps={ op_camt110_simulator_sub_groupProps}
  setop_camt110_simulator_sub_groupProps={setop_camt110_simulator_sub_groupProps}
  op_110_dynamicactionmaingroup={ op_110_dynamicactionmaingroup}
  setop_110_dynamicactionmaingroup={setop_110_dynamicactionmaingroup}
  op_110_dynamicactionmaingroupProps={ op_110_dynamicactionmaingroupProps}
  setop_110_dynamicactionmaingroupProps={setop_110_dynamicactionmaingroupProps}
  op_110_dynamicactionsubgroup={ op_110_dynamicactionsubgroup}
  setop_110_dynamicactionsubgroup={setop_110_dynamicactionsubgroup}
  op_110_dynamicactionsubgroupProps={ op_110_dynamicactionsubgroupProps}
  setop_110_dynamicactionsubgroupProps={setop_110_dynamicactionsubgroupProps}
  op_nf_camt111_tab_header={ op_nf_camt111_tab_header}
  setop_nf_camt111_tab_header={setop_nf_camt111_tab_header}
  op_nf_camt111_tab_headerProps={ op_nf_camt111_tab_headerProps}
  setop_nf_camt111_tab_headerProps={setop_nf_camt111_tab_headerProps}
  op_camt111_simulator_sub_group={ op_camt111_simulator_sub_group}
  setop_camt111_simulator_sub_group={setop_camt111_simulator_sub_group}
  op_camt111_simulator_sub_groupProps={ op_camt111_simulator_sub_groupProps}
  setop_camt111_simulator_sub_groupProps={setop_camt111_simulator_sub_groupProps}
  op_111_dynamicactionmaingroup={ op_111_dynamicactionmaingroup}
  setop_111_dynamicactionmaingroup={setop_111_dynamicactionmaingroup}
  op_111_dynamicactionmaingroupProps={ op_111_dynamicactionmaingroupProps}
  setop_111_dynamicactionmaingroupProps={setop_111_dynamicactionmaingroupProps}
  op_111_dynamicactionsubgroup={ op_111_dynamicactionsubgroup}
  setop_111_dynamicactionsubgroup={setop_111_dynamicactionsubgroup}
  op_111_dynamicactionsubgroupProps={ op_111_dynamicactionsubgroupProps}
  setop_111_dynamicactionsubgroupProps={setop_111_dynamicactionsubgroupProps}
  ip_nf_camt055_tab_header={ ip_nf_camt055_tab_header}
  setip_nf_camt055_tab_header={setip_nf_camt055_tab_header}
  ip_nf_camt055_tab_headerProps={ ip_nf_camt055_tab_headerProps}
  setip_nf_camt055_tab_headerProps={setip_nf_camt055_tab_headerProps}
  ip_camt055_simulator_sub_group={ ip_camt055_simulator_sub_group}
  setip_camt055_simulator_sub_group={setip_camt055_simulator_sub_group}
  ip_camt055_simulator_sub_groupProps={ ip_camt055_simulator_sub_groupProps}
  setip_camt055_simulator_sub_groupProps={setip_camt055_simulator_sub_groupProps}
  ip_055_dynamicactionmaingroup={ ip_055_dynamicactionmaingroup}
  setip_055_dynamicactionmaingroup={setip_055_dynamicactionmaingroup}
  ip_055_dynamicactionmaingroupProps={ ip_055_dynamicactionmaingroupProps}
  setip_055_dynamicactionmaingroupProps={setip_055_dynamicactionmaingroupProps}
  ip_055_dynamicactionsubgroup={ ip_055_dynamicactionsubgroup}
  setip_055_dynamicactionsubgroup={setip_055_dynamicactionsubgroup}
  ip_055_dynamicactionsubgroupProps={ ip_055_dynamicactionsubgroupProps}
  setip_055_dynamicactionsubgroupProps={setip_055_dynamicactionsubgroupProps}
      />
    </div>
  )
}

export default CustomWidgetcustomwidget ;
