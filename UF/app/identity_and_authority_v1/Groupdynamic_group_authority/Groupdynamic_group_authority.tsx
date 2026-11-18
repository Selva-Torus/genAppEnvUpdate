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
import Textgrant_code  from "./Textgrant_code";
import Textstatus  from "./Textstatus";
import Textasset_name  from "./Textasset_name";
import Textaction_type  from "./Textaction_type";
import Textstatic1  from "./Textstatic1";
import Textmax_amount_per_txn  from "./Textmax_amount_per_txn";
import Textstatic2  from "./Textstatic2";
import Textdaily_amount_limit  from "./Textdaily_amount_limit";
import Textstatic3  from "./Textstatic3";
import Texthitl_threshold_amount  from "./Texthitl_threshold_amount";
import Textstatic4  from "./Textstatic4";
import Textmax_txn_per_day  from "./Textmax_txn_per_day";
import Textstatic5  from "./Textstatic5";
import Textdelegator_user_id  from "./Textdelegator_user_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamic_group_authority = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
      "grant_code",
      "status",
      "asset_name",
      "action_type",
      "static1",
      "max_amount_per_txn",
      "static2",
      "daily_amount_limit",
      "static3",
      "hitl_threshold_amount",
      "static4",
      "max_txn_per_day",
      "static5",
      "delegator_user_id"
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
  const {grant_code415fd, setgrant_code415fd}= useContext(TotalContext) as TotalContextProps;
  const {status3c177, setstatus3c177}= useContext(TotalContext) as TotalContextProps;
  const {asset_namefdd05, setasset_namefdd05}= useContext(TotalContext) as TotalContextProps;
  const {action_type48b5a, setaction_type48b5a}= useContext(TotalContext) as TotalContextProps;
  const {static1b59fa, setstatic1b59fa}= useContext(TotalContext) as TotalContextProps;
  const {max_amount_per_txn63c4f, setmax_amount_per_txn63c4f}= useContext(TotalContext) as TotalContextProps;
  const {static218e01, setstatic218e01}= useContext(TotalContext) as TotalContextProps;
  const {daily_amount_limitd326a, setdaily_amount_limitd326a}= useContext(TotalContext) as TotalContextProps;
  const {static3d73c5, setstatic3d73c5}= useContext(TotalContext) as TotalContextProps;
  const {hitl_threshold_amount021c8, sethitl_threshold_amount021c8}= useContext(TotalContext) as TotalContextProps;
  const {static437b9c, setstatic437b9c}= useContext(TotalContext) as TotalContextProps;
  const {max_txn_per_day0fc86, setmax_txn_per_day0fc86}= useContext(TotalContext) as TotalContextProps;
  const {static5bee64, setstatic5bee64}= useContext(TotalContext) as TotalContextProps;
  const {delegator_user_id55b43, setdelegator_user_id55b43}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2, settool_group1f1a2}= useContext(TotalContext) as TotalContextProps;
  const {tool_group1f1a2Props, settool_group1f1a2Props}= useContext(TotalContext) as TotalContextProps;
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
    'GroupDynamicGroupAuthority',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ad7708ddef35429f8b980bb39396cb35");
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
    setdynamic_group_authority6cb35Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("grant_code")){
        setgrant_code415fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(grant_code415fd?.isDisabled==null)
      {
        setgrant_code415fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus3c177((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status3c177?.isDisabled==null)
      {
        setstatus3c177((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namefdd05((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_namefdd05?.isDisabled==null)
      {
        setasset_namefdd05((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("action_type")){
        setaction_type48b5a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_type48b5a?.isDisabled==null)
      {
        setaction_type48b5a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("static1")){
        setstatic1b59fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(static1b59fa?.isDisabled==null)
      {
        setstatic1b59fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_amount_per_txn")){
        setmax_amount_per_txn63c4f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(max_amount_per_txn63c4f?.isDisabled==null)
      {
        setmax_amount_per_txn63c4f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("static2")){
        setstatic218e01((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(static218e01?.isDisabled==null)
      {
        setstatic218e01((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("daily_amount_limit")){
        setdaily_amount_limitd326a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(daily_amount_limitd326a?.isDisabled==null)
      {
        setdaily_amount_limitd326a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("static3")){
        setstatic3d73c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(static3d73c5?.isDisabled==null)
      {
        setstatic3d73c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("hitl_threshold_amount")){
        sethitl_threshold_amount021c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(hitl_threshold_amount021c8?.isDisabled==null)
      {
        sethitl_threshold_amount021c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("static4")){
        setstatic437b9c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(static437b9c?.isDisabled==null)
      {
        setstatic437b9c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("max_txn_per_day")){
        setmax_txn_per_day0fc86((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(max_txn_per_day0fc86?.isDisabled==null)
      {
        setmax_txn_per_day0fc86((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("static5")){
        setstatic5bee64((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(static5bee64?.isDisabled==null)
      {
        setstatic5bee64((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delegator_user_id")){
        setdelegator_user_id55b43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delegator_user_id55b43?.isDisabled==null)
      {
        setdelegator_user_id55b43((pre:any)=>({...pre,isDisabled:false}));
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
        codeStates['grant_code'] = grant_code415fd,
        codeStates['setgrant_code'] = setgrant_code415fd,
        codeStates['status'] = status3c177,
        codeStates['setstatus'] = setstatus3c177,
        codeStates['asset_name'] = asset_namefdd05,
        codeStates['setasset_name'] = setasset_namefdd05,
        codeStates['action_type'] = action_type48b5a,
        codeStates['setaction_type'] = setaction_type48b5a,
        codeStates['static1'] = static1b59fa,
        codeStates['setstatic1'] = setstatic1b59fa,
        codeStates['max_amount_per_txn'] = max_amount_per_txn63c4f,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txn63c4f,
        codeStates['static2'] = static218e01,
        codeStates['setstatic2'] = setstatic218e01,
        codeStates['daily_amount_limit'] = daily_amount_limitd326a,
        codeStates['setdaily_amount_limit'] = setdaily_amount_limitd326a,
        codeStates['static3'] = static3d73c5,
        codeStates['setstatic3'] = setstatic3d73c5,
        codeStates['hitl_threshold_amount'] = hitl_threshold_amount021c8,
        codeStates['sethitl_threshold_amount'] = sethitl_threshold_amount021c8,
        codeStates['static4'] = static437b9c,
        codeStates['setstatic4'] = setstatic437b9c,
        codeStates['max_txn_per_day'] = max_txn_per_day0fc86,
        codeStates['setmax_txn_per_day'] = setmax_txn_per_day0fc86,
        codeStates['static5'] = static5bee64,
        codeStates['setstatic5'] = setstatic5bee64,
        codeStates['delegator_user_id'] = delegator_user_id55b43,
        codeStates['setdelegator_user_id'] = setdelegator_user_id55b43,
        codeStates['tool_group'] = tool_group1f1a2,
        codeStates['settool_group'] = settool_group1f1a2,
        codeStates['tool_group1f1a2'] = tool_group1f1a2Props,
        codeStates['settool_group1f1a2'] = settool_group1f1a2Props,
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
    if(dfd_authoritygranddynamicgroup_v1Props?.hasLogicCenter==false  && dfd_authoritygranddynamicgroup_v1Props?.dstKey!="")
    {
      const api_paginationBody: api_paginationDto = {
        key: dfd_authoritygranddynamicgroup_v1Props?.dstKey,
        count:10,
        page: 1
      }
      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        api_paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (api_paginationData?.data?.error == true) {
        toast(api_paginationData?.data?.errorDetails?.message, 'danger')
        return
      }
      setdfd_authoritygranddynamicgroup_v1Props(api_paginationData?.data?.records || []);
    }
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ad7708ddef35429f8b980bb39396cb35");
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
      setSelectedIdx(selectedIndex);
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
        codeStates['grant_code'] = grant_code415fd,
        codeStates['setgrant_code'] = setgrant_code415fd,
        codeStates['status'] = status3c177,
        codeStates['setstatus'] = setstatus3c177,
        codeStates['asset_name'] = asset_namefdd05,
        codeStates['setasset_name'] = setasset_namefdd05,
        codeStates['action_type'] = action_type48b5a,
        codeStates['setaction_type'] = setaction_type48b5a,
        codeStates['static1'] = static1b59fa,
        codeStates['setstatic1'] = setstatic1b59fa,
        codeStates['max_amount_per_txn'] = max_amount_per_txn63c4f,
        codeStates['setmax_amount_per_txn'] = setmax_amount_per_txn63c4f,
        codeStates['static2'] = static218e01,
        codeStates['setstatic2'] = setstatic218e01,
        codeStates['daily_amount_limit'] = daily_amount_limitd326a,
        codeStates['setdaily_amount_limit'] = setdaily_amount_limitd326a,
        codeStates['static3'] = static3d73c5,
        codeStates['setstatic3'] = setstatic3d73c5,
        codeStates['hitl_threshold_amount'] = hitl_threshold_amount021c8,
        codeStates['sethitl_threshold_amount'] = sethitl_threshold_amount021c8,
        codeStates['static4'] = static437b9c,
        codeStates['setstatic4'] = setstatic437b9c,
        codeStates['max_txn_per_day'] = max_txn_per_day0fc86,
        codeStates['setmax_txn_per_day'] = setmax_txn_per_day0fc86,
        codeStates['static5'] = static5bee64,
        codeStates['setstatic5'] = setstatic5bee64,
        codeStates['delegator_user_id'] = delegator_user_id55b43,
        codeStates['setdelegator_user_id'] = setdelegator_user_id55b43,
        codeStates['tool_group'] = tool_group1f1a2,
        codeStates['settool_group'] = settool_group1f1a2,
        codeStates['tool_group1f1a2'] = tool_group1f1a2Props,
        codeStates['settool_group1f1a2'] = settool_group1f1a2Props,
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


  const dynamic_group_authority6cb35Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamic_group_authority6cb35Ref.current?.setSearchParams();
    dynamic_group_authority6cb35Ref.current?.handleSearch({});
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
        !Array.isArray(dynamic_group_authority6cb35) &&
        Object.keys(dynamic_group_authority6cb35)?.length > 0
      ) {
        setdynamic_group_authority6cb35({})
        setdynamic_group_authority6cb35Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dynamic_group_authority6cb35Props?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
return (
<>
  {Array.isArray(dfd_authoritygranddynamicgroup_v1Props) && dfd_authoritygranddynamicgroup_v1Props.map((item: any, idx: number) => {
  return (
    <div key={idx}
      style={{          
        gridRow: 'span 63', 
        gridColumn: 'span 8',  
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#f4f5fa',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col rounded-md !overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-[var(--hover-color)] p-2 !rounded-2xl border-2 border-solid ${isDark ? 'text-white' : 'text-black'} ${selectedIdx === idx ? 'shadow-lg scale-[1.02] bg-[var(--hover-color)] outline outline-2 outline-blue-500' : ''}`}
      onClick={(e:any)=>{
        e.stopPropagation();
        handleOnClick(item, idx);
          setidentityandauthority_v1((pre:any)=>({...pre,_selectedGroup_:"dynamic_group_authority"+idx}))
      }}
    >
          {allowedControls.includes("grant_code") ?<Textgrant_code   /* 415fd */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status") ?<Textstatus   /* 3c177 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* fdd05 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("action_type") ?<Textaction_type   /* 48b5a */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("static1") ?<Textstatic1   /* b59fa */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("max_amount_per_txn") ?<Textmax_amount_per_txn   /* 63c4f */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("static2") ?<Textstatic2   /* 18e01 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("daily_amount_limit") ?<Textdaily_amount_limit   /* d326a */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("static3") ?<Textstatic3   /* d73c5 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("hitl_threshold_amount") ?<Texthitl_threshold_amount   /* 021c8 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("static4") ?<Textstatic4   /* 37b9c */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("max_txn_per_day") ?<Textmax_txn_per_day   /* 0fc86 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("static5") ?<Textstatic5   /* bee64 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delegator_user_id") ?<Textdelegator_user_id   /* 55b43 */ isDynamic={true } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
  )
  })}
  </>
 )
}

export default Groupdynamic_group_authority
