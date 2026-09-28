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
import Groupcode_table  from "../Groupcode_table/Groupcode_table";
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
import Buttonrefresh_btn  from "./Buttonrefresh_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonnew_codetypes  from "./Buttonnew_codetypes";
import Textcode_text  from "./Textcode_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_btn",
      "search_btn",
      "new_codetypes",
      "code_text"
    ],
    "allowedGroups": [
      "canvas",
      "code_group",
      "code_table"
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
  const {code_groupe769a, setcode_groupe769a}= useContext(TotalContext) as TotalContextProps;
  const {code_groupe769aProps, setcode_groupe769aProps}= useContext(TotalContext) as TotalContextProps;
  const {refresh_btnd173b, setrefresh_btnd173b}= useContext(TotalContext) as TotalContextProps;
  const {search_btnbf877, setsearch_btnbf877}= useContext(TotalContext) as TotalContextProps;
  const {new_codetypes3f6c1, setnew_codetypes3f6c1}= useContext(TotalContext) as TotalContextProps;
  const {code_text5400d, setcode_text5400d}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011, setcode_table4f011}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011Props, setcode_table4f011Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {codetypes_v1, setcodetypes_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1',
    [user],
    'GroupCodeGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d0969b76e95949ed8ee1e6d4a68e769a");
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
    setcode_groupe769aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("refresh_btn")){
        setrefresh_btnd173b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_btnd173b?.isDisabled==null)
      {
        setrefresh_btnd173b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btnbf877((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btnbf877?.isDisabled==null)
      {
        setsearch_btnbf877((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_codetypes")){
        setnew_codetypes3f6c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_codetypes3f6c1?.isDisabled==null)
      {
        setnew_codetypes3f6c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_text")){
        setcode_text5400d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_text5400d?.isDisabled==null)
      {
        setcode_text5400d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_table")){
        setcode_table4f011Props((pre:any)=>({...pre,...code_table4f011,isDisabled:true}));

    }else
    {
      if(code_table4f011?.isDisabled==null)
      {
        setcode_table4f011Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_group'] = code_groupe769a,
        codeStates['setcode_group'] = setcode_groupe769a,
        codeStates['code_groupe769a'] = code_groupe769aProps,
        codeStates['setcode_groupe769a'] = setcode_groupe769aProps,
        codeStates['refresh_btn'] = refresh_btnd173b,
        codeStates['setrefresh_btn'] = setrefresh_btnd173b,
        codeStates['search_btn'] = search_btnbf877,
        codeStates['setsearch_btn'] = setsearch_btnbf877,
        codeStates['new_codetypes'] = new_codetypes3f6c1,
        codeStates['setnew_codetypes'] = setnew_codetypes3f6c1,
        codeStates['code_text'] = code_text5400d,
        codeStates['setcode_text'] = setcode_text5400d,
        codeStates['code_table'] = code_table4f011,
        codeStates['setcode_table'] = setcode_table4f011,
        codeStates['code_table4f011'] = code_table4f011Props,
        codeStates['setcode_table4f011'] = setcode_table4f011Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d0969b76e95949ed8ee1e6d4a68e769a");
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
        codeStates['code_group'] = code_groupe769a,
        codeStates['setcode_group'] = setcode_groupe769a,
        codeStates['code_groupe769a'] = code_groupe769aProps,
        codeStates['setcode_groupe769a'] = setcode_groupe769aProps,
        codeStates['refresh_btn'] = refresh_btnd173b,
        codeStates['setrefresh_btn'] = setrefresh_btnd173b,
        codeStates['search_btn'] = search_btnbf877,
        codeStates['setsearch_btn'] = setsearch_btnbf877,
        codeStates['new_codetypes'] = new_codetypes3f6c1,
        codeStates['setnew_codetypes'] = setnew_codetypes3f6c1,
        codeStates['code_text'] = code_text5400d,
        codeStates['setcode_text'] = setcode_text5400d,
        codeStates['code_table'] = code_table4f011,
        codeStates['setcode_table'] = setcode_table4f011,
        codeStates['code_table4f011'] = code_table4f011Props,
        codeStates['setcode_table4f011'] = setcode_table4f011Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_groupe769aRef = useRef<any>(null);
  const handleClearSearch = () => {
    code_groupe769aRef.current?.setSearchParams();
    code_groupe769aRef.current?.handleSearch({});
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
        !Array.isArray(code_groupe769a) &&
        Object.keys(code_groupe769a)?.length > 0
      ) {
        setcode_groupe769a({})
      }
    } else prevRefreshRef.current = true
  }, [code_groupe769aProps?.refresh])


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
        gridRow: '1 / 154',
      
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
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcodetypes_v1((pre:any)=>({...pre,_selectedGroup_:"code_group"}))
        }}
    >
        {allowedComponent.includes("code_table")  &&<Groupcode_table  
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
        {        ((ruleData?.length>0 && "refresh_btn" in ButtonGoRuleData)?ButtonGoRuleData["refresh_btn"]:true) && 
          allowedControls.includes("refresh_btn")  ?            <Buttonrefresh_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_codetypes" in ButtonGoRuleData)?ButtonGoRuleData["new_codetypes"]:true) && 
          allowedControls.includes("new_codetypes")  ?            <Buttonnew_codetypes tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("code_text") ?<Textcode_text   /* 5400d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcode_group
