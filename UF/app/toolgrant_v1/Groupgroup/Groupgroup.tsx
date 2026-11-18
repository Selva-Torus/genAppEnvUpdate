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
import Texttool_grand_txt  from "./Texttool_grand_txt";
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
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
      "tool_grand_txt",
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
  const {group90bf1, setgroup90bf1}= useContext(TotalContext) as TotalContextProps;
  const {group90bf1Props, setgroup90bf1Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grand_txt7725d, settool_grand_txt7725d}= useContext(TotalContext) as TotalContextProps;
  const {ref_btne2a5b, setref_btne2a5b}= useContext(TotalContext) as TotalContextProps;
  const {search_btna41e6, setsearch_btna41e6}= useContext(TotalContext) as TotalContextProps;
  const {add_btn834b7, setadd_btn834b7}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88, setassets_group37c88}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88Props, setassets_group37c88Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5, settool_grant_tabled00d5}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5Props, settool_grant_tabled00d5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {toolgrant_v1, settoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3db908c0ad9dfbc1476815b76dc90bf1");
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
    setgroup90bf1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tool_grand_txt")){
        settool_grand_txt7725d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_grand_txt7725d?.isDisabled==null)
      {
        settool_grand_txt7725d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btne2a5b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btne2a5b?.isDisabled==null)
      {
        setref_btne2a5b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btna41e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btna41e6?.isDisabled==null)
      {
        setsearch_btna41e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_btn")){
        setadd_btn834b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_btn834b7?.isDisabled==null)
      {
        setadd_btn834b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assets_group")){
        setassets_group37c88((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assets_group37c88?.isDisabled==null)
      {
        setassets_group37c88((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant_table")){
        settool_grant_tabled00d5Props((pre:any)=>({...pre,...tool_grant_tabled00d5,isDisabled:true}));

    }else
    {
      if(tool_grant_tabled00d5?.isDisabled==null)
      {
        settool_grant_tabled00d5Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group90bf1,
        codeStates['setgroup'] = setgroup90bf1,
        codeStates['group90bf1'] = group90bf1Props,
        codeStates['setgroup90bf1'] = setgroup90bf1Props,
        codeStates['tool_grand_txt'] = tool_grand_txt7725d,
        codeStates['settool_grand_txt'] = settool_grand_txt7725d,
        codeStates['ref_btn'] = ref_btne2a5b,
        codeStates['setref_btn'] = setref_btne2a5b,
        codeStates['search_btn'] = search_btna41e6,
        codeStates['setsearch_btn'] = setsearch_btna41e6,
        codeStates['add_btn'] = add_btn834b7,
        codeStates['setadd_btn'] = setadd_btn834b7,
        codeStates['assets_group'] = assets_group37c88,
        codeStates['setassets_group'] = setassets_group37c88,
        codeStates['assets_group37c88'] = assets_group37c88Props,
        codeStates['setassets_group37c88'] = setassets_group37c88Props,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3db908c0ad9dfbc1476815b76dc90bf1");
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
        codeStates['group'] = group90bf1,
        codeStates['setgroup'] = setgroup90bf1,
        codeStates['group90bf1'] = group90bf1Props,
        codeStates['setgroup90bf1'] = setgroup90bf1Props,
        codeStates['tool_grand_txt'] = tool_grand_txt7725d,
        codeStates['settool_grand_txt'] = settool_grand_txt7725d,
        codeStates['ref_btn'] = ref_btne2a5b,
        codeStates['setref_btn'] = setref_btne2a5b,
        codeStates['search_btn'] = search_btna41e6,
        codeStates['setsearch_btn'] = setsearch_btna41e6,
        codeStates['add_btn'] = add_btn834b7,
        codeStates['setadd_btn'] = setadd_btn834b7,
        codeStates['assets_group'] = assets_group37c88,
        codeStates['setassets_group'] = setassets_group37c88,
        codeStates['assets_group37c88'] = assets_group37c88Props,
        codeStates['setassets_group37c88'] = setassets_group37c88Props,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group90bf1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group90bf1Ref.current?.setSearchParams();
    group90bf1Ref.current?.handleSearch({});
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
        !Array.isArray(group90bf1) &&
        Object.keys(group90bf1)?.length > 0
      ) {
        setgroup90bf1({})
        setgroup90bf1Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group90bf1Props?.refresh])


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
          settoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
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
          {allowedControls.includes("tool_grand_txt") ?<Texttool_grand_txt   /* 7725d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
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
