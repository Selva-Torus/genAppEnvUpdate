'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { Tabs } from '@/components/Tabs'
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

import Groupop_financial_tab_header  from "../Groupop_financial_tab_header/Groupop_financial_tab_header";

import Groupip_financial_tab_header  from "../Groupip_financial_tab_header/Groupip_financial_tab_header";

import Groupop_nf_camt110_tab_header  from "../Groupop_nf_camt110_tab_header/Groupop_nf_camt110_tab_header";

import Groupop_nf_camt111_tab_header  from "../Groupop_nf_camt111_tab_header/Groupop_nf_camt111_tab_header";

import Groupip_nf_camt055_tab_header  from "../Groupip_nf_camt055_tab_header/Groupip_nf_camt055_tab_header";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';
import UOmapperData from '@/context/dfdmapperContolnames.json';


const Groupack_simulator_tab_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[], setTableData ,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData={}, controlData={}}:any)=> {
  const { token } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { setValidate, setValidateRefetch } = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allStates:any=useContext(TotalContext) as TotalContextProps;
  let code:any = `setop_camt110_simulator_sub_group((prev) => ({ ...prev, op_110_message_type: "CAMT110"}));
setop_camt111_simulator_sub_group((prev) => ({ ...prev, op_111_message_type: "CAMT111"}));
setip_camt055_simulator_sub_group((prev) => ({ ...prev, ip_055_message_type: "CAMT055"}));`;
    const decodedTokenObj:any = decodeToken(token);

  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_messagetypesimulatorcombo_v1Props, setdfd_messagetypesimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statussimulatorcombo_v1Props, setdfd_statussimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ipmessagetypestimulatorcombo_v1Props, setdfd_ipmessagetypestimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfsimulatormessage_v1Props, setdfd_nfsimulatormessage_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfreqtype_v1Props, setdfd_nfreqtype_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfreqreason_v1Props, setdfd_nfreqreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfrespreason_v1Props, setdfd_nfrespreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfresptype_v1Props, setdfd_nfresptype_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfcancelreasoncombo_v1Props, setdfd_nfcancelreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_rejectreasonsimulatorcombo_v1Props, setdfd_rejectreasonsimulatorcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const securityData:any={
  "Operational Manager": {
    "allowedControls": [],
    "allowedGroups": [
      "ack_simulator_tab_group",
      "op_financial_tab_header",
      "op_simulator_sub_group",
      "customwidgetmaingroup",
      "dynamicactionmaingroup",
      "dynamicactionsubgroup",
      "ip_financial_tab_header",
      "ip_simulator_sub_group",
      "ip_dynamicactionmaingroup",
      "ip_dynamicactionsubgroup",
      "op_nf_camt110_tab_header",
      "op_camt110_simulator_sub_group",
      "op_110_dynamicactionmaingroup",
      "op_110_dynamicactionsubgroup",
      "op_nf_camt111_tab_header",
      "op_camt111_simulator_sub_group",
      "op_111_dynamicactionmaingroup",
      "op_111_dynamicactionsubgroup",
      "ip_nf_camt055_tab_header",
      "ip_camt055_simulator_sub_group",
      "ip_055_dynamicactionmaingroup",
      "ip_055_dynamicactionsubgroup"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "acksimulatormaingroup",
      "ack_simulator_tab_group",
      "op_financial_tab_header",
      "op_simulator_sub_group",
      "customwidgetmaingroup",
      "dynamicactionmaingroup",
      "dynamicactionsubgroup",
      "ip_financial_tab_header",
      "ip_simulator_sub_group",
      "ip_dynamicactionmaingroup",
      "ip_dynamicactionsubgroup",
      "op_nf_camt110_tab_header",
      "op_camt110_simulator_sub_group",
      "op_110_dynamicactionmaingroup",
      "op_110_dynamicactionsubgroup",
      "op_nf_camt111_tab_header",
      "op_camt111_simulator_sub_group",
      "op_111_dynamicactionmaingroup",
      "op_111_dynamicactionsubgroup",
      "ip_nf_camt055_tab_header",
      "ip_camt055_simulator_sub_group",
      "ip_055_dynamicactionmaingroup",
      "ip_055_dynamicactionsubgroup"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007}= useContext(TotalContext) as TotalContextProps;
  const {acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391f, setop_financial_tab_headerc391f}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896, setip_financial_tab_header60896}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // Active tab id
  const activeTabId = ack_simulator_tab_group0778c?.ack_simulator_tab_group || "op_financial_tab_header";
  const prevActiveTabRef = useRef(activeTabId);
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "e0d8d673520d468e86ac044692b0778c"
      );
  code = orchestrationData?.data?.code;
  setAllCode(orchestrationData?.data?.code||"");
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  for(let i=0;i<tabOptions?.length;i++){
    if(allowedGroups?.find((group)=>(group==tabOptions[i]?.id)))
    {
      if(!ack_simulator_tab_group0778c?.ack_simulator_tab_group || ack_simulator_tab_group0778c?.ack_simulator_tab_group === ""){
      setack_simulator_tab_group0778c((pre:any)=>({...pre,ack_simulator_tab_group:tabOptions[i]?.id}));
      break;
      }
    }
  }   
  /////////////
        setop_financial_tab_headerc391f({...op_financial_tab_headerc391f,isDisabled:orchestrationData?.data?.readableControls.includes("op_financial_tab_header")});
        setip_financial_tab_header60896({...ip_financial_tab_header60896,isDisabled:orchestrationData?.data?.readableControls.includes("ip_financial_tab_header")});
        setop_nf_camt110_tab_header4fa71({...op_nf_camt110_tab_header4fa71,isDisabled:orchestrationData?.data?.readableControls.includes("op_nf_camt110_tab_header")});
        setop_nf_camt111_tab_header05ca0({...op_nf_camt111_tab_header05ca0,isDisabled:orchestrationData?.data?.readableControls.includes("op_nf_camt111_tab_header")});
        setip_nf_camt055_tab_header06c62({...ip_nf_camt055_tab_header06c62,isDisabled:orchestrationData?.data?.readableControls.includes("ip_nf_camt055_tab_header")});
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['selected']  = "op_financial_tab_header",
        codeStates['acksimulatormaingroup'] = acksimulatormaingroup3a007,
        codeStates['setacksimulatormaingroup'] = setacksimulatormaingroup3a007,
        codeStates['acksimulatormaingroup3a007'] = acksimulatormaingroup3a007Props,
        codeStates['setacksimulatormaingroup3a007'] = setacksimulatormaingroup3a007Props,
        codeStates['ack_simulator_tab_group'] = ack_simulator_tab_group0778c,
        codeStates['setack_simulator_tab_group'] = setack_simulator_tab_group0778c,
        codeStates['ack_simulator_tab_group0778c'] = ack_simulator_tab_group0778cProps,
        codeStates['setack_simulator_tab_group0778c'] = setack_simulator_tab_group0778cProps,
        codeStates['op_financial_tab_header'] = op_financial_tab_headerc391f,
        codeStates['setop_financial_tab_header'] = setop_financial_tab_headerc391f,
        codeStates['op_simulator_sub_group'] = op_simulator_sub_group467ba,
        codeStates['setop_simulator_sub_group'] = setop_simulator_sub_group467ba,
        codeStates['op_simulator_sub_group467ba'] = op_simulator_sub_group467baProps,
        codeStates['setop_simulator_sub_group467ba'] = setop_simulator_sub_group467baProps,
        codeStates['customwidgetmaingroup'] = customwidgetmaingroupcf43a,
        codeStates['setcustomwidgetmaingroup'] = setcustomwidgetmaingroupcf43a,
        codeStates['customwidgetmaingroupcf43a'] = customwidgetmaingroupcf43aProps,
        codeStates['setcustomwidgetmaingroupcf43a'] = setcustomwidgetmaingroupcf43aProps,
        codeStates['dynamicactionmaingroup'] = dynamicactionmaingroupd3a78,
        codeStates['setdynamicactionmaingroup'] = setdynamicactionmaingroupd3a78,
        codeStates['dynamicactionmaingroupd3a78'] = dynamicactionmaingroupd3a78Props,
        codeStates['setdynamicactionmaingroupd3a78'] = setdynamicactionmaingroupd3a78Props,
        codeStates['dynamicactionsubgroup'] = dynamicactionsubgroupa58e6,
        codeStates['setdynamicactionsubgroup'] = setdynamicactionsubgroupa58e6,
        codeStates['dynamicactionsubgroupa58e6'] = dynamicactionsubgroupa58e6Props,
        codeStates['setdynamicactionsubgroupa58e6'] = setdynamicactionsubgroupa58e6Props,
        codeStates['ip_financial_tab_header'] = ip_financial_tab_header60896,
        codeStates['setip_financial_tab_header'] = setip_financial_tab_header60896,
        codeStates['ip_simulator_sub_group'] = ip_simulator_sub_groupa1dc8,
        codeStates['setip_simulator_sub_group'] = setip_simulator_sub_groupa1dc8,
        codeStates['ip_simulator_sub_groupa1dc8'] = ip_simulator_sub_groupa1dc8Props,
        codeStates['setip_simulator_sub_groupa1dc8'] = setip_simulator_sub_groupa1dc8Props,
        codeStates['ip_dynamicactionmaingroup'] = ip_dynamicactionmaingroup2f849,
        codeStates['setip_dynamicactionmaingroup'] = setip_dynamicactionmaingroup2f849,
        codeStates['ip_dynamicactionmaingroup2f849'] = ip_dynamicactionmaingroup2f849Props,
        codeStates['setip_dynamicactionmaingroup2f849'] = setip_dynamicactionmaingroup2f849Props,
        codeStates['ip_dynamicactionsubgroup'] = ip_dynamicactionsubgroup31c5b,
        codeStates['setip_dynamicactionsubgroup'] = setip_dynamicactionsubgroup31c5b,
        codeStates['ip_dynamicactionsubgroup31c5b'] = ip_dynamicactionsubgroup31c5bProps,
        codeStates['setip_dynamicactionsubgroup31c5b'] = setip_dynamicactionsubgroup31c5bProps,
        codeStates['op_nf_camt110_tab_header'] = op_nf_camt110_tab_header4fa71,
        codeStates['setop_nf_camt110_tab_header'] = setop_nf_camt110_tab_header4fa71,
        codeStates['op_camt110_simulator_sub_group'] = op_camt110_simulator_sub_group6f9ed,
        codeStates['setop_camt110_simulator_sub_group'] = setop_camt110_simulator_sub_group6f9ed,
        codeStates['op_camt110_simulator_sub_group6f9ed'] = op_camt110_simulator_sub_group6f9edProps,
        codeStates['setop_camt110_simulator_sub_group6f9ed'] = setop_camt110_simulator_sub_group6f9edProps,
        codeStates['op_110_dynamicactionmaingroup'] = op_110_dynamicactionmaingroup4acc0,
        codeStates['setop_110_dynamicactionmaingroup'] = setop_110_dynamicactionmaingroup4acc0,
        codeStates['op_110_dynamicactionmaingroup4acc0'] = op_110_dynamicactionmaingroup4acc0Props,
        codeStates['setop_110_dynamicactionmaingroup4acc0'] = setop_110_dynamicactionmaingroup4acc0Props,
        codeStates['op_110_dynamicactionsubgroup'] = op_110_dynamicactionsubgroup56a89,
        codeStates['setop_110_dynamicactionsubgroup'] = setop_110_dynamicactionsubgroup56a89,
        codeStates['op_110_dynamicactionsubgroup56a89'] = op_110_dynamicactionsubgroup56a89Props,
        codeStates['setop_110_dynamicactionsubgroup56a89'] = setop_110_dynamicactionsubgroup56a89Props,
        codeStates['op_nf_camt111_tab_header'] = op_nf_camt111_tab_header05ca0,
        codeStates['setop_nf_camt111_tab_header'] = setop_nf_camt111_tab_header05ca0,
        codeStates['op_camt111_simulator_sub_group'] = op_camt111_simulator_sub_group120d6,
        codeStates['setop_camt111_simulator_sub_group'] = setop_camt111_simulator_sub_group120d6,
        codeStates['op_camt111_simulator_sub_group120d6'] = op_camt111_simulator_sub_group120d6Props,
        codeStates['setop_camt111_simulator_sub_group120d6'] = setop_camt111_simulator_sub_group120d6Props,
        codeStates['op_111_dynamicactionmaingroup'] = op_111_dynamicactionmaingroupe4308,
        codeStates['setop_111_dynamicactionmaingroup'] = setop_111_dynamicactionmaingroupe4308,
        codeStates['op_111_dynamicactionmaingroupe4308'] = op_111_dynamicactionmaingroupe4308Props,
        codeStates['setop_111_dynamicactionmaingroupe4308'] = setop_111_dynamicactionmaingroupe4308Props,
        codeStates['op_111_dynamicactionsubgroup'] = op_111_dynamicactionsubgroup73de7,
        codeStates['setop_111_dynamicactionsubgroup'] = setop_111_dynamicactionsubgroup73de7,
        codeStates['op_111_dynamicactionsubgroup73de7'] = op_111_dynamicactionsubgroup73de7Props,
        codeStates['setop_111_dynamicactionsubgroup73de7'] = setop_111_dynamicactionsubgroup73de7Props,
        codeStates['ip_nf_camt055_tab_header'] = ip_nf_camt055_tab_header06c62,
        codeStates['setip_nf_camt055_tab_header'] = setip_nf_camt055_tab_header06c62,
        codeStates['ip_camt055_simulator_sub_group'] = ip_camt055_simulator_sub_group52216,
        codeStates['setip_camt055_simulator_sub_group'] = setip_camt055_simulator_sub_group52216,
        codeStates['ip_camt055_simulator_sub_group52216'] = ip_camt055_simulator_sub_group52216Props,
        codeStates['setip_camt055_simulator_sub_group52216'] = setip_camt055_simulator_sub_group52216Props,
        codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550,
        codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550,
        codeStates['ip_055_dynamicactionmaingroup84550'] = ip_055_dynamicactionmaingroup84550Props,
        codeStates['setip_055_dynamicactionmaingroup84550'] = setip_055_dynamicactionmaingroup84550Props,
        codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c,
        codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c,
        codeStates['ip_055_dynamicactionsubgroup2ae9c'] = ip_055_dynamicactionsubgroup2ae9cProps,
        codeStates['setip_055_dynamicactionsubgroup2ae9c'] = setip_055_dynamicactionsubgroup2ae9cProps,
      codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
    for(let i=0;i<tabOptions?.length;i++){
      if(allowedComponent && allowedComponent !== "" && allowedComponent?.find((group:any)=>(group==tabOptions[i]?.id)))
      {
        setack_simulator_tab_group0778c((pre:any)=>({...pre,ack_simulator_tab_group:tabOptions[i]?.id}));
        break;
      }
    }   
  }
  const handleOnChange=async(id?:string)=>{
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, ackSimulator_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));

     code = allCode
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['selected']  = id,
        codeStates['acksimulatormaingroup'] = acksimulatormaingroup3a007,
        codeStates['setacksimulatormaingroup'] = setacksimulatormaingroup3a007,
        codeStates['acksimulatormaingroup3a007'] = acksimulatormaingroup3a007Props,
        codeStates['setacksimulatormaingroup3a007'] = setacksimulatormaingroup3a007Props,
        codeStates['ack_simulator_tab_group'] = ack_simulator_tab_group0778c,
        codeStates['setack_simulator_tab_group'] = setack_simulator_tab_group0778c,
        codeStates['ack_simulator_tab_group0778c'] = ack_simulator_tab_group0778cProps,
        codeStates['setack_simulator_tab_group0778c'] = setack_simulator_tab_group0778cProps,
        codeStates['op_financial_tab_header'] = op_financial_tab_headerc391f,
        codeStates['setop_financial_tab_header'] = setop_financial_tab_headerc391f,
        codeStates['op_simulator_sub_group'] = op_simulator_sub_group467ba,
        codeStates['setop_simulator_sub_group'] = setop_simulator_sub_group467ba,
        codeStates['op_simulator_sub_group467ba'] = op_simulator_sub_group467baProps,
        codeStates['setop_simulator_sub_group467ba'] = setop_simulator_sub_group467baProps,
        codeStates['customwidgetmaingroup'] = customwidgetmaingroupcf43a,
        codeStates['setcustomwidgetmaingroup'] = setcustomwidgetmaingroupcf43a,
        codeStates['customwidgetmaingroupcf43a'] = customwidgetmaingroupcf43aProps,
        codeStates['setcustomwidgetmaingroupcf43a'] = setcustomwidgetmaingroupcf43aProps,
        codeStates['dynamicactionmaingroup'] = dynamicactionmaingroupd3a78,
        codeStates['setdynamicactionmaingroup'] = setdynamicactionmaingroupd3a78,
        codeStates['dynamicactionmaingroupd3a78'] = dynamicactionmaingroupd3a78Props,
        codeStates['setdynamicactionmaingroupd3a78'] = setdynamicactionmaingroupd3a78Props,
        codeStates['dynamicactionsubgroup'] = dynamicactionsubgroupa58e6,
        codeStates['setdynamicactionsubgroup'] = setdynamicactionsubgroupa58e6,
        codeStates['dynamicactionsubgroupa58e6'] = dynamicactionsubgroupa58e6Props,
        codeStates['setdynamicactionsubgroupa58e6'] = setdynamicactionsubgroupa58e6Props,
        codeStates['ip_financial_tab_header'] = ip_financial_tab_header60896,
        codeStates['setip_financial_tab_header'] = setip_financial_tab_header60896,
        codeStates['ip_simulator_sub_group'] = ip_simulator_sub_groupa1dc8,
        codeStates['setip_simulator_sub_group'] = setip_simulator_sub_groupa1dc8,
        codeStates['ip_simulator_sub_groupa1dc8'] = ip_simulator_sub_groupa1dc8Props,
        codeStates['setip_simulator_sub_groupa1dc8'] = setip_simulator_sub_groupa1dc8Props,
        codeStates['ip_dynamicactionmaingroup'] = ip_dynamicactionmaingroup2f849,
        codeStates['setip_dynamicactionmaingroup'] = setip_dynamicactionmaingroup2f849,
        codeStates['ip_dynamicactionmaingroup2f849'] = ip_dynamicactionmaingroup2f849Props,
        codeStates['setip_dynamicactionmaingroup2f849'] = setip_dynamicactionmaingroup2f849Props,
        codeStates['ip_dynamicactionsubgroup'] = ip_dynamicactionsubgroup31c5b,
        codeStates['setip_dynamicactionsubgroup'] = setip_dynamicactionsubgroup31c5b,
        codeStates['ip_dynamicactionsubgroup31c5b'] = ip_dynamicactionsubgroup31c5bProps,
        codeStates['setip_dynamicactionsubgroup31c5b'] = setip_dynamicactionsubgroup31c5bProps,
        codeStates['op_nf_camt110_tab_header'] = op_nf_camt110_tab_header4fa71,
        codeStates['setop_nf_camt110_tab_header'] = setop_nf_camt110_tab_header4fa71,
        codeStates['op_camt110_simulator_sub_group'] = op_camt110_simulator_sub_group6f9ed,
        codeStates['setop_camt110_simulator_sub_group'] = setop_camt110_simulator_sub_group6f9ed,
        codeStates['op_camt110_simulator_sub_group6f9ed'] = op_camt110_simulator_sub_group6f9edProps,
        codeStates['setop_camt110_simulator_sub_group6f9ed'] = setop_camt110_simulator_sub_group6f9edProps,
        codeStates['op_110_dynamicactionmaingroup'] = op_110_dynamicactionmaingroup4acc0,
        codeStates['setop_110_dynamicactionmaingroup'] = setop_110_dynamicactionmaingroup4acc0,
        codeStates['op_110_dynamicactionmaingroup4acc0'] = op_110_dynamicactionmaingroup4acc0Props,
        codeStates['setop_110_dynamicactionmaingroup4acc0'] = setop_110_dynamicactionmaingroup4acc0Props,
        codeStates['op_110_dynamicactionsubgroup'] = op_110_dynamicactionsubgroup56a89,
        codeStates['setop_110_dynamicactionsubgroup'] = setop_110_dynamicactionsubgroup56a89,
        codeStates['op_110_dynamicactionsubgroup56a89'] = op_110_dynamicactionsubgroup56a89Props,
        codeStates['setop_110_dynamicactionsubgroup56a89'] = setop_110_dynamicactionsubgroup56a89Props,
        codeStates['op_nf_camt111_tab_header'] = op_nf_camt111_tab_header05ca0,
        codeStates['setop_nf_camt111_tab_header'] = setop_nf_camt111_tab_header05ca0,
        codeStates['op_camt111_simulator_sub_group'] = op_camt111_simulator_sub_group120d6,
        codeStates['setop_camt111_simulator_sub_group'] = setop_camt111_simulator_sub_group120d6,
        codeStates['op_camt111_simulator_sub_group120d6'] = op_camt111_simulator_sub_group120d6Props,
        codeStates['setop_camt111_simulator_sub_group120d6'] = setop_camt111_simulator_sub_group120d6Props,
        codeStates['op_111_dynamicactionmaingroup'] = op_111_dynamicactionmaingroupe4308,
        codeStates['setop_111_dynamicactionmaingroup'] = setop_111_dynamicactionmaingroupe4308,
        codeStates['op_111_dynamicactionmaingroupe4308'] = op_111_dynamicactionmaingroupe4308Props,
        codeStates['setop_111_dynamicactionmaingroupe4308'] = setop_111_dynamicactionmaingroupe4308Props,
        codeStates['op_111_dynamicactionsubgroup'] = op_111_dynamicactionsubgroup73de7,
        codeStates['setop_111_dynamicactionsubgroup'] = setop_111_dynamicactionsubgroup73de7,
        codeStates['op_111_dynamicactionsubgroup73de7'] = op_111_dynamicactionsubgroup73de7Props,
        codeStates['setop_111_dynamicactionsubgroup73de7'] = setop_111_dynamicactionsubgroup73de7Props,
        codeStates['ip_nf_camt055_tab_header'] = ip_nf_camt055_tab_header06c62,
        codeStates['setip_nf_camt055_tab_header'] = setip_nf_camt055_tab_header06c62,
        codeStates['ip_camt055_simulator_sub_group'] = ip_camt055_simulator_sub_group52216,
        codeStates['setip_camt055_simulator_sub_group'] = setip_camt055_simulator_sub_group52216,
        codeStates['ip_camt055_simulator_sub_group52216'] = ip_camt055_simulator_sub_group52216Props,
        codeStates['setip_camt055_simulator_sub_group52216'] = setip_camt055_simulator_sub_group52216Props,
        codeStates['ip_055_dynamicactionmaingroup'] = ip_055_dynamicactionmaingroup84550,
        codeStates['setip_055_dynamicactionmaingroup'] = setip_055_dynamicactionmaingroup84550,
        codeStates['ip_055_dynamicactionmaingroup84550'] = ip_055_dynamicactionmaingroup84550Props,
        codeStates['setip_055_dynamicactionmaingroup84550'] = setip_055_dynamicactionmaingroup84550Props,
        codeStates['ip_055_dynamicactionsubgroup'] = ip_055_dynamicactionsubgroup2ae9c,
        codeStates['setip_055_dynamicactionsubgroup'] = setip_055_dynamicactionsubgroup2ae9c,
        codeStates['ip_055_dynamicactionsubgroup2ae9c'] = ip_055_dynamicactionsubgroup2ae9cProps,
        codeStates['setip_055_dynamicactionsubgroup2ae9c'] = setip_055_dynamicactionsubgroup2ae9cProps,
      codeExecution(code,codeStates);
    }
    setack_simulator_tab_group0778c((pre:any)=>({...pre,ack_simulator_tab_group:id}));

  }
  // Second layer: clear validation on tab change (also catches tab changes made from code)
  useEffect(() => {
    if (prevActiveTabRef.current === activeTabId) return; // first render → skip
    prevActiveTabRef.current = activeTabId;
    // Tab switched → wipe stale validation results and the Save counter
    setValidate((pre: any) => ({ ...pre, ackSimulator_v1: {} }));
    setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
  }, [activeTabId]);
  const ack_simulator_tab_group0778cRef = useRef<any>(null);
  const handleClearSearch = () => {
    ack_simulator_tab_group0778cRef.current?.setSearchParams();
    ack_simulator_tab_group0778cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(ack_simulator_tab_group0778c) && Object.keys(ack_simulator_tab_group0778c)?.length>0)
      {
        setack_simulator_tab_group0778c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [ack_simulator_tab_group0778cProps?.refresh])

