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
import Tableservice_identity_table  from './Tableservice_identity_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupservice_identity_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_credentialreflist_v1Props, setdfd_credentialreflist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "identity_id",
      "asset_name",
      "principal_id",
      "principal_type",
      "identity_provider",
      "last_access_review_at",
      "status",
      "edit_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_dependency_group",
      "service_identity_table"
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
  const {overall_group56939, setoverall_group56939}= useContext(TotalContext) as TotalContextProps;
  const {overall_group56939Props, setoverall_group56939Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5adee, setai_asset_dependency_group5adee}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5adeeProps, setai_asset_dependency_group5adeeProps}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_tableff4a5, setservice_identity_tableff4a5}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_tableff4a5Props, setservice_identity_tableff4a5Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_id5366e, setidentity_id5366e}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec3f43, setasset_namec3f43}= useContext(TotalContext) as TotalContextProps;
  const {principal_id9e0d3, setprincipal_id9e0d3}= useContext(TotalContext) as TotalContextProps;
  const {principal_typebbe1e, setprincipal_typebbe1e}= useContext(TotalContext) as TotalContextProps;
  const {identity_providerff76d, setidentity_providerff76d}= useContext(TotalContext) as TotalContextProps;
  const {last_access_review_at63d3c, setlast_access_review_at63d3c}= useContext(TotalContext) as TotalContextProps;
  const {statusee5ce, setstatusee5ce}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnf36c2, setedit_btnf36c2}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnbb7db, setdelete_btnbb7db}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {serviceidentitylist_v1, setserviceidentitylist_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:serviceIdentityList:AFVK:v1',
    [user],
    'GroupServiceIdentityTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6617aca6c56e513e89e6a741927ff4a5");
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
    setservice_identity_tableff4a5Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("identity_id")){
        setidentity_id5366e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_id5366e?.isDisabled==null)
      {
        setidentity_id5366e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namec3f43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namec3f43?.isDisabled==null)
      {
        setasset_namec3f43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_id")){
        setprincipal_id9e0d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_id9e0d3?.isDisabled==null)
      {
        setprincipal_id9e0d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("principal_type")){
        setprincipal_typebbe1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(principal_typebbe1e?.isDisabled==null)
      {
        setprincipal_typebbe1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_provider")){
        setidentity_providerff76d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(identity_providerff76d?.isDisabled==null)
      {
        setidentity_providerff76d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_access_review_at")){
        setlast_access_review_at63d3c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(last_access_review_at63d3c?.isDisabled==null)
      {
        setlast_access_review_at63d3c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusee5ce((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(statusee5ce?.isDisabled==null)
      {
        setstatusee5ce((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_btn")){
        setedit_btnf36c2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(edit_btnf36c2?.isDisabled==null)
      {
        setedit_btnf36c2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnbb7db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btnbb7db?.isDisabled==null)
      {
        setdelete_btnbb7db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6617aca6c56e513e89e6a741927ff4a5");
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
        codeStates['overall_group'] = overall_group56939,
        codeStates['setoverall_group'] = setoverall_group56939,
        codeStates['overall_group56939'] = overall_group56939Props,
        codeStates['setoverall_group56939'] = setoverall_group56939Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_group5adee,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_group5adee,
        codeStates['ai_asset_dependency_group5adee'] = ai_asset_dependency_group5adeeProps,
        codeStates['setai_asset_dependency_group5adee'] = setai_asset_dependency_group5adeeProps,
        codeStates['service_identity_table'] = service_identity_tableff4a5,
        codeStates['setservice_identity_table'] = setservice_identity_tableff4a5,
        codeStates['service_identity_tableff4a5'] = service_identity_tableff4a5Props,
        codeStates['setservice_identity_tableff4a5'] = setservice_identity_tableff4a5Props,
        codeStates['identity_id'] = identity_id5366e,
        codeStates['setidentity_id'] = setidentity_id5366e,
        codeStates['asset_name'] = asset_namec3f43,
        codeStates['setasset_name'] = setasset_namec3f43,
        codeStates['principal_id'] = principal_id9e0d3,
        codeStates['setprincipal_id'] = setprincipal_id9e0d3,
        codeStates['principal_type'] = principal_typebbe1e,
        codeStates['setprincipal_type'] = setprincipal_typebbe1e,
        codeStates['identity_provider'] = identity_providerff76d,
        codeStates['setidentity_provider'] = setidentity_providerff76d,
        codeStates['last_access_review_at'] = last_access_review_at63d3c,
        codeStates['setlast_access_review_at'] = setlast_access_review_at63d3c,
        codeStates['status'] = statusee5ce,
        codeStates['setstatus'] = setstatusee5ce,
        codeStates['edit_btn'] = edit_btnf36c2,
        codeStates['setedit_btn'] = setedit_btnf36c2,
        codeStates['delete_btn'] = delete_btnbb7db,
        codeStates['setdelete_btn'] = setdelete_btnbb7db,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const service_identity_tableff4a5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    service_identity_tableff4a5Ref.current?.setSearchParams();
    service_identity_tableff4a5Ref.current?.handleSearch({});
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
        !Array.isArray(service_identity_tableff4a5) &&
        Object.keys(service_identity_tableff4a5)?.length > 0
      ) {
        setservice_identity_tableff4a5({})
        setservice_identity_tableff4a5Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [service_identity_tableff4a5Props?.refresh])


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
          setserviceidentitylist_v1((pre:any)=>({...pre,_selectedGroup_:"service_identity_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableservice_identity_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={service_identity_tableff4a5Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupservice_identity_table
