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
import Grouprule_evaluation_table  from "../Grouprule_evaluation_table/Grouprule_evaluation_table";
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
import Textrule_evaluation_text  from "./Textrule_evaluation_text";
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch  from "./Buttonsearch";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprule_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_tierassessment_v1Props, setdfd_tierassessment_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "rule_evaluation_text",
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group",
      "desc_group",
      "rule_group",
      "rule_evaluation_table"
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
  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_texte232f, setrule_evaluation_texte232f}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button501b2, setrefresh_button501b2}= useContext(TotalContext) as TotalContextProps;
  const {search45057, setsearch45057}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {ruleevaluation_v1, setruleevaluation_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1',
    [user],
    'GroupRuleGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "82b3d2c0da474763906329d2a4d83db0");
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
    setrule_group83db0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("rule_evaluation_text")){
        setrule_evaluation_texte232f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_evaluation_texte232f?.isDisabled==null)
      {
        setrule_evaluation_texte232f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button501b2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button501b2?.isDisabled==null)
      {
        setrefresh_button501b2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch45057((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search45057?.isDisabled==null)
      {
        setsearch45057((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_evaluation_table")){
        setrule_evaluation_table9e865Props((pre:any)=>({...pre,...rule_evaluation_table9e865,isDisabled:true}));

    }else
    {
      if(rule_evaluation_table9e865?.isDisabled==null)
      {
        setrule_evaluation_table9e865Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
        codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
        codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
        codeStates['ai_registry_group'] = ai_registry_groupb6b42,
        codeStates['setai_registry_group'] = setai_registry_groupb6b42,
        codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
        codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
        codeStates['group'] = group675e8,
        codeStates['setgroup'] = setgroup675e8,
        codeStates['group675e8'] = group675e8Props,
        codeStates['setgroup675e8'] = setgroup675e8Props,
        codeStates['desc_group'] = desc_groupda73a,
        codeStates['setdesc_group'] = setdesc_groupda73a,
        codeStates['desc_groupda73a'] = desc_groupda73aProps,
        codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
        codeStates['rule_group'] = rule_group83db0,
        codeStates['setrule_group'] = setrule_group83db0,
        codeStates['rule_group83db0'] = rule_group83db0Props,
        codeStates['setrule_group83db0'] = setrule_group83db0Props,
        codeStates['rule_evaluation_text'] = rule_evaluation_texte232f,
        codeStates['setrule_evaluation_text'] = setrule_evaluation_texte232f,
        codeStates['refresh_button'] = refresh_button501b2,
        codeStates['setrefresh_button'] = setrefresh_button501b2,
        codeStates['search'] = search45057,
        codeStates['setsearch'] = setsearch45057,
        codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
        codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
        codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
        codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "82b3d2c0da474763906329d2a4d83db0");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
        codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
        codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
        codeStates['ai_registry_group'] = ai_registry_groupb6b42,
        codeStates['setai_registry_group'] = setai_registry_groupb6b42,
        codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
        codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
        codeStates['group'] = group675e8,
        codeStates['setgroup'] = setgroup675e8,
        codeStates['group675e8'] = group675e8Props,
        codeStates['setgroup675e8'] = setgroup675e8Props,
        codeStates['desc_group'] = desc_groupda73a,
        codeStates['setdesc_group'] = setdesc_groupda73a,
        codeStates['desc_groupda73a'] = desc_groupda73aProps,
        codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
        codeStates['rule_group'] = rule_group83db0,
        codeStates['setrule_group'] = setrule_group83db0,
        codeStates['rule_group83db0'] = rule_group83db0Props,
        codeStates['setrule_group83db0'] = setrule_group83db0Props,
        codeStates['rule_evaluation_text'] = rule_evaluation_texte232f,
        codeStates['setrule_evaluation_text'] = setrule_evaluation_texte232f,
        codeStates['refresh_button'] = refresh_button501b2,
        codeStates['setrefresh_button'] = setrefresh_button501b2,
        codeStates['search'] = search45057,
        codeStates['setsearch'] = setsearch45057,
        codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
        codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
        codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
        codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const rule_group83db0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    rule_group83db0Ref.current?.setSearchParams();
    rule_group83db0Ref.current?.handleSearch({});
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
        !Array.isArray(rule_group83db0) &&
        Object.keys(rule_group83db0)?.length > 0
      ) {
        setrule_group83db0({})
        setrule_group83db0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [rule_group83db0Props?.refresh])


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
        gridRow: '55 / 119',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
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
          setruleevaluation_v1((pre:any)=>({...pre,_selectedGroup_:"rule_group"}))
        }}
    >
        {allowedComponent.includes("rule_evaluation_table")  &&<Grouprule_evaluation_table  
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
          {allowedControls.includes("rule_evaluation_text") ?<Textrule_evaluation_text   /* e232f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Grouprule_group
