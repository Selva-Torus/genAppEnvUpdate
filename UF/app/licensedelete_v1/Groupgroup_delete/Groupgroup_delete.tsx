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
import Textproduct_name_text  from "./Textproduct_name_text";
import Textproduct_name  from "./Textproduct_name";
import Textlicense_type_text  from "./Textlicense_type_text";
import Textlicense_type  from "./Textlicense_type";
import Textauto_renewal_text  from "./Textauto_renewal_text";
import Textauto_renewal  from "./Textauto_renewal";
import Textseats_total_text  from "./Textseats_total_text";
import Textseats_total  from "./Textseats_total";
import Textseats_used_text  from "./Textseats_used_text";
import Textseats_used  from "./Textseats_used";
import Textconfo_text  from "./Textconfo_text";
import Textlicense_id  from "./Textlicense_id";
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
  const {dfd_assetsoftwarelicenses_v1Props, setdfd_assetsoftwarelicenses_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "product_name_text",
      "product_name",
      "license_type_text",
      "license_type",
      "auto_renewal_text",
      "auto_renewal",
      "seats_total_text",
      "seats_total",
      "seats_used_text",
      "seats_used",
      "confo_text",
      "license_id",
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
      "product_name_text",
      "product_name",
      "license_type_text",
      "license_type",
      "auto_renewal_text",
      "auto_renewal",
      "seats_total_text",
      "seats_total",
      "seats_used_text",
      "seats_used",
      "confo_text",
      "license_id",
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
  const {group_deletedf5b8, setgroup_deletedf5b8}= useContext(TotalContext) as TotalContextProps;
  const {group_deletedf5b8Props, setgroup_deletedf5b8Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb375f, setdelete_heading_textb375f}= useContext(TotalContext) as TotalContextProps;
  const {product_name_text501de, setproduct_name_text501de}= useContext(TotalContext) as TotalContextProps;
  const {product_namead2dd, setproduct_namead2dd}= useContext(TotalContext) as TotalContextProps;
  const {license_type_text3c22b, setlicense_type_text3c22b}= useContext(TotalContext) as TotalContextProps;
  const {license_typecec9e, setlicense_typecec9e}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal_textbdbd2, setauto_renewal_textbdbd2}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal8e280, setauto_renewal8e280}= useContext(TotalContext) as TotalContextProps;
  const {seats_total_texta19fe, setseats_total_texta19fe}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalf37ee, setseats_totalf37ee}= useContext(TotalContext) as TotalContextProps;
  const {seats_used_textc1a25, setseats_used_textc1a25}= useContext(TotalContext) as TotalContextProps;
  const {seats_used8c8d5, setseats_used8c8d5}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbc695, setconfo_textbc695}= useContext(TotalContext) as TotalContextProps;
  const {license_id027b5, setlicense_id027b5}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3e8d9, setcancel_button3e8d9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonf3727, setok_buttonf3727}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {licensedelete_v1, setlicensedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:licenseDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "70cd602d5b1d604a33a77213e65df5b8");
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
    setgroup_deletedf5b8Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textb375f({...delete_heading_textb375f,isDisabled:true});

    }else
    {
      if(delete_heading_textb375f?.isDisabled==null)
      {
        setdelete_heading_textb375f({...delete_heading_textb375f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name_text")){
        setproduct_name_text501de({...product_name_text501de,isDisabled:true});

    }else
    {
      if(product_name_text501de?.isDisabled==null)
      {
        setproduct_name_text501de({...product_name_text501de,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("product_name")){
        setproduct_namead2dd({...product_namead2dd,isDisabled:true});

    }else
    {
      if(product_namead2dd?.isDisabled==null)
      {
        setproduct_namead2dd({...product_namead2dd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_type_text")){
        setlicense_type_text3c22b({...license_type_text3c22b,isDisabled:true});

    }else
    {
      if(license_type_text3c22b?.isDisabled==null)
      {
        setlicense_type_text3c22b({...license_type_text3c22b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_type")){
        setlicense_typecec9e({...license_typecec9e,isDisabled:true});

    }else
    {
      if(license_typecec9e?.isDisabled==null)
      {
        setlicense_typecec9e({...license_typecec9e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("auto_renewal_text")){
        setauto_renewal_textbdbd2({...auto_renewal_textbdbd2,isDisabled:true});

    }else
    {
      if(auto_renewal_textbdbd2?.isDisabled==null)
      {
        setauto_renewal_textbdbd2({...auto_renewal_textbdbd2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("auto_renewal")){
        setauto_renewal8e280({...auto_renewal8e280,isDisabled:true});

    }else
    {
      if(auto_renewal8e280?.isDisabled==null)
      {
        setauto_renewal8e280({...auto_renewal8e280,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_total_text")){
        setseats_total_texta19fe({...seats_total_texta19fe,isDisabled:true});

    }else
    {
      if(seats_total_texta19fe?.isDisabled==null)
      {
        setseats_total_texta19fe({...seats_total_texta19fe,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_total")){
        setseats_totalf37ee({...seats_totalf37ee,isDisabled:true});

    }else
    {
      if(seats_totalf37ee?.isDisabled==null)
      {
        setseats_totalf37ee({...seats_totalf37ee,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_used_text")){
        setseats_used_textc1a25({...seats_used_textc1a25,isDisabled:true});

    }else
    {
      if(seats_used_textc1a25?.isDisabled==null)
      {
        setseats_used_textc1a25({...seats_used_textc1a25,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("seats_used")){
        setseats_used8c8d5({...seats_used8c8d5,isDisabled:true});

    }else
    {
      if(seats_used8c8d5?.isDisabled==null)
      {
        setseats_used8c8d5({...seats_used8c8d5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_textbc695({...confo_textbc695,isDisabled:true});

    }else
    {
      if(confo_textbc695?.isDisabled==null)
      {
        setconfo_textbc695({...confo_textbc695,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("license_id")){
        setlicense_id027b5({...license_id027b5,isDisabled:true});

    }else
    {
      if(license_id027b5?.isDisabled==null)
      {
        setlicense_id027b5({...license_id027b5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button3e8d9({...cancel_button3e8d9,isDisabled:true});

    }else
    {
      if(cancel_button3e8d9?.isDisabled==null)
      {
        setcancel_button3e8d9({...cancel_button3e8d9,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonf3727({...ok_buttonf3727,isDisabled:true});

    }else
    {
      if(ok_buttonf3727?.isDisabled==null)
      {
        setok_buttonf3727({...ok_buttonf3727,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_deletedf5b8,
        codeStates['setgroup_delete'] = setgroup_deletedf5b8,
        codeStates['group_deletedf5b8'] = group_deletedf5b8Props,
        codeStates['setgroup_deletedf5b8'] = setgroup_deletedf5b8Props,
        codeStates['delete_heading_text'] = delete_heading_textb375f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb375f,
        codeStates['product_name_text'] = product_name_text501de,
        codeStates['setproduct_name_text'] = setproduct_name_text501de,
        codeStates['product_name'] = product_namead2dd,
        codeStates['setproduct_name'] = setproduct_namead2dd,
        codeStates['license_type_text'] = license_type_text3c22b,
        codeStates['setlicense_type_text'] = setlicense_type_text3c22b,
        codeStates['license_type'] = license_typecec9e,
        codeStates['setlicense_type'] = setlicense_typecec9e,
        codeStates['auto_renewal_text'] = auto_renewal_textbdbd2,
        codeStates['setauto_renewal_text'] = setauto_renewal_textbdbd2,
        codeStates['auto_renewal'] = auto_renewal8e280,
        codeStates['setauto_renewal'] = setauto_renewal8e280,
        codeStates['seats_total_text'] = seats_total_texta19fe,
        codeStates['setseats_total_text'] = setseats_total_texta19fe,
        codeStates['seats_total'] = seats_totalf37ee,
        codeStates['setseats_total'] = setseats_totalf37ee,
        codeStates['seats_used_text'] = seats_used_textc1a25,
        codeStates['setseats_used_text'] = setseats_used_textc1a25,
        codeStates['seats_used'] = seats_used8c8d5,
        codeStates['setseats_used'] = setseats_used8c8d5,
        codeStates['confo_text'] = confo_textbc695,
        codeStates['setconfo_text'] = setconfo_textbc695,
        codeStates['license_id'] = license_id027b5,
        codeStates['setlicense_id'] = setlicense_id027b5,
        codeStates['cancel_button'] = cancel_button3e8d9,
        codeStates['setcancel_button'] = setcancel_button3e8d9,
        codeStates['ok_button'] = ok_buttonf3727,
        codeStates['setok_button'] = setok_buttonf3727,

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
        codeStates['group_delete'] = group_deletedf5b8,
        codeStates['setgroup_delete'] = setgroup_deletedf5b8,
        codeStates['group_deletedf5b8'] = group_deletedf5b8Props,
        codeStates['setgroup_deletedf5b8'] = setgroup_deletedf5b8Props,
        codeStates['delete_heading_text'] = delete_heading_textb375f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb375f,
        codeStates['product_name_text'] = product_name_text501de,
        codeStates['setproduct_name_text'] = setproduct_name_text501de,
        codeStates['product_name'] = product_namead2dd,
        codeStates['setproduct_name'] = setproduct_namead2dd,
        codeStates['license_type_text'] = license_type_text3c22b,
        codeStates['setlicense_type_text'] = setlicense_type_text3c22b,
        codeStates['license_type'] = license_typecec9e,
        codeStates['setlicense_type'] = setlicense_typecec9e,
        codeStates['auto_renewal_text'] = auto_renewal_textbdbd2,
        codeStates['setauto_renewal_text'] = setauto_renewal_textbdbd2,
        codeStates['auto_renewal'] = auto_renewal8e280,
        codeStates['setauto_renewal'] = setauto_renewal8e280,
        codeStates['seats_total_text'] = seats_total_texta19fe,
        codeStates['setseats_total_text'] = setseats_total_texta19fe,
        codeStates['seats_total'] = seats_totalf37ee,
        codeStates['setseats_total'] = setseats_totalf37ee,
        codeStates['seats_used_text'] = seats_used_textc1a25,
        codeStates['setseats_used_text'] = setseats_used_textc1a25,
        codeStates['seats_used'] = seats_used8c8d5,
        codeStates['setseats_used'] = setseats_used8c8d5,
        codeStates['confo_text'] = confo_textbc695,
        codeStates['setconfo_text'] = setconfo_textbc695,
        codeStates['license_id'] = license_id027b5,
        codeStates['setlicense_id'] = setlicense_id027b5,
        codeStates['cancel_button'] = cancel_button3e8d9,
        codeStates['setcancel_button'] = setcancel_button3e8d9,
        codeStates['ok_button'] = ok_buttonf3727,
        codeStates['setok_button'] = setok_buttonf3727,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_deletedf5b8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    group_deletedf5b8Ref.current?.setSearchParams();
    group_deletedf5b8Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_deletedf5b8) && Object.keys(group_deletedf5b8)?.length>0)
      {
        setgroup_deletedf5b8({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_deletedf5b8Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 63',
      
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
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* b375f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_name_text") ?<Textproduct_name_text   /* 501de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("product_name") ?<Textproduct_name   /* ad2dd */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("license_type_text") ?<Textlicense_type_text   /* 3c22b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("license_type") ?<Textlicense_type   /* cec9e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("auto_renewal_text") ?<Textauto_renewal_text   /* bdbd2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("auto_renewal") ?<Textauto_renewal   /* 8e280 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("seats_total_text") ?<Textseats_total_text   /* a19fe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("seats_total") ?<Textseats_total   /* f37ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("seats_used_text") ?<Textseats_used_text   /* c1a25 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("seats_used") ?<Textseats_used   /* 8c8d5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* bc695 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("license_id") ?<Textlicense_id   /* 027b5 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
