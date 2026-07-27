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
import Tableaccess_req_table  from './Tableaccess_req_table';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaccess_req_table = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addaccessrequestmodify_v1Props, setdfd_addaccessrequestmodify_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "access_req_id",
      "request_number",
      "full_name",
      "system_name",
      "request_type",
      "access_role",
      "request_priority",
      "risk_level",
      "status",
      "view",
      "edit_button",
      "delete_button",
      "attach_button",
      "approve_button"
    ],
    "allowedGroups": [
      "canvas",
      "access_req_group",
      "group",
      "access_req_table"
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
  const {access_req_group1e80d, setaccess_req_group1e80d}= useContext(TotalContext) as TotalContextProps;
  const {access_req_group1e80dProps, setaccess_req_group1e80dProps}= useContext(TotalContext) as TotalContextProps;
  const {group26b23, setgroup26b23}= useContext(TotalContext) as TotalContextProps;
  const {group26b23Props, setgroup26b23Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6, setaccess_req_table3ced6}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6Props, setaccess_req_table3ced6Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2d6a6, setaccess_req_id2d6a6}= useContext(TotalContext) as TotalContextProps;
  const {request_numberf227b, setrequest_numberf227b}= useContext(TotalContext) as TotalContextProps;
  const {full_named3fe3, setfull_named3fe3}= useContext(TotalContext) as TotalContextProps;
  const {system_name75ec8, setsystem_name75ec8}= useContext(TotalContext) as TotalContextProps;
  const {request_typeb69fc, setrequest_typeb69fc}= useContext(TotalContext) as TotalContextProps;
  const {access_role10fe1, setaccess_role10fe1}= useContext(TotalContext) as TotalContextProps;
  const {request_priorityacf12, setrequest_priorityacf12}= useContext(TotalContext) as TotalContextProps;
  const {risk_leveld8c37, setrisk_leveld8c37}= useContext(TotalContext) as TotalContextProps;
  const {statusa6dfb, setstatusa6dfb}= useContext(TotalContext) as TotalContextProps;
  const {view12159, setview12159}= useContext(TotalContext) as TotalContextProps;
  const {edit_button0da58, setedit_button0da58}= useContext(TotalContext) as TotalContextProps;
  const {delete_button2035f, setdelete_button2035f}= useContext(TotalContext) as TotalContextProps;
  const {attach_buttone9e89, setattach_buttone9e89}= useContext(TotalContext) as TotalContextProps;
  const {approve_button27195, setapprove_button27195}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {accessrequest_v1, setaccessrequest_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1',
    [user],
    'GroupAccessReqTable',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6b7c6238e3f84271b65c7f36e733ced6");
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
    setaccess_req_table3ced6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("access_req_id")){
        setaccess_req_id2d6a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_req_id2d6a6?.isDisabled==null)
      {
        setaccess_req_id2d6a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_number")){
        setrequest_numberf227b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_numberf227b?.isDisabled==null)
      {
        setrequest_numberf227b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("full_name")){
        setfull_named3fe3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(full_named3fe3?.isDisabled==null)
      {
        setfull_named3fe3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("system_name")){
        setsystem_name75ec8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(system_name75ec8?.isDisabled==null)
      {
        setsystem_name75ec8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_type")){
        setrequest_typeb69fc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_typeb69fc?.isDisabled==null)
      {
        setrequest_typeb69fc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("access_role")){
        setaccess_role10fe1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(access_role10fe1?.isDisabled==null)
      {
        setaccess_role10fe1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("request_priority")){
        setrequest_priorityacf12((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(request_priorityacf12?.isDisabled==null)
      {
        setrequest_priorityacf12((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_level")){
        setrisk_leveld8c37((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(risk_leveld8c37?.isDisabled==null)
      {
        setrisk_leveld8c37((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("status")){
        setstatusa6dfb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(statusa6dfb?.isDisabled==null)
      {
        setstatusa6dfb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
        setview12159((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(view12159?.isDisabled==null)
      {
        setview12159((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("edit_button")){
        setedit_button0da58((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(edit_button0da58?.isDisabled==null)
      {
        setedit_button0da58((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("delete_button")){
        setdelete_button2035f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(delete_button2035f?.isDisabled==null)
      {
        setdelete_button2035f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("attach_button")){
        setattach_buttone9e89((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(attach_buttone9e89?.isDisabled==null)
      {
        setattach_buttone9e89((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approve_button")){
        setapprove_button27195((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approve_button27195?.isDisabled==null)
      {
        setapprove_button27195((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
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
        codeStates['access_req_group'] = access_req_group1e80d,
        codeStates['setaccess_req_group'] = setaccess_req_group1e80d,
        codeStates['access_req_group1e80d'] = access_req_group1e80dProps,
        codeStates['setaccess_req_group1e80d'] = setaccess_req_group1e80dProps,
        codeStates['group'] = group26b23,
        codeStates['setgroup'] = setgroup26b23,
        codeStates['group26b23'] = group26b23Props,
        codeStates['setgroup26b23'] = setgroup26b23Props,
        codeStates['access_req_table'] = access_req_table3ced6,
        codeStates['setaccess_req_table'] = setaccess_req_table3ced6,
        codeStates['access_req_table3ced6'] = access_req_table3ced6Props,
        codeStates['setaccess_req_table3ced6'] = setaccess_req_table3ced6Props,
        codeStates['access_req_id'] = access_req_id2d6a6,
        codeStates['setaccess_req_id'] = setaccess_req_id2d6a6,
        codeStates['request_number'] = request_numberf227b,
        codeStates['setrequest_number'] = setrequest_numberf227b,
        codeStates['full_name'] = full_named3fe3,
        codeStates['setfull_name'] = setfull_named3fe3,
        codeStates['system_name'] = system_name75ec8,
        codeStates['setsystem_name'] = setsystem_name75ec8,
        codeStates['request_type'] = request_typeb69fc,
        codeStates['setrequest_type'] = setrequest_typeb69fc,
        codeStates['access_role'] = access_role10fe1,
        codeStates['setaccess_role'] = setaccess_role10fe1,
        codeStates['request_priority'] = request_priorityacf12,
        codeStates['setrequest_priority'] = setrequest_priorityacf12,
        codeStates['risk_level'] = risk_leveld8c37,
        codeStates['setrisk_level'] = setrisk_leveld8c37,
        codeStates['status'] = statusa6dfb,
        codeStates['setstatus'] = setstatusa6dfb,
        codeStates['view'] = view12159,
        codeStates['setview'] = setview12159,
        codeStates['edit_button'] = edit_button0da58,
        codeStates['setedit_button'] = setedit_button0da58,
        codeStates['delete_button'] = delete_button2035f,
        codeStates['setdelete_button'] = setdelete_button2035f,
        codeStates['attach_button'] = attach_buttone9e89,
        codeStates['setattach_button'] = setattach_buttone9e89,
        codeStates['approve_button'] = approve_button27195,
        codeStates['setapprove_button'] = setapprove_button27195,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const access_req_table3ced6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    access_req_table3ced6Ref.current?.setSearchParams();
    access_req_table3ced6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(access_req_table3ced6) && Object.keys(access_req_table3ced6)?.length>0)
      {
        setaccess_req_table3ced6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [access_req_table3ced6Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '9 / 117',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !font-bold ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaccessrequest_v1((pre:any)=>({...pre,_selectedGroup_:"access_req_table"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tableaccess_req_table headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={access_req_table3ced6Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupaccess_req_table
