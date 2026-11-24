'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Groupdynamicactionsubgroup  from "../Groupdynamicactionsubgroup/Groupdynamicactionsubgroup";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamicactionmaingroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
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
  const [showFlag, setShowFlag] = React.useState<string>("");
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
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {acksimulatormaingroup3a007, setacksimulatormaingroup3a007}= useContext(TotalContext) as TotalContextProps;
  const {acksimulatormaingroup3a007Props, setacksimulatormaingroup3a007Props}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778c, setack_simulator_tab_group0778c}= useContext(TotalContext) as TotalContextProps;
  const {ack_simulator_tab_group0778cProps, setack_simulator_tab_group0778cProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391f, setop_financial_tab_headerc391f}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_tab_headerc391fProps, setop_financial_tab_headerc391fProps}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467ba, setop_simulator_sub_group467ba}= useContext(TotalContext) as TotalContextProps;
  const {op_simulator_sub_group467baProps, setop_simulator_sub_group467baProps}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43a, setcustomwidgetmaingroupcf43a}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetmaingroupcf43aProps, setcustomwidgetmaingroupcf43aProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78, setdynamicactionmaingroupd3a78}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionmaingroupd3a78Props, setdynamicactionmaingroupd3a78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6, setdynamicactionsubgroupa58e6}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsubgroupa58e6Props, setdynamicactionsubgroupa58e6Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896, setip_financial_tab_header60896}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial_tab_header60896Props, setip_financial_tab_header60896Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8, setip_simulator_sub_groupa1dc8}= useContext(TotalContext) as TotalContextProps;
  const {ip_simulator_sub_groupa1dc8Props, setip_simulator_sub_groupa1dc8Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849, setip_dynamicactionmaingroup2f849}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionmaingroup2f849Props, setip_dynamicactionmaingroup2f849Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5b, setip_dynamicactionsubgroup31c5b}= useContext(TotalContext) as TotalContextProps;
  const {ip_dynamicactionsubgroup31c5bProps, setip_dynamicactionsubgroup31c5bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71, setop_nf_camt110_tab_header4fa71}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt110_tab_header4fa71Props, setop_nf_camt110_tab_header4fa71Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9ed, setop_camt110_simulator_sub_group6f9ed}= useContext(TotalContext) as TotalContextProps;
  const {op_camt110_simulator_sub_group6f9edProps, setop_camt110_simulator_sub_group6f9edProps}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0, setop_110_dynamicactionmaingroup4acc0}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionmaingroup4acc0Props, setop_110_dynamicactionmaingroup4acc0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89, setop_110_dynamicactionsubgroup56a89}= useContext(TotalContext) as TotalContextProps;
  const {op_110_dynamicactionsubgroup56a89Props, setop_110_dynamicactionsubgroup56a89Props}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0, setop_nf_camt111_tab_header05ca0}= useContext(TotalContext) as TotalContextProps;
  const {op_nf_camt111_tab_header05ca0Props, setop_nf_camt111_tab_header05ca0Props}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6, setop_camt111_simulator_sub_group120d6}= useContext(TotalContext) as TotalContextProps;
  const {op_camt111_simulator_sub_group120d6Props, setop_camt111_simulator_sub_group120d6Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308, setop_111_dynamicactionmaingroupe4308}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionmaingroupe4308Props, setop_111_dynamicactionmaingroupe4308Props}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7, setop_111_dynamicactionsubgroup73de7}= useContext(TotalContext) as TotalContextProps;
  const {op_111_dynamicactionsubgroup73de7Props, setop_111_dynamicactionsubgroup73de7Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62, setip_nf_camt055_tab_header06c62}= useContext(TotalContext) as TotalContextProps;
  const {ip_nf_camt055_tab_header06c62Props, setip_nf_camt055_tab_header06c62Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216, setip_camt055_simulator_sub_group52216}= useContext(TotalContext) as TotalContextProps;
  const {ip_camt055_simulator_sub_group52216Props, setip_camt055_simulator_sub_group52216Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550, setip_055_dynamicactionmaingroup84550}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionmaingroup84550Props, setip_055_dynamicactionmaingroup84550Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9c, setip_055_dynamicactionsubgroup2ae9c}= useContext(TotalContext) as TotalContextProps;
  const {ip_055_dynamicactionsubgroup2ae9cProps, setip_055_dynamicactionsubgroup2ae9cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {acksimulator_v1, setacksimulator_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:ackSimulator:AFVK:v1',
    [user],
    'GroupDynamicactionmaingroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ba58e04a0f5c4da589869a43de1d3a78");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setdynamicactionmaingroupd3a78Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dynamicactionsubgroup")){
        setdynamicactionsubgroupa58e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactionsubgroupa58e6?.isDisabled==null)
      {
        setdynamicactionsubgroupa58e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
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
        codeStates['op_financial_tab_headerc391f'] = op_financial_tab_headerc391fProps,
        codeStates['setop_financial_tab_headerc391f'] = setop_financial_tab_headerc391fProps,
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
        codeStates['ip_financial_tab_header60896'] = ip_financial_tab_header60896Props,
        codeStates['setip_financial_tab_header60896'] = setip_financial_tab_header60896Props,
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
        codeStates['op_nf_camt110_tab_header4fa71'] = op_nf_camt110_tab_header4fa71Props,
        codeStates['setop_nf_camt110_tab_header4fa71'] = setop_nf_camt110_tab_header4fa71Props,
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
        codeStates['op_nf_camt111_tab_header05ca0'] = op_nf_camt111_tab_header05ca0Props,
        codeStates['setop_nf_camt111_tab_header05ca0'] = setop_nf_camt111_tab_header05ca0Props,
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
        codeStates['ip_nf_camt055_tab_header06c62'] = ip_nf_camt055_tab_header06c62Props,
        codeStates['setip_nf_camt055_tab_header06c62'] = setip_nf_camt055_tab_header06c62Props,
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

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ba58e04a0f5c4da589869a43de1d3a78");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
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
        codeStates['op_financial_tab_headerc391f'] = op_financial_tab_headerc391fProps,
        codeStates['setop_financial_tab_headerc391f'] = setop_financial_tab_headerc391fProps,
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
        codeStates['ip_financial_tab_header60896'] = ip_financial_tab_header60896Props,
        codeStates['setip_financial_tab_header60896'] = setip_financial_tab_header60896Props,
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
        codeStates['op_nf_camt110_tab_header4fa71'] = op_nf_camt110_tab_header4fa71Props,
        codeStates['setop_nf_camt110_tab_header4fa71'] = setop_nf_camt110_tab_header4fa71Props,
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
        codeStates['op_nf_camt111_tab_header05ca0'] = op_nf_camt111_tab_header05ca0Props,
        codeStates['setop_nf_camt111_tab_header05ca0'] = setop_nf_camt111_tab_header05ca0Props,
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
        codeStates['ip_nf_camt055_tab_header06c62'] = ip_nf_camt055_tab_header06c62Props,
        codeStates['setip_nf_camt055_tab_header06c62'] = setip_nf_camt055_tab_header06c62Props,
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactionmaingroupd3a78Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactionmaingroupd3a78Ref.current?.setSearchParams();
    dynamicactionmaingroupd3a78Ref.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(dynamicactionmaingroupd3a78) &&
        Object.keys(dynamicactionmaingroupd3a78)?.length > 0
      ) {
        setdynamicactionmaingroupd3a78({})
        setdynamicactionmaingroupd3a78Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dynamicactionmaingroupd3a78Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '12 / 23',
        gridRow: '57 / 64',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(8px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '8px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setacksimulator_v1((pre:any)=>({...pre,_selectedGroup_:"dynamicactionmaingroup"}))
        }}
    >
        {allowedComponent.includes("dynamicactionsubgroup")  &&<Groupdynamicactionsubgroup  
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
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
    </div>
 )
}

export default Groupdynamicactionmaingroup
