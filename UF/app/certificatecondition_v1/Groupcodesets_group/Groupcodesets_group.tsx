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
import Groupcode_sets_table  from "../Groupcode_sets_table/Groupcode_sets_table";
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
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_btn  from "./Buttonadd_btn";
import Texttext  from "./Texttext";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcodesets_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificationcondition_v1Props, setdfd_certificationcondition_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ref_btn",
      "search_btn",
      "add_btn",
      "text"
    ],
    "allowedGroups": [
      "canvas",
      "codesets_group",
      "code_sets_table"
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
  const {codesets_groupedfac, setcodesets_groupedfac}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupedfacProps, setcodesets_groupedfacProps}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn2442c, setref_btn2442c}= useContext(TotalContext) as TotalContextProps;
  const {search_btndaadf, setsearch_btndaadf}= useContext(TotalContext) as TotalContextProps;
  const {add_btn4df0c, setadd_btn4df0c}= useContext(TotalContext) as TotalContextProps;
  const {text86958, settext86958}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7, setcode_sets_tableee3b7}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7Props, setcode_sets_tableee3b7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificatecondition_v1, setcertificatecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateCondition:AFVK:v1',
    [user],
    'GroupCodesetsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7d48157ed1e35f381ae0b310545edfac");
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
    setcodesets_groupedfacProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btn2442c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btn2442c?.isDisabled==null)
      {
        setref_btn2442c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btndaadf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btndaadf?.isDisabled==null)
      {
        setsearch_btndaadf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_btn")){
        setadd_btn4df0c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_btn4df0c?.isDisabled==null)
      {
        setadd_btn4df0c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext86958((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text86958?.isDisabled==null)
      {
        settext86958((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_sets_table")){
        setcode_sets_tableee3b7Props((pre:any)=>({...pre,...code_sets_tableee3b7,isDisabled:true}));

    }else
    {
      if(code_sets_tableee3b7?.isDisabled==null)
      {
        setcode_sets_tableee3b7Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['codesets_group'] = codesets_groupedfac,
        codeStates['setcodesets_group'] = setcodesets_groupedfac,
        codeStates['codesets_groupedfac'] = codesets_groupedfacProps,
        codeStates['setcodesets_groupedfac'] = setcodesets_groupedfacProps,
        codeStates['ref_btn'] = ref_btn2442c,
        codeStates['setref_btn'] = setref_btn2442c,
        codeStates['search_btn'] = search_btndaadf,
        codeStates['setsearch_btn'] = setsearch_btndaadf,
        codeStates['add_btn'] = add_btn4df0c,
        codeStates['setadd_btn'] = setadd_btn4df0c,
        codeStates['text'] = text86958,
        codeStates['settext'] = settext86958,
        codeStates['code_sets_table'] = code_sets_tableee3b7,
        codeStates['setcode_sets_table'] = setcode_sets_tableee3b7,
        codeStates['code_sets_tableee3b7'] = code_sets_tableee3b7Props,
        codeStates['setcode_sets_tableee3b7'] = setcode_sets_tableee3b7Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7d48157ed1e35f381ae0b310545edfac");
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
        codeStates['codesets_group'] = codesets_groupedfac,
        codeStates['setcodesets_group'] = setcodesets_groupedfac,
        codeStates['codesets_groupedfac'] = codesets_groupedfacProps,
        codeStates['setcodesets_groupedfac'] = setcodesets_groupedfacProps,
        codeStates['ref_btn'] = ref_btn2442c,
        codeStates['setref_btn'] = setref_btn2442c,
        codeStates['search_btn'] = search_btndaadf,
        codeStates['setsearch_btn'] = setsearch_btndaadf,
        codeStates['add_btn'] = add_btn4df0c,
        codeStates['setadd_btn'] = setadd_btn4df0c,
        codeStates['text'] = text86958,
        codeStates['settext'] = settext86958,
        codeStates['code_sets_table'] = code_sets_tableee3b7,
        codeStates['setcode_sets_table'] = setcode_sets_tableee3b7,
        codeStates['code_sets_tableee3b7'] = code_sets_tableee3b7Props,
        codeStates['setcode_sets_tableee3b7'] = setcode_sets_tableee3b7Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const codesets_groupedfacRef = useRef<any>(null);
  const handleClearSearch = () => {
    codesets_groupedfacRef.current?.setSearchParams();
    codesets_groupedfacRef.current?.handleSearch({});
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
        !Array.isArray(codesets_groupedfac) &&
        Object.keys(codesets_groupedfac)?.length > 0
      ) {
        setcodesets_groupedfac({})
        setcodesets_groupedfacProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [codesets_groupedfacProps?.refresh])


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
        gridRow: '1 / 146',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '2px',
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
          setcertificatecondition_v1((pre:any)=>({...pre,_selectedGroup_:"codesets_group"}))
        }}
    >
        {allowedComponent.includes("code_sets_table")  &&<Groupcode_sets_table  
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
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_btn" in ButtonGoRuleData)?ButtonGoRuleData["add_btn"]:true) && 
          allowedControls.includes("add_btn")  ?            <Buttonadd_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("text") ?<Texttext   /* 86958 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupcodesets_group
