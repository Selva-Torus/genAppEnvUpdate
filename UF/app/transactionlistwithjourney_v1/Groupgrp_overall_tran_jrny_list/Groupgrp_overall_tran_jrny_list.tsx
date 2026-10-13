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
import Grouptbl_tran_jrny_list  from "../Grouptbl_tran_jrny_list/Grouptbl_tran_jrny_list";
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
import Buttonbtn_back  from "./Buttonbtn_back";
import TimeLinetrn_jrny  from "./TimeLinetrn_jrny";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_overall_tran_jrny_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_sfjourneyviewtransaction_v1Props, setdfd_sfjourneyviewtransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_tranjourney_v1Props, setdfd_tranjourney_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "btn_back",
      "trn_jrny"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "btn_back",
      "trn_jrny"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "btn_back",
      "trn_jrny"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_tran_jrny_list",
      "tbl_tran_jrny_list"
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
  const {grp_overall_tran_jrny_list67aa9, setgrp_overall_tran_jrny_list67aa9}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_jrny_list67aa9Props, setgrp_overall_tran_jrny_list67aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_back886c3, setbtn_back886c3}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62f, settbl_tran_jrny_list6d62f}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62fProps, settbl_tran_jrny_list6d62fProps}= useContext(TotalContext) as TotalContextProps;
  const {trn_jrny23739, settrn_jrny23739}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {transactionlistwithjourney_v1, settransactionlistwithjourney_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionListWithJourney:AFVK:v1',
    [user],
    'GroupGrpOverallTranJrnyList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dd9490e33a4cbd3ca6f1680c3a167aa9");
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
    setgrp_overall_tran_jrny_list67aa9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_back886c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_back886c3?.isDisabled==null)
      {
        setbtn_back886c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tbl_tran_jrny_list")){
        settbl_tran_jrny_list6d62fProps((pre:any)=>({...pre,...tbl_tran_jrny_list6d62f,isDisabled:true}));

    }else
    {
      if(tbl_tran_jrny_list6d62f?.isDisabled==null)
      {
        settbl_tran_jrny_list6d62fProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trn_jrny")){
        settrn_jrny23739((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(trn_jrny23739?.isDisabled==null)
      {
        settrn_jrny23739((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_overall_tran_jrny_list'] = grp_overall_tran_jrny_list67aa9,
        codeStates['setgrp_overall_tran_jrny_list'] = setgrp_overall_tran_jrny_list67aa9,
        codeStates['grp_overall_tran_jrny_list67aa9'] = grp_overall_tran_jrny_list67aa9Props,
        codeStates['setgrp_overall_tran_jrny_list67aa9'] = setgrp_overall_tran_jrny_list67aa9Props,
        codeStates['btn_back'] = btn_back886c3,
        codeStates['setbtn_back'] = setbtn_back886c3,
        codeStates['tbl_tran_jrny_list'] = tbl_tran_jrny_list6d62f,
        codeStates['settbl_tran_jrny_list'] = settbl_tran_jrny_list6d62f,
        codeStates['tbl_tran_jrny_list6d62f'] = tbl_tran_jrny_list6d62fProps,
        codeStates['settbl_tran_jrny_list6d62f'] = settbl_tran_jrny_list6d62fProps,
        codeStates['trn_jrny'] = trn_jrny23739,
        codeStates['settrn_jrny'] = settrn_jrny23739,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dd9490e33a4cbd3ca6f1680c3a167aa9");
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
        codeStates['grp_overall_tran_jrny_list'] = grp_overall_tran_jrny_list67aa9,
        codeStates['setgrp_overall_tran_jrny_list'] = setgrp_overall_tran_jrny_list67aa9,
        codeStates['grp_overall_tran_jrny_list67aa9'] = grp_overall_tran_jrny_list67aa9Props,
        codeStates['setgrp_overall_tran_jrny_list67aa9'] = setgrp_overall_tran_jrny_list67aa9Props,
        codeStates['btn_back'] = btn_back886c3,
        codeStates['setbtn_back'] = setbtn_back886c3,
        codeStates['tbl_tran_jrny_list'] = tbl_tran_jrny_list6d62f,
        codeStates['settbl_tran_jrny_list'] = settbl_tran_jrny_list6d62f,
        codeStates['tbl_tran_jrny_list6d62f'] = tbl_tran_jrny_list6d62fProps,
        codeStates['settbl_tran_jrny_list6d62f'] = settbl_tran_jrny_list6d62fProps,
        codeStates['trn_jrny'] = trn_jrny23739,
        codeStates['settrn_jrny'] = settrn_jrny23739,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_overall_tran_jrny_list67aa9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_overall_tran_jrny_list67aa9Ref.current?.setSearchParams();
    grp_overall_tran_jrny_list67aa9Ref.current?.handleSearch({});
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
        !Array.isArray(grp_overall_tran_jrny_list67aa9) &&
        Object.keys(grp_overall_tran_jrny_list67aa9)?.length > 0
      ) {
        setgrp_overall_tran_jrny_list67aa9({})
        setgrp_overall_tran_jrny_list67aa9Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_overall_tran_jrny_list67aa9Props?.refresh])


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
        gridRow: '1 / 158',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
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
          settransactionlistwithjourney_v1((pre:any)=>({...pre,_selectedGroup_:"grp_overall_tran_jrny_list"}))
        }}
    >
        {allowedComponent.includes("tbl_tran_jrny_list")  &&<Grouptbl_tran_jrny_list  
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
        {        ((ruleData?.length>0 && "btn_back" in ButtonGoRuleData)?ButtonGoRuleData["btn_back"]:true) && 
          allowedControls.includes("btn_back")  ?            <Buttonbtn_back tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {allowedControls.includes("trn_jrny") ?<TimeLinetrn_jrny   /* 23739 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrp_overall_tran_jrny_list
