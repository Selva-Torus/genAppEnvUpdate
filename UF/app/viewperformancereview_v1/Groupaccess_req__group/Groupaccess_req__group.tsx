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
import Textbasic_inf  from "./Textbasic_inf";
import Dropdownfull_name  from "./Dropdownfull_name";
import Dropdowncycle_name  from "./Dropdowncycle_name";
import TextInputreview_number  from "./TextInputreview_number";
import Dropdownreview_type  from "./Dropdownreview_type";
import Dropdownreview_status  from "./Dropdownreview_status";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaccess_req__group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cyclenamecombo_v1Props, setdfd_cyclenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewtypecombo_v1Props, setdfd_reviewtypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewstatuscombo_v1Props, setdfd_reviewstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "basic_inf",
      "full_name",
      "cycle_name",
      "review_number",
      "review_type",
      "review_status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "addt__group",
      "addt__dts_group",
      "dynamicactions"
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
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf380e7, setbasic_inf380e7}= useContext(TotalContext) as TotalContextProps;
  const {full_name8acb5, setfull_name8acb5}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name47492, setcycle_name47492}= useContext(TotalContext) as TotalContextProps;
  const {review_number53b06, setreview_number53b06}= useContext(TotalContext) as TotalContextProps;
  const {review_typed590c, setreview_typed590c}= useContext(TotalContext) as TotalContextProps;
  const {review_status2c6ef, setreview_status2c6ef}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewperformancereview_v1, setviewperformancereview_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceReview:AFVK:v1',
    [user],
    'GroupAccessReq_group',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "03cc0779353abc8649fdd1a265a002d0");
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
    setaccess_req__group002d0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("basic_inf")){
        setbasic_inf380e7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(basic_inf380e7?.isDisabled==null)
      {
        setbasic_inf380e7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_name8acb5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_name8acb5?.isDisabled==null)
      {
        setfull_name8acb5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name47492((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name47492?.isDisabled==null)
      {
        setcycle_name47492((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_number")){
        setreview_number53b06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_number53b06?.isDisabled==null)
      {
        setreview_number53b06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_type")){
        setreview_typed590c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_typed590c?.isDisabled==null)
      {
        setreview_typed590c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_status")){
        setreview_status2c6ef((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_status2c6ef?.isDisabled==null)
      {
        setreview_status2c6ef((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['basic_inf'] = basic_inf380e7,
        codeStates['setbasic_inf'] = setbasic_inf380e7,
        codeStates['full_name'] = full_name8acb5,
        codeStates['setfull_name'] = setfull_name8acb5,
        codeStates['cycle_name'] = cycle_name47492,
        codeStates['setcycle_name'] = setcycle_name47492,
        codeStates['review_number'] = review_number53b06,
        codeStates['setreview_number'] = setreview_number53b06,
        codeStates['review_type'] = review_typed590c,
        codeStates['setreview_type'] = setreview_typed590c,
        codeStates['review_status'] = review_status2c6ef,
        codeStates['setreview_status'] = setreview_status2c6ef,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,

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
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['basic_inf'] = basic_inf380e7,
        codeStates['setbasic_inf'] = setbasic_inf380e7,
        codeStates['full_name'] = full_name8acb5,
        codeStates['setfull_name'] = setfull_name8acb5,
        codeStates['cycle_name'] = cycle_name47492,
        codeStates['setcycle_name'] = setcycle_name47492,
        codeStates['review_number'] = review_number53b06,
        codeStates['setreview_number'] = setreview_number53b06,
        codeStates['review_type'] = review_typed590c,
        codeStates['setreview_type'] = setreview_typed590c,
        codeStates['review_status'] = review_status2c6ef,
        codeStates['setreview_status'] = setreview_status2c6ef,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__group002d0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__group002d0Ref.current?.setSearchParams();
    access_req__group002d0Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__group002d0) && Object.keys(access_req__group002d0)?.length>0)
      {
        setaccess_req__group002d0({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__group002d0Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 16',
        gridRow: '1 / 35',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f5f7fb',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 !rounded-lg ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setviewperformancereview_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("basic_inf") ?<Textbasic_inf   /* 380e7 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("full_name") ?<Dropdownfull_name   /* 8acb5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("cycle_name") ?<Dropdowncycle_name   /* 47492 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("review_number") ?<TextInputreview_number   /* 53b06 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("review_type") ?<Dropdownreview_type   /* d590c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("review_status") ?<Dropdownreview_status   /* 2c6ef */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
