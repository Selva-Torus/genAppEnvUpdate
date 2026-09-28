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
import Textcode_config_txt  from "./Textcode_config_txt";
import TextInputcolour_hint  from "./TextInputcolour_hint";
import TextInputnumeric_weight  from "./TextInputnumeric_weight";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_value_config_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codevaluecombo_v1Props, setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_config_txt",
      "colour_hint",
      "numeric_weight",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
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
  const {code_value_group4d389, setcode_value_group4d389}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group4d389Props, setcode_value_group4d389Props}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1, setcode_groupb5dc1}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1Props, setcode_groupb5dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872, setcode_value_config_group55872}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872Props, setcode_value_config_group55872Props}= useContext(TotalContext) as TotalContextProps;
  const {code_config_txt79ae5, setcode_config_txt79ae5}= useContext(TotalContext) as TotalContextProps;
  const {colour_hint75054, setcolour_hint75054}= useContext(TotalContext) as TotalContextProps;
  const {numeric_weight9b07a, setnumeric_weight9b07a}= useContext(TotalContext) as TotalContextProps;
  const {is_active033da, setis_active033da}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535b, setdynamicactions1535b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535bProps, setdynamicactions1535bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcodevalues_v1, setaddcodevalues_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeValues:AFVK:v1',
    [user],
    'GroupCodeValueConfigGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "572cc79d3dff4027aa0f45c8fda55872");
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
    setcode_value_config_group55872Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_config_txt")){
        setcode_config_txt79ae5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_config_txt79ae5?.isDisabled==null)
      {
        setcode_config_txt79ae5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("colour_hint")){
        setcolour_hint75054((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(colour_hint75054?.isDisabled==null)
      {
        setcolour_hint75054((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("numeric_weight")){
        setnumeric_weight9b07a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(numeric_weight9b07a?.isDisabled==null)
      {
        setnumeric_weight9b07a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active033da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active033da?.isDisabled==null)
      {
        setis_active033da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['code_config_txt'] = code_config_txt79ae5,
        codeStates['setcode_config_txt'] = setcode_config_txt79ae5,
        codeStates['colour_hint'] = colour_hint75054,
        codeStates['setcolour_hint'] = setcolour_hint75054,
        codeStates['numeric_weight'] = numeric_weight9b07a,
        codeStates['setnumeric_weight'] = setnumeric_weight9b07a,
        codeStates['is_active'] = is_active033da,
        codeStates['setis_active'] = setis_active033da,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "572cc79d3dff4027aa0f45c8fda55872");
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
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['code_config_txt'] = code_config_txt79ae5,
        codeStates['setcode_config_txt'] = setcode_config_txt79ae5,
        codeStates['colour_hint'] = colour_hint75054,
        codeStates['setcolour_hint'] = setcolour_hint75054,
        codeStates['numeric_weight'] = numeric_weight9b07a,
        codeStates['setnumeric_weight'] = setnumeric_weight9b07a,
        codeStates['is_active'] = is_active033da,
        codeStates['setis_active'] = setis_active033da,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_value_config_group55872Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_value_config_group55872Ref.current?.setSearchParams();
    code_value_config_group55872Ref.current?.handleSearch({});
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
        !Array.isArray(code_value_config_group55872) &&
        Object.keys(code_value_config_group55872)?.length > 0
      ) {
        setcode_value_config_group55872({})
      }
    } else prevRefreshRef.current = true
  }, [code_value_config_group55872Props?.refresh])


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
        gridColumn: '15 / 25',
        gridRow: '2 / 66',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
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
          setaddcodevalues_v1((pre:any)=>({...pre,_selectedGroup_:"code_value_config_group"}))
        }}
    >
          {allowedControls.includes("code_config_txt") ?<Textcode_config_txt   /* 79ae5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("colour_hint") ?<TextInputcolour_hint   /* 75054 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("numeric_weight") ?<TextInputnumeric_weight   /* 9b07a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* 033da */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcode_value_config_group
