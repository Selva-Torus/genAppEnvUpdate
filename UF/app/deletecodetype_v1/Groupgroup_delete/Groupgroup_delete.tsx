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
import Textdelete_heading_text  from "./Textdelete_heading_text";
import Dividerdivider_s  from "./Dividerdivider_s";
import Textdel_code_type_id  from "./Textdel_code_type_id";
import Textcode_type_id  from "./Textcode_type_id";
import Textdel_code_type  from "./Textdel_code_type";
import Textcode_type  from "./Textcode_type";
import Textdescription_type  from "./Textdescription_type";
import Textdescription  from "./Textdescription";
import Textsystem_code_type  from "./Textsystem_code_type";
import Textis_system  from "./Textis_system";
import Textis_active  from "./Textis_active";
import Textactive_type  from "./Textactive_type";
import Textconfo_text  from "./Textconfo_text";
import Dividerdivider  from "./Dividerdivider";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codetype_v1Props, setdfd_codetype_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_text",
      "divider_s",
      "del_code_type_id",
      "code_type_id",
      "del_code_type",
      "code_type",
      "description_type",
      "description",
      "system_code_type",
      "is_system",
      "is_active",
      "active_type",
      "confo_text",
      "divider",
      "cancel_button",
      "ok_button"
    ],
    "allowedGroups": [
      "canvas",
      "group_delete"
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
  const {group_delete9bbe1, setgroup_delete9bbe1}= useContext(TotalContext) as TotalContextProps;
  const {group_delete9bbe1Props, setgroup_delete9bbe1Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text7380b, setdelete_heading_text7380b}= useContext(TotalContext) as TotalContextProps;
  const {divider_s1a15b, setdivider_s1a15b}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type_idea039, setdel_code_type_idea039}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id8fe6f, setcode_type_id8fe6f}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type3ce03, setdel_code_type3ce03}= useContext(TotalContext) as TotalContextProps;
  const {code_typedf5a3, setcode_typedf5a3}= useContext(TotalContext) as TotalContextProps;
  const {description_typef91cb, setdescription_typef91cb}= useContext(TotalContext) as TotalContextProps;
  const {description32634, setdescription32634}= useContext(TotalContext) as TotalContextProps;
  const {system_code_type9d603, setsystem_code_type9d603}= useContext(TotalContext) as TotalContextProps;
  const {is_systemc0200, setis_systemc0200}= useContext(TotalContext) as TotalContextProps;
  const {is_active6bc58, setis_active6bc58}= useContext(TotalContext) as TotalContextProps;
  const {active_type0da2f, setactive_type0da2f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textcb476, setconfo_textcb476}= useContext(TotalContext) as TotalContextProps;
  const {dividerca7df, setdividerca7df}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttona9054, setcancel_buttona9054}= useContext(TotalContext) as TotalContextProps;
  const {ok_button8e870, setok_button8e870}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecodetype_v1, setdeletecodetype_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCodeType:AFVK:v1',
    [user],
    'GroupGroupDelete',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d098857dfa7545c1bd60db681f89bbe1");
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
    setgroup_delete9bbe1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text7380b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_text7380b?.isDisabled==null)
      {
        setdelete_heading_text7380b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_s")){
        setdivider_s1a15b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_s1a15b?.isDisabled==null)
      {
        setdivider_s1a15b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_code_type_id")){
        setdel_code_type_idea039((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_code_type_idea039?.isDisabled==null)
      {
        setdel_code_type_idea039((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type_id")){
        setcode_type_id8fe6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_type_id8fe6f?.isDisabled==null)
      {
        setcode_type_id8fe6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_code_type")){
        setdel_code_type3ce03((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_code_type3ce03?.isDisabled==null)
      {
        setdel_code_type3ce03((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type")){
        setcode_typedf5a3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_typedf5a3?.isDisabled==null)
      {
        setcode_typedf5a3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description_type")){
        setdescription_typef91cb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description_typef91cb?.isDisabled==null)
      {
        setdescription_typef91cb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescription32634((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description32634?.isDisabled==null)
      {
        setdescription32634((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_code_type")){
        setsystem_code_type9d603((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(system_code_type9d603?.isDisabled==null)
      {
        setsystem_code_type9d603((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_system")){
        setis_systemc0200((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_systemc0200?.isDisabled==null)
      {
        setis_systemc0200((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active6bc58((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active6bc58?.isDisabled==null)
      {
        setis_active6bc58((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("active_type")){
        setactive_type0da2f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(active_type0da2f?.isDisabled==null)
      {
        setactive_type0da2f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textcb476((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(confo_textcb476?.isDisabled==null)
      {
        setconfo_textcb476((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdividerca7df((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dividerca7df?.isDisabled==null)
      {
        setdividerca7df((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttona9054((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_buttona9054?.isDisabled==null)
      {
        setcancel_buttona9054((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button8e870((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ok_button8e870?.isDisabled==null)
      {
        setok_button8e870((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete9bbe1,
        codeStates['setgroup_delete'] = setgroup_delete9bbe1,
        codeStates['group_delete9bbe1'] = group_delete9bbe1Props,
        codeStates['setgroup_delete9bbe1'] = setgroup_delete9bbe1Props,
        codeStates['delete_heading_text'] = delete_heading_text7380b,
        codeStates['setdelete_heading_text'] = setdelete_heading_text7380b,
        codeStates['divider_s'] = divider_s1a15b,
        codeStates['setdivider_s'] = setdivider_s1a15b,
        codeStates['del_code_type_id'] = del_code_type_idea039,
        codeStates['setdel_code_type_id'] = setdel_code_type_idea039,
        codeStates['code_type_id'] = code_type_id8fe6f,
        codeStates['setcode_type_id'] = setcode_type_id8fe6f,
        codeStates['del_code_type'] = del_code_type3ce03,
        codeStates['setdel_code_type'] = setdel_code_type3ce03,
        codeStates['code_type'] = code_typedf5a3,
        codeStates['setcode_type'] = setcode_typedf5a3,
        codeStates['description_type'] = description_typef91cb,
        codeStates['setdescription_type'] = setdescription_typef91cb,
        codeStates['description'] = description32634,
        codeStates['setdescription'] = setdescription32634,
        codeStates['system_code_type'] = system_code_type9d603,
        codeStates['setsystem_code_type'] = setsystem_code_type9d603,
        codeStates['is_system'] = is_systemc0200,
        codeStates['setis_system'] = setis_systemc0200,
        codeStates['is_active'] = is_active6bc58,
        codeStates['setis_active'] = setis_active6bc58,
        codeStates['active_type'] = active_type0da2f,
        codeStates['setactive_type'] = setactive_type0da2f,
        codeStates['confo_text'] = confo_textcb476,
        codeStates['setconfo_text'] = setconfo_textcb476,
        codeStates['divider'] = dividerca7df,
        codeStates['setdivider'] = setdividerca7df,
        codeStates['cancel_button'] = cancel_buttona9054,
        codeStates['setcancel_button'] = setcancel_buttona9054,
        codeStates['ok_button'] = ok_button8e870,
        codeStates['setok_button'] = setok_button8e870,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d098857dfa7545c1bd60db681f89bbe1");
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
        codeStates['group_delete'] = group_delete9bbe1,
        codeStates['setgroup_delete'] = setgroup_delete9bbe1,
        codeStates['group_delete9bbe1'] = group_delete9bbe1Props,
        codeStates['setgroup_delete9bbe1'] = setgroup_delete9bbe1Props,
        codeStates['delete_heading_text'] = delete_heading_text7380b,
        codeStates['setdelete_heading_text'] = setdelete_heading_text7380b,
        codeStates['divider_s'] = divider_s1a15b,
        codeStates['setdivider_s'] = setdivider_s1a15b,
        codeStates['del_code_type_id'] = del_code_type_idea039,
        codeStates['setdel_code_type_id'] = setdel_code_type_idea039,
        codeStates['code_type_id'] = code_type_id8fe6f,
        codeStates['setcode_type_id'] = setcode_type_id8fe6f,
        codeStates['del_code_type'] = del_code_type3ce03,
        codeStates['setdel_code_type'] = setdel_code_type3ce03,
        codeStates['code_type'] = code_typedf5a3,
        codeStates['setcode_type'] = setcode_typedf5a3,
        codeStates['description_type'] = description_typef91cb,
        codeStates['setdescription_type'] = setdescription_typef91cb,
        codeStates['description'] = description32634,
        codeStates['setdescription'] = setdescription32634,
        codeStates['system_code_type'] = system_code_type9d603,
        codeStates['setsystem_code_type'] = setsystem_code_type9d603,
        codeStates['is_system'] = is_systemc0200,
        codeStates['setis_system'] = setis_systemc0200,
        codeStates['is_active'] = is_active6bc58,
        codeStates['setis_active'] = setis_active6bc58,
        codeStates['active_type'] = active_type0da2f,
        codeStates['setactive_type'] = setactive_type0da2f,
        codeStates['confo_text'] = confo_textcb476,
        codeStates['setconfo_text'] = setconfo_textcb476,
        codeStates['divider'] = dividerca7df,
        codeStates['setdivider'] = setdividerca7df,
        codeStates['cancel_button'] = cancel_buttona9054,
        codeStates['setcancel_button'] = setcancel_buttona9054,
        codeStates['ok_button'] = ok_button8e870,
        codeStates['setok_button'] = setok_button8e870,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete9bbe1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete9bbe1Ref.current?.setSearchParams();
    group_delete9bbe1Ref.current?.handleSearch({});
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
        !Array.isArray(group_delete9bbe1) &&
        Object.keys(group_delete9bbe1)?.length > 0
      ) {
        setgroup_delete9bbe1({})
      }
    } else prevRefreshRef.current = true
  }, [group_delete9bbe1Props?.refresh])


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
        gridRow: '1 / 73',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-3 !pr-3 !pl-3 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdeletecodetype_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 7380b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_s") ?<Dividerdivider_s   /* 1a15b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_code_type_id") ?<Textdel_code_type_id   /* ea039 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("code_type_id") ?<Textcode_type_id   /* 8fe6f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_code_type") ?<Textdel_code_type   /* 3ce03 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("code_type") ?<Textcode_type   /* df5a3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("description_type") ?<Textdescription_type   /* f91cb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("description") ?<Textdescription   /* 32634 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("system_code_type") ?<Textsystem_code_type   /* 9d603 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_system") ?<Textis_system   /* c0200 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 6bc58 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("active_type") ?<Textactive_type   /* 0da2f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* cb476 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* ca7df */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
