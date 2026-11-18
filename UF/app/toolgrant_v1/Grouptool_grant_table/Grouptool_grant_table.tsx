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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
      "tool_grant_id",
      "asset_name",
      "tool_operation",
      "access_mode",
      "approve_btn",
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
  const {group90bf1, setgroup90bf1}= useContext(TotalContext) as TotalContextProps;
  const {group90bf1Props, setgroup90bf1Props}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88, setassets_group37c88}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88Props, setassets_group37c88Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5, settool_grant_tabled00d5}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5Props, settool_grant_tabled00d5Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id1ec60, settool_grant_id1ec60}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee85c6, setasset_namee85c6}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation2654f, settool_operation2654f}= useContext(TotalContext) as TotalContextProps;
  const {access_modef5311, setaccess_modef5311}= useContext(TotalContext) as TotalContextProps;
  const {approve_btnbe988, setapprove_btnbe988}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnff93a, setedit_btnff93a}= useContext(TotalContext) as TotalContextProps;
  const {del_btn7b4fb, setdel_btn7b4fb}= useContext(TotalContext) as TotalContextProps;
  const {valid_from190ab, setvalid_from190ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_toa85e2, setvalid_toa85e2}= useContext(TotalContext) as TotalContextProps;
  const {statusd2db5, setstatusd2db5}= useContext(TotalContext) as TotalContextProps;
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "abfbf12d125d476e2fc2167c19bd00d5");
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
    settool_grant_tabled00d5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tool_grant_id")){
        settool_grant_id1ec60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_grant_id1ec60?.isDisabled==null)
      {
        settool_grant_id1ec60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namee85c6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namee85c6?.isDisabled==null)
      {
        setasset_namee85c6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_operation")){
        settool_operation2654f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_operation2654f?.isDisabled==null)
      {
        settool_operation2654f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_mode")){
        setaccess_modef5311((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(access_modef5311?.isDisabled==null)
      {
        setaccess_modef5311((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve_btn")){
        setapprove_btnbe988((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(approve_btnbe988?.isDisabled==null)
      {
        setapprove_btnbe988((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnff93a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btnff93a?.isDisabled==null)
      {
        setedit_btnff93a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_btn")){
        setdel_btn7b4fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_btn7b4fb?.isDisabled==null)
      {
        setdel_btn7b4fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_from")){
        setvalid_from190ab((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_from190ab?.isDisabled==null)
      {
        setvalid_from190ab((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("valid_to")){
        setvalid_toa85e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(valid_toa85e2?.isDisabled==null)
      {
        setvalid_toa85e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusd2db5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(statusd2db5?.isDisabled==null)
      {
        setstatusd2db5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "abfbf12d125d476e2fc2167c19bd00d5");
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
        codeStates['assets_group'] = assets_group37c88,
        codeStates['setassets_group'] = setassets_group37c88,
        codeStates['assets_group37c88'] = assets_group37c88Props,
        codeStates['setassets_group37c88'] = setassets_group37c88Props,
        codeStates['tool_grant_table'] = tool_grant_tabled00d5,
        codeStates['settool_grant_table'] = settool_grant_tabled00d5,
        codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
        codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,
        codeStates['tool_grant_id'] = tool_grant_id1ec60,
        codeStates['settool_grant_id'] = settool_grant_id1ec60,
        codeStates['asset_name'] = asset_namee85c6,
        codeStates['setasset_name'] = setasset_namee85c6,
        codeStates['tool_operation'] = tool_operation2654f,
        codeStates['settool_operation'] = settool_operation2654f,
        codeStates['access_mode'] = access_modef5311,
        codeStates['setaccess_mode'] = setaccess_modef5311,
        codeStates['approve_btn'] = approve_btnbe988,
        codeStates['setapprove_btn'] = setapprove_btnbe988,
        codeStates['edit_btn'] = edit_btnff93a,
        codeStates['setedit_btn'] = setedit_btnff93a,
        codeStates['del_btn'] = del_btn7b4fb,
        codeStates['setdel_btn'] = setdel_btn7b4fb,
        codeStates['valid_from'] = valid_from190ab,
        codeStates['setvalid_from'] = setvalid_from190ab,
        codeStates['valid_to'] = valid_toa85e2,
        codeStates['setvalid_to'] = setvalid_toa85e2,
        codeStates['status'] = statusd2db5,
        codeStates['setstatus'] = setstatusd2db5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const tool_grant_tabled00d5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tool_grant_tabled00d5Ref.current?.setSearchParams();
    tool_grant_tabled00d5Ref.current?.handleSearch({});
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
        !Array.isArray(tool_grant_tabled00d5) &&
        Object.keys(tool_grant_tabled00d5)?.length > 0
      ) {
        settool_grant_tabled00d5({})
        settool_grant_tabled00d5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [tool_grant_tabled00d5Props?.refresh])


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
          settoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"tool_grant_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tabletool_grant_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={tool_grant_tabled00d5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouptool_grant_table
