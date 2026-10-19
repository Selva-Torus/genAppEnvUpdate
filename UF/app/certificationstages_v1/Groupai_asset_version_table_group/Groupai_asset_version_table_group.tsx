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
import Groupcertificate_table  from "../Groupcertificate_table/Groupcertificate_table";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_asset_version_table_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificationstagestable_v1Props, setdfd_certificationstagestable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "certificate_table"
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
  const {overall_groupf5901, setoverall_groupf5901}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupf5901Props, setoverall_groupf5901Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682b, setai_asset_version_table_groupa682b}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682bProps, setai_asset_version_table_groupa682bProps}= useContext(TotalContext) as TotalContextProps;
  const {group6f907, setgroup6f907}= useContext(TotalContext) as TotalContextProps;
  const {group6f907Props, setgroup6f907Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01d, setcertificate_tablebc01d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01dProps, setcertificate_tablebc01dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificationstages_v1, setcertificationstages_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationStages:AFVK:v1',
    [user],
    'GroupAiAssetVersionTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dfc7dd5a0cb72a102165d549acaa682b");
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
    setai_asset_version_table_groupa682bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroup6f907((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(group6f907?.isDisabled==null)
      {
        setgroup6f907((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_table")){
        setcertificate_tablebc01dProps((pre:any)=>({...pre,...certificate_tablebc01d,isDisabled:true}));

    }else
    {
      if(certificate_tablebc01d?.isDisabled==null)
      {
        setcertificate_tablebc01dProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupf5901,
        codeStates['setoverall_group'] = setoverall_groupf5901,
        codeStates['overall_groupf5901'] = overall_groupf5901Props,
        codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
        codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
        codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
        codeStates['group'] = group6f907,
        codeStates['setgroup'] = setgroup6f907,
        codeStates['group6f907'] = group6f907Props,
        codeStates['setgroup6f907'] = setgroup6f907Props,
        codeStates['certificate_table'] = certificate_tablebc01d,
        codeStates['setcertificate_table'] = setcertificate_tablebc01d,
        codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
        codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dfc7dd5a0cb72a102165d549acaa682b");
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
        codeStates['overall_group'] = overall_groupf5901,
        codeStates['setoverall_group'] = setoverall_groupf5901,
        codeStates['overall_groupf5901'] = overall_groupf5901Props,
        codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
        codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
        codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
        codeStates['group'] = group6f907,
        codeStates['setgroup'] = setgroup6f907,
        codeStates['group6f907'] = group6f907Props,
        codeStates['setgroup6f907'] = setgroup6f907Props,
        codeStates['certificate_table'] = certificate_tablebc01d,
        codeStates['setcertificate_table'] = setcertificate_tablebc01d,
        codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
        codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_version_table_groupa682bRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_version_table_groupa682bRef.current?.setSearchParams();
    ai_asset_version_table_groupa682bRef.current?.handleSearch({});
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
        !Array.isArray(ai_asset_version_table_groupa682b) &&
        Object.keys(ai_asset_version_table_groupa682b)?.length > 0
      ) {
        setai_asset_version_table_groupa682b({})
        setai_asset_version_table_groupa682bProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_version_table_groupa682bProps?.refresh])


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
        gridRow: '1 / 140',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 !border border-gray-300 hover:border-gray-400 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertificationstages_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_version_table_group"}))
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
        {allowedComponent.includes("certificate_table")  &&<Groupcertificate_table  
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
    </div>
 )
}

export default Groupai_asset_version_table_group
