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
import TextInputfile_name  from "./TextInputfile_name";
import TextInputsf_file_name  from "./TextInputsf_file_name";
import TextInputestab_id  from "./TextInputestab_id";
import TextInputcorp_name  from "./TextInputcorp_name";
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
  const {dfd_sifsummaryreport_v1Props, setdfd_sifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "file_name",
      "sf_file_name",
      "estab_id",
      "corp_name",
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
      "file_name",
      "sf_file_name",
      "estab_id",
      "corp_name",
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
      "file_name",
      "sf_file_name",
      "estab_id",
      "corp_name",
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
  const {main_groupb2798, setmain_groupb2798}= useContext(TotalContext) as TotalContextProps;
  const {main_groupb2798Props, setmain_groupb2798Props}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerbb8b6, settop_dividerbb8b6}= useContext(TotalContext) as TotalContextProps;
  const {file_namefb5d0, setfile_namefb5d0}= useContext(TotalContext) as TotalContextProps;
  const {sf_file_name06efb, setsf_file_name06efb}= useContext(TotalContext) as TotalContextProps;
  const {estab_idbde42, setestab_idbde42}= useContext(TotalContext) as TotalContextProps;
  const {corp_name2b998, setcorp_name2b998}= useContext(TotalContext) as TotalContextProps;
  const {bottom_dividerdb520, setbottom_dividerdb520}= useContext(TotalContext) as TotalContextProps;
  const {searchb3ab8, setsearchb3ab8}= useContext(TotalContext) as TotalContextProps;
  const {clear56e07, setclear56e07}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {sifreportsearch_v1, setsifreportsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:sifReportSearch:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d745c026e7c644c1935832f70dab2798");
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
    setmain_groupb2798Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("top_divider")){
        settop_dividerbb8b6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(top_dividerbb8b6?.isDisabled==null)
      {
        settop_dividerbb8b6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("file_name")){
        setfile_namefb5d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(file_namefb5d0?.isDisabled==null)
      {
        setfile_namefb5d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sf_file_name")){
        setsf_file_name06efb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sf_file_name06efb?.isDisabled==null)
      {
        setsf_file_name06efb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("estab_id")){
        setestab_idbde42((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(estab_idbde42?.isDisabled==null)
      {
        setestab_idbde42((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("corp_name")){
        setcorp_name2b998((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(corp_name2b998?.isDisabled==null)
      {
        setcorp_name2b998((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bottom_divider")){
        setbottom_dividerdb520((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(bottom_dividerdb520?.isDisabled==null)
      {
        setbottom_dividerdb520((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearchb3ab8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(searchb3ab8?.isDisabled==null)
      {
        setsearchb3ab8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("clear")){
        setclear56e07((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(clear56e07?.isDisabled==null)
      {
        setclear56e07((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['main_group'] = main_groupb2798,
        codeStates['setmain_group'] = setmain_groupb2798,
        codeStates['main_groupb2798'] = main_groupb2798Props,
        codeStates['setmain_groupb2798'] = setmain_groupb2798Props,
        codeStates['top_divider'] = top_dividerbb8b6,
        codeStates['settop_divider'] = settop_dividerbb8b6,
        codeStates['file_name'] = file_namefb5d0,
        codeStates['setfile_name'] = setfile_namefb5d0,
        codeStates['sf_file_name'] = sf_file_name06efb,
        codeStates['setsf_file_name'] = setsf_file_name06efb,
        codeStates['estab_id'] = estab_idbde42,
        codeStates['setestab_id'] = setestab_idbde42,
        codeStates['corp_name'] = corp_name2b998,
        codeStates['setcorp_name'] = setcorp_name2b998,
        codeStates['bottom_divider'] = bottom_dividerdb520,
        codeStates['setbottom_divider'] = setbottom_dividerdb520,
        codeStates['search'] = searchb3ab8,
        codeStates['setsearch'] = setsearchb3ab8,
        codeStates['clear'] = clear56e07,
        codeStates['setclear'] = setclear56e07,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d745c026e7c644c1935832f70dab2798");
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
        codeStates['main_group'] = main_groupb2798,
        codeStates['setmain_group'] = setmain_groupb2798,
        codeStates['main_groupb2798'] = main_groupb2798Props,
        codeStates['setmain_groupb2798'] = setmain_groupb2798Props,
        codeStates['top_divider'] = top_dividerbb8b6,
        codeStates['settop_divider'] = settop_dividerbb8b6,
        codeStates['file_name'] = file_namefb5d0,
        codeStates['setfile_name'] = setfile_namefb5d0,
        codeStates['sf_file_name'] = sf_file_name06efb,
        codeStates['setsf_file_name'] = setsf_file_name06efb,
        codeStates['estab_id'] = estab_idbde42,
        codeStates['setestab_id'] = setestab_idbde42,
        codeStates['corp_name'] = corp_name2b998,
        codeStates['setcorp_name'] = setcorp_name2b998,
        codeStates['bottom_divider'] = bottom_dividerdb520,
        codeStates['setbottom_divider'] = setbottom_dividerdb520,
        codeStates['search'] = searchb3ab8,
        codeStates['setsearch'] = setsearchb3ab8,
        codeStates['clear'] = clear56e07,
        codeStates['setclear'] = setclear56e07,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const main_groupb2798Ref = useRef<any>(null);
  const handleClearSearch = () => {
    main_groupb2798Ref.current?.setSearchParams();
    main_groupb2798Ref.current?.handleSearch({});
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
        !Array.isArray(main_groupb2798) &&
        Object.keys(main_groupb2798)?.length > 0
      ) {
        setmain_groupb2798({})
        setmain_groupb2798Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [main_groupb2798Props?.refresh])


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
        gridRow: '1 / 51',
      
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
          setsifreportsearch_v1((pre:any)=>({...pre,_selectedGroup_:"main_group"}))
        }}
    >
        {allowedControls.includes("top_divider") ?<Dividertop_divider   /* bb8b6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("file_name") ?<TextInputfile_name   /* fb5d0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sf_file_name") ?<TextInputsf_file_name   /* 06efb */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("estab_id") ?<TextInputestab_id   /* bde42 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("corp_name") ?<TextInputcorp_name   /* 2b998 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("bottom_divider") ?<Dividerbottom_divider   /* db520 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "clear" in ButtonGoRuleData)?ButtonGoRuleData["clear"]:true) && 
          allowedControls.includes("clear")  ?            <Buttonclear tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupmain_group
