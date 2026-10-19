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
import Groupai_registry_text_group  from "../Groupai_registry_text_group/Groupai_registry_text_group";
import Groupai_registry_table  from "../Groupai_registry_table/Groupai_registry_table";
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
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch  from "./Buttonsearch";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aipassport_v1Props, setdfd_aipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "search"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
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
  const {overall_ai_asset_registry3961c, setoverall_ai_asset_registry3961c}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3961cProps, setoverall_ai_asset_registry3961cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2f, setai_registry_group7ba2f}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group7ba2fProps, setai_registry_group7ba2fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849, setai_registry_text_group8b849}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8b849Props, setai_registry_text_group8b849Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button4c401, setrefresh_button4c401}= useContext(TotalContext) as TotalContextProps;
  const {search51074, setsearch51074}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5c, setai_registry_table91f5c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table91f5cProps, setai_registry_table91f5cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {airegistryview_v1, setairegistryview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryView:AFVK:v1',
    [user],
    'GroupAiRegistryGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ffccbb9b46d35d6cde0ba115d6f7ba2f");
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
    setai_registry_group7ba2fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text_group")){
        setai_registry_text_group8b849((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_text_group8b849?.isDisabled==null)
      {
        setai_registry_text_group8b849((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button4c401((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button4c401?.isDisabled==null)
      {
        setrefresh_button4c401((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch51074((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search51074?.isDisabled==null)
      {
        setsearch51074((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_registry_table")){
        setai_registry_table91f5cProps((pre:any)=>({...pre,...ai_registry_table91f5c,isDisabled:true}));

    }else
    {
      if(ai_registry_table91f5c?.isDisabled==null)
      {
        setai_registry_table91f5cProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3961c,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3961c,
        codeStates['overall_ai_asset_registry3961c'] = overall_ai_asset_registry3961cProps,
        codeStates['setoverall_ai_asset_registry3961c'] = setoverall_ai_asset_registry3961cProps,
        codeStates['ai_registry_group'] = ai_registry_group7ba2f,
        codeStates['setai_registry_group'] = setai_registry_group7ba2f,
        codeStates['ai_registry_group7ba2f'] = ai_registry_group7ba2fProps,
        codeStates['setai_registry_group7ba2f'] = setai_registry_group7ba2fProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8b849,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8b849,
        codeStates['ai_registry_text_group8b849'] = ai_registry_text_group8b849Props,
        codeStates['setai_registry_text_group8b849'] = setai_registry_text_group8b849Props,
        codeStates['refresh_button'] = refresh_button4c401,
        codeStates['setrefresh_button'] = setrefresh_button4c401,
        codeStates['search'] = search51074,
        codeStates['setsearch'] = setsearch51074,
        codeStates['ai_registry_table'] = ai_registry_table91f5c,
        codeStates['setai_registry_table'] = setai_registry_table91f5c,
        codeStates['ai_registry_table91f5c'] = ai_registry_table91f5cProps,
        codeStates['setai_registry_table91f5c'] = setai_registry_table91f5cProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ffccbb9b46d35d6cde0ba115d6f7ba2f");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3961c,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3961c,
        codeStates['overall_ai_asset_registry3961c'] = overall_ai_asset_registry3961cProps,
        codeStates['setoverall_ai_asset_registry3961c'] = setoverall_ai_asset_registry3961cProps,
        codeStates['ai_registry_group'] = ai_registry_group7ba2f,
        codeStates['setai_registry_group'] = setai_registry_group7ba2f,
        codeStates['ai_registry_group7ba2f'] = ai_registry_group7ba2fProps,
        codeStates['setai_registry_group7ba2f'] = setai_registry_group7ba2fProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8b849,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8b849,
        codeStates['ai_registry_text_group8b849'] = ai_registry_text_group8b849Props,
        codeStates['setai_registry_text_group8b849'] = setai_registry_text_group8b849Props,
        codeStates['refresh_button'] = refresh_button4c401,
        codeStates['setrefresh_button'] = setrefresh_button4c401,
        codeStates['search'] = search51074,
        codeStates['setsearch'] = setsearch51074,
        codeStates['ai_registry_table'] = ai_registry_table91f5c,
        codeStates['setai_registry_table'] = setai_registry_table91f5c,
        codeStates['ai_registry_table91f5c'] = ai_registry_table91f5cProps,
        codeStates['setai_registry_table91f5c'] = setai_registry_table91f5cProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_group7ba2fRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_group7ba2fRef.current?.setSearchParams();
    ai_registry_group7ba2fRef.current?.handleSearch({});
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
        !Array.isArray(ai_registry_group7ba2f) &&
        Object.keys(ai_registry_group7ba2f)?.length > 0
      ) {
        setai_registry_group7ba2f({})
        setai_registry_group7ba2fProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_group7ba2fProps?.refresh])


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
        gridRow: '1 / 147',
      
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
          setairegistryview_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_group"}))
        }}
    >
        {allowedComponent.includes("ai_registry_text_group")  &&<Groupai_registry_text_group  
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
        {allowedComponent.includes("ai_registry_table")  &&<Groupai_registry_table  
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
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_registry_group
