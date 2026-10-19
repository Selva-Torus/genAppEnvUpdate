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
import Groupstages_table  from "../Groupstages_table/Groupstages_table";
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
  const {dfd_listallshowstages_v1Props, setdfd_listallshowstages_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "stages_table"
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
      "stages_table"
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
      "stages_table"
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
      "stages_table"
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
      "stages_table"
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
      "stages_table"
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
      "stages_table"
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
  const {overall_groupc4a49, setoverall_groupc4a49}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupc4a49Props, setoverall_groupc4a49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27, setai_asset_version_table_group1bd27}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1bd27Props, setai_asset_version_table_group1bd27Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012, setgroupe4012}= useContext(TotalContext) as TotalContextProps;
  const {groupe4012Props, setgroupe4012Props}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99eb, setstages_tableb99eb}= useContext(TotalContext) as TotalContextProps;
  const {stages_tableb99ebProps, setstages_tableb99ebProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {showallstagesmyapproval_v1, setshowallstagesmyapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:showallStagesMyApproval:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "634bd4b3377aa6496d3352e0c451bd27");
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
    setai_asset_version_table_group1bd27Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroupe4012((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(groupe4012?.isDisabled==null)
      {
        setgroupe4012((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stages_table")){
        setstages_tableb99ebProps((pre:any)=>({...pre,...stages_tableb99eb,isDisabled:true}));

    }else
    {
      if(stages_tableb99eb?.isDisabled==null)
      {
        setstages_tableb99ebProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "634bd4b3377aa6496d3352e0c451bd27");
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
        codeStates['overall_group'] = overall_groupc4a49,
        codeStates['setoverall_group'] = setoverall_groupc4a49,
        codeStates['overall_groupc4a49'] = overall_groupc4a49Props,
        codeStates['setoverall_groupc4a49'] = setoverall_groupc4a49Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1bd27,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1bd27,
        codeStates['ai_asset_version_table_group1bd27'] = ai_asset_version_table_group1bd27Props,
        codeStates['setai_asset_version_table_group1bd27'] = setai_asset_version_table_group1bd27Props,
        codeStates['group'] = groupe4012,
        codeStates['setgroup'] = setgroupe4012,
        codeStates['groupe4012'] = groupe4012Props,
        codeStates['setgroupe4012'] = setgroupe4012Props,
        codeStates['stages_table'] = stages_tableb99eb,
        codeStates['setstages_table'] = setstages_tableb99eb,
        codeStates['stages_tableb99eb'] = stages_tableb99ebProps,
        codeStates['setstages_tableb99eb'] = setstages_tableb99ebProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_version_table_group1bd27Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_version_table_group1bd27Ref.current?.setSearchParams();
    ai_asset_version_table_group1bd27Ref.current?.handleSearch({});
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
        !Array.isArray(ai_asset_version_table_group1bd27) &&
        Object.keys(ai_asset_version_table_group1bd27)?.length > 0
      ) {
        setai_asset_version_table_group1bd27({})
        setai_asset_version_table_group1bd27Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_version_table_group1bd27Props?.refresh])


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
          setshowallstagesmyapproval_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_version_table_group"}))
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
        {allowedComponent.includes("stages_table")  &&<Groupstages_table  
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
