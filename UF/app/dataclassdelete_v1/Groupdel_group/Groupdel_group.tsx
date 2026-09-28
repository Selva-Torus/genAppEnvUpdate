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
import Textdata_class_code_text  from "./Textdata_class_code_text";
import Textdata_class_code  from "./Textdata_class_code";
import Texttext  from "./Texttext";
import Dividerdel_divider_2  from "./Dividerdel_divider_2";
import Textasset_data_class_id  from "./Textasset_data_class_id";
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
  const {dfd_dataclasslist_v1Props, setdfd_dataclasslist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
      "data_class_code_text",
      "data_class_code",
      "text",
      "del_divider_2",
      "asset_data_class_id",
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
  const {del_group7e857, setdel_group7e857}= useContext(TotalContext) as TotalContextProps;
  const {del_group7e857Props, setdel_group7e857Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt4a602, setdelete_heading_txt4a602}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_17957b, setdel_divider_17957b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7377f, setasset_name_text7377f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58e, setasset_nameae58e}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code_text87efb, setdata_class_code_text87efb}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codee6763, setdata_class_codee6763}= useContext(TotalContext) as TotalContextProps;
  const {text3364f, settext3364f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2725fd, setdel_divider_2725fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60, setasset_data_class_id9ae60}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnd5bbd, setdel_cancel_btnd5bbd}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn25863, setdel_okl_btn25863}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {dataclassdelete_v1, setdataclassdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dataClassDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dcc3aa8f1ec9217ad784fd6b7b07e857");
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
    setdel_group7e857Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_txt")){
        setdelete_heading_txt4a602((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(delete_heading_txt4a602?.isDisabled==null)
      {
        setdelete_heading_txt4a602((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_1")){
        setdel_divider_17957b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_17957b?.isDisabled==null)
      {
        setdel_divider_17957b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text7377f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name_text7377f?.isDisabled==null)
      {
        setasset_name_text7377f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_nameae58e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_nameae58e?.isDisabled==null)
      {
        setasset_nameae58e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_class_code_text")){
        setdata_class_code_text87efb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(data_class_code_text87efb?.isDisabled==null)
      {
        setdata_class_code_text87efb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("data_class_code")){
        setdata_class_codee6763((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(data_class_codee6763?.isDisabled==null)
      {
        setdata_class_codee6763((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext3364f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text3364f?.isDisabled==null)
      {
        settext3364f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_divider_2")){
        setdel_divider_2725fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_divider_2725fd?.isDisabled==null)
      {
        setdel_divider_2725fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_data_class_id")){
        setasset_data_class_id9ae60((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_data_class_id9ae60?.isDisabled==null)
      {
        setasset_data_class_id9ae60((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_cancel_btn")){
        setdel_cancel_btnd5bbd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_cancel_btnd5bbd?.isDisabled==null)
      {
        setdel_cancel_btnd5bbd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("del_okl_btn")){
        setdel_okl_btn25863((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(del_okl_btn25863?.isDisabled==null)
      {
        setdel_okl_btn25863((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['del_group'] = del_group7e857,
        codeStates['setdel_group'] = setdel_group7e857,
        codeStates['del_group7e857'] = del_group7e857Props,
        codeStates['setdel_group7e857'] = setdel_group7e857Props,
        codeStates['delete_heading_txt'] = delete_heading_txt4a602,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt4a602,
        codeStates['del_divider_1'] = del_divider_17957b,
        codeStates['setdel_divider_1'] = setdel_divider_17957b,
        codeStates['asset_name_text'] = asset_name_text7377f,
        codeStates['setasset_name_text'] = setasset_name_text7377f,
        codeStates['asset_name'] = asset_nameae58e,
        codeStates['setasset_name'] = setasset_nameae58e,
        codeStates['data_class_code_text'] = data_class_code_text87efb,
        codeStates['setdata_class_code_text'] = setdata_class_code_text87efb,
        codeStates['data_class_code'] = data_class_codee6763,
        codeStates['setdata_class_code'] = setdata_class_codee6763,
        codeStates['text'] = text3364f,
        codeStates['settext'] = settext3364f,
        codeStates['del_divider_2'] = del_divider_2725fd,
        codeStates['setdel_divider_2'] = setdel_divider_2725fd,
        codeStates['asset_data_class_id'] = asset_data_class_id9ae60,
        codeStates['setasset_data_class_id'] = setasset_data_class_id9ae60,
        codeStates['del_cancel_btn'] = del_cancel_btnd5bbd,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnd5bbd,
        codeStates['del_okl_btn'] = del_okl_btn25863,
        codeStates['setdel_okl_btn'] = setdel_okl_btn25863,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "dcc3aa8f1ec9217ad784fd6b7b07e857");
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
        codeStates['del_group'] = del_group7e857,
        codeStates['setdel_group'] = setdel_group7e857,
        codeStates['del_group7e857'] = del_group7e857Props,
        codeStates['setdel_group7e857'] = setdel_group7e857Props,
        codeStates['delete_heading_txt'] = delete_heading_txt4a602,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt4a602,
        codeStates['del_divider_1'] = del_divider_17957b,
        codeStates['setdel_divider_1'] = setdel_divider_17957b,
        codeStates['asset_name_text'] = asset_name_text7377f,
        codeStates['setasset_name_text'] = setasset_name_text7377f,
        codeStates['asset_name'] = asset_nameae58e,
        codeStates['setasset_name'] = setasset_nameae58e,
        codeStates['data_class_code_text'] = data_class_code_text87efb,
        codeStates['setdata_class_code_text'] = setdata_class_code_text87efb,
        codeStates['data_class_code'] = data_class_codee6763,
        codeStates['setdata_class_code'] = setdata_class_codee6763,
        codeStates['text'] = text3364f,
        codeStates['settext'] = settext3364f,
        codeStates['del_divider_2'] = del_divider_2725fd,
        codeStates['setdel_divider_2'] = setdel_divider_2725fd,
        codeStates['asset_data_class_id'] = asset_data_class_id9ae60,
        codeStates['setasset_data_class_id'] = setasset_data_class_id9ae60,
        codeStates['del_cancel_btn'] = del_cancel_btnd5bbd,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnd5bbd,
        codeStates['del_okl_btn'] = del_okl_btn25863,
        codeStates['setdel_okl_btn'] = setdel_okl_btn25863,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const del_group7e857Ref = useRef<any>(null);
  const handleClearSearch = () => {
    del_group7e857Ref.current?.setSearchParams();
    del_group7e857Ref.current?.handleSearch({});
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
        !Array.isArray(del_group7e857) &&
        Object.keys(del_group7e857)?.length > 0
      ) {
        setdel_group7e857({})
      }
    } else prevRefreshRef.current = true
  }, [del_group7e857Props?.refresh])


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
        gridRow: '1 / 44',
      
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
          setdataclassdelete_v1((pre:any)=>({...pre,_selectedGroup_:"del_group"}))
        }}
    >
          {allowedControls.includes("delete_heading_txt") ?<Textdelete_heading_txt   /* 4a602 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_1") ?<Dividerdel_divider_1   /* 7957b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 7377f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* ae58e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("data_class_code_text") ?<Textdata_class_code_text   /* 87efb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("data_class_code") ?<Textdata_class_code   /* e6763 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 3364f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("del_divider_2") ?<Dividerdel_divider_2   /* 725fd */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_data_class_id") ?<Textasset_data_class_id   /* 9ae60 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "del_cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_cancel_btn"]:true) && 
          allowedControls.includes("del_cancel_btn")  ?            <Buttondel_cancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "del_okl_btn" in ButtonGoRuleData)?ButtonGoRuleData["del_okl_btn"]:true) && 
          allowedControls.includes("del_okl_btn")  ?            <Buttondel_okl_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdel_group
