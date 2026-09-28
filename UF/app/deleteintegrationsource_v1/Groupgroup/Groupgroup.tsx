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
import Dividerdiv_1  from "./Dividerdiv_1";
import Textsource_id  from "./Textsource_id";
import Textintegration_source_id  from "./Textintegration_source_id";
import Textsource_code  from "./Textsource_code";
import Textintegration_source_code  from "./Textintegration_source_code";
import Textsource_name  from "./Textsource_name";
import Textintegration_source_name  from "./Textintegration_source_name";
import Textconnector_type  from "./Textconnector_type";
import Textintegration_connector_type  from "./Textintegration_connector_type";
import Textstatus  from "./Textstatus";
import Textis_active  from "./Textis_active";
import Texttext  from "./Texttext";
import Dividerdivider_2  from "./Dividerdivider_2";
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttondelete_btn  from "./Buttondelete_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_integrationsource_v1Props, setdfd_integrationsource_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "DEV_AT": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_text",
      "div_1",
      "source_id",
      "integration_source_id",
      "source_code",
      "integration_source_code",
      "source_name",
      "integration_source_name",
      "connector_type",
      "integration_connector_type",
      "status",
      "is_active",
      "text",
      "divider_2",
      "cancel_btn",
      "delete_btn"
    ],
    "allowedGroups": [
      "canvas",
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
  const {group79c03, setgroup79c03}= useContext(TotalContext) as TotalContextProps;
  const {group79c03Props, setgroup79c03Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texte4a10, setdelete_heading_texte4a10}= useContext(TotalContext) as TotalContextProps;
  const {div_198ee5, setdiv_198ee5}= useContext(TotalContext) as TotalContextProps;
  const {source_id53454, setsource_id53454}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_idf4d20, setintegration_source_idf4d20}= useContext(TotalContext) as TotalContextProps;
  const {source_code13e0c, setsource_code13e0c}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_code3e7e2, setintegration_source_code3e7e2}= useContext(TotalContext) as TotalContextProps;
  const {source_name60ac7, setsource_name60ac7}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_name2b239, setintegration_source_name2b239}= useContext(TotalContext) as TotalContextProps;
  const {connector_type328cc, setconnector_type328cc}= useContext(TotalContext) as TotalContextProps;
  const {integration_connector_type29cd0, setintegration_connector_type29cd0}= useContext(TotalContext) as TotalContextProps;
  const {status9cd32, setstatus9cd32}= useContext(TotalContext) as TotalContextProps;
  const {is_activef0183, setis_activef0183}= useContext(TotalContext) as TotalContextProps;
  const {textfd8c5, settextfd8c5}= useContext(TotalContext) as TotalContextProps;
  const {divider_27dbcc, setdivider_27dbcc}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btn82ef5, setcancel_btn82ef5}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnb4584, setdelete_btnb4584}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteintegrationsource_v1, setdeleteintegrationsource_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteIntegrationSource:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a75c7d125e344a36805fdde9dd379c03");
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
    setgroup79c03Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_texte4a10((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_texte4a10?.isDisabled==null)
      {
        setdelete_heading_texte4a10((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("div_1")){
        setdiv_198ee5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(div_198ee5?.isDisabled==null)
      {
        setdiv_198ee5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_id")){
        setsource_id53454((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_id53454?.isDisabled==null)
      {
        setsource_id53454((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source_id")){
        setintegration_source_idf4d20((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source_idf4d20?.isDisabled==null)
      {
        setintegration_source_idf4d20((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_code")){
        setsource_code13e0c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_code13e0c?.isDisabled==null)
      {
        setsource_code13e0c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source_code")){
        setintegration_source_code3e7e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source_code3e7e2?.isDisabled==null)
      {
        setintegration_source_code3e7e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_name")){
        setsource_name60ac7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_name60ac7?.isDisabled==null)
      {
        setsource_name60ac7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_source_name")){
        setintegration_source_name2b239((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_source_name2b239?.isDisabled==null)
      {
        setintegration_source_name2b239((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("connector_type")){
        setconnector_type328cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(connector_type328cc?.isDisabled==null)
      {
        setconnector_type328cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("integration_connector_type")){
        setintegration_connector_type29cd0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(integration_connector_type29cd0?.isDisabled==null)
      {
        setintegration_connector_type29cd0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatus9cd32((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status9cd32?.isDisabled==null)
      {
        setstatus9cd32((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_activef0183((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_activef0183?.isDisabled==null)
      {
        setis_activef0183((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextfd8c5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textfd8c5?.isDisabled==null)
      {
        settextfd8c5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider_2")){
        setdivider_27dbcc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(divider_27dbcc?.isDisabled==null)
      {
        setdivider_27dbcc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btn82ef5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btn82ef5?.isDisabled==null)
      {
        setcancel_btn82ef5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_btn")){
        setdelete_btnb4584((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_btnb4584?.isDisabled==null)
      {
        setdelete_btnb4584((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group79c03,
        codeStates['setgroup'] = setgroup79c03,
        codeStates['group79c03'] = group79c03Props,
        codeStates['setgroup79c03'] = setgroup79c03Props,
        codeStates['delete_heading_text'] = delete_heading_texte4a10,
        codeStates['setdelete_heading_text'] = setdelete_heading_texte4a10,
        codeStates['div_1'] = div_198ee5,
        codeStates['setdiv_1'] = setdiv_198ee5,
        codeStates['source_id'] = source_id53454,
        codeStates['setsource_id'] = setsource_id53454,
        codeStates['integration_source_id'] = integration_source_idf4d20,
        codeStates['setintegration_source_id'] = setintegration_source_idf4d20,
        codeStates['source_code'] = source_code13e0c,
        codeStates['setsource_code'] = setsource_code13e0c,
        codeStates['integration_source_code'] = integration_source_code3e7e2,
        codeStates['setintegration_source_code'] = setintegration_source_code3e7e2,
        codeStates['source_name'] = source_name60ac7,
        codeStates['setsource_name'] = setsource_name60ac7,
        codeStates['integration_source_name'] = integration_source_name2b239,
        codeStates['setintegration_source_name'] = setintegration_source_name2b239,
        codeStates['connector_type'] = connector_type328cc,
        codeStates['setconnector_type'] = setconnector_type328cc,
        codeStates['integration_connector_type'] = integration_connector_type29cd0,
        codeStates['setintegration_connector_type'] = setintegration_connector_type29cd0,
        codeStates['status'] = status9cd32,
        codeStates['setstatus'] = setstatus9cd32,
        codeStates['is_active'] = is_activef0183,
        codeStates['setis_active'] = setis_activef0183,
        codeStates['text'] = textfd8c5,
        codeStates['settext'] = settextfd8c5,
        codeStates['divider_2'] = divider_27dbcc,
        codeStates['setdivider_2'] = setdivider_27dbcc,
        codeStates['cancel_btn'] = cancel_btn82ef5,
        codeStates['setcancel_btn'] = setcancel_btn82ef5,
        codeStates['delete_btn'] = delete_btnb4584,
        codeStates['setdelete_btn'] = setdelete_btnb4584,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a75c7d125e344a36805fdde9dd379c03");
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
        codeStates['group'] = group79c03,
        codeStates['setgroup'] = setgroup79c03,
        codeStates['group79c03'] = group79c03Props,
        codeStates['setgroup79c03'] = setgroup79c03Props,
        codeStates['delete_heading_text'] = delete_heading_texte4a10,
        codeStates['setdelete_heading_text'] = setdelete_heading_texte4a10,
        codeStates['div_1'] = div_198ee5,
        codeStates['setdiv_1'] = setdiv_198ee5,
        codeStates['source_id'] = source_id53454,
        codeStates['setsource_id'] = setsource_id53454,
        codeStates['integration_source_id'] = integration_source_idf4d20,
        codeStates['setintegration_source_id'] = setintegration_source_idf4d20,
        codeStates['source_code'] = source_code13e0c,
        codeStates['setsource_code'] = setsource_code13e0c,
        codeStates['integration_source_code'] = integration_source_code3e7e2,
        codeStates['setintegration_source_code'] = setintegration_source_code3e7e2,
        codeStates['source_name'] = source_name60ac7,
        codeStates['setsource_name'] = setsource_name60ac7,
        codeStates['integration_source_name'] = integration_source_name2b239,
        codeStates['setintegration_source_name'] = setintegration_source_name2b239,
        codeStates['connector_type'] = connector_type328cc,
        codeStates['setconnector_type'] = setconnector_type328cc,
        codeStates['integration_connector_type'] = integration_connector_type29cd0,
        codeStates['setintegration_connector_type'] = setintegration_connector_type29cd0,
        codeStates['status'] = status9cd32,
        codeStates['setstatus'] = setstatus9cd32,
        codeStates['is_active'] = is_activef0183,
        codeStates['setis_active'] = setis_activef0183,
        codeStates['text'] = textfd8c5,
        codeStates['settext'] = settextfd8c5,
        codeStates['divider_2'] = divider_27dbcc,
        codeStates['setdivider_2'] = setdivider_27dbcc,
        codeStates['cancel_btn'] = cancel_btn82ef5,
        codeStates['setcancel_btn'] = setcancel_btn82ef5,
        codeStates['delete_btn'] = delete_btnb4584,
        codeStates['setdelete_btn'] = setdelete_btnb4584,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group79c03Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group79c03Ref.current?.setSearchParams();
    group79c03Ref.current?.handleSearch({});
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
        !Array.isArray(group79c03) &&
        Object.keys(group79c03)?.length > 0
      ) {
        setgroup79c03({})
      }
    } else prevRefreshRef.current = true
  }, [group79c03Props?.refresh])


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
        gridRow: '1 / 64',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setdeleteintegrationsource_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* e4a10 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("div_1") ?<Dividerdiv_1   /* 98ee5 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_id") ?<Textsource_id   /* 53454 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_source_id") ?<Textintegration_source_id   /* f4d20 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_code") ?<Textsource_code   /* 13e0c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_source_code") ?<Textintegration_source_code   /* 3e7e2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_name") ?<Textsource_name   /* 60ac7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_source_name") ?<Textintegration_source_name   /* 2b239 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("connector_type") ?<Textconnector_type   /* 328cc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("integration_connector_type") ?<Textintegration_connector_type   /* 29cd0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status") ?<Textstatus   /* 9cd32 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* f0183 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* fd8c5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider_2") ?<Dividerdivider_2   /* 7dbcc */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "delete_btn" in ButtonGoRuleData)?ButtonGoRuleData["delete_btn"]:true) && 
          allowedControls.includes("delete_btn")  ?            <Buttondelete_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup
