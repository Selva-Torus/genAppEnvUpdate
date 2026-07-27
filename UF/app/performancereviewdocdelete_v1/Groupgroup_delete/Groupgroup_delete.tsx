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
import Textreview_id  from "./Textreview_id";
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
  const {dfd_performancereviewdoctable_v1Props, setdfd_performancereviewdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
      "review_id",
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
  const {group_delete4384f, setgroup_delete4384f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete4384fProps, setgroup_delete4384fProps}= useContext(TotalContext) as TotalContextProps;
  const {divider_topd6bd8, setdivider_topd6bd8}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text314e9, setdelete_heading_text314e9}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id_txta253e, setattachment_id_txta253e}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id0a460, setattachment_id0a460}= useContext(TotalContext) as TotalContextProps;
  const {doc_group_text2ee44, setdoc_group_text2ee44}= useContext(TotalContext) as TotalContextProps;
  const {doc_group35e3d, setdoc_group35e3d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name_textc0cad, setdoc_name_textc0cad}= useContext(TotalContext) as TotalContextProps;
  const {doc_namebd198, setdoc_namebd198}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by_text0bbf6, settrs_created_by_text0bbf6}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_bya3008, settrs_created_bya3008}= useContext(TotalContext) as TotalContextProps;
  const {confo_textdfcf2, setconfo_textdfcf2}= useContext(TotalContext) as TotalContextProps;
  const {divider98807, setdivider98807}= useContext(TotalContext) as TotalContextProps;
  const {review_idd53ee, setreview_idd53ee}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonfc045, setcancel_buttonfc045}= useContext(TotalContext) as TotalContextProps;
  const {ok_button03deb, setok_button03deb}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancereviewdocdelete_v1, setperformancereviewdocdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReviewDocDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d5583e9a87a5b88918cf8b5fa7d4384f");
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
    setgroup_delete4384fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("divider_top")){
        setdivider_topd6bd8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider_topd6bd8?.isDisabled==null)
      {
        setdivider_topd6bd8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text314e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_heading_text314e9?.isDisabled==null)
      {
        setdelete_heading_text314e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id_txt")){
        setattachment_id_txta253e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id_txta253e?.isDisabled==null)
      {
        setattachment_id_txta253e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attachment_id")){
        setattachment_id0a460((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attachment_id0a460?.isDisabled==null)
      {
        setattachment_id0a460((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group_text")){
        setdoc_group_text2ee44((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group_text2ee44?.isDisabled==null)
      {
        setdoc_group_text2ee44((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_group")){
        setdoc_group35e3d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_group35e3d?.isDisabled==null)
      {
        setdoc_group35e3d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name_text")){
        setdoc_name_textc0cad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_name_textc0cad?.isDisabled==null)
      {
        setdoc_name_textc0cad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("doc_name")){
        setdoc_namebd198((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(doc_namebd198?.isDisabled==null)
      {
        setdoc_namebd198((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by_text")){
        settrs_created_by_text0bbf6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_by_text0bbf6?.isDisabled==null)
      {
        settrs_created_by_text0bbf6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("trs_created_by")){
        settrs_created_bya3008((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(trs_created_bya3008?.isDisabled==null)
      {
        settrs_created_bya3008((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textdfcf2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(confo_textdfcf2?.isDisabled==null)
      {
        setconfo_textdfcf2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("divider")){
        setdivider98807((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(divider98807?.isDisabled==null)
      {
        setdivider98807((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_id")){
        setreview_idd53ee((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_idd53ee?.isDisabled==null)
      {
        setreview_idd53ee((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_buttonfc045((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancel_buttonfc045?.isDisabled==null)
      {
        setcancel_buttonfc045((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button03deb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(ok_button03deb?.isDisabled==null)
      {
        setok_button03deb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete4384f,
        codeStates['setgroup_delete'] = setgroup_delete4384f,
        codeStates['group_delete4384f'] = group_delete4384fProps,
        codeStates['setgroup_delete4384f'] = setgroup_delete4384fProps,
        codeStates['divider_top'] = divider_topd6bd8,
        codeStates['setdivider_top'] = setdivider_topd6bd8,
        codeStates['delete_heading_text'] = delete_heading_text314e9,
        codeStates['setdelete_heading_text'] = setdelete_heading_text314e9,
        codeStates['attachment_id_txt'] = attachment_id_txta253e,
        codeStates['setattachment_id_txt'] = setattachment_id_txta253e,
        codeStates['attachment_id'] = attachment_id0a460,
        codeStates['setattachment_id'] = setattachment_id0a460,
        codeStates['doc_group_text'] = doc_group_text2ee44,
        codeStates['setdoc_group_text'] = setdoc_group_text2ee44,
        codeStates['doc_group'] = doc_group35e3d,
        codeStates['setdoc_group'] = setdoc_group35e3d,
        codeStates['doc_name_text'] = doc_name_textc0cad,
        codeStates['setdoc_name_text'] = setdoc_name_textc0cad,
        codeStates['doc_name'] = doc_namebd198,
        codeStates['setdoc_name'] = setdoc_namebd198,
        codeStates['trs_created_by_text'] = trs_created_by_text0bbf6,
        codeStates['settrs_created_by_text'] = settrs_created_by_text0bbf6,
        codeStates['trs_created_by'] = trs_created_bya3008,
        codeStates['settrs_created_by'] = settrs_created_bya3008,
        codeStates['confo_text'] = confo_textdfcf2,
        codeStates['setconfo_text'] = setconfo_textdfcf2,
        codeStates['divider'] = divider98807,
        codeStates['setdivider'] = setdivider98807,
        codeStates['review_id'] = review_idd53ee,
        codeStates['setreview_id'] = setreview_idd53ee,
        codeStates['cancel_button'] = cancel_buttonfc045,
        codeStates['setcancel_button'] = setcancel_buttonfc045,
        codeStates['ok_button'] = ok_button03deb,
        codeStates['setok_button'] = setok_button03deb,

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
        codeStates['group_delete'] = group_delete4384f,
        codeStates['setgroup_delete'] = setgroup_delete4384f,
        codeStates['group_delete4384f'] = group_delete4384fProps,
        codeStates['setgroup_delete4384f'] = setgroup_delete4384fProps,
        codeStates['divider_top'] = divider_topd6bd8,
        codeStates['setdivider_top'] = setdivider_topd6bd8,
        codeStates['delete_heading_text'] = delete_heading_text314e9,
        codeStates['setdelete_heading_text'] = setdelete_heading_text314e9,
        codeStates['attachment_id_txt'] = attachment_id_txta253e,
        codeStates['setattachment_id_txt'] = setattachment_id_txta253e,
        codeStates['attachment_id'] = attachment_id0a460,
        codeStates['setattachment_id'] = setattachment_id0a460,
        codeStates['doc_group_text'] = doc_group_text2ee44,
        codeStates['setdoc_group_text'] = setdoc_group_text2ee44,
        codeStates['doc_group'] = doc_group35e3d,
        codeStates['setdoc_group'] = setdoc_group35e3d,
        codeStates['doc_name_text'] = doc_name_textc0cad,
        codeStates['setdoc_name_text'] = setdoc_name_textc0cad,
        codeStates['doc_name'] = doc_namebd198,
        codeStates['setdoc_name'] = setdoc_namebd198,
        codeStates['trs_created_by_text'] = trs_created_by_text0bbf6,
        codeStates['settrs_created_by_text'] = settrs_created_by_text0bbf6,
        codeStates['trs_created_by'] = trs_created_bya3008,
        codeStates['settrs_created_by'] = settrs_created_bya3008,
        codeStates['confo_text'] = confo_textdfcf2,
        codeStates['setconfo_text'] = setconfo_textdfcf2,
        codeStates['divider'] = divider98807,
        codeStates['setdivider'] = setdivider98807,
        codeStates['review_id'] = review_idd53ee,
        codeStates['setreview_id'] = setreview_idd53ee,
        codeStates['cancel_button'] = cancel_buttonfc045,
        codeStates['setcancel_button'] = setcancel_buttonfc045,
        codeStates['ok_button'] = ok_button03deb,
        codeStates['setok_button'] = setok_button03deb,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete4384fRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete4384fRef.current?.setSearchParams();
    group_delete4384fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete4384f) && Object.keys(group_delete4384f)?.length>0)
      {
        setgroup_delete4384f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete4384fProps?.refresh,token])


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
          setperformancereviewdocdelete_v1((pre:any)=>({...pre,_selectedGroup_:"group_delete"}))
        }}
    >
        {allowedControls.includes("divider_top") ?<Dividerdivider_top   /* d6bd8 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 314e9 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id_txt") ?<Textattachment_id_txt   /* a253e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("attachment_id") ?<Textattachment_id   /* 0a460 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group_text") ?<Textdoc_group_text   /* 2ee44 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_group") ?<Textdoc_group   /* 35e3d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name_text") ?<Textdoc_name_text   /* c0cad */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("doc_name") ?<Textdoc_name   /* bd198 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by_text") ?<Texttrs_created_by_text   /* 0bbf6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("trs_created_by") ?<Texttrs_created_by   /* a3008 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* dfcf2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("divider") ?<Dividerdivider   /* 98807 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_id") ?<Textreview_id   /* d53ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
