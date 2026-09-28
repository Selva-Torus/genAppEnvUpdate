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
import Textdelete_heading_txt  from "./Textdelete_heading_txt";
import Dividerdel_divider_1  from "./Dividerdel_divider_1";
import Textdel_code_value_id_text  from "./Textdel_code_value_id_text";
import Textcode_value_id  from "./Textcode_value_id";
import Textcode_text  from "./Textcode_text";
import Textcode  from "./Textcode";
import Textdisplay_name_text  from "./Textdisplay_name_text";
import Textdisplay_name  from "./Textdisplay_name";
import Textdescription_text  from "./Textdescription_text";
import Textdescription  from "./Textdescription";
import Textstatus_text  from "./Textstatus_text";
import Textis_active  from "./Textis_active";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Buttondel_cancel_btn  from "./Buttondel_cancel_btn";
import Buttondel_okl_btn  from "./Buttondel_okl_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdel_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "DEV_AT": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "delete_heading_txt",
      "del_divider_1",
      "del_code_value_id_text",
      "code_value_id",
      "code_text",
      "code",
      "display_name_text",
      "display_name",
      "description_text",
      "description",
      "status_text",
      "is_active",
      "text",
      "del_divider_2",
      "del_cancel_btn",
      "del_okl_btn"
    ],
    "allowedGroups": [
      "canvas",
      "del_group"
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
  const {del_group81804, setdel_group81804}= useContext(TotalContext) as TotalContextProps;
  const {del_group81804Props, setdel_group81804Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt0ed43, setdelete_heading_txt0ed43}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_10a88e, setdel_divider_10a88e}= useContext(TotalContext) as TotalContextProps;
  const {del_code_value_id_text78165, setdel_code_value_id_text78165}= useContext(TotalContext) as TotalContextProps;
  const {code_value_id92302, setcode_value_id92302}= useContext(TotalContext) as TotalContextProps;
  const {code_textee61f, setcode_textee61f}= useContext(TotalContext) as TotalContextProps;
  const {code95034, setcode95034}= useContext(TotalContext) as TotalContextProps;
  const {display_name_text27447, setdisplay_name_text27447}= useContext(TotalContext) as TotalContextProps;
  const {display_name8365e, setdisplay_name8365e}= useContext(TotalContext) as TotalContextProps;
  const {description_text492cc, setdescription_text492cc}= useContext(TotalContext) as TotalContextProps;
  const {descriptionabf40, setdescriptionabf40}= useContext(TotalContext) as TotalContextProps;
  const {status_text4b485, setstatus_text4b485}= useContext(TotalContext) as TotalContextProps;
  const {is_active80b66, setis_active80b66}= useContext(TotalContext) as TotalContextProps;
  const {text5fad6, settext5fad6}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eb63b, setdel_divider_2eb63b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnb85db, setdel_cancel_btnb85db}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn7369c, setdel_okl_btn7369c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletecodevalue_v1, setdeletecodevalue_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteCodeValue:AFVK:v1',
    [user],
    'GroupDelGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "77b6ff2206c342dbbc8d20421cf81804");
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
    setdel_group81804Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt0ed43((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt0ed43?.isDisabled==null)
      {
        setdelete_heading_txt0ed43((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_10a88e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_10a88e?.isDisabled==null)
      {
        setdel_divider_10a88e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_code_value_id_text")){
        setdel_code_value_id_text78165((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_code_value_id_text78165?.isDisabled==null)
      {
        setdel_code_value_id_text78165((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_value_id")){
        setcode_value_id92302((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_value_id92302?.isDisabled==null)
      {
        setcode_value_id92302((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_text")){
        setcode_textee61f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_textee61f?.isDisabled==null)
      {
        setcode_textee61f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code")){
        setcode95034((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code95034?.isDisabled==null)
      {
        setcode95034((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("display_name_text")){
        setdisplay_name_text27447((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(display_name_text27447?.isDisabled==null)
      {
        setdisplay_name_text27447((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("display_name")){
        setdisplay_name8365e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(display_name8365e?.isDisabled==null)
      {
        setdisplay_name8365e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description_text")){
        setdescription_text492cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description_text492cc?.isDisabled==null)
      {
        setdescription_text492cc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescriptionabf40((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(descriptionabf40?.isDisabled==null)
      {
        setdescriptionabf40((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status_text")){
        setstatus_text4b485((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(status_text4b485?.isDisabled==null)
      {
        setstatus_text4b485((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active80b66((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active80b66?.isDisabled==null)
      {
        setis_active80b66((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext5fad6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text5fad6?.isDisabled==null)
      {
        settext5fad6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_2eb63b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_2eb63b?.isDisabled==null)
      {
        setdel_divider_2eb63b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btnb85db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btnb85db?.isDisabled==null)
      {
        setdel_cancel_btnb85db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn7369c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn7369c?.isDisabled==null)
      {
        setdel_okl_btn7369c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group81804,
        codeStates['setdel_group'] = setdel_group81804,
        codeStates['del_group81804'] = del_group81804Props,
        codeStates['setdel_group81804'] = setdel_group81804Props,
        codeStates['delete_heading_txt'] = delete_heading_txt0ed43,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt0ed43,
        codeStates['del_divider_1'] = del_divider_10a88e,
        codeStates['setdel_divider_1'] = setdel_divider_10a88e,
        codeStates['del_code_value_id_text'] = del_code_value_id_text78165,
        codeStates['setdel_code_value_id_text'] = setdel_code_value_id_text78165,
        codeStates['code_value_id'] = code_value_id92302,
        codeStates['setcode_value_id'] = setcode_value_id92302,
        codeStates['code_text'] = code_textee61f,
        codeStates['setcode_text'] = setcode_textee61f,
        codeStates['code'] = code95034,
        codeStates['setcode'] = setcode95034,
        codeStates['display_name_text'] = display_name_text27447,
        codeStates['setdisplay_name_text'] = setdisplay_name_text27447,
        codeStates['display_name'] = display_name8365e,
        codeStates['setdisplay_name'] = setdisplay_name8365e,
        codeStates['description_text'] = description_text492cc,
        codeStates['setdescription_text'] = setdescription_text492cc,
        codeStates['description'] = descriptionabf40,
        codeStates['setdescription'] = setdescriptionabf40,
        codeStates['status_text'] = status_text4b485,
        codeStates['setstatus_text'] = setstatus_text4b485,
        codeStates['is_active'] = is_active80b66,
        codeStates['setis_active'] = setis_active80b66,
        codeStates['text'] = text5fad6,
        codeStates['settext'] = settext5fad6,
        codeStates['del_divider_2'] = del_divider_2eb63b,
        codeStates['setdel_divider_2'] = setdel_divider_2eb63b,
        codeStates['del_cancel_btn'] = del_cancel_btnb85db,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnb85db,
        codeStates['del_okl_btn'] = del_okl_btn7369c,
        codeStates['setdel_okl_btn'] = setdel_okl_btn7369c,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "77b6ff2206c342dbbc8d20421cf81804");
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
        codeStates['del_group'] = del_group81804,
        codeStates['setdel_group'] = setdel_group81804,
        codeStates['del_group81804'] = del_group81804Props,
        codeStates['setdel_group81804'] = setdel_group81804Props,
        codeStates['delete_heading_txt'] = delete_heading_txt0ed43,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt0ed43,
        codeStates['del_divider_1'] = del_divider_10a88e,
        codeStates['setdel_divider_1'] = setdel_divider_10a88e,
        codeStates['del_code_value_id_text'] = del_code_value_id_text78165,
        codeStates['setdel_code_value_id_text'] = setdel_code_value_id_text78165,
        codeStates['code_value_id'] = code_value_id92302,
        codeStates['setcode_value_id'] = setcode_value_id92302,
        codeStates['code_text'] = code_textee61f,
        codeStates['setcode_text'] = setcode_textee61f,
        codeStates['code'] = code95034,
        codeStates['setcode'] = setcode95034,
        codeStates['display_name_text'] = display_name_text27447,
        codeStates['setdisplay_name_text'] = setdisplay_name_text27447,
        codeStates['display_name'] = display_name8365e,
        codeStates['setdisplay_name'] = setdisplay_name8365e,
        codeStates['description_text'] = description_text492cc,
        codeStates['setdescription_text'] = setdescription_text492cc,
        codeStates['description'] = descriptionabf40,
        codeStates['setdescription'] = setdescriptionabf40,
        codeStates['status_text'] = status_text4b485,
        codeStates['setstatus_text'] = setstatus_text4b485,
        codeStates['is_active'] = is_active80b66,
        codeStates['setis_active'] = setis_active80b66,
        codeStates['text'] = text5fad6,
        codeStates['settext'] = settext5fad6,
        codeStates['del_divider_2'] = del_divider_2eb63b,
        codeStates['setdel_divider_2'] = setdel_divider_2eb63b,
        codeStates['del_cancel_btn'] = del_cancel_btnb85db,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnb85db,
        codeStates['del_okl_btn'] = del_okl_btn7369c,
        codeStates['setdel_okl_btn'] = setdel_okl_btn7369c,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group81804Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group81804Ref.current?.setSearchParams();
    del_group81804Ref.current?.handleSearch({});
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
        !Array.isArray(del_group81804) &&
        Object.keys(del_group81804)?.length > 0
      ) {
        setdel_group81804({})
      }
    } else prevRefreshRef.current = true
  }, [del_group81804Props?.refresh])


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
        gridRow: '1 / 62',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
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
          setdeletecodevalue_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 0ed43 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 0a88e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_code_value_id_text") ?<Textdel_code_value_id_text   /* 78165 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("code_value_id") ?<Textcode_value_id   /* 92302 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("code_text") ?<Textcode_text   /* ee61f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("code") ?<Textcode   /* 95034 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("display_name_text") ?<Textdisplay_name_text   /* 27447 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("display_name") ?<Textdisplay_name   /* 8365e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("description_text") ?<Textdescription_text   /* 492cc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("description") ?<Textdescription   /* abf40 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("status_text") ?<Textstatus_text   /* 4b485 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 80b66 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 5fad6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* eb63b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
