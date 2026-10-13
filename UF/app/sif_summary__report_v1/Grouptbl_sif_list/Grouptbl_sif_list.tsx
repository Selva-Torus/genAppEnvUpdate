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
import Tabletbl_sif_list  from './Tabletbl_sif_list';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptbl_sif_list = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "col_org_file_name",
      "col_sf_file_name",
      "col_empr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_sf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
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
      "col_org_file_name",
      "col_sf_file_name",
      "col_empr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_sf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
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
      "col_org_file_name",
      "col_sf_file_name",
      "col_empr_id",
      "col_corp_name",
      "col_dr_acc",
      "col_tot_rcd",
      "col_sf_file_amnt",
      "col_sal_mnth",
      "col_sal_year"
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
  const {tbl_sif_list592fc, settbl_sif_list592fc}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fcProps, settbl_sif_list592fcProps}= useContext(TotalContext) as TotalContextProps;
  const {col_org_file_namee9218, setcol_org_file_namee9218}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_name2de87, setcol_sf_file_name2de87}= useContext(TotalContext) as TotalContextProps;
  const {col_empr_id3b1f4, setcol_empr_id3b1f4}= useContext(TotalContext) as TotalContextProps;
  const {col_corp_nameecc38, setcol_corp_nameecc38}= useContext(TotalContext) as TotalContextProps;
  const {col_dr_acca3ca2, setcol_dr_acca3ca2}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_rcd0a298, setcol_tot_rcd0a298}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_amnt7be09, setcol_sf_file_amnt7be09}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_mnthc23c3, setcol_sal_mnthc23c3}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_year592c0, setcol_sal_year592c0}= useContext(TotalContext) as TotalContextProps;
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
    'GroupTblSifList',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3223b803404c8de9944f527b37b592fc");
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
    settbl_sif_list592fcProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("col_org_file_name")){
        setcol_org_file_namee9218((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_org_file_namee9218?.isDisabled==null)
      {
        setcol_org_file_namee9218((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sf_file_name")){
        setcol_sf_file_name2de87((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sf_file_name2de87?.isDisabled==null)
      {
        setcol_sf_file_name2de87((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_empr_id")){
        setcol_empr_id3b1f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_empr_id3b1f4?.isDisabled==null)
      {
        setcol_empr_id3b1f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_corp_name")){
        setcol_corp_nameecc38((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_corp_nameecc38?.isDisabled==null)
      {
        setcol_corp_nameecc38((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_dr_acc")){
        setcol_dr_acca3ca2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_dr_acca3ca2?.isDisabled==null)
      {
        setcol_dr_acca3ca2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_tot_rcd")){
        setcol_tot_rcd0a298((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_tot_rcd0a298?.isDisabled==null)
      {
        setcol_tot_rcd0a298((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sf_file_amnt")){
        setcol_sf_file_amnt7be09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sf_file_amnt7be09?.isDisabled==null)
      {
        setcol_sf_file_amnt7be09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_mnth")){
        setcol_sal_mnthc23c3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_mnthc23c3?.isDisabled==null)
      {
        setcol_sal_mnthc23c3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("col_sal_year")){
        setcol_sal_year592c0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(col_sal_year592c0?.isDisabled==null)
      {
        setcol_sal_year592c0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3223b803404c8de9944f527b37b592fc");
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
        codeStates['tbl_sif_list'] = tbl_sif_list592fc,
        codeStates['settbl_sif_list'] = settbl_sif_list592fc,
        codeStates['tbl_sif_list592fc'] = tbl_sif_list592fcProps,
        codeStates['settbl_sif_list592fc'] = settbl_sif_list592fcProps,
        codeStates['col_org_file_name'] = col_org_file_namee9218,
        codeStates['setcol_org_file_name'] = setcol_org_file_namee9218,
        codeStates['col_sf_file_name'] = col_sf_file_name2de87,
        codeStates['setcol_sf_file_name'] = setcol_sf_file_name2de87,
        codeStates['col_empr_id'] = col_empr_id3b1f4,
        codeStates['setcol_empr_id'] = setcol_empr_id3b1f4,
        codeStates['col_corp_name'] = col_corp_nameecc38,
        codeStates['setcol_corp_name'] = setcol_corp_nameecc38,
        codeStates['col_dr_acc'] = col_dr_acca3ca2,
        codeStates['setcol_dr_acc'] = setcol_dr_acca3ca2,
        codeStates['col_tot_rcd'] = col_tot_rcd0a298,
        codeStates['setcol_tot_rcd'] = setcol_tot_rcd0a298,
        codeStates['col_sf_file_amnt'] = col_sf_file_amnt7be09,
        codeStates['setcol_sf_file_amnt'] = setcol_sf_file_amnt7be09,
        codeStates['col_sal_mnth'] = col_sal_mnthc23c3,
        codeStates['setcol_sal_mnth'] = setcol_sal_mnthc23c3,
        codeStates['col_sal_year'] = col_sal_year592c0,
        codeStates['setcol_sal_year'] = setcol_sal_year592c0,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tbl_sif_list592fcRef = useRef<any>(null);
  const handleClearSearch = () => {
    tbl_sif_list592fcRef.current?.setSearchParams();
    tbl_sif_list592fcRef.current?.handleSearch({});
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
        !Array.isArray(tbl_sif_list592fc) &&
        Object.keys(tbl_sif_list592fc)?.length > 0
      ) {
        settbl_sif_list592fc({})
        settbl_sif_list592fcProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tbl_sif_list592fcProps?.refresh])


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
          setsifsummaryreport_v1((pre:any)=>({...pre,_selectedGroup_:"tbl_sif_list"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletbl_sif_list headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tbl_sif_list592fcRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptbl_sif_list
