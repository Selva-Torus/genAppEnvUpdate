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
import Texttext  from "./Texttext";
import Dropdownagent_asset_name  from "./Dropdownagent_asset_name";
import Dropdowntool_asset_name  from "./Dropdowntool_asset_name";
import TextInputtool_operation  from "./TextInputtool_operation";
import Dropdownaccess_mode  from "./Dropdownaccess_mode";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptemplate_detail_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_businessownercombo_v1Props, setdfd_businessownercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrantagentname_v1Props, setdfd_toolgrantagentname_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrantassetcombo_v1Props, setdfd_toolgrantassetcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "agent_asset_name",
      "tool_asset_name",
      "tool_operation",
      "access_mode"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "groups",
      "dynamicaction"
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
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {textd1555, settextd1555}= useContext(TotalContext) as TotalContextProps;
  const {agent_asset_name96120, setagent_asset_name96120}= useContext(TotalContext) as TotalContextProps;
  const {tool_asset_name67bb6, settool_asset_name67bb6}= useContext(TotalContext) as TotalContextProps;
  const {tool_operationb1b59, settool_operationb1b59}= useContext(TotalContext) as TotalContextProps;
  const {access_modea4f1d, setaccess_modea4f1d}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560b, setdynamicaction9560b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicaction9560bProps, setdynamicaction9560bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {approvetoolgrant_v1, setapprovetoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:approveToolGrant:AFVK:v1',
    [user],
    'GroupTemplateDetailGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bef9f414fc1a357c1798ddffdd1410a7");
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
    settemplate_detail_group410a7Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextd1555((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textd1555?.isDisabled==null)
      {
        settextd1555((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_asset_name")){
        setagent_asset_name96120((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_asset_name96120?.isDisabled==null)
      {
        setagent_asset_name96120((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_asset_name")){
        settool_asset_name67bb6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_asset_name67bb6?.isDisabled==null)
      {
        settool_asset_name67bb6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_operation")){
        settool_operationb1b59((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_operationb1b59?.isDisabled==null)
      {
        settool_operationb1b59((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_mode")){
        setaccess_modea4f1d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(access_modea4f1d?.isDisabled==null)
      {
        setaccess_modea4f1d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group8f0c2,
        codeStates['setgroup'] = setgroup8f0c2,
        codeStates['group8f0c2'] = group8f0c2Props,
        codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
        codeStates['template_detail_group'] = template_detail_group410a7,
        codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
        codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
        codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
        codeStates['text'] = textd1555,
        codeStates['settext'] = settextd1555,
        codeStates['agent_asset_name'] = agent_asset_name96120,
        codeStates['setagent_asset_name'] = setagent_asset_name96120,
        codeStates['tool_asset_name'] = tool_asset_name67bb6,
        codeStates['settool_asset_name'] = settool_asset_name67bb6,
        codeStates['tool_operation'] = tool_operationb1b59,
        codeStates['settool_operation'] = settool_operationb1b59,
        codeStates['access_mode'] = access_modea4f1d,
        codeStates['setaccess_mode'] = setaccess_modea4f1d,
        codeStates['groups'] = groupsae790,
        codeStates['setgroups'] = setgroupsae790,
        codeStates['groupsae790'] = groupsae790Props,
        codeStates['setgroupsae790'] = setgroupsae790Props,
        codeStates['dynamicaction'] = dynamicaction9560b,
        codeStates['setdynamicaction'] = setdynamicaction9560b,
        codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
        codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "bef9f414fc1a357c1798ddffdd1410a7");
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
        codeStates['group'] = group8f0c2,
        codeStates['setgroup'] = setgroup8f0c2,
        codeStates['group8f0c2'] = group8f0c2Props,
        codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
        codeStates['template_detail_group'] = template_detail_group410a7,
        codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
        codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
        codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
        codeStates['text'] = textd1555,
        codeStates['settext'] = settextd1555,
        codeStates['agent_asset_name'] = agent_asset_name96120,
        codeStates['setagent_asset_name'] = setagent_asset_name96120,
        codeStates['tool_asset_name'] = tool_asset_name67bb6,
        codeStates['settool_asset_name'] = settool_asset_name67bb6,
        codeStates['tool_operation'] = tool_operationb1b59,
        codeStates['settool_operation'] = settool_operationb1b59,
        codeStates['access_mode'] = access_modea4f1d,
        codeStates['setaccess_mode'] = setaccess_modea4f1d,
        codeStates['groups'] = groupsae790,
        codeStates['setgroups'] = setgroupsae790,
        codeStates['groupsae790'] = groupsae790Props,
        codeStates['setgroupsae790'] = setgroupsae790Props,
        codeStates['dynamicaction'] = dynamicaction9560b,
        codeStates['setdynamicaction'] = setdynamicaction9560b,
        codeStates['dynamicaction9560b'] = dynamicaction9560bProps,
        codeStates['setdynamicaction9560b'] = setdynamicaction9560bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const template_detail_group410a7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    template_detail_group410a7Ref.current?.setSearchParams();
    template_detail_group410a7Ref.current?.handleSearch({});
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
        !Array.isArray(template_detail_group410a7) &&
        Object.keys(template_detail_group410a7)?.length > 0
      ) {
        settemplate_detail_group410a7({})
        settemplate_detail_group410a7Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [template_detail_group410a7Props?.refresh])


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
        gridRow: '1 / 44',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#f1f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setapprovetoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"template_detail_group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* d1555 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("agent_asset_name") ?<Dropdownagent_asset_name   /* 96120 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("tool_asset_name") ?<Dropdowntool_asset_name   /* 67bb6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("tool_operation") ?<TextInputtool_operation   /* b1b59 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("access_mode") ?<Dropdownaccess_mode   /* a4f1d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Grouptemplate_detail_group