let tabHeaderItems : any =[
];
  let tabOptions:any=[
    {
      "id": "op_financial_tab_header",
      "title": "OP Financial",
      "renderOnLoad": false,
      "content": <Groupop_financial_tab_header
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "ip_financial_tab_header",
      "title": "IP Financial",
      "renderOnLoad": false,
      "content": <Groupip_financial_tab_header
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "op_nf_camt110_tab_header",
      "title": "OP CAMT110",
      "renderOnLoad": false,
      "content": <Groupop_nf_camt110_tab_header
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "op_nf_camt111_tab_header",
      "title": "OP CAMT111",
      "renderOnLoad": false,
      "content": <Groupop_nf_camt111_tab_header
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
    {
      "id": "ip_nf_camt055_tab_header",
      "title": "IP CAMT055",
      "renderOnLoad": false,
      "content": <Groupip_nf_camt055_tab_header
        lockedData={lockedData} 
        setLockedData={setLockedData} 
        tableData={tableData}
        setTableData={setTableData}
        primaryTableData={primaryTableData}
        setPrimaryTableData={setPrimaryTableData}
        checkToAdd={checkToAdd} 
        setCheckToAdd={setCheckToAdd}  
        refetch={refetch}
        setRefetch={setRefetch}
        dropdownData={dropdownData} 
        setDropdownData={setDropdownData}
        encryptionFlagPageData={encryptionFlagPageData}
        paginationDetails={paginationDetails}
        setIsProcessing={setIsProcessing}
        groupData={groupData}
        controlData={controlData}
      />,
    },
  ]
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 184',
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        gridAutoRows: '',
        columnGap: '',
        backgroundImage:"url('')",
        backgroundColor:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md`}
    >
    <Tabs
      headerClassName=""
      items={tabOptions}
      security={allowedComponent}
      direction='horizontal'
      onChange={handleOnChange}
      defaultActiveId={ack_simulator_tab_group0778c?.ack_simulator_tab_group || "op_financial_tab_header"}
      activeTab={ack_simulator_tab_group0778c?.ack_simulator_tab_group || "op_financial_tab_header"}
      headerAlignment='left'
          />
        </div>
 )
}

export default Groupack_simulator_tab_group
