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
import Buttonapproved_btn  from "./Buttonapproved_btn";
import Texttier_assessment_id  from "./Texttier_assessment_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_myapprovalrisk_v1Props, setdfd_myapprovalrisk_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "approved_btn",
      "tier_assessment_id"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "group"
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
  const {overall_ai_asset_registryc00ea, setoverall_ai_asset_registryc00ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc00eaProps, setoverall_ai_asset_registryc00eaProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5d, setai_registry_groupdee5d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5dProps, setai_registry_groupdee5dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4, setgroupf7df4}= useContext(TotalContext) as TotalContextProps;
  const {groupf7df4Props, setgroupf7df4Props}= useContext(TotalContext) as TotalContextProps;
  const {approved_btn70ab7, setapproved_btn70ab7}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id30bca, settier_assessment_id30bca}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewruleevaluation_v1, setviewruleevaluation_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewRuleEvaluation:AFVK:v1',
    [user],
    'GroupAiRegistryGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "82f6c37b222729676495daf7483dee5d");
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
    setai_registry_groupdee5dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroupf7df4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(groupf7df4?.isDisabled==null)
      {
        setgroupf7df4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approved_btn")){
        setapproved_btn70ab7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approved_btn70ab7?.isDisabled==null)
      {
        setapproved_btn70ab7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tier_assessment_id")){
        settier_assessment_id30bca((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tier_assessment_id30bca?.isDisabled==null)
      {
        settier_assessment_id30bca((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc00ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc00ea,
        codeStates['overall_ai_asset_registryc00ea'] = overall_ai_asset_registryc00eaProps,
        codeStates['setoverall_ai_asset_registryc00ea'] = setoverall_ai_asset_registryc00eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdee5d,
        codeStates['setai_registry_group'] = setai_registry_groupdee5d,
        codeStates['ai_registry_groupdee5d'] = ai_registry_groupdee5dProps,
        codeStates['setai_registry_groupdee5d'] = setai_registry_groupdee5dProps,
        codeStates['group'] = groupf7df4,
        codeStates['setgroup'] = setgroupf7df4,
        codeStates['groupf7df4'] = groupf7df4Props,
        codeStates['setgroupf7df4'] = setgroupf7df4Props,
        codeStates['approved_btn'] = approved_btn70ab7,
        codeStates['setapproved_btn'] = setapproved_btn70ab7,
        codeStates['tier_assessment_id'] = tier_assessment_id30bca,
        codeStates['settier_assessment_id'] = settier_assessment_id30bca,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "82f6c37b222729676495daf7483dee5d");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc00ea,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc00ea,
        codeStates['overall_ai_asset_registryc00ea'] = overall_ai_asset_registryc00eaProps,
        codeStates['setoverall_ai_asset_registryc00ea'] = setoverall_ai_asset_registryc00eaProps,
        codeStates['ai_registry_group'] = ai_registry_groupdee5d,
        codeStates['setai_registry_group'] = setai_registry_groupdee5d,
        codeStates['ai_registry_groupdee5d'] = ai_registry_groupdee5dProps,
        codeStates['setai_registry_groupdee5d'] = setai_registry_groupdee5dProps,
        codeStates['group'] = groupf7df4,
        codeStates['setgroup'] = setgroupf7df4,
        codeStates['groupf7df4'] = groupf7df4Props,
        codeStates['setgroupf7df4'] = setgroupf7df4Props,
        codeStates['approved_btn'] = approved_btn70ab7,
        codeStates['setapproved_btn'] = setapproved_btn70ab7,
        codeStates['tier_assessment_id'] = tier_assessment_id30bca,
        codeStates['settier_assessment_id'] = settier_assessment_id30bca,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_groupdee5dRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_groupdee5dRef.current?.setSearchParams();
    ai_registry_groupdee5dRef.current?.handleSearch({});
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
        !Array.isArray(ai_registry_groupdee5d) &&
        Object.keys(ai_registry_groupdee5d)?.length > 0
      ) {
        setai_registry_groupdee5d({})
        setai_registry_groupdee5dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_groupdee5dProps?.refresh])


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
        gridRow: '1 / 74',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#f5f5f7',
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
          setviewruleevaluation_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_group"}))
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
        {        ((ruleData?.length>0 && "approved_btn" in ButtonGoRuleData)?ButtonGoRuleData["approved_btn"]:true) && 
          allowedControls.includes("approved_btn")  ?            <Buttonapproved_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("tier_assessment_id") ?<Texttier_assessment_id   /* 30bca */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupai_registry_group
