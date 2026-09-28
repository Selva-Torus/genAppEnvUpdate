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
import Textmodel_information_text  from "./Textmodel_information_text";
import ComboBoxasset_name  from "./ComboBoxasset_name";
import TextInputmodel_name  from "./TextInputmodel_name";
import TextInputmodel_version  from "./TextInputmodel_version";
import Dropdownmodel_family_code  from "./Dropdownmodel_family_code";
import TextInputmodel_provider  from "./TextInputmodel_provider";
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
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
      "model_information_text",
      "asset_name",
      "model_name",
      "model_version",
      "model_family_code",
      "model_provider"
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
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {model_information_text02b2b, setmodel_information_text02b2b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5b38b, setasset_name5b38b}= useContext(TotalContext) as TotalContextProps;
  const {model_named4b34, setmodel_named4b34}= useContext(TotalContext) as TotalContextProps;
  const {model_versionf4cbd, setmodel_versionf4cbd}= useContext(TotalContext) as TotalContextProps;
  const {model_family_code0e9ff, setmodel_family_code0e9ff}= useContext(TotalContext) as TotalContextProps;
  const {model_provider47378, setmodel_provider47378}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addaimodels_v1, setaddaimodels_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAIModels:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2fb657d8ae4a1d243197168ed83905fc");
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
    setmodel_info_group905fcProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("model_information_text")){
        setmodel_information_text02b2b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_information_text02b2b?.isDisabled==null)
      {
        setmodel_information_text02b2b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name5b38b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name5b38b?.isDisabled==null)
      {
        setasset_name5b38b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_name")){
        setmodel_named4b34((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_named4b34?.isDisabled==null)
      {
        setmodel_named4b34((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_version")){
        setmodel_versionf4cbd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_versionf4cbd?.isDisabled==null)
      {
        setmodel_versionf4cbd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_family_code")){
        setmodel_family_code0e9ff((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_family_code0e9ff?.isDisabled==null)
      {
        setmodel_family_code0e9ff((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_provider")){
        setmodel_provider47378((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_provider47378?.isDisabled==null)
      {
        setmodel_provider47378((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['model_information_text'] = model_information_text02b2b,
        codeStates['setmodel_information_text'] = setmodel_information_text02b2b,
        codeStates['asset_name'] = asset_name5b38b,
        codeStates['setasset_name'] = setasset_name5b38b,
        codeStates['model_name'] = model_named4b34,
        codeStates['setmodel_name'] = setmodel_named4b34,
        codeStates['model_version'] = model_versionf4cbd,
        codeStates['setmodel_version'] = setmodel_versionf4cbd,
        codeStates['model_family_code'] = model_family_code0e9ff,
        codeStates['setmodel_family_code'] = setmodel_family_code0e9ff,
        codeStates['model_provider'] = model_provider47378,
        codeStates['setmodel_provider'] = setmodel_provider47378,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2fb657d8ae4a1d243197168ed83905fc");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['model_information_text'] = model_information_text02b2b,
        codeStates['setmodel_information_text'] = setmodel_information_text02b2b,
        codeStates['asset_name'] = asset_name5b38b,
        codeStates['setasset_name'] = setasset_name5b38b,
        codeStates['model_name'] = model_named4b34,
        codeStates['setmodel_name'] = setmodel_named4b34,
        codeStates['model_version'] = model_versionf4cbd,
        codeStates['setmodel_version'] = setmodel_versionf4cbd,
        codeStates['model_family_code'] = model_family_code0e9ff,
        codeStates['setmodel_family_code'] = setmodel_family_code0e9ff,
        codeStates['model_provider'] = model_provider47378,
        codeStates['setmodel_provider'] = setmodel_provider47378,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const model_info_group905fcRef = useRef<any>(null);
  const handleClearSearch = () => {
    model_info_group905fcRef.current?.setSearchParams();
    model_info_group905fcRef.current?.handleSearch({});
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
        !Array.isArray(model_info_group905fc) &&
        Object.keys(model_info_group905fc)?.length > 0
      ) {
        setmodel_info_group905fc({})
      }
    } else prevRefreshRef.current = true
  }, [model_info_group905fcProps?.refresh])


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
        gridRow: '1 / 38',
      
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
          setaddaimodels_v1((pre:any)=>({...pre,_selectedGroup_:"model_info_group"}))
        }}
    >
          {allowedControls.includes("model_information_text") ?<Textmodel_information_text   /* 02b2b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<ComboBoxasset_name /* 5b38b */ lockedData={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("model_name") ?<TextInputmodel_name   /* d4b34 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("model_version") ?<TextInputmodel_version   /* f4cbd */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("model_family_code") ?<Dropdownmodel_family_code   /* 0e9ff */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("model_provider") ?<TextInputmodel_provider   /* 47378 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupmodel_info_group
