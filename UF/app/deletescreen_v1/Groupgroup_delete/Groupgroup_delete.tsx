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
import Textasset_name_text  from "./Textasset_name_text";
import Textasset_name  from "./Textasset_name";
import Textasset_tag_text  from "./Textasset_tag_text";
import Textasset_tag  from "./Textasset_tag";
import Textcategory_name_text  from "./Textcategory_name_text";
import Textcategory_name  from "./Textcategory_name";
import Textasset_type_text  from "./Textasset_type_text";
import Textasset_type  from "./Textasset_type";
import Textlocation_text  from "./Textlocation_text";
import Textlocation  from "./Textlocation";
import Textconfo_text  from "./Textconfo_text";
import Buttoncancel_button  from "./Buttoncancel_button";
import Buttonok_button  from "./Buttonok_button";
import Textasset_id  from "./Textasset_id";
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
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "asset_name_text",
      "asset_name",
      "asset_tag_text",
      "asset_tag",
      "category_name_text",
      "category_name",
      "asset_type_text",
      "asset_type",
      "location_text",
      "location",
      "confo_text",
      "cancel_button",
      "ok_button",
      "asset_id"
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
      "asset_name_text",
      "asset_name",
      "asset_tag_text",
      "asset_tag",
      "category_name_text",
      "category_name",
      "asset_type_text",
      "asset_type",
      "location_text",
      "location",
      "confo_text",
      "cancel_button",
      "ok_button",
      "asset_id"
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
  const {group_delete3c02f, setgroup_delete3c02f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c02fProps, setgroup_delete3c02fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text766e5, setdelete_heading_text766e5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text2a279, setasset_name_text2a279}= useContext(TotalContext) as TotalContextProps;
  const {asset_named7764, setasset_named7764}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag_text6db8e, setasset_tag_text6db8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag5b0ef, setasset_tag5b0ef}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text6b1b6, setcategory_name_text6b1b6}= useContext(TotalContext) as TotalContextProps;
  const {category_nameb3bdb, setcategory_nameb3bdb}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_textbf4bc, setasset_type_textbf4bc}= useContext(TotalContext) as TotalContextProps;
  const {asset_typebe078, setasset_typebe078}= useContext(TotalContext) as TotalContextProps;
  const {location_text55088, setlocation_text55088}= useContext(TotalContext) as TotalContextProps;
  const {location0b4e4, setlocation0b4e4}= useContext(TotalContext) as TotalContextProps;
  const {confo_textad78a, setconfo_textad78a}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button24a33, setcancel_button24a33}= useContext(TotalContext) as TotalContextProps;
  const {ok_button58a95, setok_button58a95}= useContext(TotalContext) as TotalContextProps;
  const {asset_id4d81b, setasset_id4d81b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {deletescreen_v1, setdeletescreen_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:deleteScreen:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "58a9b96c02f241298beab7b73d03c02f");
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
    setgroup_delete3c02fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text766e5({...delete_heading_text766e5,isDisabled:true});

    }else
    {
      if(delete_heading_text766e5?.isDisabled==null)
      {
        setdelete_heading_text766e5({...delete_heading_text766e5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text2a279({...asset_name_text2a279,isDisabled:true});

    }else
    {
      if(asset_name_text2a279?.isDisabled==null)
      {
        setasset_name_text2a279({...asset_name_text2a279,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_named7764({...asset_named7764,isDisabled:true});

    }else
    {
      if(asset_named7764?.isDisabled==null)
      {
        setasset_named7764({...asset_named7764,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_tag_text")){
        setasset_tag_text6db8e({...asset_tag_text6db8e,isDisabled:true});

    }else
    {
      if(asset_tag_text6db8e?.isDisabled==null)
      {
        setasset_tag_text6db8e({...asset_tag_text6db8e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_tag")){
        setasset_tag5b0ef({...asset_tag5b0ef,isDisabled:true});

    }else
    {
      if(asset_tag5b0ef?.isDisabled==null)
      {
        setasset_tag5b0ef({...asset_tag5b0ef,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name_text")){
        setcategory_name_text6b1b6({...category_name_text6b1b6,isDisabled:true});

    }else
    {
      if(category_name_text6b1b6?.isDisabled==null)
      {
        setcategory_name_text6b1b6({...category_name_text6b1b6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("category_name")){
        setcategory_nameb3bdb({...category_nameb3bdb,isDisabled:true});

    }else
    {
      if(category_nameb3bdb?.isDisabled==null)
      {
        setcategory_nameb3bdb({...category_nameb3bdb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type_text")){
        setasset_type_textbf4bc({...asset_type_textbf4bc,isDisabled:true});

    }else
    {
      if(asset_type_textbf4bc?.isDisabled==null)
      {
        setasset_type_textbf4bc({...asset_type_textbf4bc,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_type")){
        setasset_typebe078({...asset_typebe078,isDisabled:true});

    }else
    {
      if(asset_typebe078?.isDisabled==null)
      {
        setasset_typebe078({...asset_typebe078,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("location_text")){
        setlocation_text55088({...location_text55088,isDisabled:true});

    }else
    {
      if(location_text55088?.isDisabled==null)
      {
        setlocation_text55088({...location_text55088,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("location")){
        setlocation0b4e4({...location0b4e4,isDisabled:true});

    }else
    {
      if(location0b4e4?.isDisabled==null)
      {
        setlocation0b4e4({...location0b4e4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textad78a({...confo_textad78a,isDisabled:true});

    }else
    {
      if(confo_textad78a?.isDisabled==null)
      {
        setconfo_textad78a({...confo_textad78a,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button24a33({...cancel_button24a33,isDisabled:true});

    }else
    {
      if(cancel_button24a33?.isDisabled==null)
      {
        setcancel_button24a33({...cancel_button24a33,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_button58a95({...ok_button58a95,isDisabled:true});

    }else
    {
      if(ok_button58a95?.isDisabled==null)
      {
        setok_button58a95({...ok_button58a95,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_id")){
        setasset_id4d81b({...asset_id4d81b,isDisabled:true});

    }else
    {
      if(asset_id4d81b?.isDisabled==null)
      {
        setasset_id4d81b({...asset_id4d81b,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete3c02f,
        codeStates['setgroup_delete'] = setgroup_delete3c02f,
        codeStates['group_delete3c02f'] = group_delete3c02fProps,
        codeStates['setgroup_delete3c02f'] = setgroup_delete3c02fProps,
        codeStates['delete_heading_text'] = delete_heading_text766e5,
        codeStates['setdelete_heading_text'] = setdelete_heading_text766e5,
        codeStates['asset_name_text'] = asset_name_text2a279,
        codeStates['setasset_name_text'] = setasset_name_text2a279,
        codeStates['asset_name'] = asset_named7764,
        codeStates['setasset_name'] = setasset_named7764,
        codeStates['asset_tag_text'] = asset_tag_text6db8e,
        codeStates['setasset_tag_text'] = setasset_tag_text6db8e,
        codeStates['asset_tag'] = asset_tag5b0ef,
        codeStates['setasset_tag'] = setasset_tag5b0ef,
        codeStates['category_name_text'] = category_name_text6b1b6,
        codeStates['setcategory_name_text'] = setcategory_name_text6b1b6,
        codeStates['category_name'] = category_nameb3bdb,
        codeStates['setcategory_name'] = setcategory_nameb3bdb,
        codeStates['asset_type_text'] = asset_type_textbf4bc,
        codeStates['setasset_type_text'] = setasset_type_textbf4bc,
        codeStates['asset_type'] = asset_typebe078,
        codeStates['setasset_type'] = setasset_typebe078,
        codeStates['location_text'] = location_text55088,
        codeStates['setlocation_text'] = setlocation_text55088,
        codeStates['location'] = location0b4e4,
        codeStates['setlocation'] = setlocation0b4e4,
        codeStates['confo_text'] = confo_textad78a,
        codeStates['setconfo_text'] = setconfo_textad78a,
        codeStates['cancel_button'] = cancel_button24a33,
        codeStates['setcancel_button'] = setcancel_button24a33,
        codeStates['ok_button'] = ok_button58a95,
        codeStates['setok_button'] = setok_button58a95,
        codeStates['asset_id'] = asset_id4d81b,
        codeStates['setasset_id'] = setasset_id4d81b,

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
        codeStates['group_delete'] = group_delete3c02f,
        codeStates['setgroup_delete'] = setgroup_delete3c02f,
        codeStates['group_delete3c02f'] = group_delete3c02fProps,
        codeStates['setgroup_delete3c02f'] = setgroup_delete3c02fProps,
        codeStates['delete_heading_text'] = delete_heading_text766e5,
        codeStates['setdelete_heading_text'] = setdelete_heading_text766e5,
        codeStates['asset_name_text'] = asset_name_text2a279,
        codeStates['setasset_name_text'] = setasset_name_text2a279,
        codeStates['asset_name'] = asset_named7764,
        codeStates['setasset_name'] = setasset_named7764,
        codeStates['asset_tag_text'] = asset_tag_text6db8e,
        codeStates['setasset_tag_text'] = setasset_tag_text6db8e,
        codeStates['asset_tag'] = asset_tag5b0ef,
        codeStates['setasset_tag'] = setasset_tag5b0ef,
        codeStates['category_name_text'] = category_name_text6b1b6,
        codeStates['setcategory_name_text'] = setcategory_name_text6b1b6,
        codeStates['category_name'] = category_nameb3bdb,
        codeStates['setcategory_name'] = setcategory_nameb3bdb,
        codeStates['asset_type_text'] = asset_type_textbf4bc,
        codeStates['setasset_type_text'] = setasset_type_textbf4bc,
        codeStates['asset_type'] = asset_typebe078,
        codeStates['setasset_type'] = setasset_typebe078,
        codeStates['location_text'] = location_text55088,
        codeStates['setlocation_text'] = setlocation_text55088,
        codeStates['location'] = location0b4e4,
        codeStates['setlocation'] = setlocation0b4e4,
        codeStates['confo_text'] = confo_textad78a,
        codeStates['setconfo_text'] = setconfo_textad78a,
        codeStates['cancel_button'] = cancel_button24a33,
        codeStates['setcancel_button'] = setcancel_button24a33,
        codeStates['ok_button'] = ok_button58a95,
        codeStates['setok_button'] = setok_button58a95,
        codeStates['asset_id'] = asset_id4d81b,
        codeStates['setasset_id'] = setasset_id4d81b,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete3c02fRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete3c02fRef.current?.setSearchParams();
    group_delete3c02fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete3c02f) && Object.keys(group_delete3c02f)?.length>0)
      {
        setgroup_delete3c02f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete3c02fProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 54',
      
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
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 766e5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 2a279 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* d7764 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_tag_text") ?<Textasset_tag_text   /* 6db8e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_tag") ?<Textasset_tag   /* 5b0ef */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_name_text") ?<Textcategory_name_text   /* 6b1b6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("category_name") ?<Textcategory_name   /* b3bdb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type_text") ?<Textasset_type_text   /* bf4bc */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_type") ?<Textasset_type   /* be078 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("location_text") ?<Textlocation_text   /* 55088 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("location") ?<Textlocation   /* 0b4e4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* ad78a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
          {allowedControls.includes("asset_id") ?<Textasset_id   /* 4d81b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup_delete
