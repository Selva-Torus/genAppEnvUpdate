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
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textmodel_name_text  from "./Textmodel_name_text";
import Textmodel_name  from "./Textmodel_name";
import Textmodel_version_text  from "./Textmodel_version_text";
import Textmodel_version  from "./Textmodel_version";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textasset_model_id  from "./Textasset_model_id";
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
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
      "asset_name_text",
      "asset_name",
      "model_name_text",
      "model_name",
      "model_version_text",
      "model_version",
      "text",
      "del_divider_2",
      "asset_model_id",
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
  const {del_group073d4, setdel_group073d4}= useContext(TotalContext) as TotalContextProps;
  const {del_group073d4Props, setdel_group073d4Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc584e, setdelete_heading_txtc584e}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_114f19, setdel_divider_114f19}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text3b7d3, setasset_name_text3b7d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_name58385, setasset_name58385}= useContext(TotalContext) as TotalContextProps;
  const {model_name_textb06fd, setmodel_name_textb06fd}= useContext(TotalContext) as TotalContextProps;
  const {model_namec6433, setmodel_namec6433}= useContext(TotalContext) as TotalContextProps;
  const {model_version_textb815a, setmodel_version_textb815a}= useContext(TotalContext) as TotalContextProps;
  const {model_version6f6be, setmodel_version6f6be}= useContext(TotalContext) as TotalContextProps;
  const {text515f0, settext515f0}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_204d02, setdel_divider_204d02}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id844e1, setasset_model_id844e1}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn6fc66, setdel_cancel_btn6fc66}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn1f59f, setdel_okl_btn1f59f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {modeldelete_v1, setmodeldelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:modelDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2bd9476607b010fbd28dbbf21f6073d4");
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
    setdel_group073d4Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txtc584e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txtc584e?.isDisabled==null)
      {
        setdelete_heading_txtc584e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_114f19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_114f19?.isDisabled==null)
      {
        setdel_divider_114f19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text3b7d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text3b7d3?.isDisabled==null)
      {
        setasset_name_text3b7d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name58385((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name58385?.isDisabled==null)
      {
        setasset_name58385((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_name_text")){
        setmodel_name_textb06fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_name_textb06fd?.isDisabled==null)
      {
        setmodel_name_textb06fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_name")){
        setmodel_namec6433((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_namec6433?.isDisabled==null)
      {
        setmodel_namec6433((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_version_text")){
        setmodel_version_textb815a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_version_textb815a?.isDisabled==null)
      {
        setmodel_version_textb815a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("model_version")){
        setmodel_version6f6be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(model_version6f6be?.isDisabled==null)
      {
        setmodel_version6f6be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext515f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text515f0?.isDisabled==null)
      {
        settext515f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_204d02((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_204d02?.isDisabled==null)
      {
        setdel_divider_204d02((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_model_id")){
        setasset_model_id844e1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_model_id844e1?.isDisabled==null)
      {
        setasset_model_id844e1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btn6fc66((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btn6fc66?.isDisabled==null)
      {
        setdel_cancel_btn6fc66((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn1f59f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn1f59f?.isDisabled==null)
      {
        setdel_okl_btn1f59f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group073d4,
        codeStates['setdel_group'] = setdel_group073d4,
        codeStates['del_group073d4'] = del_group073d4Props,
        codeStates['setdel_group073d4'] = setdel_group073d4Props,
        codeStates['delete_heading_txt'] = delete_heading_txtc584e,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc584e,
        codeStates['del_divider_1'] = del_divider_114f19,
        codeStates['setdel_divider_1'] = setdel_divider_114f19,
        codeStates['asset_name_text'] = asset_name_text3b7d3,
        codeStates['setasset_name_text'] = setasset_name_text3b7d3,
        codeStates['asset_name'] = asset_name58385,
        codeStates['setasset_name'] = setasset_name58385,
        codeStates['model_name_text'] = model_name_textb06fd,
        codeStates['setmodel_name_text'] = setmodel_name_textb06fd,
        codeStates['model_name'] = model_namec6433,
        codeStates['setmodel_name'] = setmodel_namec6433,
        codeStates['model_version_text'] = model_version_textb815a,
        codeStates['setmodel_version_text'] = setmodel_version_textb815a,
        codeStates['model_version'] = model_version6f6be,
        codeStates['setmodel_version'] = setmodel_version6f6be,
        codeStates['text'] = text515f0,
        codeStates['settext'] = settext515f0,
        codeStates['del_divider_2'] = del_divider_204d02,
        codeStates['setdel_divider_2'] = setdel_divider_204d02,
        codeStates['asset_model_id'] = asset_model_id844e1,
        codeStates['setasset_model_id'] = setasset_model_id844e1,
        codeStates['del_cancel_btn'] = del_cancel_btn6fc66,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn6fc66,
        codeStates['del_okl_btn'] = del_okl_btn1f59f,
        codeStates['setdel_okl_btn'] = setdel_okl_btn1f59f,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2bd9476607b010fbd28dbbf21f6073d4");
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
        codeStates['del_group'] = del_group073d4,
        codeStates['setdel_group'] = setdel_group073d4,
        codeStates['del_group073d4'] = del_group073d4Props,
        codeStates['setdel_group073d4'] = setdel_group073d4Props,
        codeStates['delete_heading_txt'] = delete_heading_txtc584e,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc584e,
        codeStates['del_divider_1'] = del_divider_114f19,
        codeStates['setdel_divider_1'] = setdel_divider_114f19,
        codeStates['asset_name_text'] = asset_name_text3b7d3,
        codeStates['setasset_name_text'] = setasset_name_text3b7d3,
        codeStates['asset_name'] = asset_name58385,
        codeStates['setasset_name'] = setasset_name58385,
        codeStates['model_name_text'] = model_name_textb06fd,
        codeStates['setmodel_name_text'] = setmodel_name_textb06fd,
        codeStates['model_name'] = model_namec6433,
        codeStates['setmodel_name'] = setmodel_namec6433,
        codeStates['model_version_text'] = model_version_textb815a,
        codeStates['setmodel_version_text'] = setmodel_version_textb815a,
        codeStates['model_version'] = model_version6f6be,
        codeStates['setmodel_version'] = setmodel_version6f6be,
        codeStates['text'] = text515f0,
        codeStates['settext'] = settext515f0,
        codeStates['del_divider_2'] = del_divider_204d02,
        codeStates['setdel_divider_2'] = setdel_divider_204d02,
        codeStates['asset_model_id'] = asset_model_id844e1,
        codeStates['setasset_model_id'] = setasset_model_id844e1,
        codeStates['del_cancel_btn'] = del_cancel_btn6fc66,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn6fc66,
        codeStates['del_okl_btn'] = del_okl_btn1f59f,
        codeStates['setdel_okl_btn'] = setdel_okl_btn1f59f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group073d4Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group073d4Ref.current?.setSearchParams();
    del_group073d4Ref.current?.handleSearch({});
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
        !Array.isArray(del_group073d4) &&
        Object.keys(del_group073d4)?.length > 0
      ) {
        setdel_group073d4({})
      }
    } else prevRefreshRef.current = true
  }, [del_group073d4Props?.refresh])


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
        gridRow: '1 / 50',
      
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
          setmodeldelete_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* c584e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 14f19 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 3b7d3 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 58385 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("model_name_text") ?<Textmodel_name_text   /* b06fd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("model_name") ?<Textmodel_name   /* c6433 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("model_version_text") ?<Textmodel_version_text   /* b815a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("model_version") ?<Textmodel_version   /* 6f6be */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 515f0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 04d02 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_model_id") ?<Textasset_model_id   /* 844e1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
