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
import Textasset_id  from "./Textasset_id";
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
  const {dfd_assetdoctable_v1Props, setdfd_assetdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_id",
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
      "asset_id",
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
  const {group_delete10eb3, setgroup_delete10eb3}= useContext(TotalContext) as TotalContextProps;
  const {group_delete10eb3Props, setgroup_delete10eb3Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc80ba, setdelete_heading_textc80ba}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt02e0f, setattachment_id_txt02e0f}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id4eeac, setattachment_id4eeac}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_texte3945, setdoc_group_texte3945}= useContext(TotalContext) as TotalContextProps;
  const {doc_group82055, setdoc_group82055}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text6a957, setdoc_name_text6a957}= useContext(TotalContext) as TotalContextProps;
  const {doc_name1f607, setdoc_name1f607}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text29a4f, settrs_created_by_text29a4f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byad133, settrs_created_byad133}= useContext(TotalContext) as TotalContextProps;
  const {confo_text29a5c, setconfo_text29a5c}= useContext(TotalContext) as TotalContextProps;
  const {asset_idbf0b0, setasset_idbf0b0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button753bf, setcancel_button753bf}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttone6d7f, setok_buttone6d7f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetdocdelete_v1, setassetdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "64ffca7df7aa52a114926f0c91610eb3");
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
    setgroup_delete10eb3Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textc80ba({...delete_heading_textc80ba,isDisabled:true});

    }else
    {
      if(delete_heading_textc80ba?.isDisabled==null)
      {
        setdelete_heading_textc80ba({...delete_heading_textc80ba,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txt02e0f({...attachment_id_txt02e0f,isDisabled:true});

    }else
    {
      if(attachment_id_txt02e0f?.isDisabled==null)
      {
        setattachment_id_txt02e0f({...attachment_id_txt02e0f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id4eeac({...attachment_id4eeac,isDisabled:true});

    }else
    {
      if(attachment_id4eeac?.isDisabled==null)
      {
        setattachment_id4eeac({...attachment_id4eeac,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_texte3945({...doc_group_texte3945,isDisabled:true});

    }else
    {
      if(doc_group_texte3945?.isDisabled==null)
      {
        setdoc_group_texte3945({...doc_group_texte3945,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group82055({...doc_group82055,isDisabled:true});

    }else
    {
      if(doc_group82055?.isDisabled==null)
      {
        setdoc_group82055({...doc_group82055,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_text6a957({...doc_name_text6a957,isDisabled:true});

    }else
    {
      if(doc_name_text6a957?.isDisabled==null)
      {
        setdoc_name_text6a957({...doc_name_text6a957,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name1f607({...doc_name1f607,isDisabled:true});

    }else
    {
      if(doc_name1f607?.isDisabled==null)
      {
        setdoc_name1f607({...doc_name1f607,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_text29a4f({...trs_created_by_text29a4f,isDisabled:true});

    }else
    {
      if(trs_created_by_text29a4f?.isDisabled==null)
      {
        settrs_created_by_text29a4f({...trs_created_by_text29a4f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byad133({...trs_created_byad133,isDisabled:true});

    }else
    {
      if(trs_created_byad133?.isDisabled==null)
      {
        settrs_created_byad133({...trs_created_byad133,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text29a5c({...confo_text29a5c,isDisabled:true});

    }else
    {
      if(confo_text29a5c?.isDisabled==null)
      {
        setconfo_text29a5c({...confo_text29a5c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_id")){
        setasset_idbf0b0({...asset_idbf0b0,isDisabled:true});

    }else
    {
      if(asset_idbf0b0?.isDisabled==null)
      {
        setasset_idbf0b0({...asset_idbf0b0,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button753bf({...cancel_button753bf,isDisabled:true});

    }else
    {
      if(cancel_button753bf?.isDisabled==null)
      {
        setcancel_button753bf({...cancel_button753bf,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttone6d7f({...ok_buttone6d7f,isDisabled:true});

    }else
    {
      if(ok_buttone6d7f?.isDisabled==null)
      {
        setok_buttone6d7f({...ok_buttone6d7f,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete10eb3,
        codeStates['setgroup_delete'] = setgroup_delete10eb3,
        codeStates['group_delete10eb3'] = group_delete10eb3Props,
        codeStates['setgroup_delete10eb3'] = setgroup_delete10eb3Props,
        codeStates['delete_heading_text'] = delete_heading_textc80ba,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc80ba,
        codeStates['attachment_id_txt'] = attachment_id_txt02e0f,
        codeStates['setattachment_id_txt'] = setattachment_id_txt02e0f,
        codeStates['attachment_id'] = attachment_id4eeac,
        codeStates['setattachment_id'] = setattachment_id4eeac,
        codeStates['doc_group_text'] = doc_group_texte3945,
        codeStates['setdoc_group_text'] = setdoc_group_texte3945,
        codeStates['doc_group'] = doc_group82055,
        codeStates['setdoc_group'] = setdoc_group82055,
        codeStates['doc_name_text'] = doc_name_text6a957,
        codeStates['setdoc_name_text'] = setdoc_name_text6a957,
        codeStates['doc_name'] = doc_name1f607,
        codeStates['setdoc_name'] = setdoc_name1f607,
        codeStates['trs_created_by_text'] = trs_created_by_text29a4f,
        codeStates['settrs_created_by_text'] = settrs_created_by_text29a4f,
        codeStates['trs_created_by'] = trs_created_byad133,
        codeStates['settrs_created_by'] = settrs_created_byad133,
        codeStates['confo_text'] = confo_text29a5c,
        codeStates['setconfo_text'] = setconfo_text29a5c,
        codeStates['asset_id'] = asset_idbf0b0,
        codeStates['setasset_id'] = setasset_idbf0b0,
        codeStates['cancel_button'] = cancel_button753bf,
        codeStates['setcancel_button'] = setcancel_button753bf,
        codeStates['ok_button'] = ok_buttone6d7f,
        codeStates['setok_button'] = setok_buttone6d7f,

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
        codeStates['group_delete'] = group_delete10eb3,
        codeStates['setgroup_delete'] = setgroup_delete10eb3,
        codeStates['group_delete10eb3'] = group_delete10eb3Props,
        codeStates['setgroup_delete10eb3'] = setgroup_delete10eb3Props,
        codeStates['delete_heading_text'] = delete_heading_textc80ba,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc80ba,
        codeStates['attachment_id_txt'] = attachment_id_txt02e0f,
        codeStates['setattachment_id_txt'] = setattachment_id_txt02e0f,
        codeStates['attachment_id'] = attachment_id4eeac,
        codeStates['setattachment_id'] = setattachment_id4eeac,
        codeStates['doc_group_text'] = doc_group_texte3945,
        codeStates['setdoc_group_text'] = setdoc_group_texte3945,
        codeStates['doc_group'] = doc_group82055,
        codeStates['setdoc_group'] = setdoc_group82055,
        codeStates['doc_name_text'] = doc_name_text6a957,
        codeStates['setdoc_name_text'] = setdoc_name_text6a957,
        codeStates['doc_name'] = doc_name1f607,
        codeStates['setdoc_name'] = setdoc_name1f607,
        codeStates['trs_created_by_text'] = trs_created_by_text29a4f,
        codeStates['settrs_created_by_text'] = settrs_created_by_text29a4f,
        codeStates['trs_created_by'] = trs_created_byad133,
        codeStates['settrs_created_by'] = settrs_created_byad133,
        codeStates['confo_text'] = confo_text29a5c,
        codeStates['setconfo_text'] = setconfo_text29a5c,
        codeStates['asset_id'] = asset_idbf0b0,
        codeStates['setasset_id'] = setasset_idbf0b0,
        codeStates['cancel_button'] = cancel_button753bf,
        codeStates['setcancel_button'] = setcancel_button753bf,
        codeStates['ok_button'] = ok_buttone6d7f,
        codeStates['setok_button'] = setok_buttone6d7f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete10eb3Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete10eb3Ref.current?.setSearchParams();
    group_delete10eb3Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete10eb3) && Object.keys(group_delete10eb3)?.length>0)
      {
        setgroup_delete10eb3({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete10eb3Props?.refresh,token])


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
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* c80ba */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* 02e0f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* 4eeac */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* e3945 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 82055 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* 6a957 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* 1f607 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* 29a4f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* ad133 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 29a5c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_id") ?<Textasset_id   /* bf0b0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
