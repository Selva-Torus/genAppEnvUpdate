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
import Dividerdivider_top  from "./Dividerdivider_top";
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
import Dividerdivider  from "./Dividerdivider";
import Textaccess_req_id  from "./Textaccess_req_id";
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
  const {dfd_accessreqdoctable_v1Props, setdfd_accessreqdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "CXO": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "HR Manager": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "Info Security Officer": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "Employee": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "IT Manager": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "Operation Staff": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
      "divider_top",
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
      "divider",
      "access_req_id",
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
  "Operation Manager": {
    "allowedControls": [
      "divider_top",
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
      "divider",
      "access_req_id",
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
  const {group_deletee7496, setgroup_deletee7496}= useContext(TotalContext) as TotalContextProps;
  const {group_deletee7496Props, setgroup_deletee7496Props}= useContext(TotalContext) as TotalContextProps;
  const {divider_topff733, setdivider_topff733}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text54f32, setdelete_heading_text54f32}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt06ae9, setattachment_id_txt06ae9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ideb2da, setattachment_ideb2da}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textac80d, setdoc_group_textac80d}= useContext(TotalContext) as TotalContextProps;
  const {doc_groupd3c6e, setdoc_groupd3c6e}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text550d7, setdoc_name_text550d7}= useContext(TotalContext) as TotalContextProps;
  const {doc_name42663, setdoc_name42663}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte814b, settrs_created_by_texte814b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfc11e, settrs_created_byfc11e}= useContext(TotalContext) as TotalContextProps;
  const {confo_text8976f, setconfo_text8976f}= useContext(TotalContext) as TotalContextProps;
  const {divider004b8, setdivider004b8}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idf71e7, setaccess_req_idf71e7}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonbc6e4, setcancel_buttonbc6e4}= useContext(TotalContext) as TotalContextProps;
  const {ok_button53062, setok_button53062}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {accessreqdocdelete_v1, setaccessreqdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessReqDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "58ae175d327ff504b15b255a09de7496");
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
    setgroup_deletee7496Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_topff733((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_topff733?.isDisabled==null)
      {
        setdivider_topff733((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text54f32((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text54f32?.isDisabled==null)
      {
        setdelete_heading_text54f32((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txt06ae9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id_txt06ae9?.isDisabled==null)
      {
        setattachment_id_txt06ae9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_ideb2da((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_ideb2da?.isDisabled==null)
      {
        setattachment_ideb2da((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_textac80d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group_textac80d?.isDisabled==null)
      {
        setdoc_group_textac80d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_groupd3c6e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_groupd3c6e?.isDisabled==null)
      {
        setdoc_groupd3c6e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_text550d7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name_text550d7?.isDisabled==null)
      {
        setdoc_name_text550d7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name42663((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name42663?.isDisabled==null)
      {
        setdoc_name42663((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_texte814b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by_texte814b?.isDisabled==null)
      {
        settrs_created_by_texte814b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_byfc11e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_byfc11e?.isDisabled==null)
      {
        settrs_created_byfc11e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text8976f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_text8976f?.isDisabled==null)
      {
        setconfo_text8976f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider004b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider004b8?.isDisabled==null)
      {
        setdivider004b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_req_id")){
        setaccess_req_idf71e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_idf71e7?.isDisabled==null)
      {
        setaccess_req_idf71e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonbc6e4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonbc6e4?.isDisabled==null)
      {
        setcancel_buttonbc6e4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button53062((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button53062?.isDisabled==null)
      {
        setok_button53062((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_deletee7496,
        codeStates['setgroup_delete'] = setgroup_deletee7496,
        codeStates['group_deletee7496'] = group_deletee7496Props,
        codeStates['setgroup_deletee7496'] = setgroup_deletee7496Props,
        codeStates['divider_top'] = divider_topff733,
        codeStates['setdivider_top'] = setdivider_topff733,
        codeStates['delete_heading_text'] = delete_heading_text54f32,
        codeStates['setdelete_heading_text'] = setdelete_heading_text54f32,
        codeStates['attachment_id_txt'] = attachment_id_txt06ae9,
        codeStates['setattachment_id_txt'] = setattachment_id_txt06ae9,
        codeStates['attachment_id'] = attachment_ideb2da,
        codeStates['setattachment_id'] = setattachment_ideb2da,
        codeStates['doc_group_text'] = doc_group_textac80d,
        codeStates['setdoc_group_text'] = setdoc_group_textac80d,
        codeStates['doc_group'] = doc_groupd3c6e,
        codeStates['setdoc_group'] = setdoc_groupd3c6e,
        codeStates['doc_name_text'] = doc_name_text550d7,
        codeStates['setdoc_name_text'] = setdoc_name_text550d7,
        codeStates['doc_name'] = doc_name42663,
        codeStates['setdoc_name'] = setdoc_name42663,
        codeStates['trs_created_by_text'] = trs_created_by_texte814b,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte814b,
        codeStates['trs_created_by'] = trs_created_byfc11e,
        codeStates['settrs_created_by'] = settrs_created_byfc11e,
        codeStates['confo_text'] = confo_text8976f,
        codeStates['setconfo_text'] = setconfo_text8976f,
        codeStates['divider'] = divider004b8,
        codeStates['setdivider'] = setdivider004b8,
        codeStates['access_req_id'] = access_req_idf71e7,
        codeStates['setaccess_req_id'] = setaccess_req_idf71e7,
        codeStates['cancel_button'] = cancel_buttonbc6e4,
        codeStates['setcancel_button'] = setcancel_buttonbc6e4,
        codeStates['ok_button'] = ok_button53062,
        codeStates['setok_button'] = setok_button53062,

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
        codeStates['group_delete'] = group_deletee7496,
        codeStates['setgroup_delete'] = setgroup_deletee7496,
        codeStates['group_deletee7496'] = group_deletee7496Props,
        codeStates['setgroup_deletee7496'] = setgroup_deletee7496Props,
        codeStates['divider_top'] = divider_topff733,
        codeStates['setdivider_top'] = setdivider_topff733,
        codeStates['delete_heading_text'] = delete_heading_text54f32,
        codeStates['setdelete_heading_text'] = setdelete_heading_text54f32,
        codeStates['attachment_id_txt'] = attachment_id_txt06ae9,
        codeStates['setattachment_id_txt'] = setattachment_id_txt06ae9,
        codeStates['attachment_id'] = attachment_ideb2da,
        codeStates['setattachment_id'] = setattachment_ideb2da,
        codeStates['doc_group_text'] = doc_group_textac80d,
        codeStates['setdoc_group_text'] = setdoc_group_textac80d,
        codeStates['doc_group'] = doc_groupd3c6e,
        codeStates['setdoc_group'] = setdoc_groupd3c6e,
        codeStates['doc_name_text'] = doc_name_text550d7,
        codeStates['setdoc_name_text'] = setdoc_name_text550d7,
        codeStates['doc_name'] = doc_name42663,
        codeStates['setdoc_name'] = setdoc_name42663,
        codeStates['trs_created_by_text'] = trs_created_by_texte814b,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte814b,
        codeStates['trs_created_by'] = trs_created_byfc11e,
        codeStates['settrs_created_by'] = settrs_created_byfc11e,
        codeStates['confo_text'] = confo_text8976f,
        codeStates['setconfo_text'] = setconfo_text8976f,
        codeStates['divider'] = divider004b8,
        codeStates['setdivider'] = setdivider004b8,
        codeStates['access_req_id'] = access_req_idf71e7,
        codeStates['setaccess_req_id'] = setaccess_req_idf71e7,
        codeStates['cancel_button'] = cancel_buttonbc6e4,
        codeStates['setcancel_button'] = setcancel_buttonbc6e4,
        codeStates['ok_button'] = ok_button53062,
        codeStates['setok_button'] = setok_button53062,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_deletee7496Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_deletee7496Ref.current?.setSearchParams();
    group_deletee7496Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_deletee7496) && Object.keys(group_deletee7496)?.length>0)
      {
        setgroup_deletee7496({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_deletee7496Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 56',
      
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
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaccessreqdocdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* ff733 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 54f32 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* 06ae9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* eb2da */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* ac80d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* d3c6e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* 550d7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* 42663 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* e814b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* fc11e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 8976f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 004b8 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("access_req_id") ?<Textaccess_req_id   /* f71e7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
