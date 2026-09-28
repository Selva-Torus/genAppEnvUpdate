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
import Groupai_asset_dependency_table  from "../Groupai_asset_dependency_table/Groupai_asset_dependency_table";
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
import Texttext  from "./Texttext";
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch  from "./Buttonsearch";
import Buttonnew_source  from "./Buttonnew_source";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_asset_dependency_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_aiassetdependency_v1Props, setdfd_aiassetdependency_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search",
      "new_source"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "ai_asset_dependency_table"
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
  const {overall_group5e5f7, setoverall_group5e5f7}= useContext(TotalContext) as TotalContextProps;
  const {overall_group5e5f7Props, setoverall_group5e5f7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcec, setai_asset_dependency_groupdbcec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcecProps, setai_asset_dependency_groupdbcecProps}= useContext(TotalContext) as TotalContextProps;
  const {textde639, settextde639}= useContext(TotalContext) as TotalContextProps;
  const {refresh_buttonca25d, setrefresh_buttonca25d}= useContext(TotalContext) as TotalContextProps;
  const {search53d65, setsearch53d65}= useContext(TotalContext) as TotalContextProps;
  const {new_sourcea3d90, setnew_sourcea3d90}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8, setai_asset_dependency_table789c8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8Props, setai_asset_dependency_table789c8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aiassetdependency_v1, setaiassetdependency_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetDependency:AFVK:v1',
    [user],
    'GroupAiAssetDependencyGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6599e6665c1756893804a3fde9ddbcec");
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
    setai_asset_dependency_groupdbcecProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextde639((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textde639?.isDisabled==null)
      {
        settextde639((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_buttonca25d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_buttonca25d?.isDisabled==null)
      {
        setrefresh_buttonca25d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch53d65((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search53d65?.isDisabled==null)
      {
        setsearch53d65((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_source")){
        setnew_sourcea3d90((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(new_sourcea3d90?.isDisabled==null)
      {
        setnew_sourcea3d90((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_dependency_table")){
        setai_asset_dependency_table789c8Props((pre:any)=>({...pre,...ai_asset_dependency_table789c8,isDisabled:true}));

    }else
    {
      if(ai_asset_dependency_table789c8?.isDisabled==null)
      {
        setai_asset_dependency_table789c8Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group5e5f7,
        codeStates['setoverall_group'] = setoverall_group5e5f7,
        codeStates['overall_group5e5f7'] = overall_group5e5f7Props,
        codeStates['setoverall_group5e5f7'] = setoverall_group5e5f7Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupdbcec,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupdbcec,
        codeStates['ai_asset_dependency_groupdbcec'] = ai_asset_dependency_groupdbcecProps,
        codeStates['setai_asset_dependency_groupdbcec'] = setai_asset_dependency_groupdbcecProps,
        codeStates['text'] = textde639,
        codeStates['settext'] = settextde639,
        codeStates['refresh_button'] = refresh_buttonca25d,
        codeStates['setrefresh_button'] = setrefresh_buttonca25d,
        codeStates['search'] = search53d65,
        codeStates['setsearch'] = setsearch53d65,
        codeStates['new_source'] = new_sourcea3d90,
        codeStates['setnew_source'] = setnew_sourcea3d90,
        codeStates['ai_asset_dependency_table'] = ai_asset_dependency_table789c8,
        codeStates['setai_asset_dependency_table'] = setai_asset_dependency_table789c8,
        codeStates['ai_asset_dependency_table789c8'] = ai_asset_dependency_table789c8Props,
        codeStates['setai_asset_dependency_table789c8'] = setai_asset_dependency_table789c8Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6599e6665c1756893804a3fde9ddbcec");
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
        codeStates['overall_group'] = overall_group5e5f7,
        codeStates['setoverall_group'] = setoverall_group5e5f7,
        codeStates['overall_group5e5f7'] = overall_group5e5f7Props,
        codeStates['setoverall_group5e5f7'] = setoverall_group5e5f7Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupdbcec,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupdbcec,
        codeStates['ai_asset_dependency_groupdbcec'] = ai_asset_dependency_groupdbcecProps,
        codeStates['setai_asset_dependency_groupdbcec'] = setai_asset_dependency_groupdbcecProps,
        codeStates['text'] = textde639,
        codeStates['settext'] = settextde639,
        codeStates['refresh_button'] = refresh_buttonca25d,
        codeStates['setrefresh_button'] = setrefresh_buttonca25d,
        codeStates['search'] = search53d65,
        codeStates['setsearch'] = setsearch53d65,
        codeStates['new_source'] = new_sourcea3d90,
        codeStates['setnew_source'] = setnew_sourcea3d90,
        codeStates['ai_asset_dependency_table'] = ai_asset_dependency_table789c8,
        codeStates['setai_asset_dependency_table'] = setai_asset_dependency_table789c8,
        codeStates['ai_asset_dependency_table789c8'] = ai_asset_dependency_table789c8Props,
        codeStates['setai_asset_dependency_table789c8'] = setai_asset_dependency_table789c8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_dependency_groupdbcecRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_dependency_groupdbcecRef.current?.setSearchParams();
    ai_asset_dependency_groupdbcecRef.current?.handleSearch({});
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
        !Array.isArray(ai_asset_dependency_groupdbcec) &&
        Object.keys(ai_asset_dependency_groupdbcec)?.length > 0
      ) {
        setai_asset_dependency_groupdbcec({})
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_dependency_groupdbcecProps?.refresh])


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
        gridRow: '1 / 148',
      
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
          setaiassetdependency_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_dependency_group"}))
        }}
    >
        {allowedComponent.includes("ai_asset_dependency_table")  &&<Groupai_asset_dependency_table  
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
          {allowedControls.includes("text") ?<Texttext   /* de639 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_source" in ButtonGoRuleData)?ButtonGoRuleData["new_source"]:true) && 
          allowedControls.includes("new_source")  ?            <Buttonnew_source tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_asset_dependency_group
