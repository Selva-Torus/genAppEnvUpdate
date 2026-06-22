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
import Textmaintenance_information_text  from "./Textmaintenance_information_text";
import Dropdownasset_name  from "./Dropdownasset_name";
import Dropdownmaint_type  from "./Dropdownmaint_type";
import Dropdownpriority  from "./Dropdownpriority";
import DatePickerscheduled_date  from "./DatePickerscheduled_date";
import DatePickercompleted_date  from "./DatePickercompleted_date";
import DatePickernext_maintenance_date  from "./DatePickernext_maintenance_date";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupmaintenance_information_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_maintenancetypecombo_v1Props, setdfd_maintenancetypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_prioritycombo_v1Props, setdfd_prioritycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "maintenance_information_text",
      "asset_name",
      "maint_type",
      "priority",
      "scheduled_date",
      "completed_date",
      "next_maintenance_date"
    ],
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "maintenance_information_text",
      "asset_name",
      "maint_type",
      "priority",
      "scheduled_date",
      "completed_date",
      "next_maintenance_date"
    ],
    "allowedGroups": [
      "canvas",
      "maintenance_group",
      "maintenance_information_group",
      "execution_details_group",
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
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_text37a24, setmaintenance_information_text37a24}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec21fd, setasset_namec21fd}= useContext(TotalContext) as TotalContextProps;
  const {maint_typea5ba4, setmaint_typea5ba4}= useContext(TotalContext) as TotalContextProps;
  const {priorityec586, setpriorityec586}= useContext(TotalContext) as TotalContextProps;
  const {scheduled_date83e9d, setscheduled_date83e9d}= useContext(TotalContext) as TotalContextProps;
  const {completed_dated052f, setcompleted_dated052f}= useContext(TotalContext) as TotalContextProps;
  const {next_maintenance_datee871a, setnext_maintenance_datee871a}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {logmaintenance_v1, setlogmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:logMaintenance:AFVK:v1',
    [user],
    'GroupMaintenanceInformationGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "72ef8f904ecb42bd9310191c694ea3ac");
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
    setmaintenance_information_groupea3acProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("maintenance_information_text")){
        setmaintenance_information_text37a24({...maintenance_information_text37a24,isDisabled:true});

    }else
    {
      if(maintenance_information_text37a24?.isDisabled==null)
      {
        setmaintenance_information_text37a24({...maintenance_information_text37a24,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_namec21fd({...asset_namec21fd,isDisabled:true});

    }else
    {
      if(asset_namec21fd?.isDisabled==null)
      {
        setasset_namec21fd({...asset_namec21fd,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("maint_type")){
        setmaint_typea5ba4({...maint_typea5ba4,isDisabled:true});

    }else
    {
      if(maint_typea5ba4?.isDisabled==null)
      {
        setmaint_typea5ba4({...maint_typea5ba4,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("priority")){
        setpriorityec586({...priorityec586,isDisabled:true});

    }else
    {
      if(priorityec586?.isDisabled==null)
      {
        setpriorityec586({...priorityec586,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("scheduled_date")){
        setscheduled_date83e9d({...scheduled_date83e9d,isDisabled:true});

    }else
    {
      if(scheduled_date83e9d?.isDisabled==null)
      {
        setscheduled_date83e9d({...scheduled_date83e9d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("completed_date")){
        setcompleted_dated052f({...completed_dated052f,isDisabled:true});

    }else
    {
      if(completed_dated052f?.isDisabled==null)
      {
        setcompleted_dated052f({...completed_dated052f,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("next_maintenance_date")){
        setnext_maintenance_datee871a({...next_maintenance_datee871a,isDisabled:true});

    }else
    {
      if(next_maintenance_datee871a?.isDisabled==null)
      {
        setnext_maintenance_datee871a({...next_maintenance_datee871a,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['maintenance_information_text'] = maintenance_information_text37a24,
        codeStates['setmaintenance_information_text'] = setmaintenance_information_text37a24,
        codeStates['asset_name'] = asset_namec21fd,
        codeStates['setasset_name'] = setasset_namec21fd,
        codeStates['maint_type'] = maint_typea5ba4,
        codeStates['setmaint_type'] = setmaint_typea5ba4,
        codeStates['priority'] = priorityec586,
        codeStates['setpriority'] = setpriorityec586,
        codeStates['scheduled_date'] = scheduled_date83e9d,
        codeStates['setscheduled_date'] = setscheduled_date83e9d,
        codeStates['completed_date'] = completed_dated052f,
        codeStates['setcompleted_date'] = setcompleted_dated052f,
        codeStates['next_maintenance_date'] = next_maintenance_datee871a,
        codeStates['setnext_maintenance_date'] = setnext_maintenance_datee871a,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,

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
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['maintenance_information_text'] = maintenance_information_text37a24,
        codeStates['setmaintenance_information_text'] = setmaintenance_information_text37a24,
        codeStates['asset_name'] = asset_namec21fd,
        codeStates['setasset_name'] = setasset_namec21fd,
        codeStates['maint_type'] = maint_typea5ba4,
        codeStates['setmaint_type'] = setmaint_typea5ba4,
        codeStates['priority'] = priorityec586,
        codeStates['setpriority'] = setpriorityec586,
        codeStates['scheduled_date'] = scheduled_date83e9d,
        codeStates['setscheduled_date'] = setscheduled_date83e9d,
        codeStates['completed_date'] = completed_dated052f,
        codeStates['setcompleted_date'] = setcompleted_dated052f,
        codeStates['next_maintenance_date'] = next_maintenance_datee871a,
        codeStates['setnext_maintenance_date'] = setnext_maintenance_datee871a,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const maintenance_information_groupea3acRef = useRef<any>(null);
  const handleClearSearch = () => {
    maintenance_information_groupea3acRef.current?.setSearchParams();
    maintenance_information_groupea3acRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(maintenance_information_groupea3ac) && Object.keys(maintenance_information_groupea3ac)?.length>0)
      {
        setmaintenance_information_groupea3ac({})
      }
    }else 
      prevRefreshRef.current= true
  }, [maintenance_information_groupea3acProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 38',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f0f2f7',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
          {allowedControls.includes("maintenance_information_text") ?<Textmaintenance_information_text   /* 37a24 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<Dropdownasset_name   /* c21fd */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("maint_type") ?<Dropdownmaint_type   /* a5ba4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("priority") ?<Dropdownpriority   /* ec586 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("scheduled_date") ?<DatePickerscheduled_date   /* 83e9d */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("completed_date") ?<DatePickercompleted_date   /* d052f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("next_maintenance_date") ?<DatePickernext_maintenance_date   /* e871a */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupmaintenance_information_group
