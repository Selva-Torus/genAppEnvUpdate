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
import TextInputcode_type  from "./TextInputcode_type";
import TextAreadescription  from "./TextAreadescription";
import Switchis_system  from "./Switchis_system";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_type_information = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_type",
      "description",
      "is_system",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "code_type_information"
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
  const {group0b46c, setgroup0b46c}= useContext(TotalContext) as TotalContextProps;
  const {group0b46cProps, setgroup0b46cProps}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationc1162, setcode_type_informationc1162}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationc1162Props, setcode_type_informationc1162Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type1ff3d, setcode_type1ff3d}= useContext(TotalContext) as TotalContextProps;
  const {description5291c, setdescription5291c}= useContext(TotalContext) as TotalContextProps;
  const {is_system5065d, setis_system5065d}= useContext(TotalContext) as TotalContextProps;
  const {is_activec791d, setis_activec791d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcodetypes_v1, setviewcodetypes_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCodeTypes:AFVK:v1',
    [user],
    'GroupCodeTypeInformation',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5b5204988aab402696a9f9082c2c1162");
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
    setcode_type_informationc1162Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_type")){
        setcode_type1ff3d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_type1ff3d?.isDisabled==null)
      {
        setcode_type1ff3d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescription5291c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description5291c?.isDisabled==null)
      {
        setdescription5291c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_system")){
        setis_system5065d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_system5065d?.isDisabled==null)
      {
        setis_system5065d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activec791d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activec791d?.isDisabled==null)
      {
        setis_activec791d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group0b46c,
        codeStates['setgroup'] = setgroup0b46c,
        codeStates['group0b46c'] = group0b46cProps,
        codeStates['setgroup0b46c'] = setgroup0b46cProps,
        codeStates['code_type_information'] = code_type_informationc1162,
        codeStates['setcode_type_information'] = setcode_type_informationc1162,
        codeStates['code_type_informationc1162'] = code_type_informationc1162Props,
        codeStates['setcode_type_informationc1162'] = setcode_type_informationc1162Props,
        codeStates['code_type'] = code_type1ff3d,
        codeStates['setcode_type'] = setcode_type1ff3d,
        codeStates['description'] = description5291c,
        codeStates['setdescription'] = setdescription5291c,
        codeStates['is_system'] = is_system5065d,
        codeStates['setis_system'] = setis_system5065d,
        codeStates['is_active'] = is_activec791d,
        codeStates['setis_active'] = setis_activec791d,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5b5204988aab402696a9f9082c2c1162");
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
        codeStates['group'] = group0b46c,
        codeStates['setgroup'] = setgroup0b46c,
        codeStates['group0b46c'] = group0b46cProps,
        codeStates['setgroup0b46c'] = setgroup0b46cProps,
        codeStates['code_type_information'] = code_type_informationc1162,
        codeStates['setcode_type_information'] = setcode_type_informationc1162,
        codeStates['code_type_informationc1162'] = code_type_informationc1162Props,
        codeStates['setcode_type_informationc1162'] = setcode_type_informationc1162Props,
        codeStates['code_type'] = code_type1ff3d,
        codeStates['setcode_type'] = setcode_type1ff3d,
        codeStates['description'] = description5291c,
        codeStates['setdescription'] = setdescription5291c,
        codeStates['is_system'] = is_system5065d,
        codeStates['setis_system'] = setis_system5065d,
        codeStates['is_active'] = is_activec791d,
        codeStates['setis_active'] = setis_activec791d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_type_informationc1162Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_type_informationc1162Ref.current?.setSearchParams();
    code_type_informationc1162Ref.current?.handleSearch({});
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
        !Array.isArray(code_type_informationc1162) &&
        Object.keys(code_type_informationc1162)?.length > 0
      ) {
        setcode_type_informationc1162({})
      }
    } else prevRefreshRef.current = true
  }, [code_type_informationc1162Props?.refresh])


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
        gridRow: '1 / 29',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '9px',
        backgroundColor:'#ffffff',
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
          setviewcodetypes_v1((pre:any)=>({...pre,_selectedGroup_:"code_type_information"}))
        }}
    >
        {allowedControls.includes("code_type") ?<TextInputcode_type   /* 1ff3d */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextAreadescription   /* 5291c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("is_system")?<Switchis_system  /* 5065d */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* c791d */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcode_type_information
