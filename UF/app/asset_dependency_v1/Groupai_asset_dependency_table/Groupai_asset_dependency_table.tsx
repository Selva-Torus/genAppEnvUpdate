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
import Tableai_asset_dependency_table  from './Tableai_asset_dependency_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_asset_dependency_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
      "dependency_id",
      "asset_name",
      "dependency_name",
      "dependency_type_code",
      "direction",
      "is_critical",
      "is_active",
      "edit_btn",
      "delete_btn"
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
  const {ai_asset_dependency_table789c8, setai_asset_dependency_table789c8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8Props, setai_asset_dependency_table789c8Props}= useContext(TotalContext) as TotalContextProps;
  const {dependency_idb7ed1, setdependency_idb7ed1}= useContext(TotalContext) as TotalContextProps;
  const {asset_namef9271, setasset_namef9271}= useContext(TotalContext) as TotalContextProps;
  const {dependency_named9050, setdependency_named9050}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code8b20c, setdependency_type_code8b20c}= useContext(TotalContext) as TotalContextProps;
  const {directionffe79, setdirectionffe79}= useContext(TotalContext) as TotalContextProps;
  const {is_criticala4198, setis_criticala4198}= useContext(TotalContext) as TotalContextProps;
  const {is_activea8dd7, setis_activea8dd7}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn09b48, setedit_btn09b48}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn5c752, setdelete_btn5c752}= useContext(TotalContext) as TotalContextProps;
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
    'GroupAiAssetDependencyTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0383193d5dc15c369dd0ede393a789c8");
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
    setai_asset_dependency_table789c8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("dependency_id")){
        setdependency_idb7ed1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_idb7ed1?.isDisabled==null)
      {
        setdependency_idb7ed1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namef9271((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namef9271?.isDisabled==null)
      {
        setasset_namef9271((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependency_name")){
        setdependency_named9050((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_named9050?.isDisabled==null)
      {
        setdependency_named9050((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dependency_type_code")){
        setdependency_type_code8b20c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dependency_type_code8b20c?.isDisabled==null)
      {
        setdependency_type_code8b20c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("direction")){
        setdirectionffe79((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(directionffe79?.isDisabled==null)
      {
        setdirectionffe79((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_critical")){
        setis_criticala4198((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_criticala4198?.isDisabled==null)
      {
        setis_criticala4198((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activea8dd7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activea8dd7?.isDisabled==null)
      {
        setis_activea8dd7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn09b48((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn09b48?.isDisabled==null)
      {
        setedit_btn09b48((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn5c752((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn5c752?.isDisabled==null)
      {
        setdelete_btn5c752((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "0383193d5dc15c369dd0ede393a789c8");
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
        codeStates['ai_asset_dependency_table'] = ai_asset_dependency_table789c8,
        codeStates['setai_asset_dependency_table'] = setai_asset_dependency_table789c8,
        codeStates['ai_asset_dependency_table789c8'] = ai_asset_dependency_table789c8Props,
        codeStates['setai_asset_dependency_table789c8'] = setai_asset_dependency_table789c8Props,
        codeStates['dependency_id'] = dependency_idb7ed1,
        codeStates['setdependency_id'] = setdependency_idb7ed1,
        codeStates['asset_name'] = asset_namef9271,
        codeStates['setasset_name'] = setasset_namef9271,
        codeStates['dependency_name'] = dependency_named9050,
        codeStates['setdependency_name'] = setdependency_named9050,
        codeStates['dependency_type_code'] = dependency_type_code8b20c,
        codeStates['setdependency_type_code'] = setdependency_type_code8b20c,
        codeStates['direction'] = directionffe79,
        codeStates['setdirection'] = setdirectionffe79,
        codeStates['is_critical'] = is_criticala4198,
        codeStates['setis_critical'] = setis_criticala4198,
        codeStates['is_active'] = is_activea8dd7,
        codeStates['setis_active'] = setis_activea8dd7,
        codeStates['edit_btn'] = edit_btn09b48,
        codeStates['setedit_btn'] = setedit_btn09b48,
        codeStates['delete_btn'] = delete_btn5c752,
        codeStates['setdelete_btn'] = setdelete_btn5c752,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_dependency_table789c8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_dependency_table789c8Ref.current?.setSearchParams();
    ai_asset_dependency_table789c8Ref.current?.handleSearch({});
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
        !Array.isArray(ai_asset_dependency_table789c8) &&
        Object.keys(ai_asset_dependency_table789c8)?.length > 0
      ) {
        setai_asset_dependency_table789c8({})
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_dependency_table789c8Props?.refresh])


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
        gridRow: '9 / 142',
      
        //rowGap: '0px',
        overflow: 'visible',
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
          setaiassetdependency_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_dependency_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_asset_dependency_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_asset_dependency_table789c8Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_asset_dependency_table
