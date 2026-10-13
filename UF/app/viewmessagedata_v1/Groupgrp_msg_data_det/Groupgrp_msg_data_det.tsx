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
import Texthdr_info  from "./Texthdr_info";
import XmlViewermsg_xmlviewer  from "./XmlViewermsg_xmlviewer";
import Dividerdivider3  from "./Dividerdivider3";
import Buttonbtn_okay  from "./Buttonbtn_okay";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_msg_data_det = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_employeelist_v1Props, setdfd_employeelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [
      "hdr_info",
      "msg_xmlviewer",
      "divider3",
      "btn_okay"
    ],
    "allowedGroups": [
      "canvas",
      "grp_msg_daata",
      "grp_msg_data_det"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "hdr_info",
      "msg_xmlviewer",
      "divider3",
      "btn_okay"
    ],
    "allowedGroups": [
      "canvas",
      "grp_msg_daata",
      "grp_msg_data_det"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Team": {
    "allowedControls": [
      "hdr_info",
      "msg_xmlviewer",
      "divider3",
      "btn_okay"
    ],
    "allowedGroups": [
      "canvas",
      "grp_msg_daata",
      "grp_msg_data_det"
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
  const {grp_msg_daatab68d6, setgrp_msg_daatab68d6}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_daatab68d6Props, setgrp_msg_daatab68d6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014, setgrp_msg_data_det0b014}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014Props, setgrp_msg_data_det0b014Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_infoed594, sethdr_infoed594}= useContext(TotalContext) as TotalContextProps;
  const {msg_xmlviewera94fb, setmsg_xmlviewera94fb}= useContext(TotalContext) as TotalContextProps;
  const {divider37feba, setdivider37feba}= useContext(TotalContext) as TotalContextProps;
  const {btn_okay0c912, setbtn_okay0c912}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewmessagedata_v1, setviewmessagedata_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:viewMessageData:AFVK:v1',
    [user],
    'GroupGrpMsgDataDet',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3e7d52c02fa06d524a941ecc7420b014");
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
    setgrp_msg_data_det0b014Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("hdr_info")){
        sethdr_infoed594((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(hdr_infoed594?.isDisabled==null)
      {
        sethdr_infoed594((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("msg_xmlviewer")){
        setmsg_xmlviewera94fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(msg_xmlviewera94fb?.isDisabled==null)
      {
        setmsg_xmlviewera94fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider3")){
        setdivider37feba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider37feba?.isDisabled==null)
      {
        setdivider37feba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_okay")){
        setbtn_okay0c912((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_okay0c912?.isDisabled==null)
      {
        setbtn_okay0c912((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_msg_daata'] = grp_msg_daatab68d6,
        codeStates['setgrp_msg_daata'] = setgrp_msg_daatab68d6,
        codeStates['grp_msg_daatab68d6'] = grp_msg_daatab68d6Props,
        codeStates['setgrp_msg_daatab68d6'] = setgrp_msg_daatab68d6Props,
        codeStates['grp_msg_data_det'] = grp_msg_data_det0b014,
        codeStates['setgrp_msg_data_det'] = setgrp_msg_data_det0b014,
        codeStates['grp_msg_data_det0b014'] = grp_msg_data_det0b014Props,
        codeStates['setgrp_msg_data_det0b014'] = setgrp_msg_data_det0b014Props,
        codeStates['hdr_info'] = hdr_infoed594,
        codeStates['sethdr_info'] = sethdr_infoed594,
        codeStates['msg_xmlviewer'] = msg_xmlviewera94fb,
        codeStates['setmsg_xmlviewer'] = setmsg_xmlviewera94fb,
        codeStates['divider3'] = divider37feba,
        codeStates['setdivider3'] = setdivider37feba,
        codeStates['btn_okay'] = btn_okay0c912,
        codeStates['setbtn_okay'] = setbtn_okay0c912,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3e7d52c02fa06d524a941ecc7420b014");
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
        codeStates['grp_msg_daata'] = grp_msg_daatab68d6,
        codeStates['setgrp_msg_daata'] = setgrp_msg_daatab68d6,
        codeStates['grp_msg_daatab68d6'] = grp_msg_daatab68d6Props,
        codeStates['setgrp_msg_daatab68d6'] = setgrp_msg_daatab68d6Props,
        codeStates['grp_msg_data_det'] = grp_msg_data_det0b014,
        codeStates['setgrp_msg_data_det'] = setgrp_msg_data_det0b014,
        codeStates['grp_msg_data_det0b014'] = grp_msg_data_det0b014Props,
        codeStates['setgrp_msg_data_det0b014'] = setgrp_msg_data_det0b014Props,
        codeStates['hdr_info'] = hdr_infoed594,
        codeStates['sethdr_info'] = sethdr_infoed594,
        codeStates['msg_xmlviewer'] = msg_xmlviewera94fb,
        codeStates['setmsg_xmlviewer'] = setmsg_xmlviewera94fb,
        codeStates['divider3'] = divider37feba,
        codeStates['setdivider3'] = setdivider37feba,
        codeStates['btn_okay'] = btn_okay0c912,
        codeStates['setbtn_okay'] = setbtn_okay0c912,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_msg_data_det0b014Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_msg_data_det0b014Ref.current?.setSearchParams();
    grp_msg_data_det0b014Ref.current?.handleSearch({});
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
        !Array.isArray(grp_msg_data_det0b014) &&
        Object.keys(grp_msg_data_det0b014)?.length > 0
      ) {
        setgrp_msg_data_det0b014({})
        setgrp_msg_data_det0b014Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_msg_data_det0b014Props?.refresh])


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
        gridColumn: '1 / 25',
        gridRow: '14 / 116',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewmessagedata_v1((pre:any)=>({...pre,_selectedGroup_:"grp_msg_data_det"}))
        }}
    >
          {allowedControls.includes("hdr_info") ?<Texthdr_info   /* ed594 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("msg_xmlviewer") ?<XmlViewermsg_xmlviewer   /* a94fb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider3") ?<Dividerdivider3   /* 7feba */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "btn_okay" in ButtonGoRuleData)?ButtonGoRuleData["btn_okay"]:true) && 
          allowedControls.includes("btn_okay")  ?            <Buttonbtn_okay tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgrp_msg_data_det
