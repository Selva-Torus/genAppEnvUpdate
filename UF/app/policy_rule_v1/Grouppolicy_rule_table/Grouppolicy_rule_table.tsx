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
import Tablepolicy_rule_table  from './Tablepolicy_rule_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouppolicy_rule_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_policyrulelist_v1Props, setdfd_policyrulelist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "policy_id",
      "policy_code",
      "policy_name",
      "policy_type",
      "version_label",
      "status",
      "test_status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "policy_rule_table"
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
  const {overall_group18db5, setoverall_group18db5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group18db5Props, setoverall_group18db5Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0d, setai_asset_dependency_group5fc0d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0dProps, setai_asset_dependency_group5fc0dProps}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5, setpolicy_rule_table7fde5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5Props, setpolicy_rule_table7fde5Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_ide22f4, setpolicy_ide22f4}= useContext(TotalContext) as TotalContextProps;
  const {policy_code2bda1, setpolicy_code2bda1}= useContext(TotalContext) as TotalContextProps;
  const {policy_namee53b7, setpolicy_namee53b7}= useContext(TotalContext) as TotalContextProps;
  const {policy_typea7044, setpolicy_typea7044}= useContext(TotalContext) as TotalContextProps;
  const {version_label4cb20, setversion_label4cb20}= useContext(TotalContext) as TotalContextProps;
  const {status09db0, setstatus09db0}= useContext(TotalContext) as TotalContextProps;
  const {test_statusdb5db, settest_statusdb5db}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn778af, setedit_btn778af}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn31d12, setdelete_btn31d12}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {policyrulelist_v1, setpolicyrulelist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1',
    [user],
    'GroupPolicyRuleTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "23714957d9dde7f2f2876ef71d47fde5");
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
    setpolicy_rule_table7fde5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("policy_id")){
        setpolicy_ide22f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_ide22f4?.isDisabled==null)
      {
        setpolicy_ide22f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_code")){
        setpolicy_code2bda1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_code2bda1?.isDisabled==null)
      {
        setpolicy_code2bda1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_name")){
        setpolicy_namee53b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_namee53b7?.isDisabled==null)
      {
        setpolicy_namee53b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("policy_type")){
        setpolicy_typea7044((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(policy_typea7044?.isDisabled==null)
      {
        setpolicy_typea7044((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("version_label")){
        setversion_label4cb20((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(version_label4cb20?.isDisabled==null)
      {
        setversion_label4cb20((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus09db0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status09db0?.isDisabled==null)
      {
        setstatus09db0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("test_status")){
        settest_statusdb5db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(test_statusdb5db?.isDisabled==null)
      {
        settest_statusdb5db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btn778af((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btn778af?.isDisabled==null)
      {
        setedit_btn778af((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btn31d12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btn31d12?.isDisabled==null)
      {
        setdelete_btn31d12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "23714957d9dde7f2f2876ef71d47fde5");
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
        codeStates['overall_group'] = overall_group18db5,
        codeStates['setoverall_group'] = setoverall_group18db5,
        codeStates['overall_group18db5'] = overall_group18db5Props,
        codeStates['setoverall_group18db5'] = setoverall_group18db5Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_group5fc0d,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_group5fc0d,
        codeStates['ai_asset_dependency_group5fc0d'] = ai_asset_dependency_group5fc0dProps,
        codeStates['setai_asset_dependency_group5fc0d'] = setai_asset_dependency_group5fc0dProps,
        codeStates['policy_rule_table'] = policy_rule_table7fde5,
        codeStates['setpolicy_rule_table'] = setpolicy_rule_table7fde5,
        codeStates['policy_rule_table7fde5'] = policy_rule_table7fde5Props,
        codeStates['setpolicy_rule_table7fde5'] = setpolicy_rule_table7fde5Props,
        codeStates['policy_id'] = policy_ide22f4,
        codeStates['setpolicy_id'] = setpolicy_ide22f4,
        codeStates['policy_code'] = policy_code2bda1,
        codeStates['setpolicy_code'] = setpolicy_code2bda1,
        codeStates['policy_name'] = policy_namee53b7,
        codeStates['setpolicy_name'] = setpolicy_namee53b7,
        codeStates['policy_type'] = policy_typea7044,
        codeStates['setpolicy_type'] = setpolicy_typea7044,
        codeStates['version_label'] = version_label4cb20,
        codeStates['setversion_label'] = setversion_label4cb20,
        codeStates['status'] = status09db0,
        codeStates['setstatus'] = setstatus09db0,
        codeStates['test_status'] = test_statusdb5db,
        codeStates['settest_status'] = settest_statusdb5db,
        codeStates['edit_btn'] = edit_btn778af,
        codeStates['setedit_btn'] = setedit_btn778af,
        codeStates['delete_btn'] = delete_btn31d12,
        codeStates['setdelete_btn'] = setdelete_btn31d12,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const policy_rule_table7fde5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    policy_rule_table7fde5Ref.current?.setSearchParams();
    policy_rule_table7fde5Ref.current?.handleSearch({});
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
        !Array.isArray(policy_rule_table7fde5) &&
        Object.keys(policy_rule_table7fde5)?.length > 0
      ) {
        setpolicy_rule_table7fde5({})
        setpolicy_rule_table7fde5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [policy_rule_table7fde5Props?.refresh])


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
        gridRow: '10 / 122',
      
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
          setpolicyrulelist_v1((pre:any)=>({...pre,_selectedGroup_:"policy_rule_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablepolicy_rule_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={policy_rule_table7fde5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Grouppolicy_rule_table
