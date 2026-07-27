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
import Textleave_req_id  from "./Textleave_req_id";
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
  const {dfd_leavemanagedoctable_v1Props, setdfd_leavemanagedoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
      "leave_req_id",
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
  const {group_delete617ef, setgroup_delete617ef}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617efProps, setgroup_delete617efProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_top168f7, setdivider_top168f7}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text2560c, setdelete_heading_text2560c}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txt17233, setattachment_id_txt17233}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id987ae, setattachment_id987ae}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_textffd12, setdoc_group_textffd12}= useContext(TotalContext) as TotalContextProps;
  const {doc_group3263c, setdoc_group3263c}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_text76c54, setdoc_name_text76c54}= useContext(TotalContext) as TotalContextProps;
  const {doc_name2d223, setdoc_name2d223}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_texte87c8, settrs_created_by_texte87c8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3ee0e, settrs_created_by3ee0e}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbbf51, setconfo_textbbf51}= useContext(TotalContext) as TotalContextProps;
  const {divider77bc6, setdivider77bc6}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id3cec0, setleave_req_id3cec0}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc4f32, setcancel_buttonc4f32}= useContext(TotalContext) as TotalContextProps;
  const {ok_button0c2f2, setok_button0c2f2}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavemanagedocdelete_v1, setleavemanagedocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveManageDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "3bf1bf0f4a4e01cabdd93ee0d51617ef");
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
    setgroup_delete617efProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_top168f7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_top168f7?.isDisabled==null)
      {
        setdivider_top168f7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text2560c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text2560c?.isDisabled==null)
      {
        setdelete_heading_text2560c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txt17233((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id_txt17233?.isDisabled==null)
      {
        setattachment_id_txt17233((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id987ae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id987ae?.isDisabled==null)
      {
        setattachment_id987ae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_textffd12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group_textffd12?.isDisabled==null)
      {
        setdoc_group_textffd12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group3263c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group3263c?.isDisabled==null)
      {
        setdoc_group3263c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_text76c54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name_text76c54?.isDisabled==null)
      {
        setdoc_name_text76c54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_name2d223((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name2d223?.isDisabled==null)
      {
        setdoc_name2d223((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_texte87c8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by_texte87c8?.isDisabled==null)
      {
        settrs_created_by_texte87c8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_by3ee0e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by3ee0e?.isDisabled==null)
      {
        settrs_created_by3ee0e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textbbf51((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_textbbf51?.isDisabled==null)
      {
        setconfo_textbbf51((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider77bc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider77bc6?.isDisabled==null)
      {
        setdivider77bc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_req_id")){
        setleave_req_id3cec0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_id3cec0?.isDisabled==null)
      {
        setleave_req_id3cec0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonc4f32((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonc4f32?.isDisabled==null)
      {
        setcancel_buttonc4f32((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button0c2f2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button0c2f2?.isDisabled==null)
      {
        setok_button0c2f2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete617ef,
        codeStates['setgroup_delete'] = setgroup_delete617ef,
        codeStates['group_delete617ef'] = group_delete617efProps,
        codeStates['setgroup_delete617ef'] = setgroup_delete617efProps,
        codeStates['divider_top'] = divider_top168f7,
        codeStates['setdivider_top'] = setdivider_top168f7,
        codeStates['delete_heading_text'] = delete_heading_text2560c,
        codeStates['setdelete_heading_text'] = setdelete_heading_text2560c,
        codeStates['attachment_id_txt'] = attachment_id_txt17233,
        codeStates['setattachment_id_txt'] = setattachment_id_txt17233,
        codeStates['attachment_id'] = attachment_id987ae,
        codeStates['setattachment_id'] = setattachment_id987ae,
        codeStates['doc_group_text'] = doc_group_textffd12,
        codeStates['setdoc_group_text'] = setdoc_group_textffd12,
        codeStates['doc_group'] = doc_group3263c,
        codeStates['setdoc_group'] = setdoc_group3263c,
        codeStates['doc_name_text'] = doc_name_text76c54,
        codeStates['setdoc_name_text'] = setdoc_name_text76c54,
        codeStates['doc_name'] = doc_name2d223,
        codeStates['setdoc_name'] = setdoc_name2d223,
        codeStates['trs_created_by_text'] = trs_created_by_texte87c8,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte87c8,
        codeStates['trs_created_by'] = trs_created_by3ee0e,
        codeStates['settrs_created_by'] = settrs_created_by3ee0e,
        codeStates['confo_text'] = confo_textbbf51,
        codeStates['setconfo_text'] = setconfo_textbbf51,
        codeStates['divider'] = divider77bc6,
        codeStates['setdivider'] = setdivider77bc6,
        codeStates['leave_req_id'] = leave_req_id3cec0,
        codeStates['setleave_req_id'] = setleave_req_id3cec0,
        codeStates['cancel_button'] = cancel_buttonc4f32,
        codeStates['setcancel_button'] = setcancel_buttonc4f32,
        codeStates['ok_button'] = ok_button0c2f2,
        codeStates['setok_button'] = setok_button0c2f2,

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
        codeStates['group_delete'] = group_delete617ef,
        codeStates['setgroup_delete'] = setgroup_delete617ef,
        codeStates['group_delete617ef'] = group_delete617efProps,
        codeStates['setgroup_delete617ef'] = setgroup_delete617efProps,
        codeStates['divider_top'] = divider_top168f7,
        codeStates['setdivider_top'] = setdivider_top168f7,
        codeStates['delete_heading_text'] = delete_heading_text2560c,
        codeStates['setdelete_heading_text'] = setdelete_heading_text2560c,
        codeStates['attachment_id_txt'] = attachment_id_txt17233,
        codeStates['setattachment_id_txt'] = setattachment_id_txt17233,
        codeStates['attachment_id'] = attachment_id987ae,
        codeStates['setattachment_id'] = setattachment_id987ae,
        codeStates['doc_group_text'] = doc_group_textffd12,
        codeStates['setdoc_group_text'] = setdoc_group_textffd12,
        codeStates['doc_group'] = doc_group3263c,
        codeStates['setdoc_group'] = setdoc_group3263c,
        codeStates['doc_name_text'] = doc_name_text76c54,
        codeStates['setdoc_name_text'] = setdoc_name_text76c54,
        codeStates['doc_name'] = doc_name2d223,
        codeStates['setdoc_name'] = setdoc_name2d223,
        codeStates['trs_created_by_text'] = trs_created_by_texte87c8,
        codeStates['settrs_created_by_text'] = settrs_created_by_texte87c8,
        codeStates['trs_created_by'] = trs_created_by3ee0e,
        codeStates['settrs_created_by'] = settrs_created_by3ee0e,
        codeStates['confo_text'] = confo_textbbf51,
        codeStates['setconfo_text'] = setconfo_textbbf51,
        codeStates['divider'] = divider77bc6,
        codeStates['setdivider'] = setdivider77bc6,
        codeStates['leave_req_id'] = leave_req_id3cec0,
        codeStates['setleave_req_id'] = setleave_req_id3cec0,
        codeStates['cancel_button'] = cancel_buttonc4f32,
        codeStates['setcancel_button'] = setcancel_buttonc4f32,
        codeStates['ok_button'] = ok_button0c2f2,
        codeStates['setok_button'] = setok_button0c2f2,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete617efRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete617efRef.current?.setSearchParams();
    group_delete617efRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete617ef) && Object.keys(group_delete617ef)?.length>0)
      {
        setgroup_delete617ef({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete617efProps?.refresh,token])


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
          setleavemanagedocdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* 168f7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 2560c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* 17233 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* 987ae */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* ffd12 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 3263c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* 76c54 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* 2d223 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* e87c8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* 3ee0e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* bbf51 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 77bc6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_req_id") ?<Textleave_req_id   /* 3cec0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
