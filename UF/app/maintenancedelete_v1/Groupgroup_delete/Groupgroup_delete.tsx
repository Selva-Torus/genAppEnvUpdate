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
import Textmaint_type_text  from "./Textmaint_type_text";
import Textmaint_type  from "./Textmaint_type";
import Textpriority_text  from "./Textpriority_text";
import Textpriority  from "./Textpriority";
import Textschedule_date_text  from "./Textschedule_date_text";
import Textschedule_date  from "./Textschedule_date";
import Textperformed_by_text  from "./Textperformed_by_text";
import Textperformed_by  from "./Textperformed_by";
import Textconfo_text  from "./Textconfo_text";
import Textmaint_id  from "./Textmaint_id";
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
  const {dfd_assetmaintenance_v1Props, setdfd_assetmaintenance_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "maint_type_text",
      "maint_type",
      "priority_text",
      "priority",
      "schedule_date_text",
      "schedule_date",
      "performed_by_text",
      "performed_by",
      "confo_text",
      "maint_id",
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
      "asset_name_text",
      "asset_name",
      "maint_type_text",
      "maint_type",
      "priority_text",
      "priority",
      "schedule_date_text",
      "schedule_date",
      "performed_by_text",
      "performed_by",
      "confo_text",
      "maint_id",
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
  const {group_delete3f77f, setgroup_delete3f77f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3f77fProps, setgroup_delete3f77fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text64ac6, setdelete_heading_text64ac6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text99dc6, setasset_name_text99dc6}= useContext(TotalContext) as TotalContextProps;
  const {asset_name9f8b1, setasset_name9f8b1}= useContext(TotalContext) as TotalContextProps;
  const {maint_type_textf805a, setmaint_type_textf805a}= useContext(TotalContext) as TotalContextProps;
  const {maint_typefc524, setmaint_typefc524}= useContext(TotalContext) as TotalContextProps;
  const {priority_text5afe4, setpriority_text5afe4}= useContext(TotalContext) as TotalContextProps;
  const {priority1b975, setpriority1b975}= useContext(TotalContext) as TotalContextProps;
  const {schedule_date_textc8d71, setschedule_date_textc8d71}= useContext(TotalContext) as TotalContextProps;
  const {schedule_dateef711, setschedule_dateef711}= useContext(TotalContext) as TotalContextProps;
  const {performed_by_textb5193, setperformed_by_textb5193}= useContext(TotalContext) as TotalContextProps;
  const {performed_byc179b, setperformed_byc179b}= useContext(TotalContext) as TotalContextProps;
  const {confo_text7649e, setconfo_text7649e}= useContext(TotalContext) as TotalContextProps;
  const {maint_id927de, setmaint_id927de}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button36974, setcancel_button36974}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttond1793, setok_buttond1793}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {maintenancedelete_v1, setmaintenancedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:maintenanceDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f5e5ab6658f380cb72c7f8b9a483f77f");
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
    setgroup_delete3f77fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_text64ac6({...delete_heading_text64ac6,isDisabled:true});

    }else
    {
      if(delete_heading_text64ac6?.isDisabled==null)
      {
        setdelete_heading_text64ac6({...delete_heading_text64ac6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text99dc6({...asset_name_text99dc6,isDisabled:true});

    }else
    {
      if(asset_name_text99dc6?.isDisabled==null)
      {
        setasset_name_text99dc6({...asset_name_text99dc6,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name9f8b1({...asset_name9f8b1,isDisabled:true});

    }else
    {
      if(asset_name9f8b1?.isDisabled==null)
      {
        setasset_name9f8b1({...asset_name9f8b1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_type_text")){
        setmaint_type_textf805a({...maint_type_textf805a,isDisabled:true});

    }else
    {
      if(maint_type_textf805a?.isDisabled==null)
      {
        setmaint_type_textf805a({...maint_type_textf805a,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_type")){
        setmaint_typefc524({...maint_typefc524,isDisabled:true});

    }else
    {
      if(maint_typefc524?.isDisabled==null)
      {
        setmaint_typefc524({...maint_typefc524,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority_text")){
        setpriority_text5afe4({...priority_text5afe4,isDisabled:true});

    }else
    {
      if(priority_text5afe4?.isDisabled==null)
      {
        setpriority_text5afe4({...priority_text5afe4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority")){
        setpriority1b975({...priority1b975,isDisabled:true});

    }else
    {
      if(priority1b975?.isDisabled==null)
      {
        setpriority1b975({...priority1b975,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("schedule_date_text")){
        setschedule_date_textc8d71({...schedule_date_textc8d71,isDisabled:true});

    }else
    {
      if(schedule_date_textc8d71?.isDisabled==null)
      {
        setschedule_date_textc8d71({...schedule_date_textc8d71,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("schedule_date")){
        setschedule_dateef711({...schedule_dateef711,isDisabled:true});

    }else
    {
      if(schedule_dateef711?.isDisabled==null)
      {
        setschedule_dateef711({...schedule_dateef711,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("performed_by_text")){
        setperformed_by_textb5193({...performed_by_textb5193,isDisabled:true});

    }else
    {
      if(performed_by_textb5193?.isDisabled==null)
      {
        setperformed_by_textb5193({...performed_by_textb5193,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("performed_by")){
        setperformed_byc179b({...performed_byc179b,isDisabled:true});

    }else
    {
      if(performed_byc179b?.isDisabled==null)
      {
        setperformed_byc179b({...performed_byc179b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text7649e({...confo_text7649e,isDisabled:true});

    }else
    {
      if(confo_text7649e?.isDisabled==null)
      {
        setconfo_text7649e({...confo_text7649e,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_id")){
        setmaint_id927de({...maint_id927de,isDisabled:true});

    }else
    {
      if(maint_id927de?.isDisabled==null)
      {
        setmaint_id927de({...maint_id927de,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button36974({...cancel_button36974,isDisabled:true});

    }else
    {
      if(cancel_button36974?.isDisabled==null)
      {
        setcancel_button36974({...cancel_button36974,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttond1793({...ok_buttond1793,isDisabled:true});

    }else
    {
      if(ok_buttond1793?.isDisabled==null)
      {
        setok_buttond1793({...ok_buttond1793,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete3f77f,
        codeStates['setgroup_delete'] = setgroup_delete3f77f,
        codeStates['group_delete3f77f'] = group_delete3f77fProps,
        codeStates['setgroup_delete3f77f'] = setgroup_delete3f77fProps,
        codeStates['delete_heading_text'] = delete_heading_text64ac6,
        codeStates['setdelete_heading_text'] = setdelete_heading_text64ac6,
        codeStates['asset_name_text'] = asset_name_text99dc6,
        codeStates['setasset_name_text'] = setasset_name_text99dc6,
        codeStates['asset_name'] = asset_name9f8b1,
        codeStates['setasset_name'] = setasset_name9f8b1,
        codeStates['maint_type_text'] = maint_type_textf805a,
        codeStates['setmaint_type_text'] = setmaint_type_textf805a,
        codeStates['maint_type'] = maint_typefc524,
        codeStates['setmaint_type'] = setmaint_typefc524,
        codeStates['priority_text'] = priority_text5afe4,
        codeStates['setpriority_text'] = setpriority_text5afe4,
        codeStates['priority'] = priority1b975,
        codeStates['setpriority'] = setpriority1b975,
        codeStates['schedule_date_text'] = schedule_date_textc8d71,
        codeStates['setschedule_date_text'] = setschedule_date_textc8d71,
        codeStates['schedule_date'] = schedule_dateef711,
        codeStates['setschedule_date'] = setschedule_dateef711,
        codeStates['performed_by_text'] = performed_by_textb5193,
        codeStates['setperformed_by_text'] = setperformed_by_textb5193,
        codeStates['performed_by'] = performed_byc179b,
        codeStates['setperformed_by'] = setperformed_byc179b,
        codeStates['confo_text'] = confo_text7649e,
        codeStates['setconfo_text'] = setconfo_text7649e,
        codeStates['maint_id'] = maint_id927de,
        codeStates['setmaint_id'] = setmaint_id927de,
        codeStates['cancel_button'] = cancel_button36974,
        codeStates['setcancel_button'] = setcancel_button36974,
        codeStates['ok_button'] = ok_buttond1793,
        codeStates['setok_button'] = setok_buttond1793,

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
        codeStates['group_delete'] = group_delete3f77f,
        codeStates['setgroup_delete'] = setgroup_delete3f77f,
        codeStates['group_delete3f77f'] = group_delete3f77fProps,
        codeStates['setgroup_delete3f77f'] = setgroup_delete3f77fProps,
        codeStates['delete_heading_text'] = delete_heading_text64ac6,
        codeStates['setdelete_heading_text'] = setdelete_heading_text64ac6,
        codeStates['asset_name_text'] = asset_name_text99dc6,
        codeStates['setasset_name_text'] = setasset_name_text99dc6,
        codeStates['asset_name'] = asset_name9f8b1,
        codeStates['setasset_name'] = setasset_name9f8b1,
        codeStates['maint_type_text'] = maint_type_textf805a,
        codeStates['setmaint_type_text'] = setmaint_type_textf805a,
        codeStates['maint_type'] = maint_typefc524,
        codeStates['setmaint_type'] = setmaint_typefc524,
        codeStates['priority_text'] = priority_text5afe4,
        codeStates['setpriority_text'] = setpriority_text5afe4,
        codeStates['priority'] = priority1b975,
        codeStates['setpriority'] = setpriority1b975,
        codeStates['schedule_date_text'] = schedule_date_textc8d71,
        codeStates['setschedule_date_text'] = setschedule_date_textc8d71,
        codeStates['schedule_date'] = schedule_dateef711,
        codeStates['setschedule_date'] = setschedule_dateef711,
        codeStates['performed_by_text'] = performed_by_textb5193,
        codeStates['setperformed_by_text'] = setperformed_by_textb5193,
        codeStates['performed_by'] = performed_byc179b,
        codeStates['setperformed_by'] = setperformed_byc179b,
        codeStates['confo_text'] = confo_text7649e,
        codeStates['setconfo_text'] = setconfo_text7649e,
        codeStates['maint_id'] = maint_id927de,
        codeStates['setmaint_id'] = setmaint_id927de,
        codeStates['cancel_button'] = cancel_button36974,
        codeStates['setcancel_button'] = setcancel_button36974,
        codeStates['ok_button'] = ok_buttond1793,
        codeStates['setok_button'] = setok_buttond1793,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete3f77fRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete3f77fRef.current?.setSearchParams();
    group_delete3f77fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete3f77f) && Object.keys(group_delete3f77f)?.length>0)
      {
        setgroup_delete3f77f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete3f77fProps?.refresh,token])


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
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* 64ac6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 99dc6 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* 9f8b1 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maint_type_text") ?<Textmaint_type_text   /* f805a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maint_type") ?<Textmaint_type   /* fc524 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("priority_text") ?<Textpriority_text   /* 5afe4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("priority") ?<Textpriority   /* 1b975 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("schedule_date_text") ?<Textschedule_date_text   /* c8d71 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("schedule_date") ?<Textschedule_date   /* ef711 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("performed_by_text") ?<Textperformed_by_text   /* b5193 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("performed_by") ?<Textperformed_by   /* c179b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 7649e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("maint_id") ?<Textmaint_id   /* 927de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
