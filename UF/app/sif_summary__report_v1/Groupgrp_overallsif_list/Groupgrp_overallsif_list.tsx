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
import Grouptbl_sif_list  from "../Grouptbl_sif_list/Grouptbl_sif_list";
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
import Texttext_head  from "./Texttext_head";
import Buttonbtn_search  from "./Buttonbtn_search";
import Buttonbtn_export_as_excel  from "./Buttonbtn_export_as_excel";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_overallsif_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sifsummaryreport_v1Props, setdfd_sifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [
      "text_head",
      "btn_search",
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_sif_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "text_head",
      "btn_search",
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_sif_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "text_head",
      "btn_search",
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_sif_list"
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
  const {grp_overallsif_list46e94, setgrp_overallsif_list46e94}= useContext(TotalContext) as TotalContextProps;
  const {grp_overallsif_list46e94Props, setgrp_overallsif_list46e94Props}= useContext(TotalContext) as TotalContextProps;
  const {text_head38a37, settext_head38a37}= useContext(TotalContext) as TotalContextProps;
  const {btn_search3c2e1, setbtn_search3c2e1}= useContext(TotalContext) as TotalContextProps;
  const {btn_export_as_excelb2d92, setbtn_export_as_excelb2d92}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fc, settbl_sif_list592fc}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fcProps, settbl_sif_list592fcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {sifsummaryreport_v1, setsifsummaryreport_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1',
    [user],
    'GroupGrpOverallsifList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8916b5c08386bf78c05057a486d46e94");
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
    setgrp_overallsif_list46e94Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text_head")){
        settext_head38a37((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_head38a37?.isDisabled==null)
      {
        settext_head38a37((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_search")){
        setbtn_search3c2e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_search3c2e1?.isDisabled==null)
      {
        setbtn_search3c2e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_export_as_excel")){
        setbtn_export_as_excelb2d92((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_export_as_excelb2d92?.isDisabled==null)
      {
        setbtn_export_as_excelb2d92((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tbl_sif_list")){
        settbl_sif_list592fcProps((pre:any)=>({...pre,...tbl_sif_list592fc,isDisabled:true}));

    }else
    {
      if(tbl_sif_list592fc?.isDisabled==null)
      {
        settbl_sif_list592fcProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_overallsif_list'] = grp_overallsif_list46e94,
        codeStates['setgrp_overallsif_list'] = setgrp_overallsif_list46e94,
        codeStates['grp_overallsif_list46e94'] = grp_overallsif_list46e94Props,
        codeStates['setgrp_overallsif_list46e94'] = setgrp_overallsif_list46e94Props,
        codeStates['text_head'] = text_head38a37,
        codeStates['settext_head'] = settext_head38a37,
        codeStates['btn_search'] = btn_search3c2e1,
        codeStates['setbtn_search'] = setbtn_search3c2e1,
        codeStates['btn_export_as_excel'] = btn_export_as_excelb2d92,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excelb2d92,
        codeStates['tbl_sif_list'] = tbl_sif_list592fc,
        codeStates['settbl_sif_list'] = settbl_sif_list592fc,
        codeStates['tbl_sif_list592fc'] = tbl_sif_list592fcProps,
        codeStates['settbl_sif_list592fc'] = settbl_sif_list592fcProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8916b5c08386bf78c05057a486d46e94");
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
        codeStates['grp_overallsif_list'] = grp_overallsif_list46e94,
        codeStates['setgrp_overallsif_list'] = setgrp_overallsif_list46e94,
        codeStates['grp_overallsif_list46e94'] = grp_overallsif_list46e94Props,
        codeStates['setgrp_overallsif_list46e94'] = setgrp_overallsif_list46e94Props,
        codeStates['text_head'] = text_head38a37,
        codeStates['settext_head'] = settext_head38a37,
        codeStates['btn_search'] = btn_search3c2e1,
        codeStates['setbtn_search'] = setbtn_search3c2e1,
        codeStates['btn_export_as_excel'] = btn_export_as_excelb2d92,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excelb2d92,
        codeStates['tbl_sif_list'] = tbl_sif_list592fc,
        codeStates['settbl_sif_list'] = settbl_sif_list592fc,
        codeStates['tbl_sif_list592fc'] = tbl_sif_list592fcProps,
        codeStates['settbl_sif_list592fc'] = settbl_sif_list592fcProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_overallsif_list46e94Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_overallsif_list46e94Ref.current?.setSearchParams();
    grp_overallsif_list46e94Ref.current?.handleSearch({});
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
        !Array.isArray(grp_overallsif_list46e94) &&
        Object.keys(grp_overallsif_list46e94)?.length > 0
      ) {
        setgrp_overallsif_list46e94({})
        setgrp_overallsif_list46e94Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_overallsif_list46e94Props?.refresh])


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
        gridRow: '1 / 147',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !bg-white ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setsifsummaryreport_v1((pre:any)=>({...pre,_selectedGroup_:"grp_overallsif_list"}))
        }}
    >
        {allowedComponent.includes("tbl_sif_list")  &&<Grouptbl_sif_list  
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
          {allowedControls.includes("text_head") ?<Texttext_head   /* 38a37 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "btn_search" in ButtonGoRuleData)?ButtonGoRuleData["btn_search"]:true) && 
          allowedControls.includes("btn_search")  ?            <Buttonbtn_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "btn_export_as_excel" in ButtonGoRuleData)?ButtonGoRuleData["btn_export_as_excel"]:true) && 
          allowedControls.includes("btn_export_as_excel")  ?            <Buttonbtn_export_as_excel tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgrp_overallsif_list
