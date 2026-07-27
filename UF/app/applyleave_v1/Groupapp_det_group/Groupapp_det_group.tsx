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
import Groupapprove_group  from "../Groupapprove_group/Groupapprove_group";
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
import TextAreaapproval_comments  from "./TextAreaapproval_comments";
import TextAreareject_reason  from "./TextAreareject_reason";
import TextAreacancellation_reason  from "./TextAreacancellation_reason";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupapp_det_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
      "approval_comments",
      "reject_reason",
      "cancellation_reason"
    ],
    "allowedGroups": [
      "canvas",
      "new_access_group",
      "dynamicactions",
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
  const {new_access_group9bde0, setnew_access_group9bde0}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group9bde0Props, setnew_access_group9bde0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7, setdynamicactionse55b7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionse55b7Props, setdynamicactionse55b7Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855, setaccess_req__group23855}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group23855Props, setaccess_req__group23855Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476, setemp_avail_group21476}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group21476Props, setemp_avail_group21476Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19a, setleave_balance_group2b19a}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group2b19aProps, setleave_balance_group2b19aProps}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335, setapp_det_groupe1335}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe1335Props, setapp_det_groupe1335Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00a, setapprove_group1e00a}= useContext(TotalContext) as TotalContextProps;
  const {approve_group1e00aProps, setapprove_group1e00aProps}= useContext(TotalContext) as TotalContextProps;
  const {approval_comments60355, setapproval_comments60355}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason0b75d, setreject_reason0b75d}= useContext(TotalContext) as TotalContextProps;
  const {cancellation_reason4824f, setcancellation_reason4824f}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703, setaudit_groupa0703}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupa0703Props, setaudit_groupa0703Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {applyleave_v1, setapplyleave_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:applyLeave:AFVK:v1',
    [user],
    'GroupAppDetGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "a00265729d7f4a3db40e393ec4de1335");
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
    setapp_det_groupe1335Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("approve_group")){
        setapprove_group1e00a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approve_group1e00a?.isDisabled==null)
      {
        setapprove_group1e00a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("approval_comments")){
        setapproval_comments60355((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(approval_comments60355?.isDisabled==null)
      {
        setapproval_comments60355((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("reject_reason")){
        setreject_reason0b75d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(reject_reason0b75d?.isDisabled==null)
      {
        setreject_reason0b75d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancellation_reason")){
        setcancellation_reason4824f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(cancellation_reason4824f?.isDisabled==null)
      {
        setcancellation_reason4824f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['approval_comments'] = approval_comments60355,
        codeStates['setapproval_comments'] = setapproval_comments60355,
        codeStates['reject_reason'] = reject_reason0b75d,
        codeStates['setreject_reason'] = setreject_reason0b75d,
        codeStates['cancellation_reason'] = cancellation_reason4824f,
        codeStates['setcancellation_reason'] = setcancellation_reason4824f,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,

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
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['approval_comments'] = approval_comments60355,
        codeStates['setapproval_comments'] = setapproval_comments60355,
        codeStates['reject_reason'] = reject_reason0b75d,
        codeStates['setreject_reason'] = setreject_reason0b75d,
        codeStates['cancellation_reason'] = cancellation_reason4824f,
        codeStates['setcancellation_reason'] = setcancellation_reason4824f,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const app_det_groupe1335Ref = useRef<any>(null);
  const handleClearSearch = () => {
    app_det_groupe1335Ref.current?.setSearchParams();
    app_det_groupe1335Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(app_det_groupe1335) && Object.keys(app_det_groupe1335)?.length>0)
      {
        setapp_det_groupe1335({})
      }
    }else 
      prevRefreshRef.current= true
  }, [app_det_groupe1335Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 16',
        gridRow: '77 / 111',
      
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
          setapplyleave_v1((pre:any)=>({...pre,_selectedGroup_:"app_det_group"}))
        }}
    >
        {allowedComponent.includes("approve_group")  &&<Groupapprove_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedControls.includes("approval_comments") ?<TextAreaapproval_comments   /* 60355 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("reject_reason") ?<TextAreareject_reason   /* 0b75d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
        {allowedControls.includes("cancellation_reason") ?<TextAreacancellation_reason   /* 4824f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupapp_det_group
