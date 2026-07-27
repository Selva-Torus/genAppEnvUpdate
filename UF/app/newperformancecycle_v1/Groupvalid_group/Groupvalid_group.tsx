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
import Textreview_period  from "./Textreview_period";
import DatePickerstart_date  from "./DatePickerstart_date";
import DatePickerend_date  from "./DatePickerend_date";
import Dropdownreview_frequency  from "./Dropdownreview_frequency";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupvalid_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addperformancecyclemodify_v1Props, setdfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cycletypecombo_v1Props, setdfd_cycletypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewfrequencycombo_v1Props, setdfd_reviewfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "review_period",
      "start_date",
      "end_date",
      "review_frequency"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group",
      "addt__group",
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
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;
  const {review_periodab344, setreview_periodab344}= useContext(TotalContext) as TotalContextProps;
  const {start_date2419e, setstart_date2419e}= useContext(TotalContext) as TotalContextProps;
  const {end_date8751a, setend_date8751a}= useContext(TotalContext) as TotalContextProps;
  const {review_frequency7df15, setreview_frequency7df15}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newperformancecycle_v1, setnewperformancecycle_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceCycle:AFVK:v1',
    [user],
    'GroupValidGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ba03158b2f63423f78073c125eb071c1");
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
    setvalid_group071c1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("review_period")){
        setreview_periodab344((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_periodab344?.isDisabled==null)
      {
        setreview_periodab344((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("start_date")){
        setstart_date2419e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(start_date2419e?.isDisabled==null)
      {
        setstart_date2419e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("end_date")){
        setend_date8751a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(end_date8751a?.isDisabled==null)
      {
        setend_date8751a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_frequency")){
        setreview_frequency7df15((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_frequency7df15?.isDisabled==null)
      {
        setreview_frequency7df15((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['review_period'] = review_periodab344,
        codeStates['setreview_period'] = setreview_periodab344,
        codeStates['start_date'] = start_date2419e,
        codeStates['setstart_date'] = setstart_date2419e,
        codeStates['end_date'] = end_date8751a,
        codeStates['setend_date'] = setend_date8751a,
        codeStates['review_frequency'] = review_frequency7df15,
        codeStates['setreview_frequency'] = setreview_frequency7df15,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,

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
        codeStates['new_access_group'] = new_access_groupe9bce,
        codeStates['setnew_access_group'] = setnew_access_groupe9bce,
        codeStates['new_access_groupe9bce'] = new_access_groupe9bceProps,
        codeStates['setnew_access_groupe9bce'] = setnew_access_groupe9bceProps,
        codeStates['access_req__group'] = access_req__groupbdb89,
        codeStates['setaccess_req__group'] = setaccess_req__groupbdb89,
        codeStates['access_req__groupbdb89'] = access_req__groupbdb89Props,
        codeStates['setaccess_req__groupbdb89'] = setaccess_req__groupbdb89Props,
        codeStates['valid_group'] = valid_group071c1,
        codeStates['setvalid_group'] = setvalid_group071c1,
        codeStates['valid_group071c1'] = valid_group071c1Props,
        codeStates['setvalid_group071c1'] = setvalid_group071c1Props,
        codeStates['review_period'] = review_periodab344,
        codeStates['setreview_period'] = setreview_periodab344,
        codeStates['start_date'] = start_date2419e,
        codeStates['setstart_date'] = setstart_date2419e,
        codeStates['end_date'] = end_date8751a,
        codeStates['setend_date'] = setend_date8751a,
        codeStates['review_frequency'] = review_frequency7df15,
        codeStates['setreview_frequency'] = setreview_frequency7df15,
        codeStates['business_just__group'] = business_just__group04cc1,
        codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1,
        codeStates['business_just__group04cc1'] = business_just__group04cc1Props,
        codeStates['setbusiness_just__group04cc1'] = setbusiness_just__group04cc1Props,
        codeStates['addt__group'] = addt__group284f6,
        codeStates['setaddt__group'] = setaddt__group284f6,
        codeStates['addt__group284f6'] = addt__group284f6Props,
        codeStates['setaddt__group284f6'] = setaddt__group284f6Props,
        codeStates['dynamicactions'] = dynamicactionsd94d3,
        codeStates['setdynamicactions'] = setdynamicactionsd94d3,
        codeStates['dynamicactionsd94d3'] = dynamicactionsd94d3Props,
        codeStates['setdynamicactionsd94d3'] = setdynamicactionsd94d3Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const valid_group071c1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    valid_group071c1Ref.current?.setSearchParams();
    valid_group071c1Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(valid_group071c1) && Object.keys(valid_group071c1)?.length>0)
      {
        setvalid_group071c1({})
      }
    }else 
      prevRefreshRef.current= true
  }, [valid_group071c1Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '13 / 25',
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
          setnewperformancecycle_v1((pre:any)=>({...pre,_selectedGroup_:"valid_group"}))
        }}
    >
          {allowedControls.includes("review_period") ?<Textreview_period   /* ab344 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("start_date") ?<DatePickerstart_date   /* 2419e */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("end_date") ?<DatePickerend_date   /* 8751a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("review_frequency") ?<Dropdownreview_frequency   /* 7df15 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupvalid_group
