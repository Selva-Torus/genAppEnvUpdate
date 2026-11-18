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
import Tableai_registry_table  from './Tableai_registry_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_registry_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
      "ai_registry_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "credential_ref_id",
      "ref_name",
      "vault_path",
      "credential_type",
      "expires_at",
      "status",
      "edit_bt",
      "delete_bt"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_asset_registry",
      "ai_registry_group",
      "ai_registry_text_group",
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
  const {overall_ai_asset_registry28d63, setoverall_ai_asset_registry28d63}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry28d63Props, setoverall_ai_asset_registry28d63Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101, setai_registry_groupd4101}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101Props, setai_registry_groupd4101Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1e, setai_registry_text_group0da1e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1eProps, setai_registry_text_group0da1eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906, setai_registry_table8e906}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906Props, setai_registry_table8e906Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_id17f16, setcredential_ref_id17f16}= useContext(TotalContext) as TotalContextProps;
  const {ref_name1b5fb, setref_name1b5fb}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf74b7, setvault_pathf74b7}= useContext(TotalContext) as TotalContextProps;
  const {credential_type326de, setcredential_type326de}= useContext(TotalContext) as TotalContextProps;
  const {expires_at58538, setexpires_at58538}= useContext(TotalContext) as TotalContextProps;
  const {statusda86f, setstatusda86f}= useContext(TotalContext) as TotalContextProps;
  const {edit_bt61e0c, setedit_bt61e0c}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt7a326, setdelete_bt7a326}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {credentialreferencelist_v1, setcredentialreferencelist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:credentialReferenceList:AFVK:v1',
    [user],
    'GroupAiRegistryTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6be36c49d50723739042d8c2d7b8e906");
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
    setai_registry_table8e906Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("credential_ref_id")){
        setcredential_ref_id17f16((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_ref_id17f16?.isDisabled==null)
      {
        setcredential_ref_id17f16((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ref_name")){
        setref_name1b5fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ref_name1b5fb?.isDisabled==null)
      {
        setref_name1b5fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("vault_path")){
        setvault_pathf74b7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(vault_pathf74b7?.isDisabled==null)
      {
        setvault_pathf74b7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("credential_type")){
        setcredential_type326de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(credential_type326de?.isDisabled==null)
      {
        setcredential_type326de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expires_at")){
        setexpires_at58538((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expires_at58538?.isDisabled==null)
      {
        setexpires_at58538((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusda86f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(statusda86f?.isDisabled==null)
      {
        setstatusda86f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_bt")){
        setedit_bt61e0c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_bt61e0c?.isDisabled==null)
      {
        setedit_bt61e0c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_bt")){
        setdelete_bt7a326((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_bt7a326?.isDisabled==null)
      {
        setdelete_bt7a326((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6be36c49d50723739042d8c2d7b8e906");
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry28d63,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry28d63,
        codeStates['overall_ai_asset_registry28d63'] = overall_ai_asset_registry28d63Props,
        codeStates['setoverall_ai_asset_registry28d63'] = setoverall_ai_asset_registry28d63Props,
        codeStates['ai_registry_group'] = ai_registry_groupd4101,
        codeStates['setai_registry_group'] = setai_registry_groupd4101,
        codeStates['ai_registry_groupd4101'] = ai_registry_groupd4101Props,
        codeStates['setai_registry_groupd4101'] = setai_registry_groupd4101Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group0da1e,
        codeStates['setai_registry_text_group'] = setai_registry_text_group0da1e,
        codeStates['ai_registry_text_group0da1e'] = ai_registry_text_group0da1eProps,
        codeStates['setai_registry_text_group0da1e'] = setai_registry_text_group0da1eProps,
        codeStates['ai_registry_table'] = ai_registry_table8e906,
        codeStates['setai_registry_table'] = setai_registry_table8e906,
        codeStates['ai_registry_table8e906'] = ai_registry_table8e906Props,
        codeStates['setai_registry_table8e906'] = setai_registry_table8e906Props,
        codeStates['credential_ref_id'] = credential_ref_id17f16,
        codeStates['setcredential_ref_id'] = setcredential_ref_id17f16,
        codeStates['ref_name'] = ref_name1b5fb,
        codeStates['setref_name'] = setref_name1b5fb,
        codeStates['vault_path'] = vault_pathf74b7,
        codeStates['setvault_path'] = setvault_pathf74b7,
        codeStates['credential_type'] = credential_type326de,
        codeStates['setcredential_type'] = setcredential_type326de,
        codeStates['expires_at'] = expires_at58538,
        codeStates['setexpires_at'] = setexpires_at58538,
        codeStates['status'] = statusda86f,
        codeStates['setstatus'] = setstatusda86f,
        codeStates['edit_bt'] = edit_bt61e0c,
        codeStates['setedit_bt'] = setedit_bt61e0c,
        codeStates['delete_bt'] = delete_bt7a326,
        codeStates['setdelete_bt'] = setdelete_bt7a326,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_registry_table8e906Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_registry_table8e906Ref.current?.setSearchParams();
    ai_registry_table8e906Ref.current?.handleSearch({});
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
        !Array.isArray(ai_registry_table8e906) &&
        Object.keys(ai_registry_table8e906)?.length > 0
      ) {
        setai_registry_table8e906({})
        setai_registry_table8e906Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_registry_table8e906Props?.refresh])


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
        gridRow: '10 / 137',
      
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
          setcredentialreferencelist_v1((pre:any)=>({...pre,_selectedGroup_:"ai_registry_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableai_registry_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ai_registry_table8e906Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupai_registry_table
