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
import Dividertop_divider  from "./Dividertop_divider";
import TextInputcorp_name  from "./TextInputcorp_name";
import TextInputpf_file_name  from "./TextInputpf_file_name";
import Dividerbottom_divider  from "./Dividerbottom_divider";
import Buttonsearch  from "./Buttonsearch";
import Buttonclear  from "./Buttonclear";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmain_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_pifsummaryreport_v1Props, setdfd_pifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Team": {
    "allowedControls": [
      "top_divider",
      "corp_name",
      "pf_file_name",
      "bottom_divider",
      "search",
      "clear"
    ],
    "allowedGroups": [
      "canvas",
      "main_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "top_divider",
      "corp_name",
      "pf_file_name",
      "bottom_divider",
      "search",
      "clear"
    ],
    "allowedGroups": [
      "canvas",
      "main_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "top_divider",
      "corp_name",
      "pf_file_name",
      "bottom_divider",
      "search",
      "clear"
    ],
    "allowedGroups": [
      "canvas",
      "main_group"
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
  const {main_group0c058, setmain_group0c058}= useContext(TotalContext) as TotalContextProps;
  const {main_group0c058Props, setmain_group0c058Props}= useContext(TotalContext) as TotalContextProps;
  const {top_divider34637, settop_divider34637}= useContext(TotalContext) as TotalContextProps;
  const {corp_name3791a, setcorp_name3791a}= useContext(TotalContext) as TotalContextProps;
  const {pf_file_name2c4bc, setpf_file_name2c4bc}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divider87331, setbottom_divider87331}= useContext(TotalContext) as TotalContextProps;
  const {search2ca66, setsearch2ca66}= useContext(TotalContext) as TotalContextProps;
  const {clear3234f, setclear3234f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {pifreportsearch_v1, setpifreportsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifReportSearch:AFVK:v1',
    [user],
    'GroupMainGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9015b7bba93792202027d68040f0c058");
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
    setmain_group0c058Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("top_divider")){
        settop_divider34637((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(top_divider34637?.isDisabled==null)
      {
        settop_divider34637((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("corp_name")){
        setcorp_name3791a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(corp_name3791a?.isDisabled==null)
      {
        setcorp_name3791a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("pf_file_name")){
        setpf_file_name2c4bc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(pf_file_name2c4bc?.isDisabled==null)
      {
        setpf_file_name2c4bc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bottom_divider")){
        setbottom_divider87331((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(bottom_divider87331?.isDisabled==null)
      {
        setbottom_divider87331((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch2ca66((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search2ca66?.isDisabled==null)
      {
        setsearch2ca66((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("clear")){
        setclear3234f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(clear3234f?.isDisabled==null)
      {
        setclear3234f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['main_group'] = main_group0c058,
        codeStates['setmain_group'] = setmain_group0c058,
        codeStates['main_group0c058'] = main_group0c058Props,
        codeStates['setmain_group0c058'] = setmain_group0c058Props,
        codeStates['top_divider'] = top_divider34637,
        codeStates['settop_divider'] = settop_divider34637,
        codeStates['corp_name'] = corp_name3791a,
        codeStates['setcorp_name'] = setcorp_name3791a,
        codeStates['pf_file_name'] = pf_file_name2c4bc,
        codeStates['setpf_file_name'] = setpf_file_name2c4bc,
        codeStates['bottom_divider'] = bottom_divider87331,
        codeStates['setbottom_divider'] = setbottom_divider87331,
        codeStates['search'] = search2ca66,
        codeStates['setsearch'] = setsearch2ca66,
        codeStates['clear'] = clear3234f,
        codeStates['setclear'] = setclear3234f,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9015b7bba93792202027d68040f0c058");
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
        codeStates['main_group'] = main_group0c058,
        codeStates['setmain_group'] = setmain_group0c058,
        codeStates['main_group0c058'] = main_group0c058Props,
        codeStates['setmain_group0c058'] = setmain_group0c058Props,
        codeStates['top_divider'] = top_divider34637,
        codeStates['settop_divider'] = settop_divider34637,
        codeStates['corp_name'] = corp_name3791a,
        codeStates['setcorp_name'] = setcorp_name3791a,
        codeStates['pf_file_name'] = pf_file_name2c4bc,
        codeStates['setpf_file_name'] = setpf_file_name2c4bc,
        codeStates['bottom_divider'] = bottom_divider87331,
        codeStates['setbottom_divider'] = setbottom_divider87331,
        codeStates['search'] = search2ca66,
        codeStates['setsearch'] = setsearch2ca66,
        codeStates['clear'] = clear3234f,
        codeStates['setclear'] = setclear3234f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const main_group0c058Ref = useRef<any>(null);
  const handleClearSearch = () => {
    main_group0c058Ref.current?.setSearchParams();
    main_group0c058Ref.current?.handleSearch({});
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
        !Array.isArray(main_group0c058) &&
        Object.keys(main_group0c058)?.length > 0
      ) {
        setmain_group0c058({})
        setmain_group0c058Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [main_group0c058Props?.refresh])


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
        gridRow: '1 / 37',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#ffffff',
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
          setpifreportsearch_v1((pre:any)=>({...pre,_selectedGroup_:"main_group"}))
        }}
    >
        {allowedControls.includes("top_divider") ?<Dividertop_divider   /* 34637 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("corp_name") ?<TextInputcorp_name   /* 3791a */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("pf_file_name") ?<TextInputpf_file_name   /* 2c4bc */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("bottom_divider") ?<Dividerbottom_divider   /* 87331 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          allowedControls.includes("clear")  ?            <Buttonclear tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupmain_group
