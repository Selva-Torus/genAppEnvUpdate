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
import Textattachment_id_txt  from "./Textattachment_id_txt";
import Textattachment_id  from "./Textattachment_id";
import Textdoc_group_text  from "./Textdoc_group_text";
import Textdoc_group  from "./Textdoc_group";
import Textdoc_name_text  from "./Textdoc_name_text";
import Textdoc_name  from "./Textdoc_name";
import Texttrs_created_by_text  from "./Texttrs_created_by_text";
import Texttrs_created_by  from "./Texttrs_created_by";
import Textconfo_text  from "./Textconfo_text";
import Textassign_id  from "./Textassign_id";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup_delete = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_assigndoctable_v1Props, setdfd_assigndoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "assign_id",
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
  "Checker": {
    "allowedControls": [
      "delete_heading_text",
      "attachment_id_txt",
      "attachment_id",
      "doc_group_text",
      "doc_group",
      "doc_name_text",
      "doc_name",
      "trs_created_by_text",
      "trs_created_by",
      "confo_text",
      "assign_id",
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
  const {group_delete8ee3b, setgroup_delete8ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8ee3bProps, setgroup_delete8ee3bProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text5f884, setdelete_heading_text5f884}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt0f0d3, setattachment_id_txt0f0d3}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idea582, setattachment_idea582}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text09f3f, setdoc_group_text09f3f}= useContext(TotalContext) as TotalContextProps;
  const {doc_group796b8, setdoc_group796b8}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text69cc2, setdoc_name_text69cc2}= useContext(TotalContext) as TotalContextProps;
  const {doc_name19bda, setdoc_name19bda}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text805fb, settrs_created_by_text805fb}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by4c93f, settrs_created_by4c93f}= useContext(TotalContext) as TotalContextProps;
  const {confo_text0c7c5, setconfo_text0c7c5}= useContext(TotalContext) as TotalContextProps;
  const {assign_id67319, setassign_id67319}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button7e1a2, setcancel_button7e1a2}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc63df, setok_buttonc63df}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assigndocdelete_v1, setassigndocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "25c9d48e9a305596f358cc08bd38ee3b");
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
    setgroup_delete8ee3bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text5f884({...delete_heading_text5f884,isDisabled:true});

    }else
    {
      if(delete_heading_text5f884?.isDisabled==null)
      {
        setdelete_heading_text5f884({...delete_heading_text5f884,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txt0f0d3({...attachment_id_txt0f0d3,isDisabled:true});

    }else
    {
      if(attachment_id_txt0f0d3?.isDisabled==null)
      {
        setattachment_id_txt0f0d3({...attachment_id_txt0f0d3,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_idea582({...attachment_idea582,isDisabled:true});

    }else
    {
      if(attachment_idea582?.isDisabled==null)
      {
        setattachment_idea582({...attachment_idea582,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_text09f3f({...doc_group_text09f3f,isDisabled:true});

    }else
    {
      if(doc_group_text09f3f?.isDisabled==null)
      {
        setdoc_group_text09f3f({...doc_group_text09f3f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group796b8({...doc_group796b8,isDisabled:true});

    }else
    {
      if(doc_group796b8?.isDisabled==null)
      {
        setdoc_group796b8({...doc_group796b8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_text69cc2({...doc_name_text69cc2,isDisabled:true});

    }else
    {
      if(doc_name_text69cc2?.isDisabled==null)
      {
        setdoc_name_text69cc2({...doc_name_text69cc2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name19bda({...doc_name19bda,isDisabled:true});

    }else
    {
      if(doc_name19bda?.isDisabled==null)
      {
        setdoc_name19bda({...doc_name19bda,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_text805fb({...trs_created_by_text805fb,isDisabled:true});

    }else
    {
      if(trs_created_by_text805fb?.isDisabled==null)
      {
        settrs_created_by_text805fb({...trs_created_by_text805fb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by4c93f({...trs_created_by4c93f,isDisabled:true});

    }else
    {
      if(trs_created_by4c93f?.isDisabled==null)
      {
        settrs_created_by4c93f({...trs_created_by4c93f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text0c7c5({...confo_text0c7c5,isDisabled:true});

    }else
    {
      if(confo_text0c7c5?.isDisabled==null)
      {
        setconfo_text0c7c5({...confo_text0c7c5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign_id")){
        setassign_id67319({...assign_id67319,isDisabled:true});

    }else
    {
      if(assign_id67319?.isDisabled==null)
      {
        setassign_id67319({...assign_id67319,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button7e1a2({...cancel_button7e1a2,isDisabled:true});

    }else
    {
      if(cancel_button7e1a2?.isDisabled==null)
      {
        setcancel_button7e1a2({...cancel_button7e1a2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonc63df({...ok_buttonc63df,isDisabled:true});

    }else
    {
      if(ok_buttonc63df?.isDisabled==null)
      {
        setok_buttonc63df({...ok_buttonc63df,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete8ee3b,
        codeStates['setgroup_delete'] = setgroup_delete8ee3b,
        codeStates['group_delete8ee3b'] = group_delete8ee3bProps,
        codeStates['setgroup_delete8ee3b'] = setgroup_delete8ee3bProps,
        codeStates['delete_heading_text'] = delete_heading_text5f884,
        codeStates['setdelete_heading_text'] = setdelete_heading_text5f884,
        codeStates['attachment_id_txt'] = attachment_id_txt0f0d3,
        codeStates['setattachment_id_txt'] = setattachment_id_txt0f0d3,
        codeStates['attachment_id'] = attachment_idea582,
        codeStates['setattachment_id'] = setattachment_idea582,
        codeStates['doc_group_text'] = doc_group_text09f3f,
        codeStates['setdoc_group_text'] = setdoc_group_text09f3f,
        codeStates['doc_group'] = doc_group796b8,
        codeStates['setdoc_group'] = setdoc_group796b8,
        codeStates['doc_name_text'] = doc_name_text69cc2,
        codeStates['setdoc_name_text'] = setdoc_name_text69cc2,
        codeStates['doc_name'] = doc_name19bda,
        codeStates['setdoc_name'] = setdoc_name19bda,
        codeStates['trs_created_by_text'] = trs_created_by_text805fb,
        codeStates['settrs_created_by_text'] = settrs_created_by_text805fb,
        codeStates['trs_created_by'] = trs_created_by4c93f,
        codeStates['settrs_created_by'] = settrs_created_by4c93f,
        codeStates['confo_text'] = confo_text0c7c5,
        codeStates['setconfo_text'] = setconfo_text0c7c5,
        codeStates['assign_id'] = assign_id67319,
        codeStates['setassign_id'] = setassign_id67319,
        codeStates['cancel_button'] = cancel_button7e1a2,
        codeStates['setcancel_button'] = setcancel_button7e1a2,
        codeStates['ok_button'] = ok_buttonc63df,
        codeStates['setok_button'] = setok_buttonc63df,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()

  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete8ee3b,
        codeStates['setgroup_delete'] = setgroup_delete8ee3b,
        codeStates['group_delete8ee3b'] = group_delete8ee3bProps,
        codeStates['setgroup_delete8ee3b'] = setgroup_delete8ee3bProps,
        codeStates['delete_heading_text'] = delete_heading_text5f884,
        codeStates['setdelete_heading_text'] = setdelete_heading_text5f884,
        codeStates['attachment_id_txt'] = attachment_id_txt0f0d3,
        codeStates['setattachment_id_txt'] = setattachment_id_txt0f0d3,
        codeStates['attachment_id'] = attachment_idea582,
        codeStates['setattachment_id'] = setattachment_idea582,
        codeStates['doc_group_text'] = doc_group_text09f3f,
        codeStates['setdoc_group_text'] = setdoc_group_text09f3f,
        codeStates['doc_group'] = doc_group796b8,
        codeStates['setdoc_group'] = setdoc_group796b8,
        codeStates['doc_name_text'] = doc_name_text69cc2,
        codeStates['setdoc_name_text'] = setdoc_name_text69cc2,
        codeStates['doc_name'] = doc_name19bda,
        codeStates['setdoc_name'] = setdoc_name19bda,
        codeStates['trs_created_by_text'] = trs_created_by_text805fb,
        codeStates['settrs_created_by_text'] = settrs_created_by_text805fb,
        codeStates['trs_created_by'] = trs_created_by4c93f,
        codeStates['settrs_created_by'] = settrs_created_by4c93f,
        codeStates['confo_text'] = confo_text0c7c5,
        codeStates['setconfo_text'] = setconfo_text0c7c5,
        codeStates['assign_id'] = assign_id67319,
        codeStates['setassign_id'] = setassign_id67319,
        codeStates['cancel_button'] = cancel_button7e1a2,
        codeStates['setcancel_button'] = setcancel_button7e1a2,
        codeStates['ok_button'] = ok_buttonc63df,
        codeStates['setok_button'] = setok_buttonc63df,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete8ee3bRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete8ee3bRef.current?.setSearchParams();
    group_delete8ee3bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete8ee3b) && Object.keys(group_delete8ee3b)?.length>0)
      {
        setgroup_delete8ee3b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete8ee3bProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 48',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 5f884 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* 0f0d3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* ea582 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* 09f3f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 796b8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* 69cc2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* 19bda */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* 805fb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* 4c93f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 0c7c5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assign_id") ?<Textassign_id   /* 67319 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
