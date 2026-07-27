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
import Textemployee_availability  from "./Textemployee_availability";
import TextInputcontact_during_leave  from "./TextInputcontact_during_leave";
import TextAreahandover_notes  from "./TextAreahandover_notes";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupemp_avail_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policynamecombo_v1Props, setdfd_policynamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_leavereasoncategorycombo_v1Props, setdfd_leavereasoncategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applyleave_v1Props, setdfd_applyleave_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "employee_availability",
      "contact_during_leave",
      "handover_notes"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "access_req__group",
      "emp_avail_group",
      "leave_balance_group",
      "app_det_group",
      "approve_group",
      "audit_group"
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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_availabilitycdf9d, setemployee_availabilitycdf9d}= useContext(TotalContext) as TotalContextProps;
  const {contact_during_leave3cb19, setcontact_during_leave3cb19}= useContext(TotalContext) as TotalContextProps;
  const {handover_notese3c9e, sethandover_notese3c9e}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewleaveapply_v1, setviewleaveapply_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeaveApply:AFVK:v1',
    [user],
    'GroupEmpAvailGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7bea8e15335d04fc67971aa7d61eb48f");
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
    setemp_avail_groupeb48fProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("employee_availability")){
        setemployee_availabilitycdf9d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_availabilitycdf9d?.isDisabled==null)
      {
        setemployee_availabilitycdf9d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("contact_during_leave")){
        setcontact_during_leave3cb19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(contact_during_leave3cb19?.isDisabled==null)
      {
        setcontact_during_leave3cb19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("handover_notes")){
        sethandover_notese3c9e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(handover_notese3c9e?.isDisabled==null)
      {
        sethandover_notese3c9e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['employee_availability'] = employee_availabilitycdf9d,
        codeStates['setemployee_availability'] = setemployee_availabilitycdf9d,
        codeStates['contact_during_leave'] = contact_during_leave3cb19,
        codeStates['setcontact_during_leave'] = setcontact_during_leave3cb19,
        codeStates['handover_notes'] = handover_notese3c9e,
        codeStates['sethandover_notes'] = sethandover_notese3c9e,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,

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
        codeStates['new_access_group'] = new_access_group8a441,
        codeStates['setnew_access_group'] = setnew_access_group8a441,
        codeStates['new_access_group8a441'] = new_access_group8a441Props,
        codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
        codeStates['access_req__group'] = access_req__group578e5,
        codeStates['setaccess_req__group'] = setaccess_req__group578e5,
        codeStates['access_req__group578e5'] = access_req__group578e5Props,
        codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
        codeStates['emp_avail_group'] = emp_avail_groupeb48f,
        codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
        codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
        codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
        codeStates['employee_availability'] = employee_availabilitycdf9d,
        codeStates['setemployee_availability'] = setemployee_availabilitycdf9d,
        codeStates['contact_during_leave'] = contact_during_leave3cb19,
        codeStates['setcontact_during_leave'] = setcontact_during_leave3cb19,
        codeStates['handover_notes'] = handover_notese3c9e,
        codeStates['sethandover_notes'] = sethandover_notese3c9e,
        codeStates['leave_balance_group'] = leave_balance_group98af0,
        codeStates['setleave_balance_group'] = setleave_balance_group98af0,
        codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
        codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
        codeStates['app_det_group'] = app_det_group5b97e,
        codeStates['setapp_det_group'] = setapp_det_group5b97e,
        codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
        codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
        codeStates['approve_group'] = approve_group4d845,
        codeStates['setapprove_group'] = setapprove_group4d845,
        codeStates['approve_group4d845'] = approve_group4d845Props,
        codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
        codeStates['audit_group'] = audit_group2b7ff,
        codeStates['setaudit_group'] = setaudit_group2b7ff,
        codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
        codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const emp_avail_groupeb48fRef = useRef<any>(null);
  const handleClearSearch = () => {
    emp_avail_groupeb48fRef.current?.setSearchParams();
    emp_avail_groupeb48fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(emp_avail_groupeb48f) && Object.keys(emp_avail_groupeb48f)?.length>0)
      {
        setemp_avail_groupeb48f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [emp_avail_groupeb48fProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '37 / 66',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
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
          setviewleaveapply_v1((pre:any)=>({...pre,_selectedGroup_:"emp_avail_group"}))
        }}
    >
          {allowedControls.includes("employee_availability") ?<Textemployee_availability   /* cdf9d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("contact_during_leave") ?<TextInputcontact_during_leave   /* 3cb19 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("handover_notes") ?<TextAreahandover_notes   /* e3c9e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupemp_avail_group
