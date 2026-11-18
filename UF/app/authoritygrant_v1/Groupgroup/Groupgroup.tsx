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
import Groupassets_group  from "../Groupassets_group/Groupassets_group";
import Grouptool_grant_table  from "../Grouptool_grant_table/Grouptool_grant_table";
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
import Textauth_grant_txt  from "./Textauth_grant_txt";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_btn  from "./Buttonadd_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_authoritygrant_v1Props, setdfd_authoritygrant_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "auth_grant_txt",
      "ref_btn",
      "search_btn",
      "add_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "assets_group",
      "tool_grant_table"
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
  const {group7b86a, setgroup7b86a}= useContext(TotalContext) as TotalContextProps;
  const {group7b86aProps, setgroup7b86aProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_txt69316, setauth_grant_txt69316}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnb51e8, setref_btnb51e8}= useContext(TotalContext) as TotalContextProps;
  const {search_btnceb31, setsearch_btnceb31}= useContext(TotalContext) as TotalContextProps;
  const {add_btnc52a0, setadd_btnc52a0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {authoritygrant_v1, setauthoritygrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "208431caa80250f209902a071347b86a");
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
    setgroup7b86aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("auth_grant_txt")){
        setauth_grant_txt69316((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(auth_grant_txt69316?.isDisabled==null)
      {
        setauth_grant_txt69316((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btnb51e8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btnb51e8?.isDisabled==null)
      {
        setref_btnb51e8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btnceb31((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btnceb31?.isDisabled==null)
      {
        setsearch_btnceb31((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_btn")){
        setadd_btnc52a0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_btnc52a0?.isDisabled==null)
      {
        setadd_btnc52a0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assets_group")){
        setassets_group5eaf0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assets_group5eaf0?.isDisabled==null)
      {
        setassets_group5eaf0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant_table")){
        settool_grant_tabledbd5bProps((pre:any)=>({...pre,...tool_grant_tabledbd5b,isDisabled:true}));

    }else
    {
      if(tool_grant_tabledbd5b?.isDisabled==null)
      {
        settool_grant_tabledbd5bProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group7b86a,
        codeStates['setgroup'] = setgroup7b86a,
        codeStates['group7b86a'] = group7b86aProps,
        codeStates['setgroup7b86a'] = setgroup7b86aProps,
        codeStates['auth_grant_txt'] = auth_grant_txt69316,
        codeStates['setauth_grant_txt'] = setauth_grant_txt69316,
        codeStates['ref_btn'] = ref_btnb51e8,
        codeStates['setref_btn'] = setref_btnb51e8,
        codeStates['search_btn'] = search_btnceb31,
        codeStates['setsearch_btn'] = setsearch_btnceb31,
        codeStates['add_btn'] = add_btnc52a0,
        codeStates['setadd_btn'] = setadd_btnc52a0,
        codeStates['assets_group'] = assets_group5eaf0,
        codeStates['setassets_group'] = setassets_group5eaf0,
        codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
        codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
        codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
        codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
        codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
        codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "208431caa80250f209902a071347b86a");
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
        codeStates['group'] = group7b86a,
        codeStates['setgroup'] = setgroup7b86a,
        codeStates['group7b86a'] = group7b86aProps,
        codeStates['setgroup7b86a'] = setgroup7b86aProps,
        codeStates['auth_grant_txt'] = auth_grant_txt69316,
        codeStates['setauth_grant_txt'] = setauth_grant_txt69316,
        codeStates['ref_btn'] = ref_btnb51e8,
        codeStates['setref_btn'] = setref_btnb51e8,
        codeStates['search_btn'] = search_btnceb31,
        codeStates['setsearch_btn'] = setsearch_btnceb31,
        codeStates['add_btn'] = add_btnc52a0,
        codeStates['setadd_btn'] = setadd_btnc52a0,
        codeStates['assets_group'] = assets_group5eaf0,
        codeStates['setassets_group'] = setassets_group5eaf0,
        codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
        codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
        codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
        codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
        codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
        codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group7b86aRef = useRef<any>(null);
  const handleClearSearch = () => {
    group7b86aRef.current?.setSearchParams();
    group7b86aRef.current?.handleSearch({});
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
        !Array.isArray(group7b86a) &&
        Object.keys(group7b86a)?.length > 0
      ) {
        setgroup7b86a({})
        setgroup7b86aProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group7b86aProps?.refresh])


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
        gridRow: '1 / 139',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '4px',
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
          setauthoritygrant_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("assets_group")  &&<Groupassets_group  
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
        {allowedComponent.includes("tool_grant_table")  &&<Grouptool_grant_table  
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
          {allowedControls.includes("auth_grant_txt") ?<Textauth_grant_txt   /* 69316 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_btn" in ButtonGoRuleData)?ButtonGoRuleData["add_btn"]:true) && 
          allowedControls.includes("add_btn")  ?            <Buttonadd_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
