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
import Textamr_queue_text  from "./Textamr_queue_text";
import Iconicon_total_assest  from "./Iconicon_total_assest";
import Textamr_queue  from "./Textamr_queue";
import Textamr_queue_desc  from "./Textamr_queue_desc";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupamr_queue_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  let code:any = `settable_group((pre)=>({status:"amr_queue_group"}))`;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_amrqueuedashboard_v1Props, setdfd_amrqueuedashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_pendingfilingsdashboard_v1Props, setdfd_pendingfilingsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cardsdashboard_v1Props, setdfd_cardsdashboard_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Branch Manager": {
    "allowedControls": [
      "amr_queue_text",
      "icon_total_assest",
      "amr_queue",
      "amr_queue_desc"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "asset_dashboard_group",
      "amr_queue_group",
      "pending_file_group",
      "service_pending_group",
      "slas_at_risk_group",
      "court_rejection_group",
      "collected_mtd_group",
      "overall_key_performance_indicators",
      "key_performance_indicator_group",
      "recent_activity_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "amr_queue_text",
      "icon_total_assest",
      "amr_queue",
      "amr_queue_desc"
    ],
    "allowedGroups": [
      "canvas",
      "header_group",
      "asset_dashboard_group",
      "amr_queue_group",
      "pending_file_group",
      "service_pending_group",
      "slas_at_risk_group",
      "court_rejection_group",
      "collected_mtd_group",
      "overall_key_performance_indicators",
      "key_performance_indicator_group",
      "recent_activity_group"
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
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {header_groupd8ba9, setheader_groupd8ba9}= useContext(TotalContext) as TotalContextProps;
  const {header_groupd8ba9Props, setheader_groupd8ba9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03, setasset_dashboard_group1aa03}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group1aa03Props, setasset_dashboard_group1aa03Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082, setamr_queue_group3c082}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group3c082Props, setamr_queue_group3c082Props}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_text17149, setamr_queue_text17149}= useContext(TotalContext) as TotalContextProps;
  const {icon_total_assest42cc7, seticon_total_assest42cc7}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue0e5a7, setamr_queue0e5a7}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_desc10020, setamr_queue_desc10020}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128c, setpending_file_group2128c}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_group2128cProps, setpending_file_group2128cProps}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0ca, setservice_pending_group8c0ca}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group8c0caProps, setservice_pending_group8c0caProps}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0, setslas_at_risk_group1f8c0}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group1f8c0Props, setslas_at_risk_group1f8c0Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57a, setcourt_rejection_groupdf57a}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupdf57aProps, setcourt_rejection_groupdf57aProps}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074, setcollected_mtd_group0f074}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group0f074Props, setcollected_mtd_group0f074Props}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711, setoverall_key_performance_indicatorsc2711}= useContext(TotalContext) as TotalContextProps;
  const {overall_key_performance_indicatorsc2711Props, setoverall_key_performance_indicatorsc2711Props}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eaf, setkey_performance_indicator_groupf9eaf}= useContext(TotalContext) as TotalContextProps;
  const {key_performance_indicator_groupf9eafProps, setkey_performance_indicator_groupf9eafProps}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6, setrecent_activity_group91db6}= useContext(TotalContext) as TotalContextProps;
  const {recent_activity_group91db6Props, setrecent_activity_group91db6Props}= useContext(TotalContext) as TotalContextProps;
  const {amrqueuetable_v1Props, setamrqueuetable_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newdashboard_v1, setnewdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1',
    [user],
    'GroupAmrQueueGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f170065b4847c2c49b4c4ae55023c082");
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
    setamr_queue_group3c082Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("amr_queue_text")){
        setamr_queue_text17149((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queue_text17149?.isDisabled==null)
      {
        setamr_queue_text17149((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("icon_total_assest")){
        seticon_total_assest42cc7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(icon_total_assest42cc7?.isDisabled==null)
      {
        seticon_total_assest42cc7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_queue")){
        setamr_queue0e5a7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queue0e5a7?.isDisabled==null)
      {
        setamr_queue0e5a7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_queue_desc")){
        setamr_queue_desc10020((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queue_desc10020?.isDisabled==null)
      {
        setamr_queue_desc10020((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupd8ba9,
        codeStates['setheader_group'] = setheader_groupd8ba9,
        codeStates['header_groupd8ba9'] = header_groupd8ba9Props,
        codeStates['setheader_groupd8ba9'] = setheader_groupd8ba9Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group1aa03,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group1aa03,
        codeStates['asset_dashboard_group1aa03'] = asset_dashboard_group1aa03Props,
        codeStates['setasset_dashboard_group1aa03'] = setasset_dashboard_group1aa03Props,
        codeStates['amr_queue_group'] = amr_queue_group3c082,
        codeStates['setamr_queue_group'] = setamr_queue_group3c082,
        codeStates['amr_queue_group3c082'] = amr_queue_group3c082Props,
        codeStates['setamr_queue_group3c082'] = setamr_queue_group3c082Props,
        codeStates['amr_queue_text'] = amr_queue_text17149,
        codeStates['setamr_queue_text'] = setamr_queue_text17149,
        codeStates['icon_total_assest'] = icon_total_assest42cc7,
        codeStates['seticon_total_assest'] = seticon_total_assest42cc7,
        codeStates['amr_queue'] = amr_queue0e5a7,
        codeStates['setamr_queue'] = setamr_queue0e5a7,
        codeStates['amr_queue_desc'] = amr_queue_desc10020,
        codeStates['setamr_queue_desc'] = setamr_queue_desc10020,
        codeStates['pending_file_group'] = pending_file_group2128c,
        codeStates['setpending_file_group'] = setpending_file_group2128c,
        codeStates['pending_file_group2128c'] = pending_file_group2128cProps,
        codeStates['setpending_file_group2128c'] = setpending_file_group2128cProps,
        codeStates['service_pending_group'] = service_pending_group8c0ca,
        codeStates['setservice_pending_group'] = setservice_pending_group8c0ca,
        codeStates['service_pending_group8c0ca'] = service_pending_group8c0caProps,
        codeStates['setservice_pending_group8c0ca'] = setservice_pending_group8c0caProps,
        codeStates['slas_at_risk_group'] = slas_at_risk_group1f8c0,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group1f8c0,
        codeStates['slas_at_risk_group1f8c0'] = slas_at_risk_group1f8c0Props,
        codeStates['setslas_at_risk_group1f8c0'] = setslas_at_risk_group1f8c0Props,
        codeStates['court_rejection_group'] = court_rejection_groupdf57a,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupdf57a,
        codeStates['court_rejection_groupdf57a'] = court_rejection_groupdf57aProps,
        codeStates['setcourt_rejection_groupdf57a'] = setcourt_rejection_groupdf57aProps,
        codeStates['collected_mtd_group'] = collected_mtd_group0f074,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group0f074,
        codeStates['collected_mtd_group0f074'] = collected_mtd_group0f074Props,
        codeStates['setcollected_mtd_group0f074'] = setcollected_mtd_group0f074Props,
        codeStates['overall_key_performance_indicators'] = overall_key_performance_indicatorsc2711,
        codeStates['setoverall_key_performance_indicators'] = setoverall_key_performance_indicatorsc2711,
        codeStates['overall_key_performance_indicatorsc2711'] = overall_key_performance_indicatorsc2711Props,
        codeStates['setoverall_key_performance_indicatorsc2711'] = setoverall_key_performance_indicatorsc2711Props,
        codeStates['key_performance_indicator_group'] = key_performance_indicator_groupf9eaf,
        codeStates['setkey_performance_indicator_group'] = setkey_performance_indicator_groupf9eaf,
        codeStates['key_performance_indicator_groupf9eaf'] = key_performance_indicator_groupf9eafProps,
        codeStates['setkey_performance_indicator_groupf9eaf'] = setkey_performance_indicator_groupf9eafProps,
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,
        codeStates['amrqueuetable_v1'] = amrqueuetable_v1Props,
        codeStates['setamrqueuetable_v1'] = setamrqueuetable_v1Props,

    codeExecution(code,codeStates);
    } 
  }

  function handleConfirmOnClick(){
  }

    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
        // showArtifact
        let filterProps2: any =  [];
        let filterData2 = await getFilterProps(filterProps2,amr_queue_group3c082);
        setamrqueuetable_v1Props([...filterData2 ]);
          routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1', 'amrqueuetable_v1'));
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['header_group'] = header_groupd8ba9,
        codeStates['setheader_group'] = setheader_groupd8ba9,
        codeStates['header_groupd8ba9'] = header_groupd8ba9Props,
        codeStates['setheader_groupd8ba9'] = setheader_groupd8ba9Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group1aa03,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group1aa03,
        codeStates['asset_dashboard_group1aa03'] = asset_dashboard_group1aa03Props,
        codeStates['setasset_dashboard_group1aa03'] = setasset_dashboard_group1aa03Props,
        codeStates['amr_queue_group'] = amr_queue_group3c082,
        codeStates['setamr_queue_group'] = setamr_queue_group3c082,
        codeStates['amr_queue_group3c082'] = amr_queue_group3c082Props,
        codeStates['setamr_queue_group3c082'] = setamr_queue_group3c082Props,
        codeStates['amr_queue_text'] = amr_queue_text17149,
        codeStates['setamr_queue_text'] = setamr_queue_text17149,
        codeStates['icon_total_assest'] = icon_total_assest42cc7,
        codeStates['seticon_total_assest'] = seticon_total_assest42cc7,
        codeStates['amr_queue'] = amr_queue0e5a7,
        codeStates['setamr_queue'] = setamr_queue0e5a7,
        codeStates['amr_queue_desc'] = amr_queue_desc10020,
        codeStates['setamr_queue_desc'] = setamr_queue_desc10020,
        codeStates['pending_file_group'] = pending_file_group2128c,
        codeStates['setpending_file_group'] = setpending_file_group2128c,
        codeStates['pending_file_group2128c'] = pending_file_group2128cProps,
        codeStates['setpending_file_group2128c'] = setpending_file_group2128cProps,
        codeStates['service_pending_group'] = service_pending_group8c0ca,
        codeStates['setservice_pending_group'] = setservice_pending_group8c0ca,
        codeStates['service_pending_group8c0ca'] = service_pending_group8c0caProps,
        codeStates['setservice_pending_group8c0ca'] = setservice_pending_group8c0caProps,
        codeStates['slas_at_risk_group'] = slas_at_risk_group1f8c0,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group1f8c0,
        codeStates['slas_at_risk_group1f8c0'] = slas_at_risk_group1f8c0Props,
        codeStates['setslas_at_risk_group1f8c0'] = setslas_at_risk_group1f8c0Props,
        codeStates['court_rejection_group'] = court_rejection_groupdf57a,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupdf57a,
        codeStates['court_rejection_groupdf57a'] = court_rejection_groupdf57aProps,
        codeStates['setcourt_rejection_groupdf57a'] = setcourt_rejection_groupdf57aProps,
        codeStates['collected_mtd_group'] = collected_mtd_group0f074,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group0f074,
        codeStates['collected_mtd_group0f074'] = collected_mtd_group0f074Props,
        codeStates['setcollected_mtd_group0f074'] = setcollected_mtd_group0f074Props,
        codeStates['overall_key_performance_indicators'] = overall_key_performance_indicatorsc2711,
        codeStates['setoverall_key_performance_indicators'] = setoverall_key_performance_indicatorsc2711,
        codeStates['overall_key_performance_indicatorsc2711'] = overall_key_performance_indicatorsc2711Props,
        codeStates['setoverall_key_performance_indicatorsc2711'] = setoverall_key_performance_indicatorsc2711Props,
        codeStates['key_performance_indicator_group'] = key_performance_indicator_groupf9eaf,
        codeStates['setkey_performance_indicator_group'] = setkey_performance_indicator_groupf9eaf,
        codeStates['key_performance_indicator_groupf9eaf'] = key_performance_indicator_groupf9eafProps,
        codeStates['setkey_performance_indicator_groupf9eaf'] = setkey_performance_indicator_groupf9eafProps,
        codeStates['recent_activity_group'] = recent_activity_group91db6,
        codeStates['setrecent_activity_group'] = setrecent_activity_group91db6,
        codeStates['recent_activity_group91db6'] = recent_activity_group91db6Props,
        codeStates['setrecent_activity_group91db6'] = setrecent_activity_group91db6Props,
        codeStates['amrqueuetable_v1'] = amrqueuetable_v1Props,
        codeStates['setamrqueuetable_v1'] = setamrqueuetable_v1Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const amr_queue_group3c082Ref = useRef<any>(null);
  const handleClearSearch = () => {
    amr_queue_group3c082Ref.current?.setSearchParams();
    amr_queue_group3c082Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(amr_queue_group3c082) && Object.keys(amr_queue_group3c082)?.length>0)
      {
        setamr_queue_group3c082({})
      }
    }else 
      prevRefreshRef.current= true
  }, [amr_queue_group3c082Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 5',
        gridRow: '1 / 25',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: 'right',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !pl-3 !rounded-2xl !bg-white ${isDark ? 'text-white' : 'text-black'}  ${newdashboard_v1?._selectedGroup_=="amr_queue_group" ?'border-2 border-solid !border-[var(--selection-color)]': ''}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewdashboard_v1((pre:any)=>({...pre,_selectedGroup_:"amr_queue_group"}))
        }}
    >
          {allowedControls.includes("amr_queue_text") ?<Textamr_queue_text   /* 17149 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("icon_total_assest")?<Iconicon_total_assest /* 42cc7 */ encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}  />: <div></div>}
          {allowedControls.includes("amr_queue") ?<Textamr_queue   /* 0e5a7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("amr_queue_desc") ?<Textamr_queue_desc   /* 10020 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupamr_queue_group
