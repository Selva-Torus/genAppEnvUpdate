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
import Grouptemplate_stage  from "../Grouptemplate_stage/Grouptemplate_stage";
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
import Textcert_tem  from "./Textcert_tem";
import Buttonref_btn  from "./Buttonref_btn";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import Buttonadd_stage_btn  from "./Buttonadd_stage_btn";
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
  const {dfd_certificationstage_v1Props, setdfd_certificationstage_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cert_tem",
      "ref_btn",
      "search_btn",
      "add_stage_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_stage"
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
  const {groupd2d37, setgroupd2d37}= useContext(TotalContext) as TotalContextProps;
  const {groupd2d37Props, setgroupd2d37Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_teme9ae9, setcert_teme9ae9}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn698cc, setref_btn698cc}= useContext(TotalContext) as TotalContextProps;
  const {search_btn0e2b9, setsearch_btn0e2b9}= useContext(TotalContext) as TotalContextProps;
  const {add_stage_btn432d9, setadd_stage_btn432d9}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933, settemplate_stage1d933}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933Props, settemplate_stage1d933Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certificationtemplatestage_v1, setcertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "902f749ab33942e2a6b14808a50d2d37");
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
    setgroupd2d37Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cert_tem")){
        setcert_teme9ae9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_teme9ae9?.isDisabled==null)
      {
        setcert_teme9ae9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_btn")){
        setref_btn698cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_btn698cc?.isDisabled==null)
      {
        setref_btn698cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn0e2b9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn0e2b9?.isDisabled==null)
      {
        setsearch_btn0e2b9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_stage_btn")){
        setadd_stage_btn432d9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_stage_btn432d9?.isDisabled==null)
      {
        setadd_stage_btn432d9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_stage")){
        settemplate_stage1d933Props((pre:any)=>({...pre,...template_stage1d933,isDisabled:true}));

    }else
    {
      if(template_stage1d933?.isDisabled==null)
      {
        settemplate_stage1d933Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupd2d37,
        codeStates['setgroup'] = setgroupd2d37,
        codeStates['groupd2d37'] = groupd2d37Props,
        codeStates['setgroupd2d37'] = setgroupd2d37Props,
        codeStates['cert_tem'] = cert_teme9ae9,
        codeStates['setcert_tem'] = setcert_teme9ae9,
        codeStates['ref_btn'] = ref_btn698cc,
        codeStates['setref_btn'] = setref_btn698cc,
        codeStates['search_btn'] = search_btn0e2b9,
        codeStates['setsearch_btn'] = setsearch_btn0e2b9,
        codeStates['add_stage_btn'] = add_stage_btn432d9,
        codeStates['setadd_stage_btn'] = setadd_stage_btn432d9,
        codeStates['template_stage'] = template_stage1d933,
        codeStates['settemplate_stage'] = settemplate_stage1d933,
        codeStates['template_stage1d933'] = template_stage1d933Props,
        codeStates['settemplate_stage1d933'] = settemplate_stage1d933Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "902f749ab33942e2a6b14808a50d2d37");
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
        codeStates['group'] = groupd2d37,
        codeStates['setgroup'] = setgroupd2d37,
        codeStates['groupd2d37'] = groupd2d37Props,
        codeStates['setgroupd2d37'] = setgroupd2d37Props,
        codeStates['cert_tem'] = cert_teme9ae9,
        codeStates['setcert_tem'] = setcert_teme9ae9,
        codeStates['ref_btn'] = ref_btn698cc,
        codeStates['setref_btn'] = setref_btn698cc,
        codeStates['search_btn'] = search_btn0e2b9,
        codeStates['setsearch_btn'] = setsearch_btn0e2b9,
        codeStates['add_stage_btn'] = add_stage_btn432d9,
        codeStates['setadd_stage_btn'] = setadd_stage_btn432d9,
        codeStates['template_stage'] = template_stage1d933,
        codeStates['settemplate_stage'] = settemplate_stage1d933,
        codeStates['template_stage1d933'] = template_stage1d933Props,
        codeStates['settemplate_stage1d933'] = settemplate_stage1d933Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupd2d37Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupd2d37Ref.current?.setSearchParams();
    groupd2d37Ref.current?.handleSearch({});
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
        !Array.isArray(groupd2d37) &&
        Object.keys(groupd2d37)?.length > 0
      ) {
        setgroupd2d37({})
      }
    } else prevRefreshRef.current = true
  }, [groupd2d37Props?.refresh])


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
        gridRow: '2 / 123',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '3px',
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
          setcertificationtemplatestage_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("template_stage")  &&<Grouptemplate_stage  
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
          {allowedControls.includes("cert_tem") ?<Textcert_tem   /* e9ae9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "ref_btn" in ButtonGoRuleData)?ButtonGoRuleData["ref_btn"]:true) && 
          allowedControls.includes("ref_btn")  ?            <Buttonref_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_stage_btn" in ButtonGoRuleData)?ButtonGoRuleData["add_stage_btn"]:true) && 
          allowedControls.includes("add_stage_btn")  ?            <Buttonadd_stage_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
