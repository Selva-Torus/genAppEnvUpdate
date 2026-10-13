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
import Grouptbl_emp_sal_list  from "../Grouptbl_emp_sal_list/Grouptbl_emp_sal_list";
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
import Buttonbtn_export_as_excel  from "./Buttonbtn_export_as_excel";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_overall_employee_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_enquiryemployersalaryrpt_v1Props, setdfd_enquiryemployersalaryrpt_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "btn_back",
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "btn_back",
      "btn_export_as_excel"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overall_employee_list",
      "tbl_emp_sal_list"
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
  const {grp_overall_employee_list350f4, setgrp_overall_employee_list350f4}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_employee_list350f4Props, setgrp_overall_employee_list350f4Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_backdb4f7, setbtn_backdb4f7}= useContext(TotalContext) as TotalContextProps;
  const {btn_export_as_excelf9ac3, setbtn_export_as_excelf9ac3}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67ed, settbl_emp_sal_listf67ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_sal_listf67edProps, settbl_emp_sal_listf67edProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiryempsalrpt_v1, setenquiryempsalrpt_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpSalRPT:AFVK:v1',
    [user],
    'GroupGrpOverallEmployeeList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c368a37b1be795efe6568259f77350f4");
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
    setgrp_overall_employee_list350f4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("btn_back")){
        setbtn_backdb4f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_backdb4f7?.isDisabled==null)
      {
        setbtn_backdb4f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("btn_export_as_excel")){
        setbtn_export_as_excelf9ac3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(btn_export_as_excelf9ac3?.isDisabled==null)
      {
        setbtn_export_as_excelf9ac3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tbl_emp_sal_list")){
        settbl_emp_sal_listf67edProps((pre:any)=>({...pre,...tbl_emp_sal_listf67ed,isDisabled:true}));

    }else
    {
      if(tbl_emp_sal_listf67ed?.isDisabled==null)
      {
        settbl_emp_sal_listf67edProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_overall_employee_list'] = grp_overall_employee_list350f4,
        codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list350f4,
        codeStates['grp_overall_employee_list350f4'] = grp_overall_employee_list350f4Props,
        codeStates['setgrp_overall_employee_list350f4'] = setgrp_overall_employee_list350f4Props,
        codeStates['btn_back'] = btn_backdb4f7,
        codeStates['setbtn_back'] = setbtn_backdb4f7,
        codeStates['btn_export_as_excel'] = btn_export_as_excelf9ac3,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excelf9ac3,
        codeStates['tbl_emp_sal_list'] = tbl_emp_sal_listf67ed,
        codeStates['settbl_emp_sal_list'] = settbl_emp_sal_listf67ed,
        codeStates['tbl_emp_sal_listf67ed'] = tbl_emp_sal_listf67edProps,
        codeStates['settbl_emp_sal_listf67ed'] = settbl_emp_sal_listf67edProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "c368a37b1be795efe6568259f77350f4");
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
        codeStates['grp_overall_employee_list'] = grp_overall_employee_list350f4,
        codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list350f4,
        codeStates['grp_overall_employee_list350f4'] = grp_overall_employee_list350f4Props,
        codeStates['setgrp_overall_employee_list350f4'] = setgrp_overall_employee_list350f4Props,
        codeStates['btn_back'] = btn_backdb4f7,
        codeStates['setbtn_back'] = setbtn_backdb4f7,
        codeStates['btn_export_as_excel'] = btn_export_as_excelf9ac3,
        codeStates['setbtn_export_as_excel'] = setbtn_export_as_excelf9ac3,
        codeStates['tbl_emp_sal_list'] = tbl_emp_sal_listf67ed,
        codeStates['settbl_emp_sal_list'] = settbl_emp_sal_listf67ed,
        codeStates['tbl_emp_sal_listf67ed'] = tbl_emp_sal_listf67edProps,
        codeStates['settbl_emp_sal_listf67ed'] = settbl_emp_sal_listf67edProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_overall_employee_list350f4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_overall_employee_list350f4Ref.current?.setSearchParams();
    grp_overall_employee_list350f4Ref.current?.handleSearch({});
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
        !Array.isArray(grp_overall_employee_list350f4) &&
        Object.keys(grp_overall_employee_list350f4)?.length > 0
      ) {
        setgrp_overall_employee_list350f4({})
        setgrp_overall_employee_list350f4Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_overall_employee_list350f4Props?.refresh])


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
        gridRow: '1 / 144',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setenquiryempsalrpt_v1((pre:any)=>({...pre,_selectedGroup_:"grp_overall_employee_list"}))
        }}
    >
        {allowedComponent.includes("tbl_emp_sal_list")  &&<Grouptbl_emp_sal_list  
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
        {        ((ruleData?.length>0 && "btn_export_as_excel" in ButtonGoRuleData)?ButtonGoRuleData["btn_export_as_excel"]:true) && 
          allowedControls.includes("btn_export_as_excel")  ?            <Buttonbtn_export_as_excel tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgrp_overall_employee_list
