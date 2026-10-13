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
import Tabletbl_pif_list  from './Tabletbl_pif_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_pif_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_pifsummaryreport_v1Props, setdfd_pifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "col_pif_file_name",
      "col_emplr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_pf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_pif_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_pif_file_name",
      "col_emplr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_pf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_pif_list"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_pif_file_name",
      "col_emplr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_pf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
    ],
    "allowedGroups": [
      "canvas",
      "grp_overallsif_list",
      "tbl_pif_list"
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
  const {grp_overallsif_list6060c, setgrp_overallsif_list6060c}= useContext(TotalContext) as TotalContextProps;
  const {grp_overallsif_list6060cProps, setgrp_overallsif_list6060cProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653ae, settbl_pif_list653ae}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653aeProps, settbl_pif_list653aeProps}= useContext(TotalContext) as TotalContextProps;
  const {col_pif_file_namee99d8, setcol_pif_file_namee99d8}= useContext(TotalContext) as TotalContextProps;
  const {col_emplr_ida847f, setcol_emplr_ida847f}= useContext(TotalContext) as TotalContextProps;
  const {col_corp_name9e9f0, setcol_corp_name9e9f0}= useContext(TotalContext) as TotalContextProps;
  const {col_dr_acc2afa8, setcol_dr_acc2afa8}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_rcd8b718, setcol_tot_rcd8b718}= useContext(TotalContext) as TotalContextProps;
  const {col_pf_file_amnt5e967, setcol_pf_file_amnt5e967}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_mnthba9cc, setcol_sal_mnthba9cc}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_yeara098c, setcol_sal_yeara098c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {pifsummaryreport_v1, setpifsummaryreport_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1',
    [user],
    'GroupTblPifList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "10f2b7bfb9926e57601777dfe3a653ae");
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
    settbl_pif_list653aeProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_pif_file_name")){
        setcol_pif_file_namee99d8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_pif_file_namee99d8?.isDisabled==null)
      {
        setcol_pif_file_namee99d8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_emplr_id")){
        setcol_emplr_ida847f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_emplr_ida847f?.isDisabled==null)
      {
        setcol_emplr_ida847f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_corp_name")){
        setcol_corp_name9e9f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_corp_name9e9f0?.isDisabled==null)
      {
        setcol_corp_name9e9f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_dr_acc")){
        setcol_dr_acc2afa8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_dr_acc2afa8?.isDisabled==null)
      {
        setcol_dr_acc2afa8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_rcd")){
        setcol_tot_rcd8b718((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_rcd8b718?.isDisabled==null)
      {
        setcol_tot_rcd8b718((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_pf_file_amnt")){
        setcol_pf_file_amnt5e967((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_pf_file_amnt5e967?.isDisabled==null)
      {
        setcol_pf_file_amnt5e967((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_mnth")){
        setcol_sal_mnthba9cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_mnthba9cc?.isDisabled==null)
      {
        setcol_sal_mnthba9cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_year")){
        setcol_sal_yeara098c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_yeara098c?.isDisabled==null)
      {
        setcol_sal_yeara098c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "10f2b7bfb9926e57601777dfe3a653ae");
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
        codeStates['grp_overallsif_list'] = grp_overallsif_list6060c,
        codeStates['setgrp_overallsif_list'] = setgrp_overallsif_list6060c,
        codeStates['grp_overallsif_list6060c'] = grp_overallsif_list6060cProps,
        codeStates['setgrp_overallsif_list6060c'] = setgrp_overallsif_list6060cProps,
        codeStates['tbl_pif_list'] = tbl_pif_list653ae,
        codeStates['settbl_pif_list'] = settbl_pif_list653ae,
        codeStates['tbl_pif_list653ae'] = tbl_pif_list653aeProps,
        codeStates['settbl_pif_list653ae'] = settbl_pif_list653aeProps,
        codeStates['col_pif_file_name'] = col_pif_file_namee99d8,
        codeStates['setcol_pif_file_name'] = setcol_pif_file_namee99d8,
        codeStates['col_emplr_id'] = col_emplr_ida847f,
        codeStates['setcol_emplr_id'] = setcol_emplr_ida847f,
        codeStates['col_corp_name'] = col_corp_name9e9f0,
        codeStates['setcol_corp_name'] = setcol_corp_name9e9f0,
        codeStates['col_dr_acc'] = col_dr_acc2afa8,
        codeStates['setcol_dr_acc'] = setcol_dr_acc2afa8,
        codeStates['col_tot_rcd'] = col_tot_rcd8b718,
        codeStates['setcol_tot_rcd'] = setcol_tot_rcd8b718,
        codeStates['col_pf_file_amnt'] = col_pf_file_amnt5e967,
        codeStates['setcol_pf_file_amnt'] = setcol_pf_file_amnt5e967,
        codeStates['col_sal_mnth'] = col_sal_mnthba9cc,
        codeStates['setcol_sal_mnth'] = setcol_sal_mnthba9cc,
        codeStates['col_sal_year'] = col_sal_yeara098c,
        codeStates['setcol_sal_year'] = setcol_sal_yeara098c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_pif_list653aeRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_pif_list653aeRef.current?.setSearchParams();
    tbl_pif_list653aeRef.current?.handleSearch({});
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
        !Array.isArray(tbl_pif_list653ae) &&
        Object.keys(tbl_pif_list653ae)?.length > 0
      ) {
        settbl_pif_list653ae({})
        settbl_pif_list653aeProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_pif_list653aeProps?.refresh])


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
        gridRow: '12 / 146',
      
        //rowGap: '0px',
        overflow: 'visible',
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
          setpifsummaryreport_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_pif_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_pif_list headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_pif_list653aeRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_pif_list
