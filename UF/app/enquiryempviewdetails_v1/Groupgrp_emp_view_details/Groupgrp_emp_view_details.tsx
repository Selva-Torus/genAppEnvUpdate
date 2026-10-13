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
import Groupgrp_emp_details  from "../Groupgrp_emp_details/Groupgrp_emp_details";
import Groupgrp_other_details  from "../Groupgrp_other_details/Groupgrp_other_details";
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
import Texthdr_view_details  from "./Texthdr_view_details";
import Dividerdivider  from "./Dividerdivider";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgrp_emp_view_details = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  "Business Team": {
    "allowedControls": [
      "hdr_view_details",
      "divider"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Team": {
    "allowedControls": [
      "hdr_view_details",
      "divider"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Team": {
    "allowedControls": [
      "hdr_view_details",
      "divider"
    ],
    "allowedGroups": [
      "canvas",
      "grp_emp_view_details",
      "grp_emp_details",
      "grp_other_details"
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
  const {grp_emp_view_details7cca5, setgrp_emp_view_details7cca5}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_view_details7cca5Props, setgrp_emp_view_details7cca5Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_view_detailsde0ef, sethdr_view_detailsde0ef}= useContext(TotalContext) as TotalContextProps;
  const {divider85e5a, setdivider85e5a}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3, setgrp_emp_details5bbf3}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details5bbf3Props, setgrp_emp_details5bbf3Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3, setgrp_other_details0dea3}= useContext(TotalContext) as TotalContextProps;
  const {grp_other_details0dea3Props, setgrp_other_details0dea3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {enquiryempviewdetails_v1, setenquiryempviewdetails_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpViewDetails:AFVK:v1',
    [user],
    'GroupGrpEmpViewDetails',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1b2406e1f766e7a49fdfbfc9c357cca5");
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
    setgrp_emp_view_details7cca5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("hdr_view_details")){
        sethdr_view_detailsde0ef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(hdr_view_detailsde0ef?.isDisabled==null)
      {
        sethdr_view_detailsde0ef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider85e5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider85e5a?.isDisabled==null)
      {
        setdivider85e5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grp_emp_details")){
        setgrp_emp_details5bbf3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grp_emp_details5bbf3?.isDisabled==null)
      {
        setgrp_emp_details5bbf3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grp_other_details")){
        setgrp_other_details0dea3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grp_other_details0dea3?.isDisabled==null)
      {
        setgrp_other_details0dea3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['grp_emp_view_details'] = grp_emp_view_details7cca5,
        codeStates['setgrp_emp_view_details'] = setgrp_emp_view_details7cca5,
        codeStates['grp_emp_view_details7cca5'] = grp_emp_view_details7cca5Props,
        codeStates['setgrp_emp_view_details7cca5'] = setgrp_emp_view_details7cca5Props,
        codeStates['hdr_view_details'] = hdr_view_detailsde0ef,
        codeStates['sethdr_view_details'] = sethdr_view_detailsde0ef,
        codeStates['divider'] = divider85e5a,
        codeStates['setdivider'] = setdivider85e5a,
        codeStates['grp_emp_details'] = grp_emp_details5bbf3,
        codeStates['setgrp_emp_details'] = setgrp_emp_details5bbf3,
        codeStates['grp_emp_details5bbf3'] = grp_emp_details5bbf3Props,
        codeStates['setgrp_emp_details5bbf3'] = setgrp_emp_details5bbf3Props,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1b2406e1f766e7a49fdfbfc9c357cca5");
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
        codeStates['grp_emp_view_details'] = grp_emp_view_details7cca5,
        codeStates['setgrp_emp_view_details'] = setgrp_emp_view_details7cca5,
        codeStates['grp_emp_view_details7cca5'] = grp_emp_view_details7cca5Props,
        codeStates['setgrp_emp_view_details7cca5'] = setgrp_emp_view_details7cca5Props,
        codeStates['hdr_view_details'] = hdr_view_detailsde0ef,
        codeStates['sethdr_view_details'] = sethdr_view_detailsde0ef,
        codeStates['divider'] = divider85e5a,
        codeStates['setdivider'] = setdivider85e5a,
        codeStates['grp_emp_details'] = grp_emp_details5bbf3,
        codeStates['setgrp_emp_details'] = setgrp_emp_details5bbf3,
        codeStates['grp_emp_details5bbf3'] = grp_emp_details5bbf3Props,
        codeStates['setgrp_emp_details5bbf3'] = setgrp_emp_details5bbf3Props,
        codeStates['grp_other_details'] = grp_other_details0dea3,
        codeStates['setgrp_other_details'] = setgrp_other_details0dea3,
        codeStates['grp_other_details0dea3'] = grp_other_details0dea3Props,
        codeStates['setgrp_other_details0dea3'] = setgrp_other_details0dea3Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const grp_emp_view_details7cca5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    grp_emp_view_details7cca5Ref.current?.setSearchParams();
    grp_emp_view_details7cca5Ref.current?.handleSearch({});
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
        !Array.isArray(grp_emp_view_details7cca5) &&
        Object.keys(grp_emp_view_details7cca5)?.length > 0
      ) {
        setgrp_emp_view_details7cca5({})
        setgrp_emp_view_details7cca5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [grp_emp_view_details7cca5Props?.refresh])


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
        gridColumn: '1 / 23',
        gridRow: '1 / 142',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
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
          setenquiryempviewdetails_v1((pre:any)=>({...pre,_selectedGroup_:"grp_emp_view_details"}))
        }}
    >
        {allowedComponent.includes("grp_emp_details")  &&<Groupgrp_emp_details  
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
        {allowedComponent.includes("grp_other_details")  &&<Groupgrp_other_details  
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
          {allowedControls.includes("hdr_view_details") ?<Texthdr_view_details   /* de0ef */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 85e5a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgrp_emp_view_details
