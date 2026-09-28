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
import Textdel_field_map_id  from "./Textdel_field_map_id";
import Textfield_map_id  from "./Textfield_map_id";
import Textdel_integration_source_text  from "./Textdel_integration_source_text";
import Textsource_name  from "./Textsource_name";
import Textsource_field_path_text  from "./Textsource_field_path_text";
import Textsource_field_path  from "./Textsource_field_path";
import Texttarge_tentity__text  from "./Texttarge_tentity__text";
import Texttarget_entity  from "./Texttarget_entity";
import Texttarget_attribute_txt  from "./Texttarget_attribute_txt";
import Texttarget_attribute  from "./Texttarget_attribute";
import Textis_active_txt  from "./Textis_active_txt";
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
      "del_field_map_id",
      "field_map_id",
      "del_integration_source_text",
      "source_name",
      "source_field_path_text",
      "source_field_path",
      "targe_tentity__text",
      "target_entity",
      "target_attribute_txt",
      "target_attribute",
      "is_active_txt",
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
  const {del_group0e789, setdel_group0e789}= useContext(TotalContext) as TotalContextProps;
  const {del_group0e789Props, setdel_group0e789Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc115c, setdelete_heading_txtc115c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_19e216, setdel_divider_19e216}= useContext(TotalContext) as TotalContextProps;
  const {del_field_map_id42f08, setdel_field_map_id42f08}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id7529d, setfield_map_id7529d}= useContext(TotalContext) as TotalContextProps;
  const {del_integration_source_text3544e, setdel_integration_source_text3544e}= useContext(TotalContext) as TotalContextProps;
  const {source_name6c577, setsource_name6c577}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path_textdb42b, setsource_field_path_textdb42b}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path92e47, setsource_field_path92e47}= useContext(TotalContext) as TotalContextProps;
  const {targe_tentity__text6b5d0, settarge_tentity__text6b5d0}= useContext(TotalContext) as TotalContextProps;
  const {target_entity6f0f5, settarget_entity6f0f5}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute_txtf878b, settarget_attribute_txtf878b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributedce21, settarget_attributedce21}= useContext(TotalContext) as TotalContextProps;
  const {is_active_txt7b746, setis_active_txt7b746}= useContext(TotalContext) as TotalContextProps;
  const {is_active9655f, setis_active9655f}= useContext(TotalContext) as TotalContextProps;
  const {textb50e5, settextb50e5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_231d84, setdel_divider_231d84}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn4ada6, setdel_cancel_btn4ada6}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnb2163, setdel_okl_btnb2163}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deleteintegrationfieldmap_v1, setdeleteintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:deleteIntegrationFieldMap:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f67b42decab0e7c44d9497474aa0e789");
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
    setdel_group0e789Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtc115c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtc115c?.isDisabled==null)
      {
        setdelete_heading_txtc115c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_19e216((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_19e216?.isDisabled==null)
      {
        setdel_divider_19e216((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_field_map_id")){
        setdel_field_map_id42f08((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_field_map_id42f08?.isDisabled==null)
      {
        setdel_field_map_id42f08((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("field_map_id")){
        setfield_map_id7529d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(field_map_id7529d?.isDisabled==null)
      {
        setfield_map_id7529d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_integration_source_text")){
        setdel_integration_source_text3544e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_integration_source_text3544e?.isDisabled==null)
      {
        setdel_integration_source_text3544e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_name")){
        setsource_name6c577((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_name6c577?.isDisabled==null)
      {
        setsource_name6c577((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_field_path_text")){
        setsource_field_path_textdb42b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_field_path_textdb42b?.isDisabled==null)
      {
        setsource_field_path_textdb42b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("source_field_path")){
        setsource_field_path92e47((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(source_field_path92e47?.isDisabled==null)
      {
        setsource_field_path92e47((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("targe_tentity__text")){
        settarge_tentity__text6b5d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(targe_tentity__text6b5d0?.isDisabled==null)
      {
        settarge_tentity__text6b5d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_entity")){
        settarget_entity6f0f5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_entity6f0f5?.isDisabled==null)
      {
        settarget_entity6f0f5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_attribute_txt")){
        settarget_attribute_txtf878b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_attribute_txtf878b?.isDisabled==null)
      {
        settarget_attribute_txtf878b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("target_attribute")){
        settarget_attributedce21((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(target_attributedce21?.isDisabled==null)
      {
        settarget_attributedce21((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active_txt")){
        setis_active_txt7b746((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active_txt7b746?.isDisabled==null)
      {
        setis_active_txt7b746((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active9655f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active9655f?.isDisabled==null)
      {
        setis_active9655f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextb50e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textb50e5?.isDisabled==null)
      {
        settextb50e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_231d84((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_231d84?.isDisabled==null)
      {
        setdel_divider_231d84((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn4ada6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn4ada6?.isDisabled==null)
      {
        setdel_cancel_btn4ada6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btnb2163((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btnb2163?.isDisabled==null)
      {
        setdel_okl_btnb2163((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group0e789,
        codeStates['setdel_group'] = setdel_group0e789,
        codeStates['del_group0e789'] = del_group0e789Props,
        codeStates['setdel_group0e789'] = setdel_group0e789Props,
        codeStates['delete_heading_txt'] = delete_heading_txtc115c,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc115c,
        codeStates['del_divider_1'] = del_divider_19e216,
        codeStates['setdel_divider_1'] = setdel_divider_19e216,
        codeStates['del_field_map_id'] = del_field_map_id42f08,
        codeStates['setdel_field_map_id'] = setdel_field_map_id42f08,
        codeStates['field_map_id'] = field_map_id7529d,
        codeStates['setfield_map_id'] = setfield_map_id7529d,
        codeStates['del_integration_source_text'] = del_integration_source_text3544e,
        codeStates['setdel_integration_source_text'] = setdel_integration_source_text3544e,
        codeStates['source_name'] = source_name6c577,
        codeStates['setsource_name'] = setsource_name6c577,
        codeStates['source_field_path_text'] = source_field_path_textdb42b,
        codeStates['setsource_field_path_text'] = setsource_field_path_textdb42b,
        codeStates['source_field_path'] = source_field_path92e47,
        codeStates['setsource_field_path'] = setsource_field_path92e47,
        codeStates['targe_tentity__text'] = targe_tentity__text6b5d0,
        codeStates['settarge_tentity__text'] = settarge_tentity__text6b5d0,
        codeStates['target_entity'] = target_entity6f0f5,
        codeStates['settarget_entity'] = settarget_entity6f0f5,
        codeStates['target_attribute_txt'] = target_attribute_txtf878b,
        codeStates['settarget_attribute_txt'] = settarget_attribute_txtf878b,
        codeStates['target_attribute'] = target_attributedce21,
        codeStates['settarget_attribute'] = settarget_attributedce21,
        codeStates['is_active_txt'] = is_active_txt7b746,
        codeStates['setis_active_txt'] = setis_active_txt7b746,
        codeStates['is_active'] = is_active9655f,
        codeStates['setis_active'] = setis_active9655f,
        codeStates['text'] = textb50e5,
        codeStates['settext'] = settextb50e5,
        codeStates['del_divider_2'] = del_divider_231d84,
        codeStates['setdel_divider_2'] = setdel_divider_231d84,
        codeStates['del_cancel_btn'] = del_cancel_btn4ada6,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn4ada6,
        codeStates['del_okl_btn'] = del_okl_btnb2163,
        codeStates['setdel_okl_btn'] = setdel_okl_btnb2163,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f67b42decab0e7c44d9497474aa0e789");
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
        codeStates['del_group'] = del_group0e789,
        codeStates['setdel_group'] = setdel_group0e789,
        codeStates['del_group0e789'] = del_group0e789Props,
        codeStates['setdel_group0e789'] = setdel_group0e789Props,
        codeStates['delete_heading_txt'] = delete_heading_txtc115c,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc115c,
        codeStates['del_divider_1'] = del_divider_19e216,
        codeStates['setdel_divider_1'] = setdel_divider_19e216,
        codeStates['del_field_map_id'] = del_field_map_id42f08,
        codeStates['setdel_field_map_id'] = setdel_field_map_id42f08,
        codeStates['field_map_id'] = field_map_id7529d,
        codeStates['setfield_map_id'] = setfield_map_id7529d,
        codeStates['del_integration_source_text'] = del_integration_source_text3544e,
        codeStates['setdel_integration_source_text'] = setdel_integration_source_text3544e,
        codeStates['source_name'] = source_name6c577,
        codeStates['setsource_name'] = setsource_name6c577,
        codeStates['source_field_path_text'] = source_field_path_textdb42b,
        codeStates['setsource_field_path_text'] = setsource_field_path_textdb42b,
        codeStates['source_field_path'] = source_field_path92e47,
        codeStates['setsource_field_path'] = setsource_field_path92e47,
        codeStates['targe_tentity__text'] = targe_tentity__text6b5d0,
        codeStates['settarge_tentity__text'] = settarge_tentity__text6b5d0,
        codeStates['target_entity'] = target_entity6f0f5,
        codeStates['settarget_entity'] = settarget_entity6f0f5,
        codeStates['target_attribute_txt'] = target_attribute_txtf878b,
        codeStates['settarget_attribute_txt'] = settarget_attribute_txtf878b,
        codeStates['target_attribute'] = target_attributedce21,
        codeStates['settarget_attribute'] = settarget_attributedce21,
        codeStates['is_active_txt'] = is_active_txt7b746,
        codeStates['setis_active_txt'] = setis_active_txt7b746,
        codeStates['is_active'] = is_active9655f,
        codeStates['setis_active'] = setis_active9655f,
        codeStates['text'] = textb50e5,
        codeStates['settext'] = settextb50e5,
        codeStates['del_divider_2'] = del_divider_231d84,
        codeStates['setdel_divider_2'] = setdel_divider_231d84,
        codeStates['del_cancel_btn'] = del_cancel_btn4ada6,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn4ada6,
        codeStates['del_okl_btn'] = del_okl_btnb2163,
        codeStates['setdel_okl_btn'] = setdel_okl_btnb2163,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group0e789Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group0e789Ref.current?.setSearchParams();
    del_group0e789Ref.current?.handleSearch({});
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
        !Array.isArray(del_group0e789) &&
        Object.keys(del_group0e789)?.length > 0
      ) {
        setdel_group0e789({})
      }
    } else prevRefreshRef.current = true
  }, [del_group0e789Props?.refresh])


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
        gridRow: '1 / 67',
      
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
          setdeleteintegrationfieldmap_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* c115c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 9e216 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_field_map_id") ?<Textdel_field_map_id   /* 42f08 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("field_map_id") ?<Textfield_map_id   /* 7529d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("del_integration_source_text") ?<Textdel_integration_source_text   /* 3544e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_name") ?<Textsource_name   /* 6c577 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_field_path_text") ?<Textsource_field_path_text   /* db42b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("source_field_path") ?<Textsource_field_path   /* 92e47 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("targe_tentity__text") ?<Texttarge_tentity__text   /* 6b5d0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("target_entity") ?<Texttarget_entity   /* 6f0f5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("target_attribute_txt") ?<Texttarget_attribute_txt   /* f878b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("target_attribute") ?<Texttarget_attribute   /* dce21 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active_txt") ?<Textis_active_txt   /* 7b746 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("is_active") ?<Textis_active   /* 9655f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* b50e5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 31d84 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
