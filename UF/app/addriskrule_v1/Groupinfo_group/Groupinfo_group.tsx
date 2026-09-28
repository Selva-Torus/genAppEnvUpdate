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
import Groupgroup  from "../Groupgroup/Groupgroup";
import Grouprule_config_group  from "../Grouprule_config_group/Grouprule_config_group";
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
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
import Textrisk_rule_id  from "./Textrisk_rule_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupinfo_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_risktiercodecombo_v1Props, setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "risk_rule_id"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "dynamicactions"
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
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_idc0689, setrisk_rule_idc0689}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addriskrule_v1, setaddriskrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRiskRule:AFVK:v1',
    [user],
    'GroupInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f4d58aec85ad4b088d2797afe1169a49");
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
    setinfo_group69a49Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroupc3f8e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(groupc3f8e?.isDisabled==null)
      {
        setgroupc3f8e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rule_config_group")){
        setrule_config_groupa38fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rule_config_groupa38fa?.isDisabled==null)
      {
        setrule_config_groupa38fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_rule_id")){
        setrisk_rule_idc0689((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_rule_idc0689?.isDisabled==null)
      {
        setrisk_rule_idc0689((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactions618ef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactions618ef?.isDisabled==null)
      {
        setdynamicactions618ef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group69a49,
        codeStates['setinfo_group'] = setinfo_group69a49,
        codeStates['info_group69a49'] = info_group69a49Props,
        codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
        codeStates['group'] = groupc3f8e,
        codeStates['setgroup'] = setgroupc3f8e,
        codeStates['groupc3f8e'] = groupc3f8eProps,
        codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
        codeStates['rule_config_group'] = rule_config_groupa38fa,
        codeStates['setrule_config_group'] = setrule_config_groupa38fa,
        codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
        codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
        codeStates['risk_rule_id'] = risk_rule_idc0689,
        codeStates['setrisk_rule_id'] = setrisk_rule_idc0689,
        codeStates['dynamicactions'] = dynamicactions618ef,
        codeStates['setdynamicactions'] = setdynamicactions618ef,
        codeStates['dynamicactions618ef'] = dynamicactions618efProps,
        codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f4d58aec85ad4b088d2797afe1169a49");
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
        codeStates['info_group'] = info_group69a49,
        codeStates['setinfo_group'] = setinfo_group69a49,
        codeStates['info_group69a49'] = info_group69a49Props,
        codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
        codeStates['group'] = groupc3f8e,
        codeStates['setgroup'] = setgroupc3f8e,
        codeStates['groupc3f8e'] = groupc3f8eProps,
        codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
        codeStates['rule_config_group'] = rule_config_groupa38fa,
        codeStates['setrule_config_group'] = setrule_config_groupa38fa,
        codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
        codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
        codeStates['risk_rule_id'] = risk_rule_idc0689,
        codeStates['setrisk_rule_id'] = setrisk_rule_idc0689,
        codeStates['dynamicactions'] = dynamicactions618ef,
        codeStates['setdynamicactions'] = setdynamicactions618ef,
        codeStates['dynamicactions618ef'] = dynamicactions618efProps,
        codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const info_group69a49Ref = useRef<any>(null);
  const handleClearSearch = () => {
    info_group69a49Ref.current?.setSearchParams();
    info_group69a49Ref.current?.handleSearch({});
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
        !Array.isArray(info_group69a49) &&
        Object.keys(info_group69a49)?.length > 0
      ) {
        setinfo_group69a49({})
      }
    } else prevRefreshRef.current = true
  }, [info_group69a49Props?.refresh])


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
        gridRow: '1 / 73',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#ffffff',
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
          setaddriskrule_v1((pre:any)=>({...pre,_selectedGroup_:"info_group"}))
        }}
    >
        {allowedComponent.includes("group")  &&<Groupgroup  
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
        {allowedComponent.includes("rule_config_group")  &&<Grouprule_config_group  
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
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
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
          {allowedControls.includes("risk_rule_id") ?<Textrisk_rule_id   /* c0689 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupinfo_group
