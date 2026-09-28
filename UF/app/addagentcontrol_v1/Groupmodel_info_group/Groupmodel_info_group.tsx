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
import Textagent_identity_text  from "./Textagent_identity_text";
import ComboBoxasset_name  from "./ComboBoxasset_name";
import TextInputagent_identity_ref  from "./TextInputagent_identity_ref";
import Dropdownidentity_provider  from "./Dropdownidentity_provider";
import TextInputauthority_level_code  from "./TextInputauthority_level_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmodel_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_aiagentcontrol_v1Props, setdfd_aiagentcontrol_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "agent_identity_text",
      "asset_name",
      "agent_identity_ref",
      "identity_provider",
      "authority_level_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "register_ai_asset_group",
      "model_info_group",
      "grounding_group",
      "validation_group",
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
  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_text6046a, setagent_identity_text6046a}= useContext(TotalContext) as TotalContextProps;
  const {asset_name91b54, setasset_name91b54}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_ref508a1, setagent_identity_ref508a1}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider1e79b, setidentity_provider1e79b}= useContext(TotalContext) as TotalContextProps;
  const {authority_level_codebd1b1, setauthority_level_codebd1b1}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addagentcontrol_v1, setaddagentcontrol_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentControl:AFVK:v1',
    [user],
    'GroupModelInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3d7980ce18c3813d952a5976d435b641");
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
    setmodel_info_group5b641Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("agent_identity_text")){
        setagent_identity_text6046a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_identity_text6046a?.isDisabled==null)
      {
        setagent_identity_text6046a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name91b54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name91b54?.isDisabled==null)
      {
        setasset_name91b54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_identity_ref")){
        setagent_identity_ref508a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_identity_ref508a1?.isDisabled==null)
      {
        setagent_identity_ref508a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_provider1e79b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_provider1e79b?.isDisabled==null)
      {
        setidentity_provider1e79b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("authority_level_code")){
        setauthority_level_codebd1b1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_level_codebd1b1?.isDisabled==null)
      {
        setauthority_level_codebd1b1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['agent_identity_text'] = agent_identity_text6046a,
        codeStates['setagent_identity_text'] = setagent_identity_text6046a,
        codeStates['asset_name'] = asset_name91b54,
        codeStates['setasset_name'] = setasset_name91b54,
        codeStates['agent_identity_ref'] = agent_identity_ref508a1,
        codeStates['setagent_identity_ref'] = setagent_identity_ref508a1,
        codeStates['identity_provider'] = identity_provider1e79b,
        codeStates['setidentity_provider'] = setidentity_provider1e79b,
        codeStates['authority_level_code'] = authority_level_codebd1b1,
        codeStates['setauthority_level_code'] = setauthority_level_codebd1b1,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3d7980ce18c3813d952a5976d435b641");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['agent_identity_text'] = agent_identity_text6046a,
        codeStates['setagent_identity_text'] = setagent_identity_text6046a,
        codeStates['asset_name'] = asset_name91b54,
        codeStates['setasset_name'] = setasset_name91b54,
        codeStates['agent_identity_ref'] = agent_identity_ref508a1,
        codeStates['setagent_identity_ref'] = setagent_identity_ref508a1,
        codeStates['identity_provider'] = identity_provider1e79b,
        codeStates['setidentity_provider'] = setidentity_provider1e79b,
        codeStates['authority_level_code'] = authority_level_codebd1b1,
        codeStates['setauthority_level_code'] = setauthority_level_codebd1b1,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const model_info_group5b641Ref = useRef<any>(null);
  const handleClearSearch = () => {
    model_info_group5b641Ref.current?.setSearchParams();
    model_info_group5b641Ref.current?.handleSearch({});
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
        !Array.isArray(model_info_group5b641) &&
        Object.keys(model_info_group5b641)?.length > 0
      ) {
        setmodel_info_group5b641({})
      }
    } else prevRefreshRef.current = true
  }, [model_info_group5b641Props?.refresh])


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
        gridRow: '1 / 24',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddagentcontrol_v1((pre:any)=>({...pre,_selectedGroup_:"model_info_group"}))
        }}
    >
          {allowedControls.includes("agent_identity_text") ?<Textagent_identity_text   /* 6046a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<ComboBoxasset_name /* 91b54 */ lockedData={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("agent_identity_ref") ?<TextInputagent_identity_ref   /* 508a1 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("identity_provider") ?<Dropdownidentity_provider   /* 1e79b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("authority_level_code") ?<TextInputauthority_level_code   /* bd1b1 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupmodel_info_group
