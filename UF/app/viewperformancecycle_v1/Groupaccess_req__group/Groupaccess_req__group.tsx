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
import TextInputcycle_code  from "./TextInputcycle_code";
import TextInputcycle_name  from "./TextInputcycle_name";
import Dropdowncycle_type  from "./Dropdowncycle_type";
import Dropdownstatus  from "./Dropdownstatus";
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
  const {dfd_addperformancecyclemodify_v1Props, setdfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_reviewfrequencycombo_v1Props, setdfd_reviewfrequencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_cycletypecombo_v1Props, setdfd_cycletypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "basic_inf",
      "cycle_code",
      "cycle_name",
      "cycle_type",
      "status"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "valid_group",
      "business_just__group"
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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_infd821c, setbasic_infd821c}= useContext(TotalContext) as TotalContextProps;
  const {cycle_code7e30e, setcycle_code7e30e}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name9f4c1, setcycle_name9f4c1}= useContext(TotalContext) as TotalContextProps;
  const {cycle_type643b8, setcycle_type643b8}= useContext(TotalContext) as TotalContextProps;
  const {statusb0341, setstatusb0341}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewperformancecycle_v1, setviewperformancecycle_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceCycle:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e0ac73943166d4455f166c0a8a870ea9");
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
    setaccess_req__group70ea9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("basic_inf")){
        setbasic_infd821c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(basic_infd821c?.isDisabled==null)
      {
        setbasic_infd821c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_code")){
        setcycle_code7e30e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_code7e30e?.isDisabled==null)
      {
        setcycle_code7e30e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_name")){
        setcycle_name9f4c1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_name9f4c1?.isDisabled==null)
      {
        setcycle_name9f4c1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cycle_type")){
        setcycle_type643b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cycle_type643b8?.isDisabled==null)
      {
        setcycle_type643b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusb0341((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(statusb0341?.isDisabled==null)
      {
        setstatusb0341((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc1763,
        codeStates['setnew_access_group'] = setnew_access_groupc1763,
        codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
        codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
        codeStates['access_req__group'] = access_req__group70ea9,
        codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
        codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
        codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
        codeStates['basic_inf'] = basic_infd821c,
        codeStates['setbasic_inf'] = setbasic_infd821c,
        codeStates['cycle_code'] = cycle_code7e30e,
        codeStates['setcycle_code'] = setcycle_code7e30e,
        codeStates['cycle_name'] = cycle_name9f4c1,
        codeStates['setcycle_name'] = setcycle_name9f4c1,
        codeStates['cycle_type'] = cycle_type643b8,
        codeStates['setcycle_type'] = setcycle_type643b8,
        codeStates['status'] = statusb0341,
        codeStates['setstatus'] = setstatusb0341,
        codeStates['valid_group'] = valid_group35ad5,
        codeStates['setvalid_group'] = setvalid_group35ad5,
        codeStates['valid_group35ad5'] = valid_group35ad5Props,
        codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
        codeStates['business_just__group'] = business_just__group2db99,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
        codeStates['business_just__group2db99'] = business_just__group2db99Props,
        codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,

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
        codeStates['new_access_group'] = new_access_groupc1763,
        codeStates['setnew_access_group'] = setnew_access_groupc1763,
        codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
        codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
        codeStates['access_req__group'] = access_req__group70ea9,
        codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
        codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
        codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
        codeStates['basic_inf'] = basic_infd821c,
        codeStates['setbasic_inf'] = setbasic_infd821c,
        codeStates['cycle_code'] = cycle_code7e30e,
        codeStates['setcycle_code'] = setcycle_code7e30e,
        codeStates['cycle_name'] = cycle_name9f4c1,
        codeStates['setcycle_name'] = setcycle_name9f4c1,
        codeStates['cycle_type'] = cycle_type643b8,
        codeStates['setcycle_type'] = setcycle_type643b8,
        codeStates['status'] = statusb0341,
        codeStates['setstatus'] = setstatusb0341,
        codeStates['valid_group'] = valid_group35ad5,
        codeStates['setvalid_group'] = setvalid_group35ad5,
        codeStates['valid_group35ad5'] = valid_group35ad5Props,
        codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
        codeStates['business_just__group'] = business_just__group2db99,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
        codeStates['business_just__group2db99'] = business_just__group2db99Props,
        codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req__group70ea9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req__group70ea9Ref.current?.setSearchParams();
    access_req__group70ea9Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req__group70ea9) && Object.keys(access_req__group70ea9)?.length>0)
      {
        setaccess_req__group70ea9({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req__group70ea9Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
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
          setviewperformancecycle_v1((pre:any)=>({...pre,_selectedGroup_:"access_req__group"}))
        }}
    >
          {allowedControls.includes("basic_inf") ?<Textbasic_inf   /* d821c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cycle_code") ?<TextInputcycle_code   /* 7e30e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cycle_name") ?<TextInputcycle_name   /* 9f4c1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cycle_type") ?<Dropdowncycle_type   /* 643b8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("status") ?<Dropdownstatus   /* b0341 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupaccess_req__group
