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
import Textassigned_to_text  from "./Textassigned_to_text";
import Textassigned_to  from "./Textassigned_to";
import Textassigned_at_text  from "./Textassigned_at_text";
import Textassigned_by  from "./Textassigned_by";
import Textcondition_at_assign_text  from "./Textcondition_at_assign_text";
import Textcondition_at_assign  from "./Textcondition_at_assign";
import Textexpected_return_date_text  from "./Textexpected_return_date_text";
import Textexpected_return_date  from "./Textexpected_return_date";
import Textconfo_text  from "./Textconfo_text";
import Textassign_id  from "./Textassign_id";
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
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "assigned_to_text",
      "assigned_to",
      "assigned_at_text",
      "assigned_by",
      "condition_at_assign_text",
      "condition_at_assign",
      "expected_return_date_text",
      "expected_return_date",
      "confo_text",
      "assign_id",
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
      "assigned_to_text",
      "assigned_to",
      "assigned_at_text",
      "assigned_by",
      "condition_at_assign_text",
      "condition_at_assign",
      "expected_return_date_text",
      "expected_return_date",
      "confo_text",
      "assign_id",
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
  const {group_delete0df4b, setgroup_delete0df4b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete0df4bProps, setgroup_delete0df4bProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc848b, setdelete_heading_textc848b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text16bc2, setasset_name_text16bc2}= useContext(TotalContext) as TotalContextProps;
  const {asset_named51ee, setasset_named51ee}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to_text5d18d, setassigned_to_text5d18d}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to51299, setassigned_to51299}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at_text4a3af, setassigned_at_text4a3af}= useContext(TotalContext) as TotalContextProps;
  const {assigned_bycb5ab, setassigned_bycb5ab}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign_text4ad2d, setcondition_at_assign_text4ad2d}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assignc35c4, setcondition_at_assignc35c4}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date_text80abb, setexpected_return_date_text80abb}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date11169, setexpected_return_date11169}= useContext(TotalContext) as TotalContextProps;
  const {confo_text66873, setconfo_text66873}= useContext(TotalContext) as TotalContextProps;
  const {assign_idf7b2f, setassign_idf7b2f}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0c073, setcancel_button0c073}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfa294, setok_buttonfa294}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assignassetdelete_v1, setassignassetdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assignAssetDelete:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9e8addb372fc9347531f4bc53780df4b");
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
    setgroup_delete0df4bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("delete_heading_text")){
        setdelete_heading_textc848b({...delete_heading_textc848b,isDisabled:true});

    }else
    {
      if(delete_heading_textc848b?.isDisabled==null)
      {
        setdelete_heading_textc848b({...delete_heading_textc848b,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name_text")){
        setasset_name_text16bc2({...asset_name_text16bc2,isDisabled:true});

    }else
    {
      if(asset_name_text16bc2?.isDisabled==null)
      {
        setasset_name_text16bc2({...asset_name_text16bc2,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_named51ee({...asset_named51ee,isDisabled:true});

    }else
    {
      if(asset_named51ee?.isDisabled==null)
      {
        setasset_named51ee({...asset_named51ee,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to_text")){
        setassigned_to_text5d18d({...assigned_to_text5d18d,isDisabled:true});

    }else
    {
      if(assigned_to_text5d18d?.isDisabled==null)
      {
        setassigned_to_text5d18d({...assigned_to_text5d18d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_to")){
        setassigned_to51299({...assigned_to51299,isDisabled:true});

    }else
    {
      if(assigned_to51299?.isDisabled==null)
      {
        setassigned_to51299({...assigned_to51299,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_at_text")){
        setassigned_at_text4a3af({...assigned_at_text4a3af,isDisabled:true});

    }else
    {
      if(assigned_at_text4a3af?.isDisabled==null)
      {
        setassigned_at_text4a3af({...assigned_at_text4a3af,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_by")){
        setassigned_bycb5ab({...assigned_bycb5ab,isDisabled:true});

    }else
    {
      if(assigned_bycb5ab?.isDisabled==null)
      {
        setassigned_bycb5ab({...assigned_bycb5ab,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_assign_text")){
        setcondition_at_assign_text4ad2d({...condition_at_assign_text4ad2d,isDisabled:true});

    }else
    {
      if(condition_at_assign_text4ad2d?.isDisabled==null)
      {
        setcondition_at_assign_text4ad2d({...condition_at_assign_text4ad2d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("condition_at_assign")){
        setcondition_at_assignc35c4({...condition_at_assignc35c4,isDisabled:true});

    }else
    {
      if(condition_at_assignc35c4?.isDisabled==null)
      {
        setcondition_at_assignc35c4({...condition_at_assignc35c4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expected_return_date_text")){
        setexpected_return_date_text80abb({...expected_return_date_text80abb,isDisabled:true});

    }else
    {
      if(expected_return_date_text80abb?.isDisabled==null)
      {
        setexpected_return_date_text80abb({...expected_return_date_text80abb,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expected_return_date")){
        setexpected_return_date11169({...expected_return_date11169,isDisabled:true});

    }else
    {
      if(expected_return_date11169?.isDisabled==null)
      {
        setexpected_return_date11169({...expected_return_date11169,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("confo_text")){
        setconfo_text66873({...confo_text66873,isDisabled:true});

    }else
    {
      if(confo_text66873?.isDisabled==null)
      {
        setconfo_text66873({...confo_text66873,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign_id")){
        setassign_idf7b2f({...assign_idf7b2f,isDisabled:true});

    }else
    {
      if(assign_idf7b2f?.isDisabled==null)
      {
        setassign_idf7b2f({...assign_idf7b2f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancel_button")){
        setcancel_button0c073({...cancel_button0c073,isDisabled:true});

    }else
    {
      if(cancel_button0c073?.isDisabled==null)
      {
        setcancel_button0c073({...cancel_button0c073,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ok_button")){
        setok_buttonfa294({...ok_buttonfa294,isDisabled:true});

    }else
    {
      if(ok_buttonfa294?.isDisabled==null)
      {
        setok_buttonfa294({...ok_buttonfa294,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group_delete'] = group_delete0df4b,
        codeStates['setgroup_delete'] = setgroup_delete0df4b,
        codeStates['group_delete0df4b'] = group_delete0df4bProps,
        codeStates['setgroup_delete0df4b'] = setgroup_delete0df4bProps,
        codeStates['delete_heading_text'] = delete_heading_textc848b,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc848b,
        codeStates['asset_name_text'] = asset_name_text16bc2,
        codeStates['setasset_name_text'] = setasset_name_text16bc2,
        codeStates['asset_name'] = asset_named51ee,
        codeStates['setasset_name'] = setasset_named51ee,
        codeStates['assigned_to_text'] = assigned_to_text5d18d,
        codeStates['setassigned_to_text'] = setassigned_to_text5d18d,
        codeStates['assigned_to'] = assigned_to51299,
        codeStates['setassigned_to'] = setassigned_to51299,
        codeStates['assigned_at_text'] = assigned_at_text4a3af,
        codeStates['setassigned_at_text'] = setassigned_at_text4a3af,
        codeStates['assigned_by'] = assigned_bycb5ab,
        codeStates['setassigned_by'] = setassigned_bycb5ab,
        codeStates['condition_at_assign_text'] = condition_at_assign_text4ad2d,
        codeStates['setcondition_at_assign_text'] = setcondition_at_assign_text4ad2d,
        codeStates['condition_at_assign'] = condition_at_assignc35c4,
        codeStates['setcondition_at_assign'] = setcondition_at_assignc35c4,
        codeStates['expected_return_date_text'] = expected_return_date_text80abb,
        codeStates['setexpected_return_date_text'] = setexpected_return_date_text80abb,
        codeStates['expected_return_date'] = expected_return_date11169,
        codeStates['setexpected_return_date'] = setexpected_return_date11169,
        codeStates['confo_text'] = confo_text66873,
        codeStates['setconfo_text'] = setconfo_text66873,
        codeStates['assign_id'] = assign_idf7b2f,
        codeStates['setassign_id'] = setassign_idf7b2f,
        codeStates['cancel_button'] = cancel_button0c073,
        codeStates['setcancel_button'] = setcancel_button0c073,
        codeStates['ok_button'] = ok_buttonfa294,
        codeStates['setok_button'] = setok_buttonfa294,

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
        codeStates['group_delete'] = group_delete0df4b,
        codeStates['setgroup_delete'] = setgroup_delete0df4b,
        codeStates['group_delete0df4b'] = group_delete0df4bProps,
        codeStates['setgroup_delete0df4b'] = setgroup_delete0df4bProps,
        codeStates['delete_heading_text'] = delete_heading_textc848b,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc848b,
        codeStates['asset_name_text'] = asset_name_text16bc2,
        codeStates['setasset_name_text'] = setasset_name_text16bc2,
        codeStates['asset_name'] = asset_named51ee,
        codeStates['setasset_name'] = setasset_named51ee,
        codeStates['assigned_to_text'] = assigned_to_text5d18d,
        codeStates['setassigned_to_text'] = setassigned_to_text5d18d,
        codeStates['assigned_to'] = assigned_to51299,
        codeStates['setassigned_to'] = setassigned_to51299,
        codeStates['assigned_at_text'] = assigned_at_text4a3af,
        codeStates['setassigned_at_text'] = setassigned_at_text4a3af,
        codeStates['assigned_by'] = assigned_bycb5ab,
        codeStates['setassigned_by'] = setassigned_bycb5ab,
        codeStates['condition_at_assign_text'] = condition_at_assign_text4ad2d,
        codeStates['setcondition_at_assign_text'] = setcondition_at_assign_text4ad2d,
        codeStates['condition_at_assign'] = condition_at_assignc35c4,
        codeStates['setcondition_at_assign'] = setcondition_at_assignc35c4,
        codeStates['expected_return_date_text'] = expected_return_date_text80abb,
        codeStates['setexpected_return_date_text'] = setexpected_return_date_text80abb,
        codeStates['expected_return_date'] = expected_return_date11169,
        codeStates['setexpected_return_date'] = setexpected_return_date11169,
        codeStates['confo_text'] = confo_text66873,
        codeStates['setconfo_text'] = setconfo_text66873,
        codeStates['assign_id'] = assign_idf7b2f,
        codeStates['setassign_id'] = setassign_idf7b2f,
        codeStates['cancel_button'] = cancel_button0c073,
        codeStates['setcancel_button'] = setcancel_button0c073,
        codeStates['ok_button'] = ok_buttonfa294,
        codeStates['setok_button'] = setok_buttonfa294,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group_delete0df4bRef = useRef<any>(null);
  const handleClearSearch = () => {
    group_delete0df4bRef.current?.setSearchParams();
    group_delete0df4bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group_delete0df4b) && Object.keys(group_delete0df4b)?.length>0)
      {
        setgroup_delete0df4b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group_delete0df4bProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 53',
      
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
          {allowedControls.includes("delete_heading_text") ?<Textdelete_heading_text   /* c848b */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name_text") ?<Textasset_name_text   /* 16bc2 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("asset_name") ?<Textasset_name   /* d51ee */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_to_text") ?<Textassigned_to_text   /* 5d18d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_to") ?<Textassigned_to   /* 51299 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_at_text") ?<Textassigned_at_text   /* 4a3af */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assigned_by") ?<Textassigned_by   /* cb5ab */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("condition_at_assign_text") ?<Textcondition_at_assign_text   /* 4ad2d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("condition_at_assign") ?<Textcondition_at_assign   /* c35c4 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("expected_return_date_text") ?<Textexpected_return_date_text   /* 80abb */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("expected_return_date") ?<Textexpected_return_date   /* 11169 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("confo_text") ?<Textconfo_text   /* 66873 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("assign_id") ?<Textassign_id   /* f7b2f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "cancel_button" in ButtonGoRuleData)?ButtonGoRuleData["cancel_button"]:true) && 
          allowedControls.includes("cancel_button")  ?            <Buttoncancel_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "ok_button" in ButtonGoRuleData)?ButtonGoRuleData["ok_button"]:true) && 
          allowedControls.includes("ok_button")  ?            <Buttonok_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupgroup_delete
