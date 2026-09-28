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
import Tablerisk_rule_table  from './Tablerisk_rule_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprisk_rule_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_riskrule_v1Props, setdfd_riskrule_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "rule_code",
      "rule_name",
      "result_tier_code",
      "priority_order",
      "is_active",
      "view_btn",
      "edit_btn",
      "del_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "risk_rule_table"
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
  const {groupf5307, setgroupf5307}= useContext(TotalContext) as TotalContextProps;
  const {groupf5307Props, setgroupf5307Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6, setrisk_rule_table159f6}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6Props, setrisk_rule_table159f6Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_code0aa8a, setrule_code0aa8a}= useContext(TotalContext) as TotalContextProps;
  const {rule_name9f319, setrule_name9f319}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_codeca7bb, setresult_tier_codeca7bb}= useContext(TotalContext) as TotalContextProps;
  const {priority_orderd6801, setpriority_orderd6801}= useContext(TotalContext) as TotalContextProps;
  const {is_active21ce9, setis_active21ce9}= useContext(TotalContext) as TotalContextProps;
  const {view_btn6c086, setview_btn6c086}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn46940, setedit_btn46940}= useContext(TotalContext) as TotalContextProps;
  const {del_btnadc5a, setdel_btnadc5a}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {riskrule_v1, setriskrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1',
    [user],
    'GroupRiskRuleTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a29ca67334d046458bf34f78510159f6");
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
    setrisk_rule_table159f6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("rule_code")){
        setrule_code0aa8a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_code0aa8a?.isDisabled==null)
      {
        setrule_code0aa8a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_name")){
        setrule_name9f319((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_name9f319?.isDisabled==null)
      {
        setrule_name9f319((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("result_tier_code")){
        setresult_tier_codeca7bb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(result_tier_codeca7bb?.isDisabled==null)
      {
        setresult_tier_codeca7bb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority_order")){
        setpriority_orderd6801((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(priority_orderd6801?.isDisabled==null)
      {
        setpriority_orderd6801((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active21ce9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active21ce9?.isDisabled==null)
      {
        setis_active21ce9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view_btn")){
        setview_btn6c086((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(view_btn6c086?.isDisabled==null)
      {
        setview_btn6c086((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn46940((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn46940?.isDisabled==null)
      {
        setedit_btn46940((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btnadc5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btnadc5a?.isDisabled==null)
      {
        setdel_btnadc5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a29ca67334d046458bf34f78510159f6");
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
        codeStates['group'] = groupf5307,
        codeStates['setgroup'] = setgroupf5307,
        codeStates['groupf5307'] = groupf5307Props,
        codeStates['setgroupf5307'] = setgroupf5307Props,
        codeStates['risk_rule_table'] = risk_rule_table159f6,
        codeStates['setrisk_rule_table'] = setrisk_rule_table159f6,
        codeStates['risk_rule_table159f6'] = risk_rule_table159f6Props,
        codeStates['setrisk_rule_table159f6'] = setrisk_rule_table159f6Props,
        codeStates['rule_code'] = rule_code0aa8a,
        codeStates['setrule_code'] = setrule_code0aa8a,
        codeStates['rule_name'] = rule_name9f319,
        codeStates['setrule_name'] = setrule_name9f319,
        codeStates['result_tier_code'] = result_tier_codeca7bb,
        codeStates['setresult_tier_code'] = setresult_tier_codeca7bb,
        codeStates['priority_order'] = priority_orderd6801,
        codeStates['setpriority_order'] = setpriority_orderd6801,
        codeStates['is_active'] = is_active21ce9,
        codeStates['setis_active'] = setis_active21ce9,
        codeStates['view_btn'] = view_btn6c086,
        codeStates['setview_btn'] = setview_btn6c086,
        codeStates['edit_btn'] = edit_btn46940,
        codeStates['setedit_btn'] = setedit_btn46940,
        codeStates['del_btn'] = del_btnadc5a,
        codeStates['setdel_btn'] = setdel_btnadc5a,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const risk_rule_table159f6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    risk_rule_table159f6Ref.current?.setSearchParams();
    risk_rule_table159f6Ref.current?.handleSearch({});
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
        !Array.isArray(risk_rule_table159f6) &&
        Object.keys(risk_rule_table159f6)?.length > 0
      ) {
        setrisk_rule_table159f6({})
      }
    } else prevRefreshRef.current = true
  }, [risk_rule_table159f6Props?.refresh])


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
        gridRow: '9 / 139',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setriskrule_v1((pre:any)=>({...pre,_selectedGroup_:"risk_rule_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablerisk_rule_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={risk_rule_table159f6Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouprisk_rule_table
