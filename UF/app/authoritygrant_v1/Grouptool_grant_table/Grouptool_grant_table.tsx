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
import Tabletool_grant_table  from './Tabletool_grant_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptool_grant_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
      "authority_grant_id",
      "grant_code",
      "action_type",
      "edit_btn",
      "del_btn",
      "valid_from",
      "valid_to",
      "status"
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
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_idbe507, setauthority_grant_idbe507}= useContext(TotalContext) as TotalContextProps;
  const {grant_codee405e, setgrant_codee405e}= useContext(TotalContext) as TotalContextProps;
  const {action_typefc208, setaction_typefc208}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn753a0, setedit_btn753a0}= useContext(TotalContext) as TotalContextProps;
  const {del_btn78f99, setdel_btn78f99}= useContext(TotalContext) as TotalContextProps;
  const {valid_from276c5, setvalid_from276c5}= useContext(TotalContext) as TotalContextProps;
  const {valid_to26443, setvalid_to26443}= useContext(TotalContext) as TotalContextProps;
  const {statusc284c, setstatusc284c}= useContext(TotalContext) as TotalContextProps;
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
    'GroupToolGrantTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "64e0f9e737d9118076edff96807dbd5b");
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
    settool_grant_tabledbd5bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("authority_grant_id")){
        setauthority_grant_idbe507((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(authority_grant_idbe507?.isDisabled==null)
      {
        setauthority_grant_idbe507((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grant_code")){
        setgrant_codee405e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grant_codee405e?.isDisabled==null)
      {
        setgrant_codee405e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_type")){
        setaction_typefc208((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_typefc208?.isDisabled==null)
      {
        setaction_typefc208((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn753a0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn753a0?.isDisabled==null)
      {
        setedit_btn753a0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn78f99((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn78f99?.isDisabled==null)
      {
        setdel_btn78f99((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_from")){
        setvalid_from276c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_from276c5?.isDisabled==null)
      {
        setvalid_from276c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_to")){
        setvalid_to26443((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_to26443?.isDisabled==null)
      {
        setvalid_to26443((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusc284c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(statusc284c?.isDisabled==null)
      {
        setstatusc284c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "64e0f9e737d9118076edff96807dbd5b");
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
        codeStates['assets_group'] = assets_group5eaf0,
        codeStates['setassets_group'] = setassets_group5eaf0,
        codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
        codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
        codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
        codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
        codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
        codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,
        codeStates['authority_grant_id'] = authority_grant_idbe507,
        codeStates['setauthority_grant_id'] = setauthority_grant_idbe507,
        codeStates['grant_code'] = grant_codee405e,
        codeStates['setgrant_code'] = setgrant_codee405e,
        codeStates['action_type'] = action_typefc208,
        codeStates['setaction_type'] = setaction_typefc208,
        codeStates['edit_btn'] = edit_btn753a0,
        codeStates['setedit_btn'] = setedit_btn753a0,
        codeStates['del_btn'] = del_btn78f99,
        codeStates['setdel_btn'] = setdel_btn78f99,
        codeStates['valid_from'] = valid_from276c5,
        codeStates['setvalid_from'] = setvalid_from276c5,
        codeStates['valid_to'] = valid_to26443,
        codeStates['setvalid_to'] = setvalid_to26443,
        codeStates['status'] = statusc284c,
        codeStates['setstatus'] = setstatusc284c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tool_grant_tabledbd5bRef = useRef<any>(null);
  const handleClearSearch = () => {
    tool_grant_tabledbd5bRef.current?.setSearchParams();
    tool_grant_tabledbd5bRef.current?.handleSearch({});
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
        !Array.isArray(tool_grant_tabledbd5b) &&
        Object.keys(tool_grant_tabledbd5b)?.length > 0
      ) {
        settool_grant_tabledbd5b({})
        settool_grant_tabledbd5bProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tool_grant_tabledbd5bProps?.refresh])


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
        gridRow: '38 / 134',
      
        //rowGap: '0px',
        overflow: 'visible',
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
          setauthoritygrant_v1((pre:any)=>({...pre,_selectedGroup_:"tool_grant_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletool_grant_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tool_grant_tabledbd5bRef} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptool_grant_table
