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
import Grouptool_grant  from "../Grouptool_grant/Grouptool_grant";
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
import Textcredential_ref_text  from "./Textcredential_ref_text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptool_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_authoritygranddynamicgroup_v1Props, setdfd_authoritygranddynamicgroup_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_credentialreflist_v1Props, setdfd_credentialreflist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrandauthority_v1Props, setdfd_toolgrandauthority_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "credential_ref_text"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "dynamic_group_authority_group",
      "dynamic_group_authority",
      "tool_group",
      "tool_grant",
      "ai_registry_group",
      "ai_registry_table"
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
  const {overall_ai_asset_registry9dc87, setoverall_ai_asset_registry9dc87}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry9dc87Props, setoverall_ai_asset_registry9dc87Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority_group9ddb8, setdynamic_group_authority_group9ddb8}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority_group9ddb8Props, setdynamic_group_authority_group9ddb8Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority6cb35, setdynamic_group_authority6cb35}= useContext(TotalContext) as TotalContextProps;
  const {dynamic_group_authority6cb35Props, setdynamic_group_authority6cb35Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2, settool_group1f1a2}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2Props, settool_group1f1a2Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_text89d50, setcredential_ref_text89d50}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant80694, settool_grant80694}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant80694Props, settool_grant80694Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5e5a6, setai_registry_group5e5a6}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group5e5a6Props, setai_registry_group5e5a6Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table560c1, setai_registry_table560c1}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table560c1Props, setai_registry_table560c1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {identityandauthority_v1, setidentityandauthority_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identityAndAuthority:AFVK:v1',
    [user],
    'GroupToolGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a30135e8376642ddab13337264f1f1a2");
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
    settool_group1f1a2Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("credential_ref_text")){
        setcredential_ref_text89d50((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_ref_text89d50?.isDisabled==null)
      {
        setcredential_ref_text89d50((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant")){
        settool_grant80694Props((pre:any)=>({...pre,...tool_grant80694,isDisabled:true}));

    }else
    {
      if(tool_grant80694?.isDisabled==null)
      {
        settool_grant80694Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry9dc87,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry9dc87,
        codeStates['overall_ai_asset_registry9dc87'] = overall_ai_asset_registry9dc87Props,
        codeStates['setoverall_ai_asset_registry9dc87'] = setoverall_ai_asset_registry9dc87Props,
        codeStates['dynamic_group_authority_group'] = dynamic_group_authority_group9ddb8,
        codeStates['setdynamic_group_authority_group'] = setdynamic_group_authority_group9ddb8,
        codeStates['dynamic_group_authority_group9ddb8'] = dynamic_group_authority_group9ddb8Props,
        codeStates['setdynamic_group_authority_group9ddb8'] = setdynamic_group_authority_group9ddb8Props,
        codeStates['dynamic_group_authority'] = dynamic_group_authority6cb35,
        codeStates['setdynamic_group_authority'] = setdynamic_group_authority6cb35,
        codeStates['dynamic_group_authority6cb35'] = dynamic_group_authority6cb35Props,
        codeStates['setdynamic_group_authority6cb35'] = setdynamic_group_authority6cb35Props,
        codeStates['tool_group'] = tool_group1f1a2,
        codeStates['settool_group'] = settool_group1f1a2,
        codeStates['tool_group1f1a2'] = tool_group1f1a2Props,
        codeStates['settool_group1f1a2'] = settool_group1f1a2Props,
        codeStates['credential_ref_text'] = credential_ref_text89d50,
        codeStates['setcredential_ref_text'] = setcredential_ref_text89d50,
        codeStates['tool_grant'] = tool_grant80694,
        codeStates['settool_grant'] = settool_grant80694,
        codeStates['tool_grant80694'] = tool_grant80694Props,
        codeStates['settool_grant80694'] = settool_grant80694Props,
        codeStates['ai_registry_group'] = ai_registry_group5e5a6,
        codeStates['setai_registry_group'] = setai_registry_group5e5a6,
        codeStates['ai_registry_group5e5a6'] = ai_registry_group5e5a6Props,
        codeStates['setai_registry_group5e5a6'] = setai_registry_group5e5a6Props,
        codeStates['ai_registry_table'] = ai_registry_table560c1,
        codeStates['setai_registry_table'] = setai_registry_table560c1,
        codeStates['ai_registry_table560c1'] = ai_registry_table560c1Props,
        codeStates['setai_registry_table560c1'] = setai_registry_table560c1Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a30135e8376642ddab13337264f1f1a2");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry9dc87,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry9dc87,
        codeStates['overall_ai_asset_registry9dc87'] = overall_ai_asset_registry9dc87Props,
        codeStates['setoverall_ai_asset_registry9dc87'] = setoverall_ai_asset_registry9dc87Props,
        codeStates['dynamic_group_authority_group'] = dynamic_group_authority_group9ddb8,
        codeStates['setdynamic_group_authority_group'] = setdynamic_group_authority_group9ddb8,
        codeStates['dynamic_group_authority_group9ddb8'] = dynamic_group_authority_group9ddb8Props,
        codeStates['setdynamic_group_authority_group9ddb8'] = setdynamic_group_authority_group9ddb8Props,
        codeStates['dynamic_group_authority'] = dynamic_group_authority6cb35,
        codeStates['setdynamic_group_authority'] = setdynamic_group_authority6cb35,
        codeStates['dynamic_group_authority6cb35'] = dynamic_group_authority6cb35Props,
        codeStates['setdynamic_group_authority6cb35'] = setdynamic_group_authority6cb35Props,
        codeStates['tool_group'] = tool_group1f1a2,
        codeStates['settool_group'] = settool_group1f1a2,
        codeStates['tool_group1f1a2'] = tool_group1f1a2Props,
        codeStates['settool_group1f1a2'] = settool_group1f1a2Props,
        codeStates['credential_ref_text'] = credential_ref_text89d50,
        codeStates['setcredential_ref_text'] = setcredential_ref_text89d50,
        codeStates['tool_grant'] = tool_grant80694,
        codeStates['settool_grant'] = settool_grant80694,
        codeStates['tool_grant80694'] = tool_grant80694Props,
        codeStates['settool_grant80694'] = settool_grant80694Props,
        codeStates['ai_registry_group'] = ai_registry_group5e5a6,
        codeStates['setai_registry_group'] = setai_registry_group5e5a6,
        codeStates['ai_registry_group5e5a6'] = ai_registry_group5e5a6Props,
        codeStates['setai_registry_group5e5a6'] = setai_registry_group5e5a6Props,
        codeStates['ai_registry_table'] = ai_registry_table560c1,
        codeStates['setai_registry_table'] = setai_registry_table560c1,
        codeStates['ai_registry_table560c1'] = ai_registry_table560c1Props,
        codeStates['setai_registry_table560c1'] = setai_registry_table560c1Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tool_group1f1a2Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tool_group1f1a2Ref.current?.setSearchParams();
    tool_group1f1a2Ref.current?.handleSearch({});
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
        !Array.isArray(tool_group1f1a2) &&
        Object.keys(tool_group1f1a2)?.length > 0
      ) {
        settool_group1f1a2({})
        settool_group1f1a2Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tool_group1f1a2Props?.refresh])


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
        gridRow: '142 / 273',
      
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
          setidentityandauthority_v1((pre:any)=>({...pre,_selectedGroup_:"tool_group"}))
        }}
    >
        {allowedComponent.includes("tool_grant")  &&<Grouptool_grant  
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
          {allowedControls.includes("credential_ref_text") ?<Textcredential_ref_text   /* 89d50 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptool_group
